/**
 * Prime Meridian Score Calculation
 *
 * A comprehensive exam readiness score that combines:
 * - AICPA Blueprint content area weighting
 * - MCQ and TBS performance (50/50 split like real exam)
 * - Difficulty multipliers (hard questions worth more)
 * - Recency weighting (recent performance matters more)
 * - Minimum practice thresholds per content area
 *
 * Target: 75 (recommended score before taking the exam)
 */

import type { SectionCode } from "@/lib/supabase/types";

// AICPA Blueprint Weight Allocations (2025-2026)
// Using midpoint of ranges for calculation
export const AICPA_CONTENT_AREA_WEIGHTS: Record<string, Record<string, { min: number; max: number; mid: number; name: string }>> = {
  FAR: {
    'FAR-I': { min: 25, max: 35, mid: 30, name: 'Conceptual Framework, Standard-Setting, Financial Reporting' },
    'FAR-II': { min: 30, max: 40, mid: 35, name: 'Select Financial Statement Accounts' },
    'FAR-III': { min: 20, max: 30, mid: 25, name: 'Select Transactions' },
    'FAR-IV': { min: 5, max: 15, mid: 10, name: 'State and Local Governments' }
  },
  AUD: {
    'AUD-I': { min: 15, max: 25, mid: 20, name: 'Ethics, Professional Responsibilities, General Principles' },
    'AUD-II': { min: 25, max: 35, mid: 30, name: 'Assessing Risk and Developing a Planned Response' },
    'AUD-III': { min: 30, max: 40, mid: 35, name: 'Performing Further Procedures and Obtaining Evidence' },
    'AUD-IV': { min: 10, max: 20, mid: 15, name: 'Forming Conclusions and Reporting' }
  },
  REG: {
    'REG-I': { min: 10, max: 20, mid: 15, name: 'Ethics, Professional Responsibilities, Federal Tax Procedures' },
    'REG-II': { min: 15, max: 25, mid: 20, name: 'Business Law' },
    'REG-III': { min: 12, max: 22, mid: 17, name: 'Federal Taxation of Property Transactions' },
    'REG-IV': { min: 22, max: 32, mid: 27, name: 'Federal Taxation of Individuals' },
    'REG-V': { min: 18, max: 28, mid: 23, name: 'Federal Taxation of Entities' }
  },
  TCP: {
    'TCP-I': { min: 35, max: 45, mid: 40, name: 'Tax Compliance and Planning for Individuals' },
    'TCP-II': { min: 30, max: 40, mid: 35, name: 'Tax Compliance and Planning for Entities' },
    'TCP-III': { min: 7, max: 17, mid: 12, name: 'Tax Compliance and Planning for Property Transactions' },
    'TCP-IV': { min: 8, max: 18, mid: 13, name: 'Special Tax Topics' }
  },
  BAR: {
    'BAR-I': { min: 40, max: 50, mid: 45, name: 'Business Analysis' },
    'BAR-II': { min: 35, max: 45, mid: 40, name: 'Technical Accounting and Reporting' },
    'BAR-III': { min: 10, max: 20, mid: 15, name: 'State and Local Governments' }
  },
  ISC: {
    'ISC-I': { min: 35, max: 45, mid: 40, name: 'Information Systems and Data Management' },
    'ISC-II': { min: 35, max: 45, mid: 40, name: 'Security, Confidentiality, and Privacy' },
    'ISC-III': { min: 15, max: 25, mid: 20, name: 'SOC Engagements' }
  }
};

// Map topics to AICPA content areas
// This mapping connects our taxonomy topics to AICPA blueprint content areas
export const TOPIC_TO_CONTENT_AREA: Record<string, Record<string, string>> = {
  FAR: {
    // FAR-I: Conceptual Framework, Standard-Setting, Financial Reporting
    'Conceptual Framework & Standards': 'FAR-I',
    'Conceptual Framework': 'FAR-I',
    'Standard Setting': 'FAR-I',
    'Financial Statement Presentation': 'FAR-I',
    'Financial Statements': 'FAR-I',
    'Financial Statement Disclosures': 'FAR-I',
    'Statement of Cash Flows': 'FAR-I',
    'Segment Reporting': 'FAR-I',
    'IFRS': 'FAR-I',
    'Fair Value': 'FAR-I',
    'Accounting Changes and Error Corrections': 'FAR-I',
    'Accounting Changes': 'FAR-I',
    'Subsequent Events': 'FAR-I',

    // FAR-II: Select Financial Statement Accounts
    'Inventory': 'FAR-II',
    'Property, Plant & Equipment': 'FAR-II',
    'Property, Plant, and Equipment': 'FAR-II',
    'Intangible Assets': 'FAR-II',
    'Investments': 'FAR-II',
    'Receivables': 'FAR-II',
    'Cash and Cash Equivalents': 'FAR-II',
    'Liabilities': 'FAR-II',
    'Long-term Debt': 'FAR-II',
    'Long-Term Debt': 'FAR-II',
    'Long-term Liabilities': 'FAR-II',
    'Long-Term Liabilities': 'FAR-II',
    'Bonds and Long-Term Debt': 'FAR-II',
    'Contingencies': 'FAR-II',
    "Stockholders' Equity": 'FAR-II',
    'Equity': 'FAR-II',
    'Revenue Recognition': 'FAR-II',
    'Income Taxes': 'FAR-II',
    'Pensions': 'FAR-II',
    'Employee Benefits': 'FAR-II',
    'Earnings Per Share': 'FAR-II',
    'Stock-Based Compensation': 'FAR-II',
    'Stock Compensation': 'FAR-II',

    // FAR-III: Select Transactions
    'Leases': 'FAR-III',
    'Business Combinations': 'FAR-III',
    'Consolidations': 'FAR-III',
    'Derivatives': 'FAR-III',
    'Foreign Currency': 'FAR-III',

    // FAR-IV: State and Local Governments
    'Government Accounting': 'FAR-IV',
    'State and Local Governments': 'FAR-IV',
    'State and Local Government': 'FAR-IV',
    'Not-for-Profit Accounting': 'FAR-IV',
    'Not-for-Profit Entities': 'FAR-IV',
  },
  AUD: {
    // AUD-I: Ethics, Professional Responsibilities, General Principles
    'Professional Ethics': 'AUD-I',
    'Professional Responsibilities': 'AUD-I',
    'Professional Responsibilities & Ethics': 'AUD-I',
    'Professional Standards': 'AUD-I',
    'Quality Control': 'AUD-I',

    // AUD-II: Assessing Risk and Developing a Planned Response
    'Audit Planning': 'AUD-II',
    'Planning': 'AUD-II',
    'Risk Assessment': 'AUD-II',
    'Internal Control': 'AUD-II',
    'Internal Controls': 'AUD-II',
    'Fraud': 'AUD-II',

    // AUD-III: Performing Further Procedures and Obtaining Evidence
    'Audit Evidence': 'AUD-III',
    'Audit Sampling': 'AUD-III',
    'Revenue and Receivables': 'AUD-III',
    'Inventory Auditing': 'AUD-III',
    'Using Work of Others': 'AUD-III',
    'Audit Documentation': 'AUD-III',
    'Management Representations': 'AUD-III',
    'Substantive Procedures': 'AUD-III',
    'Analytical Procedures': 'AUD-III',
    'Evidence & Procedures': 'AUD-III',
    'Subsequent Events': 'AUD-III',
    'Going Concern': 'AUD-III',
    'Group Audits': 'AUD-III',
    'Related Parties': 'AUD-III',
    'Comprehensive Review': 'AUD-III',
    'Completing the Audit': 'AUD-III',

    // AUD-IV: Forming Conclusions and Reporting
    'Audit Reports': 'AUD-IV',
    'Special Reports': 'AUD-IV',
    'Communications': 'AUD-IV',
    'Governance Communications': 'AUD-IV',
    'SSARS': 'AUD-IV',
    'Attestation Engagements': 'AUD-IV',
    'Other Attestation Engagements': 'AUD-IV',
    'Other Engagements': 'AUD-IV',
    'Government Auditing': 'AUD-IV',
  },
  REG: {
    // REG-I: Ethics, Professional Responsibilities, Federal Tax Procedures
    'Professional Ethics - Circular 230': 'REG-I',
    'Ethics & Professional Responsibility': 'REG-I',
    'Tax Procedures': 'REG-I',
    'Tax Research': 'REG-I',

    // REG-II: Business Law
    'Business Law': 'REG-II',
    'Business Law - Contracts': 'REG-II',
    'Business Law - Agency': 'REG-II',
    'Business Law - Business Structures': 'REG-II',
    'Business Law - Bankruptcy': 'REG-II',
    'Business Law - Securities Regulation': 'REG-II',
    'Debtor-Creditor': 'REG-II',

    // REG-III: Federal Taxation of Property Transactions
    'Property Transactions': 'REG-III',
    'Federal Taxation of Property': 'REG-III',

    // REG-IV: Federal Taxation of Individuals
    'Individual Taxation': 'REG-IV',
    'Employment Tax': 'REG-IV',
    'Gift and Estate Tax': 'REG-IV',
    'Gift & Estate Tax': 'REG-IV',
    'Estates and Trusts': 'REG-IV',

    // REG-V: Federal Taxation of Entities
    'C Corporations': 'REG-V',
    'S Corporations': 'REG-V',
    'Corporate Taxation': 'REG-V',
    'Partnerships': 'REG-V',
    'Partnership Taxation': 'REG-V',
    'Business Entities': 'REG-V',
    'Federal Taxation of Entities': 'REG-V',
    'International Tax': 'REG-V',
  },
  TCP: {
    // TCP-I: Tax Compliance and Planning for Individuals
    'Individual Tax Compliance': 'TCP-I',
    'Individual Tax Planning': 'TCP-I',
    'Tax Planning': 'TCP-I',
    'Tax Planning Strategies': 'TCP-I',
    'Retirement Planning': 'TCP-I',
    'Compensation Planning': 'TCP-I',
    'Estate and Gift Planning': 'TCP-I',
    'Charitable Giving': 'TCP-I',
    'International Individual Tax': 'TCP-I',
    'AMT Planning': 'TCP-I',

    // TCP-II: Tax Compliance and Planning for Entities
    'Entity Tax Planning': 'TCP-II',
    'C Corporation Planning': 'TCP-II',
    'S Corporation Planning': 'TCP-II',
    'Partnership Planning': 'TCP-II',
    'Multi-Entity Planning': 'TCP-II',
    'Business Succession Planning': 'TCP-II',
    'Employment Tax': 'TCP-II',
    'State and Local Tax': 'TCP-II',

    // TCP-III: Tax Compliance and Planning for Property Transactions
    'Property Planning': 'TCP-III',
    'Property Transactions Planning': 'TCP-III',
    'Passive Activity': 'TCP-III',

    // TCP-IV: Special Tax Topics
    'Tax Credits': 'TCP-IV',
  },
  BAR: {
    // BAR-I: Business Analysis
    'Financial Statement Analysis': 'BAR-I',
    'Financial Analysis': 'BAR-I',
    'Capital Budgeting': 'BAR-I',
    'Cost of Capital': 'BAR-I',
    'Business Valuation': 'BAR-I',
    'Economic Concepts': 'BAR-I',
    'Data Analytics': 'BAR-I',
    'Cost Accounting': 'BAR-I',
    'Budgeting': 'BAR-I',
    'Performance Evaluation': 'BAR-I',
    'Performance Measurement': 'BAR-I',
    'Decision Analysis': 'BAR-I',
    'Operations Management': 'BAR-I',
    'Cost Estimation': 'BAR-I',
    'Cost Management': 'BAR-I',
    'Cost Analysis': 'BAR-I',
    'Variance Analysis': 'BAR-I',
    'CVP Analysis': 'BAR-I',
    'Cost-Volume-Profit': 'BAR-I',
    'Working Capital Management': 'BAR-I',
    'Transfer Pricing': 'BAR-I',
    'Quality Management': 'BAR-I',
    'Segment Analysis': 'BAR-I',
    'Target Costing': 'BAR-I',
    'Risk Analysis': 'BAR-I',
    'Process Costing': 'BAR-I',
    'Joint and Byproduct Costing': 'BAR-I',
    'Financial Forecasting': 'BAR-I',
    'Financial Modeling': 'BAR-I',
    'Trend Analysis': 'BAR-I',
    'Managerial Accounting': 'BAR-I',
    'Corporate Finance': 'BAR-I',

    // BAR-II: Technical Accounting and Reporting
    'Foreign Currency': 'BAR-II',
    'Derivatives': 'BAR-II',
    'Business Combinations': 'BAR-II',
    'Consolidations': 'BAR-II',
    'Technical Accounting': 'BAR-II',
    'International Accounting': 'BAR-II',

    // BAR-III: State and Local Governments
    'Government Accounting': 'BAR-III',
    'Governmental Accounting': 'BAR-III',
    'Not-for-Profit Accounting': 'BAR-III',
  },
  ISC: {
    // ISC-I: Information Systems and Data Management
    'Data Management': 'ISC-I',
    'Data Governance': 'ISC-I',
    'Information Systems': 'ISC-I',
    'System Operations': 'ISC-I',
    'Emerging Technologies': 'ISC-I',
    'Emerging Technology': 'ISC-I',
    'Cloud Computing': 'ISC-I',
    'IT Governance': 'ISC-I',
    'IT Operations': 'ISC-I',
    'IT Service Management': 'ISC-I',
    'IT Audit': 'ISC-I',
    'Comprehensive Review': 'ISC-I',

    // ISC-II: Security, Confidentiality, and Privacy
    'Cybersecurity': 'ISC-II',
    'IT General Controls': 'ISC-II',
    'Network Security': 'ISC-II',
    'Application Controls': 'ISC-II',
    'Application Security': 'ISC-II',
    'Encryption': 'ISC-II',
    'Cryptography': 'ISC-II',
    'Disaster Recovery': 'ISC-II',
    'Business Continuity': 'ISC-II',
    'IT Risk Management': 'ISC-II',
    'Risk Management': 'ISC-II',
    'Security Monitoring': 'ISC-II',
    'Endpoint Security': 'ISC-II',
    'Security Testing': 'ISC-II',
    'Physical Security': 'ISC-II',
    'Cloud Security': 'ISC-II',
    'Incident Response': 'ISC-II',
    'Privacy': 'ISC-II',
    'Data Security': 'ISC-II',
    'Data Protection': 'ISC-II',
    'Security Architecture': 'ISC-II',
    'Security Management': 'ISC-II',
    'Security Governance': 'ISC-II',
    'Access Controls': 'ISC-II',
    'Identity and Access Management': 'ISC-II',
    'Authentication': 'ISC-II',
    'Vendor Management': 'ISC-II',
    'Third Party Risk': 'ISC-II',
    'Security Training': 'ISC-II',
    'Vulnerability Management': 'ISC-II',
    'Security & Privacy': 'ISC-II',

    // ISC-III: SOC Engagements
    'SOC Reports': 'ISC-III',
    'SOC Engagements': 'ISC-III',
    'System & Organization Controls (SOC)': 'ISC-III',
  }
};

/**
 * Reverse mapping: Get taxonomy topics for each AICPA content area.
 * This helps students find what topics to practice when a gap is identified.
 *
 * Example: FAR-IV gap -> Practice "Government Accounting" and "Not-for-Profit Accounting"
 */
export function getTopicsForContentArea(section: string, contentArea: string): string[] {
  const sectionMapping = TOPIC_TO_CONTENT_AREA[section];
  if (!sectionMapping) return [];

  // Find all topics that map to this content area
  const topics = new Set<string>();
  for (const [topic, area] of Object.entries(sectionMapping)) {
    if (area === contentArea) {
      topics.add(topic);
    }
  }

  // Filter to only include topics that exist in our taxonomy (avoid aliases)
  // These are the "canonical" topic names that appear in the quiz configuration
  const canonicalTopics: Record<string, string[]> = {
    FAR: [
      'Conceptual Framework & Standards', 'Financial Statement Presentation', 'Statement of Cash Flows',
      'IFRS', 'Fair Value', 'Accounting Changes and Error Corrections', 'Inventory',
      'Property, Plant & Equipment', 'Intangible Assets', 'Investments', 'Liabilities',
      'Long-term Debt', "Stockholders' Equity", 'Revenue Recognition', 'Income Taxes',
      'Pensions', 'Earnings Per Share', 'Stock-Based Compensation', 'Leases',
      'Business Combinations', 'Consolidations', 'Derivatives', 'Foreign Currency',
      'Government Accounting', 'Not-for-Profit Accounting'
    ],
    AUD: [
      'Professional Ethics', 'Quality Control', 'Audit Planning', 'Risk Assessment',
      'Internal Control', 'Fraud', 'Audit Evidence', 'Audit Sampling',
      'Revenue and Receivables', 'Inventory Auditing', 'Using Work of Others',
      'Audit Documentation', 'Management Representations', 'Going Concern',
      'Group Audits', 'Comprehensive Review', 'Audit Reports', 'Governance Communications',
      'SSARS', 'Attestation Engagements', 'Government Auditing', 'Subsequent Events'
    ],
    REG: [
      'Professional Ethics - Circular 230', 'Tax Procedures', 'Tax Research',
      'Business Law', 'Business Law - Contracts', 'Business Law - Agency',
      'Business Law - Business Structures', 'Business Law - Bankruptcy',
      'Business Law - Securities Regulation', 'Debtor-Creditor', 'Property Transactions',
      'Individual Taxation', 'Employment Tax', 'Gift and Estate Tax', 'Estates and Trusts',
      'C Corporations', 'S Corporations', 'Partnerships', 'Business Entities', 'International Tax'
    ],
    TCP: [
      'Tax Planning', 'Retirement Planning', 'Compensation Planning', 'Estate and Gift Planning',
      'Charitable Giving', 'International Individual Tax', 'AMT Planning', 'Individual Tax Compliance',
      'C Corporation Planning', 'S Corporation Planning', 'Partnership Planning',
      'Multi-Entity Planning', 'Business Succession Planning', 'Employment Tax',
      'State and Local Tax', 'Property Planning', 'Passive Activity', 'Tax Credits'
    ],
    BAR: [
      'Financial Statement Analysis', 'Capital Budgeting', 'Cost of Capital',
      'Business Valuation', 'Economic Concepts', 'Data Analytics', 'Foreign Currency',
      'Derivatives', 'Business Combinations', 'Consolidations', 'Government Accounting',
      'Not-for-Profit Accounting'
    ],
    ISC: [
      'Data Management', 'Emerging Technologies', 'Cloud Computing', 'IT Governance',
      'Comprehensive Review', 'Cybersecurity', 'IT General Controls', 'Network Security',
      'Application Controls', 'Encryption', 'Disaster Recovery', 'Business Continuity',
      'IT Risk Management', 'SOC Reports'
    ]
  };

  const sectionCanonical = canonicalTopics[section] || [];
  const result = Array.from(topics).filter(t => sectionCanonical.includes(t));

  return result;
}

// Types
export interface PracticeAttemptData {
  question_id: string;
  topic: string | null;
  is_correct: boolean;
  created_at: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  time_spent_seconds?: number | null;
  explanation_view_seconds?: number | null;
}

/**
 * Time analytics for detecting suspicious patterns.
 * Fast correct answers may indicate pattern recognition vs. understanding.
 */
export interface TimeAnalytics {
  /** Average time spent per question in seconds */
  averageTimeSeconds: number;
  /** Number of correct answers in under 10 seconds */
  fastCorrectCount: number;
  /** Percentage of answers that were suspiciously fast and correct */
  fastCorrectPercentage: number;
  /** True if >20% of correct answers were suspiciously fast */
  suspiciousPatternDetected: boolean;
  /** Total questions with time data */
  questionsWithTimeData: number;
}

/**
 * Engagement metrics for explanation viewing behavior.
 * Low engagement indicates the student may not be learning from mistakes.
 */
export interface EngagementMetrics {
  /** Percentage of incorrect answers where explanation was viewed (5+ seconds) */
  explanationViewRate: number;
  /** Average seconds spent viewing explanations after incorrect answers */
  averageViewDurationSeconds: number;
  /** Number of incorrect answers with engagement data */
  incorrectWithData: number;
  /** True if student is engaging well (>50% view rate for incorrect answers) */
  isEngaged: boolean;
}

export interface TBSAttemptData {
  tbs_id: string;
  section: string;
  is_complete: boolean;
  score_percentage: number | null;
  created_at: string;
}

export interface ContentAreaScore {
  contentArea: string;
  name: string;
  weight: number;
  rawScore: number;
  weightedScore: number;
  questionsAttempted: number;
  minThresholdMet: boolean;
}

/**
 * Represents a content area that falls below the minimum threshold.
 * These gaps must be addressed before the student is considered exam-ready.
 */
export interface ContentAreaGap {
  contentArea: string;
  name: string;
  score: number;
  threshold: number;
  questionsAttempted: number;
  pointsToThreshold: number;
}

/**
 * Readiness assessment result - determines if student is truly exam-ready.
 */
export interface ReadinessAssessment {
  isReady: boolean;
  reasons: string[];
  overallScoreMet: boolean;
  noContentAreaGaps: boolean;
  isConsistent: boolean;
}

/**
 * Consistency metrics - measures variance in performance across content areas.
 * High variance indicates the student has weak spots the CPA exam will find.
 */
export interface ConsistencyMetrics {
  /** Standard deviation of content area scores */
  standardDeviation: number;
  /** Coefficient of variation = stdDev / mean (0-1 scale, lower is better) */
  coefficientOfVariation: number;
  /** True if CV < 0.25 (consistent performance) */
  isConsistent: boolean;
  /** Content areas that are > 1.5 stdDev below the mean */
  inconsistentAreas: string[];
  /** Average score across all content areas with sufficient data */
  averageScore: number;
}

export interface PrimeMeridianResult {
  overallScore: number;
  mcqScore: number;
  tbsScore: number;
  mcqWeight: number;
  tbsWeight: number;
  contentAreaScores: ContentAreaScore[];
  hasEnoughData: boolean;
  recommendedActions: string[];
  // Gap detection fields
  contentAreaGaps: ContentAreaGap[];
  hasGaps: boolean;
  // Consistency metrics
  consistency: ConsistencyMetrics;
  // Time analytics (available when time data exists)
  timeAnalytics: TimeAnalytics;
  // Engagement metrics (how well student reviews explanations)
  engagement: EngagementMetrics;
  // Overall readiness assessment
  readinessAssessment: ReadinessAssessment;
}

// Configuration
const CONFIG = {
  /**
   * Minimum questions needed per AICPA content area for full weight.
   * With ~1000 MCQs per section and 4-5 content areas (~200-250 MCQs each),
   * and students recommended to do 1000-2000 MCQs per section, 50 questions
   * per content area provides a meaningful minimum threshold.
   *
   * Below this threshold, students receive a coverage penalty:
   * coverageFactor = questionsAttempted / MIN_QUESTIONS_PER_CONTENT_AREA
   */
  MIN_QUESTIONS_PER_CONTENT_AREA: 50,
  /**
   * Minimum TBS completions needed for full weight in TBS scoring.
   * With 50 TBS per section target, 10 provides reasonable coverage.
   */
  MIN_TBS_PER_SECTION: 10,
  RECENCY_HALF_LIFE_DAYS: 30, // Performance from 30 days ago counts half as much
  DIFFICULTY_WEIGHTS: {
    easy: 0.8,
    medium: 1.0,
    hard: 1.3,
  },
  MCQ_WEIGHT: 0.5, // 50% of final score
  TBS_WEIGHT: 0.5, // 50% of final score
  /**
   * Recommended score threshold - raised from 75 to 80 for stricter standards.
   * We grade conservatively because the CPA exam is unforgiving.
   * If Meridian says you're ready at 80+, you actually are.
   */
  RECOMMENDED_SCORE: 80,
  /**
   * Minimum score required for each AICPA content area.
   * Even if overall score is high, any content area below this
   * threshold will block "Recommended" status and flag as a gap.
   * The CPA exam will find your weak areas - we help you find them first.
   */
  CONTENT_AREA_MINIMUM: 70,
  /**
   * Minimum questions per content area before gap detection applies.
   * We need sufficient data (10+ questions) to reliably identify weaknesses.
   */
  MIN_QUESTIONS_FOR_GAP_DETECTION: 10,
  /**
   * Minimum total questions before Prime Meridian score is considered meaningful.
   * With 4-5 content areas at 50 questions each, 100 is a reasonable threshold
   * to indicate the student has started building comprehensive coverage.
   */
  MIN_TOTAL_QUESTIONS_FOR_MEANINGFUL_SCORE: 100,
};

/**
 * Identify content areas that fall below the minimum threshold.
 * Only applies to areas with sufficient practice data (10+ questions).
 */
export function identifyContentAreaGaps(
  contentAreaScores: ContentAreaScore[]
): ContentAreaGap[] {
  return contentAreaScores
    .filter(ca =>
      ca.questionsAttempted >= CONFIG.MIN_QUESTIONS_FOR_GAP_DETECTION &&
      ca.rawScore < CONFIG.CONTENT_AREA_MINIMUM
    )
    .map(ca => ({
      contentArea: ca.contentArea,
      name: ca.name,
      score: ca.rawScore,
      threshold: CONFIG.CONTENT_AREA_MINIMUM,
      questionsAttempted: ca.questionsAttempted,
      pointsToThreshold: CONFIG.CONTENT_AREA_MINIMUM - ca.rawScore,
    }))
    .sort((a, b) => a.score - b.score); // Sort by weakest first
}

/**
 * Calculate consistency metrics across content areas.
 * High variance indicates weak spots that the CPA exam will find.
 */
export function calculateConsistencyMetrics(
  contentAreaScores: ContentAreaScore[]
): ConsistencyMetrics {
  // Only consider areas with sufficient data
  const validAreas = contentAreaScores.filter(
    ca => ca.questionsAttempted >= CONFIG.MIN_QUESTIONS_FOR_GAP_DETECTION
  );

  // Default values for insufficient data
  if (validAreas.length < 2) {
    return {
      standardDeviation: 0,
      coefficientOfVariation: 0,
      isConsistent: true,
      inconsistentAreas: [],
      averageScore: validAreas.length === 1 ? validAreas[0].rawScore : 0,
    };
  }

  const scores = validAreas.map(ca => ca.rawScore);
  const mean = scores.reduce((sum, s) => sum + s, 0) / scores.length;

  // Calculate variance and standard deviation
  const variance = scores.reduce((sum, s) => sum + Math.pow(s - mean, 2), 0) / scores.length;
  const stdDev = Math.sqrt(variance);

  // Coefficient of variation (normalized measure of dispersion)
  const cv = mean > 0 ? stdDev / mean : 0;

  // Identify areas that are significantly below the mean (> 1.5 stdDev)
  const inconsistentAreas = validAreas
    .filter(ca => ca.rawScore < mean - 1.5 * stdDev)
    .map(ca => ca.name.split(',')[0]); // Use short name

  return {
    standardDeviation: Math.round(stdDev * 10) / 10,
    coefficientOfVariation: Math.round(cv * 100) / 100,
    isConsistent: cv < 0.25, // Less than 25% coefficient of variation = consistent
    inconsistentAreas,
    averageScore: Math.round(mean),
  };
}

/**
 * Analyze time patterns to detect suspicious answering behavior.
 * Fast correct answers (< 10 seconds) may indicate pattern recognition
 * rather than genuine understanding.
 */
export function analyzeTimePatterns(
  attempts: PracticeAttemptData[]
): TimeAnalytics {
  // Filter to only attempts with time data
  const attemptsWithTime = attempts.filter(
    a => a.time_spent_seconds !== null && a.time_spent_seconds !== undefined && a.time_spent_seconds > 0
  );

  if (attemptsWithTime.length === 0) {
    return {
      averageTimeSeconds: 0,
      fastCorrectCount: 0,
      fastCorrectPercentage: 0,
      suspiciousPatternDetected: false,
      questionsWithTimeData: 0,
    };
  }

  // Calculate average time
  const totalTime = attemptsWithTime.reduce((sum, a) => sum + (a.time_spent_seconds || 0), 0);
  const averageTimeSeconds = Math.round(totalTime / attemptsWithTime.length);

  // Count fast correct answers (< 10 seconds = suspiciously fast)
  const FAST_THRESHOLD_SECONDS = 10;
  const fastCorrect = attemptsWithTime.filter(
    a => a.is_correct && (a.time_spent_seconds || 0) < FAST_THRESHOLD_SECONDS
  );

  const correctAnswers = attemptsWithTime.filter(a => a.is_correct);
  const fastCorrectPercentage = correctAnswers.length > 0
    ? Math.round((fastCorrect.length / correctAnswers.length) * 100)
    : 0;

  return {
    averageTimeSeconds,
    fastCorrectCount: fastCorrect.length,
    fastCorrectPercentage,
    suspiciousPatternDetected: fastCorrectPercentage > 20, // >20% suspiciously fast
    questionsWithTimeData: attemptsWithTime.length,
  };
}

/**
 * Analyze engagement with explanations.
 * Good engagement = spending time reviewing explanations for incorrect answers.
 */
export function analyzeEngagement(
  attempts: PracticeAttemptData[]
): EngagementMetrics {
  // Focus on incorrect answers with explanation view data
  const incorrectAttempts = attempts.filter(a => !a.is_correct);
  const incorrectWithData = incorrectAttempts.filter(
    a => a.explanation_view_seconds !== null && a.explanation_view_seconds !== undefined
  );

  if (incorrectWithData.length === 0) {
    return {
      explanationViewRate: 0,
      averageViewDurationSeconds: 0,
      incorrectWithData: 0,
      isEngaged: true, // Default to true when no data (don't penalize)
    };
  }

  // Count explanations viewed for 5+ seconds as "engaged"
  const ENGAGEMENT_THRESHOLD_SECONDS = 5;
  const viewedCount = incorrectWithData.filter(
    a => (a.explanation_view_seconds || 0) >= ENGAGEMENT_THRESHOLD_SECONDS
  ).length;

  const explanationViewRate = Math.round((viewedCount / incorrectWithData.length) * 100);

  // Calculate average view duration for incorrect answers
  const totalViewTime = incorrectWithData.reduce(
    (sum, a) => sum + (a.explanation_view_seconds || 0), 0
  );
  const averageViewDurationSeconds = Math.round(totalViewTime / incorrectWithData.length);

  return {
    explanationViewRate,
    averageViewDurationSeconds,
    incorrectWithData: incorrectWithData.length,
    isEngaged: explanationViewRate >= 50, // 50%+ engagement = good
  };
}

/**
 * Assess overall exam readiness using strict criteria.
 * A student is only truly ready when:
 * 1. Overall score meets the recommended threshold (80+)
 * 2. No content area with sufficient data is below the floor (70%)
 * 3. Performance is consistent across content areas
 */
export function assessReadiness(
  overallScore: number,
  contentAreaGaps: ContentAreaGap[],
  consistency: ConsistencyMetrics
): ReadinessAssessment {
  const reasons: string[] = [];

  const overallScoreMet = overallScore >= CONFIG.RECOMMENDED_SCORE;
  const noContentAreaGaps = contentAreaGaps.length === 0;
  const isConsistent = consistency.isConsistent;

  if (!overallScoreMet) {
    const pointsNeeded = CONFIG.RECOMMENDED_SCORE - overallScore;
    reasons.push(`Overall score ${overallScore}% is ${pointsNeeded} points below the recommended ${CONFIG.RECOMMENDED_SCORE}%`);
  }

  if (!noContentAreaGaps) {
    const gapCount = contentAreaGaps.length;
    const worstGap = contentAreaGaps[0]; // Already sorted by weakest
    if (gapCount === 1) {
      reasons.push(`${worstGap.name.split(',')[0]} is at ${worstGap.score}%, needs ${worstGap.pointsToThreshold} more points to reach ${CONFIG.CONTENT_AREA_MINIMUM}%`);
    } else {
      reasons.push(`${gapCount} content areas are below ${CONFIG.CONTENT_AREA_MINIMUM}% minimum`);
    }
  }

  if (!isConsistent && consistency.inconsistentAreas.length > 0) {
    reasons.push(`Performance varies significantly - ${consistency.inconsistentAreas.join(', ')} below average`);
  }

  return {
    isReady: overallScoreMet && noContentAreaGaps && isConsistent,
    reasons,
    overallScoreMet,
    noContentAreaGaps,
    isConsistent,
  };
}

/**
 * Get the AICPA content area for a given topic
 */
export function getContentArea(section: string, topic: string | null): string | null {
  if (!topic) return null;
  const sectionMapping = TOPIC_TO_CONTENT_AREA[section];
  if (!sectionMapping) return null;
  return sectionMapping[topic] || null;
}

/**
 * Calculate recency weight using exponential decay
 * More recent attempts are weighted higher
 */
function calculateRecencyWeight(createdAt: string): number {
  const daysSince = (Date.now() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24);
  // Exponential decay with configurable half-life
  return Math.exp(-daysSince * Math.LN2 / CONFIG.RECENCY_HALF_LIFE_DAYS);
}

/**
 * Calculate difficulty weight
 */
function getDifficultyWeight(difficulty?: 'easy' | 'medium' | 'hard'): number {
  return CONFIG.DIFFICULTY_WEIGHTS[difficulty || 'medium'];
}

/**
 * Calculate MCQ score for a section using AICPA content area weighting
 */
function calculateMCQScore(
  attempts: PracticeAttemptData[],
  section: SectionCode
): { score: number; contentAreaScores: ContentAreaScore[] } {
  const contentAreaWeights = AICPA_CONTENT_AREA_WEIGHTS[section];
  if (!contentAreaWeights) {
    return { score: 0, contentAreaScores: [] };
  }

  const contentAreaScores: ContentAreaScore[] = [];
  let totalWeightedScore = 0;
  let totalWeight = 0;

  for (const [areaCode, areaInfo] of Object.entries(contentAreaWeights)) {
    // Get attempts for this content area
    const areaAttempts = attempts.filter(a => {
      const attemptArea = getContentArea(section, a.topic);
      return attemptArea === areaCode;
    });

    // Group by question_id and calculate best performance with recency weighting
    const questionResults = new Map<string, {
      isCorrect: boolean;
      weight: number;
    }>();

    // Sort by date to process older attempts first
    const sortedAttempts = [...areaAttempts].sort(
      (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    for (const attempt of sortedAttempts) {
      const recencyWeight = calculateRecencyWeight(attempt.created_at);
      const difficultyWeight = getDifficultyWeight(attempt.difficulty);
      const totalAttemptWeight = difficultyWeight * (0.5 + 0.5 * recencyWeight);

      const existing = questionResults.get(attempt.question_id);

      // Keep the correct answer if any attempt was correct
      // Otherwise, use the most recent attempt's weight
      if (!existing) {
        questionResults.set(attempt.question_id, {
          isCorrect: attempt.is_correct,
          weight: totalAttemptWeight,
        });
      } else {
        questionResults.set(attempt.question_id, {
          isCorrect: existing.isCorrect || attempt.is_correct,
          weight: totalAttemptWeight, // Use more recent weight
        });
      }
    }

    // Calculate raw score for this content area
    let weightedCorrect = 0;
    let weightedTotal = 0;

    for (const result of questionResults.values()) {
      if (result.isCorrect) {
        weightedCorrect += result.weight;
      }
      weightedTotal += result.weight;
    }

    const questionsAttempted = questionResults.size;
    const minThresholdMet = questionsAttempted >= CONFIG.MIN_QUESTIONS_PER_CONTENT_AREA;

    // Calculate raw score (0-100)
    const rawScore = weightedTotal > 0 ? (weightedCorrect / weightedTotal) * 100 : 0;

    // Apply coverage penalty if below minimum threshold
    const coverageFactor = minThresholdMet ? 1 : questionsAttempted / CONFIG.MIN_QUESTIONS_PER_CONTENT_AREA;
    const adjustedScore = rawScore * coverageFactor;

    // Apply AICPA weight
    const weightedScore = adjustedScore * (areaInfo.mid / 100);

    contentAreaScores.push({
      contentArea: areaCode,
      name: areaInfo.name,
      weight: areaInfo.mid,
      rawScore: Math.round(rawScore),
      weightedScore,
      questionsAttempted,
      minThresholdMet,
    });

    totalWeightedScore += weightedScore;
    totalWeight += areaInfo.mid / 100;
  }

  const finalScore = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;

  return {
    score: Math.round(finalScore),
    contentAreaScores,
  };
}

/**
 * Calculate TBS score for a section
 */
function calculateTBSScore(attempts: TBSAttemptData[], section: SectionCode): number {
  // Only count completed TBS with scores
  const completedAttempts = attempts.filter(
    a => a.section === section && a.is_complete && a.score_percentage !== null
  );

  if (completedAttempts.length === 0) {
    return 0;
  }

  // Group by TBS ID and take best score with recency weighting
  const tbsResults = new Map<string, { score: number; recencyWeight: number }>();

  for (const attempt of completedAttempts) {
    const recencyWeight = calculateRecencyWeight(attempt.created_at);
    const existing = tbsResults.get(attempt.tbs_id);

    if (!existing || attempt.score_percentage! > existing.score) {
      tbsResults.set(attempt.tbs_id, {
        score: attempt.score_percentage!,
        recencyWeight,
      });
    }
  }

  // Calculate weighted average
  let weightedScore = 0;
  let totalWeight = 0;

  for (const result of tbsResults.values()) {
    const weight = 0.5 + 0.5 * result.recencyWeight;
    weightedScore += result.score * weight;
    totalWeight += weight;
  }

  const rawScore = totalWeight > 0 ? weightedScore / totalWeight : 0;

  // Apply coverage penalty if below minimum TBS threshold
  const coverageFactor = tbsResults.size >= CONFIG.MIN_TBS_PER_SECTION
    ? 1
    : tbsResults.size / CONFIG.MIN_TBS_PER_SECTION;

  return Math.round(rawScore * coverageFactor);
}

/**
 * Generate recommended actions based on scores
 * Updated to use stricter gap detection thresholds
 */
function generateRecommendedActions(
  contentAreaScores: ContentAreaScore[],
  mcqScore: number,
  tbsScore: number,
  hasTBSData: boolean
): string[] {
  const actions: string[] = [];

  // Check for content area gaps (areas below 70% with sufficient data) - HIGHEST PRIORITY
  const gapAreas = contentAreaScores.filter(
    ca => ca.questionsAttempted >= CONFIG.MIN_QUESTIONS_FOR_GAP_DETECTION &&
          ca.rawScore < CONFIG.CONTENT_AREA_MINIMUM
  );
  if (gapAreas.length > 0) {
    const weakestArea = gapAreas.sort((a, b) => a.rawScore - b.rawScore)[0];
    const pointsNeeded = CONFIG.CONTENT_AREA_MINIMUM - weakestArea.rawScore;
    actions.push(`Focus on ${weakestArea.name.split(',')[0]} (${weakestArea.rawScore}%) - need ${pointsNeeded} more points`);
  }

  // Check for content areas below coverage threshold
  const lowCoverageAreas = contentAreaScores.filter(ca => !ca.minThresholdMet && ca.weight >= 15);
  if (lowCoverageAreas.length > 0) {
    const areaNames = lowCoverageAreas.slice(0, 2).map(ca => ca.name.split(',')[0]).join(' and ');
    actions.push(`Practice more MCQs in ${areaNames} to meet minimum coverage`);
  }

  // TBS recommendations
  if (!hasTBSData) {
    actions.push('Start practicing Task-Based Simulations to build complete exam readiness');
  } else if (tbsScore < 70) {
    actions.push('Continue practicing TBS questions to improve simulation performance');
  }

  // Overall score recommendations
  if (mcqScore < CONFIG.RECOMMENDED_SCORE && mcqScore >= 60) {
    const pointsNeeded = CONFIG.RECOMMENDED_SCORE - mcqScore;
    actions.push(`${pointsNeeded} more points needed to reach recommended score of ${CONFIG.RECOMMENDED_SCORE}`);
  }

  return actions.slice(0, 3); // Max 3 recommendations
}

/**
 * Main function to calculate Prime Meridian score
 */
export function calculatePrimeMeridianScore(
  mcqAttempts: PracticeAttemptData[],
  tbsAttempts: TBSAttemptData[],
  section: SectionCode
): PrimeMeridianResult {
  // Calculate MCQ component
  const { score: mcqScore, contentAreaScores } = calculateMCQScore(mcqAttempts, section);

  // Calculate TBS component
  const tbsScore = calculateTBSScore(tbsAttempts, section);

  // Determine weights based on what data is available
  const hasMCQData = mcqAttempts.length > 0;
  const hasTBSData = tbsAttempts.filter(a => a.section === section && a.is_complete).length > 0;

  let mcqWeight: number;
  let tbsWeight: number;
  let overallScore: number;

  if (hasMCQData && hasTBSData) {
    // Both MCQ and TBS data - use 50/50 split
    mcqWeight = CONFIG.MCQ_WEIGHT;
    tbsWeight = CONFIG.TBS_WEIGHT;
    overallScore = Math.round(mcqScore * mcqWeight + tbsScore * tbsWeight);
  } else if (hasMCQData) {
    // Only MCQ data
    mcqWeight = 1;
    tbsWeight = 0;
    overallScore = mcqScore;
  } else if (hasTBSData) {
    // Only TBS data
    mcqWeight = 0;
    tbsWeight = 1;
    overallScore = tbsScore;
  } else {
    // No data
    mcqWeight = 0.5;
    tbsWeight = 0.5;
    overallScore = 0;
  }

  // Generate recommendations
  const recommendedActions = generateRecommendedActions(
    contentAreaScores,
    mcqScore,
    tbsScore,
    hasTBSData
  );

  // Determine if there's enough data for a meaningful score
  const totalQuestions = contentAreaScores.reduce((sum, ca) => sum + ca.questionsAttempted, 0);
  const hasEnoughData = totalQuestions >= CONFIG.MIN_TOTAL_QUESTIONS_FOR_MEANINGFUL_SCORE || hasTBSData;

  // Identify content area gaps (areas below 70% with sufficient data)
  const contentAreaGaps = identifyContentAreaGaps(contentAreaScores);
  const hasGaps = contentAreaGaps.length > 0;

  // Calculate consistency metrics (variance across content areas)
  const consistency = calculateConsistencyMetrics(contentAreaScores);

  // Analyze time patterns for suspicious answering behavior
  const timeAnalytics = analyzeTimePatterns(mcqAttempts);

  // Analyze engagement with explanations
  const engagement = analyzeEngagement(mcqAttempts);

  // Assess overall readiness using strict criteria (score + gaps + consistency)
  const readinessAssessment = assessReadiness(overallScore, contentAreaGaps, consistency);

  return {
    overallScore,
    mcqScore,
    tbsScore,
    mcqWeight,
    tbsWeight,
    contentAreaScores,
    hasEnoughData,
    recommendedActions,
    contentAreaGaps,
    hasGaps,
    consistency,
    timeAnalytics,
    engagement,
    readinessAssessment,
  };
}

/**
 * Get milestone information for a given score
 */
export interface PrimeMeridianMilestone {
  level: 'building' | 'developing' | 'approaching' | 'recommended' | 'strong';
  label: string;
  color: string;
  bgColor: string;
  message: string;
  isRecommended: boolean;
}

export function getPrimeMeridianMilestone(score: number): PrimeMeridianMilestone {
  // Stricter thresholds: We grade conservatively because the CPA exam is unforgiving.
  // If Meridian says you're ready, you actually are.
  if (score >= 85) {
    return {
      level: 'strong',
      label: 'Strong',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-500',
      message: 'Excellent preparation! You\'ve exceeded our recommended score.',
      isRecommended: false,
    };
  }
  // Raised from 75 to 80 for stricter standards
  if (score >= 80) {
    return {
      level: 'recommended',
      label: 'Recommended',
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-500',
      message: 'You\'ve reached our recommended score. Students at this level typically pass.',
      isRecommended: true,
    };
  }
  // Raised from 65 to 70 for stricter standards
  if (score >= 70) {
    return {
      level: 'approaching',
      label: 'Approaching',
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-500',
      message: `${80 - score} points away from our recommended score of 80.`,
      isRecommended: false,
    };
  }
  // Raised from 50 to 55 for stricter standards
  if (score >= 55) {
    return {
      level: 'developing',
      label: 'Developing',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-500',
      message: 'Building a solid foundation. Keep practicing consistently.',
      isRecommended: false,
    };
  }
  return {
    level: 'building',
    label: 'Building',
    color: 'text-red-500 dark:text-red-400',
    bgColor: 'bg-red-400',
    message: 'Just getting started! Every question helps build your knowledge.',
    isRecommended: false,
  };
}

export { CONFIG as PRIME_MERIDIAN_CONFIG };

/**
 * Color Coding Standards for Readiness Display
 *
 * These standards ensure consistent visual feedback across all readiness
 * components (AICPA Content Area Breakdown, MCQ Topic Readiness, TBS Topic Readiness).
 *
 * COVERAGE (Bar Width & Color) - Represents practice volume
 * ============================================================
 * Bar width = (questionsAttempted / totalAvailable) * 100
 * Bar color based on coverage percentage:
 *   - >= 70% coverage: green  (bg-green-500) - Well covered
 *   - >= 25% coverage: yellow (bg-yellow-500) - In progress
 *   - > 0% coverage:   red    (bg-red-400) - Just started
 *   - 0% coverage:     gray   (bg-gray-300 dark:bg-gray-600) - Not started
 *
 * ACCURACY (Text Color) - Represents performance quality
 * ============================================================
 * Accuracy = (correctAnswers / questionsAttempted) * 100
 * Text color based on accuracy percentage:
 *   - >= 75% accuracy: green  (text-green-600 dark:text-green-400) - Strong
 *   - >= 50% accuracy: yellow (text-yellow-600 dark:text-yellow-400) - Developing
 *   - > 0% accuracy:   red    (text-red-600 dark:text-red-400) - Needs work
 *   - No data:         gray   (text-gray-400) - Not started
 */
export const READINESS_COLOR_THRESHOLDS = {
  coverage: {
    excellent: 70,  // >= 70% = green
    moderate: 25,   // >= 25% = yellow
    low: 0,         // > 0% = red, 0% = gray
  },
  accuracy: {
    strong: 75,     // >= 75% = green
    developing: 50, // >= 50% = yellow
    needsWork: 0,   // > 0% = red, no data = gray
  },
} as const;

/**
 * Get coverage bar color class based on coverage percentage
 */
export function getCoverageBarColor(coveragePercent: number): string {
  if (coveragePercent >= READINESS_COLOR_THRESHOLDS.coverage.excellent) {
    return 'bg-green-500';
  }
  if (coveragePercent >= READINESS_COLOR_THRESHOLDS.coverage.moderate) {
    return 'bg-yellow-500';
  }
  if (coveragePercent > 0) {
    return 'bg-red-400';
  }
  return 'bg-gray-300 dark:bg-gray-600';
}

/**
 * Get accuracy text color class based on accuracy percentage
 */
export function getAccuracyTextColor(accuracy: number | null): string {
  if (accuracy === null || accuracy === 0) {
    return 'text-gray-400';
  }
  if (accuracy >= READINESS_COLOR_THRESHOLDS.accuracy.strong) {
    return 'text-green-600 dark:text-green-400';
  }
  if (accuracy >= READINESS_COLOR_THRESHOLDS.accuracy.developing) {
    return 'text-yellow-600 dark:text-yellow-400';
  }
  return 'text-red-600 dark:text-red-400';
}
