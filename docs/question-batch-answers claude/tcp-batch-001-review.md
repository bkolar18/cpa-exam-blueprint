# TCP Batch 001 Review: Individual Tax Compliance - Filing Requirements

## Batch Information
- **Batch ID:** tcp-001 (inconsistent format)
- **Section:** TCP
- **Topic:** Individual Tax Compliance - Filing Requirements
- **Total Questions:** 35

## Difficulty Analysis
**Header Claims:** Easy: 6, Medium: 20, Hard: 9

**Actual Count:**
- Easy: 001, 002, 003, 004, 005, 006 = 6
- Medium: 007, 008, 009, 010, 011, 012, 013, 014, 015, 016, 017, 018, 019, 020, 021, 022, 023 = 17
- Hard: 024, 025, 026, 027, 028, 029, 030, 031, 032, 033, 034, 035 = 12

**Difficulty Mismatch:** YES
- Header: 6/20/9
- Actual: 6/17/12

## JSON Validation
- [x] Valid JSON syntax
- [x] All required fields present
- [ ] Consistent batchId format - Uses "tcp-001" instead of "tcp-batch-001"

## Content Review

### Topics Covered
**Filing Requirements:**
- Filing thresholds and standard deduction
- Self-employment filing threshold ($400)
- Filing status consequences (MFS)
- Individual return due dates
- Extensions (Form 4868)
- Estimated tax quarterly dates

**Estimated Taxes:**
- Prior year safe harbor (110% for high-income)
- Annualized income installment method
- Small balance exception ($1,000)

**Penalties:**
- Failure to file penalty (5%/month, 25% max)
- Failure to pay penalty (0.5%/month)
- Accuracy-related penalty (20%)
- Fraud penalty (75%)
- Penalty stacking rules
- Substantial understatement definition
- Reasonable cause defense
- Reportable transaction penalties

**Statute of Limitations:**
- Three-year general rule
- Six-year rule (25% omission)
- Basis overstatement extension
- Collection statute (10 years)

**IRS Procedures:**
- Amended returns (Form 1040-X)
- Substitute for return (SFR)
- John Doe summons
- Interest rates on underpayments

**Filing Status:**
- Qualifying surviving spouse
- Community property rules

**Special Situations:**
- U.S. citizens abroad (June 15 extension)
- Deceased taxpayer returns
- Innocent spouse relief

**Withholding and Compliance:**
- W-4 form updates (post-2020)
- IP PIN protection
- Record retention requirements
- Form 1099-NEC threshold ($600)

**Foreign Reporting:**
- FBAR threshold ($10,000)
- Form 8938 vs FBAR comparison

### IRC Sections Referenced
- IRC Section 6662 (Accuracy-Related Penalty)
- IRC Section 6663 (Fraud Penalty)
- IRC Section 6015 (Innocent Spouse Relief)
- IRC Section 6501(e) (Statute of Limitations)
- FinCEN Form 114 (FBAR)
- Form 8938 (FATCA)

## Issues Identified
1. **Difficulty distribution mismatch** - Header claims 6/20/9, actual is 6/17/12
2. **BatchId format inconsistency** - Uses "tcp-001" instead of "tcp-batch-001"

## Corrections Needed
1. Update difficultyMix in header to: {"easy": 6, "medium": 17, "hard": 12}
2. Update batchId to: "tcp-batch-001" for consistency

## Quality Assessment
- Excellent coverage of individual compliance topics
- Strong penalty and statute of limitations content
- Good mix of procedural and substantive questions
- Current law updates (post-2020 W-4, TCJA provisions)
- Practical application scenarios
- Well-structured progression from basic to complex
