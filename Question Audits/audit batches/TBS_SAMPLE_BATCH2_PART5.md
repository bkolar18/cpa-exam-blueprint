# TBS Sample for Review - Batch 2, Part 5 of 5
Generated: 2026-01-12T01:49:04.868Z
TBS in this part: 2
TBS range: 61 to 62 of 62

---

# TBS Questions

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

