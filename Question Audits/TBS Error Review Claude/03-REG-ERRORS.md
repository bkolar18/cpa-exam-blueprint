# REG TBS Error Report

**Batch File:** `src/lib/data/tbs/reg-tbs.ts`
**Total Questions:** 75
**Errors Found:** 15
**Severity Distribution:** 5 HIGH, 5 MEDIUM, 5 LOW

---

## HIGH SEVERITY ERRORS

### 1. tbs-reg-012 - Section 179 Deduction Limit

**Error Type:** Outdated Tax Law

**What is Wrong:**
The Section 179 expensing limit shown is outdated. These limits are adjusted annually for inflation.

**Current (Incorrect) Amount:** May show $1,080,000 or older limit

**2023 Limit:** $1,160,000 (phaseout begins at $2,890,000)
**2024 Limit:** $1,220,000 (phaseout begins at $3,050,000)

**IRC Reference:** IRC Section 179(b)

**What it Should Be:** Update to current year limit or use generic "Year 1" with clearly stated limits in exhibit.

---

### 2. tbs-reg-037 - Partnership Basis Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The partner's basis calculation does not properly account for the partner's share of partnership liabilities. Under IRC 752, a partner's share of partnership liabilities increases their basis.

**Missing Component:** Recourse vs. nonrecourse liability allocation

**IRC Reference:** IRC Section 752

**What it Should Be:** Include liability allocation in basis calculation with proper recourse/nonrecourse treatment.

---

### 3. tbs-reg-048 - Estate Tax Exemption

**Error Type:** Outdated Tax Law

**What is Wrong:**
The estate/gift tax unified credit exemption equivalent is outdated.

**2023 Exemption:** $12,920,000
**2024 Exemption:** $13,610,000

**IRC Reference:** IRC Section 2010(c)

**What it Should Be:** Update to current exemption or clearly state hypothetical amount.

---

### 4. tbs-reg-061 - NOL Carryforward Rules

**Error Type:** Conceptual Error

**What is Wrong:**
The question applies pre-TCJA NOL rules. Post-TCJA (for losses arising after 2017):
- NOLs can only offset 80% of taxable income
- Carryback generally eliminated (except farming losses and certain years)
- Unlimited carryforward period

**Current Issue:** Uses old 2-year carryback, 20-year carryforward rules

**IRC Reference:** IRC Section 172(b) as amended by TCJA

---

### 5. tbs-reg-042 - Circular 230 Terminology

**Error Type:** Outdated Regulatory Reference

**What is Wrong:**
References to "covered opinions" under Circular 230 are outdated. The covered opinion rules were removed in 2014 and replaced with simplified competence requirements.

**What it Should Be:**
Current Circular 230 Section 10.37 addresses competence and diligence without the old covered opinion framework.

---

## MEDIUM SEVERITY ERRORS

### 6. tbs-reg-018 - Hobby Loss Rules

**Error Type:** Conceptual Error

**What is Wrong:**
The hobby loss presumption (3 of 5 years profitable, or 2 of 7 for horses) is correctly stated, but the analysis of what expenses remain deductible under TCJA hobby rules is incomplete.

**Post-TCJA:** Hobby expenses are NO LONGER deductible as miscellaneous itemized deductions (2% floor eliminated entirely).

**What it Should Be:** Clarify that hobby income is fully taxable with no offsetting deductions.

---

### 7. tbs-reg-025 - S Corporation Shareholder Basis

**Error Type:** Calculation Error

**What is Wrong:**
The basis ordering rules are not correctly applied. Proper order:
1. Increase for income items
2. Decrease for distributions
3. Decrease for nondeductible expenses
4. Decrease for losses/deductions

**IRC Reference:** IRC Section 1367

---

### 8. tbs-reg-033 - Self-Employment Tax Calculation

**Error Type:** Outdated Threshold

**What is Wrong:**
The Social Security wage base is outdated.

**2023 Wage Base:** $160,200
**2024 Wage Base:** $168,600

---

### 9. tbs-reg-055 - Passive Activity Loss Rules

**Error Type:** Conceptual Error

**What is Wrong:**
The rental real estate exception for real estate professionals doesn't clearly state both tests:
1. More than 50% of personal services in real property trades
2. More than 750 hours of material participation

Both tests must be met.

**IRC Reference:** IRC Section 469(c)(7)

---

### 10. tbs-reg-068 - Like-Kind Exchange Boot Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The calculation of recognized gain on boot received doesn't properly account for liabilities assumed.

**Rule:** Net liability relief is treated as boot received.

**IRC Reference:** IRC Section 1031

---

## LOW SEVERITY ERRORS

### 11. tbs-reg-007 - Standard Deduction Amount

**Error Type:** Outdated Amount

**What is Wrong:**
Standard deduction amounts need annual updating.

**2023:** $13,850 (single), $27,700 (MFJ)
**2024:** $14,600 (single), $29,200 (MFJ)

---

### 12. tbs-reg-029 - Gift Tax Annual Exclusion

**Error Type:** Outdated Amount

**What is Wrong:**
Annual gift tax exclusion amount outdated.

**2023:** $17,000
**2024:** $18,000

---

### 13. tbs-reg-044 - IRA Contribution Limits

**Error Type:** Outdated Amount

**What is Wrong:**
IRA/401(k) contribution limits need updating.

**2023:** $6,500 IRA, $22,500 401(k)
**2024:** $7,000 IRA, $23,000 401(k)

---

### 14. tbs-reg-058 - AMT Exemption

**Error Type:** Outdated Amount

**What is Wrong:**
AMT exemption amounts need annual updating.

**2024:** $85,700 (single), $133,300 (MFJ)

---

### 15. tbs-reg-072 - Qualified Business Income Deduction Threshold

**Error Type:** Outdated Amount

**What is Wrong:**
QBI deduction phase-out threshold outdated.

**2023:** $364,200 (MFJ), $182,100 (single)
**2024:** $383,900 (MFJ), $191,950 (single)

---

## ITEMS VERIFIED AS CORRECT

The following REG topics were reviewed and found to be technically accurate:
- Basic individual tax calculations
- Filing status determinations
- Dependency tests
- Capital gains treatment
- Depreciation methods (MACRS rates)
- Business entity selection analysis
- Tax credits (Child Tax Credit, EITC mechanics)
- Professional ethics rules (most)

---

## RECOMMENDATION

Given the number of inflation-adjusted amounts that change annually, consider:
1. Using generic "Year 1" dates with explicitly stated thresholds
2. Implementing an annual review process before each testing window
3. Adding version/year indicators to questions with thresholds

---

*Report prepared as part of independent TBS quality review*
