// TCP (Tax Compliance & Planning) Task-Based Simulations - OBBBA Version
// For post-July 2026 CPA Exam testing
// Contains updated figures reflecting OBBBA (One Big Beautiful Bill Act) tax law changes
//
// Key OBBBA Changes Reflected:
// - SALT cap: $10,000 → $40,000
// - Standard deduction: $15,750 single / $31,500 MFJ
// - Estate/gift exemption: ~$14,000,000 (made permanent)
// - Child tax credit: $2,000 → $2,200
// - New above-the-line deductions: tips ($25K), overtime ($12.5K), senior ($6K), auto loan interest ($10K)
// - AMT exemption: Updated figures
// - Bonus depreciation: Restored to 100%

import { TBSQuestion } from "./types";

// =============================================================================
// TAX PLANNING STRATEGIES - OBBBA Updates
// =============================================================================

export const tcpTaxPlanningIndividualTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-001",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Tax Planning",
  subtopic: "Individual Tax Planning",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "TCP-I",
  title: "Individual Tax Planning Strategies (OBBBA)",
  scenarioText: `A married couple is evaluating tax planning strategies for year-end under OBBBA provisions. Analyze the scenarios and calculate the tax impact of various planning decisions, considering the increased SALT cap and new deductions.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-current-situation",
      order: 1,
      title: "Current Tax Situation",
      type: "table",
      content: {
        type: "table",
        title: "Current Year Projections (MFJ)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Wages (combined)", "$320,000"] },
          { cells: ["Tip income (spouse 1 - restaurant manager)", "$28,000"] },
          { cells: ["Overtime pay (spouse 2)", "$15,000"] },
          { cells: ["Interest income", "$12,000"] },
          { cells: ["Qualified dividends", "$18,000"] },
          { cells: ["State income taxes paid", "$35,000"] },
          { cells: ["Property taxes", "$18,000"] },
          { cells: ["OBBBA Standard deduction (MFJ)", "$31,500"] },
          { cells: ["Current marginal bracket", "24%"] },
        ],
      },
    },
    {
      id: "exhibit-obbba-opportunities",
      order: 2,
      title: "OBBBA Planning Opportunities",
      type: "text",
      content: {
        type: "text",
        title: "New OBBBA Deductions and Limits",
        paragraphs: [
          "Tip Income Deduction: Up to $25,000 above-the-line",
          "Overtime Pay Deduction: Up to $12,500 above-the-line",
          "SALT Cap: Increased to $40,000 (from $10,000)",
          "Additional: $23,000 each for 401(k) contributions available",
          "Option: Bunch itemized deductions with $10,000 additional charitable giving",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-tip-deduction",
      order: 1,
      type: "numeric",
      label: "OBBBA tip income deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Per OBBBA new provision, tip income deduction is capped at $25,000. With $28,000 in tips, the deduction is limited to the $25,000 cap.",
    },
    {
      id: "req-overtime-deduction",
      order: 2,
      type: "numeric",
      label: "OBBBA overtime pay deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500,
        tolerance: 0,
      },
      explanation: "Per OBBBA new provision, overtime deduction is capped at $12,500. With $15,000 overtime, deduction is limited to $12,500.",
    },
    {
      id: "req-salt-deduction",
      order: 3,
      type: "numeric",
      label: "SALT deduction under OBBBA cap",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "Per OBBBA §164(b)(6) update, SALT cap increased to $40,000. Total SALT ($35,000 state + $18,000 property = $53,000) is capped at $40,000.",
    },
    {
      id: "req-itemized-benefit",
      order: 4,
      type: "numeric",
      label: "Benefit of itemizing with $10K charity vs standard deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4440,
        tolerance: 100,
      },
      explanation: "Per IRC §63, itemized = $40,000 SALT + $10,000 charity = $50,000. Standard = $31,500. Benefit = ($50,000 - $31,500) × 24% = $4,440.",
    },
    {
      id: "req-401k-savings",
      order: 5,
      type: "numeric",
      label: "Tax savings from max 401(k) contributions ($46,000 combined)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 11040,
        tolerance: 100,
      },
      explanation: "Per IRC §402(g), $46,000 × 24% marginal rate = $11,040 tax savings from pre-tax 401(k) contributions.",
    },
    {
      id: "req-total-obbba-benefit",
      order: 6,
      type: "numeric",
      label: "Total AGI reduction from new OBBBA above-the-line deductions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 37500,
        tolerance: 0,
      },
      explanation: "Per OBBBA, total new above-the-line deductions = $25,000 tips + $12,500 overtime = $37,500 AGI reduction.",
    },
    {
      id: "req-total-tax-benefit",
      order: 7,
      type: "numeric",
      label: "Total tax benefit from OBBBA deductions at 24%",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9000,
        tolerance: 100,
      },
      explanation: "Per OBBBA, tax benefit = $37,500 × 24% = $9,000. This represents NEW tax savings that did not exist before OBBBA.",
    },
  ],
};

// =============================================================================
// ESTATE PLANNING - OBBBA Permanent Exemption
// =============================================================================

export const tcpEstatePlanningTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-estate",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Estate Planning",
  subtopic: "Wealth Transfer Strategies",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "TCP-IV",
  title: "Estate Planning with OBBBA Permanent Exemption",
  scenarioText: `Develop a comprehensive estate plan for a high-net-worth client using the PERMANENT unified credit exemption under OBBBA. Unlike TCJA which was set to sunset, OBBBA made the elevated exemption permanent.`,
  timeEstimateMinutes: 18,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "exhibit-client-info",
      order: 1,
      title: "Client Information",
      type: "table",
      content: {
        type: "table",
        title: "Richardson Family Estate",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Current estate value", "$32,000,000"] },
          { cells: ["Prior taxable gifts (lifetime)", "$3,000,000"] },
          { cells: ["Number of children", "4"] },
          { cells: ["Number of grandchildren", "8"] },
          { cells: ["Spouse's estate value", "$8,000,000"] },
          { cells: ["Annual income from investments", "$1,200,000"] },
        ],
      },
    },
    {
      id: "exhibit-obbba-rules",
      order: 2,
      title: "OBBBA Gift/Estate Tax Rules",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Estate Planning Rules",
        paragraphs: [
          "Annual exclusion: $19,000 per donee (indexed)",
          "Lifetime exemption: $14,000,000 (PERMANENT - no sunset)",
          "GST exemption: $14,000,000 (PERMANENT - matches estate exemption)",
          "Gift split: Available with spouse consent",
          "Direct payment exclusions: Tuition and medical (unlimited)",
          "Estate tax rate: 40%",
          "CRITICAL: TCJA exemption was scheduled to sunset to ~$7M in 2026",
          "OBBBA made the ~$14M exemption PERMANENT with inflation indexing",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-annual-exclusion",
      order: 1,
      type: "numeric",
      label: "Maximum annual exclusion gifts (both spouses to all family)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 456000,
        tolerance: 0,
      },
      explanation: "Per IRC §2503(b) with OBBBA indexing, 12 recipients (4 children + 8 grandchildren) × $19,000 × 2 spouses = $456,000.",
    },
    {
      id: "req-remaining-exemption",
      order: 2,
      type: "numeric",
      label: "Client's remaining lifetime exemption",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 11000000,
        tolerance: 0,
      },
      explanation: "Per OBBBA permanent exemption: $14,000,000 − $3,000,000 prior gifts = $11,000,000 remaining.",
    },
    {
      id: "req-combined-exemption",
      order: 3,
      type: "numeric",
      label: "Combined exemption (both spouses)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000000,
        tolerance: 0,
      },
      explanation: "Per OBBBA permanent exemption: $11,000,000 (client remaining) + $14,000,000 (spouse) = $25,000,000 combined.",
    },
    {
      id: "req-taxable-estate",
      order: 4,
      type: "numeric",
      label: "Combined taxable estate before planning",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000000,
        tolerance: 0,
      },
      explanation: "Per IRC §2031, combined estates: $32,000,000 + $8,000,000 = $40,000,000.",
    },
    {
      id: "req-estate-tax-without-planning",
      order: 5,
      type: "numeric",
      label: "Potential estate tax without further planning",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6000000,
        tolerance: 100000,
      },
      explanation: "Per IRC §2001, estate tax: ($40M − $25M combined exemption) × 40% = $6,000,000.",
    },
    {
      id: "req-tcja-comparison",
      order: 6,
      type: "numeric",
      label: "Estate tax if TCJA had sunset (using ~$7M exemption)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10400000,
        tolerance: 200000,
      },
      explanation: "Per TCJA sunset provisions (now avoided by OBBBA): ($40M − ($7M × 2) combined) × 40% = $26M × 40% = $10,400,000. OBBBA saves $4.4M!",
    },
    {
      id: "req-annual-gift-strategy",
      order: 7,
      type: "numeric",
      label: "Estate reduction after 10 years of max annual gifts",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4560000,
        tolerance: 0,
      },
      explanation: "Per IRC §2503, 10 years × $456,000 annual exclusion gifts = $4,560,000 removed from estate tax-free.",
    },
    {
      id: "req-planning-benefit",
      order: 8,
      type: "dropdown",
      label: "Key OBBBA planning advantage over TCJA?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-permanent",
      },
      explanation: "Per OBBBA, the permanent exemption provides certainty for long-term planning. Under TCJA, planners faced uncertainty about the 2026 sunset.",
      dropdownOptions: [
        { id: "opt-permanent", order: 1, text: "Permanent exemption eliminates sunset uncertainty", isCorrect: true },
        { id: "opt-higher", order: 2, text: "Higher exemption amount", isCorrect: false },
        { id: "opt-lower-rate", order: 3, text: "Lower estate tax rate", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// AMT PLANNING - OBBBA Updates
// =============================================================================

export const tcpAMTPlanningTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-amt",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Tax Planning",
  subtopic: "AMT Planning",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "TCP-I",
  title: "AMT Planning Under OBBBA",
  scenarioText: `Analyze AMT exposure and develop planning strategies for a high-income taxpayer under OBBBA provisions. Note that while the SALT cap increased, SALT remains fully disallowed for AMT.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-taxpayer-situation",
      order: 1,
      title: "Taxpayer Information",
      type: "table",
      content: {
        type: "table",
        title: "AMT Planning Scenario (MFJ)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Regular taxable income", "$450,000"] },
          { cells: ["SALT deducted (at OBBBA $40K cap)", "$40,000"] },
          { cells: ["ISO exercise - bargain element", "$120,000"] },
          { cells: ["Private activity bond interest", "$25,000"] },
          { cells: ["Depreciation adjustment (accelerated vs. SL)", "$18,000"] },
        ],
      },
    },
    {
      id: "exhibit-amt-rules",
      order: 2,
      title: "OBBBA AMT Information",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA AMT Rules",
        paragraphs: [
          "AMT exemption (MFJ): $140,000 (indexed)",
          "Exemption phase-out begins: $1,250,000 AMTI",
          "Phase-out rate: 25 cents per dollar over threshold",
          "AMT rates: 26% on first $220,700; 28% thereafter",
          "CRITICAL: SALT is STILL fully disallowed for AMT",
          "The increased OBBBA SALT cap does NOT reduce AMT exposure",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-salt-impact",
      order: 1,
      type: "dropdown",
      label: "Impact of OBBBA's higher SALT cap on AMT",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-benefit",
      },
      explanation: "Per IRC §56, SALT remains an AMT preference item. The higher OBBBA cap for regular tax does NOT reduce AMT - in fact, it may INCREASE AMT exposure since taxpayers deduct more SALT that gets added back.",
      dropdownOptions: [
        { id: "opt-no-benefit", order: 1, text: "No benefit - SALT fully disallowed for AMT regardless of cap", isCorrect: true },
        { id: "opt-reduces-amt", order: 2, text: "Reduces AMT by allowing more SALT", isCorrect: false },
        { id: "opt-eliminates", order: 3, text: "Eliminates AMT for most taxpayers", isCorrect: false },
      ],
    },
    {
      id: "req-amti-calculation",
      order: 2,
      type: "numeric",
      label: "AMTI before exemption",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 653000,
        tolerance: 0,
      },
      explanation: "Per IRC §55-58, AMTI = $450,000 + $40,000 SALT + $120,000 ISO + $25,000 PAB + $18,000 depreciation = $653,000.",
    },
    {
      id: "req-amt-exemption",
      order: 3,
      type: "numeric",
      label: "AMT exemption (after any phase-out)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 140000,
        tolerance: 0,
      },
      explanation: "Per OBBBA updates to IRC §55(d), AMTI of $653,000 is below $1,250,000 phase-out threshold. Full $140,000 exemption applies.",
    },
    {
      id: "req-amt-base",
      order: 4,
      type: "numeric",
      label: "AMT taxable income (AMTI - exemption)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 513000,
        tolerance: 0,
      },
      explanation: "Per IRC §55, AMT base = $653,000 - $140,000 = $513,000.",
    },
    {
      id: "req-tentative-amt",
      order: 5,
      type: "numeric",
      label: "Tentative minimum tax",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 139226,
        tolerance: 500,
      },
      explanation: "Per IRC §55(b), TMT = (26% × $220,700) + (28% × ($513,000 − $220,700)) = $57,382 + $81,844 = $139,226.",
    },
    {
      id: "req-iso-planning",
      order: 6,
      type: "numeric",
      label: "AMT savings if ISO exercise deferred (remove $120K preference)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 33600,
        tolerance: 500,
      },
      explanation: "Per AMT planning, deferring ISO: $120,000 × 28% (high bracket) = $33,600 AMT reduction. This is a key planning strategy.",
    },
    {
      id: "req-strategy-ranking",
      order: 7,
      type: "dropdown",
      label: "Most effective AMT reduction strategy for this taxpayer?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-iso",
      },
      explanation: "Per AMT planning principles, the ISO bargain element ($120,000) is the largest controllable preference. Deferring exercise or exercising and immediately selling (disqualifying disposition) can eliminate this preference.",
      dropdownOptions: [
        { id: "opt-iso", order: 1, text: "Time ISO exercises to manage bargain element", isCorrect: true },
        { id: "opt-salt", order: 2, text: "Reduce SALT payments", isCorrect: false },
        { id: "opt-pab", order: 3, text: "Sell private activity bonds", isCorrect: false },
      ],
    },
  ],
};

// =============================================================================
// BONUS DEPRECIATION - OBBBA Restoration to 100%
// =============================================================================

export const tcpDepreciationPlanningTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-depreciation",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Business Planning",
  subtopic: "Depreciation Strategies",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-II",
  title: "Bonus Depreciation Planning (OBBBA)",
  scenarioText: `Calculate depreciation deductions under OBBBA's restored 100% bonus depreciation. OBBBA reversed the TCJA phase-down and restored full bonus depreciation.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-asset-purchases",
      order: 1,
      title: "Asset Purchases",
      type: "table",
      content: {
        type: "table",
        title: "Business Asset Acquisitions",
        headers: ["Asset", "Cost", "MACRS Class", "Date Acquired"],
        rows: [
          { cells: ["Manufacturing equipment", "$500,000", "7-year", "March 15"] },
          { cells: ["Delivery trucks", "$180,000", "5-year", "June 1"] },
          { cells: ["Office furniture", "$45,000", "7-year", "September 10"] },
          { cells: ["Computer systems", "$75,000", "5-year", "November 1"] },
          { cells: ["Building improvement (QIP)", "$200,000", "15-year", "April 20"] },
        ],
      },
    },
    {
      id: "exhibit-depreciation-rules",
      order: 2,
      title: "OBBBA Depreciation Rules",
      type: "text",
      content: {
        type: "text",
        title: "OBBBA Bonus Depreciation",
        paragraphs: [
          "Bonus depreciation rate: 100% (OBBBA restored from TCJA phase-down)",
          "TCJA phase-down was: 80% (2023), 60% (2024), 40% (2025), 20% (2026), 0% (2027+)",
          "OBBBA: Restored to permanent 100% for qualified property",
          "Section 179 limit: $1,220,000 (phase-out at $3,050,000)",
          "Qualified Improvement Property (QIP): 15-year, bonus-eligible",
          "All listed assets qualify for 100% bonus depreciation",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-equipment-deduction",
      order: 1,
      type: "numeric",
      label: "Manufacturing equipment - Year 1 deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 500000,
        tolerance: 0,
      },
      explanation: "Per OBBBA restored IRC §168(k), 100% bonus depreciation: $500,000 × 100% = $500,000 full deduction in Year 1.",
    },
    {
      id: "req-trucks-deduction",
      order: 2,
      type: "numeric",
      label: "Delivery trucks - Year 1 deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 180000,
        tolerance: 0,
      },
      explanation: "Per OBBBA IRC §168(k), 100% bonus: $180,000 × 100% = $180,000 full deduction.",
    },
    {
      id: "req-qip-deduction",
      order: 3,
      type: "numeric",
      label: "Building improvement (QIP) - Year 1 deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 200000,
        tolerance: 0,
      },
      explanation: "Per OBBBA IRC §168(k), QIP is 15-year property eligible for bonus: $200,000 × 100% = $200,000.",
    },
    {
      id: "req-total-bonus",
      order: 4,
      type: "numeric",
      label: "Total Year 1 bonus depreciation (all assets)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1000000,
        tolerance: 0,
      },
      explanation: "Per OBBBA IRC §168(k), total bonus = $500,000 + $180,000 + $45,000 + $75,000 + $200,000 = $1,000,000.",
    },
    {
      id: "req-tcja-comparison",
      order: 5,
      type: "numeric",
      label: "Year 1 deduction if TCJA 60% phase-down applied",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 600000,
        tolerance: 0,
      },
      explanation: "Per TCJA phase-down (now reversed by OBBBA): $1,000,000 × 60% = $600,000. OBBBA provides $400,000 additional Year 1 deduction.",
    },
    {
      id: "req-tax-benefit",
      order: 6,
      type: "numeric",
      label: "Additional tax benefit from OBBBA vs TCJA phase-down (at 21% corp rate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 84000,
        tolerance: 1000,
      },
      explanation: "Per OBBBA, additional benefit = ($1,000,000 - $600,000) × 21% = $84,000 cash flow improvement from restored bonus depreciation.",
    },
  ],
};

// =============================================================================
// GIFT SPLITTING - OBBBA Updates
// =============================================================================

export const tcpGiftSplittingTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-gift-split",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Estate Planning",
  subtopic: "Gift Tax Planning",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-IV",
  title: "Gift Splitting Strategies (OBBBA)",
  scenarioText: `Calculate gift tax consequences using gift-splitting election under OBBBA's permanent exemption framework.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-gifts",
      order: 1,
      title: "Planned Gifts",
      type: "table",
      content: {
        type: "table",
        title: "Anderson Family Gifts",
        headers: ["Recipient", "Donor", "Amount"],
        rows: [
          { cells: ["Son", "Wife only", "$200,000 cash"] },
          { cells: ["Daughter", "Husband only", "$350,000 stock"] },
          { cells: ["Grandson", "Both equally", "$38,000 total ($19K each)"] },
          { cells: ["Charity", "Husband only", "$50,000"] },
        ],
      },
    },
    {
      id: "exhibit-obbba-limits",
      order: 2,
      title: "OBBBA Gift Tax Limits",
      type: "text",
      content: {
        type: "text",
        title: "Gift Tax Rules",
        paragraphs: [
          "Annual exclusion: $19,000 per donee",
          "Lifetime exemption: $14,000,000 (PERMANENT)",
          "Gift splitting: Treats gifts as if made 50% by each spouse",
          "Requires spouse's consent and Form 709 filing",
          "Both spouses must file if gift-splitting elected",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-son-taxable",
      order: 1,
      type: "numeric",
      label: "Taxable gift to son (with gift-splitting)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 162000,
        tolerance: 0,
      },
      explanation: "Per IRC §2513, with gift-splitting: each spouse treated as giving $100,000. Taxable per spouse = $100,000 - $19,000 = $81,000 × 2 = $162,000 total taxable.",
    },
    {
      id: "req-daughter-taxable",
      order: 2,
      type: "numeric",
      label: "Taxable gift to daughter (with gift-splitting)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 312000,
        tolerance: 0,
      },
      explanation: "Per IRC §2513, with gift-splitting: each spouse treated as giving $175,000. Taxable per spouse = $175,000 - $19,000 = $156,000 × 2 = $312,000 total taxable.",
    },
    {
      id: "req-grandson-taxable",
      order: 3,
      type: "numeric",
      label: "Taxable gift to grandson",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 0,
      },
      explanation: "Per IRC §2503(b), each spouse gave $19,000 (exactly annual exclusion). Total taxable = $0.",
    },
    {
      id: "req-total-taxable",
      order: 4,
      type: "numeric",
      label: "Total taxable gifts (all recipients)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 474000,
        tolerance: 0,
      },
      explanation: "Per IRC §2501-2513, total taxable = $162,000 + $312,000 + $0 = $474,000. Charity is not a taxable gift.",
    },
    {
      id: "req-exemption-impact",
      order: 5,
      type: "numeric",
      label: "Exemption used (per spouse)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 237000,
        tolerance: 0,
      },
      explanation: "Per OBBBA permanent exemption, each spouse uses $474,000 ÷ 2 = $237,000 of their $14,000,000 lifetime exemption. Each has $13,763,000 remaining.",
    },
  ],
};

// =============================================================================
// NEW OBBBA DEDUCTIONS - Service Worker Planning
// =============================================================================

export const tcpServiceWorkerPlanningTBS_OBBBA: TBSQuestion = {
  id: "tbs-tcp-obbba-service-worker",
  section: "TCP",
  tbsType: "numeric_entry",
  topic: "Tax Planning",
  subtopic: "OBBBA New Deductions",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "TCP-I",
  title: "Service Worker Tax Planning (OBBBA)",
  scenarioText: `Develop a tax strategy for a service industry worker utilizing the new OBBBA above-the-line deductions for tip income, overtime pay, and auto loan interest.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-worker-info",
      order: 1,
      title: "Worker Information",
      type: "table",
      content: {
        type: "table",
        title: "Service Worker Tax Situation",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Base hourly wages", "$42,000"] },
          { cells: ["Reported tip income", "$38,000"] },
          { cells: ["Overtime pay", "$16,500"] },
          { cells: ["Auto loan interest (US-made vehicle)", "$4,200"] },
          { cells: ["Traditional IRA contribution", "$7,000"] },
          { cells: ["Filing status", "Single"] },
          { cells: ["Standard deduction (single)", "$15,750"] },
        ],
      },
    },
    {
      id: "exhibit-obbba-deductions",
      order: 2,
      title: "OBBBA New Deductions",
      type: "text",
      content: {
        type: "text",
        title: "Above-the-Line Deduction Limits",
        paragraphs: [
          "Tip Income Deduction: Up to $25,000",
          "Overtime Pay Deduction: Up to $12,500",
          "Auto Loan Interest (US vehicle): Up to $10,000",
          "These are above-the-line deductions (reduce AGI)",
          "All taxpayers benefit regardless of itemizing",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-gross-income",
      order: 1,
      type: "numeric",
      label: "Total gross income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 96500,
        tolerance: 0,
      },
      explanation: "Per IRC §61, gross income = $42,000 wages + $38,000 tips + $16,500 overtime = $96,500.",
    },
    {
      id: "req-tip-deduction",
      order: 2,
      type: "numeric",
      label: "OBBBA tip income deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25000,
        tolerance: 0,
      },
      explanation: "Per OBBBA new provision, tip deduction capped at $25,000. With $38,000 tips, deduction is limited to $25,000.",
    },
    {
      id: "req-overtime-deduction",
      order: 3,
      type: "numeric",
      label: "OBBBA overtime deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12500,
        tolerance: 0,
      },
      explanation: "Per OBBBA new provision, overtime deduction capped at $12,500. With $16,500 overtime, deduction is limited to $12,500.",
    },
    {
      id: "req-auto-deduction",
      order: 4,
      type: "numeric",
      label: "Auto loan interest deduction",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4200,
        tolerance: 0,
      },
      explanation: "Per OBBBA new provision, auto loan interest for US-made vehicles deductible up to $10,000. Full $4,200 is deductible.",
    },
    {
      id: "req-agi",
      order: 5,
      type: "numeric",
      label: "AGI after all above-the-line deductions",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 47800,
        tolerance: 0,
      },
      explanation: "Per IRC §62 with OBBBA additions, AGI = $96,500 − $25,000 tips − $12,500 overtime − $4,200 auto − $7,000 IRA = $47,800.",
    },
    {
      id: "req-tax-savings",
      order: 6,
      type: "numeric",
      label: "Tax savings from OBBBA deductions (at 22% bracket)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9174,
        tolerance: 100,
      },
      explanation: "Per OBBBA, new deductions = $25,000 + $12,500 + $4,200 = $41,700. Tax savings = $41,700 × 22% = $9,174. This is NEW tax relief for service workers.",
    },
  ],
};

// =============================================================================
// EXPORT ALL OBBBA TBS
// =============================================================================

export const tcpTBSQuestionsOBBBA: TBSQuestion[] = [
  tcpTaxPlanningIndividualTBS_OBBBA,
  tcpEstatePlanningTBS_OBBBA,
  tcpAMTPlanningTBS_OBBBA,
  tcpDepreciationPlanningTBS_OBBBA,
  tcpGiftSplittingTBS_OBBBA,
  tcpServiceWorkerPlanningTBS_OBBBA,
];

export default tcpTBSQuestionsOBBBA;
