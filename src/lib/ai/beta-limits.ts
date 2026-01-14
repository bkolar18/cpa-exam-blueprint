/**
 * AI Features - Beta Period Limits Configuration
 *
 * During beta, all users (including free tier) have access to AI features
 * with reduced limits. After beta, features require paid subscriptions.
 */

export const IS_BETA = process.env.IS_BETA_PERIOD === 'true';

// Beta limits apply to ALL users during beta period
export const BETA_LIMITS = {
  navigator: 10,          // messages per day
  study_guide: 1,         // per month
  flashcard: 5,           // per month
  exam_debrief: 9999,     // unlimited
  pre_exam_assessment: 1, // per exam
  weekly_email: 1,        // per week
} as const;

// Production limits by subscription tier
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
} as const;

export type AIFeature = keyof typeof BETA_LIMITS;
export type SubscriptionTier = 'free' | 'standard' | 'pro';

/**
 * Get the usage limit for a feature based on beta status and user tier
 */
export function getFeatureLimit(
  feature: AIFeature,
  tier: SubscriptionTier = 'free'
): number {
  if (IS_BETA) {
    return BETA_LIMITS[feature];
  }
  return PRODUCTION_LIMITS[tier][feature];
}

/**
 * Check if a feature is available for a given tier
 */
export function isFeatureAvailable(
  feature: AIFeature,
  tier: SubscriptionTier = 'free'
): boolean {
  return getFeatureLimit(feature, tier) > 0;
}

/**
 * Check if user is in free tier and feature is locked (post-beta only)
 */
export function isFeatureLocked(
  feature: AIFeature,
  tier: SubscriptionTier = 'free'
): boolean {
  if (IS_BETA) return false;
  return tier === 'free' && PRODUCTION_LIMITS.free[feature] === 0;
}

/**
 * Get display text for feature limits
 */
export function getLimitDisplayText(
  feature: AIFeature,
  tier: SubscriptionTier = 'free'
): string {
  const limit = getFeatureLimit(feature, tier);

  if (limit === 0) return 'Upgrade to unlock';
  if (limit >= 9999) return 'Unlimited';

  switch (feature) {
    case 'navigator':
      return `${limit}/day`;
    case 'study_guide':
    case 'flashcard':
      return `${limit}/month`;
    case 'pre_exam_assessment':
      return '1/exam';
    case 'weekly_email':
      return 'Weekly';
    default:
      return `${limit}`;
  }
}

/**
 * Feature display names for UI
 */
export const FEATURE_DISPLAY_NAMES: Record<AIFeature, string> = {
  navigator: 'Meridian Navigator',
  study_guide: 'AI Study Guide',
  flashcard: 'Flashcard Generator',
  exam_debrief: 'Exam Debrief',
  pre_exam_assessment: 'Pre-Exam Assessment',
  weekly_email: 'Weekly Progress Email',
};

/**
 * Feature descriptions for UI
 */
export const FEATURE_DESCRIPTIONS: Record<AIFeature, string> = {
  navigator: 'AI-powered study tutor for questions and concepts',
  study_guide: 'Personalized study plans based on your performance',
  flashcard: 'Auto-generate flashcards from missed questions',
  exam_debrief: 'AI analysis of your exam simulation results',
  pre_exam_assessment: 'Comprehensive readiness evaluation before your exam',
  weekly_email: 'Weekly progress summary delivered to your inbox',
};

/**
 * Features that require Pro tier (post-beta)
 * These should show a "Pro" badge in the UI
 */
export const PRO_FEATURES: AIFeature[] = [
  'navigator',
  'study_guide',
  'flashcard',
  'exam_debrief',
  'pre_exam_assessment',
  'weekly_email',
];

/**
 * Check if a feature should show the Pro badge
 */
export function shouldShowProBadge(feature: AIFeature): boolean {
  // During beta, show Beta badge instead
  if (IS_BETA) return false;
  return PRO_FEATURES.includes(feature);
}

/**
 * Check if we should show Beta badge
 */
export function shouldShowBetaBadge(): boolean {
  return IS_BETA;
}
