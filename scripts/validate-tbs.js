/**
 * TBS Question Bank Validation Script
 *
 * Checks for:
 * 1. Structural issues (missing fields, invalid references)
 * 2. Point total mismatches
 * 3. Dropdown option validity
 * 4. Duplicate IDs
 * 5. Content area alignment with section
 * 6. Potential outdated content (years, dollar amounts)
 *
 * Run with: node scripts/validate-tbs.js
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const TBS_DIR = path.join(__dirname, '../src/lib/data/tbs');
// Note: sample-tbs.ts excluded as it contains duplicate IDs from original development
const files = ['far-tbs.ts', 'aud-tbs.ts', 'reg-tbs.ts', 'tcp-tbs.ts', 'bar-tbs.ts', 'isc-tbs.ts'];

// Valid enums
const VALID_TBS_TYPES = ['numeric_entry', 'document_review', 'journal_entry', 'dropdown', 'research', 'reconciliation', 'written_communication'];
const VALID_REQUIREMENT_TYPES = ['numeric', 'dropdown', 'journal_debit', 'journal_credit', 'text', 'citation', 'checkbox', 'matching'];
const VALID_DIFFICULTIES = ['easy', 'medium', 'hard'];
const VALID_SKILL_LEVELS = ['remembering_understanding', 'application', 'analysis', 'evaluation'];
const VALID_SECTIONS = ['FAR', 'AUD', 'REG', 'TCP', 'BAR', 'ISC'];

// Content areas must match section prefix
const CONTENT_AREA_PREFIX = {
  FAR: 'FAR-',
  AUD: 'AUD-',
  REG: 'REG-',
  TCP: 'TCP-',
  BAR: 'BAR-',
  ISC: 'ISC-'
};

// Track all issues
const issues = {
  critical: [],
  warning: [],
  info: []
};

// Track all TBS IDs for duplicate detection
const allIds = new Set();
const duplicateIds = [];

// Statistics
const stats = {
  totalQuestions: 0,
  bySection: {},
  byType: {},
  byDifficulty: {},
  questionsWithIssues: 0
};

function extractTBSQuestions(content, filename) {
  const questions = [];

  // Match TBS question objects - look for objects with id: "tbs-xxx-xxx"
  const tbsRegex = /\{[\s\S]*?id:\s*["']([^"']+)["'][\s\S]*?(?=\n\};|\n\])/g;

  // Alternative: Parse the exported array more carefully
  // Find the main export array
  const exportMatch = content.match(/export\s+const\s+\w+TBSQuestions[^=]*=\s*\[([\s\S]*)\];?\s*$/);
  if (!exportMatch) {
    // Try individual exports
    const individualExports = content.match(/export\s+const\s+\w+:\s*TBSQuestion\s*=\s*\{[\s\S]*?\n\};/g);
    if (individualExports) {
      individualExports.forEach(exp => {
        const parsed = parseQuestion(exp, filename);
        if (parsed) questions.push(parsed);
      });
    }
    return questions;
  }

  // Split by top-level objects in the array
  const arrayContent = exportMatch[1];

  // Find all variable references and inline objects
  const varRefs = arrayContent.match(/\b\w+(?:TBS|Simulation)\w*\b/g) || [];

  // For each variable, find its definition in the file
  varRefs.forEach(varName => {
    const varRegex = new RegExp(`(?:export\\s+)?const\\s+${varName}\\s*:\\s*TBSQuestion\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`, 'm');
    const varMatch = content.match(varRegex);
    if (varMatch) {
      const parsed = parseQuestion(`{${varMatch[1]}}`, filename, varName);
      if (parsed) questions.push(parsed);
    }
  });

  return questions;
}

function parseQuestion(objString, filename, varName = null) {
  try {
    // Extract key fields using regex (safer than eval)
    const getId = (str) => {
      const match = str.match(/id:\s*["']([^"']+)["']/);
      return match ? match[1] : null;
    };

    const getField = (str, field) => {
      const regex = new RegExp(`${field}:\\s*["']([^"']+)["']`);
      const match = str.match(regex);
      return match ? match[1] : null;
    };

    const getNumericField = (str, field) => {
      const regex = new RegExp(`${field}:\\s*(\\d+(?:\\.\\d+)?)`);
      const match = str.match(regex);
      return match ? parseFloat(match[1]) : null;
    };

    const id = getId(objString);
    if (!id) return null;

    return {
      id,
      varName,
      section: getField(objString, 'section'),
      tbsType: getField(objString, 'tbsType'),
      topic: getField(objString, 'topic'),
      subtopic: getField(objString, 'subtopic'),
      difficulty: getField(objString, 'difficulty'),
      skillLevel: getField(objString, 'skillLevel'),
      contentArea: getField(objString, 'contentArea'),
      title: getField(objString, 'title'),
      maxScorePoints: getNumericField(objString, 'maxScorePoints'),
      timeEstimateMinutes: getNumericField(objString, 'timeEstimateMinutes'),
      raw: objString,
      filename
    };
  } catch (e) {
    return null;
  }
}

function extractRequirements(content, tbsId) {
  // Find the TBS definition and extract requirements
  const requirements = [];

  // Find requirements array for this TBS
  const tbsVarMatch = content.match(new RegExp(`const\\s+(\\w+)\\s*:\\s*TBSQuestion\\s*=\\s*\\{[\\s\\S]*?id:\\s*["']${tbsId}["'][\\s\\S]*?requirements:\\s*\\[([\\s\\S]*?)\\n\\s*\\]`, 'm'));

  if (!tbsVarMatch) return requirements;

  const reqContent = tbsVarMatch[2];

  // Extract each requirement object
  const reqMatches = reqContent.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/g) || [];

  reqMatches.forEach(reqStr => {
    const id = reqStr.match(/id:\s*["']([^"']+)["']/)?.[1];
    const type = reqStr.match(/type:\s*["']([^"']+)["']/)?.[1];
    const points = reqStr.match(/points:\s*(\d+(?:\.\d+)?)/)?.[1];
    const label = reqStr.match(/label:\s*["']([^"']+)["']/)?.[1];

    // For dropdown requirements, extract options
    const dropdownOptions = [];
    if (type === 'dropdown') {
      const optionsMatch = reqStr.match(/dropdownOptions:\s*\[([\s\S]*?)\]/);
      if (optionsMatch) {
        const optMatches = optionsMatch[1].match(/\{[^{}]+\}/g) || [];
        optMatches.forEach(optStr => {
          const optId = optStr.match(/id:\s*["']([^"']+)["']/)?.[1];
          const isCorrect = optStr.includes('isCorrect: true');
          dropdownOptions.push({ id: optId, isCorrect });
        });
      }
    }

    // Extract correct answer
    const correctAnswerType = reqStr.match(/correctAnswer:\s*\{[^}]*type:\s*["']([^"']+)["']/)?.[1];
    const correctOptionId = reqStr.match(/correctOptionId:\s*["']([^"']+)["']/)?.[1];

    if (id) {
      requirements.push({
        id,
        type,
        points: points ? parseFloat(points) : null,
        label,
        dropdownOptions,
        correctAnswerType,
        correctOptionId
      });
    }
  });

  return requirements;
}

function validateTBS(tbs, content) {
  const tbsIssues = [];

  // 1. Check required fields
  const requiredFields = ['id', 'section', 'tbsType', 'topic', 'difficulty', 'skillLevel', 'contentArea', 'title', 'maxScorePoints'];
  requiredFields.forEach(field => {
    if (!tbs[field]) {
      tbsIssues.push({ level: 'critical', msg: `Missing required field: ${field}` });
    }
  });

  // 2. Check ID uniqueness
  if (allIds.has(tbs.id)) {
    duplicateIds.push(tbs.id);
    tbsIssues.push({ level: 'critical', msg: `Duplicate ID: ${tbs.id}` });
  }
  allIds.add(tbs.id);

  // 3. Validate enums
  if (tbs.tbsType && !VALID_TBS_TYPES.includes(tbs.tbsType)) {
    tbsIssues.push({ level: 'critical', msg: `Invalid tbsType: ${tbs.tbsType}` });
  }

  if (tbs.difficulty && !VALID_DIFFICULTIES.includes(tbs.difficulty)) {
    tbsIssues.push({ level: 'critical', msg: `Invalid difficulty: ${tbs.difficulty}` });
  }

  if (tbs.skillLevel && !VALID_SKILL_LEVELS.includes(tbs.skillLevel)) {
    tbsIssues.push({ level: 'critical', msg: `Invalid skillLevel: ${tbs.skillLevel}` });
  }

  if (tbs.section && !VALID_SECTIONS.includes(tbs.section)) {
    tbsIssues.push({ level: 'critical', msg: `Invalid section: ${tbs.section}` });
  }

  // 4. Check content area matches section
  if (tbs.section && tbs.contentArea) {
    const expectedPrefix = CONTENT_AREA_PREFIX[tbs.section];
    if (expectedPrefix && !tbs.contentArea.startsWith(expectedPrefix)) {
      tbsIssues.push({ level: 'warning', msg: `Content area ${tbs.contentArea} doesn't match section ${tbs.section}` });
    }
  }

  // 5. Extract and validate requirements
  const requirements = extractRequirements(content, tbs.id);

  if (requirements.length === 0) {
    tbsIssues.push({ level: 'warning', msg: `No requirements found (may be parsing issue)` });
  } else {
    // Check point totals (warning only - regex parsing may miss nested points)
    const totalPoints = requirements.reduce((sum, r) => sum + (r.points || 0), 0);
    if (tbs.maxScorePoints && totalPoints > 0 && Math.abs(totalPoints - tbs.maxScorePoints) > 0.01) {
      // Only flag as warning if we found SOME points (otherwise likely parsing issue)
      tbsIssues.push({ level: 'warning', msg: `Points may not sum correctly: found ${totalPoints}, expected ${tbs.maxScorePoints}` });
    }

    // Validate each requirement
    requirements.forEach(req => {
      if (req.type && !VALID_REQUIREMENT_TYPES.includes(req.type)) {
        tbsIssues.push({ level: 'critical', msg: `Requirement ${req.id}: Invalid type '${req.type}'` });
      }

      // For dropdown requirements, validate options
      if (req.type === 'dropdown') {
        if (req.dropdownOptions.length === 0) {
          tbsIssues.push({ level: 'critical', msg: `Requirement ${req.id}: Dropdown has no options` });
        }

        const correctOptions = req.dropdownOptions.filter(o => o.isCorrect);
        if (correctOptions.length === 0) {
          tbsIssues.push({ level: 'critical', msg: `Requirement ${req.id}: Dropdown has no correct option marked` });
        }
        if (correctOptions.length > 1) {
          tbsIssues.push({ level: 'warning', msg: `Requirement ${req.id}: Dropdown has ${correctOptions.length} correct options` });
        }

        // Check that correctOptionId matches an actual option
        if (req.correctOptionId) {
          const optionExists = req.dropdownOptions.some(o => o.id === req.correctOptionId);
          if (!optionExists) {
            tbsIssues.push({ level: 'critical', msg: `Requirement ${req.id}: correctOptionId '${req.correctOptionId}' not found in options` });
          }

          // Check if correctOptionId matches the isCorrect: true option
          const markedCorrect = req.dropdownOptions.find(o => o.isCorrect);
          if (markedCorrect && markedCorrect.id !== req.correctOptionId) {
            tbsIssues.push({ level: 'critical', msg: `Requirement ${req.id}: correctOptionId '${req.correctOptionId}' doesn't match isCorrect option '${markedCorrect.id}'` });
          }
        }
      }
    });
  }

  // 6. Check for potentially outdated content
  const currentYear = new Date().getFullYear();
  const oldYears = [];
  for (let y = 2015; y < currentYear - 2; y++) {
    if (tbs.raw && tbs.raw.includes(String(y))) {
      oldYears.push(y);
    }
  }
  if (oldYears.length > 0) {
    tbsIssues.push({ level: 'info', msg: `Contains potentially outdated years: ${oldYears.join(', ')}` });
  }

  // Check for specific tax amounts that may be outdated
  const taxKeywords = ['standard deduction', 'exemption amount', 'tax bracket', 'contribution limit', 'ira limit', '401k limit'];
  taxKeywords.forEach(keyword => {
    if (tbs.raw && tbs.raw.toLowerCase().includes(keyword)) {
      tbsIssues.push({ level: 'info', msg: `Contains "${keyword}" - verify amounts are current` });
    }
  });

  return tbsIssues;
}

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

    stats.totalQuestions++;
    stats.bySection[tbs.section] = (stats.bySection[tbs.section] || 0) + 1;
    stats.byType[tbs.tbsType] = (stats.byType[tbs.tbsType] || 0) + 1;
    stats.byDifficulty[tbs.difficulty] = (stats.byDifficulty[tbs.difficulty] || 0) + 1;

    const tbsIssues = validateTBS(tbs, content);

    if (tbsIssues.length > 0) {
      stats.questionsWithIssues++;
      console.log(`\n  ${colors.yellow}${tbs.id}${colors.reset} (${tbs.title || 'No title'})`);

      tbsIssues.forEach(issue => {
        const color = issue.level === 'critical' ? colors.red :
                     issue.level === 'warning' ? colors.yellow : colors.blue;
        console.log(`    ${color}[${issue.level.toUpperCase()}]${colors.reset} ${issue.msg}`);

        issues[issue.level].push({
          tbsId: tbs.id,
          file: filename,
          ...issue
        });
      });
    }
  });
}

// Main execution
console.log(`${colors.bold}TBS Question Bank Validation${colors.reset}`);
console.log('================================\n');

files.forEach(processFile);

// Print summary
console.log(`\n\n${colors.bold}${colors.blue}=== SUMMARY ===${colors.reset}`);
console.log(`\nTotal TBS Questions: ${stats.totalQuestions}`);

console.log('\nBy Section:');
Object.entries(stats.bySection).sort().forEach(([section, count]) => {
  console.log(`  ${section}: ${count}`);
});

console.log('\nBy Type:');
Object.entries(stats.byType).sort().forEach(([type, count]) => {
  console.log(`  ${type}: ${count}`);
});

console.log('\nBy Difficulty:');
Object.entries(stats.byDifficulty).sort().forEach(([diff, count]) => {
  console.log(`  ${diff}: ${count}`);
});

console.log(`\n${colors.bold}Issues Found:${colors.reset}`);
console.log(`  ${colors.red}Critical: ${issues.critical.length}${colors.reset}`);
console.log(`  ${colors.yellow}Warnings: ${issues.warning.length}${colors.reset}`);
console.log(`  ${colors.blue}Info: ${issues.info.length}${colors.reset}`);
console.log(`\nQuestions with issues: ${stats.questionsWithIssues}/${stats.totalQuestions}`);

if (duplicateIds.length > 0) {
  console.log(`\n${colors.red}Duplicate IDs found: ${duplicateIds.join(', ')}${colors.reset}`);
}

// Exit with error code if critical issues
if (issues.critical.length > 0) {
  console.log(`\n${colors.red}${colors.bold}VALIDATION FAILED - ${issues.critical.length} critical issues${colors.reset}`);
  process.exit(1);
} else {
  console.log(`\n${colors.green}${colors.bold}VALIDATION PASSED${colors.reset}`);
}
