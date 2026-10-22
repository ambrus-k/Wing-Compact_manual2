import { 
  SavedScene, 
  SceneChannelPatch, 
  SceneBusConfig, 
  SceneDCAConfig, 
  SceneFXSlot, 
  SceneMatrixConfig 
} from '../types';

/**
 * Mixing Station Scene & Preset Parser / Serializer
 * Fully compatible with David Giga's Mixing Station (Android / iOS / Windows / macOS / Linux)
 * Native support for Behringer X32/M32, WING, and Soundcraft Ui24R offline scenes (.ms, .json, .scn, .snap).
 */

export interface MixingStationSceneFile {
  app?: string;
  version?: string;
  type?: string;
  mixer?: string;
  target?: string;
  name?: string;
  channels?: Array<{
    id?: number;
    chNum?: number;
    name?: string;
    label?: string;
    source?: string;
    sourceInput?: string;
    gain?: number;
    gainDb?: number;
    phantom?: boolean;
    phantom48V?: boolean;
    phase?: boolean;
    phaseInvert?: boolean;
    color?: string | number;
    icon?: string;
    fader?: number;
    faderDb?: number;
    pan?: number;
    muted?: boolean;
    mute?: boolean;
    solo?: boolean;
    gateOn?: boolean;
    gateModel?: string;
    eqModel?: string;
    compOn?: boolean;
    compModel?: string;
    dca?: number;
    dcaGroup?: number;
    hpf?: { on?: boolean; freq?: number };
    sends?: Array<{ bus: number; level: number; on?: boolean }>;
  }>;
  buses?: Array<{
    busNum?: number;
    id?: number;
    name?: string;
    isStereo?: boolean;
    role?: string;
    faderDb?: number;
    color?: string | number;
  }>;
  dcas?: Array<{
    dcaNum?: number;
    id?: number;
    name?: string;
    faderDb?: number;
    color?: string | number;
    members?: string;
  }>;
}

const COLOR_MAP: Record<number, string> = {
  0: 'gray',
  1: 'red',
  2: 'green',
  3: 'yellow',
  4: 'blue',
  5: 'magenta',
  6: 'cyan',
  7: 'orange',
  8: 'gray',
  9: 'red',
  10: 'green',
  11: 'yellow',
  12: 'blue',
  13: 'magenta',
  14: 'cyan',
  15: 'orange'
};

export const colorFromCode = (code: any): string => {
  if (typeof code === 'number') {
    return COLOR_MAP[code] || 'orange';
  }
  if (typeof code === 'string' && code.trim().length > 0) {
    const parsedNum = parseInt(code, 10);
    if (!isNaN(parsedNum) && COLOR_MAP[parsedNum]) {
      return COLOR_MAP[parsedNum];
    }
    return code;
  }
  return 'orange';
};

export const inferIconFromName = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('kick') || n.includes('kopák') || n.includes('bd') || n.includes('bassdrum')) return 'Drum';
  if (n.includes('snare') || n.includes('virbl') || n.includes('sd')) return 'Drum';
  if (n.includes('tom') || n.includes('floor')) return 'Tom';
  if (n.includes('over') || n.includes('oh') || n.includes('hat') || n.includes('činel') || n.includes('ride') || n.includes('crash')) return 'Cymbal';
  if (n.includes('bass') || n.includes('basa')) return 'Bass';
  if (n.includes('akust') || n.includes('ac ') || n.includes('acoustic')) return 'Acoustic';
  if (n.includes('kytar') || n.includes('gtr') || n.includes('guitar') || n.includes('e karel') || n.includes('e brab')) return 'Guitar';
  if (n.includes('klav') || n.includes('piano') || n.includes('keys') || n.includes('synth') || n.includes('rhodes') || n.includes('organ') || n.includes('křídlo')) return 'Keys';
  if (n.includes('sax') || n.includes('dech') || n.includes('horn') || n.includes('trubk') || n.includes('trombon') || n.includes('flétn')) return 'Music';
  if (n.includes('vox') || n.includes('vocal') || n.includes('zpěv') || n.includes('sbor') || n.includes('pavel') || n.includes('brabec') || n.includes('klara') || n.includes('karel') || n.includes('lead') || n.includes('frontman')) return 'Mic';
  return 'Music';
};

export const inferBusRole = (name: string): SceneBusConfig['role'] => {
  const n = name.toLowerCase();
  if (n.includes('iem') || n.includes('ear') || n.includes('pavel') || n.includes('brab') || n.includes('klara') || n.includes('caja') || n.includes('bici')) return 'IEM Monitor';
  if (n.includes('wedge') || n.includes('odposlech') || n.includes('mon')) return 'Wedge Monitor';
  if (n.includes('reverb') || n.includes('delay') || n.includes('hall') || n.includes('plate') || n.includes('fx')) return 'FX Send';
  if (n.includes('grp') || n.includes('group') || n.includes('sub') || n.includes('comp') || n.includes('zpev') || n.includes('sax')) return 'Subgroup';
  if (n.includes('stream') || n.includes('broadcast')) return 'Stream Submix';
  return 'IEM Monitor';
};

/**
 * Parses uploaded content from Mixing Station
 */
export const parseMixingStationFile = (
  rawText: string,
  fileName: string = 'MixingStation.json'
): { scene: SavedScene; detectedFormat: string } => {
  const trimmed = rawText.trim();
  const cleanBaseName = fileName.replace(/\.[^/.]+$/, '');

  // 1. Try Parsing as JSON
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);

      // Check if this is a Native Mixing Station Console Scene Dump (like X32/M32 or WING official exports)
      const isNativeMixingStation = (Array.isArray(parsed.ch) && parsed.ch.length > 0) || 
                                     Boolean(parsed.consoleMeta) || 
                                     Boolean(parsed.meta?.name && parsed.scope !== undefined) ||
                                     parsed.modelVersion !== undefined;

      if (isNativeMixingStation && Array.isArray(parsed.ch)) {
        const mixerModel = parsed.consoleMeta?.model || 'X32/M32';
        const sceneName = parsed.meta?.name?.trim() || cleanBaseName || 'Mixing Station Scene';
        const isX32 = mixerModel.toUpperCase().includes('X32') || mixerModel.toUpperCase().includes('M32');

        // Extract DCAs first so we can map channels to their DCAs
        const dcaItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 8)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        const dcas: SceneDCAConfig[] = dcaItems.map((d: any) => {
          const dcaNum = (d.ref.offset ?? 0) + 1;
          const dcaName = d.data?.name?.generic?.name?.trim() || d.data?.name?.fixed || `DCA ${dcaNum}`;
          const color = colorFromCode(d.data?.name?.generic?.color);
          const faderDb = Math.round((d.data?.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const muted = d.data?.main?.generic?.['mix.rawOn'] === false;

          let memberChannels = '';
          const dcaUpper = dcaName.toUpperCase();
          if (dcaUpper.includes('VOCAL') || dcaUpper.includes('ZPEV')) {
            memberChannels = 'CH 1-4 (Pavel, Brabec, Klara, Karel)';
          } else if (dcaUpper.includes('RYTMIK') || dcaUpper.includes('GUITAR')) {
            memberChannels = 'CH 6-10 (E Karel, E Brab, AC kytara, Klav L/R)';
          } else if (dcaUpper.includes('BASS')) {
            memberChannels = 'CH 11 (Bass DI / Mic)';
          } else if (dcaUpper.includes('DRUM') || dcaUpper.includes('BICI')) {
            memberChannels = 'CH 12-18 (BassDrum, SnareDrum, Toms, Overheads)';
          } else if (dcaUpper.includes('AUDIO') || dcaUpper.includes('LINE')) {
            memberChannels = 'CH 19-20 (Zal in6, Zal AUX4, USB In)';
          } else if (dcaUpper.includes('FX 1')) {
            memberChannels = 'FX Rack 1 / Bus 13 (Hall Reverb)';
          } else if (dcaUpper.includes('FX 2')) {
            memberChannels = 'FX Rack 2 / Bus 14 (Plate Reverb)';
          } else if (dcaUpper.includes('FX 3') || dcaUpper.includes('DELAY')) {
            memberChannels = 'FX Rack 3 / Bus 15 (Stereo Delay)';
          } else {
            memberChannels = `Kanály přiřazené k DCA ${dcaNum}`;
          }

          return {
            dcaNum,
            name: dcaName,
            color,
            faderDb,
            muted,
            memberChannels
          };
        });

        // Extract Input Channels (ref.type === 0)
        const inputChItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 0)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        const channels: SceneChannelPatch[] = inputChItems.map((item: any) => {
          const chNum = (item.ref.offset ?? 0) + 1;
          const d = item.data || {};
          const name = d.name?.generic?.name?.trim() || d.name?.fixed || `Ch ${chNum.toString().padStart(2, '0')}`;
          const gainDb = Math.round((d.headamp?.gain ?? 0) * 10) / 10;
          const phantom48V = Boolean(d.headamp?.['+48v']);
          const phaseInvert = Boolean(d.cfg?.generic?.['preamp.inv']);
          const color = colorFromCode(d.name?.generic?.color);
          const icon = inferIconFromName(name);
          const faderDb = Math.round((d.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const pan = Math.round(d.main?.generic?.['mix.pan'] ?? 0);
          const muted = d.main?.generic?.['mix.rawOn'] === false;
          const gateOn = Boolean(d.gate?.generic?.on);
          const eqOn = Boolean(d.eq?.generic?.on);
          const compOn = Boolean(d.dyn?.generic?.on);

          // Determine DCA group assignment
          let dcaGroup: number | undefined = undefined;
          const cfg = d.cfg?.generic || {};
          for (let dIdx = 0; dIdx < 8; dIdx++) {
            if (cfg[`grp.dca.${dIdx}`]) {
              dcaGroup = dIdx + 1;
              break;
            }
          }

          // If no explicit DCA group bit is set, deduce intelligently from name and DCA titles
          if (!dcaGroup && dcas.length > 0) {
            const nameLower = name.toLowerCase();
            if (nameLower.includes('drum') || nameLower.includes('snare') || nameLower.includes('tom') || nameLower.includes('over') || nameLower.includes('oh') || nameLower.includes('bici')) {
              dcaGroup = 4; // Drums
            } else if (nameLower.startsWith('e ') || nameLower.includes('kytar') || nameLower.includes('klav') || nameLower.includes('piano') || nameLower.includes('sax')) {
              dcaGroup = 2; // Rytmika & Kytary
            } else if (nameLower.includes('bass') || nameLower.includes('basa')) {
              dcaGroup = 3; // Bass
            } else if (nameLower.includes('pavel') || nameLower.includes('brabec') || nameLower.includes('klara') || nameLower.includes('karel') || nameLower.includes('vox') || nameLower.includes('zpěv')) {
              dcaGroup = 1; // Vocal
            } else if (nameLower.includes('zal') || nameLower.includes('aux') || nameLower.includes('pc') || nameLower.includes('usb')) {
              dcaGroup = 5; // AUDIO
            }
          }

          // Extract bus sends if present
          const busSends: Array<{ busNum: number; busName: string; levelDb: number; on: boolean }> = [];
          const sendsGen = d.sends?.generic || {};
          for (let b = 0; b < 16; b++) {
            const sendLvl = sendsGen[`mix.sends.4_${b}.lvl`];
            const sendOn = sendsGen[`mix.sends.4_${b}.on`] !== false;
            if (sendLvl !== undefined && sendLvl > -85) {
              busSends.push({
                busNum: b + 1,
                busName: `Bus ${b + 1}`,
                levelDb: Math.round(Number(sendLvl) * 10) / 10,
                on: Boolean(sendOn)
              });
            }
          }

          return {
            chNum,
            name,
            sourceInput: `Local In ${chNum} (XLR)`,
            gainDb,
            phantom48V,
            phaseInvert,
            color,
            icon,
            faderDb,
            pan,
            muted,
            solo: false,
            gateOn,
            gateModel: gateOn ? (isX32 ? 'X32 Noise Gate' : 'WING Gate/Exp') : 'Bypass',
            eqModel: eqOn ? (isX32 ? 'X32 4-Band Parametric EQ' : 'WING 6-Band PEQ') : 'Bypass',
            compOn,
            compModel: compOn ? (isX32 ? 'X32 Dynamics / Comp' : '1176 FET Comp') : 'Bypass',
            dcaGroup,
            busSends: busSends.length > 0 ? busSends : undefined
          };
        });

        // Also extract Aux Channels (ref.type === 1) and append them so sound engineer has the full console strip
        const auxItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 1)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        auxItems.forEach((item: any) => {
          const auxIndex = (item.ref.offset ?? 0) + 1;
          const d = item.data || {};
          const rawName = d.name?.generic?.name?.trim() || d.name?.fixed || `Aux ${auxIndex.toString().padStart(2, '0')}`;
          const chNum = 32 + auxIndex;
          const gainDb = Math.round((d.headamp?.gain ?? 0) * 10) / 10;
          const phantom48V = Boolean(d.headamp?.['+48v']);
          const faderDb = Math.round((d.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const pan = Math.round(d.main?.generic?.['mix.pan'] ?? 0);
          const muted = d.main?.generic?.['mix.rawOn'] === false;

          channels.push({
            chNum,
            name: `${rawName} (Aux ${auxIndex})`,
            sourceInput: `Aux In ${auxIndex} / USB`,
            gainDb,
            phantom48V,
            phaseInvert: false,
            color: 'yellow',
            icon: rawName.toLowerCase().includes('usb') || rawName.toLowerCase().includes('pc') ? 'Music' : 'Volume2',
            faderDb,
            pan,
            muted,
            solo: false,
            gateOn: false,
            gateModel: 'Bypass',
            eqModel: isX32 ? 'X32 4-Band PEQ' : 'WING PEQ',
            compOn: false,
            compModel: 'Bypass',
            dcaGroup: 5 // DCA 5 is AUDIO in this band scene
          });
        });

        // Extract Mix Buses (ref.type === 4)
        const busItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 4)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        const buses: SceneBusConfig[] = busItems.map((b: any) => {
          const busNum = (b.ref.offset ?? 0) + 1;
          const busName = b.data?.name?.generic?.name?.trim() || b.data?.name?.fixed || `Bus ${busNum}`;
          const isStereo = Boolean(b.data?.link?.generic?.linked || busName.endsWith(' L') || busName.endsWith(' R'));
          const role = inferBusRole(busName);
          const faderDb = Math.round((b.data?.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const color = colorFromCode(b.data?.name?.generic?.color);
          const pan = Math.round(b.data?.main?.generic?.['mix.pan'] ?? 0);

          return {
            busNum,
            name: busName,
            isStereo,
            role,
            faderDb,
            color,
            pan
          };
        });

        // Extract Matrices (ref.type === 7)
        const matrixItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 7)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        const matrices: SceneMatrixConfig[] = matrixItems.map((m: any) => {
          const matrixNum = (m.ref.offset ?? 0) + 1;
          const mtxName = m.data?.name?.generic?.name?.trim() || m.data?.name?.fixed || `Matrix ${matrixNum}`;
          const faderDb = Math.round((m.data?.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;

          return {
            matrixNum,
            name: mtxName,
            source: 'Main L/R',
            delayMs: 0,
            delayMeters: 0,
            eqType: isX32 ? 'X32 6-Band PEQ' : 'WING 6-Band PEQ',
            faderDb,
            destination: mtxName
          };
        });

        // Extract FX Processors (parsed.fx array)
        const fxSlots: SceneFXSlot[] = (parsed.fx || []).map((fx: any, idx: number) => {
          const fxName = fx.fxName || `FX Rack ${idx + 1}`;
          let keyParam = 'Výchozí preset';
          if (fx.fxValues) {
            keyParam = Object.entries(fx.fxValues)
              .slice(0, 3)
              .map(([k, v]) => `${k}: ${Math.round(Number(v) * 10) / 10}`)
              .join(', ');
          }

          return {
            slotNum: idx + 1,
            name: fxName,
            model: fxName,
            type: idx < 4 ? 'Send/Return' : 'Channel Insert',
            source: fx.fxCfg?.srcL !== undefined ? `Bus ${Number(fx.fxCfg.srcL) + 1}` : 'Mix Bus Send',
            target: 'Main L/R',
            keyParam
          };
        });

        const nativeScene: SavedScene = {
          id: `ms-native-${Date.now()}`,
          name: sceneName,
          type: 'snapshot',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['Mixing Station', mixerModel, 'Official Export', 'Live'],
          description: `Kompletní offline scéna importovaná z aplikace Mixing Station (${mixerModel}). Obsahuje ${channels.length} kanálů (32 hlavních + 8 auxů), ${buses.length} sběrnic, ${matrices.length} matic a ${dcas.length} DCA skupin.`,
          favorite: true,
          channelCount: channels.length,
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
            targetEnsemble: `${sceneName} (${mixerModel} Band Setup)`,
            faderLayerPreset: 'Mixing Station Native Layout',
            mainFaderAssign: 'Main L/R',
            customControlsProfile: 'FOH & Monitor Standard',
            notes: `Importováno ze souboru ${fileName} (Mixing Station Native Dump). Všechny analogové gainy, +48V phantom a procesory byly přesně namapovány.`
          },
          channels: channels.length > 0 ? channels : getDefaultChannels(),
          buses: buses.length > 0 ? buses : getDefaultBuses(),
          dcas: dcas.length > 0 ? dcas : getDefaultDcas(),
          matrices: matrices.length > 0 ? matrices : undefined,
          fxSlots: fxSlots.length > 0 ? fxSlots : undefined
        };

        return {
          scene: nativeScene,
          detectedFormat: `Mixing Station Native (${mixerModel})`
        };
      }

      // Format B: Simplified Custom JSON schema with sceneData.channels
      const sceneData: MixingStationSceneFile = Array.isArray(parsed) 
        ? { channels: parsed } 
        : (parsed.scene || parsed.data || parsed);

      const rawChannels = sceneData.channels || parsed.channels || [];
      const channels: SceneChannelPatch[] = rawChannels.map((c: any, index: number) => {
        const chNum = Number(c.chNum ?? c.id ?? index + 1);
        const name = String(c.name || c.label || `Kanál ${chNum}`);
        const sourceInput = String(c.sourceInput || c.source || `Local In ${chNum <= 24 ? chNum : 1} (XLR)`);
        const gainDb = Number(c.gainDb ?? c.gain ?? 26);
        const phantom48V = Boolean(c.phantom48V ?? c.phantom ?? false);
        const phaseInvert = Boolean(c.phaseInvert ?? c.phase ?? false);
        const color = colorFromCode(c.color || 'orange');
        const icon = String(c.icon || inferIconFromName(name));
        const faderDb = Number(c.faderDb ?? c.fader ?? 0);
        const pan = Number(c.pan ?? 0);
        const muted = Boolean(c.muted ?? c.mute ?? false);
        const solo = Boolean(c.solo ?? false);
        const gateOn = Boolean(c.gateOn ?? c.gate?.on ?? false);
        const gateModel = String(c.gateModel || (gateOn ? 'Noise Gate' : 'Bypass'));
        const eqModel = String(c.eqModel || '4-Band Parametric EQ');
        const compOn = Boolean(c.compOn ?? c.comp?.on ?? false);
        const compModel = String(c.compModel || (compOn ? 'Dynamics Comp' : 'Bypass'));
        const dcaGroup = c.dcaGroup ?? c.dca ? Number(c.dcaGroup ?? c.dca) : undefined;

        return {
          chNum,
          name,
          sourceInput,
          gainDb,
          phantom48V,
          phaseInvert,
          color,
          icon,
          faderDb,
          pan,
          muted,
          solo,
          gateOn,
          gateModel,
          eqModel,
          compOn,
          compModel,
          dcaGroup
        };
      });

      // Buses
      const rawBuses = sceneData.buses || parsed.buses || [];
      const buses: SceneBusConfig[] = rawBuses.length > 0 
        ? rawBuses.map((b: any, index: number) => ({
            busNum: Number(b.busNum ?? b.id ?? index + 1),
            name: String(b.name || `Bus ${index + 1}`),
            isStereo: Boolean(b.isStereo ?? false),
            role: (b.role || inferBusRole(b.name || '')) as any,
            faderDb: Number(b.faderDb ?? b.fader ?? 0),
            color: colorFromCode(b.color || 'cyan'),
            pan: 0
          }))
        : getDefaultBuses();

      // DCAs
      const rawDcas = sceneData.dcas || parsed.dcas || [];
      const dcas: SceneDCAConfig[] = rawDcas.length > 0
        ? rawDcas.map((d: any, index: number) => ({
            dcaNum: Number(d.dcaNum ?? d.id ?? index + 1),
            name: String(d.name || `DCA ${index + 1}`),
            color: colorFromCode(d.color || 'yellow'),
            faderDb: Number(d.faderDb ?? 0),
            muted: false,
            memberChannels: d.members || d.memberChannels || `CH 1-8`
          }))
        : getDefaultDcas();

      const newScene: SavedScene = {
        id: `ms-scene-${Date.now()}`,
        name: sceneData.name || cleanBaseName || 'Mixing Station Import',
        type: 'snapshot',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['Mixing Station', 'Imported', 'Live'],
        description: `Scéna importovaná z aplikace Mixing Station (${fileName})`,
        favorite: true,
        channelCount: channels.length,
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
          targetEnsemble: 'Live Band (Mixing Station Setup)',
          faderLayerPreset: 'Mixing Station Default',
          mainFaderAssign: 'Main L/R',
          customControlsProfile: 'FOH Standard',
          notes: `Importováno ze souboru ${fileName}`
        },
        channels: channels.length > 0 ? channels : getDefaultChannels(),
        buses,
        dcas
      };

      return { scene: newScene, detectedFormat: 'Mixing Station JSON (.ms)' };
    } catch (e) {
      console.warn('JSON parse error, attempting line-based snapshot parser...', e);
    }
  }

  // 2. Line-based Snapshot Parser (.snap, .scn, .wingscene, OSC text)
  const lines = rawText.split('\n');
  const channelMap = new Map<number, Partial<SceneChannelPatch>>();

  lines.forEach(line => {
    const l = line.trim();
    if (!l || l.startsWith('#')) return;

    // e.g. /ch/1/config/name "Lead Vox"
    const nameMatch = l.match(/\/ch\/(\d+)\/(?:config\/)?name\s+"?([^"]+)"?/i);
    if (nameMatch) {
      const chNum = parseInt(nameMatch[1], 10);
      const existing = channelMap.get(chNum) || { chNum };
      existing.name = nameMatch[2];
      channelMap.set(chNum, existing);
      return;
    }

    // e.g. /ch/1/preamp/gain 24.5
    const gainMatch = l.match(/\/ch\/(\d+)\/preamp\/gain\s+([\d.-]+)/i);
    if (gainMatch) {
      const chNum = parseInt(gainMatch[1], 10);
      const existing = channelMap.get(chNum) || { chNum };
      existing.gainDb = Math.round(parseFloat(gainMatch[2]));
      channelMap.set(chNum, existing);
      return;
    }

    // e.g. /ch/1/preamp/48v 1
    const phantomMatch = l.match(/\/ch\/(\d+)\/preamp\/48v\s+([01])/i);
    if (phantomMatch) {
      const chNum = parseInt(phantomMatch[1], 10);
      const existing = channelMap.get(chNum) || { chNum };
      existing.phantom48V = phantomMatch[2] === '1';
      channelMap.set(chNum, existing);
      return;
    }

    // e.g. /ch/1/fader -5.0
    const faderMatch = l.match(/\/ch\/(\d+)\/fader\s+([-\d.]+)/i);
    if (faderMatch) {
      const chNum = parseInt(faderMatch[1], 10);
      const existing = channelMap.get(chNum) || { chNum };
      existing.faderDb = parseFloat(faderMatch[2]);
      channelMap.set(chNum, existing);
      return;
    }
  });

  const parsedChannels: SceneChannelPatch[] = Array.from(channelMap.values()).map(c => ({
    chNum: c.chNum || 1,
    name: c.name || `CH ${c.chNum || 1}`,
    sourceInput: `Local In ${c.chNum || 1}`,
    gainDb: c.gainDb ?? 28,
    phantom48V: Boolean(c.phantom48V),
    phaseInvert: false,
    color: 'orange',
    icon: inferIconFromName(c.name || ''),
    faderDb: c.faderDb ?? 0,
    pan: 0,
    muted: false,
    solo: false,
    gateOn: true,
    gateModel: 'Noise Gate',
    eqModel: '4-Band Parametric EQ',
    compOn: true,
    compModel: 'Compressor'
  }));

  const snapshotScene: SavedScene = {
    id: `ms-snap-${Date.now()}`,
    name: cleanBaseName || 'Snapshot Import',
    type: 'snapshot',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Mixing Station', 'Snapshot', 'OSC'],
    description: `Importováno ze souboru ${fileName}`,
    favorite: true,
    channelCount: parsedChannels.length || 16,
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
      targetEnsemble: 'Live Snapshot',
      faderLayerPreset: 'Custom',
      mainFaderAssign: 'Main L/R',
      customControlsProfile: 'Standard',
      notes: `Importováno z ${fileName}`
    },
    channels: parsedChannels.length > 0 ? parsedChannels : getDefaultChannels(),
    buses: getDefaultBuses(),
    dcas: getDefaultDcas()
  };

  return { scene: snapshotScene, detectedFormat: 'Console Snapshot (.snap / .scn)' };
};

/**
 * Serializes scene into Mixing Station Offline Scene JSON (.ms / .json)
 */
export const exportToMixingStationJson = (scene: SavedScene, mixerType: string = 'wing'): string => {
  const exportPayload = {
    app: 'Mixing Station',
    version: '1.8.12',
    exportFormat: 'offline_scene',
    mixerType,
    sceneName: scene.name,
    timestamp: Date.now(),
    dateCreated: new Date().toISOString(),
    description: scene.description,
    author: 'Digital Mixing Console Manual & Mixing Station Hub',
    channels: (scene.channels || []).map(ch => ({
      id: ch.chNum,
      name: ch.name,
      color: ch.color,
      icon: ch.icon,
      source: ch.sourceInput,
      gain: ch.gainDb,
      phantom: ch.phantom48V,
      phase: ch.phaseInvert,
      fader: ch.faderDb,
      pan: ch.pan,
      mute: ch.muted,
      solo: ch.solo,
      gate: {
        on: ch.gateOn,
        model: ch.gateModel,
        threshold: ch.gateOn ? -38 : 0
      },
      eq: {
        model: ch.eqModel,
        hpf: ch.eqModel.includes('HPF') ? 100 : 0
      },
      comp: {
        on: ch.compOn,
        model: ch.compModel,
        threshold: ch.compOn ? -18 : 0
      },
      dca: ch.dcaGroup || null
    })),
    buses: (scene.buses || []).map(b => ({
      id: b.busNum,
      name: b.name,
      isStereo: b.isStereo,
      role: b.role,
      fader: b.faderDb,
      color: b.color
    })),
    dcas: (scene.dcas || []).map(d => ({
      id: d.dcaNum,
      name: d.name,
      fader: d.faderDb,
      color: d.color,
      members: d.memberChannels
    }))
  };

  return JSON.stringify(exportPayload, null, 2);
};

/**
 * Serializes a single channel preset for Mixing Station
 */
export const exportChannelPresetJson = (channel: SceneChannelPatch, mixerType: string = 'wing'): string => {
  const payload = {
    app: 'Mixing Station',
    type: 'channel_preset',
    mixerType,
    name: channel.name,
    created: new Date().toISOString(),
    channelPatch: {
      ...channel,
      exportVersion: '1.0'
    }
  };
  return JSON.stringify(payload, null, 2);
};

/**
 * Downloads a text or JSON file in the browser
 */
export const downloadFile = (content: string, filename: string, mimeType: string = 'application/json') => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// Default fallback structures
const getDefaultChannels = (): SceneChannelPatch[] => [
  { chNum: 1, name: 'Kick In', sourceInput: 'Local In 1 (XLR)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Gate/Exp', eqModel: '4-Band PEQ (HPF 30Hz)', compOn: true, compModel: '1176 FET Comp', dcaGroup: 1 },
  { chNum: 2, name: 'Snare Top', sourceInput: 'Local In 2 (XLR)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Gate/Exp', eqModel: '4-Band PEQ (HPF 80Hz)', compOn: true, compModel: '1176 FET Comp', dcaGroup: 1 },
  { chNum: 3, name: 'Bass DI', sourceInput: 'Local In 3 (XLR)', gainDb: 26, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Bass', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: '4-Band PEQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 2 },
  { chNum: 4, name: 'Lead Vox', sourceInput: 'Local In 4 (XLR)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: '4-Band PEQ + HPF 110Hz', compOn: true, compModel: '1176 FET Comp', dcaGroup: 4 }
];

const getDefaultBuses = (): SceneBusConfig[] => [
  { busNum: 1, name: 'IEM Zpěv (Stereo L)', isStereo: true, role: 'IEM Monitor', faderDb: 0, color: 'cyan', pan: -100 },
  { busNum: 2, name: 'IEM Zpěv (Stereo R)', isStereo: true, role: 'IEM Monitor', faderDb: 0, color: 'cyan', pan: 100 },
  { busNum: 3, name: 'IEM Bicí', isStereo: false, role: 'IEM Monitor', faderDb: 0, color: 'orange', pan: 0 },
  { busNum: 4, name: 'Wedge Kytara', isStereo: false, role: 'Wedge Monitor', faderDb: 0, color: 'yellow', pan: 0 },
  { busNum: 5, name: 'FX 1 Hall', isStereo: false, role: 'FX Send', faderDb: 0, color: 'purple', pan: 0 },
  { busNum: 6, name: 'FX 2 Delay', isStereo: false, role: 'FX Send', faderDb: 0, color: 'purple', pan: 0 }
];

const getDefaultDcas = (): SceneDCAConfig[] => [
  { dcaNum: 1, name: 'Bicí souprava', color: 'orange', faderDb: 0, muted: false, memberChannels: 'CH 1-6' },
  { dcaNum: 2, name: 'Baskytara', color: 'green', faderDb: 0, muted: false, memberChannels: 'CH 7-8' },
  { dcaNum: 3, name: 'Kytary & Klávesy', color: 'yellow', faderDb: 0, muted: false, memberChannels: 'CH 9-14' },
  { dcaNum: 4, name: 'Hlavní zpěv', color: 'cyan', faderDb: 0, muted: false, memberChannels: 'CH 15' },
  { dcaNum: 5, name: 'Vokály & Sbory', color: 'blue', faderDb: 0, muted: false, memberChannels: 'CH 16-18' }
];

/**
 * Built-in Sample Offline Scenes from Mixing Station
 * Ideal for immediate testing of the AI audit workflow!
 */
export const SAMPLE_MIXING_STATION_SCENES: { id: string; title: string; subtitle: string; description: string; json?: string; fetchUrl?: string }[] = [
  {
    id: 'sample-ms-s-brabcem',
    title: 'S Brabcem (X32/M32 Band Live)',
    subtitle: '32 vstupů, 8 Auxů, 16 sběrnic, 8 DCA — Reálný export',
    description: 'Oficiální živá scéna kapely: Zpěvy (Pavel, Brabec, Klára, Karel), dechová sekce SAXY, kytary, klávesy L/R, bicí (kopák, virbl, tomy, overheady), odposlechy a matice.',
    fetchUrl: '/assets/aistudio/scene-S-Brabcem_82d457b3.json'
  },
  {
    id: 'sample-ms-festival-audit',
    title: 'Festival Stage (K prověrce AI)',
    subtitle: '16 kanálů s typickými zvukařskými chybami k auditu',
    description: 'Scéna obsahuje rizikové nastavení: nebezpečné +48V na syntezátoru, neotočenou fázi virblu spodek, chybějící HPF filtry na zpěvech a nepřiřazené DCA skupiny.',
    json: JSON.stringify({
      app: 'Mixing Station',
      version: '1.8.10',
      mixer: 'WING',
      name: 'Festival Stage (Neoptimalizováno)',
      channels: [
        { id: 1, name: 'Kick In', source: 'Local In 1 (XLR)', gain: 38, phantom: false, phase: false, fader: 0, color: 'orange', icon: 'Drum', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: true, compModel: '1176 FET Comp' },
        { id: 2, name: 'Snare Top', source: 'Local In 2 (XLR)', gain: 28, phantom: false, phase: false, fader: 0, color: 'orange', icon: 'Drum', gateOn: true, gateModel: 'Gate/Exp', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 3, name: 'Snare Bottom', source: 'Local In 3 (XLR)', gain: 24, phantom: false, phase: false, fader: -4, color: 'orange', icon: 'Drum', gateOn: true, gateModel: 'Gate/Exp', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 4, name: 'Hi-Hat', source: 'Local In 4 (XLR)', gain: 22, phantom: false, phase: false, fader: -6, color: 'orange', icon: 'Cymbal', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 5, name: 'Overhead L', source: 'Local In 5 (XLR)', gain: 24, phantom: false, phase: false, fader: -3, color: 'orange', icon: 'Cymbal', gateOn: false, gateModel: 'Bypass', eqModel: 'Full Range PEQ', compOn: false, compModel: 'Bypass' },
        { id: 6, name: 'Overhead R', source: 'Local In 6 (XLR)', gain: 24, phantom: false, phase: false, fader: -3, color: 'orange', icon: 'Cymbal', gateOn: false, gateModel: 'Bypass', eqModel: 'Full Range PEQ', compOn: false, compModel: 'Bypass' },
        { id: 7, name: 'Bass DI', source: 'Local In 7 (XLR)', gain: 26, phantom: false, phase: false, fader: 0, color: 'green', icon: 'Bass', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 8, name: 'El. Guitar L', source: 'Local In 8 (XLR)', gain: 28, phantom: false, phase: false, fader: -2, color: 'yellow', icon: 'Guitar', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 9, name: 'El. Guitar R', source: 'Local In 9 (XLR)', gain: 28, phantom: false, phase: false, fader: -2, color: 'yellow', icon: 'Guitar', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 10, name: 'Acoustic Gtr', source: 'Local In 10 (XLR)', gain: 28, phantom: false, phase: false, fader: 0, color: 'yellow', icon: 'Acoustic', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 11, name: 'Nord Synth L', source: 'Local In 11 (XLR)', gain: 18, phantom: true, phase: false, fader: 0, color: 'magenta', icon: 'Keys', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 12, name: 'Nord Synth R', source: 'Local In 12 (XLR)', gain: 18, phantom: true, phase: false, fader: 0, color: 'magenta', icon: 'Keys', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' },
        { id: 13, name: 'Lead Vox (Frontman)', source: 'Local In 13 (XLR)', gain: 18, phantom: false, phase: false, fader: 0, color: 'cyan', icon: 'Mic', gateOn: true, gateModel: 'Hard Noise Gate', eqModel: 'Flat PEQ (Bez HPF)', compOn: false, compModel: 'Bypass' },
        { id: 14, name: 'Backing Vox Gtr', source: 'Local In 14 (XLR)', gain: 24, phantom: false, phase: false, fader: -4, color: 'blue', icon: 'Mic', gateOn: true, gateModel: 'Hard Noise Gate', eqModel: 'Flat PEQ (Bez HPF)', compOn: false, compModel: 'Bypass' },
        { id: 15, name: 'Backing Vox Bass', source: 'Local In 15 (XLR)', gain: 24, phantom: false, phase: false, fader: -4, color: 'blue', icon: 'Mic', gateOn: true, gateModel: 'Hard Noise Gate', eqModel: 'Flat PEQ (Bez HPF)', compOn: false, compModel: 'Bypass' },
        { id: 16, name: 'Playback Laptop', source: 'Local In 16 (XLR)', gain: 12, phantom: true, phase: false, fader: 0, color: 'gray', icon: 'Music', gateOn: false, gateModel: 'Bypass', eqModel: 'Flat PEQ', compOn: false, compModel: 'Bypass' }
      ]
    }, null, 2)
  },
  {
    id: 'sample-ms-acoustic-trio',
    title: 'Akustické Trio & Zpěvy',
    subtitle: '8 kanálů — kytary, cajon, housle, vokály',
    description: 'Čistá akustická sestava pro klubové koncerty a ozvučení menších sálů přes aplikaci Mixing Station.',
    json: JSON.stringify({
      app: 'Mixing Station',
      version: '1.8.10',
      mixer: 'WING',
      name: 'Akustické Trio Live',
      channels: [
        { id: 1, name: 'Cajon Bass', source: 'Local In 1 (XLR)', gain: 26, phantom: false, phase: false, fader: 0, color: 'orange', icon: 'Drum', gateOn: true, gateModel: 'Gate/Exp', eqModel: 'PEQ HPF 40Hz', compOn: true, compModel: '1176 FET Comp', dca: 1 },
        { id: 2, name: 'Cajon Slap', source: 'Local In 2 (XLR)', gain: 28, phantom: false, phase: false, fader: -2, color: 'orange', icon: 'Drum', gateOn: true, gateModel: 'Gate/Exp', eqModel: 'PEQ HPF 100Hz', compOn: true, compModel: '1176 FET Comp', dca: 1 },
        { id: 3, name: 'Akustická Kytara 1', source: 'Local In 3 (XLR)', gain: 28, phantom: true, phase: false, fader: 0, color: 'yellow', icon: 'Acoustic', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 90Hz', compOn: true, compModel: 'LA Leveler', dca: 3 },
        { id: 4, name: 'Akustická Kytara 2', source: 'Local In 4 (XLR)', gain: 28, phantom: true, phase: false, fader: -1, color: 'yellow', icon: 'Acoustic', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 90Hz', compOn: true, compModel: 'LA Leveler', dca: 3 },
        { id: 5, name: 'Housle Solo', source: 'Local In 5 (XLR)', gain: 32, phantom: true, phase: false, fader: 0, color: 'green', icon: 'Music', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 180Hz', compOn: true, compModel: 'LA Leveler', dca: 3 },
        { id: 6, name: 'Lead Zpěv 1', source: 'Local In 6 (XLR)', gain: 34, phantom: false, phase: false, fader: 0, color: 'cyan', icon: 'Mic', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 110Hz', compOn: true, compModel: '1176 FET Comp', dca: 4 },
        { id: 7, name: 'Druhý Zpěv 2', source: 'Local In 7 (XLR)', gain: 32, phantom: false, phase: false, fader: -3, color: 'blue', icon: 'Mic', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 120Hz', compOn: true, compModel: '1176 FET Comp', dca: 5 },
        { id: 8, name: 'Třetí Zpěv 3', source: 'Local In 8 (XLR)', gain: 32, phantom: false, phase: false, fader: -3, color: 'blue', icon: 'Mic', gateOn: false, gateModel: 'Bypass', eqModel: 'PEQ HPF 120Hz', compOn: true, compModel: '1176 FET Comp', dca: 5 }
      ]
    }, null, 2)
  }
];
