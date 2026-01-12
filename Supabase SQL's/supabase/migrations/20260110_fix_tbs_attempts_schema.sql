-- Migration: Fix TBS attempts schema for frontend string IDs
-- Date: January 10, 2026
--
-- The frontend TBS data uses string IDs like "tbs-bar-001" instead of UUIDs.
-- This migration:
-- 1. Adds a 'section' column for direct querying without joins
-- 2. Changes tbs_id from UUID to TEXT (removing foreign key constraint)
-- 3. Makes tbs_id nullable in case it's not provided

-- Step 1: Add section column if it doesn't exist
ALTER TABLE tbs_attempts
ADD COLUMN IF NOT EXISTS section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'));

-- Step 2: Drop the foreign key constraint on tbs_id
-- First, find and drop the constraint
DO $$
DECLARE
    fk_name TEXT;
BEGIN
    SELECT conname INTO fk_name
    FROM pg_constraint
    WHERE conrelid = 'tbs_attempts'::regclass
    AND contype = 'f'
    AND confrelid = 'tbs_questions'::regclass;

    IF fk_name IS NOT NULL THEN
        EXECUTE format('ALTER TABLE tbs_attempts DROP CONSTRAINT %I', fk_name);
    END IF;
END $$;

-- Step 3: Change tbs_id from UUID to TEXT
ALTER TABLE tbs_attempts
ALTER COLUMN tbs_id TYPE TEXT USING tbs_id::TEXT;

-- Step 4: Create an index on section for faster queries
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_section ON tbs_attempts(section);

-- Step 5: Add index on user_id + section for common query pattern
CREATE INDEX IF NOT EXISTS idx_tbs_attempts_user_section ON tbs_attempts(user_id, section);

COMMENT ON COLUMN tbs_attempts.section IS 'Section code (FAR, AUD, etc) stored directly for easy querying';
COMMENT ON COLUMN tbs_attempts.tbs_id IS 'Frontend TBS ID (string format like tbs-bar-001)';
