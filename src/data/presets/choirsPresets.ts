import { InstrumentPreset } from '../../types';

export const CHOIRS_PRESETS: InstrumentPreset[] = [
  {
    id: 'choir-satb-mixed-stereo',
    name: 'Smíšený sbor SATB Stereo (Full Mixed Choir Pair)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Radio',
    tagColor: '#a855f7', // Purple
    description: 'Monumentální, homogenní, prostorový a křišťálově čistý stereo obraz velkého smíšeného sboru (Soprán, Alt, Tenor, Bas) metodou ORTF/AB.',
    recommendedInput: 'Local In 1/2 (Main Stereo Pair Condenser)',
    preampGain: 38,
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
      notes: 'Bypass pro zachování celého dynamického rozpětí sboru.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.0, q: 1.4, enabled: true }, // Plnost basů a altů
        { id: 'b2', type: 'peq', freq: 650, gain: -2.0, q: 2.0, enabled: true }, // Odstranění nosového zákalu
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.5, q: 1.4, enabled: true }, // Srozumitelnost textu a artikulace sboru
        { id: 'b4', type: 'peq', freq: 6800, gain: -2.5, q: 3.5, enabled: true }, // Hromadné sykavky (Choir De-Esser)
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.5, q: 0.7, enabled: true }, // Vzdušnost a třpyt sálu
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 85 Hz. Zářez na 6.8 kHz zamezí nepříjemnému znásobení sykavek celého sboru. 12 kHz dodá sakrální vzduch.'
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
      notes: 'Transparentní glue komprese pro přirozená sborová crescenda.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '3.0 s',
        keySettings: 'Cathedral / Grand Hall, Predelay 45ms'
      }
    },
    proTips: [
      'Pár mikrofonů zavěste cca 3–4 m před sborem ve výšce 3 m v konfiguraci ORTF (kapsle 17 cm od sebe, úhel 110°).',
      'Na WING aktivujte Stereo Imager (Velvet Imager) na 120% pro majestátní sborový prostor.'
    ]
  },
  {
    id: 'choir-male-ttbb',
    name: 'Mužský sbor TTBB (Male Choir)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Radio',
    tagColor: '#a855f7',
    description: 'Hluboký, sonorní, svalnatý a hřejivý zvuk mužského pěveckého sboru (1. tenor, 2. tenor, baryton, bas).',
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
      model: 'Even 84 (Neve Style)',
      hpfFreq: 70,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 3.0, q: 1.5, enabled: true }, // Hluboký basový fundament
        { id: 'b2', type: 'peq', freq: 400, gain: 1.5, q: 1.4, enabled: true }, // Hřejivé tělo
        { id: 'b3', type: 'peq', freq: 1100, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 2800, gain: 3.0, q: 1.6, enabled: true }, // Pěvecký formant a artikulace
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 140 Hz a 2.8 kHz vyzdvihne sílu mužských hlasů a textovou srozumitelnost.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Smooth',
      release: '220 ms',
      knee: 4,
      makeUpGain: 1.5,
      notes: 'Měkká optická komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.6 s',
        keySettings: 'Predelay 40ms, Warm Chamber'
      }
    },
    proTips: [
      'Mužský sbor má silný hrudní fundament – dbejte na to, aby basy nehltily spodní pásmo (zásek na 1.1 kHz pomůže čistotě).',
      'Snímejte párem mikrofonů ORTF z mírného nadhledu.'
    ]
  },
  {
    id: 'choir-female-ssaa',
    name: 'Ženský sbor SSAA (Female / Treble Choir)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Radio',
    tagColor: '#a855f7',
    description: 'Éterický, zářivý, hedvábný a čistý zvuk ženského nebo dívčího sboru (1. soprán, 2. soprán, 1. alt, 2. alt).',
    recommendedInput: 'Local In 1/2 (Stereo Pair)',
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
      hpfFreq: 130,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 260, gain: 2.0, q: 1.4, enabled: true }, // Tělo altů
        { id: 'b2', type: 'peq', freq: 800, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: 2.5, q: 1.5, enabled: true }, // Sopránový lesk
        { id: 'b4', type: 'peq', freq: 7200, gain: -3.0, q: 3.5, enabled: true }, // Sborový De-Esser zářez
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 4.0, q: 0.7, enabled: true }, // Andělský vzduch (Air)
        { id: 'b6', type: 'lpf', freq: 19000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 130 Hz. Zdvih 12 kHz dodá sboru pověstný "andělský" třpyt a vzdušnost.'
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
      notes: 'Lampová komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '3.2 s',
        keySettings: 'Predelay 50ms, Shimmer Reverb'
      }
    },
    proTips: [
      'Ženský sbor v sopránovém fortissimu vyžaduje opatrný de-essing na master sběrnici (kolem 7 kHz).',
      'V kostele pošlete signál do dlouhého dozvuku s decay 3.2 s.'
    ]
  },
  {
    id: 'choir-children',
    name: 'Dětský pěvecký sbor (Children\'s Choir)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Radio',
    tagColor: '#a855f7',
    description: 'Průzračný, zvonivý, jemný a čistý tón dětského pěveckého sboru s potlačením ostrých sykavek a dechového šumu.',
    recommendedInput: 'Local In 1/2 (Stereo Pair)',
    preampGain: 40,
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
      model: 'Even 88-Formant',
      hpfFreq: 150,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 320, gain: 2.0, q: 1.4, enabled: true }, // Hřejivost dětských hlásků
        { id: 'b2', type: 'peq', freq: 1200, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: 2.5, q: 1.6, enabled: true }, // Srozumitelnost výslovnosti
        { id: 'b4', type: 'peq', freq: 6500, gain: -3.5, q: 3.5, enabled: true }, // Krocení ostrých sykavek
        { id: 'b5', type: 'high-shelf', freq: 11500, gain: 3.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 150 Hz spolehlivě odfiltruje pohyb dětí a dupání na pódiu.'
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
      notes: 'Optická komprese pro vyrovnání hlasitosti.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 40ms'
      }
    },
    proTips: [
      'Děti zpívají s nižším akustickým tlakem – nastavte vyšší gain na předzesilovačích (+40 dB) a udržujte ticho v sále.',
      'Snímejte z výšky cca 2.5 m mírně shora.'
    ]
  },
  {
    id: 'choir-acappella-close-group',
    name: 'Vokální ansámbl / A Cappella (Vocal Group Close Mics)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Radio',
    tagColor: '#a855f7',
    description: 'Moderní, těsný, dynamický a intonačně precizní zvuk komorního vokálního souboru (Pentatonix / King\'s Singers styl) s individuálními mikrofony.',
    recommendedInput: 'Local In 1–6 (Individual Handheld Condensers)',
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
      hold: 50,
      release: 180,
      range: 14,
      notes: 'Expander potlačí přeslechy sousedních zpěváků.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 500, gain: -2.5, q: 2.2, enabled: true }, // Mud cut
        { id: 'b3', type: 'peq', freq: 3000, gain: 3.5, q: 1.6, enabled: true }, // Moderní přítomnost
        { id: 'b4', type: 'peq', freq: 6500, gain: -3.0, q: 3.5, enabled: true }, // De-Esser
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Studiový třpyt
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Individuální ekvalizace s potlačením středového zákalu a jasnou studiovou přítomností.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'Pevná FET komprese pro kompaktní moderní beatbox a vokální harmonie.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 15 (A Cappella Space)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '1.8 s',
        keySettings: 'Predelay 25ms, Density 80%'
      }
    },
    proTips: [
      'Rozmístěte jednotlivé hlasy v panoramě: Soprán L40, Alt L15, Tenor R15, Baryton R40, Vokální bas a Beatbox na střed (Center).',
      'Pro vokální bas (Vocal Bass) použijte speciální preset s HPF na 40 Hz a Psycho Bass procesorem.'
    ]
  },
  {
    id: 'choir-spot-soloists',
    name: 'Sborové spot mikrofony pro sólisty (Choir Spot Soloists)',
    category: 'choirs',
    categoryLabel: 'Sbory',
    icon: 'Mic',
    tagColor: '#a855f7',
    description: 'Pomocné směrové spot mikrofony zaměřené na sólisty nebo jednotlivé sekce stojící před sborem.',
    recommendedInput: 'Local In 7/8 (XLR Shotgun / Supercardioid)',
    preampGain: 36,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: -3.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 60,
      release: 200,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 130,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 850, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 3200, gain: 3.0, q: 1.6, enabled: true }, // Vytáhne sólistu z tělesa sboru
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.5, q: 3.5, enabled: true },
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 3.2 kHz jemně vyzdvihne sólistu nad celkový zvuk sboru.'
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
      notes: 'Optická komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 35ms'
      }
    },
    proTips: [
      'Zpozděte spotový mikrofon pomocí funkce Channel Delay na WING tak, aby jeho signál dorazil ve stejnou milisekundu jako ze vzdálenějšího hlavního stereo páru sboru.',
      'Přimíchávejte pouze v momentech, kdy sólista zpívá.'
    ]
  }
];
