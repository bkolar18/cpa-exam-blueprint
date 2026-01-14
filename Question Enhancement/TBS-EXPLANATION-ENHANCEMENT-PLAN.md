# TBS Explanation Enhancement Plan

**Created:** January 13, 2026
**Status:** Pending - Awaiting Pilot
**Scope:** 58 Exam TBS questions in exam-tbs.ts

---

## Executive Summary

Enhance all TBS requirement explanations to be thorough, authoritative, and exam-aligned. TBS questions represent 50% of the CPA exam score, and students need to understand not just the answer but the reasoning behind each step.

**Pilot:** 10 TBS questions (mix of journal entry, numeric, dropdown)
**Scale:** All 58 exam TBS after pilot validation

---

## Current State Analysis

| Metric | Current | Target |
|--------|---------|--------|
| Authoritative references (ASC, IRC, AU-C) | ~15% | 95%+ |
| Why wrong answers are wrong | ~5% | 100% of dropdown/journal |
| Calculation step-by-step | ~40% | 100% of numeric/journal |
| Common mistake warnings | ~10% | 100% |
| Contextual interpretation | ~20% | 100% |

**Quality Distribution:**
- Good explanations: ~20% (have refs, explain reasoning)
- Weak explanations: ~50% (just restates formula/answer)
- Adequate: ~30% (functional but improvable)

---

## Enhanced TBS Explanation Template

Each TBS requirement explanation should follow this structure based on type:

### For NUMERIC ENTRY Requirements

```
**Formula:** [Formula with variable definitions]

**Calculation:**
Step 1: [Description]
  [Math with values]
Step 2: [Description]
  [Math with values]

**Answer:** [Final answer with proper formatting/units]

**Why This Matters (ASC/IRC Reference):**
[1-2 sentences on the accounting/tax principle]

**Common Mistakes:**
- [Mistake 1]: [Why it's wrong]
- [Mistake 2]: [Why it's wrong]
```

### For JOURNAL ENTRY Requirements

```
**Correct Entry:**
Dr. [Account] - [Amount]
Cr. [Account] - [Amount]

**Reasoning (ASC Reference):**
[Why this account is debited/credited per authoritative guidance]

**Why Not Other Accounts:**
- [Wrong account 1]: [Why it doesn't apply here]
- [Wrong account 2]: [Why it doesn't apply here]

**Amount Calculation:**
[Step-by-step if not obvious]
```

### For DROPDOWN Requirements

```
**Correct Selection:** [Option text]

**Authoritative Basis:** [ASC/AU-C/IRC reference]
[Why this is the standard/required wording]

**Why Other Options Are Wrong:**
- Option A: [Why incorrect - what misconception it represents]
- Option B: [Why incorrect]
- Option C: [Why incorrect]
```

### For RESEARCH/CITATION Requirements

```
**Correct Citation:** [Full citation]

**How to Find This:**
1. [Search term to use]
2. [Section to navigate to]

**Key Paragraph Content:**
[Brief summary of what the citation says]
```

---

## Example Transformations

### BEFORE (Journal Entry - Weak)
```typescript
{
  explanation: "The ROU asset is recorded at the present value of lease payments: $50,000 × 4.2124 = $210,620",
}
```

### AFTER (Journal Entry - Enhanced)
```typescript
{
  explanation: `**Correct Entry:** Dr. Right-of-Use Asset - $210,620

**Calculation (ASC 842-20-30-1):**
Step 1: Identify discount rate
  Use implicit rate (6%) since known to lessee
Step 2: Find PV factor
  5-year ordinary annuity at 6% = 4.2124
Step 3: Calculate present value
  $50,000 × 4.2124 = $210,620

**Why Right-of-Use Asset (not Equipment):**
ASC 842 requires lessees to recognize a right-of-use asset representing their right to use the underlying asset, not the asset itself. Equipment would only be debited if the lessee purchased it outright.

**Why Not Lease Expense or Prepaid Rent:**
- Lease Expense: Only used in operating leases for periodic expense recognition
- Prepaid Rent: Old GAAP treatment; ASC 842 eliminated this approach

**Common Mistakes:**
- Using incremental borrowing rate (7%) when implicit rate is known
- Recording at fair value ($210,000) instead of PV of payments`,
}
```

### BEFORE (Dropdown - Weak)
```typescript
{
  explanation: "Audits provide 'reasonable' assurance, not absolute assurance",
}
```

### AFTER (Dropdown - Enhanced)
```typescript
{
  explanation: `**Correct Selection:** "reasonable"

**Authoritative Basis (AU-C 200.A45):**
The auditor's objective is to obtain reasonable assurance about whether the financial statements as a whole are free from material misstatement. Absolute assurance is not attainable due to inherent limitations of an audit.

**Why Other Options Are Wrong:**
- "Absolute": No audit can provide absolute assurance due to (1) nature of audit evidence (persuasive not conclusive), (2) use of judgment and sampling, (3) inherent limitations of internal control
- "Limited": This describes review engagements, not audits (see AR-C 90)
- "Moderate": Not a recognized assurance level in professional standards

**Key Distinction:**
Audits = Reasonable assurance (positive opinion)
Reviews = Limited assurance (negative conclusion)
Compilations = No assurance`,
}
```

### BEFORE (Numeric - Weak)
```typescript
{
  explanation: "Product B: Cost ($40) > NRV ($38 - $2 = $36), so use NRV. 200 × $36 = $7,200",
}
```

### AFTER (Numeric - Enhanced)
```typescript
{
  explanation: `**Formula:** Report at Lower of Cost or Net Realizable Value (NRV)
NRV = Selling Price - Cost to Complete and Sell

**Calculation:**
Step 1: Calculate NRV
  NRV = $38 (selling price) - $2 (cost to sell) = $36
Step 2: Compare to Cost
  Cost ($40) > NRV ($36)
Step 3: Apply LCNRV rule
  Use lower value: $36 × 200 units = $7,200

**Authoritative Basis (ASC 330-10-35-1B):**
Inventory should be measured at the lower of cost or net realizable value. When NRV falls below cost, a write-down is required.

**Common Mistakes:**
- Using selling price ($38) instead of NRV ($36): Must deduct costs to sell
- Forgetting to multiply by quantity
- Using replacement cost (IFRS uses LC-NRV, US GAAP uses LCNRV only for most inventory)`,
}
```

---

## TBS-Specific Enhancements

### Multi-Requirement Context
For TBS with multiple related requirements:
- Each explanation should stand alone but reference connections
- First requirement can provide overview context
- Later requirements can say "Building on requirement 1..."

### Exhibit References
When the answer requires using exhibit data:
- Explicitly reference which exhibit
- Quote relevant numbers from exhibit
- Show how exhibit data feeds into calculation

### Grading Insight
Include notes about partial credit where applicable:
- "Partial credit available for correct account with wrong amount"
- "No partial credit - must cite exact ASC paragraph"

---

## Authoritative Reference Guide for TBS

### FAR TBS References
| Topic | Primary Source | Example Citation |
|-------|----------------|------------------|
| Leases | ASC 842 | ASC 842-20-30-1 (initial measurement) |
| Revenue | ASC 606 | ASC 606-10-25-19 (distinct goods) |
| Inventory | ASC 330 | ASC 330-10-35-1B (LCNRV) |
| Deferred Taxes | ASC 740 | ASC 740-10-25 (recognition) |
| Consolidation | ASC 810 | ASC 810-10-15 (scope) |
| Government | GASB 34 | Fund financial statements |

### AUD TBS References
| Topic | Primary Source | Example Citation |
|-------|----------------|------------------|
| Audit Reports | AU-C 700 | Standard unmodified opinion |
| Sampling | AU-C 530 | Statistical sampling |
| Internal Control | AU-C 315 | Understanding controls |
| Going Concern | AU-C 570 | Substantial doubt |
| Subsequent Events | AU-C 560 | Types I and II |

### REG/TCP TBS References
| Topic | Primary Source | Example Citation |
|-------|----------------|------------------|
| Individual Tax | IRC § specific | IRC §162 (business deductions) |
| Property | IRC §1001, 1031 | Gain recognition, like-kind |
| Partnerships | IRC §704, 705 | Basis, allocations |
| S Corps | IRC §1361-1379 | Eligibility, pass-through |
| Estate/Gift | IRC §2001, 2501 | Tax calculations |

### BAR TBS References
| Topic | Primary Source | Example Citation |
|-------|----------------|------------------|
| Ratios | Industry standards | DuPont analysis formula |
| CVP Analysis | Managerial accounting | Break-even formula |
| Variances | Standard costing | Price/quantity variance formulas |

### ISC TBS References
| Topic | Primary Source | Example Citation |
|-------|----------------|------------------|
| IT Controls | COBIT | Control objectives |
| SOC Reports | AICPA Guide | Type 1 vs Type 2 |
| Security | NIST 800-53 | Control families |

---

## Quality Checklist for TBS Explanations

For each enhanced requirement explanation:
- [ ] Authoritative reference included (ASC, IRC, AU-C, etc.)
- [ ] Shows calculation steps (if numeric/journal)
- [ ] Explains why wrong options are wrong (if dropdown)
- [ ] References relevant exhibit data
- [ ] Warns of common mistakes
- [ ] Provides contextual interpretation (what does this mean?)
- [ ] Length appropriate: 100-250 words per requirement
- [ ] Uses proper formatting (bold headers, bullet points)
- [ ] Terminology matches CPA exam style

---

## Implementation Approach

### Phase 1: Pilot Batch (10 TBS Questions)
Select diverse mix from exam-tbs.ts:
- 3 journal entry TBS (highest complexity)
- 4 numeric entry TBS (most common)
- 2 dropdown/document review TBS
- 1 research TBS

**Priority IDs:**
1. tbs-far-001 (Finance Lease - Journal Entry)
2. tbs-far-002 (LCNRV - Numeric Entry)
3. tbs-aud-001 (Audit Report - Document Review)
4. tbs-far-003 (Research - Citation)
5. tbs-far-004 (Government Funds - Numeric)
6. tbs-far-005 (Deferred Taxes - Numeric)
7. tbs-aud-002 (Sampling - Numeric)
8. tbs-reg-001 (Contracts - Dropdown)
9. tbs-tcp-001 (Tax Planning - Numeric)
10. tbs-bar-001 (Ratio Analysis - Numeric)

### Phase 2: Enhancement Process
For each TBS:
1. Review all requirements and exhibits
2. Research authoritative source for each requirement
3. Write enhanced explanation following templates above
4. Add common mistake warnings
5. Ensure exhibit references are explicit
6. Review for consistency across requirements

### Phase 3: Validate Pilot
- Review all enhanced explanations for accuracy
- Verify authoritative references are current
- Check explanation lengths (target: 100-250 words each)
- Ensure formatting renders properly in UI
- Test in TBSContainer review mode

### Phase 4: Scale to All 58 Exam TBS
After pilot validation:
- FAR TBS: 11 questions
- AUD TBS: 11 questions
- REG TBS: 10 questions
- TCP TBS: 9 questions
- BAR TBS: 9 questions
- ISC TBS: 8 questions

---

## Progress Tracking

### Pilot Phase (10 TBS)
- [ ] tbs-far-001 enhanced
- [ ] tbs-far-002 enhanced
- [ ] tbs-aud-001 enhanced
- [ ] tbs-far-003 enhanced
- [ ] tbs-far-004 enhanced
- [ ] tbs-far-005 enhanced
- [ ] tbs-aud-002 enhanced
- [ ] tbs-reg-001 enhanced
- [ ] tbs-tcp-001 enhanced
- [ ] tbs-bar-001 enhanced
- [ ] Pilot validation complete

### Full Enhancement Phase
- [ ] FAR TBS (11 questions)
- [ ] AUD TBS (11 questions)
- [ ] REG TBS (10 questions)
- [ ] TCP TBS (9 questions)
- [ ] BAR TBS (9 questions)
- [ ] ISC TBS (8 questions)

---

## Success Metrics

### Pilot Success Criteria
- 10 TBS questions enhanced (all requirements)
- All pass quality checklist
- Average requirement explanation: 100-250 words
- 100% have authoritative references
- 100% have common mistake warnings

### Full Enhancement Goals
- 58 TBS questions enhanced
- Consistent quality across all sections
- Student comprehension improved (measure via feedback)
- Reduced confusion in exam history review mode
