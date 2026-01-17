-- Migration: Add tbs_type column to tbs_attempts table
-- Purpose: Track TBS type for analytics breakdown
-- Date: 2025-01-17

-- Add tbs_type column to tbs_attempts if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'tbs_attempts' AND column_name = 'tbs_type'
  ) THEN
    ALTER TABLE tbs_attempts ADD COLUMN tbs_type VARCHAR(50);
  END IF;
END $$;

-- Create index for tbs_type queries
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_tbs_type ON tbs_attempts(tbs_type);

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_section ON tbs_attempts(section);
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_created_at ON tbs_attempts(created_at);

-- Backfill existing records by inferring type from tbs_id patterns
-- TBS IDs typically follow patterns like: tbs-far-001, tbs-aud-je-001
UPDATE tbs_attempts
SET tbs_type = CASE
  WHEN LOWER(tbs_id) LIKE '%je%' OR LOWER(tbs_id) LIKE '%journal%' THEN 'journal_entry'
  WHEN LOWER(tbs_id) LIKE '%doc%' OR LOWER(tbs_id) LIKE '%document%' THEN 'document_review'
  WHEN LOWER(tbs_id) LIKE '%recon%' OR LOWER(tbs_id) LIKE '%reconciliation%' THEN 'reconciliation'
  WHEN LOWER(tbs_id) LIKE '%drop%' OR LOWER(tbs_id) LIKE '%dropdown%' THEN 'dropdown'
  WHEN LOWER(tbs_id) LIKE '%num%' OR LOWER(tbs_id) LIKE '%numeric%' THEN 'numeric_entry'
  WHEN LOWER(tbs_id) LIKE '%calc%' OR LOWER(tbs_id) LIKE '%calculation%' THEN 'calculation'
  WHEN LOWER(tbs_id) LIKE '%research%' THEN 'research'
  ELSE 'general'
END
WHERE tbs_type IS NULL;

-- Add comment for documentation
COMMENT ON COLUMN tbs_attempts.tbs_type IS 'Type of TBS (journal_entry, document_review, reconciliation, dropdown, numeric_entry, calculation, research, general)';
