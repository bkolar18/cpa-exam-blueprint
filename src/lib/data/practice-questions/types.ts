// Practice Question Types

export type SectionCode = 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';

export interface PracticeQuestion {
  id: string;
  section: SectionCode;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
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
