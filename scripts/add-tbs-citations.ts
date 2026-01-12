/**
 * TBS Citation Enhancement Script
 *
 * This script adds authoritative citations to TBS explanations based on topic/subtopic patterns.
 * Run with: npx tsx scripts/add-tbs-citations.ts
 */

import * as fs from 'fs';
import * as path from 'path';

// Citation mappings by section and topic
const FAR_CITATIONS: Record<string, string> = {
  // Leases
  'Lessee Accounting - Operating Lease': 'Per ASC 842-20-25, ',
  'Lessee Accounting - Finance Lease': 'Per ASC 842-20-25, ',
  'Lease Modifications': 'Per ASC 842-10-25-8, ',
  'Lease Classification': 'Per ASC 842-10-25-2, ',
  'Sale-Leaseback': 'Per ASC 842-40, ',

  // Consolidations
  'Intercompany Eliminations': 'Per ASC 810-10-45, ',
  'Noncontrolling Interest': 'Per ASC 810-10-45-16, ',
  'Variable Interest Entities': 'Per ASC 810-10-25, ',
  'Equity Method': 'Per ASC 323-10-35, ',

  // Revenue Recognition
  'Five-Step Model': 'Per ASC 606-10-25, ',
  'Performance Obligations': 'Per ASC 606-10-25-14, ',
  'Transaction Price': 'Per ASC 606-10-32, ',
  'Contract Modifications': 'Per ASC 606-10-25-10, ',
  'Variable Consideration': 'Per ASC 606-10-32-5, ',

  // Pensions
  'Pension Expense': 'Per ASC 715-30-35, ',
  'Pension Accounting': 'Per ASC 715-30, ',
  'OPEB': 'Per ASC 715-60, ',

  // Government
  'Fund Balance Classification': 'Per GASB 54, ',
  'Modified Accrual': 'Per GASB 33, ',
  'Revenue Recognition': 'Per ASC 606-10-25, ',

  // Income Taxes
  'Deferred Taxes': 'Per ASC 740-10-25, ',
  'Temporary Differences': 'Per ASC 740-10-25-20, ',
  'Valuation Allowance': 'Per ASC 740-10-30-5, ',
  'Tax Provision': 'Per ASC 740-10, ',

  // Subsequent Events
  'Recognition and Disclosure': 'Per ASC 855-10-25, ',
  'Subsequent Events': 'Per ASC 855-10-25, ',

  // Contingencies
  'Loss Contingencies': 'Per ASC 450-20-25, ',
  'Gain Contingencies': 'Per ASC 450-30, ',

  // Financial Instruments
  'Debt Securities': 'Per ASC 320-10-35, ',
  'Equity Securities': 'Per ASC 321-10-35, ',
  'Fair Value': 'Per ASC 820-10, ',
  'Impairment': 'Per ASC 326-20, ',

  // PPE and Intangibles
  'Depreciation': 'Per ASC 360-10-35, ',
  'Asset Retirement Obligations': 'Per ASC 410-20, ',
  'Goodwill Impairment': 'Per ASC 350-20-35, ',
  'Intangible Amortization': 'Per ASC 350-30-35, ',

  // Business Combinations
  'Acquisition Method': 'Per ASC 805-10-25, ',
  'Purchase Price Allocation': 'Per ASC 805-20-25, ',

  // Stock Compensation
  'Stock Options': 'Per ASC 718-10-30, ',
  'Restricted Stock': 'Per ASC 718-10-35, ',

  // Inventory
  'Lower of Cost or NRV': 'Per ASC 330-10-35, ',
  'Inventory Valuation': 'Per ASC 330-10, ',

  // Earnings Per Share
  'Basic EPS': 'Per ASC 260-10-45, ',
  'Diluted EPS': 'Per ASC 260-10-45-16, ',
};

const AUD_CITATIONS: Record<string, string> = {
  // Risk Assessment
  'Risk Assessment': 'Per AU-C 315, ',
  'Audit Risk Model': 'Per AU-C 315.05, ',
  'Materiality': 'Per AU-C 320, ',

  // Fraud
  'Fraud Risk Assessment': 'Per AU-C 240, ',
  'Fraud Consideration': 'Per AU-C 240, ',

  // Evidence
  'Audit Evidence': 'Per AU-C 500, ',
  'Substantive Procedures': 'Per AU-C 330, ',
  'Analytical Procedures': 'Per AU-C 520, ',

  // Sampling
  'Audit Sampling': 'Per AU-C 530, ',
  'Sampling': 'Per AU-C 530, ',

  // Internal Control
  'Control Deficiency Evaluation': 'Per AU-C 265, ',
  'Internal Controls': 'Per AU-C 315, ',
  'ICFR': 'Per AS 2201, ',

  // Reports
  'Audit Reports': 'Per AU-C 700, ',
  'Modified Opinions': 'Per AU-C 705, ',
  'Emphasis of Matter': 'Per AU-C 706, ',

  // Engagement
  'Engagement Acceptance': 'Per AU-C 210, ',
  'Engagement Letter Requirements': 'Per AU-C 210, ',

  // Documentation
  'Audit Documentation': 'Per AU-C 230, ',
  'Working Papers': 'Per AU-C 230, ',

  // Attorney Letters
  'Attorney Inquiry Letters': 'Per AU-C 501, ',

  // Subsequent Events (Audit)
  'Subsequent Events': 'Per AU-C 560, ',

  // Group Audits
  'Group Audits': 'Per AU-C 600, ',
  'Component Auditors': 'Per AU-C 600, ',

  // Related Parties
  'Related Parties': 'Per AU-C 550, ',

  // SSARS
  'Compilation': 'Per AR-C 80, ',
  'Review Engagements': 'Per AR-C 90, ',
};

const REG_CITATIONS: Record<string, string> = {
  // Individual Tax
  'Gross Income': 'Per IRC §61, ',
  'Above-the-Line Deductions': 'Per IRC §62, ',
  'Itemized Deductions': 'Per IRC §63, ',
  'Standard Deduction': 'Per IRC §63(c), ',
  'Personal Exemptions': 'Per IRC §151, ',

  // Property Transactions
  'Capital Gains': 'Per IRC §1001, ',
  'Section 1231': 'Per IRC §1231, ',
  'Like-Kind Exchanges': 'Per IRC §1031, ',
  'Installment Sales': 'Per IRC §453, ',
  'Wash Sales': 'Per IRC §1091, ',

  // Depreciation
  'Depreciation': 'Per IRC §168, ',
  'Section 179': 'Per IRC §179, ',
  'Bonus Depreciation': 'Per IRC §168(k), ',

  // Business Entities
  'Partnership Formation': 'Per IRC §721, ',
  'Partnership Distributions': 'Per IRC §731, ',
  'Partnership Basis': 'Per IRC §722, ',
  'S Corporation': 'Per IRC §1361, ',
  'S Corp Election': 'Per IRC §1362, ',
  'C Corporation': 'Per IRC §11, ',

  // At-Risk and Passive
  'At-Risk Rules': 'Per IRC §465, ',
  'Passive Activity': 'Per IRC §469, ',

  // Ethics
  'Circular 230': 'Per Circular 230 §10, ',
  'Preparer Penalties': 'Per IRC §6694, ',

  // Business Law
  'Contracts': 'Per common law and UCC, ',
  'Agency': 'Per common law, ',
  'Debtor-Creditor': 'Per UCC Article 9, ',
  'Bankruptcy': 'Per 11 USC, ',
};

const TCP_CITATIONS: Record<string, string> = {
  // International
  'Controlled Foreign Corporations': 'Per IRC §951, ',
  'GILTI': 'Per IRC §951A, ',
  'Subpart F': 'Per IRC §954, ',
  'Section 250 Deduction': 'Per IRC §250, ',
  'FDII': 'Per IRC §250(b), ',
  'Foreign Tax Credit': 'Per IRC §901, ',

  // Estate and Gift
  'Gift Tax': 'Per IRC §2501, ',
  'Annual Exclusion': 'Per IRC §2503(b), ',
  'Estate Tax': 'Per IRC §2001, ',
  'Unified Credit': 'Per IRC §2010, ',
  'Marital Deduction': 'Per IRC §2056, ',

  // Retirement
  'Qualified Plans': 'Per IRC §401, ',
  '401(k) Plans': 'Per IRC §401(k), ',
  'IRA Contributions': 'Per IRC §219, ',
  'Required Distributions': 'Per IRC §401(a)(9), ',

  // Entity Selection
  'Entity Selection': 'Per IRC §§1-1399, ',
  'Tax Planning': 'Per applicable IRC sections, ',

  // State Tax
  'State Residency': 'Per state tax statutes, ',
  'Nexus': 'Per state tax statutes, ',
  'Apportionment': 'Per UDITPA, ',
};

const BAR_CITATIONS: Record<string, string> = {
  // Cost Accounting
  'Cost Behavior': 'Per management accounting principles, ',
  'Cost-Volume-Profit': 'Per management accounting principles, ',
  'Job Order Costing': 'Per ASC 330, ',
  'Process Costing': 'Per ASC 330, ',
  'Variance Analysis': 'Per management accounting principles, ',

  // Financial Analysis
  'Ratio Analysis': 'Using standard financial ratios, ',
  'Financial Statement Analysis': 'Per financial analysis principles, ',

  // Budgeting
  'Master Budget': 'Per management accounting principles, ',
  'Flexible Budgets': 'Per management accounting principles, ',

  // Capital Budgeting
  'NPV Analysis': 'Per capital budgeting principles, ',
  'IRR Analysis': 'Per capital budgeting principles, ',

  // Risk Management
  'Internal Controls': 'Per COSO Framework, ',
  'Risk Assessment': 'Per COSO ERM, ',
  'Enterprise Risk': 'Per COSO ERM 2017, ',
};

const ISC_CITATIONS: Record<string, string> = {
  // IT Controls
  'IT General Controls': 'Per COSO Framework, ',
  'Access Controls': 'Per COSO Principle 11, ',
  'Change Management': 'Per COSO Principle 11, ',
  'Program Changes': 'Per COSO Principle 11, ',

  // SOC Reports
  'SOC Reports': 'Per AICPA Trust Services Criteria, ',
  'SOC 1': 'Per SSAE 18, ',
  'SOC 2': 'Per AICPA TSC, ',

  // Cybersecurity
  'Cybersecurity': 'Per NIST Cybersecurity Framework, ',
  'Network Security': 'Per security best practices, ',
  'Data Security': 'Per AICPA TSC CC6, ',

  // Business Continuity
  'Business Continuity': 'Per business continuity standards, ',
  'Disaster Recovery': 'Per business continuity standards, ',

  // Data Analytics
  'Data Analytics': 'Per data analytics principles, ',
  'Audit Data Analytics': 'Per AU-C 500 and 520, ',

  // Sampling
  'Sampling': 'Per AU-C 530, ',
};

// Function to add citation to explanation if not already present
function addCitationToExplanation(
  explanation: string,
  citation: string
): string {
  // Skip if already has a citation
  if (explanation.startsWith('Per ')) {
    return explanation;
  }

  // Add citation prefix
  return citation + explanation.charAt(0).toLowerCase() + explanation.slice(1);
}

// Process a TBS file
function processTBSFile(
  filePath: string,
  citations: Record<string, string>
): { modified: number; total: number } {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = 0;
  let total = 0;

  // Find all explanations and their context
  const explanationRegex = /subtopic:\s*["']([^"']+)["'][\s\S]*?explanation:\s*["']([^"']+)["']/g;

  let match;
  while ((match = explanationRegex.exec(content)) !== null) {
    total++;
    const subtopic = match[1];
    const explanation = match[2];

    // Check if we have a citation for this subtopic
    const citation = citations[subtopic];
    if (citation && !explanation.startsWith('Per ')) {
      const newExplanation = addCitationToExplanation(explanation, citation);
      content = content.replace(
        `explanation: "${explanation}"`,
        `explanation: "${newExplanation}"`
      );
      modified++;
    }
  }

  // Write back if modified
  if (modified > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, total };
}

// Main execution
async function main() {
  const tbsDir = path.join(__dirname, '../src/lib/data/tbs');

  console.log('TBS Citation Enhancement Script');
  console.log('================================\n');

  const files = [
    { name: 'far-tbs.ts', citations: FAR_CITATIONS },
    { name: 'aud-tbs.ts', citations: AUD_CITATIONS },
    { name: 'reg-tbs.ts', citations: REG_CITATIONS },
    { name: 'tcp-tbs.ts', citations: TCP_CITATIONS },
    { name: 'bar-tbs.ts', citations: BAR_CITATIONS },
    { name: 'isc-tbs.ts', citations: ISC_CITATIONS },
  ];

  let totalModified = 0;
  let totalExplanations = 0;

  for (const file of files) {
    const filePath = path.join(tbsDir, file.name);
    if (fs.existsSync(filePath)) {
      const result = processTBSFile(filePath, file.citations);
      console.log(`${file.name}: ${result.modified}/${result.total} explanations updated`);
      totalModified += result.modified;
      totalExplanations += result.total;
    } else {
      console.log(`${file.name}: File not found`);
    }
  }

  console.log(`\nTotal: ${totalModified}/${totalExplanations} explanations updated`);
}

main().catch(console.error);
