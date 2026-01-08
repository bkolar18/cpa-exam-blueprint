# FAR Batch 003 Review: Revenue Recognition

**Reviewer:** Claude (CPA Content Reviewer)
**Date:** 2026-01-07
**Batch File:** `far-batch-003-revenue-recognition.json`
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

**Overall Assessment:** APPROVED - Excellent quality batch

---

## Validation Results

### 1. JSON Syntax Validity
- File parsed successfully without errors

### 2. Required Fields Check
All 40 questions contain all required fields:
- id, section, topic, subtopic, conceptTested, difficulty, questionFormat
- question, options (A/B/C/D), correctAnswer, explanation

### 3. Taxonomy Accuracy

**Topic:** "Revenue Recognition" - VALID

**Subtopics Used:**
| Subtopic | Count | Valid? |
|----------|-------|--------|
| ASC 606 Five-Step Model | 16 | YES |
| Identifying Performance Obligations | 5 | YES |
| Transaction Price Allocation | 5 | YES |
| Variable Consideration | 8 | YES |
| Contract Modifications | 3 | YES |
| Principal vs Agent | 3 | YES |

All subtopics correctly match the taxonomy definition.

---

## Content Accuracy Review

### ASC 606 Verification
All questions correctly reflect the current revenue recognition standard (ASC 606), NOT the superseded ASC 605. Key verifications:

- Five-step model correctly described
- Control-based approach properly emphasized over risks-and-rewards
- Variable consideration constraint accurately explained
- Principal vs agent guidance current

### Verified Calculations

#### far-rev-008: Transaction Price Allocation
- Product SSP: $600
- Service SSP: $400
- Total SSP: $1,000
- Bundle price: $900
- Product allocation: ($600/$1,000) x $900 = **$540** (Answer B)

#### far-rev-012: Right of Return
- 1,000 units x $100 = $100,000
- 5% expected returns = 50 units
- Revenue: 950 x $100 = **$95,000** (Answer B)

#### far-rev-019: Cost-to-Cost Method
- Contract price: $5,000,000
- Estimated total costs: $4,000,000
- Costs incurred: $1,500,000
- % complete: $1,500,000 / $4,000,000 = 37.5%
- Revenue: 37.5% x $5,000,000 = **$1,875,000** (Answer B)

#### far-rev-026: Most Likely Amount Method
- Base: $1,000,000
- Bonus: $100,000 @ 70% probability
- Most likely outcome: Bonus received (70% > 50%)
- Transaction price: **$1,100,000** (Answer C)

#### far-rev-028: Discount Allocation
- Product A SSP: $80, B: $50, C: $40
- Discount relates to A and B only (per evidence)
- A+B total: $130
- Product A: $80 - ($80/$130 x $20) = $80 - $12.31 = **$67.69**
- Product B: $50 - ($50/$130 x $20) = $50 - $7.69 = **$42.31**
- Product C: **$40** (no discount)
- Total: $150.00 (Answer C)

#### far-rev-033: Volume Rebates - Expected Value
- 800 units at $10
- 5% rebate threshold: 1,000 units
- 75% probability of reaching threshold
- Expected value per unit:
  - With rebate: $10 x 0.95 = $9.50 (75% probability)
  - Without rebate: $10.00 (25% probability)
  - Expected: (0.75 x $9.50) + (0.25 x $10.00) = $7.125 + $2.50 = $9.625
- Revenue: 800 x $9.625 = **$7,700** (Answer C)

#### far-rev-039: Contract Modification - Cumulative Catch-up
- Original: $1,000,000 contract, 40% complete
- Previously recognized: $400,000
- Modified to: $900,000 for same scope
- Since remaining services not distinct from transferred:
  - Use cumulative catch-up method
  - New cumulative revenue: 40% x $900,000 = $360,000
  - Adjustment: $360,000 - $400,000 = -$40,000
- **Answer C is correct**

---

## No Issues Found

All 40 questions are accurate, well-written, and properly aligned with current ASC 606 guidance.

---

## Difficulty Distribution

| Difficulty | Count | Percentage |
|------------|-------|------------|
| Easy | 6 | 15% |
| Medium | 18 | 45% |
| Hard | 16 | 40% |

**Assessment:** This batch skews harder than batches 001 and 002, which is appropriate for ASC 606 content. Revenue recognition is a complex topic that warrants more challenging questions.

---

## Question Format Distribution

| Format | Count |
|--------|-------|
| conceptual | 21 |
| calculation | 6 |
| scenario | 7 |
| except | 5 |
| best-answer | 1 |

**Assessment:** Excellent variety. Good use of scenario-based questions for this practical application topic.

---

## Duplicate Analysis

No duplicates found within this batch.

**Cross-batch analysis:**
- far-rev-003 (when to recognize revenue under ASC 606) vs far-cf-033 (revenue recognition principle under Conceptual Framework): These are related but distinct - one tests ASC 606 Step 5, the other tests the conceptual framework's recognition principle. Both are appropriate to include.

---

## Notable Strengths

1. **Comprehensive coverage of ASC 606** - All five steps well represented
2. **Practical calculations** - Good mix of allocation, variable consideration, and percentage-of-completion problems
3. **Complex scenarios** - Contract modifications, principal vs agent, and license accounting appropriately challenging
4. **Current guidance** - No outdated references to ASC 605 or percentage-of-completion under old rules

---

## Final Recommendation

**APPROVED FOR USE**

This is an excellent batch with no corrections needed. The questions accurately test ASC 606 knowledge at an appropriate CPA exam level.
