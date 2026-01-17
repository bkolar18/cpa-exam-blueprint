import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    // Verify admin status
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !isAdminEmail(user.email)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role client to bypass RLS
    const serviceClient = createServiceRoleClient();
    if (!serviceClient) {
      return NextResponse.json({ error: 'Service client unavailable' }, { status: 500 });
    }

    const { userId } = await params;
    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30d';

    // Calculate date range
    const now = new Date();
    let startDate: Date;
    switch (range) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
      default:
        startDate = new Date('2020-01-01');
    }

    // Get user profile
    const { data: profile, error: profileError } = await serviceClient
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get practice attempts
    const { data: practiceAttempts } = await serviceClient
      .from('practice_attempts')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    // Get TBS attempts
    const { data: tbsAttempts } = await serviceClient
      .from('tbs_attempts')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    // Get exam simulations
    const { data: examSimulations } = await serviceClient
      .from('exam_simulation_history')
      .select('*')
      .eq('user_id', userId)
      .gte('started_at', startDate.toISOString())
      .order('started_at', { ascending: false });

    // Get AI usage
    const { data: aiUsage } = await serviceClient
      .from('ai_usage_log')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString());

    // Get study progress
    const { data: studyProgress } = await serviceClient
      .from('study_progress')
      .select('*')
      .eq('user_id', userId);

    // Calculate MCQ stats
    const mcqStats = {
      totalAttempts: practiceAttempts?.length || 0,
      correctAnswers: practiceAttempts?.filter(a => a.is_correct).length || 0,
      accuracy: 0,
      totalTimeMinutes: 0,
      bySection: {} as Record<string, { attempts: number; correct: number; avgTime: number }>,
      recentActivity: [] as { date: string; count: number; correct: number }[]
    };

    if (mcqStats.totalAttempts > 0) {
      mcqStats.accuracy = Math.round((mcqStats.correctAnswers / mcqStats.totalAttempts) * 100);
      const totalTimeSeconds = practiceAttempts?.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0) || 0;
      mcqStats.totalTimeMinutes = Math.round(totalTimeSeconds / 60);

      // By section
      practiceAttempts?.forEach(a => {
        const section = a.section || 'Unknown';
        if (!mcqStats.bySection[section]) {
          mcqStats.bySection[section] = { attempts: 0, correct: 0, avgTime: 0 };
        }
        mcqStats.bySection[section].attempts++;
        if (a.is_correct) mcqStats.bySection[section].correct++;
        mcqStats.bySection[section].avgTime += a.time_spent_seconds || 0;
      });

      Object.keys(mcqStats.bySection).forEach(section => {
        const data = mcqStats.bySection[section];
        data.avgTime = data.attempts > 0 ? Math.round(data.avgTime / data.attempts) : 0;
      });

      // Recent activity (last 14 days)
      const recentMap = new Map<string, { count: number; correct: number }>();
      practiceAttempts?.forEach(a => {
        const date = new Date(a.created_at).toISOString().split('T')[0];
        const existing = recentMap.get(date) || { count: 0, correct: 0 };
        existing.count++;
        if (a.is_correct) existing.correct++;
        recentMap.set(date, existing);
      });
      mcqStats.recentActivity = Array.from(recentMap.entries())
        .map(([date, data]) => ({ date, ...data }))
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(-14);
    }

    // Calculate TBS stats
    const tbsStats = {
      totalAttempts: tbsAttempts?.length || 0,
      completedAttempts: tbsAttempts?.filter(a => a.is_complete).length || 0,
      averageScore: 0,
      totalTimeMinutes: 0,
      bySection: {} as Record<string, { attempts: number; avgScore: number; completed: number }>,
      byType: {} as Record<string, { attempts: number; avgScore: number }>
    };

    if (tbsStats.totalAttempts > 0) {
      const completedWithScores = tbsAttempts?.filter(a => a.is_complete && a.score_percentage !== null) || [];
      tbsStats.averageScore = completedWithScores.length > 0
        ? Math.round(completedWithScores.reduce((sum, a) => sum + (a.score_percentage || 0), 0) / completedWithScores.length)
        : 0;

      const totalTimeSeconds = tbsAttempts?.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0) || 0;
      tbsStats.totalTimeMinutes = Math.round(totalTimeSeconds / 60);

      // By section and type
      tbsAttempts?.forEach(a => {
        const section = a.section || 'Unknown';
        if (!tbsStats.bySection[section]) {
          tbsStats.bySection[section] = { attempts: 0, avgScore: 0, completed: 0 };
        }
        tbsStats.bySection[section].attempts++;
        if (a.is_complete && a.score_percentage !== null) {
          tbsStats.bySection[section].avgScore += a.score_percentage;
          tbsStats.bySection[section].completed++;
        }

        const tbsType = a.tbs_type || 'unknown';
        if (!tbsStats.byType[tbsType]) {
          tbsStats.byType[tbsType] = { attempts: 0, avgScore: 0 };
        }
        tbsStats.byType[tbsType].attempts++;
        if (a.is_complete && a.score_percentage !== null) {
          tbsStats.byType[tbsType].avgScore += a.score_percentage;
        }
      });

      Object.keys(tbsStats.bySection).forEach(section => {
        const data = tbsStats.bySection[section];
        data.avgScore = data.completed > 0 ? Math.round(data.avgScore / data.completed) : 0;
      });
    }

    // Calculate exam stats
    const examStats = {
      totalExams: examSimulations?.length || 0,
      completedExams: examSimulations?.filter(e => e.completed_at).length || 0,
      averageScore: 0,
      passingExams: 0,
      averageMCQScore: 0,
      averageTBSScore: 0,
      totalTimeMinutes: 0,
      bySection: {} as Record<string, { attempts: number; avgScore: number; passed: number }>,
      recentExams: [] as { date: string; section: string; score: number; passed: boolean }[]
    };

    if (examStats.totalExams > 0) {
      const completedWithScores = examSimulations?.filter(e => e.completed_at && e.total_score_percentage !== null) || [];
      examStats.averageScore = completedWithScores.length > 0
        ? Math.round(completedWithScores.reduce((sum, e) => sum + (e.total_score_percentage || 0), 0) / completedWithScores.length)
        : 0;

      examStats.passingExams = completedWithScores.filter(e => (e.total_score_percentage || 0) >= 75).length;

      const withMCQ = examSimulations?.filter(e => e.mcq_score_percentage !== null) || [];
      examStats.averageMCQScore = withMCQ.length > 0
        ? Math.round(withMCQ.reduce((sum, e) => sum + (e.mcq_score_percentage || 0), 0) / withMCQ.length)
        : 0;

      const withTBS = examSimulations?.filter(e => e.tbs_score_percentage !== null) || [];
      examStats.averageTBSScore = withTBS.length > 0
        ? Math.round(withTBS.reduce((sum, e) => sum + (e.tbs_score_percentage || 0), 0) / withTBS.length)
        : 0;

      const totalTimeSeconds = examSimulations?.reduce((sum, e) => sum + (e.time_spent_seconds || 0), 0) || 0;
      examStats.totalTimeMinutes = Math.round(totalTimeSeconds / 60);

      // By section
      examSimulations?.forEach(e => {
        const section = e.section || 'Unknown';
        if (!examStats.bySection[section]) {
          examStats.bySection[section] = { attempts: 0, avgScore: 0, passed: 0 };
        }
        examStats.bySection[section].attempts++;
        if (e.completed_at && e.total_score_percentage !== null) {
          examStats.bySection[section].avgScore += e.total_score_percentage;
          if (e.total_score_percentage >= 75) examStats.bySection[section].passed++;
        }
      });

      Object.keys(examStats.bySection).forEach(section => {
        const data = examStats.bySection[section];
        data.avgScore = data.attempts > 0 ? Math.round(data.avgScore / data.attempts) : 0;
      });

      // Recent exams
      examStats.recentExams = (completedWithScores || [])
        .slice(0, 10)
        .map(e => ({
          date: e.completed_at!,
          section: e.section,
          score: e.total_score_percentage || 0,
          passed: (e.total_score_percentage || 0) >= 75
        }));
    }

    // AI usage stats
    const aiStats = {
      totalUses: aiUsage?.length || 0,
      byFeature: {} as Record<string, number>
    };
    aiUsage?.forEach(a => {
      const feature = a.feature || 'unknown';
      aiStats.byFeature[feature] = (aiStats.byFeature[feature] || 0) + 1;
    });

    // Study progress summary
    const progressSummary = {
      sectionsStarted: studyProgress?.length || 0,
      totalTopicsCompleted: studyProgress?.reduce((sum, p) => sum + (p.topics_completed || 0), 0) || 0,
      overallProgress: 0
    };
    if (studyProgress && studyProgress.length > 0) {
      const totalProgress = studyProgress.reduce((sum, p) => sum + (p.progress_percentage || 0), 0);
      progressSummary.overallProgress = Math.round(totalProgress / studyProgress.length);
    }

    // Overall summary
    const summary = {
      totalStudyTimeMinutes: mcqStats.totalTimeMinutes + tbsStats.totalTimeMinutes + examStats.totalTimeMinutes,
      totalQuestionsPracticed: mcqStats.totalAttempts + tbsStats.totalAttempts,
      overallAccuracy: 0,
      strongestSection: '',
      weakestSection: '',
      activityLevel: 'inactive' as 'inactive' | 'low' | 'moderate' | 'high'
    };

    // Calculate overall accuracy across all question types
    const totalCorrect = mcqStats.correctAnswers + tbsStats.completedAttempts;
    const totalAttempted = mcqStats.totalAttempts + tbsStats.totalAttempts;
    summary.overallAccuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    // Find strongest/weakest sections
    const sectionScores: Record<string, { total: number; count: number }> = {};
    Object.entries(mcqStats.bySection).forEach(([section, data]) => {
      if (!sectionScores[section]) sectionScores[section] = { total: 0, count: 0 };
      if (data.attempts > 0) {
        sectionScores[section].total += (data.correct / data.attempts) * 100;
        sectionScores[section].count++;
      }
    });
    Object.entries(tbsStats.bySection).forEach(([section, data]) => {
      if (!sectionScores[section]) sectionScores[section] = { total: 0, count: 0 };
      if (data.avgScore > 0) {
        sectionScores[section].total += data.avgScore;
        sectionScores[section].count++;
      }
    });

    const sectionAverages = Object.entries(sectionScores)
      .filter(([_, data]) => data.count > 0)
      .map(([section, data]) => ({ section, avg: data.total / data.count }))
      .sort((a, b) => b.avg - a.avg);

    if (sectionAverages.length > 0) {
      summary.strongestSection = sectionAverages[0].section;
      summary.weakestSection = sectionAverages[sectionAverages.length - 1].section;
    }

    // Calculate activity level
    const recentDays = 7;
    const recentDate = new Date(now.getTime() - recentDays * 24 * 60 * 60 * 1000);
    const recentMCQ = practiceAttempts?.filter(a => new Date(a.created_at) >= recentDate).length || 0;
    const recentTBS = tbsAttempts?.filter(a => new Date(a.created_at) >= recentDate).length || 0;
    const recentActivity = recentMCQ + recentTBS;

    if (recentActivity === 0) summary.activityLevel = 'inactive';
    else if (recentActivity < 20) summary.activityLevel = 'low';
    else if (recentActivity < 50) summary.activityLevel = 'moderate';
    else summary.activityLevel = 'high';

    return NextResponse.json({
      user: {
        id: profile.id,
        email: profile.email,
        fullName: profile.full_name,
        createdAt: profile.created_at,
        subscriptionTier: profile.subscription_tier || 'free',
        currentStreak: profile.current_streak || 0,
        longestStreak: profile.longest_streak || 0
      },
      summary,
      mcqStats,
      tbsStats,
      examStats,
      aiStats,
      progressSummary,
      dateRange: { start: startDate.toISOString(), end: now.toISOString() }
    });
  } catch (error) {
    console.error('Error in user analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
