import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import useStyle from './style';

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

  const backgroundImg = new Image();
  backgroundImg.src = `/${objectName.toLowerCase().replace(" ", "_")}-background.png`;

  // TODO: Replace '0' with correct value (random 1 - 3);
  const img = new Image();
  img.src = `/${objectName.toLowerCase().replace(" ", "_") + 0}.png`;

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

      ctx.canvas.width =
        (document.getElementById('canvas')?.offsetWidth || 0);
      ctx.canvas.height = 200;

      ctx.imageSmoothingEnabled = false;

      let x = 0;
      const y = 0;

      for (let i = 0; i < (canvas.width / 200); i++) {
        ctx.drawImage(backgroundImg, x, y, 200, 200);

        x += 200;
      }

      let x2 = 0;
      let y2 = 30;

      for (let i = 0; i < amountRef.current; i++) {
        ctx.drawImage(img, x2, y2, 100, 100);

        // Adjust x and y for the next image
        x2 += 75; // You can adjust the spacing between images
        if (y2 === 75) {
          y2 = 30;
        } else if (y2 == 30) {
          y2 = 75;
        }
      }
    }
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.canvas.width =
        (document.getElementById('canvas')?.offsetWidth || 0);
    ctx.canvas.height = 200;

    setContext(ctx);
  }, [amount])

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
    (amount > 0 && (
      <Box id="canvas" className={classes.container}>
        <canvas className={classes.canvas} ref={canvasRef} />
      </Box>
    ))
  );
}
