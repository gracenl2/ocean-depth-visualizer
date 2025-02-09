
import { useQuery } from '@tanstack/react-query';

export interface WaterLevelData {
  id: number;
  name: string;
  address: string;
  currentLevel: number;
  averageLevel: number;
}

export interface HistoricalData {
  date: string;
  level: number;
}

// NOAA API endpoint for water level data
const NOAA_API_BASE = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

// Sample station IDs for major coastal cities
const STATIONS = [
  { id: 8443970, name: 'Boston', address: 'Massachusetts' },
  { id: 8518750, name: 'The Battery', address: 'New York' },
  { id: 8638610, name: 'Chesapeake Bay', address: 'Virginia' },
];

const getLast31DaysDateRange = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Get last 31 days

  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0],
  };
};

export const fetchWaterLevelData = async (): Promise<WaterLevelData[]> => {
  try {
    const { startDate, endDate } = getLast31DaysDateRange();
    
    const promises = STATIONS.map(async (station) => {
      const url = `${NOAA_API_BASE}?begin_date=${startDate}&end_date=${endDate}&station=${station.id}&product=water_level&datum=MLLW&units=metric&time_zone=gmt&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        console.error('NOAA API Error:', data.error);
        return {
          id: station.id,
          name: station.name,
          address: station.address,
          currentLevel: 0,
          averageLevel: 0,
        };
      }
      
      // Calculate average and current levels from the data
      const levels = data.data?.map((d: any) => parseFloat(d.v)) || [];
      const averageLevel = levels.length > 0 
        ? levels.reduce((a: number, b: number) => a + b, 0) / levels.length 
        : 0;
      const currentLevel = levels.length > 0 ? levels[levels.length - 1] : 0;

      return {
        id: station.id,
        name: station.name,
        address: station.address,
        currentLevel: currentLevel / 10, // Convert to normalized value between 0-1
        averageLevel: averageLevel / 10,
      };
    });

    return await Promise.all(promises);
  } catch (error) {
    console.error('Error fetching water level data:', error);
    return [];
  }
};

export const useWaterLevelData = () => {
  return useQuery({
    queryKey: ['waterLevels'],
    queryFn: fetchWaterLevelData,
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
  });
};

export const fetchHistoricalData = async (stationId: number): Promise<HistoricalData[]> => {
  try {
    const { startDate, endDate } = getLast31DaysDateRange();
    
    const url = `${NOAA_API_BASE}?begin_date=${startDate}&end_date=${endDate}&station=${stationId}&product=water_level&datum=MLLW&units=metric&time_zone=gmt&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      console.error('NOAA API Error:', data.error);
      return [];
    }
    
    return data.data?.map((d: any) => ({
      date: new Date(d.t).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      level: parseFloat(d.v),
    })) || [];
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
};

export const useHistoricalData = (stationId: number) => {
  return useQuery({
    queryKey: ['historicalData', stationId],
    queryFn: () => fetchHistoricalData(stationId),
    refetchInterval: 1000 * 60 * 60, // Refetch every hour
  });
};
