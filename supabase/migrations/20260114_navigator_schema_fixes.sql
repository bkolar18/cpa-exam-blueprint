-- Navigator Schema Fixes
-- Adds missing columns required by the Meridian Navigator feature

-- =============================================
-- 1. Add missing columns to section_progress
-- =============================================
ALTER TABLE section_progress
ADD COLUMN IF NOT EXISTS prime_meridian_score INTEGER DEFAULT 0;

ALTER TABLE section_progress
ADD COLUMN IF NOT EXISTS exam_date DATE;

-- =============================================
-- 2. Create/update user_topic_performance table
-- =============================================
-- This table tracks user performance by topic for personalized AI responses

CREATE TABLE IF NOT EXISTS user_topic_performance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  section VARCHAR(10) NOT NULL,
  topic VARCHAR(255) NOT NULL,
  accuracy DECIMAL(5,4) DEFAULT 0,
  questions_attempted INTEGER DEFAULT 0,
  mastery_level VARCHAR(20) DEFAULT 'weak',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, section, topic)
);

-- If table exists but columns don't, add them
ALTER TABLE user_topic_performance
ADD COLUMN IF NOT EXISTS accuracy DECIMAL(5,4) DEFAULT 0;

ALTER TABLE user_topic_performance
ADD COLUMN IF NOT EXISTS questions_attempted INTEGER DEFAULT 0;

ALTER TABLE user_topic_performance
ADD COLUMN IF NOT EXISTS mastery_level VARCHAR(20) DEFAULT 'weak';

-- =============================================
-- 3. Enable RLS and create policies
-- =============================================
ALTER TABLE user_topic_performance ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own topic performance" ON user_topic_performance;
DROP POLICY IF EXISTS "Users can insert own topic performance" ON user_topic_performance;
DROP POLICY IF EXISTS "Users can update own topic performance" ON user_topic_performance;

-- Create RLS policies
CREATE POLICY "Users can view own topic performance" ON user_topic_performance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own topic performance" ON user_topic_performance
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own topic performance" ON user_topic_performance
  FOR UPDATE USING (auth.uid() = user_id);

-- Grant permissions
GRANT ALL ON user_topic_performance TO authenticated;

-- =============================================
-- 4. Create index for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_user_topic_performance_lookup
ON user_topic_performance(user_id, section, topic);
