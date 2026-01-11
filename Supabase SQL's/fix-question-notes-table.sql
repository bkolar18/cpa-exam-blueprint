-- Fix Question Notes Table
-- Run this in Supabase SQL Editor to recreate the question_notes table
-- This will drop any existing (broken) table and create it with correct schema

-- Drop existing table and recreate
DROP TABLE IF EXISTS question_notes CASCADE;

-- Create fresh table with all required columns
CREATE TABLE question_notes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  note TEXT NOT NULL,
  is_starred BOOLEAN DEFAULT FALSE,
  confidence INTEGER CHECK (confidence >= 1 AND confidence <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Create indexes for common queries
CREATE INDEX idx_question_notes_user ON question_notes(user_id);
CREATE INDEX idx_question_notes_question ON question_notes(question_id);
CREATE INDEX idx_question_notes_section ON question_notes(section);
CREATE INDEX idx_question_notes_starred ON question_notes(is_starred) WHERE is_starred = TRUE;

-- Enable Row Level Security
ALTER TABLE question_notes ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own notes
CREATE POLICY "Users can view own question notes" ON question_notes
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own question notes" ON question_notes
  FOR ALL USING (auth.uid() = user_id);

-- Verify table was created
SELECT 'question_notes table created successfully' AS status;
