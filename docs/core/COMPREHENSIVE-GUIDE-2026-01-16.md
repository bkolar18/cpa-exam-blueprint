# Meridian CPA Review - Comprehensive Claude Guide

**Date:** 2026-01-16
**Version:** 1.0
**Purpose:** Complete reference for Claude Code sessions

---

## Table of Contents

1. [Project Identity](#1-project-identity)
2. [Technical Stack](#2-technical-stack)
3. [MCQ Architecture](#3-mcq-architecture)
4. [TBS Architecture](#4-tbs-architecture)
5. [Website Architecture](#5-website-architecture)
6. [Dashboard Features](#6-dashboard-features)
7. [Authentication System](#7-authentication-system)
8. [Gamification System](#8-gamification-system)
9. [AI Features](#9-ai-features)
10. [Admin Dashboard](#10-admin-dashboard)
11. [Email System](#11-email-system)
12. [Database Schema](#12-database-schema)
13. [API Reference](#13-api-reference)
14. [Styling Guide](#14-styling-guide)
15. [Enhancement Guidelines](#15-enhancement-guidelines)
16. [File Structure](#16-file-structure)
17. [Development Workflow](#17-development-workflow)

---

## 1. Project Identity

**Name:** Meridian CPA Review
**Type:** Full-service CPA review company
**Domain:** cpa-exam-blueprint.vercel.app
**Repository:** https://github.com/bkolar18/cpa-exam-blueprint

### Business Model
- Full-service CPA review platform
- Subscription-based access to premium features
- Free tier with limited access to build trust
- Premium tier with full question bank, AI features, and analytics

### Content Statistics (as of 2026-01-16)
| Content Type | Count |
|--------------|-------|
| MCQ Questions | 6,065+ |
| TBS Questions | ~500 |
| State Guides | 55 |
| Blog Posts | 8+ |
| Exam Sections | 6 |

### CPA Exam Structure (2024+)
- **Core Sections:** FAR, AUD, REG (continuous testing)
- **Discipline Sections:** BAR, TCP, ISC (quarterly: Jan, Apr, Jul, Oct)
- **Passing Score:** 75 per section
- **Time Window:** 18-month rolling window

---

## 2. Technical Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.1 | App Router framework |
| React | 19 | UI library |
| TypeScript | 5 | Type safety |
| Tailwind CSS | v4 | Styling |

### Backend & Services
| Service | Purpose |
|---------|---------|
| Supabase | PostgreSQL database + Auth |
| Anthropic Claude | AI features |
| Resend | Email delivery |
| Vercel | Hosting & deployment |

### Key Dependencies
```json
{
  "@supabase/supabase-js": "Database client",
  "@supabase/ssr": "Cookie-based auth",
  "@anthropic-ai/sdk": "AI integration",
  "resend": "Email service",
  "recharts": "Charts/analytics",
  "react-markdown": "Markdown rendering"
}
```

---

## 3. MCQ Architecture

### Overview
- **Total Questions:** 6,065+
- **Location:** `src/lib/data/practice-questions/`
- **Format:** TypeScript files with type-safe question objects

### Question Distribution
| Section | Questions | Study Hours |
|---------|-----------|-------------|
| FAR | 1,835 | 400-500 |
| AUD | 1,015 | 300-350 |
| REG | 1,345 | 350-400 |
| TCP | 805 | 250-300 |
| BAR | 490 | 150-200 |
| ISC | 575 | 150-200 |

### Question Interface
```typescript
interface PracticeQuestion {
  id: string;                    // Format: {section}-{topic}-{sequence}
  section: SectionCode;          // FAR | AUD | REG | TCP | BAR | ISC
  topic: string;                 // Main topic
  subtopic: string;              // Granular category
  conceptTested: string;         // Specific concept
  difficulty: 'easy' | 'medium' | 'hard';
  questionFormat: QuestionFormat;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;           // Enhanced with authoritative refs
  tip?: string;                  // Memory aid/mnemonic
  calculationRequired?: boolean;
  timeEstimateSeconds?: number;
}
```

### ID Format
```
{section}-{topic-code}-{sequence}

Examples:
- far-000-001 (FAR foundations, question 1)
- reg-001-035 (REG individual taxation, question 35)
- aud-cf-005 (AUD conceptual framework, question 5)
```

### Enhancement Status
| Section | Enhanced | Percentage |
|---------|----------|------------|
| FAR | 1,835 | 100% |
| AUD | 1,015 | 100% |
| REG | 454 | 34% |
| TCP | 0 | 0% |
| BAR | 0 | 0% |
| ISC | 0 | 0% |

### Authoritative References by Section
| Section | Primary Sources |
|---------|-----------------|
| FAR | ASC (FASB Codification) - ASC 606, 842, 740 |
| AUD | AU-C (Auditing Standards) - AU-C 700, 530, 315 |
| REG/TCP | IRC (Internal Revenue Code) - §162, §1031, §1361 |
| BAR | Industry Standards - DuPont, Break-even formulas |
| ISC | COBIT/NIST/AICPA - SOC reports, NIST 800-53 |

### Tax Content Versioning
REG and TCP support dual-track tax content:
- **TCJA:** Pre-July 2026 tax rules
- **OBBBA:** Post-July 2026 tax rules

Files: `reg-obbba.ts`, `tcp-obbba.ts`

### Adaptive Question Selection
1. **35% Priority:** Previously wrong answers
2. **25% Priority:** Low-coverage topics (<30%)
3. **25% Priority:** Never-attempted questions
4. **15% Priority:** Spaced repetition (3+ days since last attempt)

### Difficulty Escalation
| Accuracy | Easy | Medium | Hard |
|----------|------|--------|------|
| 85%+ | 10% | 30% | 60% |
| 70-84% | 20% | 40% | 40% |
| <70% | 30% | 50% | 20% |

---

## 4. TBS Architecture

### Overview
- **Total Questions:** ~500
- **Practice TBS:** ~180
- **Exam TBS:** ~58 (separate bank for simulations)
- **Location:** `src/lib/data/tbs/`

### TBS Distribution
| Section | Practice | Exam | Total |
|---------|----------|------|-------|
| FAR | ~90 | 11 | ~101 |
| AUD | ~90 | 11 | ~101 |
| REG | ~80 | 10 | ~90 |
| TCP | ~80 | 9 | ~89 |
| BAR | ~80 | 9 | ~89 |
| ISC | ~50 | 8 | ~58 |

### TBS Types
```typescript
type TBSType =
  | 'numeric_entry'      // Free-response calculations
  | 'document_review'    // Analyze documents, select corrections
  | 'journal_entry'      // Record transactions with debits/credits
  | 'dropdown'           // Option list selections
  | 'reconciliation'     // Bank/account reconciliations
  | 'exhibit_analysis';  // Analyze authoritative literature
```

**Deprecated Types (retained for backward compatibility):**
- `research` - Literature search (eliminated from CPA exam)
- `written_communication` - Business correspondence (eliminated)

### TBS Question Interface
```typescript
interface TBSQuestion {
  id: string;                    // Format: tbs-{section}-{number}
  section: SectionCode;
  tbsType: TBSType;
  topic: string;
  subtopic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  skillLevel: SkillLevel;        // Bloom's taxonomy
  contentArea: ContentArea;      // AICPA Blueprint area
  title: string;
  scenarioText: string;
  timeEstimateMinutes: number;
  maxScorePoints: number;
  exhibits: TBSExhibit[];
  requirements: TBSRequirement[];
  journalAccounts?: TBSJournalAccount[];
}
```

### Exhibit Types
```typescript
type ExhibitType =
  | 'memo' | 'email' | 'financial_statement' | 'table'
  | 'invoice' | 'contract' | 'bank_statement' | 'ledger'
  | 'tax_form' | 'audit_report' | 'image' | 'text';
```

### Requirement Types
```typescript
type RequirementType =
  | 'numeric'        // Enter a number
  | 'dropdown'       // Select from options
  | 'journal_debit'  // Journal entry debit line
  | 'journal_credit' // Journal entry credit line
  | 'text'           // Free text response
  | 'checkbox'       // True/false or select multiple
  | 'matching';      // Match items
```

### ID Format
```
tbs-{section}-{number}

Examples:
- tbs-far-001 through tbs-far-090
- tbs-aud-001 through tbs-aud-090
```

### Content Areas by Section
| Section | Content Areas |
|---------|---------------|
| FAR | FAR-I, FAR-II, FAR-III, FAR-IV |
| AUD | AUD-I, AUD-II, AUD-III, AUD-IV |
| REG | REG-I, REG-II, REG-III, REG-IV, REG-V |
| TCP | TCP-I, TCP-II, TCP-III, TCP-IV |
| BAR | BAR-I, BAR-II, BAR-III |
| ISC | ISC-I, ISC-II, ISC-III |

### TBS Components
```
src/components/tbs/
├── TBSContainer.tsx          # Main orchestration
├── TBSHeader.tsx             # Title, navigation, flags
├── TBSInstructions.tsx       # Scenario display
├── ExhibitPanel/             # Tab-based exhibit viewer
│   ├── ExhibitViewer.tsx
│   ├── MemoExhibit.tsx
│   ├── TableExhibit.tsx
│   └── FinancialExhibit.tsx
├── WorkArea/                 # Answer input components
│   ├── NumericEntryGrid.tsx
│   ├── JournalEntryForm.tsx
│   ├── DropdownSelect.tsx
│   └── ReconciliationForm.tsx
└── Tools/
    ├── Calculator.tsx        # Alt+C
    ├── ScratchPad.tsx        # Alt+N
    └── FormulaSheet.tsx      # Alt+F
```

### TBS Features
- Auto-save every 30 seconds
- Undo/Redo (Ctrl+Z, Ctrl+Y)
- Keyboard shortcuts
- Flag for review (Alt+R)
- Split-view (exhibits + work area)
- Partial credit support

---

## 5. Website Architecture

### Routing Structure

#### Public Pages
```
/                           # Homepage
/about                      # About page
/signup                     # Registration
/login                      # Authentication
/forgot-password            # Password recovery
/reset-password             # Password reset
/pricing                    # Subscription plans
/faq                        # FAQ
```

#### Content Pages
```
/blog                       # Blog listing
/blog/[slug]                # Individual posts
/resources/                 # Resource hub
/sections/{far|aud|reg|tcp|bar|isc}  # Section info
/topics/{section}/{topic}   # Topic deep-dives
/compare/{comparison}       # Course comparisons
/guides/{guide}             # Educational guides
/state-requirements         # All states
/state-requirements/[state] # Individual state
```

#### Tools
```
/tools/nts-tracker          # NTS tracking
/tools/score-release-calendar
/tools/study-hours-calculator
/study-plan                 # Study plan generator
```

#### Dashboard (Protected)
```
/dashboard                  # Main dashboard
/dashboard/practice/[section]
/dashboard/practice/history
/dashboard/exam-simulation/[section]
/dashboard/exam-simulation/debrief/[examId]
/dashboard/simulations      # TBS library
/dashboard/simulations/[id]
/dashboard/flashcards/[section]
/dashboard/my-notes
/dashboard/flagged-questions
/dashboard/nts
/dashboard/analytics
/dashboard/accolades
/dashboard/exam-schedule
/dashboard/readiness
/dashboard/study-log
/dashboard/settings
```

#### Admin (Protected - ADMIN_EMAILS only)
```
/admin                      # Admin overview
/admin/users                # User management
/admin/feedback             # Question feedback
/admin/questions            # Question database
/admin/analytics            # Platform analytics
/admin/activity             # Activity log
/admin/announcements        # System announcements
/admin/security             # Security settings
```

---

## 6. Dashboard Features

### Main Dashboard
- Quick stats overview (questions answered, accuracy, streaks)
- Section progress cards
- Recent activity feed
- AI features access
- Surgent promotional banner (dismissible, 30-day reappearance)

### Practice System
- Section selection with stats
- Question count and topic filtering
- Difficulty selection
- Adaptive question delivery
- Immediate feedback with explanations
- Session history and review
- Auto-save on navigate away
- Resume incomplete sessions

### Exam Simulation
- Timed practice tests
- Pause/resume functionality
- MCQ + TBS mixed modes
- AI exam debrief analysis
- Score tracking and history

### TBS Simulations
- Full TBS library browser
- Filter by type, difficulty, topic
- Progress tracking (not started/in progress/completed)
- Best score display
- Review past attempts

### Flashcards
- AI-generated from weak topics
- Section-based organization
- Review mode with flip animation
- Progress tracking

### Study Tools
- Study log with hours tracking
- NTS tracker integration
- Exam schedule management
- Notes per question
- Flagged questions list

### Analytics
- Performance by section
- Topic-level accuracy
- Time spent analysis
- Progress charts
- Trend visualization

### Accolades
- Badge display with tiers
- Achievement progress
- Unlock history
- Points accumulation

---

## 7. Authentication System

### Architecture
- **Method:** Cookie-based auth via `@supabase/ssr`
- **Provider:** Supabase Auth
- **Session:** Refreshed via middleware on each request

### Key Files
```
src/lib/supabase/
├── client.ts      # Browser client (createBrowserClient)
├── server.ts      # Server client for API routes
├── middleware.ts  # Session refresh middleware
└── types.ts       # Profile, Session types

src/components/auth/
├── AuthProvider.tsx      # Context with error handling
├── AuthErrorBanner.tsx   # Error UI component
└── InactivityWarning.tsx # Session timeout warning
```

### Auth Context
```typescript
interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: AuthErrorType;  // 'network' | 'service_unavailable' | 'session_expired' | 'unknown' | null
  isServiceAvailable: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  retryAuth: () => Promise<void>;
}
```

### Graceful Degradation
- Network errors show retry UI instead of redirecting
- Service unavailable shows appropriate message
- Session expired prompts re-login
- Progressive retry delays (300ms, 600ms)

---

## 8. Gamification System

### Points System
| Action | Points |
|--------|--------|
| Study session | 10 per hour |
| Correct answer | 5 |
| Incorrect answer | 1 |
| Section passed | 100 |
| Badge earned | Varies by tier |

### Badge Tiers
| Tier | Points | Color |
|------|--------|-------|
| Bronze | 15 | #CD7F32 |
| Silver | 30 | #C0C0C0 |
| Gold | 90 | #FFD700 |
| Platinum | 300 | #E5E4E2 |

### Badge Categories
- **Study Hours:** 100 Hour Warrior, 500 Hour Master
- **Practice:** Warm Up (10Q), Century Club (100Q)
- **Section:** FAR Explorer, AUD Expert
- **Accuracy:** Sharp Accountant (75%+)
- **Streak:** Daily Dedication (3 days), Month Master (30 days)
- **Special:** Early Bird (5-7am), Night Owl (10pm-2am)
- **TBS:** TBS Master, Task Champion
- **Account:** Profile Complete, Discipline Chosen

### Streak Tracking
- `current_streak`: Consecutive study days
- `longest_streak`: Personal best
- `last_study_date`: Last activity
- Resets at midnight if day is missed

### Achievement Triggers
- Study session completion
- Practice milestones (10, 25, 50, 100, 250, 500, 1000 questions)
- Section passing
- Profile updates
- TBS completion
- Time-based (early bird, night owl, marathon)

---

## 9. AI Features

### Powered by Anthropic Claude

### Feature List
| Feature | Description | Limits (Beta) |
|---------|-------------|---------------|
| Navigator | AI tutor for questions | 10/day |
| Flashcard Generator | Create from weak topics | 5/month |
| Exam Debrief | Analyze simulation results | Unlimited |
| Pre-Exam Assessment | Readiness evaluation | 1/exam |
| Study Guide | Personalized plans | 1/month |
| Weekly Report | Progress summaries | 1/week |

### API Routes
```
POST /api/ai/navigator          # AI tutor messages
POST /api/ai/generate-flashcards
POST /api/ai/exam-debrief
POST /api/ai/pre-exam-assessment
POST /api/ai/study-guide
POST /api/ai/weekly-report
```

### Usage Tracking
- Stored in `ai_feature_usage` table
- Monthly reset on usage counters
- Tier-based limits (free/standard/pro)

---

## 10. Admin Dashboard

### Access Control
- Email-based allowlist: `ADMIN_EMAILS` environment variable
- Server-side auth checks
- Action logging for audit trail

### Admin Pages

#### Overview (`/admin`)
- Total users count
- Pending feedback count
- Practice sessions today
- Active users (last 7 days)
- Recent activity feeds

#### User Management (`/admin/users`)
- User list with search
- User details and progress
- Subscription tier viewing
- Account management

#### Question Feedback (`/admin/feedback`)
- Pending feedback queue
- Feedback types: Error, Ambiguous, Outdated
- Status: pending, resolved, dismissed
- Bulk operations
- Question context display

#### Questions (`/admin/questions`)
- Question database browse
- Editing capabilities
- Answer verification
- Difficulty assessment

#### Analytics (`/admin/analytics`)
- User growth metrics
- Practice session trends
- Accuracy by section
- Topic difficulty analysis
- Conversion metrics

#### Activity Log (`/admin/activity`)
- User/admin action tracking
- Search and filter
- Export capabilities

#### Announcements (`/admin/announcements`)
- Create/edit announcements
- Schedule publishing
- Track engagement

#### Security (`/admin/security`)
- Admin access logs
- Suspicious activity alerts
- Session management

### Action Logging
```typescript
// Admin actions
'ADMIN_LOGIN' | 'FEEDBACK_RESOLVED' | 'FEEDBACK_DISMISSED' |
'FEEDBACK_BULK_UPDATE' | 'USER_VIEWED' | 'EXPORT_DATA' |
'ANNOUNCEMENT_SENT'

// User actions
'USER_SIGNUP' | 'USER_LOGIN' | 'FEEDBACK_SUBMITTED' |
'PRACTICE_SESSION' | 'SUBSCRIPTION_CHANGED'
```

---

## 11. Email System

### Provider: Resend

### Email Types
- **Transactional:** Welcome, password reset, verification
- **Nurture Sequence:** 7-email welcome series
- **Segment-Based:** Personalized by user type

### Nurture Sequence
| Day | Content |
|-----|---------|
| 0 | Welcome |
| 1 | Getting started tips |
| 3 | Motivation message |
| 5 | Section guide |
| 7 | Soft CTA |
| 10 | Check-in |

### Segments
- working-full-time
- student
- career-changer
- retaker
- far-first, reg-first, aud-first
- limited-hours

### Configuration
```typescript
// Brand
name: "Meridian CPA Review"
tagline: "Smart CPA Exam Prep"
support: "support@meridiancpareview.com"

// Sender addresses
system: "no-reply@meridiancpareview.com"
support: "support@meridiancpareview.com"
marketing: "hello@meridiancpareview.com"
```

---

## 12. Database Schema

### Core Tables
```sql
profiles              -- User accounts with gamification
study_sessions        -- Study log entries
section_progress      -- Exam section tracking
practice_attempts     -- MCQ practice history
tbs_attempts          -- TBS attempts
question_notes        -- User annotations
nts_entries           -- Notice to Schedule tracking
question_feedback     -- User feedback on questions
```

### Gamification Tables
```sql
badges               -- Badge definitions
user_badges          -- Badge progress
achievements         -- Achievement definitions
user_achievements    -- Achievement status
```

### Content Tables
```sql
exam_simulation_history  -- Full exam simulations
flashcards              -- AI-generated flashcards
```

### Admin Tables
```sql
activity_log         -- User & admin actions
announcements        -- System announcements
```

### AI Tables
```sql
ai_feature_usage           -- AI feature tracking
exam_debriefs              -- Exam analysis results
navigator_conversations    -- AI tutor history
```

### Email Tables
```sql
email_queue          -- Email sending queue
email_tracking       -- Email engagement
```

---

## 13. API Reference

### Authentication
```
POST /api/auth/clear-session   # Logout
GET  /api/auth/callback        # OAuth callback
GET  /api/auth/confirm         # Email confirmation
```

### Practice & TBS
```
GET  /api/tbs/questions        # TBS retrieval
GET  /api/tbs/questions/[id]   # Specific TBS
POST /api/tbs/attempts         # Submit attempt
GET  /api/tbs/attempts         # User's history
GET  /api/tbs/stats            # Performance stats
```

### AI Features
```
POST /api/ai/navigator
POST /api/ai/generate-flashcards
POST /api/ai/exam-debrief
POST /api/ai/pre-exam-assessment
POST /api/ai/study-guide
POST /api/ai/weekly-report
```

### Admin
```
GET  /api/admin/users
GET  /api/admin/questions
GET  /api/admin/feedback
POST /api/admin/feedback/bulk
GET  /api/admin/analytics
GET  /api/admin/activity
POST /api/admin/announcements
POST /api/admin/search
```

### Email
```
POST /api/email/test
GET  /api/email/preview
POST /api/email/process-queue
GET  /api/email/webhook
POST /api/email/unsubscribe
```

### User Features
```
POST /api/subscribe-nts
POST /api/subscribe-score-release
POST /api/submit-study-plan
POST /api/feedback
POST /api/navigator
```

---

## 14. Styling Guide

### CSS Variables (Light Mode)
```css
--background: #ffffff
--foreground: #1a1a2e
--primary: #1e3a5f        /* Navy blue */
--primary-light: #2d5a87
--primary-dark: #152a45
--secondary: #16a34a      /* Green */
--accent: #0ea5e9         /* Cyan */
--muted: #64748b          /* Gray */
--border: #e2e8f0
--card: #f8fafc
```

### CSS Variables (Dark Mode)
```css
--background: #0f172a     /* Dark slate */
--foreground: #f1f5f9
--primary: #3b82f6        /* Bright blue */
--secondary: #22c55e
--accent: #38bdf8
--border: #4b5563
--card: #1f2937
```

### Section Colors
```typescript
const sectionColors = {
  FAR: "#1e3a5f",  // Navy
  AUD: "#0891b2",  // Cyan
  REG: "#7c3aed",  // Purple
  TCP: "#16a34a",  // Green
  BAR: "#dc2626",  // Red
  ISC: "#ea580c",  // Orange
};
```

### Font Configuration
- **Sans:** Geist font family
- **Mono:** Geist Mono
- **Fallback:** Arial, Helvetica, sans-serif

---

## 15. Enhancement Guidelines

### MCQ Enhancement Template
```
**Correct Answer Rationale**
Why it's right + authoritative reference (ASC/AU-C/IRC)

**Distractor Analysis**
- Option A: Why incorrect + common misconception
- Option B: Why incorrect + common misconception
- Option C: Why incorrect + common misconception

**Calculation Steps** (if applicable)
1. Step with formula
2. Step with values
3. Final answer

**Memory Tip**
One concise mnemonic rule
```

### TBS Enhancement Template
```
**For Numeric Entry:**
- Formula with variable definitions
- Step-by-step calculation
- Final answer with units
- Common mistakes section

**For Journal Entry:**
- Correct entry (Dr/Cr format)
- Reasoning with ASC reference
- Why not other accounts

**For Dropdown:**
- Correct selection
- Authoritative basis
- Why other options wrong
```

### Quality Checklist
- [ ] Authoritative reference included
- [ ] Calculation steps shown (if applicable)
- [ ] Distractor analysis complete
- [ ] 100-250 words per explanation
- [ ] Proper formatting (bold headers, bullets)
- [ ] CPA exam terminology used

### Batch Rules
- **MCQ:** No specific batch limit
- **TBS:** Add in batches of 10 or fewer

---

## 16. File Structure

```
cpa-exam-blueprint/
├── docs/
│   └── core/
│       ├── CLAUDE.md                    # Quick reference
│       ├── CLAUDE_CONTEXT.txt           # Full context
│       ├── SESSION_LOG.txt              # Session history
│       ├── SESSION_PROMPT.txt           # Session start
│       ├── COMPREHENSIVE-GUIDE-2026-01-16.md  # This file
│       └── archive/                     # Historical docs
├── src/
│   ├── app/
│   │   ├── api/                         # API routes
│   │   ├── dashboard/                   # Protected pages
│   │   ├── admin/                       # Admin pages
│   │   └── [public pages]
│   ├── components/
│   │   ├── auth/                        # Auth components
│   │   ├── dashboard/                   # Dashboard components
│   │   ├── tbs/                         # TBS components
│   │   ├── practice/                    # Practice components
│   │   ├── gamification/                # Gamification components
│   │   └── admin/                       # Admin components
│   └── lib/
│       ├── supabase/                    # Database clients
│       ├── data/
│       │   ├── practice-questions/      # MCQ files
│       │   └── tbs/                     # TBS files
│       ├── gamification/                # Badges/achievements
│       ├── ai/                          # AI utilities
│       ├── email/                       # Email system
│       └── admin/                       # Admin utilities
├── scripts/                             # Utility scripts
├── supabase/                            # Migrations
└── Question Audits/                     # Audit files
```

---

## 17. Development Workflow

### Commands
```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build (ALWAYS before commit)
npm run lint       # Run linter
git push           # Auto-deploy to Vercel
```

### Golden Rules
1. **Run `npm run build` before committing**
2. **Read CLAUDE.md before TBS work**
3. **TBS batches max 10 questions**
4. **Session docs are local (don't push every update)**
5. **Cookie-based auth via @supabase/ssr**
6. **Prefer editing existing files over creating new ones**
7. **Use CSS variables for colors**
8. **Include Claude Code + Happy attribution in commits**

### Commit Message Format
```
<main commit message>

Generated with [Claude Code](https://claude.ai/code)
via [Happy](https://happy.engineering)

Co-Authored-By: Claude <noreply@anthropic.com>
Co-Authored-By: Happy <yesreply@happy.engineering>
```

### Error Tracking
```typescript
// Available functions
captureException(error, context)
captureMessage(message, level)
trackAuthError(action, message, extra)
trackApiError(endpoint, status, message, extra)
setUser(id, email)
```

---

## Quick Reference

### Content Counts
- **MCQs:** 6,065+
- **TBS:** ~500
- **States:** 55
- **Sections:** 6

### Key URLs
- **Production:** https://cpa-exam-blueprint.vercel.app
- **Dashboard:** /dashboard
- **Admin:** /admin

### Support Contacts
- **System:** no-reply@meridiancpareview.com
- **Support:** support@meridiancpareview.com
- **Marketing:** hello@meridiancpareview.com

---

*Document generated: 2026-01-16*
*For Claude Code sessions*
