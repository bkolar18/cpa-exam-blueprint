# Admin Dashboard Access

## Overview

The admin dashboard at `/admin` provides administrative controls for managing users, feedback, analytics, announcements, and security monitoring.

## Access Requirements

1. **Must be logged in** - Sign in with a regular account on the site
2. **Email must be authorized** - Your account email must be in the `ADMIN_EMAILS` environment variable

## Configuration

### Environment Variable

Add admin emails to your environment configuration:

```bash
# .env.local (local development)
ADMIN_EMAILS=admin@example.com,another-admin@example.com
```

**Format:**
- Comma-separated list of email addresses
- No spaces around commas (or they'll be trimmed)
- Case-insensitive matching

### Vercel (Production)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add or update `ADMIN_EMAILS`:
   - **Key:** `ADMIN_EMAILS`
   - **Value:** `your-email@example.com,other-admin@example.com`
   - **Environment:** Production (and Preview/Development if needed)
4. **Redeploy** for changes to take effect

### Adding a New Admin

1. Get the user's email address (must match their login email exactly)
2. Add it to `ADMIN_EMAILS` in Vercel:
   ```
   existing-admin@example.com,new-admin@example.com
   ```
3. Redeploy the application
4. User can now access `/admin` after logging in

### Removing an Admin

1. Remove their email from the `ADMIN_EMAILS` list in Vercel
2. Redeploy the application
3. User will get "Admin access required" error when trying to access `/admin`

## Admin Dashboard Features

| Section | Path | Description |
|---------|------|-------------|
| Overview | `/admin` | Dashboard stats, recent activity |
| Feedback | `/admin/feedback` | User-submitted question feedback |
| Users | `/admin/users` | User management and details |
| Analytics | `/admin/analytics` | Usage statistics and trends |
| Questions | `/admin/questions` | Question statistics |
| Activity Log | `/admin/activity` | Admin and user action history |
| Announcements | `/admin/announcements` | Send announcements to users |
| Security | `/admin/security` | Security events, rate limits, CSP violations |

## How Authentication Works

**File:** `src/lib/admin/auth.ts`

```typescript
// Check if email is authorized
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

// Get current user and admin status
export async function getAdminUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return {
    user,
    isAdmin: isAdminEmail(user?.email)
  };
}

// Require admin access (throws if not admin)
export async function requireAdmin() {
  const { user, isAdmin } = await getAdminUser();
  if (!user) throw new Error('Authentication required');
  if (!isAdmin) throw new Error('Admin access required');
  return user;
}
```

## Security Notes

- Admin emails are stored server-side only (environment variable)
- Email matching is case-insensitive
- All admin actions are logged to the activity log
- The admin layout checks authentication on every page load
- API routes use `requireAdmin()` to protect sensitive endpoints

## Troubleshooting

### "Admin access required" error
- Verify your email is in `ADMIN_EMAILS` (check for typos)
- Ensure you redeployed after adding your email
- Check that you're logged in with the correct account

### Can't see admin link
- The admin panel is accessed directly via URL (`/admin`)
- There's no automatic link for regular users

### Changes not taking effect
- Environment variable changes require a redeploy
- Clear your browser cache if issues persist
- Check Vercel logs for any errors

## Activity Logging

Admin actions are automatically logged:

```typescript
import { logAdminAction, ActionTypes } from '@/lib/admin/auth';

// Example: Log when resolving feedback
await logAdminAction(ActionTypes.FEEDBACK_RESOLVED, {
  targetType: 'feedback',
  targetId: feedbackId,
  metadata: { resolution: 'fixed' }
});
```

### Action Types

| Action | Description |
|--------|-------------|
| `admin_login` | Admin accessed the dashboard |
| `feedback_resolved` | Feedback marked as resolved |
| `feedback_dismissed` | Feedback dismissed |
| `feedback_bulk_update` | Multiple feedback items updated |
| `user_viewed` | Admin viewed user details |
| `export_data` | Data exported |
| `announcement_sent` | Announcement sent to users |
