-- Fix for study streak counter bug
-- Run this in Supabase SQL Editor to fix the streak counter issue
-- Issue: streak shows "1 day" after 2 consecutive days due to variable/column name conflict

-- Drop and recreate the function with renamed variable
CREATE OR REPLACE FUNCTION update_study_streak()
RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
  new_streak INTEGER;  -- Renamed from 'current_streak' to avoid column name conflict
  longest INTEGER;
BEGIN
  -- Get user's last study date and current streak
  SELECT last_study_date, current_streak, longest_streak
  INTO last_date, new_streak, longest
  FROM profiles
  WHERE id = NEW.user_id;

  -- Calculate new streak
  IF last_date IS NULL OR NEW.date > last_date + INTERVAL '1 day' THEN
    -- Reset streak (first session or gap > 1 day)
    new_streak := 1;
  ELSIF NEW.date = last_date + INTERVAL '1 day' THEN
    -- Consecutive day, increment streak
    new_streak := COALESCE(new_streak, 0) + 1;
  ELSIF NEW.date = last_date THEN
    -- Same day, no change to streak
    NULL;
  ELSE
    -- Date is in the past, no change
    NULL;
  END IF;

  -- Update longest streak if needed
  IF new_streak > COALESCE(longest, 0) THEN
    longest := new_streak;
  END IF;

  -- Update profile (using new_streak to avoid column/variable ambiguity)
  UPDATE profiles
  SET
    last_study_date = GREATEST(last_study_date, NEW.date),
    current_streak = new_streak,
    longest_streak = longest
  WHERE id = NEW.user_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Note: The trigger 'on_study_session_added' already references this function,
-- so updating the function is sufficient - no need to recreate the trigger.
