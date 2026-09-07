import React from 'react';
import { NavigationTab } from '../types';
import { 
  BookOpen, 
  Sliders, 
  Layers, 
  Activity, 
  Search, 
  Cpu,
  Sparkles,
  Download,
  Mic2
} from 'lucide-react';

interface HeaderProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenSearch: () => void;
  onOpenAppendix?: (section?: 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge') => void;
  onOpenInstall?: () => void;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAppendix,
  onOpenInstall,
  favoritesCount
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#121418] border-b border-white/10 text-gray-300 select-none shadow-md">
      {/* Main Console Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand logo & title */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-white font-black text-base border border-white/20 shadow-sm">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                <span className="text-white/80">BEHRINGER</span>
                <span className="text-white font-black">WING COMPACT</span>
              </h1>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-white/5 text-white/60 border border-white/10 rounded">
                Manuál & Nástroje
              </span>
            </div>
          </div>
        </div>

        {/* Action icons & buttons */}
        <div className="flex items-center gap-2">
          {/* Quick Search Button */}
          <button 
            onClick={onOpenSearch}
            className="flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 bg-black/40 text-gray-300 hover:text-white hover:border-white/30 transition-all text-xs focus:outline-none cursor-pointer"
            title="Hledat v manuálu a presetech (Ctrl+K)"
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

      {/* Clean Navigation Tabs Row */}
      <div className="border-t border-white/5 bg-[#0e1014]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex items-center overflow-x-auto scrollbar-none">
          <nav className="flex items-center gap-1.5 sm:gap-2 text-sm">
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'manual'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Manuál</span>
            </button>

            <button
              onClick={() => setActiveTab('presets')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>2. Knihovna Presetů (Nástroje)</span>
            </button>

            <button
              onClick={() => setActiveTab('scenes')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'scenes'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>3. Kompletní Scény (Kapely & Akce)</span>
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
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'diagnostics'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>4. Diagnostika</span>
            </button>

            <button
              onClick={() => setActiveTab('hardware')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'hardware'
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>5. Hardware Mapa</span>
            </button>

            <button
              onClick={() => setActiveTab('microphones')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm sm:text-base font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'microphones'
                  ? 'bg-emerald-400 text-black font-bold shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mic2 className="w-4 h-4" />
              <span>6. Mikrofony</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
