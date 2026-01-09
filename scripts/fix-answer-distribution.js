/**
 * Fix Answer Distribution Script
 *
 * This script redistributes correct answers evenly across A, B, C, D
 * by rotating the options while keeping the correct content matched.
 *
 * Run with: node scripts/fix-answer-distribution.js
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/lib/data/practice-questions');

// Files to process (exclude index, types, taxonomy)
const questionFiles = ['far.ts', 'aud.ts', 'reg.ts', 'tcp.ts', 'bar.ts', 'isc.ts'];

function rotateOptions(options, correctAnswer, targetAnswer) {
  // Get the letters in order
  const letters = ['A', 'B', 'C', 'D'];
  const correctIndex = letters.indexOf(correctAnswer);
  const targetIndex = letters.indexOf(targetAnswer);

  // Calculate rotation needed
  const rotation = (targetIndex - correctIndex + 4) % 4;

  if (rotation === 0) return { options, correctAnswer };

  // Create new options object with rotated positions
  const newOptions = {};
  letters.forEach((letter, i) => {
    const sourceIndex = (i - rotation + 4) % 4;
    const sourceLetter = letters[sourceIndex];
    newOptions[letter] = options[sourceLetter];
  });

  return { options: newOptions, correctAnswer: targetAnswer };
}

function processFile(filename) {
  const filePath = path.join(QUESTIONS_DIR, filename);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract the questions array using regex
  const questionsMatch = content.match(/const questions = \[([\s\S]*?)\];/);
  if (!questionsMatch) {
    console.log(`Could not find questions array in ${filename}`);
    return { before: {}, after: {}, total: 0 };
  }

  // Parse the questions - they're in JSON-like format within the array
  // We need to extract each question object
  const questionsStr = questionsMatch[1];

  // Find all question objects
  const questionRegex = /\{[\s\S]*?"id":\s*"([^"]+)"[\s\S]*?"options":\s*\{[\s\S]*?"A":\s*"([^"]*)"[\s\S]*?"B":\s*"([^"]*)"[\s\S]*?"C":\s*"([^"]*)"[\s\S]*?"D":\s*"([^"]*)"[\s\S]*?\}[\s\S]*?"correctAnswer":\s*"([ABCD])"[\s\S]*?\}/g;

  const questions = [];
  let match;
  while ((match = questionRegex.exec(questionsStr)) !== null) {
    questions.push({
      id: match[1],
      fullMatch: match[0],
      options: {
        A: match[2],
        B: match[3],
        C: match[4],
        D: match[5]
      },
      correctAnswer: match[6]
    });
  }

  console.log(`Found ${questions.length} questions in ${filename}`);

  // Count current distribution
  const beforeCounts = { A: 0, B: 0, C: 0, D: 0 };
  questions.forEach(q => beforeCounts[q.correctAnswer]++);

  // Calculate target distribution (roughly equal)
  const total = questions.length;
  const targetPerLetter = Math.floor(total / 4);
  const remainder = total % 4;

  const targets = {
    A: targetPerLetter + (remainder > 0 ? 1 : 0),
    B: targetPerLetter + (remainder > 1 ? 1 : 0),
    C: targetPerLetter + (remainder > 2 ? 1 : 0),
    D: targetPerLetter
  };

  console.log(`Target distribution: A=${targets.A}, B=${targets.B}, C=${targets.C}, D=${targets.D}`);

  // Assign new answers to achieve balanced distribution
  // Shuffle questions first to randomize which ones get reassigned
  const shuffledIndices = questions.map((_, i) => i).sort(() => Math.random() - 0.5);

  const newAnswers = { A: 0, B: 0, C: 0, D: 0 };
  const assignments = new Array(questions.length);

  // First pass: assign to least-filled buckets
  shuffledIndices.forEach(idx => {
    // Find the letter with most room
    let bestLetter = 'A';
    let bestRoom = targets.A - newAnswers.A;

    ['B', 'C', 'D'].forEach(letter => {
      const room = targets[letter] - newAnswers[letter];
      if (room > bestRoom) {
        bestRoom = room;
        bestLetter = letter;
      }
    });

    assignments[idx] = bestLetter;
    newAnswers[bestLetter]++;
  });

  // Apply changes to the file content
  let newContent = content;
  let changesCount = 0;

  questions.forEach((q, idx) => {
    const targetAnswer = assignments[idx];
    if (q.correctAnswer === targetAnswer) return; // No change needed

    const { options: newOptions, correctAnswer: newCorrect } = rotateOptions(
      q.options,
      q.correctAnswer,
      targetAnswer
    );

    // Build the replacement for this question's options and correctAnswer
    // We need to carefully replace just the options and correctAnswer

    // Find this specific question in the content by its ID
    const idPattern = `"id": "${q.id}"`;
    const questionStart = newContent.indexOf(idPattern);
    if (questionStart === -1) {
      console.log(`Could not find question ${q.id}`);
      return;
    }

    // Find the options block for this question
    const searchStart = questionStart;
    const optionsStart = newContent.indexOf('"options":', searchStart);
    const optionsObjStart = newContent.indexOf('{', optionsStart);

    // Find matching closing brace for options
    let braceCount = 1;
    let optionsObjEnd = optionsObjStart + 1;
    while (braceCount > 0 && optionsObjEnd < newContent.length) {
      if (newContent[optionsObjEnd] === '{') braceCount++;
      if (newContent[optionsObjEnd] === '}') braceCount--;
      optionsObjEnd++;
    }

    // Build new options string
    const newOptionsStr = `{
      "A": "${newOptions.A.replace(/"/g, '\\"')}",
      "B": "${newOptions.B.replace(/"/g, '\\"')}",
      "C": "${newOptions.C.replace(/"/g, '\\"')}",
      "D": "${newOptions.D.replace(/"/g, '\\"')}"
    }`;

    // Replace options
    newContent = newContent.slice(0, optionsObjStart) + newOptionsStr + newContent.slice(optionsObjEnd);

    // Now find and replace correctAnswer for this question
    // Need to re-find position since content changed
    const newQuestionStart = newContent.indexOf(idPattern);
    const correctAnswerPattern = /"correctAnswer": "[ABCD]"/;
    const searchRegion = newContent.slice(newQuestionStart, newQuestionStart + 3000);
    const correctMatch = searchRegion.match(correctAnswerPattern);

    if (correctMatch) {
      const correctStart = newQuestionStart + correctMatch.index;
      const correctEnd = correctStart + correctMatch[0].length;
      newContent = newContent.slice(0, correctStart) + `"correctAnswer": "${newCorrect}"` + newContent.slice(correctEnd);
      changesCount++;
    }
  });

  // Write the updated content
  fs.writeFileSync(filePath, newContent, 'utf8');

  console.log(`Modified ${changesCount} questions in ${filename}`);

  return {
    before: beforeCounts,
    after: newAnswers,
    total: questions.length
  };
}

// Main execution
console.log('=== Answer Distribution Fix Script ===\n');

const results = {};
questionFiles.forEach(file => {
  console.log(`\nProcessing ${file}...`);
  results[file] = processFile(file);
});

console.log('\n\n=== SUMMARY ===');
let totalBefore = { A: 0, B: 0, C: 0, D: 0 };
let totalAfter = { A: 0, B: 0, C: 0, D: 0 };
let grandTotal = 0;

Object.entries(results).forEach(([file, data]) => {
  console.log(`\n${file}:`);
  console.log(`  Before: A=${data.before.A}, B=${data.before.B}, C=${data.before.C}, D=${data.before.D}`);
  console.log(`  After:  A=${data.after.A}, B=${data.after.B}, C=${data.after.C}, D=${data.after.D}`);

  ['A', 'B', 'C', 'D'].forEach(l => {
    totalBefore[l] += data.before[l] || 0;
    totalAfter[l] += data.after[l] || 0;
  });
  grandTotal += data.total;
});

console.log(`\n=== OVERALL (${grandTotal} questions) ===`);
console.log(`Before: A=${totalBefore.A} (${(totalBefore.A/grandTotal*100).toFixed(1)}%), B=${totalBefore.B} (${(totalBefore.B/grandTotal*100).toFixed(1)}%), C=${totalBefore.C} (${(totalBefore.C/grandTotal*100).toFixed(1)}%), D=${totalBefore.D} (${(totalBefore.D/grandTotal*100).toFixed(1)}%)`);
console.log(`After:  A=${totalAfter.A} (${(totalAfter.A/grandTotal*100).toFixed(1)}%), B=${totalAfter.B} (${(totalAfter.B/grandTotal*100).toFixed(1)}%), C=${totalAfter.C} (${(totalAfter.C/grandTotal*100).toFixed(1)}%), D=${totalAfter.D} (${(totalAfter.D/grandTotal*100).toFixed(1)}%)`);

console.log('\nDone! Run "node scripts/fix-answer-distribution.js" again to verify the new distribution.');
