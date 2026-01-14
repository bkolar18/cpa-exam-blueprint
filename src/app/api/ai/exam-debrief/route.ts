import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { IS_BETA, isFeatureAvailable, type SubscriptionTier } from '@/lib/ai/beta-limits';

interface ExamDebriefRequest {
  simulationId: string;
  section: string;
  mcqAttempts: Array<{
    questionId: string;
    topic: string;
    subtopic?: string;
    isCorrect: boolean;
    timeSpentSeconds?: number;
    difficulty?: string;
  }>;
  tbsAttempts?: Array<{
    tbsId: string;
    tbsType: string;
    topic: string;
    score: number;
    maxScore: number;
    timeSpentSeconds?: number;
  }>;
  totalTimeSeconds: number;
  timeLimitSeconds: number;
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    // Get authenticated user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Parse request body
    const body: ExamDebriefRequest = await request.json();
    const { simulationId, section, mcqAttempts, tbsAttempts, totalTimeSeconds, timeLimitSeconds } = body;

    if (!simulationId || !section || !mcqAttempts) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Get user's subscription tier - exam debrief is available for standard and pro
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;

    // Check if feature is available (always available in beta, tier-restricted otherwise)
    if (!isFeatureAvailable('exam_debrief', tier)) {
      return NextResponse.json({
        error: 'Exam Debrief is not available on the free tier',
        upgrade: true
      }, { status: 403 });
    }

    // Fetch user's historical performance for comparison
    const { data: historicalAttempts } = await supabase
      .from('practice_attempts')
      .select('topic, is_correct')
      .eq('user_id', user.id)
      .eq('section', section)
      .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

    // Calculate historical averages by topic
    const historicalByTopic: Record<string, { correct: number; total: number }> = {};
    (historicalAttempts || []).forEach(attempt => {
      if (!historicalByTopic[attempt.topic]) {
        historicalByTopic[attempt.topic] = { correct: 0, total: 0 };
      }
      historicalByTopic[attempt.topic].total++;
      if (attempt.is_correct) {
        historicalByTopic[attempt.topic].correct++;
      }
    });

    // Calculate MCQ statistics
    const mcqCorrect = mcqAttempts.filter(a => a.isCorrect).length;
    const mcqTotal = mcqAttempts.length;
    const mcqAccuracy = mcqTotal > 0 ? Math.round((mcqCorrect / mcqTotal) * 100) : 0;

    // Group MCQ by topic
    const mcqByTopic: Record<string, { correct: number; total: number; avgTime: number }> = {};
    mcqAttempts.forEach(attempt => {
      if (!mcqByTopic[attempt.topic]) {
        mcqByTopic[attempt.topic] = { correct: 0, total: 0, avgTime: 0 };
      }
      mcqByTopic[attempt.topic].total++;
      if (attempt.isCorrect) {
        mcqByTopic[attempt.topic].correct++;
      }
      if (attempt.timeSpentSeconds) {
        mcqByTopic[attempt.topic].avgTime += attempt.timeSpentSeconds;
      }
    });

    // Calculate average times
    Object.keys(mcqByTopic).forEach(topic => {
      if (mcqByTopic[topic].total > 0) {
        mcqByTopic[topic].avgTime = Math.round(mcqByTopic[topic].avgTime / mcqByTopic[topic].total);
      }
    });

    // Calculate TBS statistics
    let tbsEarned = 0;
    let tbsMax = 0;
    const tbsByType: Record<string, { earned: number; max: number; count: number }> = {};

    if (tbsAttempts && tbsAttempts.length > 0) {
      tbsAttempts.forEach(attempt => {
        tbsEarned += attempt.score;
        tbsMax += attempt.maxScore;
        if (!tbsByType[attempt.tbsType]) {
          tbsByType[attempt.tbsType] = { earned: 0, max: 0, count: 0 };
        }
        tbsByType[attempt.tbsType].earned += attempt.score;
        tbsByType[attempt.tbsType].max += attempt.maxScore;
        tbsByType[attempt.tbsType].count++;
      });
    }

    const tbsAccuracy = tbsMax > 0 ? Math.round((tbsEarned / tbsMax) * 100) : 0;

    // Calculate time metrics
    const avgTimePerMcq = mcqTotal > 0
      ? Math.round(mcqAttempts.reduce((sum, a) => sum + (a.timeSpentSeconds || 0), 0) / mcqTotal)
      : 0;
    const timeUsedPercent = timeLimitSeconds > 0
      ? Math.round((totalTimeSeconds / timeLimitSeconds) * 100)
      : 0;

    // Build the prompt
    const systemPrompt = `You are Meridian Navigator, an AI exam debrief analyst for CPA exam simulations. Analyze the exam performance data and provide actionable insights.

CRITICAL LANGUAGE RULES:
1. NEVER guarantee or predict actual CPA exam outcomes
2. NEVER say "you're ready" or "you're not ready"
3. ALWAYS frame feedback in terms of preparation metrics and benchmarks
4. Use "recommended benchmark" instead of "passing score"
5. Focus on specific, actionable improvements

Structure your debrief as follows:

EXAM SIMULATION DEBRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section: [SECTION]
Date: [Date]
Score: [X]% | Time: [X]h [X]m

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PERFORMANCE SUMMARY
[MCQ and TBS scores with comparison to averages]

KEY OBSERVATIONS
[Specific strengths and areas needing work]

TIME MANAGEMENT ANALYSIS
[How time was used across sections]

RECOMMENDED FOCUS AREAS
[2-3 specific, prioritized recommendations]

Include the disclaimer at the end about exam outcomes.`;

    const userMessage = `Analyze this exam simulation performance:

OVERVIEW:
- Section: ${section}
- MCQ Score: ${mcqCorrect}/${mcqTotal} (${mcqAccuracy}%)
- TBS Score: ${tbsEarned}/${tbsMax} (${tbsAccuracy}%)
- Time Used: ${Math.floor(totalTimeSeconds / 60)} minutes of ${Math.floor(timeLimitSeconds / 60)} allowed (${timeUsedPercent}%)
- Average Time per MCQ: ${avgTimePerMcq} seconds

MCQ PERFORMANCE BY TOPIC:
${Object.entries(mcqByTopic).map(([topic, stats]) => {
  const accuracy = Math.round((stats.correct / stats.total) * 100);
  const historicalAcc = historicalByTopic[topic]
    ? Math.round((historicalByTopic[topic].correct / historicalByTopic[topic].total) * 100)
    : null;
  const comparison = historicalAcc !== null
    ? `(vs ${historicalAcc}% historical)`
    : '';
  return `- ${topic}: ${stats.correct}/${stats.total} (${accuracy}%) ${comparison}`;
}).join('\n')}

${tbsAttempts && tbsAttempts.length > 0 ? `
TBS PERFORMANCE BY TYPE:
${Object.entries(tbsByType).map(([type, stats]) => {
  const accuracy = Math.round((stats.earned / stats.max) * 100);
  return `- ${type}: ${stats.earned}/${stats.max} points (${accuracy}%), ${stats.count} simulation(s)`;
}).join('\n')}
` : 'No TBS simulations in this exam.'}

Generate a comprehensive debrief with specific, actionable insights.`;

    // Call Claude API
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract text content
    const debriefContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Track usage (exam debrief is unlimited but we track for analytics)
    const today = new Date().toISOString().split('T')[0];
    await supabase
      .from('ai_feature_usage')
      .upsert({
        user_id: user.id,
        feature: 'exam_debrief',
        period_type: 'daily',
        period_key: today,
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,feature,period_type,period_key',
      });

    return NextResponse.json({
      success: true,
      debrief: debriefContent,
      summary: {
        section,
        simulationId,
        mcq: { correct: mcqCorrect, total: mcqTotal, accuracy: mcqAccuracy },
        tbs: tbsMax > 0 ? { earned: tbsEarned, max: tbsMax, accuracy: tbsAccuracy } : null,
        timeUsed: totalTimeSeconds,
        timeLimit: timeLimitSeconds,
      },
      isBeta: IS_BETA,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error generating exam debrief:', error);
    return NextResponse.json({ error: 'Failed to generate exam debrief' }, { status: 500 });
  }
}
