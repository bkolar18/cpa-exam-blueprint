-- Security Enhancement: Restrict profile deletion
-- Users should not be able to delete their own profiles directly
-- Profile deletion should happen through auth.users deletion (cascade)

-- Drop existing permissive policy if exists
DROP POLICY IF EXISTS "Users can manage own profile" ON profiles;
DROP POLICY IF EXISTS "Users can delete own profile" ON profiles;

-- Ensure only SELECT, UPDATE, INSERT are allowed (no DELETE)
-- The existing policies should already be fine, but let's be explicit

-- Verify existing policies are correct (SELECT, UPDATE, INSERT only)
-- No action needed if policies are already restrictive

-- Add explicit denial comment for documentation
COMMENT ON TABLE profiles IS 'User profiles - DELETE restricted. Profiles are deleted via CASCADE when auth.users record is deleted.';

-- ============================================
-- Security Event Log Table (Enhanced Logging)
-- ============================================
CREATE TABLE IF NOT EXISTS security_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  ip_address TEXT,
  user_agent TEXT,
  endpoint TEXT,
  method TEXT,
  status_code INTEGER,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for security event queries
CREATE INDEX IF NOT EXISTS idx_security_events_type ON security_events(event_type);
CREATE INDEX IF NOT EXISTS idx_security_events_severity ON security_events(severity);
CREATE INDEX IF NOT EXISTS idx_security_events_user ON security_events(user_id);
CREATE INDEX IF NOT EXISTS idx_security_events_created ON security_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_security_events_ip ON security_events(ip_address);

-- RLS - Service role only (security logs are sensitive)
ALTER TABLE security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON security_events
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- Rate Limiting Table
-- ============================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier TEXT NOT NULL, -- IP address or user ID
  endpoint TEXT NOT NULL,
  window_start TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  request_count INTEGER DEFAULT 1,
  UNIQUE(identifier, endpoint, window_start)
);

-- Index for rate limit lookups
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON rate_limits(identifier, endpoint, window_start);

-- Auto-cleanup old rate limit records (older than 1 hour)
CREATE OR REPLACE FUNCTION cleanup_old_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS - Service role only
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON rate_limits
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- CSP Violation Reports Table
-- ============================================
CREATE TABLE IF NOT EXISTS csp_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_uri TEXT,
  referrer TEXT,
  violated_directive TEXT,
  effective_directive TEXT,
  original_policy TEXT,
  disposition TEXT,
  blocked_uri TEXT,
  status_code INTEGER,
  script_sample TEXT,
  source_file TEXT,
  line_number INTEGER,
  column_number INTEGER,
  user_agent TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for CSP report analysis
CREATE INDEX IF NOT EXISTS idx_csp_reports_directive ON csp_reports(violated_directive);
CREATE INDEX IF NOT EXISTS idx_csp_reports_created ON csp_reports(created_at DESC);

-- RLS - Service role only
ALTER TABLE csp_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access" ON csp_reports
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- View for Security Dashboard
-- ============================================
CREATE OR REPLACE VIEW security_summary AS
SELECT
  event_type,
  severity,
  COUNT(*) as count,
  MAX(created_at) as last_occurrence
FROM security_events
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY event_type, severity
ORDER BY
  CASE severity
    WHEN 'critical' THEN 1
    WHEN 'high' THEN 2
    WHEN 'medium' THEN 3
    WHEN 'low' THEN 4
  END,
  count DESC;
