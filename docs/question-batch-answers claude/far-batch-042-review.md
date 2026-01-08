# FAR Batch 042 Review: Mixed Calculation Problems - Set 2

## Batch Information
- **Topic:** Mixed Calculation Problems - Set 2
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Multiple FAR topics covered (Leases, Business Combinations, Consolidation, Investments, Revenue, Depreciation, Intangibles, Bonds, Equity, EPS, Pensions, Government, NFP, Cash Flows, Taxes, Inventory, Foreign Currency, PPE, Stock Comp, Derivatives, Ratios)

### Content Accuracy: MOSTLY PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-calc2-009: CALCULATION INCONSISTENCY

**Question:** Asset cost $200,000, salvage $20,000, original 10-year life. After 4 years, remaining life changed to 4 years. What is Year 5 depreciation?

**Marked Answer:** C ($28,000)

**Correct Calculation:**
- Original annual = ($200,000 - $20,000) / 10 = $18,000
- Accumulated after 4 years = $72,000
- CV at change = $200,000 - $72,000 = $128,000
- New annual = ($128,000 - $20,000) / 4 = $108,000 / 4 = **$27,000**

**Note:** The explanation in the question itself acknowledges the calculation yields $27,000 but says "Closest is $28,000" - this is inconsistent.

**Required Fix:** Either change answer to reflect $27,000 or adjust question numbers.

---

### All Other Calculations Verified: PASS

| ID | Topic | Calculation | Status |
|----|-------|-------------|--------|
| far-calc2-001 | Leases | Operating ROU amort | ✓ |
| far-calc2-002 | Leases | Finance lease expense | ✓ |
| far-calc2-003 | Business Comb | Goodwill | ✓ |
| far-calc2-004 | Business Comb | Bargain purchase | ✓ |
| far-calc2-005 | Consolidation | Goodwill impairment | ✓ |
| far-calc2-006 | Investments | AFS unrealized | ✓ |
| far-calc2-007 | Revenue | Expected value | ✓ |
| far-calc2-008 | Revenue | Refund liability | ✓ |
| far-calc2-010 | Intangibles | Patent amortization | ✓ |
| far-calc2-011 | Bonds | Early retirement | ✓ |
| far-calc2-012 | Equity | Stock dividend | ✓ |
| far-calc2-013 | Equity | Stock split | ✓ |
| far-calc2-014 | EPS | Convertible adjustment | ✓ |
| far-calc2-015 | Pensions | Corridor amortization | ✓ |
| far-calc2-016 | Government | Encumbrances | ✓ |
| far-calc2-017 | NFP | Multi-year pledge | ✓ |
| far-calc2-018 | Cash Flows | Equipment purchase | ✓ |
| far-calc2-019 | Deferred Taxes | Rate change | ✓ |
| far-calc2-020 | Inventory | Gross profit method | ✓ |
| far-calc2-021 | Foreign Currency | Payable loss | ✓ |
| far-calc2-022 | PPE | Basket purchase | ✓ |
| far-calc2-023 | PPE | Interest capitalization | ✓ |
| far-calc2-024 | PPE | ARO accretion | ✓ |
| far-calc2-025 | Contingencies | Warranty expense | ✓ |
| far-calc2-026 | Stock Comp | RSU expense | ✓ |
| far-calc2-027 | Derivatives | Cash flow hedge OCI | ✓ |
| far-calc2-028 | Taxes | Effective rate | ✓ |
| far-calc2-029 | Ratios | TIE | ✓ |
| far-calc2-030 | Ratios | Asset turnover | ✓ |
| far-calc2-031 | Revenue | Gift card breakage | ✓ |
| far-calc2-032 | Investments | Equity impairment | ✓ |
| far-calc2-033 | Consolidation | Full goodwill | ✓ |
| far-calc2-034 | Government | Property tax (conceptual) | ✓ |
| far-calc2-035 | NFP | Functional expenses | ✓ |

### Issues Found: 1 (calculation inconsistency)

## Question Summary

### Difficulty Distribution:
- Easy: 1 question
- Medium: 11 questions
- Hard: 23 questions

### Format Distribution:
- Conceptual: 2 questions
- Calculation: 33 questions

## Final Status: NEEDS REVIEW
34/35 questions pass. far-calc2-009 requires correction before deployment.
