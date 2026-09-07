import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor, Apple, CheckCircle2, WifiOff, Sparkles } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface InstallPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallPromptModal: React.FC<InstallPromptModalProps> = ({ isOpen, onClose }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [activePlatform, setActivePlatform] = useState<'chrome' | 'android' | 'ios'>('chrome');

  useEffect(() => {
    // Check if already in standalone / PWA mode
    if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as unknown as { standalone?: boolean }).standalone) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setDeferredPrompt(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#141416] border border-white/15 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Download className="w-6 h-6 text-black" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white">Instalace Webové Aplikace</h2>
              <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] font-mono font-bold rounded uppercase">
                PWA
              </span>
            </div>
            <p className="text-xs text-white/50">
              Behringer WING Compact Pro Guide & Sound Lab
            </p>
          </div>
        </div>

        {/* Benefits Overview */}
        <div className="grid grid-cols-2 gap-2.5 my-4">
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-start gap-2.5 text-xs text-white/80">
            <WifiOff className="w-4 h-4 text-[#AEEA00] shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-[11px]">100% Offline režim</strong>
              Manuál i lab fungují bez internetu přímo na koncertě.
            </div>
          </div>
          <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-start gap-2.5 text-xs text-white/80">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block text-[11px]">Rychlý přístup</strong>
              Samostatné okno bez adresního řádku prohlížeče.
            </div>
          </div>
        </div>

        {/* Direct One-Click Install if available */}
        {deferredPrompt && !isInstalled && (
          <div className="mb-5 p-4 bg-cyan-500/10 border border-cyan-500/40 rounded-xl text-center">
            <p className="text-xs text-white/80 mb-3">
              Váš prohlížeč podporuje přímou instalaci na jedno kliknutí:
            </p>
            <button
              onClick={handleInstallClick}
              className="w-full py-2.5 px-4 bg-cyan-400 hover:bg-cyan-300 text-black font-bold rounded-xl text-sm transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Instalovat do zařízení nyní</span>
            </button>
          </div>
        )}

        {isInstalled && (
          <div className="mb-5 p-3.5 bg-[#AEEA00]/10 border border-[#AEEA00]/40 rounded-xl text-center flex items-center justify-center gap-2 text-xs text-[#AEEA00] font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Aplikace je již nainstalována ve vašem zařízení!</span>
          </div>
        )}

        {/* Step-by-step instructions tab */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold text-white/60 border-b border-white/10 pb-2">
            <span>Návod pro jednotlivé platformy:</span>
            <div className="flex items-center gap-1 bg-black p-0.5 rounded-lg border border-white/10">
              <button
                onClick={() => setActivePlatform('chrome')}
                className={`px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 transition-all ${
                  activePlatform === 'chrome' ? 'bg-white/15 text-white font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                <Monitor className="w-3 h-3" />
                <span>PC / Mac</span>
              </button>
              <button
                onClick={() => setActivePlatform('android')}
                className={`px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 transition-all ${
                  activePlatform === 'android' ? 'bg-white/15 text-white font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                <Smartphone className="w-3 h-3" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setActivePlatform('ios')}
                className={`px-2.5 py-1 rounded-md text-[11px] flex items-center gap-1 transition-all ${
                  activePlatform === 'ios' ? 'bg-white/15 text-white font-bold' : 'text-white/40 hover:text-white'
                }`}
              >
                <Apple className="w-3 h-3" />
                <span>iOS (iPhone/iPad)</span>
              </button>
            </div>
          </div>

          {activePlatform === 'chrome' && (
            <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-xs space-y-2 text-white/70">
              <p className="font-semibold text-white">Google Chrome, Microsoft Edge, Brave:</p>
              <ol className="list-decimal list-inside space-y-1 text-white/70 text-[11px]">
                <li>V adresním řádku prohlížeče vpravo nahoře klikněte na ikonu <strong>Instalovat (Install)</strong> <span className="text-cyan-400">⭳</span>.</li>
                <li>Případně otevřete nabídku se třemi tečkami <strong>⋮ $\to$ Uložit a sdílet $\to$ Nainstalovat stránku jako aplikaci</strong>.</li>
                <li>Aplikace se přidá do vašich aplikací na ploše i v nabídce Start.</li>
              </ol>
            </div>
          )}

          {activePlatform === 'android' && (
            <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-xs space-y-2 text-white/70">
              <p className="font-semibold text-white">Chrome / Samsung Internet na Androidu:</p>
              <ol className="list-decimal list-inside space-y-1 text-white/70 text-[11px]">
                <li>Klepněte na nabídku se třemi tečkami <strong>⋮</strong> v pravém horním rohu.</li>
                <li>Zvolte možnost <strong>Nainstalovat aplikaci</strong> nebo <strong>Přidat na plochu</strong>.</li>
                <li>Potvrďte tlačítkem <strong>Instalovat</strong>. Na ploše se vytvoří plnohodnotná ikona pultu WING.</li>
              </ol>
            </div>
          )}

          {activePlatform === 'ios' && (
            <div className="p-3 bg-black/50 border border-white/10 rounded-xl text-xs space-y-2 text-white/70">
              <p className="font-semibold text-white">Safari na iPhone / iPad:</p>
              <ol className="list-decimal list-inside space-y-1 text-white/70 text-[11px]">
                <li>Otevřete stránku v prohlížeči <strong>Safari</strong>.</li>
                <li>Klepněte na tlačítko <strong>Sdílet</strong> (čtvereček se šipkou nahoru $\uparrow$ dole na liště).</li>
                <li>Sjeďte dolů a klepněte na <strong>Přidat na plochu (Add to Home Screen)</strong>.</li>
                <li>V pravém horním rohu klepněte na <strong>Přidat</strong>. Ikona WING Guide se zobrazí mezi vašimi aplikacemi.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
          <span>Automatická aktualizace cache Service Workerem</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Zavřít
          </button>
        </div>
      </div>
    </div>
  );
};
