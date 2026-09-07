import React, { useState } from 'react';
import { EQBand } from '../types';

interface VisualEQCurveProps {
  bands: EQBand[];
  hpfFreq?: number;
  hpfSlope?: string;
  modelName: string;
  onBandChange?: (bandId: string, updates: Partial<EQBand>) => void;
  interactive?: boolean;
}

export const VisualEQCurve: React.FC<VisualEQCurveProps> = ({
  bands,
  hpfFreq = 80,
  hpfSlope = '18 dB/oct',
  modelName,
  onBandChange,
  interactive = false
}) => {
  const [selectedBandId, setSelectedBandId] = useState<string>(bands[0]?.id || 'b1');

  // Width and height of SVG canvas
  const svgWidth = 640;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 24;
  const chartWidth = svgWidth - paddingX * 2;
  const chartHeight = svgHeight - paddingY * 2;

  // Logarithmic conversion for frequency (20 Hz to 20000 Hz)
  const minFreq = 20;
  const maxFreq = 20000;
  const logMin = Math.log10(minFreq);
  const logMax = Math.log10(maxFreq);

  const freqToX = (freq: number) => {
    const clamped = Math.max(minFreq, Math.min(maxFreq, freq));
    const log = Math.log10(clamped);
    return paddingX + ((log - logMin) / (logMax - logMin)) * chartWidth;
  };

  // dB to Y (-15 dB to +15 dB)
  const minDb = -15;
  const maxDb = 15;
  const dbToY = (db: number) => {
    const clamped = Math.max(minDb, Math.min(maxDb, db));
    return paddingY + chartHeight / 2 - (clamped / (maxDb - minDb)) * chartHeight;
  };

  // Calculate composite response curve across frequencies
  const steps = 140;
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const frac = i / steps;
    const currentFreq = Math.pow(10, logMin + frac * (logMax - logMin));
    let totalGain = 0;

    // HPF response
    if (hpfFreq && currentFreq < hpfFreq) {
      const octavesBelow = Math.log2(hpfFreq / currentFreq);
      const slopeDb = hpfSlope.includes('24') ? 24 : hpfSlope.includes('18') ? 18 : 12;
      totalGain -= octavesBelow * slopeDb;
    }

    // Sum PEQ / Shelf bands
    bands.forEach(band => {
      if (!band.enabled) return;
      if (band.type === 'peq') {
        const bandwidth = band.q > 0 ? 1 / band.q : 1;
        const diffInOctaves = Math.abs(Math.log2(currentFreq / band.freq));
        const factor = Math.exp(-0.5 * Math.pow(diffInOctaves / (bandwidth * 0.5), 2));
        totalGain += band.gain * factor;
      } else if (band.type === 'low-shelf') {
        if (currentFreq <= band.freq) {
          totalGain += band.gain;
        } else if (currentFreq <= band.freq * 2) {
          const ratio = (band.freq * 2 - currentFreq) / band.freq;
          totalGain += band.gain * ratio;
        }
      } else if (band.type === 'high-shelf') {
        if (currentFreq >= band.freq) {
          totalGain += band.gain;
        } else if (currentFreq >= band.freq / 2) {
          const ratio = (currentFreq - band.freq / 2) / (band.freq / 2);
          totalGain += band.gain * ratio;
        }
      } else if (band.type === 'lpf') {
        if (currentFreq > band.freq) {
          const octavesAbove = Math.log2(currentFreq / band.freq);
          totalGain -= octavesAbove * 18;
        }
      }
    });

    const x = freqToX(currentFreq);
    const y = dbToY(totalGain);
    points.push({ x, y });
  }

  const pathD = points.reduce((acc, pt, index) => {
    return index === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${paddingY + chartHeight / 2} L ${points[0].x} ${paddingY + chartHeight / 2} Z`;

  // Grid markers
  const freqMarkers = [50, 100, 200, 500, 1000, 2000, 5000, 10000];
  const dbMarkers = [12, 6, 0, -6, -12];

  return (
    <div className="bg-[#121212] border border-white/10 rounded-xl p-3.5 text-xs select-none shadow-xl">
      {/* Top Header info */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 font-mono font-bold rounded border border-cyan-500/30 text-xs">
            {modelName}
          </span>
          <span className="text-white/50 font-mono text-[11px]">
            HPF: <strong className="text-white">{hpfFreq} Hz</strong> ({hpfSlope})
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-mono text-white/50">
          <span className="flex items-center gap-1.5 text-[#AEEA00]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#AEEA00] inline-block shadow-sm shadow-[#AEEA00]/50" />
            EQ Křivka (Parametric)
          </span>
          <span className="text-white/30 hidden sm:inline">20 Hz – 20 kHz (±15 dB)</span>
        </div>
      </div>

      {/* SVG EQ Display */}
      <div className="relative bg-[#000000] border border-white/10 rounded-lg overflow-hidden shadow-2xl">
        {/* Simulated RTA background bars */}
        <div className="absolute inset-0 flex items-end justify-between px-10 py-6 pointer-events-none opacity-15">
          {Array.from({ length: 32 }).map((_, idx) => {
            const h = Math.sin(idx * 0.3) * 30 + Math.random() * 25 + 15;
            return (
              <div
                key={idx}
                className="w-1.5 bg-[#AEEA00] rounded-t-sm"
                style={{ height: `${h}%` }}
              />
            );
          })}
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-44 sm:h-52 block"
        >
          {/* Background Grid Lines */}
          {freqMarkers.map(f => {
            const x = freqToX(f);
            return (
              <g key={f}>
                <line
                  x1={x}
                  y1={paddingY}
                  x2={x}
                  y2={svgHeight - paddingY}
                  stroke="#262626"
                  strokeDasharray="2,2"
                />
                <text
                  x={x}
                  y={svgHeight - 8}
                  fill="#737373"
                  fontSize="9"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {f >= 1000 ? `${f / 1000}k` : f}
                </text>
              </g>
            );
          })}

          {dbMarkers.map(db => {
            const y = dbToY(db);
            return (
              <g key={db}>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke={db === 0 ? '#404040' : '#1f1f1f'}
                  strokeWidth={db === 0 ? '1.5' : '1'}
                />
                <text
                  x={paddingX - 6}
                  y={y + 3}
                  fill={db === 0 ? '#a3a3a3' : '#525252'}
                  fontSize="9"
                  textAnchor="end"
                  fontFamily="monospace"
                >
                  {db > 0 ? `+${db}` : db}
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path
            d={areaD}
            fill="url(#eqGlowGradient)"
            opacity="0.25"
          />

          {/* EQ Stroke Curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#AEEA00"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(174,234,0,0.6)]"
          />

          {/* Interactive / Visual Band Nodes */}
          {bands.map((band, idx) => {
            if (!band.enabled) return null;
            const cx = freqToX(band.freq);
            const cy = dbToY(band.gain);
            const isSelected = selectedBandId === band.id;

            return (
              <g
                key={band.id}
                className="cursor-pointer transition-transform hover:scale-110"
                onClick={() => setSelectedBandId(band.id)}
              >
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? '7' : '5'}
                  fill={isSelected ? '#22d3ee' : '#AEEA00'}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
                <text
                  x={cx}
                  y={cy - 10}
                  fill={isSelected ? '#22d3ee' : '#AEEA00'}
                  fontSize="9"
                  fontWeight="bold"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {idx + 1}
                </text>
              </g>
            );
          })}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="eqGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#AEEA00" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#84cc16" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#4d7c0f" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Band Parameters Strip */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-3">
        {bands.map((band, index) => {
          const isSelected = selectedBandId === band.id;
          return (
            <div
              key={band.id}
              onClick={() => setSelectedBandId(band.id)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#1e1e1e] border-cyan-400 shadow-lg'
                  : 'bg-[#161616] border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1">
                <span className={`font-bold ${isSelected ? 'text-cyan-400' : 'text-white/60'}`}>
                  Band {index + 1}
                </span>
                <span className="text-white/30 uppercase text-[9px]">{band.type}</span>
              </div>
              <div className="font-mono text-[11px] text-white font-semibold">
                {band.freq >= 1000 ? `${(band.freq / 1000).toFixed(1)}k` : `${band.freq}`} Hz
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono mt-0.5">
                <span className={band.gain > 0 ? 'text-[#AEEA00] font-bold' : band.gain < 0 ? 'text-cyan-400 font-bold' : 'text-white/40'}>
                  {band.gain > 0 ? `+${band.gain.toFixed(1)}` : band.gain.toFixed(1)} dB
                </span>
                <span className="text-white/40">Q:{band.q.toFixed(1)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
