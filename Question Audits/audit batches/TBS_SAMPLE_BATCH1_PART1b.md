# TBS Sample for Review - Batch 1, Part 1b
TBS in this part: 7 (second half of Part 1)

---

# TBS Questions

## tbs-aud-005
**Section:** AUD | **Type:** journal_entry | **Difficulty:** medium
**Topic:** Evidence & Procedures - Substantive Testing
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Proposed Audit Adjustments

### Scenario
During your audit of Meridian Corp. for Year 1, you identified several misstatements that require adjustment. The client uses the periodic inventory system.

Review the audit findings in the exhibits and prepare the adjusting journal entries required.

### Exhibits (2)

#### Audit Findings (text)
Finding 1: During the inventory observation, the auditor noted that goods costing $45,000 were shipped to Customer XYZ on December 30, Year 1 (terms FOB destination). The goods arrived at the customer on January 3, Year 2. Meridian recorded the sale ($60,000) and removed the inventory on December 30.
...

#### Relevant Account Balances (table)
Table: Selected Account Balances (Before Adjustment)
Headers: Account | Balance
Rows: 6 rows
  Sales Revenue | $4,500,000 CR
  Accounts Receivable | $680,000 DR
  Inventory | $520,000 DR
  ... (3 more rows)

### Requirements (4)

**req-finding1-debit:** Finding 1 - Debit Entry (Revenue Reversal)
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-sales","accountName":"Sales Revenue","amount":60000,"tolerance":0}

**req-finding1-credit:** Finding 1 - Credit Entry (Revenue Reversal)
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"acc-ar","accountName":"Accounts Receivable","amount":60000,"tolerance":0}

**req-finding2-debit:** Finding 2 - Debit Entry (Expense Accrual)
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-consulting","accountName":"Consulting Expense","amount":15000,"tolerance":0}

**req-finding2-credit:** Finding 2 - Credit Entry (Expense Accrual)
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"acc-ap","accountName":"Accounts Payable","amount":15000,"tolerance":0}


---


---

## tbs-aud-074
**Section:** AUD | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Analytical Procedures - Substantive Analytics
**Time Estimate:** 14 min | **Max Points:** 5

### Title
Substantive Analytical Procedures

### Scenario
You are performing substantive analytical procedures for payroll expense at Industrial Services Corp. The company has 450 employees across three divisions.

Required: Calculate the expected amounts and evaluate the differences.

### Exhibits (2)

#### Payroll Information (table)
Table: Employee and Compensation Data
Headers: Division | Employees | Average Annual Salary | Recorded Payroll
Rows: 4 rows
  Manufacturing | 280 | $52,000 | $15,120,000
  Administrative | 95 | $68,000 | $6,290,000
  Sales | 75 | $45,000 base + commission | $5,850,000
  ... (1 more rows)

#### Additional Information (text)
Sales commissions averaged 18% of base salary this year
Prior year total payroll: $24,850,000 with 420 employees...

### Requirements (5)

**req-mfg-expect:** Expected manufacturing payroll (employees × average salary)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14560000,"tolerance":0}

**req-sales-expect:** Expected sales payroll including 18% commissions (base × 1.18 × employees)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3982500,"tolerance":50000}

**req-total-expect:** Total expected payroll (sum of all divisions)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":25002500,"tolerance":50000}

**req-difference:** Difference between recorded and expected payroll
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2257500,"tolerance":100000}

**req-py-growth:** Percentage increase from prior year payroll (round to whole number)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":10,"tolerance":1}


---


---

## tbs-bar-064
**Section:** BAR | **Type:** document_review | **Difficulty:** hard
**Topic:** Capital Budgeting - Capital Rationing
**Time Estimate:** 20 min | **Max Points:** 10

### Title
Capital Rationing Project Selection

### Scenario
Pinnacle Corporation has identified five potential capital projects but has limited investment funds of $2,000,000 available. The company uses a hurdle rate of 12% and must select the optimal combination of projects to maximize shareholder value. Projects are independent and divisible.

### Exhibits (1)

#### Project Investment Analysis (table)
Table: Project Investment Analysis
Headers: Project | Initial Investment | NPV | IRR | Profitability Index
Rows: 5 rows
  Project A | $600,000 | $180,000 | 22% | 1.30
  Project B | $800,000 | $200,000 | 18% | 1.25
  Project C | $500,000 | $175,000 | 24% | 1.35
  ... (2 more rows)

### Requirements (4)

**req1:** Project with highest profitability index
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt3"}

**req2:** Total NPV achievable when ranked by PI (partial investment allowed)
Type: numeric | Points: 3
Expected: {"type":"numeric","value":555000,"tolerance":5000}

**req3:** Best indivisible project combination within $2M budget
Type: dropdown | Points: 3
Expected: {"type":"dropdown","correctOptionId":"opt4"}

**req4:** Maximum NPV achievable with indivisible projects
Type: numeric | Points: 2
Expected: {"type":"numeric","value":515000,"tolerance":0}


---


---

## tbs-bar-020
**Section:** BAR | **Type:** dropdown | **Difficulty:** easy
**Topic:** Performance Evaluation - Balanced Scorecard
**Time Estimate:** 8 min | **Max Points:** 5

### Title
Balanced Scorecard Perspectives

### Scenario
Classify performance measures into the appropriate balanced scorecard perspective.

### Exhibits (2)

#### Performance Measures (text)
1. Customer satisfaction score
2. Employee training hours...

#### BSC Perspectives (text)
Financial: Measures of financial performance and shareholder value
Customer: Measures of customer satisfaction and market position...

### Requirements (5)

**req-customer-satisfaction:** Customer satisfaction score belongs to
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-customer"}

**req-training-hours:** Employee training hours belongs to
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-learning-2"}

**req-roi:** Return on investment belongs to
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-financial-3"}

**req-defect-rate:** Manufacturing defect rate belongs to
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-internal-4"}

**req-market-share:** Market share percentage belongs to
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-customer-5"}


---


---

## tbs-bar-057
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Capital Budgeting - Sensitivity Analysis
**Time Estimate:** 14 min | **Max Points:** 7

### Title
Capital Project Sensitivity Analysis

### Scenario
Evaluate how changes in key assumptions affect project NPV and make recommendations.

Required: Calculate NPV under different scenarios.

### Exhibits (2)

#### Project Data (table)
Table: Base Case Assumptions
Headers: Item | Base Case
Rows: 5 rows
  Initial investment | $500,000
  Annual cash inflows | $150,000
  Project life | 5 years
  ... (2 more rows)

#### Scenarios (text)
Pessimistic: Cash inflows decrease by 20%
Optimistic: Cash inflows increase by 20%...

### Requirements (7)

**req-base-pv:** Base case PV of inflows
Type: numeric | Points: 1
Expected: {"type":"numeric","value":568650,"tolerance":100}

**req-base-npv:** Base case NPV
Type: numeric | Points: 1
Expected: {"type":"numeric","value":68650,"tolerance":100}

**req-pess-inflows:** Pessimistic annual cash inflows
Type: numeric | Points: 1
Expected: {"type":"numeric","value":120000,"tolerance":0}

**req-pess-npv:** Pessimistic case NPV
Type: numeric | Points: 1
Expected: {"type":"numeric","value":-45080,"tolerance":100}

**req-opt-npv:** Optimistic case NPV
Type: numeric | Points: 1
Expected: {"type":"numeric","value":182380,"tolerance":100}

**req-high-disc-npv:** NPV at 15% discount rate
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2800,"tolerance":100}

**req-recommendation:** Project recommendation considering risk?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-conditional"}


---


---

## tbs-bar-066
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Cost Estimation - Regression Analysis
**Time Estimate:** 18 min | **Max Points:** 10

### Title
Cost Estimation Using Regression

### Scenario
Sterling Services uses regression analysis to estimate the mixed cost behavior of its maintenance department. The cost accountant has gathered 12 months of data and performed a regression analysis to develop a cost estimation equation. The results need to be interpreted and applied for budgeting purposes.

### Exhibits (1)

#### Regression Output (table)
Table: Regression Output
Headers: Statistic | Value
Rows: 7 rows
  Intercept (a) | $12,500
  Slope coefficient (b) | $8.75
  R-squared | 0.89
  ... (4 more rows)

### Requirements (5)

**req1:** Estimated maintenance costs at 4,200 machine hours
Type: numeric | Points: 2
Expected: {"type":"numeric","value":49250,"tolerance":0}

**req2:** Percentage of variation explained by the model
Type: numeric | Points: 2
Expected: {"type":"numeric","value":89,"tolerance":0}

**req3:** Estimated maintenance cost at 5,000 machine hours
Type: numeric | Points: 2
Expected: {"type":"numeric","value":56250,"tolerance":0}

**req4:** Is slope statistically significant at 0.05 level?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt1"}

**req5:** Is estimating at 8,000 machine hours appropriate?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt2"}


---


---

## tbs-bar-063
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Performance Measurement - Economic Value Added
**Time Estimate:** 16 min | **Max Points:** 8

### Title
EVA and Residual Income Analysis

### Scenario
Quantum Technologies is evaluating the performance of its three business units using Economic Value Added (EVA) and residual income metrics. The corporate cost of capital is 10%, and management wants to compare traditional ROI with value-based metrics to better align divisional decisions with shareholder value creation.

### Exhibits (1)

#### Divisional Performance Data (in thousands) (table)
Table: Divisional Performance Data (in thousands)
Headers: Metric | Alpha Division | Beta Division | Gamma Division
Rows: 4 rows
  Operating Income (NOPAT) | $450 | $680 | $320
  Total Assets | $3,000 | $5,200 | $2,400
  Current Liabilities (non-interest) | $400 | $700 | $300
  ... (1 more rows)

### Requirements (4)

**req1:** Alpha Division's Economic Value Added (EVA) in thousands
Type: numeric | Points: 2
Expected: {"type":"numeric","value":190,"tolerance":0}

**req2:** Beta Division's Economic Value Added (EVA) in thousands
Type: numeric | Points: 2
Expected: {"type":"numeric","value":230,"tolerance":0}

**req3:** Gamma Division's Return on Investment (ROI) as a percentage
Type: numeric | Points: 2
Expected: {"type":"numeric","value":15.24,"tolerance":0.1}

**req4:** Gamma Division's residual income in thousands
Type: numeric | Points: 2
Expected: {"type":"numeric","value":110,"tolerance":0}


---
