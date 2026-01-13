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
  // Enable difficulty escalation based on user performance
  enableDifficultyEscalation?: boolean;
}

/**
 * Difficulty distribution based on user accuracy.
 * Higher performers get more hard questions to prepare for exam rigor.
 */
export interface DifficultyMix {
  easy: number;   // 0-1 proportion
  medium: number; // 0-1 proportion
  hard: number;   // 0-1 proportion
}

/**
 * Calculate the appropriate difficulty mix based on user's overall accuracy.
 * - High performers (85%+): Mostly hard questions
 * - Medium performers (70-84%): Balanced toward hard
 * - Building skills (<70%): More easy/medium to build confidence
 */
export function calculateDifficultyMix(accuracy: number): DifficultyMix {
  if (accuracy >= 85) {
    // High performer - challenge them
    return { easy: 0.1, medium: 0.3, hard: 0.6 };
  } else if (accuracy >= 70) {
    // Medium performer - balanced toward hard
    return { easy: 0.2, medium: 0.4, hard: 0.4 };
  } else {
    // Building skills - more accessible questions
    return { easy: 0.3, medium: 0.5, hard: 0.2 };
  }
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
 * Calculate user's overall accuracy from history
 */
function calculateOverallAccuracy(history: Map<string, UserQuestionHistory>): number {
  if (history.size === 0) return 50; // Default to medium for new users

  let correct = 0;
  let total = 0;

  for (const entry of history.values()) {
    total++;
    if (entry.isCorrect) correct++;
  }

  return total > 0 ? Math.round((correct / total) * 100) : 50;
}

/**
 * Select questions adaptively based on user history
 * With optional difficulty escalation based on performance
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

  // Apply difficulty escalation if enabled and user has history
  const enableEscalation = options?.enableDifficultyEscalation !== false; // Default to true
  if (enableEscalation && history.size >= 10) {
    const accuracy = calculateOverallAccuracy(history);
    const difficultyMix = calculateDifficultyMix(accuracy);

    // Group questions by difficulty
    const byDifficulty = {
      easy: scoredQuestions.filter(sq => sq.question.difficulty === 'easy'),
      medium: scoredQuestions.filter(sq => sq.question.difficulty === 'medium' || !sq.question.difficulty),
      hard: scoredQuestions.filter(sq => sq.question.difficulty === 'hard'),
    };

    // Sort each group by priority
    byDifficulty.easy.sort((a, b) => b.score - a.score);
    byDifficulty.medium.sort((a, b) => b.score - a.score);
    byDifficulty.hard.sort((a, b) => b.score - a.score);

    // Calculate target counts for each difficulty
    const targetCounts = {
      easy: Math.round(count * difficultyMix.easy),
      medium: Math.round(count * difficultyMix.medium),
      hard: Math.round(count * difficultyMix.hard),
    };

    // Select questions from each difficulty group
    const selected: PracticeQuestion[] = [];

    // Add questions by difficulty, filling gaps if a category doesn't have enough
    const addFromGroup = (group: typeof byDifficulty.easy, target: number) => {
      const toAdd = Math.min(target, group.length);
      for (let i = 0; i < toAdd && selected.length < count; i++) {
        selected.push(group[i].question);
      }
    };

    addFromGroup(byDifficulty.hard, targetCounts.hard);
    addFromGroup(byDifficulty.medium, targetCounts.medium);
    addFromGroup(byDifficulty.easy, targetCounts.easy);

    // Fill remaining slots with highest priority remaining questions
    const usedIds = new Set(selected.map(q => q.id));
    const remaining = scoredQuestions
      .filter(sq => !usedIds.has(sq.question.id))
      .sort((a, b) => b.score - a.score);

    for (const sq of remaining) {
      if (selected.length >= count) break;
      selected.push(sq.question);
    }

    // Shuffle the selected questions so user doesn't always see hardest first
    return shuffleArray(selected);
  }

  // Standard selection without difficulty escalation
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
