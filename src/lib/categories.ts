export interface Category {
  name: string;
  slug: string;
  emoji: string;
  description: string;
}

export const categories: Category[] = [
  {
    name: 'Artificial Intelligence',
    slug: 'artificial-intelligence',
    emoji: '🤖',
    description: 'In-depth engineering analysis on neural networks, LLMs, autonomous AI agents, and frontier machine learning research from TechPulse.' // 132 chars
  },
  {
    name: 'Cloud Computing',
    slug: 'cloud-computing',
    emoji: '☁️',
    description: 'Technical breakdowns of enterprise cloud infrastructure, Kubernetes orchestration, serverless platforms, and distributed systems.' // 130 chars
  },
  {
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    emoji: '🛡️',
    description: 'Actionable security reports on zero trust architecture, threat intelligence, vulnerability research, and modern defensive tooling.' // 131 chars
  },
  {
    name: 'Software Engineering',
    slug: 'software-engineering',
    emoji: '💻',
    description: 'Battle-tested software architecture, backend engineering practices, API design patterns, and high-throughput systems analysis.' // 126 chars
  },
  {
    name: 'Hardware & Semiconductors',
    slug: 'hardware-semiconductors',
    emoji: '⚡',
    description: 'Rigorous coverage of microprocessor architectures, AI accelerators, silicon fabrication nodes, and next-generation chip design.' // 128 chars
  },
  {
    name: 'Future Tech',
    slug: 'future-tech',
    emoji: '🚀',
    description: 'Frontier computing analysis covering quantum processors, neuromorphic silicon, brain-computer interfaces, and emerging robotics.' // 129 chars
  },
  {
    name: 'Web Development',
    slug: 'web-development',
    emoji: '🌐',
    description: 'Full-stack engineering guides on modern web standards, performance optimization, edge runtimes, and scalable frontend frameworks.' // 131 chars
  },
];
