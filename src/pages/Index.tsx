
import { useState } from 'react';
import WaveAnimation from '@/components/WaveAnimation';
import WaterLevelHistory from '@/components/WaterLevelHistory';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [currentLevel] = useState(0.75); // 75m represented as 0.75
  const [averageLevel] = useState(0.5);

  return (
    <div className="min-h-screen bg-monitor-background text-white">
      {/* Location and Date Header */}
      <div className="container pt-8 space-y-2">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="w-5 h-5" />
          <span className="text-sm">Université de Montréal, 2900, Boulevard Éd...</span>
        </div>
        <div className="text-white/80">
          <div className="text-xl font-semibold">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <div className="text-sm">
            {new Date().toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-8">
        <Card className="bg-monitor-card backdrop-blur-lg border-white/10">
          <div className="p-6 space-y-8">
            <h1 className="text-3xl font-bold">Water Level Monitor</h1>
            
            {/* Wave Animation */}
            <div className="relative">
              <WaveAnimation
                currentLevel={currentLevel}
                averageLevel={averageLevel}
              />
              
              {/* Current Level Display */}
              <div className="absolute bottom-8 right-8 bg-monitor-card backdrop-blur p-4 rounded-lg">
                <div className="text-sm text-white/80">Current Level</div>
                <div className="text-4xl font-bold">75m</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Water Level History */}
        <WaterLevelHistory />
      </div>
    </div>
  );
};

export default Index;
