// Database types for Supabase

export type SectionCode = 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';
export type SectionStatus = 'not_started' | 'studying' | 'scheduled' | 'passed' | 'failed';
export type NTSStatus = 'active' | 'used' | 'expired';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  state_code: string | null;
  target_completion_date: string | null;
  discipline_choice: 'TCP' | 'BAR' | 'ISC' | null;
  weekly_study_hours: number | null;
  working_full_time: boolean | null;
  // Gamification fields
  total_points: number;
  badge_count: number;
  achievement_count: number;
  current_streak: number;
  longest_streak: number;
  last_study_date: string | null;
  promo_dismissed_at: string | null;
  // Subscription fields
  subscription_tier: 'free' | 'standard' | 'pro' | null;
  stripe_customer_id: string | null;
  stripe_payment_id: string | null;
  paid_at: string | null;
  payment_amount_cents: number | null;
  created_at: string;
  updated_at: string;
}

export interface NTSEntry {
  id: string;
  user_id: string;
  section: SectionCode;
  issue_date: string;
  expiration_date: string;
  status: NTSStatus;
  exam_scheduled_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface StudySession {
  id: string;
  user_id: string;
  section: SectionCode;
  date: string;
  hours: number;
  notes: string | null;
  topics_covered: string[] | null;
  created_at: string;
}

export interface SectionProgress {
  id: string;
  user_id: string;
  section: SectionCode;
  status: SectionStatus;
  start_date: string | null;
  exam_date: string | null;
  score: number | null;
  attempt_number: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PracticeAttempt {
  id: string;
  user_id: string;
  question_id: string;
  section: SectionCode;
  topic: string | null;
  selected_answer: string;
  correct_answer: string;
  is_correct: boolean;
  time_spent_seconds: number | null;
  created_at: string;
}

export interface QuestionNote {
  id: string;
  user_id: string;
  question_id: string;
  section: SectionCode;
  topic: string;
  subtopic: string | null;
  note: string;
  created_at: string;
  updated_at: string;
}

// Dashboard aggregated types
export interface DashboardStats {
  totalStudyHours: number;
  weeklyStudyHours: number;
  sectionsPassed: number;
  sectionsRemaining: number;
  currentStreak: number;
  practiceAccuracy: number;
}

export interface WeeklyProgress {
  date: string;
  hours: number;
}
