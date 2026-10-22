import React, { useState, useEffect, useRef } from 'react';
import { MANUAL_CHAPTERS } from '../data/manualData';
import { MANUAL_CHAPTERS_X32 } from '../data/manualDataX32';
import { MANUAL_CHAPTERS_UI24 } from '../data/manualDataUi24';
import { INSTRUMENT_PRESETS } from '../data/presetsData';
import { NavigationTab, MixerId } from '../types';
import { 
  Search, 
  BookOpen, 
  Sliders, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  X,
  Layers,
  Activity,
  SlidersHorizontal,
  Wifi,
  Radio
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMixerId: MixerId;
  onSelectMixer?: (mixerId: MixerId) => void;
  onSelectManualSection: (chapterId: string, subsectionId: string) => void;
  onSelectPreset: (presetId: string) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

interface SearchResultItem {
  id: string;
  type: 'manual' | 'preset' | 'shortcut' | 'fx';
  mixerId?: MixerId;
  title: string;
  subtitle: string;
  category: string;
  meta?: string;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  activeMixerId,
  onSelectMixer,
  onSelectManualSection,
  onSelectPreset,
  onSelectTab
}) => {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'x32' | 'ui24' | 'wing' | 'preset'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Build searchable index
  const results: SearchResultItem[] = [];
  const q = query.toLowerCase().trim();

  // Helper to index manual chapters
  const indexManual = (chapters: typeof MANUAL_CHAPTERS, mixer: MixerId, label: string) => {
    chapters.forEach(ch => {
      ch.subsections.forEach(sub => {
        if (
          !q ||
          sub.title.toLowerCase().includes(q) ||
          sub.summary.toLowerCase().includes(q) ||
          sub.content.toLowerCase().includes(q) ||
          ch.title.toLowerCase().includes(q) ||
          label.toLowerCase().includes(q)
        ) {
          results.push({
            id: `${mixer}-sub-${sub.id}`,
            type: 'manual',
            mixerId: mixer,
            title: sub.title,
            subtitle: `${label} • Kapitola ${ch.number}: ${ch.title} • ${sub.summary}`,
            category: label,
            action: () => {
              if (onSelectMixer) {
                onSelectMixer(mixer);
              }
              onSelectManualSection(ch.id, sub.id);
              onClose();
            }
          });
        }
      });
    });
  };

  // 1. Index All 3 Consoles
  indexManual(MANUAL_CHAPTERS, 'wing', 'WING Compact');
  indexManual(MANUAL_CHAPTERS_X32, 'x32', 'X32 Producer');
  indexManual(MANUAL_CHAPTERS_UI24, 'ui24', 'Soundcraft Ui24R');

  // 2. Search Instrument & Vocal Presets
  INSTRUMENT_PRESETS.forEach(p => {
    if (
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.eq.model.toLowerCase().includes(q) ||
      p.comp.model.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q)
    ) {
      results.push({
        id: `preset-${p.id}`,
        type: 'preset',
        title: p.name,
        subtitle: `${p.categoryLabel} • EQ: ${p.eq.model} • COMP: ${p.comp.model}`,
        category: 'Zvukový Preset (Lab)',
        action: () => {
          onSelectPreset(p.id);
          onClose();
        }
      });
    }
  });

  // Filter results based on selectedFilter
  const filteredResults = results.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return item.mixerId === activeMixerId;
    if (selectedFilter === 'wing') return item.mixerId === 'wing';
    if (selectedFilter === 'x32') return item.mixerId === 'x32';
    if (selectedFilter === 'ui24') return item.mixerId === 'ui24';
    if (selectedFilter === 'preset') return item.type === 'preset';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121418] border border-white/20 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative border-b border-white/10 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-white/50 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Hledat napříč WING, X32 Producer, Ui24R, presety, routing..."
            className="w-full bg-transparent text-base text-white placeholder-white/40 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-mono text-white/40 hover:text-white px-2 py-1 bg-white/5 rounded border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2 bg-black/40 border-b border-white/5 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-white/40 text-[11px] mr-1">Filtrovat:</span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'all' ? 'bg-white text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Vše ({results.length})
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'active' ? 'bg-emerald-400 text-black font-bold' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            Aktivní pult ({results.filter(r => r.mixerId === activeMixerId).length})
          </button>
          <button
            onClick={() => setSelectedFilter('x32')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'x32' ? 'bg-sky-500 text-black font-bold' : 'text-sky-300/80 hover:text-white hover:bg-white/5'
            }`}
          >
            X32 Producer
          </button>
          <button
            onClick={() => setSelectedFilter('ui24')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'ui24' ? 'bg-cyan-400 text-black font-bold' : 'text-cyan-300/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Soundcraft Ui24R
          </button>
          <button
            onClick={() => setSelectedFilter('wing')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'wing' ? 'bg-amber-500 text-black font-bold' : 'text-amber-300/80 hover:text-white hover:bg-white/5'
            }`}
          >
            WING Compact
          </button>
          <button
            onClick={() => setSelectedFilter('preset')}
            className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
              selectedFilter === 'preset' ? 'bg-purple-400 text-black font-bold' : 'text-purple-300/80 hover:text-white hover:bg-white/5'
            }`}
          >
            Presety
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          {filteredResults.length === 0 ? (
            <div className="py-12 text-center text-white/40 space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-30" />
              <p className="text-sm">Nenalezeny žádné záznamy pro dotaz "{query}"</p>
              <p className="text-xs text-white/30">Zkuste zadat např. "Preamp", "Sends on Fader", "Cascade", "Lexicon", "AES50", "DCA"</p>
            </div>
          ) : (
            filteredResults.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-white/20 transition-all cursor-pointer group flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-black border border-white/10 text-white/70">
                      {item.category}
                    </span>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-white/50 mt-1 line-clamp-1">
                    {item.subtitle}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
              </div>
            ))
          )}
        </div>

        {/* Search Footer */}
        <div className="p-3 bg-black/60 border-t border-white/10 text-[11px] font-mono text-white/40 flex items-center justify-between">
          <span>Stiskem šipek procházíte, Enterem otevřete, ESC zavřete</span>
          <span>Nalezeno {filteredResults.length} výsledků</span>
        </div>
      </div>
    </div>
  );
};
