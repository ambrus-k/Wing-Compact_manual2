import { InstrumentPreset } from '../../types';

export const STRINGS_PRESETS: InstrumentPreset[] = [
  {
    id: 'strings-violin-solo',
    name: 'Sólové housle (Solo Violin)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6', // Violet
    description: 'Bohatý, sametový a detailní tón mistrovských sólových houslí. Odstraňuje nepříjemný skřípot kalafuny v horních středech a zachovává jiskru a tělo nástroje.',
    recommendedInput: 'Local In 1 (XLR Condenser / Ribbon)',
    preampGain: 38,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
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
      notes: 'Bypass pro zachování nejjemnějšího pianissima a doznívání strun.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 160,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 2.5, q: 1.4, enabled: true }, // Teplé tělo houslí
        { id: 'b2', type: 'peq', freq: 850, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.0, q: 1.8, enabled: true }, // Sólová zpěvnost
        { id: 'b4', type: 'peq', freq: 4200, gain: -3.5, q: 3.5, enabled: true }, // Zásek proti skřípání kalafuny / smyčce
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.5, q: 0.7, enabled: true }, // Vzdušný lesk (Air)
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 160 Hz odfiltruje dupání a ruchy těla. Úzký zářez na 4.2 kHz potlačí ostré skřípání žíní.'
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
      notes: 'Optický kompresor přirozeně vyrovnává cantabile melodie a zachovává expresivní vibrato.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.6 s',
        keySettings: 'Predelay 35ms, Early Reflections 60%'
      }
    },
    proTips: [
      'Ideální pozice mikrofonu je cca 40–60 cm nad pravou f-dírkou houslí pod úhlem 45° shora.',
      'Pokud používáte páskový mikrofon (Ribbon), přidejte na WING preampovém EQ +2 dB na 12 kHz pro nádherný analogový lesk.'
    ]
  },
  {
    id: 'strings-violins-section-stereo',
    name: '1. & 2. Housle sekce Stereo (Violin Section Pair)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6',
    description: 'Široký, hedvábný a homogenní stereo obraz houslové sekce komorního i velkého symfonického orchestru.',
    recommendedInput: 'Local In 1/2 (Stereo Pair)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: -50,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -60,
      ratio: '1:1',
      attack: 10,
      hold: 100,
      release: 300,
      range: 0,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 140,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 300, gain: 2.0, q: 1.2, enabled: true }, // Tělo sekce
        { id: 'b2', type: 'peq', freq: 1100, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.0, q: 1.4, enabled: true }, // Hedvábná artikulace
        { id: 'b4', type: 'peq', freq: 5200, gain: -2.5, q: 3.0, enabled: true }, // Krocení skřípotu sekce
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.0, q: 0.7, enabled: true }, // Vzduch
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Ekvalizace spojuje individuální housle do jednolitého hedvábného tělesa bez ostrých hran.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -10,
      ratio: '2:1',
      attack: 'Slow',
      release: 'Position 5',
      knee: 5,
      makeUpGain: 1.0,
      notes: 'Transparentní lampová komprese pro jemné udržení dynamického celku sekce.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 45ms, High Softness Enabled'
      }
    },
    proTips: [
      'Pro 1. housle nastavte stereo pan více vlevo (L100 - L20), pro 2. housle středo-levo (L60 - R0).',
      'Použijte techniku stereo páru ORTF nebo AB zavěšeného cca 2.5–3 m nad sekcí.'
    ]
  },
  {
    id: 'strings-viola-solo-section',
    name: 'Viola sólová & sekce (Viola Solo & Section)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6',
    description: 'Temný, zemitý, hřejivý a ušlechtilý tón violy. Podpora altového těla a artikulace C-struny.',
    recommendedInput: 'Local In 3 (XLR)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 15,
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
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 190, gain: 3.0, q: 1.4, enabled: true }, // Rezonance C-struny a hlubokého korpusu
        { id: 'b2', type: 'peq', freq: 450, gain: 2.0, q: 1.5, enabled: true }, // Hřejivé dřevo
        { id: 'b3', type: 'peq', freq: 1200, gain: -2.0, q: 2.0, enabled: true }, // Zákal
        { id: 'b4', type: 'peq', freq: 2600, gain: 2.5, q: 1.6, enabled: true }, // Melodický altový zpěv
        { id: 'b5', type: 'high-shelf', freq: 9500, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 190 Hz a 450 Hz vytáhne charakteristický temně sametový tón violového těla.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Optická komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.6 s',
        keySettings: 'Predelay 35ms'
      }
    },
    proTips: [
      'Viola vyzařuje nejvíce vřelého zvuku kolmo k horní desce – mikrofon umístěte cca 50 cm nad nástroj mírně k basové straně.',
      'V symfonickém orchestru sedí violy obvykle vpravo od dirigenta – panujte R15 až R35.'
    ]
  },
  {
    id: 'strings-cello-solo-section',
    name: 'Violoncello sólové & sekce (Solo Cello & Section)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6',
    description: 'Hluboký, sonorní, emotivní a majestátní tón violoncella od basového fundamentu C po zpěvný tenorový rejstřík A struny.',
    recommendedInput: 'Local In 4 (XLR)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 30,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 300,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 55,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 110, gain: 3.5, q: 1.5, enabled: true }, // Plný basový fundament (C & G struna)
        { id: 'b2', type: 'peq', freq: 280, gain: 2.0, q: 1.4, enabled: true }, // Tělo korpusu
        { id: 'b3', type: 'peq', freq: 650, gain: -2.5, q: 2.2, enabled: true }, // Odstranění dutosti (boxy)
        { id: 'b4', type: 'peq', freq: 2200, gain: 3.0, q: 1.6, enabled: true }, // Sólová zpěvnost a tah smyčce
        { id: 'b5', type: 'high-shelf', freq: 8500, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 110 Hz pro hloubku, zásek 650 Hz pročistí střední pásmo a 2.2 kHz dodá zpěvný lesk sólovým melodiím.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -14,
      ratio: '3:1',
      attack: 'Smooth',
      release: '220 ms',
      knee: 4,
      makeUpGain: 2.0,
      notes: 'Optická komprese srovnává dynamické přechody mezi basovými strunami a tenorovým sólem.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Warm Cello Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 30ms, Warm Space'
      }
    },
    proTips: [
      'Mikrofon umístěte cca 40–50 cm před kobylku violoncella mírně shora a šikmo k f-dírce.',
      'Při live koncertech s bicími použijte speciální klipový mikrofon DPA 4099C uchycený za struník.'
    ]
  },
  {
    id: 'strings-double-bass-arco',
    name: 'Kontrabas - smyčec / Arco (Double Bass Arco)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Activity',
    tagColor: '#8b5cf6',
    description: 'Hromový, bohatý a majestátní tah smyčcem po kontrabasových strunách. Plné zachycení subbasů i artikulace žíní.',
    recommendedInput: 'Local In 5 (XLR Condenser / Dynamic)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 40,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:1.5',
      attack: 5,
      hold: 60,
      release: 250,
      range: 10,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 32,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 55, gain: 4.0, q: 1.6, enabled: true }, // Hluboký fundament (nízké E / C)
        { id: 'b2', type: 'peq', freq: 130, gain: 2.5, q: 1.8, enabled: true }, // Tělo dřeva
        { id: 'b3', type: 'peq', freq: 350, gain: -3.5, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 1600, gain: 2.5, q: 1.8, enabled: true }, // Zvuk tahu smyčce (Arco bite)
        { id: 'b5', type: 'lpf', freq: 6500, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'HPF na 32 Hz. Zdvih 55 Hz a 130 Hz roztřese sál hlubokým orchestrálním basem.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '140 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'Rychlý FET kompresor udrží pod kontrolou masivní dynamiku smyčce.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Hall Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -12,
        decayOrTime: '2.4 s',
        keySettings: 'Low Cut 85Hz'
      }
    },
    proTips: [
      'Mikrofon miřte na kobylku ze vzdálenosti cca 30–40 cm mírně shora.',
      'V kombinaci se snímačem (Piezo) ořízněte na lince snímače ostré výšky nad 3 kHz a smíchejte 60% mik / 40% snímač.'
    ]
  },
  {
    id: 'strings-double-bass-pizzicato-jazz',
    name: 'Kontrabas - pizzicato & jazz (Double Bass Pizzicato)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Activity',
    tagColor: '#8b5cf6',
    description: 'Pevný, úderný a dřevitý tón akustického kontrabasu hraného prsty pro jazz, folk, bluegrass i orchestrální pizzicato.',
    recommendedInput: 'Local In 5 (XLR / DI Box)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -44,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 200,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 38,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 65, gain: 3.5, q: 1.5, enabled: true }, // Basový groove
        { id: 'b2', type: 'peq', freq: 160, gain: 2.0, q: 1.6, enabled: true }, // Dřevěný punch
        { id: 'b3', type: 'peq', freq: 450, gain: -3.5, q: 2.2, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 2200, gain: 3.5, q: 1.8, enabled: true }, // Úder bříška prstu o hmatník (Click)
        { id: 'b5', type: 'high-shelf', freq: 7000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 10000, gain: 0, q: 0.7, enabled: true }
      ],
      notes: 'Zdvih 2.2 kHz vytáhne dřevěné klapnutí prstu o ebenový hmatník.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -15,
      ratio: '4:1',
      attack: '15 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'Pevná VCA komprese srovná groove a dynamiku walking bassu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Acoustic Space)',
        model: 'Vintage Plate',
        sendLevelDb: -14,
        decayOrTime: '1.6 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Pro jazzový walking bass zabalte dynamický mikrofon do molitanu a zasuňte přímo mezi nožičky kobylky pod struny.',
      'Srovnejte fázový posun mezi DI piezo linkou a mikrofonem pomocí funkce Channel Delay na WING.'
    ]
  },
  {
    id: 'strings-quartet-stereo',
    name: 'Smyčcový kvartet Stereo (String Quartet Pair)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6',
    description: 'Kompletní stereo snímání smyčcového kvarteta (1. housle, 2. housle, viola, violoncello) v komorním souzvuku.',
    recommendedInput: 'Local In 1/2 (Stereo Pair)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -60,
      ratio: '1:1',
      attack: 10,
      hold: 100,
      release: 300,
      range: 0,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 60,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 2.0, q: 1.4, enabled: true }, // Cello bas
        { id: 'b2', type: 'peq', freq: 450, gain: 1.5, q: 1.4, enabled: true }, // Viola střed
        { id: 'b3', type: 'peq', freq: 1500, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3500, gain: 2.0, q: 1.5, enabled: true }, // Houslová artikulace
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.5, q: 0.7, enabled: true }, // Akustika sálu
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Dokonale vyvážená křivka pro transparentní zvuk čtyř smyčcových hlasů.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -10,
      ratio: '2:1',
      attack: 'Slow',
      release: 'Position 5',
      knee: 5,
      makeUpGain: 1.0,
      notes: 'Transparentní komprese pro zachování citlivé komorní dynamiky.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Chamber Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 35ms, Chamber Hall'
      }
    },
    proTips: [
      'Pár mikrofonů Blumlein nebo XY umístěte do výšky 2 m cca 1.5–2 m před půlkruh kvarteta.',
      'Při ozvučování živého vystoupení doplňte stereo pár jemnými spot mikrofony pro každého hráče s HPF filtrem.'
    ]
  },
  {
    id: 'strings-orchestra-tutti',
    name: 'Smyčcový komorní orchestr Tutti (String Orchestra Ensemble)',
    category: 'strings',
    categoryLabel: 'Smyčcové nástroje',
    icon: 'Radio',
    tagColor: '#8b5cf6',
    description: 'Monumentální, bohatý a klenutý zvuk celého smyčcového tělesa (1. a 2. housle, violy, cella, kontrabasy) v tutti fortissimu.',
    recommendedInput: 'Local In 1/2 (Main Stereo Pair)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -60,
      ratio: '1:1',
      attack: 10,
      hold: 100,
      release: 300,
      range: 0,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 2.5, q: 1.5, enabled: true }, // Hloubka kontrabasů
        { id: 'b2', type: 'peq', freq: 300, gain: 2.0, q: 1.2, enabled: true }, // Tělo sekcí
        { id: 'b3', type: 'peq', freq: 950, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3200, gain: 2.5, q: 1.4, enabled: true }, // Zpěvnost tutti
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.0, q: 0.7, enabled: true }, // Vzdušnost
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Plnospektrální ekvalizace s vysokou vzdušností pro majestátní orchestrální zvuk.'
    },
    comp: {
      enabled: true,
      model: 'C5-Combinator (5-Band Multiband)',
      threshold: -12,
      ratio: '2:1',
      attack: 'Auto',
      release: 'Auto',
      knee: 4,
      makeUpGain: 1.0,
      notes: '5-pásmový kompresor vyhlazuje crescenda bez omezování basů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.8 s',
        keySettings: 'Concert Hall, Predelay 45ms'
      }
    },
    proTips: [
      'Nastavte WING Stereo Imager (Velvet Imager) na šířku 120% pro obrovský akustický rozptyl sálu.',
      'Sledujte fázi hlavního stereo páru s případnými spotovými mikrofony.'
    ]
  }
];
