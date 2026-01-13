# TBS Sample for Review - Batch 2, Part 2 of 5
Generated: 2026-01-12T01:49:04.867Z
TBS in this part: 15
TBS range: 16 to 30 of 62

---

# TBS Questions

## tbs-far-065
**Section:** FAR | **Type:** document_review | **Difficulty:** medium
**Topic:** Revenue Recognition - Contract Analysis
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Revenue Recognition Contract Review

### Scenario
Review the contract summary and identify the correct revenue recognition treatment for each performance obligation under ASC 606.

### Exhibits (1)

#### Contract Summary (memo)
From: Sales Department
To: Accounting Department
Subject: New Software Contract - TechCorp Inc.
Body: Contract Details:

Total Contract Price: $180,000

Performance Obligations Identified:
1. Software License (perpetual): Standalone price $100,000
2. Implementation Services (2 months): Standalone price $50,000
3. 2-Year Support Contract: Standalone price $60,000

Total Standalone Prices: $210,000

P...

### Requirements (5)

**req-license-timing:** Software license revenue recognition timing
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-license-point"}
Explanation: Perpetual software licenses transfer control at delivery - point in time recognition

**req-implementation-timing:** Implementation services recognition timing
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-impl-over"}
Explanation: Implementation services are recognized over time as the customer receives benefit

**req-license-amount:** Revenue allocated to software license
Type: numeric | Points: 1
Expected: {"type":"numeric","value":85714,"tolerance":50}
Explanation: $180,000 × ($100,000/$210,000) = $85,714

**req-support-amount:** Revenue allocated to support contract
Type: numeric | Points: 1
Expected: {"type":"numeric","value":51429,"tolerance":50}
Explanation: $180,000 × ($60,000/$210,000) = $51,429

**req-monthly-support:** Monthly support revenue recognition
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2143,"tolerance":20}
Explanation: $51,429 / 24 months = $2,143 per month


---


---

## tbs-far-037
**Section:** FAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** Fair Value - Fair Value Hierarchy (ASC 820)
**Time Estimate:** 10 min | **Max Points:** 6

### Title
Fair Value Measurement Classification

### Scenario
Meridian Investments holds various financial assets that must be measured at fair value. For each asset, determine the appropriate fair value hierarchy level classification based on the valuation inputs used.

Asset Information:

1. Treasury bonds: Valued using quoted prices in active markets
2. Corporate bonds: Valued using quoted prices for similar securities in active markets, adjusted for differences
3. Private equity investment: Valued using discounted cash flow model with unobservable inputs
4. Derivative contract: Valued using market-corroborated interest rate curves
5. Real estate property: Valued using independent appraisal with significant unobservable assumptions
6. Publicly traded stock: Valued using last trading price from NYSE

Required: Classify each asset within the fair value hierarchy.

### Exhibits (1)

#### Fair Value Hierarchy (text)
Level 1: Quoted prices (unadjusted) in active markets for identical assets or liabilities
Level 2: Observable inputs other than Level 1 prices, such as: quoted prices for similar assets in active markets, quoted prices in inactive markets, or observable market-corroborated inputs...

### Requirements (6)

**req-treasury-level:** Treasury bonds - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-treasury-l1"}
Explanation: Quoted prices in active markets for identical assets = Level 1

**req-corp-bond-level:** Corporate bonds (similar securities) - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-corp-l2"}
Explanation: Quoted prices for similar assets with adjustments = Level 2

**req-pe-level:** Private equity investment - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-pe-l3"}
Explanation: DCF with unobservable inputs = Level 3

**req-deriv-level:** Derivative (market-corroborated curves) - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-deriv-l2"}
Explanation: Market-corroborated inputs = Level 2

**req-real-estate-level:** Real estate property - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-re-l3"}
Explanation: Appraisal with significant unobservable assumptions = Level 3

**req-stock-level:** Publicly traded stock - Fair value level
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-stock-l1"}
Explanation: Trading price from active exchange = Level 1


---


---

## tbs-far-067
**Section:** FAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** State and Local Governments - Capital Assets
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Government Capital Asset Reporting

### Scenario
Determine the proper reporting of capital assets for a city government under GASB standards.

### Exhibits (1)

#### Capital Asset Information (table)
Table: City Assets
Headers: Asset | Cost | Accumulated Depreciation | Fund/Activity
Rows: 5 rows
  City Hall Building | $5,000,000 | $1,500,000 | General Fund activities
  Police Vehicles | $800,000 | $480,000 | General Fund activities
  Water Treatment Plant | $12,000,000 | $3,600,000 | Enterprise Fund
  ... (2 more rows)

### Requirements (5)

**req-gw-capital:** Total capital assets in government-wide statements
Type: numeric | Points: 1
Expected: {"type":"numeric","value":44800000,"tolerance":1}
Explanation: All capital assets reported in government-wide: $5M + $0.8M + $12M + $25M + $2M = $44.8M

**req-gw-depreciation:** Total accumulated depreciation (government-wide)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5580000,"tolerance":1}
Explanation: $1.5M + $0.48M + $3.6M = $5.58M (land and infrastructure not depreciated)

**req-fund-reporting:** How are General Fund capital assets reported in fund statements?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-fund-not"}
Explanation: Governmental fund statements use current financial resources - capital assets recorded as expenditures when acquired

**req-infrastructure:** Alternative to depreciation for infrastructure assets
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-infra-modified"}
Explanation: GASB allows modified approach for eligible infrastructure if asset management system maintains condition

**req-enterprise-fund:** Enterprise fund capital asset reporting
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ent-accrual"}
Explanation: Proprietary funds use full accrual accounting - capital assets and depreciation in fund statements


---


---

## tbs-far-076
**Section:** FAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** Investments - Debt Securities Classification
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Investment Securities Classification and Measurement

### Scenario
Determine the proper classification and accounting treatment for various debt security investments.

### Exhibits (1)

#### Investment Portfolio (table)
Table: Debt Securities at Year-End
Headers: Security | Cost | Fair Value | Management Intent
Rows: 4 rows
  US Treasury Bonds | $500,000 | $485,000 | Hold to collect contractual cash flows
  Corporate Bonds A | $300,000 | $325,000 | Hold to collect and sell as needed
  Corporate Bonds B | $200,000 | $180,000 | Active trading for short-term profit
  ... (1 more rows)

### Requirements (5)

**req-treasury-class:** US Treasury Bonds classification
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-treas-htc"}
Explanation: Intent to hold and collect cash flows = held-to-collect at amortized cost

**req-corp-a-class:** Corporate Bonds A classification
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-corp-a-htcs"}
Explanation: Dual objective (collect and sell) = FVOCI classification

**req-corp-b-class:** Corporate Bonds B classification
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-corp-b-fvpl"}
Explanation: Trading intent = fair value through profit/loss

**req-unrealized-pnl:** Unrealized gain/loss recognized in net income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-20000,"tolerance":1}
Explanation: Only trading securities (Corp B): $180,000 - $200,000 = ($20,000) loss

**req-unrealized-oci:** Unrealized gain/loss recognized in OCI
Type: numeric | Points: 1
Expected: {"type":"numeric","value":25000,"tolerance":1}
Explanation: Only FVOCI securities (Corp A): $325,000 - $300,000 = $25,000 gain in OCI


---


---

## tbs-far-100
**Section:** FAR | **Type:** journal_entry | **Difficulty:** hard
**Topic:** Income Taxes - Deferred Tax Asset Valuation Allowance
**Time Estimate:** 10 min | **Max Points:** 4

### Title
DTA Valuation Allowance Adjustment

### Scenario
Horizon Tech has a deferred tax asset of $800,000 from net operating loss carryforwards. Due to recent operating losses, management has determined that it is "more likely than not" that only $500,000 of the DTA will be realized.

At the beginning of Year 1, Horizon had a valuation allowance of $200,000. Based on Year 1 analysis, the required valuation allowance is now $300,000.

Required: Calculate and record the Year 1 adjustment to the valuation allowance.

### Exhibits (1)

#### DTA Realization Analysis (table)
Table: Deferred Tax Asset Assessment
Headers: Item | Amount
Rows: 5 rows
  Gross DTA | $800,000
  Amount expected to be realized | $500,000
  Required Valuation Allowance | $300,000
  ... (2 more rows)

### Requirements (4)

**req-va-increase:** Increase in valuation allowance required
Type: numeric | Points: 1
Expected: {"type":"numeric","value":100000,"tolerance":0}
Explanation: $300,000 required - $200,000 existing = $100,000 increase

**req-ending-va:** Ending valuation allowance balance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":300000,"tolerance":0}
Explanation: Required valuation allowance per analysis

**req-je-debit:** Debit Income Tax Expense
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"tax-expense","accountName":"Income Tax Expense","amount":100000,"tolerance":0}
Explanation: Increasing valuation allowance increases tax expense

**req-je-credit:** Credit Valuation Allowance
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"va-dta","accountName":"Valuation Allowance - DTA","amount":100000,"tolerance":0}
Explanation: Contra asset account to DTA

### Journal Accounts Available (5)
- Income Tax Expense (expense, normal debit)
- Valuation Allowance - DTA (asset, normal credit)
- Deferred Tax Asset (asset, normal debit) [distractor]
- Deferred Tax Liability (liability, normal credit) [distractor]
- Income Tax Benefit (revenue, normal credit) [distractor]


---


---

## tbs-far-072
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** easy
**Topic:** Receivables - Allowance Method
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Allowance for Doubtful Accounts Calculation

### Scenario
Calculate the bad debt expense and allowance for doubtful accounts using different estimation methods.

### Exhibits (1)

#### Accounts Receivable Data (table)
Table: Year 1 Information
Headers: Item | Amount
Rows: 6 rows
  Credit Sales for Year | $2,400,000
  Accounts Receivable (ending) | $380,000
  Allowance for Doubtful Accounts (beginning credit) | $12,000
  ... (3 more rows)

### Requirements (5)

**req-percent-sales:** Bad debt expense using percentage of sales method
Type: numeric | Points: 1
Expected: {"type":"numeric","value":36000,"tolerance":1}
Explanation: $2,400,000 × 1.5% = $36,000

**req-ending-allowance-sales:** Ending allowance balance (percentage of sales method)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":38500,"tolerance":1}
Explanation: $12,000 - $9,500 + $36,000 = $38,500

**req-required-allowance:** Required ending allowance (percentage of AR method)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":19000,"tolerance":1}
Explanation: $380,000 × 5% = $19,000

**req-bad-debt-ar:** Bad debt expense using percentage of AR method
Type: numeric | Points: 1
Expected: {"type":"numeric","value":16500,"tolerance":1}
Explanation: Required $19,000 - ($12,000 - $9,500) = $19,000 - $2,500 = $16,500

**req-method-difference:** Difference in bad debt expense between methods
Type: numeric | Points: 1
Expected: {"type":"numeric","value":19500,"tolerance":1}
Explanation: $36,000 - $16,500 = $19,500


---


---

## tbs-far-079
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Property, Plant, and Equipment - Capitalized Interest
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Capitalized Interest on Construction

### Scenario
Calculate the amount of interest to capitalize on a self-constructed asset using the weighted-average accumulated expenditures method.

### Exhibits (2)

#### Construction Expenditures (table)
Table: Year 1 - Building Construction
Headers: Date | Expenditure
Rows: 4 rows
  January 1 | $600,000
  April 1 | $900,000
  September 1 | $500,000
  ... (1 more rows)

#### Debt Outstanding (table)
Table: Borrowings
Headers: Debt | Principal | Interest Rate
Rows: 3 rows
  Construction loan (specific) | $800,000 | 8%
  General long-term note | $1,500,000 | 6%
  General bonds payable | $2,000,000 | 5%

### Requirements (5)

**req-weighted-avg:** Weighted-average accumulated expenditures
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1441667,"tolerance":1000}
Explanation: $600K×12/12 + $900K×9/12 + $500K×4/12 + $200K×1/12 = $600K + $675K + $166.7K + $16.7K = $1,458,333 (rounded)

**req-specific-interest:** Interest on specific construction loan (avoidable)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":64000,"tolerance":1}
Explanation: $800,000 × 8% = $64,000

**req-weighted-rate:** Weighted-average rate on general debt (percentage)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5.43,"tolerance":0.05}
Explanation: ($1,500,000×6% + $2,000,000×5%) / $3,500,000 = $190,000/$3,500,000 = 5.43%

**req-excess-interest:** Interest on excess expenditures using weighted rate
Type: numeric | Points: 1
Expected: {"type":"numeric","value":35740,"tolerance":500}
Explanation: ($1,458,333 - $800,000) × 5.43% = $658,333 × 5.43% = $35,740

**req-total-capitalize:** Total interest to capitalize
Type: numeric | Points: 1
Expected: {"type":"numeric","value":99740,"tolerance":500}
Explanation: $64,000 + $35,740 = $99,740 (but not more than actual interest incurred)


---


---

## tbs-far-023
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Statement of Cash Flows - Operating Activities - Indirect Method
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Cash Flow from Operations - Indirect Method

### Scenario
Pinnacle Corporation reported the following for Year 1:

Income Statement:
• Net income: $450,000
• Depreciation expense: $85,000
• Amortization of patent: $12,000
• Loss on sale of equipment: $8,000
• Gain on sale of investments: $25,000

Balance Sheet Changes:
• Accounts receivable increased: $35,000
• Inventory decreased: $20,000
• Prepaid expenses increased: $5,000
• Accounts payable decreased: $15,000
• Accrued liabilities increased: $10,000
• Income tax payable decreased: $8,000

Required: Calculate cash flow from operating activities using the indirect method.

### Exhibits (1)

#### Indirect Method Adjustments (text)
Add back: Non-cash expenses (depreciation, amortization), losses on sales
Subtract: Non-cash revenues, gains on sales...

### Requirements (6)

**req-net-income:** Starting point: Net income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":450000,"tolerance":0}
Explanation: Begin with net income: $450,000

**req-noncash-adj:** Total non-cash adjustments (depreciation, amortization, gains/losses)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":80000,"tolerance":0}
Explanation: Non-cash adj = $85,000 + $12,000 + $8,000 - $25,000 = $80,000

**req-asset-changes:** Net adjustment for current asset changes
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-20000,"tolerance":0}
Explanation: Asset changes = -$35,000 (AR increase) + $20,000 (Inv decrease) - $5,000 (Prepaid increase) = -$20,000

**req-liability-changes:** Net adjustment for current liability changes
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-13000,"tolerance":0}
Explanation: Liability changes = -$15,000 (AP decrease) + $10,000 (Accrued increase) - $8,000 (Tax payable decrease) = -$13,000

**req-total-adjustments:** Total adjustments to net income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":47000,"tolerance":0}
Explanation: Total adjustments = $80,000 + (-$20,000) + (-$13,000) = $47,000

**req-cfo:** Cash flow from operating activities
Type: numeric | Points: 1
Expected: {"type":"numeric","value":497000,"tolerance":0}
Explanation: CFO = $450,000 + $47,000 = $497,000


---


---

## tbs-far-053
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Financial Statement Presentation - Discontinued Operations
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Discontinued Operations Presentation

### Scenario
Diversified Holdings Inc. has decided to dispose of its retail segment, which qualifies as a discontinued operation under ASC 205-20. The segment's operating results and disposal information are provided for Year 1.

Required: Calculate the amounts to be reported as discontinued operations.

### Exhibits (1)

#### Discontinued Segment Data (table)
Table: Year 1 Results
Headers: Item | Amount
Rows: 5 rows
  Segment revenues | $4,200,000
  Segment operating expenses | $4,800,000
  Segment carrying amount | $3,500,000
  ... (2 more rows)

### Requirements (5)

**req-operating-loss:** Operating loss from discontinued operations (pretax)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":600000,"tolerance":0}
Explanation: Operating loss = $4,800,000 - $4,200,000 = $600,000 loss

**req-impairment:** Impairment loss on disposal group
Type: numeric | Points: 1
Expected: {"type":"numeric","value":700000,"tolerance":0}
Explanation: Impairment = $3,500,000 carrying - $2,800,000 FV = $700,000

**req-total-pretax:** Total pretax loss from discontinued operations
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1300000,"tolerance":0}
Explanation: Total pretax = $600,000 operating + $700,000 impairment = $1,300,000

**req-tax-benefit:** Tax benefit from discontinued operations
Type: numeric | Points: 1
Expected: {"type":"numeric","value":325000,"tolerance":0}
Explanation: Tax benefit = $1,300,000 × 25% = $325,000

**req-net-loss:** Net loss from discontinued operations
Type: numeric | Points: 1
Expected: {"type":"numeric","value":975000,"tolerance":0}
Explanation: Net loss = $1,300,000 - $325,000 = $975,000


---


---

## tbs-far-047
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Intangible Assets - Goodwill Impairment
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Goodwill Impairment Testing

### Scenario
Summit Corp has two reporting units with recorded goodwill. The company performs annual goodwill impairment testing as of October 1. Under ASC 350, goodwill impairment is measured as the excess of a reporting unit's carrying amount over its fair value.

Required: Perform the goodwill impairment analysis for each reporting unit.

### Exhibits (1)

#### Reporting Unit Information (table)
Table: Reporting Unit Data
Headers:  | Unit A | Unit B
Rows: 3 rows
  Carrying amount of net assets | $45,000,000 | $30,000,000
  Including goodwill of: | $8,000,000 | $12,000,000
  Fair value of reporting unit | $50,000,000 | $25,000,000

### Requirements (5)

**req-unit-a-impaired:** Is Unit A's goodwill impaired?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-a-no"}
Explanation: Fair value ($50M) exceeds carrying amount ($45M), so no impairment

**req-unit-a-loss:** Unit A impairment loss (if any)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: No impairment because fair value exceeds carrying amount

**req-unit-b-impaired:** Is Unit B's goodwill impaired?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-b-yes"}
Explanation: Fair value ($25M) is less than carrying amount ($30M), so impaired

**req-unit-b-loss:** Unit B impairment loss
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5000000,"tolerance":0}
Explanation: Impairment = $30M carrying - $25M fair value = $5M (limited to goodwill balance)

**req-total-impairment:** Total goodwill impairment loss to record
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5000000,"tolerance":0}
Explanation: Total = $0 (Unit A) + $5,000,000 (Unit B) = $5,000,000


---


---

## tbs-far-055
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Accounting Changes - Error Correction
**Time Estimate:** 14 min | **Max Points:** 5

### Title
Prior Period Error Correction

### Scenario
In Year 3, Global Tech discovered that depreciation expense had been understated by $200,000 in Year 1 and $150,000 in Year 2. The company also discovered that $80,000 of revenue was recorded in Year 2 that should have been recorded in Year 3.

The tax rate is 25%. Beginning retained earnings for Year 3 (as originally reported) was $2,500,000.

Required: Calculate the restated amounts.

### Exhibits (1)

#### Error Information (table)
Table: Errors Discovered in Year 3
Headers: Error | Year 1 | Year 2 | Effect
Rows: 3 rows
  Depreciation understated | $200,000 | $150,000 | Net income overstated
  Revenue timing | N/A | $80,000 | Year 2 overstated, Year 3 understated
  Tax rate |  |  | 25%

### Requirements (5)

**req-total-pretax-adj:** Total pretax error affecting beginning RE Year 3
Type: numeric | Points: 1
Expected: {"type":"numeric","value":270000,"tolerance":0}
Explanation: $200,000 (Y1 depr) + $150,000 (Y2 depr) - $80,000 (Y2 revenue, reduces error) = $270,000 overstatement of prior income

**req-tax-effect:** Tax effect of error corrections
Type: numeric | Points: 1
Expected: {"type":"numeric","value":67500,"tolerance":0}
Explanation: Tax effect = $270,000 × 25% = $67,500

**req-net-adj:** Net adjustment to beginning RE (decrease)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":202500,"tolerance":0}
Explanation: Net = $270,000 - $67,500 = $202,500 decrease to RE

**req-restated-re:** Restated beginning RE for Year 3
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2297500,"tolerance":0}
Explanation: Restated RE = $2,500,000 - $202,500 = $2,297,500

**req-yr3-revenue-adj:** Amount to add to Year 3 revenue (timing error)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":80000,"tolerance":0}
Explanation: The $80,000 revenue belongs in Year 3, so add to Year 3 revenue


---


---

## tbs-far-084
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Leases - Sale-Leaseback
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Sale-Leaseback Accounting

### Scenario
Determine the proper accounting for a sale-leaseback transaction under ASC 842.

### Exhibits (1)

#### Transaction Details (table)
Table: Sale-Leaseback Information
Headers: Item | Amount
Rows: 7 rows
  Carrying amount of building | $800,000
  Fair value of building | $1,200,000
  Sale price received | $1,200,000
  ... (4 more rows)

### Requirements (5)

**req-qualifies-sale:** Does this qualify as a sale under ASC 842?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-sale-yes"}
Explanation: Sale price equals fair value and lease is at market rate - qualifies as sale

**req-gain-total:** Total economic gain on sale
Type: numeric | Points: 1
Expected: {"type":"numeric","value":400000,"tolerance":1}
Explanation: $1,200,000 sale price - $800,000 carrying amount = $400,000

**req-rou-asset:** Right-of-use asset to record
Type: numeric | Points: 1
Expected: {"type":"numeric","value":631860,"tolerance":100}
Explanation: $150,000 × 4.2124 = $631,860 (PV of lease payments)

**req-gain-recognized:** Gain recognized at sale (pro-rata based on rights retained)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":189380,"tolerance":200}
Explanation: $400,000 × (1 - $631,860/$1,200,000) = $400,000 × 47.35% = $189,380

**req-gain-deferred:** Gain deferred (reduces ROU asset)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":210620,"tolerance":200}
Explanation: $400,000 - $189,380 = $210,620 (or $400,000 × 52.65%)


---


---

## tbs-far-086
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Financial Statements - Segment Reporting
**Time Estimate:** 11 min | **Max Points:** 5

### Title
Segment Reporting Quantitative Thresholds

### Scenario
Determine which operating segments are reportable based on the quantitative thresholds under ASC 280.

### Exhibits (1)

#### Operating Segment Data (table)
Table: Segment Information
Headers: Segment | Revenue | Profit/(Loss) | Assets
Rows: 6 rows
  Consumer Products | $45,000,000 | $5,200,000 | $38,000,000
  Industrial | $32,000,000 | $4,100,000 | $28,000,000
  Healthcare | $18,000,000 | ($1,500,000) | $15,000,000
  ... (3 more rows)

### Requirements (5)

**req-revenue-threshold:** 10% revenue threshold amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":10500000,"tolerance":1}
Explanation: $105,000,000 × 10% = $10,500,000

**req-profit-threshold:** 10% profit/loss threshold (greater of absolute values)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1030000,"tolerance":10000}
Explanation: Total profits = $10,300,000, Total losses = $1,500,000. Greater = $10,300,000 × 10% = $1,030,000

**req-asset-threshold:** 10% asset threshold amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":9000000,"tolerance":1}
Explanation: $90,000,000 × 10% = $9,000,000

**req-reportable-count:** Number of reportable segments
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3,"tolerance":0}
Explanation: Consumer Products, Industrial, and Healthcare all meet at least one threshold

**req-75-test:** Do reportable segments meet the 75% combined revenue test?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-75-yes"}
Explanation: ($45M + $32M + $18M) / $105M = 90.5% > 75%


---


---

## tbs-far-048
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Financial Statement Presentation - Cash Flow Statement
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Statement of Cash Flows - Direct Method

### Scenario
Westbrook Corp is preparing its statement of cash flows using the direct method. You have been provided with income statement data and balance sheet changes to calculate the operating section cash flows.

Required: Calculate the cash flows from operating activities using the direct method.

### Exhibits (2)

#### Income Statement Data (table)
Table: Income Statement - Year Ended December 31
Headers: Item | Amount
Rows: 7 rows
  Sales revenue | $2,400,000
  Cost of goods sold | $1,440,000
  Operating expenses | $480,000
  ... (4 more rows)

#### Balance Sheet Changes (table)
Table: Balance Sheet Account Changes
Headers: Account | Increase/(Decrease)
Rows: 7 rows
  Accounts receivable | $80,000
  Inventory | $(30,000)
  Prepaid expenses | $15,000
  ... (4 more rows)

### Requirements (6)

**req-cash-from-customers:** Cash received from customers
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2320000,"tolerance":0}
Explanation: Cash from customers = $2,400,000 sales - $80,000 AR increase = $2,320,000

**req-cash-to-suppliers:** Cash paid to suppliers (for inventory)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1435000,"tolerance":0}
Explanation: Cash to suppliers = COGS $1,440,000 - Inv decrease $30,000 + AP decrease $25,000 = $1,435,000

**req-cash-for-operating:** Cash paid for operating expenses
Type: numeric | Points: 1
Expected: {"type":"numeric","value":475000,"tolerance":0}
Explanation: Cash for operating = $480,000 expense + $15,000 prepaid increase - $20,000 accrued increase = $475,000

**req-cash-for-interest:** Cash paid for interest
Type: numeric | Points: 1
Expected: {"type":"numeric","value":70000,"tolerance":0}
Explanation: Cash for interest = $60,000 expense + $10,000 interest payable decrease = $70,000

**req-cash-for-taxes:** Cash paid for income taxes
Type: numeric | Points: 1
Expected: {"type":"numeric","value":85000,"tolerance":0}
Explanation: Cash for taxes = $90,000 expense - $5,000 taxes payable increase = $85,000

**req-net-operating:** Net cash from operating activities
Type: numeric | Points: 1
Expected: {"type":"numeric","value":255000,"tolerance":0}
Explanation: Net operating = $2,320,000 - $1,435,000 - $475,000 - $70,000 - $85,000 = $255,000


---


---

## tbs-far-043
**Section:** FAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Long-Term Liabilities - Debt Restructuring
**Time Estimate:** 14 min | **Max Points:** 5

### Title
Troubled Debt Restructuring Calculations

### Scenario
Oakwood Inc. is experiencing financial difficulties and has negotiated a modification of its debt with First National Bank. The original loan had a carrying value of $500,000 with accrued interest of $25,000. The stated interest rate was 10%.

Under the restructuring agreement, the bank has agreed to:
- Reduce the principal to $400,000
- Reduce the interest rate to 6%
- Extend the maturity by 2 years (now due in 4 years)

Required: Calculate the accounting treatment for this debt restructuring under ASC 470-60.

### Exhibits (2)

#### Original Debt Terms (table)
Table: Original Debt Information
Headers: Item | Amount
Rows: 5 rows
  Principal balance | $500,000
  Accrued interest payable | $25,000
  Total carrying amount | $525,000
  ... (2 more rows)

#### Restructured Terms (table)
Table: New Debt Terms
Headers: Item | Amount
Rows: 5 rows
  New principal | $400,000
  New interest rate | 6%
  New term | 4 years
  ... (2 more rows)

### Requirements (5)

**req-total-carrying:** Total carrying amount before restructuring
Type: numeric | Points: 1
Expected: {"type":"numeric","value":525000,"tolerance":0}
Explanation: Carrying amount = Principal $500,000 + Accrued interest $25,000 = $525,000

**req-future-payments:** Total future cash payments under new terms
Type: numeric | Points: 1
Expected: {"type":"numeric","value":496000,"tolerance":0}
Explanation: Future payments = $400,000 principal + ($24,000 x 4 years interest) = $496,000

**req-gain-loss:** Gain recognized on restructuring (if any)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":29000,"tolerance":0}
Explanation: Gain = $525,000 carrying - $496,000 future payments = $29,000 (carrying exceeds future payments)

**req-new-carrying:** New carrying amount of debt after restructuring
Type: numeric | Points: 1
Expected: {"type":"numeric","value":496000,"tolerance":0}
Explanation: When future payments < carrying amount, new carrying = future payments = $496,000

**req-interest-rate:** Effective interest rate on restructured debt (%)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: When gain is recognized, effective rate becomes 0% (all payments reduce principal)


---
