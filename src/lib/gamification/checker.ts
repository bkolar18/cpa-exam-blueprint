// Achievement and Badge Checking Logic
import { createClient } from '@/lib/supabase/client';
import type {
  Badge,
  Achievement,
  UserBadge,
  UserAchievement,
  AchievementCheckContext,
  AchievementNotification,
  SectionCode,
  RECOMMENDED_HOURS,
} from './types';

// Get all badges from database
export async function getAllBadges(): Promise<Badge[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('badges')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching badges:', error);
    return [];
  }

  return data || [];
}

// Get all achievements from database
export async function getAllAchievements(): Promise<Achievement[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .order('sort_order');

  if (error) {
    console.error('Error fetching achievements:', error);
    return [];
  }

  // Debug: log hidden achievements
  const hiddenCount = (data || []).filter(a => a.is_hidden === true).length;
  console.log(`[Achievements] Total: ${data?.length}, Hidden: ${hiddenCount}`);

  return data || [];
}

// Get user's badges with progress
export async function getUserBadges(userId: string): Promise<UserBadge[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('user_badges')
    .select('*, badge:badges(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user badges:', error);
    return [];
  }

  return data || [];
}

// Get user's achievements
export async function getUserAchievements(userId: string): Promise<UserAchievement[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('user_achievements')
    .select('*, achievement:achievements(*)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching user achievements:', error);
    return [];
  }

  return data || [];
}

// Calculate study hours per section for a user
export async function getUserStudyHours(userId: string): Promise<Record<SectionCode, number>> {
  const supabase = createClient();
  if (!supabase) return {} as Record<SectionCode, number>;

  const { data, error } = await supabase
    .from('study_sessions')
    .select('section, hours')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching study hours:', error);
    return {} as Record<SectionCode, number>;
  }

  const hours: Record<string, number> = {};
  (data || []).forEach((session) => {
    hours[session.section] = (hours[session.section] || 0) + Number(session.hours);
  });

  return hours as Record<SectionCode, number>;
}

// Get total study hours for a user
export async function getTotalStudyHours(userId: string): Promise<number> {
  const hours = await getUserStudyHours(userId);
  return Object.values(hours).reduce((sum, h) => sum + h, 0);
}

// Check and update badge progress
export async function updateBadgeProgress(
  userId: string,
  section?: SectionCode
): Promise<AchievementNotification[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const notifications: AchievementNotification[] = [];
  const hours = await getUserStudyHours(userId);
  const badges = await getAllBadges();
  const userBadges = await getUserBadges(userId);

  // Filter badges by section if provided
  const relevantBadges = section
    ? badges.filter((b) => b.requirement_section === section)
    : badges.filter((b) => b.category === 'study_hours');

  for (const badge of relevantBadges) {
    const userBadge = userBadges.find((ub) => ub.badge_id === badge.id);
    const sectionHours = badge.requirement_section
      ? hours[badge.requirement_section] || 0
      : 0;
    const requiredHours = badge.requirement_value || 0;
    const progress = Math.min(100, (sectionHours / requiredHours) * 100);
    const isEarned = progress >= 100;

    if (userBadge) {
      // Update existing badge progress
      if (!userBadge.earned_at && isEarned) {
        // Badge newly earned!
        const { error } = await supabase
          .from('user_badges')
          .update({
            progress: 100,
            earned_at: new Date().toISOString(),
          })
          .eq('id', userBadge.id);

        if (!error) {
          notifications.push({
            type: 'badge',
            item: badge,
            pointsEarned: badge.points,
            isHidden: false,
          });
        }
      } else if (progress > userBadge.progress) {
        // Update progress
        await supabase
          .from('user_badges')
          .update({ progress })
          .eq('id', userBadge.id);
      }
    } else {
      // Create new user badge entry
      const { error } = await supabase.from('user_badges').insert({
        user_id: userId,
        badge_id: badge.id,
        progress,
        earned_at: isEarned ? new Date().toISOString() : null,
      });

      if (!error && isEarned) {
        notifications.push({
          type: 'badge',
          item: badge,
          pointsEarned: badge.points,
          isHidden: false,
        });
      }
    }
  }

  return notifications;
}

// Check specific achievements based on context
export async function checkAchievements(
  context: AchievementCheckContext
): Promise<AchievementNotification[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const notifications: AchievementNotification[] = [];
  const achievements = await getAllAchievements();
  const userAchievements = await getUserAchievements(context.userId);
  const unlockedCodes = new Set(
    userAchievements.map((ua) => ua.achievement?.code).filter(Boolean)
  );

  // Helper to unlock an achievement
  const unlockAchievement = async (achievement: Achievement) => {
    if (unlockedCodes.has(achievement.code)) return;

    const { error } = await supabase.from('user_achievements').insert({
      user_id: context.userId,
      achievement_id: achievement.id,
      discovered: true,
    });

    if (!error) {
      unlockedCodes.add(achievement.code);
      notifications.push({
        type: 'achievement',
        item: achievement,
        pointsEarned: achievement.points,
        isHidden: achievement.is_hidden,
      });
    }
  };

  // Check achievements based on trigger
  switch (context.trigger) {
    case 'study_session': {
      // First session achievement
      const firstSession = achievements.find((a) => a.code === 'first_session');
      if (firstSession) {
        await unlockAchievement(firstSession);
      }

      // Check total hours achievements
      const totalHours = await getTotalStudyHours(context.userId);
      const hourAchievements = achievements.filter(
        (a) => a.category === 'study_hours' && a.requirement_type === 'hours'
      );
      for (const achievement of hourAchievements) {
        if (totalHours >= (achievement.requirement_value || 0)) {
          await unlockAchievement(achievement);
        }
      }

      // Check time-based hidden achievements
      if (context.sessionTime) {
        const hour = context.sessionTime.getHours();

        // Night Owl (10 PM - 2 AM)
        const nightOwl = achievements.find((a) => a.code === 'night_owl');
        if (nightOwl && (hour >= 22 || hour < 2)) {
          await unlockAchievement(nightOwl);
        }

        // Early Bird (5 AM - 7 AM)
        const earlyBird = achievements.find((a) => a.code === 'early_bird');
        if (earlyBird && hour >= 5 && hour < 7) {
          await unlockAchievement(earlyBird);
        }
      }

      // Check marathon achievement (8+ hours in a day)
      if (context.hours && context.hours >= 8) {
        const marathon = achievements.find((a) => a.code === 'marathon');
        if (marathon) {
          await unlockAchievement(marathon);
        }
      }

      // Check streak achievements
      const { data: profile } = await supabase
        .from('profiles')
        .select('current_streak')
        .eq('id', context.userId)
        .single();

      if (profile?.current_streak) {
        if (profile.current_streak >= 7) {
          const streak7 = achievements.find((a) => a.code === 'week_streak_7');
          if (streak7) await unlockAchievement(streak7);
        }
        if (profile.current_streak >= 30) {
          const streak30 = achievements.find((a) => a.code === 'week_streak_30');
          if (streak30) await unlockAchievement(streak30);
        }
      }

      // Update badge progress for section
      const badgeNotifications = await updateBadgeProgress(context.userId, context.section);
      notifications.push(...badgeNotifications);
      break;
    }

    case 'practice_session': {
      // Check accuracy achievements
      if (context.accuracy !== undefined && context.section) {
        const accuracyAchievements = achievements.filter(
          (a) =>
            a.category === 'accuracy' &&
            a.requirement_type === 'percentage' &&
            a.requirement_value &&
            context.accuracy! >= a.requirement_value
        );

        for (const achievement of accuracyAchievements) {
          const meta = achievement.requirement_metadata as { section?: string } | null;
          if (
            !meta?.section ||
            meta.section === context.section ||
            (meta.section === 'discipline' && ['TCP', 'BAR', 'ISC'].includes(context.section))
          ) {
            await unlockAchievement(achievement);
          }
        }
      }

      // Check speed demon achievement
      // (50 questions in under 30 min with 70%+ accuracy)
      // This would need duration context
      break;
    }

    case 'section_update': {
      // Get passed sections count
      const { data: sections } = await supabase
        .from('section_progress')
        .select('section')
        .eq('user_id', context.userId)
        .eq('status', 'passed');

      const passedCount = sections?.length || 0;

      const sectionAchievements = [
        { code: 'section_passed_1', count: 1 },
        { code: 'section_passed_2', count: 2 },
        { code: 'section_passed_3', count: 3 },
        { code: 'section_passed_all', count: 4 },
      ];

      for (const { code, count } of sectionAchievements) {
        if (passedCount >= count) {
          const achievement = achievements.find((a) => a.code === code);
          if (achievement) await unlockAchievement(achievement);
        }
      }
      break;
    }

    case 'profile_update': {
      // Check profile complete achievement
      if (context.profileComplete) {
        const profileComplete = achievements.find((a) => a.code === 'profile_complete');
        if (profileComplete) await unlockAchievement(profileComplete);
      }

      // Check discipline chosen achievement
      if (context.disciplineChosen) {
        const disciplineChosen = achievements.find((a) => a.code === 'discipline_chosen');
        if (disciplineChosen) await unlockAchievement(disciplineChosen);
      }
      break;
    }

    case 'nts_add': {
      const ntsAdded = achievements.find((a) => a.code === 'nts_added');
      if (ntsAdded) await unlockAchievement(ntsAdded);
      break;
    }

    case 'login': {
      // Could check for streak maintenance here
      break;
    }
  }

  return notifications;
}

// Get user's gamification summary
export async function getGamificationSummary(userId: string) {
  const supabase = createClient();
  if (!supabase) return null;

  const [
    { data: profile },
    allBadges,
    allAchievements,
    userBadges,
    userAchievements,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('total_points, badge_count, achievement_count, current_streak, longest_streak')
      .eq('id', userId)
      .single(),
    getAllBadges(),
    getAllAchievements(),
    getUserBadges(userId),
    getUserAchievements(userId),
  ]);

  const earnedBadgeIds = new Set(
    userBadges.filter((ub) => ub.earned_at).map((ub) => ub.badge_id)
  );
  const unlockedAchievementIds = new Set(
    userAchievements.map((ua) => ua.achievement_id)
  );

  return {
    totalPoints: profile?.total_points || 0,
    currentStreak: profile?.current_streak || 0,
    longestStreak: profile?.longest_streak || 0,
    badges: {
      total: allBadges.length,
      earned: earnedBadgeIds.size,
      list: allBadges.map((badge) => ({
        ...badge,
        isEarned: earnedBadgeIds.has(badge.id),
        progress: userBadges.find((ub) => ub.badge_id === badge.id)?.progress || 0,
        earnedAt: userBadges.find((ub) => ub.badge_id === badge.id)?.earned_at,
      })),
    },
    achievements: {
      total: allAchievements.length,
      unlocked: unlockedAchievementIds.size,
      list: allAchievements.map((achievement) => {
        const userAchievement = userAchievements.find(
          (ua) => ua.achievement_id === achievement.id
        );
        const isUnlocked = !!userAchievement;
        const isDiscovered = userAchievement?.discovered ?? false;

        return {
          ...achievement,
          isUnlocked,
          unlockedAt: userAchievement?.unlocked_at,
          isDiscovered,
          displayName: isUnlocked || !achievement.is_hidden
            ? achievement.name
            : achievement.hidden_name,
          displayDescription: isUnlocked || !achievement.is_hidden
            ? achievement.description
            : achievement.hidden_description,
        };
      }),
    },
  };
}
