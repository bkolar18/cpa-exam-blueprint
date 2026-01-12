-- Create exam_simulation_history table to store complete exam data for later review
CREATE TABLE IF NOT EXISTS exam_simulation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  exam_type TEXT NOT NULL CHECK (exam_type IN ('mini', 'mixed', 'realistic')),
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,

  -- Score tracking
  mcq_count INTEGER NOT NULL DEFAULT 0,
  mcq_correct INTEGER NOT NULL DEFAULT 0,
  mcq_score_percentage DECIMAL(5,2),
  tbs_count INTEGER NOT NULL DEFAULT 0,
  tbs_score_percentage DECIMAL(5,2),
  total_score_percentage DECIMAL(5,2),

  -- Time tracking
  time_limit_seconds INTEGER NOT NULL,
  time_spent_seconds INTEGER NOT NULL DEFAULT 0,

  -- Complete exam data stored as JSONB for full review capability
  -- mcq_responses format: [{questionId, selectedAnswer, isCorrect, timeSpent}]
  mcq_responses JSONB NOT NULL DEFAULT '[]'::jsonb,
  -- tbs_responses format: [{tbsId, responses, scoreEarned, maxScore, timeSpent}]
  tbs_responses JSONB NOT NULL DEFAULT '[]'::jsonb,

  -- Question IDs for reference
  mcq_question_ids TEXT[] NOT NULL DEFAULT '{}',
  tbs_question_ids TEXT[] NOT NULL DEFAULT '{}',

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_exam_history_user_id ON exam_simulation_history(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_history_section ON exam_simulation_history(section);
CREATE INDEX IF NOT EXISTS idx_exam_history_completed_at ON exam_simulation_history(completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_exam_history_user_section ON exam_simulation_history(user_id, section);

-- Enable RLS
ALTER TABLE exam_simulation_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own exam history"
  ON exam_simulation_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own exam history"
  ON exam_simulation_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own exam history"
  ON exam_simulation_history FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own exam history"
  ON exam_simulation_history FOR DELETE
  USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON exam_simulation_history TO authenticated;
