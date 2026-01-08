/**
 * Question Import Script
 *
 * Reads JSON question files from docs/question-batches/ and generates
 * TypeScript files in src/lib/data/practice-questions/
 *
 * Usage: node scripts/import-questions.js
 */

const fs = require('fs');
const path = require('path');

const BATCH_DIR = path.join(__dirname, '..', 'docs', 'question-batches');
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'lib', 'data', 'practice-questions');

const SECTIONS = ['far', 'aud', 'reg', 'tcp', 'bar', 'isc'];

const SECTION_INFO = {
  far: {
    name: 'Financial Accounting & Reporting',
    topics: [
      'Conceptual Framework & Standards',
      'Financial Statement Presentation',
      'Revenue Recognition',
      'Inventory',
      'Property, Plant & Equipment',
      'Intangible Assets',
      'Investments',
      'Leases',
      'Liabilities',
      'Stockholders Equity',
      'Stock Compensation',
      'Income Taxes',
      'Business Combinations',
      'Consolidations',
      'Foreign Currency',
      'Government Accounting',
      'Not-for-Profit Accounting',
    ],
  },
  aud: {
    name: 'Auditing & Attestation',
    topics: [
      'Professional Responsibilities & Ethics',
      'Engagement Planning',
      'Internal Control',
      'Audit Evidence & Procedures',
      'Audit Sampling',
      'Audit Reports',
      'Attestation & Other Services',
      'Accounting & Review Services',
    ],
  },
  reg: {
    name: 'Regulation',
    topics: [
      'Individual Taxation',
      'Corporate Taxation',
      'Partnership Taxation',
      'S Corporation Taxation',
      'Property Transactions',
      'Business Law',
      'Ethics & Professional Responsibility',
    ],
  },
  tcp: {
    name: 'Tax Compliance & Planning',
    topics: [
      'Individual Tax Planning',
      'Entity Tax Planning',
      'Property Transactions',
      'Tax Research & Communication',
      'State & Local Taxation',
      'International Taxation',
    ],
  },
  bar: {
    name: 'Business Analysis & Reporting',
    topics: [
      'Financial Statement Analysis',
      'Business Valuation',
      'Prospective Financial Information',
      'Cost Accounting',
      'Risk Management',
    ],
  },
  isc: {
    name: 'Information Systems & Controls',
    topics: [
      'IT General Controls',
      'System Development & Acquisition',
      'Information Security',
      'Data Management',
      'IT Audit & Assurance',
    ],
  },
};

function normalizeQuestion(q) {
  // Normalize options to ensure uppercase A, B, C, D
  if (q.options) {
    const normalized = {};
    for (const [key, value] of Object.entries(q.options)) {
      normalized[key.toUpperCase()] = value;
    }
    q.options = {
      A: normalized.A || '',
      B: normalized.B || '',
      C: normalized.C || '',
      D: normalized.D || '',
    };
  }

  // Normalize correctAnswer to uppercase
  if (q.correctAnswer) {
    q.correctAnswer = q.correctAnswer.toUpperCase();
  }

  return q;
}

function loadQuestionsFromSection(section) {
  const sectionDir = path.join(BATCH_DIR, section);

  if (!fs.existsSync(sectionDir)) {
    console.log(`  No directory found for ${section.toUpperCase()}`);
    return [];
  }

  const files = fs.readdirSync(sectionDir).filter(f => f.endsWith('.json'));
  console.log(`  Found ${files.length} batch files in ${section}/`);

  const questions = [];

  for (const file of files) {
    const filePath = path.join(sectionDir, file);
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const batch = JSON.parse(content);

      let batchQuestions = [];
      if (Array.isArray(batch)) {
        // Format 1: Direct array of questions
        batchQuestions = batch;
      } else if (batch.questions && Array.isArray(batch.questions)) {
        // Format 2: Object with batchMetadata and questions array
        batchQuestions = batch.questions;
      } else {
        console.log(`    Warning: ${file} has unknown format, skipping`);
        continue;
      }

      // Normalize each question
      questions.push(...batchQuestions.map(normalizeQuestion));
    } catch (err) {
      console.log(`    Error reading ${file}: ${err.message}`);
    }
  }

  return questions;
}

function generateTypeScriptFile(section, questions) {
  const info = SECTION_INFO[section];
  const sectionUpper = section.toUpperCase();

  // Get unique topics from questions
  const topicsFromQuestions = [...new Set(questions.map(q => q.topic))].sort();
  const topics = topicsFromQuestions.length > 0 ? topicsFromQuestions : info.topics;

  // Use unknown cast to avoid TypeScript complexity issues with large arrays
  const content = `import { PracticeQuestion, QuestionSet } from './types';

// ${sectionUpper} - ${info.name}
// Total Questions: ${questions.length}
// Last Updated: ${new Date().toISOString().split('T')[0]}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const questions = ${JSON.stringify(questions, null, 2)} as unknown as PracticeQuestion[];

export const ${section}Questions: QuestionSet = {
  section: '${sectionUpper}',
  sectionName: '${info.name}',
  topics: ${JSON.stringify(topics, null, 4).replace(/\n/g, '\n  ')},
  questions,
};
`;

  return content;
}

function main() {
  console.log('Question Import Script');
  console.log('======================\n');

  const stats = {};

  for (const section of SECTIONS) {
    console.log(`Processing ${section.toUpperCase()}...`);

    const questions = loadQuestionsFromSection(section);
    stats[section] = questions.length;

    if (questions.length > 0) {
      const content = generateTypeScriptFile(section, questions);
      const outputPath = path.join(OUTPUT_DIR, `${section}.ts`);

      fs.writeFileSync(outputPath, content, 'utf8');
      console.log(`  Wrote ${questions.length} questions to ${section}.ts\n`);
    } else {
      console.log(`  No questions to import\n`);
    }
  }

  console.log('\nSummary');
  console.log('-------');
  let total = 0;
  for (const [section, count] of Object.entries(stats)) {
    console.log(`${section.toUpperCase()}: ${count} questions`);
    total += count;
  }
  console.log(`\nTotal: ${total} questions imported`);
}

main();
