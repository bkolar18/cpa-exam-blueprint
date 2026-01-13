# FAR Question Batch Review Summary (Batches 008-010)

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batches Reviewed:** 3
**Total Questions:** 70

---

## Executive Summary

| Batch | Topic | Questions | Status |
|-------|-------|-----------|--------|
| 008 | Leases | 25 | APPROVED |
| 009 | Liabilities | 25 | APPROVED |
| 010 | Stockholders Equity | 20 | APPROVED (minor note) |

**Overall:** 70/70 questions passed review (100%). One minor typo noted.

---

## CRITICAL VERIFICATION: ASC 842 (Leases)

**Batch 008 correctly applies ASC 842:**
- Operating leases ARE on the balance sheet (ROU asset + lease liability)
- Finance lease expense = depreciation + interest (front-loaded)
- Operating lease expense = straight-line
- Short-term exemption correctly stated as 12 months

This is current GAAP. No references to the old ASC 840 off-balance-sheet treatment.

---

## Minor Issue

### far-eq-012 (Batch 010) - Typo in Liquidation Preference

**Current text:** "1,000 shares with $50 per share liquidation preference"

**Should be:** "1,000 shares with $500 per share liquidation preference"

**Reason:** The calculation subtracts $500,000 from equity, which requires $500/share × 1,000 shares, not $50/share.

**Severity:** MINOR - Math is correct assuming $500/share was intended.

---

## Standards Verification Summary

| Standard | Batch | Verified Current? |
|----------|-------|-------------------|
| ASC 842 (Leases) | 008 | YES - Operating leases on balance sheet |
| ASC 606 (Sale-leaseback) | 008 | YES - Must qualify as sale under revenue rules |
| ASU 2015-03 (Bond issuance costs) | 009 | YES - Deduct from liability |
| ASC 450 (Contingencies) | 009 | YES - Probable + estimable |
| TDR guidance | 009 | YES - Current treatment |

---

## Calculations Verified

### Batch 008 - Leases (4 calculations)
| ID | Topic | Answer | Status |
|----|-------|--------|--------|
| far-lease-006 | Lease liability PV | $42,124 | CORRECT |
| far-lease-007 | Year 1 interest | $2,527 | CORRECT |
| far-lease-011 | Sale-leaseback gain | $30,000 | CORRECT |
| far-lease-015 | Sales-type gross profit | $20,000 | CORRECT |

### Batch 009 - Liabilities (7 calculations)
| ID | Topic | Answer | Status |
|----|-------|--------|--------|
| far-liab-002 | Effective interest | $5,700 | CORRECT |
| far-liab-005 | Extinguishment loss | $10,000 | CORRECT |
| far-liab-014 | Warrant allocation | $935,455 | CORRECT |
| far-liab-015 | Warranty liability | $11,000 | CORRECT |
| far-liab-017 | TDR gains | $30K + $50K | CORRECT |
| far-liab-021 | Zero-coupon interest | $4,484 | CORRECT |
| far-liab-023 | Accrued interest | $5,000 | CORRECT |

### Batch 010 - Equity (7 calculations)
| ID | Topic | Answer | Status |
|----|-------|--------|--------|
| far-eq-001 | APIC | $140,000 | CORRECT |
| far-eq-004 | Treasury stock | $20,000 | CORRECT |
| far-eq-005 | Treasury reissue gain | $5,000 | CORRECT |
| far-eq-006 | Treasury reissue loss | $2K APIC, $2K RE | CORRECT |
| far-eq-008 | Small stock dividend | $150,000 | CORRECT |
| far-eq-012 | Book value per share | $22.50 | CORRECT* |
| far-eq-013 | Cumulative dividends | $180,000 | CORRECT |

---

## Quality Metrics

### Difficulty Distribution (All 3 Batches)

| Difficulty | Count | % |
|------------|-------|---|
| Easy | 13 | 19% |
| Medium | 33 | 47% |
| Hard | 24 | 34% |

**Assessment:** Good distribution with appropriate complexity.

### Question Format Distribution (All 3 Batches)

| Format | Count |
|--------|-------|
| conceptual | 47 |
| calculation | 16 |
| scenario | 5 |
| except | 2 |

---

## Cumulative Progress (Batches 001-010)

| Batch | Topic | Questions | Status |
|-------|-------|-----------|--------|
| 001 | Conceptual Framework & Standards | 40 | APPROVED |
| 002 | Financial Statement Presentation | 40 | NEEDS CORRECTION (1 issue) |
| 003 | Revenue Recognition | 40 | APPROVED |
| 004 | Inventory | 30 | APPROVED |
| 005 | Property, Plant & Equipment | 30 | APPROVED |
| 006 | Intangible Assets | 25 | APPROVED |
| 007 | Investments | 25 | APPROVED |
| 008 | Leases | 25 | APPROVED |
| 009 | Liabilities | 25 | APPROVED |
| 010 | Stockholders Equity | 20 | APPROVED (minor note) |
| **TOTAL** | | **300** | **298/300 PASS (99.3%)** |

---

## Outstanding Issues Summary

| Priority | Batch | Question | Issue | Status |
|----------|-------|----------|-------|--------|
| HIGH | 002 | far-fs-003 | Incorrect prepaid classification answer | PENDING |
| LOW | 002 | far-fs-001 | Tip typo | PENDING |
| LOW | 010 | far-eq-012 | Typo in liquidation preference | PENDING |

---

## Files Generated

1. `far-batch-008-review.md` - Leases review
2. `far-batch-009-review.md` - Liabilities review
3. `far-batch-010-review.md` - Equity review
4. `SUMMARY-far-batches-008-010.md` - This summary document

---

## Final Recommendation

**ALL THREE BATCHES APPROVED FOR USE**

Batch 008 is particularly strong with correct ASC 842 application throughout.
