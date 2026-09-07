import React, { useState } from 'react';
import { Github, X, Check, AlertCircle } from 'lucide-react';

interface GitHubExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GitHubExportModal: React.FC<GitHubExportModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/40">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-white" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">Nahrávání kódu na GitHub</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-gray-300 text-sm overflow-y-auto max-h-[80vh]">
          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-emerald-100/90 leading-relaxed">
              <strong>Dobrá zpráva!</strong> Nemusíme do aplikace složitě programovat vlastní systém pro nahrávání na GitHub. 
              <strong> Prostředí AI Studia už tuto funkci obsahuje nativně.</strong> Je to bezpečnější, spolehlivější a nevyžaduje to vkládání tvých hesel nebo tokenů přímo do kódu aplikace.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-bold text-base">Aktualizovaný návod (podle tvého screenshotu):</h3>
            
            <ol className="space-y-4 list-decimal list-inside text-white/80 marker:text-white/40">
              <li className="pl-2">
                <strong className="text-white">Nové repozitáře:</strong> Jak je vidět na tvém screenshotu, okno ukazuje <strong>"A new GitHub repository will be created"</strong>. To znamená, že platforma AI Studio primárně vytváří pro každý projekt <strong>nový, čistý repozitář</strong>. Neumožňuje vybrat existující staré repozitáře ze seznamu.
              </li>
              <li className="pl-2">
                <strong className="text-white">Klikni na "Create new repository":</strong> Propojení už máš zjevně hotové (ikona GitHubu svítí). Nyní stačí kliknout na to velké šedé tlačítko <strong>"Create new repository"</strong> dole.
              </li>
              <li className="pl-2">
                <strong className="text-white">Kde to najdeš:</strong> AI Studio vytvoří na tvém GitHub profilu zcela nový repozitář (pravděpodobně s názvem tvého AI Studio projektu). Bude na něj po vytvoření odkaz.
              </li>
              <li className="pl-2">
                <strong className="text-white">Automatická synchronizace:</strong> Text "Changes from Google AI Studio will be synced to GitHub, and vice versa" znamená, že od chvíle, kdy klikneš na to tlačítko, budou se všechny naše další úpravy kódu automaticky nahrávat do tohoto nového repozitáře. Nemusíš už dělat nic dalšího!
              </li>
            </ol>
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <p className="text-white/60 text-xs leading-relaxed">
              <strong>Proč to neprogramujeme do samotné aplikace?</strong> <br />
              Pokud bych do této aplikace přidal backend s GitHub API, musel bys pokaždé generovat tzv. Personal Access Token a aplikace by sama sobě musela číst zdrojové kódy. To by bylo pomalé, nebezpečné a riskoval bys únik tokenu, pokud bys aplikaci někam nahrál na web (jak jsi zmiňoval, že jinde to přístupné nebude). Nativní funkce platformy je přesně to, co hledáš.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-black/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            Rozumím, zavřít
          </button>
        </div>
      </div>
    </div>
  );
};
