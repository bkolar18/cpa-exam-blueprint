-- Question Flags Table
-- Allows users to flag questions for review (return to, difficult, easy)

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS question_flags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, question_id)
);

-- Add flag columns if they don't exist
ALTER TABLE question_flags ADD COLUMN IF NOT EXISTS flag_return_to BOOLEAN DEFAULT FALSE;
ALTER TABLE question_flags ADD COLUMN IF NOT EXISTS flag_difficult BOOLEAN DEFAULT FALSE;
ALTER TABLE question_flags ADD COLUMN IF NOT EXISTS flag_easy BOOLEAN DEFAULT FALSE;

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_question_flags_user ON question_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_question_flags_section ON question_flags(user_id, section);
CREATE INDEX IF NOT EXISTS idx_question_flags_return_to ON question_flags(user_id, flag_return_to) WHERE flag_return_to = TRUE;
CREATE INDEX IF NOT EXISTS idx_question_flags_difficult ON question_flags(user_id, flag_difficult) WHERE flag_difficult = TRUE;
CREATE INDEX IF NOT EXISTS idx_question_flags_easy ON question_flags(user_id, flag_easy) WHERE flag_easy = TRUE;

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
