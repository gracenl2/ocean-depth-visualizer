
import { useState } from 'react';
import WaveAnimation from '@/components/WaveAnimation';
import WaterLevelHistory from '@/components/WaterLevelHistory';
import { MapPin, Search } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

// Sample data - in a real app this would come from an API
const cities = [
  { id: 1, name: 'Université de Montréal', address: '2900, Boulevard Éd...', currentLevel: 0.75, averageLevel: 0.5 },
  { id: 2, name: 'Quebec City', address: '123 Rue Principal', currentLevel: 0.82, averageLevel: 0.6 },
  { id: 3, name: 'Ottawa', address: '456 Parliament St', currentLevel: 0.68, averageLevel: 0.45 },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-monitor-background text-white">
      {/* Search Bar */}
      <div className="container pt-8">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <Card className="mt-2 absolute w-full max-w-[calc(100%-4rem)] z-10 bg-monitor-card/95 backdrop-blur border-white/10">
            <div className="p-2">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    setSearchQuery('');
                  }}
                  className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/80" />
                    <span>{city.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Location and Date Header */}
      <div className="container pt-4 space-y-2">
        <div className="flex items-center gap-2 text-white/90">
          <MapPin className="w-5 h-5" />
          <span className="text-sm">{selectedCity.name}, {selectedCity.address}</span>
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
                currentLevel={selectedCity.currentLevel}
                averageLevel={selectedCity.averageLevel}
              />
              
              {/* Current Level Display */}
              <div className="absolute bottom-8 right-8 bg-monitor-card backdrop-blur p-4 rounded-lg">
                <div className="text-sm text-white/80">Current Level</div>
                <div className="text-4xl font-bold">{(selectedCity.currentLevel * 100).toFixed(0)}m</div>
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
