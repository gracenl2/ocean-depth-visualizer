
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const SafeRegionMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-73.5674, 45.5017], // Montreal coordinates
      zoom: 12,
      pitch: 45,
    });

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
