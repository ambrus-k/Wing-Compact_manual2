import { MixerConfig } from '../types';

export const MIXERS: Record<string, MixerConfig> = {
  wing: {
    id: 'wing',
    name: 'WING Compact',
    fullName: 'Behringer WING Compact',
    brand: 'BEHRINGER',
    model: 'WING COMPACT',
    badge: '48 Stereo Ch',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-500/30',
    accentBg: 'bg-amber-500/10 text-amber-300',
    tagline: 'Moderní 48-kanálový stereo mixážní pult s Midas PRO předzesilovači a plně stereofonní architekturou.',
    firmware: 'v3.1 Pro Engine',
    specs: {
      channels: '48 stereo kanálů (40 vstupů + 8 Aux)',
      preamps: '24x Midas PRO Combo XLR/TRS',
      outputs: '8x XLR Midas PRO + 8x TRS Aux Out',
      buses: '16 stereo busů, 8 stereo matic, 4 stereo mains',
      faders: '12+1 100mm motorizovaných faderů',
      screen: '10.1" výklopný vícedotykový displej + 2.4" LCD',
      dsp: '40-bit floating point, vintage modeling racky',
      recording: '64x64 WING-LIVE dual SD + 48x48 USB rozhraní'
    },
    highlights: [
      'Nezávislé zdroje (Sources) oddělené od kanálů (Channels)',
      'Plně stereofonní sběrnice bez ztráty faderů a kapacity',
      '2.4" LCD s 16 dedikovanými tlačítky pro Sends on Faders & Spill',
      'Ultra-nízká latence 1.0 ms přes StageConnect & AES50'
    ]
  },
  x32: {
    id: 'x32',
    name: 'X32 Producer',
    fullName: 'Behringer X32 Producer',
    brand: 'BEHRINGER',
    model: 'X32 PRODUCER',
    badge: '40 In / 25 Bus',
    color: 'from-sky-500 to-blue-600',
    borderColor: 'border-sky-500/30',
    accentBg: 'bg-sky-500/10 text-sky-300',
    tagline: 'Osvědčený rackový a studiový digitální pult s 16 Midas preampy, 17 motorizovanými fadery a 32x32 USB.',
    firmware: 'v4.06 Standard',
    specs: {
      channels: '40 vstupů (32 kanálů + 8 Aux / USB)',
      preamps: '16x XLR programovatelných Midas preampů',
      outputs: '8x XLR analog out + 6x TRS Aux Out + Talkback',
      buses: '16 mix busů, 6 matic, Main L/R/C bus',
      faders: '17x 100mm motorizovaných faderů ve 2 sekcích',
      screen: '5" barevný TFT displej (800x480) s 6 push-enkodéry',
      dsp: '40-bit floating point, 8 true-stereo FX racků (39 modelů)',
      recording: '32x32 USB 2.0 audio rozhraní (X-USB) + 2-track USB WAV'
    },
    pdfUrl: '/assets/aistudio/X32_Producer_manual_13db8698.pdf',
    pdfTitle: 'X32 Producer Oficiální Manuál (PDF)',
    highlights: [
      '17 motorizovaných faderů 100 mm s bleskovým Sends on Fader',
      'Duální AES50 SuperMAC porty pro 96x96 digitální stageboxy (S16/S32)',
      'Dedikovaná tlačítka VIEW u každé sekce pro přímý skok na displeji',
      'Virtuální FX rack s legendárními modely (Lexicon, Quantec, EMT250)'
    ]
  },
  ui24: {
    id: 'ui24',
    name: 'Soundcraft Ui24R',
    fullName: 'Soundcraft Ui24R',
    brand: 'SOUNDCRAFT',
    model: 'Ui24R',
    badge: '24 Ch / HTML5',
    color: 'from-cyan-500 to-emerald-600',
    borderColor: 'border-cyan-500/30',
    accentBg: 'bg-cyan-500/10 text-cyan-300',
    tagline: '24-kanálový surfaceless digitální mix s duální Wi-Fi, Studer preampy, dbx, Lexicon a novým Cascade v3.',
    firmware: 'v3.0.8242 Firmware Addendum',
    specs: {
      channels: '24 vstupních kanálů (20 mic + 2 line/RCA + USB)',
      preamps: '20x Studer-designed mikrofonních preampů (10 combo)',
      outputs: '8x symetrických XLR Aux out + 2x Main XLR/TRS + 2x Sluchátka',
      buses: '8 Aux busů, 4 FX sendy, 4 Subgroupy, 6 VCA skupin',
      faders: 'Virtuální HTML5 faderová plocha pro až 10 zařízení',
      screen: 'Bezdisplejový rack (Web GUI na mobilu, tabletu, PC i HDMI)',
      dsp: 'dbx AFS2 zpětnovazební filtry, Lexicon Reverb/Delay, DigiTech',
      recording: '32x32 USB DAW interface + přímý 22-stopý záznam na USB disk'
    },
    pdfUrl: '/assets/aistudio/Ui24R_addendum_V3_original_bf539b9a.pdf',
    pdfTitle: 'Ui24R v3 Firmware Addendum Manuál (PDF)',
    highlights: [
      'Nový Cascade Mód v3: obousměrné streamování 32 kanálů mezi 2x Ui24R',
      'Surfaceless HTML5 ovládání bez instalace aplikací z jakéhokoliv prohlížeče',
      'Nové CUEs: okamžité přepínání faderů a sendů bez jakékoliv latence DSP',
      '30 programovatelných síťových UDP tlačítek pro ovládání světel a efektů'
    ]
  }
};
