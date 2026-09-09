export interface Category {
  name: string;
  slug: string;
  emoji: string;
}

export const categories: Category[] = [
  { name: 'News', slug: 'news', emoji: '🏛️' },
  { name: 'Business', slug: 'business', emoji: '💼' },
  { name: 'Artificial Intelligence', slug: 'artificial-intelligence', emoji: '🤖' },
  { name: 'Software', slug: 'software', emoji: '💻' },
  { name: 'Hardware', slug: 'hardware', emoji: '⚡' },
  { name: 'Cybersecurity', slug: 'cybersecurity', emoji: '🛡️' },
  { name: 'Cloud', slug: 'cloud', emoji: '☁️' },
  { name: 'Games', slug: 'games', emoji: '🎮' },
  { name: 'Future Tech', slug: 'future-tech', emoji: '🚀' },
];
