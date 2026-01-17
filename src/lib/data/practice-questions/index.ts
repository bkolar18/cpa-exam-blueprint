import { farQuestions } from './far';
import { audQuestions } from './aud';
import { regQuestions } from './reg';
import { tcpQuestions } from './tcp';
import { barQuestions } from './bar';
import { iscQuestions } from './isc';
// OBBBA versions (for post-July 2026 testing)
import { tcpQuestionsOBBBA } from './tcp-obbba';
import { regQuestionsOBBBA } from './reg-obbba';
import { QuestionSet, PracticeQuestion, SectionCode } from './types';
import {
  type TaxContentVersion,
  isTaxAffectedSection,
} from '@/lib/utils/tax-content-version';

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

/**
 * Versioned question sets for tax-affected sections (REG/TCP).
 *
 * For TCJA (pre-July 2026): Uses current content (2024 tax year figures)
 * For OBBBA (post-July 2026): Uses OBBBA-specific content
 *
 * Students select their version via Settings > Tax Content Version
 * or automatically based on their target completion date.
 */
export const versionedQuestionSets: Record<
  'REG' | 'TCP',
  Record<TaxContentVersion, QuestionSet | null>
> = {
  REG: {
    tcja: regQuestions,       // Current TCJA content (pre-July 2026)
    obbba: regQuestionsOBBBA, // OBBBA content (post-July 2026)
  },
  TCP: {
    tcja: tcpQuestions,       // Current TCJA content (pre-July 2026)
    obbba: tcpQuestionsOBBBA, // OBBBA content (post-July 2026)
  },
};

// Get all questions for a section
export function getQuestionsBySection(section: SectionCode): PracticeQuestion[] {
  const questionSet = questionSets[section];
  return questionSet?.questions || [];
}

/**
 * Get questions for a section with tax content version awareness.
 *
 * For tax-affected sections (REG, TCP), returns version-specific questions.
 * For non-tax sections (FAR, AUD, BAR, ISC), returns standard questions.
 *
 * @param section - The section code
 * @param taxContentVersion - The tax content version ('tcja' or 'obbba')
 * @returns Array of practice questions for the section
 */
export function getQuestionsBySectionVersioned(
  section: SectionCode,
  taxContentVersion: TaxContentVersion
): PracticeQuestion[] {
  // For non-tax sections, return standard questions
  if (!isTaxAffectedSection(section)) {
    return getQuestionsBySection(section);
  }

  // For REG/TCP, return version-specific questions
  const versionedSet = versionedQuestionSets[section as 'REG' | 'TCP'];
  const questionSet = versionedSet?.[taxContentVersion];

  // Fallback to standard questions if versioned set not available
  if (!questionSet) {
    console.warn(
      `Versioned question set not found for ${section}/${taxContentVersion}, falling back to default`
    );
    return getQuestionsBySection(section);
  }

  return questionSet.questions || [];
}

/**
 * Get question count for a section with version awareness.
 */
export function getQuestionCountVersioned(
  section: SectionCode,
  taxContentVersion: TaxContentVersion
): number {
  return getQuestionsBySectionVersioned(section, taxContentVersion).length;
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
    subtopic?: string;
    difficulty?: 'easy' | 'medium' | 'hard';
  }
): PracticeQuestion[] {
  let questions = getQuestionsBySection(section);

  if (options?.topic) {
    questions = questions.filter(q => q.topic === options.topic);
  }
  if (options?.subtopic) {
    questions = questions.filter(q => q.subtopic === options.subtopic);
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

// Get subtopics for a section, optionally filtered by topic
export function getSubtopicsForSection(section: SectionCode, topic?: string): string[] {
  const questions = getQuestionsBySection(section);
  const filteredQuestions = topic ? questions.filter(q => q.topic === topic) : questions;
  const subtopics = new Set<string>();
  filteredQuestions.forEach(q => {
    if (q.subtopic) {
      subtopics.add(q.subtopic);
    }
  });
  return [...subtopics].sort();
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
