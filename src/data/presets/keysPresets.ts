import { InstrumentPreset } from '../../types';

export const KEYS_PRESETS: InstrumentPreset[] = [
  {
    id: 'keys-grand-piano-stereo',
    name: 'Koncertní křídlo Stereo (Concert Grand Piano Pair)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6', // Blue
    description: 'Majestátní, dynamický a detailní zvuk velkého koncertního křídla (Steinway D / Yamaha CFX). Plné basy a křišťálový diskant.',
    recommendedInput: 'Local In 9/10 (Stereo Pair)',
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
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 300,
      range: 8,
      notes: 'Bypass pro zachování doznění sustain pedálu.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 35,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 110, gain: 2.0, q: 1.4, enabled: true }, // Basové struny
        { id: 'b2', type: 'peq', freq: 350, gain: -2.5, q: 2.0, enabled: true }, // Zákal rezonanční desky (mud cut)
        { id: 'b3', type: 'peq', freq: 2800, gain: 2.5, q: 1.6, enabled: true }, // Úder kladívek (Presence)
        { id: 'b4', type: 'peq', freq: 5500, gain: 1.5, q: 1.8, enabled: true },
        { id: 'b5', type: 'high-shelf', freq: 12000, gain: 3.0, q: 0.7, enabled: true }, // Křišťálový vzduch
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zásek na 350 Hz vyčistí krabicový zákal zevnitř klavíru. 2.8 kHz a 12 kHz dodají perlivý lesk.'
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
      notes: 'Plynulá optická komprese srovná dynamiku mezi pianissimem a fortissimem.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Concert Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -9,
        decayOrTime: '2.4 s',
        keySettings: 'Predelay 30ms, Early Reflections 50%'
      }
    },
    proTips: [
      'Pár mikrofonů umístěte dovnitř křídla cca 20 cm nad struny: jeden nad basové struny, druhý nad diskantové křížení.',
      'Na WING aktivujte Stereo Imager na 110% pro dokonalý přirozený stereofonní rozptyl od basů vlevo po diskant vpravo.'
    ]
  },
  {
    id: 'keys-upright-piano',
    name: 'Akustické pianino (Upright Piano)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Dřevitý, intimní a vintage tón akustického pianina pro pop, jazz, šanson i komorní hudbu.',
    recommendedInput: 'Local In 9/10 (Stereo Pair)',
    preampGain: 34,
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
      hold: 70,
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 50,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 140, gain: 2.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 400, gain: -3.0, q: 2.2, enabled: true }, // Mud cut
        { id: 'b3', type: 'peq', freq: 2400, gain: 3.0, q: 1.6, enabled: true }, // Úder plstěných kladívek
        { id: 'b4', type: 'peq', freq: 4800, gain: 1.5, q: 1.8, enabled: true },
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 2.4 kHz vytáhne dřevitý vintage charakter mechaniky.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -12,
      ratio: '2.5:1',
      attack: 'Medium',
      release: 'Position 4',
      knee: 5,
      makeUpGain: 1.5,
      notes: 'Hřejivá lampová komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Vintage Plate)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 20ms'
      }
    },
    proTips: [
      'Otevřete horní víko pianina a mikrofony umístěte shora nebo snímejte zadní rezonanční desku.',
      'Pro intimní "felt piano" styl ztište výšky nad 8 kHz a přidejte měkký plate reverb.'
    ]
  },
  {
    id: 'keys-rhodes-electric-piano',
    name: 'Elektrické piano Rhodes (Fender Rhodes Mark I/II)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Kultovní, zvonivý, teplý a medový tón elektromechanického piana Fender Rhodes s stereo panovacím tremolo efektem.',
    recommendedInput: 'Aux In 1/2 (Stereo TRS DI)',
    preampGain: 18,
    phantomPower: false,
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
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Pulsar P1a (Pultec Style)',
      hpfFreq: 50,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 120, gain: 3.5, q: 1.4, enabled: true }, // Teplý basový zvon
        { id: 'b2', type: 'peq', freq: 500, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 2800, gain: 3.5, q: 1.5, enabled: true }, // Zvonivý tines atak (Bark)
        { id: 'b4', type: 'high-shelf', freq: 9000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 120 Hz a 2.8 kHz dodá legendární rhodesovský "bark" při silnějším úderu klávesy.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -14,
      ratio: '4:1',
      attack: 'Fast (1 ms)',
      release: '120 ms',
      knee: 2,
      makeUpGain: 2.5,
      notes: 'FET komprese udrží úderné akordy v přesné rovině.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Stereo Chorus / AutoPan Tremolo',
        keySettings: 'Speed 3.2Hz, Depth 65%, Stereo Phase 180°'
      }
    },
    proTips: [
      'Aktivujte v insertu WING AutoPan / Tremolo s fázovým posunem 180° pro legendární stereo Suitcase panning efekt.',
      'Pro jazz a soul pošlete signál do teplého Spring Reverbu.'
    ]
  },
  {
    id: 'keys-wurlitzer-200a',
    name: 'Elektrické piano Wurlitzer (Wurlitzer 200A)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Dravý, vintage, mírně nakřáplý a průrazný tón jazýčkového piana Wurlitzer 200A pro rock, funk a pop.',
    recommendedInput: 'Aux In 1/2 (Stereo DI)',
    preampGain: 18,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: false,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:1.5',
      attack: 5,
      hold: 80,
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 65,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 180, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 850, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 2200, gain: 3.5, q: 1.6, enabled: true }, // Dravý jazýčkový říz
        { id: 'b4', type: 'high-shelf', freq: 8500, gain: 1.5, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 15000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 2.2 kHz vytáhne slavný rockový wurly drajv (Supertramp, Ray Charles).'
    },
    comp: {
      enabled: true,
      model: 'BDX 160 Comp',
      threshold: -14,
      ratio: '3.5:1',
      attack: '12 ms',
      release: '140 ms',
      knee: 2,
      makeUpGain: 2.0,
      notes: 'VCA komprese pro pevný rytmický úder.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Guitar Preamp / Tube Driver',
        keySettings: 'Drive 25%, Warm Tube Saturation'
      }
    },
    proTips: [
      'Přidejte jemnou lampovou saturaci na WING Tube Preamp pro autentický nakřáplý tón.',
      'Zapněte vestavěné optické tremolo (Vibrato) s frekvencí cca 5 Hz.'
    ]
  },
  {
    id: 'keys-clavinet-d6',
    name: 'Clavinet D6 (Hohner Funky Clavinet)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Extrémně perkusivní, funky a kousavý zvuk Clavinetu D6 se strunami a snímači (Stevie Wonder - Superstition).',
    recommendedInput: 'Aux In 1 (DI Box)',
    preampGain: 18,
    phantomPower: false,
    phaseInvert: false,
    channelType: 'mono',
    pan: -15,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -46,
      ratio: '1:2.5',
      attack: 1,
      hold: 30,
      release: 120,
      range: 16,
      notes: 'Gate pro rychlé funky staccato.'
    },
    eq: {
      enabled: true,
      model: 'Even 88-Formant',
      hpfFreq: 110,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 280, gain: 1.5, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 1200, gain: 2.5, q: 1.6, enabled: true },
        { id: 'b3', type: 'peq', freq: 3500, gain: 4.0, q: 1.6, enabled: true }, // Kousavý funky atak
        { id: 'b4', type: 'high-shelf', freq: 9000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Masivní zdvih 3.5 kHz zajistí, že funky linka prořízne jakýkoliv hustý mix.'
    },
    comp: {
      enabled: true,
      model: '76 Limiter Amp',
      threshold: -16,
      ratio: '4:1',
      attack: 'Fast (0.5 ms)',
      release: '80 ms',
      knee: 2,
      makeUpGain: 3.0,
      notes: 'Super rychlá FET komprese pro maximální perkusivní punch.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Auto Wah / Envelope Filter',
        keySettings: 'Sens 60%, Range 50%, Reso 45%'
      }
    },
    proTips: [
      'Vložte do insertu Auto-Wah filtr nebo Phaser (Small Stone) pro nezaměnitelný 70s funk groove.',
      'Nastavte fader přesně do rytmické sekce vedle hi-haty a basy.'
    ]
  },
  {
    id: 'keys-hammond-b3-leslie',
    name: 'Hammondovy varhany & Leslie (B3 Organ Rotary Speaker)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Hutný, řvoucí, rotující a dynamický zvuk varhan Hammond B3 snímaný mikrofony na horním rotoru (Horn) i spodním bubnu (Drum) Leslie bedny.',
    recommendedInput: 'Local In 11/12 (Leslie Horn L/R) + Local In 13 (Leslie Low)',
    preampGain: 24,
    phantomPower: false,
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
      release: 250,
      range: 8,
      notes: 'Bypass.'
    },
    eq: {
      enabled: true,
      model: 'SOUL Analog',
      hpfFreq: 45,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 3.0, q: 1.5, enabled: true }, // Basy pedálů a spodního rotoru
        { id: 'b2', type: 'peq', freq: 350, gain: -2.0, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 2400, gain: 3.5, q: 1.5, enabled: true }, // Řev táhel (Drawbars 888000000)
        { id: 'b4', type: 'peq', freq: 4500, gain: 2.5, q: 1.6, enabled: true }, // Perkusivní click (Key Click)
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 17000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 2.4 kHz a 4.5 kHz vytáhne legendární perkusi 3rd harmonic a harmonický overdrive lamp.'
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
      notes: 'Optická komprese srovnává dynamické skoky při přepínání Leslie Slow/Fast.'
    },
    fx: {
      primaryFX: {
        slotType: 'Insert',
        model: 'Rotary Speaker / Leslie Sim (nebo Spring Reverb)',
        keySettings: 'Horn Speed 6.8Hz, Rotor Speed 5.9Hz, Drive 35%'
      }
    },
    proTips: [
      'Při snímání fyzického Leslie kabinetu dejte 2 mikrofony shora na horní horny v úhlu 90° (pan L100/R100) a 1 dynamický na spodní basový buben (pan Center).',
      'Zapněte WING Tube Saturation pro šťavnaté lampové zkreslení Jon Lorda (Deep Purple).'
    ]
  },
  {
    id: 'keys-church-pipe-organ',
    name: 'Kostelní / Píšťalové varhany Stereo (Church Pipe Organ)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Královský, monumentální a polyfonní zvuk chrámových píšťalových varhan s 32\' pedálovým subbasem a mixturami.',
    recommendedInput: 'Local In 9/10 (Stereo Pair)',
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
      hpfFreq: 25,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 40, gain: 4.5, q: 1.6, enabled: true }, // 32-stopový pedálový subbas
        { id: 'b2', type: 'peq', freq: 180, gain: 2.0, q: 1.4, enabled: true }, // Tělo principálů
        { id: 'b3', type: 'peq', freq: 850, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b4', type: 'peq', freq: 3500, gain: 2.5, q: 1.5, enabled: true }, // Píšťalový lesk mixtur
        { id: 'b5', type: 'high-shelf', freq: 11000, gain: 3.0, q: 0.7, enabled: true }, // Vzduch klenby chrámu
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 25 Hz propouští nejhlubší subbasy 32\' píšťal (C-subkontra 16.35 Hz).'
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
      notes: 'Vícepásmová komprese udrží plné tutti plénum bez zahcení PA systému.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Cathedral Space)',
        model: 'VSS3 Reverb',
        sendLevelDb: -6,
        decayOrTime: '3.6 s',
        keySettings: 'Cathedral Dome, Predelay 50ms'
      }
    },
    proTips: [
      'Pár mikrofonů umístěte do lodě chrámu ve výšce cca 3–4 m pro dokonalé smíchání zvuku všech píšťalových skříní.',
      'Nastavte WING Velvet Imager na šířku 125% pro majestátní chrámový prostor.'
    ]
  },
  {
    id: 'keys-accordion-heligonka',
    name: 'Akordeon / Heligonka (Accordion & Heligonka - Diskant & Bas)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Tradiční, plný, zpěvný a dynamický tón knoflíkového či klávesového akordeonu a heligonky se zvonivým tremolo registrem (Musette) i basovým fundamentem.',
    recommendedInput: 'Local In 13 (Diskant) + Local In 14 (Basová strana)',
    preampGain: 32,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 0,
    faderDefault: 0,
    gate: {
      enabled: true,
      model: 'WING Gate/Expander',
      threshold: -48,
      ratio: '1:2',
      attack: 2,
      hold: 60,
      release: 220,
      range: 12,
      notes: 'Expander.'
    },
    eq: {
      enabled: true,
      model: 'Even 84 (Neve Style)',
      hpfFreq: 60,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 90, gain: 3.5, q: 1.5, enabled: true }, // Heligónkový basový fundament
        { id: 'b2', type: 'peq', freq: 280, gain: 2.0, q: 1.4, enabled: true }, // Tělo měchu
        { id: 'b3', type: 'peq', freq: 850, gain: -2.5, q: 2.2, enabled: true }, // Odstranění nosovosti
        { id: 'b4', type: 'peq', freq: 3200, gain: 3.0, q: 1.6, enabled: true }, // Zpěvnost musette plátků
        { id: 'b5', type: 'high-shelf', freq: 10000, gain: 2.0, q: 0.7, enabled: true },
        { id: 'b6', type: 'lpf', freq: 16000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 90 Hz pro mohutné heligónkové basy, 3.2 kHz vytáhne jiskřivé musette chvění v lidové hudbě.'
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
      notes: 'Optická komprese srovnává tah a tlak měchu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Folk Space)',
        model: 'Vintage Plate',
        sendLevelDb: -10,
        decayOrTime: '2.0 s',
        keySettings: 'Predelay 25ms'
      }
    },
    proTips: [
      'Použijte 2 mikrofony: pravou diskantovou stranu panujte mírně doprava (R25) a levou basovou stranu doleva (L25).',
      'Pro heligonku v dechovce zvyšte zisk na basovém kanálu o +3 dB.'
    ]
  },
  {
    id: 'keys-synth-pad-stereo',
    name: 'Digitální syntezátor & Synth Pad Stereo (Synthesizer & Pad)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Široký, hřejivý, vrstvený a éterický stereo zvuk syntezátorových ploch, leadů a ambientních textur.',
    recommendedInput: 'Aux In 3/4 (Stereo TRS Line)',
    preampGain: 0,
    phantomPower: false,
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
      model: 'SOUL Analog',
      hpfFreq: 40,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 120, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 500, gain: -2.5, q: 2.0, enabled: true }, // Uvolnění místa pro zpěv a kytary
        { id: 'b3', type: 'peq', freq: 2500, gain: 1.5, q: 1.6, enabled: true },
        { id: 'b4', type: 'high-shelf', freq: 11000, gain: 3.5, q: 0.7, enabled: true }, // Široký analogový vzduch
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Potlačení na 500 Hz uvolní střední pásmo pro hlavní zpěv a sólové nástroje.'
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
      notes: 'Jemná komprese pro hladký tok padu.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Ambient Reverb)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '3.2 s',
        keySettings: 'Predelay 40ms, Width 130%'
      }
    },
    proTips: [
      'Na WING stereo kanálu zapněte Stereo Width na 120% pro obklopující ambientní prostor.',
      'Použijte Sidechain kompresor z hlavního kopáku (Kick) pro moderní pumpovací EDM/Pop efekt.'
    ]
  },
  {
    id: 'keys-harpsichord-stereo',
    name: 'Cembalo Stereo (Harpsichord Pair)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Jemný, trsátkový, perlivý a zvonivý zvuk barokního dvoumanuálového cembala s loutnovým rejstříkem.',
    recommendedInput: 'Local In 9/10 (Stereo Pair)',
    preampGain: 38,
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
      model: 'Even 84 (Neve Style)',
      hpfFreq: 65,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 220, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 1400, gain: -1.5, q: 2.0, enabled: true },
        { id: 'b3', type: 'peq', freq: 4200, gain: 3.5, q: 1.6, enabled: true }, // Trsátkový atak havraních brků
        { id: 'b4', type: 'high-shelf', freq: 11500, gain: 3.0, q: 0.7, enabled: true }, // Stříbrný lesk
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 18000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'Zdvih 4.2 kHz zdůrazní jemné brnknutí jazýčku o strunu.'
    },
    comp: {
      enabled: true,
      model: 'Fairchild 670 / Fair Kid',
      threshold: -8,
      ratio: '1.8:1',
      attack: 'Slow',
      release: 'Position 4',
      knee: 5,
      makeUpGain: 1.0,
      notes: 'Velmi transparentní komprese.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Baroque Room)',
        model: 'VSS3 Reverb',
        sendLevelDb: -8,
        decayOrTime: '2.4 s',
        keySettings: 'Chamber / Baroque Hall'
      }
    },
    proTips: [
      'Pár mikrofonů umístěte cca 40–50 cm nad rezonanční desku otevřeného nástroje.',
      'Vyhněte se tvrdé kompresi, která by zesílila mechanický hluk návratu trsátek.'
    ]
  },
  {
    id: 'keys-celeste',
    name: 'Celesta (Celeste / Orchestral Chimes)',
    category: 'keys',
    categoryLabel: 'Klávesy',
    icon: 'Radio',
    tagColor: '#3b82f6',
    description: 'Pohádkový, zvonivý a éterický zvuk celesty (Čajkovskij - Louskáček, Harry Potter Celesta Theme).',
    recommendedInput: 'Local In 9/10 (Stereo Pair)',
    preampGain: 38,
    phantomPower: true,
    phaseInvert: false,
    channelType: 'stereo',
    pan: 15,
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
      hpfFreq: 180,
      hpfSlope: '18 dB/oct',
      mix: 100,
      bands: [
        { id: 'b1', type: 'peq', freq: 500, gain: 2.0, q: 1.4, enabled: true },
        { id: 'b2', type: 'peq', freq: 2200, gain: 2.0, q: 1.5, enabled: true },
        { id: 'b3', type: 'peq', freq: 6500, gain: 3.5, q: 1.6, enabled: true }, // Zvonivý třpyt ocelových destiček
        { id: 'b4', type: 'high-shelf', freq: 12000, gain: 4.0, q: 0.7, enabled: true }, // Vzduch
        { id: 'b5', type: 'peq', freq: 800, gain: 0, q: 1.0, enabled: false },
        { id: 'b6', type: 'lpf', freq: 20000, gain: 0, q: 0.7, enabled: false }
      ],
      notes: 'HPF na 180 Hz odstraní hluk pedálu. Zdvih 6.5 kHz a 12 kHz vykouzlí magický zvonivý třpyt.'
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
      notes: 'Limiter proti ostrým úderům plstěných paliček.'
    },
    fx: {
      primaryFX: {
        slotType: 'Bus Send',
        busName: 'Bus 13 (Fairy Hall)',
        model: 'VSS3 Reverb',
        sendLevelDb: -7,
        decayOrTime: '3.0 s',
        keySettings: 'Predelay 45ms, Shimmer Mode'
      }
    },
    proTips: [
      'Použijte pár vysoce citlivých kondenzátorových mikrofonů cca 30 cm před dřevěnou skříní.',
      'Nastavte dlouhý dozvuk s decay 3.0 s pro kouzelný filmový prostor.'
    ]
  }
];
