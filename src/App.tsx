import React, { useState } from 'react';
import { NavigationTab } from './types';
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
import { INITIAL_SCENES } from './data/sampleScenes';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('manual');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAppendixOpen, setIsAppendixOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isGitHubModalOpen, setIsGitHubModalOpen] = useState(false);
  const [appendixInitialSection, setAppendixInitialSection] = useState<'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge'>('bridge');
  const [selectedManualChapter, setSelectedManualChapter] = useState<string | undefined>(undefined);
  const [selectedManualSub, setSelectedManualSub] = useState<string | undefined>(undefined);

  // Read favorites count
  const [favoritesCount, setFavoritesCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('wing_user_scenes');
      const list = saved ? JSON.parse(saved) : INITIAL_SCENES;
      return list.filter((s: { favorite: boolean }) => s.favorite).length;
    } catch {
      return 2;
    }
  });

  const [selectedPresetId, setSelectedPresetId] = useState<string>('ww-flute-concert');

  const handleSelectManualSection = (chapterId: string, subsectionId: string) => {
    setSelectedManualChapter(chapterId);
    setSelectedManualSub(subsectionId);
    setActiveTab('manual');
  };

  const handleSelectPresetFromSearch = (presetId: string) => {
    if (presetId) {
      setSelectedPresetId(presetId);
    }
    setActiveTab('presets');
  };

  const handleNavigateToPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    setActiveTab('presets');
  };

  const handleOpenAppendix = (section: 'presets' | 'scenes' | 'diagnostics' | 'hardware' | 'bridge' = 'bridge') => {
    setAppendixInitialSection(section);
    setIsAppendixOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-gray-200 flex flex-col font-sans selection:bg-white/20 selection:text-white">
      {/* Console Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAppendix={handleOpenAppendix}
        onOpenInstall={() => setIsInstallModalOpen(true)}
        favoritesCount={favoritesCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {activeTab === 'manual' && (
          <ManualViewer
            initialChapterId={selectedManualChapter}
            initialSubsectionId={selectedManualSub}
            onNavigateToPresets={() => setActiveTab('presets')}
          />
        )}

        {activeTab === 'presets' && (
          <PresetsLab
            initialPresetId={selectedPresetId}
            onOpenAppendix={() => handleOpenAppendix('presets')}
          />
        )}

        {activeTab === 'scenes' && (
          <ScenesManager
            onOpenAppendix={() => handleOpenAppendix('scenes')}
            onNavigateToPreset={handleNavigateToPreset}
          />
        )}

        {activeTab === 'diagnostics' && (
          <DiagnosticsPanel onOpenAppendix={() => handleOpenAppendix('diagnostics')} />
        )}

        {activeTab === 'hardware' && (
          <CompactConsoleOverview onOpenAppendix={() => handleOpenAppendix('hardware')} />
        )}

        {activeTab === 'microphones' && (
          <MicrophonesLocker />
        )}
      </main>

      {/* Global Search Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectManualSection={handleSelectManualSection}
        onSelectPreset={handleSelectPresetFromSearch}
        onSelectTab={setActiveTab}
      />

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

      {/* Footer Status & Copyright */}
      <footer className="bg-[#0A0A0A] border-t border-white/10 py-4 px-6 text-center text-xs text-white/40 font-mono flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#AEEA00] inline-block shadow-sm shadow-[#AEEA00]/50" />
            <span className="text-white/70">Behringer WING Compact Interactive Hub • Firmware 3.1 Pro Engine</span>
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
          24 Midas PRO Preamps • 40 Stereo Channels • 16 Stereo Buses • 8 Matrices • 4 Mains
        </div>
      </footer>
    </div>
  );
}

