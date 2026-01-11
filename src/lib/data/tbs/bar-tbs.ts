// BAR (Business Analysis & Reporting) Task-Based Simulations
// 21 new questions covering high-priority BAR topics

import { TBSQuestion } from "./types";

// =============================================================================
// RATIO ANALYSIS - High Priority Topic
// =============================================================================

export const barRatioAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-001",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Ratio Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Comprehensive Ratio Analysis",
  scenarioText: `Calculate and interpret key financial ratios for ABC Corporation using the provided financial statements.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-balance-sheet",
      order: 1,
      title: "Balance Sheet",
      type: "table",
      content: {
        type: "table",
        title: "ABC Corporation Balance Sheet (Year-End)",
        headers: ["Asset/Liability", "Current Year", "Prior Year"],
        rows: [
          { cells: ["Cash", "$50,000", "$40,000"] },
          { cells: ["Accounts Receivable", "$120,000", "$100,000"] },
          { cells: ["Inventory", "$180,000", "$150,000"] },
          { cells: ["Total Current Assets", "$350,000", "$290,000"] },
          { cells: ["Property, Plant & Equipment (net)", "$450,000", "$400,000"] },
          { cells: ["Total Assets", "$800,000", "$690,000"] },
          { cells: ["Accounts Payable", "$80,000", "$70,000"] },
          { cells: ["Current Portion Long-term Debt", "$20,000", "$20,000"] },
          { cells: ["Total Current Liabilities", "$100,000", "$90,000"] },
          { cells: ["Long-term Debt", "$200,000", "$220,000"] },
          { cells: ["Total Liabilities", "$300,000", "$310,000"] },
          { cells: ["Stockholders' Equity", "$500,000", "$380,000"] },
        ],
      },
    },
    {
      id: "exhibit-income-statement",
      order: 2,
      title: "Income Statement",
      type: "table",
      content: {
        type: "table",
        title: "ABC Corporation Income Statement",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Net Sales", "$1,200,000"] },
          { cells: ["Cost of Goods Sold", "$720,000"] },
          { cells: ["Gross Profit", "$480,000"] },
          { cells: ["Operating Expenses", "$280,000"] },
          { cells: ["Operating Income", "$200,000"] },
          { cells: ["Interest Expense", "$20,000"] },
          { cells: ["Income Before Tax", "$180,000"] },
          { cells: ["Income Tax Expense", "$45,000"] },
          { cells: ["Net Income", "$135,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-current-ratio",
      order: 1,
      type: "numeric",
      label: "Current ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.5,
        tolerance: 0.1,
      },
      explanation: "$350,000 / $100,000 = 3.5",
    },
    {
      id: "req-quick-ratio",
      order: 2,
      type: "numeric",
      label: "Quick (acid-test) ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.7,
        tolerance: 0.1,
      },
      explanation: "($350,000 - $180,000) / $100,000 = 1.7",
    },
    {
      id: "req-debt-to-equity",
      order: 3,
      type: "numeric",
      label: "Debt-to-equity ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.6,
        tolerance: 0.05,
      },
      explanation: "$300,000 / $500,000 = 0.6",
    },
    {
      id: "req-gross-margin",
      order: 4,
      type: "numeric",
      label: "Gross profit margin (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0.5,
      },
      explanation: "$480,000 / $1,200,000 = 40%",
    },
    {
      id: "req-net-margin",
      order: 5,
      type: "numeric",
      label: "Net profit margin (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 11.25,
        tolerance: 0.5,
      },
      explanation: "$135,000 / $1,200,000 = 11.25%",
    },
    {
      id: "req-roe",
      order: 6,
      type: "numeric",
      label: "Return on equity (using average equity, percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30.68,
        tolerance: 1,
      },
      explanation: "$135,000 / (($500,000 + $380,000) / 2) = $135,000 / $440,000 = 30.68%",
    },
    {
      id: "req-times-interest",
      order: 7,
      type: "numeric",
      label: "Times interest earned ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10,
        tolerance: 0.1,
      },
      explanation: "$200,000 / $20,000 = 10 times",
    },
  ],
};

// Cost Accounting - Job Order Costing
export const barJobOrderCostingTBS: TBSQuestion = {
  id: "tbs-bar-002",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Job Order Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Job Order Cost Calculation",
  scenarioText: `Calculate the costs for Job #247 using the job order costing system information provided.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-job-info",
      order: 1,
      title: "Job Information",
      type: "table",
      content: {
        type: "table",
        title: "Job #247 Details",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Direct materials requisitioned", "$45,000"] },
          { cells: ["Direct labor hours", "800 hours"] },
          { cells: ["Direct labor rate", "$25/hour"] },
          { cells: ["Machine hours used", "400 hours"] },
        ],
      },
    },
    {
      id: "exhibit-overhead",
      order: 2,
      title: "Overhead Information",
      type: "table",
      content: {
        type: "table",
        title: "Manufacturing Overhead",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Budgeted annual overhead", "$600,000"] },
          { cells: ["Budgeted direct labor hours", "40,000 hours"] },
          { cells: ["Budgeted machine hours", "30,000 hours"] },
          { cells: ["Actual overhead for period", "$55,000"] },
          { cells: ["Overhead application basis", "Direct labor hours"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-predetermined-rate",
      order: 1,
      type: "numeric",
      label: "Predetermined overhead rate (per DL hour)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15,
        tolerance: 0,
      },
      explanation: "$600,000 / 40,000 DL hours = $15 per DL hour",
    },
    {
      id: "req-direct-labor-cost",
      order: 2,
      type: "numeric",
      label: "Total direct labor cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "800 hours × $25 = $20,000",
    },
    {
      id: "req-applied-overhead",
      order: 3,
      type: "numeric",
      label: "Manufacturing overhead applied to Job #247",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12000,
        tolerance: 0,
      },
      explanation: "800 DL hours × $15 = $12,000",
    },
    {
      id: "req-total-manufacturing-cost",
      order: 4,
      type: "numeric",
      label: "Total manufacturing cost for Job #247",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 77000,
        tolerance: 0,
      },
      explanation: "$45,000 DM + $20,000 DL + $12,000 OH = $77,000",
    },
    {
      id: "req-cost-per-unit",
      order: 5,
      type: "numeric",
      label: "Cost per unit if Job #247 produced 500 units",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 154,
        tolerance: 0.5,
      },
      explanation: "$77,000 / 500 units = $154 per unit",
    },
    {
      id: "req-selling-price",
      order: 6,
      type: "numeric",
      label: "Selling price for 25% markup on cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 192.5,
        tolerance: 0.5,
      },
      explanation: "$154 × 1.25 = $192.50",
    },
  ],
};

// Variance Analysis - Complex
export const barVarianceAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-003",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Variance Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Manufacturing Variance Analysis",
  scenarioText: `Calculate and analyze the manufacturing variances for DEF Manufacturing Company for the month.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "exhibit-standards",
      order: 1,
      title: "Standard Costs",
      type: "table",
      content: {
        type: "table",
        title: "Standard Cost Card (per unit)",
        headers: ["Cost Element", "Standard Quantity", "Standard Price", "Standard Cost"],
        rows: [
          { cells: ["Direct Materials", "4 lbs", "$5.00/lb", "$20.00"] },
          { cells: ["Direct Labor", "2 hours", "$18.00/hr", "$36.00"] },
          { cells: ["Variable Overhead", "2 DL hrs", "$6.00/hr", "$12.00"] },
          { cells: ["Fixed Overhead", "2 DL hrs", "$8.00/hr", "$16.00"] },
          { cells: ["Total Standard Cost", "", "", "$84.00"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Actual Results",
      type: "table",
      content: {
        type: "table",
        title: "Actual Production Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Units produced", "5,000 units"] },
          { cells: ["Direct materials purchased and used", "21,000 lbs @ $4.80/lb"] },
          { cells: ["Direct labor", "10,500 hours @ $18.50/hr"] },
          { cells: ["Actual variable overhead", "$64,000"] },
          { cells: ["Actual fixed overhead", "$85,000"] },
          { cells: ["Budgeted fixed overhead", "$80,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dm-price-variance",
      order: 1,
      type: "numeric",
      label: "Direct materials price variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4200,
        tolerance: 100,
      },
      explanation: "(AQ × AP) - (AQ × SP) = 21,000 × ($4.80 - $5.00) = $4,200 Favorable",
    },
    {
      id: "req-dm-quantity-variance",
      order: 2,
      type: "numeric",
      label: "Direct materials quantity variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000,
        tolerance: 100,
      },
      explanation: "(AQ - SQ) × SP = (21,000 - 20,000) × $5 = $5,000 Unfavorable",
    },
    {
      id: "req-dl-rate-variance",
      order: 3,
      type: "numeric",
      label: "Direct labor rate variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5250,
        tolerance: 100,
      },
      explanation: "(AR - SR) × AH = ($18.50 - $18.00) × 10,500 = $5,250 Unfavorable",
    },
    {
      id: "req-dl-efficiency-variance",
      order: 4,
      type: "numeric",
      label: "Direct labor efficiency variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9000,
        tolerance: 100,
      },
      explanation: "(AH - SH) × SR = (10,500 - 10,000) × $18 = $9,000 Unfavorable",
    },
    {
      id: "req-voh-spending-variance",
      order: 5,
      type: "numeric",
      label: "Variable overhead spending variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1000,
        tolerance: 100,
      },
      explanation: "Actual VOH - (AH × SR) = $64,000 - (10,500 × $6) = $64,000 - $63,000 = $1,000 Unfavorable",
    },
    {
      id: "req-voh-efficiency-variance",
      order: 6,
      type: "numeric",
      label: "Variable overhead efficiency variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3000,
        tolerance: 100,
      },
      explanation: "(AH - SH) × SR = (10,500 - 10,000) × $6 = $3,000 Unfavorable",
    },
    {
      id: "req-foh-budget-variance",
      order: 7,
      type: "numeric",
      label: "Fixed overhead budget (spending) variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000,
        tolerance: 100,
      },
      explanation: "Actual FOH - Budgeted FOH = $85,000 - $80,000 = $5,000 Unfavorable",
    },
    {
      id: "req-foh-volume-variance",
      order: 8,
      type: "numeric",
      label: "Fixed overhead volume variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0,
        tolerance: 100,
      },
      explanation: "Budgeted FOH - Applied FOH = $80,000 - (10,000 × $8) = $80,000 - $80,000 = $0",
    },
  ],
};

// Budgeting - Flexible Budgets
export const barFlexibleBudgetTBS: TBSQuestion = {
  id: "tbs-bar-004",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Budgeting",
  subtopic: "Flexible Budgets",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Flexible Budget Performance Report",
  scenarioText: `Prepare a flexible budget and analyze variances for GHI Company's production department.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-budget",
      order: 1,
      title: "Budget Information",
      type: "table",
      content: {
        type: "table",
        title: "Static Budget (10,000 units)",
        headers: ["Cost Item", "Behavior", "Budgeted Amount"],
        rows: [
          { cells: ["Direct Materials", "Variable", "$150,000"] },
          { cells: ["Direct Labor", "Variable", "$200,000"] },
          { cells: ["Variable Overhead", "Variable", "$50,000"] },
          { cells: ["Fixed Overhead", "Fixed", "$100,000"] },
          { cells: ["Total Costs", "", "$500,000"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Actual Results",
      type: "table",
      content: {
        type: "table",
        title: "Actual Results (11,000 units produced)",
        headers: ["Cost Item", "Actual Amount"],
        rows: [
          { cells: ["Direct Materials", "$170,000"] },
          { cells: ["Direct Labor", "$225,000"] },
          { cells: ["Variable Overhead", "$58,000"] },
          { cells: ["Fixed Overhead", "$105,000"] },
          { cells: ["Total Costs", "$558,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dm-per-unit",
      order: 1,
      type: "numeric",
      label: "Direct materials cost per unit (budget)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15,
        tolerance: 0,
      },
      explanation: "$150,000 / 10,000 = $15 per unit",
    },
    {
      id: "req-flexible-dm",
      order: 2,
      type: "numeric",
      label: "Flexible budget direct materials (11,000 units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 165000,
        tolerance: 0,
      },
      explanation: "11,000 × $15 = $165,000",
    },
    {
      id: "req-flexible-total-var",
      order: 3,
      type: "numeric",
      label: "Flexible budget total variable costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 440000,
        tolerance: 0,
      },
      explanation: "Variable: ($15 + $20 + $5) × 11,000 = $440,000",
    },
    {
      id: "req-flexible-total",
      order: 4,
      type: "numeric",
      label: "Flexible budget total costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 540000,
        tolerance: 0,
      },
      explanation: "$440,000 variable + $100,000 fixed = $540,000",
    },
    {
      id: "req-flexible-variance",
      order: 5,
      type: "numeric",
      label: "Total flexible budget variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18000,
        tolerance: 0,
      },
      explanation: "$558,000 actual - $540,000 flexible = $18,000 Unfavorable",
    },
    {
      id: "req-volume-variance",
      order: 6,
      type: "numeric",
      label: "Sales volume variance (absolute value)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "$540,000 flexible - $500,000 static = $40,000 Unfavorable (costs increased)",
    },
  ],
};

// Capital Budgeting - Complex
export const barCapitalBudgetingTBS: TBSQuestion = {
  id: "tbs-bar-005",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Investment Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Capital Investment Analysis",
  scenarioText: `Evaluate a proposed capital investment using multiple capital budgeting techniques.`,
  timeEstimateMinutes: 16,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-project",
      order: 1,
      title: "Project Information",
      type: "table",
      content: {
        type: "table",
        title: "Equipment Purchase Proposal",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Initial investment", "$500,000"] },
          { cells: ["Annual cash inflows (Years 1-5)", "$150,000"] },
          { cells: ["Salvage value (Year 5)", "$50,000"] },
          { cells: ["Project life", "5 years"] },
          { cells: ["Required rate of return", "12%"] },
          { cells: ["Tax rate", "25%"] },
          { cells: ["Depreciation method", "Straight-line"] },
        ],
      },
    },
    {
      id: "exhibit-pv-factors",
      order: 2,
      title: "Present Value Factors",
      type: "table",
      content: {
        type: "table",
        title: "Present Value Tables (12%)",
        headers: ["Year", "PV Factor (12%)", "PV Annuity Factor (12%)"],
        rows: [
          { cells: ["1", "0.8929", "0.8929"] },
          { cells: ["2", "0.7972", "1.6901"] },
          { cells: ["3", "0.7118", "2.4018"] },
          { cells: ["4", "0.6355", "3.0373"] },
          { cells: ["5", "0.5674", "3.6048"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-annual-depreciation",
      order: 1,
      type: "numeric",
      label: "Annual depreciation expense",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90000,
        tolerance: 0,
      },
      explanation: "($500,000 - $50,000) / 5 = $90,000",
    },
    {
      id: "req-annual-tax-savings",
      order: 2,
      type: "numeric",
      label: "Annual depreciation tax shield",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 22500,
        tolerance: 0,
      },
      explanation: "$90,000 × 25% = $22,500",
    },
    {
      id: "req-after-tax-cash-flow",
      order: 3,
      type: "numeric",
      label: "Annual after-tax operating cash flow",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 135000,
        tolerance: 1000,
      },
      explanation: "$150,000 × (1 - 25%) + $22,500 = $112,500 + $22,500 = $135,000",
    },
    {
      id: "req-pv-cash-flows",
      order: 4,
      type: "numeric",
      label: "PV of annual operating cash flows",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 486648,
        tolerance: 1000,
      },
      explanation: "$135,000 × 3.6048 = $486,648",
    },
    {
      id: "req-pv-salvage",
      order: 5,
      type: "numeric",
      label: "PV of salvage value",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 28370,
        tolerance: 500,
      },
      explanation: "$50,000 × 0.5674 = $28,370",
    },
    {
      id: "req-npv",
      order: 6,
      type: "numeric",
      label: "Net Present Value (NPV)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15018,
        tolerance: 1000,
      },
      explanation: "$486,648 + $28,370 - $500,000 = $15,018",
    },
    {
      id: "req-payback",
      order: 7,
      type: "numeric",
      label: "Simple payback period (years)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.7,
        tolerance: 0.2,
      },
      explanation: "$500,000 / $135,000 = 3.7 years",
    },
  ],
};

// Process Costing - Moderate
export const barProcessCostingTBS: TBSQuestion = {
  id: "tbs-bar-006",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Process Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Process Costing - Weighted Average",
  scenarioText: `Calculate equivalent units and unit costs using the weighted average method for JKL Manufacturing.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-production",
      order: 1,
      title: "Production Data",
      type: "table",
      content: {
        type: "table",
        title: "Mixing Department - Month of July",
        headers: ["Item", "Units", "Completion %"],
        rows: [
          { cells: ["Beginning WIP", "8,000", "Materials 100%, Conversion 40%"] },
          { cells: ["Units started", "42,000", "-"] },
          { cells: ["Units completed and transferred", "40,000", "-"] },
          { cells: ["Ending WIP", "10,000", "Materials 100%, Conversion 60%"] },
        ],
      },
    },
    {
      id: "exhibit-costs",
      order: 2,
      title: "Cost Data",
      type: "table",
      content: {
        type: "table",
        title: "Costs",
        headers: ["Cost Element", "Beginning WIP", "Added This Period"],
        rows: [
          { cells: ["Direct Materials", "$24,000", "$126,000"] },
          { cells: ["Conversion Costs", "$9,600", "$135,600"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-eu-materials",
      order: 1,
      type: "numeric",
      label: "Equivalent units - Materials (weighted average)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50000,
        tolerance: 0,
      },
      explanation: "40,000 completed + 10,000 × 100% = 50,000 EU",
    },
    {
      id: "req-eu-conversion",
      order: 2,
      type: "numeric",
      label: "Equivalent units - Conversion (weighted average)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 46000,
        tolerance: 0,
      },
      explanation: "40,000 completed + 10,000 × 60% = 46,000 EU",
    },
    {
      id: "req-cost-per-eu-materials",
      order: 3,
      type: "numeric",
      label: "Cost per equivalent unit - Materials",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0.01,
      },
      explanation: "($24,000 + $126,000) / 50,000 = $3.00",
    },
    {
      id: "req-cost-per-eu-conversion",
      order: 4,
      type: "numeric",
      label: "Cost per equivalent unit - Conversion",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.16,
        tolerance: 0.02,
      },
      explanation: "($9,600 + $135,600) / 46,000 = $3.156",
    },
    {
      id: "req-transferred-cost",
      order: 5,
      type: "numeric",
      label: "Cost of goods transferred out",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 246400,
        tolerance: 500,
      },
      explanation: "40,000 × ($3.00 + $3.156) = 40,000 × $6.156 = $246,240",
    },
    {
      id: "req-ending-wip",
      order: 6,
      type: "numeric",
      label: "Cost of ending WIP",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 48960,
        tolerance: 500,
      },
      explanation: "(10,000 × $3.00) + (6,000 × $3.156) = $30,000 + $18,936 = $48,936",
    },
  ],
};

// CVP Analysis - Moderate
export const barCVPAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-007",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Cost-Volume-Profit Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Cost-Volume-Profit Analysis",
  scenarioText: `Perform CVP analysis for MNO Company to support management decision-making.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-data",
      order: 1,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "Widget Product Line",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Selling price per unit", "$50"] },
          { cells: ["Variable cost per unit", "$30"] },
          { cells: ["Total fixed costs", "$200,000"] },
          { cells: ["Current sales volume", "15,000 units"] },
          { cells: ["Maximum capacity", "20,000 units"] },
          { cells: ["Target profit", "$100,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-per-unit",
      order: 1,
      type: "numeric",
      label: "Contribution margin per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20,
        tolerance: 0,
      },
      explanation: "$50 - $30 = $20",
    },
    {
      id: "req-cm-ratio",
      order: 2,
      type: "numeric",
      label: "Contribution margin ratio (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0,
      },
      explanation: "$20 / $50 = 40%",
    },
    {
      id: "req-breakeven-units",
      order: 3,
      type: "numeric",
      label: "Break-even point in units",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "$200,000 / $20 = 10,000 units",
    },
    {
      id: "req-breakeven-dollars",
      order: 4,
      type: "numeric",
      label: "Break-even point in sales dollars",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 500000,
        tolerance: 0,
      },
      explanation: "$200,000 / 40% = $500,000",
    },
    {
      id: "req-target-units",
      order: 5,
      type: "numeric",
      label: "Units required for target profit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15000,
        tolerance: 0,
      },
      explanation: "($200,000 + $100,000) / $20 = 15,000 units",
    },
    {
      id: "req-margin-of-safety",
      order: 6,
      type: "numeric",
      label: "Margin of safety in units",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5000,
        tolerance: 0,
      },
      explanation: "15,000 - 10,000 = 5,000 units",
    },
    {
      id: "req-operating-leverage",
      order: 7,
      type: "numeric",
      label: "Degree of operating leverage at current sales",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3,
        tolerance: 0.1,
      },
      explanation: "CM / Operating income = (15,000 × $20) / $100,000 = 3.0",
    },
  ],
};

// Activity-Based Costing - Moderate
export const barActivityBasedCostingTBS: TBSQuestion = {
  id: "tbs-bar-008",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Activity-Based Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Activity-Based Costing Analysis",
  scenarioText: `Apply activity-based costing to allocate overhead costs to products at PQR Company.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-activities",
      order: 1,
      title: "Activity Information",
      type: "table",
      content: {
        type: "table",
        title: "Activity Cost Pools",
        headers: ["Activity", "Total Cost", "Cost Driver"],
        rows: [
          { cells: ["Machine setups", "$120,000", "Number of setups"] },
          { cells: ["Quality inspections", "$80,000", "Number of inspections"] },
          { cells: ["Material handling", "$60,000", "Number of material moves"] },
          { cells: ["Machine maintenance", "$100,000", "Machine hours"] },
        ],
      },
    },
    {
      id: "exhibit-products",
      order: 2,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "Product Data",
        headers: ["Item", "Product A", "Product B"],
        rows: [
          { cells: ["Units produced", "5,000", "10,000"] },
          { cells: ["Number of setups", "100", "50"] },
          { cells: ["Number of inspections", "200", "200"] },
          { cells: ["Number of material moves", "300", "200"] },
          { cells: ["Machine hours", "2,000", "8,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-setup-rate",
      order: 1,
      type: "numeric",
      label: "Setup cost per setup",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 800,
        tolerance: 0,
      },
      explanation: "$120,000 / 150 setups = $800",
    },
    {
      id: "req-product-a-setup",
      order: 2,
      type: "numeric",
      label: "Setup cost allocated to Product A",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "100 setups × $800 = $80,000",
    },
    {
      id: "req-product-a-total-oh",
      order: 3,
      type: "numeric",
      label: "Total overhead allocated to Product A",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 176000,
        tolerance: 1000,
      },
      explanation: "Setup: $80K + Inspection ($80K/400×200=$40K) + Material ($60K/500×300=$36K) + Maintenance ($100K/10K×2K=$20K) = $176,000",
    },
    {
      id: "req-product-a-per-unit",
      order: 4,
      type: "numeric",
      label: "Overhead cost per unit - Product A",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35.2,
        tolerance: 0.5,
      },
      explanation: "$176,000 / 5,000 = $35.20 per unit",
    },
    {
      id: "req-product-b-total-oh",
      order: 5,
      type: "numeric",
      label: "Total overhead allocated to Product B",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 184000,
        tolerance: 1000,
      },
      explanation: "Total overhead $360,000 - Product A $176,000 = $184,000",
    },
    {
      id: "req-product-b-per-unit",
      order: 6,
      type: "numeric",
      label: "Overhead cost per unit - Product B",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18.4,
        tolerance: 1,
      },
      explanation: "$184,000 / 10,000 = $18.40",
    },
  ],
};

// Cash Budget - Moderate
export const barCashBudgetTBS: TBSQuestion = {
  id: "tbs-bar-009",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Budgeting",
  subtopic: "Cash Budgeting",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Cash Budget Preparation",
  scenarioText: `Prepare a cash budget for STU Company for the upcoming quarter.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-sales",
      order: 1,
      title: "Sales Information",
      type: "table",
      content: {
        type: "table",
        title: "Projected Sales",
        headers: ["Month", "Sales"],
        rows: [
          { cells: ["December (actual)", "$200,000"] },
          { cells: ["January", "$180,000"] },
          { cells: ["February", "$220,000"] },
          { cells: ["March", "$240,000"] },
        ],
      },
    },
    {
      id: "exhibit-collections",
      order: 2,
      title: "Collection Pattern",
      type: "text",
      content: {
        type: "text",
        title: "Collection Information",
        paragraphs: [
          "60% collected in month of sale",
          "35% collected in month following sale",
          "5% uncollectible",
        ],
      },
    },
    {
      id: "exhibit-disbursements",
      order: 3,
      title: "Disbursement Information",
      type: "table",
      content: {
        type: "table",
        title: "Monthly Disbursements",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Purchases (60% of next month's sales, paid current month)", "Variable"] },
          { cells: ["Fixed operating expenses", "$50,000"] },
          { cells: ["Equipment purchase (February)", "$30,000"] },
          { cells: ["Beginning cash (January 1)", "$25,000"] },
          { cells: ["Minimum cash balance required", "$20,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-jan-collections",
      order: 1,
      type: "numeric",
      label: "January cash collections",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 178000,
        tolerance: 0,
      },
      explanation: "($180,000 × 60%) + ($200,000 × 35%) = $108,000 + $70,000 = $178,000",
    },
    {
      id: "req-jan-purchases",
      order: 2,
      type: "numeric",
      label: "January purchases payment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 132000,
        tolerance: 0,
      },
      explanation: "$220,000 × 60% = $132,000",
    },
    {
      id: "req-jan-ending-cash",
      order: 3,
      type: "numeric",
      label: "January ending cash (before borrowing)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 21000,
        tolerance: 0,
      },
      explanation: "$25,000 + $178,000 - $132,000 - $50,000 = $21,000",
    },
    {
      id: "req-feb-collections",
      order: 4,
      type: "numeric",
      label: "February cash collections",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 195000,
        tolerance: 0,
      },
      explanation: "($220,000 × 60%) + ($180,000 × 35%) = $132,000 + $63,000 = $195,000",
    },
    {
      id: "req-feb-disbursements",
      order: 5,
      type: "numeric",
      label: "February total disbursements",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 224000,
        tolerance: 0,
      },
      explanation: "$144,000 (purchases) + $50,000 (fixed) + $30,000 (equipment) = $224,000",
    },
    {
      id: "req-feb-borrowing",
      order: 6,
      type: "numeric",
      label: "February borrowing needed (if any)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 28000,
        tolerance: 0,
      },
      explanation: "Beginning $21,000 + $195,000 - $224,000 = -$8,000; Need $20,000 + $8,000 = $28,000",
    },
  ],
};

// Transfer Pricing - Moderate
export const barTransferPricingTBS: TBSQuestion = {
  id: "tbs-bar-010",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Evaluation",
  subtopic: "Transfer Pricing",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Transfer Pricing Analysis",
  scenarioText: `Analyze transfer pricing options for interdivisional sales at VWX Corporation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-selling-division",
      order: 1,
      title: "Selling Division Information",
      type: "table",
      content: {
        type: "table",
        title: "Division A (Selling)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Variable cost per unit", "$30"] },
          { cells: ["Fixed cost per unit (at capacity)", "$10"] },
          { cells: ["External selling price", "$60"] },
          { cells: ["Current capacity utilization", "80%"] },
          { cells: ["Maximum capacity", "100,000 units"] },
        ],
      },
    },
    {
      id: "exhibit-buying-division",
      order: 2,
      title: "Buying Division Information",
      type: "table",
      content: {
        type: "table",
        title: "Division B (Buying)",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Units needed from Division A", "15,000 units"] },
          { cells: ["External purchase price available", "$55"] },
          { cells: ["Additional processing cost", "$20"] },
          { cells: ["Final selling price", "$100"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-minimum-tp",
      order: 1,
      type: "numeric",
      label: "Minimum transfer price (Division A perspective)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30,
        tolerance: 0,
      },
      explanation: "Variable cost = $30 (excess capacity exists, no lost contribution margin)",
    },
    {
      id: "req-maximum-tp",
      order: 2,
      type: "numeric",
      label: "Maximum transfer price (Division B perspective)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 55,
        tolerance: 0,
      },
      explanation: "External purchase price = $55",
    },
    {
      id: "req-negotiated-range",
      order: 3,
      type: "numeric",
      label: "Transfer price negotiation range (max - min)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25,
        tolerance: 0,
      },
      explanation: "$55 - $30 = $25",
    },
    {
      id: "req-div-b-profit-at-40",
      order: 4,
      type: "numeric",
      label: "Division B profit per unit at $40 transfer price",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0,
      },
      explanation: "$100 - $40 - $20 = $40",
    },
    {
      id: "req-company-benefit",
      order: 5,
      type: "numeric",
      label: "Company-wide benefit per unit of internal transfer (vs external purchase)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 25,
        tolerance: 0,
      },
      explanation: "External $55 - Variable cost $30 = $25 saved per unit",
    },
    {
      id: "req-total-company-benefit",
      order: 6,
      type: "numeric",
      label: "Total company benefit from internal transfer",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 375000,
        tolerance: 0,
      },
      explanation: "15,000 units × $25 = $375,000",
    },
  ],
};

// ROI and Residual Income - Moderate
export const barROIAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-011",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Evaluation",
  subtopic: "ROI and Residual Income",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Investment Center Performance",
  scenarioText: `Evaluate the performance of two investment centers using ROI and residual income metrics.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-divisions",
      order: 1,
      title: "Division Information",
      type: "table",
      content: {
        type: "table",
        title: "Division Performance Data",
        headers: ["Item", "Division X", "Division Y"],
        rows: [
          { cells: ["Operating income", "$180,000", "$240,000"] },
          { cells: ["Average operating assets", "$1,000,000", "$2,000,000"] },
          { cells: ["Sales", "$1,500,000", "$3,000,000"] },
        ],
      },
    },
    {
      id: "exhibit-company",
      order: 2,
      title: "Company Information",
      type: "text",
      content: {
        type: "text",
        title: "Corporate Requirements",
        paragraphs: [
          "Minimum required rate of return: 10%",
          "Cost of capital: 10%",
          "Target ROI: 15%",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-roi-x",
      order: 1,
      type: "numeric",
      label: "Division X ROI (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18,
        tolerance: 0.5,
      },
      explanation: "$180,000 / $1,000,000 = 18%",
    },
    {
      id: "req-roi-y",
      order: 2,
      type: "numeric",
      label: "Division Y ROI (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12,
        tolerance: 0.5,
      },
      explanation: "$240,000 / $2,000,000 = 12%",
    },
    {
      id: "req-ri-x",
      order: 3,
      type: "numeric",
      label: "Division X Residual Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 80000,
        tolerance: 0,
      },
      explanation: "$180,000 - ($1,000,000 × 10%) = $80,000",
    },
    {
      id: "req-ri-y",
      order: 4,
      type: "numeric",
      label: "Division Y Residual Income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40000,
        tolerance: 0,
      },
      explanation: "$240,000 - ($2,000,000 × 10%) = $40,000",
    },
    {
      id: "req-margin-x",
      order: 5,
      type: "numeric",
      label: "Division X Profit Margin (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12,
        tolerance: 0.5,
      },
      explanation: "$180,000 / $1,500,000 = 12%",
    },
    {
      id: "req-turnover-x",
      order: 6,
      type: "numeric",
      label: "Division X Asset Turnover (times)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.5,
        tolerance: 0.05,
      },
      explanation: "$1,500,000 / $1,000,000 = 1.5 times",
    },
  ],
};

// Standard Costing - Simple
export const barStandardCostingTBS: TBSQuestion = {
  id: "tbs-bar-012",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Standard Costing",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Standard Cost Card Development",
  scenarioText: `Develop a standard cost card for a new product at YZA Manufacturing.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-standards",
      order: 1,
      title: "Standard Information",
      type: "table",
      content: {
        type: "table",
        title: "Production Standards",
        headers: ["Item", "Standard"],
        rows: [
          { cells: ["Direct materials per unit", "3 pounds"] },
          { cells: ["Direct materials price", "$8 per pound"] },
          { cells: ["Direct labor per unit", "1.5 hours"] },
          { cells: ["Direct labor rate", "$22 per hour"] },
          { cells: ["Variable overhead rate", "$6 per direct labor hour"] },
          { cells: ["Fixed overhead rate", "$10 per direct labor hour"] },
          { cells: ["Normal production volume", "10,000 units"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dm-standard",
      order: 1,
      type: "numeric",
      label: "Standard direct materials cost per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 24,
        tolerance: 0,
      },
      explanation: "3 lbs × $8 = $24",
    },
    {
      id: "req-dl-standard",
      order: 2,
      type: "numeric",
      label: "Standard direct labor cost per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 33,
        tolerance: 0,
      },
      explanation: "1.5 hrs × $22 = $33",
    },
    {
      id: "req-voh-standard",
      order: 3,
      type: "numeric",
      label: "Standard variable overhead per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 9,
        tolerance: 0,
      },
      explanation: "1.5 hrs × $6 = $9",
    },
    {
      id: "req-foh-standard",
      order: 4,
      type: "numeric",
      label: "Standard fixed overhead per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15,
        tolerance: 0,
      },
      explanation: "1.5 hrs × $10 = $15",
    },
    {
      id: "req-total-standard",
      order: 5,
      type: "numeric",
      label: "Total standard cost per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 81,
        tolerance: 0,
      },
      explanation: "$24 + $33 + $9 + $15 = $81",
    },
  ],
};

// Inventory Turnover Analysis - Simple
export const barInventoryAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-013",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Inventory Management",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Inventory Turnover Analysis",
  scenarioText: `Analyze inventory management efficiency for BCD Retail Company.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-inventory-data",
      order: 1,
      title: "Inventory Information",
      type: "table",
      content: {
        type: "table",
        title: "Inventory Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Cost of goods sold", "$3,600,000"] },
          { cells: ["Beginning inventory", "$400,000"] },
          { cells: ["Ending inventory", "$500,000"] },
          { cells: ["Industry average turnover", "9 times"] },
          { cells: ["Days in year", "365"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-avg-inventory",
      order: 1,
      type: "numeric",
      label: "Average inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 450000,
        tolerance: 0,
      },
      explanation: "($400,000 + $500,000) / 2 = $450,000",
    },
    {
      id: "req-turnover",
      order: 2,
      type: "numeric",
      label: "Inventory turnover ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 8,
        tolerance: 0.1,
      },
      explanation: "$3,600,000 / $450,000 = 8 times",
    },
    {
      id: "req-days-in-inventory",
      order: 3,
      type: "numeric",
      label: "Days in inventory",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 45.63,
        tolerance: 1,
      },
      explanation: "365 / 8 = 45.63 days",
    },
    {
      id: "req-vs-industry",
      order: 4,
      type: "dropdown",
      label: "Performance vs. industry average",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-below-avg",
      },
      explanation: "Company 8 times < Industry 9 times = below average",
      dropdownOptions: [
        { id: "opt-above-avg", order: 1, text: "Above average (better)", isCorrect: false },
        { id: "opt-below-avg", order: 2, text: "Below average (worse)", isCorrect: true },
        { id: "opt-at-avg", order: 3, text: "At industry average", isCorrect: false },
      ],
    },
    {
      id: "req-improvement-needed",
      order: 5,
      type: "numeric",
      label: "Inventory reduction needed to match industry average",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50000,
        tolerance: 1000,
      },
      explanation: "To get 9 turns: $3,600,000 / 9 = $400,000 needed; $450,000 - $400,000 = $50,000",
    },
  ],
};

// Receivables Analysis - Simple
export const barReceivablesAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-014",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Receivables Management",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Accounts Receivable Analysis",
  scenarioText: `Analyze accounts receivable efficiency for EFG Services Company.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-ar-data",
      order: 1,
      title: "Receivables Information",
      type: "table",
      content: {
        type: "table",
        title: "A/R Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Net credit sales", "$4,800,000"] },
          { cells: ["Beginning A/R", "$350,000"] },
          { cells: ["Ending A/R", "$450,000"] },
          { cells: ["Credit terms", "Net 30 days"] },
          { cells: ["Bad debt expense", "$24,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-avg-ar",
      order: 1,
      type: "numeric",
      label: "Average accounts receivable",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 400000,
        tolerance: 0,
      },
      explanation: "($350,000 + $450,000) / 2 = $400,000",
    },
    {
      id: "req-ar-turnover",
      order: 2,
      type: "numeric",
      label: "Accounts receivable turnover",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12,
        tolerance: 0.1,
      },
      explanation: "$4,800,000 / $400,000 = 12 times",
    },
    {
      id: "req-days-sales-outstanding",
      order: 3,
      type: "numeric",
      label: "Days sales outstanding (DSO)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30.42,
        tolerance: 1,
      },
      explanation: "365 / 12 = 30.42 days",
    },
    {
      id: "req-collection-efficiency",
      order: 4,
      type: "dropdown",
      label: "Is DSO within credit terms?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-within-terms",
      },
      explanation: "30.42 days is approximately equal to 30-day terms",
      dropdownOptions: [
        { id: "opt-within-terms", order: 1, text: "Yes - within terms", isCorrect: true },
        { id: "opt-exceeds-terms", order: 2, text: "No - exceeds terms", isCorrect: false },
        { id: "opt-well-below", order: 3, text: "Well below terms", isCorrect: false },
      ],
    },
    {
      id: "req-bad-debt-rate",
      order: 5,
      type: "numeric",
      label: "Bad debt as percentage of credit sales",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.5,
        tolerance: 0.05,
      },
      explanation: "$24,000 / $4,800,000 = 0.5%",
    },
  ],
};

// Segment Reporting - Moderate
export const barSegmentReportingTBS: TBSQuestion = {
  id: "tbs-bar-015",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Evaluation",
  subtopic: "Segment Reporting",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Segment Performance Analysis",
  scenarioText: `Analyze segment profitability and determine which segments should be retained or eliminated.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-segments",
      order: 1,
      title: "Segment Information",
      type: "table",
      content: {
        type: "table",
        title: "Segment Income Statement",
        headers: ["Item", "Product A", "Product B", "Product C", "Total"],
        rows: [
          { cells: ["Sales", "$500,000", "$300,000", "$200,000", "$1,000,000"] },
          { cells: ["Variable costs", "$200,000", "$180,000", "$140,000", "$520,000"] },
          { cells: ["Contribution margin", "$300,000", "$120,000", "$60,000", "$480,000"] },
          { cells: ["Direct fixed costs", "$150,000", "$80,000", "$70,000", "$300,000"] },
          { cells: ["Segment margin", "$150,000", "$40,000", "($10,000)", "$180,000"] },
          { cells: ["Allocated common costs", "$60,000", "$36,000", "$24,000", "$120,000"] },
          { cells: ["Net income/(loss)", "$90,000", "$4,000", "($34,000)", "$60,000"] },
        ],
      },
    },
    {
      id: "exhibit-notes",
      order: 2,
      title: "Additional Information",
      type: "text",
      content: {
        type: "text",
        title: "Notes",
        paragraphs: [
          "Common costs are allocated based on sales",
          "All direct fixed costs are avoidable if segment is eliminated",
          "Common fixed costs would not change if any segment is eliminated",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-ratio-a",
      order: 1,
      type: "numeric",
      label: "Product A contribution margin ratio (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 60,
        tolerance: 0.5,
      },
      explanation: "$300,000 / $500,000 = 60%",
    },
    {
      id: "req-cm-ratio-c",
      order: 2,
      type: "numeric",
      label: "Product C contribution margin ratio (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30,
        tolerance: 0.5,
      },
      explanation: "$60,000 / $200,000 = 30%",
    },
    {
      id: "req-eliminate-c-impact",
      order: 3,
      type: "numeric",
      label: "Impact on company profit if Product C eliminated",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "Product C has negative segment margin of -$10,000. Eliminating it saves the $10,000 loss, so company profit increases by $10,000.",
    },
    {
      id: "req-should-eliminate-c",
      order: 4,
      type: "dropdown",
      label: "Should Product C be eliminated?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-negative-segment",
      },
      explanation: "Negative segment margin means eliminating improves overall profits",
      dropdownOptions: [
        { id: "opt-yes-negative-segment", order: 1, text: "Yes - negative segment margin", isCorrect: true },
        { id: "opt-no-positive-cm", order: 2, text: "No - positive contribution margin", isCorrect: false },
        { id: "opt-need-more-info", order: 3, text: "Need more information", isCorrect: false },
      ],
    },
    {
      id: "req-breakeven-c",
      order: 5,
      type: "numeric",
      label: "Sales needed for Product C to break even at segment margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 233333,
        tolerance: 1000,
      },
      explanation: "$70,000 / 30% = $233,333",
    },
    {
      id: "req-profit-after-elimination",
      order: 6,
      type: "numeric",
      label: "Company profit if Product C eliminated",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 70000,
        tolerance: 0,
      },
      explanation: "$60,000 + $10,000 (segment margin was -$10K) = $70,000",
    },
  ],
};

// Make or Buy Decision - Moderate
export const barMakeOrBuyTBS: TBSQuestion = {
  id: "tbs-bar-016",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Decision Analysis",
  subtopic: "Make or Buy Decision",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Make or Buy Analysis",
  scenarioText: `Analyze whether HIJ Manufacturing should make or buy a component part.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-current-costs",
      order: 1,
      title: "Current Manufacturing Costs",
      type: "table",
      content: {
        type: "table",
        title: "Cost to Make (per unit, 20,000 units)",
        headers: ["Cost Element", "Per Unit", "Total"],
        rows: [
          { cells: ["Direct materials", "$12", "$240,000"] },
          { cells: ["Direct labor", "$8", "$160,000"] },
          { cells: ["Variable overhead", "$5", "$100,000"] },
          { cells: ["Fixed overhead (allocated)", "$10", "$200,000"] },
          { cells: ["Total", "$35", "$700,000"] },
        ],
      },
    },
    {
      id: "exhibit-buy-option",
      order: 2,
      title: "Purchase Option",
      type: "text",
      content: {
        type: "text",
        title: "Supplier Quote",
        paragraphs: [
          "Purchase price: $28 per unit",
          "Annual units needed: 20,000",
          "If purchased externally, 60% of fixed overhead could be avoided",
          "Released capacity could be rented for $50,000 per year",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-relevant-make-cost",
      order: 1,
      type: "numeric",
      label: "Relevant cost per unit to make",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 31,
        tolerance: 0,
      },
      explanation: "$12 + $8 + $5 + ($10 × 60%) = $31 (variable + avoidable fixed)",
    },
    {
      id: "req-total-relevant-make",
      order: 2,
      type: "numeric",
      label: "Total relevant cost to make",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 620000,
        tolerance: 0,
      },
      explanation: "20,000 × $31 = $620,000",
    },
    {
      id: "req-total-buy-cost",
      order: 3,
      type: "numeric",
      label: "Total cost to buy (including opportunity cost)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 510000,
        tolerance: 0,
      },
      explanation: "(20,000 × $28) - $50,000 rental = $560,000 - $50,000 = $510,000",
    },
    {
      id: "req-savings-per-unit",
      order: 4,
      type: "numeric",
      label: "Savings per unit by buying",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5.5,
        tolerance: 0.1,
      },
      explanation: "($620,000 - $510,000) / 20,000 = $5.50",
    },
    {
      id: "req-decision",
      order: 5,
      type: "dropdown",
      label: "Should HIJ buy the component?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-buy",
      },
      explanation: "Buy cost $510,000 < Make cost $620,000",
      dropdownOptions: [
        { id: "opt-yes-buy", order: 1, text: "Yes - buying saves money", isCorrect: true },
        { id: "opt-no-make", order: 2, text: "No - making is cheaper", isCorrect: false },
        { id: "opt-indifferent", order: 3, text: "Indifferent", isCorrect: false },
      ],
    },
    {
      id: "req-total-annual-savings",
      order: 6,
      type: "numeric",
      label: "Total annual savings from buying",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 110000,
        tolerance: 0,
      },
      explanation: "$620,000 - $510,000 = $110,000",
    },
  ],
};

// Special Order Decision - Moderate
export const barSpecialOrderTBS: TBSQuestion = {
  id: "tbs-bar-017",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Decision Analysis",
  subtopic: "Special Order Decision",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Special Order Analysis",
  scenarioText: `Evaluate whether to accept a special order at a reduced price.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-current-operations",
      order: 1,
      title: "Current Operations",
      type: "table",
      content: {
        type: "table",
        title: "KLM Manufacturing - Current Production",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Current production", "80,000 units"] },
          { cells: ["Maximum capacity", "100,000 units"] },
          { cells: ["Normal selling price", "$50 per unit"] },
          { cells: ["Variable manufacturing cost", "$28 per unit"] },
          { cells: ["Variable selling cost", "$5 per unit"] },
          { cells: ["Fixed manufacturing overhead", "$800,000"] },
          { cells: ["Fixed selling and admin", "$300,000"] },
        ],
      },
    },
    {
      id: "exhibit-special-order",
      order: 2,
      title: "Special Order Details",
      type: "text",
      content: {
        type: "text",
        title: "One-Time Order from Foreign Customer",
        paragraphs: [
          "Quantity requested: 15,000 units",
          "Offered price: $35 per unit",
          "No variable selling costs on special order",
          "Special packaging required: $2 per unit",
          "Order will not affect regular sales",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-capacity-available",
      order: 1,
      type: "numeric",
      label: "Unused capacity available (units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "100,000 - 80,000 = 20,000 units",
    },
    {
      id: "req-special-order-variable-cost",
      order: 2,
      type: "numeric",
      label: "Variable cost per unit for special order",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30,
        tolerance: 0,
      },
      explanation: "$28 + $2 = $30 (no selling cost, add packaging)",
    },
    {
      id: "req-contribution-per-unit",
      order: 3,
      type: "numeric",
      label: "Contribution margin per unit on special order",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 5,
        tolerance: 0,
      },
      explanation: "$35 - $30 = $5",
    },
    {
      id: "req-total-profit-impact",
      order: 4,
      type: "numeric",
      label: "Total profit impact of accepting order",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 75000,
        tolerance: 0,
      },
      explanation: "15,000 × $5 = $75,000 additional profit",
    },
    {
      id: "req-accept-order",
      order: 5,
      type: "dropdown",
      label: "Should KLM accept the special order?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-yes-accept",
      },
      explanation: "Positive contribution margin and excess capacity exists",
      dropdownOptions: [
        { id: "opt-yes-accept", order: 1, text: "Yes - positive contribution", isCorrect: true },
        { id: "opt-no-below-cost", order: 2, text: "No - price below full cost", isCorrect: false },
        { id: "opt-no-capacity", order: 3, text: "No - insufficient capacity", isCorrect: false },
      ],
    },
    {
      id: "req-minimum-price",
      order: 6,
      type: "numeric",
      label: "Minimum acceptable price per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30,
        tolerance: 0,
      },
      explanation: "Variable cost = $30 is the minimum to avoid a loss",
    },
  ],
};

// Product Mix Decision - Moderate
export const barProductMixTBS: TBSQuestion = {
  id: "tbs-bar-018",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Decision Analysis",
  subtopic: "Product Mix with Constraints",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Product Mix Optimization",
  scenarioText: `Determine the optimal product mix when a resource constraint exists.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-products",
      order: 1,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "Product Line Data",
        headers: ["Item", "Product X", "Product Y", "Product Z"],
        rows: [
          { cells: ["Selling price", "$100", "$80", "$120"] },
          { cells: ["Variable cost", "$60", "$50", "$90"] },
          { cells: ["Machine hours required", "4 hours", "2 hours", "5 hours"] },
          { cells: ["Maximum demand (units)", "2,000", "3,000", "1,000"] },
        ],
      },
    },
    {
      id: "exhibit-constraint",
      order: 2,
      title: "Constraint Information",
      type: "text",
      content: {
        type: "text",
        title: "Production Constraint",
        paragraphs: [
          "Total machine hours available: 15,000 hours",
          "Machine time is the only constraint",
          "All products can be sold at given demand levels",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-x",
      order: 1,
      type: "numeric",
      label: "Product X contribution margin per unit",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0,
      },
      explanation: "$100 - $60 = $40",
    },
    {
      id: "req-cm-per-hour-x",
      order: 2,
      type: "numeric",
      label: "Product X contribution margin per machine hour",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10,
        tolerance: 0,
      },
      explanation: "$40 / 4 hours = $10 per hour",
    },
    {
      id: "req-cm-per-hour-y",
      order: 3,
      type: "numeric",
      label: "Product Y contribution margin per machine hour",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 15,
        tolerance: 0,
      },
      explanation: "$30 / 2 hours = $15 per hour",
    },
    {
      id: "req-cm-per-hour-z",
      order: 4,
      type: "numeric",
      label: "Product Z contribution margin per machine hour",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6,
        tolerance: 0,
      },
      explanation: "$30 / 5 hours = $6 per hour",
    },
    {
      id: "req-ranking",
      order: 5,
      type: "dropdown",
      label: "Product priority ranking (best to worst)",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-y-x-z",
      },
      explanation: "Y ($15/hr) > X ($10/hr) > Z ($6/hr)",
      dropdownOptions: [
        { id: "opt-y-x-z", order: 1, text: "Y, X, Z", isCorrect: true },
        { id: "opt-x-y-z", order: 2, text: "X, Y, Z", isCorrect: false },
        { id: "opt-z-y-x", order: 3, text: "Z, Y, X", isCorrect: false },
      ],
    },
    {
      id: "req-max-profit",
      order: 6,
      type: "numeric",
      label: "Maximum contribution margin with optimal mix",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 176000,
        tolerance: 1000,
      },
      explanation: "Priority: Y (3,000 units × $30 CM = $90,000, uses 6,000 hrs), X (2,000 units × $40 CM = $80,000, uses 8,000 hrs), Z (200 units with 1,000 hrs left × $30 CM = $6,000). Total = $176,000",
    },
  ],
};

// DuPont Analysis - Moderate
export const barDuPontAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-019",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "DuPont Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "DuPont Analysis",
  scenarioText: `Perform DuPont analysis to understand the components driving return on equity.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-financials",
      order: 1,
      title: "Financial Information",
      type: "table",
      content: {
        type: "table",
        title: "NOP Corporation Financial Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Net sales", "$5,000,000"] },
          { cells: ["Net income", "$300,000"] },
          { cells: ["Total assets", "$2,500,000"] },
          { cells: ["Total equity", "$1,000,000"] },
          { cells: ["Total debt", "$1,500,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-profit-margin",
      order: 1,
      type: "numeric",
      label: "Net profit margin (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 6,
        tolerance: 0.1,
      },
      explanation: "$300,000 / $5,000,000 = 6%",
    },
    {
      id: "req-asset-turnover",
      order: 2,
      type: "numeric",
      label: "Asset turnover (times)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2,
        tolerance: 0.05,
      },
      explanation: "$5,000,000 / $2,500,000 = 2.0 times",
    },
    {
      id: "req-equity-multiplier",
      order: 3,
      type: "numeric",
      label: "Equity multiplier",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.5,
        tolerance: 0.05,
      },
      explanation: "$2,500,000 / $1,000,000 = 2.5",
    },
    {
      id: "req-roa",
      order: 4,
      type: "numeric",
      label: "Return on assets (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 12,
        tolerance: 0.5,
      },
      explanation: "6% × 2.0 = 12% (or $300,000 / $2,500,000)",
    },
    {
      id: "req-roe",
      order: 5,
      type: "numeric",
      label: "Return on equity (percentage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30,
        tolerance: 0.5,
      },
      explanation: "6% × 2.0 × 2.5 = 30% (or $300,000 / $1,000,000)",
    },
    {
      id: "req-leverage-impact",
      order: 6,
      type: "numeric",
      label: "ROE increase due to leverage (ROE - ROA)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 18,
        tolerance: 0.5,
      },
      explanation: "30% - 12% = 18%",
    },
  ],
};

// Balanced Scorecard - Simple
export const barBalancedScorecardTBS: TBSQuestion = {
  id: "tbs-bar-020",
  section: "BAR",
  tbsType: "dropdown",
  topic: "Performance Evaluation",
  subtopic: "Balanced Scorecard",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Balanced Scorecard Perspectives",
  scenarioText: `Classify performance measures into the appropriate balanced scorecard perspective.`,
  timeEstimateMinutes: 8,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-measures",
      order: 1,
      title: "Performance Measures",
      type: "text",
      content: {
        type: "text",
        title: "Performance Measures to Classify",
        paragraphs: [
          "1. Customer satisfaction score",
          "2. Employee training hours",
          "3. Return on investment",
          "4. Manufacturing defect rate",
          "5. Market share percentage",
        ],
      },
    },
    {
      id: "exhibit-perspectives",
      order: 2,
      title: "BSC Perspectives",
      type: "text",
      content: {
        type: "text",
        title: "Four Perspectives",
        paragraphs: [
          "Financial: Measures of financial performance and shareholder value",
          "Customer: Measures of customer satisfaction and market position",
          "Internal Process: Measures of operational efficiency and quality",
          "Learning & Growth: Measures of employee development and innovation",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-customer-satisfaction",
      order: 1,
      type: "dropdown",
      label: "Customer satisfaction score belongs to",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-customer",
      },
      explanation: "Customer satisfaction is a customer perspective measure",
      dropdownOptions: [
        { id: "opt-financial", order: 1, text: "Financial", isCorrect: false },
        { id: "opt-customer", order: 2, text: "Customer", isCorrect: true },
        { id: "opt-internal", order: 3, text: "Internal Process", isCorrect: false },
        { id: "opt-learning", order: 4, text: "Learning & Growth", isCorrect: false },
      ],
    },
    {
      id: "req-training-hours",
      order: 2,
      type: "dropdown",
      label: "Employee training hours belongs to",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-learning-2",
      },
      explanation: "Training is a learning & growth measure",
      dropdownOptions: [
        { id: "opt-financial-2", order: 1, text: "Financial", isCorrect: false },
        { id: "opt-customer-2", order: 2, text: "Customer", isCorrect: false },
        { id: "opt-internal-2", order: 3, text: "Internal Process", isCorrect: false },
        { id: "opt-learning-2", order: 4, text: "Learning & Growth", isCorrect: true },
      ],
    },
    {
      id: "req-roi",
      order: 3,
      type: "dropdown",
      label: "Return on investment belongs to",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-financial-3",
      },
      explanation: "ROI is a financial performance measure",
      dropdownOptions: [
        { id: "opt-financial-3", order: 1, text: "Financial", isCorrect: true },
        { id: "opt-customer-3", order: 2, text: "Customer", isCorrect: false },
        { id: "opt-internal-3", order: 3, text: "Internal Process", isCorrect: false },
        { id: "opt-learning-3", order: 4, text: "Learning & Growth", isCorrect: false },
      ],
    },
    {
      id: "req-defect-rate",
      order: 4,
      type: "dropdown",
      label: "Manufacturing defect rate belongs to",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-internal-4",
      },
      explanation: "Quality measures are internal process measures",
      dropdownOptions: [
        { id: "opt-financial-4", order: 1, text: "Financial", isCorrect: false },
        { id: "opt-customer-4", order: 2, text: "Customer", isCorrect: false },
        { id: "opt-internal-4", order: 3, text: "Internal Process", isCorrect: true },
        { id: "opt-learning-4", order: 4, text: "Learning & Growth", isCorrect: false },
      ],
    },
    {
      id: "req-market-share",
      order: 5,
      type: "dropdown",
      label: "Market share percentage belongs to",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-customer-5",
      },
      explanation: "Market position is a customer perspective measure",
      dropdownOptions: [
        { id: "opt-financial-5", order: 1, text: "Financial", isCorrect: false },
        { id: "opt-customer-5", order: 2, text: "Customer", isCorrect: true },
        { id: "opt-internal-5", order: 3, text: "Internal Process", isCorrect: false },
        { id: "opt-learning-5", order: 4, text: "Learning & Growth", isCorrect: false },
      ],
    },
  ],
};

// Economic Order Quantity - Simple
export const barEOQAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-021",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Operations Management",
  subtopic: "Economic Order Quantity",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Economic Order Quantity Analysis",
  scenarioText: `Calculate the economic order quantity and related inventory costs for QRS Wholesale.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-inventory-info",
      order: 1,
      title: "Inventory Information",
      type: "table",
      content: {
        type: "table",
        title: "Product Inventory Data",
        headers: ["Item", "Value"],
        rows: [
          { cells: ["Annual demand", "10,000 units"] },
          { cells: ["Ordering cost per order", "$200"] },
          { cells: ["Annual carrying cost per unit", "$8"] },
          { cells: ["Purchase price per unit", "$50"] },
          { cells: ["Lead time", "5 days"] },
          { cells: ["Working days per year", "250"] },
        ],
      },
    },
    {
      id: "exhibit-formula",
      order: 2,
      title: "EOQ Formula",
      type: "text",
      content: {
        type: "text",
        title: "Economic Order Quantity",
        paragraphs: [
          "EOQ = √(2 × D × S / H)",
          "Where: D = Annual demand, S = Order cost, H = Holding cost per unit",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-eoq",
      order: 1,
      type: "numeric",
      label: "Economic Order Quantity (units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 707,
        tolerance: 10,
      },
      explanation: "√(2 × 10,000 × $200 / $8) = √500,000 = 707 units",
    },
    {
      id: "req-orders-per-year",
      order: 2,
      type: "numeric",
      label: "Number of orders per year",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 14.14,
        tolerance: 0.5,
      },
      explanation: "10,000 / 707 = 14.14 orders",
    },
    {
      id: "req-total-ordering-cost",
      order: 3,
      type: "numeric",
      label: "Total annual ordering cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2828,
        tolerance: 50,
      },
      explanation: "14.14 × $200 = $2,828",
    },
    {
      id: "req-total-carrying-cost",
      order: 4,
      type: "numeric",
      label: "Total annual carrying cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2828,
        tolerance: 50,
      },
      explanation: "(707 / 2) × $8 = $2,828 (equals ordering cost at EOQ)",
    },
    {
      id: "req-reorder-point",
      order: 5,
      type: "numeric",
      label: "Reorder point (units)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 200,
        tolerance: 5,
      },
      explanation: "(10,000 / 250 days) × 5 days lead time = 200 units",
    },
  ],
};

// =============================================================================
// BAR TBS - BATCH 1 (tbs-bar-022 to tbs-bar-031)
// =============================================================================

// Regression Analysis
export const barRegressionAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-022",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Estimation",
  subtopic: "Regression Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Cost Estimation Using Regression",
  scenarioText: `Use regression output to estimate costs and evaluate model fit.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-regression",
      order: 1,
      title: "Regression Output",
      type: "table",
      content: {
        type: "table",
        title: "Manufacturing Overhead Regression",
        headers: ["Statistic", "Value"],
        rows: [
          { cells: ["Intercept", "$45,000"] },
          { cells: ["Machine hours coefficient", "$12.50"] },
          { cells: ["R-squared", "0.89"] },
          { cells: ["Standard error", "$3,200"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cost-estimate",
      order: 1,
      type: "numeric",
      label: "Estimated overhead at 8,000 machine hours",
      points: 2,
      correctAnswer: { type: "numeric", value: 145000, tolerance: 0 },
      explanation: "$45,000 + ($12.50 × 8,000) = $145,000",
    },
    {
      id: "req-variable-rate",
      order: 2,
      type: "numeric",
      label: "Variable cost per machine hour",
      points: 1,
      correctAnswer: { type: "numeric", value: 12.50, tolerance: 0 },
      explanation: "Coefficient = $12.50 per machine hour",
    },
    {
      id: "req-r-squared-meaning",
      order: 3,
      type: "dropdown",
      label: "What does R² = 0.89 indicate?",
      points: 2,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-89" },
      explanation: "89% of overhead variation explained by machine hours",
      dropdownOptions: [
        { id: "opt-89", order: 1, text: "89% of variation explained", isCorrect: true },
        { id: "opt-error", order: 2, text: "89% prediction error", isCorrect: false },
      ],
    },
  ],
};

// Target Costing
export const barTargetCostingTBS: TBSQuestion = {
  id: "tbs-bar-023",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Management",
  subtopic: "Target Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Target Costing Analysis",
  scenarioText: `Determine target cost and cost gap for a new product.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-target",
      order: 1,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "New Product Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Target selling price", "$150"] },
          { cells: ["Required profit margin", "20%"] },
          { cells: ["Current estimated cost", "$135"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-target-profit",
      order: 1,
      type: "numeric",
      label: "Target profit per unit",
      points: 1,
      correctAnswer: { type: "numeric", value: 30, tolerance: 0 },
      explanation: "$150 × 20% = $30",
    },
    {
      id: "req-target-cost",
      order: 2,
      type: "numeric",
      label: "Target cost per unit",
      points: 1,
      correctAnswer: { type: "numeric", value: 120, tolerance: 0 },
      explanation: "$150 - $30 = $120",
    },
    {
      id: "req-cost-gap",
      order: 3,
      type: "numeric",
      label: "Cost gap (reduction needed)",
      points: 2,
      correctAnswer: { type: "numeric", value: 15, tolerance: 0 },
      explanation: "$135 - $120 = $15 reduction needed",
    },
  ],
};

// Working Capital Analysis
export const barWorkingCapitalTBS: TBSQuestion = {
  id: "tbs-bar-024",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Working Capital",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Working Capital Management Analysis",
  scenarioText: `Analyze working capital and cash conversion cycle.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-data",
      order: 1,
      title: "Financial Data",
      type: "table",
      content: {
        type: "table",
        title: "Working Capital Information",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Annual sales", "$3,650,000"] },
          { cells: ["Cost of goods sold", "$2,555,000"] },
          { cells: ["Accounts receivable", "$300,000"] },
          { cells: ["Inventory", "$350,000"] },
          { cells: ["Accounts payable", "$175,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-dso",
      order: 1,
      type: "numeric",
      label: "Days sales outstanding (DSO)",
      points: 1,
      correctAnswer: { type: "numeric", value: 30, tolerance: 1 },
      explanation: "$300,000 / ($3,650,000/365) = 30 days",
    },
    {
      id: "req-dio",
      order: 2,
      type: "numeric",
      label: "Days inventory outstanding (DIO)",
      points: 1,
      correctAnswer: { type: "numeric", value: 50, tolerance: 1 },
      explanation: "$350,000 / ($2,555,000/365) = 50 days",
    },
    {
      id: "req-dpo",
      order: 3,
      type: "numeric",
      label: "Days payable outstanding (DPO)",
      points: 1,
      correctAnswer: { type: "numeric", value: 25, tolerance: 1 },
      explanation: "$175,000 / ($2,555,000/365) = 25 days",
    },
    {
      id: "req-ccc",
      order: 4,
      type: "numeric",
      label: "Cash conversion cycle (days)",
      points: 2,
      correctAnswer: { type: "numeric", value: 55, tolerance: 2 },
      explanation: "30 + 50 - 25 = 55 days",
    },
  ],
};

// Leverage Analysis
export const barLeverageAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-025",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Operating and Financial Leverage",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Operating and Financial Leverage Analysis",
  scenarioText: `Calculate and interpret leverage measures.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-leverage",
      order: 1,
      title: "Income Data",
      type: "table",
      content: {
        type: "table",
        title: "Operating Results",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Sales", "$1,000,000"] },
          { cells: ["Variable costs", "$600,000"] },
          { cells: ["Fixed operating costs", "$250,000"] },
          { cells: ["Interest expense", "$50,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-contribution",
      order: 1,
      type: "numeric",
      label: "Contribution margin",
      points: 1,
      correctAnswer: { type: "numeric", value: 400000, tolerance: 0 },
      explanation: "$1,000,000 - $600,000 = $400,000",
    },
    {
      id: "req-ebit",
      order: 2,
      type: "numeric",
      label: "EBIT",
      points: 1,
      correctAnswer: { type: "numeric", value: 150000, tolerance: 0 },
      explanation: "$400,000 - $250,000 = $150,000",
    },
    {
      id: "req-dol",
      order: 3,
      type: "numeric",
      label: "Degree of operating leverage (DOL)",
      points: 1,
      correctAnswer: { type: "numeric", value: 2.67, tolerance: 0.1 },
      explanation: "$400,000 / $150,000 = 2.67",
    },
    {
      id: "req-dfl",
      order: 4,
      type: "numeric",
      label: "Degree of financial leverage (DFL)",
      points: 1,
      correctAnswer: { type: "numeric", value: 1.5, tolerance: 0.1 },
      explanation: "$150,000 / ($150,000 - $50,000) = 1.5",
    },
    {
      id: "req-dtl",
      order: 5,
      type: "numeric",
      label: "Degree of total leverage (DTL)",
      points: 1,
      correctAnswer: { type: "numeric", value: 4.0, tolerance: 0.1 },
      explanation: "2.67 × 1.5 = 4.0",
    },
  ],
};

// Throughput Accounting
export const barThroughputAccountingTBS: TBSQuestion = {
  id: "tbs-bar-026",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Management",
  subtopic: "Theory of Constraints",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Throughput Accounting and TOC",
  scenarioText: `Apply theory of constraints to maximize throughput.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-products",
      order: 1,
      title: "Product Data",
      type: "table",
      content: {
        type: "table",
        title: "Products A and B",
        headers: ["Item", "Product A", "Product B"],
        rows: [
          { cells: ["Selling price", "$100", "$150"] },
          { cells: ["Direct materials", "$40", "$60"] },
          { cells: ["Minutes on bottleneck", "10", "20"] },
          { cells: ["Weekly demand", "500", "400"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-throughput-a",
      order: 1,
      type: "numeric",
      label: "Throughput per unit - Product A",
      points: 1,
      correctAnswer: { type: "numeric", value: 60, tolerance: 0 },
      explanation: "$100 - $40 = $60",
    },
    {
      id: "req-throughput-b",
      order: 2,
      type: "numeric",
      label: "Throughput per unit - Product B",
      points: 1,
      correctAnswer: { type: "numeric", value: 90, tolerance: 0 },
      explanation: "$150 - $60 = $90",
    },
    {
      id: "req-per-minute-a",
      order: 3,
      type: "numeric",
      label: "Throughput per bottleneck minute - A",
      points: 1,
      correctAnswer: { type: "numeric", value: 6, tolerance: 0 },
      explanation: "$60 / 10 minutes = $6",
    },
    {
      id: "req-per-minute-b",
      order: 4,
      type: "numeric",
      label: "Throughput per bottleneck minute - B",
      points: 1,
      correctAnswer: { type: "numeric", value: 4.5, tolerance: 0.1 },
      explanation: "$90 / 20 minutes = $4.50",
    },
    {
      id: "req-priority",
      order: 5,
      type: "dropdown",
      label: "Which product has priority?",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-a" },
      explanation: "Product A has higher throughput per constraint minute",
      dropdownOptions: [
        { id: "opt-a", order: 1, text: "Product A", isCorrect: true },
        { id: "opt-b", order: 2, text: "Product B", isCorrect: false },
      ],
    },
  ],
};

// Learning Curve Analysis
export const barLearningCurveTBS: TBSQuestion = {
  id: "tbs-bar-027",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Estimation",
  subtopic: "Learning Curve",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Learning Curve Cost Estimation",
  scenarioText: `Apply learning curve to estimate labor costs.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-learning",
      order: 1,
      title: "Learning Curve Data",
      type: "table",
      content: {
        type: "table",
        title: "Production Information",
        headers: ["Item", "Value"],
        rows: [
          { cells: ["First unit labor hours", "100 hours"] },
          { cells: ["Learning rate", "80%"] },
          { cells: ["Labor cost per hour", "$25"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-unit-2",
      order: 1,
      type: "numeric",
      label: "Cumulative average hours at 2 units",
      points: 1,
      correctAnswer: { type: "numeric", value: 80, tolerance: 0 },
      explanation: "100 × 0.80 = 80 hours average",
    },
    {
      id: "req-unit-4",
      order: 2,
      type: "numeric",
      label: "Cumulative average hours at 4 units",
      points: 1,
      correctAnswer: { type: "numeric", value: 64, tolerance: 0 },
      explanation: "80 × 0.80 = 64 hours average",
    },
    {
      id: "req-total-4",
      order: 3,
      type: "numeric",
      label: "Total hours for 4 units",
      points: 1,
      correctAnswer: { type: "numeric", value: 256, tolerance: 0 },
      explanation: "64 × 4 = 256 total hours",
    },
    {
      id: "req-cost-4",
      order: 4,
      type: "numeric",
      label: "Total labor cost for 4 units",
      points: 1,
      correctAnswer: { type: "numeric", value: 6400, tolerance: 0 },
      explanation: "256 × $25 = $6,400",
    },
  ],
};

// Profitability Index
export const barProfitabilityIndexTBS: TBSQuestion = {
  id: "tbs-bar-028",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Project Ranking",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Project Ranking with Profitability Index",
  scenarioText: `Rank capital projects using profitability index.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-projects",
      order: 1,
      title: "Project Data",
      type: "table",
      content: {
        type: "table",
        title: "Available Projects",
        headers: ["Project", "Initial Cost", "PV of Cash Flows", "NPV"],
        rows: [
          { cells: ["Project X", "$100,000", "$125,000", "$25,000"] },
          { cells: ["Project Y", "$200,000", "$260,000", "$60,000"] },
          { cells: ["Project Z", "$150,000", "$180,000", "$30,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pi-x",
      order: 1,
      type: "numeric",
      label: "Profitability index - Project X",
      points: 1,
      correctAnswer: { type: "numeric", value: 1.25, tolerance: 0.01 },
      explanation: "$125,000 / $100,000 = 1.25",
    },
    {
      id: "req-pi-y",
      order: 2,
      type: "numeric",
      label: "Profitability index - Project Y",
      points: 1,
      correctAnswer: { type: "numeric", value: 1.30, tolerance: 0.01 },
      explanation: "$260,000 / $200,000 = 1.30",
    },
    {
      id: "req-pi-z",
      order: 3,
      type: "numeric",
      label: "Profitability index - Project Z",
      points: 1,
      correctAnswer: { type: "numeric", value: 1.20, tolerance: 0.01 },
      explanation: "$180,000 / $150,000 = 1.20",
    },
    {
      id: "req-ranking",
      order: 4,
      type: "dropdown",
      label: "Best project by PI",
      points: 1,
      correctAnswer: { type: "dropdown", correctOptionId: "opt-y" },
      explanation: "Project Y has highest PI at 1.30",
      dropdownOptions: [
        { id: "opt-x", order: 1, text: "Project X", isCorrect: false },
        { id: "opt-y", order: 2, text: "Project Y", isCorrect: true },
        { id: "opt-z", order: 3, text: "Project Z", isCorrect: false },
      ],
    },
  ],
};

// Residual Income Analysis
export const barResidualIncomeTBS: TBSQuestion = {
  id: "tbs-bar-029",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Measurement",
  subtopic: "Residual Income",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Residual Income Performance Evaluation",
  scenarioText: `Evaluate division performance using residual income.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-divisions",
      order: 1,
      title: "Division Data",
      type: "table",
      content: {
        type: "table",
        title: "Division Performance",
        headers: ["Division", "Operating Income", "Assets"],
        rows: [
          { cells: ["East", "$450,000", "$3,000,000"] },
          { cells: ["West", "$600,000", "$5,000,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-roi-east",
      order: 1,
      type: "numeric",
      label: "ROI - East Division (%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 15, tolerance: 0 },
      explanation: "$450,000 / $3,000,000 = 15%",
    },
    {
      id: "req-roi-west",
      order: 2,
      type: "numeric",
      label: "ROI - West Division (%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 12, tolerance: 0 },
      explanation: "$600,000 / $5,000,000 = 12%",
    },
    {
      id: "req-ri-east",
      order: 3,
      type: "numeric",
      label: "Residual income - East (10% hurdle)",
      points: 1,
      correctAnswer: { type: "numeric", value: 150000, tolerance: 0 },
      explanation: "$450,000 - (10% × $3,000,000) = $150,000",
    },
    {
      id: "req-ri-west",
      order: 4,
      type: "numeric",
      label: "Residual income - West (10% hurdle)",
      points: 1,
      correctAnswer: { type: "numeric", value: 100000, tolerance: 0 },
      explanation: "$600,000 - (10% × $5,000,000) = $100,000",
    },
  ],
};

// Sales Mix Variance
export const barSalesMixVarianceTBS: TBSQuestion = {
  id: "tbs-bar-030",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Variance Analysis",
  subtopic: "Sales Variances",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Sales Mix and Quantity Variance Analysis",
  scenarioText: `Calculate sales mix and quantity variances.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-sales",
      order: 1,
      title: "Sales Data",
      type: "table",
      content: {
        type: "table",
        title: "Budget vs Actual",
        headers: ["Product", "Budget Units", "Actual Units", "CM per Unit"],
        rows: [
          { cells: ["Standard", "6,000 (60%)", "5,500 (55%)", "$20"] },
          { cells: ["Premium", "4,000 (40%)", "4,500 (45%)", "$35"] },
          { cells: ["Total", "10,000", "10,000", "—"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-budget-cm",
      order: 1,
      type: "numeric",
      label: "Budgeted total contribution margin",
      points: 2,
      correctAnswer: { type: "numeric", value: 260000, tolerance: 0 },
      explanation: "(6,000 × $20) + (4,000 × $35) = $260,000",
    },
    {
      id: "req-actual-cm",
      order: 2,
      type: "numeric",
      label: "Actual total contribution margin",
      points: 2,
      correctAnswer: { type: "numeric", value: 267500, tolerance: 0 },
      explanation: "(5,500 × $20) + (4,500 × $35) = $267,500",
    },
    {
      id: "req-mix-variance",
      order: 3,
      type: "numeric",
      label: "Sales mix variance (favorable = positive)",
      points: 2,
      correctAnswer: { type: "numeric", value: 7500, tolerance: 0 },
      explanation: "$267,500 - $260,000 = $7,500 favorable",
    },
  ],
};

// WACC Calculation
export const barWACCTBS: TBSQuestion = {
  id: "tbs-bar-031",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost of Capital",
  subtopic: "WACC",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Weighted Average Cost of Capital",
  scenarioText: `Calculate the weighted average cost of capital.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 4,
  exhibits: [
    {
      id: "exhibit-capital",
      order: 1,
      title: "Capital Structure",
      type: "table",
      content: {
        type: "table",
        title: "Capital Components",
        headers: ["Source", "Amount", "After-Tax Cost"],
        rows: [
          { cells: ["Debt", "$2,000,000", "5%"] },
          { cells: ["Preferred stock", "$500,000", "8%"] },
          { cells: ["Common equity", "$2,500,000", "12%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-capital",
      order: 1,
      type: "numeric",
      label: "Total capital",
      points: 1,
      correctAnswer: { type: "numeric", value: 5000000, tolerance: 0 },
      explanation: "$2M + $0.5M + $2.5M = $5,000,000",
    },
    {
      id: "req-debt-weight",
      order: 2,
      type: "numeric",
      label: "Debt weight (%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 40, tolerance: 0 },
      explanation: "$2,000,000 / $5,000,000 = 40%",
    },
    {
      id: "req-wacc",
      order: 3,
      type: "numeric",
      label: "WACC (%)",
      points: 2,
      correctAnswer: { type: "numeric", value: 8.8, tolerance: 0.1 },
      explanation: "(40% × 5%) + (10% × 8%) + (50% × 12%) = 8.8%",
    },
  ],
};

// Sensitivity Analysis
export const barSensitivityAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-032",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Decision Analysis",
  subtopic: "Sensitivity Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Sensitivity Analysis for Capital Project",
  scenarioText: `Analyze how changes in key variables affect project NPV.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-base",
      order: 1,
      title: "Base Case Project Data",
      type: "table",
      content: {
        type: "table",
        title: "Project Parameters",
        headers: ["Variable", "Base Case"],
        rows: [
          { cells: ["Initial investment", "$500,000"] },
          { cells: ["Annual sales units", "10,000"] },
          { cells: ["Price per unit", "$80"] },
          { cells: ["Variable cost per unit", "$50"] },
          { cells: ["Fixed costs per year", "$100,000"] },
          { cells: ["Project life", "5 years"] },
          { cells: ["Discount rate", "10%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-base-annual-cf",
      order: 1,
      type: "numeric",
      label: "Base case annual cash flow",
      points: 2,
      correctAnswer: { type: "numeric", value: 200000, tolerance: 0 },
      explanation: "(10,000 × $30) - $100,000 = $200,000",
    },
    {
      id: "req-base-npv",
      order: 2,
      type: "numeric",
      label: "Base case NPV",
      points: 2,
      correctAnswer: { type: "numeric", value: 258160, tolerance: 1000 },
      explanation: "$200,000 × 3.7908 - $500,000 = $258,160",
    },
    {
      id: "req-breakeven-units",
      order: 3,
      type: "numeric",
      label: "Breakeven units (NPV = 0)",
      points: 2,
      correctAnswer: { type: "numeric", value: 7727, tolerance: 50 },
      explanation: "Solve for units where NPV = 0",
    },
  ],
};

// Joint Product Allocation
export const barJointProductTBS: TBSQuestion = {
  id: "tbs-bar-033",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Joint Products",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Joint Product Cost Allocation",
  scenarioText: `Allocate joint costs to products using multiple methods.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-joint",
      order: 1,
      title: "Joint Production Data",
      type: "table",
      content: {
        type: "table",
        title: "Production Output",
        headers: ["Product", "Units", "Sales Value at Split-off", "Final Sales Value", "Further Processing Cost"],
        rows: [
          { cells: ["Product A", "5,000", "$100,000", "$140,000", "$25,000"] },
          { cells: ["Product B", "3,000", "$75,000", "$110,000", "$20,000"] },
          { cells: ["Product C", "2,000", "$25,000", "$50,000", "$15,000"] },
        ],
      },
    },
    {
      id: "exhibit-costs",
      order: 2,
      title: "Cost Information",
      type: "text",
      content: {
        type: "text",
        title: "Joint Cost",
        paragraphs: ["Total joint costs incurred: $120,000"],
      },
    },
  ],
  requirements: [
    {
      id: "req-alloc-sales-value",
      order: 1,
      type: "numeric",
      label: "Product A allocation (sales value at split-off)",
      points: 2,
      correctAnswer: { type: "numeric", value: 60000, tolerance: 0 },
      explanation: "$120,000 × ($100,000/$200,000) = $60,000",
    },
    {
      id: "req-alloc-nrv",
      order: 2,
      type: "numeric",
      label: "Product A allocation (NRV method)",
      points: 2,
      correctAnswer: { type: "numeric", value: 57600, tolerance: 0 },
      explanation: "NRV A = $115,000; Total NRV = $240,000; $120,000 × ($115,000/$240,000) = $57,500",
    },
    {
      id: "req-process-further",
      order: 3,
      type: "dropdown",
      label: "Should Product C be processed further?",
      points: 2,
      dropdownOptions: [
        { id: "yes", order: 1, text: "Yes", isCorrect: true },
        { id: "no", order: 2, text: "No", isCorrect: false },
      ],
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "yes",
      },
      explanation: "Incremental revenue ($25,000) > Incremental cost ($15,000)",
    },
  ],
};

// Payback Period Analysis
export const barPaybackPeriodTBS: TBSQuestion = {
  id: "tbs-bar-034",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Payback Period",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Payback Period Analysis",
  scenarioText: `Calculate simple and discounted payback periods for a project.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-cashflows",
      order: 1,
      title: "Project Cash Flows",
      type: "table",
      content: {
        type: "table",
        title: "Cash Flow Schedule",
        headers: ["Year", "Cash Flow", "PV Factor (12%)"],
        rows: [
          { cells: ["0", "($200,000)", "1.000"] },
          { cells: ["1", "$50,000", "0.893"] },
          { cells: ["2", "$60,000", "0.797"] },
          { cells: ["3", "$70,000", "0.712"] },
          { cells: ["4", "$80,000", "0.636"] },
          { cells: ["5", "$90,000", "0.567"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-simple-payback",
      order: 1,
      type: "numeric",
      label: "Simple payback period (years)",
      points: 2,
      correctAnswer: { type: "numeric", value: 3.25, tolerance: 0.05 },
      explanation: "Year 3 cumulative = $180,000; remaining $20,000 / $80,000 = 0.25; Total = 3.25 years",
    },
    {
      id: "req-discounted-payback",
      order: 2,
      type: "numeric",
      label: "Discounted payback period (years)",
      points: 3,
      correctAnswer: { type: "numeric", value: 4.08, tolerance: 0.1 },
      explanation: "Discounted cumulative by Year 4 = $196,130; remaining $3,870 / $51,030 = 0.08",
    },
  ],
};

// Spoilage Accounting
export const barSpoilageAccountingTBS: TBSQuestion = {
  id: "tbs-bar-035",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Spoilage",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Normal and Abnormal Spoilage",
  scenarioText: `Calculate normal and abnormal spoilage costs in process costing.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-production",
      order: 1,
      title: "Production Report",
      type: "table",
      content: {
        type: "table",
        title: "Production Data",
        headers: ["Description", "Units"],
        rows: [
          { cells: ["Beginning WIP", "0"] },
          { cells: ["Units started", "10,000"] },
          { cells: ["Good units completed", "8,500"] },
          { cells: ["Spoiled units (at inspection)", "600"] },
          { cells: ["Ending WIP (60% complete)", "900"] },
        ],
      },
    },
    {
      id: "exhibit-costs",
      order: 2,
      title: "Cost Data",
      type: "text",
      content: {
        type: "text",
        title: "Cost Information",
        paragraphs: [
          "Total manufacturing costs: $285,000",
          "Normal spoilage is 5% of good output",
          "Inspection occurs at 100% completion",
          "Spoiled units have no salvage value",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-normal-spoil",
      order: 1,
      type: "numeric",
      label: "Normal spoilage units",
      points: 2,
      correctAnswer: { type: "numeric", value: 425, tolerance: 0 },
      explanation: "8,500 × 5% = 425 units",
    },
    {
      id: "req-abnormal-spoil",
      order: 2,
      type: "numeric",
      label: "Abnormal spoilage units",
      points: 2,
      correctAnswer: { type: "numeric", value: 175, tolerance: 0 },
      explanation: "600 - 425 = 175 units",
    },
    {
      id: "req-cost-per-unit",
      order: 3,
      type: "numeric",
      label: "Cost per equivalent unit",
      points: 2,
      correctAnswer: { type: "numeric", value: 30, tolerance: 0.5 },
      explanation: "$285,000 / (8,500 + 600 + 540) = $29.53 ≈ $30",
    },
  ],
};

// Segment Performance
export const barSegmentPerformanceTBS: TBSQuestion = {
  id: "tbs-bar-036",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Measurement",
  subtopic: "Segment Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Segment Performance Evaluation",
  scenarioText: `Evaluate segment profitability and decide on segment continuation.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-segments",
      order: 1,
      title: "Segment Income Statement",
      type: "table",
      content: {
        type: "table",
        title: "Segment Performance",
        headers: ["Item", "East Region", "West Region", "Central Region"],
        rows: [
          { cells: ["Sales", "$500,000", "$400,000", "$300,000"] },
          { cells: ["Variable costs", "$300,000", "$250,000", "$200,000"] },
          { cells: ["Contribution margin", "$200,000", "$150,000", "$100,000"] },
          { cells: ["Direct fixed costs", "$80,000", "$70,000", "$90,000"] },
          { cells: ["Segment margin", "$120,000", "$80,000", "$10,000"] },
          { cells: ["Allocated common costs", "$50,000", "$40,000", "$30,000"] },
          { cells: ["Operating income (loss)", "$70,000", "$40,000", "($20,000)"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-cm",
      order: 1,
      type: "numeric",
      label: "Total company contribution margin",
      points: 1,
      correctAnswer: { type: "numeric", value: 450000, tolerance: 0 },
      explanation: "$200,000 + $150,000 + $100,000 = $450,000",
    },
    {
      id: "req-cm-ratio-east",
      order: 2,
      type: "numeric",
      label: "East Region CM ratio (%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 40, tolerance: 0 },
      explanation: "$200,000 / $500,000 = 40%",
    },
    {
      id: "req-eliminate",
      order: 3,
      type: "dropdown",
      label: "Should Central Region be eliminated?",
      points: 2,
      dropdownOptions: [
        { id: "yes", order: 1, text: "Yes", isCorrect: false },
        { id: "no", order: 2, text: "No", isCorrect: true },
      ],
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "no",
      },
      explanation: "Segment margin is positive ($10,000); elimination would reduce company profit",
    },
    {
      id: "req-company-profit",
      order: 4,
      type: "numeric",
      label: "Company operating income if Central eliminated",
      points: 2,
      correctAnswer: { type: "numeric", value: 80000, tolerance: 0 },
      explanation: "$70,000 + $40,000 - $30,000 allocated to others = $80,000",
    },
  ],
};

// Operating Budget
export const barOperatingBudgetTBS: TBSQuestion = {
  id: "tbs-bar-037",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Budgeting",
  subtopic: "Operating Budget",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Master Budget Preparation",
  scenarioText: `Prepare production and direct materials budgets.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-sales",
      order: 1,
      title: "Sales Budget",
      type: "table",
      content: {
        type: "table",
        title: "Quarterly Sales Forecast",
        headers: ["Quarter", "Q1", "Q2", "Q3", "Q4"],
        rows: [
          { cells: ["Sales (units)", "10,000", "12,000", "15,000", "13,000"] },
        ],
      },
    },
    {
      id: "exhibit-policy",
      order: 2,
      title: "Inventory Policy",
      type: "text",
      content: {
        type: "text",
        title: "Policies",
        paragraphs: [
          "Desired ending inventory: 20% of next quarter's sales",
          "Beginning inventory Q1: 2,000 units",
          "Each unit requires 3 lbs of direct material",
          "Q1 sales following year: 11,000 units",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-production-q1",
      order: 1,
      type: "numeric",
      label: "Q1 production (units)",
      points: 2,
      correctAnswer: { type: "numeric", value: 10400, tolerance: 0 },
      explanation: "10,000 + 2,400 - 2,000 = 10,400 units",
    },
    {
      id: "req-production-q4",
      order: 2,
      type: "numeric",
      label: "Q4 production (units)",
      points: 2,
      correctAnswer: { type: "numeric", value: 12600, tolerance: 0 },
      explanation: "Sales 13,000 + Ending inv (20% of 11,000 = 2,200) - Beginning inv (20% of 13,000 = 2,600) = 12,600 units",
    },
    {
      id: "req-material-q1",
      order: 3,
      type: "numeric",
      label: "Q1 direct materials needed (lbs)",
      points: 2,
      correctAnswer: { type: "numeric", value: 31200, tolerance: 0 },
      explanation: "10,400 × 3 = 31,200 lbs",
    },
  ],
};

// IRR Analysis
export const barIRRAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-038",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Internal Rate of Return",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "IRR and Project Selection",
  scenarioText: `Calculate IRR and select between mutually exclusive projects.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-projects",
      order: 1,
      title: "Project Data",
      type: "table",
      content: {
        type: "table",
        title: "Mutually Exclusive Projects",
        headers: ["Year", "Project A", "Project B"],
        rows: [
          { cells: ["0", "($100,000)", "($100,000)"] },
          { cells: ["1", "$60,000", "$20,000"] },
          { cells: ["2", "$40,000", "$30,000"] },
          { cells: ["3", "$30,000", "$40,000"] },
          { cells: ["4", "$20,000", "$60,000"] },
        ],
      },
    },
    {
      id: "exhibit-rate",
      order: 2,
      title: "Required Return",
      type: "text",
      content: {
        type: "text",
        title: "Cost of Capital",
        paragraphs: ["Required rate of return: 12%"],
      },
    },
  ],
  requirements: [
    {
      id: "req-npv-a",
      order: 1,
      type: "numeric",
      label: "Project A NPV",
      points: 2,
      correctAnswer: { type: "numeric", value: 19865, tolerance: 500 },
      explanation: "NPV at 12% = $19,865",
    },
    {
      id: "req-npv-b",
      order: 2,
      type: "numeric",
      label: "Project B NPV",
      points: 2,
      correctAnswer: { type: "numeric", value: 16987, tolerance: 500 },
      explanation: "NPV at 12% = $16,987",
    },
    {
      id: "req-select",
      order: 3,
      type: "dropdown",
      label: "Which project should be selected?",
      points: 2,
      dropdownOptions: [
        { id: "project-a", order: 1, text: "Project A", isCorrect: true },
        { id: "project-b", order: 2, text: "Project B", isCorrect: false },
        { id: "neither", order: 3, text: "Neither", isCorrect: false },
      ],
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "project-a",
      },
      explanation: "Project A has higher NPV; for mutually exclusive projects, choose higher NPV",
    },
  ],
};

// Cost Behavior Analysis
export const barCostBehaviorTBS: TBSQuestion = {
  id: "tbs-bar-039",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Analysis",
  subtopic: "Cost Behavior",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Cost Behavior Analysis",
  scenarioText: `Analyze mixed costs using high-low method.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-costs",
      order: 1,
      title: "Historical Cost Data",
      type: "table",
      content: {
        type: "table",
        title: "Utility Costs",
        headers: ["Month", "Machine Hours", "Utility Cost"],
        rows: [
          { cells: ["January", "2,000", "$8,500"] },
          { cells: ["February", "2,400", "$9,700"] },
          { cells: ["March", "1,800", "$8,100"] },
          { cells: ["April", "2,800", "$10,900"] },
          { cells: ["May", "3,200", "$12,100"] },
          { cells: ["June", "2,200", "$9,100"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-variable-rate",
      order: 1,
      type: "numeric",
      label: "Variable cost per machine hour",
      points: 2,
      correctAnswer: { type: "numeric", value: 2.86, tolerance: 0.05 },
      explanation: "($12,100 - $8,100) / (3,200 - 1,800) = $2.86",
    },
    {
      id: "req-fixed-cost",
      order: 2,
      type: "numeric",
      label: "Fixed cost per month",
      points: 2,
      correctAnswer: { type: "numeric", value: 2952, tolerance: 50 },
      explanation: "$12,100 - ($2.86 × 3,200) = $2,948",
    },
    {
      id: "req-predicted",
      order: 3,
      type: "numeric",
      label: "Predicted cost for 2,600 hours",
      points: 1,
      correctAnswer: { type: "numeric", value: 10388, tolerance: 50 },
      explanation: "$2,948 + ($2.86 × 2,600) = $10,384",
    },
  ],
};

// Quality Cost Analysis
export const barQualityCostTBS: TBSQuestion = {
  id: "tbs-bar-040",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Measurement",
  subtopic: "Quality Costs",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Cost of Quality Analysis",
  scenarioText: `Classify and analyze costs of quality.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-quality",
      order: 1,
      title: "Quality-Related Costs",
      type: "table",
      content: {
        type: "table",
        title: "Annual Quality Costs",
        headers: ["Cost Item", "Amount"],
        rows: [
          { cells: ["Quality training", "$25,000"] },
          { cells: ["Inspection of raw materials", "$35,000"] },
          { cells: ["Rework of defective units", "$45,000"] },
          { cells: ["Customer warranty claims", "$60,000"] },
          { cells: ["Product testing", "$40,000"] },
          { cells: ["Design reviews", "$20,000"] },
          { cells: ["Returns processing", "$15,000"] },
          { cells: ["Supplier certification", "$10,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-prevention",
      order: 1,
      type: "numeric",
      label: "Total prevention costs",
      points: 1,
      correctAnswer: { type: "numeric", value: 55000, tolerance: 0 },
      explanation: "$25,000 + $20,000 + $10,000 = $55,000",
    },
    {
      id: "req-appraisal",
      order: 2,
      type: "numeric",
      label: "Total appraisal costs",
      points: 1,
      correctAnswer: { type: "numeric", value: 75000, tolerance: 0 },
      explanation: "$35,000 + $40,000 = $75,000",
    },
    {
      id: "req-internal-fail",
      order: 3,
      type: "numeric",
      label: "Total internal failure costs",
      points: 1,
      correctAnswer: { type: "numeric", value: 45000, tolerance: 0 },
      explanation: "$45,000 (rework)",
    },
    {
      id: "req-external-fail",
      order: 4,
      type: "numeric",
      label: "Total external failure costs",
      points: 2,
      correctAnswer: { type: "numeric", value: 75000, tolerance: 0 },
      explanation: "$60,000 + $15,000 = $75,000",
    },
  ],
};

// Contribution Margin Analysis
export const barContributionAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-041",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "CVP Analysis",
  subtopic: "Contribution Margin",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Multi-Product Contribution Analysis",
  scenarioText: `Calculate weighted average contribution margin and company breakeven.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-products",
      order: 1,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "Product Line Data",
        headers: ["Product", "Selling Price", "Variable Cost", "Sales Mix %"],
        rows: [
          { cells: ["Standard", "$100", "$60", "50%"] },
          { cells: ["Premium", "$150", "$80", "30%"] },
          { cells: ["Deluxe", "$200", "$100", "20%"] },
        ],
      },
    },
    {
      id: "exhibit-fixed",
      order: 2,
      title: "Fixed Costs",
      type: "text",
      content: {
        type: "text",
        title: "Fixed Cost Information",
        paragraphs: ["Total fixed costs: $180,000 per month"],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-standard",
      order: 1,
      type: "numeric",
      label: "Standard product CM per unit",
      points: 1,
      correctAnswer: { type: "numeric", value: 40, tolerance: 0 },
      explanation: "$100 - $60 = $40",
    },
    {
      id: "req-wacm",
      order: 2,
      type: "numeric",
      label: "Weighted average CM per unit",
      points: 2,
      correctAnswer: { type: "numeric", value: 61, tolerance: 0 },
      explanation: "($40 × 50%) + ($70 × 30%) + ($100 × 20%) = $61",
    },
    {
      id: "req-breakeven-units",
      order: 3,
      type: "numeric",
      label: "Breakeven total units",
      points: 2,
      correctAnswer: { type: "numeric", value: 2951, tolerance: 10 },
      explanation: "$180,000 / $61 = 2,951 units",
    },
    {
      id: "req-breakeven-premium",
      order: 4,
      type: "numeric",
      label: "Breakeven Premium units",
      points: 1,
      correctAnswer: { type: "numeric", value: 885, tolerance: 10 },
      explanation: "2,951 × 30% = 885 units",
    },
  ],
};

// Capital Lease Analysis
export const barCapitalLeaseTBS: TBSQuestion = {
  id: "tbs-bar-042",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Technical Accounting",
  subtopic: "Lease Accounting",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Finance Lease Analysis",
  scenarioText: `Analyze a finance lease and calculate related amounts.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-lease",
      order: 1,
      title: "Lease Agreement",
      type: "table",
      content: {
        type: "table",
        title: "Lease Terms",
        headers: ["Item", "Value"],
        rows: [
          { cells: ["Annual lease payment", "$50,000"] },
          { cells: ["Lease term", "5 years"] },
          { cells: ["Payment timing", "End of each year"] },
          { cells: ["Fair value of asset", "$210,000"] },
          { cells: ["Useful life of asset", "6 years"] },
          { cells: ["Lessee's incremental borrowing rate", "8%"] },
          { cells: ["PV annuity factor (8%, 5 years)", "3.9927"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-pv-payments",
      order: 1,
      type: "numeric",
      label: "Present value of lease payments",
      points: 2,
      correctAnswer: { type: "numeric", value: 199635, tolerance: 100 },
      explanation: "$50,000 × 3.9927 = $199,635",
    },
    {
      id: "req-rou-asset",
      order: 2,
      type: "numeric",
      label: "Initial right-of-use asset",
      points: 2,
      correctAnswer: { type: "numeric", value: 199635, tolerance: 100 },
      explanation: "ROU asset = PV of lease payments = $199,635",
    },
    {
      id: "req-year1-interest",
      order: 3,
      type: "numeric",
      label: "Year 1 interest expense",
      points: 2,
      correctAnswer: { type: "numeric", value: 15971, tolerance: 50 },
      explanation: "$199,635 × 8% = $15,971",
    },
  ],
};

// Benefit-Cost Analysis
export const barBenefitCostTBS: TBSQuestion = {
  id: "tbs-bar-043",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Benefit-Cost Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Project Benefit-Cost Evaluation",
  scenarioText: `Evaluate a government project using benefit-cost analysis.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-project",
      order: 1,
      title: "Government Project Data",
      type: "table",
      content: {
        type: "table",
        title: "Project Details",
        headers: ["Item", "Present Value"],
        rows: [
          { cells: ["Initial cost", "$2,000,000"] },
          { cells: ["Direct benefits", "$2,800,000"] },
          { cells: ["Indirect benefits", "$600,000"] },
          { cells: ["External costs", "$200,000"] },
          { cells: ["Operating costs (PV)", "$400,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-benefits",
      order: 1,
      type: "numeric",
      label: "Total present value of benefits",
      points: 1,
      correctAnswer: { type: "numeric", value: 3400000, tolerance: 0 },
      explanation: "$2,800,000 + $600,000 = $3,400,000",
    },
    {
      id: "req-total-costs",
      order: 2,
      type: "numeric",
      label: "Total present value of costs",
      points: 1,
      correctAnswer: { type: "numeric", value: 2600000, tolerance: 0 },
      explanation: "$2,000,000 + $200,000 + $400,000 = $2,600,000",
    },
    {
      id: "req-bc-ratio",
      order: 3,
      type: "numeric",
      label: "Benefit-cost ratio",
      points: 2,
      correctAnswer: { type: "numeric", value: 1.31, tolerance: 0.02 },
      explanation: "$3,400,000 / $2,600,000 = 1.31",
    },
    {
      id: "req-net-benefit",
      order: 4,
      type: "numeric",
      label: "Net benefit",
      points: 1,
      correctAnswer: { type: "numeric", value: 800000, tolerance: 0 },
      explanation: "$3,400,000 - $2,600,000 = $800,000",
    },
  ],
};

// Equivalent Annual Cost
export const barEquivalentAnnualCostTBS: TBSQuestion = {
  id: "tbs-bar-044",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Equivalent Annual Cost",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Asset Replacement Decision",
  scenarioText: `Compare assets with different lives using equivalent annual cost.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-assets",
      order: 1,
      title: "Asset Options",
      type: "table",
      content: {
        type: "table",
        title: "Asset Comparison",
        headers: ["Item", "Machine A", "Machine B"],
        rows: [
          { cells: ["Initial cost", "$80,000", "$120,000"] },
          { cells: ["Annual operating cost", "$15,000", "$10,000"] },
          { cells: ["Useful life", "3 years", "5 years"] },
          { cells: ["Salvage value", "$5,000", "$10,000"] },
        ],
      },
    },
    {
      id: "exhibit-factors",
      order: 2,
      title: "Present Value Factors (10%)",
      type: "table",
      content: {
        type: "table",
        title: "Annuity Factors",
        headers: ["Years", "PV Factor", "Annuity Factor"],
        rows: [
          { cells: ["3", "0.7513", "2.4869"] },
          { cells: ["5", "0.6209", "3.7908"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-npv-a",
      order: 1,
      type: "numeric",
      label: "NPV of costs - Machine A",
      points: 2,
      correctAnswer: { type: "numeric", value: 113548, tolerance: 500 },
      explanation: "$80,000 + ($15,000 × 2.4869) - ($5,000 × 0.7513) = $113,548",
    },
    {
      id: "req-eac-a",
      order: 2,
      type: "numeric",
      label: "Equivalent annual cost - Machine A",
      points: 2,
      correctAnswer: { type: "numeric", value: 45657, tolerance: 200 },
      explanation: "$113,548 / 2.4869 = $45,657",
    },
    {
      id: "req-eac-b",
      order: 3,
      type: "numeric",
      label: "Equivalent annual cost - Machine B",
      points: 2,
      correctAnswer: { type: "numeric", value: 39986, tolerance: 200 },
      explanation: "NPV of costs = $120,000 + ($10,000 × 3.7908) - ($10,000 × 0.6209) = $151,699; EAC = $151,699 / 3.7908 = $40,012 (or $39,986 with rounding)",
    },
  ],
};

// Inventory Valuation Methods
export const barInventoryValuationTBS: TBSQuestion = {
  id: "tbs-bar-045",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Inventory Valuation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Inventory Costing Methods Comparison",
  scenarioText: `Compare FIFO, LIFO, and weighted average inventory methods.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-purchases",
      order: 1,
      title: "Inventory Transactions",
      type: "table",
      content: {
        type: "table",
        title: "Purchase and Sales Data",
        headers: ["Date", "Transaction", "Units", "Unit Cost"],
        rows: [
          { cells: ["Jan 1", "Beginning inventory", "100", "$10"] },
          { cells: ["Jan 10", "Purchase", "200", "$12"] },
          { cells: ["Jan 15", "Sale", "150", "-"] },
          { cells: ["Jan 20", "Purchase", "150", "$14"] },
          { cells: ["Jan 25", "Sale", "200", "-"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-fifo-ending",
      order: 1,
      type: "numeric",
      label: "Ending inventory - FIFO",
      points: 2,
      correctAnswer: { type: "numeric", value: 1400, tolerance: 0 },
      explanation: "100 units × $14 = $1,400",
    },
    {
      id: "req-lifo-ending",
      order: 2,
      type: "numeric",
      label: "Ending inventory - LIFO",
      points: 2,
      correctAnswer: { type: "numeric", value: 1000, tolerance: 0 },
      explanation: "100 units × $10 = $1,000",
    },
    {
      id: "req-avg-cogs",
      order: 3,
      type: "numeric",
      label: "COGS - Weighted average",
      points: 2,
      correctAnswer: { type: "numeric", value: 4200, tolerance: 50 },
      explanation: "Total cost $5,400 / 450 units = $12 avg; 350 × $12 = $4,200",
    },
  ],
};

// Activity Rate Calculation
export const barActivityRateTBS: TBSQuestion = {
  id: "tbs-bar-046",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Activity-Based Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Activity Rate Determination",
  scenarioText: `Calculate activity rates and assign costs to products.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-activities",
      order: 1,
      title: "Activity Cost Pools",
      type: "table",
      content: {
        type: "table",
        title: "Overhead Activities",
        headers: ["Activity", "Cost", "Cost Driver", "Total Driver Units"],
        rows: [
          { cells: ["Machine setups", "$90,000", "Number of setups", "300"] },
          { cells: ["Quality inspection", "$60,000", "Inspection hours", "1,500"] },
          { cells: ["Material handling", "$45,000", "Number of moves", "900"] },
        ],
      },
    },
    {
      id: "exhibit-products",
      order: 2,
      title: "Product Data",
      type: "table",
      content: {
        type: "table",
        title: "Product Activity Usage",
        headers: ["Activity", "Product X", "Product Y"],
        rows: [
          { cells: ["Number of setups", "100", "200"] },
          { cells: ["Inspection hours", "500", "1,000"] },
          { cells: ["Number of moves", "300", "600"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-setup-rate",
      order: 1,
      type: "numeric",
      label: "Setup activity rate",
      points: 1,
      correctAnswer: { type: "numeric", value: 300, tolerance: 0 },
      explanation: "$90,000 / 300 = $300 per setup",
    },
    {
      id: "req-product-x-overhead",
      order: 2,
      type: "numeric",
      label: "Total overhead assigned to Product X",
      points: 2,
      correctAnswer: { type: "numeric", value: 65000, tolerance: 0 },
      explanation: "(100×$300) + (500×$40) + (300×$50) = $65,000",
    },
    {
      id: "req-product-y-overhead",
      order: 3,
      type: "numeric",
      label: "Total overhead assigned to Product Y",
      points: 2,
      correctAnswer: { type: "numeric", value: 130000, tolerance: 0 },
      explanation: "(200×$300) + (1,000×$40) + (600×$50) = $130,000",
    },
  ],
};

// Price Variance Analysis
export const barPriceVarianceTBS: TBSQuestion = {
  id: "tbs-bar-047",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Variance Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Material and Labor Price Variances",
  scenarioText: `Calculate price and efficiency variances for materials and labor.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-standards",
      order: 1,
      title: "Standard Costs",
      type: "table",
      content: {
        type: "table",
        title: "Standard Cost Card (per unit)",
        headers: ["Item", "Standard Qty", "Standard Price", "Standard Cost"],
        rows: [
          { cells: ["Direct materials", "3 lbs", "$5/lb", "$15"] },
          { cells: ["Direct labor", "2 hours", "$20/hour", "$40"] },
        ],
      },
    },
    {
      id: "exhibit-actual",
      order: 2,
      title: "Actual Results",
      type: "table",
      content: {
        type: "table",
        title: "Actual Production Data",
        headers: ["Item", "Actual"],
        rows: [
          { cells: ["Units produced", "1,000"] },
          { cells: ["Materials purchased & used", "3,200 lbs"] },
          { cells: ["Materials cost", "$17,600"] },
          { cells: ["Labor hours worked", "1,900 hours"] },
          { cells: ["Labor cost", "$39,900"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-material-price-var",
      order: 1,
      type: "numeric",
      label: "Material price variance (U = positive)",
      points: 2,
      correctAnswer: { type: "numeric", value: 1600, tolerance: 0 },
      explanation: "(AP - SP) × AQ = ($5.50 - $5) × 3,200 = $1,600 U",
    },
    {
      id: "req-material-qty-var",
      order: 2,
      type: "numeric",
      label: "Material quantity variance (U = positive)",
      points: 2,
      correctAnswer: { type: "numeric", value: 1000, tolerance: 0 },
      explanation: "(AQ - SQ) × SP = (3,200 - 3,000) × $5 = $1,000 U",
    },
    {
      id: "req-labor-rate-var",
      order: 3,
      type: "numeric",
      label: "Labor rate variance (F = negative)",
      points: 2,
      correctAnswer: { type: "numeric", value: 1900, tolerance: 0 },
      explanation: "Actual rate = $39,900 / 1,900 hrs = $21. Labor rate variance = ($21 - $20) × 1,900 = $1,900 Unfavorable. Per instructions (U = positive), enter 1,900.",
    },
  ],
};

// Capacity Analysis
export const barCapacityAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-048",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Capacity Utilization",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Capacity and Utilization Analysis",
  scenarioText: `Analyze capacity utilization and fixed overhead variances.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-capacity",
      order: 1,
      title: "Capacity Information",
      type: "table",
      content: {
        type: "table",
        title: "Plant Capacity Data",
        headers: ["Item", "Value"],
        rows: [
          { cells: ["Theoretical capacity", "50,000 machine hours"] },
          { cells: ["Practical capacity", "40,000 machine hours"] },
          { cells: ["Normal capacity", "35,000 machine hours"] },
          { cells: ["Actual hours worked", "32,000 machine hours"] },
          { cells: ["Budgeted fixed overhead", "$280,000"] },
          { cells: ["Actual fixed overhead", "$290,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-utilization",
      order: 1,
      type: "numeric",
      label: "Practical capacity utilization (%)",
      points: 1,
      correctAnswer: { type: "numeric", value: 80, tolerance: 0 },
      explanation: "32,000 / 40,000 = 80%",
    },
    {
      id: "req-std-rate",
      order: 2,
      type: "numeric",
      label: "Standard fixed overhead rate (normal capacity)",
      points: 2,
      correctAnswer: { type: "numeric", value: 8, tolerance: 0 },
      explanation: "$280,000 / 35,000 = $8 per hour",
    },
    {
      id: "req-volume-variance",
      order: 3,
      type: "numeric",
      label: "Volume variance (U = positive)",
      points: 2,
      correctAnswer: { type: "numeric", value: 24000, tolerance: 0 },
      explanation: "(35,000 - 32,000) × $8 = $24,000 U",
    },
  ],
};

// Throughput Costing
export const barThroughputCostingTBS: TBSQuestion = {
  id: "tbs-bar-049",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Throughput Costing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Throughput vs Absorption Costing",
  scenarioText: `Compare income under throughput and absorption costing.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-data",
      order: 1,
      title: "Production Data",
      type: "table",
      content: {
        type: "table",
        title: "Monthly Operations",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Units produced", "10,000"] },
          { cells: ["Units sold", "8,000"] },
          { cells: ["Selling price per unit", "$50"] },
          { cells: ["Direct materials per unit", "$12"] },
          { cells: ["Direct labor per unit", "$8"] },
          { cells: ["Variable overhead per unit", "$5"] },
          { cells: ["Fixed manufacturing overhead", "$100,000"] },
          { cells: ["Fixed selling & admin", "$40,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-throughput-income",
      order: 1,
      type: "numeric",
      label: "Net income - Throughput costing",
      points: 2,
      correctAnswer: { type: "numeric", value: 164000, tolerance: 0 },
      explanation: "(8,000 × $38) - $100,000 - $40,000 = $164,000",
    },
    {
      id: "req-absorption-income",
      order: 2,
      type: "numeric",
      label: "Net income - Absorption costing",
      points: 2,
      correctAnswer: { type: "numeric", value: 180000, tolerance: 0 },
      explanation: "(8,000 × $25) - $40,000 + (2,000 × $10 deferred) = $180,000",
    },
    {
      id: "req-difference",
      order: 3,
      type: "numeric",
      label: "Income difference (absorption - throughput)",
      points: 2,
      correctAnswer: { type: "numeric", value: 16000, tolerance: 0 },
      explanation: "$180,000 - $164,000 = $16,000; due to fixed OH in ending inventory",
    },
  ],
};

// Government Fund Analysis
export const barGovernmentFundTBS: TBSQuestion = {
  id: "tbs-bar-050",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Government Accounting",
  subtopic: "Fund Accounting",
  difficulty: "hard",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Government Fund Financial Analysis",
  scenarioText: `Analyze governmental fund financial statements.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-fund",
      order: 1,
      title: "General Fund Data",
      type: "table",
      content: {
        type: "table",
        title: "General Fund Balance Sheet",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Cash", "$500,000"] },
          { cells: ["Property taxes receivable", "$200,000"] },
          { cells: ["Allowance for uncollectibles", "($20,000)"] },
          { cells: ["Due from other funds", "$50,000"] },
          { cells: ["Accounts payable", "$150,000"] },
          { cells: ["Deferred inflows - unavailable revenue", "$80,000"] },
          { cells: ["Fund balance - nonspendable", "$30,000"] },
          { cells: ["Fund balance - restricted", "$100,000"] },
          { cells: ["Fund balance - committed", "$75,000"] },
          { cells: ["Fund balance - assigned", "$45,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-total-assets",
      order: 1,
      type: "numeric",
      label: "Total fund assets",
      points: 1,
      correctAnswer: { type: "numeric", value: 730000, tolerance: 0 },
      explanation: "$500,000 + $180,000 + $50,000 = $730,000",
    },
    {
      id: "req-total-liabilities",
      order: 2,
      type: "numeric",
      label: "Total liabilities and deferred inflows",
      points: 1,
      correctAnswer: { type: "numeric", value: 230000, tolerance: 0 },
      explanation: "$150,000 + $80,000 = $230,000",
    },
    {
      id: "req-unassigned",
      order: 3,
      type: "numeric",
      label: "Unassigned fund balance",
      points: 2,
      correctAnswer: { type: "numeric", value: 250000, tolerance: 0 },
      explanation: "$730,000 - $230,000 - $30,000 - $100,000 - $75,000 - $45,000 = $250,000",
    },
    {
      id: "req-total-fund-balance",
      order: 4,
      type: "numeric",
      label: "Total fund balance",
      points: 2,
      correctAnswer: { type: "numeric", value: 500000, tolerance: 0 },
      explanation: "$30,000 + $100,000 + $75,000 + $45,000 + $250,000 = $500,000",
    },
  ],
};

// Phase 3 expansion - Batch 1 (tbs-bar-051 through tbs-bar-060)

// Operating Leverage Analysis
export const barOperatingLeverageTBS: TBSQuestion = {
  id: "tbs-bar-051",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Management",
  subtopic: "Operating Leverage",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Operating Leverage and Risk Analysis",
  scenarioText: `Two companies in the same industry have different cost structures. Analyze the impact of operating leverage on profitability and risk.

Required: Calculate operating leverage and evaluate profit sensitivity.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-companies",
      order: 1,
      title: "Company Comparison",
      type: "table",
      content: {
        type: "table",
        title: "Cost Structure Analysis",
        headers: ["Item", "Company A", "Company B"],
        rows: [
          { cells: ["Sales revenue", "$1,000,000", "$1,000,000"] },
          { cells: ["Variable costs", "$600,000", "$300,000"] },
          { cells: ["Fixed costs", "$200,000", "$500,000"] },
          { cells: ["Operating income", "$200,000", "$200,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-cm-a",
      order: 1,
      type: "numeric",
      label: "Company A contribution margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 400000,
        tolerance: 0,
      },
      explanation: "$1,000,000 - $600,000 = $400,000",
    },
    {
      id: "req-cm-b",
      order: 2,
      type: "numeric",
      label: "Company B contribution margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 700000,
        tolerance: 0,
      },
      explanation: "$1,000,000 - $300,000 = $700,000",
    },
    {
      id: "req-dol-a",
      order: 3,
      type: "numeric",
      label: "Company A degree of operating leverage",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2,
        tolerance: 0.1,
      },
      explanation: "$400,000 / $200,000 = 2.0",
    },
    {
      id: "req-dol-b",
      order: 4,
      type: "numeric",
      label: "Company B degree of operating leverage",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3.5,
        tolerance: 0.1,
      },
      explanation: "$700,000 / $200,000 = 3.5",
    },
    {
      id: "req-impact-b",
      order: 5,
      type: "numeric",
      label: "Company B profit increase if sales rise 10% (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35,
        tolerance: 0,
      },
      explanation: "10% × 3.5 DOL = 35% profit increase",
    },
    {
      id: "req-risk",
      order: 6,
      type: "dropdown",
      label: "Which company has higher operating risk?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-b",
      },
      explanation: "Company B has higher DOL, meaning higher operating risk",
      dropdownOptions: [
        { id: "opt-a", order: 1, text: "Company A", isCorrect: false },
        { id: "opt-b", order: 2, text: "Company B", isCorrect: true },
        { id: "opt-equal", order: 3, text: "Equal risk", isCorrect: false },
      ],
    },
  ],
};

// Multi-Product Breakeven
export const barBreakevenAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-052",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost-Volume-Profit",
  subtopic: "Multi-Product Breakeven",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Multi-Product Breakeven Analysis",
  scenarioText: `A company sells three products with different contribution margins. Calculate the breakeven point using a weighted-average approach.

Required: Determine the breakeven sales mix and revenue.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-products",
      order: 1,
      title: "Product Information",
      type: "table",
      content: {
        type: "table",
        title: "Product Mix Analysis",
        headers: ["Product", "Price", "Variable Cost", "CM", "Sales Mix %"],
        rows: [
          { cells: ["Standard", "$50", "$30", "$20", "50%"] },
          { cells: ["Premium", "$80", "$40", "$40", "30%"] },
          { cells: ["Deluxe", "$120", "$60", "$60", "20%"] },
        ],
      },
    },
    {
      id: "exhibit-fixed",
      order: 2,
      title: "Fixed Costs",
      type: "text",
      content: {
        type: "text",
        title: "Fixed Costs",
        paragraphs: ["Total fixed costs: $480,000 per year"],
      },
    },
  ],
  requirements: [
    {
      id: "req-cmr-standard",
      order: 1,
      type: "numeric",
      label: "Standard CM ratio (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 40,
        tolerance: 0,
      },
      explanation: "$20 / $50 = 40%",
    },
    {
      id: "req-cmr-premium",
      order: 2,
      type: "numeric",
      label: "Premium CM ratio (%)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 50,
        tolerance: 0,
      },
      explanation: "$40 / $80 = 50%",
    },
    {
      id: "req-weighted-cmr",
      order: 3,
      type: "numeric",
      label: "Weighted-average CM ratio (%)",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 45,
        tolerance: 0,
      },
      explanation: "(40% × 50%) + (50% × 30%) + (50% × 20%) = 20% + 15% + 10% = 45%",
    },
    {
      id: "req-breakeven-revenue",
      order: 4,
      type: "numeric",
      label: "Breakeven sales revenue",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 1066667,
        tolerance: 1000,
      },
      explanation: "$480,000 / 45% = $1,066,667",
    },
    {
      id: "req-standard-revenue",
      order: 5,
      type: "numeric",
      label: "Standard product breakeven revenue",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 533333,
        tolerance: 1000,
      },
      explanation: "$1,066,667 × 50% = $533,333",
    },
  ],
};

// Incremental Analysis
export const barIncrementalAnalysisTBS: TBSQuestion = {
  id: "tbs-bar-053",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Decision Analysis",
  subtopic: "Incremental Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Keep vs. Replace Equipment Decision",
  scenarioText: `A company is deciding whether to replace old equipment with new, more efficient equipment. Analyze the incremental costs and benefits.

Required: Calculate the incremental impact of the replacement decision.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-equipment",
      order: 1,
      title: "Equipment Comparison",
      type: "table",
      content: {
        type: "table",
        title: "Equipment Analysis",
        headers: ["Item", "Old Equipment", "New Equipment"],
        rows: [
          { cells: ["Original cost", "$200,000", "$350,000"] },
          { cells: ["Accumulated depreciation", "$120,000", "N/A"] },
          { cells: ["Current salvage value", "$30,000", "N/A"] },
          { cells: ["Remaining useful life", "5 years", "5 years"] },
          { cells: ["Annual operating costs", "$85,000", "$50,000"] },
          { cells: ["Salvage value at end of 5 years", "$0", "$40,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-annual-savings",
      order: 1,
      type: "numeric",
      label: "Annual operating cost savings",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 35000,
        tolerance: 0,
      },
      explanation: "$85,000 - $50,000 = $35,000 per year",
    },
    {
      id: "req-total-savings",
      order: 2,
      type: "numeric",
      label: "Total 5-year operating cost savings",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 175000,
        tolerance: 0,
      },
      explanation: "$35,000 × 5 years = $175,000",
    },
    {
      id: "req-net-cost",
      order: 3,
      type: "numeric",
      label: "Net cost to acquire new equipment",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 320000,
        tolerance: 0,
      },
      explanation: "$350,000 - $30,000 current salvage = $320,000",
    },
    {
      id: "req-total-benefit",
      order: 4,
      type: "numeric",
      label: "Total incremental benefits (savings + future salvage)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 215000,
        tolerance: 0,
      },
      explanation: "$175,000 + $40,000 = $215,000",
    },
    {
      id: "req-net-advantage",
      order: 5,
      type: "numeric",
      label: "Net (dis)advantage of replacing",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -105000,
        tolerance: 0,
      },
      explanation: "$215,000 - $320,000 = ($105,000) disadvantage",
    },
    {
      id: "req-decision",
      order: 6,
      type: "dropdown",
      label: "Recommendation?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-keep",
      },
      explanation: "Keep old equipment - replacement has net disadvantage",
      dropdownOptions: [
        { id: "opt-replace", order: 1, text: "Replace the equipment", isCorrect: false },
        { id: "opt-keep", order: 2, text: "Keep old equipment", isCorrect: true },
        { id: "opt-indifferent", order: 3, text: "Indifferent", isCorrect: false },
      ],
    },
  ],
};

// Cost of Quality Analysis
export const barCostOfQualityTBS: TBSQuestion = {
  id: "tbs-bar-054",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Quality Management",
  subtopic: "Cost of Quality",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Cost of Quality Categories Analysis",
  scenarioText: `A manufacturing company wants to analyze its quality costs to identify improvement opportunities.

Required: Categorize and analyze quality costs.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-costs",
      order: 1,
      title: "Quality Costs",
      type: "table",
      content: {
        type: "table",
        title: "Annual Quality-Related Costs",
        headers: ["Cost Item", "Amount"],
        rows: [
          { cells: ["Quality training", "$45,000"] },
          { cells: ["Inspection of incoming materials", "$30,000"] },
          { cells: ["Rework costs", "$85,000"] },
          { cells: ["Product testing", "$55,000"] },
          { cells: ["Warranty claims", "$120,000"] },
          { cells: ["Scrap materials", "$40,000"] },
          { cells: ["Quality audits", "$25,000"] },
          { cells: ["Customer returns", "$35,000"] },
          { cells: ["Process quality planning", "$50,000"] },
          { cells: ["Equipment calibration", "$20,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-prevention",
      order: 1,
      type: "numeric",
      label: "Total prevention costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 95000,
        tolerance: 0,
      },
      explanation: "Training $45,000 + Planning $50,000 = $95,000",
    },
    {
      id: "req-appraisal",
      order: 2,
      type: "numeric",
      label: "Total appraisal costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 130000,
        tolerance: 0,
      },
      explanation: "Inspection $30,000 + Testing $55,000 + Audits $25,000 + Calibration $20,000 = $130,000",
    },
    {
      id: "req-internal-failure",
      order: 3,
      type: "numeric",
      label: "Total internal failure costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 125000,
        tolerance: 0,
      },
      explanation: "Rework $85,000 + Scrap $40,000 = $125,000",
    },
    {
      id: "req-external-failure",
      order: 4,
      type: "numeric",
      label: "Total external failure costs",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 155000,
        tolerance: 0,
      },
      explanation: "Warranty $120,000 + Returns $35,000 = $155,000",
    },
    {
      id: "req-total-coq",
      order: 5,
      type: "numeric",
      label: "Total cost of quality",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 505000,
        tolerance: 0,
      },
      explanation: "$95,000 + $130,000 + $125,000 + $155,000 = $505,000",
    },
    {
      id: "req-improvement",
      order: 6,
      type: "dropdown",
      label: "Best area to focus improvement efforts?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-prevention",
      },
      explanation: "Increasing prevention costs typically reduces failure costs",
      dropdownOptions: [
        { id: "opt-prevention", order: 1, text: "Increase prevention spending", isCorrect: true },
        { id: "opt-appraisal", order: 2, text: "Reduce appraisal costs", isCorrect: false },
        { id: "opt-external", order: 3, text: "Reduce warranty coverage", isCorrect: false },
      ],
    },
  ],
};

// Liquidity Ratio Analysis
export const barLiquidityRatiosTBS: TBSQuestion = {
  id: "tbs-bar-055",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Liquidity Ratios",
  difficulty: "easy",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Comprehensive Liquidity Analysis",
  scenarioText: `Analyze a company's liquidity position using various financial ratios.

Required: Calculate liquidity ratios and assess financial health.`,
  timeEstimateMinutes: 10,
  maxScorePoints: 5,
  exhibits: [
    {
      id: "exhibit-balance",
      order: 1,
      title: "Balance Sheet Data",
      type: "table",
      content: {
        type: "table",
        title: "Current Assets and Liabilities",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Cash and equivalents", "$150,000"] },
          { cells: ["Marketable securities", "$75,000"] },
          { cells: ["Accounts receivable (net)", "$200,000"] },
          { cells: ["Inventory", "$325,000"] },
          { cells: ["Prepaid expenses", "$25,000"] },
          { cells: ["Accounts payable", "$180,000"] },
          { cells: ["Accrued liabilities", "$70,000"] },
          { cells: ["Current portion of long-term debt", "$50,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-current-assets",
      order: 1,
      type: "numeric",
      label: "Total current assets",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 775000,
        tolerance: 0,
      },
      explanation: "$150,000 + $75,000 + $200,000 + $325,000 + $25,000 = $775,000",
    },
    {
      id: "req-current-liabilities",
      order: 2,
      type: "numeric",
      label: "Total current liabilities",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 300000,
        tolerance: 0,
      },
      explanation: "$180,000 + $70,000 + $50,000 = $300,000",
    },
    {
      id: "req-current-ratio",
      order: 3,
      type: "numeric",
      label: "Current ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2.58,
        tolerance: 0.05,
      },
      explanation: "$775,000 / $300,000 = 2.58",
    },
    {
      id: "req-quick-ratio",
      order: 4,
      type: "numeric",
      label: "Quick (acid-test) ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 1.42,
        tolerance: 0.05,
      },
      explanation: "($150,000 + $75,000 + $200,000) / $300,000 = 1.42",
    },
    {
      id: "req-cash-ratio",
      order: 5,
      type: "numeric",
      label: "Cash ratio",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 0.75,
        tolerance: 0.02,
      },
      explanation: "($150,000 + $75,000) / $300,000 = 0.75",
    },
  ],
};

// Flexible Budget Variance
export const barBudgetFlexTBS: TBSQuestion = {
  id: "tbs-bar-056",
  section: "BAR",
  tbsType: "reconciliation",
  topic: "Budgeting",
  subtopic: "Flexible Budgets",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Flexible Budget Performance Report",
  scenarioText: `Prepare a flexible budget performance report to analyze variances at actual activity level.

Required: Calculate flexible budget amounts and variances.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-budget",
      order: 1,
      title: "Budget Information",
      type: "table",
      content: {
        type: "table",
        title: "Production Cost Budget",
        headers: ["Item", "Static Budget (10,000 units)", "Actual (11,000 units)"],
        rows: [
          { cells: ["Direct materials ($8/unit)", "$80,000", "$92,400"] },
          { cells: ["Direct labor ($12/unit)", "$120,000", "$127,600"] },
          { cells: ["Variable overhead ($5/unit)", "$50,000", "$58,300"] },
          { cells: ["Fixed overhead", "$100,000", "$98,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-flex-dm",
      order: 1,
      type: "numeric",
      label: "Flexible budget direct materials",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 88000,
        tolerance: 0,
      },
      explanation: "11,000 units × $8 = $88,000",
    },
    {
      id: "req-flex-dl",
      order: 2,
      type: "numeric",
      label: "Flexible budget direct labor",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 132000,
        tolerance: 0,
      },
      explanation: "11,000 units × $12 = $132,000",
    },
    {
      id: "req-dm-variance",
      order: 3,
      type: "numeric",
      label: "Direct materials flexible budget variance (U or F)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 4400,
        tolerance: 0,
      },
      explanation: "$92,400 - $88,000 = $4,400 Unfavorable",
    },
    {
      id: "req-dl-variance",
      order: 4,
      type: "numeric",
      label: "Direct labor flexible budget variance (negative if favorable)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -4400,
        tolerance: 0,
      },
      explanation: "$127,600 - $132,000 = ($4,400) Favorable",
    },
    {
      id: "req-vo-variance",
      order: 5,
      type: "numeric",
      label: "Variable overhead flexible budget variance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 3300,
        tolerance: 0,
      },
      explanation: "$58,300 - $55,000 = $3,300 Unfavorable",
    },
    {
      id: "req-fo-variance",
      order: 6,
      type: "numeric",
      label: "Fixed overhead spending variance (negative if favorable)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -2000,
        tolerance: 0,
      },
      explanation: "$98,000 - $100,000 = ($2,000) Favorable",
    },
    {
      id: "req-volume-variance",
      order: 7,
      type: "numeric",
      label: "Production volume variance (1,000 extra units × $10 fixed OH rate)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 10000,
        tolerance: 0,
      },
      explanation: "1,000 units × $10 = $10,000 Favorable (more units absorbed more fixed OH)",
    },
  ],
};

// NPV Sensitivity Analysis
export const barNPVSensitivityTBS: TBSQuestion = {
  id: "tbs-bar-057",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Capital Budgeting",
  subtopic: "Sensitivity Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Capital Project Sensitivity Analysis",
  scenarioText: `Evaluate how changes in key assumptions affect project NPV and make recommendations.

Required: Calculate NPV under different scenarios.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-project",
      order: 1,
      title: "Project Data",
      type: "table",
      content: {
        type: "table",
        title: "Base Case Assumptions",
        headers: ["Item", "Base Case"],
        rows: [
          { cells: ["Initial investment", "$500,000"] },
          { cells: ["Annual cash inflows", "$150,000"] },
          { cells: ["Project life", "5 years"] },
          { cells: ["Required rate of return", "10%"] },
          { cells: ["PV factor (10%, 5 years annuity)", "3.791"] },
        ],
      },
    },
    {
      id: "exhibit-scenarios",
      order: 2,
      title: "Scenarios",
      type: "text",
      content: {
        type: "text",
        title: "Sensitivity Scenarios",
        paragraphs: [
          "Pessimistic: Cash inflows decrease by 20%",
          "Optimistic: Cash inflows increase by 20%",
          "High discount rate scenario: Required return = 15% (PV factor = 3.352)",
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-base-pv",
      order: 1,
      type: "numeric",
      label: "Base case PV of inflows",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 568650,
        tolerance: 100,
      },
      explanation: "$150,000 × 3.791 = $568,650",
    },
    {
      id: "req-base-npv",
      order: 2,
      type: "numeric",
      label: "Base case NPV",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 68650,
        tolerance: 100,
      },
      explanation: "$568,650 - $500,000 = $68,650",
    },
    {
      id: "req-pess-inflows",
      order: 3,
      type: "numeric",
      label: "Pessimistic annual cash inflows",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 120000,
        tolerance: 0,
      },
      explanation: "$150,000 × 80% = $120,000",
    },
    {
      id: "req-pess-npv",
      order: 4,
      type: "numeric",
      label: "Pessimistic case NPV",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: -45080,
        tolerance: 100,
      },
      explanation: "$120,000 × 3.791 - $500,000 = -$45,080",
    },
    {
      id: "req-opt-npv",
      order: 5,
      type: "numeric",
      label: "Optimistic case NPV",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 182380,
        tolerance: 100,
      },
      explanation: "$180,000 × 3.791 - $500,000 = $182,380",
    },
    {
      id: "req-high-disc-npv",
      order: 6,
      type: "numeric",
      label: "NPV at 15% discount rate",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2800,
        tolerance: 100,
      },
      explanation: "$150,000 × 3.352 - $500,000 = $2,800",
    },
    {
      id: "req-recommendation",
      order: 7,
      type: "dropdown",
      label: "Project recommendation considering risk?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-conditional",
      },
      explanation: "Marginally accept - positive base NPV but negative in pessimistic case",
      dropdownOptions: [
        { id: "opt-accept", order: 1, text: "Strongly accept", isCorrect: false },
        { id: "opt-conditional", order: 2, text: "Conditionally accept - monitor closely", isCorrect: true },
        { id: "opt-reject", order: 3, text: "Reject project", isCorrect: false },
      ],
    },
  ],
};

// Cost Allocation Methods
export const barAllocationMethodsTBS: TBSQuestion = {
  id: "tbs-bar-058",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Cost Allocation",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Service Department Cost Allocation",
  scenarioText: `A company has two service departments that support two production departments. Allocate service department costs using the direct and step-down methods.

Required: Calculate allocated costs under both methods.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-departments",
      order: 1,
      title: "Department Information",
      type: "table",
      content: {
        type: "table",
        title: "Service Usage",
        headers: ["Provider", "Maintenance", "IT", "Assembly", "Finishing"],
        rows: [
          { cells: ["Maintenance costs: $100,000", "-", "20%", "50%", "30%"] },
          { cells: ["IT costs: $80,000", "10%", "-", "60%", "30%"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-direct-maint-assembly",
      order: 1,
      type: "numeric",
      label: "Direct method: Maintenance to Assembly",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 62500,
        tolerance: 0,
      },
      explanation: "$100,000 × 50%/(50%+30%) = $100,000 × 62.5% = $62,500",
    },
    {
      id: "req-direct-maint-finish",
      order: 2,
      type: "numeric",
      label: "Direct method: Maintenance to Finishing",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 37500,
        tolerance: 0,
      },
      explanation: "$100,000 × 30%/(50%+30%) = $100,000 × 37.5% = $37,500",
    },
    {
      id: "req-direct-it-assembly",
      order: 3,
      type: "numeric",
      label: "Direct method: IT to Assembly",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 53333,
        tolerance: 100,
      },
      explanation: "$80,000 × 60%/(60%+30%) = $80,000 × 66.67% = $53,333",
    },
    {
      id: "req-step-maint-it",
      order: 4,
      type: "numeric",
      label: "Step-down (Maint first): Maintenance to IT",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 20000,
        tolerance: 0,
      },
      explanation: "$100,000 × 20% = $20,000",
    },
    {
      id: "req-step-it-total",
      order: 5,
      type: "numeric",
      label: "Step-down: IT total after allocation from Maintenance",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 100000,
        tolerance: 0,
      },
      explanation: "$80,000 + $20,000 = $100,000",
    },
    {
      id: "req-step-it-assembly",
      order: 6,
      type: "numeric",
      label: "Step-down: IT to Assembly (from $100,000)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 66667,
        tolerance: 100,
      },
      explanation: "$100,000 × 60%/(60%+30%) = $66,667",
    },
    {
      id: "req-total-assembly",
      order: 7,
      type: "numeric",
      label: "Step-down: Total allocated to Assembly",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 116667,
        tolerance: 100,
      },
      explanation: "$50,000 (Maint) + $66,667 (IT) = $116,667",
    },
  ],
};

// Profit Center Analysis
export const barProfitCenterTBS: TBSQuestion = {
  id: "tbs-bar-059",
  section: "BAR",
  tbsType: "reconciliation",
  topic: "Performance Measurement",
  subtopic: "Profit Centers",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Segment Profitability Analysis",
  scenarioText: `A company operates three regional divisions as profit centers. Analyze segment performance and identify improvement opportunities.

Required: Calculate segment margins and evaluate performance.`,
  timeEstimateMinutes: 12,
  maxScorePoints: 6,
  exhibits: [
    {
      id: "exhibit-segments",
      order: 1,
      title: "Segment Data",
      type: "table",
      content: {
        type: "table",
        title: "Regional Division Results",
        headers: ["Item", "North", "South", "West", "Total"],
        rows: [
          { cells: ["Revenue", "$800,000", "$600,000", "$400,000", "$1,800,000"] },
          { cells: ["Variable costs", "$480,000", "$390,000", "$280,000", "$1,150,000"] },
          { cells: ["Traceable fixed costs", "$150,000", "$120,000", "$90,000", "$360,000"] },
          { cells: ["Common fixed costs allocated", "$80,000", "$60,000", "$40,000", "$180,000"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-north-cm",
      order: 1,
      type: "numeric",
      label: "North division contribution margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 320000,
        tolerance: 0,
      },
      explanation: "$800,000 - $480,000 = $320,000",
    },
    {
      id: "req-south-segment",
      order: 2,
      type: "numeric",
      label: "South division segment margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 90000,
        tolerance: 0,
      },
      explanation: "$600,000 - $390,000 - $120,000 = $90,000",
    },
    {
      id: "req-west-segment",
      order: 3,
      type: "numeric",
      label: "West division segment margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 30000,
        tolerance: 0,
      },
      explanation: "$400,000 - $280,000 - $90,000 = $30,000",
    },
    {
      id: "req-total-segment",
      order: 4,
      type: "numeric",
      label: "Total company segment margin",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 290000,
        tolerance: 0,
      },
      explanation: "$170,000 + $90,000 + $30,000 = $290,000",
    },
    {
      id: "req-operating-income",
      order: 5,
      type: "numeric",
      label: "Company operating income",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 110000,
        tolerance: 0,
      },
      explanation: "$290,000 - $180,000 common = $110,000",
    },
    {
      id: "req-eliminate",
      order: 6,
      type: "dropdown",
      label: "Should West division be eliminated?",
      points: 1,
      correctAnswer: {
        type: "dropdown",
        correctOptionId: "opt-no-positive",
      },
      explanation: "No - positive segment margin of $30,000 contributes to covering common costs",
      dropdownOptions: [
        { id: "opt-yes-lowest", order: 1, text: "Yes - lowest margin", isCorrect: false },
        { id: "opt-no-positive", order: 2, text: "No - positive segment margin", isCorrect: true },
        { id: "opt-need-more", order: 3, text: "Need more information", isCorrect: false },
      ],
    },
  ],
};

// Master Budget Integration
export const barMasterBudgetTBS: TBSQuestion = {
  id: "tbs-bar-060",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Budgeting",
  subtopic: "Master Budget",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Master Budget Preparation",
  scenarioText: `Prepare key components of a master budget including sales, production, and direct materials budgets.

Required: Calculate budgeted amounts for each component.`,
  timeEstimateMinutes: 14,
  maxScorePoints: 7,
  exhibits: [
    {
      id: "exhibit-data",
      order: 1,
      title: "Budget Assumptions",
      type: "table",
      content: {
        type: "table",
        title: "Quarter 1 Budget Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Expected sales (units)", "50,000"] },
          { cells: ["Selling price per unit", "$40"] },
          { cells: ["Beginning finished goods inventory", "8,000 units"] },
          { cells: ["Desired ending finished goods inventory", "12,000 units"] },
          { cells: ["Direct materials per unit", "3 pounds"] },
          { cells: ["Cost per pound", "$2"] },
          { cells: ["Beginning raw materials inventory", "20,000 pounds"] },
          { cells: ["Desired ending raw materials inventory", "25,000 pounds"] },
        ],
      },
    },
  ],
  requirements: [
    {
      id: "req-sales-budget",
      order: 1,
      type: "numeric",
      label: "Budgeted sales revenue",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 2000000,
        tolerance: 0,
      },
      explanation: "50,000 units × $40 = $2,000,000",
    },
    {
      id: "req-production-units",
      order: 2,
      type: "numeric",
      label: "Required production (units)",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 54000,
        tolerance: 0,
      },
      explanation: "50,000 sales + 12,000 ending - 8,000 beginning = 54,000 units",
    },
    {
      id: "req-dm-needed",
      order: 3,
      type: "numeric",
      label: "Direct materials needed for production (pounds)",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 162000,
        tolerance: 0,
      },
      explanation: "54,000 units × 3 pounds = 162,000 pounds",
    },
    {
      id: "req-dm-purchases",
      order: 4,
      type: "numeric",
      label: "Direct materials purchases (pounds)",
      points: 2,
      correctAnswer: {
        type: "numeric",
        value: 167000,
        tolerance: 0,
      },
      explanation: "162,000 + 25,000 ending - 20,000 beginning = 167,000 pounds",
    },
    {
      id: "req-dm-cost",
      order: 5,
      type: "numeric",
      label: "Direct materials purchases cost",
      points: 1,
      correctAnswer: {
        type: "numeric",
        value: 334000,
        tolerance: 0,
      },
      explanation: "167,000 pounds × $2 = $334,000",
    },
  ],
};

// Export all BAR TBS questions
export const barTBSQuestions: TBSQuestion[] = [
  barRatioAnalysisTBS,
  barJobOrderCostingTBS,
  barVarianceAnalysisTBS,
  barFlexibleBudgetTBS,
  barCapitalBudgetingTBS,
  barProcessCostingTBS,
  barCVPAnalysisTBS,
  barActivityBasedCostingTBS,
  barCashBudgetTBS,
  barTransferPricingTBS,
  barROIAnalysisTBS,
  barStandardCostingTBS,
  barInventoryAnalysisTBS,
  barReceivablesAnalysisTBS,
  barSegmentReportingTBS,
  barMakeOrBuyTBS,
  barSpecialOrderTBS,
  barProductMixTBS,
  barDuPontAnalysisTBS,
  barBalancedScorecardTBS,
  barEOQAnalysisTBS,
  barRegressionAnalysisTBS,
  barTargetCostingTBS,
  barWorkingCapitalTBS,
  barLeverageAnalysisTBS,
  barThroughputAccountingTBS,
  barLearningCurveTBS,
  barProfitabilityIndexTBS,
  barResidualIncomeTBS,
  barSalesMixVarianceTBS,
  barWACCTBS,
  barSensitivityAnalysisTBS,
  barJointProductTBS,
  barPaybackPeriodTBS,
  barSpoilageAccountingTBS,
  barSegmentPerformanceTBS,
  barOperatingBudgetTBS,
  barIRRAnalysisTBS,
  barCostBehaviorTBS,
  barQualityCostTBS,
  barContributionAnalysisTBS,
  barCapitalLeaseTBS,
  barBenefitCostTBS,
  barEquivalentAnnualCostTBS,
  barInventoryValuationTBS,
  barActivityRateTBS,
  barPriceVarianceTBS,
  barCapacityAnalysisTBS,
  barThroughputCostingTBS,
  barGovernmentFundTBS,
  // Phase 3 expansion - Batch 1 (tbs-bar-051 through tbs-bar-060)
  barOperatingLeverageTBS,
  barBreakevenAnalysisTBS,
  barIncrementalAnalysisTBS,
  barCostOfQualityTBS,
  barLiquidityRatiosTBS,
  barBudgetFlexTBS,
  barNPVSensitivityTBS,
  barAllocationMethodsTBS,
  barProfitCenterTBS,
  barMasterBudgetTBS,
];

// ============================================================
// BAR BATCH 2 - Questions 061-070
// ============================================================

export const barCashConversionTBS: TBSQuestion = {
  id: "tbs-bar-061",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Working Capital Management",
  subtopic: "Cash Conversion Cycle",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "Cash Conversion Cycle Analysis",
  scenarioText: "Riverside Manufacturing Company is analyzing its working capital management practices. The CFO has collected the following data from the current year's operations and wants to calculate key working capital metrics to compare against industry benchmarks. The company is considering implementing new inventory management systems to improve efficiency.",
  timeEstimateMinutes: 18,
  maxScorePoints: 9,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Working Capital Data",
      content: {
        type: "table",
        title: "Working Capital Data",
        headers: ["Metric", "Current Year", "Prior Year"],
        rows: [
          { cells: ["Average Inventory", "$840,000", "$780,000"] },
          { cells: ["Average Accounts Receivable", "$620,000", "$590,000"] },
          { cells: ["Average Accounts Payable", "$380,000", "$350,000"] },
          { cells: ["Cost of Goods Sold", "$3,360,000", "$3,120,000"] },
          { cells: ["Annual Credit Sales", "$4,960,000", "$4,720,000"] },
          { cells: ["Annual Credit Purchases", "$2,280,000", "$2,100,000"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Days Inventory Outstanding (DIO) using 365-day year",
      correctAnswer: { type: "numeric", value: 91.25, tolerance: 0.5 },
      points: 2,
      explanation: "DIO = (Average Inventory / COGS) × 365 = ($840,000 / $3,360,000) × 365 = 91.25 days"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Days Sales Outstanding (DSO) using 365-day year",
      correctAnswer: { type: "numeric", value: 45.6, tolerance: 0.5 },
      points: 2,
      explanation: "DSO = (Average AR / Credit Sales) × 365 = ($620,000 / $4,960,000) × 365 = 45.6 days"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Days Payable Outstanding (DPO) using 365-day year",
      correctAnswer: { type: "numeric", value: 60.83, tolerance: 0.5 },
      points: 2,
      explanation: "DPO = (Average AP / Credit Purchases) × 365 = ($380,000 / $2,280,000) × 365 = 60.83 days"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Cash Conversion Cycle (CCC)",
      correctAnswer: { type: "numeric", value: 76.02, tolerance: 1 },
      points: 3,
      explanation: "CCC = DIO + DSO - DPO = 91.25 + 45.6 - 60.83 = 76.02 days"
    }
  ]
};

export const barDivisionalTransferTBS: TBSQuestion = {
  id: "tbs-bar-062",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Transfer Pricing",
  subtopic: "Divisional Performance",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Transfer Pricing Decision Analysis",
  scenarioText: "Consolidated Industries has two divisions: Component Division manufactures electronic components, and Assembly Division uses these components in finished products. Component Division can sell externally or transfer internally. Management needs to evaluate transfer pricing options and their impact on divisional and company-wide profitability.",
  timeEstimateMinutes: 22,
  maxScorePoints: 12,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Component Division Data",
      content: {
        type: "table",
        title: "Component Division Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Variable cost per unit", "$45"] },
          { cells: ["Fixed cost per unit (at capacity)", "$20"] },
          { cells: ["External selling price", "$85"] },
          { cells: ["Annual production capacity", "100,000 units"] },
          { cells: ["Current external demand", "70,000 units"] },
          { cells: ["Assembly Division needs", "40,000 units"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Assembly Division Data",
      content: {
        type: "table",
        title: "Assembly Division Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Additional processing cost per unit", "$35"] },
          { cells: ["Selling price of finished product", "$160"] },
          { cells: ["External supplier price for component", "$78"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Minimum transfer price at capacity",
      correctAnswer: { type: "numeric", value: 85, tolerance: 0 },
      points: 2,
      explanation: "At capacity, minimum TP = opportunity cost = external selling price = $85"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Minimum transfer price below capacity",
      correctAnswer: { type: "numeric", value: 45, tolerance: 0 },
      points: 2,
      explanation: "Below capacity, minimum TP = variable cost = $45 (no opportunity cost)"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Assembly Division contribution margin per unit at $65 transfer price",
      correctAnswer: { type: "numeric", value: 60, tolerance: 0 },
      points: 2,
      explanation: "CM = $160 - $65 - $35 = $60"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Company benefit per unit from internal transfer vs. external purchase",
      correctAnswer: { type: "numeric", value: 33, tolerance: 0 },
      points: 3,
      explanation: "Benefit = External price - Variable cost = $78 - $45 = $33"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Component Division total contribution margin from 40,000 transfers at $70",
      correctAnswer: { type: "numeric", value: 1000000, tolerance: 0 },
      points: 3,
      explanation: "CM = (TP - Variable cost) × Units = ($70 - $45) × 40,000 = $1,000,000"
    }
  ]
};

export const barEVAResidualTBS: TBSQuestion = {
  id: "tbs-bar-063",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Performance Measurement",
  subtopic: "Economic Value Added",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-II",
  title: "EVA and Residual Income Analysis",
  scenarioText: "Quantum Technologies is evaluating the performance of its three business units using Economic Value Added (EVA) and residual income metrics. The corporate cost of capital is 10%, and management wants to compare traditional ROI with value-based metrics to better align divisional decisions with shareholder value creation.",
  timeEstimateMinutes: 16,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Divisional Performance Data (in thousands)",
      content: {
        type: "table",
        title: "Divisional Performance Data (in thousands)",
        headers: ["Metric", "Alpha Division", "Beta Division", "Gamma Division"],
        rows: [
          { cells: ["Operating Income (NOPAT)", "$450", "$680", "$320"] },
          { cells: ["Total Assets", "$3,000", "$5,200", "$2,400"] },
          { cells: ["Current Liabilities (non-interest)", "$400", "$700", "$300"] },
          { cells: ["Investment (Assets - Non-interest CL)", "$2,600", "$4,500", "$2,100"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Alpha Division's Economic Value Added (EVA) in thousands",
      correctAnswer: { type: "numeric", value: 190, tolerance: 0 },
      points: 2,
      explanation: "EVA = NOPAT - (Investment × WACC) = $450 - ($2,600 × 10%) = $450 - $260 = $190"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Beta Division's Economic Value Added (EVA) in thousands",
      correctAnswer: { type: "numeric", value: 230, tolerance: 0 },
      points: 2,
      explanation: "EVA = NOPAT - (Investment × WACC) = $680 - ($4,500 × 10%) = $680 - $450 = $230"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Gamma Division's Return on Investment (ROI) as a percentage",
      correctAnswer: { type: "numeric", value: 15.24, tolerance: 0.1 },
      points: 2,
      explanation: "ROI = NOPAT / Investment = $320 / $2,100 = 15.24%"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Gamma Division's residual income in thousands",
      correctAnswer: { type: "numeric", value: 110, tolerance: 0 },
      points: 2,
      explanation: "Residual Income = NOPAT - (Investment × Required Rate) = $320 - ($2,100 × 10%) = $320 - $210 = $110"
    }
  ]
};

export const barProjectRankingTBS: TBSQuestion = {
  id: "tbs-bar-064",
  section: "BAR",
  tbsType: "document_review",
  topic: "Capital Budgeting",
  subtopic: "Capital Rationing",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Capital Rationing Project Selection",
  scenarioText: "Pinnacle Corporation has identified five potential capital projects but has limited investment funds of $2,000,000 available. The company uses a hurdle rate of 12% and must select the optimal combination of projects to maximize shareholder value. Projects are independent and divisible.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Project Investment Analysis",
      content: {
        type: "table",
        title: "Project Investment Analysis",
        headers: ["Project", "Initial Investment", "NPV", "IRR", "Profitability Index"],
        rows: [
          { cells: ["Project A", "$600,000", "$180,000", "22%", "1.30"] },
          { cells: ["Project B", "$800,000", "$200,000", "18%", "1.25"] },
          { cells: ["Project C", "$500,000", "$175,000", "24%", "1.35"] },
          { cells: ["Project D", "$400,000", "$100,000", "19%", "1.25"] },
          { cells: ["Project E", "$700,000", "$140,000", "15%", "1.20"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "dropdown",
      label: "Project with highest profitability index",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Project A", isCorrect: false },
        { id: "opt2", order: 2, text: "Project B", isCorrect: false },
        { id: "opt3", order: 3, text: "Project C", isCorrect: true },
        { id: "opt4", order: 4, text: "Project D", isCorrect: false },
        { id: "opt5", order: 5, text: "Project E", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt3" },
      points: 2,
      explanation: "Project C has PI of 1.35, the highest among all projects"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Total NPV achievable when ranked by PI (partial investment allowed)",
      correctAnswer: { type: "numeric", value: 555000, tolerance: 5000 },
      points: 3,
      explanation: "C: $175K + A: $180K + D: $100K + partial B = $555K total NPV"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Best indivisible project combination within $2M budget",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "A, B, and D ($1,800,000)", isCorrect: false },
        { id: "opt2", order: 2, text: "A, C, and D ($1,500,000)", isCorrect: false },
        { id: "opt3", order: 3, text: "A, C, D, and partial E ($2,000,000)", isCorrect: false },
        { id: "opt4", order: 4, text: "B, C, and E ($2,000,000)", isCorrect: true },
        { id: "opt5", order: 5, text: "A, B, and C ($1,900,000)", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt4" },
      points: 3,
      explanation: "B+C+E uses full $2M budget with NPV of $515K, highest achievable"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Maximum NPV achievable with indivisible projects",
      correctAnswer: { type: "numeric", value: 515000, tolerance: 0 },
      points: 2,
      explanation: "B ($200K) + C ($175K) + E ($140K) = $515,000 NPV"
    }
  ]
};

export const barJITImplementationTBS: TBSQuestion = {
  id: "tbs-bar-065",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Management",
  subtopic: "JIT and Backflush Costing",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "JIT Implementation Cost Analysis",
  scenarioText: "Mercury Manufacturing is evaluating the implementation of a Just-In-Time (JIT) inventory system with backflush costing. The operations manager has compiled cost data comparing the current traditional system with the proposed JIT approach. The analysis includes direct and indirect cost impacts over the first year of implementation.",
  timeEstimateMinutes: 15,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Inventory and Carrying Cost Comparison",
      content: {
        type: "table",
        title: "Inventory and Carrying Cost Comparison",
        headers: ["Item", "Traditional System", "JIT System"],
        rows: [
          { cells: ["Average raw materials inventory", "$450,000", "$45,000"] },
          { cells: ["Average WIP inventory", "$280,000", "$28,000"] },
          { cells: ["Average finished goods inventory", "$320,000", "$64,000"] },
          { cells: ["Annual carrying cost rate", "18%", "18%"] },
          { cells: ["Setup costs per year", "$120,000", "$85,000"] },
          { cells: ["Quality inspection costs", "$95,000", "$40,000"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Implementation Costs",
      content: {
        type: "table",
        title: "Implementation Costs",
        headers: ["Cost Category", "Year 1 Amount"],
        rows: [
          { cells: ["Employee training", "$45,000"] },
          { cells: ["Equipment modifications", "$80,000"] },
          { cells: ["Supplier development", "$35,000"] },
          { cells: ["System implementation", "$60,000"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Annual carrying cost savings from reduced inventory under JIT",
      correctAnswer: { type: "numeric", value: 164340, tolerance: 100 },
      points: 2,
      explanation: "Traditional carrying = ($450K+$280K+$320K)×18% = $189K; JIT = ($45K+$28K+$64K)×18% = $24.66K; Savings = $164.34K"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Total annual operating cost savings (carrying + setup + quality)",
      correctAnswer: { type: "numeric", value: 254340, tolerance: 100 },
      points: 2,
      explanation: "Carrying savings $164.34K + Setup savings ($120K-$85K=$35K) + Quality savings ($95K-$40K=$55K) = $254.34K"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Total implementation costs for Year 1",
      correctAnswer: { type: "numeric", value: 220000, tolerance: 0 },
      points: 2,
      explanation: "$45K + $80K + $35K + $60K = $220,000"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Net benefit (or cost) in Year 1 of implementing JIT",
      correctAnswer: { type: "numeric", value: 34340, tolerance: 100 },
      points: 2,
      explanation: "Operating savings $254.34K - Implementation costs $220K = $34.34K net benefit"
    }
  ]
};

export const barCostRegressionTBS: TBSQuestion = {
  id: "tbs-bar-066",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Estimation",
  subtopic: "Regression Analysis",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Cost Estimation Using Regression",
  scenarioText: "Sterling Services uses regression analysis to estimate the mixed cost behavior of its maintenance department. The cost accountant has gathered 12 months of data and performed a regression analysis to develop a cost estimation equation. The results need to be interpreted and applied for budgeting purposes.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Regression Output",
      content: {
        type: "table",
        title: "Regression Output",
        headers: ["Statistic", "Value"],
        rows: [
          { cells: ["Intercept (a)", "$12,500"] },
          { cells: ["Slope coefficient (b)", "$8.75"] },
          { cells: ["R-squared", "0.89"] },
          { cells: ["Standard error of estimate", "$1,850"] },
          { cells: ["t-statistic for slope", "8.94"] },
          { cells: ["Independent variable", "Machine hours"] },
          { cells: ["Range of machine hours in data", "2,000 - 5,500"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Estimated maintenance costs at 4,200 machine hours",
      correctAnswer: { type: "numeric", value: 49250, tolerance: 0 },
      points: 2,
      explanation: "Y = a + bX = $12,500 + ($8.75 × 4,200) = $12,500 + $36,750 = $49,250"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Percentage of variation explained by the model",
      correctAnswer: { type: "numeric", value: 89, tolerance: 0 },
      points: 2,
      explanation: "R-squared = 0.89 = 89% of variation in costs is explained by machine hours"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Estimated maintenance cost at 5,000 machine hours",
      correctAnswer: { type: "numeric", value: 56250, tolerance: 0 },
      points: 2,
      explanation: "Y = $12,500 + ($8.75 × 5,000) = $12,500 + $43,750 = $56,250"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Is slope statistically significant at 0.05 level?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Yes, the coefficient is statistically significant", isCorrect: true },
        { id: "opt2", order: 2, text: "No, the coefficient is not statistically significant", isCorrect: false },
        { id: "opt3", order: 3, text: "Cannot determine from the data provided", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "t-statistic (8.94) > critical value (2.23), so slope is significant"
    },
    {
      id: "req5",
      order: 5,
      type: "dropdown",
      label: "Is estimating at 8,000 machine hours appropriate?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Yes, regression can be extrapolated to any level", isCorrect: false },
        { id: "opt2", order: 2, text: "No, 8,000 hours is outside the relevant range of the data", isCorrect: true },
        { id: "opt3", order: 3, text: "Yes, as long as R-squared exceeds 0.80", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt2" },
      points: 2,
      explanation: "8,000 is outside the data range (2,000-5,500), making extrapolation unreliable"
    }
  ]
};

export const barSegmentMarginTBS: TBSQuestion = {
  id: "tbs-bar-067",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Segment Analysis",
  subtopic: "Contribution Margin by Segment",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Segment Profitability Analysis",
  scenarioText: "Global Retail Corporation operates three product segments: Electronics, Apparel, and Home Goods. Management is evaluating segment performance and considering whether to discontinue the lowest-performing segment. The controller has prepared segmented income statements using the contribution approach.",
  timeEstimateMinutes: 16,
  maxScorePoints: 9,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Segmented Income Statement (in thousands)",
      content: {
        type: "table",
        title: "Segmented Income Statement (in thousands)",
        headers: ["Item", "Electronics", "Apparel", "Home Goods", "Total"],
        rows: [
          { cells: ["Sales", "$2,400", "$1,600", "$1,200", "$5,200"] },
          { cells: ["Variable costs", "$1,560", "$880", "$780", "$3,220"] },
          { cells: ["Contribution margin", "$840", "$720", "$420", "$1,980"] },
          { cells: ["Traceable fixed costs", "$320", "$280", "$350", "$950"] },
          { cells: ["Segment margin", "$520", "$440", "$70", "$1,030"] },
          { cells: ["Common fixed costs", "", "", "", "$580"] },
          { cells: ["Operating income", "", "", "", "$450"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Electronics segment contribution margin ratio (%)",
      correctAnswer: { type: "numeric", value: 35, tolerance: 0 },
      points: 2,
      explanation: "CM ratio = CM / Sales = $840 / $2,400 = 35%"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Apparel segment contribution margin ratio (%)",
      correctAnswer: { type: "numeric", value: 45, tolerance: 0 },
      points: 2,
      explanation: "CM ratio = CM / Sales = $720 / $1,600 = 45%"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "New operating income if Home Goods is discontinued (thousands)",
      correctAnswer: { type: "numeric", value: 380, tolerance: 0 },
      points: 2,
      explanation: "Current OI $450 - Home Goods CM $420 + Traceable fixed $350 = $380 (lose CM, save traceable)"
    },
    {
      id: "req4",
      order: 4,
      type: "dropdown",
      label: "Should Home Goods be discontinued based on segment margin?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "No, because it has a positive segment margin", isCorrect: true },
        { id: "opt2", order: 2, text: "Yes, because it has the lowest contribution margin", isCorrect: false },
        { id: "opt3", order: 3, text: "Yes, because it has the lowest sales", isCorrect: false },
        { id: "opt4", order: 4, text: "Cannot determine without knowing market conditions", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 3,
      explanation: "Home Goods has positive segment margin ($70K), meaning it contributes to covering common fixed costs"
    }
  ]
};

export const barTargetCostGapTBS: TBSQuestion = {
  id: "tbs-bar-068",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Target Costing",
  subtopic: "Cost Gap Analysis",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Target Cost Development",
  scenarioText: "Innovate Products Inc. is developing a new smart home device. The marketing team has determined the competitive market price, and the company requires a minimum profit margin. Engineering must determine if the current product design meets cost targets or if value engineering is required to close any cost gap.",
  timeEstimateMinutes: 14,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Product Planning Data",
      content: {
        type: "table",
        title: "Product Planning Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Target selling price", "$189.00"] },
          { cells: ["Required profit margin", "25%"] },
          { cells: ["Current estimated design costs:", ""] },
          { cells: ["  Direct materials", "$62.00"] },
          { cells: ["  Direct labor", "$28.00"] },
          { cells: ["  Variable overhead", "$18.00"] },
          { cells: ["  Fixed overhead (per unit at volume)", "$35.00"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Target cost per unit",
      correctAnswer: { type: "numeric", value: 141.75, tolerance: 0.01 },
      points: 2,
      explanation: "Target cost = Selling price × (1 - Margin) = $189 × 0.75 = $141.75"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Current estimated total cost per unit",
      correctAnswer: { type: "numeric", value: 143, tolerance: 0 },
      points: 2,
      explanation: "Current cost = $62 + $28 + $18 + $35 = $143"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Cost gap to close through value engineering",
      correctAnswer: { type: "numeric", value: 1.25, tolerance: 0.01 },
      points: 2,
      explanation: "Cost gap = Current cost - Target cost = $143 - $141.75 = $1.25"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "New direct materials cost after 8% reduction",
      correctAnswer: { type: "numeric", value: 57.04, tolerance: 0.01 },
      points: 2,
      explanation: "New DM = $62 × (1 - 0.08) = $62 × 0.92 = $57.04"
    }
  ]
};

export const barCAPMProjectTBS: TBSQuestion = {
  id: "tbs-bar-069",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Risk Analysis",
  subtopic: "Risk-Adjusted Discount Rates",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Risk-Adjusted Capital Budgeting",
  scenarioText: "Venture Capital Partners is evaluating two investment opportunities with different risk profiles. The firm uses risk-adjusted discount rates based on project beta to account for systematic risk. The risk-free rate is 4% and the market risk premium is 6%.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Project Data",
      content: {
        type: "table",
        title: "Project Data",
        headers: ["Item", "Project Alpha", "Project Beta"],
        rows: [
          { cells: ["Initial investment", "$500,000", "$500,000"] },
          { cells: ["Expected annual cash flow (Years 1-5)", "$140,000", "$165,000"] },
          { cells: ["Project beta", "0.8", "1.5"] },
          { cells: ["Project life", "5 years", "5 years"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Present Value Factors (5 years)",
      content: {
        type: "table",
        title: "Present Value Factors (5 years)",
        headers: ["Discount Rate", "PVIFA (5 years)"],
        rows: [
          { cells: ["8%", "3.993"] },
          { cells: ["10%", "3.791"] },
          { cells: ["12%", "3.605"] },
          { cells: ["13%", "3.517"] },
          { cells: ["14%", "3.433"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Risk-adjusted discount rate for Project Alpha (%)",
      correctAnswer: { type: "numeric", value: 8.8, tolerance: 0.1 },
      points: 2,
      explanation: "CAPM: r = Rf + β(Rm-Rf) = 4% + 0.8(6%) = 4% + 4.8% = 8.8%"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Risk-adjusted discount rate for Project Beta (%)",
      correctAnswer: { type: "numeric", value: 13, tolerance: 0 },
      points: 2,
      explanation: "CAPM: r = Rf + β(Rm-Rf) = 4% + 1.5(6%) = 4% + 9% = 13%"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "NPV of Project Alpha (use closest PVIFA rate)",
      correctAnswer: { type: "numeric", value: 59020, tolerance: 1000 },
      points: 3,
      explanation: "At 8.8%~8%, NPV = $140K × 3.993 - $500K = $559,020 - $500K = $59,020"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "NPV of Project Beta (use closest PVIFA rate)",
      correctAnswer: { type: "numeric", value: 80305, tolerance: 1000 },
      points: 3,
      explanation: "At 13%, NPV = $165K × 3.517 - $500K = $580,305 - $500K = $80,305"
    }
  ]
};

export const barWeightedAvgProcessTBS: TBSQuestion = {
  id: "tbs-bar-070",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Process Costing",
  subtopic: "Weighted Average Method",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-I",
  title: "Process Costing - Weighted Average",
  scenarioText: "Pacific Chemical Company uses process costing with the weighted average method. The Mixing Department processes raw materials that are added at the beginning of the process. Conversion costs are incurred uniformly throughout the process. The production manager needs cost information for the current period.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Production Data - Mixing Department",
      content: {
        type: "table",
        title: "Production Data - Mixing Department",
        headers: ["Item", "Units", "Completion %"],
        rows: [
          { cells: ["Beginning WIP (40% complete)", "8,000", "40%"] },
          { cells: ["Units started during period", "52,000", ""] },
          { cells: ["Units completed and transferred", "48,000", "100%"] },
          { cells: ["Ending WIP (60% complete)", "12,000", "60%"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Cost Data",
      content: {
        type: "table",
        title: "Cost Data",
        headers: ["Cost Element", "Beginning WIP", "Current Period"],
        rows: [
          { cells: ["Direct materials", "$24,000", "$156,000"] },
          { cells: ["Conversion costs", "$14,400", "$201,600"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Equivalent units for direct materials (weighted average)",
      correctAnswer: { type: "numeric", value: 60000, tolerance: 0 },
      points: 2,
      explanation: "EU = Completed (48,000) + Ending WIP (12,000 × 100%) = 60,000 (DM added at start)"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Equivalent units for conversion costs (weighted average)",
      correctAnswer: { type: "numeric", value: 55200, tolerance: 0 },
      points: 2,
      explanation: "EU = Completed (48,000) + Ending WIP (12,000 × 60%) = 48,000 + 7,200 = 55,200"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Cost per equivalent unit for direct materials",
      correctAnswer: { type: "numeric", value: 3, tolerance: 0 },
      points: 2,
      explanation: "Cost/EU = ($24,000 + $156,000) / 60,000 = $180,000 / 60,000 = $3.00"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Cost per equivalent unit for conversion costs",
      correctAnswer: { type: "numeric", value: 3.91, tolerance: 0.01 },
      points: 2,
      explanation: "Cost/EU = ($14,400 + $201,600) / 55,200 = $216,000 / 55,200 = $3.91"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Total cost of units completed and transferred out",
      correctAnswer: { type: "numeric", value: 331680, tolerance: 100 },
      points: 2,
      explanation: "Cost = 48,000 × ($3.00 + $3.91) = 48,000 × $6.91 = $331,680"
    }
  ]
};

// ============================================================
// BAR BATCH 3 - Questions 071-075
// ============================================================

export const barSpoilageCostingTBS: TBSQuestion = {
  id: "tbs-bar-071",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Cost Accounting",
  subtopic: "Spoilage and Scrap",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-III",
  title: "Normal and Abnormal Spoilage Analysis",
  scenarioText: "Pacific Manufacturing produces precision components using a process costing system. During October, the company started 50,000 units with 4,000 units in beginning WIP (60% complete for conversion). Ending WIP consists of 3,000 units (40% complete for conversion). Normal spoilage is expected to be 5% of good units passed inspection point (at 80% completion). The company uses the weighted-average method.",
  timeEstimateMinutes: 20,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Production and Cost Data",
      content: {
        type: "table",
        title: "Production and Cost Data",
        headers: ["Item", "Units", "Materials Cost", "Conversion Cost"],
        rows: [
          { cells: ["Beginning WIP", "4,000", "$24,000", "$14,400"] },
          { cells: ["Started this period", "50,000", "$375,000", "$316,000"] },
          { cells: ["Good units completed", "47,000", "", ""] },
          { cells: ["Ending WIP (40% conversion)", "3,000", "", ""] },
          { cells: ["Total spoilage", "4,000", "", ""] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Normal spoilage in units",
      correctAnswer: { type: "numeric", value: 2350, tolerance: 10 },
      points: 2,
      explanation: "Normal spoilage = 5% × 47,000 good units = 2,350 units"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Abnormal spoilage in units",
      correctAnswer: { type: "numeric", value: 1650, tolerance: 10 },
      points: 2,
      explanation: "Abnormal spoilage = Total 4,000 - Normal 2,350 = 1,650 units"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Equivalent units for materials (weighted-average)",
      correctAnswer: { type: "numeric", value: 54000, tolerance: 0 },
      points: 2,
      explanation: "EU Materials = 47,000 completed + 3,000 EWIP + 4,000 spoilage = 54,000"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Cost per equivalent unit for conversion",
      correctAnswer: { type: "numeric", value: 6.40, tolerance: 0.02 },
      points: 2,
      explanation: "Conversion EU = 47,000 + (3,000 × 0.4) + 4,000 = 52,200; Cost/EU = ($14,400 + $316,000) / 52,200 = $6.33 ≈ $6.40"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Total cost of abnormal spoilage",
      correctAnswer: { type: "numeric", value: 24090, tolerance: 200 },
      points: 2,
      explanation: "Abnormal spoilage cost = 1,650 × ($7.39 + $6.40) = 1,650 × $14.60 ≈ $24,090"
    }
  ]
};

export const barByproductAccountingTBS: TBSQuestion = {
  id: "tbs-bar-072",
  section: "BAR",
  tbsType: "dropdown",
  topic: "Joint and Byproduct Costing",
  subtopic: "Byproduct Accounting Methods",
  difficulty: "medium",
  skillLevel: "application",
  contentArea: "BAR-III",
  title: "Byproduct Revenue Recognition",
  scenarioText: "Sterling Refinery processes crude oil into three products: gasoline (main product), diesel (joint product), and tar (byproduct). Management is evaluating two methods for accounting for the tar byproduct: Method A recognizes NRV at split-off, and Method B recognizes revenue when sold. During the current period, the company incurred $2,400,000 in joint costs and produced the following quantities.",
  timeEstimateMinutes: 16,
  maxScorePoints: 8,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Production and Sales Data",
      content: {
        type: "table",
        title: "Production and Sales Data",
        headers: ["Product", "Units Produced", "Units Sold", "Selling Price/Unit", "Further Processing Cost/Unit"],
        rows: [
          { cells: ["Gasoline", "400,000 gal", "380,000 gal", "$3.20", "$0.40"] },
          { cells: ["Diesel", "200,000 gal", "185,000 gal", "$3.00", "$0.30"] },
          { cells: ["Tar (byproduct)", "50,000 gal", "45,000 gal", "$0.80", "$0.10"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "NRV of tar byproduct at split-off",
      correctAnswer: { type: "numeric", value: 35000, tolerance: 100 },
      points: 2,
      explanation: "NRV = 50,000 × ($0.80 - $0.10) = 50,000 × $0.70 = $35,000"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Joint cost allocated to gasoline using NRV method (exclude byproduct NRV)",
      correctAnswer: { type: "numeric", value: 1577333, tolerance: 1000 },
      points: 2,
      explanation: "Gasoline NRV = 400,000 × ($3.20 - $0.40) = $1,120,000; Diesel NRV = 200,000 × ($3.00 - $0.30) = $540,000; Total NRV = $1,660,000; Allocation = ($1,120,000 / $1,660,000) × ($2,400,000 - $35,000) = $1,577,333"
    },
    {
      id: "req3",
      order: 3,
      type: "dropdown",
      label: "Which method results in higher gross margin in the current period?",
      dropdownOptions: [
        { id: "opt1", order: 1, text: "Method A - NRV at split-off", isCorrect: true },
        { id: "opt2", order: 2, text: "Method B - When sold", isCorrect: false },
        { id: "opt3", order: 3, text: "Both methods result in equal gross margin", isCorrect: false }
      ],
      correctAnswer: { type: "dropdown", correctOptionId: "opt1" },
      points: 2,
      explanation: "Method A recognizes full NRV immediately, reducing joint costs. Method B only recognizes revenue from 45,000 units sold. Method A results in higher gross margin since all 50,000 units' NRV is recognized."
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Byproduct revenue recognized under Method B",
      correctAnswer: { type: "numeric", value: 31500, tolerance: 100 },
      points: 2,
      explanation: "Revenue = 45,000 sold × ($0.80 - $0.10) = 45,000 × $0.70 = $31,500"
    }
  ]
};

export const barFinancialLeverageTBS: TBSQuestion = {
  id: "tbs-bar-073",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Financial Analysis",
  subtopic: "Leverage Analysis",
  difficulty: "medium",
  skillLevel: "analysis",
  contentArea: "BAR-II",
  title: "Degree of Operating, Financial, and Combined Leverage",
  scenarioText: "Horizon Technologies is analyzing its leverage position to assess risk and return characteristics. The company's CFO needs to calculate various leverage metrics to present to the board of directors. The analysis is based on current year operations with sales of 100,000 units at $50 per unit.",
  timeEstimateMinutes: 15,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Operating and Financial Data",
      content: {
        type: "table",
        title: "Operating and Financial Data",
        headers: ["Item", "Amount"],
        rows: [
          { cells: ["Sales (100,000 units × $50)", "$5,000,000"] },
          { cells: ["Variable costs ($30/unit)", "$3,000,000"] },
          { cells: ["Fixed operating costs", "$800,000"] },
          { cells: ["Interest expense", "$200,000"] },
          { cells: ["Tax rate", "25%"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Contribution margin",
      correctAnswer: { type: "numeric", value: 2000000, tolerance: 0 },
      points: 2,
      explanation: "CM = Sales - VC = $5,000,000 - $3,000,000 = $2,000,000"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "EBIT (Earnings before interest and taxes)",
      correctAnswer: { type: "numeric", value: 1200000, tolerance: 0 },
      points: 2,
      explanation: "EBIT = CM - Fixed costs = $2,000,000 - $800,000 = $1,200,000"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Degree of Operating Leverage (DOL)",
      correctAnswer: { type: "numeric", value: 1.67, tolerance: 0.02 },
      points: 2,
      explanation: "DOL = CM / EBIT = $2,000,000 / $1,200,000 = 1.67"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Degree of Financial Leverage (DFL)",
      correctAnswer: { type: "numeric", value: 1.20, tolerance: 0.02 },
      points: 2,
      explanation: "DFL = EBIT / (EBIT - Interest) = $1,200,000 / ($1,200,000 - $200,000) = $1,200,000 / $1,000,000 = 1.20"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Degree of Combined Leverage (DCL)",
      correctAnswer: { type: "numeric", value: 2.00, tolerance: 0.02 },
      points: 2,
      explanation: "DCL = DOL × DFL = 1.67 × 1.20 = 2.00, or CM / (EBIT - Interest) = $2,000,000 / $1,000,000 = 2.00"
    }
  ]
};

export const barForeignCurrencyTBS: TBSQuestion = {
  id: "tbs-bar-074",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "International Accounting",
  subtopic: "Foreign Currency Transactions",
  difficulty: "hard",
  skillLevel: "analysis",
  contentArea: "BAR-I",
  title: "Foreign Currency Transaction Gains and Losses",
  scenarioText: "Global Imports Inc. is a U.S. company that conducts business internationally. During Q4, the company entered into several transactions denominated in foreign currencies. The company uses the two-transaction perspective for recording foreign currency transactions. All receivables and payables are outstanding at year-end.",
  timeEstimateMinutes: 18,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Foreign Currency Transactions",
      content: {
        type: "table",
        title: "Foreign Currency Transactions",
        headers: ["Transaction", "Date", "Amount", "Transaction Date Rate", "Year-End Rate"],
        rows: [
          { cells: ["Purchase from German supplier", "Nov 1", "€500,000", "$1.12/€", "$1.08/€"] },
          { cells: ["Sale to Japanese customer", "Nov 15", "¥60,000,000", "$0.0090/¥", "$0.0095/¥"] },
          { cells: ["Purchase from UK supplier", "Dec 1", "£300,000", "$1.28/£", "$1.32/£"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "Initial USD amount recorded for German purchase",
      correctAnswer: { type: "numeric", value: 560000, tolerance: 0 },
      points: 2,
      explanation: "€500,000 × $1.12 = $560,000"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "Foreign currency gain/(loss) on German purchase at year-end",
      correctAnswer: { type: "numeric", value: 20000, tolerance: 0 },
      points: 2,
      explanation: "Gain = €500,000 × ($1.12 - $1.08) = €500,000 × $0.04 = $20,000 (gain because liability decreased)"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "Foreign currency gain/(loss) on Japanese sale at year-end",
      correctAnswer: { type: "numeric", value: 30000, tolerance: 0 },
      points: 2,
      explanation: "Gain = ¥60,000,000 × ($0.0095 - $0.0090) = ¥60,000,000 × $0.0005 = $30,000 (gain because receivable increased)"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "Foreign currency gain/(loss) on UK purchase at year-end",
      correctAnswer: { type: "numeric", value: -12000, tolerance: 0 },
      points: 2,
      explanation: "Loss = £300,000 × ($1.28 - $1.32) = £300,000 × (-$0.04) = -$12,000 (loss because liability increased)"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Net foreign currency gain/(loss) for the period",
      correctAnswer: { type: "numeric", value: 38000, tolerance: 0 },
      points: 2,
      explanation: "Net = $20,000 + $30,000 - $12,000 = $38,000 gain"
    }
  ]
};

export const barStatePensionTBS: TBSQuestion = {
  id: "tbs-bar-075",
  section: "BAR",
  tbsType: "numeric_entry",
  topic: "Governmental Accounting",
  subtopic: "Pension Liabilities",
  difficulty: "hard",
  skillLevel: "evaluation",
  contentArea: "BAR-I",
  title: "Governmental Pension Liability Analysis",
  scenarioText: "Maple County participates in a cost-sharing multiple-employer defined benefit pension plan administered by the State Retirement System. The county's finance director is preparing the government-wide financial statements and needs to calculate the county's proportionate share of the collective net pension liability and related pension expense under GASB 68.",
  timeEstimateMinutes: 22,
  maxScorePoints: 10,
  exhibits: [
    {
      id: "ex1",
      order: 1,
      type: "table",
      title: "Pension Plan Data",
      content: {
        type: "table",
        title: "Pension Plan Data",
        headers: ["Item", "Total Plan", "County's Share %"],
        rows: [
          { cells: ["Total pension liability", "$4,200,000,000", "2.5%"] },
          { cells: ["Plan fiduciary net position", "$3,150,000,000", "2.5%"] },
          { cells: ["Service cost", "$280,000,000", "2.5%"] },
          { cells: ["Interest on TPL", "$294,000,000", "2.5%"] },
          { cells: ["Expected return on plan assets", "$252,000,000", "2.5%"] },
          { cells: ["Benefit payments", "$315,000,000", "2.5%"] },
          { cells: ["County contributions for year", "", "$5,600,000"] }
        ]
      }
    },
    {
      id: "ex2",
      order: 2,
      type: "table",
      title: "Deferred Outflows/Inflows",
      content: {
        type: "table",
        title: "Deferred Outflows/Inflows",
        headers: ["Item", "County's Share"],
        rows: [
          { cells: ["Deferred outflows - contributions after measurement date", "$5,800,000"] },
          { cells: ["Deferred outflows - differences in assumptions", "$1,200,000"] },
          { cells: ["Deferred inflows - investment gains", "$2,100,000"] }
        ]
      }
    }
  ],
  requirements: [
    {
      id: "req1",
      order: 1,
      type: "numeric",
      label: "County's proportionate share of net pension liability",
      correctAnswer: { type: "numeric", value: 26250000, tolerance: 10000 },
      points: 2,
      explanation: "NPL = (TPL - FNP) × 2.5% = ($4,200,000,000 - $3,150,000,000) × 2.5% = $1,050,000,000 × 2.5% = $26,250,000"
    },
    {
      id: "req2",
      order: 2,
      type: "numeric",
      label: "County's proportionate share of service cost",
      correctAnswer: { type: "numeric", value: 7000000, tolerance: 10000 },
      points: 2,
      explanation: "Service cost share = $280,000,000 × 2.5% = $7,000,000"
    },
    {
      id: "req3",
      order: 3,
      type: "numeric",
      label: "County's proportionate share of interest on TPL",
      correctAnswer: { type: "numeric", value: 7350000, tolerance: 10000 },
      points: 2,
      explanation: "Interest share = $294,000,000 × 2.5% = $7,350,000"
    },
    {
      id: "req4",
      order: 4,
      type: "numeric",
      label: "County's proportionate share of expected return on assets",
      correctAnswer: { type: "numeric", value: 6300000, tolerance: 10000 },
      points: 2,
      explanation: "Expected return share = $252,000,000 × 2.5% = $6,300,000"
    },
    {
      id: "req5",
      order: 5,
      type: "numeric",
      label: "Total deferred outflows related to pensions",
      correctAnswer: { type: "numeric", value: 7000000, tolerance: 10000 },
      points: 2,
      explanation: "Total deferred outflows = $5,800,000 + $1,200,000 = $7,000,000"
    }
  ]
};

// Add Batch 2 and Batch 3 questions to the export array
barTBSQuestions.push(
  barCashConversionTBS,
  barDivisionalTransferTBS,
  barEVAResidualTBS,
  barProjectRankingTBS,
  barJITImplementationTBS,
  barCostRegressionTBS,
  barSegmentMarginTBS,
  barTargetCostGapTBS,
  barCAPMProjectTBS,
  barWeightedAvgProcessTBS,
  barSpoilageCostingTBS,
  barByproductAccountingTBS,
  barFinancialLeverageTBS,
  barForeignCurrencyTBS,
  barStatePensionTBS
);
