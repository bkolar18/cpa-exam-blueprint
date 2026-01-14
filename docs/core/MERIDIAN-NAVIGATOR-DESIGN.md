# Meridian Navigator & AI Features - Design Specification

**Created:** January 2026
**Status:** All AI Features Implemented
**Last Updated:** January 2026

### Implementation Status

| Phase | Status | Notes |
|-------|--------|-------|
| Phase 1: Core Navigator | ✅ Complete | API route, hooks, UI components |
| Phase 2: MCQ Integration | ✅ Complete | Practice & Review mode inline chat |
| Phase 3: TBS Integration | ✅ Complete | Floating panel with FAB |
| Phase 4: Database Migration | ✅ Complete | ai_feature_usage table |
| Phase 5: Study Guide Generator | ✅ Complete | API with tier limits, AICPA blueprint mapping |
| Phase 6: Exam Debrief | ✅ Complete | Auto-generated after simulations |
| Phase 7: Flashcard Generator | ✅ Complete | JSON response parsing, monthly limits |
| Phase 8: Weekly Email | ✅ Complete | Cron-ready, preview mode, Resend integration |
| Phase 9: Pre-Exam Assessment | ✅ Complete | Per-exam limits, content area breakdown |
| Phase 10: Admin Analytics | ✅ Complete | AI usage tracking dashboard |

### Files Created

```
src/
├── app/api/
│   ├── navigator/route.ts           # Core Navigator chat API
│   └── ai/
│       ├── study-guide/route.ts     # Study Guide Generator API
│       ├── generate-flashcard/route.ts  # Flashcard Generator API
│       ├── exam-debrief/route.ts    # Exam Simulation Debrief API
│       ├── pre-exam-assessment/route.ts  # Pre-Exam Assessment API
│       └── weekly-report/route.ts   # Weekly Progress Email API
├── hooks/useNavigatorContext.ts     # Analytics + conversation hooks
├── components/navigator/
│   ├── index.ts                     # Exports
│   ├── NavigatorChat.tsx            # Core chat UI
│   ├── NavigatorFloatingPanel.tsx   # Draggable panel for TBS
│   └── NavigatorToggleButton.tsx    # Toggle button + FAB
└── components/practice/
    └── QuizQuestion.tsx             # Updated with Navigator integration

supabase/migrations/
└── 20260114_meridian_navigator_tables.sql  # Database schema
```

---

## Overview

Meridian Navigator is the core AI-powered study tutor, with additional AI features that help CPA exam candidates understand questions, clarify concepts, generate personalized study guides, and learn from mistakes. All AI features use Claude Haiku 3.5 for cost efficiency.

### Naming

- **Feature Name:** Meridian Navigator (chat tutor)
- **Branding:** Ties into existing "Prime Meridian" scoring system
- **Metaphor:** Navigation/compass - guiding students through their CPA journey

### AI Feature Suite

| Feature | Description | Availability |
|---------|-------------|--------------|
| **Meridian Navigator** | Interactive chat tutor | Standard: 30/day, Pro: 50/day |
| **Study Guide Generator** | Personalized study plans | Standard: 1/mo, Pro: 2/mo |
| **Exam Simulation Debrief** | AI analysis of mock exams | Included with all exams |
| **Mistake-to-Flashcard** | Auto-generate flashcards | Standard: 10/mo, Pro: 20/mo |
| **Weekly Progress Report** | AI-narrated email summary | Free for all users |
| **Pre-Exam Assessment** | Readiness evaluation | 1 per scheduled exam |

---

## Table of Contents

1. [Feature Availability](#1-feature-availability)
2. [AI Communication Guidelines](#2-ai-communication-guidelines)
3. [AI Configuration](#3-ai-configuration)
4. [Analytics Integration](#4-analytics-integration)
5. [Context System](#5-context-system)
6. [UI Design](#6-ui-design)
7. [Theme Integration](#7-theme-integration)
8. [Component Architecture](#8-component-architecture)
9. [Quick Actions](#9-quick-actions)
10. [Cost Controls](#10-cost-controls)
11. [Database Schema](#11-database-schema)
12. [Additional AI Features](#12-additional-ai-features)
13. [Implementation Checklist](#13-implementation-checklist)

---

## 1. Feature Availability

### Navigator Access Matrix

| Context | During Practice | After Submit / In Review |
|---------|-----------------|--------------------------|
| **MCQ Practice** | Hints (if enabled, off by default) | Full explanations |
| **TBS Practice** | Hints (if enabled, off by default) | Full explanations |
| **Exam Simulation** | **DISABLED** | Full explanations (Study Log only) |
| **Study Log Review** | N/A | Full explanations |

### Mode Behavior

| Mode | Trigger | AI Behavior |
|------|---------|-------------|
| **Practice** | Before answer submission | Socratic hints only, won't reveal answers |
| **Review** | After submission / Study Log | Full explanations, walkthroughs, "why wrong" |

### User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER STARTS SESSION                       │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
    MCQ Practice         TBS Practice       Exam Simulation
         │                    │                    │
         ▼                    ▼                    ▼
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Hints?   │         │ Hints?   │         │ LOCKED   │
   │ (toggle) │         │ (toggle) │         │ No chat  │
   └──────────┘         └──────────┘         └──────────┘
         │                    │                    │
         ▼                    ▼                    ▼
   Submit Answer        Submit TBS          Complete Exam
         │                    │                    │
         ▼                    ▼                    ▼
   ┌──────────┐         ┌──────────┐         ┌──────────┐
   │ Review   │         │ Review   │         │ Results  │
   │ + Chat   │         │ + Chat   │         │ Summary  │
   │ (inline) │         │ (panel)  │         │ No chat  │
   └──────────┘         └──────────┘         └──────────┘
                                                   │
                                                   ▼
                                             ┌──────────┐
                                             │Study Log │
                                             │ Review   │
                                             │ + Chat   │
                                             └──────────┘
```

---

## 2. AI Communication Guidelines

### Critical Language Rules

All AI features MUST follow these guidelines to avoid implying guarantees about exam outcomes.

#### NEVER Use (Prohibited Phrases)

| Category | Prohibited Examples |
|----------|---------------------|
| **Pass/Fail Guarantees** | "You're ready for the exam", "You'll pass if...", "You're not ready", "You'll fail if..." |
| **Certainty Language** | "You're definitely prepared", "You will succeed", "Guaranteed to...", "You won't pass" |
| **Outcome Promises** | "This ensures you'll pass", "You're set for success", "Nothing to worry about" |
| **Negative Predictions** | "You're going to struggle", "You won't make it", "Don't take the exam yet" |

#### ALWAYS Use (Approved Alternatives)

| Instead Of | Use |
|------------|-----|
| "You're ready for the exam" | "Strong preparation indicators in this area" |
| "You'll pass if you do this" | "This aligns with recommended preparation benchmarks" |
| "You're not ready" | "Additional practice in [area] is recommended" |
| "You'll fail" | "Current metrics suggest focusing on [weak areas] before sitting" |
| "You're definitely prepared" | "Excellent coverage across tested topics" |
| "Don't take the exam" | "Consider whether you've met your personal preparation goals" |

#### Approved Language Patterns

**For Positive Performance:**
```
✅ "Excellent coverage in [topic]"
✅ "Strong performance indicators"
✅ "This aligns with the recommended Prime Meridian target of 80"
✅ "Solid understanding demonstrated"
✅ "Above the recommended benchmark"
✅ "Well-prepared in this content area"
```

**For Areas Needing Work:**
```
✅ "This topic may benefit from additional review"
✅ "Consider spending more time on [topic]"
✅ "Current accuracy is below the recommended benchmark"
✅ "This is a common area where candidates benefit from extra practice"
✅ "Recommend achieving 80+ Prime Meridian before sitting for the exam"
✅ "Additional practice recommended in [area]"
```

**For Overall Assessment:**
```
✅ "Based on current metrics, [areas] show strong preparation while [areas] may benefit from additional focus"
✅ "The recommended benchmark before sitting is a Prime Meridian score of 80"
✅ "Current preparation level: [score]/80 recommended target"
✅ "Coverage across AICPA blueprint areas: X% complete"
```

### System Prompt Language Enforcement

All AI system prompts MUST include:

```
CRITICAL LANGUAGE RULES - YOU MUST FOLLOW THESE:

1. NEVER guarantee or predict exam outcomes (pass/fail)
2. NEVER say "you're ready" or "you're not ready" for the exam
3. NEVER use phrases like "you'll pass", "you'll fail", "definitely prepared"
4. ALWAYS frame feedback in terms of preparation metrics and benchmarks
5. ALWAYS reference the "recommended Prime Meridian target of 80" instead of "passing"
6. ALWAYS use phrases like "additional practice recommended" not "you need to study more or you'll fail"

Frame all assessments as:
- Observations about current metrics
- Comparisons to recommended benchmarks
- Suggestions for areas to focus on
- Factual statements about coverage

Remember: Exam success depends on many factors beyond preparation metrics.
Many well-prepared candidates face unexpected challenges, and some less-prepared
candidates perform better than expected. Your role is to provide objective
feedback on preparation status, not predict outcomes.
```

### Disclaimer Integration

Every AI-generated output must include appropriate disclaimers:

**Navigator Chat Footer:**
```
AI responses are for educational purposes only. Exam outcomes depend on many
factors. Verify information with authoritative sources.
```

**Study Guide Footer:**
```
This study guide is based on your current performance data and AICPA blueprint
weightings. Actual exam content and difficulty may vary. Success depends on
individual effort, circumstances, and factors beyond measured preparation.
```

**Pre-Exam Assessment Footer:**
```
This assessment reflects current practice metrics compared to recommended
benchmarks. It is not a prediction of exam outcome. Many factors influence
actual exam performance including test-day conditions, question selection,
and individual circumstances.
```

---

## 3. AI Configuration

### Model Selection

| Model | Cost (1M tokens) | Use Case |
|-------|------------------|----------|
| Claude Haiku 3.5 | $0.80 in / $4.00 out | **Primary - All AI features** |

**Rationale:** Haiku is 10-20x cheaper than Sonnet while still providing high-quality educational responses.

### Estimated Costs Per Feature

| Feature | Input Tokens | Output Tokens | Cost/Use |
|---------|--------------|---------------|----------|
| Navigator message | ~800-1,500 | ~200-500 | ~$0.001-0.003 |
| Study Guide | ~2,000 | ~1,500 | ~$0.008 |
| Exam Debrief | ~3,000 | ~1,000 | ~$0.006 |
| Flashcard Generation | ~800 | ~400 | ~$0.002 |
| Pre-Exam Assessment | ~2,500 | ~1,200 | ~$0.007 |
| Weekly Email | ~1,500 | ~800 | ~$0.004 |

### Monthly Cost Estimates Per User

| User Type | Estimated Monthly AI Cost |
|-----------|---------------------------|
| Light user (Standard) | ~$0.10-0.20 |
| Heavy user (Pro) | ~$0.30-0.50 |
| Maximum usage (all limits) | ~$0.80-1.00 |

### System Prompt Structure

```
┌─────────────────────────────────────────────────────────────┐
│                    SYSTEM PROMPT                            │
│  - Role: CPA exam tutor (Meridian Navigator)                │
│  - Mode: Practice (hints) or Review (full explanations)     │
│  - Restrictions: Stay on topic, no guarantees               │
│  - Disclaimers: Not affiliated with AICPA/NASBA             │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│                 INJECTED CONTEXT                            │
│  - Section, Topic, Subtopic                                 │
│  - Question/Scenario text                                   │
│  - Options (MCQ) or Requirements (TBS)                      │
│  - User's answer + Correct answer (review mode only)        │
│  - Existing explanation (review mode only)                  │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│                 CONVERSATION HISTORY                        │
│  - Last 5 messages (truncated if needed)                    │
└─────────────────────────────────────────────────────────────┘
                              +
┌─────────────────────────────────────────────────────────────┐
│                 CURRENT USER MESSAGE                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. Analytics Integration

All AI features leverage the existing analytics system to provide personalized, contextual responses.

### Data Sources Available

| Source | Data | AI Usage |
|--------|------|----------|
| `user_topic_performance` | Accuracy, mastery level, confidence | Personalize explanations, identify patterns |
| `practice_attempts` | Recent mistakes, time spent | Reference similar past errors |
| `section_progress` | Exam date, scores, status | Urgency context, progress tracking |
| `Prime Meridian score` | Readiness per content area | Benchmark comparisons |
| `tbs_attempts` | TBS scores by type | Identify weak simulation types |
| `study_sessions` | Study hours, streaks | Engagement patterns |
| `exam_simulation_history` | Full mock exam results | Debrief analysis |

### Analytics Context Structure

```typescript
interface NavigatorAnalyticsContext {
  // Current topic performance
  topicPerformance?: {
    topic: string;
    accuracy: number;           // 0-100
    questionsAttempted: number;
    masteryLevel: 'weak' | 'moderate' | 'mastered';
    avgConfidence?: number;     // 1-5
    lastAttemptDate?: string;
  };

  // Related weak areas (same section)
  relatedWeakTopics?: Array<{
    topic: string;
    accuracy: number;
    masteryLevel: string;
  }>;

  // Recent mistakes on same topic (last 7 days)
  recentMistakes?: Array<{
    questionId: string;
    date: string;
    userAnswer: string;
    correctAnswer: string;
  }>;

  // Section-level context
  sectionContext?: {
    section: string;
    primeMeridianScore: number;
    examDate?: string;
    daysUntilExam?: number;
    contentAreaWeight: number;  // AICPA blueprint %
  };

  // TBS-specific performance
  tbsPerformance?: {
    tbsType: string;
    avgScore: number;
    attemptCount: number;
    isWeakType: boolean;
  };

  // Study patterns
  studyPatterns?: {
    currentStreak: number;
    totalStudyHours: number;
    lastStudyDate: string;
  };
}
```

### How AI Uses Analytics

#### Personalized Explanations

**Without Analytics:**
> "The present value calculation requires using the implicit rate..."

**With Analytics:**
> "I notice this topic (Leases) has been challenging - your current accuracy is 45% across 12 attempts. The key concept that may help is understanding when to use the implicit rate vs. incremental borrowing rate. Let me break this down step by step..."

#### Pattern Recognition

**AI can reference:**
> "You missed a similar question on January 10th where the discount rate was also the issue. This appears to be a recurring pattern - let's make sure this concept is clear."

#### Benchmark Context

**AI can say:**
> "This topic falls under Government & NFP Accounting, which is 15-25% of FAR per AICPA blueprints. Your current accuracy here (48%) is below the recommended benchmark. Strong performance in this area significantly impacts your overall Prime Meridian score."

#### Exam Proximity Awareness

**AI can say:**
> "With your FAR exam 14 days away, this is a high-priority topic given your current metrics. Consider focusing additional practice time here."

### Analytics-Aware Quick Actions

| Detected Pattern | Additional Chip Shown |
|------------------|----------------------|
| Topic accuracy <60% | "Why do I keep missing these?" |
| Exam < 30 days | "How important is this for my exam?" |
| Repeated similar mistake | "Show me my pattern of errors" |
| Low confidence, high accuracy | "Am I better at this than I think?" |
| High-weight content area | "What else in this area should I know?" |

### Database Queries for Analytics Context

```typescript
async function getNavigatorAnalytics(
  userId: string,
  section: string,
  topic: string
): Promise<NavigatorAnalyticsContext> {
  const supabase = createClient();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Parallel queries for efficiency
  const [topicPerf, weakTopics, recentMistakes, sectionProgress] = await Promise.all([
    // Current topic performance
    supabase
      .from('user_topic_performance')
      .select('*')
      .eq('user_id', userId)
      .eq('section', section)
      .eq('topic', topic)
      .single(),

    // Related weak topics
    supabase
      .from('user_topic_performance')
      .select('topic, accuracy_rate, mastery_level')
      .eq('user_id', userId)
      .eq('section', section)
      .eq('mastery_level', 'weak')
      .limit(3),

    // Recent mistakes on same topic
    supabase
      .from('practice_attempts')
      .select('question_id, created_at, selected_answer, correct_answer')
      .eq('user_id', userId)
      .eq('topic', topic)
      .eq('is_correct', false)
      .gte('created_at', sevenDaysAgo)
      .order('created_at', { ascending: false })
      .limit(3),

    // Section progress
    supabase
      .from('section_progress')
      .select('exam_date, score, status')
      .eq('user_id', userId)
      .eq('section', section)
      .single(),
  ]);

  return buildAnalyticsContext(topicPerf, weakTopics, recentMistakes, sectionProgress);
}
```

### Token Budget (Updated with Analytics)

| Component | Tokens |
|-----------|--------|
| System prompt | ~200 |
| **Analytics context** | **~150-250** |
| Question/scenario | ~150-400 |
| Answer + explanation | ~150-300 |
| Conversation history | ~200-400 |
| **Total** | **~850-1,550** |

Analytics adds ~150-250 tokens but significantly improves response personalization.

### Privacy Considerations

- Only summary metrics are sent to AI (not raw question history)
- No PII included in AI context
- Example of what IS sent: "45% accuracy on Leases, 12 attempts, weak mastery"
- Example of what is NOT sent: Full question text of past attempts, timestamps with timezone

---

## 5. Context System

### MCQ Context Structure

```typescript
interface MCQNavigatorContext {
  type: 'mcq';
  section: string;           // "FAR", "AUD", "REG", etc.
  topic: string;             // "Leases"
  subtopic?: string;         // "Finance Lease Classification"

  question: string;          // Full question text
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };

  // Only in review mode
  userAnswer?: 'A' | 'B' | 'C' | 'D';
  correctAnswer?: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  tip?: string;

  mode: 'practice' | 'review';
}
```

### TBS Context Structure

```typescript
interface TBSNavigatorContext {
  type: 'tbs';
  section: string;           // "FAR"
  tbsId: string;
  tbsTitle: string;          // "Finance Lease Recording"
  tbsType: string;           // "Journal Entry", "Reconciliation", etc.

  scenario: string;          // Main scenario (truncated if >500 chars)
  exhibits?: string[];       // Key exhibit summaries

  currentRequirement: string;
  requirementNumber: number;
  totalRequirements: number;

  // Only in review mode
  userResponse?: object;
  correctResponse?: object;
  score?: number;

  mode: 'practice' | 'review';
}
```

### Study Log Context Structure

```typescript
interface StudyLogNavigatorContext {
  type: 'study_log';
  attemptType: 'mcq' | 'tbs' | 'exam_simulation';
  attemptDate: string;

  // Include relevant MCQ or TBS context based on attemptType
  // Plus historical performance data if available
}
```

### Token Budget

| Component | MCQ (~800 tokens) | TBS (~1,200 tokens) |
|-----------|-------------------|---------------------|
| System prompt | ~200 | ~200 |
| Question/scenario | ~150-300 | ~400-800 |
| Options/requirements | ~100 | ~200 |
| Answer + explanation | ~150-300 | ~200-400 |
| Conversation history | ~200-400 | ~200-400 |

---

## 6. UI Design

### Floating Panel (TBS) - Based on ScratchPad Pattern

```
┌─────────────────────────────────────────┐
│ 🧭 Meridian Navigator          [−] [×] │  ← Draggable header
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ AI: How can I help you with     │   │  ← AI messages (left)
│  │ this problem?                   │   │
│  └─────────────────────────────────┘   │
│                                         │
│        ┌─────────────────────────┐     │
│        │ You: Can you walk me    │     │  ← User messages (right)
│        │ through the PV calc?    │     │
│        └─────────────────────────┘     │
│                                         │
├─────────────────────────────────────────┤
│ [Walk me through] [Why wrong?] [Hint]  │  ← Quick action chips
├─────────────────────────────────────────┤
│ ┌─────────────────────────────┐ [Send] │  ← Input area
│ │ Type your question...       │        │
│ └─────────────────────────────┘        │
├─────────────────────────────────────────┤
│ AI responses are for educational       │  ← Persistent disclaimer
│ purposes only. Verify with sources.    │
└─────────────────────────────────────────┘
```

**Panel Specifications:**
- Default size: 400w x 450h pixels
- Min size: 320w x 300h
- Max size: 600w x 80vh
- Draggable via header
- Resizable from all edges and corners
- Minimizable to header only
- Remembers position during session

### Inline Section (MCQ) - Based on QuestionReview Notes Pattern

```
┌─────────────────────────────────────────┐
│ Result & Explanation                    │
│ ...existing explanation content...      │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ 🧭 Ask Meridian Navigator    [Expand ▼]│  ← Collapsible header
├─────────────────────────────────────────┤
│                                         │
│ [Walk me through] [Why is B wrong?]    │  ← Quick action chips
│                                         │
│ ┌─────────────────────────────┐ [Ask]  │
│ │ Ask about this question...  │        │
│ └─────────────────────────────┘        │
│                                         │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ │
│                                         │
│  (Conversation appears here when        │
│   user asks a question)                 │
│                                         │
├─────────────────────────────────────────┤
│ AI responses are for educational use.  │  ← Compact disclaimer
└─────────────────────────────────────────┘
```

**Inline Specifications:**
- Collapsed by default with "Ask Meridian Navigator" trigger
- Expands inline without modal/popup
- Max height: 400px with scroll for longer conversations
- Follows existing Flag/Feedback button positioning

### Mobile Responsive

| Breakpoint | MCQ Inline | TBS Panel |
|------------|------------|-----------|
| Desktop (>1024px) | Full inline section | Floating draggable |
| Tablet (768-1024px) | Full inline section | Floating, smaller default (350w) |
| Mobile (<768px) | Full inline section | Bottom sheet drawer (100% width, 60vh max) |

### Icons

**Primary Navigator Icon (Compass):**
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <circle cx="12" cy="12" r="10" strokeWidth="2" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"
  />
</svg>
```

**Alternative (Chat bubble):**
```tsx
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
  />
</svg>
```

---

## 7. Theme Integration

### CSS Variables (from globals.css)

| Variable | Light Mode | Dark Mode | Navigator Usage |
|----------|------------|-----------|-----------------|
| `--background` | #ffffff | #0f172a | Chat area background |
| `--foreground` | #1a1a2e | #f1f5f9 | Text color |
| `--primary` | #1e3a5f | #3b82f6 | Navigator accent, send button |
| `--primary-light` | #2d5a87 | #60a5fa | Hover states |
| `--card` | #f8fafc | #1f2937 | Panel background, AI messages |
| `--card-hover` | #f1f5f9 | #374151 | Message hover state |
| `--border` | #e2e8f0 | #4b5563 | Panel borders, dividers |
| `--muted` | #64748b | #94a3b8 | Timestamps, secondary text |
| `--accent` | #0ea5e9 | #38bdf8 | Links, highlights |

### Navigator-Specific Colors

Following the pattern of ScratchPad (yellow theme), Navigator uses **blue/primary theme**:

```css
/* Navigator Header - Light Mode */
.navigator-header {
  @apply bg-blue-50 border-b border-blue-200;
}
.navigator-header-text {
  @apply text-blue-800;
}
.navigator-header-icon {
  @apply text-blue-600;
}

/* Navigator Header - Dark Mode */
.dark .navigator-header {
  @apply bg-blue-900/20 border-b border-blue-800;
}
.dark .navigator-header-text {
  @apply text-blue-200;
}
.dark .navigator-header-icon {
  @apply text-blue-400;
}
```

### Message Styling

```css
/* User messages */
.navigator-message-user {
  @apply bg-[var(--primary)] text-white rounded-2xl rounded-br-md;
}

/* AI messages */
.navigator-message-ai {
  @apply bg-[var(--card)] text-[var(--foreground)] rounded-2xl rounded-bl-md
         border border-[var(--border)];
}

/* Quick action chips */
.navigator-chip {
  @apply px-3 py-1.5 text-sm rounded-full border border-[var(--border)]
         bg-[var(--card)] text-[var(--foreground)]
         hover:bg-[var(--card-hover)] hover:border-[var(--primary)]
         transition-colors cursor-pointer;
}
```

### Animations (matching globals.css patterns)

```css
/* Message appear */
.navigator-message-enter {
  animation: fadeInUp 0.3s ease-out forwards;
}

/* Panel open */
.navigator-panel-enter {
  animation: fadeIn 0.2s ease-out forwards;
}

/* Typing indicator */
@keyframes navigatorTyping {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
  40% { transform: translateY(-4px); opacity: 1; }
}

.navigator-typing-dot {
  @apply w-2 h-2 rounded-full bg-[var(--muted)];
  animation: navigatorTyping 1.4s ease-in-out infinite;
}
.navigator-typing-dot:nth-child(2) { animation-delay: 0.2s; }
.navigator-typing-dot:nth-child(3) { animation-delay: 0.4s; }
```

---

## 8. Component Architecture

### File Structure

```
src/components/meridian-navigator/
├── MeridianNavigator.tsx         # Main orchestrator component
├── MeridianNavigatorButton.tsx   # Trigger button (header/inline)
├── MeridianNavigatorPanel.tsx    # Floating panel for TBS
├── MeridianNavigatorInline.tsx   # Inline section for MCQ
├── MeridianNavigatorSheet.tsx    # Mobile bottom sheet
├── MeridianChat.tsx              # Chat message list
├── MeridianMessage.tsx           # Individual message bubble
├── MeridianInput.tsx             # Text input + send button
├── MeridianQuickActions.tsx      # Suggestion chips
├── MeridianTypingIndicator.tsx   # "Thinking..." animation
├── MeridianDisclaimer.tsx        # Footer disclaimer
├── MeridianFirstUseModal.tsx     # Initial disclaimer modal
├── hooks/
│   ├── useMeridianContext.ts     # Build context from question/TBS
│   ├── useMeridianChat.ts        # Chat state & message management
│   └── useMeridianUsage.ts       # Track daily usage limits
├── lib/
│   ├── meridianApi.ts            # API client for /api/navigator
│   └── meridianTypes.ts          # TypeScript interfaces
└── index.ts                      # Public exports
```

### API Route

```
src/app/api/navigator/
└── route.ts                      # POST endpoint for Claude Haiku
```

### Component Hierarchy

```
<MeridianNavigator>
  ├── <MeridianFirstUseModal />        (shown once)
  │
  ├── [MCQ Context]
  │   └── <MeridianNavigatorInline>
  │       ├── <MeridianNavigatorButton />
  │       ├── <MeridianQuickActions />
  │       ├── <MeridianInput />
  │       ├── <MeridianChat>
  │       │   └── <MeridianMessage /> (multiple)
  │       └── <MeridianDisclaimer />
  │
  └── [TBS Context]
      └── <MeridianNavigatorPanel>     (or <MeridianNavigatorSheet> on mobile)
          ├── Header (draggable)
          ├── <MeridianChat>
          │   ├── <MeridianMessage /> (multiple)
          │   └── <MeridianTypingIndicator />
          ├── <MeridianQuickActions />
          ├── <MeridianInput />
          └── <MeridianDisclaimer />
```

---

## 9. Quick Actions

### Context-Aware Chip Generation

| Context | Mode | Quick Action Chips |
|---------|------|-------------------|
| MCQ Review (correct) | review | "Explain the concept", "What else should I know?", "Similar questions" |
| MCQ Review (incorrect) | review | "Walk me through this", "Why is [X] wrong?", "Explain the concept" |
| MCQ Practice | practice | "Give me a hint", "What concept applies here?" |
| TBS Review | review | "Walk me through this", "Explain requirement [N]", "What did I miss?" |
| TBS Practice | practice | "Give me a hint", "What should I focus on?", "Check my approach" |
| Study Log (MCQ) | review | "Summarize my mistake", "Related concepts", "Why did I get this wrong?" |
| Study Log (TBS) | review | "Review my approach", "What should I have done?", "Key takeaways" |
| Study Log (Exam) | review | "Analyze this question", "Pattern to remember" |

### Dynamic Chip Examples

For an incorrect MCQ where user selected B but correct was C:

```tsx
const chips = [
  "Walk me through this",
  "Why is B wrong?",           // Dynamic: uses user's answer
  "Explain the concept",
];
```

For TBS with multiple requirements, on requirement 3:

```tsx
const chips = [
  "Help with requirement 3",   // Dynamic: current requirement
  "What does the scenario tell us?",
  "Check my journal entry",
];
```

---

## 10. Cost Controls & Usage Limits

### Comprehensive Tier Limits

#### AI Feature Limits by Subscription Tier

| Feature | Free Tier | Standard ($79) | Pro ($149) |
|---------|-----------|----------------|------------|
| **Meridian Navigator** | Not available | 30 messages/day | 50 messages/day |
| **Study Guide Generator** | Not available | 1/month | 2/month |
| **Exam Simulation Debrief** | Not available | Unlimited | Unlimited |
| **Mistake-to-Flashcard** | Not available | 10/month | 20/month |
| **Weekly Progress Email** | Not available | Included | Included |
| **Pre-Exam Assessment** | Not available | 1 per scheduled exam | 1 per scheduled exam |

#### Reset Schedule

| Limit Type | Reset Timing |
|------------|--------------|
| Daily limits (Navigator) | Midnight UTC |
| Monthly limits (Study Guide, Flashcards) | 1st of each month |
| Per-exam limits (Pre-Exam Assessment) | Per unique exam scheduling |

### Rate Limiting (Technical)

| Control | Value | Implementation |
|---------|-------|----------------|
| Daily message limit | Per tier (see above) | Track in `ai_feature_usage` table |
| Per-request rate limit | 1 req / 5 seconds | Client-side throttle + server validation |
| Session history limit | 5 messages | Truncate older, optionally summarize |
| Context truncation | 500 chars max | Truncate long scenarios/exhibits |
| Concurrent requests | 1 per user | Queue additional requests |

### Limit Reached Behavior

#### Meridian Navigator (Daily Limit)

| Usage Level | UI State | Message |
|-------------|----------|---------|
| < 80% | Normal | No indicator |
| 80-90% | Subtle warning | "X messages remaining today" |
| 90-99% | Yellow warning | "X messages remaining" (highlighted) |
| 100% | Disabled | Input disabled, upgrade prompt shown |

**At limit message:**
```
You've used all 30 Navigator messages for today.
Messages reset at midnight UTC.

[Upgrade to Pro for 50/day] [Set reminder]
```

#### Monthly Features (Study Guide, Flashcards)

**At limit message:**
```
You've used your Study Guide generation for this month.
Your limit resets on [Date].

[Upgrade to Pro for 2/month] [View last generated guide]
```

#### Per-Exam Features (Pre-Exam Assessment)

**Already generated message:**
```
You've already generated a Pre-Exam Assessment for your
[Section] exam on [Date].

[View Assessment] [Schedule different exam date]
```

### Usage Tracking Implementation

```typescript
// Unified usage tracking for all AI features
interface AIFeatureUsage {
  userId: string;
  feature: 'navigator' | 'study_guide' | 'flashcard' | 'exam_debrief' | 'pre_exam';
  period: 'daily' | 'monthly' | 'per_exam';
  periodKey: string;  // "2026-01-14" for daily, "2026-01" for monthly, exam_id for per_exam
  usageCount: number;
  limit: number;
  tierLimit: number;  // Based on user's subscription
}

// Check if user can use feature
async function canUseFeature(
  userId: string,
  feature: AIFeatureType,
  examId?: string
): Promise<{ allowed: boolean; remaining: number; resetAt?: string }> {
  const tier = await getUserTier(userId);
  const limit = getFeatureLimit(feature, tier);
  const usage = await getCurrentUsage(userId, feature, examId);

  return {
    allowed: usage.count < limit,
    remaining: Math.max(0, limit - usage.count),
    resetAt: getResetTime(feature)
  };
}

// Increment usage after successful AI call
async function recordUsage(
  userId: string,
  feature: AIFeatureType,
  examId?: string
): Promise<void> {
  await upsertUsage(userId, feature, getPeriodKey(feature, examId));
}
```

### User Feedback UI Components

#### Usage Indicator (Navigator)
```
┌─────────────────────────────────────────┐
│ 🧭 Meridian Navigator     23/30 today  │
└─────────────────────────────────────────┘
```

#### Monthly Usage Dashboard
```
┌─────────────────────────────────────────┐
│ AI Features Usage (January 2026)        │
├─────────────────────────────────────────┤
│                                         │
│ Navigator Messages                      │
│ ████████████████████░░░░ 23/30 today   │
│                                         │
│ Study Guides                            │
│ ██████████░░░░░░░░░░░░░░ 1/1 this month│
│ ↳ Resets Feb 1                          │
│                                         │
│ Flashcard Generation                    │
│ ████████░░░░░░░░░░░░░░░░ 4/10 this mo. │
│                                         │
│ Pre-Exam Assessments                    │
│ ✓ FAR (Feb 15) - Generated              │
│ ○ AUD (Mar 20) - Available              │
│                                         │
│ [Upgrade to Pro for higher limits]      │
└─────────────────────────────────────────┘
```

### Upgrade Prompts

When user hits a limit, show contextual upgrade prompt:

**Navigator limit:**
> "Upgrade to Pro for 50 Navigator messages per day, plus 2 Study Guides per month and 20 AI-generated flashcards."

**Study Guide limit:**
> "Need another study guide? Pro members get 2 per month. Upgrade now to generate a fresh plan."

**Flashcard limit:**
> "Upgrade to Pro for 20 AI-generated flashcards per month - double the Standard limit."

### Grace Period (Optional Future Enhancement)

Consider implementing a small grace allowance for users who hit limits during critical study periods:

- 3 "emergency" Navigator messages per month (banked)
- Usable only after daily limit exhausted
- Resets monthly, doesn't accumulate

### Anti-Abuse Measures

| Measure | Implementation |
|---------|----------------|
| Request throttling | 1 request per 5 seconds minimum |
| Account sharing detection | Flag unusual usage patterns (multiple IPs, rapid location changes) |
| Content filtering | Block off-topic or abusive queries |
| Token limits | Cap individual responses at 1000 tokens |
| Session limits | Max 5 concurrent Navigator sessions |

---

## 11. Database Schema

### New Tables

```sql
-- Track user acknowledgment of AI feature disclaimers
ALTER TABLE users ADD COLUMN IF NOT EXISTS
  ai_disclaimer_acknowledged_at TIMESTAMP;

-- Unified AI feature usage tracking (all features)
CREATE TABLE ai_feature_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Feature identification
  feature VARCHAR(30) NOT NULL CHECK (feature IN (
    'navigator',
    'study_guide',
    'flashcard',
    'exam_debrief',
    'pre_exam_assessment',
    'weekly_email'
  )),

  -- Period tracking
  period_type VARCHAR(20) NOT NULL CHECK (period_type IN ('daily', 'monthly', 'per_exam')),
  period_key VARCHAR(50) NOT NULL,  -- "2026-01-14" for daily, "2026-01" for monthly, exam_id for per_exam

  -- Usage counts
  usage_count INTEGER DEFAULT 0,

  -- Metadata
  last_used_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(user_id, feature, period_type, period_key)
);

CREATE INDEX idx_ai_feature_usage_user
  ON ai_feature_usage(user_id, feature, period_type, period_key);

CREATE INDEX idx_ai_feature_usage_cleanup
  ON ai_feature_usage(period_type, period_key);

-- Helper function to check usage limits
CREATE OR REPLACE FUNCTION check_ai_feature_limit(
  p_user_id UUID,
  p_feature VARCHAR,
  p_tier VARCHAR
) RETURNS TABLE(allowed BOOLEAN, remaining INTEGER, limit_value INTEGER) AS $$
DECLARE
  v_limit INTEGER;
  v_period_type VARCHAR;
  v_period_key VARCHAR;
  v_current_usage INTEGER;
BEGIN
  -- Determine limits based on tier and feature
  SELECT
    CASE
      WHEN p_feature = 'navigator' AND p_tier = 'standard' THEN 30
      WHEN p_feature = 'navigator' AND p_tier = 'pro' THEN 50
      WHEN p_feature = 'study_guide' AND p_tier = 'standard' THEN 1
      WHEN p_feature = 'study_guide' AND p_tier = 'pro' THEN 2
      WHEN p_feature = 'flashcard' AND p_tier = 'standard' THEN 10
      WHEN p_feature = 'flashcard' AND p_tier = 'pro' THEN 20
      WHEN p_feature = 'pre_exam_assessment' THEN 1
      WHEN p_feature IN ('exam_debrief', 'weekly_email') THEN 9999  -- Unlimited
      ELSE 0
    END INTO v_limit;

  -- Determine period
  SELECT
    CASE
      WHEN p_feature = 'navigator' THEN 'daily'
      WHEN p_feature IN ('study_guide', 'flashcard') THEN 'monthly'
      WHEN p_feature = 'pre_exam_assessment' THEN 'per_exam'
      ELSE 'daily'
    END INTO v_period_type;

  -- Get period key
  SELECT
    CASE
      WHEN v_period_type = 'daily' THEN TO_CHAR(NOW(), 'YYYY-MM-DD')
      WHEN v_period_type = 'monthly' THEN TO_CHAR(NOW(), 'YYYY-MM')
      ELSE 'unlimited'
    END INTO v_period_key;

  -- Get current usage
  SELECT COALESCE(usage_count, 0) INTO v_current_usage
  FROM ai_feature_usage
  WHERE user_id = p_user_id
    AND feature = p_feature
    AND period_type = v_period_type
    AND period_key = v_period_key;

  RETURN QUERY SELECT
    v_current_usage < v_limit,
    GREATEST(0, v_limit - v_current_usage),
    v_limit;
END;
$$ LANGUAGE plpgsql;

-- Legacy table (keep for backward compatibility during migration)
CREATE TABLE IF NOT EXISTS navigator_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  usage_date DATE NOT NULL,
  message_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, usage_date)
);

CREATE INDEX IF NOT EXISTS idx_navigator_usage_user_date
  ON navigator_usage(user_id, usage_date);

-- Store conversation logs (90-day retention)
CREATE TABLE navigator_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID NOT NULL,

  -- Message data
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,

  -- Context snapshot
  context_type VARCHAR(20) NOT NULL, -- 'mcq', 'tbs', 'study_log'
  context_mode VARCHAR(20) NOT NULL, -- 'practice', 'review'
  question_id VARCHAR(100),
  section VARCHAR(10),
  topic VARCHAR(100),

  -- Metadata
  tokens_used INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_navigator_conversations_user
  ON navigator_conversations(user_id, created_at DESC);

CREATE INDEX idx_navigator_conversations_session
  ON navigator_conversations(session_id, created_at);

-- Auto-cleanup function (run daily via cron/Supabase)
-- DELETE FROM navigator_conversations
-- WHERE created_at < NOW() - INTERVAL '90 days';
```

### Exam Simulation Storage (for Study Log review)

```sql
-- Ensure exam attempts are stored for later Navigator review
CREATE TABLE IF NOT EXISTS exam_simulation_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  section VARCHAR(10) NOT NULL,

  -- Questions and answers (JSONB for flexibility)
  mcq_attempts JSONB NOT NULL DEFAULT '[]',
  tbs_attempts JSONB DEFAULT '[]',

  -- Scores
  mcq_score INTEGER,
  mcq_total INTEGER,
  tbs_score INTEGER,
  tbs_total INTEGER,
  total_score INTEGER,

  -- Timing
  time_limit_minutes INTEGER,
  time_used_seconds INTEGER,

  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_exam_attempts_user
  ON exam_simulation_attempts(user_id, completed_at DESC);
```

---

## 12. Additional AI Features

Beyond Meridian Navigator, these AI-powered features enhance the study experience.

### 12.1 Automated Study Guide Generator

**Purpose:** Creates personalized, prioritized study plans based on performance data.

**Data Inputs:**
- `user_topic_performance` - Weak areas, mastery levels
- `section_progress` - Exam date, target section
- AICPA blueprint weights
- User's available study hours (input at generation)

**Output Format:**
```
YOUR PERSONALIZED [SECTION] STUDY GUIDE
Generated: [Date]
Exam Date: [Date] ([X] days away)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CURRENT STATUS
Prime Meridian Score: [X]/80 recommended
Coverage: [X]% of AICPA blueprint areas practiced

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIORITY 1 - FOCUS AREAS (This Week)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📍 [Topic Name]
   Current accuracy: [X]% | AICPA weight: [X-X]%
   Mastery level: [weak/moderate]

   Key concepts to review:
   • [Concept 1]
   • [Concept 2]
   • [Concept 3]

   Recommended practice: [X] MCQs, [X] TBS
   Suggested time: [X] hours

[Additional topics...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIORITY 2 - REINFORCE (Next Week)
[Similar format...]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STRONG AREAS (Maintain)
✓ [Topic] - [X]% accuracy
✓ [Topic] - [X]% accuracy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This study guide is based on your current performance data and AICPA
blueprint weightings. Actual exam content may vary. Success depends
on individual effort and circumstances beyond measured preparation.
```

**Usage Limits:**
- Standard: 1 generation per month
- Pro: 2 generations per month

**API Endpoint:** `POST /api/ai/study-guide`

---

### 12.2 Exam Simulation Debrief

**Purpose:** AI-powered analysis of mock exam performance.

**Trigger:** Automatically generated after completing any exam simulation.

**Data Inputs:**
- `exam_simulation_history` - Full MCQ and TBS responses
- Per-question time spent
- Topic/content area mapping
- Historical performance for comparison

**Output Format:**
```
EXAM SIMULATION DEBRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section: [SECTION]
Date: [Date]
Score: [X]% | Time: [X]h [X]m

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERFORMANCE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MCQ: [X]/[Y] correct ([Z]%)
TBS: [X]/[Y] points ([Z]%)

Compared to your average: [↑/↓] [X]%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Areas of Strength:
✓ [Topic] - [X]/[Y] correct
✓ [Topic] - Strong performance on [TBS type]

Areas for Additional Practice:
⚠ [Topic] - [X]/[Y] correct ([pattern observed])
⚠ [Topic] - Below benchmark accuracy

Time Management:
• Average time per MCQ: [X] minutes
• TBS time allocation: [observations]
• [Specific time-related feedback]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

RECOMMENDED FOCUS AREAS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. [Topic] - [specific recommendation]
2. [Topic] - [specific recommendation]
3. [Skill] - [specific recommendation]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This analysis reflects your simulation performance compared to
recommended benchmarks. Actual CPA exam results depend on many
factors including test-day conditions and question selection.
```

**Usage Limits:** Included with every exam simulation (no extra limit)

**API Endpoint:** `POST /api/ai/exam-debrief`

---

### 12.3 Mistake-to-Flashcard Generator

**Purpose:** Automatically creates flashcards from missed questions.

**Trigger:** User clicks "Generate Flashcard" on a missed question, or bulk generate from weak topics.

**Data Inputs:**
- Question text and correct answer
- User's incorrect answer
- Topic and subtopic
- Existing explanation

**Output Format:**
```typescript
interface GeneratedFlashcard {
  front: string;      // Question/prompt (concept extracted)
  back: string;       // Answer with explanation
  tags: string[];     // [section, topic, subtopic]
  sourceQuestionId: string;
  generatedAt: string;
}
```

**Example:**
```
FRONT:
When classifying a lease, what percentage of the asset's
economic life must the lease term represent for it to be
classified as a finance lease?

BACK:
75% or more

The lease term must be for 75% or more of the remaining
economic life of the underlying asset.

This is one of five criteria - meeting ANY ONE classifies
the lease as a finance lease:
1. Transfer of ownership
2. Purchase option reasonably certain
3. Lease term ≥ 75% of economic life ← THIS ONE
4. PV of payments ≥ 90% of fair value
5. Specialized asset with no alternative use

[Generated from FAR-L-023 | Leases > Classification]
```

**Usage Limits:**
- Standard: 10 flashcards per month
- Pro: 20 flashcards per month

**API Endpoint:** `POST /api/ai/generate-flashcard`

---

### 12.4 Weekly Progress Report (Email)

**Purpose:** Automated weekly email with AI-generated study insights.

**Trigger:** Automated, sent every Sunday evening (or user-configured day).

**Data Inputs:**
- `study_sessions` - Hours logged this week
- `practice_attempts` - Questions attempted, accuracy
- `profiles` - Streak data
- `section_progress` - Exam dates
- Week-over-week comparisons

**Output Format:**
```
Subject: Your CPA Study Week in Review 📊

Hey [Name]!

Here's your week in review (Jan 8-14):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 THIS WEEK'S NUMBERS
• Study time: 12.5 hours (↑ 3h from last week)
• Questions practiced: 156
• Overall accuracy: 71% (↑ 4%)
• Current streak: 7 days 🔥

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 WINS THIS WEEK
• Leases improved from 52% → 68%
• Completed 3 TBS simulations
• Maintained 7-day study streak

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📈 AREAS SHOWING PROGRESS
• Revenue Recognition: 65% → 72%
• Bonds & Liabilities: 58% → 63%

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚠️ RECOMMENDED FOCUS
Based on your recent practice:

1. Government & NFP (48% accuracy)
   High AICPA weight, currently below benchmark

2. Consolidations (55% accuracy)
   Consistent challenge area over past 2 weeks

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📅 LOOKING AHEAD
Your FAR exam is in 18 days.
Current Prime Meridian: 68/80 recommended

Focus suggestion: Prioritize Government & NFP
this week - it's 15-25% of the exam.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Keep up the momentum! Every hour of focused
practice builds toward your goal.

🧭 Your Meridian Navigator
CPA Exam Blueprint

[Unsubscribe] [Adjust email preferences]
```

**Usage Limits:** Free for all users (engagement feature)

**Email Service:** Resend or similar

**Cron Job:** Weekly on user's preferred day

---

### 12.5 Pre-Exam Readiness Assessment

**Purpose:** Comprehensive AI evaluation when exam date approaches.

**Trigger:**
- Automatically when exam is 14 days away
- User can request manually (1 per scheduled exam)

**Data Inputs:**
- All performance data for the section
- Prime Meridian score breakdown by content area
- Mock exam history
- Study hour trends
- AICPA blueprint coverage

**Output Format:**
```
PRE-EXAM READINESS ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section: FAR
Exam Date: February 15, 2026
Days Remaining: 14

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PREPARATION METRICS SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Prime Meridian Score: 74/80 recommended
AICPA Blueprint Coverage: 89%

| Content Area              | Weight | Your Score | Status    |
|---------------------------|--------|------------|-----------|
| Conceptual Framework      | 10-20% | 82%        | Strong    |
| Financial Stmt Accounts   | 25-35% | 76%        | On track  |
| Transactions              | 20-30% | 71%        | On track  |
| State & Local Government  | 5-15%  | 58%        | Below     |
| NFP Accounting            | 5-15%  | 52%        | Below     |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MOCK EXAM PERFORMANCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Recent simulations:
• Jan 12: 71% (↑ from 65% on Jan 5)
• Jan 5: 65%
• Dec 28: 62%

Trend: Positive improvement trajectory

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OBSERVATIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Strengths:
✓ Strong conceptual foundation
✓ Consistent improvement trend
✓ Good coverage of high-weight areas
✓ 23-day study streak shows commitment

Areas Below Benchmark:
⚠ Government & NFP combined (10-30% of exam)
  Current: 55% | Recommended: 70%+

⚠ This content area shows the largest gap
  between current performance and recommended levels

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OPTIONS TO CONSIDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

A) Intensive Focus (14 days)
   Dedicate 60%+ of remaining study time to
   Government & NFP content areas

B) Balanced Review
   Continue current approach with extra
   emphasis on weak areas

C) Additional Preparation Time
   If schedule allows, consider whether
   additional preparation time aligns with
   your personal goals

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The recommended benchmark before sitting for the exam
is a Prime Meridian score of 80. Your current score
of 74 indicates solid preparation with specific areas
that may benefit from additional focus.

This assessment reflects practice metrics compared to
recommended benchmarks. Actual exam performance depends
on many factors including test-day conditions, question
selection, and individual circumstances.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Generate Intensive Study Guide] [Dismiss]
```

**Usage Limits:** 1 per scheduled exam (auto-triggered at 14 days)

**API Endpoint:** `POST /api/ai/pre-exam-assessment`

---

### 12.6 Concept Connection Mapper (Navigator Integration)

**Purpose:** When explaining wrong answers, identify prerequisite concepts that may need review.

**Implementation:** Integrated into Meridian Navigator responses, not a separate feature.

**How It Works:**
- When user asks about a mistake, AI checks related topic performance
- If prerequisite topics are weak, AI mentions the connection

**Example Response:**
> "This bond amortization question requires understanding of present value calculations. Looking at your performance data, your Time Value of Money accuracy is 55%. Bond amortization builds directly on TVM concepts - strengthening that foundation may help with questions like this one."

**No separate limits** - part of Navigator conversation.

---

### Feature Summary Table

| Feature | Tier Limits | Trigger | Output |
|---------|-------------|---------|--------|
| **Meridian Navigator** | Std: 30/day, Pro: 50/day | User-initiated chat | Real-time chat |
| **Study Guide** | Std: 1/mo, Pro: 2/mo | User clicks "Generate" | Downloadable guide |
| **Exam Debrief** | Unlimited | Auto after simulation | In-app report |
| **Flashcard Gen** | Std: 10/mo, Pro: 20/mo | Per missed question | Saved to flashcards |
| **Weekly Email** | Free for all | Auto weekly | Email |
| **Pre-Exam Assessment** | 1 per exam | Auto at 14 days | In-app report |

---

## 13. Implementation Checklist

### Phase 1: Core Infrastructure

- [ ] Create `/api/navigator/route.ts` endpoint
- [ ] Set up Anthropic client with Haiku model
- [ ] Implement system prompt with mode handling
- [ ] Create `meridianTypes.ts` with all interfaces
- [ ] Create `meridianApi.ts` client

### Phase 2: Context System

- [ ] Implement `useMeridianContext.ts` hook
- [ ] MCQ context builder
- [ ] TBS context builder
- [ ] Study Log context builder
- [ ] Context truncation for long content

### Phase 3: Chat State Management

- [ ] Implement `useMeridianChat.ts` hook
- [ ] Message state management
- [ ] Conversation history (5 message limit)
- [ ] Streaming response handling (if supported)
- [ ] Error state handling

### Phase 4: Usage & Rate Limiting

- [ ] Create `navigator_usage` table
- [ ] Implement `useMeridianUsage.ts` hook
- [ ] Daily limit checking
- [ ] Usage increment on success
- [ ] UI feedback for limits

### Phase 5: UI Components

- [ ] `MeridianMessage.tsx` - message bubbles
- [ ] `MeridianTypingIndicator.tsx` - loading state
- [ ] `MeridianInput.tsx` - text input + send
- [ ] `MeridianQuickActions.tsx` - suggestion chips
- [ ] `MeridianDisclaimer.tsx` - footer warning
- [ ] `MeridianChat.tsx` - message list container

### Phase 6: Layout Components

- [ ] `MeridianNavigatorInline.tsx` - MCQ inline section
- [ ] `MeridianNavigatorPanel.tsx` - TBS floating panel
- [ ] `MeridianNavigatorSheet.tsx` - mobile bottom sheet
- [ ] `MeridianNavigatorButton.tsx` - trigger buttons
- [ ] `MeridianFirstUseModal.tsx` - disclaimer modal

### Phase 7: Integration

- [ ] Add to `QuestionReview.tsx` (MCQ)
- [ ] Add to TBS review flow
- [ ] Add to Study Log review
- [ ] Block during Exam Simulation
- [ ] Add header button for TBS (next to Calculator)

### Phase 8: Polish

- [ ] Dark mode testing
- [ ] Mobile responsive testing
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Screen reader accessibility (ARIA)
- [ ] Animation refinement
- [ ] Error boundary wrapper

### Phase 9: Legal & Compliance

- [ ] Implement first-use disclaimer modal
- [ ] Add persistent footer disclaimer
- [ ] Update Terms of Service (see AI-CHATBOT-LEGAL-DISCLAIMERS.md)
- [ ] Update Privacy Policy
- [ ] Conversation logging with 90-day retention

### Phase 10: Testing & Launch (Navigator)

- [ ] Unit tests for context builders
- [ ] Integration tests for API route
- [ ] Manual testing across all contexts
- [ ] Beta user testing (30 msg/day limit)
- [ ] Monitor costs and adjust limits
- [ ] Gradual rollout by subscription tier

### Phase 11: Additional AI Features

- [ ] **Study Guide Generator**
  - [ ] Create `/api/ai/study-guide/route.ts`
  - [ ] Build study guide generation prompt
  - [ ] Create UI for guide generation and display
  - [ ] Implement monthly usage tracking
  - [ ] Add download/export functionality

- [ ] **Exam Simulation Debrief**
  - [ ] Create `/api/ai/exam-debrief/route.ts`
  - [ ] Build debrief analysis prompt
  - [ ] Integrate into exam results flow
  - [ ] Create debrief display component

- [ ] **Mistake-to-Flashcard Generator**
  - [ ] Create `/api/ai/generate-flashcard/route.ts`
  - [ ] Build flashcard extraction prompt
  - [ ] Add "Generate Flashcard" button to QuestionReview
  - [ ] Integrate with existing flashcard system
  - [ ] Implement monthly usage tracking

- [ ] **Weekly Progress Email**
  - [ ] Create `/api/ai/weekly-report/route.ts`
  - [ ] Build weekly summary prompt
  - [ ] Set up email template (Resend)
  - [ ] Create cron job for weekly sending
  - [ ] Add email preference settings

- [ ] **Pre-Exam Assessment**
  - [ ] Create `/api/ai/pre-exam-assessment/route.ts`
  - [ ] Build readiness evaluation prompt
  - [ ] Create assessment display component
  - [ ] Implement 14-day auto-trigger
  - [ ] Add "Generate Study Guide" CTA integration

### Phase 12: Usage Tracking & Limits

- [ ] Create `ai_feature_usage` table for all AI features
- [ ] Implement usage checking middleware
- [ ] Build usage dashboard component (show remaining)
- [ ] Add upgrade prompts when limits reached

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| Jan 2026 | 1.0 | Initial design specification |
| Jan 2026 | 2.0 | Added AI Communication Guidelines, Analytics Integration, Additional AI Features (Study Guide, Exam Debrief, Flashcard Gen, Weekly Email, Pre-Exam Assessment) |

---

## Related Documents

- [AI-CHATBOT-LEGAL-DISCLAIMERS.md](./AI-CHATBOT-LEGAL-DISCLAIMERS.md) - Legal language and policy addendums
- [DRAFT-TERMS-OF-SERVICE.md](./DRAFT-TERMS-OF-SERVICE.md) - Section 14.3 to be updated
- [DRAFT-PRIVACY-POLICY.md](./DRAFT-PRIVACY-POLICY.md) - AI data handling sections to add
