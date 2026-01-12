-- Fix for study streak counter bug
-- Issue: streak shows "1 day" after 2 consecutive days
-- Root causes:
-- 1. Variable/column name conflict (calc_streak vs current_streak)
-- 2. Timezone mismatch: client sends UTC date, server uses CURRENT_DATE in its timezone
-- 3. Date arithmetic edge cases

-- ============================================================================
-- STEP 1: Update the trigger function with timezone-aware logic
-- ============================================================================

CREATE OR REPLACE FUNCTION update_study_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  calc_streak INTEGER;
  longest INTEGER;
  date_diff INTEGER;
  session_date DATE;
BEGIN
  -- Use the date from the session (already in date format from client)
  session_date := NEW.date::DATE;

  -- Get user's last study date and current streak from profile
  SELECT last_study_date, current_streak, longest_streak
  INTO last_date, calc_streak, longest
  FROM profiles
  WHERE id = NEW.user_id;

  -- Calculate date difference (NULL if no previous study date)
  IF last_date IS NOT NULL THEN
    date_diff := session_date - last_date;
  ELSE
    date_diff := NULL;
  END IF;

  -- Calculate new streak based on date difference
  IF last_date IS NULL THEN
    -- First ever study session
    calc_streak := 1;
  ELSIF date_diff = 0 THEN
    -- Same day - no change to streak, just return
    RETURN NEW;
  ELSIF date_diff = 1 THEN
    -- Consecutive day, increment streak
    calc_streak := COALESCE(calc_streak, 0) + 1;
  ELSIF date_diff > 1 THEN
    -- Gap of more than 1 day, reset streak
    calc_streak := 1;
  ELSIF date_diff < 0 THEN
    -- Date is in the past, don't modify streak
    RETURN NEW;
  END IF;

  -- Update longest streak if current exceeds it
  IF calc_streak > COALESCE(longest, 0) THEN
    longest := calc_streak;
  END IF;

  -- Update profile
  UPDATE profiles
  SET
    last_study_date = GREATEST(COALESCE(last_study_date, session_date), session_date),
    current_streak = calc_streak,
    longest_streak = longest
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 2: Function to recalculate a single user's streak from history
-- ============================================================================

CREATE OR REPLACE FUNCTION recalculate_user_streak(user_uuid UUID)
RETURNS TABLE(new_current_streak INTEGER, new_longest_streak INTEGER) AS $$
DECLARE
  session_record RECORD;
  prev_date DATE := NULL;
  calc_streak INTEGER := 0;
  max_streak INTEGER := 0;
  today_date DATE := CURRENT_DATE;
BEGIN
  -- Get all unique study dates for user, ordered chronologically
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
      -- Gap in days, reset streak
      calc_streak := 1;
    END IF;
    -- Same day (diff = 0) doesn't change anything

    -- Track max streak
    IF calc_streak > max_streak THEN
      max_streak := calc_streak;
    END IF;

    prev_date := session_record.study_date;
  END LOOP;

  -- Check if streak is still active (last study was yesterday or today)
  IF prev_date IS NOT NULL AND (today_date - prev_date <= 1) THEN
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
-- STEP 3: Function to recalculate ALL users' streaks
-- ============================================================================

CREATE OR REPLACE FUNCTION recalculate_all_streaks()
RETURNS TABLE(user_id UUID, current INTEGER, longest INTEGER) AS $$
DECLARE
  profile_record RECORD;
  result RECORD;
BEGIN
  FOR profile_record IN SELECT id FROM profiles
  LOOP
    SELECT * INTO result FROM recalculate_user_streak(profile_record.id);
    user_id := profile_record.id;
    current := result.new_current_streak;
    longest := result.new_longest_streak;
    RETURN NEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- STEP 4: Ensure trigger exists
-- ============================================================================

DROP TRIGGER IF EXISTS on_study_session_added ON study_sessions;
CREATE TRIGGER on_study_session_added
  AFTER INSERT ON study_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_study_streak();

-- ============================================================================
-- OPTIONAL: Run this to fix all existing streaks (uncomment to execute)
-- ============================================================================
-- SELECT * FROM recalculate_all_streaks();
