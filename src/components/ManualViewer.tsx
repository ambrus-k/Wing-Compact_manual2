import React, { useState, useEffect, useRef } from 'react';
import { ManualChapter, ManualSubsection } from '../types';
import { MANUAL_CHAPTERS } from '../data/manualData';
import { 
  BookOpen, 
  Search, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Bookmark, 
  BookmarkCheck, 
  Info, 
  HelpCircle, 
  Sparkles, 
  Sliders, 
  ArrowUpRight,
  Check,
  CheckCircle2,
  Cpu,
  Layers,
  Radio,
  Cable,
  Zap,
  Disc,
  RefreshCw,
  RotateCcw,
  BarChart2,
  LayoutGrid,
  X,
  Maximize2
} from 'lucide-react';
import { FunctionDiagram } from './FunctionDiagram';

interface ManualViewerProps {
  onNavigateToPresets?: (category?: string) => void;
  initialChapterId?: string;
  initialSubsectionId?: string;
}

export const ManualViewer: React.FC<ManualViewerProps> = ({
  onNavigateToPresets,
  initialChapterId,
  initialSubsectionId
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    initialChapterId || MANUAL_CHAPTERS[0].id
  );
  const [selectedSubsectionId, setSelectedSubsectionId] = useState<string>(
    initialSubsectionId || MANUAL_CHAPTERS[0].subsections[0].id
  );
  const [manualSearch, setManualSearch] = useState<string>('');
  const contentRef = useRef<HTMLDivElement>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('wing_manual_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Synchronize when initialChapterId or initialSubsectionId changes from global search or links
  useEffect(() => {
    if (initialChapterId) {
      setSelectedChapterId(initialChapterId);
    }
    if (initialSubsectionId) {
      setSelectedSubsectionId(initialSubsectionId);
    } else if (initialChapterId) {
      const foundChapter = MANUAL_CHAPTERS.find(c => c.id === initialChapterId);
      if (foundChapter && foundChapter.subsections.length > 0) {
        setSelectedSubsectionId(foundChapter.subsections[0].id);
      }
    }
  }, [initialChapterId, initialSubsectionId]);

  // Scroll reader to top whenever subsection or chapter changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [selectedChapterId, selectedSubsectionId]);

  // 1. Flatten all manual chapters and subsections into a continuous sequence
  const allManualSteps = MANUAL_CHAPTERS.flatMap(ch => 
    ch.subsections.map((sub, sIdx) => ({
      chapterId: ch.id,
      chapterNumber: ch.number,
      chapterTitle: ch.title,
      subsectionId: sub.id,
      subsectionTitle: sub.title,
      badge: sub.badge,
      stepInChapter: sIdx + 1,
      totalInChapter: ch.subsections.length,
      chapter: ch,
      subsection: sub
    }))
  );

  // 2. Resolve active step safely and consistently
  let currentStepIndex = allManualSteps.findIndex(s => s.subsectionId === selectedSubsectionId);
  if (currentStepIndex === -1 && selectedChapterId) {
    currentStepIndex = allManualSteps.findIndex(s => s.chapterId === selectedChapterId);
  }
  if (currentStepIndex === -1) {
    currentStepIndex = 0;
  }

  const activeStep = allManualSteps[currentStepIndex];
  const currentChapter = activeStep.chapter;
  const currentSubsection = activeStep.subsection;

  const prevStep = currentStepIndex > 0 ? allManualSteps[currentStepIndex - 1] : null;
  const nextStep = currentStepIndex < allManualSteps.length - 1 ? allManualSteps[currentStepIndex + 1] : null;
  const isLastManualStep = currentStepIndex === allManualSteps.length - 1;

  const handleStepNavigation = (chapterId: string, subsectionId: string) => {
    setSelectedChapterId(chapterId);
    setSelectedSubsectionId(subsectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Keyboard navigation support (ArrowLeft / ArrowRight) when reading
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (nextStep) {
          e.preventDefault();
          handleStepNavigation(nextStep.chapterId, nextStep.subsectionId);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (prevStep) {
          e.preventDefault();
          handleStepNavigation(prevStep.chapterId, prevStep.subsectionId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, prevStep]);

  const getChapterIcon = (iconName: string) => {
    switch (iconName) {
      case 'Radio': return <Radio className="w-4 h-4" />;
      case 'Cable': return <Cable className="w-4 h-4" />;
      case 'Sliders': return <Sliders className="w-4 h-4" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Headphones': return <HelpCircle className="w-4 h-4" />;
      case 'Disc': return <Disc className="w-4 h-4" />;
      case 'RefreshCw': return <RefreshCw className="w-4 h-4" />;
      case 'Zap': return <Zap className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'BarChart2': return <BarChart2 className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const toggleBookmark = (id: string) => {
    const next = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(item => item !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(next);
    try {
      localStorage.setItem('wing_manual_bookmarks', JSON.stringify(next));
    } catch (e) {
      console.warn(e);
    }
  };

  const [previewImageUrl, setPreviewImageUrl] = useState<{ url: string; caption: string; alt: string } | null>(null);

  // Filter chapters/subsections based on manualSearch
  const q = manualSearch.toLowerCase().trim();
  const filteredChapters = MANUAL_CHAPTERS.map(ch => {
    const matchingSubs = ch.subsections.filter(sub => 
      !q ||
      sub.title.toLowerCase().includes(q) ||
      sub.summary.toLowerCase().includes(q) ||
      sub.content.toLowerCase().includes(q) ||
      ch.title.toLowerCase().includes(q)
    );
    return {
      ...ch,
      matchingSubs,
      isMatch: matchingSubs.length > 0
    };
  }).filter(ch => ch.isMatch);

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start relative">
      {/* Chapter & Subsection Navigation Drawer */}
      <div className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0 bg-[#121212] border border-white/10 rounded-2xl p-4 shadow-xl space-y-3 md:sticky md:top-[80px] md:max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
        {/* Header & Quick Filter */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-white/80" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Obsah manuálu WING
            </h3>
          </div>
          <span className="text-xs font-mono text-white/50 bg-white/5 px-2.5 py-1 rounded border border-white/5">
            {MANUAL_CHAPTERS.length} kapitol
          </span>
        </div>

        {/* Live Filter Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-white/40" />
          <input
            type="text"
            value={manualSearch}
            onChange={(e) => setManualSearch(e.target.value)}
            placeholder="Hledat funkci v manuálu..."
            className="w-full pl-10 pr-8 py-2.5 bg-black border border-white/10 rounded-xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-white/40"
          />
          {manualSearch && (
            <button
              onClick={() => setManualSearch('')}
              className="absolute right-3 top-2.5 text-white/40 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Chapter List */}
        <div className="space-y-1.5">
          {filteredChapters.map(ch => {
            const isChapterSelected = ch.id === currentChapter.id || Boolean(q);
            const displaySubs = q ? ch.matchingSubs : ch.subsections;

            return (
              <div key={ch.id} className="rounded-xl overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedChapterId(ch.id);
                    if (ch.subsections.length > 0) {
                      setSelectedSubsectionId(ch.subsections[0].id);
                    }
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-sm sm:text-base font-semibold transition-all cursor-pointer ${
                    ch.id === currentChapter.id
                      ? 'bg-[#1e1e1e] text-white border border-white/30 shadow-md'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                      ch.id === currentChapter.id ? 'bg-white/20 text-white shadow-sm' : 'bg-white/10 text-white/70 border border-white/5'
                    }`}>
                      {ch.number}
                    </span>
                    <span className="line-clamp-1">{ch.title}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform shrink-0 ${isChapterSelected ? 'rotate-90 text-white/80' : 'text-white/30'}`} />
                </button>

                {/* Subsections when chapter is active or searched */}
                {isChapterSelected && (
                  <div className="pl-4 pr-2 py-2 space-y-1 bg-[#0A0A0A] border-l border-white/10 ml-4 my-1.5 rounded-r-lg">
                    {displaySubs.map(sub => {
                      const isSubSelected = sub.id === currentSubsection.id;
                      const isBookmarked = bookmarkedIds.includes(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => {
                            setSelectedChapterId(ch.id);
                            setSelectedSubsectionId(sub.id);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm transition-all text-left cursor-pointer ${
                            isSubSelected
                              ? 'bg-white/10 text-white font-bold border border-white/20 shadow-sm'
                              : 'text-white/70 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          <span className="line-clamp-1">{sub.title}</span>
                          {isBookmarked && (
                            <BookmarkCheck className="w-4 h-4 text-white/80 shrink-0 ml-1.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Reader */}
      <div ref={contentRef} className="flex-1 min-w-0 space-y-4">
        <div className="bg-[#121212] border border-white/10 rounded-2xl p-5 sm:p-8 shadow-xl space-y-6">
          {/* Breadcrumb & Bookmark Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 text-sm">
            <div className="flex items-center gap-2 text-white/50 font-mono text-xs sm:text-sm">
              <span className="text-white/80 font-bold">Kapitola {currentChapter.number}</span>
              <span>/</span>
              <span className="text-white font-medium">{currentSubsection.title}</span>
            </div>

            <button
              onClick={() => toggleBookmark(currentSubsection.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                bookmarkedIds.includes(currentSubsection.id)
                  ? 'bg-white/10 text-white border border-white/25 shadow-sm'
                  : 'bg-white/5 text-white/70 hover:text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              {bookmarkedIds.includes(currentSubsection.id) ? (
                <>
                  <BookmarkCheck className="w-4 h-4 text-white" />
                  <span>Uloženo</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 text-white/50" />
                  <span>Záložka</span>
                </>
              )}
            </button>
          </div>

          {/* Section Title & Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {currentSubsection.title}
              </h2>
              {currentSubsection.badge && (
                <span className="px-3 py-1 bg-white/5 text-white/80 border border-white/15 text-xs font-mono font-bold uppercase rounded-full">
                  {currentSubsection.badge}
                </span>
              )}
            </div>
            
            {/* Prominent Next/Prev Navigation Header */}
            <div className="flex items-center gap-2 shrink-0">
              {prevStep ? (
                <button
                  onClick={() => handleStepNavigation(prevStep.chapterId, prevStep.subsectionId)}
                  className="flex items-center justify-center p-2 rounded-lg bg-[#1a1a1a] hover:bg-white/10 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer group"
                  title={`Předchozí: ${prevStep.subsectionTitle}`}
                >
                  <ArrowLeft className="w-5 h-5 text-white/60 group-hover:-translate-x-0.5 transition-transform" />
                </button>
              ) : (
                <div className="w-[42px] h-[42px]" />
              )}
              {nextStep && (
                <button
                  onClick={() => handleStepNavigation(nextStep.chapterId, nextStep.subsectionId)}
                  className="flex items-center justify-center p-2 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-100 hover:text-white border border-cyan-800/50 transition-all cursor-pointer group"
                  title={`Další: ${nextStep.subsectionTitle}`}
                >
                  <span className="text-sm font-semibold pr-1 hidden sm:inline">Další kapitola</span>
                  <ArrowRight className="w-5 h-5 text-cyan-400 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl text-sm sm:text-base text-gray-200 leading-relaxed">
            <strong className="text-white font-semibold block mb-1 uppercase tracking-wider text-xs">Rychlé shrnutí:</strong>
            {currentSubsection.summary}
          </div>

          {/* WING Compact Callout Box if specific */}
          {currentSubsection.wingCompactSpecific && (
            <div className="bg-cyan-950/20 border border-cyan-500/30 p-4 rounded-xl flex items-start gap-3 text-sm sm:text-base text-cyan-100 shadow-md">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-cyan-300 block mb-1 font-bold uppercase tracking-wider text-xs">
                  Specifikum pro model WING Compact:
                </strong>
                {currentSubsection.wingCompactSpecific}
              </div>
            </div>
          )}

          {/* Interactive Visual Function Diagram if attached */}
          {currentSubsection.functionDiagram && (
            <FunctionDiagram
              type={currentSubsection.functionDiagram.type}
              title={currentSubsection.functionDiagram.title}
              subtitle={currentSubsection.functionDiagram.subtitle}
            />
          )}

          {/* Photographic / Technical Reference Image from Manual PDF Collection */}
          {currentSubsection.image && (
            <div className="bg-[#141414] border border-white/10 rounded-2xl overflow-hidden shadow-xl my-5 group">
              <div className="relative aspect-[16/9] w-full bg-black overflow-hidden cursor-pointer"
                onClick={() => setPreviewImageUrl(currentSubsection.image || null)}
              >
                <img
                  src={currentSubsection.image.url}
                  alt={currentSubsection.image.alt}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
                
                {/* Badge Overlay */}
                {currentSubsection.image.badge && (
                  <span className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur border border-white/20 rounded-full text-xs font-mono text-white/90 font-bold">
                    {currentSubsection.image.badge}
                  </span>
                )}

                {/* Click to Enlarge Icon */}
                <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-black/80 backdrop-blur rounded-lg border border-white/20 text-xs text-white flex items-center gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4 text-white/80" />
                  <span>Zvětšit náhled</span>
                </div>
              </div>

              {/* Caption Bar */}
              <div className="p-3 bg-[#181818] border-t border-white/10 flex items-center justify-between text-xs sm:text-sm text-white/70">
                <span className="font-mono text-white/90">📷 {currentSubsection.image.caption}</span>
                <span className="text-xs font-mono text-white/40 hidden sm:inline">WING Compact</span>
              </div>
            </div>
          )}

          {/* Main Formatted Content */}
          <div className="text-base sm:text-lg text-gray-200 leading-relaxed space-y-4 font-sans whitespace-pre-line">
            {currentSubsection.content}
          </div>

          {/* Key Points Checklist */}
          {currentSubsection.keyPoints && currentSubsection.keyPoints.length > 0 && (
            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl p-5 space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Check className="w-5 h-5 text-[#AEEA00]" />
                <span>Klíčové zásady a pravidla</span>
              </h4>
              <ul className="space-y-2.5 text-sm sm:text-base text-gray-200">
                {currentSubsection.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-[#AEEA00] font-bold mt-0.5">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Interactive Structured Tables if present */}
          {currentSubsection.tables && currentSubsection.tables.map((tbl, tIdx) => (
            <div key={tIdx} className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">
                {tbl.title}
              </h4>
              <div className="overflow-x-auto border border-white/10 rounded-xl">
                <table className="w-full text-left text-sm sm:text-base border-collapse font-sans">
                  <thead>
                    <tr className="bg-[#181818] text-white/90 font-mono text-xs sm:text-sm border-b border-white/10">
                      {tbl.headers.map((h, hIdx) => (
                        <th key={hIdx} className="p-3.5 font-bold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-xs sm:text-sm">
                    {tbl.rows.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5 transition-colors">
                        {r.map((cell, cIdx) => (
                          <td key={cIdx} className={`p-3.5 ${cIdx === 0 ? 'text-white font-semibold' : cIdx === 1 ? 'text-cyan-400' : 'text-gray-300'}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}

          {/* Clean Integrated In-Page Bottom Navigation */}
          <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-4">
            {/* Left: Previous step */}
            {prevStep ? (
              <button
                onClick={() => handleStepNavigation(prevStep.chapterId, prevStep.subsectionId)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-all cursor-pointer group"
                title={`Předchozí: ${prevStep.subsectionTitle}`}
              >
                <ArrowLeft className="w-4 h-4 text-white/60 group-hover:-translate-x-0.5 transition-transform" />
                <span>Předchozí</span>
              </button>
            ) : (
              <div />
            )}

            {/* Center: Clean Progress Counter */}
            <div className="text-xs font-mono text-white/40">
              {currentStepIndex + 1} / {allManualSteps.length}
            </div>

            {/* Right: Next step */}
            {nextStep ? (
              <button
                onClick={() => handleStepNavigation(nextStep.chapterId, nextStep.subsectionId)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-all cursor-pointer group"
                title={`Další: ${nextStep.subsectionTitle}`}
              >
                <span>Další</span>
                <ArrowRight className="w-4 h-4 text-white/60 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <button
                onClick={() => handleStepNavigation(allManualSteps[0].chapterId, allManualSteps[0].subsectionId)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs sm:text-sm font-medium border border-white/10 transition-all cursor-pointer"
                title="Znovu od začátku"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Znovu od začátku</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* High-Resolution Image Lightbox Modal */}
      {previewImageUrl && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div 
            className="relative max-w-5xl w-full bg-[#121212] border border-white/20 rounded-2xl overflow-hidden shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-sm font-bold font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/80" />
                {previewImageUrl.caption}
              </span>
              <button
                onClick={() => setPreviewImageUrl(null)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-[16/9] w-full bg-black rounded-xl overflow-hidden border border-white/10 flex items-center justify-center">
              <img
                src={previewImageUrl.url}
                alt={previewImageUrl.alt}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-white/50 px-1">
              <span>Originální technická reference z manuálu WING Compact</span>
              <span className="font-mono text-white/60">ESC nebo kliknutí mimo pro zavření</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

