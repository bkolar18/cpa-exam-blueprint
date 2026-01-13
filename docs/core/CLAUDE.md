# Claude Code Development Guidelines

## Core Documentation (Read Each Session)

**At the start of each session, read these core documentation files:**

1. **`docs/ANALYTICS.md`** - Analytics system documentation including:
   - Prime Meridian score calculation (formulas, AICPA weights, thresholds)
   - Admin and user analytics
   - Gamification system (badges, achievements, points)
   - Adaptive question selection algorithm
   - Database schema for analytics tables
   - Key thresholds quick reference

2. **`docs/TOPIC-MAPPING.md`** - Topic structure & AICPA mapping:
   - Visual diagrams of AICPA Content Areas → Taxonomy Topics
   - How Prime Meridian gaps map to Quiz Configuration topics
   - Quick reference for "State and Local Governments" and similar mappings
   - Key files: `prime-meridian.ts`, `taxonomy.ts`, `PrimeMeridianScore.tsx`

---

## TBS Question Development Rules

### Batch Size Limit
When adding TBS questions, **add them in batches of 10 or fewer** to avoid exceeding output token limits. This applies to all sections (FAR, AUD, REG, TCP, BAR, ISC).

### Type System Reference
Key types from `src/lib/data/tbs/types.ts`:
- **ExhibitType**: `'memo' | 'email' | 'financial_statement' | 'table' | 'invoice' | 'contract' | 'bank_statement' | 'ledger' | 'tax_form' | 'audit_report' | 'image' | 'text'`
- **RequirementType**: `'numeric' | 'dropdown' | 'journal_debit' | 'journal_credit' | 'text' | 'citation' | 'checkbox' | 'matching'`
- **TableContent**: Requires `rows: TableRow[]` where `TableRow` has `{ cells: [...] }` format
- **TextContent**: Requires `{ type: 'text', title: string, paragraphs: string[] }`

### Content Areas by Section
- **FAR**: FAR-I, FAR-II, FAR-III, FAR-IV
- **AUD**: AUD-I, AUD-II, AUD-III, AUD-IV (no AUD-V)
- **REG**: REG-I, REG-II, REG-III, REG-IV, REG-V
- **TCP**: TCP-I, TCP-II, TCP-III, TCP-IV
- **BAR**: BAR-I, BAR-II, BAR-III
- **ISC**: ISC-I, ISC-II, ISC-III

### File Paths
Always use complete absolute Windows paths with backslashes for ALL file operations.

## Current TBS Status
Target: 50 questions per section (350 total)
Current: ~190 TBS total

## Critical: Auth Architecture (Updated 2026-01-11)

### Cookie-Based Authentication
The app uses **cookie-based auth** via `@supabase/ssr`:
- **src/lib/supabase/client.ts**: Uses `createBrowserClient` from `@supabase/ssr` (NOT `createClient` from `@supabase/supabase-js`)
- **src/lib/supabase/middleware.ts**: Refreshes auth tokens on each request
- **src/lib/supabase/server.ts**: Server-side client for API routes

**Why cookies, not localStorage?**
- Server-side API routes (Next.js) cannot access localStorage
- API routes use `createClient()` from server.ts which reads cookies
- If client stores auth in localStorage, server sees no auth → 401 errors

**If auth stops working:**
1. Check client.ts is using `createBrowserClient` from `@supabase/ssr`
2. Check middleware.ts is properly refreshing sessions
3. User may need to log out and log back in

## TBS Tracking Architecture (Updated 2026-01-11)

### Key Insight: Frontend TBS IDs ≠ Database UUIDs
- Frontend TBS IDs are strings like `"far-i-1-1-je"` (defined in code)
- Database `tbs_questions` table has UUID primary keys
- **Never JOIN tbs_attempts with tbs_questions** - IDs won't match

### How TBS Tracking Works
1. When user starts TBS: Record attempt in `tbs_attempts` with `tbs_id` (string), `section`, `user_id`
2. When user completes: Update `is_complete`, `score_earned`, `score_percentage`, `time_spent_seconds`
3. Stats API queries `tbs_attempts` directly (no JOIN to tbs_questions)

### Database Migration Required
If TBS tracking shows 0 completed or errors, run this SQL in Supabase:
```sql
ALTER TABLE tbs_attempts
ADD COLUMN IF NOT EXISTS section TEXT CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'));

ALTER TABLE tbs_attempts
ALTER COLUMN tbs_id TYPE TEXT USING tbs_id::TEXT;
```

## TBS Exit Session Feature (2026-01-11)
- TBSContainer.tsx has exit confirmation modal
- "Save & Exit" saves progress as incomplete attempt
- "Exit Without Saving" exits without database update
- Uses Supabase upsert with `onConflict: 'user_id,tbs_id'`
