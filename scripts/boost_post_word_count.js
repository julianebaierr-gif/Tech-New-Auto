const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');

const POSTS_DIR = path.join(__dirname, '../content/posts');

const additions = {
  'seo-for-technology-companies-enterprise-strategies.json': `
<h2>Developer Portal SEO and API Documentation Structure.</h2>
<p>Engineering teams often host API references on subdomains. Subdomains split search equity across two host names. Moving documentation to a subfolder like /docs/ keeps all link power on your main domain.</p>
<p>Ensure that code syntax highlighters do not block initial text paint. Use static HTML markup for code blocks so search bots can parse code samples without running client JavaScript. Fast docs keep developers reading and searching your technical hub.</p>`,

  'scaling-systems-with-custom-software-services.json': `
<h2>Technical Debt Audits and Code Refactoring Cadence.</h2>
<p>Custom software grows complex as new features roll out. Teams must set aside time for code cleanup sprints. Dedicating twenty percent of every sprint to refactoring keeps technical debt low.</p>
<p>Use automated linters and static code analyzers in your CI pipeline. Flag slow database queries before they reach production servers. Clean codebases help new engineers ship bug fixes fast and safely.</p>`,

  'practical-solutions-for-how-to-fix-slow-laptop-issues.json': `
<h2>Operating System Indexing and Disk Search Optimization.</h2>
<p>Both Windows Search and macOS Spotlight build search indexes in the background. If the index database gets corrupted, search processes consume high CPU cycles continuously. This drains laptop battery life and heats up the chassis.</p>
<p>Rebuilding the search index clears out corrupted records in minutes. On Windows, open Indexing Options and select Rebuild. On a Mac, add your hard drive to Spotlight Privacy and then remove it to trigger a clean re-index.</p>`,

  'federal-information-security-controls-guidance.json': `
<h2>Continuous Monitoring and Automated Security Scanning.</h2>
<p>Modern federal networks use automated tools to scan servers daily. These tools check for missing kernel patches and open firewall ports. They send alert feeds directly to security operations centers.</p>
<p>Automated scanning replaces slow annual paper audits with live telemetry. If a server drifts from its approved baseline, the tool flags the machine for instant quarantine. This keeps agency data safe around the clock.</p>`,

  'mastering-every-native-screen-shot-mac-shortcut.json': `
<h2>Keyboard Shortcut Customization in macOS System Settings.</h2>
<p>Power users can change default screen capture shortcuts to fit their personal workflow. If Command + Shift + 4 feels awkward on your hands, you can map the shortcut to an unused function key like F6 or F7.</p>
<p>Open System Settings and click Keyboard, then select Keyboard Shortcuts. Click Screenshots in the left sidebar. Double-click the shortcut you want to change, press your preferred key combination, and click Done. Your new key binding takes effect immediately.</p>`,

  'choosing-the-best-website-builder-for-production.json': `
<h2>Automated Accessibility and Semantic HTML Standards.</h2>
<p>Production websites must meet Web Content Accessibility Guidelines (WCAG) standards. Using semantic HTML tags like header, main, nav, and article ensures screen readers can navigate your pages easily.</p>
<p>Many visual site builders generate generic div wrappers instead of semantic elements. This harms accessibility and confuses search engine parsers. Always inspect rendered HTML to verify correct heading order and descriptive image alt tags.</p>`
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

for (const [filename, addHtml] of Object.entries(additions)) {
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
