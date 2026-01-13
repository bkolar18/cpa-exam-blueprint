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

// Get total practice questions answered by a user
export async function getTotalQuestionsAnswered(userId: string): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;

  const { count, error } = await supabase
    .from('practice_attempts')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching question count:', error);
    return 0;
  }

  return count || 0;
}

// Get practice questions answered per section
export async function getQuestionsPerSection(userId: string): Promise<Record<string, number>> {
  const supabase = createClient();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('practice_attempts')
    .select('section')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching section question counts:', error);
    return {};
  }

  const counts: Record<string, number> = {};
  (data || []).forEach((attempt) => {
    if (attempt.section) {
      counts[attempt.section] = (counts[attempt.section] || 0) + 1;
    }
  });

  return counts;
}

// Get unique practice questions answered correctly by a user
export async function getUniqueCorrectQuestions(userId: string): Promise<number> {
  const supabase = createClient();
  if (!supabase) return 0;

  const { data, error } = await supabase
    .from('practice_attempts')
    .select('question_id')
    .eq('user_id', userId)
    .eq('is_correct', true);

  if (error) {
    console.error('Error fetching correct questions:', error);
    return 0;
  }

  // Count unique question IDs
  const uniqueIds = new Set(data?.map(a => a.question_id) || []);
  return uniqueIds.size;
}

// Check and update badge progress for all badge types
export async function updateBadgeProgress(
  userId: string,
  section?: SectionCode,
  context?: {
    totalQuestions?: number;
    sectionQuestions?: Record<string, number>;
    currentStreak?: number;
    consecutiveCorrect?: number;
    studyHour?: number; // hour of day (0-23)
    isWeekend?: boolean;
  }
): Promise<AchievementNotification[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const notifications: AchievementNotification[] = [];
  const badges = await getAllBadges();
  const userBadges = await getUserBadges(userId);

  // Get data for progress calculation
  const hours = await getUserStudyHours(userId);
  const totalQuestions = context?.totalQuestions ?? await getTotalQuestionsAnswered(userId);
  const sectionQuestions = context?.sectionQuestions ?? await getQuestionsPerSection(userId);

  // Get streak from profile if not provided
  let currentStreak = context?.currentStreak;
  if (currentStreak === undefined) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('current_streak')
      .eq('id', userId)
      .single();
    currentStreak = profile?.current_streak || 0;
  }

  // Helper to calculate progress for a badge
  const calculateProgress = (badge: Badge): number => {
    const reqValue = badge.requirement_value || 0;
    if (reqValue === 0) return 0;

    switch (badge.category) {
      case 'study_hours':
        const sectionHours = badge.requirement_section
          ? hours[badge.requirement_section] || 0
          : Object.values(hours).reduce((sum, h) => sum + h, 0);
        return Math.min(100, (sectionHours / reqValue) * 100);

      case 'practice':
        // Check if it's a section-specific badge
        if (badge.requirement_section) {
          const sectionCount = sectionQuestions[badge.requirement_section] || 0;
          return Math.min(100, (sectionCount / reqValue) * 100);
        }
        // General practice question count
        return Math.min(100, (totalQuestions / reqValue) * 100);

      case 'streak':
        return Math.min(100, ((currentStreak || 0) / reqValue) * 100);

      case 'accuracy':
        // Consecutive correct - need context
        if (context?.consecutiveCorrect !== undefined) {
          return Math.min(100, (context.consecutiveCorrect / reqValue) * 100);
        }
        return 0;

      case 'special':
        // Time-based badges - check if condition met
        if (badge.code === 'early_bird' && context?.studyHour !== undefined) {
          return context.studyHour < 6 ? 100 : 0;
        }
        if (badge.code === 'night_owl' && context?.studyHour !== undefined) {
          return context.studyHour >= 22 ? 100 : 0;
        }
        if (badge.code === 'weekend_warrior' && context?.isWeekend) {
          return 100;
        }
        return 0;

      default:
        return 0;
    }
  };

  // Process all badges
  for (const badge of badges) {
    const userBadge = userBadges.find((ub) => ub.badge_id === badge.id);
    const progress = calculateProgress(badge);
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
      const firstSession = achievements.find((a) =>
        a.code === 'first_session' ||
        a.code === 'first_study' ||
        a.code === 'getting_started' ||
        (a.category === 'study_hours' && a.name && a.name.toLowerCase().includes('first'))
      );
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

      // Check marathon achievement (4+ hours in a day)
      if (context.hours && context.hours >= 4) {
        const marathon = achievements.find((a) => a.code === 'marathon' || a.code === 'marathon_runner');
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
        // 3-day streak
        if (profile.current_streak >= 3) {
          const streak3 = achievements.find((a) =>
            a.code === 'daily_dedication' ||
            (a.category === 'streak' && a.requirement_value === 3)
          );
          if (streak3) await unlockAchievement(streak3);
        }
        // 7-day streak
        if (profile.current_streak >= 7) {
          const streak7 = achievements.find((a) =>
            a.code === 'week_streak_7' ||
            a.code === 'week_warrior' ||
            a.code === 'dedicated' ||
            (a.category === 'streak' && a.requirement_value === 7)
          );
          if (streak7) await unlockAchievement(streak7);
        }
        // 30-day streak
        if (profile.current_streak >= 30) {
          const streak30 = achievements.find((a) =>
            a.code === 'week_streak_30' ||
            a.code === 'month_master' ||
            a.code === 'committed' ||
            (a.category === 'streak' && a.requirement_value === 30)
          );
          if (streak30) await unlockAchievement(streak30);
        }
      }

      // Update badge progress for section (including streak and time-based badges)
      const studyHour = context.sessionTime ? context.sessionTime.getHours() : new Date().getHours();
      const dayOfWeek = context.sessionTime ? context.sessionTime.getDay() : new Date().getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      const badgeNotifications = await updateBadgeProgress(
        context.userId,
        context.section,
        {
          currentStreak: profile?.current_streak,
          studyHour,
          isWeekend,
        }
      );
      notifications.push(...badgeNotifications);
      break;
    }

    case 'practice_session': {
      // Check question count achievements (e.g., "Warm Up" - answer 10 questions)
      const totalQuestions = await getTotalQuestionsAnswered(context.userId);

      // Find achievements by category 'practice' and requirement_type 'count'
      // This dynamically checks based on what's in the database rather than hardcoded codes
      const practiceCountAchievements = achievements.filter(
        (a) => a.category === 'practice' && a.requirement_type === 'count' && a.requirement_value
      );

      for (const achievement of practiceCountAchievements) {
        if (totalQuestions >= (achievement.requirement_value || 0)) {
          await unlockAchievement(achievement);
        }
      }

      // Also check by common code patterns as fallback
      const questionCountAchievements = [
        { code: 'warm_up', count: 10 },
        { code: 'warmup', count: 10 },
        { code: 'getting_started', count: 25 },
        { code: 'practice_makes_perfect', count: 50 },
        { code: 'question_crusher', count: 100 },
        { code: 'century_club', count: 100 },
        { code: 'question_machine', count: 250 },
        { code: 'practice_warrior', count: 500 },
        { code: 'question_master', count: 1000 },
      ];

      for (const { code, count } of questionCountAchievements) {
        if (totalQuestions >= count) {
          const achievement = achievements.find((a) => a.code === code);
          if (achievement) await unlockAchievement(achievement);
        }
      }

      // Check section explorer achievements (50 questions per section)
      const sectionCounts = await getQuestionsPerSection(context.userId);
      const sectionExplorerMap: Record<string, string[]> = {
        'FAR': ['far_explorer', 'FAR Explorer'],
        'AUD': ['aud_explorer', 'AUD Explorer'],
        'REG': ['reg_explorer', 'REG Explorer'],
        'TCP': ['tcp_explorer', 'TCP Explorer'],
        'BAR': ['bar_explorer', 'BAR Explorer'],
        'ISC': ['isc_explorer', 'ISC Explorer'],
      };

      for (const [section, identifiers] of Object.entries(sectionExplorerMap)) {
        const count = sectionCounts[section] || 0;
        if (count >= 50) {
          // Find achievement by code or name
          const explorer = achievements.find((a) =>
            identifiers.includes(a.code) ||
            identifiers.includes(a.name) ||
            (a.requirement_metadata as { section?: string } | null)?.section === section
          );
          if (explorer) await unlockAchievement(explorer);
        }
      }

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

      // Check perfect score achievement (100% in a session with 10+ questions)
      if (context.accuracy === 100 && context.questionsAttempted && context.questionsAttempted >= 10) {
        const perfectSession = achievements.find((a) => a.code === 'perfect_session');
        if (perfectSession) await unlockAchievement(perfectSession);
      }

      // Check first practice session achievement
      const firstPractice = achievements.find((a) =>
        a.code === 'first_practice' ||
        a.code === 'first_question' ||
        a.code === 'first_quiz' ||
        a.code === 'first_mcq' ||
        (a.category === 'practice' && a.name && a.name.toLowerCase().includes('first'))
      );
      if (firstPractice) {
        await unlockAchievement(firstPractice);
      }

      // Update badge progress for practice badges (reuse sectionCounts from above)
      const badgeNotifications = await updateBadgeProgress(
        context.userId,
        context.section,
        {
          totalQuestions,
          sectionQuestions: sectionCounts,
          consecutiveCorrect: context.consecutiveCorrect,
        }
      );
      notifications.push(...badgeNotifications);

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
        const profileComplete = achievements.find((a) =>
          a.code === 'profile_complete' ||
          a.code === 'complete_profile' ||
          a.code === 'profile_setup' ||
          (a.category === 'account' && a.name && a.name.toLowerCase().includes('profile'))
        );
        if (profileComplete) await unlockAchievement(profileComplete);
      }

      // Check discipline chosen achievement
      if (context.disciplineChosen) {
        const disciplineChosen = achievements.find((a) =>
          a.code === 'discipline_chosen' ||
          a.code === 'choose_discipline' ||
          a.code === 'discipline_selected' ||
          a.code === 'path_chosen' ||
          (a.category === 'account' && a.name && a.name.toLowerCase().includes('discipline'))
        );
        if (disciplineChosen) await unlockAchievement(disciplineChosen);
      }
      break;
    }

    case 'nts_add': {
      // Try multiple possible codes for NTS achievement
      const ntsAchievement = achievements.find((a) =>
        a.code === 'nts_added' ||
        a.code === 'nts_add' ||
        a.code === 'first_nts' ||
        a.code === 'add_nts' ||
        a.code === 'nts_tracker' ||
        (a.name && a.name.toLowerCase().includes('nts'))
      );
      if (ntsAchievement) await unlockAchievement(ntsAchievement);
      break;
    }

    case 'login': {
      // Could check for streak maintenance here
      break;
    }

    case 'tbs_complete': {
      // First TBS achievement
      const firstTBS = achievements.find((a) => a.code === 'first_tbs');
      if (firstTBS) {
        await unlockAchievement(firstTBS);
      }

      // Check TBS count achievements
      if (context.tbsCompleteCount !== undefined) {
        const tbsCountAchievements = [
          { code: 'tbs_complete_5', count: 5 },
          { code: 'tbs_complete_10', count: 10 },
          { code: 'tbs_complete_25', count: 25 },
          { code: 'tbs_complete_50', count: 50 },
        ];

        for (const { code, count } of tbsCountAchievements) {
          if (context.tbsCompleteCount >= count) {
            const achievement = achievements.find((a) => a.code === code);
            if (achievement) await unlockAchievement(achievement);
          }
        }
      }

      // Check TBS perfect score achievement (100%)
      if (context.tbsScore !== undefined && context.tbsScore >= 100) {
        const perfectTBS = achievements.find((a) => a.code === 'tbs_perfect');
        if (perfectTBS) await unlockAchievement(perfectTBS);
      }

      // Check TBS high score achievement (90%+)
      if (context.tbsScore !== undefined && context.tbsScore >= 90) {
        const highScoreTBS = achievements.find((a) => a.code === 'tbs_high_score');
        if (highScoreTBS) await unlockAchievement(highScoreTBS);
      }

      // Check TBS type-specific achievements
      if (context.tbsType && context.tbsScore !== undefined && context.tbsScore >= 80) {
        const typeAchievements: Record<string, string> = {
          'journal_entry': 'tbs_je_master',
          'document_review': 'tbs_doc_master',
          'numeric_entry': 'tbs_calc_master',
          'research': 'tbs_research_master',
        };

        const achievementCode = typeAchievements[context.tbsType];
        if (achievementCode) {
          const typeAchievement = achievements.find((a) => a.code === achievementCode);
          if (typeAchievement) await unlockAchievement(typeAchievement);
        }
      }
      break;
    }
  }

  return notifications;
}

// Get user's gamification summary
export async function getGamificationSummary(userId: string, disciplineChoice?: string | null) {
  // Discipline sections - filter out ones user didn't select
  const allDisciplines = ['TCP', 'BAR', 'ISC'];
  const excludedDisciplines = disciplineChoice
    ? allDisciplines.filter(d => d !== disciplineChoice)
    : []; // If no discipline chosen, show all
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

  // Filter badges - exclude ones for disciplines the user didn't select
  const filteredBadges = allBadges.filter((badge) => {
    if (!badge.requirement_section) return true;
    return !excludedDisciplines.includes(badge.requirement_section);
  });

  // Filter achievements - exclude ones for disciplines the user didn't select
  const filteredAchievements = allAchievements.filter((achievement) => {
    const meta = achievement.requirement_metadata as { section?: string } | null;
    if (!meta?.section) return true;
    // Handle discipline-specific achievements
    if (meta.section === 'discipline') return true; // Keep general discipline achievement
    return !excludedDisciplines.includes(meta.section);
  });

  return {
    totalPoints: profile?.total_points || 0,
    currentStreak: profile?.current_streak || 0,
    longestStreak: profile?.longest_streak || 0,
    badges: {
      total: filteredBadges.length,
      earned: filteredBadges.filter((b) => earnedBadgeIds.has(b.id)).length,
      list: filteredBadges.map((badge) => ({
        ...badge,
        isEarned: earnedBadgeIds.has(badge.id),
        progress: userBadges.find((ub) => ub.badge_id === badge.id)?.progress || 0,
        earnedAt: userBadges.find((ub) => ub.badge_id === badge.id)?.earned_at,
      })),
    },
    achievements: {
      total: filteredAchievements.length,
      unlocked: filteredAchievements.filter((a) => unlockedAchievementIds.has(a.id)).length,
      list: filteredAchievements.map((achievement) => {
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
          // Always show real name, even for hidden achievements
          displayName: achievement.name,
          // Hide description for hidden achievements until unlocked
          displayDescription: isUnlocked || !achievement.is_hidden
            ? achievement.description
            : '???',
        };
      }),
    },
  };
}
