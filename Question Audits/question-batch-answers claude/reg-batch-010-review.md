# REG Batch 010 Review: S Corporations

## Batch Information
- **Batch ID:** reg-010 (inconsistent format)
- **Section:** REG
- **Topic:** S Corporations
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
- [ ] Consistent batchId format - Uses "reg-010" instead of "reg-batch-010"

## Content Review

### Topics Covered
- Maximum shareholders (100)
- Permissible shareholders (individuals, estates, certain trusts)
- Single class of stock rule
- Election deadline (15th day of 3rd month)
- Pass-through taxation basics
- Filing deadline (March 15)
- Initial stock basis calculation
- Basis adjustments for income and distributions
- Loss limitation (stock + debt basis)
- AAA distribution ordering
- Built-in gains (BIG) tax
- Reasonable compensation requirement
- Separately stated items
- Accumulated Adjustments Account (AAA)
- Termination events
- Excess net passive income tax
- 2% shareholder fringe benefits
- Order of basis adjustments
- Shareholder consent requirements
- Qualified Subchapter S Subsidiary (QSub)
- Pro rata allocation (per-share, per-day)
- Debt basis restoration
- Loss limitation ordering (basis → at-risk → passive)
- Distribution characterization with E&P
- Comprehensive basis calculations
- BIG tax calculations
- Suspended loss usage
- Post-termination transition period (PTTP)
- Direct loans for debt basis
- AAA vs OAA adjustments
- Electing Small Business Trust (ESBT)
- Section 199A QBI deduction
- Inadvertent termination relief
- Closing of the books election
- LIFO recapture on C-to-S conversion

### IRC Sections Referenced
- IRC Section 1361 (S Corporation Definition)
- IRC Section 1362 (S Election)
- IRC Section 1363 (S Corporation Taxation)
- IRC Section 1366 (Pass-Through Items)
- IRC Section 1367 (Basis Adjustments)
- IRC Section 1368 (Distributions)
- IRC Section 1374 (Built-In Gains Tax)
- IRC Section 1375 (Passive Income Tax)
- IRC Section 199A (QBI Deduction)

## Issues Identified
1. **Difficulty distribution mismatch** - Header claims 6/20/9, actual is 6/17/12
2. **BatchId format inconsistency** - Uses "reg-010" instead of "reg-batch-010"

## Corrections Needed
1. Update difficultyMix in header to: {"easy": 6, "medium": 17, "hard": 12}
2. Update batchId to: "reg-batch-010" for consistency

## Quality Assessment
- Comprehensive coverage of S corporation rules
- Excellent eligibility and election requirements
- Strong basis and loss limitation coverage
- Good BIG tax and passive income tax coverage
- Current Section 199A coverage
- Practical guidance on C-to-S conversions
- Complex scenarios with calculations included
