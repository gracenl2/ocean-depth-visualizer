
import { useState } from 'react';
import { MapPin, Search, Menu, Home, Bell } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

// Sample data - in a real app this would come from an API
const cities = [
  { id: 1, name: 'Université de Montréal', address: '2900, Boulevard Éd...', currentLevel: 0.75, averageLevel: 0.5 },
  { id: 2, name: 'Quebec City', address: '123 Rue Principal', currentLevel: 0.82, averageLevel: 0.6 },
  { id: 3, name: 'Ottawa', address: '456 Parliament St', currentLevel: 0.68, averageLevel: 0.45 },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigationItems = [
    { name: 'Main', icon: Home, action: () => navigate('/') },
    { name: 'Search', icon: Search, action: () => navigate('/search') },
    { name: 'Alerts', icon: Bell, action: () => navigate('/safety') },
  ];

  const handleCitySelect = (city: typeof cities[0]) => {
    navigate('/monitor', { state: { selectedCity: city } });
  };

  return (
    <div className="min-h-screen bg-monitor-background">
      {/* Navigation Menu */}
      <div className="fixed top-4 right-4 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-sky-400/20">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-sky-50">
            <SheetHeader>
              <SheetTitle className="text-sky-900">Sea Near Me</SheetTitle>
            </SheetHeader>
            <div className="mt-6 space-y-4">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start gap-2 text-sky-800 hover:bg-sky-100 hover:text-sky-900"
                  onClick={item.action}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Search Section */}
      <div className="container pt-8">
        <h1 className="text-4xl font-bold text-white mb-8">Sea Near Me</h1>
        <div className="relative max-w-md mx-auto">
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
        <div className="mt-4 space-y-4 max-w-md mx-auto">
          {filteredCities.map((city) => (
            <Card
              key={city.id}
              className="bg-monitor-card/95 backdrop-blur border-white/10 hover:bg-monitor-card/80 transition-colors cursor-pointer"
              onClick={() => handleCitySelect(city)}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-white/80" />
                  <span className="font-medium">{city.name}</span>
                </div>
                <div className="mt-1 text-sm text-white/60">{city.address}</div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-sm text-white/80">Current Level</span>
                  <span className="text-lg font-semibold text-white">{(city.currentLevel * 100).toFixed(0)}m</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
