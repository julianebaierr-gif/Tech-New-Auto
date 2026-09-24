const fs = require('fs');
const path = require('path');
const { flesch } = require('./test_readability');

const POSTS_DIR = path.join(__dirname, '../content/posts');

// 38 Humanized Titles (51-59 chars, 0 AI buzzwords, target keyword intact)
const titlesMap = {
  'architecting-a-secure-remote-desktop-connection.json': 'How to Secure a Remote Desktop Connection: Complete Setup',
  'architecting-ai-resume-builder-free.json': 'Free AI Resume Builder: Real System Architecture & Cost',
  'architecting-business-technology-solutions.json': 'Business Technology Solutions: Cloud IT Setup & Strategy',
  'architecting-scalable-seo-ranking-software-systems.json': 'Building Fast SEO Ranking Software: Pipeline Architecture',
  'architecting-scalable-systems-chat-with-ai.json': 'Chat With AI Systems: How to Build Scalable LLM Apps',
  'architecting-silicon-era-technology-1980s.json': 'Technology of the 1980s: How Microchips Changed Computing',
  'architecting-systems-ai-writing-tools-updates.json': 'AI Writing Tools Updates 2026: Latency & Output Benchmarks',
  'architectural-realities-when-you-check-wifi-speed.json': 'Why You Check WiFi Speed and Still Get High Network Lag',
  'chip-industry-updates-today-manufacturing-realities.json': 'Chip Industry Updates Today: Fab Node Limits & Yield Rates',
  'choosing-the-best-website-builder-for-production.json': 'Best Website Builder for Web Teams: Code vs Visual Tools',
  'demystifying-what-is-a-neural-network.json': 'What Is a Neural Network? Weights, Layers & Code Guide',
  'engineering-managed-technology-services-infrastructure.json': 'Managed Technology Services: SLA Design & Vendor Selection',
  'engineering-realities-behind-ai-detector-turnitin.json': 'Inside AI Detector Turnitin: Perplexity Scores & Failures',
  'engineering-resilient-enterprise-cyber-security-solutions.json': 'Enterprise Cyber Security Solutions: Zero-Trust Defense',
  'evaluating-best-ai-apps-for-modern-software-work.json': 'Top 10 Best AI Apps for Developers Tested in Production',
  'evaluating-modern-ai-generator-free-tools-in-systems.json': 'AI Generator Free Platforms: Limits, Rate Caps & Quality',
  'evaluating-modern-character-ai-alternatives.json': 'Best Character AI Alternatives: Latency & Cost Comparison',
  'evaluating-the-true-practical-chatgpt-plus-cost.json': 'ChatGPT Plus Cost Breakdown: Is the $20 Fee Worth Paying?',
  'federal-information-security-controls-guidance.json': 'What Guidance Identifies Federal Information Security Controls?',
  'grammarly-ai-detector-architectural-analysis.json': 'Grammarly AI Detector Accuracy: How Text Scoring Works',
  'granular-recovery-technology-in-enterprise-systems.json': 'Granular Recovery Technology: Fast Single-Object Restores',
  'instructional-technology-services-modern-enterprise-it.json': 'Instructional Technology Services: LMS Architecture Guide',
  'mastering-every-native-screen-shot-mac-shortcut.json': 'Every Native Screen Shot Mac Shortcut: Complete Reference',
  'modem-vs-router-architecture-networking.json': 'Modem vs Router: Hardware Differences & Network Topology',
  'modern-technology-information-management-systems.json': 'Technology Information Management: Enterprise Data Design',
  'optimizing-modern-data-center-solutions-for-scale.json': 'Data Center Solutions: Power Efficiency, PUE & Rack Scale',
  'practical-solutions-for-how-to-fix-slow-laptop-issues.json': 'How to Fix Slow Laptop Lag: Disk, Thermal & RAM Diagnostics',
  'quantum-computing-applications-in-modern-enterprise-it.json': 'Quantum Computing Applications: Real IT Use Cases in 2026',
  'scaling-remote-infrastructure-with-google-remote-desktop.json': 'Google Remote Desktop Setup: Performance & Port Security',
  'scaling-systems-with-a-technology-solutions-professional.json': 'Hiring a Technology Solutions Professional: Role & Metrics',
  'scaling-systems-with-custom-software-services.json': 'Custom Software Development Services vs SaaS: Full Guide',
  'scaling-systems-with-people-process-technology.json': 'People Process Technology Framework: Practical IT Guide',
  'seo-for-technology-companies-enterprise-strategies.json': 'SEO for Technology Companies: Technical Growth Playbook',
  'sora-app-invite-codes-architecture-and-access-reality.json': 'Sora App Invite Codes: Access Truth & Scam Architecture',
  'the-role-of-an-information-technology-specialist.json': 'Information Technology Specialist: Daily Roles & Tech Stack',
  'understanding-what-is-an-algorithm-in-software-design.json': 'What Is an Algorithm in Software? Logic, Time & Big-O Guide',
  'understanding-what-is-ram-and-system-performance.json': 'What Is RAM in Computing? Clock Speeds, DDR5 & Latency',
  'what-is-malware-architecture-threats-defense.json': 'What Is Malware? Types, Kernel Roots & Enterprise Defense'
};

// Target Contextual Links for each post (2-3 links connecting clusters)
const targetLinks = {
  'architecting-a-secure-remote-desktop-connection.json': [
    { target: '/scaling-remote-infrastructure-with-google-remote-desktop/', anchor: 'Google Remote Desktop tools' },
    { target: '/modem-vs-router-architecture-networking/', anchor: 'modem vs router hardware' }
  ],
  'architecting-ai-resume-builder-free.json': [
    { target: '/evaluating-modern-ai-generator-free-tools-in-systems/', anchor: 'AI generator free platforms' },
    { target: '/architecting-systems-ai-writing-tools-updates/', anchor: 'AI writing tools updates' }
  ],
  'architecting-business-technology-solutions.json': [
    { target: '/optimizing-modern-data-center-solutions-for-scale/', anchor: 'data center solutions' },
    { target: '/scaling-systems-with-a-technology-solutions-professional/', anchor: 'technology solutions professional' }
  ],
  'architecting-scalable-seo-ranking-software-systems.json': [
    { target: '/seo-for-technology-companies-enterprise-strategies/', anchor: 'SEO for technology companies' },
    { target: '/choosing-the-best-website-builder-for-production/', anchor: 'production website builder' }
  ],
  'architecting-scalable-systems-chat-with-ai.json': [
    { target: '/evaluating-best-ai-apps-for-modern-software-work/', anchor: 'best AI apps' },
    { target: '/evaluating-the-true-practical-chatgpt-plus-cost/', anchor: 'ChatGPT Plus cost' }
  ],
  'architecting-silicon-era-technology-1980s.json': [
    { target: '/chip-industry-updates-today-manufacturing-realities/', anchor: 'chip industry updates today' },
    { target: '/understanding-what-is-ram-and-system-performance/', anchor: 'what is RAM' }
  ],
  'architecting-systems-ai-writing-tools-updates.json': [
    { target: '/engineering-realities-behind-ai-detector-turnitin/', anchor: 'AI detector Turnitin' },
    { target: '/grammarly-ai-detector-architectural-analysis/', anchor: 'Grammarly AI detector' }
  ],
  'architectural-realities-when-you-check-wifi-speed.json': [
    { target: '/modem-vs-router-architecture-networking/', anchor: 'modem vs router' },
    { target: '/practical-solutions-for-how-to-fix-slow-laptop-issues/', anchor: 'how to fix slow laptop issues' }
  ],
  'chip-industry-updates-today-manufacturing-realities.json': [
    { target: '/understanding-what-is-ram-and-system-performance/', anchor: 'what is RAM' },
    { target: '/architecting-silicon-era-technology-1980s/', anchor: 'technology of the 1980s' }
  ],
  'choosing-the-best-website-builder-for-production.json': [
    { target: '/seo-for-technology-companies-enterprise-strategies/', anchor: 'SEO for technology companies' },
    { target: '/architecting-scalable-seo-ranking-software-systems/', anchor: 'SEO ranking software' }
  ],
  'demystifying-what-is-a-neural-network.json': [
    { target: '/understanding-what-is-an-algorithm-in-software-design/', anchor: 'what is an algorithm' },
    { target: '/architecting-scalable-systems-chat-with-ai/', anchor: 'chat with AI systems' }
  ],
  'engineering-managed-technology-services-infrastructure.json': [
    { target: '/the-role-of-an-information-technology-specialist/', anchor: 'information technology specialist' },
    { target: '/modern-technology-information-management-systems/', anchor: 'technology information management' }
  ],
  'engineering-realities-behind-ai-detector-turnitin.json': [
    { target: '/grammarly-ai-detector-architectural-analysis/', anchor: 'Grammarly AI detector' },
    { target: '/architecting-systems-ai-writing-tools-updates/', anchor: 'AI writing tools updates' }
  ],
  'engineering-resilient-enterprise-cyber-security-solutions.json': [
    { target: '/what-is-malware-architecture-threats-defense/', anchor: 'what is malware' },
    { target: '/federal-information-security-controls-guidance/', anchor: 'federal information security controls' }
  ],
  'evaluating-best-ai-apps-for-modern-software-work.json': [
    { target: '/architecting-systems-ai-writing-tools-updates/', anchor: 'AI writing tools' },
    { target: '/evaluating-the-true-practical-chatgpt-plus-cost/', anchor: 'ChatGPT Plus cost' }
  ],
  'evaluating-modern-ai-generator-free-tools-in-systems.json': [
    { target: '/architecting-ai-resume-builder-free/', anchor: 'AI resume builder free' },
    { target: '/evaluating-modern-character-ai-alternatives/', anchor: 'Character AI alternatives' }
  ],
  'evaluating-modern-character-ai-alternatives.json': [
    { target: '/architecting-scalable-systems-chat-with-ai/', anchor: 'chat with AI' },
    { target: '/evaluating-modern-ai-generator-free-tools-in-systems/', anchor: 'AI generator free tools' }
  ],
  'evaluating-the-true-practical-chatgpt-plus-cost.json': [
    { target: '/evaluating-best-ai-apps-for-modern-software-work/', anchor: 'best AI apps' },
    { target: '/evaluating-modern-ai-generator-free-tools-in-systems/', anchor: 'free AI generator platforms' }
  ],
  'federal-information-security-controls-guidance.json': [
    { target: '/engineering-resilient-enterprise-cyber-security-solutions/', anchor: 'cyber security solutions' },
    { target: '/what-is-malware-architecture-threats-defense/', anchor: 'malware defense' }
  ],
  'grammarly-ai-detector-architectural-analysis.json': [
    { target: '/engineering-realities-behind-ai-detector-turnitin/', anchor: 'AI detector Turnitin' },
    { target: '/architecting-systems-ai-writing-tools-updates/', anchor: 'AI writing tools updates' }
  ],
  'granular-recovery-technology-in-enterprise-systems.json': [
    { target: '/optimizing-modern-data-center-solutions-for-scale/', anchor: 'data center solutions' },
    { target: '/engineering-resilient-enterprise-cyber-security-solutions/', anchor: 'cyber security solutions' }
  ],
  'instructional-technology-services-modern-enterprise-it.json': [
    { target: '/modern-technology-information-management-systems/', anchor: 'technology information management' },
    { target: '/scaling-systems-with-people-process-technology/', anchor: 'people process technology' }
  ],
  'mastering-every-native-screen-shot-mac-shortcut.json': [
    { target: '/practical-solutions-for-how-to-fix-slow-laptop-issues/', anchor: 'how to fix slow laptop issues' },
    { target: '/the-role-of-an-information-technology-specialist/', anchor: 'information technology specialist' }
  ],
  'modem-vs-router-architecture-networking.json': [
    { target: '/architectural-realities-when-you-check-wifi-speed/', anchor: 'check WiFi speed' },
    { target: '/architecting-a-secure-remote-desktop-connection/', anchor: 'remote desktop connection' }
  ],
  'modern-technology-information-management-systems.json': [
    { target: '/engineering-managed-technology-services-infrastructure/', anchor: 'managed technology services' },
    { target: '/scaling-systems-with-custom-software-services/', anchor: 'software development services' }
  ],
  'optimizing-modern-data-center-solutions-for-scale.json': [
    { target: '/architecting-business-technology-solutions/', anchor: 'business technology solutions' },
    { target: '/granular-recovery-technology-in-enterprise-systems/', anchor: 'granular recovery technology' }
  ],
  'practical-solutions-for-how-to-fix-slow-laptop-issues.json': [
    { target: '/understanding-what-is-ram-and-system-performance/', anchor: 'what is RAM' },
    { target: '/architectural-realities-when-you-check-wifi-speed/', anchor: 'check WiFi speed' }
  ],
  'quantum-computing-applications-in-modern-enterprise-it.json': [
    { target: '/chip-industry-updates-today-manufacturing-realities/', anchor: 'chip industry updates today' },
    { target: '/engineering-resilient-enterprise-cyber-security-solutions/', anchor: 'cyber security solutions' }
  ],
  'scaling-remote-infrastructure-with-google-remote-desktop.json': [
    { target: '/architecting-a-secure-remote-desktop-connection/', anchor: 'remote desktop connection' },
    { target: '/architectural-realities-when-you-check-wifi-speed/', anchor: 'check WiFi speed' }
  ],
  'scaling-systems-with-a-technology-solutions-professional.json': [
    { target: '/the-role-of-an-information-technology-specialist/', anchor: 'information technology specialist' },
    { target: '/scaling-systems-with-people-process-technology/', anchor: 'people process technology' }
  ],
  'scaling-systems-with-custom-software-services.json': [
    { target: '/understanding-what-is-an-algorithm-in-software-design/', anchor: 'what is an algorithm' },
    { target: '/modern-technology-information-management-systems/', anchor: 'technology information management' }
  ],
  'scaling-systems-with-people-process-technology.json': [
    { target: '/scaling-systems-with-a-technology-solutions-professional/', anchor: 'technology solutions professional' },
    { target: '/instructional-technology-services-modern-enterprise-it/', anchor: 'instructional technology services' }
  ],
  'seo-for-technology-companies-enterprise-strategies.json': [
    { target: '/architecting-scalable-seo-ranking-software-systems/', anchor: 'SEO ranking software' },
    { target: '/choosing-the-best-website-builder-for-production/', anchor: 'production website builder' }
  ],
  'sora-app-invite-codes-architecture-and-access-reality.json': [
    { target: '/evaluating-best-ai-apps-for-modern-software-work/', anchor: 'best AI apps' },
    { target: '/what-is-malware-architecture-threats-defense/', anchor: 'what is malware' }
  ],
  'the-role-of-an-information-technology-specialist.json': [
    { target: '/scaling-systems-with-a-technology-solutions-professional/', anchor: 'technology solutions professional' },
    { target: '/engineering-managed-technology-services-infrastructure/', anchor: 'managed technology services' }
  ],
  'understanding-what-is-an-algorithm-in-software-design.json': [
    { target: '/demystifying-what-is-a-neural-network/', anchor: 'what is a neural network' },
    { target: '/scaling-systems-with-custom-software-services/', anchor: 'software development services' }
  ],
  'understanding-what-is-ram-and-system-performance.json': [
    { target: '/practical-solutions-for-how-to-fix-slow-laptop-issues/', anchor: 'how to fix slow laptop issues' },
    { target: '/chip-industry-updates-today-manufacturing-realities/', anchor: 'chip industry updates today' }
  ],
  'what-is-malware-architecture-threats-defense.json': [
    { target: '/engineering-resilient-enterprise-cyber-security-solutions/', anchor: 'cyber security solutions' },
    { target: '/federal-information-security-controls-guidance/', anchor: 'federal information security controls' }
  ]
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

let allFiles = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.json')).sort();
console.log(`Starting Audit & Mesh Injection for ${allFiles.length} posts...`);

let updatedCount = 0;

for (const filename of allFiles) {
  const filePath = path.join(POSTS_DIR, filename);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  // 1. Update Title if mapped
  const expectedTitle = titlesMap[filename];
  if (expectedTitle && data.title !== expectedTitle) {
    console.log(`[TITLE UPDATE] ${filename}: "${data.title}" -> "${expectedTitle}" (${expectedTitle.length} chars)`);
    data.title = expectedTitle;
  }

  // 2. Check and inject Target Contextual Links if missing
  const targets = targetLinks[filename] || [];
  let content = data.content || '';
  let modified = false;

  for (const linkObj of targets) {
    if (!content.includes(`href="${linkObj.target}"`)) {
      // Find where to inject or append as a natural reference callout/sentence
      // Append a natural short sentence right before the last closing </p> of the first section or in the first paragraph
      const linkHtml = `<a href="${linkObj.target}" class="text-blue-600 font-semibold hover:underline">${linkObj.anchor}</a>`;
      const addition = ` Readers can also consult our engineering guide on ${linkHtml}.`;
      
      // Inject into the first <p>...</p> after the target keyword mention or at the end of the first paragraph
      if (content.includes('</p>')) {
        content = content.replace('</p>', addition + '</p>');
        modified = true;
      }
    }
  }

  if (modified) {
    data.content = content;
  }

  // 3. Verify Readability & Buzzwords
  const score = flesch(data.content);
  const buzz = checkBuzzwords(data.content);

  if (score < 60.0) {
    console.warn(`[READABILITY WARNING] ${filename}: Flesch score = ${score.toFixed(1)}`);
  }
  if (buzz.length > 0) {
    console.warn(`[BUZZWORD WARNING] ${filename}: Found ${buzz.join(', ')}`);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  updatedCount++;
}

console.log(`\nCompleted! Successfully processed and saved ${updatedCount} posts.`);
