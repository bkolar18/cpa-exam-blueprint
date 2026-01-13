# REG Batch 020 Review: Filing Status and Dependents

## Batch Information
- **Batch ID:** reg-020 (inconsistent format)
- **Section:** REG
- **Topic:** Filing Status and Dependents
- **Total Questions:** 35

## Difficulty Analysis
**Header Claims:** Easy: 6, Medium: 20, Hard: 9

**Actual Count:**
- Easy: 001, 002, 003, 004, 005, 006 = 6
- Medium: 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021 = 15
- Hard: 022, 023, 024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 035 = 14

**Difficulty Mismatch:** YES
- Header: 6/20/9
- Actual: 6/15/14

## JSON Validation
- [x] Valid JSON syntax
- [x] All required fields present
- [ ] Consistent batchId format - Uses "reg-020" instead of "reg-batch-020"

## Content Review

### Topics Covered
- Five filing statuses overview
- Status determination date (December 31)
- Head of Household requirements
- Two dependent categories (QC and QR)
- Joint return test
- Qualifying Surviving Spouse requirements
- Qualifying child age test (19/24/disabled)
- Residency test (more than half year)
- Gross income test for qualifying relative
- Support test for qualifying relative (>50%)
- Support test for qualifying child (self-support)
- Costs of maintaining household
- Married Filing Separately limitations
- Relationship test for qualifying child
- "Considered unmarried" rules
- Not a qualifying child test for QR
- Tiebreaker rules (parent, residency, AGI)
- Multiple support agreement (Form 2120)
- Dependent filing requirements
- Custodial parent rules
- SSN requirement for dependents
- Member of household test (unrelated persons)
- Parent exception for HOH (separate home)
- Form 8332 dependency release
- Kiddie tax application
- Citizenship/residency test
- Year of spouse's death rules
- Younger than taxpayer test (QC)
- Dependent's limited standard deduction
- Self-employment income for QR gross income
- What counts as support (scholarships excluded)
- Community property and MFS
- Birth/death timing for dependents
- Married child as qualifying person
- Child Tax Credit age requirement (under 17)

### IRC Sections Referenced
- IRC Section 1 (Filing Status, Tax Rates)
- IRC Section 2 (Head of Household)
- IRC Section 63 (Standard Deduction)
- IRC Section 151 (Dependents)
- IRC Section 152 (Dependent Definition)

## Issues Identified
1. **Difficulty distribution mismatch** - Header claims 6/20/9, actual is 6/15/14
2. **BatchId format inconsistency** - Uses "reg-020" instead of "reg-batch-020"

## Corrections Needed
1. Update difficultyMix in header to: {"easy": 6, "medium": 15, "hard": 14}
2. Update batchId to: "reg-batch-020" for consistency

## Quality Assessment
- Comprehensive coverage of filing status and dependency rules
- Excellent distinction between QC and QR tests
- Strong tiebreaker and special situation coverage
- Good divorced parent rules (Form 8332)
- Advanced topics covered (kiddie tax, community property)
- Practical guidance on support calculations
- Current dollar amounts and thresholds
