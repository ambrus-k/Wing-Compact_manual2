import React, { useState } from 'react';
import { 
  X, 
  Sliders, 
  Layers, 
  Activity, 
  Cpu, 
  Network, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  Cable,
  Volume2,
  HardDrive,
  Wifi,
  Sparkles,
  Info
} from 'lucide-react';

interface AppendixModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSection?: 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge';
  onNavigateToManual?: (chapterId: string, subId: string) => void;
}

export const AppendixModal: React.FC<AppendixModalProps> = ({
  isOpen,
  onClose,
  initialSection = 'bridge',
  onNavigateToManual
}) => {
  const [activeSection, setActiveSection] = useState<'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge'>(initialSection);

  if (!isOpen) return null;

  const sections = [
    { id: 'bridge', label: 'Propojení v praxi', icon: <Wifi className="w-4 h-4" />, badge: 'Přehled' },
    { id: 'presets', label: 'Sound Lab (Presety)', icon: <Sliders className="w-4 h-4" />, badge: 'Strip' },
    { id: 'scenes', label: 'Knihovna scén', icon: <Layers className="w-4 h-4" />, badge: 'Scope' },
    { id: 'diagnostics', label: 'Diagnostika & Testy', icon: <Activity className="w-4 h-4" />, badge: 'Audio Měření' },
    { id: 'hardware', label: 'Hardware Mapa', icon: <Cpu className="w-4 h-4" />, badge: 'Topologie' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#121212] border border-white/10 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 bg-[#000000] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/30 shadow-inner">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Příloha & Průvodce propojením s reálným mixem WING
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#AEEA00]/10 text-[#AEEA00] border border-[#AEEA00]/30 rounded-full font-bold">
                  Virtual vs. Real Hardware
                </span>
              </div>
              <p className="text-xs text-white/50">
                Detailní popis fungování modulů, konfigurovatelných parametrů a postup propojení s mixem
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Navigation Tabs */}
        <div className="px-4 sm:px-5 py-2.5 bg-[#0a0a0a] border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-xs">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id as any)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeSection === s.id
                  ? 'bg-cyan-400 text-black font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {s.icon}
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-sm text-gray-300">
          {/* SECTION: BRIDGE */}
          {activeSection === 'bridge' && (
            <div className="space-y-5">
              <div className="bg-[#000000] p-4 rounded-xl border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Info className="w-4 h-4 text-cyan-400" />
                  <span>Je to jen virtuální simulace, nebo se lze připojit k reálnému mixu?</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Tato aplikace je <strong>výkonným hybridním nástrojem</strong>: slouží jako offline zvuková laboratoř a interaktivní referenční příručka, ale zároveň <strong>poskytuje reálná data a signály kompatibilní s fyzickým pultem Behringer WING</strong>.
                </p>
              </div>

              {/* Table of Integration */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#000000]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10 text-white/60 font-mono">
                      <th className="p-3">Modul aplikace</th>
                      <th className="p-3">Virtuální funkce v aplikaci</th>
                      <th className="p-3">Reálné propojení s pultem WING</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans text-xs">
                    <tr>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-cyan-400" /> Sound Lab
                      </td>
                      <td className="p-3 text-white/70">
                        Interaktivní ladění EQ křivek, dynamiky, brány a gainu s testovacími tóny.
                      </td>
                      <td className="p-3 text-white/90">
                        Zkopírování do schránky pro zadání v pultu / WING Edit, export do <code className="text-[#AEEA00] font-mono">.chn</code> na USB, nebo OSC řízení po UDP 2223.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-cyan-400" /> Knihovna scén
                      </td>
                      <td className="p-3 text-white/70">
                        Tvorba snapshotů, správa oblíbených a nastavení 12 Scope filtrů (Recall Safe).
                      </td>
                      <td className="p-3 text-white/90">
                        Záloha do <code className="text-[#AEEA00] font-mono">.json</code>, nahrání <code className="text-[#AEEA00] font-mono">.snap</code> na USB disk (<code className="text-white/60 font-mono">/WING/SHOWS/</code>), dálkové vyvolávání přes MIDI PC či OSC.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-[#AEEA00]" /> Diagnostika
                      </td>
                      <td className="p-3 text-white/70">
                        Kalkulátor 40-bit latence, simulace chyb AES50 a kalibrace displeje.
                      </td>
                      <td className="p-3 text-white/90">
                        <strong>Generátor tónů vysílá reálný zvuk!</strong> Připojte Jack 3.5mm → XLR do pultu pro měření a ladění PA systému růžovým šumem.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Hardware Mapa
                      </td>
                      <td className="p-3 text-white/70">
                        Schéma ovládací plochy 12+1 faderů, 24 Midas vstupů a 2.4" LCD displeje.
                      </td>
                      <td className="p-3 text-white/90">
                        Referenční manuál pro zapojení stageboxů S16/S32, StageConnect DP48, USB DAW 48x48 a Dante karet.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 3 Main Integration Paths */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <HardDrive className="w-4 h-4 text-cyan-400" />
                    <span>1. USB Flash Disk</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Formát <strong>FAT32</strong>. Vytvořte složky <code className="font-mono text-white/80">/WING/CHANNELS/</code> a <code className="font-mono text-white/80">/WING/SHOWS/</code> pro import a export scén i presetů.
                  </p>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Wifi className="w-4 h-4 text-[#AEEA00]" />
                    <span>2. Síťové ovládání (OSC)</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    WING naslouchá na <strong>UDP portu 2223</strong>. Veškeré parametry lze dálkově řídit přes WING Edit, WING CoPilot nebo vlastní OSC skripty.
                  </p>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold text-xs">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>3. Audio kabel do pultu</span>
                  </div>
                  <p className="text-[11px] text-white/60 leading-relaxed">
                    Výstup ze zvukové karty notebooku zapojte do Aux In 7/8 pultu a generujte růžový šum pro akustickou ekvalizaci a fázování PA.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PRESETS */}
          {activeSection === 'presets' && (
            <div className="space-y-4">
              <div className="bg-[#000000] p-4 rounded-xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Sound Lab & Knihovna nástrojových presetů</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Modul simuluje kompletní signálový řetězec každého kanálu konzole Behringer WING. Můžete prozkoumávat optimální nastavení gainu, ekvalizérů, komprese a efektů pro různé hudební nástroje.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-400 block">Co lze konfigurovat:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Midas PRO Preamp: Zisk v dB, +48V fantom, otočení fáze Ø.</li>
                    <li>Gate/Expander: Threshold, Ratio, Attack, Hold, Release.</li>
                    <li>6-pásmový EQ: HPF frekvence a strmost, Gain, Q pro Pultec, Neve a WING EQ.</li>
                    <li>Kompresor: 1176 FET, LA-2A, Fairchild, Makeup gain.</li>
                    <li>FX Send: Dozvuky VSS3, Delaye a chorusy v dB.</li>
                  </ul>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-[#AEEA00] block">Propojení s reálným pultem:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Klikněte na <strong>Kopírovat preset</strong> a zadejte hodnoty do WING Edit / konzole.</li>
                    <li>Uložte parametry do <code className="font-mono text-white">.chn</code> souboru na USB flash disk (<code className="font-mono text-white">/WING/CHANNELS/</code>).</li>
                    <li>Odešlete parametry po síti přes OSC příkazy (<code className="font-mono text-white">/ch/1/eq/1/f</code>, <code className="font-mono text-white">/ch/1/dyn/thr</code>) na UDP port 2223.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SCENES */}
          {activeSection === 'scenes' && (
            <div className="space-y-4">
              <div className="bg-[#000000] p-4 rounded-xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Knihovna scén & Snapshoty (Scenes Manager)</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Umožňuje navrhovat kompletní nastavení pultu pro festivaly, kapely, divadla a sbory. Klíčovým prvkem je <strong>Scope Matrix (Recall Safe)</strong>, která zabraňuje nechtěnému přepsání výstupního směrování a PA ekvalizace.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-400 block">Co lze konfigurovat:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Typ uložení: Snapshot (kompletní snímek), Snippet (výřez) nebo Show.</li>
                    <li>12 nezávislých Scope filtrů (Kanály, Auxy, Sběrnice, Mains, Matice, EQ, Dyn, Gate, FX, Routing, DCA, Mute Groups).</li>
                    <li>Organizace bank faderů a profil 16 tlačítek Custom Controls.</li>
                    <li>Export kompletní databáze do JSON a import.</li>
                  </ul>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-[#AEEA00] block">Propojení s reálným pultem:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Přeneste scény na USB disk do složky <code className="font-mono text-white">/WING/SHOWS/</code> jako soubory <code className="font-mono text-white">.snap</code> nebo <code className="font-mono text-white">.show</code>.</li>
                    <li>Dálkové vyvolávání přes <strong>MIDI Program Change</strong> zprávy ze sekvenceru.</li>
                    <li>Spínání nožním pedálem přes zadní konektory <strong>GPIO 1 a 2</strong>.</li>
                    <li>Síťové vyvolání přes OSC příkaz: <code className="font-mono text-white">/show/recall "NazevSceny"</code>.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: DIAGNOSTICS */}
          {activeSection === 'diagnostics' && (
            <div className="space-y-4">
              <div className="bg-[#000000] p-4 rounded-xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Diagnostika, Latence & Testovací generátor</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Zahrnuje přesný matematický model 40-bitové latence signálových cest WINGu, monitorování integrity kabelů AES50 a StageConnect a <strong>živý generátor akustických tónů</strong> pro ladění zvukové aparatury.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-400 block">Co lze konfigurovat:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Vzorkovací frekvence 48 kHz nebo 44.1 kHz.</li>
                    <li>Smyčky Bus-to-Bus (+8 smpl) a Bus jako Channel Input (+38 smpl).</li>
                    <li>Výběr insertních FX (Precision Limiter, Pitch Fix, Amp emulátory).</li>
                    <li>Přehrávání testovacích tónů (1 kHz, 440 Hz, Růžový šum, Bílý šum) s regulací hlasitosti.</li>
                    <li>Simulace kalibrace Ghost Touch dotykové vrstvy.</li>
                  </ul>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-[#AEEA00] block">Propojení s reálným pultem:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li><strong>Skutečný zvukový výstup:</strong> Propojte sluchátkový výstup PC do Aux In 7/8 pultu a spusťte růžový šum pro měření sálu měřicím mikrofonem.</li>
                    <li>Čítače chyb COR a UNC odpovídají nabídce pultu <code className="font-mono text-white">SETUP → DIAGNOSTICS</code>.</li>
                    <li>Při náhodných dotycích na pultu podržte prázdné tlačítko u displeje a <strong>CLR SOLO</strong> na 1.5s pro rekalibraci.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: HARDWARE */}
          {activeSection === 'hardware' && (
            <div className="space-y-4">
              <div className="bg-[#000000] p-4 rounded-xl border border-white/10 space-y-2">
                <h4 className="text-sm font-bold text-white">Hardware Mapa & Topologie WING Compact</h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  Interaktivní schéma fyzických vstupů, motorických faderů a podsvícených tlačítek konzole WING Compact pro rychlou orientaci na pódiu i v režii.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-cyan-400 block">Co modul zobrazuje:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>24 vestavěných Midas PRO combo vstupů XLR/TRS na šasi.</li>
                    <li>12+1 motorických 100mm faderů a 2.4" LCD displej se 16 tlačítky.</li>
                    <li>3x porty AES50 (144x144 kanálů) a StageConnect 32ch přes 110Ω kabel.</li>
                    <li>USB audio rozhraní 48x48 a duální slot pro SD karty WING-LIVE (64 stop).</li>
                  </ul>
                </div>

                <div className="bg-[#000000] p-3.5 rounded-xl border border-white/10 space-y-1">
                  <span className="font-bold text-[#AEEA00] block">Propojení s reálným pultem:</span>
                  <ul className="list-disc list-inside space-y-1 text-white/70 text-[11px]">
                    <li>Připojení stageboxů S16/S32/DL32 přes stíněné CAT-5e EtherCON kabely.</li>
                    <li>Přímé napájení a směrování do odposlechů DP48 přes StageConnect.</li>
                    <li>Propojení zadního USB-B konektoru s DAW (Reaper, Pro Tools) pro 48-stopý záznam a virtuální zvukovou zkoušku.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-white/10 bg-[#000000] flex flex-wrap items-center justify-between gap-3">
          {onNavigateToManual && (
            <button
              onClick={() => {
                onClose();
                onNavigateToManual('ch-13-appendix-integration', '13-5-physical-mixer-bridge');
              }}
              className="flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-white transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>Otevřít celou kapitolu Přílohy v manuálu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all"
          >
            Rozumím, zavřít
          </button>
        </div>
      </div>
    </div>
  );
};
