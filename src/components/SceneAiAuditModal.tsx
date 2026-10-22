import React, { useState, useEffect } from 'react';
import { SavedScene, SceneChannelPatch, AuditSuggestion, AuditReport } from '../types';
import { runSoundEngineerAudit } from '../utils/soundEngineerAudit';
import { exportToMixingStationJson, downloadFile } from '../utils/mixingStationParser';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Check, 
  X, 
  RotateCcw, 
  Sliders, 
  FileText, 
  Download, 
  ShieldAlert, 
  ShieldCheck,
  Lock,
  Key,
  ExternalLink,
  Zap, 
  Radio, 
  Filter, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  RefreshCw,
  Eye,
  CheckCheck
} from 'lucide-react';

interface SceneAiAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene: SavedScene;
  mixerModel?: string;
  onApplyChanges: (updatedChannels: SceneChannelPatch[], auditSummary: string) => void;
  onOpenPdfRider: (channelsToPrint: SceneChannelPatch[]) => void;
}

export const SceneAiAuditModal: React.FC<SceneAiAuditModalProps> = ({
  isOpen,
  onClose,
  scene,
  mixerModel = 'wing',
  onApplyChanges,
  onOpenPdfRider
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [auditReport, setAuditReport] = useState<AuditReport | null>(null);
  const [activeMode, setActiveMode] = useState<'step_by_step' | 'all_cards'>('all_cards');
  const [activeFilter, setActiveFilter] = useState<'all' | 'critical' | 'eq_clean' | 'dynamics' | 'safety' | 'routing'>('all');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [appliedToast, setAppliedToast] = useState<string | null>(null);
  const [auditSource, setAuditSource] = useState<'gemini' | 'rules'>('gemini');
  const [showSecurityInfo, setShowSecurityInfo] = useState<boolean>(false);
  const [customApiKey, setCustomApiKey] = useState<string>(() => {
    try {
      return localStorage.getItem('user_gemini_api_key') || '';
    } catch {
      return '';
    }
  });
  const [savedKeySuccess, setSavedKeySuccess] = useState<boolean>(false);

  // Initialize or re-run audit whenever the modal opens or scene changes
  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;
    setLoading(true);

    const performAudit = async () => {
      try {
        // Try server-side Gemini API proxy first
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (customApiKey.trim()) {
          headers['x-gemini-api-key'] = customApiKey.trim();
        }

        const res = await fetch('/api/audit-scene', {
          method: 'POST',
          headers,
          body: JSON.stringify({ scene, mixerModel })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && Array.isArray(data.suggestions) && isMounted) {
            // Map incoming suggestions to ensure statuses are properly set
            const mappedSuggestions: AuditSuggestion[] = data.suggestions.map((s: any, idx: number) => ({
              id: s.id || `ai-${idx}`,
              chNum: Number(s.chNum),
              channelName: String(s.channelName),
              parameter: s.parameter || 'eq',
              currentValue: String(s.currentValue),
              suggestedValue: String(s.suggestedValue),
              patchField: s.patchField || 'eqModel',
              patchValue: s.patchValue ?? s.patchValueString ?? true,
              reason: String(s.reason),
              category: s.category || 'eq_clean',
              severity: s.severity || 'recommended',
              status: 'pending'
            }));

            setAuditReport({
              overallAssessment: data.overallAssessment || 'Audit dokončen pomocí AI a expertních zvukařských pravidel.',
              healthScore: data.healthScore || 75,
              suggestions: mappedSuggestions
            });
            setAuditSource('gemini');
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('API endpoint unavailable or errored, falling back to embedded expert audio rules:', e);
      }

      // High-precision Sound Engineer Rules Fallback
      if (isMounted) {
        const localReport = runSoundEngineerAudit(scene, mixerModel);
        setAuditReport(localReport);
        setAuditSource('rules');
        setLoading(false);
      }
    };

    performAudit();

    return () => {
      isMounted = false;
    };
  }, [isOpen, scene, mixerModel, customApiKey]);

  const handleSaveCustomKey = (key: string) => {
    setCustomApiKey(key);
    try {
      if (key.trim()) {
        localStorage.setItem('user_gemini_api_key', key.trim());
      } else {
        localStorage.removeItem('user_gemini_api_key');
      }
      setSavedKeySuccess(true);
      setTimeout(() => setSavedKeySuccess(false), 2500);
    } catch (e) {
      console.warn(e);
    }
  };

  if (!isOpen) return null;

  const suggestions = auditReport?.suggestions || [];
  const pendingCount = suggestions.filter(s => s.status === 'pending').length;
  const acceptedCount = suggestions.filter(s => s.status === 'accepted').length;
  const rejectedCount = suggestions.filter(s => s.status === 'rejected').length;

  const criticalPending = suggestions.filter(s => s.severity === 'critical' && s.status === 'pending').length;
  const recommendedPending = suggestions.filter(s => s.severity === 'recommended' && s.status === 'pending').length;

  // Filtered list for cards view
  const filteredSuggestions = suggestions.filter(s => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'critical') return s.severity === 'critical';
    return s.category === activeFilter;
  });

  // Handle single suggestion decision
  const handleDecide = (id: string, status: 'accepted' | 'rejected') => {
    if (!auditReport) return;
    setAuditReport({
      ...auditReport,
      suggestions: auditReport.suggestions.map(s => s.id === id ? { ...s, status } : s)
    });
  };

  // Bulk approve all pending suggestions ("společně schválím")
  const handleBulkApprove = () => {
    if (!auditReport) return;
    setAuditReport({
      ...auditReport,
      suggestions: auditReport.suggestions.map(s => ({ ...s, status: 'accepted' }))
    });
    setAppliedToast('Všechny navržené úpravy byly hromadně schváleny!');
    setTimeout(() => setAppliedToast(null), 3000);
  };

  // Bulk reject all pending suggestions
  const handleBulkReject = () => {
    if (!auditReport) return;
    setAuditReport({
      ...auditReport,
      suggestions: auditReport.suggestions.map(s => ({ ...s, status: 'rejected' }))
    });
  };

  // Reset all to pending
  const handleResetDecisions = () => {
    if (!auditReport) return;
    setAuditReport({
      ...auditReport,
      suggestions: auditReport.suggestions.map(s => ({ ...s, status: 'pending' }))
    });
  };

  // Build the updated channels array based on accepted suggestions
  const getUpdatedChannels = (): SceneChannelPatch[] => {
    const originalChannels = scene.channels || [];
    const acceptedList = suggestions.filter(s => s.status === 'accepted');

    return originalChannels.map(ch => {
      let patched = { ...ch };
      const chSuggestions = acceptedList.filter(s => s.chNum === ch.chNum);

      chSuggestions.forEach(s => {
        if (s.patchField === 'gainDb') patched.gainDb = Number(s.patchValue);
        else if (s.patchField === 'phantom48V') patched.phantom48V = Boolean(s.patchValue);
        else if (s.patchField === 'phaseInvert') patched.phaseInvert = Boolean(s.patchValue);
        else if (s.patchField === 'gateOn') patched.gateOn = Boolean(s.patchValue);
        else if (s.patchField === 'gateModel') patched.gateModel = String(s.patchValue);
        else if (s.patchField === 'eqModel') patched.eqModel = String(s.patchValue);
        else if (s.patchField === 'compOn') patched.compOn = Boolean(s.patchValue);
        else if (s.patchField === 'compModel') patched.compModel = String(s.patchValue);
        else if (s.patchField === 'dcaGroup') patched.dcaGroup = Number(s.patchValue);
        else if (s.patchField === 'faderDb') patched.faderDb = Number(s.patchValue);
      });

      return patched;
    });
  };

  // Final apply to current scene
  const handleCommitToScene = () => {
    const updatedChannels = getUpdatedChannels();
    const summary = `Aplikováno ${acceptedCount} schválených zvukařských úprav ze ${suggestions.length} návrhů.`;
    onApplyChanges(updatedChannels, summary);
    onClose();
  };

  // Export modified scene to Mixing Station
  const handleExportToMixingStation = () => {
    const updatedChannels = getUpdatedChannels();
    const updatedScene: SavedScene = {
      ...scene,
      channels: updatedChannels
    };
    const jsonContent = exportToMixingStationJson(updatedScene, mixerModel);
    downloadFile(jsonContent, `MixingStation_${scene.name.replace(/[^a-zA-Z0-9]/g, '_')}_AUDITED.ms`, 'application/json');
    setAppliedToast('Opravená scéna stažena pro aplikaci Mixing Station!');
    setTimeout(() => setAppliedToast(null), 3500);
  };

  // Export updated rider to PDF
  const handleOpenUpdatedRider = () => {
    const updatedChannels = getUpdatedChannels();
    onOpenPdfRider(updatedChannels);
    onClose();
  };

  // Current step suggestion for wizard mode
  const currentStepSuggestion = filteredSuggestions[currentStepIndex] || filteredSuggestions[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-[#121212] border border-white/15 rounded-2xl max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Top Header */}
        <div className="p-4 sm:p-5 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 text-cyan-400 flex items-center justify-center border border-cyan-500/40 shadow-inner">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-wide">
                  AI Prověrka Scény (Odborná praxe ostatních zvukařů)
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-400/10 text-cyan-400 rounded-full border border-cyan-400/30 font-bold uppercase">
                  Mixing Station • {mixerModel.toUpperCase()}
                </span>
              </div>
              <p className="text-xs text-white/60 mt-0.5">
                Automatická kontrola gain stagingu, bezpečnosti phantomu (+48V), HPF filtrů, dynamiky a DCA sběrnic.
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                  auditSource === 'gemini' 
                    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' 
                    : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${auditSource === 'gemini' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  {auditSource === 'gemini' ? 'Gemini 3.8 Flash (Vercel Proxy - Bezpečné)' : 'Expertní lokální pravidla (Offline)'}
                </span>

                <button
                  type="button"
                  onClick={() => setShowSecurityInfo(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-colors cursor-pointer"
                  title="Jak nastavit Gemini API na Vercelu a tabletu bez prozrazení klíče"
                >
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>Klíč na Vercelu & Tabletu</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {loading ? (
          <div className="p-12 text-center space-y-4">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
            <div className="text-sm font-bold text-white">Analyzuji stopu po stopě...</div>
            <p className="text-xs text-white/50 max-w-md mx-auto">
              Prověřuji gain staging, polaritu virblu, kmitočty ořezu HPF, bezpečnostní rizika 48V a dynamiku podle osvědčené zvukařské praxe...
            </p>
          </div>
        ) : (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 text-xs">
            {/* Health Score & Assessment Banner */}
            <div className="bg-[#181818] p-4 sm:p-5 rounded-2xl border border-white/10 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Score Circular Badge */}
                <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border shadow-inner ${
                  (auditReport?.healthScore || 0) < 60 
                    ? 'bg-red-500/15 border-red-500/40 text-red-400' 
                    : (auditReport?.healthScore || 0) < 85 
                      ? 'bg-amber-500/15 border-amber-500/40 text-amber-400' 
                      : 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                }`}>
                  <span className="text-xl font-extrabold font-mono">
                    {auditReport?.healthScore || 0}%
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-white/50">
                    Kvalita
                  </span>
                </div>

                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">
                      Hodnocení scény: <span className="text-cyan-400 font-mono">{scene.name}</span>
                    </span>
                    <span className="text-[10px] text-white/50 font-mono">
                      ({scene.channels?.length || 0} kanálů)
                    </span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">
                    {auditReport?.overallAssessment}
                  </p>
                </div>
              </div>

              {/* Status Chips */}
              <div className="flex flex-wrap items-center gap-2 self-stretch md:self-auto justify-end">
                {criticalPending > 0 && (
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold">
                    <ShieldAlert className="w-4 h-4 text-red-400" />
                    <span>{criticalPending} kritických rizik</span>
                  </span>
                )}
                <span className="px-3 py-1.5 rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-xs font-bold font-mono">
                  {acceptedCount} schváleno / {suggestions.length} celkem
                </span>
              </div>
            </div>

            {/* Bulk Actions Toolbar */}
            <div className="bg-black/60 p-3 rounded-xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono text-white/50 uppercase font-bold mr-1">Hromadné akce:</span>
                
                {/* 1. Bulk Approve All */}
                <button
                  onClick={handleBulkApprove}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#AEEA00] hover:bg-[#bbf41b] text-black font-extrabold rounded-lg text-xs shadow-md shadow-[#AEEA00]/20 transition-all cursor-pointer"
                  title="Schválit všechny navržené změny najednou"
                >
                  <CheckCheck className="w-4 h-4" />
                  <span>Schválit vše společně ({pendingCount} zbývá)</span>
                </button>

                {/* Reset or bulk reject */}
                {acceptedCount > 0 && (
                  <button
                    onClick={handleResetDecisions}
                    className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg text-xs transition-all cursor-pointer border border-white/10"
                    title="Vrátit rozhodnutí zpět na nerozhodnuto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Resetovat volby</span>
                  </button>
                )}
              </div>

              {/* View Switcher: Step by step VS All cards */}
              <div className="flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-white/10">
                <button
                  onClick={() => setActiveMode('all_cards')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    activeMode === 'all_cards'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Přehled karet ({filteredSuggestions.length})
                </button>
                <button
                  onClick={() => setActiveMode('step_by_step')}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-all cursor-pointer ${
                    activeMode === 'step_by_step'
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Průvodce krok za krokem
                </button>
              </div>
            </div>

            {/* Filter Tabs (when in cards view) */}
            {activeMode === 'all_cards' && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-white/50 uppercase font-bold mr-1 flex items-center gap-1">
                  <Filter className="w-3 h-3" />
                  <span>Filtr:</span>
                </span>
                {[
                  { id: 'all', label: `Všechny návrhy (${suggestions.length})` },
                  { id: 'critical', label: `Kritická rizika (${suggestions.filter(s => s.severity === 'critical').length})` },
                  { id: 'safety', label: 'Bezpečnost & 48V' },
                  { id: 'eq_clean', label: 'HPF Filtry & EQ' },
                  { id: 'dynamics', label: 'Komprese & Gate' },
                  { id: 'routing', label: 'DCA Sběrnice' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      activeFilter === f.id
                        ? 'bg-white text-black font-bold'
                        : 'bg-black/60 text-white/60 hover:text-white border border-white/5'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}

            {/* Toast Notification */}
            {appliedToast && (
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-3 rounded-xl text-emerald-300 font-semibold text-xs flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{appliedToast}</span>
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW MODE 1: STEP-BY-STEP REVIEW WIZARD                                  */}
            {/* ========================================================================= */}
            {activeMode === 'step_by_step' && (
              <div className="bg-[#141414] p-5 sm:p-6 rounded-2xl border border-white/10 space-y-5 shadow-2xl">
                {currentStepSuggestion ? (
                  <>
                    {/* Wizard Step Progress */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/20">
                          Krok {currentStepIndex + 1} z {filteredSuggestions.length}
                        </span>
                        <span className="text-xs text-white/50">
                          Kanál CH {currentStepSuggestion.chNum}: <strong className="text-white">{currentStepSuggestion.channelName}</strong>
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                          disabled={currentStepIndex === 0}
                          className="p-1.5 rounded-lg bg-black text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-white/10 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setCurrentStepIndex(prev => Math.min(filteredSuggestions.length - 1, prev + 1))}
                          disabled={currentStepIndex >= filteredSuggestions.length - 1}
                          className="p-1.5 rounded-lg bg-black text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none border border-white/10 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Step Card Content */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            currentStepSuggestion.severity === 'critical'
                              ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                            {currentStepSuggestion.severity === 'critical' ? 'Kritické riziko' : 'Doporučení'}
                          </span>
                          <span className="text-sm font-bold text-white">
                            Parametr: {currentStepSuggestion.parameter.toUpperCase()}
                          </span>
                        </div>

                        {/* Status Stamp */}
                        {currentStepSuggestion.status === 'accepted' && (
                          <span className="flex items-center gap-1 text-[#AEEA00] font-bold text-xs bg-[#AEEA00]/10 px-2.5 py-1 rounded-lg border border-[#AEEA00]/20">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>SCHVÁLENO</span>
                          </span>
                        )}
                        {currentStepSuggestion.status === 'rejected' && (
                          <span className="flex items-center gap-1 text-white/40 font-bold text-xs bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>PONECHÁNO PŮVODNÍ</span>
                          </span>
                        )}
                      </div>

                      {/* Before VS After Box */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-black/60 p-3.5 rounded-xl border border-red-500/20 space-y-1">
                          <div className="text-[10px] uppercase font-bold text-red-400 font-mono">
                            Původní nastavení (Před):
                          </div>
                          <div className="text-sm font-bold text-white font-mono">
                            {currentStepSuggestion.currentValue}
                          </div>
                        </div>

                        <div className="bg-black/60 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
                          <div className="text-[10px] uppercase font-bold text-emerald-400 font-mono flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            <span>Navržená úprava (Po):</span>
                          </div>
                          <div className="text-sm font-bold text-emerald-300 font-mono">
                            {currentStepSuggestion.suggestedValue}
                          </div>
                        </div>
                      </div>

                      {/* Sound Engineer Rationale Box */}
                      <div className="bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-xl space-y-1.5 text-xs text-white/80">
                        <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                          <Zap className="w-4 h-4 text-cyan-400" />
                          <span>Zkušenost a praxe zvukařů (Proč to změnit):</span>
                        </div>
                        <p className="leading-relaxed">
                          {currentStepSuggestion.reason}
                        </p>
                      </div>

                      {/* Decision buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={() => {
                            handleDecide(currentStepSuggestion.id, 'rejected');
                            if (currentStepIndex < filteredSuggestions.length - 1) {
                              setCurrentStepIndex(prev => prev + 1);
                            }
                          }}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            currentStepSuggestion.status === 'rejected'
                              ? 'bg-white/20 text-white border border-white/30'
                              : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                          }`}
                        >
                          <X className="w-4 h-4" />
                          <span>Ponechat původní (Přeskočit)</span>
                        </button>

                        <button
                          onClick={() => {
                            handleDecide(currentStepSuggestion.id, 'accepted');
                            if (currentStepIndex < filteredSuggestions.length - 1) {
                              setCurrentStepIndex(prev => prev + 1);
                            }
                          }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-xs shadow-md shadow-cyan-500/30 transition-all cursor-pointer"
                        >
                          <Check className="w-4 h-4" />
                          <span>Schválit úpravu a pokračovat ➜</span>
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-white/50">
                    Všechny kroky v tomto filtru byly zkontrolovány.
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* VIEW MODE 2: ALL CARDS LIST (Fast Individual Review & Toggles)           */}
            {/* ========================================================================= */}
            {activeMode === 'all_cards' && (
              <div className="space-y-3">
                {filteredSuggestions.length === 0 ? (
                  <div className="text-center py-10 bg-black/40 rounded-xl border border-white/10 text-white/50">
                    Žádné návrhy neodpovídají zvolenému filtru.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {filteredSuggestions.map(sug => {
                      const isAccepted = sug.status === 'accepted';
                      const isRejected = sug.status === 'rejected';

                      return (
                        <div
                          key={sug.id}
                          className={`p-4 rounded-xl border transition-all text-xs space-y-3 ${
                            isAccepted
                              ? 'bg-emerald-950/20 border-emerald-500/40 ring-1 ring-emerald-500/20'
                              : isRejected
                                ? 'bg-black/30 border-white/5 opacity-60'
                                : sug.severity === 'critical'
                                  ? 'bg-[#191111] border-red-500/30'
                                  : 'bg-[#151515] border-white/10'
                          }`}
                        >
                          {/* Card Header */}
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-black bg-cyan-400 px-2 py-0.5 rounded text-[11px]">
                                CH {sug.chNum}
                              </span>
                              <span className="font-bold text-white text-sm">
                                {sug.channelName}
                              </span>
                              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                sug.severity === 'critical'
                                  ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                                  : 'bg-white/10 text-white/60'
                              }`}>
                                {sug.parameter.toUpperCase()}
                              </span>
                            </div>

                            {/* Decision Buttons */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleDecide(sug.id, 'rejected')}
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                                  isRejected
                                    ? 'bg-white/20 text-white border border-white/40'
                                    : 'bg-black/50 text-white/50 hover:text-white border border-white/10'
                                }`}
                              >
                                <X className="w-3.5 h-3.5" />
                                <span>Ponechat</span>
                              </button>

                              <button
                                onClick={() => handleDecide(sug.id, 'accepted')}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                                  isAccepted
                                    ? 'bg-[#AEEA00] text-black shadow-md shadow-[#AEEA00]/30'
                                    : 'bg-cyan-400 hover:bg-cyan-300 text-black'
                                }`}
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>{isAccepted ? 'Schváleno' : 'Schválit'}</span>
                              </button>
                            </div>
                          </div>

                          {/* Diff Before VS After */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                            <div className="bg-black/50 p-2.5 rounded-lg border border-white/5">
                              <span className="text-white/40 uppercase block text-[9px]">Původní hodnota:</span>
                              <span className="text-red-400 font-semibold">{sug.currentValue}</span>
                            </div>
                            <div className="bg-black/50 p-2.5 rounded-lg border border-emerald-500/20">
                              <span className="text-emerald-400/70 uppercase block text-[9px]">Doporučená úprava:</span>
                              <span className="text-emerald-300 font-bold">{sug.suggestedValue}</span>
                            </div>
                          </div>

                          {/* Reason */}
                          <div className="text-[11px] text-white/70 leading-relaxed bg-black/30 p-2.5 rounded-lg border border-white/5">
                            <strong className="text-cyan-400 mr-1.5">Zkušenost z praxe:</strong>
                            {sug.reason}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-black border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-white/50">Stav úprav:</span>
            <span className="text-[#AEEA00] font-bold">{acceptedCount} schváleno</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50">{rejectedCount} ponecháno</span>
            <span className="text-white/30">•</span>
            <span className="text-cyan-400">{pendingCount} čeká</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Export directly to Mixing Station */}
            <button
              onClick={handleExportToMixingStation}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-black hover:bg-white/10 text-cyan-300 border border-cyan-500/40 rounded-xl text-xs font-semibold transition-all cursor-pointer"
              title="Stáhnout jako offline scénu pro aplikaci Mixing Station (.ms)"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Exportovat .ms scénu</span>
            </button>

            {/* Export Rider in PDF */}
            <button
              onClick={handleOpenUpdatedRider}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white rounded-xl text-xs font-bold shadow-md shadow-red-900/30 transition-all cursor-pointer"
              title="Generovat technický Stage Rider PDF s aplikovanými úpravami"
            >
              <FileText className="w-4 h-4" />
              <span>Exportovat Rider v PDF</span>
            </button>

            {/* Commit to Scene */}
            <button
              onClick={handleCommitToScene}
              className="flex items-center gap-2 px-5 py-2 bg-[#AEEA00] hover:bg-[#bcf218] text-black font-extrabold rounded-xl text-xs shadow-lg shadow-[#AEEA00]/25 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Aplikovat změny do scény</span>
            </button>
          </div>
        </div>
      </div>

      {/* Security & Vercel Setup Modal */}
      {showSecurityInfo && (
        <div className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#161616] border border-cyan-500/30 rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl text-left">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    Zabezpečení Gemini AI pro Vercel a Váš tablet
                  </h4>
                  <p className="text-[11px] text-white/50">
                    Jak provozovat AI audit na tabletu bez veřejného vystavení Google API klíče
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSecurityInfo(false)}
                className="text-white/40 hover:text-white p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-white/80 leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl space-y-1.5">
                <div className="font-bold text-emerald-300 flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-emerald-400" />
                  Zlatý standard: Server-Side Vercel Environment Variables
                </div>
                <p className="text-emerald-100/80 text-[11px]">
                  Klíč se <strong>nikdy nesmí kompilovat do klientského kódu na tabletu</strong>. V repozitáři je vytvořená serverless proxy funkce <code>/api/audit-scene.ts</code>, která běží bezpečně přímo na serverech Vercelu.
                </p>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-white uppercase text-[11px] tracking-wider text-cyan-400">
                  Postup nastavení ve 3 jednoduchých krocích:
                </div>
                <ol className="list-decimal list-inside space-y-2 pl-1 text-[11px]">
                  <li>
                    Otevřete svůj projekt na <strong>vercel.com</strong> ➔ <strong>Settings</strong> ➔ <strong>Environment Variables</strong>.
                  </li>
                  <li>
                    Přidejte proměnnou:
                    <div className="my-1.5 bg-black p-2.5 rounded-lg border border-white/10 font-mono text-cyan-300 flex items-center justify-between">
                      <span>Název: <strong>GEMINI_API_KEY</strong></span>
                      <span className="text-white/40">Hodnota: AIzaSy...</span>
                    </div>
                    Zaškrtněte prostředí: <strong>Production</strong>, <strong>Preview</strong> i <strong>Development</strong>.
                  </li>
                  <li>
                    Klikněte na <strong>Save</strong> a v záložce <strong>Deployments</strong> u posledního deploymentu zvolte <strong>Redeploy</strong>.
                  </li>
                </ol>
              </div>

              <div className="bg-black/50 border border-white/10 p-3.5 rounded-xl space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5 text-[11px]">
                  <Key className="w-4 h-4 text-amber-400" />
                  Volitelný testovací klíč pouze pro toto zařízení (Tablet / Offline)
                </div>
                <p className="text-white/60 text-[11px]">
                  Pokud chcete funkci vyzkoušet ihned na tomto tabletu bez nastavování Vercelu, můžete klíč zadat sem. Uloží se <strong>pouze do paměti tohoto tabletu (localStorage)</strong> a nikdy se neodešle na GitHub ani do veřejného repozitáře:
                </p>
                <div className="flex gap-2 items-center">
                  <input
                    type="password"
                    value={customApiKey}
                    onChange={(e) => setCustomApiKey(e.target.value)}
                    placeholder="Vložte Google API klíč (AIzaSy...)"
                    className="flex-1 bg-black border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white font-mono placeholder:text-white/30 focus:border-cyan-400 outline-none"
                  />
                  <button
                    onClick={() => handleSaveCustomKey(customApiKey)}
                    className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs rounded-lg transition-all cursor-pointer"
                  >
                    Uložit
                  </button>
                  {customApiKey && (
                    <button
                      onClick={() => handleSaveCustomKey('')}
                      className="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 text-white/70 text-xs rounded-lg transition-all cursor-pointer"
                      title="Smazat klíč z tabletu"
                    >
                      Smazat
                    </button>
                  )}
                </div>
                {savedKeySuccess && (
                  <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3" /> Nastavení úspěšně uloženo!
                  </div>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowSecurityInfo(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Rozumím, pokračovat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
