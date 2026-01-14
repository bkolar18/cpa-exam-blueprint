# AI Features - Beta Period Limits & Configuration

**Created:** January 2026
**Status:** Active Beta
**Beta End Date:** TBD (will transition to production limits)

---

## Overview

During the beta period, all AI features are available to **all users** (including free tier) with reduced usage limits. This allows us to:

1. Gather feedback from a broad user base
2. Monitor costs and usage patterns
3. Identify issues before full launch
4. Build user familiarity with AI features

After beta ends, features will transition to the tiered limits documented in `MERIDIAN-NAVIGATOR-DESIGN.md`.

---

## Beta Period Limits (All Users)

| Feature | Beta Limit | Post-Beta Free | Post-Beta Standard | Post-Beta Pro |
|---------|------------|----------------|-------------------|---------------|
| **Meridian Navigator** | 10/day | Not available | 30/day | 50/day |
| **Study Guide Generator** | 1/month | Not available | 1/month | 2/month |
| **Exam Simulation Debrief** | Unlimited | Not available | Unlimited | Unlimited |
| **Flashcard Generator** | 5/month | Not available | 10/month | 20/month |
| **Weekly Progress Email** | Included | Not available | Included | Included |
| **Pre-Exam Assessment** | 1/exam | Not available | 1/exam | 1/exam |

---

## Implementation

### Environment Variable

Set `IS_BETA_PERIOD=true` in your environment to enable beta limits.

When `IS_BETA_PERIOD` is not set or is `false`, production tier-based limits apply.

```env
# .env.local
IS_BETA_PERIOD=true
```

### Beta Limits Configuration

```typescript
// src/lib/ai/beta-limits.ts

export const IS_BETA = process.env.IS_BETA_PERIOD === 'true';

export const BETA_LIMITS = {
  navigator: 10,        // messages per day
  study_guide: 1,       // per month
  flashcard: 5,         // per month
  exam_debrief: 9999,   // unlimited
  pre_exam_assessment: 1, // per exam
  weekly_email: 1,      // per week (always 1)
};

export const PRODUCTION_LIMITS = {
  free: {
    navigator: 0,
    study_guide: 0,
    flashcard: 0,
    exam_debrief: 0,
    pre_exam_assessment: 0,
    weekly_email: 0,
  },
  standard: {
    navigator: 30,
    study_guide: 1,
    flashcard: 10,
    exam_debrief: 9999,
    pre_exam_assessment: 1,
    weekly_email: 1,
  },
  pro: {
    navigator: 50,
    study_guide: 2,
    flashcard: 20,
    exam_debrief: 9999,
    pre_exam_assessment: 1,
    weekly_email: 1,
  },
};

export function getFeatureLimit(
  feature: keyof typeof BETA_LIMITS,
  tier: 'free' | 'standard' | 'pro'
): number {
  if (IS_BETA) {
    return BETA_LIMITS[feature];
  }
  return PRODUCTION_LIMITS[tier][feature];
}

export function isFeatureAvailable(
  feature: keyof typeof BETA_LIMITS,
  tier: 'free' | 'standard' | 'pro'
): boolean {
  return getFeatureLimit(feature, tier) > 0;
}
```

---

## UI Indicators

### Beta Badge

During beta, show a "BETA" badge on AI features:

```tsx
<span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">
  Beta
</span>
```

### Pro Badge (Post-Beta)

After beta ends, show a "PRO" badge on features limited to paid tiers:

```tsx
<span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider
                 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded">
  Pro
</span>
```

### Feature Status Indicator

Show remaining usage prominently:

```tsx
// During beta
<span className="text-xs text-[var(--muted)]">
  Beta: 7/10 uses today
</span>

// Post-beta for paid users
<span className="text-xs text-[var(--muted)]">
  23/30 uses today
</span>

// Post-beta for free users (feature locked)
<span className="text-xs text-amber-600 dark:text-amber-400">
  Upgrade to unlock
</span>
```

---

## Beta Messaging

### First Use Modal (Beta Version)

```
Welcome to Meridian Navigator Beta!

During our beta period, you have access to all AI features
with the following limits:

• Navigator: 10 messages/day
• Study Guide: 1 generation/month
• Flashcards: 5 generations/month
• Exam Debrief: Unlimited
• Pre-Exam Assessment: 1 per exam

We'd love your feedback! Use the feedback button to share
your thoughts on these features.

[Got it, let's go!]
```

### Limit Reached (Beta)

```
You've reached today's beta limit (10/10 messages).

Your limit resets at midnight UTC.

During beta, all users share the same limits. After launch,
upgrade to Pro for 50 messages/day!

[Upgrade to Pro] [Set Reminder]
```

---

## Cost Monitoring

### Estimated Beta Costs

| Scenario | Daily Users | Avg Uses/User | Daily Cost |
|----------|-------------|---------------|------------|
| Light | 100 | 3 | ~$0.30 |
| Medium | 500 | 5 | ~$2.50 |
| Heavy | 1000 | 8 | ~$8.00 |

### Cost Alerts

Set up alerts in your monitoring system:
- Warning: Daily AI costs > $25
- Critical: Daily AI costs > $50

---

## Transition Plan

### Pre-Launch Checklist

- [ ] Announce beta end date 2 weeks in advance
- [ ] Email users about upcoming limit changes
- [ ] Update UI to show "Pro" badges
- [ ] Set `IS_BETA_PERIOD=false`
- [ ] Monitor for user complaints/confusion
- [ ] Have customer support ready for upgrade questions

### Messaging for Transition

```
Beta is ending soon!

Starting [DATE], AI features will require a paid subscription:

• Free: No AI features
• Standard ($79): Navigator (30/day), Study Guide (1/mo), and more
• Pro ($149): Navigator (50/day), Study Guide (2/mo), and more

Lock in your subscription now to keep using the features you love!

[View Plans] [Learn More]
```

---

## Feedback Collection

During beta, prompt for feedback:

1. After 5th Navigator message: "How helpful was Navigator today?"
2. After Study Guide: "Did this guide help your study planning?"
3. After Exam Debrief: "Was this analysis actionable?"

Store feedback in `ai_feature_feedback` table for analysis.

---

## API Routes Implementation

All AI feature API routes are located in `/src/app/api/ai/` and follow a consistent pattern:

### Route Files

| Route | File | Description |
|-------|------|-------------|
| `/api/navigator` | `route.ts` | AI study tutor chat (practice/review modes) |
| `/api/ai/study-guide` | `route.ts` | Personalized study plan generator |
| `/api/ai/generate-flashcard` | `route.ts` | Auto-generate flashcards from missed questions |
| `/api/ai/exam-debrief` | `route.ts` | Post-simulation AI analysis |
| `/api/ai/pre-exam-assessment` | `route.ts` | Comprehensive readiness evaluation |
| `/api/ai/weekly-report` | `route.ts` | Weekly progress email (with cron support) |

### Standard Response Pattern

All AI routes return the following fields:

```typescript
{
  success: true,
  // ... feature-specific data ...
  isBeta: boolean,        // Whether beta mode is active
  usage?: {
    used: number,         // Current period usage count
    limit: number,        // Maximum allowed
    remaining: number,    // Remaining uses
  },
  generatedAt: string,    // ISO timestamp
}
```

### Error Responses

| Status | Scenario |
|--------|----------|
| 401 | Authentication required |
| 403 | Feature not available for tier (with `upgrade: true`) |
| 429 | Usage limit reached (with `resetDate`) |
| 500 | Server/AI service error |

---

## Dashboard UI Component

### AIFeaturesCard Component

Location: `/src/components/dashboard/AIFeaturesCard.tsx`

A visually prominent card showing all 6 AI features with:

- Gradient header with AI icon and Beta badge
- Beta notice explaining free access during beta
- 3-column grid of feature cards
- Each feature shows:
  - Icon with category color
  - Name and description
  - Usage limit badge
  - Pro badge (when not in beta)
- Footer with Claude AI attribution

### Integration

```tsx
// In dashboard page
import AIFeaturesCard from "@/components/dashboard/AIFeaturesCard";

// Usage
<AIFeaturesCard isBeta={true} />
```

### Navigator Chat Beta Badge

The `NavigatorChat` component (`/src/components/navigator/NavigatorChat.tsx`) displays:

- "BETA" badge next to the title
- Current usage: "X/Y remaining"
- Mode indicator (Hint Mode / Review Mode)

---

## Database Schema

### ai_feature_usage Table

Tracks all AI feature usage:

```sql
CREATE TABLE ai_feature_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  feature VARCHAR(50) NOT NULL,        -- 'navigator', 'study_guide', etc.
  period_type VARCHAR(20) NOT NULL,    -- 'daily', 'monthly', 'weekly', 'per_exam'
  period_key VARCHAR(50) NOT NULL,     -- '2026-01-14', '2026-01', 'FAR_2026-03-15'
  usage_count INTEGER DEFAULT 0,
  last_used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, feature, period_type, period_key)
);
```

### Period Types by Feature

| Feature | Period Type | Period Key Format | Example |
|---------|-------------|-------------------|---------|
| Navigator | daily | `YYYY-MM-DD` | `2026-01-14` |
| Study Guide | monthly | `YYYY-MM` | `2026-01` |
| Flashcard | monthly | `YYYY-MM` | `2026-01` |
| Exam Debrief | daily | `YYYY-MM-DD` | `2026-01-14` |
| Pre-Exam Assessment | per_exam | `SECTION_DATE` | `FAR_2026-03-15` |
| Weekly Email | weekly | `YYYY-WXX` | `2026-W03` |

---

## AI Model Configuration

All AI features use Claude 3.5 Haiku for cost efficiency:

```typescript
const anthropic = new Anthropic();
const response = await anthropic.messages.create({
  model: 'claude-3-5-haiku-20241022',
  max_tokens: 1024,  // Varies by feature
  system: systemPrompt,
  messages: [{ role: 'user', content: userMessage }],
});
```

### Token Limits by Feature

| Feature | Max Tokens | Typical Response |
|---------|------------|------------------|
| Navigator | 1024 | 200-400 words |
| Study Guide | 2000 | 500-800 words |
| Flashcard | 600 | JSON object |
| Exam Debrief | 1500 | 400-600 words |
| Pre-Exam Assessment | 1800 | 500-700 words |
| Weekly Email | 800 | 200-300 words |

---

## Testing Beta Features

### Manual Testing

1. Set `IS_BETA_PERIOD=true` in `.env.local`
2. Sign in as any user (including free tier)
3. Navigate to dashboard - verify AI Features card shows Beta badge
4. Use Navigator - verify Beta badge and usage counter
5. Generate a Study Guide - verify 1/month limit applies
6. Set `IS_BETA_PERIOD=false` - verify Pro badges appear and free tier is locked out

### Automated Testing

```typescript
// Example test for beta limits
import { getFeatureLimit, isFeatureAvailable } from '@/lib/ai/beta-limits';

describe('Beta Limits', () => {
  it('returns beta limits when IS_BETA is true', () => {
    process.env.IS_BETA_PERIOD = 'true';
    expect(getFeatureLimit('navigator', 'free')).toBe(10);
  });

  it('returns 0 for free tier when not in beta', () => {
    process.env.IS_BETA_PERIOD = 'false';
    expect(getFeatureLimit('navigator', 'free')).toBe(0);
  });
});
```

---

## Related Documents

- [MERIDIAN-NAVIGATOR-DESIGN.md](./MERIDIAN-NAVIGATOR-DESIGN.md) - Full feature specification
- [AI-CHATBOT-LEGAL-DISCLAIMERS.md](./AI-CHATBOT-LEGAL-DISCLAIMERS.md) - Legal requirements
