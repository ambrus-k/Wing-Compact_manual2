import React, { useState, useMemo, useEffect } from 'react';
import { InstrumentPreset, MixerId } from '../types';
import { INSTRUMENT_PRESETS } from '../data/presetsData';
import { VisualEQCurve } from './VisualEQCurve';
import { VisualCompTransfer } from './VisualCompTransfer';
import { 
  Sliders, 
  Search, 
  Mic, 
  Drum, 
  Music, 
  Activity, 
  Volume2, 
  Sparkles, 
  Check, 
  Copy, 
  Bookmark, 
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Info, 
  Radio, 
  Zap, 
  VolumeX, 
  Volume1,
  X,
  Layers,
  Filter,
  Maximize2
} from 'lucide-react';
import { playSineTone, playPinkNoise, stopTestSignal } from '../utils/audioDiagnostics';
import { PresetDetailModal } from './PresetDetailModal';

interface PresetsLabProps {
  onSaveToScenes?: (preset: InstrumentPreset) => void;
  onOpenAppendix?: () => void;
  initialPresetId?: string;
  activeMixerId?: MixerId;
}

// Helper to determine the instrument subgroup within each family
export const getPresetSubGroup = (preset: InstrumentPreset): string => {
  if (preset.subGroup) return preset.subGroup;
  const name = preset.name.toLowerCase();
  const id = preset.id.toLowerCase();
  
  if (preset.category === 'woodwinds') {
    if (name.includes('flétn') || name.includes('pikol') || id.includes('flute') || id.includes('piccolo') || id.includes('recorder')) return 'Flétny & Pikoly';
    if (name.includes('hoboj') || name.includes('anglický roh') || name.includes('heckel') || name.includes('d\'amore') || id.includes('oboe') || id.includes('english-horn')) return 'Hoboje & Anglický roh';
    if (name.includes('klarinet') || name.includes('basetový') || id.includes('clarinet') || id.includes('basset')) return 'Klarinety & Basklarinet';
    if (name.includes('fagot') || id.includes('bassoon')) return 'Fagoty & Kontrafagot';
    if (name.includes('sax') || id.includes('sax')) return 'Saxofony';
    if (name.includes('sekce') || name.includes('tutti') || id.includes('section')) return 'Dřevěné dechy Tutti';
    return 'Dřevěné dechy - ostatní';
  }
  if (preset.category === 'brass') {
    if (name.includes('trubk') || name.includes('křídlovk') || name.includes('kornet') || id.includes('trumpet') || id.includes('flugel') || id.includes('cornet')) return 'Trubky & Křídlovky';
    if (name.includes('roh') || name.includes('horn') || name.includes('wagnerova') || id.includes('horn')) return 'Lesní rohy';
    if (name.includes('trombon') || name.includes('pozoun') || name.includes('cimbasso') || id.includes('trombone')) return 'Pozouny (Trombony)';
    if (name.includes('tuba') || name.includes('heligon') || name.includes('suzafon') || name.includes('euphonium') || name.includes('baryton') || id.includes('tuba') || id.includes('baritone')) return 'Tuby & Baryton';
    if (name.includes('sekce') || name.includes('tutti') || id.includes('section')) return 'Žesťová sekce';
    return 'Žesťové dechy - ostatní';
  }
  if (preset.category === 'strings') {
    if (name.includes('housle') || id.includes('violin')) return 'Housle';
    if (name.includes('viola') || id.includes('viola')) return 'Violy';
    if (name.includes('violoncello') || name.includes('cello') || id.includes('cello')) return 'Violoncella';
    if (name.includes('kontrabas') || id.includes('contrabass') || id.includes('double-bass')) return 'Kontrabasy';
    if (name.includes('sekce') || name.includes('tutti') || name.includes('kvartet') || id.includes('section') || id.includes('quartet')) return 'Smyčcové soubory';
    return 'Ostatní smyčce';
  }
  if (preset.category === 'guitars') {
    if (name.includes('akust') || name.includes('španělsk') || id.includes('acoustic') || id.includes('classical')) return 'Akustické kytary';
    if (name.includes('baskytara') || name.includes('basa') || id.includes('bass')) return 'Baskytary';
    if (name.includes('elektrick') || id.includes('electric')) return 'Elektrické kytary';
    if (name.includes('mandol') || name.includes('banjo') || name.includes('ukulele') || id.includes('mandolin') || id.includes('banjo') || id.includes('ukulele')) return 'Folk & Strunné';
    return 'Kytary';
  }
  if (preset.category === 'keys') {
    if (name.includes('křídlo') || name.includes('pianino') || name.includes('klavír') || id.includes('piano')) return 'Klavíry & Křídla';
    if (name.includes('varhany') || name.includes('organ') || name.includes('hammond') || id.includes('organ')) return 'Varhany & Hammond';
    if (name.includes('rhodes') || name.includes('wurlitzer') || name.includes('clavinet') || name.includes('cembalo') || name.includes('celesta') || id.includes('rhodes') || id.includes('wurlitzer')) return 'Elektrická piana a Cembalo';
    if (name.includes('akordeon') || name.includes('harmonik') || name.includes('heligonk') || id.includes('accordion')) return 'Akordeony & Heligonky';
    if (name.includes('synth') || id.includes('synth')) return 'Syntezátory';
    return 'Klávesové nástroje';
  }
  if (preset.category === 'drums') {
    if (name.includes('kopák') || name.includes('virbl') || name.includes('hi-hat') || name.includes('tom') || name.includes('kotel') || name.includes('overhead') || name.includes('ride') || id.includes('kick') || id.includes('snare') || id.includes('hihat') || id.includes('tom') || id.includes('overhead')) return 'Bicí souprava';
    if (name.includes('tymp') || name.includes('marimb') || name.includes('xylofon') || name.includes('vibrafon') || name.includes('zvon') || name.includes('celesta') || name.includes('tam-tam') || name.includes('činel') || id.includes('timpani') || id.includes('marimba') || id.includes('xylophone') || id.includes('glockenspiel') || id.includes('chimes') || id.includes('cymbals') || id.includes('tam-tam')) return 'Laděné a orchestrální bicí';
    return 'Perkuse';
  }
  if (preset.category === 'vocals') {
    if (name.includes('lead') || name.includes('sólo') || name.includes('tenor') || name.includes('soprán') || name.includes('pop') || name.includes('rock') || name.includes('lidov') || id.includes('lead') || id.includes('opera')) return 'Sólový zpěv';
    if (name.includes('doprovod') || name.includes('backing') || id.includes('backing')) return 'Doprovodné vokály';
    if (name.includes('mluv') || name.includes('moderátor') || name.includes('host') || id.includes('spoken')) return 'Mluvené slovo';
    return 'Vokály';
  }
  if (preset.category === 'choirs') {
    if (name.includes('smíšený') || name.includes('satb') || id.includes('satb') || id.includes('mixed')) return 'Smíšený sbor';
    if (name.includes('ženský') || name.includes('dětský') || name.includes('mužský') || id.includes('ssaa') || id.includes('ttbb') || id.includes('children')) return 'Stejnorodé a dětské sbory';
    return 'Komorní a chrámové sbory';
  }
  if (preset.category === 'harp') {
    return 'Harfa';
  }
  return preset.categoryLabel;
};

export const PresetsLab: React.FC<PresetsLabProps> = ({ 
  onSaveToScenes, 
  onOpenAppendix, 
  initialPresetId,
  activeMixerId = 'wing'
}) => {
  const preampLabel = activeMixerId === 'ui24' ? 'STUDER MIC GAIN' : activeMixerId === 'x32' ? 'MIDAS PREAMP GAIN' : 'MIDAS PRO GAIN';
  const consoleBadge = activeMixerId === 'x32' ? 'X32 / M32' : activeMixerId === 'ui24' ? 'Ui24R' : 'WING COMPACT';
  const consoleFullName = activeMixerId === 'x32' ? 'BEHRINGER X32' : activeMixerId === 'ui24' ? 'SOUNDCRAFT Ui24R' : 'BEHRINGER WING COMPACT';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubGroup, setSelectedSubGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPresetId, setSelectedPresetId] = useState<string>(() => {
    return initialPresetId || INSTRUMENT_PRESETS[0].id;
  });

  // Synchronize when initialPresetId changes from external navigation
  useEffect(() => {
    if (initialPresetId) {
      setSelectedPresetId(initialPresetId);
      const found = INSTRUMENT_PRESETS.find(p => p.id === initialPresetId);
      if (found) {
        setSelectedCategory(found.category);
        setSelectedSubGroup('all');
      }
    }
  }, [initialPresetId]);

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTestSound, setActiveTestSound] = useState<'sine' | 'noise' | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);

  // 9 Exact acoustic instrument families
  const categories = useMemo(() => [
    { id: 'woodwinds', label: 'Dřevěné dechové nástroje', shortLabel: 'Dřevěné dechy', icon: 'Radio' },
    { id: 'brass', label: 'Žesťové dechové nástroje', shortLabel: 'Žestě', icon: 'Volume2' },
    { id: 'strings', label: 'Smyčcové nástroje', shortLabel: 'Smyčce', icon: 'Music' },
    { id: 'guitars', label: 'Kytary a baskytary', shortLabel: 'Kytary & Basy', icon: 'Activity' },
    { id: 'keys', label: 'Klávesové nástroje', shortLabel: 'Klávesy', icon: 'Sliders' },
    { id: 'drums', label: 'Bicí nástroje a perkuse', shortLabel: 'Bicí & Perkuse', icon: 'Drum' },
    { id: 'vocals', label: 'Sólové a doprovodné vokály', shortLabel: 'Vokály', icon: 'Mic' },
    { id: 'choirs', label: 'Pěvecké sbory', shortLabel: 'Sbory', icon: 'Layers' },
    { id: 'harp', label: 'Harfa', shortLabel: 'Harfa', icon: 'Music' },
    { id: 'all', label: 'Všechny nástrojové skupiny', shortLabel: 'Všechny nástroje', icon: 'Sliders' }
  ], []);

  // Compute available subgroups for the active category
  const availableSubGroups = useMemo(() => {
    const relevantPresets = selectedCategory === 'all' 
      ? INSTRUMENT_PRESETS 
      : INSTRUMENT_PRESETS.filter(p => p.category === selectedCategory);
    
    const set = new Set<string>();
    relevantPresets.forEach(p => {
      set.add(getPresetSubGroup(p));
    });
    return Array.from(set);
  }, [selectedCategory]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubGroup('all');
    
    const matching = INSTRUMENT_PRESETS.filter(p => catId === 'all' || p.category === catId);
    if (matching.length > 0) {
      setSelectedPresetId(matching[0].id);
    }
  };

  const handleSubGroupChange = (subGroup: string) => {
    setSelectedSubGroup(subGroup);
    const matching = INSTRUMENT_PRESETS.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSub = subGroup === 'all' || getPresetSubGroup(p) === subGroup;
      return matchCat && matchSub;
    });
    if (matching.length > 0) {
      setSelectedPresetId(matching[0].id);
    }
  };

  const filteredPresets = useMemo(() => {
    return INSTRUMENT_PRESETS.filter(preset => {
      const matchesCat = selectedCategory === 'all' || preset.category === selectedCategory;
      const sub = getPresetSubGroup(preset);
      const matchesSub = selectedSubGroup === 'all' || sub === selectedSubGroup;
      
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q ||
        preset.name.toLowerCase().includes(q) ||
        preset.description.toLowerCase().includes(q) ||
        sub.toLowerCase().includes(q) ||
        preset.categoryLabel.toLowerCase().includes(q) ||
        preset.gate.model.toLowerCase().includes(q) ||
        preset.eq.model.toLowerCase().includes(q) ||
        preset.comp.model.toLowerCase().includes(q);
      
      return matchesCat && matchesSub && matchesQuery;
    });
  }, [selectedCategory, selectedSubGroup, searchQuery]);

  const currentPreset = useMemo(() => {
    return filteredPresets.find(p => p.id === selectedPresetId) || 
      filteredPresets[0] || 
      INSTRUMENT_PRESETS[0];
  }, [filteredPresets, selectedPresetId]);

  const currentPresetIndex = filteredPresets.findIndex(p => p.id === currentPreset.id);
  const safeCurrentIndex = currentPresetIndex >= 0 ? currentPresetIndex : 0;
  const prevPreset = safeCurrentIndex > 0 ? filteredPresets[safeCurrentIndex - 1] : null;
  const nextPreset = safeCurrentIndex < filteredPresets.length - 1 ? filteredPresets[safeCurrentIndex + 1] : null;

  const handlePresetNavigation = (presetId: string) => {
    setSelectedPresetId(presetId);
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight) for presets
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (nextPreset) {
          e.preventDefault();
          handlePresetNavigation(nextPreset.id);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (prevPreset) {
          e.preventDefault();
          handlePresetNavigation(prevPreset.id);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPreset, prevPreset]);

  const handleCopyPreset = (preset: InstrumentPreset) => {
    const textData = `=== ${consoleFullName} PRESET ===
Nástroj: ${preset.name} (${preset.categoryLabel})
Skupina: ${getPresetSubGroup(preset)}
Předzesilovač (${preampLabel}): +${preset.preampGain} dB | 48V: ${preset.phantomPower ? 'ON' : 'OFF'}
Vstup: ${preset.recommendedInput}
GATE: ${preset.gate.enabled ? `${preset.gate.model} (Thresh: ${preset.gate.threshold} dB, Ratio: ${preset.gate.ratio}, Att: ${preset.gate.attack}ms, Rel: ${preset.gate.release}ms)` : 'Bypass'}
EQ: ${preset.eq.model} (HPF: ${preset.eq.hpfFreq} Hz ${preset.eq.hpfSlope})
COMPRESSOR: ${preset.comp.model} (Thresh: ${preset.comp.threshold} dB, Ratio: ${preset.comp.ratio}, Att: ${preset.comp.attack}, Rel: ${preset.comp.release}, Make-up: +${preset.comp.makeUpGain} dB)
FX: ${preset.fx.primaryFX.model} (${preset.fx.primaryFX.slotType} -> ${preset.fx.primaryFX.busName || 'Insert'} @ ${preset.fx.primaryFX.sendLevelDb ?? 0} dB)
Tipy: ${preset.proTips.join(' | ')}`;

    navigator.clipboard.writeText(textData);
    setCopiedId(preset.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleSound = (type: 'sine' | 'noise') => {
    if (activeTestSound === type) {
      stopTestSignal();
      setActiveTestSound(null);
    } else {
      if (type === 'sine') {
        const testFreq = currentPreset.eq.hpfFreq ? currentPreset.eq.hpfFreq * 2 : 1000;
        playSineTone(Math.min(Math.max(testFreq, 200), 2000), 0.15);
      } else {
        playPinkNoise(0.12);
      }
      setActiveTestSound(type);
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Drum': return <Drum className="w-4 h-4" />;
      case 'Mic': return <Mic className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      case 'Volume2': return <Volume2 className="w-4 h-4" />;
      case 'Radio': return <Radio className="w-4 h-4" />;
      case 'Layers': return <Layers className="w-4 h-4" />;
      default: return <Music className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-5">
      {/* Primary Instrument Group Tabs (Directly at top, no redundant banners) */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-white/10 shadow-xl space-y-4">
        {/* Instrument Family selector */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => {
            const count = cat.id === 'all' 
              ? INSTRUMENT_PRESETS.length 
              : INSTRUMENT_PRESETS.filter(p => p.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-[#181818] text-gray-300 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[11px] font-mono px-1.5 py-0.2 rounded ${
                  isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-white/50'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Subgroups & Search Bar Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-3 border-t border-white/5">
          {/* Subgroup Filters */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-white/40 font-mono mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Podskupina:
            </span>
            <button
              onClick={() => handleSubGroupChange('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                selectedSubGroup === 'all'
                  ? 'bg-white/20 text-white font-bold border border-white/30'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
              }`}
            >
              Vše ({selectedCategory === 'all' ? INSTRUMENT_PRESETS.length : INSTRUMENT_PRESETS.filter(p => p.category === selectedCategory).length})
            </button>
            {availableSubGroups.map(sub => {
              const count = INSTRUMENT_PRESETS.filter(p => {
                const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
                return matchCat && getPresetSubGroup(p) === sub;
              }).length;
              const isSubSelected = selectedSubGroup === sub;
              return (
                <button
                  key={sub}
                  onClick={() => handleSubGroupChange(sub)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSubSelected
                      ? 'bg-white/20 text-white font-bold border border-white/30'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {sub} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Hledat nástroj, EQ, mikrofon..."
              className="w-full pl-9 pr-8 py-2 bg-black border border-white/10 rounded-xl text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-white/40 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Presets Split Layout */}
      <div className="flex flex-col md:flex-row gap-6 items-start relative">
        {/* Left Side: Preset Cards List */}
        <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 space-y-2 md:sticky md:top-[80px] md:h-[calc(100vh-100px)] overflow-y-auto pr-1">
          <div className="text-xs font-semibold text-white/50 uppercase tracking-wider px-1 flex items-center justify-between pb-1">
            <span>Nástroje v kategorii ({filteredPresets.length})</span>
            <span className="font-mono text-white/40">{consoleBadge}</span>
          </div>

          {filteredPresets.length === 0 ? (
            <div className="p-8 text-center bg-[#121212] border border-white/10 rounded-xl text-white/40 text-xs font-mono">
              Žádný nástroj neodpovídá zvolenému filtru.
            </div>
          ) : (
            (() => {
              // Group presets by primary category or subgroup
              const grouped = filteredPresets.reduce((acc, preset) => {
                const groupName = selectedCategory === 'all' ? preset.categoryLabel : getPresetSubGroup(preset);
                if (!acc[groupName]) acc[groupName] = [];
                acc[groupName].push(preset);
                return acc;
              }, {} as Record<string, InstrumentPreset[]>);

              return (Object.entries(grouped) as [string, InstrumentPreset[]][]).map(([groupName, presetsInGroup]) => (
                <div key={groupName} className="mb-4">
                  {/* Group Header */}
                  <div className="sticky top-0 z-10 bg-[#000000]/90 backdrop-blur-md px-2 py-1.5 mb-2 mt-2 border-l-2 border-cyan-500 font-bold text-[11px] uppercase tracking-wider text-white shadow-sm">
                    {groupName}
                  </div>
                  
                  <div className="space-y-2">
                    {presetsInGroup.map(preset => {
                      const isSelected = preset.id === currentPreset.id;
                      const sub = getPresetSubGroup(preset);
                      return (
                        <div
                          key={preset.id}
                          onClick={() => {
                            setSelectedPresetId(preset.id);
                            setIsDetailModalOpen(true);
                          }}
                          className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none text-left relative overflow-hidden group ${
                            isSelected
                              ? 'bg-[#1e1e1e] border-white/40 shadow-xl shadow-black/50'
                              : 'bg-[#121212] border-white/5 hover:bg-[#161616] hover:border-white/20'
                          }`}
                        >
                          {/* WING Scribble Strip mini color bar */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1"
                            style={{ backgroundColor: preset.tagColor }}
                          />

                          <div className="flex items-center justify-between mt-1">
                            <div className="flex items-center gap-3">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-inner shrink-0"
                                style={{ backgroundColor: `${preset.tagColor}30`, color: preset.tagColor }}
                              >
                                {getIconComponent(preset.icon)}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors">
                                  {preset.name}
                                </h4>
                                <span className="text-[11px] text-white/50">
                                  {sub}
                                </span>
                              </div>
                            </div>

                            <span className="text-[10px] font-mono px-2 py-0.5 bg-black/60 text-gray-300 rounded border border-white/10">
                              {preset.channelType.toUpperCase()}
                            </span>
                          </div>

                          <p className="text-xs text-gray-300 mt-2 line-clamp-2 leading-relaxed">
                            {preset.description}
                          </p>

                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 text-[11px] font-mono">
                            <div className="flex items-center gap-1.5 text-white/60 truncate mr-2">
                              <span className="text-white/80 font-medium">EQ: {preset.eq.model}</span>
                              <span className="text-white/20">•</span>
                              <span className="text-cyan-400 font-medium truncate">COMP: {preset.comp.model.split(' ')[0]}</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] text-cyan-400 font-sans font-semibold bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/25 shrink-0 group-hover:bg-cyan-500/20 group-hover:border-cyan-400 transition-all">
                              <Maximize2 className="w-2.5 h-2.5" />
                              <span>Nastavení</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ));
            })()
          )}
        </div>

        {/* Right Side: Channel Strip Inspector & Graphical Visualizers */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Main Channel Header Card */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-2xl relative overflow-hidden">
            {/* Top Color Accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{ backgroundColor: currentPreset.tagColor }}
            />

            {/* Quick Next/Prev Step Navigation Toolbar (Clean Dark Style) */}
            <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 flex items-center justify-between gap-3 mb-5">
              {prevPreset ? (
                <button
                  onClick={() => handlePresetNavigation(prevPreset.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all cursor-pointer border border-white/10 group"
                  title={`Předchozí: ${prevPreset.name}`}
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-white/60 transition-transform group-hover:-translate-x-0.5" />
                  <span className="hidden sm:inline">Předchozí: {prevPreset.name}</span>
                  <span className="sm:hidden">Předchozí</span>
                </button>
              ) : (
                <div className="px-3 py-1.5 text-xs text-white/30 font-mono">
                  První nástroj
                </div>
              )}

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-white/90 font-bold bg-white/10 px-3 py-1 rounded-full border border-white/15">
                  Nástroj {safeCurrentIndex + 1} / {filteredPresets.length}
                </span>
                <span className="hidden md:inline text-xs font-mono text-white/40">
                  ({getPresetSubGroup(currentPreset)})
                </span>
              </div>

              {nextPreset ? (
                <button
                  onClick={() => handlePresetNavigation(nextPreset.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 cursor-pointer group"
                  title={`Další: ${nextPreset.name}`}
                >
                  <span className="hidden sm:inline">Další: {nextPreset.name}</span>
                  <span className="sm:hidden">Další</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white/60 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <button
                  onClick={() => handlePresetNavigation(filteredPresets[0]?.id || INSTRUMENT_PRESETS[0].id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/20 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Od začátku</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mt-1 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3.5">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shadow-inner"
                  style={{ backgroundColor: `${currentPreset.tagColor}25`, color: currentPreset.tagColor }}
                >
                  {getIconComponent(currentPreset.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {currentPreset.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-black/60 text-white font-mono text-xs font-bold rounded-full border border-white/20">
                      {currentPreset.channelType.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    {currentPreset.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Pop-up modal button for tablet/full-screen detail */}
                <button
                  onClick={() => setIsDetailModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-600/25 hover:bg-cyan-600/40 text-cyan-300 border border-cyan-500/30 transition-all cursor-pointer active:scale-95 shadow-sm"
                  title="Otevřít podrobné doporučené nastavení v samostatném okně"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Doporučené nastavení</span>
                </button>

                {/* Audio Test button */}
                <button
                  onClick={() => handleToggleSound('sine')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                    activeTestSound === 'sine'
                      ? 'bg-emerald-500 text-black font-bold shadow-lg animate-pulse'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:text-white'
                  }`}
                  title="Spustit testovací tón pro kontrolu signálové cesty"
                >
                  {activeTestSound === 'sine' ? <Volume1 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5 text-white/40" />}
                  <span>{activeTestSound === 'sine' ? 'Hraje Tón' : 'Test Tón'}</span>
                </button>

                {/* Copy parameters */}
                <button
                  onClick={() => handleCopyPreset(currentPreset)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg text-xs transition-all border border-white/20 cursor-pointer"
                  title="Kopírovat kompletní nastavení parametrů"
                >
                  {copiedId === currentPreset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Zkopírováno!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Kopírovat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Hardware Preamplifier & Input Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 text-xs font-mono">
              <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">{preampLabel}</span>
                <span className="text-sm font-bold text-white">+{currentPreset.preampGain} dB</span>
              </div>
              <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">FANTOM +48V</span>
                <span className={`text-sm font-bold ${currentPreset.phantomPower ? 'text-red-400' : 'text-white/40'}`}>
                  {currentPreset.phantomPower ? 'AKTIVNÍ (+48V)' : 'VYPNUTO'}
                </span>
              </div>
              <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">HPF LOW-CUT</span>
                <span className="text-sm font-bold text-cyan-400">
                  {currentPreset.eq.hpfFreq ? `${currentPreset.eq.hpfFreq} Hz` : 'OFF'}
                </span>
              </div>
              <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                <span className="text-[10px] text-white/40 block uppercase">DOPORUČENÝ VSTUP</span>
                <span className="text-xs font-bold text-gray-200 truncate block">
                  {currentPreset.recommendedInput}
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Gate / Expander */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className={`w-2.5 h-2.5 rounded-full ${currentPreset.gate.enabled ? 'bg-emerald-400' : 'bg-white/20'}`} />
                <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                  1. Gate / Expander (Noise Suppression)
                </h4>
                <span className="px-2 py-0.5 bg-black text-white/80 font-mono text-[10px] font-bold rounded-full border border-white/20">
                  {currentPreset.gate.model}
                </span>
              </div>
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${
                currentPreset.gate.enabled ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30' : 'bg-white/5 text-white/40 border-white/10'
              }`}>
                {currentPreset.gate.enabled ? 'AKTIVNÍ' : 'BYPASS'}
              </span>
            </div>

            {currentPreset.gate.enabled ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-xs">
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">THRESHOLD</span>
                    <span className="text-white font-bold">{currentPreset.gate.threshold} dB</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RATIO</span>
                    <span className="text-white font-bold">{currentPreset.gate.ratio}</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">ATTACK</span>
                    <span className="text-white font-bold">{currentPreset.gate.attack} ms</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">HOLD</span>
                    <span className="text-white font-bold">{currentPreset.gate.hold} ms</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RELEASE</span>
                    <span className="text-white font-bold">{currentPreset.gate.release} ms</span>
                  </div>
                </div>

                {currentPreset.gate.keyFilter && (
                  <div className="text-[11px] font-mono text-cyan-300 bg-cyan-950/20 p-2.5 rounded-xl border border-cyan-500/30 flex items-center gap-2">
                    <span className="font-bold text-cyan-400 uppercase text-[10px]">Sidechain Key Filter:</span>
                    <span>{currentPreset.gate.keyFilter}</span>
                  </div>
                )}
                {currentPreset.gate.notes && (
                  <p className="text-[11px] text-gray-400 italic">
                    💡 {currentPreset.gate.notes}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-white/40 font-mono italic">
                Gate je pro tento nástroj vyřazen (Bypass), aby nedocházelo k ořezávání přirozených dozvuků.
              </p>
            )}
          </div>

          {/* Section 2: 6-Band Parametric / Vintage Equalizer */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                  2. Ekvalizér (6-Band Channel EQ)
                </h4>
                <span className="px-2.5 py-0.5 bg-black text-emerald-400 font-mono text-[10px] font-bold rounded-full border border-emerald-500/30">
                  {currentPreset.eq.model}
                </span>
              </div>
              <span className="text-xs font-mono text-white/50">
                Mix: <strong className="text-white">{currentPreset.eq.mix}%</strong>
              </span>
            </div>

            {/* Interactive Visual EQ Graph */}
            <VisualEQCurve
              bands={currentPreset.eq.bands}
              hpfFreq={currentPreset.eq.hpfFreq}
              hpfSlope={currentPreset.eq.hpfSlope}
              modelName={currentPreset.eq.model}
            />

            {currentPreset.eq.notes && (
              <p className="text-[11px] text-gray-300 bg-[#000000] p-3 rounded-xl border border-white/10 leading-relaxed">
                🎯 <strong className="text-white">Nastavení pásem:</strong> {currentPreset.eq.notes}
              </p>
            )}
          </div>

          {/* Section 3: Dynamics & Compressor */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                  3. Kompresor & Dynamika (Dynamics Slot)
                </h4>
                <span className="px-2.5 py-0.5 bg-black text-cyan-400 font-mono text-[10px] font-bold rounded-full border border-cyan-500/30">
                  {currentPreset.comp.model}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-500/30">
                AKTIVNÍ
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              {/* Transfer Graph & Meter (5 cols) */}
              <div className="md:col-span-5">
                <VisualCompTransfer comp={currentPreset.comp} />
              </div>

              {/* Numeric Parameter Breakdown & Notes (7 cols) */}
              <div className="md:col-span-7 space-y-2.5">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs">
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">THRESHOLD</span>
                    <span className="text-white font-bold">{currentPreset.comp.threshold} dB</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">RATIO</span>
                    <span className="text-white font-bold">{currentPreset.comp.ratio}</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-xl border border-white/10">
                    <span className="text-[9px] text-white/40 block uppercase">MAKE-UP GAIN</span>
                    <span className="text-emerald-400 font-bold">+{currentPreset.comp.makeUpGain} dB</span>
                  </div>
                </div>

                <p className="text-[11px] text-gray-300 bg-[#000000] p-3 rounded-xl border border-white/10 leading-relaxed">
                  ⚙️ <strong className="text-white">Chování kompresoru:</strong> {currentPreset.comp.notes}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: FX Rack Inserts & Bus Sends */}
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-wide text-white">
                4. Efektové sběrnice a inserty (FX Rack Routing)
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
              {/* Primary FX */}
              <div className="bg-[#000000] border border-white/10 p-3.5 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-white font-bold">
                    {currentPreset.fx.primaryFX.slotType === 'Insert' ? 'INSERT INS1' : currentPreset.fx.primaryFX.busName}
                  </span>
                  {currentPreset.fx.primaryFX.sendLevelDb !== undefined && (
                    <span className="text-emerald-400 font-bold">
                      {currentPreset.fx.primaryFX.sendLevelDb} dB
                    </span>
                  )}
                </div>
                <div className="text-white font-bold text-sm">
                  {currentPreset.fx.primaryFX.model}
                </div>
                {currentPreset.fx.primaryFX.decayOrTime && (
                  <div className="text-cyan-400 text-[11px]">
                    Decay / Time: {currentPreset.fx.primaryFX.decayOrTime}
                  </div>
                )}
                <div className="text-white/50 text-[10px] pt-1.5 border-t border-white/5">
                  {currentPreset.fx.primaryFX.keySettings}
                </div>
              </div>

              {/* Secondary FX if present */}
              {currentPreset.fx.secondaryFX ? (
                <div className="bg-[#000000] border border-white/10 p-3.5 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-white font-bold">
                      {currentPreset.fx.secondaryFX.slotType === 'Insert' ? 'INSERT INS2' : currentPreset.fx.secondaryFX.busName}
                    </span>
                    {currentPreset.fx.secondaryFX.sendLevelDb !== undefined && (
                      <span className="text-emerald-400 font-bold">
                        {currentPreset.fx.secondaryFX.sendLevelDb} dB
                      </span>
                    )}
                  </div>
                  <div className="text-white font-bold text-sm">
                    {currentPreset.fx.secondaryFX.model}
                  </div>
                  {currentPreset.fx.secondaryFX.decayOrTime && (
                    <div className="text-cyan-400 text-[11px]">
                      Decay / Time: {currentPreset.fx.secondaryFX.decayOrTime}
                    </div>
                  )}
                  <div className="text-white/50 text-[10px] pt-1.5 border-t border-white/5">
                    {currentPreset.fx.secondaryFX.keySettings}
                  </div>
                </div>
              ) : (
                <div className="bg-[#000000] border border-white/5 p-3.5 rounded-xl flex items-center justify-center text-white/30 text-xs italic">
                  Žádný sekundární efekt není vyžadován.
                </div>
              )}
            </div>
          </div>

          {/* Pro Sound Engineer Tips Box */}
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 mb-2.5 text-white">
              <Zap className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Zvukařské tipy pro Behringer WING Compact
              </h4>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {currentPreset.proTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2.5">
                  <span className="text-white/60 font-bold mt-0.5">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sequential Step Navigation Footer for Presets (Clean neutral dark style) */}
          <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            {prevPreset ? (
              <button
                onClick={() => handlePresetNavigation(prevPreset.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-all cursor-pointer group"
                title={`Předchozí: ${prevPreset.name}`}
              >
                <ArrowLeft className="w-4 h-4 text-white/60 group-hover:-translate-x-0.5 transition-transform" />
                <span>Předchozí: {prevPreset.name}</span>
              </button>
            ) : (
              <div />
            )}

            <div className="text-xs font-mono text-white/40">
              Nástroj {safeCurrentIndex + 1} / {filteredPresets.length}
            </div>

            {nextPreset ? (
              <button
                onClick={() => handlePresetNavigation(nextPreset.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20 cursor-pointer group"
                title={`Další: ${nextPreset.name}`}
              >
                <span>Další: {nextPreset.name}</span>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => handlePresetNavigation(filteredPresets[0]?.id || INSTRUMENT_PRESETS[0].id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Znovu od začátku</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pop-up modal with detailed recommended settings for Android tablet / mobile / desktop */}
      <PresetDetailModal
        preset={currentPreset}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onNext={nextPreset ? () => handlePresetNavigation(nextPreset.id) : undefined}
        onPrev={prevPreset ? () => handlePresetNavigation(prevPreset.id) : undefined}
        hasNext={Boolean(nextPreset)}
        hasPrev={Boolean(prevPreset)}
        currentIndex={safeCurrentIndex}
        totalCount={filteredPresets.length}
        copied={copiedId === currentPreset.id}
        onCopy={handleCopyPreset}
        activeTestSound={activeTestSound}
        onToggleSound={handleToggleSound}
        onSaveToScenes={onSaveToScenes}
        activeMixerId={activeMixerId}
      />
    </div>
  );
};
