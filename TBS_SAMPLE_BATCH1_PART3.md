# TBS Sample for Review - Batch 1, Part 3 of 5
Generated: 2026-01-12T02:46:19.148Z
TBS in this part: 15
TBS range: 31 to 45 of 64

---

# TBS Questions

## tbs-far-040
**Section:** FAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** Subsequent Events - Recognition and Disclosure
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Subsequent Event Evaluation

### Scenario
Aurora Industries' fiscal year ended December 31, Year 1. The financial statements were issued on February 28, Year 2. The following events occurred between December 31, Year 1 and February 28, Year 2:

1. January 15: Settlement of lawsuit that was pending at year-end. The suit arose from a Year 1 product defect. Settlement amount $500,000 (year-end accrual was $350,000).

2. January 22: Fire destroyed a warehouse causing $2,000,000 in uninsured losses. The fire was caused by an electrical fault.

3. February 1: Issued $10,000,000 in new bonds to refinance existing debt.

4. February 10: Customer who owed $800,000 at year-end filed for bankruptcy. Evidence indicates the customer was having financial difficulty before year-end.

5. February 15: Stock split 2-for-1 declared and effective.

6. February 20: Acquired a competitor company for $15,000,000.

Required: Determine the proper accounting treatment for each event.

### Exhibits (1)

#### Subsequent Events Guidance (text)
Type I (Recognized): Events that provide additional evidence about conditions that existed at the balance sheet date. These require adjustment of the financial statements.
Type II (Non-Recognized): Events that provide evidence about conditions that arose after the balance sheet date. These require disclosure but not adjustment....

### Requirements (6)

**req-lawsuit-treatment:** Lawsuit settlement - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-lawsuit-adjust"}

**req-fire-treatment:** Warehouse fire - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-fire-disclose"}

**req-bonds-treatment:** Bond issuance - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-bonds-disclose"}

**req-bankruptcy-treatment:** Customer bankruptcy - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-bankr-adjust"}

**req-split-treatment:** Stock split - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-split-retroactive"}

**req-acquisition-treatment:** Business acquisition - Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-acq-disclose"}


---


---

## tbs-far-014
**Section:** FAR | **Type:** journal_entry | **Difficulty:** hard
**Topic:** Consolidations - Intercompany Eliminations
**Time Estimate:** 18 min | **Max Points:** 8

### Title
Consolidation Elimination Entries

### Scenario
Parent Corp acquired 100% of Sub Inc. on January 1, Year 1 for $500,000 cash. At acquisition, Sub's book value was $400,000 (Common Stock $100,000, Retained Earnings $300,000). The excess was attributed to equipment with a 10-year remaining life.

During Year 1:
• Sub reported net income of $80,000
• Sub declared and paid dividends of $20,000
• Parent sold inventory to Sub for $50,000 (cost was $35,000)
• 40% of this inventory remains in Sub's ending inventory

Required: Prepare the elimination entries for the Year 1 consolidated worksheet.

### Exhibits (1)

#### Acquisition Analysis (table)
Table: Acquisition Date Fair Value Analysis
Headers: Item | Book Value | Fair Value | Difference
Rows: 7 rows
  Cash | $50,000 | $50,000 | $0
  Accounts Receivable | $80,000 | $80,000 | $0
  Inventory | $70,000 | $70,000 | $0
  ... (4 more rows)

### Requirements (8)

**req-elim-invest-debit-cs:** Investment Elimination - Debit Common Stock
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-common-stock","accountName":"Common Stock (Sub)","amount":100000,"tolerance":0}

**req-elim-invest-debit-re:** Investment Elimination - Debit Retained Earnings
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-retained-earnings","accountName":"Retained Earnings (Sub)","amount":300000,"tolerance":0}

**req-elim-invest-debit-equip:** Investment Elimination - Debit Equipment
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-equipment","accountName":"Equipment","amount":100000,"tolerance":0}

**req-elim-invest-credit:** Investment Elimination - Credit Investment
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"acc-investment-sub","accountName":"Investment in Sub","amount":500000,"tolerance":0}

**req-elim-depreciation:** Additional depreciation expense for Year 1
Type: numeric | Points: 1
Expected: {"type":"numeric","value":10000,"tolerance":0}

**req-elim-interco-sales:** Intercompany sales elimination amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":50000,"tolerance":0}

**req-elim-unrealized-profit:** Unrealized profit in ending inventory
Type: numeric | Points: 1
Expected: {"type":"numeric","value":6000,"tolerance":0}

**req-elim-dividend:** Dividend elimination amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":20000,"tolerance":0}


---


---

## tbs-far-070
**Section:** FAR | **Type:** journal_entry | **Difficulty:** hard
**Topic:** Consolidations - Intercompany Profit Elimination
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Intercompany Inventory Profit Elimination

### Scenario
Prepare consolidation elimination entries for intercompany inventory transactions between Parent Co. and its 80%-owned subsidiary.

### Exhibits (1)

#### Intercompany Transactions (table)
Table: Year 1 Inventory Sales
Headers: Transaction | Amount
Rows: 8 rows
  Parent sold inventory to Subsidiary (downstream) | 
    - Transfer price | $200,000
    - Cost to Parent | $150,000
  ... (5 more rows)

### Requirements (6)

**req-downstream-profit:** Unrealized profit from downstream sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":20000,"tolerance":1}

**req-upstream-profit:** Unrealized profit from upstream sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5000,"tolerance":1}

**req-debit-cogs-downstream:** Downstream elimination: Debit Sales
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"sales","accountName":"Sales","amount":200000,"tolerance":1}

**req-credit-cogs-downstream:** Downstream elimination: Credit COGS
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"cogs","accountName":"Cost of Goods Sold","amount":180000,"tolerance":1}

**req-credit-inventory:** Downstream elimination: Credit Inventory
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"inventory","accountName":"Inventory","amount":20000,"tolerance":1}

**req-nci-upstream:** NCI share of upstream unrealized profit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1000,"tolerance":1}


---


---

## tbs-far-045
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Long-Term Liabilities - Asset Retirement Obligations
**Time Estimate:** 14 min | **Max Points:** 5

### Title
Asset Retirement Obligation Calculations

### Scenario
Pacific Energy Corp acquires an offshore oil platform on January 1, Year 1 for $50 million. The company has a legal obligation to dismantle the platform and restore the site at the end of its 20-year useful life.

The estimated cost of dismantling in 20 years is $15 million. Pacific's credit-adjusted risk-free rate is 8%.

Required: Calculate the asset retirement obligation and related entries.

### Exhibits (1)

#### ARO Information (table)
Table: Asset Retirement Obligation Data
Headers: Item | Amount/Info
Rows: 5 rows
  Platform acquisition cost | $50,000,000
  Estimated retirement cost (Year 20) | $15,000,000
  Credit-adjusted risk-free rate | 8%
  ... (2 more rows)

### Requirements (5)

**req-initial-aro:** Initial ARO liability (rounded to nearest dollar)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3217500,"tolerance":1000}

**req-initial-asset:** Total initial capitalized cost of platform
Type: numeric | Points: 1
Expected: {"type":"numeric","value":53217500,"tolerance":1000}

**req-yr1-accretion:** Year 1 accretion expense (rounded to nearest dollar)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":257400,"tolerance":500}

**req-yr1-depreciation:** Year 1 depreciation on ARO asset (straight-line)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":160875,"tolerance":100}

**req-yr1-end-aro:** ARO liability at end of Year 1
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3474900,"tolerance":1000}


---


---

## tbs-far-021
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Long-term Liabilities - Bonds Payable
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Bond Issued at Premium - Effective Interest Method

### Scenario
On January 1, Year 1, Cascade Corp. issued $1,000,000 of 8% bonds (interest paid annually on December 31) when the market rate was 6%. The bonds mature in 5 years.

Present Value Factors:
• PV of $1 at 6% for 5 periods: 0.7473
• PV of ordinary annuity at 6% for 5 periods: 4.2124

Required: Calculate the bond issuance amounts and first year interest expense.

### Exhibits (1)

#### Bond Terms (table)
Table: Bond Issue Details
Headers: Item | Amount/Rate
Rows: 5 rows
  Face Value | $1,000,000
  Stated (Coupon) Rate | 8%
  Market (Effective) Rate | 6%
  ... (2 more rows)

### Requirements (5)

**req-pv-principal:** Present value of principal
Type: numeric | Points: 1
Expected: {"type":"numeric","value":747300,"tolerance":100}

**req-pv-interest:** Present value of interest payments
Type: numeric | Points: 1
Expected: {"type":"numeric","value":336992,"tolerance":100}

**req-issue-price:** Bond issue price (proceeds)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1084292,"tolerance":200}

**req-premium:** Premium on bonds payable
Type: numeric | Points: 1
Expected: {"type":"numeric","value":84292,"tolerance":200}

**req-yr1-interest-exp:** Year 1 interest expense (effective interest method)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":65058,"tolerance":100}


---


---

## tbs-far-080
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Consolidations - Acquisition Accounting
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Business Combination Fair Value Adjustments

### Scenario
Calculate the fair value adjustments and goodwill for a business acquisition using the acquisition method.

### Exhibits (2)

#### Acquisition Information (table)
Table: Target Company Data at Acquisition
Headers: Item | Book Value | Fair Value
Rows: 6 rows
  Cash | $150,000 | $150,000
  Accounts Receivable | $280,000 | $265,000
  Inventory | $340,000 | $380,000
  ... (3 more rows)

#### Purchase Details (text)
Parent Company acquired 100% of Target Company for $2,100,000 cash.
Transaction costs of $45,000 were paid to investment bankers....

### Requirements (5)

**req-fv-net-assets:** Fair value of identifiable net assets acquired
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1805000,"tolerance":1}

**req-fv-adjustment:** Total fair value adjustment (FV - Book Value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":455000,"tolerance":1}

**req-goodwill:** Goodwill recognized
Type: numeric | Points: 1
Expected: {"type":"numeric","value":295000,"tolerance":1}

**req-transaction-costs:** How are transaction costs accounted for?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-tc-expense"}

**req-total-cost:** Total cost charged to income statement for acquisition
Type: numeric | Points: 1
Expected: {"type":"numeric","value":45000,"tolerance":1}


---


---

## tbs-far-066
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Inventory - LIFO Reserve
**Time Estimate:** 11 min | **Max Points:** 5

### Title
LIFO Reserve Analysis and Conversion

### Scenario
Analyze the LIFO reserve information to convert inventory values and assess the impact on financial ratios.

### Exhibits (1)

#### Inventory Information (table)
Table: Year 1 Data
Headers: Item | Amount
Rows: 6 rows
  Ending Inventory (LIFO) | $340,000
  LIFO Reserve - Beginning | $45,000
  LIFO Reserve - Ending | $62,000
  ... (3 more rows)

### Requirements (5)

**req-fifo-inventory:** Ending inventory on FIFO basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":402000,"tolerance":1}

**req-fifo-cogs:** Cost of goods sold on FIFO basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":873000,"tolerance":1}

**req-gross-profit-diff:** Difference in gross profit (FIFO higher by)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":17000,"tolerance":1}

**req-tax-effect:** Tax savings from using LIFO
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4250,"tolerance":1}

**req-gross-margin-fifo:** Gross margin percentage (FIFO basis)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":37.6,"tolerance":0.2}


---


---

## tbs-far-015
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Consolidations - Noncontrolling Interest
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Noncontrolling Interest Calculations

### Scenario
Alpha Corp acquired 80% of Beta Inc. on January 1, Year 1. The following information is available:

Acquisition details:
• Purchase price for 80%: $640,000
• Beta's book value at acquisition: $700,000
• Fair value of Beta's identifiable net assets: $750,000
• Fair value of NCI at acquisition: $160,000

Year 1 activity:
• Beta reported net income: $120,000
• Beta declared dividends: $40,000
• Amortization of fair value adjustments: $5,000 (annual)

Required: Calculate the NCI amounts for Year 1 consolidated financial statements.

### Exhibits (1)

#### Fair Value Analysis (table)
Table: Acquisition Fair Value Allocation
Headers: Item | Amount
Rows: 5 rows
  Fair value of consideration (80%) | $640,000
  Fair value of NCI (20%) | $160,000
  Total fair value of Beta | $800,000
  ... (2 more rows)

### Requirements (6)

**req-nci-acquisition:** NCI at acquisition date
Type: numeric | Points: 1
Expected: {"type":"numeric","value":160000,"tolerance":0}

**req-nci-share-income:** NCI share of Year 1 net income (before FV amortization)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":24000,"tolerance":0}

**req-nci-share-amort:** NCI share of FV amortization
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1000,"tolerance":0}

**req-nci-adj-income:** NCI share of adjusted net income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":23000,"tolerance":0}

**req-nci-dividends:** NCI share of dividends
Type: numeric | Points: 1
Expected: {"type":"numeric","value":8000,"tolerance":0}

**req-nci-ending:** NCI balance at December 31, Year 1
Type: numeric | Points: 1
Expected: {"type":"numeric","value":175000,"tolerance":0}


---


---

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
