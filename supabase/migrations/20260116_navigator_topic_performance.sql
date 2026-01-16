-- Migration: Add user_topic_performance table and prime_meridian_score column
-- Date: 2026-01-16 (Fixed version - handles existing objects)
-- Purpose: Support Navigator AI context with topic-level performance tracking

-- ============================================================================
-- 1. Create user_topic_performance table (if not exists)
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_topic_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  accuracy DECIMAL(5,4) DEFAULT 0,
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  mastery_level TEXT DEFAULT 'weak' CHECK (mastery_level IN ('weak', 'moderate', 'mastered')),
  last_attempted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add missing columns if table already exists
ALTER TABLE user_topic_performance
ADD COLUMN IF NOT EXISTS questions_correct INTEGER DEFAULT 0;

ALTER TABLE user_topic_performance
ADD COLUMN IF NOT EXISTS last_attempted_at TIMESTAMPTZ;

-- Ensure unique constraint exists (create unique index which acts as constraint)
DROP INDEX IF EXISTS idx_user_topic_performance_unique;
CREATE UNIQUE INDEX idx_user_topic_performance_unique
  ON user_topic_performance(user_id, section, topic);

COMMENT ON TABLE user_topic_performance IS 'Tracks per-topic performance metrics for Navigator AI personalization';

-- ============================================================================
-- 2. Enable RLS and recreate policies for user_topic_performance
-- ============================================================================

ALTER TABLE user_topic_performance ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own topic performance" ON user_topic_performance;
DROP POLICY IF EXISTS "Users can insert own topic performance" ON user_topic_performance;
DROP POLICY IF EXISTS "Users can update own topic performance" ON user_topic_performance;
DROP POLICY IF EXISTS "Users can delete own topic performance" ON user_topic_performance;

CREATE POLICY "Users can view own topic performance"
  ON user_topic_performance FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topic performance"
  ON user_topic_performance FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topic performance"
  ON user_topic_performance FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own topic performance"
  ON user_topic_performance FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 3. Create indexes for user_topic_performance
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_user_topic_performance_user_id
  ON user_topic_performance(user_id);

CREATE INDEX IF NOT EXISTS idx_user_topic_performance_user_section
  ON user_topic_performance(user_id, section);

-- ============================================================================
-- 4. Add prime_meridian_score column to section_progress
-- ============================================================================

ALTER TABLE section_progress
ADD COLUMN IF NOT EXISTS prime_meridian_score INTEGER;

COMMENT ON COLUMN section_progress.prime_meridian_score IS 'Prime Meridian exam readiness score (0-100)';

-- ============================================================================
-- 5. Ensure section_progress has proper RLS policies
-- ============================================================================

ALTER TABLE section_progress ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own section progress" ON section_progress;
DROP POLICY IF EXISTS "Users can insert own section progress" ON section_progress;
DROP POLICY IF EXISTS "Users can update own section progress" ON section_progress;
DROP POLICY IF EXISTS "Users can delete own section progress" ON section_progress;

CREATE POLICY "Users can view own section progress"
  ON section_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own section progress"
  ON section_progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own section progress"
  ON section_progress FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own section progress"
  ON section_progress FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- 6. Create/replace trigger function
-- ============================================================================

CREATE OR REPLACE FUNCTION update_topic_performance()
RETURNS TRIGGER AS $$
DECLARE
  v_total_attempts INTEGER;
  v_correct_attempts INTEGER;
  v_accuracy DECIMAL(5,4);
  v_mastery TEXT;
BEGIN
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE is_correct = true)
  INTO v_total_attempts, v_correct_attempts
  FROM practice_attempts
  WHERE user_id = NEW.user_id
    AND section = NEW.section
    AND topic = NEW.topic;

  IF v_total_attempts > 0 THEN
    v_accuracy := v_correct_attempts::DECIMAL / v_total_attempts::DECIMAL;
  ELSE
    v_accuracy := 0;
  END IF;

  IF v_total_attempts < 5 OR v_accuracy < 0.60 THEN
    v_mastery := 'weak';
  ELSIF v_accuracy >= 0.80 AND v_total_attempts >= 10 THEN
    v_mastery := 'mastered';
  ELSE
    v_mastery := 'moderate';
  END IF;

  INSERT INTO user_topic_performance (
    user_id, section, topic, accuracy,
    questions_attempted, questions_correct,
    mastery_level, last_attempted_at, updated_at
  )
  VALUES (
    NEW.user_id, NEW.section, NEW.topic, v_accuracy,
    v_total_attempts, v_correct_attempts,
    v_mastery, NOW(), NOW()
  )
  ON CONFLICT (user_id, section, topic)
  DO UPDATE SET
    accuracy = v_accuracy,
    questions_attempted = v_total_attempts,
    questions_correct = v_correct_attempts,
    mastery_level = v_mastery,
    last_attempted_at = NOW(),
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 7. Create trigger
-- ============================================================================

DROP TRIGGER IF EXISTS trigger_update_topic_performance ON practice_attempts;

CREATE TRIGGER trigger_update_topic_performance
  AFTER INSERT ON practice_attempts
  FOR EACH ROW
  EXECUTE FUNCTION update_topic_performance();

-- ============================================================================
-- 8. Backfill existing data
-- ============================================================================

INSERT INTO user_topic_performance (
  user_id, section, topic, accuracy,
  questions_attempted, questions_correct,
  mastery_level, last_attempted_at, updated_at
)
SELECT
  pa.user_id,
  pa.section,
  pa.topic,
  CASE
    WHEN COUNT(*) > 0 THEN COUNT(*) FILTER (WHERE is_correct)::DECIMAL / COUNT(*)::DECIMAL
    ELSE 0
  END as accuracy,
  COUNT(*) as questions_attempted,
  COUNT(*) FILTER (WHERE is_correct) as questions_correct,
  CASE
    WHEN COUNT(*) < 5 OR (COUNT(*) FILTER (WHERE is_correct)::DECIMAL / NULLIF(COUNT(*), 0)::DECIMAL) < 0.60 THEN 'weak'
    WHEN (COUNT(*) FILTER (WHERE is_correct)::DECIMAL / COUNT(*)::DECIMAL) >= 0.80 AND COUNT(*) >= 10 THEN 'mastered'
    ELSE 'moderate'
  END as mastery_level,
  MAX(pa.created_at) as last_attempted_at,
  NOW() as updated_at
FROM practice_attempts pa
WHERE pa.topic IS NOT NULL
GROUP BY pa.user_id, pa.section, pa.topic
ON CONFLICT (user_id, section, topic) DO NOTHING;

-- ============================================================================
-- Migration complete!
-- ============================================================================
