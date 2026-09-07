import React from 'react';
import { PresetCompConfig } from '../types';

interface VisualCompTransferProps {
  comp: PresetCompConfig;
}

export const VisualCompTransfer: React.FC<VisualCompTransferProps> = ({ comp }) => {
  const width = 240;
  const height = 140;
  const padding = 20;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Range from -60 dB to 0 dB
  const minDb = -60;
  const maxDb = 0;

  const dbToX = (db: number) => {
    const clamped = Math.max(minDb, Math.min(maxDb, db));
    return padding + ((clamped - minDb) / (maxDb - minDb)) * graphWidth;
  };

  const dbToY = (db: number) => {
    const clamped = Math.max(minDb, Math.min(maxDb, db));
    return padding + graphHeight - ((clamped - minDb) / (maxDb - minDb)) * graphHeight;
  };

  // Parse ratio (e.g., "4:1" -> 4, "Limit" -> 20)
  let ratioNum = 3;
  if (comp.ratio.includes(':')) {
    ratioNum = parseFloat(comp.ratio.split(':')[0]) || 3;
  } else if (comp.ratio.toLowerCase().includes('limit')) {
    ratioNum = 20;
  }

  const threshX = dbToX(comp.threshold);
  const threshY = dbToY(comp.threshold);

  // Knee curve calculation
  const startX = dbToX(minDb);
  const startY = dbToY(minDb);

  const endInDb = 0;
  const dbAboveThresh = endInDb - comp.threshold;
  const compressedDbAbove = dbAboveThresh / ratioNum;
  const endOutDb = comp.threshold + compressedDbAbove + comp.makeUpGain;

  const endX = dbToX(endInDb);
  const endY = dbToY(Math.min(0, endOutDb));

  // Gain reduction indicator in dB
  const simGR = Math.min(18, Math.max(0, -comp.threshold * (1 - 1 / ratioNum) * 0.4));

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-3.5 text-xs select-none shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-purple-400 font-mono text-xs">{comp.model}</span>
          <span className="px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded text-[10px] border border-purple-500/30 font-mono font-bold">
            {comp.ratio}
          </span>
        </div>
        <span className="text-[10px] text-white/50 font-mono">
          Make-Up: <strong className="text-white">+{comp.makeUpGain} dB</strong>
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* SVG Transfer Function */}
        <div className="relative bg-[#000000] border border-white/10 rounded-lg overflow-hidden flex-1 shadow-inner">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 block">
            {/* Linear 1:1 Reference Line */}
            <line
              x1={dbToX(minDb)}
              y1={dbToY(minDb)}
              x2={dbToX(maxDb)}
              y2={dbToY(maxDb)}
              stroke="#262626"
              strokeDasharray="2,2"
              strokeWidth="1"
            />

            {/* Threshold Vertical Guideline */}
            <line
              x1={threshX}
              y1={padding}
              x2={threshX}
              y2={height - padding}
              stroke="#404040"
              strokeDasharray="2,2"
              strokeWidth="1"
            />

            {/* Below Threshold segment (1:1 with makeup) */}
            <line
              x1={startX}
              y1={startY}
              x2={threshX}
              y2={threshY}
              stroke="#38bdf8"
              strokeWidth="2.5"
            />

            {/* Above Threshold compression line */}
            <line
              x1={threshX}
              y1={threshY}
              x2={endX}
              y2={endY}
              stroke="#c084fc"
              strokeWidth="2.5"
            />

            {/* Threshold Point Marker */}
            <circle cx={threshX} cy={threshY} r="4.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1.5" />

            {/* Axis labels */}
            <text x={dbToX(-60)} y={height - 6} fill="#737373" fontSize="8" fontFamily="monospace">
              -60 dB
            </text>
            <text x={threshX} y={height - 6} fill="#c084fc" fontSize="8" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              {comp.threshold} dB
            </text>
            <text x={dbToX(0) - 2} y={height - 6} fill="#737373" fontSize="8" textAnchor="end" fontFamily="monospace">
              0
            </text>
          </svg>
        </div>

        {/* Realtime Simulated Gain Reduction (GR) Meter */}
        <div className="flex flex-col items-center bg-[#000000] border border-white/10 rounded-lg p-1.5 w-12 h-28 justify-between shadow-inner">
          <span className="text-[9px] font-mono text-white/50 font-bold">GR</span>
          <div className="w-2.5 h-16 bg-[#161616] rounded-full overflow-hidden flex flex-col justify-end p-0.5 border border-white/5">
            <div
              className="w-full bg-gradient-to-t from-[#AEEA00] via-yellow-400 to-red-500 rounded-full transition-all duration-300"
              style={{ height: `${Math.min(100, (simGR / 18) * 100)}%` }}
            />
          </div>
          <span className="text-[9px] font-mono text-purple-300 font-bold">
            -{simGR.toFixed(0)}dB
          </span>
        </div>
      </div>

      {/* Attack / Release / Knee Badges */}
      <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-[10px] font-mono">
        <div className="bg-[#161616] p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-white/40 block text-[9px] uppercase">Attack</span>
          <span className="text-white font-semibold">{comp.attack}</span>
        </div>
        <div className="bg-[#161616] p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-white/40 block text-[9px] uppercase">Release</span>
          <span className="text-white font-semibold">{comp.release}</span>
        </div>
        <div className="bg-[#161616] p-1.5 rounded-lg border border-white/5 text-center">
          <span className="text-white/40 block text-[9px] uppercase">Knee</span>
          <span className="text-white font-semibold">{comp.knee > 2 ? 'Soft' : 'Hard'} ({comp.knee})</span>
        </div>
      </div>
    </div>
  );
};
