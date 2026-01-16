-- Migration: Fix topic performance trigger to handle NULL topics
-- Date: 2026-01-16
-- Purpose: Fix 500 error when practice_attempts insert has NULL topic

-- ============================================================================
-- 1. Drop and recreate the trigger function with NULL handling
-- ============================================================================

CREATE OR REPLACE FUNCTION update_topic_performance()
RETURNS TRIGGER AS $$
DECLARE
  v_total_attempts INTEGER;
  v_correct_attempts INTEGER;
  v_accuracy DECIMAL(5,4);
  v_mastery TEXT;
BEGIN
  -- Skip if topic is NULL
  IF NEW.topic IS NULL OR NEW.topic = '' THEN
    RETURN NEW;
  END IF;

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

  -- Use upsert with explicit conflict target
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
    accuracy = EXCLUDED.accuracy,
    questions_attempted = EXCLUDED.questions_attempted,
    questions_correct = EXCLUDED.questions_correct,
    mastery_level = EXCLUDED.mastery_level,
    last_attempted_at = NOW(),
    updated_at = NOW();

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the main insert
    RAISE WARNING 'update_topic_performance failed: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- 2. Ensure the unique constraint exists (not just index)
-- ============================================================================

-- Add actual unique constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'user_topic_performance_user_section_topic_key'
  ) THEN
    ALTER TABLE user_topic_performance
    ADD CONSTRAINT user_topic_performance_user_section_topic_key
    UNIQUE (user_id, section, topic);
  END IF;
EXCEPTION
  WHEN duplicate_object THEN
    NULL; -- Constraint already exists
  WHEN duplicate_table THEN
    NULL; -- Constraint already exists
END $$;

-- ============================================================================
-- Migration complete!
-- ============================================================================
