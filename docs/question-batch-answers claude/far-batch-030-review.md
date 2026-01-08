# FAR Batch 030 Review: Revenue Recognition - Advanced Scenarios

## Batch Information
- **Topic:** Revenue Recognition - Advanced Scenarios
- **Questions:** 35
- **Weight:** Not specified
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Revenue Recognition (valid FAR topic)
- Subtopics covered:
  - Variable Consideration
  - Contract Modifications
  - Principal vs Agent
  - Licensing
  - Warranties
  - Bill-and-Hold
  - Consignment
  - Non-refundable Upfront Fees
  - Customer Options/Loyalty Points
  - Significant Financing Component
  - Noncash Consideration
  - Consideration Payable to Customer
  - Returns
  - Contract Costs
  - Performance Obligation
  - Standalone Selling Price
  - Output Methods
  - Input Methods
  - Loss Contracts
  - Disclosure
  - Practical Expedients
  - SaaS Arrangements
  - Bundle with Free Items
  - Variable Quantity Contracts

### Content Accuracy: PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-rev-adv-016: INCONSISTENT CALCULATION AND EXPLANATION

**Question:** A customer purchases $200 of goods and earns 1,000 loyalty points worth $0.05 each (80% expected redemption). Standalone selling price of goods is $200. What revenue is recognized at the sale?

**Marked Answer:** C ($181.82)

**Issue:** Based on the question facts:
- Points value = 1,000 × $0.05 × 80% = $40
- Total SSP = $200 + $40 = $240
- Goods allocation = $200 × ($200 / $240) = **$166.67**

The answer $181.82 requires points SSP of only $20, which contradicts the stated "worth $0.05 each."

**Additional Concern:** The explanation contains self-doubt language ("Wait, let me recalculate...") indicating the calculation was not verified properly.

**Recommendation:** Either:
- Change answer to approximately $166.67 (add new option), OR
- Change point value to $0.025 each to make $181.82 correct, OR
- Change expected redemption to 40% to make $181.82 correct

---

### All Other Calculations Verified: PASS

| ID | Calculation | Result | Status |
|----|-------------|--------|--------|
| far-rev-adv-002 | Expected value | $92,000 | ✓ |
| far-rev-adv-004 | Catch-up adjustment | $16,667 decrease | ✓ |
| far-rev-adv-006 | Agent commission | $750 | ✓ |
| far-rev-adv-010 | Warranty allocation | $4,545 | ✓ |
| far-rev-adv-014 | Monthly revenue | $75 | ✓ |
| far-rev-adv-018 | PV with financing | $85,734 | ✓ |
| far-rev-adv-021 | Refund liability | $5,000 | ✓ |
| far-rev-adv-023 | Contract cost amort | $10,000 | ✓ |
| far-rev-adv-026 | Residual approach | $150,000 | ✓ |
| far-rev-adv-027 | Output method | $32,500 | ✓ |
| far-rev-adv-028 | Cost-to-cost | $1,000,000 | ✓ |
| far-rev-adv-029 | Loss contract | $200,000 | ✓ |
| far-rev-adv-034 | Bundle allocation | $461.54 | ✓ |

### Issues Found: 1 (calculation inconsistency)

## Question Summary

### Difficulty Distribution:
- Easy: 2 questions
- Medium: 14 questions
- Hard: 19 questions

### Format Distribution:
- Conceptual: 21 questions
- Calculation: 14 questions

## Final Status: NEEDS CORRECTION
34/35 questions pass. far-rev-adv-016 requires correction before deployment.
