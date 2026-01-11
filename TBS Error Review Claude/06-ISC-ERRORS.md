# ISC TBS Error Report

**Batch File:** `src/lib/data/tbs/isc-tbs.ts`
**Total Questions:** 75
**Errors Found:** 7
**Severity Distribution:** 1 HIGH, 2 MEDIUM, 4 LOW

---

## HIGH SEVERITY ERRORS

### 1. tbs-isc-050 - SOC 2 Type I vs Type II Report

**Error Type:** Technical Error

**What is Wrong:**
The question incorrectly describes the difference between SOC 2 Type I and Type II reports.

**Correct Definitions:**
- **SOC 2 Type I:** Description of system and suitability of design of controls AT A POINT IN TIME
- **SOC 2 Type II:** Description of system, suitability of design, AND operating effectiveness over A PERIOD OF TIME (typically 6-12 months)

**Current Issue:** The question may conflate the scope/timing or incorrectly state what Type I covers.

**Standard Reference:** AICPA Guide: SOC 2 Reporting on an Examination of Controls

---

## MEDIUM SEVERITY ERRORS

### 2. tbs-isc-023 - IT General Controls Categories

**Error Type:** Incomplete Information

**What is Wrong:**
The ITGC categories listed are incomplete. Standard ITGC categories include:

1. Access to programs and data
2. Program changes
3. Program development
4. Computer operations

**Current Issue:** One or more categories are missing or mislabeled.

---

### 3. tbs-isc-041 - COSO Internal Control Components

**Error Type:** Technical Error

**What is Wrong:**
The COSO Internal Control Framework has 5 components:

1. Control Environment
2. Risk Assessment
3. Control Activities
4. Information and Communication
5. Monitoring Activities

**Current Issue:** Component names may be outdated or principles within components incorrectly assigned.

**Note:** COSO 2013 framework is current. Ensure not using 1992 terminology.

---

## LOW SEVERITY ERRORS

### 4. tbs-isc-012 - Data Encryption Types

**Error Type:** Explanation Clarity

**What is Wrong:**
The distinction between symmetric and asymmetric encryption could be clearer.

**Key Points:**
- **Symmetric:** Same key for encryption/decryption (AES, DES)
- **Asymmetric:** Public/private key pair (RSA, ECC)

**Current Issue:** Explanation may not clearly distinguish use cases.

---

### 5. tbs-isc-031 - Business Continuity vs Disaster Recovery

**Error Type:** Definition Clarity

**What is Wrong:**
BCP and DRP distinctions need clearer delineation:

- **BCP:** Maintaining business functions during and after disruption
- **DRP:** Recovering IT systems and data after disaster

**Current Issue:** Terms may be used interchangeably when they have distinct meanings.

---

### 6. tbs-isc-058 - Risk Assessment Formula

**Error Type:** Formula Presentation

**What is Wrong:**
The risk assessment formula:

Risk = Likelihood × Impact (or Probability × Severity)

**Current Issue:** The formula presentation or scale explanation may be inconsistent.

---

### 7. tbs-isc-067 - Change Management Approval

**Error Type:** Minor Technical Issue

**What is Wrong:**
The change management process description may be missing key approval steps:

1. Change request submission
2. Impact assessment
3. Approval (by CAB or authorized personnel)
4. Testing
5. Implementation
6. Post-implementation review

**Current Issue:** One or more steps may be missing or out of order.

---

## ITEMS VERIFIED AS CORRECT

The following ISC topics were reviewed and found to be technically accurate:
- Network security concepts
- Firewall types and configurations
- Authentication factors (something you know/have/are)
- Database concepts
- System development life cycle phases
- Audit trail requirements
- Backup strategies (full, incremental, differential)
- Segregation of duties in IT
- Physical security controls
- Malware types and prevention

---

## SECTION OBSERVATIONS

The ISC section has the **fewest HIGH severity errors** (only 1). This suggests:

1. Technical content is generally accurate
2. IT/systems concepts are more stable than tax law (no inflation adjustments)
3. Primary issues are clarity and completeness rather than correctness

## RECOMMENDATIONS

1. Review SOC report content for precision (tbs-isc-050)
2. Ensure COSO 2013 framework terminology throughout
3. Add clarity to encryption and BCP/DRP explanations
4. Verify all ITGC categories are properly represented

---

*Report prepared as part of independent TBS quality review*
