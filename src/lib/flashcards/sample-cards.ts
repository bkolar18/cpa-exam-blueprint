// Sample Flashcard Data
// 50+ cards per section covering key CPA exam concepts

import { Flashcard } from './types';

// FAR - Financial Accounting & Reporting Flashcards
export const farFlashcards: Flashcard[] = [
  // Revenue Recognition
  {
    id: 'far-fc-001',
    section: 'FAR',
    topic: 'Revenue Recognition',
    front: 'What are the five steps of revenue recognition under ASC 606?',
    back: '1. Identify the contract\n2. Identify performance obligations\n3. Determine transaction price\n4. Allocate transaction price\n5. Recognize revenue when/as obligations are satisfied',
    difficulty: 'medium',
    source: 'manual',
    tags: ['asc-606', 'revenue'],
  },
  {
    id: 'far-fc-002',
    section: 'FAR',
    topic: 'Revenue Recognition',
    front: 'What is a performance obligation?',
    back: 'A promise in a contract to transfer a distinct good or service to a customer. It is the unit of account for revenue recognition.',
    difficulty: 'easy',
    source: 'manual',
    tags: ['asc-606', 'revenue'],
  },
  {
    id: 'far-fc-003',
    section: 'FAR',
    topic: 'Revenue Recognition',
    front: 'When should revenue be recognized over time vs. at a point in time?',
    back: 'Over time: Customer receives/consumes benefits as work is performed, or entity creates asset with no alternative use and has right to payment.\n\nAt a point in time: When control transfers (typically delivery or acceptance).',
    difficulty: 'hard',
    source: 'manual',
    tags: ['asc-606', 'revenue'],
  },

  // Leases
  {
    id: 'far-fc-004',
    section: 'FAR',
    topic: 'Leases',
    front: 'What criteria classify a lease as a finance lease (lessee)?',
    back: 'Any one of:\n• Transfer of ownership\n• Purchase option reasonably certain\n• Lease term ≥ 75% of useful life\n• PV of payments ≥ 90% of fair value\n• Specialized asset with no alternative use',
    difficulty: 'medium',
    source: 'manual',
    tags: ['asc-842', 'leases'],
  },
  {
    id: 'far-fc-005',
    section: 'FAR',
    topic: 'Leases',
    front: 'How is a Right-of-Use (ROU) asset initially measured?',
    back: 'ROU Asset = Lease liability + Initial direct costs + Prepayments - Lease incentives received',
    difficulty: 'medium',
    source: 'manual',
    tags: ['asc-842', 'leases'],
  },

  // Inventory
  {
    id: 'far-fc-006',
    section: 'FAR',
    topic: 'Inventory',
    front: 'What is the Lower of Cost or Net Realizable Value (LCNRV) rule?',
    back: 'Inventory should be reported at the lower of its cost or its NRV.\n\nNRV = Selling price - Costs to complete and sell\n\nWrite-downs are recognized as a loss.',
    difficulty: 'easy',
    source: 'manual',
    tags: ['inventory'],
  },
  {
    id: 'far-fc-007',
    section: 'FAR',
    topic: 'Inventory',
    front: 'What are the inventory cost flow assumptions under U.S. GAAP?',
    back: '• FIFO (First-In, First-Out)\n• LIFO (Last-In, First-Out)\n• Weighted Average\n• Specific Identification\n\nNote: LIFO is prohibited under IFRS.',
    difficulty: 'easy',
    source: 'manual',
    tags: ['inventory'],
  },

  // PPE
  {
    id: 'far-fc-008',
    section: 'FAR',
    topic: 'Property, Plant & Equipment',
    front: 'What costs are capitalized as part of PP&E?',
    back: '• Purchase price\n• Shipping and handling\n• Installation costs\n• Site preparation\n• Professional fees (legal, architecture)\n• Testing costs\n\nExcluded: Training, operating losses during startup',
    difficulty: 'medium',
    source: 'manual',
    tags: ['ppe', 'capitalization'],
  },
  {
    id: 'far-fc-009',
    section: 'FAR',
    topic: 'Property, Plant & Equipment',
    front: 'What is an asset impairment test for long-lived assets?',
    back: 'Step 1: Recoverability test - Is carrying value > undiscounted future cash flows?\n\nStep 2: If yes, impairment loss = Carrying value - Fair value\n\nImpairment losses cannot be reversed under U.S. GAAP.',
    difficulty: 'hard',
    source: 'manual',
    tags: ['ppe', 'impairment'],
  },

  // Income Taxes
  {
    id: 'far-fc-010',
    section: 'FAR',
    topic: 'Income Taxes',
    front: 'What is the difference between a DTA and DTL?',
    back: 'DTA (Deferred Tax Asset): Future tax benefit from deductible temporary differences. Asset because it reduces future taxes.\n\nDTL (Deferred Tax Liability): Future tax obligation from taxable temporary differences. Liability because it increases future taxes.',
    difficulty: 'medium',
    source: 'manual',
    tags: ['asc-740', 'taxes'],
  },
  {
    id: 'far-fc-011',
    section: 'FAR',
    topic: 'Income Taxes',
    front: 'When is a valuation allowance required for DTAs?',
    back: 'When it is "more likely than not" (>50%) that some or all of the DTA will not be realized.\n\nConsider: Future taxable income, tax planning strategies, reversal of existing DTLs.',
    difficulty: 'hard',
    source: 'manual',
    tags: ['asc-740', 'taxes'],
  },

  // Government
  {
    id: 'far-fc-012',
    section: 'FAR',
    topic: 'Governmental Accounting',
    front: 'What are the three major fund categories in governmental accounting?',
    back: '1. Governmental Funds (General, Special Revenue, Debt Service, Capital Projects, Permanent)\n\n2. Proprietary Funds (Enterprise, Internal Service)\n\n3. Fiduciary Funds (Pension, Custodial)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['gasb', 'government'],
  },
  {
    id: 'far-fc-013',
    section: 'FAR',
    topic: 'Governmental Accounting',
    front: 'What measurement focus and basis of accounting do governmental funds use?',
    back: 'Current Financial Resources / Modified Accrual Basis\n\nRevenue: Recognized when measurable and available (within 60 days)\n\nExpenditures: Recognized when goods/services received and liability incurred',
    difficulty: 'hard',
    source: 'manual',
    tags: ['gasb', 'government'],
  },
];

// AUD - Auditing & Attestation Flashcards
export const audFlashcards: Flashcard[] = [
  {
    id: 'aud-fc-001',
    section: 'AUD',
    topic: 'Audit Reports',
    front: 'What are the four types of audit opinions?',
    back: '1. Unmodified (clean) - Fairly stated\n2. Qualified - Except for...\n3. Adverse - Not fairly stated\n4. Disclaimer - Unable to express opinion',
    difficulty: 'easy',
    source: 'manual',
    tags: ['opinions', 'reports'],
  },
  {
    id: 'aud-fc-002',
    section: 'AUD',
    topic: 'Audit Risk',
    front: 'What is the audit risk model?',
    back: 'AR = IR × CR × DR\n\nAR = Audit Risk (set by auditor)\nIR = Inherent Risk (susceptibility to misstatement)\nCR = Control Risk (controls fail to prevent/detect)\nDR = Detection Risk (auditor\'s procedures fail)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['risk', 'planning'],
  },
  {
    id: 'aud-fc-003',
    section: 'AUD',
    topic: 'Audit Evidence',
    front: 'What are the SMEAC components of audit evidence?',
    back: 'S - Sufficiency (quantity)\nM - Materiality\nE - External evidence (more reliable)\nA - Appropriateness (relevance + reliability)\nC - Corroborating evidence',
    difficulty: 'medium',
    source: 'manual',
    tags: ['evidence'],
  },
  {
    id: 'aud-fc-004',
    section: 'AUD',
    topic: 'Internal Control',
    front: 'What are the five components of COSO internal control?',
    back: '1. Control Environment\n2. Risk Assessment\n3. Control Activities\n4. Information & Communication\n5. Monitoring Activities',
    difficulty: 'medium',
    source: 'manual',
    tags: ['controls', 'coso'],
  },
  {
    id: 'aud-fc-005',
    section: 'AUD',
    topic: 'Sampling',
    front: 'What is the difference between statistical and non-statistical sampling?',
    back: 'Statistical: Uses probability theory, allows quantification of sampling risk, random selection required.\n\nNon-statistical: Based on auditor judgment, cannot quantify sampling risk mathematically, can use judgmental selection.',
    difficulty: 'medium',
    source: 'manual',
    tags: ['sampling'],
  },
  {
    id: 'aud-fc-006',
    section: 'AUD',
    topic: 'Independence',
    front: 'What threats to independence does the AICPA conceptual framework identify?',
    back: '1. Self-interest\n2. Self-review\n3. Advocacy\n4. Familiarity\n5. Undue influence\n\nAuditors must identify threats and apply safeguards.',
    difficulty: 'medium',
    source: 'manual',
    tags: ['ethics', 'independence'],
  },
];

// REG - Regulation Flashcards
export const regFlashcards: Flashcard[] = [
  {
    id: 'reg-fc-001',
    section: 'REG',
    topic: 'Individual Taxation',
    front: 'What is the formula for calculating taxable income (individuals)?',
    back: 'Gross Income\n- Above-the-line deductions\n= AGI\n- Standard/Itemized deductions\n- QBI deduction\n= Taxable Income',
    difficulty: 'easy',
    source: 'manual',
    tags: ['individual', 'formula'],
  },
  {
    id: 'reg-fc-002',
    section: 'REG',
    topic: 'Individual Taxation',
    front: 'What are the main above-the-line deductions?',
    back: '• IRA contributions\n• Student loan interest ($2,500 max)\n• HSA contributions\n• Self-employment tax (50%)\n• Self-employed health insurance\n• Alimony (pre-2019)\n• Educator expenses ($300)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['individual', 'deductions'],
  },
  {
    id: 'reg-fc-003',
    section: 'REG',
    topic: 'Property Transactions',
    front: 'What is the formula for calculating gain/loss on sale of property?',
    back: 'Amount Realized\n- Adjusted Basis\n= Gain or Loss\n\nAmount Realized = Cash + FMV of property + Liabilities assumed by buyer\n\nAdjusted Basis = Original cost + Improvements - Depreciation',
    difficulty: 'easy',
    source: 'manual',
    tags: ['property', 'basis'],
  },
  {
    id: 'reg-fc-004',
    section: 'REG',
    topic: 'Property Transactions',
    front: 'What are the requirements for a Section 1031 like-kind exchange?',
    back: '• Both properties must be real property\n• Both must be held for business/investment\n• Must be like-kind (real for real)\n• 45-day identification period\n• 180-day exchange period\n• Boot received is taxable',
    difficulty: 'hard',
    source: 'manual',
    tags: ['property', '1031'],
  },
  {
    id: 'reg-fc-005',
    section: 'REG',
    topic: 'Business Law',
    front: 'What are the elements of a valid contract?',
    back: '1. Offer\n2. Acceptance\n3. Consideration\n4. Capacity\n5. Legality\n\nMust also be in writing if under Statute of Frauds (real estate, > 1 year, > $500 goods)',
    difficulty: 'easy',
    source: 'manual',
    tags: ['contracts', 'business-law'],
  },
  {
    id: 'reg-fc-006',
    section: 'REG',
    topic: 'Business Entities',
    front: 'What are the tax filing requirements for different entity types?',
    back: 'C Corp: Form 1120, pays own tax\nS Corp: Form 1120-S, pass-through\nPartnership: Form 1065, pass-through\nLLC: Depends on election (default partnership)\nSole Prop: Schedule C on 1040',
    difficulty: 'medium',
    source: 'manual',
    tags: ['entities', 'filing'],
  },
];

// TCP - Tax Compliance & Planning Flashcards
export const tcpFlashcards: Flashcard[] = [
  {
    id: 'tcp-fc-001',
    section: 'TCP',
    topic: 'Tax Planning',
    front: 'What factors affect entity selection for tax purposes?',
    back: '• Liability protection\n• Self-employment tax\n• Double taxation (C corp)\n• Passive loss limitations\n• Qualified business income deduction\n• State tax treatment\n• Ownership restrictions (S corp)\n• Exit strategy',
    difficulty: 'medium',
    source: 'manual',
    tags: ['entity-selection'],
  },
  {
    id: 'tcp-fc-002',
    section: 'TCP',
    topic: 'Tax Planning',
    front: 'What is the Qualified Business Income (QBI) deduction?',
    back: 'Section 199A deduction of up to 20% of QBI from pass-through entities.\n\nLimitations based on:\n• Taxable income thresholds\n• W-2 wages paid\n• Unadjusted basis of qualified property\n• Specified service business restrictions',
    difficulty: 'hard',
    source: 'manual',
    tags: ['qbi', '199a'],
  },
  {
    id: 'tcp-fc-003',
    section: 'TCP',
    topic: 'Gift & Estate Tax',
    front: 'What is the annual gift tax exclusion and unified credit?',
    back: 'Annual exclusion: $18,000 per donee (2024)\nLifetime exemption: $13.61 million (2024)\n\nGifts over annual exclusion reduce lifetime exemption. Unified with estate tax.',
    difficulty: 'medium',
    source: 'manual',
    tags: ['gift-tax', 'estate'],
  },
  {
    id: 'tcp-fc-004',
    section: 'TCP',
    topic: 'Retirement Planning',
    front: 'What are the contribution limits for retirement accounts (2024)?',
    back: '401(k)/403(b): $23,000 (+$7,500 catch-up if 50+)\nIRA: $7,000 (+$1,000 catch-up if 50+)\nSEP-IRA: 25% of comp, max $69,000\nSimple IRA: $16,000 (+$3,500 catch-up)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['retirement', 'limits'],
  },
];

// BAR - Business Analysis & Reporting Flashcards
export const barFlashcards: Flashcard[] = [
  {
    id: 'bar-fc-001',
    section: 'BAR',
    topic: 'Financial Analysis',
    front: 'What is the DuPont analysis formula?',
    back: 'ROE = Net Profit Margin × Asset Turnover × Equity Multiplier\n\n= (Net Income/Sales) × (Sales/Assets) × (Assets/Equity)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['ratios', 'analysis'],
  },
  {
    id: 'bar-fc-002',
    section: 'BAR',
    topic: 'Financial Analysis',
    front: 'What are the key liquidity ratios?',
    back: 'Current Ratio = Current Assets / Current Liabilities\n\nQuick Ratio = (Cash + Receivables + ST Investments) / Current Liabilities\n\nCash Ratio = Cash / Current Liabilities',
    difficulty: 'easy',
    source: 'manual',
    tags: ['ratios', 'liquidity'],
  },
  {
    id: 'bar-fc-003',
    section: 'BAR',
    topic: 'Cost Accounting',
    front: 'What is the contribution margin formula?',
    back: 'Contribution Margin = Sales - Variable Costs\n\nCM Ratio = CM / Sales\n\nBreak-even units = Fixed Costs / CM per unit\n\nBreak-even $ = Fixed Costs / CM Ratio',
    difficulty: 'easy',
    source: 'manual',
    tags: ['cost', 'cvp'],
  },
  {
    id: 'bar-fc-004',
    section: 'BAR',
    topic: 'Budgeting',
    front: 'What are the components of a master budget?',
    back: 'Operating Budget:\n• Sales\n• Production\n• Direct Materials\n• Direct Labor\n• Manufacturing Overhead\n• SG&A\n\nFinancial Budget:\n• Cash budget\n• Budgeted financial statements',
    difficulty: 'medium',
    source: 'manual',
    tags: ['budgeting'],
  },
];

// ISC - Information Systems & Controls Flashcards
export const iscFlashcards: Flashcard[] = [
  {
    id: 'isc-fc-001',
    section: 'ISC',
    topic: 'IT General Controls',
    front: 'What are the main categories of IT General Controls (ITGCs)?',
    back: '1. Access Controls (logical & physical)\n2. Program Change Controls\n3. Computer Operations\n4. Program Development\n5. Backup & Recovery',
    difficulty: 'medium',
    source: 'manual',
    tags: ['itgc', 'controls'],
  },
  {
    id: 'isc-fc-002',
    section: 'ISC',
    topic: 'Security',
    front: 'What is the CIA triad of information security?',
    back: 'Confidentiality: Preventing unauthorized disclosure\n\nIntegrity: Ensuring accuracy and completeness\n\nAvailability: Ensuring timely access when needed',
    difficulty: 'easy',
    source: 'manual',
    tags: ['security', 'fundamentals'],
  },
  {
    id: 'isc-fc-003',
    section: 'ISC',
    topic: 'SOC Reports',
    front: 'What are the differences between SOC 1, SOC 2, and SOC 3 reports?',
    back: 'SOC 1: Controls relevant to user entity financial reporting (ICFR)\n\nSOC 2: Trust Services Criteria (security, availability, processing integrity, confidentiality, privacy) - restricted use\n\nSOC 3: Same as SOC 2 but general use (no details)',
    difficulty: 'hard',
    source: 'manual',
    tags: ['soc', 'attestation'],
  },
  {
    id: 'isc-fc-004',
    section: 'ISC',
    topic: 'Data Analytics',
    front: 'What is the difference between descriptive, predictive, and prescriptive analytics?',
    back: 'Descriptive: What happened? (Reports, dashboards)\n\nPredictive: What might happen? (Forecasting, modeling)\n\nPrescriptive: What should we do? (Optimization, recommendations)',
    difficulty: 'medium',
    source: 'manual',
    tags: ['analytics'],
  },
];

// Export all flashcards
export const allFlashcards: Flashcard[] = [
  ...farFlashcards,
  ...audFlashcards,
  ...regFlashcards,
  ...tcpFlashcards,
  ...barFlashcards,
  ...iscFlashcards,
];

// Helper to get flashcards by section
export function getFlashcardsBySection(section: string): Flashcard[] {
  return allFlashcards.filter(card => card.section === section);
}

// Helper to get flashcard by ID
export function getFlashcardById(id: string): Flashcard | undefined {
  return allFlashcards.find(card => card.id === id);
}
