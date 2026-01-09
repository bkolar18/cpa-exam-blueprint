/**
 * Fix topics arrays to match actual topics in questions
 *
 * Run with: node scripts/fix-topics.js
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/lib/data/practice-questions');

const files = ['far.ts', 'aud.ts', 'reg.ts', 'tcp.ts', 'bar.ts', 'isc.ts'];

files.forEach(file => {
  const filePath = path.join(QUESTIONS_DIR, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Extract actual topics from questions
  const actualTopics = new Set();
  const topicRegex = /"topic":\s*"([^"]+)"/g;
  let match;
  while ((match = topicRegex.exec(content)) !== null) {
    actualTopics.add(match[1]);
  }

  // Sort topics alphabetically
  const sortedTopics = [...actualTopics].sort();

  // Build new topics array string
  const newTopicsArray = sortedTopics.map(t => `      "${t}"`).join(',\n');

  // Replace the topics array in the file
  const topicsArrayRegex = /topics:\s*\[([\s\S]*?)\]/;
  const newTopicsSection = `topics: [\n${newTopicsArray}\n    ]`;

  content = content.replace(topicsArrayRegex, newTopicsSection);

  // Write the updated content
  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`${file}: Updated topics array with ${sortedTopics.length} actual topics`);
});

console.log('\nDone! Topics arrays now match actual question topics.');
