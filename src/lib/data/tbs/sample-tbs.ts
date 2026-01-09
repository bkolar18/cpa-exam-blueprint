// Sample TBS Data for Testing
// This file contains example TBS questions for development and testing
// Topics/subtopics align with taxonomy.ts for unified analytics

import { TBSQuestion } from "./types";

export const sampleJournalEntryTBS: TBSQuestion = {
  id: "tbs-far-001",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Leases",
  subtopic: "Lessee Accounting - Finance Lease",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Recording a Finance Lease",
  scenarioText: `On January 1, Year 1, Riverside Corp. entered into a lease agreement for equipment with the following terms:

• Lease term: 5 years
• Annual lease payment: $50,000 (paid at end of each year)
• Fair value of equipment: $210,000
• Useful life of equipment: 6 years
• Implicit interest rate: 6%
• Riverside's incremental borrowing rate: 7%

The lease qualifies as a finance lease under ASC 842.

Required: Prepare the journal entry to record the lease at inception.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-pv-table",
      order: 1,
      title: "Present Value Table",
      type: "table",
      content: {
        type: "table",
        title: "Present Value of Ordinary Annuity",
        headers: ["Period", "5%", "6%", "7%", "8%"],
        rows: [
          { cells: ["1", "0.9524", "0.9434", "0.9346", "0.9259"] },
          { cells: ["2", "1.8594", "1.8334", "1.8080", "1.7833"] },
          { cells: ["3", "2.7232", "2.6730", "2.6243", "2.5771"] },
          { cells: ["4", "3.5460", "3.4651", "3.3872", "3.3121"] },
          { cells: ["5", "4.3295", "4.2124", "4.1002", "3.9927"] },
        ],
      },
    },
    {
      id: "exhibit-memo",
      order: 2,
      title: "Lease Agreement Memo",
      type: "memo",
      content: {
        type: "memo",
        from: "Legal Department",
        to: "Accounting Department",
        date: "January 1, Year 1",
        subject: "Equipment Lease - Finance Classification",
        body: `Please note the following regarding the equipment lease:

1. The lease term (5 years) represents 83% of the equipment's useful life (6 years), exceeding the 75% threshold.

2. The present value of lease payments should be calculated using the implicit rate of 6% as it is known to the lessee.

3. No transfer of ownership or purchase option is included.

Please prepare the appropriate journal entry to record this finance lease at inception.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-debit-entry",
      order: 1,
      type: "journal_debit",
      label: "Debit Entry (Account & Amount)",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-rou-asset",
        accountName: "Right-of-Use Asset",
        amount: 210620,
        tolerance: 10,
      },
      explanation: "The ROU asset is recorded at the present value of lease payments: $50,000 × 4.2124 = $210,620",
    },
    {
      id: "req-credit-entry",
      order: 2,
      type: "journal_credit",
      label: "Credit Entry (Account & Amount)",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-lease-liability",
        accountName: "Lease Liability",
        amount: 210620,
        tolerance: 10,
      },
      explanation: "The lease liability equals the present value of lease payments: $50,000 × 4.2124 = $210,620",
    },
  ],
  journalAccounts: [
    { id: "acc-rou-asset", name: "Right-of-Use Asset", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-lease-liability", name: "Lease Liability", type: "liability", normalBalance: "credit", isDistractor: false },
    { id: "acc-equipment", name: "Equipment", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-notes-payable", name: "Notes Payable", type: "liability", normalBalance: "credit", isDistractor: true },
    { id: "acc-prepaid-rent", name: "Prepaid Rent", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-lease-expense", name: "Lease Expense", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-cash", name: "Cash", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-interest-expense", name: "Interest Expense", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-accum-dep", name: "Accumulated Depreciation", type: "asset", normalBalance: "credit", isDistractor: true },
  ],
};

export const sampleNumericEntryTBS: TBSQuestion = {
  id: "tbs-far-002",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Inventory",
  subtopic: "Lower of Cost or Net Realizable Value",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Inventory Valuation",
  scenarioText: `Morrison Company uses the lower of cost or net realizable value (LCNRV) method to value its inventory. The following information is available for the company's inventory at December 31, Year 1:

Required: Calculate the value at which each inventory item should be reported on the balance sheet, and determine the total inventory value.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-inventory",
      order: 1,
      title: "Inventory Data",
      type: "table",
      content: {
        type: "table",
        title: "Morrison Company - Inventory Details",
        headers: ["Item", "Units", "Cost per Unit", "Selling Price", "Cost to Sell"],
        rows: [
          { cells: ["Product A", "100", "$25", "$30", "$3"] },
          { cells: ["Product B", "200", "$40", "$38", "$2"] },
          { cells: ["Product C", "150", "$60", "$75", "$5"] },
        ],
        footnotes: [
          "Net Realizable Value = Selling Price - Cost to Sell",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-product-a",
      order: 1,
      type: "numeric",
      label: "Product A Value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2500,
        tolerance: 0,
      },
      explanation: "Product A: Cost ($25) < NRV ($30 - $3 = $27), so use Cost. 100 × $25 = $2,500",
      hint: "Compare cost to NRV (Selling Price - Cost to Sell)",
    },
    {
      id: "req-product-b",
      order: 2,
      type: "numeric",
      label: "Product B Value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7200,
        tolerance: 0,
      },
      explanation: "Product B: Cost ($40) > NRV ($38 - $2 = $36), so use NRV. 200 × $36 = $7,200",
      hint: "Remember to use the lower of the two values",
    },
    {
      id: "req-product-c",
      order: 3,
      type: "numeric",
      label: "Product C Value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9000,
        tolerance: 0,
      },
      explanation: "Product C: Cost ($60) < NRV ($75 - $5 = $70), so use Cost. 150 × $60 = $9,000",
    },
    {
      id: "req-total",
      order: 4,
      type: "numeric",
      label: "Total Inventory Value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18700,
        tolerance: 0,
      },
      explanation: "Total = $2,500 + $7,200 + $9,000 = $18,700",
    },
  ],
};

export const sampleDocumentReviewTBS: TBSQuestion = {
  id: "tbs-aud-001",
  section: "AUD",
  tbsType: "document_review",
  topic: "Audit Reports",
  subtopic: "Unmodified Opinion",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-IV",
  title: "Audit Report Review",
  scenarioText: `You are reviewing a draft audit report prepared by a staff auditor for ABC Company, a non-public entity.

Required: Review the highlighted items in the report and select the correct wording from the dropdown menus. Each highlighted section may contain an error that needs to be corrected.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-report",
      order: 1,
      title: "Draft Audit Report",
      type: "text",
      content: {
        type: "text",
        title: "Independent Auditor's Report",
        paragraphs: [
          "To the Board of Directors and Shareholders of ABC Company:",
          "",
          "Opinion",
          "",
          "We have audited the accompanying financial statements of ABC Company, which comprise the balance sheet as of December 31, Year 1, and the related statements of income, changes in stockholders' equity, and cash flows for the year then ended, and the related notes to the financial statements.",
          "",
          "In our opinion, the financial statements referred to above present fairly, in all material respects, the financial position of ABC Company as of December 31, Year 1, and the results of its operations and its cash flows for the year then ended in accordance with [DROPDOWN:1].",
          "",
          "Basis for Opinion",
          "",
          "We conducted our audit in accordance with [DROPDOWN:2]. Those standards require that we plan and perform the audit to obtain [DROPDOWN:3] assurance about whether the financial statements are free from material misstatement, whether due to fraud or error.",
          "",
          "Responsibilities of Management for the Financial Statements",
          "",
          "Management is responsible for the preparation and fair presentation of these financial statements in accordance with accounting principles generally accepted in the United States of America, and for the design, implementation, and maintenance of internal control relevant to the preparation and fair presentation of financial statements that are free from [DROPDOWN:4] misstatement, whether due to fraud or error.",
          "",
          "Auditor's Responsibilities for the Audit of the Financial Statements",
          "",
          "Our objectives are to obtain [DROPDOWN:5] assurance about whether the financial statements as a whole are free from material misstatement, whether due to fraud or error, and to issue an auditor's report that includes our opinion.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dropdown-1",
      order: 1,
      type: "dropdown",
      label: "GAAP Reference",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-1a",
      },
      explanation: "The standard phrase is 'accounting principles generally accepted in the United States of America'",
      dropdownOptions: [
        { id: "opt-1a", order: 1, text: "accounting principles generally accepted in the United States of America", isCorrect: true },
        { id: "opt-1b", order: 2, text: "U.S. GAAP", isCorrect: false },
        { id: "opt-1c", order: 3, text: "International Financial Reporting Standards", isCorrect: false },
        { id: "opt-1d", order: 4, text: "generally accepted accounting standards", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-2",
      order: 2,
      type: "dropdown",
      label: "Audit Standards Reference",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-2a",
      },
      explanation: "Non-public company audits follow 'auditing standards generally accepted in the United States of America'",
      dropdownOptions: [
        { id: "opt-2a", order: 1, text: "auditing standards generally accepted in the United States of America", isCorrect: true },
        { id: "opt-2b", order: 2, text: "standards of the PCAOB", isCorrect: false },
        { id: "opt-2c", order: 3, text: "International Standards on Auditing", isCorrect: false },
        { id: "opt-2d", order: 4, text: "AICPA audit standards", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-3",
      order: 3,
      type: "dropdown",
      label: "Assurance Level (Basis)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-3a",
      },
      explanation: "Audits provide 'reasonable' assurance, not absolute assurance",
      dropdownOptions: [
        { id: "opt-3a", order: 1, text: "reasonable", isCorrect: true },
        { id: "opt-3b", order: 2, text: "absolute", isCorrect: false },
        { id: "opt-3c", order: 3, text: "limited", isCorrect: false },
        { id: "opt-3d", order: 4, text: "moderate", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-4",
      order: 4,
      type: "dropdown",
      label: "Misstatement Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-4a",
      },
      explanation: "Management is responsible for statements free from 'material' misstatement",
      dropdownOptions: [
        { id: "opt-4a", order: 1, text: "material", isCorrect: true },
        { id: "opt-4b", order: 2, text: "any", isCorrect: false },
        { id: "opt-4c", order: 3, text: "significant", isCorrect: false },
        { id: "opt-4d", order: 4, text: "all", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-5",
      order: 5,
      type: "dropdown",
      label: "Assurance Level (Objectives)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-5a",
      },
      explanation: "The auditor's objective is to obtain 'reasonable' assurance",
      dropdownOptions: [
        { id: "opt-5a", order: 1, text: "reasonable", isCorrect: true },
        { id: "opt-5b", order: 2, text: "absolute", isCorrect: false },
        { id: "opt-5c", order: 3, text: "complete", isCorrect: false },
        { id: "opt-5d", order: 4, text: "sufficient", isCorrect: false },
      ],
    },
  ],
};

export const sampleResearchTBS: TBSQuestion = {
  id: "tbs-far-003",
  section: "FAR",
  tbsType: "research",
  topic: "Revenue Recognition",
  subtopic: "Identifying Performance Obligations",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-III",
  title: "Revenue Recognition Research",
  scenarioText: `Henderson Software Company enters into a contract to provide software licensing, implementation services, and two years of technical support to a customer for a total contract price of $500,000.

The controller needs to determine if each promise should be accounted for as a separate performance obligation.

Required: Research the authoritative literature and provide the citation that describes when a promised good or service is distinct and should be accounted for as a separate performance obligation.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-contract",
      order: 1,
      title: "Contract Details",
      type: "memo",
      content: {
        type: "memo",
        from: "Sales Department",
        to: "Accounting Department",
        date: "October 15, Year 1",
        subject: "Henderson Software - New Customer Contract",
        body: `Please find below the details of the new contract:

Customer: DataTech Industries
Contract Value: $500,000

Deliverables:
1. Software License - Perpetual license for our enterprise software
2. Implementation Services - Configuration and data migration (estimated 200 hours)
3. Technical Support - 24/7 support for 2 years

The implementation services require significant customization of the software for the customer's specific needs. Our support team will be available throughout the contract period.

Please advise on the proper revenue recognition treatment.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-citation",
      order: 1,
      type: "citation",
      label: "Authoritative Citation",
      description: "Enter the authoritative reference that describes when a good or service is distinct",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "FASB",
        topicCode: "606-10-25-19",
        alternativeCitations: [
          { source: "FASB", topicCode: "ASC 606-10-25-19" },
          { source: "FASB", topicCode: "606-10-25-20" },
          { source: "FASB", topicCode: "ASC 606-10-25-20" },
        ],
      },
      explanation: "ASC 606-10-25-19 through 25-22 describe the criteria for determining if a promised good or service is distinct. Specifically, 606-10-25-19 states that a good or service is distinct if both (a) the customer can benefit from the good or service on its own or together with other readily available resources, and (b) the promise to transfer the good or service is separately identifiable from other promises in the contract.",
      hint: "Look in ASC 606, Revenue from Contracts with Customers, specifically in the section about performance obligations",
    },
  ],
};

// FAR TBS 4: Government Fund Accounting (Hard - Numeric Entry)
export const farGovernmentFundsTBS: TBSQuestion = {
  id: "tbs-far-004",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Government Accounting",
  subtopic: "Governmental Fund Types",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-IV",
  title: "Governmental Fund Closing Entries",
  scenarioText: `The City of Riverside uses modified accrual accounting for its governmental funds. You are the senior accountant responsible for preparing the year-end closing entries for the General Fund.

Review the trial balance and fund balance classifications provided in the exhibits. Calculate the amounts needed for the closing entries and determine the resulting fund balance components.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-trial-balance",
      order: 1,
      title: "Pre-Closing Trial Balance",
      type: "table",
      content: {
        type: "table",
        title: "City of Riverside - General Fund Trial Balance - June 30, Year 1",
        headers: ["Account", "Debit", "Credit"],
        rows: [
          { cells: ["Cash", "$450,000", ""] },
          { cells: ["Property Taxes Receivable", "$125,000", ""] },
          { cells: ["Allowance for Uncollectible Taxes", "", "$8,000"] },
          { cells: ["Due from State Government", "$75,000", ""] },
          { cells: ["Vouchers Payable", "", "$95,000"] },
          { cells: ["Deferred Inflows - Property Taxes", "", "$42,000"] },
          { cells: ["Fund Balance - Nonspendable", "", "$0"] },
          { cells: ["Fund Balance - Restricted", "", "$50,000"] },
          { cells: ["Fund Balance - Committed", "", "$100,000"] },
          { cells: ["Fund Balance - Assigned", "", "$25,000"] },
          { cells: ["Fund Balance - Unassigned", "", "$180,000"] },
          { cells: ["Estimated Revenues", "$2,800,000", ""] },
          { cells: ["Appropriations", "", "$2,750,000"] },
          { cells: ["Budgetary Fund Balance", "", "$50,000"] },
          { cells: ["Revenues - Property Taxes", "", "$2,100,000"] },
          { cells: ["Revenues - Intergovernmental", "", "$600,000"] },
          { cells: ["Revenues - Licenses & Permits", "", "$150,000"] },
          { cells: ["Expenditures - General Government", "$800,000", ""] },
          { cells: ["Expenditures - Public Safety", "$1,200,000", ""] },
          { cells: ["Expenditures - Public Works", "$550,000", ""] },
          { cells: ["Expenditures - Capital Outlay", "$200,000", ""] },
          { cells: ["Totals", "$6,200,000", "$6,200,000"] },
        ],
      },
    },
    {
      id: "exhibit-fund-balance-memo",
      order: 2,
      title: "Fund Balance Classifications",
      type: "memo",
      content: {
        type: "memo",
        from: "City Manager",
        to: "Finance Department",
        date: "June 30, Year 1",
        subject: "Fund Balance Classifications for Year-End",
        body: `Per City Council Resolution #2024-15, the following fund balance classifications apply:

1. Nonspendable: No prepaid items or inventory at year-end
2. Restricted: Grant funds restricted for park improvements - $50,000 (no change)
3. Committed: Emergency reserve per City Charter - $100,000 (no change)
4. Assigned: Next year's capital projects - $75,000 (increased from $25,000)
5. Unassigned: Remainder available for general purposes

Please ensure closing entries properly update all fund balance accounts.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-total-revenues",
      order: 1,
      type: "numeric",
      label: "Total Actual Revenues",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2850000,
        tolerance: 0,
      },
      explanation: "Total Revenues = Property Taxes ($2,100,000) + Intergovernmental ($600,000) + Licenses & Permits ($150,000) = $2,850,000",
    },
    {
      id: "req-total-expenditures",
      order: 2,
      type: "numeric",
      label: "Total Actual Expenditures",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2750000,
        tolerance: 0,
      },
      explanation: "Total Expenditures = General Government ($800,000) + Public Safety ($1,200,000) + Public Works ($550,000) + Capital Outlay ($200,000) = $2,750,000",
    },
    {
      id: "req-net-change",
      order: 3,
      type: "numeric",
      label: "Net Change in Fund Balance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 100000,
        tolerance: 0,
      },
      explanation: "Net Change = Total Revenues ($2,850,000) - Total Expenditures ($2,750,000) = $100,000 increase",
    },
    {
      id: "req-fb-assigned",
      order: 4,
      type: "numeric",
      label: "Ending Fund Balance - Assigned",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 75000,
        tolerance: 0,
      },
      explanation: "Per the City Manager memo, Assigned fund balance is now $75,000 for next year's capital projects",
    },
    {
      id: "req-fb-unassigned",
      order: 5,
      type: "numeric",
      label: "Ending Fund Balance - Unassigned",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 230000,
        tolerance: 0,
      },
      explanation: "Beginning Unassigned ($180,000) + Net Change ($100,000) - Increase in Assigned ($50,000) = $230,000. The $50,000 moved from Unassigned to Assigned.",
    },
  ],
};

// FAR TBS 5: Income Tax - Deferred Taxes (Medium - Document Review)
export const farDeferredTaxesTBS: TBSQuestion = {
  id: "tbs-far-005",
  section: "FAR",
  tbsType: "document_review",
  topic: "Income Taxes",
  subtopic: "Deferred Tax Assets & Liabilities",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Deferred Tax Analysis",
  scenarioText: `You are reviewing the income tax provision workpapers for Apex Manufacturing Inc. for the year ended December 31, Year 1.

Review the schedule of temporary differences and select the correct classification and amount for each item in the deferred tax summary.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-temp-diff",
      order: 1,
      title: "Temporary Differences Schedule",
      type: "table",
      content: {
        type: "table",
        title: "Apex Manufacturing - Temporary Differences at December 31, Year 1",
        headers: ["Item", "Book Basis", "Tax Basis", "Difference", "Reversal Period"],
        rows: [
          { cells: ["Depreciation (Equipment)", "$400,000", "$550,000", "$(150,000)", "2-4 years"] },
          { cells: ["Warranty Reserve", "$80,000", "$0", "$80,000", "1-2 years"] },
          { cells: ["Prepaid Insurance", "$24,000", "$0", "$(24,000)", "1 year"] },
          { cells: ["Bad Debt Allowance", "$45,000", "$0", "$45,000", "1-3 years"] },
          { cells: ["Pension Liability", "$200,000", "$0", "$200,000", "5-15 years"] },
          { cells: ["Unearned Revenue", "$60,000", "$100,000", "$40,000", "1 year"] },
        ],
        footnotes: [
          "Enacted tax rate: 25% for all future years",
          "All differences are expected to reverse as indicated",
        ],
      },
    },
    {
      id: "exhibit-guidance",
      order: 2,
      title: "Classification Guidance",
      type: "text",
      content: {
        type: "text",
        title: "Deferred Tax Classification Rules",
        paragraphs: [
          "Under ASC 740, deferred tax assets and liabilities are classified as noncurrent on the balance sheet.",
          "",
          "A taxable temporary difference creates a DEFERRED TAX LIABILITY because it will result in taxable amounts in future years when the related asset is recovered or the liability is settled.",
          "",
          "A deductible temporary difference creates a DEFERRED TAX ASSET because it will result in deductible amounts in future years when the related asset is recovered or the liability is settled.",
          "",
          "Book basis > Tax basis for an ASSET = Taxable temporary difference (DTL)",
          "Book basis < Tax basis for an ASSET = Deductible temporary difference (DTA)",
          "Book basis > Tax basis for a LIABILITY = Deductible temporary difference (DTA)",
          "Book basis < Tax basis for a LIABILITY = Taxable temporary difference (DTL)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-depreciation",
      order: 1,
      type: "dropdown",
      label: "Depreciation Difference Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-dep-dta",
      },
      explanation: "Book basis ($400,000) < Tax basis ($550,000) for an asset creates a deductible temporary difference = DTA. The company took more tax depreciation, so future tax deductions will be lower.",
      dropdownOptions: [
        { id: "opt-dep-dta", order: 1, text: "Deferred Tax Asset", isCorrect: true },
        { id: "opt-dep-dtl", order: 2, text: "Deferred Tax Liability", isCorrect: false },
        { id: "opt-dep-none", order: 3, text: "No deferred tax effect", isCorrect: false },
      ],
    },
    {
      id: "req-warranty",
      order: 2,
      type: "dropdown",
      label: "Warranty Reserve Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-war-dta",
      },
      explanation: "Warranty reserve is a liability. Book basis ($80,000) > Tax basis ($0) for a liability creates a deductible temporary difference = DTA. The expense is recognized for books but deductible for tax when paid.",
      dropdownOptions: [
        { id: "opt-war-dta", order: 1, text: "Deferred Tax Asset", isCorrect: true },
        { id: "opt-war-dtl", order: 2, text: "Deferred Tax Liability", isCorrect: false },
        { id: "opt-war-none", order: 3, text: "No deferred tax effect", isCorrect: false },
      ],
    },
    {
      id: "req-prepaid",
      order: 3,
      type: "dropdown",
      label: "Prepaid Insurance Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-pre-dtl",
      },
      explanation: "Prepaid insurance is an asset. Book basis ($24,000) > Tax basis ($0) for an asset creates a taxable temporary difference = DTL. The company deducted the full amount for tax, but will expense for books in future.",
      dropdownOptions: [
        { id: "opt-pre-dta", order: 1, text: "Deferred Tax Asset", isCorrect: false },
        { id: "opt-pre-dtl", order: 2, text: "Deferred Tax Liability", isCorrect: true },
        { id: "opt-pre-none", order: 3, text: "No deferred tax effect", isCorrect: false },
      ],
    },
    {
      id: "req-total-dta",
      order: 4,
      type: "numeric",
      label: "Total Deferred Tax Asset",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 118750,
        tolerance: 0,
      },
      explanation: "DTA items: Depreciation ($150,000 × 25% = $37,500) + Warranty ($80,000 × 25% = $20,000) + Bad Debt ($45,000 × 25% = $11,250) + Pension ($200,000 × 25% = $50,000) = $118,750. Note: Unearned revenue creates a DTL, not DTA.",
    },
    {
      id: "req-total-dtl",
      order: 5,
      type: "numeric",
      label: "Total Deferred Tax Liability",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 16000,
        tolerance: 0,
      },
      explanation: "DTL items: Prepaid Insurance ($24,000) + Unearned Revenue ($40,000) = $64,000 × 25% = $16,000",
    },
  ],
};

// FAR TBS 6: PPE Impairment (Medium - Journal Entry)
export const farImpairmentTBS: TBSQuestion = {
  id: "tbs-far-006",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Property, Plant & Equipment",
  subtopic: "Impairment of Long-Lived Assets",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Long-Lived Asset Impairment",
  scenarioText: `Techflow Industries owns manufacturing equipment that has shown indicators of impairment at December 31, Year 1. The equipment is part of an asset group used in the company's semiconductor division.

Review the asset information and impairment analysis in the exhibits. Prepare any required journal entry to record the impairment loss.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-asset-info",
      order: 1,
      title: "Asset Information",
      type: "table",
      content: {
        type: "table",
        title: "Manufacturing Equipment - Semiconductor Division",
        headers: ["Description", "Amount"],
        rows: [
          { cells: ["Original Cost", "$2,000,000"] },
          { cells: ["Accumulated Depreciation (12/31/Year 1)", "$800,000"] },
          { cells: ["Carrying Amount", "$1,200,000"] },
          { cells: ["Remaining Useful Life", "6 years"] },
        ],
      },
    },
    {
      id: "exhibit-impairment-test",
      order: 2,
      title: "Impairment Analysis",
      type: "table",
      content: {
        type: "table",
        title: "ASC 360 Impairment Test Results",
        headers: ["Measurement", "Amount"],
        rows: [
          { cells: ["Step 1: Undiscounted Future Cash Flows", "$1,100,000"] },
          { cells: ["Step 2: Fair Value (Level 2 inputs)", "$950,000"] },
          { cells: ["Carrying Amount", "$1,200,000"] },
        ],
        footnotes: [
          "Step 1 compares carrying amount to undiscounted cash flows",
          "If Step 1 fails (carrying amount > undiscounted CFs), proceed to Step 2",
          "Step 2 measures impairment loss as carrying amount minus fair value",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-impairment-debit",
      order: 1,
      type: "journal_debit",
      label: "Debit Entry",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-impairment-loss",
        accountName: "Impairment Loss",
        amount: 250000,
        tolerance: 0,
      },
      explanation: "Step 1: Carrying amount ($1,200,000) > Undiscounted cash flows ($1,100,000), so asset is impaired. Step 2: Impairment loss = Carrying amount ($1,200,000) - Fair value ($950,000) = $250,000",
    },
    {
      id: "req-impairment-credit",
      order: 2,
      type: "journal_credit",
      label: "Credit Entry",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-accum-impairment",
        accountName: "Accumulated Depreciation - Equipment",
        amount: 250000,
        tolerance: 0,
      },
      explanation: "The impairment loss reduces the carrying amount of the asset. This can be recorded as a credit to accumulated depreciation or directly to the asset account.",
    },
  ],
  journalAccounts: [
    { id: "acc-impairment-loss", name: "Impairment Loss", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "acc-accum-impairment", name: "Accumulated Depreciation - Equipment", type: "asset", normalBalance: "credit", isDistractor: false },
    { id: "acc-equipment", name: "Equipment", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-loss-disposal", name: "Loss on Disposal", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-depreciation-exp", name: "Depreciation Expense", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-goodwill", name: "Goodwill", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-other-expense", name: "Other Operating Expense", type: "expense", normalBalance: "debit", isDistractor: true },
  ],
};

// FAR TBS 7: Consolidations (Hard - Numeric Entry)
export const farConsolidationTBS: TBSQuestion = {
  id: "tbs-far-007",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Consolidations",
  subtopic: "Intercompany Transactions",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-III",
  title: "Consolidation Eliminations",
  scenarioText: `Parent Corp owns 80% of Subsidiary Inc. acquired several years ago. During Year 1, there were various intercompany transactions between the two companies.

Review the intercompany transaction information in the exhibits and calculate the amounts needed for the consolidation eliminating entries.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-intercompany",
      order: 1,
      title: "Intercompany Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Intercompany Activity",
        headers: ["Transaction", "Details"],
        rows: [
          { cells: ["Intercompany Sales", "Parent sold inventory to Subsidiary for $500,000 (cost $350,000)"] },
          { cells: ["Inventory Remaining", "40% of intercompany inventory remains in Subsidiary's ending inventory"] },
          { cells: ["Intercompany Loan", "Subsidiary borrowed $200,000 from Parent at 6% on July 1, Year 1"] },
          { cells: ["Management Fee", "Subsidiary paid Parent $120,000 management fee during Year 1"] },
          { cells: ["Dividend", "Subsidiary declared and paid dividends of $80,000 during Year 1"] },
        ],
      },
    },
    {
      id: "exhibit-balances",
      order: 2,
      title: "Related Account Balances",
      type: "table",
      content: {
        type: "table",
        title: "Selected Account Balances at December 31, Year 1",
        headers: ["Account", "Parent", "Subsidiary"],
        rows: [
          { cells: ["Sales Revenue", "$4,200,000", "$1,800,000"] },
          { cells: ["Cost of Goods Sold", "$2,520,000", "$1,080,000"] },
          { cells: ["Inventory", "$680,000", "$420,000"] },
          { cells: ["Interest Income", "$12,000", "$0"] },
          { cells: ["Interest Expense", "$0", "$6,000"] },
          { cells: ["Management Fee Income", "$120,000", "$0"] },
          { cells: ["Management Fee Expense", "$0", "$120,000"] },
          { cells: ["Dividend Income", "$64,000", "$0"] },
          { cells: ["Note Receivable from Sub", "$200,000", "$0"] },
          { cells: ["Note Payable to Parent", "$0", "$200,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sales-elim",
      order: 1,
      type: "numeric",
      label: "Intercompany Sales Elimination",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 500000,
        tolerance: 0,
      },
      explanation: "Eliminate the full $500,000 intercompany sale (debit Sales, credit COGS)",
    },
    {
      id: "req-unrealized-profit",
      order: 2,
      type: "numeric",
      label: "Unrealized Profit in Ending Inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 60000,
        tolerance: 0,
      },
      explanation: "Gross profit rate = ($500,000 - $350,000) / $500,000 = 30%. Remaining inventory = 40% × $500,000 = $200,000. Unrealized profit = $200,000 × 30% = $60,000",
    },
    {
      id: "req-interest-elim",
      order: 3,
      type: "numeric",
      label: "Intercompany Interest Elimination",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6000,
        tolerance: 0,
      },
      explanation: "Interest = $200,000 × 6% × 6/12 = $6,000. Eliminate interest income and expense (debit Interest Income, credit Interest Expense)",
    },
    {
      id: "req-dividend-elim",
      order: 4,
      type: "numeric",
      label: "Parent's Share of Subsidiary Dividend",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 64000,
        tolerance: 0,
      },
      explanation: "Parent's share = 80% × $80,000 = $64,000 dividend to eliminate",
    },
    {
      id: "req-nci-dividend",
      order: 5,
      type: "numeric",
      label: "NCI Share of Subsidiary Dividend",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 16000,
        tolerance: 0,
      },
      explanation: "Noncontrolling interest share = 20% × $80,000 = $16,000 dividend",
    },
    {
      id: "req-consolidated-inventory",
      order: 6,
      type: "numeric",
      label: "Consolidated Inventory (after elimination)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1040000,
        tolerance: 0,
      },
      explanation: "Combined inventory = $680,000 + $420,000 = $1,100,000. Less unrealized profit = $1,100,000 - $60,000 = $1,040,000",
    },
  ],
};

// ============================================
// AUD SECTION TBS
// ============================================

// AUD TBS 2: Audit Sampling (Medium - Numeric Entry)
export const audSamplingTBS: TBSQuestion = {
  id: "tbs-aud-002",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Evidence & Procedures",
  subtopic: "Audit Sampling",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Attributes Sampling for Tests of Controls",
  scenarioText: `You are planning an attributes sampling application to test the operating effectiveness of a client's control over purchase order approvals.

Review the sampling parameters and results in the exhibits. Calculate the required sample size and evaluate the results.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-sampling-params",
      order: 1,
      title: "Sampling Parameters",
      type: "table",
      content: {
        type: "table",
        title: "Attributes Sampling Plan - Purchase Order Approvals",
        headers: ["Parameter", "Value"],
        rows: [
          { cells: ["Population Size", "5,000 purchase orders"] },
          { cells: ["Expected Deviation Rate", "1%"] },
          { cells: ["Tolerable Deviation Rate", "5%"] },
          { cells: ["Risk of Assessing Control Risk Too Low", "5%"] },
          { cells: ["Confidence Level", "95%"] },
        ],
      },
    },
    {
      id: "exhibit-sample-size-table",
      order: 2,
      title: "Sample Size Table",
      type: "table",
      content: {
        type: "table",
        title: "AICPA Sample Size Table (5% Risk of Overreliance)",
        headers: ["Expected Deviation Rate", "Tolerable Rate 3%", "Tolerable Rate 4%", "Tolerable Rate 5%", "Tolerable Rate 6%"],
        rows: [
          { cells: ["0.00%", "99", "74", "59", "49"] },
          { cells: ["0.50%", "157", "103", "77", "64"] },
          { cells: ["1.00%", "*", "156", "93", "78"] },
          { cells: ["1.50%", "*", "*", "124", "103"] },
          { cells: ["2.00%", "*", "*", "181", "127"] },
        ],
        footnotes: [
          "* = Sample size too large to be cost-effective",
        ],
      },
    },
    {
      id: "exhibit-results",
      order: 3,
      title: "Sample Results",
      type: "memo",
      content: {
        type: "memo",
        from: "Audit Staff",
        to: "Audit Senior",
        date: "October 15, Year 1",
        subject: "Purchase Order Testing Results",
        body: `Testing of the sample has been completed. Results:

Sample Size Selected: 93 purchase orders
Deviations Found: 2 purchase orders without proper approval

One deviation was a $150 supply order signed by an unauthorized employee.
The second deviation was a $2,500 equipment purchase with a forged signature.

Please evaluate these results and provide guidance on the conclusion.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-sample-size",
      order: 1,
      type: "numeric",
      label: "Required Sample Size",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 93,
        tolerance: 0,
      },
      explanation: "From the sample size table, with 1% expected deviation rate and 5% tolerable deviation rate at 5% risk, sample size = 93",
    },
    {
      id: "req-sample-deviation-rate",
      order: 2,
      type: "numeric",
      label: "Sample Deviation Rate (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.15,
        tolerance: 0.05,
      },
      explanation: "Sample deviation rate = 2 deviations / 93 items = 2.15%",
    },
    {
      id: "req-upper-deviation",
      order: 3,
      type: "dropdown",
      label: "Is Upper Deviation Limit likely to exceed Tolerable Rate?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-udl-yes",
      },
      explanation: "With 2 deviations in a sample of 93 at 5% risk, the upper deviation limit would be approximately 6.2%. This exceeds the tolerable rate of 5%.",
      dropdownOptions: [
        { id: "opt-udl-yes", order: 1, text: "Yes - UDL exceeds tolerable rate", isCorrect: true },
        { id: "opt-udl-no", order: 2, text: "No - UDL is within tolerable rate", isCorrect: false },
        { id: "opt-udl-equal", order: 3, text: "UDL equals tolerable rate exactly", isCorrect: false },
      ],
    },
    {
      id: "req-conclusion",
      order: 4,
      type: "dropdown",
      label: "Sampling Conclusion",
      points: 2,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-conc-ineffective",
      },
      explanation: "Since the actual deviation rate (2.15%) exceeded the expected deviation rate (1%) and the upper deviation limit exceeds the tolerable rate, the auditor should conclude the control is not operating effectively.",
      dropdownOptions: [
        { id: "opt-conc-effective", order: 1, text: "Control is operating effectively", isCorrect: false },
        { id: "opt-conc-ineffective", order: 2, text: "Control is not operating effectively", isCorrect: true },
        { id: "opt-conc-expand", order: 3, text: "Expand sample size before concluding", isCorrect: false },
        { id: "opt-conc-inconclusive", order: 4, text: "Results are inconclusive", isCorrect: false },
      ],
    },
  ],
};

// AUD TBS 3: Going Concern Evaluation (Hard - Document Review)
export const audGoingConcernTBS: TBSQuestion = {
  id: "tbs-aud-003",
  section: "AUD",
  tbsType: "document_review",
  topic: "Completing the Audit",
  subtopic: "Going Concern Evaluation",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "AUD-IV",
  title: "Going Concern Assessment",
  scenarioText: `You are the engagement senior on the audit of Cascade Manufacturing Inc. for the year ended December 31, Year 1. During the completion phase, you identified several conditions that may indicate substantial doubt about the entity's ability to continue as a going concern.

Review the information in the exhibits and determine the appropriate audit conclusions and report modifications.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-financial-data",
      order: 1,
      title: "Financial Information",
      type: "table",
      content: {
        type: "table",
        title: "Cascade Manufacturing - Key Financial Data",
        headers: ["Metric", "Year 1", "Year 0", "Change"],
        rows: [
          { cells: ["Net Income (Loss)", "$(850,000)", "$125,000", "$(975,000)"] },
          { cells: ["Working Capital", "$(420,000)", "$580,000", "$(1,000,000)"] },
          { cells: ["Current Ratio", "0.72", "1.45", "(0.73)"] },
          { cells: ["Total Debt", "$3,200,000", "$2,100,000", "$1,100,000"] },
          { cells: ["Cash from Operations", "$(290,000)", "$410,000", "$(700,000)"] },
          { cells: ["Line of Credit Available", "$500,000", "$500,000", "-"] },
        ],
      },
    },
    {
      id: "exhibit-conditions",
      order: 2,
      title: "Conditions Identified",
      type: "text",
      content: {
        type: "text",
        title: "Going Concern Indicators",
        paragraphs: [
          "The following conditions were identified during the audit:",
          "",
          "1. Negative working capital of $420,000 with current ratio below 1.0",
          "2. Net loss of $850,000 in current year versus profit in prior year",
          "3. Negative cash flows from operations of $290,000",
          "4. Principal lender has expressed concern about loan covenant violations",
          "5. Key customer representing 35% of revenue filed for bankruptcy in January Year 2",
          "6. Company has drawn $400,000 of $500,000 available credit line",
        ],
      },
    },
    {
      id: "exhibit-management-plan",
      order: 3,
      title: "Management's Plans",
      type: "memo",
      content: {
        type: "memo",
        from: "CEO",
        to: "External Auditors",
        date: "February 15, Year 2",
        subject: "Management's Response to Going Concern Conditions",
        body: `In response to your inquiries regarding our financial condition, management has developed the following plans:

1. Cost Reduction: We have identified $400,000 in annual cost savings through workforce reduction (already implemented January Year 2).

2. Asset Sale: We are negotiating sale of our warehouse facility (net book value $600,000) for approximately $750,000. Letter of intent received but not binding.

3. New Financing: We have submitted a loan application to Second Regional Bank for $1,000,000. Preliminary discussions have been positive but no commitment received.

4. New Customers: Sales team is actively pursuing new accounts to replace lost revenue. No contracts signed yet.

Management believes these plans will adequately address the conditions you have identified. We request that no emphasis of matter paragraph be included in the audit report.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-substantial-doubt",
      order: 1,
      type: "dropdown",
      label: "Is there substantial doubt about going concern?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sd-yes",
      },
      explanation: "The combination of negative working capital, significant losses, negative operating cash flows, loan covenant concerns, and loss of major customer creates substantial doubt about going concern.",
      dropdownOptions: [
        { id: "opt-sd-yes", order: 1, text: "Yes, substantial doubt exists", isCorrect: true },
        { id: "opt-sd-no", order: 2, text: "No, conditions do not create substantial doubt", isCorrect: false },
        { id: "opt-sd-maybe", order: 3, text: "Cannot determine based on information provided", isCorrect: false },
      ],
    },
    {
      id: "req-mgmt-plans",
      order: 2,
      type: "dropdown",
      label: "Do management's plans adequately mitigate the substantial doubt?",
      points: 2,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-mp-no",
      },
      explanation: "Management's plans are not adequately supported: asset sale has only non-binding LOI, new financing has no commitment, and customer replacement has no signed contracts. Only the cost reduction has been implemented. Plans are not probable of being implemented.",
      dropdownOptions: [
        { id: "opt-mp-yes", order: 1, text: "Yes, plans adequately mitigate the doubt", isCorrect: false },
        { id: "opt-mp-no", order: 2, text: "No, plans are not adequately supported", isCorrect: true },
        { id: "opt-mp-partial", order: 3, text: "Plans partially mitigate but require monitoring", isCorrect: false },
      ],
    },
    {
      id: "req-disclosure",
      order: 3,
      type: "dropdown",
      label: "What disclosure is required in the financial statements?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-disc-full",
      },
      explanation: "When substantial doubt exists that is not alleviated by management's plans, the company must disclose the conditions giving rise to substantial doubt and management's plans.",
      dropdownOptions: [
        { id: "opt-disc-none", order: 1, text: "No disclosure required", isCorrect: false },
        { id: "opt-disc-full", order: 2, text: "Disclose conditions and management's plans", isCorrect: true },
        { id: "opt-disc-limited", order: 3, text: "Disclose only management's plans", isCorrect: false },
      ],
    },
    {
      id: "req-report-mod",
      order: 4,
      type: "dropdown",
      label: "What audit report modification is required?",
      points: 2,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-rep-eom",
      },
      explanation: "When substantial doubt about going concern exists and is not alleviated, the auditor must include an emphasis-of-matter paragraph (or separate section) in the audit report, assuming adequate disclosure is made. An unmodified opinion can still be issued if disclosures are adequate.",
      dropdownOptions: [
        { id: "opt-rep-unmod", order: 1, text: "Unmodified opinion with no modification", isCorrect: false },
        { id: "opt-rep-eom", order: 2, text: "Unmodified opinion with emphasis-of-matter paragraph", isCorrect: true },
        { id: "opt-rep-qualified", order: 3, text: "Qualified opinion", isCorrect: false },
        { id: "opt-rep-disclaimer", order: 4, text: "Disclaimer of opinion", isCorrect: false },
      ],
    },
  ],
};

// AUD TBS 4: Independence Evaluation (Medium - Document Review)
export const audIndependenceTBS: TBSQuestion = {
  id: "tbs-aud-004",
  section: "AUD",
  tbsType: "document_review",
  topic: "Professional Responsibilities & Ethics",
  subtopic: "Independence Requirements",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-I",
  title: "Independence Evaluation",
  scenarioText: `Your firm has been engaged to audit Summit Technology Corp., a non-issuer (non-public company), for the year ended December 31, Year 1. Before accepting the engagement, you must evaluate several independence matters.

Review the situations described in the exhibits and determine whether each would impair independence under AICPA standards.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-situations",
      order: 1,
      title: "Independence Situations",
      type: "text",
      content: {
        type: "text",
        title: "Situations Requiring Independence Evaluation",
        paragraphs: [
          "Situation A: The engagement partner's spouse owns 100 shares of Summit Technology stock (valued at $3,500). The partner's household net worth is approximately $2,000,000.",
          "",
          "Situation B: A staff accountant on the engagement recently graduated from college. Her father is the VP of Sales at Summit Technology.",
          "",
          "Situation C: Your firm provides bookkeeping services to Summit Technology, including posting adjusting entries prepared by Summit's management and preparing monthly financial statements from Summit's trial balance.",
          "",
          "Situation D: The audit manager's brother is the IT Director at Summit Technology. The manager will have no involvement in the audit engagement.",
          "",
          "Situation E: Your firm prepared Summit's federal and state income tax returns for Year 1, including determining positions to take on several uncertain tax matters.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-situation-a",
      order: 1,
      type: "dropdown",
      label: "Situation A - Partner's Spouse Stock Ownership",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-impaired",
      },
      explanation: "Any direct financial interest in an audit client by a covered member or their immediate family impairs independence, regardless of materiality.",
      dropdownOptions: [
        { id: "opt-a-impaired", order: 1, text: "Independence is impaired", isCorrect: true },
        { id: "opt-a-not-impaired", order: 2, text: "Independence is not impaired", isCorrect: false },
        { id: "opt-a-safeguards", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
    {
      id: "req-situation-b",
      order: 2,
      type: "dropdown",
      label: "Situation B - Staff Member's Father at Client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-impaired",
      },
      explanation: "A close relative (parent) in a key position at the client impairs independence for a covered member on the engagement. VP of Sales is typically considered a key position.",
      dropdownOptions: [
        { id: "opt-b-impaired", order: 1, text: "Independence is impaired", isCorrect: true },
        { id: "opt-b-not-impaired", order: 2, text: "Independence is not impaired", isCorrect: false },
        { id: "opt-b-safeguards", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
    {
      id: "req-situation-c",
      order: 3,
      type: "dropdown",
      label: "Situation C - Bookkeeping Services",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-not-impaired",
      },
      explanation: "Bookkeeping services do not impair independence for non-issuers if: (1) the client accepts responsibility, (2) the CPA doesn't make management decisions, and (3) all underlying transactions are authorized by management. Posting management-prepared entries and preparing statements from client's trial balance meets these criteria.",
      dropdownOptions: [
        { id: "opt-c-impaired", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-c-not-impaired", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-c-safeguards", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
    {
      id: "req-situation-d",
      order: 4,
      type: "dropdown",
      label: "Situation D - Manager's Brother at Client",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-not-impaired",
      },
      explanation: "Since the manager with the close relative relationship will have no involvement in the engagement, independence is not impaired. The threat is eliminated by removing the individual from the engagement team.",
      dropdownOptions: [
        { id: "opt-d-impaired", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-d-not-impaired", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-d-safeguards", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
    {
      id: "req-situation-e",
      order: 5,
      type: "dropdown",
      label: "Situation E - Tax Services",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-not-impaired",
      },
      explanation: "Tax compliance services, including recommending tax positions, do not impair independence for non-issuers as long as management reviews and approves the returns. This is a routine service for audit clients.",
      dropdownOptions: [
        { id: "opt-e-impaired", order: 1, text: "Independence is impaired", isCorrect: false },
        { id: "opt-e-not-impaired", order: 2, text: "Independence is not impaired", isCorrect: true },
        { id: "opt-e-safeguards", order: 3, text: "Impaired unless safeguards applied", isCorrect: false },
      ],
    },
  ],
};

// AUD TBS 5: Journal Entry Testing (Medium - Journal Entry)
export const audJournalEntryTBS: TBSQuestion = {
  id: "tbs-aud-005",
  section: "AUD",
  tbsType: "journal_entry",
  topic: "Evidence & Procedures",
  subtopic: "Substantive Testing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-III",
  title: "Proposed Audit Adjustments",
  scenarioText: `During your audit of Meridian Corp. for Year 1, you identified several misstatements that require adjustment. The client uses the periodic inventory system.

Review the audit findings in the exhibits and prepare the adjusting journal entries required.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-findings",
      order: 1,
      title: "Audit Findings",
      type: "text",
      content: {
        type: "text",
        title: "Summary of Identified Misstatements",
        paragraphs: [
          "Finding 1: During the inventory observation, the auditor noted that goods costing $45,000 were shipped to Customer XYZ on December 30, Year 1 (terms FOB destination). The goods arrived at the customer on January 3, Year 2. Meridian recorded the sale ($60,000) and removed the inventory on December 30.",
          "",
          "Finding 2: Meridian did not record a $15,000 invoice received from a vendor on December 28, Year 1 for consulting services rendered in December. The invoice was paid on January 15, Year 2.",
          "",
          "Note: The client's income tax rate is 25%.",
        ],
      },
    },
    {
      id: "exhibit-client-balances",
      order: 2,
      title: "Relevant Account Balances",
      type: "table",
      content: {
        type: "table",
        title: "Selected Account Balances (Before Adjustment)",
        headers: ["Account", "Balance"],
        rows: [
          { cells: ["Sales Revenue", "$4,500,000 CR"] },
          { cells: ["Accounts Receivable", "$680,000 DR"] },
          { cells: ["Inventory", "$520,000 DR"] },
          { cells: ["Cost of Goods Sold", "$2,850,000 DR"] },
          { cells: ["Accounts Payable", "$295,000 CR"] },
          { cells: ["Consulting Expense", "$180,000 DR"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-finding1-debit",
      order: 1,
      type: "journal_debit",
      label: "Finding 1 - Debit Entry (Revenue Reversal)",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-sales",
        accountName: "Sales Revenue",
        amount: 60000,
        tolerance: 0,
      },
      explanation: "The sale should not be recognized until goods reach the customer (FOB destination = title passes on delivery). Debit Sales to reverse the premature revenue recognition.",
    },
    {
      id: "req-finding1-credit",
      order: 2,
      type: "journal_credit",
      label: "Finding 1 - Credit Entry (Revenue Reversal)",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-ar",
        accountName: "Accounts Receivable",
        amount: 60000,
        tolerance: 0,
      },
      explanation: "Credit Accounts Receivable to reverse the receivable that should not have been recorded.",
    },
    {
      id: "req-finding2-debit",
      order: 3,
      type: "journal_debit",
      label: "Finding 2 - Debit Entry (Expense Accrual)",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-consulting",
        accountName: "Consulting Expense",
        amount: 15000,
        tolerance: 0,
      },
      explanation: "Services were rendered in December, so the expense should be recorded in Year 1 per the matching principle.",
    },
    {
      id: "req-finding2-credit",
      order: 4,
      type: "journal_credit",
      label: "Finding 2 - Credit Entry (Expense Accrual)",
      points: 1,
      correctAnswer: {
        type: "journal",
        accountId: "acc-ap",
        accountName: "Accounts Payable",
        amount: 15000,
        tolerance: 0,
      },
      explanation: "Credit Accounts Payable to record the liability for services received but not yet paid.",
    },
  ],
  journalAccounts: [
    { id: "acc-sales", name: "Sales Revenue", type: "revenue", normalBalance: "credit", isDistractor: false },
    { id: "acc-ar", name: "Accounts Receivable", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-inventory", name: "Inventory", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-cogs", name: "Cost of Goods Sold", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-consulting", name: "Consulting Expense", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "acc-ap", name: "Accounts Payable", type: "liability", normalBalance: "credit", isDistractor: false },
    { id: "acc-accrued-exp", name: "Accrued Expenses", type: "liability", normalBalance: "credit", isDistractor: true },
    { id: "acc-prepaid", name: "Prepaid Expenses", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-deferred-rev", name: "Deferred Revenue", type: "liability", normalBalance: "credit", isDistractor: true },
  ],
};

// AUD TBS 6: Review Engagement (Easy - Document Review)
export const audReviewEngagementTBS: TBSQuestion = {
  id: "tbs-aud-006",
  section: "AUD",
  tbsType: "document_review",
  topic: "Other Engagements",
  subtopic: "Reviews of Financial Statements",
  difficulty: "easy",
  skillLevel: "remembering_understanding",
  contentArea: "AUD-IV",
  title: "Review Engagement Report",
  scenarioText: `Your firm has completed a review engagement for Parkside Services LLC, a non-issuer, for the year ended December 31, Year 1. You are reviewing the draft review report before issuance.

Select the correct wording for each highlighted section of the report.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-review-report",
      order: 1,
      title: "Draft Review Report",
      type: "text",
      content: {
        type: "text",
        title: "Independent Accountant's Review Report",
        paragraphs: [
          "To the Members of Parkside Services LLC:",
          "",
          "We have reviewed the accompanying financial statements of Parkside Services LLC, which comprise the balance sheet as of December 31, Year 1, and the related statements of income, changes in members' equity, and cash flows for the year then ended, and the related notes to the financial statements.",
          "",
          "Management's Responsibility",
          "",
          "Management is responsible for the preparation and fair presentation of these financial statements in accordance with [DROPDOWN:1]; this responsibility includes designing, implementing, and maintaining internal control relevant to the preparation and fair presentation of financial statements that are free from material misstatement, whether due to fraud or error.",
          "",
          "Accountant's Responsibility",
          "",
          "Our responsibility is to conduct the review engagement in accordance with Statements on Standards for Accounting and Review Services promulgated by the Accounting and Review Services Committee of the AICPA. Those standards require us to perform procedures to obtain [DROPDOWN:2] assurance about whether there are any material modifications that should be made to the financial statements.",
          "",
          "A review of financial statements includes primarily applying [DROPDOWN:3] to financial data and making inquiries of company management. A review is substantially less in scope than an audit and consequently does not enable us to obtain assurance that we would become aware of all significant matters. Accordingly, we do not express [DROPDOWN:4].",
          "",
          "Conclusion",
          "",
          "Based on our review, we are not aware of any material modifications that should be made to the accompanying financial statements in order for them to be in accordance with accounting principles generally accepted in the United States of America.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dropdown-1",
      order: 1,
      type: "dropdown",
      label: "Framework Reference",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-1-gaap",
      },
      explanation: "The standard phrase for the financial reporting framework is 'accounting principles generally accepted in the United States of America'.",
      dropdownOptions: [
        { id: "opt-1-gaap", order: 1, text: "accounting principles generally accepted in the United States of America", isCorrect: true },
        { id: "opt-1-ifrs", order: 2, text: "International Financial Reporting Standards", isCorrect: false },
        { id: "opt-1-gaas", order: 3, text: "generally accepted auditing standards", isCorrect: false },
        { id: "opt-1-ssars", order: 4, text: "Statements on Standards for Accounting and Review Services", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-2",
      order: 2,
      type: "dropdown",
      label: "Assurance Level",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-2-limited",
      },
      explanation: "A review engagement provides limited assurance (negative assurance), not reasonable assurance like an audit.",
      dropdownOptions: [
        { id: "opt-2-reasonable", order: 1, text: "reasonable", isCorrect: false },
        { id: "opt-2-limited", order: 2, text: "limited", isCorrect: true },
        { id: "opt-2-absolute", order: 3, text: "absolute", isCorrect: false },
        { id: "opt-2-moderate", order: 4, text: "moderate", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-3",
      order: 3,
      type: "dropdown",
      label: "Review Procedures",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-3-analytical",
      },
      explanation: "Review engagements primarily consist of inquiry and analytical procedures.",
      dropdownOptions: [
        { id: "opt-3-substantive", order: 1, text: "substantive tests", isCorrect: false },
        { id: "opt-3-analytical", order: 2, text: "analytical procedures", isCorrect: true },
        { id: "opt-3-tests", order: 3, text: "tests of controls", isCorrect: false },
        { id: "opt-3-inspection", order: 4, text: "inspection procedures", isCorrect: false },
      ],
    },
    {
      id: "req-dropdown-4",
      order: 4,
      type: "dropdown",
      label: "Expression of Assurance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-4-opinion",
      },
      explanation: "In a review engagement, the accountant does not express an opinion (that's for audits). The review report provides a conclusion with limited assurance.",
      dropdownOptions: [
        { id: "opt-4-opinion", order: 1, text: "an audit opinion", isCorrect: true },
        { id: "opt-4-conclusion", order: 2, text: "a conclusion", isCorrect: false },
        { id: "opt-4-assurance", order: 3, text: "any assurance", isCorrect: false },
        { id: "opt-4-findings", order: 4, text: "findings", isCorrect: false },
      ],
    },
  ],
};

// ============================================
// REG SECTION TBS
// ============================================

// REG TBS 1: Business Law - Contracts (Medium - Document Review)
export const regContractsTBS: TBSQuestion = {
  id: "tbs-reg-001",
  section: "REG",
  tbsType: "document_review",
  topic: "Business Law",
  subtopic: "Contracts",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "REG-II",
  title: "Contract Formation Analysis",
  scenarioText: `You are a CPA advising a client on various business contract situations. Review each scenario and determine the legal outcome based on contract law principles.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "Contract Scenarios",
      type: "text",
      content: {
        type: "text",
        title: "Business Contract Situations",
        paragraphs: [
          "Scenario A: On Monday, Seller offered to sell 100 widgets to Buyer for $5,000. The offer stated it would remain open for 10 days. On Wednesday, before Buyer responded, Seller sold the widgets to a third party. On Thursday, Buyer attempted to accept the offer.",
          "",
          "Scenario B: Contractor agreed to build a garage for Homeowner for $25,000. After the contract was signed, Contractor discovered that the soil conditions required an additional $3,000 in foundation work. Contractor told Homeowner he would not proceed unless Homeowner agreed to pay $28,000. Homeowner agreed to the new price in writing.",
          "",
          "Scenario C: On June 1, Merchant received a signed written offer from Supplier to sell goods for $10,000. The offer stated it would remain open for 15 days. On June 8, Merchant called to accept but learned Supplier had sold the goods to another party.",
          "",
          "Scenario D: Minor (age 17) purchased a car from Dealer for $15,000. After driving it for two months and putting 3,000 miles on it, Minor decided to disaffirm the contract and return the car.",
          "",
          "Scenario E: A signed contract for the sale of land did not specify the price. Both parties intended to negotiate the price later but never did. The fair market value of the land is determinable.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-scenario-a",
      order: 1,
      type: "dropdown",
      label: "Scenario A - Was a valid contract formed?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-no",
      },
      explanation: "No contract was formed. Under common law, an offer can be revoked anytime before acceptance unless supported by consideration (an option contract). Seller's sale to the third party was an effective revocation by conduct.",
      dropdownOptions: [
        { id: "opt-a-yes", order: 1, text: "Yes - Buyer's acceptance was valid", isCorrect: false },
        { id: "opt-a-no", order: 2, text: "No - Offer was effectively revoked", isCorrect: true },
        { id: "opt-a-void", order: 3, text: "Contract is voidable by Seller", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-b",
      order: 2,
      type: "dropdown",
      label: "Scenario B - Is the modified price enforceable?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-no",
      },
      explanation: "Under the pre-existing duty rule, a promise to pay more for something a party is already obligated to do is not enforceable because there is no new consideration. Homeowner's promise to pay more is not binding.",
      dropdownOptions: [
        { id: "opt-b-yes", order: 1, text: "Yes - Written modification is valid", isCorrect: false },
        { id: "opt-b-no", order: 2, text: "No - Lacks consideration for modification", isCorrect: true },
        { id: "opt-b-partial", order: 3, text: "Enforceable for the additional $3,000 only", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-c",
      order: 3,
      type: "dropdown",
      label: "Scenario C - Was Supplier's revocation effective?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-no",
      },
      explanation: "Under UCC 2-205 (Firm Offer Rule), a signed written offer by a merchant to buy or sell goods that states it will be held open is irrevocable for the stated period (up to 3 months) without consideration. Supplier is bound by the offer.",
      dropdownOptions: [
        { id: "opt-c-yes", order: 1, text: "Yes - Offer was revocable", isCorrect: false },
        { id: "opt-c-no", order: 2, text: "No - UCC Firm Offer Rule applies", isCorrect: true },
        { id: "opt-c-depends", order: 3, text: "Depends on whether goods were unique", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-d",
      order: 4,
      type: "dropdown",
      label: "Scenario D - What must Minor return to disaffirm?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-car",
      },
      explanation: "A minor may disaffirm a contract and must return any property received. However, the minor is entitled to full refund regardless of use, wear and tear, or depreciation (majority rule). Minor returns the car as-is and gets full $15,000 back.",
      dropdownOptions: [
        { id: "opt-d-car", order: 1, text: "The car in its current condition", isCorrect: true },
        { id: "opt-d-value", order: 2, text: "The car plus compensation for depreciation", isCorrect: false },
        { id: "opt-d-nothing", order: 3, text: "Nothing - Minor can keep the car and money", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-e",
      order: 5,
      type: "dropdown",
      label: "Scenario E - Is the land contract enforceable?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-no",
      },
      explanation: "A contract for the sale of land that lacks an essential term (price) is unenforceable. Unlike UCC contracts for goods where a reasonable price can be implied, real estate contracts require the price to be stated or determinable by the contract terms.",
      dropdownOptions: [
        { id: "opt-e-yes", order: 1, text: "Yes - Court will imply fair market value", isCorrect: false },
        { id: "opt-e-no", order: 2, text: "No - Missing essential term (price)", isCorrect: true },
        { id: "opt-e-void", order: 3, text: "Void due to Statute of Frauds", isCorrect: false },
      ],
    },
  ],
};

// REG TBS 2: Individual Taxation - AGI Calculation (Easy - Numeric Entry)
export const regAGICalculationTBS: TBSQuestion = {
  id: "tbs-reg-002",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Individual Taxation",
  subtopic: "Adjustments to Income",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "REG-IV",
  title: "Adjusted Gross Income Calculation",
  scenarioText: `Maria Chen is a single taxpayer preparing her Year 1 federal income tax return. Using the information provided in the exhibits, calculate her Adjusted Gross Income (AGI).`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-income-items",
      order: 1,
      title: "Income Information",
      type: "table",
      content: {
        type: "table",
        title: "Maria Chen - Year 1 Income Items",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Wages (W-2)", "$85,000"] },
          { cells: ["Interest from savings account", "$1,200"] },
          { cells: ["Qualified dividends", "$2,500"] },
          { cells: ["State income tax refund (itemized last year)", "$800"] },
          { cells: ["Alimony received (divorce finalized 2015)", "$12,000"] },
          { cells: ["Unemployment compensation", "$3,500"] },
          { cells: ["Municipal bond interest", "$1,500"] },
          { cells: ["Gambling winnings", "$2,000"] },
        ],
      },
    },
    {
      id: "exhibit-adjustments",
      order: 2,
      title: "Adjustment Items",
      type: "table",
      content: {
        type: "table",
        title: "Maria Chen - Year 1 Potential Adjustments",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Traditional IRA contribution (eligible)", "$6,500"] },
          { cells: ["Student loan interest paid", "$2,200"] },
          { cells: ["Health Savings Account contribution", "$3,850"] },
          { cells: ["Self-employment tax (if applicable)", "$0"] },
          { cells: ["Educator expenses", "$0"] },
        ],
        footnotes: [
          "Maria is under age 50 and covered by an employer retirement plan",
          "Maria's MAGI for student loan interest deduction limit: assume fully deductible",
          "Maria has qualifying HDHP coverage for HSA",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-income",
      order: 1,
      type: "numeric",
      label: "Total Gross Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 107000,
        tolerance: 0,
      },
      explanation: "Gross Income = Wages ($85,000) + Interest ($1,200) + Dividends ($2,500) + State refund ($800) + Alimony ($12,000, pre-2019 divorce) + Unemployment ($3,500) + Gambling ($2,000) = $107,000. Municipal bond interest is excluded from gross income.",
    },
    {
      id: "req-ira-deduction",
      order: 2,
      type: "numeric",
      label: "Deductible IRA Contribution",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6500,
        tolerance: 0,
      },
      explanation: "Maria can deduct the full $6,500 IRA contribution. While she has an employer plan, her income may be below the phase-out threshold, and the question states she is eligible.",
    },
    {
      id: "req-student-loan",
      order: 3,
      type: "numeric",
      label: "Student Loan Interest Deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2200,
        tolerance: 0,
      },
      explanation: "Student loan interest is deductible up to $2,500. Maria paid $2,200, which is fully deductible since the question states it is fully deductible.",
    },
    {
      id: "req-total-adjustments",
      order: 4,
      type: "numeric",
      label: "Total Adjustments to Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12550,
        tolerance: 0,
      },
      explanation: "Total adjustments = IRA ($6,500) + Student loan interest ($2,200) + HSA ($3,850) = $12,550",
    },
    {
      id: "req-agi",
      order: 5,
      type: "numeric",
      label: "Adjusted Gross Income (AGI)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 94450,
        tolerance: 0,
      },
      explanation: "AGI = Gross Income ($107,000) - Total Adjustments ($12,550) = $94,450",
    },
  ],
};

// REG TBS 3: Property Transactions - Capital Gains (Medium - Numeric Entry)
export const regCapitalGainsTBS: TBSQuestion = {
  id: "tbs-reg-003",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Property Transactions",
  subtopic: "Capital Gains & Losses",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-III",
  title: "Capital Gain and Loss Netting",
  scenarioText: `David Thompson had several stock transactions during Year 1. Calculate the net capital gain or loss and the amount reportable on his tax return.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Stock Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Stock Sales",
        headers: ["Stock", "Purchase Date", "Sale Date", "Proceeds", "Cost Basis"],
        rows: [
          { cells: ["Alpha Corp", "03/15/Year 0", "02/20/Year 1", "$15,000", "$10,000"] },
          { cells: ["Beta Inc", "06/01/Year 0", "08/15/Year 1", "$8,000", "$12,000"] },
          { cells: ["Gamma LLC", "11/10/Year 1", "12/05/Year 1", "$6,000", "$9,000"] },
          { cells: ["Delta Co", "01/20/Year 0", "07/30/Year 1", "$25,000", "$18,000"] },
          { cells: ["Echo Partners", "09/15/Year 1", "11/22/Year 1", "$4,500", "$7,500"] },
        ],
      },
    },
    {
      id: "exhibit-carryover",
      order: 2,
      title: "Prior Year Information",
      type: "memo",
      content: {
        type: "memo",
        from: "Tax Preparer Notes",
        to: "File",
        date: "March Year 2",
        subject: "David Thompson - Capital Loss Carryover",
        body: `From Year 0 tax return:

Capital Loss Carryover to Year 1: $2,000 long-term capital loss

No short-term capital loss carryover.

David has no capital loss limitation due to insufficient income - the full carryover is available.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-stcg",
      order: 1,
      type: "numeric",
      label: "Net Short-Term Capital Gain/(Loss)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -6000,
        tolerance: 0,
      },
      explanation: "STCG: Gamma ($6,000 - $9,000 = -$3,000) + Echo ($4,500 - $7,500 = -$3,000) = -$6,000 net short-term loss",
    },
    {
      id: "req-ltcg",
      order: 2,
      type: "numeric",
      label: "Net Long-Term Capital Gain/(Loss) before carryover",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8000,
        tolerance: 0,
      },
      explanation: "LTCG: Alpha ($15,000 - $10,000 = $5,000) + Beta ($8,000 - $12,000 = -$4,000) + Delta ($25,000 - $18,000 = $7,000) = $8,000 net long-term gain",
    },
    {
      id: "req-ltcg-after-carryover",
      order: 3,
      type: "numeric",
      label: "Net Long-Term Gain after applying carryover",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6000,
        tolerance: 0,
      },
      explanation: "Net LTCG after carryover = $8,000 - $2,000 (LTCL carryover) = $6,000",
    },
    {
      id: "req-net-capital",
      order: 4,
      type: "numeric",
      label: "Overall Net Capital Gain/(Loss)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Net STCL (-$6,000) offsets Net LTCG ($6,000) = $0 net capital gain/loss",
    },
    {
      id: "req-deductible",
      order: 5,
      type: "numeric",
      label: "Capital Loss Deductible Against Ordinary Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Since the overall result is $0 (gains offset losses), there is no net capital loss to deduct against ordinary income (max $3,000).",
    },
  ],
};

// REG TBS 4: Corporate Taxation - Distributions (Medium - Numeric Entry)
export const regCorporateDistributionsTBS: TBSQuestion = {
  id: "tbs-reg-004",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Corporate Taxation",
  subtopic: "Distributions to Shareholders",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-V",
  title: "Corporate Distribution Analysis",
  scenarioText: `Vertex Corporation (a C corporation) made distributions to its sole shareholder, Janet, during Year 1. Calculate the tax treatment of the distributions received.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-corp-info",
      order: 1,
      title: "Corporation Information",
      type: "table",
      content: {
        type: "table",
        title: "Vertex Corporation - Year 1 Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Current Year E&P (before distributions)", "$45,000"] },
          { cells: ["Accumulated E&P (beginning of year)", "$85,000"] },
          { cells: ["Cash distribution to Janet - March 15", "$60,000"] },
          { cells: ["Cash distribution to Janet - September 30", "$90,000"] },
          { cells: ["Janet's stock basis (beginning of year)", "$25,000"] },
        ],
      },
    },
    {
      id: "exhibit-rules",
      order: 2,
      title: "Distribution Rules",
      type: "text",
      content: {
        type: "text",
        title: "Corporate Distribution Ordering Rules",
        paragraphs: [
          "Distributions are treated in the following order:",
          "",
          "1. DIVIDEND to the extent of current E&P (allocated pro-rata to all distributions during the year)",
          "",
          "2. DIVIDEND to the extent of accumulated E&P (in chronological order)",
          "",
          "3. TAX-FREE RETURN OF CAPITAL to the extent of stock basis",
          "",
          "4. CAPITAL GAIN to the extent distribution exceeds basis",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-distribution",
      order: 1,
      type: "numeric",
      label: "Total Distributions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 150000,
        tolerance: 0,
      },
      explanation: "Total distributions = $60,000 + $90,000 = $150,000",
    },
    {
      id: "req-dividend-portion",
      order: 2,
      type: "numeric",
      label: "Total Dividend Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 130000,
        tolerance: 0,
      },
      explanation: "Dividend = Current E&P ($45,000) + Accumulated E&P ($85,000) = $130,000. Current E&P is allocated pro-rata, but total dividend is limited to total E&P available.",
    },
    {
      id: "req-return-of-capital",
      order: 3,
      type: "numeric",
      label: "Tax-Free Return of Capital",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "Amount exceeding E&P = $150,000 - $130,000 = $20,000. This reduces Janet's basis from $25,000 to $5,000. Since it doesn't exceed basis, it's tax-free return of capital.",
    },
    {
      id: "req-capital-gain",
      order: 4,
      type: "numeric",
      label: "Capital Gain",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Excess over basis would be capital gain. Return of capital ($20,000) < Basis ($25,000), so no capital gain.",
    },
  ],
};

// REG TBS 5: Partnership Basis (Hard - Numeric Entry)
export const regPartnershipBasisTBS: TBSQuestion = {
  id: "tbs-reg-005",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Partnership Taxation",
  subtopic: "Partner Basis Calculations",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "REG-V",
  title: "Partner's Basis Calculation",
  scenarioText: `Kevin is a 40% partner in KLM Partnership. Calculate Kevin's adjusted basis in his partnership interest at year-end after all transactions.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-basis-info",
      order: 1,
      title: "Basis Information",
      type: "table",
      content: {
        type: "table",
        title: "Kevin's Partnership Interest - Year 1",
        headers: ["Item", "Total Partnership", "Kevin's Share (40%)"],
        rows: [
          { cells: ["Beginning basis (Kevin only)", "-", "$75,000"] },
          { cells: ["Ordinary business income", "$200,000", "$80,000"] },
          { cells: ["Tax-exempt interest income", "$10,000", "$4,000"] },
          { cells: ["Section 1231 gain", "$15,000", "$6,000"] },
          { cells: ["Charitable contributions", "$8,000", "$3,200"] },
          { cells: ["Guaranteed payments to Kevin", "$30,000", "$30,000"] },
          { cells: ["Cash distribution to Kevin", "-", "$25,000"] },
        ],
      },
    },
    {
      id: "exhibit-liabilities",
      order: 2,
      title: "Liability Changes",
      type: "table",
      content: {
        type: "table",
        title: "Partnership Liabilities",
        headers: ["Liability Type", "Beginning", "Ending", "Change"],
        rows: [
          { cells: ["Recourse liabilities", "$100,000", "$140,000", "+$40,000"] },
          { cells: ["Nonrecourse liabilities", "$50,000", "$30,000", "-$20,000"] },
        ],
        footnotes: [
          "Kevin shares in all liabilities based on his 40% interest",
          "Recourse liabilities are allocated based on economic risk of loss",
          "Kevin bears the economic risk for his share of recourse debt",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-income-increase",
      order: 1,
      type: "numeric",
      label: "Basis increase from income items",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90000,
        tolerance: 0,
      },
      explanation: "Basis increases: Ordinary income ($80,000) + Tax-exempt interest ($4,000) + Sec 1231 gain ($6,000) = $90,000. Note: Guaranteed payments are included in ordinary income but do not separately increase basis.",
    },
    {
      id: "req-deduction-decrease",
      order: 2,
      type: "numeric",
      label: "Basis decrease from deduction items",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3200,
        tolerance: 0,
      },
      explanation: "Basis decreases from deductions: Charitable contributions ($3,200). This is a separately stated item that reduces basis.",
    },
    {
      id: "req-distribution-decrease",
      order: 3,
      type: "numeric",
      label: "Basis decrease from distributions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Cash distributions reduce basis: $25,000",
    },
    {
      id: "req-liability-adjustment",
      order: 4,
      type: "numeric",
      label: "Net basis adjustment from liability changes",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8000,
        tolerance: 0,
      },
      explanation: "Liability changes: Recourse increase ($40,000 × 40% = $16,000 increase) + Nonrecourse decrease ($20,000 × 40% = $8,000 decrease) = Net $8,000 increase",
    },
    {
      id: "req-ending-basis",
      order: 5,
      type: "numeric",
      label: "Kevin's Ending Basis",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 144800,
        tolerance: 0,
      },
      explanation: "Ending basis = Beginning ($75,000) + Income items ($90,000) - Deductions ($3,200) - Distributions ($25,000) + Net liability change ($8,000) = $144,800",
    },
  ],
};

// REG TBS 6: Ethics - Circular 230 (Medium - Research)
export const regCircular230TBS: TBSQuestion = {
  id: "tbs-reg-006",
  section: "REG",
  tbsType: "research",
  topic: "Ethics & Professional Responsibility",
  subtopic: "Treasury Circular 230",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-I",
  title: "Circular 230 Research",
  scenarioText: `A CPA is preparing a tax return for a client who wants to take an aggressive position on a deduction. The CPA needs to determine the minimum standard required for taking a tax return position under Circular 230.

Required: Research the authoritative guidance and identify the citation that describes the standard for tax return positions.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-scenario",
      order: 1,
      title: "Client Situation",
      type: "memo",
      content: {
        type: "memo",
        from: "Tax Manager",
        to: "Tax Staff",
        date: "March 1, Year 2",
        subject: "Client Tax Position Question",
        body: `Our client, Riverdale Industries, wants to claim a home office deduction for their CEO. The CEO works from home approximately 30% of the time but also has a dedicated office at the company headquarters.

The client believes they can deduct expenses for the home office under IRC Section 280A, but I'm uncertain whether this position meets the requirements under Circular 230 for us to sign the return.

Please research the applicable standard that practitioners must meet when taking positions on tax returns. We need to document our authority for any position we take.

Key question: What is the minimum confidence level required for a practitioner to sign a return with this position?`,
      },
    },
  ],
  requirements: [
    {
      id: "req-citation",
      order: 1,
      type: "citation",
      label: "Circular 230 Citation",
      description: "Identify the section of Circular 230 that establishes the standard for tax return positions",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "Treasury",
        topicCode: "Circular 230 Section 10.34",
        alternativeCitations: [
          { source: "Treasury", topicCode: "10.34" },
          { source: "Treasury", topicCode: "Circ. 230 §10.34" },
          { source: "Treasury", topicCode: "31 CFR 10.34" },
        ],
      },
      explanation: "Circular 230 Section 10.34 establishes the standards for tax return positions. It requires that a practitioner must have a reasonable belief that the position has a realistic possibility of being sustained on its merits, or that there is a reasonable basis for the position and it is disclosed. For undisclosed positions, the 'substantial authority' or 'more likely than not' standards may apply depending on the type of position.",
      hint: "Look in Circular 230, specifically the section dealing with standards with respect to tax returns and documents.",
    },
  ],
};

// ============================================
// TCP SECTION TBS (Tax Compliance & Planning)
// ============================================

// TCP TBS 1: Entity Selection (Medium - Document Review)
export const tcpEntitySelectionTBS: TBSQuestion = {
  id: "tbs-tcp-001",
  section: "TCP",
  tbsType: "document_review",
  topic: "Entity Tax Planning",
  subtopic: "Entity Selection",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "TCP-II",
  title: "Entity Selection Analysis",
  scenarioText: `Your client, Dr. Sarah Mitchell, is a physician planning to open a new medical practice. She wants you to analyze the tax implications of different entity structures. Review the scenarios and select the most appropriate entity type.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-client-info",
      order: 1,
      title: "Client Information",
      type: "table",
      content: {
        type: "table",
        title: "Dr. Mitchell's Practice Planning Data",
        headers: ["Item", "Details"],
        rows: [
          { cells: ["Expected Net Income (Year 1)", "$350,000"] },
          { cells: ["Number of Owners", "1 (Dr. Mitchell only)"] },
          { cells: ["Desired Salary", "$200,000"] },
          { cells: ["Plans to Reinvest Profits", "Yes, for equipment"] },
          { cells: ["Liability Concerns", "High (medical malpractice)"] },
          { cells: ["Plans to Sell Practice", "Possibly in 10-15 years"] },
          { cells: ["Retirement Planning Priority", "High"] },
        ],
      },
    },
    {
      id: "exhibit-tax-rates",
      order: 2,
      title: "Tax Rate Information",
      type: "table",
      content: {
        type: "table",
        title: "Applicable Tax Rates",
        headers: ["Rate Type", "Amount"],
        rows: [
          { cells: ["Individual Top Marginal Rate", "37%"] },
          { cells: ["Corporate Flat Rate", "21%"] },
          { cells: ["Self-Employment Tax Rate", "15.3% (up to wage base)"] },
          { cells: ["QBI Deduction", "20% (subject to limitations)"] },
          { cells: ["FICA (Employer + Employee)", "15.3% (up to wage base)"] },
        ],
        footnotes: [
          "QBI deduction is limited for specified service trades or businesses (SSTBs) above certain income thresholds",
          "Medical practices are classified as SSTBs",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sstb-impact",
      order: 1,
      type: "dropdown",
      label: "Does SSTB classification affect QBI deduction eligibility?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-sstb-yes",
      },
      explanation: "Yes, medical practices are Specified Service Trades or Businesses (SSTBs). At $350,000 income, Dr. Mitchell exceeds the threshold where QBI deduction begins to phase out for SSTBs, potentially eliminating the deduction entirely.",
      dropdownOptions: [
        { id: "opt-sstb-yes", order: 1, text: "Yes - QBI deduction is limited or eliminated", isCorrect: true },
        { id: "opt-sstb-no", order: 2, text: "No - Full 20% QBI deduction available", isCorrect: false },
        { id: "opt-sstb-partial", order: 3, text: "Partial deduction at reduced rate", isCorrect: false },
      ],
    },
    {
      id: "req-best-entity",
      order: 2,
      type: "dropdown",
      label: "What entity type would likely provide the best overall tax result?",
      points: 2,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-entity-scorp",
      },
      explanation: "An S Corporation would likely provide the best result. It offers liability protection, allows reasonable salary to reduce self-employment taxes on distributions, and avoids double taxation. As an SSTB, QBI benefits are limited anyway, so pass-through taxation with salary/distribution planning is optimal.",
      dropdownOptions: [
        { id: "opt-entity-sole", order: 1, text: "Sole Proprietorship", isCorrect: false },
        { id: "opt-entity-scorp", order: 2, text: "S Corporation", isCorrect: true },
        { id: "opt-entity-ccorp", order: 3, text: "C Corporation", isCorrect: false },
        { id: "opt-entity-llc", order: 4, text: "Single-Member LLC (disregarded)", isCorrect: false },
      ],
    },
    {
      id: "req-se-savings",
      order: 3,
      type: "dropdown",
      label: "Primary tax advantage of S Corp over sole proprietorship?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-adv-se",
      },
      explanation: "The primary advantage is self-employment tax savings. In an S Corp, only the reasonable salary is subject to FICA/Medicare taxes. Distributions of remaining profits avoid self-employment tax, potentially saving significant amounts.",
      dropdownOptions: [
        { id: "opt-adv-rate", order: 1, text: "Lower marginal tax rate", isCorrect: false },
        { id: "opt-adv-se", order: 2, text: "Self-employment tax savings on distributions", isCorrect: true },
        { id: "opt-adv-qbi", order: 3, text: "Higher QBI deduction", isCorrect: false },
        { id: "opt-adv-defer", order: 4, text: "Income deferral opportunities", isCorrect: false },
      ],
    },
    {
      id: "req-ccorp-disadvantage",
      order: 4,
      type: "dropdown",
      label: "Main disadvantage of C Corporation for this client?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-dis-double",
      },
      explanation: "The main disadvantage is double taxation - corporate income is taxed at 21%, then dividends are taxed again at the shareholder level. While the lower corporate rate is attractive, extracting profits triggers additional tax.",
      dropdownOptions: [
        { id: "opt-dis-double", order: 1, text: "Double taxation on distributed profits", isCorrect: true },
        { id: "opt-dis-liability", order: 2, text: "No liability protection", isCorrect: false },
        { id: "opt-dis-complexity", order: 3, text: "Administrative complexity only", isCorrect: false },
        { id: "opt-dis-retirement", order: 4, text: "Cannot establish retirement plans", isCorrect: false },
      ],
    },
  ],
};

// TCP TBS 2: Gift Tax (Medium - Numeric Entry)
export const tcpGiftTaxTBS: TBSQuestion = {
  id: "tbs-tcp-002",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Gift & Estate Tax",
  subtopic: "Gift Tax Rules & Exclusions",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-IV",
  title: "Gift Tax Calculation",
  scenarioText: `Robert and Susan Thompson (married) made several gifts during Year 1. Calculate the gift tax implications and determine if any gift tax return is required.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-gifts",
      order: 1,
      title: "Gifts Made in Year 1",
      type: "table",
      content: {
        type: "table",
        title: "Thompson Family Gifts",
        headers: ["Recipient", "From Robert", "From Susan", "Notes"],
        rows: [
          { cells: ["Son (adult)", "$40,000 cash", "$40,000 cash", "Birthday gift"] },
          { cells: ["Daughter (adult)", "$25,000 cash", "$25,000 cash", "Down payment help"] },
          { cells: ["Grandson (age 10)", "$0", "$20,000", "To UTMA account"] },
          { cells: ["Charity", "$50,000", "$0", "Public charity"] },
          { cells: ["Political campaign", "$5,000", "$5,000", "Local candidate"] },
          { cells: ["Grandson's college", "$35,000", "$0", "Direct tuition payment"] },
        ],
      },
    },
    {
      id: "exhibit-exclusions",
      order: 2,
      title: "Gift Tax Rules",
      type: "text",
      content: {
        type: "text",
        title: "Year 1 Gift Tax Provisions",
        paragraphs: [
          "Annual Exclusion: $17,000 per donee",
          "",
          "Unlimited Exclusions Available For:",
          "• Direct payments to educational institutions for tuition",
          "• Direct payments to medical providers for medical care",
          "• Gifts to qualifying charities",
          "• Gifts to U.S. citizen spouse",
          "",
          "Gift Splitting: Married couples may elect to treat gifts as made half by each spouse",
          "",
          "Note: Political contributions are not gifts for gift tax purposes",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-son-taxable",
      order: 1,
      type: "numeric",
      label: "Taxable gift to Son (combined, after splitting)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46000,
        tolerance: 0,
      },
      explanation: "Total to son: $80,000. With gift splitting, treated as $40,000 each. Each spouse uses $17,000 exclusion = $23,000 taxable per spouse = $46,000 total taxable.",
    },
    {
      id: "req-daughter-taxable",
      order: 2,
      type: "numeric",
      label: "Taxable gift to Daughter (combined, after splitting)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 16000,
        tolerance: 0,
      },
      explanation: "Total to daughter: $50,000. With gift splitting, treated as $25,000 each. Each spouse uses $17,000 exclusion = $8,000 taxable per spouse = $16,000 total taxable.",
    },
    {
      id: "req-grandson-utma",
      order: 3,
      type: "numeric",
      label: "Taxable gift to Grandson (UTMA)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3000,
        tolerance: 0,
      },
      explanation: "Susan's $20,000 gift to grandson exceeds $17,000 annual exclusion by $3,000. This is taxable (unless Susan elects to split with Robert, making it $10,000 each, both under exclusion).",
    },
    {
      id: "req-tuition-taxable",
      order: 4,
      type: "numeric",
      label: "Taxable amount - Direct tuition payment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Direct payments to educational institutions for tuition qualify for the unlimited educational exclusion, regardless of amount. The $35,000 is not a taxable gift.",
    },
    {
      id: "req-return-required",
      order: 5,
      type: "dropdown",
      label: "Is a gift tax return (Form 709) required?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-return-yes",
      },
      explanation: "Yes, a gift tax return is required because: (1) gifts exceed the annual exclusion for some recipients, and (2) the couple needs to report gift splitting election even if no tax is due.",
      dropdownOptions: [
        { id: "opt-return-yes", order: 1, text: "Yes - Form 709 required", isCorrect: true },
        { id: "opt-return-no", order: 2, text: "No - All gifts excluded", isCorrect: false },
        { id: "opt-return-maybe", order: 3, text: "Only if gift splitting elected", isCorrect: false },
      ],
    },
  ],
};

// TCP TBS 3: Retirement Planning (Easy - Numeric Entry)
export const tcpRetirementTBS: TBSQuestion = {
  id: "tbs-tcp-003",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Individual Tax Planning",
  subtopic: "Retirement Planning",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "TCP-I",
  title: "Retirement Contribution Limits",
  scenarioText: `Jennifer Adams (age 52) wants to maximize her retirement contributions for Year 1. Calculate the maximum contributions allowed for each account type.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-limits",
      order: 1,
      title: "Year 1 Contribution Limits",
      type: "table",
      content: {
        type: "table",
        title: "Retirement Plan Contribution Limits",
        headers: ["Plan Type", "Regular Limit", "Catch-Up (Age 50+)"],
        rows: [
          { cells: ["401(k) Employee Deferral", "$22,500", "$7,500"] },
          { cells: ["Traditional/Roth IRA", "$6,500", "$1,000"] },
          { cells: ["SIMPLE IRA Employee", "$15,500", "$3,500"] },
          { cells: ["SEP IRA (self-employed)", "25% of net SE income or $66,000", "N/A"] },
          { cells: ["HSA (family coverage)", "$7,750", "$1,000"] },
        ],
      },
    },
    {
      id: "exhibit-jennifer",
      order: 2,
      title: "Jennifer's Situation",
      type: "table",
      content: {
        type: "table",
        title: "Jennifer Adams - Year 1 Information",
        headers: ["Item", "Amount/Status"],
        rows: [
          { cells: ["W-2 Wages", "$180,000"] },
          { cells: ["Employer 401(k)", "Yes - employer matches 4%"] },
          { cells: ["Self-Employment Income", "$0"] },
          { cells: ["Age", "52"] },
          { cells: ["HDHP Health Plan", "Yes - family coverage"] },
          { cells: ["Spouse's 401(k)", "Not relevant - maximizing Jennifer's"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-401k-max",
      order: 1,
      type: "numeric",
      label: "Maximum 401(k) Employee Contribution",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30000,
        tolerance: 0,
      },
      explanation: "401(k) limit for age 50+: $22,500 regular + $7,500 catch-up = $30,000",
    },
    {
      id: "req-ira-max",
      order: 2,
      type: "numeric",
      label: "Maximum IRA Contribution (Traditional or Roth)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7500,
        tolerance: 0,
      },
      explanation: "IRA limit for age 50+: $6,500 regular + $1,000 catch-up = $7,500",
    },
    {
      id: "req-hsa-max",
      order: 3,
      type: "numeric",
      label: "Maximum HSA Contribution",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7750,
        tolerance: 0,
      },
      explanation: "HSA limit for family coverage = $7,750. Note: HSA catch-up ($1,000) is for age 55+, so Jennifer (age 52) does not qualify for the catch-up contribution.",
    },
    {
      id: "req-total-max",
      order: 4,
      type: "numeric",
      label: "Total Maximum Retirement Savings (401k + IRA + HSA)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45250,
        tolerance: 0,
      },
      explanation: "Total = 401(k) ($30,000) + IRA ($7,500) + HSA ($7,750) = $45,250",
    },
  ],
};

// TCP TBS 4: QBI Deduction (Hard - Numeric Entry)
export const tcpQBIDeductionTBS: TBSQuestion = {
  id: "tbs-tcp-004",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Entity Tax Planning",
  subtopic: "Qualified Business Income Deduction",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "TCP-II",
  title: "Section 199A QBI Deduction",
  scenarioText: `Marcus owns a manufacturing business operated as an S Corporation. Calculate his Section 199A qualified business income deduction.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-business",
      order: 1,
      title: "Business Information",
      type: "table",
      content: {
        type: "table",
        title: "Marcus Manufacturing LLC (S Corp) - Year 1",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Qualified Business Income (QBI)", "$400,000"] },
          { cells: ["W-2 Wages Paid by Business", "$180,000"] },
          { cells: ["Unadjusted Basis of Qualified Property", "$600,000"] },
          { cells: ["Business Type", "Manufacturing (not SSTB)"] },
        ],
      },
    },
    {
      id: "exhibit-personal",
      order: 2,
      title: "Personal Tax Information",
      type: "table",
      content: {
        type: "table",
        title: "Marcus - Year 1 Tax Return Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Filing Status", "Married Filing Jointly"] },
          { cells: ["Taxable Income (before QBI)", "$480,000"] },
          { cells: ["Threshold for W-2/Capital Limitation", "$364,200"] },
          { cells: ["Phase-in Range", "$364,200 - $464,200"] },
        ],
      },
    },
    {
      id: "exhibit-rules",
      order: 3,
      title: "QBI Calculation Rules",
      type: "text",
      content: {
        type: "text",
        title: "Section 199A Deduction Calculations",
        paragraphs: [
          "Basic Deduction: 20% of QBI",
          "",
          "W-2 Wage/Capital Limitation (for taxpayers above threshold):",
          "Lesser of: 20% of QBI, OR the greater of:",
          "  (a) 50% of W-2 wages, OR",
          "  (b) 25% of W-2 wages + 2.5% of UBIA of qualified property",
          "",
          "Phase-in: The limitation phases in over $100,000 for MFJ filers above the threshold",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-basic-qbi",
      order: 1,
      type: "numeric",
      label: "Basic QBI Deduction (20% of QBI)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "Basic QBI deduction = 20% × $400,000 = $80,000",
    },
    {
      id: "req-wage-limit-a",
      order: 2,
      type: "numeric",
      label: "W-2 Wage Limitation - Option (a): 50% of wages",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90000,
        tolerance: 0,
      },
      explanation: "50% of W-2 wages = 50% × $180,000 = $90,000",
    },
    {
      id: "req-wage-limit-b",
      order: 3,
      type: "numeric",
      label: "W-2 Wage Limitation - Option (b): 25% wages + 2.5% property",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 60000,
        tolerance: 0,
      },
      explanation: "25% of wages ($45,000) + 2.5% of UBIA ($15,000) = $60,000",
    },
    {
      id: "req-phase-in",
      order: 4,
      type: "dropdown",
      label: "Is the W-2/capital limitation fully phased in?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-phase-yes",
      },
      explanation: "Taxable income ($480,000) exceeds the top of the phase-in range ($464,200), so the W-2/capital limitation is fully applicable.",
      dropdownOptions: [
        { id: "opt-phase-yes", order: 1, text: "Yes - fully phased in", isCorrect: true },
        { id: "opt-phase-no", order: 2, text: "No - below threshold", isCorrect: false },
        { id: "opt-phase-partial", order: 3, text: "Partially phased in", isCorrect: false },
      ],
    },
    {
      id: "req-final-deduction",
      order: 5,
      type: "numeric",
      label: "Final QBI Deduction Allowed",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "W-2/capital limit = greater of $90,000 or $60,000 = $90,000. Final deduction = lesser of basic QBI ($80,000) or W-2 limit ($90,000) = $80,000",
    },
  ],
};

// TCP TBS 5: Like-Kind Exchange (Medium - Numeric Entry)
export const tcpLikeKindTBS: TBSQuestion = {
  id: "tbs-tcp-005",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Property Transactions Planning",
  subtopic: "Like-Kind Exchange Planning",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-III",
  title: "Section 1031 Like-Kind Exchange",
  scenarioText: `Peterson Properties LLC completed a like-kind exchange of investment real estate. Calculate the tax consequences of the exchange.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-exchange",
      order: 1,
      title: "Exchange Details",
      type: "table",
      content: {
        type: "table",
        title: "Section 1031 Exchange - Warehouse Properties",
        headers: ["Item", "Relinquished Property", "Replacement Property"],
        rows: [
          { cells: ["Fair Market Value", "$850,000", "$900,000"] },
          { cells: ["Adjusted Basis", "$520,000", "-"] },
          { cells: ["Mortgage on Property", "$200,000", "$280,000"] },
          { cells: ["Cash Paid/(Received)", "-", "$30,000 paid"] },
        ],
      },
    },
    {
      id: "exhibit-rules",
      order: 2,
      title: "1031 Exchange Rules",
      type: "text",
      content: {
        type: "text",
        title: "Like-Kind Exchange Principles",
        paragraphs: [
          "Boot Received: Triggers gain recognition to the extent of boot",
          "",
          "Boot includes: Cash received, net debt relief (mortgage given up > mortgage assumed)",
          "",
          "Gain Recognized: Lesser of realized gain OR boot received",
          "",
          "Basis in Replacement Property:",
          "= Basis of relinquished property",
          "+ Boot paid",
          "+ Gain recognized",
          "- Boot received",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-realized-gain",
      order: 1,
      type: "numeric",
      label: "Realized Gain on Exchange",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 330000,
        tolerance: 0,
      },
      explanation: "Realized gain = FMV received ($850,000) - Adjusted basis ($520,000) = $330,000. The mortgage relief and cash paid are considered in boot calculation.",
    },
    {
      id: "req-boot-received",
      order: 2,
      type: "numeric",
      label: "Boot Received (net)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Net mortgage relief = $200,000 given up - $280,000 assumed = ($80,000) net debt increase. Cash paid = $30,000. Net boot = debt relief less cash paid = $0 boot received (taxpayer paid more than mortgage relief received).",
    },
    {
      id: "req-recognized-gain",
      order: 3,
      type: "numeric",
      label: "Gain Recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Gain recognized = lesser of realized gain ($330,000) or boot received ($0) = $0. No boot was received (taxpayer paid additional cash and assumed more debt).",
    },
    {
      id: "req-basis-new",
      order: 4,
      type: "numeric",
      label: "Basis in Replacement Property",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 630000,
        tolerance: 0,
      },
      explanation: "Basis = Old basis ($520,000) + Cash paid ($30,000) + Net new mortgage ($80,000) + Gain recognized ($0) = $630,000. Alternative: FMV of new property ($900,000) - Deferred gain ($330,000 - $0) = $570,000. Let me recalculate: Basis = $520,000 + $30,000 cash + ($280,000 - $200,000 net debt increase) = $520,000 + $30,000 + $80,000 = $630,000.",
    },
    {
      id: "req-deferred-gain",
      order: 5,
      type: "numeric",
      label: "Gain Deferred",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 330000,
        tolerance: 0,
      },
      explanation: "Deferred gain = Realized gain ($330,000) - Recognized gain ($0) = $330,000",
    },
  ],
};

// ============================================
// BAR SECTION TBS (Business Analysis & Reporting)
// ============================================

// BAR TBS 1: Ratio Analysis (Easy - Numeric Entry)
export const barRatioAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-001",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Statement Analysis",
  subtopic: "Ratio Analysis",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Financial Ratio Calculations",
  scenarioText: `Compute key financial ratios for Horizon Industries using the financial data provided.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-financials",
      order: 1,
      title: "Financial Statements",
      type: "table",
      content: {
        type: "table",
        title: "Horizon Industries - Selected Financial Data (Year 1)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Current Assets", "$450,000"] },
          { cells: ["Inventory", "$150,000"] },
          { cells: ["Current Liabilities", "$200,000"] },
          { cells: ["Total Assets", "$1,200,000"] },
          { cells: ["Total Liabilities", "$480,000"] },
          { cells: ["Total Stockholders' Equity", "$720,000"] },
          { cells: ["Net Sales", "$2,400,000"] },
          { cells: ["Cost of Goods Sold", "$1,680,000"] },
          { cells: ["Net Income", "$192,000"] },
          { cells: ["Average Accounts Receivable", "$300,000"] },
          { cells: ["Average Inventory", "$140,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-current-ratio",
      order: 1,
      type: "numeric",
      label: "Current Ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.25,
        tolerance: 0.01,
      },
      explanation: "Current Ratio = Current Assets / Current Liabilities = $450,000 / $200,000 = 2.25",
    },
    {
      id: "req-quick-ratio",
      order: 2,
      type: "numeric",
      label: "Quick (Acid-Test) Ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.50,
        tolerance: 0.01,
      },
      explanation: "Quick Ratio = (Current Assets - Inventory) / Current Liabilities = ($450,000 - $150,000) / $200,000 = 1.50",
    },
    {
      id: "req-debt-equity",
      order: 3,
      type: "numeric",
      label: "Debt-to-Equity Ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.67,
        tolerance: 0.01,
      },
      explanation: "Debt-to-Equity = Total Liabilities / Total Equity = $480,000 / $720,000 = 0.67",
    },
    {
      id: "req-inventory-turnover",
      order: 4,
      type: "numeric",
      label: "Inventory Turnover",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12.0,
        tolerance: 0.1,
      },
      explanation: "Inventory Turnover = COGS / Average Inventory = $1,680,000 / $140,000 = 12.0 times",
    },
    {
      id: "req-return-equity",
      order: 5,
      type: "numeric",
      label: "Return on Equity (ROE) %",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 26.67,
        tolerance: 0.1,
      },
      explanation: "ROE = Net Income / Total Equity = $192,000 / $720,000 = 26.67%",
    },
  ],
};

// BAR TBS 2: CVP Analysis (Medium - Numeric Entry)
export const barCVPAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-002",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Managerial Accounting",
  subtopic: "Cost-Volume-Profit Analysis",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Cost-Volume-Profit Analysis",
  scenarioText: `Apex Electronics manufactures wireless speakers. Management needs CVP analysis to support pricing and production decisions.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-cost-data",
      order: 1,
      title: "Cost and Price Information",
      type: "table",
      content: {
        type: "table",
        title: "Wireless Speaker - Per Unit Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Selling Price per Unit", "$120"] },
          { cells: ["Variable Cost per Unit:", ""] },
          { cells: ["  Direct Materials", "$35"] },
          { cells: ["  Direct Labor", "$25"] },
          { cells: ["  Variable Overhead", "$12"] },
          { cells: ["  Variable Selling", "$8"] },
          { cells: ["Total Variable Cost per Unit", "$80"] },
          { cells: ["Total Fixed Costs (annual)", "$320,000"] },
          { cells: ["Target Profit", "$80,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-unit",
      order: 1,
      type: "numeric",
      label: "Contribution Margin per Unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0,
      },
      explanation: "CM per unit = Selling price - Variable cost = $120 - $80 = $40",
    },
    {
      id: "req-cm-ratio",
      order: 2,
      type: "numeric",
      label: "Contribution Margin Ratio (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 33.33,
        tolerance: 0.1,
      },
      explanation: "CM Ratio = CM / Selling Price = $40 / $120 = 33.33%",
    },
    {
      id: "req-breakeven-units",
      order: 3,
      type: "numeric",
      label: "Breakeven Point (units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8000,
        tolerance: 0,
      },
      explanation: "Breakeven units = Fixed Costs / CM per unit = $320,000 / $40 = 8,000 units",
    },
    {
      id: "req-breakeven-dollars",
      order: 4,
      type: "numeric",
      label: "Breakeven Point (sales dollars)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 960000,
        tolerance: 0,
      },
      explanation: "Breakeven $ = Fixed Costs / CM Ratio = $320,000 / 0.3333 = $960,000 (or 8,000 units × $120)",
    },
    {
      id: "req-target-units",
      order: 5,
      type: "numeric",
      label: "Units to achieve target profit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "Target units = (Fixed Costs + Target Profit) / CM = ($320,000 + $80,000) / $40 = 10,000 units",
    },
  ],
};

// BAR TBS 3: Variance Analysis (Medium - Numeric Entry)
export const barVarianceAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-003",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Managerial Accounting",
  subtopic: "Variance Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Manufacturing Variance Analysis",
  scenarioText: `Sterling Manufacturing uses a standard cost system. Analyze the direct materials and direct labor variances for October production.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-standards",
      order: 1,
      title: "Standard Costs",
      type: "table",
      content: {
        type: "table",
        title: "Standard Cost Card - Product X",
        headers: ["Item", "Standard"],
        rows: [
          { cells: ["Direct Materials: Standard quantity", "3 lbs per unit"] },
          { cells: ["Direct Materials: Standard price", "$8 per lb"] },
          { cells: ["Direct Labor: Standard hours", "2 hours per unit"] },
          { cells: ["Direct Labor: Standard rate", "$22 per hour"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Actual Results",
      type: "table",
      content: {
        type: "table",
        title: "October Production - Actual Data",
        headers: ["Item", "Actual"],
        rows: [
          { cells: ["Units Produced", "5,000 units"] },
          { cells: ["Direct Materials Purchased & Used", "16,000 lbs"] },
          { cells: ["Direct Materials Cost", "$120,000"] },
          { cells: ["Direct Labor Hours Worked", "10,500 hours"] },
          { cells: ["Direct Labor Cost", "$241,500"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dm-price-var",
      order: 1,
      type: "numeric",
      label: "Direct Materials Price Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -8000,
        tolerance: 0,
      },
      explanation: "Actual price = $120,000 / 16,000 = $7.50. Price Var = (SP - AP) × AQ = ($8 - $7.50) × 16,000 = $8,000 Favorable (negative = favorable)",
    },
    {
      id: "req-dm-qty-var",
      order: 2,
      type: "numeric",
      label: "Direct Materials Quantity Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8000,
        tolerance: 0,
      },
      explanation: "Standard qty = 5,000 × 3 = 15,000 lbs. Qty Var = (SQ - AQ) × SP = (15,000 - 16,000) × $8 = $8,000 Unfavorable (positive = unfavorable)",
    },
    {
      id: "req-dl-rate-var",
      order: 3,
      type: "numeric",
      label: "Direct Labor Rate Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10500,
        tolerance: 0,
      },
      explanation: "Actual rate = $241,500 / 10,500 = $23. Rate Var = (SR - AR) × AH = ($22 - $23) × 10,500 = $10,500 Unfavorable",
    },
    {
      id: "req-dl-eff-var",
      order: 4,
      type: "numeric",
      label: "Direct Labor Efficiency Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 11000,
        tolerance: 0,
      },
      explanation: "Standard hours = 5,000 × 2 = 10,000 hrs. Eff Var = (SH - AH) × SR = (10,000 - 10,500) × $22 = $11,000 Unfavorable",
    },
    {
      id: "req-total-dm-var",
      order: 5,
      type: "numeric",
      label: "Total Direct Materials Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Total DM Var = Price var ($8,000 F) + Quantity var ($8,000 U) = $0 net variance",
    },
    {
      id: "req-total-dl-var",
      order: 6,
      type: "numeric",
      label: "Total Direct Labor Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 21500,
        tolerance: 0,
      },
      explanation: "Total DL Var = Rate var ($10,500 U) + Efficiency var ($11,000 U) = $21,500 Unfavorable",
    },
  ],
};

// BAR TBS 4: Capital Budgeting (Hard - Numeric Entry)
export const barCapitalBudgetingTBS: TBSQuestion = {
  id: "tbs-bar-004",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Corporate Finance",
  subtopic: "Capital Budgeting",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Capital Investment Analysis",
  scenarioText: `Quantum Corp is evaluating a capital investment in automated manufacturing equipment. Analyze the project using multiple capital budgeting techniques.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-project",
      order: 1,
      title: "Project Information",
      type: "table",
      content: {
        type: "table",
        title: "Automation Equipment Project",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Initial Investment", "$500,000"] },
          { cells: ["Annual Cash Inflows (Years 1-5)", "$150,000"] },
          { cells: ["Salvage Value (Year 5)", "$50,000"] },
          { cells: ["Project Life", "5 years"] },
          { cells: ["Required Rate of Return", "12%"] },
          { cells: ["Tax Rate", "Ignore for this analysis"] },
        ],
      },
    },
    {
      id: "exhibit-pv-factors",
      order: 2,
      title: "Present Value Tables",
      type: "table",
      content: {
        type: "table",
        title: "Present Value Factors at 12%",
        headers: ["Year", "PV of $1", "PV of Annuity"],
        rows: [
          { cells: ["1", "0.8929", "0.8929"] },
          { cells: ["2", "0.7972", "1.6901"] },
          { cells: ["3", "0.7118", "2.4018"] },
          { cells: ["4", "0.6355", "3.0373"] },
          { cells: ["5", "0.5674", "3.6048"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-payback",
      order: 1,
      type: "numeric",
      label: "Payback Period (years)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.33,
        tolerance: 0.02,
      },
      explanation: "Payback = Initial Investment / Annual Cash Flow = $500,000 / $150,000 = 3.33 years",
    },
    {
      id: "req-pv-inflows",
      order: 2,
      type: "numeric",
      label: "PV of Annual Cash Inflows",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 540720,
        tolerance: 10,
      },
      explanation: "PV of annuity = $150,000 × 3.6048 = $540,720",
    },
    {
      id: "req-pv-salvage",
      order: 3,
      type: "numeric",
      label: "PV of Salvage Value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 28370,
        tolerance: 10,
      },
      explanation: "PV of salvage = $50,000 × 0.5674 = $28,370",
    },
    {
      id: "req-npv",
      order: 4,
      type: "numeric",
      label: "Net Present Value (NPV)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 69090,
        tolerance: 20,
      },
      explanation: "NPV = PV of inflows + PV of salvage - Initial investment = $540,720 + $28,370 - $500,000 = $69,090",
    },
    {
      id: "req-pi",
      order: 5,
      type: "numeric",
      label: "Profitability Index",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.14,
        tolerance: 0.01,
      },
      explanation: "PI = Total PV of cash inflows / Initial investment = ($540,720 + $28,370) / $500,000 = 1.14",
    },
    {
      id: "req-accept",
      order: 6,
      type: "dropdown",
      label: "Should the project be accepted?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-accept-yes",
      },
      explanation: "Yes - NPV is positive ($69,090), PI > 1 (1.14), indicating the project exceeds the required return.",
      dropdownOptions: [
        { id: "opt-accept-yes", order: 1, text: "Yes - Accept the project", isCorrect: true },
        { id: "opt-accept-no", order: 2, text: "No - Reject the project", isCorrect: false },
        { id: "opt-accept-indiff", order: 3, text: "Indifferent - NPV equals zero", isCorrect: false },
      ],
    },
  ],
};

// ============================================
// ISC SECTION TBS (Information Systems & Controls)
// ============================================

// ISC TBS 1: IT General Controls (Easy - Document Review)
export const iscITGCTBS: TBSQuestion = {
  id: "tbs-isc-001",
  section: "ISC",
  tbsType: "document_review",
  topic: "IT General Controls",
  subtopic: "Access Controls",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "IT General Controls Assessment",
  scenarioText: `You are evaluating IT general controls (ITGCs) at a client company. Review each control description and classify it appropriately.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-controls",
      order: 1,
      title: "Control Descriptions",
      type: "text",
      content: {
        type: "text",
        title: "IT Control Procedures",
        paragraphs: [
          "Control 1: Users must change their password every 90 days, and passwords must include uppercase, lowercase, numbers, and special characters.",
          "",
          "Control 2: All changes to production code require approval from both the development manager and a member of the IT security team before migration.",
          "",
          "Control 3: The system automatically generates a report of all terminated employees, which HR reviews weekly to ensure access has been removed.",
          "",
          "Control 4: Daily incremental backups and weekly full backups are performed and stored offsite at a secure data center.",
          "",
          "Control 5: New software installations require completion of a formal request form and approval from the IT director.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-control-1",
      order: 1,
      type: "dropdown",
      label: "Control 1 Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c1-access",
      },
      explanation: "Password policies are access controls - they control who can access systems and data.",
      dropdownOptions: [
        { id: "opt-c1-access", order: 1, text: "Access Control", isCorrect: true },
        { id: "opt-c1-change", order: 2, text: "Change Management", isCorrect: false },
        { id: "opt-c1-backup", order: 3, text: "Computer Operations", isCorrect: false },
        { id: "opt-c1-sdlc", order: 4, text: "Program Development", isCorrect: false },
      ],
    },
    {
      id: "req-control-2",
      order: 2,
      type: "dropdown",
      label: "Control 2 Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c2-change",
      },
      explanation: "Code migration approval requirements are change management controls.",
      dropdownOptions: [
        { id: "opt-c2-access", order: 1, text: "Access Control", isCorrect: false },
        { id: "opt-c2-change", order: 2, text: "Change Management", isCorrect: true },
        { id: "opt-c2-backup", order: 3, text: "Computer Operations", isCorrect: false },
        { id: "opt-c2-sdlc", order: 4, text: "Program Development", isCorrect: false },
      ],
    },
    {
      id: "req-control-3",
      order: 3,
      type: "dropdown",
      label: "Control 3 Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c3-access",
      },
      explanation: "Terminated employee access review is an access control - ensuring only authorized users have system access.",
      dropdownOptions: [
        { id: "opt-c3-access", order: 1, text: "Access Control", isCorrect: true },
        { id: "opt-c3-change", order: 2, text: "Change Management", isCorrect: false },
        { id: "opt-c3-backup", order: 3, text: "Computer Operations", isCorrect: false },
        { id: "opt-c3-physical", order: 4, text: "Physical Security", isCorrect: false },
      ],
    },
    {
      id: "req-control-4",
      order: 4,
      type: "dropdown",
      label: "Control 4 Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c4-ops",
      },
      explanation: "Backup procedures are computer operations controls - they ensure data can be recovered and operations can continue.",
      dropdownOptions: [
        { id: "opt-c4-access", order: 1, text: "Access Control", isCorrect: false },
        { id: "opt-c4-change", order: 2, text: "Change Management", isCorrect: false },
        { id: "opt-c4-ops", order: 3, text: "Computer Operations", isCorrect: true },
        { id: "opt-c4-physical", order: 4, text: "Physical Security", isCorrect: false },
      ],
    },
    {
      id: "req-control-5",
      order: 5,
      type: "dropdown",
      label: "Control 5 Classification",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c5-change",
      },
      explanation: "Software installation approval requirements are change management controls.",
      dropdownOptions: [
        { id: "opt-c5-access", order: 1, text: "Access Control", isCorrect: false },
        { id: "opt-c5-change", order: 2, text: "Change Management", isCorrect: true },
        { id: "opt-c5-ops", order: 3, text: "Computer Operations", isCorrect: false },
        { id: "opt-c5-sdlc", order: 4, text: "Program Development", isCorrect: false },
      ],
    },
  ],
};

// ISC TBS 2: SOC Reports (Medium - Document Review)
export const iscSOCReportsTBS: TBSQuestion = {
  id: "tbs-isc-002",
  section: "ISC",
  tbsType: "document_review",
  topic: "System & Organization Controls (SOC)",
  subtopic: "SOC 1 Reports",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-III",
  title: "SOC Report Evaluation",
  scenarioText: `Your audit client uses several third-party service organizations. Evaluate the SOC reports received to determine their appropriateness for audit reliance.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "SOC Report Scenarios",
      type: "text",
      content: {
        type: "text",
        title: "Service Organization SOC Reports",
        paragraphs: [
          "Scenario A: Your client uses CloudPay for payroll processing. CloudPay provided a SOC 1 Type I report dated March 31, Year 1. Your client's year-end is December 31, Year 1.",
          "",
          "Scenario B: Your client uses DataVault for cloud data storage. DataVault provided a SOC 2 Type II report covering security and availability trust services criteria for the period January 1 to December 31, Year 1.",
          "",
          "Scenario C: Your client uses QuickProcess for credit card processing. QuickProcess provided a SOC 1 Type II report for the period April 1 to September 30, Year 1.",
          "",
          "Scenario D: Your client uses SecureHost for web hosting. SecureHost provided a SOC 2 Type II report but the service auditor's opinion was qualified due to deficiencies in the security criteria.",
          "",
          "Scenario E: Your client wants to evaluate DataSecure's cybersecurity risk management program before engaging their services. DataSecure offers a SOC for Cybersecurity report.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-scenario-a",
      order: 1,
      type: "dropdown",
      label: "Scenario A - Can auditor rely on this SOC report?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-no",
      },
      explanation: "No - A Type I report only tests design at a point in time, not operating effectiveness. Additionally, the report date (March 31) does not cover sufficient period of the client's year-end (December 31).",
      dropdownOptions: [
        { id: "opt-a-yes", order: 1, text: "Yes - Fully rely on the report", isCorrect: false },
        { id: "opt-a-no", order: 2, text: "No - Need Type II covering the period", isCorrect: true },
        { id: "opt-a-partial", order: 3, text: "Partially - With additional procedures", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-b",
      order: 2,
      type: "dropdown",
      label: "Scenario B - Is this report appropriate for financial audit?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-no",
      },
      explanation: "No - SOC 2 reports address trust services criteria (security, availability, etc.), not controls relevant to financial reporting. For financial statement audits, SOC 1 reports are needed.",
      dropdownOptions: [
        { id: "opt-b-yes", order: 1, text: "Yes - Covers full audit period", isCorrect: false },
        { id: "opt-b-no", order: 2, text: "No - SOC 2 is not for financial audits", isCorrect: true },
        { id: "opt-b-partial", order: 3, text: "Yes - If security controls are relevant", isCorrect: false },
      ],
    },
    {
      id: "req-scenario-c",
      order: 3,
      type: "dropdown",
      label: "Scenario C - Is coverage period sufficient?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-partial",
      },
      explanation: "Partial - The SOC 1 Type II is the right type, but coverage (April-September) doesn't include the last quarter. Auditor needs to perform additional procedures for October-December or obtain bridge letter.",
      dropdownOptions: [
        { id: "opt-c-yes", order: 1, text: "Yes - Type II provides sufficient evidence", isCorrect: false },
        { id: "opt-c-no", order: 2, text: "No - Cannot rely at all", isCorrect: false },
        { id: "opt-c-partial", order: 3, text: "Partial - Need procedures for uncovered period", isCorrect: true },
      ],
    },
    {
      id: "req-scenario-d",
      order: 4,
      type: "dropdown",
      label: "Scenario D - Impact of qualified opinion?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-assess",
      },
      explanation: "The auditor must assess whether the deficiencies noted could affect the client's financial statements. The qualified opinion indicates control deficiencies that may require additional audit procedures.",
      dropdownOptions: [
        { id: "opt-d-ignore", order: 1, text: "No impact - SOC 2 not relevant to audit", isCorrect: false },
        { id: "opt-d-rely", order: 2, text: "Can still fully rely on the report", isCorrect: false },
        { id: "opt-d-assess", order: 3, text: "Assess if deficiencies affect client's controls", isCorrect: true },
      ],
    },
    {
      id: "req-scenario-e",
      order: 5,
      type: "dropdown",
      label: "Scenario E - Purpose of SOC for Cybersecurity?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-risk",
      },
      explanation: "SOC for Cybersecurity reports are designed to communicate information about an entity's cybersecurity risk management program to a broad range of stakeholders for general use.",
      dropdownOptions: [
        { id: "opt-e-audit", order: 1, text: "For financial statement audits", isCorrect: false },
        { id: "opt-e-internal", order: 2, text: "Internal use only", isCorrect: false },
        { id: "opt-e-risk", order: 3, text: "Evaluate cybersecurity risk management", isCorrect: true },
      ],
    },
  ],
};

// ISC TBS 3: Security Controls (Medium - Document Review)
export const iscSecurityTBS: TBSQuestion = {
  id: "tbs-isc-003",
  section: "ISC",
  tbsType: "document_review",
  topic: "Security & Privacy",
  subtopic: "Cybersecurity Fundamentals",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Cybersecurity Risk Assessment",
  scenarioText: `Your client experienced several IT security incidents during the year. Review each incident and identify the type of attack and recommended control improvement.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-incidents",
      order: 1,
      title: "Security Incidents",
      type: "text",
      content: {
        type: "text",
        title: "Year 1 Security Incident Summary",
        paragraphs: [
          "Incident 1: An employee clicked a link in an email appearing to be from the IT department asking them to verify their credentials. The employee entered their username and password on a fake website.",
          "",
          "Incident 2: The company's public-facing website was overwhelmed with traffic from thousands of IP addresses simultaneously, making it unavailable to legitimate customers for 4 hours.",
          "",
          "Incident 3: An attacker gained access to the company's SQL database by entering malicious code into a web form's input field, extracting customer data.",
          "",
          "Incident 4: Files on several employee computers were encrypted and a message demanded payment in cryptocurrency to restore access.",
          "",
          "Incident 5: An unauthorized individual followed an employee through a secured door into the data center without using their own badge.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-incident-1",
      order: 1,
      type: "dropdown",
      label: "Incident 1 - Attack Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-i1-phish",
      },
      explanation: "This is a phishing attack - using deceptive emails to trick users into revealing credentials.",
      dropdownOptions: [
        { id: "opt-i1-phish", order: 1, text: "Phishing", isCorrect: true },
        { id: "opt-i1-malware", order: 2, text: "Malware", isCorrect: false },
        { id: "opt-i1-ddos", order: 3, text: "DDoS Attack", isCorrect: false },
        { id: "opt-i1-social", order: 4, text: "Pretexting", isCorrect: false },
      ],
    },
    {
      id: "req-incident-2",
      order: 2,
      type: "dropdown",
      label: "Incident 2 - Attack Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-i2-ddos",
      },
      explanation: "This is a Distributed Denial of Service (DDoS) attack - overwhelming a system with traffic to make it unavailable.",
      dropdownOptions: [
        { id: "opt-i2-phish", order: 1, text: "Phishing", isCorrect: false },
        { id: "opt-i2-ddos", order: 2, text: "DDoS Attack", isCorrect: true },
        { id: "opt-i2-mitm", order: 3, text: "Man-in-the-Middle", isCorrect: false },
        { id: "opt-i2-sql", order: 4, text: "SQL Injection", isCorrect: false },
      ],
    },
    {
      id: "req-incident-3",
      order: 3,
      type: "dropdown",
      label: "Incident 3 - Attack Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-i3-sql",
      },
      explanation: "This is a SQL Injection attack - inserting malicious code through input fields to access databases.",
      dropdownOptions: [
        { id: "opt-i3-xss", order: 1, text: "Cross-Site Scripting (XSS)", isCorrect: false },
        { id: "opt-i3-sql", order: 2, text: "SQL Injection", isCorrect: true },
        { id: "opt-i3-buffer", order: 3, text: "Buffer Overflow", isCorrect: false },
        { id: "opt-i3-phish", order: 4, text: "Phishing", isCorrect: false },
      ],
    },
    {
      id: "req-incident-4",
      order: 4,
      type: "dropdown",
      label: "Incident 4 - Attack Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-i4-ransom",
      },
      explanation: "This is a Ransomware attack - malware that encrypts files and demands payment for decryption.",
      dropdownOptions: [
        { id: "opt-i4-virus", order: 1, text: "Virus", isCorrect: false },
        { id: "opt-i4-ransom", order: 2, text: "Ransomware", isCorrect: true },
        { id: "opt-i4-trojan", order: 3, text: "Trojan Horse", isCorrect: false },
        { id: "opt-i4-worm", order: 4, text: "Worm", isCorrect: false },
      ],
    },
    {
      id: "req-incident-5",
      order: 5,
      type: "dropdown",
      label: "Incident 5 - Attack Type",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-i5-tail",
      },
      explanation: "This is tailgating (or piggybacking) - a physical security breach where an unauthorized person follows an authorized person through a secure entrance.",
      dropdownOptions: [
        { id: "opt-i5-social", order: 1, text: "Social Engineering", isCorrect: false },
        { id: "opt-i5-tail", order: 2, text: "Tailgating/Piggybacking", isCorrect: true },
        { id: "opt-i5-shoulder", order: 3, text: "Shoulder Surfing", isCorrect: false },
        { id: "opt-i5-dumpster", order: 4, text: "Dumpster Diving", isCorrect: false },
      ],
    },
  ],
};

// ISC TBS 4: Data Analytics (Medium - Numeric Entry)
export const iscDataAnalyticsTBS: TBSQuestion = {
  id: "tbs-isc-004",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Data Management",
  subtopic: "Data Analytics & Visualization",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Data Analytics for Audit",
  scenarioText: `You are using data analytics to analyze the accounts payable population for audit testing. Calculate the required metrics from the extracted data.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-summary",
      order: 1,
      title: "AP Population Summary",
      type: "table",
      content: {
        type: "table",
        title: "Accounts Payable Analysis - Year 1",
        headers: ["Metric", "Value"],
        rows: [
          { cells: ["Total Invoice Count", "12,500"] },
          { cells: ["Total Invoice Amount", "$8,750,000"] },
          { cells: ["Invoices > $10,000", "450 invoices totaling $6,300,000"] },
          { cells: ["Duplicate Invoice Numbers", "23 pairs identified"] },
          { cells: ["Invoices without PO", "875 invoices totaling $525,000"] },
          { cells: ["Weekend-dated Invoices", "156 invoices totaling $234,000"] },
        ],
      },
    },
    {
      id: "exhibit-stratification",
      order: 2,
      title: "Invoice Stratification",
      type: "table",
      content: {
        type: "table",
        title: "Invoice Amount Stratification",
        headers: ["Range", "Count", "Total Amount"],
        rows: [
          { cells: ["$0 - $1,000", "8,500", "$2,125,000"] },
          { cells: ["$1,001 - $5,000", "2,800", "$7,000,000"] },
          { cells: ["$5,001 - $10,000", "750", "$5,625,000"] },
          { cells: ["> $10,000", "450", "$6,300,000"] },
        ],
        footnotes: ["Note: Some totals may not match due to data extraction timing"],
      },
    },
  ],
  requirements: [
    {
      id: "req-avg-invoice",
      order: 1,
      type: "numeric",
      label: "Average Invoice Amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 700,
        tolerance: 1,
      },
      explanation: "Average = Total Amount / Count = $8,750,000 / 12,500 = $700",
    },
    {
      id: "req-high-value-pct",
      order: 2,
      type: "numeric",
      label: "% of Total $ in Invoices > $10,000",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 72,
        tolerance: 1,
      },
      explanation: "Percentage = $6,300,000 / $8,750,000 = 72%",
    },
    {
      id: "req-high-value-count-pct",
      order: 3,
      type: "numeric",
      label: "% of Invoice Count > $10,000",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.6,
        tolerance: 0.1,
      },
      explanation: "Percentage = 450 / 12,500 = 3.6%",
    },
    {
      id: "req-no-po-pct",
      order: 4,
      type: "numeric",
      label: "% of Invoices without PO (by count)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7,
        tolerance: 0.1,
      },
      explanation: "Percentage = 875 / 12,500 = 7%",
    },
    {
      id: "req-exception-rate",
      order: 5,
      type: "dropdown",
      label: "Which exception requires immediate investigation?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-exc-dup",
      },
      explanation: "Duplicate invoices (23 pairs) represent potential duplicate payments and should be investigated immediately as they indicate possible control failures or fraud.",
      dropdownOptions: [
        { id: "opt-exc-dup", order: 1, text: "Duplicate invoice numbers", isCorrect: true },
        { id: "opt-exc-weekend", order: 2, text: "Weekend-dated invoices", isCorrect: false },
        { id: "opt-exc-nopo", order: 3, text: "Invoices without PO", isCorrect: false },
        { id: "opt-exc-high", order: 4, text: "High-value invoices", isCorrect: false },
      ],
    },
  ],
};

// Export all sample TBS questions
export const sampleTBSQuestions: TBSQuestion[] = [
  // FAR TBS (7 total)
  sampleJournalEntryTBS,
  sampleNumericEntryTBS,
  sampleResearchTBS,
  farGovernmentFundsTBS,
  farDeferredTaxesTBS,
  farImpairmentTBS,
  farConsolidationTBS,
  // AUD TBS (6 total)
  sampleDocumentReviewTBS,
  audSamplingTBS,
  audGoingConcernTBS,
  audIndependenceTBS,
  audJournalEntryTBS,
  audReviewEngagementTBS,
  // REG TBS (6 total)
  regContractsTBS,
  regAGICalculationTBS,
  regCapitalGainsTBS,
  regCorporateDistributionsTBS,
  regPartnershipBasisTBS,
  regCircular230TBS,
  // TCP TBS (5 total)
  tcpEntitySelectionTBS,
  tcpGiftTaxTBS,
  tcpRetirementTBS,
  tcpQBIDeductionTBS,
  tcpLikeKindTBS,
  // BAR TBS (4 total)
  barRatioAnalysisTBS,
  barCVPAnalysisTBS,
  barVarianceAnalysisTBS,
  barCapitalBudgetingTBS,
  // ISC TBS (4 total)
  iscITGCTBS,
  iscSOCReportsTBS,
  iscSecurityTBS,
  iscDataAnalyticsTBS,
];

// Helper to get a TBS by ID
export function getSampleTBSById(id: string): TBSQuestion | undefined {
  return sampleTBSQuestions.find((tbs) => tbs.id === id);
}

// Helper to get TBS questions by section
export function getSampleTBSBySection(section: string): TBSQuestion[] {
  return sampleTBSQuestions.filter((tbs) => tbs.section === section);
}
