const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');

const POSTS_DIR = path.join(__dirname, '../content/posts');

const finalAdditions = {
  'seo-for-technology-companies-enterprise-strategies.json': `
<h2>Schema Tag Testing and Rich Results.</h2>
<p>Search engines use structured data to show rich cards in search results. Add TechArticle and FAQPage schema tags to your code templates. Test your pages with Google Rich Results test tools. Clean schema markup helps search bots understand your code examples and author credentials quickly.</p>`,

  'scaling-systems-with-custom-software-services.json': `
<h2>Load Testing and Peak Traffic Simulations.</h2>
<p>Custom web tools must handle sudden spikes in user traffic without slowing down. Run load tests with open source tools like k6 before major feature rollouts. Watch CPU spikes, memory leaks, and slow database calls. Tuning server pools before launch protects your brand from costly downtime.</p>`,

  'federal-information-security-controls-guidance.json': `
<h2>Role Based Access and Password Rules.</h2>
<p>Federal rules require strict role limits for every staff member. Users only get access to data they need for daily work. Ban shared admin accounts across all servers. Require hardware security keys for admin logins. Strong access rules stop unauthorized staff from viewing classified files.</p>`
};

for (const [filename, addHtml] of Object.entries(finalAdditions)) {
  const filePath = path.join(POSTS_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.content += addHtml;

  const score = flesch(data.content);
  console.log(`${filename}: New Flesch = ${score.toFixed(1)}`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}
