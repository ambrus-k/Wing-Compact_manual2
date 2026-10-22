import React, { useState } from 'react';
import { NavigationTab, MixerId } from './types';
import { MIXERS } from './data/mixersConfig';
import { Header } from './components/Header';
import { ManualViewer } from './components/ManualViewer';
import { PresetsLab } from './components/PresetsLab';
import { ScenesManager } from './components/ScenesManager';
import { DiagnosticsPanel } from './components/DiagnosticsPanel';
import { CompactConsoleOverview } from './components/CompactConsoleOverview';
import { MicrophonesLocker } from './components/MicrophonesLocker';
import { SearchModal } from './components/SearchModal';
import { AppendixModal } from './components/AppendixModal';
import { InstallPromptModal } from './components/InstallPromptModal';
import { GitHubExportModal } from './components/GitHubExportModal';
import { PdfViewerModal } from './components/PdfViewerModal';
import { INITIAL_SCENES } from './data/sampleScenes';

interface NavigationState {
  mixerId: MixerId;
  tab: NavigationTab;
  manualChapter?: string;
  manualSub?: string;
  presetId?: string;
}

export default function App() {
  const [history, setHistory] = useState<NavigationState[]>(() => {
    try {
      const saved = localStorage.getItem('mixings_active_mixer') as MixerId;
      const initialMixer: MixerId = (saved && (saved === 'wing' || saved === 'x32' || saved === 'ui24')) ? saved : 'wing';
      return [{
        mixerId: initialMixer,
        tab: 'manual',
        manualChapter: undefined,
        manualSub: undefined,
        presetId: 'ww-flute-concert'
      }];
    } catch {
      return [{
        mixerId: 'wing',
        tab: 'manual',
        manualChapter: undefined,
        manualSub: undefined,
        presetId: 'ww-flute-concert'
      }];
    }
  });

  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const currentState = history[historyIndex] || history[0];

  const activeMixerId = currentState.mixerId;
  const activeTab = currentState.tab;
  const selectedManualChapter = currentState.manualChapter;
  const selectedManualSub = currentState.manualSub;
  const selectedPresetId = currentState.presetId || 'ww-flute-concert';

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppendixOpen, setIsAppendixOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [isPdfOpen, setIsPdfOpen] = useState(false);
  const [appendixInitialSection, setAppendixInitialSection] = useState<'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge'>('bridge');

  const currentMixer = MIXERS[activeMixerId] || MIXERS.wing;

  const pushNavigation = (nextPartial: Partial<NavigationState>) => {
    const current = history[historyIndex] || history[0];
    const next: NavigationState = {
      ...current,
      ...nextPartial
    };

    if (
      next.mixerId === current.mixerId &&
      next.tab === current.tab &&
      next.manualChapter === current.manualChapter &&
      next.manualSub === current.manualSub &&
      next.presetId === current.presetId
    ) {
      return;
    }

    if (next.mixerId !== current.mixerId) {
      try {
        localStorage.setItem('mixings_active_mixer', next.mixerId);
      } catch (e) {
        console.warn(e);
      }
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(next);
    if (newHistory.length > 50) {
      newHistory.shift();
    }
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const canGoBack = historyIndex > 0;
  const canGoForward = historyIndex < history.length - 1;

  const handleGoBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      const target = history[prevIdx];
      if (target.mixerId !== activeMixerId) {
        try {
          localStorage.setItem('mixings_active_mixer', target.mixerId);
        } catch (e) {
          console.warn(e);
        }
      }
      setHistoryIndex(prevIdx);
    }
  };

  const handleGoForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1;
      const target = history[nextIdx];
      if (target.mixerId !== activeMixerId) {
        try {
          localStorage.setItem('mixings_active_mixer', target.mixerId);
        } catch (e) {
          console.warn(e);
        }
      }
      setHistoryIndex(nextIdx);
    }
  };

  // Keyboard shortcut listener: Alt + ArrowLeft (Zpět) / Alt + ArrowRight (Vpřed)
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handleGoBack();
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handleGoForward();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  const handleMixerChange = (mixerId: MixerId) => {
    pushNavigation({
      mixerId,
      manualChapter: undefined,
      manualSub: undefined
    });
  };

  const handleTabChange = (tab: NavigationTab) => {
    pushNavigation({ tab });
  };

  // Read favorites count
  const [favoritesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wing_user_scenes');
      const list = saved ? JSON.parse(saved) : INITIAL_SCENES;
      return list.filter((s: { favorite: boolean }) => s.favorite).length;
    } catch {
      return 2;
    }
  });

  const handleSelectManualSection = (chapterId: string, subsectionId: string) => {
    pushNavigation({
      tab: 'manual',
      manualChapter: chapterId,
      manualSub: subsectionId
    });
  };

  const handleSelectPresetFromSearch = (presetId: string) => {
    pushNavigation({
      tab: 'presets',
      presetId
    });
  };

  const handleNavigateToPreset = (presetId: string) => {
    pushNavigation({
      tab: 'presets',
      presetId
    });
  };

  const handleOpenAppendix = (section: 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge' = 'bridge') => {
    setAppendixInitialSection(section);
    setIsAppendixOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Console Top Header with Navigation History Arrows */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        activeMixerId={activeMixerId}
        setActiveMixerId={handleMixerChange}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAppendix={handleOpenAppendix}
        onOpenInstall={() => setIsInstallModalOpen(true)}
        onOpenPdf={() => setIsPdfOpen(true)}
        favoritesCount={favoritesCount}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        onGoBack={handleGoBack}
        onGoForward={handleGoForward}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'manual' && (
          <ManualViewer
            activeMixerId={activeMixerId}
            initialChapterId={selectedManualChapter}
            initialSubsectionId={selectedManualSub}
            onNavigateToPresets={() => pushNavigation({ tab: 'presets' })}
            onOpenPdf={() => setIsPdfOpen(true)}
          />
        )}

        {activeTab === 'presets' && (
          <PresetsLab
            initialPresetId={selectedPresetId}
            activeMixerId={activeMixerId}
            onOpenAppendix={() => handleOpenAppendix('presets')}
          />
        )}

        {activeTab === 'scenes' && (
          <ScenesManager
            mixerModel={activeMixerId}
            onOpenAppendix={() => handleOpenAppendix('scenes')}
            onNavigateToPreset={handleNavigateToPreset}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsPanel 
            activeMixerId={activeMixerId}
            onOpenAppendix={() => handleOpenAppendix('diagnostics')} 
          />
        )}

        {activeTab === 'hardware' && (
          <CompactConsoleOverview 
            activeMixerId={activeMixerId}
            onOpenAppendix={() => handleOpenAppendix('hardware')} 
          />
        )}

        {activeTab === 'microphones' && (
          <MicrophonesLocker />
        )}
      </main>

      {/* Global Search Palette Modal (Searches across all 3 consoles) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        activeMixerId={activeMixerId}
        onSelectMixer={handleMixerChange}
        onSelectManualSection={handleSelectManualSection}
        onSelectPreset={handleSelectPresetFromSearch}
        onSelectTab={handleTabChange}
      />

      {/* Official PDF Document Viewer Modal */}
      {currentMixer.pdfUrl && (
        <PdfViewerModal
          isOpen={isPdfOpen}
          onClose={() => setIsPdfOpen(false)}
          pdfUrl={currentMixer.pdfUrl}
          title={currentMixer.pdfTitle || `${currentMixer.fullName} Manuál (PDF)`}
          mixerName={currentMixer.name}
        />
      )}

      {/* Dedicated Appendix & Real Mixer Bridge Guide Modal */}
      <AppendixModal
        isOpen={isAppendixOpen}
        onClose={() => setIsAppendixOpen(false)}
        initialSection={appendixInitialSection}
        onNavigateToManual={handleSelectManualSection}
      />

      {/* PWA Install & Offline Setup Modal */}
      <InstallPromptModal
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
      />

      {/* GitHub Export Info Modal */}
      <GitHubExportModal
        isOpen={isGitHubModalOpen}
        onClose={() => setIsGitHubModalOpen(false)}
      />

      {/* Footer Status & Mixer Specs */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 py-4 px-6 text-center text-xs text-white/40 font-mono flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50" />
            <span className="text-white/80 font-bold">{currentMixer.fullName}</span>
            <span className="text-white/50">• {currentMixer.firmware}</span>
          </div>
          <span className="hidden sm:inline text-white/20">|</span>
          <button 
            onClick={() => setIsGitHubModalOpen(true)}
            className="text-white/40 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.37 4.37 0 0 0 9 18.13V22"></path></svg>
            Export to GitHub
          </button>
        </div>
        <div className="text-[11px] text-white/40">
          {currentMixer.specs.preamps} • {currentMixer.specs.outputs} • {currentMixer.specs.buses}
        </div>
      </footer>
    </div>
  );
}
