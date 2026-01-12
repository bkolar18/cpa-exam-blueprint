-- Practice Question Achievements SQL
-- Run this in Supabase SQL Editor to add practice-related achievements
-- Date: January 12, 2026

-- ============================================================================
-- PRACTICE QUESTION ACHIEVEMENTS (Missing from original schema)
-- ============================================================================

-- First Question Achievement (simplest - answer just 1 question)
-- Note: "First Steps" name already exists in database, using "First Question" instead
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'first_question',
  'First Question',
  'First Question',
  'Answer your first practice question',
  'Answer your first practice question',
  'practice',
  'bronze',
  10,
  'play',
  false,
  'count',
  1,
  0
) ON CONFLICT (code) DO NOTHING;

-- Warm Up Achievement (10 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'warm_up',
  'Warm Up',
  'Warm Up',
  'Answer 10 practice questions',
  'Answer 10 practice questions',
  'practice',
  'bronze',
  15,
  'flame',
  false,
  'count',
  10,
  1
) ON CONFLICT (code) DO NOTHING;

-- Getting Started Achievement (25 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'getting_started',
  'Getting Started',
  'Getting Started',
  'Answer 25 practice questions',
  'Answer 25 practice questions',
  'practice',
  'bronze',
  20,
  'rocket',
  false,
  'count',
  25,
  2
) ON CONFLICT (code) DO NOTHING;

-- Practice Makes Perfect Achievement (50 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'practice_makes_perfect',
  'Practice Makes Perfect',
  'Practice Makes Perfect',
  'Answer 50 practice questions',
  'Answer 50 practice questions',
  'practice',
  'silver',
  30,
  'star',
  false,
  'count',
  50,
  3
) ON CONFLICT (code) DO NOTHING;

-- Century Club Achievement (100 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'century_club',
  'Question Century',
  'Question Century',
  'Answer 100 practice questions',
  'Answer 100 practice questions',
  'practice',
  'silver',
  40,
  'target',
  false,
  'count',
  100,
  4
) ON CONFLICT (code) DO NOTHING;

-- Question Machine Achievement (250 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'question_machine',
  'Question Machine',
  'Question Machine',
  'Answer 250 practice questions',
  'Answer 250 practice questions',
  'practice',
  'gold',
  60,
  'bolt',
  false,
  'count',
  250,
  5
) ON CONFLICT (code) DO NOTHING;

-- Practice Warrior Achievement (500 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'practice_warrior',
  'Practice Warrior',
  'Practice Warrior',
  'Answer 500 practice questions',
  'Answer 500 practice questions',
  'practice',
  'gold',
  90,
  'shield',
  false,
  'count',
  500,
  6
) ON CONFLICT (code) DO NOTHING;

-- Question Master Achievement (1000 questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'question_master',
  'Question Master',
  'Question Master',
  'Answer 1000 practice questions',
  'Answer 1000 practice questions',
  'practice',
  'platinum',
  150,
  'crown',
  false,
  'count',
  1000,
  7
) ON CONFLICT (code) DO NOTHING;

-- Perfect Session Achievement (100% accuracy in a session with 10+ questions)
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'perfect_session',
  'Perfect Score',
  '???',
  'Score 100% in a practice session with 10 or more questions',
  'A hidden challenge awaits...',
  'accuracy',
  'gold',
  75,
  'check-circle',
  true,
  'percentage',
  100,
  30
) ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- VERIFY INSERTIONS
-- ============================================================================

SELECT code, name, category, tier, points, is_hidden
FROM achievements
WHERE category = 'practice' OR code = 'perfect_session'
ORDER BY sort_order;
