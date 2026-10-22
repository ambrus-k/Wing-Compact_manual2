import React, { useState } from 'react';
import { SavedScene, SceneChannelPatch } from '../types';
import { 
  exportToMixingStationJson, 
  exportChannelPresetJson, 
  downloadFile 
} from '../utils/mixingStationParser';
import { 
  Radio, 
  Download, 
  FileText, 
  Sliders, 
  X, 
  CheckCircle2, 
  Info,
  ExternalLink
} from 'lucide-react';

interface MixingStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentScene: SavedScene;
  mixerModel?: string;
  onOpenPdfRider?: () => void;
}

export const MixingStationModal: React.FC<MixingStationModalProps> = ({
  isOpen,
  onClose,
  currentScene,
  mixerModel = 'wing',
  onOpenPdfRider
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'channel_preset'>('export');
  const [selectedChannelChNum, setSelectedChannelChNum] = useState<number>(currentScene.channels?.[0]?.chNum || 1);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportScene = () => {
    const jsonContent = exportToMixingStationJson(currentScene, mixerModel);
    const filename = `MixingStation_${currentScene.name.replace(/[^a-zA-Z0-9]/g, '_')}.ms`;
    downloadFile(jsonContent, filename, 'application/json');
    setSuccessToast(`Scéna "${filename}" byla úspěšně stažena pro aplikaci Mixing Station!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const handleExportPreset = () => {
    const ch = (currentScene.channels || []).find(c => c.chNum === selectedChannelChNum) || currentScene.channels?.[0];
    if (!ch) return;
    const jsonContent = exportChannelPresetJson(ch, mixerModel);
    const filename = `Preset_CH${ch.chNum}_${ch.name.replace(/[^a-zA-Z0-9]/g, '_')}.json`;
    downloadFile(jsonContent, filename, 'application/json');
    setSuccessToast(`Preset pro "${ch.name}" stažen!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  const selectedChannel = (currentScene.channels || []).find(c => c.chNum === selectedChannelChNum) || currentScene.channels?.[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center border border-orange-500/30 shadow-inner">
              <Radio className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Export pro Mixing Station & Pulty
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-orange-500/20 text-orange-300 rounded-full border border-orange-500/30 font-bold uppercase">
                  Export Centrum
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Exportujte aktivní scénu nebo presety kanálů pro offline použití v aplikaci Mixing Station (Android, iOS, PC, Mac).
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#161616] px-4 pt-2 gap-2">
          <button
            onClick={() => setActiveTab('export')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'export'
                ? 'border-orange-400 text-orange-300 bg-black/40'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>📤 Exportovat kompletní scénu (.ms)</span>
          </button>

          <button
            onClick={() => setActiveTab('channel_preset')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer ${
              activeTab === 'channel_preset'
                ? 'border-orange-400 text-orange-300 bg-black/40'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>🎚️ Exportovat jednotlivý preset stopy (.json)</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {successToast && (
            <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-xl text-emerald-300 font-semibold text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{successToast}</span>
            </div>
          )}

          {/* TAB 1: EXPORT SCENE */}
          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/60 font-bold uppercase tracking-wider text-[11px]">
                    Exportovaná scéna:
                  </span>
                  <span className="text-orange-400 font-mono font-bold">
                    {currentScene.channels?.length || 0} stop • {(currentScene.buses || []).length} sběrnic • {(currentScene.dcas || []).length} DCA
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {currentScene.name}
                </h4>
                <p className="text-xs text-white/60">
                  {currentScene.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase font-bold">Cílový profil</span>
                  <span className="text-white font-bold">{mixerModel.toUpperCase()} / Mixing Station Universal</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-white/40 block text-[10px] uppercase font-bold">Výstupní formát</span>
                  <span className="text-orange-300 font-bold">.ms / JSON (Offline Scene Dump)</span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 p-3.5 rounded-xl text-orange-200 text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-bold block">Návod k nahrání do Mixing Station:</span>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    Stáhněte soubor <strong>.ms</strong>, v aplikaci Mixing Station otevřete nabídku <em>Scenes / Presets ➔ Import</em> a vyberte stažený soubor. Všechny gainy, názvy kanálů, barvy i směrování budou okamžitě načteny.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/10">
                {onOpenPdfRider && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenPdfRider();
                    }}
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold cursor-pointer border border-white/10"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Otevřít tištěný Stage Rider v PDF</span>
                  </button>
                )}

                <button
                  onClick={handleExportScene}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold rounded-xl text-xs shadow-lg shadow-orange-500/20 transition-all cursor-pointer ml-auto"
                >
                  <Download className="w-4 h-4" />
                  <span>Stáhnout offline scénu ({currentScene.name}.ms)</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: EXPORT CHANNEL PRESET */}
          {activeTab === 'channel_preset' && (
            <div className="space-y-4">
              <div className="bg-black/50 p-4 rounded-xl border border-white/10 space-y-3">
                <label className="text-white/60 block font-bold text-xs">
                  Vyberte kanál pro export presetového souboru:
                </label>
                <select
                  value={selectedChannelChNum}
                  onChange={(e) => setSelectedChannelChNum(Number(e.target.value))}
                  className="w-full bg-[#181818] border border-white/15 rounded-xl px-3.5 py-2 text-white font-bold text-xs focus:outline-none focus:border-orange-400"
                >
                  {(currentScene.channels || []).map(ch => (
                    <option key={ch.chNum} value={ch.chNum}>
                      CH {ch.chNum}: {ch.name} ({ch.sourceInput} • +{ch.gainDb} dB)
                    </option>
                  ))}
                </select>
              </div>

              {selectedChannel && (
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 space-y-3 text-xs font-mono">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-bold text-white text-sm">CH {selectedChannel.chNum}: {selectedChannel.name}</span>
                    <span className="text-emerald-400 font-bold">+{selectedChannel.gainDb} dB</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-white/70">
                    <div>Fantom +48V: <strong className="text-white">{selectedChannel.phantom48V ? 'ANO' : 'NE'}</strong></div>
                    <div>Šumová brána: <strong className="text-white">{selectedChannel.gateModel}</strong></div>
                    <div>EQ Model: <strong className="text-white">{selectedChannel.eqModel}</strong></div>
                    <div>Kompresor: <strong className="text-white">{selectedChannel.compModel}</strong></div>
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end border-t border-white/10">
                <button
                  onClick={handleExportPreset}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-black font-extrabold rounded-xl text-xs shadow-lg shadow-orange-500/20 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Stáhnout preset stopy (.json)</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
