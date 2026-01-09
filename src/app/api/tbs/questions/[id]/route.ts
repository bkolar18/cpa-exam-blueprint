import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import {
  TBSQuestion,
  TBSExhibit,
  TBSRequirement,
  TBSJournalAccount,
  DropdownOption,
} from '@/lib/data/tbs/types';

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/tbs/questions/[id]
 * Get a single TBS question with all related data
 */
export async function GET(request: Request, { params }: RouteParams) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      );
    }

    // Get current user (authentication required)
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Use the helper function if available, otherwise build manually
    // First try the RPC function
    const { data: tbsData, error: rpcError } = await supabase.rpc('get_tbs_with_details', {
      p_tbs_id: id,
    });

    if (!rpcError && tbsData) {
      // Transform from database format to frontend format
      const question = transformFromDatabase(tbsData);
      return NextResponse.json({ question });
    }

    // Fallback: Manual query if RPC not available
    const [
      { data: questionData, error: questionError },
      { data: exhibitsData, error: exhibitsError },
      { data: requirementsData, error: requirementsError },
      { data: accountsData, error: accountsError },
    ] = await Promise.all([
      supabase
        .from('tbs_questions')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single(),
      supabase
        .from('tbs_exhibits')
        .select('*')
        .eq('tbs_id', id)
        .order('exhibit_order'),
      supabase
        .from('tbs_requirements')
        .select('*')
        .eq('tbs_id', id)
        .order('requirement_order'),
      supabase
        .from('tbs_je_accounts')
        .select('*')
        .eq('tbs_id', id)
        .order('display_order'),
    ]);

    if (questionError || !questionData) {
      console.error('Error fetching TBS question:', questionError);
      return NextResponse.json(
        { error: 'Question not found' },
        { status: 404 }
      );
    }

    // Get dropdown options for requirements
    const requirementIds = requirementsData?.map(r => r.id) || [];
    let dropdownOptionsMap: Record<string, DropdownOption[]> = {};

    if (requirementIds.length > 0) {
      const { data: optionsData } = await supabase
        .from('tbs_dropdown_options')
        .select('*')
        .in('requirement_id', requirementIds)
        .order('option_order');

      if (optionsData) {
        for (const opt of optionsData) {
          if (!dropdownOptionsMap[opt.requirement_id]) {
            dropdownOptionsMap[opt.requirement_id] = [];
          }
          dropdownOptionsMap[opt.requirement_id].push({
            id: opt.id,
            order: opt.option_order,
            text: opt.option_text,
            isCorrect: opt.is_correct,
          });
        }
      }
    }

    // Transform to frontend format
    const question: TBSQuestion = {
      id: questionData.id,
      section: questionData.section,
      tbsType: questionData.tbs_type,
      topic: questionData.topic,
      subtopic: questionData.subtopic || undefined,
      difficulty: questionData.difficulty,
      skillLevel: questionData.skill_level || 'application',
      contentArea: questionData.content_area || `${questionData.section}-I`,
      title: questionData.title,
      scenarioText: questionData.scenario_text,
      timeEstimateMinutes: questionData.time_estimate_minutes,
      maxScorePoints: questionData.max_score_points,
      exhibits: (exhibitsData || []).map(e => ({
        id: e.id,
        order: e.exhibit_order,
        title: e.title,
        type: e.exhibit_type,
        content: e.content,
      })) as TBSExhibit[],
      requirements: (requirementsData || []).map(r => ({
        id: r.id,
        order: r.requirement_order,
        type: r.requirement_type,
        label: r.label,
        description: r.description || undefined,
        cellReference: r.cell_reference || undefined,
        gridRow: r.grid_row || undefined,
        gridColumn: r.grid_column || undefined,
        points: r.points,
        correctAnswer: r.correct_answer,
        partialCreditRules: r.partial_credit_rules || undefined,
        explanation: r.explanation,
        hint: r.hint || undefined,
        dropdownOptions: dropdownOptionsMap[r.id] || undefined,
      })) as TBSRequirement[],
      journalAccounts: (accountsData || []).map(a => ({
        id: a.id,
        name: a.account_name,
        number: a.account_number || undefined,
        type: a.account_type,
        normalBalance: a.normal_balance,
        isDistractor: a.is_distractor,
        category: a.category || undefined,
      })) as TBSJournalAccount[],
    };

    return NextResponse.json({ question });
  } catch (error) {
    console.error('TBS question fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to transform RPC result to frontend format
function transformFromDatabase(data: {
  question: Record<string, unknown>;
  exhibits: Array<Record<string, unknown>>;
  requirements: Array<{ requirement: Record<string, unknown>; dropdown_options?: Array<Record<string, unknown>> }>;
  journal_accounts?: Array<Record<string, unknown>>;
}): TBSQuestion {
  const q = data.question;

  return {
    id: q.id as string,
    section: q.section as TBSQuestion['section'],
    tbsType: q.tbs_type as TBSQuestion['tbsType'],
    topic: q.topic as string,
    subtopic: (q.subtopic as string) || undefined,
    difficulty: q.difficulty as TBSQuestion['difficulty'],
    skillLevel: (q.skill_level as TBSQuestion['skillLevel']) || 'application',
    contentArea: (q.content_area as TBSQuestion['contentArea']) || `${q.section}-I` as TBSQuestion['contentArea'],
    title: q.title as string,
    scenarioText: q.scenario_text as string,
    timeEstimateMinutes: q.time_estimate_minutes as number,
    maxScorePoints: q.max_score_points as number,
    exhibits: (data.exhibits || []).map(e => ({
      id: e.id as string,
      order: e.exhibit_order as number,
      title: e.title as string,
      type: e.exhibit_type as TBSExhibit['type'],
      content: e.content as TBSExhibit['content'],
    })),
    requirements: (data.requirements || []).map(item => {
      const r = item.requirement;
      return {
        id: r.id as string,
        order: r.requirement_order as number,
        type: r.requirement_type as TBSRequirement['type'],
        label: r.label as string,
        description: (r.description as string) || undefined,
        cellReference: (r.cell_reference as string) || undefined,
        gridRow: (r.grid_row as number) || undefined,
        gridColumn: (r.grid_column as number) || undefined,
        points: r.points as number,
        correctAnswer: r.correct_answer as TBSRequirement['correctAnswer'],
        partialCreditRules: (r.partial_credit_rules as TBSRequirement['partialCreditRules']) || undefined,
        explanation: r.explanation as string,
        hint: (r.hint as string) || undefined,
        dropdownOptions: item.dropdown_options?.map(d => ({
          id: d.id as string,
          order: d.option_order as number,
          text: d.option_text as string,
          isCorrect: d.is_correct as boolean,
        })),
      };
    }),
    journalAccounts: data.journal_accounts?.map(a => ({
      id: a.id as string,
      name: a.account_name as string,
      number: (a.account_number as string) || undefined,
      type: a.account_type as TBSJournalAccount['type'],
      normalBalance: a.normal_balance as TBSJournalAccount['normalBalance'],
      isDistractor: a.is_distractor as boolean,
      category: (a.category as string) || undefined,
    })),
  };
}
