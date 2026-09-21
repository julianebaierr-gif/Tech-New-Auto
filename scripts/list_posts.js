const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');
const dir = path.join(__dirname, '../content/posts');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
files.forEach((f, i) => {
  const data = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  const score = flesch(data.content.replace(/<[^>]+>/g, ' '));
  console.log(`${(i+1).toString().padStart(2)}. ${f.padEnd(55)} | Kw: ${(data.target_keyword || '').padEnd(25)} | Score: ${score.toFixed(1)}`);
});
