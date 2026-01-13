#!/usr/bin/env node

/**
 * Select 100 FAR Pilot Questions for Explanation Enhancement
 *
 * Selection criteria:
 * - 30 with shortest explanations (highest priority for enhancement)
 * - 30 calculation questions
 * - 40 diverse conceptual/scenario questions (across topics)
 */

const fs = require('fs');
const path = require('path');

const FAR_FILE = path.join(__dirname, '..', 'src', 'lib', 'data', 'practice-questions', 'far.ts');

function extractQuestions(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = [];

  // Extract the array content
  const arrayMatch = content.match(/const questions\s*=\s*\[([\s\S]*)\];?\s*(?:export|$)/);
  if (!arrayMatch) return questions;

  const mcqBlocks = arrayMatch[1].split(/(?=\{\s*"id":\s*")/);

  for (const block of mcqBlocks) {
    if (!block.trim() || !block.includes('"id"')) continue;

    let cleanBlock = block.trim();
    if (cleanBlock.endsWith(',')) cleanBlock = cleanBlock.slice(0, -1);
    const lastBrace = cleanBlock.lastIndexOf('}');
    if (lastBrace > 0) cleanBlock = cleanBlock.slice(0, lastBrace + 1);

    try {
      const q = JSON.parse(cleanBlock);
      if (q.id && q.question) {
        questions.push(q);
      }
    } catch (e) {
      // Skip parse errors
    }
  }

  return questions;
}

console.log('Loading FAR questions...');
const questions = extractQuestions(FAR_FILE);
console.log(`Found ${questions.length} FAR questions\n`);

// Sort by explanation length (shortest first)
const byExplanationLength = [...questions].sort((a, b) =>
  (a.explanation?.length || 0) - (b.explanation?.length || 0)
);

// Get 30 shortest explanations
const shortestExplanations = byExplanationLength.slice(0, 50); // Get top 50, filter to 30 unique topics

// Get calculation questions
const calculationQuestions = questions.filter(q =>
  q.questionFormat === 'calculation' || q.calculationRequired === true
);

// Get diverse conceptual/scenario questions
const conceptualQuestions = questions.filter(q =>
  q.questionFormat === 'conceptual' || q.questionFormat === 'scenario' || q.questionFormat === 'MCQ'
);

// Select pilot questions
const pilot = new Set();
const pilotDetails = [];

// 1. Add 30 shortest explanations
console.log('=== SHORTEST EXPLANATIONS (Top 30) ===');
let shortCount = 0;
for (const q of shortestExplanations) {
  if (shortCount >= 30) break;
  if (pilot.has(q.id)) continue;
  pilot.add(q.id);
  pilotDetails.push({
    id: q.id,
    category: 'short_explanation',
    topic: q.topic,
    difficulty: q.difficulty,
    format: q.questionFormat,
    explanationLength: q.explanation?.length || 0,
  });
  console.log(`  ${q.id} (${q.explanation?.length || 0} chars) - ${q.topic}`);
  shortCount++;
}

// 2. Add 30 calculation questions (not already selected)
console.log('\n=== CALCULATION QUESTIONS (30) ===');
let calcCount = 0;
for (const q of calculationQuestions) {
  if (calcCount >= 30) break;
  if (pilot.has(q.id)) continue;
  pilot.add(q.id);
  pilotDetails.push({
    id: q.id,
    category: 'calculation',
    topic: q.topic,
    difficulty: q.difficulty,
    format: q.questionFormat,
    explanationLength: q.explanation?.length || 0,
  });
  console.log(`  ${q.id} - ${q.topic} (${q.difficulty})`);
  calcCount++;
}

// 3. Add 40 diverse conceptual questions (spread across topics)
console.log('\n=== DIVERSE CONCEPTUAL (40) ===');
const topicCounts = {};
let diverseCount = 0;

// Group by topic first
const byTopic = {};
for (const q of conceptualQuestions) {
  if (pilot.has(q.id)) continue;
  const topic = q.topic || 'Unknown';
  if (!byTopic[topic]) byTopic[topic] = [];
  byTopic[topic].push(q);
}

// Take 1-2 from each topic until we have 40
const topics = Object.keys(byTopic);
let round = 0;
while (diverseCount < 40 && round < 10) {
  for (const topic of topics) {
    if (diverseCount >= 40) break;
    if (byTopic[topic].length > round) {
      const q = byTopic[topic][round];
      pilot.add(q.id);
      pilotDetails.push({
        id: q.id,
        category: 'diverse',
        topic: q.topic,
        difficulty: q.difficulty,
        format: q.questionFormat,
        explanationLength: q.explanation?.length || 0,
      });
      console.log(`  ${q.id} - ${q.topic} (${q.difficulty})`);
      diverseCount++;
    }
  }
  round++;
}

// Summary
console.log('\n=== PILOT SELECTION SUMMARY ===');
console.log(`Total pilot questions: ${pilot.size}`);
console.log(`  - Short explanations: ${shortCount}`);
console.log(`  - Calculations: ${calcCount}`);
console.log(`  - Diverse conceptual: ${diverseCount}`);

// Category breakdown
const categories = {};
for (const p of pilotDetails) {
  categories[p.category] = (categories[p.category] || 0) + 1;
}
console.log('\nBy category:', categories);

// Difficulty breakdown
const difficulties = {};
for (const p of pilotDetails) {
  difficulties[p.difficulty] = (difficulties[p.difficulty] || 0) + 1;
}
console.log('By difficulty:', difficulties);

// Topic breakdown
const topicBreakdown = {};
for (const p of pilotDetails) {
  topicBreakdown[p.topic] = (topicBreakdown[p.topic] || 0) + 1;
}
console.log('By topic:', topicBreakdown);

// Save pilot list to JSON
const outputFile = path.join(__dirname, '..', 'audit-results', 'pilot-questions.json');
fs.writeFileSync(outputFile, JSON.stringify({
  generatedAt: new Date().toISOString(),
  totalQuestions: pilot.size,
  summary: {
    shortExplanations: shortCount,
    calculations: calcCount,
    diverse: diverseCount,
  },
  questions: pilotDetails,
  questionIds: [...pilot],
}, null, 2));

console.log(`\nPilot list saved to: ${outputFile}`);

// Also output just the IDs for easy reference
console.log('\n=== PILOT QUESTION IDs ===');
console.log([...pilot].join('\n'));
