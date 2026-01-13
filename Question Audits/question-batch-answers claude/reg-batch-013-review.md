# REG Batch 013 Review: Alternative Minimum Tax

## Batch Information
- **Batch ID:** reg-013 (inconsistent format)
- **Section:** REG
- **Topic:** Alternative Minimum Tax
- **Total Questions:** 35

## Difficulty Analysis
**Header Claims:** Easy: 6, Medium: 20, Hard: 9

**Actual Count:**
- Easy: 001, 002, 003, 004, 005, 006 = 6
- Medium: 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 022 = 16
- Hard: 023, 024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 035 = 13

**Difficulty Mismatch:** YES
- Header: 6/20/9
- Actual: 6/16/13

## JSON Validation
- [x] Valid JSON syntax
- [x] All required fields present
- [ ] Consistent batchId format - Uses "reg-013" instead of "reg-batch-013"

## Content Review

### Topics Covered
- Purpose of AMT
- AMT rates (26%/28%)
- AMT exemption concept
- AMTI calculation starting point
- TCJA impact on AMT (higher exemptions)
- AMT vs regular tax liability
- SALT deduction (not allowed for AMT)
- Mortgage interest limitations for AMT
- Depreciation adjustment (post-1998 rules)
- Adjustments vs preferences distinction
- Private activity bond interest
- Exemption phaseout mechanics (25% rate)
- Minimum tax credit (MTC)
- Standard deduction for AMT (not allowed)
- Medical expenses (7.5% floor, same)
- ISO exercise AMT treatment
- Capital gains rate for AMT (preferential rates apply)
- NOL calculation for AMT
- Miscellaneous deductions (suspended 2018-2025)
- Personal exemptions (suspended 2018-2025)
- Passive activity losses for AMT
- Corporate AMT exemption ($1B threshold)
- Charitable contributions for AMT
- MTC calculation (timing items only)
- ISO basis adjustment for AMT
- Full AMTI calculation examples
- 2024 exemption amounts by filing status
- MTC usage limitations
- Foreign tax credit for AMT (90% limit)
- Real property depreciation (no adjustment)
- Intangible drilling costs (IDC)
- Corporate AMT rate (15% under IRA)
- ISO disqualifying disposition
- Exemption phaseout computation
- Percentage depletion preference

### IRC Sections Referenced
- IRC Section 55-59 (Alternative Minimum Tax)
- IRC Section 53 (Minimum Tax Credit)
- IRC Section 56 (AMT Adjustments)
- IRC Section 57 (AMT Preferences)
- IRC Section 59A (BEAT - related)
- Inflation Reduction Act (CAMT)

## Issues Identified
1. **Difficulty distribution mismatch** - Header claims 6/20/9, actual is 6/16/13
2. **BatchId format inconsistency** - Uses "reg-013" instead of "reg-batch-013"

## Corrections Needed
1. Update difficultyMix in header to: {"easy": 6, "medium": 16, "hard": 13}
2. Update batchId to: "reg-batch-013" for consistency

## Quality Assessment
- Comprehensive coverage of individual AMT
- Excellent TCJA changes reflected
- Strong ISO treatment coverage
- Good distinction between adjustments and preferences
- Current IRA 2022 corporate AMT (CAMT) included
- Practical MTC calculations
- Complex exemption phaseout examples
