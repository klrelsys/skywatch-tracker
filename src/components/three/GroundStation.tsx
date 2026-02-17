import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GroundStation() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 2) * 0.5;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 8]} />
        <meshStandardMaterial color="#1a2a3a" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* Tower */}
      <mesh position={[0, 0.4, 0]} ref={meshRef}>
        <cylinderGeometry args={[0.08, 0.15, 0.7, 6]} />
        <meshStandardMaterial color="#2a3a4a" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Emitter tip */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.12, 0.2, 6]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00d4ff" 
          emissiveIntensity={0.5} 
          metalness={0.5} 
          roughness={0.1} 
        />
      </mesh>

      {/* Glow light */}
      <pointLight
        ref={glowRef}
        position={[0, 0.9, 0]}
        color="#00d4ff"
        intensity={1.5}
        distance={3}
        decay={2}
      />
    </group>
  );
}
