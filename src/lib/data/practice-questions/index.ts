import { farQuestions } from './far';
import { audQuestions } from './aud';
import { regQuestions } from './reg';
import { tcpQuestions } from './tcp';
import { barQuestions } from './bar';
import { iscQuestions } from './isc';
import { QuestionSet, PracticeQuestion, SectionCode } from './types';

export * from './types';
export { farQuestions } from './far';
export { audQuestions } from './aud';
export { regQuestions } from './reg';
export { tcpQuestions } from './tcp';
export { barQuestions } from './bar';
export { iscQuestions } from './isc';

// Combined questions lookup
export const questionSets: Record<SectionCode, QuestionSet | null> = {
  FAR: farQuestions,
  AUD: audQuestions,
  REG: regQuestions,
  TCP: tcpQuestions,
  BAR: barQuestions,
  ISC: iscQuestions,
};

// Get all questions for a section
export function getQuestionsBySection(section: SectionCode): PracticeQuestion[] {
  const questionSet = questionSets[section];
  return questionSet?.questions || [];
}

// Get questions filtered by topic
export function getQuestionsByTopic(section: SectionCode, topic: string): PracticeQuestion[] {
  const questions = getQuestionsBySection(section);
  return questions.filter(q => q.topic === topic);
}

// Get questions filtered by difficulty
export function getQuestionsByDifficulty(
  section: SectionCode,
  difficulty: 'easy' | 'medium' | 'hard'
): PracticeQuestion[] {
  const questions = getQuestionsBySection(section);
  return questions.filter(q => q.difficulty === difficulty);
}

// Get a random subset of questions
export function getRandomQuestions(
  section: SectionCode,
  count: number,
  options?: {
    topic?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
  }
): PracticeQuestion[] {
  let questions = getQuestionsBySection(section);

  if (options?.topic) {
    questions = questions.filter(q => q.topic === options.topic);
  }
  if (options?.difficulty) {
    questions = questions.filter(q => q.difficulty === options.difficulty);
  }

  // Shuffle and take the requested count
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Get question by ID
export function getQuestionById(id: string): PracticeQuestion | undefined {
  const allQuestions = [
    ...(farQuestions?.questions || []),
    ...(audQuestions?.questions || []),
    ...(regQuestions?.questions || []),
    ...(tcpQuestions?.questions || []),
    ...(barQuestions?.questions || []),
    ...(iscQuestions?.questions || []),
  ];
  return allQuestions.find(q => q.id === id);
}

// Get topics for a section
export function getTopicsForSection(section: SectionCode): string[] {
  const questionSet = questionSets[section];
  return questionSet?.topics || [];
}

// Get question count by section
export function getQuestionCount(section: SectionCode): number {
  const questions = getQuestionsBySection(section);
  return questions.length;
}

// Check if section has questions
export function sectionHasQuestions(section: SectionCode): boolean {
  return getQuestionCount(section) > 0;
}
