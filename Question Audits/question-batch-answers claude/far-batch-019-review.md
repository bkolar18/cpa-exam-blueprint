# FAR Batch 019 Review: Accounting Changes and Error Corrections

## Batch Information
- **Topic:** Accounting Changes and Error Corrections
- **Questions:** 25
- **Weight:** 3%
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Accounting Changes and Error Corrections (valid FAR topic)
- Subtopics covered:
  - Types of Changes
  - Change in Principle
  - Change in Estimate
  - Estimate Change Calculation
  - Principle vs Estimate
  - Change in Reporting Entity
  - Error Correction
  - Counterbalancing Errors
  - Non-Counterbalancing Errors
  - Disclosure Requirements
  - Impracticability Exception
  - GAAP-Mandated Changes
  - Change in Principle Examples
  - Error Correction Entry
  - Tax Effects
  - Direct vs Indirect Effects
  - Interim Periods
  - Preferability
  - Summary Comparison

### Content Accuracy: PASS (with exception noted below)
Questions verified against ASC 250.

### Calculation Verification: FAIL

## CRITICAL ERROR FOUND

### far-changes-006: INCORRECT ANSWER

**Question:** Equipment cost $100,000, salvage $10,000, original life 10 years. After 4 years, remaining life is revised to 4 years. What is Year 5 depreciation?

**Marked Answer:** C ($15,000)

**Correct Answer:** B ($13,500)

**Verification:**
- Original annual depreciation: ($100,000 - $10,000) / 10 = $9,000
- Accumulated depreciation after 4 years: $9,000 × 4 = $36,000
- Book value at end of year 4: $100,000 - $36,000 = $64,000
- New annual depreciation: ($64,000 - $10,000) / 4 = **$13,500**

**Note:** The explanation text itself contradicts the marked answer, stating "Wait—let me recalculate" and concluding with "Actually the answer should be B."

**Required Fix:** Change correctAnswer from "C" to "B"

---

### Issues Found: 1 CRITICAL

| Question ID | Issue Type | Description |
|-------------|------------|-------------|
| far-changes-006 | CRITICAL | Wrong answer marked (C instead of B) |

## Question Summary

| ID | Difficulty | Format | Status |
|----|------------|--------|--------|
| far-changes-001 | easy | conceptual | PASS |
| far-changes-002 | medium | conceptual | PASS |
| far-changes-003 | medium | conceptual | PASS |
| far-changes-004 | easy | conceptual | PASS |
| far-changes-005 | easy | conceptual | PASS |
| far-changes-006 | medium | calculation | **FAIL** |
| far-changes-007 | medium | conceptual | PASS |
| far-changes-008 | medium | conceptual | PASS |
| far-changes-009 | medium | conceptual | PASS |
| far-changes-010 | medium | conceptual | PASS |
| far-changes-011 | hard | conceptual | PASS |
| far-changes-012 | hard | conceptual | PASS |
| far-changes-013 | hard | calculation | PASS |
| far-changes-014 | hard | conceptual | PASS |
| far-changes-015 | medium | conceptual | PASS |
| far-changes-016 | hard | conceptual | PASS |
| far-changes-017 | medium | conceptual | PASS |
| far-changes-018 | medium | conceptual | PASS |
| far-changes-019 | hard | calculation | PASS |
| far-changes-020 | hard | conceptual | PASS |
| far-changes-021 | medium | conceptual | PASS |
| far-changes-022 | hard | conceptual | PASS |
| far-changes-023 | medium | conceptual | PASS |
| far-changes-024 | medium | conceptual | PASS |
| far-changes-025 | medium | conceptual | PASS |

## Final Status: NEEDS CORRECTION
24/25 questions pass. 1 critical error requires fix before deployment.
