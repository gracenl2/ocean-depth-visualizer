
import { useState } from 'react';
import WaveAnimation from '@/components/WaveAnimation';
import WeatherBackground from '@/components/WeatherBackground';
import { Cloud, Droplets, MapPin } from 'lucide-react';

const Index = () => {
  const [isRainy] = useState(false);
  const [currentLevel] = useState(0.7);
  const [averageLevel] = useState(0.5);

  return (
    <WeatherBackground isRainy={isRainy}>
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            Sea Level Monitor
          </h1>
          <div className="flex items-center justify-center gap-2 text-ocean-dark animate-fade-in delay-100">
            <MapPin className="w-4 h-4" />
            <span>Pacific Ocean, San Francisco Bay</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 space-y-6 shadow-lg animate-fade-in delay-200">
          {/* Current Weather */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isRainy ? (
                <Cloud className="w-6 h-6 text-ocean-dark animate-float" />
              ) : (
                <Droplets className="w-6 h-6 text-ocean-dark animate-float" />
              )}
              <span className="text-lg font-medium">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Water Level Visualization */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-ocean-dark">
              Current Water Level
            </h2>
            <WaveAnimation
              currentLevel={currentLevel}
              averageLevel={averageLevel}
            />
            <div className="flex justify-between text-sm text-gray-600">
              <span>Current: {(currentLevel * 100).toFixed(1)}%</span>
              <span>Average: {(averageLevel * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Options Menu */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 animate-fade-in delay-300">
          <nav className="flex justify-around">
            <button className="px-4 py-2 rounded-lg hover:bg-ocean-light transition-colors duration-200">
              History
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-ocean-light transition-colors duration-200">
              Locations
            </button>
            <button className="px-4 py-2 rounded-lg hover:bg-ocean-light transition-colors duration-200">
              Alerts
            </button>
          </nav>
        </div>
      </div>
    </WeatherBackground>
  );
};

export default Index;
