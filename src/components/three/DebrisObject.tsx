import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DebrisObjectProps {
  position: [number, number, number];
}

export function DebrisObject({ position }: DebrisObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.015;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 0.8 + Math.sin(clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <group position={position}>
      {/* Main debris body */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial
          color="#ff8844"
          emissive="#ff6622"
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.4}
        />
      </mesh>

      {/* Glow */}
      <pointLight
        ref={glowRef}
        color="#ff8844"
        intensity={0.8}
        distance={2}
        decay={2}
      />
    </group>
  );
}
