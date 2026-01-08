# FAR Batch 048 Review: Mixed Calculations 3

## Batch Information
- **Topic:** Mixed Calculations 3
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Mixed FAR topics covered: Cash, Receivables, Inventory, Fixed Assets, Bonds, Leases, Equity, Revenue, Taxes, Pensions, EPS, Cash Flows, Investments, Intangibles, Share-Based Comp, Business Combinations, Foreign Currency, Debt, Derivatives, Government, NFP, Ratios, SEC Reporting, Consolidations, Accounting Changes, Subsequent Events, OCI, Financial Instruments

### Content Accuracy: MOSTLY PASS (with exceptions noted below)

### Calculation Verification: MOSTLY PASS

## ISSUES FOUND

### far-calc3-012: DILUTED EPS CALCULATION ERROR

**Question:** Net income $500,000. 100,000 shares. $1,000,000 of 6% convertible bonds → 20,000 shares. Tax rate 25%. What is diluted EPS?

**Marked Answer:** C ($4.13)

**Correct Calculation:**
- Basic EPS = $500,000 / 100,000 = $5.00
- Interest add-back = $1,000,000 × 6% = $60,000
- After-tax = $60,000 × (1 - 0.25) = $45,000
- Adjusted income = $500,000 + $45,000 = $545,000
- Adjusted shares = 100,000 + 20,000 = 120,000
- **Diluted EPS = $545,000 / 120,000 = $4.54**

**Correct Answer:** B ($4.54)

---

### far-calc3-014: EQUITY METHOD INCOME CALCULATION ERROR

**Question:** 30% ownership acquired for $900,000 when BV was $2,500,000. Excess to equipment (10-year life). Investee NI $400,000, dividends $100,000. What is equity method income?

**Marked Answer:** B ($117,500)

**Correct Calculation:**
- Share of BV = 30% × $2,500,000 = $750,000
- Excess paid = $900,000 - $750,000 = $150,000
- Annual amortization = $150,000 / 10 = $15,000
- Share of income = 30% × $400,000 = $120,000
- **Equity method income = $120,000 - $15,000 = $105,000**

**Correct Answer:** C ($105,000)

Note: The explanation in the question itself calculates $105,000 but the marked answer doesn't match.

---

### All Other Calculations Verified: PASS

| ID | Topic | Calculation | Status |
|----|-------|-------------|--------|
| far-calc3-001 | Bank Reconciliation | $45K + $8K - $12K = $41K | ✓ |
| far-calc3-002 | Factoring | $500K - $15K - $25K = $460K | ✓ |
| far-calc3-003 | LIFO Liquidation | 6K × $30 × 75% = $135K | ✓ |
| far-calc3-004 | ARO | $500K × 0.3118 = $155,900 | ✓ |
| far-calc3-005 | Bond Issue Price | $747K + $337K = $1,084,248 | ✓ |
| far-calc3-006 | ROU Asset | $227.3K + $3K - $5K = $225,300 | ✓ |
| far-calc3-007 | Treasury Stock | Cash $27K, TS $24K, APIC $3K | ✓ |
| far-calc3-008 | Variable Consideration | $100K + $16K = $116K | ✓ |
| far-calc3-009 | DTA Warranty | $50K × 21% = $10,500 | ✓ |
| far-calc3-010 | Ending PBO | $2M + $180K + $100K + $50K - $120K = $2.21M | ✓ |
| far-calc3-011 | Stock Split | Total par unchanged = $1M | ✓ |
| far-calc3-013 | CFO Indirect | $300K + $50K - $10K - $25K - $15K = $300K | ✓ |
| far-calc3-015 | DV LIFO | $100K + $22K = $122K | ✓ |
| far-calc3-016 | Goodwill Impairment | $5M - $4.5M = $500K | ✓ |
| far-calc3-017 | Stock Option Expense | $72K / 4 = $18K | ✓ |
| far-calc3-018 | Goodwill | $1.65M - $1.5M = $150K | ✓ |
| far-calc3-019 | FC Gain | €100K × ($1.15 - $1.10) = $5K | ✓ |
| far-calc3-020 | TDR Gain | $130K + $50K = $180K | ✓ |
| far-calc3-021 | Sales-Type Lease | $75K - $60K = $15K | ✓ |
| far-calc3-022 | FV Hedge | $80K - $75K = $5K loss | ✓ |
| far-calc3-023 | Property Tax Revenue | $8.5M + $1.2M = $9.7M | ✓ |
| far-calc3-024 | NFP Net Assets | $50K + $75K + $25K = $150K | ✓ |
| far-calc3-025 | Quick Ratio | $150K / $200K = 0.75 | ✓ |
| far-calc3-026 | ROE | $220K / $1.6M = 13.75% | ✓ |
| far-calc3-027 | POC Revenue | $2M × 62.5% = $1.25M | ✓ |
| far-calc3-028 | Warranty Accrual | $15K + $20K = $35K | ✓ |
| far-calc3-029 | Segment Test | $6M > $5M threshold | ✓ |
| far-calc3-030 | Interim Tax | $140K - $84K = $56K | ✓ |
| far-calc3-031 | NCI Balance | $100K + $25K - $10K = $115K | ✓ |
| far-calc3-032 | Depreciation Estimate | $120K / 4 = $30K | ✓ |
| far-calc3-033 | Subsequent Event | Type I - adjust | ✓ |
| far-calc3-034 | OCI Reclassification | Net effect = $0 | ✓ |
| far-calc3-035 | CECL Adoption | $30K × 75% = $22,500 | ✓ |

### Issues Found: 2 (calculation errors)

## Question Summary

### Difficulty Distribution:
- Easy: 0 questions
- Medium: 16 questions
- Hard: 19 questions

### Format Distribution:
- Conceptual: 1 question
- Calculation: 34 questions

## Final Status: NEEDS REVIEW
33/35 questions pass. far-calc3-012 and far-calc3-014 require correction before deployment.
