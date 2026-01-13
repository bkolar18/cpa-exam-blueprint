#!/usr/bin/env node

/**
 * CPA MCQ Content Audit Script
 *
 * Audits ~6,000 MCQ questions across FAR, AUD, REG, TCP, BAR, ISC
 * for correctness, currency, and CPA exam alignment.
 *
 * Usage:
 *   node scripts/audit-mcq-content.js [--section FAR] [--verbose] [--output file.json]
 */

const fs = require('fs');
const path = require('path');

// ============== CONFIGURATION ==============

const MCQ_DIR = path.join(__dirname, '..', 'src', 'lib', 'data', 'practice-questions');
const SECTIONS = ['far', 'aud', 'reg', 'tcp', 'bar', 'isc'];

// MCQ question format types
const EXPECTED_FORMATS = [
  'conceptual',
  'calculation',
  'scenario',
  'except',
  'best-answer',
  'definition',
  'application',
  'MCQ'
];

// Outdated accounting standards (should use current equivalents)
const OUTDATED_STANDARDS = {
  'ASC 605': { replacement: 'ASC 606', topic: 'revenue recognition', severity: 'critical' },
  'ASC 840': { replacement: 'ASC 842', topic: 'lease accounting', severity: 'critical' },
  'FAS 13': { replacement: 'ASC 842', topic: 'lease accounting', severity: 'critical' },
  'FAS 5': { replacement: 'ASC 450', topic: 'contingencies', severity: 'high' },
  'FAS 141': { replacement: 'ASC 805', topic: 'business combinations', severity: 'high' },
  'goodwill amortization': { replacement: 'impairment testing only', topic: 'goodwill', severity: 'critical' },
};

// Valid authoritative reference patterns
const AUTHORITATIVE_PATTERNS = [
  /ASC\s+\d{3}/i,          // ASC 606, ASC 842
  /AU-C\s+\d{3}/i,         // AU-C 705
  /IRC\s+§?\s*\d+/i,       // IRC §1211
  /Section\s+\d+/i,        // Section 1231
  /PCAOB\s+AS\s+\d+/i,     // PCAOB AS 2201
  /Circular\s+230/i,       // Circular 230
  /FASB/i,                 // General FASB reference
  /GAAP/i,                 // GAAP reference
  /AICPA/i,                // AICPA reference
];

// ============== EXTRACTION ==============

function extractMCQsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const mcqs = [];

  // Extract the array content between "const questions = [" and the closing "]"
  const arrayMatch = content.match(/const questions\s*=\s*\[([\s\S]*)\];?\s*(?:export|$)/);
  if (!arrayMatch) {
    console.log('  Warning: Could not find questions array');
    return mcqs;
  }

  const arrayContent = arrayMatch[1];

  // Split by MCQ objects - looking for { "id": pattern
  const mcqBlocks = arrayContent.split(/(?=\{\s*"id":\s*")/);

  for (const block of mcqBlocks) {
    if (!block.trim() || !block.includes('"id"')) continue;

    // Clean up the block - add closing brace if needed
    let cleanBlock = block.trim();
    if (cleanBlock.endsWith(',')) {
      cleanBlock = cleanBlock.slice(0, -1);
    }
    // Ensure it ends with }
    if (!cleanBlock.endsWith('}')) {
      // Find the last } and truncate
      const lastBrace = cleanBlock.lastIndexOf('}');
      if (lastBrace > 0) {
        cleanBlock = cleanBlock.slice(0, lastBrace + 1);
      }
    }

    try {
      const mcq = JSON.parse(cleanBlock);
      if (mcq.id && mcq.question) {
        mcqs.push(mcq);
      }
    } catch (e) {
      // Try a more lenient parse for edge cases
      const idMatch = cleanBlock.match(/"id":\s*"([^"]+)"/);
      if (idMatch) {
        // Extract fields manually
        const mcq = extractFieldsManually(cleanBlock);
        if (mcq) {
          mcqs.push(mcq);
        }
      }
    }
  }

  return mcqs;
}

function extractFieldsManually(content) {
  try {
    const idMatch = content.match(/"id":\s*"([^"]+)"/);
    const sectionMatch = content.match(/"section":\s*"([^"]+)"/);
    const topicMatch = content.match(/"topic":\s*"([^"]+)"/);
    const subtopicMatch = content.match(/"subtopic":\s*"([^"]+)"/);
    const difficultyMatch = content.match(/"difficulty":\s*"([^"]+)"/);
    const formatMatch = content.match(/"questionFormat":\s*"([^"]+)"/);
    const questionMatch = content.match(/"question":\s*"((?:[^"\\]|\\.)*)"/);
    const correctAnswerMatch = content.match(/"correctAnswer":\s*"([^"]+)"/);
    const explanationMatch = content.match(/"explanation":\s*"((?:[^"\\]|\\.)*)"/);

    // Extract options object
    const optionsMatch = content.match(/"options":\s*\{([^}]+)\}/);
    let options = {};
    if (optionsMatch) {
      const optA = optionsMatch[1].match(/"A":\s*"((?:[^"\\]|\\.)*)"/);
      const optB = optionsMatch[1].match(/"B":\s*"((?:[^"\\]|\\.)*)"/);
      const optC = optionsMatch[1].match(/"C":\s*"((?:[^"\\]|\\.)*)"/);
      const optD = optionsMatch[1].match(/"D":\s*"((?:[^"\\]|\\.)*)"/);
      if (optA) options.A = optA[1];
      if (optB) options.B = optB[1];
      if (optC) options.C = optC[1];
      if (optD) options.D = optD[1];
    }

    if (!idMatch) return null;

    return {
      id: idMatch[1],
      section: sectionMatch ? sectionMatch[1] : null,
      topic: topicMatch ? topicMatch[1] : null,
      subtopic: subtopicMatch ? subtopicMatch[1] : null,
      difficulty: difficultyMatch ? difficultyMatch[1] : null,
      questionFormat: formatMatch ? formatMatch[1] : null,
      question: questionMatch ? questionMatch[1] : '',
      options: options,
      correctAnswer: correctAnswerMatch ? correctAnswerMatch[1] : null,
      explanation: explanationMatch ? explanationMatch[1] : '',
    };
  } catch (e) {
    return null;
  }
}

// ============== VALIDATORS ==============

const issues = [];
const formatCounts = {};
const sectionCounts = {};
const difficultyCounts = {};

function addIssue(severity, category, mcqId, section, message, details = {}) {
  issues.push({
    severity,
    category,
    mcqId,
    section,
    message,
    ...details
  });
}

function validateMCQ(mcq, section) {
  const optionValues = typeof mcq.options === 'object' ? Object.values(mcq.options) : [];
  const fullContent = mcq.question + ' ' + mcq.explanation + ' ' + optionValues.join(' ');

  // Count format types
  const format = mcq.questionFormat || 'unknown';
  formatCounts[format] = (formatCounts[format] || 0) + 1;

  // Count sections
  sectionCounts[section] = (sectionCounts[section] || 0) + 1;

  // Count difficulty
  const diff = mcq.difficulty || 'unknown';
  difficultyCounts[diff] = (difficultyCounts[diff] || 0) + 1;

  // A. Answer Accuracy - Check for outdated standards
  for (const [pattern, info] of Object.entries(OUTDATED_STANDARDS)) {
    if (fullContent.toLowerCase().includes(pattern.toLowerCase())) {
      // Check if it's in a distractor context
      const isDistractor = mcq.question.toLowerCase().includes('incorrect') ||
                          mcq.question.toLowerCase().includes('except') ||
                          mcq.question.toLowerCase().includes('not') ||
                          mcq.question.toUpperCase().includes('EXCEPT');

      // Also check if it appears in a wrong answer option
      const correctOpt = mcq.options[mcq.correctAnswer];
      const wrongOptions = Object.entries(mcq.options)
        .filter(([key]) => key !== mcq.correctAnswer)
        .map(([, val]) => val);
      const inWrongOption = wrongOptions.some(opt =>
        opt.toLowerCase().includes(pattern.toLowerCase())
      );

      // Check if it's a comparison (e.g., "ASC 840" mentioned alongside "ASC 842")
      const isComparison = info.replacement && fullContent.includes(info.replacement);

      if (!isDistractor && !inWrongOption && !isComparison) {
        addIssue(info.severity, 'outdated_standard', mcq.id, section,
          `Uses outdated ${pattern} - should use ${info.replacement} for ${info.topic}`);
      }
    }
  }

  // B. Option Count (should have exactly 4 options for CPA MCQs)
  const optionCount = Object.keys(mcq.options || {}).length;
  if (optionCount !== 4) {
    addIssue('high', 'option_count', mcq.id, section,
      `MCQ has ${optionCount} options instead of 4`);
  }

  // C. Correct Answer Validation
  if (!mcq.correctAnswer) {
    addIssue('critical', 'missing_answer', mcq.id, section,
      'MCQ is missing correctAnswer field');
  } else if (!['A', 'B', 'C', 'D'].includes(mcq.correctAnswer)) {
    addIssue('high', 'invalid_answer', mcq.id, section,
      `correctAnswer "${mcq.correctAnswer}" is not A, B, C, or D`);
  } else if (!mcq.options[mcq.correctAnswer]) {
    addIssue('critical', 'answer_mismatch', mcq.id, section,
      `correctAnswer "${mcq.correctAnswer}" has no corresponding option`);
  }

  // D. Explanation Quality
  if (!mcq.explanation || mcq.explanation.length < 50) {
    addIssue('medium', 'short_explanation', mcq.id, section,
      `Explanation is too short (${mcq.explanation?.length || 0} chars, min 50)`);
  }

  // E. Authoritative Reference Check
  const hasAuthRef = AUTHORITATIVE_PATTERNS.some(p => p.test(mcq.explanation || ''));
  if (!hasAuthRef && mcq.explanation) {
    addIssue('low', 'no_authoritative_ref', mcq.id, section,
      'Explanation lacks authoritative reference (ASC, AU-C, IRC, etc.)');
  }

  // F. Question Format Validation
  if (!mcq.questionFormat) {
    addIssue('medium', 'missing_format', mcq.id, section,
      'MCQ is missing questionFormat field');
  } else if (!EXPECTED_FORMATS.includes(mcq.questionFormat)) {
    addIssue('low', 'unknown_format', mcq.id, section,
      `Unknown questionFormat: ${mcq.questionFormat}`);
  }

  // G. Difficulty Validation
  if (!mcq.difficulty) {
    addIssue('medium', 'missing_difficulty', mcq.id, section,
      'MCQ is missing difficulty field');
  } else if (!['easy', 'medium', 'hard'].includes(mcq.difficulty)) {
    addIssue('low', 'invalid_difficulty', mcq.id, section,
      `Invalid difficulty: ${mcq.difficulty}`);
  }

  // H. Duplicate Options Check
  const uniqueOptions = new Set(optionValues.map(o => (o || '').toLowerCase().trim()));
  if (uniqueOptions.size !== optionValues.length && optionValues.length > 0) {
    addIssue('high', 'duplicate_options', mcq.id, section,
      'MCQ has duplicate answer options');
  }

  // I. Empty Question/Options
  if (!mcq.question || mcq.question.length < 20) {
    addIssue('critical', 'short_question', mcq.id, section,
      `Question is too short (${mcq.question?.length || 0} chars)`);
  }

  // J. Tax Year Currency (for REG/TCP)
  if ((section === 'REG' || section === 'TCP') && mcq.question) {
    const dollarAmounts = mcq.question.match(/\$[\d,]+/g);
    const hasYearContext = /202[4-6]|current year|tax year/i.test(mcq.question);

    if (dollarAmounts && dollarAmounts.length > 0 && !hasYearContext) {
      const thresholds = ['14,600', '29,200', '15,000', '18,000', '23,000', '7,000'];
      for (const amount of dollarAmounts) {
        if (thresholds.some(t => amount.includes(t))) {
          addIssue('info', 'tax_threshold_no_year', mcq.id, section,
            `Tax threshold ${amount} used without year context`);
        }
      }
    }
  }

  // K. "EXCEPT" format validation
  if (mcq.questionFormat === 'except' || (mcq.question && mcq.question.toLowerCase().includes('except'))) {
    if (mcq.question && !mcq.question.toUpperCase().includes('EXCEPT')) {
      addIssue('medium', 'except_not_capitalized', mcq.id, section,
        'EXCEPT questions should have EXCEPT in all caps for clarity');
    }
  }

  // L. Calculation format - should have numbers
  if (mcq.questionFormat === 'calculation') {
    const hasNumbers = /\d+/.test(mcq.question || '');
    if (!hasNumbers) {
      addIssue('medium', 'calculation_no_numbers', mcq.id, section,
        'Calculation question has no numeric values');
    }
  }

  // M. Check if correct answer appears reasonable within explanation
  if (mcq.explanation && mcq.correctAnswer && mcq.options[mcq.correctAnswer]) {
    const correctText = mcq.options[mcq.correctAnswer].toLowerCase();
    const explLower = mcq.explanation.toLowerCase();
    // Check for key terms from correct answer appearing in explanation
    const keyTerms = correctText.split(' ').filter(w => w.length > 5);
    const hasKeyTerm = keyTerms.some(term => explLower.includes(term));
    if (keyTerms.length > 2 && !hasKeyTerm) {
      addIssue('info', 'explanation_answer_mismatch', mcq.id, section,
        'Explanation may not adequately support the correct answer');
    }
  }
}

// ============== MAIN ==============

function runAudit(options = {}) {
  const { section: targetSection, verbose, output } = options;

  console.log('=== CPA MCQ Content Audit ===\n');

  let totalMCQs = 0;
  const sectionMCQs = {};
  const allMCQs = [];
  const seenIds = new Map(); // Track duplicate IDs

  for (const section of SECTIONS) {
    if (targetSection && section.toLowerCase() !== targetSection.toLowerCase()) {
      continue;
    }

    const filePath = path.join(MCQ_DIR, `${section}.ts`);
    if (!fs.existsSync(filePath)) {
      console.log(`Warning: ${section}.ts not found`);
      continue;
    }

    console.log(`Auditing ${section.toUpperCase()}...`);
    const mcqs = extractMCQsFromFile(filePath);
    sectionMCQs[section.toUpperCase()] = mcqs.length;
    totalMCQs += mcqs.length;

    for (const mcq of mcqs) {
      // Check for duplicate IDs
      if (seenIds.has(mcq.id)) {
        addIssue('critical', 'duplicate_id', mcq.id, section.toUpperCase(),
          `Duplicate MCQ ID found (also in ${seenIds.get(mcq.id)})`);
      } else {
        seenIds.set(mcq.id, section.toUpperCase());
      }

      validateMCQ(mcq, section.toUpperCase());
      allMCQs.push({ ...mcq, _section: section.toUpperCase() });
    }

    console.log(`  Found ${mcqs.length} MCQs`);
  }

  // Generate report
  console.log('\n=== AUDIT RESULTS ===\n');
  console.log(`Total MCQs Audited: ${totalMCQs}\n`);

  console.log('MCQs by Section:');
  for (const [sec, count] of Object.entries(sectionMCQs)) {
    console.log(`  ${sec}: ${count}`);
  }

  console.log('\n=== MCQ FORMAT DISTRIBUTION ===');
  const sortedFormats = Object.entries(formatCounts).sort((a, b) => b[1] - a[1]);
  for (const [format, count] of sortedFormats) {
    const pct = ((count / totalMCQs) * 100).toFixed(1);
    console.log(`  ${format}: ${count} (${pct}%)`);
  }

  console.log('\n=== DIFFICULTY DISTRIBUTION ===');
  for (const [diff, count] of Object.entries(difficultyCounts).sort((a, b) => b[1] - a[1])) {
    const pct = ((count / totalMCQs) * 100).toFixed(1);
    console.log(`  ${diff}: ${count} (${pct}%)`);
  }

  // Count issues by severity
  const severityCounts = { critical: 0, high: 0, medium: 0, low: 0, info: 0 };
  for (const issue of issues) {
    severityCounts[issue.severity]++;
  }

  console.log('\n=== ISSUES BY SEVERITY ===');
  for (const [sev, count] of Object.entries(severityCounts)) {
    console.log(`  ${sev}: ${count}`);
  }

  // Count issues by category
  const categoryCounts = {};
  for (const issue of issues) {
    categoryCounts[issue.category] = (categoryCounts[issue.category] || 0) + 1;
  }

  console.log('\n=== ISSUES BY CATEGORY ===');
  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  for (const [cat, count] of sortedCategories) {
    console.log(`  ${cat}: ${count}`);
  }

  // Show critical issues
  const criticalIssues = issues.filter(i => i.severity === 'critical');
  if (criticalIssues.length > 0) {
    console.log('\n=== CRITICAL ISSUES ===');
    for (const issue of criticalIssues) {
      console.log(`\n[${issue.section}] ${issue.mcqId}`);
      console.log(`  ${issue.message}`);
    }
  }

  // Show high priority issues (limit to 30)
  const highIssues = issues.filter(i => i.severity === 'high');
  if (highIssues.length > 0) {
    console.log('\n=== HIGH PRIORITY ISSUES (showing first 30) ===');
    for (const issue of highIssues.slice(0, 30)) {
      console.log(`\n[${issue.section}] ${issue.mcqId}`);
      console.log(`  ${issue.message}`);
    }
    if (highIssues.length > 30) {
      console.log(`\n  ... and ${highIssues.length - 30} more high priority issues`);
    }
  }

  // Output to file if requested
  if (output) {
    const report = {
      generatedAt: new Date().toISOString(),
      totalMCQs,
      sectionCounts: sectionMCQs,
      formatDistribution: formatCounts,
      difficultyDistribution: difficultyCounts,
      issueSummary: {
        bySeverity: severityCounts,
        byCategory: categoryCounts,
      },
      criticalIssues: criticalIssues,
      highIssues: highIssues,
      allIssues: issues,
    };

    fs.writeFileSync(output, JSON.stringify(report, null, 2));
    console.log(`\nDetailed report written to: ${output}`);
  }

  return {
    totalMCQs,
    formatCounts,
    sectionCounts: sectionMCQs,
    issues,
    severityCounts,
  };
}

// Parse CLI args
const args = process.argv.slice(2);
const options = {
  section: null,
  verbose: false,
  output: null,
};

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--section' && args[i + 1]) {
    options.section = args[++i];
  } else if (args[i] === '--verbose') {
    options.verbose = true;
  } else if (args[i] === '--output' && args[i + 1]) {
    options.output = args[++i];
  }
}

runAudit(options);
