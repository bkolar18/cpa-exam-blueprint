-- Fix for study streak counter bug v2
-- Run this in Supabase SQL Editor to fix the streak counter issue
-- Issue: streak shows "1 day" even after multiple consecutive study days
--
-- This version addresses:
-- 1. Variable/column name conflict (new_streak vs current_streak)
-- 2. Date comparison issues with intervals
-- 3. Edge cases with date arithmetic

-- First, verify current state of profiles table
-- SELECT id, email, last_study_date, current_streak, longest_streak FROM profiles LIMIT 10;

-- Drop and recreate the function with improved date handling
CREATE OR REPLACE FUNCTION update_study_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  calc_streak INTEGER;  -- Renamed from 'current_streak' to avoid column name conflict
  longest INTEGER;
  date_diff INTEGER;
BEGIN
  -- Get user's last study date and current streak from profile
  SELECT last_study_date, current_streak, longest_streak
  INTO last_date, calc_streak, longest
  FROM profiles
  WHERE id = NEW.user_id;

  -- Calculate date difference (NULL if no previous study date)
  IF last_date IS NOT NULL THEN
    date_diff := NEW.date::DATE - last_date::DATE;
  ELSE
    date_diff := NULL;
  END IF;

  -- Calculate new streak based on date difference
  IF last_date IS NULL THEN
    -- First ever study session
    calc_streak := 1;
    RAISE NOTICE 'First study session for user, setting streak to 1';
  ELSIF date_diff = 0 THEN
    -- Same day - no change to streak
    RAISE NOTICE 'Same day session, streak unchanged at %', calc_streak;
    -- Don't update anything, just return
    RETURN NEW;
  ELSIF date_diff = 1 THEN
    -- Consecutive day, increment streak
    calc_streak := COALESCE(calc_streak, 0) + 1;
    RAISE NOTICE 'Consecutive day! Incrementing streak to %', calc_streak;
  ELSIF date_diff > 1 THEN
    -- Gap of more than 1 day, reset streak
    calc_streak := 1;
    RAISE NOTICE 'Gap of % days, resetting streak to 1', date_diff;
  ELSIF date_diff < 0 THEN
    -- Date is in the past, don't modify streak
    RAISE NOTICE 'Past date logged, no change to streak';
    RETURN NEW;
  END IF;

  -- Update longest streak if current exceeds it
  IF calc_streak > COALESCE(longest, 0) THEN
    longest := calc_streak;
    RAISE NOTICE 'New longest streak: %', longest;
  END IF;

  -- Update profile
  UPDATE profiles
  SET
    last_study_date = GREATEST(COALESCE(last_study_date, NEW.date::DATE), NEW.date::DATE),
    current_streak = calc_streak,
    longest_streak = longest
  WHERE id = NEW.user_id;

  RAISE NOTICE 'Updated profile: streak=%, longest=%, last_date=%', calc_streak, longest, NEW.date;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify the trigger exists (it should already be there)
-- SELECT tgname, tgrelid::regclass, tgenabled FROM pg_trigger WHERE tgname = 'on_study_session_added';

-- If trigger doesn't exist, create it:
-- DROP TRIGGER IF EXISTS on_study_session_added ON study_sessions;
-- CREATE TRIGGER on_study_session_added
--   AFTER INSERT ON study_sessions
--   FOR EACH ROW
--   EXECUTE FUNCTION update_study_streak();

-- ============================================================================
-- MANUAL FIX: Recalculate streaks for all users
-- Run this to fix existing incorrect streak data
-- ============================================================================

-- Function to recalculate a user's streak from their study session history
CREATE OR REPLACE FUNCTION recalculate_user_streak(user_uuid UUID)
RETURNS TABLE(new_current_streak INTEGER, new_longest_streak INTEGER) AS $$
DECLARE
  session_record RECORD;
  prev_date DATE := NULL;
  calc_streak INTEGER := 0;
  max_streak INTEGER := 0;
BEGIN
  -- Get all study sessions for user ordered by date
  FOR session_record IN
    SELECT DISTINCT date::DATE as study_date
    FROM study_sessions
    WHERE user_id = user_uuid
    ORDER BY date::DATE ASC
  LOOP
    IF prev_date IS NULL THEN
      -- First session
      calc_streak := 1;
    ELSIF session_record.study_date - prev_date = 1 THEN
      -- Consecutive day
      calc_streak := calc_streak + 1;
    ELSIF session_record.study_date - prev_date > 1 THEN
      -- Gap in days - check if we should reset
      calc_streak := 1;
    END IF;
    -- Same day doesn't increment

    -- Track max streak
    IF calc_streak > max_streak THEN
      max_streak := calc_streak;
    END IF;

    prev_date := session_record.study_date;
  END LOOP;

  -- Check if streak is current (last study was yesterday or today)
  IF prev_date IS NOT NULL AND (CURRENT_DATE - prev_date <= 1) THEN
    new_current_streak := calc_streak;
  ELSE
    new_current_streak := 0;
  END IF;

  new_longest_streak := max_streak;

  -- Update the profile
  UPDATE profiles
  SET current_streak = new_current_streak,
      longest_streak = new_longest_streak,
      last_study_date = prev_date
  WHERE id = user_uuid;

  RETURN NEXT;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- RECALCULATE ALL USERS' STREAKS
-- Uncomment and run this section to fix all existing streak data
-- ============================================================================

-- DO $$
-- DECLARE
--   profile_record RECORD;
--   result RECORD;
-- BEGIN
--   FOR profile_record IN SELECT id FROM profiles
--   LOOP
--     SELECT * INTO result FROM recalculate_user_streak(profile_record.id);
--     RAISE NOTICE 'User %: current=%, longest=%', profile_record.id, result.new_current_streak, result.new_longest_streak;
--   END LOOP;
-- END $$;

-- ============================================================================
-- TEST: Recalculate single user
-- Replace the UUID with your user ID to test
-- ============================================================================

-- SELECT * FROM recalculate_user_streak('your-user-uuid-here');

-- Verify results:
-- SELECT id, email, last_study_date, current_streak, longest_streak FROM profiles WHERE id = 'your-user-uuid-here';
