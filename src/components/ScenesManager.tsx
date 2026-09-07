import React, { useState, useEffect } from 'react';
import { SavedScene, SceneChannelPatch, SceneBusConfig, SceneDCAConfig, SceneFXSlot, SceneMatrixConfig } from '../types';
import { INITIAL_SCENES } from '../data/sampleScenes';
import { StageRiderPdfModal } from './StageRiderPdfModal';
import { 
  Layers, 
  Plus, 
  Bookmark, 
  BookmarkCheck, 
  Download, 
  Play, 
  Sliders, 
  Search,
  CheckCircle2,
  Volume2,
  FileSpreadsheet,
  HelpCircle,
  Usb,
  Sparkles,
  RefreshCw,
  Terminal,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Zap,
  FileText,
  Trash2,
  Copy,
  Edit3,
  Check,
  X,
  Music
} from 'lucide-react';

interface ScenesManagerProps {
  onOpenAppendix?: () => void;
  onNavigateToPreset?: (presetId: string) => void;
}

type SceneSubTab = 'patch' | 'mixer' | 'routing' | 'usb_guide';

// Intelligent channel-to-preset matcher
export const getPresetIdForChannel = (ch: SceneChannelPatch, ensemble?: string): string => {
  const name = ch.name.toLowerCase();
  const icon = ch.icon?.toLowerCase() || '';

  // Woodwinds
  if (name.includes('pikol') || name.includes('piccolo')) return 'ww-piccolo';
  if (name.includes('flétn') || name.includes('flute')) return 'ww-flute-concert';
  if (name.includes('hoboj') || name.includes('oboe')) return 'ww-oboe-solo';
  if (name.includes('anglický roh') || name.includes('cor anglais')) return 'ww-english-horn';
  if (name.includes('klarinet') || name.includes('clarinet')) return 'ww-clarinet-bb-a';
  if (name.includes('fagot') || name.includes('bassoon')) return 'ww-bassoon-solo';
  if (name.includes('sax') || name.includes('saxofon')) {
    if (name.includes('alt') || name.includes('alto')) return 'ww-sax-alto';
    if (name.includes('tenor')) return 'ww-sax-tenor';
    if (name.includes('baryton') || name.includes('baritone')) return 'ww-sax-baritone';
    return 'ww-sax-alto';
  }

  // Brass
  if (name.includes('trubk') || name.includes('trumpet')) return 'brass-trumpet-solo';
  if (name.includes('křídlovk') || name.includes('flugel')) return 'brass-flugelhorn';
  if (name.includes('kornet') || name.includes('cornet')) return 'brass-cornet';
  if (name.includes('lesní roh') || name.includes('french horn') || name.includes('horn')) return 'brass-french-horn-solo';
  if (name.includes('trombon') || name.includes('pozoun') || name.includes('tenor')) return 'brass-trombone-tenor';
  if (name.includes('baryton') || name.includes('euphonium')) return 'brass-baritone-euphonium';
  if (name.includes('tuba') || name.includes('heligon') || name.includes('sousaphone')) return 'brass-tuba-bass';

  // Strings
  if (name.includes('housle') || name.includes('violin')) return 'strings-violin-solo';
  if (name.includes('viola')) return 'strings-viola-solo';
  if (name.includes('violoncello') || name.includes('cello')) return 'strings-cello-solo';
  if (name.includes('kontrabas') || name.includes('double bass') || name.includes('contrabass')) return 'strings-contrabass-orchestral';
  if (name.includes('smyčc') || name.includes('string')) return 'strings-tutti-ensemble';

  // Harp
  if (name.includes('harf') || name.includes('harp')) return 'harp-concert-pedal-stereo';

  // Keyboards
  if (name.includes('klavír') || name.includes('piano') || name.includes('křídlo') || name.includes('pianino')) return 'keys-grand-piano-stereo';
  if (name.includes('varhany') || name.includes('organ') || name.includes('hammond')) return 'keys-hammond-b3-leslie';
  if (name.includes('rhodes') || name.includes('wurlitzer') || name.includes('clavinet')) return 'keys-rhodes-mk1';
  if (name.includes('akordeon') || name.includes('harmonika') || name.includes('heligonka')) return 'keys-accordion-classical';
  if (name.includes('synth') || name.includes('kláves')) return 'keys-analog-synth-poly';

  // Guitars & Bass
  if (name.includes('akust') || icon === 'acoustic') return 'guitars-acoustic-steel';
  if (name.includes('baskytara') || name.includes('basa') || name.includes('bass') || icon === 'bass') {
    if (name.includes('synth')) return 'keys-synth-bass';
    if (name.includes('slap')) return 'guitars-bass-slap';
    return 'guitars-bass-clean-di';
  }
  if (name.includes('mandol')) return 'guitars-mandolin';
  if (name.includes('banjo')) return 'guitars-banjo-5string';
  if (name.includes('ukulele')) return 'guitars-ukulele-concert';
  if (name.includes('gtr') || name.includes('kytar') || icon === 'guitar' || icon === 'amp') {
    if (name.includes('solo') || name.includes('lead')) return 'guitars-electric-lead';
    return 'guitars-electric-crunch';
  }

  // Drums & Percussion
  if (name.includes('kick') || name.includes('kopák') || name.includes('bd')) return 'drums-kick-in';
  if (name.includes('snare') || name.includes('virbl') || name.includes('sd')) return 'drums-snare-top';
  if (name.includes('hi-hat') || name.includes('hat') || icon === 'cymbal') return 'drums-hihat';
  if (name.includes('tom') || name.includes('floor') || name.includes('rack') || icon === 'tom') return 'drums-rack-tom';
  if (name.includes('overhead') || name.includes('oh') || name.includes('činel') || name.includes('ride')) return 'drums-overheads-pair';
  if (name.includes('timpani') || name.includes('kotle') || name.includes('tymp')) return 'drums-timpani-stereo';
  if (name.includes('xylophone') || name.includes('xylofon') || name.includes('marimba') || name.includes('vibrafon')) return 'drums-marimba-stereo';
  if (name.includes('conga') || name.includes('bongo') || name.includes('cajon') || name.includes('djembe') || name.includes('percussion') || name.includes('shaker')) return 'drums-cajon-acoustic';

  // Choirs
  if (name.includes('sbor') || name.includes('choir')) return 'choir-satb-mixed-stereo';

  // Vocals
  if (name.includes('lead') || name.includes('hlavní') || name.includes('frontman') || name.includes('zpěv')) {
    return ensemble?.includes('Pop') ? 'vocals-lead-female-pop' : 'vocals-lead-male-pop-rock';
  }
  if (name.includes('backing') || name.includes('bv') || name.includes('vokál') || name.includes('vox') || name.includes('harmonie')) return 'vocals-backing-male';
  if (name.includes('spoken') || name.includes('moderátor') || name.includes('host') || name.includes('speech')) return 'vocals-spoken-moderator';

  // Fallbacks by icon
  if (icon === 'mic') return 'vocals-lead-male-pop-rock';
  if (icon === 'drum') return 'drums-kick-in';
  return 'guitars-acoustic-steel';
};

// Helper to guarantee rich channels and sub-arrays are never lost from cache
const sanitizeScenes = (stored: any[]): SavedScene[] => {
  if (!Array.isArray(stored) || stored.length === 0) {
    return INITIAL_SCENES;
  }
  return stored.map(s => {
    const defaultScene = INITIAL_SCENES.find(ds => ds.id === s.id) || INITIAL_SCENES[0];
    const channels = (Array.isArray(s.channels) && s.channels.length > 0) ? s.channels : defaultScene.channels;
    const buses = (Array.isArray(s.buses) && s.buses.length > 0) ? s.buses : defaultScene.buses;
    const dcas = (Array.isArray(s.dcas) && s.dcas.length > 0) ? s.dcas : defaultScene.dcas;
    const fxSlots = (Array.isArray(s.fxSlots) && s.fxSlots.length > 0) ? s.fxSlots : defaultScene.fxSlots;
    const matrices = (Array.isArray(s.matrices) && s.matrices.length > 0) ? s.matrices : defaultScene.matrices;

    return {
      ...defaultScene,
      ...s,
      channels: channels || [],
      buses: buses || [],
      dcas: dcas || [],
      fxSlots: fxSlots || [],
      matrices: matrices || []
    };
  });
};

export const ScenesManager: React.FC<ScenesManagerProps> = ({ onOpenAppendix, onNavigateToPreset }) => {
  const [scenes, setScenes] = useState<SavedScene[]>(() => {
    try {
      const saved = localStorage.getItem('wing_user_scenes_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeScenes(parsed);
      }
      return INITIAL_SCENES;
    } catch {
      return INITIAL_SCENES;
    }
  });

  const [selectedSceneId, setSelectedSceneId] = useState<string>(() => {
    return INITIAL_SCENES[0].id;
  });
  const [activeSubTab, setActiveSubTab] = useState<SceneSubTab>('patch');
  const [recalledSuccess, setRecalledSuccess] = useState<boolean>(false);
  const [oscLog, setOscLog] = useState<string[]>([]);
  const [channelSearch, setChannelSearch] = useState('');
  const [channelFilter, setChannelFilter] = useState<'all' | 'drums' | 'guitars' | 'vocals' | 'dca'>('all');

  // Modals state
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [showCreateSceneModal, setShowCreateSceneModal] = useState(false);
  const [showAddChannelModal, setShowAddChannelModal] = useState(false);
  const [editingChannel, setEditingChannel] = useState<SceneChannelPatch | null>(null);

  // New Scene Form State
  const [newSceneName, setNewSceneName] = useState('');
  const [newSceneEnsemble, setNewSceneEnsemble] = useState('Rocková kapela');
  const [newSceneDesc, setNewSceneDesc] = useState('');
  const [newSceneTemplate, setNewSceneTemplate] = useState<string>('scene-rock-24ch');

  // New / Edit Channel Form State
  const [channelFormChNum, setChannelFormChNum] = useState(1);
  const [channelFormName, setChannelFormName] = useState('');
  const [channelFormInput, setChannelFormInput] = useState('Local In 1 (XLR)');
  const [channelFormGain, setChannelFormGain] = useState(28);
  const [channelForm48V, setChannelForm48V] = useState(false);
  const [channelFormPhase, setChannelFormPhase] = useState(false);
  const [channelFormGateOn, setChannelFormGateOn] = useState(true);
  const [channelFormGateModel, setChannelFormGateModel] = useState('WING Gate/Exp');
  const [channelFormEqModel, setChannelFormEqModel] = useState('WING 6-Band PEQ');
  const [channelFormCompOn, setChannelFormCompOn] = useState(true);
  const [channelFormCompModel, setChannelFormCompModel] = useState('1176 FET Comp');
  const [channelFormDca, setChannelFormDca] = useState<number | undefined>(undefined);
  const [channelFormFader, setChannelFormFader] = useState(0);
  const [channelFormColor, setChannelFormColor] = useState('orange');

  // Virtual Mixer State
  const [activeFaderBank, setActiveFaderBank] = useState<'bank1' | 'bank2' | 'bank3'>('bank1');
  const [sendsOnFaderBus, setSendsOnFaderBus] = useState<number | null>(null);
  const [selectedChannelForDetail, setSelectedChannelForDetail] = useState<SceneChannelPatch | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('wing_user_scenes_v4', JSON.stringify(scenes));
    } catch (e) {
      console.warn('Failed to save scenes:', e);
    }
  }, [scenes]);

  const currentScene = scenes.find(s => s.id === selectedSceneId) || scenes[0] || INITIAL_SCENES[0];
  const safeChannels: SceneChannelPatch[] = currentScene.channels && currentScene.channels.length > 0 
    ? currentScene.channels 
    : (INITIAL_SCENES.find(s => s.id === currentScene.id)?.channels || INITIAL_SCENES[0].channels || []);

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setScenes(prev => prev.map(s => s.id === id ? { ...s, favorite: !s.favorite } : s));
  };

  const handleResetToFactory = () => {
    localStorage.removeItem('wing_user_scenes');
    localStorage.removeItem('wing_user_scenes_v2');
    localStorage.removeItem('wing_user_scenes_v3');
    localStorage.removeItem('wing_user_scenes_v4');
    setScenes(INITIAL_SCENES);
    setSelectedSceneId(INITIAL_SCENES[0].id);
    setRecalledSuccess(true);
    setOscLog([
      `[SYSTEM] Tovární scény WING úspěšně obnoveny.`,
      `[OSC] /scene/load "Rock Fest 24ch"`,
      `[DSP] 24 Midas Preamps OK • 16 Mix Buses OK • 8 FX OK`
    ]);
    setTimeout(() => setRecalledSuccess(false), 2500);
  };

  const handleRecallScene = () => {
    setRecalledSuccess(true);

    const logs = [
      `[OSC UDP 2223] /show/snapshot/recall "${currentScene.name}"`,
      `[PREAMP] Načítání ${safeChannels.length} Midas analogových gainů a +48V...`,
      `[DSP] EQ a dynamické křivky aplikovány pro ${safeChannels.length} stop`,
      `[BUS] 16x Mix Sběrnic naladěno (IEM & Odposlechy)`,
      `[FX] 8x FX Racků inicializováno (${currentScene.fxSlots?.[0]?.model || 'VSS3'})`,
      `[FADERS] Motorizované fadery zarovnány na cílové dB hodnoty`,
      `[STATUS] Scéna "${currentScene.name}" je AKTIVNÍ v mixu!`
    ];
    setOscLog(logs);

    setTimeout(() => {
      setRecalledSuccess(false);
    }, 3000);
  };

  const handleGoToPreset = (ch: SceneChannelPatch) => {
    if (!onNavigateToPreset) return;
    const targetPresetId = getPresetIdForChannel(ch, currentScene.details?.targetEnsemble);
    onNavigateToPreset(targetPresetId);
  };

  const handleExportStagePatchCsv = () => {
    if (!safeChannels || safeChannels.length === 0) return;
    
    let csv = "CH#,NAZEV_NASTROJE,VSTUP_KONEKTOR,GAIN_MIDAS,48V_PHANTOM,FAZE,GATE,EQ_MODEL,KOMPRESOR,DCA,FADER_DB,PAN\n";
    safeChannels.forEach(ch => {
      csv += `${ch.chNum},"${ch.name}","${ch.sourceInput}","+${ch.gainDb} dB",${ch.phantom48V ? 'ANO (+48V)' : 'NE'},${ch.phaseInvert ? 'OTOCENA (180°)' : 'NORMALNI'},"${ch.gateModel}","${ch.eqModel}","${ch.compModel}","DCA ${ch.dcaGroup || '-'}",${ch.faderDb} dB,${ch.pan}\n`;
    });

    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `WING_Podiovy_Rider_${currentScene.name.replace(/[^a-zA-Z0-9]/g, '_')}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleExportWingSnapText = () => {
    let snapText = `# BEHRINGER WING COMPACT SNAPSHOT FILE\n# Scena: ${currentScene.name}\n# Obsazeni: ${currentScene.details?.targetEnsemble || 'Live'}\n# Exportovano z Behringer WING Digital Manual & Toolkit\n\n`;
    
    snapText += `[CHANNELS_INPUT_PATCH]\n`;
    safeChannels.forEach(ch => {
      snapText += `/ch/${ch.chNum}/config/name "${ch.name}"\n`;
      snapText += `/ch/${ch.chNum}/in/source "${ch.sourceInput}"\n`;
      snapText += `/ch/${ch.chNum}/preamp/gain ${ch.gainDb}.0\n`;
      snapText += `/ch/${ch.chNum}/preamp/48v ${ch.phantom48V ? 1 : 0}\n`;
      snapText += `/ch/${ch.chNum}/fader ${ch.faderDb}\n`;
      snapText += `/ch/${ch.chNum}/pan ${ch.pan}\n`;
    });

    snapText += `\n[BUS_CONFIG]\n`;
    (currentScene.buses || []).forEach(b => {
      snapText += `/bus/${b.busNum}/config/name "${b.name}"\n`;
      snapText += `/bus/${b.busNum}/fader ${b.faderDb}\n`;
    });

    const dataStr = "data:text/plain;charset=utf-8," + encodeURIComponent(snapText);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${currentScene.id}.snap`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Create new scene
  const handleCreateScene = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSceneName.trim()) return;

    const baseTemplate = INITIAL_SCENES.find(s => s.id === newSceneTemplate) || INITIAL_SCENES[0];
    const newId = `custom-scene-${Date.now()}`;
    const newScene: SavedScene = {
      ...baseTemplate,
      id: newId,
      name: newSceneName.trim(),
      description: newSceneDesc.trim() || `Vlastní scéna pro pult WING (${newSceneEnsemble})`,
      favorite: true,
      details: {
        ...baseTemplate.details,
        targetEnsemble: newSceneEnsemble
      }
    };

    setScenes(prev => [newScene, ...prev]);
    setSelectedSceneId(newId);
    setShowCreateSceneModal(false);
    setNewSceneName('');
    setNewSceneDesc('');
    setOscLog([`[SYSTEM] Vytvořena nová vlastní scéna "${newScene.name}" s ${newScene.channels.length} kanály.`]);
  };

  // Duplicate current scene
  const handleDuplicateScene = () => {
    const newId = `custom-scene-${Date.now()}`;
    const clonedScene: SavedScene = {
      ...currentScene,
      id: newId,
      name: `${currentScene.name} (Kopie)`,
      favorite: true
    };
    setScenes(prev => [clonedScene, ...prev]);
    setSelectedSceneId(newId);
    setOscLog([`[SYSTEM] Scéna duplikována jako "${clonedScene.name}".`]);
  };

  // Delete scene
  const handleDeleteScene = (sceneId: string) => {
    if (scenes.length <= 1) return;
    setScenes(prev => prev.filter(s => s.id !== sceneId));
    if (selectedSceneId === sceneId) {
      setSelectedSceneId(scenes.find(s => s.id !== sceneId)?.id || INITIAL_SCENES[0].id);
    }
  };

  // Add / Edit Channel
  const openAddChannelModal = () => {
    const nextChNum = safeChannels.length > 0 ? Math.max(...safeChannels.map(c => c.chNum)) + 1 : 1;
    setChannelFormChNum(nextChNum);
    setChannelFormName(`Nástroj ${nextChNum}`);
    setChannelFormInput(`Local In ${nextChNum <= 24 ? nextChNum : 1} (XLR)`);
    setChannelFormGain(26);
    setChannelForm48V(false);
    setChannelFormPhase(false);
    setChannelFormGateOn(true);
    setChannelFormGateModel('WING Gate/Exp');
    setChannelFormEqModel('WING 6-Band PEQ');
    setChannelFormCompOn(true);
    setChannelFormCompModel('1176 FET Comp');
    setChannelFormDca(undefined);
    setChannelFormFader(0);
    setChannelFormColor('orange');
    setShowAddChannelModal(true);
  };

  const openEditChannelModal = (ch: SceneChannelPatch) => {
    setEditingChannel(ch);
    setChannelFormChNum(ch.chNum);
    setChannelFormName(ch.name);
    setChannelFormInput(ch.sourceInput);
    setChannelFormGain(ch.gainDb);
    setChannelForm48V(ch.phantom48V);
    setChannelFormPhase(ch.phaseInvert);
    setChannelFormGateOn(ch.gateOn);
    setChannelFormGateModel(ch.gateModel);
    setChannelFormEqModel(ch.eqModel);
    setChannelFormCompOn(ch.compOn);
    setChannelFormCompModel(ch.compModel);
    setChannelFormDca(ch.dcaGroup);
    setChannelFormFader(ch.faderDb);
    setChannelFormColor(ch.color || 'orange');
    setShowAddChannelModal(true);
  };

  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!channelFormName.trim()) return;

    const newChannelPatch: SceneChannelPatch = {
      chNum: channelFormChNum,
      name: channelFormName.trim(),
      sourceInput: channelFormInput,
      gainDb: channelFormGain,
      phantom48V: channelForm48V,
      phaseInvert: channelFormPhase,
      gateOn: channelFormGateOn,
      gateModel: channelFormGateModel,
      eqModel: channelFormEqModel,
      compOn: channelFormCompOn,
      compModel: channelFormCompModel,
      dcaGroup: channelFormDca ? Number(channelFormDca) : undefined,
      faderDb: channelFormFader,
      pan: 0,
      muted: editingChannel ? editingChannel.muted : false,
      solo: editingChannel ? editingChannel.solo : false,
      color: channelFormColor,
      icon: 'Music'
    };

    setScenes(prev => prev.map(s => {
      if (s.id === currentScene.id) {
        let updatedChannels: SceneChannelPatch[];
        if (editingChannel) {
          updatedChannels = s.channels.map(c => c.chNum === editingChannel.chNum ? newChannelPatch : c);
        } else {
          updatedChannels = [...s.channels, newChannelPatch].sort((a, b) => a.chNum - b.chNum);
        }
        return { ...s, channels: updatedChannels };
      }
      return s;
    }));

    setShowAddChannelModal(false);
    setEditingChannel(null);
    setOscLog([`[SYSTEM] Kanál CH ${newChannelPatch.chNum} (${newChannelPatch.name}) byl úspěšně uložen.`]);
  };

  const handleDeleteChannel = (chNum: number) => {
    setScenes(prev => prev.map(s => {
      if (s.id === currentScene.id) {
        return { ...s, channels: s.channels.filter(c => c.chNum !== chNum) };
      }
      return s;
    }));
    if (selectedChannelForDetail?.chNum === chNum) {
      setSelectedChannelForDetail(null);
    }
  };

  const handleFaderChange = (chNum: number, newFaderDb: number) => {
    setScenes(prev => prev.map(s => {
      if (s.id === currentScene.id) {
        const updatedChannels = safeChannels.map(c => c.chNum === chNum ? { ...c, faderDb: newFaderDb } : c);
        return { ...s, channels: updatedChannels };
      }
      return s;
    }));
  };

  const handleMuteToggle = (chNum: number) => {
    setScenes(prev => prev.map(s => {
      if (s.id === currentScene.id) {
        const updatedChannels = safeChannels.map(c => c.chNum === chNum ? { ...c, muted: !c.muted } : c);
        return { ...s, channels: updatedChannels };
      }
      return s;
    }));
  };

  const handleSoloToggle = (chNum: number) => {
    setScenes(prev => prev.map(s => {
      if (s.id === currentScene.id) {
        const updatedChannels = safeChannels.map(c => c.chNum === chNum ? { ...c, solo: !c.solo } : c);
        return { ...s, channels: updatedChannels };
      }
      return s;
    }));
  };

  // Filter channels in table
  const filteredChannels = safeChannels.filter(ch => {
    const matchesSearch = ch.name.toLowerCase().includes(channelSearch.toLowerCase()) ||
                          ch.sourceInput.toLowerCase().includes(channelSearch.toLowerCase()) ||
                          ch.eqModel.toLowerCase().includes(channelSearch.toLowerCase()) ||
                          ch.compModel.toLowerCase().includes(channelSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (channelFilter === 'drums') return ch.icon === 'Drum' || ch.icon === 'Cymbal' || ch.icon === 'Tom' || ch.name.toLowerCase().includes('kick') || ch.name.toLowerCase().includes('snare');
    if (channelFilter === 'guitars') return ch.icon === 'Guitar' || ch.icon === 'Bass' || ch.icon === 'Acoustic' || ch.icon === 'Amp' || ch.name.toLowerCase().includes('gtr') || ch.name.toLowerCase().includes('basa');
    if (channelFilter === 'vocals') return ch.icon === 'Mic' || ch.name.toLowerCase().includes('vox') || ch.name.toLowerCase().includes('zpěv') || ch.name.toLowerCase().includes('sbor');
    if (channelFilter === 'dca') return Boolean(ch.dcaGroup);
    return true;
  });

  // Channels for active fader bank
  const getFaderBankChannels = () => {
    if (activeFaderBank === 'bank1') return safeChannels.filter(c => c.chNum >= 1 && c.chNum <= 12);
    if (activeFaderBank === 'bank2') return safeChannels.filter(c => c.chNum >= 13 && c.chNum <= 24);
    if (activeFaderBank === 'bank3') return safeChannels.filter(c => c.chNum >= 25 && c.chNum <= 36);
    return safeChannels.slice(0, 12);
  };

  const activeBankChannels = getFaderBankChannels();

  const currentSceneIndex = scenes.findIndex(s => s.id === currentScene.id);
  const safeSceneIndex = currentSceneIndex >= 0 ? currentSceneIndex : 0;
  const prevScene = safeSceneIndex > 0 ? scenes[safeSceneIndex - 1] : null;
  const nextScene = safeSceneIndex < scenes.length - 1 ? scenes[safeSceneIndex + 1] : null;

  const handleSceneNavigation = (sceneId: string) => {
    setSelectedSceneId(sceneId);
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      setOscLog([`[OSC] Výběr scény: "${scene.name}"`]);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* 1. Explanatory Concept Header & Scene Selector */}
      <div className="bg-[#121212] p-5 rounded-2xl border border-white/10 shadow-2xl space-y-4">
        {/* Quick Scene Next/Prev Navigation Toolbar */}
        <div className="bg-black/60 p-2.5 rounded-xl border border-white/10 flex items-center justify-between gap-2">
          {prevScene ? (
            <button
              onClick={() => handleSceneNavigation(prevScene.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-medium transition-all cursor-pointer border border-white/10 group"
              title={`Předchozí: ${prevScene.name}`}
            >
              <ChevronLeft className="w-4 h-4 text-cyan-400 transition-transform group-hover:-translate-x-0.5" />
              <span className="hidden sm:inline text-[11px]">Předchozí: {prevScene.name}</span>
              <span className="sm:hidden text-[11px]">Zpět</span>
            </button>
          ) : (
            <div className="px-3 py-1.5 text-[11px] text-white/30 font-mono">
              První scéna
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
              Scéna {safeSceneIndex + 1} z {scenes.length}
            </span>
            <span className="hidden md:inline text-[10px] font-mono text-white/40">
              ({currentScene.name})
            </span>
          </div>

          {nextScene ? (
            <button
              onClick={() => handleSceneNavigation(nextScene.id)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer group"
              title={`Další: ${nextScene.name}`}
            >
              <span className="hidden sm:inline text-[11px]">Další: {nextScene.name}</span>
              <span className="sm:hidden text-[11px]">Další</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          ) : (
            <button
              onClick={() => handleSceneNavigation(scenes[0]?.id || INITIAL_SCENES[0].id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#AEEA00] hover:bg-[#bcf218] text-black text-xs font-bold transition-all shadow-md shadow-[#AEEA00]/20 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="text-[11px]">Od začátku</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/20 shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  Kompletní Scény & Vlastní Tvorba (Scenes & Stage Rider Hub)
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#AEEA00]/10 text-[#AEEA00] border border-[#AEEA00]/20 rounded-full font-bold">
                  {scenes.length} Sestav
                </span>
              </div>
              <p className="text-xs text-white/50 mt-0.5">
                Vytvářejte vlastní scény, přidávejte kanály a exportujte je jako <strong>přehledný PDF Stage Rider</strong> nebo soubor pro USB pultu WING.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowCreateSceneModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-bold transition-all shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>+ Vytvořit novou scénu</span>
            </button>

            <button
              onClick={handleResetToFactory}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              title="Obnovit tovární scény WING"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#AEEA00]" />
              <span>Reset</span>
            </button>

            {onOpenAppendix && (
              <button
                onClick={onOpenAppendix}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Příloha</span>
              </button>
            )}
          </div>
        </div>

        {/* Scene Selection Cards Grid */}
        <div className="pt-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-white/60 mb-2">
            Vyberte scénu:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
            {scenes.map(scene => {
              const isSelected = scene.id === currentScene.id;
              const chCount = scene.channels?.length || (INITIAL_SCENES.find(ds => ds.id === scene.id)?.channels?.length) || 24;
              return (
                <div
                  key={scene.id}
                  onClick={() => {
                    setSelectedSceneId(scene.id);
                    setOscLog([`[OSC] Výběr scény: "${scene.name}" (${chCount} kanálů)`]);
                  }}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative text-left ${
                    isSelected
                      ? 'bg-[#1e1e1e] border-cyan-400 ring-1 ring-cyan-400/50 shadow-lg shadow-black'
                      : 'bg-black/60 border-white/5 hover:bg-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-cyan-400 text-black' : 'bg-white/10 text-white/70'
                    }`}>
                      {chCount} CH
                    </span>
                    <button
                      onClick={(e) => handleToggleFavorite(scene.id, e)}
                      className="p-0.5 text-white/40 hover:text-amber-400 cursor-pointer"
                    >
                      {scene.favorite ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-2 truncate font-sans">
                    {scene.name}
                  </h4>
                  <p className="text-[10px] text-white/50 mt-0.5 line-clamp-1">
                    {scene.details?.targetEnsemble || 'Live Setup'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Active Scene Banner & Interactive Recall / Export Action Bar */}
      <div className="bg-[#161616] p-4 rounded-2xl border border-white/10 shadow-xl flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h3 className="text-base font-bold text-white">
              Aktivní scéna: <span className="text-white font-extrabold">{currentScene.name}</span>
            </h3>
            <span className="text-[10px] px-2 py-0.5 bg-white/10 text-white/80 rounded font-mono font-bold">
              {safeChannels.length} Vstupů
            </span>
          </div>
          <p className="text-xs text-white/60">
            {currentScene.description}
          </p>
        </div>

        {/* Big Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Recall Scene */}
          <button
            onClick={handleRecallScene}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs font-mono transition-all cursor-pointer ${
              recalledSuccess
                ? 'bg-emerald-400 text-black shadow-lg shadow-emerald-400/30 animate-pulse'
                : 'bg-white hover:bg-gray-200 text-black shadow-md'
            }`}
          >
            {recalledSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>SCÉNA VYVOLÁNA!</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-black" />
                <span>VYVOLAT VIRTUÁLNĚ</span>
              </>
            )}
          </button>

          {/* PDF Stage Rider Reader Generator Button */}
          <button
            onClick={() => setIsPdfModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-red-900/30 transition-all cursor-pointer"
            title="Otevřít a stáhnout přehledný tištěný Stage Rider v PDF"
          >
            <FileText className="w-4 h-4" />
            <span>Exportovat PDF Rider</span>
          </button>

          {/* CSV Download */}
          <button
            onClick={handleExportStagePatchCsv}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-black hover:bg-white/10 text-cyan-300 border border-cyan-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Stáhnout tabulku CSV"
          >
            <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
            <span>CSV Rider</span>
          </button>

          {/* USB .snap */}
          <button
            onClick={handleExportWingSnapText}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-black hover:bg-white/10 text-white border border-white/10 rounded-xl text-xs font-semibold transition-all cursor-pointer"
            title="Stáhnout pro USB disk pultu WING"
          >
            <Usb className="w-4 h-4 text-cyan-400" />
            <span>.snap soubor</span>
          </button>

          {/* Duplicate */}
          <button
            onClick={handleDuplicateScene}
            className="p-2.5 bg-black hover:bg-white/10 text-white/60 hover:text-white border border-white/10 rounded-xl transition-all cursor-pointer"
            title="Duplikovat tuto scénu"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* Delete Scene (if not the only one) */}
          {scenes.length > 1 && (
            <button
              onClick={() => handleDeleteScene(currentScene.id)}
              className="p-2.5 bg-black hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30 rounded-xl transition-all cursor-pointer"
              title="Smazat tuto scénu"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* OSC Console & Live Status Feedback */}
      {oscLog.length > 0 && (
        <div className="bg-black/90 border border-white/10 rounded-xl p-3 text-xs font-mono space-y-1">
          <div className="flex items-center justify-between text-white/50 text-[10px] uppercase font-bold border-b border-white/10 pb-1">
            <span className="flex items-center gap-1.5 text-[#AEEA00]">
              <Terminal className="w-3.5 h-3.5" />
              <span>Stav vyvolání scény & OSC komunikace (UDP 2223)</span>
            </span>
            <button onClick={() => setOscLog([])} className="text-white/30 hover:text-white cursor-pointer">✕ Skrýt log</button>
          </div>
          <div className="space-y-0.5 text-white/80 pt-1 max-h-24 overflow-y-auto">
            {oscLog.map((log, i) => (
              <div key={i} className="text-[11px] flex items-center gap-2">
                <span className="text-cyan-400">❯</span>
                <span>{log}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Detail View Sub-Tabs (Patch, Fader Mixer, Routing & USB Guide) */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'patch', label: `📋 1. Pódiový seznam & Zapojení (${safeChannels.length} kanálů)` },
              { id: 'mixer', label: '🎚️ 2. Rozložení mixu (12 Fader Deck)' },
              { id: 'routing', label: '🔊 3. Odposlechy, DCA & Efekty' },
              { id: 'usb_guide', label: '💾 4. Návod: Jak nahrát do pultu' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as SceneSubTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeSubTab === tab.id
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-[#121212] text-gray-300 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeSubTab === 'patch' && (
            <button
              onClick={openAddChannelModal}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#AEEA00] hover:bg-[#bbf41b] text-black rounded-xl text-xs font-bold shadow-md shadow-[#AEEA00]/20 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Přidat kanál / nástroj</span>
            </button>
          )}
        </div>

        {/* ========================================================================= */}
        {/* SUB-TAB 1: INPUT PATCH LIST (Clear, Practical Stage Sheet with All Rows)   */}
        {/* ========================================================================= */}
        {activeSubTab === 'patch' && (
          <div className="space-y-3">
            {/* Info notice explaining direct preset navigation & PDF export */}
            <div className="bg-[#141414] p-3.5 rounded-xl border border-white/10 text-xs text-white/70 flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  <strong>Tip pro zvukaře:</strong> Můžete upravovat libovolný řádek (Gain, +48V, EQ, kompresor), přidávat nové stopy tlačítkem <strong>„+ Přidat kanál“</strong> a kliknutím na <strong>„Plné nastavení parametrů ➜“</strong> přejít přímo do Knihovny Presetů.
                </span>
              </span>

              <button
                onClick={() => setIsPdfModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600/20 hover:bg-red-600/40 text-red-300 border border-red-500/30 rounded-lg text-xs font-bold transition-all cursor-pointer shrink-0"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Náhled PDF Rideru</span>
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-[#121212] p-3.5 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl">
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                <span className="text-[10px] font-mono text-white/50 uppercase font-bold mr-1">Filtr:</span>
                {[
                  { id: 'all', label: 'Všechny stopy' },
                  { id: 'drums', label: 'Bicí sekce' },
                  { id: 'guitars', label: 'Kytary & Basa' },
                  { id: 'vocals', label: 'Vokály' },
                  { id: 'dca', label: 'V DCA skupině' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setChannelFilter(f.id as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      channelFilter === f.id
                        ? 'bg-cyan-400 text-black font-bold'
                        : 'bg-black text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  value={channelSearch}
                  onChange={(e) => setChannelSearch(e.target.value)}
                  placeholder="Hledat v kanálech..."
                  className="w-full pl-8 pr-7 py-1 bg-black border border-white/10 rounded-full text-xs text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
                />
                {channelSearch && (
                  <button onClick={() => setChannelSearch('')} className="absolute right-2.5 top-1.5 text-white/40 text-xs cursor-pointer">✕</button>
                )}
              </div>
            </div>

            {/* Table of all channels */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="bg-black/90 border-b border-white/10 text-white/60 uppercase tracking-wider text-[10px]">
                      <th className="p-3 w-12 text-center">CH</th>
                      <th className="p-3">Nástroj / Popis</th>
                      <th className="p-3">Konektor vstupu</th>
                      <th className="p-3">Preamp Gain</th>
                      <th className="p-3">Gate</th>
                      <th className="p-3">EQ Model</th>
                      <th className="p-3">Kompresor</th>
                      <th className="p-3">DCA</th>
                      <th className="p-3">Fader</th>
                      <th className="p-3 text-center">Akce & Editace</th>
                      <th className="p-3 text-right">Plné Parametry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredChannels.map(ch => {
                      const colorHex: Record<string, string> = {
                        orange: 'text-amber-400',
                        cyan: 'text-cyan-400',
                        green: 'text-emerald-400',
                        yellow: 'text-yellow-400',
                        magenta: 'text-pink-400',
                        blue: 'text-blue-400',
                        red: 'text-red-400',
                        purple: 'text-purple-400',
                        gray: 'text-gray-400'
                      };
                      const textColor = colorHex[ch.color] || 'text-cyan-400';

                      return (
                        <tr 
                          key={ch.chNum}
                          className="hover:bg-white/5 transition-colors group"
                        >
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 text-center font-bold text-white bg-black/40 cursor-pointer"
                          >
                            {ch.chNum}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 cursor-pointer"
                          >
                            <div className="flex items-center gap-2">
                              <span className={`w-2 h-2 rounded-full ${ch.color === 'orange' ? 'bg-amber-400' : 'bg-' + ch.color + '-400'}`} />
                              <span className={`font-bold font-sans text-xs ${textColor}`}>{ch.name}</span>
                            </div>
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 text-white/90 font-bold cursor-pointer"
                          >
                            {ch.sourceInput}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 cursor-pointer"
                          >
                            <div className="flex items-center gap-1.5">
                              <span className="text-emerald-400 font-bold">+{ch.gainDb} dB</span>
                              {ch.phantom48V && (
                                <span className="px-1 py-0.2 bg-red-500/20 text-red-400 border border-red-500/40 rounded text-[9px] font-bold">
                                  +48V
                                </span>
                              )}
                              {ch.phaseInvert && (
                                <span className="px-1 py-0.2 bg-yellow-500/20 text-yellow-400 rounded text-[9px] font-bold">
                                  Ø
                                </span>
                              )}
                            </div>
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 text-white/70 cursor-pointer"
                          >
                            {ch.gateOn ? (
                              <span className="text-[#AEEA00] font-semibold">{ch.gateModel}</span>
                            ) : (
                              <span className="text-white/20">Bypass</span>
                            )}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 text-cyan-300 font-semibold cursor-pointer"
                          >
                            {ch.eqModel}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 text-purple-300 font-semibold cursor-pointer"
                          >
                            {ch.compOn ? ch.compModel : <span className="text-white/20">Bypass</span>}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 cursor-pointer"
                          >
                            {ch.dcaGroup ? (
                              <span className="px-2 py-0.5 bg-white/10 text-white rounded font-bold text-[10px]">
                                DCA {ch.dcaGroup}
                              </span>
                            ) : (
                              <span className="text-white/20">-</span>
                            )}
                          </td>
                          <td 
                            onClick={() => setSelectedChannelForDetail(ch)}
                            className="p-3 cursor-pointer"
                          >
                            <span className={`font-bold ${ch.faderDb > 0 ? 'text-cyan-400' : 'text-white'}`}>
                              {ch.faderDb <= -60 ? '-∞ dB' : `${ch.faderDb > 0 ? '+' : ''}${ch.faderDb.toFixed(1)} dB`}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                onClick={() => openEditChannelModal(ch)}
                                className="p-1 rounded bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-colors cursor-pointer"
                                title="Upravit kanál"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteChannel(ch.chNum)}
                                className="p-1 rounded bg-white/5 hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                                title="Smazat kanál"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            {onNavigateToPreset ? (
                              <button
                                onClick={() => handleGoToPreset(ch)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-400 text-cyan-400 hover:text-black border border-cyan-500/30 font-sans font-bold text-[11px] transition-all cursor-pointer shadow-sm"
                                title={`Přejít na kompletní nastavení parametrů nástroje ${ch.name} (EQ, Comp, Gate, FX)`}
                              >
                                <Sliders className="w-3.5 h-3.5" />
                                <span>Plné nastavení parametrů</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedChannelForDetail(ch)}
                                className="text-white/50 hover:text-white text-[11px] font-sans underline cursor-pointer"
                              >
                                Detail
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-TAB 2: VIRTUAL 12-FADER MIXER DECK (Live mixing simulation)           */}
        {/* ========================================================================= */}
        {activeSubTab === 'mixer' && (
          <div className="space-y-4">
            <div className="bg-[#121212] p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-white">
                  Faderová sekce WING Compact (12 Motorizovaných faderů)
                </h4>
                <p className="text-[11px] text-white/50">
                  Přepínejte mezi bankami kanálů, měňte úrovně nebo klikněte na tlačítko <strong>„Parametry“</strong> pod faderem pro přechod na kompletní DSP parametry.
                </p>
              </div>

              {/* Bank switchers */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <button
                  onClick={() => setActiveFaderBank('bank1')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeFaderBank === 'bank1'
                      ? 'bg-cyan-400 text-black shadow-md'
                      : 'bg-black text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  Bank 1: Ch 1-12
                </button>
                <button
                  onClick={() => setActiveFaderBank('bank2')}
                  className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                    activeFaderBank === 'bank2'
                      ? 'bg-cyan-400 text-black shadow-md'
                      : 'bg-black text-white/60 hover:text-white border border-white/10'
                  }`}
                >
                  Bank 2: Ch 13-24
                </button>
                {safeChannels.length > 24 && (
                  <button
                    onClick={() => setActiveFaderBank('bank3')}
                    className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                      activeFaderBank === 'bank3'
                        ? 'bg-cyan-400 text-black shadow-md'
                        : 'bg-black text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    Bank 3: Ch 25-36
                  </button>
                )}
              </div>
            </div>

            {/* Sends on Fader Selector */}
            <div className="bg-[#181818] p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-bold text-white/60 uppercase text-[10px]">Sends on Fader:</span>
                <button
                  onClick={() => setSendsOnFaderBus(null)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    sendsOnFaderBus === null
                      ? 'bg-cyan-400 text-black shadow-sm'
                      : 'bg-black text-white/50 hover:text-white border border-white/5'
                  }`}
                >
                  Hlavní Mix (Main PA L/R)
                </button>
                {(currentScene.buses || []).slice(0, 4).map(b => (
                  <button
                    key={b.busNum}
                    onClick={() => setSendsOnFaderBus(b.busNum)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      sendsOnFaderBus === b.busNum
                        ? 'bg-cyan-400 text-black shadow-sm font-bold'
                        : 'bg-black text-white/50 hover:text-white border border-white/5'
                    }`}
                  >
                    Odposlech Bus {b.busNum}: {b.name}
                  </button>
                ))}
              </div>
              {sendsOnFaderBus !== null && (
                <span className="text-[11px] font-mono text-cyan-300 font-bold animate-pulse">
                  ⚡ Mícháte poměry nástrojů do odposlechu BUS {sendsOnFaderBus}
                </span>
              )}
            </div>

            {/* 12 Fader Deck */}
            <div className="bg-[#0e0e0e] border border-white/10 rounded-2xl p-4 shadow-2xl overflow-x-auto">
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-2 min-w-[950px]">
                {activeBankChannels.map(ch => {
                  const colorHex: Record<string, string> = {
                    orange: '#f59e0b',
                    cyan: '#22d3ee',
                    green: '#34d399',
                    yellow: '#facc15',
                    magenta: '#e879f9',
                    blue: '#60a5fa',
                    red: '#f43f5e',
                    gray: '#9ca3af'
                  };
                  const accent = colorHex[ch.color] || '#38bdf8';

                  return (
                    <div
                      key={ch.chNum}
                      className="bg-[#141414] border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-between space-y-2 relative shadow-inner"
                    >
                      {/* Scribble Strip */}
                      <div 
                        style={{ borderColor: accent }}
                        className="w-full bg-[#000000] border-t-2 rounded-md p-1.5 text-center font-mono space-y-0.5 shadow-sm"
                      >
                        <div className="flex items-center justify-between text-[9px] text-white/50">
                          <span>CH {ch.chNum}</span>
                          {ch.phantom48V && <span className="text-red-400 font-bold">+48V</span>}
                        </div>
                        <div 
                          style={{ color: accent }}
                          className="text-xs font-bold truncate font-sans tracking-tight"
                          title={ch.name}
                        >
                          {ch.name}
                        </div>
                        <div className="text-[9px] text-white/40 truncate">
                          {ch.sourceInput}
                        </div>
                      </div>

                      {/* Solo / Mute */}
                      <div className="w-full space-y-1.5 text-[10px] font-mono">
                        <button
                          onClick={() => handleSoloToggle(ch.chNum)}
                          className={`w-full py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            ch.solo
                              ? 'bg-yellow-400 text-black shadow-md shadow-yellow-400/40 animate-pulse'
                              : 'bg-black text-white/50 hover:text-white border border-white/10'
                          }`}
                        >
                          SOLO
                        </button>
                        <button
                          onClick={() => handleMuteToggle(ch.chNum)}
                          className={`w-full py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                            ch.muted
                              ? 'bg-red-600 text-white shadow-md shadow-red-600/40'
                              : 'bg-black text-white/50 hover:text-white border border-white/10'
                          }`}
                        >
                          MUTE
                        </button>
                      </div>

                      {/* Fader Track */}
                      <div className="flex items-center justify-center py-2 h-44 w-full relative">
                        <input
                          type="range"
                          min="-60"
                          max="10"
                          step="0.5"
                          value={ch.faderDb <= -60 ? -60 : ch.faderDb}
                          onChange={(e) => handleFaderChange(ch.chNum, parseFloat(e.target.value))}
                          className="h-36 w-6 appearance-none bg-black rounded-full outline-none cursor-pointer [writing-mode:vertical-lr] [direction:rtl] accent-white"
                        />
                      </div>

                      {/* Fader Readout */}
                      <div className="w-full text-center bg-black py-1 rounded border border-white/10 text-xs font-mono font-bold text-white">
                        {ch.faderDb <= -60 ? '-∞' : `${ch.faderDb > 0 ? '+' : ''}${ch.faderDb.toFixed(1)} dB`}
                      </div>

                      {/* Direct Preset Navigator Button */}
                      {onNavigateToPreset && (
                        <button
                          onClick={() => handleGoToPreset(ch)}
                          className="w-full py-1 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 rounded text-[9px] font-bold uppercase transition-all cursor-pointer truncate flex items-center justify-center gap-1"
                          title="Otevřít kompletní nastavení parametrů nástroje"
                        >
                          <Sliders className="w-2.5 h-2.5" />
                          <span>Parametry</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-TAB 3: BUSES, DCAS & FX (Monitors, DCA groups & FX Racks)             */}
        {/* ========================================================================= */}
        {activeSubTab === 'routing' && (
          <div className="space-y-5">
            {/* DCA Groups */}
            <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-white/80" />
                <span>8x DCA Skupiny (Rychlé ovládání hlasitosti celých sekcí)</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
                {(currentScene.dcas || []).map(dca => (
                  <div key={dca.dcaNum} className="bg-black p-3 rounded-xl border border-white/10 text-center space-y-1">
                    <span className="text-[10px] font-mono text-white/40 block">DCA {dca.dcaNum}</span>
                    <div className="text-xs font-bold text-white truncate">{dca.name.replace(`DCA ${dca.dcaNum}: `, '')}</div>
                    <div className="text-[10px] text-emerald-400 font-mono font-bold">{dca.memberChannels}</div>
                    <div className="bg-white/5 py-0.5 rounded text-xs font-mono font-bold text-white/90">
                      {dca.faderDb > 0 ? `+${dca.faderDb} dB` : `${dca.faderDb} dB`}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Monitor Buses & FX Slots */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* 16x Mix Buses */}
              <div className="lg:col-span-6 bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span>Odposlechové Sběrnice (IEM & Monitory)</span>
                </h4>
                <div className="space-y-2">
                  {(currentScene.buses || []).map(b => (
                    <div key={b.busNum} className="bg-black p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
                      <div>
                        <div className="font-bold text-white font-sans">Bus {b.busNum}: {b.name}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">Role: {b.role}</div>
                      </div>
                      <span className="text-white font-bold">{b.faderDb} dB</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FX Rack Slots */}
              <div className="lg:col-span-6 bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-xl space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Efektové procesory (8x FX Racks)</span>
                </h4>
                <div className="space-y-2">
                  {(currentScene.fxSlots || []).map(fx => (
                    <div key={fx.slotNum} className="bg-black p-3 rounded-xl border border-white/10 text-xs font-mono space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold font-sans">FX {fx.slotNum}: {fx.name}</span>
                        <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded text-[10px]">{fx.model}</span>
                      </div>
                      <div className="text-[10px] text-white/50">{fx.keyParam}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUB-TAB 4: USB & HARDWARE UPLOAD GUIDE                                    */}
        {/* ========================================================================= */}
        {activeSubTab === 'usb_guide' && (
          <div className="bg-[#121212] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-5 text-xs text-gray-300 leading-relaxed font-sans">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center border border-white/20">
                <Usb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">
                  Jak přenést tuto scénu do fyzického mixážního pultu Behringer WING?
                </h3>
                <p className="text-[11px] text-white/50">
                  Jednoduchý postup pro nahrání scény na USB disk nebo po síti LAN
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="font-bold text-white text-sm">Stáhněte .snap soubor</h4>
                <p className="text-[11px] text-white/60">
                  Klikněte na tlačítko <strong>„.snap soubor“</strong> v horní liště. Soubor se stáhne do vašeho počítače.
                </p>
              </div>

              <div className="bg-black p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="font-bold text-white text-sm">Nahrajte na USB flashku</h4>
                <p className="text-[11px] text-white/60">
                  Zkopírujte stažený soubor na běžný USB disk (formátovaný na FAT32) do složky <code>/WING/SNAPSHOTS/</code>.
                </p>
              </div>

              <div className="bg-black p-4 rounded-xl border border-white/10 space-y-2">
                <div className="w-7 h-7 rounded-full bg-white text-black font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="font-bold text-white text-sm">Vložte do WINGu a načtěte</h4>
                <p className="text-[11px] text-white/60">
                  Zasuňte USB flashku do horního portu USB na pultu WING Compact. Na dotykovém displeji stiskněte <strong>LIBRARY → SNAPSHOTS → LOAD FROM USB</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PDF Stage Rider Reader Modal */}
      <StageRiderPdfModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        scene={currentScene}
        channels={safeChannels}
      />

      {/* Create New Custom Scene Modal */}
      {showCreateSceneModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateScene} className="bg-[#161616] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">Vytvořit novou vlastní scénu pro WING</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateSceneModal(false)}
                className="text-white/40 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
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
                  className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                />
              </div>

              <div>
                <label className="text-white/60 block mb-1 font-bold">Typ obsazení / Žánr:</label>
                <select
                  value={newSceneEnsemble}
                  onChange={(e) => setNewSceneEnsemble(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/40"
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
                <label className="text-white/60 block mb-1 font-bold">Výchozí šablona kanálů:</label>
                <select
                  value={newSceneTemplate}
                  onChange={(e) => setNewSceneTemplate(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-white/40"
                >
                  <option value="scene-rock-24ch">Rocková sestava (24 kanálů)</option>
                  <option value="scene-pop-32ch">Pop / Modern Worship (32 kanálů)</option>
                  <option value="scene-orch-40ch">Symfonický orchestr (40 kanálů)</option>
                  <option value="scene-brass-18ch">Dechový orchestr (18 kanálů)</option>
                  <option value="scene-vocal-16ch">Pěvecký sbor (16 kanálů)</option>
                </select>
              </div>

              <div>
                <label className="text-white/60 block mb-1 font-bold">Popis a poznámky k pódiu:</label>
                <textarea
                  rows={2}
                  placeholder="např. Požadavky na IEM odposlechy, pódiové stageboxy..."
                  value={newSceneDesc}
                  onChange={(e) => setNewSceneDesc(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowCreateSceneModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white hover:bg-gray-200 text-black rounded-xl text-xs font-bold cursor-pointer"
              >
                Uložit novou scénu
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add / Edit Channel Modal */}
      {showAddChannelModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveChannel} className="bg-[#161616] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center">
                  <Sliders className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {editingChannel ? `Upravit kanál CH ${editingChannel.chNum}: ${editingChannel.name}` : 'Přidat nový kanál do scény'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddChannelModal(false)}
                className="text-white/40 hover:text-white text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs font-sans">
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Číslo kanálu:</label>
                  <input
                    type="number"
                    min={1}
                    max={48}
                    required
                    value={channelFormChNum}
                    onChange={(e) => setChannelFormChNum(parseInt(e.target.value) || 1)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-white/60 block mb-1 font-bold">Název nástroje / stopy:</label>
                  <input
                    type="text"
                    required
                    placeholder="např. Kopák, Sólová kytara..."
                    value={channelFormName}
                    onChange={(e) => setChannelFormName(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Vstupní konektor:</label>
                  <input
                    type="text"
                    value={channelFormInput}
                    onChange={(e) => setChannelFormInput(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Midas Gain (+dB):</label>
                  <input
                    type="number"
                    min={0}
                    max={65}
                    value={channelFormGain}
                    onChange={(e) => setChannelFormGain(parseInt(e.target.value) || 0)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white font-bold focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="flex items-center gap-4 bg-black p-2.5 rounded-xl border border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelForm48V}
                    onChange={(e) => setChannelForm48V(e.target.checked)}
                    className="rounded accent-red-500"
                  />
                  <span className="text-red-400 font-bold">+48V Fantom</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelFormPhase}
                    onChange={(e) => setChannelFormPhase(e.target.checked)}
                    className="rounded accent-yellow-400"
                  />
                  <span className="text-yellow-400 font-bold">Ø Fáze 180°</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/60 block mb-1 font-bold">EQ Model:</label>
                  <select
                    value={channelFormEqModel}
                    onChange={(e) => setChannelFormEqModel(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-cyan-300 focus:outline-none focus:border-white/40"
                  >
                    <option value="WING 6-Band PEQ">WING 6-Band PEQ</option>
                    <option value="Even 84 (Neve Style)">Even 84 (Neve)</option>
                    <option value="Pultec EQP-1A">Pultec EQP-1A</option>
                    <option value="SOUL Analog">SOUL Analog</option>
                    <option value="Fortissimo 110">Fortissimo 110</option>
                  </select>
                </div>
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Kompresor Model:</label>
                  <select
                    value={channelFormCompModel}
                    onChange={(e) => setChannelFormCompModel(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-purple-300 focus:outline-none focus:border-white/40"
                  >
                    <option value="1176 FET Comp">1176 FET Comp</option>
                    <option value="LA-2A Opto Leveler">LA-2A Opto Leveler</option>
                    <option value="BDX 160 Comp">BDX 160 (DBX 160)</option>
                    <option value="WING Dynamics">WING Dynamics</option>
                    <option value="Fairchild 670">Fairchild 670</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/60 block mb-1 font-bold">DCA Skupina (1-8):</label>
                  <select
                    value={channelFormDca || ''}
                    onChange={(e) => setChannelFormDca(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-white/40"
                  >
                    <option value="">Žádná</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(d => (
                      <option key={d} value={d}>DCA {d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/60 block mb-1 font-bold">Výchozí Fader (dB):</label>
                  <input
                    type="number"
                    step="0.5"
                    min={-60}
                    max={10}
                    value={channelFormFader}
                    onChange={(e) => setChannelFormFader(parseFloat(e.target.value) || 0)}
                    className="w-full bg-black border border-white/10 rounded-xl px-3 py-1.5 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowAddChannelModal(false)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-white hover:bg-gray-200 text-black rounded-xl text-xs font-bold cursor-pointer"
              >
                {editingChannel ? 'Uložit změny' : 'Přidat kanál'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Channel Detail Modal with Direct Full Preset Navigation */}
      {selectedChannelForDetail && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-white/10 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400" />
                <h3 className="text-sm font-bold text-white">
                  CH {selectedChannelForDetail.chNum}: {selectedChannelForDetail.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChannelForDetail(null)}
                className="text-white/40 hover:text-white text-xs font-bold cursor-pointer"
              >
                ✕ ZAVŘÍT
              </button>
            </div>

            {/* Direct Full Preset Button */}
            {onNavigateToPreset && (
              <button
                onClick={() => {
                  const ch = selectedChannelForDetail;
                  setSelectedChannelForDetail(null);
                  handleGoToPreset(ch);
                }}
                className="w-full flex items-center justify-between p-3.5 bg-white hover:bg-gray-200 text-black rounded-xl font-bold text-xs shadow-md transition-all cursor-pointer font-sans"
              >
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4" />
                  <span>Otevřít plné nastavení parametrů nástroje v Knihovně (Gate, EQ, Comp, FX)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black p-3 rounded-xl border border-white/10">
                  <span className="text-white/40 block text-[10px]">Vstupní konektor</span>
                  <span className="text-white font-bold">{selectedChannelForDetail.sourceInput}</span>
                </div>
                <div className="bg-black p-3 rounded-xl border border-white/10">
                  <span className="text-white/40 block text-[10px]">Zisk předzesilovače (Gain)</span>
                  <span className="text-emerald-400 font-bold">+{selectedChannelForDetail.gainDb} dB</span>
                </div>
              </div>

              <div className="bg-black p-3.5 rounded-xl border border-white/10 space-y-2">
                <span className="text-white/40 block text-[10px] uppercase font-bold">Procesory Channel Stripu</span>
                <div className="space-y-1 text-white/80">
                  <div className="flex justify-between">
                    <span>Šumová brána:</span>
                    <span className="text-[#AEEA00]">{selectedChannelForDetail.gateModel} ({selectedChannelForDetail.gateOn ? 'Aktivní' : 'Bypass'})</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ekvalizér:</span>
                    <span className="text-cyan-300">{selectedChannelForDetail.eqModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kompresor:</span>
                    <span className="text-purple-300">{selectedChannelForDetail.compModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Přiřazená DCA skupina:</span>
                    <span className="text-white font-bold">{selectedChannelForDetail.dcaGroup ? `DCA ${selectedChannelForDetail.dcaGroup}` : 'Žádná'}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10 font-sans">
                <button
                  onClick={() => {
                    const ch = selectedChannelForDetail;
                    setSelectedChannelForDetail(null);
                    openEditChannelModal(ch);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Upravit kanál</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
