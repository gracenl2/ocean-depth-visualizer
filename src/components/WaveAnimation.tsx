
import { useEffect, useRef } from 'react';

interface WaveAnimationProps {
  currentLevel: number;
  averageLevel: number;
}

const WaveAnimation = ({ currentLevel, averageLevel }: WaveAnimationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let offset = 0;

    const draw = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw average water level line
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height * (1 - averageLevel));
      ctx.lineTo(canvas.width, canvas.height * (1 - averageLevel));
      ctx.strokeStyle = '#94A3B8';
      ctx.stroke();
      
      // Draw animated wave
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let i = 0; i <= canvas.width; i++) {
        const y = Math.sin(i * 0.02 + offset) * 10 + (canvas.height * (1 - currentLevel));
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = '#0EA5E9';
      ctx.fill();
      
      offset += 0.05;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentLevel, averageLevel]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-64 rounded-lg"
      width={800}
      height={256}
    />
  );
};

export default WaveAnimation;
