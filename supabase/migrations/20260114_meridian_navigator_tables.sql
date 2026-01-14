-- Meridian Navigator - AI Feature Tables
-- This migration creates tables for:
-- 1. AI feature usage tracking (rate limiting)
-- 2. AI tutor conversation logging (optional, for quality improvement)
-- 3. AI disclaimer acknowledgment tracking

-- =============================================
-- 1. AI Feature Usage Tracking
-- =============================================
-- Tracks usage of all AI features for rate limiting
-- Supports daily, monthly, and per-exam period types

CREATE TABLE IF NOT EXISTS ai_feature_usage (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feature VARCHAR(30) NOT NULL CHECK (feature IN (
    'navigator',        -- Meridian Navigator chat
    'study_guide',      -- AI Study Guide Generator
    'flashcard',        -- Mistake-to-Flashcard Generator
    'exam_debrief',     -- Exam Simulation Debrief
    'pre_exam_assessment', -- Pre-Exam Readiness Assessment
    'weekly_email'      -- Weekly Progress Email
  )),
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'monthly', 'per_exam')),
  period_key VARCHAR(50) NOT NULL, -- e.g., '2026-01-14' for daily, '2026-01' for monthly, 'exam_abc123' for per_exam
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, feature, period_type, period_key)
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_ai_feature_usage_user ON ai_feature_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_feature_usage_lookup ON ai_feature_usage(user_id, feature, period_type, period_key);
CREATE INDEX IF NOT EXISTS idx_ai_feature_usage_date ON ai_feature_usage(created_at);

-- Enable RLS
ALTER TABLE ai_feature_usage ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Users can view own AI usage" ON ai_feature_usage;
DROP POLICY IF EXISTS "Users can insert own AI usage" ON ai_feature_usage;
DROP POLICY IF EXISTS "Users can update own AI usage" ON ai_feature_usage;

CREATE POLICY "Users can view own AI usage" ON ai_feature_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI usage" ON ai_feature_usage
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own AI usage" ON ai_feature_usage
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON ai_feature_usage TO authenticated;


-- =============================================
-- 2. AI Tutor Conversations (Optional Logging)
-- =============================================
-- Stores conversation logs for quality improvement and abuse prevention
-- Set LOG_NAVIGATOR_CONVERSATIONS=true to enable

CREATE TABLE IF NOT EXISTS ai_tutor_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id VARCHAR(100) NOT NULL, -- Question ID or 'general'
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  context JSONB, -- question_id, section, topic, mode, etc.
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_ai_conversations_user ON ai_tutor_conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_session ON ai_tutor_conversations(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_ai_conversations_date ON ai_tutor_conversations(created_at);

-- Enable RLS
ALTER TABLE ai_tutor_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Users can only view their own conversations
DROP POLICY IF EXISTS "Users can view own AI conversations" ON ai_tutor_conversations;
DROP POLICY IF EXISTS "Users can insert own AI conversations" ON ai_tutor_conversations;

CREATE POLICY "Users can view own AI conversations" ON ai_tutor_conversations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI conversations" ON ai_tutor_conversations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON ai_tutor_conversations TO authenticated;


-- =============================================
-- 3. AI Disclaimer Acknowledgment
-- =============================================
-- Track when users acknowledged the AI disclaimer

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS ai_disclaimer_acknowledged_at TIMESTAMPTZ;


-- =============================================
-- 4. Helper Function: Get/Increment AI Usage
-- =============================================
-- Atomic function to check and increment usage in one operation

CREATE OR REPLACE FUNCTION get_and_increment_ai_usage(
  p_user_id UUID,
  p_feature VARCHAR(30),
  p_period_type VARCHAR(20),
  p_period_key VARCHAR(50),
  p_limit INTEGER
)
RETURNS TABLE (
  allowed BOOLEAN,
  current_count INTEGER,
  remaining INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_count INTEGER;
BEGIN
  -- Get current usage or create new record
  INSERT INTO ai_feature_usage (user_id, feature, period_type, period_key, usage_count)
  VALUES (p_user_id, p_feature, p_period_type, p_period_key, 0)
  ON CONFLICT (user_id, feature, period_type, period_key) DO NOTHING;

  -- Get current count
  SELECT usage_count INTO v_count
  FROM ai_feature_usage
  WHERE user_id = p_user_id
    AND feature = p_feature
    AND period_type = p_period_type
    AND period_key = p_period_key;

  -- Check if allowed
  IF v_count >= p_limit THEN
    RETURN QUERY SELECT FALSE, v_count, 0;
    RETURN;
  END IF;

  -- Increment and return
  UPDATE ai_feature_usage
  SET usage_count = usage_count + 1,
      last_used_at = NOW()
  WHERE user_id = p_user_id
    AND feature = p_feature
    AND period_type = p_period_type
    AND period_key = p_period_key;

  RETURN QUERY SELECT TRUE, v_count + 1, p_limit - v_count - 1;
END;
$$;


-- =============================================
-- 5. Cleanup Job (run daily via cron)
-- =============================================
-- Delete conversation logs older than 90 days
-- This should be set up as a scheduled job in Supabase

-- Example cron job SQL (run via pg_cron or scheduled function):
-- DELETE FROM ai_tutor_conversations
-- WHERE created_at < NOW() - INTERVAL '90 days';


-- =============================================
-- 6. Add subscription_tier to profiles if not exists
-- =============================================
-- Ensure profiles table has subscription tier for rate limiting

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS subscription_tier VARCHAR(20) DEFAULT 'free'
CHECK (subscription_tier IN ('free', 'standard', 'pro'));

-- Create index for subscription tier queries
CREATE INDEX IF NOT EXISTS idx_profiles_subscription_tier ON profiles(subscription_tier);
