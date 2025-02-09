
import { useState } from 'react';
import { MapPin, Search as SearchIcon, Menu, Home, Bell } from 'lucide-react';
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

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigationItems = [
    { name: 'Main', icon: Home, action: () => navigate('/') },
    { name: 'Search', icon: SearchIcon, action: () => navigate('/search') },
    { name: 'Alerts', icon: Bell, action: () => navigate('/alerts') },
  ];

  return (
    <div className="min-h-screen bg-monitor-background text-white">
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

      {/* Search Bar */}
      <div className="container pt-8">
        <h1 className="text-3xl font-bold mb-6">Search Cities</h1>
        <div className="relative max-w-md">
          <Input
            type="text"
            placeholder="Search cities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          <SearchIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
        </div>
        
        {/* Search Results */}
        {searchQuery && (
          <Card className="mt-2 absolute w-full max-w-md z-10 bg-monitor-card/95 backdrop-blur border-white/10">
            <div className="p-2">
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => navigate('/')}
                  className="w-full text-left p-3 hover:bg-white/10 rounded-lg transition-colors text-white"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-white/80" />
                    <span>{city.name}</span>
                  </div>
                  <div className="text-sm text-white/60 ml-6">
                    {city.address}
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
