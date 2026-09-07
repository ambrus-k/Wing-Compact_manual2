import { InstrumentPreset } from '../../types';

export const ORCHESTRA_ADDITIONS: InstrumentPreset[] = [
  // WOODWINDS
  {
    id: 'ww-oboe-damore',
    name: 'Hoboj d\'amore (Oboe d\'amore)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Měkký, temnější a expresivní tón altového hoboje. Ideální pro sóla v barokní a symfonické hudbě.',
    recommendedInput: 'Local In 12 (XLR Condenser)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: { enabled: false, model: 'WING Gate/Expander', threshold: -55, ratio: '1:1.5', attack: 5, hold: 50, release: 250, range: 10, notes: 'Bypass.' },
    eq: {
      enabled: true, model: 'Pulsar P1a (Pultec Style)', hpfFreq: 140, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 350, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 1100, gain: -1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 9000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 350 Hz pro tělo tónu, mírné potlačení 1.1 kHz pro omezení nosovosti.'
    },
    comp: { enabled: true, model: 'LA Leveler', threshold: -12, ratio: '2.5:1', attack: 'Smooth', release: '180 ms', knee: 3, makeUpGain: 1.5, notes: 'Příjemná optická komprese.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'VSS3 Reverb', sendLevelDb: -10, decayOrTime: '2.2 s', keySettings: 'Predelay 20ms' } },
    proTips: [ 'Snímejte mírně shora a ze strany, mimo přímý proud vzduchu od klapek.' ]
  },
  {
    id: 'ww-basset-horn',
    name: 'Basetový roh (Basset Horn v F)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Vzácnější altový zástupce klarinetové rodiny. Temný, melancholický a bohatý zvuk známý z Mozartových děl.',
    recommendedInput: 'Local In 14 (XLR Condenser)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -5,
    faderDefault: 0,
    gate: { enabled: false, model: 'WING Gate', threshold: -50, ratio: '1:1.5', attack: 5, hold: 50, release: 250, range: 10, notes: 'Bypass' },
    eq: {
      enabled: true, model: 'Even 88-Formant', hpfFreq: 110, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 850, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 2800, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 8000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 14000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zvýraznění temného spodku kolem 220 Hz.'
    },
    comp: { enabled: true, model: 'Fairchild 670', threshold: -10, ratio: '2:1', attack: 'Slow', release: 'Position 2', knee: 4, makeUpGain: 1.5, notes: 'Jemná kontrola dynamiky.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Vintage Plate', sendLevelDb: -12, decayOrTime: '2.0 s', keySettings: 'Predelay 15ms' } },
    proTips: [ 'V symfonickém orchestru sedí často vedle klarinetů nebo fagotů.' ]
  },
  // BRASS
  {
    id: 'brass-wagner-tuba',
    name: 'Wagnerova tuba (Wagner Tuba)',
    category: 'brass',
    categoryLabel: 'Žesťové nástroje',
    icon: 'Volume2',
    tagColor: '#f59e0b',
    description: 'Nástroj kombinující vlastnosti lesního rohu a tuby, s majestátním a temným zvukem pro velké orchestrální party.',
    recommendedInput: 'Local In 16 (XLR Condenser / Dynamic)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 15,
    faderDefault: 0,
    gate: { enabled: false, model: 'WING Gate', threshold: -50, ratio: '1:1.5', attack: 5, hold: 50, release: 250, range: 10, notes: 'Bypass' },
    eq: {
      enabled: true, model: 'Even 84 (Neve Style)', hpfFreq: 80, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 500, gain: -1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 2200, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 6500, gain: 1.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 12000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 180 Hz pro temnou hloubku, 2.2 kHz pro prezenci žestě.'
    },
    comp: { enabled: true, model: '76 Limiter Amp', threshold: -14, ratio: '4:1', attack: 'Medium', release: '180 ms', knee: 3, makeUpGain: 2.0, notes: 'Kontrola silných dynamických špiček.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Symphony Hall', sendLevelDb: -8, decayOrTime: '2.5 s', keySettings: 'Predelay 25ms' } },
    proTips: [ 'Wagnerovy tuby obvykle hrají hráči na lesní roh, a zvuk je směrován nahoru a mírně doprava.' ]
  },
  {
    id: 'brass-cimbasso',
    name: 'Cimbasso (Kontrabasový ventilový pozoun)',
    category: 'brass',
    categoryLabel: 'Žesťové nástroje',
    icon: 'Volume2',
    tagColor: '#f59e0b',
    description: 'Ostrý, úderný a zlověstný basový nástroj používaný v italské opeře a filmové hudbě, jako průraznější alternativa k tubě.',
    recommendedInput: 'Local In 18 (XLR Dynamic - např. RE20)',
    preampGain: 28,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 10,
    faderDefault: -1,
    gate: { enabled: true, model: 'WING Gate', threshold: -45, ratio: '1:3', attack: 2, hold: 40, release: 150, range: 15, notes: 'Expander pro potlačení ruchu.' },
    eq: {
      enabled: true, model: 'Pulsar P1a (Pultec Style)', hpfFreq: 45, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 3.5, q: 1.2, enabled: true },
        { id: 'b2', type: 'peq', freq: 350, gain: -3.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 1500, gain: 2.5, q: 1.6, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 5000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 10000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 90 Hz pro masivní úder, 1.5 kHz a 5 kHz zvýrazní pověstnou agresivní barvu cimbassa.'
    },
    comp: { enabled: true, model: 'BDX 160 Comp', threshold: -16, ratio: '4:1', attack: '15 ms', release: '200 ms', knee: 2, makeUpGain: 3.0, notes: 'Punchy komprese ve stylu VCA.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Plate Reverb', sendLevelDb: -14, decayOrTime: '1.8 s', keySettings: 'Predelay 10ms' } },
    proTips: [ 'Mikrofon snímejte přímo u ozvučníku pro maximální "vrčivý" agresivní atak.' ]
  },
  // DRUMS & PERCUSSION
  {
    id: 'drums-glockenspiel',
    name: 'Zvonkohra (Glockenspiel / Orchestral Bells)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Krystalicky čistý a průrazný tón orchestrální zvonkohry pro jasné melodické linky ve vysokých rejstřících.',
    recommendedInput: 'Local In 19 (XLR Condenser)',
    preampGain: 35,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 15,
    faderDefault: -3,
    gate: { enabled: false, model: 'WING Gate', threshold: -50, ratio: '1:1.5', attack: 1, hold: 50, release: 200, range: 10, notes: 'Bypass' },
    eq: {
      enabled: true, model: 'Even 88-Formant', hpfFreq: 500, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 1500, gain: -2.0, q: 1.5, enabled: true },
        { id: 'b2', type: 'peq', freq: 4000, gain: 2.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 8000, gain: 4.0, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 12000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zásadní je ořez HPF 500 Hz (nebo výše), protože zvonkohra generuje pouze velmi vysoké frekvence.'
    },
    comp: { enabled: true, model: 'LA Leveler', threshold: -12, ratio: '3:1', attack: 'Smooth', release: '150 ms', knee: 3, makeUpGain: 1.0, notes: 'Kontrola silných tranzientů kovových kamenů.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'VSS3 Reverb', sendLevelDb: -8, decayOrTime: '2.5 s', keySettings: 'Predelay 15ms' } },
    proTips: [ 'Mikrofon umístěte cca 40–60 cm nad nástroj pro plný tón bez agresivního ataku paliček.' ]
  },
  {
    id: 'drums-tubular-bells',
    name: 'Trubicové zvony (Tubular Bells / Chimes)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Mohutný a slavnostní zvuk chrámových zvonů používaný pro dramatické a epické momenty v orchestru.',
    recommendedInput: 'Local In 20/21 (XLR Condenser Pair)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: { enabled: false, model: 'WING Gate', threshold: -45, ratio: '1:1.5', attack: 1, hold: 50, release: 250, range: 10, notes: 'Bypass' },
    eq: {
      enabled: true, model: 'Even 84 (Neve Style)', hpfFreq: 150, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 250, gain: 2.0, q: 1.5, enabled: true },
        { id: 'b2', type: 'peq', freq: 800, gain: -2.0, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3000, gain: 2.5, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 8000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 14000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 250 Hz pro spodní rezonanci zvonů a 3 kHz pro průrazný úder paličky.'
    },
    comp: { enabled: true, model: '76 Limiter Amp', threshold: -15, ratio: '8:1', attack: 'Fast', release: '300 ms', knee: 3, makeUpGain: 2.0, notes: 'Rychlá a silná komprese pro zkrocení velmi agresivního ataku zvonů.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Symphony Hall', sendLevelDb: -6, decayOrTime: '3.5 s', keySettings: 'Predelay 30ms' } },
    proTips: [ 'Snímejte zepředu ze vzdálenosti cca 1 metru, aby měl mohutný zvuk prostor se vyvinout.' ]
  },
  {
    id: 'drums-triangle',
    name: 'Triangl (Triangle)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Prořízne se jakkoli hutným orchestrem. Extrémně vysoké frekvence a dlouhé doznívání.',
    recommendedInput: 'Local In 22 (XLR Condenser)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
    faderDefault: -6,
    gate: { enabled: false, model: 'WING', threshold: -50, ratio: '1:2', attack: 1, hold: 30, release: 200, range: 16, notes: 'Bypass' },
    eq: {
      enabled: true, model: 'Pulsar P1a', hpfFreq: 800, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 1000, gain: -5.0, q: 2.0, enabled: true },
        { id: 'b2', type: 'peq', freq: 8000, gain: 2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 12000, gain: 4.0, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 16000, gain: 3.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Extrémní HPF filtr na 800 Hz propustí pouze to podstatné z trianglu.'
    },
    comp: { enabled: true, model: 'LA Leveler', threshold: -10, ratio: '2.5:1', attack: 'Smooth', release: '200 ms', knee: 3, makeUpGain: 1.0, notes: 'Jen velmi jemná ochrana špiček.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Hall', sendLevelDb: -10, decayOrTime: '2.0 s', keySettings: 'Predelay 10ms' } },
    proTips: [ 'Neumísťujte mikrofon příliš blízko, zvuk trianglu se nejlépe pojí s orchestrem z mírné dálky.' ]
  },
  {
    id: 'drums-tambourine',
    name: 'Tamburína (Tambourine)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Ostrý a rytmicky výrazný nástroj s plíšky, klíčový pro taneční a rytmické pasáže v symfonické i popové hudbě.',
    recommendedInput: 'Local In 23 (XLR Condenser)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 20,
    faderDefault: -4,
    gate: { enabled: true, model: 'WING', threshold: -45, ratio: '1:3', attack: 1, hold: 20, release: 150, range: 15, notes: 'Expander' },
    eq: {
      enabled: true, model: 'Even 84', hpfFreq: 300, hpfSlope: '18 dB/oct', mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 800, gain: -2.0, q: 1.5, enabled: true },
        { id: 'b2', type: 'peq', freq: 4000, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 9000, gain: 3.5, q: 1.4, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 14000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 9 kHz rozzáří plíšky tamburíny, HPF vyčistí pódiový ruch.'
    },
    comp: { enabled: true, model: '76 Limiter Amp', threshold: -15, ratio: '4:1', attack: 'Fast', release: '100 ms', knee: 3, makeUpGain: 2.0, notes: 'Rychlá komprese udrží tamburínu přesně v rytmu bez agresivních špiček.' },
    fx: { primaryFX: { slotType: 'Bus Send', busName: 'Bus 13', model: 'Plate', sendLevelDb: -12, decayOrTime: '1.5 s', keySettings: 'Predelay 15ms' } },
    proTips: [ 'Hráč by měl stát cca 0.5 - 1m od mikrofonu a hrát mírně pod jeho úroveň.' ]
  }
];
