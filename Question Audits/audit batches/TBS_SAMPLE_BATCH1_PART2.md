# TBS Sample for Review - Batch 1, Part 2 of 5
Generated: 2026-01-12T02:46:19.148Z
TBS in this part: 15
TBS range: 16 to 30 of 64

---

# TBS Questions

## tbs-bar-053
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Decision Analysis - Incremental Analysis
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Keep vs. Replace Equipment Decision

### Scenario
A company is deciding whether to replace old equipment with new, more efficient equipment. Analyze the incremental costs and benefits.

Required: Calculate the incremental impact of the replacement decision.

### Exhibits (1)

#### Equipment Comparison (table)
Table: Equipment Analysis
Headers: Item | Old Equipment | New Equipment
Rows: 6 rows
  Original cost | $200,000 | $350,000
  Accumulated depreciation | $120,000 | N/A
  Current salvage value | $30,000 | N/A
  ... (3 more rows)

### Requirements (6)

**req-annual-savings:** Annual operating cost savings
Type: numeric | Points: 1
Expected: {"type":"numeric","value":35000,"tolerance":0}

**req-total-savings:** Total 5-year operating cost savings
Type: numeric | Points: 1
Expected: {"type":"numeric","value":175000,"tolerance":0}

**req-net-cost:** Net cost to acquire new equipment
Type: numeric | Points: 1
Expected: {"type":"numeric","value":320000,"tolerance":0}

**req-total-benefit:** Total incremental benefits (savings + future salvage)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":215000,"tolerance":0}

**req-net-advantage:** Net (dis)advantage of replacing
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-105000,"tolerance":0}

**req-decision:** Recommendation?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-keep"}


---


---

## tbs-bar-003
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Cost Accounting - Variance Analysis
**Time Estimate:** 16 min | **Max Points:** 8

### Title
Manufacturing Variance Analysis

### Scenario
Calculate and analyze the manufacturing variances for DEF Manufacturing Company for the month.

### Exhibits (2)

#### Standard Costs (table)
Table: Standard Cost Card (per unit)
Headers: Cost Element | Standard Quantity | Standard Price | Standard Cost
Rows: 5 rows
  Direct Materials | 4 lbs | $5.00/lb | $20.00
  Direct Labor | 2 hours | $18.00/hr | $36.00
  Variable Overhead | 2 DL hrs | $6.00/hr | $12.00
  ... (2 more rows)

#### Actual Results (table)
Table: Actual Production Data
Headers: Item | Amount
Rows: 6 rows
  Units produced | 5,000 units
  Direct materials purchased and used | 21,000 lbs @ $4.80/lb
  Direct labor | 10,500 hours @ $18.50/hr
  ... (3 more rows)

### Requirements (8)

**req-dm-price-variance:** Direct materials price variance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4200,"tolerance":100}

**req-dm-quantity-variance:** Direct materials quantity variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5000,"tolerance":100}

**req-dl-rate-variance:** Direct labor rate variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5250,"tolerance":100}

**req-dl-efficiency-variance:** Direct labor efficiency variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":9000,"tolerance":100}

**req-voh-spending-variance:** Variable overhead spending variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1000,"tolerance":100}

**req-voh-efficiency-variance:** Variable overhead efficiency variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3000,"tolerance":100}

**req-foh-budget-variance:** Fixed overhead budget (spending) variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5000,"tolerance":100}

**req-foh-volume-variance:** Fixed overhead volume variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":100}


---


---

## tbs-bar-071
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Cost Accounting - Spoilage and Scrap
**Time Estimate:** 20 min | **Max Points:** 10

### Title
Normal and Abnormal Spoilage Analysis

### Scenario
Pacific Manufacturing produces precision components using a process costing system. During October, the company started 50,000 units with 4,000 units in beginning WIP (60% complete for conversion). Ending WIP consists of 3,000 units (40% complete for conversion). Normal spoilage is expected to be 5% of good units passed inspection point (at 80% completion). The company uses the weighted-average method.

### Exhibits (1)

#### Production and Cost Data (table)
Table: Production and Cost Data
Headers: Item | Units | Materials Cost | Conversion Cost
Rows: 5 rows
  Beginning WIP | 4,000 | $24,000 | $14,400
  Started this period | 50,000 | $375,000 | $316,000
  Good units completed | 47,000 |  | 
  ... (2 more rows)

### Requirements (5)

**req1:** Normal spoilage in units
Type: numeric | Points: 2
Expected: {"type":"numeric","value":2350,"tolerance":10}

**req2:** Abnormal spoilage in units
Type: numeric | Points: 2
Expected: {"type":"numeric","value":1650,"tolerance":10}

**req3:** Equivalent units for materials (weighted-average)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":54000,"tolerance":0}

**req4:** Cost per equivalent unit for conversion
Type: numeric | Points: 2
Expected: {"type":"numeric","value":6.4,"tolerance":0.02}

**req5:** Total cost of abnormal spoilage
Type: numeric | Points: 2
Expected: {"type":"numeric","value":24090,"tolerance":200}


---


---

## tbs-bar-070
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Process Costing - Weighted Average Method
**Time Estimate:** 18 min | **Max Points:** 10

### Title
Process Costing - Weighted Average

### Scenario
Pacific Chemical Company uses process costing with the weighted average method. The Mixing Department processes raw materials that are added at the beginning of the process. Conversion costs are incurred uniformly throughout the process. The production manager needs cost information for the current period.

### Exhibits (2)

#### Production Data - Mixing Department (table)
Table: Production Data - Mixing Department
Headers: Item | Units | Completion %
Rows: 4 rows
  Beginning WIP (40% complete) | 8,000 | 40%
  Units started during period | 52,000 | 
  Units completed and transferred | 48,000 | 100%
  ... (1 more rows)

#### Cost Data (table)
Table: Cost Data
Headers: Cost Element | Beginning WIP | Current Period
Rows: 2 rows
  Direct materials | $24,000 | $156,000
  Conversion costs | $14,400 | $201,600

### Requirements (5)

**req1:** Equivalent units for direct materials (weighted average)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":60000,"tolerance":0}

**req2:** Equivalent units for conversion costs (weighted average)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":55200,"tolerance":0}

**req3:** Cost per equivalent unit for direct materials
Type: numeric | Points: 2
Expected: {"type":"numeric","value":3,"tolerance":0}

**req4:** Cost per equivalent unit for conversion costs
Type: numeric | Points: 2
Expected: {"type":"numeric","value":3.91,"tolerance":0.01}

**req5:** Total cost of units completed and transferred out
Type: numeric | Points: 2
Expected: {"type":"numeric","value":331680,"tolerance":100}


---


---

## tbs-bar-069
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Risk Analysis - Risk-Adjusted Discount Rates
**Time Estimate:** 20 min | **Max Points:** 10

### Title
Risk-Adjusted Capital Budgeting

### Scenario
Venture Capital Partners is evaluating two investment opportunities with different risk profiles. The firm uses risk-adjusted discount rates based on project beta to account for systematic risk. The risk-free rate is 4% and the market risk premium is 6%.

### Exhibits (2)

#### Project Data (table)
Table: Project Data
Headers: Item | Project Alpha | Project Beta
Rows: 4 rows
  Initial investment | $500,000 | $500,000
  Expected annual cash flow (Years 1-5) | $140,000 | $165,000
  Project beta | 0.8 | 1.5
  ... (1 more rows)

#### Present Value Factors (5 years) (table)
Table: Present Value Factors (5 years)
Headers: Discount Rate | PVIFA (5 years)
Rows: 5 rows
  8% | 3.993
  10% | 3.791
  12% | 3.605
  ... (2 more rows)

### Requirements (4)

**req1:** Risk-adjusted discount rate for Project Alpha (%)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":8.8,"tolerance":0.1}

**req2:** Risk-adjusted discount rate for Project Beta (%)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":13,"tolerance":0}

**req3:** NPV of Project Alpha (use closest PVIFA rate)
Type: numeric | Points: 3
Expected: {"type":"numeric","value":59020,"tolerance":1000}

**req4:** NPV of Project Beta (use closest PVIFA rate)
Type: numeric | Points: 3
Expected: {"type":"numeric","value":80305,"tolerance":1000}


---


---

## tbs-bar-030
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Variance Analysis - Sales Variances
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Sales Mix and Quantity Variance Analysis

### Scenario
Calculate sales mix and quantity variances.

### Exhibits (1)

#### Sales Data (table)
Table: Budget vs Actual
Headers: Product | Budget Units | Actual Units | CM per Unit
Rows: 3 rows
  Standard | 6,000 (60%) | 5,500 (55%) | $20
  Premium | 4,000 (40%) | 4,500 (45%) | $35
  Total | 10,000 | 10,000 | —

### Requirements (3)

**req-budget-cm:** Budgeted total contribution margin
Type: numeric | Points: 2
Expected: {"type":"numeric","value":260000,"tolerance":0}

**req-actual-cm:** Actual total contribution margin
Type: numeric | Points: 2
Expected: {"type":"numeric","value":267500,"tolerance":0}

**req-mix-variance:** Sales mix variance (favorable = positive)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":7500,"tolerance":0}


---


---

## tbs-bar-032
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Decision Analysis - Sensitivity Analysis
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Sensitivity Analysis for Capital Project

### Scenario
Analyze how changes in key variables affect project NPV.

### Exhibits (1)

#### Base Case Project Data (table)
Table: Project Parameters
Headers: Variable | Base Case
Rows: 7 rows
  Initial investment | $500,000
  Annual sales units | 10,000
  Price per unit | $80
  ... (4 more rows)

### Requirements (3)

**req-base-annual-cf:** Base case annual cash flow
Type: numeric | Points: 2
Expected: {"type":"numeric","value":200000,"tolerance":0}

**req-base-npv:** Base case NPV
Type: numeric | Points: 2
Expected: {"type":"numeric","value":258160,"tolerance":1000}

**req-breakeven-units:** Breakeven units (NPV = 0)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":7727,"tolerance":50}


---


---

## tbs-bar-017
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Decision Analysis - Special Order Decision
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Special Order Analysis

### Scenario
Evaluate whether to accept a special order at a reduced price.

### Exhibits (2)

#### Current Operations (table)
Table: KLM Manufacturing - Current Production
Headers: Item | Amount
Rows: 7 rows
  Current production | 80,000 units
  Maximum capacity | 100,000 units
  Normal selling price | $50 per unit
  ... (4 more rows)

#### Special Order Details (text)
Quantity requested: 15,000 units
Offered price: $35 per unit...

### Requirements (6)

**req-capacity-available:** Unused capacity available (units)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":20000,"tolerance":0}

**req-special-order-variable-cost:** Variable cost per unit for special order
Type: numeric | Points: 1
Expected: {"type":"numeric","value":30,"tolerance":0}

**req-contribution-per-unit:** Contribution margin per unit on special order
Type: numeric | Points: 1
Expected: {"type":"numeric","value":5,"tolerance":0}

**req-total-profit-impact:** Total profit impact of accepting order
Type: numeric | Points: 1
Expected: {"type":"numeric","value":75000,"tolerance":0}

**req-accept-order:** Should KLM accept the special order?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-accept"}

**req-minimum-price:** Minimum acceptable price per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":30,"tolerance":0}


---


---

## tbs-bar-012
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** easy
**Topic:** Cost Accounting - Standard Costing
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Standard Cost Card Development

### Scenario
Develop a standard cost card for a new product at YZA Manufacturing.

### Exhibits (1)

#### Standard Information (table)
Table: Production Standards
Headers: Item | Standard
Rows: 7 rows
  Direct materials per unit | 3 pounds
  Direct materials price | $8 per pound
  Direct labor per unit | 1.5 hours
  ... (4 more rows)

### Requirements (5)

**req-dm-standard:** Standard direct materials cost per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":24,"tolerance":0}

**req-dl-standard:** Standard direct labor cost per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":33,"tolerance":0}

**req-voh-standard:** Standard variable overhead per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":9,"tolerance":0}

**req-foh-standard:** Standard fixed overhead per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":15,"tolerance":0}

**req-total-standard:** Total standard cost per unit
Type: numeric | Points: 1
Expected: {"type":"numeric","value":81,"tolerance":0}


---


---

## tbs-bar-049
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Cost Accounting - Throughput Costing
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Throughput vs Absorption Costing

### Scenario
Compare income under throughput and absorption costing.

### Exhibits (1)

#### Production Data (table)
Table: Monthly Operations
Headers: Item | Amount
Rows: 8 rows
  Units produced | 10,000
  Units sold | 8,000
  Selling price per unit | $50
  ... (5 more rows)

### Requirements (3)

**req-throughput-income:** Net income - Throughput costing
Type: numeric | Points: 2
Expected: {"type":"numeric","value":164000,"tolerance":0}

**req-absorption-income:** Net income - Absorption costing
Type: numeric | Points: 2
Expected: {"type":"numeric","value":180000,"tolerance":0}

**req-difference:** Income difference (absorption - throughput)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":16000,"tolerance":0}


---


---

## tbs-bar-062
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Transfer Pricing - Divisional Performance
**Time Estimate:** 22 min | **Max Points:** 12

### Title
Transfer Pricing Decision Analysis

### Scenario
Consolidated Industries has two divisions: Component Division manufactures electronic components, and Assembly Division uses these components in finished products. Component Division can sell externally or transfer internally. Management needs to evaluate transfer pricing options and their impact on divisional and company-wide profitability.

### Exhibits (2)

#### Component Division Data (table)
Table: Component Division Data
Headers: Item | Amount
Rows: 6 rows
  Variable cost per unit | $45
  Fixed cost per unit (at capacity) | $20
  External selling price | $85
  ... (3 more rows)

#### Assembly Division Data (table)
Table: Assembly Division Data
Headers: Item | Amount
Rows: 3 rows
  Additional processing cost per unit | $35
  Selling price of finished product | $160
  External supplier price for component | $78

### Requirements (5)

**req1:** Minimum transfer price at capacity
Type: numeric | Points: 2
Expected: {"type":"numeric","value":85,"tolerance":0}

**req2:** Minimum transfer price below capacity
Type: numeric | Points: 2
Expected: {"type":"numeric","value":45,"tolerance":0}

**req3:** Assembly Division contribution margin per unit at $65 transfer price
Type: numeric | Points: 2
Expected: {"type":"numeric","value":60,"tolerance":0}

**req4:** Company benefit per unit from internal transfer vs. external purchase
Type: numeric | Points: 3
Expected: {"type":"numeric","value":33,"tolerance":0}

**req5:** Component Division total contribution margin from 40,000 transfers at $70
Type: numeric | Points: 3
Expected: {"type":"numeric","value":1000000,"tolerance":0}


---


---

## tbs-bar-007
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Performance Measurement - Transfer Pricing
**Time Estimate:** 15 min | **Max Points:** 6

### Title
Transfer Pricing Decisions

### Scenario
GlobalTech has two divisions that can trade internally. Analyze the transfer pricing options and their impact on divisional and company profits.

### Exhibits (2)

#### Division Information (table)
Table: Division Cost and Price Data
Headers: Item | Component Division (Selling) | Assembly Division (Buying)
Rows: 7 rows
  Variable Cost per Unit | $35 | Additional $45
  Fixed Costs (Annual) | $500,000 | $800,000
  External Sale Price | $60 | N/A
  ... (4 more rows)

#### Transfer Decision (text)
Assembly Division needs 15,000 components and is considering purchasing internally.
...

### Requirements (6)

**req-min-tp-no-capacity:** Minimum Transfer Price (with excess capacity)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":35,"tolerance":0}

**req-max-tp:** Maximum Transfer Price
Type: numeric | Points: 1
Expected: {"type":"numeric","value":58,"tolerance":0}

**req-tp-range:** Is internal transfer beneficial to both divisions?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes"}

**req-company-savings:** Company-wide Savings from Internal Transfer (per unit)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":23,"tolerance":0}

**req-total-savings:** Total Annual Savings (15,000 units)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":345000,"tolerance":0}

**req-assembly-profit:** Assembly Division Profit per Unit (at TP of $45)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":50,"tolerance":0}


---


---

## tbs-bar-056
**Section:** BAR | **Type:** reconciliation | **Difficulty:** hard
**Topic:** Budgeting - Flexible Budgets
**Time Estimate:** 14 min | **Max Points:** 7

### Title
Flexible Budget Performance Report

### Scenario
Prepare a flexible budget performance report to analyze variances at actual activity level.

Required: Calculate flexible budget amounts and variances.

### Exhibits (1)

#### Budget Information (table)
Table: Production Cost Budget
Headers: Item | Static Budget (10,000 units) | Actual (11,000 units)
Rows: 4 rows
  Direct materials ($8/unit) | $80,000 | $92,400
  Direct labor ($12/unit) | $120,000 | $127,600
  Variable overhead ($5/unit) | $50,000 | $58,300
  ... (1 more rows)

### Requirements (7)

**req-flex-dm:** Flexible budget direct materials
Type: numeric | Points: 1
Expected: {"type":"numeric","value":88000,"tolerance":0}

**req-flex-dl:** Flexible budget direct labor
Type: numeric | Points: 1
Expected: {"type":"numeric","value":132000,"tolerance":0}

**req-dm-variance:** Direct materials flexible budget variance (U or F)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4400,"tolerance":0}

**req-dl-variance:** Direct labor flexible budget variance (negative if favorable)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-4400,"tolerance":0}

**req-vo-variance:** Variable overhead flexible budget variance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3300,"tolerance":0}

**req-fo-variance:** Fixed overhead spending variance (negative if favorable)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-2000,"tolerance":0}

**req-volume-variance:** Production volume variance (1,000 extra units × $10 fixed OH rate)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":10000,"tolerance":0}


---


---

## tbs-far-011
**Section:** FAR | **Type:** document_review | **Difficulty:** medium
**Topic:** Statement of Cash Flows - Classification of Cash Flows
**Time Estimate:** 10 min | **Max Points:** 6

### Title
Cash Flow Classifications

### Scenario
Review the following transactions and classify each into the appropriate section of the statement of cash flows: Operating, Investing, or Financing.

### Exhibits (1)

#### Transaction List (text)
Transaction 1: Received $50,000 cash from customers for services rendered.
...

### Requirements (6)

**req-trans1:** Transaction 1 - Customer Collections
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t1-operating"}

**req-trans2:** Transaction 2 - Equipment Purchase
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t2-investing"}

**req-trans3:** Transaction 3 - Dividend Payment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t3-financing"}

**req-trans4:** Transaction 4 - Interest Received
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t4-operating"}

**req-trans5:** Transaction 5 - Stock Issuance
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t5-financing"}

**req-trans6:** Transaction 6 - Supplier Payments
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-t6-operating"}


---


---

## tbs-far-018
**Section:** FAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** State and Local Governments - Modified Accrual Accounting
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Revenue Recognition under Modified Accrual

### Scenario
The City of Oakdale uses modified accrual accounting for its governmental funds. For the fiscal year ending June 30, Year 1, determine when each revenue source should be recognized.

Property taxes:
• Levied July 1, Year 0: $10,000,000
• Due date: January 31, Year 1
• Collected by June 30, Year 1: $9,200,000
• Expected collection July 1-August 29: $500,000
• Expected collection September 1 or later: $300,000

Required: Determine the proper revenue recognition treatment.

### Exhibits (1)

#### Modified Accrual Revenue Recognition (text)
Under modified accrual, revenues must be both MEASURABLE and AVAILABLE.
Available means collected within the fiscal year or expected to be collected soon enough thereafter to pay current liabilities (typically within 60 days)....

### Requirements (5)

**req-collected-current:** Recognition of $9,200,000 collected by June 30
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-recognize-fy1"}

**req-60day-collection:** Recognition of $500,000 expected July-August (within 60 days)
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-recognize-available"}

**req-beyond-60:** Recognition of $300,000 expected September or later
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-deferred"}

**req-total-revenue:** Total property tax revenue recognized in Year 1
Type: numeric | Points: 1
Expected: {"type":"numeric","value":9700000,"tolerance":0}

**req-deferred-inflow:** Deferred inflows - unavailable revenue at June 30
Type: numeric | Points: 1
Expected: {"type":"numeric","value":300000,"tolerance":0}


---
