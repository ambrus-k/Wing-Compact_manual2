import React, { useState } from 'react';
import { SavedScene, SceneChannelPatch } from '../types';
import { generateStageRiderPdf } from '../utils/pdfGenerator';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Sliders, 
  FileSpreadsheet,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface StageRiderPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: SavedScene;
  channels: SceneChannelPatch[];
}

export const StageRiderPdfModal: React.FC<StageRiderPdfModalProps> = ({
  isOpen,
  onClose,
  scene,
  channels
}) => {
  const [bandName, setBandName] = useState(scene.name);
  const [venueName, setVenueName] = useState('Klub / Letní Scéna / Festival');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [engineerName, setEngineerName] = useState('FOH Zvukař');
  const [engineerContact, setEngineerContact] = useState('+420 777 123 456 / zvuk@kapela.cz');
  const [notes, setNotes] = useState(
    scene.description || 'Vyžadujeme pult Behringer WING / WING Compact s nejnovějším FW 3.0+ a pódiový AES50 stagebox.'
  );
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = () => {
    generateStageRiderPdf(scene, channels, {
      bandName,
      venueName,
      date,
      engineerName,
      engineerContact,
      notes
    });
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Generátor & Náhled Stage Rideru (PDF Reader)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/40 font-bold">
                  {channels.length} Kanálů
                </span>
              </h3>
              <p className="text-[11px] text-white/50">
                Připravte profesionální technický list a pódiový seznam vstupů pro pořadatele a zvukaře.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Editable Form + Live Preview */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-xs">
          {/* Metadata Inputs */}
          <div className="bg-black/60 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Nastavení údajů na hlavičce rideru:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div>
                <label className="text-[10px] text-white/50 block mb-1">Název kapely / Scény:</label>
                <input
                  type="text"
                  value={bandName}
                  onChange={(e) => setBandName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Místo / Akce:</label>
                <input
                  type="text"
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Datum vystoupení:</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Jméno zvukaře / FOH inženýra:</label>
                <input
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Telefon / E-mail:</label>
                <input
                  type="text"
                  value={engineerContact}
                  onChange={(e) => setEngineerContact(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-[10px] text-white/50 block mb-1">Technické poznámky k PA / pódiu:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-1.5 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>
          </div>

          {/* Live Document Visual Preview (Transparent Clean Sheet) */}
          <div className="bg-white text-black p-6 rounded-xl shadow-2xl border border-gray-300 font-sans space-y-4 select-text">
            {/* Document Header */}
            <div className="border-b-2 border-slate-900 pb-3 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h1 className="text-base font-extrabold tracking-tight text-gray-900">
                  BEHRINGER WING COMPACT — PÓDIOVÝ A TECHNICKÝ RIDER
                </h1>
                <div className="text-xs font-bold text-slate-800">
                  {bandName.toUpperCase()} — {scene.details?.targetEnsemble || 'LIVE SHOW'}
                </div>
              </div>
              <div className="text-right text-[10px] text-gray-500 font-mono">
                <div>Datum: {date}</div>
                <div>Vygenerováno: Behringer WING Toolkit</div>
              </div>
            </div>

            {/* Event & Tech specs */}
            <div className="grid grid-cols-2 gap-2 text-[11px] bg-gray-50 p-2.5 rounded border border-gray-200">
              <div><strong>Místo / Stage:</strong> {venueName}</div>
              <div><strong>Zvukař:</strong> {engineerName} ({engineerContact})</div>
              <div className="col-span-2 text-gray-700"><strong>Požadavky & Poznámky:</strong> {notes}</div>
            </div>

            {/* Input Patch Sheet Table */}
            <div className="space-y-1">
              <div className="text-[11px] font-bold text-gray-900 uppercase">
                1. Pódiový seznam vstupů (Input Patch — {channels.length} stop):
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px] font-mono border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white font-bold">
                      <th className="p-1.5 text-center w-8">CH</th>
                      <th className="p-1.5">Nástroj / Popis</th>
                      <th className="p-1.5">Vstupní port</th>
                      <th className="p-1.5 text-center">Gain</th>
                      <th className="p-1.5 text-center">48V</th>
                      <th className="p-1.5 text-center">Fáze</th>
                      <th className="p-1.5">Gate</th>
                      <th className="p-1.5">EQ Profil</th>
                      <th className="p-1.5">Kompresor</th>
                      <th className="p-1.5 text-center">DCA</th>
                      <th className="p-1.5 text-center">Fader</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {channels.map((ch, idx) => (
                      <tr key={ch.chNum} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-1 text-center font-bold text-gray-900">{ch.chNum}</td>
                        <td className="p-1 font-bold text-gray-800">{ch.name}</td>
                        <td className="p-1 text-gray-600">{ch.sourceInput}</td>
                        <td className="p-1 text-center font-bold text-slate-800">+{ch.gainDb} dB</td>
                        <td className="p-1 text-center">{ch.phantom48V ? 'ANO' : '—'}</td>
                        <td className="p-1 text-center">{ch.phaseInvert ? '180°' : '0°'}</td>
                        <td className="p-1 text-gray-600">{ch.gateOn ? ch.gateModel : 'Bypass'}</td>
                        <td className="p-1 text-gray-700">{ch.eqModel}</td>
                        <td className="p-1 text-gray-700">{ch.compOn ? ch.compModel : 'Bypass'}</td>
                        <td className="p-1 text-center font-bold">{ch.dcaGroup ? `DCA ${ch.dcaGroup}` : '—'}</td>
                        <td className="p-1 text-center">{ch.faderDb <= -60 ? '-∞' : `${ch.faderDb > 0 ? '+' : ''}${ch.faderDb} dB`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monitor Buses Preview */}
            <div className="space-y-1 pt-2">
              <div className="text-[11px] font-bold text-gray-900 uppercase">
                2. Odposlechové cesty (IEM / Monitory — {(scene.buses || []).length} sběrnic):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(scene.buses || []).slice(0, 8).map(b => (
                  <div key={b.busNum} className="bg-gray-100 p-2 rounded border border-gray-200 text-[10px]">
                    <div className="font-bold text-gray-900">Bus {b.busNum}: {b.name}</div>
                    <div className="text-gray-500">{b.role}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 bg-black border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="text-[11px] text-white/50">
            Exportovaný soubor PDF obsahuje kompletní vektorovou tabulku pro tisk formátu A4.
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Vytisknout</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer ${
                downloadSuccess
                  ? 'bg-[#AEEA00] text-black shadow-lg shadow-[#AEEA00]/30 animate-pulse'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/30'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>PDF STÁŽENO!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>STÁHNOUT PDF RIDER</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
