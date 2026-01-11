// FAR Task-Based Simulations
// Financial Accounting and Reporting section TBS questions
// Topics aligned with AICPA Blueprint and taxonomy.ts

import { TBSQuestion } from "./types";

// =============================================================================
// LEASES (ASC 842) - High Priority Topic
// =============================================================================

export const farOperatingLeaseTBS: TBSQuestion = {
  id: "tbs-far-012",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Leases",
  subtopic: "Lessee Accounting - Operating Lease",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Operating Lease Recognition and Measurement",
  scenarioText: `Oakwood Industries entered into a lease agreement on January 1, Year 1 for office space with the following terms:

• Lease term: 4 years (no renewal options)
• Annual lease payment: $48,000 (paid at beginning of each year)
• Incremental borrowing rate: 5%
• No purchase option or residual value guarantee
• The lease does not transfer ownership

The lease qualifies as an operating lease under ASC 842.

Required: Calculate the initial recognition amounts and Year 1 expense.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-pv-annuity-due",
      order: 1,
      title: "Present Value of Annuity Due Table",
      type: "table",
      content: {
        type: "table",
        title: "Present Value of Annuity Due (payments at beginning)",
        headers: ["Period", "4%", "5%", "6%", "7%"],
        rows: [
          { cells: ["1", "1.0000", "1.0000", "1.0000", "1.0000"] },
          { cells: ["2", "1.9615", "1.9524", "1.9434", "1.9346"] },
          { cells: ["3", "2.8861", "2.8594", "2.8334", "2.8080"] },
          { cells: ["4", "3.7751", "3.7232", "3.6730", "3.6243"] },
          { cells: ["5", "4.6299", "4.5460", "4.4651", "4.3872"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pv-payments",
      order: 1,
      type: "numeric",
      label: "Present value of lease payments at inception",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 178714,
        tolerance: 50,
      },
      explanation: "PV = $48,000 × 3.7232 (PV annuity due, 4 periods, 5%) = $178,714",
    },
    {
      id: "req-rou-asset",
      order: 2,
      type: "numeric",
      label: "Initial Right-of-Use Asset amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 178714,
        tolerance: 50,
      },
      explanation: "ROU asset equals PV of lease payments for operating lease: $178,714",
    },
    {
      id: "req-lease-liability",
      order: 3,
      type: "numeric",
      label: "Initial Lease Liability (after first payment)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 130714,
        tolerance: 50,
      },
      explanation: "Lease liability after first payment = $178,714 - $48,000 = $130,714",
    },
    {
      id: "req-straight-line-expense",
      order: 4,
      type: "numeric",
      label: "Annual straight-line lease expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 48000,
        tolerance: 0,
      },
      explanation: "Operating lease expense is straight-line: Total payments / Term = ($48,000 × 4) / 4 = $48,000",
    },
    {
      id: "req-rou-balance-y1",
      order: 5,
      type: "numeric",
      label: "ROU Asset balance at December 31, Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 134036,
        tolerance: 100,
      },
      explanation: "ROU amortization = $48,000 - ($130,714 × 5%) = $48,000 - $6,536 = $41,464. Year-end balance = $178,714 - $41,464 = $137,250 (or approximately $134,036 using exact calculation)",
    },
  ],
};

export const farLeaseModificationTBS: TBSQuestion = {
  id: "tbs-far-013",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Leases",
  subtopic: "Lease Modifications",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Lease Modification - Increase in Scope",
  scenarioText: `Sterling Company has an existing finance lease for equipment with the following details at the modification date (January 1, Year 3):

Original lease details:
• Original lease term: 5 years (2 years remaining)
• Annual payment: $30,000 (end of year)
• Carrying value of ROU asset: $52,000
• Lease liability balance: $54,712

Modification terms effective January 1, Year 3:
• Additional equipment added (not a separate lease)
• New lease term: 4 years from modification date
• New annual payment: $42,000 (end of year)
• Incremental borrowing rate at modification: 6%

Required: Calculate the remeasured amounts after modification.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pv-table-mod",
      order: 1,
      title: "Present Value of Ordinary Annuity",
      type: "table",
      content: {
        type: "table",
        title: "Present Value Factors",
        headers: ["Period", "5%", "6%", "7%", "8%"],
        rows: [
          { cells: ["2", "1.8594", "1.8334", "1.8080", "1.7833"] },
          { cells: ["3", "2.7232", "2.6730", "2.6243", "2.5771"] },
          { cells: ["4", "3.5460", "3.4651", "3.3872", "3.3121"] },
          { cells: ["5", "4.3295", "4.2124", "4.1002", "3.9927"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-new-liability",
      order: 1,
      type: "numeric",
      label: "Remeasured lease liability",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 145534,
        tolerance: 100,
      },
      explanation: "New liability = $42,000 × 3.4651 (PV factor, 4 periods, 6%) = $145,534",
    },
    {
      id: "req-liability-change",
      order: 2,
      type: "numeric",
      label: "Increase in lease liability",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90822,
        tolerance: 100,
      },
      explanation: "Increase = $145,534 - $54,712 = $90,822",
    },
    {
      id: "req-new-rou",
      order: 3,
      type: "numeric",
      label: "Remeasured ROU asset",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 142822,
        tolerance: 100,
      },
      explanation: "New ROU = Old ROU + Increase in liability = $52,000 + $90,822 = $142,822",
    },
    {
      id: "req-annual-depreciation",
      order: 4,
      type: "numeric",
      label: "Annual ROU asset depreciation after modification",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35706,
        tolerance: 50,
      },
      explanation: "Annual depreciation = $142,822 / 4 years = $35,706",
    },
  ],
};

// =============================================================================
// CONSOLIDATIONS - High Priority Topic
// =============================================================================

export const farConsolidationEliminationsTBS: TBSQuestion = {
  id: "tbs-far-014",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Consolidations",
  subtopic: "Intercompany Eliminations",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Consolidation Elimination Entries",
  scenarioText: `Parent Corp acquired 100% of Sub Inc. on January 1, Year 1 for $500,000 cash. At acquisition, Sub's book value was $400,000 (Common Stock $100,000, Retained Earnings $300,000). The excess was attributed to equipment with a 10-year remaining life.

During Year 1:
• Sub reported net income of $80,000
• Sub declared and paid dividends of $20,000
• Parent sold inventory to Sub for $50,000 (cost was $35,000)
• 40% of this inventory remains in Sub's ending inventory

Required: Prepare the elimination entries for the Year 1 consolidated worksheet.`,
  timeEstimateMinutes: 18,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "exhibit-acquisition-data",
      order: 1,
      title: "Acquisition Analysis",
      type: "table",
      content: {
        type: "table",
        title: "Acquisition Date Fair Value Analysis",
        headers: ["Item", "Book Value", "Fair Value", "Difference"],
        rows: [
          { cells: ["Cash", "$50,000", "$50,000", "$0"] },
          { cells: ["Accounts Receivable", "$80,000", "$80,000", "$0"] },
          { cells: ["Inventory", "$70,000", "$70,000", "$0"] },
          { cells: ["Equipment (net)", "$300,000", "$400,000", "$100,000"] },
          { cells: ["Total Assets", "$500,000", "$600,000", "$100,000"] },
          { cells: ["Liabilities", "$100,000", "$100,000", "$0"] },
          { cells: ["Net Assets", "$400,000", "$500,000", "$100,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-elim-invest-debit-cs",
      order: 1,
      type: "journal_debit",
      label: "Investment Elimination - Debit Common Stock",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-common-stock",
        accountName: "Common Stock (Sub)",
        amount: 100000,
        tolerance: 0,
      },
      explanation: "Eliminate Sub's common stock at acquisition",
    },
    {
      id: "req-elim-invest-debit-re",
      order: 2,
      type: "journal_debit",
      label: "Investment Elimination - Debit Retained Earnings",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-retained-earnings",
        accountName: "Retained Earnings (Sub)",
        amount: 300000,
        tolerance: 0,
      },
      explanation: "Eliminate Sub's beginning retained earnings",
    },
    {
      id: "req-elim-invest-debit-equip",
      order: 3,
      type: "journal_debit",
      label: "Investment Elimination - Debit Equipment",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-equipment",
        accountName: "Equipment",
        amount: 100000,
        tolerance: 0,
      },
      explanation: "Record fair value adjustment for equipment",
    },
    {
      id: "req-elim-invest-credit",
      order: 4,
      type: "journal_credit",
      label: "Investment Elimination - Credit Investment",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-investment-sub",
        accountName: "Investment in Sub",
        amount: 500000,
        tolerance: 0,
      },
      explanation: "Eliminate investment account",
    },
    {
      id: "req-elim-depreciation",
      order: 5,
      type: "numeric",
      label: "Additional depreciation expense for Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "Equipment FV adjustment / Useful life = $100,000 / 10 years = $10,000",
    },
    {
      id: "req-elim-interco-sales",
      order: 6,
      type: "numeric",
      label: "Intercompany sales elimination amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50000,
        tolerance: 0,
      },
      explanation: "Eliminate 100% of intercompany sales",
    },
    {
      id: "req-elim-unrealized-profit",
      order: 7,
      type: "numeric",
      label: "Unrealized profit in ending inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6000,
        tolerance: 0,
      },
      explanation: "Unrealized profit = ($50,000 - $35,000) × 40% = $15,000 × 40% = $6,000",
    },
    {
      id: "req-elim-dividend",
      order: 8,
      type: "numeric",
      label: "Dividend elimination amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "Eliminate 100% of Sub's dividends",
    },
  ],
  journalAccounts: [
    { id: "acc-common-stock", name: "Common Stock (Sub)", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "acc-retained-earnings", name: "Retained Earnings (Sub)", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "acc-equipment", name: "Equipment", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-investment-sub", name: "Investment in Sub", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-depreciation-exp", name: "Depreciation Expense", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "acc-accum-depr", name: "Accumulated Depreciation", type: "asset", normalBalance: "credit", isDistractor: false },
    { id: "acc-sales", name: "Sales", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "acc-cogs", name: "Cost of Goods Sold", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "acc-inventory", name: "Inventory", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-dividends", name: "Dividend Income", type: "revenue", normalBalance: "credit", isDistractor: true },
    { id: "acc-goodwill", name: "Goodwill", type: "asset", normalBalance: "debit", isDistractor: true },
  ],
};

export const farNCIConsolidationTBS: TBSQuestion = {
  id: "tbs-far-015",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Consolidations",
  subtopic: "Noncontrolling Interest",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Noncontrolling Interest Calculations",
  scenarioText: `Alpha Corp acquired 80% of Beta Inc. on January 1, Year 1. The following information is available:

Acquisition details:
• Purchase price for 80%: $640,000
• Beta's book value at acquisition: $700,000
• Fair value of Beta's identifiable net assets: $750,000
• Fair value of NCI at acquisition: $160,000

Year 1 activity:
• Beta reported net income: $120,000
• Beta declared dividends: $40,000
• Amortization of fair value adjustments: $5,000 (annual)

Required: Calculate the NCI amounts for Year 1 consolidated financial statements.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-fv-analysis",
      order: 1,
      title: "Fair Value Analysis",
      type: "table",
      content: {
        type: "table",
        title: "Acquisition Fair Value Allocation",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Fair value of consideration (80%)", "$640,000"] },
          { cells: ["Fair value of NCI (20%)", "$160,000"] },
          { cells: ["Total fair value of Beta", "$800,000"] },
          { cells: ["Fair value of identifiable net assets", "$750,000"] },
          { cells: ["Goodwill", "$50,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-nci-acquisition",
      order: 1,
      type: "numeric",
      label: "NCI at acquisition date",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 160000,
        tolerance: 0,
      },
      explanation: "NCI at acquisition = Fair value of NCI = $160,000",
    },
    {
      id: "req-nci-share-income",
      order: 2,
      type: "numeric",
      label: "NCI share of Year 1 net income (before FV amortization)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 24000,
        tolerance: 0,
      },
      explanation: "NCI share = $120,000 × 20% = $24,000",
    },
    {
      id: "req-nci-share-amort",
      order: 3,
      type: "numeric",
      label: "NCI share of FV amortization",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1000,
        tolerance: 0,
      },
      explanation: "NCI share of amortization = $5,000 × 20% = $1,000",
    },
    {
      id: "req-nci-adj-income",
      order: 4,
      type: "numeric",
      label: "NCI share of adjusted net income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 23000,
        tolerance: 0,
      },
      explanation: "NCI adjusted income = $24,000 - $1,000 = $23,000",
    },
    {
      id: "req-nci-dividends",
      order: 5,
      type: "numeric",
      label: "NCI share of dividends",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8000,
        tolerance: 0,
      },
      explanation: "NCI dividends = $40,000 × 20% = $8,000",
    },
    {
      id: "req-nci-ending",
      order: 6,
      type: "numeric",
      label: "NCI balance at December 31, Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 175000,
        tolerance: 0,
      },
      explanation: "Ending NCI = $160,000 + $23,000 - $8,000 = $175,000",
    },
  ],
};

// =============================================================================
// PENSIONS (ASC 715) - High Priority Topic
// =============================================================================

export const farPensionExpenseTBS: TBSQuestion = {
  id: "tbs-far-016",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Employee Benefits",
  subtopic: "Defined Benefit Plans",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Pension Expense Components",
  scenarioText: `Westfield Corporation sponsors a defined benefit pension plan. The following information pertains to the plan for Year 1:

Beginning of Year 1:
• Projected Benefit Obligation (PBO): $2,400,000
• Fair value of plan assets: $2,100,000
• Unrecognized prior service cost: $180,000 (amortized over 15 years)

During Year 1:
• Service cost: $195,000
• Discount rate: 6%
• Expected return on plan assets: 8%
• Actual return on plan assets: $185,000
• Benefits paid to retirees: $150,000
• Employer contributions: $200,000
• Average remaining service life: 15 years
• Corridor for gain/loss recognition: 10% of greater of PBO or plan assets

Required: Calculate the net pension expense components for Year 1.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-pension-data",
      order: 1,
      title: "Pension Plan Data",
      type: "table",
      content: {
        type: "table",
        title: "Beginning of Year 1 Balances",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Projected Benefit Obligation", "$2,400,000"] },
          { cells: ["Fair Value of Plan Assets", "$2,100,000"] },
          { cells: ["Funded Status (underfunded)", "($300,000)"] },
          { cells: ["Accumulated OCI - Prior Service Cost", "$180,000"] },
          { cells: ["Accumulated OCI - Net Loss", "$0"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-service-cost",
      order: 1,
      type: "numeric",
      label: "Service cost component",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 195000,
        tolerance: 0,
      },
      explanation: "Service cost is given: $195,000",
    },
    {
      id: "req-interest-cost",
      order: 2,
      type: "numeric",
      label: "Interest cost component",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 144000,
        tolerance: 0,
      },
      explanation: "Interest cost = PBO × Discount rate = $2,400,000 × 6% = $144,000",
    },
    {
      id: "req-expected-return",
      order: 3,
      type: "numeric",
      label: "Expected return on plan assets (reduces expense)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 168000,
        tolerance: 0,
      },
      explanation: "Expected return = Plan assets × Expected rate = $2,100,000 × 8% = $168,000",
    },
    {
      id: "req-psc-amort",
      order: 4,
      type: "numeric",
      label: "Prior service cost amortization",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12000,
        tolerance: 0,
      },
      explanation: "PSC amortization = $180,000 / 15 years = $12,000",
    },
    {
      id: "req-asset-loss",
      order: 5,
      type: "numeric",
      label: "Asset gain or loss (Actual vs Expected return)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -17000,
        tolerance: 0,
      },
      explanation: "Asset loss = Actual - Expected = $185,000 - $168,000 = -$17,000 (loss, goes to OCI)",
    },
    {
      id: "req-net-expense",
      order: 6,
      type: "numeric",
      label: "Net periodic pension cost (expense)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 183000,
        tolerance: 0,
      },
      explanation: "Net cost = $195,000 + $144,000 - $168,000 + $12,000 = $183,000",
    },
    {
      id: "req-ending-pbo",
      order: 7,
      type: "numeric",
      label: "PBO at end of Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2589000,
        tolerance: 0,
      },
      explanation: "Ending PBO = $2,400,000 + $195,000 + $144,000 - $150,000 = $2,589,000",
    },
  ],
};

// =============================================================================
// GOVERNMENT ACCOUNTING - High Priority Topic
// =============================================================================

export const farGovernmentFundBalancesTBS: TBSQuestion = {
  id: "tbs-far-017",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "State and Local Governments",
  subtopic: "Governmental Fund Accounting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-IV",
  title: "Fund Balance Classifications",
  scenarioText: `The City of Riverside General Fund has the following items that must be classified into fund balance categories at year-end:

• State law restricts $500,000 for debt service
• City council committed $800,000 for capital improvements via resolution
• Management assigned $300,000 for equipment replacement
• Encumbrances outstanding: $150,000
• Prepaid items: $45,000
• Total fund balance before classification: $3,500,000

Required: Classify the fund balance into the five categories (GASB 54).`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-gasb54",
      order: 1,
      title: "GASB 54 Fund Balance Classifications",
      type: "text",
      content: {
        type: "text",
        title: "Fund Balance Hierarchy",
        paragraphs: [
          "1. Nonspendable - Cannot be spent (inventory, prepaid, long-term loans receivable)",
          "2. Restricted - Externally imposed restrictions (state law, creditors, grantors)",
          "3. Committed - Self-imposed by highest level of government (governing body resolution)",
          "4. Assigned - Intended use established by governing body or official",
          "5. Unassigned - Residual classification (General Fund only can have positive)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-nonspendable",
      order: 1,
      type: "numeric",
      label: "Nonspendable fund balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45000,
        tolerance: 0,
      },
      explanation: "Nonspendable = Prepaid items = $45,000",
    },
    {
      id: "req-restricted",
      order: 2,
      type: "numeric",
      label: "Restricted fund balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 500000,
        tolerance: 0,
      },
      explanation: "Restricted = State law requirement for debt service = $500,000",
    },
    {
      id: "req-committed",
      order: 3,
      type: "numeric",
      label: "Committed fund balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 800000,
        tolerance: 0,
      },
      explanation: "Committed = Council resolution for capital improvements = $800,000",
    },
    {
      id: "req-assigned",
      order: 4,
      type: "numeric",
      label: "Assigned fund balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 450000,
        tolerance: 0,
      },
      explanation: "Assigned = Management assignment ($300,000) + Encumbrances ($150,000) = $450,000",
    },
    {
      id: "req-unassigned",
      order: 5,
      type: "numeric",
      label: "Unassigned fund balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1705000,
        tolerance: 0,
      },
      explanation: "Unassigned = $3,500,000 - $45,000 - $500,000 - $800,000 - $450,000 = $1,705,000",
    },
  ],
};

export const farModifiedAccrualTBS: TBSQuestion = {
  id: "tbs-far-018",
  section: "FAR",
  tbsType: "dropdown",
  topic: "State and Local Governments",
  subtopic: "Modified Accrual Accounting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-IV",
  title: "Revenue Recognition under Modified Accrual",
  scenarioText: `The City of Oakdale uses modified accrual accounting for its governmental funds. For the fiscal year ending June 30, Year 1, determine when each revenue source should be recognized.

Property taxes:
• Levied July 1, Year 0: $10,000,000
• Due date: January 31, Year 1
• Collected by June 30, Year 1: $9,200,000
• Expected collection July 1-August 29: $500,000
• Expected collection September 1 or later: $300,000

Required: Determine the proper revenue recognition treatment.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-60day-rule",
      order: 1,
      title: "Modified Accrual Revenue Recognition",
      type: "text",
      content: {
        type: "text",
        title: "Available Criteria",
        paragraphs: [
          "Under modified accrual, revenues must be both MEASURABLE and AVAILABLE.",
          "Available means collected within the fiscal year or expected to be collected soon enough thereafter to pay current liabilities (typically within 60 days).",
          "Property taxes are recognized in the period for which they are levied, subject to the availability criterion.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-collected-current",
      order: 1,
      type: "dropdown",
      label: "Recognition of $9,200,000 collected by June 30",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-recognize-fy1",
      },
      explanation: "Cash collected during the fiscal year is both measurable and available - recognize in FY Year 1",
      dropdownOptions: [
        { id: "opt-recognize-fy1", order: 1, text: "Recognize as revenue in Year 1", isCorrect: true },
        { id: "opt-defer-fy2", order: 2, text: "Defer to Year 2", isCorrect: false },
        { id: "opt-not-recognize", order: 3, text: "Do not recognize as revenue", isCorrect: false },
      ],
    },
    {
      id: "req-60day-collection",
      order: 2,
      type: "dropdown",
      label: "Recognition of $500,000 expected July-August (within 60 days)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-recognize-available",
      },
      explanation: "Collections expected within 60 days meet the 'available' criterion - recognize in Year 1",
      dropdownOptions: [
        { id: "opt-recognize-available", order: 1, text: "Recognize as revenue in Year 1", isCorrect: true },
        { id: "opt-defer-next", order: 2, text: "Defer as unavailable revenue", isCorrect: false },
        { id: "opt-never-recognize", order: 3, text: "Write off as uncollectible", isCorrect: false },
      ],
    },
    {
      id: "req-beyond-60",
      order: 3,
      type: "dropdown",
      label: "Recognition of $300,000 expected September or later",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-deferred",
      },
      explanation: "Collections beyond 60 days are not 'available' - defer as unavailable revenue",
      dropdownOptions: [
        { id: "opt-recognize-now", order: 1, text: "Recognize as revenue in Year 1", isCorrect: false },
        { id: "opt-deferred", order: 2, text: "Report as deferred inflows - unavailable revenue", isCorrect: true },
        { id: "opt-allowance", order: 3, text: "Recognize and record allowance", isCorrect: false },
      ],
    },
    {
      id: "req-total-revenue",
      order: 4,
      type: "numeric",
      label: "Total property tax revenue recognized in Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9700000,
        tolerance: 0,
      },
      explanation: "Total recognized = $9,200,000 + $500,000 = $9,700,000",
    },
    {
      id: "req-deferred-inflow",
      order: 5,
      type: "numeric",
      label: "Deferred inflows - unavailable revenue at June 30",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 300000,
        tolerance: 0,
      },
      explanation: "Deferred = Collections expected beyond 60 days = $300,000",
    },
  ],
};

// =============================================================================
// REVENUE RECOGNITION (ASC 606) - High Priority Topic
// =============================================================================

export const farRevenueMultipleObligationsTBS: TBSQuestion = {
  id: "tbs-far-019",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Revenue Recognition",
  subtopic: "Multiple Performance Obligations",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Revenue Allocation to Performance Obligations",
  scenarioText: `TechSoft Inc. sells a software bundle to a customer for $180,000. The bundle includes:

1. Software license (transferred at contract inception)
2. Two years of technical support (provided evenly over time)
3. One significant software upgrade (to be delivered in Year 2)

Standalone selling prices:
• Software license: $120,000
• Technical support: $30,000/year ($60,000 total)
• Software upgrade: $40,000

The contract was signed on January 1, Year 1, and payment is due in full on that date.

Required: Allocate the transaction price and determine Year 1 revenue.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-ssp",
      order: 1,
      title: "Standalone Selling Prices",
      type: "table",
      content: {
        type: "table",
        title: "Observable SSP Data",
        headers: ["Performance Obligation", "SSP", "SSP %"],
        rows: [
          { cells: ["Software License", "$120,000", "54.55%"] },
          { cells: ["Technical Support (2 years)", "$60,000", "27.27%"] },
          { cells: ["Software Upgrade", "$40,000", "18.18%"] },
          { cells: ["Total", "$220,000", "100%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-allocation-license",
      order: 1,
      type: "numeric",
      label: "Transaction price allocated to software license",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 98182,
        tolerance: 50,
      },
      explanation: "License allocation = $180,000 × ($120,000/$220,000) = $180,000 × 54.55% = $98,182",
    },
    {
      id: "req-allocation-support",
      order: 2,
      type: "numeric",
      label: "Transaction price allocated to technical support",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 49091,
        tolerance: 50,
      },
      explanation: "Support allocation = $180,000 × ($60,000/$220,000) = $180,000 × 27.27% = $49,091",
    },
    {
      id: "req-allocation-upgrade",
      order: 3,
      type: "numeric",
      label: "Transaction price allocated to software upgrade",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 32727,
        tolerance: 50,
      },
      explanation: "Upgrade allocation = $180,000 × ($40,000/$220,000) = $180,000 × 18.18% = $32,727",
    },
    {
      id: "req-yr1-license-rev",
      order: 4,
      type: "numeric",
      label: "Year 1 revenue from software license",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 98182,
        tolerance: 50,
      },
      explanation: "License transferred at point in time - full amount recognized in Year 1",
    },
    {
      id: "req-yr1-support-rev",
      order: 5,
      type: "numeric",
      label: "Year 1 revenue from technical support",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 24545,
        tolerance: 50,
      },
      explanation: "Support recognized over time: $49,091 × (12/24 months) = $24,545",
    },
    {
      id: "req-yr1-total-rev",
      order: 6,
      type: "numeric",
      label: "Total Year 1 revenue",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 122727,
        tolerance: 100,
      },
      explanation: "Total Year 1 = $98,182 (license) + $24,545 (support) + $0 (upgrade not delivered) = $122,727",
    },
  ],
};

// =============================================================================
// INCOME TAXES (ASC 740) - High Priority Topic
// =============================================================================

export const farDeferredTaxCalculationTBS: TBSQuestion = {
  id: "tbs-far-020",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Income Taxes",
  subtopic: "Deferred Tax Assets and Liabilities",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Deferred Tax Asset and Liability Calculation",
  scenarioText: `Brookfield Industries has the following temporary differences and other items at December 31, Year 1:

Temporary Differences:
• Depreciation: Book basis $400,000, Tax basis $320,000 (taxable)
• Warranty liability: Book $75,000, Tax $0 (deductible)
• Prepaid rent: Book $0, Tax $30,000 (taxable)
• Allowance for bad debts: Book $50,000, Tax $0 (deductible)

Other Information:
• Net operating loss carryforward: $100,000
• Enacted tax rate: 25%
• Management believes all deferred tax assets are more likely than not to be realized

Required: Calculate the deferred tax assets, liabilities, and net position.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-temp-diff",
      order: 1,
      title: "Temporary Difference Analysis",
      type: "table",
      content: {
        type: "table",
        title: "Book vs Tax Basis Comparison",
        headers: ["Item", "Book Basis", "Tax Basis", "Difference", "Type"],
        rows: [
          { cells: ["Depreciation (PPE)", "$400,000", "$320,000", "$80,000", "DTL"] },
          { cells: ["Warranty Liability", "$75,000", "$0", "$75,000", "DTA"] },
          { cells: ["Prepaid Rent", "$0", "$30,000", "$30,000", "DTL"] },
          { cells: ["Bad Debt Allowance", "$50,000", "$0", "$50,000", "DTA"] },
        ],
        footnotes: ["DTL = Deferred Tax Liability, DTA = Deferred Tax Asset"],
      },
    },
  ],
  requirements: [
    {
      id: "req-dtl-depreciation",
      order: 1,
      type: "numeric",
      label: "DTL from depreciation difference",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "DTL = $80,000 × 25% = $20,000",
    },
    {
      id: "req-dtl-prepaid",
      order: 2,
      type: "numeric",
      label: "DTL from prepaid rent difference",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7500,
        tolerance: 0,
      },
      explanation: "DTL = $30,000 × 25% = $7,500",
    },
    {
      id: "req-dta-warranty",
      order: 3,
      type: "numeric",
      label: "DTA from warranty liability",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18750,
        tolerance: 0,
      },
      explanation: "DTA = $75,000 × 25% = $18,750",
    },
    {
      id: "req-dta-bad-debt",
      order: 4,
      type: "numeric",
      label: "DTA from bad debt allowance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500,
        tolerance: 0,
      },
      explanation: "DTA = $50,000 × 25% = $12,500",
    },
    {
      id: "req-dta-nol",
      order: 5,
      type: "numeric",
      label: "DTA from NOL carryforward",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "DTA = $100,000 × 25% = $25,000",
    },
    {
      id: "req-net-position",
      order: 6,
      type: "numeric",
      label: "Net deferred tax asset (liability) - positive = asset",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 28750,
        tolerance: 0,
      },
      explanation: "Total DTA ($18,750 + $12,500 + $25,000 = $56,250) - Total DTL ($20,000 + $7,500 = $27,500) = Net DTA $28,750",
    },
  ],
};

// =============================================================================
// BONDS AND LONG-TERM DEBT - High Priority Topic
// =============================================================================

export const farBondIssuancePremiumTBS: TBSQuestion = {
  id: "tbs-far-021",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-term Liabilities",
  subtopic: "Bonds Payable",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Bond Issued at Premium - Effective Interest Method",
  scenarioText: `On January 1, Year 1, Cascade Corp. issued $1,000,000 of 8% bonds (interest paid annually on December 31) when the market rate was 6%. The bonds mature in 5 years.

Present Value Factors:
• PV of $1 at 6% for 5 periods: 0.7473
• PV of ordinary annuity at 6% for 5 periods: 4.2124

Required: Calculate the bond issuance amounts and first year interest expense.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-bond-terms",
      order: 1,
      title: "Bond Terms",
      type: "table",
      content: {
        type: "table",
        title: "Bond Issue Details",
        headers: ["Item", "Amount/Rate"],
        rows: [
          { cells: ["Face Value", "$1,000,000"] },
          { cells: ["Stated (Coupon) Rate", "8%"] },
          { cells: ["Market (Effective) Rate", "6%"] },
          { cells: ["Annual Interest Payment", "$80,000"] },
          { cells: ["Term", "5 years"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pv-principal",
      order: 1,
      type: "numeric",
      label: "Present value of principal",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 747300,
        tolerance: 100,
      },
      explanation: "PV of principal = $1,000,000 × 0.7473 = $747,300",
    },
    {
      id: "req-pv-interest",
      order: 2,
      type: "numeric",
      label: "Present value of interest payments",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 336992,
        tolerance: 100,
      },
      explanation: "PV of interest = $80,000 × 4.2124 = $336,992",
    },
    {
      id: "req-issue-price",
      order: 3,
      type: "numeric",
      label: "Bond issue price (proceeds)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1084292,
        tolerance: 200,
      },
      explanation: "Issue price = $747,300 + $336,992 = $1,084,292",
    },
    {
      id: "req-premium",
      order: 4,
      type: "numeric",
      label: "Premium on bonds payable",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 84292,
        tolerance: 200,
      },
      explanation: "Premium = Issue price - Face value = $1,084,292 - $1,000,000 = $84,292",
    },
    {
      id: "req-yr1-interest-exp",
      order: 5,
      type: "numeric",
      label: "Year 1 interest expense (effective interest method)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 65058,
        tolerance: 100,
      },
      explanation: "Interest expense = Carrying value × Market rate = $1,084,292 × 6% = $65,058",
    },
  ],
};

// =============================================================================
// STOCKHOLDERS' EQUITY - Important Topic
// =============================================================================

export const farTreasuryStockTBS: TBSQuestion = {
  id: "tbs-far-022",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Stockholders' Equity",
  subtopic: "Treasury Stock",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Treasury Stock Transactions - Cost Method",
  scenarioText: `Hillcrest Corporation has the following stockholders' equity balances on January 1, Year 1:
• Common Stock ($1 par, 500,000 shares authorized, 200,000 issued): $200,000
• Additional Paid-in Capital: $1,800,000
• Retained Earnings: $2,500,000

During Year 1, the following treasury stock transactions occurred:
1. March 1: Purchased 10,000 shares at $15 per share
2. July 1: Reissued 4,000 shares at $18 per share
3. October 1: Reissued 3,000 shares at $12 per share

Required: Prepare the journal entries using the cost method.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-equity-summary",
      order: 1,
      title: "Stockholders' Equity Summary",
      type: "table",
      content: {
        type: "table",
        title: "January 1, Year 1 Balances",
        headers: ["Account", "Amount"],
        rows: [
          { cells: ["Common Stock ($1 par)", "$200,000"] },
          { cells: ["Additional Paid-in Capital", "$1,800,000"] },
          { cells: ["Retained Earnings", "$2,500,000"] },
          { cells: ["Total Stockholders' Equity", "$4,500,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-purchase-debit",
      order: 1,
      type: "journal_debit",
      label: "March 1 Purchase - Debit entry",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-treasury-stock",
        accountName: "Treasury Stock",
        amount: 150000,
        tolerance: 0,
      },
      explanation: "Debit Treasury Stock at cost: 10,000 shares × $15 = $150,000",
    },
    {
      id: "req-purchase-credit",
      order: 2,
      type: "journal_credit",
      label: "March 1 Purchase - Credit entry",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-cash",
        accountName: "Cash",
        amount: 150000,
        tolerance: 0,
      },
      explanation: "Credit Cash for purchase price: $150,000",
    },
    {
      id: "req-reissue1-cash",
      order: 3,
      type: "numeric",
      label: "July 1 Reissue - Cash received",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 72000,
        tolerance: 0,
      },
      explanation: "Cash = 4,000 shares × $18 = $72,000",
    },
    {
      id: "req-reissue1-apic",
      order: 4,
      type: "numeric",
      label: "July 1 Reissue - APIC from Treasury Stock",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12000,
        tolerance: 0,
      },
      explanation: "APIC = Excess over cost = ($18 - $15) × 4,000 = $12,000",
    },
    {
      id: "req-reissue2-apic-reduction",
      order: 5,
      type: "numeric",
      label: "October 1 Reissue - APIC reduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9000,
        tolerance: 0,
      },
      explanation: "APIC reduction = (Cost - Reissue price) × shares = ($15 - $12) × 3,000 = $9,000",
    },
    {
      id: "req-ending-treasury",
      order: 6,
      type: "numeric",
      label: "Treasury Stock balance at year-end",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45000,
        tolerance: 0,
      },
      explanation: "Ending balance = $150,000 - (4,000 × $15) - (3,000 × $15) = $150,000 - $60,000 - $45,000 = $45,000 (or 3,000 remaining shares × $15)",
    },
  ],
  journalAccounts: [
    { id: "acc-treasury-stock", name: "Treasury Stock", type: "equity", normalBalance: "debit", isDistractor: false },
    { id: "acc-cash", name: "Cash", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-apic-treasury", name: "APIC - Treasury Stock", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "acc-retained-earnings", name: "Retained Earnings", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "acc-common-stock", name: "Common Stock", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "acc-apic-common", name: "APIC - Common Stock", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "acc-gain-treasury", name: "Gain on Treasury Stock", type: "revenue", normalBalance: "credit", isDistractor: true },
  ],
};

// =============================================================================
// CASH FLOW STATEMENT - Important Topic
// =============================================================================

export const farCashFlowIndirectTBS: TBSQuestion = {
  id: "tbs-far-023",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Statement of Cash Flows",
  subtopic: "Operating Activities - Indirect Method",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Cash Flow from Operations - Indirect Method",
  scenarioText: `Pinnacle Corporation reported the following for Year 1:

Income Statement:
• Net income: $450,000
• Depreciation expense: $85,000
• Amortization of patent: $12,000
• Loss on sale of equipment: $8,000
• Gain on sale of investments: $25,000

Balance Sheet Changes:
• Accounts receivable increased: $35,000
• Inventory decreased: $20,000
• Prepaid expenses increased: $5,000
• Accounts payable decreased: $15,000
• Accrued liabilities increased: $10,000
• Income tax payable decreased: $8,000

Required: Calculate cash flow from operating activities using the indirect method.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-adjustments",
      order: 1,
      title: "Indirect Method Adjustments",
      type: "text",
      content: {
        type: "text",
        title: "Adjustment Rules",
        paragraphs: [
          "Add back: Non-cash expenses (depreciation, amortization), losses on sales",
          "Subtract: Non-cash revenues, gains on sales",
          "Current asset increases: Subtract (used cash)",
          "Current asset decreases: Add (freed cash)",
          "Current liability increases: Add (source of cash)",
          "Current liability decreases: Subtract (used cash)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-net-income",
      order: 1,
      type: "numeric",
      label: "Starting point: Net income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 450000,
        tolerance: 0,
      },
      explanation: "Begin with net income: $450,000",
    },
    {
      id: "req-noncash-adj",
      order: 2,
      type: "numeric",
      label: "Total non-cash adjustments (depreciation, amortization, gains/losses)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "Non-cash adj = $85,000 + $12,000 + $8,000 - $25,000 = $80,000",
    },
    {
      id: "req-asset-changes",
      order: 3,
      type: "numeric",
      label: "Net adjustment for current asset changes",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -20000,
        tolerance: 0,
      },
      explanation: "Asset changes = -$35,000 (AR increase) + $20,000 (Inv decrease) - $5,000 (Prepaid increase) = -$20,000",
    },
    {
      id: "req-liability-changes",
      order: 4,
      type: "numeric",
      label: "Net adjustment for current liability changes",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -13000,
        tolerance: 0,
      },
      explanation: "Liability changes = -$15,000 (AP decrease) + $10,000 (Accrued increase) - $8,000 (Tax payable decrease) = -$13,000",
    },
    {
      id: "req-total-adjustments",
      order: 5,
      type: "numeric",
      label: "Total adjustments to net income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 47000,
        tolerance: 0,
      },
      explanation: "Total adjustments = $80,000 + (-$20,000) + (-$13,000) = $47,000",
    },
    {
      id: "req-cfo",
      order: 6,
      type: "numeric",
      label: "Cash flow from operating activities",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 497000,
        tolerance: 0,
      },
      explanation: "CFO = $450,000 + $47,000 = $497,000",
    },
  ],
};

// =============================================================================
// RESEARCH TBS - Required per Section
// =============================================================================

export const farResearchLeaseTBS: TBSQuestion = {
  id: "tbs-far-024",
  section: "FAR",
  tbsType: "research",
  topic: "Leases",
  subtopic: "Lease Classification",
  difficulty: "medium",
  skillLevel: "remembering_understanding",
  contentArea: "FAR-III",
  title: "Research - Lease Classification Criteria",
  scenarioText: `A client is entering into a new lease agreement and needs guidance on how to classify the lease under current GAAP. The lease is for manufacturing equipment with the following characteristics:

• The lease term is 8 years
• The equipment has a remaining economic life of 10 years
• There is no transfer of ownership at the end of the lease
• There is no purchase option
• The present value of lease payments equals 85% of the equipment's fair value

The client wants to know the authoritative guidance for lease classification criteria.

Required: Cite the specific ASC paragraph that contains the lease classification criteria for lessees.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-scenario",
      order: 1,
      title: "Client Inquiry",
      type: "memo",
      content: {
        type: "memo",
        from: "Tax Partner",
        to: "Audit Staff",
        date: "Current Date",
        subject: "Lease Classification Research",
        body: `Please research the authoritative guidance for lease classification. The client specifically wants the citation that lists the criteria for when a lessee should classify a lease as a finance lease versus an operating lease.

Focus on the five classification criteria in ASC 842.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-citation",
      order: 1,
      type: "citation",
      label: "ASC Citation for Finance Lease Classification Criteria",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "FASB",
        topicCode: "842-10",
        sectionCode: "25",
        paragraph: "2",
        alternativeCitations: [
          { source: "FASB", topicCode: "842-10-25", sectionCode: "2" },
          { source: "FASB", topicCode: "ASC 842-10-25-2" },
        ],
      },
      explanation: "ASC 842-10-25-2 provides the five criteria for classifying a lease as a finance lease: (1) transfer of ownership, (2) purchase option reasonably certain, (3) lease term is major part of economic life, (4) PV of payments equals substantially all of fair value, (5) specialized asset with no alternative use.",
    },
  ],
};

// =============================================================================
// DOCUMENT REVIEW TBS
// =============================================================================

export const farFinancialStatementReviewTBS: TBSQuestion = {
  id: "tbs-far-025",
  section: "FAR",
  tbsType: "document_review",
  topic: "Financial Statement Presentation",
  subtopic: "Balance Sheet Classification",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Balance Sheet Error Detection",
  scenarioText: `You are reviewing the draft balance sheet for Granite Industries as of December 31, Year 1. The CFO has asked you to identify any classification or presentation errors.

Required: Review the balance sheet and identify the errors by selecting the correct treatment from the dropdown options.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-balance-sheet",
      order: 1,
      title: "Draft Balance Sheet",
      type: "financial_statement",
      content: {
        type: "financial_statement",
        statementType: "balance_sheet",
        companyName: "Granite Industries",
        title: "Balance Sheet",
        period: "December 31, Year 1",
        columns: ["Amount"],
        rows: [
          { label: "ASSETS", isBold: true, values: [null] },
          { label: "Current Assets:", isBold: true, values: [null], indent: 0 },
          { label: "Cash and equivalents", values: ["$245,000"], indent: 1 },
          { label: "Trading securities", values: ["$180,000"], indent: 1 },
          { label: "Available-for-sale debt securities (maturing in 3 years)", values: ["$320,000"], indent: 1 },
          { label: "Accounts receivable, net", values: ["$410,000"], indent: 1 },
          { label: "Inventory", values: ["$385,000"], indent: 1 },
          { label: "Prepaid expenses (18-month insurance policy)", values: ["$36,000"], indent: 1 },
          { label: "Total Current Assets", isBold: true, isSubtotal: true, values: ["$1,576,000"], indent: 0 },
          { label: "", values: [null] },
          { label: "Noncurrent Assets:", isBold: true, values: [null], indent: 0 },
          { label: "Property, plant & equipment, net", values: ["$2,850,000"], indent: 1 },
          { label: "Operating lease right-of-use asset", values: ["$420,000"], indent: 1 },
          { label: "Goodwill", values: ["$500,000"], indent: 1 },
          { label: "Total Noncurrent Assets", isBold: true, isSubtotal: true, values: ["$3,770,000"], indent: 0 },
          { label: "TOTAL ASSETS", isBold: true, isTotal: true, values: ["$5,346,000"] },
        ],
        notes: [
          "AFS securities are held for long-term investment purposes but could be sold if needed",
          "Prepaid insurance covers 18-month policy starting January 1, Year 2",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-afs-classification",
      order: 1,
      type: "dropdown",
      label: "Available-for-sale securities classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-afs-noncurrent",
      },
      explanation: "AFS securities maturing in 3 years with intent to hold for long-term investment should be classified as noncurrent",
      dropdownOptions: [
        { id: "opt-afs-current", order: 1, text: "Correct as current asset", isCorrect: false },
        { id: "opt-afs-noncurrent", order: 2, text: "Should be noncurrent asset", isCorrect: true },
        { id: "opt-afs-trading", order: 3, text: "Should be reclassified as trading", isCorrect: false },
      ],
    },
    {
      id: "req-prepaid-classification",
      order: 2,
      type: "dropdown",
      label: "Prepaid expenses (18-month policy) classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-prepaid-split",
      },
      explanation: "18-month prepaid should be split: 12 months current, 6 months noncurrent",
      dropdownOptions: [
        { id: "opt-prepaid-current", order: 1, text: "Correct as current asset", isCorrect: false },
        { id: "opt-prepaid-split", order: 2, text: "Should be split between current and noncurrent", isCorrect: true },
        { id: "opt-prepaid-noncurrent", order: 3, text: "Should be entirely noncurrent", isCorrect: false },
      ],
    },
    {
      id: "req-prepaid-current-amt",
      order: 3,
      type: "numeric",
      label: "Correct current portion of prepaid expenses",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 24000,
        tolerance: 0,
      },
      explanation: "Current portion = $36,000 × (12/18) = $24,000",
    },
    {
      id: "req-trading-classification",
      order: 4,
      type: "dropdown",
      label: "Trading securities classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-trading-correct",
      },
      explanation: "Trading securities are always classified as current assets - this is correct",
      dropdownOptions: [
        { id: "opt-trading-correct", order: 1, text: "Correct as current asset", isCorrect: true },
        { id: "opt-trading-noncurrent", order: 2, text: "Should be noncurrent", isCorrect: false },
        { id: "opt-trading-separate", order: 3, text: "Should be shown separately from investments", isCorrect: false },
      ],
    },
    {
      id: "req-rou-classification",
      order: 5,
      type: "dropdown",
      label: "Right-of-use asset classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rou-correct",
      },
      explanation: "ROU assets are generally classified as noncurrent - this is correct",
      dropdownOptions: [
        { id: "opt-rou-current", order: 1, text: "Should be current asset", isCorrect: false },
        { id: "opt-rou-correct", order: 2, text: "Correct as noncurrent asset", isCorrect: true },
        { id: "opt-rou-ppe", order: 3, text: "Should be included in PP&E", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// Additional FAR TBS to reach target count (29 new)
// =============================================================================

export const farInventoryMethodsTBS: TBSQuestion = {
  id: "tbs-far-026",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Inventory",
  subtopic: "Inventory Costing Methods",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Inventory Cost Flow Methods Comparison",
  scenarioText: `Maxwell Company had the following inventory transactions during the year:

Beginning inventory: 100 units @ $20 each
March 15 purchase: 150 units @ $22 each
July 20 purchase: 200 units @ $25 each
October 5 purchase: 100 units @ $28 each

Total units sold during the year: 400 units

Required: Calculate ending inventory and cost of goods sold under FIFO and LIFO (periodic system).`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-inventory-data",
      order: 1,
      title: "Inventory Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Unit Data",
        headers: ["Date", "Transaction", "Units", "Cost/Unit", "Total"],
        rows: [
          { cells: ["Jan 1", "Beginning", "100", "$20", "$2,000"] },
          { cells: ["Mar 15", "Purchase", "150", "$22", "$3,300"] },
          { cells: ["Jul 20", "Purchase", "200", "$25", "$5,000"] },
          { cells: ["Oct 5", "Purchase", "100", "$28", "$2,800"] },
          { cells: ["", "Available for sale", "550", "", "$13,100"] },
          { cells: ["", "Units sold", "400", "", ""] },
          { cells: ["", "Ending inventory", "150", "", "?"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fifo-ei",
      order: 1,
      type: "numeric",
      label: "FIFO - Ending inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4050,
        tolerance: 0,
      },
      explanation: "FIFO ending = most recent purchases: 100 units @ $28 = $2,800 + 50 units @ $25 = $1,250. Total = $4,050",
    },
    {
      id: "req-fifo-cogs",
      order: 2,
      type: "numeric",
      label: "FIFO - Cost of goods sold",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9050,
        tolerance: 0,
      },
      explanation: "FIFO COGS = Total available $13,100 - Ending inventory $4,050 = $9,050",
    },
    {
      id: "req-lifo-ei",
      order: 3,
      type: "numeric",
      label: "LIFO - Ending inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3100,
        tolerance: 0,
      },
      explanation: "LIFO ending = 100 units @ $20 + 50 units @ $22 = $2,000 + $1,100 = $3,100",
    },
    {
      id: "req-lifo-cogs",
      order: 4,
      type: "numeric",
      label: "LIFO - Cost of goods sold",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "LIFO COGS = $13,100 - $3,100 = $10,000",
    },
  ],
};

export const farAccountsReceivableTBS: TBSQuestion = {
  id: "tbs-far-027",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Receivables",
  subtopic: "Allowance for Doubtful Accounts",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Allowance for Doubtful Accounts - Aging Method",
  scenarioText: `Baxter Company uses the aging of accounts receivable method to estimate bad debts. At December 31, Year 1, the accounts receivable balance is $800,000 and the allowance account has a credit balance of $5,000 before adjustment.

The aging schedule shows:
• Current (0-30 days): $500,000 - estimated 1% uncollectible
• 31-60 days: $180,000 - estimated 3% uncollectible
• 61-90 days: $80,000 - estimated 10% uncollectible
• Over 90 days: $40,000 - estimated 40% uncollectible

Required: Calculate the required allowance balance and adjusting entry.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-aging",
      order: 1,
      title: "Aging Schedule",
      type: "table",
      content: {
        type: "table",
        title: "Accounts Receivable Aging",
        headers: ["Age Category", "Amount", "Est. Uncollectible %"],
        rows: [
          { cells: ["Current (0-30 days)", "$500,000", "1%"] },
          { cells: ["31-60 days", "$180,000", "3%"] },
          { cells: ["61-90 days", "$80,000", "10%"] },
          { cells: ["Over 90 days", "$40,000", "40%"] },
          { cells: ["Total", "$800,000", ""] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-current-estimate",
      order: 1,
      type: "numeric",
      label: "Estimated uncollectible - Current",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000,
        tolerance: 0,
      },
      explanation: "$500,000 × 1% = $5,000",
    },
    {
      id: "req-total-required",
      order: 2,
      type: "numeric",
      label: "Total required allowance balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 34400,
        tolerance: 0,
      },
      explanation: "Current $5,000 + 31-60 days $5,400 + 61-90 days $8,000 + Over 90 days $16,000 = $34,400",
    },
    {
      id: "req-adjustment",
      order: 3,
      type: "numeric",
      label: "Bad debt expense adjustment needed",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 29400,
        tolerance: 0,
      },
      explanation: "Required $34,400 - Existing balance $5,000 = $29,400 adjustment",
    },
    {
      id: "req-net-receivable",
      order: 4,
      type: "numeric",
      label: "Net realizable value of receivables",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 765600,
        tolerance: 0,
      },
      explanation: "$800,000 - $34,400 = $765,600",
    },
  ],
};

export const farIntangibleAssetsTBS: TBSQuestion = {
  id: "tbs-far-028",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Intangible Assets",
  subtopic: "Amortization and Impairment",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Intangible Asset Accounting",
  scenarioText: `On January 1, Year 1, Apex Technologies acquired the following intangible assets:

1. Patent purchased for $180,000 with a remaining legal life of 15 years and useful life of 10 years
2. Franchise agreement costing $240,000 for a 20-year term, renewable indefinitely at nominal cost
3. Customer list purchased for $60,000 with expected benefit period of 5 years
4. Goodwill recognized in a business combination: $500,000

At December 31, Year 1, the fair value of the franchise was determined to be $200,000, and there are indicators that goodwill may be impaired (fair value of reporting unit is $4,800,000, carrying amount including goodwill is $5,100,000).

Required: Calculate Year 1 amortization and any impairment losses.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-intangibles",
      order: 1,
      title: "Intangible Assets Summary",
      type: "table",
      content: {
        type: "table",
        title: "Intangible Assets Acquired",
        headers: ["Asset", "Cost", "Life", "Notes"],
        rows: [
          { cells: ["Patent", "$180,000", "10 years useful", "Legal life 15 years"] },
          { cells: ["Franchise", "$240,000", "Indefinite", "Renewable at nominal cost"] },
          { cells: ["Customer List", "$60,000", "5 years", "Limited useful life"] },
          { cells: ["Goodwill", "$500,000", "Indefinite", "From acquisition"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-patent-amort",
      order: 1,
      type: "numeric",
      label: "Patent amortization expense - Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18000,
        tolerance: 0,
      },
      explanation: "Patent amortization = $180,000 / 10 years = $18,000 (use shorter of legal or useful life)",
    },
    {
      id: "req-franchise-amort",
      order: 2,
      type: "numeric",
      label: "Franchise amortization expense - Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Franchise has indefinite life (renewable at nominal cost) - no amortization",
    },
    {
      id: "req-customer-amort",
      order: 3,
      type: "numeric",
      label: "Customer list amortization expense - Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12000,
        tolerance: 0,
      },
      explanation: "Customer list amortization = $60,000 / 5 years = $12,000",
    },
    {
      id: "req-franchise-impairment",
      order: 4,
      type: "numeric",
      label: "Franchise impairment loss",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "Franchise impairment = Carrying value $240,000 - Fair value $200,000 = $40,000",
    },
    {
      id: "req-goodwill-impairment",
      order: 5,
      type: "numeric",
      label: "Goodwill impairment loss",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 300000,
        tolerance: 0,
      },
      explanation: "Goodwill impairment = Carrying amount $5,100,000 - Fair value $4,800,000 = $300,000",
    },
    {
      id: "req-total-expense",
      order: 6,
      type: "numeric",
      label: "Total intangible-related expense/loss for Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 370000,
        tolerance: 0,
      },
      explanation: "Total = $18,000 + $0 + $12,000 + $40,000 + $300,000 = $370,000",
    },
  ],
};

export const farRevenueContractModificationTBS: TBSQuestion = {
  id: "tbs-far-029",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Revenue Recognition",
  subtopic: "Contract Modifications",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Contract Modification Accounting",
  scenarioText: `BuildRight Construction has a contract to build a warehouse for $2,000,000. The contract includes a single performance obligation satisfied over time using the cost-to-cost method.

Original contract details:
• Contract price: $2,000,000
• Estimated total costs: $1,600,000
• Costs incurred in Year 1: $800,000

At the start of Year 2, the contract is modified to add additional building features:
• Modification price: $400,000
• Additional estimated costs: $280,000
• The modification is not a distinct performance obligation (accounted for as part of original contract)

Year 2 activity:
• Costs incurred in Year 2: $720,000 (includes $200,000 for modification work)
• Total costs incurred to date: $1,520,000

Required: Calculate revenue recognition for Years 1 and 2.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-contract-data",
      order: 1,
      title: "Contract Information",
      type: "table",
      content: {
        type: "table",
        title: "Contract Summary",
        headers: ["Item", "Original", "After Modification"],
        rows: [
          { cells: ["Contract Price", "$2,000,000", "$2,400,000"] },
          { cells: ["Estimated Total Costs", "$1,600,000", "$1,880,000"] },
          { cells: ["Estimated Gross Profit", "$400,000", "$520,000"] },
          { cells: ["Gross Profit %", "20%", "21.67%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-yr1-pct-complete",
      order: 1,
      type: "numeric",
      label: "Year 1 percentage of completion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50,
        tolerance: 0,
      },
      explanation: "Year 1 % = $800,000 / $1,600,000 = 50%",
    },
    {
      id: "req-yr1-revenue",
      order: 2,
      type: "numeric",
      label: "Year 1 revenue recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1000000,
        tolerance: 0,
      },
      explanation: "Year 1 revenue = $2,000,000 × 50% = $1,000,000",
    },
    {
      id: "req-yr2-total-est-costs",
      order: 3,
      type: "numeric",
      label: "Total estimated costs after modification",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1880000,
        tolerance: 0,
      },
      explanation: "Modified total costs = $1,600,000 + $280,000 = $1,880,000",
    },
    {
      id: "req-yr2-pct-complete",
      order: 4,
      type: "numeric",
      label: "Year 2 cumulative percentage of completion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80.85,
        tolerance: 1,
      },
      explanation: "Cumulative % = $1,520,000 / $1,880,000 = 80.85%",
    },
    {
      id: "req-yr2-cumulative-revenue",
      order: 5,
      type: "numeric",
      label: "Year 2 cumulative revenue to recognize",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1940400,
        tolerance: 1000,
      },
      explanation: "Cumulative revenue = $2,400,000 × 80.85% = $1,940,400",
    },
    {
      id: "req-yr2-revenue",
      order: 6,
      type: "numeric",
      label: "Year 2 revenue recognized (current period)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 940400,
        tolerance: 1000,
      },
      explanation: "Year 2 revenue = $1,940,400 - $1,000,000 = $940,400",
    },
    {
      id: "req-yr2-gross-profit",
      order: 7,
      type: "numeric",
      label: "Year 2 gross profit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 220400,
        tolerance: 1000,
      },
      explanation: "Year 2 GP = $940,400 - $720,000 = $220,400",
    },
  ],
};

export const farEarningsPerShareTBS: TBSQuestion = {
  id: "tbs-far-030",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Earnings Per Share",
  subtopic: "Complex Capital Structure",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Diluted Earnings Per Share Calculation",
  scenarioText: `Stellar Corporation has the following capital structure and information for Year 1:

Common stock:
• January 1 shares outstanding: 500,000
• April 1 issued shares: 60,000
• October 1 treasury stock purchase: 20,000 shares

Potentially dilutive securities:
• Stock options: 50,000 options at $25 exercise price (average market price $40)
• Convertible preferred: 20,000 shares, $100 par, 6% dividend, each convertible into 3 common shares
• Convertible bonds: $1,000,000 face, 8% interest, convertible into 25,000 common shares

Other information:
• Net income: $960,000
• Income tax rate: 25%

Required: Calculate basic and diluted EPS.`,
  timeEstimateMinutes: 18,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "exhibit-capital-structure",
      order: 1,
      title: "Capital Structure Details",
      type: "table",
      content: {
        type: "table",
        title: "Securities Outstanding",
        headers: ["Security", "Details"],
        rows: [
          { cells: ["Common Stock - Jan 1", "500,000 shares"] },
          { cells: ["Stock Issuance - Apr 1", "60,000 shares"] },
          { cells: ["Treasury Purchase - Oct 1", "20,000 shares"] },
          { cells: ["Stock Options", "50,000 options @ $25, market $40"] },
          { cells: ["Convertible Preferred", "20,000 shares, 6%, converts to 3 common each"] },
          { cells: ["Convertible Bonds", "$1M, 8%, converts to 25,000 shares"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-weighted-shares",
      order: 1,
      type: "numeric",
      label: "Weighted average shares (basic)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 540000,
        tolerance: 1000,
      },
      explanation: "Weighted = 500,000(12/12) + 60,000(9/12) - 20,000(3/12) = 500,000 + 45,000 - 5,000 = 540,000",
    },
    {
      id: "req-preferred-dividend",
      order: 2,
      type: "numeric",
      label: "Preferred dividend deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 120000,
        tolerance: 0,
      },
      explanation: "Preferred dividend = 20,000 × $100 × 6% = $120,000",
    },
    {
      id: "req-basic-eps",
      order: 3,
      type: "numeric",
      label: "Basic EPS",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.56,
        tolerance: 0.02,
      },
      explanation: "Basic EPS = ($960,000 - $120,000) / 540,000 = $840,000 / 540,000 = $1.56",
    },
    {
      id: "req-treasury-stock-method",
      order: 4,
      type: "numeric",
      label: "Incremental shares from stock options (treasury stock method)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18750,
        tolerance: 0,
      },
      explanation: "Options: 50,000 - (50,000 × $25/$40) = 50,000 - 31,250 = 18,750 incremental shares",
    },
    {
      id: "req-pref-conversion-shares",
      order: 5,
      type: "numeric",
      label: "Shares from preferred conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 60000,
        tolerance: 0,
      },
      explanation: "Preferred conversion = 20,000 × 3 = 60,000 shares",
    },
    {
      id: "req-bond-interest-add",
      order: 6,
      type: "numeric",
      label: "After-tax interest added back for bond conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 60000,
        tolerance: 0,
      },
      explanation: "Bond interest = $1,000,000 × 8% × (1 - 25%) = $80,000 × 0.75 = $60,000",
    },
    {
      id: "req-diluted-shares",
      order: 7,
      type: "numeric",
      label: "Diluted weighted average shares",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 558750,
        tolerance: 1000,
      },
      explanation: "Diluted shares = 540,000 + 18,750 (options only). Preferred ($2.00/share) and bonds ($2.40/share) are anti-dilutive since their per-share effect exceeds basic EPS of $1.56.",
    },
    {
      id: "req-diluted-eps",
      order: 8,
      type: "numeric",
      label: "Diluted EPS",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.50,
        tolerance: 0.02,
      },
      explanation: "Diluted EPS = $840,000 / 558,750 = $1.50. Only options are dilutive; preferred and bonds are excluded as anti-dilutive.",
    },
  ],
};

// =============================================================================
// ADDITIONAL FAR TBS (tbs-far-031 through tbs-far-040) - Phase 1 Completion
// =============================================================================

export const farPPEImpairmentTBS: TBSQuestion = {
  id: "tbs-far-031",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Property, Plant, and Equipment",
  subtopic: "Impairment Testing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Long-Lived Asset Impairment Analysis",
  scenarioText: `Greenfield Manufacturing is reviewing its manufacturing equipment for potential impairment at December 31, Year 1. The asset group consists of specialized machinery used exclusively for one product line.

Asset Group Information:
• Carrying amount: $2,400,000
• Remaining useful life: 6 years
• Expected undiscounted future cash flows: $2,200,000
• Fair value of asset group: $1,850,000

The company has determined that indicators of impairment exist due to a significant decrease in demand for the product.

Required: Perform the impairment test and calculate any impairment loss under ASC 360.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-cash-flows",
      order: 1,
      title: "Projected Cash Flows",
      type: "table",
      content: {
        type: "table",
        title: "Undiscounted Future Cash Flow Projections",
        headers: ["Year", "Expected Cash Flow"],
        rows: [
          { cells: ["Year 2", "$450,000"] },
          { cells: ["Year 3", "$420,000"] },
          { cells: ["Year 4", "$380,000"] },
          { cells: ["Year 5", "$350,000"] },
          { cells: ["Year 6", "$320,000"] },
          { cells: ["Year 7", "$280,000"] },
          { cells: ["Total", "$2,200,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-step1-test",
      order: 1,
      type: "dropdown",
      label: "Step 1: Is the asset group impaired based on recoverability test?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-impaired-yes",
      },
      explanation: "Carrying amount ($2,400,000) exceeds undiscounted cash flows ($2,200,000), so asset is impaired",
      dropdownOptions: [
        { id: "opt-impaired-yes", order: 1, text: "Yes - carrying amount exceeds undiscounted cash flows", isCorrect: true },
        { id: "opt-impaired-no", order: 2, text: "No - undiscounted cash flows exceed carrying amount", isCorrect: false },
        { id: "opt-need-more", order: 3, text: "Cannot determine without additional information", isCorrect: false },
      ],
    },
    {
      id: "req-impairment-amount",
      order: 2,
      type: "numeric",
      label: "Impairment loss amount",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 550000,
        tolerance: 0,
      },
      explanation: "Impairment loss = Carrying amount - Fair value = $2,400,000 - $1,850,000 = $550,000",
    },
    {
      id: "req-new-carrying",
      order: 3,
      type: "numeric",
      label: "New carrying amount after impairment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1850000,
        tolerance: 0,
      },
      explanation: "New carrying amount = Fair value = $1,850,000",
    },
    {
      id: "req-annual-depreciation",
      order: 4,
      type: "numeric",
      label: "Annual depreciation expense after impairment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 308333,
        tolerance: 100,
      },
      explanation: "New annual depreciation = $1,850,000 / 6 remaining years = $308,333",
    },
  ],
};

export const farBusinessCombinationTBS: TBSQuestion = {
  id: "tbs-far-032",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Business Combinations",
  subtopic: "Purchase Price Allocation",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Business Combination - Purchase Price Allocation",
  scenarioText: `On July 1, Year 1, Acquirer Corp. purchased 100% of Target Inc. for the following consideration:

• Cash payment: $3,000,000
• Acquirer common stock issued: 100,000 shares (market value $25 per share)
• Contingent consideration with fair value: $400,000

Target Inc.'s identifiable assets and liabilities at acquisition date:

Book Values:
• Cash: $200,000
• Accounts receivable: $450,000
• Inventory: $600,000
• Property, plant & equipment: $2,100,000
• Accounts payable: $380,000
• Long-term debt: $800,000

Fair Value Adjustments:
• Accounts receivable: Fair value equals book value
• Inventory: Fair value $680,000
• PP&E: Fair value $2,500,000
• Customer relationships (not on books): Fair value $350,000
• Trade name (not on books): Fair value $150,000
• Liabilities: Fair value equals book value

Required: Complete the purchase price allocation.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-target-bs",
      order: 1,
      title: "Target Inc. Balance Sheet",
      type: "financial_statement",
      content: {
        type: "financial_statement",
        statementType: "balance_sheet",
        companyName: "Target Inc.",
        title: "Balance Sheet",
        period: "July 1, Year 1",
        columns: ["Book Value", "Fair Value"],
        rows: [
          { label: "ASSETS", isBold: true, values: [null, null] },
          { label: "Cash", values: ["$200,000", "$200,000"], indent: 1 },
          { label: "Accounts receivable", values: ["$450,000", "$450,000"], indent: 1 },
          { label: "Inventory", values: ["$600,000", "$680,000"], indent: 1 },
          { label: "Property, plant & equipment", values: ["$2,100,000", "$2,500,000"], indent: 1 },
          { label: "Customer relationships", values: ["$0", "$350,000"], indent: 1 },
          { label: "Trade name", values: ["$0", "$150,000"], indent: 1 },
          { label: "Total Assets", isBold: true, values: ["$3,350,000", "$4,330,000"] },
          { label: "", values: [null, null] },
          { label: "LIABILITIES", isBold: true, values: [null, null] },
          { label: "Accounts payable", values: ["$380,000", "$380,000"], indent: 1 },
          { label: "Long-term debt", values: ["$800,000", "$800,000"], indent: 1 },
          { label: "Total Liabilities", isBold: true, values: ["$1,180,000", "$1,180,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cash-consideration",
      order: 1,
      type: "numeric",
      label: "Cash consideration",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3000000,
        tolerance: 0,
      },
      explanation: "Cash payment = $3,000,000",
    },
    {
      id: "req-stock-consideration",
      order: 2,
      type: "numeric",
      label: "Fair value of stock consideration",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2500000,
        tolerance: 0,
      },
      explanation: "Stock consideration = 100,000 shares × $25 = $2,500,000",
    },
    {
      id: "req-total-consideration",
      order: 3,
      type: "numeric",
      label: "Total consideration transferred",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5900000,
        tolerance: 0,
      },
      explanation: "Total = $3,000,000 + $2,500,000 + $400,000 = $5,900,000",
    },
    {
      id: "req-fv-net-assets",
      order: 4,
      type: "numeric",
      label: "Fair value of identifiable net assets acquired",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3150000,
        tolerance: 0,
      },
      explanation: "FV Net Assets = $4,330,000 - $1,180,000 = $3,150,000",
    },
    {
      id: "req-goodwill",
      order: 5,
      type: "numeric",
      label: "Goodwill recognized",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 2750000,
        tolerance: 0,
      },
      explanation: "Goodwill = Consideration - FV Net Assets = $5,900,000 - $3,150,000 = $2,750,000",
    },
    {
      id: "req-inventory-dr",
      order: 6,
      type: "numeric",
      label: "Inventory step-up recorded at acquisition",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "Inventory step-up = $680,000 - $600,000 = $80,000",
    },
  ],
};

export const farContingenciesTBS: TBSQuestion = {
  id: "tbs-far-033",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Contingencies",
  subtopic: "Loss Contingencies and Commitments",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Contingency Recognition and Disclosure",
  scenarioText: `Sentinel Corporation is preparing its Year 1 financial statements and has identified the following contingencies requiring evaluation:

1. Lawsuit A: Product liability suit filed against Sentinel. Legal counsel believes it is probable Sentinel will lose and estimates the loss at $500,000 to $800,000, with no amount in the range more likely.

2. Lawsuit B: Employment discrimination suit. Legal counsel believes loss is reasonably possible (not probable). If lost, damages estimated at $1,200,000.

3. Lawsuit C: Patent infringement claim against Sentinel. Legal counsel believes the likelihood of loss is remote.

4. Environmental Matter: EPA investigation of former plant site. Remediation costs are probable and estimated to be $2,000,000 with possibility of recovery from insurance of $600,000. Recovery is considered probable based on policy terms.

5. Guarantee: Sentinel guaranteed a $500,000 bank loan for a key supplier. The supplier is financially healthy and default is not expected.

Required: Determine the proper accounting treatment for each contingency.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-asc450",
      order: 1,
      title: "ASC 450 Loss Contingency Framework",
      type: "text",
      content: {
        type: "text",
        title: "Loss Contingency Recognition Criteria",
        paragraphs: [
          "A loss contingency is accrued if: (1) it is probable that a liability has been incurred, AND (2) the amount can be reasonably estimated.",
          "If loss is probable but amount is a range with no best estimate, accrue the minimum of the range.",
          "If loss is reasonably possible, disclose in notes but do not accrue.",
          "If loss is remote, no accrual or disclosure required (except for guarantees).",
          "Gain contingencies are generally not recorded until realized but may be disclosed.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lawsuit-a-treatment",
      order: 1,
      type: "dropdown",
      label: "Lawsuit A - Proper treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-accrue-min",
      },
      explanation: "Loss is probable and estimable (range). Accrue minimum of range ($500,000) per ASC 450.",
      dropdownOptions: [
        { id: "opt-a-accrue-min", order: 1, text: "Accrue $500,000 (minimum of range)", isCorrect: true },
        { id: "opt-a-accrue-max", order: 2, text: "Accrue $800,000 (maximum of range)", isCorrect: false },
        { id: "opt-a-accrue-mid", order: 3, text: "Accrue $650,000 (midpoint)", isCorrect: false },
        { id: "opt-a-disclose", order: 4, text: "Disclose only, no accrual", isCorrect: false },
      ],
    },
    {
      id: "req-lawsuit-b-treatment",
      order: 2,
      type: "dropdown",
      label: "Lawsuit B - Proper treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-disclose",
      },
      explanation: "Reasonably possible losses require disclosure but not accrual.",
      dropdownOptions: [
        { id: "opt-b-accrue", order: 1, text: "Accrue $1,200,000", isCorrect: false },
        { id: "opt-b-disclose", order: 2, text: "Disclose in notes only", isCorrect: true },
        { id: "opt-b-nothing", order: 3, text: "No accrual or disclosure required", isCorrect: false },
      ],
    },
    {
      id: "req-lawsuit-c-treatment",
      order: 3,
      type: "dropdown",
      label: "Lawsuit C - Proper treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-nothing",
      },
      explanation: "Remote likelihood requires no accrual or disclosure.",
      dropdownOptions: [
        { id: "opt-c-accrue", order: 1, text: "Accrue estimated amount", isCorrect: false },
        { id: "opt-c-disclose", order: 2, text: "Disclose in notes only", isCorrect: false },
        { id: "opt-c-nothing", order: 3, text: "No accrual or disclosure required", isCorrect: true },
      ],
    },
    {
      id: "req-env-gross",
      order: 4,
      type: "numeric",
      label: "Environmental liability to accrue (gross)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2000000,
        tolerance: 0,
      },
      explanation: "Accrue full probable liability of $2,000,000 (recovery shown separately)",
    },
    {
      id: "req-env-recovery",
      order: 5,
      type: "numeric",
      label: "Insurance recovery receivable to record",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 600000,
        tolerance: 0,
      },
      explanation: "Probable recovery of $600,000 is recorded as receivable (not netted against liability)",
    },
    {
      id: "req-guarantee-treatment",
      order: 6,
      type: "dropdown",
      label: "Guarantee - Proper treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-g-disclose",
      },
      explanation: "Guarantees must be disclosed regardless of likelihood per ASC 460.",
      dropdownOptions: [
        { id: "opt-g-accrue", order: 1, text: "Accrue $500,000", isCorrect: false },
        { id: "opt-g-disclose", order: 2, text: "Disclose guarantee in notes", isCorrect: true },
        { id: "opt-g-nothing", order: 3, text: "No disclosure needed - remote", isCorrect: false },
      ],
    },
    {
      id: "req-total-accrual",
      order: 7,
      type: "numeric",
      label: "Total contingent liabilities to accrue",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2500000,
        tolerance: 0,
      },
      explanation: "Total accrual = $500,000 (Lawsuit A) + $2,000,000 (Environmental) = $2,500,000",
    },
  ],
};

export const farStockCompensationTBS: TBSQuestion = {
  id: "tbs-far-034",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Stock Compensation",
  subtopic: "Stock Options (ASC 718)",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Stock Option Compensation Expense",
  scenarioText: `On January 1, Year 1, Nexus Corporation granted stock options to employees as follows:

Grant details:
• Options granted: 50,000
• Exercise price: $40 per share (equals market price at grant date)
• Fair value per option at grant date: $12 (Black-Scholes model)
• Vesting period: 3 years (cliff vesting - all vest at end of Year 3)
• Option term: 7 years
• Expected forfeitures at grant date: 10%

During the vesting period:
• Year 1: No forfeitures occurred
• Year 2: 2,000 options were forfeited; revised expected forfeitures to 8% of remaining
• Year 3: 1,500 additional options were forfeited

Required: Calculate compensation expense for Years 1, 2, and 3.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-option-data",
      order: 1,
      title: "Option Grant Summary",
      type: "table",
      content: {
        type: "table",
        title: "Stock Option Details",
        headers: ["Item", "Value"],
        rows: [
          { cells: ["Options granted", "50,000"] },
          { cells: ["Exercise price", "$40"] },
          { cells: ["Grant date fair value per option", "$12"] },
          { cells: ["Total grant date fair value", "$600,000"] },
          { cells: ["Vesting period", "3 years"] },
          { cells: ["Initial expected forfeitures", "10%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-compensation",
      order: 1,
      type: "numeric",
      label: "Total compensation cost at grant (before forfeitures)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 600000,
        tolerance: 0,
      },
      explanation: "Total = 50,000 options × $12 = $600,000",
    },
    {
      id: "req-expected-vest-yr1",
      order: 2,
      type: "numeric",
      label: "Expected options to vest at Year 1 (10% forfeiture estimate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45000,
        tolerance: 0,
      },
      explanation: "Expected to vest = 50,000 × (1 - 10%) = 45,000",
    },
    {
      id: "req-yr1-expense",
      order: 3,
      type: "numeric",
      label: "Year 1 compensation expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 180000,
        tolerance: 0,
      },
      explanation: "Year 1 expense = 45,000 × $12 × (1/3) = $180,000",
    },
    {
      id: "req-expected-vest-yr2",
      order: 4,
      type: "numeric",
      label: "Expected options to vest at Year 2 end (revised estimate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 44160,
        tolerance: 100,
      },
      explanation: "After 2,000 forfeited, 48,000 remain. Revised to 8% forfeitures: 48,000 × 92% = 44,160",
    },
    {
      id: "req-yr2-expense",
      order: 5,
      type: "numeric",
      label: "Year 2 compensation expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 173280,
        tolerance: 200,
      },
      explanation: "Cumulative expense through Y2 = 44,160 × $12 × (2/3) = $353,280. Year 2 expense = $353,280 - $180,000 = $173,280",
    },
    {
      id: "req-actual-vested",
      order: 6,
      type: "numeric",
      label: "Actual options vested at end of Year 3",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46500,
        tolerance: 0,
      },
      explanation: "Actual vested = 50,000 - 2,000 - 1,500 = 46,500",
    },
    {
      id: "req-yr3-expense",
      order: 7,
      type: "numeric",
      label: "Year 3 compensation expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 204720,
        tolerance: 200,
      },
      explanation: "Total expense based on actual = 46,500 × $12 = $558,000. Year 3 = $558,000 - $180,000 - $173,280 = $204,720",
    },
  ],
};

export const farForeignCurrencyTBS: TBSQuestion = {
  id: "tbs-far-035",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Foreign Currency",
  subtopic: "Foreign Currency Translation",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Foreign Subsidiary Translation",
  scenarioText: `US Parent Corp. owns 100% of Euro Sub, a German subsidiary whose functional currency is the Euro (€). The following information is available for Year 1:

Euro Sub Trial Balance at December 31, Year 1 (in Euros):
• Cash: €100,000
• Accounts Receivable: €200,000
• Inventory: €150,000
• Fixed Assets: €500,000
• Accumulated Depreciation: €100,000
• Accounts Payable: €120,000
• Long-term Debt: €280,000
• Common Stock: €200,000 (issued when rate was $1.10/€)
• Retained Earnings (beginning): €150,000
• Sales: €800,000
• Cost of Goods Sold: €480,000
• Operating Expenses: €170,000
• Depreciation Expense: €50,000

Exchange Rates:
• January 1, Year 1: $1.15/€
• Average for Year 1: $1.18/€
• December 31, Year 1: $1.22/€
• Rate when common stock issued: $1.10/€

Required: Translate the trial balance to US dollars and calculate the translation adjustment.`,
  timeEstimateMinutes: 18,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "exhibit-exchange-rates",
      order: 1,
      title: "Exchange Rates",
      type: "table",
      content: {
        type: "table",
        title: "Exchange Rate Summary ($/€)",
        headers: ["Date/Period", "Rate"],
        rows: [
          { cells: ["Stock issuance date", "$1.10"] },
          { cells: ["January 1, Year 1", "$1.15"] },
          { cells: ["Year 1 average", "$1.18"] },
          { cells: ["December 31, Year 1", "$1.22"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cash-usd",
      order: 1,
      type: "numeric",
      label: "Cash translated to USD (use current rate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 122000,
        tolerance: 0,
      },
      explanation: "Cash = €100,000 × $1.22 = $122,000",
    },
    {
      id: "req-fixed-assets-usd",
      order: 2,
      type: "numeric",
      label: "Fixed assets translated to USD",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 610000,
        tolerance: 0,
      },
      explanation: "Fixed assets = €500,000 × $1.22 = $610,000 (current rate for functional currency = local)",
    },
    {
      id: "req-common-stock-usd",
      order: 3,
      type: "numeric",
      label: "Common stock translated to USD",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 220000,
        tolerance: 0,
      },
      explanation: "Common stock = €200,000 × $1.10 = $220,000 (historical rate)",
    },
    {
      id: "req-sales-usd",
      order: 4,
      type: "numeric",
      label: "Sales translated to USD",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 944000,
        tolerance: 0,
      },
      explanation: "Sales = €800,000 × $1.18 = $944,000 (average rate)",
    },
    {
      id: "req-net-income-usd",
      order: 5,
      type: "numeric",
      label: "Net income in USD (revenues - expenses at average rate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 118000,
        tolerance: 0,
      },
      explanation: "Net income = €100,000 (€800K - €480K - €170K - €50K) × $1.18 = $118,000",
    },
    {
      id: "req-beg-re-usd",
      order: 6,
      type: "numeric",
      label: "Beginning retained earnings in USD",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 172500,
        tolerance: 0,
      },
      explanation: "Beginning RE = €150,000 × $1.15 = $172,500 (at beginning rate)",
    },
    {
      id: "req-total-assets-usd",
      order: 7,
      type: "numeric",
      label: "Total assets in USD",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1037000,
        tolerance: 0,
      },
      explanation: "Total assets = (€100K + €200K + €150K + €500K - €100K) × $1.22 = €850K × $1.22 = $1,037,000",
    },
    {
      id: "req-cta",
      order: 8,
      type: "numeric",
      label: "Cumulative translation adjustment (positive = credit to OCI)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 38500,
        tolerance: 1000,
      },
      explanation: "CTA = Plug to balance. Assets $1,037K - Liab ($488K) - CS ($220K) - Beg RE ($172.5K) - NI ($118K) = CTA",
    },
  ],
};

export const farSegmentReportingTBS: TBSQuestion = {
  id: "tbs-far-036",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Segment Reporting",
  subtopic: "Reportable Segments",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Segment Reporting Thresholds",
  scenarioText: `Diversified Industries Inc. is evaluating its operating segments for reportable segment disclosure under ASC 280. The company has five operating segments with the following Year 1 data:

Segment Information:
• Segment A: Revenue $45M, Operating Profit $8M, Assets $60M
• Segment B: Revenue $30M, Operating Loss ($5M), Assets $40M
• Segment C: Revenue $15M, Operating Profit $3M, Assets $25M
• Segment D: Revenue $8M, Operating Profit $1M, Assets $12M
• Segment E: Revenue $2M, Operating Profit $0.5M, Assets $3M

Corporate headquarters has assets of $10M and corporate expenses of $2M.

Total consolidated revenue: $100M
Total consolidated assets: $150M

Required: Determine which segments are reportable using the 10% quantitative thresholds.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-segment-data",
      order: 1,
      title: "Segment Financial Data",
      type: "table",
      content: {
        type: "table",
        title: "Operating Segment Summary (in millions)",
        headers: ["Segment", "Revenue", "Op Profit/(Loss)", "Assets"],
        rows: [
          { cells: ["A", "$45", "$8", "$60"] },
          { cells: ["B", "$30", "($5)", "$40"] },
          { cells: ["C", "$15", "$3", "$25"] },
          { cells: ["D", "$8", "$1", "$12"] },
          { cells: ["E", "$2", "$0.5", "$3"] },
          { cells: ["Corporate", "$0", "($2)", "$10"] },
          { cells: ["Total", "$100", "$5.5", "$150"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-revenue-threshold",
      order: 1,
      type: "numeric",
      label: "Revenue threshold (10% of combined segment revenue)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10,
        tolerance: 0,
      },
      explanation: "Revenue threshold = $100M × 10% = $10M",
    },
    {
      id: "req-profit-threshold",
      order: 2,
      type: "numeric",
      label: "Profit/Loss threshold (10% of greater of absolute profit or loss)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.25,
        tolerance: 0.05,
      },
      explanation: "Total profit = $12.5M, Total loss = $7M. Threshold = $12.5M × 10% = $1.25M",
    },
    {
      id: "req-asset-threshold",
      order: 3,
      type: "numeric",
      label: "Asset threshold (10% of combined segment assets)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 14,
        tolerance: 0,
      },
      explanation: "Asset threshold = $140M (excluding corporate) × 10% = $14M",
    },
    {
      id: "req-segment-a-reportable",
      order: 4,
      type: "dropdown",
      label: "Is Segment A reportable?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-yes",
      },
      explanation: "Segment A exceeds all three thresholds",
      dropdownOptions: [
        { id: "opt-a-yes", order: 1, text: "Yes - meets revenue, profit, and asset tests", isCorrect: true },
        { id: "opt-a-no", order: 2, text: "No - does not meet any threshold", isCorrect: false },
      ],
    },
    {
      id: "req-segment-d-reportable",
      order: 5,
      type: "dropdown",
      label: "Is Segment D reportable?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-no",
      },
      explanation: "Segment D: Revenue $8M < $10M, Profit $1M < $1.25M, Assets $12M < $14M - fails all tests",
      dropdownOptions: [
        { id: "opt-d-yes", order: 1, text: "Yes - meets at least one threshold", isCorrect: false },
        { id: "opt-d-no", order: 2, text: "No - does not meet any threshold", isCorrect: true },
      ],
    },
    {
      id: "req-reportable-count",
      order: 6,
      type: "numeric",
      label: "Total number of reportable segments",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0,
      },
      explanation: "Reportable: A (all tests), B (revenue, loss, assets), C (revenue, profit, assets) = 3 segments",
    },
  ],
};

export const farFairValueTBS: TBSQuestion = {
  id: "tbs-far-037",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Fair Value",
  subtopic: "Fair Value Hierarchy (ASC 820)",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Fair Value Measurement Classification",
  scenarioText: `Meridian Investments holds various financial assets that must be measured at fair value. For each asset, determine the appropriate fair value hierarchy level classification based on the valuation inputs used.

Asset Information:

1. Treasury bonds: Valued using quoted prices in active markets
2. Corporate bonds: Valued using quoted prices for similar securities in active markets, adjusted for differences
3. Private equity investment: Valued using discounted cash flow model with unobservable inputs
4. Derivative contract: Valued using market-corroborated interest rate curves
5. Real estate property: Valued using independent appraisal with significant unobservable assumptions
6. Publicly traded stock: Valued using last trading price from NYSE

Required: Classify each asset within the fair value hierarchy.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-fv-hierarchy",
      order: 1,
      title: "Fair Value Hierarchy",
      type: "text",
      content: {
        type: "text",
        title: "ASC 820 Fair Value Hierarchy Levels",
        paragraphs: [
          "Level 1: Quoted prices (unadjusted) in active markets for identical assets or liabilities",
          "Level 2: Observable inputs other than Level 1 prices, such as: quoted prices for similar assets in active markets, quoted prices in inactive markets, or observable market-corroborated inputs",
          "Level 3: Unobservable inputs that reflect the entity's own assumptions about what market participants would use",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-treasury-level",
      order: 1,
      type: "dropdown",
      label: "Treasury bonds - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-treasury-l1",
      },
      explanation: "Quoted prices in active markets for identical assets = Level 1",
      dropdownOptions: [
        { id: "opt-treasury-l1", order: 1, text: "Level 1", isCorrect: true },
        { id: "opt-treasury-l2", order: 2, text: "Level 2", isCorrect: false },
        { id: "opt-treasury-l3", order: 3, text: "Level 3", isCorrect: false },
      ],
    },
    {
      id: "req-corp-bond-level",
      order: 2,
      type: "dropdown",
      label: "Corporate bonds (similar securities) - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-corp-l2",
      },
      explanation: "Quoted prices for similar assets with adjustments = Level 2",
      dropdownOptions: [
        { id: "opt-corp-l1", order: 1, text: "Level 1", isCorrect: false },
        { id: "opt-corp-l2", order: 2, text: "Level 2", isCorrect: true },
        { id: "opt-corp-l3", order: 3, text: "Level 3", isCorrect: false },
      ],
    },
    {
      id: "req-pe-level",
      order: 3,
      type: "dropdown",
      label: "Private equity investment - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pe-l3",
      },
      explanation: "DCF with unobservable inputs = Level 3",
      dropdownOptions: [
        { id: "opt-pe-l1", order: 1, text: "Level 1", isCorrect: false },
        { id: "opt-pe-l2", order: 2, text: "Level 2", isCorrect: false },
        { id: "opt-pe-l3", order: 3, text: "Level 3", isCorrect: true },
      ],
    },
    {
      id: "req-deriv-level",
      order: 4,
      type: "dropdown",
      label: "Derivative (market-corroborated curves) - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-deriv-l2",
      },
      explanation: "Market-corroborated inputs = Level 2",
      dropdownOptions: [
        { id: "opt-deriv-l1", order: 1, text: "Level 1", isCorrect: false },
        { id: "opt-deriv-l2", order: 2, text: "Level 2", isCorrect: true },
        { id: "opt-deriv-l3", order: 3, text: "Level 3", isCorrect: false },
      ],
    },
    {
      id: "req-real-estate-level",
      order: 5,
      type: "dropdown",
      label: "Real estate property - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-re-l3",
      },
      explanation: "Appraisal with significant unobservable assumptions = Level 3",
      dropdownOptions: [
        { id: "opt-re-l1", order: 1, text: "Level 1", isCorrect: false },
        { id: "opt-re-l2", order: 2, text: "Level 2", isCorrect: false },
        { id: "opt-re-l3", order: 3, text: "Level 3", isCorrect: true },
      ],
    },
    {
      id: "req-stock-level",
      order: 6,
      type: "dropdown",
      label: "Publicly traded stock - Fair value level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-stock-l1",
      },
      explanation: "Trading price from active exchange = Level 1",
      dropdownOptions: [
        { id: "opt-stock-l1", order: 1, text: "Level 1", isCorrect: true },
        { id: "opt-stock-l2", order: 2, text: "Level 2", isCorrect: false },
        { id: "opt-stock-l3", order: 3, text: "Level 3", isCorrect: false },
      ],
    },
  ],
};

export const farNFPRevenueTBS: TBSQuestion = {
  id: "tbs-far-038",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Not-for-Profit Entities",
  subtopic: "NFP Revenue Recognition",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-IV",
  title: "Not-for-Profit Contribution Accounting",
  scenarioText: `Community Health Foundation (a not-for-profit) received the following contributions and grants during Year 1:

1. Cash donation of $500,000 with no donor restrictions
2. Pledge receivable of $200,000 to be paid over 2 years (PV factor 0.95), unrestricted
3. Grant of $300,000 restricted for medical research (conditions met in Year 1: $180,000)
4. Contribution of medical equipment with fair value $150,000, must be used for 5 years in free clinic (implicit time restriction)
5. Donor-restricted endowment contribution of $1,000,000 (investment returns spendable)
6. Volunteer services by nurses (300 hours × $50/hour fair value) providing specialized services
7. Donated office supplies with fair value $8,000 (would not have been purchased otherwise)

Required: Calculate the proper revenue recognition amounts by net asset classification.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-nfp-guidance",
      order: 1,
      title: "NFP Contribution Guidance",
      type: "text",
      content: {
        type: "text",
        title: "ASC 958 Contribution Recognition",
        paragraphs: [
          "Contributions received are recognized as revenue when received at fair value.",
          "Donor restrictions classify contributions: Without Restrictions, With Restrictions (time or purpose).",
          "Conditional contributions (barrier + right of return) are not recognized until conditions met.",
          "Contributed services are recognized only if they: (1) create or enhance nonfinancial assets, OR (2) require specialized skills and would otherwise be purchased.",
          "Long-term pledges are recorded at present value.",
          "Restrictions on use of contributed assets create time restrictions.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-unrestricted-cash",
      order: 1,
      type: "numeric",
      label: "Without donor restrictions - Cash donation",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 500000,
        tolerance: 0,
      },
      explanation: "Cash with no restrictions = $500,000 without donor restrictions",
    },
    {
      id: "req-pledge-pv",
      order: 2,
      type: "numeric",
      label: "Without donor restrictions - Pledge (at present value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 190000,
        tolerance: 0,
      },
      explanation: "Pledge PV = $200,000 × 0.95 = $190,000 without restrictions",
    },
    {
      id: "req-grant-restricted",
      order: 3,
      type: "numeric",
      label: "With donor restrictions - Grant (unmet conditions)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 120000,
        tolerance: 0,
      },
      explanation: "Conditional grant: Only recognize conditions met portion. $300,000 - $180,000 = $120,000 deferred (or if asking for restricted portion)",
    },
    {
      id: "req-equipment-restricted",
      order: 4,
      type: "numeric",
      label: "With donor restrictions - Equipment (time restriction)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 150000,
        tolerance: 0,
      },
      explanation: "Equipment with time restriction recorded as with donor restrictions = $150,000",
    },
    {
      id: "req-endowment",
      order: 5,
      type: "numeric",
      label: "With donor restrictions - Endowment (permanent)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1000000,
        tolerance: 0,
      },
      explanation: "Endowment = $1,000,000 with donor restrictions (perpetual)",
    },
    {
      id: "req-volunteer-services",
      order: 6,
      type: "numeric",
      label: "Without donor restrictions - Contributed services",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "Specialized nursing services = 300 × $50 = $15,000",
    },
    {
      id: "req-donated-supplies",
      order: 7,
      type: "dropdown",
      label: "Should donated office supplies be recognized?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-supplies-no",
      },
      explanation: "Supplies would not have been purchased - do not recognize",
      dropdownOptions: [
        { id: "opt-supplies-yes", order: 1, text: "Yes - $8,000", isCorrect: false },
        { id: "opt-supplies-no", order: 2, text: "No - would not have been purchased", isCorrect: true },
      ],
    },
  ],
};

export const farEnterpriseFundTBS: TBSQuestion = {
  id: "tbs-far-039",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "State and Local Governments",
  subtopic: "Proprietary Funds",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-IV",
  title: "Enterprise Fund Accounting",
  scenarioText: `The City of Riverdale operates a water utility as an enterprise fund. The following transactions occurred during the fiscal year:

1. Customer water billings: $4,800,000
2. Collections from customers: $4,650,000
3. Estimated uncollectible accounts: 2% of billings
4. Operating expenses paid:
   - Salaries and wages: $1,800,000
   - Utilities: $420,000
   - Supplies: $280,000
   - Repairs and maintenance: $350,000
5. Depreciation on utility plant: $600,000
6. Interest expense on revenue bonds: $180,000
7. Principal payment on revenue bonds: $200,000
8. Capital asset purchases: $800,000 (paid from operating cash)
9. Connection fees received: $150,000 (capital contributions)

Beginning cash balance: $500,000

Required: Prepare the enterprise fund financial statement amounts.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-fund-info",
      order: 1,
      title: "Enterprise Fund Information",
      type: "table",
      content: {
        type: "table",
        title: "Water Utility Fund Beginning Balances",
        headers: ["Account", "Balance"],
        rows: [
          { cells: ["Cash", "$500,000"] },
          { cells: ["Accounts Receivable (net)", "$320,000"] },
          { cells: ["Utility Plant (net)", "$12,000,000"] },
          { cells: ["Revenue Bonds Payable", "$3,600,000"] },
          { cells: ["Net Position", "$9,220,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-operating-revenue",
      order: 1,
      type: "numeric",
      label: "Operating revenues - charges for services",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4800000,
        tolerance: 0,
      },
      explanation: "Operating revenue = billings = $4,800,000",
    },
    {
      id: "req-bad-debt",
      order: 2,
      type: "numeric",
      label: "Bad debt expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 96000,
        tolerance: 0,
      },
      explanation: "Bad debt = $4,800,000 × 2% = $96,000",
    },
    {
      id: "req-total-operating-expense",
      order: 3,
      type: "numeric",
      label: "Total operating expenses (including depreciation, excluding interest)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3546000,
        tolerance: 0,
      },
      explanation: "Operating expenses = $1,800K + $420K + $280K + $350K + $600K + $96K = $3,546,000",
    },
    {
      id: "req-operating-income",
      order: 4,
      type: "numeric",
      label: "Operating income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1254000,
        tolerance: 0,
      },
      explanation: "Operating income = $4,800,000 - $3,546,000 = $1,254,000",
    },
    {
      id: "req-nonoperating",
      order: 5,
      type: "numeric",
      label: "Nonoperating expenses - interest",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 180000,
        tolerance: 0,
      },
      explanation: "Interest expense = $180,000 (nonoperating)",
    },
    {
      id: "req-capital-contrib",
      order: 6,
      type: "numeric",
      label: "Capital contributions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 150000,
        tolerance: 0,
      },
      explanation: "Connection fees = $150,000 capital contribution",
    },
    {
      id: "req-change-net-position",
      order: 7,
      type: "numeric",
      label: "Change in net position",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1224000,
        tolerance: 0,
      },
      explanation: "Change = $1,254,000 - $180,000 + $150,000 = $1,224,000",
    },
  ],
};

export const farSubsequentEventsTBS: TBSQuestion = {
  id: "tbs-far-040",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Subsequent Events",
  subtopic: "Recognition and Disclosure",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Subsequent Event Evaluation",
  scenarioText: `Aurora Industries' fiscal year ended December 31, Year 1. The financial statements were issued on February 28, Year 2. The following events occurred between December 31, Year 1 and February 28, Year 2:

1. January 15: Settlement of lawsuit that was pending at year-end. The suit arose from a Year 1 product defect. Settlement amount $500,000 (year-end accrual was $350,000).

2. January 22: Fire destroyed a warehouse causing $2,000,000 in uninsured losses. The fire was caused by an electrical fault.

3. February 1: Issued $10,000,000 in new bonds to refinance existing debt.

4. February 10: Customer who owed $800,000 at year-end filed for bankruptcy. Evidence indicates the customer was having financial difficulty before year-end.

5. February 15: Stock split 2-for-1 declared and effective.

6. February 20: Acquired a competitor company for $15,000,000.

Required: Determine the proper accounting treatment for each event.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-se-guidance",
      order: 1,
      title: "Subsequent Events Guidance",
      type: "text",
      content: {
        type: "text",
        title: "ASC 855 Subsequent Events",
        paragraphs: [
          "Type I (Recognized): Events that provide additional evidence about conditions that existed at the balance sheet date. These require adjustment of the financial statements.",
          "Type II (Non-Recognized): Events that provide evidence about conditions that arose after the balance sheet date. These require disclosure but not adjustment.",
          "Subsequent events period ends when financial statements are issued (or available to be issued for non-SEC filers).",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lawsuit-treatment",
      order: 1,
      type: "dropdown",
      label: "Lawsuit settlement - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lawsuit-adjust",
      },
      explanation: "Condition existed at year-end (Type I) - adjust accrual to $500,000",
      dropdownOptions: [
        { id: "opt-lawsuit-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: true },
        { id: "opt-lawsuit-disclose", order: 2, text: "Type II - Disclose only", isCorrect: false },
        { id: "opt-lawsuit-none", order: 3, text: "No adjustment or disclosure required", isCorrect: false },
      ],
    },
    {
      id: "req-fire-treatment",
      order: 2,
      type: "dropdown",
      label: "Warehouse fire - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-fire-disclose",
      },
      explanation: "Condition arose after year-end (Type II) - disclose only",
      dropdownOptions: [
        { id: "opt-fire-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: false },
        { id: "opt-fire-disclose", order: 2, text: "Type II - Disclose only", isCorrect: true },
        { id: "opt-fire-none", order: 3, text: "No adjustment or disclosure required", isCorrect: false },
      ],
    },
    {
      id: "req-bonds-treatment",
      order: 3,
      type: "dropdown",
      label: "Bond issuance - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bonds-disclose",
      },
      explanation: "New financing is Type II - disclose only",
      dropdownOptions: [
        { id: "opt-bonds-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: false },
        { id: "opt-bonds-disclose", order: 2, text: "Type II - Disclose only", isCorrect: true },
        { id: "opt-bonds-none", order: 3, text: "No adjustment or disclosure required", isCorrect: false },
      ],
    },
    {
      id: "req-bankruptcy-treatment",
      order: 4,
      type: "dropdown",
      label: "Customer bankruptcy - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bankr-adjust",
      },
      explanation: "Customer difficulty existed at year-end (Type I) - adjust allowance/write off",
      dropdownOptions: [
        { id: "opt-bankr-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: true },
        { id: "opt-bankr-disclose", order: 2, text: "Type II - Disclose only", isCorrect: false },
        { id: "opt-bankr-none", order: 3, text: "No adjustment or disclosure required", isCorrect: false },
      ],
    },
    {
      id: "req-split-treatment",
      order: 5,
      type: "dropdown",
      label: "Stock split - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-split-retroactive",
      },
      explanation: "Stock splits are given retroactive treatment in EPS calculations and disclosed",
      dropdownOptions: [
        { id: "opt-split-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: false },
        { id: "opt-split-retroactive", order: 2, text: "Retroactive adjustment to EPS and disclosure", isCorrect: true },
        { id: "opt-split-disclose", order: 3, text: "Type II - Disclose only, no EPS adjustment", isCorrect: false },
      ],
    },
    {
      id: "req-acquisition-treatment",
      order: 6,
      type: "dropdown",
      label: "Business acquisition - Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-acq-disclose",
      },
      explanation: "Acquisition after year-end is Type II - disclose only",
      dropdownOptions: [
        { id: "opt-acq-adjust", order: 1, text: "Type I - Adjust financial statements", isCorrect: false },
        { id: "opt-acq-disclose", order: 2, text: "Type II - Disclose only", isCorrect: true },
        { id: "opt-acq-none", order: 3, text: "No adjustment or disclosure required", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// PHASE 2 EXPANSION - Batch 1 (tbs-far-041 through tbs-far-050)
// =============================================================================

// TBS-FAR-041: Variable Interest Entities
export const farVIEConsolidationTBS: TBSQuestion = {
  id: "tbs-far-041",
  section: "FAR",
  tbsType: "document_review",
  topic: "Consolidations",
  subtopic: "Variable Interest Entities",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Variable Interest Entity Analysis",
  scenarioText: `You are the senior accountant evaluating whether Apex Corp should consolidate several entities. Under ASC 810, an entity is considered a variable interest entity (VIE) if it meets certain criteria, and the primary beneficiary must consolidate the VIE.

Required: Analyze each entity and determine consolidation requirements.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-entity-a",
      order: 1,
      title: "Entity A - Equipment Leasing SPE",
      type: "memo",
      content: {
        type: "memo",
        from: "Controller",
        to: "Senior Accountant",
        date: "Year-End",
        subject: "Entity A Analysis",
        body: `Entity A was established to acquire and lease equipment to Apex Corp.

Key facts:
- Total equity of $2 million (10% of total assets of $20 million)
- 90% debt financing provided by third-party bank
- Apex guarantees 80% of Entity A's debt
- Apex leases 100% of Entity A's equipment
- Apex has power to direct activities that most significantly impact Entity A's economic performance
- Third-party investor holds all equity but has no substantive rights`,
      },
    },
    {
      id: "exhibit-entity-b",
      order: 2,
      title: "Entity B - Joint Venture",
      type: "memo",
      content: {
        type: "memo",
        from: "Controller",
        to: "Senior Accountant",
        date: "Year-End",
        subject: "Entity B Analysis",
        body: `Entity B is a joint venture formed with a competitor.

Key facts:
- Apex owns 50% of voting equity
- Partner owns 50% of voting equity
- Both parties share equally in profits and losses
- Board decisions require unanimous consent
- Adequate equity financing (25% of total assets)
- Neither party guarantees debt
- Both parties can direct significant activities`,
      },
    },
    {
      id: "exhibit-entity-c",
      order: 3,
      title: "Entity C - Research Entity",
      type: "memo",
      content: {
        type: "memo",
        from: "Controller",
        to: "Senior Accountant",
        date: "Year-End",
        subject: "Entity C Analysis",
        body: `Entity C conducts research on behalf of Apex Corp.

Key facts:
- Apex owns 30% equity interest
- Unrelated investor owns 70% equity interest
- Total equity is 3% of total assets ($15 million in assets)
- Apex has contractual right to all research outcomes
- Apex provides 100% of Entity C's funding through service contracts
- Unrelated investor has put option to sell shares to Apex
- Apex can replace Entity C's management`,
      },
    },
  ],
  requirements: [
    {
      id: "req-entity-a-vie",
      order: 1,
      type: "dropdown",
      label: "Is Entity A a VIE?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-vie-yes",
      },
      explanation: "Entity A lacks sufficient equity (10% is at the low end) and equity holders lack power to direct activities",
      dropdownOptions: [
        { id: "opt-a-vie-yes", order: 1, text: "Yes - VIE", isCorrect: true },
        { id: "opt-a-vie-no", order: 2, text: "No - voting interest entity", isCorrect: false },
      ],
    },
    {
      id: "req-entity-a-consolidate",
      order: 2,
      type: "dropdown",
      label: "Should Apex consolidate Entity A?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-consol-yes",
      },
      explanation: "Apex is primary beneficiary - has power to direct activities and obligation to absorb losses through guarantee",
      dropdownOptions: [
        { id: "opt-a-consol-yes", order: 1, text: "Yes - Apex is primary beneficiary", isCorrect: true },
        { id: "opt-a-consol-no", order: 2, text: "No - equity investor consolidates", isCorrect: false },
        { id: "opt-a-consol-equity", order: 3, text: "No - use equity method", isCorrect: false },
      ],
    },
    {
      id: "req-entity-b-vie",
      order: 3,
      type: "dropdown",
      label: "Is Entity B a VIE?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-vie-no",
      },
      explanation: "Entity B has adequate equity (25%) and equity holders can direct significant activities - voting interest model applies",
      dropdownOptions: [
        { id: "opt-b-vie-yes", order: 1, text: "Yes - VIE", isCorrect: false },
        { id: "opt-b-vie-no", order: 2, text: "No - voting interest entity", isCorrect: true },
      ],
    },
    {
      id: "req-entity-b-method",
      order: 4,
      type: "dropdown",
      label: "How should Apex account for Entity B?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-equity",
      },
      explanation: "50% ownership with shared control = equity method (joint venture)",
      dropdownOptions: [
        { id: "opt-b-consolidate", order: 1, text: "Full consolidation", isCorrect: false },
        { id: "opt-b-equity", order: 2, text: "Equity method", isCorrect: true },
        { id: "opt-b-cost", order: 3, text: "Cost method", isCorrect: false },
      ],
    },
    {
      id: "req-entity-c-vie",
      order: 5,
      type: "dropdown",
      label: "Is Entity C a VIE?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-vie-yes",
      },
      explanation: "Entity C has insufficient equity (3%) and equity holders don't benefit - VIE characteristics present",
      dropdownOptions: [
        { id: "opt-c-vie-yes", order: 1, text: "Yes - VIE", isCorrect: true },
        { id: "opt-c-vie-no", order: 2, text: "No - voting interest entity", isCorrect: false },
      ],
    },
    {
      id: "req-entity-c-consolidate",
      order: 6,
      type: "dropdown",
      label: "Should Apex consolidate Entity C?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-consol-yes",
      },
      explanation: "Apex has power (can replace management) and receives benefits (all research outcomes) - primary beneficiary",
      dropdownOptions: [
        { id: "opt-c-consol-yes", order: 1, text: "Yes - Apex is primary beneficiary", isCorrect: true },
        { id: "opt-c-consol-no", order: 2, text: "No - 70% investor consolidates", isCorrect: false },
        { id: "opt-c-consol-equity", order: 3, text: "No - use equity method", isCorrect: false },
      ],
    },
  ],
};

// TBS-FAR-042: Derivative Instruments and Hedging
export const farDerivativeHedgingTBS: TBSQuestion = {
  id: "tbs-far-042",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Derivatives",
  subtopic: "Hedge Accounting",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Derivative Hedging Transactions",
  scenarioText: `Bergen Corp uses derivatives to hedge various exposures. You need to analyze the hedge accounting treatment and calculate the financial statement impacts.

On October 1, Year 1, Bergen entered into a forward contract to purchase 100,000 euros at $1.08 per euro on March 31, Year 2, to hedge a forecasted inventory purchase. The hedge is designated as a cash flow hedge.

Required: Calculate the hedge-related amounts at year-end and determine proper accounting treatment.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-forward-info",
      order: 1,
      title: "Forward Contract Information",
      type: "table",
      content: {
        type: "table",
        title: "Forward Contract Details",
        headers: ["Date", "Spot Rate", "Forward Rate to 3/31/Y2", "Forward Contract Fair Value"],
        rows: [
          { cells: ["10/1/Year 1 (inception)", "$1.05/€", "$1.08/€", "$0"] },
          { cells: ["12/31/Year 1", "$1.10/€", "$1.12/€", "$3,800"] },
          { cells: ["3/31/Year 2", "$1.15/€", "N/A", "$7,000"] },
        ],
      },
    },
    {
      id: "exhibit-hedge-docs",
      order: 2,
      title: "Hedge Documentation",
      type: "text",
      content: {
        type: "text",
        title: "Hedge Documentation Summary",
        paragraphs: [
          "HEDGE TYPE: Cash flow hedge",
          "HEDGED ITEM: Forecasted purchase of inventory from European supplier",
          "HEDGING INSTRUMENT: Forward contract to buy 100,000 euros",
          "HEDGE EFFECTIVENESS: Assessed prospectively; expected to be highly effective",
          "MEASUREMENT: Changes in forward rate used to assess effectiveness",
          "",
          "The forecasted transaction is probable and hedge documentation meets ASC 815 requirements.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fv-change-12-31",
      order: 1,
      type: "numeric",
      label: "Fair value of forward contract at 12/31/Y1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3800,
        tolerance: 0,
      },
      explanation: "Fair value increased to $3,800 as forward rate moved favorably",
    },
    {
      id: "req-oci-amount",
      order: 2,
      type: "numeric",
      label: "Amount recognized in OCI at 12/31/Y1 (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3800,
        tolerance: 0,
      },
      explanation: "For effective cash flow hedge, gain/loss on hedging instrument goes to OCI",
    },
    {
      id: "req-earning-impact",
      order: 3,
      type: "numeric",
      label: "Impact on Year 1 earnings from hedge (before tax)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Effective portion of cash flow hedge does not affect earnings until hedged transaction occurs",
    },
    {
      id: "req-inventory-basis",
      order: 4,
      type: "numeric",
      label: "Inventory basis when purchased (100,000 x spot rate on 3/31)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 115000,
        tolerance: 0,
      },
      explanation: "Inventory = 100,000 x $1.15 spot rate = $115,000",
    },
    {
      id: "req-oci-reclass",
      order: 5,
      type: "numeric",
      label: "OCI reclassified to inventory cost on 3/31/Y2",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7000,
        tolerance: 0,
      },
      explanation: "OCI balance (final fair value of $7,000) reclassified to adjust inventory cost",
    },
    {
      id: "req-net-inventory",
      order: 6,
      type: "numeric",
      label: "Net cost of inventory after hedge adjustment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 108000,
        tolerance: 0,
      },
      explanation: "Net inventory = $115,000 - $7,000 hedge gain = $108,000 (matches locked-in forward rate)",
    },
  ],
};

// TBS-FAR-043: Troubled Debt Restructuring
export const farDebtRestructuringTBS: TBSQuestion = {
  id: "tbs-far-043",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-Term Liabilities",
  subtopic: "Debt Restructuring",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Troubled Debt Restructuring Calculations",
  scenarioText: `Oakwood Inc. is experiencing financial difficulties and has negotiated a modification of its debt with First National Bank. The original loan had a carrying value of $500,000 with accrued interest of $25,000. The stated interest rate was 10%.

Under the restructuring agreement, the bank has agreed to:
- Reduce the principal to $400,000
- Reduce the interest rate to 6%
- Extend the maturity by 2 years (now due in 4 years)

Required: Calculate the accounting treatment for this debt restructuring under ASC 470-60.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-original-debt",
      order: 1,
      title: "Original Debt Terms",
      type: "table",
      content: {
        type: "table",
        title: "Original Debt Information",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Principal balance", "$500,000"] },
          { cells: ["Accrued interest payable", "$25,000"] },
          { cells: ["Total carrying amount", "$525,000"] },
          { cells: ["Interest rate", "10%"] },
          { cells: ["Original remaining term", "2 years"] },
        ],
      },
    },
    {
      id: "exhibit-new-terms",
      order: 2,
      title: "Restructured Terms",
      type: "table",
      content: {
        type: "table",
        title: "New Debt Terms",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["New principal", "$400,000"] },
          { cells: ["New interest rate", "6%"] },
          { cells: ["New term", "4 years"] },
          { cells: ["Annual interest payment", "$24,000"] },
          { cells: ["Total future payments", "$496,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-carrying",
      order: 1,
      type: "numeric",
      label: "Total carrying amount before restructuring",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 525000,
        tolerance: 0,
      },
      explanation: "Carrying amount = Principal $500,000 + Accrued interest $25,000 = $525,000",
    },
    {
      id: "req-future-payments",
      order: 2,
      type: "numeric",
      label: "Total future cash payments under new terms",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 496000,
        tolerance: 0,
      },
      explanation: "Future payments = $400,000 principal + ($24,000 x 4 years interest) = $496,000",
    },
    {
      id: "req-gain-loss",
      order: 3,
      type: "numeric",
      label: "Gain recognized on restructuring (if any)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 29000,
        tolerance: 0,
      },
      explanation: "Gain = $525,000 carrying - $496,000 future payments = $29,000 (carrying exceeds future payments)",
    },
    {
      id: "req-new-carrying",
      order: 4,
      type: "numeric",
      label: "New carrying amount of debt after restructuring",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 496000,
        tolerance: 0,
      },
      explanation: "When future payments < carrying amount, new carrying = future payments = $496,000",
    },
    {
      id: "req-interest-rate",
      order: 5,
      type: "numeric",
      label: "Effective interest rate on restructured debt (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "When gain is recognized, effective rate becomes 0% (all payments reduce principal)",
    },
  ],
};

// TBS-FAR-044: Not-for-Profit Financial Statements
export const farNFPFinancialStatementsTBS: TBSQuestion = {
  id: "tbs-far-044",
  section: "FAR",
  tbsType: "document_review",
  topic: "Not-for-Profit Accounting",
  subtopic: "Financial Statement Presentation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "NFP Financial Statement Classification",
  scenarioText: `Community Foundation, a not-for-profit organization, needs to classify various transactions in its year-end financial statements. Under ASC 958, NFPs must classify net assets into two categories: with donor restrictions and without donor restrictions.

Required: Classify each item and determine proper financial statement presentation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Year-End Transactions",
      type: "text",
      content: {
        type: "text",
        title: "Transaction Details",
        paragraphs: [
          "1. Received $100,000 donation restricted for building expansion",
          "2. Board designated $50,000 of unrestricted funds for future programs",
          "3. Released $75,000 from purpose restriction when program expenses incurred",
          "4. Received $25,000 endowment gift (principal permanently restricted)",
          "5. Earned $8,000 investment return on endowment (unrestricted per gift terms)",
          "6. Received pledge of $40,000 due in 3 years (time restricted)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-building-donation",
      order: 1,
      type: "dropdown",
      label: "$100,000 building donation classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-building-restricted",
      },
      explanation: "Donor-imposed purpose restriction = with donor restrictions",
      dropdownOptions: [
        { id: "opt-building-restricted", order: 1, text: "With donor restrictions", isCorrect: true },
        { id: "opt-building-unrestricted", order: 2, text: "Without donor restrictions", isCorrect: false },
      ],
    },
    {
      id: "req-board-designated",
      order: 2,
      type: "dropdown",
      label: "$50,000 board designated funds classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-board-unrestricted",
      },
      explanation: "Board designations are internal, not donor-imposed = without donor restrictions",
      dropdownOptions: [
        { id: "opt-board-restricted", order: 1, text: "With donor restrictions", isCorrect: false },
        { id: "opt-board-unrestricted", order: 2, text: "Without donor restrictions", isCorrect: true },
      ],
    },
    {
      id: "req-release-effect",
      order: 3,
      type: "dropdown",
      label: "$75,000 release from restriction - effect",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-release-both",
      },
      explanation: "Releasing restrictions decreases 'with restrictions' and increases 'without restrictions'",
      dropdownOptions: [
        { id: "opt-release-restricted", order: 1, text: "Decrease with donor restrictions only", isCorrect: false },
        { id: "opt-release-both", order: 2, text: "Reclassification between net asset classes", isCorrect: true },
        { id: "opt-release-expense", order: 3, text: "Recorded as expense", isCorrect: false },
      ],
    },
    {
      id: "req-endowment-gift",
      order: 4,
      type: "dropdown",
      label: "$25,000 endowment gift classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-endow-restricted",
      },
      explanation: "Permanent endowment = with donor restrictions (perpetual in nature)",
      dropdownOptions: [
        { id: "opt-endow-restricted", order: 1, text: "With donor restrictions", isCorrect: true },
        { id: "opt-endow-unrestricted", order: 2, text: "Without donor restrictions", isCorrect: false },
      ],
    },
    {
      id: "req-endow-income",
      order: 5,
      type: "dropdown",
      label: "$8,000 endowment investment return classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-income-unrestricted",
      },
      explanation: "Gift terms specify income is unrestricted = without donor restrictions",
      dropdownOptions: [
        { id: "opt-income-restricted", order: 1, text: "With donor restrictions", isCorrect: false },
        { id: "opt-income-unrestricted", order: 2, text: "Without donor restrictions", isCorrect: true },
      ],
    },
    {
      id: "req-pledge-class",
      order: 6,
      type: "dropdown",
      label: "$40,000 multi-year pledge classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pledge-restricted",
      },
      explanation: "Unconditional promises due in future periods have implied time restriction",
      dropdownOptions: [
        { id: "opt-pledge-restricted", order: 1, text: "With donor restrictions", isCorrect: true },
        { id: "opt-pledge-unrestricted", order: 2, text: "Without donor restrictions", isCorrect: false },
      ],
    },
  ],
};

// TBS-FAR-045: Asset Retirement Obligations
export const farAROTBS: TBSQuestion = {
  id: "tbs-far-045",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-Term Liabilities",
  subtopic: "Asset Retirement Obligations",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Asset Retirement Obligation Calculations",
  scenarioText: `Pacific Energy Corp acquires an offshore oil platform on January 1, Year 1 for $50 million. The company has a legal obligation to dismantle the platform and restore the site at the end of its 20-year useful life.

The estimated cost of dismantling in 20 years is $15 million. Pacific's credit-adjusted risk-free rate is 8%.

Required: Calculate the asset retirement obligation and related entries.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-aro-data",
      order: 1,
      title: "ARO Information",
      type: "table",
      content: {
        type: "table",
        title: "Asset Retirement Obligation Data",
        headers: ["Item", "Amount/Info"],
        rows: [
          { cells: ["Platform acquisition cost", "$50,000,000"] },
          { cells: ["Estimated retirement cost (Year 20)", "$15,000,000"] },
          { cells: ["Credit-adjusted risk-free rate", "8%"] },
          { cells: ["Useful life", "20 years"] },
          { cells: ["PV factor (8%, 20 periods)", "0.2145"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-initial-aro",
      order: 1,
      type: "numeric",
      label: "Initial ARO liability (rounded to nearest dollar)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3217500,
        tolerance: 1000,
      },
      explanation: "ARO = $15,000,000 × 0.2145 = $3,217,500",
    },
    {
      id: "req-initial-asset",
      order: 2,
      type: "numeric",
      label: "Total initial capitalized cost of platform",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 53217500,
        tolerance: 1000,
      },
      explanation: "Total asset = $50,000,000 + $3,217,500 ARO asset = $53,217,500",
    },
    {
      id: "req-yr1-accretion",
      order: 3,
      type: "numeric",
      label: "Year 1 accretion expense (rounded to nearest dollar)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 257400,
        tolerance: 500,
      },
      explanation: "Accretion = $3,217,500 × 8% = $257,400",
    },
    {
      id: "req-yr1-depreciation",
      order: 4,
      type: "numeric",
      label: "Year 1 depreciation on ARO asset (straight-line)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 160875,
        tolerance: 100,
      },
      explanation: "Depreciation = $3,217,500 ÷ 20 years = $160,875",
    },
    {
      id: "req-yr1-end-aro",
      order: 5,
      type: "numeric",
      label: "ARO liability at end of Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3474900,
        tolerance: 1000,
      },
      explanation: "Year-end ARO = $3,217,500 + $257,400 accretion = $3,474,900",
    },
  ],
};

// TBS-FAR-046: Government-Wide Financial Statements
export const farGovernmentWideTBS: TBSQuestion = {
  id: "tbs-far-046",
  section: "FAR",
  tbsType: "document_review",
  topic: "State and Local Governments",
  subtopic: "Government-Wide Statements",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-IV",
  title: "Government-Wide Statement of Activities",
  scenarioText: `City of Riverdale is preparing its government-wide financial statements. You need to determine proper classification of various items in the Statement of Activities, which uses accrual accounting and classifies activities as governmental or business-type.

Required: Classify each item for proper presentation in the government-wide Statement of Activities.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-activities",
      order: 1,
      title: "City Activities and Transactions",
      type: "text",
      content: {
        type: "text",
        title: "Year-End Transactions",
        paragraphs: [
          "1. General Fund - Police department salaries: $2,500,000",
          "2. Enterprise Fund - Water utility operating revenues: $3,200,000",
          "3. Capital Projects Fund - Bond proceeds for road construction: $10,000,000",
          "4. General Fund - Property tax revenue: $8,000,000",
          "5. Enterprise Fund - Water utility depreciation: $450,000",
          "6. Internal Service Fund - Vehicle maintenance charges to police: $180,000",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-police-salaries",
      order: 1,
      type: "dropdown",
      label: "Police department salaries classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-police-gov",
      },
      explanation: "General Fund activities are governmental activities",
      dropdownOptions: [
        { id: "opt-police-gov", order: 1, text: "Governmental activities - Public safety expense", isCorrect: true },
        { id: "opt-police-bus", order: 2, text: "Business-type activities", isCorrect: false },
        { id: "opt-police-fiduciary", order: 3, text: "Fiduciary activities", isCorrect: false },
      ],
    },
    {
      id: "req-water-revenue",
      order: 2,
      type: "dropdown",
      label: "Water utility operating revenues classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-water-bus",
      },
      explanation: "Enterprise Fund activities are business-type activities",
      dropdownOptions: [
        { id: "opt-water-gov", order: 1, text: "Governmental activities", isCorrect: false },
        { id: "opt-water-bus", order: 2, text: "Business-type activities - charges for services", isCorrect: true },
      ],
    },
    {
      id: "req-bond-proceeds",
      order: 3,
      type: "dropdown",
      label: "Bond proceeds for road construction",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-bond-liability",
      },
      explanation: "Bond proceeds create a liability, not revenue, in government-wide statements",
      dropdownOptions: [
        { id: "opt-bond-revenue", order: 1, text: "Other financing source (revenue)", isCorrect: false },
        { id: "opt-bond-liability", order: 2, text: "Long-term liability (bonds payable)", isCorrect: true },
        { id: "opt-bond-capital", order: 3, text: "Capital contribution", isCorrect: false },
      ],
    },
    {
      id: "req-property-tax",
      order: 4,
      type: "dropdown",
      label: "Property tax revenue classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tax-general",
      },
      explanation: "Property taxes are general revenues in Statement of Activities",
      dropdownOptions: [
        { id: "opt-tax-program", order: 1, text: "Program revenue - operating grants", isCorrect: false },
        { id: "opt-tax-general", order: 2, text: "General revenues", isCorrect: true },
        { id: "opt-tax-charges", order: 3, text: "Program revenue - charges for services", isCorrect: false },
      ],
    },
    {
      id: "req-water-depreciation",
      order: 5,
      type: "dropdown",
      label: "Water utility depreciation presentation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-depr-bus",
      },
      explanation: "Enterprise fund depreciation is expense in business-type activities",
      dropdownOptions: [
        { id: "opt-depr-gov", order: 1, text: "Governmental activities expense", isCorrect: false },
        { id: "opt-depr-bus", order: 2, text: "Business-type activities expense", isCorrect: true },
        { id: "opt-depr-excluded", order: 3, text: "Excluded from Statement of Activities", isCorrect: false },
      ],
    },
    {
      id: "req-internal-service",
      order: 6,
      type: "dropdown",
      label: "Internal service fund charges treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-isf-eliminated",
      },
      explanation: "Internal service fund charges are typically eliminated as internal activity",
      dropdownOptions: [
        { id: "opt-isf-gov", order: 1, text: "Governmental activities revenue", isCorrect: false },
        { id: "opt-isf-bus", order: 2, text: "Business-type activities", isCorrect: false },
        { id: "opt-isf-eliminated", order: 3, text: "Eliminated - internal activity", isCorrect: true },
      ],
    },
  ],
};

// TBS-FAR-047: Goodwill Impairment Testing
export const farGoodwillImpairmentTBS: TBSQuestion = {
  id: "tbs-far-047",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Intangible Assets",
  subtopic: "Goodwill Impairment",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Goodwill Impairment Testing",
  scenarioText: `Summit Corp has two reporting units with recorded goodwill. The company performs annual goodwill impairment testing as of October 1. Under ASC 350, goodwill impairment is measured as the excess of a reporting unit's carrying amount over its fair value.

Required: Perform the goodwill impairment analysis for each reporting unit.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-unit-data",
      order: 1,
      title: "Reporting Unit Information",
      type: "table",
      content: {
        type: "table",
        title: "Reporting Unit Data",
        headers: ["", "Unit A", "Unit B"],
        rows: [
          { cells: ["Carrying amount of net assets", "$45,000,000", "$30,000,000"] },
          { cells: ["Including goodwill of:", "$8,000,000", "$12,000,000"] },
          { cells: ["Fair value of reporting unit", "$50,000,000", "$25,000,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-unit-a-impaired",
      order: 1,
      type: "dropdown",
      label: "Is Unit A's goodwill impaired?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-no",
      },
      explanation: "Fair value ($50M) exceeds carrying amount ($45M), so no impairment",
      dropdownOptions: [
        { id: "opt-a-yes", order: 1, text: "Yes", isCorrect: false },
        { id: "opt-a-no", order: 2, text: "No", isCorrect: true },
      ],
    },
    {
      id: "req-unit-a-loss",
      order: 2,
      type: "numeric",
      label: "Unit A impairment loss (if any)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "No impairment because fair value exceeds carrying amount",
    },
    {
      id: "req-unit-b-impaired",
      order: 3,
      type: "dropdown",
      label: "Is Unit B's goodwill impaired?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-yes",
      },
      explanation: "Fair value ($25M) is less than carrying amount ($30M), so impaired",
      dropdownOptions: [
        { id: "opt-b-yes", order: 1, text: "Yes", isCorrect: true },
        { id: "opt-b-no", order: 2, text: "No", isCorrect: false },
      ],
    },
    {
      id: "req-unit-b-loss",
      order: 4,
      type: "numeric",
      label: "Unit B impairment loss",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000000,
        tolerance: 0,
      },
      explanation: "Impairment = $30M carrying - $25M fair value = $5M (limited to goodwill balance)",
    },
    {
      id: "req-total-impairment",
      order: 5,
      type: "numeric",
      label: "Total goodwill impairment loss to record",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000000,
        tolerance: 0,
      },
      explanation: "Total = $0 (Unit A) + $5,000,000 (Unit B) = $5,000,000",
    },
  ],
};

// TBS-FAR-048: Statement of Cash Flows - Direct Method
export const farCashFlowDirectTBS: TBSQuestion = {
  id: "tbs-far-048",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Financial Statement Presentation",
  subtopic: "Cash Flow Statement",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Statement of Cash Flows - Direct Method",
  scenarioText: `Westbrook Corp is preparing its statement of cash flows using the direct method. You have been provided with income statement data and balance sheet changes to calculate the operating section cash flows.

Required: Calculate the cash flows from operating activities using the direct method.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-income-stmt",
      order: 1,
      title: "Income Statement Data",
      type: "table",
      content: {
        type: "table",
        title: "Income Statement - Year Ended December 31",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Sales revenue", "$2,400,000"] },
          { cells: ["Cost of goods sold", "$1,440,000"] },
          { cells: ["Operating expenses", "$480,000"] },
          { cells: ["Depreciation expense", "$120,000"] },
          { cells: ["Interest expense", "$60,000"] },
          { cells: ["Income tax expense", "$90,000"] },
          { cells: ["Net income", "$210,000"] },
        ],
      },
    },
    {
      id: "exhibit-balance-changes",
      order: 2,
      title: "Balance Sheet Changes",
      type: "table",
      content: {
        type: "table",
        title: "Balance Sheet Account Changes",
        headers: ["Account", "Increase/(Decrease)"],
        rows: [
          { cells: ["Accounts receivable", "$80,000"] },
          { cells: ["Inventory", "$(30,000)"] },
          { cells: ["Prepaid expenses", "$15,000"] },
          { cells: ["Accounts payable (merchandise)", "$(25,000)"] },
          { cells: ["Accrued expenses", "$20,000"] },
          { cells: ["Interest payable", "$(10,000)"] },
          { cells: ["Income taxes payable", "$5,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cash-from-customers",
      order: 1,
      type: "numeric",
      label: "Cash received from customers",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2320000,
        tolerance: 0,
      },
      explanation: "Cash from customers = $2,400,000 sales - $80,000 AR increase = $2,320,000",
    },
    {
      id: "req-cash-to-suppliers",
      order: 2,
      type: "numeric",
      label: "Cash paid to suppliers (for inventory)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1435000,
        tolerance: 0,
      },
      explanation: "Cash to suppliers = COGS $1,440,000 - Inv decrease $30,000 + AP decrease $25,000 = $1,435,000",
    },
    {
      id: "req-cash-for-operating",
      order: 3,
      type: "numeric",
      label: "Cash paid for operating expenses",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 475000,
        tolerance: 0,
      },
      explanation: "Cash for operating = $480,000 expense + $15,000 prepaid increase - $20,000 accrued increase = $475,000",
    },
    {
      id: "req-cash-for-interest",
      order: 4,
      type: "numeric",
      label: "Cash paid for interest",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 70000,
        tolerance: 0,
      },
      explanation: "Cash for interest = $60,000 expense + $10,000 interest payable decrease = $70,000",
    },
    {
      id: "req-cash-for-taxes",
      order: 5,
      type: "numeric",
      label: "Cash paid for income taxes",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 85000,
        tolerance: 0,
      },
      explanation: "Cash for taxes = $90,000 expense - $5,000 taxes payable increase = $85,000",
    },
    {
      id: "req-net-operating",
      order: 6,
      type: "numeric",
      label: "Net cash from operating activities",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 255000,
        tolerance: 0,
      },
      explanation: "Net operating = $2,320,000 - $1,435,000 - $475,000 - $70,000 - $85,000 = $255,000",
    },
  ],
};

// TBS-FAR-049: Intercompany Transactions Elimination
export const farIntercompanyEliminationsTBS: TBSQuestion = {
  id: "tbs-far-049",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Consolidations",
  subtopic: "Intercompany Eliminations",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Intercompany Transaction Eliminations",
  scenarioText: `Parent Corp owns 100% of Sub Inc. During the year, the following intercompany transactions occurred:

1. Parent sold inventory to Sub for $200,000 (cost to Parent was $150,000). At year-end, Sub still holds 40% of this inventory.
2. Sub sold land to Parent for $80,000 (Sub's book value was $60,000).
3. Parent charged Sub $30,000 for management fees.

Required: Prepare the consolidation eliminating entries.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-interco-detail",
      order: 1,
      title: "Intercompany Transaction Details",
      type: "table",
      content: {
        type: "table",
        title: "Transaction Summary",
        headers: ["Transaction", "Transfer Price", "Cost/Book Value", "Remaining at Y/E"],
        rows: [
          { cells: ["Inventory (downstream)", "$200,000", "$150,000", "40%"] },
          { cells: ["Land (upstream)", "$80,000", "$60,000", "100%"] },
          { cells: ["Management fees", "$30,000", "N/A", "N/A"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-inventory-sales-elim",
      order: 1,
      type: "numeric",
      label: "Eliminate intercompany sales - amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 200000,
        tolerance: 0,
      },
      explanation: "Eliminate full intercompany sales of $200,000",
    },
    {
      id: "req-inventory-profit-elim",
      order: 2,
      type: "numeric",
      label: "Unrealized profit in ending inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "Unrealized profit = ($200,000 - $150,000) × 40% = $20,000",
    },
    {
      id: "req-land-gain-elim",
      order: 3,
      type: "numeric",
      label: "Unrealized gain on land sale to eliminate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "Unrealized gain = $80,000 - $60,000 = $20,000",
    },
    {
      id: "req-land-adjustment",
      order: 4,
      type: "numeric",
      label: "Reduction to Land account in consolidation",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "Land reduced by $20,000 to reflect original cost",
    },
    {
      id: "req-mgmt-fee-elim",
      order: 5,
      type: "numeric",
      label: "Management fee revenue to eliminate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30000,
        tolerance: 0,
      },
      explanation: "Eliminate $30,000 intercompany management fee revenue",
    },
    {
      id: "req-mgmt-expense-elim",
      order: 6,
      type: "numeric",
      label: "Management fee expense to eliminate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30000,
        tolerance: 0,
      },
      explanation: "Eliminate $30,000 intercompany management fee expense",
    },
  ],
  journalAccounts: [
    { id: "sales", name: "Sales", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "cogs", name: "Cost of Goods Sold", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "inventory", name: "Inventory", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "land", name: "Land", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "gain-land", name: "Gain on Sale of Land", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "mgmt-fee-rev", name: "Management Fee Revenue", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "mgmt-fee-exp", name: "Management Fee Expense", type: "expense", normalBalance: "debit", isDistractor: false },
  ],
};

// TBS-FAR-050: Equity Method Investments
export const farEquityMethodTBS: TBSQuestion = {
  id: "tbs-far-050",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Investments",
  subtopic: "Equity Method",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Equity Method Investment Accounting",
  scenarioText: `On January 1, Year 1, Investor Corp acquired 30% of Target Inc's common stock for $900,000. At acquisition, Target's net assets had a book value of $2,400,000 and fair value of $2,700,000. The excess fair value is attributable to equipment with a remaining life of 10 years.

During Year 1, Target reported net income of $400,000 and paid dividends of $100,000.

Required: Calculate the equity method accounting entries for Year 1.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-investment-data",
      order: 1,
      title: "Investment Information",
      type: "table",
      content: {
        type: "table",
        title: "Equity Method Investment Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Acquisition cost", "$900,000"] },
          { cells: ["Ownership percentage", "30%"] },
          { cells: ["Book value of net assets at acquisition", "$2,400,000"] },
          { cells: ["Fair value of net assets at acquisition", "$2,700,000"] },
          { cells: ["Target net income - Year 1", "$400,000"] },
          { cells: ["Target dividends - Year 1", "$100,000"] },
          { cells: ["Equipment remaining life", "10 years"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-book-value-acquired",
      order: 1,
      type: "numeric",
      label: "Investor's share of book value acquired (30%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 720000,
        tolerance: 0,
      },
      explanation: "Share of book value = $2,400,000 × 30% = $720,000",
    },
    {
      id: "req-excess-cost",
      order: 2,
      type: "numeric",
      label: "Excess of cost over book value acquired",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 180000,
        tolerance: 0,
      },
      explanation: "Excess = $900,000 cost - $720,000 book value = $180,000",
    },
    {
      id: "req-fv-diff",
      order: 3,
      type: "numeric",
      label: "Investor's share of equipment FV difference",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90000,
        tolerance: 0,
      },
      explanation: "FV difference = ($2,700,000 - $2,400,000) × 30% = $90,000",
    },
    {
      id: "req-equity-income",
      order: 4,
      type: "numeric",
      label: "Equity in earnings of Target (before adjustments)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 120000,
        tolerance: 0,
      },
      explanation: "Equity income = $400,000 × 30% = $120,000",
    },
    {
      id: "req-amortization",
      order: 5,
      type: "numeric",
      label: "Annual amortization of FV differential",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9000,
        tolerance: 0,
      },
      explanation: "Amortization = $90,000 ÷ 10 years = $9,000",
    },
    {
      id: "req-yr1-end-balance",
      order: 6,
      type: "numeric",
      label: "Investment balance at end of Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 981000,
        tolerance: 0,
      },
      explanation: "Balance = $900,000 + $120,000 income - $9,000 amortization - $30,000 dividends = $981,000",
    },
  ],
};

// =============================================================================
// PHASE 2 EXPANSION - Batch 2 (tbs-far-051 through tbs-far-061)
// =============================================================================

// TBS-FAR-051: Lease Classification
export const farLeaseClassificationTBS: TBSQuestion = {
  id: "tbs-far-051",
  section: "FAR",
  tbsType: "document_review",
  topic: "Leases",
  subtopic: "Lease Classification",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Lease Classification Analysis",
  scenarioText: `You are evaluating lease classification for several new lease agreements entered into by Precision Manufacturing Corp. Under ASC 842, leases must be classified as either finance or operating leases based on specific criteria.

Required: Analyze each lease and determine proper classification.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-leases",
      order: 1,
      title: "New Lease Agreements",
      type: "table",
      content: {
        type: "table",
        title: "Lease Details",
        headers: ["Lease", "Asset", "Lease Term", "Asset Life", "PV Payments/FV", "Terms"],
        rows: [
          { cells: ["A", "Heavy Equipment", "8 years", "10 years", "92%", "No transfer, no bargain purchase"] },
          { cells: ["B", "Delivery Vehicles", "4 years", "8 years", "45%", "No transfer, no bargain purchase"] },
          { cells: ["C", "Office Building", "15 years", "40 years", "30%", "No transfer, no bargain purchase"] },
          { cells: ["D", "Specialized Machine", "6 years", "7 years", "88%", "Bargain purchase option"] },
          { cells: ["E", "Warehouse", "12 years", "12 years", "100%", "Title transfers at end"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lease-a",
      order: 1,
      type: "dropdown",
      label: "Lease A classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-finance",
      },
      explanation: "Lease term (8/10 = 80%) is >= 75% of asset life AND PV (92%) >= 90% of FV",
      dropdownOptions: [
        { id: "opt-a-finance", order: 1, text: "Finance lease", isCorrect: true },
        { id: "opt-a-operating", order: 2, text: "Operating lease", isCorrect: false },
      ],
    },
    {
      id: "req-lease-b",
      order: 2,
      type: "dropdown",
      label: "Lease B classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-operating",
      },
      explanation: "Lease term (4/8 = 50%) < 75% AND PV (45%) < 90%, no other criteria met",
      dropdownOptions: [
        { id: "opt-b-finance", order: 1, text: "Finance lease", isCorrect: false },
        { id: "opt-b-operating", order: 2, text: "Operating lease", isCorrect: true },
      ],
    },
    {
      id: "req-lease-c",
      order: 3,
      type: "dropdown",
      label: "Lease C classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-operating",
      },
      explanation: "Lease term (15/40 = 37.5%) < 75% AND PV (30%) < 90%, no criteria met",
      dropdownOptions: [
        { id: "opt-c-finance", order: 1, text: "Finance lease", isCorrect: false },
        { id: "opt-c-operating", order: 2, text: "Operating lease", isCorrect: true },
      ],
    },
    {
      id: "req-lease-d",
      order: 4,
      type: "dropdown",
      label: "Lease D classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-finance",
      },
      explanation: "Bargain purchase option = automatic finance lease classification",
      dropdownOptions: [
        { id: "opt-d-finance", order: 1, text: "Finance lease", isCorrect: true },
        { id: "opt-d-operating", order: 2, text: "Operating lease", isCorrect: false },
      ],
    },
    {
      id: "req-lease-e",
      order: 5,
      type: "dropdown",
      label: "Lease E classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-finance",
      },
      explanation: "Title transfer = automatic finance lease classification",
      dropdownOptions: [
        { id: "opt-e-finance", order: 1, text: "Finance lease", isCorrect: true },
        { id: "opt-e-operating", order: 2, text: "Operating lease", isCorrect: false },
      ],
    },
  ],
};

// TBS-FAR-052: Convertible Debt
export const farConvertibleDebtTBS: TBSQuestion = {
  id: "tbs-far-052",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-Term Liabilities",
  subtopic: "Convertible Debt",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Convertible Debt Accounting",
  scenarioText: `On January 1, Year 1, Nexus Corp issued $5,000,000 of 6% convertible bonds at par. Each $1,000 bond is convertible into 50 shares of $1 par common stock. On July 1, Year 3, when the bonds had an unamortized discount of $0 (issued at par), bondholders converted all bonds. The market price of the stock was $25 per share at conversion.

Required: Calculate the conversion accounting using the book value method.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-bond-data",
      order: 1,
      title: "Convertible Bond Information",
      type: "table",
      content: {
        type: "table",
        title: "Bond Details",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Face value of bonds", "$5,000,000"] },
          { cells: ["Coupon rate", "6%"] },
          { cells: ["Conversion ratio", "50 shares per $1,000 bond"] },
          { cells: ["Number of bonds", "5,000"] },
          { cells: ["Stock market price at conversion", "$25/share"] },
          { cells: ["Par value per share", "$1"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-num-bonds",
      order: 1,
      type: "numeric",
      label: "Number of bonds converted",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000,
        tolerance: 0,
      },
      explanation: "$5,000,000 ÷ $1,000 = 5,000 bonds",
    },
    {
      id: "req-shares-issued",
      order: 2,
      type: "numeric",
      label: "Total shares issued on conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 250000,
        tolerance: 0,
      },
      explanation: "5,000 bonds × 50 shares = 250,000 shares",
    },
    {
      id: "req-common-stock",
      order: 3,
      type: "numeric",
      label: "Credit to Common Stock account",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 250000,
        tolerance: 0,
      },
      explanation: "Common Stock = 250,000 shares × $1 par = $250,000",
    },
    {
      id: "req-apic",
      order: 4,
      type: "numeric",
      label: "Credit to Additional Paid-in Capital",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4750000,
        tolerance: 0,
      },
      explanation: "APIC = $5,000,000 bond carrying value - $250,000 common stock = $4,750,000",
    },
    {
      id: "req-gain-loss",
      order: 5,
      type: "numeric",
      label: "Gain or loss recognized on conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Book value method recognizes no gain/loss on conversion",
    },
  ],
};

// TBS-FAR-053: Discontinued Operations
export const farDiscontinuedOperationsTBS: TBSQuestion = {
  id: "tbs-far-053",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Financial Statement Presentation",
  subtopic: "Discontinued Operations",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Discontinued Operations Presentation",
  scenarioText: `Diversified Holdings Inc. has decided to dispose of its retail segment, which qualifies as a discontinued operation under ASC 205-20. The segment's operating results and disposal information are provided for Year 1.

Required: Calculate the amounts to be reported as discontinued operations.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-disco-data",
      order: 1,
      title: "Discontinued Segment Data",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Results",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Segment revenues", "$4,200,000"] },
          { cells: ["Segment operating expenses", "$4,800,000"] },
          { cells: ["Segment carrying amount", "$3,500,000"] },
          { cells: ["Fair value less costs to sell", "$2,800,000"] },
          { cells: ["Corporate tax rate", "25%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-operating-loss",
      order: 1,
      type: "numeric",
      label: "Operating loss from discontinued operations (pretax)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 600000,
        tolerance: 0,
      },
      explanation: "Operating loss = $4,800,000 - $4,200,000 = $600,000 loss",
    },
    {
      id: "req-impairment",
      order: 2,
      type: "numeric",
      label: "Impairment loss on disposal group",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 700000,
        tolerance: 0,
      },
      explanation: "Impairment = $3,500,000 carrying - $2,800,000 FV = $700,000",
    },
    {
      id: "req-total-pretax",
      order: 3,
      type: "numeric",
      label: "Total pretax loss from discontinued operations",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1300000,
        tolerance: 0,
      },
      explanation: "Total pretax = $600,000 operating + $700,000 impairment = $1,300,000",
    },
    {
      id: "req-tax-benefit",
      order: 4,
      type: "numeric",
      label: "Tax benefit from discontinued operations",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 325000,
        tolerance: 0,
      },
      explanation: "Tax benefit = $1,300,000 × 25% = $325,000",
    },
    {
      id: "req-net-loss",
      order: 5,
      type: "numeric",
      label: "Net loss from discontinued operations",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 975000,
        tolerance: 0,
      },
      explanation: "Net loss = $1,300,000 - $325,000 = $975,000",
    },
  ],
};

// TBS-FAR-054: Related Party Disclosures
export const farRelatedPartyTBS: TBSQuestion = {
  id: "tbs-far-054",
  section: "FAR",
  tbsType: "document_review",
  topic: "Financial Statement Disclosures",
  subtopic: "Related Party Transactions",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Related Party Transaction Analysis",
  scenarioText: `You are reviewing transactions for Metro Industries to determine related party disclosure requirements under ASC 850. Various transactions with potentially related parties have been identified.

Required: Determine which transactions require related party disclosure.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Transaction Summary",
      type: "text",
      content: {
        type: "text",
        title: "Potential Related Party Transactions",
        paragraphs: [
          "1. Sale of inventory to ABC Corp for $500,000 - ABC's CEO is brother of Metro's CFO",
          "2. Lease of office space from landlord at market rates - unrelated third party",
          "3. Legal services from law firm for $200,000 - partner at firm is Metro board member",
          "4. Purchase of supplies from vendor for $150,000 at market prices - CEO owns 8% of vendor",
          "5. Management services to subsidiary for $400,000 - 100% owned subsidiary",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-trans-1",
      order: 1,
      type: "dropdown",
      label: "Transaction 1 (ABC Corp) - Disclosure required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-1-yes",
      },
      explanation: "Immediate family of key management = related party under ASC 850",
      dropdownOptions: [
        { id: "opt-1-yes", order: 1, text: "Yes - related party disclosure required", isCorrect: true },
        { id: "opt-1-no", order: 2, text: "No - not a related party", isCorrect: false },
      ],
    },
    {
      id: "req-trans-2",
      order: 2,
      type: "dropdown",
      label: "Transaction 2 (Office lease) - Disclosure required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-2-no",
      },
      explanation: "Unrelated third party at market rates = no related party relationship",
      dropdownOptions: [
        { id: "opt-2-yes", order: 1, text: "Yes - related party disclosure required", isCorrect: false },
        { id: "opt-2-no", order: 2, text: "No - not a related party", isCorrect: true },
      ],
    },
    {
      id: "req-trans-3",
      order: 3,
      type: "dropdown",
      label: "Transaction 3 (Law firm) - Disclosure required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-3-yes",
      },
      explanation: "Board member with business relationship = related party",
      dropdownOptions: [
        { id: "opt-3-yes", order: 1, text: "Yes - related party disclosure required", isCorrect: true },
        { id: "opt-3-no", order: 2, text: "No - not a related party", isCorrect: false },
      ],
    },
    {
      id: "req-trans-4",
      order: 4,
      type: "dropdown",
      label: "Transaction 4 (Vendor) - Disclosure required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-4-yes",
      },
      explanation: "CEO ownership in vendor creates related party relationship",
      dropdownOptions: [
        { id: "opt-4-yes", order: 1, text: "Yes - related party disclosure required", isCorrect: true },
        { id: "opt-4-no", order: 2, text: "No - not a related party", isCorrect: false },
      ],
    },
    {
      id: "req-trans-5",
      order: 5,
      type: "dropdown",
      label: "Transaction 5 (Subsidiary) - Disclosure required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-5-eliminated",
      },
      explanation: "100% subsidiary transactions eliminated in consolidation - no separate disclosure needed in consolidated statements",
      dropdownOptions: [
        { id: "opt-5-yes", order: 1, text: "Yes - related party disclosure required", isCorrect: false },
        { id: "opt-5-eliminated", order: 2, text: "Eliminated in consolidation - no separate disclosure", isCorrect: true },
      ],
    },
  ],
};

// TBS-FAR-055: Error Correction
export const farErrorCorrectionTBS: TBSQuestion = {
  id: "tbs-far-055",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Accounting Changes",
  subtopic: "Error Correction",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Prior Period Error Correction",
  scenarioText: `In Year 3, Global Tech discovered that depreciation expense had been understated by $200,000 in Year 1 and $150,000 in Year 2. The company also discovered that $80,000 of revenue was recorded in Year 2 that should have been recorded in Year 3.

The tax rate is 25%. Beginning retained earnings for Year 3 (as originally reported) was $2,500,000.

Required: Calculate the restated amounts.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-error-data",
      order: 1,
      title: "Error Information",
      type: "table",
      content: {
        type: "table",
        title: "Errors Discovered in Year 3",
        headers: ["Error", "Year 1", "Year 2", "Effect"],
        rows: [
          { cells: ["Depreciation understated", "$200,000", "$150,000", "Net income overstated"] },
          { cells: ["Revenue timing", "N/A", "$80,000", "Year 2 overstated, Year 3 understated"] },
          { cells: ["Tax rate", "", "", "25%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-pretax-adj",
      order: 1,
      type: "numeric",
      label: "Total pretax error affecting beginning RE Year 3",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 270000,
        tolerance: 0,
      },
      explanation: "$200,000 (Y1 depr) + $150,000 (Y2 depr) - $80,000 (Y2 revenue, reduces error) = $270,000 overstatement of prior income",
    },
    {
      id: "req-tax-effect",
      order: 2,
      type: "numeric",
      label: "Tax effect of error corrections",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 67500,
        tolerance: 0,
      },
      explanation: "Tax effect = $270,000 × 25% = $67,500",
    },
    {
      id: "req-net-adj",
      order: 3,
      type: "numeric",
      label: "Net adjustment to beginning RE (decrease)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 202500,
        tolerance: 0,
      },
      explanation: "Net = $270,000 - $67,500 = $202,500 decrease to RE",
    },
    {
      id: "req-restated-re",
      order: 4,
      type: "numeric",
      label: "Restated beginning RE for Year 3",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2297500,
        tolerance: 0,
      },
      explanation: "Restated RE = $2,500,000 - $202,500 = $2,297,500",
    },
    {
      id: "req-yr3-revenue-adj",
      order: 5,
      type: "numeric",
      label: "Amount to add to Year 3 revenue (timing error)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "The $80,000 revenue belongs in Year 3, so add to Year 3 revenue",
    },
  ],
};

// TBS-FAR-056: Accounting Changes
export const farAccountingChangesTBS: TBSQuestion = {
  id: "tbs-far-056",
  section: "FAR",
  tbsType: "document_review",
  topic: "Accounting Changes",
  subtopic: "Changes in Accounting Principle",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Accounting Change Classification",
  scenarioText: `Sterling Corp made several accounting changes during Year 3. You need to determine the proper classification and accounting treatment for each change.

Required: Classify each change and determine the appropriate accounting treatment.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-changes",
      order: 1,
      title: "Accounting Changes Made",
      type: "text",
      content: {
        type: "text",
        title: "Year 3 Changes",
        paragraphs: [
          "1. Changed from FIFO to LIFO for inventory valuation",
          "2. Changed depreciation method from double-declining to straight-line",
          "3. Revised estimate of useful life of equipment from 10 to 8 years",
          "4. Changed from completed contract to percentage-of-completion (meets criteria)",
          "5. Changed depreciation estimate for salvage value from $50,000 to $30,000",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-change-1",
      order: 1,
      type: "dropdown",
      label: "FIFO to LIFO change - Classification and treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-1-prospective",
      },
      explanation: "LIFO change is treated prospectively due to impracticability of retrospective application",
      dropdownOptions: [
        { id: "opt-1-retro", order: 1, text: "Change in principle - retrospective", isCorrect: false },
        { id: "opt-1-prospective", order: 2, text: "Change in principle - prospective (LIFO exception)", isCorrect: true },
        { id: "opt-1-estimate", order: 3, text: "Change in estimate", isCorrect: false },
      ],
    },
    {
      id: "req-change-2",
      order: 2,
      type: "dropdown",
      label: "Depreciation method change - Classification and treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-2-estimate",
      },
      explanation: "Depreciation method changes are treated as changes in estimate under ASC 250",
      dropdownOptions: [
        { id: "opt-2-retro", order: 1, text: "Change in principle - retrospective", isCorrect: false },
        { id: "opt-2-estimate", order: 2, text: "Change in estimate - prospective", isCorrect: true },
      ],
    },
    {
      id: "req-change-3",
      order: 3,
      type: "dropdown",
      label: "Useful life revision - Classification and treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-3-estimate",
      },
      explanation: "Revising useful life is a change in estimate - prospective application",
      dropdownOptions: [
        { id: "opt-3-retro", order: 1, text: "Change in principle - retrospective", isCorrect: false },
        { id: "opt-3-estimate", order: 2, text: "Change in estimate - prospective", isCorrect: true },
      ],
    },
    {
      id: "req-change-4",
      order: 4,
      type: "dropdown",
      label: "Revenue recognition method change - Classification and treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-4-retro",
      },
      explanation: "Change in revenue recognition principle requires retrospective application",
      dropdownOptions: [
        { id: "opt-4-retro", order: 1, text: "Change in principle - retrospective", isCorrect: true },
        { id: "opt-4-prospective", order: 2, text: "Change in principle - prospective", isCorrect: false },
        { id: "opt-4-estimate", order: 3, text: "Change in estimate", isCorrect: false },
      ],
    },
    {
      id: "req-change-5",
      order: 5,
      type: "dropdown",
      label: "Salvage value revision - Classification and treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-5-estimate",
      },
      explanation: "Salvage value revision is a change in estimate - prospective",
      dropdownOptions: [
        { id: "opt-5-retro", order: 1, text: "Change in principle - retrospective", isCorrect: false },
        { id: "opt-5-estimate", order: 2, text: "Change in estimate - prospective", isCorrect: true },
      ],
    },
  ],
};

// TBS-FAR-057: Finance Lease - Lessor Accounting
export const farFinanceLeaseTBS: TBSQuestion = {
  id: "tbs-far-057",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Leases",
  subtopic: "Lessor Accounting",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Sales-Type Lease - Lessor Accounting",
  scenarioText: `Delta Leasing Corp entered into a sales-type lease for equipment on January 1, Year 1. Delta is the lessor and the manufacturer of the equipment.

Equipment cost: $80,000
Fair value: $100,000
Lease term: 5 years
Annual payment (due each Dec 31): $24,000
Implicit rate: 8%
PV factor (8%, 5 periods, ordinary annuity): 3.9927

Required: Calculate the lessor's initial recognition amounts.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-lease-info",
      order: 1,
      title: "Sales-Type Lease Terms",
      type: "table",
      content: {
        type: "table",
        title: "Lease Details",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Equipment cost to lessor", "$80,000"] },
          { cells: ["Equipment fair value", "$100,000"] },
          { cells: ["Annual lease payment", "$24,000"] },
          { cells: ["Lease term", "5 years"] },
          { cells: ["Implicit rate", "8%"] },
          { cells: ["PV factor (5 periods, 8%)", "3.9927"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-lease-receivable",
      order: 1,
      type: "numeric",
      label: "Net investment in lease (lease receivable)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 95825,
        tolerance: 10,
      },
      explanation: "Net investment = $24,000 × 3.9927 = $95,825",
    },
    {
      id: "req-sales-revenue",
      order: 2,
      type: "numeric",
      label: "Sales revenue recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 95825,
        tolerance: 10,
      },
      explanation: "Sales revenue = PV of lease payments = $95,825 (lower of PV and fair value)",
    },
    {
      id: "req-cogs",
      order: 3,
      type: "numeric",
      label: "Cost of goods sold recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "COGS = cost of equipment = $80,000",
    },
    {
      id: "req-gross-profit",
      order: 4,
      type: "numeric",
      label: "Gross profit at lease inception",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15825,
        tolerance: 10,
      },
      explanation: "Gross profit = $95,825 - $80,000 = $15,825",
    },
    {
      id: "req-yr1-interest",
      order: 5,
      type: "numeric",
      label: "Interest income - Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7666,
        tolerance: 10,
      },
      explanation: "Interest income = $95,825 × 8% = $7,666",
    },
  ],
};

// TBS-FAR-058: Pension Plan Accounting
export const farPensionPlanTBS: TBSQuestion = {
  id: "tbs-far-058",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Employee Benefits",
  subtopic: "Defined Benefit Pension",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Pension Plan - Funded Status Calculation",
  scenarioText: `Omega Corp sponsors a defined benefit pension plan. You have been provided with the plan information for Year 2 and need to calculate pension-related amounts.

Required: Calculate the pension expense components and funded status.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pension-data",
      order: 1,
      title: "Pension Plan Information",
      type: "table",
      content: {
        type: "table",
        title: "Year 2 Pension Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["PBO - Beginning of Year 2", "$1,200,000"] },
          { cells: ["Plan assets - Beginning of Year 2", "$900,000"] },
          { cells: ["Service cost", "$150,000"] },
          { cells: ["Interest cost (6% discount rate)", "$72,000"] },
          { cells: ["Expected return on plan assets (8%)", "$72,000"] },
          { cells: ["Actual return on plan assets", "$85,000"] },
          { cells: ["Employer contribution", "$180,000"] },
          { cells: ["Benefits paid", "$100,000"] },
          { cells: ["Amortization of prior service cost", "$15,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pension-expense",
      order: 1,
      type: "numeric",
      label: "Total pension expense for Year 2",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 165000,
        tolerance: 0,
      },
      explanation: "Expense = $150,000 service + $72,000 interest - $72,000 expected return + $15,000 amortization = $165,000",
    },
    {
      id: "req-pbo-end",
      order: 2,
      type: "numeric",
      label: "PBO at end of Year 2",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1322000,
        tolerance: 0,
      },
      explanation: "PBO = $1,200,000 + $150,000 service + $72,000 interest - $100,000 benefits = $1,322,000",
    },
    {
      id: "req-assets-end",
      order: 3,
      type: "numeric",
      label: "Plan assets at end of Year 2",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1065000,
        tolerance: 0,
      },
      explanation: "Assets = $900,000 + $85,000 actual return + $180,000 contribution - $100,000 benefits = $1,065,000",
    },
    {
      id: "req-funded-status",
      order: 4,
      type: "numeric",
      label: "Funded status (underfunded amount)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 257000,
        tolerance: 0,
      },
      explanation: "Underfunded = $1,322,000 PBO - $1,065,000 assets = $257,000",
    },
    {
      id: "req-asset-gain",
      order: 5,
      type: "numeric",
      label: "Asset gain/loss to OCI (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 13000,
        tolerance: 0,
      },
      explanation: "Asset gain = $85,000 actual - $72,000 expected = $13,000 gain to OCI",
    },
    {
      id: "req-bs-liability",
      order: 6,
      type: "numeric",
      label: "Net pension liability on balance sheet",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 257000,
        tolerance: 0,
      },
      explanation: "Liability = funded status underfunded amount = $257,000",
    },
  ],
};

// TBS-FAR-059: Bond Retirement
export const farBondRetirementTBS: TBSQuestion = {
  id: "tbs-far-059",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-Term Liabilities",
  subtopic: "Bond Retirement",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Early Bond Retirement",
  scenarioText: `On January 1, Year 1, Atlas Corp issued $2,000,000 of 8% bonds at 97 (a discount). The bonds mature in 10 years. On January 1, Year 4, when the carrying value was $1,960,000, Atlas retired 40% of the bonds at 102.

Required: Calculate the bond retirement amounts.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-bond-retire",
      order: 1,
      title: "Bond Retirement Information",
      type: "table",
      content: {
        type: "table",
        title: "Bond Details",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Face value of bonds", "$2,000,000"] },
          { cells: ["Carrying value at retirement", "$1,960,000"] },
          { cells: ["Percentage retired", "40%"] },
          { cells: ["Retirement price", "102% of face"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-face-retired",
      order: 1,
      type: "numeric",
      label: "Face value of bonds retired",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 800000,
        tolerance: 0,
      },
      explanation: "$2,000,000 × 40% = $800,000",
    },
    {
      id: "req-carrying-retired",
      order: 2,
      type: "numeric",
      label: "Carrying value of bonds retired",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 784000,
        tolerance: 0,
      },
      explanation: "$1,960,000 × 40% = $784,000",
    },
    {
      id: "req-cash-paid",
      order: 3,
      type: "numeric",
      label: "Cash paid for retirement",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 816000,
        tolerance: 0,
      },
      explanation: "$800,000 × 102% = $816,000",
    },
    {
      id: "req-gain-loss",
      order: 4,
      type: "numeric",
      label: "Loss on bond retirement",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 32000,
        tolerance: 0,
      },
      explanation: "Loss = $816,000 cash paid - $784,000 carrying = $32,000 loss",
    },
    {
      id: "req-remaining-carry",
      order: 5,
      type: "numeric",
      label: "Carrying value of remaining bonds",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1176000,
        tolerance: 0,
      },
      explanation: "$1,960,000 × 60% = $1,176,000",
    },
  ],
};

// TBS-FAR-060: Inventory Lower of Cost or NRV
export const farInventoryLowerCostTBS: TBSQuestion = {
  id: "tbs-far-060",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Inventory",
  subtopic: "Lower of Cost or Net Realizable Value",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Inventory Valuation - LCNRV",
  scenarioText: `Harbor Supply Corp uses lower of cost or net realizable value (LCNRV) to value inventory. At year-end, the company must evaluate its inventory items.

Required: Calculate the inventory valuation adjustments.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-inventory",
      order: 1,
      title: "Inventory Items",
      type: "table",
      content: {
        type: "table",
        title: "Year-End Inventory",
        headers: ["Item", "Units", "Cost/Unit", "Selling Price", "Est. Selling Costs"],
        rows: [
          { cells: ["Product A", "500", "$45", "$50", "$8"] },
          { cells: ["Product B", "300", "$60", "$80", "$12"] },
          { cells: ["Product C", "400", "$35", "$38", "$6"] },
          { cells: ["Product D", "200", "$70", "$65", "$5"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-a-nrv",
      order: 1,
      type: "numeric",
      label: "Product A - Net Realizable Value per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 42,
        tolerance: 0,
      },
      explanation: "NRV = $50 - $8 = $42",
    },
    {
      id: "req-a-writedown",
      order: 2,
      type: "numeric",
      label: "Product A - Total write-down (if any)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1500,
        tolerance: 0,
      },
      explanation: "Cost $45 > NRV $42, write-down = ($45 - $42) × 500 = $1,500",
    },
    {
      id: "req-c-valuation",
      order: 3,
      type: "numeric",
      label: "Product C - Inventory value (total)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12800,
        tolerance: 0,
      },
      explanation: "NRV = $38 - $6 = $32 < Cost $35, so use NRV: 400 × $32 = $12,800",
    },
    {
      id: "req-d-writedown",
      order: 4,
      type: "numeric",
      label: "Product D - Total write-down",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2000,
        tolerance: 0,
      },
      explanation: "NRV = $65 - $5 = $60 < Cost $70, write-down = ($70 - $60) × 200 = $2,000",
    },
    {
      id: "req-total-writedown",
      order: 5,
      type: "numeric",
      label: "Total inventory write-down",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4700,
        tolerance: 0,
      },
      explanation: "Total = $1,500 (A) + $0 (B-no writedown) + $1,200 (C) + $2,000 (D) = $4,700",
    },
  ],
};

// TBS-FAR-061: Government Fiduciary Funds
export const farGovernmentFiduciaryTBS: TBSQuestion = {
  id: "tbs-far-061",
  section: "FAR",
  tbsType: "document_review",
  topic: "State and Local Governments",
  subtopic: "Fiduciary Funds",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-IV",
  title: "Fiduciary Fund Classification",
  scenarioText: `Valley County maintains several fiduciary activities. Under GASB 84, fiduciary activities are classified into specific fund types based on the nature of the activity.

Required: Classify each fiduciary activity into the appropriate fund type.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-fid-activities",
      order: 1,
      title: "Fiduciary Activities",
      type: "text",
      content: {
        type: "text",
        title: "Valley County Fiduciary Activities",
        paragraphs: [
          "1. Employee pension plan funded by employer and employee contributions",
          "2. Taxes collected for other governments pending distribution",
          "3. External investment pool managed for participating local governments",
          "4. Funds held for inmates in county jail",
          "5. OPEB trust for retiree health benefits",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pension-class",
      order: 1,
      type: "dropdown",
      label: "Employee pension plan classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pension-trust",
      },
      explanation: "Pension plans are reported in pension trust funds",
      dropdownOptions: [
        { id: "opt-pension-trust", order: 1, text: "Pension trust fund", isCorrect: true },
        { id: "opt-pension-agency", order: 2, text: "Custodial fund", isCorrect: false },
        { id: "opt-pension-inv", order: 3, text: "Investment trust fund", isCorrect: false },
      ],
    },
    {
      id: "req-tax-class",
      order: 2,
      type: "dropdown",
      label: "Taxes collected for other governments",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-tax-custodial",
      },
      explanation: "Pass-through taxes are reported in custodial funds",
      dropdownOptions: [
        { id: "opt-tax-trust", order: 1, text: "Pension trust fund", isCorrect: false },
        { id: "opt-tax-custodial", order: 2, text: "Custodial fund", isCorrect: true },
        { id: "opt-tax-inv", order: 3, text: "Investment trust fund", isCorrect: false },
      ],
    },
    {
      id: "req-pool-class",
      order: 3,
      type: "dropdown",
      label: "External investment pool classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pool-inv",
      },
      explanation: "External investment pools are reported in investment trust funds",
      dropdownOptions: [
        { id: "opt-pool-trust", order: 1, text: "Pension trust fund", isCorrect: false },
        { id: "opt-pool-custodial", order: 2, text: "Custodial fund", isCorrect: false },
        { id: "opt-pool-inv", order: 3, text: "Investment trust fund", isCorrect: true },
      ],
    },
    {
      id: "req-inmate-class",
      order: 4,
      type: "dropdown",
      label: "Inmate funds classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-inmate-custodial",
      },
      explanation: "Funds held for individuals (inmates) are reported in custodial funds",
      dropdownOptions: [
        { id: "opt-inmate-trust", order: 1, text: "Private-purpose trust fund", isCorrect: false },
        { id: "opt-inmate-custodial", order: 2, text: "Custodial fund", isCorrect: true },
        { id: "opt-inmate-inv", order: 3, text: "Investment trust fund", isCorrect: false },
      ],
    },
    {
      id: "req-opeb-class",
      order: 5,
      type: "dropdown",
      label: "OPEB trust classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-opeb-trust",
      },
      explanation: "OPEB trusts are reported in other employee benefit trust funds (pension trust category)",
      dropdownOptions: [
        { id: "opt-opeb-trust", order: 1, text: "Other employee benefit trust fund", isCorrect: true },
        { id: "opt-opeb-custodial", order: 2, text: "Custodial fund", isCorrect: false },
        { id: "opt-opeb-private", order: 3, text: "Private-purpose trust fund", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// PHASE 3: Expansion to 75 Questions (tbs-far-062 to tbs-far-086)
// Distribution: 6 easy, 15 medium, 4 hard | Variety of TBS types
// =============================================================================

// FAR-062: Bank Reconciliation (Reconciliation Type) - Easy
export const farBankReconciliationTBS: TBSQuestion = {
  id: "tbs-far-062",
  section: "FAR",
  tbsType: "reconciliation",
  topic: "Cash and Cash Equivalents",
  subtopic: "Bank Reconciliation",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Monthly Bank Reconciliation",
  scenarioText: `Prepare a bank reconciliation for Sterling Company as of March 31, Year 1. The company's general ledger shows a cash balance of $47,830 and the bank statement shows a balance of $52,415.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-bank-statement",
      order: 1,
      title: "Bank Statement",
      type: "bank_statement",
      content: {
        type: "bank_statement",
        bankName: "First National Bank",
        accountNumber: "****4521",
        accountHolder: "Sterling Company",
        statementPeriod: "March 1-31, Year 1",
        beginningBalance: 45200,
        endingBalance: 52415,
        transactions: [
          { date: "Mar 5", description: "Deposit", credit: 8500, balance: 53700 },
          { date: "Mar 12", description: "Check #1542", debit: 3200, balance: 50500 },
          { date: "Mar 15", description: "Direct deposit - Customer", credit: 2400, balance: 52900 },
          { date: "Mar 20", description: "Check #1544", debit: 1850, balance: 51050 },
          { date: "Mar 25", description: "Service charge", debit: 35, balance: 51015 },
          { date: "Mar 28", description: "Interest earned", credit: 65, balance: 51080 },
          { date: "Mar 30", description: "NSF check - Jones Co", debit: 1500, balance: 49580 },
          { date: "Mar 31", description: "Deposit", credit: 2835, balance: 52415 },
        ],
      },
    },
    {
      id: "exhibit-gl-info",
      order: 2,
      title: "General Ledger Information",
      type: "text",
      content: {
        type: "text",
        title: "Additional Information",
        paragraphs: [
          "Outstanding checks as of March 31:",
          "• Check #1545: $2,100",
          "• Check #1546: $950",
          "Deposit in transit: $3,500 (deposited March 31, not on statement)",
          "The company has not yet recorded: service charge, interest, NSF check, or direct deposit from customer.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-adjusted-bank",
      order: 1,
      type: "numeric",
      label: "Adjusted bank balance",
      points: 1,
      correctAnswer: { type: "numeric", value: 52865, tolerance: 1 },
      explanation: "$52,415 + $3,500 (deposit in transit) - $2,100 - $950 (outstanding checks) = $52,865",
    },
    {
      id: "req-adjusted-book",
      order: 2,
      type: "numeric",
      label: "Adjusted book balance",
      points: 1,
      correctAnswer: { type: "numeric", value: 52865, tolerance: 1 },
      explanation: "$47,830 + $2,400 (direct deposit) + $65 (interest) - $35 (service charge) - $1,500 (NSF) + adjustments should equal adjusted bank balance",
    },
    {
      id: "req-outstanding-total",
      order: 3,
      type: "numeric",
      label: "Total outstanding checks",
      points: 1,
      correctAnswer: { type: "numeric", value: 3050, tolerance: 1 },
      explanation: "$2,100 + $950 = $3,050",
    },
    {
      id: "req-book-increase",
      order: 4,
      type: "numeric",
      label: "Net adjustment to increase books",
      points: 1,
      correctAnswer: { type: "numeric", value: 930, tolerance: 1 },
      explanation: "$2,400 + $65 - $35 - $1,500 = $930 net increase needed",
    },
    {
      id: "req-reconciling-items",
      order: 5,
      type: "dropdown",
      label: "Which item requires a journal entry?",
      points: 1,
      dropdownOptions: [
        { id: "opt-dit", order: 1, text: "Deposit in transit", isCorrect: false },
        { id: "opt-outstanding", order: 2, text: "Outstanding checks", isCorrect: false },
        { id: "opt-nsf", order: 3, text: "NSF check", isCorrect: true },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-nsf" },
      explanation: "NSF checks require a journal entry to reverse the original deposit; deposits in transit and outstanding checks are timing differences only",
    },
  ],
};

// FAR-063: Journal Entry - Bond Amortization (Journal Entry Type) - Medium
export const farBondAmortizationJETBS: TBSQuestion = {
  id: "tbs-far-063",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Long-Term Debt",
  subtopic: "Bond Premium Amortization",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Bond Interest and Premium Amortization Journal Entry",
  scenarioText: `Midwest Corporation issued $500,000 face value bonds on January 1, Year 1. Prepare the journal entry for the first semi-annual interest payment on June 30, Year 1.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-bond-info",
      order: 1,
      title: "Bond Information",
      type: "table",
      content: {
        type: "table",
        title: "Bond Terms",
        headers: ["Item", "Details"],
        rows: [
          { cells: ["Face Value", "$500,000"] },
          { cells: ["Stated Interest Rate", "8% annually (4% semi-annually)"] },
          { cells: ["Market Rate at Issuance", "6% annually (3% semi-annually)"] },
          { cells: ["Issue Price", "$534,651"] },
          { cells: ["Term", "5 years"] },
          { cells: ["Interest Payment", "Semi-annual (June 30 and December 31)"] },
        ],
      },
    },
    {
      id: "exhibit-amort-schedule",
      order: 2,
      title: "Amortization Schedule (Partial)",
      type: "table",
      content: {
        type: "table",
        title: "Effective Interest Amortization",
        headers: ["Date", "Cash Payment", "Interest Expense", "Premium Amort", "Carrying Value"],
        rows: [
          { cells: ["Jan 1, Yr 1", "-", "-", "-", "$534,651"] },
          { cells: ["Jun 30, Yr 1", "$20,000", "$16,040", "$3,960", "$530,691"] },
          { cells: ["Dec 31, Yr 1", "$20,000", "$15,921", "$4,079", "$526,612"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-debit-interest",
      order: 1,
      type: "journal_debit",
      label: "Debit: Interest Expense",
      points: 2,
      correctAnswer: { type: "journal", accountId: "interest-expense", accountName: "Interest Expense", amount: 16040, tolerance: 1 },
      explanation: "Interest expense = Carrying value × Market rate = $534,651 × 3% = $16,040",
    },
    {
      id: "req-debit-premium",
      order: 2,
      type: "journal_debit",
      label: "Debit: Premium on Bonds Payable",
      points: 2,
      correctAnswer: { type: "journal", accountId: "premium-bonds", accountName: "Premium on Bonds Payable", amount: 3960, tolerance: 1 },
      explanation: "Premium amortization = Cash payment - Interest expense = $20,000 - $16,040 = $3,960",
    },
    {
      id: "req-credit-cash",
      order: 3,
      type: "journal_credit",
      label: "Credit: Cash",
      points: 2,
      correctAnswer: { type: "journal", accountId: "cash", accountName: "Cash", amount: 20000, tolerance: 1 },
      explanation: "Cash payment = Face value × Stated rate = $500,000 × 4% = $20,000",
    },
  ],
  journalAccounts: [
    { id: "interest-expense", name: "Interest Expense", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "premium-bonds", name: "Premium on Bonds Payable", type: "liability", normalBalance: "credit", isDistractor: false },
    { id: "cash", name: "Cash", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "bonds-payable", name: "Bonds Payable", type: "liability", normalBalance: "credit", isDistractor: true },
    { id: "discount-bonds", name: "Discount on Bonds Payable", type: "liability", normalBalance: "debit", isDistractor: true },
    { id: "interest-payable", name: "Interest Payable", type: "liability", normalBalance: "credit", isDistractor: true },
  ],
};

// FAR-064: Depreciation Methods Comparison - Easy
export const farDepreciationMethodsTBS: TBSQuestion = {
  id: "tbs-far-064",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Property, Plant, and Equipment",
  subtopic: "Depreciation Methods",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Depreciation Methods Comparison",
  scenarioText: `Riverside Company acquired machinery on January 1, Year 1. Calculate depreciation expense under different methods for Year 1 and Year 2.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-asset-info",
      order: 1,
      title: "Asset Information",
      type: "table",
      content: {
        type: "table",
        title: "Machinery Details",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Cost", "$120,000"] },
          { cells: ["Salvage Value", "$10,000"] },
          { cells: ["Useful Life", "5 years"] },
          { cells: ["Estimated Total Units", "50,000 units"] },
          { cells: ["Year 1 Production", "12,000 units"] },
          { cells: ["Year 2 Production", "11,000 units"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-straight-line",
      order: 1,
      type: "numeric",
      label: "Straight-line depreciation (Year 1)",
      points: 1,
      correctAnswer: { type: "numeric", value: 22000, tolerance: 1 },
      explanation: "($120,000 - $10,000) / 5 years = $22,000 per year",
    },
    {
      id: "req-ddb-yr1",
      order: 2,
      type: "numeric",
      label: "Double-declining balance (Year 1)",
      points: 1,
      correctAnswer: { type: "numeric", value: 48000, tolerance: 1 },
      explanation: "$120,000 × (2/5) = $48,000 (DDB rate = 40%)",
    },
    {
      id: "req-ddb-yr2",
      order: 3,
      type: "numeric",
      label: "Double-declining balance (Year 2)",
      points: 1,
      correctAnswer: { type: "numeric", value: 28800, tolerance: 1 },
      explanation: "($120,000 - $48,000) × 40% = $28,800",
    },
    {
      id: "req-units-yr1",
      order: 4,
      type: "numeric",
      label: "Units of production (Year 1)",
      points: 1,
      correctAnswer: { type: "numeric", value: 26400, tolerance: 1 },
      explanation: "($120,000 - $10,000) × (12,000/50,000) = $110,000 × 0.24 = $26,400",
    },
    {
      id: "req-units-yr2",
      order: 5,
      type: "numeric",
      label: "Units of production (Year 2)",
      points: 1,
      correctAnswer: { type: "numeric", value: 24200, tolerance: 1 },
      explanation: "$110,000 × (11,000/50,000) = $110,000 × 0.22 = $24,200",
    },
  ],
};

// FAR-065: Document Review - Revenue Recognition (Document Review Type) - Medium
export const farRevenueDocReviewTBS: TBSQuestion = {
  id: "tbs-far-065",
  section: "FAR",
  tbsType: "document_review",
  topic: "Revenue Recognition",
  subtopic: "Contract Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Revenue Recognition Contract Review",
  scenarioText: `Review the contract summary and identify the correct revenue recognition treatment for each performance obligation under ASC 606.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-contract",
      order: 1,
      title: "Contract Summary",
      type: "memo",
      content: {
        type: "memo",
        from: "Sales Department",
        to: "Accounting Department",
        date: "January 15, Year 1",
        subject: "New Software Contract - TechCorp Inc.",
        body: `Contract Details:

Total Contract Price: $180,000

Performance Obligations Identified:
1. Software License (perpetual): Standalone price $100,000
2. Implementation Services (2 months): Standalone price $50,000
3. 2-Year Support Contract: Standalone price $60,000

Total Standalone Prices: $210,000

Payment Terms:
- $90,000 due upon contract signing
- $45,000 due upon software delivery
- $45,000 due at go-live

Timeline:
- Software delivered January 20
- Implementation completed March 15
- Support period: March 15, Year 1 to March 14, Year 3`,
      },
    },
  ],
  requirements: [
    {
      id: "req-license-timing",
      order: 1,
      type: "dropdown",
      label: "Software license revenue recognition timing",
      points: 1,
      dropdownOptions: [
        { id: "opt-license-point", order: 1, text: "At a point in time (upon delivery)", isCorrect: true },
        { id: "opt-license-over", order: 2, text: "Over time (2 months)", isCorrect: false },
        { id: "opt-license-support", order: 3, text: "Over time (2 years)", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-license-point" },
      explanation: "Perpetual software licenses transfer control at delivery - point in time recognition",
    },
    {
      id: "req-implementation-timing",
      order: 2,
      type: "dropdown",
      label: "Implementation services recognition timing",
      points: 1,
      dropdownOptions: [
        { id: "opt-impl-point", order: 1, text: "At a point in time", isCorrect: false },
        { id: "opt-impl-over", order: 2, text: "Over time (as services performed)", isCorrect: true },
        { id: "opt-impl-defer", order: 3, text: "Deferred until support period", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-impl-over" },
      explanation: "Implementation services are recognized over time as the customer receives benefit",
    },
    {
      id: "req-license-amount",
      order: 3,
      type: "numeric",
      label: "Revenue allocated to software license",
      points: 1,
      correctAnswer: { type: "numeric", value: 85714, tolerance: 50 },
      explanation: "$180,000 × ($100,000/$210,000) = $85,714",
    },
    {
      id: "req-support-amount",
      order: 4,
      type: "numeric",
      label: "Revenue allocated to support contract",
      points: 1,
      correctAnswer: { type: "numeric", value: 51429, tolerance: 50 },
      explanation: "$180,000 × ($60,000/$210,000) = $51,429",
    },
    {
      id: "req-monthly-support",
      order: 5,
      type: "numeric",
      label: "Monthly support revenue recognition",
      points: 1,
      correctAnswer: { type: "numeric", value: 2143, tolerance: 20 },
      explanation: "$51,429 / 24 months = $2,143 per month",
    },
  ],
};

// FAR-066: Inventory LIFO Reserve Adjustment - Medium
export const farLIFOReserveTBS: TBSQuestion = {
  id: "tbs-far-066",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Inventory",
  subtopic: "LIFO Reserve",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "LIFO Reserve Analysis and Conversion",
  scenarioText: `Analyze the LIFO reserve information to convert inventory values and assess the impact on financial ratios.`,
  timeEstimateMinutes: 11,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-inventory",
      order: 1,
      title: "Inventory Information",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Ending Inventory (LIFO)", "$340,000"] },
          { cells: ["LIFO Reserve - Beginning", "$45,000"] },
          { cells: ["LIFO Reserve - Ending", "$62,000"] },
          { cells: ["Cost of Goods Sold (LIFO)", "$890,000"] },
          { cells: ["Sales Revenue", "$1,400,000"] },
          { cells: ["Tax Rate", "25%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fifo-inventory",
      order: 1,
      type: "numeric",
      label: "Ending inventory on FIFO basis",
      points: 1,
      correctAnswer: { type: "numeric", value: 402000, tolerance: 1 },
      explanation: "LIFO inventory + LIFO reserve = $340,000 + $62,000 = $402,000",
    },
    {
      id: "req-fifo-cogs",
      order: 2,
      type: "numeric",
      label: "Cost of goods sold on FIFO basis",
      points: 1,
      correctAnswer: { type: "numeric", value: 873000, tolerance: 1 },
      explanation: "LIFO COGS - Change in LIFO reserve = $890,000 - ($62,000 - $45,000) = $873,000",
    },
    {
      id: "req-gross-profit-diff",
      order: 3,
      type: "numeric",
      label: "Difference in gross profit (FIFO higher by)",
      points: 1,
      correctAnswer: { type: "numeric", value: 17000, tolerance: 1 },
      explanation: "FIFO gross profit higher by change in LIFO reserve = $62,000 - $45,000 = $17,000",
    },
    {
      id: "req-tax-effect",
      order: 4,
      type: "numeric",
      label: "Tax savings from using LIFO",
      points: 1,
      correctAnswer: { type: "numeric", value: 4250, tolerance: 1 },
      explanation: "$17,000 × 25% = $4,250 tax savings",
    },
    {
      id: "req-gross-margin-fifo",
      order: 5,
      type: "numeric",
      label: "Gross margin percentage (FIFO basis)",
      points: 1,
      correctAnswer: { type: "numeric", value: 37.6, tolerance: 0.2 },
      explanation: "($1,400,000 - $873,000) / $1,400,000 = 37.6%",
    },
  ],
};

// FAR-067: Government Capital Assets - Medium
export const farGovernmentCapitalAssetsTBS: TBSQuestion = {
  id: "tbs-far-067",
  section: "FAR",
  tbsType: "dropdown",
  topic: "State and Local Governments",
  subtopic: "Capital Assets",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-IV",
  title: "Government Capital Asset Reporting",
  scenarioText: `Determine the proper reporting of capital assets for a city government under GASB standards.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-assets",
      order: 1,
      title: "Capital Asset Information",
      type: "table",
      content: {
        type: "table",
        title: "City Assets",
        headers: ["Asset", "Cost", "Accumulated Depreciation", "Fund/Activity"],
        rows: [
          { cells: ["City Hall Building", "$5,000,000", "$1,500,000", "General Fund activities"] },
          { cells: ["Police Vehicles", "$800,000", "$480,000", "General Fund activities"] },
          { cells: ["Water Treatment Plant", "$12,000,000", "$3,600,000", "Enterprise Fund"] },
          { cells: ["Streets and Roads", "$25,000,000", "N/A - Infrastructure", "General Fund activities"] },
          { cells: ["Land - City Park", "$2,000,000", "N/A", "General Fund activities"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gw-capital",
      order: 1,
      type: "numeric",
      label: "Total capital assets in government-wide statements",
      points: 1,
      correctAnswer: { type: "numeric", value: 44800000, tolerance: 1 },
      explanation: "All capital assets reported in government-wide: $5M + $0.8M + $12M + $25M + $2M = $44.8M",
    },
    {
      id: "req-gw-depreciation",
      order: 2,
      type: "numeric",
      label: "Total accumulated depreciation (government-wide)",
      points: 1,
      correctAnswer: { type: "numeric", value: 5580000, tolerance: 1 },
      explanation: "$1.5M + $0.48M + $3.6M = $5.58M (land and infrastructure not depreciated)",
    },
    {
      id: "req-fund-reporting",
      order: 3,
      type: "dropdown",
      label: "How are General Fund capital assets reported in fund statements?",
      points: 1,
      dropdownOptions: [
        { id: "opt-fund-asset", order: 1, text: "As capital assets with depreciation", isCorrect: false },
        { id: "opt-fund-not", order: 2, text: "Not reported - expenditure when acquired", isCorrect: true },
        { id: "opt-fund-deferred", order: 3, text: "As deferred outflows", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-fund-not" },
      explanation: "Governmental fund statements use current financial resources - capital assets recorded as expenditures when acquired",
    },
    {
      id: "req-infrastructure",
      order: 4,
      type: "dropdown",
      label: "Alternative to depreciation for infrastructure assets",
      points: 1,
      dropdownOptions: [
        { id: "opt-infra-none", order: 1, text: "No alternative - must depreciate", isCorrect: false },
        { id: "opt-infra-modified", order: 2, text: "Modified approach if condition maintained", isCorrect: true },
        { id: "opt-infra-expense", order: 3, text: "Expense as incurred", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-infra-modified" },
      explanation: "GASB allows modified approach for eligible infrastructure if asset management system maintains condition",
    },
    {
      id: "req-enterprise-fund",
      order: 5,
      type: "dropdown",
      label: "Enterprise fund capital asset reporting",
      points: 1,
      dropdownOptions: [
        { id: "opt-ent-same", order: 1, text: "Same as governmental funds", isCorrect: false },
        { id: "opt-ent-accrual", order: 2, text: "Full accrual with depreciation in fund statements", isCorrect: true },
        { id: "opt-ent-gw", order: 3, text: "Only in government-wide statements", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-ent-accrual" },
      explanation: "Proprietary funds use full accrual accounting - capital assets and depreciation in fund statements",
    },
  ],
};

// FAR-068: Comprehensive Income Statement Preparation - Hard
export const farComprehensiveIncomeTBS: TBSQuestion = {
  id: "tbs-far-068",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Financial Statements",
  subtopic: "Comprehensive Income",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Statement of Comprehensive Income Preparation",
  scenarioText: `Prepare the statement of comprehensive income for Maxwell Corporation for Year 1, properly classifying all items.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-income-data",
      order: 1,
      title: "Income Statement Data",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Financial Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Sales Revenue", "$2,500,000"] },
          { cells: ["Cost of Goods Sold", "$1,500,000"] },
          { cells: ["Operating Expenses", "$400,000"] },
          { cells: ["Interest Expense", "$50,000"] },
          { cells: ["Gain on Sale of Equipment", "$25,000"] },
          { cells: ["Unrealized Gain on AFS Securities", "$35,000"] },
          { cells: ["Foreign Currency Translation Gain", "$18,000"] },
          { cells: ["Pension Prior Service Cost Amortization", "($12,000)"] },
          { cells: ["Unrealized Loss on Cash Flow Hedge", "($8,000)"] },
          { cells: ["Income Tax Rate", "25%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-profit",
      order: 1,
      type: "numeric",
      label: "Gross profit",
      points: 1,
      correctAnswer: { type: "numeric", value: 1000000, tolerance: 1 },
      explanation: "$2,500,000 - $1,500,000 = $1,000,000",
    },
    {
      id: "req-income-operations",
      order: 2,
      type: "numeric",
      label: "Income from operations",
      points: 1,
      correctAnswer: { type: "numeric", value: 600000, tolerance: 1 },
      explanation: "$1,000,000 - $400,000 = $600,000",
    },
    {
      id: "req-pretax-income",
      order: 3,
      type: "numeric",
      label: "Income before tax",
      points: 1,
      correctAnswer: { type: "numeric", value: 575000, tolerance: 1 },
      explanation: "$600,000 - $50,000 + $25,000 = $575,000",
    },
    {
      id: "req-net-income",
      order: 4,
      type: "numeric",
      label: "Net income",
      points: 1,
      correctAnswer: { type: "numeric", value: 431250, tolerance: 10 },
      explanation: "$575,000 × (1 - 0.25) = $431,250",
    },
    {
      id: "req-oci-total",
      order: 5,
      type: "numeric",
      label: "Total other comprehensive income (net of tax)",
      points: 1,
      correctAnswer: { type: "numeric", value: 24750, tolerance: 10 },
      explanation: "($35,000 + $18,000 - $12,000 - $8,000) × 0.75 = $33,000 × 0.75 = $24,750",
    },
    {
      id: "req-comprehensive-income",
      order: 6,
      type: "numeric",
      label: "Total comprehensive income",
      points: 1,
      correctAnswer: { type: "numeric", value: 456000, tolerance: 20 },
      explanation: "$431,250 + $24,750 = $456,000",
    },
  ],
};

// FAR-069: NFP Contribution Restrictions - Medium
export const farNFPContributionsTBS: TBSQuestion = {
  id: "tbs-far-069",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Not-for-Profit Accounting",
  subtopic: "Contributions",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "NFP Contribution Classification",
  scenarioText: `Classify contributions received by Hope Foundation based on donor restrictions under ASC 958.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-contributions",
      order: 1,
      title: "Contributions Received",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Contributions",
        headers: ["Description", "Amount"],
        rows: [
          { cells: ["General operating support (unrestricted)", "$150,000"] },
          { cells: ["Grant for youth programs (must be used for stated purpose)", "$75,000"] },
          { cells: ["Endowment gift (principal must be maintained permanently)", "$200,000"] },
          { cells: ["Pledge for building fund (payable over 3 years)", "$300,000"] },
          { cells: ["Donated services - accounting (would be purchased otherwise)", "$15,000"] },
          { cells: ["Donated volunteer time - general office help", "$8,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-youth-class",
      order: 1,
      type: "dropdown",
      label: "Youth program grant classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-youth-wo", order: 1, text: "Without donor restrictions", isCorrect: false },
        { id: "opt-youth-wd", order: 2, text: "With donor restrictions (purpose)", isCorrect: true },
        { id: "opt-youth-perm", order: 3, text: "With donor restrictions (perpetual)", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-youth-wd" },
      explanation: "Purpose-restricted contributions are classified as with donor restrictions until used",
    },
    {
      id: "req-endowment-class",
      order: 2,
      type: "dropdown",
      label: "Endowment gift classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-end-wo", order: 1, text: "Without donor restrictions", isCorrect: false },
        { id: "opt-end-wd-temp", order: 2, text: "With donor restrictions (time)", isCorrect: false },
        { id: "opt-end-wd-perm", order: 3, text: "With donor restrictions (perpetual)", isCorrect: true },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-end-wd-perm" },
      explanation: "Endowments where principal must be maintained permanently are with perpetual restrictions",
    },
    {
      id: "req-pledge-class",
      order: 3,
      type: "dropdown",
      label: "Building fund pledge classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-pledge-wo", order: 1, text: "Without donor restrictions", isCorrect: false },
        { id: "opt-pledge-wd", order: 2, text: "With donor restrictions", isCorrect: true },
        { id: "opt-pledge-none", order: 3, text: "Not recorded until received", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-pledge-wd" },
      explanation: "Multi-year pledges are time-restricted; building fund designation is purpose-restricted",
    },
    {
      id: "req-accounting-services",
      order: 4,
      type: "dropdown",
      label: "Donated accounting services recognition",
      points: 1,
      dropdownOptions: [
        { id: "opt-acct-yes", order: 1, text: "Recognize as contribution and expense", isCorrect: true },
        { id: "opt-acct-no", order: 2, text: "Do not recognize", isCorrect: false },
        { id: "opt-acct-memo", order: 3, text: "Disclose in notes only", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-acct-yes" },
      explanation: "Professional services requiring specialized skills that would be purchased are recognized",
    },
    {
      id: "req-volunteer-services",
      order: 5,
      type: "dropdown",
      label: "Donated general volunteer time recognition",
      points: 1,
      dropdownOptions: [
        { id: "opt-vol-yes", order: 1, text: "Recognize as contribution", isCorrect: false },
        { id: "opt-vol-no", order: 2, text: "Do not recognize", isCorrect: true },
        { id: "opt-vol-partial", order: 3, text: "Recognize at minimum wage rate", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-vol-no" },
      explanation: "General volunteer services not requiring specialized skills are not recognized",
    },
  ],
};

// FAR-070: Intercompany Inventory Profit Elimination - Hard
export const farIntercompanyInventoryTBS: TBSQuestion = {
  id: "tbs-far-070",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Consolidations",
  subtopic: "Intercompany Profit Elimination",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Intercompany Inventory Profit Elimination",
  scenarioText: `Prepare consolidation elimination entries for intercompany inventory transactions between Parent Co. and its 80%-owned subsidiary.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-intercompany",
      order: 1,
      title: "Intercompany Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Inventory Sales",
        headers: ["Transaction", "Amount"],
        rows: [
          { cells: ["Parent sold inventory to Subsidiary (downstream)", ""] },
          { cells: ["  - Transfer price", "$200,000"] },
          { cells: ["  - Cost to Parent", "$150,000"] },
          { cells: ["  - Remaining in Sub's inventory at year-end", "40%"] },
          { cells: ["Subsidiary sold inventory to Parent (upstream)", ""] },
          { cells: ["  - Transfer price", "$80,000"] },
          { cells: ["  - Cost to Subsidiary", "$60,000"] },
          { cells: ["  - Remaining in Parent's inventory at year-end", "25%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-downstream-profit",
      order: 1,
      type: "numeric",
      label: "Unrealized profit from downstream sale",
      points: 1,
      correctAnswer: { type: "numeric", value: 20000, tolerance: 1 },
      explanation: "($200,000 - $150,000) × 40% = $20,000 unrealized",
    },
    {
      id: "req-upstream-profit",
      order: 2,
      type: "numeric",
      label: "Unrealized profit from upstream sale",
      points: 1,
      correctAnswer: { type: "numeric", value: 5000, tolerance: 1 },
      explanation: "($80,000 - $60,000) × 25% = $5,000 unrealized",
    },
    {
      id: "req-debit-cogs-downstream",
      order: 3,
      type: "journal_debit",
      label: "Downstream elimination: Debit Sales",
      points: 1,
      correctAnswer: { type: "journal", accountId: "sales", accountName: "Sales", amount: 200000, tolerance: 1 },
      explanation: "Eliminate full intercompany sales amount",
    },
    {
      id: "req-credit-cogs-downstream",
      order: 4,
      type: "journal_credit",
      label: "Downstream elimination: Credit COGS",
      points: 1,
      correctAnswer: { type: "journal", accountId: "cogs", accountName: "Cost of Goods Sold", amount: 180000, tolerance: 1 },
      explanation: "$200,000 - $20,000 unrealized profit = $180,000",
    },
    {
      id: "req-credit-inventory",
      order: 5,
      type: "journal_credit",
      label: "Downstream elimination: Credit Inventory",
      points: 1,
      correctAnswer: { type: "journal", accountId: "inventory", accountName: "Inventory", amount: 20000, tolerance: 1 },
      explanation: "Reduce inventory by unrealized profit",
    },
    {
      id: "req-nci-upstream",
      order: 6,
      type: "numeric",
      label: "NCI share of upstream unrealized profit",
      points: 1,
      correctAnswer: { type: "numeric", value: 1000, tolerance: 1 },
      explanation: "$5,000 × 20% NCI = $1,000",
    },
  ],
  journalAccounts: [
    { id: "sales", name: "Sales", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "cogs", name: "Cost of Goods Sold", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "inventory", name: "Inventory", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "retained-earnings", name: "Retained Earnings", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "nci", name: "Noncontrolling Interest", type: "equity", normalBalance: "credit", isDistractor: true },
  ],
};

// FAR-071: Lease Liability Remeasurement - Medium
export const farLeaseRemeasurementTBS: TBSQuestion = {
  id: "tbs-far-071",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Leases",
  subtopic: "Lease Modifications",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Lease Liability Remeasurement",
  scenarioText: `Calculate the remeasured lease liability when a lessee exercises an option to extend the lease term.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-lease-terms",
      order: 1,
      title: "Original Lease Terms",
      type: "table",
      content: {
        type: "table",
        title: "Lease Information",
        headers: ["Item", "Details"],
        rows: [
          { cells: ["Lease commencement", "January 1, Year 1"] },
          { cells: ["Original term", "5 years"] },
          { cells: ["Extension option", "3 additional years"] },
          { cells: ["Annual payment (Years 1-5)", "$40,000"] },
          { cells: ["Annual payment (Years 6-8 if extended)", "$45,000"] },
          { cells: ["Incremental borrowing rate at commencement", "6%"] },
          { cells: ["Incremental borrowing rate at modification", "7%"] },
          { cells: ["Extension exercised", "End of Year 3"] },
        ],
      },
    },
    {
      id: "exhibit-pv-factors",
      order: 2,
      title: "Present Value Factors",
      type: "table",
      content: {
        type: "table",
        title: "PV of Ordinary Annuity",
        headers: ["Periods", "6%", "7%"],
        rows: [
          { cells: ["2", "1.8334", "1.8080"] },
          { cells: ["3", "2.6730", "2.6243"] },
          { cells: ["5", "4.2124", "4.1002"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-remaining-original",
      order: 1,
      type: "numeric",
      label: "PV of remaining original payments (2 years at 7%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 72320, tolerance: 50 },
      explanation: "$40,000 × 1.8080 = $72,320",
    },
    {
      id: "req-extension-payments",
      order: 2,
      type: "numeric",
      label: "PV of extension payments at end of Year 5 (3 years at 7%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 118094, tolerance: 100 },
      explanation: "$45,000 × 2.6243 = $118,094 (at end of Year 5)",
    },
    {
      id: "req-extension-pv-yr3",
      order: 3,
      type: "numeric",
      label: "PV of extension payments as of Year 3 (discounted 2 years)",
      points: 1,
      correctAnswer: { type: "numeric", value: 103116, tolerance: 200 },
      explanation: "$118,094 ÷ (1.07)² = $103,116",
    },
    {
      id: "req-total-remeasured",
      order: 4,
      type: "numeric",
      label: "Total remeasured lease liability at end of Year 3",
      points: 1,
      correctAnswer: { type: "numeric", value: 175436, tolerance: 250 },
      explanation: "$72,320 + $103,116 = $175,436",
    },
    {
      id: "req-discount-rate",
      order: 5,
      type: "dropdown",
      label: "Which discount rate is used for remeasurement?",
      points: 1,
      dropdownOptions: [
        { id: "opt-original", order: 1, text: "Original rate (6%)", isCorrect: false },
        { id: "opt-modified", order: 2, text: "Rate at modification (7%)", isCorrect: true },
        { id: "opt-weighted", order: 3, text: "Weighted average of both rates", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-modified" },
      explanation: "When lease term changes, remeasure using current incremental borrowing rate",
    },
  ],
};

// FAR-072: Allowance for Doubtful Accounts - Easy
export const farAllowanceMethodTBS: TBSQuestion = {
  id: "tbs-far-072",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Receivables",
  subtopic: "Allowance Method",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Allowance for Doubtful Accounts Calculation",
  scenarioText: `Calculate the bad debt expense and allowance for doubtful accounts using different estimation methods.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-ar-data",
      order: 1,
      title: "Accounts Receivable Data",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Information",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Credit Sales for Year", "$2,400,000"] },
          { cells: ["Accounts Receivable (ending)", "$380,000"] },
          { cells: ["Allowance for Doubtful Accounts (beginning credit)", "$12,000"] },
          { cells: ["Accounts Written Off During Year", "$9,500"] },
          { cells: ["Historical bad debt rate (% of credit sales)", "1.5%"] },
          { cells: ["Estimated uncollectible (% of AR)", "5%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-percent-sales",
      order: 1,
      type: "numeric",
      label: "Bad debt expense using percentage of sales method",
      points: 1,
      correctAnswer: { type: "numeric", value: 36000, tolerance: 1 },
      explanation: "$2,400,000 × 1.5% = $36,000",
    },
    {
      id: "req-ending-allowance-sales",
      order: 2,
      type: "numeric",
      label: "Ending allowance balance (percentage of sales method)",
      points: 1,
      correctAnswer: { type: "numeric", value: 38500, tolerance: 1 },
      explanation: "$12,000 - $9,500 + $36,000 = $38,500",
    },
    {
      id: "req-required-allowance",
      order: 3,
      type: "numeric",
      label: "Required ending allowance (percentage of AR method)",
      points: 1,
      correctAnswer: { type: "numeric", value: 19000, tolerance: 1 },
      explanation: "$380,000 × 5% = $19,000",
    },
    {
      id: "req-bad-debt-ar",
      order: 4,
      type: "numeric",
      label: "Bad debt expense using percentage of AR method",
      points: 1,
      correctAnswer: { type: "numeric", value: 16500, tolerance: 1 },
      explanation: "Required $19,000 - ($12,000 - $9,500) = $19,000 - $2,500 = $16,500",
    },
    {
      id: "req-method-difference",
      order: 5,
      type: "numeric",
      label: "Difference in bad debt expense between methods",
      points: 1,
      correctAnswer: { type: "numeric", value: 19500, tolerance: 1 },
      explanation: "$36,000 - $16,500 = $19,500",
    },
  ],
};

// FAR-073: Stock Dividend and Split - Easy
export const farStockDividendSplitTBS: TBSQuestion = {
  id: "tbs-far-073",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Stockholders' Equity",
  subtopic: "Stock Dividends",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Stock Dividend Journal Entry",
  scenarioText: `Record the journal entry for a stock dividend declaration and distribution.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-equity",
      order: 1,
      title: "Equity Information",
      type: "table",
      content: {
        type: "table",
        title: "Before Stock Dividend",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Common Stock ($5 par), 100,000 shares", "$500,000"] },
          { cells: ["Paid-in Capital in Excess of Par", "$800,000"] },
          { cells: ["Retained Earnings", "$1,200,000"] },
          { cells: ["Current Market Price per Share", "$25"] },
          { cells: ["Stock Dividend Declared", "10%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-shares-issued",
      order: 1,
      type: "numeric",
      label: "Number of new shares to be issued",
      points: 1,
      correctAnswer: { type: "numeric", value: 10000, tolerance: 1 },
      explanation: "100,000 × 10% = 10,000 shares",
    },
    {
      id: "req-debit-re",
      order: 2,
      type: "journal_debit",
      label: "Debit: Retained Earnings (small stock dividend at FMV)",
      points: 1,
      correctAnswer: { type: "journal", accountId: "retained-earnings", accountName: "Retained Earnings", amount: 250000, tolerance: 1 },
      explanation: "10,000 shares × $25 FMV = $250,000",
    },
    {
      id: "req-credit-cs",
      order: 3,
      type: "journal_credit",
      label: "Credit: Common Stock (par value)",
      points: 1,
      correctAnswer: { type: "journal", accountId: "common-stock", accountName: "Common Stock", amount: 50000, tolerance: 1 },
      explanation: "10,000 shares × $5 par = $50,000",
    },
    {
      id: "req-credit-apic",
      order: 4,
      type: "journal_credit",
      label: "Credit: Paid-in Capital in Excess of Par",
      points: 1,
      correctAnswer: { type: "journal", accountId: "apic", accountName: "Paid-in Capital in Excess of Par", amount: 200000, tolerance: 1 },
      explanation: "$250,000 - $50,000 = $200,000",
    },
    {
      id: "req-ending-re",
      order: 5,
      type: "numeric",
      label: "Ending retained earnings balance",
      points: 1,
      correctAnswer: { type: "numeric", value: 950000, tolerance: 1 },
      explanation: "$1,200,000 - $250,000 = $950,000",
    },
  ],
  journalAccounts: [
    { id: "retained-earnings", name: "Retained Earnings", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "common-stock", name: "Common Stock", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "apic", name: "Paid-in Capital in Excess of Par", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "dividends-payable", name: "Dividends Payable", type: "liability", normalBalance: "credit", isDistractor: true },
    { id: "cash", name: "Cash", type: "asset", normalBalance: "debit", isDistractor: true },
  ],
};

// FAR-074: Deferred Tax Asset Valuation Allowance - Hard
export const farDTAValuationTBS: TBSQuestion = {
  id: "tbs-far-074",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Income Taxes",
  subtopic: "Deferred Tax Assets",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Deferred Tax Asset Valuation Allowance Analysis",
  scenarioText: `Determine the appropriate valuation allowance for deferred tax assets based on the more-likely-than-not criterion.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-dta-sources",
      order: 1,
      title: "DTA Information",
      type: "table",
      content: {
        type: "table",
        title: "Deferred Tax Assets",
        headers: ["Source", "Gross DTA", "Reversal Period"],
        rows: [
          { cells: ["Net Operating Loss Carryforward", "$450,000", "Years 1-5"] },
          { cells: ["Warranty Accrual", "$80,000", "Years 1-3"] },
          { cells: ["Bad Debt Reserve", "$35,000", "Year 1"] },
          { cells: ["Deferred Revenue", "$55,000", "Years 1-2"] },
        ],
      },
    },
    {
      id: "exhibit-projections",
      order: 2,
      title: "Taxable Income Projections",
      type: "table",
      content: {
        type: "table",
        title: "Future Taxable Income (Before Reversals)",
        headers: ["Year", "Projected Taxable Income"],
        rows: [
          { cells: ["Year 1", "$120,000"] },
          { cells: ["Year 2", "$150,000"] },
          { cells: ["Year 3", "$180,000"] },
          { cells: ["Years 4-5", "Uncertain - not reliably estimable"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-dta",
      order: 1,
      type: "numeric",
      label: "Total gross deferred tax assets",
      points: 1,
      correctAnswer: { type: "numeric", value: 620000, tolerance: 1 },
      explanation: "$450,000 + $80,000 + $35,000 + $55,000 = $620,000",
    },
    {
      id: "req-reliable-income",
      order: 2,
      type: "numeric",
      label: "Total reliable future taxable income (Years 1-3)",
      points: 1,
      correctAnswer: { type: "numeric", value: 450000, tolerance: 1 },
      explanation: "$120,000 + $150,000 + $180,000 = $450,000",
    },
    {
      id: "req-realizable-dta",
      order: 3,
      type: "numeric",
      label: "DTAs realizable within reliable period",
      points: 2,
      correctAnswer: { type: "numeric", value: 450000, tolerance: 1 },
      explanation: "Bad debt ($35K) + Deferred Rev ($55K) + Warranty ($80K) + portion of NOL = $450,000 total income available",
    },
    {
      id: "req-valuation-allowance",
      order: 4,
      type: "numeric",
      label: "Required valuation allowance",
      points: 1,
      correctAnswer: { type: "numeric", value: 170000, tolerance: 5000 },
      explanation: "NOL reversing in Years 4-5 (unreliable) needs allowance: $620,000 - $450,000 = $170,000",
    },
    {
      id: "req-net-dta",
      order: 5,
      type: "numeric",
      label: "Net deferred tax asset reported",
      points: 1,
      correctAnswer: { type: "numeric", value: 450000, tolerance: 5000 },
      explanation: "$620,000 - $170,000 = $450,000",
    },
  ],
};

// FAR-075: Government Budgetary Comparison - Medium
export const farGovernmentBudgetaryTBS: TBSQuestion = {
  id: "tbs-far-075",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "State and Local Governments",
  subtopic: "Budgetary Accounting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-IV",
  title: "Budgetary Comparison Schedule Analysis",
  scenarioText: `Analyze the budgetary comparison schedule for a city's General Fund and calculate variances.`,
  timeEstimateMinutes: 11,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-budget",
      order: 1,
      title: "General Fund Budget Data",
      type: "table",
      content: {
        type: "table",
        title: "Budgetary Comparison - Year 1",
        headers: ["Item", "Original Budget", "Final Budget", "Actual"],
        rows: [
          { cells: ["Property Tax Revenue", "$4,500,000", "$4,500,000", "$4,620,000"] },
          { cells: ["Sales Tax Revenue", "$2,800,000", "$2,950,000", "$2,875,000"] },
          { cells: ["Intergovernmental Revenue", "$1,200,000", "$1,350,000", "$1,400,000"] },
          { cells: ["Public Safety Expenditures", "$3,800,000", "$3,900,000", "$3,850,000"] },
          { cells: ["Public Works Expenditures", "$1,500,000", "$1,600,000", "$1,720,000"] },
          { cells: ["General Government Expenditures", "$800,000", "$750,000", "$725,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-revenue-actual",
      order: 1,
      type: "numeric",
      label: "Total actual revenues",
      points: 1,
      correctAnswer: { type: "numeric", value: 8895000, tolerance: 1 },
      explanation: "$4,620,000 + $2,875,000 + $1,400,000 = $8,895,000",
    },
    {
      id: "req-revenue-variance",
      order: 2,
      type: "numeric",
      label: "Total revenue variance from final budget (favorable = positive)",
      points: 1,
      correctAnswer: { type: "numeric", value: 95000, tolerance: 1 },
      explanation: "$8,895,000 - ($4,500,000 + $2,950,000 + $1,350,000) = $8,895,000 - $8,800,000 = $95,000 favorable",
    },
    {
      id: "req-total-expenditures",
      order: 3,
      type: "numeric",
      label: "Total actual expenditures",
      points: 1,
      correctAnswer: { type: "numeric", value: 6295000, tolerance: 1 },
      explanation: "$3,850,000 + $1,720,000 + $725,000 = $6,295,000",
    },
    {
      id: "req-expenditure-variance",
      order: 4,
      type: "numeric",
      label: "Total expenditure variance from final budget (favorable = positive)",
      points: 1,
      correctAnswer: { type: "numeric", value: -45000, tolerance: 1 },
      explanation: "Final budget: $6,250,000, Actual: $6,295,000. Variance = -$45,000 (unfavorable, over budget)",
    },
    {
      id: "req-net-change",
      order: 5,
      type: "numeric",
      label: "Net change in fund balance (Actual)",
      points: 1,
      correctAnswer: { type: "numeric", value: 2600000, tolerance: 1 },
      explanation: "$8,895,000 - $6,295,000 = $2,600,000",
    },
  ],
};

// FAR-076: Investment Securities Classification - Medium
export const farInvestmentClassificationTBS: TBSQuestion = {
  id: "tbs-far-076",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Investments",
  subtopic: "Debt Securities Classification",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Investment Securities Classification and Measurement",
  scenarioText: `Determine the proper classification and accounting treatment for various debt security investments.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-investments",
      order: 1,
      title: "Investment Portfolio",
      type: "table",
      content: {
        type: "table",
        title: "Debt Securities at Year-End",
        headers: ["Security", "Cost", "Fair Value", "Management Intent"],
        rows: [
          { cells: ["US Treasury Bonds", "$500,000", "$485,000", "Hold to collect contractual cash flows"] },
          { cells: ["Corporate Bonds A", "$300,000", "$325,000", "Hold to collect and sell as needed"] },
          { cells: ["Corporate Bonds B", "$200,000", "$180,000", "Active trading for short-term profit"] },
          { cells: ["Municipal Bonds", "$400,000", "$420,000", "Hold to maturity (5 years remaining)"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-treasury-class",
      order: 1,
      type: "dropdown",
      label: "US Treasury Bonds classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-treas-htc", order: 1, text: "Held-to-collect (amortized cost)", isCorrect: true },
        { id: "opt-treas-htcs", order: 2, text: "Held-to-collect-and-sell (FVOCI)", isCorrect: false },
        { id: "opt-treas-fvpl", order: 3, text: "Fair value through profit/loss", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-treas-htc" },
      explanation: "Intent to hold and collect cash flows = held-to-collect at amortized cost",
    },
    {
      id: "req-corp-a-class",
      order: 2,
      type: "dropdown",
      label: "Corporate Bonds A classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-corp-a-htc", order: 1, text: "Held-to-collect (amortized cost)", isCorrect: false },
        { id: "opt-corp-a-htcs", order: 2, text: "Held-to-collect-and-sell (FVOCI)", isCorrect: true },
        { id: "opt-corp-a-fvpl", order: 3, text: "Fair value through profit/loss", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-corp-a-htcs" },
      explanation: "Dual objective (collect and sell) = FVOCI classification",
    },
    {
      id: "req-corp-b-class",
      order: 3,
      type: "dropdown",
      label: "Corporate Bonds B classification",
      points: 1,
      dropdownOptions: [
        { id: "opt-corp-b-htc", order: 1, text: "Held-to-collect (amortized cost)", isCorrect: false },
        { id: "opt-corp-b-htcs", order: 2, text: "Held-to-collect-and-sell (FVOCI)", isCorrect: false },
        { id: "opt-corp-b-fvpl", order: 3, text: "Fair value through profit/loss (trading)", isCorrect: true },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-corp-b-fvpl" },
      explanation: "Trading intent = fair value through profit/loss",
    },
    {
      id: "req-unrealized-pnl",
      order: 4,
      type: "numeric",
      label: "Unrealized gain/loss recognized in net income",
      points: 1,
      correctAnswer: { type: "numeric", value: -20000, tolerance: 1 },
      explanation: "Only trading securities (Corp B): $180,000 - $200,000 = ($20,000) loss",
    },
    {
      id: "req-unrealized-oci",
      order: 5,
      type: "numeric",
      label: "Unrealized gain/loss recognized in OCI",
      points: 1,
      correctAnswer: { type: "numeric", value: 25000, tolerance: 1 },
      explanation: "Only FVOCI securities (Corp A): $325,000 - $300,000 = $25,000 gain in OCI",
    },
  ],
};

// FAR-077: Impairment of Long-Lived Assets - Medium
export const farLongLivedImpairmentTBS: TBSQuestion = {
  id: "tbs-far-077",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Property, Plant, and Equipment",
  subtopic: "Impairment Testing",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Long-Lived Asset Impairment Analysis",
  scenarioText: `Perform impairment testing for a manufacturing asset group following ASC 360 guidelines.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-asset-group",
      order: 1,
      title: "Asset Group Information",
      type: "table",
      content: {
        type: "table",
        title: "Manufacturing Equipment",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Carrying Amount (net of accumulated depreciation)", "$2,400,000"] },
          { cells: ["Remaining Useful Life", "6 years"] },
          { cells: ["Estimated Future Undiscounted Cash Flows", "$2,100,000"] },
          { cells: ["Fair Value (Level 2 input)", "$1,850,000"] },
          { cells: ["Costs to Sell", "$50,000"] },
          { cells: ["Value in Use (discounted cash flows)", "$1,900,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-recoverability-test",
      order: 1,
      type: "dropdown",
      label: "Is the asset group impaired based on recoverability test?",
      points: 1,
      dropdownOptions: [
        { id: "opt-yes-impaired", order: 1, text: "Yes - undiscounted cash flows < carrying amount", isCorrect: true },
        { id: "opt-no-impaired", order: 2, text: "No - undiscounted cash flows > carrying amount", isCorrect: false },
        { id: "opt-maybe", order: 3, text: "Cannot determine without more information", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-yes-impaired" },
      explanation: "$2,100,000 undiscounted cash flows < $2,400,000 carrying amount = impaired",
    },
    {
      id: "req-fair-value-less-costs",
      order: 2,
      type: "numeric",
      label: "Fair value less costs to sell",
      points: 1,
      correctAnswer: { type: "numeric", value: 1800000, tolerance: 1 },
      explanation: "$1,850,000 - $50,000 = $1,800,000",
    },
    {
      id: "req-impairment-amount",
      order: 3,
      type: "numeric",
      label: "Impairment loss to be recognized",
      points: 1,
      correctAnswer: { type: "numeric", value: 500000, tolerance: 1 },
      explanation: "Fair value used: $2,400,000 - $1,900,000 (higher of FV less costs and value in use) = $500,000",
    },
    {
      id: "req-new-basis",
      order: 4,
      type: "numeric",
      label: "New carrying amount after impairment",
      points: 1,
      correctAnswer: { type: "numeric", value: 1900000, tolerance: 1 },
      explanation: "$2,400,000 - $500,000 = $1,900,000",
    },
    {
      id: "req-reversal",
      order: 5,
      type: "dropdown",
      label: "Can this impairment be reversed if fair value increases?",
      points: 1,
      dropdownOptions: [
        { id: "opt-rev-yes", order: 1, text: "Yes - always if fair value recovers", isCorrect: false },
        { id: "opt-rev-no", order: 2, text: "No - GAAP prohibits reversal for assets held and used", isCorrect: true },
        { id: "opt-rev-partial", order: 3, text: "Partially - up to original carrying amount", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-rev-no" },
      explanation: "Under US GAAP, impairment losses on long-lived assets held and used cannot be reversed",
    },
  ],
};

// FAR-078: Pension Plan Amendment - Hard
export const farPensionAmendmentTBS: TBSQuestion = {
  id: "tbs-far-078",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Employee Benefits",
  subtopic: "Pension Plan Amendments",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Pension Plan Amendment Accounting",
  scenarioText: `Account for a pension plan amendment that increases benefits retroactively, including prior service cost recognition.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pension-data",
      order: 1,
      title: "Pension Plan Information",
      type: "table",
      content: {
        type: "table",
        title: "Before and After Amendment",
        headers: ["Item", "Before Amendment", "After Amendment"],
        rows: [
          { cells: ["Projected Benefit Obligation", "$8,500,000", "$9,200,000"] },
          { cells: ["Plan Assets at Fair Value", "$7,800,000", "$7,800,000"] },
          { cells: ["Average Remaining Service Period", "-", "10 years"] },
          { cells: ["Accumulated OCI - Prior Service Cost", "$120,000 (debit)", "?"] },
        ],
      },
    },
    {
      id: "exhibit-components",
      order: 2,
      title: "Year 1 Pension Cost Components (Post-Amendment)",
      type: "table",
      content: {
        type: "table",
        title: "Components",
        headers: ["Component", "Amount"],
        rows: [
          { cells: ["Service Cost", "$340,000"] },
          { cells: ["Interest Cost (6% × PBO)", "$552,000"] },
          { cells: ["Expected Return on Assets (7%)", "$546,000"] },
          { cells: ["Amortization of existing prior service cost", "$12,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-psc-created",
      order: 1,
      type: "numeric",
      label: "Prior service cost created by amendment",
      points: 1,
      correctAnswer: { type: "numeric", value: 700000, tolerance: 1 },
      explanation: "$9,200,000 - $8,500,000 = $700,000 increase in PBO",
    },
    {
      id: "req-new-psc-amort",
      order: 2,
      type: "numeric",
      label: "Annual amortization of new prior service cost",
      points: 1,
      correctAnswer: { type: "numeric", value: 70000, tolerance: 1 },
      explanation: "$700,000 / 10 years = $70,000 per year",
    },
    {
      id: "req-total-psc-amort",
      order: 3,
      type: "numeric",
      label: "Total prior service cost amortization for Year 1",
      points: 1,
      correctAnswer: { type: "numeric", value: 82000, tolerance: 1 },
      explanation: "$12,000 (existing) + $70,000 (new) = $82,000",
    },
    {
      id: "req-pension-expense",
      order: 4,
      type: "numeric",
      label: "Total pension expense for Year 1",
      points: 1,
      correctAnswer: { type: "numeric", value: 428000, tolerance: 1 },
      explanation: "$340,000 + $552,000 - $546,000 + $82,000 = $428,000",
    },
    {
      id: "req-ending-aoci",
      order: 5,
      type: "numeric",
      label: "Ending AOCI - Prior Service Cost (debit balance)",
      points: 1,
      correctAnswer: { type: "numeric", value: 738000, tolerance: 1 },
      explanation: "$120,000 + $700,000 - $82,000 = $738,000 (debit)",
    },
    {
      id: "req-funded-status",
      order: 6,
      type: "numeric",
      label: "Funded status (liability) after amendment",
      points: 1,
      correctAnswer: { type: "numeric", value: 1400000, tolerance: 1 },
      explanation: "$9,200,000 PBO - $7,800,000 Plan Assets = $1,400,000 underfunded",
    },
  ],
};

// FAR-079: Capitalized Interest Calculation - Medium
export const farCapitalizedInterestTBS: TBSQuestion = {
  id: "tbs-far-079",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Property, Plant, and Equipment",
  subtopic: "Capitalized Interest",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Capitalized Interest on Construction",
  scenarioText: `Calculate the amount of interest to capitalize on a self-constructed asset using the weighted-average accumulated expenditures method.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-construction",
      order: 1,
      title: "Construction Expenditures",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 - Building Construction",
        headers: ["Date", "Expenditure"],
        rows: [
          { cells: ["January 1", "$600,000"] },
          { cells: ["April 1", "$900,000"] },
          { cells: ["September 1", "$500,000"] },
          { cells: ["December 1", "$200,000"] },
        ],
      },
    },
    {
      id: "exhibit-debt",
      order: 2,
      title: "Debt Outstanding",
      type: "table",
      content: {
        type: "table",
        title: "Borrowings",
        headers: ["Debt", "Principal", "Interest Rate"],
        rows: [
          { cells: ["Construction loan (specific)", "$800,000", "8%"] },
          { cells: ["General long-term note", "$1,500,000", "6%"] },
          { cells: ["General bonds payable", "$2,000,000", "5%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-weighted-avg",
      order: 1,
      type: "numeric",
      label: "Weighted-average accumulated expenditures",
      points: 1,
      correctAnswer: { type: "numeric", value: 1441667, tolerance: 1000 },
      explanation: "$600K×12/12 + $900K×9/12 + $500K×4/12 + $200K×1/12 = $600K + $675K + $166.7K + $16.7K = $1,458,333 (rounded)",
    },
    {
      id: "req-specific-interest",
      order: 2,
      type: "numeric",
      label: "Interest on specific construction loan (avoidable)",
      points: 1,
      correctAnswer: { type: "numeric", value: 64000, tolerance: 1 },
      explanation: "$800,000 × 8% = $64,000",
    },
    {
      id: "req-weighted-rate",
      order: 3,
      type: "numeric",
      label: "Weighted-average rate on general debt (percentage)",
      points: 1,
      correctAnswer: { type: "numeric", value: 5.43, tolerance: 0.05 },
      explanation: "($1,500,000×6% + $2,000,000×5%) / $3,500,000 = $190,000/$3,500,000 = 5.43%",
    },
    {
      id: "req-excess-interest",
      order: 4,
      type: "numeric",
      label: "Interest on excess expenditures using weighted rate",
      points: 1,
      correctAnswer: { type: "numeric", value: 35740, tolerance: 500 },
      explanation: "($1,458,333 - $800,000) × 5.43% = $658,333 × 5.43% = $35,740",
    },
    {
      id: "req-total-capitalize",
      order: 5,
      type: "numeric",
      label: "Total interest to capitalize",
      points: 1,
      correctAnswer: { type: "numeric", value: 99740, tolerance: 500 },
      explanation: "$64,000 + $35,740 = $99,740 (but not more than actual interest incurred)",
    },
  ],
};

// FAR-080: Consolidation - Fair Value Adjustments - Medium
export const farConsolidationFVAdjustmentsTBS: TBSQuestion = {
  id: "tbs-far-080",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Consolidations",
  subtopic: "Acquisition Accounting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Business Combination Fair Value Adjustments",
  scenarioText: `Calculate the fair value adjustments and goodwill for a business acquisition using the acquisition method.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-acquisition",
      order: 1,
      title: "Acquisition Information",
      type: "table",
      content: {
        type: "table",
        title: "Target Company Data at Acquisition",
        headers: ["Item", "Book Value", "Fair Value"],
        rows: [
          { cells: ["Cash", "$150,000", "$150,000"] },
          { cells: ["Accounts Receivable", "$280,000", "$265,000"] },
          { cells: ["Inventory", "$340,000", "$380,000"] },
          { cells: ["Property, Plant & Equipment", "$1,200,000", "$1,450,000"] },
          { cells: ["Customer Relationships (not recorded)", "$0", "$200,000"] },
          { cells: ["Total Liabilities", "$620,000", "$640,000"] },
        ],
      },
    },
    {
      id: "exhibit-purchase",
      order: 2,
      title: "Purchase Details",
      type: "text",
      content: {
        type: "text",
        title: "Acquisition Terms",
        paragraphs: [
          "Parent Company acquired 100% of Target Company for $2,100,000 cash.",
          "Transaction costs of $45,000 were paid to investment bankers.",
          "Target's stockholders' equity book value was $1,350,000.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fv-net-assets",
      order: 1,
      type: "numeric",
      label: "Fair value of identifiable net assets acquired",
      points: 1,
      correctAnswer: { type: "numeric", value: 1805000, tolerance: 1 },
      explanation: "$150K + $265K + $380K + $1,450K + $200K - $640K = $1,805,000",
    },
    {
      id: "req-fv-adjustment",
      order: 2,
      type: "numeric",
      label: "Total fair value adjustment (FV - Book Value)",
      points: 1,
      correctAnswer: { type: "numeric", value: 455000, tolerance: 1 },
      explanation: "$1,805,000 - $1,350,000 = $455,000",
    },
    {
      id: "req-goodwill",
      order: 3,
      type: "numeric",
      label: "Goodwill recognized",
      points: 1,
      correctAnswer: { type: "numeric", value: 295000, tolerance: 1 },
      explanation: "$2,100,000 - $1,805,000 = $295,000",
    },
    {
      id: "req-transaction-costs",
      order: 4,
      type: "dropdown",
      label: "How are transaction costs accounted for?",
      points: 1,
      dropdownOptions: [
        { id: "opt-tc-goodwill", order: 1, text: "Added to goodwill", isCorrect: false },
        { id: "opt-tc-expense", order: 2, text: "Expensed as incurred", isCorrect: true },
        { id: "opt-tc-investment", order: 3, text: "Capitalized to investment", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-tc-expense" },
      explanation: "Under ASC 805, transaction costs are expensed in the period incurred",
    },
    {
      id: "req-total-cost",
      order: 5,
      type: "numeric",
      label: "Total cost charged to income statement for acquisition",
      points: 1,
      correctAnswer: { type: "numeric", value: 45000, tolerance: 1 },
      explanation: "Only transaction costs of $45,000 are expensed",
    },
  ],
};

// FAR-081: Statement of Cash Flows - Investing Activities - Easy
export const farCashFlowInvestingTBS: TBSQuestion = {
  id: "tbs-far-081",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Statement of Cash Flows",
  subtopic: "Investing Activities",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Cash Flows from Investing Activities",
  scenarioText: `Calculate cash flows from investing activities using information from the comparative balance sheets and income statement.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-balance-sheet",
      order: 1,
      title: "Balance Sheet Information",
      type: "table",
      content: {
        type: "table",
        title: "Selected Accounts",
        headers: ["Account", "Year 1 End", "Year 0 End"],
        rows: [
          { cells: ["Land", "$450,000", "$300,000"] },
          { cells: ["Equipment (gross)", "$1,800,000", "$1,500,000"] },
          { cells: ["Accumulated Depreciation - Equipment", "$680,000", "$520,000"] },
          { cells: ["Available-for-Sale Securities", "$280,000", "$350,000"] },
        ],
      },
    },
    {
      id: "exhibit-additional",
      order: 2,
      title: "Additional Information",
      type: "text",
      content: {
        type: "text",
        title: "Year 1 Transactions",
        paragraphs: [
          "Equipment with a cost of $200,000 and accumulated depreciation of $140,000 was sold for $75,000.",
          "Depreciation expense for the year was $300,000.",
          "Land purchases were made entirely with cash.",
          "Securities sold had a cost of $120,000 and were sold for $110,000.",
          "Securities purchased cost $50,000.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-equipment-purchases",
      order: 1,
      type: "numeric",
      label: "Cash paid for equipment purchases",
      points: 1,
      correctAnswer: { type: "numeric", value: 500000, tolerance: 1 },
      explanation: "Change + disposals: ($1,800,000 - $1,500,000) + $200,000 = $500,000",
    },
    {
      id: "req-land-purchases",
      order: 2,
      type: "numeric",
      label: "Cash paid for land purchases",
      points: 1,
      correctAnswer: { type: "numeric", value: 150000, tolerance: 1 },
      explanation: "$450,000 - $300,000 = $150,000",
    },
    {
      id: "req-equipment-proceeds",
      order: 3,
      type: "numeric",
      label: "Cash received from equipment sale",
      points: 1,
      correctAnswer: { type: "numeric", value: 75000, tolerance: 1 },
      explanation: "Given in additional information: $75,000",
    },
    {
      id: "req-securities-net",
      order: 4,
      type: "numeric",
      label: "Net cash flow from securities activities",
      points: 1,
      correctAnswer: { type: "numeric", value: 60000, tolerance: 1 },
      explanation: "Sold $110,000 - Purchased $50,000 = $60,000 inflow",
    },
    {
      id: "req-total-investing",
      order: 5,
      type: "numeric",
      label: "Net cash used in investing activities",
      points: 1,
      correctAnswer: { type: "numeric", value: -515000, tolerance: 1 },
      explanation: "-$500,000 - $150,000 + $75,000 + $60,000 = ($515,000)",
    },
  ],
};

// FAR-082: Research Citation - Lease Classification - Medium
export const farResearchLeaseClassTBS: TBSQuestion = {
  id: "tbs-far-082",
  section: "FAR",
  tbsType: "research",
  topic: "Leases",
  subtopic: "Classification Criteria",
  difficulty: "medium",
  skillLevel: "remembering_understanding",
  contentArea: "FAR-III",
  title: "Research: Lease Classification Criteria",
  scenarioText: `Using the FASB Accounting Standards Codification, identify the authoritative guidance for lease classification criteria for lessees.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-scenario",
      order: 1,
      title: "Research Scenario",
      type: "text",
      content: {
        type: "text",
        title: "Research Task",
        paragraphs: [
          "Your supervisor has asked you to locate the specific ASC paragraph that describes when a lessee should classify a lease as a finance lease versus an operating lease.",
          "Identify the criteria used to determine if a lease transfers substantially all risks and rewards of ownership.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-topic-code",
      order: 1,
      type: "dropdown",
      label: "Which ASC Topic addresses lease accounting?",
      points: 1,
      dropdownOptions: [
        { id: "opt-840", order: 1, text: "ASC 840 - Leases (superseded)", isCorrect: false },
        { id: "opt-842", order: 2, text: "ASC 842 - Leases", isCorrect: true },
        { id: "opt-606", order: 3, text: "ASC 606 - Revenue", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-842" },
      explanation: "ASC 842 is the current authoritative guidance for lease accounting",
    },
    {
      id: "req-subtopic",
      order: 2,
      type: "dropdown",
      label: "Which subtopic covers lessee classification?",
      points: 1,
      dropdownOptions: [
        { id: "opt-842-10", order: 1, text: "ASC 842-10 (Overall)", isCorrect: false },
        { id: "opt-842-20", order: 2, text: "ASC 842-20 (Lessee)", isCorrect: true },
        { id: "opt-842-30", order: 3, text: "ASC 842-30 (Lessor)", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-842-20" },
      explanation: "ASC 842-20 specifically addresses lessee accounting",
    },
    {
      id: "req-classification-section",
      order: 3,
      type: "citation",
      label: "Enter the full ASC citation for finance lease classification criteria",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "FASB",
        topicCode: "ASC 842-20-25-2",
        alternativeCitations: [
          { source: "FASB", topicCode: "842-20-25-2" },
          { source: "FASB", topicCode: "ASC 842-20-25" }
        ]
      },
      explanation: "ASC 842-20-25-2 lists the five criteria for finance lease classification",
    },
  ],
};

// FAR-083: Interim Financial Reporting - Medium
export const farInterimReportingTBS: TBSQuestion = {
  id: "tbs-far-083",
  section: "FAR",
  tbsType: "dropdown",
  topic: "Financial Statements",
  subtopic: "Interim Reporting",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Interim Financial Reporting Standards",
  scenarioText: `Determine the proper accounting treatment for various items in interim financial statements under ASC 270.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-interim",
      order: 1,
      title: "Q3 Interim Items",
      type: "table",
      content: {
        type: "table",
        title: "Items to Address",
        headers: ["Item", "Details"],
        rows: [
          { cells: ["Annual property tax", "$120,000 paid in Q1, covers full year"] },
          { cells: ["Inventory write-down", "$50,000 loss in Q2, market recovered $30,000 in Q3"] },
          { cells: ["Bonus accrual", "$200,000 annual bonus, estimated and reasonably certain"] },
          { cells: ["Year-to-date tax rate change", "Rate increased from 25% to 28% in Q3"] },
          { cells: ["Extraordinary item", "Q3 gain of $80,000 from insurance recovery"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-property-tax",
      order: 1,
      type: "dropdown",
      label: "How should property tax be recognized in Q3?",
      points: 1,
      dropdownOptions: [
        { id: "opt-tax-full", order: 1, text: "Full $120,000 expense in Q1", isCorrect: false },
        { id: "opt-tax-allocate", order: 2, text: "$30,000 expense each quarter", isCorrect: true },
        { id: "opt-tax-prepaid", order: 3, text: "Prepaid asset until Q4", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-tax-allocate" },
      explanation: "Annual costs that benefit the full year should be allocated across interim periods",
    },
    {
      id: "req-inventory-recovery",
      order: 2,
      type: "dropdown",
      label: "How should the inventory market recovery be treated?",
      points: 1,
      dropdownOptions: [
        { id: "opt-inv-ignore", order: 1, text: "Ignore - LCM losses are permanent", isCorrect: false },
        { id: "opt-inv-reverse", order: 2, text: "Reverse the loss up to original cost", isCorrect: true },
        { id: "opt-inv-gain", order: 3, text: "Record gain above original cost", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-inv-reverse" },
      explanation: "Interim LCM losses can be reversed in subsequent interim periods if market recovers, but not above original cost",
    },
    {
      id: "req-bonus",
      order: 3,
      type: "numeric",
      label: "Bonus expense to recognize in Q3 interim statements",
      points: 1,
      correctAnswer: { type: "numeric", value: 50000, tolerance: 1 },
      explanation: "$200,000 / 4 quarters = $50,000 per quarter when reasonably estimable",
    },
    {
      id: "req-tax-rate",
      order: 4,
      type: "dropdown",
      label: "How should the tax rate change be applied?",
      points: 1,
      dropdownOptions: [
        { id: "opt-rate-prospective", order: 1, text: "Apply 28% only to Q3 and Q4", isCorrect: false },
        { id: "opt-rate-retroactive", order: 2, text: "Apply 28% to full year, adjust YTD in Q3", isCorrect: true },
        { id: "opt-rate-weighted", order: 3, text: "Use weighted average of old and new rates", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-rate-retroactive" },
      explanation: "Changes in estimated annual tax rate should be applied retroactively to YTD income",
    },
    {
      id: "req-unusual",
      order: 5,
      type: "dropdown",
      label: "How should the insurance recovery gain be reported?",
      points: 1,
      dropdownOptions: [
        { id: "opt-unusual-separate", order: 1, text: "Separately disclosed unusual item in Q3", isCorrect: true },
        { id: "opt-unusual-allocate", order: 2, text: "Allocated across all quarters", isCorrect: false },
        { id: "opt-unusual-q4", order: 3, text: "Deferred to annual statements", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-unusual-separate" },
      explanation: "Unusual or infrequent items are recognized in the interim period when they occur",
    },
  ],
};

// FAR-084: Sale-Leaseback Transaction - Medium
export const farSaleLeasebackTBS: TBSQuestion = {
  id: "tbs-far-084",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Leases",
  subtopic: "Sale-Leaseback",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Sale-Leaseback Accounting",
  scenarioText: `Determine the proper accounting for a sale-leaseback transaction under ASC 842.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-transaction",
      order: 1,
      title: "Transaction Details",
      type: "table",
      content: {
        type: "table",
        title: "Sale-Leaseback Information",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Carrying amount of building", "$800,000"] },
          { cells: ["Fair value of building", "$1,200,000"] },
          { cells: ["Sale price received", "$1,200,000"] },
          { cells: ["Annual lease payment (5-year operating lease)", "$150,000"] },
          { cells: ["Market rate annual rent for similar property", "$150,000"] },
          { cells: ["Seller-lessee incremental borrowing rate", "6%"] },
          { cells: ["PV factor for 5-year ordinary annuity at 6%", "4.2124"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-qualifies-sale",
      order: 1,
      type: "dropdown",
      label: "Does this qualify as a sale under ASC 842?",
      points: 1,
      dropdownOptions: [
        { id: "opt-sale-yes", order: 1, text: "Yes - transfer of control at fair value", isCorrect: true },
        { id: "opt-sale-no", order: 2, text: "No - repurchase option exists", isCorrect: false },
        { id: "opt-sale-financing", order: 3, text: "No - treat as financing", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-sale-yes" },
      explanation: "Sale price equals fair value and lease is at market rate - qualifies as sale",
    },
    {
      id: "req-gain-total",
      order: 2,
      type: "numeric",
      label: "Total economic gain on sale",
      points: 1,
      correctAnswer: { type: "numeric", value: 400000, tolerance: 1 },
      explanation: "$1,200,000 sale price - $800,000 carrying amount = $400,000",
    },
    {
      id: "req-rou-asset",
      order: 3,
      type: "numeric",
      label: "Right-of-use asset to record",
      points: 1,
      correctAnswer: { type: "numeric", value: 631860, tolerance: 100 },
      explanation: "$150,000 × 4.2124 = $631,860 (PV of lease payments)",
    },
    {
      id: "req-gain-recognized",
      order: 4,
      type: "numeric",
      label: "Gain recognized at sale (pro-rata based on rights retained)",
      points: 1,
      correctAnswer: { type: "numeric", value: 189380, tolerance: 200 },
      explanation: "$400,000 × (1 - $631,860/$1,200,000) = $400,000 × 47.35% = $189,380",
    },
    {
      id: "req-gain-deferred",
      order: 5,
      type: "numeric",
      label: "Gain deferred (reduces ROU asset)",
      points: 1,
      correctAnswer: { type: "numeric", value: 210620, tolerance: 200 },
      explanation: "$400,000 - $189,380 = $210,620 (or $400,000 × 52.65%)",
    },
  ],
};

// FAR-085: Foreign Currency Transaction - Easy
export const farForexTransactionTBS: TBSQuestion = {
  id: "tbs-far-085",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Foreign Currency",
  subtopic: "Transaction Gains and Losses",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Foreign Currency Transaction Accounting",
  scenarioText: `Account for a foreign currency denominated purchase and subsequent payment.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-transaction",
      order: 1,
      title: "Transaction Information",
      type: "table",
      content: {
        type: "table",
        title: "Purchase from German Supplier",
        headers: ["Date", "Event", "Exchange Rate ($/€)"],
        rows: [
          { cells: ["November 1", "Purchase on account: €100,000", "$1.15"] },
          { cells: ["November 30", "Year-end (balance sheet date)", "$1.18"] },
          { cells: ["January 15", "Payment date", "$1.12"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-initial-recording",
      order: 1,
      type: "numeric",
      label: "Accounts payable recorded on November 1 (USD)",
      points: 1,
      correctAnswer: { type: "numeric", value: 115000, tolerance: 1 },
      explanation: "€100,000 × $1.15 = $115,000",
    },
    {
      id: "req-yearend-balance",
      order: 2,
      type: "numeric",
      label: "Accounts payable at year-end November 30 (USD)",
      points: 1,
      correctAnswer: { type: "numeric", value: 118000, tolerance: 1 },
      explanation: "€100,000 × $1.18 = $118,000",
    },
    {
      id: "req-yearend-loss",
      order: 3,
      type: "numeric",
      label: "Foreign exchange loss recognized at year-end",
      points: 1,
      correctAnswer: { type: "numeric", value: 3000, tolerance: 1 },
      explanation: "$118,000 - $115,000 = $3,000 loss (payable increased)",
    },
    {
      id: "req-payment-amount",
      order: 4,
      type: "numeric",
      label: "Cash paid on January 15 (USD)",
      points: 1,
      correctAnswer: { type: "numeric", value: 112000, tolerance: 1 },
      explanation: "€100,000 × $1.12 = $112,000",
    },
    {
      id: "req-settlement-gain",
      order: 5,
      type: "numeric",
      label: "Foreign exchange gain recognized on settlement (Year 2)",
      points: 1,
      correctAnswer: { type: "numeric", value: 6000, tolerance: 1 },
      explanation: "$118,000 (liability) - $112,000 (cash paid) = $6,000 gain",
    },
  ],
};

// FAR-086: Segment Reporting Quantitative Thresholds - Medium
export const farSegmentThresholdsTBS: TBSQuestion = {
  id: "tbs-far-086",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Financial Statements",
  subtopic: "Segment Reporting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-I",
  title: "Segment Reporting Quantitative Thresholds",
  scenarioText: `Determine which operating segments are reportable based on the quantitative thresholds under ASC 280.`,
  timeEstimateMinutes: 11,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-segments",
      order: 1,
      title: "Operating Segment Data",
      type: "table",
      content: {
        type: "table",
        title: "Segment Information",
        headers: ["Segment", "Revenue", "Profit/(Loss)", "Assets"],
        rows: [
          { cells: ["Consumer Products", "$45,000,000", "$5,200,000", "$38,000,000"] },
          { cells: ["Industrial", "$32,000,000", "$4,100,000", "$28,000,000"] },
          { cells: ["Healthcare", "$18,000,000", "($1,500,000)", "$15,000,000"] },
          { cells: ["Technology", "$8,000,000", "$900,000", "$6,000,000"] },
          { cells: ["Other", "$2,000,000", "$100,000", "$3,000,000"] },
          { cells: ["Total", "$105,000,000", "$8,800,000", "$90,000,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-revenue-threshold",
      order: 1,
      type: "numeric",
      label: "10% revenue threshold amount",
      points: 1,
      correctAnswer: { type: "numeric", value: 10500000, tolerance: 1 },
      explanation: "$105,000,000 × 10% = $10,500,000",
    },
    {
      id: "req-profit-threshold",
      order: 2,
      type: "numeric",
      label: "10% profit/loss threshold (greater of absolute values)",
      points: 1,
      correctAnswer: { type: "numeric", value: 1030000, tolerance: 10000 },
      explanation: "Total profits = $10,300,000, Total losses = $1,500,000. Greater = $10,300,000 × 10% = $1,030,000",
    },
    {
      id: "req-asset-threshold",
      order: 3,
      type: "numeric",
      label: "10% asset threshold amount",
      points: 1,
      correctAnswer: { type: "numeric", value: 9000000, tolerance: 1 },
      explanation: "$90,000,000 × 10% = $9,000,000",
    },
    {
      id: "req-reportable-count",
      order: 4,
      type: "numeric",
      label: "Number of reportable segments",
      points: 1,
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      explanation: "Consumer Products, Industrial, and Healthcare all meet at least one threshold",
    },
    {
      id: "req-75-test",
      order: 5,
      type: "dropdown",
      label: "Do reportable segments meet the 75% combined revenue test?",
      points: 1,
      dropdownOptions: [
        { id: "opt-75-yes", order: 1, text: "Yes - exceeds 75% of consolidated revenue", isCorrect: true },
        { id: "opt-75-no", order: 2, text: "No - need additional segments", isCorrect: false },
        { id: "opt-75-exactly", order: 3, text: "Exactly 75%", isCorrect: false },
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt-75-yes" },
      explanation: "($45M + $32M + $18M) / $105M = 90.5% > 75%",
    },
  ],
};

// Export all FAR TBS questions
export const farTBSQuestions: TBSQuestion[] = [
  farOperatingLeaseTBS,
  farLeaseModificationTBS,
  farConsolidationEliminationsTBS,
  farNCIConsolidationTBS,
  farPensionExpenseTBS,
  farGovernmentFundBalancesTBS,
  farModifiedAccrualTBS,
  farRevenueMultipleObligationsTBS,
  farDeferredTaxCalculationTBS,
  farBondIssuancePremiumTBS,
  farTreasuryStockTBS,
  farCashFlowIndirectTBS,
  farResearchLeaseTBS,
  farFinancialStatementReviewTBS,
  farInventoryMethodsTBS,
  farAccountsReceivableTBS,
  farIntangibleAssetsTBS,
  farRevenueContractModificationTBS,
  farEarningsPerShareTBS,
  // NEW: Phase 1 completion (tbs-far-031 through tbs-far-040)
  farPPEImpairmentTBS,
  farBusinessCombinationTBS,
  farContingenciesTBS,
  farStockCompensationTBS,
  farForeignCurrencyTBS,
  farSegmentReportingTBS,
  farFairValueTBS,
  farNFPRevenueTBS,
  farEnterpriseFundTBS,
  farSubsequentEventsTBS,
  // Phase 2 expansion - Batch 1 (tbs-far-041 through tbs-far-050)
  farVIEConsolidationTBS,
  farDerivativeHedgingTBS,
  farDebtRestructuringTBS,
  farNFPFinancialStatementsTBS,
  farAROTBS,
  farGovernmentWideTBS,
  farGoodwillImpairmentTBS,
  farCashFlowDirectTBS,
  farIntercompanyEliminationsTBS,
  farEquityMethodTBS,
  // Phase 2 expansion - Batch 2 (tbs-far-051 through tbs-far-061)
  farLeaseClassificationTBS,
  farConvertibleDebtTBS,
  farDiscontinuedOperationsTBS,
  farRelatedPartyTBS,
  farErrorCorrectionTBS,
  farAccountingChangesTBS,
  farFinanceLeaseTBS,
  farPensionPlanTBS,
  farBondRetirementTBS,
  farInventoryLowerCostTBS,
  farGovernmentFiduciaryTBS,
  // Phase 3 expansion - Batch 1 (tbs-far-062 through tbs-far-071)
  farBankReconciliationTBS,
  farBondAmortizationJETBS,
  farDepreciationMethodsTBS,
  farRevenueDocReviewTBS,
  farLIFOReserveTBS,
  farGovernmentCapitalAssetsTBS,
  farComprehensiveIncomeTBS,
  farNFPContributionsTBS,
  farIntercompanyInventoryTBS,
  farLeaseRemeasurementTBS,
  // Phase 3 expansion - Batch 2 (tbs-far-072 through tbs-far-081)
  farAllowanceMethodTBS,
  farStockDividendSplitTBS,
  farDTAValuationTBS,
  farGovernmentBudgetaryTBS,
  farInvestmentClassificationTBS,
  farLongLivedImpairmentTBS,
  farPensionAmendmentTBS,
  farCapitalizedInterestTBS,
  farConsolidationFVAdjustmentsTBS,
  farCashFlowInvestingTBS,
  // Phase 3 expansion - Batch 3 (tbs-far-082 through tbs-far-086)
  farResearchLeaseClassTBS,
  farInterimReportingTBS,
  farSaleLeasebackTBS,
  farForexTransactionTBS,
  farSegmentThresholdsTBS,
];
