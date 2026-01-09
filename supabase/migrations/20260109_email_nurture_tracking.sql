-- Email Nurture Sequence Tracking
-- Tracks which emails have been sent to each user in the welcome sequence

-- Table to track email sequence progress
CREATE TABLE IF NOT EXISTS email_sequence_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL, -- For tracking non-registered leads
  sequence_type TEXT NOT NULL DEFAULT 'welcome', -- 'welcome', 'score-release', 'nts-reminder'
  current_email_id INTEGER NOT NULL DEFAULT 0, -- Which email in sequence (0 = hasn't started)
  last_email_sent_at TIMESTAMPTZ,
  next_email_scheduled_at TIMESTAMPTZ,
  signup_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  -- User segments for targeted content
  segments JSONB DEFAULT '[]'::jsonb, -- ['working-full-time', 'far-first', etc.]

  -- Engagement tracking
  total_emails_sent INTEGER DEFAULT 0,
  total_opens INTEGER DEFAULT 0,
  total_clicks INTEGER DEFAULT 0,

  -- Status
  is_active BOOLEAN DEFAULT true, -- false = unsubscribed or bounced
  unsubscribed_at TIMESTAMPTZ,
  bounce_reason TEXT,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for efficient queries
CREATE INDEX IF NOT EXISTS idx_email_sequence_active ON email_sequence_progress(is_active, next_email_scheduled_at);
CREATE INDEX IF NOT EXISTS idx_email_sequence_user ON email_sequence_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_email_sequence_email ON email_sequence_progress(email);

-- Table to log all sent emails (for debugging and analytics)
CREATE TABLE IF NOT EXISTS email_send_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  progress_id UUID REFERENCES email_sequence_progress(id) ON DELETE CASCADE,
  email_to TEXT NOT NULL,
  email_id INTEGER NOT NULL, -- Which email in the sequence
  sequence_type TEXT NOT NULL,
  subject TEXT NOT NULL,

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'bounced'
  resend_message_id TEXT, -- ID from Resend for tracking
  error_message TEXT,

  -- Engagement (updated via webhook)
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,

  -- Timestamps
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_email_send_log_status ON email_send_log(status, sent_at);
CREATE INDEX IF NOT EXISTS idx_email_send_log_resend ON email_send_log(resend_message_id);

-- Table for triggered emails (NTS reminders, score release, etc.)
CREATE TABLE IF NOT EXISTS triggered_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  trigger_type TEXT NOT NULL, -- 'nts_reminder', 'score_release', 'streak_break', 'section_passed'
  trigger_date DATE NOT NULL, -- When to send
  trigger_data JSONB, -- Additional context (e.g., {section: 'FAR', nts_expiry: '2026-03-15'})

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'sent', 'cancelled'
  sent_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_triggered_emails_pending ON triggered_emails(status, trigger_date);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_email_sequence_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updated_at
DROP TRIGGER IF EXISTS email_sequence_progress_updated_at ON email_sequence_progress;
CREATE TRIGGER email_sequence_progress_updated_at
  BEFORE UPDATE ON email_sequence_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_email_sequence_updated_at();

-- RLS Policies (users can see their own data, service role can see all)
ALTER TABLE email_sequence_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_send_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE triggered_emails ENABLE ROW LEVEL SECURITY;

-- Users can read their own sequence progress
CREATE POLICY "Users can read own email progress"
  ON email_sequence_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Service role (API) can read/write all
CREATE POLICY "Service role full access to email_sequence_progress"
  ON email_sequence_progress FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to email_send_log"
  ON email_send_log FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to triggered_emails"
  ON triggered_emails FOR ALL
  USING (auth.role() = 'service_role');

-- Users can read their own triggered emails
CREATE POLICY "Users can read own triggered emails"
  ON triggered_emails FOR SELECT
  USING (auth.uid() = user_id);
