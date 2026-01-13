# AUD TBS Error Report

**Batch File:** `src/lib/data/tbs/aud-tbs.ts`
**Total Questions:** 75
**Errors Found:** 10
**Severity Distribution:** 1 HIGH, 5 MEDIUM, 4 LOW

---

## HIGH SEVERITY ERRORS

### 1. tbs-aud-080 - Group Audit Standards Reference

**Error Type:** Technical Error / Incorrect Standard Citation

**What is Wrong:**
The question references outdated guidance for group audits. The standards have been updated and the terminology for "component auditor" and procedures have changed.

**Current Reference:** AU-C 600 with older terminology

**What it Should Be:**
Updated to reflect SAS No. 149 (AU-C 600 revised), which uses:
- "Referred-to auditor" instead of "component auditor" in some contexts
- Updated procedures for access to component auditor work

**Effective Date:** SAS 149 is effective for audits of periods ending on or after December 15, 2026

**Note:** Consider whether to update now or maintain current standard for current exam candidates.

---

## MEDIUM SEVERITY ERRORS

### 2. tbs-aud-015 - Internal Control Deficiency Classification

**Error Type:** Conceptual Error

**What is Wrong:**
The deficiency classification scenario presents a control weakness that could be classified as either a significant deficiency or material weakness depending on quantitative factors not provided.

**Issue:** Answer definitively states "significant deficiency" without acknowledging the materiality analysis required.

**What it Should Be:** Include likelihood and magnitude considerations, or provide explicit quantitative data to support classification.

**Standard Reference:** AS 2201.62-69

---

### 3. tbs-aud-028 - Subsequent Events Procedures

**Error Type:** Technical Error

**What is Wrong:**
The procedures listed for subsequent events review omit the requirement to obtain a management representation letter updated through the report date.

**What it Should Be:** Include management representation as required by AU-C 560.

---

### 4. tbs-aud-034 - Audit Sampling Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The sample size calculation uses an incorrect tolerable deviation rate in the formula.

**Current Calculation:** Uses 5% tolerable rate but exhibit shows 7%

**What it Should Be:** Recalculate using exhibit-provided parameters.

---

### 5. tbs-aud-052 - Going Concern Evaluation Period

**Error Type:** Outdated Standard

**What is Wrong:**
The timeframe for going concern evaluation references the old 12-month period without noting the look-forward requirements.

**What it Should Be:**
- Public companies: 12 months from issuance
- Private companies: 12 months from financial statement date (with updated guidance in AU-C 570)

---

### 6. tbs-aud-067 - Service Organization Controls (SOC) Report

**Error Type:** Technical Error

**What is Wrong:**
The question conflates SOC 1 Type II and SOC 2 Type II reports in terms of their purpose and users.

**What it Should Be:**
- SOC 1: Financial statement controls, for user auditors
- SOC 2: Trust Services Criteria (security, availability, etc.), for management/stakeholders

---

## LOW SEVERITY ERRORS

### 7. tbs-aud-011 - Audit Report Date

**Error Type:** Explanation Clarity

**What is Wrong:**
The explanation about when to date the audit report doesn't clearly distinguish between obtaining sufficient evidence and management providing representations.

**Impact:** Minor - core answer is correct.

---

### 8. tbs-aud-023 - Analytical Procedures

**Error Type:** Explanation Clarity

**What is Wrong:**
The explanation for why a particular analytical procedure is appropriate lacks specificity about the precision of expectation required in substantive analytics.

---

### 9. tbs-aud-045 - Confirmation Exception

**Error Type:** Explanation Clarity

**What is Wrong:**
The response to a confirmation exception describes alternative procedures but doesn't prioritize the most effective alternatives.

---

### 10. tbs-aud-071 - Related Party Identification

**Error Type:** Minor Technical Issue

**What is Wrong:**
The list of related party indicators is incomplete. Missing some common indicators such as unusual terms in transactions with the same counterparty.

---

## ITEMS VERIFIED AS CORRECT

The following AUD topics were reviewed and found to be technically accurate:
- Audit evidence sufficiency and appropriateness
- Risk assessment and response procedures
- Report modifications (qualified, adverse, disclaimer)
- Compliance audit requirements
- Auditor independence rules (most scenarios)
- Documentation requirements
- Audit committee communication requirements
- Engagement quality review requirements

---

*Report prepared as part of independent TBS quality review*
