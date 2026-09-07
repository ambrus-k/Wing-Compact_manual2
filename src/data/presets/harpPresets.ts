import { InstrumentPreset } from '../../types';

export const HARP_PRESETS: InstrumentPreset[] = [
  {
    id: 'harp-concert-pedal-stereo',
    name: 'Koncertní pedálová harfa Stereo (Concert Pedal Harp Pair)',
    category: 'harp',
    categoryLabel: 'Harfa',
    icon: 'Radio',
    tagColor: '#ec4899', // Pink
    description: 'Křišťálově čistý, éterický, hluboký a prostorový tón velké koncertní 47-strunné pedálové harfy.',
    recommendedInput: 'Local In 7/8 (Stereo Pair)',
    preampGain: 38,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -55,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 350,
      range: 8,
      notes: 'Bypass pro zachování nejjemnějšího pianissima a přirozeného doznění těla.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 2.5, q: 1.5, enabled: true }, // Basové struny a rezonanční skříň
        { id: 'b2', type: 'peq', freq: 350, gain: 1.5, q: 1.4, enabled: true }, // Teplé tělo rezonanční desky
        { id: 'b3', type: 'peq', freq: 1100, gain: -2.0, q: 2.0, enabled: true }, // Odstranění dutosti (boxy)
        { id: 'b4', type: 'peq', freq: 3800, gain: 2.5, q: 1.6, enabled: true }, // Zvonivý atak bříšek prstů
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Vzdušný třpyt (Shimmer)
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 45 Hz zachová hluboké basové tóny pedálové harfy (subbasy C-kontra). Zdvih 11 kHz dodá éterickou jiskru.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '250 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Optický kompresor přirozeně zaoblí hlasité akordy a glissanda bez pumpování.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '3.0 s',
        keySettings: 'Predelay 40ms, Early Reflections 55%, Cathedral Hall'
      }
    },
    proTips: [
      'Použijte pár velkomembránových nebo malomembránových kondenzátorových mikrofonů: jeden miřte zleva na spodní rezonanční tělo, druhý zprava na horní diskantové struny.',
      'Harfa má obrovský dynamický rozsah – udržujte dostatečný headroom na předzesilovači (Peak -18 dBFS).'
    ]
  },
  {
    id: 'harp-celtic-lever',
    name: 'Keltská / Háčková harfa (Celtic Lever Harp)',
    category: 'harp',
    categoryLabel: 'Harfa',
    icon: 'Radio',
    tagColor: '#ec4899',
    description: 'Jasný, dřevitý, artikulovaný a folkový tón bezpedálové háčkové harfy pro komorní a folkovou hudbu.',
    recommendedInput: 'Local In 7 (XLR Condenser)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 5,
      hold: 70,
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 75,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 2.0, q: 1.4, enabled: true }, // Tělo
        { id: 'b2', type: 'peq', freq: 650, gain: 1.5, q: 1.6, enabled: true }, // Dřevnatost
        { id: 'b3', type: 'peq', freq: 1800, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3500, gain: 3.0, q: 1.6, enabled: true }, // Brnkavá artikulace
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 3.5 kHz zdůrazní rychlé folkové ornamenty a čistý atak prstů.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -10,
      ratio: '2:1',
      attack: 'Slow',
      release: 'Position 4',
      knee: 5,
      makeUpGain: 1.0,
      notes: 'Měkká lampová komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Warm Plate)',
        model: 'Vintage Plate',
        sendLevelDb: -9,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 25ms'
      }
    },
    proTips: [
      'Mikrofon umístěte cca 35–45 cm za zadní stranu rezonančního těla šikmo k ozvučným otvorům.',
      'Pro folkovou kapelu přidejte lehký stereo chorus pro bohatší prostor.'
    ]
  },
  {
    id: 'harp-glissando-harmonics',
    name: 'Harfové glissando & flažolety (Harp Glissando & Harmonics)',
    category: 'harp',
    categoryLabel: 'Harfa',
    icon: 'Radio',
    tagColor: '#ec4899',
    description: 'Speciální preset vyladěný pro působivá orchestrální glissanda, flažoletové tóny a magické filmové textury.',
    recommendedInput: 'Local In 7/8 (Stereo Pair)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -55,
      ratio: '1:1',
      attack: 5,
      hold: 80,
      release: 300,
      range: 0,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 50,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 120, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 400, gain: 1.0, q: 1.4, enabled: true },
        { id: 'b3', type: 'peq', freq: 2500, gain: 2.0, q: 1.5, enabled: true },
        { id: 'b4', type: 'peq', freq: 6500, gain: 3.0, q: 1.6, enabled: true }, // Flažoletový třpyt
        { id: 'b5', type: 'high-shelf', freq: 12500, gain: 4.0, q: 0.7, enabled: true }, // Široký vzduch
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 6.5 kHz a 12.5 kHz rozzáří každé harfové glissando v celém sále.'
    },
    comp: {
      enabled: true,
      model: 'Precision Limiter',
      threshold: -10,
      ratio: '3:1',
      attack: 'Fast (1 ms)',
      release: '150 ms',
      knee: 3,
      makeUpGain: 1.5,
      notes: 'Krotí hlasitostní špičky rychlých glissand.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Shimmer Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -6,
        decayOrTime: '3.4 s',
        keySettings: 'Predelay 50ms, Shimmer Mode'
      }
    },
    proTips: [
      'Pro filmovou hudbu použijte dlouhý dozvuk s decay 3.4 s a jemným predelayem 50 ms.',
      'Snímejte párem XY nebo Blumlein přímo před strunami.'
    ]
  },
  {
    id: 'harp-dual-mic-piezo',
    name: 'Harfa - Mikrofon + Piezo snímač (Dual Harp Mic & DI)',
    category: 'harp',
    categoryLabel: 'Harfa',
    icon: 'Radio',
    tagColor: '#ec4899',
    description: 'Kombinace kontaktního piezo snímače nalepeného na rezonanční desce pro vysokou odolnost proti vazbě a kondenzátorového mikrofonu pro vzdušnost.',
    recommendedInput: 'Local In 7 (Piezo DI) + Local In 8 (XLR Mic)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 3,
      hold: 60,
      release: 250,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 65,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 750, gain: -3.0, q: 2.5, enabled: true }, // Piezo rezonance
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b4', type: 'peq', freq: 5500, gain: -3.5, q: 3.0, enabled: true }, // Piezo quack
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Záseky na 750 Hz a 5.5 kHz odstraní syntetický "piezo quack" charakter.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -14,
      ratio: '3:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 3,
      makeUpGain: 2.0,
      notes: 'Optická komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Hall Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Na kanálu snímače aktivujte BodyRez procesor pro obnovu přirozeného dřevěného korpusu.',
      'Srovnejte fázový posun mezi snímačem a mikrofonem pomocí Channel Delay.'
    ]
  }
];
