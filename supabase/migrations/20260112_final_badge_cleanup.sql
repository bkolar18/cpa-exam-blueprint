-- Final Badge and Achievement Cleanup
-- Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Rename CPA Blueprint Master to Meridian Master
-- ============================================================================

UPDATE achievements
SET name = 'Meridian Master', hidden_name = 'Meridian Master'
WHERE name = 'CPA Blueprint Master' OR code = 'platinum_master' OR code = 'cpa_blueprint_master';

-- ============================================================================
-- STEP 2: Delete unwanted achievements
-- ============================================================================

-- First remove user records for these achievements
DELETE FROM user_achievements
WHERE achievement_id IN (
  SELECT id FROM achievements
  WHERE name IN ('Month Master', 'Committed', 'Week Warrior', 'Dedicated')
  OR code IN ('month_master', 'committed', 'week_streak_30', 'week_warrior', 'week_streak_7', 'dedicated')
);

-- Then delete the achievements
DELETE FROM achievements
WHERE name IN ('Month Master', 'Committed', 'Week Warrior', 'Dedicated')
OR code IN ('month_master', 'committed', 'week_streak_30', 'week_warrior', 'week_streak_7', 'dedicated');

-- ============================================================================
-- STEP 3: Delete unwanted badges
-- ============================================================================

-- First remove user records for these badges
DELETE FROM user_badges
WHERE badge_id IN (
  SELECT id FROM badges
  WHERE name IN (
    'Warm Up',
    'Daily Dedication',
    'Question Legend',
    'Question Master',
    'Century Club',
    'First Steps',
    'On Fire',
    'Unstoppable',
    'Perfect 10',
    'Weekend Warrior',
    'Night Owl',
    'Early Bird',
    'Week Warrior',
    'Month Master'
  )
);

-- Then delete the badges
DELETE FROM badges
WHERE name IN (
  'Warm Up',
  'Daily Dedication',
  'Question Legend',
  'Question Master',
  'Century Club',
  'First Steps',
  'On Fire',
  'Unstoppable',
  'Perfect 10',
  'Weekend Warrior',
  'Night Owl',
  'Early Bird',
  'Week Warrior',
  'Month Master'
);

-- ============================================================================
-- STEP 4: Verify remaining badges and achievements
-- ============================================================================

SELECT 'BADGES' as type, name, tier, points FROM badges ORDER BY sort_order;
SELECT 'ACHIEVEMENTS' as type, name, tier, points FROM achievements ORDER BY sort_order;
