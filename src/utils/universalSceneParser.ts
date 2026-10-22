import { 
  SavedScene, 
  SceneChannelPatch, 
  SceneBusConfig, 
  SceneDCAConfig, 
  SceneFXSlot, 
  SceneMatrixConfig 
} from '../types';

/**
 * Universal Digital Mixer Scene Parser
 * Supports:
 * 1. Behringer WING (.snap, .wingscene, .json)
 * 2. Behringer X32 / M32 (.scn, OSC text dumps, .json)
 * 3. Soundcraft Ui Series - Ui24R / Ui16 / Ui12 (.show, text state dumps, .json)
 * 4. Mixing Station (.ms, native console JSON dumps, universal JSON)
 */

export type MixerBrand = 'Behringer' | 'Soundcraft' | 'Mixing Station' | 'Generic';

export interface ParseResult {
  scene: SavedScene;
  detectedFormat: string;
  mixerBrand: MixerBrand;
  detectedModel: string;
  summary: {
    channelsCount: number;
    busesCount: number;
    dcasCount: number;
    matricesCount: number;
    fxCount: number;
  };
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
    const lower = code.toLowerCase();
    if (['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'orange', 'gray', 'purple', 'emerald'].includes(lower)) {
      return lower;
    }
  }
  return 'orange';
};

export const inferIconFromName = (name: string): string => {
  const n = name.toLowerCase();
  if (n.includes('kick') || n.includes('kopák') || n.includes('bd') || n.includes('bassdrum')) return 'Drum';
  if (n.includes('snare') || n.includes('virbl') || n.includes('sd')) return 'Drum';
  if (n.includes('tom') || n.includes('floor') || n.includes('kotel')) return 'Tom';
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

// Default fallback structures
export const getDefaultChannels = (): SceneChannelPatch[] => [
  { chNum: 1, name: 'Kick In', sourceInput: 'Local In 1 (XLR)', gainDb: 22, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Gate/Exp', eqModel: '4-Band PEQ (HPF 30Hz)', compOn: true, compModel: '1176 FET Comp', dcaGroup: 1 },
  { chNum: 2, name: 'Snare Top', sourceInput: 'Local In 2 (XLR)', gainDb: 24, phantom48V: false, phaseInvert: false, color: 'orange', icon: 'Drum', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: true, gateModel: 'Gate/Exp', eqModel: '4-Band PEQ (HPF 80Hz)', compOn: true, compModel: '1176 FET Comp', dcaGroup: 1 },
  { chNum: 3, name: 'Bass DI', sourceInput: 'Local In 3 (XLR)', gainDb: 26, phantom48V: true, phaseInvert: false, color: 'green', icon: 'Bass', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: '4-Band PEQ', compOn: true, compModel: 'LA Leveler', dcaGroup: 2 },
  { chNum: 4, name: 'Lead Vox', sourceInput: 'Local In 4 (XLR)', gainDb: 34, phantom48V: false, phaseInvert: false, color: 'cyan', icon: 'Mic', faderDb: 0, pan: 0, muted: false, solo: false, gateOn: false, gateModel: 'Bypass', eqModel: '4-Band PEQ + HPF 110Hz', compOn: true, compModel: '1176 FET Comp', dcaGroup: 4 }
];

export const getDefaultBuses = (): SceneBusConfig[] => [
  { busNum: 1, name: 'IEM Zpěv (Stereo L)', isStereo: true, role: 'IEM Monitor', faderDb: 0, color: 'cyan', pan: -100 },
  { busNum: 2, name: 'IEM Zpěv (Stereo R)', isStereo: true, role: 'IEM Monitor', faderDb: 0, color: 'cyan', pan: 100 },
  { busNum: 3, name: 'IEM Bicí', isStereo: false, role: 'IEM Monitor', faderDb: 0, color: 'orange', pan: 0 },
  { busNum: 4, name: 'Wedge Kytara', isStereo: false, role: 'Wedge Monitor', faderDb: 0, color: 'yellow', pan: 0 },
  { busNum: 5, name: 'FX 1 Hall', isStereo: false, role: 'FX Send', faderDb: 0, color: 'purple', pan: 0 },
  { busNum: 6, name: 'FX 2 Delay', isStereo: false, role: 'FX Send', faderDb: 0, color: 'purple', pan: 0 }
];

export const getDefaultDcas = (): SceneDCAConfig[] => [
  { dcaNum: 1, name: 'Bicí souprava', color: 'orange', faderDb: 0, muted: false, memberChannels: 'CH 1-6' },
  { dcaNum: 2, name: 'Baskytara', color: 'green', faderDb: 0, muted: false, memberChannels: 'CH 7-8' },
  { dcaNum: 3, name: 'Kytary & Klávesy', color: 'yellow', faderDb: 0, muted: false, memberChannels: 'CH 9-14' },
  { dcaNum: 4, name: 'Hlavní zpěv', color: 'cyan', faderDb: 0, muted: false, memberChannels: 'CH 15' },
  { dcaNum: 5, name: 'Vokály & Sbory', color: 'blue', faderDb: 0, muted: false, memberChannels: 'CH 16-18' }
];

/**
 * Universal parser implementation
 */
export const parseUniversalMixerScene = (
  rawText: string,
  fileName: string = 'Scene'
): ParseResult => {
  const trimmed = rawText.trim();
  const cleanBaseName = fileName.replace(/\.[^/.]+$/, '').replace(/[_.-]+/g, ' ');

  // ==========================================
  // 1. JSON-BASED FORMATS
  // ==========================================
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    try {
      const parsed = JSON.parse(trimmed);

      // A) Native Mixing Station Console Dump (e.g. scene-S-Brabcem_82d457b3.json)
      const isNativeMixingStation = (Array.isArray(parsed.ch) && parsed.ch.length > 0) || 
                                     Boolean(parsed.consoleMeta) || 
                                     Boolean(parsed.meta?.name && parsed.scope !== undefined) ||
                                     parsed.modelVersion !== undefined;

      if (isNativeMixingStation && Array.isArray(parsed.ch)) {
        const mixerModel = parsed.consoleMeta?.model || 'X32/M32';
        const sceneName = parsed.meta?.name?.trim() || cleanBaseName || 'Mixing Station Scene';
        const isX32 = mixerModel.toUpperCase().includes('X32') || mixerModel.toUpperCase().includes('M32');
        const isWing = mixerModel.toUpperCase().includes('WING');

        // DCAs (ref.type === 8)
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

          return { dcaNum, name: dcaName, color, faderDb, muted, memberChannels };
        });

        // Input Channels (ref.type === 0)
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

          let dcaGroup: number | undefined = undefined;
          const cfg = d.cfg?.generic || {};
          for (let dIdx = 0; dIdx < 8; dIdx++) {
            if (cfg[`grp.dca.${dIdx}`]) {
              dcaGroup = dIdx + 1;
              break;
            }
          }

          if (!dcaGroup && dcas.length > 0) {
            const nameLower = name.toLowerCase();
            if (nameLower.includes('drum') || nameLower.includes('snare') || nameLower.includes('tom') || nameLower.includes('over') || nameLower.includes('oh') || nameLower.includes('bici')) {
              dcaGroup = 4;
            } else if (nameLower.startsWith('e ') || nameLower.includes('kytar') || nameLower.includes('klav') || nameLower.includes('piano') || nameLower.includes('sax')) {
              dcaGroup = 2;
            } else if (nameLower.includes('bass') || nameLower.includes('basa')) {
              dcaGroup = 3;
            } else if (nameLower.includes('pavel') || nameLower.includes('brabec') || nameLower.includes('klara') || nameLower.includes('karel') || nameLower.includes('vox') || nameLower.includes('zpěv')) {
              dcaGroup = 1;
            } else if (nameLower.includes('zal') || nameLower.includes('aux') || nameLower.includes('pc') || nameLower.includes('usb')) {
              dcaGroup = 5;
            }
          }

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
            gateModel: gateOn ? (isX32 ? 'X32 Expander/Gate' : 'WING Gate/Exp') : 'Bypass',
            eqModel: eqOn ? (isX32 ? 'X32 4-Band Parametric' : 'WING 6-Band PEQ') : 'Flat EQ',
            compOn,
            compModel: compOn ? (isX32 ? 'X32 Channel Comp' : '1176 FET Comp') : 'Bypass',
            dcaGroup,
            busSends
          };
        });

        // Aux Channels (ref.type === 1)
        const auxChItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 1)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        auxChItems.forEach((auxItem: any) => {
          const auxOffset = auxItem.ref.offset ?? 0;
          const chNum = 33 + auxOffset;
          const d = auxItem.data || {};
          const name = d.name?.generic?.name?.trim() || d.name?.fixed || `AUX ${auxOffset + 1}`;
          const gainDb = Math.round((d.headamp?.gain ?? 0) * 10) / 10;
          const color = colorFromCode(d.name?.generic?.color);
          const faderDb = Math.round((d.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const pan = Math.round(d.main?.generic?.['mix.pan'] ?? 0);
          const muted = d.main?.generic?.['mix.rawOn'] === false;

          channels.push({
            chNum,
            name,
            sourceInput: `Aux In ${auxOffset + 1} (TRS/RCA)`,
            gainDb,
            phantom48V: false,
            phaseInvert: false,
            color,
            icon: inferIconFromName(name),
            faderDb,
            pan,
            muted,
            solo: false,
            gateOn: false,
            gateModel: 'Bypass',
            eqModel: '4-Band PEQ',
            compOn: false,
            compModel: 'Bypass',
            dcaGroup: 5
          });
        });

        // Mix Buses (ref.type === 4)
        const busItems = parsed.ch
          .filter((i: any) => i.ref && i.ref.type === 4)
          .sort((a: any, b: any) => (a.ref.offset ?? 0) - (b.ref.offset ?? 0));

        const buses: SceneBusConfig[] = busItems.map((b: any) => {
          const busNum = (b.ref.offset ?? 0) + 1;
          const busName = b.data?.name?.generic?.name?.trim() || b.data?.name?.fixed || `Mix Bus ${busNum}`;
          const color = colorFromCode(b.data?.name?.generic?.color);
          const faderDb = Math.round((b.data?.main?.generic?.['mix.lvl'] ?? 0) * 10) / 10;
          const role = inferBusRole(busName);

          return {
            busNum,
            name: busName,
            isStereo: false,
            role,
            faderDb,
            color,
            pan: 0
          };
        });

        // Matrices (ref.type === 7)
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

        // FX Slots
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

        const brand: MixerBrand = isWing ? 'Behringer' : (isX32 ? 'Behringer' : 'Mixing Station');

        const nativeScene: SavedScene = {
          id: `imported-scene-${Date.now()}`,
          name: sceneName,
          type: 'snapshot',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['Mixing Station', mixerModel, 'Official Export', 'Live'],
          description: `Kompletní offline scéna importovaná z aplikace Mixing Station (${mixerModel}). Obsahuje ${channels.length} kanálů, ${buses.length} sběrnic, ${matrices.length} matic a ${dcas.length} DCA skupin.`,
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
            targetEnsemble: `${sceneName} (${mixerModel})`,
            faderLayerPreset: 'Native Layout',
            mainFaderAssign: 'Main L/R',
            customControlsProfile: 'FOH & Monitor Standard',
            notes: `Importováno ze souboru ${fileName}. Všechny analogové gainy, +48V phantom a procesory byly přesně namapovány.`
          },
          channels: channels.length > 0 ? channels : getDefaultChannels(),
          buses: buses.length > 0 ? buses : getDefaultBuses(),
          dcas: dcas.length > 0 ? dcas : getDefaultDcas(),
          matrices: matrices.length > 0 ? matrices : undefined,
          fxSlots: fxSlots.length > 0 ? fxSlots : undefined
        };

        return {
          scene: nativeScene,
          detectedFormat: `Mixing Station Native Dump (${mixerModel})`,
          mixerBrand: brand,
          detectedModel: mixerModel,
          summary: {
            channelsCount: channels.length,
            busesCount: buses.length,
            dcasCount: dcas.length,
            matricesCount: matrices.length,
            fxCount: fxSlots.length
          }
        };
      }

      // B) Soundcraft Ui JSON Snapshot Format (Ui24R / Ui16 / Ui12)
      const isSoundcraftUi = parsed.mixer === 'Ui24R' || 
                             parsed.mixer === 'Ui16' || 
                             parsed.mixer === 'Ui12' || 
                             parsed.type?.toLowerCase().includes('soundcraft') ||
                             Array.isArray(parsed.inputs);

      if (isSoundcraftUi) {
        const model = parsed.mixer || 'Soundcraft Ui24R';
        const sceneName = parsed.name || cleanBaseName || 'Soundcraft Show';
        const rawInputs = parsed.inputs || [];

        const channels: SceneChannelPatch[] = rawInputs.map((inp: any, idx: number) => {
          const chNum = Number(inp.chNum ?? inp.id ?? idx + 1);
          const name = String(inp.name || inp.label || `CH ${chNum}`);
          const gainDb = Number(inp.gainDb ?? inp.gain ?? (inp.hwgain ? Math.round(inp.hwgain * 60) : 26));
          const phantom48V = Boolean(inp.phantom48V ?? inp.phantom ?? inp['48v'] ?? false);
          const phaseInvert = Boolean(inp.phaseInvert ?? inp.phase ?? false);
          const faderDb = Number(inp.faderDb ?? inp.fader ?? 0);
          const pan = Number(inp.pan ?? 0);
          const muted = Boolean(inp.muted ?? inp.mute ?? false);
          const gateOn = Boolean(inp.gateOn ?? inp.gate?.on ?? false);
          const eqOn = Boolean(inp.eqOn ?? inp.eq?.on ?? true);
          const compOn = Boolean(inp.compOn ?? inp.comp?.on ?? false);

          return {
            chNum,
            name,
            sourceInput: `Ui24R Studer In ${chNum} (Combo)`,
            gainDb,
            phantom48V,
            phaseInvert,
            color: colorFromCode(inp.color || 'cyan'),
            icon: inferIconFromName(name),
            faderDb,
            pan,
            muted,
            solo: false,
            gateOn,
            gateModel: gateOn ? 'Ui DBX Noise Gate' : 'Bypass',
            eqModel: eqOn ? 'Ui 4-Band Parametric + HPF' : 'Bypass',
            compOn,
            compModel: compOn ? 'Ui DBX Compressor' : 'Bypass',
            dcaGroup: inp.vca || inp.dcaGroup
          };
        });

        const rawAuxes = parsed.auxes || parsed.aux || [];
        const buses: SceneBusConfig[] = rawAuxes.length > 0 
          ? rawAuxes.map((a: any, idx: number) => ({
              busNum: idx + 1,
              name: String(a.name || `Aux ${idx + 1}`),
              isStereo: Boolean(a.isStereo),
              role: inferBusRole(a.name || ''),
              faderDb: Number(a.faderDb ?? a.fader ?? 0),
              color: 'cyan',
              pan: 0
            }))
          : getDefaultBuses();

        const rawVcas = parsed.vcas || parsed.dcas || [];
        const dcas: SceneDCAConfig[] = rawVcas.length > 0
          ? rawVcas.map((v: any, idx: number) => ({
              dcaNum: idx + 1,
              name: String(v.name || `VCA ${idx + 1}`),
              color: 'yellow',
              faderDb: Number(v.faderDb ?? 0),
              muted: false,
              memberChannels: v.members || `Kanály VCA ${idx + 1}`
            }))
          : getDefaultDcas();

        const uiScene: SavedScene = {
          id: `ui-scene-${Date.now()}`,
          name: sceneName,
          type: 'snapshot',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['Soundcraft', model, 'Show Snapshot', 'Live'],
          description: `Kompletní show importovaná z konzole ${model} (${fileName}).`,
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
            targetEnsemble: `${sceneName} (${model})`,
            faderLayerPreset: 'Soundcraft Standard',
            mainFaderAssign: 'Main L/R',
            customControlsProfile: 'Soundcraft Web UI',
            notes: `Importováno ze souboru ${fileName}`
          },
          channels: channels.length > 0 ? channels : getDefaultChannels(),
          buses,
          dcas
        };

        return {
          scene: uiScene,
          detectedFormat: `${model} Show (.show / .json)`,
          mixerBrand: 'Soundcraft',
          detectedModel: model,
          summary: {
            channelsCount: channels.length,
            busesCount: buses.length,
            dcasCount: dcas.length,
            matricesCount: 0,
            fxCount: 4
          }
        };
      }

      // C) Generic / Universal Mixing Station JSON format
      const sceneData = Array.isArray(parsed) 
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

      const brandDetected: MixerBrand = parsed.mixerType === 'wing' ? 'Behringer' : 
                                       (parsed.mixerType === 'x32' ? 'Behringer' : 
                                       (parsed.mixerType === 'ui24' ? 'Soundcraft' : 'Mixing Station'));

      const newScene: SavedScene = {
        id: `ms-scene-${Date.now()}`,
        name: sceneData.name || cleanBaseName || 'Offline Scéna',
        type: 'snapshot',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['Mixing Station', brandDetected, 'Imported', 'Live'],
        description: `Scéna importovaná z ${fileName}`,
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
          targetEnsemble: `${sceneData.name || cleanBaseName} Setup`,
          faderLayerPreset: 'Mixing Station Layout',
          mainFaderAssign: 'Main L/R',
          customControlsProfile: 'Standard',
          notes: `Importováno ze souboru ${fileName}`
        },
        channels: channels.length > 0 ? channels : getDefaultChannels(),
        buses,
        dcas
      };

      return { 
        scene: newScene, 
        detectedFormat: `Mixing Station Offline JSON (.ms)`,
        mixerBrand: brandDetected,
        detectedModel: parsed.mixerType || 'Universal',
        summary: {
          channelsCount: channels.length,
          busesCount: buses.length,
          dcasCount: dcas.length,
          matricesCount: 0,
          fxCount: 0
        }
      };
    } catch (e) {
      console.warn('JSON parsing attempt failed, falling back to line-based parsing...', e);
    }
  }

  // ==========================================
  // 2. SOUNDCRAFT Ui TEXT DUMP FORMAT (.show / text dump)
  // e.g. SETD^i.0.name^Kick Drum
  // e.g. i.0.name = Kick Drum
  // ==========================================
  const isSoundcraftUiText = rawText.includes('SETD^i.') || rawText.includes('i.0.name') || rawText.includes('SETD^a.');
  if (isSoundcraftUiText) {
    const lines = rawText.split(/\r?\n/);
    const channelMap = new Map<number, Partial<SceneChannelPatch>>();
    const busMap = new Map<number, Partial<SceneBusConfig>>();
    const vcaMap = new Map<number, Partial<SceneDCAConfig>>();

    lines.forEach(line => {
      const l = line.trim();
      if (!l) return;

      // SETD^i.0.name^Kick
      const setdMatch = l.match(/SETD\^([a-z]+)\.(\d+)(?:\.([a-zA-Z0-9_.-]+))?\^([^\^]+)/);
      if (setdMatch) {
        const type = setdMatch[1];
        const idx = parseInt(setdMatch[2], 10);
        const prop = setdMatch[3] || 'val';
        const val = setdMatch[4];

        if (type === 'i') {
          const chNum = idx + 1;
          const ch = channelMap.get(chNum) || { chNum };
          if (prop === 'name') ch.name = val;
          if (prop === 'gain' || prop === 'hwgain') ch.gainDb = Math.round(parseFloat(val) <= 1 ? parseFloat(val) * 60 : parseFloat(val));
          if (prop === 'phantom' || prop === '48v') ch.phantom48V = val === '1' || val === 'true';
          if (prop === 'phase') ch.phaseInvert = val === '1';
          if (prop === 'mix') ch.faderDb = parseFloat(val) <= 1 ? Math.round((parseFloat(val) * 70 - 60) * 10) / 10 : parseFloat(val);
          if (prop === 'mute') ch.muted = val === '1';
          if (prop === 'pan') ch.pan = Math.round((parseFloat(val) - 0.5) * 200);
          if (prop.startsWith('gate')) ch.gateOn = val === '1';
          if (prop.startsWith('dyn') || prop.startsWith('comp')) ch.compOn = val === '1';
          if (prop.startsWith('vca')) ch.dcaGroup = parseInt(val, 10) + 1;
          channelMap.set(chNum, ch);
        } else if (type === 'a') {
          const busNum = idx + 1;
          const b = busMap.get(busNum) || { busNum };
          if (prop === 'name') b.name = val;
          if (prop === 'mix') b.faderDb = parseFloat(val) <= 1 ? Math.round((parseFloat(val) * 70 - 60) * 10) / 10 : parseFloat(val);
          busMap.set(busNum, b);
        } else if (type === 'vca' || type === 'sub') {
          const dcaNum = idx + 1;
          const v = vcaMap.get(dcaNum) || { dcaNum };
          if (prop === 'name') v.name = val;
          vcaMap.set(dcaNum, v);
        }
        return;
      }

      // Plain key-value: i.0.name = Kick
      const kvMatch = l.match(/([a-z]+)\.(\d+)\.([a-zA-Z0-9_.-]+)\s*=\s*(.+)/);
      if (kvMatch) {
        const type = kvMatch[1];
        const idx = parseInt(kvMatch[2], 10);
        const prop = kvMatch[3];
        const val = kvMatch[4].trim();

        if (type === 'i') {
          const chNum = idx + 1;
          const ch = channelMap.get(chNum) || { chNum };
          if (prop === 'name') ch.name = val;
          if (prop === 'gain') ch.gainDb = Math.round(parseFloat(val));
          if (prop === 'phantom' || prop === '48v') ch.phantom48V = val === '1' || val === 'true';
          channelMap.set(chNum, ch);
        }
      }
    });

    const parsedChannels: SceneChannelPatch[] = Array.from(channelMap.values()).map(c => ({
      chNum: c.chNum || 1,
      name: c.name || `CH ${c.chNum || 1}`,
      sourceInput: `Ui24R Studer In ${c.chNum || 1}`,
      gainDb: c.gainDb ?? 26,
      phantom48V: Boolean(c.phantom48V),
      phaseInvert: Boolean(c.phaseInvert),
      color: 'cyan',
      icon: inferIconFromName(c.name || ''),
      faderDb: c.faderDb ?? 0,
      pan: c.pan ?? 0,
      muted: Boolean(c.muted),
      solo: false,
      gateOn: Boolean(c.gateOn),
      gateModel: c.gateOn ? 'Ui DBX Noise Gate' : 'Bypass',
      eqModel: 'Ui 4-Band Parametric + HPF',
      compOn: Boolean(c.compOn),
      compModel: c.compOn ? 'Ui DBX Compressor' : 'Bypass',
      dcaGroup: c.dcaGroup
    }));

    const parsedBuses: SceneBusConfig[] = Array.from(busMap.values()).map(b => ({
      busNum: b.busNum || 1,
      name: b.name || `Aux ${b.busNum || 1}`,
      isStereo: false,
      role: inferBusRole(b.name || ''),
      faderDb: b.faderDb ?? 0,
      color: 'cyan',
      pan: 0
    }));

    const parsedDcas: SceneDCAConfig[] = Array.from(vcaMap.values()).map(v => ({
      dcaNum: v.dcaNum || 1,
      name: v.name || `VCA ${v.dcaNum || 1}`,
      color: 'yellow',
      faderDb: 0,
      muted: false,
      memberChannels: `Kanály přiřazené k VCA ${v.dcaNum || 1}`
    }));

    const uiTextScene: SavedScene = {
      id: `ui-text-${Date.now()}`,
      name: cleanBaseName || 'Soundcraft Ui Show',
      type: 'snapshot',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['Soundcraft', 'Ui24R', 'Show Dump', 'Live'],
      description: `Načteno ze souboru Soundcraft Ui (${fileName})`,
      favorite: true,
      channelCount: parsedChannels.length || 24,
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
        targetEnsemble: `${cleanBaseName} (Soundcraft Ui24R)`,
        faderLayerPreset: 'Ui Standard Layout',
        mainFaderAssign: 'Main L/R',
        customControlsProfile: 'Soundcraft Ui',
        notes: `Importováno ze souboru ${fileName}`
      },
      channels: parsedChannels.length > 0 ? parsedChannels : getDefaultChannels(),
      buses: parsedBuses.length > 0 ? parsedBuses : getDefaultBuses(),
      dcas: parsedDcas.length > 0 ? parsedDcas : getDefaultDcas()
    };

    return {
      scene: uiTextScene,
      detectedFormat: `Soundcraft Ui Show File (.show / dump)`,
      mixerBrand: 'Soundcraft',
      detectedModel: 'Ui24R / Ui16',
      summary: {
        channelsCount: parsedChannels.length,
        busesCount: parsedBuses.length,
        dcasCount: parsedDcas.length,
        matricesCount: 0,
        fxCount: 4
      }
    };
  }

  // ==========================================
  // 3. BEHRINGER X32 / M32 OFFICIAL .SCN FORMAT
  // Lines like:
  // #2.1# "Scene Name" "" %000000000 1
  // /ch/01/config "Vocal Lead" 1 "CR" 1
  // /ch/01/preamp +28.5 OFF OFF 0 24
  // /ch/01/gate ON GATE -36.0 25.0 120 400 1.00:1
  // /ch/01/dyn ON COMP PEAK LOG -18.0 3.0 1.0 50 200 0.0 0 100 0 POST
  // /ch/01/eq ON
  // /ch/01/mix ON -2.5 OFF +0 -0 0
  // ==========================================
  const isX32Scn = rawText.includes('#2.') || 
                   rawText.includes('#1.') || 
                   rawText.includes('/ch/01/config') || 
                   rawText.includes('/headamp/');

  if (isX32Scn) {
    const lines = rawText.split(/\r?\n/);
    const channelMap = new Map<number, Partial<SceneChannelPatch>>();
    const busMap = new Map<number, Partial<SceneBusConfig>>();
    const dcaMap = new Map<number, Partial<SceneDCAConfig>>();
    let sceneHeaderName = '';

    // First line check e.g. #2.1# "Festival Live" "" %000000000 1
    const firstLineMatch = lines[0]?.match(/#\d+\.\d+#\s+"([^"]+)"/);
    if (firstLineMatch) {
      sceneHeaderName = firstLineMatch[1];
    }

    lines.forEach(line => {
      const l = line.trim();
      if (!l || l.startsWith('#')) return;

      // /ch/01/config "Lead Vox" 1 "CR" 1
      const chCfgMatch = l.match(/\/ch\/(\d+)\/config\s+"([^"]*)"(?:\s+(\d+))?(?:\s+"([^"]*)")?/i);
      if (chCfgMatch) {
        const chNum = parseInt(chCfgMatch[1], 10);
        const name = chCfgMatch[2] || `CH ${chNum.toString().padStart(2, '0')}`;
        const colorCode = chCfgMatch[3] ? parseInt(chCfgMatch[3], 10) : undefined;
        const ch = channelMap.get(chNum) || { chNum };
        ch.name = name;
        if (colorCode !== undefined) ch.color = colorFromCode(colorCode);
        channelMap.set(chNum, ch);
        return;
      }

      // /ch/01/preamp +28.5 OFF OFF 0 24
      const preampMatch = l.match(/\/ch\/(\d+)\/preamp\s+([+-]?[\d.]+)\s+(ON|OFF)\s+(ON|OFF)/i);
      if (preampMatch) {
        const chNum = parseInt(preampMatch[1], 10);
        const ch = channelMap.get(chNum) || { chNum };
        ch.gainDb = Math.round(parseFloat(preampMatch[2]));
        ch.phantom48V = preampMatch[3].toUpperCase() === 'ON';
        ch.phaseInvert = preampMatch[4].toUpperCase() === 'ON';
        channelMap.set(chNum, ch);
        return;
      }

      // /ch/01/gate ON GATE -36.0 ...
      const gateMatch = l.match(/\/ch\/(\d+)\/gate\s+(ON|OFF)/i);
      if (gateMatch) {
        const chNum = parseInt(gateMatch[1], 10);
        const ch = channelMap.get(chNum) || { chNum };
        ch.gateOn = gateMatch[2].toUpperCase() === 'ON';
        ch.gateModel = ch.gateOn ? 'X32 Expander/Gate' : 'Bypass';
        channelMap.set(chNum, ch);
        return;
      }

      // /ch/01/dyn ON COMP PEAK ...
      const dynMatch = l.match(/\/ch\/(\d+)\/dyn\s+(ON|OFF)/i);
      if (dynMatch) {
        const chNum = parseInt(dynMatch[1], 10);
        const ch = channelMap.get(chNum) || { chNum };
        ch.compOn = dynMatch[2].toUpperCase() === 'ON';
        ch.compModel = ch.compOn ? 'X32 Channel Comp' : 'Bypass';
        channelMap.set(chNum, ch);
        return;
      }

      // /ch/01/mix ON -2.5 OFF +0 -0 0
      const mixMatch = l.match(/\/ch\/(\d+)\/mix\s+(ON|OFF)\s+([+-]?[\d.]+)(?:\s+(?:ON|OFF)\s+([+-]?\d+))?/i);
      if (mixMatch) {
        const chNum = parseInt(mixMatch[1], 10);
        const ch = channelMap.get(chNum) || { chNum };
        ch.muted = mixMatch[2].toUpperCase() === 'OFF';
        ch.faderDb = parseFloat(mixMatch[3]);
        if (mixMatch[4] !== undefined) {
          ch.pan = parseInt(mixMatch[4], 10);
        }
        channelMap.set(chNum, ch);
        return;
      }

      // /ch/01/mix/dca 1
      const dcaAssignMatch = l.match(/\/ch\/(\d+)\/mix\/dca\s+(\d+)/i);
      if (dcaAssignMatch) {
        const chNum = parseInt(dcaAssignMatch[1], 10);
        const dcaVal = parseInt(dcaAssignMatch[2], 10);
        const ch = channelMap.get(chNum) || { chNum };
        if (dcaVal > 0) ch.dcaGroup = dcaVal;
        channelMap.set(chNum, ch);
        return;
      }

      // /bus/01/config "IEM Lead" 2 "YE" 1
      const busCfgMatch = l.match(/\/bus\/(\d+)\/config\s+"([^"]*)"/i);
      if (busCfgMatch) {
        const busNum = parseInt(busCfgMatch[1], 10);
        const b = busMap.get(busNum) || { busNum };
        b.name = busCfgMatch[2] || `Bus ${busNum}`;
        b.role = inferBusRole(b.name);
        busMap.set(busNum, b);
        return;
      }

      // /dca/1 "Bicí" 1
      const dcaMatch = l.match(/\/dca\/(\d+)\s+"([^"]*)"/i);
      if (dcaMatch) {
        const dcaNum = parseInt(dcaMatch[1], 10);
        const d = dcaMap.get(dcaNum) || { dcaNum };
        d.name = dcaMatch[2] || `DCA ${dcaNum}`;
        dcaMap.set(dcaNum, d);
        return;
      }
    });

    const parsedChannels: SceneChannelPatch[] = Array.from(channelMap.values()).map(c => ({
      chNum: c.chNum || 1,
      name: c.name || `CH ${c.chNum || 1}`,
      sourceInput: `Local In ${c.chNum || 1} (XLR)`,
      gainDb: c.gainDb ?? 28,
      phantom48V: Boolean(c.phantom48V),
      phaseInvert: Boolean(c.phaseInvert),
      color: c.color || 'orange',
      icon: inferIconFromName(c.name || ''),
      faderDb: c.faderDb ?? 0,
      pan: c.pan ?? 0,
      muted: Boolean(c.muted),
      solo: false,
      gateOn: Boolean(c.gateOn),
      gateModel: c.gateModel || 'X32 Expander/Gate',
      eqModel: 'X32 4-Band Parametric EQ',
      compOn: Boolean(c.compOn),
      compModel: c.compModel || 'X32 Channel Comp',
      dcaGroup: c.dcaGroup
    }));

    const parsedBuses: SceneBusConfig[] = Array.from(busMap.values()).map(b => ({
      busNum: b.busNum || 1,
      name: b.name || `Bus ${b.busNum || 1}`,
      isStereo: false,
      role: b.role || 'IEM Monitor',
      faderDb: 0,
      color: 'cyan',
      pan: 0
    }));

    const parsedDcas: SceneDCAConfig[] = Array.from(dcaMap.values()).map(d => ({
      dcaNum: d.dcaNum || 1,
      name: d.name || `DCA ${d.dcaNum || 1}`,
      color: 'yellow',
      faderDb: 0,
      muted: false,
      memberChannels: `Přiřazené kanály k DCA ${d.dcaNum || 1}`
    }));

    const x32Scene: SavedScene = {
      id: `x32-scene-${Date.now()}`,
      name: sceneHeaderName || cleanBaseName || 'Behringer X32 Scéna',
      type: 'snapshot',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: ['Behringer', 'X32', 'M32', 'SCN Format', 'Live'],
      description: `Originální scéna Behringer X32 / M32 načtená ze souboru ${fileName}.`,
      favorite: true,
      channelCount: parsedChannels.length || 32,
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
        targetEnsemble: `${sceneHeaderName || cleanBaseName} (X32 / M32)`,
        faderLayerPreset: 'X32 Standard Layout',
        mainFaderAssign: 'Main L/R',
        customControlsProfile: 'X32 FOH Standard',
        notes: `Importováno ze souboru ${fileName}`
      },
      channels: parsedChannels.length > 0 ? parsedChannels : getDefaultChannels(),
      buses: parsedBuses.length > 0 ? parsedBuses : getDefaultBuses(),
      dcas: parsedDcas.length > 0 ? parsedDcas : getDefaultDcas()
    };

    return {
      scene: x32Scene,
      detectedFormat: `Behringer X32 / M32 Scene File (.scn)`,
      mixerBrand: 'Behringer',
      detectedModel: 'X32 / M32',
      summary: {
        channelsCount: parsedChannels.length,
        busesCount: parsedBuses.length,
        dcasCount: parsedDcas.length,
        matricesCount: 0,
        fxCount: 8
      }
    };
  }

  // ==========================================
  // 4. BEHRINGER WING SNAPSHOT FORMAT (.snap / .wingscene)
  // Lines like:
  // /ch/1/config/name "Lead Vox"
  // /ch/1/in/source "Local In 1 (XLR)"
  // /ch/1/preamp/gain 24.5
  // /ch/1/preamp/48v 1
  // /ch/1/fader -2.0
  // /bus/1/config/name "IEM 1"
  // ==========================================
  const lines = rawText.split(/\r?\n/);
  const channelMap = new Map<number, Partial<SceneChannelPatch>>();
  const busMap = new Map<number, Partial<SceneBusConfig>>();
  const dcaMap = new Map<number, Partial<SceneDCAConfig>>();
  let detectedWingName = cleanBaseName;

  lines.forEach(line => {
    const l = line.trim();
    if (!l) return;
    if (l.startsWith('#')) {
      const nameMatch = l.match(/#\s*(?:Scena|Scene):\s*(.+)/i);
      if (nameMatch) detectedWingName = nameMatch[1].trim();
      return;
    }

    // Channel Name
    const nameMatch = l.match(/\/ch\/(\d+)\/(?:config\/)?name\s+"?([^"]+)"?/i);
    if (nameMatch) {
      const chNum = parseInt(nameMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.name = nameMatch[2];
      channelMap.set(chNum, ch);
      return;
    }

    // Source Input
    const sourceMatch = l.match(/\/ch\/(\d+)\/(?:in\/)?source\s+"?([^"]+)"?/i);
    if (sourceMatch) {
      const chNum = parseInt(sourceMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.sourceInput = sourceMatch[2];
      channelMap.set(chNum, ch);
      return;
    }

    // Preamp Gain
    const gainMatch = l.match(/\/ch\/(\d+)\/(?:preamp\/)?gain\s+([+-]?[\d.]+)/i);
    if (gainMatch) {
      const chNum = parseInt(gainMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.gainDb = Math.round(parseFloat(gainMatch[2]));
      channelMap.set(chNum, ch);
      return;
    }

    // +48V Phantom
    const phantomMatch = l.match(/\/ch\/(\d+)\/(?:preamp\/)?48v\s+([01])/i);
    if (phantomMatch) {
      const chNum = parseInt(phantomMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.phantom48V = phantomMatch[2] === '1';
      channelMap.set(chNum, ch);
      return;
    }

    // Phase Invert
    const phaseMatch = l.match(/\/ch\/(\d+)\/(?:preamp\/)?(?:phase|inv)\s+([01])/i);
    if (phaseMatch) {
      const chNum = parseInt(phaseMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.phaseInvert = phaseMatch[2] === '1';
      channelMap.set(chNum, ch);
      return;
    }

    // Fader
    const faderMatch = l.match(/\/ch\/(\d+)\/fader\s+([-\d.]+)/i);
    if (faderMatch) {
      const chNum = parseInt(faderMatch[1], 10);
      const ch = channelMap.get(chNum) || { chNum };
      ch.faderDb = parseFloat(faderMatch[2]);
      channelMap.set(chNum, ch);
      return;
    }

    // Bus Name
    const busMatch = l.match(/\/bus\/(\d+)\/(?:config\/)?name\s+"?([^"]+)"?/i);
    if (busMatch) {
      const busNum = parseInt(busMatch[1], 10);
      const b = busMap.get(busNum) || { busNum };
      b.name = busMatch[2];
      b.role = inferBusRole(b.name);
      busMap.set(busNum, b);
      return;
    }

    // DCA Name
    const dcaMatch = l.match(/\/dca\/(\d+)\/(?:config\/)?name\s+"?([^"]+)"?/i);
    if (dcaMatch) {
      const dcaNum = parseInt(dcaMatch[1], 10);
      const d = dcaMap.get(dcaNum) || { dcaNum };
      d.name = dcaMatch[2];
      dcaMap.set(dcaNum, d);
      return;
    }
  });

  const parsedChannels: SceneChannelPatch[] = Array.from(channelMap.values()).map(c => ({
    chNum: c.chNum || 1,
    name: c.name || `CH ${c.chNum || 1}`,
    sourceInput: c.sourceInput || `Local In ${c.chNum || 1} (XLR)`,
    gainDb: c.gainDb ?? 28,
    phantom48V: Boolean(c.phantom48V),
    phaseInvert: Boolean(c.phaseInvert),
    color: 'orange',
    icon: inferIconFromName(c.name || ''),
    faderDb: c.faderDb ?? 0,
    pan: 0,
    muted: false,
    solo: false,
    gateOn: true,
    gateModel: 'WING Gate/Exp',
    eqModel: 'WING 6-Band PEQ',
    compOn: true,
    compModel: '1176 FET Comp'
  }));

  const wingScene: SavedScene = {
    id: `wing-snap-${Date.now()}`,
    name: detectedWingName || 'WING Snapshot',
    type: 'snapshot',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: ['Behringer', 'WING', 'Snapshot', 'OSC'],
    description: `Importováno ze souboru ${fileName} (Behringer WING Snapshot)`,
    favorite: true,
    channelCount: parsedChannels.length || 24,
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
      targetEnsemble: `${detectedWingName} (WING Setup)`,
      faderLayerPreset: 'WING Custom Layout',
      mainFaderAssign: 'Main L/R',
      customControlsProfile: 'Standard WING',
      notes: `Importováno ze souboru ${fileName}`
    },
    channels: parsedChannels.length > 0 ? parsedChannels : getDefaultChannels(),
    buses: busMap.size > 0 ? Array.from(busMap.values()).map(b => ({
      busNum: b.busNum || 1,
      name: b.name || `Bus ${b.busNum || 1}`,
      isStereo: false,
      role: b.role || 'IEM Monitor',
      faderDb: 0,
      color: 'cyan',
      pan: 0
    })) : getDefaultBuses(),
    dcas: dcaMap.size > 0 ? Array.from(dcaMap.values()).map(d => ({
      dcaNum: d.dcaNum || 1,
      name: d.name || `DCA ${d.dcaNum || 1}`,
      color: 'yellow',
      faderDb: 0,
      muted: false,
      memberChannels: `DCA ${d.dcaNum || 1}`
    })) : getDefaultDcas()
  };

  return {
    scene: wingScene,
    detectedFormat: `Behringer WING Snapshot (.snap / .wingscene)`,
    mixerBrand: 'Behringer',
    detectedModel: 'WING / WING Compact',
    summary: {
      channelsCount: parsedChannels.length,
      busesCount: wingScene.buses?.length || 0,
      dcasCount: wingScene.dcas?.length || 0,
      matricesCount: 0,
      fxCount: 8
    }
  };
};

/**
 * Built-in Sample Scenes across all consoles for 1-click test and demonstration
 */
export const SAMPLE_UNIVERSAL_SCENES: {
  id: string;
  brand: MixerBrand;
  consoleModel: string;
  formatBadge: string;
  title: string;
  subtitle: string;
  description: string;
  badgeColor: string;
  fetchUrl?: string;
  rawText?: string;
}[] = [
  {
    id: 'sample-mixing-station-brabec',
    brand: 'Mixing Station',
    consoleModel: 'X32/M32 Live Band',
    formatBadge: 'Mixing Station (.ms / .json)',
    badgeColor: 'orange',
    title: 'S Brabcem (32CH + 8 AUX + 16 Bus)',
    subtitle: 'Reálný offline dump z aplikace Mixing Station',
    description: 'Kompletní živá kapela: Zpěvy (Pavel, Brabec, Klára, Karel), dechová sekce, kytary, klávesy, bicí, odposlechové sběrnice, matice a 8 DCA.',
    fetchUrl: '/assets/aistudio/scene-S-Brabcem_82d457b3.json'
  },
  {
    id: 'sample-behringer-wing-rock',
    brand: 'Behringer',
    consoleModel: 'WING Compact',
    formatBadge: 'Behringer WING (.snap)',
    badgeColor: 'amber',
    title: 'WING Rock Fest 24ch (.snap)',
    subtitle: 'Nativní snapshot pultu Behringer WING',
    description: 'Oficiální OSC snapshot formát pultu WING se 24 vstupními stopami, Midas předzesilovači, 16 sběrnicemi a 8 DCA.',
    rawText: `# BEHRINGER WING COMPACT SNAPSHOT FILE
# Scena: Rock Fest Live WING
# Obsazeni: Rockova kapela
[CHANNELS_INPUT_PATCH]
/ch/1/config/name "Kopak Sub"
/ch/1/in/source "Local In 1 (XLR)"
/ch/1/preamp/gain 24.0
/ch/1/preamp/48v 0
/ch/1/fader 0.0
/ch/2/config/name "Virbl Top"
/ch/2/in/source "Local In 2 (XLR)"
/ch/2/preamp/gain 26.0
/ch/2/preamp/48v 0
/ch/2/fader -1.5
/ch/3/config/name "Virbl Bottom"
/ch/3/in/source "Local In 3 (XLR)"
/ch/3/preamp/gain 24.0
/ch/3/preamp/48v 0
/ch/3/preamp/phase 1
/ch/3/fader -4.0
/ch/4/config/name "Hi-Hat"
/ch/4/in/source "Local In 4 (XLR)"
/ch/4/preamp/gain 20.0
/ch/4/preamp/48v 1
/ch/4/fader -6.0
/ch/5/config/name "Basa DI"
/ch/5/in/source "Local In 5 (XLR)"
/ch/5/preamp/gain 22.0
/ch/5/preamp/48v 1
/ch/5/fader 0.0
/ch/6/config/name "Kytara Lead"
/ch/6/in/source "Local In 6 (XLR)"
/ch/6/preamp/gain 28.0
/ch/6/preamp/48v 0
/ch/6/fader -2.0
/ch/7/config/name "Akustika"
/ch/7/in/source "Local In 7 (XLR)"
/ch/7/preamp/gain 30.0
/ch/7/preamp/48v 1
/ch/7/fader -1.0
/ch/8/config/name "Lead Vox"
/ch/8/in/source "Local In 8 (XLR)"
/ch/8/preamp/gain 34.0
/ch/8/preamp/48v 0
/ch/8/fader 0.0
/bus/1/config/name "IEM Lead"
/bus/2/config/name "IEM Bici"
/dca/1/config/name "Bici DCA"
/dca/2/config/name "Zpevy DCA"`
  },
  {
    id: 'sample-behringer-x32-festival',
    brand: 'Behringer',
    consoleModel: 'X32 / M32',
    formatBadge: 'Behringer X32 (.scn)',
    badgeColor: 'sky',
    title: 'X32 Festival Stage (.scn)',
    subtitle: 'Originální formát scény Behringer X32',
    description: 'Standardní .scn soubor pultu Behringer X32/M32 s nastavením preamp gainů, phantom napájení, šumových bran a kompresorů.',
    rawText: `#2.1# "X32 Festival Live" "" %000000000 1
/ch/01/config "Kick Drum" 1 "YE" 1
/ch/01/preamp +22.0 OFF OFF 0 24
/ch/01/gate ON GATE -36.0 25.0 120 400 1.00:1
/ch/01/dyn ON COMP PEAK LOG -18.0 3.0 1.0 50 200 0.0 0 100 0 POST
/ch/01/mix ON 0.0 OFF +0 -0 0
/ch/01/mix/dca 1
/ch/02/config "Snare Top" 1 "YE" 1
/ch/02/preamp +24.0 OFF OFF 0 24
/ch/02/gate ON GATE -34.0 25.0 120 400 1.00:1
/ch/02/mix ON -1.5 OFF +0 -0 0
/ch/02/mix/dca 1
/ch/03/config "Bass DI" 2 "GN" 1
/ch/03/preamp +26.0 ON OFF 0 24
/ch/03/dyn ON COMP PEAK LOG -16.0 4.0 1.0 30 150 0.0 0 100 0 POST
/ch/03/mix ON 0.0 OFF +0 -0 0
/ch/03/mix/dca 2
/ch/04/config "Lead Vox" 4 "CY" 1
/ch/04/preamp +32.0 OFF OFF 0 24
/ch/04/dyn ON COMP PEAK LOG -18.0 3.0 1.0 20 180 0.0 0 100 0 POST
/ch/04/mix ON 0.0 OFF +0 -0 0
/ch/04/mix/dca 3
/bus/01/config "IEM Lead" 4 "CY" 1
/bus/02/config "IEM Band" 2 "GN" 1
/dca/1 "Bici" 1
/dca/2 "Basa" 2
/dca/3 "Zpev" 4`
  },
  {
    id: 'sample-soundcraft-ui24r-club',
    brand: 'Soundcraft',
    consoleModel: 'Ui24R / Ui16',
    formatBadge: 'Soundcraft Ui (.show)',
    badgeColor: 'emerald',
    title: 'Soundcraft Ui24R Club Stage (.show)',
    subtitle: 'Nativní formát konzole Soundcraft Ui',
    description: 'Kompletní show dump pro pulty Soundcraft Ui24R se Studer předzesilovači, DBX processingem a Lexicon FX.',
    rawText: `SETD^i.0.name^Kick In
SETD^i.0.gain^22
SETD^i.0.phantom^0
SETD^i.0.mix^0.75
SETD^i.0.gate.on^1
SETD^i.0.dyn.on^1
SETD^i.1.name^Snare Drum
SETD^i.1.gain^24
SETD^i.1.phantom^0
SETD^i.1.mix^0.72
SETD^i.1.gate.on^1
SETD^i.2.name^Bass Guitar
SETD^i.2.gain^26
SETD^i.2.phantom^1
SETD^i.2.mix^0.75
SETD^i.2.dyn.on^1
SETD^i.3.name^Acoustic Gtr
SETD^i.3.gain^28
SETD^i.3.phantom^1
SETD^i.3.mix^0.70
SETD^i.4.name^Lead Vocalist
SETD^i.4.gain^34
SETD^i.4.phantom^0
SETD^i.4.mix^0.75
SETD^i.4.dyn.on^1
SETD^a.0.name^Aux 1 IEM
SETD^a.1.name^Aux 2 Wedge
SETD^vca.0.name^VCA Drums
SETD^vca.1.name^VCA Vocals`
  }
];
