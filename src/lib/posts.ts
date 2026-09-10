import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface PostFAQ {
  question: string;
  answer: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  date: string;
  createdAt?: number;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  readTime: string;
  tags: string[];
  content: string;
  faqs?: PostFAQ[];
}

export function getPostImageAlt(post: Post): string {
  if (post.coverImageAlt && post.coverImageAlt.trim()) {
    return post.coverImageAlt.trim();
  }
  const primaryTag = post.tags && post.tags.length > 0 ? post.tags[0] : post.category;
  return `${post.title} - ${primaryTag} Analysis`;
}

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((file) => file.endsWith('.md') || file.endsWith('.json'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const stat = fs.statSync(fullPath);
      const fileCreatedAt = stat.birthtimeMs || stat.ctimeMs || stat.mtimeMs;

      if (fileName.endsWith('.json')) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(fileContents);
        const timestamp = data.createdAt || fileCreatedAt;
        return {
          slug: fileName.replace(/\.json$/, ''),
          createdAt: timestamp,
          ...data,
        } as Post;
      } else {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        const timestamp = data.createdAt || fileCreatedAt;
        return {
          slug: fileName.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          date: data.date || new Date().toISOString().split('T')[0],
          createdAt: timestamp,
          category: data.category || 'Tech & AI',
          author: data.author || {
            name: 'TechPulse AI',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
            role: 'Automated Tech Analyst',
          },
          readTime: data.readTime || '4 min read',
          tags: data.tags || ['Technology', 'AI', 'Innovation'],
          content: content,
        } as Post;
      }
    });

  // Sort descending: Latest published post first, oldest published post last
  return allPosts.sort((a, b) => {
    const timeA = a.createdAt || new Date(a.date).getTime();
    const timeB = b.createdAt || new Date(b.date).getTime();
    return timeB - timeA;
  });
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export interface Author {
  slug: string;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  twitter?: string;
  github?: string;
}

export const AUTHORS: Author[] = [
  {
    slug: 'cora-lee',
    name: 'Cora Lee',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=400&q=80',
    role: 'Lead Systems Architect & Contributing Tech Editor',
    bio: 'Former kernel engineer and distributed systems researcher writing on microarchitectures, cloud infrastructure, and intelligent automation.',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
  {
    slug: 'kellie-anne',
    name: 'Kellie Anne',
    avatar: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=400&q=80',
    role: 'Principal AI & Silicon Research Analyst',
    bio: 'Hardware benchmark specialist and AI infrastructure journalist tracking frontier models, neuromorphic semiconductors, and quantum engineering.',
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
];

export function getAuthors(): Author[] {
  return AUTHORS;
}

export function getAuthorBySlug(slug: string): Author | null {
  return AUTHORS.find((a) => a.slug === slug || a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug) || null;
}

export function getPostsByAuthor(authorNameOrSlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) => {
    const slugified = p.author.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return slugified === authorNameOrSlug || p.author.name.toLowerCase() === authorNameOrSlug.toLowerCase();
  });
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) => {
    const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return pSlug === categorySlug || p.category.toLowerCase().includes(categorySlug.replace(/-/g, ' '));
  });
}

export function getRelatedPosts(currentSlug: string, limit: number = 4): Post[] {
  const allPosts = getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === currentSlug);
  if (!currentPost) return [];

  const currentTags = new Set((currentPost.tags || []).map((t) => t.toLowerCase()));
  const currentCategory = (currentPost.category || '').toLowerCase();
  const currentWords = new Set(
    (currentPost.title || '')
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length >= 4)
  );

  const scored = allPosts
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      let score = 0;
      const pCat = (p.category || '').toLowerCase();
      if (pCat && pCat === currentCategory) {
        score += 5;
      }
      const pTags = (p.tags || []).map((t) => t.toLowerCase());
      pTags.forEach((t) => {
        if (currentTags.has(t)) score += 4;
      });
      const pWords = (p.title || '')
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .split(/\s+/)
        .filter((w) => w.length >= 4);
      pWords.forEach((w) => {
        if (currentWords.has(w)) score += 2;
      });

      return { post: p, score };
    });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

