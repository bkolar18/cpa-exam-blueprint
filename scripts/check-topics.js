/**
 * Check actual topics vs declared topics in question files
 */

const fs = require('fs');
const path = require('path');

const QUESTIONS_DIR = path.join(__dirname, '../src/lib/data/practice-questions');

const files = ['far.ts', 'aud.ts', 'reg.ts', 'tcp.ts', 'bar.ts', 'isc.ts'];

files.forEach(file => {
  const filePath = path.join(QUESTIONS_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract actual topics from questions
  const actualTopics = new Set();
  const topicRegex = /"topic":\s*"([^"]+)"/g;
  let match;
  while ((match = topicRegex.exec(content)) !== null) {
    actualTopics.add(match[1]);
  }

  // Extract declared topics from export
  const declaredTopics = new Set();
  const topicsArrayMatch = content.match(/topics:\s*\[([\s\S]*?)\]/);
  if (topicsArrayMatch) {
    const topicStrings = topicsArrayMatch[1].match(/"([^"]+)"/g);
    if (topicStrings) {
      topicStrings.forEach(t => declaredTopics.add(t.replace(/"/g, '')));
    }
  }

  console.log(`\n=== ${file} ===`);
  console.log(`Actual topics in questions: ${actualTopics.size}`);
  console.log(`Declared topics in export: ${declaredTopics.size}`);

  // Find topics in declared but not in questions (these won't find any matches!)
  const notInQuestions = [...declaredTopics].filter(t => !actualTopics.has(t));
  if (notInQuestions.length > 0) {
    console.log(`\nDECLARED but NOT in questions (will fail filter!):`);
    notInQuestions.forEach(t => console.log(`  - "${t}"`));
  }

  // Find topics in questions but not declared (these won't appear in dropdown)
  const notDeclared = [...actualTopics].filter(t => !declaredTopics.has(t));
  if (notDeclared.length > 0) {
    console.log(`\nIn QUESTIONS but NOT declared (won't appear in dropdown):`);
    notDeclared.forEach(t => console.log(`  - "${t}"`));
  }
});
