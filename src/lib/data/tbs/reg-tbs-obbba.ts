// REG Task-Based Simulations - OBBBA Version
// For post-July 2026 CPA Exam testing
// Contains updated figures reflecting OBBBA (One Big Beautiful Bill Act) tax law changes
//
// Key OBBBA Changes Reflected:
// - SALT cap: $10,000 → $40,000
// - Standard deduction: $15,750 single / $31,500 MFJ
// - Estate/gift exemption: ~$14,000,000 (made permanent)
// - Child tax credit: $2,000 → $2,200
// - New above-the-line deductions: tips ($25K), overtime ($12.5K), senior standard deduction add-on ($6K), auto loan interest ($10K)
// - AMT exemption: Updated figures
// - Bonus depreciation: Restored to 100%

import { TBSQuestion } from "./types";

// =============================================================================
// INDIVIDUAL TAXATION - OBBBA Updates
// =============================================================================

// Itemized Deductions TBS - OBBBA Version
// Key changes: SALT cap increased to $40,000, standard deduction updated
export const regItemizedDeductionsTBS_OBBBA: TBSQuestion = {
  id: "tbs-reg-obbba-013",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Individual Taxation",
  subtopic: "Itemized Deductions",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-IV",
  title: "Itemized Deductions Analysis (OBBBA)",
  scenarioText: `Robert and Linda Chen have AGI of $185,000 for the current tax year. Determine their allowable itemized deductions and compare to the standard deduction under OBBBA rules.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-potential-deductions",
      order: 1,
      title: "Potential Itemized Deductions",
      type: "table",
      content: {
        type: "table",
        title: "Chen Family Expenses",
        headers: ["Category", "Amount"],
        rows: [
          { cells: ["Medical expenses - unreimbursed", "$16,500"] },
          { cells: ["State income taxes paid", "$28,000"] },
          { cells: ["Real estate taxes - residence", "$14,000"] },
          { cells: ["Mortgage interest - acquisition debt ($400,000 loan)", "$18,000"] },
          { cells: ["Charitable contributions - cash to public charity", "$8,000"] },
          { cells: ["Charitable contributions - clothing to Goodwill (FMV)", "$1,200"] },
          { cells: ["Investment interest expense", "$2,500"] },
          { cells: ["Net investment income", "$4,800"] },
          { cells: ["Casualty loss - federally declared disaster", "$25,000"] },
          { cells: ["Insurance reimbursement for casualty", "$15,000"] },
          { cells: ["Job hunting expenses", "$800"] },
          { cells: ["Tax preparation fees", "$450"] },
        ],
      },
    },
    {
      id: "exhibit-std-deduction",
      order: 2,
      title: "Standard Deduction",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Standard Deduction Amounts",
        paragraphs: [
          "Married Filing Jointly: $31,500",
          "Single: $15,750",
          "Both taxpayers are under age 65 and not blind",
          "Note: Seniors (65+) may qualify for additional $6,000 standard deduction under OBBBA",
        ],
      },
    },
    {
      id: "exhibit-salt-rules",
      order: 3,
      title: "SALT Deduction Rules",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA SALT Cap",
        paragraphs: [
          "State and Local Tax (SALT) deduction cap: $40,000",
          "Applies to state/local income taxes plus property taxes combined",
          "Previous TCJA cap of $10,000 has been increased under OBBBA",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-medical-deduction",
      order: 1,
      type: "numeric",
      label: "Allowable medical expense deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2625,
        tolerance: 0,
      },
      explanation: "Per IRC §213, medical expenses exceed 7.5% AGI floor: $16,500 − ($185,000 × 7.5%) = $2,625. This threshold is unchanged under OBBBA.",
    },
    {
      id: "req-salt-deduction",
      order: 2,
      type: "numeric",
      label: "State and local tax deduction (SALT)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "Per OBBBA §164(b)(6) modification, SALT deduction ($28,000 state income + $14,000 property = $42,000) is capped at $40,000 under the new OBBBA rules (increased from prior $10,000 cap).",
    },
    {
      id: "req-mortgage-interest",
      order: 3,
      type: "numeric",
      label: "Mortgage interest deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18000,
        tolerance: 0,
      },
      explanation: "Per IRC §163(h)(3), full $18,000 deductible − loan under $750,000 acquisition debt limit. Unchanged under OBBBA.",
    },
    {
      id: "req-charity-deduction",
      order: 4,
      type: "numeric",
      label: "Charitable contribution deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9200,
        tolerance: 0,
      },
      explanation: "Per IRC §170, charitable contributions: cash $8,000 + clothing FMV $1,200 = $9,200 (under 60% AGI limit).",
    },
    {
      id: "req-casualty-deduction",
      order: 5,
      type: "numeric",
      label: "Casualty loss deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Per IRC §165(h), casualty loss (federally declared disaster): $10,000 net ($25K - $15K reimb) − $100 − (10% × $185,000) = negative, so $0.",
    },
    {
      id: "req-total-itemized",
      order: 6,
      type: "numeric",
      label: "Total allowable itemized deductions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 72325,
        tolerance: 100,
      },
      explanation: "Per OBBBA rules: $2,625 medical + $40,000 SALT (capped) + $18,000 mortgage + $9,200 charity + $2,500 investment interest = $72,325. Note the significantly higher total due to increased SALT cap.",
    },
    {
      id: "req-should-itemize",
      order: 7,
      type: "dropdown",
      label: "Should the Chens itemize or take standard deduction?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-itemize",
      },
      explanation: "Per IRC §63, compare itemized ($72,325) to OBBBA standard deduction ($31,500 MFJ). Itemize for $40,825 greater benefit.",
      dropdownOptions: [
        { id: "opt-itemize", order: 1, text: "Itemize - provides greater benefit", isCorrect: true },
        { id: "opt-standard", order: 2, text: "Standard deduction - provides greater benefit", isCorrect: false },
        { id: "opt-equal", order: 3, text: "Approximately equal", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// AMT CALCULATION - OBBBA Updates
// =============================================================================

export const regAMTCalculationTBS_OBBBA: TBSQuestion = {
  id: "tbs-reg-obbba-amt",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Individual Taxation",
  subtopic: "Alternative Minimum Tax",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "REG-IV",
  title: "AMT Calculation (OBBBA)",
  scenarioText: `Calculate the Alternative Minimum Tax (AMT) for a married couple filing jointly using OBBBA provisions. Note that the increased SALT cap affects the AMT calculation differently than under prior law.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-taxpayer-info",
      order: 1,
      title: "Taxpayer Information",
      type: "table",
      content: {
        type: "table",
        title: "Johnson Family - Current Year",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Regular taxable income", "$380,000"] },
          { cells: ["State and local taxes deducted (actual paid)", "$55,000"] },
          { cells: ["SALT deduction claimed (OBBBA cap)", "$40,000"] },
          { cells: ["Incentive stock option (ISO) exercise - bargain element", "$85,000"] },
          { cells: ["Private activity bond interest", "$12,000"] },
          { cells: ["Accelerated depreciation adjustment", "$15,000"] },
        ],
      },
    },
    {
      id: "exhibit-amt-exemptions",
      order: 2,
      title: "AMT Exemption Information",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA AMT Rules",
        paragraphs: [
          "MFJ Exemption: $140,000 (indexed for inflation)",
          "Exemption phaseout begins at: $1,250,000",
          "Phaseout rate: 25 cents per dollar over threshold",
          "AMT rates: 26% on first $220,700; 28% thereafter",
          "IMPORTANT: SALT is STILL fully added back for AMT regardless of the higher OBBBA cap",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-salt-addback",
      order: 1,
      type: "numeric",
      label: "SALT add-back for AMT",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "Per IRC §56, SALT remains a preference item for AMT even under OBBBA. The $40,000 SALT deduction taken for regular tax must be added back entirely for AMT purposes.",
    },
    {
      id: "req-amti-before-exemption",
      order: 2,
      type: "numeric",
      label: "AMTI before exemption",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 532000,
        tolerance: 0,
      },
      explanation: "Per IRC §55-56, AMTI = $380,000 + $40,000 SALT + $85,000 ISO bargain (§56(b)(3)) + $12,000 PAB interest + $15,000 depreciation = $532,000.",
    },
    {
      id: "req-amt-exemption",
      order: 3,
      type: "numeric",
      label: "AMT exemption amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 140000,
        tolerance: 0,
      },
      explanation: "Per OBBBA updates to IRC §55(d), full exemption of $140,000 available − AMTI of $532,000 is below $1,250,000 phaseout threshold.",
    },
    {
      id: "req-amti-after-exemption",
      order: 4,
      type: "numeric",
      label: "AMT taxable income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 392000,
        tolerance: 0,
      },
      explanation: "Per IRC §55, AMT taxable income = AMTI − exemption: $532,000 − $140,000 = $392,000.",
    },
    {
      id: "req-tentative-amt",
      order: 5,
      type: "numeric",
      label: "Tentative minimum tax",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 105226,
        tolerance: 100,
      },
      explanation: "Per IRC §55(b), TMT = (26% × $220,700) + (28% × ($392,000 − $220,700)) = $57,382 + $47,844 = $105,226.",
    },
    {
      id: "req-amt-planning",
      order: 6,
      type: "dropdown",
      label: "Primary driver of AMT liability in this case?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-iso",
      },
      explanation: "While the SALT add-back is $40,000, the ISO bargain element of $85,000 is the largest single adjustment driving AMT exposure.",
      dropdownOptions: [
        { id: "opt-salt", order: 1, text: "SALT deduction add-back", isCorrect: false },
        { id: "opt-iso", order: 2, text: "ISO bargain element", isCorrect: true },
        { id: "opt-pab", order: 3, text: "Private activity bond interest", isCorrect: false },
        { id: "opt-depreciation", order: 4, text: "Depreciation adjustment", isCorrect: false },
      ],
    },
    {
      id: "req-obbba-impact",
      order: 7,
      type: "dropdown",
      label: "How does OBBBA affect AMT compared to prior law?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-same-addback",
      },
      explanation: "Under OBBBA, SALT is still fully disallowed for AMT even though the regular tax cap increased to $40,000. This creates potentially larger AMT exposure for high-SALT taxpayers.",
      dropdownOptions: [
        { id: "opt-same-addback", order: 1, text: "SALT still fully added back - potentially higher AMT exposure", isCorrect: true },
        { id: "opt-reduced-addback", order: 2, text: "SALT add-back reduced to match new cap", isCorrect: false },
        { id: "opt-amt-eliminated", order: 3, text: "AMT eliminated under OBBBA", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// ESTATE TAX - OBBBA Updates (Permanent Exemption)
// =============================================================================

export const regEstateTaxTBS_OBBBA: TBSQuestion = {
  id: "tbs-reg-obbba-estate",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Estate Taxation",
  subtopic: "Estate Tax Calculation",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "REG-V",
  title: "Estate Tax Calculation (OBBBA)",
  scenarioText: `Calculate the federal estate tax liability for a decedent's estate using OBBBA provisions. The unified credit exemption is now PERMANENT at approximately $14,000,000 (indexed for inflation).`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-estate-assets",
      order: 1,
      title: "Estate Assets",
      type: "table",
      content: {
        type: "table",
        title: "Margaret Wilson Estate",
        headers: ["Asset", "Fair Market Value"],
        rows: [
          { cells: ["Primary residence", "$2,500,000"] },
          { cells: ["Vacation property", "$1,800,000"] },
          { cells: ["Investment portfolio", "$8,500,000"] },
          { cells: ["Retirement accounts", "$3,200,000"] },
          { cells: ["Life insurance (estate owned)", "$2,000,000"] },
          { cells: ["Business interest (FLP)", "$4,500,000"] },
          { cells: ["Personal property", "$500,000"] },
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
          { cells: ["Funeral expenses", "$35,000"] },
          { cells: ["Administrative expenses", "$180,000"] },
          { cells: ["Debts of decedent", "$125,000"] },
          { cells: ["Charitable bequest to university", "$500,000"] },
          { cells: ["Marital deduction (to surviving spouse)", "$0"] },
        ],
      },
    },
    {
      id: "exhibit-estate-rules",
      order: 3,
      title: "Estate Tax Information",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Estate Tax Rules",
        paragraphs: [
          "Unified credit exemption: $14,000,000 (PERMANENT under OBBBA)",
          "Maximum estate tax rate: 40%",
          "Prior taxable gifts: $1,500,000 (uses part of unified credit)",
          "Portability: Decedent's unused exemption may transfer to surviving spouse",
          "IMPORTANT: Unlike TCJA, the exemption does NOT sunset - it is permanent",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-estate",
      order: 1,
      type: "numeric",
      label: "Gross estate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 23000000,
        tolerance: 0,
      },
      explanation: "Per IRC §2031-2044, gross estate includes all assets: $2.5M + $1.8M + $8.5M + $3.2M + $2M + $4.5M + $0.5M = $23,000,000.",
    },
    {
      id: "req-total-deductions",
      order: 2,
      type: "numeric",
      label: "Total estate deductions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 840000,
        tolerance: 0,
      },
      explanation: "Per IRC §2053-2055, deductions: $35,000 + $180,000 + $125,000 + $500,000 = $840,000.",
    },
    {
      id: "req-taxable-estate",
      order: 3,
      type: "numeric",
      label: "Taxable estate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 22160000,
        tolerance: 0,
      },
      explanation: "Per IRC §2051, taxable estate = Gross estate − Deductions: $23,000,000 − $840,000 = $22,160,000.",
    },
    {
      id: "req-adjusted-taxable-estate",
      order: 4,
      type: "numeric",
      label: "Adjusted taxable estate (with prior gifts)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 23660000,
        tolerance: 0,
      },
      explanation: "Per IRC §2001(b), adjusted taxable estate includes prior taxable gifts: $22,160,000 + $1,500,000 = $23,660,000.",
    },
    {
      id: "req-available-exemption",
      order: 5,
      type: "numeric",
      label: "Available exemption (after prior gift usage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500000,
        tolerance: 0,
      },
      explanation: "Per OBBBA permanent exemption rules: $14,000,000 total exemption − $1,500,000 used on prior gifts = $12,500,000 remaining.",
    },
    {
      id: "req-taxable-amount",
      order: 6,
      type: "numeric",
      label: "Amount subject to estate tax",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 11160000,
        tolerance: 0,
      },
      explanation: "Per IRC §2001, amount over exemption: $23,660,000 − $12,500,000 remaining exemption = $11,160,000 subject to tax.",
    },
    {
      id: "req-estate-tax",
      order: 7,
      type: "numeric",
      label: "Federal estate tax due",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4464000,
        tolerance: 10000,
      },
      explanation: "Per IRC §2001(c), estate tax = 40% × $11,160,000 = $4,464,000. Note: Under TCJA (pre-OBBBA), exemption would have been ~$7M after 2025 sunset, resulting in much higher tax.",
    },
  ],
};

// =============================================================================
// GIFT TAX - OBBBA Updates (Permanent Exemption)
// =============================================================================

export const regGiftTaxTBS_OBBBA: TBSQuestion = {
  id: "tbs-reg-obbba-gift",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Gift Taxation",
  subtopic: "Gift Tax Calculation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-V",
  title: "Gift Tax Planning (OBBBA)",
  scenarioText: `Calculate gift tax consequences and planning opportunities under OBBBA provisions with the permanent unified credit exemption.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-gifts",
      order: 1,
      title: "Current Year Gifts",
      type: "table",
      content: {
        type: "table",
        title: "Harrison Family Gifts",
        headers: ["Recipient", "Gift Type", "Amount"],
        rows: [
          { cells: ["Son", "Cash", "$500,000"] },
          { cells: ["Daughter", "Stock (FMV)", "$750,000"] },
          { cells: ["Grandson", "529 contribution (5-year election)", "$95,000"] },
          { cells: ["Granddaughter", "Direct tuition payment", "$60,000"] },
          { cells: ["Charity", "Cash to public charity", "$100,000"] },
          { cells: ["Political campaign", "Campaign contribution", "$10,000"] },
        ],
      },
    },
    {
      id: "exhibit-gift-rules",
      order: 2,
      title: "Gift Tax Information",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Gift Tax Rules",
        paragraphs: [
          "Annual exclusion: $19,000 per donee (indexed)",
          "Unified credit equivalent (lifetime exemption): $14,000,000 (PERMANENT)",
          "Gift splitting available with spouse consent",
          "Direct payment exclusions: Tuition and medical expenses",
          "529 5-year election: Spread large gift over 5 years for annual exclusion",
          "Prior taxable gifts: $2,000,000",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-son-taxable",
      order: 1,
      type: "numeric",
      label: "Taxable gift to son",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 481000,
        tolerance: 0,
      },
      explanation: "Per IRC §2503, taxable gift = $500,000 − $19,000 annual exclusion = $481,000.",
    },
    {
      id: "req-daughter-taxable",
      order: 2,
      type: "numeric",
      label: "Taxable gift to daughter",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 731000,
        tolerance: 0,
      },
      explanation: "Per IRC §2503, taxable gift = $750,000 − $19,000 annual exclusion = $731,000.",
    },
    {
      id: "req-grandson-taxable",
      order: 3,
      type: "numeric",
      label: "Taxable gift for 529 contribution (current year)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Per IRC §529(c)(2)(B), 5-year election spreads $95,000 over 5 years = $19,000/year, exactly matching annual exclusion. Zero taxable gift this year.",
    },
    {
      id: "req-tuition-taxable",
      order: 4,
      type: "numeric",
      label: "Taxable gift for tuition payment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Per IRC §2503(e), direct tuition payments are excluded from gift tax regardless of amount. The $60,000 is fully excluded.",
    },
    {
      id: "req-total-taxable",
      order: 5,
      type: "numeric",
      label: "Total taxable gifts",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1212000,
        tolerance: 0,
      },
      explanation: "Per IRC §2503, total taxable = $481,000 + $731,000 = $1,212,000. Charity and political contributions not subject to gift tax.",
    },
    {
      id: "req-remaining-exemption",
      order: 6,
      type: "numeric",
      label: "Remaining lifetime exemption",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10788000,
        tolerance: 0,
      },
      explanation: "Per OBBBA permanent exemption: $14,000,000 − $2,000,000 prior − $1,212,000 current = $10,788,000 remaining. The permanent exemption provides long-term planning certainty.",
    },
  ],
};

// =============================================================================
// TAX CREDITS - OBBBA Updates (Child Tax Credit)
// =============================================================================

export const regTaxCreditsTBS_OBBBA: TBSQuestion = {
  id: "tbs-reg-obbba-credits",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Individual Taxation",
  subtopic: "Tax Credits",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-IV",
  title: "Education and Child Tax Credits (OBBBA)",
  scenarioText: `Calculate the allowable education and child tax credits for a family with qualifying dependents under OBBBA provisions.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-family-info",
      order: 1,
      title: "Family Information",
      type: "table",
      content: {
        type: "table",
        title: "Martinez Family",
        headers: ["Item", "Details"],
        rows: [
          { cells: ["Filing status", "Married Filing Jointly"] },
          { cells: ["AGI", "$185,000"] },
          { cells: ["Child 1 - Sofia (age 8)", "Qualifying child"] },
          { cells: ["Child 2 - Miguel (age 12)", "Qualifying child"] },
          { cells: ["Child 3 - Isabella (age 19, college freshman)", "Full-time student, dependent"] },
          { cells: ["Isabella's tuition paid", "$8,500"] },
          { cells: ["Isabella's books/supplies", "$1,200"] },
        ],
      },
    },
    {
      id: "exhibit-credit-rules",
      order: 2,
      title: "Tax Credit Information",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Tax Credit Rules",
        paragraphs: [
          "Child Tax Credit: $2,200 per qualifying child under 17 (increased from $2,000)",
          "Child Tax Credit phase-out: Begins at $400,000 MFJ; $200,000 other",
          "American Opportunity Credit: Max $2,500 per student (100% of first $2,000 + 25% of next $2,000)",
          "AOC phase-out: $160,000-$180,000 MFJ",
          "Lifetime Learning Credit: 20% of up to $10,000 expenses",
          "LLC phase-out: $160,000-$180,000 MFJ",
          "Note: Credits may be limited by tax liability",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-ctc-qualifying",
      order: 1,
      type: "numeric",
      label: "Number of children qualifying for Child Tax Credit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2,
        tolerance: 0,
      },
      explanation: "Per IRC §24, only children under age 17 qualify for the Child Tax Credit. Sofia (8) and Miguel (12) qualify; Isabella (19) does not.",
    },
    {
      id: "req-ctc-amount",
      order: 2,
      type: "numeric",
      label: "Child Tax Credit amount",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4400,
        tolerance: 0,
      },
      explanation: "Per OBBBA updates to IRC §24, Child Tax Credit = 2 children × $2,200 = $4,400. The OBBBA increased the credit from $2,000 to $2,200 per child.",
    },
    {
      id: "req-ctc-phaseout",
      order: 3,
      type: "dropdown",
      label: "Is the Child Tax Credit subject to phase-out?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-phaseout",
      },
      explanation: "Per IRC §24(b), phase-out begins at $400,000 MFJ. AGI of $185,000 is well below threshold.",
      dropdownOptions: [
        { id: "opt-no-phaseout", order: 1, text: "No - AGI below phase-out threshold", isCorrect: true },
        { id: "opt-partial", order: 2, text: "Yes - partial phase-out applies", isCorrect: false },
        { id: "opt-full", order: 3, text: "Yes - fully phased out", isCorrect: false },
      ],
    },
    {
      id: "req-aoc-qualifying",
      order: 4,
      type: "dropdown",
      label: "Does Isabella qualify for American Opportunity Credit?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-first-four",
      },
      explanation: "Per IRC §25A, AOC is available for first 4 years of post-secondary education. Isabella is a college freshman and qualifies.",
      dropdownOptions: [
        { id: "opt-yes-first-four", order: 1, text: "Yes - in first 4 years of college", isCorrect: true },
        { id: "opt-no-age", order: 2, text: "No - too old to qualify", isCorrect: false },
        { id: "opt-no-income", order: 3, text: "No - family income too high", isCorrect: false },
      ],
    },
    {
      id: "req-aoc-amount",
      order: 5,
      type: "numeric",
      label: "American Opportunity Credit (before phase-out)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2500,
        tolerance: 0,
      },
      explanation: "Per IRC §25A(i), AOC = 100% × $2,000 + 25% × $2,000 = $2,500 maximum. Qualified expenses of $9,700 exceed the cap.",
    },
    {
      id: "req-aoc-phaseout",
      order: 6,
      type: "numeric",
      label: "AOC after phase-out",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1875,
        tolerance: 50,
      },
      explanation: "Per IRC §25A, AGI of $185,000 is in phase-out range ($160K-$180K). Phase-out = ($185K - $160K) / $20K = 25% reduction. $2,500 × 75% = $1,875.",
    },
    {
      id: "req-total-credits",
      order: 7,
      type: "numeric",
      label: "Total tax credits (CTC + AOC after phase-out)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6275,
        tolerance: 50,
      },
      explanation: "Per IRC §24 and §25A as modified by OBBBA, total credits = $4,400 CTC + $1,875 AOC = $6,275.",
    },
  ],
};

// =============================================================================
// NEW OBBBA DEDUCTIONS - Tips, Overtime, Senior, Auto Loan Interest
// =============================================================================

export const regOBBBANewDeductionsTBS: TBSQuestion = {
  id: "tbs-reg-obbba-new-deductions",
  section: "REG",
  tbsType: "numeric_entry",
  topic: "Individual Taxation",
  subtopic: "OBBBA Above-the-Line Deductions",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "REG-IV",
  title: "New OBBBA Above-the-Line Deductions",
  scenarioText: `Calculate the new above-the-line deductions introduced by OBBBA, including deductions for tip income, overtime pay, senior citizens, and auto loan interest.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-taxpayer-info",
      order: 1,
      title: "Taxpayer Information",
      type: "table",
      content: {
        type: "table",
        title: "Various Taxpayer Scenarios",
        headers: ["Taxpayer", "Details"],
        rows: [
          { cells: ["Taxpayer A - Restaurant Server", "Tips reported: $32,000; Wages: $15,000; Age 35"] },
          { cells: ["Taxpayer B - Factory Worker", "Overtime pay: $18,000; Regular wages: $52,000; Age 45"] },
          { cells: ["Taxpayer C - Retired Teacher", "Pension: $48,000; Social Security: $24,000; Age 68"] },
          { cells: ["Taxpayer D - Commuter", "Auto loan interest paid: $3,200; Car used 80% for work commute; Age 40"] },
        ],
      },
    },
    {
      id: "exhibit-obbba-limits",
      order: 2,
      title: "OBBBA Deduction Limits",
      type: "text",
      content: {
        type: "text",
        title: "New Above-the-Line Deduction Caps",
        paragraphs: [
          "Tip Income Deduction: Up to $25,000 of reported tip income",
          "Overtime Pay Deduction: Up to $12,500 of overtime wages",
          "Senior Standard Deduction Add-on: $6,000 for taxpayers age 65+",
          "Auto Loan Interest Deduction: Up to $10,000 for vehicles made in USA",
          "Note: These are above-the-line deductions (reduce AGI)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-tip-deduction",
      order: 1,
      type: "numeric",
      label: "Taxpayer A - Tip income deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Per OBBBA new IRC provision, tip income deduction is capped at $25,000. Taxpayer A reported $32,000 in tips, so deduction is limited to $25,000.",
    },
    {
      id: "req-overtime-deduction",
      order: 2,
      type: "numeric",
      label: "Taxpayer B - Overtime pay deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500,
        tolerance: 0,
      },
      explanation: "Per OBBBA new IRC provision, overtime deduction is capped at $12,500. Taxpayer B earned $18,000 overtime, so deduction is limited to $12,500.",
    },
    {
      id: "req-senior-deduction",
      order: 3,
      type: "numeric",
      label: "Taxpayer C - Senior standard deduction add-on",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6000,
        tolerance: 0,
      },
      explanation: "Per OBBBA new IRC provision, taxpayers age 65+ receive an additional $6,000 standard deduction add-on. Taxpayer C (age 68) qualifies for full $6,000.",
    },
    {
      id: "req-auto-interest-deduction",
      order: 4,
      type: "numeric",
      label: "Taxpayer D - Auto loan interest deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3200,
        tolerance: 0,
      },
      explanation: "Per OBBBA new IRC provision, auto loan interest for USA-made vehicles is deductible up to $10,000. Taxpayer D paid $3,200, which is fully deductible (business use percentage does not apply to this above-the-line deduction).",
    },
    {
      id: "req-combined-impact-a",
      order: 5,
      type: "numeric",
      label: "Taxpayer A - AGI reduction from tip deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Per OBBBA, the tip deduction reduces AGI by $25,000. This is significant for service workers who previously had no such deduction.",
    },
    {
      id: "req-total-all-deductions",
      order: 6,
      type: "numeric",
      label: "Total OBBBA new deductions (all four taxpayers combined)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46700,
        tolerance: 0,
      },
      explanation: "Per OBBBA, total new deductions = $25,000 tips + $12,500 overtime + $6,000 senior + $3,200 auto interest = $46,700.",
    },
  ],
};

// =============================================================================
// EXPORT ALL OBBBA TBS
// =============================================================================

export const regTBSQuestionsOBBBA: TBSQuestion[] = [
  regItemizedDeductionsTBS_OBBBA,
  regAMTCalculationTBS_OBBBA,
  regEstateTaxTBS_OBBBA,
  regGiftTaxTBS_OBBBA,
  regTaxCreditsTBS_OBBBA,
  regOBBBANewDeductionsTBS,
];

export default regTBSQuestionsOBBBA;
