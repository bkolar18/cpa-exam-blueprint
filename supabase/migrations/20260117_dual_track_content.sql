-- Migration: Dual-Track Tax Content Support
-- Purpose: Add fields to support OBBBA tax law changes (testable July 1, 2026)
-- Only REG and TCP sections are affected

-- Add tax content version preference to profiles
-- 'tcja' = Pre-July 2026 (TCJA rules - current law)
-- 'obbba' = Post-July 2026 (OBBBA rules - new law)
-- 'auto' = Automatic based on exam date or target_completion_date (default)
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS tax_content_version TEXT DEFAULT 'auto'
CHECK (tax_content_version IN ('tcja', 'obbba', 'auto'));

-- Add banner dismissal tracking for the OBBBA transition notification
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS obbba_banner_dismissed_at TIMESTAMPTZ DEFAULT NULL;

-- Add comments for documentation
COMMENT ON COLUMN public.profiles.tax_content_version IS
'Tax content version preference: tcja (pre-July 2026), obbba (post-July 2026), or auto (based on exam date). Only affects REG and TCP sections.';

COMMENT ON COLUMN public.profiles.obbba_banner_dismissed_at IS
'Timestamp when user dismissed the OBBBA transition banner on dashboard';

-- Optional: Add content version tracking to practice_attempts for analytics
-- This allows tracking which version of questions users are practicing
ALTER TABLE public.practice_attempts
ADD COLUMN IF NOT EXISTS tax_content_version TEXT DEFAULT NULL
CHECK (tax_content_version IS NULL OR tax_content_version IN ('tcja', 'obbba'));

COMMENT ON COLUMN public.practice_attempts.tax_content_version IS
'Tax content version used for this attempt (only populated for REG/TCP questions)';
