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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Newsroom
      </Link>

      <header className="space-y-4 mb-8">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="section-tag-box text-[11px]">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-500"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1 text-slate-500"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-slate-200 py-3.5 text-xs">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-10 w-10 rounded-full border border-slate-300 object-cover"
            />
            <div>
              <p className="font-bold text-slate-900">{post.author.name}</p>
              <p className="text-slate-500 text-[11px]">{post.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 mb-10 shadow-lg bg-slate-100">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full max-h-[500px] object-cover"
        />
        <div className="p-2.5 bg-slate-50 text-right text-[11px] text-slate-400 border-t border-slate-200">
          Source: High-resolution editorial photography via Unsplash API
        </div>
      </div>

      {/* Post Body */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6 text-base sm:text-lg">
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="article-content space-y-6 [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-blue-700 [&>h3]:mt-6 [&>h3]:mb-3 [&>p]:leading-relaxed [&>p]:text-slate-700 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-2 [&>blockquote]:border-l-4 [&>blockquote]:border-blue-500 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-600 [&>blockquote]:bg-blue-50/50 [&>blockquote]:py-2 [&>blockquote]:rounded-r"
        />
      </div>

      {/* Tags Section */}
      <footer className="mt-12 pt-8 border-t border-slate-200">
        <div className="flex flex-wrap items-center gap-2">
          <Tag className="h-4 w-4 text-blue-600 mr-2" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:border-blue-400 hover:text-blue-600 transition font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      </footer>
    </article>
  );
}
