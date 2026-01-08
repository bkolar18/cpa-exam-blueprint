# FAR Batch 027 Review: Advanced Calculations - Mixed Topics

## Batch Information
- **Topic:** Advanced Calculations - Mixed Topics
- **Questions:** 30
- **Weight:** Various
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Multiple topics covered (mixed calculation review)

### Content Accuracy: PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-calc-005: QUESTIONABLE DV-LIFO CALCULATION

**Question:** Base year inventory at base-year cost: $100,000. Current year inventory at current-year cost: $132,000. Current price index: 110. What is ending inventory at DV LIFO?

**Marked Answer:** C ($110,000)

**Issue:** The standard DV-LIFO calculation should yield $122,000, not $110,000:
1. Current year at base prices: $132,000 ÷ 1.10 = $120,000
2. Layer increase at base: $120,000 - $100,000 = $20,000
3. New layer at current index: $20,000 × 1.10 = $22,000
4. Total: $100,000 + $22,000 = **$122,000**

The explanation is internally inconsistent, stating both "$20,000 × 1.10 = $22,000" and then "Using standard DV-LIFO: $100,000 base + $10,000 layer = $110,000."

**Recommendation:** Review the question setup or answer. Either:
- Change answer to reflect $122,000 (would need new option), OR
- Revise the numbers to make $110,000 correct, OR
- Clarify if a non-standard DV-LIFO approach is intended

---

### All Other Calculations Verified: PASS

| ID | Calculation | Verified |
|----|-------------|----------|
| far-calc-001 | Expected value rebate | $94,000 ✓ |
| far-calc-002 | Bond proceeds | $924,280 ✓ |
| far-calc-003 | Pension expense | $60,000 ✓ |
| far-calc-004 | Lease liability PV | $84,240 ✓ |
| far-calc-006 | Deferred tax | $5,000 DTL ✓ |
| far-calc-007 | Equity method income | $54,000 ✓ |
| far-calc-008 | Factoring cash | $460,000 ✓ |
| far-calc-009 | ARO liability | $156,000 ✓ |
| far-calc-010 | NCI balance | $420,000 ✓ |
| far-calc-011 | Revenue with financing | $85,700 ✓ |
| far-calc-012 | Large stock dividend | $150,000 ✓ |
| far-calc-013 | Treasury reissuance | $5,000 debit ✓ |
| far-calc-014 | Credit loss HTM | $10,000 ✓ |
| far-calc-015 | Operating cash flows | $183,000 ✓ |
| far-calc-016 | Goodwill impairment | $300,000 ✓ |
| far-calc-017 | FX gain/loss | $2,500 gain ✓ |
| far-calc-018 | Interest expense | $96,000 ✓ |
| far-calc-019 | NRV valuation | $47,000 ✓ |
| far-calc-020 | Contract cost amort | $5,000 ✓ |
| far-calc-021 | Lease interest | $8,000 ✓ |
| far-calc-022 | Capitalized interest | $74,000 ✓ |
| far-calc-023 | Convertible bond APIC | $470,000 ✓ |
| far-calc-024 | Diluted EPS | $3.67 ✓ |
| far-calc-025 | Fund balance | $400,000 ✓ |
| far-calc-026 | Multi-year pledge PV | $136,150 ✓ |
| far-calc-027 | Valuation allowance | $40,000 ✓ |
| far-calc-028 | AFS OCI | $4,000 ✓ |
| far-calc-029 | Bargain purchase gain | $100,000 ✓ |
| far-calc-030 | Impairment test | $100,000 ✓ |

### Issues Found: 1 (questionable calculation)

## Question Summary

### Difficulty Distribution:
- Medium: 4 questions
- Hard: 26 questions

### Format Distribution:
- Calculation: 30 questions

## Final Status: NEEDS REVIEW
29/30 calculations verified correct. far-calc-005 (DV-LIFO) has inconsistent explanation and potentially incorrect answer.
