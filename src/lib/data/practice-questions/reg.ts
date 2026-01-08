import { PracticeQuestion, QuestionSet } from './types';

// REG - Regulation
// Target: 1,200 questions
// Study Hours: 350-400

export const regQuestions: QuestionSet = {
  section: 'REG',
  sectionName: 'Regulation',
  topics: [
    'Ethics & Professional Responsibility',
    'Business Law',
    'Individual Taxation',
    'Property Transactions',
    'Corporate Taxation',
    'Partnership Taxation',
    'S Corporation Taxation',
  ],
  questions: [] as PracticeQuestion[],
};

// Questions will be imported from generated batches after review
// See docs/question-batches/ for generated questions pending review
