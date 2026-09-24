const fs = require('fs');
const path = require('path');

const POSTS_DIR = path.join(__dirname, '../content/posts');
const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json'));

const validSlugs = new Set(files.map(f => '/' + f.replace('.json', '') + '/'));
validSlugs.add('/editorial-policy/');
validSlugs.add('/about/');
validSlugs.add('/contact/');
validSlugs.add('/privacy-policy/');
validSlugs.add('/terms/');
validSlugs.add('/blog/');

let brokenLinks = 0;
let totalInternalLinks = 0;
const perPostLinks = {};

files.forEach(f => {
  const d = JSON.parse(fs.readFileSync(path.join(POSTS_DIR, f), 'utf8'));
  const matches = (d.content || '').match(/href="(\/[^"]+\/)"/g) || [];
  perPostLinks[f] = matches.length;
  matches.forEach(l => {
    const href = l.replace('href="', '').replace('"', '');
    totalInternalLinks++;
    if (!validSlugs.has(href)) {
      console.error(`Broken link in ${f} -> ${href}`);
      brokenLinks++;
    }
  });
});

console.log('--- Internal Links Verification ---');
console.log(`Total Posts: ${files.length}`);
console.log(`Total In-Content Internal Links: ${totalInternalLinks}`);
console.log(`Broken Links: ${brokenLinks}`);

let minLinks = 999;
let maxLinks = 0;
Object.entries(perPostLinks).forEach(([f, count]) => {
  if (count < minLinks) minLinks = count;
  if (count > maxLinks) maxLinks = count;
});

console.log(`Min links per post: ${minLinks}`);
console.log(`Max links per post: ${maxLinks}`);
