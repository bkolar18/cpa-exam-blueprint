# Sample TBS Error Report

**Batch File:** `src/lib/data/tbs/sample-tbs.ts`
**Total Questions:** 58
**Errors Found:** 10
**Severity Distribution:** 2 HIGH, 3 MEDIUM, 5 LOW

---

## HIGH SEVERITY ERRORS

### 1. tbs-reg-009 - MACRS Mid-Quarter Convention

**Error Type:** Calculation/Conceptual Error

**What is Wrong:**
The mid-quarter convention is incorrectly applied to only the Q4 asset when it should apply to ALL assets placed in service that year.

**When Mid-Quarter Applies:**
When more than 40% of depreciable basis is placed in service in Q4.

**In This Question:**
- Total assets: $280,000
- Q4 asset (Manufacturing Equipment): $150,000
- Q4 percentage: 53.6% (exceeds 40%)

**Current Error:** Only the Q4 asset uses mid-quarter rates.

**What it Should Be:**
ALL assets must use mid-quarter convention rates:
- Computer Equipment (Q1): $60,000 × 35% = $21,000 (not $12,000 half-year)
- Office Furniture (Q2): Different mid-quarter rate
- Delivery Truck (Q1): $45,000 × 35% = $15,750 (not $9,000 half-year)
- Manufacturing Equipment (Q4): $150,000 × 3.57% = $5,355 ✓

**IRC Reference:** IRC Section 168(d)

---

### 2. tbs-bar-006 - Standard Costing WIP Credit

**Error Type:** Calculation Error

**What is Wrong:**
The WIP credit calculation contains an arithmetic error.

**Correct Calculation:**
- Materials: 21,000 lbs × $4.80 = $100,800
- Labor: 5,200 hrs × $19.50 = $101,400
- VOH Applied: $41,600
- FOH Applied: $31,200
- **Total: $100,800 + $101,400 + $41,600 + $31,200 = $275,000**

**Current (Incorrect) Answer:** $274,400

**Explanation Error:** The explanation attempts: "$41,600 + $31,200 = $72,800" which is correct, but then shows wrong total.

**What it Should Be:** WIP Credit = $275,000

---

## MEDIUM SEVERITY ERRORS

### 3. tbs-far-006 - Impairment Journal Entry

**Error Type:** Technical Error

**What is Wrong:**
The impairment loss journal entry credits "Accumulated Depreciation - Equipment" instead of directly reducing the Equipment account.

**ASC 360-10-35-17 Guidance:**
The preferred treatment is to credit the asset account directly to reduce carrying value. While crediting accumulated depreciation is an alternative, it's less common.

**Current Entry:**
Dr. Impairment Loss
Cr. Accumulated Depreciation - Equipment

**Preferred Entry:**
Dr. Impairment Loss
Cr. Equipment

**Severity:** MEDIUM (alternative is acceptable but may confuse students)

---

### 4. tbs-tcp-002 - Gift Tax Split Inconsistency

**Error Type:** Conceptual Inconsistency

**What is Wrong:**
The question's gift splitting assumption is applied inconsistently across different gifts.

**Current Issue:**
- Some gifts assume gift splitting IS elected
- Grandson UTMA gift assumes gift splitting is NOT elected ($3,000 taxable)
- Explanation notes splitting would reduce this to $0 but doesn't apply it

**What it Should Be:**
- Clearly state whether gift splitting applies to ALL gifts or none
- If splitting applies, grandson gift = $0 taxable
- If no splitting, several other answers also change

---

### 5. tbs-aud-004 - Independence Close Relative Key Position

**Error Type:** Technical Interpretation

**What is Wrong:**
The question states independence is impaired because staff accountant's father is VP of Sales at client.

**Issue:** VP of Sales may not qualify as a "key position" under AICPA ET Section 1.270. Key positions typically require:
- Financial reporting oversight
- Significant influence over accounting records
- Executive authority over financial matters

**Sales leadership generally doesn't meet this threshold unless they have unusual authority.**

**What it Should Be:**
- Clarify the father has key position authority, OR
- Note this requires judgment based on specific facts

---

## LOW SEVERITY ERRORS

### 6. tbs-far-005 - Deferred Tax Explanation Clarity

**Error Type:** Explanation Clarity

**What is Wrong:**
The explanation for DTL calculation could be clearer about which items create DTLs vs DTAs.

**Current Explanation:** "DTL items: Prepaid Insurance ($24,000) + Unearned Revenue ($40,000)..."

**Clearer Explanation Should Include:**
- Prepaid Insurance: Book basis > Tax basis → DTL
- Unearned Revenue: Tax basis > Book basis (for liabilities) → DTL

**Note:** The answer ($16,000) is correct; only explanation needs improvement.

---

### 7. tbs-tcp-003 - HSA Limit Year Reference

**Error Type:** Potentially Outdated

**What is Wrong:**
The HSA family limit of $7,750 matches 2023 limits.

**2024 Limits:** $8,300 (family), $4,150 (self-only)

**Mitigation:** The question uses "Year 1" abstraction, so this is acceptable if intentional.

---

### 8. tbs-far-008 - Bond Issue Price Rounding

**Error Type:** Calculation Precision

**What is Wrong:**
The answer ($918,891) differs from calculation using exhibit PV factors ($918,927).

**Using Table Factors:**
- PV of Face: $1,000,000 × 0.6756 = $675,600
- PV of Annuity: $30,000 × 8.1109 = $243,327
- Total: $918,927

**Discrepancy:** $36 difference due to rounding in PV factors.

**What it Should Be:**
Either update PV table for exact match, or accept $918,927 as correct answer.

---

### 9. tbs-reg-010 - Vehicle Deduction Verification

**Error Type:** Logic Inconsistency

**What is Wrong:**
The answer indicates vehicle deduction is "Correct" but explanation says "Need to verify..."

**What it Should Be:**
Remove uncertain language from explanation if answer is definitively correct.

---

### 10. tbs-reg-010 - Meals Deduction Rate

**Error Type:** None (Correct as stated)

**Verification:** The 50% meals deduction rate is correctly stated for post-2022 tax years. The temporary 100% restaurant meal deduction ended after 2022.

**This is NOT an error** - included for documentation that this was reviewed and confirmed accurate.

---

## ITEMS VERIFIED AS CORRECT

The following sample TBS were reviewed and found accurate:
- Lease accounting (ASC 842) calculations
- Lower of Cost or NRV inventory
- Revenue recognition (ASC 606) citations
- Government fund accounting entries
- Going concern evaluation criteria
- Audit sampling methodology
- Consolidation elimination entries
- Estate tax calculations (when thresholds noted)
- S Corporation basis adjustments
- Capital budgeting NPV/PI calculations
- Variance analysis formulas
- CVP analysis computations

---

## SUMMARY

The sample-tbs.ts file, which contains the original 58 TBS questions, has relatively fewer errors than some specialized section files. The 2 HIGH severity errors require immediate attention:

1. **tbs-reg-009**: Mid-quarter convention must apply to all assets
2. **tbs-bar-006**: Simple arithmetic error in WIP calculation

---

*Report prepared as part of independent TBS quality review*
