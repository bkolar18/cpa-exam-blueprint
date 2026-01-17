-- Fix Practice Sessions Tracking
-- Date: 2026-01-17
--
-- PROBLEM: The app saves individual question answers to `practice_attempts`
-- but the admin panel queries `practice_sessions` which is never populated.
--
-- SOLUTION: Add missing columns to practice_sessions, backfill from practice_attempts,
-- and set up a trigger to auto-create sessions going forward.
-- =============================================

-- =============================================
-- STEP 1: Add missing columns to existing practice_sessions table
-- =============================================
ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS session_date DATE DEFAULT CURRENT_DATE;

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS questions_answered INTEGER DEFAULT 0;

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS questions_correct INTEGER DEFAULT 0;

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0;

ALTER TABLE practice_sessions
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Backfill session_date from created_at for any existing rows
UPDATE practice_sessions
SET session_date = DATE(created_at)
WHERE session_date IS NULL;

-- =============================================
-- STEP 2: Add indexes for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user ON practice_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_date ON practice_sessions(session_date);
CREATE INDEX IF NOT EXISTS idx_practice_sessions_user_date ON practice_sessions(user_id, session_date);

-- =============================================
-- STEP 3: Add unique constraint for upsert to work
-- =============================================
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'practice_sessions_user_section_date_unique'
  ) THEN
    ALTER TABLE practice_sessions
    ADD CONSTRAINT practice_sessions_user_section_date_unique
    UNIQUE (user_id, section, session_date);
  END IF;
EXCEPTION WHEN others THEN
  RAISE NOTICE 'Constraint may already exist or conflict: %', SQLERRM;
END $$;

-- =============================================
-- STEP 4: RLS Policies (recreate to ensure they exist)
-- =============================================
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own practice sessions" ON practice_sessions;
CREATE POLICY "Users can view own practice sessions" ON practice_sessions
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own practice sessions" ON practice_sessions;
CREATE POLICY "Users can insert own practice sessions" ON practice_sessions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own practice sessions" ON practice_sessions;
CREATE POLICY "Users can update own practice sessions" ON practice_sessions
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role full access to practice_sessions" ON practice_sessions;
CREATE POLICY "Service role full access to practice_sessions" ON practice_sessions
  FOR ALL USING (true) WITH CHECK (true);

-- =============================================
-- STEP 5: Make started_at nullable (it was blocking inserts)
-- =============================================
ALTER TABLE practice_sessions
  ALTER COLUMN started_at DROP NOT NULL;

-- =============================================
-- STEP 6: Backfill practice_sessions from practice_attempts
-- This aggregates attempts by user/section/day into sessions
-- =============================================
INSERT INTO practice_sessions (user_id, section, questions_answered, questions_correct, time_spent_seconds, session_date, created_at, started_at)
SELECT
  user_id,
  section,
  COUNT(*) as questions_answered,
  SUM(CASE WHEN is_correct THEN 1 ELSE 0 END) as questions_correct,
  COALESCE(SUM(time_spent_seconds), 0) as time_spent_seconds,
  DATE(created_at) as session_date,
  MIN(created_at) as created_at,
  MIN(created_at) as started_at
FROM practice_attempts
WHERE user_id IS NOT NULL
  AND section IS NOT NULL
GROUP BY user_id, section, DATE(created_at)
ON CONFLICT (user_id, section, session_date) DO UPDATE SET
  questions_answered = EXCLUDED.questions_answered,
  questions_correct = EXCLUDED.questions_correct,
  time_spent_seconds = EXCLUDED.time_spent_seconds,
  updated_at = NOW();

-- =============================================
-- STEP 7: Create trigger function to auto-create/update sessions
-- =============================================
CREATE OR REPLACE FUNCTION update_practice_session()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO practice_sessions (
    user_id,
    section,
    questions_answered,
    questions_correct,
    time_spent_seconds,
    session_date,
    started_at,
    created_at,
    updated_at
  )
  VALUES (
    NEW.user_id,
    NEW.section,
    1,
    CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    COALESCE(NEW.time_spent_seconds, 0),
    DATE(NEW.created_at),
    NEW.created_at,
    NEW.created_at,
    NOW()
  )
  ON CONFLICT (user_id, section, session_date)
  DO UPDATE SET
    questions_answered = practice_sessions.questions_answered + 1,
    questions_correct = practice_sessions.questions_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    time_spent_seconds = practice_sessions.time_spent_seconds + COALESCE(NEW.time_spent_seconds, 0),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- STEP 7: Create the trigger
-- =============================================
DROP TRIGGER IF EXISTS trigger_update_practice_session ON practice_attempts;
CREATE TRIGGER trigger_update_practice_session
  AFTER INSERT ON practice_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_practice_session();

-- =============================================
-- STEP 7: Verify the fix
-- Run these queries after the migration:
-- =============================================
-- SELECT COUNT(*) as total_sessions FROM practice_sessions;
--
-- SELECT
--     p.id,
--     p.email,
--     p.created_at as signup_date,
--     (SELECT COUNT(*) FROM practice_sessions ps WHERE ps.user_id = p.id) as session_count,
--     (SELECT MAX(created_at) FROM practice_sessions ps WHERE ps.user_id = p.id) as last_active
-- FROM profiles p
-- ORDER BY p.created_at DESC;
