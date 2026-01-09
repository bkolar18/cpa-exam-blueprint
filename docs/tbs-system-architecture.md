# Task-Based Simulation (TBS) System Architecture

## Document Information
- **Date**: January 9, 2026
- **Status**: Planning Phase
- **Author**: Development Team

---

## 1. Executive Summary

This document outlines the comprehensive architecture for implementing a Task-Based Simulation (TBS) system for the CPA Exam Blueprint platform. TBS questions represent approximately 50% of the actual CPA exam score and are critical for complete exam preparation.

---

## 2. Research Findings

### 2.1 Official CPA Exam TBS Types

Based on AICPA examination blueprints and industry research, there are **six primary TBS formats**:

| Type | Description | Sections | Difficulty |
|------|-------------|----------|------------|
| **Numeric Entry** | Free-response calculations entered into cells | FAR, AUD, REG, TCP, BAR, ISC | Medium-Hard |
| **Document Review** | Analyze documents, select corrections from dropdowns | AUD, FAR | Medium-Hard |
| **Journal Entry** | Record transactions with debits/credits | FAR, AUD | Medium |
| **Research** | Search authoritative literature for citations | FAR, AUD, REG | Medium |
| **Reconciliation** | Prepare bank/account reconciliations | FAR | Medium-Hard |
| **Written Communication** | Draft business correspondence (BEC only - now TCP) | TCP | Medium |

### 2.2 Exam Structure

| Section | MCQs | TBSs | MCQ Weight | TBS Weight |
|---------|------|------|------------|------------|
| FAR | 50 | 7 | 50% | 50% |
| AUD | 78 | 7 | 50% | 50% |
| REG | 72 | 7 | 50% | 50% |
| TCP | 68 | 7 | 50% | 50% |
| BAR | 50 | 7 | 50% | 50% |
| ISC | 82 | 6 | 60% | 40% |

### 2.3 Scoring Characteristics

- TBS questions can receive **partial credit** (unlike MCQs)
- Each TBS has 5-10 scoring opportunities
- Research-based TBS are scored as correct/incorrect (no partial credit)
- Item Response Theory (IRT) used for scoring
- TBS are graded as a unit, not individually

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  TBS Engine  │  │ Exhibit      │  │ Scoring      │          │
│  │  Component   │  │ Viewer       │  │ Display      │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  Spreadsheet │  │ Document     │  │ Research     │          │
│  │  Component   │  │ Reviewer     │  │ Tool         │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
├─────────────────────────────────────────────────────────────────┤
│                     TBS State Manager                            │
├─────────────────────────────────────────────────────────────────┤
│                        API Layer                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Supabase Backend                            │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  TBS Content │  │  User        │  │  Analytics   │          │
│  │  Tables      │  │  Attempts    │  │  Tracking    │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Component Architecture

```
TBSEngine/
├── TBSContainer.tsx              # Main orchestrator
├── TBSHeader.tsx                 # Timer, progress, navigation controls
├── TBSInstructions.tsx           # Scenario description
├── ExhibitPanel/
│   ├── ExhibitTabs.tsx           # Tab navigation for exhibits
│   ├── ExhibitViewer.tsx         # Renders exhibit content
│   ├── MemoExhibit.tsx           # Email/memo format
│   ├── FinancialExhibit.tsx      # Financial statements
│   ├── TableExhibit.tsx          # Data tables
│   ├── ImageExhibit.tsx          # Supporting images
│   ├── TaxFormExhibit.tsx        # IRS form display (REG)
│   └── ExhibitToolbar.tsx        # Print, copy, zoom controls
├── WorkArea/
│   ├── NumericEntryGrid.tsx      # Spreadsheet-like input
│   ├── SpreadsheetWorkpaper.tsx  # Multi-tab Excel-like component
│   ├── JournalEntryForm.tsx      # Debit/credit entry
│   ├── DocumentReview.tsx        # Highlight & select
│   ├── ReconciliationGrid.tsx    # Bank rec format
│   ├── ResearchTool.tsx          # Citation entry + external links
│   ├── WrittenResponse.tsx       # Text area with formatting
│   └── TaxFormInput.tsx          # Interactive IRS forms (REG)
├── Tools/
│   ├── Calculator.tsx            # On-screen calculator
│   ├── Highlighter.tsx           # Text highlighting
│   ├── SplitView.tsx             # Resizable side-by-side layout
│   ├── Timer.tsx                 # Countdown with color states
│   ├── ScratchPad.tsx            # Digital notes panel
│   ├── FormulaSheet.tsx          # PV tables, formulas
│   └── UndoRedo.tsx              # Undo/redo state management
├── Navigation/
│   ├── TestletNavigation.tsx     # Prev/Next TBS, question list
│   ├── ReviewScreen.tsx          # Summary before submit
│   ├── FlagForReview.tsx         # Flag individual TBS
│   └── SubmitConfirmation.tsx    # Final submit dialog
└── Results/
    ├── TBSResults.tsx            # Score breakdown
    ├── PartialCreditDisplay.tsx  # Partial credit details
    ├── ExplanationPanel.tsx      # Per-requirement explanations
    └── PerformanceInsights.tsx   # Time analysis, comparisons
```

---

## 4. Database Schema

### 4.1 Core TBS Tables

```sql
-- TBS Questions Master Table
CREATE TABLE tbs_questions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section TEXT NOT NULL CHECK (section IN ('FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC')),
  tbs_type TEXT NOT NULL CHECK (tbs_type IN (
    'numeric_entry',
    'document_review',
    'journal_entry',
    'research',
    'reconciliation',
    'written_communication'
  )),
  topic TEXT NOT NULL,
  subtopic TEXT,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  title TEXT NOT NULL,
  scenario_text TEXT NOT NULL,           -- Main problem description
  time_estimate_minutes INTEGER DEFAULT 15,
  max_score_points INTEGER NOT NULL,     -- Total possible points
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TBS Exhibits (supporting documents)
CREATE TABLE tbs_exhibits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  exhibit_order INTEGER NOT NULL,        -- Display order
  title TEXT NOT NULL,                   -- Tab title
  exhibit_type TEXT NOT NULL CHECK (exhibit_type IN (
    'memo', 'email', 'financial_statement', 'table',
    'invoice', 'contract', 'bank_statement', 'ledger',
    'tax_form', 'audit_report', 'image', 'text'
  )),
  content JSONB NOT NULL,                -- Structured exhibit content
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TBS Requirements (individual scored items)
CREATE TABLE tbs_requirements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  requirement_order INTEGER NOT NULL,
  requirement_type TEXT NOT NULL CHECK (requirement_type IN (
    'numeric',         -- Enter a number
    'dropdown',        -- Select from options
    'journal_debit',   -- Journal entry debit
    'journal_credit',  -- Journal entry credit
    'text',            -- Free text response
    'citation',        -- Research citation
    'checkbox',        -- True/false or select multiple
    'matching'         -- Match items
  )),
  label TEXT NOT NULL,                   -- What the field represents
  cell_reference TEXT,                   -- e.g., "A1", "B3" for grid position
  points INTEGER NOT NULL DEFAULT 1,     -- Points for this item
  correct_answer JSONB NOT NULL,         -- Correct answer(s) with tolerances
  partial_credit_rules JSONB,            -- Rules for partial credit
  explanation TEXT,                      -- Explanation shown after grading
  hint TEXT,                             -- Optional hint
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TBS Dropdown Options (for document review and selection questions)
CREATE TABLE tbs_dropdown_options (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  requirement_id UUID REFERENCES tbs_requirements(id) ON DELETE CASCADE NOT NULL,
  option_order INTEGER NOT NULL,
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

-- TBS Journal Entry Accounts (account picker for journal entries)
CREATE TABLE tbs_je_accounts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  account_name TEXT NOT NULL,
  account_number TEXT,
  account_type TEXT CHECK (account_type IN ('asset', 'liability', 'equity', 'revenue', 'expense')),
  is_distractor BOOLEAN DEFAULT false    -- Include some wrong options
);

-- Authoritative Literature for Research TBS
CREATE TABLE tbs_authoritative_literature (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  source TEXT NOT NULL CHECK (source IN ('FASB', 'AICPA', 'IRC', 'PCAOB', 'SEC', 'GASB')),
  topic_code TEXT NOT NULL,              -- e.g., "ASC 606"
  section_code TEXT,
  paragraph TEXT,
  content TEXT NOT NULL,
  keywords TEXT[],                       -- For search functionality
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User TBS Attempts
CREATE TABLE tbs_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tbs_id UUID REFERENCES tbs_questions(id) ON DELETE CASCADE NOT NULL,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent_seconds INTEGER,
  responses JSONB NOT NULL,              -- User's answers keyed by requirement_id
  score_earned INTEGER,
  max_score INTEGER,
  score_percentage DECIMAL(5,2),
  grading_details JSONB,                 -- Detailed breakdown per requirement
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_tbs_questions_section ON tbs_questions(section);
CREATE INDEX idx_tbs_questions_type ON tbs_questions(tbs_type);
CREATE INDEX idx_tbs_questions_topic ON tbs_questions(topic);
CREATE INDEX idx_tbs_exhibits_tbs ON tbs_exhibits(tbs_id);
CREATE INDEX idx_tbs_requirements_tbs ON tbs_requirements(tbs_id);
CREATE INDEX idx_tbs_attempts_user ON tbs_attempts(user_id);
CREATE INDEX idx_tbs_attempts_tbs ON tbs_attempts(tbs_id);
CREATE INDEX idx_tbs_literature_source ON tbs_authoritative_literature(source);
CREATE INDEX idx_tbs_literature_keywords ON tbs_authoritative_literature USING GIN(keywords);

-- RLS Policies
ALTER TABLE tbs_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_exhibits ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_dropdown_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_je_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_authoritative_literature ENABLE ROW LEVEL SECURITY;
ALTER TABLE tbs_attempts ENABLE ROW LEVEL SECURITY;

-- Public read for TBS content
CREATE POLICY "TBS questions are viewable by authenticated users" ON tbs_questions
  FOR SELECT TO authenticated USING (is_active = true);

CREATE POLICY "TBS exhibits are viewable by authenticated users" ON tbs_exhibits
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "TBS requirements are viewable by authenticated users" ON tbs_requirements
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "TBS dropdown options are viewable by authenticated users" ON tbs_dropdown_options
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "TBS accounts are viewable by authenticated users" ON tbs_je_accounts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "TBS literature is viewable by authenticated users" ON tbs_authoritative_literature
  FOR SELECT TO authenticated USING (true);

-- User can only see/manage own attempts
CREATE POLICY "Users can view own TBS attempts" ON tbs_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own TBS attempts" ON tbs_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own TBS attempts" ON tbs_attempts
  FOR UPDATE USING (auth.uid() = user_id);
```

### 4.2 TypeScript Types

```typescript
// src/lib/data/tbs/types.ts

export type TBSType =
  | 'numeric_entry'
  | 'document_review'
  | 'journal_entry'
  | 'research'
  | 'reconciliation'
  | 'written_communication';

export type ExhibitType =
  | 'memo'
  | 'email'
  | 'financial_statement'
  | 'table'
  | 'invoice'
  | 'contract'
  | 'bank_statement'
  | 'ledger'
  | 'tax_form'
  | 'audit_report'
  | 'image'
  | 'text';

export type RequirementType =
  | 'numeric'
  | 'dropdown'
  | 'journal_debit'
  | 'journal_credit'
  | 'text'
  | 'citation'
  | 'checkbox'
  | 'matching';

export interface TBSQuestion {
  id: string;
  section: SectionCode;
  tbsType: TBSType;
  topic: string;
  subtopic?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  title: string;
  scenarioText: string;
  timeEstimateMinutes: number;
  maxScorePoints: number;
  exhibits: TBSExhibit[];
  requirements: TBSRequirement[];
  journalAccounts?: TBSJournalAccount[];
}

export interface TBSExhibit {
  id: string;
  order: number;
  title: string;
  type: ExhibitType;
  content: ExhibitContent;
}

export type ExhibitContent =
  | MemoContent
  | EmailContent
  | FinancialStatementContent
  | TableContent
  | TextContent;

export interface MemoContent {
  type: 'memo';
  from: string;
  to: string;
  date: string;
  subject: string;
  body: string;
  highlightableRanges?: HighlightRange[];
}

export interface EmailContent {
  type: 'email';
  from: string;
  to: string;
  cc?: string;
  date: string;
  subject: string;
  body: string;
  attachments?: string[];
}

export interface FinancialStatementContent {
  type: 'financial_statement';
  statementType: 'balance_sheet' | 'income_statement' | 'cash_flow' | 'statement_of_equity';
  title: string;
  period: string;
  rows: FinancialRow[];
}

export interface FinancialRow {
  label: string;
  indent?: number;
  isBold?: boolean;
  isTotal?: boolean;
  values: (number | string | null)[];
}

export interface TableContent {
  type: 'table';
  title: string;
  headers: string[];
  rows: (string | number | null)[][];
  highlightCells?: { row: number; col: number }[];
}

export interface TextContent {
  type: 'text';
  title: string;
  paragraphs: string[];
}

export interface HighlightRange {
  start: number;
  end: number;
  dropdownId: string;
}

export interface TBSRequirement {
  id: string;
  order: number;
  type: RequirementType;
  label: string;
  cellReference?: string;
  points: number;
  correctAnswer: CorrectAnswer;
  partialCreditRules?: PartialCreditRule[];
  explanation: string;
  hint?: string;
}

export type CorrectAnswer =
  | NumericAnswer
  | DropdownAnswer
  | JournalAnswer
  | TextAnswer
  | CitationAnswer
  | CheckboxAnswer
  | MatchingAnswer;

export interface NumericAnswer {
  type: 'numeric';
  value: number;
  tolerance?: number;           // Absolute tolerance (e.g., 100 means +/- 100)
  tolerancePercent?: number;    // Percentage tolerance (e.g., 0.02 means +/- 2%)
  acceptedFormats?: string[];   // e.g., ["1000", "1,000", "$1,000"]
}

export interface DropdownAnswer {
  type: 'dropdown';
  correctOptionId: string;
}

export interface JournalAnswer {
  type: 'journal';
  accountName: string;
  amount: number;
  tolerance?: number;
}

export interface TextAnswer {
  type: 'text';
  keywords: string[];           // Must include these keywords
  minLength?: number;
  maxLength?: number;
}

export interface CitationAnswer {
  type: 'citation';
  source: string;               // e.g., "FASB"
  topicCode: string;            // e.g., "ASC 606-10"
  alternativeCitations?: string[];
}

export interface CheckboxAnswer {
  type: 'checkbox';
  correctSelections: string[];
}

export interface MatchingAnswer {
  type: 'matching';
  correctPairs: { left: string; right: string }[];
}

export interface PartialCreditRule {
  condition: string;            // Description of partial credit condition
  pointsAwarded: number;
}

export interface TBSJournalAccount {
  id: string;
  name: string;
  number?: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  isDistractor: boolean;
}

export interface TBSAttempt {
  id: string;
  userId: string;
  tbsId: string;
  startedAt: Date;
  completedAt?: Date;
  timeSpentSeconds?: number;
  responses: Record<string, UserResponse>;
  scoreEarned?: number;
  maxScore?: number;
  scorePercentage?: number;
  gradingDetails?: GradingDetail[];
  isComplete: boolean;
}

export type UserResponse =
  | { type: 'numeric'; value: number | null }
  | { type: 'dropdown'; selectedOptionId: string | null }
  | { type: 'journal_debit'; accountId: string | null; amount: number | null }
  | { type: 'journal_credit'; accountId: string | null; amount: number | null }
  | { type: 'text'; value: string }
  | { type: 'citation'; value: string }
  | { type: 'checkbox'; selectedIds: string[] }
  | { type: 'matching'; pairs: { left: string; right: string }[] };

export interface GradingDetail {
  requirementId: string;
  pointsEarned: number;
  pointsPossible: number;
  isCorrect: boolean;
  partialCredit: boolean;
  feedback: string;
}
```

---

## 5. UI/UX Design

### 5.1 Main TBS Interface Layout

```
┌────────────────────────────────────────────────────────────────────────┐
│ [Section: FAR] [TBS 1 of 7]                    [Timer: 18:32] [Submit] │
├────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  INSTRUCTIONS                                                           │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ River Manufacturing is preparing its year-end financial        │    │
│  │ statements. Review the exhibits and complete the requirements. │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                         │
├────────────────────────────────────────────────────────────────────────┤
│ EXHIBITS              │ WORK AREA                                       │
│ ┌───────────────────┐ │ ┌─────────────────────────────────────────────┐ │
│ │ [Memo] [Email]    │ │ │                                             │ │
│ │ [Balance Sheet]   │ │ │  Account          │ Debit    │ Credit      │ │
│ │ [Trial Balance]   │ │ │ ─────────────────────────────────────────── │ │
│ │                   │ │ │  [Dropdown ▼]     │ [____]   │ [____]      │ │
│ │ ┌───────────────┐ │ │ │  [Dropdown ▼]     │ [____]   │ [____]      │ │
│ │ │               │ │ │ │  [Dropdown ▼]     │ [____]   │ [____]      │ │
│ │ │  Exhibit      │ │ │ │                                             │ │
│ │ │  Content      │ │ │ │  Totals:         │ $____    │ $____       │ │
│ │ │  Here         │ │ │ │                                             │ │
│ │ │               │ │ │ │  [Check Balance]                            │ │
│ │ └───────────────┘ │ │ └─────────────────────────────────────────────┘ │
│ └───────────────────┘ │                                                 │
├────────────────────────────────────────────────────────────────────────┤
│ [Calculator] [Highlight Tool] [Split View] [Help]           [Submit →] │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.2 TBS Type-Specific UI Components

#### 5.2.1 Numeric Entry Grid
- Spreadsheet-like interface with labeled cells
- Number formatting with thousand separators
- Auto-calculation helpers for common operations
- Cell validation (numeric only, currency format)

#### 5.2.2 Journal Entry Form
- Account dropdown with search/filter
- Separate debit and credit columns
- Running totals that update in real-time
- Visual indicator when debits ≠ credits
- Support for multi-line entries

#### 5.2.3 Document Review
- Document displayed with highlighted/underlined sections
- Click highlighted text to reveal dropdown
- Cascade or tile view for multiple exhibits
- Persistent highlight tool for user notes

#### 5.2.4 Research Tool (External Links Approach)

Instead of hosting full authoritative literature (which has licensing concerns), we link to official sources:

**External Resources:**
| Source | URL | Description |
|--------|-----|-------------|
| FASB Codification | https://asc.fasb.org | Official ASC (requires free account) |
| IRC (Tax Code) | https://www.law.cornell.edu/uscode/text/26 | Cornell Law - Free access |
| PCAOB Standards | https://pcaobus.org/oversight/standards | Auditing standards |
| AICPA Standards | https://www.aicpa.org/resources/landing/professionalstandards | Professional standards |
| SEC Regulations | https://www.sec.gov/about/laws/secrulesregs | Securities regulations |
| GASB Standards | https://www.gasb.org/standards | Government accounting |

**Implementation:**
- Simplified search interface that teaches navigation patterns
- Practice questions include the correct citation as the answer
- "Open in new tab" links to official sources
- Citation format helper (how to write ASC 606-10-25-1)
- Mini-database of common topic codes and titles for autocomplete
- Grading validates citation format, not full text lookup

#### 5.2.5 Reconciliation Grid
- Pre-formatted reconciliation template
- Separate sections for bank/book sides
- Automatic calculation of adjusted balances
- Checkbox list for common adjustments

#### 5.2.6 Written Communication
- Rich text editor (basic formatting)
- Word count indicator
- Professional letter/memo templates
- Spell check (browser native)

### 5.3 Additional UI Features (Exam Parity)

These features replicate the actual Prometric testing experience:

#### 5.3.1 Multi-Tab Workpapers (Spreadsheet Component)
- Excel-like spreadsheet with multiple named tabs
- Basic formulas: SUM, AVERAGE, simple arithmetic
- Cell formatting: currency, percentage, decimal places
- Auto-calculate totals in designated cells
- Copy/paste between cells and from exhibits

#### 5.3.2 Split-Screen with Resizable Panels
- Draggable divider between exhibits and work area
- Minimum/maximum width constraints
- Double-click divider to reset to default
- Remember user's preferred split ratio

#### 5.3.3 Testlet Navigation
- "Question X of 7" indicator in header
- Previous/Next TBS buttons within testlet
- Question list dropdown for direct navigation
- Flag for review functionality per TBS
- Review screen before final submission

#### 5.3.4 Answer Review Mode
- Summary screen showing all TBS in testlet
- Status indicators: Complete, Incomplete, Flagged
- Click to jump directly to any TBS
- "Review Flagged Only" filter option
- Final submit confirmation dialog

#### 5.3.5 Scratch Paper / Notes Panel
- Collapsible side panel for digital notes
- Persists across TBS within session
- Basic text formatting (bold, bullet points)
- Not saved after submission (like real exam)

#### 5.3.6 Formula Reference Sheet
- Accessible via toolbar button
- Present value tables (annuity, lump sum)
- Common accounting formulas
- Tax rate schedules (for REG)
- Searchable/filterable

#### 5.3.7 Time Management
- Countdown timer with color changes:
  - Green: > 15 minutes remaining
  - Yellow: 5-15 minutes remaining
  - Red: < 5 minutes remaining
- Optional audio alerts at 15min, 5min, 1min
- "Time spent on this TBS" indicator
- Pause functionality (for practice mode only)

#### 5.3.8 Exhibit Tools
- Print exhibit button (opens print dialog)
- Copy text from exhibits to clipboard
- Zoom in/out for financial statements
- Full-screen exhibit mode

#### 5.3.9 Undo/Redo System
- Multi-step undo for all input types
- Redo support
- Keyboard shortcuts: Ctrl+Z / Ctrl+Y
- Clear all answers button (with confirmation)

### 5.4 Form-Based Simulations (REG Section)

For REG tax simulations, support these IRS form types:

| Form | Description | Implementation |
|------|-------------|----------------|
| **Form 1040** | Individual Income Tax | Interactive fillable form |
| **Schedule A** | Itemized Deductions | Linked to 1040 |
| **Schedule C** | Business Income | Sole proprietor scenarios |
| **Schedule D** | Capital Gains | Stock sale calculations |
| **Form 1120** | Corporate Tax Return | C-Corp scenarios |
| **Form 1120-S** | S-Corp Return | Pass-through scenarios |
| **Form 1065** | Partnership Return | Partnership allocations |

Form features:
- Exact visual replica of IRS forms
- Field validation (numeric, date formats)
- Auto-calculations where appropriate
- Line-by-line instructions on hover

### 5.5 Mobile Considerations

While TBS is primarily a desktop experience, consider:
- Responsive exhibit viewer that stacks vertically
- Larger touch targets for dropdowns
- Collapsible panels to maximize work area
- Landscape mode recommendation for TBS
- Warning message on mobile: "TBS practice is best experienced on desktop"

---

## 6. Grading Engine

### 6.1 Grading Logic

```typescript
// src/lib/tbs/grading-engine.ts

interface GradingResult {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  details: GradingDetail[];
}

function gradeTBS(
  tbs: TBSQuestion,
  responses: Record<string, UserResponse>
): GradingResult {
  const details: GradingDetail[] = [];
  let earnedPoints = 0;

  for (const requirement of tbs.requirements) {
    const response = responses[requirement.id];
    const result = gradeRequirement(requirement, response);

    details.push({
      requirementId: requirement.id,
      pointsEarned: result.points,
      pointsPossible: requirement.points,
      isCorrect: result.isFullCredit,
      partialCredit: result.isPartialCredit,
      feedback: result.feedback
    });

    earnedPoints += result.points;
  }

  return {
    totalPoints: tbs.maxScorePoints,
    earnedPoints,
    percentage: (earnedPoints / tbs.maxScorePoints) * 100,
    details
  };
}

function gradeRequirement(
  requirement: TBSRequirement,
  response: UserResponse | undefined
): { points: number; isFullCredit: boolean; isPartialCredit: boolean; feedback: string } {
  if (!response) {
    return {
      points: 0,
      isFullCredit: false,
      isPartialCredit: false,
      feedback: "No response provided"
    };
  }

  switch (requirement.type) {
    case 'numeric':
      return gradeNumeric(requirement, response as { type: 'numeric'; value: number | null });
    case 'dropdown':
      return gradeDropdown(requirement, response as { type: 'dropdown'; selectedOptionId: string | null });
    case 'journal_debit':
    case 'journal_credit':
      return gradeJournalEntry(requirement, response);
    case 'text':
      return gradeText(requirement, response as { type: 'text'; value: string });
    case 'citation':
      return gradeCitation(requirement, response as { type: 'citation'; value: string });
    default:
      return { points: 0, isFullCredit: false, isPartialCredit: false, feedback: "Unknown type" };
  }
}

function gradeNumeric(
  requirement: TBSRequirement,
  response: { type: 'numeric'; value: number | null }
): { points: number; isFullCredit: boolean; isPartialCredit: boolean; feedback: string } {
  if (response.value === null) {
    return { points: 0, isFullCredit: false, isPartialCredit: false, feedback: "No answer entered" };
  }

  const answer = requirement.correctAnswer as NumericAnswer;
  const userValue = response.value;
  const correctValue = answer.value;

  // Check exact match first
  if (userValue === correctValue) {
    return {
      points: requirement.points,
      isFullCredit: true,
      isPartialCredit: false,
      feedback: "Correct!"
    };
  }

  // Check within tolerance
  let withinTolerance = false;

  if (answer.tolerance) {
    withinTolerance = Math.abs(userValue - correctValue) <= answer.tolerance;
  }

  if (answer.tolerancePercent) {
    const percentDiff = Math.abs((userValue - correctValue) / correctValue);
    withinTolerance = withinTolerance || percentDiff <= answer.tolerancePercent;
  }

  if (withinTolerance) {
    return {
      points: requirement.points,
      isFullCredit: true,
      isPartialCredit: false,
      feedback: "Correct (within acceptable rounding)"
    };
  }

  // Check partial credit rules
  if (requirement.partialCreditRules) {
    for (const rule of requirement.partialCreditRules) {
      // Evaluate rule condition (simplified)
      if (evaluatePartialCreditRule(rule, userValue, correctValue)) {
        return {
          points: rule.pointsAwarded,
          isFullCredit: false,
          isPartialCredit: true,
          feedback: rule.condition
        };
      }
    }
  }

  return {
    points: 0,
    isFullCredit: false,
    isPartialCredit: false,
    feedback: `Incorrect. The correct answer is ${formatNumber(correctValue)}`
  };
}
```

### 6.2 Partial Credit Rules Examples

```typescript
// Examples of partial credit rules

// Numeric with partial credit for sign error
{
  correctAnswer: { type: 'numeric', value: 50000 },
  partialCreditRules: [
    {
      condition: "Correct magnitude, wrong sign",
      pointsAwarded: 0.5,
      evaluate: (user, correct) => user === -correct
    }
  ]
}

// Journal entry with partial credit
{
  correctAnswer: { type: 'journal', accountName: 'Depreciation Expense', amount: 12000 },
  partialCreditRules: [
    {
      condition: "Correct account, incorrect amount",
      pointsAwarded: 0.5,
      evaluate: (response) => response.accountName === 'Depreciation Expense' && response.amount !== 12000
    },
    {
      condition: "Incorrect account, correct amount",
      pointsAwarded: 0.25,
      evaluate: (response) => response.accountName !== 'Depreciation Expense' && response.amount === 12000
    }
  ]
}
```

---

## 7. Implementation Roadmap

### Phase 1: Foundation
- [ ] Create database schema and migrations
- [ ] Define TypeScript types
- [ ] Build TBSContainer component shell
- [ ] Implement basic exhibit viewer with tabs
- [ ] Create numeric entry component
- [ ] Basic split-view layout (fixed ratio)

### Phase 2: Core TBS Types
- [ ] Journal entry form with account picker
- [ ] Document review with highlights and dropdowns
- [ ] Basic grading engine with partial credit
- [ ] Results display component
- [ ] Testlet navigation (prev/next, question list)

### Phase 3: Advanced Work Areas
- [ ] Research tool with external links and citation validation
- [ ] Reconciliation grid template
- [ ] Written communication editor with word count
- [ ] Multi-tab spreadsheet workpaper component
- [ ] Tax form simulations (REG section)

### Phase 4: Exam Parity Features
- [ ] Resizable split-screen panels
- [ ] Undo/redo system
- [ ] Flag for review functionality
- [ ] Review screen before submission
- [ ] Scratch paper / notes panel
- [ ] Formula reference sheet

### Phase 5: Tools & Polish
- [ ] On-screen calculator
- [ ] Timer with color states and alerts
- [ ] Auto-save every 30 seconds
- [ ] Exhibit toolbar (print, copy, zoom)
- [ ] Keyboard shortcuts

### Phase 6: Content Creation
- [ ] Create 5-10 sample TBS per section (30-60 total)
- [ ] Build tax form templates for REG
- [ ] Create citation database for research TBS
- [ ] Write comprehensive explanations

### Phase 7: Integration & Analytics
- [ ] Connect TBS scores to readiness dashboard
- [ ] Add TBS practice flow to dashboard navigation
- [ ] Track detailed analytics (time per exhibit, answer changes)
- [ ] Performance optimization and lazy loading
- [ ] Mobile warning and basic responsive support

---

## 8. Sample TBS Data Structure

### 8.1 Journal Entry TBS Example

```typescript
const sampleJournalEntryTBS: TBSQuestion = {
  id: "tbs-far-001",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Leases",
  subtopic: "Finance Lease Accounting",
  difficulty: "medium",
  title: "Recording a Finance Lease",
  scenarioText: `
    On January 1, Year 1, Riverside Corp. entered into a lease agreement
    for equipment with the following terms:

    • Lease term: 5 years
    • Annual lease payment: $50,000 (paid at end of each year)
    • Fair value of equipment: $210,000
    • Useful life of equipment: 6 years
    • Implicit interest rate: 6%
    • Riverside's incremental borrowing rate: 7%

    The lease qualifies as a finance lease under ASC 842.

    Required: Prepare the journal entry to record the lease at inception.
  `,
  timeEstimateMinutes: 12,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-1",
      order: 1,
      title: "Present Value Table",
      type: "table",
      content: {
        type: "table",
        title: "Present Value of Ordinary Annuity",
        headers: ["Period", "5%", "6%", "7%", "8%"],
        rows: [
          ["1", "0.9524", "0.9434", "0.9346", "0.9259"],
          ["2", "1.8594", "1.8334", "1.8080", "1.7833"],
          ["3", "2.7232", "2.6730", "2.6243", "2.5771"],
          ["4", "3.5460", "3.4651", "3.3872", "3.3121"],
          ["5", "4.3295", "4.2124", "4.1002", "3.9927"]
        ]
      }
    },
    {
      id: "exhibit-2",
      order: 2,
      title: "Lease Agreement",
      type: "memo",
      content: {
        type: "memo",
        from: "Legal Department",
        to: "Accounting Department",
        date: "January 1, Year 1",
        subject: "Equipment Lease - Finance Classification",
        body: `
          Please note the following regarding the equipment lease:

          1. The lease term (5 years) represents 83% of the equipment's
             useful life (6 years), exceeding the 75% threshold.

          2. The present value of lease payments should be calculated
             using the implicit rate of 6% as it is known to the lessee.

          3. No transfer of ownership or purchase option is included.
        `
      }
    }
  ],
  requirements: [
    {
      id: "req-1",
      order: 1,
      type: "journal_debit",
      label: "Debit Account",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountName: "Right-of-Use Asset",
        amount: 210620
      },
      explanation: "The ROU asset is recorded at the present value of lease payments: $50,000 × 4.2124 = $210,620",
      partialCreditRules: [
        {
          condition: "Correct account, amount within 2%",
          pointsAwarded: 0.75
        }
      ]
    },
    {
      id: "req-2",
      order: 2,
      type: "numeric",
      label: "Debit Amount",
      cellReference: "B1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 210620,
        tolerance: 5
      },
      explanation: "$50,000 × 4.2124 (PV factor for 5 periods at 6%) = $210,620"
    },
    {
      id: "req-3",
      order: 3,
      type: "journal_credit",
      label: "Credit Account",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountName: "Lease Liability",
        amount: 210620
      },
      explanation: "The lease liability equals the present value of lease payments"
    },
    {
      id: "req-4",
      order: 4,
      type: "numeric",
      label: "Credit Amount",
      cellReference: "C1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 210620,
        tolerance: 5
      },
      explanation: "The lease liability matches the ROU asset at inception"
    }
  ],
  journalAccounts: [
    { id: "acc-1", name: "Right-of-Use Asset", type: "asset", isDistractor: false },
    { id: "acc-2", name: "Lease Liability", type: "liability", isDistractor: false },
    { id: "acc-3", name: "Equipment", type: "asset", isDistractor: true },
    { id: "acc-4", name: "Notes Payable", type: "liability", isDistractor: true },
    { id: "acc-5", name: "Prepaid Rent", type: "asset", isDistractor: true },
    { id: "acc-6", name: "Lease Expense", type: "expense", isDistractor: true },
    { id: "acc-7", name: "Cash", type: "asset", isDistractor: true },
    { id: "acc-8", name: "Interest Expense", type: "expense", isDistractor: true }
  ]
};
```

### 8.2 Document Review TBS Example

```typescript
const sampleDocumentReviewTBS: TBSQuestion = {
  id: "tbs-aud-001",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Reports",
  subtopic: "Standard Unmodified Opinion",
  difficulty: "medium",
  title: "Audit Report Review",
  scenarioText: `
    You are reviewing a draft audit report prepared by a staff auditor.
    Review the report and identify any errors by selecting the correct
    wording from the dropdown menus for each highlighted item.
  `,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-1",
      order: 1,
      title: "Draft Audit Report",
      type: "text",
      content: {
        type: "text",
        title: "Independent Auditor's Report",
        paragraphs: [
          "To the Board of Directors and Shareholders of ABC Company:",
          "Opinion",
          "We have audited the accompanying financial statements of ABC Company, which comprise the balance sheet as of December 31, Year 1, and the related statements of income, changes in stockholders' equity, and cash flows for the year then ended, and the related notes to the financial statements.",
          "In our opinion, the financial statements referred to above present fairly, in all material respects, the financial position of ABC Company as of December 31, Year 1, and the results of its operations and its cash flows for the year then ended in accordance with [DROPDOWN:1].",
          "Basis for Opinion",
          "We conducted our audit in accordance with [DROPDOWN:2]. Those standards require that we plan and perform the audit to obtain [DROPDOWN:3] assurance about whether the financial statements are free from material misstatement, whether due to fraud or error.",
          "Responsibilities of Management for the Financial Statements",
          "Management is responsible for the preparation and fair presentation of these financial statements in accordance with accounting principles generally accepted in the United States of America, and for the design, implementation, and maintenance of internal control relevant to the preparation and fair presentation of financial statements that are free from [DROPDOWN:4] misstatement, whether due to fraud or error.",
          "Auditor's Responsibilities for the Audit of the Financial Statements",
          "Our objectives are to obtain [DROPDOWN:5] assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, and to issue an auditor's report that includes our opinion."
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req-1",
      order: 1,
      type: "dropdown",
      label: "GAAP Reference",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-1a" },
      explanation: "The standard phrase is 'accounting principles generally accepted in the United States of America'"
    },
    {
      id: "req-2",
      order: 2,
      type: "dropdown",
      label: "Audit Standards",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-2a" },
      explanation: "Non-public company audits follow 'auditing standards generally accepted in the United States of America'"
    },
    {
      id: "req-3",
      order: 3,
      type: "dropdown",
      label: "Assurance Level (Basis)",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-3a" },
      explanation: "Audits provide 'reasonable' assurance, not absolute assurance"
    },
    {
      id: "req-4",
      order: 4,
      type: "dropdown",
      label: "Misstatement Type",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-4a" },
      explanation: "Management is responsible for statements free from 'material' misstatement"
    },
    {
      id: "req-5",
      order: 5,
      type: "dropdown",
      label: "Assurance Level (Objectives)",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-5a" },
      explanation: "The auditor's objective is to obtain 'reasonable' assurance"
    }
  ]
};
```

---

## 9. Technical Considerations

### 9.1 Performance

- **Lazy Loading**: Load exhibits on-demand for large TBS
- **Auto-save**: Save responses every 30 seconds to prevent data loss
- **Debounced Input**: Debounce numeric/text inputs to reduce re-renders
- **Virtual Lists**: For large dropdown lists, use virtualization

### 9.2 Accessibility

- **Keyboard Navigation**: Full keyboard support for all interactions
- **Screen Reader**: ARIA labels for all interactive elements
- **Focus Management**: Proper focus indicators and tab order
- **Color Contrast**: Meet WCAG 2.1 AA standards

### 9.3 Security

- **Input Sanitization**: Sanitize all user inputs
- **Rate Limiting**: Prevent rapid submission attempts
- **Answer Protection**: Don't expose correct answers in client bundle
- **Session Validation**: Verify user owns the attempt before updates

### 9.4 Analytics Tracking

Track for each TBS attempt:
- Time spent per exhibit
- Number of answer changes
- Order of completion
- Partial credit earned
- Common mistakes patterns

---

## 10. Future Enhancements

### 10.1 AI-Powered Features
- Intelligent hints based on common errors
- Natural language feedback for written responses
- Adaptive difficulty selection

### 10.2 Advanced Simulation
- Multi-part connected simulations
- Real spreadsheet integration (Excel-like)
- Collaborative TBS for study groups

### 10.3 Content Expansion
- User-generated TBS (with review)
- TBS generator from MCQ patterns
- Industry-specific scenarios

---

## 11. Sources & References

Research conducted using:
- [Gleim CPA Review - Task-Based Simulations](https://www.gleim.com/cpa-review/cpa-task-based-simulations/)
- [iPass the CPA Exam - CPA Simulations Guide](https://ipassthecpaexam.com/cpa-simulation/)
- [Becker - How to Answer Task-Based Simulations](https://www.becker.com/blog/accounting/5-ways-to-prepare-for-task-based-simulations)
- [AICPA - Learn What to Study for the CPA Exam](https://www.aicpa-cima.com/resources/download/learn-what-is-tested-on-the-cpa-exam)
- [Vishal CPA Prep - Mastering TBS](https://vishalcpaprep.com/blogs/news/mastering-cpa-task-based-simulations-strategies)
- [ThisWayToCPA - Task-Based Simulations High Scorers' Guide](https://www.thiswaytocpa.com/exam/articles/passing-exam/task-based-simulations-high-scorers-guide/)
- [UWorld Accounting - CPA Exam Scoring](https://accounting.uworld.com/cpa-review/cpa-exam/scoring/)
- [My Accounting Course - CPA Exam TBS Guide](https://www.myaccountingcourse.com/cpa-exam-task-based-simulations)

---

## 12. Pretest Questions (Future Enhancement)

The actual CPA exam includes unscored "pretest" questions mixed with scored questions. Students don't know which are which. This could be implemented as:

### 12.1 Purpose
- Test new TBS questions before adding to scored pool
- Gather difficulty metrics and timing data
- A/B test different question formats

### 12.2 Implementation Approach
```typescript
// Add to tbs_questions table
is_pretest BOOLEAN DEFAULT false,
pretest_pool_id UUID,  // Group pretest questions for analysis

// Don't count toward user's score
// Track separately for question quality analysis
```

### 12.3 Admin Features
- Mark questions as pretest
- View pretest performance analytics
- Promote pretest to scored pool based on metrics
- Flag problematic questions for review

---

## Document Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-01-09 | Dev Team | Initial architecture document |
| 1.1 | 2026-01-09 | Dev Team | Added exam parity features: multi-tab workpapers, resizable split-screen, testlet navigation, answer review mode, scratch paper, formula sheet, time management, exhibit tools, undo/redo, tax form simulations. Updated research tool to use external links. Added pretest questions section. |
