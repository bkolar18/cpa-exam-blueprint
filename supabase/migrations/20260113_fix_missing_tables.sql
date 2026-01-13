-- Fix missing tables and columns for MCQ practice functionality
-- Run this in Supabase SQL Editor

-- =============================================
-- 1. Add difficulty column to practice_attempts
-- =============================================
ALTER TABLE practice_attempts
ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'medium';

-- =============================================
-- 2. Create question_flags table if it doesn't exist
-- =============================================
CREATE TABLE IF NOT EXISTS question_flags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  flag_return_to BOOLEAN DEFAULT FALSE,
  flag_difficult BOOLEAN DEFAULT FALSE,
  flag_easy BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_question_flags_user ON question_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_question_flags_section ON question_flags(user_id, section);
CREATE INDEX IF NOT EXISTS idx_question_flags_return_to ON question_flags(user_id, flag_return_to) WHERE flag_return_to = TRUE;

-- Enable RLS
ALTER TABLE question_flags ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own question flags" ON question_flags;
DROP POLICY IF EXISTS "Users can insert own question flags" ON question_flags;
DROP POLICY IF EXISTS "Users can update own question flags" ON question_flags;
DROP POLICY IF EXISTS "Users can delete own question flags" ON question_flags;

-- RLS Policies
CREATE POLICY "Users can view own question flags" ON question_flags
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own question flags" ON question_flags
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own question flags" ON question_flags
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own question flags" ON question_flags
  FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON question_flags TO authenticated;

-- =============================================
-- 3. Make sure question_notes table exists and has correct columns
-- =============================================
CREATE TABLE IF NOT EXISTS question_notes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  note TEXT,
  is_starred BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Enable RLS on question_notes
ALTER TABLE question_notes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own question notes" ON question_notes;
DROP POLICY IF EXISTS "Users can insert own question notes" ON question_notes;
DROP POLICY IF EXISTS "Users can update own question notes" ON question_notes;
DROP POLICY IF EXISTS "Users can delete own question notes" ON question_notes;

-- RLS Policies for question_notes
CREATE POLICY "Users can view own question notes" ON question_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own question notes" ON question_notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own question notes" ON question_notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own question notes" ON question_notes
  FOR DELETE USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON question_notes TO authenticated;

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_question_notes_user ON question_notes(user_id);
CREATE INDEX IF NOT EXISTS idx_question_notes_starred ON question_notes(user_id, is_starred) WHERE is_starred = TRUE;
