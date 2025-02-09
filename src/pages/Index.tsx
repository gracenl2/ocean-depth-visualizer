
import { useState } from 'react';
import WaveAnimation from '@/components/WaveAnimation';
import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

const Index = () => {
  const [locationAccess, setLocationAccess] = useState(false);

  const formatDate = () => {
    // Set a specific date to match the image
    const date = new Date('2025-02-09T00:17:58');
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = () => {
    // Set a specific time to match the image
    const date = new Date('2025-02-09T00:17:58');
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="min-h-screen bg-[#018786] text-white p-8">
      {/* Header */}
      <h1 className="text-5xl font-bold text-center mb-8">Sea Near Me</h1>

      {/* Location */}
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-6 h-6" />
        <span className="text-xl">Location access denied</span>
      </div>

      {/* Date and Time */}
      <div className="mb-8">
        <h2 className="text-2xl">{formatDate()}</h2>
        <p className="text-xl opacity-80">{formatTime()}</p>
      </div>

      {/* Main Content */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/10 max-w-3xl mx-auto">
        <div className="p-6">
          <h2 className="text-4xl font-bold mb-6">Water Level Monitor</h2>
          
          <div className="relative">
            <WaveAnimation
              currentLevel={0.75}
              averageLevel={0.5}
            />
            
            {/* Current Level Display */}
            <div className="absolute bottom-8 right-8 bg-[#0EA5E9] p-4 rounded-lg">
              <div className="text-lg">Current Level</div>
              <div className="text-5xl font-bold">75m</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;

