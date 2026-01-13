# FAR Batch 031 Review: Leases - Advanced Scenarios

## Batch Information
- **Topic:** Leases - Advanced Scenarios
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Leases (valid FAR topic)
- Comprehensive coverage of ASC 842 advanced topics

### Content Accuracy: PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-lease-adv-016: INCORRECT SALES-TYPE LEASE PROFIT CALCULATION

**Question:** A lessor enters a sales-type lease. Asset carrying value is $80,000, fair value is $100,000. PV of lease payments is $95,000 with an unguaranteed residual of $5,000 (PV). What profit is recognized at inception?

**Marked Answer:** A ($15,000)

**Correct Answer:** B ($20,000)

**Correct Calculation (per ASC 842-30-25):**
- Revenue = Lower of FV or PV of lease payments = $95,000
- COGS = Carrying value - PV of unguaranteed residual = $80,000 - $5,000 = $75,000
- Gross profit = $95,000 - $75,000 = **$20,000**

**Note:** The explanation contains self-contradictory language ("Wait—let me reconsider") and incorrectly concludes that COGS is simply the carrying value without deducting the PV of unguaranteed residual.

**Required Fix:** Change correctAnswer from "A" to "B"

---

### All Other Calculations Verified: PASS

| ID | Calculation | Result | Status |
|----|-------------|--------|--------|
| far-lease-adv-004 | ROU asset | $225,000 | ✓ |
| far-lease-adv-009 | Lease term with renewals | 11 years | ✓ |
| far-lease-adv-010 | Lease liability with purchase option | $81,180 | ✓ |
| far-lease-adv-011 | Residual value guarantee | $3,000 | ✓ |
| far-lease-adv-013 | Finance lease Year 1 expense | $28,000 | ✓ |
| far-lease-adv-014 | Operating lease straight-line expense | $12,000 | ✓ |
| far-lease-adv-018 | Net investment in lease | $220,000 | ✓ |
| far-lease-adv-021 | Sale-leaseback gain | $300,000 | ✓ |
| far-lease-adv-026 | ROU with TI allowance | $76,000 | ✓ |
| far-lease-adv-028 | Current lease liability | $18,000 | ✓ |
| far-lease-adv-032 | Annuity due lease liability | $70,825 | ✓ |
| far-lease-adv-035 | Multiple asset allocation | $48,000 | ✓ |

### Key Standards Verified (ASC 842):
- Five finance lease criteria ✓
- Variable payments: index-based included, usage-based excluded ✓
- Modification as separate lease criteria ✓
- Short-term lease exemption (≤12 months) ✓
- Sublease classification based on ROU asset ✓
- Sale-leaseback ASC 606 control transfer requirement ✓
- ROU asset impairment under ASC 360 ✓
- Cash flow classification (principal in financing, interest in operating) ✓

### Issues Found: 1 CRITICAL

## Question Summary

### Difficulty Distribution:
- Easy: 1 question
- Medium: 16 questions
- Hard: 18 questions

### Format Distribution:
- Conceptual: 24 questions
- Calculation: 11 questions

## Final Status: NEEDS CORRECTION
34/35 questions pass. far-lease-adv-016 requires correction before deployment.
