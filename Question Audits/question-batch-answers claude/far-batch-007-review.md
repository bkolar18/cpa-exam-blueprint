# FAR Batch 007 Review: Investments

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-007-investments.json`
**Questions Reviewed:** 25

---

## Summary

| Category | Status |
|----------|--------|
| JSON Syntax | PASS |
| Required Fields | PASS |
| Taxonomy Accuracy | PASS |
| Question Quality | 25/25 PASS |
| Duplicate Check | PASS |

**Overall Assessment:** APPROVED

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully without errors

### 2. Required Fields Check
All 25 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Investments" - VALID

**Subtopics Used:**
| Subtopic | Count | Valid? |
|----------|-------|--------|
| Debt Securities Classification | 9 | YES |
| Equity Method Investments | 10 | YES |
| Equity Securities at Fair Value | 2 | YES |
| Fair Value Option | 2 | YES |
| Impairment of Investments | 2 | YES |

All subtopics correctly match the taxonomy definition.

---

## Content Accuracy Review

### Critical Standards Verified

**Debt Securities Classification:**
- **HTM (far-inv-sec-001, 002):** Correctly requires intent AND ability; measured at amortized cost
- **Trading (far-inv-sec-003):** Correctly measured at FV through net income
- **AFS (far-inv-sec-004):** Correctly measured at FV through OCI

**Equity Method:**
- **far-inv-sec-005:** Correctly identifies 20-50% with significant influence
- **far-inv-sec-007:** Correctly states dividends reduce investment (not income)
- **far-inv-sec-009:** Correctly handles excess over book value amortization
- **far-inv-sec-015:** Correctly handles intercompany profit elimination
- **far-inv-sec-021:** Correctly states embedded goodwill is not separately amortized

**Equity Securities (ASC 321):**
- **far-inv-sec-010:** Correctly describes measurement alternative for non-readily determinable FV
- **far-inv-sec-011:** Correctly states equity securities go through net income (not OCI)

**CECL Model:**
- **far-inv-sec-013:** Correctly describes AFS credit loss allowance under CECL
- **far-inv-sec-014:** Correctly describes HTM lifetime expected credit losses

### Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-inv-sec-007 | Equity income | 30% × $500K = $150K | CORRECT |
| far-inv-sec-008 | Investment balance | $1M + $100K - $20K = $1.08M | CORRECT |
| far-inv-sec-009 | Excess amortization | $200K / 10 = $20K | CORRECT |
| far-inv-sec-011 | FV gain | $62K - $50K = $12K | CORRECT |
| far-inv-sec-015 | Intercompany profit | 40% × $10K = $4K | CORRECT |
| far-inv-sec-019 | Premium amortization | $8K - $1.6K = $6.4K | CORRECT |
| far-inv-sec-020 | Discount amortization | $6K + $500 = $6.5K | CORRECT |
| far-inv-sec-023 | AFS sale gain | $90K - $80K = $10K | CORRECT |

### Detailed Calculation Verification

**far-inv-sec-008 (Equity Method Balance):**
- Initial investment: $1,000,000
- Share of income: 25% × $400,000 = $100,000
- Dividends received: 25% × $80,000 = $20,000
- Ending: $1,000,000 + $100,000 - $20,000 = **$1,080,000** ✓

**far-inv-sec-009 (Excess Over Book Value):**
- Cost paid: $2,000,000
- Share of BV: 40% × $4,000,000 = $1,600,000
- Excess: $400,000
- Investor's share of equipment undervaluation: 40% × $500,000 = $200,000
- Annual amortization: $200,000 / 10 = **$20,000** ✓

**far-inv-sec-015 (Intercompany Profit):**
- Intercompany profit: $20,000
- Unsold portion: 50%
- Unrealized profit: $10,000
- Investor's share: 40% × $10,000 = **$4,000** ✓

---

## No Issues Found

All 25 questions are accurate and well-constructed.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 6 | 24% |
| Medium | 12 | 48% |
| Hard | 7 | 28% |

**Assessment:** Good distribution for investments topic.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 15 |
| calculation | 7 |
| scenario | 2 |
| except | 1 |

---

## Notable Strengths

1. **Current CECL guidance:** Includes expected credit loss model for both HTM and AFS
2. **Equity method complexity:** Covers excess value, intercompany profits, embedded goodwill
3. **Equity securities under ASC 321:** Correctly distinguishes from debt securities treatment
4. **Premium/discount amortization:** Good calculation practice questions

---

## Final Recommendation

**APPROVED FOR USE**

Excellent batch with no corrections needed.
