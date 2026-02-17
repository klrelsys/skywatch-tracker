import { Crosshair, Radio, Satellite, Download, ToggleLeft, ToggleRight } from 'lucide-react';
import type { DebrisData } from '@/hooks/useDebrisData';

interface UIOverlayProps {
  data: DebrisData;
  spaceMode: boolean;
  onToggleScale: () => void;
  onFetchHistory: () => void;
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline gap-4">
      <span className="text-muted-foreground text-xs uppercase tracking-wider">{label}</span>
      <span className="font-mono text-sm text-foreground tabular-nums">{value}</span>
    </div>
  );
}

export function UIOverlay({ data, spaceMode, onToggleScale, onFetchHistory }: UIOverlayProps) {
  return (
    <div className="absolute top-0 right-0 h-full w-80 flex flex-col gap-3 p-4 pointer-events-none z-10">
      {/* Header */}
      <div className="glass-panel rounded-lg p-4 pointer-events-auto">
        <div className="flex items-center gap-2 mb-1">
          <Satellite className="h-4 w-4 text-primary" />
          <h1 className="font-display text-sm font-bold tracking-wide text-primary glow-text-cyan">
            SDLR STATION
          </h1>
        </div>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Space Debris Laser Ranging · PoC
        </p>
      </div>

      {/* Connection Status */}
      <div className="glass-panel rounded-lg px-4 py-2 pointer-events-auto flex items-center gap-2">
        <div className={`h-2 w-2 rounded-full ${data.connected ? 'bg-glow-green' : 'bg-glow-red'} animate-pulse-glow`} />
        <span className="text-xs text-muted-foreground">
          {data.connected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>

      {/* Position Data */}
      <div className="glass-panel rounded-lg p-4 pointer-events-auto space-y-2">
        <div className="flex items-center gap-2 mb-3">
          <Crosshair className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">
            Object Position
          </span>
        </div>
        <DataRow label="X" value={`${data.current.x.toFixed(3)} m`} />
        <DataRow label="Y" value={`${data.current.y.toFixed(3)} m`} />
        <DataRow label="Z" value={`${data.current.z.toFixed(3)} m`} />
        <div className="border-t border-border my-2" />
        <DataRow label="Distance (r)" value={`${data.distance.toFixed(3)} m`} />
        <DataRow label="θ (theta)" value={`${data.theta.toFixed(2)}°`} />
        <DataRow label="φ (phi)" value={`${data.phi.toFixed(2)}°`} />
      </div>

      {/* Controls */}
      <div className="glass-panel rounded-lg p-4 pointer-events-auto space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <Radio className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-display font-semibold text-primary uppercase tracking-wider">
            Controls
          </span>
        </div>

        <button
          onClick={onToggleScale}
          className="w-full flex items-center justify-between rounded-md border border-border bg-secondary/50 px-3 py-2 text-xs hover:bg-secondary transition-colors"
        >
          <span>Scale Mode: {spaceMode ? 'Space' : 'Local'}</span>
          {spaceMode ? (
            <ToggleRight className="h-4 w-4 text-primary" />
          ) : (
            <ToggleLeft className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        <button
          onClick={onFetchHistory}
          className="w-full flex items-center justify-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-xs text-primary hover:bg-primary/20 transition-colors glow-cyan"
        >
          <Download className="h-3.5 w-3.5" />
          Fetch Historical Data
        </button>
      </div>

      {/* Trail info */}
      <div className="glass-panel rounded-lg px-4 py-2 pointer-events-auto">
        <span className="text-[10px] text-muted-foreground">
          Trail Points: {data.history.length}
        </span>
      </div>
    </div>
  );
}
