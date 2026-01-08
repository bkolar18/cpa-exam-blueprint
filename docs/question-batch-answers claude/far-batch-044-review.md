# FAR Batch 044 Review: Government Accounting Advanced

## Batch Information
- **Topic:** Government Accounting Advanced
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Government Accounting
- Subtopics covered: Fund Accounting, Budgetary Accounting, Capital Assets, Fiduciary Funds, Interfund Transactions, Revenue Recognition, Debt Service Funds, Government-wide Statements, Fund Balance, Special Revenue Funds, GASB Standards, Net Position, OPEB, Component Units, Deferred Outflows/Inflows, Budgetary Reporting, Enterprise Funds, Internal Service Funds, Capital Projects Fund, Permanent Funds, Grant Accounting, Compensated Absences, Risk Management, Landfill Closure, Statistical Section, Conduit Debt, Pollution Remediation, Derived Tax Revenue, Custodial Funds, Tax Abatements, Subscription-Based IT, Public-Private Partnerships, Financial Reporting Entity, Special Items, Imposed Nonexchange

### Content Accuracy: MOSTLY PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-gov-adv-008: CALCULATION ERROR

**Question:** A city's General Fund reports: Expenditures for equipment $300,000 (useful life 10 years), Principal payment on bonds $200,000, Interest paid on bonds $50,000 (includes $10,000 accrued from prior year). What is the total adjustment to convert expenditures to expenses for government-wide reporting?

**Marked Answer:** C ($470,000)

**Correct Calculation:**
- Equipment $300,000 expenditure → Depreciation $30,000 ($300,000/10) = **Decrease $270,000**
- Principal $200,000 expenditure → $0 expense (liability reduction) = **Decrease $200,000**
- Interest paid $50,000 → Current year expense $40,000 (excludes $10,000 prior accrual) = **Decrease $10,000**

**Total decrease: $270,000 + $200,000 + $10,000 = $480,000**

**Correct Answer:** D ($480,000)

**Note:** The explanation in the question acknowledges the $10,000 interest adjustment but fails to include it in the final total. The explanation contains "Wait, let me recalculate" language and then incorrectly concludes with $470,000.

---

### All Other Calculations Verified: PASS

| ID | Topic | Calculation | Status |
|----|-------|-------------|--------|
| far-gov-adv-001 | Major Fund | 10%/5% tests | ✓ |
| far-gov-adv-002 | Encumbrances | Eliminated in gov-wide | ✓ |
| far-gov-adv-003 | Modified Approach | Maintenance expensed | ✓ |
| far-gov-adv-004 | Pension Trust | NPL on employer statements | ✓ |
| far-gov-adv-005 | Interfund | Advance (>1 year) | ✓ |
| far-gov-adv-006 | Property Tax | $0 in Year 1 (levied for Year 2) | ✓ |
| far-gov-adv-007 | Bond Premium | $5M to Capital Projects | ✓ |
| far-gov-adv-009 | Fund Balance | Classifications correct | ✓ |
| far-gov-adv-010 | Special Revenue | Criteria correct | ✓ |
| far-gov-adv-011 | GASB 87 Lease | $50K × 4.4518 = $222,590 | ✓ |
| far-gov-adv-012 | Net Investment | $10M-$3M-$4.5M+$0.8M+$0.2M = $3.5M | ✓ |
| far-gov-adv-013 | GASB 75 OPEB | Net liability on gov-wide | ✓ |
| far-gov-adv-014 | Component Unit | Blending criteria | ✓ |
| far-gov-adv-015 | Pension Deferrals | Contributions after measurement | ✓ |
| far-gov-adv-016 | Budgetary | Original, final, actual | ✓ |
| far-gov-adv-017 | Enterprise Fund | Mandatory criteria | ✓ |
| far-gov-adv-018 | ISF | Profits eliminated | ✓ |
| far-gov-adv-019 | Grant | Expenditure-driven = $1.5M | ✓ |
| far-gov-adv-020 | Permanent Fund | Earnings restricted | ✓ |
| far-gov-adv-021 | Pass-through | Admin involvement = Rev/Exp | ✓ |
| far-gov-adv-022 | Comp Absences | $100K fund, $800K gov-wide | ✓ |
| far-gov-adv-023 | Self-Insurance | $1.2M+$0.4M-$0.15M = $1.45M | ✓ |
| far-gov-adv-024 | Landfill | $20M × 70% = $14M | ✓ |
| far-gov-adv-025 | Statistical | 10-year trend data | ✓ |
| far-gov-adv-026 | Conduit Debt | Disclosure only | ✓ |
| far-gov-adv-027 | GASB 49 | Obligating event + estimable | ✓ |
| far-gov-adv-028 | Sales Tax | $15M × 1% = $150K | ✓ |
| far-gov-adv-029 | Custodial Fund | GASB 84 criteria | ✓ |
| far-gov-adv-030 | Tax Abatement | GASB 77 disclosure | ✓ |
| far-gov-adv-031 | GASB 96 SBITA | $120K × 2.7232 = $326,784 | ✓ |
| far-gov-adv-032 | GASB 94 P3 | Deferred inflow | ✓ |
| far-gov-adv-033 | Related Org | Appointment but no benefit/burden | ✓ |
| far-gov-adv-034 | Special Items | Within control, unusual/infrequent | ✓ |
| far-gov-adv-035 | Property Tax | Oct Year 1 levy for calendar Year 2 | ✓ |

### Issues Found: 1 (calculation error)

## Question Summary

### Difficulty Distribution:
- Easy: 0 questions
- Medium: 17 questions
- Hard: 18 questions

### Format Distribution:
- Conceptual: 22 questions
- Calculation: 13 questions

## Final Status: NEEDS REVIEW
34/35 questions pass. far-gov-adv-008 requires correction before deployment.
