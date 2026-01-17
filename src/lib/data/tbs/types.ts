// Task-Based Simulation Types
// Comprehensive type definitions for the TBS system

import { SectionCode } from '../practice-questions/types';

// ============================================================================
// Core TBS Types
// ============================================================================

// CPA Evolution (2024) TBS Types
// Note: Standalone research simulations and written communication were ELIMINATED
// in the 2024 CPA Evolution update. Authoritative literature now appears as
// exhibits within select simulations rather than as a searchable resource.
//
// MIGRATION STATUS (January 2026):
// - All 25 research TBS have been migrated to 'document_review' format
// - Citation requirements converted to dropdown requirements with literature exhibits
// - 'research' and 'written_communication' types retained for backward compatibility
//   with any existing user progress data that references the old type
export type TBSType =
  | 'numeric_entry'        // Free-response calculations
  | 'document_review'      // Analyze documents, select corrections/issues
  | 'journal_entry'        // Record transactions with debits/credits
  | 'dropdown'             // Option list / dropdown selections
  | 'reconciliation'       // Bank/account reconciliations
  | 'exhibit_analysis'     // Analyze provided authoritative literature exhibits (new format)
  // DEPRECATED (removed from actual CPA Exam in 2024 but retained for legacy content):
  | 'research'             // [DEPRECATED] Search authoritative literature
  | 'written_communication'; // [DEPRECATED] Draft business correspondence

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
  | 'numeric'          // Enter a number
  | 'dropdown'         // Select from options
  | 'journal_debit'    // Journal entry debit line
  | 'journal_credit'   // Journal entry credit line
  | 'text'             // Free text response
  | 'citation'         // Research citation
  | 'checkbox'         // True/false or select multiple
  | 'matching';        // Match items

export type AuthoritativeSource = 'FASB' | 'AICPA' | 'IRC' | 'PCAOB' | 'SEC' | 'GASB' | 'Treasury';

export type AccountType = 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';

// ============================================================================
// Main TBS Question Interface
// ============================================================================

// Skill levels based on Bloom's Taxonomy (AICPA Blueprint)
export type SkillLevel =
  | 'remembering_understanding'  // Recall and comprehend concepts
  | 'application'                // Apply knowledge to scenarios
  | 'analysis'                   // Analyze data, identify issues
  | 'evaluation';                // Assess information, form judgments (AUD only)

// AICPA Blueprint Content Areas by Section
export type ContentArea =
  // FAR Content Areas
  | 'FAR-I'   // Conceptual Framework, Standard-Setting, Financial Reporting
  | 'FAR-II'  // Select Financial Statement Accounts
  | 'FAR-III' // Select Transactions
  | 'FAR-IV'  // State and Local Governments
  // AUD Content Areas
  | 'AUD-I'   // Ethics, Professional Responsibilities, General Principles
  | 'AUD-II'  // Assessing Risk and Developing a Planned Response
  | 'AUD-III' // Performing Further Procedures and Obtaining Evidence
  | 'AUD-IV'  // Forming Conclusions and Reporting
  // REG Content Areas
  | 'REG-I'   // Ethics, Professional Responsibilities, Federal Tax Procedures
  | 'REG-II'  // Business Law
  | 'REG-III' // Federal Taxation of Property Transactions
  | 'REG-IV'  // Federal Taxation of Individuals
  | 'REG-V'   // Federal Taxation of Entities
  // TCP Content Areas
  | 'TCP-I'   // Tax Compliance and Planning for Individuals
  | 'TCP-II'  // Tax Compliance and Planning for Entities
  | 'TCP-III' // Tax Compliance and Planning for Property Transactions
  | 'TCP-IV'  // Special Tax Topics
  // BAR Content Areas
  | 'BAR-I'   // Business Analysis
  | 'BAR-II'  // Technical Accounting and Reporting
  | 'BAR-III' // State and Local Governments
  // ISC Content Areas
  | 'ISC-I'   // Information Systems and Data Management
  | 'ISC-II'  // Security, Confidentiality, and Privacy
  | 'ISC-III' // Considerations for System and Organization Controls Engagements;

export interface TBSQuestion {
  id: string;
  section: SectionCode;
  tbsType: TBSType;
  topic: string;                    // Must match taxonomy.ts topic names
  subtopic?: string;                // Must match taxonomy.ts subtopic names
  difficulty: 'easy' | 'medium' | 'hard';
  skillLevel: SkillLevel;           // AICPA Bloom's taxonomy level
  contentArea: ContentArea;         // AICPA Blueprint content area
  title: string;
  scenarioText: string;
  timeEstimateMinutes: number;
  maxScorePoints: number;
  exhibits: TBSExhibit[];
  requirements: TBSRequirement[];
  journalAccounts?: TBSJournalAccount[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// ============================================================================
// Exhibit Types
// ============================================================================

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
  | TextContent
  | InvoiceContent
  | BankStatementContent
  | LedgerContent
  | ImageContent;

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
  highlightableRanges?: HighlightRange[];
}

export interface FinancialStatementContent {
  type: 'financial_statement';
  statementType: 'balance_sheet' | 'income_statement' | 'cash_flow' | 'statement_of_equity' | 'trial_balance';
  companyName?: string;
  title: string;
  period: string;
  columns?: string[];
  rows: FinancialRow[];
  notes?: string[];
}

export interface FinancialRow {
  label: string;
  indent?: number;        // 0, 1, 2 for indentation level
  isBold?: boolean;
  isTotal?: boolean;
  isSubtotal?: boolean;
  values: (number | string | null)[];
  accountNumber?: string;
}

export interface TableContent {
  type: 'table';
  title: string;
  headers: string[];
  rows: TableRow[];
  footnotes?: string[];
}

export interface TableRow {
  cells: (string | number | null)[];
  isHeader?: boolean;
  isBold?: boolean;
  highlightCells?: number[]; // Column indices to highlight
}

export interface TextContent {
  type: 'text';
  title: string;
  paragraphs: (string | HighlightableParagraph)[];
}

export interface HighlightableParagraph {
  text: string;
  highlightableRanges?: HighlightRange[];
}

export interface InvoiceContent {
  type: 'invoice';
  invoiceNumber: string;
  date: string;
  vendorName: string;
  vendorAddress?: string;
  customerName: string;
  customerAddress?: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax?: number;
  total: number;
  terms?: string;
  dueDate?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface BankStatementContent {
  type: 'bank_statement';
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  statementPeriod: string;
  beginningBalance: number;
  endingBalance: number;
  transactions: BankTransaction[];
}

export interface BankTransaction {
  date: string;
  description: string;
  checkNumber?: string;
  debit?: number;
  credit?: number;
  balance: number;
}

export interface LedgerContent {
  type: 'ledger';
  accountName: string;
  accountNumber?: string;
  entries: LedgerEntry[];
  runningBalance?: boolean;
}

export interface LedgerEntry {
  date: string;
  description: string;
  reference?: string;
  debit?: number;
  credit?: number;
  balance?: number;
}

export interface ImageContent {
  type: 'image';
  title: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface HighlightRange {
  id: string;
  start: number;
  end: number;
  dropdownRequirementId: string; // Links to a requirement with dropdown options
}

// ============================================================================
// Requirement Types
// ============================================================================

export interface TBSRequirement {
  id: string;
  order: number;
  type: RequirementType;
  label: string;
  description?: string;
  cellReference?: string;      // e.g., "A1", "B3" for grid position
  gridRow?: number;
  gridColumn?: number;
  points: number;
  correctAnswer: CorrectAnswer;
  partialCreditRules?: PartialCreditRule[];
  explanation: string;
  hint?: string;
  dropdownOptions?: DropdownOption[]; // For dropdown type requirements
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
  acceptNegative?: boolean;     // Accept negative of correct answer for partial credit
  acceptedFormats?: string[];   // Display formats for reference
}

export interface DropdownAnswer {
  type: 'dropdown';
  correctOptionId: string;
}

export interface JournalAnswer {
  type: 'journal';
  accountId: string;
  accountName: string;
  amount: number;
  tolerance?: number;
}

export interface TextAnswer {
  type: 'text';
  keywords: string[];           // Must include these keywords
  alternativeKeywords?: string[][]; // Alternative acceptable keyword sets
  minLength?: number;
  maxLength?: number;
  caseSensitive?: boolean;
}

export interface CitationAnswer {
  type: 'citation';
  source: AuthoritativeSource;
  topicCode: string;            // e.g., "ASC 606-10"
  sectionCode?: string;
  paragraph?: string;
  alternativeCitations?: AlternativeCitation[];
}

export interface AlternativeCitation {
  source: AuthoritativeSource;
  topicCode: string;
  sectionCode?: string;
  paragraph?: string;
}

export interface CheckboxAnswer {
  type: 'checkbox';
  correctSelections: string[];  // IDs of correct checkbox options
  requireAll?: boolean;         // Must select all correct options
}

export interface MatchingAnswer {
  type: 'matching';
  correctPairs: MatchingPair[];
}

export interface MatchingPair {
  leftId: string;
  rightId: string;
}

export interface PartialCreditRule {
  id: string;
  condition: string;            // Human-readable description
  pointsAwarded: number;
  evaluationType: 'sign_error' | 'magnitude_only' | 'account_only' | 'amount_only' | 'custom';
  customEvaluation?: string;    // JSON logic for custom evaluation
}

export interface DropdownOption {
  id: string;
  order: number;
  text: string;
  isCorrect: boolean;
}

// ============================================================================
// Journal Entry Specific Types
// ============================================================================

export interface TBSJournalAccount {
  id: string;
  name: string;
  number?: string;
  type: AccountType;
  normalBalance: 'debit' | 'credit';
  isDistractor: boolean;        // Include some wrong options
  category?: string;            // For grouping in dropdown (e.g., "Current Assets")
}

export interface JournalEntryLine {
  requirementId: string;
  accountId: string | null;
  amount: number | null;
  isDebit: boolean;
}

export interface JournalEntryWorkspace {
  lines: JournalEntryLine[];
  totalDebits: number;
  totalCredits: number;
  isBalanced: boolean;
}

// ============================================================================
// Research Tool Types
// ============================================================================

export interface AuthoritativeLiterature {
  id: string;
  source: AuthoritativeSource;
  topicCode: string;
  topicTitle: string;
  subtopicCode?: string;
  subtopicTitle?: string;
  sectionCode?: string;
  sectionTitle?: string;
  paragraph?: string;
  content: string;
  keywords: string[];
  effectiveDate?: string;
}

export interface ResearchSearchResult {
  literature: AuthoritativeLiterature;
  relevanceScore: number;
  matchedKeywords: string[];
}

// ============================================================================
// Reconciliation Types
// ============================================================================

export interface ReconciliationTemplate {
  type: 'bank' | 'account';
  title: string;
  bankSide: ReconciliationSide;
  bookSide: ReconciliationSide;
}

export interface ReconciliationSide {
  title: string;
  startingBalanceLabel: string;
  startingBalanceValue?: number;
  additionItems: ReconciliationItem[];
  deductionItems: ReconciliationItem[];
  adjustedBalanceLabel: string;
}

export interface ReconciliationItem {
  id: string;
  label: string;
  requirementId?: string;       // Links to a numeric requirement
  value?: number;
  isEditable: boolean;
}

// ============================================================================
// User Response Types
// ============================================================================

export type UserResponse =
  | NumericResponse
  | DropdownResponse
  | JournalDebitResponse
  | JournalCreditResponse
  | TextResponse
  | CitationResponse
  | CheckboxResponse
  | MatchingResponse;

export interface NumericResponse {
  type: 'numeric';
  value: number | null;
  formattedValue?: string;
}

export interface DropdownResponse {
  type: 'dropdown';
  selectedOptionId: string | null;
}

export interface JournalDebitResponse {
  type: 'journal_debit';
  accountId: string | null;
  amount: number | null;
}

export interface JournalCreditResponse {
  type: 'journal_credit';
  accountId: string | null;
  amount: number | null;
}

export interface TextResponse {
  type: 'text';
  value: string;
  wordCount?: number;
}

export interface CitationResponse {
  type: 'citation';
  value: string;
  source?: AuthoritativeSource;
  topicCode?: string;
}

export interface CheckboxResponse {
  type: 'checkbox';
  selectedIds: string[];
}

export interface MatchingResponse {
  type: 'matching';
  pairs: { leftId: string; rightId: string }[];
}

// ============================================================================
// Attempt and Grading Types
// ============================================================================

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
  lastSavedAt?: Date;
}

export interface GradingDetail {
  requirementId: string;
  requirementLabel: string;
  pointsEarned: number;
  pointsPossible: number;
  isCorrect: boolean;
  isPartialCredit: boolean;
  userAnswer: string;
  correctAnswer: string;
  feedback: string;
}

export interface TBSGradingResult {
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  details: GradingDetail[];
  timeTaken: number;
  completedAt: Date;
}

// ============================================================================
// Session and Progress Types
// ============================================================================

export interface TBSSession {
  id: string;
  userId: string;
  section: SectionCode;
  tbsQuestions: TBSQuestion[];
  currentTBSIndex: number;
  attempts: TBSAttempt[];
  startedAt: Date;
  completedAt?: Date;
  totalTimeSeconds?: number;
  overallScore?: number;
  overallMaxScore?: number;
}

export interface TBSProgress {
  userId: string;
  section: SectionCode;
  tbsCompleted: number;
  tbsTotal: number;
  averageScore: number;
  averageTimeMinutes: number;
  strongTopics: string[];
  weakTopics: string[];
  lastAttemptDate?: Date;
}

// ============================================================================
// UI State Types
// ============================================================================

export interface TBSUIState {
  currentExhibitId: string | null;
  openExhibitIds: string[];
  viewMode: 'single' | 'split' | 'cascade';
  calculatorOpen: boolean;
  highlighterActive: boolean;
  userHighlights: UserHighlight[];
  autoSaveEnabled: boolean;
  lastAutoSave?: Date;
}

export interface UserHighlight {
  id: string;
  exhibitId: string;
  start: number;
  end: number;
  color: 'yellow' | 'green' | 'blue' | 'pink';
  note?: string;
}

// ============================================================================
// Filter and Search Types
// ============================================================================

export interface TBSFilterOptions {
  sections?: SectionCode[];
  tbsTypes?: TBSType[];
  topics?: string[];
  difficulties?: ('easy' | 'medium' | 'hard')[];
  minTimeMinutes?: number;
  maxTimeMinutes?: number;
  attempted?: boolean;
  notAttempted?: boolean;
  passedOnly?: boolean;
  failedOnly?: boolean;
}

export interface TBSSearchParams {
  query?: string;
  filters?: TBSFilterOptions;
  sortBy?: 'title' | 'difficulty' | 'topic' | 'time' | 'lastAttempt' | 'score';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface TBSAnalytics {
  userId: string;
  section: SectionCode;
  totalAttempts: number;
  uniqueTBSAttempted: number;
  averageScore: number;
  averageTimeMinutes: number;
  completionRate: number;
  scoreByType: Record<TBSType, number>;
  scoreByTopic: Record<string, number>;
  timeByType: Record<TBSType, number>;
  improvementTrend: number; // Positive = improving
  commonMistakes: CommonMistake[];
}

export interface CommonMistake {
  requirementType: RequirementType;
  description: string;
  frequency: number;
  examples: string[];
  suggestion: string;
}
