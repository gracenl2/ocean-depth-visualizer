
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
      gradient.addColorStop(0, '#60A5FA'); // Light blue
      gradient.addColorStop(1, '#3B82F6'); // Darker blue
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      offset += 0.02;
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
      className="w-full h-[400px] rounded-lg bg-white"
      width={800}
      height={400}
    />
  );
};

export default WaveAnimation;

