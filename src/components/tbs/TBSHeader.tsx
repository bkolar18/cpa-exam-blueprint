"use client";

import { SectionCode } from"@/lib/data/practice-questions/types";

interface TBSHeaderProps {
 section: SectionCode;
 title: string;
 testletIndex: number;
 testletTotal: number;
 elapsedSeconds: number;
 timeLimit: number;
 isPaused: boolean;
 isFlagged: boolean;
 completionStatus: {
 answered: number;
 total: number;
 percentage: number;
 isComplete: boolean;
 };
 isPracticeMode: boolean;
 isSubmitted: boolean;
 showHints: boolean;
 hasHints: boolean;
 showCalculator?: boolean;
 showScratchPad?: boolean;
 showFormulaSheet?: boolean;
 canUndo?: boolean;
 canRedo?: boolean;
 onPauseToggle: () => void;
 onFlagToggle: () => void;
 onHintsToggle: () => void;
 onCalculatorToggle?: () => void;
 onScratchPadToggle?: () => void;
 onFormulaSheetToggle?: () => void;
 onUndo?: () => void;
 onRedo?: () => void;
 onReview?: () => void;
 onReturnToQuestion?: () => void;
 onKeyboardHelp?: () => void;
 onSubmit: () => void;
 onPrevious?: () => void;
 onNext?: () => void;
 onReturnToLibrary?: () => void;
}

function formatTime(seconds: number): string {
 const mins = Math.floor(seconds / 60);
 const secs = seconds % 60;
 return `${mins}:${secs.toString().padStart(2,"0")}`;
}

function getTimeColor(elapsed: number, limit: number): string {
 const remaining = limit - elapsed;
 const percentRemaining = (remaining / limit) * 100;

 if (remaining <= 0) return"text-red-600 dark:text-red-400 animate-pulse";
 if (percentRemaining <= 8) return"text-red-600 dark:text-red-400"; // ~5 min for 60 min limit
 if (percentRemaining <= 25) return"text-yellow-600 dark:text-yellow-400"; // ~15 min
 return"text-green-600 dark:text-green-400";
}

export default function TBSHeader({
 section,
 title,
 testletIndex,
 testletTotal,
 elapsedSeconds,
 timeLimit,
 isPaused,
 isFlagged,
 completionStatus,
 isPracticeMode,
 isSubmitted,
 showHints,
 hasHints,
 showCalculator,
 showScratchPad,
 showFormulaSheet,
 canUndo,
 canRedo,
 onPauseToggle,
 onFlagToggle,
 onHintsToggle,
 onCalculatorToggle,
 onScratchPadToggle,
 onFormulaSheetToggle,
 onUndo,
 onRedo,
 onReview,
 onReturnToQuestion,
 onKeyboardHelp,
 onSubmit,
 onPrevious,
 onNext,
 onReturnToLibrary,
}: TBSHeaderProps) {
 const remainingSeconds = Math.max(0, timeLimit - elapsedSeconds);
 const timeColor = getTimeColor(elapsedSeconds, timeLimit);

 return (
 <header className="bg-white dark:bg-[var(--card)] border-b border-gray-200 flex-shrink-0">
 {/* Mobile: Two-row compact layout */}
 <div className="md:hidden">
   {/* Row 1: Navigation and Timer */}
   <div className="flex items-center justify-between px-2 py-1.5 border-b border-gray-100 dark:border-[var(--border)]">
     <div className="flex items-center gap-2">
       {/* Return to Library Button */}
       {onReturnToLibrary && (
         <button
           onClick={onReturnToLibrary}
           className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-[var(--muted-light)]"
           title="Return to Simulation Library"
         >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
           </svg>
         </button>
       )}

       {/* Section Badge */}
       <span className="px-2 py-0.5 bg-[var(--primary)] text-white text-xs font-semibold rounded">
         {section}
       </span>

       {/* TBS Index */}
       <span className="text-xs font-medium text-gray-600 dark:text-[var(--muted-light)]">
         {testletIndex}/{testletTotal}
       </span>
     </div>

     {/* Timer and Pause - Only show in practice mode */}
     {isPracticeMode && (
     <div className="flex items-center gap-2">
       {isPaused ? (
         <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400 px-2 py-0.5 bg-yellow-50 dark:bg-yellow-900/20 rounded">
           PAUSED
         </span>
       ) : (
         <span className={`text-sm font-mono font-semibold ${timeColor}`}>
           {formatTime(remainingSeconds)}
         </span>
       )}

       {isPracticeMode && !isSubmitted && (
         <button
           onClick={onPauseToggle}
           className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
           title={isPaused ? "Resume" : "Pause"}
         >
           {isPaused ? (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
             </svg>
           ) : (
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
             </svg>
           )}
         </button>
       )}
     </div>
     )}
   </div>

   {/* Row 2: Progress, Tools, and Actions */}
   <div className="flex items-center justify-between px-2 py-1.5">
     {/* Progress */}
     <div className="flex items-center gap-2">
       <div className="w-16 h-1.5 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
         <div
           className={`h-full transition-all duration-300 ${
             completionStatus.isComplete ? "bg-green-500" : "bg-[var(--primary)]"
           }`}
           style={{ width: `${completionStatus.percentage}%` }}
         />
       </div>
       <span className="text-xs text-gray-600 dark:text-[var(--muted)]">
         {completionStatus.answered}/{completionStatus.total}
       </span>
     </div>

     {/* Tools and Actions */}
     <div className="flex items-center gap-1">
       {/* Calculator */}
       {onCalculatorToggle && !isSubmitted && (
         <button
           onClick={onCalculatorToggle}
           className={`p-1.5 rounded-lg transition-colors ${
             showCalculator
               ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
               : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
           }`}
           title="Calculator"
         >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
           </svg>
         </button>
       )}

       {/* Scratch Pad */}
       {onScratchPadToggle && !isSubmitted && (
         <button
           onClick={onScratchPadToggle}
           className={`p-1.5 rounded-lg transition-colors ${
             showScratchPad
               ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
               : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
           }`}
           title="Scratch Pad"
         >
           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
           </svg>
         </button>
       )}

       {/* Flag */}
       <button
         onClick={onFlagToggle}
         disabled={isSubmitted}
         className={`p-1.5 rounded-lg transition-colors disabled:opacity-50 ${
           isFlagged
             ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
             : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
         }`}
         title="Flag for review"
       >
         <svg className="w-5 h-5" fill={isFlagged ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
         </svg>
       </button>

       {/* Divider */}
       <div className="h-5 w-px bg-gray-200 dark:bg-[var(--card-hover)] mx-1"/>

       {/* Submit Button */}
       <button
         onClick={onSubmit}
         disabled={isSubmitted}
         className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
           isSubmitted
             ? "bg-gray-200 dark:bg-[var(--card-hover)] text-gray-500 dark:text-[var(--muted)] cursor-not-allowed"
             : completionStatus.isComplete
             ? "bg-green-600 hover:bg-green-700 text-white"
             : "bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
         }`}
       >
         {isSubmitted ? "Submitted" : "Submit"}
       </button>
     </div>
   </div>
 </div>

 {/* Desktop: Original single-row layout */}
 <div className="hidden md:flex items-center justify-between px-3 py-1">
 {/* Left: Section and Navigation */}
 <div className="flex items-center space-x-3">
 {/* Return to Library Button */}
 {onReturnToLibrary && (
 <button
 onClick={onReturnToLibrary}
 className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-600 dark:text-[var(--muted-light)] hover:text-gray-800 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
 title="Return to Simulation Library"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
 </svg>
 <span>Library</span>
 </button>
 )}

 {/* Section Badge */}
 <span className="px-2 py-0.5 bg-[var(--primary)] text-white text-xs font-semibold rounded">
 {section}
 </span>

 {/* TBS Navigation */}
 <div className="flex items-center space-x-1">
 {onPrevious && testletIndex > 1 && (
 <button
 onClick={onPrevious}
 disabled={isSubmitted}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
 title="Previous TBS"
 >
 <svg className="w-4 h-4 text-gray-600 dark:text-[var(--muted-light)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M15 19l-7-7 7-7"/>
 </svg>
 </button>
 )}

 <span className="text-xs font-medium text-gray-600 dark:text-[var(--muted-light)]">
 TBS {testletIndex}/{testletTotal}
 </span>

 {onNext && testletIndex < testletTotal && (
 <button
 onClick={onNext}
 disabled={isSubmitted}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
 title="Next TBS"
 >
 <svg className="w-4 h-4 text-gray-600 dark:text-[var(--muted-light)]"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 5l7 7-7 7"/>
 </svg>
 </button>
 )}
 </div>

 {/* Title */}
 <h1 className="text-sm font-semibold text-gray-800 dark:text-[var(--foreground)] truncate max-w-md">
 {title}
 </h1>
 </div>

 {/* Center: Progress */}
 <div className="flex items-center space-x-3">
 {/* Completion Progress */}
 <div className="flex items-center space-x-1.5">
 <div className="w-24 h-1.5 bg-gray-200 dark:bg-[var(--card-hover)] rounded-full overflow-hidden">
 <div
 className={`h-full transition-all duration-300 ${
 completionStatus.isComplete ?"bg-green-500":"bg-[var(--primary)]"
 }`}
 style={{ width: `${completionStatus.percentage}%` }}
 />
 </div>
 <span className="text-xs text-gray-600 dark:text-[var(--muted)]">
 {completionStatus.answered}/{completionStatus.total}
 </span>
 </div>

 {/* Hints Toggle (Practice Mode Only, only if hints exist) */}
 {isPracticeMode && !isSubmitted && hasHints && (
 <button
 onClick={onHintsToggle}
 className={`p-1 rounded transition-colors ${
 showHints
 ?"bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
 :"hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 }`}
 title={showHints ?"Hide hints":"Show hints"}
 >
 <svg className="w-4 h-4"fill={showHints ?"currentColor":"none"} stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
 </svg>
 </button>
 )}

 {/* Undo/Redo Buttons */}
 {!isSubmitted && (onUndo || onRedo) && (
 <div className="flex items-center">
 {onUndo && (
 <button
 onClick={onUndo}
 disabled={!canUndo}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)] disabled:opacity-30 disabled:cursor-not-allowed"
 title="Undo (Ctrl+Z)"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/>
 </svg>
 </button>
 )}
 {onRedo && (
 <button
 onClick={onRedo}
 disabled={!canRedo}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)] disabled:opacity-30 disabled:cursor-not-allowed"
 title="Redo (Ctrl+Y)"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"/>
 </svg>
 </button>
 )}
 </div>
 )}

 {/* Calculator Button */}
 {onCalculatorToggle && !isSubmitted && (
 <button
 onClick={onCalculatorToggle}
 className={`p-1 rounded transition-colors ${
 showCalculator
 ?"bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
 :"hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 }`}
 title={showCalculator ?"Hide calculator (Alt+C)":"Show calculator (Alt+C)"}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
 </svg>
 </button>
 )}

 {/* Formula Sheet Button */}
 {onFormulaSheetToggle && !isSubmitted && (
 <button
 onClick={onFormulaSheetToggle}
 className={`p-1 rounded transition-colors ${
 showFormulaSheet
 ?"bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
 :"hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 }`}
 title={showFormulaSheet ?"Hide formulas (Alt+F)":"Show formulas (Alt+F)"}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8"/>
 </svg>
 </button>
 )}

 {/* Scratch Pad Button */}
 {onScratchPadToggle && !isSubmitted && (
 <button
 onClick={onScratchPadToggle}
 className={`p-1 rounded transition-colors ${
 showScratchPad
 ?"bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
 :"hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 }`}
 title={showScratchPad ?"Hide scratch pad (Alt+N)":"Show scratch pad (Alt+N)"}
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
 </svg>
 </button>
 )}

 {/* Flag Button */}
 <button
 onClick={onFlagToggle}
 disabled={isSubmitted}
 className={`p-1 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
 isFlagged
 ?"bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
 :"hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 }`}
 title={isFlagged ?"Unflag for review (Alt+R)":"Flag for review (Alt+R)"}
 >
 <svg className="w-4 h-4"fill={isFlagged ?"currentColor":"none"} stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
 </svg>
 </button>

 {/* Help Button */}
 {onKeyboardHelp && (
 <button
 onClick={onKeyboardHelp}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)] transition-colors"
 title="Keyboard shortcuts (?)"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 </button>
 )}
 </div>

 {/* Right: Timer and Actions - Timer only in practice mode */}
 <div className="flex items-center space-x-3">
 {/* Timer - Hide during exam simulation since exam has its own timer */}
 {isPracticeMode && (
 <div className="flex items-center space-x-1.5">
 {isPaused ? (
 <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">
 PAUSED
 </span>
 ) : (
 <>
 <svg className={`w-4 h-4 ${timeColor}`} fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 <span className={`text-sm font-mono font-semibold ${timeColor}`}>
 {formatTime(remainingSeconds)}
 </span>
 </>
 )}

 {/* Pause Button */}
 {!isSubmitted && (
 <button
 onClick={onPauseToggle}
 className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-[var(--muted)]"
 title={isPaused ?"Resume":"Pause"}
 >
 {isPaused ? (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 ) : (
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 )}
 </button>
 )}
 </div>
 )}

 {/* Divider */}
 <div className="h-5 w-px bg-gray-200 dark:bg-[var(--card-hover)]"/>

 {/* Review Button (shows in work mode) */}
 {onReview && !isSubmitted && (
 <button
 onClick={onReview}
 className="px-3 py-1 text-sm rounded font-medium transition-colors bg-gray-100 dark:bg-[var(--card-hover)] text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-600"
 >
 Review
 </button>
 )}

 {/* Return to Question Button (shows in review mode) */}
 {onReturnToQuestion && !isSubmitted && (
 <button
 onClick={onReturnToQuestion}
 className="px-3 py-1 text-sm rounded font-medium transition-colors bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800/30 flex items-center gap-1"
 >
 <svg className="w-4 h-4"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12"/>
 </svg>
 Return to Question
 </button>
 )}

 {/* Submit Button */}
 <button
 onClick={onSubmit}
 disabled={isSubmitted}
 className={`px-3 py-1 text-sm rounded font-medium transition-colors ${
 isSubmitted
 ?"bg-gray-200 dark:bg-[var(--card-hover)] text-gray-500 dark:text-[var(--muted)] cursor-not-allowed"
 : completionStatus.isComplete
 ?"bg-green-600 hover:bg-green-700 text-white"
 :"bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
 }`}
 >
 {isSubmitted ?"Submitted":"Submit"}
 </button>
 </div>
 </div>

 {/* Time Warning Banner - shown on both mobile and desktop */}
 {!isSubmitted && remainingSeconds <= 60 && remainingSeconds > 0 && (
 <div className="mx-2 md:mx-3 my-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
 <p className="text-xs md:text-sm text-red-700 dark:text-red-300 font-medium text-center">
 Less than 1 minute remaining! Submit your answers now.
 </p>
 </div>
 )}

 {/* Time Expired Banner */}
 {!isSubmitted && remainingSeconds <= 0 && (
 <div className="mx-2 md:mx-3 my-1 px-3 py-2 bg-red-600 rounded-lg">
 <p className="text-xs md:text-sm text-white font-medium text-center">
 Time has expired. Please submit your answers.
 </p>
 </div>
 )}
 </header>
 );
}
