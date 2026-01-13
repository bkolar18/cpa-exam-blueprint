# FAR Batch 011 Review: Income Taxes

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-011-income-taxes.json`
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
- File parsed successfully without errors

### 2. Required Fields Check
All 20 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Income Taxes" - VALID

**Subtopics Used:**
| Subtopic | Count | Valid? |
|----------|-------|--------|
| Deferred Tax Assets & Liabilities | 9 | YES |
| Temporary vs Permanent Differences | 4 | YES |
| Valuation Allowance | 3 | YES |
| Intraperiod Tax Allocation | 2 | YES |
| Uncertain Tax Positions | 2 | YES |

---

## Content Accuracy Review

### Key Standards Verified

| Standard | Question | Status |
|----------|----------|--------|
| ASU 2015-17 (all deferred taxes noncurrent) | far-tax-014 | CORRECT |
| Enacted rate for measurement | far-tax-010 | CORRECT |
| More likely than not threshold | far-tax-006, far-tax-009 | CORRECT |
| Rate change adjustment through income | far-tax-011 | CORRECT |

### Critical Concepts Verified

**Deferred Tax Assets vs Liabilities:**
- far-tax-001: DTL when book > taxable income (correct)
- far-tax-002: DTA when taxable > book income (correct)

**Temporary vs Permanent Differences:**
- far-tax-003/004: Correctly distinguishes depreciation (temporary) from municipal interest, fines, officer life insurance (permanent)

**Valuation Allowance:**
- far-tax-006: More likely than not standard (correct)
- far-tax-007: Correctly lists four sources of taxable income for DTA realization

**Uncertain Tax Positions (ASC 740):**
- far-tax-009: Two-step model correctly described
- far-tax-016: Interest/penalties policy choice correctly stated

---

## Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-tax-005 | DTL calculation | $40,000 × 25% = $10,000 | CORRECT |
| far-tax-011 | Rate change | $100K/25% × 21% = $84K; reduce by $16K | CORRECT |
| far-tax-015 | OCI tax effect | $50,000 × 75% = $37,500 net | CORRECT |
| far-tax-017 | Warranty DTA | $100,000 × 21% = $21,000 | CORRECT |

### Detailed Calculation: far-tax-011 (Tax Rate Change)

- Original DTL: $100,000 at 25% rate
- Implied temporary difference: $100,000 / 0.25 = $400,000
- New DTL at 21%: $400,000 × 0.21 = $84,000
- Reduction in DTL: $100,000 - $84,000 = **$16,000** ✓
- Entry: Dr DTL $16,000, Cr Tax Benefit $16,000

---

## No Issues Found

All 20 questions are accurate and well-constructed.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 4 | 20% |
| Medium | 11 | 55% |
| Hard | 5 | 25% |

**Assessment:** Good distribution for income tax complexity.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 14 |
| calculation | 3 |
| scenario | 2 |
| except | 2 |

---

## Notable Strengths

1. **Current guidance on presentation** - ASU 2015-17 (all deferred taxes noncurrent) correctly stated
2. **Complete coverage of temporary vs permanent** - Clear examples of each
3. **Valuation allowance well covered** - Sources of taxable income, more likely than not threshold
4. **Uncertain tax positions** - Two-step model and interest/penalties treatment included

---

## Final Recommendation

**APPROVED FOR USE**

Excellent batch with no corrections needed.
