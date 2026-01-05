"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import { useStudySessionAchievements, usePracticeSessionAchievements } from "@/components/gamification/AchievementProvider";
import QuizQuestion from "@/components/practice/QuizQuestion";
import QuizResults from "@/components/practice/QuizResults";
import {
  getQuestionsBySection,
  getRandomQuestions,
  getTopicsForSection,
  sectionHasQuestions,
  questionSets,
  PracticeQuestion,
  SectionCode,
} from "@/lib/data/practice-questions";
import type { SectionCode as DBSectionCode } from "@/lib/supabase/types";

interface QuizResult {
  question: PracticeQuestion;
  selectedAnswer: 'A' | 'B' | 'C' | 'D';
  isCorrect: boolean;
}

type QuizState = 'setup' | 'quiz' | 'results';

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
  const { user } = useAuth();
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

  // Quiz timing
  const quizStartTime = useRef<Date | null>(null);

  // Quiz setup options
  const [questionCount, setQuestionCount] = useState(10);
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const topics = getTopicsForSection(section);
  const hasQuestions = sectionHasQuestions(section);
  const totalAvailable = getQuestionsBySection(section).length;

  const startQuiz = () => {
    const options: { topic?: string; difficulty?: 'easy' | 'medium' | 'hard' } = {};
    if (selectedTopic !== 'all') options.topic = selectedTopic;
    if (selectedDifficulty !== 'all') options.difficulty = selectedDifficulty as 'easy' | 'medium' | 'hard';

    const quizQuestions = getRandomQuestions(section, questionCount, options);

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
      date: new Date().toISOString().split('T')[0],
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

  // Log study session when quiz completes
  useEffect(() => {
    if (quizState === 'results' && results.length > 0 && !studySessionLogged) {
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
        <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
          <Link href="/dashboard/practice" className="hover:text-[var(--primary)]">Practice</Link>
          <span>/</span>
          <span>{section}</span>
        </div>

        <div className="bg-white rounded-xl border border-[var(--border)] p-8 text-center">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
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
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Practice
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-[var(--muted)]">
        <Link href="/dashboard/practice" className="hover:text-[var(--primary)]">Practice</Link>
        <span>/</span>
        <span className="text-[var(--foreground)]">{section}</span>
      </div>

      {quizState === 'setup' && (
        <>
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
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
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
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
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
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  <option value="all">All Topics</option>
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-4 py-2 border border-[var(--border)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            <button
              onClick={startQuiz}
              className="w-full mt-6 py-3 bg-[var(--primary)] text-white rounded-lg font-semibold hover:bg-[var(--primary-dark)] transition-colors"
            >
              Start Quiz
            </button>
          </div>

          {/* Topics Overview */}
          <div className="bg-white rounded-xl border border-[var(--border)] p-6">
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
        <QuizQuestion
          question={questions[currentQuestionIndex]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
          onNext={handleNext}
          isLast={currentQuestionIndex === questions.length - 1}
        />
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
    </div>
  );
}
