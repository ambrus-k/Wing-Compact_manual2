import React, { useState, useRef } from 'react';
import { SavedScene, SceneChannelPatch } from '../types';
import { 
  parseUniversalMixerScene, 
  SAMPLE_UNIVERSAL_SCENES,
  ParseResult 
} from '../utils/universalSceneParser';
import { INITIAL_SCENES } from '../data/sampleScenes';
import { 
  Plus, 
  Upload, 
  FileText, 
  Radio, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Info, 
  X, 
  Sparkles, 
  ChevronRight, 
  Check,
  Cpu,
  Wifi,
  SlidersHorizontal,
  FolderOpen
} from 'lucide-react';

interface CreateSceneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSceneCreatedOrImported: (scene: SavedScene, importSourceInfo?: string) => void;
}

export const CreateSceneModal: React.FC<CreateSceneModalProps> = ({
  isOpen,
  onClose,
  onSceneCreatedOrImported
}) => {
  const [activeTab, setActiveTab] = useState<'import' | 'template'>('import');
  
  // Import state
  const [dragOver, setDragOver] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const [importResult, setImportResult] = useState<ParseResult | null>(null);
  const [customSceneName, setCustomSceneName] = useState('');
  const [parseError, setParseError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Template creation state
  const [newSceneName, setNewSceneName] = useState('');
  const [newSceneEnsemble, setNewSceneEnsemble] = useState('Rocková kapela');
  const [newSceneDesc, setNewSceneDesc] = useState('');
  const [newSceneTemplate, setNewSceneTemplate] = useState<string>('scene-rock-24ch');

  if (!isOpen) return null;

  const handleProcessFileContent = (content: string, fileName: string) => {
    setParseError(null);
    try {
      const result = parseUniversalMixerScene(content, fileName);
      setImportResult(result);
      setCustomSceneName(result.scene.name);
    } catch (err: any) {
      console.error('Chyba při parsování scény:', err);
      setParseError('Soubor se nepodařilo rozpoznat. Ujistěte se, že jde o platný formát pultu Behringer, Soundcraft nebo Mixing Station.');
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) handleProcessFileContent(text, file.name);
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) handleProcessFileContent(text, file.name);
      };
      reader.readAsText(file);
    }
  };

  const handleLoadSample = async (sample: typeof SAMPLE_UNIVERSAL_SCENES[0]) => {
    setLoadingSample(true);
    setParseError(null);
    try {
      if (sample.fetchUrl) {
        const res = await fetch(sample.fetchUrl);
        const text = await res.text();
        handleProcessFileContent(text, `${sample.title}.json`);
      } else if (sample.rawText) {
        handleProcessFileContent(sample.rawText, `${sample.title}`);
      }
    } catch (err: any) {
      console.error('Chyba při načítání vzorové scény:', err);
      setParseError('Chyba při stahování vzorové scény ze serveru.');
    } finally {
      setLoadingSample(false);
    }
  };

  const handleConfirmImport = () => {
    if (!importResult) return;
    const finalScene: SavedScene = {
      ...importResult.scene,
      name: customSceneName.trim() || importResult.scene.name
    };
    onSceneCreatedOrImported(
      finalScene, 
      `${importResult.detectedFormat} (${finalScene.channels?.length || 0} stop)`
    );
    onClose();
  };

  const handleCreateFromTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSceneName.trim()) return;

    if (newSceneTemplate === 'empty-clean') {
      const emptyScene: SavedScene = {
        id: `custom-scene-${Date.now()}`,
        name: newSceneName.trim(),
        type: 'snapshot',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['Vlastní', 'Čistá', newSceneEnsemble],
        description: newSceneDesc.trim() || `Čistá prázdná scéna (${newSceneEnsemble})`,
        favorite: true,
        channelCount: 16,
        scope: {
          channels: true,
          aux: true,
          buses: true,
          mains: true,
          matrix: true,
          eq: true,
          dyn: true,
          gate: true,
          fx: true,
          routing: true,
          dca: true,
          muteGroups: true
        },
        details: {
          targetEnsemble: newSceneEnsemble,
          faderLayerPreset: 'Custom Clean',
          mainFaderAssign: 'Main L/R',
          customControlsProfile: 'Custom',
          notes: newSceneDesc.trim() || 'Čistá scéna pro nové zapojení'
        },
        channels: Array.from({ length: 16 }, (_, i) => ({
          chNum: i + 1,
          name: `CH ${(i + 1).toString().padStart(2, '0')}`,
          sourceInput: `Local In ${i + 1} (XLR)`,
          gainDb: 24,
          phantom48V: false,
          phaseInvert: false,
          color: 'orange',
          icon: 'Music',
          faderDb: -60,
          pan: 0,
          muted: false,
          solo: false,
          gateOn: false,
          gateModel: 'Bypass',
          eqModel: '4-Band Parametric EQ',
          compOn: false,
          compModel: 'Bypass'
        })),
        buses: [
          { busNum: 1, name: 'Aux 1 (IEM)', isStereo: false, role: 'IEM Monitor', faderDb: 0, color: 'cyan', pan: 0 },
          { busNum: 2, name: 'Aux 2 (Wedge)', isStereo: false, role: 'Wedge Monitor', faderDb: 0, color: 'yellow', pan: 0 },
          { busNum: 3, name: 'FX 1 Hall', isStereo: false, role: 'FX Send', faderDb: 0, color: 'purple', pan: 0 }
        ],
        dcas: [
          { dcaNum: 1, name: 'DCA 1', color: 'orange', faderDb: 0, muted: false, memberChannels: 'CH 1-8' }
        ]
      };

      onSceneCreatedOrImported(emptyScene, 'Nová čistá scéna');
      onClose();
      return;
    }

    const baseTemplate = INITIAL_SCENES.find(s => s.id === newSceneTemplate) || INITIAL_SCENES[0];
    const newId = `custom-scene-${Date.now()}`;
    const newScene: SavedScene = {
      ...baseTemplate,
      id: newId,
      name: newSceneName.trim(),
      description: newSceneDesc.trim() || `Vlastní scéna (${newSceneEnsemble})`,
      favorite: true,
      details: {
        ...baseTemplate.details,
        targetEnsemble: newSceneEnsemble
      }
    };

    onSceneCreatedOrImported(newScene, `Vytvořeno ze šablony ${baseTemplate.name}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="p-4 sm:p-5 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-inner">
              <Plus className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  Vytvořit novou scénu / Importovat pult
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full border border-cyan-500/20 font-bold uppercase">
                  Centrální Import
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Jediné místo pro import souborů ze všech podporovaných pultů i tvorbu scén ze šablon.
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

        {/* Tab Switcher */}
        <div className="bg-[#181818] border-b border-white/10 px-5 pt-3 flex gap-4">
          <button
            onClick={() => setActiveTab('import')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'import'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>1. Importovat soubor mixpultu (WING, X32, Soundcraft, Mixing Station)</span>
          </button>

          <button
            onClick={() => setActiveTab('template')}
            className={`pb-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
              activeTab === 'template'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-white/50 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>2. Vytvořit ze šablony / čistou scénu</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {activeTab === 'import' && (
            <div className="space-y-5">
              {/* Supported Formats Banner */}
              <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/60 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Podporované konzole a formáty pro přímý import:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="font-bold text-amber-400 block text-[11px]">Behringer WING</span>
                    <span className="text-[10px] text-white/60 font-mono">.snap, .wingscene, JSON</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="font-bold text-sky-400 block text-[11px]">Behringer X32 / M32</span>
                    <span className="text-[10px] text-white/60 font-mono">.scn, OSC text, JSON</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="font-bold text-emerald-400 block text-[11px]">Soundcraft Ui Series</span>
                    <span className="text-[10px] text-white/60 font-mono">Ui24R / Ui16 (.show / dump)</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                    <span className="font-bold text-orange-400 block text-[11px]">Mixing Station</span>
                    <span className="text-[10px] text-white/60 font-mono">.ms, offline dump, JSON</span>
                  </div>
                </div>
              </div>

              {/* Drag and drop upload zone */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".snap,.scn,.wingscene,.ms,.show,.json,.txt"
                className="hidden"
                onChange={handleFileInputChange}
              />

              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2.5 ${
                  dragOver
                    ? 'border-cyan-400 bg-cyan-500/10 scale-[0.99]'
                    : 'border-white/15 bg-black/40 hover:bg-white/5 hover:border-white/30'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Přetáhněte sem soubor scény nebo klikněte pro výběr
                  </h4>
                  <p className="text-xs text-white/50 mt-0.5">
                    Podporovány: Behringer (.snap, .wingscene, .scn), Soundcraft (.show), Mixing Station (.ms, .json)
                  </p>
                </div>
                <button
                  type="button"
                  className="mt-1 px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/10"
                >
                  Vybrat soubor z počítače
                </button>
              </div>

              {parseError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs flex items-center gap-2">
                  <X className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{parseError}</span>
                </div>
              )}

              {/* Sample Files for 1-Click Testing */}
              <div className="space-y-2">
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/60">
                  Nebo otestujte načtení připravené reálné scény mixpultu:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SAMPLE_UNIVERSAL_SCENES.map(sample => (
                    <div
                      key={sample.id}
                      onClick={() => handleLoadSample(sample)}
                      className="p-3 rounded-xl bg-black/50 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer text-left flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                            sample.badgeColor === 'orange' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                            sample.badgeColor === 'amber' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                            sample.badgeColor === 'sky' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          }`}>
                            {sample.formatBadge}
                          </span>
                          <span className="text-[10px] text-white/40 font-mono">
                            {sample.consoleModel}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {sample.title}
                        </h5>
                        <p className="text-[11px] text-white/50 mt-0.5 line-clamp-1">
                          {sample.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-cyan-400 font-semibold">
                        <span>{loadingSample ? 'Načítání...' : 'Načíst do náhledu'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parsed Scene Preview Card */}
              {importResult && (
                <div className="bg-[#181818] border border-cyan-500/40 rounded-xl p-4 space-y-4 shadow-xl animate-fadeIn">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                        <h4 className="text-sm font-bold text-white">
                          Rozpoznán formát: <span className="text-cyan-300">{importResult.detectedFormat}</span>
                        </h4>
                      </div>
                      <p className="text-xs text-white/60">
                        Pult: <strong>{importResult.detectedModel}</strong> ({importResult.mixerBrand})
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-mono font-bold text-white">
                        {importResult.summary.channelsCount} stop
                      </span>
                      {importResult.summary.busesCount > 0 && (
                        <span className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-mono text-white/70">
                          {importResult.summary.busesCount} sběrnic
                        </span>
                      )}
                      {importResult.summary.dcasCount > 0 && (
                        <span className="px-2.5 py-1 bg-white/10 rounded-lg text-xs font-mono text-white/70">
                          {importResult.summary.dcasCount} DCA
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-white/60 block mb-1 text-xs font-bold">
                      Název importované scény v aplikaci:
                    </label>
                    <input
                      type="text"
                      value={customSceneName}
                      onChange={(e) => setCustomSceneName(e.target.value)}
                      className="w-full bg-black border border-white/15 rounded-xl px-3.5 py-2 text-white font-bold text-sm focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Channel Strip Preview Table */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">
                      Ukázka načtených kanálů (prvních 6 stop z {importResult.scene.channels?.length || 0}):
                    </div>
                    <div className="border border-white/10 rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-black/60 text-xs font-mono">
                      <table className="w-full text-left">
                        <thead className="bg-white/5 text-white/60 border-b border-white/10 text-[10px] uppercase">
                          <tr>
                            <th className="p-2">CH</th>
                            <th className="p-2">Nástroj</th>
                            <th className="p-2">Vstup</th>
                            <th className="p-2">Preamp Gain</th>
                            <th className="p-2">+48V</th>
                            <th className="p-2">DCA</th>
                            <th className="p-2">Fader</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-white/80">
                          {(importResult.scene.channels || []).slice(0, 8).map(ch => (
                            <tr key={ch.chNum} className="hover:bg-white/5">
                              <td className="p-2 font-bold text-cyan-400">{ch.chNum}</td>
                              <td className="p-2 font-semibold text-white">{ch.name}</td>
                              <td className="p-2 text-white/60 text-[11px]">{ch.sourceInput}</td>
                              <td className="p-2 text-emerald-400 font-bold">+{ch.gainDb} dB</td>
                              <td className="p-2">
                                {ch.phantom48V ? (
                                  <span className="text-red-400 font-bold px-1.5 py-0.5 bg-red-500/10 rounded text-[10px]">
                                    +48V
                                  </span>
                                ) : (
                                  <span className="text-white/30 text-[10px]">VYP</span>
                                )}
                              </td>
                              <td className="p-2 text-yellow-400 font-bold">
                                {ch.dcaGroup ? `DCA ${ch.dcaGroup}` : '-'}
                              </td>
                              <td className="p-2 font-bold">{ch.faderDb} dB</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Primary Import Button without direct AI trigger */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
                    <p className="text-xs text-white/50">
                      💡 Po načtení scény můžete spustit <strong>"🤖 Kontrola scény pomocí AI"</strong> v horní liště pultu.
                    </p>

                    <button
                      type="button"
                      onClick={handleConfirmImport}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Importovat a načíst scénu</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'template' && (
            <form onSubmit={handleCreateFromTemplate} className="space-y-4">
              <div className="bg-black/50 border border-white/10 rounded-xl p-3.5 space-y-1">
                <span className="text-xs font-bold text-white block">
                  Vytvoření nové scény ze zvukařské šablony nebo od nuly
                </span>
                <p className="text-xs text-white/50">
                  Zvolte si přednastavenou sestavu pro kapelu, orchestr nebo čistou scénu pro vlastní konfiguraci.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Název scény / kapely:</label>
                  <input
                    type="text"
                    required
                    placeholder="např. Jazz Quintet Live, Letní Festival 24ch"
                    value={newSceneName}
                    onChange={(e) => setNewSceneName(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-white/60 block mb-1 font-bold">Typ obsazení / Žánr:</label>
                    <select
                      value={newSceneEnsemble}
                      onChange={(e) => setNewSceneEnsemble(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Rocková kapela">Rocková kapela</option>
                      <option value="Popová kapela">Popová kapela</option>
                      <option value="Akustické trio / Folk">Akustické trio / Folk</option>
                      <option value="Dechový orchestr">Dechový orchestr</option>
                      <option value="Symfonický orchestr">Symfonický orchestr</option>
                      <option value="Pěvecký sbor & Kapela">Pěvecký sbor & Kapela</option>
                      <option value="Konferenční / Mluvené slovo">Konferenční / Mluvené slovo</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-white/60 block mb-1 font-bold">Výchozí konfigurace kanálů:</label>
                    <select
                      value={newSceneTemplate}
                      onChange={(e) => setNewSceneTemplate(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="scene-rock-24ch">Rocková sestava (24 kanálů)</option>
                      <option value="scene-pop-32ch">Pop / Modern Worship (32 kanálů)</option>
                      <option value="scene-orch-40ch">Symfonický orchestr (40 kanálů)</option>
                      <option value="scene-brass-18ch">Dechový orchestr (18 kanálů)</option>
                      <option value="scene-vocal-16ch">Pěvecký sbor (16 kanálů)</option>
                      <option value="empty-clean">Čistá prázdná scéna (16 kanálů od nuly)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-white/60 block mb-1 font-bold">Popis a poznámky k pódiu / rideru:</label>
                  <textarea
                    rows={3}
                    placeholder="např. Požadavky na IEM odposlechy, pódiové stageboxy, napájení..."
                    value={newSceneDesc}
                    onChange={(e) => setNewSceneDesc(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Zrušit
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-cyan-400 hover:bg-cyan-300 text-black rounded-xl text-xs font-bold cursor-pointer shadow-md shadow-cyan-500/20"
                >
                  Uložit a načíst scénu
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
