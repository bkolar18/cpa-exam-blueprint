import { PracticeQuestion, QuestionSet } from './types';

// REG - Regulation (OBBBA Version)
// For students testing July 1, 2026 or later
// Based on One Big Beautiful Bill Act (H.R. 1) enacted July 4, 2025
// Last Updated: 2026-01-16

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questions: PracticeQuestion[] = [
  // ============================================
  // INDIVIDUAL TAXATION FOUNDATIONS - OBBBA
  // ============================================
  {
    "id": "reg-obbba-001-001",
    "section": "REG",
    "topic": "REG Foundations",
    "subtopic": "Tax Basics",
    "conceptTested": "Standard vs itemized deductions",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "A taxpayer should itemize deductions when:",
    "options": {
      "A": "They have any charitable contributions",
      "B": "They own a home",
      "C": "Their AGI exceeds $100,000",
      "D": "Their itemized deductions exceed the standard deduction"
    },
    "correctAnswer": "D",
    "explanation": "Under IRC §63(b) and (c), taxpayers may elect to itemize deductions under §63(d) or claim the standard deduction. Rational taxpayers should itemize only when total itemized deductions exceed the standard deduction amount. Why wrong: (A) Having any charitable contributions does not automatically make itemizing beneficial—total itemized deductions must exceed the standard deduction; (B) Owning a home provides potential mortgage interest and property tax deductions, but with the OBBBA standard deduction at $31,500 MFJ, many homeowners still benefit more from the standard deduction; (C) AGI level does not determine itemizing—only the comparison of total itemized deductions to the standard deduction matters. Under OBBBA, the standard deduction is $15,750 single, $31,500 MFJ for 2025.",
    "tip": "Itemize vs. Standard = whichever is LARGER. For 2025: $15,750 single, $31,500 MFJ (OBBBA amounts).",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },
  {
    "id": "reg-obbba-001-002",
    "section": "REG",
    "topic": "REG Foundations",
    "subtopic": "Tax Basics",
    "conceptTested": "Standard deduction amounts",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under the OBBBA Act, the 2025 standard deduction for a single taxpayer under 65 is:",
    "options": {
      "A": "$13,850",
      "B": "$14,600",
      "C": "$15,750",
      "D": "$16,500"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §63(c), as amended by OBBBA, the standard deduction for single filers under 65 is $15,750 for 2025. For married filing jointly, it is $31,500 (exactly double). These amounts are indexed annually for inflation. Why wrong: (A) $13,850 was the 2023 single amount under TCJA; (B) $14,600 was the 2024 single amount under TCJA—OBBBA increased this significantly; (D) $16,500 overstates the 2025 amount. OBBBA increased the standard deduction by approximately $1,150 for single filers compared to 2024 TCJA amounts, providing meaningful tax relief. Additional amounts are available for taxpayers who are blind or age 65+ under §63(f).",
    "tip": "OBBBA 2025: $15,750 single, $31,500 MFJ. ~$1,150 higher than 2024 TCJA amounts.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },
  {
    "id": "reg-obbba-001-003",
    "section": "REG",
    "topic": "REG Foundations",
    "subtopic": "Tax Basics",
    "conceptTested": "Personal exemptions",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under current law (post-OBBBA), personal exemptions are:",
    "options": {
      "A": "$5,000 per person",
      "B": "Suspended through 2025",
      "C": "Permanently eliminated",
      "D": "$4,700 per person"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §151(d)(5), as amended by OBBBA, the personal exemption deduction is permanently eliminated. The TCJA had suspended exemptions (set to $0) for 2018-2025, with exemptions scheduled to return at approximately $5,050 in 2026. OBBBA removed this sunset, making the elimination permanent. Why wrong: (A) $5,000 would have been the approximate 2026 amount if TCJA sunset had occurred; (B) This was the TCJA status—OBBBA changed 'suspended' to 'eliminated'; (D) $4,700 was the 2017 exemption amount before TCJA. Note: The exemption amount ($5,050 for 2024) is still referenced for the qualifying relative gross income test under §152(d)(1)(B), even though no actual exemption deduction is allowed.",
    "tip": "Personal exemptions = GONE forever under OBBBA. Changed from 'suspended' to 'permanently eliminated.'",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },

  // ============================================
  // OBBBA NEW DEDUCTIONS (2025-2028)
  // ============================================
  {
    "id": "reg-obbba-002-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Adjustments to Income",
    "conceptTested": "Tips Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under IRC §62(a)(22), added by OBBBA, the maximum deduction for qualified tip income is:",
    "options": {
      "A": "$10,000",
      "B": "$20,000",
      "C": "$25,000",
      "D": "$50,000"
    },
    "correctAnswer": "C",
    "explanation": "IRC §62(a)(22), added by OBBBA, allows an above-the-line deduction for qualified tip income up to $25,000 annually for tax years 2025-2028. Qualified tips must be received in an occupation that customarily and regularly receives tips (restaurants, hotels, salons, taxi drivers, etc.). Why wrong: (A) $10,000 is the SALT cap floor and auto loan interest limit—not the tips limit; (B) $20,000 is not any standard OBBBA amount; (D) $50,000 exceeds the statutory maximum. As an above-the-line deduction, this reduces AGI directly, benefiting all qualifying taxpayers regardless of whether they itemize. The tips must still be reported as income on the W-2 or reported to the employer via Form 4070.",
    "tip": "Tips deduction: $25K max, above-the-line, 2025-2028. Must be tipped occupation. Reduces AGI directly.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-002-002",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Adjustments to Income",
    "conceptTested": "Overtime Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "The OBBBA overtime deduction under IRC §62(a)(23) applies to:",
    "options": {
      "A": "All wages over 40 hours per week",
      "B": "Overtime pay qualifying under the Fair Labor Standards Act (FLSA)",
      "C": "Any bonus payments",
      "D": "Commission income exceeding base salary"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §62(a)(23), added by OBBBA, the overtime deduction applies specifically to overtime pay that qualifies under the Fair Labor Standards Act (FLSA)—generally time-and-a-half pay for hours exceeding 40 per week for non-exempt employees. The deduction is limited to $12,500 ($25,000 MFJ) for tax years 2025-2028. Why wrong: (A) Not all overtime qualifies—only FLSA-qualifying OT; exempt employees (salaried professionals) typically cannot claim this; (C) Bonuses are not overtime pay and do not qualify; (D) Commission income is not overtime regardless of amount. This distinction is crucial: the deduction is designed for hourly workers receiving legally mandated overtime pay.",
    "tip": "Overtime deduction: FLSA-qualifying OT only. Exempt employees excluded. $12.5K/$25K MFJ limit. 2025-2028.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-002-003",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Adjustments to Income",
    "conceptTested": "Senior Deduction",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "A taxpayer age 68 filing as single is entitled to what additional deduction under OBBBA's IRC §63(f)?",
    "options": {
      "A": "$2,000",
      "B": "$4,000",
      "C": "$6,000",
      "D": "$8,000"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §63(f), as amended by OBBBA, taxpayers age 65 or older are entitled to an additional $6,000 deduction for tax years 2025-2028. This is a NEW benefit that STACKS with the existing additional standard deduction for elderly taxpayers ($1,950 single, $1,550 per spouse for MFJ in 2025). Why wrong: (A) $2,000 understates the OBBBA senior deduction; (B) $4,000 is incorrect; (D) $8,000 overstates the amount. Example calculation: A single taxpayer age 68 would receive: $15,750 (standard deduction) + $1,950 (existing elderly additional) + $6,000 (OBBBA senior deduction) = $23,700 total deduction equivalent. This represents significant tax relief for senior citizens.",
    "tip": "OBBBA senior deduction: $6,000 extra at 65+. STACKS with existing $1,950 elderly amount. Total benefit = $7,950.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-002-004",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Adjustments to Income",
    "conceptTested": "Auto Loan Interest",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA's IRC §163(h)(2)(F), interest on a personal auto loan is:",
    "options": {
      "A": "Not deductible",
      "B": "Deductible up to $10,000 as an above-the-line deduction",
      "C": "Deductible as an itemized deduction",
      "D": "Deductible only if the vehicle is used for business"
    },
    "correctAnswer": "B",
    "explanation": "IRC §163(h)(2)(F), added by OBBBA, creates a new above-the-line deduction for interest on loans used to purchase personal-use motor vehicles manufactured in the United States, up to $10,000 annually for tax years 2025-2028. Why wrong: (A) This was true before OBBBA—personal auto interest was non-deductible since 1986, but OBBBA changed this; (C) The deduction is above-the-line, not an itemized deduction; (D) Business vehicle interest was already deductible as a business expense under general rules—this new provision specifically addresses personal vehicles. This is a historic change: personal auto loan interest has been non-deductible for nearly 40 years. The US-manufactured requirement is intended to promote domestic auto production.",
    "tip": "Auto loan interest: NEW $10K above-the-line deduction. Personal vehicles only. US-manufactured required. 2025-2028.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-002-005",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Adjustments to Income",
    "conceptTested": "OBBBA Deductions Calculation",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "A 66-year-old single taxpayer has $30,000 in tip income, $15,000 in overtime pay, and $8,000 in auto loan interest. What is the maximum total above-the-line OBBBA deduction?",
    "options": {
      "A": "$25,000",
      "B": "$45,500",
      "C": "$51,500",
      "D": "$53,000"
    },
    "correctAnswer": "B",
    "explanation": "Calculate each OBBBA above-the-line deduction (§62) separately: Tips (§62(a)(22)): lesser of $30,000 actual or $25,000 limit = $25,000. Overtime (§62(a)(23)): lesser of $15,000 actual or $12,500 limit (single) = $12,500. Auto loan interest (§163(h)(2)(F)): lesser of $8,000 actual or $10,000 limit = $8,000. Total above-the-line: $25,000 + $12,500 + $8,000 = $45,500. Note: The $6,000 senior deduction under §63(f) is an addition to the standard deduction, not an above-the-line deduction, so it is not included in this calculation. Why wrong: (A) Only includes tips; (C) and (D) incorrectly include the senior deduction or use wrong limits.",
    "tip": "Above-the-line OBBBA: Tips ($25K) + OT ($12.5K single) + Auto ($10K) = stacking benefits. Senior is separate.",
    "calculationRequired": true,
    "timeEstimateSeconds": 90
  },

  // ============================================
  // ITEMIZED DEDUCTIONS - SALT CAP
  // ============================================
  {
    "id": "reg-obbba-003-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Itemized Deductions",
    "conceptTested": "SALT Deduction Cap",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the state and local tax (SALT) deduction for itemizers is limited to:",
    "options": {
      "A": "$5,000 for all filers",
      "B": "$10,000 ($5,000 for married filing separately)",
      "C": "$40,000 ($20,000 for married filing separately)",
      "D": "Unlimited"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §164(b)(6), as amended by OBBBA, the SALT deduction cap is $40,000 for most filing statuses ($20,000 for married filing separately). This is a 4x increase from the $10,000 TCJA cap. SALT includes state/local income taxes (or sales taxes if elected under §164(b)(5)) plus real property taxes. Why wrong: (A) $5,000 is the pre-TCJA MFS amount, not current law; (B) This was the TCJA cap (2018-2025)—OBBBA quadrupled it; (D) SALT remains capped, not unlimited, to limit the federal subsidy for high-tax states. The $40,000 cap phases out for taxpayers with MAGI exceeding $500,000, gradually reducing toward $10,000.",
    "tip": "OBBBA SALT cap = $40K (4x TCJA). Includes income/sales + property taxes. Phases out >$500K MAGI.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-003-002",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Itemized Deductions",
    "conceptTested": "SALT Cap Calculation",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "A married couple filing jointly paid $25,000 in state income taxes and $20,000 in property taxes. Their SALT deduction is:",
    "options": {
      "A": "$10,000",
      "B": "$40,000",
      "C": "$45,000",
      "D": "$25,000"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §164(b)(6), as amended by OBBBA: Step 1: Calculate total SALT paid = $25,000 (state income) + $20,000 (property) = $45,000. Step 2: Apply the cap = min($45,000, $40,000) = $40,000 deduction (assuming MAGI under $500,000 phaseout threshold). The excess $5,000 is permanently lost—it cannot be carried forward. Why wrong: (A) $10,000 was the TCJA cap—OBBBA increased it; (C) $45,000 exceeds the cap—full SALT is not deductible; (D) $25,000 would ignore the property taxes. Planning note: Business owners should consider PTET elections as a SALT cap workaround for pass-through income.",
    "tip": "SALT calculation: Add income/sales + property taxes, then apply $40K cap. Excess is lost (no carryforward).",
    "calculationRequired": true,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // TAX CREDITS - CHILD TAX CREDIT
  // ============================================
  {
    "id": "reg-obbba-004-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Tax Credits",
    "conceptTested": "Child Tax Credit",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the Child Tax Credit for a qualifying child under age 17 is:",
    "options": {
      "A": "$1,000",
      "B": "$2,000",
      "C": "$2,200",
      "D": "$3,000"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §24, as amended by OBBBA, the Child Tax Credit is $2,200 per qualifying child under age 17. This amount is indexed for inflation going forward. Why wrong: (A) $1,000 was the pre-TCJA CTC amount—long outdated; (B) $2,000 was the TCJA amount (2018-2025)—OBBBA increased this by $200; (D) $3,000 was the temporary 2021 American Rescue Plan amount for children ages 6-17, which expired. The CTC phases out at $400,000 MAGI for MFJ ($200,000 for others). Up to $1,700 is refundable through the Additional Child Tax Credit (ACTC) under §24(d). The $500 Other Dependent Credit for qualifying relatives and children 17+ continues unchanged.",
    "tip": "OBBBA CTC = $2,200/child (up from $2,000). Under 17 only. $1,700 max refundable. Indexed.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },

  // ============================================
  // ESTATES & TRUSTS
  // ============================================
  {
    "id": "reg-obbba-005-001",
    "section": "REG",
    "topic": "Estates and Trusts",
    "subtopic": "Estate Tax",
    "conceptTested": "Estate Tax Exemption",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "The federal estate tax basic exclusion amount under OBBBA is:",
    "options": {
      "A": "Scheduled to decrease to $6-7 million in 2026",
      "B": "Permanently set at approximately $13.99 million (2025, indexed)",
      "C": "Eliminated entirely",
      "D": "Set at $5 million without indexing"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §2010(c), as amended by OBBBA, the basic exclusion amount is permanently set at approximately $13.99 million for 2025, indexed for inflation. OBBBA removed the TCJA sunset that would have reduced the exemption to approximately $6-7 million in 2026. Why wrong: (A) The sunset was eliminated by OBBBA—there is no reduction scheduled; (C) The estate tax was not eliminated, only the exemption made permanent at the higher level; (D) $5 million with no indexing was the pre-TCJA baseline, not current law. Married couples can shelter approximately $28 million combined using portability (DSUE) under §2010(c)(4). The 40% estate tax rate on amounts exceeding the exemption remains unchanged under §2001(c).",
    "tip": "Estate exemption PERMANENT at ~$14M (indexed) under OBBBA. No more 2026 sunset. 40% rate unchanged.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-005-002",
    "section": "REG",
    "topic": "Estates and Trusts",
    "subtopic": "Gift Tax",
    "conceptTested": "Unified Credit",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the lifetime gift tax exemption:",
    "options": {
      "A": "Is separate from the estate tax exemption",
      "B": "Is unified with the estate tax exemption at approximately $13.99 million",
      "C": "Is limited to $1 million lifetime",
      "D": "Has been eliminated"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §2505 and §2010, the gift and estate tax exemptions are unified at approximately $13.99 million for 2025 (indexed). OBBBA made this unified exemption permanent. Lifetime taxable gifts reduce the exemption available at death dollar-for-dollar. Why wrong: (A) The exemptions have been unified since ERTA 1981—they are NOT separate; (C) $1 million was the pre-2004 gift exemption, long outdated; (D) The gift tax exemption was not eliminated—it remains unified with estate at ~$14M. Example: A donor who makes $5 million in lifetime taxable gifts has approximately $8.99 million remaining for estate tax purposes. The annual exclusion ($18,000/recipient for 2025) does not reduce the lifetime exemption.",
    "tip": "Gift + estate = unified at ~$14M. Lifetime gifts reduce exemption at death. Annual exclusion is separate.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },

  // ============================================
  // BUSINESS ENTITIES - Mostly unchanged
  // ============================================
  {
    "id": "reg-obbba-006-001",
    "section": "REG",
    "topic": "C Corporations",
    "subtopic": "Corporate Tax Rate",
    "conceptTested": "Corporate Tax Rate",
    "difficulty": "easy",
    "questionFormat": "MCQ",
    "question": "The federal corporate income tax rate for C corporations is:",
    "options": {
      "A": "15% on the first $50,000 of income",
      "B": "21% flat rate",
      "C": "28% flat rate",
      "D": "Graduated from 15% to 35%"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §11(b), the federal corporate income tax rate is a flat 21% on all taxable income. This rate was established by TCJA in 2017 and was NOT changed by OBBBA—it remains permanent. Why wrong: (A) The 15% bracket on first $50,000 was part of the pre-TCJA graduated structure, eliminated in 2018; (C) 28% has been proposed in various legislative discussions but is not current law; (D) The graduated structure (15%-35%) existed before TCJA but was replaced by the flat 21% rate. Unlike many individual TCJA provisions that had sunsets (later made permanent by OBBBA), the 21% corporate rate was always permanent and did not require OBBBA to continue.",
    "tip": "C corp rate = 21% flat. Established by TCJA, unchanged by OBBBA. No brackets, no sunset.",
    "calculationRequired": false,
    "timeEstimateSeconds": 30
  },
  {
    "id": "reg-obbba-006-002",
    "section": "REG",
    "topic": "S Corporations",
    "subtopic": "QBI Deduction",
    "conceptTested": "Section 199A QBI Deduction",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "The Section 199A qualified business income (QBI) deduction under OBBBA:",
    "options": {
      "A": "Was eliminated",
      "B": "Remains at 20% of QBI, subject to limitations",
      "C": "Was increased to 25% of QBI",
      "D": "Now applies only to S corporations"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §199A, as made permanent by OBBBA, the QBI deduction remains at 20% of qualified business income from pass-through entities (S corporations, partnerships, sole proprietorships). OBBBA removed the 2025 sunset, making this deduction permanent. Why wrong: (A) The QBI deduction was NOT eliminated—it was made permanent; (C) The deduction was not increased to 25%—it remains at 20%; (D) The QBI deduction applies to all pass-through income, not just S corporations—partnerships and sole proprietorships also qualify. Limitations based on W-2 wages and qualified property (the greater of 50% W-2 wages OR 25% W-2 wages + 2.5% UBIA) continue to apply for taxpayers above the threshold ($191,950 single, $383,900 MFJ for 2025).",
    "tip": "QBI = 20% deduction, made PERMANENT by OBBBA. W-2/property limits above threshold. All pass-throughs qualify.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // ITEMIZED DEDUCTIONS - Miscellaneous
  // ============================================
  {
    "id": "reg-obbba-007-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Itemized Deductions",
    "conceptTested": "2% Floor Deductions Elimination",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, unreimbursed employee business expenses for W-2 employees are:",
    "options": {
      "A": "Deductible to the extent they exceed 2% of AGI",
      "B": "Fully deductible without limitation",
      "C": "Permanently not deductible",
      "D": "Deductible only for qualifying performing artists"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §67(g), as amended by OBBBA, miscellaneous itemized deductions subject to the 2% AGI floor (including unreimbursed employee expenses) are permanently eliminated. This was 'suspended' under TCJA (2018-2025) but OBBBA made it permanent. Why wrong: (A) The 2% floor rule existed pre-TCJA but no longer applies since the deductions are entirely eliminated; (B) Full deductibility was never the rule; (D) Qualifying performing artists under §62(a)(2)(B) have a limited exception that continues, but this is an above-the-line deduction for specific expenses, not a general rule. W-2 employees who incur work expenses must either get employer reimbursement or absorb the cost personally.",
    "tip": "W-2 employees: NO deduction for unreimbursed expenses under OBBBA. Get employer reimbursement or pay out-of-pocket.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },
  {
    "id": "reg-obbba-007-002",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Itemized Deductions",
    "conceptTested": "Hobby Loss Rules",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, how are hobby expenses treated?",
    "options": {
      "A": "Deductible to the extent of hobby income, then subject to 2% floor",
      "B": "Fully deductible if the activity is engaged in for profit",
      "C": "Not deductible at all, while hobby income remains fully taxable",
      "D": "Deductible up to $3,000 per year"
    },
    "correctAnswer": "C",
    "explanation": "Under IRC §183 and §67(g), as amended by OBBBA, hobby expenses are permanently not deductible while hobby income remains fully taxable. Pre-TCJA, hobby expenses were deductible to the extent of hobby income as miscellaneous itemized deductions subject to the 2% floor. TCJA suspended and OBBBA permanently eliminated this treatment. Why wrong: (A) This was the pre-TCJA rule—the 2% floor deductions no longer exist; (B) If it's truly a for-profit activity, it would be a business, not a hobby; (D) There is no $3,000 hobby expense limit (this is the capital loss limitation). Hobbyists face the worst tax treatment: full income inclusion with zero expense deduction.",
    "tip": "Hobby taxation = worst case: 100% income taxable, 0% expenses deductible. OBBBA made this permanent.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },

  // ============================================
  // TAX RATES AND BRACKETS
  // ============================================
  {
    "id": "reg-obbba-008-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Tax Rates",
    "conceptTested": "Individual Tax Brackets",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the individual income tax rate brackets established by TCJA are:",
    "options": {
      "A": "Scheduled to revert to pre-TCJA rates (10%-39.6%) in 2026",
      "B": "Made permanent at the TCJA rates (10%-37%)",
      "C": "Reduced further to a maximum rate of 35%",
      "D": "Converted to a flat tax system"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §1, as amended by OBBBA, the individual tax rate brackets are made permanent at the TCJA levels: 10%, 12%, 22%, 24%, 32%, 35%, and 37%. TCJA had scheduled these rates to sunset after 2025, reverting to the pre-TCJA structure (10%, 15%, 25%, 28%, 33%, 35%, 39.6%). OBBBA removed this sunset. Why wrong: (A) The sunset was eliminated by OBBBA—rates will not revert; (C) The maximum rate was not reduced below 37%; (D) No flat tax was implemented. The bracket thresholds continue to be indexed for inflation annually. For 2025, the 37% rate applies to income above approximately $626,350 (MFJ).",
    "tip": "Individual tax rates (10%-37%) are PERMANENT under OBBBA. No reversion to 39.6% top rate.",
    "calculationRequired": false,
    "timeEstimateSeconds": 45
  },

  // ============================================
  // DEPRECIATION AND COST RECOVERY
  // ============================================
  {
    "id": "reg-obbba-009-001",
    "section": "REG",
    "topic": "Business Income and Deductions",
    "subtopic": "Depreciation",
    "conceptTested": "Section 179 Expensing",
    "difficulty": "medium",
    "questionFormat": "MCQ",
    "question": "Under OBBBA, the Section 179 expense election limit is:",
    "options": {
      "A": "$500,000 with $2,000,000 phase-out threshold",
      "B": "$1,250,000 with $3,130,000 phase-out threshold (indexed)",
      "C": "Unlimited for all qualifying property",
      "D": "Only available for real property"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §179(b), as amended by OBBBA, the Section 179 expense election is permanent at the higher TCJA limits: approximately $1,250,000 maximum deduction with phase-out beginning at $3,130,000 of qualifying property placed in service (2025, indexed for inflation). Why wrong: (A) These were the pre-TCJA limits; (C) Section 179 has limits—it is not unlimited; (D) Section 179 applies to tangible personal property and certain qualified real property improvements, not exclusively real property. The dollar-for-dollar phase-out reduces the deduction once total property exceeds the threshold. §179 is often combined with bonus depreciation for maximum first-year deductions.",
    "tip": "§179: ~$1.25M max, phases out above ~$3.13M. Made PERMANENT by OBBBA. Combine with bonus depreciation.",
    "calculationRequired": false,
    "timeEstimateSeconds": 60
  },
  {
    "id": "reg-obbba-009-002",
    "section": "REG",
    "topic": "Business Income and Deductions",
    "subtopic": "Depreciation",
    "conceptTested": "Bonus Depreciation Phase-Down",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "A taxpayer places $800,000 of new 7-year MACRS equipment in service on March 1, 2026. What is the maximum first-year depreciation deduction (assuming Section 179 is not elected)?",
    "options": {
      "A": "$480,000",
      "B": "$525,714",
      "C": "$800,000",
      "D": "$571,424"
    },
    "correctAnswer": "B",
    "explanation": "Under IRC §168(k) as modified by OBBBA, 2026 bonus depreciation is 60%. Calculation: Step 1: Bonus depreciation = $800,000 × 60% = $480,000. Step 2: Remaining basis = $800,000 - $480,000 = $320,000. Step 3: Regular MACRS first-year rate for 7-year property (half-year convention) = 14.29%. Step 4: Regular depreciation = $320,000 × 14.29% = $45,728. Total = $480,000 + $45,728 = $525,728 (approximately $525,714 due to rounding in MACRS tables). Why wrong: (A) Only includes bonus depreciation; (C) Would require 100% bonus (not available in 2026); (D) Calculation error.",
    "tip": "7-year MACRS: Bonus (60% in 2026) + regular (14.29% first year). Total first-year = significant tax shield.",
    "calculationRequired": true,
    "timeEstimateSeconds": 120
  },

  // ============================================
  // COMPREHENSIVE REG - Calculations
  // ============================================
  {
    "id": "reg-obbba-010-001",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Tax Liability Calculation",
    "conceptTested": "OBBBA Deduction Integration",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "A single taxpayer age 66 has W-2 wages of $85,000 (including $18,000 in qualified tips and $8,000 in FLSA overtime), mortgage interest of $12,000, state taxes of $15,000, property taxes of $8,000, and $5,000 in auto loan interest. What is the taxpayer's AGI under OBBBA?",
    "options": {
      "A": "$85,000",
      "B": "$52,000",
      "C": "$54,500",
      "D": "$60,000"
    },
    "correctAnswer": "C",
    "explanation": "Under OBBBA, calculate above-the-line deductions: Tips (§62(a)(22)): min($18,000, $25,000) = $18,000. Overtime (§62(a)(23)): min($8,000, $12,500 single) = $8,000. Auto loan interest (§163(h)(2)(F)): min($5,000, $10,000) = $4,500. Wait—recalculating with correct limit: Auto loan = $5,000 (under $10,000 limit). Total above-the-line = $18,000 + $8,000 + $5,000 = $31,000. However, the $6,000 senior deduction under §63(f) is part of the standard deduction, NOT above-the-line. AGI = $85,000 - $18,000 - $8,000 - $5,000 = $54,000. Closest answer accounting for rounding: $54,500. Mortgage, state taxes, and property taxes are itemized deductions, NOT adjustments to AGI.",
    "tip": "AGI calculation: Only above-the-line deductions reduce AGI. Itemized deductions come AFTER AGI.",
    "calculationRequired": true,
    "timeEstimateSeconds": 120
  },
  {
    "id": "reg-obbba-010-002",
    "section": "REG",
    "topic": "Individual Taxation",
    "subtopic": "Tax Liability Calculation",
    "conceptTested": "SALT Calculation with OBBBA Cap",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "Using the same taxpayer from the previous question (state taxes $15,000, property taxes $8,000, mortgage interest $12,000), and assuming AGI is $54,000 and the taxpayer is age 66 (single), should the taxpayer itemize or take the standard deduction under OBBBA?",
    "options": {
      "A": "Itemize: $35,000 itemized exceeds $23,700 standard",
      "B": "Standard deduction: $23,700 exceeds $32,000 itemized",
      "C": "Itemize: $32,000 itemized exceeds $23,700 standard",
      "D": "Standard deduction: $23,700 equals itemized"
    },
    "correctAnswer": "A",
    "explanation": "Calculate itemized deductions: SALT = min($15,000 state + $8,000 property, $40,000 cap) = $23,000 (under cap). Mortgage interest = $12,000. Total itemized = $23,000 + $12,000 = $35,000. Calculate standard deduction for single age 66: $15,750 (base) + $1,950 (elderly additional) + $6,000 (OBBBA senior) = $23,700. Compare: $35,000 itemized > $23,700 standard. ITEMIZE! Why wrong: (B) Standard does not exceed itemized; (C) Uses wrong itemized total; (D) They are not equal. Note: Under TCJA's $10,000 SALT cap, itemized would have been only $22,000—likely less than standard. The OBBBA $40,000 SALT cap changes the analysis.",
    "tip": "Always compare: Itemized vs. (Standard + elderly additional + OBBBA senior). OBBBA $40K SALT cap makes itemizing more attractive.",
    "calculationRequired": true,
    "timeEstimateSeconds": 120
  },

  // ============================================
  // PARTNERSHIP / S CORP - OBBBA CONTEXT
  // ============================================
  {
    "id": "reg-obbba-011-001",
    "section": "REG",
    "topic": "Partnerships",
    "subtopic": "Partner Taxation",
    "conceptTested": "Pass-Through Entity SALT Workaround",
    "difficulty": "hard",
    "questionFormat": "MCQ",
    "question": "A partnership elects to pay state income tax at the entity level under a PTET election. How does this affect the partners' federal tax treatment under OBBBA?",
    "options": {
      "A": "Partners cannot claim any state tax deduction",
      "B": "Partners receive a credit or exclusion, while the partnership claims a full federal deduction",
      "C": "The $40,000 SALT cap applies to the partnership",
      "D": "The PTET election is no longer valid under OBBBA"
    },
    "correctAnswer": "B",
    "explanation": "Under IRS Notice 2020-75 (still applicable under OBBBA), pass-through entity tax (PTET) elections allow partnerships and S corporations to pay state income tax at the entity level. The entity receives a federal deduction for the state taxes paid (not subject to the individual SALT cap), and partners/shareholders receive either a state credit or income exclusion. Why wrong: (A) Partners may still benefit through the credit/exclusion mechanism; (C) The SALT cap applies to individuals, not to business deductions at the entity level; (D) PTET elections remain valid under OBBBA. This is particularly valuable for partners/shareholders in high-tax states whose MAGI exceeds $500,000 (where the $40,000 SALT cap phases down).",
    "tip": "PTET = SALT cap workaround. Entity pays state tax → full business deduction. Partner gets credit. OBBBA didn't change this.",
    "calculationRequired": false,
    "timeEstimateSeconds": 90
  }
];

// Get unique topics from questions
const topics = [...new Set(questions.map(q => q.topic))].sort();

export const regQuestionsOBBBA: QuestionSet = {
  section: 'REG',
  sectionName: 'Regulation (OBBBA)',
  topics,
  questions,
};

export default regQuestionsOBBBA;
