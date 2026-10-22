import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Layers, 
  Sliders, 
  Radio, 
  Cable, 
  Sparkles, 
  Info, 
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  RotateCcw,
  Maximize2,
  Wifi,
  SlidersHorizontal,
  Tv,
  Mic2,
  Music,
  Disc
} from 'lucide-react';
import { MixerId } from '../types';
import { MIXERS } from '../data/mixersConfig';

interface CompactConsoleOverviewProps {
  activeMixerId?: MixerId;
  onOpenAppendix?: () => void;
}

interface HotspotItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  summary: string;
  description: string;
}

const WING_HOTSPOTS: HotspotItem[] = [
  {
    id: 'wing-preamps',
    title: '24x Midas PRO mikrofonních vstupů',
    category: 'Zadní panel',
    badge: '24 In (XLR/TRS)',
    summary: '24 prémiových analogových předzesilovačů Midas PRO s dynamickým rozsahem 114 dB a ultra-nízkým zkreslením THD+N <0.004%.',
    description: 'Zadní panel WING Compact je osazen 24 kombinovanými konektory Neutrik XLR/TRS s nezávislým spínáním +48V fantomu a analogovým ziskem od 0 do +60 dB. Umožňuje přímé zapojení kompletní kapely bez nutnosti externího stageboxu.'
  },
  {
    id: 'wing-main-fader',
    title: 'Main Fader sekce s 2.4" LCD a 16 tlačítky',
    category: 'Horní panel',
    badge: 'Kompaktní inovace',
    summary: '16 tlačítek rychlého přístupu pro bleskové Sends on Fader a DCA Spill + 2.4" barevný stavový displej.',
    description: 'Výhradní prvek modelu WING Compact! Tlačítka BUS MASTER, DCA, MAIN/MATRIX a USER okamžitě přepínají levou faderovou sekci. Stiskem jednoho ze 16 tlačítek se aktivuje Sends On Fader pro daný odposlech nebo DCA Spill vybrané skupiny.'
  },
  {
    id: 'wing-left-faders',
    title: '12 motorických faderů 100 mm & Scribble Strips',
    category: 'Horní panel',
    badge: '12 Faderů',
    summary: 'Plně motorizované 100mm tahové potenciometry s mini LCD displeji a RGB barevnými pruhy.',
    description: 'Každá faderová stopa má vlastní miniaturní LCD displej (Scribble Strip), který zobrazuje číslo stopy, uživatelský název, grafickou ikonu a barevný proužek. Tlačítka vrstev vlevo přepínají banky 1-12, 13-24, 25-36, 37-40/Aux, Bus, Main a User 1/2.'
  },
  {
    id: 'wing-touch-screen',
    title: '10.1" naklápěcí dotykový displej',
    category: 'Horní panel',
    badge: '10.1" Multi-Touch',
    summary: 'Kapacitní dotykový displej s nastavením sklonu v rozsahu 15° až 60° a 6 dotykovými enkódery.',
    description: 'Centrální ovládací rozhraní zobrazuje grafický EQ s RTA analýzou, dynamické křivky, efektové racky a směrovací matici. 6 kapacitních otočných ovladačů pod displejem reaguje na přiložení prstu a okamžitě zvýrazní ovládaný parametr.'
  },
  {
    id: 'wing-digital-io',
    title: '3x AES50, StageConnect a 48x48 USB',
    category: 'Zadní panel',
    badge: 'Digitální konektivita',
    summary: 'Až 144 kanálů přes 3 AES50 porty, 32 kanálů přes StageConnect a 48x48 kanálů USB 2.0 interface.',
    description: 'Připojení digitálních stageboxů Behringer/Midas (S16, S32, DL32) po stíněném kabelu CAT-5e na vzdálenost až 80 m. StageConnect přenáší 32 digitálních stop s latencí pod 1 ms přes standardní mikrofonní/DMX kabel s napájením 12V 18W.'
  },
  {
    id: 'wing-live-sd',
    title: 'WING-LIVE slot pro 64 stop na SD kartách',
    category: 'Zadní panel',
    badge: '64ch SD Rekordér',
    summary: 'Záznam 64 stop 48 kHz / 32-bit přímo na dvě SD karty s možností záložní baterie CR123.',
    description: 'Karta WING-LIVE v rozšiřujícím slotu umožňuje samostatné nahrávání a virtuální zvukovou zkoušku bez počítače. Slot je zaměnitelný za WING-DANTE nebo WING-MADI karty.'
  }
];

const X32_HOTSPOTS: HotspotItem[] = [
  {
    id: 'x32-preamps',
    title: '16x Programovatelných Midas Preampů (XLR)',
    category: 'Zadní panel',
    badge: '16 In (XLR)',
    summary: '16 analogových mikrofonních předzesilovačů MIDAS s rozsahem zisku 72 dB a linkovými 6x Aux In/Out.',
    description: 'Zadní panel X32 Producer nabízí 16 symetrických XLR vstupů s plným dálkovým digitálním řízením, nezávislým +48V fantomem, otočením fáze a ořezem basů Low-Cut. Doplňuje je 6 symetrických 1/4" TRS jacků a RCA vstupů pro linkové zdroje.'
  },
  {
    id: 'x32-faders',
    title: '17 Motorizovaných Faderů 100 mm (8 + 8 + 1)',
    category: 'Horní panel',
    badge: '17 Motor. faderů',
    summary: '8 faderů vstupů vlevo, 8 faderů sběrnic/DCA/matic vpravo a 1 trvale dostupný Master fader.',
    description: 'Motorizované fadery s vysokým rozlišením 100 mm zaručují okamžité zobrazení správných hodnot při přepínání vrstev (1-8, 9-16, 17-24, 25-32, Aux/USB, FX Returns, Bus 1-16, DCA 1-8, Matrix 1-6). Uprostřed leží tlačítko Sends on Fader pro bleskové míchání odposlechů.'
  },
  {
    id: 'x32-display',
    title: '5" TFT Barevný Displej & 6 Push-Enkodérů',
    category: 'Horní panel',
    badge: '5" TFT (800x480)',
    summary: 'Vysokokontrastní denně čitelný displej s 6 otočnými push-enkodéry pro přímou editaci hodnot.',
    description: 'Centrální obrazovka s 10 navigačními tlačítky po stranách (Home, Meters, Routing, Library, Effects, Setup, Monitor, Scenes, Mute Group, Utility). Push-enkodéry pod obrazovkou ovládají parametry v horní části otočením a ve spodní části stisknutím.'
  },
  {
    id: 'x32-view-concept',
    title: 'Pravidlo tlačítek VIEW a kontextové UTILITY',
    category: 'Horní panel',
    badge: 'Rychlá navigace',
    summary: 'Dedikovaná tlačítka VIEW u každé sekce panelu pro okamžitý skok na odpovídající obrazovku displeje.',
    description: 'Nemusíte složitě listovat v menu – otočte EQ a stiskněte VIEW, displej okamžitě zobrazí křivku EQ. Stiskněte VIEW u USB portu pro magnetofon, nebo VIEW u Phones pro monitorovací sběrnici. Tlačítko UTILITY nabízí kopírování, vkládání a ukládání presetů stopy.'
  },
  {
    id: 'x32-assign-section',
    title: 'Custom Assign sekce (3 banky A/B/C po 8 tlačítkách)',
    category: 'Horní panel',
    badge: '24 Zkratek',
    summary: '24 volně programovatelných tlačítek pro okamžité Tap Tempo, Mute efektů nebo Jump to Page.',
    description: 'Uživatelská tlačítka v pravém dolním rohu umožňují namapovat nejčastější úkony zvukaře (vypnutí reverbu mezi písničkami, tapování tempa delaye, přepínání scén či skok na oblíbené měřáky).'
  },
  {
    id: 'x32-digital-io',
    title: 'Duální AES50 SuperMAC (96x96), Ultranet a X-USB 32x32',
    category: 'Zadní panel',
    badge: 'Digitální I/O',
    summary: 'Připojení pódiových stageboxů S16/S32, osobního monitoringu P16 a 32-stopého USB rozhraní pro DAW.',
    description: 'Dva porty AES50 SuperMAC přenášejí až 96 obousměrných digitálních stop po stíněném Cat-5e kabelu do 100 m. Konektor Ultranet zásobuje osobní mixy P16-M na jevišti. Karta X-USB slouží pro 32vstupové/výstupové nahrávání do počítače a DAW dálkové ovládání Mackie Control & HUI.'
  }
];

const UI24_HOTSPOTS: HotspotItem[] = [
  {
    id: 'ui24-preamps',
    title: '20x Studer-Designed Preampů (10 Combo + 10 XLR)',
    category: 'Čelní panel',
    badge: '20 In Studer',
    summary: '20 mikrofonních předzesilovačů z dílny legendárního Studeru s teplým a transparentním analogovým zvukem.',
    description: 'Kombinace 10 combo konektorů Neutrik XLR/TRS a 10 pevných XLR vstupů. Firmware v3 přináší ochranu Reset +48V on Boot, která při zapnutí pultu automaticky vypne fantom pro ochranu citlivých páskových mikrofonů.'
  },
  {
    id: 'ui24-hiz-digitech',
    title: '2x Hi-Z Nástrojové vstupy s DigiTech modelingem',
    category: 'Čelní panel',
    badge: 'Hi-Z + DigiTech',
    summary: 'Vysokoimpedanční vstupy na kanálech 1 a 2 s integrovanou emulací kytarových aparátů a reproboxů.',
    description: 'Umožňuje kytaristům a baskytaristům hrát přímo do pultu bez externího kytarového zesilovače. Vestavěný processing DigiTech nabízí přesné modelace slavných aparátů od čistého tónu po tvrdý metalový crunch.'
  },
  {
    id: 'ui24-dual-wifi',
    title: 'Dvoupásmová Wi-Fi (2.4 GHz & 5 GHz) a duální antény',
    category: 'Boční panel',
    badge: 'Duální Wi-Fi',
    summary: 'Integrovaný bezdrátový router podporující současné připojení až 10 telefonů, tabletů a notebooků.',
    description: 'Dvě externí antény zajišťují stabilní pokrytí i v zarušeném koncertním sále. Pult funguje jako samostatný Wi-Fi hotspot i jako klient zapojený do stávající sítě kapely.'
  },
  {
    id: 'ui24-cascade-v3',
    title: 'Duální Ethernet & Nový Cascade Mód v3 (32ch Stream)',
    category: 'Boční panel',
    badge: 'Cascade v3',
    summary: 'Propojení dvou pultů Ui24R přímo přes port Ethernet #2: obousměrný přenos 32 stop, sync VCA a Mute.',
    description: 'Exkluzivní novinka firmwaru v3! Přímý kabel CAT5e/6 mezi porty Ethernet 2 propojí dvě jednotky Ui24R až na vzdálenost 30 metrů bez nutnosti routeru. Z jediného okna prohlížeče ovládáte HOST i REMOTE jednotku, synchronizujete Mute Groups a sdílíte Solo na Ch 24.'
  },
  {
    id: 'ui24-outputs-aux',
    title: '8x Symetrických XLR Aux Out s filtry HPF/LPF (v3)',
    category: 'Čelní panel',
    badge: '8 Aux Out + Main',
    summary: '8 monitorových výstupů s dbx AFS2 eliminátory vazby a novými posuvníky HPF/LPF pro ochranu repro.',
    description: 'Každý z 8 Aux výstupů disponuje 31pásmovým grafickým ekvalizérem, kompresorem dbx, eliminátorem vazby dbx AFS2 a nově ve v3 také laditelnými filtry HPF a LPF. Doplňují je dva nezávislé sluchátkové výstupy a hlavní Main XLR výstupy.'
  },
  {
    id: 'ui24-usb-hdmi',
    title: 'Multitrack 22-stopý USB záznam + 32x32 DAW a HDMI 720p',
    category: 'Čelní & Boční panel',
    badge: 'USB + HDMI',
    summary: 'Přímý záznam 22 stop na USB flashku ve FLAC/WAV bez počítače a přímý HDMI výstup pro dotykový monitor.',
    description: 'Čelní USB port RECORD nahrává až 22 stop současně ve studiové kvalitě FLAC/WAV. Boční port USB-B slouží pro 32x32 nahrávání do DAW (Logic, Cubase, Reaper). Přímý HDMI výstup s podporou dotykových obrazovek (Dell, Viewsonic, Iiyama) mění Ui24R na samostatnou hardwarovou konzoli.'
  }
];

export const CompactConsoleOverview: React.FC<CompactConsoleOverviewProps> = ({ 
  activeMixerId = 'wing',
  onOpenAppendix 
}) => {
  const currentMixer = MIXERS[activeMixerId] || MIXERS.wing;

  let hotspots = WING_HOTSPOTS;
  if (activeMixerId === 'x32') {
    hotspots = X32_HOTSPOTS;
  } else if (activeMixerId === 'ui24') {
    hotspots = UI24_HOTSPOTS;
  }

  const [selectedHotspot, setSelectedHotspot] = useState<string>(hotspots[0].id);

  // When active mixer switches, reset hotspot to first item of that mixer
  useEffect(() => {
    setSelectedHotspot(hotspots[0].id);
  }, [activeMixerId]);

  const currentHotspotIndex = hotspots.findIndex(h => h.id === selectedHotspot);
  const safeHotspotIndex = currentHotspotIndex >= 0 ? currentHotspotIndex : 0;
  const currentHotspot = hotspots[safeHotspotIndex] || hotspots[0];
  const prevHotspot = safeHotspotIndex > 0 ? hotspots[safeHotspotIndex - 1] : null;
  const nextHotspot = safeHotspotIndex < hotspots.length - 1 ? hotspots[safeHotspotIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className={`p-5 rounded-2xl border ${currentMixer.borderColor} bg-[#121212] shadow-2xl flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10 shadow-inner">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase ${currentMixer.accentBg}`}>
                {currentMixer.brand}
              </span>
              <h3 className="text-base font-bold text-white">
                Hardware Mapa & Architektura: {currentMixer.fullName}
              </h3>
            </div>
            <p className="text-xs text-white/50 mt-0.5">
              Fyzické rozložení konektorů, ovládacích prvků a signálová konektivita
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {onOpenAppendix && (
            <button
              onClick={onOpenAppendix}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 flex items-center gap-1.5 font-bold font-sans transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span>Propojení v praxi</span>
            </button>
          )}

          <span className="px-3 py-1 bg-black text-white/70 rounded-full border border-white/10 font-bold">
            DSP: {currentMixer.specs.dsp.split(',')[0]}
          </span>
          <span className="px-3 py-1 bg-black text-white/70 rounded-full border border-white/10 font-bold hidden sm:inline">
            FIRMWARE: {currentMixer.firmware}
          </span>
        </div>
      </div>

      {/* Grid: Interactive Hotspots + Visual Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hotspots List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Klíčové hardwarové zóny</span>
            <span className="font-mono text-[11px] text-white/50">{hotspots.length} bloků</span>
          </div>

          {hotspots.map(h => {
            const isSelected = h.id === currentHotspot.id;
            return (
              <div
                key={h.id}
                onClick={() => setSelectedHotspot(h.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer select-none text-left ${
                  isSelected
                    ? 'bg-[#1e1e1e] border-white/40 shadow-xl shadow-black/50 ring-1 ring-white/20'
                    : 'bg-[#121212] border-white/5 hover:bg-[#161616] hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{h.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-black text-white/90 rounded-full border border-white/20 font-bold">
                    {h.badge}
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-1 line-clamp-2">
                  {h.summary}
                </p>
              </div>
            );
          })}
        </div>

        {/* Hotspot Visual Detail Inspector (7 cols) */}
        <div className="lg:col-span-7 bg-[#121212] border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4">
          {/* Quick Hotspot Navigation Bar */}
          <div className="bg-black/60 p-2 rounded-xl border border-white/10 flex items-center justify-between gap-2">
            {prevHotspot ? (
              <button
                onClick={() => setSelectedHotspot(prevHotspot.id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white text-xs font-medium transition-all cursor-pointer border border-white/10 group"
              >
                <ChevronLeft className="w-4 h-4 text-white/60 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-[11px]">Předchozí zóna</span>
              </button>
            ) : (
              <div className="px-3 py-1.5 text-[11px] text-white/30 font-mono">
                1. sekce
              </div>
            )}

            <span className="text-[11px] font-mono text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Blok {safeHotspotIndex + 1} z {hotspots.length}
            </span>

            {nextHotspot ? (
              <button
                onClick={() => setSelectedHotspot(nextHotspot.id)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-200 text-black text-xs font-bold transition-all shadow-md cursor-pointer group"
              >
                <span className="text-[11px]">Další zóna</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            ) : (
              <button
                onClick={() => setSelectedHotspot(hotspots[0].id)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="text-[11px]">Od začátku</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-white/50 uppercase font-bold">
                {currentHotspot.category}
              </span>
              <h3 className="text-base font-extrabold text-white">
                {currentHotspot.title}
              </h3>
            </div>
            <span className="px-3 py-1 bg-white/5 text-white/90 border border-white/20 text-xs font-mono font-bold rounded-full">
              {currentHotspot.badge}
            </span>
          </div>

          {/* Schematic visual box tailored to active mixer */}
          <div className="bg-[#000000] border border-white/10 rounded-xl p-4 text-xs font-mono space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-white/40 border-b border-white/10 pb-2 text-[11px]">
              <span className="text-white/80 font-bold uppercase">{currentMixer.fullName} TOPOLOGY</span>
              <span>{currentMixer.specs.channels}</span>
            </div>

            {/* Custom Mixer Visual Hardware Diagram */}
            {activeMixerId === 'wing' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-2">
                <div className="sm:col-span-7 bg-[#121212] border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-white/60 font-bold">
                    <span>LEVÁ SEKCE (12 FADERŮ)</span>
                    <span className="text-white/80">100mm Motor</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1 h-20 items-end bg-[#000000] p-2 rounded-lg border border-white/10">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-1.5 h-10 bg-white/10 rounded-full relative">
                          <div
                            className="w-3 h-2 bg-amber-400 rounded-sm -left-0.75 absolute shadow"
                            style={{ bottom: `${(i % 5) * 18 + 10}%` }}
                          />
                        </div>
                        <span className="text-[8px] text-white/30 font-mono">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:col-span-5 bg-[#121212] border border-amber-500/20 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-amber-300 font-bold">
                    <span>MAIN SEKCE</span>
                    <span className="text-amber-400">2.4" LCD + 16 CC</span>
                  </div>
                  <div className="bg-[#000000] p-2 rounded-lg border border-white/10 space-y-1.5">
                    <div className="grid grid-cols-4 gap-1">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-3 rounded-sm flex items-center justify-center text-[8px] font-mono font-bold ${
                            i < 4 ? 'bg-amber-400 text-black' : 'bg-white/10 text-amber-200'
                          }`}
                        >
                          {i + 1}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-1 text-[9px] text-white/40">
                      <span>16 QUICK SOF</span>
                      <span className="text-emerald-400 font-bold">ACTIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMixerId === 'x32' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-2">
                {/* X32 8 Inputs (Left) */}
                <div className="sm:col-span-5 bg-[#121212] border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-sky-300 font-bold">
                    <span>INPUTS (8 FADERŮ)</span>
                    <span className="text-white/60">1-8 / 9-16 / 17-32</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 h-20 items-end bg-[#000000] p-2 rounded-lg border border-white/10">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="flex flex-col items-center gap-1">
                        <div className="w-1.5 h-10 bg-white/10 rounded-full relative">
                          <div
                            className="w-3 h-2 bg-sky-400 rounded-sm -left-0.75 absolute shadow"
                            style={{ bottom: `${(i % 4) * 22 + 10}%` }}
                          />
                        </div>
                        <span className="text-[8px] text-white/30 font-mono">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* X32 Center Screen & Encoders */}
                <div className="sm:col-span-3 bg-[#121212] border border-sky-500/30 rounded-xl p-2.5 flex flex-col justify-between">
                  <div className="text-[9px] text-sky-400 font-bold text-center border-b border-sky-500/20 pb-1">
                    5" COLOR TFT (800x480)
                  </div>
                  <div className="bg-sky-950/40 border border-sky-500/20 rounded p-1.5 text-center text-[9px] text-sky-200">
                    <div>HOME • ROUTING • FX</div>
                    <div className="text-[8px] text-white/40 mt-1">6x Push-Enkodér</div>
                  </div>
                  <div className="grid grid-cols-6 gap-0.5 text-center text-[8px] text-sky-300 font-bold">
                    <span>E1</span><span>E2</span><span>E3</span><span>E4</span><span>E5</span><span>E6</span>
                  </div>
                </div>

                {/* X32 8 Groups/Bus + 1 Main (Right) */}
                <div className="sm:col-span-4 bg-[#121212] border border-white/10 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-sky-300 font-bold">
                    <span>BUS / DCA (8)</span>
                    <span className="text-emerald-400 font-bold">+ MAIN L/R</span>
                  </div>
                  <div className="flex items-end justify-between bg-[#000000] p-2 rounded-lg border border-white/10 h-20">
                    <div className="grid grid-cols-4 gap-1 flex-1">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <div className="w-1.5 h-10 bg-white/10 rounded-full relative">
                            <div className="w-3 h-2 bg-sky-400 rounded-sm -left-0.75 absolute bottom-1/2 shadow" />
                          </div>
                          <span className="text-[8px] text-white/30">D{i+1}</span>
                        </div>
                      ))}
                    </div>
                    <div className="w-px h-12 bg-white/20 mx-1.5" />
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-2 h-10 bg-emerald-500/20 rounded-full relative">
                        <div className="w-3.5 h-2 bg-emerald-400 rounded-sm -left-0.75 absolute bottom-3/4 shadow" />
                      </div>
                      <span className="text-[8px] text-emerald-300 font-bold">M</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeMixerId === 'ui24' && (
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-2">
                {/* Ui24R Front Preamp Section */}
                <div className="sm:col-span-7 bg-[#121212] border border-cyan-500/20 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold">
                    <span>20 STUDER PREAMPŮ (4U RACK)</span>
                    <span className="text-emerald-400">10 COMBO + 10 XLR</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1 bg-[#000000] p-2 rounded-lg border border-white/10">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-5 rounded flex items-center justify-center text-[8px] font-mono font-bold ${
                          i < 2 
                            ? 'bg-amber-500 text-black border border-amber-300' 
                            : i < 10 
                              ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-700/50' 
                              : 'bg-white/10 text-white/80'
                        }`}
                        title={i < 2 ? `Ch ${i+1}: Hi-Z DigiTech` : `Ch ${i+1}: Studer Pre`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-[9px] text-white/50">
                    <span className="text-amber-300 font-semibold">Ch 1-2: Hi-Z DigiTech</span>
                    <span>8x Symetrických XLR Aux Out</span>
                  </div>
                </div>

                {/* Ui24R Connectivity & Cascade */}
                <div className="sm:col-span-5 bg-[#121212] border border-emerald-500/20 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-emerald-300 font-bold">
                    <span>SÍŤ & CASCADE V3</span>
                    <span className="text-emerald-400 font-bold">32ch Link</span>
                  </div>
                  <div className="bg-[#000000] p-2.5 rounded-lg border border-white/10 space-y-2 text-[10px]">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Wi-Fi Router:</span>
                      <span className="text-emerald-400 font-bold">2.4 GHz + 5 GHz (10 Klientů)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60">Ethernet 1:</span>
                      <span className="text-cyan-300">LAN / Router / Switch</span>
                    </div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-1">
                      <span className="text-white/60">Ethernet 2:</span>
                      <span className="text-amber-400 font-bold">Cascade direct CAT5e/6</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              {currentHotspot.description}
            </p>
          </div>

          <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="text-white/40">Záznam & Rozhraní:</span>
            <span className="text-emerald-400 font-bold">{currentMixer.specs.recording}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
