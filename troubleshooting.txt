-- CPA Exam Blueprint Gamification Schema
-- Run this AFTER supabase-schema.sql in Supabase SQL Editor

-- =============================================
-- BADGES TABLE (Progress-based achievements)
-- =============================================
CREATE TABLE badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'study_hours', 'practice', 'section', 'account'
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  points INTEGER NOT NULL DEFAULT 15,
  icon_name VARCHAR(50), -- Icon identifier for frontend
  requirement_type VARCHAR(50) NOT NULL, -- 'hours', 'percentage', 'count', 'boolean'
  requirement_value DECIMAL,
  requirement_section VARCHAR(10) CHECK (requirement_section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ACHIEVEMENTS TABLE (Action-based unlocks)
-- =============================================
CREATE TABLE achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  hidden_name VARCHAR(100) DEFAULT '???',
  description TEXT NOT NULL,
  hidden_description TEXT DEFAULT 'Complete a hidden challenge to discover this achievement.',
  category VARCHAR(50) NOT NULL, -- 'practice', 'account', 'streak', 'accuracy', 'special', 'speed'
  tier VARCHAR(20) NOT NULL CHECK (tier IN ('bronze', 'silver', 'gold', 'platinum')),
  points INTEGER NOT NULL DEFAULT 15,
  icon_name VARCHAR(50),
  is_hidden BOOLEAN DEFAULT FALSE,
  requirement_type VARCHAR(50) NOT NULL,
  requirement_value DECIMAL,
  requirement_metadata JSONB, -- flexible additional conditions
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- USER BADGES (Tracks which badges users earned)
-- =============================================
CREATE TABLE user_badges (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  badge_id UUID REFERENCES badges(id) ON DELETE CASCADE NOT NULL,
  earned_at TIMESTAMPTZ,
  progress DECIMAL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- =============================================
-- USER ACHIEVEMENTS (Tracks which achievements users unlocked)
-- =============================================
CREATE TABLE user_achievements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  discovered BOOLEAN DEFAULT TRUE, -- for hidden achievements
  metadata JSONB, -- store context like discount codes
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- =============================================
-- PRACTICE SESSIONS (Timed practice tracking)
-- =============================================
CREATE TABLE practice_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section VARCHAR(10) NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  started_at TIMESTAMPTZ NOT NULL,
  ended_at TIMESTAMPTZ,
  duration_minutes INTEGER,
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  accuracy_percentage DECIMAL CHECK (accuracy_percentage >= 0 AND accuracy_percentage <= 100),
  study_session_id UUID REFERENCES study_sessions(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Add gamification columns to profiles
-- =============================================
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS total_points INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS badge_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS achievement_count INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS current_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS longest_streak INTEGER DEFAULT 0;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_study_date DATE;

-- =============================================
-- Create indexes for performance
-- =============================================
CREATE INDEX idx_user_badges_user ON user_badges(user_id);
CREATE INDEX idx_user_badges_badge ON user_badges(badge_id);
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement ON user_achievements(achievement_id);
CREATE INDEX idx_practice_sessions_user ON practice_sessions(user_id);
CREATE INDEX idx_practice_sessions_section ON practice_sessions(section);

-- =============================================
-- Enable Row Level Security
-- =============================================
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE practice_sessions ENABLE ROW LEVEL SECURITY;

-- Badges and achievements are publicly readable (definitions)
CREATE POLICY "Badges are viewable by everyone" ON badges FOR SELECT USING (true);
CREATE POLICY "Achievements are viewable by everyone" ON achievements FOR SELECT USING (true);

-- User progress is private
CREATE POLICY "Users can view own badges" ON user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own badges" ON user_badges FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own achievements" ON user_achievements FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own practice sessions" ON practice_sessions FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- SEED DATA: Badges
-- =============================================

-- FAR Study Hour Badges
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('far_hours_25', 'FAR Beginner', 'Complete 25% of recommended FAR study hours (37.5 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 37.5, 'FAR', 1),
('far_hours_50', 'FAR Student', 'Complete 50% of recommended FAR study hours (75 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 75, 'FAR', 2),
('far_hours_75', 'FAR Scholar', 'Complete 75% of recommended FAR study hours (112.5 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 112.5, 'FAR', 3),
('far_hours_100', 'FAR Master', 'Complete 100% of recommended FAR study hours (150 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 150, 'FAR', 4);

-- AUD Study Hour Badges
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('aud_hours_25', 'AUD Beginner', 'Complete 25% of recommended AUD study hours (25 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 25, 'AUD', 5),
('aud_hours_50', 'AUD Student', 'Complete 50% of recommended AUD study hours (50 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 50, 'AUD', 6),
('aud_hours_75', 'AUD Scholar', 'Complete 75% of recommended AUD study hours (75 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 75, 'AUD', 7),
('aud_hours_100', 'AUD Master', 'Complete 100% of recommended AUD study hours (100 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 100, 'AUD', 8);

-- REG Study Hour Badges
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('reg_hours_25', 'REG Beginner', 'Complete 25% of recommended REG study hours (25 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 25, 'REG', 9),
('reg_hours_50', 'REG Student', 'Complete 50% of recommended REG study hours (50 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 50, 'REG', 10),
('reg_hours_75', 'REG Scholar', 'Complete 75% of recommended REG study hours (75 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 75, 'REG', 11),
('reg_hours_100', 'REG Master', 'Complete 100% of recommended REG study hours (100 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 100, 'REG', 12);

-- TCP Study Hour Badges (Discipline)
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('tcp_hours_25', 'TCP Beginner', 'Complete 25% of recommended TCP study hours (20 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 20, 'TCP', 13),
('tcp_hours_50', 'TCP Student', 'Complete 50% of recommended TCP study hours (40 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 40, 'TCP', 14),
('tcp_hours_75', 'TCP Scholar', 'Complete 75% of recommended TCP study hours (60 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 60, 'TCP', 15),
('tcp_hours_100', 'TCP Master', 'Complete 100% of recommended TCP study hours (80 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 80, 'TCP', 16);

-- BAR Study Hour Badges (Discipline)
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('bar_hours_25', 'BAR Beginner', 'Complete 25% of recommended BAR study hours (25 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 25, 'BAR', 17),
('bar_hours_50', 'BAR Student', 'Complete 50% of recommended BAR study hours (50 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 50, 'BAR', 18),
('bar_hours_75', 'BAR Scholar', 'Complete 75% of recommended BAR study hours (75 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 75, 'BAR', 19),
('bar_hours_100', 'BAR Master', 'Complete 100% of recommended BAR study hours (100 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 100, 'BAR', 20);

-- ISC Study Hour Badges (Discipline)
INSERT INTO badges (code, name, description, category, tier, points, icon_name, requirement_type, requirement_value, requirement_section, sort_order) VALUES
('isc_hours_25', 'ISC Beginner', 'Complete 25% of recommended ISC study hours (20 hours)', 'study_hours', 'bronze', 15, 'book', 'hours', 20, 'ISC', 21),
('isc_hours_50', 'ISC Student', 'Complete 50% of recommended ISC study hours (40 hours)', 'study_hours', 'silver', 30, 'book', 'hours', 40, 'ISC', 22),
('isc_hours_75', 'ISC Scholar', 'Complete 75% of recommended ISC study hours (60 hours)', 'study_hours', 'gold', 90, 'book', 'hours', 60, 'ISC', 23),
('isc_hours_100', 'ISC Master', 'Complete 100% of recommended ISC study hours (80 hours)', 'study_hours', 'gold', 90, 'trophy', 'hours', 80, 'ISC', 24);

-- =============================================
-- SEED DATA: Achievements (Visible)
-- =============================================
INSERT INTO achievements (code, name, description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order) VALUES
('first_session', 'First Steps', 'Log your first study session', 'account', 'bronze', 15, 'play', false, 'count', 1, 1),
('profile_complete', 'Ready to Go', 'Complete all profile settings', 'account', 'bronze', 15, 'user-check', false, 'boolean', 1, 2),
('discipline_chosen', 'Committed Path', 'Choose your discipline section', 'account', 'bronze', 15, 'target', false, 'boolean', 1, 3),
('nts_added', 'Officially Scheduled', 'Add your first NTS entry', 'account', 'bronze', 15, 'calendar', false, 'count', 1, 4),
('week_streak_7', 'Dedicated', 'Maintain a 7-day study streak', 'streak', 'bronze', 15, 'flame', false, 'count', 7, 5),
('week_streak_30', 'Committed', 'Maintain a 30-day study streak', 'streak', 'silver', 30, 'flame', false, 'count', 30, 6),
('section_passed_1', 'One Down', 'Pass your first CPA exam section', 'section', 'silver', 30, 'check-circle', false, 'count', 1, 7),
('section_passed_2', 'Halfway There', 'Pass two CPA exam sections', 'section', 'silver', 30, 'check-circle', false, 'count', 2, 8),
('section_passed_3', 'Almost There', 'Pass three CPA exam sections', 'section', 'gold', 90, 'check-circle', false, 'count', 3, 9),
('section_passed_all', 'CPA Candidate', 'Pass all four CPA exam sections', 'section', 'platinum', 300, 'award', false, 'count', 4, 10),
('practice_all_sections', 'Well Rounded', 'Complete practice sessions in all your sections', 'practice', 'silver', 30, 'layers', false, 'count', 4, 11),
('total_hours_100', 'Century Club', 'Log 100 total study hours', 'study_hours', 'silver', 30, 'clock', false, 'hours', 100, 12),
('total_hours_300', 'Study Warrior', 'Log 300 total study hours', 'study_hours', 'gold', 90, 'clock', false, 'hours', 300, 13),
('total_hours_500', 'Study Legend', 'Log 500 total study hours', 'study_hours', 'gold', 90, 'clock', false, 'hours', 500, 14);

-- =============================================
-- SEED DATA: Hidden Achievements
-- =============================================
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order) VALUES
('accuracy_75_far', 'FAR Sharp', '???', 'Score 75% or higher accuracy in a FAR practice session', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'silver', 30, 'target', true, 'percentage', 75, '{"section": "FAR"}', 15),
('accuracy_75_aud', 'AUD Sharp', '???', 'Score 75% or higher accuracy in an AUD practice session', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'silver', 30, 'target', true, 'percentage', 75, '{"section": "AUD"}', 16),
('accuracy_75_reg', 'REG Sharp', '???', 'Score 75% or higher accuracy in a REG practice session', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'silver', 30, 'target', true, 'percentage', 75, '{"section": "REG"}', 17),
('accuracy_75_disc', 'Discipline Sharp', '???', 'Score 75% or higher accuracy in your discipline section practice', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'silver', 30, 'target', true, 'percentage', 75, '{"section": "discipline"}', 18),
('speed_demon', 'Speed Demon', '???', 'Complete 50 questions in under 30 minutes with 70%+ accuracy', 'Complete a hidden challenge to discover this achievement.', 'speed', 'gold', 90, 'zap', true, 'special', 1, '{"questions": 50, "minutes": 30, "accuracy": 70}', 19),
('night_owl', 'Night Owl', '???', 'Complete a study session between 10 PM and 2 AM', 'Complete a hidden challenge to discover this achievement.', 'special', 'bronze', 15, 'moon', true, 'time_range', 1, '{"start_hour": 22, "end_hour": 2}', 20),
('early_bird', 'Early Bird', '???', 'Complete a study session between 5 AM and 7 AM', 'Complete a hidden challenge to discover this achievement.', 'special', 'bronze', 15, 'sunrise', true, 'time_range', 1, '{"start_hour": 5, "end_hour": 7}', 21),
('marathon', 'Marathon Runner', '???', 'Study 8 or more hours in a single day', 'Complete a hidden challenge to discover this achievement.', 'special', 'gold', 90, 'activity', true, 'hours', 8, '{"period": "day"}', 22),
('perfect_10', 'Perfect 10', '???', 'Answer 10 questions correctly in a row', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'silver', 30, 'award', true, 'count', 10, '{"consecutive": true}', 23),
('perfect_50', 'Flawless', '???', 'Answer 50 questions correctly in a row', 'Complete a hidden challenge to discover this achievement.', 'accuracy', 'gold', 90, 'award', true, 'count', 50, '{"consecutive": true}', 24),
('weekend_warrior', 'Weekend Warrior', '???', 'Study 10+ hours on a weekend', 'Complete a hidden challenge to discover this achievement.', 'special', 'silver', 30, 'calendar', true, 'hours', 10, '{"days": ["saturday", "sunday"]}', 25);

-- Platinum Master Achievement
INSERT INTO achievements (code, name, description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order) VALUES
('platinum_master', 'CPA Blueprint Master', 'Unlock all other achievements to earn exclusive rewards', 'special', 'platinum', 300, 'crown', false, 'count', 100, '{"reward": "surgent_discount"}', 100);

-- =============================================
-- Function to update user points on achievement unlock
-- =============================================
CREATE OR REPLACE FUNCTION update_user_points()
RETURNS TRIGGER AS $$
DECLARE
  achievement_points INTEGER;
BEGIN
  -- Get points for the achievement
  SELECT points INTO achievement_points
  FROM achievements
  WHERE id = NEW.achievement_id;

  -- Update user's total points and achievement count
  UPDATE profiles
  SET
    total_points = total_points + COALESCE(achievement_points, 0),
    achievement_count = achievement_count + 1
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_achievement_unlocked
  AFTER INSERT ON user_achievements
  FOR EACH ROW EXECUTE FUNCTION update_user_points();

-- =============================================
-- Function to update user points on badge earned
-- =============================================
CREATE OR REPLACE FUNCTION update_user_badge_points()
RETURNS TRIGGER AS $$
DECLARE
  badge_points INTEGER;
BEGIN
  -- Only award points when badge is first earned (earned_at goes from NULL to a value)
  IF NEW.earned_at IS NOT NULL AND (OLD.earned_at IS NULL OR OLD IS NULL) THEN
    -- Get points for the badge
    SELECT points INTO badge_points
    FROM badges
    WHERE id = NEW.badge_id;

    -- Update user's total points and badge count
    UPDATE profiles
    SET
      total_points = total_points + COALESCE(badge_points, 0),
      badge_count = badge_count + 1
    WHERE id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_badge_earned
  AFTER INSERT OR UPDATE ON user_badges
  FOR EACH ROW EXECUTE FUNCTION update_user_badge_points();

-- =============================================
-- Function to update study streak on new session
-- =============================================
CREATE OR REPLACE FUNCTION update_study_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  current_streak INTEGER;
  longest INTEGER;
BEGIN
  -- Get user's last study date and current streak
  SELECT last_study_date, current_streak, longest_streak
  INTO last_date, current_streak, longest
  FROM profiles
  WHERE id = NEW.user_id;

  -- Calculate new streak
  IF last_date IS NULL OR NEW.date > last_date + INTERVAL '1 day' THEN
    -- Reset streak (first session or gap > 1 day)
    current_streak := 1;
  ELSIF NEW.date = last_date + INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    current_streak := current_streak + 1;
  ELSIF NEW.date = last_date THEN
    -- Same day, no change to streak
    NULL;
  ELSE
    -- Date is in the past, no change
    NULL;
  END IF;

  -- Update longest streak if needed
  IF current_streak > COALESCE(longest, 0) THEN
    longest := current_streak;
  END IF;

  -- Update profile
  UPDATE profiles
  SET
    last_study_date = GREATEST(last_study_date, NEW.date),
    current_streak = current_streak,
    longest_streak = longest
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_study_session_added
  AFTER INSERT ON study_sessions
  FOR EACH ROW EXECUTE FUNCTION update_study_streak();
