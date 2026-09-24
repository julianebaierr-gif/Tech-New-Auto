import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.compors.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/portal-desk', '/portal-desk/', '/*?s=*', '/*?*'],
      },
      {
        userAgent: ['AhrefsBot', 'AhrefsSiteAudit'],
        allow: '/',
        disallow: ['/api/', '/portal-desk', '/portal-desk/', '/*?s=*', '/*?*'],
      },
      {
        userAgent: [
          'Googlebot',
          'Bingbot',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'Applebot',
        ],
        allow: '/',
        disallow: ['/portal-desk', '/portal-desk/', '/*?s=*', '/*?*'],
      },
    ],
    sitemap: baseUrl + '/sitemap.xml',
  };
}
