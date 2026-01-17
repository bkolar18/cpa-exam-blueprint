# Google OAuth Setup for Meridian CPA Review

## Step 1: Google Cloud Console Setup

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create or select a project

### OAuth Consent Screen
1. Go to **APIs & Services → OAuth consent screen**
2. Choose "External" user type
3. Fill in:
   - App name: `Meridian CPA Review`
   - User support email: your email
   - Developer contact email: your email
4. Add scopes: `email`, `profile`, `openid`
5. Save

### Create OAuth Credentials
1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Application type: **Web application**
4. Name: `Meridian CPA Review`
5. Add **Authorized redirect URIs**:
   ```
   https://vfpwrtccabmgjpfbqbvs.supabase.co/auth/v1/callback
   ```
   (This is your Supabase callback URL - verify in Supabase Dashboard → Authentication → Providers → Google)

6. Click Create
7. Copy the **Client ID** and **Client Secret**

## Step 2: Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Authentication → Providers → Google**
4. Toggle to **Enable**
5. Paste your **Client ID** and **Client Secret**
6. Save

## Step 3: Test

1. Go to your app's login page
2. Click "Continue with Google"
3. Should redirect to Google, then back to your dashboard

## Troubleshooting

### "redirect_uri_mismatch" error
- Make sure the redirect URI in Google Console exactly matches what Supabase shows
- Check for trailing slashes

### "access_denied" error
- Make sure your OAuth consent screen is configured
- If in "Testing" mode, add your email to test users

### Users not showing in dashboard
Run this SQL in Supabase to sync profiles:
```sql
INSERT INTO profiles (id, email, created_at)
SELECT
  au.id,
  au.email,
  au.created_at
FROM auth.users au
LEFT JOIN profiles p ON au.id = p.id
WHERE p.id IS NULL;
```
