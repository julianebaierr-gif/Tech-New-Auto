import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import PortalDeskClient from './PortalDeskClient';

export const dynamic = 'force-static';
export const revalidate = false;

export const metadata: Metadata = {
  title: 'System Portal Management',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function PortalDeskPage() {
  const posts = getAllPosts();
  return <PortalDeskClient initialPosts={posts} />;
}
