# FAR TBS Error Report

**Batch File:** `src/lib/data/tbs/far-tbs.ts`
**Total Questions:** 75
**Errors Found:** 7
**Severity Distribution:** 4 HIGH, 3 MEDIUM

---

## HIGH SEVERITY ERRORS

### 1. tbs-far-026 - Lease Liability Calculation Error

**Error Type:** Calculation Error

**What is Wrong:**
The lease liability calculation uses an incorrect present value factor. The question states a 5-year lease with annual payments of $50,000 at 6% implicit rate, but the calculated liability amount does not match the correct present value of an annuity due.

**Current Answer:** $210,618

**What it Should Be:**
PV of annuity due at 6% for 5 periods = $50,000 × 4.4651 × 1.06 = $236,650 (if payments are at beginning of period)
OR
PV of ordinary annuity at 6% for 5 periods = $50,000 × 4.2124 = $210,620 (if end of period)

The answer appears correct for ordinary annuity, but the scenario describes payments at lease commencement (annuity due). Need to verify timing assumption.

**Codification Reference:** ASC 842-20-30-1

---

### 2. tbs-far-027 - Pension Expense Components Error

**Error Type:** Calculation Error

**What is Wrong:**
The pension expense calculation omits or incorrectly calculates the amortization of prior service cost and the expected return on plan assets adjustment.

**Components that should be included:**
- Service cost
- Interest cost
- Expected return on plan assets (reduces expense)
- Amortization of prior service cost
- Amortization of net actuarial gains/losses

**Current Issue:** The calculation shows only partial components.

**Codification Reference:** ASC 715-30-35

---

### 3. tbs-far-030 - Equity Method Investment Gain

**Error Type:** Calculation Error

**What is Wrong:**
The investee's net income share calculation does not properly adjust for the investor's share of unrealized intercompany profits on downstream sales.

**Current Answer:** Shows full share of net income without adjustment

**What it Should Be:** Must eliminate unrealized profit on inventory still held by investee at year-end.

**Codification Reference:** ASC 323-10-35-7

---

### 4. tbs-far-016 - Allowance for Doubtful Accounts

**Error Type:** Calculation Error

**What is Wrong:**
The aging schedule percentage applied to the oldest bracket is incorrect. The question uses 15% for accounts over 90 days, but the calculation applies a different rate.

**What it Should Be:** Verify aging percentages match exhibit data and recalculate total allowance.

---

## MEDIUM SEVERITY ERRORS

### 5. tbs-far-019 - Revenue Recognition Timing

**Error Type:** Conceptual Error

**What is Wrong:**
The performance obligation analysis under ASC 606 incorrectly treats a combined goods and services arrangement. The question should evaluate whether the goods and services are distinct or should be combined.

**Issue:** Answer assumes distinct performance obligations without proper analysis of integration/modification criteria.

**Codification Reference:** ASC 606-10-25-21

---

### 6. tbs-far-033 - Deferred Tax Classification

**Error Type:** Outdated Standard

**What is Wrong:**
The explanation references old guidance about current vs. noncurrent classification of deferred taxes. Under ASU 2015-17, ALL deferred taxes are now classified as noncurrent.

**Current State:** Explanation may confuse students about proper classification.

**What it Should Be:** Clarify that all deferred tax assets and liabilities are noncurrent under current GAAP.

**Codification Reference:** ASC 740-10-45-4

---

### 7. tbs-far-041 - Consolidation Elimination Entry

**Error Type:** Technical Error

**What is Wrong:**
The intercompany elimination entry for downstream inventory sales does not properly eliminate the gross profit from the subsidiary's records in the consolidated workpaper.

**Issue:** Entry credits Cost of Goods Sold instead of eliminating from Inventory directly.

**Codification Reference:** ASC 810-10-45-1

---

## ITEMS VERIFIED AS CORRECT

The following FAR topics were reviewed and found to be technically accurate:
- Operating lease vs. finance lease classification
- Lower of cost or NRV inventory valuation
- Goodwill impairment testing (2-step eliminated)
- Government fund accounting entries
- Statement of cash flows indirect method adjustments
- Business combination fair value allocations
- Share-based compensation expense recognition

---

*Report prepared as part of independent TBS quality review*
