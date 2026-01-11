"use client";

import { useState, useCallback, useEffect } from"react";
import { TBSQuestion, TBSAttempt, UserResponse } from"@/lib/data/tbs/types";
import TBSHeader from"./TBSHeader";
import TBSInstructions from"./TBSInstructions";
import SplitView from"./Tools/SplitView";
import ExhibitPanel from"./ExhibitPanel/ExhibitPanel";
import WorkArea from"./WorkArea/WorkArea";
import TBSResults from"./Results/TBSResults";
import Calculator from"./Tools/Calculator";
import ScratchPad from"./Tools/ScratchPad";
import FormulaSheet from"./Tools/FormulaSheet";
import KeyboardShortcutsHelp from"./Tools/KeyboardShortcutsHelp";
import ReviewScreen from"./Navigation/ReviewScreen";
import useUndoRedo from"./Tools/useUndoRedo";
import { useAuthOptional } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";
import { checkAchievements } from"@/lib/gamification/checker";

interface TBSContainerProps {
 tbs: TBSQuestion;
 testletIndex?: number;
 testletTotal?: number;
 onComplete?: (attempt: TBSAttempt) => void;
 onNext?: () => void;
 onPrevious?: () => void;
 isPracticeMode?: boolean;
 onReturnToLibrary?: () => void;
}

type ViewMode ="work"|"review"|"results";

export default function TBSContainer({
 tbs,
 testletIndex = 1,
 testletTotal = 1,
 onComplete,
 onNext,
 onPrevious,
 isPracticeMode = true,
 onReturnToLibrary,
}: TBSContainerProps) {
 // Auth and Supabase for saving notes (optional - works without auth provider for testing)
 const { user } = useAuthOptional();
 const supabase = createClient();

 // Use undo/redo hook for responses
 const {
 state: responses,
 setState: setResponses,
 undo,
 redo,
 canUndo,
 canRedo,
 } = useUndoRedo<Record<string, UserResponse>>({});

 // View mode state
 const [viewMode, setViewMode] = useState<ViewMode>("work");

 // Scratch pad notes state
 const [scratchPadNotes, setScratchPadNotes] = useState("");

 // UI state
 const [currentExhibitId, setCurrentExhibitId] = useState<string | null>(
 tbs.exhibits.length > 0 ? tbs.exhibits[0].id : null
 );
 const [isSubmitted, setIsSubmitted] = useState(false);
 const [isPaused, setIsPaused] = useState(false);
 const [isFlagged, setIsFlagged] = useState(false);
 // Hints toggle - default hidden, only available in practice mode
 const [showHints, setShowHints] = useState(false);
 // Confirmation modal for incomplete submissions
 const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
 // Tool visibility
 const [showCalculator, setShowCalculator] = useState(false);
 const [showScratchPad, setShowScratchPad] = useState(false);
 const [showFormulaSheet, setShowFormulaSheet] = useState(false);
 const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
 // Focus requirement (for jumping from review screen)
 const [focusRequirementId, setFocusRequirementId] = useState<string | null>(null);

 // Check if any requirements have hints
 const hasHints = tbs.requirements.some(req => req.hint && req.hint.trim().length > 0);

 // Time tracking
 const [startTime] = useState<Date>(new Date());
 const [elapsedSeconds, setElapsedSeconds] = useState(0);
 const [timeLimit] = useState(tbs.timeEstimateMinutes * 60); // Convert to seconds

 // Grading results (populated after submission)
 const [gradingResult, setGradingResult] = useState<{
 totalPoints: number;
 earnedPoints: number;
 percentage: number;
 details: Array<{
 requirementId: string;
 pointsEarned: number;
 pointsPossible: number;
 isCorrect: boolean;
 isPartialCredit: boolean;
 feedback: string;
 }>;
 } | null>(null);

 // Timer effect
 useEffect(() => {
 if (isSubmitted || isPaused) return;

 const interval = setInterval(() => {
 setElapsedSeconds((prev) => prev + 1);
 }, 1000);

 return () => clearInterval(interval);
 }, [isSubmitted, isPaused]);

 // Auto-save effect (every 30 seconds)
 useEffect(() => {
 if (isSubmitted) return;

 const saveInterval = setInterval(() => {
 // In a real implementation, this would save to the database
 console.log("Auto-saving TBS responses...", responses);
 }, 30000);

 return () => clearInterval(saveInterval);
 }, [responses, isSubmitted]);

 // Keyboard shortcuts
 useEffect(() => {
 if (isSubmitted) return;

 const handleKeyDown = (e: KeyboardEvent) => {
 // Don't capture shortcuts when typing in an input/textarea
 const target = e.target as HTMLElement;
 const isTyping = target.tagName ==="INPUT"|| target.tagName ==="TEXTAREA"|| target.isContentEditable;

 // Undo: Ctrl+Z
 if ((e.ctrlKey || e.metaKey) && e.key ==="z"&& !e.shiftKey) {
 e.preventDefault();
 if (canUndo) undo();
 return;
 }

 // Redo: Ctrl+Y or Ctrl+Shift+Z
 if ((e.ctrlKey || e.metaKey) && (e.key ==="y"|| (e.key ==="z"&& e.shiftKey))) {
 e.preventDefault();
 if (canRedo) redo();
 return;
 }

 // Don't handle tool shortcuts when typing
 if (isTyping) return;

 // Calculator: Alt+C
 if (e.altKey && e.key ==="c") {
 e.preventDefault();
 setShowCalculator((prev) => !prev);
 return;
 }

 // Scratch Pad: Alt+N (notes)
 if (e.altKey && e.key ==="n") {
 e.preventDefault();
 setShowScratchPad((prev) => !prev);
 return;
 }

 // Formula Sheet: Alt+F
 if (e.altKey && e.key ==="f") {
 e.preventDefault();
 setShowFormulaSheet((prev) => !prev);
 return;
 }

 // Flag for Review: Alt+R
 if (e.altKey && e.key ==="r") {
 e.preventDefault();
 setIsFlagged((prev) => !prev);
 return;
 }

 // Show Hints (practice mode): Alt+H
 if (e.altKey && e.key ==="h"&& isPracticeMode && hasHints) {
 e.preventDefault();
 setShowHints((prev) => !prev);
 return;
 }

 // Review Screen: Alt+V (view review)
 if (e.altKey && e.key ==="v"&& viewMode ==="work") {
 e.preventDefault();
 setViewMode("review");
 return;
 }

 // Return to Question from Review: Escape
 if (e.key ==="Escape"&& viewMode ==="review") {
 e.preventDefault();
 setViewMode("work");
 return;
 }

 // Close modals with Escape
 if (e.key ==="Escape") {
 if (showKeyboardHelp) {
 e.preventDefault();
 setShowKeyboardHelp(false);
 return;
 }
 }

 // Keyboard Help: ? or Shift+/
 if (e.key ==="?"|| (e.shiftKey && e.key ==="/")) {
 e.preventDefault();
 setShowKeyboardHelp((prev) => !prev);
 return;
 }
 };

 window.addEventListener("keydown", handleKeyDown);
 return () => window.removeEventListener("keydown", handleKeyDown);
 }, [isSubmitted, canUndo, canRedo, undo, redo, isPracticeMode, hasHints, viewMode, showKeyboardHelp]);

 // Handle response updates
 const handleResponseChange = useCallback((requirementId: string, response: UserResponse) => {
 setResponses((prev) => ({
 ...prev,
 [requirementId]: response,
 }));
 }, [setResponses]);

 // Calculate completion status
 const getCompletionStatus = useCallback(() => {
 const totalRequirements = tbs.requirements.length;
 const safeResponses = responses || {};
 const answeredRequirements = Object.keys(safeResponses).filter((id) => {
 const response = safeResponses[id];
 if (!response) return false;

 switch (response.type) {
 case"numeric":
 return response.value !== null;
 case"dropdown":
 return response.selectedOptionId !== null;
 case"journal_debit":
 case"journal_credit":
 return response.accountId !== null && response.amount !== null;
 case"text":
 case"citation":
 return response.value.trim().length > 0;
 case"checkbox":
 return response.selectedIds.length > 0;
 case"matching":
 return response.pairs.length > 0;
 default:
 return false;
 }
 }).length;

 return {
 answered: answeredRequirements,
 total: totalRequirements,
 percentage: Math.round((answeredRequirements / totalRequirements) * 100),
 isComplete: answeredRequirements === totalRequirements,
 };
 }, [responses, tbs.requirements]);

 // Grade the TBS
 const gradeTBS = useCallback(() => {
 const safeResponses = responses || {};
 const details = tbs.requirements.map((requirement) => {
 const response = safeResponses[requirement.id];

 if (!response) {
 return {
 requirementId: requirement.id,
 pointsEarned: 0,
 pointsPossible: requirement.points,
 isCorrect: false,
 isPartialCredit: false,
 feedback:"No response provided",
 };
 }

 // Simplified grading logic - in production, this would be more sophisticated
 let isCorrect = false;
 let isPartialCredit = false;
 let pointsEarned = 0;
 let feedback ="";

 const correctAnswer = requirement.correctAnswer;

 // Get explanation to append to all feedback
 const explanation = requirement.explanation ||"";
 const addExplanation = (baseFeedback: string) => {
 return explanation ? `${baseFeedback} ${explanation}` : baseFeedback;
 };

 switch (requirement.type) {
 case"numeric": {
 if (response.type ==="numeric"&& correctAnswer.type ==="numeric") {
 const userValue = response.value;
 const correctValue = correctAnswer.value;
 const tolerance = correctAnswer.tolerance || 0;
 const tolerancePercent = correctAnswer.tolerancePercent || 0;

 if (userValue !== null) {
 const exactMatch = userValue === correctValue;
 const withinAbsolute = Math.abs(userValue - correctValue) <= tolerance;
 const withinPercent = correctValue !== 0
 ? Math.abs((userValue - correctValue) / correctValue) <= tolerancePercent
 : false;

 if (exactMatch || withinAbsolute || withinPercent) {
 isCorrect = true;
 pointsEarned = requirement.points;
 feedback = addExplanation("Correct!");
 } else if (correctAnswer.acceptNegative && userValue === -correctValue) {
 isPartialCredit = true;
 pointsEarned = requirement.points * 0.5;
 feedback = addExplanation("Correct magnitude, but wrong sign.");
 } else {
 feedback = addExplanation(`Incorrect. The correct answer is ${correctValue.toLocaleString()}.`);
 }
 }
 }
 break;
 }

 case"dropdown": {
 if (response.type ==="dropdown"&& correctAnswer.type ==="dropdown") {
 if (response.selectedOptionId === correctAnswer.correctOptionId) {
 isCorrect = true;
 pointsEarned = requirement.points;
 feedback = addExplanation("Correct!");
 } else {
 feedback = addExplanation("Incorrect selection.");
 }
 }
 break;
 }

 case"journal_debit":
 case"journal_credit": {
 if ((response.type ==="journal_debit"|| response.type ==="journal_credit")
 && correctAnswer.type ==="journal") {
 const correctAccount = correctAnswer.accountId || correctAnswer.accountName;
 const correctAmount = correctAnswer.amount;
 const tolerance = correctAnswer.tolerance || 0;

 const accountCorrect = response.accountId === correctAccount;
 const amountCorrect = response.amount !== null
 && Math.abs(response.amount - correctAmount) <= tolerance;

 if (accountCorrect && amountCorrect) {
 isCorrect = true;
 pointsEarned = requirement.points;
 feedback = addExplanation("Correct!");
 } else if (accountCorrect) {
 isPartialCredit = true;
 pointsEarned = requirement.points * 0.5;
 feedback = addExplanation("Correct account, but incorrect amount.");
 } else if (amountCorrect) {
 isPartialCredit = true;
 pointsEarned = requirement.points * 0.25;
 feedback = addExplanation("Correct amount, but wrong account.");
 } else {
 feedback = addExplanation(`Incorrect. Expected ${correctAnswer.accountName}: ${correctAmount.toLocaleString()}.`);
 }
 }
 break;
 }

 case"text": {
 if (response.type ==="text"&& correctAnswer.type ==="text") {
 const userText = response.value.toLowerCase();
 const requiredKeywords = correctAnswer.keywords.map(k => k.toLowerCase());
 const foundKeywords = requiredKeywords.filter(k => userText.includes(k));

 if (foundKeywords.length === requiredKeywords.length) {
 isCorrect = true;
 pointsEarned = requirement.points;
 feedback = addExplanation("Correct! All required elements included.");
 } else if (foundKeywords.length > 0) {
 isPartialCredit = true;
 pointsEarned = requirement.points * (foundKeywords.length / requiredKeywords.length);
 feedback = addExplanation(`Partial credit: ${foundKeywords.length}/${requiredKeywords.length} key points included.`);
 } else {
 feedback = addExplanation("Response missing required key points.");
 }
 }
 break;
 }

 case"citation": {
 if (response.type ==="citation"&& correctAnswer.type ==="citation") {
 const userCitation = response.value.replace(/\s+/g,"").toLowerCase();
 const correctCitation = `${correctAnswer.source}${correctAnswer.topicCode}`.replace(/\s+/g,"").toLowerCase();

 if (userCitation.includes(correctCitation) || correctCitation.includes(userCitation)) {
 isCorrect = true;
 pointsEarned = requirement.points;
 feedback = addExplanation("Correct citation!");
 } else {
 feedback = addExplanation(`Incorrect. The correct citation is ${correctAnswer.source} ${correctAnswer.topicCode}.`);
 }
 }
 break;
 }

 default:
 feedback = addExplanation("Unable to grade this response type.");
 }

 return {
 requirementId: requirement.id,
 pointsEarned,
 pointsPossible: requirement.points,
 isCorrect,
 isPartialCredit,
 feedback,
 };
 });

 const totalPoints = details.reduce((sum, d) => sum + d.pointsPossible, 0);
 const earnedPoints = details.reduce((sum, d) => sum + d.pointsEarned, 0);

 return {
 totalPoints,
 earnedPoints,
 percentage: Math.round((earnedPoints / totalPoints) * 100),
 details,
 };
 }, [responses, tbs.requirements]);

 // Handle submission attempt (may show confirmation dialog)
 const handleSubmitAttempt = useCallback(() => {
 const status = getCompletionStatus();
 if (!status.isComplete) {
 setShowSubmitConfirm(true);
 } else {
 handleSubmitConfirmed();
 }
 }, [getCompletionStatus]);

 // Handle confirmed submission
 const handleSubmitConfirmed = useCallback(async () => {
 setShowSubmitConfirm(false);
 setViewMode("results");
 const result = gradeTBS();
 setGradingResult(result);
 setIsSubmitted(true);

 const attemptId = crypto.randomUUID();
 const completedAt = new Date();

 const attempt: TBSAttempt = {
 id: attemptId,
 userId: user?.id ||"",
 tbsId: tbs.id,
 startedAt: startTime,
 completedAt,
 timeSpentSeconds: elapsedSeconds,
 responses,
 scoreEarned: result.earnedPoints,
 maxScore: result.totalPoints,
 scorePercentage: result.percentage,
 gradingDetails: result.details.map(d => ({
 ...d,
 requirementLabel: tbs.requirements.find(r => r.id === d.requirementId)?.label ||"",
 userAnswer: JSON.stringify((responses || {})[d.requirementId] || null),
 correctAnswer: JSON.stringify(tbs.requirements.find(r => r.id === d.requirementId)?.correctAnswer || null),
 })),
 isComplete: true,
 };

 // Save the TBS attempt to database for progress tracking
 // Note: We store section directly since frontend TBS IDs are strings, not UUIDs
 if (user && supabase) {
 try {
 await supabase.from("tbs_attempts").insert({
 id: attemptId,
 user_id: user.id,
 tbs_id: tbs.id,
 section: tbs.section, // Store section directly for easy querying
 started_at: startTime.toISOString(),
 completed_at: completedAt.toISOString(),
 time_spent_seconds: elapsedSeconds,
 responses,
 score_earned: result.earnedPoints,
 max_score: result.totalPoints,
 score_percentage: result.percentage,
 grading_details: attempt.gradingDetails,
 is_complete: true,
 });
 } catch (error) {
 console.error("Failed to save TBS attempt:", error);
 }
 }

 // Save scratch pad notes to the notes hub if there's content
 if (user && supabase && scratchPadNotes.trim()) {
 try {
 // Use tbs_ prefix to identify simulation notes
 // Use upsert to handle both new and existing notes
 await supabase.from("question_notes").upsert({
 user_id: user.id,
 question_id: `tbs_${tbs.id}`,
 section: tbs.section,
 topic: tbs.topic,
 subtopic: tbs.subtopic || null,
 note: `[Simulation: ${tbs.title}]\n\n${scratchPadNotes.trim()}`,
 is_starred: false,
 confidence: null,
 updated_at: new Date().toISOString(),
 }, {
 onConflict: 'user_id,question_id'
 });
 } catch (error) {
 console.error("Failed to save scratch pad notes:", error);
 }
 }

 // Check TBS achievements
 if (user && supabase) {
 try {
 // Get total completed TBS count for achievement checking
 const { count: tbsCompleteCount } = await supabase
 .from("tbs_attempts")
 .select("id", { count: "exact", head: true })
 .eq("user_id", user.id)
 .eq("is_complete", true);

 await checkAchievements({
 trigger: "tbs_complete",
 userId: user.id,
 section: tbs.section as "FAR" | "AUD" | "REG" | "TCP" | "BAR" | "ISC",
 tbsScore: result.percentage,
 tbsCompleteCount: tbsCompleteCount || 0, // Already includes just-inserted attempt
 tbsType: tbs.tbsType,
 });
 } catch (error) {
 console.error("Failed to check TBS achievements:", error);
 }
 }

 onComplete?.(attempt);
 }, [gradeTBS, tbs, startTime, elapsedSeconds, responses, onComplete, user, supabase, scratchPadNotes]);

 // Handle pause (practice mode only)
 const handlePauseToggle = useCallback(() => {
 if (isPracticeMode) {
 setIsPaused((prev) => !prev);
 }
 }, [isPracticeMode]);

 // Handle flag toggle
 const handleFlagToggle = useCallback(() => {
 setIsFlagged((prev) => !prev);
 }, []);

 // Handle hints toggle
 const handleHintsToggle = useCallback(() => {
 setShowHints((prev) => !prev);
 }, []);

 // Handle calculator toggle
 const handleCalculatorToggle = useCallback(() => {
 setShowCalculator((prev) => !prev);
 }, []);

 // Handle scratch pad toggle
 const handleScratchPadToggle = useCallback(() => {
 setShowScratchPad((prev) => !prev);
 }, []);

 // Handle formula sheet toggle
 const handleFormulaSheetToggle = useCallback(() => {
 setShowFormulaSheet((prev) => !prev);
 }, []);

 // Handle review toggle
 const handleReview = useCallback(() => {
 setViewMode("review");
 }, []);

 // Handle jump to requirement from review screen
 const handleJumpToRequirement = useCallback((requirementId: string) => {
 setFocusRequirementId(requirementId);
 setViewMode("work");
 // Clear focus after a short delay to allow WorkArea to scroll
 setTimeout(() => setFocusRequirementId(null), 100);
 }, []);

 const completionStatus = getCompletionStatus();

 // Determine which content to show
 const renderContent = () => {
 if (viewMode ==="results"&& gradingResult) {
 return (
 <TBSResults
 tbs={tbs}
 responses={responses}
 gradingResult={gradingResult}
 timeSpentSeconds={elapsedSeconds}
 onRetry={() => {
 setIsSubmitted(false);
 setGradingResult(null);
 setResponses({});
 setElapsedSeconds(0);
 setViewMode("work");
 }}
 />
 );
 }

 if (viewMode ==="review") {
 return (
 <ReviewScreen
 tbs={tbs}
 responses={responses}
 isFlagged={isFlagged}
 elapsedSeconds={elapsedSeconds}
 timeLimit={timeLimit}
 onJumpToRequirement={handleJumpToRequirement}
 onSubmit={handleSubmitConfirmed}
 onCancel={() => setViewMode("work")}
 />
 );
 }

 // Default: work view
 return (
 <SplitView
 leftPanel={
 <ExhibitPanel
 exhibits={tbs.exhibits}
 currentExhibitId={currentExhibitId}
 onExhibitChange={setCurrentExhibitId}
 />
 }
 rightPanel={
 <WorkArea
 tbs={tbs}
 responses={responses}
 onResponseChange={handleResponseChange}
 isSubmitted={isSubmitted}
 showHints={showHints}
 focusRequirementId={focusRequirementId}
 />
 }
 defaultLeftWidth={45}
 minLeftWidth={30}
 maxLeftWidth={70}
 />
 );
 };

 return (
 <div className="flex flex-col h-screen bg-gray-50 dark:bg-[var(--background)]">
 {/* Header */}
 <TBSHeader
 section={tbs.section}
 title={tbs.title}
 testletIndex={testletIndex}
 testletTotal={testletTotal}
 elapsedSeconds={elapsedSeconds}
 timeLimit={timeLimit}
 isPaused={isPaused}
 isFlagged={isFlagged}
 completionStatus={completionStatus}
 isPracticeMode={isPracticeMode}
 isSubmitted={isSubmitted}
 showHints={showHints}
 hasHints={hasHints}
 showCalculator={showCalculator}
 showScratchPad={showScratchPad}
 showFormulaSheet={showFormulaSheet}
 canUndo={canUndo}
 canRedo={canRedo}
 onPauseToggle={handlePauseToggle}
 onFlagToggle={handleFlagToggle}
 onHintsToggle={handleHintsToggle}
 onCalculatorToggle={handleCalculatorToggle}
 onScratchPadToggle={handleScratchPadToggle}
 onFormulaSheetToggle={handleFormulaSheetToggle}
 onUndo={undo}
 onRedo={redo}
 onReview={viewMode ==="work"? handleReview : undefined}
 onReturnToQuestion={viewMode ==="review"? () => setViewMode("work") : undefined}
 onKeyboardHelp={() => setShowKeyboardHelp(true)}
 onSubmit={handleSubmitAttempt}
 onPrevious={onPrevious}
 onNext={onNext}
 onReturnToLibrary={onReturnToLibrary}
 />

 {/* Instructions - hide in review mode */}
 {viewMode !=="review"&& (
 <TBSInstructions
 scenarioText={tbs.scenarioText}
 difficulty={tbs.difficulty}
 topic={tbs.topic}
 subtopic={tbs.subtopic}
 isPracticeMode={isPracticeMode}
 />
 )}

 {/* Main content area */}
 {renderContent()}

 {/* Calculator */}
 <Calculator isOpen={showCalculator} onClose={() => setShowCalculator(false)} />

 {/* Scratch Pad */}
 <ScratchPad
 isOpen={showScratchPad}
 onClose={() => setShowScratchPad(false)}
 initialNotes={scratchPadNotes}
 onNotesChange={setScratchPadNotes}
 tbsId={tbs.id}
 tbsTitle={tbs.title}
 tbsSection={tbs.section}
 tbsTopic={tbs.topic}
 tbsSubtopic={tbs.subtopic}
 />

 {/* Formula Sheet */}
 <FormulaSheet
 isOpen={showFormulaSheet}
 onClose={() => setShowFormulaSheet(false)}
 section={tbs.section}
 />

 {/* Keyboard Shortcuts Help */}
 <KeyboardShortcutsHelp
 isOpen={showKeyboardHelp}
 onClose={() => setShowKeyboardHelp(false)}
 isPracticeMode={isPracticeMode}
 />

 {/* Confirmation Modal for Incomplete Submission */}
 {showSubmitConfirm && (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl shadow-xl max-w-md w-full mx-4 overflow-hidden">
 <div className="p-6">
 <div className="flex items-center gap-3 mb-4">
 <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
 <svg className="w-6 h-6 text-amber-600 dark:text-amber-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 </div>
 <h3 className="text-lg font-semibold text-gray-800 dark:text-[var(--foreground)]">
 Incomplete Submission
 </h3>
 </div>
 <p className="text-gray-600 dark:text-[var(--muted)] mb-2">
 You have <span className="font-semibold text-amber-600 dark:text-amber-400">
 {completionStatus.total - completionStatus.answered} unanswered
 </span> question{completionStatus.total - completionStatus.answered !== 1 ? 's' : ''} out of {completionStatus.total}.
 </p>
 <p className="text-sm text-gray-500 dark:text-[var(--muted)]">
 Unanswered questions will be marked as incorrect. Are you sure you want to submit?
 </p>
 </div>
 <div className="px-6 py-4 bg-gray-50 dark:bg-[var(--background)] flex gap-3 justify-end">
 <button
 onClick={() => setShowSubmitConfirm(false)}
 className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-[var(--muted-light)] hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
 >
 Go Back
 </button>
 <button
 onClick={handleSubmitConfirmed}
 className="px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
 >
 Submit Anyway
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
