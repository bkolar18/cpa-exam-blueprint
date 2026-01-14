-- Migration: Add exam_history_id to tbs_attempts
-- Date: January 14, 2026
--
-- This column links TBS attempts to exam simulation history records.
-- When NULL, the TBS attempt is a standalone practice session.
-- When populated, the TBS attempt is part of an exam simulation.

-- Add exam_history_id column
ALTER TABLE tbs_attempts
ADD COLUMN IF NOT EXISTS exam_history_id UUID REFERENCES exam_simulation_history(id) ON DELETE SET NULL;

-- Add index for querying standalone TBS vs exam TBS
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_exam_history ON tbs_attempts(exam_history_id);

-- Add index for finding standalone TBS practice (exam_history_id IS NULL)
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_standalone ON tbs_attempts(user_id, is_complete)
WHERE exam_history_id IS NULL;

COMMENT ON COLUMN tbs_attempts.exam_history_id IS 'Reference to exam simulation history - NULL for standalone TBS practice';
