
import { useState } from 'react';
import { MapPin, Search, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

const Safety = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dangerLevel = 75; // This would come from an API in a real app

  const getDangerColor = (level: number) => {
    if (level <= 30) return 'bg-green-500';
    if (level <= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const formatDate = () => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = () => {
    const date = new Date();
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    }).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-monitor-background">
      {/* Header */}
      <div className="container pt-4 text-white">
        <div className="flex items-center gap-2 opacity-80 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">Université de Montréal, 2900, Boulevard Éd...</span>
        </div>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">{formatDate()}</h1>
          <p className="text-sm opacity-80">{formatTime()}</p>
        </div>

        <h2 className="text-3xl font-bold mb-6">Sea Near Me</h2>

        {/* Search Bar */}
        <div className="relative max-w-full mb-8">
          <Input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5" />
            <h3 className="text-xl font-semibold">Alerts</h3>
          </div>

          <Card className="bg-white/5 border-white/10">
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-5xl font-bold">{dangerLevel}%</span>
                  <span className="text-lg">Danger Level</span>
                </div>
                <Progress value={dangerLevel} className="h-2 bg-white/20">
                  <div 
                    className={`h-full transition-all ${getDangerColor(dangerLevel)}`} 
                    style={{ width: `${dangerLevel}%` }} 
                  />
                </Progress>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>0% - 30%</span>
                  <span className="text-green-400">Safe</span>
                </div>
                <div className="flex justify-between">
                  <span>31% - 60%</span>
                  <span className="text-yellow-400">Caution</span>
                </div>
                <div className="flex justify-between">
                  <span>61% - 100%</span>
                  <span className="text-red-400">Danger</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Current Status */}
        <Card className="bg-white/5 border-white/10 mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Current Status</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm opacity-60 mb-1">Description</p>
                <p className="text-lg">Possible to evacuate</p>
              </div>
              <div>
                <p className="text-sm opacity-60 mb-1">Affected Region</p>
                <p className="text-lg">Montreal Coastal Area</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Map Section */}
        <Card className="bg-white/5 border-white/10">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Safe Region Map</h3>
            <div className="h-64 bg-white/5 rounded-lg" />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Safety;
