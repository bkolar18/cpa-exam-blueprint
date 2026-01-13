-- Adaptive Learning Schema
-- Tracks user performance by topic for adaptive question selection
-- Incorporates both objective accuracy and subjective confidence ratings

-- ============================================
-- User Topic Performance Table
-- ============================================
-- Aggregates user performance at topic level for adaptive selection
CREATE TABLE IF NOT EXISTS user_topic_performance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,

  -- Objective performance metrics (from practice attempts)
  questions_attempted INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  accuracy_rate NUMERIC(5,4) DEFAULT 0,           -- questions_correct / questions_attempted
  total_time_seconds INTEGER DEFAULT 0,
  avg_time_seconds NUMERIC(10,2) DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,

  -- Subjective confidence metrics (from note ratings)
  confidence_ratings_count INTEGER DEFAULT 0,      -- How many times user rated confidence
  confidence_sum INTEGER DEFAULT 0,                -- Sum of all confidence ratings (1-5)
  avg_confidence NUMERIC(3,2) DEFAULT 0,           -- Average confidence (1.00 - 5.00)
  last_confidence_at TIMESTAMPTZ,

  -- Computed priority score for adaptive selection
  -- Lower = needs more practice, Higher = mastered
  -- Formula: (accuracy_rate * 0.6) + (normalized_confidence * 0.4)
  -- Adjusted for confidence/accuracy divergence
  priority_score NUMERIC(5,4) DEFAULT 0,

  -- Mastery level based on priority_score
  -- weak: < 0.50, moderate: 0.50-0.75, mastered: > 0.75
  mastery_level TEXT DEFAULT 'weak' CHECK (mastery_level IN ('weak', 'moderate', 'mastered')),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, section, topic)
);

-- Indexes for adaptive queries
CREATE INDEX IF NOT EXISTS idx_user_topic_perf_user ON user_topic_performance(user_id);
CREATE INDEX IF NOT EXISTS idx_user_topic_perf_section ON user_topic_performance(user_id, section);
CREATE INDEX IF NOT EXISTS idx_user_topic_perf_mastery ON user_topic_performance(user_id, mastery_level);
CREATE INDEX IF NOT EXISTS idx_user_topic_perf_priority ON user_topic_performance(user_id, priority_score);

-- RLS
ALTER TABLE user_topic_performance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own topic performance" ON user_topic_performance
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Service role full access" ON user_topic_performance
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Function: Update topic performance on practice attempt
-- ============================================
CREATE OR REPLACE FUNCTION update_user_topic_performance_on_attempt()
RETURNS TRIGGER AS $$
DECLARE
  new_accuracy NUMERIC(5,4);
  new_priority NUMERIC(5,4);
  current_confidence NUMERIC(3,2);
  new_mastery TEXT;
BEGIN
  -- Insert or update user topic performance
  INSERT INTO user_topic_performance (
    user_id, section, topic,
    questions_attempted, questions_correct,
    total_time_seconds, last_attempt_at
  )
  VALUES (
    NEW.user_id,
    NEW.section,
    NEW.topic,
    1,
    CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    COALESCE(NEW.time_spent_seconds, 0),
    NOW()
  )
  ON CONFLICT (user_id, section, topic) DO UPDATE SET
    questions_attempted = user_topic_performance.questions_attempted + 1,
    questions_correct = user_topic_performance.questions_correct + CASE WHEN NEW.is_correct THEN 1 ELSE 0 END,
    total_time_seconds = user_topic_performance.total_time_seconds + COALESCE(NEW.time_spent_seconds, 0),
    avg_time_seconds = (user_topic_performance.total_time_seconds + COALESCE(NEW.time_spent_seconds, 0))::NUMERIC
                       / (user_topic_performance.questions_attempted + 1),
    last_attempt_at = NOW(),
    updated_at = NOW();

  -- Calculate new accuracy
  SELECT
    questions_correct::NUMERIC / NULLIF(questions_attempted, 0),
    avg_confidence
  INTO new_accuracy, current_confidence
  FROM user_topic_performance
  WHERE user_id = NEW.user_id AND section = NEW.section AND topic = NEW.topic;

  -- Calculate priority score: weighted combination of accuracy and confidence
  -- If no confidence data, use accuracy alone
  -- Formula considers divergence: overconfident (high conf, low acc) gets penalized
  IF current_confidence > 0 THEN
    -- Normalize confidence to 0-1 scale (from 1-5)
    -- priority = 0.6*accuracy + 0.4*confidence - 0.2*divergence_penalty
    new_priority := GREATEST(0, LEAST(1,
      (COALESCE(new_accuracy, 0) * 0.6) +
      ((current_confidence - 1) / 4 * 0.4) -
      -- Penalty for overconfidence (high confidence, low accuracy)
      (GREATEST(0, ((current_confidence - 1) / 4) - COALESCE(new_accuracy, 0)) * 0.2)
    ));
  ELSE
    new_priority := COALESCE(new_accuracy, 0);
  END IF;

  -- Determine mastery level
  IF new_priority < 0.50 THEN
    new_mastery := 'weak';
  ELSIF new_priority < 0.75 THEN
    new_mastery := 'moderate';
  ELSE
    new_mastery := 'mastered';
  END IF;

  -- Update priority score and mastery level
  UPDATE user_topic_performance
  SET
    accuracy_rate = new_accuracy,
    priority_score = new_priority,
    mastery_level = new_mastery
  WHERE user_id = NEW.user_id AND section = NEW.section AND topic = NEW.topic;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_practice_attempt_update_topic_perf'
  ) THEN
    CREATE TRIGGER on_practice_attempt_update_topic_perf
      AFTER INSERT ON practice_attempts
      FOR EACH ROW EXECUTE FUNCTION update_user_topic_performance_on_attempt();
  END IF;
END $$;

-- ============================================
-- Function: Update topic performance on confidence rating
-- ============================================
CREATE OR REPLACE FUNCTION update_user_topic_performance_on_confidence()
RETURNS TRIGGER AS $$
DECLARE
  current_accuracy NUMERIC(5,4);
  new_avg_confidence NUMERIC(3,2);
  new_priority NUMERIC(5,4);
  new_mastery TEXT;
BEGIN
  -- Only process if confidence rating changed
  IF NEW.confidence IS NULL THEN
    RETURN NEW;
  END IF;

  -- Insert or update user topic performance with confidence data
  INSERT INTO user_topic_performance (
    user_id, section, topic,
    confidence_ratings_count, confidence_sum, last_confidence_at
  )
  VALUES (
    NEW.user_id,
    NEW.section,
    NEW.topic,
    1,
    NEW.confidence,
    NOW()
  )
  ON CONFLICT (user_id, section, topic) DO UPDATE SET
    confidence_ratings_count = user_topic_performance.confidence_ratings_count + 1,
    confidence_sum = user_topic_performance.confidence_sum + NEW.confidence,
    avg_confidence = (user_topic_performance.confidence_sum + NEW.confidence)::NUMERIC
                     / (user_topic_performance.confidence_ratings_count + 1),
    last_confidence_at = NOW(),
    updated_at = NOW();

  -- Get current accuracy and new avg confidence
  SELECT
    accuracy_rate,
    (confidence_sum + NEW.confidence)::NUMERIC / (confidence_ratings_count + 1)
  INTO current_accuracy, new_avg_confidence
  FROM user_topic_performance
  WHERE user_id = NEW.user_id AND section = NEW.section AND topic = NEW.topic;

  -- Recalculate priority score with new confidence
  IF new_avg_confidence > 0 THEN
    new_priority := GREATEST(0, LEAST(1,
      (COALESCE(current_accuracy, 0) * 0.6) +
      ((new_avg_confidence - 1) / 4 * 0.4) -
      (GREATEST(0, ((new_avg_confidence - 1) / 4) - COALESCE(current_accuracy, 0)) * 0.2)
    ));
  ELSE
    new_priority := COALESCE(current_accuracy, 0);
  END IF;

  -- Determine mastery level
  IF new_priority < 0.50 THEN
    new_mastery := 'weak';
  ELSIF new_priority < 0.75 THEN
    new_mastery := 'moderate';
  ELSE
    new_mastery := 'mastered';
  END IF;

  -- Update priority and mastery
  UPDATE user_topic_performance
  SET
    priority_score = new_priority,
    mastery_level = new_mastery
  WHERE user_id = NEW.user_id AND section = NEW.section AND topic = NEW.topic;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for confidence updates
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_question_note_confidence_update'
  ) THEN
    CREATE TRIGGER on_question_note_confidence_update
      AFTER INSERT OR UPDATE OF confidence ON question_notes
      FOR EACH ROW
      WHEN (NEW.confidence IS NOT NULL)
      EXECUTE FUNCTION update_user_topic_performance_on_confidence();
  END IF;
END $$;

-- ============================================
-- View: Adaptive question selection helper
-- ============================================
-- Returns topics weighted by mastery for adaptive selection
-- 60% weak, 30% moderate, 10% mastered
CREATE OR REPLACE VIEW user_adaptive_weights AS
SELECT
  user_id,
  section,
  topic,
  mastery_level,
  priority_score,
  accuracy_rate,
  avg_confidence,
  questions_attempted,
  CASE mastery_level
    WHEN 'weak' THEN 0.60
    WHEN 'moderate' THEN 0.30
    WHEN 'mastered' THEN 0.10
  END as selection_weight,
  -- Days since last attempt (for freshness bonus)
  EXTRACT(DAYS FROM NOW() - COALESCE(last_attempt_at, created_at)) as days_since_practice
FROM user_topic_performance;

-- ============================================
-- Function: Get adaptive question distribution for a user/section
-- ============================================
CREATE OR REPLACE FUNCTION get_adaptive_distribution(
  p_user_id UUID,
  p_section TEXT
)
RETURNS TABLE (
  topic TEXT,
  mastery_level TEXT,
  priority_score NUMERIC,
  selection_weight NUMERIC,
  suggested_question_count INTEGER
) AS $$
DECLARE
  total_questions INTEGER := 10; -- Default quiz size
BEGIN
  RETURN QUERY
  WITH topic_weights AS (
    SELECT
      utp.topic,
      utp.mastery_level,
      utp.priority_score,
      CASE utp.mastery_level
        WHEN 'weak' THEN 0.60
        WHEN 'moderate' THEN 0.30
        WHEN 'mastered' THEN 0.10
      END as weight
    FROM user_topic_performance utp
    WHERE utp.user_id = p_user_id AND utp.section = p_section
  ),
  total_weight AS (
    SELECT SUM(weight) as total FROM topic_weights
  )
  SELECT
    tw.topic,
    tw.mastery_level,
    tw.priority_score,
    tw.weight as selection_weight,
    GREATEST(1, ROUND((tw.weight / NULLIF(tot.total, 0)) * total_questions)::INTEGER) as suggested_question_count
  FROM topic_weights tw
  CROSS JOIN total_weight tot
  ORDER BY tw.priority_score ASC; -- Weakest topics first
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
