import React, { useEffect } from 'react';
import { InstrumentPreset, MixerId } from '../types';
import { VisualEQCurve } from './VisualEQCurve';
import { VisualCompTransfer } from './VisualCompTransfer';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Copy, 
  Check, 
  Volume1, 
  VolumeX, 
  Zap, 
  Sliders, 
  Activity, 
  Radio, 
  Music, 
  Drum, 
  Mic, 
  Layers,
  Sparkles,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { getPresetSubGroup } from './PresetsLab';

interface PresetDetailModalProps {
  preset: InstrumentPreset | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
  currentIndex?: number;
  totalCount?: number;
  copied?: boolean;
  onCopy?: (preset: InstrumentPreset) => void;
  activeTestSound?: 'sine' | 'noise' | null;
  onToggleSound?: (type: 'sine' | 'noise') => void;
  onSaveToScenes?: (preset: InstrumentPreset) => void;
  activeMixerId?: MixerId;
}

export const PresetDetailModal: React.FC<PresetDetailModalProps> = ({
  preset,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasNext = false,
  hasPrev = false,
  currentIndex = 0,
  totalCount = 0,
  copied = false,
  onCopy,
  activeTestSound = null,
  onToggleSound,
  onSaveToScenes,
  activeMixerId = 'wing'
}) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  if (!isOpen || !preset) return null;

  const subGroup = getPresetSubGroup(preset);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Drum': return <Drum className="w-5 h-5" />;
      case 'Mic': return <Mic className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Radio': return <Radio className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      default: return <Music className="w-5 h-5" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="preset-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-[#121212] border border-white/15 rounded-2xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Scribble Accent Bar */}
        <div 
          className="h-1.5 w-full shrink-0" 
          style={{ backgroundColor: preset.tagColor || '#06b6d4' }} 
        />

        {/* Modal Header: Sticky at top */}
        <div className="bg-[#181818] border-b border-white/10 p-4 sm:p-5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div 
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner"
              style={{ backgroundColor: `${preset.tagColor}25`, color: preset.tagColor }}
            >
              {getIconComponent(preset.icon)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Doporučené nastavení nástroje
                </span>
                <span className="px-2 py-0.5 bg-black/60 text-white font-mono text-[10px] font-bold rounded-full border border-white/20">
                  {preset.channelType.toUpperCase()}
                </span>
                {totalCount > 0 && (
                  <span className="text-[11px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                    {currentIndex + 1} z {totalCount}
                  </span>
                )}
              </div>
              <h2 id="preset-modal-title" className="text-lg sm:text-2xl font-bold text-white truncate">
                {preset.name}
              </h2>
              <span className="text-xs text-white/50 block truncate">
                {preset.categoryLabel} · {subGroup}
              </span>
            </div>
          </div>

          {/* Quick Header Actions & Close Button */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Next / Prev Buttons for tablet quick-browsing */}
            <div className="hidden sm:flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/10">
              <button
                onClick={onPrev}
                disabled={!hasPrev}
                aria-label="Předchozí nástroj"
                className={`p-2 rounded-lg transition-all ${
                  hasPrev 
                    ? 'text-white hover:bg-white/10 cursor-pointer active:scale-95' 
                    : 'text-white/20 cursor-not-allowed'
                }`}
                title="Předchozí nástroj (Šipka doleva)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={onNext}
                disabled={!hasNext}
                aria-label="Další nástroj"
                className={`p-2 rounded-lg transition-all ${
                  hasNext 
                    ? 'text-white hover:bg-white/10 cursor-pointer active:scale-95' 
                    : 'text-white/20 cursor-not-allowed'
                }`}
                title="Další nástroj (Šipka doprava)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button - large touch target for Android tablets */}
            <button
              onClick={onClose}
              aria-label="Zavřít okno"
              className="p-2.5 sm:p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer active:scale-95 border border-white/10"
              title="Zavřít (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5 flex-1">
          {/* Preset Description & Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#181818] p-4 rounded-xl border border-white/10">
            <p className="text-xs sm:text-sm text-gray-200 leading-relaxed flex-1">
              {preset.description}
            </p>
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              {onToggleSound && (
                <button
                  onClick={() => onToggleSound('sine')}
                  className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer active:scale-95 ${
                    activeTestSound === 'sine'
                      ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20 animate-pulse'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white'
                  }`}
                  title="Spustit zkušební tón pro kontrolu cesty"
                >
                  {activeTestSound === 'sine' ? <Volume1 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
                  <span>{activeTestSound === 'sine' ? 'Hraje Tón' : 'Test Tón'}</span>
                </button>
              )}

              {onCopy && (
                <button
                  onClick={() => onCopy(preset)}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs transition-all border border-white/20 cursor-pointer active:scale-95"
                  title="Kopírovat kompletní parametry presetu"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zkopírováno!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopírovat parametry</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* 1. Hardware Input & Midas Pro Preamp Section */}
          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  1. Předzesilovač & Vstupní nastavení (Preamplifier & Input)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30 font-bold">
                {activeMixerId === 'ui24' ? 'STUDER MIC PREAMP' : activeMixerId === 'x32' ? 'MIDAS PREAMP' : 'MIDAS PRO PREAMP'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
              <div className="bg-black/70 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">GAIN ZISK</span>
                <span className="text-base font-bold text-white">+{preset.preampGain} dB</span>
                <span className="text-[10px] text-emerald-400 block mt-0.5">Doporučená úroveň</span>
              </div>

              <div className="bg-black/70 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">FANTOM +48V</span>
                <span className={`text-base font-bold ${preset.phantomPower ? 'text-red-400' : 'text-white/40'}`}>
                  {preset.phantomPower ? 'AKTIVNÍ (+48V)' : 'VYPNUTO'}
                </span>
                <span className="text-[10px] text-white/40 block mt-0.5">
                  {preset.phantomPower ? 'Kondenzátor / DI' : 'Dynamický mikrofon'}
                </span>
              </div>

              <div className="bg-black/70 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">HPF LOW-CUT</span>
                <span className="text-base font-bold text-cyan-400">
                  {preset.eq.hpfFreq ? `${preset.eq.hpfFreq} Hz` : 'BYPASS'}
                </span>
                <span className="text-[10px] text-white/40 block mt-0.5">
                  {preset.eq.hpfSlope || '18 dB/oct'}
                </span>
              </div>

              <div className="bg-black/70 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">FÁZE & PAN</span>
                <span className="text-base font-bold text-white">
                  {preset.phaseInvert ? '180° INVERT' : '0° NORMAL'}
                </span>
                <span className="text-[10px] text-white/40 block mt-0.5">
                  Pan: {preset.pan === 0 ? 'Center (0)' : preset.pan > 0 ? `R${preset.pan}` : `L${Math.abs(preset.pan)}`} · Fader: {preset.faderDefault} dB
                </span>
              </div>
            </div>

            <div className="bg-black/50 p-3 rounded-xl border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="text-white/60 font-mono">Doporučený fyzický vstup / mikrofon:</span>
              <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/15">
                {preset.recommendedInput}
              </span>
            </div>
          </div>

          {/* 2. Noise Gate / Expander Section */}
          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${preset.gate.enabled ? 'bg-emerald-400' : 'bg-white/20'}`} />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  2. Noise Gate / Expander (Dynamické potlačení přeslechů)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-black text-white/90 font-mono text-[10px] font-bold rounded-full border border-white/20">
                  {preset.gate.model}
                </span>
                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                  preset.gate.enabled 
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' 
                    : 'bg-white/5 text-white/40 border-white/10'
                }`}>
                  {preset.gate.enabled ? 'AKTIVNÍ' : 'BYPASS'}
                </span>
              </div>
            </div>

            {preset.gate.enabled ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">THRESHOLD</span>
                    <span className="text-white font-bold text-sm">{preset.gate.threshold} dB</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RATIO</span>
                    <span className="text-white font-bold text-sm">{preset.gate.ratio}</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">ATTACK</span>
                    <span className="text-white font-bold text-sm">{preset.gate.attack} ms</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">HOLD</span>
                    <span className="text-white font-bold text-sm">{preset.gate.hold} ms</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RELEASE</span>
                    <span className="text-white font-bold text-sm">{preset.gate.release} ms</span>
                  </div>
                </div>

                {preset.gate.keyFilter && (
                  <div className="text-xs font-mono text-cyan-300 bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/30 flex items-center gap-2">
                    <span className="font-bold text-cyan-400 uppercase text-[10px]">Sidechain Key Filter:</span>
                    <span>{preset.gate.keyFilter}</span>
                  </div>
                )}
                {preset.gate.notes && (
                  <p className="text-xs text-gray-300 italic bg-black/40 p-2.5 rounded-xl border border-white/5">
                    💡 {preset.gate.notes}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-white/40 font-mono italic bg-black/40 p-3 rounded-xl border border-white/5">
                Noise Gate je pro tento nástroj vyřazen (Bypass), aby se zachoval přirozený dozvuk těla a jemné dynamické nuance.
              </p>
            )}
          </div>

          {/* 3. 6-Band Parametric Equalizer Section */}
          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  3. Ekvalizér (6-Band Channel Equalizer)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-black text-emerald-400 font-mono text-[10px] font-bold rounded-full border border-emerald-500/30">
                  {preset.eq.model}
                </span>
                <span className="text-xs font-mono text-white/60">
                  Mix: <strong className="text-white">{preset.eq.mix}%</strong>
                </span>
              </div>
            </div>

            {/* Interactive/Visual EQ Curve */}
            <div className="bg-black/90 p-2 rounded-xl border border-white/10">
              <VisualEQCurve
                bands={preset.eq.bands}
                hpfFreq={preset.eq.hpfFreq}
                hpfSlope={preset.eq.hpfSlope}
                modelName={preset.eq.model}
              />
            </div>

            {/* EQ Bands detailed table */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 font-mono text-xs">
              {preset.eq.bands.map((band, idx) => (
                <div key={band.id || idx} className="bg-black/70 p-2 rounded-lg border border-white/10 text-center">
                  <span className="text-[10px] text-white/50 block font-bold uppercase">
                    Pásmo {idx + 1} ({band.type.toUpperCase()})
                  </span>
                  <span className="text-white font-bold block text-sm mt-0.5">
                    {band.freq >= 1000 ? `${(band.freq / 1000).toFixed(1)} kHz` : `${band.freq} Hz`}
                  </span>
                  <span className={`text-[11px] font-bold block ${
                    band.gain > 0 ? 'text-emerald-400' : band.gain < 0 ? 'text-amber-400' : 'text-white/40'
                  }`}>
                    {band.gain > 0 ? `+${band.gain}` : band.gain} dB
                  </span>
                  <span className="text-[9px] text-white/40 block">Q: {band.q}</span>
                </div>
              ))}
            </div>

            {preset.eq.notes && (
              <p className="text-xs text-gray-200 bg-black/60 p-3 rounded-xl border border-white/10 leading-relaxed">
                🎯 <strong className="text-white">Doporučení pro frekvenční úpravy:</strong> {preset.eq.notes}
              </p>
            )}
          </div>

          {/* 4. Dynamics & Compressor Section */}
          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3.5">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                  4. Kompresor & Dynamika (Channel Dynamics Slot)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 bg-black text-cyan-400 font-mono text-[10px] font-bold rounded-full border border-cyan-500/30">
                  {preset.comp.model}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                  {preset.comp.enabled ? 'AKTIVNÍ' : 'BYPASS'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Transfer Graph & Meter */}
              <div className="md:col-span-5 bg-black/90 p-2 rounded-xl border border-white/10 flex justify-center">
                <VisualCompTransfer comp={preset.comp} />
              </div>

              {/* Numeric Parameter Breakdown & Notes */}
              <div className="md:col-span-7 space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">THRESHOLD</span>
                    <span className="text-white font-bold text-sm">{preset.comp.threshold} dB</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RATIO</span>
                    <span className="text-white font-bold text-sm">{preset.comp.ratio}</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">MAKE-UP GAIN</span>
                    <span className="text-emerald-400 font-bold text-sm">+{preset.comp.makeUpGain} dB</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">ATTACK</span>
                    <span className="text-white font-bold">{preset.comp.attack}</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RELEASE</span>
                    <span className="text-white font-bold">{preset.comp.release}</span>
                  </div>
                  <div className="bg-black/70 p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">KNEE</span>
                    <span className="text-white font-bold">{preset.comp.knee} (Soft/Hard)</span>
                  </div>
                </div>

                {preset.comp.notes && (
                  <p className="text-xs text-gray-200 bg-black/60 p-3 rounded-xl border border-white/10 leading-relaxed">
                    ⚙️ <strong className="text-white">Chování kompresoru:</strong> {preset.comp.notes}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* 5. FX Rack Routing & Sběrnice */}
          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                5. Efektové sběrnice a inserty (FX Rack Routing)
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="bg-black/70 border border-white/10 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-cyan-400 font-bold">
                    PRIMÁRNÍ EFEKT ({preset.fx.primaryFX.slotType === 'Insert' ? 'INSERT INS1' : preset.fx.primaryFX.busName})
                  </span>
                  {preset.fx.primaryFX.sendLevelDb !== undefined && (
                    <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                      Send: {preset.fx.primaryFX.sendLevelDb} dB
                    </span>
                  )}
                </div>
                <div className="text-white font-bold text-sm">
                  {preset.fx.primaryFX.model}
                </div>
                {preset.fx.primaryFX.decayOrTime && (
                  <div className="text-cyan-300 text-xs">
                    Decay / Čas: {preset.fx.primaryFX.decayOrTime}
                  </div>
                )}
                <div className="text-white/60 text-[11px] pt-1.5 border-t border-white/5">
                  {preset.fx.primaryFX.keySettings}
                </div>
              </div>

              {preset.fx.secondaryFX ? (
                <div className="bg-black/70 border border-white/10 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-cyan-400 font-bold">
                      SEKUNDÁRNÍ EFEKT ({preset.fx.secondaryFX.slotType === 'Insert' ? 'INSERT INS2' : preset.fx.secondaryFX.busName})
                    </span>
                    {preset.fx.secondaryFX.sendLevelDb !== undefined && (
                      <span className="text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                        Send: {preset.fx.secondaryFX.sendLevelDb} dB
                      </span>
                    )}
                  </div>
                  <div className="text-white font-bold text-sm">
                    {preset.fx.secondaryFX.model}
                  </div>
                  {preset.fx.secondaryFX.decayOrTime && (
                    <div className="text-cyan-300 text-xs">
                      Decay / Čas: {preset.fx.secondaryFX.decayOrTime}
                    </div>
                  )}
                  <div className="text-white/60 text-[11px] pt-1.5 border-t border-white/5">
                    {preset.fx.secondaryFX.keySettings}
                  </div>
                </div>
              ) : (
                <div className="bg-black/50 border border-white/5 p-3.5 rounded-xl flex items-center justify-center text-white/30 text-xs italic">
                  Žádný sekundární efekt není vyžadován.
                </div>
              )}
            </div>
          </div>

          {/* 6. Professional Sound Engineer Tips */}
          <div className="bg-[#181818] border border-amber-500/20 rounded-xl p-4 sm:p-5 shadow-xl space-y-2.5">
            <div className="flex items-center gap-2 text-white">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400">
                Zvukařské profi tipy pro mixážní pult
              </h3>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-200">
              {preset.proTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2.5 bg-black/40 p-2.5 rounded-lg border border-white/5">
                  <span className="text-amber-400 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer: Sticky Bottom Navigation Toolbar for Tablet */}
        <div className="bg-[#181818] border-t border-white/10 p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            {hasPrev && onPrev ? (
              <button
                onClick={onPrev}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold border border-white/10 transition-all cursor-pointer active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Předchozí nástroj</span>
                <span className="sm:hidden">Předchozí</span>
              </button>
            ) : (
              <div className="text-xs font-mono text-white/30 px-2">První</div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onSaveToScenes && (
              <button
                onClick={() => {
                  onSaveToScenes(preset);
                  onClose();
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 text-xs font-semibold border border-cyan-500/40 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Uložit do scény</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white text-black hover:bg-white/90 text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 shadow-lg"
            >
              Zavřít okno
            </button>
          </div>

          <div className="flex items-center gap-2">
            {hasNext && onNext ? (
              <button
                onClick={onNext}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all cursor-pointer active:scale-95"
              >
                <span className="hidden sm:inline">Další nástroj</span>
                <span className="sm:hidden">Další</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="text-xs font-mono text-white/30 px-2">Poslední</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
