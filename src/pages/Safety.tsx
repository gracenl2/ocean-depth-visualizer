
import { useState } from 'react';
import { MapPin, Search, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Safety = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dangerLevel = 90; // This would come from an API in a real app

  const getDangerColor = (level: number) => {
    if (level <= 30) return 'bg-green-500';
    if (level <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDangerMessage = (level: number) => {
    if (level === 100) return "EVACUATE IMMEDIATELY";
    if (level >= 75) return "Possible to evacuate";
    if (level >= 50) return "Rainfall, possible flooding";
    return "Monitor conditions";
  };

  return (
    <div className="min-h-screen bg-monitor-background text-white">
      {/* Search Bar */}
      <div className="container pt-8">
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search regions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-8">
        <Card className="bg-monitor-card backdrop-blur-lg border-white/10">
          <div className="p-6 space-y-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white">Safe Region Map</h1>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="text-sm text-white/80">Montreal, Canada</span>
              </div>
            </div>

            {/* Danger Level Indicator */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <div className="text-sm text-white/60">Current Danger Level</div>
                  <div className="text-4xl font-bold">{dangerLevel}%</div>
                </div>
                <AlertTriangle 
                  className={`w-8 h-8 ${
                    dangerLevel > 60 ? 'text-red-500' : 
                    dangerLevel > 30 ? 'text-yellow-500' : 
                    'text-green-500'
                  }`} 
                />
              </div>
              <Progress 
                value={dangerLevel} 
                className={`h-3 ${getDangerColor(dangerLevel)}`} 
              />
            </div>

            {/* Alert Description */}
            <Alert className="border-white/10 bg-white/5">
              <AlertDescription className="text-white">
                <div className="space-y-4">
                  <div className="font-semibold text-lg">
                    {getDangerMessage(dangerLevel)}
                  </div>
                  <div className="text-sm text-white/80">
                    Affected regions: Downtown Montreal, Old Port, Plateau Mont-Royal
                  </div>
                </div>
              </AlertDescription>
            </Alert>

            {/* Danger Level Legend */}
            <div className="space-y-2">
              <h2 className="font-semibold">Danger Level Categories:</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>0-30% Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                  <span>31-60% Caution</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>61-100% Danger</span>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="h-96 bg-white/5 rounded-lg flex items-center justify-center">
              <span className="text-white/60">Safe Region Map View</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Safety;
