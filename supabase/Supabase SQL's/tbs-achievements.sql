-- TBS Achievements SQL
-- Run this in Supabase SQL Editor to add TBS-related achievements
-- Date: January 2026

-- ============================================================================
-- TBS ACHIEVEMENTS
-- ============================================================================

-- First TBS completion
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'first_tbs',
  'Task Master Initiate',
  'Task Master Initiate',
  'Complete your first Task-Based Simulation',
  'Complete your first Task-Based Simulation',
  'tbs',
  'bronze',
  15,
  'clipboard-document-check',
  false,
  'count',
  1,
  200
) ON CONFLICT (code) DO NOTHING;

-- TBS count achievements
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_complete_5',
  'Simulation Novice',
  'Simulation Novice',
  'Complete 5 Task-Based Simulations',
  'Complete 5 Task-Based Simulations',
  'tbs',
  'bronze',
  20,
  'document-duplicate',
  false,
  'count',
  5,
  201
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_complete_10',
  'Simulation Apprentice',
  'Simulation Apprentice',
  'Complete 10 Task-Based Simulations',
  'Complete 10 Task-Based Simulations',
  'tbs',
  'silver',
  35,
  'document-text',
  false,
  'count',
  10,
  202
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_complete_25',
  'Simulation Expert',
  'Simulation Expert',
  'Complete 25 Task-Based Simulations',
  'Complete 25 Task-Based Simulations',
  'tbs',
  'gold',
  75,
  'document-chart-bar',
  false,
  'count',
  25,
  203
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_complete_50',
  'Simulation Master',
  'Simulation Master',
  'Complete 50 Task-Based Simulations',
  'Complete 50 Task-Based Simulations',
  'tbs',
  'platinum',
  150,
  'trophy',
  false,
  'count',
  50,
  204
) ON CONFLICT (code) DO NOTHING;

-- TBS score achievements
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_high_score',
  'TBS High Achiever',
  'TBS High Achiever',
  'Score 90% or higher on a Task-Based Simulation',
  'Score 90% or higher on a Task-Based Simulation',
  'tbs',
  'silver',
  40,
  'star',
  false,
  'percentage',
  90,
  205
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, sort_order)
VALUES (
  'tbs_perfect',
  'TBS Perfectionist',
  '???',
  'Score 100% on a Task-Based Simulation',
  'A hidden achievement awaits...',
  'tbs',
  'gold',
  100,
  'sparkles',
  true,
  'percentage',
  100,
  206
) ON CONFLICT (code) DO NOTHING;

-- TBS type-specific achievements
INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES (
  'tbs_je_master',
  'Journal Entry Expert',
  'Journal Entry Expert',
  'Score 80%+ on a Journal Entry TBS',
  'Score 80%+ on a Journal Entry TBS',
  'tbs',
  'silver',
  30,
  'calculator',
  false,
  'percentage',
  80,
  '{"tbs_type": "journal_entry"}',
  210
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES (
  'tbs_doc_master',
  'Document Detective',
  'Document Detective',
  'Score 80%+ on a Document Review TBS',
  'Score 80%+ on a Document Review TBS',
  'tbs',
  'silver',
  30,
  'document-magnifying-glass',
  false,
  'percentage',
  80,
  '{"tbs_type": "document_review"}',
  211
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES (
  'tbs_calc_master',
  'Calculation Champion',
  'Calculation Champion',
  'Score 80%+ on a Numeric Entry TBS',
  'Score 80%+ on a Numeric Entry TBS',
  'tbs',
  'silver',
  30,
  'variable',
  false,
  'percentage',
  80,
  '{"tbs_type": "numeric_entry"}',
  212
) ON CONFLICT (code) DO NOTHING;

INSERT INTO achievements (code, name, hidden_name, description, hidden_description, category, tier, points, icon_name, is_hidden, requirement_type, requirement_value, requirement_metadata, sort_order)
VALUES (
  'tbs_research_master',
  'Research Virtuoso',
  'Research Virtuoso',
  'Score 80%+ on a Research TBS',
  'Score 80%+ on a Research TBS',
  'tbs',
  'silver',
  30,
  'magnifying-glass',
  false,
  'percentage',
  80,
  '{"tbs_type": "research"}',
  213
) ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- VERIFY INSERTIONS
-- ============================================================================

SELECT code, name, category, tier, points, is_hidden
FROM achievements
WHERE category = 'tbs'
ORDER BY sort_order;
