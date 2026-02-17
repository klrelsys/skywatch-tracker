import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { GroundStation } from './three/GroundStation';
import { DebrisObject } from './three/DebrisObject';
import { LaserBeam } from './three/LaserBeam';
import { TrajectoryTrail } from './three/TrajectoryTrail';
import { GridFloor, EarthBackground } from './three/Environment';
import type { DebrisData } from '@/hooks/useDebrisData';

interface SceneProps {
  data: DebrisData;
  spaceMode: boolean;
}

export function Scene({ data, spaceMode }: SceneProps) {
  const debrisPos: [number, number, number] = [
    data.current.x,
    data.current.y,
    data.current.z,
  ];

  const stationTop: [number, number, number] = [0, 0.8, 0];

  return (
    <Canvas
      camera={{ position: [6, 4, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#4488aa" />
      <directionalLight position={[10, 10, 5]} intensity={0.4} color="#aaccee" />
      <pointLight position={[-5, 5, -5]} intensity={0.2} color="#00d4ff" />

      {/* Stars background */}
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0} fade speed={0.5} />

      {/* Environment */}
      <GridFloor />
      <EarthBackground visible={spaceMode} />

      {/* Core objects */}
      <GroundStation />
      <DebrisObject position={debrisPos} />
      <LaserBeam start={stationTop} end={debrisPos} active={data.connected} />
      <TrajectoryTrail points={data.history} />

      {/* Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        minDistance={2}
        maxDistance={spaceMode ? 50 : 20}
        target={[0, 1, 0]}
      />
    </Canvas>
  );
}
