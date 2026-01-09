-- Question Flags Schema
-- Allows users to flag questions for review (return to, difficult, easy)

-- ============================================
-- Question Flags Table
-- ============================================
CREATE TABLE IF NOT EXISTS question_flags (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  question_id TEXT NOT NULL,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  topic TEXT NOT NULL,
  subtopic TEXT,

  -- Flag types (multiple can be true)
  flag_return_to BOOLEAN DEFAULT FALSE,    -- User wants to return to this question
  flag_difficult BOOLEAN DEFAULT FALSE,    -- User found this question difficult
  flag_easy BOOLEAN DEFAULT FALSE,         -- User found this question easy

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(user_id, question_id)
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_question_flags_user ON question_flags(user_id);
CREATE INDEX IF NOT EXISTS idx_question_flags_section ON question_flags(user_id, section);
CREATE INDEX IF NOT EXISTS idx_question_flags_return_to ON question_flags(user_id, flag_return_to) WHERE flag_return_to = TRUE;
CREATE INDEX IF NOT EXISTS idx_question_flags_difficult ON question_flags(user_id, flag_difficult) WHERE flag_difficult = TRUE;
CREATE INDEX IF NOT EXISTS idx_question_flags_easy ON question_flags(user_id, flag_easy) WHERE flag_easy = TRUE;

-- RLS
ALTER TABLE question_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own question flags" ON question_flags
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own question flags" ON question_flags
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- View: User flagged questions summary
-- ============================================
CREATE OR REPLACE VIEW user_flagged_questions_summary AS
SELECT
  user_id,
  section,
  COUNT(*) FILTER (WHERE flag_return_to) as return_to_count,
  COUNT(*) FILTER (WHERE flag_difficult) as difficult_count,
  COUNT(*) FILTER (WHERE flag_easy) as easy_count
FROM question_flags
GROUP BY user_id, section;

-- ============================================
-- Integration with adaptive learning
-- ============================================
-- Update user_topic_performance when questions are flagged as difficult
-- This adds weight to the topic being a weak area

CREATE OR REPLACE FUNCTION update_topic_perf_on_flag()
RETURNS TRIGGER AS $$
BEGIN
  -- If marked as difficult, it's a signal the user struggles with this topic
  -- We incorporate this into the adaptive system by updating confidence
  IF NEW.flag_difficult = TRUE AND (OLD IS NULL OR OLD.flag_difficult = FALSE) THEN
    -- Insert/update user_topic_performance with a negative confidence signal
    INSERT INTO user_topic_performance (
      user_id, section, topic,
      confidence_ratings_count, confidence_sum, last_confidence_at
    )
    VALUES (
      NEW.user_id,
      NEW.section,
      NEW.topic,
      1,
      2,  -- Difficult flag = confidence level 2 (Struggled)
      NOW()
    )
    ON CONFLICT (user_id, section, topic) DO UPDATE SET
      confidence_ratings_count = user_topic_performance.confidence_ratings_count + 1,
      confidence_sum = user_topic_performance.confidence_sum + 2,
      avg_confidence = (user_topic_performance.confidence_sum + 2)::NUMERIC
                       / (user_topic_performance.confidence_ratings_count + 1),
      last_confidence_at = NOW(),
      updated_at = NOW();
  END IF;

  -- If marked as easy, it's a signal the user has mastery
  IF NEW.flag_easy = TRUE AND (OLD IS NULL OR OLD.flag_easy = FALSE) THEN
    INSERT INTO user_topic_performance (
      user_id, section, topic,
      confidence_ratings_count, confidence_sum, last_confidence_at
    )
    VALUES (
      NEW.user_id,
      NEW.section,
      NEW.topic,
      1,
      5,  -- Easy flag = confidence level 5 (Perfect)
      NOW()
    )
    ON CONFLICT (user_id, section, topic) DO UPDATE SET
      confidence_ratings_count = user_topic_performance.confidence_ratings_count + 1,
      confidence_sum = user_topic_performance.confidence_sum + 5,
      avg_confidence = (user_topic_performance.confidence_sum + 5)::NUMERIC
                       / (user_topic_performance.confidence_ratings_count + 1),
      last_confidence_at = NOW(),
      updated_at = NOW();
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger (only if adaptive learning schema exists)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_topic_performance') THEN
    IF NOT EXISTS (
      SELECT 1 FROM pg_trigger WHERE tgname = 'on_question_flag_update_topic_perf'
    ) THEN
      CREATE TRIGGER on_question_flag_update_topic_perf
        AFTER INSERT OR UPDATE ON question_flags
        FOR EACH ROW EXECUTE FUNCTION update_topic_perf_on_flag();
    END IF;
  END IF;
END $$;
