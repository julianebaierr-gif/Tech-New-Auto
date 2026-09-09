import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "All Articles | TechPulse AI",
  description: "Browse all automated tech updates, AI guides, and hardware developments.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-3xl mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-800">
          <BookOpen className="h-3.5 w-3.5" /> Complete Repository
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Technology Articles & Analysis</h1>
        <p className="mt-3 text-base text-neutral-400">
          Discover all stories generated and indexed by our autonomous AI system. Every post is synced directly through our GitHub Actions workflow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden hover:border-neutral-700 hover:bg-neutral-900/80 transition duration-200"
          >
            <div className="h-52 relative overflow-hidden bg-neutral-950">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 text-xs font-medium uppercase px-2.5 py-1 rounded bg-neutral-950/80 text-cyan-400 backdrop-blur-md border border-neutral-800">
                {post.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-neutral-400 mb-3">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
              <h2 className="font-bold text-xl text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-3">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-neutral-800/80 text-xs">
                <span className="text-neutral-300 font-medium">{post.author.name}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Full Article <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
