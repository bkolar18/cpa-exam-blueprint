-- ============================================
-- CPA Exam Blueprint - Admin Dashboard Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
-- ============================================

-- ============================================
-- 1. QUESTION FEEDBACK TABLE
-- Stores user-reported issues with questions
-- ============================================
CREATE TABLE IF NOT EXISTS question_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    user_email TEXT,
    question_id TEXT NOT NULL,
    section TEXT NOT NULL,
    topic TEXT,
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('wrong_answer', 'unclear', 'outdated', 'typo', 'other')),
    comment TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    admin_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for feedback queries
CREATE INDEX IF NOT EXISTS idx_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_section ON question_feedback(section);
CREATE INDEX IF NOT EXISTS idx_feedback_question ON question_feedback(question_id);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON question_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON question_feedback(feedback_type);

COMMENT ON TABLE question_feedback IS 'User-reported issues with practice questions';
COMMENT ON COLUMN question_feedback.feedback_type IS 'Type of issue: wrong_answer, unclear, outdated, typo, other';
COMMENT ON COLUMN question_feedback.status IS 'Review status: pending, reviewed, resolved, dismissed';


-- ============================================
-- 2. ACTIVITY LOG TABLE
-- Audit trail for admin and system actions
-- ============================================
CREATE TABLE IF NOT EXISTS activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    actor_id UUID,
    actor_email TEXT,
    action_type TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for activity queries
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_log(action_type);
CREATE INDEX IF NOT EXISTS idx_activity_actor ON activity_log(actor_id);
CREATE INDEX IF NOT EXISTS idx_activity_target ON activity_log(target_type, target_id);

COMMENT ON TABLE activity_log IS 'Audit trail of admin and system actions';
COMMENT ON COLUMN activity_log.action_type IS 'Type of action: feedback_updated, user_created, announcement_sent, etc.';
COMMENT ON COLUMN activity_log.details IS 'JSON object with action-specific details';


-- ============================================
-- 3. ANNOUNCEMENTS TABLE
-- Email announcements sent to users
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    recipients TEXT NOT NULL,
    recipient_count INTEGER DEFAULT 0,
    sent_by TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for announcements
CREATE INDEX IF NOT EXISTS idx_announcements_sent ON announcements(sent_at DESC);

COMMENT ON TABLE announcements IS 'History of email announcements sent to users';
COMMENT ON COLUMN announcements.recipients IS 'Target group: all, free, paid, inactive';


-- ============================================
-- 4. QUESTION STATS TABLE
-- Aggregated performance statistics per question
-- ============================================
CREATE TABLE IF NOT EXISTS question_stats (
    question_id TEXT PRIMARY KEY,
    section TEXT NOT NULL,
    topic TEXT,
    times_shown INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    accuracy_rate DECIMAL(5,4) DEFAULT 0,
    avg_time_seconds DECIMAL(10,2) DEFAULT 0,
    feedback_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for question stats
CREATE INDEX IF NOT EXISTS idx_qstats_section ON question_stats(section);
CREATE INDEX IF NOT EXISTS idx_qstats_accuracy ON question_stats(accuracy_rate);
CREATE INDEX IF NOT EXISTS idx_qstats_feedback ON question_stats(feedback_count DESC);

COMMENT ON TABLE question_stats IS 'Aggregated performance statistics for each question';
COMMENT ON COLUMN question_stats.accuracy_rate IS 'Decimal between 0 and 1 (e.g., 0.75 = 75%)';


-- ============================================
-- 5. USER PREFERENCES TABLE
-- User settings including theme preference
-- ============================================
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    email_announcements BOOLEAN DEFAULT true,
    email_weekly_digest BOOLEAN DEFAULT true,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE user_preferences IS 'User settings and preferences';
COMMENT ON COLUMN user_preferences.theme IS 'UI theme preference: light, dark, or system';


-- ============================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE question_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 7. RLS POLICIES - Question Feedback
-- ============================================

-- Anyone authenticated can submit feedback
CREATE POLICY "Users can submit feedback" ON question_feedback
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Users can view their own feedback
CREATE POLICY "Users can view own feedback" ON question_feedback
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Service role (admin API) can do everything
CREATE POLICY "Service role full access to feedback" ON question_feedback
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================
-- 8. RLS POLICIES - Activity Log
-- ============================================

-- Only service role can access activity log
CREATE POLICY "Service role full access to activity" ON activity_log
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================
-- 9. RLS POLICIES - Announcements
-- ============================================

-- Only service role can access announcements
CREATE POLICY "Service role full access to announcements" ON announcements
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================
-- 10. RLS POLICIES - Question Stats
-- ============================================

-- Anyone can read question stats (public data)
CREATE POLICY "Anyone can read question stats" ON question_stats
    FOR SELECT TO authenticated
    USING (true);

-- Only service role can modify stats
CREATE POLICY "Service role can modify stats" ON question_stats
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================
-- 11. RLS POLICIES - User Preferences
-- ============================================

-- Users can read their own preferences
CREATE POLICY "Users can read own preferences" ON user_preferences
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Users can update their own preferences
CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Users can insert their own preferences
CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);

-- Service role full access
CREATE POLICY "Service role full access to preferences" ON user_preferences
    FOR ALL TO service_role
    USING (true)
    WITH CHECK (true);


-- ============================================
-- 12. HELPER FUNCTIONS
-- ============================================

-- Function to update question stats when feedback is added
CREATE OR REPLACE FUNCTION update_question_feedback_count()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO question_stats (question_id, section, feedback_count)
    VALUES (NEW.question_id, NEW.section, 1)
    ON CONFLICT (question_id) DO UPDATE
    SET feedback_count = question_stats.feedback_count + 1,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to auto-update feedback count
DROP TRIGGER IF EXISTS on_feedback_insert ON question_feedback;
CREATE TRIGGER on_feedback_insert
    AFTER INSERT ON question_feedback
    FOR EACH ROW
    EXECUTE FUNCTION update_question_feedback_count();


-- Function to update question stats from practice attempts
CREATE OR REPLACE FUNCTION update_question_stats_from_attempt()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO question_stats (question_id, section, topic, times_shown, times_correct, accuracy_rate)
    VALUES (
        NEW.question_id,
        NEW.section,
        NEW.topic,
        1,
        CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
        CASE WHEN NEW.is_correct THEN 1.0 ELSE 0.0 END
    )
    ON CONFLICT (question_id) DO UPDATE
    SET
        times_shown = question_stats.times_shown + 1,
        times_correct = question_stats.times_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
        accuracy_rate = (question_stats.times_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END)::DECIMAL / (question_stats.times_shown + 1),
        avg_time_seconds = CASE
            WHEN NEW.time_spent_seconds IS NOT NULL THEN
                ((question_stats.avg_time_seconds * question_stats.times_shown) + NEW.time_spent_seconds) / (question_stats.times_shown + 1)
            ELSE question_stats.avg_time_seconds
        END,
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for practice_attempts (only create if table exists)
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'practice_attempts') THEN
        DROP TRIGGER IF EXISTS on_practice_attempt ON practice_attempts;
        CREATE TRIGGER on_practice_attempt
            AFTER INSERT ON practice_attempts
            FOR EACH ROW
            EXECUTE FUNCTION update_question_stats_from_attempt();
    END IF;
END $$;


-- ============================================
-- 13. VIEWS FOR ADMIN DASHBOARD
-- ============================================

-- Pending feedback summary by section
CREATE OR REPLACE VIEW pending_feedback_summary AS
SELECT
    section,
    feedback_type,
    COUNT(*) as count
FROM question_feedback
WHERE status = 'pending'
GROUP BY section, feedback_type
ORDER BY count DESC;

-- Daily active users (last 30 days)
CREATE OR REPLACE VIEW daily_active_users AS
SELECT
    DATE(created_at) as date,
    COUNT(DISTINCT user_id) as active_users
FROM practice_sessions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Question issues needing attention
CREATE OR REPLACE VIEW questions_needing_review AS
SELECT
    qs.question_id,
    qs.section,
    qs.accuracy_rate,
    qs.times_shown,
    qs.feedback_count,
    CASE
        WHEN qs.accuracy_rate < 0.5 AND qs.times_shown >= 10 THEN 'too_hard'
        WHEN qs.accuracy_rate > 0.95 AND qs.times_shown >= 10 THEN 'too_easy'
        WHEN qs.feedback_count > 0 THEN 'has_feedback'
        ELSE 'ok'
    END as issue_type
FROM question_stats qs
WHERE
    (qs.accuracy_rate < 0.5 AND qs.times_shown >= 10)
    OR (qs.accuracy_rate > 0.95 AND qs.times_shown >= 10)
    OR qs.feedback_count > 0
ORDER BY qs.feedback_count DESC, qs.accuracy_rate ASC;


-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify tables were created
-- ============================================

-- Check all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('question_feedback', 'activity_log', 'announcements', 'question_stats', 'user_preferences');

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
AND tablename IN ('question_feedback', 'activity_log', 'announcements', 'question_stats', 'user_preferences');
