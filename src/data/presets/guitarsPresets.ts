import { InstrumentPreset } from '../../types';

export const GUITARS_PRESETS: InstrumentPreset[] = [
  {
    id: 'guitars-acoustic-steel',
    name: 'Akustická kytara Western (Steel String Acoustic)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981', // Emerald
    description: 'Zvonivý, perlivý a dynamický tón westernové kytary s kovovými strunami pro vybrnkávání i energický strumming doprovod.',
    recommendedInput: 'Local In 7 (XLR Condenser / DI Box)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -25,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 250,
      range: 8,
      notes: 'Bypass pro zachování doznívání akordů.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 90,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 2.0, q: 1.4, enabled: true }, // Teplé tělo dreadnoughtu
        { id: 'b2', type: 'peq', freq: 450, gain: -3.5, q: 2.2, enabled: true }, // Odstranění dutosti (mud / boxy cut)
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.5, q: 1.6, enabled: true }, // Přítomnost a artikulace prstů
        { id: 'b4', type: 'peq', freq: 5500, gain: -2.0, q: 2.5, enabled: true }, // Zkrocení ostrého plastového trsátka
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Vzdušný lesk strun (Shimmer)
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zásek na 450 Hz pročistí středový zákal. Zdvih 11 kHz dodá studiový třpyt nově natažených strun.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -14,
      ratio: '3:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 4,
      makeUpGain: 2.0,
      notes: 'Optický kompresor přirozeně zaoblí dynamické špičky při silném strummingu bez pumpování.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Acoustic Space)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 25ms, Density 75%'
      }
    },
    proTips: [
      'Při snímání mikrofonem zamiřte kapsli na 12. pražec pod úhlem 45° ze vzdálenosti 20–25 cm (nikdy nemiřte přímo do ozvučného otvoru).',
      'Při použití piezo linky z kytary aktivujte v insertu WING efekt BodyRez pro obnovu přirozeného dřevěného korpusu.'
    ]
  },
  {
    id: 'guitars-classical-nylon',
    name: 'Klasická kytara - Španělka (Nylon String Classical)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Hřejivý, dřevitý, intimní a ušlechtilý tón španělské kytary s nylonovými strunami pro klasiku, flamenco a bossa novu.',
    recommendedInput: 'Local In 7 (XLR Condenser)',
    preampGain: 38,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
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
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 80,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.5, q: 1.4, enabled: true }, // Teplé tělo španělky
        { id: 'b2', type: 'peq', freq: 650, gain: 1.5, q: 1.6, enabled: true }, // Dřevitý střed
        { id: 'b3', type: 'peq', freq: 1600, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3200, gain: 2.5, q: 1.6, enabled: true }, // Artikulace nehtů
        { id: 'b5', type: 'high-shelf', freq: 9500, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 180 Hz a 3.2 kHz podtrhne jemný dotek nehtů a hřejivou rezonanci cedrové desky.'
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
      notes: 'Měkká lampová komprese pro zachování citlivé dynamiky.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Warm Room)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 30ms, Warm Chamber'
      }
    },
    proTips: [
      'Pro flamenco přidejte +3 dB na 3.5 kHz pro výrazné údery golpe na ozvučnou desku.',
      'Snímejte citlivým malomembránovým kondenzátorem cca 30 cm od 12. pražce.'
    ]
  },
  {
    id: 'guitars-12-string-acoustic',
    name: '12-strunná akustická kytara (12-String Acoustic)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Bohatý, zvonivý a přirozeně zdvojený stereo zvuk dvanáctistrunné akustické kytary.',
    recommendedInput: 'Local In 7 (XLR Condenser / DI)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 25,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -50,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 200, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 500, gain: -3.5, q: 2.2, enabled: true }, // Mud cut
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b4', type: 'peq', freq: 6500, gain: 3.0, q: 1.6, enabled: true }, // Zvonění oktávových strun
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.5, q: 0.7, enabled: true }, // Křišťál
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Vyšší HPF 110 Hz a zásek na 500 Hz zabrání hlcení spodků z 12 strun.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -14,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.0,
      notes: 'FET komprese udrží hustý proud strun na stabilní hlasitosti.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Shimmer Plate)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 30ms'
      }
    },
    proTips: [
      'Pro studiovou nahrávku panujte 12-strunku na jednu stranu a 6-strunku na druhou pro obrovský akustický prostor.',
      'Použijte lehký stereo chorus pro ještě širší sound.'
    ]
  },
  {
    id: 'guitars-elec-clean-funk',
    name: 'Elektrická kytara - Clean / Jazz / Funk',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Průzračný, dynamický a zvonivý čistý zvuk elektrické kytary (Stratocaster mezipolohy / Telecaster / Gibson Jazz archtop).',
    recommendedInput: 'Local In 8 (XLR / Mic na reproboxu / Kemper/Fractal DI)',
    preampGain: 24,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 180,
      range: 12,
      notes: 'Odstraní šum snímačů v pauzách.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 90,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.0, q: 1.4, enabled: true }, // Tělo kytary
        { id: 'b2', type: 'peq', freq: 750, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3000, gain: 3.5, q: 1.6, enabled: true }, // Skleněný funk atak (Glassy Quack)
        { id: 'b4', type: 'peq', freq: 5500, gain: -2.5, q: 3.0, enabled: true }, // Zkrocení kousání
        { id: 'b5', type: 'high-shelf', freq: 9500, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 3 kHz vytáhne legendární stratocasterovský mezipolohový "quack" pro funky doprovody.'
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
      notes: 'Klasická kytarová FET komprese pro perkusivní funky sekání à la Nile Rodgers.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Stereo Chorus & Delay)',
        model: 'Vintage Plate',
        sendLevelDb: -11,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Pro jazzový tón na krkovém snímači ořízněte výšky nad 4.5 kHz a přidejte +2 dB na 250 Hz pro sametový tón.',
      'Snímejte kytarový reprobox dynamickým mikrofonem Shure SM57 na okraji vrchlíku (Cap Edge).'
    ]
  },
  {
    id: 'guitars-elec-crunch-rock',
    name: 'Elektrická kytara - Overdrive & Rock Crunch',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Hutný, šťavnatý a svalnatý rockový crunch a overdrive tón kytarového lampového aparátu (Marshall Plexi / Vox AC30 / Friedman).',
    recommendedInput: 'Local In 8 (XLR / SM57 na kabinetu)',
    preampGain: 22,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: -30,
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
      notes: 'Zkrotí brum lampového aparátu.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 2.5, q: 1.5, enabled: true }, // Rytmický spodek kytary
        { id: 'b2', type: 'peq', freq: 450, gain: -2.5, q: 2.0, enabled: true }, // Odstranění krabicovosti
        { id: 'b3', type: 'peq', freq: 2200, gain: 3.5, q: 1.6, enabled: true }, // Kytarový říz a agresivita
        { id: 'b4', type: 'peq', freq: 4200, gain: -3.0, q: 3.0, enabled: true }, // Zkrocení bzučení měničů (Fizz cut)
        { id: 'b5', type: 'lpf', freq: 7500, gain: 0, q: 0.7, enabled: true }, // Ořez nepříjemného digitálního bzukotu
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'LPF na 7.5 kHz odfiltruje agresivní bzučení lampového zkreslení. 2.2 kHz dodá hutný rockový kousanec.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -12,
      ratio: '3:1',
      attack: '15 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 1.5,
      notes: 'Lehká komprese pro soudržnost akordů (zkreslený aparát již sám přirozeně komprimuje).'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Guitar Ambience)',
        model: 'Vintage Room',
        sendLevelDb: -14,
        decayOrTime: '1.4 s',
        keySettings: 'Predelay 15ms'
      }
    },
    proTips: [
      'Pro moderní hardrock a pop-punk nahrajte/zdvojte dvě identické kytary a panujte je tvrdě L100 a R100 pro masivní zvukovou stěnu.',
      'Snímejte dynamickým mikrofonem SM57 přímo u mřížky v úhlu 45° na přechodu vrchlíku a membrány.'
    ]
  },
  {
    id: 'guitars-elec-lead-solo',
    name: 'Elektrická kytara - Sólové Lead',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Nekonečný sustain, zpěvný a expresivní tón sólové kytary pro rocková, bluesová a heavymetalová sóla.',
    recommendedInput: 'Local In 8 (XLR)',
    preampGain: 22,
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
      attack: 1,
      hold: 40,
      release: 160,
      range: 20,
      notes: 'Gate pro ticho v pauzách sóla.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 2.5, q: 1.4, enabled: true }, // Plné tělo sóla
        { id: 'b2', type: 'peq', freq: 950, gain: 2.0, q: 1.6, enabled: true }, // Středový tah (Mids Boost)
        { id: 'b3', type: 'peq', freq: 3200, gain: 3.5, q: 1.6, enabled: true }, // Zpěvnost a flažolety
        { id: 'b4', type: 'peq', freq: 4800, gain: -2.5, q: 3.0, enabled: true }, // Fizz cut
        { id: 'b5', type: 'lpf', freq: 8000, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zdvih středů 950 Hz a 3.2 kHz vystřelí kytarové sólo do popředí mixu před bicí a zpěv.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -15,
      ratio: '3.5:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 3,
      makeUpGain: 2.5,
      notes: 'Optická komprese prodlužuje sustain doznění tónů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Stereo Tap Delay & Verb)',
        model: 'Stereo Delay / Tap Delay',
        sendLevelDb: -8,
        decayOrTime: '1/4 Dot Delay (375ms)',
        keySettings: 'Feedback 35%, High Cut 4kHz'
      }
    },
    proTips: [
      'Nastavte stereo delay synchronizovaný s tempem skladby (tečkovaná osmina nebo čtvrtka) se zpětnou vazbou 35%.',
      'Přidejte WING Tube Saturation pro nekonečný lampový sustain (Gary Moore / Slash styl).'
    ]
  },
  {
    id: 'guitars-bass-finger-pick',
    name: 'Elektrická baskytara - Fingerstyle & Pick (Rock/Pop)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Activity',
    tagColor: '#10b981',
    description: 'Pevný, konkrétní, hutný a průrazný tón baskytary (Fender Precision / Jazz Bass / MusicMan) hrané prsty i trsátkem.',
    recommendedInput: 'Local In 6 (DI Box / Active Line)',
    preampGain: 18,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 180,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 32,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 65, gain: 3.5, q: 1.5, enabled: true }, // Subbasový fundament (spolupráce s kopákem)
        { id: 'b2', type: 'peq', freq: 140, gain: 2.5, q: 1.8, enabled: true }, // Basový punch a váha
        { id: 'b3', type: 'peq', freq: 450, gain: -4.0, q: 2.2, enabled: true }, // Odstranění bláta (Mud cut)
        { id: 'b4', type: 'peq', freq: 1200, gain: 2.0, q: 1.8, enabled: true }, // Prstoklad a tón struny
        { id: 'b5', type: 'peq', freq: 2800, gain: 3.0, q: 1.6, enabled: true }, // Kovový atak pražců a trsátka (Bite)
        { id: 'b6', type: 'lpf', freq: 7000, gain: 0, q: 0.7, enabled: true }
      ],
      notes: 'Zdvih 65 Hz pro hluboký subbas, zásek na 450 Hz uvolní prostor pro kytary a 2.8 kHz dodá čitelný atak v rádiu.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -16,
      ratio: '4:1',
      attack: '15 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 3.5,
      notes: 'Legendární VCA komprese BDX 160 přitluče basu do jedné pevné roviny s kopákem bicích.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Psycho Bass / Sub Enhancer',
        keySettings: 'Intensity 25%, Frequency 65Hz'
      }
    },
    proTips: [
      'Nastavte HPF přesně na 32 Hz, aby basový zesilovač a subwoofery neplýtvaly energií na neslyšitelné infrazvuky.',
      'Pro rockový drajv zapněte lehkou saturaci na WING Preampu (Drive 20%).'
    ]
  },
  {
    id: 'guitars-bass-slap-funk',
    name: 'Elektrická baskytara - Slap & Pop Funk',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Activity',
    tagColor: '#10b981',
    description: 'Dynamický, úderný a krystalický tón slapové baskytary (palec na E/A struně + trhnutí G struny ukazovákem).',
    recommendedInput: 'Local In 6 (DI Box)',
    preampGain: 18,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2.5',
      attack: 1,
      hold: 30,
      release: 140,
      range: 15,
      notes: 'Gate pro čisté pauzy mezi groovy.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 35,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 55, gain: 4.0, q: 1.5, enabled: true }, // Masivní slap fundament palce
        { id: 'b2', type: 'peq', freq: 180, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 550, gain: -4.5, q: 2.5, enabled: true }, // Hluboký Smile EQ zářez
        { id: 'b4', type: 'peq', freq: 3500, gain: 4.5, q: 1.5, enabled: true }, // Krystalický praskot vytržené struny (Pop)
        { id: 'b5', type: 'high-shelf', freq: 8500, gain: 3.0, q: 0.7, enabled: true }, // Zvonění nových strun
        { id: 'b6', type: 'lpf', freq: 12000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Typický "Scoop / Smile" profil: mohutný bas 55 Hz, hluboký výřez středů 550 Hz a jiskřivý atak 3.5 kHz.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -18,
      ratio: '4:1',
      attack: 'Fast (0.5 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 4.0,
      notes: 'Super rychlá FET komprese zkrotí obrovské špičky slapového trhnutí (Pop) a ochrání reproboxy.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Funk Ambience)',
        model: 'Vintage Plate',
        sendLevelDb: -15,
        decayOrTime: '1.4 s',
        keySettings: 'Predelay 15ms'
      }
    },
    proTips: [
      'Použijte kompresor s extrémně rychlým náběhem (Fast Attack), aby špičky trhnutí struny nezpůsobily přebuzení mixpultu.',
      'Nové ocelové roundwound struny jsou pro tento zvuk nezbytné.'
    ]
  },
  {
    id: 'guitars-fretless-bass',
    name: 'Bezpražcová baskytara (Fretless Bass)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Activity',
    tagColor: '#10b981',
    description: 'Zpěvný, sametový a mňoukavý tón bezpražcové baskytary s dlouhým vibratem (Jaco Pastorius styl).',
    recommendedInput: 'Local In 6 (DI Box)',
    preampGain: 20,
    phantomPower: false,
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
      release: 250,
      range: 8,
      notes: 'Bypass pro doznění tónu.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 40,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 2.5, q: 1.5, enabled: true },
        { id: 'b2', type: 'peq', freq: 450, gain: 3.5, q: 1.6, enabled: true }, // Legendární fretless tělo
        { id: 'b3', type: 'peq', freq: 850, gain: 3.0, q: 1.8, enabled: true }, // Mňoukavý střed (Mwah)
        { id: 'b4', type: 'peq', freq: 2200, gain: 2.0, q: 1.6, enabled: true }, // Zpěvnost vibrata
        { id: 'b5', type: 'lpf', freq: 6500, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Masivní zdvih středů na 450 Hz a 850 Hz vykouzlí legendární Jaco Pastorius "mwah" zpěvnost.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -15,
      ratio: '3:1',
      attack: 'Smooth',
      release: '200 ms',
      knee: 4,
      makeUpGain: 2.5,
      notes: 'Optická komprese podporuje plynulé glissando a vibrato.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Stereo Chorus',
        keySettings: 'Rate 1.2Hz, Depth 40%, Mix 30%'
      }
    },
    proTips: [
      'Přidejte jemný stereo chorus v insertu pro nádherný 80s fusion prostor.',
      'Snímejte kobylkový snímač s tónovou clonou mírně staženou.'
    ]
  },
  {
    id: 'guitars-mandolin-banjo',
    name: 'Mandolína & Banjo (Mandolin & 5-String Banjo)',
    category: 'guitars',
    categoryLabel: 'Kytary',
    icon: 'Radio',
    tagColor: '#10b981',
    description: 'Rychlý, perkusivní, zvonivý a ostrý tón akustické mandolíny (chop akordy) a pětistrunného banja pro bluegrass, folk a country.',
    recommendedInput: 'Local In 7 (XLR Condenser)',
    preampGain: 34,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 160,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 160,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 350, gain: 2.0, q: 1.4, enabled: true }, // Dřevěné tělo mandolíny
        { id: 'b2', type: 'peq', freq: 1100, gain: -2.5, q: 2.2, enabled: true }, // Plechovost blány banja
        { id: 'b3', type: 'peq', freq: 3500, gain: 3.5, q: 1.6, enabled: true }, // Rytmický chop a kovový atak prstýnků
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.0, q: 3.0, enabled: true },
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 160 Hz. Zdvih 3.5 kHz zdůrazní ostrý rytmický "chop" úder mandolíny na druhou a čtvrtou dobu.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -14,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 2.0,
      notes: 'Rychlá FET komprese zkrotí ostré špičky kovových prstýnků banja.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Bluegrass Room)',
        model: 'Vintage Plate',
        sendLevelDb: -11,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Pro banjo miřte mikrofon na spodní okraj blány cca 20 cm od kobylky.',
      'Pro mandolínu zamiřte malomembránový kondenzátor na spodní f-otvor.'
    ]
  }
];
