import { useEffect, useRef } from 'react';
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

  const drawImagesOnCanvas = () => {
    if (!canvasRef.current || amount == 0) return;

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
      const img = new Image();
      img.src = `/${objectName.toLowerCase()}-background.png`;

      img.onload = () => {
        ctx.drawImage(img, x, y, 200, 200);

        x += 200;
      };
    }

    let x2 = 0;
    let y2 = 10;

    for (let i = 0; i < amount; i++) {
      const img = new Image();
      img.src = `/${objectName.toLowerCase() + i % 3}.png`;

      img.onload = () => {
        ctx.drawImage(img, x2, y2, 100, 100);

        // Adjust x and y for the next image
        x2 += 55; // You can adjust the spacing between images
        if (y2 === 55) {
          y2 = 10;
        } else if (y2 == 10) {
          y2 = 55;
        }
      };
    }
  };

  useEffect(() => {
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
