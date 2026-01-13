-- CPA Exam Blueprint Database Schema
-- Run this in Supabase SQL Editor to set up the database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  state_code TEXT,
  target_completion_date DATE,
  discipline_choice TEXT CHECK (discipline_choice IN ('TCP', 'BAR', 'ISC')),
  weekly_study_hours INTEGER,
  working_full_time BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NTS Entries table
CREATE TABLE nts_entries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  issue_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'used', 'expired')),
  exam_scheduled_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study Sessions table
CREATE TABLE study_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  date DATE NOT NULL,
  hours DECIMAL(4,2) NOT NULL CHECK (hours > 0 AND hours <= 24),
  notes TEXT,
  topics_covered TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Section Progress table
CREATE TABLE section_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'studying', 'scheduled', 'passed', 'failed')),
  start_date DATE,
  exam_date DATE,
  score INTEGER CHECK (score >= 0 AND score <= 99),
  attempt_number INTEGER DEFAULT 1,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section, attempt_number)
);

-- Practice Attempts table
CREATE TABLE practice_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT,
  selected_answer TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_spent_seconds INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_nts_user ON nts_entries(user_id);
CREATE INDEX idx_nts_expiration ON nts_entries(expiration_date);
CREATE INDEX idx_study_sessions_user ON study_sessions(user_id);
CREATE INDEX idx_study_sessions_date ON study_sessions(date);
CREATE INDEX idx_section_progress_user ON section_progress(user_id);
CREATE INDEX idx_practice_attempts_user ON practice_attempts(user_id);
CREATE INDEX idx_practice_attempts_section ON practice_attempts(section);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE nts_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_attempts ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own NTS entries" ON nts_entries
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own NTS entries" ON nts_entries
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own study sessions" ON study_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own study sessions" ON study_sessions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own section progress" ON section_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own section progress" ON section_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own practice attempts" ON practice_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own practice attempts" ON practice_attempts
  FOR ALL USING (auth.uid() = user_id);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_nts_entries_updated_at
  BEFORE UPDATE ON nts_entries
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_section_progress_updated_at
  BEFORE UPDATE ON section_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
