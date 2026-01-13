# TBS Correction Plan

Based on ChatGPT independent review of TBS Sample Batch 1.

## Review Summary

**Reviewed:** 5 simulations (out of 64 in sample)
- **Approved:** 2 (1 clean, 1 with notes)
- **Needs Revision:** 3

## Primary Issues Identified

### 1. Insufficient ASC/Authoritative Anchoring
**Problem:** Explanations and requirements don't explicitly cite authoritative standards.

**Examples:**
- Subsequent events decisions not tied to ASC 855
- Contingent liabilities missing ASC 450 measurement guidance
- Revenue recognition using "earned revenue" instead of "transfer of control" (ASC 606)
- Deferred tax differences not tied to ASC 740

**Correction Strategy:**
- Add explicit ASC/IRC/PCAOB citations in requirement explanations
- Update scenario text to reference authoritative guidance where candidates would need it
- Include authoritative basis in dropdown option explanations

### 2. Ambiguity Creating Partial-Credit Risk
**Problem:** Vague requirements allow candidates to lose credit despite understanding concepts.

**Examples:**
- Subsequent events: "condition existed at balance sheet date" not clearly emphasized
- Contingent liability: Range vs. best estimate not specified (ASC 450-20-30-1)
- Deferred taxes: Temporary differences not labeled as taxable vs. deductible

**Correction Strategy:**
- Add explicit classification guidance in requirements
- Clarify measurement requirements (range, best estimate, point estimate)
- Use structured response formats that guide proper classification

### 3. Missing CPA Exam UI Constraints
**Problem:** Account titles and response formats don't match actual CPA exam conventions.

**Examples:**
- Journal entry account selections don't use standard FAR exam terminology
- Sign conventions not clearly specified for numerical answers
- Disclosure wording expectations unclear

**Correction Strategy:**
- Constrain dropdown options to standard CPA exam account titles
- Add sign guidance for numeric entries (positive/negative conventions)
- Clarify expected response formats in requirement labels

### 4. Missing Classification Guidance
**Problem:** Candidates need to classify items but criteria not clearly provided.

**Examples:**
- Temporary vs. permanent differences need explicit criteria
- Control deficiency classifications need magnitude thresholds
- Recognized vs. nonrecognized subsequent events need date references

**Correction Strategy:**
- Add classification criteria in exhibits or scenario text
- Include decision frameworks in appropriate simulations
- Provide clear materiality/threshold guidance where needed

## Specific Corrections by Simulation Type

### Subsequent Events (ASC 855)
- Add reference to ASC 855-10-25-1 (recognized) and ASC 855-10-25-3 (nonrecognized)
- Clarify: "condition existed at balance sheet date" vs "arose after"
- Update disclosure requirements to match expected CPA exam format

### Contingent Liabilities (ASC 450)
- Specify whether loss is single estimate or range (ASC 450-20-30-1)
- Add probability thresholds: probable (>75%), reasonably possible, remote
- Constrain account titles to standard exam terminology

### Revenue Recognition (ASC 606)
- Replace "earned revenue" with "transfer of control" language
- Reference ASC 606-10-25-23 (performance obligations) and 606-10-25-30
- Clarify contract liability vs. contract asset treatment

### Income Taxes / Deferred Taxes (ASC 740)
- Label each temporary difference as taxable or deductible
- Specify tax rate application (current year vs. enacted future rates)
- Add cascading error prevention (independent calculations where possible)

### Journal Entries
- Use standard CPA exam account titles consistently
- Verify debit/credit balance per entry
- Add "no cascading error" structure where feasible

## Implementation Priority

### High Priority (Accuracy)
1. Add authoritative citations to all explanations
2. Fix measurement ambiguity (ranges, estimates, thresholds)
3. Correct any calculation errors

### Medium Priority (Exam Alignment)
4. Standardize account titles to CPA exam conventions
5. Add explicit classification criteria
6. Clarify sign conventions

### Lower Priority (Enhancement)
7. Improve scenario clarity
8. Add decision frameworks as exhibits
9. Enhance partial credit structures

## Action Items

- [ ] Review all TBS for authoritative citation gaps
- [ ] Add ASC/IRC references to explanations
- [ ] Audit account titles against CPA exam standards
- [ ] Verify numeric answer sign conventions
- [ ] Add classification criteria where missing
- [ ] Test for cascading error exposure

## Files to Review

Based on patterns identified, focus corrections on:
- `far-tbs.ts`: Subsequent events, contingent liabilities, deferred taxes
- `aud-tbs.ts`: Attorney letters, control deficiency classifications
- `reg-tbs.ts`: Tax calculations with book-tax differences
- All journal entry TBS: Account title standardization
