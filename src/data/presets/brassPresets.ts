import { InstrumentPreset } from '../../types';

export const BRASS_PRESETS: InstrumentPreset[] = [
  {
    id: 'brass-trumpet-solo',
    name: 'Trubka v B / C sólová (Solo Trumpet in Bb/C)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Volume2',
    tagColor: '#eab308', // Amber/Yellow
    description: 'Průrazný, čistý a zářivý tón sólové trubky bez nepříjemné ostrosti ve fortissimu pro sóla v orchestru, bigbandu i dechovce.',
    recommendedInput: 'Local In 5 (XLR)',
    preampGain: 28,
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
      hold: 40,
      release: 200,
      range: 12,
      notes: 'Zamezí přeslechům z bicích a ostatních žesťů v pauzách.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 150,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 380, gain: 2.0, q: 1.4, enabled: true }, // Teplé tělo
        { id: 'b2', type: 'peq', freq: 1400, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3600, gain: 3.0, q: 1.6, enabled: true }, // Sólový lesk
        { id: 'b4', type: 'peq', freq: 6200, gain: -3.5, q: 3.5, enabled: true }, // Zkrocení řezavosti
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true }, // Vzdušnost
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Ořez pod 150 Hz odstraní hluk pódia. Zásek na 6.2 kHz zabrání plechovému řezání v uších.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -15,
      ratio: '4:1',
      attack: 'Fast (0.5 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'Rychlý FET limiter udrží pod kontrolou dynamické skoky při přechodu z tichého piana do fortissima.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Brass Space)',
        model: 'Vintage Reverb',
        sendLevelDb: -12,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 25ms, Density 70%'
      }
    },
    proTips: [
      'Při snímání dynamickým mikrofonem (např. Shure SM57 nebo Sennheiser MD421) umístěte mikrofon cca 15–20 cm mírně mimo osu korpusu (off-axis).',
      'Při hraní ve stoje zajistěte, aby trubka nemířila přímo do mikrofonní membrány z bezprostřední blízkosti.'
    ]
  },
  {
    id: 'brass-trumpet-muted',
    name: 'Trubka s dusítkem (Muted Trumpet - Harmon/Straight)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Volume2',
    tagColor: '#eab308',
    description: 'Specifický ostrý, bzučivý nebo sametový tón trubky s dusítkem (Harmon Mute à la Miles Davis, Straight, Cup nebo Plunger).',
    recommendedInput: 'Local In 5 (XLR)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -45,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 200,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 180,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 500, gain: 2.5, q: 1.5, enabled: true }, // Tělo dusítka
        { id: 'b2', type: 'peq', freq: 1500, gain: 2.0, q: 1.8, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: -3.0, q: 2.5, enabled: true }, // Krocení rezonance kovu dusítka
        { id: 'b4', type: 'peq', freq: 5800, gain: 3.5, q: 1.6, enabled: true }, // Zvonivý Harmon bzukot
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 5.8 kHz vytáhne charakteristický harmonový bzukot Milese Davise.'
    },
    comp: {
      enabled: true,
      model: 'LA Leveler (Opto)',
      threshold: -16,
      ratio: '3.5:1',
      attack: 'Smooth',
      release: '180 ms',
      knee: 3,
      makeUpGain: 3.0,
      notes: 'Optická komprese kompenzuje ztrátu akustického tlaku způsobenou dusítkem.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Jazz Space)',
        model: 'Vintage Plate',
        sendLevelDb: -8,
        decayOrTime: '2.5 s',
        keySettings: 'Predelay 30ms, Plate Reverb'
      }
    },
    proTips: [
      'Harmon mute bez stopky (stem out) vyžaduje těsné snímání cca 5–10 cm od otvoru dusítka.',
      'Přidejte více plate reverbu pro autentický noční jazzový prostor.'
    ]
  },
  {
    id: 'brass-piccolo-trumpet',
    name: 'Pikolo trubka v D / Es (Piccolo Trumpet)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Volume2',
    tagColor: '#eab308',
    description: 'Královský, virtuózní a jiskřivý tón barokní pikolo trubky pro fanfáry, Bacha, Händela i sóla.',
    recommendedInput: 'Local In 5 (XLR)',
    preampGain: 26,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -10,
    faderDefault: -1.0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -44,
      ratio: '1:2',
      attack: 2,
      hold: 40,
      release: 180,
      range: 14,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 220,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 650, gain: 2.0, q: 1.4, enabled: true }, // Tělo tónu
        { id: 'b2', type: 'peq', freq: 2400, gain: 2.0, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 4500, gain: -3.5, q: 3.5, enabled: true }, // Krocení ostrosti
        { id: 'b4', type: 'peq', freq: 8000, gain: -2.5, q: 3.0, enabled: true }, // De-harsh
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 2.5, q: 0.7, enabled: true }, // Zlatý lesk
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF 220 Hz. Zásek na 4.5 kHz a 8 kHz zjemní pronikavý vysoký rejstřík.'
    },
    comp: {
      enabled: true,
      model: 'Precision Limiter',
      threshold: -12,
      ratio: '4:1',
      attack: 'Fast (0.5 ms)',
      release: '100 ms',
      knee: 2,
      makeUpGain: 1.5,
      notes: 'Rychlý limiter chrání před extrémními špičkami.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.8 s',
        keySettings: 'Cathedral / Church Space'
      }
    },
    proTips: [
      'Použijte páskový mikrofon (Ribbon) nebo malomembránový kondenzátor s lineární odezvou.',
      'Snímejte ze vzdálenosti cca 30–40 cm pod úhlem 30°.'
    ]
  },
  {
    id: 'brass-flugelhorn',
    name: 'Křídlovka (Flugelhorn in Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Radio',
    tagColor: '#eab308',
    description: 'Sametový, hřejivý a zpěvný tón křídlovky pro sólové melodické linky v dechovce, jazzu a brass bandech.',
    recommendedInput: 'Local In 6 (XLR)',
    preampGain: 30,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -20,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 3,
      hold: 60,
      release: 250,
      range: 10,
      notes: 'Mírný expander pro měkké náběhy tónu.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 130,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 3.0, q: 1.4, enabled: true }, // Sametové tělo
        { id: 'b2', type: 'peq', freq: 650, gain: 1.5, q: 1.5, enabled: true },
        { id: 'b3', type: 'peq', freq: 1800, gain: 1.0, q: 1.8, enabled: true },
        { id: 'b4', type: 'peq', freq: 3200, gain: 2.0, q: 1.6, enabled: true }, // Jemná artikulace
        { id: 'b5', type: 'high-shelf', freq: 8500, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: true }
      ],
      notes: 'Zdvih 280 Hz podtrhne široký kuželovitý tón křídlovky, mírný LPF nad 15 kHz zachová temný kulatý charakter.'
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
      notes: 'Plynulá optická komprese podporuje přirozené legato a cantabile frázování.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Warm Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 30ms, High Soft On'
      }
    },
    proTips: [
      'Křídlovka potřebuje prostor – pošlete více signálu do bohatého hall reverbu.',
      'Pro dechovkový duet 1. a 2. křídlovky nastavte panoramu L25 a R25 pro krásnou stereo šířku.'
    ]
  },
  {
    id: 'brass-french-horn',
    name: 'Lesní roh / Corno (French Horn in F/Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Radio',
    tagColor: '#eab308',
    description: 'Vznešený, bohatý a prostorový tón lesního rohu. Optimalizováno pro snímání dozadu směřujícího ozvučníku.',
    recommendedInput: 'Local In 7 (XLR)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: -35,
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
      notes: 'Bypass pro přirozenou dynamiku.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 85,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.5, q: 1.5, enabled: true }, // Tělo rohu
        { id: 'b2', type: 'peq', freq: 450, gain: 2.0, q: 1.4, enabled: true }, // Ušlechtilý střed
        { id: 'b3', type: 'peq', freq: 1200, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 2800, gain: 2.0, q: 1.6, enabled: true }, // Lesk při fortissimu
        { id: 'b5', type: 'high-shelf', freq: 9000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 180 Hz a 450 Hz vytáhne bohatou harmonickou strukturu ozvučníku.'
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
      notes: 'Ultra jemná saturace zachovávající plný dynamický rozsah od pianissima po dramatické fanfáry.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Symphony Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.8 s',
        keySettings: 'Predelay 45ms, ER Pos Far'
      }
    },
    proTips: [
      'Protože korpus lesního rohu směřuje dozadu a doprava, mikrofon umístěte cca 0.5–1 m za hráče směrem k ozvučníku nebo snímejte odraz od akustické stěny.',
      'Pro sekci 4 lesních rohů použijte stereo pár v konfiguraci ORTF za sekcí.'
    ]
  },
  {
    id: 'brass-tenor-trombone',
    name: 'Tenorový pozoun (Tenor Trombone)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Volume2',
    tagColor: '#eab308',
    description: 'Dravý, zpěvný a dynamický tón pozounu pro orchestrální tutti, bigbandové sekce i dechovková sóla.',
    recommendedInput: 'Local In 8 (XLR)',
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
      hpfFreq: 80,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 2.5, q: 1.6, enabled: true }, // Tělo pozounu
        { id: 'b2', type: 'peq', freq: 400, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b3', type: 'peq', freq: 1100, gain: -2.0, q: 2.0, enabled: true }, // Boxy cut
        { id: 'b4', type: 'peq', freq: 2400, gain: 3.0, q: 1.8, enabled: true }, // Artikulace a říz
        { id: 'b5', type: 'high-shelf', freq: 9500, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 160 Hz dodá plnost, 2.4 kHz vytáhne artikulaci snížce a průrazný žesťový lesk.'
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
      notes: 'VCA komprese pro pevný úder a srovnání hlasitosti forte úderů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Brass Space)',
        model: 'Vintage Plate',
        sendLevelDb: -12,
        decayOrTime: '2.1 s',
        keySettings: 'Predelay 25ms, Density 75%'
      }
    },
    proTips: [
      'Mikrofon miřte cca 20 cm od ozvučníku pod úhlem 30° mimo osu (off-axis), aby proud vzduchu z rychlého tahu snížce nenarážel přímo do membrány.',
      'V dechovkovém doprovodu (přiznávka) zapněte Transient Shaper pro ostřejší tečku úderu.'
    ]
  },
  {
    id: 'brass-bass-trombone',
    name: 'Basový pozoun (Bass Trombone in F/Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Activity',
    tagColor: '#eab308',
    description: 'Hřmotný, hluboký a mohutný basový pozoun se dvěma kvartovými ventily pro orchestr a bigband.',
    recommendedInput: 'Local In 9 (XLR)',
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
      attack: 3,
      hold: 40,
      release: 200,
      range: 15,
      notes: 'Gate.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 70, gain: 3.5, q: 1.6, enabled: true }, // Basový fundament
        { id: 'b2', type: 'peq', freq: 140, gain: 2.5, q: 1.8, enabled: true }, // Punch
        { id: 'b3', type: 'peq', freq: 380, gain: -3.0, q: 2.0, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 1800, gain: 2.5, q: 1.8, enabled: true }, // Chraplavý řev
        { id: 'b5', type: 'lpf', freq: 8500, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zdvih 70 Hz a 140 Hz vytvoří masivní basovou stěnu, 1.8 kHz dodá dravost fortissima.'
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
      notes: 'Rychlá FET komprese pro kontrolu masivní dynamiky.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Hall Reverb)',
        model: 'VSS3 Reverb',
        sendLevelDb: -13,
        decayOrTime: '2.3 s',
        keySettings: 'Low Cut 90Hz'
      }
    },
    proTips: [
      'Použijte velkomembránový dynamický mikrofon (např. EV RE20, Shure SM7B nebo Beyerdynamic M88).',
      'V orchestrálním tutti funguje basový pozoun v těsném fázovém souzvuku s tubou – zkontrolujte tlačítko polarity (Invert).'
    ]
  },
  {
    id: 'brass-tenor-horn',
    name: 'Tenorový roh / B-tenor (Tenor Horn in Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Radio',
    tagColor: '#eab308',
    description: 'Kulatý, zpěvný a měkký tón oválného tenorového rohu – vedoucí melodický hlas středních žesťů v české a moravské dechovce.',
    recommendedInput: 'Local In 10 (XLR)',
    preampGain: 28,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'mono',
    pan: 15,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
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
      hpfFreq: 75,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.5, q: 1.5, enabled: true }, // Tělo nástroje
        { id: 'b2', type: 'peq', freq: 350, gain: 2.0, q: 1.4, enabled: true }, // Zpěvný střed
        { id: 'b3', type: 'peq', freq: 900, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 2800, gain: 2.5, q: 1.6, enabled: true }, // Sólová srozumitelnost
        { id: 'b5', type: 'high-shelf', freq: 9000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 350 Hz dodá nezaměnitelnou zpěvnost dechovkového tenoru, 2.8 kHz zajistí zřetelnou artikulaci.'
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
      notes: 'Optická komprese udržuje vyrovnanou hladinu melodických sól.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Brass Reverb)',
        model: 'Vintage Reverb',
        sendLevelDb: -11,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 25ms'
      }
    },
    proTips: [
      'Pro typický dechovkový part Tenor + Bariton v terciích/sextách nastavte tenoru pan L15 a baritonu R15.',
      'Mikrofon zamiřte cca 25 cm nad korpus mírně šikmo od osy otvoru.'
    ]
  },
  {
    id: 'brass-baritone-euphonium',
    name: 'Bariton & Eufonium (Baritone Horn & Euphonium)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Radio',
    tagColor: '#eab308',
    description: 'Široký, hluboký a sametový tón baritonu a eufonia s bohatým protimelodickým vedením.',
    recommendedInput: 'Local In 10 (XLR)',
    preampGain: 28,
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
      attack: 2,
      hold: 50,
      release: 220,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 70,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 160, gain: 3.0, q: 1.5, enabled: true }, // Hluboké tělo
        { id: 'b2', type: 'peq', freq: 380, gain: 2.0, q: 1.4, enabled: true }, // Sametový střed
        { id: 'b3', type: 'peq', freq: 850, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 2600, gain: 2.5, q: 1.6, enabled: true }, // Artikulace nátisku
        { id: 'b5', type: 'high-shelf', freq: 9000, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 160 Hz podtrhne široký kuželovitý tón eufonia v britském i českém stylu.'
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
        busName: 'Bus 13 (Brass Space)',
        model: 'Vintage Reverb',
        sendLevelDb: -11,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 25ms'
      }
    },
    proTips: [
      'Pro eufonium v brass bandu umístěte mikrofon cca 30 cm nad korpus mírně šikmo.',
      'Přidejte jemný Hall reverb pro velký orchestrální prostor.'
    ]
  },
  {
    id: 'brass-tuba-bass-contrabass',
    name: 'Tuba basová & kontrabasová (Bass & Contrabass Tuba in F/Eb/Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Activity',
    tagColor: '#eab308',
    description: 'Základní basový pilíř dechového a symfonického orchestru. Pevný tón v subbasech s rychlou artikulací jednotlivých dob.',
    recommendedInput: 'Local In 11 (XLR)',
    preampGain: 24,
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
      attack: 3,
      hold: 40,
      release: 180,
      range: 20,
      notes: 'Zamezí bučení a vazbě v mikrofonu umístěném u korpusu tuby.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 35,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 60, gain: 4.0, q: 1.6, enabled: true }, // Basový fundament
        { id: 'b2', type: 'peq', freq: 130, gain: 2.5, q: 1.8, enabled: true }, // Úder na těžkou dobu
        { id: 'b3', type: 'peq', freq: 350, gain: -3.5, q: 2.0, enabled: true }, // Odstranění bláta
        { id: 'b4', type: 'peq', freq: 1600, gain: 2.0, q: 2.0, enabled: true }, // Artikulace nátisku
        { id: 'b5', type: 'lpf', freq: 5500, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zdvih 60 Hz a 130 Hz dodá rytmickému doprovodu "duc-duc" váhu v celém sále.'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -16,
      ratio: '4:1',
      attack: '10 ms',
      release: '120 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'Rychlá VCA komprese srovná sílu jednotlivých tónů dechového basisty.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Psycho Bass (Subharmonic Enhancer)',
        keySettings: 'Intensity 35%, X/O Freq 75Hz, Bass Gain +2dB'
      }
    },
    proTips: [
      'Aktivujte v insertu procesor Psycho Bass pro syntézu subharmonických tónů – tuba získá mohutnost velkého PA subwooferu.',
      'Při venkovním hraní (Open Air) použijte protivětrný kryt (Deadcat).'
    ]
  },
  {
    id: 'brass-sousaphone',
    name: 'Suzafon (Sousaphone in Bb)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Activity',
    tagColor: '#eab308',
    description: 'Dopředu směřující obří ozvučník suzafonu pro pochodové kapely, dixieland a moderní brass bandy.',
    recommendedInput: 'Local In 11 (XLR Wireless/Clip)',
    preampGain: 24,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -38,
      ratio: '1:3',
      attack: 2,
      hold: 30,
      release: 160,
      range: 22,
      notes: 'Rychlý gate proti vazbě z pódiových odposlechů.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 38,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 65, gain: 3.5, q: 1.6, enabled: true },
        { id: 'b2', type: 'peq', freq: 140, gain: 3.0, q: 1.8, enabled: true }, // Punch
        { id: 'b3', type: 'peq', freq: 400, gain: -4.0, q: 2.2, enabled: true }, // Mud cut
        { id: 'b4', type: 'peq', freq: 1800, gain: 2.5, q: 1.8, enabled: true }, // Artikulace
        { id: 'b5', type: 'lpf', freq: 6000, gain: 0, q: 0.7, enabled: true },
        { id: 'b6', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false }
      ],
      notes: 'Zásek na 400 Hz zabrání hučení v přímém vyzařování dopředu.'
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
      notes: 'FET komprese pro pevný pochodový úder.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Psycho Bass (Subharmonic Enhancer)',
        keySettings: 'Intensity 30%, X/O Freq 70Hz'
      }
    },
    proTips: [
      'Pro klipový mikrofon v korpusu připevněte kapsli cca 10 cm od okraje ozvučníku směřující mírně dovnitř.',
      'Zapněte kompresor s rychlým atakem pro srovnání rytmických figur.'
    ]
  },
  {
    id: 'brass-band-section-stereo',
    name: 'Žesťová sekce dechovky / Bigbandu Stereo (Brass Section Pair)',
    category: 'brass',
    categoryLabel: 'Žesťové dechové nástroje',
    icon: 'Radio',
    tagColor: '#eab308',
    description: 'Globální stereo snímání celé žesťové sekce (Trubky, Křídlovky, Tenory, Pozouny) pomocí stereo páru v konfiguraci ORTF/AB.',
    recommendedInput: 'Local In 1/2 (Stereo Pair)',
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
      notes: 'Bypass pro stereo pár.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 700, gain: -2.0, q: 2.0, enabled: true }, // Boxy cut
        { id: 'b3', type: 'peq', freq: 3200, gain: 2.5, q: 1.5, enabled: true }, // Sekční jas
        { id: 'b4', type: 'peq', freq: 6500, gain: -2.5, q: 3.0, enabled: true }, // De-harsh
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Vyvážená ekvalizace pro kompaktní homogenní zvuk celé dechové kapely.'
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
      notes: 'Vícepásmová komprese kontroluje tutti pasáže bez pumpování basů.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Brass Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -10,
        decayOrTime: '2.2 s',
        keySettings: 'Predelay 30ms, Early Reflections 50%'
      }
    },
    proTips: [
      'Stereo pár mikrofonů umístěte cca 2.5 m před kapelou ve výšce 2.5 m.',
      'Na stereo kanálu WING nastavte parametr Stereo Width na 115% pro otevřenější prostor.'
    ]
  }
];
