import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import useStyle from './style';

interface ShopObjectProps {
  amount: number;
  objectName: string;
  backgroundSVG: string;
}

export default function ShopObjectDisplay({
  amount,
  objectName,
  backgroundSVG,
}: ShopObjectProps) {
  const classes = useStyle();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const drawImagesOnCanvas = () => {
      if (!canvasRef.current || amount == 0) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.canvas.width = document.getElementById('canvas')?.offsetWidth || 0;
      ctx.canvas.height = 200;

      let x = 0;
      let y = 0;

      for (let i = 0; i < canvas.width / 200; i++) {
        const img = new Image();
        img.src = `/${objectName.toLowerCase()}-background.png`;

        img.onload = () => {
          ctx.drawImage(img, x, y, 200, 200);

          x += 200;
        };
      }

      let x2 = 0;
      let y2 = 30;

      for (let i = 0; i < amount; i++) {
        const img = new Image();
        img.src = `/${objectName.toLowerCase() + (i % 3)}.png`;

        img.onload = () => {
          ctx.drawImage(img, x2, y2, 100, 100);

          // Adjust x and y for the next image
          x2 += 55; // You can adjust the spacing between images
          if (y2 === 75) {
            y2 = 30;
          } else if (y2 == 30) {
            y2 = 75;
          }
        };
      }
    };

    drawImagesOnCanvas();
  }, [amount]);

  if (amount === 0) {
    return;
  } else {
    return (
      <Box id="canvas" className={classes.container}>
        <canvas className={classes.canvas} ref={canvasRef} />
      </Box>
    );
  }
}
