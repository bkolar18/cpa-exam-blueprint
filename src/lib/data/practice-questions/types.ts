// Practice Question Types

export type SectionCode = 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';

export type QuestionFormat =
  | 'conceptual'      // "Which of the following is true..."
  | 'calculation'     // Requires math/computation
  | 'scenario'        // Case-based with context
  | 'except'          // "All of the following EXCEPT..."
  | 'best-answer'     // "Which is MOST appropriate..."
  | 'definition'      // Tests terminology
  | 'application'     // Apply rule to specific situation
  | 'MCQ';            // Standard multiple choice question

export interface PracticeQuestion {
  id: string;
  section: SectionCode;
  topic: string;
  subtopic: string;                    // More granular categorization
  conceptTested: string;               // Specific concept (e.g., "FIFO calculation", "Lease classification criteria")
  difficulty: 'easy' | 'medium' | 'hard';
  questionFormat: QuestionFormat;      // Type of question for variety tracking
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  tip?: string;
  calculationRequired?: boolean;       // Flag for questions needing math
  timeEstimateSeconds?: number;        // Expected time to answer (for adaptive pacing)
}

export interface QuestionSet {
  section: SectionCode;
  sectionName: string;
  topics: string[];
  questions: PracticeQuestion[];
}

export interface QuizResult {
  questionId: string;
  selectedAnswer: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface QuizSession {
  section: SectionCode;
  topic?: string;
  questions: PracticeQuestion[];
  results: QuizResult[];
  startTime: Date;
  endTime?: Date;
}
