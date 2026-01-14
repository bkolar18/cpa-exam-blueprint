// Exam Simulation TBS Bank
// These TBS questions are used EXCLUSIVELY for exam simulations
// They are separate from the practice TBS library to ensure students
// don't see the same questions during practice and exam modes
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
      explanation: `**Correct Entry:** Dr. Right-of-Use Asset — $210,620

**Calculation (per ASC 842-20-30-1):**
Step 1: Identify the discount rate
  → Use the implicit rate (6%) since it is known to the lessee. Per ASC 842-20-30-2, use the rate implicit in the lease if determinable; otherwise use the lessee's incremental borrowing rate.

Step 2: Find the present value factor (from Exhibit 1)
  → 5-period ordinary annuity at 6% = 4.2124

Step 3: Calculate present value of lease payments
  → $50,000 × 4.2124 = $210,620

**Why Right-of-Use Asset (not Equipment or Prepaid Rent):**
• Equipment: Only debited when the lessee purchases the asset outright. A finance lease transfers the right to USE the asset, not ownership of the asset itself.
• Prepaid Rent: This was the pre-ASC 842 treatment. Under current GAAP, lessees recognize an ROU asset, not prepaid rent.
• Lease Expense: Only used in operating leases for periodic expense recognition, not at inception.

**Common Mistakes:**
• Using the incremental borrowing rate (7%) when the implicit rate is known — would yield $205,010
• Recording at fair value ($210,000) instead of PV of payments
• Debiting Cash for the first payment (no payment at inception — payments are at year-end)`,
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
      explanation: `**Correct Entry:** Cr. Lease Liability — $210,620

**Authoritative Basis (ASC 842-20-30-1):**
At lease commencement, a lessee shall recognize a lease liability measured at the present value of the lease payments not yet paid, discounted using the appropriate rate.

**Why Lease Liability (not Notes Payable or Accounts Payable):**
• Notes Payable: Used for formal borrowing arrangements (loans), not lease obligations. The lease liability account specifically tracks the lessee's obligation to make lease payments.
• Accounts Payable: Used for trade payables due within normal operating cycles, not long-term lease obligations.
• Cash: No cash changes hands at inception — payments begin at year-end.

**Key Concept — Finance vs. Operating Lease at Inception:**
Both lease types recognize an ROU asset and lease liability at inception. The difference is in subsequent accounting:
• Finance lease: Amortize ROU asset + record interest expense (front-loaded expense pattern)
• Operating lease: Single lease expense on straight-line basis

**Amount Verification:**
The lease liability equals the ROU asset at inception ($210,620) because there are no initial direct costs, prepayments, or incentives in this scenario.`,
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
      explanation: `**Answer:** $2,500

**Formula (per ASC 330-10-35-1B):**
Inventory = Lower of Cost or Net Realizable Value (LCNRV)
NRV = Selling Price − Cost to Complete and Sell

**Calculation:**
Step 1: Calculate NRV
  NRV = $30 (selling price) − $3 (cost to sell) = $27

Step 2: Compare Cost vs. NRV
  Cost ($25) < NRV ($27)
  → Use the LOWER value: Cost of $25

Step 3: Calculate total value
  100 units × $25 = $2,500

**Why Use Cost Here:**
Since cost ($25) is lower than NRV ($27), no write-down is needed. The inventory can be sold at a profit, so it's reported at its original cost.

**Common Mistake:**
Using selling price ($30) instead of NRV ($27). Always deduct costs to sell from selling price to get NRV.`,
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
      explanation: `**Answer:** $7,200

**This is the KEY item — requires a write-down!**

**Calculation:**
Step 1: Calculate NRV
  NRV = $38 (selling price) − $2 (cost to sell) = $36

Step 2: Compare Cost vs. NRV
  Cost ($40) > NRV ($36)
  → Use the LOWER value: NRV of $36

Step 3: Calculate total value
  200 units × $36 = $7,200

**Why a Write-Down is Required (ASC 330-10-35-1B):**
When NRV falls below cost, a write-down is REQUIRED. Product B will be sold at a loss ($36 NRV vs. $40 cost), so we must recognize this impairment immediately. This reflects the conservatism principle — recognize losses when probable.

**Loss Recognized:**
Per-unit loss = $40 − $36 = $4
Total write-down = 200 × $4 = $800

**Common Mistakes:**
• Using cost ($40 × 200 = $8,000) — ignores the impairment
• Using selling price ($38 × 200 = $7,600) — must deduct cost to sell`,
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
      explanation: `**Answer:** $9,000

**Calculation:**
Step 1: Calculate NRV
  NRV = $75 (selling price) − $5 (cost to sell) = $70

Step 2: Compare Cost vs. NRV
  Cost ($60) < NRV ($70)
  → Use the LOWER value: Cost of $60

Step 3: Calculate total value
  150 units × $60 = $9,000

**Why Use Cost Here:**
Product C has the highest profit margin. Cost ($60) is well below NRV ($70), indicating healthy profitability. No write-down needed.

**Note on LCNRV Application:**
LCNRV is applied on an item-by-item basis (or by category if items are similar). You cannot offset Product B's loss against Product C's gain.`,
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
      explanation: `**Answer:** $18,700

**Summary of LCNRV Analysis:**

| Item | Units | Cost | NRV | Use | Total |
|------|-------|------|-----|-----|-------|
| Product A | 100 | $25 | $27 | Cost | $2,500 |
| Product B | 200 | $40 | $36 | NRV | $7,200 |
| Product C | 150 | $60 | $70 | Cost | $9,000 |
| **Total** | | | | | **$18,700** |

**Without LCNRV (at Cost):**
$2,500 + $8,000 + $9,000 = $19,500

**Inventory Write-Down Required:**
$19,500 − $18,700 = $800 (all from Product B)

**Journal Entry for Write-Down:**
Dr. Cost of Goods Sold (or Loss on Inventory Write-Down) $800
  Cr. Inventory $800

**Key Takeaway:**
Only Product B required a write-down because it was the only item where cost exceeded NRV. The LCNRV rule ensures inventory is not carried above its recoverable amount.`,
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
      explanation: `**Correct Selection:** "accounting principles generally accepted in the United States of America"

**Authoritative Basis (AU-C 700.A36):**
The standard audit report must use this exact phrasing when referring to the applicable financial reporting framework. This is the required language per AICPA Professional Standards.

**Why Other Options Are Wrong:**
• "U.S. GAAP": While commonly used in practice, this abbreviation is NOT acceptable in formal audit reports. The full phrase must be used.
• "International Financial Reporting Standards": ABC Company is a U.S. entity following U.S. GAAP, not IFRS. This would only be correct for entities that have adopted IFRS.
• "generally accepted accounting standards": This phrase is incorrect — it's "accounting PRINCIPLES," not "accounting standards."

**Exam Tip:**
Document review TBS often test exact wording. The audit report has very specific language requirements — abbreviations and paraphrasing are not acceptable.`,
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
      explanation: `**Correct Selection:** "auditing standards generally accepted in the United States of America"

**Authoritative Basis (AU-C 700.35):**
For non-issuers (non-public companies), the audit report states that the audit was conducted in accordance with "auditing standards generally accepted in the United States of America" (GAAS).

**Why Other Options Are Wrong:**
• "standards of the PCAOB": PCAOB standards apply to ISSUERS (public companies) only. ABC Company is described as a "non-public entity," so PCAOB standards don't apply.
• "International Standards on Auditing": ISA is used internationally, not for U.S. GAAS audits. A U.S. auditor following ISA would need to specifically state this.
• "AICPA audit standards": While the AICPA issues the standards, the report doesn't reference "AICPA" directly — it uses the full formal phrase.

**Key Distinction:**
• Non-issuers (private companies): "auditing standards generally accepted in the United States of America" (AU-C)
• Issuers (SEC registrants): "standards of the PCAOB" (AS)`,
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
      explanation: `**Correct Selection:** "reasonable"

**Authoritative Basis (AU-C 200.A45):**
An audit provides REASONABLE assurance, which is a high level of assurance but not absolute. Reasonable assurance is obtained when the auditor has obtained sufficient appropriate audit evidence to reduce audit risk to an acceptably low level.

**Why Other Options Are Wrong:**
• "absolute": Absolute assurance is NOT attainable due to inherent limitations of an audit:
  (1) Use of testing/sampling rather than examining 100% of transactions
  (2) Inherent limitations of internal control
  (3) Audit evidence is persuasive, not conclusive
  (4) Use of professional judgment
• "limited": This describes REVIEW engagements (AR-C 90), not audits. Reviews provide negative assurance ("nothing came to our attention...")
• "moderate": This is not a recognized assurance level in professional standards.

**Assurance Level Hierarchy:**
1. Reasonable assurance — Audit (highest)
2. Limited assurance — Review
3. No assurance — Compilation`,
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
      explanation: `**Correct Selection:** "material"

**Authoritative Basis (AU-C 200.06):**
Management is responsible for financial statements that are free from MATERIAL misstatement. Materiality is defined as the magnitude of an omission or misstatement that could influence the economic decisions of users.

**Why Other Options Are Wrong:**
• "any": Financial statements are NOT required to be free from ANY misstatement. Immaterial errors are acceptable — requiring perfection would be impractical and cost-prohibitive.
• "significant": While "significant" is used in some contexts, the audit report specifically uses "material" — these terms are not interchangeable.
• "all": Same issue as "any" — this implies zero tolerance for misstatement, which is not the standard.

**Key Concept — Materiality:**
Materiality is determined by the auditor based on professional judgment, considering both quantitative (dollar amount) and qualitative factors (nature of the item, circumstances). What matters is whether the misstatement would influence user decisions.`,
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
      explanation: `**Correct Selection:** "reasonable"

**Authoritative Basis (AU-C 200.11):**
The overall objectives of the auditor are to obtain REASONABLE assurance about whether the financial statements as a whole are free from material misstatement and to report on the financial statements in accordance with the auditor's findings.

**Why Other Options Are Wrong:**
• "absolute": As discussed in Dropdown 3, absolute assurance is unattainable. This is repeated in the Auditor's Responsibilities section to reinforce the concept.
• "complete": Not a recognized assurance level. The auditor doesn't provide "complete" assurance — they provide reasonable assurance based on sufficient appropriate evidence.
• "sufficient": "Sufficient" describes audit EVIDENCE, not assurance level. The auditor obtains "sufficient appropriate audit evidence" to achieve "reasonable assurance."

**Exam Strategy:**
Both Dropdown 3 and Dropdown 5 test the same concept (reasonable assurance). The CPA exam often repeats key concepts in different contexts within the same TBS to ensure you understand the principle, not just memorize answers.`,
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
      explanation: `**Correct Citation:** ASC 606-10-25-19 (or 606-10-25-20)

**How to Navigate to This Citation:**
1. Start in ASC 606 (Revenue from Contracts with Customers)
2. Go to 606-10 (Overall)
3. Navigate to 25 (Recognition)
4. Look for paragraphs 19-22 which address "Distinct Within the Context of the Contract"

**What ASC 606-10-25-19 Says:**
A good or service is **distinct** if BOTH criteria are met:
**(a) Capable of being distinct:** The customer can benefit from the good or service either:
    • On its own, OR
    • Together with other readily available resources

**(b) Distinct within the contract:** The promise to transfer the good or service is separately identifiable from other promises in the contract (ASC 606-10-25-21 provides indicators)

**Applying This to Henderson Software:**
• Software license: Likely distinct — customer can use software on its own
• Implementation services: May NOT be distinct if highly customized (significantly modifies/customizes the software per 606-10-25-21(b))
• Technical support: Likely distinct — support is available from other providers

**Common Research Mistakes:**
• Citing 606-10-25-1 (general recognition) instead of 25-19 (distinct criteria)
• Citing 606-10-15 (scope) instead of 606-10-25 (recognition)
• Not including the full ASC reference format

**Exam Tip:**
For research TBS, acceptable citation formats typically include:
• "606-10-25-19" (abbreviated)
• "ASC 606-10-25-19" (with ASC prefix)
• "FASB ASC 606-10-25-19" (full formal)`,
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
      explanation: `**Answer:** $2,850,000

**Calculation (from Exhibit 1 - Trial Balance):**
| Revenue Source | Amount |
|----------------|--------|
| Property Taxes | $2,100,000 |
| Intergovernmental | $600,000 |
| Licenses & Permits | $150,000 |
| **Total Revenues** | **$2,850,000** |

**Government Accounting Context (GASB 54):**
Under modified accrual accounting, revenues are recognized when they are both MEASURABLE and AVAILABLE. "Available" means collectible within the current period or soon enough thereafter to pay current liabilities (typically 60 days).

**Note on Budgetary vs. Actual:**
• Estimated Revenues (budget): $2,800,000
• Actual Revenues: $2,850,000
• Favorable variance: $50,000

The actual revenues exceeded the budget, which is a positive result for the General Fund.`,
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
      explanation: `**Answer:** $2,750,000

**Calculation (from Exhibit 1 - Trial Balance):**
| Expenditure Category | Amount |
|---------------------|--------|
| General Government | $800,000 |
| Public Safety | $1,200,000 |
| Public Works | $550,000 |
| Capital Outlay | $200,000 |
| **Total Expenditures** | **$2,750,000** |

**Government Accounting Context:**
Under modified accrual, expenditures (not expenses!) are recognized when the fund liability is incurred. In governmental funds, we use "expenditures" because we track current financial resources, not economic resources.

**Budgetary Comparison:**
• Appropriations (budget): $2,750,000
• Actual Expenditures: $2,750,000
• Variance: $0 (exactly on budget)

**Common Mistake:**
Don't confuse the budgetary accounts (Estimated Revenues/Appropriations) with actual revenues/expenditures. Budgetary accounts are closed separately.`,
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
      explanation: `**Answer:** $100,000 increase

**Calculation:**
Net Change = Total Revenues − Total Expenditures
Net Change = $2,850,000 − $2,750,000 = **$100,000**

**What This Means:**
The General Fund's total fund balance increased by $100,000 during the year. This represents an INFLOW of current financial resources — the city collected more than it spent.

**Closing Entry (Operating Accounts):**
Dr. Revenues - Property Taxes $2,100,000
Dr. Revenues - Intergovernmental $600,000
Dr. Revenues - Licenses & Permits $150,000
  Cr. Expenditures - General Government $800,000
  Cr. Expenditures - Public Safety $1,200,000
  Cr. Expenditures - Public Works $550,000
  Cr. Expenditures - Capital Outlay $200,000
  Cr. Fund Balance - Unassigned $100,000

**Note:** The budgetary accounts (Estimated Revenues, Appropriations, Budgetary Fund Balance) are closed in a separate entry.`,
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
      explanation: `**Answer:** $75,000

**Source:** Exhibit 2 - City Manager Memo
"Assigned: Next year's capital projects - $75,000 (increased from $25,000)"

**Fund Balance Classifications (GASB 54):**
**Assigned** fund balance represents amounts constrained by the government's INTENT to use for specific purposes. Unlike restricted or committed, assigned amounts:
• Can be established by someone OTHER than the governing body (e.g., City Manager)
• Do NOT require formal action to remove the constraint
• Represent management's intended use of resources

**Change Analysis:**
Beginning Assigned: $25,000
Ending Assigned: $75,000
Increase: $50,000

This $50,000 increase represents funds set aside for next year's capital projects. The increase came from Unassigned fund balance.

**Common Mistake:**
Reading the beginning balance ($25,000) from the trial balance instead of the updated ending balance ($75,000) from the memo.`,
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
      explanation: `**Answer:** $230,000

**This is the KEY calculation — worth 2 points!**

**Calculation:**
| Component | Amount |
|-----------|--------|
| Beginning Unassigned (Trial Balance) | $180,000 |
| + Net Change in Fund Balance | +$100,000 |
| − Transfer to Assigned ($75,000 − $25,000) | −$50,000 |
| **Ending Unassigned** | **$230,000** |

**Step-by-Step Logic:**
1. Start with beginning Unassigned: $180,000
2. Add the $100,000 surplus (revenues exceeded expenditures)
3. Subtract $50,000 that was reclassified to Assigned per City Manager memo
4. Result: $230,000

**Fund Balance Hierarchy (GASB 54):**
The hierarchy determines what happens to the $100,000 surplus:
1. Nonspendable — No change (no prepaid/inventory)
2. Restricted — No change ($50,000)
3. Committed — No change ($100,000)
4. Assigned — Increased by $50,000 to $75,000
5. Unassigned — Absorbs remainder

**Verification (Total Fund Balance):**
| Category | Beginning | Ending |
|----------|-----------|--------|
| Nonspendable | $0 | $0 |
| Restricted | $50,000 | $50,000 |
| Committed | $100,000 | $100,000 |
| Assigned | $25,000 | $75,000 |
| Unassigned | $180,000 | $230,000 |
| **Total** | **$355,000** | **$455,000** |

Change: $455,000 − $355,000 = $100,000 ✓ (matches net change)`,
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
      explanation: `**Correct Selection:** Deferred Tax Asset

**Analysis (per ASC 740-10-25):**
• Asset type: Equipment (an ASSET)
• Book basis: $400,000
• Tax basis: $550,000
• Book < Tax for an asset = **Deductible temporary difference = DTA**

**What This Means:**
The company has taken MORE depreciation for tax purposes (accelerated depreciation) than for book purposes. The tax basis ($550,000) is higher because less has been deducted for tax.

In FUTURE years:
• Tax depreciation will be LOWER (tax basis depletes faster initially)
• Book depreciation will be HIGHER (remaining book basis spread over same period)
• This will create future TAX DEDUCTIONS → DTA

**Memory Aid:**
"More tax depreciation NOW = Higher tax payments LATER"
When you accelerate tax depreciation, you pay less tax now but more later. The DTA represents the future tax benefit from having already "used up" accelerated deductions.

**Why Not DTL:**
A DTL would mean higher FUTURE taxable income. But here, future taxable income will actually be LOWER because the tax basis has already been partially depleted through accelerated depreciation.`,
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
      explanation: `**Correct Selection:** Deferred Tax Asset

**Analysis:**
• Account type: Warranty Reserve (a LIABILITY)
• Book basis: $80,000 (expense recognized when estimated)
• Tax basis: $0 (deductible only when paid)
• Book > Tax for a LIABILITY = **Deductible temporary difference = DTA**

**The Logic:**
For GAAP, warranty expense is recognized when the sale occurs (matching principle). For TAX, warranty costs are deductible only when actually paid.

**Future Tax Impact:**
When warranty claims are paid in future years:
• For books: No expense (already recognized)
• For tax: DEDUCTION available
• Result: Lower future taxable income → DTA

**Common Confusion:**
Students often confuse liability treatment. Remember:
• For ASSETS: Book > Tax = DTL; Book < Tax = DTA
• For LIABILITIES: Book > Tax = DTA; Book < Tax = DTL (opposite!)

**Why?** A higher book liability means more expense was recognized for books than deducted for tax. That "extra" book expense creates future tax deductions.`,
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
      explanation: `**Correct Selection:** Deferred Tax Liability

**Analysis:**
• Account type: Prepaid Insurance (an ASSET)
• Book basis: $24,000 (asset on books, will expense over time)
• Tax basis: $0 (already deducted for tax when paid)
• Book > Tax for an ASSET = **Taxable temporary difference = DTL**

**The Logic:**
For TAX purposes, insurance was deducted when paid (cash basis for certain items). For BOOK purposes, it's recorded as a prepaid asset and expensed over the coverage period.

**Future Tax Impact:**
When the prepaid is expensed for books:
• For books: Insurance expense recognized
• For tax: NO deduction (already taken)
• Result: Higher future taxable income → DTL

**This is the ONLY DTL in this problem (along with unearned revenue):**
Most items in this TBS create DTAs because they represent expenses recognized for books before being deductible for tax. Prepaid insurance is the opposite — deducted for tax before being expensed for books.

**Common Mistake:**
Assuming all prepaid items create DTAs. Prepaids are ASSETS, and when book basis > tax basis for assets, you get a DTL.`,
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
      explanation: `**Answer:** $118,750

**DTA Items (Deductible Temporary Differences):**
| Item | Difference | × Rate | = DTA |
|------|------------|--------|-------|
| Depreciation | $150,000 | 25% | $37,500 |
| Warranty Reserve | $80,000 | 25% | $20,000 |
| Bad Debt Allowance | $45,000 | 25% | $11,250 |
| Pension Liability | $200,000 | 25% | $50,000 |
| **Total DTA** | | | **$118,750** |

**Why Each Creates a DTA:**
• **Depreciation:** Book < Tax basis (asset) → Future tax deductions
• **Warranty Reserve:** Book > Tax basis (liability) → Future tax deductions when paid
• **Bad Debt Allowance:** Book > Tax basis (contra-asset treated like liability) → Deductible when written off
• **Pension Liability:** Book > Tax basis (liability) → Deductible when contributions made

**Items NOT Included:**
• Prepaid Insurance → Creates DTL (not DTA)
• Unearned Revenue → Creates DTL (not DTA)

**ASC 740 Note:**
All deferred taxes are classified as NONCURRENT on the balance sheet, regardless of when they reverse.`,
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
      explanation: `**Answer:** $16,000

**DTL Items (Taxable Temporary Differences):**
| Item | Difference | × Rate | = DTL |
|------|------------|--------|-------|
| Prepaid Insurance | $24,000 | 25% | $6,000 |
| Unearned Revenue | $40,000 | 25% | $10,000 |
| **Total DTL** | | | **$16,000** |

**Why Each Creates a DTL:**

**Prepaid Insurance ($6,000):**
• Book basis ($24,000) > Tax basis ($0) for an ASSET
• Tax deduction already taken; book expense in future
• Future: Higher taxable income → DTL

**Unearned Revenue ($10,000):**
• Book basis ($60,000) < Tax basis ($100,000) for a LIABILITY
• Cash received: $100,000 taxable for tax, only $60,000 unearned for books
• The $40,000 difference was already taxed but not yet recognized as book revenue
• Future: Book revenue recognition with NO additional tax → DTL

Wait — why does unearned revenue create a DTL if $40,000 was already taxed?

**Corrected Understanding:**
The $40,000 difference means book has recognized MORE revenue than tax has taxed. Book basis < Tax basis for a liability means:
• Book recognized revenue faster → higher book income NOW
• Tax will recognize this revenue LATER → higher taxable income LATER
• Result: DTL

**Net Deferred Tax Position:**
DTA: $118,750
DTL: $16,000
Net DTA: $102,750`,
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
      explanation: `**Correct Entry:** Dr. Impairment Loss — $250,000

**Two-Step Impairment Test (ASC 360-10-35-17):**

**Step 1: Recoverability Test (Pass/Fail)**
Compare carrying amount to UNDISCOUNTED future cash flows:
• Carrying amount: $1,200,000
• Undiscounted cash flows: $1,100,000
• Result: $1,200,000 > $1,100,000 → **IMPAIRED** (proceed to Step 2)

**Step 2: Measurement (How Much)**
Impairment Loss = Carrying Amount − Fair Value
• Carrying amount: $1,200,000
• Fair value: $950,000
• **Impairment loss = $250,000**

**Why Impairment Loss (not Depreciation Expense or Loss on Disposal):**
• Depreciation Expense: Records systematic allocation over useful life, not a one-time write-down
• Loss on Disposal: Only used when asset is actually sold or abandoned, not when held for use

**Common Mistakes:**
• Using discounted (not undiscounted) cash flows in Step 1 — would give different impairment threshold
• Measuring loss as carrying amount minus undiscounted CFs ($100,000 wrong answer)
• Confusing ASC 360 (long-lived assets) with ASC 350 (goodwill impairment)

**Key Distinction:**
Step 1 uses UNDISCOUNTED cash flows (easier threshold to pass)
Step 2 uses FAIR VALUE (actual measurement of loss)`,
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
      explanation: `**Correct Entry:** Cr. Accumulated Depreciation — Equipment — $250,000

**Recording the Impairment (ASC 360-10-35-17):**
The impairment loss reduces the asset's carrying amount from $1,200,000 to $950,000 (fair value).

**Two Acceptable Methods:**
| Method | Entry | New Carrying Amount |
|--------|-------|---------------------|
| Credit Asset directly | Cr. Equipment $250,000 | $2,000,000 - $800,000 - $250,000 = $950,000 |
| Credit Accum. Depr. | Cr. Accum. Depr. $250,000 | $2,000,000 - $1,050,000 = $950,000 |

Both methods result in the same $950,000 carrying amount.

**Why Credit Accumulated Depreciation:**
Many entities prefer this method because:
• Preserves original cost on books (asset tracking)
• Maintains depreciation history
• Separates routine depreciation from impairment charges

**Why NOT Other Credits:**
• Equipment (direct credit): Acceptable alternative, but changes original cost record
• Notes Payable or Cash: Impairment is a non-cash adjustment — no liability created or cash paid
• Other Expense: Wrong account type — the debit side records the expense

**Future Depreciation:**
After impairment, depreciate the NEW carrying amount ($950,000) over the REMAINING useful life (6 years):
• Annual depreciation = $950,000 ÷ 6 = $158,333

**Exam Tip:**
ASC 360 impairments are NOT reversible for assets held for use. Once written down, the new basis becomes the asset's cost for future depreciation.`,
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
      explanation: `**Answer:** $500,000

**Consolidation Principle (ASC 810-10-45):**
ALL intercompany transactions must be eliminated in consolidation. The consolidated entity cannot sell to itself.

**Elimination Entry:**
Dr. Sales Revenue     $500,000
    Cr. Cost of Goods Sold     $500,000

**Why Full Amount (Not Profit Only):**
We eliminate the ENTIRE intercompany sale and purchase, not just the profit markup. This is because:
• Parent's $500,000 sale to Sub must be removed from consolidated Sales
• Sub's $500,000 purchase from Parent must be removed from consolidated COGS
• Result: Consolidated statements show only external transactions

**Common Mistake:**
Eliminating only the profit ($150,000). The profit elimination is a SEPARATE entry for unrealized profit in ending inventory.

**Exam Tip:**
Intercompany sales/COGS elimination is always 100% — it doesn't matter what percentage the parent owns.`,
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
      explanation: `**Answer:** $60,000

**Three-Step Calculation:**

**Step 1: Calculate Gross Profit Rate**
Gross Profit Rate = (Sales Price − Cost) ÷ Sales Price
= ($500,000 − $350,000) ÷ $500,000
= $150,000 ÷ $500,000 = **30%**

**Step 2: Determine Intercompany Inventory Remaining**
Inventory remaining = 40% × $500,000 intercompany sale = **$200,000**
(From Exhibit 1: "40% of intercompany inventory remains in Subsidiary's ending inventory")

**Step 3: Calculate Unrealized Profit**
Unrealized Profit = Remaining Inventory × Gross Profit Rate
= $200,000 × 30% = **$60,000**

**Why This Must Be Eliminated (ASC 810-10-45):**
The $60,000 profit is "unrealized" because the inventory hasn't been sold to an outside party yet. From the consolidated entity's perspective, no profit has been earned — the goods are still on hand.

**Elimination Entry:**
Dr. Cost of Goods Sold     $60,000
    Cr. Inventory               $60,000

**Common Mistakes:**
• Using cost ($350,000) instead of selling price ($500,000) as the base for remaining inventory
• Forgetting to apply the 40% remaining percentage
• Calculating profit rate as markup on cost (42.9%) instead of gross profit on sales (30%)

**Downstream vs. Upstream:**
This is a DOWNSTREAM sale (Parent → Subsidiary). Entire unrealized profit is eliminated against Parent. If upstream, profit elimination would be split: 80% to Parent, 20% to NCI.`,
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
      explanation: `**Answer:** $6,000

**Calculation:**
Interest = Principal × Rate × Time
= $200,000 × 6% × (6 months ÷ 12 months)
= $200,000 × 0.06 × 0.5 = **$6,000**

**From Exhibit 1:**
"Subsidiary borrowed $200,000 from Parent at 6% on July 1, Year 1"
• Loan period in Year 1: July 1 to December 31 = 6 months

**Elimination Entry:**
Dr. Interest Income      $6,000
    Cr. Interest Expense      $6,000

**Why Eliminate (ASC 810-10-45):**
The consolidated entity cannot have interest income and expense with itself. From a consolidated perspective:
• Parent's $12,000 interest income includes $6,000 intercompany
• Subsidiary's $6,000 interest expense is 100% intercompany
• After elimination: Only external interest remains

**Also Eliminate the Loan Balance:**
Dr. Note Payable to Parent     $200,000
    Cr. Note Receivable from Sub     $200,000

**Common Mistake:**
Using 12 months instead of 6 months — would give $12,000 (wrong)

**Verification from Exhibit 2:**
• Parent shows Interest Income: $12,000 (includes intercompany)
• Subsidiary shows Interest Expense: $6,000 (matches our calculation)`,
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
      explanation: `**Answer:** $64,000

**Calculation:**
Parent's Share of Dividend = Ownership % × Total Dividend
= 80% × $80,000 = **$64,000**

**Verification from Exhibit 2:**
Parent's Dividend Income: $64,000 ✓ (matches our calculation)

**Elimination Entry:**
Dr. Dividend Income          $64,000
    Cr. Dividends Declared       $64,000

**Why Eliminate Parent's Share (ASC 810-10-45):**
From the consolidated perspective:
• Subsidiary's dividend is just cash moving within the consolidated entity
• Parent's dividend income is not "real" income to the consolidated group
• Only dividends paid to OUTSIDE shareholders (NCI) represent actual distributions

**Equity Method Consideration:**
If Parent uses equity method for its investment:
• Parent already recorded $64,000 as reduction of Investment in Subsidiary
• The elimination removes the dividend from Parent's income
• This prevents double-counting the subsidiary's earnings

**Common Mistake:**
Eliminating 100% of dividends. The NCI's share ($16,000) is NOT eliminated — it represents actual cash leaving the consolidated entity.`,
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
      explanation: `**Answer:** $16,000

**Calculation:**
NCI Share of Dividend = NCI % × Total Dividend
= 20% × $80,000 = **$16,000**

**Why NCI Gets 20%:**
• Parent owns 80% of Subsidiary
• Noncontrolling interest (NCI) owns remaining 20%
• Dividends are distributed proportionally to ALL shareholders

**This Amount is NOT Eliminated:**
Unlike Parent's share, the NCI's dividend:
• Represents actual cash leaving the consolidated entity
• Goes to shareholders outside the consolidated group
• Is recorded as a reduction to NCI in the consolidated equity section

**Presentation in Consolidated Statement of Changes in Equity:**
Dividends declared to NCI reduce the NCI equity account, similar to how dividends to Parent's shareholders reduce retained earnings.

**Key Distinction:**
| Shareholder | Amount | Treatment |
|-------------|--------|-----------|
| Parent (80%) | $64,000 | Eliminated (intercompany) |
| NCI (20%) | $16,000 | NOT eliminated (external) |
| Total | $80,000 | |

**Exam Tip:**
Always calculate both Parent and NCI shares of dividends — the exam often tests both in the same problem.`,
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
      explanation: `**Answer:** $1,040,000

**Two-Step Calculation:**

**Step 1: Combine Inventory Balances**
Parent Inventory + Subsidiary Inventory
= $680,000 + $420,000 = **$1,100,000**

**Step 2: Eliminate Unrealized Profit**
Combined Inventory − Unrealized Profit
= $1,100,000 − $60,000 = **$1,040,000**

**Why Reduce by Unrealized Profit:**
The Subsidiary's inventory includes goods purchased from Parent at $200,000 (40% of $500,000). But Parent sold these at a 30% markup, meaning $60,000 of that value is Parent's unrealized profit.

From a consolidated perspective, inventory should be at the ORIGINAL cost to the consolidated entity ($350,000 × 40% = $140,000), not the intercompany transfer price ($200,000).

**Elimination Entry Effect on Inventory:**
Dr. Cost of Goods Sold     $60,000
    Cr. Inventory               $60,000

This removes the markup and restates inventory at cost to the consolidated entity.

**Common Mistakes:**
• Forgetting to eliminate unrealized profit (answer of $1,100,000)
• Eliminating all intercompany inventory instead of just profit
• Using wrong profit percentage (30% GP rate, not 42.9% markup)

**Verification:**
| Item | Amount |
|------|--------|
| Parent external inventory | $680,000 |
| Sub external inventory | $220,000 |
| Sub intercompany at cost | $140,000 |
| **Total at cost** | **$1,040,000** |`,
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
      explanation: `**Answer:** 93

**How to Read the Sample Size Table (Exhibit 2):**
1. Find the row for Expected Deviation Rate: **1.00%**
2. Find the column for Tolerable Deviation Rate: **5%**
3. The intersection gives the sample size: **93**

**Understanding the Parameters (per AU-C 530):**

• **Expected Deviation Rate (1%):** The auditor's estimate of deviations in the population based on prior experience or professional judgment.

• **Tolerable Deviation Rate (5%):** The maximum rate of deviations the auditor will accept and still conclude the control is operating effectively.

• **Risk of Assessing Control Risk Too Low (5%):** The risk that the sample supports the conclusion that control risk is lower than it actually is. Also called "risk of overreliance."

**Why Sample Size Increases When:**
• Expected deviation rate increases (need more items to estimate)
• Tolerable rate decreases (need more precision)
• Risk of overreliance decreases (need more confidence)

**Common Mistake:**
Confusing the 5% RACRTL with the 5% tolerable rate. They are different parameters that both happen to be 5% in this problem.`,
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
      explanation: `**Answer:** 2.15%

**Calculation:**
Sample Deviation Rate = Number of Deviations ÷ Sample Size
Sample Deviation Rate = 2 ÷ 93 = **2.15%** (or 2.1505%)

**From Exhibit 3 - Sample Results:**
• Sample Size: 93 purchase orders
• Deviations Found: 2

**What Counts as a Deviation:**
Both items found ARE deviations regardless of dollar amount:
• $150 supply order signed by unauthorized employee ✓
• $2,500 equipment purchase with forged signature ✓

**Important Note (AU-C 530.A23):**
In attributes sampling, each deviation is weighted equally — the dollar amount is irrelevant. A $150 deviation counts the same as a $2,500 deviation because we're testing the RATE of control failures, not their magnitude.

**Comparison to Expectation:**
• Expected Deviation Rate: 1%
• Actual Sample Deviation Rate: 2.15%
• Result: Actual exceeds expected by more than double

This is a warning sign that the control may not be operating as effectively as expected.`,
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
      explanation: `**Correct Selection:** Yes - UDL exceeds tolerable rate

**What is the Upper Deviation Limit (UDL)?**
The UDL is the maximum rate of deviations in the population that the auditor can conclude exists, at the specified confidence level. It accounts for sampling risk.

**Estimating the UDL:**
With 2 deviations in a sample of 93 at 95% confidence (5% RACRTL), the UDL is approximately **6.2%**.

**How to Estimate (without full evaluation table):**
UDL ≈ Sample Deviation Rate + Allowance for Sampling Risk
UDL ≈ 2.15% + ~4% = ~6.2%

**Comparison:**
• Tolerable Deviation Rate: 5%
• Estimated UDL: 6.2%
• Result: **UDL (6.2%) > Tolerable Rate (5%)**

**Why This Matters (AU-C 530.13):**
When the UDL exceeds the tolerable rate, the auditor CANNOT conclude that the control is operating effectively at the desired level of assurance. Sampling risk is too high.

**Why Not "No" or "Equal":**
• "No": Would require UDL ≤ 5%, but with 2 deviations in 93 items, UDL is definitely above 5%
• "Equal": Extremely unlikely — exact equality is rare in practice`,
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
      explanation: `**Correct Selection:** Control is not operating effectively

**This is the KEY conclusion — worth 2 points!**

**Decision Framework (AU-C 530.14):**
| If UDL is... | Then conclude... |
|--------------|------------------|
| ≤ Tolerable Rate | Control IS operating effectively |
| > Tolerable Rate | Control is NOT operating effectively |

**Our Results:**
• UDL (~6.2%) > Tolerable Rate (5%)
• **Conclusion: Control is NOT operating effectively**

**Why Other Options Are Wrong:**

• **"Control is operating effectively":** Only valid if UDL ≤ Tolerable Rate. Here UDL exceeds tolerable rate.

• **"Expand sample size":** Not appropriate. The results already show the control is ineffective. Expanding the sample would just confirm this at greater cost. (Note: Expanding might be appropriate if results were borderline, but 2.15% actual vs. 1% expected is not borderline.)

• **"Results are inconclusive":** Attributes sampling provides a clear conclusion — either the control is effective or it isn't. "Inconclusive" is not a valid sampling conclusion.

**Audit Impact:**
Since the control over purchase order approvals is not operating effectively, the auditor must:
1. Reassess control risk (likely increase to maximum)
2. Modify the nature, timing, and extent of substantive procedures
3. Consider whether the deficiency is a significant deficiency or material weakness

**Exam Tip:**
The CPA exam often tests your ability to reach the correct conclusion from sampling results. Remember: UDL > Tolerable = NOT effective. Don't overthink it.`,
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
      explanation: `**Correct Selection:** Yes, substantial doubt exists

**AU-C 570 Framework:**
Substantial doubt exists when conditions and events, considered in the aggregate, indicate it is probable the entity will be unable to meet its obligations as they become due within one year of the financial statement date.

**Conditions Present (from Exhibits):**
| Indicator | Status | Significance |
|-----------|--------|--------------|
| Negative working capital | $(420,000) | Cannot pay current debts |
| Net loss | $(850,000) | Significant deterioration |
| Negative operating cash flow | $(290,000) | Core business unprofitable |
| Loan covenant concerns | Lender worried | Potential default |
| Major customer bankruptcy | 35% of revenue | Severe revenue loss |
| Credit line nearly exhausted | $400K of $500K used | Limited borrowing capacity |

**Why "Yes" is Correct:**
Multiple SERIOUS indicators exist simultaneously:
• Financial: Losses, negative cash flow, negative working capital
• Operational: Lost major customer (35% of revenue!)
• External: Lender expressing concern about covenants

One or two minor indicators might not create substantial doubt. This combination clearly does.

**Why Other Options Are Wrong:**
• "No, conditions do not create substantial doubt": The evidence is overwhelming — this is not a close call
• "Cannot determine": Sufficient information is provided; the auditor must make a judgment

**Exam Tip:**
Look for the PATTERN, not just individual indicators. Multiple concurrent problems = substantial doubt.`,
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
      explanation: `**Correct Selection:** No - Plans are not adequately supported

**This is worth 2 points — careful analysis required!**

**AU-C 570.13 Evaluation Criteria:**
Management's plans are considered mitigating if:
1. It is PROBABLE the plans can be implemented, AND
2. It is PROBABLE the plans will mitigate the conditions

**Analysis of Each Plan (from Exhibit 3):**

| Plan | Status | Probability Assessment |
|------|--------|----------------------|
| Cost reduction ($400K) | ✓ Already implemented | **PROBABLE** — already done |
| Asset sale ($750K) | Letter of intent (non-binding) | **NOT probable** — no commitment |
| New financing ($1M) | "Positive discussions" only | **NOT probable** — no commitment |
| New customers | Actively pursuing, no contracts | **NOT probable** — speculative |

**Why Plans Are Inadequate:**
• Only ONE plan is implemented (cost reduction)
• $400,000 savings is insufficient to overcome:
  - $(850,000) net loss
  - Loss of 35% of revenue from bankrupt customer
  - $(290,000) negative cash flow
• Remaining plans have NO firm commitments

**The "Probable" Standard:**
• Non-binding LOI ≠ probable (seller can walk away)
• "Positive discussions" ≠ probable (lender hasn't approved)
• "Pursuing customers" ≠ probable (no signed contracts)

**Why Other Options Are Wrong:**
• "Yes, plans adequately mitigate": Only implemented plan is insufficient; others are speculative
• "Partially mitigate but require monitoring": AU-C 570 doesn't have a partial standard — either alleviated or not

**Exam Tip:**
Focus on whether plans are COMMITTED vs. merely CONTEMPLATED. Intentions don't count — firm commitments do.`,
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
      explanation: `**Correct Selection:** Disclose conditions and management's plans

**ASC 205-40 Disclosure Requirements:**
When substantial doubt exists (whether or not alleviated), the entity must disclose:

**Required Disclosures:**
1. Principal conditions that raised substantial doubt
2. Management's evaluation of the significance of those conditions
3. Management's plans to mitigate the conditions
4. If doubt is NOT alleviated: Statement that substantial doubt exists

**What to Disclose in This Case:**
• Negative working capital of $(420,000)
• Net loss of $(850,000) and negative operating cash flows
• Loan covenant concerns from principal lender
• Loss of major customer (35% of revenue)
• Description of cost reduction, asset sale, and financing plans

**Why Other Options Are Wrong:**

• **"No disclosure required":** Disclosure is ALWAYS required when substantial doubt exists, regardless of whether plans alleviate it.

• **"Disclose only management's plans":** Must also disclose the CONDITIONS that created the doubt. Users need to understand both the problem and the proposed solution.

**Exam Tip:**
Going concern disclosures are required when:
- Substantial doubt EXISTS (regardless of mitigation), OR
- Substantial doubt WAS alleviated by management's plans

The only time NO disclosure is needed is when conditions never raised substantial doubt in the first place.`,
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
      explanation: `**Correct Selection:** Unmodified opinion with emphasis-of-matter paragraph

**This is worth 2 points — key exam concept!**

**AU-C 570.24-25 Decision Tree:**

| Situation | Disclosure | Report Modification |
|-----------|------------|---------------------|
| Doubt exists, NOT alleviated | Adequate | Unmodified + EOM |
| Doubt exists, NOT alleviated | Inadequate | Qualified or Adverse |
| Doubt alleviated by plans | Adequate | Unmodified (no EOM required) |

**Our Situation:**
• Substantial doubt: YES
• Plans alleviate doubt: NO (plans not adequately supported)
• Disclosure assumed: ADEQUATE
• Result: **Unmodified opinion WITH Emphasis-of-Matter paragraph**

**Why Unmodified (Not Qualified or Disclaimer):**
Going concern is about the entity's SITUATION, not the financial statements' conformity with GAAP:
• If disclosures are adequate → Financial statements FAIRLY present the situation
• Fair presentation = unmodified opinion
• EOM draws attention to the going concern but doesn't modify the opinion

**Emphasis-of-Matter Paragraph Content:**
The paragraph references the note disclosing:
• Conditions creating substantial doubt
• Management's plans
• That substantial doubt exists about the entity's ability to continue as a going concern

**Why Other Options Are Wrong:**

• **"Unmodified with no modification":** EOM is REQUIRED when doubt is NOT alleviated (AU-C 570.24)

• **"Qualified opinion":** Only if disclosures are INADEQUATE (not the case here)

• **"Disclaimer of opinion":** Only if auditor cannot obtain sufficient evidence to conclude on going concern (extremely rare)

**Memory Aid:**
"Adequate disclosure + going concern doubt = Unmodified + EOM"`,
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
      explanation: `**Correct Selection:** Independence is impaired

**AICPA Code ET 1.240.010 (Direct Financial Interests):**
A covered member's independence is impaired if the covered member or their immediate family has ANY direct financial interest in the client.

**Key Facts:**
• Engagement partner's SPOUSE owns stock = Immediate family
• Stock ownership = DIRECT financial interest
• Amount ($3,500) and materiality (0.18% of net worth) are IRRELEVANT

**The "Bright Line" Rule:**
| Type of Interest | Materiality Matters? | Independence Impact |
|------------------|---------------------|---------------------|
| Direct financial interest | NO | Always impaired |
| Indirect financial interest | YES | Depends on materiality |

**Why Materiality Doesn't Apply:**
Direct financial interests (owning shares directly) are prohibited REGARDLESS of:
• Dollar amount ($3,500 vs. $3.5 million)
• Percentage of portfolio
• Significance to net worth

**Why Other Options Are Wrong:**
• "Independence is not impaired": Would only be true for INDIRECT interests below materiality threshold
• "Impaired unless safeguards applied": No safeguard can cure a direct financial interest — must divest

**Resolution Required:**
The spouse must dispose of the stock BEFORE the engagement can be accepted.

**Exam Tip:**
"Spouse" = Immediate family = Same rules as the member themselves. Any direct financial interest = automatic impairment.`,
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
      explanation: `**Correct Selection:** Independence is impaired

**AICPA Code ET 1.260.020 (Close Relatives in Key Positions):**
Independence is impaired if a covered member has a close relative (parent, sibling, nondependent child) in a KEY POSITION at the client.

**Analysis:**
| Factor | Status |
|--------|--------|
| Staff member on engagement | Covered member ✓ |
| Father = Close relative | Yes (parent) ✓ |
| VP of Sales = Key position | Yes ✓ |

**What is a "Key Position"?**
A position with:
• Primary responsibility for significant accounting functions, OR
• Ability to exercise influence over the financial statements

VP of Sales typically qualifies because:
• Controls revenue recognition decisions
• Influences sales returns and allowances
• Affects accounts receivable estimates
• May have side agreements affecting revenue

**Why "Impaired" (Not "Apply Safeguards"):**
For close relatives in KEY positions, no safeguards are sufficient. The ONLY solution is to:
• Remove the staff member from the engagement team, OR
• Not accept the engagement

**Why Other Options Are Wrong:**
• "Not impaired": Close relative + key position = automatic impairment
• "Safeguards": Unlike non-key positions, safeguards cannot cure this

**Exam Tip:**
Close relative in KEY position = impaired
Close relative in NON-key position = evaluate threats, apply safeguards`,
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
      explanation: `**Correct Selection:** Independence is not impaired

**AICPA Code ET 1.295.040 (Bookkeeping Services):**
Bookkeeping services DO NOT impair independence for NON-ISSUERS if certain safeguards are met.

**Analysis of the Services:**
| Service | Independence Concern? |
|---------|----------------------|
| Posting adjusting entries prepared by management | No — client-prepared entries |
| Preparing monthly F/S from client's trial balance | No — ministerial function |

**Required Safeguards (All Met Here):**
1. ✓ Client takes responsibility for F/S (management prepared entries)
2. ✓ CPA doesn't make management decisions (just posting/compiling)
3. ✓ Underlying data authorized by management (entries from management)
4. ✓ CPA doesn't perform management functions

**Why NOT Impaired:**
The CPA is performing MINISTERIAL tasks:
• Posting = data entry function
• Preparing statements from trial balance = compilation

Management retains responsibility for:
• What entries to record
• Authorization of transactions
• Approval of final statements

**Key Distinction — Issuer vs. Non-Issuer:**
| Entity Type | Bookkeeping Allowed? |
|-------------|---------------------|
| Non-issuer (AICPA) | Yes, with safeguards |
| Issuer (SEC/PCAOB) | NO — prohibited |

This is a NON-ISSUER → AICPA rules apply.

**Why Other Options Are Wrong:**
• "Impaired": Only if CPA makes management decisions or for issuers
• "Safeguards required": Safeguards are built into the service description — already met`,
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
      explanation: `**Correct Selection:** Independence is not impaired

**AICPA Conceptual Framework Approach:**
When a threat to independence exists, evaluate whether safeguards can reduce the threat to an acceptable level.

**Key Fact:**
"The manager will have NO involvement in the audit engagement"

**Analysis:**
| Factor | Status |
|--------|--------|
| Manager's brother at client | Close relative |
| IT Director = Key position | Yes (controls IT systems) |
| Manager on engagement? | **NO — removed** |

**Why NOT Impaired:**
The threat is ELIMINATED because:
• Manager is NOT a covered member for this engagement
• Manager has no role in the audit
• Manager cannot influence the audit opinion

**The Safeguard Applied:**
Removing the individual from the engagement team is a recognized safeguard that can eliminate the threat entirely.

**Compare to Situation B:**
| Situation | On Engagement? | Result |
|-----------|----------------|--------|
| B: Staff member (father VP) | YES | Impaired |
| D: Manager (brother IT Dir) | NO | Not impaired |

**Why Other Options Are Wrong:**
• "Impaired": Only if the person with the relationship is ON the engagement
• "Safeguards": The safeguard (removal from team) is already in place

**Exam Tip:**
The key question is always: "Is the person with the threatening relationship INVOLVED in the engagement?"
- Yes → likely impaired
- No → threat eliminated`,
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
      explanation: `**Correct Selection:** Independence is not impaired

**AICPA Code ET 1.295.110 (Tax Services):**
Tax compliance services do NOT impair independence for non-issuers when proper safeguards are in place.

**Analysis:**
| Tax Service | Independence Impact |
|-------------|---------------------|
| Preparing federal/state returns | Permitted |
| Recommending tax positions | Permitted |
| Making uncertain tax position determinations | Permitted (with management approval) |

**Why NOT Impaired:**
Tax services are fundamentally different from bookkeeping because:
• Tax returns are separate from financial statements
• Client reviews and signs the returns
• CPA is acting as tax advisor, not management

**Required Safeguards (Assumed Met):**
1. Management reviews and approves tax returns before filing
2. Client takes responsibility for tax positions
3. CPA informs client of results and basis for recommendations

**What WOULD Impair Independence:**
• Representing client in court (advocacy)
• Signing return under power of attorney without client review
• Making executive decisions about positions without management approval

**Key Point — "Determining" vs. "Recommending":**
The scenario says firm "determined" positions to take. This is acceptable if:
• CPA recommends positions
• Management evaluates and approves
• Client takes responsibility

**Exam Tip:**
Tax services rarely impair independence for non-issuers. The exam typically tests scenarios where:
- CPA acts as advocate in court, OR
- CPA signs without client review`,
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
      explanation: `**Correct Entry:** Dr. Sales Revenue — $60,000

**Cutoff Error Analysis (ASC 606):**

**Key Facts:**
• Shipped December 30, Year 1
• Terms: FOB DESTINATION
• Arrived at customer: January 3, Year 2
• Meridian recorded sale on December 30 — **ERROR**

**FOB Destination = Title Passes on DELIVERY:**
| Shipping Term | Title Passes When | Risk of Loss |
|---------------|-------------------|--------------|
| FOB Destination | Goods arrive at buyer | Seller bears transit risk |
| FOB Shipping Point | Goods leave seller | Buyer bears transit risk |

**Why Sale Was Recorded Too Early:**
Control did NOT transfer until January 3 (when goods arrived).
• December 30: Goods still in transit → No sale yet
• January 3: Goods delivered → Now recognize sale (Year 2)

**Adjusting Entry (Debit Side):**
Dr. Sales Revenue     $60,000
    (Reverse premature revenue recognition)

**Why NOT Debit Inventory or COGS:**
The question states Meridian uses a periodic system. In periodic inventory:
• COGS is calculated at year-end, not entry by entry
• The inventory physical count will capture goods in transit
• A separate entry may be needed for inventory, but this requirement asks only about revenue

**Common Mistakes:**
• Debiting COGS (periodic system — COGS determined at year-end)
• Using cost ($45,000) instead of sales price ($60,000)`,
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
      explanation: `**Correct Entry:** Cr. Accounts Receivable — $60,000

**Complete Revenue Reversal Entry:**
Dr. Sales Revenue          $60,000
    Cr. Accounts Receivable      $60,000

**Why Credit Accounts Receivable:**
When the sale was incorrectly recorded, Meridian debited A/R. Since the sale shouldn't have been recognized:
• Sales → reversed (debited)
• A/R → reversed (credited)

**Why NOT Credit Inventory:**
In a PERIODIC inventory system:
• Inventory is not reduced when sales are recorded
• Ending inventory is determined by physical count
• COGS = Beginning Inventory + Purchases − Ending Inventory
• The physical count will include goods in transit (FOB destination = still owned by seller)

**Why NOT Credit Deferred Revenue:**
• Deferred revenue would imply cash was received in advance
• This was a credit sale — customer hasn't paid yet
• The receivable should simply be removed

**Year 2 Treatment:**
In Year 2, when goods arrive (January 3):
Dr. Accounts Receivable    $60,000
    Cr. Sales Revenue           $60,000

**Exam Tip:**
Cutoff adjustments for FOB destination:
- Shipped before year-end, ARRIVES after = Seller's inventory, no sale
- FOB shipping point would be the opposite`,
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
      explanation: `**Correct Entry:** Dr. Consulting Expense — $15,000

**Accrual Accounting (ASC 405):**
Expenses are recognized when INCURRED, not when paid.

**Key Facts:**
• Invoice date: December 28, Year 1
• Services rendered: December Year 1
• Payment date: January 15, Year 2
• Invoice NOT recorded — **ERROR**

**Why Expense in Year 1:**
| Question | Answer |
|----------|--------|
| When were services performed? | December Year 1 |
| When was benefit received? | December Year 1 |
| When should expense be recognized? | **Year 1** |

The payment date is irrelevant for accrual accounting.

**Adjusting Entry (Debit Side):**
Dr. Consulting Expense     $15,000
    (Record expense when incurred)

**Why NOT Debit Prepaid Expense:**
• Prepaid is for amounts paid BEFORE service is received
• Here, service was received in December; no payment made yet
• This is an ACCRUED expense, not a prepaid expense

**Impact on Financial Statements:**
• Income Statement: Expenses understated by $15,000
• Balance Sheet: Liabilities understated by $15,000
• Net effect: Both income and equity overstated

**Common Mistakes:**
• Recording expense when paid (cash basis error)
• Using wrong expense account`,
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
      explanation: `**Correct Entry:** Cr. Accounts Payable — $15,000

**Complete Accrual Entry:**
Dr. Consulting Expense     $15,000
    Cr. Accounts Payable         $15,000

**Why Credit Accounts Payable:**
• Invoice received = obligation to pay vendor
• A/P captures amounts owed to suppliers for goods/services received
• The invoice is dated December 28 and relates to December services

**Why Accounts Payable (Not Accrued Expenses):**
| Account | Use When |
|---------|----------|
| Accounts Payable | Invoice received from vendor |
| Accrued Expenses | No invoice yet, estimate liability |

Since the invoice was received, A/P is the correct account.

**Note:** Some entities use "Accrued Expenses" for all uninvoiced liabilities and A/P only after invoice entry. Either is acceptable if applied consistently. The key is recognizing the LIABILITY.

**When Entry Reverses (Year 2):**
When paid on January 15, Year 2:
Dr. Accounts Payable     $15,000
    Cr. Cash                    $15,000

**Summary of Finding 2:**
| Error | Correction |
|-------|------------|
| Expense not recorded | Debit Consulting Expense |
| Liability not recorded | Credit Accounts Payable |
| Net income overstated | Entry reduces income |

**Exam Tip:**
Accrued expenses increase expenses (debit) and liabilities (credit). Always think: "What do we OWE?"`,
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
      explanation: `**Correct Selection:** Accounting principles generally accepted in the United States of America

**AR-C 90 Review Report Requirements:**
The management's responsibility paragraph must identify the applicable financial reporting framework.

**Why This Wording:**
• "Accounting principles generally accepted in the United States of America" is the STANDARD phrase for US GAAP
• Must match the framework used to prepare the financial statements
• Using different wording (like abbreviations) could create confusion

**Why Other Options Are Wrong:**

• **IFRS:** Would only be correct if the entity prepared statements under International standards. This is a US LLC using US GAAP.

• **GAAS:** "Generally accepted auditing standards" relates to AUDIT procedures, not the financial reporting framework. This is about how statements are PREPARED, not how they're AUDITED.

• **SSARS:** "Statements on Standards for Accounting and Review Services" is the professional standard the ACCOUNTANT follows, not the framework management uses for financial statements.

**Exam Tip:**
The report must clearly distinguish between:
- Framework for F/S preparation: US GAAP, IFRS, tax basis, etc.
- Standards for the engagement: SSARS (review), GAAS (audit)`,
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
      explanation: `**Correct Selection:** Limited

**AR-C 90.03 — Objective of a Review:**
The objective is to obtain LIMITED assurance as a basis for reporting whether the accountant is aware of any material modifications.

**Assurance Level Comparison:**
| Engagement Type | Assurance Level | Expression |
|-----------------|-----------------|------------|
| Audit | Reasonable | Positive opinion |
| Review | **Limited** | Negative conclusion |
| Compilation | None | No assurance |

**Why "Limited" (Not "Reasonable"):**
• Review procedures are less extensive than audit procedures
• Inquiry and analytical procedures only (no substantive testing)
• Cannot obtain same level of certainty as an audit

**Why "Negative" Assurance:**
The conclusion states what the accountant is NOT aware of:
"We are not aware of any material modifications..."
vs. Audit positive assurance: "The statements present fairly..."

**Why Other Options Are Wrong:**

• **Reasonable:** That's audit assurance — requires substantive procedures, testing of controls, confirmations, etc.

• **Absolute:** No engagement provides absolute assurance. Even audits only provide "reasonable" assurance due to inherent limitations.

• **Moderate:** Not a recognized assurance level in professional standards.

**Memory Aid:**
"Review = Limited = Less = Negative conclusion"`,
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
      explanation: `**Correct Selection:** Analytical procedures

**AR-C 90.25 — Review Procedures:**
A review of financial statements consists PRIMARILY of:
1. Inquiry of management and others
2. **Analytical procedures**

**What Are Analytical Procedures?**
• Comparisons of financial data (current vs. prior year)
• Ratio analysis
• Trend analysis
• Comparison to industry benchmarks
• Comparison to budgets or expectations

**Why "Analytical Procedures":**
The report states the review "includes primarily applying [BLANK] to financial data" — this directly describes analytical procedures (applying analysis to the numbers).

**Why Other Options Are Wrong:**

• **Substantive tests:** These are AUDIT procedures (testing transactions, balances). Reviews don't include substantive testing of underlying transactions.

• **Tests of controls:** These evaluate internal control operating effectiveness — an AUDIT procedure, not performed in reviews.

• **Inspection procedures:** Examination of documents/records is primarily an audit procedure. While accountants may look at documents during inquiry, "inspection" is not the primary procedure.

**Key Distinction:**
| Audit | Review |
|-------|--------|
| Substantive tests | Inquiry |
| Tests of controls | Analytical procedures |
| Confirmations | (No confirmations) |
| Physical observation | (No physical procedures) |

**Memory Aid:**
Review = "I & A" = Inquiry and Analytical procedures`,
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
      explanation: `**Correct Selection:** An audit opinion

**This is a KEY exam concept!**

**The Sentence in Context:**
"A review...does not enable us to obtain assurance that we would become aware of all significant matters. Accordingly, we do not express [BLANK]."

**Why "An Audit Opinion":**
The report is explaining what a review DOESN'T provide:
• We don't express an AUDIT OPINION
• Because we didn't perform audit procedures
• Only audits result in opinions

**Review vs. Audit Report Language:**
| Audit Report | Review Report |
|--------------|---------------|
| "In our OPINION..." | "We are not aware of..." |
| Positive expression | Negative expression |
| Express opinion | Express CONCLUSION |

**Why Other Options Are Wrong:**

• **"A conclusion":** Reviews DO express a conclusion! That's exactly what the final paragraph contains. The accountant is saying "we don't express an opinion" — but they DO express a conclusion.

• **"Any assurance":** Reviews DO provide LIMITED assurance. The report specifically states procedures are performed to obtain limited assurance. The accountant is NOT saying "no assurance."

• **"Findings":** "Findings" isn't standard terminology for either audits or reviews. Both express opinions/conclusions, not findings.

**Memory Aid:**
Audit = Opinion
Review = Conclusion
(NOT the same thing!)`,
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
      explanation: `**Correct Selection:** No - Offer was effectively revoked

**Legal Rule — Revocation of Offers (Common Law):**
Under common law, an offer can be revoked at ANY TIME before acceptance, even if the offeror promised to keep it open, UNLESS:
1. There is an option contract (consideration paid to keep offer open), OR
2. Promissory estoppel applies (detrimental reliance)

**Timeline Analysis:**
• Monday: Seller offers to sell widgets, "open for 10 days"
• Wednesday: Seller sells to third party (revocation by conduct)
• Thursday: Buyer attempts to accept

**Why No Contract:**
Seller's sale to the third party on Wednesday was an **indirect revocation** — an act inconsistent with the offer that terminates it. Even though Buyer didn't receive direct notice, Seller's conduct terminated the offer.

**Why "10 days" Doesn't Help Buyer:**
The promise to keep the offer open for 10 days was NOT supported by consideration. A bare promise to hold an offer open is not binding under common law.

**Compare to Scenario C:**
This is common law (services/widgets not under UCC context), not UCC. The UCC Firm Offer Rule (Scenario C) only applies to merchants selling GOODS.

**Why Other Options Are Wrong:**
• "Yes - Valid acceptance": Offer was terminated before acceptance
• "Voidable by Seller": Voidable implies a contract exists; here no contract was formed`,
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
      explanation: `**Correct Selection:** No - Lacks consideration for modification

**Legal Rule — Pre-Existing Duty Rule:**
A promise to do what one is ALREADY legally obligated to do is NOT valid consideration. Therefore, a contract modification that only benefits one party is unenforceable.

**Analysis:**
• Original contract: Contractor builds garage for $25,000
• Modification: Contractor demands $28,000 to complete the same work
• Homeowner's promise to pay extra: NOT enforceable

**Why Not Enforceable:**
Contractor is already legally bound to build the garage. His "promise" to do so in exchange for more money is not NEW consideration — it's the same duty he already has. This is classic **economic duress** disguised as modification.

**Exceptions (Not Present Here):**
1. **Mutual rescission + new contract:** Both parties agree to cancel original contract and enter a new one
2. **Unforeseen circumstances:** Genuinely unforeseeable events (soil conditions were discoverable through due diligence)
3. **UCC §2-209:** Modifications to goods contracts don't require consideration (but this is a SERVICE contract)

**Why Other Options Are Wrong:**
• "Written modification is valid": Writing alone doesn't cure lack of consideration
• "Enforceable for $3,000 only": The entire modification fails, not just part of it

**Exam Tip:**
Distinguish service contracts (common law, need consideration for modification) from goods contracts (UCC, no consideration needed for good-faith modification).`,
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
      explanation: `**Correct Selection:** No - UCC Firm Offer Rule applies

**Legal Rule — UCC §2-205 (Firm Offer Rule):**
An offer by a MERCHANT to buy or sell GOODS is IRREVOCABLE if:
1. Made in a signed WRITING, AND
2. States it will be held open

No consideration is required! The offer is irrevocable for the stated period (up to 3 months max).

**Analysis:**
✓ Merchant: Supplier is a merchant (deals in goods)
✓ Goods: Sale of goods for $10,000
✓ Signed writing: Offer was signed and in writing
✓ States period: "Open for 15 days"
✓ Within 3-month limit: 15 days < 3 months

**All elements met → Firm Offer is IRREVOCABLE**

**Timeline:**
• June 1: Supplier makes firm offer (irrevocable for 15 days)
• June 8: Supplier sells to another party (BREACH!)
• June 8: Merchant accepts (valid acceptance)
• Result: Contract formed; Supplier is liable for breach

**Why Different from Scenario A:**
| Scenario A | Scenario C |
|------------|------------|
| Common law | UCC Article 2 |
| Services/unspecified | Goods |
| Oral or informal offer | Signed written offer |
| Revocable anytime | Firm offer irrevocable |

**Why Other Options Are Wrong:**
• "Offer was revocable": Firm Offer Rule makes it irrevocable
• "Depends on unique goods": Uniqueness is irrelevant; rule applies to all goods`,
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
      explanation: `**Correct Selection:** The car in its current condition

**Legal Rule — Minor's Right to Disaffirm:**
Contracts with minors (under 18) are VOIDABLE at the minor's option. When a minor disaffirms:
1. Minor must return any property still in their possession
2. Minor receives full refund of payments made
3. Minor is NOT liable for depreciation, wear, or damage (majority rule)

**Analysis:**
• Minor is 17 (under 18) → contract is voidable
• Minor drove car for 2 months, 3,000 miles → car has depreciated
• Minor disaffirms → returns car AS-IS, gets $15,000 back

**Why Minor Gets Full Refund:**
The majority rule protects minors from being held to adult contracts. The policy is that adults dealing with minors assume the risk of disaffirmance.

**Minority Rule (Some States):**
Some jurisdictions require minors to compensate for "benefit received" or depreciation. The CPA exam typically tests the majority rule unless stated otherwise.

**Exceptions — Cannot Disaffirm:**
1. Contracts for necessaries (food, shelter, medical care)
2. Contracts ratified after reaching majority (age 18)
3. Misrepresentation of age (in some states)

**Why Other Options Are Wrong:**
• "Car plus depreciation": Majority rule doesn't require depreciation payment
• "Nothing": Minor must return property received; can't keep both car AND money`,
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
      explanation: `**Correct Selection:** No - Missing essential term (price)

**Legal Rule — Essential Terms for Real Estate Contracts:**
A contract for the sale of land must include all ESSENTIAL TERMS:
1. Identification of the parties
2. Description of the property
3. **PRICE or method to determine price**
4. Signatures (for Statute of Frauds)

**Why This Contract Fails:**
The contract lacks a specified price, and there is no formula or method in the contract to determine the price. The parties' intent to "negotiate later" is not sufficient.

**Real Estate vs. UCC (Goods):**
| Real Estate (Common Law) | Goods (UCC) |
|--------------------------|-------------|
| Price MUST be stated | Price can be omitted |
| Court won't imply FMV | Court implies "reasonable price" |
| Strict on essential terms | Gap-fillers available |

**Why Can't Court Imply FMV?**
Real estate is unique. Courts are reluctant to "make a contract" for the parties when they clearly intended to negotiate a key term. This is not a minor missing term — price is fundamental.

**Why "Statute of Frauds" is Wrong:**
The Statute of Frauds requires land contracts to be in WRITING and signed. This contract IS signed. The issue is the missing PRICE term, which is a separate contract formation problem.

**Exam Tip:**
The CPA exam tests the distinction between:
• Statute of Frauds (must be in writing) — this contract passes
• Essential terms (must include price) — this contract FAILS`,
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
      explanation: `**Answer:** $107,000

**IRC §61 — Gross Income Calculation:**

| Income Item | Amount | Included? | Reason |
|-------------|--------|-----------|--------|
| Wages (W-2) | $85,000 | ✓ Yes | Compensation for services |
| Savings interest | $1,200 | ✓ Yes | Taxable interest |
| Qualified dividends | $2,500 | ✓ Yes | Taxable (preferential rate) |
| State tax refund | $800 | ✓ Yes | Tax benefit rule — itemized last year |
| Alimony received | $12,000 | ✓ Yes | Pre-2019 divorce = taxable |
| Unemployment | $3,500 | ✓ Yes | Always taxable |
| Municipal bond interest | $1,500 | ✗ No | Tax-exempt per IRC §103 |
| Gambling winnings | $2,000 | ✓ Yes | Taxable income |

**Calculation:**
$85,000 + $1,200 + $2,500 + $800 + $12,000 + $3,500 + $2,000 = **$107,000**

**Key Exclusions:**
• **Municipal bond interest ($1,500):** Excluded under IRC §103. This is the most tested exclusion on the CPA exam.

**Key Inclusion — Alimony:**
| Divorce Date | Alimony Treatment |
|--------------|-------------------|
| Before 2019 | Taxable to recipient, deductible by payer |
| After 2018 | NOT taxable or deductible (property settlement) |

Divorce finalized 2015 → OLD rules apply → **Taxable**

**Common Mistakes:**
• Excluding state refund (only excluded if didn't itemize last year)
• Excluding alimony (check divorce date!)
• Including municipal bond interest`,
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
      explanation: `**Answer:** $6,500

**IRC §219 — Traditional IRA Deduction:**

**Contribution Limits (2024):**
| Age | Limit |
|-----|-------|
| Under 50 | $7,000 |
| 50 and over | $8,000 (catch-up) |

Maria is under 50 → Maximum contribution = $7,000
Maria contributed $6,500 → Full amount deductible per question

**Active Participant Phase-Out (Single, 2024):**
| MAGI | Deduction |
|------|-----------|
| Below $77,000 | Full deduction |
| $77,000 - $87,000 | Partial deduction |
| Above $87,000 | No deduction |

**Note:** The question states Maria is "eligible," meaning we assume she's within the deduction limits.

**Why Full Amount:**
• Contributed $6,500
• Under contribution limit
• Question states eligible (no phase-out)
• **Full $6,500 is deductible**

**Common Mistakes:**
• Using the catch-up limit when taxpayer is under 50
• Not checking if covered by employer plan (affects phase-out)
• Confusing Traditional IRA (deductible) with Roth IRA (not deductible)

**Exam Tip:**
IRA contribution = above-the-line deduction (adjustment to income, available even if not itemizing)`,
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
      explanation: `**Answer:** $2,200

**IRC §221 — Student Loan Interest Deduction:**

**Deduction Limit:** Lesser of:
• Amount paid, OR
• $2,500 maximum

Maria paid $2,200 < $2,500 → **Full amount deductible**

**MAGI Phase-Out (Single, 2024):**
| MAGI | Deduction |
|------|-----------|
| Below $75,000 | Full deduction |
| $75,000 - $90,000 | Partial deduction |
| Above $90,000 | No deduction |

**Per the question:** "Assume fully deductible" → No phase-out applies

**Requirements for Deduction:**
✓ Paid interest on qualified education loan
✓ Legally obligated to pay
✓ Not claimed as dependent on another return
✓ Filing status: Single, MFS (if lived apart), HOH, QSS, or MFJ

**Key Points:**
• Above-the-line deduction (no need to itemize)
• Interest only — not principal payments
• Qualified expenses: tuition, room & board, books, etc.

**Common Mistakes:**
• Using $2,500 when amount paid is less
• Forgetting MAGI phase-out for high earners
• Including principal payments (only interest is deductible)

**Exam Tip:**
Student loan interest is always an ADJUSTMENT (above-the-line), not an itemized deduction.`,
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
      explanation: `**Answer:** $12,550

**IRC §62 — Adjustments to Income ("Above-the-Line" Deductions):**

| Adjustment | Amount | Reference |
|------------|--------|-----------|
| Traditional IRA | $6,500 | IRC §219 |
| Student loan interest | $2,200 | IRC §221 |
| HSA contribution | $3,850 | IRC §223 |
| **Total** | **$12,550** | |

**Calculation:**
$6,500 + $2,200 + $3,850 = **$12,550**

**HSA Contribution (IRC §223):**
• Maximum for self-only coverage (2024): $4,150
• Maria contributed $3,850 → Below limit, fully deductible
• Requirement: Must have qualifying HDHP (High Deductible Health Plan) ✓

**Why These Are "Adjustments" (Not Itemized Deductions):**
• Reduce AGI directly
• Available even if using standard deduction
• Appear on Schedule 1 (Form 1040)
• Sometimes called "above-the-line" deductions

**Items NOT Included:**
• Self-employment tax: $0 (Maria has no SE income)
• Educator expenses: $0 (none incurred)

**Common Mistakes:**
• Including itemized deductions (medical, SALT) — those are below-the-line
• Forgetting HSA (frequently tested!)
• Double-counting items

**Exam Tip:**
Key adjustments to memorize: IRA, HSA, student loan interest, self-employment tax (1/2), alimony paid (pre-2019), educator expenses ($300)`,
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
      explanation: `**Answer:** $94,450

**AGI Formula:**
Adjusted Gross Income = Gross Income − Adjustments to Income

**Calculation:**
| Component | Amount |
|-----------|--------|
| Gross Income | $107,000 |
| Less: Adjustments | ($12,550) |
| **AGI** | **$94,450** |

$107,000 − $12,550 = **$94,450**

**Why AGI Matters:**
AGI is the "gatekeeper" for many tax benefits:
• Medical expense threshold (7.5% of AGI)
• Miscellaneous deduction thresholds
• Phase-outs for credits and deductions
• Roth IRA contribution eligibility
• Student loan interest phase-out

**The AGI "Waterfall":**
\`\`\`
Gross Income (all sources)
- Adjustments to Income
= Adjusted Gross Income (AGI)
- Standard Deduction OR Itemized Deductions
= Taxable Income
\`\`\`

**Verification:**
| Item | Amount |
|------|--------|
| Wages | $85,000 |
| Interest | $1,200 |
| Dividends | $2,500 |
| State refund | $800 |
| Alimony | $12,000 |
| Unemployment | $3,500 |
| Gambling | $2,000 |
| **Gross Income** | **$107,000** |
| Less: IRA | ($6,500) |
| Less: Student loan | ($2,200) |
| Less: HSA | ($3,850) |
| **AGI** | **$94,450** |`,
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
      explanation: `**Answer:** $(6,000) — Net Short-Term Capital Loss

**Holding Period Rule (IRC §1222):**
| Holding Period | Classification |
|----------------|----------------|
| ≤ 1 year | Short-term |
| > 1 year | Long-term |

**Short-Term Transactions (from Exhibit 1):**

| Stock | Purchase | Sale | Held | Proceeds | Basis | Gain/(Loss) |
|-------|----------|------|------|----------|-------|-------------|
| Gamma | 11/10/Yr1 | 12/05/Yr1 | 25 days | $6,000 | $9,000 | **(3,000)** |
| Echo | 09/15/Yr1 | 11/22/Yr1 | 68 days | $4,500 | $7,500 | **(3,000)** |

**Calculation:**
Gamma: $6,000 − $9,000 = $(3,000) loss
Echo: $4,500 − $7,500 = $(3,000) loss
**Net STCL = $(6,000)**

**Why These Are Short-Term:**
Both stocks purchased and sold within same year → clearly ≤ 1 year holding.

**Common Mistakes:**
• Confusing which stocks are ST vs. LT (check dates carefully!)
• Subtracting wrong direction (proceeds − basis, not basis − proceeds)

**Exam Tip:**
Count holding period from day AFTER purchase to day of sale. Over 1 year = long-term.`,
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
      explanation: `**Answer:** $8,000 — Net Long-Term Capital Gain (Before Carryover)

**Long-Term Transactions (from Exhibit 1):**

| Stock | Purchase | Sale | Held | Proceeds | Basis | Gain/(Loss) |
|-------|----------|------|------|----------|-------|-------------|
| Alpha | 03/15/Yr0 | 02/20/Yr1 | 11+ mo | $15,000 | $10,000 | **$5,000** |
| Beta | 06/01/Yr0 | 08/15/Yr1 | 14+ mo | $8,000 | $12,000 | **(4,000)** |
| Delta | 01/20/Yr0 | 07/30/Yr1 | 18+ mo | $25,000 | $18,000 | **$7,000** |

**Calculation:**
Alpha: $15,000 − $10,000 = $5,000 gain
Beta: $8,000 − $12,000 = $(4,000) loss
Delta: $25,000 − $18,000 = $7,000 gain
**Net LTCG = $8,000** (before carryover)

**Why These Are Long-Term:**
• Alpha: Mar Yr0 → Feb Yr1 = 11 months, but crosses the 1-year mark
• Beta: Jun Yr0 → Aug Yr1 = 14 months > 1 year ✓
• Delta: Jan Yr0 → Jul Yr1 = 18 months > 1 year ✓

**Note:** This is BEFORE applying the $2,000 LTCL carryover from Year 0. The next requirement applies the carryover.

**Common Mistake:**
Including the carryover in this calculation (it's asked separately).`,
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
      explanation: `**Answer:** $6,000 — Net Long-Term Capital Gain After Carryover

**Capital Loss Carryover Rules (IRC §1212):**

**From Exhibit 2 (Prior Year):**
• LTCL carryover from Year 0: $2,000
• STCL carryover: $0

**Application:**
| Item | Amount |
|------|--------|
| Net LTCG (before carryover) | $8,000 |
| Less: LTCL carryover | $(2,000) |
| **Net LTCG (after carryover)** | **$6,000** |

**Carryover Character Preservation:**
Capital loss carryovers retain their character:
• LTCL carryover → applied against LTCG first
• STCL carryover → applied against STCG first

**Why Apply Carryover to LTCG:**
The $2,000 carryover was a LONG-TERM loss, so it offsets LONG-TERM gains first (preserving the tax rate advantage).

**Carryover Period:**
• Individual taxpayers: Capital losses carry forward INDEFINITELY
• Corporations: Capital losses carry back 3 years, forward 5 years

**Common Mistake:**
Applying LTCL carryover against STCG first — wrong order. Apply like-kind first (LT to LT).`,
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
      explanation: `**Answer:** $0 — Net Capital Gain/Loss

**Capital Gain/Loss Netting (IRC §1222):**

**Step-by-Step Netting:**
| Category | Amount |
|----------|--------|
| Net STCL | $(6,000) |
| Net LTCG (after carryover) | $6,000 |
| **Overall Net** | **$0** |

$(6,000) + $6,000 = **$0**

**The Netting Process:**
1. First, net within each category (ST vs. ST, LT vs. LT)
2. Then, net across categories if one is a gain and one is a loss
3. Result is overall net capital gain or loss

**Our Situation:**
• Net STCL $(6,000) — from Gamma and Echo sales
• Net LTCG $6,000 — from Alpha, Beta, Delta after carryover
• Cross-netting: STCL offsets LTCG exactly

**Tax Implications:**
Since overall net is $0:
• No capital gain to report
• No capital loss to deduct against ordinary income
• No capital loss carryover to next year

**Why This Result Is "Neutral":**
David's short-term losses exactly offset his long-term gains. While he "lost" on short-term positions, those losses sheltered his long-term gains from tax.

**Alternative Scenarios:**
| Net Result | Tax Treatment |
|------------|---------------|
| Net gain | Report as capital gain (LT at preferential rates) |
| Net loss | Deduct up to $3,000 vs. ordinary income; carry forward excess |`,
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
      explanation: `**Answer:** $0 — Capital Loss Deductible Against Ordinary Income

**IRC §1211(b) — Capital Loss Deduction Limit:**

**The Rule:**
Individual taxpayers may deduct net capital losses against ordinary income up to $3,000 per year ($1,500 if MFS).

**But First, You Need a Net Capital Loss!**

**Our Calculation:**
| Item | Amount |
|------|--------|
| Overall net capital gain/loss | $0 |
| Maximum deductible | N/A |
| **Actual deduction** | **$0** |

**Why $0:**
David has no net capital loss to deduct. His losses EXACTLY offset his gains:
• STCL $(6,000) + LTCG $6,000 = $0

Since there's no remaining loss, there's nothing to deduct against ordinary income.

**If He Had a Net Loss:**
| Net Loss | Deductible This Year | Carryforward |
|----------|---------------------|--------------|
| $(2,000) | $2,000 | $0 |
| $(5,000) | $3,000 | $2,000 |
| $(10,000) | $3,000 | $7,000 |

**Common Mistakes:**
• Applying $3,000 limit when there's no net loss
• Confusing gross losses with net losses
• Forgetting to net ST and LT before applying limit

**Exam Tip:**
The $3,000 limit only applies when you have a NET capital loss after all netting is complete.`,
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
      explanation: `**Answer:** $150,000

**From Exhibit 1:**
| Distribution | Date | Amount |
|--------------|------|--------|
| First distribution | March 15 | $60,000 |
| Second distribution | September 30 | $90,000 |
| **Total** | | **$150,000** |

**Calculation:**
$60,000 + $90,000 = **$150,000**

**Why Track Total Distributions:**
The total is compared to available E&P to determine how much is treated as:
1. Dividend (to extent of E&P)
2. Return of capital (to extent of basis)
3. Capital gain (excess over basis)

**Key Observation:**
Total distributions ($150,000) EXCEED total E&P ($130,000), meaning some portion will be non-dividend treatment.`,
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
      explanation: `**Answer:** $130,000 — Total Dividend Income

**IRC §316 — Definition of Dividend:**
A dividend is a distribution from E&P. The dividend amount is LIMITED to total E&P available.

**E&P Analysis:**
| E&P Source | Amount |
|------------|--------|
| Current E&P | $45,000 |
| Accumulated E&P | $85,000 |
| **Total E&P Available** | **$130,000** |

**Distribution Ordering (IRC §316):**
1. **Current E&P first:** Allocated PRO-RATA to all distributions during the year
2. **Accumulated E&P second:** Applied in CHRONOLOGICAL order
3. Excess over E&P → Return of capital / Capital gain

**Application to Janet:**
| Item | Amount |
|------|--------|
| Total distributions | $150,000 |
| Total E&P available | $130,000 |
| **Dividend portion** | **$130,000** |

**Current E&P Pro-Rata Allocation (for timing purposes):**
• March distribution: $60,000 ÷ $150,000 × $45,000 = $18,000 from current E&P
• September distribution: $90,000 ÷ $150,000 × $45,000 = $27,000 from current E&P
• Remaining = from accumulated E&P

**Why Pro-Rata Matters:**
If current E&P is positive but accumulated E&P is negative (deficit), the pro-rata allocation determines which distributions are dividends.

**Common Mistake:**
Treating ALL $150,000 as dividend — must cap at E&P available.`,
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
      explanation: `**Answer:** $20,000 — Tax-Free Return of Capital

**IRC §301(c)(2) — Return of Capital:**
Distributions in excess of E&P reduce the shareholder's stock basis, tax-free.

**Calculation:**
| Item | Amount |
|------|--------|
| Total distributions | $150,000 |
| Less: Dividend portion | $(130,000) |
| **Excess over E&P** | **$20,000** |

**Tax Treatment of Excess:**
| Question | Answer |
|----------|--------|
| Excess over E&P | $20,000 |
| Janet's stock basis | $25,000 |
| Does excess exceed basis? | No ($20,000 < $25,000) |
| Tax treatment | **Tax-free return of capital** |

**Effect on Janet's Basis:**
| Item | Amount |
|------|--------|
| Beginning basis | $25,000 |
| Less: Return of capital | $(20,000) |
| **Ending basis** | **$5,000** |

**Why Tax-Free:**
Return of capital is simply getting your investment back. It reduces basis, but there's no gain until basis reaches zero.

**The Ordering Rules (IRC §301(c)):**
\`\`\`
Distribution
├── (1) Dividend (from E&P) → Taxable as dividend
├── (2) Return of Capital (reduces basis) → Tax-free
└── (3) Capital Gain (excess over basis) → Taxable gain
\`\`\`

**Common Mistake:**
Treating return of capital as taxable — it's only taxable if it exceeds basis.`,
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
      explanation: `**Answer:** $0 — Capital Gain

**IRC §301(c)(3) — Capital Gain on Distributions:**
Any distribution in excess of BOTH E&P and basis is treated as capital gain.

**Calculation:**
| Item | Amount |
|------|--------|
| Total distributions | $150,000 |
| Less: Dividend (from E&P) | $(130,000) |
| Less: Return of capital (reduces basis to $0) | $(25,000) max |
| **Actual return of capital** | $(20,000) |
| **Capital gain** | **$0** |

**Why No Capital Gain:**
| Test | Result |
|------|--------|
| Excess over E&P | $20,000 |
| Janet's basis | $25,000 |
| Excess over basis? | No — $20,000 < $25,000 |
| Capital gain | **$0** |

The return of capital ($20,000) is fully absorbed by Janet's basis ($25,000), leaving $5,000 basis remaining.

**Alternative Scenario — If Capital Gain Applied:**
If distributions were $160,000 instead:
• Dividend: $130,000
• Return of capital: $25,000 (reduces basis to $0)
• Capital gain: $5,000 (excess over basis)

**Complete Summary for Janet:**
| Category | Amount | Tax Treatment |
|----------|--------|---------------|
| Dividend income | $130,000 | Ordinary income (or qualified dividend rate) |
| Return of capital | $20,000 | Tax-free (reduces basis) |
| Capital gain | $0 | N/A |
| **Total distributed** | **$150,000** | |`,
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
      explanation: `**Answer:** $90,000 — Basis Increase from Income Items

**IRC §705(a)(1) — Items That INCREASE Partner Basis:**

| Income Item | Total Partnership | Kevin's 40% | Increases Basis? |
|-------------|-------------------|-------------|------------------|
| Ordinary business income | $200,000 | $80,000 | ✓ Yes |
| Tax-exempt interest | $10,000 | $4,000 | ✓ Yes |
| Section 1231 gain | $15,000 | $6,000 | ✓ Yes |
| Guaranteed payments | $30,000 | $30,000 | ✗ No (see below) |

**Calculation:**
$80,000 + $4,000 + $6,000 = **$90,000**

**Why Guaranteed Payments Don't Separately Increase Basis:**
Guaranteed payments are already INCLUDED in the partnership's ordinary income deduction. Kevin received $30,000 as compensation, which:
• Is deductible by the partnership (reduces ordinary income available to partners)
• Is taxable to Kevin as ordinary income (like salary)
• Does NOT separately increase Kevin's basis

**Why Tax-Exempt Interest Increases Basis:**
Even though tax-exempt interest isn't taxable, it still represents an economic inflow to the partnership. If it didn't increase basis:
• Partner would have phantom gain on sale
• Double taxation of the same economic value

**Common Mistakes:**
• Adding guaranteed payments again (already in ordinary income)
• Excluding tax-exempt income (must include for basis purposes)`,
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
      explanation: `**Answer:** $3,200 — Basis Decrease from Deductions

**IRC §705(a)(2) — Items That DECREASE Partner Basis:**

| Deduction Item | Total Partnership | Kevin's 40% |
|----------------|-------------------|-------------|
| Charitable contributions | $8,000 | **$3,200** |

**Calculation:**
$8,000 × 40% = **$3,200**

**Why Charitable Contributions Reduce Basis:**
Charitable contributions are a SEPARATELY STATED item (IRC §702(a)):
• Not included in partnership ordinary income
• Passed through to partners on Schedule K-1
• Each partner claims their share as an itemized deduction
• MUST reduce partner's basis (to prevent double tax benefit)

**Separately Stated Items (IRC §702(a)):**
These pass through separately and reduce basis:
• Charitable contributions
• Capital gains/losses
• Section 1231 gains/losses
• Tax-exempt income (increases basis)
• Investment interest
• Foreign taxes

**Why This Differs from Ordinary Deductions:**
Ordinary deductions are already reflected in ordinary income. Separately stated items must be tracked separately because they may have special limitations at the partner level (e.g., charitable contribution % limits).

**Common Mistake:**
Forgetting to reduce basis for charitable contributions because they're "below-the-line" itemized deductions.`,
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
      explanation: `**Answer:** $25,000 — Basis Decrease from Distributions

**IRC §733 — Effect of Distributions on Basis:**
Cash distributions reduce the partner's outside basis dollar-for-dollar.

**From Exhibit 1:**
Cash distribution to Kevin: **$25,000**

**Why Distributions Reduce Basis:**
When a partner receives cash from the partnership:
• The partnership's assets decrease
• Kevin's share of those assets decreases
• His basis must decrease to reflect this

**Tax Treatment of Cash Distributions (IRC §731):**
| Situation | Tax Result |
|-----------|------------|
| Distribution ≤ Basis | Tax-free (reduces basis) |
| Distribution > Basis | Gain recognized on excess |

**Our Situation:**
Kevin's basis before distribution is high enough ($75,000 + income items − deductions) to absorb the $25,000 distribution without recognizing gain.

**Ordering of Basis Adjustments (IRC §705):**
1. First: Increase for income items
2. Second: Decrease for loss/deduction items
3. Third: Decrease for distributions
4. Finally: Adjust for liability changes

This ordering ensures partners know if distributions create gain.

**Common Mistake:**
Taxing distributions — most partnership distributions are tax-free (just reduce basis).`,
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
      explanation: `**Answer:** $8,000 — Net Basis INCREASE from Liabilities

**IRC §752 — Treatment of Liabilities:**
Changes in a partner's share of partnership liabilities affect basis:
• INCREASE in share = treated as cash contribution = INCREASES basis
• DECREASE in share = treated as cash distribution = DECREASES basis

**From Exhibit 2 — Liability Changes:**

| Liability Type | Beginning | Ending | Change | Kevin's 40% |
|----------------|-----------|--------|--------|-------------|
| Recourse | $100,000 | $140,000 | +$40,000 | **+$16,000** |
| Nonrecourse | $50,000 | $30,000 | −$20,000 | **−$8,000** |
| **Net Change** | | | | **+$8,000** |

**Calculation:**
• Recourse increase: $40,000 × 40% = +$16,000 (basis increases)
• Nonrecourse decrease: $20,000 × 40% = −$8,000 (basis decreases)
• **Net effect: +$8,000**

**Why Liabilities Affect Basis:**
Partnership liabilities are shared by partners. When the partnership borrows:
• Partners are responsible for repayment (directly or through the partnership)
• This increases their "at risk" amount
• Allows larger loss deductions

**Recourse vs. Nonrecourse Allocation:**
| Type | Allocated Based On |
|------|---------------------|
| Recourse | Economic risk of loss (usually profit/loss ratio) |
| Nonrecourse | Profit-sharing ratio |

**Common Mistake:**
Treating liability increases as decreases (or vice versa). Remember: MORE debt = MORE basis.`,
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
      explanation: `**Answer:** $144,800 — Kevin's Ending Basis

**This is worth 2 points — the comprehensive calculation!**

**Partner Basis Formula (IRC §705):**

\`\`\`
Beginning Outside Basis
+ Income items (ordinary income, gains, tax-exempt)
- Deduction items (losses, charitable contributions)
- Distributions (cash and property)
+/- Liability changes (net effect)
= Ending Outside Basis
\`\`\`

**Complete Calculation:**

| Item | Amount | Reference |
|------|--------|-----------|
| Beginning basis | $75,000 | Given |
| + Ordinary income | $80,000 | 40% × $200,000 |
| + Tax-exempt interest | $4,000 | 40% × $10,000 |
| + Section 1231 gain | $6,000 | 40% × $15,000 |
| − Charitable contributions | $(3,200) | 40% × $8,000 |
| − Cash distribution | $(25,000) | Given |
| + Net liability increase | $8,000 | +$16,000 − $8,000 |
| **Ending basis** | **$144,800** | |

**Verification:**
$75,000 + $90,000 − $3,200 − $25,000 + $8,000 = **$144,800**

**Why Basis Matters:**
1. **Loss Limitations:** Can't deduct losses in excess of basis
2. **Distribution Gains:** Distributions exceeding basis are taxable
3. **Sale Gain/Loss:** Basis determines gain on sale of partnership interest

**Common Mistakes:**
• Forgetting tax-exempt income (increases basis even though not taxable)
• Double-counting guaranteed payments
• Getting liability direction wrong (increase = increase basis)

**Exam Tip:**
Build a basis schedule working through each component systematically.`,
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
      explanation: `**Correct Citation:** Circular 230 Section 10.34

**Alternative Acceptable Citations:**
• 10.34
• Circ. 230 §10.34
• 31 CFR 10.34

**What Section 10.34 Establishes:**

**Standard for Tax Return Positions:**

| Position Type | Minimum Standard |
|---------------|------------------|
| Undisclosed position | "Substantial authority" (approximately 40% confidence) |
| Disclosed position | "Reasonable basis" (approximately 20% confidence) |
| Listed transactions/tax shelters | "More likely than not" (>50% confidence) |

**Key Provisions of Section 10.34:**
1. Practitioner must not willfully, recklessly, or through gross incompetence sign a return with unreasonable positions
2. Practitioner must inform client of penalties for positions lacking substantial authority
3. Practitioner must advise client of disclosure opportunities

**How to Find This on the Exam:**
1. Navigate to IRS Circular 230 (Title 31, Part 10)
2. Look in Subpart B: Duties and Restrictions
3. Find Section 10.34: Standards with respect to tax returns and documents

**Why This Matters for the Scenario:**
The tax manager is asking about the minimum confidence level for signing a return. Section 10.34 answers this directly — practitioners need "reasonable belief" the position has a realistic possibility of being sustained.

**Common Mistakes:**
• Citing IRC sections (this is Treasury guidance, not IRC)
• Citing AICPA SSTS (these are professional, not regulatory standards)`,
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
      explanation: `**Correct Selection:** Yes - QBI deduction is limited or eliminated

**What is an SSTB? (IRC §199A(d)(2)):**
Specified Service Trades or Businesses include:
• Health (medical, dental, veterinary)
• Law
• Accounting
• Actuarial science
• Performing arts
• Consulting
• Athletics
• Financial services
• Brokerage services

**SSTB Income Thresholds (2024):**
| Filing Status | Phase-out Begins | Phase-out Complete |
|---------------|------------------|-------------------|
| Single | $191,950 | $241,950 |
| MFJ | $383,900 | $483,900 |

**Dr. Mitchell's Situation:**
• Income: $350,000
• Filing status: Likely single (one owner)
• Result: Well above phase-out threshold → **No QBI deduction**

**Why This Matters for Entity Selection:**
Since the QBI deduction is unavailable anyway, the 20% deduction shouldn't factor into the entity choice. This makes the S Corporation SE tax savings even MORE valuable.

**Why Other Options Are Wrong:**
• "Full 20% available": Only if income below $191,950 for SSTB
• "Partial at reduced rate": Only in phase-out range; $350K exceeds full phase-out`,
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
      explanation: `**Correct Selection:** S Corporation

**This is the KEY question — worth 2 points!**

**Why S Corp is Best for Dr. Mitchell:**

| Factor | S Corp Advantage |
|--------|------------------|
| Liability protection | ✓ Yes (corporate shield) |
| SE tax savings | ✓ Major benefit |
| Pass-through taxation | ✓ No double taxation |
| Retirement plans | ✓ Can establish 401(k), defined benefit |
| Single owner eligible | ✓ Yes |

**S Corp Tax Savings Calculation:**
• Total income: $350,000
• Reasonable salary: $200,000 → Subject to FICA (15.3% up to wage base, then 2.9% Medicare)
• Distribution: $150,000 → NO self-employment tax!
• SE tax saved: ~$22,950 (15.3% × $150,000)

**Why NOT Other Entities:**

**Sole Proprietorship:**
All $350,000 subject to SE tax. No liability protection. Poor choice for high-income professional.

**C Corporation:**
Double taxation problem:
• Corporate tax: $350,000 × 21% = $73,500
• After-tax earnings: $276,500
• If distributed as dividends: Additional 20% + 3.8% NIIT = ~$65,825 more tax
• Total effective rate could exceed 45%

**Single-Member LLC (Disregarded):**
Tax-wise, same as sole proprietorship. All income subject to SE tax. Provides liability protection but no tax advantage.

**Exam Tip:**
For high-income service professionals (doctors, lawyers, accountants), S Corps typically win because:
1. QBI deduction often unavailable (SSTB)
2. SE tax savings are substantial
3. Pass-through avoids double taxation`,
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
      explanation: `**Correct Selection:** Self-employment tax savings on distributions

**The S Corp SE Tax Strategy:**

**Sole Proprietorship:**
ALL net self-employment income is subject to SE tax:
• Social Security: 12.4% (up to wage base ~$168,600 in 2024)
• Medicare: 2.9% (no limit)
• Additional Medicare: 0.9% (over $200,000 single)

**S Corporation:**
ONLY reasonable salary is subject to employment taxes:
• Salary → Subject to FICA (employer + employee = 15.3%)
• Distributions → NOT subject to SE or FICA taxes

**Savings Illustration:**
| Item | Sole Prop | S Corp |
|------|-----------|--------|
| Income | $350,000 | $350,000 |
| Salary | N/A | $200,000 |
| Distribution | N/A | $150,000 |
| SE/FICA on salary | ~$26,775 | ~$26,775 |
| SE on distribution | ~$22,950 | $0 |
| **Total employment tax** | **~$49,725** | **~$26,775** |
| **Savings** | | **~$22,950** |

**IRS Scrutiny Warning:**
The salary must be "reasonable" for services performed. Unreasonably low salaries invite IRS challenge.

**Why Other Options Are Wrong:**
• "Lower marginal rate": Same individual rates apply to both
• "Higher QBI deduction": QBI rules apply equally (and phased out here anyway)
• "Income deferral": Both are pass-through; no significant deferral difference`,
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
      explanation: `**Correct Selection:** Double taxation on distributed profits

**The Double Taxation Problem:**

**Level 1 — Corporate Tax:**
Corporate income taxed at flat 21% rate
$350,000 × 21% = $73,500 corporate tax
After-tax: $276,500

**Level 2 — Dividend Tax (if distributed):**
Qualified dividends taxed at 0%/15%/20% + 3.8% NIIT
At Dr. Mitchell's income: 20% + 3.8% = 23.8%
$276,500 × 23.8% = $65,807 additional tax

**Combined Effective Rate:**
Total tax: $73,500 + $65,807 = $139,307
Effective rate: $139,307 ÷ $350,000 = **39.8%**

Compare to S Corp (37% marginal + SE on salary only): ~**32-35% effective**

**When C Corps CAN Make Sense:**
1. Reinvesting profits indefinitely (no distribution)
2. Planning to go public
3. Need multiple classes of stock
4. Foreign investors or entity shareholders

**Dr. Mitchell's Situation:**
Plans to extract income for living expenses and retirement → Double taxation is costly

**Why Other Options Are Wrong:**
• "No liability protection": C Corps DO provide liability protection
• "Administrative complexity only": Complexity exists but isn't the MAIN disadvantage
• "Cannot establish retirement plans": C Corps CAN have retirement plans (actually more generous limits)`,
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
      explanation: `**Answer:** $46,000 — Total Taxable Gift to Son

**IRC §2503 — Annual Exclusion & Gift Splitting:**

**Gift to Son:**
| Donor | Amount Given |
|-------|--------------|
| Robert | $40,000 |
| Susan | $40,000 |
| **Total** | **$80,000** |

**With Gift Splitting Elected (IRC §2513):**
Each spouse treated as making half of total:
• Robert: $40,000 (treated as $40,000 with splitting)
• Susan: $40,000 (treated as $40,000 with splitting)

**Annual Exclusion Application:**
| Spouse | Gift | Exclusion | Taxable |
|--------|------|-----------|---------|
| Robert | $40,000 | $(17,000) | $23,000 |
| Susan | $40,000 | $(17,000) | $23,000 |
| **Total Taxable** | | | **$46,000** |

**Calculation:**
$80,000 total − $34,000 (2 × $17,000 exclusions) = **$46,000**

**Why Gift Splitting Helps:**
Without splitting, only ONE $17,000 exclusion per spouse's own gifts. With splitting, BOTH spouses get exclusions for each donee.

**Common Mistake:**
Using only one $17,000 exclusion instead of two.`,
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
      explanation: `**Answer:** $16,000 — Total Taxable Gift to Daughter

**Gift to Daughter:**
| Donor | Amount Given |
|-------|--------------|
| Robert | $25,000 |
| Susan | $25,000 |
| **Total** | **$50,000** |

**With Gift Splitting:**
Each spouse already gave exactly half, so splitting doesn't change amounts.

**Annual Exclusion Application:**
| Spouse | Gift | Exclusion | Taxable |
|--------|------|-----------|---------|
| Robert | $25,000 | $(17,000) | $8,000 |
| Susan | $25,000 | $(17,000) | $8,000 |
| **Total Taxable** | | | **$16,000** |

**Calculation:**
$50,000 total − $34,000 exclusions = **$16,000**

**Compare to Son's Gift:**
• Son: $80,000 → $46,000 taxable
• Daughter: $50,000 → $16,000 taxable

The exclusions are the same ($34,000), but daughter received less.`,
    },
    {
      id: "req-grandson-utma",
      order: 3,
      type: "numeric",
      label: "Taxable gift to Grandson (UTMA)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: `**Answer:** $0 — Taxable Gift to Grandson (UTMA)

**Gift to Grandson:**
Susan only: $20,000 to UTMA account

**With Gift Splitting Elected:**
| Treated As | Amount |
|------------|--------|
| From Robert | $10,000 |
| From Susan | $10,000 |
| **Total** | $20,000 |

**Annual Exclusion Application:**
| Spouse | Gift | Exclusion | Taxable |
|--------|------|-----------|---------|
| Robert | $10,000 | $(17,000) | $0 |
| Susan | $10,000 | $(17,000) | $0 |
| **Total Taxable** | | | **$0** |

Since each spouse's treated gift ($10,000) is UNDER the exclusion ($17,000), no taxable gift results.

**Without Gift Splitting:**
Susan: $20,000 − $17,000 = $3,000 taxable

**Why Split Matters Here:**
Gift splitting converted ONE $20,000 gift into TWO $10,000 gifts, allowing both exclusions to apply.

**UTMA Note:**
UTMA (Uniform Transfers to Minors Act) accounts are completed gifts — the donor cannot take the money back. Gift tax rules apply normally.

**Common Mistake:**
Forgetting to apply gift splitting to this gift when it was elected for other gifts.`,
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
      explanation: `**Answer:** $0 — Direct Tuition Payment

**IRC §2503(e) — Unlimited Educational Exclusion:**

**Requirements for Exclusion:**
1. ✓ Payment made DIRECTLY to educational institution
2. ✓ Payment is for TUITION only
3. ✓ Amount unlimited

**Robert's Payment:**
$35,000 paid directly to grandson's college = **$0 taxable**

**Why Unlimited:**
The educational exclusion is UNLIMITED and does NOT count against:
• Annual exclusion ($17,000)
• Lifetime exemption
• The donor's taxable gifts

**What's NOT Covered:**
| Expense | Covered by §2503(e)? |
|---------|---------------------|
| Tuition | ✓ Yes |
| Room & Board | ✗ No |
| Books | ✗ No |
| Fees | ✗ No |

**Key Requirement — DIRECT Payment:**
Must pay school directly. If Robert gave $35,000 to grandson who then paid tuition, it would be a taxable gift (above $17,000 exclusion).

**Compare to Medical Exclusion:**
Similar unlimited exclusion for direct payments to medical providers for medical care.

**Exam Tip:**
"Direct to provider for specific purpose = unlimited exclusion"`,
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
      explanation: `**Correct Selection:** Yes - Form 709 required

**When Is Form 709 Required?**

**Always Required When:**
1. ✓ Gifts to any donee exceed annual exclusion ($17,000)
2. ✓ Gift splitting is elected
3. Gifts of future interests (even if < $17,000)
4. Charitable gifts requiring deduction allocation

**This Scenario:**
| Reason | Applies? |
|--------|----------|
| Gifts > $17,000 to son | ✓ Yes |
| Gifts > $17,000 to daughter | ✓ Yes |
| Gift splitting elected | ✓ Yes (both spouses must file) |

**Even Though:**
• No gift TAX is due (lifetime exemption applies)
• Some gifts were fully excluded

**Key Point — Gift Splitting:**
When gift splitting is elected, BOTH spouses must file Form 709, even if only one spouse made gifts.

**What Doesn't Require Filing:**
• Gifts ≤ $17,000 per donee (if no splitting needed)
• Unlimited exclusion gifts (tuition, medical)
• Charitable gifts (unlimited deduction, but may need to file for other gifts)
• Spouse gifts (unlimited marital deduction)
• Political contributions (not gifts for gift tax purposes)

**Exam Tip:**
Gift splitting ALWAYS requires Form 709, even if resulting taxable gifts are $0.`,
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
      explanation: `**Answer:** 2.25

**Formula:**
Current Ratio = Current Assets ÷ Current Liabilities

**Calculation:**
Current Ratio = $450,000 ÷ $200,000 = **2.25**

**Interpretation:**
• A current ratio of 2.25 means Horizon has $2.25 in current assets for every $1.00 of current liabilities
• Generally, a ratio above 1.0 indicates good short-term liquidity
• A ratio of 2.0+ is often considered strong

**Industry Context:**
"Good" ratios vary by industry:
• Retail: 1.5 - 2.0 (faster inventory turnover)
• Manufacturing: 1.5 - 3.0 (more inventory)
• Utilities: 1.0 - 1.5 (stable cash flows)

**Common Mistake:**
Using TOTAL assets instead of CURRENT assets. The current ratio specifically measures SHORT-TERM liquidity.`,
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
      explanation: `**Answer:** 1.50

**Formula:**
Quick Ratio = (Current Assets − Inventory) ÷ Current Liabilities

**Calculation:**
Quick Ratio = ($450,000 − $150,000) ÷ $200,000
Quick Ratio = $300,000 ÷ $200,000 = **1.50**

**Why Exclude Inventory?**
Inventory is the LEAST liquid current asset because:
1. Must be sold first (takes time)
2. May need to be discounted to sell quickly
3. May become obsolete

The quick ratio tests if the company can pay current liabilities WITHOUT selling inventory.

**Interpretation:**
• Quick ratio of 1.50 means $1.50 of liquid assets per $1.00 of current liabilities
• Generally, 1.0+ is considered adequate
• Horizon's quick ratio (1.50) is healthy

**Comparison to Current Ratio:**
| Ratio | Value | Difference |
|-------|-------|------------|
| Current | 2.25 | Includes inventory |
| Quick | 1.50 | Excludes inventory |
| Gap | 0.75 | Due to $150K inventory |

**Common Mistake:**
Only excluding inventory. In some versions, prepaid expenses are also excluded since they can't be converted to cash.`,
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
      explanation: `**Answer:** 0.67 (or 0.667)

**Formula:**
Debt-to-Equity = Total Liabilities ÷ Total Stockholders' Equity

**Calculation:**
D/E = $480,000 ÷ $720,000 = **0.667** (rounded to 0.67)

**Interpretation:**
• D/E of 0.67 means $0.67 of debt for every $1.00 of equity
• Lower ratios indicate less financial leverage (less risky)
• Horizon is primarily financed by equity (conservative structure)

**Balance Sheet Verification:**
Total Assets = Total Liabilities + Equity
$1,200,000 = $480,000 + $720,000 ✓

**Leverage Analysis:**
| Metric | Calculation | Result |
|--------|-------------|--------|
| Debt-to-Equity | $480K ÷ $720K | 0.67 |
| Debt-to-Assets | $480K ÷ $1.2M | 40% |
| Equity Ratio | $720K ÷ $1.2M | 60% |

**Industry Benchmarks:**
• <1.0: Conservative leverage
• 1.0 - 2.0: Moderate leverage
• >2.0: Aggressive leverage (higher risk)

**Common Mistake:**
Using only long-term debt instead of TOTAL liabilities. The standard D/E ratio uses all liabilities.`,
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
      explanation: `**Answer:** 12.0 times

**Formula:**
Inventory Turnover = Cost of Goods Sold ÷ Average Inventory

**Calculation:**
Turnover = $1,680,000 ÷ $140,000 = **12.0 times**

**Interpretation:**
• Horizon sells and replaces its inventory 12 times per year
• Days in inventory = 365 ÷ 12 = ~30 days
• This is a GOOD turnover rate for most industries

**Why Use COGS (not Sales)?**
Inventory is recorded at COST, not selling price. Using sales would inflate the ratio due to markup.

**Why Use AVERAGE Inventory?**
Average smooths out seasonal fluctuations:
Average = (Beginning Inventory + Ending Inventory) ÷ 2

Note: The problem provides average inventory ($140,000), not the ending balance.

**Common Mistakes:**
1. Using Net Sales instead of COGS — overstates turnover
2. Using ending inventory instead of average — may distort results
3. Confusing turnover (times) with days (365 ÷ turnover)

**Industry Comparison:**
• Grocery: 15-20 times (perishable goods)
• Manufacturing: 6-12 times
• Jewelry: 1-2 times (slow-moving luxury goods)`,
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
      explanation: `**Answer:** 26.67%

**Formula:**
ROE = Net Income ÷ Total Stockholders' Equity

**Calculation:**
ROE = $192,000 ÷ $720,000 = 0.2667 = **26.67%**

**Interpretation:**
• For every $1.00 of equity invested, Horizon generates $0.27 in profit
• 26.67% ROE is EXCELLENT (above most benchmarks)
• Indicates strong profitability relative to shareholder investment

**ROE Benchmarks:**
• <10%: Below average
• 10-15%: Average
• 15-20%: Good
• >20%: Excellent

**DuPont Analysis (ROE Decomposition):**
ROE = Net Profit Margin × Asset Turnover × Equity Multiplier

For Horizon:
• Net Profit Margin = $192K ÷ $2.4M = 8%
• Asset Turnover = $2.4M ÷ $1.2M = 2.0
• Equity Multiplier = $1.2M ÷ $720K = 1.67
• ROE = 8% × 2.0 × 1.67 = **26.7%** ✓

**DuPont Insight:**
Horizon's strong ROE comes from:
1. Decent profit margin (8%)
2. High asset efficiency (2.0 turnover)
3. Moderate leverage (1.67 multiplier)

**Common Mistakes:**
• Using average equity instead of ending (both acceptable, but be consistent)
• Confusing ROE with ROA (Return on ASSETS)
• Expressing as decimal instead of percentage`,
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

// ============================================
// NEW TBS BATCH 2 - Additional Questions
// ============================================

// ============================================
// FAR SECTION - NEW TBS
// ============================================

// FAR TBS 8: Bond Amortization (Medium - Numeric Entry)
export const farBondAmortizationTBS: TBSQuestion = {
  id: "tbs-far-008",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Long-Term Liabilities",
  subtopic: "Bonds Payable",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Bond Discount Amortization",
  scenarioText: `On January 1, Year 1, Sterling Corporation issued $1,000,000 face value bonds with a stated rate of 6% and a 5-year term. Interest is payable semiannually on June 30 and December 31. The bonds were issued at a price to yield 8%.

Calculate the issue price and prepare the amortization for the first year using the effective interest method.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pv-factors",
      order: 1,
      title: "Present Value Factors",
      type: "table",
      content: {
        type: "table",
        title: "Present Value Tables",
        headers: ["Factor Type", "3% (10 periods)", "4% (10 periods)"],
        rows: [
          { cells: ["PV of $1", "0.7441", "0.6756"] },
          { cells: ["PV of Ordinary Annuity", "8.5302", "8.1109"] },
        ],
        footnotes: [
          "Use semiannual periods for calculations",
          "Market rate per period = Annual rate / 2",
        ],
      },
    },
    {
      id: "exhibit-bond-terms",
      order: 2,
      title: "Bond Terms",
      type: "table",
      content: {
        type: "table",
        title: "Sterling Corporation Bond Details",
        headers: ["Term", "Value"],
        rows: [
          { cells: ["Face Value", "$1,000,000"] },
          { cells: ["Stated Rate (Annual)", "6%"] },
          { cells: ["Market Rate (Annual)", "8%"] },
          { cells: ["Term", "5 years"] },
          { cells: ["Interest Payments", "Semiannual"] },
          { cells: ["Cash Interest per Period", "$30,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-issue-price",
      order: 1,
      type: "numeric",
      label: "Bond Issue Price",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 918891,
        tolerance: 50,
      },
      explanation: "Issue Price = PV of Face Value + PV of Interest Payments = ($1,000,000 × 0.6756) + ($30,000 × 8.1109) = $675,600 + $243,327 = $918,927 (accept $918,891 using more precise factors)",
    },
    {
      id: "req-discount",
      order: 2,
      type: "numeric",
      label: "Bond Discount at Issuance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 81109,
        tolerance: 50,
      },
      explanation: "Discount = Face Value - Issue Price = $1,000,000 - $918,891 = $81,109",
    },
    {
      id: "req-interest-exp-1",
      order: 3,
      type: "numeric",
      label: "Interest Expense - June 30, Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 36756,
        tolerance: 10,
      },
      explanation: "Interest Expense = Carrying Value × Market Rate per Period = $918,891 × 4% = $36,756",
    },
    {
      id: "req-amort-1",
      order: 4,
      type: "numeric",
      label: "Discount Amortization - June 30, Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6756,
        tolerance: 10,
      },
      explanation: "Amortization = Interest Expense - Cash Interest = $36,756 - $30,000 = $6,756",
    },
    {
      id: "req-carrying-value",
      order: 5,
      type: "numeric",
      label: "Carrying Value - December 31, Year 1",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 932673,
        tolerance: 50,
      },
      explanation: "After 6/30: $918,891 + $6,756 = $925,647. Interest Exp 12/31: $925,647 × 4% = $37,026. Amort: $37,026 - $30,000 = $7,026. Carrying Value: $925,647 + $7,026 = $932,673",
    },
  ],
};

// FAR TBS 9: Stock Compensation (Medium - Journal Entry)
export const farStockCompensationTBS: TBSQuestion = {
  id: "tbs-far-009",
  section: "FAR",
  tbsType: "journal_entry",
  topic: "Stockholders' Equity",
  subtopic: "Stock-Based Compensation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "FAR-II",
  title: "Stock Option Compensation",
  scenarioText: `On January 1, Year 1, Meridian Corp granted stock options to key employees. Review the grant details and prepare the journal entries for Year 1 and Year 2.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-grant-details",
      order: 1,
      title: "Stock Option Grant Details",
      type: "table",
      content: {
        type: "table",
        title: "Meridian Corp - Employee Stock Option Grant",
        headers: ["Detail", "Information"],
        rows: [
          { cells: ["Grant Date", "January 1, Year 1"] },
          { cells: ["Number of Options", "10,000"] },
          { cells: ["Exercise Price", "$25 per share"] },
          { cells: ["Stock Price at Grant Date", "$25 per share"] },
          { cells: ["Fair Value per Option (Black-Scholes)", "$8"] },
          { cells: ["Vesting Period", "4 years (cliff vesting)"] },
          { cells: ["Exercise Period", "10 years from grant date"] },
          { cells: ["Expected Forfeitures", "None expected"] },
        ],
      },
    },
    {
      id: "exhibit-guidance",
      order: 2,
      title: "ASC 718 Guidance",
      type: "text",
      content: {
        type: "text",
        title: "Stock-Based Compensation Recognition",
        paragraphs: [
          "Under ASC 718, compensation cost is measured at the fair value of the award at grant date.",
          "",
          "Total Compensation Cost = Number of Options × Fair Value per Option",
          "",
          "Compensation is recognized ratably over the requisite service period (vesting period).",
          "",
          "Journal Entry: Debit Compensation Expense, Credit Additional Paid-in Capital - Stock Options",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-year1-debit",
      order: 1,
      type: "journal_debit",
      label: "Year 1 Compensation Expense",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-comp-expense",
        accountName: "Compensation Expense",
        amount: 20000,
        tolerance: 0,
      },
      explanation: "Total compensation = 10,000 options × $8 = $80,000. Year 1 expense = $80,000 ÷ 4 years = $20,000",
    },
    {
      id: "req-year1-credit",
      order: 2,
      type: "journal_credit",
      label: "Year 1 Credit to Equity",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-apic-options",
        accountName: "APIC - Stock Options",
        amount: 20000,
        tolerance: 0,
      },
      explanation: "Credit to Additional Paid-in Capital - Stock Options for $20,000",
    },
  ],
  journalAccounts: [
    { id: "acc-comp-expense", name: "Compensation Expense", type: "expense", normalBalance: "debit", isDistractor: false },
    { id: "acc-apic-options", name: "APIC - Stock Options", type: "equity", normalBalance: "credit", isDistractor: false },
    { id: "acc-common-stock", name: "Common Stock", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "acc-apic-cs", name: "APIC - Common Stock", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "acc-retained-earnings", name: "Retained Earnings", type: "equity", normalBalance: "credit", isDistractor: true },
    { id: "acc-cash", name: "Cash", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-stock-options-payable", name: "Stock Options Payable", type: "liability", normalBalance: "credit", isDistractor: true },
  ],
};

// FAR TBS 10: Pension Accounting (Hard - Numeric Entry)
export const farPensionTBS: TBSQuestion = {
  id: "tbs-far-010",
  section: "FAR",
  tbsType: "numeric_entry",
  topic: "Employee Benefits",
  subtopic: "Defined Benefit Pensions",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "FAR-II",
  title: "Defined Benefit Pension Calculations",
  scenarioText: `Atlas Industries sponsors a defined benefit pension plan. Using the information provided, calculate the pension liability and expense components for Year 1.`,
  timeEstimateMinutes: 18,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-pension-data",
      order: 1,
      title: "Pension Plan Data",
      type: "table",
      content: {
        type: "table",
        title: "Atlas Industries Pension Plan - Year 1",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Projected Benefit Obligation (PBO) - Beginning", "$2,400,000"] },
          { cells: ["Fair Value of Plan Assets - Beginning", "$2,100,000"] },
          { cells: ["Service Cost", "$180,000"] },
          { cells: ["Discount Rate (for interest)", "6%"] },
          { cells: ["Expected Return on Plan Assets", "7%"] },
          { cells: ["Actual Return on Plan Assets", "$168,000"] },
          { cells: ["Employer Contributions", "$200,000"] },
          { cells: ["Benefits Paid to Retirees", "$150,000"] },
          { cells: ["Actuarial Loss on PBO", "$45,000"] },
        ],
      },
    },
    {
      id: "exhibit-formula",
      order: 2,
      title: "Pension Formulas",
      type: "text",
      content: {
        type: "text",
        title: "Key Pension Calculations",
        paragraphs: [
          "Interest Cost = Beginning PBO × Discount Rate",
          "",
          "Expected Return = Beginning Plan Assets × Expected Return Rate",
          "",
          "Pension Expense = Service Cost + Interest Cost - Expected Return on Assets +/- Amortizations",
          "",
          "Net Pension Liability = PBO - Fair Value of Plan Assets",
          "",
          "Asset Gain/Loss = Actual Return - Expected Return (goes to OCI)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-interest-cost",
      order: 1,
      type: "numeric",
      label: "Interest Cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 144000,
        tolerance: 0,
      },
      explanation: "Interest Cost = $2,400,000 × 6% = $144,000",
    },
    {
      id: "req-expected-return",
      order: 2,
      type: "numeric",
      label: "Expected Return on Plan Assets",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 147000,
        tolerance: 0,
      },
      explanation: "Expected Return = $2,100,000 × 7% = $147,000",
    },
    {
      id: "req-pension-expense",
      order: 3,
      type: "numeric",
      label: "Net Periodic Pension Cost (Expense)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 177000,
        tolerance: 0,
      },
      explanation: "Pension Expense = Service Cost ($180,000) + Interest Cost ($144,000) - Expected Return ($147,000) = $177,000. Note: Actuarial loss goes to OCI, not expense.",
    },
    {
      id: "req-ending-pbo",
      order: 4,
      type: "numeric",
      label: "Ending PBO",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2619000,
        tolerance: 0,
      },
      explanation: "Ending PBO = Beginning ($2,400,000) + Service Cost ($180,000) + Interest ($144,000) - Benefits Paid ($150,000) + Actuarial Loss ($45,000) = $2,619,000",
    },
    {
      id: "req-ending-assets",
      order: 5,
      type: "numeric",
      label: "Ending Fair Value of Plan Assets",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2318000,
        tolerance: 0,
      },
      explanation: "Ending Assets = Beginning ($2,100,000) + Actual Return ($168,000) + Contributions ($200,000) - Benefits Paid ($150,000) = $2,318,000",
    },
    {
      id: "req-net-liability",
      order: 6,
      type: "numeric",
      label: "Net Pension Liability (Ending)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 301000,
        tolerance: 0,
      },
      explanation: "Net Liability = Ending PBO ($2,619,000) - Ending Plan Assets ($2,318,000) = $301,000",
    },
  ],
};

// FAR TBS 11: Cash Flow Statement (Medium - Document Review)
export const farCashFlowTBS: TBSQuestion = {
  id: "tbs-far-011",
  section: "FAR",
  tbsType: "document_review",
  topic: "Statement of Cash Flows",
  subtopic: "Classification of Cash Flows",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "FAR-I",
  title: "Cash Flow Classifications",
  scenarioText: `Review the following transactions and classify each into the appropriate section of the statement of cash flows: Operating, Investing, or Financing.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-transactions",
      order: 1,
      title: "Transaction List",
      type: "text",
      content: {
        type: "text",
        title: "Year 1 Cash Transactions",
        paragraphs: [
          "Transaction 1: Received $50,000 cash from customers for services rendered.",
          "",
          "Transaction 2: Purchased equipment for $120,000 cash.",
          "",
          "Transaction 3: Paid $15,000 cash dividends to stockholders.",
          "",
          "Transaction 4: Received $8,000 in interest on investments held.",
          "",
          "Transaction 5: Issued common stock for $200,000 cash.",
          "",
          "Transaction 6: Paid $45,000 to suppliers for inventory purchased.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-trans1",
      order: 1,
      type: "dropdown",
      label: "Transaction 1 - Customer Collections",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t1-operating",
      },
      explanation: "Cash received from customers is an operating activity - it relates to the company's primary revenue-generating activities.",
      dropdownOptions: [
        { id: "opt-t1-operating", order: 1, text: "Operating", isCorrect: true },
        { id: "opt-t1-investing", order: 2, text: "Investing", isCorrect: false },
        { id: "opt-t1-financing", order: 3, text: "Financing", isCorrect: false },
      ],
    },
    {
      id: "req-trans2",
      order: 2,
      type: "dropdown",
      label: "Transaction 2 - Equipment Purchase",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t2-investing",
      },
      explanation: "Purchase of equipment is an investing activity - it involves acquiring long-term productive assets.",
      dropdownOptions: [
        { id: "opt-t2-operating", order: 1, text: "Operating", isCorrect: false },
        { id: "opt-t2-investing", order: 2, text: "Investing", isCorrect: true },
        { id: "opt-t2-financing", order: 3, text: "Financing", isCorrect: false },
      ],
    },
    {
      id: "req-trans3",
      order: 3,
      type: "dropdown",
      label: "Transaction 3 - Dividend Payment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t3-financing",
      },
      explanation: "Dividend payments are financing activities - they represent distributions to owners/stockholders.",
      dropdownOptions: [
        { id: "opt-t3-operating", order: 1, text: "Operating", isCorrect: false },
        { id: "opt-t3-investing", order: 2, text: "Investing", isCorrect: false },
        { id: "opt-t3-financing", order: 3, text: "Financing", isCorrect: true },
      ],
    },
    {
      id: "req-trans4",
      order: 4,
      type: "dropdown",
      label: "Transaction 4 - Interest Received",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t4-operating",
      },
      explanation: "Under U.S. GAAP, interest received is classified as operating activity (unlike IFRS which allows investing classification).",
      dropdownOptions: [
        { id: "opt-t4-operating", order: 1, text: "Operating", isCorrect: true },
        { id: "opt-t4-investing", order: 2, text: "Investing", isCorrect: false },
        { id: "opt-t4-financing", order: 3, text: "Financing", isCorrect: false },
      ],
    },
    {
      id: "req-trans5",
      order: 5,
      type: "dropdown",
      label: "Transaction 5 - Stock Issuance",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t5-financing",
      },
      explanation: "Issuing stock is a financing activity - it involves obtaining resources from owners.",
      dropdownOptions: [
        { id: "opt-t5-operating", order: 1, text: "Operating", isCorrect: false },
        { id: "opt-t5-investing", order: 2, text: "Investing", isCorrect: false },
        { id: "opt-t5-financing", order: 3, text: "Financing", isCorrect: true },
      ],
    },
    {
      id: "req-trans6",
      order: 6,
      type: "dropdown",
      label: "Transaction 6 - Supplier Payments",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-t6-operating",
      },
      explanation: "Payments to suppliers for inventory are operating activities - they relate to the company's primary business operations.",
      dropdownOptions: [
        { id: "opt-t6-operating", order: 1, text: "Operating", isCorrect: true },
        { id: "opt-t6-investing", order: 2, text: "Investing", isCorrect: false },
        { id: "opt-t6-financing", order: 3, text: "Financing", isCorrect: false },
      ],
    },
  ],
};

// ============================================
// AUD SECTION - NEW TBS
// ============================================

// AUD TBS 7: Internal Control Deficiencies (Medium - Document Review)
export const audInternalControlTBS: TBSQuestion = {
  id: "tbs-aud-007",
  section: "AUD",
  tbsType: "document_review",
  topic: "Internal Control",
  subtopic: "Deficiency Evaluation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-II",
  title: "Internal Control Deficiency Classification",
  scenarioText: `You are evaluating internal control deficiencies identified during the audit of Maxwell Manufacturing, a public company. Classify each deficiency as a control deficiency, significant deficiency, or material weakness.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-deficiencies",
      order: 1,
      title: "Identified Control Deficiencies",
      type: "text",
      content: {
        type: "text",
        title: "Maxwell Manufacturing - Control Deficiencies",
        paragraphs: [
          "Deficiency A: The accounts payable clerk occasionally processes invoices without matching to purchase orders for amounts under $500. Annual unmatched invoices total approximately $15,000.",
          "",
          "Deficiency B: The CFO has sole authority to initiate, approve, and record wire transfers without secondary approval. During the year, wire transfers totaled $12 million.",
          "",
          "Deficiency C: The company lacks a formal fraud risk assessment process. Management has not documented how they assess and respond to fraud risks.",
          "",
          "Deficiency D: Monthly bank reconciliations are prepared by the accounting manager but not reviewed by an independent party. No errors were noted in the current year.",
          "",
          "Deficiency E: Revenue recognition policies were changed mid-year without proper documentation or disclosure review.",
        ],
      },
    },
    {
      id: "exhibit-definitions",
      order: 2,
      title: "Deficiency Definitions",
      type: "text",
      content: {
        type: "text",
        title: "AS 2201 Definitions",
        paragraphs: [
          "MATERIAL WEAKNESS: A deficiency, or combination of deficiencies, in ICFR such that there is a reasonable possibility that a material misstatement will not be prevented or detected on a timely basis.",
          "",
          "SIGNIFICANT DEFICIENCY: A deficiency, or combination of deficiencies, that is less severe than a material weakness yet important enough to merit attention by those responsible for oversight.",
          "",
          "CONTROL DEFICIENCY: Exists when the design or operation of a control does not allow management or employees to prevent or detect misstatements on a timely basis. Less severe than significant deficiency.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-def-a",
      order: 1,
      type: "dropdown",
      label: "Deficiency A - AP Matching",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-cd",
      },
      explanation: "This is a control deficiency. While the control is not operating as designed, the low dollar amount ($15,000 annually) and the fact it only affects small invoices makes it unlikely to result in material misstatement.",
      dropdownOptions: [
        { id: "opt-a-cd", order: 1, text: "Control Deficiency", isCorrect: true },
        { id: "opt-a-sd", order: 2, text: "Significant Deficiency", isCorrect: false },
        { id: "opt-a-mw", order: 3, text: "Material Weakness", isCorrect: false },
      ],
    },
    {
      id: "req-def-b",
      order: 2,
      type: "dropdown",
      label: "Deficiency B - Wire Transfer Authority",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-mw",
      },
      explanation: "This is a material weakness. Lack of segregation of duties over significant cash disbursements ($12 million) creates a reasonable possibility that a material misstatement could occur and not be detected.",
      dropdownOptions: [
        { id: "opt-b-cd", order: 1, text: "Control Deficiency", isCorrect: false },
        { id: "opt-b-sd", order: 2, text: "Significant Deficiency", isCorrect: false },
        { id: "opt-b-mw", order: 3, text: "Material Weakness", isCorrect: true },
      ],
    },
    {
      id: "req-def-c",
      order: 3,
      type: "dropdown",
      label: "Deficiency C - Fraud Risk Assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-mw",
      },
      explanation: "This is a material weakness. The lack of a formal fraud risk assessment process is an indicator of material weakness per AS 2201, as it represents a deficiency in the control environment component of ICFR.",
      dropdownOptions: [
        { id: "opt-c-cd", order: 1, text: "Control Deficiency", isCorrect: false },
        { id: "opt-c-sd", order: 2, text: "Significant Deficiency", isCorrect: false },
        { id: "opt-c-mw", order: 3, text: "Material Weakness", isCorrect: true },
      ],
    },
    {
      id: "req-def-d",
      order: 4,
      type: "dropdown",
      label: "Deficiency D - Bank Reconciliation Review",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-sd",
      },
      explanation: "This is a significant deficiency. While the reconciliations are being performed, the lack of independent review is important enough to merit attention but given no errors were noted, it may not rise to material weakness.",
      dropdownOptions: [
        { id: "opt-d-cd", order: 1, text: "Control Deficiency", isCorrect: false },
        { id: "opt-d-sd", order: 2, text: "Significant Deficiency", isCorrect: true },
        { id: "opt-d-mw", order: 3, text: "Material Weakness", isCorrect: false },
      ],
    },
    {
      id: "req-def-e",
      order: 5,
      type: "dropdown",
      label: "Deficiency E - Revenue Recognition Change",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-sd",
      },
      explanation: "This is a significant deficiency. Changes to accounting policies without proper documentation affects the reliability of financial reporting and warrants management attention, though without knowing the magnitude of impact, it may not be a material weakness.",
      dropdownOptions: [
        { id: "opt-e-cd", order: 1, text: "Control Deficiency", isCorrect: false },
        { id: "opt-e-sd", order: 2, text: "Significant Deficiency", isCorrect: true },
        { id: "opt-e-mw", order: 3, text: "Material Weakness", isCorrect: false },
      ],
    },
  ],
};

// AUD TBS 8: Subsequent Events (Medium - Document Review)
export const audSubsequentEventsTBS: TBSQuestion = {
  id: "tbs-aud-008",
  section: "AUD",
  tbsType: "document_review",
  topic: "Completing the Audit",
  subtopic: "Subsequent Events",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "AUD-IV",
  title: "Subsequent Events Analysis",
  scenarioText: `The year-end for your audit client, Zenith Corporation, is December 31, Year 1. The audit report date is February 28, Year 2. Review each event and determine the appropriate accounting and/or disclosure treatment.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-events",
      order: 1,
      title: "Events After Year-End",
      type: "text",
      content: {
        type: "text",
        title: "Subsequent Events Identified",
        paragraphs: [
          "Event 1 (January 15, Year 2): Zenith settled a lawsuit for $500,000. The lawsuit was filed in October Year 1 and was originally estimated at $200,000 at year-end.",
          "",
          "Event 2 (February 10, Year 2): A fire destroyed a warehouse containing $1.2 million of inventory. The loss was only partially covered by insurance.",
          "",
          "Event 3 (February 20, Year 2): The Board of Directors declared a cash dividend of $2 per share on the 100,000 outstanding shares.",
          "",
          "Event 4 (January 8, Year 2): A major customer representing 15% of receivables filed for bankruptcy. The receivable balance at year-end was $300,000.",
          "",
          "Event 5 (February 25, Year 2): Zenith acquired 100% of a competitor for $5 million cash.",
        ],
      },
    },
    {
      id: "exhibit-guidance",
      order: 2,
      title: "Subsequent Events Types",
      type: "text",
      content: {
        type: "text",
        title: "ASC 855 - Subsequent Events",
        paragraphs: [
          "TYPE 1 (Recognized): Events that provide additional evidence about conditions that existed at the balance sheet date. Adjust the financial statements.",
          "",
          "TYPE 2 (Non-Recognized): Events that provide evidence about conditions that arose after the balance sheet date. Disclose but do not adjust.",
          "",
          "Subsequent events period runs from balance sheet date through the date the financial statements are issued (or available to be issued).",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-event1",
      order: 1,
      type: "dropdown",
      label: "Event 1 - Lawsuit Settlement",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e1-type1",
      },
      explanation: "Type 1 (Recognized) - The lawsuit existed at year-end. The settlement provides evidence of the actual liability amount, requiring adjustment from $200,000 to $500,000.",
      dropdownOptions: [
        { id: "opt-e1-type1", order: 1, text: "Type 1 - Adjust financial statements", isCorrect: true },
        { id: "opt-e1-type2", order: 2, text: "Type 2 - Disclose only", isCorrect: false },
        { id: "opt-e1-none", order: 3, text: "No adjustment or disclosure needed", isCorrect: false },
      ],
    },
    {
      id: "req-event2",
      order: 2,
      type: "dropdown",
      label: "Event 2 - Warehouse Fire",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e2-type2",
      },
      explanation: "Type 2 (Non-Recognized) - The fire occurred after year-end. The condition (fire damage) did not exist at December 31. Requires disclosure due to significance.",
      dropdownOptions: [
        { id: "opt-e2-type1", order: 1, text: "Type 1 - Adjust financial statements", isCorrect: false },
        { id: "opt-e2-type2", order: 2, text: "Type 2 - Disclose only", isCorrect: true },
        { id: "opt-e2-none", order: 3, text: "No adjustment or disclosure needed", isCorrect: false },
      ],
    },
    {
      id: "req-event3",
      order: 3,
      type: "dropdown",
      label: "Event 3 - Dividend Declaration",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e3-type2",
      },
      explanation: "Type 2 (Non-Recognized) - The dividend was declared after year-end. No liability existed at December 31. Disclosure is recommended per ASC 855.",
      dropdownOptions: [
        { id: "opt-e3-type1", order: 1, text: "Type 1 - Adjust financial statements", isCorrect: false },
        { id: "opt-e3-type2", order: 2, text: "Type 2 - Disclose only", isCorrect: true },
        { id: "opt-e3-none", order: 3, text: "No adjustment or disclosure needed", isCorrect: false },
      ],
    },
    {
      id: "req-event4",
      order: 4,
      type: "dropdown",
      label: "Event 4 - Customer Bankruptcy",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e4-type1",
      },
      explanation: "Type 1 (Recognized) - The receivable existed at year-end. The bankruptcy provides evidence that the receivable was likely uncollectible at December 31, requiring adjustment to the allowance.",
      dropdownOptions: [
        { id: "opt-e4-type1", order: 1, text: "Type 1 - Adjust financial statements", isCorrect: true },
        { id: "opt-e4-type2", order: 2, text: "Type 2 - Disclose only", isCorrect: false },
        { id: "opt-e4-none", order: 3, text: "No adjustment or disclosure needed", isCorrect: false },
      ],
    },
    {
      id: "req-event5",
      order: 5,
      type: "dropdown",
      label: "Event 5 - Business Acquisition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e5-type2",
      },
      explanation: "Type 2 (Non-Recognized) - The acquisition occurred after year-end. This is a new condition that did not exist at December 31. Requires disclosure due to significance.",
      dropdownOptions: [
        { id: "opt-e5-type1", order: 1, text: "Type 1 - Adjust financial statements", isCorrect: false },
        { id: "opt-e5-type2", order: 2, text: "Type 2 - Disclose only", isCorrect: true },
        { id: "opt-e5-none", order: 3, text: "No adjustment or disclosure needed", isCorrect: false },
      ],
    },
  ],
};

// AUD TBS 9: Audit Risk Model (Medium - Numeric Entry)
export const audAuditRiskTBS: TBSQuestion = {
  id: "tbs-aud-009",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Risk Assessment",
  subtopic: "Audit Risk Model",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Audit Risk Model Calculations",
  scenarioText: `You are planning the audit of Phoenix Corp and need to determine the appropriate detection risk levels for various assertions. Use the audit risk model to calculate the required values.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-risk-model",
      order: 1,
      title: "Audit Risk Model",
      type: "text",
      content: {
        type: "text",
        title: "Audit Risk Model Formula",
        paragraphs: [
          "AR = IR × CR × DR",
          "",
          "Where:",
          "AR = Audit Risk (acceptable level, typically 5%)",
          "IR = Inherent Risk",
          "CR = Control Risk",
          "DR = Detection Risk",
          "",
          "Rearranged: DR = AR ÷ (IR × CR)",
          "",
          "The auditor can control DR through the nature, timing, and extent of substantive procedures.",
        ],
      },
    },
    {
      id: "exhibit-assessments",
      order: 2,
      title: "Risk Assessments by Assertion",
      type: "table",
      content: {
        type: "table",
        title: "Phoenix Corp - Risk Assessments",
        headers: ["Assertion", "Inherent Risk", "Control Risk", "Acceptable AR"],
        rows: [
          { cells: ["Existence of Inventory", "80%", "60%", "5%"] },
          { cells: ["Valuation of A/R", "50%", "40%", "5%"] },
          { cells: ["Completeness of A/P", "70%", "80%", "5%"] },
          { cells: ["Rights to PPE", "30%", "50%", "5%"] },
          { cells: ["Accuracy of Revenue", "90%", "70%", "5%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dr-inventory",
      order: 1,
      type: "numeric",
      label: "Detection Risk - Inventory Existence (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10.42,
        tolerance: 0.5,
      },
      explanation: "DR = 5% ÷ (80% × 60%) = 5% ÷ 48% = 10.42%. More substantive testing needed due to high IR and CR.",
    },
    {
      id: "req-dr-ar",
      order: 2,
      type: "numeric",
      label: "Detection Risk - A/R Valuation (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25,
        tolerance: 0.5,
      },
      explanation: "DR = 5% ÷ (50% × 40%) = 5% ÷ 20% = 25%. Moderate risk allows higher detection risk.",
    },
    {
      id: "req-dr-ap",
      order: 3,
      type: "numeric",
      label: "Detection Risk - A/P Completeness (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8.93,
        tolerance: 0.5,
      },
      explanation: "DR = 5% ÷ (70% × 80%) = 5% ÷ 56% = 8.93%. Low DR requires extensive substantive testing.",
    },
    {
      id: "req-dr-ppe",
      order: 4,
      type: "numeric",
      label: "Detection Risk - PPE Rights (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 33.33,
        tolerance: 0.5,
      },
      explanation: "DR = 5% ÷ (30% × 50%) = 5% ÷ 15% = 33.33%. Low IR allows highest detection risk.",
    },
    {
      id: "req-lowest-dr",
      order: 5,
      type: "dropdown",
      label: "Which assertion requires the MOST substantive testing?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-revenue",
      },
      explanation: "Revenue Accuracy has DR = 5% ÷ (90% × 70%) = 7.94%, the lowest detection risk, requiring the most extensive substantive testing.",
      dropdownOptions: [
        { id: "opt-inventory", order: 1, text: "Existence of Inventory", isCorrect: false },
        { id: "opt-ar", order: 2, text: "Valuation of A/R", isCorrect: false },
        { id: "opt-ap", order: 3, text: "Completeness of A/P", isCorrect: false },
        { id: "opt-revenue", order: 4, text: "Accuracy of Revenue", isCorrect: true },
      ],
    },
  ],
};

// ============================================
// REG SECTION - NEW TBS
// ============================================

// REG TBS 7: Estate Tax (Hard - Numeric Entry)
export const regEstateTaxTBS: TBSQuestion = {
  id: "tbs-reg-007",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Federal Taxation of Property",
  subtopic: "Estate & Gift Taxation",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "REG-III",
  title: "Estate Tax Calculation",
  scenarioText: `Martha Wilson passed away on October 15, Year 1. Calculate the federal estate tax liability using the information provided about her estate.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-estate-assets",
      order: 1,
      title: "Estate Assets",
      type: "table",
      content: {
        type: "table",
        title: "Martha Wilson Estate - Gross Estate",
        headers: ["Asset", "Fair Market Value"],
        rows: [
          { cells: ["Primary Residence", "$850,000"] },
          { cells: ["Investment Portfolio", "$3,200,000"] },
          { cells: ["Retirement Accounts (IRA)", "$1,500,000"] },
          { cells: ["Life Insurance (payable to estate)", "$500,000"] },
          { cells: ["Personal Property & Vehicles", "$150,000"] },
          { cells: ["Bank Accounts", "$400,000"] },
        ],
      },
    },
    {
      id: "exhibit-deductions",
      order: 2,
      title: "Estate Deductions",
      type: "table",
      content: {
        type: "table",
        title: "Allowable Deductions",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Mortgage on Residence", "$200,000"] },
          { cells: ["Credit Card Debt", "$15,000"] },
          { cells: ["Funeral Expenses", "$25,000"] },
          { cells: ["Estate Administration Expenses", "$60,000"] },
          { cells: ["Charitable Bequest to Red Cross", "$100,000"] },
          { cells: ["Marital Deduction (Bequest to Spouse)", "$1,000,000"] },
        ],
      },
    },
    {
      id: "exhibit-tax-info",
      order: 3,
      title: "Estate Tax Information",
      type: "text",
      content: {
        type: "text",
        title: "Year 1 Estate Tax Rates",
        paragraphs: [
          "Applicable Exclusion Amount (Unified Credit): $12,920,000",
          "",
          "Estate Tax Rate (for amounts over exclusion): 40%",
          "",
          "Taxable Estate = Gross Estate - Deductions",
          "",
          "Estate Tax = (Taxable Estate - Applicable Exclusion) × 40%",
          "",
          "Note: If taxable estate is below exclusion amount, no estate tax is due.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-estate",
      order: 1,
      type: "numeric",
      label: "Gross Estate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6600000,
        tolerance: 0,
      },
      explanation: "Gross Estate = $850,000 + $3,200,000 + $1,500,000 + $500,000 + $150,000 + $400,000 = $6,600,000",
    },
    {
      id: "req-total-deductions",
      order: 2,
      type: "numeric",
      label: "Total Deductions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1400000,
        tolerance: 0,
      },
      explanation: "Total Deductions = $200,000 + $15,000 + $25,000 + $60,000 + $100,000 + $1,000,000 = $1,400,000",
    },
    {
      id: "req-taxable-estate",
      order: 3,
      type: "numeric",
      label: "Taxable Estate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5200000,
        tolerance: 0,
      },
      explanation: "Taxable Estate = Gross Estate - Deductions = $6,600,000 - $1,400,000 = $5,200,000",
    },
    {
      id: "req-estate-tax",
      order: 4,
      type: "numeric",
      label: "Federal Estate Tax Due",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Taxable Estate ($5,200,000) is below the Applicable Exclusion Amount ($12,920,000). Therefore, no federal estate tax is due.",
    },
    {
      id: "req-remaining-exclusion",
      order: 5,
      type: "numeric",
      label: "Remaining Exclusion (for Portability)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 7720000,
        tolerance: 0,
      },
      explanation: "Remaining Exclusion = $12,920,000 - $5,200,000 = $7,720,000. This can be transferred to surviving spouse via portability election.",
    },
  ],
};

// REG TBS 8: S Corporation (Medium - Numeric Entry)
export const regSCorpTBS: TBSQuestion = {
  id: "tbs-reg-008",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Federal Taxation of Entities",
  subtopic: "S Corporations",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-V",
  title: "S Corporation Shareholder Basis",
  scenarioText: `James owns 30% of Stellar Inc., an S Corporation. Calculate his stock basis and determine his allowable loss deduction for Year 1.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-corp-info",
      order: 1,
      title: "S Corporation Information",
      type: "table",
      content: {
        type: "table",
        title: "Stellar Inc. - Year 1 Operations",
        headers: ["Item", "Total (100%)", "James Share (30%)"],
        rows: [
          { cells: ["Ordinary Business Income", "$200,000", "$60,000"] },
          { cells: ["Separately Stated Loss (§1231)", "($150,000)", "($45,000)"] },
          { cells: ["Tax-Exempt Interest Income", "$10,000", "$3,000"] },
          { cells: ["Charitable Contributions", "($20,000)", "($6,000)"] },
          { cells: ["Distributions to Shareholders", "$100,000", "$30,000"] },
        ],
      },
    },
    {
      id: "exhibit-basis-info",
      order: 2,
      title: "James's Basis Information",
      type: "table",
      content: {
        type: "table",
        title: "James - Beginning of Year 1",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Stock Basis - Beginning", "$40,000"] },
          { cells: ["Loan to Corporation", "$15,000"] },
          { cells: ["At-Risk Amount - Beginning", "$55,000"] },
        ],
      },
    },
    {
      id: "exhibit-ordering",
      order: 3,
      title: "Basis Adjustment Rules",
      type: "text",
      content: {
        type: "text",
        title: "IRC §1367 - S Corp Basis Adjustments",
        paragraphs: [
          "INCREASES (applied first):",
          "1. Items of income (including tax-exempt)",
          "",
          "DECREASES (in order):",
          "1. Distributions (non-dividend)",
          "2. Non-deductible expenses",
          "3. Deduction and loss items",
          "",
          "Basis cannot go below zero. Excess losses suspended until basis restored.",
          "Debt basis used only after stock basis exhausted.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-basis-after-income",
      order: 1,
      type: "numeric",
      label: "Stock Basis After Income Items",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 103000,
        tolerance: 0,
      },
      explanation: "Beginning basis ($40,000) + Ordinary Income ($60,000) + Tax-Exempt Interest ($3,000) = $103,000",
    },
    {
      id: "req-basis-after-dist",
      order: 2,
      type: "numeric",
      label: "Stock Basis After Distribution",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 73000,
        tolerance: 0,
      },
      explanation: "Basis after income ($103,000) - Distribution ($30,000) = $73,000",
    },
    {
      id: "req-total-deductions",
      order: 3,
      type: "numeric",
      label: "Total Deduction/Loss Items (James's Share)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 51000,
        tolerance: 0,
      },
      explanation: "§1231 Loss ($45,000) + Charitable ($6,000) = $51,000 total deduction items",
    },
    {
      id: "req-allowable-loss",
      order: 4,
      type: "numeric",
      label: "Allowable Loss Deduction (Limited by Basis)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 51000,
        tolerance: 0,
      },
      explanation: "Stock basis after distribution ($73,000) exceeds loss items ($51,000), so full $51,000 is deductible. No basis limitation.",
    },
    {
      id: "req-ending-basis",
      order: 5,
      type: "numeric",
      label: "Ending Stock Basis",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 22000,
        tolerance: 0,
      },
      explanation: "Basis after distribution ($73,000) - Deduction items ($51,000) = $22,000 ending stock basis",
    },
  ],
};

// REG TBS 9: Depreciation Methods (Medium - Numeric Entry)
export const regDepreciationTBS: TBSQuestion = {
  id: "tbs-reg-009",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Federal Taxation of Property",
  subtopic: "Depreciation & Amortization",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-III",
  title: "MACRS Depreciation Calculations",
  scenarioText: `Oakwood Manufacturing placed several assets in service during Year 1. Calculate the MACRS depreciation deduction for each asset. Note: Since more than 40% of assets were placed in service in Q4, the mid-quarter convention applies to ALL assets placed in service this year.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-assets",
      order: 1,
      title: "Assets Placed in Service",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 Asset Acquisitions",
        headers: ["Asset", "Cost", "Date Acquired", "MACRS Class"],
        rows: [
          { cells: ["Computer Equipment", "$60,000", "March 15", "5-year"] },
          { cells: ["Office Furniture", "$25,000", "July 1", "7-year"] },
          { cells: ["Manufacturing Equipment", "$150,000", "October 10", "7-year, Mid-Quarter"] },
          { cells: ["Delivery Truck", "$45,000", "February 1", "5-year"] },
        ],
        footnotes: [
          "Mid-Quarter convention applies when >40% of assets placed in service in Q4",
        ],
      },
    },
    {
      id: "exhibit-rates",
      order: 2,
      title: "MACRS Depreciation Rates",
      type: "table",
      content: {
        type: "table",
        title: "First-Year MACRS Rates (200% DB)",
        headers: ["Class", "Half-Year", "Mid-Q1", "Mid-Q2", "Mid-Q3", "Mid-Q4"],
        rows: [
          { cells: ["5-Year", "20.00%", "35.00%", "25.00%", "15.00%", "5.00%"] },
          { cells: ["7-Year", "14.29%", "25.00%", "17.85%", "10.71%", "3.57%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-computer",
      order: 1,
      type: "numeric",
      label: "Depreciation - Computer Equipment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 21000,
        tolerance: 0,
      },
      explanation: "Computer (5-year, Mid-Q1): $60,000 × 35% = $21,000 (mid-quarter applies to all assets)",
    },
    {
      id: "req-furniture",
      order: 2,
      type: "numeric",
      label: "Depreciation - Office Furniture",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4463,
        tolerance: 5,
      },
      explanation: "Furniture (7-year, Mid-Q3 - July): $25,000 × 17.85% = $4,462.50 ≈ $4,463",
    },
    {
      id: "req-equipment",
      order: 3,
      type: "numeric",
      label: "Depreciation - Manufacturing Equipment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5355,
        tolerance: 5,
      },
      explanation: "Equipment (7-year, Mid-Q4): $150,000 × 3.57% = $5,355",
    },
    {
      id: "req-truck",
      order: 4,
      type: "numeric",
      label: "Depreciation - Delivery Truck",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15750,
        tolerance: 0,
      },
      explanation: "Truck (5-year, Mid-Q1 - February): $45,000 × 35% = $15,750",
    },
    {
      id: "req-total",
      order: 5,
      type: "numeric",
      label: "Total Year 1 Depreciation",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46568,
        tolerance: 10,
      },
      explanation: "Total = $21,000 + $4,463 + $5,355 + $15,750 = $46,568 (all using mid-quarter convention)",
    },
  ],
};

// ============================================
// TCP SECTION - NEW TBS
// ============================================

// TCP TBS 6: Estimated Tax Payments (Medium - Numeric Entry)
export const tcpEstimatedTaxTBS: TBSQuestion = {
  id: "tbs-tcp-006",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Tax Planning Strategies",
  subtopic: "Estimated Tax Requirements",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-I",
  title: "Individual Estimated Tax Calculations",
  scenarioText: `Robert and Susan Martinez are married filing jointly. Calculate their required estimated tax payments for Year 2 to avoid the underpayment penalty.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-prior-year",
      order: 1,
      title: "Year 1 Tax Information",
      type: "table",
      content: {
        type: "table",
        title: "Martinez Year 1 Tax Return (Prior Year)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Adjusted Gross Income", "$195,000"] },
          { cells: ["Total Tax Liability", "$38,000"] },
          { cells: ["Withholding", "$32,000"] },
          { cells: ["Tax Due with Return", "$6,000"] },
        ],
      },
    },
    {
      id: "exhibit-current-year",
      order: 2,
      title: "Year 2 Projections",
      type: "table",
      content: {
        type: "table",
        title: "Martinez Year 2 Projections",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Projected AGI", "$220,000"] },
          { cells: ["Projected Total Tax", "$45,000"] },
          { cells: ["Projected Withholding", "$28,000"] },
          { cells: ["Self-Employment Income", "$50,000 (included in AGI)"] },
        ],
      },
    },
    {
      id: "exhibit-rules",
      order: 3,
      title: "Estimated Tax Rules",
      type: "text",
      content: {
        type: "text",
        title: "IRC §6654 - Safe Harbor Rules",
        paragraphs: [
          "To avoid underpayment penalty, taxpayers must pay the LESSER of:",
          "",
          "1. 90% of current year tax liability, OR",
          "2. 100% of prior year tax liability (110% if prior year AGI > $150,000)",
          "",
          "Required payments through withholding + estimated payments",
          "Quarterly due dates: 4/15, 6/15, 9/15, 1/15",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-current-year-safe",
      order: 1,
      type: "numeric",
      label: "Safe Harbor - 90% of Current Year Tax",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40500,
        tolerance: 0,
      },
      explanation: "90% of projected Year 2 tax = $45,000 × 90% = $40,500",
    },
    {
      id: "req-prior-year-safe",
      order: 2,
      type: "numeric",
      label: "Safe Harbor - 110% of Prior Year Tax",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 41800,
        tolerance: 0,
      },
      explanation: "Prior year AGI ($195,000) > $150,000, so use 110%. Required = $38,000 × 110% = $41,800",
    },
    {
      id: "req-minimum-required",
      order: 3,
      type: "numeric",
      label: "Minimum Required to Avoid Penalty",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40500,
        tolerance: 0,
      },
      explanation: "Lesser of 90% current ($40,500) or 110% prior ($41,800) = $40,500",
    },
    {
      id: "req-estimated-needed",
      order: 4,
      type: "numeric",
      label: "Estimated Payments Needed (Total)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500,
        tolerance: 0,
      },
      explanation: "Required ($40,500) - Withholding ($28,000) = $12,500 in estimated payments needed",
    },
    {
      id: "req-quarterly",
      order: 5,
      type: "numeric",
      label: "Quarterly Estimated Payment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3125,
        tolerance: 0,
      },
      explanation: "Quarterly payment = $12,500 ÷ 4 = $3,125 per quarter",
    },
  ],
};

// TCP TBS 7: AMT Planning (Hard - Numeric Entry)
export const tcpAMTTBS: TBSQuestion = {
  id: "tbs-tcp-007",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Tax Planning Strategies",
  subtopic: "Alternative Minimum Tax",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "TCP-I",
  title: "AMT Calculation and Planning",
  scenarioText: `Calculate the tentative minimum tax (TMT) for the Chen family and determine if they owe alternative minimum tax (AMT) for Year 1.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-regular-tax",
      order: 1,
      title: "Regular Tax Information",
      type: "table",
      content: {
        type: "table",
        title: "Chen Family - Year 1 (MFJ)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Regular Taxable Income", "$380,000"] },
          { cells: ["Regular Tax Liability", "$78,540"] },
          { cells: ["State & Local Taxes Deducted", "$25,000 (limited to $10,000)"] },
          { cells: ["Actual SALT Paid", "$32,000"] },
        ],
      },
    },
    {
      id: "exhibit-amt-items",
      order: 2,
      title: "AMT Preference/Adjustment Items",
      type: "table",
      content: {
        type: "table",
        title: "AMT Adjustments",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["SALT Deduction Add-back", "$10,000"] },
          { cells: ["Incentive Stock Option Spread (Exercised)", "$45,000"] },
          { cells: ["Tax-Exempt Interest from Private Activity Bonds", "$8,000"] },
          { cells: ["Accelerated Depreciation Preference", "$12,000"] },
        ],
      },
    },
    {
      id: "exhibit-amt-rates",
      order: 3,
      title: "AMT Rates and Exemption",
      type: "table",
      content: {
        type: "table",
        title: "Year 1 AMT Parameters (MFJ)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["AMT Exemption Amount", "$126,500"] },
          { cells: ["Exemption Phase-out Threshold", "$1,156,300"] },
          { cells: ["Phase-out Rate", "25%"] },
          { cells: ["AMT Rate (26%)", "On AMTI up to $206,100"] },
          { cells: ["AMT Rate (28%)", "On AMTI over $206,100"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-amti",
      order: 1,
      type: "numeric",
      label: "Alternative Minimum Taxable Income (AMTI)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 455000,
        tolerance: 0,
      },
      explanation: "AMTI = Regular TI ($380,000) + SALT ($10,000) + ISO ($45,000) + PAB Interest ($8,000) + Depreciation ($12,000) = $455,000",
    },
    {
      id: "req-exemption",
      order: 2,
      type: "numeric",
      label: "AMT Exemption (After Phase-out)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 126500,
        tolerance: 0,
      },
      explanation: "AMTI ($455,000) < Phase-out threshold ($1,156,300), so full exemption of $126,500 is allowed",
    },
    {
      id: "req-amt-base",
      order: 3,
      type: "numeric",
      label: "AMT Base (AMTI - Exemption)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 328500,
        tolerance: 0,
      },
      explanation: "AMT Base = AMTI ($455,000) - Exemption ($126,500) = $328,500",
    },
    {
      id: "req-tmt",
      order: 4,
      type: "numeric",
      label: "Tentative Minimum Tax (TMT)",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 87858,
        tolerance: 10,
      },
      explanation: "TMT = ($206,100 × 26%) + [($328,500 - $206,100) × 28%] = $53,586 + $34,272 = $87,858",
    },
    {
      id: "req-amt-due",
      order: 5,
      type: "numeric",
      label: "AMT Due (TMT - Regular Tax)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9318,
        tolerance: 10,
      },
      explanation: "AMT = TMT ($87,858) - Regular Tax ($78,540) = $9,318. Since TMT > Regular Tax, AMT is owed.",
    },
  ],
};

// TCP TBS 8: Installment Sales (Medium - Numeric Entry)
export const tcpInstallmentSalesTBS: TBSQuestion = {
  id: "tbs-tcp-008",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Property Transactions Planning",
  subtopic: "Installment Sale Reporting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-III",
  title: "Installment Sale Tax Planning",
  scenarioText: `Jennifer sold investment land using the installment method. Calculate the gross profit percentage and the gain recognized in each year.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-sale-terms",
      order: 1,
      title: "Sale Information",
      type: "table",
      content: {
        type: "table",
        title: "Investment Land Sale - Year 1",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Selling Price", "$400,000"] },
          { cells: ["Adjusted Basis", "$160,000"] },
          { cells: ["Selling Expenses", "$24,000"] },
          { cells: ["Down Payment Received (Year 1)", "$80,000"] },
          { cells: ["Annual Principal Payments", "$80,000 for Years 2-5"] },
          { cells: ["Interest Rate", "6% on unpaid balance"] },
        ],
      },
    },
    {
      id: "exhibit-installment-rules",
      order: 2,
      title: "Installment Method Rules",
      type: "text",
      content: {
        type: "text",
        title: "IRC §453 - Installment Sales",
        paragraphs: [
          "Gross Profit = Selling Price - Adjusted Basis - Selling Expenses",
          "",
          "Gross Profit Percentage = Gross Profit ÷ Contract Price",
          "",
          "Contract Price = Selling Price (typically equals FMV received)",
          "",
          "Gain Recognized = Payment Received × Gross Profit Percentage",
          "",
          "Interest income is recognized separately from installment gain",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-profit",
      order: 1,
      type: "numeric",
      label: "Gross Profit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 216000,
        tolerance: 0,
      },
      explanation: "Gross Profit = $400,000 - $160,000 - $24,000 = $216,000",
    },
    {
      id: "req-gp-percentage",
      order: 2,
      type: "numeric",
      label: "Gross Profit Percentage (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 54,
        tolerance: 0,
      },
      explanation: "GP% = $216,000 ÷ $400,000 = 54%",
    },
    {
      id: "req-year1-gain",
      order: 3,
      type: "numeric",
      label: "Year 1 Gain Recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 43200,
        tolerance: 0,
      },
      explanation: "Year 1 Gain = Down Payment ($80,000) × 54% = $43,200",
    },
    {
      id: "req-year2-gain",
      order: 4,
      type: "numeric",
      label: "Year 2 Gain Recognized",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 43200,
        tolerance: 0,
      },
      explanation: "Year 2 Gain = Principal Payment ($80,000) × 54% = $43,200",
    },
    {
      id: "req-year2-interest",
      order: 5,
      type: "numeric",
      label: "Year 2 Interest Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 19200,
        tolerance: 0,
      },
      explanation: "Year 2 Interest = Unpaid Balance ($400,000 - $80,000) × 6% = $320,000 × 6% = $19,200",
    },
  ],
};

// ============================================
// BAR SECTION - NEW TBS
// ============================================

// BAR TBS 5: Process Costing (Medium - Numeric Entry)
export const barProcessCostingTBS: TBSQuestion = {
  id: "tbs-bar-005",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Managerial Accounting",
  subtopic: "Process Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Weighted Average Process Costing",
  scenarioText: `Bayview Chemicals uses the weighted average method for process costing. Calculate equivalent units and unit costs for the Mixing Department for July.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-production",
      order: 1,
      title: "Production Data",
      type: "table",
      content: {
        type: "table",
        title: "Mixing Department - July Production",
        headers: ["Item", "Units"],
        rows: [
          { cells: ["Beginning WIP (40% complete for conversion)", "8,000"] },
          { cells: ["Units Started", "50,000"] },
          { cells: ["Units Completed and Transferred", "45,000"] },
          { cells: ["Ending WIP (60% complete for conversion)", "13,000"] },
        ],
        footnotes: [
          "Materials are added at the beginning of the process",
        ],
      },
    },
    {
      id: "exhibit-costs",
      order: 2,
      title: "Cost Data",
      type: "table",
      content: {
        type: "table",
        title: "Mixing Department - July Costs",
        headers: ["Cost Category", "Beginning WIP", "Added in July", "Total"],
        rows: [
          { cells: ["Direct Materials", "$24,000", "$150,000", "$174,000"] },
          { cells: ["Conversion Costs", "$12,800", "$184,000", "$196,800"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-eu-materials",
      order: 1,
      type: "numeric",
      label: "Equivalent Units - Materials",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 58000,
        tolerance: 0,
      },
      explanation: "EU Materials = Completed (45,000) + Ending WIP (13,000 × 100%) = 58,000. Materials added at beginning, so 100% complete.",
    },
    {
      id: "req-eu-conversion",
      order: 2,
      type: "numeric",
      label: "Equivalent Units - Conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 52800,
        tolerance: 0,
      },
      explanation: "EU Conversion = Completed (45,000) + Ending WIP (13,000 × 60%) = 45,000 + 7,800 = 52,800",
    },
    {
      id: "req-cost-per-eu-materials",
      order: 3,
      type: "numeric",
      label: "Cost per EU - Materials",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.00,
        tolerance: 0.01,
      },
      explanation: "Cost per EU = Total Materials Cost / EU = $174,000 / 58,000 = $3.00",
    },
    {
      id: "req-cost-per-eu-conversion",
      order: 4,
      type: "numeric",
      label: "Cost per EU - Conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.73,
        tolerance: 0.01,
      },
      explanation: "Cost per EU = Total Conversion Cost / EU = $196,800 / 52,800 = $3.727, rounded to $3.73",
    },
    {
      id: "req-transferred-out",
      order: 5,
      type: "numeric",
      label: "Cost of Units Transferred Out",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 302850,
        tolerance: 50,
      },
      explanation: "Transferred Out = 45,000 × ($3.00 + $3.73) = 45,000 × $6.73 = $302,850",
    },
    {
      id: "req-ending-wip",
      order: 6,
      type: "numeric",
      label: "Cost of Ending WIP",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 68094,
        tolerance: 50,
      },
      explanation: "Ending WIP = Materials (13,000 × $3.00) + Conversion (7,800 × $3.73) = $39,000 + $29,094 = $68,094",
    },
  ],
};

// BAR TBS 6: Standard Costing Journal Entries (Medium - Journal Entry)
export const barStandardCostingTBS: TBSQuestion = {
  id: "tbs-bar-006",
  section: "BAR",
  tbsType: "journal_entry",
  topic: "Managerial Accounting",
  subtopic: "Standard Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Standard Cost Variance Journal Entries",
  scenarioText: `Precision Parts Inc. uses a standard cost system. Record the journal entry to transfer completed goods from Work in Process to Finished Goods, recognizing any variances.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-standard-costs",
      order: 1,
      title: "Standard Cost Card",
      type: "table",
      content: {
        type: "table",
        title: "Standard Cost per Unit",
        headers: ["Cost Element", "Standard"],
        rows: [
          { cells: ["Direct Materials (2 lbs @ $5)", "$10.00"] },
          { cells: ["Direct Labor (0.5 hrs @ $20)", "$10.00"] },
          { cells: ["Variable Overhead (0.5 hrs @ $8)", "$4.00"] },
          { cells: ["Fixed Overhead (0.5 hrs @ $6)", "$3.00"] },
          { cells: ["Total Standard Cost", "$27.00"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Production Data",
      type: "table",
      content: {
        type: "table",
        title: "July Production - 10,000 Units Completed",
        headers: ["Item", "Actual", "Standard"],
        rows: [
          { cells: ["Materials Used", "21,000 lbs @ $4.80", "20,000 lbs @ $5.00"] },
          { cells: ["Labor Hours", "5,200 hrs @ $19.50", "5,000 hrs @ $20.00"] },
          { cells: ["Variable OH Applied", "$41,600", "$40,000"] },
          { cells: ["Fixed OH Applied", "$31,200", "$30,000"] },
        ],
        footnotes: [
          "WIP has been debited for actual costs throughout the month",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fg-debit",
      order: 1,
      type: "journal_debit",
      label: "Debit to Finished Goods (at Standard)",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-fg",
        accountName: "Finished Goods Inventory",
        amount: 270000,
        tolerance: 0,
      },
      explanation: "Finished Goods at standard = 10,000 units × $27.00 = $270,000",
    },
    {
      id: "req-wip-credit",
      order: 2,
      type: "journal_credit",
      label: "Credit to WIP (at Actual)",
      points: 2,
      correctAnswer: {
        type: "journal",
        accountId: "acc-wip",
        accountName: "Work in Process Inventory",
        amount: 275000,
        tolerance: 0,
      },
      explanation: "WIP at actual = Materials (21,000 × $4.80 = $100,800) + Labor (5,200 × $19.50 = $101,400) + VOH ($41,600) + FOH ($31,200) = $275,000",
    },
  ],
  journalAccounts: [
    { id: "acc-fg", name: "Finished Goods Inventory", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-wip", name: "Work in Process Inventory", type: "asset", normalBalance: "debit", isDistractor: false },
    { id: "acc-dm-variance", name: "Direct Materials Variance", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-dl-variance", name: "Direct Labor Variance", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-oh-variance", name: "Overhead Variance", type: "expense", normalBalance: "debit", isDistractor: true },
    { id: "acc-raw-materials", name: "Raw Materials Inventory", type: "asset", normalBalance: "debit", isDistractor: true },
    { id: "acc-cogs", name: "Cost of Goods Sold", type: "expense", normalBalance: "debit", isDistractor: true },
  ],
};

// BAR TBS 7: Transfer Pricing (Hard - Numeric Entry)
export const barTransferPricingTBS: TBSQuestion = {
  id: "tbs-bar-007",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Measurement",
  subtopic: "Transfer Pricing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Transfer Pricing Decisions",
  scenarioText: `GlobalTech has two divisions that can trade internally. Analyze the transfer pricing options and their impact on divisional and company profits.`,
  timeEstimateMinutes: 15,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-division-info",
      order: 1,
      title: "Division Information",
      type: "table",
      content: {
        type: "table",
        title: "Division Cost and Price Data",
        headers: ["Item", "Component Division (Selling)", "Assembly Division (Buying)"],
        rows: [
          { cells: ["Variable Cost per Unit", "$35", "Additional $45"] },
          { cells: ["Fixed Costs (Annual)", "$500,000", "$800,000"] },
          { cells: ["External Sale Price", "$60", "N/A"] },
          { cells: ["External Purchase Price", "N/A", "$58"] },
          { cells: ["Final Product Price", "N/A", "$140"] },
          { cells: ["Current Capacity Utilization", "70%", "80%"] },
          { cells: ["Maximum Capacity", "100,000 units", "50,000 units"] },
        ],
      },
    },
    {
      id: "exhibit-scenario",
      order: 2,
      title: "Transfer Decision",
      type: "text",
      content: {
        type: "text",
        title: "Proposed Internal Transfer",
        paragraphs: [
          "Assembly Division needs 15,000 components and is considering purchasing internally.",
          "",
          "Component Division currently sells 70,000 units externally.",
          "",
          "What is the acceptable transfer price range?",
          "",
          "Minimum TP = Seller's variable cost + Opportunity cost per unit",
          "Maximum TP = Buyer's alternative purchase price",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-min-tp-no-capacity",
      order: 1,
      type: "numeric",
      label: "Minimum Transfer Price (with excess capacity)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35,
        tolerance: 0,
      },
      explanation: "With excess capacity (70% used, 30,000 units available > 15,000 needed), minimum TP = Variable cost = $35. No opportunity cost since no external sales would be lost.",
    },
    {
      id: "req-max-tp",
      order: 2,
      type: "numeric",
      label: "Maximum Transfer Price",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 58,
        tolerance: 0,
      },
      explanation: "Maximum TP = Assembly Division's alternative purchase price = $58 from external supplier",
    },
    {
      id: "req-tp-range",
      order: 3,
      type: "dropdown",
      label: "Is internal transfer beneficial to both divisions?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes",
      },
      explanation: "Yes - The negotiation range is $35 to $58, providing room for a mutually beneficial transfer price.",
      dropdownOptions: [
        { id: "opt-yes", order: 1, text: "Yes - negotiation range exists", isCorrect: true },
        { id: "opt-no", order: 2, text: "No - min exceeds max", isCorrect: false },
        { id: "opt-indiff", order: 3, text: "Indifferent", isCorrect: false },
      ],
    },
    {
      id: "req-company-savings",
      order: 4,
      type: "numeric",
      label: "Company-wide Savings from Internal Transfer (per unit)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 23,
        tolerance: 0,
      },
      explanation: "Company saves: External purchase ($58) - Internal variable cost ($35) = $23 per unit",
    },
    {
      id: "req-total-savings",
      order: 5,
      type: "numeric",
      label: "Total Annual Savings (15,000 units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 345000,
        tolerance: 0,
      },
      explanation: "Total savings = 15,000 units × $23 = $345,000",
    },
    {
      id: "req-assembly-profit",
      order: 6,
      type: "numeric",
      label: "Assembly Division Profit per Unit (at TP of $45)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50,
        tolerance: 0,
      },
      explanation: "At TP of $45: Revenue ($140) - Transfer price ($45) - Additional costs ($45) = $50 profit per unit",
    },
  ],
};

// ============================================
// ISC SECTION - NEW TBS
// ============================================

// ISC TBS 5: Database Controls (Medium - Document Review)
export const iscDatabaseControlsTBS: TBSQuestion = {
  id: "tbs-isc-005",
  section: "ISC",
  tbsType: "document_review",
  topic: "Data Management",
  subtopic: "Database Controls",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "Database Control Assessment",
  scenarioText: `You are evaluating database controls for a client's financial system. Review each control scenario and identify the appropriate database control category.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-scenarios",
      order: 1,
      title: "Control Scenarios",
      type: "text",
      content: {
        type: "text",
        title: "Database Control Observations",
        paragraphs: [
          "Scenario 1: The database automatically rejects any entry where the transaction date is in the future or more than 30 days in the past.",
          "",
          "Scenario 2: Users must enter their employee ID and password before accessing any database tables. Different user roles have different access permissions.",
          "",
          "Scenario 3: The database maintains a complete log of all INSERT, UPDATE, and DELETE operations, including the user ID and timestamp.",
          "",
          "Scenario 4: Daily automated backups are performed at 2 AM, with weekly full backups stored offsite.",
          "",
          "Scenario 5: When entering a customer order, the system validates that the customer ID exists in the customer master file before allowing the order to be saved.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-s1",
      order: 1,
      type: "dropdown",
      label: "Scenario 1 - Date Validation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-s1-input",
      },
      explanation: "This is an input validation control (specifically a reasonableness check) - it ensures data entered falls within acceptable parameters.",
      dropdownOptions: [
        { id: "opt-s1-input", order: 1, text: "Input Validation Control", isCorrect: true },
        { id: "opt-s1-access", order: 2, text: "Access Control", isCorrect: false },
        { id: "opt-s1-audit", order: 3, text: "Audit Trail Control", isCorrect: false },
        { id: "opt-s1-backup", order: 4, text: "Backup/Recovery Control", isCorrect: false },
      ],
    },
    {
      id: "req-s2",
      order: 2,
      type: "dropdown",
      label: "Scenario 2 - User Authentication",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-s2-access",
      },
      explanation: "This is an access control - it controls who can access data and what they can do (authentication and authorization).",
      dropdownOptions: [
        { id: "opt-s2-input", order: 1, text: "Input Validation Control", isCorrect: false },
        { id: "opt-s2-access", order: 2, text: "Access Control", isCorrect: true },
        { id: "opt-s2-audit", order: 3, text: "Audit Trail Control", isCorrect: false },
        { id: "opt-s2-encrypt", order: 4, text: "Encryption Control", isCorrect: false },
      ],
    },
    {
      id: "req-s3",
      order: 3,
      type: "dropdown",
      label: "Scenario 3 - Transaction Logging",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-s3-audit",
      },
      explanation: "This is an audit trail control - it maintains a record of all changes for accountability and investigation purposes.",
      dropdownOptions: [
        { id: "opt-s3-input", order: 1, text: "Input Validation Control", isCorrect: false },
        { id: "opt-s3-access", order: 2, text: "Access Control", isCorrect: false },
        { id: "opt-s3-audit", order: 3, text: "Audit Trail Control", isCorrect: true },
        { id: "opt-s3-backup", order: 4, text: "Backup/Recovery Control", isCorrect: false },
      ],
    },
    {
      id: "req-s4",
      order: 4,
      type: "dropdown",
      label: "Scenario 4 - Automated Backups",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-s4-backup",
      },
      explanation: "This is a backup/recovery control - it ensures data can be restored in case of system failure or data loss.",
      dropdownOptions: [
        { id: "opt-s4-input", order: 1, text: "Input Validation Control", isCorrect: false },
        { id: "opt-s4-access", order: 2, text: "Access Control", isCorrect: false },
        { id: "opt-s4-audit", order: 3, text: "Audit Trail Control", isCorrect: false },
        { id: "opt-s4-backup", order: 4, text: "Backup/Recovery Control", isCorrect: true },
      ],
    },
    {
      id: "req-s5",
      order: 5,
      type: "dropdown",
      label: "Scenario 5 - Customer ID Validation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-s5-ref",
      },
      explanation: "This is a referential integrity control (a type of input validation) - it ensures foreign key relationships are maintained.",
      dropdownOptions: [
        { id: "opt-s5-input", order: 1, text: "Input Validation Control", isCorrect: false },
        { id: "opt-s5-ref", order: 2, text: "Referential Integrity Control", isCorrect: true },
        { id: "opt-s5-audit", order: 3, text: "Audit Trail Control", isCorrect: false },
        { id: "opt-s5-access", order: 4, text: "Access Control", isCorrect: false },
      ],
    },
  ],
};

// ISC TBS 6: Business Continuity (Medium - Document Review)
export const iscBusinessContinuityTBS: TBSQuestion = {
  id: "tbs-isc-006",
  section: "ISC",
  tbsType: "document_review",
  topic: "System Operations",
  subtopic: "Business Continuity & Disaster Recovery",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-II",
  title: "Business Continuity Planning",
  scenarioText: `Your client is developing a business continuity plan. Review the recovery objectives and match each metric to its correct definition.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-metrics",
      order: 1,
      title: "Recovery Metrics",
      type: "text",
      content: {
        type: "text",
        title: "Business Continuity Terminology",
        paragraphs: [
          "Metric A: The maximum amount of time that can elapse before the unavailability of a business process causes significant harm to the organization.",
          "",
          "Metric B: The point in time to which data must be recovered after a disaster, representing acceptable data loss.",
          "",
          "Metric C: The target time set for resumption of a product, service, or activity after a disaster.",
          "",
          "Metric D: The minimum level of service that must be maintained during a disaster recovery scenario.",
          "",
          "Metric E: The maximum time allowed for system testing before going live after disaster recovery.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-metric-a",
      order: 1,
      type: "dropdown",
      label: "Metric A Definition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-a-mtpd",
      },
      explanation: "This is Maximum Tolerable Period of Disruption (MTPD) - the maximum time a business can tolerate disruption before significant harm occurs.",
      dropdownOptions: [
        { id: "opt-a-rto", order: 1, text: "Recovery Time Objective (RTO)", isCorrect: false },
        { id: "opt-a-rpo", order: 2, text: "Recovery Point Objective (RPO)", isCorrect: false },
        { id: "opt-a-mtpd", order: 3, text: "Maximum Tolerable Period of Disruption (MTPD)", isCorrect: true },
        { id: "opt-a-mlo", order: 4, text: "Minimum Service Level Objective", isCorrect: false },
      ],
    },
    {
      id: "req-metric-b",
      order: 2,
      type: "dropdown",
      label: "Metric B Definition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b-rpo",
      },
      explanation: "This is Recovery Point Objective (RPO) - the point in time to which data must be recovered, determining acceptable data loss.",
      dropdownOptions: [
        { id: "opt-b-rto", order: 1, text: "Recovery Time Objective (RTO)", isCorrect: false },
        { id: "opt-b-rpo", order: 2, text: "Recovery Point Objective (RPO)", isCorrect: true },
        { id: "opt-b-mtpd", order: 3, text: "Maximum Tolerable Period of Disruption (MTPD)", isCorrect: false },
        { id: "opt-b-wrt", order: 4, text: "Work Recovery Time (WRT)", isCorrect: false },
      ],
    },
    {
      id: "req-metric-c",
      order: 3,
      type: "dropdown",
      label: "Metric C Definition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c-rto",
      },
      explanation: "This is Recovery Time Objective (RTO) - the target time for resuming operations after a disaster.",
      dropdownOptions: [
        { id: "opt-c-rto", order: 1, text: "Recovery Time Objective (RTO)", isCorrect: true },
        { id: "opt-c-rpo", order: 2, text: "Recovery Point Objective (RPO)", isCorrect: false },
        { id: "opt-c-mtpd", order: 3, text: "Maximum Tolerable Period of Disruption (MTPD)", isCorrect: false },
        { id: "opt-c-wrt", order: 4, text: "Work Recovery Time (WRT)", isCorrect: false },
      ],
    },
    {
      id: "req-metric-d",
      order: 4,
      type: "dropdown",
      label: "Metric D Definition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-d-mlo",
      },
      explanation: "This is Minimum Service Level Objective (MSLO) - the minimum acceptable level of service during recovery.",
      dropdownOptions: [
        { id: "opt-d-rto", order: 1, text: "Recovery Time Objective (RTO)", isCorrect: false },
        { id: "opt-d-rpo", order: 2, text: "Recovery Point Objective (RPO)", isCorrect: false },
        { id: "opt-d-mlo", order: 3, text: "Minimum Service Level Objective (MSLO)", isCorrect: true },
        { id: "opt-d-wrt", order: 4, text: "Work Recovery Time (WRT)", isCorrect: false },
      ],
    },
    {
      id: "req-metric-e",
      order: 5,
      type: "dropdown",
      label: "Metric E Definition",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-e-wrt",
      },
      explanation: "This is Work Recovery Time (WRT) - the time allowed for system testing and validation before going live.",
      dropdownOptions: [
        { id: "opt-e-rto", order: 1, text: "Recovery Time Objective (RTO)", isCorrect: false },
        { id: "opt-e-rpo", order: 2, text: "Recovery Point Objective (RPO)", isCorrect: false },
        { id: "opt-e-mtpd", order: 3, text: "Maximum Tolerable Period of Disruption (MTPD)", isCorrect: false },
        { id: "opt-e-wrt", order: 4, text: "Work Recovery Time (WRT)", isCorrect: true },
      ],
    },
  ],
};

// ISC TBS 7: ERP System Controls (Medium - Document Review)
export const iscERPControlsTBS: TBSQuestion = {
  id: "tbs-isc-007",
  section: "ISC",
  tbsType: "document_review",
  topic: "Information Systems",
  subtopic: "Enterprise Systems",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "ISC-I",
  title: "ERP Control Assessment",
  scenarioText: `Your client recently implemented a new ERP system. Evaluate the following system configurations and identify the control type each represents.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-configs",
      order: 1,
      title: "ERP Configurations",
      type: "text",
      content: {
        type: "text",
        title: "System Configuration Observations",
        paragraphs: [
          "Configuration 1: The system requires purchase orders over $10,000 to be electronically approved by a department manager before being sent to vendors.",
          "",
          "Configuration 2: Customer credit limits are automatically checked before orders are processed, and orders exceeding limits are held for credit manager review.",
          "",
          "Configuration 3: Month-end close procedures automatically generate a trial balance comparison report showing current and prior month balances with variance percentages.",
          "",
          "Configuration 4: The system prevents the same employee from creating a vendor and approving payments to that vendor.",
          "",
          "Configuration 5: Any changes to the chart of accounts require approval from the controller and are logged with the user ID and timestamp.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-config1",
      order: 1,
      type: "dropdown",
      label: "Configuration 1 - PO Approval Workflow",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c1-auth",
      },
      explanation: "This is an authorization control - it ensures transactions are properly approved before execution based on dollar thresholds.",
      dropdownOptions: [
        { id: "opt-c1-auth", order: 1, text: "Authorization Control", isCorrect: true },
        { id: "opt-c1-valid", order: 2, text: "Input Validation Control", isCorrect: false },
        { id: "opt-c1-sod", order: 3, text: "Segregation of Duties Control", isCorrect: false },
        { id: "opt-c1-detect", order: 4, text: "Detective Control", isCorrect: false },
      ],
    },
    {
      id: "req-config2",
      order: 2,
      type: "dropdown",
      label: "Configuration 2 - Credit Limit Check",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c2-valid",
      },
      explanation: "This is an automated input/processing validation control - it automatically validates transactions against established limits.",
      dropdownOptions: [
        { id: "opt-c2-auth", order: 1, text: "Authorization Control", isCorrect: false },
        { id: "opt-c2-valid", order: 2, text: "Automated Validation Control", isCorrect: true },
        { id: "opt-c2-sod", order: 3, text: "Segregation of Duties Control", isCorrect: false },
        { id: "opt-c2-detect", order: 4, text: "Detective Control", isCorrect: false },
      ],
    },
    {
      id: "req-config3",
      order: 3,
      type: "dropdown",
      label: "Configuration 3 - Trial Balance Report",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c3-detect",
      },
      explanation: "This is a detective control - it generates reports that help identify unusual items or potential errors after transactions occur.",
      dropdownOptions: [
        { id: "opt-c3-auth", order: 1, text: "Authorization Control", isCorrect: false },
        { id: "opt-c3-valid", order: 2, text: "Input Validation Control", isCorrect: false },
        { id: "opt-c3-sod", order: 3, text: "Segregation of Duties Control", isCorrect: false },
        { id: "opt-c3-detect", order: 4, text: "Detective Control", isCorrect: true },
      ],
    },
    {
      id: "req-config4",
      order: 4,
      type: "dropdown",
      label: "Configuration 4 - Vendor/Payment Restriction",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c4-sod",
      },
      explanation: "This is a segregation of duties control - it prevents one person from performing incompatible functions that could enable fraud.",
      dropdownOptions: [
        { id: "opt-c4-auth", order: 1, text: "Authorization Control", isCorrect: false },
        { id: "opt-c4-valid", order: 2, text: "Input Validation Control", isCorrect: false },
        { id: "opt-c4-sod", order: 3, text: "Segregation of Duties Control", isCorrect: true },
        { id: "opt-c4-detect", order: 4, text: "Detective Control", isCorrect: false },
      ],
    },
    {
      id: "req-config5",
      order: 5,
      type: "dropdown",
      label: "Configuration 5 - Chart of Accounts Changes",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-c5-config",
      },
      explanation: "This is a configuration/change management control - it controls changes to master data and system settings with proper approvals and audit trails.",
      dropdownOptions: [
        { id: "opt-c5-auth", order: 1, text: "Authorization Control", isCorrect: false },
        { id: "opt-c5-config", order: 2, text: "Configuration/Change Management Control", isCorrect: true },
        { id: "opt-c5-sod", order: 3, text: "Segregation of Duties Control", isCorrect: false },
        { id: "opt-c5-detect", order: 4, text: "Detective Control", isCorrect: false },
      ],
    },
  ],
};

// ============================================
// BATCH 3 - Distribution Balance Additions
// ============================================

// AUD TBS 10: Research - AICPA Standards (Medium - Research)
export const audResearchTBS: TBSQuestion = {
  id: "tbs-aud-010",
  section: "AUD",
  tbsType: "research",
  topic: "Professional Standards",
  subtopic: "AICPA Standards Research",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-I",
  title: "Authoritative Literature Research",
  scenarioText: `Your audit team needs to determine the appropriate guidance for a specific audit situation. Research the authoritative literature to find the citation that addresses the auditor's responsibility when there is substantial doubt about an entity's ability to continue as a going concern.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 2,
  exhibits: [
    {
      id: "exhibit-scenario",
      order: 1,
      title: "Audit Situation",
      type: "memo",
      content: {
        type: "memo",
        from: "Audit Partner",
        to: "Audit Team",
        date: "February 15, Year 2",
        subject: "Client Going Concern Considerations",
        body: `During our audit of Delta Manufacturing, we identified the following conditions:

1. Recurring operating losses for the past three years
2. Working capital deficiency of $2.5 million
3. Inability to obtain financing from traditional lenders
4. Loss of a major customer representing 35% of revenue

Management has provided a plan to address these conditions, but we have substantial doubt about the entity's ability to continue as a going concern for a reasonable period of time.

Please research the authoritative literature to find the specific guidance on the auditor's responsibility regarding going concern evaluation and the consideration of management's plans.`,
      },
    },
  ],
  requirements: [
    {
      id: "req-citation",
      order: 1,
      type: "citation",
      label: "Authoritative Citation",
      description: "Enter the AU-C section that addresses the auditor's responsibility relating to going concern",
      points: 2,
      correctAnswer: {
        type: "citation",
        source: "AICPA",
        topicCode: "AU-C 570",
        alternativeCitations: [
          { source: "AICPA", topicCode: "AU-C Section 570" },
          { source: "AICPA", topicCode: "570" },
          { source: "AICPA", topicCode: "AU-C 570.12" },
        ],
      },
      explanation: "AU-C Section 570, The Auditor's Consideration of an Entity's Ability to Continue as a Going Concern, addresses the auditor's responsibility to evaluate whether substantial doubt exists about an entity's ability to continue as a going concern.",
      hint: "Look in AU-C Section 570 for guidance on going concern evaluation",
    },
  ],
};

// AUD TBS 11: Materiality Calculations (Medium - Numeric Entry)
export const audMaterialityTBS: TBSQuestion = {
  id: "tbs-aud-011",
  section: "AUD",
  tbsType: "numeric_entry",
  topic: "Audit Planning",
  subtopic: "Materiality",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "AUD-II",
  title: "Materiality and Performance Materiality",
  scenarioText: `You are planning the audit of Sunrise Industries. Calculate planning materiality and performance materiality using the financial data provided and your firm's guidelines.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-financials",
      order: 1,
      title: "Financial Data",
      type: "table",
      content: {
        type: "table",
        title: "Sunrise Industries - Year 1 Financial Summary",
        headers: ["Financial Measure", "Amount"],
        rows: [
          { cells: ["Total Assets", "$45,000,000"] },
          { cells: ["Total Revenue", "$82,000,000"] },
          { cells: ["Net Income Before Tax", "$4,100,000"] },
          { cells: ["Total Equity", "$18,500,000"] },
          { cells: ["Gross Profit", "$28,700,000"] },
        ],
      },
    },
    {
      id: "exhibit-guidelines",
      order: 2,
      title: "Firm Guidelines",
      type: "text",
      content: {
        type: "text",
        title: "ABC Firm - Materiality Guidelines",
        paragraphs: [
          "Planning Materiality Benchmarks:",
          "• 5% of Net Income Before Tax (for-profit entities)",
          "• 0.5% of Total Revenue (alternative if income volatile)",
          "• 1% of Total Assets (for asset-intensive industries)",
          "",
          "Performance Materiality: 50-75% of Planning Materiality",
          "• Use 75% for low-risk clients with strong controls",
          "• Use 50% for high-risk clients or weak controls",
          "",
          "Sunrise Industries is a manufacturing company with stable earnings and adequate internal controls. Use the net income benchmark.",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-planning-mat",
      order: 1,
      type: "numeric",
      label: "Planning Materiality (using Net Income benchmark)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 205000,
        tolerance: 0,
      },
      explanation: "Planning Materiality = Net Income Before Tax × 5% = $4,100,000 × 5% = $205,000",
    },
    {
      id: "req-perf-mat",
      order: 2,
      type: "numeric",
      label: "Performance Materiality (using 75% for low-risk)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 153750,
        tolerance: 0,
      },
      explanation: "Performance Materiality = Planning Materiality × 75% = $205,000 × 75% = $153,750",
    },
    {
      id: "req-alt-mat-revenue",
      order: 3,
      type: "numeric",
      label: "Alternative Materiality (Revenue benchmark)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 410000,
        tolerance: 0,
      },
      explanation: "Alternative = Total Revenue × 0.5% = $82,000,000 × 0.5% = $410,000",
    },
    {
      id: "req-alt-mat-assets",
      order: 4,
      type: "numeric",
      label: "Alternative Materiality (Assets benchmark)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 450000,
        tolerance: 0,
      },
      explanation: "Alternative = Total Assets × 1% = $45,000,000 × 1% = $450,000",
    },
    {
      id: "req-trivial",
      order: 5,
      type: "numeric",
      label: "Clearly Trivial Threshold (5% of Planning Materiality)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10250,
        tolerance: 0,
      },
      explanation: "Clearly Trivial = Planning Materiality × 5% = $205,000 × 5% = $10,250. Misstatements below this are clearly trivial.",
    },
  ],
};

// REG TBS 10: Tax Form Analysis (Medium - Document Review)
export const regTaxFormTBS: TBSQuestion = {
  id: "tbs-reg-010",
  section: "REG",
  tbsType: "document_review",
  topic: "Individual Taxation",
  subtopic: "Tax Return Preparation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "REG-IV",
  title: "Schedule C Analysis",
  scenarioText: `Review the following Schedule C (Profit or Loss from Business) and identify any errors or issues that need correction.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-schedule-c",
      order: 1,
      title: "Draft Schedule C",
      type: "table",
      content: {
        type: "table",
        title: "Schedule C - Sarah's Consulting LLC (Single-Member LLC)",
        headers: ["Line", "Description", "Amount"],
        rows: [
          { cells: ["1", "Gross receipts", "$185,000"] },
          { cells: ["2", "Returns and allowances", "$0"] },
          { cells: ["3", "Cost of goods sold", "$0"] },
          { cells: ["4", "Gross profit", "$185,000"] },
          { cells: ["8", "Advertising", "$4,500"] },
          { cells: ["9", "Car/truck expenses (actual method)", "$12,000"] },
          { cells: ["13", "Depreciation", "$8,200"] },
          { cells: ["15", "Insurance (health insurance)", "$9,600"] },
          { cells: ["17", "Legal and professional services", "$3,500"] },
          { cells: ["18", "Office expense", "$2,800"] },
          { cells: ["20b", "Meals (100% deducted)", "$6,400"] },
          { cells: ["24a", "Travel", "$7,200"] },
          { cells: ["25", "Utilities", "$1,800"] },
          { cells: ["27", "Other expenses - Home office (300 sq ft)", "$4,500"] },
          { cells: ["28", "Total expenses", "$60,500"] },
          { cells: ["29", "Tentative profit", "$124,500"] },
        ],
        footnotes: [
          "Business use of vehicle: 60%",
          "Total home square footage: 2,000 sq ft",
          "Sarah uses home office exclusively for business",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-health-ins",
      order: 1,
      type: "dropdown",
      label: "Line 15 - Health Insurance Treatment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-hi-error",
      },
      explanation: "Self-employed health insurance is NOT deductible on Schedule C. It is an above-the-line deduction on Form 1040, Schedule 1.",
      dropdownOptions: [
        { id: "opt-hi-correct", order: 1, text: "Correct - proper Schedule C deduction", isCorrect: false },
        { id: "opt-hi-error", order: 2, text: "Error - should be on Form 1040, not Schedule C", isCorrect: true },
        { id: "opt-hi-partial", order: 3, text: "Error - wrong amount", isCorrect: false },
      ],
    },
    {
      id: "req-meals",
      order: 2,
      type: "dropdown",
      label: "Line 20b - Meals Deduction",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-meals-error",
      },
      explanation: "Business meals are only 50% deductible (the 100% deduction for restaurant meals ended after 2022). Should be $3,200, not $6,400.",
      dropdownOptions: [
        { id: "opt-meals-correct", order: 1, text: "Correct - 100% deductible", isCorrect: false },
        { id: "opt-meals-error", order: 2, text: "Error - should be 50% ($3,200)", isCorrect: true },
        { id: "opt-meals-none", order: 3, text: "Error - meals not deductible at all", isCorrect: false },
      ],
    },
    {
      id: "req-home-office",
      order: 3,
      type: "dropdown",
      label: "Line 27 - Home Office Calculation",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ho-check",
      },
      explanation: "Home office can use simplified method ($5/sq ft, max 300 sq ft = $1,500) or actual expenses. If using actual, need Form 8829. The $4,500 suggests actual method which requires verification.",
      dropdownOptions: [
        { id: "opt-ho-correct", order: 1, text: "Correct as shown", isCorrect: false },
        { id: "opt-ho-check", order: 2, text: "Needs verification - simplified method would be $1,500", isCorrect: true },
        { id: "opt-ho-error", order: 3, text: "Error - home office not allowed", isCorrect: false },
      ],
    },
    {
      id: "req-vehicle",
      order: 4,
      type: "dropdown",
      label: "Line 9 - Vehicle Expenses",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-veh-check",
      },
      explanation: "If using actual expenses, only the business-use percentage (60%) is deductible. Need to verify if $12,000 represents 60% of actual expenses or if it needs adjustment.",
      dropdownOptions: [
        { id: "opt-veh-correct", order: 1, text: "Correct - properly limited to business use", isCorrect: true },
        { id: "opt-veh-check", order: 2, text: "Error - should be 60% of total expenses", isCorrect: false },
        { id: "opt-veh-error", order: 3, text: "Error - must use standard mileage rate", isCorrect: false },
      ],
    },
    {
      id: "req-corrected-expenses",
      order: 5,
      type: "numeric",
      label: "Corrected Total Expenses (after fixing errors)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 47700,
        tolerance: 100,
      },
      explanation: "Original $60,500 - Health insurance $9,600 - Meals overstatement $3,200 = $47,700. Home office may also need adjustment depending on method used.",
    },
  ],
};

// TCP TBS 9: Multi-State Tax Planning (Medium - Document Review)
export const tcpMultiStateTBS: TBSQuestion = {
  id: "tbs-tcp-009",
  section: "TCP",
  tbsType: "document_review",
  topic: "Tax Planning Strategies",
  subtopic: "Multi-State Taxation",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "TCP-I",
  title: "State Tax Planning Analysis",
  scenarioText: `Your client is considering relocating their business operations. Review the state tax comparison and identify the optimal planning strategy.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-comparison",
      order: 1,
      title: "State Tax Comparison",
      type: "table",
      content: {
        type: "table",
        title: "State Tax Rates Comparison",
        headers: ["Tax Type", "Current State (CA)", "Option A (TX)", "Option B (NV)", "Option C (FL)"],
        rows: [
          { cells: ["Corporate Income Tax", "8.84%", "None (franchise tax)", "None", "5.5%"] },
          { cells: ["Individual Income Tax (Top Rate)", "13.3%", "None", "None", "None"] },
          { cells: ["Sales Tax (State)", "7.25%", "6.25%", "6.85%", "6.0%"] },
          { cells: ["Property Tax Rate (Avg)", "0.73%", "1.69%", "0.55%", "0.83%"] },
          { cells: ["Franchise Tax", "Min $800", "$0.00375/$ revenue", "None", "None"] },
          { cells: ["LLC Fee", "$800 + gross receipts fee", "None", "$200/year", "$138.75/year"] },
        ],
        footnotes: [
          "TX franchise tax: 0.375% of revenue for retailers, 0.75% for others",
          "Client has $5M revenue, $500K net income, $2M payroll",
        ],
      },
    },
    {
      id: "exhibit-client-info",
      order: 2,
      title: "Client Information",
      type: "text",
      content: {
        type: "text",
        title: "TechStart LLC - Business Profile",
        paragraphs: [
          "Entity Type: Single-member LLC (disregarded entity)",
          "Industry: Software consulting services",
          "Annual Revenue: $5,000,000",
          "Net Income: $500,000",
          "Owner's Other Income: $150,000 (spouse's W-2)",
          "Real Property: $800,000 commercial building",
          "Employees: 15 (can work remotely)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ca-tax",
      order: 1,
      type: "numeric",
      label: "Estimated CA State Tax (Income Tax at 13.3%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 66500,
        tolerance: 500,
      },
      explanation: "CA individual income tax on $500K passthrough income = approximately $66,500 (at top marginal rate of 13.3%)",
    },
    {
      id: "req-tx-franchise",
      order: 2,
      type: "numeric",
      label: "Estimated TX Franchise Tax (0.75% of revenue)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 37500,
        tolerance: 0,
      },
      explanation: "TX Franchise Tax = $5,000,000 × 0.75% = $37,500 (services taxed at 0.75%, not 0.375%)",
    },
    {
      id: "req-best-state",
      order: 3,
      type: "dropdown",
      label: "Best State for Income Tax Savings",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-nv",
      },
      explanation: "Nevada has no income tax and no franchise tax, making it the best option purely for income tax savings. Texas has no income tax but has a franchise tax.",
      dropdownOptions: [
        { id: "opt-ca", order: 1, text: "California - stay put", isCorrect: false },
        { id: "opt-tx", order: 2, text: "Texas", isCorrect: false },
        { id: "opt-nv", order: 3, text: "Nevada", isCorrect: true },
        { id: "opt-fl", order: 4, text: "Florida", isCorrect: false },
      ],
    },
    {
      id: "req-property-consideration",
      order: 4,
      type: "dropdown",
      label: "Which state has highest property tax impact?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-prop-tx",
      },
      explanation: "Texas has the highest property tax rate at 1.69%. On an $800K property, this would be $13,520 annually vs $5,840 in CA.",
      dropdownOptions: [
        { id: "opt-prop-ca", order: 1, text: "California", isCorrect: false },
        { id: "opt-prop-tx", order: 2, text: "Texas", isCorrect: true },
        { id: "opt-prop-nv", order: 3, text: "Nevada", isCorrect: false },
        { id: "opt-prop-fl", order: 4, text: "Florida", isCorrect: false },
      ],
    },
    {
      id: "req-nexus-warning",
      order: 5,
      type: "dropdown",
      label: "Key Planning Consideration",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-nexus",
      },
      explanation: "Even after relocating, the business may still have nexus in California if customers or employees remain there, potentially requiring CA tax filing.",
      dropdownOptions: [
        { id: "opt-nexus", order: 1, text: "May still owe CA tax if nexus exists through customers/employees", isCorrect: true },
        { id: "opt-timing", order: 2, text: "Must relocate by January 1 to avoid all CA tax", isCorrect: false },
        { id: "opt-entity", order: 3, text: "Must convert to C-Corp to benefit from relocation", isCorrect: false },
      ],
    },
  ],
};

// BAR TBS 8: Financial Statement Analysis (Medium - Document Review)
export const barFinancialAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-008",
  section: "BAR",
  tbsType: "document_review",
  topic: "Financial Statement Analysis",
  subtopic: "Trend Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Comparative Financial Analysis",
  scenarioText: `Review the comparative financial data for Summit Corp and identify trends and potential concerns.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-financials",
      order: 1,
      title: "Comparative Financial Data",
      type: "table",
      content: {
        type: "table",
        title: "Summit Corp - Three Year Comparison (in thousands)",
        headers: ["Item", "Year 3", "Year 2", "Year 1"],
        rows: [
          { cells: ["Revenue", "$12,500", "$11,200", "$10,000"] },
          { cells: ["Cost of Goods Sold", "$8,750", "$7,280", "$6,000"] },
          { cells: ["Gross Profit", "$3,750", "$3,920", "$4,000"] },
          { cells: ["Operating Expenses", "$2,800", "$2,600", "$2,400"] },
          { cells: ["Net Income", "$950", "$1,320", "$1,600"] },
          { cells: ["Accounts Receivable", "$2,800", "$2,100", "$1,500"] },
          { cells: ["Inventory", "$3,200", "$2,400", "$1,800"] },
          { cells: ["Total Assets", "$15,000", "$12,500", "$10,500"] },
          { cells: ["Current Liabilities", "$4,500", "$3,200", "$2,500"] },
          { cells: ["Long-term Debt", "$5,000", "$3,500", "$2,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-margin-trend",
      order: 1,
      type: "dropdown",
      label: "Gross Profit Margin Trend",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-gpm-declining",
      },
      explanation: "GPM: Year 1 = 40%, Year 2 = 35%, Year 3 = 30%. The gross profit margin is declining despite revenue growth, indicating cost pressures.",
      dropdownOptions: [
        { id: "opt-gpm-improving", order: 1, text: "Improving", isCorrect: false },
        { id: "opt-gpm-stable", order: 2, text: "Stable", isCorrect: false },
        { id: "opt-gpm-declining", order: 3, text: "Declining", isCorrect: true },
      ],
    },
    {
      id: "req-ar-concern",
      order: 2,
      type: "dropdown",
      label: "Accounts Receivable Assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-ar-concern",
      },
      explanation: "A/R grew 87% (Y1 to Y3) while revenue grew only 25%. Days Sales Outstanding is increasing significantly, indicating collection issues.",
      dropdownOptions: [
        { id: "opt-ar-ok", order: 1, text: "Growing proportionally with sales", isCorrect: false },
        { id: "opt-ar-concern", order: 2, text: "Growing faster than sales - collection concern", isCorrect: true },
        { id: "opt-ar-improving", order: 3, text: "Improving collection efficiency", isCorrect: false },
      ],
    },
    {
      id: "req-leverage",
      order: 3,
      type: "dropdown",
      label: "Leverage/Debt Assessment",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-lev-increasing",
      },
      explanation: "Total debt increased from $4.5M to $9.5M (111% increase) while assets grew only 43%. Debt-to-assets ratio is increasing significantly.",
      dropdownOptions: [
        { id: "opt-lev-stable", order: 1, text: "Stable leverage", isCorrect: false },
        { id: "opt-lev-decreasing", order: 2, text: "Decreasing leverage", isCorrect: false },
        { id: "opt-lev-increasing", order: 3, text: "Significantly increasing leverage", isCorrect: true },
      ],
    },
    {
      id: "req-primary-concern",
      order: 4,
      type: "dropdown",
      label: "Primary Financial Concern",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-concern-profit",
      },
      explanation: "Despite 25% revenue growth, net income declined 41% ($1.6M to $950K). Profitability erosion is the most significant concern.",
      dropdownOptions: [
        { id: "opt-concern-revenue", order: 1, text: "Revenue growth is too slow", isCorrect: false },
        { id: "opt-concern-profit", order: 2, text: "Profitability declining despite revenue growth", isCorrect: true },
        { id: "opt-concern-assets", order: 3, text: "Asset growth is unsustainable", isCorrect: false },
      ],
    },
    {
      id: "req-inventory-days",
      order: 5,
      type: "numeric",
      label: "Year 3 Days Inventory Outstanding (using COGS)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 133,
        tolerance: 2,
      },
      explanation: "DIO = (Inventory / COGS) × 365 = ($3,200 / $8,750) × 365 = 133 days. This is quite high, indicating slow inventory turnover.",
    },
  ],
};

// BAR TBS 9: Budgeting (Medium - Numeric Entry)
export const barBudgetingTBS: TBSQuestion = {
  id: "tbs-bar-009",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Managerial Accounting",
  subtopic: "Budgeting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Flexible Budget Preparation",
  scenarioText: `Prepare a flexible budget analysis for Sterling Manufacturing comparing actual results to the flexible budget at the actual activity level.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-budget-data",
      order: 1,
      title: "Budget Information",
      type: "table",
      content: {
        type: "table",
        title: "Sterling Manufacturing - January Budget vs. Actual",
        headers: ["Item", "Static Budget (10,000 units)", "Actual (12,000 units)"],
        rows: [
          { cells: ["Sales Revenue", "$500,000", "$570,000"] },
          { cells: ["Direct Materials", "$150,000", "$174,000"] },
          { cells: ["Direct Labor", "$100,000", "$126,000"] },
          { cells: ["Variable Overhead", "$50,000", "$58,000"] },
          { cells: ["Fixed Overhead", "$80,000", "$82,000"] },
          { cells: ["Selling & Admin (Fixed)", "$40,000", "$41,500"] },
        ],
      },
    },
    {
      id: "exhibit-standards",
      order: 2,
      title: "Standard Costs",
      type: "table",
      content: {
        type: "table",
        title: "Per Unit Standards",
        headers: ["Cost Element", "Standard per Unit"],
        rows: [
          { cells: ["Selling Price", "$50.00"] },
          { cells: ["Direct Materials", "$15.00"] },
          { cells: ["Direct Labor", "$10.00"] },
          { cells: ["Variable Overhead", "$5.00"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-flex-revenue",
      order: 1,
      type: "numeric",
      label: "Flexible Budget Revenue (at 12,000 units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 600000,
        tolerance: 0,
      },
      explanation: "Flexible Budget Revenue = 12,000 units × $50 = $600,000",
    },
    {
      id: "req-flex-dm",
      order: 2,
      type: "numeric",
      label: "Flexible Budget Direct Materials",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 180000,
        tolerance: 0,
      },
      explanation: "Flexible Budget DM = 12,000 units × $15 = $180,000",
    },
    {
      id: "req-flex-dl",
      order: 3,
      type: "numeric",
      label: "Flexible Budget Direct Labor",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 120000,
        tolerance: 0,
      },
      explanation: "Flexible Budget DL = 12,000 units × $10 = $120,000",
    },
    {
      id: "req-sales-variance",
      order: 4,
      type: "numeric",
      label: "Sales Price Variance (Actual - Flexible Budget Revenue)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -30000,
        tolerance: 0,
      },
      explanation: "Sales Price Variance = $570,000 - $600,000 = -$30,000 Unfavorable. Actual price was $47.50, not $50.",
    },
    {
      id: "req-dl-variance",
      order: 5,
      type: "numeric",
      label: "Direct Labor Flexible Budget Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -6000,
        tolerance: 0,
      },
      explanation: "DL Variance = Actual ($126,000) - Flexible ($120,000) = -$6,000 Unfavorable",
    },
    {
      id: "req-fixed-variance",
      order: 6,
      type: "numeric",
      label: "Total Fixed Cost Variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -3500,
        tolerance: 0,
      },
      explanation: "Fixed Variance = Actual ($82,000 + $41,500) - Budget ($80,000 + $40,000) = $123,500 - $120,000 = -$3,500 Unfavorable",
    },
  ],
};

// ISC TBS 8: Data Analytics Calculations (Medium - Numeric Entry)
export const iscDataAnalyticsCalcTBS: TBSQuestion = {
  id: "tbs-isc-008",
  section: "ISC",
  tbsType: "numeric_entry",
  topic: "Data Management",
  subtopic: "Data Analytics",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "ISC-I",
  title: "Benford's Law Analysis",
  scenarioText: `You are using Benford's Law analysis to test for potential fraud in accounts payable invoices. Calculate the expected vs. actual first digit distribution and identify anomalies.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-benfords",
      order: 1,
      title: "Benford's Law Expected Distribution",
      type: "table",
      content: {
        type: "table",
        title: "Expected First Digit Frequencies",
        headers: ["First Digit", "Expected %"],
        rows: [
          { cells: ["1", "30.1%"] },
          { cells: ["2", "17.6%"] },
          { cells: ["3", "12.5%"] },
          { cells: ["4", "9.7%"] },
          { cells: ["5", "7.9%"] },
          { cells: ["6", "6.7%"] },
          { cells: ["7", "5.8%"] },
          { cells: ["8", "5.1%"] },
          { cells: ["9", "4.6%"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Actual Invoice Distribution",
      type: "table",
      content: {
        type: "table",
        title: "Accounts Payable - First Digit Analysis (5,000 invoices)",
        headers: ["First Digit", "Count", "Actual %"],
        rows: [
          { cells: ["1", "1,420", "28.4%"] },
          { cells: ["2", "890", "17.8%"] },
          { cells: ["3", "640", "12.8%"] },
          { cells: ["4", "510", "10.2%"] },
          { cells: ["5", "430", "8.6%"] },
          { cells: ["6", "350", "7.0%"] },
          { cells: ["7", "290", "5.8%"] },
          { cells: ["8", "250", "5.0%"] },
          { cells: ["9", "220", "4.4%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-expected-1",
      order: 1,
      type: "numeric",
      label: "Expected Count for Digit 1 (out of 5,000)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1505,
        tolerance: 5,
      },
      explanation: "Expected = 5,000 × 30.1% = 1,505 invoices should start with 1",
    },
    {
      id: "req-variance-1",
      order: 2,
      type: "numeric",
      label: "Variance for Digit 1 (Actual - Expected)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -85,
        tolerance: 5,
      },
      explanation: "Variance = 1,420 - 1,505 = -85. Digit 1 is slightly underrepresented.",
    },
    {
      id: "req-expected-5",
      order: 3,
      type: "numeric",
      label: "Expected Count for Digit 5",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 395,
        tolerance: 5,
      },
      explanation: "Expected = 5,000 × 7.9% = 395 invoices should start with 5",
    },
    {
      id: "req-variance-5",
      order: 4,
      type: "numeric",
      label: "Variance for Digit 5 (Actual - Expected)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35,
        tolerance: 5,
      },
      explanation: "Variance = 430 - 395 = +35. Digit 5 is overrepresented.",
    },
    {
      id: "req-investigation",
      order: 5,
      type: "dropdown",
      label: "Which digit warrants further investigation?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-digit-5",
      },
      explanation: "Digit 5 shows the largest percentage deviation (+0.7% or +8.9% relative). Overrepresentation of mid-range digits can indicate round-number fraud.",
      dropdownOptions: [
        { id: "opt-digit-1", order: 1, text: "Digit 1 - underrepresented", isCorrect: false },
        { id: "opt-digit-5", order: 2, text: "Digit 5 - overrepresented", isCorrect: true },
        { id: "opt-digit-9", order: 3, text: "Digit 9 - underrepresented", isCorrect: false },
        { id: "opt-none", order: 4, text: "None - all within normal range", isCorrect: false },
      ],
    },
  ],
};

// Export all exam simulation TBS questions
// These are kept separate from practice TBS so students see fresh questions in exams
export const examTBSQuestions: TBSQuestion[] = [
  // FAR TBS (11 total)
  sampleJournalEntryTBS,
  sampleNumericEntryTBS,
  sampleResearchTBS,
  farGovernmentFundsTBS,
  farDeferredTaxesTBS,
  farImpairmentTBS,
  farConsolidationTBS,
  farBondAmortizationTBS,
  farStockCompensationTBS,
  farPensionTBS,
  farCashFlowTBS,
  // AUD TBS (11 total)
  sampleDocumentReviewTBS,
  audSamplingTBS,
  audGoingConcernTBS,
  audIndependenceTBS,
  audJournalEntryTBS,
  audReviewEngagementTBS,
  audInternalControlTBS,
  audSubsequentEventsTBS,
  audAuditRiskTBS,
  audResearchTBS,
  audMaterialityTBS,
  // REG TBS (10 total)
  regContractsTBS,
  regAGICalculationTBS,
  regCapitalGainsTBS,
  regCorporateDistributionsTBS,
  regPartnershipBasisTBS,
  regCircular230TBS,
  regEstateTaxTBS,
  regSCorpTBS,
  regDepreciationTBS,
  regTaxFormTBS,
  // TCP TBS (9 total)
  tcpEntitySelectionTBS,
  tcpGiftTaxTBS,
  tcpRetirementTBS,
  tcpQBIDeductionTBS,
  tcpLikeKindTBS,
  tcpEstimatedTaxTBS,
  tcpAMTTBS,
  tcpInstallmentSalesTBS,
  tcpMultiStateTBS,
  // BAR TBS (9 total)
  barRatioAnalysisTBS,
  barCVPAnalysisTBS,
  barVarianceAnalysisTBS,
  barCapitalBudgetingTBS,
  barProcessCostingTBS,
  barStandardCostingTBS,
  barTransferPricingTBS,
  barFinancialAnalysisTBS,
  barBudgetingTBS,
  // ISC TBS (8 total)
  iscITGCTBS,
  iscSOCReportsTBS,
  iscSecurityTBS,
  iscDataAnalyticsTBS,
  iscDatabaseControlsTBS,
  iscBusinessContinuityTBS,
  iscERPControlsTBS,
  iscDataAnalyticsCalcTBS,
];

// Helper to get a TBS by ID from exam bank
export function getExamTBSById(id: string): TBSQuestion | undefined {
  return examTBSQuestions.find((tbs) => tbs.id === id);
}

// Helper to get exam TBS questions by section
export function getExamTBSBySection(section: string): TBSQuestion[] {
  return examTBSQuestions.filter((tbs) => tbs.section === section);
}

// Legacy aliases for backward compatibility with sample-tbs imports
export const sampleTBSQuestions = examTBSQuestions;
export const getSampleTBSById = getExamTBSById;
export const getSampleTBSBySection = getExamTBSBySection;
