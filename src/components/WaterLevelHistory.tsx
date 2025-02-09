
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

interface WaterLevelData {
  date: string;
  level: number;
}

const getStationId = (cityName: string): string => {
  // NOAA station IDs for water level data
  const stationMap: { [key: string]: string } = {
    'Université de Montréal': '8518750', // New York
    'Quebec City': '8443970',            // Boston
    'Ottawa': '8638610',                 // Chesapeake Bay
  };
  return stationMap[cityName] || '8518750'; // Default to New York if city not found
};

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0].replace(/-/g, '');
};

const WaterLevelHistory = ({ selectedCity }: { selectedCity: { name: string } }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1W');
  const [waterLevelData, setWaterLevelData] = useState<WaterLevelData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWaterLevelData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7); // Get last 7 days of data

        const stationId = getStationId(selectedCity.name);
        const response = await fetch(
          `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?` +
          `begin_date=${formatDate(startDate)}` +
          `&end_date=${formatDate(endDate)}` +
          `&station=${stationId}` +
          `&product=water_level` +
          `&datum=MLLW` +
          `&units=metric` +
          `&time_zone=gmt` +
          `&format=json`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch water level data');
        }

        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error.message);
        }

        const formattedData = data.data?.map((item: any) => ({
          date: new Date(item.t).toLocaleDateString(),
          level: parseFloat(item.v)
        })).filter((item: WaterLevelData) => !isNaN(item.level)) || [];

        setWaterLevelData(formattedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch water level data');
        console.error('Error fetching water level data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWaterLevelData();
  }, [selectedCity.name]);

  const timeframes = ['1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y', '5Y', '10Y'];
  const highValue = Math.max(...waterLevelData.map(d => d.level));
  const lowValue = Math.min(...waterLevelData.map(d => d.level));
  const avgValue = waterLevelData.length > 0 
    ? (waterLevelData.reduce((sum, d) => sum + d.level, 0) / waterLevelData.length).toFixed(2)
    : 'N/A';

  return (
    <Card className="bg-monitor-card backdrop-blur-lg border-white/10 mt-8">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Historical Data</h2>
          
          <div className="flex gap-2">
            {timeframes.map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-3 py-1 rounded-lg text-sm ${
                  selectedTimeframe === timeframe
                    ? 'bg-monitor-water text-white'
                    : 'text-white/60 hover:bg-white/10'
                }`}
              >
                {timeframe}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full">
          {isLoading ? (
            <div className="h-full flex items-center justify-center text-white/60">
              Loading water level data...
            </div>
          ) : error ? (
            <div className="h-full flex items-center justify-center text-white/60">
              {error}
            </div>
          ) : waterLevelData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-white/60">
              No water level data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={waterLevelData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="waterLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#40B4B3" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#40B4B3" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255, 255, 255, 0.6)' }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-monitor-card backdrop-blur p-3 rounded-lg border border-white/10">
                          <p className="text-white/80">{payload[0].payload.date}</p>
                          <p className="text-xl font-bold text-white">
                            {payload[0].value.toFixed(2)}m
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="level"
                  stroke="#40B4B3"
                  fillOpacity={1}
                  fill="url(#waterLevel)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">High</div>
            <div className="text-white text-xl font-bold">
              {!isNaN(highValue) ? `${highValue.toFixed(2)}m` : 'N/A'}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Low</div>
            <div className="text-white text-xl font-bold">
              {!isNaN(lowValue) ? `${lowValue.toFixed(2)}m` : 'N/A'}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Avg Level</div>
            <div className="text-white text-xl font-bold">{avgValue}m</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterLevelHistory;
