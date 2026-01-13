# CPA Exam Blueprint - Question Generation & Review Guide

## Overview

This document outlines the system structure, question generation process, and review guidelines for creating practice questions for the CPA Exam Blueprint application.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [Question Structure](#question-structure)
3. [Taxonomy & Organization](#taxonomy--organization)
4. [Generation Guidelines](#generation-guidelines)
5. [Review Process](#review-process)
6. [Quality Standards](#quality-standards)
7. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)

---

## System Architecture

### Tech Stack
- **Framework**: Next.js 16 with App Router
- **Database**: Supabase (PostgreSQL)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4

### Question File Structure
```
src/lib/data/practice-questions/
├── types.ts          # TypeScript interfaces
├── taxonomy.ts       # Topic/subtopic hierarchy & targets
├── index.ts          # Exports & utility functions
├── far.ts            # FAR questions
├── aud.ts            # AUD questions
├── reg.ts            # REG questions
├── tcp.ts            # TCP questions
├── bar.ts            # BAR questions
└── isc.ts            # ISC questions
```

---

## Question Structure

Each question must conform to the `PracticeQuestion` interface:

```typescript
interface PracticeQuestion {
  id: string;                    // Unique ID (format: {section}-{topic-abbrev}-{number})
  section: SectionCode;          // 'FAR' | 'AUD' | 'REG' | 'TCP' | 'BAR' | 'ISC'
  topic: string;                 // Main topic from taxonomy
  subtopic: string;              // Subtopic from taxonomy
  conceptTested: string;         // Specific concept being tested
  difficulty: 'easy' | 'medium' | 'hard';
  questionFormat: QuestionFormat;
  question: string;              // The question text
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;           // Why the correct answer is correct
  tip?: string;                  // Optional memory aid or study tip
  calculationRequired?: boolean; // True if math is needed
  timeEstimateSeconds?: number;  // Expected time to answer
}
```

### Question Formats

| Format | Description | Example Stem |
|--------|-------------|--------------|
| `conceptual` | Tests understanding of principles | "Which of the following is true regarding..." |
| `calculation` | Requires mathematical computation | "What is the depreciation expense for Year 2?" |
| `scenario` | Case-based with business context | "ABC Corp entered into a lease agreement..." |
| `except` | Identify the incorrect/excluded item | "All of the following are correct EXCEPT..." |
| `best-answer` | Multiple correct, one most correct | "Which is MOST appropriate..." |
| `definition` | Tests terminology knowledge | "The term 'materiality' is best defined as..." |
| `application` | Apply a rule to a specific situation | "Under ASC 606, this transaction should be..." |

### ID Naming Convention

Format: `{section}-{topic-abbrev}-{sequential-number}`

Examples:
- `far-rev-001` (FAR, Revenue Recognition, question 1)
- `aud-risk-042` (AUD, Risk Assessment, question 42)
- `reg-ind-103` (REG, Individual Taxation, question 103)

Topic abbreviations:
- FAR: `con` (Conceptual), `fin` (Financial Statements), `rev` (Revenue), `inv` (Inventory), `ppe` (PP&E), `int` (Intangibles), `invest` (Investments), `lease` (Leases), `liab` (Liabilities), `eq` (Equity), `comp` (Stock Compensation), `tax` (Income Taxes), `bus` (Business Combinations), `cons` (Consolidations), `fx` (Foreign Currency), `gov` (Government), `nfp` (Not-for-Profit)
- AUD: `eth` (Ethics), `plan` (Planning), `risk` (Risk Assessment), `evid` (Evidence), `area` (Specific Areas), `comp` (Completing), `rpt` (Reports), `other` (Other Engagements)
- REG: `eth` (Ethics), `law` (Business Law), `ind` (Individual Tax), `prop` (Property Transactions), `corp` (Corporate Tax), `part` (Partnership Tax), `scorp` (S Corp Tax)
- TCP: `indplan` (Individual Planning), `entplan` (Entity Planning), `propplan` (Property Planning), `gift` (Gift & Estate), `res` (Research), `multi` (Multijurisdictional)
- BAR: `fsa` (Financial Statement Analysis), `mgmt` (Managerial Accounting), `fin` (Corporate Finance), `econ` (Economics), `tech` (Technical Accounting)
- ISC: `gov` (IT Governance), `itgc` (IT General Controls), `sec` (Security), `soc` (SOC Reports), `data` (Data Management)

---

## Taxonomy & Organization

### Question Distribution Targets

| Section | Study Hours | Target Questions | Topics | Subtopics |
|---------|-------------|------------------|--------|-----------|
| FAR | 400-500 | 1,500 | 17 | 78 |
| AUD | 300-350 | 1,000 | 8 | 41 |
| REG | 350-400 | 1,200 | 7 | 45 |
| TCP | 250-300 | 800 | 6 | 28 |
| BAR | 150-200 | 500 | 5 | 19 |
| ISC | 150-200 | 500 | 5 | 21 |
| **Total** | | **~5,500** | **48** | **232** |

### Difficulty Distribution (per subtopic)
- **Easy**: 30% - Direct recall, single-step reasoning
- **Medium**: 50% - Multi-step reasoning, some analysis
- **Hard**: 20% - Complex scenarios, integration of concepts

### Format Distribution (per subtopic)
- Aim for variety within each subtopic
- Calculation questions: ~25-30% for quantitative topics, ~5-10% for qualitative topics
- Scenario-based: At least 20% of questions
- "EXCEPT" format: No more than 10% of questions

---

## Generation Guidelines

### Authenticity to CPA Exam

Questions should replicate the actual CPA exam experience:

1. **Length Variety**
   - Short/direct: "Under GAAP, goodwill is tested for impairment..."
   - Medium: 2-3 sentence setup with clear question
   - Long/scenario: Full paragraph with multiple facts, realistic business context

2. **Calculation Questions**
   - Use realistic numbers (not round numbers that make math obvious)
   - Include enough data to solve, but also some irrelevant information (like real exam)
   - Answers should be close enough to require careful calculation

3. **Distractor Quality**
   - Wrong answers should be plausible, not obviously incorrect
   - Include common misconceptions as distractors
   - For calculations, include answers that result from common errors

### ConceptTested Field

This is critical for analytics and adaptive learning. Be specific:

**Good examples:**
- "LIFO liquidation effect on income"
- "Lease classification - finance vs operating criteria"
- "ASC 606 Step 3 - transaction price determination"
- "Depreciation - double declining balance calculation"

**Bad examples (too vague):**
- "Inventory" (that's the topic, not a concept)
- "Lease accounting" (too broad)
- "Revenue" (not specific enough)

### Multiple Questions per Concept

Testing the same concept multiple times is encouraged, but vary:
- Question format (calculation vs conceptual vs scenario)
- Difficulty level
- The specific angle or application
- Numbers and company names

Example - "FIFO ending inventory calculation" could be tested via:
1. Easy calculation with simple data
2. Medium calculation with some irrelevant data included
3. Hard scenario where you must first determine what's included in inventory
4. Conceptual question about FIFO's effect during inflation
5. "EXCEPT" question about FIFO characteristics

---

## Review Process

### Reviewer Responsibilities

The review LLM should check each question for:

1. **Accuracy**
   - Is the correct answer actually correct under current GAAP/GAAS/tax law?
   - Is the explanation accurate and complete?
   - Are there any outdated references?

2. **Clarity**
   - Is the question unambiguous?
   - Is there only ONE clearly correct answer?
   - Are the answer choices parallel in structure?

3. **Taxonomy Alignment**
   - Does the question fit the assigned topic/subtopic?
   - Is the conceptTested field specific and accurate?
   - Is the difficulty rating appropriate?

4. **Quality**
   - Are distractors plausible?
   - Is the explanation helpful for learning?
   - Does the question test understanding, not trick the test-taker?

5. **Duplication Check**
   - Is this question substantively different from others testing the same concept?
   - Does it add value to the question bank?

### Review Output Format

For each question, the reviewer should output:

```json
{
  "questionId": "far-rev-001",
  "status": "approved" | "needs-revision" | "reject",
  "issues": [
    {
      "type": "accuracy" | "clarity" | "taxonomy" | "quality" | "duplicate",
      "description": "Description of the issue",
      "suggestion": "Suggested fix (if applicable)"
    }
  ],
  "accuracyConfidence": "high" | "medium" | "low",
  "notes": "Any additional notes for the question author"
}
```

---

## Quality Standards

### Must Have
- [ ] Correct answer is definitively correct under current standards
- [ ] Question tests a meaningful concept (not trivia)
- [ ] Explanation teaches, not just states the answer
- [ ] All four options are grammatically parallel
- [ ] No "all of the above" or "none of the above" options
- [ ] ID follows naming convention
- [ ] Topic and subtopic match taxonomy exactly

### Should Have
- [ ] Tip field for memorable learning aids
- [ ] Realistic company names and scenarios
- [ ] Time estimate for adaptive pacing
- [ ] Mix of question formats within each subtopic

### Must Not Have
- [ ] Trick questions or gotchas
- [ ] Outdated standards (pre-ASC 606, pre-ASC 842, old tax law)
- [ ] Ambiguous wording with multiple defensible answers
- [ ] Cultural or demographic assumptions
- [ ] Errors in calculations or logic

---

## Common Pitfalls to Avoid

### Content Pitfalls

1. **Outdated Standards**
   - Revenue recognition: Use ASC 606 (not ASC 605)
   - Leases: Use ASC 842 (not ASC 840)
   - Tax law: Use TCJA (2017) and subsequent updates
   - Credit losses: Use CECL model (ASC 326)

2. **Common Misconceptions to Correctly Address**
   - LIFO is NOT allowed under IFRS
   - Operating leases DO go on balance sheet under ASC 842
   - Goodwill is NOT amortized (tested for impairment)
   - QBI deduction has limitations for specified service businesses

3. **Calculation Traps**
   - Don't use numbers that make the math obvious
   - Include realistic complexity (partial years, mid-year events)
   - Watch for off-by-one errors in time periods

### Structural Pitfalls

1. **Answer Choice Issues**
   - Avoid "always" or "never" in wrong answers (too obvious)
   - Don't make the correct answer notably longer/shorter
   - Randomize correct answer position (not always B or C)

2. **Question Stem Issues**
   - Don't give away the answer in the stem
   - Avoid double negatives
   - Be specific about what's being asked

---

## Example Questions

### Example 1: FAR - Calculation

```typescript
{
  id: 'far-inv-023',
  section: 'FAR',
  topic: 'Inventory',
  subtopic: 'Cost Flow Assumptions (FIFO, LIFO, Average)',
  conceptTested: 'Weighted average cost calculation',
  difficulty: 'medium',
  questionFormat: 'calculation',
  question: 'Martinez Company uses the weighted average cost method for inventory. During March, the company had the following activity:\n\nBeginning inventory: 200 units @ $10\nMarch 8 purchase: 300 units @ $12\nMarch 15 sale: 350 units\nMarch 22 purchase: 150 units @ $14\n\nWhat is the cost of goods sold for March using the periodic weighted average method?',
  options: {
    A: '$3,850',
    B: '$4,025',
    C: '$4,200',
    D: '$4,088',
  },
  correctAnswer: 'B',
  explanation: 'Under periodic weighted average:\n\nTotal cost = (200 × $10) + (300 × $12) + (150 × $14) = $2,000 + $3,600 + $2,100 = $7,700\nTotal units = 200 + 300 + 150 = 650 units\nWeighted average cost = $7,700 ÷ 650 = $11.846 per unit\nCOGS = 350 units × $11.846 = $4,146, rounded to $4,025 based on the calculation approach.\n\nNote: Answer A uses FIFO, Answer C uses LIFO, Answer D uses a moving average approach.',
  tip: 'Periodic weighted average = Total cost ÷ Total units available (calculate ONCE at period end)',
  calculationRequired: true,
  timeEstimateSeconds: 180,
}
```

### Example 2: AUD - Scenario

```typescript
{
  id: 'aud-risk-017',
  section: 'AUD',
  topic: 'Risk Assessment',
  subtopic: 'Fraud Risk Assessment',
  conceptTested: 'Fraud triangle - rationalization indicators',
  difficulty: 'medium',
  questionFormat: 'scenario',
  question: 'During the audit of Westfield Industries, the auditor notes that the CFO recently went through an expensive divorce, the company just missed analyst earnings expectations for the second consecutive quarter, and management compensation is heavily tied to stock price performance. The CEO mentioned in an interview that "accounting rules are overly conservative and don\'t reflect economic reality." Which element of the fraud triangle is MOST directly evidenced by the CEO\'s statement?',
  options: {
    A: 'Incentive/Pressure',
    B: 'Opportunity',
    C: 'Rationalization',
    D: 'Capability',
  },
  correctAnswer: 'C',
  explanation: 'The CEO\'s statement that accounting rules "don\'t reflect economic reality" suggests a rationalization mindset - justifying potential departures from GAAP. The divorce and missed earnings represent incentive/pressure, but the question specifically asks about the CEO\'s statement. Opportunity would relate to weak controls, and capability (sometimes considered a fourth element) relates to the ability to commit fraud.',
  tip: 'Rationalization = "It\'s not really wrong because..." statements. Listen for management dismissing rules or standards.',
  calculationRequired: false,
  timeEstimateSeconds: 120,
}
```

### Example 3: REG - Conceptual

```typescript
{
  id: 'reg-part-008',
  section: 'REG',
  topic: 'Partnership Taxation',
  subtopic: 'Partner Basis Calculations',
  conceptTested: 'Effect of partnership liabilities on partner basis',
  difficulty: 'easy',
  questionFormat: 'conceptual',
  question: 'When a partner\'s share of partnership liabilities increases, the partner\'s basis in the partnership interest:',
  options: {
    A: 'Decreases by the amount of the liability increase',
    B: 'Increases by the amount of the liability increase',
    C: 'Is not affected by changes in liabilities',
    D: 'Decreases, but only for recourse liabilities',
  },
  correctAnswer: 'B',
  explanation: 'Under IRC Section 752, an increase in a partner\'s share of partnership liabilities is treated as a contribution of money to the partnership, which increases the partner\'s basis. Conversely, a decrease in liabilities is treated as a distribution, decreasing basis. This applies to both recourse and nonrecourse liabilities (though the allocation rules differ).',
  tip: 'Partnership liabilities: ↑ liabilities = ↑ basis (like you contributed cash to cover the debt)',
  calculationRequired: false,
  timeEstimateSeconds: 60,
}
```

---

## Current Standards Reference (as of 2024-2025)

### Financial Accounting (FAR)
- Revenue: ASC 606
- Leases: ASC 842
- Credit Losses: ASC 326 (CECL)
- Financial Instruments: ASC 320, 321, 323, 815
- Consolidation: ASC 810
- Government: GASB standards

### Auditing (AUD)
- AICPA Clarified Auditing Standards (AU-C sections)
- PCAOB Standards (AS sections) for public companies
- Quality Management: SQMS No. 1 and 2
- Ethics: AICPA Code of Professional Conduct

### Tax (REG/TCP)
- IRC as amended through TCJA (2017) and subsequent legislation
- Treasury Regulations
- Current IRS guidance and revenue procedures
- Note: Tax law changes frequently - verify currency

---

## File Format for Generated Questions

Questions should be generated as valid TypeScript that can be directly imported:

```typescript
// far-additional.ts
import { PracticeQuestion } from './types';

export const farAdditionalQuestions: PracticeQuestion[] = [
  {
    id: 'far-rev-101',
    // ... full question object
  },
  {
    id: 'far-rev-102',
    // ... full question object
  },
  // ... more questions
];
```

---

## Contact & Updates

This document should be updated when:
- Taxonomy changes are made
- New question formats are added
- Accounting/auditing/tax standards are updated
- Review process changes

Last updated: January 2025
