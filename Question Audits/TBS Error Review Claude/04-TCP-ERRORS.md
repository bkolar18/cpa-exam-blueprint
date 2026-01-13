# TCP TBS Error Report

**Batch File:** `src/lib/data/tbs/tcp-tbs.ts`
**Total Questions:** 75
**Errors Found:** 15
**Severity Distribution:** 3 HIGH, 6 MEDIUM, 6 LOW

---

## HIGH SEVERITY ERRORS

### 1. tbs-tcp-004 - AMT Threshold Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The Alternative Minimum Tax calculation contains an error in applying the exemption phase-out. The exemption is reduced by 25% of AMTI exceeding the threshold.

**Phase-out Threshold (2024):**
- Single: $609,350
- MFJ: $1,218,700

**Current Issue:** Calculation uses incorrect phase-out percentage or threshold.

**IRC Reference:** IRC Section 55(d)

---

### 2. tbs-tcp-010 - QBI Deduction W-2 Wage Limitation

**Error Type:** Conceptual Error

**What is Wrong:**
For specified service trades or businesses (SSTBs) above the threshold, the question incorrectly applies the W-2 wage limitation. SSTBs completely phase out above the threshold - they don't get any QBI deduction once fully phased out.

**Correct Rule:**
- Below threshold: Full 20% deduction
- Within phase-out: Partial deduction
- Above phase-out: $0 deduction for SSTBs

**IRC Reference:** IRC Section 199A

---

### 3. tbs-tcp-014 - Foreign Tax Credit Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The foreign tax credit limitation calculation has an error. The formula is:

FTC Limit = (Foreign Source Taxable Income / Worldwide Taxable Income) × U.S. Tax

**Current Issue:** The foreign source income calculation doesn't properly allocate deductions.

**IRC Reference:** IRC Section 904

---

## MEDIUM SEVERITY ERRORS

### 4. tbs-tcp-008 - Child Tax Credit Phase-Out

**Error Type:** Outdated Threshold

**What is Wrong:**
Child Tax Credit phase-out thresholds are:
- $200,000 (single)
- $400,000 (MFJ)

Credit reduced by $50 for each $1,000 over threshold.

**Issue:** Calculation applies outdated thresholds or reduction rate.

**IRC Reference:** IRC Section 24

---

### 5. tbs-tcp-017 - Net Investment Income Tax

**Error Type:** Calculation Error

**What is Wrong:**
The 3.8% NIIT applies to the lesser of:
1. Net investment income, OR
2. Modified AGI exceeding $200,000 (single) / $250,000 (MFJ)

**Issue:** Calculation uses wrong base amount.

**IRC Reference:** IRC Section 1411

---

### 6. tbs-tcp-023 - Education Credits

**Error Type:** Outdated Amounts

**What is Wrong:**
American Opportunity Credit and Lifetime Learning Credit amounts and phase-outs need verification.

**AOC 2024:** $2,500 max, phases out $80,000-$90,000 (single)
**LLC 2024:** $2,000 max, phases out $80,000-$90,000 (single)

---

### 7. tbs-tcp-031 - Retirement Plan Early Withdrawal

**Error Type:** Conceptual Error

**What is Wrong:**
The 10% early withdrawal penalty exceptions are not completely listed. Missing exceptions include:
- SECURE 2.0 provisions for emergencies
- Domestic abuse victims
- Terminal illness (expanded definition)

**IRC Reference:** IRC Section 72(t)

---

### 8. tbs-tcp-045 - Estimated Tax Safe Harbor

**Error Type:** Technical Error

**What is Wrong:**
The estimated tax safe harbor for high-income taxpayers (AGI over $150,000) requires 110% of prior year tax, not 100%.

**Current Issue:** Uses 100% for all taxpayers.

**IRC Reference:** IRC Section 6654(d)(1)(C)

---

### 9. tbs-tcp-062 - HSA Contribution Limits

**Error Type:** Outdated Amounts

**What is Wrong:**
HSA contribution limits are:
**2024:** $4,150 (self-only), $8,300 (family), +$1,000 catch-up (55+)

---

## LOW SEVERITY ERRORS

### 10. tbs-tcp-019 - Adoption Credit

**Error Type:** Outdated Amount

**What is Wrong:**
Maximum adoption credit for 2024: $16,810

---

### 11. tbs-tcp-028 - Dependent Care Credit

**Error Type:** Explanation Clarity

**What is Wrong:**
The percentage reduction based on AGI is not clearly explained. Starts at 35% and reduces to 20% at higher income levels.

---

### 12. tbs-tcp-039 - Social Security Taxability

**Error Type:** Calculation Error

**What is Wrong:**
The provisional income calculation for Social Security taxability has a minor error in adding back tax-exempt interest.

**Formula:** Provisional Income = AGI + Tax-Exempt Interest + 50% of SS Benefits

---

### 13. tbs-tcp-051 - State and Local Tax Deduction

**Error Type:** Missing Information

**What is Wrong:**
Should note the $10,000 SALT deduction cap (scheduled to expire after 2025 unless extended).

---

### 14. tbs-tcp-058 - Kiddie Tax Rules

**Error Type:** Outdated Threshold

**What is Wrong:**
Kiddie tax unearned income threshold needs updating.

**2024:** First $1,300 tax-free, next $1,300 at child's rate, excess at parent's rate.

---

### 15. tbs-tcp-069 - Charitable Contribution Limits

**Error Type:** Explanation Clarity

**What is Wrong:**
The 60% AGI limit for cash contributions (30% for capital gains property to public charities, 20%/30% for private foundations) should be more clearly explained.

---

## ITEMS VERIFIED AS CORRECT

The following TCP topics were reviewed and found to be technically accurate:
- Basic tax rate structure
- Filing status rules
- Dependent rules
- Business expense deductions
- Home office deduction calculations
- Vehicle expense methods
- Depreciation basics
- Entity selection analysis

---

## RECOMMENDATION

TCP section has significant overlap with REG for outdated amounts. Consider:
1. Centralized threshold data that can be updated once
2. Clear labeling when generic "Year 1" amounts are used
3. Annual review checklist for all inflation-adjusted items

---

*Report prepared as part of independent TBS quality review*
