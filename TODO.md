# CPA Exam Blueprint - TODO

## 2026-01-09

### In Progress
(none)

### Pending
(none)

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
