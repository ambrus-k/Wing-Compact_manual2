export type NavigationTab = 'manual' | 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'microphones';

export interface ManualSubsection {
  id: string;
  title: string;
  badge?: string;
  summary: string;
  content: string;
  keyPoints?: string[];
  image?: {
    url: string;
    caption: string;
    alt: string;
    badge?: string;
  };
  functionDiagram?: {
    type: 'top_panel' | 'rear_panel' | 'signal_flow' | 'sources_vs_channels' | 'routing_matrix' | 'fader_layers' | 'eq_visualizer' | 'gate_visualizer' | 'comp_visualizer' | 'dugan_automix' | 'stageconnect_topology' | 'sd_live_recorder' | 'solo_talkback' | 'usb_player_recorder' | 'shortcuts_troubleshooting' | 'fx_rack';
    title: string;
    subtitle: string;
  };
  tables?: {
    title: string;
    headers: string[];
    rows: string[][];
  }[];
  tips?: string[];
  wingCompactSpecific?: string;
  relatedPresetIds?: string[];
}

export interface ManualChapter {
  id: string;
  number: number;
  title: string;
  icon: string;
  summary: string;
  subsections: ManualSubsection[];
}

export interface EQBand {
  id: string;
  type: 'hpf' | 'low-shelf' | 'peq' | 'high-shelf' | 'lpf';
  freq: number; // in Hz
  gain: number; // in dB (-15 to +15)
  q: number; // 0.1 to 10
  enabled: boolean;
}

export interface PresetGateConfig {
  enabled: boolean;
  model: string;
  threshold: number; // in dB
  ratio: string;
  attack: number; // in ms
  hold: number; // in ms
  release: number; // in ms
  range: number; // in dB
  keyFilter?: string;
  notes?: string;
}

export interface PresetEQConfig {
  enabled: boolean;
  model: string; // e.g. "WING EQ", "Even 84", "SOUL Analog", "Pulsar P1a"
  hpfFreq?: number;
  hpfSlope?: string;
  bands: EQBand[];
  mix: number;
  notes?: string;
}

export interface PresetCompConfig {
  enabled: boolean;
  model: string; // e.g. "WING Compressor", "76 Limiter Amp", "LA Leveler", "Even 88 Comp", "BDX 160"
  threshold: number; // in dB
  ratio: string;
  attack: string; // e.g. "10 ms" or "Fast (0.1ms)"
  release: string; // e.g. "120 ms" or "Auto"
  knee: number; // 0 (hard) to 5 (soft)
  makeUpGain: number; // in dB
  notes?: string;
}

export interface PresetFXConfig {
  primaryFX: {
    slotType: 'Insert' | 'Bus Send';
    busName?: string;
    model: string; // e.g. "VSS3 Reverb", "Stereo Delay", "Vintage Plate"
    sendLevelDb?: number;
    decayOrTime?: string;
    keySettings: string;
  };
  secondaryFX?: {
    slotType: 'Insert' | 'Bus Send';
    busName?: string;
    model: string;
    sendLevelDb?: number;
    decayOrTime?: string;
    keySettings: string;
  };
}

export interface InstrumentPreset {
  id: string;
  name: string;
  category: 'woodwinds' | 'brass' | 'strings' | 'harp' | 'keys' | 'guitars' | 'drums' | 'vocals' | 'choirs';
  categoryLabel: string;
  subGroup?: string;
  icon: string;
  tagColor: string;
  description: string;
  recommendedInput: string;
  preampGain: number; // in dB
  phantomPower: boolean;
  phaseInvert: boolean;
  gate: PresetGateConfig;
  eq: PresetEQConfig;
  comp: PresetCompConfig;
  fx: PresetFXConfig;
  pan: number; // -100 to +100
  faderDefault: number; // in dB
  proTips: string[];
  channelType: 'mono' | 'stereo';
}

export interface SceneChannelPatch {
  chNum: number;
  name: string;
  sourceInput: string; // e.g. "Local In 1", "AES50-A 14", "USB 1"
  gainDb: number;
  phantom48V: boolean;
  phaseInvert: boolean;
  color: 'orange' | 'cyan' | 'green' | 'yellow' | 'magenta' | 'blue' | 'red' | 'purple' | 'gray' | string;
  icon: string;
  faderDb: number; // e.g. 0.0, -5.5, -90.0 (-inf)
  pan: number; // -100 to +100
  muted: boolean;
  solo: boolean;
  gateOn: boolean;
  gateModel: string;
  eqModel: string;
  compOn: boolean;
  compModel: string;
  dcaGroup?: number; // 1 to 8
  busSends?: { busNum: number; busName: string; levelDb: number; on: boolean }[];
}

export interface SceneBusConfig {
  busNum: number;
  name: string;
  isStereo: boolean;
  role: 'IEM Monitor' | 'Wedge Monitor' | 'FX Send' | 'Subgroup' | 'Stream Submix';
  faderDb: number;
  color: string;
  pan: number;
  fxInsert?: string;
}

export interface SceneDCAConfig {
  dcaNum: number;
  name: string;
  color: string;
  faderDb: number;
  muted: boolean;
  memberChannels: string; // e.g. "Ch 1-8"
}

export interface SceneFXSlot {
  slotNum: number; // 1 to 8
  model: string;
  name: string;
  type: 'Send/Return' | 'Channel Insert' | 'Bus Insert' | 'Master Insert';
  source: string;
  target: string;
  keyParam: string;
}

export interface SceneMatrixConfig {
  matrixNum: number;
  name: string;
  source: string;
  delayMs: number;
  delayMeters: number;
  eqType: string;
  faderDb: number;
  destination: string;
}

export interface SceneCueItem {
  cueNumber: string; // e.g. "1.00", "1.10", "2.00"
  cueName: string;
  songSection: string;
  crossfadeSec: number;
  targetSceneId: string;
  autoNext?: boolean;
  notes?: string;
}

export interface LibraryPresetItem {
  id: string;
  type: 'channel' | 'fx' | 'routing' | 'matrix';
  name: string;
  category: string;
  description: string;
  tag: string;
  oscCommandPreview: string;
  details: Record<string, string | number | boolean>;
}

export interface SavedScene {
  id: string;
  name: string;
  type: 'snapshot' | 'snippet' | 'show';
  createdAt: string;
  updatedAt: string;
  tags: string[];
  description: string;
  favorite: boolean;
  channelCount: number;
  scope: {
    channels: boolean;
    aux: boolean;
    buses: boolean;
    mains: boolean;
    matrix: boolean;
    eq: boolean;
    dyn: boolean;
    gate: boolean;
    fx: boolean;
    routing: boolean;
    dca: boolean;
    muteGroups: boolean;
  };
  details: {
    targetEnsemble: string;
    faderLayerPreset: string;
    mainFaderAssign: string;
    customControlsProfile: string;
    notes: string;
  };
  // Real mixing engineer structures
  channels?: SceneChannelPatch[];
  buses?: SceneBusConfig[];
  dcas?: SceneDCAConfig[];
  fxSlots?: SceneFXSlot[];
  matrices?: SceneMatrixConfig[];
  cues?: SceneCueItem[];
}

export interface DiagnosticStatus {
  aes50A: { locked: boolean; corCount: number; uncCount: number; device: string };
  aes50B: { locked: boolean; corCount: number; uncCount: number; device: string };
  aes50C: { locked: boolean; corCount: number; uncCount: number; device: string };
  stageConnect: { active: boolean; channels: number; cableQuality: 'Good (110Ω)' | 'Warning' | 'Error'; lengthMeters: number };
  audioClock: { rate: '48 kHz' | '44.1 kHz'; source: 'INTERNAL' | 'AES50-A' | 'AES50-B' | 'DANTE' | 'STAGECONNECT'; synced: boolean; jitterPpm: number };
  systemTemp: number; // Celsius
  dspLoad: number; // %
  fanRpm: number;
  wingLiveSd1: { inserted: boolean; freeSpaceGb: number; status: 'Ready' | 'Recording' | 'Empty' };
  wingLiveSd2: { inserted: boolean; freeSpaceGb: number; status: 'Ready' | 'Recording' | 'Empty' };
}

export interface Microphone {
  id: string;
  name: string;
  type: string;
  application: string;
  description: string;
  imageUrl: string;
}
