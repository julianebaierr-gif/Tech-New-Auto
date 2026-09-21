const fs = require('fs');
const path = require('path');

function countSyllables(word) {
  word = word.toLowerCase().replace(/[^a-z]/g, '');
  if (!word) return 0;
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]|ed|es|e)$/, '');
  word = word.replace(/^y/, '');
  const m = word.match(/[aeiouy]{1,2}/g);
  return m ? m.length : 1;
}

function flesch(text) {
  const clean = text.replace(/<[^>]+>/g, '. ').replace(/\s+/g, ' ').trim();
  const sentences = clean.split(/[.!?]+/).map(s => s.trim()).filter(Boolean);
  const words = clean.match(/\b[a-zA-Z]+\b/g) || [];
  if (words.length === 0 || sentences.length === 0) return 0;
  const totalSyllables = words.reduce((acc, w) => acc + countSyllables(w), 0);
  const asl = words.length / sentences.length;
  const asw = totalSyllables / words.length;
  return 206.835 - (1.015 * asl) - (84.6 * asw);
}

module.exports = { flesch, countSyllables };

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    for (const file of args) {
      if (fs.existsSync(file)) {
        const raw = fs.readFileSync(file, 'utf8');
        let text = raw;
        try {
          const json = JSON.parse(raw);
          if (json.content) text = json.content;
        } catch (e) {}
        console.log(`${file} Flesch score: ${flesch(text).toFixed(1)}`);
      } else {
        console.log(`File not found: ${file}`);
      }
    }
  } else {
    const sample = `
  Com Pors is an independent tech newsroom. We cover computer systems, hardware chips, cloud servers, and fast network protocols. Our team writes clear guides for software engineers and IT teams. Every guide uses real test data from our lab.

  We run all benchmarks on real hardware. We test CPU speeds, RAM limits, and network throughput. We do not accept money for reviews or product guides. Our reports stay fair and honest.

  Senior system architects review all articles before publication. We check code samples against real compilers. We update our guides when new Linux kernels or tools release.

  Our newsroom servers run on fast edge nodes worldwide. Readers can use our data and charts in academic papers with standard credit. We monitor open vulnerability notices to keep our reports accurate.

  Key Publishing Standards:
  - Real Test Data: All tests run on dedicated bare-metal servers.
  - Peer Review: Engineers test every code sample before publication.
  - Zero Sponsored Reviews: We keep complete editorial independence.
  - Fast Updates: We publish corrections within 24 hours.
  `;
    console.log('Sample Flesch score:', flesch(sample).toFixed(1));

    const targetPosts = [
      'architecting-a-secure-remote-desktop-connection.json',
      'architecting-ai-resume-builder-free.json',
      'architecting-business-technology-solutions.json',
      'architecting-scalable-systems-chat-with-ai.json',
      'architecting-silicon-era-technology-1980s.json',
      'architecting-systems-ai-writing-tools-updates.json'
    ];
    console.log('\n--- Target Posts Readability Scores ---');
    for (const f of targetPosts) {
      const p = path.join(__dirname, '../content/posts', f);
      if (fs.existsSync(p)) {
        const json = JSON.parse(fs.readFileSync(p, 'utf8'));
        const score = flesch(json.content || '');
        console.log(`${f.padEnd(55)}: ${score.toFixed(1)} ${score >= 60.0 ? '(PASS)' : '(FAIL)'}`);
      }
    }
  }
}
