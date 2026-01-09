# CPA Exam Blueprint - TODO

## 2026-01-09

### In Progress
(none)

### Pending
- [ ] Integrate TBS into exam simulations
- [ ] Scan site for dark mode issues and fix all locations
- [ ] Fix study streak counter (showing 1 day after 2 consecutive days)
- [ ] Update Overview page: refresh the 6 action bubbles with new features; make page more visually engaging

### Completed
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
