import React from 'react';
import { X, Download, ExternalLink, FileText, BookOpen } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  mixerName: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  mixerName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#121418] border border-white/15 rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 sm:px-6 bg-[#181a20] border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-white/70">
                  {mixerName}
                </span>
                <span className="text-xs text-emerald-400 font-mono hidden sm:inline flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Originální dokumentace
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white truncate">
                {title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-all"
              title="Otevřít PDF v novém okně prohlížeče"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nové okno</span>
            </a>

            <a
              href={pdfUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 hover:text-blue-200 text-xs font-medium transition-all"
              title="Stáhnout PDF do zařízení"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stáhnout</span>
            </a>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-white/60 hover:text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PDF Frame */}
        <div className="flex-1 w-full bg-[#0a0a0c] relative">
          <iframe
            src={`${pdfUrl}#toolbar=1&navpanes=1`}
            className="w-full h-full border-none"
            title={title}
          />
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-[#121418] border-t border-white/10 text-xs text-white/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Mixings Manual • Integrovaný PDF prohlížeč</span>
          </div>
          <span className="font-mono text-[11px] text-white/30 hidden sm:inline">
            {pdfUrl}
          </span>
        </div>
      </div>
    </div>
  );
};
