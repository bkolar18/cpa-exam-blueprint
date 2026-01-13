# FAR Batch 037 Review: Comprehensive Income and Stockholders' Equity

## Batch Information
- **Topic:** Comprehensive Income and Stockholders' Equity
- **Questions:** 35
- **Date Generated:** 2025-01-07

## Review Results

### JSON Validation: PASS
- Valid JSON structure
- All required fields present

### Taxonomy Check: PASS
- Topics: Comprehensive Income, Stockholders' Equity (valid FAR topics)
- Comprehensive coverage of OCI and equity transactions

### Content Accuracy: MOSTLY PASS (with exceptions noted below)

### Calculation Verification: MOSTLY PASS

## ISSUES FOUND

### far-oci-027: INCORRECT TREASURY RETIREMENT APIC CALCULATION

**Question:** Treasury stock (cost $40/share, 1,000 shares) is retired. Original issue: $5 par, $12 APIC per share. What is debited to APIC?

**Marked Answer:** C ($23,000)

**Correct Answer:** B ($12,000)

**Correct Calculation:**
- Treasury cost = 1,000 × $40 = $40,000
- Entry: Dr. Common Stock $5,000 (1,000 × $5)
- Dr. APIC $12,000 (1,000 × $12)
- Dr. Retained Earnings $23,000 (balancing amount)
- Cr. Treasury Stock $40,000

APIC debited = original APIC of $12,000. The $23,000 excess is debited to Retained Earnings, NOT APIC.

**Required Fix:** Change answer from C to B

---

### far-oci-029: INCONSISTENT WARRANT EXERCISE CALCULATION

**Question:** Warrants (APIC-Warrants $5,000) exercised for 500 shares of $10 par at $25 exercise price. What is credited to APIC-Common?

**Marked Answer:** B ($7,500)

**Correct Answer:** D ($12,500)

**Correct Calculation:**
- Dr. Cash: 500 × $25 = $12,500
- Dr. APIC-Warrants: $5,000 (transfer out)
- Cr. Common Stock: 500 × $10 = $5,000
- Cr. APIC-Common: $12,500 + $5,000 - $5,000 = **$12,500**

The explanation in the question even concludes "$12,500" but the marked answer is B ($7,500).

**Required Fix:** Change answer from B to D

---

### All Other Calculations Verified: PASS

| ID | Calculation | Result | Status |
|----|-------------|--------|--------|
| far-oci-004 | Total comprehensive income | $495,000 | ✓ |
| far-oci-007 | Treasury stock cost | $35,000 | ✓ |
| far-oci-008 | Treasury reissue APIC | $2,500 | ✓ |
| far-oci-010 | Small stock dividend | $300,000 | ✓ |
| far-oci-011 | Large stock dividend | $150,000 | ✓ |
| far-oci-013 | Cumulative preferred | $0 to common | ✓ |
| far-oci-017 | Convertible preferred APIC | $60,000 | ✓ |
| far-oci-019 | Stock issuance APIC | $40,000 | ✓ |
| far-oci-020 | No-par stated value | $16,000 | ✓ |
| far-oci-025 | Equity method OCI | $20,000 | ✓ |
| far-oci-034 | Property dividend | $130,000 | ✓ |

### Key Standards Verified:
- OCI components (AFS, pensions, hedges, translation) ✓
- Reclassification adjustments ✓
- Treasury stock (cost method) ✓
- Small vs large stock dividends ✓
- Cumulative and participating preferred ✓
- Cash flow hedges in OCI ✓
- Foreign currency translation in OCI ✓
- Quasi-reorganization ✓

### Issues Found: 2 CRITICAL

## Question Summary

### Difficulty Distribution:
- Easy: 4 questions
- Medium: 14 questions
- Hard: 17 questions

### Format Distribution:
- Conceptual: 22 questions
- Calculation: 13 questions

## Final Status: NEEDS CORRECTION
33/35 questions pass. Two questions require answer corrections before deployment.
