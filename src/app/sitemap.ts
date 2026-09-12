import { MetadataRoute } from 'next';
import { getAllPosts, getAuthors } from '@/lib/posts';
import { categories } from '@/lib/categories';

export const dynamic = 'force-static';
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compors.com';
  const posts = getAllPosts();
  const authors = getAuthors();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl + '/', lastModified: new Date(), changeFrequency: 'always', priority: 1.0 },
    { url: baseUrl + '/blog/', lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: baseUrl + '/authors/', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: baseUrl + '/about/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: baseUrl + '/contact/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: baseUrl + '/privacy-policy/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: baseUrl + '/terms/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: baseUrl + '/' + post.slug + '/',
    lastModified: new Date(post.date || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: baseUrl + '/category/' + cat.slug + '/',
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: baseUrl + '/author/' + author.slug + '/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...categoryRoutes, ...authorRoutes];
}
