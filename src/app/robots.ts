import { MetadataRoute } from 'next';

export const dynamic = 'force-static';
export const revalidate = false;

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://compors.com';
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/portal-desk', '/portal-desk/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/portal-desk', '/portal-desk/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/portal-desk', '/portal-desk/'],
      },
    ],
    sitemap: baseUrl + '/sitemap.xml',
  };
}
