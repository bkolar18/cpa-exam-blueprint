# FAR Batch 013 Review: Stock-Based Compensation

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-013-stock-compensation.json`
**Questions Reviewed:** 20

---

## Summary

| Category | Status |
|----------|--------|
| JSON Syntax | PASS |
| Required Fields | PASS |
| Taxonomy Accuracy | PASS |
| Question Quality | 20/20 PASS |
| Duplicate Check | PASS |

**Overall Assessment:** APPROVED

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully
- Note: This batch uses a wrapper structure with `batchInfo` and `questions` array (different from earlier batches but valid)

### 2. Required Fields Check
All 20 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Stock-Based Compensation" - VALID

**Subtopics Used:**
| Subtopic | Count |
|----------|-------|
| Stock Options Basics | 2 |
| Fair Value Methods | 1 |
| Stock Options Calculation | 2 |
| Forfeitures | 1 |
| Journal Entries | 1 |
| Exercise of Options | 1 |
| Restricted Stock/RSUs | 2 |
| Performance Conditions | 1 |
| Market Conditions | 1 |
| Modifications | 1 |
| Tax Effects | 1 |
| Stock Appreciation Rights | 1 |
| Employee Stock Purchase Plans | 1 |
| Nonemployee Awards | 1 |
| Option Expiration | 1 |
| Black-Scholes Inputs | 1 |
| Service Conditions | 1 |

---

## Content Accuracy Review

### Key ASC 718 Standards Verified

| Concept | Question | Status |
|---------|----------|--------|
| Grant date = measurement date | far-stock-001 | CORRECT |
| Expense over requisite service period | far-stock-002 | CORRECT |
| Forfeiture policy election (ASU 2016-09) | far-stock-005 | CORRECT |
| Performance conditions = expense if probable | far-stock-010 | CORRECT |
| Market conditions = baked into fair value | far-stock-011 | CORRECT |
| Cash-settled = liability, remeasure | far-stock-015 | CORRECT |
| ESPP noncompensatory ≤5% discount | far-stock-016 | CORRECT |
| Nonemployee = same as employee (ASU 2018-07) | far-stock-017 | CORRECT |
| Expired vested options = no reversal | far-stock-018 | CORRECT |

### Critical Distinction: Performance vs Market Conditions

**Performance Conditions (far-stock-010):**
- Expense recognized only if probable of achievement
- Adjust expense each period based on probability
- True-up when outcome known

**Market Conditions (far-stock-011):**
- Incorporated into grant-date fair value
- Expense recognized regardless of whether condition is met
- No true-up at outcome

Both correctly explained.

---

## Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-stock-004 | Basic option expense | $80,000 ÷ 4 years = $20,000 | CORRECT |
| far-stock-007 | Exercise journal entry | $25,000 + $10,000 = $35,000 | CORRECT |
| far-stock-012 | Graded vesting (accelerated) | $36K + $18K + $12K = $66,000 | CORRECT |

### Detailed Calculation: far-stock-012 (Graded Vesting)

Using accelerated attribution method (each tranche as separate award):

| Tranche | Options | FV | Vesting | Year 1 Expense |
|---------|---------|-----|---------|----------------|
| 1 (vests Y1) | 3,000 | $12 | 1 year | $36,000 (100%) |
| 2 (vests Y2) | 3,000 | $12 | 2 years | $18,000 (50%) |
| 3 (vests Y3) | 3,000 | $12 | 3 years | $12,000 (33%) |
| **Total** | | | | **$66,000** ✓ |

### Detailed Calculation: far-stock-007 (Option Exercise)

- Cash received: 1,000 × $25 = $25,000
- APIC—Stock Options reclassified: 1,000 × $10 = $10,000
- Total credits to equity: $35,000
  - Common Stock (par): 1,000 × $1 = $1,000
  - APIC—Common Stock: $34,000

**Answer: $35,000** ✓

---

## No Issues Found

All 20 questions are accurate and well-constructed.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 5 | 25% |
| Medium | 10 | 50% |
| Hard | 5 | 25% |

**Assessment:** Good distribution for stock compensation complexity.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 17 |
| calculation | 3 |

---

## Notable Strengths

1. **Current guidance included** - ASU 2016-09 (forfeitures) and ASU 2018-07 (nonemployees)
2. **Performance vs market conditions** - Critical distinction clearly tested
3. **Graded vesting** - Accelerated method calculation included
4. **Comprehensive coverage** - Options, restricted stock, RSUs, SARs, ESPPs all covered
5. **Tax effects** - DTA treatment during vesting period addressed

---

## Final Recommendation

**APPROVED FOR USE**

Excellent batch with no corrections needed.
