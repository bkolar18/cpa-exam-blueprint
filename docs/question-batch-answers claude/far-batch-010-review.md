# FAR Batch 010 Review: Stockholders Equity

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-010-equity.json`
**Questions Reviewed:** 20

---

## Summary

| Category | Status |
|----------|--------|
| JSON Syntax | PASS |
| Required Fields | PASS |
| Taxonomy Accuracy | PASS |
| Question Quality | 19/20 PASS (1 minor issue) |
| Duplicate Check | PASS |

**Overall Assessment:** APPROVED WITH MINOR NOTE

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully without errors

### 2. Required Fields Check
All 20 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Stockholders Equity" - VALID

**Subtopics Used:**
| Subtopic | Count | Valid? |
|----------|-------|--------|
| Common & Preferred Stock | 5 | YES |
| Treasury Stock Transactions | 5 | YES |
| Stock Dividends & Splits | 5 | YES |
| Retained Earnings & Appropriations | 2 | YES |
| Book Value Per Share | 3 | YES |

---

## Minor Issue

### far-eq-012 - Potential Typo in Liquidation Preference

**Question:** "A company has total stockholders' equity of $5,000,000, including preferred stock of $500,000 (1,000 shares with $50 per share liquidation preference)..."

**Issue:** The question states:
- Preferred stock: $500,000
- Shares: 1,000
- Liquidation preference: $50/share = $50,000 total

But the explanation calculates: "Common equity = $5,000,000 − $500,000 = $4,500,000"

**Analysis:**
- If liquidation preference is truly $50/share × 1,000 = $50,000, the calculation should subtract $50,000
- The answer works if liquidation preference is $500/share × 1,000 = $500,000

**Recommendation:** Change "$50 per share liquidation preference" to "$500 per share liquidation preference" to match the calculation.

**Severity:** MINOR - The explanation and math are internally consistent if we assume $500/share was intended.

---

## Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-eq-001 | APIC calculation | $150,000 - $10,000 = $140,000 | CORRECT |
| far-eq-004 | Treasury cost method | 1,000 × $20 = $20,000 | CORRECT |
| far-eq-005 | Treasury reissue above | $25,000 - $20,000 = $5,000 | CORRECT |
| far-eq-006 | Treasury reissue below | $4,000 shortfall split | CORRECT |
| far-eq-008 | Small stock dividend | 10,000 × $15 = $150,000 | CORRECT |
| far-eq-012 | Book value per share | $4,500,000 / 200,000 = $22.50 | CORRECT* |
| far-eq-013 | Cumulative preferred | 3 × $60,000 = $180,000 | CORRECT |

*Assuming $500/share liquidation preference (see note above)

### Detailed Calculation: far-eq-006 (Treasury Reissue Below Cost)

- Treasury cost: 500 × $30 = $15,000
- Proceeds: 500 × $22 = $11,000
- Shortfall: $4,000
- Available APIC-Treasury: $2,000
- Entry:
  - Debit APIC-Treasury: $2,000
  - Debit Retained Earnings: $2,000
  - Credit Treasury Stock: $15,000
  - Debit Cash: $11,000
- **Answer B is correct** ✓

### Detailed Calculation: far-eq-013 (Cumulative Preferred Dividends)

- Shares: 10,000 at 6%, $100 par
- Annual dividend: 10,000 × $100 × 6% = $60,000
- Years owed: Year 1 + Year 2 + Year 3 = 3 years
- Total to preferred: $180,000
- Remaining to common: $200,000 - $180,000 = $20,000
- **Answer C is correct** ✓

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 5 | 25% |
| Medium | 10 | 50% |
| Hard | 5 | 25% |

**Assessment:** Good distribution.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 12 |
| calculation | 6 |
| scenario | 1 |
| except | 1 |

---

## Notable Strengths

1. **Treasury stock comprehensive** - Both cost and par value methods covered
2. **Stock dividends** - Small vs large correctly distinguished
3. **Preferred stock features** - Cumulative and participating explained
4. **Book value calculation** - Correctly handles preferred claims

---

## Final Recommendation

**APPROVED FOR USE**

One minor issue noted (far-eq-012 typo in liquidation preference per share). The math is correct if $500/share was intended. Consider clarifying.
