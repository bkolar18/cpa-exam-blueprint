import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import Anthropic from '@anthropic-ai/sdk';
import { getFeatureLimit, IS_BETA, isFeatureAvailable, type SubscriptionTier } from '@/lib/ai/beta-limits';

// AICPA Blueprint content areas with weights
const BLUEPRINT_WEIGHTS: Record<string, Record<string, { weight: string; areas: string[] }>> = {
  FAR: {
    'Conceptual Framework': { weight: '10-20%', areas: ['GAAP Hierarchy', 'Qualitative Characteristics', 'Elements of Financial Statements'] },
    'Financial Statement Accounts': { weight: '25-35%', areas: ['Assets', 'Liabilities', 'Equity', 'Revenue', 'Expenses'] },
    'Transactions': { weight: '20-30%', areas: ['Leases', 'Bonds', 'Pensions', 'Stock Compensation', 'Derivatives'] },
    'State & Local Government': { weight: '5-15%', areas: ['Fund Accounting', 'Government-Wide Statements', 'Budgetary Accounting'] },
    'NFP Accounting': { weight: '5-15%', areas: ['Contributions', 'Net Asset Classes', 'Financial Statement Presentation'] },
  },
  AUD: {
    'Ethics & Independence': { weight: '15-25%', areas: ['AICPA Code of Conduct', 'Independence Rules', 'Professional Responsibilities'] },
    'Assessing Risk': { weight: '20-30%', areas: ['Risk Assessment', 'Materiality', 'Internal Control'] },
    'Performing Procedures': { weight: '30-40%', areas: ['Substantive Testing', 'Sampling', 'Analytical Procedures'] },
    'Forming Conclusions': { weight: '15-25%', areas: ['Audit Reports', 'Modifications', 'Communications'] },
  },
  REG: {
    'Ethics & Responsibilities': { weight: '10-20%', areas: ['Circular 230', 'Tax Practice Standards', 'Privilege'] },
    'Business Law': { weight: '10-20%', areas: ['Contracts', 'Agency', 'Business Structures'] },
    'Federal Taxation': { weight: '55-75%', areas: ['Individual Tax', 'Corporate Tax', 'Partnership Tax', 'Property Transactions'] },
  },
  TCP: {
    'Individual Taxation': { weight: '35-45%', areas: ['Income', 'Deductions', 'Credits', 'Alternative Minimum Tax'] },
    'Entity Taxation': { weight: '30-40%', areas: ['Corporations', 'S Corporations', 'Partnerships', 'Trusts'] },
    'Tax Planning': { weight: '20-30%', areas: ['Retirement Planning', 'Wealth Transfer', 'Business Tax Planning'] },
  },
  BAR: {
    'Business Analysis': { weight: '40-50%', areas: ['Financial Analysis', 'Ratio Analysis', 'Forecasting'] },
    'Technical Accounting': { weight: '50-60%', areas: ['Revenue Recognition', 'Consolidations', 'Business Combinations'] },
  },
  ISC: {
    'IT Governance': { weight: '20-30%', areas: ['IT Controls', 'Security Policies', 'Change Management'] },
    'Security & Data': { weight: '30-40%', areas: ['Access Controls', 'Encryption', 'Data Protection'] },
    'Systems & Technology': { weight: '35-45%', areas: ['Cloud Computing', 'Database Systems', 'Automation'] },
  },
};

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
    const body = await request.json();
    const { section, availableHoursPerWeek, studyStyle = 'balanced' } = body;

    if (!section) {
      return NextResponse.json({ error: 'Section is required' }, { status: 400 });
    }

    // Validate study style
    const validStyles = ['intensive', 'balanced', 'spaced'];
    const effectiveStudyStyle = validStyles.includes(studyStyle) ? studyStyle : 'balanced';

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;
    const limit = getFeatureLimit('study_guide', tier);

    // Check if feature is available (always available in beta, tier-restricted otherwise)
    if (!isFeatureAvailable('study_guide', tier)) {
      return NextResponse.json({
        error: 'Study Guide Generator is not available on the free tier',
        upgrade: true
      }, { status: 403 });
    }

    // Check usage for this month
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-01"
    const { data: usageData } = await supabase
      .from('ai_feature_usage')
      .select('usage_count')
      .eq('user_id', user.id)
      .eq('feature', 'study_guide')
      .eq('period_type', 'monthly')
      .eq('period_key', currentMonth)
      .single();

    const currentUsage = usageData?.usage_count || 0;

    if (currentUsage >= limit) {
      return NextResponse.json({
        error: `You've used all ${limit} study guide generation${limit > 1 ? 's' : ''} for this month`,
        remaining: 0,
        resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
      }, { status: 429 });
    }

    // Fetch user's performance data for this section
    const [topicPerfResult, sectionProgressResult, recentAttemptsResult] = await Promise.all([
      supabase
        .from('user_topic_performance')
        .select('topic, accuracy_rate, total_attempted, mastery_level, avg_confidence')
        .eq('user_id', user.id)
        .eq('section', section)
        .order('accuracy_rate', { ascending: true }),

      supabase
        .from('section_progress')
        .select('prime_meridian_score, exam_date, status, total_questions_attempted')
        .eq('user_id', user.id)
        .eq('section', section)
        .single(),

      supabase
        .from('practice_attempts')
        .select('topic, is_correct, created_at')
        .eq('user_id', user.id)
        .eq('section', section)
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(100),
    ]);

    const topicPerformance = topicPerfResult.data || [];
    const sectionProgress = sectionProgressResult.data;
    const recentAttempts = recentAttemptsResult.data || [];

    // Calculate days until exam
    let daysUntilExam: number | null = null;
    if (sectionProgress?.exam_date) {
      daysUntilExam = Math.ceil((new Date(sectionProgress.exam_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }

    // Calculate recent accuracy by topic
    const recentTopicStats: Record<string, { correct: number; total: number }> = {};
    recentAttempts.forEach(attempt => {
      if (!recentTopicStats[attempt.topic]) {
        recentTopicStats[attempt.topic] = { correct: 0, total: 0 };
      }
      recentTopicStats[attempt.topic].total++;
      if (attempt.is_correct) {
        recentTopicStats[attempt.topic].correct++;
      }
    });

    // Build performance summary for AI
    const weakTopics = topicPerformance.filter(t => t.mastery_level === 'weak' || t.accuracy_rate < 60);
    const moderateTopics = topicPerformance.filter(t => t.mastery_level === 'moderate' || (t.accuracy_rate >= 60 && t.accuracy_rate < 75));
    const strongTopics = topicPerformance.filter(t => t.mastery_level === 'mastered' || t.accuracy_rate >= 75);

    // Get blueprint weights for this section
    const blueprintAreas = BLUEPRINT_WEIGHTS[section] || {};

    // Study style descriptions for the prompt
    const studyStyleDescriptions: Record<string, string> = {
      intensive: 'INTENSIVE - Focus heavily on weak areas first. Dedicate 70-80% of time to weak topics before moving to others.',
      balanced: 'BALANCED - Mix weak and strong areas. Spend 50% on weak topics, 30% on moderate, 20% on maintaining strong areas.',
      spaced: 'SPACED - Distributed practice across all topics. Rotate through all areas with slightly more emphasis on weaker ones.',
    };

    // Build the prompt
    const systemPrompt = `You are Meridian Navigator, an AI CPA exam study guide generator. Your role is to create personalized, actionable study plans based on student performance data.

CRITICAL LANGUAGE RULES:
1. NEVER guarantee or predict exam outcomes (pass/fail)
2. NEVER say "you're ready" or "you're not ready" for the exam
3. ALWAYS frame feedback in terms of preparation metrics and benchmarks
4. ALWAYS reference the "recommended Prime Meridian target of 80" instead of "passing"
5. ALWAYS use phrases like "additional practice recommended" not "you need to study more or you'll fail"

STUDY STYLE REQUESTED: ${studyStyleDescriptions[effectiveStudyStyle]}

Frame all assessments as:
- Observations about current metrics
- Comparisons to recommended benchmarks (Prime Meridian score of 80)
- Suggestions for areas to focus on
- Factual statements about coverage

Generate a comprehensive, personalized study guide in the following format:

YOUR PERSONALIZED [SECTION] STUDY GUIDE
Generated: [Current Date]
Study Style: ${effectiveStudyStyle.charAt(0).toUpperCase() + effectiveStudyStyle.slice(1)}
${daysUntilExam ? `Exam Date: [Date] (${daysUntilExam} days away)` : 'Exam Date: Not yet scheduled'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CURRENT STATUS
Prime Meridian Score: [X]/80 recommended
Coverage: [X]% of AICPA blueprint areas practiced

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

PRIORITY 1 - FOCUS AREAS (This Week)
[For each weak topic with high AICPA weight:]
- Topic name
- Current accuracy + AICPA weight
- 3 key concepts to review
- Recommended practice count
- Suggested study time

PRIORITY 2 - REINFORCE (Next Week)
[Moderate mastery topics]

STRONG AREAS (Maintain)
[List strong topics with check marks]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WEEKLY STUDY SCHEDULE
[If available hours provided, create a schedule that follows the ${effectiveStudyStyle} study style]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

End with the standard disclaimer about exam outcomes.`;

    const userMessage = `Generate a personalized study guide for ${section} based on this performance data:

STUDY PREFERENCES:
- Study Style: ${effectiveStudyStyle.toUpperCase()}
${availableHoursPerWeek ? `- Available Study Hours Per Week: ${availableHoursPerWeek}` : '- Available Hours: Not specified'}

CURRENT STATUS:
- Prime Meridian Score: ${sectionProgress?.prime_meridian_score || 'Not yet calculated'}
- Total Questions Attempted: ${sectionProgress?.total_questions_attempted || 0}
${daysUntilExam ? `- Days Until Exam: ${daysUntilExam}` : '- Exam: Not yet scheduled'}

AICPA BLUEPRINT AREAS FOR ${section}:
${Object.entries(blueprintAreas).map(([area, data]) =>
  `- ${area}: ${data.weight} (${data.areas.join(', ')})`
).join('\n')}

WEAK AREAS (Need Focus):
${weakTopics.length > 0 ? weakTopics.map(t =>
  `- ${t.topic}: ${Math.round(t.accuracy_rate)}% accuracy, ${t.total_attempted} attempts, ${t.mastery_level} mastery`
).join('\n') : 'No weak areas identified yet'}

MODERATE AREAS (Reinforce):
${moderateTopics.length > 0 ? moderateTopics.map(t =>
  `- ${t.topic}: ${Math.round(t.accuracy_rate)}% accuracy, ${t.total_attempted} attempts`
).join('\n') : 'No moderate areas identified yet'}

STRONG AREAS (Maintain):
${strongTopics.length > 0 ? strongTopics.map(t =>
  `- ${t.topic}: ${Math.round(t.accuracy_rate)}% accuracy`
).join('\n') : 'No strong areas identified yet'}

RECENT 30-DAY ACTIVITY:
${Object.entries(recentTopicStats).slice(0, 10).map(([topic, stats]) =>
  `- ${topic}: ${stats.correct}/${stats.total} correct (${Math.round(stats.correct / stats.total * 100)}%)`
).join('\n') || 'No recent activity'}

Generate the study guide now. Be specific and actionable.`;

    // Call Claude API
    const anthropic = new Anthropic();
    const response = await anthropic.messages.create({
      model: 'claude-3-5-haiku-20241022',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    });

    // Extract text content
    const studyGuideContent = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === 'text')
      .map(block => block.text)
      .join('\n');

    // Increment usage
    await supabase
      .from('ai_feature_usage')
      .upsert({
        user_id: user.id,
        feature: 'study_guide',
        period_type: 'monthly',
        period_key: currentMonth,
        usage_count: currentUsage + 1,
        last_used_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,feature,period_type,period_key',
      });

    return NextResponse.json({
      success: true,
      studyGuide: studyGuideContent,
      section,
      generatedAt: new Date().toISOString(),
      isBeta: IS_BETA,
      usage: {
        used: currentUsage + 1,
        limit,
        remaining: limit - currentUsage - 1,
      },
    });

  } catch (error) {
    console.error('Error generating study guide:', error);
    return NextResponse.json({ error: 'Failed to generate study guide' }, { status: 500 });
  }
}

// GET endpoint to check usage
export async function GET() {
  try {
    const supabase = await createClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Get user's subscription tier
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    const tier = (profile?.subscription_tier || 'free') as SubscriptionTier;
    const limit = getFeatureLimit('study_guide', tier);

    // Check usage for this month
    const currentMonth = new Date().toISOString().slice(0, 7);
    const { data: usageData } = await supabase
      .from('ai_feature_usage')
      .select('usage_count')
      .eq('user_id', user.id)
      .eq('feature', 'study_guide')
      .eq('period_type', 'monthly')
      .eq('period_key', currentMonth)
      .single();

    const currentUsage = usageData?.usage_count || 0;

    return NextResponse.json({
      used: currentUsage,
      limit,
      remaining: Math.max(0, limit - currentUsage),
      tier,
      resetDate: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toISOString(),
    });

  } catch (error) {
    console.error('Error checking study guide usage:', error);
    return NextResponse.json({ error: 'Failed to check usage' }, { status: 500 });
  }
}
