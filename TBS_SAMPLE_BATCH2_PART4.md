# TBS Sample for Review - Batch 2, Part 4 of 5
Generated: 2026-01-12T01:49:04.868Z
TBS in this part: 15
TBS range: 46 to 60 of 62

---

# TBS Questions

## tbs-reg-020
**Section:** REG | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Estate and Gift Tax - Gift Tax
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Gift Tax Calculations

### Scenario
Richard made several gifts during the current year. Calculate the gift tax consequences and determine if any gift tax is owed.

### Exhibits (2)

#### Gifts Made During Year (table)
Table: Richard's Gifts
Headers: Recipient | Gift Description | FMV
Rows: 6 rows
  Son | Cash | $50,000
  Daughter | Stock portfolio | $75,000
  Grandson | Direct tuition payment to university | $45,000
  ... (3 more rows)

#### Gift Tax Information (text)
Annual exclusion: $18,000 per donee
Unified credit equivalent (lifetime exemption): $13,610,000...

### Requirements (6)

**req-son-taxable:** Taxable gift to son
Type: numeric | Points: 1
Expected: {"type":"numeric","value":32000,"tolerance":0}
Explanation: $50,000 - $18,000 annual exclusion = $32,000

**req-daughter-taxable:** Taxable gift to daughter
Type: numeric | Points: 1
Expected: {"type":"numeric","value":57000,"tolerance":0}
Explanation: $75,000 - $18,000 = $57,000

**req-grandson-taxable:** Taxable gift for grandson's tuition
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: Educational exclusion - tuition paid directly to institution is unlimited

**req-granddaughter-taxable:** Taxable gift for granddaughter's medical
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: Medical exclusion - bills paid directly to provider are unlimited

**req-total-taxable-gifts:** Total taxable gifts for the year
Type: numeric | Points: 1
Expected: {"type":"numeric","value":89000,"tolerance":0}
Explanation: $32,000 + $57,000 = $89,000 (political and charitable not taxable gifts)

**req-tax-owed:** Is any gift tax owed this year?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no-unified"}
Explanation: Taxable gifts reduce lifetime exemption but no tax owed until exemption exhausted


---


---

## tbs-reg-014
**Section:** REG | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Property Transactions - Basis Calculations
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Property Basis Determination

### Scenario
Calculate the basis of various properties acquired through different methods.

### Exhibits (1)

#### Property Acquisitions (table)
Table: Property Information
Headers: Property | Details
Rows: 5 rows
  Property A | Purchased for $100,000 cash. Closing costs $3,500. Title insurance $800. Points on mortgage $2,000.
  Property B | Inherited from aunt. Aunt's basis $50,000. FMV at death $180,000. Sold 8 months later for $185,000.
  Property C | Gift from father. Father's basis $30,000. FMV at gift $25,000. Sold for $27,000.
  ... (2 more rows)

### Requirements (6)

**req-prop-a-basis:** Property A - Tax basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":104300,"tolerance":0}
Explanation: $100,000 + $3,500 closing + $800 title = $104,300. Points are deductible, not added to basis.

**req-prop-b-basis:** Property B - Basis for inherited property
Type: numeric | Points: 1
Expected: {"type":"numeric","value":180000,"tolerance":0}
Explanation: Inherited property receives stepped-up basis to FMV at date of death = $180,000

**req-prop-b-character:** Property B - Gain character when sold
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ltcg"}
Explanation: Inherited property is automatically long-term regardless of holding period

**req-prop-c-gain:** Property C - Gain or loss on sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: FMV at gift < donor basis, so dual basis rules apply. Gain basis $30,000, loss basis $25,000. Sold at $27,000 = no gain or loss (in between).

**req-prop-d-basis:** Property D - Donee's basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":25000,"tolerance":0}
Explanation: Carryover basis $20,000 + gift tax on appreciation. Appreciation = $45,000 - $20,000 = $25,000. Gift tax allocation = $5,000 × ($25,000/$25,000) = $5,000. Basis = $20,000 + $5,000 = $25,000.

**req-prop-e-basis:** Property E - Basis in new like-kind property
Type: numeric | Points: 1
Expected: {"type":"numeric","value":105000,"tolerance":0}
Explanation: Old basis $75,000 + boot paid $30,000 = $105,000 (no gain recognized as boot was paid, not received)


---


---

## tbs-reg-073
**Section:** REG | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** S Corporation Taxation - Reasonable Compensation
**Time Estimate:** 14 min | **Max Points:** 5

### Title
S Corporation Reasonable Compensation

### Scenario
Dr. Sarah Miller is the sole shareholder-employee of Medical Consulting Services, an S corporation. The IRS is examining whether her compensation is reasonable.

Required: Analyze the compensation structure and calculate potential adjustments.

### Exhibits (2)

#### S Corporation Financials (table)
Table: 2024 Financial Data
Headers: Item | Amount
Rows: 5 rows
  Gross revenues | $650,000
  Operating expenses (excluding comp) | $180,000
  Sarah's W-2 salary | $85,000
  ... (2 more rows)

#### Comparable Compensation Data (text)
Medical consultants with similar qualifications: $180,000 - $250,000
Sarah works 50 hours per week in the practice...

### Requirements (5)

**req-total-available:** Total available for compensation (revenue less operating expenses)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":470000,"tolerance":0}
Explanation: $650,000 - $180,000 = $470,000 available for compensation and profit

**req-min-reasonable:** Minimum reasonable compensation based on comparable data (low end)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":180000,"tolerance":0}
Explanation: Low end of comparable range is $180,000

**req-ss-current:** Employer Social Security tax on current salary (6.2% up to wage base)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5270,"tolerance":100}
Explanation: $85,000 × 6.2% = $5,270 employer SS tax

**req-ss-reasonable:** Employer Social Security tax if salary raised to $180,000
Type: numeric | Points: 1
Expected: {"type":"numeric","value":10453,"tolerance":100}
Explanation: $168,600 (wage base) × 6.2% = $10,453.20 employer SS tax

**req-additional-tax:** Potential additional employment taxes (FICA employer + employee) on reclassified $95,000
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14535,"tolerance":500}
Explanation: Reclassified $95,000 ($180K - $85K) × 15.3% = $14,535 additional FICA


---


---

## tbs-reg-085
**Section:** REG | **Type:** reconciliation | **Difficulty:** medium
**Topic:** Property Transactions - Installment Method
**Time Estimate:** 14 min | **Max Points:** 7

### Title
Installment Sale with Contingencies

### Scenario
A taxpayer sold rental property using the installment method with a contingent payment arrangement. Calculate the gain recognition schedule.

Required: Determine gross profit percentage and annual gain recognition.

### Exhibits (1)

#### Sale Terms (table)
Table: Installment Sale Agreement
Headers: Item | Amount
Rows: 6 rows
  Contract sales price | $600,000
  Down payment received | $120,000
  Annual payments (5 years) | $96,000/year
  ... (3 more rows)

### Requirements (7)

**req-gross-profit:** Total gross profit on sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":204000,"tolerance":0}
Explanation: $600,000 - $360,000 basis - $36,000 expenses = $204,000

**req-gross-profit-pct:** Gross profit percentage (as whole number)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":34,"tolerance":0}
Explanation: $204,000 / $600,000 = 34%

**req-deprec-recapture:** Section 1250 depreciation recapture
Type: numeric | Points: 1
Expected: {"type":"numeric","value":85000,"tolerance":0}
Explanation: Unrecaptured Section 1250 gain = $85,000 depreciation taken

**req-year1-gain:** Year 1 gain recognized (down payment)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":40800,"tolerance":0}
Explanation: $120,000 × 34% = $40,800

**req-year2-gain:** Year 2 gain recognized (first annual payment)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":32640,"tolerance":0}
Explanation: $96,000 × 34% = $32,640

**req-recapture-timing:** When is depreciation recapture recognized?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-first"}
Explanation: Depreciation recapture recognized first, before installment gain

**req-character:** Character of gain (excluding recapture)
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-1231"}
Explanation: Rental property held >1 year is Section 1231 property


---


---

## tbs-reg-022
**Section:** REG | **Type:** research | **Difficulty:** medium
**Topic:** Tax Research - IRC Citations
**Time Estimate:** 8 min | **Max Points:** 2

### Title
Research - Depreciation Rules

### Scenario
A client purchased equipment for their business and needs to understand the depreciation rules. Find the relevant IRC section.

Required: Cite the IRC section that provides the general rules for depreciation deductions (cost recovery).

### Exhibits (1)

#### Research Request (memo)
From: Tax Associate
To: Tax Manager
Subject: Depreciation Authority
Body: Client: ABC Manufacturing, Inc.

Issue: Client purchased $500,000 of manufacturing equipment. They want to know the general rules for claiming depreciation deductions.

Needed: Primary IRC citation for the Modified Accelerated Cost Recovery System (MACRS) depreciation rules....

### Requirements (1)

**req-irc-citation:** IRC Section for Depreciation
Type: citation | Points: 2
Expected: {"type":"citation","source":"IRC","topicCode":"Section 168","alternativeCitations":[{"source":"IRC","topicCode":"IRC 168"},{"source":"IRC","topicCode":"IRC Section 168"},{"source":"IRC","topicCode":"2...
Explanation: IRC Section 168 provides the rules for the Accelerated Cost Recovery System (MACRS depreciation).


---


---

## tbs-tcp-062
**Section:** TCP | **Type:** document_review | **Difficulty:** hard
**Topic:** Business Planning - Captive Insurance
**Time Estimate:** 14 min | **Max Points:** 7

### Title
Captive Insurance Company Planning

### Scenario
A business owner is considering establishing a captive insurance company to manage risk and potentially obtain tax benefits. Evaluate the requirements and benefits.

Required: Analyze captive insurance arrangements for tax compliance.

### Exhibits (1)

#### Proposed Structure (table)
Table: Captive Insurance Proposal
Headers: Item | Detail
Rows: 5 rows
  Operating business annual revenue | $25,000,000
  Proposed annual premium to captive | $1,200,000
  Captive domicile | Vermont
  ... (2 more rows)

### Requirements (7)

**req-831b-limit:** Current 831(b) premium limit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2800000,"tolerance":100000}
Explanation: $2.8 million indexed limit for 831(b) micro-captive election

**req-831b-eligible:** Is this captive eligible for 831(b) election?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes"}
Explanation: $1.2M premiums under $2.8M limit - eligible for 831(b)

**req-risk-distribution:** Risk distribution requirement met?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-need-more"}
Explanation: 30% unrelated may be insufficient; typically need more diversification

**req-risk-shifting:** Key requirement for risk shifting?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-economic-risk"}
Explanation: Must be genuine economic risk transfer, not tax-motivated structure

**req-deduction:** Operating company's deduction for premium paid?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-deductible"}
Explanation: Premium is deductible as ordinary business expense if arrangement qualifies

**req-captive-income:** 831(b) captive tax treatment of underwriting income?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-excluded"}
Explanation: 831(b) captives taxed only on investment income; underwriting income excluded

**req-irs-scrutiny:** Current IRS treatment of micro-captives?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-high-scrutiny"}
Explanation: Listed transaction - high IRS scrutiny; many abusive arrangements challenged


---


---

## tbs-tcp-043
**Section:** TCP | **Type:** dropdown | **Difficulty:** medium
**Topic:** Retirement Planning - Backdoor Roth
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Backdoor Roth IRA Strategy

### Scenario
Evaluate backdoor Roth conversion strategy for high-income earners.

### Exhibits (1)

#### Client Information (table)
Table: Backdoor Roth Scenario
Headers: Item | Details
Rows: 3 rows
  AGI | $350,000 (MFJ)
  Existing Traditional IRA | $150,000
  Contribution amount | $7,000

### Requirements (3)

**req-direct-eligible:** Eligible for direct Roth contribution?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no"}
Explanation: AGI exceeds Roth phase-out ($240K MFJ)

**req-pro-rata:** Does pro-rata rule apply with existing IRA?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-yes-pro"}
Explanation: Pro-rata rule applies - $150K existing IRA creates tax

**req-strategy:** Best strategy to avoid pro-rata rule
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-401k"}
Explanation: Roll existing IRA into 401(k) to avoid pro-rata


---


---

## tbs-tcp-046
**Section:** TCP | **Type:** dropdown | **Difficulty:** medium
**Topic:** Multi-State Tax Planning - State Residency
**Time Estimate:** 10 min | **Max Points:** 4

### Title
State Tax Residency Planning

### Scenario
Evaluate state tax planning strategies for a relocating client.

### Exhibits (1)

#### State Comparison (table)
Table: State Tax Rates
Headers: State | Income Tax Rate
Rows: 3 rows
  Current (California) | 13.3%
  Proposed (Nevada) | 0%
  Annual income | $500,000

### Requirements (3)

**req-ca-tax:** Annual CA state tax
Type: numeric | Points: 1
Expected: {"type":"numeric","value":66500,"tolerance":100}
Explanation: $500,000 × 13.3% = $66,500

**req-domicile-factor:** Most important domicile factor
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-intent"}
Explanation: Intent to remain indefinitely is key domicile factor

**req-safe-harbor:** CA safe harbor for non-resident
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-45"}
Explanation: CA uses 45-day safe harbor for former residents


---


---

## tbs-tcp-087
**Section:** TCP | **Type:** journal_entry | **Difficulty:** medium
**Topic:** Property Transactions - Gift Tax Basis
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Gift Property Basis Determination

### Scenario
Your client received stock as a gift. You need to determine the basis for gain and loss purposes:

Donor Information:
• Donor's adjusted basis: $15,000
• FMV on date of gift: $12,000
• Gift tax paid: $2,000
• Annual exclusion used

Required: Determine the client's basis for various sale scenarios.

### Exhibits (1)

#### Gift Information (table)
Table: Stock Gift Details
Headers: Item | Amount
Rows: 4 rows
  Donor's Adjusted Basis | $15,000
  FMV on Date of Gift | $12,000
  Gift Tax Paid | $2,000
  ... (1 more rows)

### Requirements (4)

**req-gain-basis:** Basis for computing GAIN (if sold for more than $15,000)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":15000,"tolerance":0}
Explanation: For gain purposes, use donor's basis = $15,000 (no gift tax adjustment for built-in loss property)

**req-loss-basis:** Basis for computing LOSS (if sold for less than $12,000)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":12000,"tolerance":0}
Explanation: For loss purposes, use FMV at gift date = $12,000 (double basis rule)

**req-no-gain-loss:** If sold for $13,000, the result is
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no-gain-loss"}
Explanation: Sale price ($13,000) is between loss basis ($12,000) and gain basis ($15,000) = no gain or loss

**req-gift-tax-adj:** Can gift tax paid increase the gain basis?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no"}
Explanation: Gift tax adjustment only applies when FMV > donor's basis (appreciated property), not for built-in loss property


---


---

## tbs-tcp-074
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Tax Planning - Casualty Losses
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Federal Disaster Loss Deduction

### Scenario
A taxpayer suffered property damage in a federally declared disaster area. Calculate the deductible loss and timing options.

Required: Determine the casualty loss deduction and election opportunities.

### Exhibits (1)

#### Loss Information (table)
Table: Property Damage Details
Headers: Item | Amount
Rows: 6 rows
  Property FMV before disaster | $450,000
  Property FMV after disaster | $280,000
  Adjusted basis in property | $320,000
  ... (3 more rows)

### Requirements (6)

**req-decline-fmv:** Decline in FMV
Type: numeric | Points: 1
Expected: {"type":"numeric","value":170000,"tolerance":0}
Explanation: $450,000 - $280,000 = $170,000

**req-loss-amount:** Loss amount (lesser of decline in FMV or basis)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":170000,"tolerance":0}
Explanation: Lesser of $170,000 FMV decline and $320,000 basis = $170,000

**req-after-insurance:** Loss after insurance reimbursement
Type: numeric | Points: 1
Expected: {"type":"numeric","value":70000,"tolerance":0}
Explanation: $170,000 - $100,000 = $70,000

**req-10pct-floor:** 10% AGI floor (current year)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":18000,"tolerance":0}
Explanation: $180,000 × 10% = $18,000

**req-deductible:** Deductible disaster loss (after floors, current year)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":51900,"tolerance":100}
Explanation: $70,000 - $100 - $18,000 = $51,900

**req-prior-year:** Can disaster loss be claimed on prior year return?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-elect"}
Explanation: Federally declared disaster losses can be elected to prior year


---


---

## tbs-tcp-044
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Property Tax Planning - Installment Sales
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Installment Sale Tax Planning

### Scenario
Calculate installment sale gain recognition.

### Exhibits (1)

#### Sale Details (table)
Table: Property Sale
Headers: Item | Amount
Rows: 4 rows
  Sales price | $500,000
  Adjusted basis | $200,000
  Down payment | $100,000
  ... (1 more rows)

### Requirements (4)

**req-total-gain:** Total gain
Type: numeric | Points: 1
Expected: {"type":"numeric","value":300000,"tolerance":0}
Explanation: $500,000 - $200,000 = $300,000

**req-gross-profit-ratio:** Gross profit ratio (%)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":60,"tolerance":0}
Explanation: $300,000 / $500,000 = 60%

**req-year-1-gain:** Year 1 gain (down payment)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":60000,"tolerance":0}
Explanation: $100,000 × 60% = $60,000

**req-annual-gain:** Gain per annual payment
Type: numeric | Points: 1
Expected: {"type":"numeric","value":60000,"tolerance":0}
Explanation: $100,000 × 60% = $60,000


---


---

## tbs-tcp-073
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Tax Planning - Medicare Premiums
**Time Estimate:** 12 min | **Max Points:** 6

### Title
IRMAA Medicare Premium Planning

### Scenario
A retired couple is planning income to minimize Medicare premium surcharges (IRMAA). Analyze MAGI thresholds and planning strategies.

Required: Calculate premium increases and identify reduction strategies.

### Exhibits (2)

#### Projected Income (table)
Table: Retirement Income Sources
Headers: Source | Amount
Rows: 5 rows
  Social Security (combined) | $65,000
  Pension income | $80,000
  IRA distributions | $50,000
  ... (2 more rows)

#### IRMAA Thresholds (2024 MFJ) (table)
Table: Part B Monthly Premium by MAGI
Headers: MAGI Range | Part B Premium
Rows: 5 rows
  $0 - $206,000 | $174.70 (standard)
  $206,001 - $258,000 | $244.60
  $258,001 - $322,000 | $349.40
  ... (2 more rows)

### Requirements (6)

**req-current-tier:** Current IRMAA tier at $220,000 MAGI
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-tier-2"}
Explanation: $220,000 falls in $206,001 - $258,000 range

**req-annual-surcharge:** Annual Part B surcharge per person (vs. standard)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":839,"tolerance":20}
Explanation: ($244.60 - $174.70) × 12 = $839 per person

**req-couple-surcharge:** Total annual couple surcharge (Part B only)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1678,"tolerance":40}
Explanation: $839 × 2 = $1,678

**req-reduction-needed:** MAGI reduction needed to reach standard tier
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14000,"tolerance":0}
Explanation: $220,000 - $206,000 = $14,000 reduction needed

**req-strategy:** Best strategy to reduce MAGI by $14,000?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-qcd"}
Explanation: QCDs directly reduce IRA distribution amount included in MAGI

**req-lookback:** IRMAA uses MAGI from which year?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-2-years"}
Explanation: IRMAA determined using MAGI from 2 years prior


---


---

## tbs-tcp-015
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Tax Planning - Passive Activity Planning
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Passive Activity Loss Planning

### Scenario
A taxpayer has multiple passive activities. Determine the deductible losses and suspended loss carryforwards.

### Exhibits (3)

#### Passive Activities (table)
Table: Current Year Results
Headers: Activity | Income/(Loss) | Suspended Losses
Rows: 4 rows
  Rental Property A | ($40,000) | $25,000
  Rental Property B | $15,000 | $0
  Limited Partnership C | ($30,000) | $50,000
  ... (1 more rows)

#### Taxpayer Information (text)
AGI (before passive activities): $180,000
Real estate professional: No...

#### Passive Loss Rules (text)
Passive losses only offset passive income
Rental real estate: $25,000 special allowance (active participation)...

### Requirements (6)

**req-net-passive:** Net passive activity income/(loss) - current year
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-35000,"tolerance":0}
Explanation: ($40,000) + $15,000 + ($30,000) + $20,000 = ($35,000)

**req-rental-allowance:** Special $25,000 rental allowance available
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: AGI $180,000 > $150,000, so allowance completely phased out

**req-deductible-loss:** Total passive losses deductible this year
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: Net passive loss with no allowance = $0 deductible

**req-rental-a-suspended:** Rental A ending suspended losses
Type: numeric | Points: 1
Expected: {"type":"numeric","value":65000,"tolerance":0}
Explanation: $25,000 prior + $40,000 current = $65,000

**req-partnership-suspended:** Partnership C ending suspended losses
Type: numeric | Points: 1
Expected: {"type":"numeric","value":80000,"tolerance":0}
Explanation: $50,000 prior + $30,000 current = $80,000

**req-total-suspended:** Total suspended losses carryforward
Type: numeric | Points: 1
Expected: {"type":"numeric","value":155000,"tolerance":0}
Explanation: $65,000 + $80,000 + $10,000 (S Corp D used against its income) = $145,000... Actually: Rental A $65K + LP C $80K + S Corp D $10K (after offsetting $20K income) = $155,000


---


---

## tbs-tcp-068
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Tax Planning - Opportunity Zones
**Time Estimate:** 14 min | **Max Points:** 7

### Title
Qualified Opportunity Zone Fund Investment

### Scenario
An investor sold appreciated assets and is considering investing the gain in a Qualified Opportunity Zone Fund. Analyze the tax benefits.

Required: Calculate deferral periods and basis step-ups.

### Exhibits (1)

#### QOZ Investment Details (table)
Table: Investment Parameters
Headers: Item | Amount
Rows: 5 rows
  Capital gain realized | $1,000,000
  Investment date | July 2024
  Amount invested in QOF | $1,000,000
  ... (2 more rows)

### Requirements (7)

**req-invest-deadline:** Days to invest gain in QOF
Type: numeric | Points: 1
Expected: {"type":"numeric","value":180,"tolerance":0}
Explanation: Must invest within 180 days of gain recognition

**req-initial-basis:** Initial basis in QOF investment
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: Initial basis is zero when deferring entire gain

**req-deferral-end:** When is deferred gain recognized?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-earlier"}
Explanation: Earlier of sale/exchange or December 31, 2026

**req-step-up:** Basis step-up still available for investments after 2021?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-no-step"}
Explanation: 10% and 15% basis step-ups expired; only 10-year exclusion remains

**req-appreciation:** Expected QOF value after 10 years (150% appreciation)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2500000,"tolerance":0}
Explanation: $1,000,000 × 250% (original + 150%) = $2,500,000

**req-exclusion:** Tax-free appreciation if held 10+ years
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1500000,"tolerance":0}
Explanation: $2,500,000 - $1,000,000 original = $1,500,000 excluded

**req-deferred-still-due:** Is original $1M gain still taxable?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-2026"}
Explanation: Original gain deferred but recognized by Dec 31, 2026


---


---

## tbs-tcp-035
**Section:** TCP | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Investment Tax Planning - Tax Loss Harvesting
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Tax Loss Harvesting Strategy

### Scenario
Evaluate tax loss harvesting opportunities.

### Exhibits (1)

#### Portfolio Positions (table)
Table: Holdings
Headers: Position | Gain/Loss
Rows: 3 rows
  Stock A | $25,000 gain
  Stock B | ($12,000) loss
  Stock C | ($8,000) loss

### Requirements (3)

**req-harvestable:** Total harvestable losses
Type: numeric | Points: 1
Expected: {"type":"numeric","value":20000,"tolerance":0}
Explanation: $12,000 + $8,000 = $20,000

**req-tax-savings:** Tax savings if offsetting gains (23.8%)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":4760,"tolerance":1}
Explanation: $20,000 × 23.8% = $4,760

**req-carryover:** Carryover if no gains ($3K annual limit)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":17000,"tolerance":0}
Explanation: $20,000 - $3,000 = $17,000


---
