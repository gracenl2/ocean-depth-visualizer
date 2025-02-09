
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SafeRegionMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  // Generate random coordinates within reasonable bounds
  const getRandomLocation = () => {
    // Random coordinates within roughly the world's main landmasses
    const lat = Math.random() * 140 - 70; // -70 to 70 degrees latitude
    const lng = Math.random() * 360 - 180; // -180 to 180 degrees longitude
    return [lng, lat];
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    const randomLocation = getRandomLocation();
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: randomLocation,
      zoom: 3,
      pitch: 45,
    });

    // Add marker at the random location
    new mapboxgl.Marker({ color: '#FF0000' })
      .setLngLat(randomLocation)
      .addTo(map.current);

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  return (
    <div className="space-y-4">
      {!mapboxToken && (
        <input
          type="text"
          placeholder="Enter your Mapbox public token..."
          className="w-full p-2 rounded bg-white/10 border border-white/20 text-white"
          onChange={(e) => setMapboxToken(e.target.value)}
        />
      )}
      <div ref={mapContainer} className="h-[500px] w-full rounded-lg" />
    </div>
  );
};

export default SafeRegionMap;
