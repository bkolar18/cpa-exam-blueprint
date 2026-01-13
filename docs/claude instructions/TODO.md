# CPA Exam Blueprint - TODO

## 2026-01-12

### Current Tasks (Prime Meridian Refinements)

#### 1. Replace Section-Specific Tip with General Tip
**Status:** ✅ COMPLETED
**File:** `src/lib/scoring/prime-meridian.ts` (lines 476-512)
**Issue:** The tip "Focus on improving Select Transactions (currently 45%)" is too section-specific and confusing
**Solution:** Replace with a more general tip like "Focus on your weakest content areas" without specific names
**Implementation:**
- Modify `generateRecommendedActions()` function
- Change weak area tip from `"Focus on improving ${weakestArea.name.split(',')[0]} (currently ${weakestArea.rawScore}%)"` to `"Review content areas where your accuracy is below 60%"`

#### 2. Remove MCQ/TBS Score Percentage Displays
**Status:** ✅ COMPLETED
**File:** `src/components/dashboard/PrimeMeridianScore.tsx` (lines 147-171)
**Issue:** The "MCQ Score 15%" and "TBS Score 4%" displays confuse users who don't understand what they represent
**Solution:** Remove the MCQ/TBS breakdown boxes entirely
**Implementation:**
- Delete the entire "MCQ / TBS Breakdown" section (lines 147-171)
- Keep the overall Prime Meridian score visible

#### 3. Fix TBS Topic Classification Issue
**Status:** ✅ COMPLETED
**Files:**
- `src/lib/scoring/prime-meridian.ts` (TOPIC_TO_CONTENT_AREA mapping, lines 58-222)
- `src/app/dashboard/readiness/page.tsx` (TBS Progress section)
**Issue:** 3 TBS completed but only 1 shows in TBS Progress section - topics not mapped correctly
**Root Cause:** TBS files use topics like "Employee Benefits", "Long-term Liabilities", "State and Local Governments" but these aren't in TOPIC_TO_CONTENT_AREA mapping
**Solution:** Expand TOPIC_TO_CONTENT_AREA to include all TBS topics
**Missing FAR mappings to add:**
- "Employee Benefits" → "FAR-II"
- "Long-term Liabilities" → "FAR-II"
- "State and Local Governments" → "FAR-IV" (normalize from "Government Accounting")

**Missing BAR mappings to add:**
- "Financial Analysis" → "BAR-I"
- "Cost Accounting" → "BAR-I"
- "Budgeting" → "BAR-I"
- "Performance Evaluation" → "BAR-I"
- "Decision Analysis" → "BAR-I"
- "Operations Management" → "BAR-I"
- "Cost Estimation" → "BAR-I"
- "Cost Management" → "BAR-I"

#### 4. Categorize Untiered Badges and Fix Tracking
**Status:** ✅ COMPLETED (SQL migration created - needs to be run in Supabase)
**Files:**
- `Supabase SQL's/supabase-gamification-schema.sql` (badge/achievement definitions)
- `src/lib/gamification/checker.ts` (achievement trigger logic)
- **NEW:** `supabase/migrations/20260112_add_practice_achievements.sql`
**Issue:** User reports 17 badges without tier classification and "complete your first practice question" not awarding
**Investigation Findings:**
- All badges in SQL have tiers defined
- Practice question achievements were MISSING from the database
- The checker.ts now includes `first_question` code lookup

**Solution Implemented:**
1. Created SQL migration file with 9 new practice achievements (all properly tiered):
   - `first_question` (bronze, 10 pts) - Answer 1 question
   - `warm_up` (bronze, 15 pts) - Answer 10 questions
   - `getting_started` (bronze, 20 pts) - Answer 25 questions
   - `practice_makes_perfect` (silver, 30 pts) - Answer 50 questions
   - `century_club` (silver, 40 pts) - Answer 100 questions
   - `question_machine` (gold, 60 pts) - Answer 250 questions
   - `practice_warrior` (gold, 90 pts) - Answer 500 questions
   - `question_master` (platinum, 150 pts) - Answer 1000 questions
   - `perfect_session` (gold, hidden, 75 pts) - 100% in 10+ question session
2. Updated checker.ts to recognize `first_question` code
3. User needs to run the SQL migration in Supabase SQL Editor

**ACTION REQUIRED:**
Run the SQL file in Supabase SQL Editor:
`supabase/migrations/20260112_add_practice_achievements.sql`

### Completed Today

- [x] Sync TBS tracking between Readiness Dashboard and Simulations page
  - Changed to use best score per TBS
  - Only count TBS that exist in local data
- [x] Sync MCQ tracking between Practice page and Readiness Dashboard
  - Changed to use best attempt per question
- [x] Fix mobile display issues on Readiness Dashboard
- [x] Add resume simulation banner on Simulations page
- [x] Implement mobile-responsive TBS simulation layout (SplitView tabs, TBSHeader)

---

## 2026-01-11

### Completed Today
- [x] Implement dropdown question functionality for TBS
  - Added `case "dropdown"` handler in WorkArea.tsx
  - Uses existing DropdownSelect component for rendering dropdown questions
  - Now properly renders dropdown selection TBS questions (previously showed "under development")
- [x] Build automated TBS validation script (`scripts/validate-tbs.js`)
  - Checks for duplicate IDs, missing fields, invalid enums
  - Validates content area matches section
  - Flags potentially outdated content (years, tax keywords)
  - **Found & fixed**: sample-tbs.ts had duplicate IDs with section files (excluded from allTBSQuestions)
- [x] Create AICPA Blueprint alignment checker (`scripts/check-blueprint-alignment.js`)
  - Compares content area distribution against AICPA weight ranges
  - Identified alignment issues in FAR-I, AUD-II, TCP-II, BAR-I
- [x] Add TBS questions to align with AICPA Blueprint weights
  - **FAR-I**: Added 5 questions (tbs-far-087 through tbs-far-091)
    - Conceptual framework, qualitative characteristics, recognition/measurement
    - FAR-I now at 26% (within 25-35% target)
  - **AUD-II**: Added 5 questions (tbs-aud-087 through tbs-aud-091)
    - Risk assessment procedures, materiality, understanding entity, control environment
    - AUD-II improved from 19% to 24%
  - **TCP-II**: Added 8 questions (tbs-tcp-076 through tbs-tcp-083)
    - C corp taxation, partnership basis, S corp eligibility, business deductions
    - TCP-II improved from 20% to 28%
  - **BAR-I**: Added 4 questions (tbs-bar-076 through tbs-bar-079)
    - Financial forecasting, data analytics, financial modeling, trend analysis
    - BAR-I now at 41% (within 40-50% target)
  - **Total TBS questions**: 472 (was 450)

### Pending
- [ ] Run TBS migration in Supabase SQL Editor (required for TBS tracking to work)
  - File: `supabase/migrations/20260110_fix_tbs_attempts_schema.sql`
  - Adds `section` column to `tbs_attempts`
  - Changes `tbs_id` from UUID to TEXT (frontend uses string IDs)
  - Drops foreign key constraint to `tbs_questions` table
- [ ] Further AICPA alignment refinements (minor gaps remain)
  - AUD-I: 14% (needs 15%+)
  - AUD-II: 24% (needs 25%+)
  - AUD-IV: 24% (over 20% max - consider redistributing)
  - TCP-II: 28% (needs 30%+)
  - BAR-II: 34% (needs 35%+)
  - BAR-III: 25% (over 20% max - consider redistributing)

### Completed Today
- [x] Fix auth session causing logout on page refresh
  - Root cause: getUser() called on every mount, cleared auth on any error
  - Now trusts local session, only clears on explicit invalid/expired errors
- [x] Add "Save to My Notes" button in TBS scratch pad
- [x] Add inline notes during MCQ quiz sessions
- [x] Fix TBS progress tracking code (added section column to insert)
- [x] Fix scratch pad notes saving (changed to upsert)
- [x] Fix scratch pad first character position bug (CSS placeholder issue)

## 2026-01-09

### Completed
- [x] Fix dark mode text readability in dashboard bubbles
  - Updated QuickActionCard: title to text-gray-900/dark:text-white, description to text-gray-600/dark:text-gray-300
  - Updated StatCard: label and sublabel to text-gray-600/dark:text-gray-300
  - Updated Recent Study Sessions: heading, session text, and empty state message
- [x] Rename "Multiple Choice Questions" to "Multiple Choice" in Study dropdown
  - Updated both groupedItems and allNavItems arrays in DashboardNav
- [x] Add back button functionality to nested pages
  - Added back arrow + "Back to Practice" link in practice/[section] and practice/history pages
  - Simulations and flashcards already had back buttons
- [x] Update Overview page: refresh the 6 action bubbles with new features
  - Replaced old actions with: Practice MCQs, TBS Simulations, Exam Simulation, Exam Readiness, Flashcards, Accolades
  - Added color-coded icons (blue, purple, orange, green, teal, yellow)
  - Added badges (Core, New, Featured) for visual engagement
  - Enhanced hover effects with shadow and icon color transition
- [x] Fix study streak counter (showing 1 day after 2 consecutive days)
  - Root cause: PostgreSQL variable name conflict in update_study_streak()
  - Local variable `current_streak` conflicted with column name in UPDATE
  - Fixed by renaming to `new_streak` in supabase-gamification-schema.sql
  - Created fix-streak-counter.sql migration to apply to production
- [x] Scan site for dark mode issues and fix all locations
  - Fixed NTS Tracker page (3 cards missing dark variants)
  - Fixed Practice History page (session cards, answer options, explanation boxes)
  - Fixed DashboardNav sign out button hover state
  - Fixed QuizResults icon color
- [x] Integrate TBS into exam simulations
  - Added 3 exam configs: MCQ Only, Mixed Practice (MCQ+1 TBS), Realistic Testlet (MCQ+2 TBS)
  - TBS phase after MCQ completion before final review
  - Combined scoring (MCQ % + TBS %)
  - TBS results summary in results view
- [x] Study Log page: rename "Manual Study Log" to "All Studying"
- [x] Clicking practice session now links directly to that session in history
- [x] Rename "Practice" to "Multiple Choice Questions" in navigation
- [x] Move Study Log below My Notes in Study dropdown
- [x] Remove Exam dropdown; move NTS Tracker to Progress section
- [x] Fix Accolades page crash (borderColor undefined error)
  - Added fallback tier config for missing/invalid tiers in BadgeCard and AchievementItem
- [x] Add "Return to Simulation Library" button when working on a simulation
  - Added onReturnToLibrary prop to TBSContainer and TBSHeader
- [x] Remove "My Sections" page (redundant with Exam Readiness page)
  - Removed from navigation and updated dashboard quick action
- [x] On Exam Readiness page: hide disciplines user didn't select in settings
  - Shows only core sections (FAR, AUD, REG) + user's chosen discipline
  - Shows all sections if no discipline chosen yet
  - Added link to Settings for discipline selection
- [x] Update practice question company names to CPA exam style (57 replacements)
  - Company A → Apex Corp., Company B → Beacon Inc., etc.

## 2026-01-08

### Completed
- [x] Fix dark mode on practice section quiz setup page
- [x] Fix dark mode on achievement/streak popups and study log
- [x] Fix answer distribution (rebalanced from 75% B to ~25% each)
