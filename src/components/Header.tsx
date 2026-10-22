import React from 'react';
import { NavigationTab, MixerId } from '../types';
import { MIXERS } from '../data/mixersConfig';
import { 
  BookOpen, 
  Sliders, 
  Layers, 
  Activity, 
  Search, 
  Cpu, 
  Sparkles, 
  Download, 
  Mic2,
  FileText,
  SlidersHorizontal,
  Wifi,
  Radio,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  activeMixerId: MixerId;
  setActiveMixerId: (mixerId: MixerId) => void;
  onOpenSearch: () => void;
  onOpenAppendix?: (section?: 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge') => void;
  onOpenInstall?: () => void;
  onOpenPdf?: () => void;
  favoritesCount: number;
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack?: () => void;
  onGoForward?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  activeMixerId,
  setActiveMixerId,
  onOpenSearch,
  onOpenAppendix,
  onOpenInstall,
  onOpenPdf,
  favoritesCount,
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward
}) => {
  const currentMixer = MIXERS[activeMixerId] || MIXERS.wing;

  return (
    <header className="sticky top-0 z-40 bg-[#101216] border-b border-white/10 text-gray-300 select-none shadow-xl">
      {/* Top Banner: App Title & Multi-Mixer Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-white/20 to-white/5 text-white font-black text-lg border border-white/20 shadow-md">
            M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                  Mixings Manual
                </span>
              </h1>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full font-bold hidden sm:inline">
                Pro Hub
              </span>
            </div>
            <p className="text-[11px] text-white/50 hidden md:block">
              Interaktivní manuály & nástroje pro digitální mixážní pulty
            </p>
          </div>
        </div>

        {/* Navigation History Arrows (Zpět & Vpřed) */}
        <div className="flex items-center gap-1 p-1 bg-black/60 rounded-xl border border-white/10 shadow-inner">
          <button
            onClick={onGoBack}
            disabled={!canGoBack}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              canGoBack
                ? 'text-white hover:bg-white/15 hover:text-cyan-300 cursor-pointer active:scale-95'
                : 'text-white/20 cursor-not-allowed'
            }`}
            title={canGoBack ? 'Zpět o krok v historii (Alt+←)' : 'Historie: Jste na začátku'}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px]">Zpět</span>
          </button>
          <button
            onClick={onGoForward}
            disabled={!canGoForward}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              canGoForward
                ? 'text-white hover:bg-white/15 hover:text-cyan-300 cursor-pointer active:scale-95'
                : 'text-white/20 cursor-not-allowed'
            }`}
            title={canGoForward ? 'Vpřed o krok v historii (Alt+→)' : 'Historie: Jste na konci'}
          >
            <span className="hidden xl:inline text-[11px]">Vpřed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mixer Switcher Selector Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-xl border border-white/10 shadow-inner">
          {/* WING Button */}
          <button
            onClick={() => setActiveMixerId('wing')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMixerId === 'wing'
                ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>WING Compact</span>
          </button>

          {/* X32 Producer Button */}
          <button
            onClick={() => setActiveMixerId('x32')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMixerId === 'x32'
                ? 'bg-sky-500 text-black shadow-md shadow-sky-500/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>X32 Producer</span>
          </button>

          {/* Soundcraft Ui24R Button */}
          <button
            onClick={() => setActiveMixerId('ui24')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeMixerId === 'ui24'
                ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Wifi className="w-3.5 h-3.5" />
            <span>Soundcraft Ui24R</span>
          </button>
        </div>

        {/* Action icons & utilities */}
        <div className="flex items-center gap-2">
          {/* Official PDF manual button if available for active mixer */}
          {currentMixer.pdfUrl && onOpenPdf && (
            <button
              onClick={onOpenPdf}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all text-xs font-semibold focus:outline-none cursor-pointer"
              title={`Otevřít originální PDF manuál: ${currentMixer.pdfTitle}`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF Manuál</span>
            </button>
          )}

          {/* Quick Search Button */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 bg-black/40 text-gray-300 hover:text-white hover:border-white/30 transition-all text-xs focus:outline-none cursor-pointer"
            title="Hledat v manuálech a presetech (Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-white/50" />
            <span className="hidden sm:inline text-xs">Hledat</span>
            <kbd className="hidden md:inline text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-white/40 border border-white/10">⌘K</kbd>
          </button>

          {/* Appendix / Mixer Bridge Button */}
          {onOpenAppendix && (
            <button
              onClick={() => onOpenAppendix('bridge')}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white font-medium transition-all text-xs focus:outline-none cursor-pointer"
              title="Příloha & Propojení s reálným pultem"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/70" />
              <span className="text-xs hidden sm:inline">Příloha</span>
            </button>
          )}

          {/* PWA Install Button */}
          {onOpenInstall && (
            <button
              onClick={onOpenInstall}
              className="flex items-center gap-1.5 h-8 px-3 rounded-lg border border-white/15 bg-white/5 hover:bg-white/15 text-white font-semibold transition-all text-xs focus:outline-none cursor-pointer"
              title="Instalovat jako offline aplikaci"
            >
              <Download className="w-3.5 h-3.5 text-white/80" />
              <span className="text-xs hidden sm:inline">Instalovat</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Mixer Status Strip */}
      <div className="bg-[#0b0d10] px-4 sm:px-6 py-1.5 border-b border-white/5 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
          <span className="text-white/40">Aktivní pult:</span>
          <span className="text-white font-bold">{currentMixer.fullName}</span>
          <span className="text-white/20">|</span>
          <span className="text-white/60 hidden md:inline">{currentMixer.tagline}</span>
        </div>

        <div className="flex items-center gap-3 text-white/50">
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px]">
            {currentMixer.firmware}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] hidden sm:inline">
            {currentMixer.specs.channels}
          </span>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="bg-[#121418]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-sm">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Manuál ({currentMixer.name})</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>2. Knihovna Presetů</span>
            </button>

            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'scenes'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Scény & CUEs</span>
              {favoritesCount > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded font-mono ${
                  activeTab === 'scenes' ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/70'
                }`}>
                  {favoritesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('diagnostics')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'diagnostics'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>4. Diagnostika & Audio Nástroje</span>
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>5. Hardware ({currentMixer.name})</span>
            </button>

            <button
              onClick={() => setActiveTab('microphones')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'microphones'
                  ? 'bg-emerald-400 text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mic2 className="w-4 h-4" />
              <span>6. Mikrofony (86 ks)</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
