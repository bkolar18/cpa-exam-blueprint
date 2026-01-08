# FAR Batch 039 Review: Income Taxes - Advanced Topics

## Batch Information
- **Topic:** Income Taxes - Advanced Topics
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Income Taxes (valid FAR topic)
- Comprehensive coverage of ASC 740 advanced topics

### Content Accuracy: MOSTLY PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-tax-adv-021: CALCULATION DOES NOT MATCH ANSWER

**Question:** Pretax book income $400,000. Depreciation: book $30,000, tax $50,000. Municipal interest $10,000. Tax rate 21%. What is current tax payable?

**Marked Answer:** A ($67,620)

**Issue:** The explanation in the question calculates:
- Taxable income = $400,000 - $20,000 (excess depreciation) - $10,000 (muni exempt) = $370,000
- Tax payable = $370,000 × 21% = **$77,700**

$77,700 is not among the answer choices. Answer A ($67,620) would require taxable income of $322,000.

**Note:** The explanation text itself contains "Let me reconsider..." language indicating uncertainty in the calculation.

**Recommendation:** Either:
1. Revise the question numbers to produce one of the answer choices, OR
2. Add $77,700 as an answer choice and mark it correct

---

### All Other Calculations Verified: PASS

| ID | Calculation | Result | Status |
|----|-------------|--------|--------|
| far-tax-adv-004 | DTL from depreciation | $3,750 | ✓ |
| far-tax-adv-005 | DTA from warranty | $4,200 | ✓ |
| far-tax-adv-008 | Rate change adjustment | $8,000 decrease | ✓ |
| far-tax-adv-010 | DTA for NOL | $21,000 | ✓ |
| far-tax-adv-014 | Tax on continuing ops | $125,000 | ✓ |
| far-tax-adv-035 | Net deferred tax | $16,800 net DTA | ✓ |

### Key Standards Verified (ASC 740):
- DTL/DTA creation from temporary differences ✓
- Permanent vs temporary differences ✓
- Valuation allowance (>50% threshold) ✓
- Sources of future taxable income ✓
- Rate change recognition (period enacted) ✓
- NOL carryforward (post-TCJA 80% limitation) ✓
- Tax credit carryforward DTA (at face value) ✓
- Intraperiod tax allocation ✓
- Uncertain tax positions (FIN 48/ASC 740-10) ✓
- Recognition threshold (more likely than not) ✓
- Measurement (largest amount >50%) ✓
- Noncurrent classification (ASU 2015-17) ✓
- Netting within same jurisdiction ✓
- Excess tax benefits from stock comp (ASU 2016-09) ✓
- Interim reporting (AETR method) ✓
- Outside basis differences (domestic vs foreign) ✓
- GILTI policy election ✓
- Non-deductible goodwill exception ✓
- Interest/penalties policy election ✓
- Intercompany profit elimination DTA ✓

### Issues Found: 1 (calculation inconsistency)

## Question Summary

### Difficulty Distribution:
- Easy: 0 questions
- Medium: 11 questions
- Hard: 24 questions

### Format Distribution:
- Conceptual: 28 questions
- Calculation: 7 questions

## Final Status: NEEDS REVIEW
34/35 questions pass. far-tax-adv-021 requires correction before deployment.
