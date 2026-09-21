const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');

const postsDir = path.join(__dirname, '../content/posts');
const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} posts.`);

let lowCount = 0;
let passCount = 0;

for (const file of files) {
  const filePath = path.join(postsDir, file);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const content = data.content || '';
  // strip HTML tags to get pure text
  const text = content.replace(/<[^>]+>/g, ' ');
  const score = flesch(text);
  const isPass = score >= 50; // SEMrush flag threshold is usually < 50 or < 60
  if (isPass) {
    passCount++;
  } else {
    lowCount++;
    console.log(`[LOW READABILITY] ${file.padEnd(50)} | Score: ${score.toFixed(1)}`);
  }
}

console.log(`\nSummary:`);
console.log(`Passed (>= 50): ${passCount}`);
console.log(`Low (< 50):     ${lowCount}`);
