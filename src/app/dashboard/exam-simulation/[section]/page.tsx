"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import {
  getQuestionsBySection,
  sectionHasQuestions,
  PracticeQuestion,
  SectionCode,
} from "@/lib/data/practice-questions";
import { getSampleTBSBySection } from "@/lib/data/tbs/sample-tbs";
import { TBSQuestion, TBSAttempt } from "@/lib/data/tbs/types";
import { TBSContainer } from "@/components/tbs";
import type { SectionCode as DBSectionCode } from "@/lib/supabase/types";

interface ExamResult {
  question: PracticeQuestion;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  flagged: boolean;
  timeSpent: number;
}

interface TBSResult {
  tbs: TBSQuestion;
  attempt: TBSAttempt;
}

type ExamState = 'setup' | 'exam' | 'tbs' | 'paused' | 'review' | 'results';
type TestletType = 'mcq' | 'tbs';

const sectionNames: Record<string, string> = {
  far: 'Financial Accounting & Reporting',
  aud: 'Auditing & Attestation',
  reg: 'Regulation',
  tcp: 'Tax Compliance & Planning',
  bar: 'Business Analysis & Reporting',
  isc: 'Information Systems & Controls',
};

// Exam configuration options
const EXAM_CONFIGS = {
  mini: {
    questions: 20,
    tbsCount: 0,
    timeMinutes: 40,
    label: "MCQ Only",
    description: "20 MCQ, 40 minutes"
  },
  mixed: {
    questions: 20,
    tbsCount: 1,
    timeMinutes: 55,
    label: "Mixed Practice",
    description: "20 MCQ + 1 TBS, ~55 minutes"
  },
  realistic: {
    questions: 36,
    tbsCount: 2,
    timeMinutes: 90,
    label: "Realistic Testlet",
    description: "36 MCQ + 2 TBS, ~90 minutes"
  },
};

// Target distribution for realistic exam simulation
const TARGET_DISTRIBUTION = { easy: 0.17, medium: 0.55, hard: 0.28 };

function getExamQuestions(allQuestions: PracticeQuestion[], count: number): PracticeQuestion[] {
  // Calculate target counts for each difficulty
  const easyCount = Math.round(count * TARGET_DISTRIBUTION.easy);
  const mediumCount = Math.round(count * TARGET_DISTRIBUTION.medium);
  const hardCount = count - easyCount - mediumCount;

  // Group questions by difficulty
  const easy = allQuestions.filter(q => q.difficulty === 'easy');
  const medium = allQuestions.filter(q => q.difficulty === 'medium');
  const hard = allQuestions.filter(q => q.difficulty === 'hard');

  // Shuffle and select
  const shuffle = <T,>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  const selectedEasy = shuffle(easy).slice(0, Math.min(easyCount, easy.length));
  const selectedMedium = shuffle(medium).slice(0, Math.min(mediumCount, medium.length));
  const selectedHard = shuffle(hard).slice(0, Math.min(hardCount, hard.length));

  // Combine and shuffle the final selection
  let selected = [...selectedEasy, ...selectedMedium, ...selectedHard];

  // If we don't have enough, fill with any available questions
  if (selected.length < count) {
    const remaining = shuffle(allQuestions.filter(q => !selected.includes(q)));
    selected = [...selected, ...remaining.slice(0, count - selected.length)];
  }

  return shuffle(selected).slice(0, count);
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function ExamSimulationSectionPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const supabase = createClient();

  const sectionParam = params.section as string;
  const section = sectionParam.toUpperCase() as SectionCode;
  const sectionName = sectionNames[sectionParam.toLowerCase()] || section;

  // State
  const [examState, setExamState] = useState<ExamState>('setup');
  const [selectedConfig, setSelectedConfig] = useState<keyof typeof EXAM_CONFIGS>('mini');
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [flagged, setFlagged] = useState<Set<number>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [questionTimes, setQuestionTimes] = useState<Record<number, number>>({});

  // TBS State
  const [tbsQuestions, setTbsQuestions] = useState<TBSQuestion[]>([]);
  const [currentTbsIndex, setCurrentTbsIndex] = useState(0);
  const [tbsResults, setTbsResults] = useState<TBSResult[]>([]);

  // Timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const hasQuestions = sectionHasQuestions(section);
  const totalAvailable = getQuestionsBySection(section).length;
  const availableTBS = getSampleTBSBySection(section);
  const hasTBS = availableTBS.length > 0;

  // Timer effect - only runs when exam is active (not paused)
  useEffect(() => {
    if (examState === 'exam' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto submit
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState, timeRemaining]);

  const handlePause = () => {
    recordQuestionTime();
    if (timerRef.current) clearInterval(timerRef.current);
    setExamState('paused');
  };

  const handleResume = () => {
    setQuestionStartTime(Date.now());
    setExamState('exam');
  };

  const startExam = () => {
    const config = EXAM_CONFIGS[selectedConfig];
    const allQuestions = getQuestionsBySection(section);
    const examQuestions = getExamQuestions(allQuestions, Math.min(config.questions, allQuestions.length));

    if (examQuestions.length === 0) {
      alert('No questions available. Please try again later.');
      return;
    }

    // Select TBS questions if configured
    let selectedTBS: TBSQuestion[] = [];
    if (config.tbsCount > 0 && hasTBS) {
      const shuffledTBS = [...availableTBS].sort(() => Math.random() - 0.5);
      selectedTBS = shuffledTBS.slice(0, Math.min(config.tbsCount, shuffledTBS.length));
    }

    setQuestions(examQuestions);
    setTbsQuestions(selectedTBS);
    setCurrentIndex(0);
    setCurrentTbsIndex(0);
    setAnswers({});
    setFlagged(new Set());
    setTbsResults([]);
    setTimeRemaining(config.timeMinutes * 60);
    setQuestionStartTime(Date.now());
    setQuestionTimes({});
    setExamState('exam');
  };

  const handleSelectAnswer = (answer: 'A' | 'B' | 'C' | 'D') => {
    setAnswers(prev => ({ ...prev, [currentIndex]: answer }));
  };

  const handleToggleFlag = () => {
    setFlagged(prev => {
      const newSet = new Set(prev);
      if (newSet.has(currentIndex)) {
        newSet.delete(currentIndex);
      } else {
        newSet.add(currentIndex);
      }
      return newSet;
    });
  };

  const recordQuestionTime = () => {
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    setQuestionTimes(prev => ({
      ...prev,
      [currentIndex]: (prev[currentIndex] || 0) + timeSpent
    }));
  };

  const handleNavigate = (index: number) => {
    recordQuestionTime();
    setCurrentIndex(index);
    setQuestionStartTime(Date.now());
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      handleNavigate(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleNavigate(currentIndex - 1);
    }
  };

  const handleReviewExam = () => {
    recordQuestionTime();
    // If there are TBS questions, transition to TBS phase first
    if (tbsQuestions.length > 0 && currentTbsIndex < tbsQuestions.length) {
      setExamState('tbs');
    } else {
      setExamState('review');
    }
  };

  // Handle TBS completion
  const handleTBSComplete = (attempt: TBSAttempt) => {
    const currentTbs = tbsQuestions[currentTbsIndex];
    setTbsResults(prev => [...prev, { tbs: currentTbs, attempt }]);

    // Move to next TBS or review
    if (currentTbsIndex < tbsQuestions.length - 1) {
      setCurrentTbsIndex(prev => prev + 1);
    } else {
      setExamState('review');
    }
  };

  // Navigate between TBS questions
  const handleNextTBS = () => {
    if (currentTbsIndex < tbsQuestions.length - 1) {
      setCurrentTbsIndex(prev => prev + 1);
    }
  };

  const handlePreviousTBS = () => {
    if (currentTbsIndex > 0) {
      setCurrentTbsIndex(prev => prev - 1);
    }
  };

  // Return to MCQ from TBS
  const handleReturnToMCQ = () => {
    setExamState('exam');
  };

  const handleFinishExam = useCallback(async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    recordQuestionTime();

    // Save results
    if (user && supabase) {
      for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const selected = answers[i];
        const isCorrect = selected === q.correctAnswer;

        try {
          await supabase.from('practice_attempts').insert({
            user_id: user.id,
            question_id: q.id,
            section: q.section,
            topic: q.topic,
            selected_answer: selected || 'SKIPPED',
            correct_answer: q.correctAnswer,
            is_correct: isCorrect,
            time_spent_seconds: questionTimes[i] || 0,
          });
        } catch (error) {
          console.error('Failed to save attempt:', error);
        }
      }
    }

    setExamState('results');
  }, [questions, answers, questionTimes, user, supabase]);

  const getResults = (): ExamResult[] => {
    return questions.map((q, i) => ({
      question: q,
      selectedAnswer: answers[i] || null,
      isCorrect: answers[i] === q.correctAnswer,
      flagged: flagged.has(i),
      timeSpent: questionTimes[i] || 0,
    }));
  };

  const getScore = () => {
    const mcqResults = getResults();
    const mcqCorrect = mcqResults.filter(r => r.isCorrect).length;

    // Calculate TBS score
    const tbsTotalPoints = tbsResults.reduce((sum, r) => sum + (r.attempt.maxScore || 0), 0);
    const tbsEarnedPoints = tbsResults.reduce((sum, r) => sum + (r.attempt.scoreEarned || 0), 0);

    // Combined score (MCQ weight + TBS weight)
    const mcqTotal = mcqResults.length;
    const totalItems = mcqTotal + tbsResults.length;

    if (totalItems === 0) return { correct: 0, total: 0, percentage: 0, mcqScore: 0, tbsScore: 0 };

    // For combined percentage: MCQ is binary (correct/incorrect), TBS uses earned/max points
    const mcqPercentage = mcqTotal > 0 ? (mcqCorrect / mcqTotal) * 100 : 0;
    const tbsPercentage = tbsTotalPoints > 0 ? (tbsEarnedPoints / tbsTotalPoints) * 100 : 0;

    // Weight MCQ and TBS equally in the final score
    const hasOnlyMCQ = tbsResults.length === 0;
    const combinedPercentage = hasOnlyMCQ
      ? mcqPercentage
      : (mcqPercentage + tbsPercentage) / 2;

    return {
      correct: mcqCorrect,
      total: mcqTotal,
      percentage: Math.round(combinedPercentage),
      mcqScore: Math.round(mcqPercentage),
      tbsScore: Math.round(tbsPercentage),
      tbsEarnedPoints,
      tbsTotalPoints,
    };
  };

  if (!hasQuestions) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
          <Link href="/dashboard/exam-simulation" className="hover:text-[var(--primary)]">Exam Simulation</Link>
          <span>/</span>
          <span>{section}</span>
        </div>
        <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-center">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">Coming Soon!</h2>
          <p className="text-[var(--muted)] mb-6">
            Exam simulation for {sectionName} is currently being developed.
          </p>
          <Link
            href="/dashboard/exam-simulation"
            className="inline-flex items-center px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            Back to Exam Simulation
          </Link>
        </div>
      </div>
    );
  }

  // Setup State
  if (examState === 'setup') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
          <Link href="/dashboard/exam-simulation" className="hover:text-orange-500">Exam Simulation</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{section}</span>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-xl font-bold">{section}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold">{sectionName}</h1>
              <p className="text-white/80">
                {totalAvailable} MCQ{hasTBS && ` + ${availableTBS.length} TBS`} available
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Select Exam Length</h2>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            {(Object.entries(EXAM_CONFIGS) as [keyof typeof EXAM_CONFIGS, typeof EXAM_CONFIGS[keyof typeof EXAM_CONFIGS]][]).map(([key, config]) => {
              const tbsAvailable = config.tbsCount > 0 && hasTBS;
              const tbsShortage = config.tbsCount > availableTBS.length;

              return (
                <button
                  key={key}
                  onClick={() => setSelectedConfig(key)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    selectedConfig === key
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20'
                      : 'border-[var(--border)] hover:border-orange-300 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[var(--foreground)]">{config.label}</h3>
                    {config.tbsCount > 0 && (
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        tbsAvailable ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                      }`}>
                        +TBS
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--muted)]">{config.description}</p>
                  {config.questions > totalAvailable && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      (Will use {totalAvailable} MCQ)
                    </p>
                  )}
                  {config.tbsCount > 0 && !hasTBS && (
                    <p className="text-xs text-gray-500 mt-1">
                      (TBS not available for this section yet)
                    </p>
                  )}
                  {tbsAvailable && tbsShortage && (
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                      (Will use {availableTBS.length} TBS)
                    </p>
                  )}
                </button>
              );
            })}
          </div>

          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-orange-800 mb-2">Exam Simulation Rules:</h3>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Timer will count down - exam auto-submits when time expires</li>
              <li>• Questions use realistic CPA exam difficulty distribution</li>
              <li>• You can flag questions and navigate freely during the exam</li>
              <li>• No explanations shown until you submit the exam</li>
              <li>• Review all questions and explanations after completion</li>
            </ul>
          </div>

          <button
            onClick={startExam}
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Begin Exam Simulation
          </button>
        </div>
      </div>
    );
  }

  // Exam State
  if (examState === 'exam') {
    const currentQuestion = questions[currentIndex];
    const answeredCount = Object.keys(answers).length;
    const flaggedCount = flagged.size;
    const timeWarning = timeRemaining < 300; // 5 minutes warning

    return (
      <div className="space-y-4">
        {/* Timer Bar */}
        <div className={`sticky top-16 z-40 rounded-xl p-4 ${
          timeWarning ? 'bg-red-500' : 'bg-orange-500'
        } text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl font-mono font-bold">
                {formatTime(timeRemaining)}
              </div>
              <div className="text-sm text-white/80">
                {timeWarning && '⚠️ Time running low!'}
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span>{answeredCount}/{questions.length} answered</span>
              {flaggedCount > 0 && (
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 6a3 3 0 013-3h10l-4 6 4 6H6a3 3 0 01-3-3V6z" />
                  </svg>
                  {flaggedCount} flagged
                </span>
              )}
              <button
                onClick={handlePause}
                className="flex items-center space-x-1 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Pause</span>
              </button>
            </div>
          </div>
        </div>

        {/* Question Navigation */}
        <div className="bg-white rounded-xl border border-[var(--border)] p-4">
          <div className="flex flex-wrap gap-2">
            {questions.map((_, i) => (
              <button
                key={i}
                onClick={() => handleNavigate(i)}
                className={`w-8 h-8 rounded text-sm font-medium transition-all ${
                  i === currentIndex
                    ? 'bg-orange-500 text-white'
                    : answers[i]
                    ? flagged.has(i)
                      ? 'bg-yellow-100 text-yellow-800 border border-yellow-400'
                      : 'bg-green-100 text-green-800'
                    : flagged.has(i)
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-400'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl border border-[var(--border)] p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[var(--muted)]">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <button
              onClick={handleToggleFlag}
              className={`flex items-center space-x-1 px-3 py-1 rounded text-sm ${
                flagged.has(currentIndex)
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-gray-100 text-gray-600 hover:bg-yellow-50'
              }`}
            >
              <svg className="w-4 h-4" fill={flagged.has(currentIndex) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 20 20">
                <path d="M3 6a3 3 0 013-3h10l-4 6 4 6H6a3 3 0 01-3-3V6z" />
              </svg>
              <span>{flagged.has(currentIndex) ? 'Flagged' : 'Flag'}</span>
            </button>
          </div>

          <p className="text-lg text-[var(--foreground)] mb-6 leading-relaxed">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {(['A', 'B', 'C', 'D'] as const).map((option) => (
              <button
                key={option}
                onClick={() => handleSelectAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  answers[currentIndex] === option
                    ? 'border-orange-500 bg-orange-50'
                    : 'border-[var(--border)] hover:border-orange-300'
                }`}
              >
                <span className="font-semibold mr-3">{option}.</span>
                {currentQuestion.options[option]}
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            ← Previous
          </button>

          <button
            onClick={handleReviewExam}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
          >
            Review & Submit
          </button>

          <button
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200"
          >
            Next →
          </button>
        </div>
      </div>
    );
  }

  // Paused State
  if (examState === 'paused') {
    return (
      <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Exam Paused</h2>
          <p className="text-[var(--muted)] mb-6">
            Your timer has been paused. Take a break and resume when you're ready.
          </p>

          <div className="bg-orange-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-orange-700">Time Remaining:</span>
              <span className="font-bold text-orange-800">{formatTime(timeRemaining)}</span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-orange-700">Questions Answered:</span>
              <span className="font-bold text-orange-800">{Object.keys(answers).length}/{questions.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-orange-700">Current Question:</span>
              <span className="font-bold text-orange-800">Q{currentIndex + 1}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleResume}
              className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              <span>Resume Exam</span>
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to end the exam? Your progress will be submitted.')) {
                  handleFinishExam();
                }
              }}
              className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              End Exam & Submit
            </button>
          </div>

          <p className="text-xs text-[var(--muted)] mt-4">
            Note: In a real CPA exam, pausing is not allowed. Use this feature only when necessary during practice.
          </p>
        </div>
      </div>
    );
  }

  // TBS State - Task-Based Simulations
  if (examState === 'tbs' && tbsQuestions.length > 0) {
    const currentTbs = tbsQuestions[currentTbsIndex];

    return (
      <div className="min-h-screen">
        {/* TBS Progress Header */}
        <div className="sticky top-16 z-40 bg-blue-600 text-white p-3 mb-4 rounded-xl mx-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-lg font-bold">
                TBS {currentTbsIndex + 1} of {tbsQuestions.length}
              </span>
              <span className="text-sm text-white/80">
                {currentTbs.title}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm">
                {formatTime(timeRemaining)} remaining
              </span>
              <button
                onClick={handleReturnToMCQ}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm"
              >
                ← Back to MCQ
              </button>
            </div>
          </div>
        </div>

        {/* TBS Container */}
        <TBSContainer
          tbs={currentTbs}
          testletIndex={currentTbsIndex + 1}
          testletTotal={tbsQuestions.length}
          onComplete={handleTBSComplete}
          onPrevious={currentTbsIndex > 0 ? handlePreviousTBS : undefined}
          onNext={currentTbsIndex < tbsQuestions.length - 1 ? handleNextTBS : undefined}
          isPracticeMode={false}
          onReturnToLibrary={handleReturnToMCQ}
        />
      </div>
    );
  }

  // Review State
  if (examState === 'review') {
    const unanswered = questions.length - Object.keys(answers).length;
    const flaggedList = Array.from(flagged);
    const tbsCompleted = tbsResults.length;
    const tbsTotal = tbsQuestions.length;

    return (
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-6">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Review Before Submitting</h2>

          {/* MCQ Summary */}
          <h3 className="text-sm font-semibold text-[var(--muted)] mb-3">Multiple Choice Questions</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">Answered</p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">{Object.keys(answers).length}</p>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Unanswered</p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-300">{unanswered}</p>
            </div>
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Flagged</p>
              <p className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{flaggedList.length}</p>
            </div>
          </div>

          {/* TBS Summary - if any TBS were included */}
          {tbsTotal > 0 && (
            <>
              <h3 className="text-sm font-semibold text-[var(--muted)] mb-3">Task-Based Simulations</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Completed</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">{tbsCompleted}</p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total TBS</p>
                  <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">{tbsTotal}</p>
                </div>
              </div>
              {tbsCompleted < tbsTotal && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 mb-4">
                  <p className="text-blue-800 dark:text-blue-300 font-medium">
                    You have {tbsTotal - tbsCompleted} TBS remaining.
                    <button
                      onClick={() => setExamState('tbs')}
                      className="ml-2 underline hover:no-underline"
                    >
                      Continue TBS →
                    </button>
                  </p>
                </div>
              )}
            </>
          )}

          {unanswered > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 font-medium">
                ⚠️ You have {unanswered} unanswered question{unanswered > 1 ? 's' : ''}.
                Remember: no penalty for guessing!
              </p>
            </div>
          )}

          {flaggedList.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-[var(--muted)] mb-2">Flagged questions:</p>
              <div className="flex flex-wrap gap-2">
                {flaggedList.map(i => (
                  <button
                    key={i}
                    onClick={() => { setExamState('exam'); handleNavigate(i); }}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hover:bg-yellow-200"
                  >
                    Q{i + 1}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex space-x-4">
            <button
              onClick={() => setExamState('exam')}
              className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
            >
              Back to Exam
            </button>
            <button
              onClick={handleFinishExam}
              className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Results State
  if (examState === 'results') {
    const score = getScore();
    const results = getResults();
    const passed = score.percentage >= 75;
    const hasTBSResults = tbsResults.length > 0;

    return (
      <div className="space-y-6">
        {/* Score Card */}
        <div className={`rounded-xl p-8 text-white ${passed ? 'bg-green-500' : 'bg-red-500'}`}>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {passed ? '🎉 Congratulations!' : 'Keep Practicing!'}
            </h2>
            <p className="text-6xl font-bold mb-2">{score.percentage}%</p>
            <p className="text-xl text-white/80">
              {hasTBSResults
                ? `MCQ: ${score.mcqScore}% | TBS: ${score.tbsScore}%`
                : `${score.correct} out of ${score.total} correct`
              }
            </p>
            <p className="mt-4 text-white/70">
              {passed
                ? 'Great job! You scored above the typical passing threshold.'
                : 'The CPA exam typically requires around 75% to pass. Keep studying!'}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className={`grid gap-4 ${hasTBSResults ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted)]">MCQ Correct</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{score.correct}/{score.total}</p>
          </div>
          {hasTBSResults && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-4">
              <p className="text-sm text-[var(--muted)]">TBS Points</p>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {score.tbsEarnedPoints}/{score.tbsTotalPoints}
              </p>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted)]">MCQ Incorrect</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">{score.total - score.correct}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted)]">Time Used</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatTime(EXAM_CONFIGS[selectedConfig].timeMinutes * 60 - timeRemaining)}
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)] p-4">
            <p className="text-sm text-[var(--muted)]">Avg per MCQ</p>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {score.total > 0 ? formatTime(Math.round((EXAM_CONFIGS[selectedConfig].timeMinutes * 60 - timeRemaining) / score.total)) : '0:00'}
            </p>
          </div>
        </div>

        {/* TBS Results Summary */}
        {hasTBSResults && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)]">
            <div className="p-4 border-b border-[var(--border)]">
              <h3 className="font-semibold text-[var(--foreground)]">TBS Results</h3>
            </div>
            <div className="divide-y divide-[var(--border)]">
              {tbsResults.map((result, i) => {
                const scorePercent = result.attempt.scorePercentage || 0;
                const isPassing = scorePercent >= 75;
                return (
                  <div key={i} className={`p-4 ${isPassing ? 'bg-green-50/50 dark:bg-green-900/10' : 'bg-red-50/50 dark:bg-red-900/10'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[var(--foreground)]">
                          TBS {i + 1}: {result.tbs.title}
                        </p>
                        <p className="text-sm text-[var(--muted)]">
                          {result.tbs.topic} • {result.tbs.tbsType.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          isPassing
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {scorePercent}%
                        </span>
                        <p className="text-xs text-[var(--muted)] mt-1">
                          {result.attempt.scoreEarned}/{result.attempt.maxScore} pts
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MCQ Review */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-[var(--border)]">
          <div className="p-4 border-b border-[var(--border)]">
            <h3 className="font-semibold text-[var(--foreground)]">MCQ Review</h3>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {results.map((result, i) => (
              <div key={i} className={`p-4 ${result.isCorrect ? 'bg-green-50/50' : 'bg-red-50/50'}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--muted)]">
                    Q{i + 1} • {result.question.topic}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    result.isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {result.isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-[var(--foreground)] mb-3">{result.question.question}</p>
                <div className="text-sm space-y-1">
                  <p>
                    <span className="text-[var(--muted)]">Your answer:</span>{' '}
                    <span className={result.isCorrect ? 'text-green-700' : 'text-red-700'}>
                      {result.selectedAnswer || 'Not answered'}: {result.selectedAnswer ? result.question.options[result.selectedAnswer] : '-'}
                    </span>
                  </p>
                  {!result.isCorrect && (
                    <p>
                      <span className="text-[var(--muted)]">Correct answer:</span>{' '}
                      <span className="text-green-700">
                        {result.question.correctAnswer}: {result.question.options[result.question.correctAnswer]}
                      </span>
                    </p>
                  )}
                </div>
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">{result.question.explanation}</p>
                  {result.question.tip && (
                    <p className="text-sm text-blue-600 mt-2">💡 {result.question.tip}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setExamState('setup');
              setQuestions([]);
              setAnswers({});
              setFlagged(new Set());
            }}
            className="flex-1 py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
          >
            Try Another Simulation
          </button>
          <Link
            href="/dashboard/exam-simulation"
            className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 text-center"
          >
            Back to Exam Selection
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
