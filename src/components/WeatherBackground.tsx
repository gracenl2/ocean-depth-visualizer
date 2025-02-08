
import { ReactNode } from 'react';

interface WeatherBackgroundProps {
  isRainy: boolean;
  children: ReactNode;
}

const WeatherBackground = ({ isRainy, children }: WeatherBackgroundProps) => {
  return (
    <div
      className={`min-h-screen transition-colors duration-700 ${
        isRainy ? 'bg-weather-rainy' : 'bg-weather-sunny'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default WeatherBackground;
