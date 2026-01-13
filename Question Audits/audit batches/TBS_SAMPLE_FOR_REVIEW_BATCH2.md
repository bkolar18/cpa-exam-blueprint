# TBS Sample for Review - Batch 2
Generated: 2026-01-12T01:13:42.115Z
Total TBS in bank: 500
Excluded (recently corrected): 19
Excluded (first sample): 64
Eligible for sampling: 421
Sample size: 62 (14.7% of eligible)

## Sample Distribution

### By Type:
- numeric_entry: 29
- dropdown: 19
- document_review: 4
- journal_entry: 4
- reconciliation: 3
- research: 3

### By Section:
- AUD: 9
- BAR: 6
- FAR: 16
- ISC: 8
- REG: 11
- TCP: 12

---

# TBS Questions

## tbs-aud-058
**Section:** AUD | **Type:** document_review | **Difficulty:** medium
**Topic:** Audit Evidence - Attorney Letter Responses
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Evaluating Attorney Letter Responses

### Scenario
You are the senior auditor for Nextech Solutions Inc., a technology company. As part of year-end procedures, you sent an inquiry letter to the client's outside legal counsel. The response has been received and requires evaluation.

The company has three ongoing legal matters disclosed in the notes to the financial statements. Your task is to evaluate the attorney's responses and determine appropriate audit actions.

Required: Review the attorney letter response and evaluate the adequacy of the responses for each legal matter.

### Exhibits (2)

#### Attorney Letter Response (memo)
From: Wilson & Parker LLP - Outside Legal Counsel
To: Anderson & Associates CPAs
Subject: Response to Audit Inquiry - Nextech Solutions Inc.
Body: Per your request dated January 5, Year 2, we provide the following responses regarding pending litigation for Nextech Solutions Inc. for the year ended December 31, Year 1:

MATTER A - Patent Infringement Claim
A claim was filed against Nextech by TechRival Corp alleging infringement of their patent...

#### Financial Statement Disclosure (memo)
From: Client Management
To: Audit File
Subject: Note 15 - Commitments and Contingencies
Body: The Company is involved in various legal proceedings in the ordinary course of business:

(a) A patent infringement claim with uncertain outcome. No loss accrual has been recorded.
(b) An employment matter with remote likelihood of loss.
(c) A class action product liability claim in early stages. Ma...

### Requirements (6)

**req-matter-a-eval:** Matter A response adequacy
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-matter-a-inadequate"}
Explanation: Attorney stating they 'cannot provide an estimate' without indicating likelihood requires follow-up - this is a limitation

**req-matter-b-eval:** Matter B response adequacy
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-matter-b-adequate"}
Explanation: Remote likelihood with quantified maximum exposure is adequate for audit purposes

**req-matter-c-eval:** Matter C response adequacy
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-matter-c-conflict"}
Explanation: Attorney says 'unable to express opinion' but management disclosed 'reasonably possible' - this conflict requires resolution

**req-limitation-language:** Significance of 'substantive attention' limitation
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-limitation-standard"}
Explanation: 'Substantive attention' limitation is standard and acceptable - it limits response to matters actively worked on

**req-mgmt-assertion:** Management's 'no material adverse effect' assertion
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-assertion-question"}
Explanation: Given uncertainties in Matters A and C, management's blanket assertion needs support or qualification

**req-overall-action:** Most appropriate overall audit response
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-action-followup"}
Explanation: Matters A and C require follow-up with counsel and management before concluding


---

## tbs-aud-065
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Audit Reports - Report Modifications
**Time Estimate:** 10 min | **Max Points:** 6

### Title
Audit Report Modification Types

### Scenario
For each of the following scenarios, determine the appropriate type of audit report modification or paragraph addition that would be required.

Required: Select the most appropriate report modification for each situation.

### Exhibits (1)

#### Report Modification Reference (table)
Table: Types of Report Modifications
Headers: Modification Type | When Used
Rows: 5 rows
  Emphasis of Matter | Draw attention to matter adequately disclosed that is fundamental to understanding
  Other Matter | Relevant to understanding the audit, auditor's responsibilities, or report
  Qualified Opinion | Material but not pervasive GAAP departure or scope limitation
  ... (2 more rows)

### Requirements (6)

**req-gc-adequate:** Substantial doubt about going concern with adequate disclosure in notes
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-gc-eom"}
Explanation: Going concern with adequate disclosure requires Emphasis of Matter paragraph

**req-segment:** Prior period statements audited by predecessor auditor
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-seg-om"}
Explanation: Reference to predecessor auditor is reported in Other Matter paragraph

**req-restatement:** Prior period restatement to correct material error, properly disclosed
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-rest-eom"}
Explanation: Corrected prior period error draws attention through Emphasis of Matter

**req-scope-immaterial:** Scope limitation on immaterial balance
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-scope-unmod"}
Explanation: Immaterial scope limitations do not require report modification

**req-inconsistency:** Voluntary change from FIFO to weighted average, properly disclosed
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-change-eom"}
Explanation: Material change in accounting principle properly applied requires Emphasis of Matter

**req-supplementary:** Required supplementary information (RSI) is omitted
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-rsi-om"}
Explanation: Omitted RSI is reported in Other Matter paragraph; does not affect opinion


---

## tbs-aud-086
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Compilation Engagements - SSARS Requirements
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Compilation Engagement Requirements

### Scenario
Your firm has been engaged to compile financial statements for three different clients. Evaluate the proper handling of each situation under SSARS.

Required: Determine the appropriate action for each compilation scenario.

### Exhibits (1)

#### SSARS Compilation Requirements (text)
Written engagement letter required before compilation
Understanding of industry and accounting practices needed...

### Requirements (6)

**req-discovery:** During compilation, you discover material departure from GAAP not disclosed
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-disc-modify"}
Explanation: Departures must be disclosed in notes or accountant's report; discuss with management

**req-independence:** Partner's spouse is controller of compilation client
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-indep-disclose"}
Explanation: Independence not required for compilation but lack of independence must be disclosed

**req-management-use:** Client requests compilation for internal management use only
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-mgmt-legend"}
Explanation: Management-use compilations may omit report but require legend on each page

**req-fraud:** You suspect fraud during compilation but cannot confirm
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-fraud-consider"}
Explanation: Must consider implications for engagement and take appropriate action

**req-ocboa:** Client wants compilation using cash basis of accounting
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-ocboa-ok"}
Explanation: Special purpose frameworks including cash basis are acceptable with proper disclosure

**req-omit-disclosures:** Client requests omission of substantially all disclosures
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-omit-acceptable"}
Explanation: Omission of disclosures permitted if disclosed in report and not intended to mislead


---

## tbs-aud-018
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Professional Ethics - Independence Requirements
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Independence Threat Evaluation

### Scenario
Your firm is the auditor of Tech Solutions Inc., a publicly traded company. Evaluate each situation and determine if independence is impaired.

### Exhibits (1)

#### Independence Situations (table)
Table: Situations to Evaluate
Headers: # | Situation
Rows: 6 rows
  1 | The audit partner's spouse owns 100 shares of Tech Solutions stock (valued at $2,500). The partner has no influence over the investment decisions.
  2 | An audit senior's brother is the IT director at Tech Solutions. The senior works on the audit but does not audit IT-related accounts.
  3 | The firm provided tax return preparation services to Tech Solutions. The firm made no management decisions and the fee was $25,000 (audit fee is $500,000).
  ... (3 more rows)

### Requirements (6)

**req-situation-1:** Situation 1 - Partner's spouse stock ownership
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-impaired-1"}
Explanation: Covered member (includes spouse) direct financial interest impairs independence regardless of amount

**req-situation-2:** Situation 2 - Audit senior's brother is IT director
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-impaired-2"}
Explanation: IT director is a key position; close relative in key position impairs independence

**req-situation-3:** Situation 3 - Tax preparation services
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-not-impaired-3"}
Explanation: Tax preparation is permitted for audit clients if no management decisions are made and preapproved by audit committee

**req-situation-4:** Situation 4 - Manager accepting CFO position
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-impaired-4"}
Explanation: Employment negotiations with an audit client impair independence; must be removed from engagement

**req-situation-5:** Situation 5 - Firm pension plan mutual fund holdings
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-not-impaired-5"}
Explanation: Diversified mutual fund holdings under 5% of fund or firm's net worth do not impair independence

**req-situation-6:** Situation 6 - Tax partner's daughter as accounting clerk
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-not-impaired-6"}
Explanation: Tax partner is not on audit engagement; daughter in non-key position does not impair independence


---

## tbs-aud-073
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Related Parties - Related Party Transactions
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Related Party Transaction Evaluation

### Scenario
During the audit of Horizon Holdings, you identified several potential related party transactions. The company is privately held with the founder and family members owning 85% of shares.

Required: Evaluate each transaction for proper identification and disclosure.

### Exhibits (1)

#### Potential Related Party Transactions (table)
Table: Identified Transactions
Headers: Description | Amount | Other Party
Rows: 6 rows
  Building lease | $420,000/year | CEO's family trust
  IT services contract | $180,000/year | Company 40% owned by CFO
  Loan to executive | $500,000 | VP of Sales (non-owner)
  ... (3 more rows)

### Requirements (6)

**req-lease-rp:** Building lease from CEO's family trust
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-lease-rp"}
Explanation: Immediate family interests are related parties; requires disclosure

**req-it-contract:** IT services from company 40% owned by CFO
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-it-rp"}
Explanation: Significant ownership by key management makes this a related party

**req-exec-loan:** Loan to VP of Sales (non-owner executive)
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-loan-rp"}
Explanation: Key management personnel are related parties regardless of ownership

**req-subsidiary:** Inventory purchases from 100% owned subsidiary
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-sub-eliminate"}
Explanation: Intercompany transactions are eliminated in consolidated statements

**req-board-consult:** Consulting fees to board member's firm
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-board-rp"}
Explanation: Board members are related parties; transactions require evaluation and disclosure

**req-former-ceo:** Equipment sale to former CEO (resigned 3 years ago)
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-former-evaluate"}
Explanation: Former executives may still be related if influence continues; requires evaluation


---

## tbs-aud-087
**Section:** AUD | **Type:** dropdown | **Difficulty:** medium
**Topic:** Risk Assessment - Risk Assessment Procedures
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Risk Assessment Procedures and Responses

### Scenario
You are planning the audit of Clearwater Manufacturing Inc., a mid-size company that produces industrial equipment. During your planning phase, you must perform risk assessment procedures to identify and assess risks of material misstatement.

Required: Evaluate the appropriateness of each risk assessment procedure and determine the proper auditor response.

### Exhibits (1)

#### Client Background (text)
Annual revenue: $45 million
Industry: Industrial equipment manufacturing...

### Requirements (6)

**req-inquiry-only:** Is inquiry of management alone sufficient for risk assessment?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-inquiry-no"}
Explanation: Inquiry alone is not sufficient; must be combined with other procedures like observation, inspection, and analytical procedures

**req-erp-risk:** New ERP system implementation indicates which risk consideration?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-erp-control"}
Explanation: New systems often have untested controls and increased risk of processing errors

**req-mgmt-turnover:** Management turnover requires which auditor response?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-turnover-assess"}
Explanation: Turnover may indicate control environment issues and requires reassessment of management integrity and competence

**req-prior-mw:** Prior year material weakness in inventory controls requires?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-mw-remediation"}
Explanation: Must evaluate whether management has remediated the material weakness and design appropriate tests

**req-revenue-sig:** Complex revenue recognition typically represents a?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-rev-significant"}
Explanation: Revenue recognition is presumed to be a significant risk requiring special audit consideration

**req-discussion:** The audit team brainstorming session should focus on?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-discuss-mmiss"}
Explanation: Team discussion should emphasize how and where financial statements might be materially misstated due to fraud or error


---

## tbs-aud-093
**Section:** AUD | **Type:** journal_entry | **Difficulty:** medium
**Topic:** Substantive Procedures - Expense Testing
**Time Estimate:** 8 min | **Max Points:** 2

### Title
Proposed Adjusting Entry - Accrued Expenses

### Scenario
During your audit of Delta Services Inc. for the year ended December 31, Year 1, you performed a search for unrecorded liabilities. Your procedures revealed that Delta received legal services in December Year 1 but had not recorded the expense. The law firm's invoice dated January 15, Year 2 shows:

• Services rendered: November 15 - December 20, Year 1
• Amount: $45,000

Delta did not accrue this expense at year-end.

Required: Prepare the proposed adjusting journal entry.

### Exhibits (1)

#### Legal Services Invoice (memo)
From: Smith & Associates LLP
To: Delta Services Inc.
Subject: Invoice for Legal Services
Body: Professional services rendered:

Matter: Contract Review and Negotiation
Service Period: November 15 - December 20, Year 1
Partner Hours: 45 @ $600/hr = $27,000
Associate Hours: 60 @ $300/hr = $18,000

Total Due: $45,000
Payment Terms: Net 30 days...

### Requirements (2)

**req-debit-legal:** Debit to record legal expense
Type: journal_debit | Points: 1
Expected: {"type":"journal","accountId":"acc-legal-expense","accountName":"Legal Expense","amount":45000,"tolerance":0}
Explanation: Debit Legal Expense to record the unrecorded expense in the proper period

**req-credit-payable:** Credit to record accrued liability
Type: journal_credit | Points: 1
Expected: {"type":"journal","accountId":"acc-accrued-liabilities","accountName":"Accrued Liabilities","amount":45000,"tolerance":0}
Explanation: Credit Accrued Liabilities (or Accounts Payable) to record the unrecorded liability

### Journal Accounts Available (6)
- Legal Expense (expense, normal debit)
- Accrued Liabilities (liability, normal credit)
- Accounts Payable (liability, normal credit) [distractor]
- Prepaid Legal (asset, normal debit) [distractor]
- Professional Fees Expense (expense, normal debit) [distractor]
- Retained Earnings (equity, normal credit) [distractor]


---

## tbs-aud-049
**Section:** AUD | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Substantive Procedures - Substantive Analytical Procedures
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Substantive Analytical Procedures

### Scenario
You are performing substantive analytical procedures on payroll expense for ValueMart Retail Stores. The company has 45 stores with consistent staffing models.

Available Data:
• Prior year payroll expense: $42,500,000
• Current year recorded payroll: $47,200,000
• Average hourly wage increase: 4%
• Store count: Increased from 42 to 45 (3 new stores opened mid-year)
• Average employees per store: 28 (unchanged)
• Average hours worked per employee: 1,850 annually

Auditor's Analysis:
• Expected wage increase impact: 4% × $42,500,000 = $1,700,000
• Expected new store impact: 3 stores × 0.5 year × 28 employees × 1,850 hours × $24/hour = $1,869,000

Required: Calculate the expected payroll and evaluate the recorded amount.

### Exhibits (1)

#### Payroll Analysis (table)
Table: Payroll Data Summary
Headers: Metric | Prior Year | Current Year
Rows: 5 rows
  Number of stores | 42 | 45
  Employees per store | 28 | 28
  Average hourly wage | $23.08 | $24.00
  ... (2 more rows)

### Requirements (6)

**req-base-expectation:** Expected payroll for existing 42 stores (with wage increase)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":44200000,"tolerance":100000}
Explanation: $42,500,000 × 1.04 = $44,200,000

**req-new-store-payroll:** Expected payroll for 3 new stores (half year)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1869000,"tolerance":50000}
Explanation: 3 × 0.5 × 28 × 1,850 × $24 = $1,869,000

**req-total-expected:** Total expected payroll expense
Type: numeric | Points: 1
Expected: {"type":"numeric","value":46069000,"tolerance":100000}
Explanation: $44,200,000 + $1,869,000 = $46,069,000

**req-difference:** Difference (recorded minus expected)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1131000,"tolerance":100000}
Explanation: $47,200,000 - $46,069,000 = $1,131,000

**req-threshold-eval:** If materiality is $500,000, is the difference significant?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-exceed-mat"}
Explanation: Difference of $1,131,000 exceeds materiality of $500,000

**req-next-step:** Appropriate next step given the difference
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-investigate"}
Explanation: Must investigate unexpected difference exceeding threshold


---

## tbs-aud-097
**Section:** AUD | **Type:** reconciliation | **Difficulty:** medium
**Topic:** Substantive Procedures - Cash Testing
**Time Estimate:** 15 min | **Max Points:** 6

### Title
Bank Reconciliation Audit

### Scenario
During your audit of Cascade Industries Inc. for the year ended December 31, Year 1, you are testing the client's bank reconciliation. You obtained the December 31 bank statement and the general ledger cash balance. Your testing identified several items that require adjustment.

Required: Complete the bank reconciliation and determine the correct cash balance.

### Exhibits (3)

#### Bank Statement Summary (bank_statement)

#### General Ledger Cash Balance (table)
Table: Cash Account - December 31, Year 1
Headers: Description | Amount
Rows: 1 rows
  Balance per Books | $298,750

#### Reconciling Items Identified (table)
Table: Items Identified During Testing
Headers: Item | Description | Amount
Rows: 6 rows
  1 | Deposits in transit | $24,500
  2 | Outstanding checks | $38,200
  3 | Bank service charge (not recorded) | $450
  ... (3 more rows)

### Requirements (6)

**req-adjusted-bank:** Adjusted bank balance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":298750,"tolerance":0}
Explanation: Bank balance $312,450 + Deposits in transit $24,500 - Outstanding checks $38,200 = $298,750

**req-book-adjustments:** Total book adjustments (decrease to books)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3910,"tolerance":0}
Explanation: Service charge ($450) + NSF check ($3,800) - Interest ($250) - Error correction ($90) = $3,910 net decrease

**req-adjusted-books:** Adjusted book balance
Type: numeric | Points: 1
Expected: {"type":"numeric","value":294840,"tolerance":0}
Explanation: Books $298,750 - Net adjustments $3,910 = $294,840. But wait - bank side should equal book side. Let me recalculate: Bank $312,450 + DIT $24,500 - OS $38,200 = $298,750

**req-service-charge-debit:** Bank service charge adjustment affects
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-decrease-cash"}
Explanation: Bank service charges decrease the book balance (debit expense, credit cash)

**req-nsf-treatment:** NSF check requires what book entry?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-dr-ar-cr-cash"}
Explanation: NSF checks require reinstating the receivable and reducing cash

**req-dit-side:** Deposits in transit are adjusted on which side?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-bank-add"}
Explanation: Deposits in transit are added to the bank balance - they're recorded in books but not yet on bank statement


---

## tbs-bar-077
**Section:** BAR | **Type:** dropdown | **Difficulty:** medium
**Topic:** Data Analytics - Data Analysis Techniques
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Data Analytics in Business Decision-Making

### Scenario
Sterling Retail Corp is implementing data analytics to improve business decisions. As a consultant, evaluate the appropriate analytics techniques for each business situation.

Required: Match each scenario with the most appropriate analytics approach.

### Exhibits (1)

#### Analytics Types Reference (text)
Descriptive Analytics: What happened? (historical data summary)
Diagnostic Analytics: Why did it happen? (root cause analysis)...

### Requirements (6)

**req-sales-forecast:** Forecasting next quarter sales based on historical patterns
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-predictive"}
Explanation: Forecasting uses predictive analytics to project future outcomes

**req-revenue-decline:** Understanding why revenue declined in a specific region
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-diagnostic"}
Explanation: Diagnostic analytics identifies root causes of observed outcomes

**req-kpi-dashboard:** Creating a dashboard showing current KPI performance vs targets
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-descriptive"}
Explanation: Dashboards showing current performance summarize what has happened

**req-inventory-opt:** Determining optimal inventory levels for each product SKU
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-prescriptive"}
Explanation: Optimization problems require prescriptive analytics to determine best actions

**req-churn-predict:** Identifying customers likely to cancel their subscriptions
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-predictive"}
Explanation: Predicting future customer behavior is predictive analytics

**req-pricing:** Recommending price points to maximize profit margins
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-prescriptive"}
Explanation: Pricing optimization recommends specific actions, making it prescriptive


---

## tbs-bar-005
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Capital Budgeting - Investment Analysis
**Time Estimate:** 16 min | **Max Points:** 7

### Title
Capital Investment Analysis

### Scenario
Evaluate a proposed capital investment using multiple capital budgeting techniques.

### Exhibits (2)

#### Project Information (table)
Table: Equipment Purchase Proposal
Headers: Item | Amount
Rows: 7 rows
  Initial investment | $500,000
  Annual cash inflows (Years 1-5) | $150,000
  Salvage value (Year 5) | $50,000
  ... (4 more rows)

#### Present Value Factors (table)
Table: Present Value Tables (12%)
Headers: Year | PV Factor (12%) | PV Annuity Factor (12%)
Rows: 5 rows
  1 | 0.8929 | 0.8929
  2 | 0.7972 | 1.6901
  3 | 0.7118 | 2.4018
  ... (2 more rows)

### Requirements (7)

**req-annual-depreciation:** Annual depreciation expense
Type: numeric | Points: 1
Expected: {"type":"numeric","value":90000,"tolerance":0}
Explanation: ($500,000 - $50,000) / 5 = $90,000

**req-annual-tax-savings:** Annual depreciation tax shield
Type: numeric | Points: 1
Expected: {"type":"numeric","value":22500,"tolerance":0}
Explanation: $90,000 × 25% = $22,500

**req-after-tax-cash-flow:** Annual after-tax operating cash flow
Type: numeric | Points: 1
Expected: {"type":"numeric","value":135000,"tolerance":1000}
Explanation: $150,000 × (1 - 25%) + $22,500 = $112,500 + $22,500 = $135,000

**req-pv-cash-flows:** PV of annual operating cash flows
Type: numeric | Points: 1
Expected: {"type":"numeric","value":486648,"tolerance":1000}
Explanation: $135,000 × 3.6048 = $486,648

**req-pv-salvage:** PV of salvage value
Type: numeric | Points: 1
Expected: {"type":"numeric","value":28370,"tolerance":500}
Explanation: $50,000 × 0.5674 = $28,370

**req-npv:** Net Present Value (NPV)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":15018,"tolerance":1000}
Explanation: $486,648 + $28,370 - $500,000 = $15,018

**req-payback:** Simple payback period (years)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3.7,"tolerance":0.2}
Explanation: $500,000 / $135,000 = 3.7 years


---

## tbs-bar-054
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Quality Management - Cost of Quality
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Cost of Quality Categories Analysis

### Scenario
A manufacturing company wants to analyze its quality costs to identify improvement opportunities.

Required: Categorize and analyze quality costs.

### Exhibits (1)

#### Quality Costs (table)
Table: Annual Quality-Related Costs
Headers: Cost Item | Amount
Rows: 10 rows
  Quality training | $45,000
  Inspection of incoming materials | $30,000
  Rework costs | $85,000
  ... (7 more rows)

### Requirements (6)

**req-prevention:** Total prevention costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":95000,"tolerance":0}
Explanation: Training $45,000 + Planning $50,000 = $95,000

**req-appraisal:** Total appraisal costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":130000,"tolerance":0}
Explanation: Inspection $30,000 + Testing $55,000 + Audits $25,000 + Calibration $20,000 = $130,000

**req-internal-failure:** Total internal failure costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":125000,"tolerance":0}
Explanation: Rework $85,000 + Scrap $40,000 = $125,000

**req-external-failure:** Total external failure costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":155000,"tolerance":0}
Explanation: Warranty $120,000 + Returns $35,000 = $155,000

**req-total-coq:** Total cost of quality
Type: numeric | Points: 1
Expected: {"type":"numeric","value":505000,"tolerance":0}
Explanation: $95,000 + $130,000 + $125,000 + $155,000 = $505,000

**req-improvement:** Best area to focus improvement efforts?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-prevention"}
Explanation: Increasing prevention costs typically reduces failure costs


---

## tbs-bar-004
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Budgeting - Flexible Budgets
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Flexible Budget Performance Report

### Scenario
Prepare a flexible budget and analyze variances for GHI Company's production department.

### Exhibits (2)

#### Budget Information (table)
Table: Static Budget (10,000 units)
Headers: Cost Item | Behavior | Budgeted Amount
Rows: 5 rows
  Direct Materials | Variable | $150,000
  Direct Labor | Variable | $200,000
  Variable Overhead | Variable | $50,000
  ... (2 more rows)

#### Actual Results (table)
Table: Actual Results (11,000 units produced)
Headers: Cost Item | Actual Amount
Rows: 5 rows
  Direct Materials | $170,000
  Direct Labor | $225,000
  Variable Overhead | $58,000
  ... (2 more rows)

### Requirements (6)

**req-dm-per-unit:** Direct materials cost per unit (budget)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":15,"tolerance":0}
Explanation: $150,000 / 10,000 = $15 per unit

**req-flexible-dm:** Flexible budget direct materials (11,000 units)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":165000,"tolerance":0}
Explanation: 11,000 × $15 = $165,000

**req-flexible-total-var:** Flexible budget total variable costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":440000,"tolerance":0}
Explanation: Variable: ($15 + $20 + $5) × 11,000 = $440,000

**req-flexible-total:** Flexible budget total costs
Type: numeric | Points: 1
Expected: {"type":"numeric","value":540000,"tolerance":0}
Explanation: $440,000 variable + $100,000 fixed = $540,000

**req-flexible-variance:** Total flexible budget variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":18000,"tolerance":0}
Explanation: $558,000 actual - $540,000 flexible = $18,000 Unfavorable

**req-volume-variance:** Sales volume variance (absolute value)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":40000,"tolerance":0}
Explanation: $540,000 flexible - $500,000 static = $40,000 Unfavorable (costs increased)


---

## tbs-bar-011
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Performance Evaluation - ROI and Residual Income
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Investment Center Performance

### Scenario
Evaluate the performance of two investment centers using ROI and residual income metrics.

### Exhibits (2)

#### Division Information (table)
Table: Division Performance Data
Headers: Item | Division X | Division Y
Rows: 3 rows
  Operating income | $180,000 | $240,000
  Average operating assets | $1,000,000 | $2,000,000
  Sales | $1,500,000 | $3,000,000

#### Company Information (text)
Minimum required rate of return: 10%
Cost of capital: 10%...

### Requirements (6)

**req-roi-x:** Division X ROI (percentage)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":18,"tolerance":0.5}
Explanation: $180,000 / $1,000,000 = 18%

**req-roi-y:** Division Y ROI (percentage)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":12,"tolerance":0.5}
Explanation: $240,000 / $2,000,000 = 12%

**req-ri-x:** Division X Residual Income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":80000,"tolerance":0}
Explanation: $180,000 - ($1,000,000 × 10%) = $80,000

**req-ri-y:** Division Y Residual Income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":40000,"tolerance":0}
Explanation: $240,000 - ($2,000,000 × 10%) = $40,000

**req-margin-x:** Division X Profit Margin (percentage)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":12,"tolerance":0.5}
Explanation: $180,000 / $1,500,000 = 12%

**req-turnover-x:** Division X Asset Turnover (times)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":1.5,"tolerance":0.05}
Explanation: $1,500,000 / $1,000,000 = 1.5 times


---

## tbs-bar-051
**Section:** BAR | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Cost Management - Operating Leverage
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Operating Leverage and Risk Analysis

### Scenario
Two companies in the same industry have different cost structures. Analyze the impact of operating leverage on profitability and risk.

Required: Calculate operating leverage and evaluate profit sensitivity.

### Exhibits (1)

#### Company Comparison (table)
Table: Cost Structure Analysis
Headers: Item | Company A | Company B
Rows: 4 rows
  Sales revenue | $1,000,000 | $1,000,000
  Variable costs | $600,000 | $300,000
  Fixed costs | $200,000 | $500,000
  ... (1 more rows)

### Requirements (6)

**req-cm-a:** Company A contribution margin
Type: numeric | Points: 1
Expected: {"type":"numeric","value":400000,"tolerance":0}
Explanation: $1,000,000 - $600,000 = $400,000

**req-cm-b:** Company B contribution margin
Type: numeric | Points: 1
Expected: {"type":"numeric","value":700000,"tolerance":0}
Explanation: $1,000,000 - $300,000 = $700,000

**req-dol-a:** Company A degree of operating leverage
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2,"tolerance":0.1}
Explanation: $400,000 / $200,000 = 2.0

**req-dol-b:** Company B degree of operating leverage
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3.5,"tolerance":0.1}
Explanation: $700,000 / $200,000 = 3.5

**req-impact-b:** Company B profit increase if sales rise 10% (%)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":35,"tolerance":0}
Explanation: 10% × 3.5 DOL = 35% profit increase

**req-risk:** Which company has higher operating risk?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-b"}
Explanation: Company B has higher DOL, meaning higher operating risk


---

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

## tbs-far-082
**Section:** FAR | **Type:** research | **Difficulty:** medium
**Topic:** Leases - Classification Criteria
**Time Estimate:** 8 min | **Max Points:** 4

### Title
Research: Lease Classification Criteria

### Scenario
Using the FASB Accounting Standards Codification, identify the authoritative guidance for lease classification criteria for lessees.

### Exhibits (1)

#### Research Scenario (text)
Your supervisor has asked you to locate the specific ASC paragraph that describes when a lessee should classify a lease as a finance lease versus an operating lease.
Identify the criteria used to determine if a lease transfers substantially all risks and rewards of ownership....

### Requirements (3)

**req-topic-code:** Which ASC Topic addresses lease accounting?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-842"}
Explanation: ASC 842 is the current authoritative guidance for lease accounting

**req-subtopic:** Which subtopic covers lessee classification?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-842-20"}
Explanation: ASC 842-20 specifically addresses lessee accounting

**req-classification-section:** Enter the full ASC citation for finance lease classification criteria
Type: citation | Points: 2
Expected: {"type":"citation","source":"FASB","topicCode":"ASC 842-20-25-2","alternativeCitations":[{"source":"FASB","topicCode":"842-20-25-2"},{"source":"FASB","topicCode":"ASC 842-20-25"}]}
Explanation: ASC 842-20-25-2 lists the five criteria for finance lease classification


---

## tbs-isc-064
**Section:** ISC | **Type:** document_review | **Difficulty:** hard
**Topic:** Security Testing - Penetration Testing
**Time Estimate:** 18 min | **Max Points:** 10

### Title
Penetration Test Findings Analysis

### Scenario
The organization recently completed an annual penetration test. As part of the IT audit, you are reviewing the findings to assess the security posture and evaluate management's remediation plans.

### Exhibits (1)

#### Penetration Test Findings Summary (table)
Table: Penetration Test Findings Summary
Headers: Finding ID | Vulnerability | CVSS Score | Exploited | Remediation Status
Rows: 6 rows
  PT-001 | Default admin credentials on network device | 9.8 | Yes | In Progress
  PT-002 | Unpatched Apache Struts (RCE) | 9.0 | Yes | Remediated
  PT-003 | SQL injection in web application | 8.5 | Yes | Not Started
  ... (3 more rows)

### Requirements (5)

**req1:** How many critical/high severity findings (CVSS >= 7.0)?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":4,"tolerance":0}
Explanation: PT-001 (9.8), PT-002 (9.0), PT-003 (8.5), PT-006 (7.5) = 4 findings with CVSS >= 7.0

**req2:** What percentage of findings were successfully exploited?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":66.7,"tolerance":1}
Explanation: Exploited = 4 out of 6 = 66.7%

**req3:** Which unremediated finding presents the highest risk?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt2"}
Explanation: PT-003 has high CVSS (8.5), was exploited, and remediation hasn't started, making it highest risk among unremediated items.

**req4:** How many findings have remediation not yet started?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":2,"tolerance":0}
Explanation: PT-003 and PT-005 have 'Not Started' status = 2 findings

**req5:** What is the appropriate audit response to the unremediated SQL injection?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt1"}
Explanation: SQL injection with CVSS 8.5 that was exploited requires immediate remediation action and should be escalated.


---

## tbs-isc-019
**Section:** ISC | **Type:** dropdown | **Difficulty:** hard
**Topic:** Application Controls - Security Testing
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Application Security Assessment

### Scenario
Evaluate application security testing results and prioritize remediation.

### Exhibits (1)

#### Vulnerability Scan Results (table)
Table: Web Application Security Scan
Headers: Vulnerability | Severity | CVSS | Count
Rows: 5 rows
  SQL Injection | Critical | 9.8 | 3
  Cross-Site Scripting (XSS) | High | 7.5 | 12
  Insecure Direct Object Reference | High | 7.1 | 5
  ... (2 more rows)

### Requirements (4)

**req-priority:** Highest remediation priority?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"sql-injection"}
Explanation: SQL injection has highest CVSS and can lead to data breach

**req-sql-risk:** Primary risk of SQL injection?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"data-breach"}
Explanation: SQL injection allows attackers to query/modify database

**req-xss-control:** Primary control for XSS prevention?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"output-encoding"}
Explanation: Proper encoding prevents script injection; WAF is compensating

**req-info-disclosure:** Appropriate handling of low severity findings?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"schedule"}
Explanation: Low severity items should be tracked and remediated in normal cycle


---

## tbs-isc-037
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** Endpoint Security - EDR Solutions
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Endpoint Detection and Response

### Scenario
Evaluate EDR implementation and alert investigation.

### Exhibits (1)

#### EDR Alert (text)
Alert Type: Suspicious PowerShell Activity
Host: FINANCE-WS-042 (Finance department workstation)...

### Requirements (4)

**req-severity:** Alert severity assessment?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"critical"}
Explanation: Off-hours activity, encoded commands, and C2 connection indicate compromise

**req-c2-indicator:** C2 connection attempt indicates?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"malware"}
Explanation: C2 (command and control) communication indicates active threat

**req-immediate-action:** Recommended immediate action?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"isolate"}
Explanation: Isolation prevents lateral movement while investigation proceeds

**req-evidence:** Critical evidence to preserve?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"memory-image"}
Explanation: Memory contains volatile evidence of malware and attacker activity


---

## tbs-isc-001
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** IT General Controls - Access Controls
**Time Estimate:** 12 min | **Max Points:** 6

### Title
IT Access Control Evaluation

### Scenario
Evaluate the effectiveness of IT access controls at ABC Corporation and identify control deficiencies.

### Exhibits (2)

#### Access Control Policies (text)
1. User accounts are created by IT upon receipt of email request from department manager
2. Passwords must be at least 6 characters with no complexity requirements...

#### Industry Best Practices (text)
Password length: Minimum 8-12 characters
Password complexity: Uppercase, lowercase, numbers, symbols...

### Requirements (6)

**req-password-length:** Is the password length policy adequate?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-inadequate-length"}
Explanation: 6 characters is below the 8-12 character minimum recommended

**req-termination-process:** Is the termination access removal process adequate?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-inadequate-term"}
Explanation: 5 business days is too long; same-day disablement is best practice

**req-shared-admin:** What is the risk of shared administrative accounts?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-accountability"}
Explanation: Shared accounts eliminate individual accountability for actions

**req-mfa-risk:** Primary risk of VPN without MFA?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-credential-theft"}
Explanation: Stolen credentials provide full remote access without additional verification

**req-manual-logging:** Main weakness of manual activity logging?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-manipulation"}
Explanation: Manual logs can be altered or omitted; automated logging ensures integrity

**req-review-frequency:** Recommended access review frequency for privileged users?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-quarterly"}
Explanation: Privileged access should be reviewed quarterly, not annually


---

## tbs-isc-046
**Section:** ISC | **Type:** dropdown | **Difficulty:** hard
**Topic:** Access Controls - Privileged Access
**Time Estimate:** 13 min | **Max Points:** 6

### Title
Privileged Access Management Review

### Scenario
Evaluate the effectiveness of a company's privileged access management (PAM) program.

### Exhibits (2)

#### PAM Configuration (table)
Table: PAM Settings Comparison
Headers: Setting | Configuration | Best Practice
Rows: 6 rows
  Password vault | Centralized, encrypted | Centralized, encrypted
  Session recording | Enabled for production | All privileged sessions
  Password rotation | Every 90 days | After each use
  ... (3 more rows)

#### Recent Privileged Access Incidents (text)
Incident 1: Database admin used cached credentials 3 months after termination
Incident 2: Service account compromise led to lateral movement...

### Requirements (3)

**req-password-rotation:** Password rotation adequacy?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"inadequate"}
Explanation: 90-day rotation allowed terminated admin to retain access

**req-service-account:** Service account control deficiency?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"significant"}
Explanation: Static service account passwords enabled lateral movement attack

**req-breakglass:** Break-glass control gap?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"detection"}
Explanation: 48-hour detection delay indicates alert monitoring failure


---

## tbs-isc-040
**Section:** ISC | **Type:** dropdown | **Difficulty:** medium
**Topic:** SOC Engagements - Trust Services Criteria
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Trust Services Criteria Selection

### Scenario
Evaluate appropriate trust services criteria for SOC 2 engagement.

### Exhibits (1)

#### Service Description (text)
Service: Cloud-based analytics for patient outcomes
Data: Protected Health Information (PHI)...

### Requirements (4)

**req-security:** Is Security criteria required?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"required"}
Explanation: Security (Common Criteria) is mandatory for all SOC 2 engagements

**req-availability:** Should Availability be included?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"yes"}
Explanation: 99.9% SLA commitment makes Availability criteria essential

**req-confidentiality:** Should Confidentiality be included?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"yes"}
Explanation: PHI confidentiality requirements warrant inclusion

**req-privacy:** Should Privacy criteria be included?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"yes"}
Explanation: PHI processing involves personal information requiring Privacy criteria


---

## tbs-isc-060
**Section:** ISC | **Type:** numeric_entry | **Difficulty:** easy
**Topic:** IT General Controls - Change Management
**Time Estimate:** 14 min | **Max Points:** 10

### Title
Change Management Compliance Metrics

### Scenario
You are assessing the organization's IT change management process as part of the ITGC audit. The change management team has provided metrics on their change requests for the quarter. Analyze the data to evaluate process compliance and effectiveness.

### Exhibits (1)

#### Q4 Change Management Metrics (table)
Table: Q4 Change Management Metrics
Headers: Metric | Standard Changes | Normal Changes | Emergency Changes
Rows: 6 rows
  Total changes requested | 245 | 180 | 35
  Changes approved | 240 | 165 | 32
  Changes with proper documentation | 238 | 155 | 18
  ... (3 more rows)

### Requirements (5)

**req1:** Total number of changes requested in Q4
Type: numeric | Points: 2
Expected: {"type":"numeric","value":460,"tolerance":0}
Explanation: Total = 245 + 180 + 35 = 460 changes

**req2:** Overall change approval rate (as percentage)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":95,"tolerance":0.5}
Explanation: Approval rate = (240 + 165 + 32) / (245 + 180 + 35) = 437 / 460 = 95%

**req3:** Percentage of emergency changes with proper documentation
Type: numeric | Points: 2
Expected: {"type":"numeric","value":51.4,"tolerance":1}
Explanation: Emergency documentation rate = 18 / 35 = 51.4%

**req4:** Total number of failed changes across all categories
Type: numeric | Points: 2
Expected: {"type":"numeric","value":25,"tolerance":0}
Explanation: Failed changes = 5 + 12 + 8 = 25

**req5:** Which change category shows the weakest compliance with change management controls?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt3"}
Explanation: Emergency changes show lowest documentation (51%), testing (34%), post-implementation review (23%), and highest failure rate (23%).


---

## tbs-isc-072
**Section:** ISC | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Identity and Access Management - Privileged Access Management
**Time Estimate:** 15 min | **Max Points:** 10

### Title
Privileged Account Analysis

### Scenario
You are auditing the organization's privileged account management. The IT security team has provided data on privileged accounts and their usage patterns. Analyze the data to identify potential risks and compliance issues.

### Exhibits (1)

#### Privileged Account Inventory (table)
Table: Privileged Account Inventory
Headers: Account Type | Count | Shared | MFA Enabled | Last Password Change | PAM Managed
Rows: 5 rows
  Domain Admin | 12 | No | Yes | 45 days ago | Yes
  Local Admin | 85 | Yes | No | 180 days ago | No
  Database Admin | 8 | No | Yes | 30 days ago | Yes
  ... (2 more rows)

### Requirements (5)

**req1:** Total number of privileged accounts in the inventory
Type: numeric | Points: 2
Expected: {"type":"numeric","value":265,"tolerance":0}
Explanation: Total = 12 + 85 + 8 + 156 + 4 = 265 accounts

**req2:** How many accounts are not managed by PAM?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":245,"tolerance":0}
Explanation: Not PAM managed = Local Admin (85) + Service Accounts (156) + Root (4) = 245

**req3:** Which account type poses the highest security risk?
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt1"}
Explanation: Service accounts have the highest risk: 156 accounts with passwords unchanged for over a year, not managed by PAM.

**req4:** How many shared privileged accounts exist?
Type: numeric | Points: 2
Expected: {"type":"numeric","value":89,"tolerance":0}
Explanation: Shared accounts = Local Admin (85) + Root (4) = 89 accounts

**req5:** Percentage of privileged accounts managed by PAM
Type: numeric | Points: 2
Expected: {"type":"numeric","value":7.5,"tolerance":0.5}
Explanation: PAM managed = 12 + 8 = 20. Percentage = 20/265 × 100 = 7.5%


---

## tbs-reg-074
**Section:** REG | **Type:** dropdown | **Difficulty:** medium
**Topic:** Alternative Minimum Tax - AMT Preferences and Adjustments
**Time Estimate:** 10 min | **Max Points:** 6

### Title
AMT Preference Items Identification

### Scenario
You are reviewing a client's tax return to identify items that may trigger AMT liability. Determine whether each item is an AMT preference, adjustment, or neither.

Required: Classify each item for AMT purposes.

### Exhibits (1)

#### Tax Items to Evaluate (table)
Table: Client's Tax Items
Headers: Item | Regular Tax Treatment
Rows: 6 rows
  State income taxes paid | $18,500 itemized deduction
  Depreciation - residential rental (MACRS) | Accelerated depreciation
  Private activity bond interest | $12,000 excluded from income
  ... (3 more rows)

### Requirements (6)

**req-state-tax:** State income taxes: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-state-adjust"}
Explanation: State income taxes are added back for AMT (adjustment item)

**req-depr:** MACRS depreciation on residential rental: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-depr-adjust"}
Explanation: MACRS vs ADS depreciation difference is an adjustment (post-1986 property)

**req-pab:** Private activity bond interest: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-pab-pref"}
Explanation: Private activity bond interest is a tax preference item for AMT

**req-iso:** Incentive stock option exercise spread: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-iso-adjust"}
Explanation: ISO exercise spread is an AMT adjustment (recognized for AMT, not regular tax)

**req-standard:** Standard deduction: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-std-adjust"}
Explanation: Standard deduction not allowed for AMT - adjustment to add back

**req-medical:** Medical expenses above floor: AMT treatment
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-med-neither"}
Explanation: Medical expenses allowed for both regular tax and AMT (same floor)


---

## tbs-reg-057
**Section:** REG | **Type:** dropdown | **Difficulty:** medium
**Topic:** Federal Tax Procedures - Innocent Spouse Relief
**Time Estimate:** 12 min | **Max Points:** 5

### Title
Innocent Spouse Relief Eligibility

### Scenario
Three clients are seeking relief from joint and several liability on joint returns filed with their former spouses. Analyze each situation to determine eligibility for innocent spouse relief.

### Exhibits (2)

#### Client Situations (table)
Table: Innocent Spouse Scenarios
Headers: Client | Facts
Rows: 3 rows
  Maria | Husband failed to report $80,000 of business income. Maria had no involvement in the business, no reason to know, and would suffer economic hardship if held liable.
  Jennifer | Husband claimed fraudulent charitable deductions of $25,000. Jennifer signed the return but didn't review it. She had knowledge husband was dishonest about finances.
  Susan | Husband underreported stock sale gains by $50,000. The proceeds were used to buy a vacation home titled jointly. Susan knew about the stock sale.

#### Relief Options (text)
IRC 6015(b) - Innocent Spouse Relief: Requires understatement due to erroneous items of other spouse, no knowledge or reason to know, and inequitable to hold liable.
IRC 6015(c) - Separation of Liability: Available if divorced, legally separated, or living apart 12+ months. Allocates deficiency between spouses....

### Requirements (3)

**req-maria-eligible:** Maria - Most likely relief type
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-innocent-spouse"}
Explanation: Maria meets all requirements for IRC 6015(b): no knowledge, no reason to know, inequitable

**req-jennifer-eligible:** Jennifer - Most likely outcome
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-equitable-j"}
Explanation: Knowledge of spouse's dishonesty may impute 'reason to know' - equitable relief is best option

**req-susan-eligible:** Susan - Most likely outcome
Type: dropdown | Points: 2
Expected: {"type":"dropdown","correctOptionId":"opt-none-s"}
Explanation: Susan had knowledge and benefited significantly from understatement - relief unlikely


---

## tbs-reg-053
**Section:** REG | **Type:** dropdown | **Difficulty:** medium
**Topic:** Federal Tax Procedures - Statute of Limitations
**Time Estimate:** 10 min | **Max Points:** 5

### Title
Tax Assessment Statute of Limitations

### Scenario
Several clients have questions about how long the IRS has to assess additional taxes. Determine the applicable statute of limitations period for each scenario.

### Exhibits (1)

#### Client Scenarios (table)
Table: Statute of Limitations Scenarios
Headers: Client | Situation
Rows: 5 rows
  Client A | Filed accurate return on April 15, Year 1. Normal income and deductions.
  Client B | Omitted $75,000 of gross income (reported $200,000). Filed on time.
  Client C | Filed fraudulent return with fabricated deductions. Filed on time.
  ... (2 more rows)

### Requirements (5)

**req-client-a:** Client A - Assessment period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-3-years"}
Explanation: Normal statute of limitations is 3 years from filing date

**req-client-b:** Client B - Assessment period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-6-years-b"}
Explanation: 6-year period applies when >25% of gross income omitted ($75K/$200K = 37.5%)

**req-client-c:** Client C - Assessment period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-unlimited-c"}
Explanation: No statute of limitations for fraud

**req-client-d:** Client D - Assessment period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-unlimited-d"}
Explanation: No statute of limitations when no return filed

**req-client-e:** Client E - Assessment period
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-3-years-e"}
Explanation: 3 years - overstatement of basis doesn't trigger 6-year period unless >25% of gross income omitted


---

## tbs-reg-087
**Section:** REG | **Type:** journal_entry | **Difficulty:** hard
**Topic:** Partnership Taxation - Partner Basis Adjustments
**Time Estimate:** 14 min | **Max Points:** 5

### Title
Partner Basis Adjustment Journal Entry

### Scenario
Partner A has a 30% interest in ABC Partnership. At the beginning of Year 1, Partner A's outside basis was $150,000. During Year 1, the following occurred:

• Partnership ordinary income: $200,000
• Partnership tax-exempt interest: $10,000
• Partnership charitable contributions: $15,000
• Cash distributions to Partner A: $45,000
• Partner A's share of partnership liabilities increased by $30,000

Required: Determine Partner A's ending outside basis and prepare the adjustments.

### Exhibits (1)

#### Partnership Information (table)
Table: ABC Partnership - Year 1 Activity
Headers: Item | Partnership Total | Partner A Share (30%)
Rows: 5 rows
  Ordinary Income | $200,000 | $60,000
  Tax-Exempt Interest | $10,000 | $3,000
  Charitable Contributions | $15,000 | $4,500
  ... (2 more rows)

### Requirements (5)

**req-income-increase:** Increase in basis from ordinary income (Partner A's share)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":60000,"tolerance":0}
Explanation: $200,000 × 30% = $60,000 - ordinary income increases basis

**req-exempt-increase:** Increase in basis from tax-exempt income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":3000,"tolerance":0}
Explanation: $10,000 × 30% = $3,000 - tax-exempt income also increases basis

**req-charitable-decrease:** Decrease in basis from charitable contributions
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4500,"tolerance":0}
Explanation: $15,000 × 30% = $4,500 - separately stated deductions decrease basis

**req-distribution-decrease:** Decrease in basis from cash distribution
Type: numeric | Points: 1
Expected: {"type":"numeric","value":45000,"tolerance":0}
Explanation: Cash distributions reduce basis dollar for dollar

**req-ending-basis:** Partner A's ending outside basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":193500,"tolerance":0}
Explanation: $150,000 + $60,000 + $3,000 + $30,000 - $4,500 - $45,000 = $193,500


---

## tbs-reg-039
**Section:** REG | **Type:** numeric_entry | **Difficulty:** medium
**Topic:** Individual Taxation - Tax Credits
**Time Estimate:** 12 min | **Max Points:** 6

### Title
Education and Child Tax Credits

### Scenario
Calculate the allowable education and child tax credits for a family with qualifying dependents.

### Exhibits (3)

#### Family Information (table)
Table: Taxpayer Information - MFJ
Headers: Item | Amount/Detail
Rows: 5 rows
  Modified AGI | $180,000
  Child 1 | Age 8, lives with taxpayers full year
  Child 2 | Age 14, lives with taxpayers full year
  ... (2 more rows)

#### Education Expenses (table)
Table: Child 3 - College Expenses
Headers: Expense | Amount
Rows: 4 rows
  Tuition and fees | $15,000
  Required books | $1,200
  Room and board | $12,000
  ... (1 more rows)

#### Credit Information (text)
Child Tax Credit: $2,000 per qualifying child under 17; phase-out starts at $400,000 MFJ
American Opportunity Credit: 100% of first $2,000 + 25% of next $2,000 = max $2,500...

### Requirements (6)

**req-ctc-children:** Number of children qualifying for CTC
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2,"tolerance":0}
Explanation: Children under 17: Child 1 (age 8) and Child 2 (age 14). Child 3 is 19.

**req-ctc-amount:** Child Tax Credit amount
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4000,"tolerance":0}
Explanation: 2 children × $2,000 = $4,000 (no phase-out, under $400,000 threshold)

**req-aoc-qualified-expenses:** Qualified expenses for AOC (after scholarship)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":11200,"tolerance":0}
Explanation: $15,000 + $1,200 - $5,000 = $11,200 (room/board not qualified)

**req-aoc-before-phaseout:** AOC before phase-out
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2500,"tolerance":0}
Explanation: 100% × $2,000 + 25% × $2,000 = $2,500 max (expenses exceed $4,000)

**req-aoc-after-phaseout:** AOC after phase-out
Type: numeric | Points: 1
Expected: {"type":"numeric","value":0,"tolerance":0}
Explanation: At MAGI of $180,000, AOC is fully phased out for MFJ

**req-total-credits:** Total tax credits allowed
Type: numeric | Points: 1
Expected: {"type":"numeric","value":4000,"tolerance":0}
Explanation: CTC $4,000 + AOC $0 = $4,000


---

## tbs-reg-054
**Section:** REG | **Type:** numeric_entry | **Difficulty:** hard
**Topic:** Individual Taxation - Foreign Tax Credit
**Time Estimate:** 14 min | **Max Points:** 6

### Title
Foreign Tax Credit Limitation Calculation

### Scenario
James Wilson has foreign source income from multiple countries and paid foreign taxes. Calculate the foreign tax credit limitation and determine the allowable credit.

### Exhibits (3)

#### Income Information (table)
Table: Income Summary - Current Year
Headers: Source | Gross Income | Deductions | Net Income
Rows: 5 rows
  U.S. source | $180,000 | $25,000 | $155,000
  Country A (general) | $45,000 | $5,000 | $40,000
  Country B (general) | $30,000 | $3,000 | $27,000
  ... (2 more rows)

#### Foreign Taxes Paid (table)
Table: Foreign Income Taxes
Headers: Country | Category | Tax Paid
Rows: 3 rows
  Country A | General | $12,000
  Country B | General | $5,400
  Country C | Passive | $3,900

#### U.S. Tax Liability (table)
Table: Pre-Credit U.S. Tax
Headers: Item | Amount
Rows: 2 rows
  U.S. tax liability (before FTC) | $52,000
  Filing status | Single

### Requirements (5)

**req-foreign-source:** Total foreign source taxable income
Type: numeric | Points: 1
Expected: {"type":"numeric","value":80000,"tolerance":0}
Explanation: $40,000 + $27,000 + $13,000 = $80,000

**req-general-limitation:** FTC limitation - general category
Type: numeric | Points: 2
Expected: {"type":"numeric","value":14851,"tolerance":50}
Explanation: ($40,000 + $27,000) / $235,000 × $52,000 = $14,851

**req-passive-limitation:** FTC limitation - passive category
Type: numeric | Points: 1
Expected: {"type":"numeric","value":2877,"tolerance":50}
Explanation: $13,000 / $235,000 × $52,000 = $2,877

**req-general-credit:** Allowable FTC - general category
Type: numeric | Points: 1
Expected: {"type":"numeric","value":14851,"tolerance":50}
Explanation: Lesser of tax paid ($17,400) or limitation ($14,851) = $14,851

**req-total-credit:** Total foreign tax credit allowed
Type: numeric | Points: 1
Expected: {"type":"numeric","value":17728,"tolerance":100}
Explanation: $14,851 (general) + $2,877 (passive) = $17,728


---

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

## tbs-tcp-052
**Section:** TCP | **Type:** reconciliation | **Difficulty:** hard
**Topic:** Entity Planning - Partnership Basis
**Time Estimate:** 16 min | **Max Points:** 8

### Title
Partnership Basis Planning for Loss Utilization

### Scenario
A partner wants to maximize loss deductions from a partnership investment. Analyze basis limitations and planning opportunities.

Required: Calculate basis and identify strategies to increase deductible losses.

### Exhibits (1)

#### Partner Information (table)
Table: Partner's Tax Basis
Headers: Item | Amount
Rows: 6 rows
  Beginning outside basis | $75,000
  Share of partnership income | $15,000
  Cash distribution received | $20,000
  ... (3 more rows)

### Requirements (7)

**req-basis-before:** Basis after income and distribution (before debt)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":70000,"tolerance":0}
Explanation: $75,000 + $15,000 - $20,000 = $70,000

**req-total-basis:** Total basis including debt share
Type: numeric | Points: 1
Expected: {"type":"numeric","value":135000,"tolerance":0}
Explanation: $70,000 + $25,000 + $40,000 = $135,000

**req-deductible-loss:** Loss deductible this year (basis limited)
Type: numeric | Points: 2
Expected: {"type":"numeric","value":110000,"tolerance":0}
Explanation: $110,000 loss is fully deductible - sufficient basis of $135,000

**req-ending-basis:** Ending outside basis
Type: numeric | Points: 1
Expected: {"type":"numeric","value":25000,"tolerance":0}
Explanation: $135,000 - $110,000 = $25,000

**req-increase-strategy:** If basis were insufficient, best strategy to increase it?
Type: dropdown | Points: 1
Expected: {"type":"dropdown","correctOptionId":"opt-loan"}
Explanation: Personal loan to partnership increases recourse debt basis

**req-at-risk:** At-risk amount (excludes nonrecourse except qualified)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":95000,"tolerance":0}
Explanation: $70,000 + $25,000 recourse = $95,000 at-risk

**req-at-risk-deductible:** Loss deductible under at-risk rules
Type: numeric | Points: 1
Expected: {"type":"numeric","value":95000,"tolerance":0}
Explanation: At-risk limits loss to $95,000 (assumes not real estate)


---

## tbs-tcp-064
**Section:** TCP | **Type:** research | **Difficulty:** medium
**Topic:** Compensation Planning - Restricted Stock
**Time Estimate:** 10 min | **Max Points:** 4

### Title
Section 83(b) Election Analysis

### Scenario
An executive received restricted stock with vesting conditions. Research the requirements for a Section 83(b) election and its implications.

Required: Cite the appropriate IRC section and analyze election benefits.

### Exhibits (1)

#### Restricted Stock Grant (text)
Executive received 10,000 shares of employer stock.
Current FMV: $10 per share....

### Requirements (4)

**req-citation:** IRC section governing property transfers for services
Type: citation | Points: 1
Expected: {"type":"citation","source":"IRC","topicCode":"83","alternativeCitations":[{"source":"IRC","topicCode":"Section 83"},{"source":"IRC","topicCode":"Sec. 83"}]}
Explanation: IRC Section 83 governs transfers of property in connection with services

**req-deadline:** Days to file 83(b) election
Type: numeric | Points: 1
Expected: {"type":"numeric","value":30,"tolerance":0}
Explanation: Must file within 30 days of grant/transfer

**req-income-with:** Ordinary income with 83(b) election (total)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":100000,"tolerance":0}
Explanation: 10,000 shares × $10 = $100,000 recognized immediately

**req-income-without:** Ordinary income without election (total at vesting)
Type: numeric | Points: 1
Expected: {"type":"numeric","value":500000,"tolerance":0}
Explanation: 10,000 shares × $50 = $500,000 taxed as compensation at vesting


---

