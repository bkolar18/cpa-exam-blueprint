"use client";

import { useState, useEffect, useRef } from"react";
import { useParams, useRouter } from"next/navigation";
import Link from"next/link";
import { useAuth } from"@/components/auth/AuthProvider";
import { createClient } from"@/lib/supabase/client";
import { useStudySessionAchievements, usePracticeSessionAchievements } from"@/components/gamification/AchievementProvider";
import QuizQuestion from"@/components/practice/QuizQuestion";
import QuizResults from"@/components/practice/QuizResults";
import {
 getQuestionsBySection,
 getRandomQuestions,
 getTopicsForSection,
 getSubtopicsForSection,
 getQuestionById,
 sectionHasQuestions,
 questionSets,
 PracticeQuestion,
 SectionCode,
} from"@/lib/data/practice-questions";
import {
 selectAdaptiveQuestions,
 buildHistoryFromAttempts,
 buildTopicPerformance,
 getSelectionInsights,
 type UserQuestionHistory,
} from"@/lib/adaptive/question-selector";
import type { SectionCode as DBSectionCode } from"@/lib/supabase/types";

interface QuizResult {
 question: PracticeQuestion;
 selectedAnswer: 'A' | 'B' | 'C' | 'D';
 isCorrect: boolean;
}

interface SavedSession {
 section: string;
 questionIds: string[];
 currentIndex: number;
 results: Array<{
 questionId: string;
 selectedAnswer: 'A' | 'B' | 'C' | 'D';
 isCorrect: boolean;
 }>;
 startTime: string;
 savedAt: string;
}

type QuizState = 'setup' | 'quiz' | 'results';

const SAVED_SESSION_KEY = 'cpa-practice-session';

// Get local date in YYYY-MM-DD format (avoids timezone issues with toISOString)
function getLocalDateString(date: Date = new Date()): string {
 const year = date.getFullYear();
 const month = String(date.getMonth() + 1).padStart(2, '0');
 const day = String(date.getDate()).padStart(2, '0');
 return `${year}-${month}-${day}`;
}

const sectionNames: Record<string, string> = {
 far: 'Financial Accounting & Reporting',
 aud: 'Auditing & Attestation',
 reg: 'Regulation',
 tcp: 'Tax Compliance & Planning',
 bar: 'Business Analysis & Reporting',
 isc: 'Information Systems & Controls',
};

export default function SectionPracticePage() {
 const params = useParams();
 const router = useRouter();
 const { user, refreshProfile } = useAuth();
 const supabase = createClient();
 const { onStudySessionLogged } = useStudySessionAchievements();
 const { onPracticeSessionCompleted } = usePracticeSessionAchievements();

 const sectionParam = params.section as string;
 const section = sectionParam.toUpperCase() as SectionCode;
 const sectionName = sectionNames[sectionParam.toLowerCase()] || section;

 const [quizState, setQuizState] = useState<QuizState>('setup');
 const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
 const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
 const [results, setResults] = useState<QuizResult[]>([]);
 const [studySessionLogged, setStudySessionLogged] = useState(false);
 const [savedSession, setSavedSession] = useState<SavedSession | null>(null);
 const [showExitConfirm, setShowExitConfirm] = useState(false);

 // Adaptive question selection
 const [userHistory, setUserHistory] = useState<Map<string, UserQuestionHistory>>(new Map());
 const [historyLoaded, setHistoryLoaded] = useState(false);
 const [selectionInsights, setSelectionInsights] = useState<{
   reviewingMissed: number;
   newQuestions: number;
   lowCoverageTopics: string[];
   spacedReview: number;
 } | null>(null);

 // Quiz timing
 const quizStartTime = useRef<Date | null>(null);

 // Fetch user's practice history for adaptive selection
 useEffect(() => {
 const fetchHistory = async () => {
   if (!user || !supabase) {
     setHistoryLoaded(true);
     return;
   }

   try {
     const { data: attempts } = await supabase
       .from('practice_attempts')
       .select('question_id, is_correct, created_at')
       .eq('user_id', user.id)
       .eq('section', section);

     if (attempts && attempts.length > 0) {
       const history = buildHistoryFromAttempts(attempts);
       setUserHistory(history);
     }
   } catch (error) {
     console.error('Failed to fetch practice history:', error);
   }

   setHistoryLoaded(true);
 };

 fetchHistory();
 }, [user, supabase, section]);

 // Check for saved session on mount
 useEffect(() => {
 const saved = localStorage.getItem(SAVED_SESSION_KEY);
 if (saved) {
 try {
 const parsed: SavedSession = JSON.parse(saved);
 // Only show if it's for the current section
 if (parsed.section === section) {
 setSavedSession(parsed);
 }
 } catch {
 localStorage.removeItem(SAVED_SESSION_KEY);
 }
 }
 }, [section]);

 // Save session to localStorage
 const saveSession = () => {
 const session: SavedSession = {
 section,
 questionIds: questions.map(q => q.id),
 currentIndex: currentQuestionIndex,
 results: results.map(r => ({
 questionId: r.question.id,
 selectedAnswer: r.selectedAnswer,
 isCorrect: r.isCorrect,
 })),
 startTime: quizStartTime.current?.toISOString() || new Date().toISOString(),
 savedAt: new Date().toISOString(),
 };
 localStorage.setItem(SAVED_SESSION_KEY, JSON.stringify(session));
 };

 // Resume saved session
 const resumeSession = () => {
 if (!savedSession) return;

 // Reconstruct questions from IDs
 const resumedQuestions = savedSession.questionIds
 .map(id => getQuestionById(id))
 .filter((q): q is PracticeQuestion => q !== undefined);

 if (resumedQuestions.length === 0) {
 localStorage.removeItem(SAVED_SESSION_KEY);
 setSavedSession(null);
 return;
 }

 // Reconstruct results
 const resumedResults: QuizResult[] = savedSession.results
 .map(r => {
 const question = resumedQuestions.find(q => q.id === r.questionId);
 if (!question) return null;
 return {
 question,
 selectedAnswer: r.selectedAnswer,
 isCorrect: r.isCorrect,
 };
 })
 .filter((r): r is QuizResult => r !== null);

 setQuestions(resumedQuestions);
 setCurrentQuestionIndex(savedSession.currentIndex);
 setResults(resumedResults);
 quizStartTime.current = new Date(savedSession.startTime);
 setQuizState('quiz');
 setSavedSession(null);
 };

 // Discard saved session
 const discardSession = () => {
 localStorage.removeItem(SAVED_SESSION_KEY);
 setSavedSession(null);
 };

 // Clear saved session (when quiz completes)
 const clearSavedSession = () => {
 localStorage.removeItem(SAVED_SESSION_KEY);
 };

 // Handle save and exit
 const handleSaveAndExit = () => {
 saveSession();
 setShowExitConfirm(false);
 router.push('/dashboard/practice');
 };

 // Handle exit without saving
 const handleExitWithoutSaving = () => {
 setShowExitConfirm(false);
 router.push('/dashboard/practice');
 };

 // Quiz setup options
 const [questionCount, setQuestionCount] = useState(10);
 const [selectedTopic, setSelectedTopic] = useState<string>('all');
 const [selectedSubtopic, setSelectedSubtopic] = useState<string>('all');
 // Difficulty filter removed - let adaptive model handle question selection

 const topics = getTopicsForSection(section);
 const subtopics = getSubtopicsForSection(section, selectedTopic === 'all' ? undefined : selectedTopic);
 const hasQuestions = sectionHasQuestions(section);
 const totalAvailable = getQuestionsBySection(section).length;

 // Reset subtopic when topic changes
 useEffect(() => {
 setSelectedSubtopic('all');
 }, [selectedTopic]);

 const startQuiz = () => {
 const allSectionQuestions = getQuestionsBySection(section);
 const adaptiveOptions: { topic?: string; subtopic?: string } = {};
 if (selectedTopic !== 'all') adaptiveOptions.topic = selectedTopic;
 if (selectedSubtopic !== 'all') adaptiveOptions.subtopic = selectedSubtopic;

 let quizQuestions: PracticeQuestion[];

 // Use adaptive selection if user has history, otherwise fall back to random
 if (userHistory.size > 0) {
   quizQuestions = selectAdaptiveQuestions(
     allSectionQuestions,
     questionCount,
     userHistory,
     adaptiveOptions
   );

   // Generate insights about the selection
   const topicPerformance = buildTopicPerformance(allSectionQuestions, userHistory);
   const insights = getSelectionInsights(quizQuestions, userHistory, topicPerformance);
   setSelectionInsights(insights);
 } else {
   // Fall back to random selection for new users
   quizQuestions = getRandomQuestions(section, questionCount, adaptiveOptions);
   setSelectionInsights(null);
 }

 if (quizQuestions.length === 0) {
 alert('No questions available with the selected filters. Please try different options.');
 return;
 }

 setQuestions(quizQuestions);
 setCurrentQuestionIndex(0);
 setResults([]);
 setStudySessionLogged(false);
 quizStartTime.current = new Date();
 setQuizState('quiz');
 };

 // Auto-log practice session to study log when quiz is completed
 const logPracticeSession = async (quizResults: QuizResult[]) => {
 console.log('logPracticeSession called', { user: !!user, supabase: !!supabase, studySessionLogged });

 if (!user) {
 console.log('No user - skipping practice session log');
 return;
 }
 if (!supabase) {
 console.log('No supabase client - skipping practice session log');
 return;
 }
 if (studySessionLogged) {
 console.log('Session already logged - skipping');
 return;
 }

 const endTime = new Date();
 const startTime = quizStartTime.current || endTime;
 const durationMinutes = Math.max(1, Math.round((endTime.getTime() - startTime.getTime()) / 60000));
 const durationHours = Math.round((durationMinutes / 60) * 4) / 4; // Round to nearest 0.25

 const correctCount = quizResults.filter(r => r.isCorrect).length;
 const accuracy = Math.round((correctCount / quizResults.length) * 100);
 const topicsCovered = [...new Set(quizResults.map(r => r.question.topic))];

 const sessionData = {
 user_id: user.id,
 section: section as DBSectionCode,
 date: getLocalDateString(),
 hours: Math.max(0.25, durationHours), // Minimum 15 minutes credit
 notes: `Practice quiz: ${quizResults.length} questions, ${accuracy}% accuracy. Topics: ${topicsCovered.join(', ')}`,
 topics_covered: topicsCovered,
 };

 console.log('Attempting to insert study session:', sessionData);

 // Create study session entry
 try {
 const { data, error } = await supabase.from('study_sessions').insert(sessionData).select();

 if (error) {
 console.error('Database error logging study session:', error);
 return;
 }

 console.log('Study session logged successfully:', data);
 setStudySessionLogged(true);

 // Refresh profile to update streak in global context
 await refreshProfile();

 // Fetch updated profile to get current streak
 const { data: profileData } = await supabase
 .from('profiles')
 .select('current_streak')
 .eq('id', user.id)
 .single();

 const currentStreak = profileData?.current_streak || 0;

 // Trigger achievement checks and show streak notification if streak > 0
 await onStudySessionLogged(section as DBSectionCode, Math.max(0.25, durationHours), currentStreak > 0, currentStreak);
 await onPracticeSessionCompleted(section as DBSectionCode, correctCount, quizResults.length);
 } catch (error) {
 console.error('Failed to log study session:', error);
 }
 };

 // Log study session when quiz completes and clear saved session
 useEffect(() => {
 if (quizState === 'results' && results.length > 0 && !studySessionLogged) {
 clearSavedSession();
 logPracticeSession(results);
 }
 }, [quizState, results, studySessionLogged]);

 const handleAnswer = async (selectedAnswer: 'A' | 'B' | 'C' | 'D', isCorrect: boolean) => {
 const currentQuestion = questions[currentQuestionIndex];

 // Add to results
 setResults(prev => [...prev, {
 question: currentQuestion,
 selectedAnswer,
 isCorrect,
 }]);

 // Save to database if user is logged in
 if (user && supabase) {
 try {
 await supabase.from('practice_attempts').insert({
 user_id: user.id,
 question_id: currentQuestion.id,
 section: currentQuestion.section,
 topic: currentQuestion.topic,
 selected_answer: selectedAnswer,
 correct_answer: currentQuestion.correctAnswer,
 is_correct: isCorrect,
 });
 } catch (error) {
 console.error('Failed to save practice attempt:', error);
 }
 }
 };

 const handleNext = () => {
 if (currentQuestionIndex < questions.length - 1) {
 setCurrentQuestionIndex(prev => prev + 1);
 } else {
 setQuizState('results');
 }
 };

 const handleRetry = () => {
 setCurrentQuestionIndex(0);
 setResults([]);
 setStudySessionLogged(false);
 quizStartTime.current = new Date();
 setQuizState('quiz');
 };

 const handleNewQuiz = () => {
 setQuizState('setup');
 setResults([]);
 setCurrentQuestionIndex(0);
 setStudySessionLogged(false);
 quizStartTime.current = null;
 };

 if (!hasQuestions) {
 return (
 <div className="space-y-6">
 <Link
 href="/dashboard/practice"
 className="inline-flex items-center text-sm text-gray-600 dark:text-[var(--muted)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors"
 >
 <svg className="w-4 h-4 mr-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
 </svg>
 Back to Practice
 </Link>

 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-8 text-center">
 <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
 <svg className="w-8 h-8 text-yellow-600 dark:text-yellow-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 </div>
 <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Coming Soon!</h2>
 <p className="text-[var(--muted)] mb-6">
 Practice questions for {sectionName} are currently being developed.
 Check back soon!
 </p>
 <Link
 href="/dashboard/practice"
 className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors"
 >
 <svg className="w-4 h-4 mr-2"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
 </svg>
 Back to Practice
 </Link>
 </div>
 </div>
 );
 }

 return (
 <div className="space-y-6">
 {/* Back Button */}
 <Link
 href="/dashboard/practice"
 className="inline-flex items-center text-sm text-gray-600 dark:text-[var(--muted)] hover:text-[var(--primary)] dark:hover:text-[var(--primary)] transition-colors"
 >
 <svg className="w-4 h-4 mr-1"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
 </svg>
 Back to Practice
 </Link>

 {quizState === 'setup' && (
 <>
 {/* Saved Session Banner */}
 {savedSession && (
 <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl p-4">
 <div className="flex items-center justify-between">
 <div className="flex items-center space-x-3">
 <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-amber-600 dark:text-amber-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
 </svg>
 </div>
 <div>
 <h3 className="font-semibold text-amber-800 dark:text-amber-200">Resume Previous Session</h3>
 <p className="text-sm text-amber-600 dark:text-amber-400">
 You have an unfinished quiz ({savedSession.currentIndex}/{savedSession.questionIds.length} questions completed)
 </p>
 </div>
 </div>
 <div className="flex items-center space-x-2">
 <button
 onClick={discardSession}
 className="px-4 py-2 text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-800 rounded-lg transition-colors"
 >
 Discard
 </button>
 <button
 onClick={resumeSession}
 className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
 >
 Resume
 </button>
 </div>
 </div>
 </div>
 )}

 {/* Header */}
 <div className="bg-gradient-to-r from-[var(--primary)] to-blue-600 rounded-xl p-6 text-white">
 <div className="flex items-center space-x-4">
 <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
 <span className="text-xl font-bold">{section}</span>
 </div>
 <div>
 <h1 className="text-2xl font-bold">{sectionName}</h1>
 <p className="text-white/80">{totalAvailable} practice questions available</p>
 </div>
 </div>
 </div>

 {/* Quiz Setup */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Configure Your Quiz</h2>

 <div className="grid md:grid-cols-3 gap-6">
 {/* Question Count */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Number of Questions
 </label>
 <select
 value={questionCount}
 onChange={(e) => setQuestionCount(Number(e.target.value))}
 className="w-full px-4 py-2 border border-[var(--border)] dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
 >
 <option value={5}>5 questions</option>
 <option value={10}>10 questions</option>
 <option value={15}>15 questions</option>
 <option value={20}>20 questions</option>
 <option value={25}>25 questions (all)</option>
 </select>
 </div>

 {/* Topic Filter */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Topic
 </label>
 <select
 value={selectedTopic}
 onChange={(e) => setSelectedTopic(e.target.value)}
 className="w-full px-4 py-2 border border-[var(--border)] dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
 >
 <option value="all">All Topics</option>
 {topics.map(topic => (
 <option key={topic} value={topic}>{topic}</option>
 ))}
 </select>
 </div>

 {/* Subtopic Filter */}
 <div>
 <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
 Subtopic
 </label>
 <select
 value={selectedSubtopic}
 onChange={(e) => setSelectedSubtopic(e.target.value)}
 className="w-full px-4 py-2 border border-[var(--border)] dark:border-[var(--border)] rounded-lg bg-white dark:bg-[var(--card-hover)] text-[var(--foreground)] focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
 >
 <option value="all">All Subtopics</option>
 {subtopics.map(subtopic => (
 <option key={subtopic} value={subtopic}>{subtopic}</option>
 ))}
 </select>
 </div>

 {/* Difficulty filter removed - let adaptive model handle question selection */}
 </div>

 {/* Adaptive Learning Indicator */}
 {historyLoaded && userHistory.size > 0 && (
   <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg">
     <div className="flex items-center gap-2">
       <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
       </svg>
       <span className="font-medium text-purple-800 dark:text-purple-200">Adaptive Learning Active</span>
     </div>
     <p className="mt-1 text-sm text-purple-600 dark:text-purple-300">
       Questions will be selected based on your past performance, prioritizing areas where you need more practice.
     </p>
   </div>
 )}

 <button
 onClick={startQuiz}
 className="w-full mt-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
 >
 Start Quiz
 </button>
 </div>

 {/* Topics Overview */}
 <div className="bg-white dark:bg-[var(--card)] rounded-xl border border-[var(--border)] p-6">
 <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Topics Covered</h2>
 <div className="flex flex-wrap gap-2">
 {topics.map(topic => (
 <span
 key={topic}
 className="px-3 py-1 bg-[var(--primary)]/10 text-[var(--primary)] rounded-full text-sm font-medium"
 >
 {topic}
 </span>
 ))}
 </div>
 </div>
 </>
 )}

 {quizState === 'quiz' && questions.length > 0 && (
 <>
 {/* Exit Button */}
 <div className="flex justify-end">
 <button
 onClick={() => setShowExitConfirm(true)}
 className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-[var(--muted)] hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
 >
 <svg className="w-5 h-5"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
 </svg>
 <span>Exit Quiz</span>
 </button>
 </div>

 <QuizQuestion
 question={questions[currentQuestionIndex]}
 questionNumber={currentQuestionIndex + 1}
 totalQuestions={questions.length}
 onAnswer={handleAnswer}
 onNext={handleNext}
 isLast={currentQuestionIndex === questions.length - 1}
 />
 </>
 )}

 {quizState === 'results' && (
 <QuizResults
 section={section}
 sectionName={sectionName}
 results={results}
 onRetry={handleRetry}
 onNewQuiz={handleNewQuiz}
 studySessionLogged={studySessionLogged}
 />
 )}

 {/* Exit Confirmation Modal */}
 {showExitConfirm && (
 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
 <div className="bg-white dark:bg-[var(--card)] rounded-xl shadow-xl max-w-md w-full p-6">
 <div className="flex items-center space-x-3 mb-4">
 <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center">
 <svg className="w-5 h-5 text-amber-600 dark:text-amber-400"fill="none"stroke="currentColor"viewBox="0 0 24 24">
 <path strokeLinecap="round"strokeLinejoin="round"strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
 </svg>
 </div>
 <h3 className="text-lg font-semibold text-[var(--foreground)]">Exit Quiz?</h3>
 </div>

 <p className="text-[var(--muted)] mb-6">
 You&apos;ve completed {results.length} of {questions.length} questions. Would you like to save your progress and resume later?
 </p>

 <div className="flex flex-col space-y-3">
 <button
 onClick={handleSaveAndExit}
 className="w-full py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
 >
 Save & Exit
 </button>
 <button
 onClick={handleExitWithoutSaving}
 className="w-full py-3 border border-[var(--border)] dark:border-[var(--border)] text-[var(--foreground)] rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
 >
 Exit Without Saving
 </button>
 <button
 onClick={() => setShowExitConfirm(false)}
 className="w-full py-3 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
 >
 Continue Quiz
 </button>
 </div>
 </div>
 </div>
 )}
 </div>
 );
}
