import { permanentRedirect } from 'next/navigation';
import { getAllPosts } from '@/lib/posts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogRedirectPage({ params }: Props) {
  const { slug } = await params;
  permanentRedirect(`/${slug}`);
}
