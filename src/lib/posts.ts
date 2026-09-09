import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
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
      if (fileName.endsWith('.json')) {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const data = JSON.parse(fileContents);
        return {
          slug: fileName.replace(/\.json$/, ''),
          ...data,
        } as Post;
      } else {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        return {
          slug: fileName.replace(/\.md$/, ''),
          title: data.title || 'Untitled',
          excerpt: data.excerpt || '',
          coverImage: data.coverImage || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
          date: data.date || new Date().toISOString().split('T')[0],
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

  return allPosts.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export function getPostsByCategory(categorySlug: string): Post[] {
  const posts = getAllPosts();
  return posts.filter((p) => {
    const slugified = p.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return slugified === categorySlug || p.category.toLowerCase() === categorySlug.toLowerCase();
  });
}
