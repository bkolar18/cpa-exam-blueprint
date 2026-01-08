# TCP Batch 003 Review: C Corporation Tax Planning

## Batch Information
- **Batch ID:** tcp-003 (inconsistent format)
- **Section:** TCP
- **Topic:** C Corporation Tax Planning
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
- [ ] Consistent batchId format - Uses "tcp-003" instead of "tcp-batch-003"

## Content Review

### Topics Covered
**Entity Selection:**
- C corporation advantages (21% rate accumulation)
- Fringe benefit advantages (vs S corp)
- Fiscal year flexibility

**Corporate Tax Rates:**
- Flat 21% corporate rate (TCJA)
- Qualified dividend rates (0%/15%/20%)

**Compensation Planning:**
- Reasonable compensation requirement
- Constructive dividend recharacterization
- Section 162(m) $1M limit

**Corporate Formation:**
- Section 351 requirements (80% control)
- Liability assumption (Section 357(c))
- Boot recognition

**Accumulated Earnings:**
- AET credit ($250,000/$150,000)
- Personal holding company (PHC) test (60% income, 5-or-fewer ownership)

**Dividends Received Deduction:**
- DRD percentages (50%/65%/100%)
- Ownership thresholds

**Stock Redemptions:**
- Sale vs dividend treatment
- Substantially disproportionate test (80%/50%)
- Complete termination

**Distributions:**
- Property distribution taxation
- E&P purpose and calculation
- E&P adjustments (tax-exempt income, federal taxes)

**Net Operating Losses:**
- 80% limitation (post-2020)
- Indefinite carryforward

**Capital Losses:**
- Offset limitations (gains only)
- Carryback 3/forward 5 years

**Corporate Liquidation:**
- Double taxation on liquidation
- Section 336 corporate gain recognition

**Debt vs Equity:**
- Thin capitalization risks
- Debt recharacterization

**Estimated Taxes:**
- Large corporation rules
- Prior year safe harbor limitations

**Advanced Topics:**
- Section 163(j) interest limitation (30% ATI)
- Section 382 NOL limitation
- Reorganizations (Type A/B/C/D/E/F)
- Consolidated returns (80%/80% requirement)
- Section 338 election
- Section 355 spin-offs (5-year active business)
- Section 1202 QSBS ($50M gross asset test)
- Controlled groups (brother-sister)

**International Tax:**
- GILTI (10% return on QBAI)
- BEAT ($500M gross receipts, 3% erosion)
- FDII (13.125% effective rate)

### IRC Sections Referenced
- IRC Section 351 (Corporate Formation)
- IRC Section 357(c) (Liability Assumption)
- IRC Section 162(m) (Compensation Limit)
- IRC Section 163(j) (Interest Limitation)
- IRC Section 302 (Redemptions)
- IRC Section 336 (Liquidation Distributions)
- IRC Section 338 (Stock Purchase Election)
- IRC Section 355 (Spin-offs)
- IRC Section 382 (NOL Limitation)
- IRC Section 1202 (QSBS)

## Issues Identified
1. **Difficulty distribution mismatch** - Header claims 6/20/9, actual is 6/16/13
2. **BatchId format inconsistency** - Uses "tcp-003" instead of "tcp-batch-003"

## Corrections Needed
1. Update difficultyMix in header to: {"easy": 6, "medium": 16, "hard": 13}
2. Update batchId to: "tcp-batch-003" for consistency

## Quality Assessment
- Comprehensive C corporation planning coverage
- Strong corporate formation and structure content
- Excellent advanced topics (382, 338, 355)
- Current international tax provisions (GILTI, BEAT, FDII)
- Good mix of computational and conceptual questions
- Practical planning scenario applications
- Appropriate complexity progression
