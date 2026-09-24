const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');

const POSTS_DIR = path.join(__dirname, '../content/posts');

const additions2 = {
  'seo-for-technology-companies-enterprise-strategies.json': `
<h2>Clean Page Tags and Site Links.</h2>
<p>Tech sites often serve users across many countries. Setting clean canonical tags stops duplicate page penalties. Use simple hreflang tags in your site head. This tells search bots which language version to show to readers. Clear language tags boost your organic reach worldwide.</p>`,

  'federal-information-security-controls-guidance.json': `
<h2>Quick Response Plans and Threat Drills.</h2>
<p>Federal guides require quick response plans for network breaches. Teams run test drills every quarter. When teams spot bad access, automated tools isolate servers fast. Analysts save memory logs to find the point of entry. Fast action stops small leaks from hurting entire agency networks.</p>`,

  'practical-solutions-for-how-to-fix-slow-laptop-issues.json': `
<h2>Browser Extension Audits and Memory Leaks.</h2>
<p>Web browsers often become the biggest resource hogs on modern laptops. Users accumulate dozens of extensions over time, many of which run background scripts on every open webpage.</p>
<p>Open your browser task manager by pressing Shift and Escape. Inspect memory and CPU consumption for each active extension. Disable coupon finders, redundant ad blockers, and unverified utilities. Keeping your browser lean frees up several gigabytes of system memory instantly.</p>`,

  'mastering-every-native-screen-shot-mac-shortcut.json': `
<h2>Organizing Screenshots with Finder Smart Folders.</h2>
<p>Taking hundreds of screenshots quickly clutters up local directories. Power users can use macOS Finder Smart Folders to automatically group and organize capture files.</p>
<p>Open Finder and select File, then New Smart Folder. Click the plus button to add a search rule, set the kind to Image, and add a rule for the filename prefix Screen Shot. Save this Smart Folder to your Finder sidebar for instant access to every screenshot taken across your Mac.</p>`
};

const forbiddenWords = [
  'delve', 'testament', 'tapestry', 'beacon', 'game-changer', 'harness',
  'crucial', 'vital', 'pivotal', 'seamless', 'seamlessly', 'fast-paced',
  'elevate', 'leverage', 'unleash', 'adopting', 'foster', 'moreover',
  'furthermore', 'holistic'
];

function checkBuzzwords(text) {
  const textWithoutCWV = text.replace(/Core Web Vitals/gi, '');
  const lower = textWithoutCWV.toLowerCase();
  const found = [];
  for (const w of forbiddenWords) {
    const regex = new RegExp(`\\b${w}\\b`, 'i');
    if (regex.test(lower)) {
      found.push(w);
    }
  }
  return found;
}

for (const [filename, addHtml] of Object.entries(additions2)) {
  const filePath = path.join(POSTS_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.content += addHtml;

  const score = flesch(data.content);
  const buzz = checkBuzzwords(data.content);

  console.log(`\n${filename}`);
  console.log(`New Flesch Score: ${score.toFixed(1)} ${score >= 60 ? '(PASS)' : '(FAIL)'}`);
  console.log(`Buzzwords: ${buzz.length === 0 ? 'None (PASS)' : buzz.join(', ')}`);

  if (score >= 60 && buzz.length === 0) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${filename} successfully!`);
  } else {
    console.error(`FAILED criteria for ${filename}`);
  }
}
