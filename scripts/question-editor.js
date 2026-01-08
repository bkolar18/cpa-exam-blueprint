#!/usr/bin/env node
/**
 * Question Editor CLI Tool
 *
 * Search, view, and edit practice questions in the CPA exam question bank.
 *
 * Usage:
 *   node scripts/question-editor.js search <query>     - Search questions by text, ID, or topic
 *   node scripts/question-editor.js view <id>         - View a specific question by ID
 *   node scripts/question-editor.js edit <id>         - Edit a question (opens interactive editor)
 *   node scripts/question-editor.js validate          - Check all questions for issues
 *   node scripts/question-editor.js stats             - Show question statistics
 *   node scripts/question-editor.js list-topics <section> - List all topics for a section
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const BATCH_DIR = path.join(__dirname, '..', 'docs', 'question-batches');
const SECTIONS = ['far', 'aud', 'reg', 'tcp', 'bar', 'isc'];

// ANSI colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function color(text, colorName) {
  return `${colors[colorName]}${text}${colors.reset}`;
}

/**
 * Load all questions from all batch files
 */
function loadAllQuestions() {
  const allQuestions = [];

  for (const section of SECTIONS) {
    const sectionDir = path.join(BATCH_DIR, section);
    if (!fs.existsSync(sectionDir)) continue;

    const files = fs.readdirSync(sectionDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(sectionDir, file);
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const batch = JSON.parse(content);

        let questions = [];
        if (Array.isArray(batch)) {
          questions = batch;
        } else if (batch.questions && Array.isArray(batch.questions)) {
          questions = batch.questions;
        }

        // Add source file info to each question
        for (const q of questions) {
          allQuestions.push({
            ...q,
            _sourceFile: filePath,
            _sourceSection: section,
            _sourceFileName: file,
          });
        }
      } catch (err) {
        console.error(`Error reading ${file}: ${err.message}`);
      }
    }
  }

  return allQuestions;
}

/**
 * Search questions by query
 */
function searchQuestions(query, questions) {
  const lowerQuery = query.toLowerCase();

  return questions.filter(q => {
    // Search in ID
    if (q.id && q.id.toLowerCase().includes(lowerQuery)) return true;
    // Search in question text
    if (q.question && q.question.toLowerCase().includes(lowerQuery)) return true;
    // Search in topic
    if (q.topic && q.topic.toLowerCase().includes(lowerQuery)) return true;
    // Search in subtopic
    if (q.subtopic && q.subtopic.toLowerCase().includes(lowerQuery)) return true;
    // Search in concept tested
    if (q.conceptTested && q.conceptTested.toLowerCase().includes(lowerQuery)) return true;
    // Search in explanation
    if (q.explanation && q.explanation.toLowerCase().includes(lowerQuery)) return true;
    // Search in options
    if (q.options) {
      for (const opt of Object.values(q.options)) {
        if (opt && opt.toLowerCase().includes(lowerQuery)) return true;
      }
    }
    return false;
  });
}

/**
 * Find a question by exact ID
 */
function findQuestionById(id, questions) {
  return questions.find(q => q.id === id);
}

/**
 * Display a question in a readable format
 */
function displayQuestion(q, showSource = true) {
  console.log('\n' + '='.repeat(80));
  console.log(color(`ID: ${q.id}`, 'cyan'));
  console.log(color(`Section: ${q.section}`, 'blue') + ' | ' +
              color(`Topic: ${q.topic}`, 'blue'));
  if (q.subtopic) console.log(color(`Subtopic: ${q.subtopic}`, 'dim'));
  if (q.conceptTested) console.log(color(`Concept: ${q.conceptTested}`, 'dim'));
  console.log(color(`Difficulty: ${q.difficulty}`, 'yellow') + ' | ' +
              color(`Format: ${q.questionFormat}`, 'yellow'));
  console.log('-'.repeat(80));
  console.log(color('\nQuestion:', 'bright'));
  console.log(q.question);
  console.log(color('\nOptions:', 'bright'));
  console.log(`  A) ${q.options?.A || '(empty)'}`);
  console.log(`  B) ${q.options?.B || '(empty)'}`);
  console.log(`  C) ${q.options?.C || '(empty)'}`);
  console.log(`  D) ${q.options?.D || '(empty)'}`);
  console.log(color(`\nCorrect Answer: ${q.correctAnswer}`, 'green'));
  console.log(color('\nExplanation:', 'bright'));
  console.log(q.explanation || '(no explanation)');
  if (q.tip) {
    console.log(color('\nTip:', 'magenta'));
    console.log(q.tip);
  }
  if (showSource) {
    console.log('-'.repeat(80));
    console.log(color(`Source: ${q._sourceSection}/${q._sourceFileName}`, 'dim'));
  }
  console.log('='.repeat(80) + '\n');
}

/**
 * Validate all questions for issues
 */
function validateQuestions(questions) {
  const issues = [];
  const seenIds = new Set();

  for (const q of questions) {
    const prefix = `[${q._sourceSection}/${q._sourceFileName}] ${q.id || '(no id)'}`;

    // Check for missing ID
    if (!q.id) {
      issues.push({ severity: 'error', message: `${prefix}: Missing question ID` });
    } else if (seenIds.has(q.id)) {
      issues.push({ severity: 'error', message: `${prefix}: Duplicate question ID` });
    } else {
      seenIds.add(q.id);
    }

    // Check for missing required fields
    if (!q.question) {
      issues.push({ severity: 'error', message: `${prefix}: Missing question text` });
    }
    if (!q.correctAnswer) {
      issues.push({ severity: 'error', message: `${prefix}: Missing correct answer` });
    }
    if (!q.explanation) {
      issues.push({ severity: 'warning', message: `${prefix}: Missing explanation` });
    }

    // Check options
    if (!q.options) {
      issues.push({ severity: 'error', message: `${prefix}: Missing options` });
    } else {
      for (const opt of ['A', 'B', 'C', 'D']) {
        if (!q.options[opt] && !q.options[opt.toLowerCase()]) {
          issues.push({ severity: 'error', message: `${prefix}: Missing option ${opt}` });
        }
      }
    }

    // Check correct answer is valid
    if (q.correctAnswer && !['A', 'B', 'C', 'D', 'a', 'b', 'c', 'd'].includes(q.correctAnswer)) {
      issues.push({ severity: 'error', message: `${prefix}: Invalid correct answer "${q.correctAnswer}"` });
    }

    // Check for very short questions (might be incomplete)
    if (q.question && q.question.length < 20) {
      issues.push({ severity: 'warning', message: `${prefix}: Very short question text (${q.question.length} chars)` });
    }

    // Check for very short explanations
    if (q.explanation && q.explanation.length < 20) {
      issues.push({ severity: 'warning', message: `${prefix}: Very short explanation (${q.explanation.length} chars)` });
    }
  }

  return issues;
}

/**
 * Get statistics about questions
 */
function getStats(questions) {
  const stats = {
    total: questions.length,
    bySection: {},
    byDifficulty: { easy: 0, medium: 0, hard: 0 },
    byFormat: {},
    topicsBySection: {},
  };

  for (const q of questions) {
    // By section
    const section = q.section || q._sourceSection?.toUpperCase() || 'UNKNOWN';
    stats.bySection[section] = (stats.bySection[section] || 0) + 1;

    // By difficulty
    if (q.difficulty) {
      stats.byDifficulty[q.difficulty] = (stats.byDifficulty[q.difficulty] || 0) + 1;
    }

    // By format
    if (q.questionFormat) {
      stats.byFormat[q.questionFormat] = (stats.byFormat[q.questionFormat] || 0) + 1;
    }

    // Topics by section
    if (!stats.topicsBySection[section]) {
      stats.topicsBySection[section] = new Set();
    }
    if (q.topic) {
      stats.topicsBySection[section].add(q.topic);
    }
  }

  // Convert Sets to arrays with counts
  for (const section of Object.keys(stats.topicsBySection)) {
    stats.topicsBySection[section] = Array.from(stats.topicsBySection[section]);
  }

  return stats;
}

/**
 * Edit a question interactively
 */
async function editQuestion(questionId, questions) {
  const question = findQuestionById(questionId, questions);

  if (!question) {
    console.log(color(`Question not found: ${questionId}`, 'red'));
    return;
  }

  console.log(color('\nCurrent question:', 'bright'));
  displayQuestion(question);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const prompt = (query) => new Promise(resolve => rl.question(query, resolve));

  console.log(color('\nEnter new values (press Enter to keep current value):', 'cyan'));
  console.log(color('Type "CANCEL" at any prompt to cancel editing.\n', 'dim'));

  const updates = {};

  // Edit question text
  const newQuestion = await prompt(`Question text:\n[${question.question.substring(0, 50)}...]\n> `);
  if (newQuestion.toUpperCase() === 'CANCEL') {
    console.log(color('Edit cancelled.', 'yellow'));
    rl.close();
    return;
  }
  if (newQuestion.trim()) updates.question = newQuestion.trim();

  // Edit options
  for (const opt of ['A', 'B', 'C', 'D']) {
    const currentVal = question.options?.[opt] || '';
    const newVal = await prompt(`Option ${opt}:\n[${currentVal.substring(0, 50)}${currentVal.length > 50 ? '...' : ''}]\n> `);
    if (newVal.toUpperCase() === 'CANCEL') {
      console.log(color('Edit cancelled.', 'yellow'));
      rl.close();
      return;
    }
    if (newVal.trim()) {
      if (!updates.options) updates.options = { ...question.options };
      updates.options[opt] = newVal.trim();
    }
  }

  // Edit correct answer
  const newAnswer = await prompt(`Correct answer [${question.correctAnswer}]: `);
  if (newAnswer.toUpperCase() === 'CANCEL') {
    console.log(color('Edit cancelled.', 'yellow'));
    rl.close();
    return;
  }
  if (newAnswer.trim() && ['A', 'B', 'C', 'D'].includes(newAnswer.trim().toUpperCase())) {
    updates.correctAnswer = newAnswer.trim().toUpperCase();
  }

  // Edit explanation
  const newExplanation = await prompt(`Explanation:\n[${(question.explanation || '').substring(0, 50)}...]\n> `);
  if (newExplanation.toUpperCase() === 'CANCEL') {
    console.log(color('Edit cancelled.', 'yellow'));
    rl.close();
    return;
  }
  if (newExplanation.trim()) updates.explanation = newExplanation.trim();

  rl.close();

  if (Object.keys(updates).length === 0) {
    console.log(color('\nNo changes made.', 'yellow'));
    return;
  }

  // Apply updates to the source file
  console.log(color('\nApplying changes...', 'cyan'));

  try {
    const fileContent = fs.readFileSync(question._sourceFile, 'utf8');
    const batch = JSON.parse(fileContent);

    let questionsArray;
    let isWrapped = false;

    if (Array.isArray(batch)) {
      questionsArray = batch;
    } else if (batch.questions && Array.isArray(batch.questions)) {
      questionsArray = batch.questions;
      isWrapped = true;
    }

    // Find and update the question
    const idx = questionsArray.findIndex(q => q.id === questionId);
    if (idx === -1) {
      console.log(color('Error: Could not find question in source file.', 'red'));
      return;
    }

    questionsArray[idx] = { ...questionsArray[idx], ...updates };

    // Write back to file
    const newContent = isWrapped
      ? JSON.stringify({ ...batch, questions: questionsArray }, null, 2)
      : JSON.stringify(questionsArray, null, 2);

    fs.writeFileSync(question._sourceFile, newContent, 'utf8');

    console.log(color('✓ Question updated successfully!', 'green'));
    console.log(color(`\nFile: ${question._sourceFile}`, 'dim'));
    console.log(color('\nRemember to run "node scripts/import-questions.js" to regenerate TypeScript files.', 'yellow'));

  } catch (err) {
    console.log(color(`Error updating question: ${err.message}`, 'red'));
  }
}

/**
 * List all topics for a section
 */
function listTopics(section, questions) {
  const sectionUpper = section.toUpperCase();
  const sectionQuestions = questions.filter(q =>
    (q.section || q._sourceSection?.toUpperCase()) === sectionUpper
  );

  const topicCounts = {};
  for (const q of sectionQuestions) {
    if (q.topic) {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    }
  }

  console.log(color(`\nTopics for ${sectionUpper} (${sectionQuestions.length} questions):`, 'bright'));
  console.log('-'.repeat(60));

  const sortedTopics = Object.entries(topicCounts).sort((a, b) => b[1] - a[1]);
  for (const [topic, count] of sortedTopics) {
    console.log(`  ${topic}: ${color(count + ' questions', 'cyan')}`);
  }
}

/**
 * Main CLI handler
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  if (!command) {
    console.log(`
${color('Question Editor CLI Tool', 'bright')}

Usage:
  node scripts/question-editor.js ${color('search', 'cyan')} <query>        Search questions by text, ID, or topic
  node scripts/question-editor.js ${color('view', 'cyan')} <id>            View a specific question by ID
  node scripts/question-editor.js ${color('edit', 'cyan')} <id>            Edit a question interactively
  node scripts/question-editor.js ${color('validate', 'cyan')}              Check all questions for issues
  node scripts/question-editor.js ${color('stats', 'cyan')}                 Show question statistics
  node scripts/question-editor.js ${color('list-topics', 'cyan')} <section> List all topics for a section

Examples:
  node scripts/question-editor.js search "depreciation"
  node scripts/question-editor.js search "FAR-001"
  node scripts/question-editor.js view FAR-INV-001
  node scripts/question-editor.js edit FAR-INV-001
  node scripts/question-editor.js list-topics far
`);
    return;
  }

  console.log(color('Loading questions...', 'dim'));
  const questions = loadAllQuestions();
  console.log(color(`Loaded ${questions.length} questions.\n`, 'dim'));

  switch (command) {
    case 'search': {
      const query = args.slice(1).join(' ');
      if (!query) {
        console.log(color('Please provide a search query.', 'red'));
        return;
      }

      const results = searchQuestions(query, questions);
      console.log(color(`Found ${results.length} matching questions:\n`, 'green'));

      if (results.length === 0) {
        console.log('No questions found matching your query.');
        return;
      }

      // Show summary for each result
      for (const q of results.slice(0, 20)) {
        console.log(color(`${q.id}`, 'cyan') + ` [${q._sourceSection}]`);
        console.log(`  ${q.question.substring(0, 100)}${q.question.length > 100 ? '...' : ''}`);
        console.log(color(`  Topic: ${q.topic} | Difficulty: ${q.difficulty}`, 'dim'));
        console.log('');
      }

      if (results.length > 20) {
        console.log(color(`... and ${results.length - 20} more results. Refine your search to see more.`, 'yellow'));
      }
      break;
    }

    case 'view': {
      const id = args[1];
      if (!id) {
        console.log(color('Please provide a question ID.', 'red'));
        return;
      }

      const question = findQuestionById(id, questions);
      if (!question) {
        console.log(color(`Question not found: ${id}`, 'red'));

        // Try to find similar IDs
        const similar = questions.filter(q => q.id && q.id.toLowerCase().includes(id.toLowerCase())).slice(0, 5);
        if (similar.length > 0) {
          console.log(color('\nDid you mean one of these?', 'yellow'));
          for (const q of similar) {
            console.log(`  ${q.id}`);
          }
        }
        return;
      }

      displayQuestion(question);
      break;
    }

    case 'edit': {
      const id = args[1];
      if (!id) {
        console.log(color('Please provide a question ID.', 'red'));
        return;
      }

      await editQuestion(id, questions);
      break;
    }

    case 'validate': {
      console.log(color('Validating all questions...\n', 'cyan'));
      const issues = validateQuestions(questions);

      const errors = issues.filter(i => i.severity === 'error');
      const warnings = issues.filter(i => i.severity === 'warning');

      if (errors.length > 0) {
        console.log(color(`\n${errors.length} Errors:`, 'red'));
        for (const issue of errors) {
          console.log(color(`  ✗ ${issue.message}`, 'red'));
        }
      }

      if (warnings.length > 0) {
        console.log(color(`\n${warnings.length} Warnings:`, 'yellow'));
        for (const issue of warnings.slice(0, 20)) {
          console.log(color(`  ⚠ ${issue.message}`, 'yellow'));
        }
        if (warnings.length > 20) {
          console.log(color(`  ... and ${warnings.length - 20} more warnings`, 'dim'));
        }
      }

      if (issues.length === 0) {
        console.log(color('✓ All questions passed validation!', 'green'));
      } else {
        console.log(color(`\nTotal: ${errors.length} errors, ${warnings.length} warnings`, 'bright'));
      }
      break;
    }

    case 'stats': {
      const stats = getStats(questions);

      console.log(color('\nQuestion Bank Statistics', 'bright'));
      console.log('='.repeat(50));

      console.log(color(`\nTotal Questions: ${stats.total}`, 'green'));

      console.log(color('\nBy Section:', 'cyan'));
      for (const [section, count] of Object.entries(stats.bySection).sort((a, b) => b[1] - a[1])) {
        const bar = '█'.repeat(Math.ceil(count / 100));
        console.log(`  ${section.padEnd(5)} ${String(count).padStart(5)} ${color(bar, 'blue')}`);
      }

      console.log(color('\nBy Difficulty:', 'cyan'));
      for (const [diff, count] of Object.entries(stats.byDifficulty)) {
        const pct = ((count / stats.total) * 100).toFixed(1);
        console.log(`  ${diff.padEnd(8)} ${String(count).padStart(5)} (${pct}%)`);
      }

      console.log(color('\nBy Format:', 'cyan'));
      for (const [format, count] of Object.entries(stats.byFormat).sort((a, b) => b[1] - a[1])) {
        console.log(`  ${format.padEnd(15)} ${String(count).padStart(5)}`);
      }

      console.log(color('\nTopics per Section:', 'cyan'));
      for (const [section, topics] of Object.entries(stats.topicsBySection)) {
        console.log(`  ${section}: ${topics.length} topics`);
      }
      break;
    }

    case 'list-topics': {
      const section = args[1];
      if (!section) {
        console.log(color('Please provide a section (far, aud, reg, tcp, bar, isc).', 'red'));
        return;
      }

      if (!SECTIONS.includes(section.toLowerCase())) {
        console.log(color(`Invalid section. Choose from: ${SECTIONS.join(', ')}`, 'red'));
        return;
      }

      listTopics(section, questions);
      break;
    }

    default:
      console.log(color(`Unknown command: ${command}`, 'red'));
      console.log('Run without arguments to see usage.');
  }
}

main().catch(console.error);
