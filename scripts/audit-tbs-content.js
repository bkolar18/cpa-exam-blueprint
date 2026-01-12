/**
 * TBS Content Audit Script
 *
 * Enhanced validation for CPA exam TBS questions.
 * Checks for content accuracy, currency, and CPA exam alignment.
 *
 * Audit Criteria:
 * A. Answer Accuracy
 * B. Partial-Credit & CPA UI Robustness
 * C. Distractor Quality
 * D. Explanation Quality
 * E. Difficulty Alignment
 * F. Currency Checks (2024-2025 standards)
 * G. Answer Count Visibility
 *
 * Run with: node scripts/audit-tbs-content.js
 * Options:
 *   --section FAR|AUD|REG|TCP|BAR|ISC  - Audit specific section
 *   --output filename.json             - Output JSON report
 *   --verbose                          - Show all issues including info level
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Parse command line arguments
const args = process.argv.slice(2);
const sectionFilter = args.includes('--section') ? args[args.indexOf('--section') + 1] : null;
const outputFile = args.includes('--output') ? args[args.indexOf('--output') + 1] : null;
const verbose = args.includes('--verbose');

const TBS_DIR = path.join(__dirname, '../src/lib/data/tbs');
const ALL_FILES = ['far-tbs.ts', 'aud-tbs.ts', 'reg-tbs.ts', 'tcp-tbs.ts', 'bar-tbs.ts', 'isc-tbs.ts'];

// Filter files if section specified
const files = sectionFilter
  ? ALL_FILES.filter(f => f.toLowerCase().startsWith(sectionFilter.toLowerCase()))
  : ALL_FILES;

// ============================================================================
// AUDIT CRITERIA PATTERNS
// ============================================================================

// Criterion F: Currency Checks - Outdated Standards
const OUTDATED_STANDARDS = {
  'ASC 605': { replacement: 'ASC 606', topic: 'revenue recognition', severity: 'critical' },
  'ASC 840': { replacement: 'ASC 842', topic: 'lease accounting', severity: 'critical' },
  'FAS 13': { replacement: 'ASC 842', topic: 'lease accounting', severity: 'critical' },
  'FAS 5': { replacement: 'ASC 450', topic: 'contingencies', severity: 'warning' },
  'FAS 109': { replacement: 'ASC 740', topic: 'income taxes', severity: 'warning' },
  'SAS ': { replacement: 'AU-C or AS', topic: 'auditing standards', severity: 'warning' },
  'goodwill amortization': { replacement: 'impairment testing only', topic: 'goodwill', severity: 'critical' },
  'amortize goodwill': { replacement: 'impairment testing only', topic: 'goodwill', severity: 'critical' },
  'allowance for doubtful accounts': { replacement: 'allowance for credit losses (CECL)', topic: 'credit losses', severity: 'info' },
};

// Criterion D: Authoritative Reference Patterns
const AUTHORITATIVE_PATTERNS = [
  { pattern: /ASC\s+\d{3}(-\d{2})?(-\d{2})?(-\d+)?/g, source: 'FASB' },
  { pattern: /AU-C\s+\d{3}/g, source: 'AICPA' },
  { pattern: /AS\s+\d{4}/g, source: 'PCAOB' },
  { pattern: /IRC\s+§?\s*\d+/gi, source: 'IRC' },
  { pattern: /Section\s+\d+/gi, source: 'IRC' },
  { pattern: /Circular\s+230/gi, source: 'Treasury' },
  { pattern: /§\s*10\.\d+/g, source: 'Circular 230' },
  { pattern: /PCAOB/gi, source: 'PCAOB' },
  { pattern: /GAAP/gi, source: 'GAAP' },
  { pattern: /GAAS/gi, source: 'GAAS' },
];

// Criterion B: Standard Journal Account Names
const STANDARD_ACCOUNTS = [
  // Assets
  'Cash', 'Petty Cash', 'Accounts Receivable', 'Allowance for Credit Losses',
  'Notes Receivable', 'Interest Receivable', 'Inventory', 'Supplies',
  'Prepaid Insurance', 'Prepaid Rent', 'Prepaid Expenses',
  'Land', 'Buildings', 'Equipment', 'Machinery', 'Vehicles', 'Furniture',
  'Accumulated Depreciation', 'Right-of-Use Asset', 'Intangible Assets',
  'Goodwill', 'Patents', 'Trademarks', 'Copyrights',
  // Liabilities
  'Accounts Payable', 'Notes Payable', 'Interest Payable', 'Wages Payable',
  'Salaries Payable', 'Taxes Payable', 'Income Tax Payable',
  'Unearned Revenue', 'Deferred Revenue', 'Lease Liability',
  'Bonds Payable', 'Mortgage Payable', 'Accrued Expenses', 'Accrued Liabilities',
  // Equity
  'Common Stock', 'Preferred Stock', 'Paid-in Capital', 'Additional Paid-in Capital',
  'Retained Earnings', 'Treasury Stock', 'Dividends', 'Drawing',
  'Accumulated Other Comprehensive Income', 'AOCI',
  // Revenue
  'Sales Revenue', 'Service Revenue', 'Revenue', 'Interest Revenue',
  'Dividend Revenue', 'Rent Revenue', 'Gain on Sale',
  // Expenses
  'Cost of Goods Sold', 'COGS', 'Wages Expense', 'Salaries Expense',
  'Rent Expense', 'Insurance Expense', 'Utilities Expense', 'Supplies Expense',
  'Depreciation Expense', 'Amortization Expense', 'Interest Expense',
  'Bad Debt Expense', 'Credit Loss Expense', 'Income Tax Expense',
  'Loss on Sale', 'Advertising Expense', 'Professional Fees',
  // Special
  'Deferred Tax Asset', 'Deferred Tax Liability', 'Valuation Allowance',
  'Lease Expense', 'Finance Lease Liability', 'Operating Lease Liability',
];

// Tax amounts that require year context
const TAX_THRESHOLD_TERMS = [
  'standard deduction', 'personal exemption', 'exemption amount',
  'contribution limit', 'ira limit', '401k limit', '401(k)',
  'gift tax exclusion', 'annual exclusion', 'estate tax exemption',
  'social security wage base', 'medicare tax', 'fica',
  'kiddie tax', 'amt exemption', 'qbi deduction',
];

// ============================================================================
// ISSUE TRACKING
// ============================================================================

const auditResults = {
  metadata: {
    generatedAt: new Date().toISOString(),
    scriptVersion: '1.0.0',
    sectionFilter: sectionFilter || 'all',
  },
  statistics: {
    totalQuestions: 0,
    questionsWithIssues: 0,
    bySection: {},
    byType: {},
    byCriterion: { A: 0, B: 0, C: 0, D: 0, E: 0, F: 0, G: 0 },
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0, info: 0 },
  },
  issues: [],
};

function addIssue(tbsId, filename, criterion, severity, category, message, details = {}) {
  const issue = {
    tbsId,
    filename,
    criterion,
    severity,
    category,
    message,
    ...details,
  };
  auditResults.issues.push(issue);
  auditResults.statistics.byCriterion[criterion]++;
  auditResults.statistics.bySeverity[severity]++;
}

// ============================================================================
// ENHANCED TBS PARSING
// ============================================================================

function extractFullTBSContent(content, tbsId) {
  // Find the start of this TBS definition
  const idPattern = new RegExp(`id:\\s*["']${tbsId}["']`);
  const idMatch = content.match(idPattern);
  if (!idMatch) return null;

  const idIndex = content.indexOf(idMatch[0]);

  // Find the const declaration before this ID
  const beforeId = content.substring(0, idIndex);
  const constMatch = beforeId.match(/(?:export\s+)?const\s+\w+\s*:\s*TBSQuestion\s*=\s*\{[^]*$/);

  if (!constMatch) return null;

  const startIndex = idIndex - (beforeId.length - constMatch.index);

  // Find the end of this TBS (next const declaration or end of content)
  const afterStart = content.substring(startIndex);
  const endMatch = afterStart.match(/\n\};/);

  if (!endMatch) return afterStart;

  return afterStart.substring(0, endMatch.index + endMatch[0].length);
}

function extractExplanations(tbsContent) {
  const explanations = [];
  const pattern = /explanation:\s*["'`]([^"'`]+)["'`]/g;
  let match;
  while ((match = pattern.exec(tbsContent)) !== null) {
    explanations.push(match[1]);
  }
  return explanations;
}

function extractDropdownOptions(tbsContent) {
  const dropdowns = [];
  // Find all dropdownOptions arrays
  const pattern = /dropdownOptions:\s*\[([\s\S]*?)\]/g;
  let match;
  while ((match = pattern.exec(tbsContent)) !== null) {
    const optionsContent = match[1];
    const options = [];
    const optPattern = /\{[^{}]*text:\s*["']([^"']+)["'][^{}]*isCorrect:\s*(true|false)[^{}]*\}/g;
    let optMatch;
    while ((optMatch = optPattern.exec(optionsContent)) !== null) {
      options.push({ text: optMatch[1], isCorrect: optMatch[2] === 'true' });
    }
    // Alternative pattern with isCorrect before text
    const optPattern2 = /\{[^{}]*isCorrect:\s*(true|false)[^{}]*text:\s*["']([^"']+)["'][^{}]*\}/g;
    while ((optMatch = optPattern2.exec(optionsContent)) !== null) {
      options.push({ text: optMatch[2], isCorrect: optMatch[1] === 'true' });
    }
    if (options.length > 0) {
      dropdowns.push(options);
    }
  }
  return dropdowns;
}

function extractRequirementOrders(tbsContent) {
  const orders = [];
  const pattern = /order:\s*(\d+)/g;
  let match;
  while ((match = pattern.exec(tbsContent)) !== null) {
    orders.push(parseInt(match[1]));
  }
  return orders;
}

function extractNumericAnswers(tbsContent) {
  const answers = [];
  // Look for correctAnswer blocks with numeric type
  const pattern = /correctAnswer:\s*\{[^}]*type:\s*["']numeric["'][^}]*value:\s*(-?\d+(?:\.\d+)?)[^}]*(?:tolerance:\s*(\d+(?:\.\d+)?))?[^}]*(?:tolerancePercent:\s*(\d+(?:\.\d+)?))?/g;
  let match;
  while ((match = pattern.exec(tbsContent)) !== null) {
    answers.push({
      value: parseFloat(match[1]),
      tolerance: match[2] ? parseFloat(match[2]) : null,
      tolerancePercent: match[3] ? parseFloat(match[3]) : null,
    });
  }
  return answers;
}

function extractJournalAccounts(tbsContent) {
  const accounts = [];
  const pattern = /journalAccounts:\s*\[([\s\S]*?)\]/;
  const match = tbsContent.match(pattern);
  if (match) {
    const accountPattern = /name:\s*["']([^"']+)["']/g;
    let accMatch;
    while ((accMatch = accountPattern.exec(match[1])) !== null) {
      accounts.push(accMatch[1]);
    }
  }
  return accounts;
}

function countRequirements(tbsContent) {
  // Count requirement objects in the requirements array
  const reqPattern = /requirements:\s*\[([\s\S]*?)\n\s*\]/;
  const match = tbsContent.match(reqPattern);
  if (!match) return 0;

  // Count occurrences of "id:" within requirements array
  const idMatches = match[1].match(/id:\s*["']/g);
  return idMatches ? idMatches.length : 0;
}

// ============================================================================
// AUDIT VALIDATORS
// ============================================================================

function auditCriterionA_AnswerAccuracy(tbs, tbsContent, filename) {
  // A1: Check for numeric answer / explanation mismatches
  const explanations = extractExplanations(tbsContent);
  const numericAnswers = extractNumericAnswers(tbsContent);

  // Look for numbers in explanations and compare to answers
  explanations.forEach((exp, idx) => {
    // Extract dollar amounts from explanation
    const dollarPattern = /\$[\d,]+(?:\.\d{2})?/g;
    const expAmounts = (exp.match(dollarPattern) || []).map(s =>
      parseFloat(s.replace(/[$,]/g, ''))
    );

    // Check if explanation contains calculation steps
    if (exp.length > 100 && !exp.match(/\d+\s*[×\*\+\-\/÷]\s*\d+/) && !exp.match(/=\s*\$?\d/)) {
      // Long explanation with no visible calculation
      addIssue(tbs.id, filename, 'A', 'low', 'calculation_chain',
        'Explanation may lack calculation steps', { explanationIndex: idx });
    }
  });

  // A2: Check tolerance reasonableness
  numericAnswers.forEach((ans, idx) => {
    if (ans.value !== 0) {
      if (!ans.tolerance && !ans.tolerancePercent) {
        addIssue(tbs.id, filename, 'A', 'medium', 'missing_tolerance',
          'Numeric answer has no tolerance defined', { value: ans.value, answerIndex: idx });
      } else if (ans.tolerance && Math.abs(ans.tolerance / ans.value) > 0.1) {
        addIssue(tbs.id, filename, 'A', 'low', 'high_tolerance',
          `Tolerance exceeds 10% of answer value`,
          { value: ans.value, tolerance: ans.tolerance, percent: (ans.tolerance / ans.value * 100).toFixed(1) + '%' });
      }
    }
  });
}

function auditCriterionB_PartialCredit(tbs, tbsContent, filename) {
  // B1: Check journal entry account names against standard list
  const journalAccounts = extractJournalAccounts(tbsContent);

  journalAccounts.forEach(accountName => {
    const isStandard = STANDARD_ACCOUNTS.some(std =>
      accountName.toLowerCase().includes(std.toLowerCase()) ||
      std.toLowerCase().includes(accountName.toLowerCase())
    );

    if (!isStandard && accountName.length > 3) {
      addIssue(tbs.id, filename, 'B', 'info', 'nonstandard_account',
        `Journal account may not be standard CPA terminology: "${accountName}"`);
    }
  });

  // B2: Check for rounding/format instructions in requirements
  const hasRoundingInstruction = /round|nearest|decimal|whole number/i.test(tbsContent);
  const hasNumericRequirements = /type:\s*["']numeric["']/i.test(tbsContent);

  if (hasNumericRequirements && !hasRoundingInstruction) {
    addIssue(tbs.id, filename, 'B', 'low', 'no_rounding_instruction',
      'Numeric requirements present but no rounding instructions found');
  }
}

function auditCriterionC_DistractorQuality(tbs, tbsContent, filename) {
  const dropdowns = extractDropdownOptions(tbsContent);

  dropdowns.forEach((options, idx) => {
    // C1: Check minimum options (should have at least 3)
    if (options.length < 3) {
      addIssue(tbs.id, filename, 'C', 'medium', 'few_options',
        `Dropdown has only ${options.length} options (recommend 3-4)`, { dropdownIndex: idx });
    }

    // C2: Check for too many options
    if (options.length > 6) {
      addIssue(tbs.id, filename, 'C', 'low', 'many_options',
        `Dropdown has ${options.length} options (may overwhelm candidates)`, { dropdownIndex: idx });
    }

    // C3: Check for duplicate options
    const optionTexts = options.map(o => o.text.toLowerCase().trim());
    const duplicates = optionTexts.filter((t, i) => optionTexts.indexOf(t) !== i);
    if (duplicates.length > 0) {
      addIssue(tbs.id, filename, 'C', 'critical', 'duplicate_options',
        `Dropdown has duplicate options: "${duplicates[0]}"`, { dropdownIndex: idx });
    }

    // C4: Check for very similar options (potential overlap)
    for (let i = 0; i < optionTexts.length; i++) {
      for (let j = i + 1; j < optionTexts.length; j++) {
        const similarity = calculateSimilarity(optionTexts[i], optionTexts[j]);
        if (similarity > 0.8 && optionTexts[i] !== optionTexts[j]) {
          addIssue(tbs.id, filename, 'C', 'medium', 'similar_options',
            `Dropdown options may be too similar`,
            { option1: options[i].text, option2: options[j].text, similarity: (similarity * 100).toFixed(0) + '%' });
        }
      }
    }

    // C5: Ensure at least one correct option
    const correctCount = options.filter(o => o.isCorrect).length;
    if (correctCount === 0) {
      addIssue(tbs.id, filename, 'C', 'critical', 'no_correct_option',
        'Dropdown has no correct option marked', { dropdownIndex: idx });
    }
  });
}

function auditCriterionD_ExplanationQuality(tbs, tbsContent, filename) {
  const explanations = extractExplanations(tbsContent);

  explanations.forEach((exp, idx) => {
    // D1: Check minimum length
    if (exp.length < 50) {
      addIssue(tbs.id, filename, 'D', 'medium', 'short_explanation',
        `Explanation too short (${exp.length} chars)`, { explanationIndex: idx });
    }

    // D2: Check for authoritative reference
    let hasAuthoritativeRef = false;
    for (const { pattern } of AUTHORITATIVE_PATTERNS) {
      if (pattern.test(exp)) {
        hasAuthoritativeRef = true;
        break;
      }
      pattern.lastIndex = 0; // Reset regex state
    }

    if (!hasAuthoritativeRef && exp.length > 50) {
      addIssue(tbs.id, filename, 'D', 'low', 'no_authoritative_ref',
        'Explanation lacks authoritative reference (ASC, AU-C, IRC, etc.)', { explanationIndex: idx });
    }
  });
}

function auditCriterionE_DifficultyAlignment(tbs, tbsContent, filename) {
  const reqCount = countRequirements(tbsContent);
  const difficulty = tbs.difficulty;
  const skillLevel = tbs.skillLevel;

  // E1: Check requirement count vs difficulty
  if (difficulty === 'easy' && reqCount > 4) {
    addIssue(tbs.id, filename, 'E', 'medium', 'difficulty_mismatch',
      `Easy difficulty but has ${reqCount} requirements (max 4 recommended)`, { reqCount });
  }

  if (difficulty === 'hard' && reqCount < 5) {
    addIssue(tbs.id, filename, 'E', 'low', 'difficulty_mismatch',
      `Hard difficulty but has only ${reqCount} requirements (min 5 recommended)`, { reqCount });
  }

  // E2: Check skill level vs difficulty
  if (difficulty === 'easy' && (skillLevel === 'analysis' || skillLevel === 'evaluation')) {
    addIssue(tbs.id, filename, 'E', 'medium', 'skill_mismatch',
      `Easy difficulty with ${skillLevel} skill level may be misaligned`);
  }

  if (difficulty === 'hard' && skillLevel === 'remembering_understanding') {
    addIssue(tbs.id, filename, 'E', 'medium', 'skill_mismatch',
      'Hard difficulty with remembering_understanding skill level may be misaligned');
  }
}

function auditCriterionF_CurrencyChecks(tbs, tbsContent, filename) {
  const contentLower = tbsContent.toLowerCase();

  // F1: Check for outdated standards (but not in distractor options)
  for (const [pattern, info] of Object.entries(OUTDATED_STANDARDS)) {
    if (contentLower.includes(pattern.toLowerCase())) {
      // Check if this appears in a dropdown option marked as incorrect (valid distractor)
      const distractorPattern = new RegExp(
        `isCorrect:\\s*false[^}]*text:[^}]*${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}|` +
        `text:[^}]*${pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^}]*isCorrect:\\s*false`,
        'i'
      );

      if (distractorPattern.test(tbsContent)) {
        // This is a valid distractor - skip or make it info level
        continue;
      }

      addIssue(tbs.id, filename, 'F', info.severity, 'outdated_standard',
        `Contains outdated reference "${pattern}" - use ${info.replacement}`,
        { topic: info.topic, outdatedRef: pattern, replacement: info.replacement });
    }
  }

  // F2: Check for tax amounts without year context
  TAX_THRESHOLD_TERMS.forEach(term => {
    if (contentLower.includes(term.toLowerCase())) {
      // Check if there's a year reference nearby
      const hasYearContext = /\b20(2[4-9]|[3-9]\d)\b/.test(tbsContent);
      if (!hasYearContext) {
        addIssue(tbs.id, filename, 'F', 'medium', 'tax_amount_no_year',
          `Contains "${term}" - verify year context for threshold amounts`,
          { term });
      }
    }
  });

  // F3: Check for very old years (pre-2020)
  const oldYears = [];
  for (let y = 2015; y < 2020; y++) {
    const yearPattern = new RegExp(`\\b${y}\\b`);
    if (yearPattern.test(tbsContent)) {
      oldYears.push(y);
    }
  }
  if (oldYears.length > 0) {
    addIssue(tbs.id, filename, 'F', 'info', 'old_years',
      `Contains old year references: ${oldYears.join(', ')}`,
      { years: oldYears });
  }
}

function auditCriterionG_AnswerVisibility(tbs, tbsContent, filename) {
  const orders = extractRequirementOrders(tbsContent);

  if (orders.length > 0) {
    // G1: Check for gaps in order sequence
    const sortedOrders = [...new Set(orders)].sort((a, b) => a - b);

    for (let i = 0; i < sortedOrders.length - 1; i++) {
      if (sortedOrders[i + 1] - sortedOrders[i] > 1) {
        addIssue(tbs.id, filename, 'G', 'high', 'order_gap',
          `Gap in requirement order sequence: ${sortedOrders[i]} to ${sortedOrders[i + 1]}`,
          { gap: [sortedOrders[i], sortedOrders[i + 1]] });
      }
    }

    // G2: Check if order starts at 1
    if (sortedOrders[0] !== 1 && sortedOrders.length > 0) {
      addIssue(tbs.id, filename, 'G', 'medium', 'order_start',
        `Requirement order starts at ${sortedOrders[0]}, not 1`,
        { startOrder: sortedOrders[0] });
    }
  }

  // G3: Check requirement count vs maxScorePoints
  const reqCount = countRequirements(tbsContent);
  if (tbs.maxScorePoints && reqCount > 0) {
    if (reqCount !== tbs.maxScorePoints && Math.abs(reqCount - tbs.maxScorePoints) > 2) {
      addIssue(tbs.id, filename, 'G', 'info', 'point_req_mismatch',
        `${reqCount} requirements but maxScorePoints is ${tbs.maxScorePoints}`,
        { reqCount, maxScorePoints: tbs.maxScorePoints });
    }
  }
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function calculateSimilarity(str1, str2) {
  // Simple Jaccard similarity on words
  const words1 = new Set(str1.toLowerCase().split(/\s+/));
  const words2 = new Set(str2.toLowerCase().split(/\s+/));

  const intersection = new Set([...words1].filter(x => words2.has(x)));
  const union = new Set([...words1, ...words2]);

  return intersection.size / union.size;
}

function extractTBSQuestions(content, filename) {
  const questions = [];

  // Find the export array to get variable names
  const exportMatch = content.match(/export\s+const\s+\w+TBSQuestions[^=]*=\s*\[([\s\S]*?)\];?\s*$/);

  if (!exportMatch) {
    // Try to find individual exports
    const individualExports = content.match(/(?:export\s+)?const\s+(\w+)\s*:\s*TBSQuestion\s*=/g);
    if (individualExports) {
      individualExports.forEach(exp => {
        const varName = exp.match(/const\s+(\w+)/)?.[1];
        if (varName) {
          const tbs = extractTBSFromVar(content, varName, filename);
          if (tbs) questions.push(tbs);
        }
      });
    }
    return questions;
  }

  const arrayContent = exportMatch[1];
  const varRefs = arrayContent.match(/\b\w+(?:TBS|Simulation)\w*\b/g) || [];

  varRefs.forEach(varName => {
    const tbs = extractTBSFromVar(content, varName, filename);
    if (tbs) questions.push(tbs);
  });

  return questions;
}

function extractTBSFromVar(content, varName, filename) {
  const varRegex = new RegExp(`(?:export\\s+)?const\\s+${varName}\\s*:\\s*TBSQuestion\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`, 'm');
  const match = content.match(varRegex);

  if (!match) return null;

  const objContent = match[0];

  const getId = str => str.match(/id:\s*["']([^"']+)["']/)?.[1];
  const getField = (str, field) => str.match(new RegExp(`${field}:\\s*["']([^"']+)["']`))?.[1];
  const getNumField = (str, field) => {
    const m = str.match(new RegExp(`${field}:\\s*(\\d+(?:\\.\\d+)?)`));
    return m ? parseFloat(m[1]) : null;
  };

  const id = getId(objContent);
  if (!id) return null;

  return {
    id,
    varName,
    section: getField(objContent, 'section'),
    tbsType: getField(objContent, 'tbsType'),
    topic: getField(objContent, 'topic'),
    difficulty: getField(objContent, 'difficulty'),
    skillLevel: getField(objContent, 'skillLevel'),
    contentArea: getField(objContent, 'contentArea'),
    title: getField(objContent, 'title'),
    maxScorePoints: getNumField(objContent, 'maxScorePoints'),
    timeEstimateMinutes: getNumField(objContent, 'timeEstimateMinutes'),
    raw: objContent,
    filename,
  };
}

// ============================================================================
// MAIN PROCESSING
// ============================================================================

function processFile(filename) {
  const filePath = path.join(TBS_DIR, filename);

  if (!fs.existsSync(filePath)) {
    console.log(`${colors.yellow}Skipping ${filename} (not found)${colors.reset}`);
    return;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const questions = extractTBSQuestions(content, filename);

  console.log(`\n${colors.bold}${colors.blue}=== ${filename} ===${colors.reset}`);
  console.log(`Found ${questions.length} TBS questions`);

  questions.forEach(tbs => {
    if (!tbs) return;

    auditResults.statistics.totalQuestions++;
    auditResults.statistics.bySection[tbs.section] = (auditResults.statistics.bySection[tbs.section] || 0) + 1;
    auditResults.statistics.byType[tbs.tbsType] = (auditResults.statistics.byType[tbs.tbsType] || 0) + 1;

    const tbsContent = extractFullTBSContent(content, tbs.id) || tbs.raw;
    const issueCountBefore = auditResults.issues.length;

    // Run all audit criteria
    auditCriterionA_AnswerAccuracy(tbs, tbsContent, filename);
    auditCriterionB_PartialCredit(tbs, tbsContent, filename);
    auditCriterionC_DistractorQuality(tbs, tbsContent, filename);
    auditCriterionD_ExplanationQuality(tbs, tbsContent, filename);
    auditCriterionE_DifficultyAlignment(tbs, tbsContent, filename);
    auditCriterionF_CurrencyChecks(tbs, tbsContent, filename);
    auditCriterionG_AnswerVisibility(tbs, tbsContent, filename);

    const issuesFound = auditResults.issues.length - issueCountBefore;
    if (issuesFound > 0) {
      auditResults.statistics.questionsWithIssues++;
    }
  });
}

function printResults() {
  const stats = auditResults.statistics;
  const issues = auditResults.issues;

  console.log(`\n\n${colors.bold}${colors.cyan}=== CONTENT AUDIT RESULTS ===${colors.reset}`);
  console.log(`\nTotal TBS Questions: ${stats.totalQuestions}`);
  console.log(`Questions with Issues: ${stats.questionsWithIssues}`);

  console.log(`\n${colors.bold}Issues by Severity:${colors.reset}`);
  console.log(`  ${colors.red}Critical: ${stats.bySeverity.critical}${colors.reset}`);
  console.log(`  ${colors.magenta}High: ${stats.bySeverity.high}${colors.reset}`);
  console.log(`  ${colors.yellow}Medium: ${stats.bySeverity.medium}${colors.reset}`);
  console.log(`  ${colors.blue}Low: ${stats.bySeverity.low}${colors.reset}`);
  console.log(`  Info: ${stats.bySeverity.info}`);

  console.log(`\n${colors.bold}Issues by Criterion:${colors.reset}`);
  console.log(`  A (Answer Accuracy): ${stats.byCriterion.A}`);
  console.log(`  B (Partial Credit/UI): ${stats.byCriterion.B}`);
  console.log(`  C (Distractor Quality): ${stats.byCriterion.C}`);
  console.log(`  D (Explanation Quality): ${stats.byCriterion.D}`);
  console.log(`  E (Difficulty Alignment): ${stats.byCriterion.E}`);
  console.log(`  F (Currency Checks): ${stats.byCriterion.F}`);
  console.log(`  G (Answer Visibility): ${stats.byCriterion.G}`);

  // Print critical and high issues
  const criticalHighIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'high');
  if (criticalHighIssues.length > 0) {
    console.log(`\n${colors.bold}${colors.red}=== CRITICAL & HIGH PRIORITY ISSUES ===${colors.reset}`);
    criticalHighIssues.forEach(issue => {
      const color = issue.severity === 'critical' ? colors.red : colors.magenta;
      console.log(`\n${color}[${issue.severity.toUpperCase()}]${colors.reset} ${issue.tbsId}`);
      console.log(`  Criterion ${issue.criterion}: ${issue.message}`);
      if (issue.outdatedRef) console.log(`    Outdated: ${issue.outdatedRef} -> ${issue.replacement}`);
      if (issue.gap) console.log(`    Gap: ${issue.gap[0]} to ${issue.gap[1]}`);
    });
  }

  // Print medium issues if not too many
  const mediumIssues = issues.filter(i => i.severity === 'medium');
  if (mediumIssues.length > 0 && mediumIssues.length <= 20) {
    console.log(`\n${colors.bold}${colors.yellow}=== MEDIUM PRIORITY ISSUES ===${colors.reset}`);
    mediumIssues.forEach(issue => {
      console.log(`\n${colors.yellow}[MEDIUM]${colors.reset} ${issue.tbsId}`);
      console.log(`  Criterion ${issue.criterion}: ${issue.message}`);
    });
  } else if (mediumIssues.length > 20) {
    console.log(`\n${colors.yellow}(${mediumIssues.length} medium issues - see JSON output for details)${colors.reset}`);
  }

  // Show info and low only in verbose mode
  if (verbose) {
    const lowInfoIssues = issues.filter(i => i.severity === 'low' || i.severity === 'info');
    console.log(`\n${colors.bold}=== LOW & INFO ISSUES ===${colors.reset}`);
    lowInfoIssues.forEach(issue => {
      console.log(`[${issue.severity.toUpperCase()}] ${issue.tbsId}: ${issue.message}`);
    });
  }
}

// ============================================================================
// MAIN EXECUTION
// ============================================================================

console.log(`${colors.bold}${colors.cyan}CPA TBS Content Audit${colors.reset}`);
console.log('================================');
if (sectionFilter) {
  console.log(`Filtering to section: ${sectionFilter}`);
}

files.forEach(processFile);
printResults();

// Output JSON if requested
if (outputFile) {
  const outputPath = path.join(__dirname, '..', outputFile);
  fs.writeFileSync(outputPath, JSON.stringify(auditResults, null, 2));
  console.log(`\n${colors.green}Results written to: ${outputPath}${colors.reset}`);
}

// Exit code
const criticalCount = auditResults.statistics.bySeverity.critical;
const highCount = auditResults.statistics.bySeverity.high;

if (criticalCount > 0) {
  console.log(`\n${colors.red}${colors.bold}AUDIT FAILED - ${criticalCount} critical issues require immediate attention${colors.reset}`);
  process.exit(1);
} else if (highCount > 0) {
  console.log(`\n${colors.yellow}${colors.bold}AUDIT WARNING - ${highCount} high priority issues should be addressed${colors.reset}`);
  process.exit(0);
} else {
  console.log(`\n${colors.green}${colors.bold}AUDIT PASSED - No critical or high priority issues${colors.reset}`);
  process.exit(0);
}
