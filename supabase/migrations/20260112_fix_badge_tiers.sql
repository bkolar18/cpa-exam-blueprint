-- Fix Badge Tiers Migration
-- Updates all badges to have proper tier classifications
-- Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Ensure tier column exists with proper constraint
-- ============================================================================

ALTER TABLE badges ADD COLUMN IF NOT EXISTS tier VARCHAR(20) DEFAULT 'bronze';

-- ============================================================================
-- STEP 2: Update existing badges with proper tiers based on name/code
-- ============================================================================

-- Practice Question Count Badges
UPDATE badges SET tier = 'bronze', points = 10, category = 'practice'
WHERE code = 'first_steps' OR name = 'First Steps' OR name ILIKE 'First%question%';

UPDATE badges SET tier = 'bronze', points = 25, category = 'practice'
WHERE code = 'warm_up' OR name = 'Warm Up';

UPDATE badges SET tier = 'silver', points = 100, category = 'practice'
WHERE code = 'century_club' OR name = 'Century Club' OR name ILIKE '%100 question%';

UPDATE badges SET tier = 'gold', points = 250, category = 'practice'
WHERE code = 'question_master' OR name = 'Question Master' OR name ILIKE '%500 question%';

UPDATE badges SET tier = 'platinum', points = 500, category = 'practice'
WHERE code = 'question_legend' OR name = 'Question Legend' OR name ILIKE '%1000 question%';

-- Streak Badges
UPDATE badges SET tier = 'bronze', points = 30, category = 'streak'
WHERE code = 'daily_dedication' OR name = 'Daily Dedication' OR name ILIKE '%3 day%';

UPDATE badges SET tier = 'silver', points = 75, category = 'streak'
WHERE code = 'week_warrior' OR name = 'Week Warrior' OR name ILIKE '%7 day%';

UPDATE badges SET tier = 'gold', points = 300, category = 'streak'
WHERE code = 'month_master' OR name = 'Month Master' OR name ILIKE '%30 day%';

-- Section Explorer Badges
UPDATE badges SET tier = 'silver', points = 75, category = 'practice'
WHERE name ILIKE '%Explorer%' OR code ILIKE '%_explorer';

-- Time-based Badges
UPDATE badges SET tier = 'bronze', points = 15, category = 'special'
WHERE code = 'early_bird' OR name = 'Early Bird';

UPDATE badges SET tier = 'bronze', points = 15, category = 'special'
WHERE code = 'night_owl' OR name = 'Night Owl';

UPDATE badges SET tier = 'silver', points = 25, category = 'special'
WHERE code = 'weekend_warrior' OR name = 'Weekend Warrior';

-- Accuracy/Consecutive Badges
UPDATE badges SET tier = 'silver', points = 50, category = 'accuracy'
WHERE code = 'perfect_10' OR name = 'Perfect 10';

UPDATE badges SET tier = 'platinum', points = 200, category = 'accuracy'
WHERE code = 'unstoppable' OR name = 'Unstoppable' OR name ILIKE '%50%correct%row%';

-- ============================================================================
-- STEP 3: Update all badges - UPDATE existing by name, no inserts to avoid conflicts
-- ============================================================================

-- Practice badges
UPDATE badges SET tier = 'bronze', points = 10, category = 'practice', requirement_type = 'count', requirement_value = 1
WHERE name = 'First Steps';

UPDATE badges SET tier = 'bronze', points = 25, category = 'practice', requirement_type = 'count', requirement_value = 10
WHERE name = 'Warm Up';

UPDATE badges SET tier = 'silver', points = 100, category = 'practice', requirement_type = 'count', requirement_value = 100
WHERE name = 'Century Club';

UPDATE badges SET tier = 'gold', points = 250, category = 'practice', requirement_type = 'count', requirement_value = 500
WHERE name = 'Question Master';

UPDATE badges SET tier = 'platinum', points = 500, category = 'practice', requirement_type = 'count', requirement_value = 1000
WHERE name = 'Question Legend';

-- Streak badges
UPDATE badges SET tier = 'bronze', points = 30, category = 'streak', requirement_type = 'count', requirement_value = 3
WHERE name = 'Daily Dedication';

UPDATE badges SET tier = 'silver', points = 75, category = 'streak', requirement_type = 'count', requirement_value = 7
WHERE name = 'Week Warrior';

UPDATE badges SET tier = 'gold', points = 300, category = 'streak', requirement_type = 'count', requirement_value = 30
WHERE name = 'Month Master';

-- Section Explorer badges
UPDATE badges SET tier = 'silver', points = 75, category = 'practice', requirement_type = 'count', requirement_value = 50, requirement_section = 'FAR'
WHERE name = 'FAR Explorer';

UPDATE badges SET tier = 'silver', points = 75, category = 'practice', requirement_type = 'count', requirement_value = 50, requirement_section = 'AUD'
WHERE name = 'AUD Explorer';

UPDATE badges SET tier = 'silver', points = 75, category = 'practice', requirement_type = 'count', requirement_value = 50, requirement_section = 'REG'
WHERE name = 'REG Explorer';

-- Time-based badges
UPDATE badges SET tier = 'bronze', points = 15, category = 'special', requirement_type = 'boolean', requirement_value = 1
WHERE name = 'Early Bird';

UPDATE badges SET tier = 'bronze', points = 15, category = 'special', requirement_type = 'boolean', requirement_value = 1
WHERE name = 'Night Owl';

UPDATE badges SET tier = 'silver', points = 25, category = 'special', requirement_type = 'boolean', requirement_value = 1
WHERE name = 'Weekend Warrior';

-- Accuracy badges
UPDATE badges SET tier = 'silver', points = 50, category = 'accuracy', requirement_type = 'count', requirement_value = 10
WHERE name = 'Perfect 10';

UPDATE badges SET tier = 'platinum', points = 200, category = 'accuracy', requirement_type = 'count', requirement_value = 50
WHERE name = 'Unstoppable';

-- ============================================================================
-- STEP 4: Clean up any badges without valid tiers
-- ============================================================================

UPDATE badges
SET tier = 'bronze'
WHERE tier IS NULL OR tier NOT IN ('bronze', 'silver', 'gold', 'platinum');

-- ============================================================================
-- STEP 5: Verify the results
-- ============================================================================

SELECT code, name, tier, points, category, requirement_value
FROM badges
ORDER BY
  CASE tier
    WHEN 'bronze' THEN 1
    WHEN 'silver' THEN 2
    WHEN 'gold' THEN 3
    WHEN 'platinum' THEN 4
  END,
  sort_order;
