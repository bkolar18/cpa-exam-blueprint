# TBS Sample for Review - Batch 1, Part 5 of 5
Generated: 2026-01-12T02:46:19.149Z
TBS in this part: 4
TBS range: 61 to 64 of 64

---

# TBS Questions

## tbs-tcp-002
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Gift & Estate Tax - Gift Tax Rules & Exclusions
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Gift Tax Calculation

### Scenario
Robert and Susan Thompson (married) made several gifts during Year 1. Calculate the gift tax implications and determine if any gift tax return is required.

### Exhibits (2)

#### Gifts Made in Year 1 (table)
Table: Thompson Family Gifts
Headers: Recipient | From Robert | From Susan | Notes
Rows: 6 rows
  Son (adult) | $40,000 cash | $40,000 cash | Birthday gift
  Daughter (adult) | $25,000 cash | $25,000 cash | Down payment help
  Grandson (age 10) | $0 | $20,000 | To UTMA account
  ... (3 more rows)

#### Gift Tax Rules (text)
Annual Exclusion: $17,000 per donee
...

### Requirements (5)

**req-son-taxable:** Taxable gift to Son (combined, after splitting)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":46000,"tolerance":0}

**req-daughter-taxable:** Taxable gift to Daughter (combined, after splitting)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":16000,"tolerance":0}

**req-grandson-utma:** Taxable gift to Grandson (UTMA)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3000,"tolerance":0}

**req-tuition-taxable:** Taxable amount - Direct tuition payment
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}

**req-return-required:** Is a gift tax return (Form 709) required?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-return-yes"}


---


---

## tbs-tcp-040
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Partnership Tax Planning - Liquidating Distributions
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Partnership Liquidation Tax Planning

### Scenario
Calculate tax consequences of partnership liquidation.

### Exhibits (1)

#### Liquidation Details (table)
Table: Partner's Position
Headers: Item | Amount
Rows: 3 rows
  Outside basis | $150,000
  Cash received | $80,000
  Land FMV received | $120,000

### Requirements (4)

**req-basis-after-cash:** Basis after cash distribution
Type: numeric | Points: 1
Expected: {"type":"numeric","value":70000,"tolerance":0}

**req-land-basis:** Partner's basis in land
Type: numeric | Points: 2
Expected: {"type":"numeric","value":70000,"tolerance":0}

**req-gain:** Gain recognized
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}

**req-built-in:** Built-in gain (FMV - basis)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":50000,"tolerance":0}


---


---

## tbs-tcp-023
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Capital Gains Planning - Section 1202 QSBS
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Qualified Small Business Stock Exclusion

### Scenario
A client holds stock that may qualify for the Section 1202 QSBS exclusion.

### Exhibits (1)

#### Stock Information (table)
Table: QSBS Investment Details
Headers: Item | Value
Rows: 4 rows
  Original investment | $500,000
  Current FMV | $5,500,000
  Holding period | 6 years
  ... (1 more rows)

### Requirements (3)

**req-holding-met:** Is 5-year holding period met?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes"}

**req-total-gain:** Total realized gain if sold
Type: numeric | Points: 2
Expected: {"type":"numeric","value":5000000,"tolerance":0}

**req-tax-savings:** Federal tax savings from 100% exclusion (23.8% rate)
Type: numeric | Points: 3
Expected: {"type":"numeric","value":1190000,"tolerance":10000}


---


---

## tbs-tcp-028
**Section:** TCP | **Type:** research | **Difficulty:** medium
**Topic:** Tax Research - Equity Compensation
**Time Estimate:** 8 min | **Max Points:** 2

### Title
Research - Section 83(b) Election

### Scenario
Find the IRC section for electing to include restricted stock in income before vesting.

### Exhibits (1)

#### Research Scenario (memo)
From: Tax Associate
To: Tax Partner
Subject: Restricted Stock Election
Body: Client received restricted stock vesting over 4 years. Wants to recognize income now. Find the IRC section for this election....

### Requirements (1)

**req-83b:** IRC Section for early recognition election
Type: citation | Points: 2
Expected: {"type":"citation","source":"IRC","topicCode":"Section 83(b)","alternativeCitations":[{"source":"IRC","topicCode":"IRC 83(b)"},{"source":"IRC","topicCode":"26 USC 83(b)"}]}


---

