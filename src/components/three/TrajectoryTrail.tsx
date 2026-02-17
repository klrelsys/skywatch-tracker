import { useMemo } from 'react';
import * as THREE from 'three';
import type { DebrisPosition } from '@/hooks/useDebrisData';

interface TrajectoryTrailProps {
  points: DebrisPosition[];
}

export function TrajectoryTrail({ points }: TrajectoryTrailProps) {
  const line = useMemo(() => {
    if (points.length < 2) return null;

    const positions = new Float32Array(points.length * 3);
    const colors = new Float32Array(points.length * 3);
    const color = new THREE.Color('#00d4ff');

    points.forEach((p, i) => {
      positions[i * 3] = p.x;
      positions[i * 3 + 1] = p.y;
      positions[i * 3 + 2] = p.z;
      const alpha = i / points.length;
      colors[i * 3] = color.r * alpha;
      colors[i * 3 + 1] = color.g * alpha;
      colors[i * 3 + 2] = color.b * alpha;
    });

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });

    return new THREE.Line(geo, mat);
  }, [points]);

  if (!line) return null;

  return <primitive object={line} />;
}
