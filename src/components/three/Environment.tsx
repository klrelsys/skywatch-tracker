import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function GridFloor() {
  return (
    <group>
      <gridHelper
        args={[20, 40, '#1a3a4a', '#0a1a2a']}
        position={[0, 0, 0]}
      />
      {/* Ground plane for subtle reflection */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#060d14"
          transparent
          opacity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

export function EarthBackground({ visible }: { visible: boolean }) {
  const earthRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0005;
    }
  });

  if (!visible) return null;

  return (
    <mesh ref={earthRef} position={[0, -15, -10]}>
      <sphereGeometry args={[12, 32, 32]} />
      <meshStandardMaterial
        color="#0a2a4a"
        emissive="#061828"
        emissiveIntensity={0.3}
        wireframe
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}
