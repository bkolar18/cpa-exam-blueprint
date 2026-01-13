# FAR Batch 015 Review: Consolidations

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-015-consolidations.json`
**Questions Reviewed:** 40

---

## Summary

| Category | Status |
|----------|--------|
| JSON Syntax | PASS |
| Required Fields | PASS |
| Taxonomy Accuracy | PASS |
| Question Quality | 40/40 PASS |
| Duplicate Check | PASS |

**Overall Assessment:** APPROVED

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully with wrapper structure (batchInfo + questions)

### 2. Required Fields Check
All 40 questions contain all required fields.

### 3. Taxonomy Accuracy

**Topic:** "Consolidations" - VALID

**Subtopics Used:**
| Subtopic | Count |
|----------|-------|
| Consolidation Basics | 2 |
| Elimination Entries | 2 |
| Intercompany Inventory | 3 |
| Noncontrolling Interest | 3 |
| Intercompany Fixed Assets | 1 |
| Intercompany Bonds | 2 |
| Intercompany Dividends | 1 |
| Variable Interest Entities | 2 |
| Consolidation Mechanics | 2 |
| Acquisition Date | 1 |
| Fair Value Adjustments | 1 |
| Goodwill Impairment | 2 |
| Changes in Ownership | 2 |
| Deconsolidation | 2 |
| Complex Calculations | 1 |
| Intercompany Loans | 1 |
| Push-down Accounting | 1 |
| And 10+ additional subtopics | |

---

## Content Accuracy Review

### Key Consolidation Concepts Verified

| Concept | Question | Status |
|---------|----------|--------|
| Control = consolidation | far-consol-001 | CORRECT |
| >50% voting = control | far-consol-002 | CORRECT |
| Downstream = 100% to parent | far-consol-006 | CORRECT |
| Upstream = proportional split | far-consol-007 | CORRECT |
| NCI in equity | far-consol-008 | CORRECT |
| VIE = primary beneficiary | far-consol-014 | CORRECT |
| 100% line-by-line inclusion | far-consol-016 | CORRECT |
| Buying NCI = equity transaction | far-consol-022 | CORRECT |
| Loss of control = gain/loss | far-consol-024 | CORRECT |
| NCI shares in losses | far-consol-036 | CORRECT |

### Critical Distinctions Correctly Explained

**Downstream vs Upstream Sales:**
- Downstream (parent to sub): 100% unrealized profit to controlling interest
- Upstream (sub to parent): Proportional allocation (e.g., 70%/30%)

**Ownership Changes While Maintaining Control:**
- Buying NCI shares: Equity transaction, no gain/loss
- Selling sub shares: Equity transaction, no gain/loss

**Loss of Control:**
- Deconsolidation occurs
- Gain/loss recognized
- Retained interest remeasured to fair value

---

## Calculations Verified

| Question | Topic | Calculation | Result |
|----------|-------|-------------|--------|
| far-consol-005 | Unrealized profit | $30K × 40% = $12K | CORRECT |
| far-consol-009 | NCI balance | $130K + $20K - $4K = $146K | CORRECT |
| far-consol-010 | Depreciation adjustment | $16K - $10K = $6K decrease | CORRECT |
| far-consol-012 | Constructive retirement | $485K - $470K = $15K gain | CORRECT |
| far-consol-017 | Controlling interest NI | $400K - $25K = $375K | CORRECT |
| far-consol-019 | FV depreciation | $60K ÷ 6 = $10K/year | CORRECT |
| far-consol-021 | Goodwill impairment | $5M - $4.5M = $500K | CORRECT |
| far-consol-026 | Consolidated assets | $530K + $350K = $880K | CORRECT |
| far-consol-031 | Indirect ownership | 80% × 70% = 56% | CORRECT |
| far-consol-034 | Goodwill | $600K - $450K = $150K | CORRECT |

### Detailed Calculation: far-consol-010 (Intercompany Fixed Asset)

- Sale price: $80,000
- NBV: $50,000
- Unrealized gain: $30,000
- Remaining life: 5 years
- Sub's depreciation: $80,000 ÷ 5 = $16,000/year
- Correct depreciation: $50,000 ÷ 5 = $10,000/year
- **Adjustment: Decrease depreciation by $6,000** ✓

### Detailed Calculation: far-consol-009 (NCI Balance)

- Beginning NCI: $130,000
- NCI share of income: 20% × $100,000 = +$20,000
- NCI share of dividends: 20% × $20,000 = -$4,000
- **Ending NCI: $146,000** ✓

---

## No Issues Found

All 40 questions are accurate and well-constructed.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 7 | 17.5% |
| Medium | 18 | 45% |
| Hard | 15 | 37.5% |

**Assessment:** Good distribution with emphasis on harder consolidation concepts.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 30 |
| calculation | 10 |

---

## Notable Strengths

1. **Comprehensive coverage** - 40 questions covering all major consolidation topics
2. **VIE guidance included** - Primary beneficiary concept correctly tested
3. **Intercompany eliminations thorough** - Inventory, fixed assets, bonds, loans, dividends
4. **Ownership changes** - Both maintaining control and losing control scenarios
5. **Complex structures** - Indirect ownership, mutual holdings, combined statements
6. **Good calculation practice** - 10 calculation questions with variety

---

## Final Recommendation

**APPROVED FOR USE**

Excellent batch with no corrections needed.
