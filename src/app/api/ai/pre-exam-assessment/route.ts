import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { isFeatureAvailable, type SubscriptionTier } from '@/lib/ai/beta-limits';

// Force dynamic to prevent caching
export const dynamic = 'force-dynamic';

function isBetaPeriod(): boolean {
  return process.env.IS_BETA_PERIOD === 'true';
}

// AICPA Blueprint content areas with weights
const BLUEPRINT_WEIGHTS: Record<string, Record<string, { weight: string; minWeight: number; maxWeight: number }>> = {
  FAR: {
    'Conceptual Framework': { weight: '10-20%', minWeight: 10, maxWeight: 20 },
    'Financial Statement Accounts': { weight: '25-35%', minWeight: 25, maxWeight: 35 },
    'Transactions': { weight: '20-30%', minWeight: 20, maxWeight: 30 },
    'State & Local Government': { weight: '5-15%', minWeight: 5, maxWeight: 15 },
    'NFP Accounting': { weight: '5-15%', minWeight: 5, maxWeight: 15 },
  },
  AUD: {
    'Ethics & Independence': { weight: '15-25%', minWeight: 15, maxWeight: 25 },
    'Assessing Risk': { weight: '20-30%', minWeight: 20, maxWeight: 30 },
    'Performing Procedures': { weight: '30-40%', minWeight: 30, maxWeight: 40 },
    'Forming Conclusions': { weight: '15-25%', minWeight: 15, maxWeight: 25 },
  },
  REG: {
    'Ethics & Responsibilities': { weight: '10-20%', minWeight: 10, maxWeight: 20 },
    'Business Law': { weight: '10-20%', minWeight: 10, maxWeight: 20 },
    'Federal Taxation': { weight: '55-75%', minWeight: 55, maxWeight: 75 },
  },
  TCP: {
    'Individual Taxation': { weight: '35-45%', minWeight: 35, maxWeight: 45 },
    'Entity Taxation': { weight: '30-40%', minWeight: 30, maxWeight: 40 },
    'Tax Planning': { weight: '20-30%', minWeight: 20, maxWeight: 30 },
  },
  BAR: {
    'Business Analysis': { weight: '40-50%', minWeight: 40, maxWeight: 50 },
    'Technical Accounting': { weight: '50-60%', minWeight: 50, maxWeight: 60 },
  },
  ISC: {
    'IT Governance': { weight: '20-30%', minWeight: 20, maxWeight: 30 },
    'Security & Data': { weight: '30-40%', minWeight: 30, maxWeight: 40 },
    'Systems & Technology': { weight: '35-45%', minWeight: 35, maxWeight: 45 },
  },
};

export async function POST(request: NextRequest) {
  const IS_BETA_NOW = isBetaPeriod();

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
    const body = await request.json();
    const { section } = body;

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;

    // Check if feature is available (always available in beta, tier-restricted otherwise)
    if (!isFeatureAvailable('pre_exam_assessment', tier)) {
      return NextResponse.json({
        error: 'Pre-Exam Assessment is not available on the free tier',
        upgrade: true
      }, { status: 403 });
    }

    // Get section progress including exam date
    const { data: sectionProgress } = await supabase
      .from('section_progress')
      .select('exam_date, prime_meridian_score, total_questions_attempted, status')
      .eq('user_id', user.id)
      .eq('section', section)
      .single();

    if (!sectionProgress?.exam_date) {
      return NextResponse.json({
        error: 'No exam date scheduled for this section. Please schedule your exam first.',
        needsExamDate: true
      }, { status: 400 });
    }

    const examDate = new Date(sectionProgress.exam_date);
    const daysUntilExam = Math.ceil((examDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

    // Check if assessment already generated for this exam date
    const examKey = `${section}_${sectionProgress.exam_date}`;
    const { data: existingUsage } = await supabase
      .from('ai_feature_usage')
      .select('usage_count')
      .eq('user_id', user.id)
      .eq('feature', 'pre_exam_assessment')
      .eq('period_type', 'per_exam')
      .eq('period_key', examKey)
      .single();

    if (existingUsage && existingUsage.usage_count > 0) {
      return NextResponse.json({
        error: 'You have already generated a Pre-Exam Assessment for this exam date',
        alreadyGenerated: true,
        examDate: sectionProgress.exam_date,
      }, { status: 429 });
    }

    // Fetch comprehensive performance data
    const [topicPerfResult, mockExamsResult, studyStreakResult, tbsPerfResult] = await Promise.all([
      // Topic performance
      supabase
        .from('user_topic_performance')
        .select('topic, accuracy_rate, total_attempted, mastery_level, avg_confidence')
        .eq('user_id', user.id)
        .eq('section', section),

      // Recent mock exams
      supabase
        .from('exam_simulation_history')
        .select('score, mcq_correct, mcq_total, tbs_score, tbs_max, completed_at')
        .eq('user_id', user.id)
        .eq('section', section)
        .order('completed_at', { ascending: false })
        .limit(5),

      // Study streak
      supabase
        .from('study_streaks')
        .select('current_streak, total_study_days')
        .eq('user_id', user.id)
        .single(),

      // TBS performance by type
      supabase
        .from('tbs_attempts')
        .select('tbs_type, percentage')
        .eq('user_id', user.id)
        .eq('section', section)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    const topicPerformance = topicPerfResult.data || [];
    const mockExams = mockExamsResult.data || [];
    const studyStreak = studyStreakResult.data;
    const tbsAttempts = tbsPerfResult.data || [];

    // Calculate content area coverage
    const blueprintAreas = BLUEPRINT_WEIGHTS[section] || {};
    const contentAreaScores: Record<string, { accuracy: number; attempted: number; weight: string }> = {};

    // Map topics to content areas (simplified mapping - in production, this would be more comprehensive)
    topicPerformance.forEach(topic => {
      // Find which content area this topic belongs to
      Object.entries(blueprintAreas).forEach(([area, data]) => {
        // Simple matching - in production, you'd have a proper topic-to-area mapping
        if (!contentAreaScores[area]) {
          contentAreaScores[area] = { accuracy: 0, attempted: 0, weight: data.weight };
        }
        // For now, distribute topics evenly (in production, map properly)
        contentAreaScores[area].accuracy += topic.accuracy_rate;
        contentAreaScores[area].attempted += topic.total_attempted;
      });
    });

    // Normalize content area scores
    const numAreas = Object.keys(blueprintAreas).length;
    Object.keys(contentAreaScores).forEach(area => {
      if (topicPerformance.length > 0) {
        contentAreaScores[area].accuracy = Math.round(contentAreaScores[area].accuracy / topicPerformance.length);
      }
    });

    // Calculate TBS performance by type
    const tbsByType: Record<string, { total: number; avgScore: number }> = {};
    tbsAttempts.forEach(attempt => {
      if (!tbsByType[attempt.tbs_type]) {
        tbsByType[attempt.tbs_type] = { total: 0, avgScore: 0 };
      }
      tbsByType[attempt.tbs_type].total++;
      tbsByType[attempt.tbs_type].avgScore += attempt.percentage;
    });
    Object.keys(tbsByType).forEach(type => {
      if (tbsByType[type].total > 0) {
        tbsByType[type].avgScore = Math.round(tbsByType[type].avgScore / tbsByType[type].total);
      }
    });

    // Calculate mock exam trend
    let mockExamTrend = 'stable';
    if (mockExams.length >= 2) {
      const recentAvg = mockExams.slice(0, 2).reduce((sum, e) => sum + e.score, 0) / 2;
      const olderAvg = mockExams.slice(2).reduce((sum, e) => sum + e.score, 0) / Math.max(1, mockExams.length - 2);
      if (recentAvg > olderAvg + 5) mockExamTrend = 'improving';
      else if (recentAvg < olderAvg - 5) mockExamTrend = 'declining';
    }

    // Build the prompt
    const systemPrompt = `You are Meridian Navigator, an AI pre-exam readiness assessment generator. Your role is to provide comprehensive, data-driven assessments of exam preparation status.

CRITICAL LANGUAGE RULES:
1. NEVER guarantee or predict exam outcomes (pass/fail)
2. NEVER say "you're ready" or "you're not ready" for the exam
3. ALWAYS frame feedback as "preparation metrics" and "benchmarks"
4. Reference "recommended Prime Meridian target of 80" not "passing"
5. Use phrases like "additional practice recommended" not "you'll fail if..."
6. Present OPTIONS for the student to consider, not directives

Structure your assessment as:

PRE-EXAM READINESS ASSESSMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Section: [SECTION]
Exam Date: [Date]
Days Remaining: [X]

PREPARATION METRICS SUMMARY
[Prime Meridian Score, Coverage %, Key metrics]

CONTENT AREA BREAKDOWN
[Table of AICPA content areas with scores and status]

MOCK EXAM PERFORMANCE
[Recent scores and trend]

OBSERVATIONS
[Specific strengths and areas below benchmark]

OPTIONS TO CONSIDER
[A/B/C choices for the student - intensive focus, balanced review, or schedule adjustment]

End with the standard disclaimer about exam outcomes.`;

    const userMessage = `Generate a Pre-Exam Readiness Assessment:

EXAM DETAILS:
- Section: ${section}
- Exam Date: ${sectionProgress.exam_date}
- Days Remaining: ${daysUntilExam}

CURRENT METRICS:
- Prime Meridian Score: ${sectionProgress.prime_meridian_score || 'Not yet calculated'}/80 recommended
- Total Questions Attempted: ${sectionProgress.total_questions_attempted || 0}
- Current Study Streak: ${studyStreak?.current_streak || 0} days

CONTENT AREA PERFORMANCE:
${Object.entries(contentAreaScores).map(([area, data]) => {
  const status = data.accuracy >= 75 ? 'Strong' : data.accuracy >= 60 ? 'On track' : 'Below benchmark';
  return `| ${area} | ${data.weight} | ${data.accuracy}% | ${status} |`;
}).join('\n')}

TOPIC-LEVEL BREAKDOWN:
${topicPerformance.slice(0, 15).map(t =>
  `- ${t.topic}: ${Math.round(t.accuracy_rate)}% accuracy (${t.total_attempted} attempts, ${t.mastery_level} mastery)`
).join('\n')}

MOCK EXAM HISTORY:
${mockExams.length > 0 ? mockExams.map((e, i) =>
  `- ${new Date(e.completed_at).toLocaleDateString()}: ${e.score}% (MCQ: ${e.mcq_correct}/${e.mcq_total}${e.tbs_max > 0 ? `, TBS: ${Math.round(e.tbs_score / e.tbs_max * 100)}%` : ''})`
).join('\n') : 'No mock exams completed yet'}
Trend: ${mockExamTrend}

TBS PERFORMANCE BY TYPE:
${Object.entries(tbsByType).length > 0 ? Object.entries(tbsByType).map(([type, data]) =>
  `- ${type}: ${data.avgScore}% average (${data.total} attempts)`
).join('\n') : 'No TBS attempts yet'}

Generate a comprehensive readiness assessment with specific observations and options.`;

    // Call Claude API
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 1800,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract text content
    const assessmentContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Store the assessment in the database
    const assessmentSummary = {
      section,
      examDate: sectionProgress.exam_date,
      daysRemaining: daysUntilExam,
      primeMeridianScore: sectionProgress.prime_meridian_score,
      totalAttempted: sectionProgress.total_questions_attempted,
      mockExamTrend,
      studyStreak: studyStreak?.current_streak || 0,
    };

    const { data: storedAssessment, error: storeError } = await supabase
      .from('pre_exam_assessments')
      .upsert({
        user_id: user.id,
        section,
        exam_date: sectionProgress.exam_date,
        assessment_content: assessmentContent,
        summary: assessmentSummary,
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,section,exam_date',
      })
      .select('id')
      .single();

    if (storeError) {
      console.error('Error storing assessment:', storeError);
      // Continue even if storage fails
    }

    // Record usage
    await supabase
      .from('ai_feature_usage')
      .insert({
        user_id: user.id,
        feature: 'pre_exam_assessment',
        period_type: 'per_exam',
        period_key: examKey,
        usage_count: 1,
        last_used_at: new Date().toISOString(),
      });

    return NextResponse.json({
      success: true,
      assessmentId: storedAssessment?.id,
      assessment: assessmentContent,
      summary: assessmentSummary,
      isBeta: IS_BETA_NOW,
      generatedAt: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Error generating pre-exam assessment:', error);
    return NextResponse.json({ error: 'Failed to generate pre-exam assessment' }, { status: 500 });
  }
}

// GET endpoint to check if assessment is available or retrieve existing
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const section = request.nextUrl.searchParams.get('section');
    const includeContent = request.nextUrl.searchParams.get('includeContent') === 'true';

    if (!section) {
      return NextResponse.json({ error: 'Section parameter required' }, { status: 400 });
    }

    // Get section progress
    const { data: sectionProgress } = await supabase
      .from('section_progress')
      .select('exam_date')
      .eq('user_id', user.id)
      .eq('section', section)
      .single();

    if (!sectionProgress?.exam_date) {
      return NextResponse.json({
        available: false,
        reason: 'No exam date scheduled',
      });
    }

    // Check if already generated
    const examKey = `${section}_${sectionProgress.exam_date}`;
    const { data: existingUsage } = await supabase
      .from('ai_feature_usage')
      .select('usage_count, created_at')
      .eq('user_id', user.id)
      .eq('feature', 'pre_exam_assessment')
      .eq('period_type', 'per_exam')
      .eq('period_key', examKey)
      .single();

    const daysUntilExam = Math.ceil(
      (new Date(sectionProgress.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
    );

    const alreadyGenerated = existingUsage && existingUsage.usage_count > 0;

    // If requesting content and assessment exists, fetch from storage
    if (includeContent && alreadyGenerated) {
      const { data: storedAssessment } = await supabase
        .from('pre_exam_assessments')
        .select('*')
        .eq('user_id', user.id)
        .eq('section', section)
        .eq('exam_date', sectionProgress.exam_date)
        .single();

      if (storedAssessment) {
        return NextResponse.json({
          available: false,
          alreadyGenerated: true,
          generatedAt: existingUsage?.created_at,
          examDate: sectionProgress.exam_date,
          daysUntilExam,
          assessment: {
            id: storedAssessment.id,
            content: storedAssessment.assessment_content,
            summary: storedAssessment.summary,
            createdAt: storedAssessment.created_at,
          },
        });
      }
    }

    return NextResponse.json({
      available: !alreadyGenerated,
      alreadyGenerated,
      generatedAt: existingUsage?.created_at,
      examDate: sectionProgress.exam_date,
      daysUntilExam,
      autoTriggerAt: daysUntilExam <= 14,
    });

  } catch (error) {
    console.error('Error checking pre-exam assessment availability:', error);
    return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
  }
}
