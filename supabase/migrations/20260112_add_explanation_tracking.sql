-- Add explanation engagement tracking to practice_attempts
-- This tracks how long users spend reviewing explanations after answering

-- Add column for explanation view duration (seconds spent before clicking Next)
ALTER TABLE practice_attempts
ADD COLUMN IF NOT EXISTS explanation_view_seconds INTEGER;

-- Create index for efficient engagement queries
CREATE INDEX IF NOT EXISTS idx_practice_attempts_explanation_view
ON practice_attempts (user_id, explanation_view_seconds)
WHERE explanation_view_seconds IS NOT NULL;

-- Comment explaining the column
COMMENT ON COLUMN practice_attempts.explanation_view_seconds IS
  'Seconds spent viewing the explanation after answering, before clicking Next. NULL means not tracked (legacy data).';
