-- Admin Dashboard & Question Feedback Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- Question Feedback Table
-- ============================================
CREATE TABLE IF NOT EXISTS question_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('wrong_answer', 'unclear', 'outdated', 'typo', 'other')),
  comment TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  resolved_by TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_question_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_question_feedback_section ON question_feedback(section);
CREATE INDEX IF NOT EXISTS idx_question_feedback_question_id ON question_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_question_feedback_created_at ON question_feedback(created_at DESC);

-- RLS Policies
ALTER TABLE question_feedback ENABLE ROW LEVEL SECURITY;

-- Users can insert their own feedback
CREATE POLICY "Users can insert own feedback" ON question_feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON question_feedback
  FOR SELECT USING (auth.uid() = user_id);

-- Service role can do everything (for admin API)
CREATE POLICY "Service role full access" ON question_feedback
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Activity Log Table (Audit Trail)
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  actor_email TEXT,
  action_type TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  details JSONB DEFAULT '{}',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_activity_log_action_type ON activity_log(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_log_actor_id ON activity_log(actor_id);

-- RLS - Only service role can access (admin only)
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON activity_log
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Question Stats Table (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS question_stats (
  question_id TEXT PRIMARY KEY,
  section TEXT NOT NULL,
  times_shown INTEGER DEFAULT 0,
  times_correct INTEGER DEFAULT 0,
  times_incorrect INTEGER DEFAULT 0,
  times_skipped INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,
  avg_time_seconds NUMERIC(10,2) DEFAULT 0,
  accuracy_rate NUMERIC(5,4) DEFAULT 0,
  feedback_count INTEGER DEFAULT 0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_question_stats_section ON question_stats(section);
CREATE INDEX IF NOT EXISTS idx_question_stats_accuracy ON question_stats(accuracy_rate);

-- RLS - Service role only
ALTER TABLE question_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON question_stats
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- User Preferences Table (Dark Mode, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
  email_notifications BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Users can manage their own preferences
CREATE POLICY "Users can view own preferences" ON user_preferences
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role full access
CREATE POLICY "Service role full access" ON user_preferences
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Trigger: Auto-create preferences on signup
-- ============================================
CREATE OR REPLACE FUNCTION create_user_preferences()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_preferences (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created_preferences'
  ) THEN
    CREATE TRIGGER on_auth_user_created_preferences
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION create_user_preferences();
  END IF;
END $$;

-- ============================================
-- Trigger: Update question_stats on practice_attempts
-- ============================================
CREATE OR REPLACE FUNCTION update_question_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO question_stats (question_id, section, times_shown, times_correct, times_incorrect, total_time_seconds)
  VALUES (
    NEW.question_id,
    NEW.section,
    1,
    CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    CASE WHEN NEW.is_correct THEN 0 ELSE 1 END,
    COALESCE(NEW.time_spent_seconds, 0)
  )
  ON CONFLICT (question_id) DO UPDATE SET
    times_shown = question_stats.times_shown + 1,
    times_correct = question_stats.times_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    times_incorrect = question_stats.times_incorrect + CASE WHEN NEW.is_correct THEN 0 ELSE 1 END,
    total_time_seconds = question_stats.total_time_seconds + COALESCE(NEW.time_spent_seconds, 0),
    avg_time_seconds = (question_stats.total_time_seconds + COALESCE(NEW.time_spent_seconds, 0))::NUMERIC / (question_stats.times_shown + 1),
    accuracy_rate = (question_stats.times_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END)::NUMERIC / (question_stats.times_shown + 1),
    last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_practice_attempt_update_stats'
  ) THEN
    CREATE TRIGGER on_practice_attempt_update_stats
      AFTER INSERT ON practice_attempts
      FOR EACH ROW EXECUTE FUNCTION update_question_stats();
  END IF;
END $$;

-- ============================================
-- Trigger: Update feedback_count on question_feedback insert
-- ============================================
CREATE OR REPLACE FUNCTION update_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO question_stats (question_id, section, feedback_count)
  VALUES (NEW.question_id, NEW.section, 1)
  ON CONFLICT (question_id) DO UPDATE SET
    feedback_count = question_stats.feedback_count + 1,
    last_updated = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Only create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_feedback_update_stats'
  ) THEN
    CREATE TRIGGER on_feedback_update_stats
      AFTER INSERT ON question_feedback
      FOR EACH ROW EXECUTE FUNCTION update_feedback_count();
  END IF;
END $$;

-- ============================================
-- Helper Views for Admin Dashboard
-- ============================================

-- Daily active users view
CREATE OR REPLACE VIEW daily_active_users AS
SELECT
  DATE(created_at) as date,
  COUNT(DISTINCT user_id) as active_users
FROM practice_attempts
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Signup trends view
CREATE OR REPLACE VIEW signup_trends AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as signups
FROM profiles
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Section popularity view
CREATE OR REPLACE VIEW section_popularity AS
SELECT
  section,
  COUNT(*) as attempts,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(CASE WHEN is_correct THEN 1 ELSE 0 END)::NUMERIC(5,4) as avg_accuracy
FROM practice_attempts
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY section
ORDER BY attempts DESC;

-- Pending feedback summary
CREATE OR REPLACE VIEW pending_feedback_summary AS
SELECT
  section,
  feedback_type,
  COUNT(*) as count
FROM question_feedback
WHERE status = 'pending'
GROUP BY section, feedback_type
ORDER BY count DESC;

-- ============================================
-- Announcements Table (Email History)
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  recipient_filter TEXT NOT NULL CHECK (recipient_filter IN ('all', 'free', 'paid', 'inactive', 'custom')),
  recipient_count INTEGER DEFAULT 0,
  sent_by TEXT NOT NULL,
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'
);

-- Index
CREATE INDEX IF NOT EXISTS idx_announcements_sent_at ON announcements(sent_at DESC);

-- RLS - Service role only
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON announcements
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Question Issues View (for admin dashboard)
-- ============================================
CREATE OR REPLACE VIEW question_issues AS
SELECT
  question_id,
  section,
  times_shown,
  times_correct,
  times_incorrect,
  accuracy_rate,
  avg_time_seconds,
  feedback_count,
  CASE
    WHEN accuracy_rate < 0.5 AND times_shown >= 10 THEN 'too_hard'
    WHEN accuracy_rate > 0.95 AND times_shown >= 10 THEN 'too_easy'
    WHEN feedback_count >= 3 THEN 'high_feedback'
    ELSE 'ok'
  END as issue_type,
  last_updated
FROM question_stats
WHERE times_shown >= 5
ORDER BY
  CASE WHEN feedback_count >= 3 THEN 0 ELSE 1 END,
  feedback_count DESC,
  accuracy_rate ASC;
