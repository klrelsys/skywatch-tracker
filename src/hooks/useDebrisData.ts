import { useState, useEffect, useCallback, useRef } from 'react';

export interface DebrisPosition {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export interface DebrisData {
  current: DebrisPosition;
  distance: number;
  theta: number;
  phi: number;
  connected: boolean;
  history: DebrisPosition[];
}

// Simulated orbital debris path
function generatePosition(t: number): DebrisPosition {
  const speed = 0.0005;
  const radius = 3;
  const wobble = Math.sin(t * speed * 3) * 0.5;
  
  return {
    x: Math.cos(t * speed) * radius + wobble,
    y: Math.sin(t * speed * 0.7) * 1.5 + 2 + Math.sin(t * speed * 2) * 0.3,
    z: Math.sin(t * speed) * radius + Math.cos(t * speed * 1.5) * 0.5,
    timestamp: t,
  };
}

function cartesianToSpherical(x: number, y: number, z: number) {
  const r = Math.sqrt(x * x + y * y + z * z);
  const theta = Math.atan2(Math.sqrt(x * x + z * z), y) * (180 / Math.PI);
  const phi = Math.atan2(z, x) * (180 / Math.PI);
  return { r, theta, phi };
}

export function useDebrisData(pollingInterval = 500) {
  const [data, setData] = useState<DebrisData>({
    current: { x: 3, y: 2, z: 0, timestamp: Date.now() },
    distance: 0,
    theta: 0,
    phi: 0,
    connected: true,
    history: [],
  });
  
  const timeRef = useRef(Date.now());
  const historyRef = useRef<DebrisPosition[]>([]);

  const fetchCurrent = useCallback(() => {
    timeRef.current += pollingInterval;
    const pos = generatePosition(timeRef.current);
    const { r, theta, phi } = cartesianToSpherical(pos.x, pos.y, pos.z);
    
    historyRef.current = [...historyRef.current.slice(-50), pos];
    
    setData({
      current: pos,
      distance: r,
      theta,
      phi,
      connected: true,
      history: historyRef.current,
    });
  }, [pollingInterval]);

  useEffect(() => {
    const interval = setInterval(fetchCurrent, pollingInterval);
    return () => clearInterval(interval);
  }, [fetchCurrent, pollingInterval]);

  const fetchHistorical = useCallback(() => {
    const now = timeRef.current;
    const points: DebrisPosition[] = [];
    for (let i = 100; i >= 0; i--) {
      points.push(generatePosition(now - i * pollingInterval));
    }
    historyRef.current = points;
    setData(prev => ({ ...prev, history: points }));
  }, [pollingInterval]);

  return { data, fetchHistorical };
}
