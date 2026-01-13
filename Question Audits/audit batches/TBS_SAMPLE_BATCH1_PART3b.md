# TBS Sample for Review - Batch 1, Part 3b
TBS in this part: 7 (second half of Part 3)

---

# TBS Questions

## tbs-far-012
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Leases - Lessee Accounting - Operating Lease
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Operating Lease Recognition and Measurement

### Scenario
Oakwood Industries entered into a lease agreement on January 1, Year 1 for office space with the following terms:

• Lease term: 4 years (no renewal options)
• Annual lease payment: $48,000 (paid at beginning of each year)
• Incremental borrowing rate: 5%
• No purchase option or residual value guarantee
• The lease does not transfer ownership

The lease qualifies as an operating lease under ASC 842.

Required: Calculate the initial recognition amounts and Year 1 expense.

### Exhibits (1)

#### Present Value of Annuity Due Table (table)
Table: Present Value of Annuity Due (payments at beginning)
Headers: Period | 4% | 5% | 6% | 7%
Rows: 5 rows
  1 | 1.0000 | 1.0000 | 1.0000 | 1.0000
  2 | 1.9615 | 1.9524 | 1.9434 | 1.9346
  3 | 2.8861 | 2.8594 | 2.8334 | 2.8080
  ... (2 more rows)

### Requirements (5)

**req-pv-payments:** Present value of lease payments at inception
Type: numeric | Points: 1
Expected: {"type":"numeric","value":178714,"tolerance":50}

**req-rou-asset:** Initial Right-of-Use Asset amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":178714,"tolerance":50}

**req-lease-liability:** Initial Lease Liability (after first payment)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":130714,"tolerance":50}

**req-straight-line-expense:** Annual straight-line lease expense
Type: numeric | Points: 1
Expected: {"type":"numeric","value":48000,"tolerance":0}

**req-rou-balance-y1:** ROU Asset balance at December 31, Year 1
Type: numeric | Points: 1
Expected: {"type":"numeric","value":134036,"tolerance":100}


---


---

## tbs-far-062
**Section:** FAR | **Type:** reconciliation | **Difficulty:** easy
**Topic:** Cash and Cash Equivalents - Bank Reconciliation
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Monthly Bank Reconciliation

### Scenario
Prepare a bank reconciliation for Sterling Company as of March 31, Year 1. The company's general ledger shows a cash balance of $47,830 and the bank statement shows a balance of $52,415.

### Exhibits (2)

#### Bank Statement (bank_statement)

#### General Ledger Information (text)
Outstanding checks as of March 31:
• Check #1545: $2,100...

### Requirements (5)

**req-adjusted-bank:** Adjusted bank balance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":52865,"tolerance":1}

**req-adjusted-book:** Adjusted book balance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":52865,"tolerance":1}

**req-outstanding-total:** Total outstanding checks
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3050,"tolerance":1}

**req-book-increase:** Net adjustment to increase books
Type: numeric | Points: 1
Expected: {"type":"numeric","value":930,"tolerance":1}

**req-reconciling-items:** Which item requires a journal entry?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-nsf"}


---


---

## tbs-far-024
**Section:** FAR | **Type:** research | **Difficulty:** medium
**Topic:** Leases - Lease Classification
**Time Estimate:** 8 min | **Max Points:** 2

### Title
Research - Lease Classification Criteria

### Scenario
A client is entering into a new lease agreement and needs guidance on how to classify the lease under current GAAP. The lease is for manufacturing equipment with the following characteristics:

• The lease term is 8 years
• The equipment has a remaining economic life of 10 years
• There is no transfer of ownership at the end of the lease
• There is no purchase option
• The present value of lease payments equals 85% of the equipment's fair value

The client wants to know the authoritative guidance for lease classification criteria.

Required: Cite the specific ASC paragraph that contains the lease classification criteria for lessees.

### Exhibits (1)

#### Client Inquiry (memo)
From: Tax Partner
To: Audit Staff
Subject: Lease Classification Research
Body: Please research the authoritative guidance for lease classification. The client specifically wants the citation that lists the criteria for when a lessee should classify a lease as a finance lease versus an operating lease.

Focus on the five classification criteria in ASC 842....

### Requirements (1)

**req-citation:** ASC Citation for Finance Lease Classification Criteria
Type: citation | Points: 2
Expected: {"type":"citation","source":"FASB","topicCode":"842-10","sectionCode":"25","paragraph":"2","alternativeCitations":[{"source":"FASB","topicCode":"842-10-25","sectionCode":"2"},{"source":"FASB","topicCo...


---


---

## tbs-isc-062
**Section:** ISC | **Type:** document_review | **Difficulty:** medium
**Topic:** Authentication - Multi-Factor Authentication
**Time Estimate:** 16 min | **Max Points:** 10

### Title
MFA Coverage Assessment

### Scenario
The organization is implementing multi-factor authentication (MFA) across all systems. You are reviewing the current MFA deployment status to identify coverage gaps and prioritize remaining implementations.

### Exhibits (1)

#### MFA Implementation Status (table)
Table: MFA Implementation Status
Headers: System | Users | MFA Enabled | MFA Method | Risk Level
Rows: 7 rows
  Corporate VPN | 3,500 | Yes | Hardware Token | High
  Email (O365) | 4,200 | Yes | Authenticator App | High
  HR System | 850 | No | N/A | High
  ... (4 more rows)

### Requirements (5)

**req1:** Total number of users without MFA protection
Type: numeric | Points: 2
Expected: {"type":"numeric","value":1300,"tolerance":0}

**req2:** Which system represents the highest priority for MFA implementation?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt2"}

**req3:** Which MFA method is considered weakest against phishing attacks?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt3"}

**req4:** Percentage of total users with MFA enabled
Type: numeric | Points: 2
Expected: {"type":"numeric","value":87.6,"tolerance":0.5}

**req5:** How many systems use Hardware Token as MFA method?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":2,"tolerance":0}


---


---

## tbs-isc-013
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** Data Management - Database Security
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Database Security Assessment

### Scenario
Evaluate database security controls and identify risks.

### Exhibits (1)

#### Database Configuration (text)
Database: Oracle 19c Production
Authentication: Username/password (no MFA)...

### Requirements (4)

**req-default-accounts:** Risk level of unchanged default passwords?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"high-risk"}

**req-encryption-rest:** Impact of disabled encryption at rest?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"significant"}

**req-audit-logging:** Is the audit logging configuration adequate?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"inadequate"}

**req-priority-fix:** Highest priority remediation?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"change-defaults"}


---


---

## tbs-isc-036
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** Risk Management - Risk Assessment
**Time Estimate:** 12 min | **Max Points:** 5

### Title
IT Risk Assessment Process

### Scenario
Evaluate the IT risk assessment methodology and results.

### Exhibits (1)

#### Risk Assessment Summary (table)
Table: Top IT Risks Identified
Headers: Risk | Likelihood | Impact | Score | Response
Rows: 5 rows
  Data breach | Medium | High | 12 | Mitigate
  System outage | High | Medium | 12 | Accept
  Insider threat | Low | High | 8 | Monitor
  ... (2 more rows)

### Requirements (4)

**req-accept-outage:** Accept response for system outage appropriate?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"no"}

**req-transfer:** Transfer for vendor failure means?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"insurance"}

**req-avoid:** Avoid response for compliance means?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"eliminate"}

**req-highest-priority:** Highest priority risk for attention?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"compliance"}


---


---

## tbs-isc-009
**Section:** ISC | **Type:** dropdown | **Difficulty:** easy
**Topic:** Cybersecurity - Network Security
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Network Security Controls

### Scenario
Evaluate network security architecture and controls for MNO Corporation.

### Exhibits (2)

#### Network Architecture (text)
1. Single firewall between internet and internal network
2. All internal systems on same network segment (flat network)...

#### Security Best Practices (text)
Defense in depth: Multiple security layers
Network segmentation: Separate sensitive systems...

### Requirements (5)

**req-flat-network:** Risk of flat network architecture?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-lateral-movement"}

**req-shared-wifi:** Risk of shared WiFi password?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no-accountability"}

**req-split-tunnel:** Security concern with split tunneling VPN?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-bypass-controls"}

**req-web-servers:** Where should web servers be located?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-dmz"}

**req-dns-exposure:** Risk of internal DNS exposed to internet?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-info-disclosure"}


---
