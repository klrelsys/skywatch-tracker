import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface LaserBeamProps {
  start: [number, number, number];
  end: [number, number, number];
  active: boolean;
}

export function LaserBeam({ start, end, active }: LaserBeamProps) {
  const lineRef = useRef<THREE.Line>(null);

  const line = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array([...start, ...end]);
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.LineBasicMaterial({
      color: '#00d4ff',
      transparent: true,
      opacity: 0.6,
    });
    return new THREE.Line(geo, mat);
  }, []);

  useFrame(({ clock }) => {
    if (!active || !lineRef.current) return;
    const positions = lineRef.current.geometry.attributes.position as THREE.BufferAttribute;
    positions.setXYZ(0, start[0], start[1], start[2]);
    positions.setXYZ(1, end[0], end[1], end[2]);
    positions.needsUpdate = true;
    (lineRef.current.material as THREE.LineBasicMaterial).opacity = 0.4 + Math.sin(clock.elapsedTime * 8) * 0.3;
  });

  if (!active) return null;

  return <primitive ref={lineRef} object={line} />;
}
