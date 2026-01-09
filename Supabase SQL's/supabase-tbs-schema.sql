-- CPA Exam Blueprint - Task-Based Simulation (TBS) Database Schema
-- Run this in Supabase SQL Editor to set up the TBS tables
-- Date: January 9, 2026

-- ============================================================================
-- TBS QUESTIONS MASTER TABLE
-- ============================================================================

CREATE TABLE tbs_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  tbs_type TEXT NOT NULL CHECK (tbs_type IN (
    'numeric_entry',
    'document_review',
    'journal_entry',
    'research',
    'reconciliation',
    'written_communication'
  )),
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  title TEXT NOT NULL,
  scenario_text TEXT NOT NULL,
  time_estimate_minutes INTEGER DEFAULT 15,
  max_score_points INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tbs_questions IS 'Master table for Task-Based Simulation questions';
COMMENT ON COLUMN tbs_questions.scenario_text IS 'Main problem description and context';
COMMENT ON COLUMN tbs_questions.max_score_points IS 'Total possible points for this TBS';

-- ============================================================================
-- TBS EXHIBITS (Supporting Documents)
-- ============================================================================

CREATE TABLE tbs_exhibits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  exhibit_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  exhibit_type TEXT NOT NULL CHECK (exhibit_type IN (
    'memo', 'email', 'financial_statement', 'table',
    'invoice', 'contract', 'bank_statement', 'ledger',
    'tax_form', 'audit_report', 'image', 'text'
  )),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tbs_id, exhibit_order)
);

COMMENT ON TABLE tbs_exhibits IS 'Supporting documents and data for TBS questions';
COMMENT ON COLUMN tbs_exhibits.content IS 'Structured content in JSON format based on exhibit_type';

-- ============================================================================
-- TBS REQUIREMENTS (Individual Scored Items)
-- ============================================================================

CREATE TABLE tbs_requirements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  requirement_order INTEGER NOT NULL,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN (
    'numeric',
    'dropdown',
    'journal_debit',
    'journal_credit',
    'text',
    'citation',
    'checkbox',
    'matching'
  )),
  label TEXT NOT NULL,
  description TEXT,
  cell_reference TEXT,
  grid_row INTEGER,
  grid_column INTEGER,
  points INTEGER NOT NULL DEFAULT 1,
  correct_answer JSONB NOT NULL,
  partial_credit_rules JSONB,
  explanation TEXT,
  hint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(tbs_id, requirement_order)
);

COMMENT ON TABLE tbs_requirements IS 'Individual scored items within a TBS';
COMMENT ON COLUMN tbs_requirements.cell_reference IS 'Grid position reference (e.g., A1, B3)';
COMMENT ON COLUMN tbs_requirements.correct_answer IS 'Structured correct answer with tolerances';
COMMENT ON COLUMN tbs_requirements.partial_credit_rules IS 'Rules for awarding partial credit';

-- ============================================================================
-- TBS DROPDOWN OPTIONS
-- ============================================================================

CREATE TABLE tbs_dropdown_options (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requirement_id UUID REFERENCES tbs_requirements(id) ON DELETE CASCADE NOT NULL,
  option_order INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false,
  UNIQUE(requirement_id, option_order)
);

COMMENT ON TABLE tbs_dropdown_options IS 'Options for dropdown-type requirements';

-- ============================================================================
-- TBS JOURNAL ENTRY ACCOUNTS
-- ============================================================================

CREATE TABLE tbs_je_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT,
  account_type TEXT CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
  normal_balance TEXT CHECK (normal_balance IN ('debit', 'credit')),
  category TEXT,
  is_distractor BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0
);

COMMENT ON TABLE tbs_je_accounts IS 'Account options for journal entry TBS questions';
COMMENT ON COLUMN tbs_je_accounts.is_distractor IS 'Whether this is a wrong option included for difficulty';
COMMENT ON COLUMN tbs_je_accounts.category IS 'For grouping accounts in dropdown (e.g., Current Assets)';

-- ============================================================================
-- AUTHORITATIVE LITERATURE (For Research TBS)
-- ============================================================================

CREATE TABLE tbs_authoritative_literature (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('FASB', 'AICPA', 'IRC', 'PCAOB', 'SEC', 'GASB')),
  topic_code TEXT NOT NULL,
  topic_title TEXT NOT NULL,
  subtopic_code TEXT,
  subtopic_title TEXT,
  section_code TEXT,
  section_title TEXT,
  paragraph TEXT,
  content TEXT NOT NULL,
  keywords TEXT[],
  effective_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tbs_authoritative_literature IS 'Searchable authoritative literature for research simulations';

-- ============================================================================
-- USER TBS ATTEMPTS
-- ============================================================================

CREATE TABLE tbs_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  responses JSONB NOT NULL DEFAULT '{}',
  score_earned INTEGER,
  max_score INTEGER,
  score_percentage DECIMAL(5,2),
  grading_details JSONB,
  is_complete BOOLEAN DEFAULT false,
  last_saved_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tbs_attempts IS 'User attempts on TBS questions with responses and scores';
COMMENT ON COLUMN tbs_attempts.responses IS 'User responses keyed by requirement_id';
COMMENT ON COLUMN tbs_attempts.grading_details IS 'Detailed breakdown per requirement';

-- ============================================================================
-- USER HIGHLIGHTS (For Document Review)
-- ============================================================================

CREATE TABLE tbs_user_highlights (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  attempt_id UUID REFERENCES tbs_attempts(id) ON DELETE CASCADE NOT NULL,
  exhibit_id UUID REFERENCES tbs_exhibits(id) ON DELETE CASCADE NOT NULL,
  start_position INTEGER NOT NULL,
  end_position INTEGER NOT NULL,
  highlight_color TEXT DEFAULT 'yellow' CHECK (highlight_color IN ('yellow', 'green', 'blue', 'pink')),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE tbs_user_highlights IS 'User-created highlights during TBS attempts';

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- TBS Questions indexes
CREATE INDEX idx_tbs_questions_section ON tbs_questions(section);
CREATE INDEX idx_tbs_questions_type ON tbs_questions(tbs_type);
CREATE INDEX idx_tbs_questions_topic ON tbs_questions(topic);
CREATE INDEX idx_tbs_questions_difficulty ON tbs_questions(difficulty);
CREATE INDEX idx_tbs_questions_active ON tbs_questions(is_active) WHERE is_active = true;

-- TBS Exhibits indexes
CREATE INDEX idx_tbs_exhibits_tbs ON tbs_exhibits(tbs_id);

-- TBS Requirements indexes
CREATE INDEX idx_tbs_requirements_tbs ON tbs_requirements(tbs_id);
CREATE INDEX idx_tbs_requirements_type ON tbs_requirements(requirement_type);

-- TBS Dropdown Options indexes
CREATE INDEX idx_tbs_dropdown_requirement ON tbs_dropdown_options(requirement_id);

-- TBS Journal Accounts indexes
CREATE INDEX idx_tbs_je_accounts_tbs ON tbs_je_accounts(tbs_id);

-- Authoritative Literature indexes
CREATE INDEX idx_tbs_literature_source ON tbs_authoritative_literature(source);
CREATE INDEX idx_tbs_literature_topic ON tbs_authoritative_literature(topic_code);
CREATE INDEX idx_tbs_literature_keywords ON tbs_authoritative_literature USING GIN(keywords);

-- Full text search index for literature content
CREATE INDEX idx_tbs_literature_content_fts ON tbs_authoritative_literature
  USING GIN(to_tsvector('english', content));

-- TBS Attempts indexes
CREATE INDEX idx_tbs_attempts_user ON tbs_attempts(user_id);
CREATE INDEX idx_tbs_attempts_tbs ON tbs_attempts(tbs_id);
CREATE INDEX idx_tbs_attempts_user_tbs ON tbs_attempts(user_id, tbs_id);
CREATE INDEX idx_tbs_attempts_completed ON tbs_attempts(user_id, is_complete);
CREATE INDEX idx_tbs_attempts_section ON tbs_attempts(user_id, (
  SELECT section FROM tbs_questions WHERE tbs_questions.id = tbs_attempts.tbs_id
));

-- User Highlights indexes
CREATE INDEX idx_tbs_highlights_attempt ON tbs_user_highlights(attempt_id);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================

ALTER TABLE tbs_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_exhibits ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_dropdown_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_je_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_authoritative_literature ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_user_highlights ENABLE ROW LEVEL SECURITY;

-- Public read access for TBS content (authenticated users only)
CREATE POLICY "TBS questions viewable by authenticated users" ON tbs_questions
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "TBS exhibits viewable by authenticated users" ON tbs_exhibits
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM tbs_questions
      WHERE tbs_questions.id = tbs_exhibits.tbs_id
      AND tbs_questions.is_active = true
    )
  );

CREATE POLICY "TBS requirements viewable by authenticated users" ON tbs_requirements
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM tbs_questions
      WHERE tbs_questions.id = tbs_requirements.tbs_id
      AND tbs_questions.is_active = true
    )
  );

CREATE POLICY "TBS dropdown options viewable by authenticated users" ON tbs_dropdown_options
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM tbs_requirements r
      JOIN tbs_questions q ON q.id = r.tbs_id
      WHERE r.id = tbs_dropdown_options.requirement_id
      AND q.is_active = true
    )
  );

CREATE POLICY "TBS journal accounts viewable by authenticated users" ON tbs_je_accounts
  FOR SELECT TO authenticated USING (
    EXISTS (
      SELECT 1 FROM tbs_questions
      WHERE tbs_questions.id = tbs_je_accounts.tbs_id
      AND tbs_questions.is_active = true
    )
  );

CREATE POLICY "Authoritative literature viewable by authenticated users" ON tbs_authoritative_literature
  FOR SELECT TO authenticated USING (true);

-- User-specific policies for attempts
CREATE POLICY "Users can view own TBS attempts" ON tbs_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own TBS attempts" ON tbs_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own TBS attempts" ON tbs_attempts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own TBS attempts" ON tbs_attempts
  FOR DELETE USING (auth.uid() = user_id);

-- User highlights policies
CREATE POLICY "Users can view own highlights" ON tbs_user_highlights
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM tbs_attempts
      WHERE tbs_attempts.id = tbs_user_highlights.attempt_id
      AND tbs_attempts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own highlights" ON tbs_user_highlights
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM tbs_attempts
      WHERE tbs_attempts.id = tbs_user_highlights.attempt_id
      AND tbs_attempts.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own highlights" ON tbs_user_highlights
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM tbs_attempts
      WHERE tbs_attempts.id = tbs_user_highlights.attempt_id
      AND tbs_attempts.user_id = auth.uid()
    )
  );

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================================================

CREATE TRIGGER update_tbs_questions_updated_at
  BEFORE UPDATE ON tbs_questions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_tbs_literature_updated_at
  BEFORE UPDATE ON tbs_authoritative_literature
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================================
-- AUTO-SAVE TRIGGER FOR ATTEMPTS
-- ============================================================================

CREATE OR REPLACE FUNCTION update_tbs_attempt_last_saved()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_saved_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tbs_attempt_saved
  BEFORE UPDATE ON tbs_attempts
  FOR EACH ROW EXECUTE FUNCTION update_tbs_attempt_last_saved();

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get TBS with all related data
CREATE OR REPLACE FUNCTION get_tbs_with_details(p_tbs_id UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'question', row_to_json(q),
    'exhibits', (
      SELECT json_agg(row_to_json(e) ORDER BY e.exhibit_order)
      FROM tbs_exhibits e WHERE e.tbs_id = q.id
    ),
    'requirements', (
      SELECT json_agg(
        json_build_object(
          'requirement', row_to_json(r),
          'dropdown_options', (
            SELECT json_agg(row_to_json(d) ORDER BY d.option_order)
            FROM tbs_dropdown_options d WHERE d.requirement_id = r.id
          )
        ) ORDER BY r.requirement_order
      )
      FROM tbs_requirements r WHERE r.tbs_id = q.id
    ),
    'journal_accounts', (
      SELECT json_agg(row_to_json(ja) ORDER BY ja.display_order)
      FROM tbs_je_accounts ja WHERE ja.tbs_id = q.id
    )
  ) INTO result
  FROM tbs_questions q
  WHERE q.id = p_tbs_id AND q.is_active = true;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to search authoritative literature
CREATE OR REPLACE FUNCTION search_authoritative_literature(
  p_query TEXT,
  p_source TEXT DEFAULT NULL,
  p_limit INTEGER DEFAULT 20
)
RETURNS TABLE (
  id UUID,
  source TEXT,
  topic_code TEXT,
  topic_title TEXT,
  section_code TEXT,
  content TEXT,
  rank REAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    al.id,
    al.source,
    al.topic_code,
    al.topic_title,
    al.section_code,
    al.content,
    ts_rank(to_tsvector('english', al.content), plainto_tsquery('english', p_query)) AS rank
  FROM tbs_authoritative_literature al
  WHERE
    (p_source IS NULL OR al.source = p_source)
    AND (
      to_tsvector('english', al.content) @@ plainto_tsquery('english', p_query)
      OR al.topic_code ILIKE '%' || p_query || '%'
      OR al.topic_title ILIKE '%' || p_query || '%'
      OR p_query = ANY(al.keywords)
    )
  ORDER BY rank DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to calculate user TBS statistics
CREATE OR REPLACE FUNCTION get_user_tbs_stats(p_user_id UUID, p_section TEXT DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_attempts', COUNT(*),
    'completed_attempts', COUNT(*) FILTER (WHERE is_complete = true),
    'average_score', ROUND(AVG(score_percentage) FILTER (WHERE is_complete = true), 2),
    'average_time_minutes', ROUND(AVG(time_spent_seconds / 60.0) FILTER (WHERE is_complete = true), 1),
    'unique_tbs_attempted', COUNT(DISTINCT tbs_id),
    'score_by_type', (
      SELECT json_object_agg(
        q.tbs_type,
        ROUND(AVG(a.score_percentage), 2)
      )
      FROM tbs_attempts a
      JOIN tbs_questions q ON q.id = a.tbs_id
      WHERE a.user_id = p_user_id
        AND a.is_complete = true
        AND (p_section IS NULL OR q.section = p_section)
      GROUP BY q.tbs_type
    )
  ) INTO result
  FROM tbs_attempts a
  JOIN tbs_questions q ON q.id = a.tbs_id
  WHERE a.user_id = p_user_id
    AND (p_section IS NULL OR q.section = p_section);

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SAMPLE DATA INSERTION (Optional - for testing)
-- ============================================================================

-- Uncomment and modify to insert sample TBS data
/*
INSERT INTO tbs_questions (section, tbs_type, topic, subtopic, difficulty, title, scenario_text, time_estimate_minutes, max_score_points)
VALUES (
  'FAR',
  'journal_entry',
  'Leases',
  'Finance Lease Accounting',
  'medium',
  'Recording a Finance Lease',
  'On January 1, Year 1, Riverside Corp. entered into a lease agreement for equipment. Review the lease terms in the exhibits and prepare the journal entry to record the lease at inception.',
  12,
  4
);
*/

-- ============================================================================
-- GRANTS (if needed for specific roles)
-- ============================================================================

-- Grant usage on functions to authenticated users
GRANT EXECUTE ON FUNCTION get_tbs_with_details(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION search_authoritative_literature(TEXT, TEXT, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION get_user_tbs_stats(UUID, TEXT) TO authenticated;
