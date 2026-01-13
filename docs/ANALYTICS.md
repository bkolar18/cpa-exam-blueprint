# Meridian CPA Review - Analytics System Documentation

**Internal Reference Document**
*Last Updated: January 2026*

---

## Table of Contents
1. [Overview](#overview)
2. [Prime Meridian Score System](#prime-meridian-score-system)
3. [Admin Analytics](#admin-analytics)
4. [User Analytics Dashboard](#user-analytics-dashboard)
5. [Gamification & Achievements](#gamification--achievements)
6. [Adaptive Question Selection](#adaptive-question-selection)
7. [Database Schema](#database-schema)
8. [File Reference](#file-reference)

---

## Overview

The analytics system tracks user progress across multiple dimensions:
- **Prime Meridian Score**: Exam readiness assessment based on AICPA blueprint
- **Admin Analytics**: Platform-wide usage metrics
- **User Analytics**: Personal performance tracking
- **Gamification**: Badges, achievements, streaks
- **Adaptive Learning**: Question selection based on performance

---

## Prime Meridian Score System

**File:** `src/lib/scoring/prime-meridian.ts` (1163 lines)

### Purpose
A comprehensive exam readiness score combining AICPA blueprint weighting, MCQ/TBS performance, difficulty adjustments, and recency weighting.

### Configuration Constants

```typescript
const CONFIG = {
  MIN_QUESTIONS_PER_CONTENT_AREA: 50,    // Full weight threshold
  MIN_TBS_PER_SECTION: 10,               // TBS coverage threshold
  RECENCY_HALF_LIFE_DAYS: 30,            // Performance decay rate
  DIFFICULTY_WEIGHTS: {
    easy: 0.8,                            // Easier questions worth less
    medium: 1.0,                          // Baseline
    hard: 1.3,                            // Hard questions worth more
  },
  MCQ_WEIGHT: 0.5,                        // 50% of final score
  TBS_WEIGHT: 0.5,                        // 50% of final score
  RECOMMENDED_SCORE: 80,                  // Target for exam readiness
  CONTENT_AREA_MINIMUM: 70,               // Floor per content area
  MIN_QUESTIONS_FOR_GAP_DETECTION: 10,    // Minimum for gap analysis
  MIN_TOTAL_QUESTIONS_FOR_MEANINGFUL_SCORE: 100,
};
```

### AICPA Content Area Weights (2025-2026 Blueprint)

| Section | Content Area | Weight |
|---------|--------------|--------|
| **FAR** | FAR-I: Conceptual Framework, Standard-Setting, Financial Reporting | 30% |
| | FAR-II: Select Financial Statement Accounts | 35% |
| | FAR-III: Select Transactions | 25% |
| | FAR-IV: State and Local Governments | 10% |
| **AUD** | AUD-I: Ethics, Professional Responsibilities, General Principles | 20% |
| | AUD-II: Assessing Risk and Developing a Planned Response | 30% |
| | AUD-III: Performing Further Procedures and Obtaining Evidence | 35% |
| | AUD-IV: Forming Conclusions and Reporting | 15% |
| **REG** | REG-I: Ethics, Professional Responsibilities, Federal Tax Procedures | 15% |
| | REG-II: Business Law | 20% |
| | REG-III: Federal Taxation of Property Transactions | 17% |
| | REG-IV: Federal Taxation of Individuals | 27% |
| | REG-V: Federal Taxation of Entities | 23% |
| **TCP** | TCP-I: Tax Compliance and Planning for Individuals | 40% |
| | TCP-II: Tax Compliance and Planning for Entities | 35% |
| | TCP-III: Tax Compliance and Planning for Property Transactions | 12% |
| | TCP-IV: Special Tax Topics | 13% |
| **BAR** | BAR-I: Business Analysis | 45% |
| | BAR-II: Technical Accounting and Reporting | 40% |
| | BAR-III: State and Local Governments | 15% |
| **ISC** | ISC-I: Information Systems and Data Management | 40% |
| | ISC-II: Security, Confidentiality, and Privacy | 40% |
| | ISC-III: SOC Engagements | 20% |

### Score Calculation Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                    calculatePrimeMeridianScore()                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. MCQ Score Calculation (calculateMCQScore)                   │
│     ├─ Group attempts by AICPA content area                     │
│     ├─ Apply recency weighting: e^(-days × ln2 / 30)            │
│     ├─ Apply difficulty weighting (0.8/1.0/1.3)                 │
│     ├─ Calculate raw score per content area                     │
│     ├─ Apply coverage penalty if < 50 questions                 │
│     └─ Weight by AICPA blueprint percentages                    │
│                                                                 │
│  2. TBS Score Calculation (calculateTBSScore)                   │
│     ├─ Filter completed TBS with scores                         │
│     ├─ Group by TBS ID, take best score                         │
│     ├─ Apply recency weighting                                  │
│     └─ Apply coverage penalty if < 10 TBS                       │
│                                                                 │
│  3. Combined Score                                              │
│     └─ overallScore = (mcqScore × 0.5) + (tbsScore × 0.5)       │
│                                                                 │
│  4. Gap Detection (identifyContentAreaGaps)                     │
│     └─ Flag areas < 70% with 10+ questions                      │
│                                                                 │
│  5. Consistency Metrics (calculateConsistencyMetrics)           │
│     ├─ Standard deviation across content areas                  │
│     ├─ Coefficient of variation (CV = stdDev / mean)            │
│     └─ isConsistent = CV < 0.25                                 │
│                                                                 │
│  6. Time Analytics (analyzeTimePatterns)                        │
│     ├─ Average time per question                                │
│     ├─ Fast correct count (< 10 seconds)                        │
│     └─ suspiciousPatternDetected = fastCorrect% > 20%           │
│                                                                 │
│  7. Engagement Metrics (analyzeEngagement)                      │
│     ├─ Explanation view rate for incorrect answers              │
│     ├─ Average view duration                                    │
│     └─ isEngaged = viewRate >= 50%                              │
│                                                                 │
│  8. Readiness Assessment (assessReadiness)                      │
│     ├─ overallScoreMet: score >= 80                             │
│     ├─ noContentAreaGaps: no area < 70%                         │
│     ├─ isConsistent: CV < 0.25                                  │
│     └─ isReady = all three conditions met                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Key Formulas

**Recency Weight:**
```
weight = e^(-daysSince × ln(2) / 30)
```
- Performance from 30 days ago = 50% weight
- Performance from 60 days ago = 25% weight

**Content Area Raw Score:**
```
rawScore = (weightedCorrect / weightedTotal) × 100
```
Where each question's weight = difficultyWeight × (0.5 + 0.5 × recencyWeight)

**Coverage Penalty:**
```
if questionsAttempted < 50:
  adjustedScore = rawScore × (questionsAttempted / 50)
```

**Coefficient of Variation:**
```
CV = standardDeviation / mean
isConsistent = CV < 0.25
```

### Milestone Thresholds

| Score | Level | Color | Message |
|-------|-------|-------|---------|
| 85+ | Strong | Green | "Excellent preparation! You've exceeded our recommended score." |
| 80-84 | Recommended | Emerald | "Students at this level typically pass." |
| 70-79 | Approaching | Yellow | "X points away from recommended score of 80." |
| 55-69 | Developing | Orange | "Building a solid foundation." |
| <55 | Building | Red | "Just getting started!" |

### Result Interface

```typescript
interface PrimeMeridianResult {
  overallScore: number;              // 0-100 composite score
  mcqScore: number;                  // MCQ component
  tbsScore: number;                  // TBS component
  mcqWeight: number;                 // 0.5 or 1.0 if no TBS
  tbsWeight: number;                 // 0.5 or 1.0 if no MCQ
  contentAreaScores: ContentAreaScore[];
  hasEnoughData: boolean;            // >= 100 questions or has TBS
  recommendedActions: string[];      // Up to 3 recommendations
  contentAreaGaps: ContentAreaGap[]; // Areas below 70%
  hasGaps: boolean;
  consistency: ConsistencyMetrics;
  timeAnalytics: TimeAnalytics;
  engagement: EngagementMetrics;
  readinessAssessment: ReadinessAssessment;
}
```

---

## Admin Analytics

**File:** `src/app/api/admin/analytics/route.ts`

### Endpoint
`GET /api/admin/analytics?range=30d`

### Authentication
Requires admin email in `ADMIN_EMAILS` environment variable.

### Supported Date Ranges
- `7d` - Last 7 days
- `30d` - Last 30 days (default)
- `90d` - Last 90 days
- `all` - All time (since 2020-01-01)

### Metrics Returned

```typescript
{
  signupsOverTime: { date: string, count: number }[],
  activeUsersOverTime: { date: string, count: number }[],
  practiceSessionsOverTime: { date: string, count: number }[],
  accuracyBySection: { section: string, accuracy: number, total: number }[],
  subscriptionBreakdown: { tier: string, count: number }[],
  topTopics: { topic: string, count: number }[],  // Top 10
  peakUsageTimes: { hour: number, count: number }[],  // 0-23 UTC
  streakDistribution: { streak: string, count: number }[],
}
```

### Calculations

**Signups Over Time:**
```
GROUP BY date(profiles.created_at)
COUNT(*) per day
```

**Active Users:**
```
GROUP BY date(practice_sessions.created_at)
COUNT(DISTINCT user_id) per day
```

**Accuracy by Section:**
```
accuracy = (correct_attempts / total_attempts) × 100
```

**Streak Distribution Buckets:**
- 0 days
- 1-3 days
- 4-7 days
- 8-14 days
- 15-30 days
- 30+ days

---

## User Analytics Dashboard

**File:** `src/app/dashboard/analytics/page.tsx`

### Metrics Displayed

1. **Summary Cards**
   - Total questions practiced
   - Average accuracy
   - Study hours
   - Week-over-week improvement

2. **Performance Line Chart** (`src/components/analytics/PerformanceLineChart.tsx`)
   - Accuracy trend over time
   - Section filtering
   - Color-coded by section

3. **Study Time Chart** (`src/components/analytics/StudyTimeChart.tsx`)
   - Stacked bar chart by week
   - Hours per section

4. **Activity Calendar** (`src/components/analytics/ActivityCalendar.tsx`)
   - Heat map of study minutes per day
   - Visual consistency tracking

5. **Topic Heatmap** (`src/components/analytics/TopicHeatmap.tsx`)
   - Accuracy by topic grid
   - Color intensity based on performance

6. **Difficulty Breakdown** (`src/components/analytics/DifficultyBreakdown.tsx`)
   - Accuracy by easy/medium/hard

### Week-over-Week Improvement Calculation
```typescript
improvement = ((thisWeekAccuracy - lastWeekAccuracy) / lastWeekAccuracy) × 100
```

---

## Gamification & Achievements

**Files:**
- `src/lib/gamification/types.ts` - Type definitions
- `src/lib/gamification/checker.ts` - Achievement checking logic
- `src/components/gamification/AchievementProvider.tsx` - React context

### Badge Categories

| Category | Tracked Metric | Example |
|----------|----------------|---------|
| `study_hours` | Hours per section | "100 Hours FAR Expert" |
| `practice` | Questions answered | "Century Club" (100 Qs) |
| `section` | Coverage per section | "FAR Explorer" (50+ Qs) |
| `streak` | Consecutive study days | "7-Day Warrior" |
| `accuracy` | Performance percentage | "90% Accuracy Badge" |
| `special` | Time-based | "Night Owl" (10PM-2AM) |
| `account` | Profile completion | "Profile Complete" |
| `tbs` | Task-based simulations | "TBS Master" |

### Achievement Triggers

```typescript
type AchievementTrigger =
  | 'study_session'    // When user logs study time
  | 'practice_session' // When practice quiz completed
  | 'section_update'   // When section passed
  | 'profile_update'   // Profile completion
  | 'nts_add'          // NTS added
  | 'login'            // Daily streak check
  | 'tbs_complete';    // TBS simulation finished
```

### Points System

| Tier | Points |
|------|--------|
| Bronze | 15 |
| Silver | 30 |
| Gold | 90 |
| Platinum | 300 |

### Key Functions

**updateBadgeProgress(userId, section?, context?)**
- Calculates progress for all badges
- Updates `user_badges` table
- Returns `AchievementNotification[]` for newly earned badges

**checkAchievements(context: AchievementCheckContext)**
- Checks achievements based on trigger type
- Updates `user_achievements` table
- Handles hidden achievements

**getGamificationSummary(userId, disciplineChoice?)**
- Returns complete badge/achievement status
- Filters by discipline if user selected one

### Time-Based Achievements

| Achievement | Condition |
|-------------|-----------|
| Early Bird | Study between 5-7 AM |
| Night Owl | Study between 10 PM-2 AM |
| Weekend Warrior | Study on Saturday/Sunday |
| Marathon | 4+ hours in a single day |

---

## Adaptive Question Selection

**File:** `src/lib/adaptive/question-selector.ts`

### Selection Priority Weights

| Factor | Weight | Purpose |
|--------|--------|---------|
| Wrong Answers | 35% | Review missed questions |
| Low Coverage | 25% | Practice neglected topics |
| Never Attempted | 25% | Ensure comprehensive coverage |
| Spaced Repetition | 15% | Time-based review |

### Priority Score Calculation

```typescript
function calculateQuestionPriority(question, history, topicPerformance, weights) {
  let score = 0;

  // 1. Wrong answer boost
  if (questionHistory && !questionHistory.isCorrect) {
    score += weights.wrongAnswerWeight × (1 + min(attemptCount, 5) × 0.1);
  }

  // 2. Spaced repetition
  if (daysSinceAttempt < 1) {
    score -= 0.5;  // Recently seen - reduce priority
  } else if (daysSinceAttempt >= 3) {
    score += weights.spacedRepetitionWeight × min(daysSinceAttempt / 3, 2);
  }

  // 3. Never attempted
  if (!questionHistory) {
    score += weights.neverAttemptedWeight;
  }

  // 4. Low coverage topic
  const coverageDeficit = 1 - (topicStats.coverage / 100);
  score += weights.lowCoverageWeight × coverageDeficit;

  // 5. Random factor for variety
  score += random() × 0.1;

  return score;
}
```

### Difficulty Escalation

Based on user's overall accuracy:

| Accuracy | Easy | Medium | Hard |
|----------|------|--------|------|
| 85%+ | 10% | 30% | 60% |
| 70-84% | 20% | 40% | 40% |
| <70% | 30% | 50% | 20% |

### Spaced Repetition Timing
- **Minimum before repeat:** 1 day
- **Ideal review window:** 3+ days

---

## Database Schema

### Core Tables

**practice_attempts** (MCQ Tracking)
```sql
CREATE TABLE practice_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  question_id TEXT NOT NULL,
  section TEXT CHECK (section IN ('FAR','AUD','REG','TCP','BAR','ISC')),
  topic TEXT,
  selected_answer TEXT,
  correct_answer TEXT,
  is_correct BOOLEAN,
  time_spent_seconds INTEGER,
  explanation_view_seconds INTEGER,
  difficulty TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_practice_attempts_user ON practice_attempts(user_id);
CREATE INDEX idx_practice_attempts_section ON practice_attempts(section);
CREATE INDEX idx_practice_attempts_explanation_view
  ON practice_attempts(user_id, explanation_view_seconds)
  WHERE explanation_view_seconds IS NOT NULL;
```

**tbs_attempts** (TBS Tracking)
```sql
CREATE TABLE tbs_attempts (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  tbs_id TEXT NOT NULL,  -- Frontend string ID like 'tbs-bar-001'
  section TEXT CHECK (section IN ('FAR','AUD','REG','TCP','BAR','ISC')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  responses JSONB,
  score_earned INTEGER,
  max_score INTEGER,
  score_percentage DECIMAL(5,2),
  grading_details JSONB,
  is_complete BOOLEAN DEFAULT FALSE,
  last_saved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**study_sessions** (Study Time)
```sql
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  section TEXT,
  date DATE,
  hours DECIMAL(4,2),
  notes TEXT,
  topics_covered TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**profiles** (User Data with Gamification)
```sql
-- Relevant gamification fields in profiles:
total_points INTEGER DEFAULT 0,
badge_count INTEGER DEFAULT 0,
achievement_count INTEGER DEFAULT 0,
current_streak INTEGER DEFAULT 0,
longest_streak INTEGER DEFAULT 0,
subscription_tier TEXT DEFAULT 'free'
```

### Gamification Tables

```sql
-- Badge definitions
CREATE TABLE badges (
  id UUID PRIMARY KEY,
  code TEXT UNIQUE,
  name TEXT,
  description TEXT,
  category TEXT,  -- study_hours, practice, streak, accuracy, special, account, tbs
  tier TEXT,      -- bronze, silver, gold, platinum
  points INTEGER,
  requirement_type TEXT,
  requirement_value INTEGER,
  requirement_section TEXT,
  sort_order INTEGER
);

-- User badge progress
CREATE TABLE user_badges (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  badge_id UUID REFERENCES badges(id),
  progress INTEGER DEFAULT 0,  -- 0-100
  earned_at TIMESTAMPTZ
);

-- Achievement definitions
CREATE TABLE achievements (
  id UUID PRIMARY KEY,
  code TEXT UNIQUE,
  name TEXT,
  description TEXT,
  category TEXT,
  points INTEGER,
  requirement_type TEXT,
  requirement_value INTEGER,
  requirement_metadata JSONB,
  is_hidden BOOLEAN DEFAULT FALSE,
  sort_order INTEGER
);

-- User achievements
CREATE TABLE user_achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  achievement_id UUID REFERENCES achievements(id),
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  discovered BOOLEAN DEFAULT TRUE
);
```

---

## File Reference

### Core Scoring
| File | Purpose |
|------|---------|
| `src/lib/scoring/prime-meridian.ts` | Prime Meridian score calculation, AICPA weights, gap detection, consistency metrics |

### Adaptive Learning
| File | Purpose |
|------|---------|
| `src/lib/adaptive/question-selector.ts` | Question selection algorithm, spaced repetition, difficulty escalation |

### Gamification
| File | Purpose |
|------|---------|
| `src/lib/gamification/types.ts` | Badge, Achievement, UserBadge interfaces |
| `src/lib/gamification/checker.ts` | Achievement checking, badge progress updates |
| `src/components/gamification/AchievementProvider.tsx` | React context for achievements |

### Admin Analytics
| File | Purpose |
|------|---------|
| `src/app/api/admin/analytics/route.ts` | Admin analytics API endpoint |
| `src/app/admin/analytics/page.tsx` | Admin dashboard UI |

### User Analytics
| File | Purpose |
|------|---------|
| `src/app/dashboard/analytics/page.tsx` | User analytics dashboard |
| `src/app/dashboard/readiness/page.tsx` | Exam readiness page with Prime Meridian |
| `src/components/dashboard/PrimeMeridianScore.tsx` | Score gauge display component |
| `src/components/dashboard/PrimeMeridianCompass.tsx` | Compact compass display |

### Visualization Components
| File | Purpose |
|------|---------|
| `src/components/analytics/PerformanceLineChart.tsx` | Accuracy trend chart |
| `src/components/analytics/StudyTimeChart.tsx` | Weekly study hours |
| `src/components/analytics/ActivityCalendar.tsx` | Daily activity heatmap |
| `src/components/analytics/TopicHeatmap.tsx` | Topic accuracy grid |
| `src/components/analytics/DifficultyBreakdown.tsx` | Performance by difficulty |

### TBS Tracking
| File | Purpose |
|------|---------|
| `src/app/api/tbs/stats/route.ts` | TBS statistics API |
| `src/app/api/tbs/attempts/route.ts` | TBS attempt management |
| `src/hooks/useTBSProgress.ts` | TBS progress tracking hook |

### Database
| File | Purpose |
|------|---------|
| `Supabase SQL's/supabase-schema.sql` | Core schema definition |
| `Supabase SQL's/supabase-tbs-schema.sql` | TBS schema extension |
| `supabase/migrations/20260112_add_explanation_tracking.sql` | Explanation engagement tracking |

---

## Quick Reference: Key Thresholds

| Metric | Threshold | Effect |
|--------|-----------|--------|
| Recommended Score | 80 | "Exam Ready" status |
| Content Area Minimum | 70% | Gap flagged if below |
| Consistency CV | <0.25 | "Consistent" if below |
| Fast Answer | <10 sec | Flagged as suspicious |
| Suspicious Pattern | >20% fast | Warning displayed |
| Explanation Engaged | >=5 sec | Counts as "viewed" |
| Engagement Threshold | >=50% | "Engaged" status |
| Min Questions for Gap | 10 | Required for gap detection |
| Min Questions for Score | 100 | "Meaningful" score |
| Coverage Penalty Threshold | 50 Qs | Full weight if met |
| TBS Coverage Threshold | 10 TBS | Full weight if met |
| Recency Half-Life | 30 days | Performance decay rate |

---

*This document is for internal reference. Update when analytics logic changes.*
