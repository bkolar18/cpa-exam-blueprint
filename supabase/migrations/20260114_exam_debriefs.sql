-- Create exam_debriefs table for storing AI-generated exam performance analyses
CREATE TABLE IF NOT EXISTS exam_debriefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    simulation_id TEXT NOT NULL,
    section TEXT NOT NULL,
    debrief_content TEXT NOT NULL,
    summary JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Ensure one debrief per simulation per user
    CONSTRAINT unique_user_simulation UNIQUE (user_id, simulation_id)
);

-- Create indexes for efficient queries
CREATE INDEX IF NOT EXISTS idx_exam_debriefs_user_id ON exam_debriefs(user_id);
CREATE INDEX IF NOT EXISTS idx_exam_debriefs_simulation_id ON exam_debriefs(simulation_id);
CREATE INDEX IF NOT EXISTS idx_exam_debriefs_created_at ON exam_debriefs(created_at DESC);

-- Enable RLS
ALTER TABLE exam_debriefs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own debriefs"
    ON exam_debriefs FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own debriefs"
    ON exam_debriefs FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own debriefs"
    ON exam_debriefs FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own debriefs"
    ON exam_debriefs FOR DELETE
    USING (auth.uid() = user_id);

-- Add trigger for updated_at
CREATE OR REPLACE FUNCTION update_exam_debriefs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_exam_debriefs_updated_at
    BEFORE UPDATE ON exam_debriefs
    FOR EACH ROW
    EXECUTE FUNCTION update_exam_debriefs_updated_at();
