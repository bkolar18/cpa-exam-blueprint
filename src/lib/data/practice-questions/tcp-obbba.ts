import { PracticeQuestion, QuestionSet } from './types';

// TCP - Tax Compliance & Planning (OBBBA Version)
// For students testing July 1, 2026 or later
// Based on One Big Beautiful Bill Act (H.R. 1) enacted July 4, 2025
// Last Updated: 2026-01-16

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questions: PracticeQuestion[] = [
  // ============================================
  // INDIVIDUAL TAX COMPLIANCE - OBBBA Updates
  // ============================================
  {
    "id": "tcp-obbba-001-001",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "Individual Taxation",
    "conceptTested": "Filing Threshold",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "A single taxpayer under age 65 is generally required to file a federal income tax return when gross income equals or exceeds:",
    "options": {
      "A": "The personal exemption amount",
      "B": "The standard deduction amount",
      "C": "The sum of the personal exemption and standard deduction",
      "D": "$1,000"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §6012, the general filing requirement for individuals is triggered when gross income equals or exceeds the applicable standard deduction amount. For 2025, this threshold is $15,750 for single filers under 65. Why wrong: (A) Personal exemptions were permanently eliminated by OBBBA—they no longer exist and cannot be a filing threshold; (C) Since personal exemptions are zero, this would just equal the standard deduction, but this answer implies they still exist as a separate component; (D) The $1,000 threshold is not used for general filing requirements—it only applies to certain limited situations like estates and trusts. The OBBBA Act made the personal exemption elimination permanent, so unlike under TCJA where exemptions were merely 'suspended' through 2025, they will never return.",
    "tip": "Filing threshold = standard deduction. Personal exemptions are permanently eliminated (not just suspended).",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },
  {
    "id": "tcp-obbba-001-002",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "Individual Taxation",
    "conceptTested": "Standard Deduction Amounts",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under the OBBBA Act, what is the standard deduction for a married couple filing jointly in 2025?",
    "options": {
      "A": "$29,200",
      "B": "$30,000",
      "C": "$31,500",
      "D": "$27,700"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §63(c), as amended by OBBBA, the standard deduction for married filing jointly is $31,500 for 2025. This amount will continue to be adjusted annually for inflation. Why wrong: (A) $29,200 was the 2024 TCJA amount for MFJ—OBBBA increased this; (B) $30,000 is not a valid standard deduction amount under any provision; (D) $27,700 was the 2023 amount, now outdated. OBBBA significantly increased the standard deduction as part of the comprehensive tax reform, providing approximately $2,300 more in deductions for MFJ filers compared to 2024. For single filers, the OBBBA standard deduction is $15,750 (exactly half the MFJ amount). These amounts are indexed for inflation and will increase in future years.",
    "tip": "OBBBA standard deduction 2025: $15,750 single, $31,500 MFJ. Higher than TCJA amounts.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },

  // ============================================
  // NEW OBBBA DEDUCTIONS (2025-2028)
  // ============================================
  {
    "id": "tcp-obbba-002-001",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "OBBBA Deductions",
    "conceptTested": "Tips Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under the OBBBA Act, qualified tip income is eligible for a deduction of up to:",
    "options": {
      "A": "$10,000",
      "B": "$25,000",
      "C": "$50,000",
      "D": "There is no deduction for tip income"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §62(a)(22), as added by OBBBA, taxpayers may deduct up to $25,000 of qualified tip income as an above-the-line deduction. This applies to tips received in occupations that customarily and regularly receive tips (restaurants, hotels, salons, etc.). The deduction is available for tax years 2025 through 2028. Why wrong: (A) $10,000 is the SALT cap amount and the auto loan interest limit—not the tips deduction; (C) $50,000 exceeds the statutory limit; (D) Prior to OBBBA, tip income had no special deduction, but OBBBA changed this. This deduction reduces AGI, making it more valuable than an itemized deduction since it benefits all taxpayers regardless of whether they itemize.",
    "tip": "Tips deduction: up to $25K for qualified tips (2025-2028). Above-the-line = reduces AGI.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-002-002",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "OBBBA Deductions",
    "conceptTested": "Overtime Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "The OBBBA overtime deduction allows employees to deduct qualified overtime pay up to:",
    "options": {
      "A": "$12,500 ($25,000 for married filing jointly)",
      "B": "$25,000 regardless of filing status",
      "C": "$10,000 ($20,000 for married filing jointly)",
      "D": "50% of overtime wages"
    },
    "correctAnswer": "A",
    "explanation": "Under IRC §62(a)(23), as added by OBBBA, employees may deduct qualified overtime pay up to $12,500 ($25,000 for married filing jointly). The overtime must qualify under the Fair Labor Standards Act (FLSA)—typically hours worked beyond 40 per week for non-exempt employees. This deduction is available for tax years 2025 through 2028. Why wrong: (B) The deduction has different limits based on filing status, not a flat $25K for all; (C) These amounts are incorrect—the actual limits are $12,500/$25,000; (D) There is no percentage-based calculation. Key point: Exempt employees (salaried professionals) typically do not receive FLSA overtime and cannot claim this deduction.",
    "tip": "Overtime deduction: $12.5K single, $25K MFJ (2025-2028). Must be FLSA-qualifying overtime.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-002-003",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "OBBBA Deductions",
    "conceptTested": "Senior Citizen Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, taxpayers age 65 or older are eligible for an additional deduction of:",
    "options": {
      "A": "$4,000",
      "B": "$6,000",
      "C": "$8,000",
      "D": "$10,000"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §63(f), as amended by OBBBA, taxpayers age 65 or older may claim an additional $6,000 deduction for tax years 2025 through 2028. This is a NEW deduction that STACKS with the existing additional standard deduction for elderly taxpayers ($1,950 for single, $1,550 per spouse for MFJ in 2025). Why wrong: (A) $4,000 is not the correct amount; (C) $8,000 overstates the deduction; (D) $10,000 is the auto loan interest limit, not the senior deduction. Example: A single taxpayer age 67 would receive: $15,750 (standard) + $1,950 (elderly additional) + $6,000 (OBBBA senior) = $23,700 total standard deduction equivalent.",
    "tip": "Senior deduction: extra $6,000 for age 65+ (2025-2028). STACKS with existing elderly additional amount.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-002-004",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "OBBBA Deductions",
    "conceptTested": "Auto Loan Interest Deduction",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "The OBBBA auto loan interest deduction allows taxpayers to deduct interest on vehicle loans up to:",
    "options": {
      "A": "$5,000 annually",
      "B": "$10,000 annually",
      "C": "$15,000 annually",
      "D": "No limit if the vehicle is used for business"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §163(h)(2)(F), as added by OBBBA, taxpayers may deduct interest on motor vehicle loans for personal-use vehicles, up to $10,000 annually. This is an above-the-line deduction available for tax years 2025 through 2028. The vehicle must be manufactured in the United States. Why wrong: (A) $5,000 understates the limit; (C) $15,000 overstates the limit; (D) Business vehicle interest is already deductible under general business expense rules—this new deduction specifically addresses personal vehicle interest, which was previously non-deductible personal interest under §163(h). This represents a significant change since personal auto loan interest has been non-deductible since 1986.",
    "tip": "Auto loan interest: up to $10K deduction (2025-2028). Personal vehicles only, US-manufactured, above-the-line.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-002-005",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "OBBBA Deductions",
    "conceptTested": "OBBBA Deduction Planning",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "A taxpayer who is age 67, works as a restaurant server, and has a car loan should understand that the OBBBA temporary deductions:",
    "options": {
      "A": "Are mutually exclusive - only one can be claimed",
      "B": "Can all be claimed if qualifications are met",
      "C": "Phase out based on AGI",
      "D": "Are only available to itemizers"
    },
    "correctAnswer": "B",
    "explanation": "Under OBBBA, the new temporary deductions (tips under §62(a)(22), overtime under §62(a)(23), senior deduction under §63(f), and auto loan interest under §163(h)(2)(F)) can ALL be claimed simultaneously if the taxpayer meets the qualifications for each. These are above-the-line deductions that reduce AGI, so they benefit taxpayers regardless of whether they itemize or take the standard deduction. Why wrong: (A) The deductions are NOT mutually exclusive—Congress designed them to stack; (C) Unlike many tax benefits, these OBBBA deductions have no AGI phase-out provisions; (D) As above-the-line deductions, they are available to both itemizers and standard deduction taxpayers. Planning tip: This taxpayer could potentially claim up to $25K (tips) + $10K (auto) + $6K (senior) = $41K in OBBBA deductions.",
    "tip": "OBBBA deductions stack! Tips + overtime + senior + auto interest can all be claimed if eligible. No AGI limits!",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // SALT CAP - OBBBA Updates
  // ============================================
  {
    "id": "tcp-obbba-003-001",
    "section": "TCP",
    "topic": "State and Local Tax",
    "subtopic": "SALT Deduction",
    "conceptTested": "SALT Cap Amount",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under the OBBBA Act, the state and local tax (SALT) deduction cap for taxpayers filing jointly is:",
    "options": {
      "A": "$10,000",
      "B": "$20,000",
      "C": "$40,000",
      "D": "Unlimited"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §164(b)(6), as amended by OBBBA, the SALT deduction cap is increased to $40,000 for married filing jointly, single, and head of household filers ($20,000 for married filing separately). This is a 4x increase from the $10,000 TCJA cap. Why wrong: (A) $10,000 was the TCJA cap (2018-2025)—OBBBA increased this significantly; (B) $20,000 is only the MFS limit, not the general cap; (D) SALT is not unlimited—it remains capped, just at a higher amount. Important: The higher cap phases out for taxpayers with MAGI exceeding $500,000. The SALT deduction includes state and local income taxes (or sales taxes if elected) plus property taxes combined.",
    "tip": "OBBBA SALT cap: $40,000 ($20K MFS). 4x increase from TCJA's $10K. Phases out above $500K MAGI.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-003-002",
    "section": "TCP",
    "topic": "State and Local Tax",
    "subtopic": "SALT Deduction",
    "conceptTested": "SALT Phaseout",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "The $40,000 SALT deduction cap under OBBBA phases out for taxpayers with MAGI exceeding:",
    "options": {
      "A": "$250,000",
      "B": "$400,000",
      "C": "$500,000",
      "D": "There is no phaseout"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §164(b)(6), as amended by OBBBA, the enhanced $40,000 SALT cap phases down for taxpayers with modified AGI exceeding $500,000. The cap gradually reduces back toward $10,000 as income increases above this threshold. Why wrong: (A) $250,000 is below the actual phaseout threshold; (B) $400,000 is incorrect—the phaseout begins at $500,000; (D) Unlike the original TCJA SALT cap which had no phaseout, OBBBA added an income-based limitation. This design provides relief to middle-class taxpayers in high-tax states while limiting the benefit for high earners. Planning note: Pass-through entity tax (PTET) elections may still provide SALT relief for business owners above the phaseout threshold.",
    "tip": "SALT cap phases out above $500K MAGI. High earners gradually lose the benefit. Consider PTET elections.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // ESTATE & GIFT TAX - OBBBA Updates
  // ============================================
  {
    "id": "tcp-obbba-004-001",
    "section": "TCP",
    "topic": "Estate and Gift Planning",
    "subtopic": "Estate & Gift Tax",
    "conceptTested": "Estate Tax Exemption",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the federal estate tax basic exclusion amount is:",
    "options": {
      "A": "Scheduled to sunset to approximately $6-7 million in 2026",
      "B": "Permanently set at the higher TCJA levels (approximately $13.99 million for 2025)",
      "C": "Reduced to $5 million immediately",
      "D": "Eliminated entirely"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §2010(c), as amended by OBBBA, the basic exclusion amount is permanently set at the higher TCJA levels—approximately $13.99 million for 2025, indexed for inflation. OBBBA removed the sunset provision that would have reduced the exemption to approximately $6-7 million in 2026. Why wrong: (A) The sunset was eliminated by OBBBA—there is no longer a reduction scheduled for 2026; (C) The exemption was not reduced—it remains at the higher level; (D) The estate tax was not eliminated, just the exemption made permanent at the higher level. Married couples can use portability (DSUE) to shelter approximately $28 million combined. The 40% estate tax rate on amounts exceeding the exemption remains unchanged.",
    "tip": "OBBBA made estate exemption PERMANENT at ~$14M (indexed). No more 2026 sunset! 40% rate unchanged.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "tcp-obbba-004-002",
    "section": "TCP",
    "topic": "Estate and Gift Planning",
    "subtopic": "Estate & Gift Tax",
    "conceptTested": "Clawback Concerns",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "With OBBBA making the estate tax exemption permanent, the 'clawback' concern for large lifetime gifts:",
    "options": {
      "A": "Remains a major planning consideration",
      "B": "Is no longer relevant since the exemption will not decrease",
      "C": "Only applies to gifts over $50 million",
      "D": "Has been replaced with a new recapture rule"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §2001(g), the 'clawback' issue arose from concern that estates would owe additional tax if lifetime gifts were made using the higher exemption ($13.99M) and the exemption later decreased (to ~$6M). Treasury Reg. 20.2010-1(c) provided anti-clawback rules, but planning complexity remained. Since OBBBA made the exemption permanent, clawback is no longer a concern—there will be no decrease. Why wrong: (A) Clawback was a major concern BEFORE OBBBA, but permanence eliminates it; (C) The $50 million threshold is not relevant—clawback would have affected any gifts exceeding the reduced exemption amount; (D) No new recapture rule was created. Practitioners who deferred large gift planning due to clawback uncertainty can now proceed with confidence.",
    "tip": "Clawback concern eliminated! Exemption is permanent—no risk of future decrease triggering estate tax.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },
  {
    "id": "tcp-obbba-004-003",
    "section": "TCP",
    "topic": "Estate and Gift Planning",
    "subtopic": "Estate & Gift Tax",
    "conceptTested": "Estate Planning Strategy Post-OBBBA",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "How does the OBBBA permanence of the estate tax exemption affect estate planning strategy?",
    "options": {
      "A": "Creates urgency to make gifts before the exemption decreases",
      "B": "Removes the urgency for 'use it or lose it' gifting before a sunset",
      "C": "Requires immediate transfer of all assets to trusts",
      "D": "Makes all estate planning unnecessary"
    },
    "correctAnswer": "B",
    "explanation": "With the estate tax exemption now permanent under OBBBA, the 'use it or lose it' urgency that characterized estate planning in 2024-2025 is eliminated. Clients no longer need to rush to make large gifts before a sunset date. Why wrong: (A) This was the strategy BEFORE OBBBA—permanence removes this urgency; (C) Trusts remain valuable planning tools but are not required; (D) Estate planning remains important for: state estate taxes (some states have lower exemptions), asset protection, creditor protection, privacy, generation-skipping planning, and non-tax family objectives. The permanent exemption allows for more thoughtful, deliberate planning rather than tax-deadline-driven decisions. Annual exclusion gifts ($18,000/recipient in 2025) remain a useful strategy for wealth transfer.",
    "tip": "No more 'use it or lose it' pressure! Estate planning remains valuable for state taxes, protection, and family goals.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // CHILD TAX CREDIT - OBBBA Updates
  // ============================================
  {
    "id": "tcp-obbba-005-001",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Tax Credits",
    "conceptTested": "Child Tax Credit Amount",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the Child Tax Credit for a qualifying child under 17 is:",
    "options": {
      "A": "$1,000 per child",
      "B": "$2,000 per child",
      "C": "$2,200 per child",
      "D": "$3,000 per child"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §24, as amended by OBBBA, the Child Tax Credit is $2,200 per qualifying child under age 17 for 2025, indexed for inflation. This is an increase from the $2,000 TCJA amount. Why wrong: (A) $1,000 was the pre-TCJA amount, long outdated; (B) $2,000 was the TCJA amount (2018-2025)—OBBBA increased this; (D) $3,000 was the temporary 2021 American Rescue Plan amount for children 6-17, which expired. The CTC phases out at $400,000 MAGI for MFJ ($200,000 others). The Additional Child Tax Credit (ACTC) remains available for the refundable portion, up to $1,700 per child. The $500 Other Dependent Credit for non-qualifying dependents continues unchanged.",
    "tip": "OBBBA CTC: $2,200 per child (up from $2,000). Indexed for inflation. $1,700 max refundable via ACTC.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },

  // ============================================
  // PERSONAL EXEMPTION - OBBBA Updates
  // ============================================
  {
    "id": "tcp-obbba-006-001",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "Individual Taxation",
    "conceptTested": "Personal Exemption Status",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the status of the personal exemption deduction is:",
    "options": {
      "A": "Suspended through 2025, returning in 2026",
      "B": "Permanently eliminated",
      "C": "Set at $5,000 per person",
      "D": "Available only for dependents"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §151(d), as amended by OBBBA, the personal exemption deduction is permanently eliminated. Under TCJA, exemptions were suspended (set to $0) for 2018-2025 and were scheduled to return in 2026 at approximately $5,050 (indexed). OBBBA made this elimination permanent. Why wrong: (A) This was the TCJA rule—OBBBA changed it; (C) $5,000 would have been approximately what exemptions returned to in 2026 under TCJA sunset, but OBBBA prevented this; (D) Exemptions were never limited to dependents only. Important: The exemption amount ($5,050 for 2024) is still used for the qualifying relative gross income test under §152(d)(1)(B), even though no actual exemption is allowed.",
    "tip": "Personal exemptions are PERMANENTLY $0 under OBBBA. Not 'suspended'—ELIMINATED. Will never return.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },

  // ============================================
  // QOZ - Unchanged from TCJA
  // ============================================
  {
    "id": "tcp-obbba-007-001",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Investment Income",
    "conceptTested": "QOZ Deferral Deadline",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Capital gains invested in a Qualified Opportunity Zone Fund must recognize the deferred gain no later than:",
    "options": {
      "A": "December 31, 2025",
      "B": "December 31, 2026",
      "C": "December 31, 2028",
      "D": "The date of sale of the QOZ investment"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §1400Z-2(b)(1), capital gains invested in a Qualified Opportunity Zone Fund are included in income on the earlier of: (1) December 31, 2026, or (2) the date of sale or exchange of the QOZ investment. This deadline was NOT changed by OBBBA. Why wrong: (A) December 31, 2025 is incorrect—the statute specifies 2026; (C) December 31, 2028 would be the 10-year exclusion date for investments made in 2018, but the deferral deadline is 2026; (D) While earlier sale triggers recognition, there is a backstop date of 12/31/2026. The original basis step-up benefits (10% at 5 years, 15% at 7 years) expired after 2021, but the permanent exclusion of appreciation for investments held 10+ years remains under §1400Z-2(c).",
    "tip": "QOZ deferral ends 12/31/2026 (unchanged by OBBBA). Step-up benefits expired. 10-year exclusion still available.",
    "calculationRequired": false,
    "timeEstimateSeconds": 75
  },

  // ============================================
  // SECTION 163(j) - ATI Calculation Change
  // ============================================
  {
    "id": "tcp-obbba-008-001",
    "section": "TCP",
    "topic": "C Corporation Planning",
    "subtopic": "Business Interest",
    "conceptTested": "163(j) Limitation",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "Under Section 163(j), business interest expense is limited to:",
    "options": {
      "A": "30% of adjusted taxable income plus business interest income",
      "B": "The greater of $25 million or 30% of gross receipts",
      "C": "Interest income plus 50% of depreciation",
      "D": "50% of taxable income"
    },
    "correctAnswer": "A",
    "explanation": "Under IRC §163(j)(1), business interest expense deduction is limited to: business interest income + 30% of adjusted taxable income (ATI) + floor plan financing interest. CRITICAL for 2026+: ATI no longer adds back depreciation, amortization, or depletion (the addback expired after 2021), making the limitation more restrictive. Why wrong: (B) There is no gross receipts calculation—the $25M threshold determines exemption eligibility, not the limitation formula; (C) This formula is incorrect; (D) 50% of taxable income is not the formula. Small business exception: Taxpayers with average gross receipts of $30M or less (adjusted annually) are exempt from §163(j). Disallowed interest carries forward indefinitely with no expiration.",
    "tip": "163(j): 30% ATI + interest income. Post-2021: no D&A addback = tighter limit. $30M gross receipts exemption.",
    "calculationRequired": false,
    "timeEstimateSeconds": 90
  },

  // ============================================
  // BONUS DEPRECIATION - Phase-Down Schedule
  // ============================================
  {
    "id": "tcp-obbba-009-001",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Depreciation",
    "conceptTested": "Bonus Depreciation Phase-Down",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "For property placed in service in 2026, the bonus depreciation percentage under Section 168(k) is:",
    "options": {
      "A": "100%",
      "B": "80%",
      "C": "60%",
      "D": "40%"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §168(k)(6), bonus depreciation phases down after 2022: 100% for 2022, 80% for 2023, 60% for 2024, 40% for 2025, 20% for 2026, and 0% after 2026. For property placed in service in 2026, the rate is 20%. However, OBBBA extended and modified the phase-down—for 2026, the rate is 60%. Why wrong: (A) 100% was only available through 2022; (B) 80% was the 2023 rate; (D) 40% was the 2025 rate under the original TCJA schedule. Note: The remaining basis after bonus depreciation is recovered using regular MACRS depreciation over the applicable recovery period.",
    "tip": "OBBBA bonus depreciation 2026 = 60%. Phase-down was modified—verify current year rate before advising clients.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },
  {
    "id": "tcp-obbba-009-002",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Depreciation",
    "conceptTested": "Bonus Depreciation Calculation",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "A calendar-year corporation purchases $500,000 of new 5-year MACRS equipment on July 1, 2026. Assuming no Section 179 election, what is the first-year depreciation deduction?",
    "options": {
      "A": "$300,000",
      "B": "$340,000",
      "C": "$350,000",
      "D": "$500,000"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §168(k) as modified by OBBBA, 2026 bonus depreciation is 60%. Calculation: Step 1: Bonus depreciation = $500,000 × 60% = $300,000. Step 2: Remaining basis = $500,000 - $300,000 = $200,000. Step 3: Regular MACRS (5-year, half-year convention) first-year rate = 20%. Step 4: Regular MACRS depreciation = $200,000 × 20% = $40,000. Total first-year depreciation = $300,000 + $40,000 = $340,000. Why wrong: (A) $300,000 is only the bonus portion—forgot regular MACRS; (C) $350,000 uses an incorrect MACRS rate; (D) $500,000 would only be correct if 100% bonus applied (not available in 2026).",
    "tip": "Bonus + regular MACRS = total depreciation. Don't forget the regular depreciation on the remaining basis!",
    "calculationRequired": true,
    "timeEstimateSeconds": 120
  },

  // ============================================
  // MISCELLANEOUS ITEMIZED DEDUCTIONS - Permanent Elimination
  // ============================================
  {
    "id": "tcp-obbba-010-001",
    "section": "TCP",
    "topic": "Individual Tax Compliance",
    "subtopic": "Itemized Deductions",
    "conceptTested": "Miscellaneous Itemized Deductions",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, miscellaneous itemized deductions subject to the 2% AGI floor (unreimbursed employee expenses, tax preparation fees, investment expenses) are:",
    "options": {
      "A": "Deductible to the extent they exceed 2% of AGI",
      "B": "Permanently eliminated",
      "C": "Deductible in full without limitation",
      "D": "Available only for self-employed individuals"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §67(g), as amended by OBBBA, miscellaneous itemized deductions subject to the 2% AGI floor are permanently eliminated. TCJA suspended these deductions for 2018-2025. OBBBA made this elimination permanent, so they will never return. Why wrong: (A) This was the pre-TCJA rule—the 2% floor no longer applies because the deductions are entirely eliminated; (C) Full deductibility was never the rule; (D) Self-employed individuals can still deduct business expenses on Schedule C, but W-2 employees cannot deduct unreimbursed expenses. Examples of permanently non-deductible expenses: unreimbursed employee expenses, tax preparation fees, investment management fees, safe deposit boxes, and hobby expenses.",
    "tip": "2% floor deductions = PERMANENTLY gone under OBBBA. No unreimbursed employee expenses. Schedule C still OK.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // AMT - Alternative Minimum Tax Updates
  // ============================================
  {
    "id": "tcp-obbba-011-001",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Alternative Minimum Tax",
    "conceptTested": "AMT Exemption Permanence",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the increased AMT exemption amounts established by TCJA are:",
    "options": {
      "A": "Scheduled to decrease in 2026 to pre-TCJA levels",
      "B": "Made permanent at the higher TCJA levels (indexed for inflation)",
      "C": "Eliminated entirely—AMT no longer applies",
      "D": "Available only for taxpayers with income under $500,000"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §55(d), as amended by OBBBA, the increased AMT exemption amounts are made permanent. For 2025, the exemptions are approximately $88,100 for single filers and $137,000 for MFJ (indexed). These higher exemptions significantly reduced the number of taxpayers subject to AMT. Why wrong: (A) OBBBA removed the sunset—exemptions will not decrease; (C) AMT was not eliminated—it still applies, just to fewer taxpayers due to higher exemptions; (D) There is no $500,000 income cap. The phaseout thresholds were also made permanent at higher levels ($626,350 single, $1,252,700 MFJ for 2025), further limiting AMT exposure.",
    "tip": "AMT exemptions PERMANENT at higher TCJA levels under OBBBA. Fewer taxpayers hit AMT, but it still exists.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },
  {
    "id": "tcp-obbba-011-002",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Alternative Minimum Tax",
    "conceptTested": "AMT Preference Items",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "Which of the following remains a preference item for AMT purposes under OBBBA?",
    "options": {
      "A": "State and local taxes",
      "B": "Personal exemptions",
      "C": "Exercise of incentive stock options (ISO) bargain element",
      "D": "Miscellaneous itemized deductions subject to the 2% floor"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §56 and §57, the bargain element (FMV minus exercise price) from incentive stock option (ISO) exercises remains a preference item for AMT. This creates potential AMT exposure in the year of exercise even though no regular tax is due until sale. Why wrong: (A) SALT is an adjustment, not a preference item—and it's disallowed entirely for AMT (no adjustment needed since SALT is capped anyway); (B) Personal exemptions were permanently eliminated—there's nothing to add back; (D) Miscellaneous itemized deductions were permanently eliminated, so there's no adjustment needed. Other continuing AMT preferences include: private activity bond interest, percentage depletion, and certain intangible drilling costs.",
    "tip": "ISO bargain element = key remaining AMT preference. No regular tax on exercise, but watch for AMT!",
    "calculationRequired": false,
    "timeEstimateSeconds": 90
  },

  // ============================================
  // COMPREHENSIVE TAX PLANNING - Integration
  // ============================================
  {
    "id": "tcp-obbba-012-001",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Comprehensive Planning",
    "conceptTested": "OBBBA Tax Planning Integration",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "A married couple, both age 67, expects tip income of $40,000, overtime of $30,000, auto loan interest of $12,000, and charitable contributions of $35,000 in 2025. Which statement best describes their optimal tax position under OBBBA?",
    "options": {
      "A": "They must choose between the OBBBA deductions and itemizing",
      "B": "The OBBBA deductions reduce AGI, then they can still itemize if beneficial",
      "C": "They should take the standard deduction because it exceeds their itemized deductions",
      "D": "The OBBBA deductions are subject to the 2% AGI floor"
    },
    "correctAnswer": "B",
    "explanation": "Under OBBBA, the new deductions (tips §62(a)(22), overtime §62(a)(23), auto loan interest §163(h)(2)(F), senior §63(f)) are above-the-line deductions that reduce AGI BEFORE the standard/itemized deduction choice. They can claim: Tips = $25,000 (capped), Overtime = $25,000 MFJ (capped), Auto = $10,000 (capped), Senior = $6,000 × 2 = $12,000. Total AGI reduction = $72,000. THEN they compare standard ($31,500 + $12,000 senior + $3,100 elderly additional) vs. itemized ($35,000 charity + SALT up to $40,000). Why wrong: (A) OBBBA deductions and itemizing are not mutually exclusive; (C) Without comparing the full calculations, this cannot be determined; (D) OBBBA deductions are NOT subject to any AGI floor.",
    "tip": "OBBBA deductions = ABOVE-THE-LINE (reduce AGI). Standard vs. itemized is a SEPARATE decision AFTER.",
    "calculationRequired": false,
    "timeEstimateSeconds": 120
  },
  {
    "id": "tcp-obbba-012-002",
    "section": "TCP",
    "topic": "Tax Planning",
    "subtopic": "Comprehensive Planning",
    "conceptTested": "OBBBA vs TCJA Comparison",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "Which provision was fundamentally changed from 'suspended through 2025' under TCJA to 'permanently eliminated' under OBBBA?",
    "options": {
      "A": "State and local tax deduction",
      "B": "Personal and dependency exemptions",
      "C": "Mortgage interest deduction",
      "D": "Charitable contribution deduction"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §151(d)(5), personal and dependency exemptions were 'suspended' (set to $0) by TCJA for 2018-2025 and were scheduled to return at approximately $5,050 (indexed) in 2026. OBBBA changed this from a suspension to a permanent elimination. Why wrong: (A) SALT was capped, not suspended, and OBBBA increased the cap to $40,000; (C) Mortgage interest deduction was modified (acquisition debt limit reduced to $750,000) but not suspended—and remains available; (D) Charitable contributions were never suspended—the 60% AGI limit and other rules were modified but deductions continue. This distinction matters: 'suspended' provisions would have returned without new legislation; 'eliminated' provisions require new legislation to restore.",
    "tip": "Key OBBBA change: Personal exemptions went from 'suspended' to 'eliminated.' They're NEVER coming back.",
    "calculationRequired": false,
    "timeEstimateSeconds": 90
  }
];

// Get unique topics from questions
const topics = [...new Set(questions.map(q => q.topic))].sort();

export const tcpQuestionsOBBBA: QuestionSet = {
  section: 'TCP',
  sectionName: 'Tax Compliance & Planning (OBBBA)',
  topics,
  questions,
};

export default tcpQuestionsOBBBA;
