const fs = require('fs');
const path = require('path');

function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getHtmlFiles(filePath));
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

function getText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, ' ')
    .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const dir = path.join('.next', 'server', 'app');
const files = getHtmlFiles(dir);
console.log(`Found ${files.length} HTML files.`);

const data = files.map(file => {
  const html = fs.readFileSync(file, 'utf8');
  const text = getText(html);
  const ratio = html.length > 0 ? text.length / html.length : 0;
  const rel = path.relative(dir, file).replace(/\\/g, '/');
  return { rel, htmlLen: html.length, textLen: text.length, ratio };
});

data.sort((a, b) => a.ratio - b.ratio);

console.log('--- FAILING PAGES (<10%) ---');
data.filter(d => d.ratio < 0.10).forEach(d => {
  console.log(`[FAIL] ${d.rel.padEnd(62)} | HTML: ${d.htmlLen.toString().padStart(6)} | Text: ${d.textLen.toString().padStart(6)} | ${(d.ratio * 100).toFixed(2)}%`);
});

const passCount = data.filter(d => d.ratio >= 0.10).length;
const failCount = data.filter(d => d.ratio < 0.10).length;
console.log(`\nTotal Pass (>=10%): ${passCount} / ${data.length}`);
console.log(`Total Fail (<10%):  ${failCount} / ${data.length}`);
