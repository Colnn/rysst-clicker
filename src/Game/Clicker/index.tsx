import { Box, Grid } from '@mui/material';
import useStyle from './style';
import prettyNumber from '../../prettyNumber';
import Seperator from '../Components/Seperator';
import { useEffect, useRef, useState } from 'react';

interface ClickerProps {
  onClick: () => void;
  grains: number;
}

interface RiceParticle {
  x: number;
  y: number;
  img: string;
  text: string;
  life: number;
}

export default function Clicker({ onClick, grains }: ClickerProps) {
  const classes = useStyle();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [mousePos, setMousePos] = useState({x: 0, y: 0});
  const [particles, setParticles] = useState<RiceParticle[]>([]);

  const handleClick = () => {
    onClick();
    addParticle();
    clickSound.play();
  }

  const clickSound = new Audio();
  clickSound.src = '/Click.wav';
  clickSound.volume = 0.1;

  const cookerImg = new Image();
  cookerImg.src = '/rysst_cooker.png';

  const riceGrain = new Image();
  riceGrain.src = '/rice.png';

  const trackMouse = (e) => {
    setMousePos({x: e.clientX, y: e.clientY});
  }

  const addParticle = () => {
    const newParticles = [...particles];
    newParticles.push({
      x: mousePos.x - 20,
      y: mousePos.y - 70,
      img: 'rice.png',
      text: '+' + 1,
      life: 0,
    });
    setParticles(newParticles);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = () => {
      if(!context) return;
      context.canvas.width =
          (document.getElementById('container')?.offsetWidth || 0);
      context.canvas.height = (document.getElementById('container')?.offsetHeight || 0);
      
      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      context.imageSmoothingEnabled = false;

      const width = 250;
      const height = 250;

      const x = (context.canvas.width / 2) - (width / 2);
      const y = (context.canvas.height / 2) - (height / 2) - 100;

      context.drawImage(cookerImg, x, y, width, height);

      const newParticles = [...particles];
      newParticles.forEach((particle) => {
        context.save();
        if(particle.life < 100) {
          particle.life++;
          const px = particle.x;
          const py = particle.y - (particle.life / 2);
          context.globalAlpha = 1 - (particle.life / 100);
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
    setContext(ctx);
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
      <Grid container className={classes.container} onMouseMove={trackMouse} direction={'row'} wrap={'nowrap'}>
        <canvas ref={canvasRef} id={'clickerCanvas'} className={classes.canvas}/>
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
                You have <b>{prettyNumber(grains, 3)}</b> RYSST-grains
              </Box>
              <button
                className={classes.button}
                onClick={handleClick}
              />
            </Box>
          </Grid>
          <Box></Box>
        </Grid>
        <Seperator/>
      </Grid>
    </>
  );
}
