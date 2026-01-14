-- Create pre_exam_assessments table for storing AI-generated pre-exam readiness assessments
CREATE TABLE IF NOT EXISTS pre_exam_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    section TEXT NOT NULL,
    exam_date DATE NOT NULL,
    assessment_content TEXT NOT NULL,
    summary JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Ensure one assessment per section per exam date per user
    CONSTRAINT unique_user_section_exam_date UNIQUE (user_id, section, exam_date)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_pre_exam_assessments_user_id ON pre_exam_assessments(user_id);
CREATE INDEX IF NOT EXISTS idx_pre_exam_assessments_section ON pre_exam_assessments(section);
CREATE INDEX IF NOT EXISTS idx_pre_exam_assessments_exam_date ON pre_exam_assessments(exam_date);
CREATE INDEX IF NOT EXISTS idx_pre_exam_assessments_created_at ON pre_exam_assessments(created_at DESC);

-- Enable RLS
ALTER TABLE pre_exam_assessments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own assessments"
    ON pre_exam_assessments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments"
    ON pre_exam_assessments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessments"
    ON pre_exam_assessments FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessments"
    ON pre_exam_assessments FOR DELETE
    USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_pre_exam_assessments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_pre_exam_assessments_updated_at
    BEFORE UPDATE ON pre_exam_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_pre_exam_assessments_updated_at();
