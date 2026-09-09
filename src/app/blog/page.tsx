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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider mb-4 border border-blue-200">
          <BookOpen className="h-3.5 w-3.5" /> Full Archive
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Technology Articles & In-Depth Analysis</h1>
        <p className="mt-3 text-base text-slate-600">
          Discover all stories and investigative features published by our newsroom editors. New analysis released regularly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-400 hover:shadow-xl transition duration-300"
          >
            <div className="h-52 relative overflow-hidden bg-slate-100">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-3 left-3 text-xs font-bold uppercase px-2.5 py-1 rounded bg-white/90 text-blue-700 backdrop-blur-md shadow-xs">
                {post.category}
              </span>
            </div>
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
              <h2 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                <span className="text-slate-700 font-semibold">{post.author.name}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Full Story <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
