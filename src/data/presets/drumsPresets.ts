import { InstrumentPreset } from '../../types';

export const DRUMS_PRESETS: InstrumentPreset[] = [
  {
    id: 'drums-kick-in',
    name: 'Kopák - Vnitřní mik (Kick In - Attack)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444', // Red
    description: 'Rychlý, konkrétní, úderný a krystalický atak beateru uvnitř velkého bubnu (Shure Beta 91A / Audix D6).',
    recommendedInput: 'Local In 1 (XLR uvnitř bubnu na polštáři)',
    preampGain: 20,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -38,
      ratio: '1:4',
      attack: 0.5,
      hold: 30,
      release: 120,
      range: 24,
      notes: 'Rychlý a přesný gate izoluje každý jednotlivý úder beateru.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 40,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 60, gain: 2.0, q: 1.5, enabled: true },
        { id: 'b2', type: 'peq', freq: 160, gain: -2.0, q: 1.8, enabled: true },
        { id: 'b3', type: 'peq', freq: 400, gain: -6.0, q: 2.5, enabled: true }, // Hluboký výřez krabicovosti
        { id: 'b4', type: 'peq', freq: 1400, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b5', type: 'peq', freq: 4500, gain: 6.0, q: 1.6, enabled: true }, // Krystalický atak beateru (Click)
        { id: 'b6', type: 'high-shelf', freq: 9000, gain: 2.0, q: 0.7, enabled: true }
      ],
      notes: 'Masivní zářez -6 dB na 400 Hz odstraní krabicový zvuk, zdvih +6 dB na 4.5 kHz dodá moderní "click" beateru.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -18,
      ratio: '4:1',
      attack: '10 ms',
      release: '100 ms',
      knee: 2,
      makeUpGain: 3.5,
      notes: 'VCA komprese dodá kopáku tvrdý a nekompromisní ráz.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Wave Designer (Transient Shaper)',
        keySettings: 'Attack +45%, Sustain -20%, Output Gain 0dB'
      }
    },
    proTips: [
      'Aktivujte v insertu procesor Wave Designer: zvyšte Attack na +45% pro bleskový úder v rockovém a metalovém mixu.',
      'Smíchejte Kick In (atak) s kanálem Kick Out (hluboký bas).'
    ]
  },
  {
    id: 'drums-kick-out',
    name: 'Kopák - Vnější mik (Kick Out - Sub bass)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Hluboký, masivní a hromový subbas velkého bubnu snímaný u rezonanční blány (Shure Beta 52A / AKG D112 / Subkick).',
    recommendedInput: 'Local In 2 (XLR v otvoru rezonanční blány)',
    preampGain: 22,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -40,
      ratio: '1:3',
      attack: 1,
      hold: 40,
      release: 160,
      range: 20,
      notes: 'Gate.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 28,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 50, gain: 5.0, q: 1.5, enabled: true }, // Masivní subbasový boom
        { id: 'b2', type: 'peq', freq: 110, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 350, gain: -5.0, q: 2.5, enabled: true }, // Boxy cut
        { id: 'b4', type: 'lpf', freq: 4000, gain: 0, q: 0.7, enabled: true }, // Ořez přeslechů z činelů
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zdvih +5 dB na 50 Hz rozkmitá subwoofery v sále.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'FET komprese udrží basové tělo pevné.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Psycho Bass (Subharmonic Enhancer)',
        keySettings: 'Intensity 30%, X/O Freq 60Hz'
      }
    },
    proTips: [
      'Zkontrolujte fázovou korelaci mezi Kick In a Kick Out tlačítkem Phase Invert.',
      'Mikrofon umístěte do poloviny otvoru rezonanční blány pod úhlem 45°.'
    ]
  },
  {
    id: 'drums-snare-top',
    name: 'Malý buben - Horní blána (Snare Top)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Průrazný, šťavnatý a dynamický tón malého bubínku (Shure SM57 / Beyerdynamic M201).',
    recommendedInput: 'Local In 3 (XLR)',
    preampGain: 24,
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
      hold: 35,
      release: 140,
      range: 20,
      notes: 'Zamezí přeslechu z hi-haty.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 200, gain: 3.5, q: 1.5, enabled: true }, // Tělo a váha úderu (Body)
        { id: 'b2', type: 'peq', freq: 550, gain: -3.0, q: 2.0, enabled: true }, // Odstranění plechového zvonění
        { id: 'b3', type: 'peq', freq: 3500, gain: 4.0, q: 1.6, enabled: true }, // Průrazný ráz paličky (Crack)
        { id: 'b4', type: 'high-shelf', freq: 9000, gain: 3.0, q: 0.7, enabled: true }, // Zvonivost a šum struníku
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 200 Hz pro tlustý rockový tón, 3.5 kHz pro pověstný "crack" úder.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Medium (5 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'Pomalý náběh (5 ms) propustí počáteční prasknutí paličky a stlačí tělo bubnu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 14 (Snare Plate)',
        model: 'Vintage Plate',
        sendLevelDb: -8,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 20ms, High Cut 7kHz'
      }
    },
    proTips: [
      'Mikrofon zamiřte cca 3 cm nad okraj ráfku pod úhlem 45° směrem do středu blány, zadní částí odvrácenou od hi-haty.',
      'Pošlete signál do Vintage Plate reverbu pro ikonický velký zvuk virblu.'
    ]
  },
  {
    id: 'drums-snare-bottom',
    name: 'Malý buben - Spodní struník (Snare Bottom)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Jiskřivý, rychlý a detailní bzukot spodního kovového struníku.',
    recommendedInput: 'Local In 4 (XLR)',
    preampGain: 26,
    phantomPower: false,
    phaseInvert: true, // VŽDY OBRÁCENÁ FÁZE
    channelType: 'mono',
    pan: 0,
    faderDefault: -4.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -40,
      ratio: '1:3.5',
      attack: 0.5,
      hold: 25,
      release: 100,
      range: 22,
      notes: 'Rychlý gate.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 180,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 450, gain: -3.0, q: 2.0, enabled: true },
        { id: 'b2', type: 'peq', freq: 2800, gain: 2.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 6500, gain: 4.5, q: 1.5, enabled: true }, // Bzukot pružinek struníku (Sizzle)
        { id: 'b4', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 180 Hz. Zdvih 6.5 kHz a 11 kHz vytáhne křišťálový šum struníku.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -14,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '80 ms',
      knee: 2,
      makeUpGain: 2.0,
      notes: 'FET komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Wave Designer',
        keySettings: 'Attack +20%, Sustain -30%'
      }
    },
    proTips: [
      'DŮLEŽITÉ: Na tomto kanálu je zapnutá obrácená fáze (Phase Invert ON), protože spodní membrána kmitá v protifázi vůči horní bláně.',
      'Přimíchejte spodní struník pod Snare Top cca o 4 až 6 dB níže.'
    ]
  },
  {
    id: 'drums-hi-hat',
    name: 'Hi-Hat (Činelová šlapka)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Křišťálový, detailní a čistý zvuk činelové šlapky s odfiltrováním přeslechů virblu.',
    recommendedInput: 'Local In 5 (XLR Condenser)',
    preampGain: 26,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -30,
    faderDefault: -3.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -44,
      ratio: '1:2',
      attack: 1,
      hold: 30,
      release: 120,
      range: 16,
      notes: 'Expander potlačí virbl v pauzách.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 350,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 650, gain: -3.0, q: 2.5, enabled: true }, // Ořez virblu
        { id: 'b2', type: 'peq', freq: 3200, gain: 2.0, q: 1.6, enabled: true }, // Špička paličky
        { id: 'b3', type: 'peq', freq: 6000, gain: -2.5, q: 3.0, enabled: true }, // Krocení plechového řezání
        { id: 'b4', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Zlatý lesk (Chik)
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Vysoký HPF na 350 Hz spolehlivě odstraní virbl a kopák z činelového mikrofonu.'
    },
    comp: {
      enabled: false,
      model: 'LA Leveler',
      threshold: -10,
      ratio: '2:1',
      attack: 'Smooth',
      release: '100 ms',
      knee: 3,
      makeUpGain: 0,
      notes: 'Bypass (komprese se u hi-hat obvykle nepoužívá).'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Drum Room)',
        model: 'Vintage Room',
        sendLevelDb: -18,
        decayOrTime: '1.2 s',
        keySettings: 'Predelay 10ms'
      }
    },
    proTips: [
      'Mikrofon umístěte cca 10–15 cm nad horní činel mířící do 2/3 plochy, s kapslí směřující od virblu.',
      'Panujte mírně doleva (L25 až L35).'
    ]
  },
  {
    id: 'drums-toms-rack-floor',
    name: 'Přechody & Kotel (Rack Toms & Floor Tom)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Hutný, dynamický a melodický tón přechodů (10", 12", 14", 16") s rychlým dozvukem a úderem paličky (Sennheiser e604 / MD421 / Shure Beta 98).',
    recommendedInput: 'Local In 6/7/8 (XLR Klip)',
    preampGain: 24,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: -25,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -38,
      ratio: '1:4',
      attack: 0.5,
      hold: 40,
      release: 180,
      range: 24,
      notes: 'Přesný gate zajistí ticho mezi přechodovými brejky.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 65,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 110, gain: 3.5, q: 1.5, enabled: true }, // Tělo a basové dunění tomu
        { id: 'b2', type: 'peq', freq: 450, gain: -4.5, q: 2.2, enabled: true }, // Odstranění dutosti (Mud cut)
        { id: 'b3', type: 'peq', freq: 3500, gain: 4.0, q: 1.6, enabled: true }, // Plastový a dřevěný úder paličky (Attack)
        { id: 'b4', type: 'high-shelf', freq: 9000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 110 Hz (pro rack tomy) nebo 75 Hz (pro floor tom) a zářez na 450 Hz vytvoří masivní filmový úder.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -16,
      ratio: '4:1',
      attack: '15 ms',
      release: '140 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'VCA komprese pro pevný úder.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Drum Room)',
        model: 'Vintage Plate',
        sendLevelDb: -12,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Panujte tomy v souladu s pohledem posluchače: Tom 1 = L35, Tom 2 = L10, Tom 3 (Floor) = R35.',
      'Pro floor tom snižte HPF na 45 Hz a přidejte bas na 80 Hz.'
    ]
  },
  {
    id: 'drums-overheads-stereo',
    name: 'Overheads Stereo pár (Cymbals & Kit Ambience)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Široký, vyvážený a prostorový stereo obraz celé bicí soupravy (Crash, Ride, Splash, China činely) metodou Spaced Pair AB nebo ORTF.',
    recommendedInput: 'Local In 9/10 (Stereo Pair Condenser)',
    preampGain: 30,
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
      hpfFreq: 280,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 500, gain: -2.5, q: 2.0, enabled: true }, // Odstranění přeslechů z virblu
        { id: 'b2', type: 'peq', freq: 2400, gain: 1.5, q: 1.6, enabled: true }, // Zvonivost těla činelů
        { id: 'b3', type: 'peq', freq: 5500, gain: -2.0, q: 3.0, enabled: true }, // Krocení řezavých crashů
        { id: 'b4', type: 'high-shelf', freq: 11000, gain: 4.0, q: 0.7, enabled: true }, // Křišťálový vzduch a jiskra
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 280 Hz vyčistí kopák a tomy, zdvih +4 dB na 11 kHz dodá lesk zlatých slitin B20 činelů.'
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
      notes: 'Jemné lepení (Glue) stereo obrazu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Drum Room)',
        model: 'Vintage Room',
        sendLevelDb: -14,
        decayOrTime: '1.4 s',
        keySettings: 'Predelay 15ms'
      }
    },
    proTips: [
      'Změřte vzdálenost obou overhead mikrofonů od středu virblu – musí být naprosto stejná (např. 110 cm), aby virbl stál přesně uprostřed stereo báze.',
      'Na WING aktivujte Stereo Imager na 115% pro široký rozptyl činelů.'
    ]
  },
  {
    id: 'drums-timpani-stereo',
    name: 'Orchestrální tympány (Timpani Stereo Pair)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Hromový, monumentální a melodicky čistý zvuk sady 4 orchestrálních tympánů s plným měděným dozněním kotle.',
    recommendedInput: 'Local In 11/12 (Stereo Pair)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
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
      notes: 'Bypass pro plné doznění kotlů.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 32,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 65, gain: 3.5, q: 1.6, enabled: true }, // Basový fundament velkého kotle (32")
        { id: 'b2', type: 'peq', freq: 140, gain: 2.5, q: 1.8, enabled: true }, // Tělo úderu (28" a 25")
        { id: 'b3', type: 'peq', freq: 350, gain: -3.5, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 2200, gain: 3.0, q: 1.6, enabled: true }, // Plstěná palička a blána (Mallet Attack)
        { id: 'b5', type: 'high-shelf', freq: 8000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 65 Hz a 140 Hz dodá dramatickým orchestrálním vírům monumentální váhu.'
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
      notes: 'Optická komprese srovná crescenda od tichého pianissima po drtivé tutti fortissimo.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 40ms, Symphony Hall'
      }
    },
    proTips: [
      'Pár mikrofonů umístěte cca 1–1.5 m nad půlkruh tympánů směřující šikmo do středů blan.',
      'Při dramatickém víru (Roll) držte fader pevně pod 0 dB, abyste nezahltili PA systém.'
    ]
  },
  {
    id: 'drums-gran-cassa-bassdrum',
    name: 'Velký buben orchestrální (Gran Cassa / Concert Bass Drum)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Monumentální hluboký subbasový úder velkého koncertního orchestrálního bubnu (Gran Cassa 36"-40").',
    recommendedInput: 'Local In 13 (XLR)',
    preampGain: 28,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 350,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 25,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 40, gain: 5.0, q: 1.5, enabled: true }, // Sub-kontra hrom
        { id: 'b2', type: 'peq', freq: 90, gain: 2.5, q: 1.8, enabled: true }, // Dunivá váha těla
        { id: 'b3', type: 'peq', freq: 280, gain: -4.0, q: 2.2, enabled: true }, // Boxy cut
        { id: 'b4', type: 'peq', freq: 1600, gain: 2.0, q: 1.8, enabled: true }, // Plstěná palička
        { id: 'b5', type: 'lpf', freq: 6000, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'HPF na 25 Hz. Zdvih +5 dB na 40 Hz rozechvěje sedačky v celém koncertním sále.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -15,
      ratio: '3.5:1',
      attack: '20 ms',
      release: '200 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'Pomalý náběh propustí mohutný atak plstěné paličky.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '3.0 s',
        keySettings: 'Predelay 45ms'
      }
    },
    proTips: [
      'Použijte velkomembránový kondenzátorový mikrofon cca 50 cm od blány pod úhlem 45°.',
      'Aktivujte insert Psycho Bass pro ještě větší seismickou vlnu v sále.'
    ]
  },
  {
    id: 'drums-cymbals-tamtam-gong',
    name: 'Orchestrální činely & Tam-Tam / Gong (Piatti & Tam-Tam)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Explozivní třesk ručních činelů (Piatti a due) a nekonečné mystické doznění velkého čínského gongu (Tam-Tam).',
    recommendedInput: 'Local In 14 (XLR Condenser Pair)',
    preampGain: 30,
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
      hpfFreq: 80,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 2.0, q: 1.4, enabled: true }, // Hluboký fundament Tam-Tamu
        { id: 'b2', type: 'peq', freq: 850, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: 2.5, q: 1.6, enabled: true }, // Třesk srážky činelů
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.0, q: 3.0, enabled: true }, // Krocení řezání
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Zlatý šum
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 11 kHz rozzáří slavnostní fanfárové údery ručních činelů.'
    },
    comp: {
      enabled: true,
      model: 'Precision Limiter',
      threshold: -10,
      ratio: '4:1',
      attack: 'Fast (0.5 ms)',
      release: '150 ms',
      knee: 2,
      makeUpGain: 1.5,
      notes: 'Bezpečnostní limiter chrání systém před obrovským akustickým tlakem srážky činelů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '3.2 s',
        keySettings: 'Predelay 40ms, Cathedral / Symphony'
      }
    },
    proTips: [
      'Snímejte ze vzdálenosti cca 1.5–2 m, aby se zvuk stihl v prostoru plně rozvinout.',
      'Tam-Tam vyžaduje citlivý mikrofon s bohatým spodkem pro zachycení infrazvukových vln.'
    ]
  },
  {
    id: 'drums-marimba-xylophone',
    name: 'Marimba & Xylofon (Tuned Percussion Stereo)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Dřevitý, hřejivý a zpěvný tón palisandrových kamenů marimby s rezonátory a krystalický úder xylofonu.',
    recommendedInput: 'Local In 15/16 (Stereo Pair Condenser)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -52,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 70,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 3.0, q: 1.4, enabled: true }, // Teplé basové kameny marimby
        { id: 'b2', type: 'peq', freq: 550, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 2800, gain: 3.5, q: 1.6, enabled: true }, // Dřevěný úder paličky (Mallet Click)
        { id: 'b4', type: 'high-shelf', freq: 10000, gain: 2.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 140 Hz pro rezonátory marimby, 2.8 kHz pro dřevitý atak.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Optická komprese srovnává rychlé virtuózní běhy.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Pár mikrofonů zavěste cca 50–70 cm nad kameny ve stereofonním rozptylu podél celé klaviatury marimby.',
      'Na WING zapněte Velvet Imager na šířku 120% pro pohlcující prostor.'
    ]
  },
  {
    id: 'drums-cajon-acoustic',
    name: 'Cajón (Flamenco & Acoustic Cajon)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Activity',
    tagColor: '#ef4444',
    description: 'Hutný basový punch zadního otvoru spojený s ostrým virblovým plácnutím dlaně o horní desku.',
    recommendedInput: 'Local In 1 (XLR Zadní otvor) + Local In 2 (XLR Přední deska)',
    preampGain: 28,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -44,
      ratio: '1:3',
      attack: 1,
      hold: 30,
      release: 140,
      range: 18,
      notes: 'Gate.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 70, gain: 4.5, q: 1.5, enabled: true }, // Basový box kick
        { id: 'b2', type: 'peq', freq: 350, gain: -5.0, q: 2.2, enabled: true }, // Odstranění dutého zvuku překližky
        { id: 'b3', type: 'peq', freq: 1800, gain: 2.0, q: 1.8, enabled: true },
        { id: 'b4', type: 'peq', freq: 4500, gain: 4.5, q: 1.6, enabled: true }, // Plácnutí dlaně a struník (Slap)
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 70 Hz vytvoří z cajónu plnohodnotný kopák, výřez 350 Hz vyčistí krabici a 4.5 kHz dodá ostrý slap.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -16,
      ratio: '4:1',
      attack: '12 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'VCA komprese pro pevný rytmický groove.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Acoustic Space)',
        model: 'Vintage Plate',
        sendLevelDb: -12,
        decayOrTime: '1.6 s',
        keySettings: 'Predelay 15ms'
      }
    },
    proTips: [
      'Pro ideální zvuk použijte 2 mikrofony: dynamický (např. Beta 52 nebo SM57) do zadního otvoru na bas a kondenzátorový zepředu 20 cm od horního okraje na facky (slapy).',
      'V akustickém triu nahradí perfektně nastavený cajón celou bicí soupravu.'
    ]
  },
  {
    id: 'drums-latin-percussion-congas',
    name: 'Latinské perkuse (Congas, Bongos, Timbales)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Tradiční, šťavnatý a dynamický tón konga (Tumba, Conga, Quinto), bonga a timbálů pro latinskoamerické rytmy.',
    recommendedInput: 'Local In 3/4 (XLR Dynamic Pair)',
    preampGain: 28,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -44,
      ratio: '1:2.5',
      attack: 1,
      hold: 40,
      release: 160,
      range: 16,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 80,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 3.0, q: 1.5, enabled: true }, // Basové tělo tónu
        { id: 'b2', type: 'peq', freq: 650, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 2800, gain: 3.5, q: 1.6, enabled: true }, // Zvonivý otevřený úder (Open Tone)
        { id: 'b4', type: 'peq', freq: 5000, gain: 4.0, q: 1.6, enabled: true }, // Ostrý slap dlaně (Slap Attack)
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 2.8 kHz a 5 kHz vytáhne pověstný kubánský slap.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -15,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'FET komprese udrží ostré slapy pod kontrolou.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Latin Space)',
        model: 'Vintage Plate',
        sendLevelDb: -11,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Panujte Quinto L25 a Conga/Tumba R25 pro přirozený prostor.',
      'Snímejte dynamickými mikrofony SM57 nebo Sennheiser e604 pod úhlem 45° u ráfku.'
    ]
  },
  {
    id: 'drums-small-percussion-shaker',
    name: 'Malé perkuse (Tamburína, Triangl, Shaker, Kastaněty)',
    category: 'drums',
    categoryLabel: 'Bicí soupravy',
    icon: 'Radio',
    tagColor: '#ef4444',
    description: 'Jiskřivý, krystalický a přesný zvuk jemných perkusí s vysokým ořezem spodního pásma.',
    recommendedInput: 'Local In 5 (XLR Condenser)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 25,
    faderDefault: -2.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 1,
      hold: 30,
      release: 120,
      range: 16,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 400,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 1200, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b2', type: 'peq', freq: 4500, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 8500, gain: 3.5, q: 1.6, enabled: true }, // Zvonění plíšků tamburíny
        { id: 'b4', type: 'high-shelf', freq: 12500, gain: 4.0, q: 0.7, enabled: true }, // Krystalický vzduch shakeru a trianglu
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Extrémní HPF na 400 Hz zcela eliminuje pódiový hluk a ponechá jen čisté vysoké frekvence.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '120 ms',
      knee: 3,
      makeUpGain: 1.5,
      notes: 'Jemná komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Perc Space)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Pro shaker a tamburínu snímejte kondenzátorovým mikrofonem ze vzdálenosti cca 30–40 cm (ne příliš blízko).',
      'Pro triangl přidejte bohatý hall reverb.'
    ]
  }
];
