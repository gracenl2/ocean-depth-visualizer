
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { useHistoricalData } from '@/services/waterLevelService';

const timeframes = ['1W', '1M', '3M', '6M', 'YTD', '1Y', '2Y', '5Y', '10Y'];

interface WaterLevelHistoryProps {
  stationId: number;
}

const WaterLevelHistory = ({ stationId }: WaterLevelHistoryProps) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const { data: historicalData = [], isLoading } = useHistoricalData(stationId);

  const highValue = Math.max(...historicalData.map(d => d.level));
  const lowValue = Math.min(...historicalData.map(d => d.level));

  return (
    <Card className="bg-monitor-card backdrop-blur-lg border-white/10 mt-8">
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Historical Data</h2>
          
          {/* Timeframe selector */}
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

        {/* Chart */}
        {isLoading ? (
          <div className="h-64 flex items-center justify-center text-white/60">
            Loading historical data...
          </div>
        ) : (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={historicalData}
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
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">High</div>
            <div className="text-white text-xl font-bold">{highValue.toFixed(2)}m</div>
          </div>
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Low</div>
            <div className="text-white text-xl font-bold">{lowValue.toFixed(2)}m</div>
          </div>
          <div className="bg-black/20 backdrop-blur p-4 rounded-lg">
            <div className="text-white/60 text-sm">Avg Vol</div>
            <div className="text-white text-xl font-bold">
              {((highValue + lowValue) / 2).toFixed(2)}m
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WaterLevelHistory;
