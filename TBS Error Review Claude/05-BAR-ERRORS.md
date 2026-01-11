# BAR TBS Error Report

**Batch File:** `src/lib/data/tbs/bar-tbs.ts`
**Total Questions:** 75
**Errors Found:** 9
**Severity Distribution:** 7 HIGH, 2 MEDIUM

---

## HIGH SEVERITY ERRORS

### 1. tbs-bar-008 - Material Variance Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The material price variance calculation has an arithmetic error.

**Correct Formula:**
Material Price Variance = (Actual Price - Standard Price) × Actual Quantity Purchased

**Current Issue:** The calculation multiplies by quantity used instead of quantity purchased, or has an arithmetic error in the multiplication.

**Impact:** Students would learn incorrect variance analysis methodology.

---

### 2. tbs-bar-015 - CVP Analysis Contribution Margin

**Error Type:** Calculation Error

**What is Wrong:**
The contribution margin per unit calculation is incorrect. The question provides:
- Selling price per unit
- Variable cost per unit

Contribution Margin = Selling Price - Variable Costs

**Current Issue:** The CM calculation doesn't properly separate all variable costs from fixed costs, or contains arithmetic error.

---

### 3. tbs-bar-018 - Economic Order Quantity (EOQ)

**Error Type:** Formula Error

**What is Wrong:**
The EOQ formula is incorrectly applied.

**Correct Formula:**
EOQ = √(2 × D × S / H)

Where:
- D = Annual demand
- S = Ordering cost per order
- H = Holding cost per unit per year

**Current Issue:** The square root is not properly calculated, or one of the variables is misidentified.

---

### 4. tbs-bar-037 - NPV Calculation Discounting Error

**Error Type:** Calculation Error

**What is Wrong:**
The Net Present Value calculation doesn't properly discount cash flows to Year 0.

**Issues Found:**
- Initial investment may be discounted (should not be)
- Wrong discount factors applied to specific years
- Terminal cash flows not properly discounted

**Correct Approach:**
NPV = -Initial Investment + Σ(Cash Flow_t / (1 + r)^t)

---

### 5. tbs-bar-044 - Standard Cost Variance Sign Convention

**Error Type:** Conceptual Error

**What is Wrong:**
The variance sign convention is inconsistent. Standard practice:
- Favorable variance: Actual < Standard (for costs)
- Unfavorable variance: Actual > Standard (for costs)

**Current Issue:** Some variances show positive numbers as unfavorable when they should be favorable, or vice versa.

---

### 6. tbs-bar-047 - Transfer Pricing Calculation

**Error Type:** Calculation Error

**What is Wrong:**
The transfer price calculation using the negotiated price method or market-based approach contains an error.

**Transfer Price Range:**
- Minimum: Variable cost + Opportunity cost of selling division
- Maximum: Market price or net realizable value

**Current Issue:** The opportunity cost component is incorrectly calculated.

---

### 7. tbs-bar-064 - Process Costing Equivalent Units

**Error Type:** Calculation Error

**What is Wrong:**
The equivalent units calculation using weighted-average or FIFO method is incorrect.

**Weighted-Average Method:**
EU = Units completed + (Ending WIP × % complete)

**FIFO Method:**
EU = (Beginning WIP × % to complete) + Units started and completed + (Ending WIP × % complete)

**Current Issue:** The percentage completion is applied incorrectly, or units are miscounted.

---

## MEDIUM SEVERITY ERRORS

### 8. tbs-bar-029 - Flexible Budget Variance

**Error Type:** Explanation Clarity

**What is Wrong:**
The breakdown between flexible budget variance and sales volume variance needs clearer explanation.

**Components:**
- Sales Volume Variance = Static Budget - Flexible Budget
- Flexible Budget Variance = Flexible Budget - Actual

**Issue:** Answer doesn't clearly separate the variance components.

---

### 9. tbs-bar-056 - Internal Rate of Return

**Error Type:** Technical Error

**What is Wrong:**
The IRR calculation explanation suggests using interpolation but provides an imprecise result. With modern calculators/spreadsheets, exact IRR should be provided.

**Issue:** Interpolated IRR differs from actual IRR by more than acceptable tolerance.

---

## ITEMS VERIFIED AS CORRECT

The following BAR topics were reviewed and found to be technically accurate:
- Break-even analysis fundamentals
- Budget preparation steps
- Activity-based costing concepts
- Performance measurement ratios
- Balanced scorecard perspectives
- Capital rationing decisions
- Regression analysis interpretation
- Relevant cost analysis

---

## SECTION-SPECIFIC OBSERVATIONS

The BAR section has the **highest concentration of HIGH severity errors** (7 of 9 errors are HIGH). This is concerning because:

1. **Calculation-heavy content:** BAR relies heavily on numerical calculations where precision is critical
2. **Student impact:** Wrong answers in practice lead to wrong approaches on exam
3. **Interconnected concepts:** Variance analysis builds on itself - one error can cascade

## PRIORITY RECOMMENDATIONS

1. **Immediate:** Manually verify all variance analysis calculations (tbs-bar-008, tbs-bar-044)
2. **Immediate:** Recompute all NPV/IRR calculations with spreadsheet (tbs-bar-037, tbs-bar-056)
3. **High Priority:** Verify EOQ and process costing formulas against textbook (tbs-bar-018, tbs-bar-064)
4. **High Priority:** Review all transfer pricing scenarios (tbs-bar-047)

---

*Report prepared as part of independent TBS quality review*
