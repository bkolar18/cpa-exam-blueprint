-- Migration: Create question_feedback table
-- Date: 2026-01-16
-- Purpose: Allow users to submit feedback on practice questions

-- ============================================================================
-- 1. Create question_feedback table
-- ============================================================================

CREATE TABLE IF NOT EXISTS question_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('wrong_answer', 'unclear', 'outdated', 'typo', 'other')),
  comment TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_notes TEXT,
  resolved_at TIMESTAMPTZ,
  resolved_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE question_feedback IS 'User-reported issues with practice questions';
COMMENT ON COLUMN question_feedback.feedback_type IS 'Type of issue: wrong_answer, unclear, outdated, typo, other';
COMMENT ON COLUMN question_feedback.status IS 'Review status: pending, reviewed, resolved, dismissed';

-- ============================================================================
-- 2. Create indexes
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_question_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_question_feedback_section ON question_feedback(section);
CREATE INDEX IF NOT EXISTS idx_question_feedback_question_id ON question_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_question_feedback_created_at ON question_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_question_feedback_user_id ON question_feedback(user_id);

-- ============================================================================
-- 3. Enable RLS and create policies
-- ============================================================================

ALTER TABLE question_feedback ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert own feedback" ON question_feedback;
DROP POLICY IF EXISTS "Users can view own feedback" ON question_feedback;
DROP POLICY IF EXISTS "Admins can view all feedback" ON question_feedback;
DROP POLICY IF EXISTS "Admins can update feedback" ON question_feedback;

-- Users can insert their own feedback
CREATE POLICY "Users can insert own feedback" ON question_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON question_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can do everything (for admin API routes)
-- Note: Service role bypasses RLS by default, but we add this for clarity

-- ============================================================================
-- Migration complete!
-- ============================================================================
