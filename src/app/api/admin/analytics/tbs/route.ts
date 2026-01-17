import { NextRequest, NextResponse } from 'next/server';
import { createClient, createServiceRoleClient } from '@/lib/supabase/server';

// Check if email is in admin list
function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
  return adminEmails.includes(email.toLowerCase());
}

interface TBSAttempt {
  id: string;
  user_id: string;
  tbs_id: string;
  section: string;
  tbs_type?: string;
  score_percentage: number | null;
  time_spent_seconds: number | null;
  is_complete: boolean;
  created_at: string;
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

    // Build query for TBS attempts
    let query = serviceClient
      .from('tbs_attempts')
      .select('id, user_id, tbs_id, section, tbs_type, score_percentage, time_spent_seconds, is_complete, created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: false });

    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data: attempts, error } = await query;

    if (error) {
      console.error('Error fetching TBS attempts:', error);
      return NextResponse.json({ error: 'Failed to fetch TBS data' }, { status: 500 });
    }

    if (!attempts || attempts.length === 0) {
      return NextResponse.json({
        totalAttempts: 0,
        completedAttempts: 0,
        completionRate: 0,
        averageScore: 0,
        averageTimeMinutes: 0,
        bySection: [],
        byType: [],
        popularTBS: [],
        scoreDistribution: [],
        topicPerformance: [],
        overTime: [],
        message: 'No TBS attempts recorded yet'
      });
    }

    // Calculate metrics
    const totalAttempts = attempts.length;
    const completedAttempts = attempts.filter(a => a.is_complete).length;
    const completionRate = totalAttempts > 0 ? Math.round((completedAttempts / totalAttempts) * 100) : 0;

    // Average score (only from completed attempts with scores)
    const completedWithScores = attempts.filter(a => a.is_complete && a.score_percentage !== null);
    const averageScore = completedWithScores.length > 0
      ? Math.round(completedWithScores.reduce((sum, a) => sum + (a.score_percentage || 0), 0) / completedWithScores.length)
      : 0;

    // Average time (in minutes)
    const attemptsWithTime = attempts.filter(a => a.time_spent_seconds !== null && a.time_spent_seconds > 0);
    const averageTimeMinutes = attemptsWithTime.length > 0
      ? Math.round(attemptsWithTime.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0) / attemptsWithTime.length / 60)
      : 0;

    // By Section
    const sectionMap = new Map<string, { attempts: number; totalScore: number; completed: number }>();
    attempts.forEach(a => {
      const section = a.section || 'Unknown';
      const existing = sectionMap.get(section) || { attempts: 0, totalScore: 0, completed: 0 };
      existing.attempts++;
      if (a.is_complete && a.score_percentage !== null) {
        existing.totalScore += a.score_percentage;
        existing.completed++;
      }
      sectionMap.set(section, existing);
    });
    const bySection = Array.from(sectionMap.entries()).map(([section, data]) => ({
      section,
      attempts: data.attempts,
      avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0,
      completionRate: Math.round((data.completed / data.attempts) * 100)
    })).sort((a, b) => b.attempts - a.attempts);

    // By Type (if tbs_type is available)
    const typeMap = new Map<string, { attempts: number; totalScore: number; completed: number }>();
    attempts.forEach(a => {
      const tbsType = a.tbs_type || inferTypeFromId(a.tbs_id);
      const existing = typeMap.get(tbsType) || { attempts: 0, totalScore: 0, completed: 0 };
      existing.attempts++;
      if (a.is_complete && a.score_percentage !== null) {
        existing.totalScore += a.score_percentage;
        existing.completed++;
      }
      typeMap.set(tbsType, existing);
    });
    const byType = Array.from(typeMap.entries()).map(([tbsType, data]) => ({
      tbsType,
      attempts: data.attempts,
      avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0
    })).sort((a, b) => b.attempts - a.attempts);

    // Popular TBS (top 10 most attempted)
    const tbsMap = new Map<string, { attempts: number; totalScore: number; completed: number }>();
    attempts.forEach(a => {
      const tbsId = a.tbs_id;
      const existing = tbsMap.get(tbsId) || { attempts: 0, totalScore: 0, completed: 0 };
      existing.attempts++;
      if (a.is_complete && a.score_percentage !== null) {
        existing.totalScore += a.score_percentage;
        existing.completed++;
      }
      tbsMap.set(tbsId, existing);
    });
    const popularTBS = Array.from(tbsMap.entries())
      .map(([tbsId, data]) => ({
        tbsId,
        attempts: data.attempts,
        avgScore: data.completed > 0 ? Math.round(data.totalScore / data.completed) : 0
      }))
      .sort((a, b) => b.attempts - a.attempts)
      .slice(0, 10);

    // Score Distribution (buckets)
    const scoreDistribution = [
      { bucket: '0-50%', count: 0 },
      { bucket: '51-60%', count: 0 },
      { bucket: '61-70%', count: 0 },
      { bucket: '71-80%', count: 0 },
      { bucket: '81-90%', count: 0 },
      { bucket: '91-100%', count: 0 },
    ];
    completedWithScores.forEach(a => {
      const score = a.score_percentage || 0;
      if (score <= 50) scoreDistribution[0].count++;
      else if (score <= 60) scoreDistribution[1].count++;
      else if (score <= 70) scoreDistribution[2].count++;
      else if (score <= 80) scoreDistribution[3].count++;
      else if (score <= 90) scoreDistribution[4].count++;
      else scoreDistribution[5].count++;
    });

    // Over Time (daily aggregation for charts)
    const dateMap = new Map<string, { count: number; totalScore: number; completed: number }>();
    attempts.forEach(a => {
      const date = new Date(a.created_at).toISOString().split('T')[0];
      const existing = dateMap.get(date) || { count: 0, totalScore: 0, completed: 0 };
      existing.count++;
      if (a.is_complete && a.score_percentage !== null) {
        existing.totalScore += a.score_percentage;
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

    // Weak/Strong Topics (based on section performance)
    const topicPerformance = bySection
      .filter(s => s.avgScore > 0)
      .map(s => ({
        topic: s.section,
        attempts: s.attempts,
        avgScore: s.avgScore,
        status: s.avgScore >= 75 ? 'strong' : s.avgScore >= 60 ? 'moderate' : 'weak'
      }));

    return NextResponse.json({
      totalAttempts,
      completedAttempts,
      completionRate,
      averageScore,
      averageTimeMinutes,
      bySection,
      byType,
      popularTBS,
      scoreDistribution,
      topicPerformance,
      overTime,
    });
  } catch (error) {
    console.error('Error in TBS analytics API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Helper to infer TBS type from ID if not stored
function inferTypeFromId(tbsId: string): string {
  // TBS IDs follow pattern like: tbs-far-001, tbs-aud-je-001
  const parts = tbsId.toLowerCase().split('-');
  if (parts.includes('je') || parts.includes('journal')) return 'journal_entry';
  if (parts.includes('doc') || parts.includes('document')) return 'document_review';
  if (parts.includes('recon') || parts.includes('reconciliation')) return 'reconciliation';
  if (parts.includes('drop') || parts.includes('dropdown')) return 'dropdown';
  if (parts.includes('num') || parts.includes('numeric')) return 'numeric_entry';
  return 'unknown';
}
