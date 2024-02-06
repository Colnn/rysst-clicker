import { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import useStyle from './style';

interface ShopObjectProps {
    amount: number;
    objectName: string;
    backgroundSVG: string;
}

export default function ShopObjectDisplay({ amount, objectName, backgroundSVG }: ShopObjectProps) {
    const classes = useStyle();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const drawImagesOnCanvas = () => {
            if (!canvasRef.current || amount == 0) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (!ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.canvas.width = (document.getElementById('canvas')?.offsetWidth || 0) * 0.985;
            ctx.canvas.height = 120;

            let x = 0;
            let y = 0;

            for (let i = 0; i < amount; i++) {
                const img = new Image();
                if(objectName === "Developer") {
                    img.src = `/Developer${Math.floor(Math.random() * 20)}.svg`;
                } else {
                    img.src = `/${objectName}.svg`;
                }

                img.onload = () => {
                    ctx.drawImage(img, x, y, 80, 80);

                    // Adjust x and y for the next image
                    x += 55; // You can adjust the spacing between images
                    if(y === 0) {
                        y = 45
                    } else if(y == 45) {
                        y = 0
                    }
                };
            }
        };

        drawImagesOnCanvas();
    }, [amount]);

    return (
        <Box id='canvas' className={classes.canvas}>
            <canvas
                ref={canvasRef}
            />
        </Box>
    );
}
