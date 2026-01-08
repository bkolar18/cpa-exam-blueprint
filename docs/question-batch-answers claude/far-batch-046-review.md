# FAR Batch 046 Review: Consolidations Advanced

## Batch Information
- **Topic:** Consolidations Advanced
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Consolidations
- Subtopics covered: Intercompany Eliminations, Noncontrolling Interest, Push-Down Accounting, Step Acquisitions, Sale of Subsidiary Shares, Subsidiary Stock Transactions, Intercompany Bonds, Bargain Purchase, Acquisition Costs, Contingent Consideration, Midyear Acquisitions, Preacquisition Contingencies, VIE Consolidation, Amortization of Fair Value Adjustments, Reciprocal Stockholdings, Preferred Stock, Goodwill Impairment, In-Process R&D, Complex Structures, Foreign Subsidiaries, Translation, NCI Measurement, Discontinued Operations, Intercompany Services, Acquisition Accounting, Common Control, Deferred Taxes, Equity Method Elimination, Remeasurement, Reverse Acquisitions

### Content Accuracy: MOSTLY PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-consol-adv-020: NCI CALCULATION ERROR

**Question:** Subsidiary has common stock owned 80% by Parent, cumulative preferred stock (10%, $1,000,000 par) owned by outsiders. Subsidiary's net income is $200,000. What is NCI's share of income?

**Marked Answer:** B ($140,000)

**Correct Calculation:**
- Preferred dividend = 10% × $1,000,000 = $100,000 (goes to NCI - outsiders own 100% of preferred)
- Income available to common = $200,000 - $100,000 = $100,000
- NCI common share = 20% × $100,000 = **$20,000**
- Total NCI share = $100,000 + $20,000 = **$120,000**

**Correct Answer:** D ($120,000)

**Error:** Answer B ($140,000) incorrectly calculates NCI common as 20% × $200,000 = $40,000, failing to subtract the preferred dividend before allocating to common shareholders.

---

### All Other Calculations Verified: PASS

| ID | Topic | Calculation | Status |
|----|-------|-------------|--------|
| far-consol-adv-001 | Downstream Inventory | $125K × 40% = $50K unrealized | ✓ |
| far-consol-adv-002 | Upstream Inventory | $0 - all sold externally | ✓ |
| far-consol-adv-003 | Fixed Asset Sale | $100K gain, $20K depreciation adjustment | ✓ |
| far-consol-adv-004 | Full Goodwill | $750K + $260K - $900K = $110K | ✓ |
| far-consol-adv-005 | NCI Upstream | 20% × ($400K - $50K) = $70K | ✓ |
| far-consol-adv-007 | Step Acquisition | $540K - $500K = $40K gain | ✓ |
| far-consol-adv-009 | Sub Stock Issue | 64% × $52,500 - $32K = $1,600 APIC | ✓ |
| far-consol-adv-010 | Constructive Retirement | $980K - $950K = $30K gain | ✓ |
| far-consol-adv-014 | Midyear Acquisition | 9/12 × $480K = $360K | ✓ |
| far-consol-adv-017 | Intercompany Dividends | $80K eliminated, $20K to NCI | ✓ |
| far-consol-adv-018 | Patent FV Amortization | $30K × 2 = $60K cumulative | ✓ |
| far-consol-adv-021 | Goodwill Impairment | $2M - $1.85M = $150K (< $300K GW) | ✓ |
| far-consol-adv-024 | Indirect Ownership | 80% × 60% = 48% | ✓ |
| far-consol-adv-032 | Deferred Tax on FV | $300K × 25% = $75K DTL | ✓ |
| far-consol-adv-033 | Elimination Entry | NCI = 20% × $600K = $120K | ✓ |

### Issues Found: 1 (calculation error)

## Question Summary

### Difficulty Distribution:
- Easy: 0 questions
- Medium: 10 questions
- Hard: 25 questions

### Format Distribution:
- Conceptual: 17 questions
- Calculation: 18 questions

## Final Status: NEEDS REVIEW
34/35 questions pass. far-consol-adv-020 requires correction before deployment.
