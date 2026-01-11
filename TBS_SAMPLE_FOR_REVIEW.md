# TBS Sample for Review
Generated: 2026-01-10T20:50:31.855Z
Total TBS in bank: 508
Excluded (recently corrected): 19
Eligible for sampling: 487
Sample size: 64 (13.1% of eligible)

## Sample Distribution

### By Type:
- numeric_entry: 32
- dropdown: 17
- document_review: 6
- journal_entry: 3
- reconciliation: 3
- research: 3

### By Section:
- AUD: 10
- BAR: 18
- FAR: 13
- ISC: 6
- REG: 9
- TCP: 8

---

# TBS Questions

## tbs-aud-061
**Section:** AUD | **Type:** document_review | **Difficulty:** hard
**Topic:** Audit Planning - Fraud Risk Assessment
**Time Estimate:** 16 min | **Max Points:** 7

### Title
Fraud Risk Factor Evaluation

### Scenario
You are planning the audit of Apex Distribution Inc. and must evaluate fraud risk factors as part of the risk assessment process. Information has been gathered from various sources including inquiry, observation, and analytical procedures.

Required: Evaluate the fraud risk factors and determine appropriate audit responses.

### Exhibits (3)

#### Company Background (text)
INDUSTRY AND OPERATIONS:
- Regional wholesale distribution company...

#### Observations and Inquiries (memo)
From: Staff Auditor
To: Audit Senior
Subject: Observations from Preliminary Fieldwork
Body: The following observations were noted during our preliminary fieldwork:

1. Several large sales transactions recorded on the last day of the year with unusual terms (right of return extended to 120 days vs normal 30 days)

2. During warehouse walkthrough, observed significant inventory marked "custo...

#### Fraud Risk Triangle Reference (text)
INCENTIVE/PRESSURE:
Conditions that create motivation to commit fraud (financial targets, compensation tied to results, financial difficulties, etc.)...

### Requirements (7)

**req-incentive-factor:** Primary incentive/pressure fraud risk factor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-incentive-bonus"}

**req-opportunity-factor:** Most significant opportunity fraud risk factor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-opp-governance"}

**req-attitude-indicator:** Most concerning attitude/rationalization indicator
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-att-reluctant"}

**req-revenue-risk:** Revenue recognition fraud risk assessment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-rev-significant"}

**req-bill-hold:** Response to $2.8M 'customer hold' inventory
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-bh-criteria"}

**req-response-overall:** Overall audit response to fraud risk
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-resp-unpredictable"}

**req-journal-response:** Response to late journal entries
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-je-review"}


---

## tbs-aud-078
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Audit Evidence - Attorney Inquiry Letters
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Attorney Letter Evaluation

### Scenario
You received responses to inquiry letters sent to outside legal counsel for Apex Industries. Evaluate each response for adequacy of audit evidence.

Required: Determine the appropriate audit response to each attorney letter situation.

### Exhibits (1)

#### Attorney Letter Responses (text)
ATTORNEY A (primary outside counsel): Complete response covering all pending litigation with probability and range assessments
ATTORNEY B (patent counsel): Letter states 'We have no opinion on the likelihood of outcome in the pending patent matter'...

### Requirements (6)

**req-attorney-a:** Attorney A: Complete response with assessments
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-a-sufficient"}

**req-attorney-b:** Attorney B: No opinion on patent matter likelihood
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-b-limitation"}

**req-attorney-c:** Attorney C: Response limited to matters over $25,000 fees
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-c-inadequate"}

**req-attorney-d:** Attorney D: No response despite follow-ups
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-d-serious"}

**req-attorney-e:** Attorney E: No unbilled work, confirms list complete
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-e-adequate"}

**req-overall:** Overall impact if environmental attorney never responds
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-overall-qualified"}


---

## tbs-aud-015
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Internal Controls - Control Deficiency Evaluation
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Classification of Control Deficiencies

### Scenario
During an integrated audit of Granite Manufacturing, you identified the following control deficiencies. Evaluate each deficiency and classify it appropriately.

Required: Determine whether each deficiency is a control deficiency, significant deficiency, or material weakness.

### Exhibits (2)

#### Deficiency Classifications (text)
Control Deficiency: A deficiency exists when the design or operation of a control does not allow management or employees to prevent or detect misstatements on a timely basis.
Significant Deficiency: A deficiency, or combination of deficiencies, that is less severe than a material weakness yet important enough to merit attention by those responsible for oversight....

#### Identified Deficiencies (table)
Table: Control Deficiencies Identified
Headers: # | Description
Rows: 6 rows
  1 | The accounts payable supervisor can both approve invoices for payment and also sign checks. No compensating controls exist. Last year, this resulted in $50,000 of fictitious payments (0.5% of revenue, materiality is $200,000).
  2 | The company's IT general controls over program changes are inadequate. While no misstatements were identified this year, the auditor cannot rely on automated controls.
  3 | Bank reconciliations are prepared but not reviewed by someone independent. No errors were noted in the reconciliations tested.
  ... (3 more rows)

### Requirements (6)

**req-deficiency-1:** Deficiency 1 - AP supervisor segregation issue
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-sd-1"}

**req-deficiency-2:** Deficiency 2 - IT general controls over changes
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-mw-2"}

**req-deficiency-3:** Deficiency 3 - Bank reconciliation review
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-cd-3"}

**req-deficiency-4:** Deficiency 4 - CFO override of cutoff controls
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-mw-4"}

**req-deficiency-5:** Deficiency 5 - Inventory segregation issue
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-cd-5"}

**req-deficiency-6:** Deficiency 6 - GAAP pronouncement identification
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-mw-6"}


---

## tbs-aud-037
**Section:** AUD | **Type:** dropdown | **Difficulty:** easy
**Topic:** Compilation Engagements - SSARS Requirements
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Compilation Engagement Requirements

### Scenario
Determine the requirements and report language for various compilation engagement scenarios.

### Exhibits (1)

#### Compilation Standards (text)
Compilation provides no assurance on financial statements
Accountant is required to understand the entity's business and industry...

### Requirements (5)

**req-assurance-level:** Level of assurance provided in compilation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-none"}

**req-understanding:** Understanding of entity requirement
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-required-understand"}

**req-omit-disclosure:** Can substantially all disclosures be omitted?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-disclose"}

**req-going-concern:** If accountant becomes aware of going concern doubt
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-disclose-gc"}

**req-independence:** Independence requirement for compilation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-not-req-ind"}


---

## tbs-aud-024
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Professional Responsibilities - Engagement Acceptance
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Engagement Acceptance Considerations

### Scenario
Your firm is considering whether to accept new audit engagements. Evaluate each situation and determine whether the firm should accept the engagement.

### Exhibits (1)

#### Proposed Engagements (table)
Table: New Client Considerations
Headers: Client | Situation
Rows: 6 rows
  A | Manufacturing company with complex international operations. Predecessor auditor resigned, stating management lacks integrity. No other issues noted.
  B | Technology startup seeking first audit. CEO previously served as a client for your firm's tax services. No independence issues identified.
  C | Bank requesting audit. Your firm lacks specific banking industry expertise but has access to specialist consultants.
  ... (3 more rows)

### Requirements (6)

**req-client-a:** Client A - Predecessor indicated management integrity concerns
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-decline-a"}

**req-client-b:** Client B - Startup with prior tax client relationship
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-accept-b"}

**req-client-c:** Client C - Bank audit requiring industry expertise
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-accept-c"}

**req-client-d:** Client D - Unrealistic timeline with premium fee
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-decline-d"}

**req-client-e:** Client E - Referral from client representing 45% of revenue
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-independence-e"}

**req-client-f:** Client F - Close friendship and equity compensation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-decline-f"}


---

## tbs-aud-029
**Section:** AUD | **Type:** dropdown | **Difficulty:** hard
**Topic:** Group Audits - Using Component Auditors
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Group Audit Considerations

### Scenario
You are the group engagement partner for the audit of Consolidated Industries, which has multiple subsidiaries audited by component auditors. Evaluate each situation and determine the appropriate response.

### Exhibits (1)

#### Component Information (table)
Table: Subsidiary Information
Headers: Subsidiary | Revenue % | Assets % | Component Auditor | Status
Rows: 5 rows
  Sub A | 45% | 40% | Big Four firm | Work reviewed, no issues
  Sub B | 25% | 30% | Regional firm | First year auditing this component
  Sub C | 15% | 15% | Local firm in foreign jurisdiction | Cannot obtain access to workpapers due to local laws
  ... (2 more rows)

### Requirements (6)

**req-sub-a:** Sub A - Can you take full responsibility?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-a"}

**req-sub-b:** Sub B - Additional procedures for new component auditor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-evaluate-b"}

**req-sub-c:** Sub C - Response to workpaper access restriction
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-alternative-c"}

**req-sub-d:** Sub D - Network firm as component auditor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-still-eval-d"}

**req-sub-e:** Sub E - Immaterial component procedures
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-analytical-e"}

**req-report-ref:** When can group auditor make reference in report?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-significant-ref"}


---

## tbs-aud-057
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Professional Standards - PCAOB vs. AICPA Standards
**Time Estimate:** 12 min | **Max Points:** 6

### Title
PCAOB and AICPA Standards Comparison

### Scenario
Your firm audits both public companies (SEC registrants) and private companies. Compare the requirements under PCAOB and AICPA standards for the following situations:

1. Critical audit matters / Key audit matters: Which standards require disclosure in the auditor's report?

2. Partner rotation: What are the rotation requirements?

3. Engagement quality review: When is it required?

4. Auditor independence: Providing tax services to an audit client.

5. Internal control auditing: Requirements for reporting on ICFR.

6. Audit documentation retention: How long must workpapers be retained?

Required: Identify the correct requirement under each set of standards.

### Exhibits (1)

#### Standards Overview (table)
Table: PCAOB vs. AICPA Key Differences
Headers: Area | PCAOB (Issuers) | AICPA (Non-issuers)
Rows: 3 rows
  Critical/Key Matters | CAMs required | KAMs optional
  Partner Rotation | 5 years lead, 5 years concurring | 7 years suggested
  Workpaper Retention | 7 years | 5 years

### Requirements (6)

**req-cam-kam:** Critical/Key Audit Matters reporting
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-cam-pcaob"}

**req-rotation:** Partner rotation requirements
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-rot-pcaob-strict"}

**req-eqr:** Engagement quality review requirements
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-eqr-both"}

**req-tax-services:** Providing tax services to audit client
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-tax-pcaob-restrict"}

**req-icfr:** Integrated audit of ICFR
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-icfr-pcaob"}

**req-retention:** Workpaper retention period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ret-pcaob-longer"}


---

## tbs-aud-039
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Prospective Financial Statements - Examination and Compilation
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Prospective Financial Statement Engagements

### Scenario
Evaluate requirements and reporting for engagements involving prospective financial statements (forecasts and projections).

### Exhibits (1)

#### Prospective Statement Types (text)
Forecast: Based on expected conditions and expected course of action
Projection: Based on hypothetical assumptions (what-if scenarios)...

### Requirements (5)

**req-forecast-use:** Who can receive a financial forecast?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-general-use"}

**req-projection-use:** Who can receive a financial projection?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-limited-proj"}

**req-exam-assurance:** Assurance level for examination of forecast
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-limited-exam"}

**req-compilation-prosp:** Can prospective financials be compiled?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-compile"}

**req-agreed-upon:** Can agreed-upon procedures be performed?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-yes-aup"}


---

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

