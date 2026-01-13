# TBS Question Bank Expansion Documentation

**Date:** January 10, 2026
**Commit:** `b8ce9b4`
**Author:** Claude Code via Happy

## Overview

Expanded the Task-Based Simulation (TBS) question bank from 300 to 500 total questions by adding 25 new questions to each of the 6 CPA exam sections.

## Final Question Distribution

| Section | Original | Added | Total | ID Range |
|---------|----------|-------|-------|----------|
| FAR | 50 | 25 | 75 | tbs-far-001 to tbs-far-075 |
| AUD | 50 | 25 | 75 | tbs-aud-001 to tbs-aud-075 |
| REG | 50 | 25 | 75 | tbs-reg-001 to tbs-reg-075 |
| TCP | 50 | 25 | 75 | tbs-tcp-001 to tbs-tcp-075 |
| BAR | 50 | 25 | 75 | tbs-bar-001 to tbs-bar-075 |
| ISC | 50 | 25 | 75 | tbs-isc-001 to tbs-isc-075 |
| **TOTAL** | **300** | **150** | **500** | |

## Files Modified/Created

### New Files
- `src/lib/data/tbs/far-tbs.ts` - FAR section questions
- `src/lib/data/tbs/aud-tbs.ts` - AUD section questions
- `src/lib/data/tbs/reg-tbs.ts` - REG section questions
- `src/lib/data/tbs/tcp-tbs.ts` - TCP section questions
- `src/lib/data/tbs/bar-tbs.ts` - BAR section questions
- `src/lib/data/tbs/isc-tbs.ts` - ISC section questions
- `src/lib/data/tbs/index.ts` - Central export file
- `src/lib/data/tbs/tbs-research-guide.md` - Research guide

### Modified Files
- `src/lib/data/tbs/sample-tbs.ts` - Updated with additional questions
- `src/lib/data/tbs/types.ts` - Type definitions (minor update)

## Question Requirements Met

1. **TBS Type Variety:** numeric_entry, dropdown, document_review, research, reconciliation, journal_entry
2. **Difficulty Distribution:** ~25% easy, ~60% medium, ~15% hard per section
3. **Content Area Coverage:** Even distribution across each section's content areas
4. **ID Schema:** Continued existing pattern (tbs-xxx-###)
5. **Work Process:** Batches of 10 questions with TypeScript verification between batches

---

## Errors Encountered and Resolutions

### Error 1: Duplicate Variable Names (BAR Section)

**Location:** `src/lib/data/tbs/bar-tbs.ts`

**Problem:** New question variable names conflicted with existing variables in the file:
- `barTransferPricingTBS` (already existed)
- `barEVACalculationTBS` (already existed)
- `barSegmentReportingTBS` (already existed)
- `barTargetCostingTBS` (already existed)
- `barProcessCostingTBS` (already existed)
- And others...

**Error Message:**
```
Cannot redeclare block-scoped variable 'barTransferPricingTBS'
```

**Resolution:** Renamed all conflicting variables to unique names:
- `barTransferPricingTBS` → `barDivisionalTransferTBS`
- `barEVACalculationTBS` → `barEVAResidualTBS`
- `barSegmentReportingTBS` → `barSegmentMarginTBS`
- `barTargetCostingTBS` → `barTargetCostGapTBS`
- `barProcessCostingTBS` → `barWeightedAvgProcessTBS`
- `barWorkingCapitalTBS` → `barCashConversionTBS`
- `barCapitalRationingTBS` → `barProjectRankingTBS`
- `barJITCostingTBS` → `barJITImplementationTBS`
- `barRegressionAnalysisTBS` → `barCostRegressionTBS`
- `barRiskAdjustedReturnTBS` → `barCAPMProjectTBS`

**Prevention:** Always search for existing variable names before creating new ones:
```bash
grep -n "export const barVariableName" src/lib/data/tbs/bar-tbs.ts
```

---

### Error 2: Wrong Field Name in Requirements

**Location:** All new questions initially

**Problem:** Used `questionText` instead of `label` in TBSRequirement objects.

**Error Message:**
```
Property 'questionText' does not exist in type 'TBSRequirement'
```

**Resolution:** Changed all instances of `questionText` to `label`.

**Correct Pattern:**
```typescript
{
  id: "req1",
  order: 1,
  type: "numeric",
  label: "Calculate the total amount",  // NOT questionText
  correctAnswer: { type: "numeric", value: 123, tolerance: 0 },
  points: 2,
  explanation: "Explanation here"
}
```

---

### Error 3: Missing Required Fields in Requirements

**Location:** All new questions initially

**Problem:** TBSRequirement interface requires `order` and `explanation` fields that were initially omitted.

**Error Message:**
```
Property 'order' is missing in type...
Property 'explanation' is missing in type...
```

**Resolution:** Added `order` and `explanation` to all requirement objects.

**Correct Pattern:**
```typescript
{
  id: "req1",
  order: 1,  // REQUIRED
  type: "numeric",
  label: "Question text",
  correctAnswer: { type: "numeric", value: 123, tolerance: 0 },
  points: 2,
  explanation: "How to calculate: ..."  // REQUIRED
}
```

---

### Error 4: Missing Properties in Table Exhibit Content

**Location:** All table exhibits initially

**Problem:** TableContent objects require `type: 'table'` and `title` inside the content object, not just at the exhibit level.

**Error Message:**
```
Property 'type' is missing in type '{ headers: string[]; rows: ... }'
Property 'title' is missing in type...
```

**Resolution:** Added `type: 'table'` and `title` inside each content object.

**Correct Pattern:**
```typescript
{
  id: "ex1",
  order: 1,
  type: "table",
  title: "Data Table",
  content: {
    type: "table",     // REQUIRED inside content
    title: "Data Table",  // REQUIRED inside content
    headers: ["Col1", "Col2"],
    rows: [{ cells: ["val1", "val2"] }]
  }
}
```

---

### Error 5: Duplicate Export Array

**Location:** `src/lib/data/tbs/bar-tbs.ts`

**Problem:** A second export array was accidentally created when adding new questions, causing conflicts.

**Error Message:**
```
Cannot redeclare block-scoped variable 'barQuestions'
```

**Resolution:**
1. Deleted the duplicate export array
2. Used `.push()` method to add new questions to existing array at end of file:

```typescript
// At end of file after all question definitions
barTBSQuestions.push(
  barNewQuestion1,
  barNewQuestion2,
  // ...
);
```

---

### Error 6: Export Array References Before Definition

**Location:** `src/lib/data/tbs/bar-tbs.ts`

**Problem:** New question variable names were added to the export array before the questions were defined in the file (export array was in middle of file, new questions at end).

**Error Message:**
```
Block-scoped variable 'barCashConversionTBS' used before its declaration
```

**Resolution:** Used `.push()` method at the END of the file after all question definitions instead of modifying the original export array in the middle of the file.

**Pattern:**
```typescript
// Original export array stays where it is
export const barTBSQuestions: TBSQuestion[] = [
  existingQuestion1,
  existingQuestion2,
  // ...
];

// New questions defined later in file
export const newQuestion1: TBSQuestion = { ... };
export const newQuestion2: TBSQuestion = { ... };

// At very end of file, push new questions
barTBSQuestions.push(
  newQuestion1,
  newQuestion2
);
```

---

### Error 7: Checkbox Type Not Supported

**Location:** `src/lib/data/tbs/isc-tbs.ts` (ISC Batch 1)

**Problem:** Used `type: "checkbox"` with `checkboxOptions` array, but `TBSRequirement` interface only supports `dropdownOptions`.

**Error Message:**
```
Object literal may only specify known properties, and 'checkboxOptions' does not exist in type 'TBSRequirement'
```

**Resolution:** Converted all checkbox questions to dropdown format with combined answer options.

**Before (Invalid):**
```typescript
{
  type: "checkbox",
  label: "Select all that apply",
  checkboxOptions: [
    { id: "ck1", text: "Option 1", isCorrect: true },
    { id: "ck2", text: "Option 2", isCorrect: true },
    { id: "ck3", text: "Option 3", isCorrect: false }
  ],
  correctAnswer: { type: "checkbox", correctSelections: ["ck1", "ck2"] }
}
```

**After (Valid):**
```typescript
{
  type: "dropdown",
  label: "Which combination is correct?",
  dropdownOptions: [
    { id: "opt1", order: 1, text: "Option 1 and Option 2", isCorrect: true },
    { id: "opt2", order: 2, text: "Option 1 only", isCorrect: false },
    { id: "opt3", order: 3, text: "All options", isCorrect: false }
  ],
  correctAnswer: { type: "dropdown", correctOptionId: "opt1" }
}
```

**Note:** If checkbox functionality is needed in the future, the `TBSRequirement` interface in `types.ts` would need to be extended to include `checkboxOptions`.

---

### Error 8: Duplicate Variable Names (ISC Section)

**Location:** `src/lib/data/tbs/isc-tbs.ts`

**Problem:** Similar to BAR, some new ISC question names conflicted with existing ones:
- `iscNetworkSecurityTBS` (already existed)
- `iscChangeManagementTBS` (already existed)

**Resolution:** Renamed to unique names:
- `iscNetworkSecurityTBS` → `iscFirewallAnalysisTBS`
- `iscChangeManagementTBS` → `iscITGCChangeMetricsTBS`

---

### Error 9: Missing Dropdown Options Fields

**Location:** Various dropdown requirements

**Problem:** DropdownOption objects require `order` and `isCorrect` fields.

**Error Message:**
```
Property 'order' is missing in type '{ id: string; text: string; }'
```

**Resolution:** Added `order` and `isCorrect` to all dropdown options.

**Correct Pattern:**
```typescript
dropdownOptions: [
  { id: "opt1", order: 1, text: "First option", isCorrect: true },
  { id: "opt2", order: 2, text: "Second option", isCorrect: false },
  { id: "opt3", order: 3, text: "Third option", isCorrect: false },
  { id: "opt4", order: 4, text: "Fourth option", isCorrect: false }
]
```

---

## Type Reference

### TBSRequirement Interface (from types.ts)
```typescript
export interface TBSRequirement {
  id: string;
  order: number;                    // REQUIRED
  type: RequirementType;
  label: string;                    // NOT questionText
  description?: string;
  cellReference?: string;
  gridRow?: number;
  gridColumn?: number;
  points: number;
  correctAnswer: CorrectAnswer;
  partialCreditRules?: PartialCreditRule[];
  explanation: string;              // REQUIRED
  hint?: string;
  dropdownOptions?: DropdownOption[]; // For dropdown type only
}
```

### DropdownOption Interface
```typescript
export interface DropdownOption {
  id: string;
  order: number;      // REQUIRED
  text: string;
  isCorrect: boolean; // REQUIRED
}
```

### TableContent Interface
```typescript
// Content object for table exhibits must include:
{
  type: 'table',      // REQUIRED
  title: string,      // REQUIRED
  headers: string[],
  rows: { cells: string[] }[]
}
```

---

## Best Practices for Future TBS Additions

1. **Check for existing variable names** before creating new ones
2. **Use `.push()` at end of file** to add to export arrays
3. **Always include required fields:** `order`, `explanation`, `label`
4. **Table content objects** need `type: 'table'` and `title` inside content
5. **Dropdown options** need `order` and `isCorrect` fields
6. **Run `npx tsc --noEmit`** after each batch to catch errors early
7. **Checkbox type is not supported** - use dropdown with combined options instead
8. **Work in batches of 10** to catch and fix errors incrementally

---

## Verification Commands

```bash
# Check TypeScript compilation
npx tsc --noEmit

# Count questions in a file
grep -c "id: \"tbs-" src/lib/data/tbs/isc-tbs.ts

# Find existing variable names
grep "export const isc" src/lib/data/tbs/isc-tbs.ts | head -20

# Check for duplicate variable declarations
grep "export const barTransferPricingTBS" src/lib/data/tbs/bar-tbs.ts
```
