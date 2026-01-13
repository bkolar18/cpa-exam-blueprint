# TBS Sample for Review - Batch 1, Part 4 of 5
Generated: 2026-01-12T02:46:19.149Z
TBS in this part: 15
TBS range: 46 to 60 of 64

---

# TBS Questions

## tbs-isc-031
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** IT Operations - Patch Management
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Patch Management Assessment

### Scenario
Evaluate patch management processes and identify gaps.

### Exhibits (1)

#### Patch Management Process (text)
Frequency: Monthly patching cycle
Testing: Patches tested in dev for 2 weeks...

### Requirements (4)

**req-critical:** Critical patches in monthly cycle risk?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"high-risk"}

**req-compliance:** 85% server compliance assessment?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"concerning"}

**req-third-party:** Third-party apps exclusion risk?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"high"}

**req-exceptions:** No exception process concern?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"risky"}


---


---

## tbs-isc-049
**Section:** ISC | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** IT Audit - Sampling
**Time Estimate:** 11 min | **Max Points:** 5

### Title
IT Audit Sample Size Determination

### Scenario
Determine appropriate sample sizes for IT general controls testing based on control frequency and risk assessment.

### Exhibits (2)

#### Sample Size Guidance (table)
Table: Sample Size Matrix
Headers: Control Frequency | Low Risk | Moderate Risk | High Risk
Rows: 6 rows
  Annual (1) | 1 | 1 | 1
  Quarterly (4) | 1 | 2 | 2
  Monthly (12) | 2 | 3 | 4
  ... (3 more rows)

#### Controls to Test (table)
Table: Controls for Testing
Headers: Control | Frequency | Risk Level | Population
Rows: 4 rows
  User access reviews | Quarterly | High | 4
  Backup verification | Daily | Moderate | 250
  Change approvals | Multiple daily | High | 1,200
  ... (1 more rows)

### Requirements (4)

**req-access-review:** User access review sample size?
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2,"tolerance":0}

**req-backup:** Backup verification sample size?
Type: numeric | Points: 1
Expected: {"type":"numeric","value":25,"tolerance":0}

**req-change:** Change approval sample size?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":60,"tolerance":0}

**req-firewall:** Firewall rule review sample size?
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3,"tolerance":0}


---


---

## tbs-reg-010
**Section:** REG | **Type:** document_review | **Difficulty:** medium
**Topic:** Individual Taxation - Tax Return Preparation
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Schedule C Analysis

### Scenario
Review the following Schedule C (Profit or Loss from Business) and identify any errors or issues that need correction.

### Exhibits (1)

#### Draft Schedule C (table)
Table: Schedule C - Sarah's Consulting LLC (Single-Member LLC)
Headers: Line | Description | Amount
Rows: 16 rows
  1 | Gross receipts | $185,000
  2 | Returns and allowances | $0
  3 | Cost of goods sold | $0
  ... (13 more rows)

### Requirements (5)

**req-health-ins:** Line 15 - Health Insurance Treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-hi-error"}

**req-meals:** Line 20b - Meals Deduction
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-meals-error"}

**req-home-office:** Line 27 - Home Office Calculation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ho-check"}

**req-vehicle:** Line 9 - Vehicle Expenses
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-veh-check"}

**req-corrected-expenses:** Corrected Total Expenses (after fixing errors)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":47700,"tolerance":100}


---


---

## tbs-reg-024
**Section:** REG | **Type:** dropdown | **Difficulty:** medium
**Topic:** Business Law - Agency
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Agency Relationships and Liability

### Scenario
Evaluate each scenario involving agency relationships to determine the rights and liabilities of the parties.

### Exhibits (1)

#### Agency Situations (table)
Table: Agency Law Scenarios
Headers: # | Scenario
Rows: 6 rows
  1 | Sales agent enters contract on behalf of disclosed principal. Third party wants to sue for breach.
  2 | Employee negligently injures customer while making delivery in company truck during work hours.
  3 | Agent acts without authority but principal later accepts the benefits of the contract.
  ... (3 more rows)

### Requirements (6)

**req-disclosed-principal:** Scenario 1 - Disclosed principal breach
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-principal-only"}

**req-respondeat-superior:** Scenario 2 - Employee negligence
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-employer-liable"}

**req-ratification:** Scenario 3 - Accepting unauthorized contract benefits
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ratification"}

**req-undisclosed-principal:** Scenario 4 - Undisclosed principal
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-both-liable"}

**req-apparent-authority:** Scenario 5 - Former agent acts
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-apparent"}

**req-scope-authority:** Scenario 6 - Agent exceeds authority
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-not-bound"}


---


---

## tbs-reg-021
**Section:** REG | **Type:** dropdown | **Difficulty:** medium
**Topic:** Professional Ethics - Circular 230
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Circular 230 Requirements

### Scenario
Evaluate each scenario to determine if the tax practitioner is in compliance with Circular 230 requirements.

### Exhibits (1)

#### Practice Scenarios (table)
Table: Tax Practice Situations
Headers: # | Scenario
Rows: 6 rows
  1 | CPA prepared a return claiming a deduction with no supporting documentation. Client verbally assured the expense was valid.
  2 | CPA discovered a $50,000 error on a prior year return while preparing current year. Client refuses to amend.
  3 | CPA charged a contingent fee for representing a client in an IRS audit examination.
  ... (3 more rows)

### Requirements (6)

**req-scenario-1:** Scenario 1 - Deduction without documentation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-violation-1"}

**req-scenario-2:** Scenario 2 - Prior year error discovered
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-advise-2"}

**req-scenario-3:** Scenario 3 - Contingent fee for audit
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-permitted-3"}

**req-scenario-4:** Scenario 4 - Incomplete advice due to time pressure
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-violation-4"}

**req-scenario-5:** Scenario 5 - Disclosure to subcontractor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-violation-5"}

**req-scenario-6:** Scenario 6 - Substantial authority position
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-compliant-6"}


---


---

## tbs-reg-015
**Section:** REG | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Property Transactions - Capital Gains and Losses
**Time Estimate:** 16 min | **Max Points:** 8

### Title
Capital Gains and Losses Netting

### Scenario
Jennifer Morrison had the following investment transactions during the current tax year. Determine the tax treatment of her gains and losses. Her ordinary taxable income places her in the 32% bracket.

### Exhibits (2)

#### Investment Transactions (table)
Table: Current Year Transactions
Headers: Description | Purchase Date | Sale Date | Sale Price | Cost Basis
Rows: 6 rows
  Stock A (publicly traded) | 03/15/2020 | 04/10/Current | $45,000 | $30,000
  Stock B (publicly traded) | 08/22/Current | 11/15/Current | $12,000 | $18,000
  Stock C (collectible - coins) | 01/05/2015 | 06/30/Current | $28,000 | $15,000
  ... (3 more rows)

#### Capital Gain Tax Rates (text)
Regular long-term capital gains: 0%, 15%, or 20% based on income
Collectibles: Maximum 28%...

### Requirements (8)

**req-stock-a-gain:** Stock A - Gain and character
Type: numeric | Points: 1
Expected: {"type":"numeric","value":15000,"tolerance":0}

**req-stock-b-loss:** Stock B - Loss amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":6000,"tolerance":0}

**req-stock-c-rate:** Stock C - Maximum tax rate on gain
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-28-pct"}

**req-stock-d-loss:** Stock D - Loss amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14000,"tolerance":0}

**req-qsbs-exclusion:** Stock E - Excludable gain under Section 1202
Type: numeric | Points: 1
Expected: {"type":"numeric","value":400000,"tolerance":0}

**req-net-stcg:** Net short-term capital gain/(loss) after carryforward
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-10000,"tolerance":0}

**req-net-ltcg:** Net long-term capital gain (excluding QSBS)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14000,"tolerance":0}

**req-net-result:** Overall net capital gain/(loss)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4000,"tolerance":0}


---


---

## tbs-reg-060
**Section:** REG | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Federal Tax Procedures - Penalties
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Civil Tax Penalties Calculation

### Scenario
A taxpayer has underreported income on their return. Calculate the applicable civil penalties based on the circumstances of the understatement.

### Exhibits (1)

#### Understatement Details (table)
Table: Tax Understatement Information
Headers: Item | Amount
Rows: 6 rows
  Tax shown on return | $28,000
  Correct tax liability | $52,000
  Understatement | $24,000
  ... (3 more rows)

### Requirements (4)

**req-negligence-penalty:** Negligence penalty (IRC 6662)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1600,"tolerance":0}

**req-substantial-penalty:** Substantial understatement penalty (IRC 6662)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2400,"tolerance":0}

**req-fraud-penalty:** Civil fraud penalty (IRC 6663)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":3000,"tolerance":0}

**req-total-penalty:** Total civil penalties
Type: numeric | Points: 1
Expected: {"type":"numeric","value":7000,"tolerance":0}


---


---

## tbs-reg-032
**Section:** REG | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Estate and Gift Tax - Estate Tax Calculation
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Estate Tax Calculation

### Scenario
Calculate the federal estate tax liability for a decedent's estate using the provided information.

### Exhibits (3)

#### Estate Assets (table)
Table: Assets at Death
Headers: Asset | Fair Market Value
Rows: 10 rows
  Primary residence | $850,000
  Investment portfolio | $2,500,000
  Life insurance (estate is beneficiary) | $1,000,000
  ... (7 more rows)

#### Bequests (text)
Surviving spouse: Residence, IRA, $1,000,000 from investment portfolio
Children: Remainder of estate equally...

#### Estate Tax Information (text)
Unified credit exemption equivalent: $13,610,000
Maximum estate tax rate: 40%...

### Requirements (6)

**req-gross-estate:** Gross estate
Type: numeric | Points: 1
Expected: {"type":"numeric","value":8300000,"tolerance":0}

**req-deductions:** Total deductions (debts, expenses)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":450000,"tolerance":0}

**req-marital-deduction:** Marital deduction amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2600000,"tolerance":0}

**req-charitable-deduction:** Charitable deduction amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":100000,"tolerance":0}

**req-taxable-estate:** Taxable estate
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5150000,"tolerance":0}

**req-estate-tax-before-credit:** Tentative tax (40% of taxable estate + prior gifts)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2260000,"tolerance":5000}


---


---

## tbs-reg-047
**Section:** REG | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Property Transactions - Wash Sale Rules
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Wash Sale Loss Disallowance

### Scenario
An individual investor made several stock transactions during December and January. Determine if wash sale rules apply and calculate the adjusted basis for replacement shares.

### Exhibits (1)

#### Stock Transaction Summary (table)
Table: XYZ Corporation Stock Transactions
Headers: Date | Transaction | Shares | Price/Share | Total
Rows: 4 rows
  Dec 10 | Sell | 500 | $42 | $21,000
  Dec 10 | Original purchase (Apr 15) | 500 | $58 | $29,000
  Dec 28 | Buy | 300 | $44 | $13,200
  ... (1 more rows)

### Requirements (5)

**req-realized-loss:** Realized loss on December 10 sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":8000,"tolerance":0}

**req-wash-applies:** Does wash sale rule apply?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes"}

**req-disallowed-loss:** Disallowed loss amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":8000,"tolerance":0}

**req-dec28-basis:** Adjusted basis of 300 shares purchased Dec 28
Type: numeric | Points: 1
Expected: {"type":"numeric","value":18000,"tolerance":0}

**req-jan5-basis:** Adjusted basis of 200 shares purchased Jan 5
Type: numeric | Points: 1
Expected: {"type":"numeric","value":12200,"tolerance":0}


---


---

## tbs-reg-062
**Section:** REG | **Type:** reconciliation | **Difficulty:** medium
**Topic:** Business Income - Schedule C Calculation
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Schedule C Net Profit Reconciliation

### Scenario
Maria operates a sole proprietorship consulting business. Based on the information provided, reconcile her book income to her Schedule C net profit for the current year.

Required: Calculate the adjustments needed to determine Schedule C net profit.

### Exhibits (2)

#### Book Income Statement (table)
Table: 2024 Profit and Loss (Book Basis)
Headers: Item | Amount
Rows: 11 rows
  Gross receipts | $285,000
  Operating expenses: | 
    - Advertising | $12,000
  ... (8 more rows)

#### Additional Information (text)
Business use of vehicle: 80%
Actual car expenses include: $3,000 fuel, $2,400 insurance, $3,000 depreciation (tax depreciation would be $4,200)...

### Requirements (6)

**req-car-adjustment:** Car expense adjustment (book to tax): business portion only, with tax depreciation
Type: numeric | Points: 1
Expected: {"type":"numeric","value":480,"tolerance":10}

**req-health-ins:** Insurance adjustment for owner's health insurance deducted elsewhere
Type: numeric | Points: 1
Expected: {"type":"numeric","value":9600,"tolerance":0}

**req-meals:** Meals and entertainment deduction adjustment (book $6,000 to allowed deduction)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2000,"tolerance":0}

**req-allowed-insurance:** Deductible business insurance on Schedule C (excluding owner health)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5600,"tolerance":0}

**req-total-deductions:** Total Schedule C deductions
Type: numeric | Points: 1
Expected: {"type":"numeric","value":45980,"tolerance":200}

**req-net-profit:** Schedule C net profit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":239020,"tolerance":500}


---


---

## tbs-reg-031
**Section:** REG | **Type:** research | **Difficulty:** medium
**Topic:** Tax Research - Corporate Formation
**Time Estimate:** 8 min | **Max Points:** 2

### Title
Research - Corporate Formation Nonrecognition

### Scenario
A client is forming a corporation and wants to understand the nonrecognition rules for property transfers.

Required: Cite the IRC section that provides for nonrecognition on transfers to controlled corporations.

### Exhibits (1)

#### Research Scenario (memo)
From: Tax Associate
To: Tax Partner
Subject: Corporate Formation Authority
Body: Our client is transferring appreciated property to a newly formed corporation in exchange for 100% of the stock.

Needed: Primary IRC citation for the nonrecognition provision that allows deferral of gain on property transfers to controlled corporations....

### Requirements (1)

**req-351-citation:** IRC Section for Controlled Corporation Transfers
Type: citation | Points: 2
Expected: {"type":"citation","source":"IRC","topicCode":"Section 351","alternativeCitations":[{"source":"IRC","topicCode":"IRC 351"},{"source":"IRC","topicCode":"IRC Section 351"},{"source":"IRC","topicCode":"2...


---


---

## tbs-tcp-075
**Section:** TCP | **Type:** document_review | **Difficulty:** hard
**Topic:** International Tax - Controlled Foreign Corporations
**Time Estimate:** 14 min | **Max Points:** 7

### Title
CFC Planning and GILTI Implications

### Scenario
A U.S. corporation owns foreign subsidiaries. Analyze CFC status, Subpart F, and GILTI implications.

Required: Evaluate required inclusions and planning opportunities.

### Exhibits (1)

#### Foreign Subsidiary Information (table)
Table: CFC Details
Headers: Item | Amount
Rows: 6 rows
  U.S. parent ownership | 100%
  CFC country | Ireland
  Tested income | $5,000,000
  ... (3 more rows)

### Requirements (6)

**req-cfc-status:** Is this a CFC?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-50"}

**req-subpart-f:** Subpart F income inclusion
Type: numeric | Points: 1
Expected: {"type":"numeric","value":800000,"tolerance":0}

**req-qbai-return:** QBAI net deemed tangible income return (10% × QBAI)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":200000,"tolerance":0}

**req-gilti:** GILTI inclusion (tested income less QBAI return and interest)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":4750000,"tolerance":0}

**req-section-250:** Section 250 deduction for GILTI (corporate)?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-50-pct"}

**req-planning:** Best planning strategy to reduce GILTI?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-increase-qbai"}


---


---

## tbs-tcp-032
**Section:** TCP | **Type:** dropdown | **Difficulty:** hard
**Topic:** Estate Planning - Grantor Trusts
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Intentionally Defective Grantor Trust Planning

### Scenario
Analyze the tax benefits of an intentionally defective grantor trust (IDGT).

### Exhibits (1)

#### IDGT Structure (table)
Table: Proposed IDGT Terms
Headers: Item | Value
Rows: 3 rows
  Assets transferred | $2,000,000
  Annual income | $100,000
  Grantor's tax rate | 37%

### Requirements (3)

**req-income-tax:** Who pays income tax on trust income?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-grantor"}

**req-estate-inclusion:** Are IDGT assets included in grantor's estate?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-no"}

**req-annual-benefit:** Annual tax-free gift (grantor paying tax at 37%)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":37000,"tolerance":0}


---


---

## tbs-tcp-033
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Business Tax Planning - Succession Planning
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Family Business Succession Tax Planning

### Scenario
Plan the tax-efficient transfer of a family business.

### Exhibits (1)

#### Business Valuation (table)
Table: Family Business Details
Headers: Item | Value
Rows: 3 rows
  FMV of business | $10,000,000
  Valuation discount | 35%
  Annual exclusion (2024) | $18,000

### Requirements (3)

**req-discounted-value:** Discounted value after 35% discount
Type: numeric | Points: 2
Expected: {"type":"numeric","value":6500000,"tolerance":0}

**req-gift-tax-savings:** Gift tax savings from discount (40% rate)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":1400000,"tolerance":0}

**req-annual-gifts:** Annual exclusion gifts to 4 children
Type: numeric | Points: 1
Expected: {"type":"numeric","value":72000,"tolerance":0}


---


---

## tbs-tcp-039
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Estate Planning - Gift Tax Planning
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Gift Splitting and Annual Exclusion

### Scenario
Maximize gift tax exclusions through gift splitting.

### Exhibits (1)

#### Planned Gifts (table)
Table: Gifts to 4 Recipients
Headers: Recipient | Amount
Rows: 4 rows
  Child 1 | $50,000
  Child 2 | $50,000
  Grandchild 1 | $30,000
  ... (1 more rows)

### Requirements (3)

**req-total:** Total gifts
Type: numeric | Points: 1
Expected: {"type":"numeric","value":160000,"tolerance":0}

**req-exclusions:** Annual exclusions with splitting ($18K × 2 × 4)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":144000,"tolerance":0}

**req-taxable:** Taxable gift amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":16000,"tolerance":0}


---
