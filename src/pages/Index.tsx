import { useState } from 'react';
import { Scene } from '@/components/Scene';
import { UIOverlay } from '@/components/UIOverlay';
import { useDebrisData } from '@/hooks/useDebrisData';

const Index = () => {
  const { data, fetchHistorical } = useDebrisData(500);
  const [spaceMode, setSpaceMode] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      {/* 3D Canvas - full screen */}
      <div className="absolute inset-0">
        <Scene data={data} spaceMode={spaceMode} />
      </div>

      {/* UI Overlay */}
      <UIOverlay
        data={data}
        spaceMode={spaceMode}
        onToggleScale={() => setSpaceMode(!spaceMode)}
        onFetchHistory={fetchHistorical}
      />

      {/* Bottom-left label */}
      <div className="absolute bottom-4 left-4 z-10">
        <p className="text-[10px] text-muted-foreground font-mono opacity-50">
          SDLR-POC v0.1 · SIMULATED DATA
        </p>
      </div>
    </div>
  );
};

export default Index;
