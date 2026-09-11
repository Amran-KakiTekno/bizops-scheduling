import React from 'react';
import { MapPin, ShieldCheck, Radio, Navigation } from 'lucide-react';

export default function GeofenceRadarWidget({
  storeName = 'Downtown Flagship #01',
  accuracy = '2.8m (High Precision)',
  radius = '50m Perimeter',
  status = 'Active Geofence Locked',
  coords = '3.1390° N, 101.6869° E'
}) {
  return (
    <div className="rounded-2xl bg-zinc-950/90 border border-white/[0.08] p-4 shadow-rim space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative">
            <span className="absolute inset-0 rounded-full bg-cyan-400 motion-safe:animate-ping opacity-75" />
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-300 font-semibold">
            GPS Radar & Perimeter Telemetry
          </span>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-rim">
          <ShieldCheck className="w-3 h-3" />
          <span>{status}</span>
        </span>
      </div>

      {/* Visual Radar Display */}
      <div className="relative h-32 rounded-xl bg-black/80 border border-white/[0.06] overflow-hidden flex items-center justify-center">
        {/* Concentric Radar Grid Rings */}
        <div className="absolute w-28 h-28 rounded-full border border-cyan-500/10" />
        <div className="absolute w-20 h-20 rounded-full border border-cyan-500/20" />
        <div className="absolute w-12 h-12 rounded-full border border-cyan-500/30" />
        
        {/* Pulsing Radar Sweep */}
        <div className="absolute w-24 h-24 rounded-full bg-gradient-to-tr from-cyan-500/20 to-transparent motion-safe:animate-spin origin-center duration-1000" />

        {/* Center Target Pin */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <MapPin className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-[9px] font-mono text-cyan-300 mt-1 font-semibold bg-black/80 px-1.5 py-0.2 rounded border border-cyan-500/30">
            0.0m Center
          </span>
        </div>

        {/* Coordinates Watermark */}
        <div className="absolute bottom-2 right-2 text-[9px] font-mono text-zinc-500 bg-black/60 px-1.5 py-0.5 rounded border border-white/[0.04]">
          {coords}
        </div>
      </div>

      {/* Telemetry Metrics Strip */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
          <span className="text-[10px] text-zinc-500 block font-mono">Location</span>
          <span className="font-semibold text-zinc-200 text-[11px] truncate block">{storeName}</span>
        </div>
        <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
          <span className="text-[10px] text-zinc-500 block font-mono">GPS Accuracy</span>
          <span className="font-mono tabular-nums text-emerald-400 font-semibold text-[11px] block">{accuracy}</span>
        </div>
        <div className="p-2 rounded-xl bg-black/40 border border-white/[0.06]">
          <span className="text-[10px] text-zinc-500 block font-mono">Radius Bound</span>
          <span className="font-mono tabular-nums text-cyan-400 font-semibold text-[11px] block">{radius}</span>
        </div>
      </div>
    </div>
  );
}
