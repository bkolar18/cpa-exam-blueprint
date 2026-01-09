/**
 * Script to consolidate duplicate/similar topics in question files
 */

const fs = require('fs');
const path = require('path');

// Map of topics to consolidate: oldTopic -> newTopic
const TOPIC_CONSOLIDATIONS = {
  // Consolidations variations
  "Consolidation": "Consolidations",

  // Conceptual Framework variations
  "Conceptual Framework": "Conceptual Framework & Standards",

  // Government/Governmental accounting
  "Governmental Accounting": "Government Accounting",
  "Government": "Government Accounting",

  // Not-for-Profit variations
  "NFP Accounting": "Not-for-Profit Accounting",
  "Not-for-Profit": "Not-for-Profit Accounting",
  "NFP": "Not-for-Profit Accounting",

  // Stockholders Equity variations
  "Stockholders Equity": "Stockholders' Equity",
  "Equity": "Stockholders' Equity",

  // PPE variations
  "PPE": "Property, Plant & Equipment",
  "PP&E": "Property, Plant & Equipment",
  "Fixed Assets": "Property, Plant & Equipment",

  // Fair Value variations
  "Fair Value Measurements": "Fair Value",

  // Intangibles variations
  "Intangibles": "Intangible Assets",

  // EPS variations
  "EPS": "Earnings Per Share",

  // Cash Flow variations
  "Cash Flow Statement": "Statement of Cash Flows",
  "Cash Flows": "Statement of Cash Flows",

  // IFRS variations
  "IFRS Differences": "IFRS",

  // Derivatives variations
  "Derivatives and Hedging": "Derivatives",
  "Hedging": "Derivatives",

  // Accounting Changes variations
  "Accounting Changes": "Accounting Changes and Error Corrections",
  "Changes and Errors": "Accounting Changes and Error Corrections",

  // Stock Compensation variations
  "Stock Compensation": "Stock-Based Compensation",
  "Share-Based Payments": "Stock-Based Compensation",
  "Share-Based Compensation": "Stock-Based Compensation",

  // Revenue variations
  "Revenue": "Revenue Recognition",
  "Income Recognition": "Revenue Recognition",

  // Balance Sheet items
  "Cash": "Cash and Cash Equivalents",
  "Receivables": "Revenue and Receivables",
  "Accounts Receivable": "Revenue and Receivables",

  // Bonds variations
  "Bonds": "Long-term Debt",
  "Bonds Payable": "Long-term Debt",
  "Notes Payable": "Long-term Debt",
  "Debt": "Long-term Debt",

  // Liabilities
  "Current Liabilities": "Liabilities",

  // Ratios variations
  "Financial Ratios": "Ratios",

  // Pension variations
  "Pension Accounting": "Pensions",
  "OPEB": "Pensions",

  // Employment Tax variations
  "Employment Taxes": "Employment Tax",

  // Entity taxation
  "Corporate Taxation": "C Corporations",
  "C Corporation": "C Corporations",
  "S Corporation": "S Corporations",
  "Partnership Taxation": "Partnerships",
  "Entity Taxation": "Business Entities",
  "Entity Selection": "Business Entities",

  // Trust/Estate variations
  "Trust Taxation": "Estates and Trusts",
  "Estate Tax": "Estates and Trusts",
  "Estate Planning": "Estate and Gift Planning",
  "Gift Tax": "Gift and Estate Tax",

  // International Tax variations
  "International Taxation": "International Tax",

  // State Tax variations
  "State Taxation": "State and Local Tax",

  // Multi-Entity variations
  "Multi-Entity": "Multi-Entity Planning",

  // Deferred Taxes variations
  "Deferred Taxes": "Income Taxes",

  // Related Party variations
  "Related Party Transactions": "Related Parties",
  "Related Party Disclosures": "Related Parties",

  // Charitable variations
  "Charitable Planning": "Charitable Giving",

  // Business Planning variations
  "Business Planning": "Tax Planning",

  // Ethics variations (for consistency)
  "Ethics": "Professional Ethics",

  // Depreciation -> PPE
  "Depreciation": "Property, Plant & Equipment",

  // Impairment -> Intangible Assets (context dependent but most are)
  "Impairment": "Intangible Assets",

  // Equity Method -> Investments
  "Equity Method": "Investments",

  // Disclosure -> Financial Statement Presentation
  "Disclosure": "Financial Statement Presentation",
  "Notes to Financial Statements": "Financial Statement Presentation",

  // Deductions -> Individual Taxation
  "Deductions": "Individual Taxation",

  // Section 199A -> Individual Taxation
  "Section 199A": "Individual Taxation",

  // AMT variations
  "Alternative Minimum Tax": "AMT Planning",

  // Corporate Reorganizations -> C Corporations
  "Corporate Reorganizations": "C Corporations",

  // Troubled Debt -> Long-term Debt
  "Troubled Debt Restructuring": "Long-term Debt",

  // Warranties -> Liabilities
  "Warranties": "Liabilities",

  // Prepaid Expenses -> Balance Sheet
  "Prepaid Expenses": "Balance Sheet",

  // GAAP Hierarchy -> Conceptual Framework
  "GAAP Hierarchy": "Conceptual Framework & Standards",
  "Accounting Principles": "Conceptual Framework & Standards",

  // Audit Risk -> Risk Assessment
  "Audit Risk": "Risk Assessment",

  // Discontinued Operations -> Financial Statement Presentation
  "Discontinued Operations": "Financial Statement Presentation",

  // Financial Statements -> Financial Statement Presentation
  "Financial Statements": "Financial Statement Presentation",

  // Statement of Changes in Equity -> Stockholders' Equity
  "Statement of Changes in Equity": "Stockholders' Equity",

  // Net Investment Income Tax -> Individual Taxation
  "Net Investment Income Tax": "Individual Taxation",

  // Financial Instruments -> Investments
  "Financial Instruments": "Investments",

  // Nonmonetary Transactions -> Property Transactions
  "Nonmonetary Transactions": "Property Transactions",

  // Deferred Compensation -> Compensation Planning
  "Deferred Compensation": "Compensation Planning",

  // Estimates -> Financial Statement Presentation
  "Estimates": "Financial Statement Presentation",

  // Segment Reporting -> Financial Statement Presentation
  "Segment Reporting": "Financial Statement Presentation",

  // Interim Reporting -> Financial Statement Presentation
  "Interim Reporting": "Financial Statement Presentation",

  // Comprehensive Income -> Financial Statement Presentation
  "Comprehensive Income": "Financial Statement Presentation",

  // Contingencies -> Liabilities
  "Contingencies": "Liabilities",
};

const QUESTION_FILES = [
  'src/lib/data/practice-questions/far.ts',
  'src/lib/data/practice-questions/aud.ts',
  'src/lib/data/practice-questions/reg.ts',
  'src/lib/data/practice-questions/tcp.ts',
  'src/lib/data/practice-questions/bar.ts',
  'src/lib/data/practice-questions/isc.ts',
];

function consolidateTopics() {
  let totalChanges = 0;
  const changesByFile = {};

  for (const relPath of QUESTION_FILES) {
    const filePath = path.join(__dirname, '..', relPath);

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${relPath}`);
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf-8');
    let fileChanges = 0;
    const changesInFile = [];

    for (const [oldTopic, newTopic] of Object.entries(TOPIC_CONSOLIDATIONS)) {
      // Match "topic": "oldTopic" pattern
      const pattern = new RegExp(`"topic":\\s*"${escapeRegex(oldTopic)}"`, 'g');
      const matches = content.match(pattern);

      if (matches) {
        const count = matches.length;
        content = content.replace(pattern, `"topic": "${newTopic}"`);
        fileChanges += count;
        changesInFile.push(`${oldTopic} -> ${newTopic}: ${count}`);
      }
    }

    if (fileChanges > 0) {
      fs.writeFileSync(filePath, content);
      changesByFile[relPath] = changesInFile;
      totalChanges += fileChanges;
      console.log(`\n${relPath}: ${fileChanges} changes`);
      changesInFile.forEach(c => console.log(`  - ${c}`));
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Total topic consolidations: ${totalChanges}`);

  return { totalChanges, changesByFile };
}

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Run the consolidation
consolidateTopics();
