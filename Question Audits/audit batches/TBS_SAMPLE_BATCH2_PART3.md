# TBS Sample for Review - Batch 2, Part 3 of 5
Generated: 2026-01-12T01:49:04.867Z
TBS in this part: 15
TBS range: 31 to 45 of 62

---

# TBS Questions

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
