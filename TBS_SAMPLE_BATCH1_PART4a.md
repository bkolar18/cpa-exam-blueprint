# TBS Sample for Review - Batch 1, Part 4a
TBS in this part: 8 (first half of Part 4)

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
