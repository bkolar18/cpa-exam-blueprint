# TBS Sample for Review - Batch 1, Part 4b
TBS in this part: 7 (second half of Part 4)

---

# TBS Questions

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
