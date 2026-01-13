-- Fix Achievement Tiers Migration
-- Updates all achievements to have proper tier classifications
-- Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Ensure tier column exists and has proper constraint
-- ============================================================================

-- Add tier column if it doesn't exist (with default to prevent nulls)
ALTER TABLE achievements ADD COLUMN IF NOT EXISTS tier VARCHAR(20) DEFAULT 'bronze';

-- ============================================================================
-- STEP 2: Update existing achievements with proper tiers based on name/code
-- ============================================================================

-- Practice Question Count Achievements
UPDATE achievements SET tier = 'bronze', points = 10, category = 'practice', requirement_type = 'count', requirement_value = 1
WHERE code = 'first_question' OR name ILIKE 'First Question' OR name ILIKE 'First Steps' AND category = 'practice';

UPDATE achievements SET tier = 'bronze', points = 15, category = 'practice', requirement_type = 'count', requirement_value = 10
WHERE code = 'warm_up' OR name = 'Warm Up';

UPDATE achievements SET tier = 'bronze', points = 20, category = 'practice', requirement_type = 'count', requirement_value = 25
WHERE code = 'getting_started' OR name = 'Getting Started';

UPDATE achievements SET tier = 'silver', points = 30, category = 'practice', requirement_type = 'count', requirement_value = 50
WHERE code = 'practice_makes_perfect' OR name = 'Practice Makes Perfect';

UPDATE achievements SET tier = 'silver', points = 40, category = 'practice', requirement_type = 'count', requirement_value = 100
WHERE code = 'century_club' OR code = 'question_century' OR name ILIKE '%Century%' AND category = 'practice';

UPDATE achievements SET tier = 'gold', points = 60, category = 'practice', requirement_type = 'count', requirement_value = 250
WHERE code = 'question_machine' OR name = 'Question Machine';

UPDATE achievements SET tier = 'gold', points = 90, category = 'practice', requirement_type = 'count', requirement_value = 500
WHERE code = 'practice_warrior' OR code = 'question_master' OR name = 'Practice Warrior' OR name = 'Question Master';

UPDATE achievements SET tier = 'platinum', points = 150, category = 'practice', requirement_type = 'count', requirement_value = 1000
WHERE code = 'question_legend' OR name = 'Question Legend';

-- Section Explorer Achievements (50 questions per section)
UPDATE achievements SET tier = 'silver', points = 75, category = 'practice', requirement_type = 'count', requirement_value = 50
WHERE name ILIKE '%Explorer%' OR code ILIKE '%_explorer';

-- Streak Achievements
UPDATE achievements SET tier = 'bronze', points = 30, category = 'streak', requirement_type = 'count', requirement_value = 3
WHERE code = 'daily_dedication' OR name = 'Daily Dedication' OR name ILIKE '%3 day%';

UPDATE achievements SET tier = 'bronze', points = 75, category = 'streak', requirement_type = 'count', requirement_value = 7
WHERE code = 'week_warrior' OR code = 'week_streak_7' OR name = 'Week Warrior' OR name = 'Dedicated';

UPDATE achievements SET tier = 'silver', points = 150, category = 'streak', requirement_type = 'count', requirement_value = 14
WHERE name ILIKE '%14 day%' OR name ILIKE '%two week%';

UPDATE achievements SET tier = 'gold', points = 300, category = 'streak', requirement_type = 'count', requirement_value = 30
WHERE code = 'month_master' OR code = 'week_streak_30' OR name = 'Month Master' OR name = 'Committed';

-- Time-based Achievements
UPDATE achievements SET tier = 'bronze', points = 15, category = 'special', is_hidden = true
WHERE code = 'early_bird' OR name = 'Early Bird';

UPDATE achievements SET tier = 'bronze', points = 15, category = 'special', is_hidden = true
WHERE code = 'night_owl' OR name = 'Night Owl';

UPDATE achievements SET tier = 'silver', points = 25, category = 'special', is_hidden = true
WHERE code = 'weekend_warrior' OR name = 'Weekend Warrior';

-- Accuracy/Streak Achievements
UPDATE achievements SET tier = 'silver', points = 50, category = 'accuracy', is_hidden = true
WHERE code = 'perfect_10' OR name = 'Perfect 10';

UPDATE achievements SET tier = 'gold', points = 200, category = 'accuracy', is_hidden = true
WHERE code = 'unstoppable' OR code = 'perfect_50' OR name = 'Unstoppable' OR name = 'Flawless';

-- Account Achievements
UPDATE achievements SET tier = 'bronze', points = 15, category = 'account'
WHERE code = 'first_session' OR code = 'profile_complete' OR code = 'discipline_chosen' OR code = 'nts_added';

-- Study Hours Achievements
UPDATE achievements SET tier = 'silver', points = 30, category = 'study_hours'
WHERE code = 'total_hours_100' OR name ILIKE '%100%hour%';

UPDATE achievements SET tier = 'gold', points = 90, category = 'study_hours'
WHERE code = 'total_hours_300' OR name ILIKE '%300%hour%';

UPDATE achievements SET tier = 'gold', points = 90, category = 'study_hours'
WHERE code = 'total_hours_500' OR code = 'marathon' OR name ILIKE '%500%hour%' OR name = 'Marathon Runner';

-- Section Passed Achievements
UPDATE achievements SET tier = 'silver', points = 30, category = 'section'
WHERE code IN ('section_passed_1', 'section_passed_2');

UPDATE achievements SET tier = 'gold', points = 90, category = 'section'
WHERE code = 'section_passed_3';

UPDATE achievements SET tier = 'platinum', points = 300, category = 'section'
WHERE code = 'section_passed_all';

-- ============================================================================
-- STEP 3: Insert missing achievements that should exist
-- ============================================================================

-- First Question (if not exists)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('first_question', 'First Question', 'First Question', 'Answer your first practice question', 'Answer your first practice question', 'practice', 'bronze', 10, 'play', false, 'count', 1, 0)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 10;

-- Warm Up (10 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('warm_up', 'Warm Up', 'Warm Up', 'Answer 10 practice questions', 'Answer 10 practice questions', 'practice', 'bronze', 15, 'flame', false, 'count', 10, 1)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 15;

-- Getting Started (25 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('getting_started', 'Getting Started', 'Getting Started', 'Answer 25 practice questions', 'Answer 25 practice questions', 'practice', 'bronze', 20, 'rocket', false, 'count', 25, 2)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 20;

-- Practice Makes Perfect (50 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('practice_makes_perfect', 'Practice Makes Perfect', 'Practice Makes Perfect', 'Answer 50 practice questions', 'Answer 50 practice questions', 'practice', 'silver', 30, 'star', false, 'count', 50, 3)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 30;

-- Century Club (100 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('century_club', 'Question Century', 'Question Century', 'Answer 100 practice questions', 'Answer 100 practice questions', 'practice', 'silver', 40, 'target', false, 'count', 100, 4)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 40;

-- Question Machine (250 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('question_machine', 'Question Machine', 'Question Machine', 'Answer 250 practice questions', 'Answer 250 practice questions', 'practice', 'gold', 60, 'bolt', false, 'count', 250, 5)
ON CONFLICT (code) DO UPDATE SET tier = 'gold', points = 60;

-- Practice Warrior (500 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('practice_warrior', 'Practice Warrior', 'Practice Warrior', 'Answer 500 practice questions', 'Answer 500 practice questions', 'practice', 'gold', 90, 'shield', false, 'count', 500, 6)
ON CONFLICT (code) DO UPDATE SET tier = 'gold', points = 90;

-- Question Master (1000 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('question_master', 'Question Master', 'Question Master', 'Answer 1000 practice questions', 'Answer 1000 practice questions', 'practice', 'platinum', 150, 'crown', false, 'count', 1000, 7)
ON CONFLICT (code) DO UPDATE SET tier = 'platinum', points = 150;

-- Daily Dedication (3 day streak)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('daily_dedication', 'Daily Dedication', 'Daily Dedication', 'Study 3 days in a row', 'Study 3 days in a row', 'streak', 'bronze', 30, 'flame', false, 'count', 3, 20)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 30;

-- Week Warrior (7 day streak)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('week_warrior', 'Week Warrior', 'Week Warrior', 'Study 7 days in a row', 'Study 7 days in a row', 'streak', 'silver', 75, 'flame', false, 'count', 7, 21)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 75;

-- Month Master (30 day streak)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES ('month_master', 'Month Master', 'Month Master', 'Study 30 days in a row', 'Study 30 days in a row', 'streak', 'gold', 300, 'flame', false, 'count', 30, 22)
ON CONFLICT (code) DO UPDATE SET tier = 'gold', points = 300;

-- Section Explorers
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('far_explorer', 'FAR Explorer', 'FAR Explorer', 'Complete 50 FAR questions', 'Complete 50 FAR questions', 'practice', 'silver', 75, 'compass', false, 'count', 50, '{"section": "FAR"}', 30)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 75;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('aud_explorer', 'AUD Explorer', 'AUD Explorer', 'Complete 50 AUD questions', 'Complete 50 AUD questions', 'practice', 'silver', 75, 'compass', false, 'count', 50, '{"section": "AUD"}', 31)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 75;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('reg_explorer', 'REG Explorer', 'REG Explorer', 'Complete 50 REG questions', 'Complete 50 REG questions', 'practice', 'silver', 75, 'compass', false, 'count', 50, '{"section": "REG"}', 32)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 75;

-- Perfect 10 (10 correct in a row)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('perfect_10', 'Perfect 10', '???', 'Get 10 questions correct in a row', 'A hidden challenge awaits...', 'accuracy', 'silver', 50, 'award', true, 'count', 10, '{"consecutive": true}', 40)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 50;

-- Unstoppable (50 correct in a row)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('unstoppable', 'Unstoppable', '???', 'Get 50 questions correct in a row', 'A hidden challenge awaits...', 'accuracy', 'platinum', 200, 'trophy', true, 'count', 50, '{"consecutive": true}', 41)
ON CONFLICT (code) DO UPDATE SET tier = 'platinum', points = 200;

-- Early Bird
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('early_bird', 'Early Bird', '???', 'Study before 6 AM', 'A hidden challenge awaits...', 'special', 'bronze', 15, 'sunrise', true, 'time_range', 1, '{"start_hour": 5, "end_hour": 6}', 50)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 15;

-- Night Owl
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('night_owl', 'Night Owl', '???', 'Study after 10 PM', 'A hidden challenge awaits...', 'special', 'bronze', 15, 'moon', true, 'time_range', 1, '{"start_hour": 22, "end_hour": 2}', 51)
ON CONFLICT (code) DO UPDATE SET tier = 'bronze', points = 15;

-- Weekend Warrior
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES ('weekend_warrior', 'Weekend Warrior', '???', 'Study on both Saturday and Sunday', 'A hidden challenge awaits...', 'special', 'silver', 25, 'calendar', true, 'special', 1, '{"days": ["saturday", "sunday"]}', 52)
ON CONFLICT (code) DO UPDATE SET tier = 'silver', points = 25;

-- ============================================================================
-- STEP 4: Clean up any achievements without valid tiers (set to bronze as default)
-- ============================================================================

UPDATE achievements
SET tier = 'bronze'
WHERE tier IS NULL OR tier NOT IN ('bronze', 'silver', 'gold', 'platinum');

-- ============================================================================
-- STEP 5: Verify the results
-- ============================================================================

SELECT code, name, tier, points, category, is_hidden, requirement_value
FROM achievements
ORDER BY
  CASE tier
    WHEN 'bronze' THEN 1
    WHEN 'silver' THEN 2
    WHEN 'gold' THEN 3
    WHEN 'platinum' THEN 4
  END,
  sort_order;
