import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

interface ExamSimulation {
  id: string;
  user_id: string;
  section: string;
  exam_type: string;
  started_at: string;
  completed_at: string | null;
  mcq_count: number;
  mcq_correct: number;
  mcq_score_percentage: number | null;
  tbs_count: number;
  tbs_score_percentage: number | null;
  total_score_percentage: number | null;
  time_limit_seconds: number;
  time_spent_seconds: number;
}

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get('range') || '30d';
    const userId = searchParams.get('userId'); // Optional: filter by specific user

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

    // Build query for exam simulations
    let query = serviceClient
      .from('exam_simulation_history')
      .select('id, user_id, section, exam_type, started_at, completed_at, mcq_count, mcq_correct, mcq_score_percentage, tbs_count, tbs_score_percentage, total_score_percentage, time_limit_seconds, time_spent_seconds')
      .gte('started_at', startDate.toISOString())
      .order('started_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: exams, error } = await query;

    if (error) {
      console.error('Error fetching exam simulations:', error);
      return NextResponse.json({ error: 'Failed to fetch exam data' }, { status: 500 });
    }

    if (!exams || exams.length === 0) {
      return NextResponse.json({
        totalExams: 0,
        completedExams: 0,
        completionRate: 0,
        averageScore: 0,
        averageMCQScore: 0,
        averageTBSScore: 0,
        averageTimeMinutes: 0,
        bySection: [],
        byExamType: [],
        scoreDistribution: [],
        passingRate: 0,
        overTime: [],
        performanceTrend: [],
        message: 'No exam simulations recorded yet'
      });
    }

    // Calculate metrics
    const totalExams = exams.length;
    const completedExams = exams.filter(e => e.completed_at !== null).length;
    const completionRate = totalExams > 0 ? Math.round((completedExams / totalExams) * 100) : 0;

    // Average scores (only from completed exams with scores)
    const completedWithScores = exams.filter(e => e.completed_at && e.total_score_percentage !== null);
    const averageScore = completedWithScores.length > 0
      ? Math.round(completedWithScores.reduce((sum, e) => sum + (e.total_score_percentage || 0), 0) / completedWithScores.length)
      : 0;

    // Average MCQ score
    const withMCQScores = exams.filter(e => e.mcq_score_percentage !== null);
    const averageMCQScore = withMCQScores.length > 0
      ? Math.round(withMCQScores.reduce((sum, e) => sum + (e.mcq_score_percentage || 0), 0) / withMCQScores.length)
      : 0;

    // Average TBS score
    const withTBSScores = exams.filter(e => e.tbs_score_percentage !== null);
    const averageTBSScore = withTBSScores.length > 0
      ? Math.round(withTBSScores.reduce((sum, e) => sum + (e.tbs_score_percentage || 0), 0) / withTBSScores.length)
      : 0;

    // Average time (in minutes)
    const completedWithTime = exams.filter(e => e.completed_at && e.time_spent_seconds > 0);
    const averageTimeMinutes = completedWithTime.length > 0
      ? Math.round(completedWithTime.reduce((sum, e) => sum + e.time_spent_seconds, 0) / completedWithTime.length / 60)
      : 0;

    // Passing rate (75% is typical CPA passing threshold)
    const passingExams = completedWithScores.filter(e => (e.total_score_percentage || 0) >= 75).length;
    const passingRate = completedWithScores.length > 0
      ? Math.round((passingExams / completedWithScores.length) * 100)
      : 0;

    // By Section
    const sectionMap = new Map<string, { attempts: number; totalScore: number; completed: number; passed: number }>();
    exams.forEach(e => {
      const section = e.section || 'Unknown';
      const existing = sectionMap.get(section) || { attempts: 0, totalScore: 0, completed: 0, passed: 0 };
      existing.attempts++;
      if (e.completed_at && e.total_score_percentage !== null) {
        existing.totalScore += e.total_score_percentage;
        existing.completed++;
        if (e.total_score_percentage >= 75) existing.passed++;
      }
      sectionMap.set(section, existing);
    });
    const bySection = Array.from(sectionMap.entries()).map(([section, data]) => ({
      section,
      attempts: data.attempts,
      avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0,
      completionRate: Math.round((data.completed / data.attempts) * 100),
      passingRate: data.completed > 0 ? Math.round((data.passed / data.completed) * 100) : 0
    })).sort((a, b) => b.attempts - a.attempts);

    // By Exam Type
    const typeMap = new Map<string, { attempts: number; totalScore: number; completed: number; avgTime: number; timeCount: number }>();
    exams.forEach(e => {
      const examType = e.exam_type || 'unknown';
      const existing = typeMap.get(examType) || { attempts: 0, totalScore: 0, completed: 0, avgTime: 0, timeCount: 0 };
      existing.attempts++;
      if (e.completed_at && e.total_score_percentage !== null) {
        existing.totalScore += e.total_score_percentage;
        existing.completed++;
      }
      if (e.time_spent_seconds > 0) {
        existing.avgTime += e.time_spent_seconds;
        existing.timeCount++;
      }
      typeMap.set(examType, existing);
    });
    const byExamType = Array.from(typeMap.entries()).map(([examType, data]) => ({
      examType,
      displayName: examType === 'mini' ? 'Mini Exam' : examType === 'mixed' ? 'Mixed Practice' : examType === 'realistic' ? 'Full Simulation' : examType,
      attempts: data.attempts,
      avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0,
      avgTimeMinutes: data.timeCount > 0 ? Math.round(data.avgTime / data.timeCount / 60) : 0
    })).sort((a, b) => b.attempts - a.attempts);

    // Score Distribution (buckets)
    const scoreDistribution = [
      { bucket: '0-50%', count: 0, label: 'Needs Improvement' },
      { bucket: '51-60%', count: 0, label: 'Below Passing' },
      { bucket: '61-74%', count: 0, label: 'Near Passing' },
      { bucket: '75-80%', count: 0, label: 'Passing' },
      { bucket: '81-90%', count: 0, label: 'Good' },
      { bucket: '91-100%', count: 0, label: 'Excellent' },
    ];
    completedWithScores.forEach(e => {
      const score = e.total_score_percentage || 0;
      if (score <= 50) scoreDistribution[0].count++;
      else if (score <= 60) scoreDistribution[1].count++;
      else if (score <= 74) scoreDistribution[2].count++;
      else if (score <= 80) scoreDistribution[3].count++;
      else if (score <= 90) scoreDistribution[4].count++;
      else scoreDistribution[5].count++;
    });

    // Over Time (daily aggregation for charts)
    const dateMap = new Map<string, { count: number; totalScore: number; completed: number }>();
    exams.forEach(e => {
      const date = new Date(e.started_at).toISOString().split('T')[0];
      const existing = dateMap.get(date) || { count: 0, totalScore: 0, completed: 0 };
      existing.count++;
      if (e.completed_at && e.total_score_percentage !== null) {
        existing.totalScore += e.total_score_percentage;
        existing.completed++;
      }
      dateMap.set(date, existing);
    });
    const overTime = Array.from(dateMap.entries())
      .map(([date, data]) => ({
        date,
        count: data.count,
        avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Performance Trend (weekly moving average)
    const performanceTrend: { week: string; avgScore: number; examCount: number }[] = [];
    const weeklyData = new Map<string, { totalScore: number; count: number }>();
    completedWithScores.forEach(e => {
      const date = new Date(e.completed_at!);
      const weekStart = new Date(date.setDate(date.getDate() - date.getDay()));
      const weekKey = weekStart.toISOString().split('T')[0];
      const existing = weeklyData.get(weekKey) || { totalScore: 0, count: 0 };
      existing.totalScore += e.total_score_percentage || 0;
      existing.count++;
      weeklyData.set(weekKey, existing);
    });
    Array.from(weeklyData.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .forEach(([week, data]) => {
        performanceTrend.push({
          week,
          avgScore: Math.round(data.totalScore / data.count),
          examCount: data.count
        });
      });

    // MCQ vs TBS comparison
    const mcqVsTbs = {
      mcqAverage: averageMCQScore,
      tbsAverage: averageTBSScore,
      difference: averageMCQScore - averageTBSScore,
      mcqStronger: averageMCQScore > averageTBSScore
    };

    return NextResponse.json({
      totalExams,
      completedExams,
      completionRate,
      averageScore,
      averageMCQScore,
      averageTBSScore,
      averageTimeMinutes,
      passingRate,
      bySection,
      byExamType,
      scoreDistribution,
      overTime,
      performanceTrend,
      mcqVsTbs,
    });
  } catch (error) {
    console.error('Error in exam analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
