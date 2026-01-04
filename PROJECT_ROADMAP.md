# CPA Exam Blueprint - Project Roadmap & Technical Documentation

## Table of Contents
1. [Executive Summary](#executive-summary)
2. [Market Research](#market-research)
3. [Phase 1: Free Tools](#phase-1-free-tools)
4. [Phase 2: Content & Authority](#phase-2-content--authority)
5. [Phase 3: Email Nurturing](#phase-3-email-nurturing)
6. [Phase 4: Interactive Features](#phase-4-interactive-features)
7. [Phase 5: Infrastructure](#phase-5-infrastructure)
8. [Database Schema](#database-schema)
9. [API Architecture](#api-architecture)
10. [Component Library](#component-library)
11. [SEO Strategy](#seo-strategy)
12. [Success Metrics](#success-metrics)

---

## Executive Summary

### Vision
Transform CPA Exam Blueprint from a 10-page static acquisition site into a comprehensive lead generation and nurturing platform that provides genuine value to CPA candidates before any sales interaction.

### Business Goals
- Build trust with CPA candidates through free, high-quality tools
- Capture and nurture high-intent leads
- Convert qualified students to Surgent CPA Review (affiliate partner)
- Create owned marketing infrastructure independent of affiliate marketplaces

### Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js
- **Email**: Resend API
- **AI Chatbot**: Anthropic Claude API
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

### Key Decisions
| Decision | Choice | Reasoning |
|----------|--------|-----------|
| Affiliate Partner | Surgent | Best value ($800-$1,700), adaptive learning technology |
| AI Provider | Anthropic Claude | Better explanations for educational content |
| Database | Supabase | Built-in auth, generous free tier, PostgreSQL |
| Email | Resend | Already integrated, developer-friendly |

---

## Market Research

### CPA Exam Structure (CPA Evolution - January 2024)

**Core Sections (Required - All 3)**
| Section | Name | Testing | Avg Hours | Pass Rate |
|---------|------|---------|-----------|-----------|
| FAR | Financial Accounting & Reporting | Continuous | 120-150 | 40-43% |
| AUD | Auditing & Attestation | Continuous | 80-100 | 46-50% |
| REG | Regulation | Continuous | 100-120 | 58-64% |

**Discipline Sections (Choose 1)**
| Section | Name | Testing Windows | Avg Hours | Pass Rate |
|---------|------|-----------------|-----------|-----------|
| BAR | Business Analysis & Reporting | Jan, Apr, Jul, Oct | 100-130 | 33-40% |
| TCP | Tax Compliance & Planning | Jan, Apr, Jul, Oct | 100-120 | 72-82% |
| ISC | Information Systems & Controls | Jan, Apr, Jul, Oct | 80-110 | ~51% |

**Key Rules**
- 18-month rolling window to pass all sections
- Score releases: Core sections every 1-2 weeks, Discipline sections quarterly
- Passing score: 75 on each section

### Score Release Schedule (2025-2026)

**Core Sections (FAR, AUD, REG)**
Continuous testing with scores released every 1-2 weeks. AICPA publishes specific dates.

**Discipline Sections (BAR, TCP, ISC)**
| Testing Window | Score Release |
|----------------|---------------|
| January 1-31 | ~March 13 |
| April 1-30 | ~June 16 |
| July 1-31 | ~September 11 |
| October 1-31 | ~December 16 |

### Competitor Analysis

**Becker CPA Review**
- Price: $2,499 - $5,999
- Strengths: Brand recognition, AI tutor (Newt), Adapt2U technology
- Weaknesses: Expensive, strict pass guarantee conditions
- Features: 8,000+ MCQs, 400+ TBS, 900+ video hours

**UWorld Roger CPA Review**
- Price: $2,299 - $4,100
- Strengths: Engaging lectures (Roger Philipp), SmartPath technology
- Weaknesses: Higher study time (195 hours)
- Features: Combined Roger + Wiley content, mobile app

**Surgent CPA Review (Our Affiliate)**
- Price: $800 - $1,700
- Strengths: Best adaptive learning, efficient study time (184 hrs), best value
- Weaknesses: Less engaging lectures, smaller brand
- Features: 8,800+ MCQs, 450+ TBS, AI-driven study path

---

## Phase 1: Free Tools

**Timeline**: Weeks 1-6
**Priority**: HIGHEST
**Goal**: Provide immediate value and capture high-intent leads

### 1.1 Score Release Calendar

**Purpose**: High-traffic evergreen tool that candidates check repeatedly

**Files to Create**:
```
src/app/tools/score-release-calendar/page.tsx
src/app/tools/score-release-calendar/ScoreCalendar.tsx (client)
src/lib/data/score-release-dates.ts
src/types/score-release.ts
```

**Features**:
- Interactive calendar view (Core vs Discipline color-coded)
- Countdown timer to next score release
- Testing window indicators
- Email subscription for notifications (lead capture)
- Mobile-responsive design

**Data Structure**:
```typescript
interface ScoreRelease {
  id: string;
  date: Date;
  type: 'core' | 'discipline';
  sections: string[];
  testingWindowStart: Date;
  testingWindowEnd: Date;
  isEstimated: boolean;
}

interface ScoreSubscription {
  email: string;
  sections: ('FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC')[];
  notifyDaysBefore: number[];
}
```

### 1.2 NTS Expiration Tracker

**Purpose**: High-stakes tool that prevents candidates from losing eligibility

**Files to Create**:
```
src/app/tools/nts-tracker/page.tsx
src/app/tools/nts-tracker/NTSTracker.tsx (client)
src/lib/utils/date-calculations.ts
```

**Features**:
- Input NTS start date
- Visual countdown with urgency indicators (green → yellow → red)
- Email reminders at 30, 14, 7 days before expiration
- State-specific NTS validity information
- Link to state board for extensions

**Lead Capture**: Email + State = high-quality lead data

### 1.3 Study Hours Calculator

**Purpose**: Help candidates set realistic expectations

**Files to Create**:
```
src/app/tools/study-hours-calculator/page.tsx
src/app/tools/study-hours-calculator/Calculator.tsx (client)
src/lib/calculators/study-hours.ts
```

**Features**:
- Input: Hours available per week, background level, target sections
- Output: Weeks per section, total timeline, daily hours needed
- Pass rate comparison based on study hours
- Integration with study plan builder

**Calculation Logic**:
```typescript
const SECTION_HOURS = {
  FAR: { min: 120, max: 150, recommended: 135 },
  AUD: { min: 80, max: 100, recommended: 90 },
  REG: { min: 100, max: 120, recommended: 110 },
  TCP: { min: 100, max: 120, recommended: 110 },
  BAR: { min: 100, max: 130, recommended: 115 },
  ISC: { min: 80, max: 110, recommended: 95 },
};
```

### 1.4 State Requirements Guide

**Purpose**: SEO powerhouse with 55 unique, valuable pages

**Files to Create**:
```
src/app/state-requirements/page.tsx (landing with selector)
src/app/state-requirements/[state]/page.tsx (dynamic route)
src/lib/data/state-requirements.ts
src/types/state-requirements.ts
```

**Data per State**:
```typescript
interface StateRequirement {
  code: string;           // "CA", "NY", "TX"
  name: string;
  board: {
    name: string;
    url: string;
    phone: string;
    email: string;
  };
  education: {
    totalCredits: number;           // Usually 150
    accountingCredits: number;      // 24-36
    businessCredits: number;        // 24-30
    ethicsRequired: boolean;
    degreeRequired: 'bachelors' | 'masters' | 'either';
    specificCourses: string[];
  };
  experience: {
    hoursRequired: number;          // 1,500-2,000
    yearsRequired: number;          // 1-2
    typeAllowed: ('public' | 'industry' | 'government' | 'academia')[];
    supervisionRequired: boolean;
    supervisorMustBeCPA: boolean;
  };
  examFees: {
    applicationFee: number;
    sectionFee: number;
    reexamFee: number;
  };
  ntsValidity: number;              // months (usually 6)
  ageRequirement: number | null;    // 18, 21, or null
  residencyRequired: boolean;
  internationalCredentials: string;
  lastUpdated: Date;
}
```

**Priority States** (by CPA candidate volume):
1. California, Texas, New York, Florida, Illinois
2. Pennsylvania, Ohio, Georgia, New Jersey, Michigan

### 1.5 Enhanced Section Order Quiz

**Purpose**: Upgrade existing study plan with discipline section logic

**Files to Modify**:
```
src/app/study-plan/page.tsx
```

**New Questions**:
1. Which discipline section interests you? (BAR/TCP/ISC)
2. When do you plan to start? (affects testing window)
3. Have you passed any sections already?
4. What's your tax vs. audit experience?

**Enhanced Logic**:
- Factor in quarterly testing windows for discipline
- Consider 18-month clock if sections already passed
- Weight pass rates in recommendations
- Provide difficulty warnings

---

## Phase 2: Content & Authority

**Timeline**: Weeks 7-10
**Priority**: HIGH
**Goal**: Build SEO authority and trust through valuable content

### 2.1 Blog Infrastructure

**Files to Create**:
```
src/app/blog/page.tsx
src/app/blog/[slug]/page.tsx
src/lib/blog/mdx.ts
src/lib/blog/posts.ts
src/content/blog/*.mdx
```

**Blog Post Schema**:
```typescript
interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: Date;
  updatedAt: Date;
  category: 'study-tips' | 'section-guides' | 'reviews' | 'career' | 'news';
  tags: string[];
  readingTime: number;
  featured: boolean;
}
```

**Initial Posts** (Month 1):
1. "Ultimate Guide to the CPA Exam in 2025"
2. "CPA Exam Pass Rates: What You Need to Know"
3. "How Many Hours to Study for the CPA Exam"
4. "FAR Section: Complete Study Guide"
5. "CPA Exam While Working Full Time: A Real Strategy"

### 2.2 Guides

**Exam Day Walkthrough** (`src/app/guides/exam-day/page.tsx`):
- Week before checklist
- Day before preparation
- What to bring/leave
- Prometric procedures
- Exam interface tutorial
- Time management
- After the exam

**"I Failed, Now What?"** (`src/app/guides/failed-section/page.tsx`):
- Understanding score reports
- Retake timing rules
- Analyzing what went wrong
- Adjusting study approach
- Psychological recovery
- Success stories from retakers

### 2.3 Success Stories

**Files to Create**:
```
src/app/success-stories/page.tsx
src/app/success-stories/[slug]/page.tsx
src/lib/data/success-stories.ts
src/components/stories/StoryCard.tsx
```

**Story Template**:
```typescript
interface SuccessStory {
  slug: string;
  name: string;
  photo?: string;
  location: string;
  situation: string;  // "Working mom", "Career changer", etc.
  sections: {
    name: string;
    score: number;
    attempts: number;
  }[];
  totalMonths: number;
  studyHoursPerWeek: number;
  quote: string;
  fullStory: string;
  tips: string[];
}
```

---

## Phase 3: Email Nurturing

**Timeline**: Weeks 11-14
**Priority**: HIGH
**Goal**: Convert leads through valuable email sequences

### 3.1 7-Email Welcome Sequence

| Day | Subject | Content | CTA |
|-----|---------|---------|-----|
| 0 | Your CPA Study Plan is Ready | Personalized plan delivery | Explore section guides |
| 1 | The #1 Mistake That Causes CPA Candidates to Fail | Study approach education | Read [first section] guide |
| 3 | Free: Your [Section] Study Checklist | Section-specific checklist PDF | Download checklist |
| 7 | How [Name] Passed FAR While Working 60-Hour Weeks | Success story | Read more stories |
| 14 | Feeling Overwhelmed? You're Not Alone | Address struggles, normalize | Working professionals tips |
| 21 | The CPA Review Course We Actually Recommend | Honest comparison, Surgent rec | Affiliate link |
| 30 | Still Studying for the CPA? Let's Check In | Encouragement, updated resources | Retake quiz |

### 3.2 Segment-Based Logic

```typescript
interface LeadSegment {
  workingStatus: 'full-time' | 'part-time' | 'student';
  targetSection: 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';
  studyHoursPerWeek: number;
  experienceLevel: 'beginner' | 'retaker' | 'almost-done';
}
```

**Content Variants**:
- Working full-time → Time management focus
- Retaker → "You've got this" encouragement
- FAR target → FAR-specific tips
- High hours → Advanced strategies

### 3.3 Score Release Notifications

**Triggers**:
- 3 days before: "Scores Coming Soon - Here's How to Prepare"
- Day of: "CPA Scores Are Out! Check Your Results"
- Day after: "How Did You Do? Next Steps Either Way"

---

## Phase 4: Interactive Features

**Timeline**: Weeks 15-20
**Priority**: MEDIUM
**Goal**: Differentiate through interactive tools

### 4.1 AI Study Assistant (Claude)

**Files to Create**:
```
src/app/api/chat/route.ts
src/components/chat/ChatWidget.tsx
src/components/chat/ChatWindow.tsx
src/components/chat/ChatMessage.tsx
src/lib/ai/prompts.ts
```

**System Prompt**:
```
You are an expert CPA exam tutor. You have deep knowledge of:
- CPA Evolution exam structure (3 Core + 1 Discipline)
- All section content (FAR, AUD, REG, TCP, BAR, ISC)
- Study strategies for working professionals
- Common candidate mistakes and how to avoid them

Guidelines:
- Be encouraging but realistic about difficulty
- Always cite specific exam topics when relevant
- Recommend building a study plan on our site
- Do not provide specific exam questions or answers
- For review course questions, mention Surgent as our recommendation
```

### 4.2 Diagnostic Quiz

**Files to Create**:
```
src/app/diagnostic/[section]/page.tsx
src/app/diagnostic/[section]/results/page.tsx
src/lib/quiz/questions/*.ts
src/lib/quiz/scoring.ts
```

**Per Section**: 10-15 questions covering major topics

**Question Structure**:
```typescript
interface DiagnosticQuestion {
  id: string;
  section: string;
  topic: string;
  difficulty: 'foundational' | 'intermediate' | 'advanced';
  questionText: string;
  options: { id: string; text: string; isCorrect: boolean; }[];
  explanation: string;
  studyTip: string;
}
```

**Results**:
- Topic-by-topic breakdown
- Weak areas highlighted
- Study recommendations
- Email capture for full results

### 4.3 Progress Tracker

**Requires**: Database + Auth (Phase 5)

**Features**:
- Log study sessions (date, duration, activity type)
- Track exam attempts and scores
- Visual progress charts
- Goal setting and reminders

---

## Phase 5: Infrastructure

**Timeline**: Weeks 21-24
**Priority**: CRITICAL for Phases 3-4

### 5.1 Supabase Setup

**Why Supabase**:
- Built-in auth that integrates with NextAuth
- Row-level security
- Real-time subscriptions
- Generous free tier (500MB database, 50K monthly active users)
- Edge functions

**Setup Steps**:
1. Create Supabase project
2. Configure auth providers (Email, Google)
3. Run schema migrations
4. Set up Row Level Security policies
5. Configure environment variables

### 5.2 Authentication (NextAuth.js)

**Providers**:
- Email (magic link)
- Google OAuth

**Files to Create**:
```
src/app/api/auth/[...nextauth]/route.ts
src/app/auth/signin/page.tsx
src/app/auth/signup/page.tsx
src/lib/auth/options.ts
```

### 5.3 Admin Dashboard

**Features**:
- Lead list with filtering, search, export
- Email sequence management
- Content scheduling
- Conversion analytics
- Score release date management

**Files to Create**:
```
src/app/admin/layout.tsx
src/app/admin/page.tsx
src/app/admin/leads/page.tsx
src/app/admin/content/page.tsx
src/app/admin/analytics/page.tsx
```

---

## Database Schema

```sql
-- Leads (before user creates account)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  form_data JSONB,
  email_consent BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted_at TIMESTAMPTZ,
  user_id UUID REFERENCES profiles(id)
);

-- User profiles (extends Supabase auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users,
  email TEXT NOT NULL,
  full_name TEXT,
  state_code CHAR(2),
  working_status TEXT,
  target_completion_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email sequences
CREATE TABLE email_sequence_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  sequence_name TEXT NOT NULL,
  current_step INTEGER DEFAULT 0,
  last_sent_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ
);

-- NTS tracking
CREATE TABLE nts_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  state_code CHAR(2),
  start_date DATE NOT NULL,
  expiration_date DATE NOT NULL,
  sections TEXT[],
  reminder_sent_30 BOOLEAN DEFAULT false,
  reminder_sent_14 BOOLEAN DEFAULT false,
  reminder_sent_7 BOOLEAN DEFAULT false
);

-- Score subscriptions
CREATE TABLE score_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  sections TEXT[] NOT NULL,
  notify_days_before INTEGER[] DEFAULT '{3, 1, 0}',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Study sessions (logged-in users)
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  section TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL,
  activity_type TEXT,
  logged_at TIMESTAMPTZ DEFAULT NOW()
);

-- Exam attempts
CREATE TABLE exam_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  section TEXT NOT NULL,
  attempt_number INTEGER DEFAULT 1,
  exam_date DATE,
  score INTEGER,
  passed BOOLEAN
);
```

---

## API Architecture

```
src/app/api/
├── auth/
│   └── [...nextauth]/route.ts
├── email/
│   ├── subscribe/route.ts
│   ├── unsubscribe/route.ts
│   └── preferences/route.ts
├── leads/
│   ├── route.ts
│   └── [id]/route.ts
├── tools/
│   ├── score-calendar/
│   │   ├── subscribe/route.ts
│   │   └── dates/route.ts
│   ├── nts/
│   │   ├── track/route.ts
│   │   └── remind/route.ts
│   └── calculator/route.ts
├── quiz/
│   ├── diagnostic/route.ts
│   └── results/[id]/route.ts
├── chat/route.ts
├── progress/
│   ├── sessions/route.ts
│   └── exams/route.ts
└── admin/
    ├── leads/route.ts
    ├── content/route.ts
    └── analytics/route.ts
```

---

## Component Library

```
src/components/
├── ui/                    # Reusable primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Countdown.tsx
│   └── ProgressBar.tsx
├── tools/
│   ├── ScoreCalendar/
│   ├── NTSTracker/
│   └── Calculator/
├── blog/
│   ├── PostCard.tsx
│   ├── PostList.tsx
│   └── AuthorBio.tsx
├── quiz/
│   ├── QuizQuestion.tsx
│   ├── QuizProgress.tsx
│   └── QuizResults.tsx
├── chat/
│   ├── ChatWidget.tsx
│   ├── ChatWindow.tsx
│   └── ChatMessage.tsx
└── admin/
    ├── DataTable.tsx
    └── ChartWidget.tsx
```

---

## SEO Strategy

### Target Keywords (by search volume)

| Keyword | Monthly Volume | Difficulty | Priority |
|---------|----------------|------------|----------|
| best CPA review course 2025 | 6,600 | Medium | Blog |
| CPA exam pass rates | 2,900 | Low | Blog |
| CPA exam study schedule | 2,400 | Medium | Blog |
| how to pass the CPA exam | 1,900 | Medium | Blog |
| how many hours to study for CPA | 1,600 | Low | Tool |
| CPA exam sections explained | 880 | Low | Existing |
| [State] CPA requirements | 500-2,000 | Low | State pages |

### Technical SEO Checklist
- [ ] XML sitemap with all pages
- [ ] robots.txt optimization
- [ ] Structured data (Article, FAQ, HowTo)
- [ ] Open Graph + Twitter cards
- [ ] Canonical URLs
- [ ] Internal linking strategy
- [ ] Core Web Vitals < 3s LCP

---

## Success Metrics

### Phase 1 (Tools)
- 500+ email subscribers in first 30 days
- Score calendar: 1,000+ monthly visitors
- NTS tracker: 50+ active users
- Average session duration: 3+ minutes

### Phase 2 (Content)
- 5,000+ monthly organic visitors
- Blog: 40%+ of traffic from organic search
- Newsletter subscribers: 2,000+
- Average time on page: 4+ minutes

### Phase 3 (Email)
- Open rate: 40%+
- Click-through rate: 5%+
- Unsubscribe rate: <1%
- Lead-to-nurture conversion: 60%+

### Phase 4-5 (Full Platform)
- Registered users: 1,000+
- Daily active users: 10%+
- Chatbot interactions: 500+/month
- Affiliate conversions: Track via Surgent dashboard

---

## Environment Variables

```env
# Existing
RESEND_API_KEY=
EMAIL_TO=

# Database (Supabase)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# AI
ANTHROPIC_API_KEY=

# Analytics (already configured)
# Vercel Analytics automatic
```

---

## Next Steps

1. **Immediate**: Build Score Release Calendar (highest impact, quick win)
2. **Week 1-2**: NTS Tracker + Study Hours Calculator
3. **Week 3-4**: State Requirements (top 10 states)
4. **Week 5-6**: Enhanced quiz + Header navigation update

Ready to begin Phase 1 implementation.
