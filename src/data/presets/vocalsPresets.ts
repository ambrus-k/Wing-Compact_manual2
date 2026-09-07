import { InstrumentPreset } from '../../types';

export const VOCALS_PRESETS: InstrumentPreset[] = [
  {
    id: 'vocals-lead-male-pop-rock',
    name: 'Mužský sólový zpěv (Male Lead Vocal - Pop/Rock)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316', // Orange
    description: 'Přední, srozumitelný, průrazný a dynamicky vyrovnaný mužský hlavní hlas pro moderní pop a rock.',
    recommendedInput: 'Local In 1 (XLR Wireless / Shure SM58 / KSM8 / Neumann KMS105)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2',
      attack: 1,
      hold: 60,
      release: 200,
      range: 14,
      notes: 'Mírný expander potlačí přeslechy z pódia a dechové pauzy.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.0, q: 1.4, enabled: true }, // Hřejivé tělo hlasu (Warmth)
        { id: 'b2', type: 'peq', freq: 500, gain: -2.5, q: 2.2, enabled: true }, // Odstranění nosovosti a krabicovosti
        { id: 'b3', type: 'peq', freq: 3200, gain: 3.5, q: 1.6, enabled: true }, // Srozumitelnost textu a frázování (Presence)
        { id: 'b4', type: 'peq', freq: 6500, gain: -3.0, q: 3.5, enabled: true }, // De-Esser zářez proti ostrým sykavkám S/C/Z
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Vzdušný moderní studiový lesk (Air)
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 110 Hz odfiltruje manipulační hluk mikrofonu. Zásek na 6.5 kHz zkrotí ostré české sykavky (š, č, s).'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -16,
      ratio: '3.5:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 4,
      makeUpGain: 3.0,
      notes: 'Legendární optická komprese udrží zpěvákův hlas neochvějně v popředí celého mixu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 15 (Vocal Reverb)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 35ms, Early Reflections 65%'
      }
    },
    proTips: [
      'Aktivujte v insertu WING De-Esser (nastavený na frekvenci 6.2 kHz) pro dynamické tlumení sykavek pouze tehdy, když zpěvák vysloví "S".',
      'Predelay 35 ms na reverbu oddělí přímý suchý hlas od dozvukového prostoru – zpěv zůstane dokonale čitelný.'
    ]
  },
  {
    id: 'vocals-lead-female-pop-belt',
    name: 'Ženský sólový zpěv (Female Lead Vocal - Pop/Belt)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316',
    description: 'Hedvábný, zářivý, křišťálový a dynamicky zkrocený tón ženského sólového hlasu.',
    recommendedInput: 'Local In 2 (XLR)',
    preampGain: 36,
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
      attack: 1,
      hold: 60,
      release: 200,
      range: 14,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 140,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 1.5, q: 1.4, enabled: true }, // Tělo
        { id: 'b2', type: 'peq', freq: 850, gain: -2.0, q: 2.2, enabled: true }, // Zákal
        { id: 'b3', type: 'peq', freq: 3500, gain: 3.5, q: 1.6, enabled: true }, // Sólová přítomnost
        { id: 'b4', type: 'peq', freq: 7200, gain: -3.5, q: 3.5, enabled: true }, // De-Esser zásek
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 4.0, q: 0.7, enabled: true }, // Široký hedvábný vzduch
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 140 Hz. Zásek na 7.2 kHz zjemní ostré ženské sykavky.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp + LA Leveler (Serial Comp)',
      threshold: -15,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 3,
      makeUpGain: 3.0,
      notes: 'Sériová komprese: rychlý FET kompresor pochytá špičky ve výškách a optický LA Leveler hladce srovná celou frázi.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 15 (Silky Vocal Verb)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 40ms, High Cut 10kHz'
      }
    },
    proTips: [
      'Pro ženský "belting" ve vysokých tónech nastavte vícepásmový kompresor na pásmo 2.5–4 kHz pro automatické zjemnění fortissima.',
      'Přidejte jemný stereo delay (1/8 dot) pro moderní popový prostor.'
    ]
  },
  {
    id: 'vocals-classical-male-baritone',
    name: 'Mužský baryton & bas (Classical / Folk Male Solo)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316',
    description: 'Sonorní, ušlechtilý, hluboký a majestátní tón mužského barytonu a basu pro klasiku, operu, muzikál a lidový zpěv.',
    recommendedInput: 'Local In 1 (XLR Condenser)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -52,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 300,
      range: 8,
      notes: 'Bypass pro zachování pianissima.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 3.0, q: 1.4, enabled: true }, // Hluboký hrudní fundament
        { id: 'b2', type: 'peq', freq: 450, gain: 1.5, q: 1.6, enabled: true }, // Sonorní tělo
        { id: 'b3', type: 'peq', freq: 1200, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 2800, gain: 3.5, q: 1.6, enabled: true }, // Pěvecký formant (Singer\'s Formant)
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 2.8 kHz vytáhne pověstný "pěvecký formant", díky kterému operní zpěvák prořízne i stohlavý symfonický orchestr.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Slow',
      release: 'Position 4',
      knee: 5,
      makeUpGain: 1.5,
      notes: 'Jemná lampová saturace zachovávající plný dynamický výraz.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 15 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.6 s',
        keySettings: 'Concert Hall, Predelay 40ms'
      }
    },
    proTips: [
      'Použijte kvalitní velkomembránový kondenzátorový mikrofon (např. Neumann KMS104 nebo DPA d:facto).',
      'Při operním zpěvu bez mikrofonu v ruce snímejte ze vzdálenosti cca 30–50 cm.'
    ]
  },
  {
    id: 'vocals-classical-female-soprano',
    name: 'Ženský soprán & alt (Classical / Chanson Female Solo)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316',
    description: 'Čistý, zářivý, klenutý a ušlechtilý tón ženského sopránu a altu s plynulým operním vibratem.',
    recommendedInput: 'Local In 2 (XLR Condenser)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -52,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 300,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 120,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 240, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 700, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 3.0, q: 1.5, enabled: true }, // Sopránový pěvecký formant
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.5, q: 3.5, enabled: true }, // De-harsh
        { id: 'b5', type: 'high-shelf', freq: 11500, gain: 3.5, q: 0.7, enabled: true }, // Zlatý lesk
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 3.2 kHz a 11.5 kHz dodá sopránu vznešený lesk a nosnost v sále.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '220 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Optická komprese srovnává operní dynamiku.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 15 (Cathedral Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 45ms'
      }
    },
    proTips: [
      'Sopránové vysoké C dosahuje obrovského akustického tlaku – udržujte gain předzesilovače s rezervou min. 18 dB.',
      'Pošlete signál do bohatého VSS3 reverbu s decay 2.8 s.'
    ]
  },
  {
    id: 'vocals-rock-rap-aggressive',
    name: 'Rockový & Rapový dynamický vokál (Aggressive Vocal)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316',
    description: 'Maximálně nahuštěný, agresivní, čitelný a saturovaný vokál pro hard rock, metal a rap (Shure SM7B).',
    recommendedInput: 'Local In 1 (XLR Dynamic)',
    preampGain: 42,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -42,
      ratio: '1:3',
      attack: 0.5,
      hold: 30,
      release: 140,
      range: 18,
      notes: 'Rychlý gate proti vazbě z pódiových monitorů.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 120,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 200, gain: 2.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 450, gain: -3.5, q: 2.2, enabled: true }, // Mud cut
        { id: 'b3', type: 'peq', freq: 2800, gain: 4.5, q: 1.5, enabled: true }, // Dravý drajv (Grit)
        { id: 'b4', type: 'peq', freq: 5500, gain: 3.0, q: 1.6, enabled: true }, // Rapová artikulace
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Masivní zdvih 2.8 kHz a 5.5 kHz zajistí, že každé slovo a scream prořízne i nejtvrdší kytary.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp (All-Buttons-In)',
      threshold: -20,
      ratio: '8:1',
      attack: 'Fast (0.5 ms)',
      release: '80 ms',
      knee: 2,
      makeUpGain: 5.0,
      notes: 'Tvrdá FET komprese natlačí hlas do nekompromisní čelní stěny.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Tube Saturation / Overdrive',
        keySettings: 'Drive 25%, Warm Harmonics'
      }
    },
    proTips: [
      'Aktivujte v insertu WING Tube Preamp pro jemné lampové přebuzení a harmonické nasycení hlasu.',
      'Přidejte krátký slap delay (110 ms) pro masivní rockový dojem.'
    ]
  },
  {
    id: 'vocals-speech-dugan-automix',
    name: 'Mluvené slovo / Moderátor & Rozhovor (Speech, Podcast & Dugan Automix)',
    category: 'vocals',
    categoryLabel: 'Vokály',
    icon: 'Mic',
    tagColor: '#f97316',
    description: 'Křišťálově srozumitelný tón pro moderátory, rozhovory, konference a podcasty s automatickým mixem Dugan Automixer.',
    recommendedInput: 'Local In 1 (XLR Wireless Headset / Lavalier / Handheld)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'Dugan Speech Automixer (WING Automix Group 1)',
      threshold: -45,
      ratio: 'Auto',
      attack: 1,
      hold: 50,
      release: 150,
      range: 16,
      notes: 'Dugan Automix automaticky ztlumí nepoužívané mikrofony a eliminuje vazbu.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 130,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 240, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 650, gain: -2.5, q: 2.2, enabled: true }, // Boxy cut
        { id: 'b3', type: 'peq', freq: 3000, gain: 3.5, q: 1.6, enabled: true }, // Maximální srozumitelnost řeči
        { id: 'b4', type: 'peq', freq: 6500, gain: -3.0, q: 3.5, enabled: true }, // De-Esser zářez
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: true }
      ],
      notes: 'HPF 130 Hz a LPF 16 kHz vymezí čisté pásmo lidské řeči. Zdvih 3 kHz zaručí perfektní srozumitelnost.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -16,
      ratio: '3:1',
      attack: 'Smooth',
      release: '160 ms',
      knee: 4,
      makeUpGain: 2.5,
      notes: 'Srovnává hlasitost tichých i hlasitých řečníků.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'De-Esser (WING Precision De-Esser)',
        keySettings: 'Freq 6.5kHz, Threshold -22dB, Range 10dB'
      }
    },
    proTips: [
      'Při panelových diskuzích s více mikrofony zařaďte všechny řečnické kanály do Dugan Automix Group 1 na WING.',
      'U hlavových mikrofonů (Headset) umístěte kapsli cca 2 cm vedle koutku úst, nikoli přímo před ústa.'
    ]
  }
];
