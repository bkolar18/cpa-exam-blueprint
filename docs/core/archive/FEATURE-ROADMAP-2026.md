# CPA Exam Blueprint - 2026 Feature Roadmap

**Document Version**: 1.0
**Created**: January 9, 2026
**Status**: Active Development

---

## Executive Summary

This roadmap outlines four major features to be implemented in Q1 2026, prioritized by user impact and business value. The goal is to close critical gaps identified in the competitive analysis while maximizing the platform's value proposition as a free CPA exam prep resource.

---

## Feature Overview

| # | Feature | Priority | Effort | Business Impact |
|---|---------|----------|--------|-----------------|
| 1 | TBS UI/Engine | Critical | 2-3 weeks | Enables 50% of exam prep |
| 2 | Email Nurturing | High | 1-2 weeks | Drives Surgent conversions |
| 3 | Flashcard System | Medium | 1 week | Student retention & engagement |
| 4 | Analytics Dashboard | Medium | 1-2 weeks | User insights & motivation |

---

## Feature 1: Task-Based Simulation (TBS) Engine

### Overview
Build the interactive UI components to render and grade the 32 TBS questions already created. TBS represents 50% of the actual CPA exam score.

### Current State
- ✅ 32 TBS questions created across all 6 sections
- ✅ Types covered: numeric_entry, document_review, journal_entry, research, dropdown
- ✅ Architecture documented in `docs/tbs-system-architecture.md`
- ❌ No UI components exist
- ❌ No grading engine implemented

### Deliverables

#### Phase 1.1: Core Components
- [ ] `TBSContainer.tsx` - Main orchestrator component
- [ ] `TBSHeader.tsx` - Timer, progress, navigation
- [ ] `TBSInstructions.tsx` - Scenario/instructions display
- [ ] `ExhibitPanel/` - Tabbed exhibit viewer
  - [ ] `ExhibitTabs.tsx`
  - [ ] `MemoExhibit.tsx`
  - [ ] `TableExhibit.tsx`
  - [ ] `TextExhibit.tsx`

#### Phase 1.2: Work Area Components
- [ ] `NumericEntryGrid.tsx` - Spreadsheet-like numeric input
- [ ] `JournalEntryForm.tsx` - Debit/credit with account picker
- [ ] `DocumentReview.tsx` - Highlight text with dropdowns
- [ ] `DropdownSelect.tsx` - Reusable dropdown component
- [ ] `ResearchTool.tsx` - Citation entry with external links

#### Phase 1.3: Grading & Results
- [ ] `grading-engine.ts` - Score calculation with partial credit
- [ ] `TBSResults.tsx` - Score breakdown display
- [ ] `ExplanationPanel.tsx` - Per-requirement explanations

#### Phase 1.4: Integration
- [ ] `/dashboard/tbs/page.tsx` - TBS practice hub
- [ ] `/dashboard/tbs/[id]/page.tsx` - Individual TBS practice
- [ ] Database: `tbs_attempts` table for tracking
- [ ] Connect to gamification (points for TBS completion)

### Technical Notes
- Use React state for answer tracking (not forms)
- Auto-save every 30 seconds to localStorage
- Timer with pause for practice mode
- Mobile: Show warning, stack exhibits vertically

### Success Metrics
- Users can complete all 32 TBS
- Partial credit scoring works correctly
- Average session time > 10 minutes

---

## Feature 2: Email Nurturing System (Phase 4)

### Overview
Implement automated email sequences to nurture leads from signup through Surgent recommendation. This is the primary monetization driver.

### Current State
- ✅ Resend API integrated
- ✅ Lead capture on study plan, tools, blog
- ❌ No automated sequences
- ❌ No segmentation

### Deliverables

#### Phase 2.1: Email Infrastructure
- [ ] `src/lib/email/sequences.ts` - Sequence definitions
- [ ] `src/lib/email/templates/` - Email templates (HTML)
  - [ ] `welcome.tsx`
  - [ ] `study-tips.tsx`
  - [ ] `section-checklist.tsx`
  - [ ] `success-story.tsx`
  - [ ] `surgent-recommendation.tsx`
- [ ] Database: `email_sequence_progress` table

#### Phase 2.2: 7-Email Welcome Sequence
| Day | Email | Purpose |
|-----|-------|---------|
| 0 | Welcome + Study Plan | Deliver value immediately |
| 1 | #1 Mistake CPA Candidates Make | Education |
| 3 | Section Checklist PDF | Resource delivery |
| 7 | Success Story | Social proof |
| 14 | Overwhelmed? You're Not Alone | Empathy |
| 21 | Our Recommended CPA Course | Surgent pitch |
| 30 | Check-In | Re-engagement |

#### Phase 2.3: Segmentation
- [ ] Working status (full-time, part-time, student)
- [ ] Target section (FAR, AUD, REG, discipline)
- [ ] Experience level (first-timer, retaker)
- [ ] Engagement level (opens, clicks)

#### Phase 2.4: Triggered Emails
- [ ] Score release notifications (3 days, day-of, day-after)
- [ ] NTS expiration reminders (30, 14, 7 days)
- [ ] Streak break re-engagement
- [ ] Section passed congratulations

#### Phase 2.5: Automation
- [ ] Cron job or Vercel Cron for daily sends
- [ ] `/api/email/process-queue` endpoint
- [ ] Unsubscribe handling

### Technical Notes
- Use Resend's batch API for efficiency
- Store send timestamps to prevent duplicates
- A/B test subject lines (future)
- GDPR/CAN-SPAM compliance

### Success Metrics
- Open rate > 40%
- Click-through rate > 5%
- Surgent referral tracking

---

## Feature 3: Flashcard System

### Overview
Spaced repetition flashcard system to help students memorize key concepts. Can auto-generate cards from frequently missed questions.

### Current State
- ❌ No flashcard system exists
- ✅ Question data available for conversion

### Deliverables

#### Phase 3.1: Data Model
- [ ] `src/lib/data/flashcards/types.ts`
```typescript
interface Flashcard {
  id: string;
  section: SectionCode;
  topic: string;
  front: string;      // Question/term
  back: string;       // Answer/definition
  difficulty: 'easy' | 'medium' | 'hard';
  source?: string;    // "auto" | "manual"
  sourceQuestionId?: string;
}

interface FlashcardProgress {
  userId: string;
  cardId: string;
  easeFactor: number;     // SM-2 algorithm
  interval: number;       // Days until next review
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate: Date;
}
```

#### Phase 3.2: Core Components
- [ ] `FlashcardDeck.tsx` - Card stack with flip animation
- [ ] `FlashcardCard.tsx` - Individual card (front/back)
- [ ] `FlashcardReview.tsx` - Review session with rating
- [ ] `FlashcardStats.tsx` - Progress overview

#### Phase 3.3: Spaced Repetition
- [ ] `src/lib/flashcards/sm2.ts` - SM-2 algorithm implementation
- [ ] Rating: Again, Hard, Good, Easy
- [ ] Calculate next review date based on performance

#### Phase 3.4: Content
- [ ] 50+ flashcards per section (300 total)
- [ ] Auto-generate from missed questions
- [ ] Topics: Key terms, formulas, standards

#### Phase 3.5: Integration
- [ ] `/dashboard/flashcards/page.tsx` - Flashcard hub
- [ ] `/dashboard/flashcards/[section]/page.tsx` - Section deck
- [ ] Database: `flashcard_progress` table
- [ ] Daily review reminder

### Technical Notes
- Use CSS transforms for flip animation
- Keyboard shortcuts (Space to flip, 1-4 to rate)
- Touch swipe gestures for mobile
- Offline-capable with localStorage sync

### Success Metrics
- Users review cards daily
- Retention rate improves (track via related MCQ performance)
- Cards reviewed per session > 20

---

## Feature 4: Analytics Dashboard Enhancement

### Overview
Transform existing performance data into visual insights that help students understand their progress and identify weak areas.

### Current State
- ✅ Data collected: attempts, scores, time spent, topics
- ✅ Basic stats shown on readiness dashboard
- ❌ No charts or visualizations
- ❌ No trend analysis

### Deliverables

#### Phase 4.1: Chart Components
- [ ] Install chart library (Recharts or Chart.js)
- [ ] `PerformanceLineChart.tsx` - Score trends over time
- [ ] `TopicHeatmap.tsx` - Weak/strong topic visualization
- [ ] `DifficultyBreakdown.tsx` - Pie chart by difficulty
- [ ] `TimeAnalysis.tsx` - Time spent per section/topic

#### Phase 4.2: Analytics Page
- [ ] `/dashboard/analytics/page.tsx` - Main analytics hub
- [ ] Section selector (all sections or specific)
- [ ] Date range filter (7d, 30d, 90d, all time)
- [ ] Export data as CSV

#### Phase 4.3: Insights & Recommendations
- [ ] "Focus on these topics" suggestions
- [ ] Time-to-mastery projections
- [ ] Comparison to passing candidates (if data available)
- [ ] Study efficiency metrics (points per hour)

#### Phase 4.4: Enhanced Readiness Dashboard
- [ ] Mini-charts on main dashboard
- [ ] Predicted score range
- [ ] "Ready to test?" confidence indicator
- [ ] Week-over-week improvement %

### Charts to Build

1. **Score Trend Line Chart**
   - X: Date, Y: Score %
   - Separate lines per section
   - Moving average overlay

2. **Topic Mastery Heatmap**
   - Grid: Topics vs Sections
   - Color: Red (weak) → Green (mastered)
   - Click to drill down

3. **Study Time Distribution**
   - Stacked bar: Hours per section per week
   - Goal line overlay

4. **Question Accuracy Funnel**
   - Easy → Medium → Hard accuracy
   - Identify difficulty jump-off point

5. **Activity Calendar**
   - GitHub-style contribution graph
   - Color intensity = study minutes

### Technical Notes
- Use Recharts (React-friendly, good docs)
- Lazy load charts for performance
- Cache aggregated data (don't recalculate on every view)
- Responsive: Stack charts vertically on mobile

### Success Metrics
- Analytics page views > 30% of active users
- Users can identify their weak topics
- Increased practice after viewing analytics

---

## Implementation Timeline

```
Week 1-2: Feature 1 (TBS Engine) - Core components
Week 3:   Feature 1 (TBS Engine) - Grading & integration
Week 4:   Feature 2 (Email Nurturing) - Infrastructure
Week 5:   Feature 2 (Email Nurturing) - Sequences & triggers
Week 6:   Feature 3 (Flashcards) - Full implementation
Week 7:   Feature 4 (Analytics) - Charts & dashboard
Week 8:   Testing, polish, bug fixes
```

---

## Dependencies & Prerequisites

### Feature 1 (TBS)
- TBS content files already exist
- No external dependencies

### Feature 2 (Email)
- Resend API (already configured)
- Vercel Cron or external scheduler
- Database migration for sequence tracking

### Feature 3 (Flashcards)
- No external dependencies
- Database migration for progress tracking

### Feature 4 (Analytics)
- Chart library (Recharts recommended)
- Existing practice_attempts data

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| TBS complexity underestimated | Start with simplest types (numeric, dropdown) |
| Email deliverability issues | Monitor Resend dashboard, warm up sending |
| Flashcard adoption low | Integrate prompts in practice flow |
| Chart performance | Aggregate data server-side, cache results |

---

## Success Criteria

The roadmap is successful when:
1. Users can complete TBS practice sessions
2. Email open rate exceeds 40%
3. Flashcard daily active users > 100
4. Analytics page has positive user feedback

---

## Document History

| Date | Version | Changes |
|------|---------|---------|
| 2026-01-09 | 1.0 | Initial roadmap creation |
