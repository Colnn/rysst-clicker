import { Box, Grid } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../prettyNumber';
import Seperator from '../Components/Seperator';
import { useEffect, useRef, useState } from 'react';

interface ClickerProps {
  onClick: () => void;
  grains: number;
  gps: number;
  gpc: number;
}

interface RiceParticle {
  x: number;
  y: number;
  img: string;
  text: string;
  life: number;
}

interface BackgroundParticle {
  x: number;
  y: number;
  r: number;
  speed: number;
}

export default function Clicker({ onClick, grains, gps, gpc }: ClickerProps) {
    const classes = useStyle();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<RiceParticle[]>([]);
  const [backgroundParticles, setBackgroundParticles] = useState<
    BackgroundParticle[]
  >([]);
  const bgParticlesRef = useRef<BackgroundParticle[]>([]);
  const gpsRef = useRef(gps);
  const gpcRef = useRef(gpc);

  useEffect(() => {
    gpsRef.current = gps;
    gpcRef.current = gpc;
    contextRef.current = context;
    bgParticlesRef.current = backgroundParticles;
  }, [gps, gpc, context, backgroundParticles]);

  const handleClick = () => {
    onClick();
    addParticle();
    clickSound.play();
  };

  const clickSound = new Audio();
  clickSound.src = '/Click.wav';
  clickSound.volume = 0.1;

  const cookerImg = new Image();
  cookerImg.src = '/rysst_cooker.png';

  const riceGrain = new Image();
  riceGrain.src = '/rice.png';

  const trackMouse = (e) => {
    setMousePos({ x: e.clientX - 20, y: e.clientY - 70 });
  };

  const addParticle = () => {
    const newParticles = [...particles];
    newParticles.push({
      x: mousePos.x,
      y: mousePos.y,
      img: 'rice.png',
      text: '+' + gpcRef.current,
      life: 0,
    });
    setParticles(newParticles);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = () => {
    if (!context) return;
    context.canvas.width =
      document.getElementById('container')?.offsetWidth || 0;
    context.canvas.height =
      document.getElementById('container')?.offsetHeight || 0;

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.imageSmoothingEnabled = false;

    let i = 0;
    backgroundParticles.forEach((particle) => {
      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.r/1000);
      context.drawImage(riceGrain, particle.x, particle.y);
      particle.y += particle.speed;
      if(particle.y > context.canvas.height) backgroundParticles.splice(i, 1);
      i++;
      context.restore();
    });

    const width = 250;
    const height = 250;

    const x = context.canvas.width / 2 - width / 2;
    const y = context.canvas.height / 2 - height / 2 - 100;

    context.drawImage(cookerImg, x, y, width, height);

    const newParticles = [...particles];
    newParticles.forEach((particle) => {
      context.save();
      if (particle.life < 100) {
        particle.life++;
        const px = particle.x;
        const py = particle.y - particle.life / 2;
        context.globalAlpha = 1 - particle.life / 100;
        // TODO: Find way to rotate without screwing up the entire canvas
        context.drawImage(riceGrain, px, py, 50, 50);
        context.fillText(particle.text, px, py);
      }
      context.restore();
    });
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.canvas.width = document.getElementById('container')?.offsetWidth || 0;
    ctx.canvas.height = document.getElementById('container')?.offsetHeight || 0;

    setContext(ctx);

    setInterval(() => {
      if (!ctx || !contextRef.current) return;
      const newParticles = [...bgParticlesRef.current];
      for (let i = 0; i < Math.random() * (gpsRef.current / 8); i++) {
        newParticles.push({
          x: Math.random() * contextRef.current.canvas.width,
          y: -(Math.random() * 20) - 20,
          r: Math.random() * 360,
          speed: Math.max(Math.random() * 2, 1),
        });
      }
      setBackgroundParticles(newParticles);
    }, 500);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    // Check if null context has been replaced on component mount
    if (context) {
      //Our draw came here
      const render = () => {
        draw();
        animationFrameId = window.requestAnimationFrame(render);
      };
      render();
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, context]);

  return (
    <>
      <Grid
        container
        className={classes.container}
        onMouseMove={trackMouse}
        direction={'row'}
        wrap={'nowrap'}
      >
        <canvas
          ref={canvasRef}
          id={'clickerCanvas'}
          className={classes.canvas}
        />
        <Grid id={'container'} container className={classes.innerContainer}>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.riceContainer}
          >
            <Box className={classes.onTop}>
              <Box>
                You have <b>{prettyNumber(Math.round(grains), 3)}</b> RYSST-grains
              </Box>
              <Box>Grains per second: <b>{ prettyNumber(gps, 3) }</b></Box>
              <button className={classes.button} onClick={handleClick} />
            </Box>
          </Grid>
          <Box></Box>
        </Grid>
        <Seperator direction={'vertical'} />
      </Grid>
    </>
  );
}
