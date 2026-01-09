/**
 * Audit script to find and archive questions that depend on other questions
 * These questions cannot be served independently in randomized batches
 */

const fs = require('fs');
const path = require('path');

// Patterns that indicate a question depends on another
const DEPENDENCY_PATTERNS = [
  /using the (same|previous)/i,
  /based on the (same|previous|above)/i,
  /refer(ring)? to (the )?(above|previous)/i,
  /from the (same|previous)/i,
  /the previous question/i,
  /the previous example/i,
  /using the previous/i,
  /same (facts|data|scenario|situation|information)/i,
  /question above/i,
  /scenario above/i,
  /information above/i,
];

// Question files to audit
const QUESTION_FILES = [
  '../src/lib/data/practice-questions/far.ts',
  '../src/lib/data/practice-questions/aud.ts',
  '../src/lib/data/practice-questions/reg.ts',
  '../src/lib/data/practice-questions/tcp.ts',
  '../src/lib/data/practice-questions/bar.ts',
  '../src/lib/data/practice-questions/isc.ts',
];

function extractQuestionsFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // Find the questions array - it's in the format: questions: [ ... ]
  const questionsMatch = content.match(/questions:\s*\[([\s\S]*?)\](?=\s*};?\s*(?:export|$))/);
  if (!questionsMatch) {
    console.log(`Could not find questions array in ${filePath}`);
    return [];
  }

  // Parse individual question objects
  const questionsStr = questionsMatch[1];
  const questions = [];

  // Use regex to find each question object
  const questionRegex = /\{[\s\S]*?"id":\s*"([^"]+)"[\s\S]*?"section":\s*"([^"]+)"[\s\S]*?"topic":\s*"([^"]+)"[\s\S]*?"subtopic":\s*"([^"]+)"[\s\S]*?"conceptTested":\s*"([^"]+)"[\s\S]*?"difficulty":\s*"([^"]+)"[\s\S]*?"questionFormat":\s*"([^"]+)"[\s\S]*?"question":\s*"([^"]+)"[\s\S]*?\}/g;

  let match;
  while ((match = questionRegex.exec(questionsStr)) !== null) {
    questions.push({
      id: match[1],
      section: match[2],
      topic: match[3],
      subtopic: match[4],
      conceptTested: match[5],
      difficulty: match[6],
      questionFormat: match[7],
      question: match[8],
    });
  }

  return questions;
}

function isDependentQuestion(question) {
  const questionText = question.question;

  for (const pattern of DEPENDENCY_PATTERNS) {
    if (pattern.test(questionText)) {
      return {
        isDependent: true,
        matchedPattern: pattern.toString(),
      };
    }
  }

  return { isDependent: false };
}

function main() {
  console.log('='.repeat(60));
  console.log('DEPENDENT QUESTION AUDIT');
  console.log('='.repeat(60));
  console.log('\nSearching for questions that depend on other questions...\n');

  const dependentQuestions = [];
  const sectionStats = {};
  const difficultyStats = {};
  const topicStats = {};
  const conceptStats = {};

  for (const relPath of QUESTION_FILES) {
    const filePath = path.join(__dirname, relPath);

    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }

    const content = fs.readFileSync(filePath, 'utf-8');

    // Find dependent questions by searching for patterns in the question text
    const lines = content.split('\n');
    let currentQuestion = null;
    let braceCount = 0;
    let inQuestion = false;
    let questionStartLine = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Look for question start
      if (line.includes('"question":')) {
        // Check if this line contains a dependent pattern
        for (const pattern of DEPENDENCY_PATTERNS) {
          if (pattern.test(line)) {
            // Find the ID by looking backwards
            let id = null, section = null, topic = null, subtopic = null,
                conceptTested = null, difficulty = null, questionFormat = null,
                questionText = null;

            // Look backwards for metadata
            for (let j = i; j >= Math.max(0, i - 20); j--) {
              const prevLine = lines[j];
              if (!id && prevLine.includes('"id":')) {
                const match = prevLine.match(/"id":\s*"([^"]+)"/);
                if (match) id = match[1];
              }
              if (!section && prevLine.includes('"section":')) {
                const match = prevLine.match(/"section":\s*"([^"]+)"/);
                if (match) section = match[1];
              }
              if (!topic && prevLine.includes('"topic":')) {
                const match = prevLine.match(/"topic":\s*"([^"]+)"/);
                if (match) topic = match[1];
              }
              if (!subtopic && prevLine.includes('"subtopic":')) {
                const match = prevLine.match(/"subtopic":\s*"([^"]+)"/);
                if (match) subtopic = match[1];
              }
              if (!conceptTested && prevLine.includes('"conceptTested":')) {
                const match = prevLine.match(/"conceptTested":\s*"([^"]+)"/);
                if (match) conceptTested = match[1];
              }
              if (!difficulty && prevLine.includes('"difficulty":')) {
                const match = prevLine.match(/"difficulty":\s*"([^"]+)"/);
                if (match) difficulty = match[1];
              }
              if (!questionFormat && prevLine.includes('"questionFormat":')) {
                const match = prevLine.match(/"questionFormat":\s*"([^"]+)"/);
                if (match) questionFormat = match[1];
              }
            }

            // Extract question text
            const questionMatch = line.match(/"question":\s*"([^"]+)"/);
            if (questionMatch) questionText = questionMatch[1];

            if (id) {
              dependentQuestions.push({
                id,
                section: section || 'Unknown',
                topic: topic || 'Unknown',
                subtopic: subtopic || 'Unknown',
                conceptTested: conceptTested || 'Unknown',
                difficulty: difficulty || 'Unknown',
                questionFormat: questionFormat || 'Unknown',
                question: questionText,
                matchedPattern: pattern.toString(),
                lineNumber: i + 1,
                file: path.basename(filePath),
              });

              // Update stats
              const sec = section || 'Unknown';
              const diff = difficulty || 'Unknown';
              const top = topic || 'Unknown';
              const concept = conceptTested || 'Unknown';

              sectionStats[sec] = (sectionStats[sec] || 0) + 1;
              difficultyStats[diff] = (difficultyStats[diff] || 0) + 1;
              topicStats[`${sec}:${top}`] = (topicStats[`${sec}:${top}`] || 0) + 1;
              conceptStats[concept] = (conceptStats[concept] || 0) + 1;
            }

            break;
          }
        }
      }
    }
  }

  // Output results
  console.log('\n' + '='.repeat(60));
  console.log('SUMMARY');
  console.log('='.repeat(60));
  console.log(`\nTotal dependent questions found: ${dependentQuestions.length}\n`);

  console.log('\n--- BY SECTION ---');
  Object.entries(sectionStats).sort((a, b) => b[1] - a[1]).forEach(([section, count]) => {
    console.log(`  ${section}: ${count}`);
  });

  console.log('\n--- BY DIFFICULTY ---');
  Object.entries(difficultyStats).sort((a, b) => b[1] - a[1]).forEach(([diff, count]) => {
    console.log(`  ${diff}: ${count}`);
  });

  console.log('\n--- BY TOPIC ---');
  Object.entries(topicStats).sort((a, b) => b[1] - a[1]).forEach(([topic, count]) => {
    console.log(`  ${topic}: ${count}`);
  });

  console.log('\n--- BY CONCEPT ---');
  Object.entries(conceptStats).sort((a, b) => b[1] - a[1]).forEach(([concept, count]) => {
    console.log(`  ${concept}: ${count}`);
  });

  console.log('\n\n' + '='.repeat(60));
  console.log('DETAILED LIST OF DEPENDENT QUESTIONS');
  console.log('='.repeat(60));

  dependentQuestions.forEach((q, idx) => {
    console.log(`\n${idx + 1}. ID: ${q.id}`);
    console.log(`   Section: ${q.section} | Topic: ${q.topic} | Difficulty: ${q.difficulty}`);
    console.log(`   Concept: ${q.conceptTested}`);
    console.log(`   Question: ${q.question.substring(0, 100)}...`);
    console.log(`   File: ${q.file} (line ${q.lineNumber})`);
  });

  // Save to JSON for archival
  const archivePath = path.join(__dirname, '../docs/admin/dependent-questions-archive.json');
  fs.writeFileSync(archivePath, JSON.stringify({
    auditDate: new Date().toISOString(),
    totalFound: dependentQuestions.length,
    bySection: sectionStats,
    byDifficulty: difficultyStats,
    byTopic: topicStats,
    byConcept: conceptStats,
    questions: dependentQuestions,
  }, null, 2));

  console.log(`\n\nArchive saved to: ${archivePath}`);

  // Generate replacement recommendations
  console.log('\n\n' + '='.repeat(60));
  console.log('REPLACEMENT RECOMMENDATIONS');
  console.log('='.repeat(60));
  console.log('\nTo maintain coverage, create independent replacement questions for:');

  Object.entries(topicStats).sort((a, b) => b[1] - a[1]).forEach(([topicKey, count]) => {
    const [section, topic] = topicKey.split(':');
    console.log(`\n• ${section} - ${topic}: ${count} question(s) needed`);
  });

  return dependentQuestions;
}

main();
