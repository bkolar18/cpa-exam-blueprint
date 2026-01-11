// Meridian CPA Review Taxonomy
// Based on AICPA Meridian CPA Reviews (2024)
// Study hours and question targets based on industry recommendations

export interface SubtopicInfo {
  name: string;
  weight: number; // Percentage of topic
}

export interface TopicInfo {
  name: string;
  weight: number; // Percentage of section
  subtopics: SubtopicInfo[];
}

export interface SectionTaxonomy {
  section: string;
  sectionName: string;
  studyHours: { min: number; max: number };
  targetQuestions: number;
  topics: TopicInfo[];
}

// ============================================
// FAR - Financial Accounting & Reporting
// Study Hours: 400-500 | Target: 1,500 questions
// ============================================
export const farTaxonomy: SectionTaxonomy = {
  section: 'FAR',
  sectionName: 'Financial Accounting & Reporting',
  studyHours: { min: 400, max: 500 },
  targetQuestions: 1500,
  topics: [
    {
      name: 'Conceptual Framework & Standards',
      weight: 8,
      subtopics: [
        { name: 'FASB Conceptual Framework', weight: 30 },
        { name: 'Qualitative Characteristics', weight: 25 },
        { name: 'Elements of Financial Statements', weight: 25 },
        { name: 'Recognition & Measurement', weight: 20 },
      ],
    },
    {
      name: 'Financial Statement Presentation',
      weight: 12,
      subtopics: [
        { name: 'Balance Sheet Classification', weight: 20 },
        { name: 'Income Statement Presentation', weight: 20 },
        { name: 'Statement of Cash Flows', weight: 25 },
        { name: 'Statement of Comprehensive Income', weight: 15 },
        { name: "Statement of Stockholders' Equity", weight: 10 },
        { name: 'Notes to Financial Statements', weight: 10 },
      ],
    },
    {
      name: 'Revenue Recognition',
      weight: 10,
      subtopics: [
        { name: 'ASC 606 Five-Step Model', weight: 30 },
        { name: 'Identifying Performance Obligations', weight: 20 },
        { name: 'Transaction Price Allocation', weight: 20 },
        { name: 'Variable Consideration', weight: 15 },
        { name: 'Contract Modifications', weight: 10 },
        { name: 'Principal vs Agent', weight: 5 },
      ],
    },
    {
      name: 'Inventory',
      weight: 6,
      subtopics: [
        { name: 'Cost Flow Assumptions (FIFO, LIFO, Average)', weight: 35 },
        { name: 'Lower of Cost or Net Realizable Value', weight: 25 },
        { name: 'Inventory Estimation Methods', weight: 20 },
        { name: 'Purchase Commitments', weight: 10 },
        { name: 'Inventory Errors', weight: 10 },
      ],
    },
    {
      name: 'Property, Plant & Equipment',
      weight: 8,
      subtopics: [
        { name: 'Initial Measurement & Capitalization', weight: 25 },
        { name: 'Depreciation Methods', weight: 25 },
        { name: 'Impairment of Long-Lived Assets', weight: 20 },
        { name: 'Asset Retirement Obligations', weight: 15 },
        { name: 'Nonmonetary Exchanges', weight: 15 },
      ],
    },
    {
      name: 'Intangible Assets',
      weight: 5,
      subtopics: [
        { name: 'Goodwill & Impairment', weight: 35 },
        { name: 'Identifiable Intangibles', weight: 25 },
        { name: 'Research & Development Costs', weight: 20 },
        { name: 'Software Development Costs', weight: 20 },
      ],
    },
    {
      name: 'Investments',
      weight: 8,
      subtopics: [
        { name: 'Debt Securities Classification', weight: 25 },
        { name: 'Equity Method Investments', weight: 30 },
        { name: 'Fair Value Option', weight: 15 },
        { name: 'Equity Securities at Fair Value', weight: 15 },
        { name: 'Impairment of Investments', weight: 15 },
      ],
    },
    {
      name: 'Leases',
      weight: 8,
      subtopics: [
        { name: 'Lease Classification', weight: 20 },
        { name: 'Lessee Accounting - Finance Lease', weight: 25 },
        { name: 'Lessee Accounting - Operating Lease', weight: 25 },
        { name: 'Lessor Accounting', weight: 15 },
        { name: 'Sale-Leaseback Transactions', weight: 15 },
      ],
    },
    {
      name: 'Liabilities',
      weight: 8,
      subtopics: [
        { name: 'Bonds Payable & Amortization', weight: 30 },
        { name: 'Troubled Debt Restructuring', weight: 20 },
        { name: 'Contingencies & Provisions', weight: 20 },
        { name: 'Compensated Absences', weight: 15 },
        { name: 'Exit & Disposal Costs', weight: 15 },
      ],
    },
    {
      name: "Stockholders' Equity",
      weight: 6,
      subtopics: [
        { name: 'Common & Preferred Stock', weight: 25 },
        { name: 'Treasury Stock Transactions', weight: 25 },
        { name: 'Stock Dividends & Splits', weight: 20 },
        { name: 'Retained Earnings & Appropriations', weight: 15 },
        { name: 'Book Value Per Share', weight: 15 },
      ],
    },
    {
      name: 'Stock-Based Compensation',
      weight: 4,
      subtopics: [
        { name: 'Stock Options', weight: 40 },
        { name: 'Restricted Stock', weight: 30 },
        { name: 'Stock Appreciation Rights', weight: 15 },
        { name: 'Employee Stock Purchase Plans', weight: 15 },
      ],
    },
    {
      name: 'Income Taxes',
      weight: 7,
      subtopics: [
        { name: 'Deferred Tax Assets & Liabilities', weight: 35 },
        { name: 'Temporary vs Permanent Differences', weight: 25 },
        { name: 'Valuation Allowance', weight: 20 },
        { name: 'Intraperiod Tax Allocation', weight: 10 },
        { name: 'Uncertain Tax Positions', weight: 10 },
      ],
    },
    {
      name: 'Business Combinations',
      weight: 5,
      subtopics: [
        { name: 'Acquisition Method', weight: 40 },
        { name: 'Measurement Period Adjustments', weight: 20 },
        { name: 'Contingent Consideration', weight: 20 },
        { name: 'Bargain Purchases', weight: 20 },
      ],
    },
    {
      name: 'Consolidations',
      weight: 8,
      subtopics: [
        { name: 'Consolidation Procedures', weight: 30 },
        { name: 'Intercompany Transactions', weight: 25 },
        { name: 'Noncontrolling Interests', weight: 20 },
        { name: 'Variable Interest Entities', weight: 15 },
        { name: 'Changes in Ownership', weight: 10 },
      ],
    },
    {
      name: 'Foreign Currency',
      weight: 4,
      subtopics: [
        { name: 'Foreign Currency Transactions', weight: 35 },
        { name: 'Translation vs Remeasurement', weight: 35 },
        { name: 'Hedging Foreign Currency Risk', weight: 30 },
      ],
    },
    {
      name: 'Government Accounting',
      weight: 10,
      subtopics: [
        { name: 'Fund Accounting Basics', weight: 20 },
        { name: 'Governmental Fund Types', weight: 20 },
        { name: 'Government-Wide Statements', weight: 20 },
        { name: 'Budgetary Accounting', weight: 15 },
        { name: 'Capital Assets & Long-Term Liabilities', weight: 15 },
        { name: 'Fiduciary Funds', weight: 10 },
      ],
    },
    {
      name: 'Not-for-Profit Accounting',
      weight: 8,
      subtopics: [
        { name: 'Net Asset Classifications', weight: 25 },
        { name: 'Contributions & Pledges', weight: 30 },
        { name: 'Financial Statement Presentation', weight: 20 },
        { name: 'Healthcare Organizations', weight: 15 },
        { name: 'Colleges & Universities', weight: 10 },
      ],
    },
  ],
};

// ============================================
// AUD - Auditing & Attestation
// Study Hours: 300-350 | Target: 1,000 questions
// ============================================
export const audTaxonomy: SectionTaxonomy = {
  section: 'AUD',
  sectionName: 'Auditing & Attestation',
  studyHours: { min: 300, max: 350 },
  targetQuestions: 1000,
  topics: [
    {
      name: 'Professional Responsibilities & Ethics',
      weight: 15,
      subtopics: [
        { name: 'AICPA Code of Professional Conduct', weight: 35 },
        { name: 'Independence Requirements', weight: 30 },
        { name: 'Quality Management Standards', weight: 20 },
        { name: 'Sarbanes-Oxley Requirements', weight: 15 },
      ],
    },
    {
      name: 'Engagement Planning',
      weight: 12,
      subtopics: [
        { name: 'Audit Engagement Acceptance', weight: 25 },
        { name: 'Understanding the Entity', weight: 25 },
        { name: 'Materiality Determination', weight: 20 },
        { name: 'Audit Strategy & Planning', weight: 15 },
        { name: 'Using the Work of Others', weight: 15 },
      ],
    },
    {
      name: 'Risk Assessment',
      weight: 15,
      subtopics: [
        { name: 'Audit Risk Model', weight: 25 },
        { name: 'Internal Control Evaluation', weight: 25 },
        { name: 'Fraud Risk Assessment', weight: 25 },
        { name: 'Identifying Significant Risks', weight: 15 },
        { name: 'IT General Controls', weight: 10 },
      ],
    },
    {
      name: 'Evidence & Procedures',
      weight: 18,
      subtopics: [
        { name: 'Types of Audit Evidence', weight: 20 },
        { name: 'Audit Sampling', weight: 20 },
        { name: 'Analytical Procedures', weight: 20 },
        { name: 'Substantive Testing', weight: 20 },
        { name: 'Tests of Controls', weight: 10 },
        { name: 'External Confirmations', weight: 10 },
      ],
    },
    {
      name: 'Specific Audit Areas',
      weight: 15,
      subtopics: [
        { name: 'Revenue & Receivables', weight: 20 },
        { name: 'Inventory Procedures', weight: 20 },
        { name: 'Property, Plant & Equipment', weight: 15 },
        { name: 'Investments & Derivatives', weight: 15 },
        { name: 'Liabilities & Equity', weight: 15 },
        { name: 'Related Party Transactions', weight: 15 },
      ],
    },
    {
      name: 'Completing the Audit',
      weight: 10,
      subtopics: [
        { name: 'Subsequent Events', weight: 25 },
        { name: 'Going Concern Evaluation', weight: 25 },
        { name: 'Management Representations', weight: 20 },
        { name: 'Communication with Governance', weight: 15 },
        { name: 'Documentation Requirements', weight: 15 },
      ],
    },
    {
      name: 'Audit Reports',
      weight: 15,
      subtopics: [
        { name: 'Unmodified Opinion', weight: 25 },
        { name: 'Modified Opinions', weight: 30 },
        { name: 'Emphasis of Matter Paragraphs', weight: 15 },
        { name: 'Group Audits', weight: 15 },
        { name: 'Comparative Financial Statements', weight: 15 },
      ],
    },
    {
      name: 'Other Engagements',
      weight: 10,
      subtopics: [
        { name: 'Reviews of Financial Statements', weight: 30 },
        { name: 'Compilations', weight: 20 },
        { name: 'Attestation Engagements', weight: 25 },
        { name: 'Agreed-Upon Procedures', weight: 15 },
        { name: 'Comfort Letters', weight: 10 },
      ],
    },
  ],
};

// ============================================
// REG - Regulation
// Study Hours: 350-400 | Target: 1,200 questions
// ============================================
export const regTaxonomy: SectionTaxonomy = {
  section: 'REG',
  sectionName: 'Regulation',
  studyHours: { min: 350, max: 400 },
  targetQuestions: 1200,
  topics: [
    {
      name: 'Ethics & Professional Responsibility',
      weight: 10,
      subtopics: [
        { name: 'Treasury Circular 230', weight: 40 },
        { name: 'Tax Return Preparer Penalties', weight: 30 },
        { name: 'Taxpayer Penalties', weight: 20 },
        { name: 'Privileged Communications', weight: 10 },
      ],
    },
    {
      name: 'Business Law',
      weight: 15,
      subtopics: [
        { name: 'Contracts', weight: 30 },
        { name: 'Agency', weight: 20 },
        { name: 'Debtor-Creditor Relationships', weight: 20 },
        { name: 'Business Structures', weight: 15 },
        { name: 'Federal Securities Regulation', weight: 15 },
      ],
    },
    {
      name: 'Individual Taxation',
      weight: 25,
      subtopics: [
        { name: 'Gross Income & Exclusions', weight: 20 },
        { name: 'Adjustments to Income', weight: 15 },
        { name: 'Itemized Deductions', weight: 15 },
        { name: 'Tax Credits', weight: 15 },
        { name: 'Filing Status & Dependents', weight: 10 },
        { name: 'Alternative Minimum Tax', weight: 10 },
        { name: 'Self-Employment Tax', weight: 10 },
        { name: 'Passive Activity Rules', weight: 5 },
      ],
    },
    {
      name: 'Property Transactions',
      weight: 15,
      subtopics: [
        { name: 'Basis of Assets', weight: 25 },
        { name: 'Capital Gains & Losses', weight: 25 },
        { name: 'Section 1231 Assets', weight: 15 },
        { name: 'Depreciation Recapture', weight: 15 },
        { name: 'Like-Kind Exchanges', weight: 10 },
        { name: 'Installment Sales', weight: 10 },
      ],
    },
    {
      name: 'Corporate Taxation',
      weight: 15,
      subtopics: [
        { name: 'Formation & Basis', weight: 20 },
        { name: 'Corporate Income & Deductions', weight: 25 },
        { name: 'Distributions to Shareholders', weight: 20 },
        { name: 'Corporate Liquidations', weight: 15 },
        { name: 'Corporate Reorganizations', weight: 10 },
        { name: 'Consolidated Returns', weight: 10 },
      ],
    },
    {
      name: 'Partnership Taxation',
      weight: 12,
      subtopics: [
        { name: 'Partnership Formation', weight: 20 },
        { name: 'Partner Basis Calculations', weight: 25 },
        { name: 'Partnership Operations', weight: 20 },
        { name: 'Partnership Distributions', weight: 15 },
        { name: 'Sales of Partnership Interests', weight: 10 },
        { name: 'Special Allocations', weight: 10 },
      ],
    },
    {
      name: 'S Corporation Taxation',
      weight: 8,
      subtopics: [
        { name: 'S Corporation Election & Requirements', weight: 25 },
        { name: 'Shareholder Basis', weight: 30 },
        { name: 'Built-In Gains Tax', weight: 20 },
        { name: 'Distributions from S Corps', weight: 25 },
      ],
    },
  ],
};

// ============================================
// TCP - Tax Compliance & Planning
// Study Hours: 250-300 | Target: 800 questions
// ============================================
export const tcpTaxonomy: SectionTaxonomy = {
  section: 'TCP',
  sectionName: 'Tax Compliance & Planning',
  studyHours: { min: 250, max: 300 },
  targetQuestions: 800,
  topics: [
    {
      name: 'Individual Tax Planning',
      weight: 25,
      subtopics: [
        { name: 'Tax Planning Strategies', weight: 30 },
        { name: 'Retirement Planning', weight: 25 },
        { name: 'Education Tax Benefits', weight: 15 },
        { name: 'Investment Income Planning', weight: 15 },
        { name: 'Estimated Tax Payments', weight: 15 },
      ],
    },
    {
      name: 'Entity Tax Planning',
      weight: 25,
      subtopics: [
        { name: 'Entity Selection', weight: 30 },
        { name: 'Compensation Planning', weight: 25 },
        { name: 'Qualified Business Income Deduction', weight: 20 },
        { name: 'Business Tax Credits', weight: 15 },
        { name: 'State Tax Planning', weight: 10 },
      ],
    },
    {
      name: 'Property Transactions Planning',
      weight: 15,
      subtopics: [
        { name: 'Timing of Gain Recognition', weight: 35 },
        { name: 'Installment Sale Planning', weight: 25 },
        { name: 'Like-Kind Exchange Planning', weight: 25 },
        { name: 'Opportunity Zones', weight: 15 },
      ],
    },
    {
      name: 'Gift & Estate Tax',
      weight: 15,
      subtopics: [
        { name: 'Gift Tax Rules & Exclusions', weight: 30 },
        { name: 'Estate Tax Calculation', weight: 25 },
        { name: 'Generation-Skipping Transfer Tax', weight: 20 },
        { name: 'Marital Deduction Planning', weight: 15 },
        { name: 'Valuation Issues', weight: 10 },
      ],
    },
    {
      name: 'Tax Research & Communication',
      weight: 10,
      subtopics: [
        { name: 'Primary Sources of Tax Law', weight: 35 },
        { name: 'Tax Research Methodology', weight: 30 },
        { name: 'IRS Administrative Procedures', weight: 20 },
        { name: 'Client Communication', weight: 15 },
      ],
    },
    {
      name: 'Multijurisdictional Taxation',
      weight: 10,
      subtopics: [
        { name: 'Nexus & Apportionment', weight: 35 },
        { name: 'International Tax Basics', weight: 30 },
        { name: 'Transfer Pricing', weight: 20 },
        { name: 'Tax Treaties', weight: 15 },
      ],
    },
  ],
};

// ============================================
// BAR - Business Analysis & Reporting
// Study Hours: 150-200 | Target: 500 questions
// ============================================
export const barTaxonomy: SectionTaxonomy = {
  section: 'BAR',
  sectionName: 'Business Analysis & Reporting',
  studyHours: { min: 150, max: 200 },
  targetQuestions: 500,
  topics: [
    {
      name: 'Financial Statement Analysis',
      weight: 25,
      subtopics: [
        { name: 'Ratio Analysis', weight: 35 },
        { name: 'Trend Analysis', weight: 25 },
        { name: 'Common-Size Statements', weight: 20 },
        { name: 'Prospective Financial Information', weight: 20 },
      ],
    },
    {
      name: 'Managerial Accounting',
      weight: 25,
      subtopics: [
        { name: 'Cost-Volume-Profit Analysis', weight: 25 },
        { name: 'Job & Process Costing', weight: 25 },
        { name: 'Variance Analysis', weight: 25 },
        { name: 'Budgeting & Forecasting', weight: 25 },
      ],
    },
    {
      name: 'Corporate Finance',
      weight: 20,
      subtopics: [
        { name: 'Time Value of Money', weight: 25 },
        { name: 'Capital Budgeting', weight: 30 },
        { name: 'Working Capital Management', weight: 25 },
        { name: 'Cost of Capital', weight: 20 },
      ],
    },
    {
      name: 'Economics',
      weight: 15,
      subtopics: [
        { name: 'Supply & Demand', weight: 30 },
        { name: 'Market Structures', weight: 25 },
        { name: 'Monetary & Fiscal Policy', weight: 25 },
        { name: 'International Trade', weight: 20 },
      ],
    },
    {
      name: 'Technical Accounting',
      weight: 15,
      subtopics: [
        { name: 'Derivatives & Hedging', weight: 35 },
        { name: 'Fair Value Measurements', weight: 35 },
        { name: 'Segment Reporting', weight: 30 },
      ],
    },
  ],
};

// ============================================
// ISC - Information Systems & Controls
// Study Hours: 150-200 | Target: 500 questions
// ============================================
export const iscTaxonomy: SectionTaxonomy = {
  section: 'ISC',
  sectionName: 'Information Systems & Controls',
  studyHours: { min: 150, max: 200 },
  targetQuestions: 500,
  topics: [
    {
      name: 'IT Governance',
      weight: 15,
      subtopics: [
        { name: 'IT Strategic Planning', weight: 30 },
        { name: 'IT Policies & Procedures', weight: 30 },
        { name: 'Roles & Responsibilities', weight: 20 },
        { name: 'Vendor Management', weight: 20 },
      ],
    },
    {
      name: 'IT General Controls',
      weight: 25,
      subtopics: [
        { name: 'Access Controls', weight: 30 },
        { name: 'Change Management', weight: 25 },
        { name: 'Program Development', weight: 20 },
        { name: 'Computer Operations', weight: 15 },
        { name: 'Physical & Environmental Controls', weight: 10 },
      ],
    },
    {
      name: 'Security & Privacy',
      weight: 25,
      subtopics: [
        { name: 'Cybersecurity Fundamentals', weight: 25 },
        { name: 'Data Privacy & Protection', weight: 25 },
        { name: 'Encryption & Authentication', weight: 20 },
        { name: 'Network Security', weight: 15 },
        { name: 'Incident Response', weight: 15 },
      ],
    },
    {
      name: 'System & Organization Controls (SOC)',
      weight: 20,
      subtopics: [
        { name: 'SOC 1 Reports', weight: 30 },
        { name: 'SOC 2 Reports', weight: 30 },
        { name: 'Trust Services Criteria', weight: 25 },
        { name: 'SOC for Cybersecurity', weight: 15 },
      ],
    },
    {
      name: 'Data Management',
      weight: 15,
      subtopics: [
        { name: 'Database Concepts', weight: 30 },
        { name: 'Data Analytics & Visualization', weight: 30 },
        { name: 'Data Quality & Integrity', weight: 25 },
        { name: 'Business Intelligence', weight: 15 },
      ],
    },
  ],
};

// Combined export
export const allTaxonomies: Record<string, SectionTaxonomy> = {
  FAR: farTaxonomy,
  AUD: audTaxonomy,
  REG: regTaxonomy,
  TCP: tcpTaxonomy,
  BAR: barTaxonomy,
  ISC: iscTaxonomy,
};

// Helper to get all subtopics for a section
export function getAllSubtopics(section: string): { topic: string; subtopic: string }[] {
  const taxonomy = allTaxonomies[section];
  if (!taxonomy) return [];

  const result: { topic: string; subtopic: string }[] = [];
  for (const topic of taxonomy.topics) {
    for (const subtopic of topic.subtopics) {
      result.push({ topic: topic.name, subtopic: subtopic.name });
    }
  }
  return result;
}

// Calculate target questions per topic
export function getQuestionTargets(section: string): { topic: string; subtopic: string; target: number }[] {
  const taxonomy = allTaxonomies[section];
  if (!taxonomy) return [];

  const result: { topic: string; subtopic: string; target: number }[] = [];
  for (const topic of taxonomy.topics) {
    const topicQuestions = Math.round((topic.weight / 100) * taxonomy.targetQuestions);
    for (const subtopic of topic.subtopics) {
      const subtopicQuestions = Math.round((subtopic.weight / 100) * topicQuestions);
      result.push({
        topic: topic.name,
        subtopic: subtopic.name,
        target: Math.max(subtopicQuestions, 5), // Minimum 5 questions per subtopic
      });
    }
  }
  return result;
}

// Summary stats
export function getTaxonomySummary() {
  let totalQuestions = 0;
  let totalSubtopics = 0;

  for (const section of Object.values(allTaxonomies)) {
    totalQuestions += section.targetQuestions;
    for (const topic of section.topics) {
      totalSubtopics += topic.subtopics.length;
    }
  }

  return {
    totalQuestions,
    totalSubtopics,
    sections: Object.keys(allTaxonomies).length,
  };
}
