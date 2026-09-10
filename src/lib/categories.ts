export interface Category {
  name: string;
  slug: string;
  emoji: string;
}

export const categories: Category[] = [
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence', emoji: '🤖' },
  { name: 'Cloud Computing', slug: 'cloud-computing', emoji: '☁️' },
  { name: 'Cybersecurity', slug: 'cybersecurity', emoji: '🛡️' },
  { name: 'Software Engineering', slug: 'software-engineering', emoji: '💻' },
  { name: 'Hardware & Semiconductors', slug: 'hardware-semiconductors', emoji: '⚡' },
  { name: 'Future Tech', slug: 'future-tech', emoji: '🚀' },
  { name: 'Web Development', slug: 'web-development', emoji: '🌐' },
];
