-- Cleanup Achievements Migration
-- Remove unwanted achievements and update existing ones
-- Run this in Supabase SQL Editor

-- ============================================================================
-- STEP 1: Remove unwanted achievements
-- ============================================================================

DELETE FROM user_achievements
WHERE achievement_id IN (
  SELECT id FROM achievements
  WHERE code IN ('accuracy_ace', 'practice_pro', 'section_specialist', 'study_scholar', 'perfect_10', 'flawless', 'unstoppable')
  OR name IN ('Accuracy Ace', 'Practice Pro', 'Section Specialist', 'Study Scholar', 'Perfect 10', 'Flawless', 'Unstoppable')
);

DELETE FROM achievements
WHERE code IN ('accuracy_ace', 'practice_pro', 'section_specialist', 'study_scholar', 'perfect_10', 'flawless', 'unstoppable')
OR name IN ('Accuracy Ace', 'Practice Pro', 'Section Specialist', 'Study Scholar', 'Perfect 10', 'Flawless', 'Unstoppable');

-- ============================================================================
-- STEP 2: Update Marathon Runner (4 hours instead of 8)
-- ============================================================================

UPDATE achievements
SET
  description = 'Study 4 or more hours in a single day',
  hidden_description = 'Study 4 or more hours in a single day',
  requirement_value = 4,
  requirement_metadata = '{"period": "day", "hours": 4}'
WHERE code = 'marathon'
   OR code = 'marathon_runner'
   OR name = 'Marathon Runner';

-- ============================================================================
-- STEP 3: Update Speed Demon (20 questions instead of 50)
-- ============================================================================

UPDATE achievements
SET
  description = 'Complete 20 questions in under 30 minutes with 70%+ accuracy',
  hidden_description = 'Complete 20 questions in under 30 minutes with 70%+ accuracy',
  requirement_metadata = '{"questions": 20, "minutes": 30, "accuracy": 70}'
WHERE code = 'speed_demon'
   OR name = 'Speed Demon';

-- ============================================================================
-- STEP 4: Verify changes
-- ============================================================================

-- Show remaining achievements
SELECT code, name, description, tier, points, is_hidden
FROM achievements
ORDER BY sort_order;
