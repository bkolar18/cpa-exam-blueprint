-- ============================================================================
-- CPA EXAM BLUEPRINT - CONSOLIDATED DATABASE SCHEMA
-- ============================================================================
--
-- This file combines all pending SQL migrations into one file for upload.
-- Run this in Supabase SQL Editor to set up the complete database.
--
-- Last Updated: January 9, 2026
--
-- Execution Order:
-- 1. Core schema (profiles, study tracking)
-- 2. Gamification (badges, achievements)
-- 3. Admin features (feedback, analytics)
-- 4. Question notes (personal study notes)
-- 5. Adaptive learning (intelligent question selection)
-- 6. Question flags (flagging system)
-- 7. TBS (Task-Based Simulations)
--
-- ============================================================================


-- ============================================================================
-- SECTION 1: CORE SCHEMA
-- ============================================================================
-- Source: supabase-schema.sql

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT UNIQUE,
  avatar_url TEXT,
  discipline_choice TEXT CHECK (discipline_choice IN ('TCP', 'BAR', 'ISC')),
  study_goal_hours_per_week INTEGER DEFAULT 20,
  target_exam_date DATE,
  timezone TEXT DEFAULT 'America/New_York',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NTS (Notice to Schedule) entries
CREATE TABLE IF NOT EXISTS nts_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  nts_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  scheduled_date DATE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'expired')),
  score INTEGER CHECK (score >= 0 AND score <= 99),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('video', 'reading', 'practice', 'review', 'simulation')),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  topic TEXT,
  notes TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section progress tracking
CREATE TABLE IF NOT EXISTS section_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_studied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section, topic, subtopic)
);

-- Practice attempts
CREATE TABLE IF NOT EXISTS practice_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  question_id TEXT NOT NULL,
  topic TEXT,
  subtopic TEXT,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  selected_answer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Helper function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at (drop first if exists)
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_nts_entries_updated_at ON nts_entries;
CREATE TRIGGER update_nts_entries_updated_at
  BEFORE UPDATE ON nts_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_section_progress_updated_at ON section_progress;
CREATE TRIGGER update_section_progress_updated_at
  BEFORE UPDATE ON section_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Indexes for core tables
CREATE INDEX IF NOT EXISTS idx_study_sessions_user ON study_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_study_sessions_section ON study_sessions(section);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_user ON practice_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_section ON practice_attempts(section);
CREATE INDEX IF NOT EXISTS idx_practice_attempts_question ON practice_attempts(question_id);

-- RLS for core tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nts_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_attempts ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- NTS entries policies
DROP POLICY IF EXISTS "Users can view own NTS entries" ON nts_entries;
CREATE POLICY "Users can view own NTS entries" ON nts_entries
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own NTS entries" ON nts_entries;
CREATE POLICY "Users can manage own NTS entries" ON nts_entries
  FOR ALL USING (auth.uid() = user_id);

-- Study sessions policies
DROP POLICY IF EXISTS "Users can view own study sessions" ON study_sessions;
CREATE POLICY "Users can view own study sessions" ON study_sessions
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own study sessions" ON study_sessions;
CREATE POLICY "Users can manage own study sessions" ON study_sessions
  FOR ALL USING (auth.uid() = user_id);

-- Section progress policies
DROP POLICY IF EXISTS "Users can view own section progress" ON section_progress;
CREATE POLICY "Users can view own section progress" ON section_progress
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own section progress" ON section_progress;
CREATE POLICY "Users can manage own section progress" ON section_progress
  FOR ALL USING (auth.uid() = user_id);

-- Practice attempts policies
DROP POLICY IF EXISTS "Users can view own practice attempts" ON practice_attempts;
CREATE POLICY "Users can view own practice attempts" ON practice_attempts
  FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can create own practice attempts" ON practice_attempts;
CREATE POLICY "Users can create own practice attempts" ON practice_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================================
-- SECTION 2: GAMIFICATION SCHEMA
-- ============================================================================
-- Source: supabase-gamification-schema.sql

-- Badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('streak', 'milestone', 'mastery', 'special')),
  requirement_type TEXT NOT NULL,
  requirement_value INTEGER NOT NULL,
  points INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to badges if table already existed
ALTER TABLE badges ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS requirement_type TEXT;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS requirement_value INTEGER;
ALTER TABLE badges ADD COLUMN IF NOT EXISTS points INTEGER DEFAULT 0;

-- Ensure unique constraint on name exists for ON CONFLICT
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'badges_name_key'
  ) THEN
    ALTER TABLE badges ADD CONSTRAINT badges_name_key UNIQUE (name);
  END IF;
END $$;

-- Handle any legacy NOT NULL columns that aren't in our INSERT (make nullable)
DO $$
DECLARE
  col RECORD;
BEGIN
  FOR col IN
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'badges'
    AND column_name NOT IN ('id', 'name', 'description', 'icon', 'category', 'requirement_type', 'requirement_value', 'points', 'created_at')
    AND is_nullable = 'NO'
  LOOP
    EXECUTE format('ALTER TABLE badges ALTER COLUMN %I DROP NOT NULL', col.column_name);
  END LOOP;
END $$;

-- Achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('practice', 'study', 'exam', 'social')),
  tiers JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add missing columns to achievements if table already existed
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS icon TEXT;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS category TEXT;
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS tiers JSONB DEFAULT '[]';

-- Ensure unique constraint on name exists for ON CONFLICT
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'achievements_name_key'
  ) THEN
    ALTER TABLE achievements ADD CONSTRAINT achievements_name_key UNIQUE (name);
  END IF;
END $$;

-- Handle any legacy NOT NULL columns that aren't in our INSERT (make nullable)
DO $$
DECLARE
  col RECORD;
BEGIN
  FOR col IN
    SELECT column_name FROM information_schema.columns
    WHERE table_name = 'achievements'
    AND column_name NOT IN ('id', 'name', 'description', 'icon', 'category', 'tiers', 'created_at')
    AND is_nullable = 'NO'
  LOOP
    EXECUTE format('ALTER TABLE achievements ALTER COLUMN %I DROP NOT NULL', col.column_name);
  END LOOP;
END $$;

-- User badges
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- User achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  current_tier INTEGER DEFAULT 0,
  progress INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Practice sessions for gamification
CREATE TABLE IF NOT EXISTS practice_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  time_spent_seconds INTEGER DEFAULT 0,
  streak_maintained BOOLEAN DEFAULT false,
  points_earned INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for gamification
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user ON practice_sessions(user_id);

-- RLS for gamification
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Badges viewable by all" ON badges;
CREATE POLICY "Badges viewable by all" ON badges FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Achievements viewable by all" ON achievements;
CREATE POLICY "Achievements viewable by all" ON achievements FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can view own badges" ON user_badges;
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own practice sessions" ON practice_sessions;
CREATE POLICY "Users can manage own practice sessions" ON practice_sessions FOR ALL USING (auth.uid() = user_id);

-- Seed badges
INSERT INTO badges (name, description, icon, category, requirement_type, requirement_value, points) VALUES
  ('First Steps', 'Complete your first practice question', '🎯', 'milestone', 'questions_answered', 1, 10),
  ('Warm Up', 'Answer 10 questions', '🔥', 'milestone', 'questions_answered', 10, 25),
  ('Century Club', 'Answer 100 questions', '💯', 'milestone', 'questions_answered', 100, 100),
  ('Question Master', 'Answer 500 questions', '🏆', 'milestone', 'questions_answered', 500, 250),
  ('Question Legend', 'Answer 1000 questions', '👑', 'milestone', 'questions_answered', 1000, 500),
  ('Perfect 10', 'Get 10 questions correct in a row', '⭐', 'streak', 'correct_streak', 10, 50),
  ('On Fire', 'Get 25 questions correct in a row', '🔥', 'streak', 'correct_streak', 25, 100),
  ('Unstoppable', 'Get 50 questions correct in a row', '💫', 'streak', 'correct_streak', 50, 200),
  ('FAR Explorer', 'Complete 50 FAR questions', '📊', 'mastery', 'section_questions_far', 50, 75),
  ('FAR Master', 'Complete 200 FAR questions', '📈', 'mastery', 'section_questions_far', 200, 200),
  ('AUD Explorer', 'Complete 50 AUD questions', '🔍', 'mastery', 'section_questions_aud', 50, 75),
  ('AUD Master', 'Complete 200 AUD questions', '🔎', 'mastery', 'section_questions_aud', 200, 200),
  ('REG Explorer', 'Complete 50 REG questions', '⚖️', 'mastery', 'section_questions_reg', 50, 75),
  ('REG Master', 'Complete 200 REG questions', '📜', 'mastery', 'section_questions_reg', 200, 200),
  ('Daily Dedication', 'Study 3 days in a row', '📅', 'streak', 'daily_streak', 3, 30),
  ('Week Warrior', 'Study 7 days in a row', '🗓️', 'streak', 'daily_streak', 7, 75),
  ('Month Master', 'Study 30 days in a row', '📆', 'streak', 'daily_streak', 30, 300),
  ('Night Owl', 'Study after 10 PM', '🦉', 'special', 'study_time_late', 1, 15),
  ('Early Bird', 'Study before 6 AM', '🐦', 'special', 'study_time_early', 1, 15),
  ('Weekend Warrior', 'Study on both Saturday and Sunday', '⚔️', 'special', 'weekend_study', 1, 25)
ON CONFLICT (name) DO NOTHING;

-- Seed achievements
INSERT INTO achievements (name, description, icon, category, tiers) VALUES
  ('Practice Pro', 'Master the art of practice', '🎯', 'practice',
   '[{"tier": 1, "requirement": 50, "reward": 25}, {"tier": 2, "requirement": 200, "reward": 75}, {"tier": 3, "requirement": 500, "reward": 150}, {"tier": 4, "requirement": 1000, "reward": 300}]'),
  ('Accuracy Ace', 'Maintain high accuracy', '🎯', 'practice',
   '[{"tier": 1, "requirement": 70, "reward": 50}, {"tier": 2, "requirement": 80, "reward": 100}, {"tier": 3, "requirement": 90, "reward": 200}]'),
  ('Study Scholar', 'Log study hours', '📚', 'study',
   '[{"tier": 1, "requirement": 10, "reward": 25}, {"tier": 2, "requirement": 50, "reward": 100}, {"tier": 3, "requirement": 100, "reward": 250}, {"tier": 4, "requirement": 200, "reward": 500}]'),
  ('Section Specialist', 'Complete all topics in a section', '🎓', 'exam',
   '[{"tier": 1, "requirement": 1, "reward": 100}, {"tier": 2, "requirement": 3, "reward": 300}, {"tier": 3, "requirement": 6, "reward": 750}]')
ON CONFLICT (name) DO NOTHING;


-- ============================================================================
-- SECTION 3: ADMIN SCHEMA
-- ============================================================================
-- Source: supabase-admin-schema.sql

-- Question feedback
CREATE TABLE IF NOT EXISTS question_feedback (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  question_id TEXT NOT NULL,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('error', 'unclear', 'outdated', 'suggestion', 'other')),
  feedback_text TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  activity_type TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Question stats
CREATE TABLE IF NOT EXISTS question_stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question_id TEXT NOT NULL UNIQUE,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  times_attempted INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  avg_time_seconds DECIMAL(10,2),
  difficulty_rating DECIMAL(3,2),
  last_attempted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  study_reminders BOOLEAN DEFAULT true,
  weekly_report BOOLEAN DEFAULT true,
  sound_effects BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure unique constraint on user_id exists for ON CONFLICT
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'user_preferences_user_id_key'
  ) THEN
    ALTER TABLE user_preferences ADD CONSTRAINT user_preferences_user_id_key UNIQUE (user_id);
  END IF;
END $$;

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'warning', 'success', 'update')),
  target_audience TEXT DEFAULT 'all' CHECK (target_audience IN ('all', 'free', 'premium')),
  is_active BOOLEAN DEFAULT true,
  starts_at TIMESTAMPTZ DEFAULT NOW(),
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for admin tables
CREATE INDEX IF NOT EXISTS idx_question_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_activity_log_user ON activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_type ON activity_log(activity_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_question_stats_question ON question_stats(question_id);
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, starts_at, ends_at);

-- RLS for admin tables
ALTER TABLE question_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create feedback" ON question_feedback;
CREATE POLICY "Users can create feedback" ON question_feedback FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can view own feedback" ON question_feedback;
CREATE POLICY "Users can view own feedback" ON question_feedback FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Question stats viewable by all" ON question_stats;
CREATE POLICY "Question stats viewable by all" ON question_stats FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "Users can manage own preferences" ON user_preferences;
CREATE POLICY "Users can manage own preferences" ON user_preferences FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Active announcements viewable by all" ON announcements;
CREATE POLICY "Active announcements viewable by all" ON announcements FOR SELECT TO authenticated USING (is_active = true AND starts_at <= NOW() AND (ends_at IS NULL OR ends_at > NOW()));

-- Triggers for admin tables
DROP TRIGGER IF EXISTS update_question_feedback_updated_at ON question_feedback;
CREATE TRIGGER update_question_feedback_updated_at
  BEFORE UPDATE ON question_feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_question_stats_updated_at ON question_stats;
CREATE TRIGGER update_question_stats_updated_at
  BEFORE UPDATE ON question_stats
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create preferences on profile creation
CREATE OR REPLACE FUNCTION handle_new_profile_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_profile_created_preferences ON profiles;
CREATE TRIGGER on_profile_created_preferences
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_profile_preferences();

-- Analytics views
CREATE OR REPLACE VIEW daily_active_users AS
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as active_users
FROM activity_log
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

CREATE OR REPLACE VIEW signup_trends AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as signups
FROM profiles
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;


-- ============================================================================
-- SECTION 4: QUESTION NOTES SCHEMA
-- ============================================================================
-- Source: supabase-question-notes-schema.sql

-- Question notes
CREATE TABLE IF NOT EXISTS question_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  note_text TEXT NOT NULL,
  is_starred BOOLEAN DEFAULT false,
  confidence_level INTEGER CHECK (confidence_level >= 1 AND confidence_level <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Indexes for question notes
CREATE INDEX IF NOT EXISTS idx_question_notes_user ON question_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_question_notes_question ON question_notes(question_id);
CREATE INDEX IF NOT EXISTS idx_question_notes_starred ON question_notes(user_id, is_starred) WHERE is_starred = true;
CREATE INDEX IF NOT EXISTS idx_question_notes_section ON question_notes(user_id, section);

-- RLS for question notes
ALTER TABLE question_notes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notes" ON question_notes;
CREATE POLICY "Users can view own notes" ON question_notes FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can create own notes" ON question_notes;
CREATE POLICY "Users can create own notes" ON question_notes FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own notes" ON question_notes;
CREATE POLICY "Users can update own notes" ON question_notes FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own notes" ON question_notes;
CREATE POLICY "Users can delete own notes" ON question_notes FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_question_notes_updated_at ON question_notes;
CREATE TRIGGER update_question_notes_updated_at
  BEFORE UPDATE ON question_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================================
-- SECTION 5: ADAPTIVE LEARNING SCHEMA
-- ============================================================================
-- Source: supabase-adaptive-learning-schema.sql

-- User topic performance
CREATE TABLE IF NOT EXISTS user_topic_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  total_attempts INTEGER DEFAULT 0,
  correct_attempts INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL(5,2) DEFAULT 0,
  avg_time_seconds DECIMAL(10,2),
  mastery_level TEXT DEFAULT 'weak' CHECK (mastery_level IN ('weak', 'moderate', 'mastered')),
  priority_score DECIMAL(5,2) DEFAULT 50,
  last_practiced_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Unique index to handle NULL subtopic values correctly
CREATE UNIQUE INDEX IF NOT EXISTS idx_topic_perf_unique
  ON user_topic_performance(user_id, section, topic, COALESCE(subtopic, ''));

-- Indexes for adaptive learning
CREATE INDEX IF NOT EXISTS idx_topic_perf_user ON user_topic_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_perf_section ON user_topic_performance(user_id, section);
CREATE INDEX IF NOT EXISTS idx_topic_perf_mastery ON user_topic_performance(user_id, mastery_level);
CREATE INDEX IF NOT EXISTS idx_topic_perf_priority ON user_topic_performance(user_id, priority_score DESC);

-- RLS for adaptive learning
ALTER TABLE user_topic_performance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own topic performance" ON user_topic_performance;
CREATE POLICY "Users can view own topic performance" ON user_topic_performance FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can manage own topic performance" ON user_topic_performance;
CREATE POLICY "Users can manage own topic performance" ON user_topic_performance FOR ALL USING (auth.uid() = user_id);

-- Function to update topic performance
CREATE OR REPLACE FUNCTION update_topic_performance()
RETURNS TRIGGER AS $$
DECLARE
  new_accuracy DECIMAL(5,2);
  new_mastery TEXT;
  new_priority DECIMAL(5,2);
BEGIN
  -- Calculate new accuracy
  SELECT
    CASE WHEN total_attempts > 0
      THEN (correct_attempts::DECIMAL / total_attempts) * 100
      ELSE 0
    END
  INTO new_accuracy
  FROM user_topic_performance
  WHERE id = NEW.id;

  -- Determine mastery level
  IF new_accuracy >= 85 AND NEW.total_attempts >= 10 THEN
    new_mastery := 'mastered';
    new_priority := 20;
  ELSIF new_accuracy >= 65 THEN
    new_mastery := 'moderate';
    new_priority := 50;
  ELSE
    new_mastery := 'weak';
    new_priority := 80;
  END IF;

  -- Adjust priority based on recency
  IF NEW.last_practiced_at IS NULL OR NEW.last_practiced_at < NOW() - INTERVAL '7 days' THEN
    new_priority := new_priority + 10;
  END IF;

  -- Update the record
  NEW.accuracy_percentage := new_accuracy;
  NEW.mastery_level := new_mastery;
  NEW.priority_score := LEAST(100, new_priority);
  NEW.updated_at := NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS calculate_topic_performance ON user_topic_performance;
CREATE TRIGGER calculate_topic_performance
  BEFORE UPDATE ON user_topic_performance
  FOR EACH ROW EXECUTE FUNCTION update_topic_performance();

-- Function to get adaptive question distribution
CREATE OR REPLACE FUNCTION get_adaptive_distribution(p_user_id UUID, p_section TEXT)
RETURNS TABLE (
  topic TEXT,
  subtopic TEXT,
  weight DECIMAL(5,2),
  mastery_level TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    utp.topic,
    utp.subtopic,
    utp.priority_score as weight,
    utp.mastery_level
  FROM user_topic_performance utp
  WHERE utp.user_id = p_user_id
    AND utp.section = p_section
  ORDER BY utp.priority_score DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_adaptive_distribution(UUID, TEXT) TO authenticated;


-- ============================================================================
-- SECTION 6: QUESTION FLAGS SCHEMA
-- ============================================================================
-- Source: supabase-question-flags-schema.sql

-- Question flags
CREATE TABLE IF NOT EXISTS question_flags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  flag_type TEXT NOT NULL CHECK (flag_type IN ('return_to', 'difficult', 'easy', 'review')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Indexes for question flags
CREATE INDEX IF NOT EXISTS idx_question_flags_user ON question_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_question_flags_section ON question_flags(user_id, section);
CREATE INDEX IF NOT EXISTS idx_question_flags_type ON question_flags(user_id, flag_type);

-- RLS for question flags
ALTER TABLE question_flags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own flags" ON question_flags;
CREATE POLICY "Users can view own flags" ON question_flags FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can create own flags" ON question_flags;
CREATE POLICY "Users can create own flags" ON question_flags FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own flags" ON question_flags;
CREATE POLICY "Users can update own flags" ON question_flags FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own flags" ON question_flags;
CREATE POLICY "Users can delete own flags" ON question_flags FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at
DROP TRIGGER IF EXISTS update_question_flags_updated_at ON question_flags;
CREATE TRIGGER update_question_flags_updated_at
  BEFORE UPDATE ON question_flags
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================================
-- SECTION 7: TASK-BASED SIMULATIONS (TBS) SCHEMA
-- ============================================================================
-- Source: supabase-tbs-schema.sql

-- TBS Questions Master Table
CREATE TABLE IF NOT EXISTS tbs_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  tbs_type TEXT NOT NULL CHECK (tbs_type IN (
    'numeric_entry',
    'document_review',
    'journal_entry',
    'research',
    'reconciliation',
    'written_communication'
  )),
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  title TEXT NOT NULL,
  scenario_text TEXT NOT NULL,
  time_estimate_minutes INTEGER DEFAULT 15,
  max_score_points INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tbs_questions IS 'Master table for Task-Based Simulation questions';

-- TBS Exhibits
CREATE TABLE IF NOT EXISTS tbs_exhibits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  exhibit_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  exhibit_type TEXT NOT NULL CHECK (exhibit_type IN (
    'memo', 'email', 'financial_statement', 'table',
    'invoice', 'contract', 'bank_statement', 'ledger',
    'tax_form', 'audit_report', 'image', 'text'
  )),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tbs_id, exhibit_order)
);

-- TBS Requirements
CREATE TABLE IF NOT EXISTS tbs_requirements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  requirement_order INTEGER NOT NULL,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN (
    'numeric',
    'dropdown',
    'journal_debit',
    'journal_credit',
    'text',
    'citation',
    'checkbox',
    'matching'
  )),
  label TEXT NOT NULL,
  description TEXT,
  cell_reference TEXT,
  grid_row INTEGER,
  grid_column INTEGER,
  points INTEGER NOT NULL DEFAULT 1,
  correct_answer JSONB NOT NULL,
  partial_credit_rules JSONB,
  explanation TEXT,
  hint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tbs_id, requirement_order)
);

-- TBS Dropdown Options
CREATE TABLE IF NOT EXISTS tbs_dropdown_options (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requirement_id UUID REFERENCES tbs_requirements(id) ON DELETE CASCADE NOT NULL,
  option_order INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  UNIQUE(requirement_id, option_order)
);

-- TBS Journal Entry Accounts
CREATE TABLE IF NOT EXISTS tbs_je_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT,
  account_type TEXT CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
  normal_balance TEXT CHECK (normal_balance IN ('debit', 'credit')),
  category TEXT,
  is_distractor BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

-- Authoritative Literature (For Research TBS)
CREATE TABLE IF NOT EXISTS tbs_authoritative_literature (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('FASB', 'AICPA', 'IRC', 'PCAOB', 'SEC', 'GASB')),
  topic_code TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  subtopic_code TEXT,
  subtopic_title TEXT,
  section_code TEXT,
  section_title TEXT,
  paragraph TEXT,
  content TEXT NOT NULL,
  keywords TEXT[],
  effective_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TBS Attempts
CREATE TABLE IF NOT EXISTS tbs_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  responses JSONB NOT NULL DEFAULT '{}',
  score_earned INTEGER,
  max_score INTEGER,
  score_percentage DECIMAL(5,2),
  grading_details JSONB,
  is_complete BOOLEAN DEFAULT false,
  last_saved_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Highlights (For Document Review)
CREATE TABLE IF NOT EXISTS tbs_user_highlights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  attempt_id UUID REFERENCES tbs_attempts(id) ON DELETE CASCADE NOT NULL,
  exhibit_id UUID REFERENCES tbs_exhibits(id) ON DELETE CASCADE NOT NULL,
  start_position INTEGER NOT NULL,
  end_position INTEGER NOT NULL,
  highlight_color TEXT DEFAULT 'yellow' CHECK (highlight_color IN ('yellow', 'green', 'blue', 'pink')),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TBS Indexes
CREATE INDEX IF NOT EXISTS idx_tbs_questions_section ON tbs_questions(section);
CREATE INDEX IF NOT EXISTS idx_tbs_questions_type ON tbs_questions(tbs_type);
CREATE INDEX IF NOT EXISTS idx_tbs_questions_topic ON tbs_questions(topic);
CREATE INDEX IF NOT EXISTS idx_tbs_questions_difficulty ON tbs_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_tbs_questions_active ON tbs_questions(is_active) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_tbs_exhibits_tbs ON tbs_exhibits(tbs_id);
CREATE INDEX IF NOT EXISTS idx_tbs_requirements_tbs ON tbs_requirements(tbs_id);
CREATE INDEX IF NOT EXISTS idx_tbs_requirements_type ON tbs_requirements(requirement_type);
CREATE INDEX IF NOT EXISTS idx_tbs_dropdown_requirement ON tbs_dropdown_options(requirement_id);
CREATE INDEX IF NOT EXISTS idx_tbs_je_accounts_tbs ON tbs_je_accounts(tbs_id);
CREATE INDEX IF NOT EXISTS idx_tbs_literature_source ON tbs_authoritative_literature(source);
CREATE INDEX IF NOT EXISTS idx_tbs_literature_topic ON tbs_authoritative_literature(topic_code);
CREATE INDEX IF NOT EXISTS idx_tbs_literature_keywords ON tbs_authoritative_literature USING GIN(keywords);
CREATE INDEX IF NOT EXISTS idx_tbs_literature_content_fts ON tbs_authoritative_literature USING GIN(to_tsvector('english', content));
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_user ON tbs_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_tbs ON tbs_attempts(tbs_id);
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_user_tbs ON tbs_attempts(user_id, tbs_id);
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_completed ON tbs_attempts(user_id, is_complete);
CREATE INDEX IF NOT EXISTS idx_tbs_highlights_attempt ON tbs_user_highlights(attempt_id);

-- TBS RLS
ALTER TABLE tbs_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_exhibits ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_dropdown_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_je_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_authoritative_literature ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_user_highlights ENABLE ROW LEVEL SECURITY;

-- TBS content policies (authenticated read)
DROP POLICY IF EXISTS "TBS questions viewable by authenticated users" ON tbs_questions;
CREATE POLICY "TBS questions viewable by authenticated users" ON tbs_questions
  FOR SELECT TO authenticated USING (is_active = true);

DROP POLICY IF EXISTS "TBS exhibits viewable by authenticated users" ON tbs_exhibits;
CREATE POLICY "TBS exhibits viewable by authenticated users" ON tbs_exhibits
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM tbs_questions WHERE tbs_questions.id = tbs_exhibits.tbs_id AND tbs_questions.is_active = true)
  );

DROP POLICY IF EXISTS "TBS requirements viewable by authenticated users" ON tbs_requirements;
CREATE POLICY "TBS requirements viewable by authenticated users" ON tbs_requirements
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM tbs_questions WHERE tbs_questions.id = tbs_requirements.tbs_id AND tbs_questions.is_active = true)
  );

DROP POLICY IF EXISTS "TBS dropdown options viewable by authenticated users" ON tbs_dropdown_options;
CREATE POLICY "TBS dropdown options viewable by authenticated users" ON tbs_dropdown_options
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM tbs_requirements r
      JOIN tbs_questions q ON q.id = r.tbs_id
      WHERE r.id = tbs_dropdown_options.requirement_id AND q.is_active = true
    )
  );

DROP POLICY IF EXISTS "TBS journal accounts viewable by authenticated users" ON tbs_je_accounts;
CREATE POLICY "TBS journal accounts viewable by authenticated users" ON tbs_je_accounts
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM tbs_questions WHERE tbs_questions.id = tbs_je_accounts.tbs_id AND tbs_questions.is_active = true)
  );

DROP POLICY IF EXISTS "Authoritative literature viewable by authenticated users" ON tbs_authoritative_literature;
CREATE POLICY "Authoritative literature viewable by authenticated users" ON tbs_authoritative_literature
  FOR SELECT TO authenticated USING (true);

-- TBS user attempt policies
DROP POLICY IF EXISTS "Users can view own TBS attempts" ON tbs_attempts;
CREATE POLICY "Users can view own TBS attempts" ON tbs_attempts FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can create own TBS attempts" ON tbs_attempts;
CREATE POLICY "Users can create own TBS attempts" ON tbs_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can update own TBS attempts" ON tbs_attempts;
CREATE POLICY "Users can update own TBS attempts" ON tbs_attempts FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "Users can delete own TBS attempts" ON tbs_attempts;
CREATE POLICY "Users can delete own TBS attempts" ON tbs_attempts FOR DELETE USING (auth.uid() = user_id);

-- TBS highlights policies
DROP POLICY IF EXISTS "Users can view own highlights" ON tbs_user_highlights;
CREATE POLICY "Users can view own highlights" ON tbs_user_highlights
  FOR SELECT USING (EXISTS (SELECT 1 FROM tbs_attempts WHERE tbs_attempts.id = tbs_user_highlights.attempt_id AND tbs_attempts.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can create own highlights" ON tbs_user_highlights;
CREATE POLICY "Users can create own highlights" ON tbs_user_highlights
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM tbs_attempts WHERE tbs_attempts.id = tbs_user_highlights.attempt_id AND tbs_attempts.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can delete own highlights" ON tbs_user_highlights;
CREATE POLICY "Users can delete own highlights" ON tbs_user_highlights
  FOR DELETE USING (EXISTS (SELECT 1 FROM tbs_attempts WHERE tbs_attempts.id = tbs_user_highlights.attempt_id AND tbs_attempts.user_id = auth.uid()));

-- TBS Triggers
DROP TRIGGER IF EXISTS update_tbs_questions_updated_at ON tbs_questions;
CREATE TRIGGER update_tbs_questions_updated_at
  BEFORE UPDATE ON tbs_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_tbs_literature_updated_at ON tbs_authoritative_literature;
CREATE TRIGGER update_tbs_literature_updated_at
  BEFORE UPDATE ON tbs_authoritative_literature
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-save trigger for TBS attempts
CREATE OR REPLACE FUNCTION update_tbs_attempt_last_saved()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_saved_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_tbs_attempt_saved ON tbs_attempts;
CREATE TRIGGER update_tbs_attempt_saved
  BEFORE UPDATE ON tbs_attempts
  FOR EACH ROW EXECUTE FUNCTION update_tbs_attempt_last_saved();

-- TBS Helper Functions
CREATE OR REPLACE FUNCTION get_tbs_with_details(p_tbs_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'question', row_to_json(q),
    'exhibits', (
      SELECT json_agg(row_to_json(e) ORDER BY e.exhibit_order)
      FROM tbs_exhibits e WHERE e.tbs_id = q.id
    ),
    'requirements', (
      SELECT json_agg(
        json_build_object(
          'requirement', row_to_json(r),
          'dropdown_options', (
            SELECT json_agg(row_to_json(d) ORDER BY d.option_order)
            FROM tbs_dropdown_options d WHERE d.requirement_id = r.id
          )
        ) ORDER BY r.requirement_order
      )
      FROM tbs_requirements r WHERE r.tbs_id = q.id
    ),
    'journal_accounts', (
      SELECT json_agg(row_to_json(ja) ORDER BY ja.display_order)
      FROM tbs_je_accounts ja WHERE ja.tbs_id = q.id
    )
  ) INTO result
  FROM tbs_questions q
  WHERE q.id = p_tbs_id AND q.is_active = true;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION search_authoritative_literature(
  p_query TEXT,
  p_source TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  source TEXT,
  topic_code TEXT,
  topic_title TEXT,
  section_code TEXT,
  content TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    al.id,
    al.source,
    al.topic_code,
    al.topic_title,
    al.section_code,
    al.content,
    ts_rank(to_tsvector('english', al.content), plainto_tsquery('english', p_query)) AS rank
  FROM tbs_authoritative_literature al
  WHERE
    (p_source IS NULL OR al.source = p_source)
    AND (
      to_tsvector('english', al.content) @@ plainto_tsquery('english', p_query)
      OR al.topic_code ILIKE '%' || p_query || '%'
      OR al.topic_title ILIKE '%' || p_query || '%'
      OR p_query = ANY(al.keywords)
    )
  ORDER BY rank DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_user_tbs_stats(p_user_id UUID, p_section TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_attempts', COUNT(*),
    'completed_attempts', COUNT(*) FILTER (WHERE is_complete = true),
    'average_score', ROUND(AVG(score_percentage) FILTER (WHERE is_complete = true), 2),
    'average_time_minutes', ROUND(AVG(time_spent_seconds / 60.0) FILTER (WHERE is_complete = true), 1),
    'unique_tbs_attempted', COUNT(DISTINCT tbs_id),
    'score_by_type', (
      SELECT json_object_agg(
        q.tbs_type,
        ROUND(AVG(a.score_percentage), 2)
      )
      FROM tbs_attempts a
      JOIN tbs_questions q ON q.id = a.tbs_id
      WHERE a.user_id = p_user_id
        AND a.is_complete = true
        AND (p_section IS NULL OR q.section = p_section)
      GROUP BY q.tbs_type
    )
  ) INTO result
  FROM tbs_attempts a
  JOIN tbs_questions q ON q.id = a.tbs_id
  WHERE a.user_id = p_user_id
    AND (p_section IS NULL OR q.section = p_section);

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant function access
GRANT EXECUTE ON FUNCTION get_tbs_with_details(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION search_authoritative_literature(TEXT, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_tbs_stats(UUID, TEXT) TO authenticated;


-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================
-- All schemas have been created successfully!
--
-- Tables created:
-- - profiles, nts_entries, study_sessions, section_progress, practice_attempts
-- - badges, achievements, user_badges, user_achievements, practice_sessions
-- - question_feedback, activity_log, question_stats, user_preferences, announcements
-- - question_notes
-- - user_topic_performance
-- - question_flags
-- - tbs_questions, tbs_exhibits, tbs_requirements, tbs_dropdown_options
-- - tbs_je_accounts, tbs_authoritative_literature, tbs_attempts, tbs_user_highlights
--
-- All RLS policies, indexes, triggers, and helper functions are in place.
-- ============================================================================
