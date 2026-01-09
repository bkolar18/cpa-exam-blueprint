# Admin Dashboard Setup Guide

## Overview

The CPA Exam Blueprint admin dashboard provides tools for managing users, reviewing feedback, viewing analytics, and sending announcements.

## Prerequisites

- Admin email address configured
- Supabase database tables created
- (Optional) Resend account for email announcements

## Step 1: Configure Admin Access

Add your admin email(s) to your environment variables:

```bash
# .env.local (local development)
ADMIN_EMAILS=your-email@example.com

# Multiple admins (comma-separated)
ADMIN_EMAILS=admin1@example.com,admin2@example.com
```

For production (Vercel):
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add `ADMIN_EMAILS` with your email address(es)

## Step 2: Create Database Tables

Run the following SQL in your Supabase SQL Editor:

```sql
-- Question Feedback Table
CREATE TABLE IF NOT EXISTS question_feedback (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    user_email TEXT,
    question_id TEXT NOT NULL,
    section TEXT NOT NULL,
    topic TEXT,
    feedback_type TEXT NOT NULL CHECK (feedback_type IN ('wrong_answer', 'unclear', 'outdated', 'typo', 'other')),
    comment TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
    admin_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Log Table (Audit Trail)
CREATE TABLE IF NOT EXISTS activity_log (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    actor_id UUID,
    actor_email TEXT,
    action_type TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    recipients TEXT NOT NULL,
    recipient_count INTEGER DEFAULT 0,
    sent_by TEXT,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Question Stats Table (Optional - for question analytics)
CREATE TABLE IF NOT EXISTS question_stats (
    question_id TEXT PRIMARY KEY,
    section TEXT NOT NULL,
    topic TEXT,
    times_shown INTEGER DEFAULT 0,
    times_correct INTEGER DEFAULT 0,
    accuracy_rate DECIMAL(5,4) DEFAULT 0,
    avg_time_seconds DECIMAL(10,2) DEFAULT 0,
    feedback_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Preferences Table (for theme persistence)
CREATE TABLE IF NOT EXISTS user_preferences (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id),
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_feedback_status ON question_feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_section ON question_feedback(section);
CREATE INDEX IF NOT EXISTS idx_feedback_created ON question_feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_created ON activity_log(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_activity_action ON activity_log(action_type);

-- Row Level Security (RLS)
ALTER TABLE question_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

-- Policies: Allow authenticated users to insert feedback
CREATE POLICY "Users can submit feedback" ON question_feedback
    FOR INSERT TO authenticated
    WITH CHECK (true);

-- Policies: Users can read their own preferences
CREATE POLICY "Users can read own preferences" ON user_preferences
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT TO authenticated
    WITH CHECK (auth.uid() = user_id);
```

## Step 3: Access the Dashboard

1. Log in to your CPA Exam Blueprint site with your admin email
2. Navigate to `/admin`
3. You'll see the admin dashboard with:
   - Overview stats
   - Recent feedback
   - Recent signups
   - Quick action links

## Admin Pages

| Page | URL | Purpose |
|------|-----|---------|
| Overview | `/admin` | Dashboard with key stats |
| Feedback | `/admin/feedback` | Review and manage user feedback |
| Users | `/admin/users` | View and manage users |
| Analytics | `/admin/analytics` | Platform usage metrics |
| Questions | `/admin/questions` | Question performance stats |
| Activity | `/admin/activity` | Audit log of actions |
| Announcements | `/admin/announcements` | Send email announcements |

## Features

### Global Search (Cmd+K / Ctrl+K)
Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to open global search. Search for:
- Users by email or name
- Feedback by question ID
- Questions by ID

### Bulk Actions
On the Feedback page, select multiple items to:
- Mark as Reviewed
- Mark as Resolved
- Dismiss

### Export to CSV
Most admin pages have an "Export CSV" button for data export.

### Dark Mode
Toggle dark mode using the sun/moon icon in the header.
