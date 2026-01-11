-- Update Hidden Achievements SQL
-- Run this in Supabase SQL Editor to reduce hidden achievements to ~5%
-- Date: January 2026
--
-- Goal: Make only ~5% of achievements hidden, and ensure hidden ones are guessable from their name.
-- Currently ~12 hidden out of ~36 total (~33%)
-- Target: ~2 hidden out of ~36 total (~5%)
--
-- Hidden achievements to KEEP (guessable from name):
-- - early_bird: "Early Bird" - clearly about studying early morning
-- - weekend_warrior: "Weekend Warrior" - clearly about studying on weekends
--
-- All others will be made visible since they're harder to guess or not worth hiding.

-- ============================================================================
-- STEP 1: Make all currently hidden achievements VISIBLE
-- ============================================================================

-- Unhide the "Section Sharp" achievements - make them visible goals
UPDATE achievements SET is_hidden = false WHERE code = 'accuracy_75_far';
UPDATE achievements SET is_hidden = false WHERE code = 'accuracy_75_aud';
UPDATE achievements SET is_hidden = false WHERE code = 'accuracy_75_reg';
UPDATE achievements SET is_hidden = false WHERE code = 'accuracy_75_disc';

-- Unhide speed and special achievements
UPDATE achievements SET is_hidden = false WHERE code = 'speed_demon';
UPDATE achievements SET is_hidden = false WHERE code = 'night_owl';
UPDATE achievements SET is_hidden = false WHERE code = 'marathon';
UPDATE achievements SET is_hidden = false WHERE code = 'perfect_10';
UPDATE achievements SET is_hidden = false WHERE code = 'perfect_50';

-- Unhide TBS Perfect - make it a visible goal to strive for
UPDATE achievements SET is_hidden = false WHERE code = 'tbs_perfect';

-- ============================================================================
-- STEP 2: Keep only the most guessable achievements hidden
-- ============================================================================

-- KEEP HIDDEN: Early Bird (guessable - study early morning)
UPDATE achievements
SET is_hidden = true,
    hidden_name = '???',
    hidden_description = 'Rise and shine! Can you guess what this early achievement requires?'
WHERE code = 'early_bird';

-- KEEP HIDDEN: Weekend Warrior (guessable - study on weekends)
UPDATE achievements
SET is_hidden = true,
    hidden_name = '???',
    hidden_description = 'Some people rest on weekends... but not CPA warriors!'
WHERE code = 'weekend_warrior';
