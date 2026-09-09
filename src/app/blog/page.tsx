import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: "All Articles & Research | TechPulse Newsroom",
  description: "Browse the complete archive of technical analyses, computing benchmarks, and engineering breakdowns published by TechPulse.",
};

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Magazine Editorial Masthead */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Dispatch &bull; The Complete Archive
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              TechPulse Newsroom
            </h1>
          </div>
          <p className="max-w-md text-sm text-slate-500 leading-relaxed">
            Investigative reports, system teardowns, and engineering perspectives across modern computing.
          </p>
        </div>
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
