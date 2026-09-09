import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { ArrowLeft, Calendar, Clock, Share2, Tag, CheckCircle2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };
  return {
    title: `${post.title} | TechPulse AI`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-[#94a3b8] hover:text-[#ef233c] transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Newsroom
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="section-tag-box text-[11px]">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-[#94a3b8]"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1 text-[#94a3b8]"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-[#cbd5e1] leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-[#1f293d] py-3 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border border-[#2b3a55] object-cover"
            />
            <div>
              <p className="font-bold text-white">{post.author.name}</p>
              <p className="text-[#94a3b8] text-[11px]">{post.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative rounded-2xl overflow-hidden border border-neutral-800 mb-12 shadow-2xl">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full max-h-[480px] object-cover"
        />
        <div className="p-2.5 bg-neutral-950/90 text-right text-[11px] text-neutral-500">
          Source: High-resolution stock via Unsplash API
        </div>
      </div>

      {/* Post Body */}
      <div className="prose prose-invert prose-cyan max-w-none text-neutral-300 leading-relaxed space-y-6 text-base sm:text-lg">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="article-content space-y-6 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-white [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:text-cyan-300 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-cyan-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-neutral-400"
        />
      </div>

      {/* Tags Section */}
      <footer className="mt-12 pt-8 border-t border-neutral-800">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-cyan-400 mr-2" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300 hover:border-neutral-700 transition"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
