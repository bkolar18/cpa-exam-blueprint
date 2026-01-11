/**
 * Adaptive Question Selection Algorithm
 *
 * Prioritizes questions based on:
 * 1. Questions the user has gotten wrong before (highest priority)
 * 2. Questions from topics with low coverage (user hasn't practiced much)
 * 3. Questions never attempted (to ensure coverage)
 * 4. Questions not seen recently (spaced repetition)
 * 5. Random selection for remaining slots
 */

import type { PracticeQuestion, SectionCode } from '@/lib/data/practice-questions/types';

export interface UserQuestionHistory {
  questionId: string;
  isCorrect: boolean;
  attemptedAt: Date;
  attemptCount: number;
}

export interface TopicPerformance {
  topic: string;
  attempted: number;
  correct: number;
  totalAvailable: number;
  accuracy: number;
  coverage: number; // percentage of topic questions attempted
}

export interface AdaptiveSelectionOptions {
  topic?: string;
  subtopic?: string;
  // Weights for different selection criteria (should sum to ~1.0)
  wrongAnswerWeight?: number;      // Priority for previously wrong answers
  lowCoverageWeight?: number;      // Priority for low-coverage topics
  neverAttemptedWeight?: number;   // Priority for never-attempted questions
  spacedRepetitionWeight?: number; // Priority for questions not seen recently
}

const DEFAULT_WEIGHTS = {
  wrongAnswerWeight: 0.35,
  lowCoverageWeight: 0.25,
  neverAttemptedWeight: 0.25,
  spacedRepetitionWeight: 0.15,
};

// Minimum days before a question should be repeated
const MIN_DAYS_BEFORE_REPEAT = 1;
// Ideal days for spaced repetition review
const IDEAL_REVIEW_DAYS = 3;

/**
 * Calculate a priority score for a question based on user history
 */
function calculateQuestionPriority(
  question: PracticeQuestion,
  history: Map<string, UserQuestionHistory>,
  topicPerformance: Map<string, TopicPerformance>,
  weights: typeof DEFAULT_WEIGHTS
): number {
  const questionHistory = history.get(question.id);
  const topicStats = topicPerformance.get(question.topic);

  let score = 0;

  // 1. Wrong answer priority - questions user got wrong should be reviewed
  if (questionHistory) {
    if (!questionHistory.isCorrect) {
      // Higher priority for questions answered incorrectly
      // More attempts = higher priority (struggling with this question)
      score += weights.wrongAnswerWeight * (1 + Math.min(questionHistory.attemptCount, 5) * 0.1);
    }

    // 4. Spaced repetition - questions not seen recently get priority
    const daysSinceAttempt = (Date.now() - questionHistory.attemptedAt.getTime()) / (1000 * 60 * 60 * 24);

    if (daysSinceAttempt < MIN_DAYS_BEFORE_REPEAT) {
      // Recently seen - reduce priority significantly
      score -= 0.5;
    } else if (daysSinceAttempt >= IDEAL_REVIEW_DAYS) {
      // Good time to review
      score += weights.spacedRepetitionWeight * Math.min(daysSinceAttempt / IDEAL_REVIEW_DAYS, 2);
    }
  } else {
    // 3. Never attempted - give priority to unseen questions
    score += weights.neverAttemptedWeight;
  }

  // 2. Low coverage priority - topics user hasn't practiced much
  if (topicStats) {
    // Lower coverage = higher priority
    const coverageDeficit = 1 - (topicStats.coverage / 100);
    score += weights.lowCoverageWeight * coverageDeficit;

    // Also boost if accuracy is low for this topic
    if (topicStats.attempted >= 3 && topicStats.accuracy < 60) {
      score += 0.1; // Small boost for weak topics
    }
  } else {
    // No stats for topic = definitely need to practice it
    score += weights.lowCoverageWeight;
  }

  // Add small random factor to prevent exact same order every time
  score += Math.random() * 0.1;

  return score;
}

/**
 * Build topic performance map from user history
 */
export function buildTopicPerformance(
  allQuestions: PracticeQuestion[],
  history: Map<string, UserQuestionHistory>
): Map<string, TopicPerformance> {
  const topicStats = new Map<string, TopicPerformance>();

  // First, count total questions per topic
  const topicTotals = new Map<string, number>();
  for (const q of allQuestions) {
    topicTotals.set(q.topic, (topicTotals.get(q.topic) || 0) + 1);
  }

  // Build performance stats from history
  const topicAttempts = new Map<string, { attempted: Set<string>; correct: number }>();

  for (const [questionId, historyEntry] of history) {
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) continue;

    let stats = topicAttempts.get(question.topic);
    if (!stats) {
      stats = { attempted: new Set(), correct: 0 };
      topicAttempts.set(question.topic, stats);
    }

    stats.attempted.add(questionId);
    if (historyEntry.isCorrect) {
      stats.correct++;
    }
  }

  // Build final performance map
  for (const [topic, total] of topicTotals) {
    const attempts = topicAttempts.get(topic);
    const attempted = attempts?.attempted.size || 0;
    const correct = attempts?.correct || 0;

    topicStats.set(topic, {
      topic,
      attempted,
      correct,
      totalAvailable: total,
      accuracy: attempted > 0 ? Math.round((correct / attempted) * 100) : 0,
      coverage: Math.round((attempted / total) * 100),
    });
  }

  return topicStats;
}

/**
 * Select questions adaptively based on user history
 */
export function selectAdaptiveQuestions(
  allQuestions: PracticeQuestion[],
  count: number,
  history: Map<string, UserQuestionHistory>,
  options?: AdaptiveSelectionOptions
): PracticeQuestion[] {
  const weights = {
    wrongAnswerWeight: options?.wrongAnswerWeight ?? DEFAULT_WEIGHTS.wrongAnswerWeight,
    lowCoverageWeight: options?.lowCoverageWeight ?? DEFAULT_WEIGHTS.lowCoverageWeight,
    neverAttemptedWeight: options?.neverAttemptedWeight ?? DEFAULT_WEIGHTS.neverAttemptedWeight,
    spacedRepetitionWeight: options?.spacedRepetitionWeight ?? DEFAULT_WEIGHTS.spacedRepetitionWeight,
  };

  // Filter by topic/subtopic if specified
  let eligibleQuestions = [...allQuestions];

  if (options?.topic) {
    eligibleQuestions = eligibleQuestions.filter(q => q.topic === options.topic);
  }
  if (options?.subtopic) {
    eligibleQuestions = eligibleQuestions.filter(q => q.subtopic === options.subtopic);
  }

  if (eligibleQuestions.length === 0) {
    return [];
  }

  // Build topic performance stats
  const topicPerformance = buildTopicPerformance(allQuestions, history);

  // Calculate priority scores for all eligible questions
  const scoredQuestions = eligibleQuestions.map(question => ({
    question,
    score: calculateQuestionPriority(question, history, topicPerformance, weights),
  }));

  // Sort by score (highest first)
  scoredQuestions.sort((a, b) => b.score - a.score);

  // Take top N questions
  const selected = scoredQuestions.slice(0, count).map(sq => sq.question);

  // Shuffle the selected questions so user doesn't always see hardest first
  return shuffleArray(selected);
}

/**
 * Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Convert database practice attempts to UserQuestionHistory map
 */
export function buildHistoryFromAttempts(
  attempts: Array<{
    question_id: string;
    is_correct: boolean;
    created_at: string;
  }>
): Map<string, UserQuestionHistory> {
  const history = new Map<string, UserQuestionHistory>();

  // Sort attempts by date (oldest first) so we process in order
  const sortedAttempts = [...attempts].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  for (const attempt of sortedAttempts) {
    const existing = history.get(attempt.question_id);

    if (existing) {
      // Update existing entry
      existing.attemptCount++;
      existing.attemptedAt = new Date(attempt.created_at);
      // Keep track of most recent result (or best result - if ever correct, mark as correct)
      if (attempt.is_correct) {
        existing.isCorrect = true;
      }
    } else {
      // New entry
      history.set(attempt.question_id, {
        questionId: attempt.question_id,
        isCorrect: attempt.is_correct,
        attemptedAt: new Date(attempt.created_at),
        attemptCount: 1,
      });
    }
  }

  return history;
}

/**
 * Get a summary of why questions were selected (for debugging/UI)
 */
export function getSelectionInsights(
  selectedQuestions: PracticeQuestion[],
  history: Map<string, UserQuestionHistory>,
  topicPerformance: Map<string, TopicPerformance>
): {
  reviewingMissed: number;
  newQuestions: number;
  lowCoverageTopics: string[];
  spacedReview: number;
} {
  let reviewingMissed = 0;
  let newQuestions = 0;
  let spacedReview = 0;
  const lowCoverageTopicsSet = new Set<string>();

  for (const q of selectedQuestions) {
    const qHistory = history.get(q.id);
    const topicStats = topicPerformance.get(q.topic);

    if (!qHistory) {
      newQuestions++;
    } else if (!qHistory.isCorrect) {
      reviewingMissed++;
    } else {
      const daysSince = (Date.now() - qHistory.attemptedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSince >= IDEAL_REVIEW_DAYS) {
        spacedReview++;
      }
    }

    if (topicStats && topicStats.coverage < 50) {
      lowCoverageTopicsSet.add(q.topic);
    }
  }

  return {
    reviewingMissed,
    newQuestions,
    lowCoverageTopics: [...lowCoverageTopicsSet],
    spacedReview,
  };
}
