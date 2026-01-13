# FAR Batch 008 Review: Leases

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-008-leases.json`
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

## CRITICAL STANDARD VERIFICATION: ASC 842

This batch correctly applies the current lease standard (ASC 842), NOT the superseded ASC 840.

### Key ASC 842 Requirements Verified:

| Requirement | Question | Status |
|-------------|----------|--------|
| Operating leases ON balance sheet | far-lease-002 | CORRECT |
| Both ROU asset and lease liability | far-lease-002 | CORRECT |
| Finance lease criteria (5 tests) | far-lease-001 | CORRECT |
| Operating lease = straight-line expense | far-lease-005 | CORRECT |
| Finance lease = depreciation + interest | far-lease-004 | CORRECT |
| Short-term lease exemption (12 months) | far-lease-017 | CORRECT |

**far-lease-002 explicitly states:** "Under ASC 842, lessees recognize both a right-of-use (ROU) asset and a lease liability for virtually all leases, regardless of classification. This is a significant change from ASC 840, where operating leases were off-balance sheet."

This is exactly right and reflects current GAAP.

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully without errors

### 2. Required Fields Check
All 25 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Leases" - VALID

**Subtopics Used:**
| Subtopic | Count | Valid? |
|----------|-------|--------|
| Lease Classification | 5 | YES |
| Lessee Accounting - Finance Lease | 7 | YES |
| Lessee Accounting - Operating Lease | 4 | YES |
| Lessor Accounting | 4 | YES |
| Sale-Leaseback Transactions | 3 | YES |

---

## Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-lease-006 | Lease liability | $10,000 × 4.2124 = $42,124 | CORRECT |
| far-lease-007 | Year 1 interest | $42,124 × 6% = $2,527 | CORRECT |
| far-lease-011 | Sale-leaseback gain | $50,000 × 60% = $30,000 | CORRECT |
| far-lease-015 | Sales-type gross profit | $100,000 - $80,000 = $20,000 | CORRECT |

### Detailed Calculation: far-lease-011 (Sale-Leaseback)

- Asset carrying amount: $100,000
- Fair value and sale price: $150,000
- Total gain: $50,000
- Leaseback represents: 40% of remaining use
- Rights transferred: 100% - 40% = 60%
- Immediate gain: $50,000 × 60% = **$30,000** ✓
- Deferred portion: $50,000 × 40% = $20,000 (amortized over lease term)

---

## No Issues Found

All 25 questions are accurate and well-constructed.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 4 | 16% |
| Medium | 12 | 48% |
| Hard | 9 | 36% |

**Assessment:** Appropriately challenging for lease accounting complexity.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 19 |
| calculation | 4 |
| scenario | 2 |

---

## Notable Strengths

1. **Correct ASC 842 application** - Operating leases correctly shown on balance sheet
2. **Comprehensive coverage** - Lessee, lessor, and sale-leaseback all covered
3. **Finance vs operating distinction** - Expense patterns correctly explained
4. **Cash flow classification** - Correctly distinguishes operating vs finance lease SCF treatment
5. **Modification guidance** - Includes current guidance on lease modifications

---

## Final Recommendation

**APPROVED FOR USE**

Excellent batch with no corrections needed. Critical that ASC 842 (not ASC 840) is correctly applied throughout.
