
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
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Add "Historical Average" label
      ctx.font = '14px Arial';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.fillText('Historical Average', 10, canvas.height * (1 - averageLevel) - 10);
      
      // Draw animated wave
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      for (let i = 0; i <= canvas.width; i++) {
        const y = Math.sin(i * 0.02 + offset) * 10 + (canvas.height * (1 - currentLevel));
        ctx.lineTo(i, y);
      }
      
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, 'rgba(64, 180, 179, 0.8)');
      gradient.addColorStop(1, 'rgba(64, 180, 179, 0.4)');
      
      ctx.fillStyle = gradient;
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
      className="w-full h-64 rounded-lg bg-monitor-water/10"
      width={800}
      height={256}
    />
  );
};

export default WaveAnimation;
