# MCQ Explanation Enhancement Plan

**Created:** January 12, 2026
**Status:** In Progress - Pilot Phase
**Scope:** 6,065 MCQ questions across FAR, AUD, REG, TCP, BAR, ISC

---

## Executive Summary

Enhance all MCQ explanations to be thorough, authoritative, and exam-aligned. Students should truly understand concepts and be prepared for the actual CPA exam.

**Pilot:** 100 FAR questions (mix of calculation, conceptual, scenario)
**Scale:** All 6,065 questions after pilot validation

---

## Current State Analysis

| Metric | Current | Target |
|--------|---------|--------|
| Authoritative references (ASC, IRC, AU-C) | 11% | 95%+ |
| Distractor explanations (why wrong answers are wrong) | ~10% | 100% |
| Calculation step-by-step | ~30% | 100% of calculation Qs |
| Memory tips | ~60% | 100% |

**Quality Distribution:**
- Good explanations: ~40% (have refs, explain why)
- Weak explanations: ~40% (definition only, no context)
- Adequate: ~20% (functional but improvable)

---

## Enhanced Explanation Template

Each explanation will follow this structure:

### 1. CORRECT ANSWER RATIONALE
- State why the correct answer is right
- Include authoritative reference (ASC ###, IRC §###, AU-C ###)
- Explain the underlying principle or rule

### 2. DISTRACTOR ANALYSIS
- Explain why each wrong answer is incorrect
- Identify the common misconception each represents
- Help student recognize similar traps on real exam

### 3. CALCULATION STEPS (if applicable)
- Show formula with variable definitions
- Step-by-step computation
- Final answer with units/format

### 4. MEMORY TIP
- One concise sentence
- Mnemonic device when helpful
- Actionable rule to remember

---

## Example Transformations

### BEFORE (Weak Explanation)
```
Question: far-cf-024 (Timeliness)
Explanation: "Timeliness means having information available to decision-makers
in time to be capable of influencing their decisions."
Tip: "Timeliness = available when it can still influence decisions."
```

### AFTER (Enhanced Explanation)
```
Explanation: "Per FASB Concepts Statement 8, timeliness means having information
available to decision-makers in time to influence their decisions.

Why other answers are wrong:
- (A) 30-day reporting: No specific time requirement exists; timeliness is
  context-dependent based on decision-making needs
- (C) Real-time only: Historical information can still be timely if it confirms
  or changes expectations
- (D) Annual basis: Quarterly/interim reporting demonstrates timeliness isn't
  limited to annual periods

Timeliness is an ENHANCING characteristic (not fundamental). The fundamental
characteristics are relevance and faithful representation."

Tip: "Timeliness = ENHANCING characteristic. No fixed deadline - just 'in time
to influence decisions.'"
```

### BEFORE (Calculation - Missing Steps)
```
Question: bar-001-007 (Inventory Turnover)
Explanation: "Inventory turnover = COGS / Average inventory. Average inventory
= ($80,000 + $100,000) / 2 = $90,000. Inventory turnover = $720,000 / $90,000
= 8.0 times."
```

### AFTER (Calculation - Full Enhancement)
```
Explanation: "Inventory turnover measures how efficiently a company sells and
replaces inventory.

**Formula:** Inventory Turnover = Cost of Goods Sold ÷ Average Inventory

**Calculation:**
Step 1: Calculate average inventory
  Average Inventory = (Beginning + Ending) ÷ 2
  = ($80,000 + $100,000) ÷ 2 = $90,000

Step 2: Apply turnover formula
  Turnover = $720,000 ÷ $90,000 = 8.0 times

**Interpretation:** The company sells and replaces its inventory 8 times per year,
or approximately every 46 days (365 ÷ 8).

Why other answers are wrong:
- Using beginning inventory only (720K ÷ 80K = 9.0): Overstates turnover
- Using ending inventory only (720K ÷ 100K = 7.2): Understates turnover
- Using sales instead of COGS: Inflates ratio due to markup"

Tip: "Inventory turnover uses COGS (not sales) and AVERAGE inventory (not
beginning or ending alone)."
```

---

## Implementation Approach

### Phase 1: Pilot Batch (100 FAR Questions)
Select diverse mix:
- 30 calculation questions (highest value-add)
- 40 conceptual questions (most common type)
- 20 scenario questions (complex reasoning)
- 10 except/definition questions (format variety)

**Selection Criteria:**
1. Prioritize questions with short explanations (<100 chars)
2. Include questions across all FAR content areas (FAR-I through FAR-IV)
3. Mix difficulty levels (easy/medium/hard)

### Phase 2: Enhance Each Question
For each question:
1. Research authoritative source (FASB ASC, AICPA, etc.)
2. Write enhanced explanation following template
3. Add distractor analysis for all wrong answers
4. Include calculation steps if applicable
5. Craft memorable tip

### Phase 3: Validate Pilot
- Review enhanced explanations for accuracy
- Check authoritative references are correct
- Ensure explanations aren't too long (target: 150-300 words)
- Verify tips are concise and memorable

### Phase 4: Scale to Full Question Bank
After pilot validation:
- Apply same process to remaining FAR questions (1,735)
- Then AUD (1,015), REG (1,345), TCP (805), BAR (490), ISC (575)

---

## Authoritative Reference Guide

### FAR References
| Topic | Primary Source |
|-------|----------------|
| Revenue Recognition | ASC 606 |
| Leases | ASC 842 |
| Financial Instruments | ASC 320, 321, 323, 326 |
| Business Combinations | ASC 805 |
| Consolidations | ASC 810 |
| Fair Value | ASC 820 |
| Income Taxes | ASC 740 |
| Inventory | ASC 330 |
| PP&E | ASC 360 |
| Intangibles | ASC 350 |
| Contingencies | ASC 450 |
| Stock Compensation | ASC 718 |
| Pensions | ASC 715 |
| EPS | ASC 260 |
| Segment Reporting | ASC 280 |
| Government Accounting | GASB Statements |
| Not-for-Profit | ASC 958 |

### AUD References
| Topic | Primary Source |
|-------|----------------|
| Audit Standards (nonissuer) | AU-C Sections |
| Audit Standards (issuer) | PCAOB AS |
| Ethics | AICPA Code of Professional Conduct |
| Quality Control | QC Section 10 |
| Attestation | AT-C Sections |
| Review Engagements | AR-C Sections |
| SSARS | AR-C 60-90 |

### REG/TCP References
| Topic | Primary Source |
|-------|----------------|
| Individual Tax | IRC Sections (specific §) |
| Corporate Tax | IRC Subchapter C |
| Partnership Tax | IRC Subchapter K |
| S Corporation | IRC Subchapter S |
| Estate/Gift Tax | IRC Chapters 11, 12 |
| Property Transactions | IRC §1001, 1031, 1033, 1221 |
| Ethics | Circular 230 |
| Business Law | UCC, Common Law |

### BAR References
| Topic | Primary Source |
|-------|----------------|
| Financial Analysis | Industry standards, ratios |
| Cost Accounting | Management accounting principles |
| Variance Analysis | Standard costing theory |
| Economics | Economic theory fundamentals |
| Data Analytics | AICPA guidance |

### ISC References
| Topic | Primary Source |
|-------|----------------|
| IT Controls | COBIT, COSO |
| Security | NIST, ISO 27001 |
| SOC Reports | AICPA SOC guidance |
| System Development | SDLC frameworks |
| Data Management | Industry best practices |

---

## Quality Checklist

For each enhanced explanation:
- [ ] Authoritative reference included (ASC, IRC, AU-C, etc.)
- [ ] Explains WHY correct answer is right (not just restating)
- [ ] All 3 distractors explained (why wrong)
- [ ] Calculation steps shown (if applicable)
- [ ] Tip is concise (1-2 sentences max)
- [ ] Total length: 150-300 words
- [ ] No outdated standards referenced
- [ ] Terminology matches CPA exam style

---

## Success Metrics

### Pilot Success Criteria
- 100 FAR questions enhanced
- All pass quality checklist
- Average explanation length: 150-300 words
- 100% have authoritative references
- 100% have distractor analysis

### Full Enhancement Goals
- 6,065 questions enhanced
- Consistent quality across all sections
- Student comprehension improved (measure via feedback)

---

## File Locations

| Section | File Path | Question Count |
|---------|-----------|----------------|
| FAR | `src/lib/data/practice-questions/far.ts` | 1,835 |
| AUD | `src/lib/data/practice-questions/aud.ts` | 1,015 |
| REG | `src/lib/data/practice-questions/reg.ts` | 1,345 |
| TCP | `src/lib/data/practice-questions/tcp.ts` | 805 |
| BAR | `src/lib/data/practice-questions/bar.ts` | 490 |
| ISC | `src/lib/data/practice-questions/isc.ts` | 575 |

---

## Research Sources

Based on CPA exam best practices from:
- [Gleim CPA Review - MCQ Tips](https://www.gleim.com/cpa-review/cpa-exam-multiple-choice-tips/)
- [UWorld Accounting - How to Tackle MCQs](https://accounting.uworld.com/blog/cpa-review/cpa-exam/how-tackle-mcqs-cpa-exam/)
- [AICPA ThisWayToCPA - MCQ Tips](https://www.thiswaytocpa.com/exam/articles/passing-exam/cpa-exam-prep-mcq-tips-shared/)
- [Becker CPA Review](https://www.becker.com/blog/cpa/the-complete-guide-to-the-far-cpa-exam)

---

## Progress Tracking

### Pilot Phase (100 FAR Questions)
- [ ] Questions selected
- [ ] Batch 1 (20 questions) enhanced
- [ ] Batch 2 (20 questions) enhanced
- [ ] Batch 3 (20 questions) enhanced
- [ ] Batch 4 (20 questions) enhanced
- [ ] Batch 5 (20 questions) enhanced
- [ ] Pilot validation complete

### Full Enhancement Phase
- [ ] FAR remaining (1,735 questions)
- [ ] AUD (1,015 questions)
- [ ] REG (1,345 questions)
- [ ] TCP (805 questions)
- [ ] BAR (490 questions)
- [ ] ISC (575 questions)
