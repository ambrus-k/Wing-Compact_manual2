import React, { useState, useEffect, useRef } from 'react';
import { MANUAL_CHAPTERS } from '../data/manualData';
import { INSTRUMENT_PRESETS } from '../data/presetsData';
import { NavigationTab } from '../types';
import { 
  Search, 
  BookOpen, 
  Sliders, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  X,
  Layers,
  Activity
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectManualSection: (chapterId: string, subsectionId: string) => void;
  onSelectPreset: (presetId: string) => void;
  onSelectTab: (tab: NavigationTab) => void;
}

interface SearchResultItem {
  id: string;
  type: 'manual' | 'preset' | 'shortcut' | 'fx';
  title: string;
  subtitle: string;
  category: string;
  meta?: string;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectManualSection,
  onSelectPreset,
  onSelectTab
}) => {
  const [query, setQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
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

  // 1. Search Manual Subsections
  MANUAL_CHAPTERS.forEach(ch => {
    ch.subsections.forEach(sub => {
      if (
        !q ||
        sub.title.toLowerCase().includes(q) ||
        sub.summary.toLowerCase().includes(q) ||
        sub.content.toLowerCase().includes(q) ||
        ch.title.toLowerCase().includes(q)
      ) {
        results.push({
          id: `sub-${sub.id}`,
          type: 'manual',
          title: sub.title,
          subtitle: `${ch.title} • ${sub.summary}`,
          category: `Kapitola ${ch.number}`,
          action: () => {
            onSelectManualSection(ch.id, sub.id);
            onClose();
          }
        });
      }
    });
  });

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

  // 3. Search Key Shortcuts
  const shortcutKeywords = ['ghost', 'touch', 'reset', 'boot', 'emergency', 'lock', 'surface', 'screenshot', 'heslo', 'zkratk'];
  if (!q || shortcutKeywords.some(k => q.includes(k))) {
    results.push({
      id: 'shortcut-touch-reset',
      type: 'shortcut',
      title: 'Reset dotykového panelu (Ghost touch fix)',
      subtitle: 'Podržte prázdné tlačítko u displeje a CLR SOLO na >1.5 sekundy.',
      category: 'Servisní zkratka',
      action: () => {
        onSelectManualSection('ch-10-shortcuts-troubleshooting', '10-1-hardware-shortcuts');
        onClose();
      }
    });
    results.push({
      id: 'shortcut-emergency-boot',
      type: 'shortcut',
      title: 'Nouzový režim spuštění (Emergency Boot)',
      subtitle: 'Při zapínání pultu držte prázdné tlačítko pro přístup k WING OS disku z počítače.',
      category: 'Servisní zkratka',
      action: () => {
        onSelectManualSection('ch-10-shortcuts-troubleshooting', '10-1-hardware-shortcuts');
        onClose();
      }
    });
  }

  const filteredResults = results.filter(item => {
    if (selectedType === 'all') return true;
    return item.type === selectedType;
  });

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'manual': return <BookOpen className="w-4 h-4 text-amber-400" />;
      case 'preset': return <Sliders className="w-4 h-4 text-cyan-400" />;
      case 'shortcut': return <Zap className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center p-4 sm:p-6 md:p-12 animate-in fade-in duration-150">
      <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-[#000000]">
          <Search className="w-5 h-5 text-white/60 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && filteredResults.length > 0) {
                e.preventDefault();
                filteredResults[0].action();
              }
            }}
            placeholder="Hledat funkci v manuálu WING (např. Gate, EQ, Talkback, RTA, DCA, ghost touch)..."
            className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-white/40 hover:text-white text-xs p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline text-[10px] bg-white/5 px-2.5 py-1 rounded text-white/40 border border-white/10 font-mono">
            ESC
          </kbd>
        </div>

        {/* Filter Pills */}
        <div className="px-4 py-2.5 border-b border-white/5 bg-[#0a0a0a] flex items-center gap-1.5 overflow-x-auto text-xs">
          {[
            { id: 'all', label: 'Vše' },
            { id: 'manual', label: 'Manuál' },
            { id: 'preset', label: 'Zvukové Presety' },
            { id: 'shortcut', label: 'Klávesové zkratky' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedType(f.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                selectedType === f.id
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-white/50 hover:text-white border border-white/10'
              }`}
            >
              {f.label}
            </button>
          ))}
          <span className="ml-auto text-[10px] font-mono text-white/40">
            {filteredResults.length} výsledků
          </span>
        </div>

        {/* Search Results List */}
        <div className="p-2 overflow-y-auto space-y-1 divide-y divide-white/5">
          {filteredResults.length > 0 ? (
            filteredResults.map(item => (
              <div
                key={item.id}
                onClick={item.action}
                className="p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-colors group flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-2 rounded-lg bg-[#000000] border border-white/10">
                    {getResultIcon(item.type)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white group-hover:text-white/90 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.2 bg-black text-white/40 rounded-full border border-white/10">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-xs text-white/40">
              Žádné výsledky pro dotaz "{query}". Zkuste hledat "routing", "tap", "vocal", "kopák", "gate", "firmware" nebo "ghost".
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
