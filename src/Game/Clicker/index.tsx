import { Box, Grid } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../prettyNumber';
import Seperator from '../Components/Seperator';
import { useEffect, useRef, useState } from 'react';
import getImage from '../../images';

interface ClickerProps {
  onClick: () => void;
  grains: number;
  gps: number;
  gpc: number;
  options: Options;
}

interface Options {
  backgroundGrainsEnabled: boolean;
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

const clickSound = new Audio();
clickSound.src = '/Click.wav';
clickSound.volume = 0.1;

export default function Clicker({
  onClick,
  grains,
  gps,
  gpc,
  options,
}: ClickerProps) {
  const classes = useStyle();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [particles, setParticles] = useState<RiceParticle[]>([]);
  const [backgroundParticles, setBackgroundParticles] = useState<
    BackgroundParticle[]
  >([]);
  const [timeSinceLastClick, setTimeSinceLastClick] = useState(10);
  const clickerRef = useRef<HTMLButtonElement | null>(null);
  const bgParticlesRef = useRef<BackgroundParticle[]>([]);
  const gpsRef = useRef(gps);
  const gpcRef = useRef(gpc);
  const optionsRef = useRef(options);
  const images = getImage('clicker');

  useEffect(() => {
    gpsRef.current = gps;
    gpcRef.current = gpc;
    contextRef.current = context;
    bgParticlesRef.current = backgroundParticles;
    optionsRef.current = options;
  }, [gps, gpc, context, backgroundParticles, options]);

  const handleClick = (e) => {
    onClick();
    addParticle(e.clientX - 20, e.clientY - 70);
    setTimeSinceLastClick(0);
    clickSound.play();
  };

  const cookerImg = new Image();
  cookerImg.src = images.images[0];

  const riceGrain = new Image();
  riceGrain.src = images.images[1] || cookerImg.src;

  const addParticle = (x: number, y: number) => {
    const newParticles = [...particles];
    newParticles.push({
      x: x,
      y: y,
      img: 'rice.png',
      text: '+' + gpcRef.current,
      life: 0,
    });
    setParticles(newParticles);
  };

  document.onresize = () => {
    context.scale(window.devicePixelRatio, window.devicePixelRatio);
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
    if (options.backgroundGrainsEnabled) {
      backgroundParticles.forEach((particle) => {
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.r / 1000);
        context.drawImage(riceGrain, particle.x, particle.y);
        particle.y += particle.speed;
        if (particle.y > context.canvas.height)
          backgroundParticles.splice(i, 1);
        i++;
        context.restore();
      });
    }

    const clickerBoundingBox = clickerRef.current.getBoundingClientRect();

    let width = 250;
    let height = 250;
    let x = clickerBoundingBox.x;
    let y = clickerBoundingBox.y - 50;

    if (timeSinceLastClick < 10) {
      width += 10 - timeSinceLastClick;
      height += 10 - timeSinceLastClick;
      x -= 5 - timeSinceLastClick / 2;
      y -= 5 - timeSinceLastClick / 2;
      console.log('width', width);
      console.log('height', height);
      console.log('x', x);
      console.log('y', y);
      setTimeSinceLastClick((t) => t + 1);
    }

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
      if (
        !ctx ||
        !contextRef.current ||
        !optionsRef.current.backgroundGrainsEnabled
      )
        return;
      const newParticles = [...bgParticlesRef.current];
      for (let i = 0; i < Math.random() * (gpsRef.current / 8); i++) {
        if (newParticles.length > 1500) return;
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
              <Box className={classes.textContainer}>
                <Box>
                  You have <b>{prettyNumber(Math.round(grains), 3)}</b>{' '}
                  RYSST-grains
                </Box>
                <Box>
                  Grains per second: <b>{prettyNumber(gps, 3)}</b>
                </Box>
              </Box>
              <button
                ref={clickerRef}
                className={classes.button}
                onClick={handleClick}
              />
            </Box>
          </Grid>
          <Box></Box>
        </Grid>
        <Seperator direction={'vertical'} />
      </Grid>
    </>
  );
}
