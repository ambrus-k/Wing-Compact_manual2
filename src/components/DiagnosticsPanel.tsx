import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  Volume2, 
  VolumeX, 
  Sliders, 
  Zap, 
  Cpu, 
  Clock, 
  Cable, 
  ShieldCheck,
  Radio,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { 
  playSineTone, 
  playPinkNoise, 
  playWhiteNoise, 
  stopTestSignal, 
  calculateTotalLatency, 
  FX_LATENCY_MAP 
} from '../utils/audioDiagnostics';

import { MixerId } from '../types';

interface DiagnosticsPanelProps {
  onOpenAppendix?: () => void;
  activeMixerId?: MixerId;
}

export const DiagnosticsPanel: React.FC<DiagnosticsPanelProps> = ({ 
  onOpenAppendix,
  activeMixerId = 'wing'
}) => {
  // AES50 Error Counters State
  const [aes50Errors, setAes50Errors] = useState({
    portA: { cor: 0, unc: 0, locked: true, device: 'Midas DL32 (Stage A)' },
    portB: { cor: 2, unc: 0, locked: true, device: 'Behringer S16 (Stage B)' },
    portC: { cor: 0, unc: 0, locked: false, device: 'Neobsazeno' }
  });

  // Audio Generator State
  const [activeSignal, setActiveSignal] = useState<'off' | 'sine1k' | 'sine440' | 'pink' | 'white'>('off');
  const [signalVolume, setSignalVolume] = useState<number>(0.15);

  // Latency Calculator State
  const [sampleRate, setSampleRate] = useState<48000 | 44100>(48000);
  const [hasBusToBus, setHasBusToBus] = useState<boolean>(false);
  const [hasLoopback, setHasLoopback] = useState<boolean>(false);
  const [insertFx1, setInsertFx1] = useState<string>('Žádný insert (Bypass)');
  const [insertFx2, setInsertFx2] = useState<string>('Žádný insert (Bypass)');

  // Touch Panel Test Simulation State
  const [touchTestStatus, setTouchTestStatus] = useState<'idle' | 'testing' | 'passed'>('idle');

  const latencyResult = calculateTotalLatency({
    sampleRate,
    baseHardwareLatencySamples: 48,
    hasBusToBusSend: hasBusToBus,
    hasLoopbackToChannelInput: hasLoopback,
    insertEffect1: insertFx1,
    insertEffect2: insertFx2
  });

  const handleStartSignal = (type: 'sine1k' | 'sine440' | 'pink' | 'white') => {
    if (activeSignal === type) {
      stopTestSignal();
      setActiveSignal('off');
    } else {
      if (type === 'sine1k') playSineTone(1000, signalVolume);
      else if (type === 'sine440') playSineTone(440, signalVolume);
      else if (type === 'pink') playPinkNoise(signalVolume);
      else if (type === 'white') playWhiteNoise(signalVolume);
      setActiveSignal(type);
    }
  };

  const handleStopAllSignals = () => {
    stopTestSignal();
    setActiveSignal('off');
  };

  const handleResetAesErrors = () => {
    setAes50Errors({
      portA: { ...aes50Errors.portA, cor: 0, unc: 0 },
      portB: { ...aes50Errors.portB, cor: 0, unc: 0 },
      portC: { ...aes50Errors.portC, cor: 0, unc: 0 }
    });
  };

  const handleRunTouchTest = () => {
    setTouchTestStatus('testing');
    setTimeout(() => {
      setTouchTestStatus('passed');
      setTimeout(() => setTouchTestStatus('idle'), 3500);
    }, 1800);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Banner */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#AEEA00]/10 text-[#AEEA00] flex items-center justify-center border border-[#AEEA00]/30 shadow-inner">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              {activeMixerId === 'x32' 
                ? 'Systémová diagnostika & Testovací centrum Behringer X32' 
                : activeMixerId === 'ui24' 
                ? 'Systémová diagnostika & Testovací centrum Soundcraft Ui24R' 
                : 'Systémová diagnostika & Testovací centrum WING Compact'}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 mt-0.5">
              {activeMixerId === 'x32'
                ? 'Měření chybovosti 2x AES50 portů, Ultranet P16 monitoring, latence DSP a signálový generátor'
                : activeMixerId === 'ui24'
                ? 'Stav Wi-Fi 2.4/5GHz hotspotu, LAN ethernetové rozhraní, latence Studer/Ui DSP a testovací tóny'
                : 'Měření chybovosti AES50 portů, StageConnect sběrnice, analýza latence signálových cest a generátor tónů'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          {onOpenAppendix && (
            <button
              onClick={onOpenAppendix}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 flex items-center gap-1.5 font-bold font-sans transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="hidden sm:inline">Příloha & Propojení s pultem</span>
              <span className="sm:hidden">Příloha</span>
            </button>
          )}

          <span className="px-3 py-1 bg-[#AEEA00]/10 text-[#AEEA00] rounded-full border border-[#AEEA00]/30 flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> SYSTEM OK
          </span>
          <span className="px-3 py-1 bg-black text-cyan-400 rounded-full border border-white/10 font-bold">
            DSP LOAD: 24%
          </span>
        </div>
      </div>

      {/* Grid: 3 Main Modules */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Module 1: AES50 & StageConnect Realtime Bus Monitor (6 cols) */}
        <div className="lg:col-span-6 bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Cable className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                AES50 & StageConnect Monitor chyb
              </h4>
            </div>
            <button
              onClick={handleResetAesErrors}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/5 hover:bg-white/10 text-cyan-400 rounded-lg text-xs sm:text-sm font-mono border border-white/10 transition-all font-semibold cursor-pointer"
              title="Vynulovat čítače chyb"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset čítačů</span>
            </button>
          </div>

          {/* AES50 Ports List */}
          <div className="space-y-3">
            {/* Port A */}
            <div className="bg-[#000000] p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#AEEA00] shadow-sm shadow-[#AEEA00]/50 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">AES50 PORT A (48 IN / 48 OUT)</div>
                  <div className="text-xs text-white/50">{aes50Errors.portA.device}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-white/40 mr-1">COR:</span>
                  <span className="text-[#AEEA00] font-bold">{aes50Errors.portA.cor}</span>
                </div>
                <div>
                  <span className="text-white/40 mr-1">UNC:</span>
                  <span className="text-[#AEEA00] font-bold">{aes50Errors.portA.unc}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#AEEA00]/10 text-[#AEEA00] rounded-full text-xs font-bold border border-[#AEEA00]/30">
                  LOCKED
                </span>
              </div>
            </div>

            {/* Port B */}
            <div className="bg-[#000000] p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#AEEA00] shadow-sm shadow-[#AEEA00]/50 shrink-0" />
                <div>
                  <div className="font-bold text-white text-sm">AES50 PORT B (48 IN / 48 OUT)</div>
                  <div className="text-xs text-white/50">{aes50Errors.portB.device}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm">
                <div>
                  <span className="text-white/40 mr-1">COR:</span>
                  <span className="text-amber-400 font-bold">{aes50Errors.portB.cor}</span>
                </div>
                <div>
                  <span className="text-white/40 mr-1">UNC:</span>
                  <span className="text-[#AEEA00] font-bold">{aes50Errors.portB.unc}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#AEEA00]/10 text-[#AEEA00] rounded-full text-xs font-bold border border-[#AEEA00]/30">
                  LOCKED
                </span>
              </div>
            </div>

            {/* Port C */}
            <div className="bg-[#000000] p-4 rounded-xl border border-white/10 flex items-center justify-between text-xs sm:text-sm font-mono opacity-50">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-white/30 shrink-0" />
                <div>
                  <div className="font-bold text-white/70 text-sm">AES50 PORT C (48 IN / 48 OUT)</div>
                  <div className="text-xs text-white/40">{aes50Errors.portC.device}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-white/5 text-white/40 rounded text-xs">
                STANDBY
              </span>
            </div>

            {/* StageConnect 32ch Bus */}
            <div className="bg-[#000000] p-4 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs sm:text-sm font-mono">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50 shrink-0" />
                <div>
                  <div className="font-bold text-cyan-300 text-sm">StageConnect (32 CH Bus Master)</div>
                  <div className="text-xs text-white/50">Kabel: 110 Ω DMX (18m) | 12V 18W OK</div>
                </div>
              </div>
              <span className="px-2.5 py-1 bg-cyan-950 text-cyan-300 rounded-full text-xs font-bold border border-cyan-800">
                ACTIVE (0.8 ms)
              </span>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-300 bg-[#000000] p-4 rounded-xl border border-white/10 space-y-1.5">
            <strong className="text-white block text-sm">Diagnostické pravidlo:</strong>
            <p>
              • <strong className="text-cyan-400">COR (Corrected):</strong> Opravené datové pakety. Občasné nízké hodnoty jsou normální.
            </p>
            <p>
              • <strong className="text-red-400">UNC (Uncorrected):</strong> Neopravené chyby vedoucí k lupnutí ve zvuku. Pokud UNC roste, okamžitě vyměňte stíněný kabel CAT-5e!
            </p>
          </div>
        </div>

        {/* Module 2: Precision Latency & Signal Path Calculator (6 cols) */}
        <div className="lg:col-span-6 bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Kalkulátor fázové latence signálových cest
              </h4>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold">
              40-Bit Floating Point
            </span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-white/40 block mb-1 text-[11px]">Vzorkovací frekvence</label>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(Number(e.target.value) as 48000 | 44100)}
                  className="w-full px-2.5 py-1.5 bg-[#000000] border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value={48000}>48 kHz (Standard)</option>
                  <option value={44100}>44.1 kHz (Audio CD)</option>
                </select>
              </div>

              <div>
                <label className="text-white/40 block mb-1 text-[11px]">Routing smyčky</label>
                <div className="space-y-1.5 pt-0.5">
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={hasBusToBus}
                      onChange={(e) => setHasBusToBus(e.target.checked)}
                      className="rounded accent-cyan-400"
                    />
                    <span className="text-[10px]">Bus to Bus send (+8 samplů)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                    <input
                      type="checkbox"
                      checked={hasLoopback}
                      onChange={(e) => setHasLoopback(e.target.checked)}
                      className="rounded accent-cyan-400"
                    />
                    <span className="text-[10px]">Bus jako Channel Input (+38)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Insert FX selector 1 & 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              <div>
                <label className="text-white/40 block mb-1 text-[11px]">Insert Efekt Slot 1 (INS1)</label>
                <select
                  value={insertFx1}
                  onChange={(e) => setInsertFx1(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#000000] border border-white/10 rounded-lg text-white text-[11px] focus:outline-none focus:border-cyan-400"
                >
                  {Object.keys(FX_LATENCY_MAP).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-white/40 block mb-1 text-[11px]">Insert Efekt Slot 2 (INS2)</label>
                <select
                  value={insertFx2}
                  onChange={(e) => setInsertFx2(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#000000] border border-white/10 rounded-lg text-white text-[11px] focus:outline-none focus:border-cyan-400"
                >
                  {Object.keys(FX_LATENCY_MAP).map(k => (
                    <option key={k} value={k}>{k}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Calculated Latency Readout Card */}
            <div className="bg-[#000000] p-4 rounded-xl border border-white/10 flex items-center justify-between mt-3">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                  Celkové zpoždění signálové cesty
                </span>
                <div className="text-2xl font-black text-cyan-400 tracking-tight mt-0.5">
                  {latencyResult.latencyMs} <span className="text-sm font-normal text-white/40">ms</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                  Počet vzorků (Samples)
                </span>
                <div className="text-xl font-bold text-[#AEEA00] font-mono">
                  {latencyResult.totalSamples} <span className="text-xs text-white/40">smpl</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Module 3: Web Audio Real Tone Generator & Hardware Calibration (Full Width) */}
      <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-[#AEEA00]" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Vestavěný generátor testovacích signálů & Servisní testy
            </h4>
          </div>

          {activeSignal !== 'off' && (
            <span className="px-3.5 py-1 bg-[#AEEA00]/10 text-[#AEEA00] border border-[#AEEA00]/40 rounded-full text-xs sm:text-sm font-mono font-bold animate-pulse">
              ● GENERÁTOR AKTIVNÍ ({activeSignal.toUpperCase()})
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Signal Buttons & Volume (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => handleStartSignal('sine1k')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  activeSignal === 'sine1k'
                    ? 'bg-[#AEEA00] text-black shadow-lg shadow-[#AEEA00]/30'
                    : 'bg-[#000000] text-gray-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                1 kHz Sinus (-18 dBFS)
              </button>

              <button
                onClick={() => handleStartSignal('sine440')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  activeSignal === 'sine440'
                    ? 'bg-[#AEEA00] text-black shadow-lg shadow-[#AEEA00]/30'
                    : 'bg-[#000000] text-gray-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                440 Hz Komorní A
              </button>

              <button
                onClick={() => handleStartSignal('pink')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  activeSignal === 'pink'
                    ? 'bg-[#AEEA00] text-black shadow-lg shadow-[#AEEA00]/30'
                    : 'bg-[#000000] text-gray-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                Růžový šum (Pink Noise)
              </button>

              <button
                onClick={() => handleStartSignal('white')}
                className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                  activeSignal === 'white'
                    ? 'bg-[#AEEA00] text-black shadow-lg shadow-[#AEEA00]/30'
                    : 'bg-[#000000] text-gray-200 hover:bg-white/10 border border-white/10'
                }`}
              >
                Bílý šum (White Noise)
              </button>

              {activeSignal !== 'off' && (
                <button
                  onClick={handleStopAllSignals}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold bg-red-600 hover:bg-red-500 text-white shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <VolumeX className="w-4 h-4" />
                  <span>Vypnout generátor</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs sm:text-sm font-mono text-white/50 w-24">Hlasitost:</span>
              <input
                type="range"
                min="0.01"
                max="0.4"
                step="0.01"
                value={signalVolume}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setSignalVolume(val);
                  if (activeSignal !== 'off') {
                    handleStartSignal(activeSignal);
                  }
                }}
                className="flex-1 accent-[#AEEA00] h-2 bg-white/10 rounded-lg cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-mono text-[#AEEA00] font-bold w-14 text-right">
                {Math.round(signalVolume * 250)}%
              </span>
            </div>
          </div>

          {/* Service Shortcut Tester Simulator (5 cols) */}
          <div className="md:col-span-5 bg-[#000000] border border-white/10 p-5 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                Ghost Touch & Panel Calibrator
              </span>
              <span className="text-xs text-white/50 font-mono">Simulace testu</span>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Při problémech s náhodnými dotyky podržte na konzoli prázdné tlačítko u displeje a CLR SOLO na 1.5 sekundy.
            </p>

            <button
              onClick={handleRunTouchTest}
              disabled={touchTestStatus === 'testing'}
              className={`w-full py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all cursor-pointer ${
                touchTestStatus === 'testing'
                  ? 'bg-cyan-400 text-black animate-pulse'
                  : touchTestStatus === 'passed'
                  ? 'bg-[#AEEA00] text-black font-bold'
                  : 'bg-white/5 hover:bg-white/10 text-cyan-400 border border-white/10'
              }`}
            >
              {touchTestStatus === 'testing'
                ? 'PROBÍHÁ KALIBRACE DOTYKOVÉ VRSTVY...'
                : touchTestStatus === 'passed'
                ? '✓ KALIBRACE DOKONČENA – VRSTVA OK'
                : 'Spustit diagnostický test panelu'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
