import { InstrumentPreset } from '../../types';

export const WOODWINDS_PRESETS: InstrumentPreset[] = [
  {
    id: 'ww-flute-concert',
    name: 'Příčná flétna (Concert Flute in C)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4', // Cyan
    description: 'Vzdušný, čistý a zářivý tón příčné flétny pro sólové i orchestrální party. Citlivé potlačení dechového šumu a rezonance náustku.',
    recommendedInput: 'Local In 1 (XLR Condenser)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -25,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 80,
      release: 250,
      range: 12,
      notes: 'Mírný expander pro tiché nádechy hráče.'
    },
    eq: {
      enabled: true,
      model: 'WING EQ',
      hpfFreq: 180,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 350, gain: 2.0, q: 1.4, enabled: true }, // Tělo spodního rejstříku
        { id: 'b2', type: 'peq', freq: 1200, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.5, q: 1.8, enabled: true }, // Lesk a artikulace
        { id: 'b4', type: 'peq', freq: 6500, gain: -3.0, q: 3.0, enabled: true }, // Ztlumení syčení dechu o hranu
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.0, q: 0.7, enabled: true }, // Vzdušnost (Air)
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'HPF 180 Hz odstraní rázy klapek a pódiový hluk. Zásek na 6.5 kHz zjemní ostrý nádechový šum.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -14,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 4,
      makeUpGain: 2.0,
      notes: 'Optická komprese pro přirozené cantabile frázování bez pumpování.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 35ms, Early Reflections 55%'
      }
    },
    proTips: [
      'Mikrofon miřte cca 20–30 cm nad náustek mírně pod úhlem 45° (nikdy ne přímo do otvoru náustku).',
      'V tichých větách orchestrálních skladeb můžete povolit HPF na 140 Hz pro plnější tón spodních tónů c1 a d1.'
    ]
  },
  {
    id: 'ww-piccolo',
    name: 'Pikola (Piccolo Flute)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Bravurní, průrazný a zářivý tón pikoly ve vysokém rejstříku bez nepříjemné řezavosti ve fortissimu.',
    recommendedInput: 'Local In 2 (XLR)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
    faderDefault: -2.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2.5',
      attack: 1,
      hold: 60,
      release: 200,
      range: 16,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 450,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 850, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 2400, gain: 2.0, q: 1.6, enabled: true }, // Tělo tónu
        { id: 'b3', type: 'peq', freq: 4200, gain: -4.0, q: 3.5, enabled: true }, // Krocení ostrosti
        { id: 'b4', type: 'peq', freq: 7500, gain: -3.0, q: 3.0, enabled: true }, // Potlačení řezání v uších
        { id: 'b5', type: 'high-shelf', freq: 13000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Vysoký HPF na 450 Hz. Záseky na 4.2 kHz a 7.5 kHz zkrotí agresivní třetí oktávu ve fortissimu.'
    },
    comp: {
      enabled: true,
      model: 'Precision Limiter',
      threshold: -12,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 1.5,
      notes: 'Rychlý limiter chrání uši posluchačů i PA systém před extrémními špičkami.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -12,
        decayOrTime: '2.6 s',
        keySettings: 'Predelay 40ms'
      }
    },
    proTips: [
      'Pikola je přirozeně velmi hlasitá – držte fader v záporných hodnotách a používejte kompresor jako bezpečnostní brzdu.',
      'Snímejte ze vzdálenosti cca 40–50 cm šikmo od hráče.'
    ]
  },
  {
    id: 'ww-alto-bass-flute',
    name: 'Altová & Basová flétna (Alto & Bass Flute)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Hluboký, sametový, dechový a mystický tón altové (in G) a basové flétny pro komorní hudbu, filmové melodie a jazz.',
    recommendedInput: 'Local In 3 (XLR Condenser)',
    preampGain: 40,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 3,
      hold: 90,
      release: 300,
      range: 10,
      notes: 'Jemný expander pro zachování tichých pasáží.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 90,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 3.5, q: 1.4, enabled: true }, // Hluboký samet
        { id: 'b2', type: 'peq', freq: 450, gain: 2.0, q: 1.5, enabled: true }, // Hřejivé tělo
        { id: 'b3', type: 'peq', freq: 1800, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3800, gain: 2.5, q: 1.6, enabled: true }, // Dechová artikulace
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 160 Hz dodá unikátní dřevitý a hluboký basový charakter.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -16,
      ratio: '3:1',
      attack: 'Smooth',
      release: '220 ms',
      knee: 4,
      makeUpGain: 2.5,
      notes: 'Zajišťuje dostatečnou hlasitost jemného nástroje v celém pásmu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Hall Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.8 s',
        keySettings: 'Warm Concert Hall'
      }
    },
    proTips: [
      'Použijte citlivý velkomembránový kondenzátorový mikrofon pro zachycení bohatého spodního spektra.',
      'Snímejte ze vzdálenosti cca 25 cm mířící mezi náustek a první klapky.'
    ]
  },
  {
    id: 'ww-oboe',
    name: 'Hoboj (Oboe in C)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Ušlechtilý, zpěvný a expresivní tón dvouplátkového hoboje. Zkrocení nosových středů a zvýraznění orchestrálního lesku.',
    recommendedInput: 'Local In 4 (XLR)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -10,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2',
      attack: 2,
      hold: 70,
      release: 220,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 160,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 320, gain: 2.0, q: 1.4, enabled: true }, // Tělo nástroje
        { id: 'b2', type: 'peq', freq: 1100, gain: -3.5, q: 2.8, enabled: true }, // Nosový plátkový zářez
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.0, q: 1.6, enabled: true }, // Zpěvnost sóla
        { id: 'b4', type: 'peq', freq: 5500, gain: -2.5, q: 3.0, enabled: true }, // Zkrocení bzučení strojku
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zásek na 1.1 kHz odstraní nepříjemný nosový zvuk plátku strojku (duck quack).'
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
      notes: 'Transparentní lampová komprese pro zachování křehkého výrazu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Mikrofon zamiřte ze vzdálenosti cca 35–45 cm pod úhlem 45° shora na spodní třetinu těla (ne přímo do korpusu).',
      'Páskový mikrofon (Ribbon) dodá hoboji nezaměnitelný analogový samet.'
    ]
  },
  {
    id: 'ww-cor-anglais',
    name: 'Anglický roh (English Horn / Cor Anglais in F)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Melancholický, hluboký a vřelý altový tón anglického rohu s hruškovitým ozvučníkem.',
    recommendedInput: 'Local In 5 (XLR)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -5,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 80,
      release: 250,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 3.0, q: 1.4, enabled: true }, // Teplé tělo hruškovitého korpusu
        { id: 'b2', type: 'peq', freq: 650, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 1300, gain: -2.5, q: 2.2, enabled: true }, // Nosovost
        { id: 'b4', type: 'peq', freq: 3200, gain: 2.0, q: 1.6, enabled: true }, // Zpěvná melodie
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 220 Hz podtrhne hřejivý altový rozsah, potlačení 1.3 kHz odstraní nosový nádech.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Optická komprese pro plynulý tok cantabile melodií.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.7 s',
        keySettings: 'Warm Concert Hall'
      }
    },
    proTips: [
      'Anglický roh má širší a temnější tón než hoboj – pošlete více signálu do bohatého hall reverbu.',
      'Snímejte ze vzdálenosti cca 40 cm mířící na střed nástroje.'
    ]
  },
  {
    id: 'ww-clarinet-bb-a',
    name: 'Klarinet v B / A (Bb & A Clarinet)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Univerzální, kulatý a barevný tón klarinetu od hlubokého šalmajového rejstříku (Chalumeau) po jasný klarinový rejstřík.',
    recommendedInput: 'Local In 6 (XLR)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 10,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 80,
      release: 250,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 240, gain: 2.5, q: 1.4, enabled: true }, // Šalmajový fundament
        { id: 'b2', type: 'peq', freq: 700, gain: 1.5, q: 1.6, enabled: true }, // Střední dřevnatost
        { id: 'b3', type: 'peq', freq: 1800, gain: -2.0, q: 2.0, enabled: true }, // Krabicový střed
        { id: 'b4', type: 'peq', freq: 3500, gain: 2.5, q: 1.6, enabled: true }, // Zpěvnost a artikulace
        { id: 'b5', type: 'high-shelf', freq: 9500, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 240 Hz dodá bohatost šalmajovému rejstříku, 3.5 kHz vytáhne artikulaci klapek a jazýčku.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -14,
      ratio: '3:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 3,
      makeUpGain: 2.0,
      notes: 'Optická komprese srovnává dynamické rozdíly mezi spodním a horním rejstříkem.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Clarinet Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 25ms, Diffuse 80%'
      }
    },
    proTips: [
      'Zvuk klarinetu vychází ze všech otevřených dírek, nikoli jen z ozvučníku. Mikrofon umístěte cca 30 cm nad klapky pravé ruky pod úhlem 45°.',
      'Pro klezmer nebo jazzový styl s glissandem přidejte +2 dB na 4.5 kHz pro větší dravost.'
    ]
  },
  {
    id: 'ww-eb-clarinet',
    name: 'Es klarinet (Eb Clarinet Piccolo)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Průrazný, řízný a virtuózní tón malého Es klarinetu pro dechovku, symfonický orchestr i vojenské kapely.',
    recommendedInput: 'Local In 7 (XLR)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 15,
    faderDefault: -1.5,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2',
      attack: 2,
      hold: 60,
      release: 200,
      range: 14,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 220,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 450, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 1500, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3800, gain: -3.0, q: 3.0, enabled: true }, // Krocení ostrosti
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.5, q: 3.5, enabled: true }, // Harsh cut
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 220 Hz. Záseky 3.8 kHz a 6.5 kHz zjemňují pronikavý zvuk v tutti pasážích.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -14,
      ratio: '3.5:1',
      attack: '15 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.0,
      notes: 'VCA komprese kontroluje hlasitostní špičky ve vysokém rejstříku.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Brass Space)',
        model: 'Vintage Reverb',
        sendLevelDb: -11,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'V dechovkovém partu je Es klarinet často vedoucím hlasem nad křídlovkami – nastavte mu pan R15.',
      'Snímejte ze vzdálenosti cca 30 cm.'
    ]
  },
  {
    id: 'ww-bass-clarinet',
    name: 'Basklarinet (Bass Clarinet in Bb)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Monumentální, hluboký, dřevitý a temný tón basklarinetu s kovovým esem a ozvučníkem směřujícím nahoru.',
    recommendedInput: 'Local In 8 (XLR)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2',
      attack: 3,
      hold: 60,
      release: 240,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 80, gain: 3.5, q: 1.5, enabled: true }, // Hluboký basový fundament
        { id: 'b2', type: 'peq', freq: 200, gain: 2.0, q: 1.6, enabled: true }, // Tělo nástroje
        { id: 'b3', type: 'peq', freq: 500, gain: -3.0, q: 2.0, enabled: true }, // Krabicovost
        { id: 'b4', type: 'peq', freq: 2200, gain: 2.5, q: 1.8, enabled: true }, // Zpěvnost a artikulace plátku
        { id: 'b5', type: 'high-shelf', freq: 8500, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 80 Hz a 200 Hz vytáhne masivní hloubku, 2.2 kHz dodá artikulaci klapek a tónu.'
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
      notes: 'Rychlá FET komprese udrží pod kontrolou hutné basové pasáže.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Deep Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.4 s',
        keySettings: 'Warm Room, Low Cut 80Hz'
      }
    },
    proTips: [
      'Ideální je kombinace dvou mikrofonů: jeden u horních klapek a druhý u spodního zahnutého ozvučníku.',
      'Při jednom mikrofonu miřte ze vzdálenosti 40 cm na střed těla nástroje.'
    ]
  },
  {
    id: 'ww-bassoon',
    name: 'Fagot (Bassoon in C)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Charakterní, teplý a sonorní tón fagotu. Vyzdvihuje hluboký basový fundament i nosnou zpěvnost tenorového rejstříku.',
    recommendedInput: 'Local In 9 (XLR)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 25,
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
      model: 'Even 84 (Neve Style)',
      hpfFreq: 55,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 110, gain: 3.0, q: 1.5, enabled: true }, // Basový fundament
        { id: 'b2', type: 'peq', freq: 280, gain: 2.0, q: 1.4, enabled: true }, // Tělo dřeva
        { id: 'b3', type: 'peq', freq: 650, gain: -2.5, q: 2.0, enabled: true }, // Zákal
        { id: 'b4', type: 'peq', freq: 1800, gain: 2.5, q: 1.8, enabled: true }, // Tenorová zpěvnost
        { id: 'b5', type: 'high-shelf', freq: 8500, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 110 Hz pro hloubku, zásek na 650 Hz pro čistotu a 1.8 kHz pro zpěvnost melodie.'
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
      notes: 'Plynulá optická komprese podporuje přirozené legato.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Fagot vyzařuje zvuk směrem nahoru i klapkami do stran. Umístěte mikrofon cca 50 cm od středu nástroje mířící mírně vzhůru.',
      'Pro sólové pasáže v symfonickém orchestru přidejte +2 dB na 2 kHz.'
    ]
  },
  {
    id: 'ww-contrabassoon',
    name: 'Kontrafagot (Contrabassoon in C)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Nejhlubší dřevěný dechový nástroj orchestru sahající až k sub-kontra B (subbasy pod 30 Hz).',
    recommendedInput: 'Local In 10 (XLR)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 30,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -42,
      ratio: '1:2.5',
      attack: 4,
      hold: 50,
      release: 220,
      range: 15,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 28,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 45, gain: 4.0, q: 1.6, enabled: true }, // Sub-kontra fundament
        { id: 'b2', type: 'peq', freq: 110, gain: 2.5, q: 1.8, enabled: true }, // Masivní tělo
        { id: 'b3', type: 'peq', freq: 350, gain: -3.5, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 1400, gain: 2.0, q: 2.0, enabled: true }, // Zvuk strojku
        { id: 'b5', type: 'lpf', freq: 7500, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Extrémně nízký HPF na 28 Hz. Zdvih 45 Hz a 110 Hz rozvibruje celý sál.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -16,
      ratio: '4:1',
      attack: '20 ms',
      release: '150 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'Pevná VCA komprese udrží subbasy na stabilní úrovni.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Psycho Bass (Subharmonic Enhancer)',
        keySettings: 'Intensity 25%, X/O Freq 65Hz'
      }
    },
    proTips: [
      'Použijte velkomembránový dynamický nebo páskový mikrofon schopný přesně snímat frekvence od 30 Hz.',
      'Snímejte spodní zahnutou část korpusu ze vzdálenosti cca 40 cm.'
    ]
  },
  {
    id: 'ww-soprano-sax',
    name: 'Sopránový saxofon (Soprano Saxophone in Bb)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Zpěvný, pronikavý a orientální i jazzový tón sopránsaxofonu s vyrovnanou horní oktávou.',
    recommendedInput: 'Local In 11 (XLR)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2',
      attack: 2,
      hold: 50,
      release: 200,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 140,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 850, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3000, gain: 2.5, q: 1.6, enabled: true }, // Sólová přítomnost
        { id: 'b4', type: 'peq', freq: 6000, gain: -3.0, q: 3.0, enabled: true }, // Zkrocení ostrosti
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zásek na 6 kHz odstraní agresivní syčení plátku v jazzových sólech.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -15,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'FET komprese udrží pod kontrolou dynamická crescenda.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Warm Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 25ms'
      }
    },
    proTips: [
      'U rovného sopránsaxofonu miřte mikrofon cca 25 cm nad klapky pod úhlem 45°, ne přímo do rovného korpusu.',
      'Páskový mikrofon (např. Royer R121) poskytne dokonale teplý akustický tón.'
    ]
  },
  {
    id: 'ww-alto-sax',
    name: 'Altový saxofon (Alto Saxophone in Eb)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Kultovní, expresivní a dravý tón altsaxofonu pro bigbandové sekce, jazzová sóla i popové linky.',
    recommendedInput: 'Local In 12 (XLR)',
    preampGain: 28,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2',
      attack: 2,
      hold: 50,
      release: 200,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.5, q: 1.5, enabled: true }, // Teplé tělo
        { id: 'b2', type: 'peq', freq: 550, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 2600, gain: 3.0, q: 1.6, enabled: true }, // Sólový říz a průraznost
        { id: 'b4', type: 'peq', freq: 5500, gain: -2.5, q: 3.0, enabled: true }, // Krocení ostrosti
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 220 Hz pro tělo, 2.6 kHz dodá pověstný altsaxofonový drajv v popovém mixu.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -14,
      ratio: '3:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 3,
      makeUpGain: 2.0,
      notes: 'Plynulá optická komprese srovnává dynamiku hry.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Vintage Plate)',
        model: 'Vintage Plate',
        sendLevelDb: -11,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 25ms, Density 75%'
      }
    },
    proTips: [
      'Mikrofon namiřte na okraj korpusu (off-axis) cca 15–20 cm od ozvučníku.',
      'Pro popové sólo přidejte jemný stereo chorus nebo krátký slap delay (120 ms).'
    ]
  },
  {
    id: 'ww-tenor-sax',
    name: 'Tenorový saxofon (Tenor Saxophone in Bb)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Chraplavý, masivní, sametový a průrazný tón tenorsaxofonu – král jazzových a rockových dechových sól.',
    recommendedInput: 'Local In 13 (XLR)',
    preampGain: 28,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2',
      attack: 2,
      hold: 50,
      release: 220,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 3.0, q: 1.5, enabled: true }, // Masivní spodek
        { id: 'b2', type: 'peq', freq: 450, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b3', type: 'peq', freq: 1100, gain: -2.0, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 2400, gain: 3.5, q: 1.6, enabled: true }, // Chraplák a artikulace (Grit)
        { id: 'b5', type: 'high-shelf', freq: 9000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 160 Hz dodá legendární tělo, 2.4 kHz vytáhne chraplavý growl a expresivitu.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'FET komprese udrží pod kontrolou dynamické skoky při expresivních sólech.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Tape Delay & Verb)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Dynamický mikrofon jako Shure SM7B nebo EV RE20 zvládne obrovský akustický tlak tenorsaxofonu bez zkreslení.',
      'Snímejte mírně z úhlu cca 20 cm od korpusu.'
    ]
  },
  {
    id: 'ww-baritone-sax',
    name: 'Barytonový saxofon (Baritone Saxophone in Eb)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Hromový basový pilíř dechové sekce sahající až k nízkému A. Pevný fundament s rychlým atakem jazýčku.',
    recommendedInput: 'Local In 14 (XLR)',
    preampGain: 26,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 25,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -42,
      ratio: '1:2.5',
      attack: 2,
      hold: 40,
      release: 180,
      range: 15,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 50,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 75, gain: 3.5, q: 1.6, enabled: true }, // Basový fundament (Low A)
        { id: 'b2', type: 'peq', freq: 180, gain: 2.5, q: 1.8, enabled: true }, // Dřevěný punch
        { id: 'b3', type: 'peq', freq: 400, gain: -3.5, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 2000, gain: 3.0, q: 1.8, enabled: true }, // Řev a artikulace plátku
        { id: 'b5', type: 'lpf', freq: 8000, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zdvih 75 Hz a 180 Hz vytvoří masivní basovou zeď. 2.0 kHz dodá dravost v bigbandu.'
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
      notes: 'Rychlá VCA komprese srovná dynamiku rychlých basových riffů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Room Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -13,
        decayOrTime: '1.8 s',
        keySettings: 'Low Cut 80Hz'
      }
    },
    proTips: [
      'Použijte mikrofon s vynikající basovou odezvou (např. Sennheiser MD421 nebo Beyerdynamic M88).',
      'V bigbandu hraje baryton často unisono s basovou kytarou – zkontrolujte fázovou čistotu na subbaskonferenci.'
    ]
  },
  {
    id: 'ww-recorder-soprano-alto',
    name: 'Zobcová flétna (Soprano & Alto Recorder)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Čistý, dřevitý a jemný tón sopránové a altové zobcové flétny pro barokní i folkovou hudbu.',
    recommendedInput: 'Local In 15 (XLR Condenser)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -10,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -55,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 300,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 220,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 500, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 1600, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: -2.5, q: 2.5, enabled: true }, // Krocení ostrosti
        { id: 'b4', type: 'high-shelf', freq: 10000, gain: 2.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 220 Hz odstraní hluk pultu a manipulace. Jemný high-shelf 10 kHz dodá jiskru dřeva.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Měkká komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.8 s',
        keySettings: 'Cathedral / Church Hall'
      }
    },
    proTips: [
      'Snímejte ze vzdálenosti cca 30–40 cm mírně ze strany nad labiem.',
      'Pro barokní hudbu pošlete více signálu do bohatého katedrálního reverbu.'
    ]
  },
  {
    id: 'ww-section-tutti-stereo',
    name: 'Dřevěná dechová sekce Tutti Stereo (Woodwind Section Pair)',
    category: 'woodwinds',
    categoryLabel: 'Dřevěné dechové nástroje',
    icon: 'Radio',
    tagColor: '#06b6d4',
    description: 'Globální stereo snímání celé dřevěné dechové sekce orchestru (Flétny, Hoboje, Klarinety, Fagoty) párem mikrofonů ORTF/AB.',
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
      notes: 'Bypass pro stereo pár.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 100,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 1.5, q: 1.2, enabled: true }, // Tělo sekce
        { id: 'b2', type: 'peq', freq: 900, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.0, q: 1.4, enabled: true }, // Zpěvnost tutti
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.0, q: 3.0, enabled: true }, // Krocení syčení
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 2.5, q: 0.7, enabled: true }, // Vzdušnost
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Vyvážená ekvalizace pro kompaktní homogenní zvuk celé dřevěné sekce.'
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
      notes: 'Transparentní glue komprese pro přirozená orchestrální crescenda.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 40ms, Early Reflections 50%'
      }
    },
    proTips: [
      'Stereo pár mikrofonů zavěste cca 2.5 m nad a před dřevěnou sekcí.',
      'Na stereofonním kanálu WING nastavte Stereo Width na 115% pro otevřenější prostor.'
    ]
  }
];
