import React, { useState } from 'react';
import { 
  Sliders, 
  Activity, 
  Layers, 
  Volume2, 
  Zap, 
  Cpu, 
  ArrowRight, 
  Check, 
  Radio, 
  Cable, 
  Disc, 
  RotateCcw,
  Sparkles,
  Info,
  Maximize2,
  Lock,
  Headphones,
  Mic,
  Usb,
  ShieldAlert,
  Play,
  Square,
  Repeat
} from 'lucide-react';

interface FunctionDiagramProps {
  type: 'top_panel' | 'rear_panel' | 'signal_flow' | 'sources_vs_channels' | 'routing_matrix' | 'fader_layers' | 'eq_visualizer' | 'gate_visualizer' | 'comp_visualizer' | 'dugan_automix' | 'stageconnect_topology' | 'sd_live_recorder' | 'solo_talkback' | 'usb_player_recorder' | 'shortcuts_troubleshooting' | 'fx_rack';
  title: string;
  subtitle: string;
}

export const FunctionDiagram: React.FC<FunctionDiagramProps> = ({ type, title, subtitle }) => {
  // States for interactive diagrams
  const [activeHotspot, setActiveHotspot] = useState<number | null>(0);
  const [selectedTap, setSelectedTap] = useState<string>('Pre-Fader');
  const [eqModel, setEqModel] = useState<'wing' | 'even84' | 'soul' | 'pulsar'>('wing');
  const [eqFreq, setEqFreq] = useState<number>(3200);
  const [eqGain, setEqGain] = useState<number>(4.5);
  const [gateThreshold, setGateThreshold] = useState<number>(-36);
  const [compRatio, setCompRatio] = useState<'4:1' | '8:1' | '12:1' | '20:1' | 'ALL'>('4:1');
  const [compThreshold, setCompThreshold] = useState<number>(-22);
  const [duganActiveSpeaker, setDuganActiveSpeaker] = useState<number>(1);
  const [selectedRoutingSource, setSelectedRoutingSource] = useState<'Local' | 'AES50-A' | 'StageConnect' | 'USB'>('Local');
  const [sdRecordMode, setSdRecordMode] = useState<'64ch' | 'redundant' | 'soundcheck'>('redundant');

  // Render Top Panel Interactive Hardware Map
  if (type === 'top_panel') {
    const hotspots = [
      { id: 0, name: '10.1" Výklopný Multi-Touch displej', x: 50, y: 22, desc: 'Kapacitní HD displej s plynulým náklonem 15°–60°, zobrazující kompletní přehled kanálů, RTA spektrum, routing a grafické EQ křivky.' },
      { id: 1, name: '12 Motorických kanálových faderů 100mm', x: 28, y: 72, desc: 'Ultra-tiché 100mm motorické fadery s barevnými LCD scribble stripy (RGB podsvícení, ikony a 8 znaků textu).' },
      { id: 2, name: '1 Dedikovaný Main Fader', x: 88, y: 72, desc: 'Nezávislý motorický fader pro vybranou hlavní sběrnici (Main 1-4) nebo Master DCA skupinu.' },
      { id: 3, name: '2.4" Rychlý LCD displej & 16 tlačítek', x: 74, y: 40, desc: 'Vyhrazená sekce pro okamžitý přístup k Sends on Faders (SOF), DCA Spill, Mute skupinám a uživatelským zkratkám.' },
      { id: 4, name: 'Touch & Turn rotační enkodér', x: 84, y: 22, desc: 'Rychlý hlavní rotační ovladač s detekcí dotyku pro okamžitou úpravu libovolného vybraného parametru.' },
      { id: 5, name: 'Duální sluchátkové výstupy (Phones 1 & 2)', x: 92, y: 90, desc: 'Samostatné regulátory hlasitosti pro přední a boční 6.3mm sluchátkové výstupy s vysokým výkonem 500mW.' }
    ];

    const currentHotspot = hotspots.find(h => h.id === activeHotspot) || hotspots[0];

    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-cyan-400">
            Interaktivní mapa ovládací plochy
          </span>
        </div>

        {/* Console Top-Down Schematic */}
        <div className="relative bg-[#161616] rounded-xl border border-white/10 p-4 aspect-[16/9] max-h-[360px] flex items-center justify-center overflow-hidden">
          {/* Base Console Outline */}
          <div className="w-full h-full relative rounded-lg border-2 border-white/20 bg-gradient-to-b from-[#222] to-[#141414] p-3 shadow-inner flex flex-col justify-between">
            {/* Top Row: Screen & Master Controls */}
            <div className="grid grid-cols-12 gap-2 h-1/2">
              {/* Channel Strip Mini Encoders & Touchscreen Area */}
              <div className="col-span-8 bg-[#0a0a0a] rounded-lg border border-white/20 p-2 flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-white/40 font-mono">
                  <span className="flex items-center gap-1"><Sparkles className="w-3 h-3 text-cyan-400" /> 10.1" IPS MULTI-TOUCH SCREEN (1280x800)</span>
                  <span className="text-[#00F0FF]">TILT 15°–60°</span>
                </div>
                <div className="h-24 bg-gradient-to-r from-blue-950/40 via-purple-950/40 to-slate-900/40 rounded border border-white/10 p-2 flex items-center justify-around">
                  <div className="text-center font-mono">
                    <div className="text-[10px] text-cyan-400 font-bold">CH 01 - VOCAL LEAD</div>
                    <div className="text-[9px] text-white/60">EQ + COMP + DUGAN</div>
                  </div>
                  <div className="w-16 h-10 border border-cyan-500/40 rounded bg-cyan-950/30 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                  </div>
                </div>
                <div className="flex justify-between items-center text-[9px] font-mono text-white/40">
                  <span>HOME</span>
                  <span>INPUT</span>
                  <span>FILTER</span>
                  <span>GATE</span>
                  <span>EQ</span>
                  <span>COMP</span>
                  <span>SENDS</span>
                  <span>MAIN</span>
                </div>
              </div>

              {/* Master Control & Encoder Area */}
              <div className="col-span-4 bg-[#1e1e1e] rounded-lg border border-white/10 p-2 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400">
                  <span>2.4" OLED</span>
                  <span>TOUCH & TURN</span>
                </div>
                <div className="grid grid-cols-4 gap-1 py-1">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(btn => (
                    <div key={btn} className={`h-4 rounded flex items-center justify-center text-[8px] font-mono font-bold ${
                      btn === 1 ? 'bg-white text-black' : btn === 5 ? 'bg-cyan-500 text-black' : 'bg-white/10 text-white/70'
                    }`}>
                      {btn <= 4 ? `SOF${btn}` : `DCA${btn-4}`}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[9px] text-white/50 font-mono">
                  <span>CLEAR SOLO</span>
                  <span>TALK A/B</span>
                </div>
              </div>
            </div>

            {/* Bottom Row: Fader Section (12 + 1) */}
            <div className="grid grid-cols-12 gap-2 h-2/5 pt-2 border-t border-white/10">
              {/* 12 Channel Faders */}
              <div className="col-span-9 bg-[#111] rounded-lg border border-white/10 p-1.5 flex items-center justify-between">
                {Array.from({ length: 12 }).map((_, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-between h-full w-6 py-0.5">
                    {/* Scribble Strip LCD */}
                    <div className={`w-full h-3 rounded text-[7px] font-mono flex items-center justify-center font-bold truncate ${
                      idx < 4 ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-500/50' :
                      idx < 8 ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50' :
                      'bg-emerald-500/30 text-emerald-300 border border-emerald-500/50'
                    }`}>
                      {idx + 1}
                    </div>
                    {/* Fader Track & Knob */}
                    <div className="w-1.5 h-12 bg-black rounded-full relative flex items-center justify-center my-0.5">
                      <div className="absolute w-4 h-3 bg-white/90 rounded-sm shadow-md border border-black top-3" />
                    </div>
                    {/* Mute & Select Buttons */}
                    <div className="flex gap-0.5">
                      <div className="w-2 h-2 rounded-full bg-red-500/40" />
                      <div className="w-2 h-2 rounded-full bg-cyan-400" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Master Fader Section */}
              <div className="col-span-3 bg-[#181818] rounded-lg border border-white/20 p-1.5 flex items-center justify-around">
                <div className="flex flex-col items-center justify-between h-full w-10">
                  <div className="w-full h-3 rounded bg-white text-black text-[7px] font-mono font-bold flex items-center justify-center">
                    MAIN 1
                  </div>
                  <div className="w-2 h-12 bg-black rounded-full relative flex items-center justify-center my-0.5">
                    <div className="absolute w-5 h-3.5 bg-white rounded-sm shadow-lg border border-black top-2" />
                  </div>
                  <span className="text-[8px] font-mono text-white/70">0.0 dB</span>
                </div>
                <div className="flex flex-col gap-1 text-[8px] font-mono text-white/50">
                  <span className="text-red-400">MAIN MUTE</span>
                  <span className="text-[#00F0FF]">MONO/C</span>
                </div>
              </div>
            </div>

            {/* Clickable Hotspot Pins */}
            {hotspots.map(h => (
              <button
                key={h.id}
                onClick={() => setActiveHotspot(h.id)}
                style={{ left: `${h.x}%`, top: `${h.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all z-20 cursor-pointer ${
                  activeHotspot === h.id
                    ? 'bg-white text-black ring-4 ring-white/40 scale-125 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/40 border border-white/30 backdrop-blur-sm'
                }`}
              >
                {h.id + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Hotspot Detailed Callout */}
        <div className="bg-[#181818] border border-white/20 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-white text-black font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
            {currentHotspot.id + 1}
          </div>
          <div>
            <h5 className="text-xs font-bold text-white mb-0.5">{currentHotspot.name}</h5>
            <p className="text-xs text-white/70 leading-relaxed">{currentHotspot.desc}</p>
          </div>
        </div>
      </div>
    );
  }

  // Render Rear Panel I/O Visualizer
  if (type === 'rear_panel') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Cable className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-blue-400">
            24 In / 8 Out Midas PRO + AES50 + StageConnect
          </span>
        </div>

        {/* Rear Panel Schematic */}
        <div className="bg-[#141414] rounded-xl border border-white/10 p-4 space-y-4">
          {/* Top Row: 24 Combo Inputs */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-white/50 mb-2">
              <span className="font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" /> 24x MIDAS PRO COMBO XLR/TRS VSTUPY (1–24)
              </span>
              <span>48V / 0 až +60 dB analogový gain</span>
            </div>
            <div className="grid grid-cols-12 gap-1.5 bg-[#0a0a0a] p-2.5 rounded-lg border border-white/10">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-1 bg-[#1a1a1a] rounded border border-white/10 hover:border-cyan-400 transition-colors group">
                  <div className="w-5 h-5 rounded-full border-2 border-white/30 flex items-center justify-center text-[8px] font-mono text-white/60 group-hover:border-cyan-400 group-hover:text-white">
                    {i + 1}
                  </div>
                  <span className="text-[7px] font-mono text-cyan-400 mt-0.5">XLR</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: 8 XLR Outs + AES50 + StageConnect + USB + Network */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* 8 XLR Outputs */}
            <div className="bg-[#0a0a0a] p-2.5 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1.5">8x XLR VÝSTUPY (1–8)</span>
              <div className="grid grid-cols-4 gap-1.5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-[#1a1a1a] p-1 rounded border border-white/10 text-center">
                    <span className="text-[8px] font-mono text-white font-bold">OUT {i+1}</span>
                    <span className="text-[7px] text-cyan-300 block">+21dBu</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3x AES50 etherCON */}
            <div className="bg-[#0a0a0a] p-2.5 rounded-lg border border-white/10">
              <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1.5">3x AES50 PORTY (144ch In/Out)</span>
              <div className="grid grid-cols-3 gap-1.5">
                {['PORT A', 'PORT B', 'PORT C'].map((port, i) => (
                  <div key={i} className="bg-[#1a1a1a] p-1.5 rounded border border-amber-500/30 text-center">
                    <span className="text-[8px] font-mono text-amber-400 font-bold">{port}</span>
                    <span className="text-[7px] text-white/50 block">48x48 48kHz</span>
                  </div>
                ))}
              </div>
            </div>

            {/* StageConnect, USB & Network */}
            <div className="bg-[#0a0a0a] p-2.5 rounded-lg border border-white/10 flex flex-col justify-between">
              <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">STAGECONNECT & USB 48x48</span>
              <div className="flex gap-2">
                <div className="flex-1 bg-[#1a1a1a] p-1 rounded border border-purple-500/30 text-center">
                  <span className="text-[8px] font-mono text-purple-300 font-bold">SC XLR</span>
                  <span className="text-[7px] text-white/50 block">32ch 0.05ms</span>
                </div>
                <div className="flex-1 bg-[#1a1a1a] p-1 rounded border border-blue-500/30 text-center">
                  <span className="text-[8px] font-mono text-blue-300 font-bold">USB-B 2.0</span>
                  <span className="text-[7px] text-white/50 block">48x48 DAW</span>
                </div>
                <div className="flex-1 bg-[#1a1a1a] p-1 rounded border border-emerald-500/30 text-center">
                  <span className="text-[8px] font-mono text-emerald-300 font-bold">LAN RJ45</span>
                  <span className="text-[7px] text-white/50 block">OSC Control</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Signal Flow & TAP Points Visualizer
  if (type === 'signal_flow') {
    const tapPoints = [
      { name: 'Pre-Trim', desc: 'Signál ihned za A/D převodníkem a analogovým gainem. Ideální pro čisté multitrack nahrávání bez ovlivnění zvukařem.', latency: '0.2 ms' },
      { name: 'Post-Trim', desc: 'Po digitálním trimu, inverzi fáze a stereo width úpravě.', latency: '0.3 ms' },
      { name: 'Pre-EQ', desc: 'Po filtru HPF/LPF a dynamickém Gatu, před parametrickým ekvalizérem.', latency: '0.4 ms' },
      { name: 'Post-EQ', desc: 'Za 6-pásmovým ekvalizérem, ale před kanálovým kompresorem.', latency: '0.6 ms' },
      { name: 'Pre-Fader', desc: 'Typický send pro odposlechy a IEM monitory. Pohyby faderem neovlivňují odposlechy.', latency: '0.8 ms' },
      { name: 'Post-Fader', desc: 'Send závislý na faderu a panorámě. Standard pro efektové sběrnice (Reverb / Delay).', latency: '1.0 ms' }
    ];

    const currentTapObj = tapPoints.find(t => t.name === selectedTap) || tapPoints[4];

    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-emerald-400">
            Signálový řetězec a TAP body
          </span>
        </div>

        {/* Flow Diagram Blocks */}
        <div className="bg-[#141414] rounded-xl border border-white/10 p-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 min-w-[720px] py-3">
            {[
              { id: 'in', label: 'SOURCE IN', sub: 'Gain / 48V', color: 'border-white/20 bg-white/5' },
              { id: 'pre-trim', label: 'PRE-TRIM', tap: true },
              { id: 'trim', label: 'TRIM & POL', sub: 'Width / M-S', color: 'border-blue-500/30 bg-blue-950/20' },
              { id: 'gate', label: 'GATE / EXP', sub: 'Key Filter', color: 'border-purple-500/30 bg-purple-950/20' },
              { id: 'pre-eq', label: 'PRE-EQ', tap: true },
              { id: 'eq', label: '6-BAND EQ', sub: 'HPF / RTA', color: 'border-cyan-500/40 bg-cyan-950/20' },
              { id: 'post-eq', label: 'POST-EQ', tap: true },
              { id: 'comp', label: 'COMPRESSOR', sub: 'Sidechain', color: 'border-red-500/30 bg-red-950/20' },
              { id: 'pre-fader', label: 'PRE-FADER', tap: true },
              { id: 'fader', label: 'FADER & PAN', sub: 'Mute / Solo', color: 'border-cyan-500/30 bg-cyan-950/20' },
              { id: 'post-fader', label: 'POST-FADER', tap: true },
              { id: 'out', label: 'BUS / MAIN', sub: 'Sends 1-16', color: 'border-emerald-500/30 bg-emerald-950/20' },
            ].map((node, idx) => {
              if (node.tap) {
                const isSelected = selectedTap === node.label.charAt(0) + node.label.slice(1).toLowerCase().replace('-', '-').replace('pre-trim', 'Pre-Trim').replace('pre-eq', 'Pre-EQ').replace('post-eq', 'Post-EQ').replace('pre-fader', 'Pre-Fader').replace('post-fader', 'Post-Fader');
                const matchedName = tapPoints.find(t => t.name.toLowerCase() === node.label.toLowerCase())?.name || node.label;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedTap(matchedName)}
                    className={`px-1.5 py-1 rounded text-[8px] font-mono uppercase tracking-tighter border transition-all cursor-pointer ${
                      selectedTap === matchedName
                        ? 'bg-cyan-500 text-black font-bold border-cyan-400 scale-110 shadow-md'
                        : 'bg-white/5 text-white/50 border-dashed border-white/20 hover:text-white hover:border-white/50'
                    }`}
                  >
                    ▼ {node.label}
                  </button>
                );
              }
              return (
                <div key={idx} className={`p-2 rounded-lg border flex flex-col items-center justify-center text-center shrink-0 min-w-[70px] ${node.color}`}>
                  <span className="text-[9px] font-mono font-bold text-white">{node.label}</span>
                  <span className="text-[7px] text-white/50">{node.sub}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* TAP Point Explanation Panel */}
        <div className="bg-[#181818] border border-white/10 rounded-xl p-3.5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 bg-cyan-500 text-black font-mono font-bold text-[10px] rounded">
                TAP BOD: {currentTapObj.name}
              </span>
              <span className="text-[10px] font-mono text-emerald-400">Latence: {currentTapObj.latency}</span>
            </div>
            <p className="text-xs text-white/70">{currentTapObj.desc}</p>
          </div>
        </div>
      </div>
    );
  }

  // Render 6-Band Parametric EQ & RTA Spectrum Visualizer
  if (type === 'eq_visualizer') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1 bg-black p-1 rounded-lg border border-white/10">
            {[
              { id: 'wing', label: 'WING 6-Band' },
              { id: 'even84', label: 'Even 84 (Neve)' },
              { id: 'soul', label: 'Soul (SSL)' },
              { id: 'pulsar', label: 'Pulsar P1a (Pultec)' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setEqModel(m.id as any)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  eqModel === m.id ? 'bg-cyan-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive SVG Curve Canvas */}
        <div className="relative bg-[#121212] rounded-xl border border-white/10 p-3 h-52 flex flex-col justify-between overflow-hidden">
          {/* Frequency Grid Background */}
          <div className="absolute inset-0 grid grid-cols-6 pointer-events-none opacity-10">
            {['100Hz', '250Hz', '1kHz', '3.5kHz', '8kHz', '16kHz'].map((hz, i) => (
              <div key={i} className="border-r border-white flex items-end p-1 text-[8px] font-mono text-white">
                {hz}
              </div>
            ))}
          </div>

          {/* RTA Spectrum Simulation Bars */}
          <div className="absolute inset-x-2 bottom-6 top-6 flex items-end justify-between gap-1 opacity-20 pointer-events-none">
            {Array.from({ length: 32 }).map((_, idx) => {
              const h = Math.max(10, Math.sin(idx * 0.3) * 60 + Math.random() * 25 + 20);
              return (
                <div key={idx} style={{ height: `${h}%` }} className="flex-1 bg-cyan-400 rounded-t-sm" />
              );
            })}
          </div>

          {/* EQ Curve SVG */}
          <svg className="w-full h-full relative z-10 overflow-visible" viewBox="0 0 500 150">
            <path
              d={`M 0 75 Q 80 75 140 ${75 - 10} T 240 ${75 - 15} Q 320 ${75 - (eqGain * 4)} 380 75 T 500 75`}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="3.5"
              className="drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            />
            {/* Movable EQ Bell Node */}
            <circle cx="320" cy={75 - (eqGain * 4)} r="6" fill="#ffffff" stroke="#22d3ee" strokeWidth="2" />
          </svg>

          {/* Real-Time Parameter Bar */}
          <div className="flex items-center justify-between text-[11px] font-mono bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 z-20">
            <span className="text-[#00F0FF]">FREKVENCE: {eqFreq} Hz</span>
            <span className="text-cyan-400 font-bold">GAIN: {eqGain > 0 ? `+${eqGain}` : eqGain} dB</span>
            <span className="text-white/60">Q-FAKTOR: 1.8</span>
            <span className="text-emerald-400">RTA: 64 PÁSEM AKTIVNÍ</span>
          </div>
        </div>

        {/* EQ Sliders Control */}
        <div className="grid grid-cols-2 gap-4 bg-[#141414] p-3 rounded-xl border border-white/10">
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-white/60">
              <span>Frekvence Bell 3</span>
              <span className="text-white font-bold">{eqFreq} Hz</span>
            </div>
            <input
              type="range"
              min="500"
              max="8000"
              step="100"
              value={eqFreq}
              onChange={(e) => setEqFreq(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-[11px] font-mono text-white/60">
              <span>Zisk (Gain)</span>
              <span className="text-cyan-400 font-bold">{eqGain > 0 ? `+${eqGain}` : eqGain} dB</span>
            </div>
            <input
              type="range"
              min="-12"
              max="12"
              step="0.5"
              value={eqGain}
              onChange={(e) => setEqGain(Number(e.target.value))}
              className="w-full accent-[#00F0FF] cursor-pointer"
            />
          </div>
        </div>
      </div>
    );
  }

  // Render Compressor & Vintage Dynamics Visualizer
  if (type === 'comp_visualizer') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1 bg-black p-1 rounded-lg border border-white/10">
            {(['4:1', '8:1', '12:1', '20:1', 'ALL'] as const).map(r => (
              <button
                key={r}
                onClick={() => setCompRatio(r)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  compRatio === r ? 'bg-red-500 text-white font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {r === 'ALL' ? 'ALL-BUTTON (1176)' : r}
              </button>
            ))}
          </div>
        </div>

        {/* Compression Transfer Characteristic & GR Meter */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-8 bg-[#141414] rounded-xl border border-white/10 p-3 h-48 relative flex flex-col justify-between overflow-hidden">
            <div className="text-[10px] font-mono text-white/50">PŘEVODNÍ CHARAKTERISTIKA (INPUT VS OUTPUT dB)</div>
            
            {/* SVG Transfer Curve */}
            <svg className="w-full h-32 overflow-visible" viewBox="0 0 300 120">
              {/* 1:1 Unity Line */}
              <line x1="20" y1="100" x2="280" y2="20" stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              {/* Compressed Curve */}
              <path
                d="M 20 100 L 150 50 Q 180 40 280 32"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                className="drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              />
              {/* Threshold Point */}
              <circle cx="150" cy="50" r="5" fill="#EF4444" />
            </svg>

            <div className="flex justify-between text-[10px] font-mono text-white/60">
              <span>Threshold: {compThreshold} dB</span>
              <span className="text-red-400 font-bold">Pomalé koleno (Soft Knee)</span>
              <span>Makeup: +4.0 dB</span>
            </div>
          </div>

          {/* Live Gain Reduction (GR) Meter */}
          <div className="md:col-span-4 bg-[#141414] rounded-xl border border-white/10 p-3 flex flex-col justify-between">
            <span className="text-[10px] font-mono text-red-400 font-bold">GAIN REDUCTION (GR)</span>
            <div className="space-y-1 py-2">
              <div className="h-4 bg-black rounded border border-white/10 flex items-center p-0.5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-400 rounded w-3/4 animate-pulse" />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-white/40">
                <span>-24dB</span>
                <span>-12dB</span>
                <span>-6dB</span>
                <span>0dB</span>
              </div>
            </div>
            <div className="text-[10px] font-mono text-white/70 bg-black/60 p-2 rounded border border-white/5">
              1176 FET styl: Ultra-rychlý Attack 20µs, program-dependent Release.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Dugan Speech Automix Visualizer
  if (type === 'dugan_automix') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-purple-400">
            2 Nezávislé skupiny Dugan Speech (Group A & B)
          </span>
        </div>

        {/* 4-Speaker Live Weighting Simulation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#141414] p-3.5 rounded-xl border border-white/10">
          {[1, 2, 3, 4].map((spk) => {
            const isSpeaking = duganActiveSpeaker === spk;
            return (
              <button
                key={spk}
                onClick={() => setDuganActiveSpeaker(spk)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSpeaking
                    ? 'bg-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/20'
                    : 'bg-[#1a1a1a] border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono font-bold text-white">CH {spk}: ŘEČNÍK {spk}</span>
                  {isSpeaking && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />}
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-white/60">Útlum (Dugan Gain):</div>
                  <div className={`text-xs font-mono font-bold ${isSpeaking ? 'text-emerald-400' : 'text-red-400'}`}>
                    {isSpeaking ? '0.0 dB (AKTIVNÍ)' : '-14.5 dB (ZTIŠENO)'}
                  </div>
                </div>
                <div className="mt-2 h-1.5 bg-black rounded-full overflow-hidden">
                  <div className={`h-full ${isSpeaking ? 'w-full bg-emerald-400' : 'w-1/6 bg-red-500'}`} />
                </div>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-white/70 bg-[#181818] p-3 rounded-xl border border-white/10 flex items-center gap-2">
          <Info className="w-4 h-4 text-purple-400 shrink-0" />
          <span>Klikněte na libovolného řečníka: algoritmus okamžitě přerozdělí akustický zisk a potlačí okolní ruchy a zpětnou vazbu bez usekávání slabik.</span>
        </div>
      </div>
    );
  }

  // Render StageConnect Topology
  if (type === 'stageconnect_topology') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-cyan-400">
            32 Kanálů / 0.05 ms Latence po jediném XLR kabelu
          </span>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-white/10 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
          <div className="p-3 bg-[#1e1e1e] rounded-lg border border-cyan-500/40 text-center flex-1">
            <span className="text-[10px] font-mono text-cyan-300 font-bold block">WING COMPACT</span>
            <span className="text-[9px] text-white/60 block">Master (32 ch Clock)</span>
            <span className="px-2 py-0.5 mt-1 inline-block bg-cyan-500/20 text-cyan-400 text-[8px] font-mono rounded">18W Phantom Power</span>
          </div>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />

          <div className="p-3 bg-[#1e1e1e] rounded-lg border border-white/20 text-center flex-1">
            <span className="text-[10px] font-mono text-white font-bold block">MIDAS DN4816-I</span>
            <span className="text-[9px] text-white/60 block">16x TRS Vstupů</span>
            <span className="px-2 py-0.5 mt-1 inline-block bg-white/10 text-white/70 text-[8px] font-mono rounded">Slave Node 1</span>
          </div>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />

          <div className="p-3 bg-[#1e1e1e] rounded-lg border border-white/20 text-center flex-1">
            <span className="text-[10px] font-mono text-white font-bold block">MIDAS DN4816-O</span>
            <span className="text-[9px] text-white/60 block">16x XLR Výstupů</span>
            <span className="px-2 py-0.5 mt-1 inline-block bg-white/10 text-white/70 text-[8px] font-mono rounded">Slave Node 2</span>
          </div>

          <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />

          <div className="p-3 bg-[#1e1e1e] rounded-lg border border-purple-500/40 text-center flex-1">
            <span className="text-[10px] font-mono text-purple-300 font-bold block">TURBOSOUND iQ</span>
            <span className="text-[9px] text-white/60 block">Ultranet Monitoring</span>
            <span className="px-2 py-0.5 mt-1 inline-block bg-purple-500/20 text-purple-400 text-[8px] font-mono rounded">Active PA</span>
          </div>
        </div>
      </div>
    );
  }

  // Render Dual SD WING-LIVE Recorder
  if (type === 'sd_live_recorder') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Disc className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <div className="flex gap-1 bg-black p-1 rounded-lg border border-white/10">
            {[
              { id: 'redundant', label: 'Redundantní (Mirror 32ch)' },
              { id: '64ch', label: 'Rozšířený (64ch 32+32)' },
              { id: 'soundcheck', label: 'Virtual Soundcheck' }
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setSdRecordMode(m.id as any)}
                className={`px-2 py-1 rounded text-[10px] font-mono transition-all cursor-pointer ${
                  sdRecordMode === m.id ? 'bg-amber-500 text-black font-bold' : 'text-white/60 hover:text-white'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#141414] p-3.5 rounded-xl border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">SD KARTA 1 (Slot 1)</span>
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-[9px] font-mono rounded font-bold">REC READY</span>
            </div>
            <p className="text-xs text-white/70">Stopa 1 až 32 (32-Bit Float / 48kHz WAV). Záznam do formátu FAT32/exFAT bez omezení velikosti souboru.</p>
          </div>
          <div className="bg-[#141414] p-3.5 rounded-xl border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-amber-400">SD KARTA 2 (Slot 2)</span>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono rounded font-bold">BACKUP SYNC</span>
            </div>
            <p className="text-xs text-white/70">Automatické zrcadlení pro 100% jistotu záznamu na koncertech a festivalech.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render Sources vs Channels Architecture Visualizer
  if (type === 'sources_vs_channels') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-orange-400">
            Fyzické Zdroje (Sources) vs. Zpracování (Channels)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Physical Layer */}
          <div className="bg-[#141414] p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                1. Fyzický Vstup
              </span>
              <span className="text-[10px] text-white/40 font-mono">Hardware</span>
            </div>
            <div className="p-2.5 bg-black/50 rounded-lg border border-white/10 space-y-1.5 text-xs text-gray-300">
              <div className="font-mono text-blue-400 font-bold">Local In 01 / AES50</div>
              <p className="text-[11px] text-white/60">Fyzický analogový konektor nebo digitální stagebox stream.</p>
            </div>
          </div>

          {/* Source Entity Layer */}
          <div className="bg-[#141414] p-4 rounded-xl border border-orange-500/40 space-y-3 shadow-lg shadow-orange-500/5">
            <div className="flex items-center justify-between pb-2 border-b border-orange-500/20">
              <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                2. Zdroj (Source)
              </span>
              <span className="text-[10px] text-orange-400 font-mono">Vlastnosti</span>
            </div>
            <div className="p-2.5 bg-orange-950/20 rounded-lg border border-orange-500/30 space-y-1.5 text-xs text-gray-300">
              <div className="font-mono text-white font-bold flex items-center justify-between">
                <span>"Kick Beta52"</span>
                <span className="text-orange-400 text-[10px]">+48V / +28dB</span>
              </div>
              <ul className="text-[10px] text-white/60 space-y-0.5 list-disc pl-3.5">
                <li>Analogový Gain & 48V phantom</li>
                <li>Polarita (POL) & Mute stav</li>
                <li>Barevný tag & Ikona nástroje</li>
                <li>Formát: Mono / Stereo / M-S</li>
              </ul>
            </div>
          </div>

          {/* Channel Strip Layer */}
          <div className="bg-[#141414] p-4 rounded-xl border border-emerald-500/40 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                3. Kanál (Channel)
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">DSP Strip</span>
            </div>
            <div className="p-2.5 bg-emerald-950/20 rounded-lg border border-emerald-500/30 space-y-1.5 text-xs text-gray-300">
              <div className="flex items-center justify-between font-mono">
                <span className="text-white font-bold">CH 01 (FOH Strip)</span>
                <span className="px-1.5 py-0.5 bg-emerald-500/30 text-emerald-300 text-[9px] rounded">MAIN / ALT</span>
              </div>
              <p className="text-[10px] text-white/60">Nezávislý Gate, 6-Band EQ, Comp, Inserty a Sends do sběrnic.</p>
              <div className="text-[10px] text-emerald-400 font-mono pt-1">
                Lze přiřadit stejný Source i na CH 02 (Monitor strip)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Fader Layers & Sends on Fader Visualizer
  if (type === 'fader_layers') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[11px] font-mono text-yellow-400">
            Sends on Fader (SOF) & DCA Spill
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-8 bg-[#141414] p-4 rounded-xl border-2 border-yellow-500/50 space-y-3 relative">
            <div className="absolute top-2 right-2 px-2 py-0.5 bg-yellow-500 text-black text-[9px] font-mono font-bold rounded">
              AKTIVNÍ REŽIM: SENDS ON FADER (BUS 01 - VOCAL IEM)
            </div>
            <span className="text-xs font-mono text-white font-bold block mb-2">12 Kanálových Faderů (Úrovně odesílané do Busu 01)</span>
            <div className="grid grid-cols-6 gap-2">
              {['Vocal Lead', 'Backing 1', 'Acoustic', 'Electric', 'Bass', 'Drums'].map((ch, idx) => (
                <div key={idx} className="bg-black/60 p-2 rounded-lg border border-white/10 flex flex-col items-center">
                  <span className="text-[9px] font-mono text-yellow-300 font-bold truncate w-full text-center">{ch}</span>
                  <div className="w-1.5 h-14 bg-white/10 rounded-full my-1.5 relative flex items-center justify-center">
                    <div 
                      className="absolute w-4 h-2.5 bg-yellow-400 rounded-sm shadow-md"
                      style={{ top: `${(idx * 7) % 36 + 8}px` }}
                    />
                  </div>
                  <span className="text-[8px] font-mono text-white/50">Send Lvl</span>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 bg-[#141414] p-4 rounded-xl border border-white/10 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">16 tlačítek rychlého přístupu</span>
              <p className="text-[11px] text-white/60 leading-relaxed">
                Stiskem tlačítka BUS MASTER a výběrem sběrnice se 12 faderů okamžitě stane mixem pro daného muzikanta.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-1 pt-2 border-t border-white/10">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className={`p-1 text-center rounded text-[8px] font-mono font-bold ${
                  i === 0 ? 'bg-yellow-500 text-black' : 'bg-white/10 text-white/70'
                }`}>
                  BUS {i+1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render Solo & Talkback Visualizer
  if (type === 'solo_talkback') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Headphones className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-red-400">
            Solo Režimy (Live, Studio, SIP) & Talkback Auto-Dim
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-[#141414] p-4 rounded-xl border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                Solo Sběrnice & PFL / AFL
              </span>
              <span className="text-[9px] font-mono bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded">Phones 1/2</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              <strong>LIVE režim:</strong> Poslech do sluchátek bez ovlivnění výstupů do PA.<br />
              <strong>SIP (Solo In Place):</strong> Destruktivní režim ztlumí všechny nezesólované kanály v hlavním PA mixu.
            </p>
          </div>

          <div className="bg-[#141414] p-4 rounded-xl border border-white/10 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-white flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                Talkback A / B & Auto-Dim
              </span>
              <span className="text-[9px] font-mono bg-red-950 text-red-300 px-2 py-0.5 rounded">-20 dB Auto-Dim</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              Při aktivaci mikrofonu zvukaře se hlasitost pódiových odposlechů automaticky potlačí o nastavený útlum (Auto-Dim), aby muzikanti jasně slyšeli pokyny.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Front USB 4-Track Player & Recorder Visualizer
  if (type === 'usb_player_recorder') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Usb className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[11px] font-mono text-cyan-400">
            4-Stopý WAV Záznam & Přehrávač Pauzové Hudby
          </span>
        </div>

        <div className="bg-[#141414] p-4 rounded-xl border border-white/10 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-white">USB-A RECORDER [4-CH 24-BIT / 48kHz WAV]</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-300">Formát disku: FAT32</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {[
              { track: 'Stopa 1', src: 'Main L (FOH Master)' },
              { track: 'Stopa 2', src: 'Main R (FOH Master)' },
              { track: 'Stopa 3', src: 'Bus 15 (Live Stream L)' },
              { track: 'Stopa 4', src: 'Bus 16 (Live Stream R)' },
            ].map((t, idx) => (
              <div key={idx} className="bg-black/60 p-2.5 rounded-lg border border-white/10 text-center">
                <span className="text-[10px] font-mono font-bold text-cyan-400 block">{t.track}</span>
                <span className="text-[9px] text-white/70">{t.src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Render Shortcuts & Troubleshooting Flowchart
  if (type === 'shortcuts_troubleshooting') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 rounded-full text-[11px] font-mono text-red-400">
            Nouzová Obnova & Diagnostické Klávesové Zkratky
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-[#141414] p-3.5 rounded-xl border border-red-500/30 space-y-1.5">
            <span className="text-xs font-mono font-bold text-red-400 block">Emergency USB Boot</span>
            <p className="text-[11px] text-white/70">
              Při zapínání držet prázdné tlačítko u displeje. Umožní přepsat vadný firmware z PC přes USB kabel.
            </p>
          </div>

          <div className="bg-[#141414] p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
            <span className="text-xs font-mono font-bold text-amber-400 block">Ghost Click Reset</span>
            <p className="text-[11px] text-white/70">
              Podržet prázdné tlačítko a CLR SOLO na &gt;1.5 s. Okamžitě zkalibruje kapacitní dotykovou vrstvu.
            </p>
          </div>

          <div className="bg-[#141414] p-3.5 rounded-xl border border-blue-500/30 space-y-1.5">
            <span className="text-xs font-mono font-bold text-blue-400 block">Screenshot Obrazovky</span>
            <p className="text-[11px] text-white/70">
              Podržet CLR SOLO a stisknout UTILITY. Uloží BMP snímek obrazovky na USB disk.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render FX Rack Visualizer
  if (type === 'fx_rack') {
    return (
      <div className="bg-[#0D0D0D] border border-white/10 rounded-2xl p-5 my-4 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h4>
              <p className="text-xs text-white/50">{subtitle}</p>
            </div>
          </div>
          <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] font-mono text-purple-400">
            16 Stereo DSP Slotů (8 Premium + 8 Standard)
          </span>
        </div>

        <div className="space-y-3">
          {/* 8 Premium FX Slots */}
          <div>
            <span className="text-xs font-mono font-bold text-purple-400 block mb-2">
              SLOTY 1–8: PREMIUM FX (Vyhrazená DSP paměť pro prostorové algoritmy)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'TC VSS3 Reverb', type: 'Studiový Reverb' },
                { name: 'EMT 250 Vintage', type: 'Electronic Plate' },
                { name: 'Lexicon 480L Style', type: 'Concert Hall' },
                { name: 'Tape Echo & BBD', type: 'Páskový Delay' },
                { name: 'Ultratap Delay', type: 'Multi-Tap Delay' },
                { name: 'Shimmer Reverb', type: 'Ambient Pitch Reverb' },
                { name: 'Vintage Plate', type: 'EMT 140 Deskový Reverb' },
                { name: 'Precision Limiter', type: 'Mastering Brickwall' },
              ].map((fx, i) => (
                <div key={i} className="p-2.5 bg-[#141414] rounded-lg border border-purple-500/30 hover:border-purple-400 transition-colors">
                  <span className="text-[8px] font-mono text-white/40 block">FX {i+1}</span>
                  <span className="text-xs font-mono font-bold text-white block truncate">{fx.name}</span>
                  <span className="text-[9px] text-purple-400">{fx.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 8 Standard FX Slots */}
          <div className="pt-2 border-t border-white/10">
            <span className="text-xs font-mono font-bold text-cyan-400 block mb-2">
              SLOTY 9–16: STANDARD FX (Modulace, dynamika, kytarové aparáty)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { name: 'Dimension Chorus', type: 'Roland SDD-320' },
                { name: 'Flanger & Phaser', type: 'Stereo Modulace' },
                { name: 'Tube Exciter', type: 'Harmonický saturátor' },
                { name: 'Guitar Amp Modeler', type: 'Simulace reproboxů' },
                { name: 'Graphic 31-Band EQ', type: 'True-Response GEQ' },
                { name: 'Pitch Shifter', type: 'Harmonizér' },
                { name: 'Auto Rider', type: 'Hlasitostní automat' },
                { name: 'Sub-Octaver', type: 'Basový syntetizér' },
              ].map((fx, i) => (
                <div key={i} className="p-2.5 bg-[#141414] rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
                  <span className="text-[8px] font-mono text-white/40 block">FX {i+9}</span>
                  <span className="text-xs font-mono font-bold text-white block truncate">{fx.name}</span>
                  <span className="text-[9px] text-cyan-400">{fx.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback
  return null;
};
