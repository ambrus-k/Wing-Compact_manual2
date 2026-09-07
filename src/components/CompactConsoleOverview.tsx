import React, { useState } from 'react';
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
  Maximize2
} from 'lucide-react';

interface CompactConsoleOverviewProps {
  onOpenAppendix?: () => void;
}

export const CompactConsoleOverview: React.FC<CompactConsoleOverviewProps> = ({ onOpenAppendix }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string>('midas-preamps');

  const hotspots = [
    {
      id: 'midas-preamps',
      title: '24x Midas PRO mikrofonních vstupů',
      category: 'Zadní panel',
      badge: '24 In (XLR/TRS)',
      summary: '24 prémiových analogových předzesilovačů Midas PRO s dynamickým rozsahem 114 dB a ultra-nízkým zkreslením THD+N <0.004%.',
      description: 'Zadní panel WING Compact je osazen 24 kombinovanými konektory Neutrik XLR/TRS s nezávislým spínáním +48V fantomu a analogovým ziskem od 0 do +60 dB. Umožňuje přímé zapojení kompletní kapely bez nutnosti externího stageboxu.'
    },
    {
      id: 'main-fader-section',
      title: 'Main Fader sekce s 2.4" LCD a 16 tlačítky',
      category: 'Horní panel',
      badge: 'Kompaktní inovace',
      summary: '16 tlačítek rychlého přístupu pro bleskové Sends on Fader a DCA Spill + 2.4" barevný stavový displej.',
      description: 'Výhradní prvek modelu WING Compact! Tlačítka BUS MASTER, DCA, MAIN/MATRIX a USER okamžitě přepínají levou faderovou sekci. Stiskem jednoho ze 16 tlačítek se aktivuje Sends On Fader pro daný odposlech nebo DCA Spill vybrané skupiny.'
    },
    {
      id: 'left-faders',
      title: '12 motorických faderů 100 mm & Scribble Strips',
      category: 'Horní panel',
      badge: '12 Faderů',
      summary: 'Plně motorizované 100mm tahové potenciometry s mini LCD displeji a RGB barevnými pruhy.',
      description: 'Každá faderová stopa má vlastní miniaturní LCD displej (Scribble Strip), který zobrazuje číslo stopy, uživatelský název, grafickou ikonu a barevný proužek. Tlačítka vrstev vlevo přepínají banky 1-12, 13-24, 25-36, 37-40/Aux, Bus, Main a User 1/2.'
    },
    {
      id: 'touch-screen',
      title: '10.1" naklápěcí dotykový displej',
      category: 'Horní panel',
      badge: '10.1" Multi-Touch',
      summary: 'Kapacitní dotykový displej s nastavením sklonu v rozsahu 15° až 60° a 6 dotykovými enkódery.',
      description: 'Centrální ovládací rozhraní zobrazuje grafický EQ s RTA analýzou, dynamické křivky, efektové racky a směrovací matici. 6 kapacitních otočných ovladačů pod displejem reaguje na přiložení prstu a okamžitě zvýrazní ovládaný parametr.'
    },
    {
      id: 'digital-io',
      title: '3x AES50, StageConnect a 48x48 USB',
      category: 'Zadní panel',
      badge: 'Digitální konektivita',
      summary: 'Až 144 kanálů přes 3 AES50 porty, 32 kanálů přes StageConnect a 48x48 kanálů USB 2.0 interface.',
      description: 'Připojení digitálních stageboxů Behringer/Midas (S16, S32, DL32) po stíněném kabelu CAT-5e na vzdálenost až 80 m. StageConnect přenáší 32 digitálních stop s latencí pod 1 ms přes standardní mikrofonní/DMX kabel s napájením 12V 18W.'
    },
    {
      id: 'wing-live',
      title: 'WING-LIVE slot pro 64 stop na SD kartách',
      category: 'Zadní panel',
      badge: '64ch SD Rekordér',
      summary: 'Záznam 64 stop 48 kHz / 32-bit přímo na dvě SD karty s možností záložní baterie CR123.',
      description: 'Karta WING-LIVE v rozšiřujícím slotu umožňuje samostatné nahrávání a virtuální zvukovou zkoušku bez počítače. Slot je zaměnitelný za WING-DANTE nebo WING-MADI karty.'
    }
  ];

  const currentHotspotIndex = hotspots.findIndex(h => h.id === selectedHotspot);
  const safeHotspotIndex = currentHotspotIndex >= 0 ? currentHotspotIndex : 0;
  const currentHotspot = hotspots[safeHotspotIndex] || hotspots[0];
  const prevHotspot = safeHotspotIndex > 0 ? hotspots[safeHotspotIndex - 1] : null;
  const nextHotspot = safeHotspotIndex < hotspots.length - 1 ? hotspots[safeHotspotIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-[#121212] p-4 rounded-2xl border border-white/10 shadow-2xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 text-white flex items-center justify-center border border-white/10 shadow-inner">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Interaktivní Hardware Mapa & Topologie Behringer WING Compact
            </h3>
            <p className="text-[11px] text-white/50">
              Přehled fyzických ovládacích prvků, konektivity a uspořádání ovládací plochy
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          {onOpenAppendix && (
            <button
              onClick={onOpenAppendix}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white rounded-lg border border-white/10 flex items-center gap-1.5 font-bold font-sans transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-white/60" />
              <span className="hidden sm:inline">Příloha & Propojení s pultem</span>
              <span className="sm:hidden">Příloha</span>
            </button>
          )}

          <span className="px-3 py-1 bg-black text-white/70 rounded-full border border-white/10 font-bold">
            HMOTNOST: 15.4 kg
          </span>
          <span className="px-3 py-1 bg-black text-white/70 rounded-full border border-white/10 font-bold">
            PŘÍKON: 130 W
          </span>
        </div>
      </div>

      {/* Grid: Interactive Hotspots + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Hotspots List (5 cols) */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-1">
            Klíčové HW bloky konzole
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
                <span className="text-[11px]">Předchozí sekce</span>
              </button>
            ) : (
              <div className="px-3 py-1.5 text-[11px] text-white/30 font-mono">
                1. sekce
              </div>
            )}

            <span className="text-[11px] font-mono text-white font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-white/20">
              Sekce {safeHotspotIndex + 1} z {hotspots.length}
            </span>

            {nextHotspot ? (
              <button
                onClick={() => setSelectedHotspot(nextHotspot.id)}
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-white hover:bg-gray-200 text-black text-xs font-bold transition-all shadow-md cursor-pointer group"
              >
                <span className="text-[11px]">Další sekce</span>
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

          {/* Schematic visual box */}
          <div className="bg-[#000000] border border-white/10 rounded-xl p-4 text-xs font-mono space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-white/40 border-b border-white/10 pb-2 text-[11px]">
              <span className="text-white/80 font-bold">BEHRINGER WING COMPACT ARCHITECTURE</span>
              <span>SAMPLE RATE: 48 kHz</span>
            </div>

            {/* Console Surface Visualization */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 py-2">
              {/* Left Faders Box */}
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
                          className="w-3 h-2 bg-white/80 rounded-sm -left-0.75 absolute shadow"
                          style={{ bottom: `${(i % 5) * 18 + 10}%` }}
                        />
                      </div>
                      <span className="text-[8px] text-white/30 font-mono">{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Fader & 16 Buttons Box */}
              <div className="sm:col-span-5 bg-[#121212] border border-cyan-500/20 rounded-xl p-3 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-cyan-300 font-bold">
                  <span>MAIN SEKCE</span>
                  <span className="text-cyan-400">2.4" LCD</span>
                </div>
                <div className="bg-[#000000] p-2 rounded-lg border border-white/10 space-y-1.5">
                  <div className="grid grid-cols-4 gap-1">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-3 rounded-sm flex items-center justify-center text-[8px] font-mono font-bold ${
                          i < 4 ? 'bg-white text-black' : 'bg-white/10 text-cyan-300'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[9px] text-white/40">
                    <span>16 QUICK CC</span>
                    <span className="text-emerald-400 font-bold">SOF ON</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-300 font-sans leading-relaxed pt-1">
              {currentHotspot.description}
            </p>
          </div>

          <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-white/40">Všechny vstupy Midas PRO podporují:</span>
            <span className="text-[#AEEA00] font-bold">+48V • Phase Invert • Trim ±18dB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
