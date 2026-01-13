// Gamification System Types

export type Tier = 'bronze' | 'silver' | 'gold' | 'platinum';
export type SectionCode = 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC';

export type BadgeCategory = 'study_hours' | 'practice' | 'section' | 'account' | 'tbs' | 'streak' | 'accuracy' | 'special';
export type AchievementCategory = 'practice' | 'account' | 'streak' | 'accuracy' | 'special' | 'speed' | 'section' | 'study_hours' | 'tbs';

export type RequirementType = 'hours' | 'percentage' | 'count' | 'boolean' | 'special' | 'time_range';

// Database table types
export interface Badge {
  id: string;
  code: string;
  name: string;
  description: string;
  category: BadgeCategory;
  tier: Tier;
  points: number;
  icon_name: string | null;
  requirement_type: RequirementType;
  requirement_value: number | null;
  requirement_section: SectionCode | null;
  sort_order: number;
  created_at: string;
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  hidden_name: string;
  description: string;
  hidden_description: string;
  category: AchievementCategory;
  tier: Tier;
  points: number;
  icon_name: string | null;
  is_hidden: boolean;
  requirement_type: RequirementType;
  requirement_value: number | null;
  requirement_metadata: Record<string, unknown> | null;
  sort_order: number;
  created_at: string;
}

export interface UserBadge {
  id: string;
  user_id: string;
  badge_id: string;
  earned_at: string | null;
  progress: number;
  created_at: string;
  // Joined data
  badge?: Badge;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  discovered: boolean;
  metadata: Record<string, unknown> | null;
  created_at: string;
  // Joined data
  achievement?: Achievement;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  section: SectionCode;
  started_at: string;
  ended_at: string | null;
  duration_minutes: number | null;
  questions_attempted: number;
  questions_correct: number;
  accuracy_percentage: number | null;
  study_session_id: string | null;
  created_at: string;
}

// Extended profile with gamification fields
export interface GamificationProfile {
  total_points: number;
  badge_count: number;
  achievement_count: number;
  current_streak: number;
  longest_streak: number;
  last_study_date: string | null;
}

// UI display types
export interface BadgeWithProgress extends Badge {
  userProgress: number; // 0-100
  isEarned: boolean;
  earnedAt: string | null;
}

export interface AchievementWithStatus extends Achievement {
  isUnlocked: boolean;
  unlockedAt: string | null;
  isDiscovered: boolean;
  // Display values (use hidden values if not discovered)
  displayName: string;
  displayDescription: string;
}

// Tier configuration
export const TIER_CONFIG: Record<Tier, { color: string; bgColor: string; borderColor: string; points: number }> = {
  bronze: {
    color: '#CD7F32',
    bgColor: 'rgba(205, 127, 50, 0.1)',
    borderColor: 'rgba(205, 127, 50, 0.3)',
    points: 15,
  },
  silver: {
    color: '#C0C0C0',
    bgColor: 'rgba(192, 192, 192, 0.1)',
    borderColor: 'rgba(192, 192, 192, 0.3)',
    points: 30,
  },
  gold: {
    color: '#FFD700',
    bgColor: 'rgba(255, 215, 0, 0.1)',
    borderColor: 'rgba(255, 215, 0, 0.3)',
    points: 90,
  },
  platinum: {
    color: '#E5E4E2',
    bgColor: 'rgba(229, 228, 226, 0.15)',
    borderColor: 'rgba(229, 228, 226, 0.4)',
    points: 300,
  },
};

// Recommended study hours per section
export const RECOMMENDED_HOURS: Record<SectionCode, number> = {
  FAR: 150,
  AUD: 100,
  REG: 100,
  TCP: 80,
  BAR: 100,
  ISC: 80,
};

// Achievement trigger types
export type AchievementTrigger =
  | 'study_session'
  | 'practice_session'
  | 'section_update'
  | 'profile_update'
  | 'nts_add'
  | 'login'
  | 'tbs_complete';

export interface AchievementCheckContext {
  trigger: AchievementTrigger;
  userId: string;
  section?: SectionCode;
  hours?: number;
  accuracy?: number;
  questionsCorrect?: number;
  questionsAttempted?: number;
  sessionTime?: Date;
  profileComplete?: boolean;
  disciplineChosen?: boolean;
  // TBS specific
  tbsScore?: number;
  tbsCompleteCount?: number;
  tbsType?: string;
  // Practice specific
  consecutiveCorrect?: number;
}

// Notification types
export interface BadgeAchievementNotification {
  type: 'badge' | 'achievement';
  item: Badge | Achievement;
  pointsEarned: number;
  isHidden: boolean;
}

export interface StreakNotification {
  type: 'streak';
  streakDays: number;
}

export type AchievementNotification = BadgeAchievementNotification | StreakNotification;
