# FAR Batch 032 Review: Inventory - Advanced Topics

## Batch Information
- **Topic:** Inventory - Advanced Topics
- **Questions:** 30
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topic: Inventory (valid FAR topic)
- Comprehensive coverage of advanced inventory topics

### Content Accuracy: PASS (with exception noted below)

### Calculation Verification: MOSTLY PASS

## ISSUE FOUND

### far-inv-adv-011: INCONSISTENT GROSS PROFIT METHOD CALCULATION

**Question:** Beginning inventory $80,000, net purchases $420,000, sales $600,000, gross profit rate 30%. What is estimated ending inventory?

**Marked Answer:** B ($100,000)

**Issue:** Using the stated facts:
1. Goods available = $80,000 + $420,000 = $500,000
2. COGS = Sales × (1 - GP%) = $600,000 × 70% = $420,000
3. Ending inventory = $500,000 - $420,000 = **$80,000**

The calculation yields $80,000, not $100,000.

**The explanation is rambling and internally inconsistent**, with the text appearing to question its own calculation mid-explanation.

**Recommendation:** Either:
- Change answer to reflect $80,000 calculation, OR
- Revise the question numbers to produce $100,000 as the correct answer (e.g., sales of $571,429 would yield ~$100K ending)

---

### All Other Calculations Verified: PASS

| ID | Calculation | Result | Status |
|----|-------------|--------|--------|
| far-inv-adv-001 | NRV | $48,000 | ✓ |
| far-inv-adv-002 | Writedown | $2,000 | ✓ |
| far-inv-adv-003 | LIFO to FIFO conversion | $235,000 | ✓ |
| far-inv-adv-004 | LIFO reserve change impact | $10,000 higher | ✓ |
| far-inv-adv-006 | Price index | 1.20 | ✓ |
| far-inv-adv-007 | DV-LIFO layer | $22,000 | ✓ |
| far-inv-adv-008 | Cost-to-retail ratio | 66.7% | ✓ |
| far-inv-adv-009 | Ending inventory (retail) | $50,000 | ✓ |
| far-inv-adv-017 | Purchase commitment loss | $30,000 | ✓ |
| far-inv-adv-018 | Basket purchase allocation | $48,000 | ✓ |
| far-inv-adv-021 | Weighted average | $12.67 | ✓ |
| far-inv-adv-025 | Goods in transit | $20,000 | ✓ |
| far-inv-adv-029 | Days in inventory | 50 days | ✓ |

### Key Standards Verified:
- NRV calculation (selling price - completion - selling costs) ✓
- LIFO reserve relationships ✓
- LIFO liquidation effects ✓
- Dollar-Value LIFO methodology ✓
- Retail method (conventional LCM excludes markdowns from ratio) ✓
- Consignment ownership ✓
- FOB terms and ownership transfer ✓
- Inventory error counterbalancing ✓
- GAAP no reversal of writedowns (vs IFRS) ✓
- LIFO conformity rule ✓

### Issues Found: 1 (calculation inconsistency)

## Question Summary

### Difficulty Distribution:
- Easy: 2 questions
- Medium: 15 questions
- Hard: 13 questions

### Format Distribution:
- Conceptual: 17 questions
- Calculation: 13 questions

## Final Status: NEEDS REVIEW
29/30 questions pass. far-inv-adv-011 requires review/correction before deployment.
