import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import useStyle from './style';
import getImage from '../../../../images';

interface ShopObjectProps {
  amount: number;
  objectName: string;
}

export default function ShopObjectDisplay({
  amount,
  objectName,
}: ShopObjectProps) {
  const classes = useStyle();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const amountRef = useRef(amount);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const images = getImage(objectName.toLowerCase().replace(" ", "_"));

  const backgroundImg = new Image();
  backgroundImg.src = images.background;

  const bottomBar = new Image();
  bottomBar.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAFCAYAAAAHQL+kAAAAAXNSR0IArs4c6QAAACZJREFUKJFjtLOz+88wDABLcHDwQLuBKoBpoB1ALTBsPMI4XPIIADxqBHb19d81AAAAAElFTkSuQmCC';

  const img1 = new Image();
  img1.src = images.images[0];

  const img2 = new Image();
  img2.src = images.images[1] || img1.src;

  const img3 = new Image();
  img3.src = images.images[2] || img2.src;

  const getRandomImage = (length: number, i: number) => {
    const j = Math.round(i % length);

    switch (j) {
      case 0:
        return img1;
      case 1:
        return img2;
      case 2:
        return img3;
      default:
        console.log(j + ", " + i + " is not valid, reverting to default");
        return img1;
    }
  }

  useEffect(() => {
    contextRef.current = context;
    amountRef.current = amount;
  }, [context, amount]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const draw = () => {
    if (canvasRef.current && amountRef.current != 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.canvas.width = document.getElementById('canvas')?.offsetWidth || 0;
      ctx.canvas.height = 200;

      ctx.imageSmoothingEnabled = false;

      let x = 0;
      const y = 0;

      let x2 = 0;
      let y2 = 30;

      for (let i = 0; i < amountRef.current; i++) {
        if(i % 2 == 0) {
          ctx.globalCompositeOperation = 'destination-over';
        } else {
          ctx.globalCompositeOperation = 'source-over';
        }
        ctx.drawImage(getRandomImage(images.images.length, i), x2, y2, images.width || 100, images.height || 100);

        // Adjust x and y for the next image
        x2 += images.distance || 75; // You can adjust the spacing between images
        if (y2 === 75) {
          y2 = 30;
        } else if (y2 == 30) {
          y2 = 75;
        }
      }

      for (let i = 0; i < canvas.width / 200; i++) {
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(backgroundImg, x, y, 200, 200);

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(bottomBar, x, ctx.canvas.height - 10, 200, 10);

        x += 200;
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.canvas.width = document.getElementById('canvas')?.offsetWidth || 0;
    ctx.canvas.height = 200;

    setContext(ctx);
  }, [amount]);

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
    amount > 0 && (
      <Box id="canvas" className={classes.container}>
        <canvas className={classes.canvas} ref={canvasRef} />
      </Box>
    )
  );
}
