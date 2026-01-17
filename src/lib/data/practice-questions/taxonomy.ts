// Meridian CPA Review Taxonomy
// Based on AICPA CPA Exam Blueprint (2026) - Effective January 1, 2026
// Topic names aligned with actual question bank data for accurate tracking
// Study hours and question targets based on industry recommendations
// Last reviewed: 2026-01-16

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
// Topics aligned with far.ts question data
// ============================================
export const farTaxonomy: SectionTaxonomy = {
  section: 'FAR',
  sectionName: 'Financial Accounting & Reporting',
  studyHours: { min: 400, max: 500 },
  targetQuestions: 1500,
  topics: [
    {
      name: 'Financial Statement Presentation',
      weight: 8,
      subtopics: [
        { name: 'Balance Sheet Classification', weight: 25 },
        { name: 'Income Statement Presentation', weight: 25 },
        { name: 'Notes to Financial Statements', weight: 25 },
        { name: 'Comprehensive Income', weight: 25 },
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
    {
      name: 'Government Accounting',
      weight: 8,
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
      name: 'Revenue Recognition',
      weight: 7,
      subtopics: [
        { name: 'ASC 606 Five-Step Model', weight: 30 },
        { name: 'Identifying Performance Obligations', weight: 20 },
        { name: 'Transaction Price Allocation', weight: 20 },
        { name: 'Variable Consideration', weight: 15 },
        { name: 'Contract Modifications', weight: 15 },
      ],
    },
    {
      name: 'Consolidations',
      weight: 6,
      subtopics: [
        { name: 'Consolidation Procedures', weight: 30 },
        { name: 'Intercompany Transactions', weight: 25 },
        { name: 'Noncontrolling Interests', weight: 20 },
        { name: 'Variable Interest Entities', weight: 15 },
        { name: 'Changes in Ownership', weight: 10 },
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
      weight: 6,
      subtopics: [
        { name: 'Initial Measurement & Capitalization', weight: 25 },
        { name: 'Depreciation Methods', weight: 25 },
        { name: 'Impairment of Long-Lived Assets', weight: 20 },
        { name: 'Asset Retirement Obligations', weight: 15 },
        { name: 'Nonmonetary Exchanges', weight: 15 },
      ],
    },
    {
      name: 'Leases',
      weight: 5,
      subtopics: [
        { name: 'Lease Classification', weight: 20 },
        { name: 'Lessee Accounting - Finance Lease', weight: 25 },
        { name: 'Lessee Accounting - Operating Lease', weight: 25 },
        { name: 'Lessor Accounting', weight: 15 },
        { name: 'Sale-Leaseback Transactions', weight: 15 },
      ],
    },
    {
      name: 'Investments',
      weight: 5,
      subtopics: [
        { name: 'Debt Securities Classification', weight: 25 },
        { name: 'Equity Method Investments', weight: 30 },
        { name: 'Fair Value Option', weight: 15 },
        { name: 'Equity Securities at Fair Value', weight: 15 },
        { name: 'Impairment of Investments', weight: 15 },
      ],
    },
    {
      name: 'Income Taxes',
      weight: 5,
      subtopics: [
        { name: 'Deferred Tax Assets & Liabilities', weight: 35 },
        { name: 'Temporary vs Permanent Differences', weight: 25 },
        { name: 'Valuation Allowance', weight: 20 },
        { name: 'Intraperiod Tax Allocation', weight: 10 },
        { name: 'Uncertain Tax Positions', weight: 10 },
      ],
    },
    {
      name: "Stockholders' Equity",
      weight: 5,
      subtopics: [
        { name: 'Common & Preferred Stock', weight: 25 },
        { name: 'Treasury Stock Transactions', weight: 25 },
        { name: 'Stock Dividends & Splits', weight: 20 },
        { name: 'Retained Earnings & Appropriations', weight: 15 },
        { name: 'Book Value Per Share', weight: 15 },
      ],
    },
    {
      name: 'IFRS',
      weight: 5,
      subtopics: [
        { name: 'IFRS vs US GAAP Differences', weight: 40 },
        { name: 'IFRS Financial Statements', weight: 30 },
        { name: 'IFRS Measurement & Recognition', weight: 30 },
      ],
    },
    {
      name: 'Conceptual Framework & Standards',
      weight: 4,
      subtopics: [
        { name: 'FASB Conceptual Framework', weight: 30 },
        { name: 'Qualitative Characteristics', weight: 25 },
        { name: 'Elements of Financial Statements', weight: 25 },
        { name: 'Recognition & Measurement', weight: 20 },
      ],
    },
    {
      name: 'Liabilities',
      weight: 4,
      subtopics: [
        { name: 'Bonds Payable & Amortization', weight: 30 },
        { name: 'Troubled Debt Restructuring', weight: 20 },
        { name: 'Contingencies & Provisions', weight: 20 },
        { name: 'Compensated Absences', weight: 15 },
        { name: 'Exit & Disposal Costs', weight: 15 },
      ],
    },
    {
      name: 'Statement of Cash Flows',
      weight: 4,
      subtopics: [
        { name: 'Operating Activities', weight: 35 },
        { name: 'Investing Activities', weight: 25 },
        { name: 'Financing Activities', weight: 25 },
        { name: 'Direct vs Indirect Method', weight: 15 },
      ],
    },
    {
      name: 'Intangible Assets',
      weight: 4,
      subtopics: [
        { name: 'Goodwill & Impairment', weight: 35 },
        { name: 'Identifiable Intangibles', weight: 25 },
        { name: 'Research & Development Costs', weight: 20 },
        { name: 'Software Development Costs', weight: 20 },
      ],
    },
    {
      name: 'Pensions',
      weight: 3,
      subtopics: [
        { name: 'Defined Benefit Plans', weight: 40 },
        { name: 'Pension Expense Components', weight: 30 },
        { name: 'Funded Status', weight: 30 },
      ],
    },
    {
      name: 'Long-term Debt',
      weight: 3,
      subtopics: [
        { name: 'Bond Issuance', weight: 35 },
        { name: 'Amortization Methods', weight: 35 },
        { name: 'Debt Modifications', weight: 30 },
      ],
    },
    {
      name: 'Earnings Per Share',
      weight: 3,
      subtopics: [
        { name: 'Basic EPS', weight: 40 },
        { name: 'Diluted EPS', weight: 40 },
        { name: 'Antidilutive Securities', weight: 20 },
      ],
    },
    {
      name: 'Business Combinations',
      weight: 2,
      subtopics: [
        { name: 'Acquisition Method', weight: 40 },
        { name: 'Measurement Period Adjustments', weight: 20 },
        { name: 'Contingent Consideration', weight: 20 },
        { name: 'Bargain Purchases', weight: 20 },
      ],
    },
    {
      name: 'Derivatives',
      weight: 2,
      subtopics: [
        { name: 'Derivative Instruments', weight: 40 },
        { name: 'Hedge Accounting', weight: 35 },
        { name: 'Fair Value Hedges', weight: 25 },
      ],
    },
    {
      name: 'Accounting Changes and Error Corrections',
      weight: 2,
      subtopics: [
        { name: 'Changes in Accounting Principle', weight: 35 },
        { name: 'Changes in Estimates', weight: 30 },
        { name: 'Error Corrections', weight: 35 },
      ],
    },
    {
      name: 'Foreign Currency',
      weight: 2,
      subtopics: [
        { name: 'Foreign Currency Transactions', weight: 35 },
        { name: 'Translation vs Remeasurement', weight: 35 },
        { name: 'Hedging Foreign Currency Risk', weight: 30 },
      ],
    },
    {
      name: 'Fair Value',
      weight: 2,
      subtopics: [
        { name: 'Fair Value Hierarchy', weight: 40 },
        { name: 'Valuation Techniques', weight: 35 },
        { name: 'Disclosures', weight: 25 },
      ],
    },
    {
      name: 'Stock-Based Compensation',
      weight: 2,
      subtopics: [
        { name: 'Stock Options', weight: 40 },
        { name: 'Restricted Stock', weight: 30 },
        { name: 'Stock Appreciation Rights', weight: 15 },
        { name: 'Employee Stock Purchase Plans', weight: 15 },
      ],
    },
  ],
};

// ============================================
// AUD - Auditing & Attestation
// Study Hours: 300-350 | Target: 1,000 questions
// Topics aligned with aud.ts question data
// ============================================
export const audTaxonomy: SectionTaxonomy = {
  section: 'AUD',
  sectionName: 'Auditing & Attestation',
  studyHours: { min: 300, max: 350 },
  targetQuestions: 1000,
  topics: [
    {
      name: 'Comprehensive Review',
      weight: 8,
      subtopics: [
        { name: 'Overall Audit Process', weight: 50 },
        { name: 'Integration Topics', weight: 50 },
      ],
    },
    {
      name: 'Risk Assessment',
      weight: 5,
      subtopics: [
        { name: 'Audit Risk Model', weight: 30 },
        { name: 'Identifying Significant Risks', weight: 35 },
        { name: 'Risk Response', weight: 35 },
      ],
    },
    {
      name: 'Internal Control',
      weight: 5,
      subtopics: [
        { name: 'Internal Control Components', weight: 30 },
        { name: 'Control Testing', weight: 35 },
        { name: 'Control Deficiencies', weight: 35 },
      ],
    },
    {
      name: 'Audit Evidence',
      weight: 5,
      subtopics: [
        { name: 'Types of Audit Evidence', weight: 35 },
        { name: 'Sufficient Appropriate Evidence', weight: 35 },
        { name: 'External Confirmations', weight: 30 },
      ],
    },
    {
      name: 'Audit Sampling',
      weight: 5,
      subtopics: [
        { name: 'Statistical Sampling', weight: 35 },
        { name: 'Nonstatistical Sampling', weight: 35 },
        { name: 'Sample Evaluation', weight: 30 },
      ],
    },
    {
      name: 'Audit Planning',
      weight: 5,
      subtopics: [
        { name: 'Audit Engagement Acceptance', weight: 30 },
        { name: 'Understanding the Entity', weight: 35 },
        { name: 'Materiality Determination', weight: 35 },
      ],
    },
    {
      name: 'Audit Reports',
      weight: 5,
      subtopics: [
        { name: 'Unmodified Opinion', weight: 25 },
        { name: 'Modified Opinions', weight: 35 },
        { name: 'Emphasis of Matter Paragraphs', weight: 20 },
        { name: 'Report Modifications', weight: 20 },
      ],
    },
    {
      name: 'Professional Ethics',
      weight: 5,
      subtopics: [
        { name: 'AICPA Code of Professional Conduct', weight: 40 },
        { name: 'Independence Requirements', weight: 35 },
        { name: 'Objectivity & Integrity', weight: 25 },
      ],
    },
    {
      name: 'Quality Control',
      weight: 5,
      subtopics: [
        { name: 'Quality Management Standards', weight: 40 },
        { name: 'Engagement Quality Review', weight: 30 },
        { name: 'Firm Policies', weight: 30 },
      ],
    },
    {
      name: 'Fraud',
      weight: 5,
      subtopics: [
        { name: 'Fraud Risk Assessment', weight: 40 },
        { name: 'Fraud Response', weight: 35 },
        { name: 'Fraud Indicators', weight: 25 },
      ],
    },
    {
      name: 'Revenue and Receivables',
      weight: 5,
      subtopics: [
        { name: 'Revenue Testing', weight: 50 },
        { name: 'Receivables Confirmation', weight: 50 },
      ],
    },
    {
      name: 'Inventory Auditing',
      weight: 5,
      subtopics: [
        { name: 'Inventory Observation', weight: 50 },
        { name: 'Inventory Valuation', weight: 50 },
      ],
    },
    {
      name: 'Subsequent Events',
      weight: 4,
      subtopics: [
        { name: 'Type I Events', weight: 50 },
        { name: 'Type II Events', weight: 50 },
      ],
    },
    {
      name: 'Going Concern',
      weight: 4,
      subtopics: [
        { name: 'Going Concern Evaluation', weight: 50 },
        { name: 'Management Plans', weight: 50 },
      ],
    },
    {
      name: 'Group Audits',
      weight: 4,
      subtopics: [
        { name: 'Component Auditors', weight: 50 },
        { name: 'Group Audit Procedures', weight: 50 },
      ],
    },
    {
      name: 'Using Work of Others',
      weight: 4,
      subtopics: [
        { name: 'Internal Auditors', weight: 35 },
        { name: 'Specialists', weight: 35 },
        { name: 'Service Organizations', weight: 30 },
      ],
    },
    {
      name: 'SSARS',
      weight: 4,
      subtopics: [
        { name: 'Compilation Engagements', weight: 40 },
        { name: 'Review Engagements', weight: 40 },
        { name: 'Preparation Engagements', weight: 20 },
      ],
    },
    {
      name: 'Attestation Engagements',
      weight: 4,
      subtopics: [
        { name: 'Examination Engagements', weight: 35 },
        { name: 'Review Engagements', weight: 35 },
        { name: 'Agreed-Upon Procedures', weight: 30 },
      ],
    },
    {
      name: 'Governance Communications',
      weight: 4,
      subtopics: [
        { name: 'Required Communications', weight: 50 },
        { name: 'Deficiency Communications', weight: 50 },
      ],
    },
    {
      name: 'Management Representations',
      weight: 3,
      subtopics: [
        { name: 'Written Representations', weight: 60 },
        { name: 'Oral Representations', weight: 40 },
      ],
    },
    {
      name: 'Audit Documentation',
      weight: 3,
      subtopics: [
        { name: 'Documentation Requirements', weight: 50 },
        { name: 'Workpaper Review', weight: 50 },
      ],
    },
    {
      name: 'Government Auditing',
      weight: 3,
      subtopics: [
        { name: 'Yellow Book', weight: 50 },
        { name: 'Single Audit', weight: 50 },
      ],
    },
  ],
};

// ============================================
// REG - Regulation
// Study Hours: 350-400 | Target: 1,200 questions
// Topics aligned with reg.ts question data
// ============================================
export const regTaxonomy: SectionTaxonomy = {
  section: 'REG',
  sectionName: 'Regulation',
  studyHours: { min: 350, max: 400 },
  targetQuestions: 1200,
  topics: [
    {
      name: 'Individual Taxation',
      weight: 20,
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
      weight: 18,
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
      name: 'Business Law',
      weight: 5,
      subtopics: [
        { name: 'General Principles', weight: 50 },
        { name: 'Legal Concepts', weight: 50 },
      ],
    },
    {
      name: 'Business Law - Contracts',
      weight: 4,
      subtopics: [
        { name: 'Contract Formation', weight: 35 },
        { name: 'Contract Performance', weight: 35 },
        { name: 'Breach & Remedies', weight: 30 },
      ],
    },
    {
      name: 'Business Law - Agency',
      weight: 3,
      subtopics: [
        { name: 'Agency Relationships', weight: 50 },
        { name: 'Principal & Agent Liability', weight: 50 },
      ],
    },
    {
      name: 'Business Law - Business Structures',
      weight: 3,
      subtopics: [
        { name: 'Entity Formation', weight: 50 },
        { name: 'Entity Operations', weight: 50 },
      ],
    },
    {
      name: 'Business Law - Bankruptcy',
      weight: 3,
      subtopics: [
        { name: 'Chapter 7', weight: 35 },
        { name: 'Chapter 11', weight: 35 },
        { name: 'Chapter 13', weight: 30 },
      ],
    },
    {
      name: 'Business Law - Securities Regulation',
      weight: 3,
      subtopics: [
        { name: 'Securities Act of 1933', weight: 50 },
        { name: 'Securities Exchange Act of 1934', weight: 50 },
      ],
    },
    {
      name: 'C Corporations',
      weight: 5,
      subtopics: [
        { name: 'Formation & Basis', weight: 25 },
        { name: 'Corporate Income & Deductions', weight: 30 },
        { name: 'Distributions', weight: 25 },
        { name: 'Liquidations', weight: 20 },
      ],
    },
    {
      name: 'Partnerships',
      weight: 5,
      subtopics: [
        { name: 'Partnership Formation', weight: 25 },
        { name: 'Partner Basis', weight: 30 },
        { name: 'Partnership Operations', weight: 25 },
        { name: 'Distributions', weight: 20 },
      ],
    },
    {
      name: 'S Corporations',
      weight: 4,
      subtopics: [
        { name: 'S Election & Requirements', weight: 30 },
        { name: 'Shareholder Basis', weight: 35 },
        { name: 'Distributions', weight: 35 },
      ],
    },
    {
      name: 'Tax Procedures',
      weight: 4,
      subtopics: [
        { name: 'IRS Procedures', weight: 40 },
        { name: 'Statute of Limitations', weight: 30 },
        { name: 'Tax Penalties', weight: 30 },
      ],
    },
    {
      name: 'Business Entities',
      weight: 4,
      subtopics: [
        { name: 'Entity Selection', weight: 50 },
        { name: 'Entity Taxation', weight: 50 },
      ],
    },
    {
      name: 'Estates and Trusts',
      weight: 4,
      subtopics: [
        { name: 'Estate Taxation', weight: 35 },
        { name: 'Trust Taxation', weight: 35 },
        { name: 'Income Distribution', weight: 30 },
      ],
    },
    {
      name: 'Gift and Estate Tax',
      weight: 4,
      subtopics: [
        { name: 'Gift Tax Rules', weight: 40 },
        { name: 'Estate Tax Calculation', weight: 35 },
        { name: 'Exclusions & Deductions', weight: 25 },
      ],
    },
    {
      name: 'Employment Tax',
      weight: 3,
      subtopics: [
        { name: 'FICA', weight: 40 },
        { name: 'FUTA', weight: 30 },
        { name: 'Withholding', weight: 30 },
      ],
    },
    {
      name: 'Professional Ethics - Circular 230',
      weight: 3,
      subtopics: [
        { name: 'Practitioner Requirements', weight: 40 },
        { name: 'Sanctions & Penalties', weight: 35 },
        { name: 'Due Diligence', weight: 25 },
      ],
    },
    {
      name: 'Tax Research',
      weight: 3,
      subtopics: [
        { name: 'Primary Sources', weight: 40 },
        { name: 'Secondary Sources', weight: 30 },
        { name: 'Research Methodology', weight: 30 },
      ],
    },
    {
      name: 'Debtor-Creditor',
      weight: 3,
      subtopics: [
        { name: 'Secured Transactions', weight: 50 },
        { name: 'Creditor Rights', weight: 50 },
      ],
    },
    {
      name: 'International Tax',
      weight: 3,
      subtopics: [
        { name: 'Foreign Income', weight: 40 },
        { name: 'Foreign Tax Credit', weight: 35 },
        { name: 'Transfer Pricing', weight: 25 },
      ],
    },
  ],
};

// ============================================
// TCP - Tax Compliance & Planning
// Study Hours: 250-300 | Target: 800 questions
// Topics aligned with tcp.ts question data
// ============================================
export const tcpTaxonomy: SectionTaxonomy = {
  section: 'TCP',
  sectionName: 'Tax Compliance & Planning',
  studyHours: { min: 250, max: 300 },
  targetQuestions: 800,
  topics: [
    {
      name: 'Tax Planning',
      weight: 7,
      subtopics: [
        { name: 'Tax Planning Strategies', weight: 50 },
        { name: 'Timing Strategies', weight: 50 },
      ],
    },
    {
      name: 'Estate and Gift Planning',
      weight: 7,
      subtopics: [
        { name: 'Estate Planning Techniques', weight: 40 },
        { name: 'Gift Planning Strategies', weight: 35 },
        { name: 'Wealth Transfer', weight: 25 },
      ],
    },
    {
      name: 'Retirement Planning',
      weight: 6,
      subtopics: [
        { name: 'Qualified Plans', weight: 40 },
        { name: 'IRA Rules', weight: 35 },
        { name: 'Distribution Planning', weight: 25 },
      ],
    },
    {
      name: 'Compensation Planning',
      weight: 6,
      subtopics: [
        { name: 'Employee Compensation', weight: 40 },
        { name: 'Deferred Compensation', weight: 35 },
        { name: 'Fringe Benefits', weight: 25 },
      ],
    },
    {
      name: 'Tax Credits',
      weight: 6,
      subtopics: [
        { name: 'Business Credits', weight: 50 },
        { name: 'Individual Credits', weight: 50 },
      ],
    },
    {
      name: 'State and Local Tax',
      weight: 5,
      subtopics: [
        { name: 'Nexus', weight: 40 },
        { name: 'Apportionment', weight: 35 },
        { name: 'State Tax Planning', weight: 25 },
      ],
    },
    {
      name: 'Employment Tax',
      weight: 5,
      subtopics: [
        { name: 'Payroll Compliance', weight: 50 },
        { name: 'Employment Tax Planning', weight: 50 },
      ],
    },
    {
      name: 'Charitable Giving',
      weight: 5,
      subtopics: [
        { name: 'Charitable Deductions', weight: 50 },
        { name: 'Charitable Planning', weight: 50 },
      ],
    },
    {
      name: 'Passive Activity',
      weight: 5,
      subtopics: [
        { name: 'Passive Activity Rules', weight: 50 },
        { name: 'Material Participation', weight: 50 },
      ],
    },
    {
      name: 'Multi-Entity Planning',
      weight: 5,
      subtopics: [
        { name: 'Entity Structure', weight: 50 },
        { name: 'Related Party Rules', weight: 50 },
      ],
    },
    {
      name: 'Property Planning',
      weight: 5,
      subtopics: [
        { name: 'Timing of Gain Recognition', weight: 40 },
        { name: 'Like-Kind Exchange Planning', weight: 35 },
        { name: 'Installment Sale Planning', weight: 25 },
      ],
    },
    {
      name: 'Individual Tax Compliance',
      weight: 5,
      subtopics: [
        { name: 'Tax Return Preparation', weight: 50 },
        { name: 'Estimated Taxes', weight: 50 },
      ],
    },
    {
      name: 'S Corporation Planning',
      weight: 5,
      subtopics: [
        { name: 'S Election Planning', weight: 50 },
        { name: 'S Corp Tax Strategies', weight: 50 },
      ],
    },
    {
      name: 'Partnership Planning',
      weight: 5,
      subtopics: [
        { name: 'Partnership Formation', weight: 50 },
        { name: 'Partnership Allocations', weight: 50 },
      ],
    },
    {
      name: 'C Corporation Planning',
      weight: 5,
      subtopics: [
        { name: 'Corporate Tax Planning', weight: 50 },
        { name: 'Dividend Planning', weight: 50 },
      ],
    },
    {
      name: 'International Individual Tax',
      weight: 4,
      subtopics: [
        { name: 'Foreign Income Reporting', weight: 50 },
        { name: 'Foreign Tax Credits', weight: 50 },
      ],
    },
    {
      name: 'Business Succession Planning',
      weight: 4,
      subtopics: [
        { name: 'Succession Strategies', weight: 50 },
        { name: 'Buy-Sell Agreements', weight: 50 },
      ],
    },
    {
      name: 'AMT Planning',
      weight: 4,
      subtopics: [
        { name: 'AMT Calculation', weight: 50 },
        { name: 'AMT Strategies', weight: 50 },
      ],
    },
  ],
};

// ============================================
// BAR - Business Analysis & Reporting
// Study Hours: 150-200 | Target: 500 questions
// Topics aligned with bar.ts question data
// ============================================
export const barTaxonomy: SectionTaxonomy = {
  section: 'BAR',
  sectionName: 'Business Analysis & Reporting',
  studyHours: { min: 150, max: 200 },
  targetQuestions: 500,
  topics: [
    {
      name: 'Financial Statement Analysis',
      weight: 10,
      subtopics: [
        { name: 'Ratio Analysis', weight: 35 },
        { name: 'Trend Analysis', weight: 25 },
        { name: 'Common-Size Statements', weight: 20 },
        { name: 'Prospective Financial Information', weight: 20 },
      ],
    },
    {
      name: 'Government Accounting',
      weight: 10,
      subtopics: [
        { name: 'Fund Accounting', weight: 35 },
        { name: 'Government-Wide Statements', weight: 35 },
        { name: 'Budgetary Accounting', weight: 30 },
      ],
    },
    {
      name: 'Not-for-Profit Accounting',
      weight: 10,
      subtopics: [
        { name: 'Net Asset Classifications', weight: 35 },
        { name: 'Revenue Recognition', weight: 35 },
        { name: 'Financial Reporting', weight: 30 },
      ],
    },
    {
      name: 'Foreign Currency',
      weight: 9,
      subtopics: [
        { name: 'Translation', weight: 40 },
        { name: 'Remeasurement', weight: 35 },
        { name: 'Hedging', weight: 25 },
      ],
    },
    {
      name: 'Derivatives',
      weight: 9,
      subtopics: [
        { name: 'Derivative Instruments', weight: 40 },
        { name: 'Hedge Accounting', weight: 35 },
        { name: 'Fair Value Hedges', weight: 25 },
      ],
    },
    {
      name: 'Cost of Capital',
      weight: 9,
      subtopics: [
        { name: 'WACC', weight: 40 },
        { name: 'Cost of Equity', weight: 35 },
        { name: 'Cost of Debt', weight: 25 },
      ],
    },
    {
      name: 'Capital Budgeting',
      weight: 9,
      subtopics: [
        { name: 'NPV', weight: 30 },
        { name: 'IRR', weight: 30 },
        { name: 'Payback Period', weight: 20 },
        { name: 'Capital Rationing', weight: 20 },
      ],
    },
    {
      name: 'Business Valuation',
      weight: 9,
      subtopics: [
        { name: 'Valuation Methods', weight: 40 },
        { name: 'DCF Analysis', weight: 35 },
        { name: 'Comparable Analysis', weight: 25 },
      ],
    },
    {
      name: 'Economic Concepts',
      weight: 9,
      subtopics: [
        { name: 'Supply & Demand', weight: 35 },
        { name: 'Market Structures', weight: 35 },
        { name: 'Economic Indicators', weight: 30 },
      ],
    },
    {
      name: 'Data Analytics',
      weight: 9,
      subtopics: [
        { name: 'Data Visualization', weight: 35 },
        { name: 'Data Analysis Techniques', weight: 35 },
        { name: 'Business Intelligence', weight: 30 },
      ],
    },
    {
      name: 'Business Combinations',
      weight: 4,
      subtopics: [
        { name: 'Acquisition Method', weight: 50 },
        { name: 'Purchase Price Allocation', weight: 50 },
      ],
    },
    {
      name: 'Consolidations',
      weight: 3,
      subtopics: [
        { name: 'Consolidation Procedures', weight: 50 },
        { name: 'Intercompany Eliminations', weight: 50 },
      ],
    },
  ],
};

// ============================================
// ISC - Information Systems & Controls
// Study Hours: 150-200 | Target: 500 questions
// Topics aligned with isc.ts question data
// ============================================
export const iscTaxonomy: SectionTaxonomy = {
  section: 'ISC',
  sectionName: 'Information Systems & Controls',
  studyHours: { min: 150, max: 200 },
  targetQuestions: 500,
  topics: [
    {
      name: 'Comprehensive Review',
      weight: 16,
      subtopics: [
        { name: 'Overall ISC Concepts', weight: 50 },
        { name: 'Integration Topics', weight: 50 },
      ],
    },
    {
      name: 'Cybersecurity',
      weight: 9,
      subtopics: [
        { name: 'Cybersecurity Fundamentals', weight: 35 },
        { name: 'Threat Detection', weight: 35 },
        { name: 'Incident Response', weight: 30 },
      ],
    },
    {
      name: 'IT General Controls',
      weight: 8,
      subtopics: [
        { name: 'Access Controls', weight: 30 },
        { name: 'Change Management', weight: 25 },
        { name: 'Program Development', weight: 25 },
        { name: 'Computer Operations', weight: 20 },
      ],
    },
    {
      name: 'Network Security',
      weight: 8,
      subtopics: [
        { name: 'Network Architecture', weight: 35 },
        { name: 'Firewalls & IDS', weight: 35 },
        { name: 'Network Protocols', weight: 30 },
      ],
    },
    {
      name: 'SOC Reports',
      weight: 8,
      subtopics: [
        { name: 'SOC 1 Reports', weight: 35 },
        { name: 'SOC 2 Reports', weight: 35 },
        { name: 'Trust Services Criteria', weight: 30 },
      ],
    },
    {
      name: 'Emerging Technologies',
      weight: 8,
      subtopics: [
        { name: 'Blockchain', weight: 35 },
        { name: 'AI & Machine Learning', weight: 35 },
        { name: 'RPA', weight: 30 },
      ],
    },
    {
      name: 'Data Management',
      weight: 8,
      subtopics: [
        { name: 'Database Concepts', weight: 35 },
        { name: 'Data Quality', weight: 35 },
        { name: 'Data Governance', weight: 30 },
      ],
    },
    {
      name: 'Application Controls',
      weight: 8,
      subtopics: [
        { name: 'Input Controls', weight: 35 },
        { name: 'Processing Controls', weight: 35 },
        { name: 'Output Controls', weight: 30 },
      ],
    },
    {
      name: 'Encryption',
      weight: 7,
      subtopics: [
        { name: 'Symmetric Encryption', weight: 35 },
        { name: 'Asymmetric Encryption', weight: 35 },
        { name: 'Digital Signatures', weight: 30 },
      ],
    },
    {
      name: 'Cloud Computing',
      weight: 7,
      subtopics: [
        { name: 'Cloud Service Models', weight: 40 },
        { name: 'Cloud Security', weight: 35 },
        { name: 'Cloud Deployment', weight: 25 },
      ],
    },
    {
      name: 'IT Governance',
      weight: 4,
      subtopics: [
        { name: 'IT Strategic Planning', weight: 35 },
        { name: 'IT Policies & Procedures', weight: 35 },
        { name: 'Vendor Management', weight: 30 },
      ],
    },
    {
      name: 'Disaster Recovery',
      weight: 4,
      subtopics: [
        { name: 'DR Planning', weight: 50 },
        { name: 'Recovery Strategies', weight: 50 },
      ],
    },
    {
      name: 'Business Continuity',
      weight: 3,
      subtopics: [
        { name: 'BCP Development', weight: 50 },
        { name: 'BCP Testing', weight: 50 },
      ],
    },
    {
      name: 'IT Risk Management',
      weight: 2,
      subtopics: [
        { name: 'Risk Assessment', weight: 50 },
        { name: 'Risk Mitigation', weight: 50 },
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
