import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Clock, Calendar, Sparkles, TrendingUp, Cpu, Globe, Zap } from "lucide-react";

export default function HomePage() {
  const posts = getAllPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-neutral-950 pt-20 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/60 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" /> Modern Technology Journal
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight sm:leading-none">
            Exploring the Frontier of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Artificial Intelligence</span> & Future Tech
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Real-time tech insights, artificial intelligence breakthroughs, cloud innovations, and hardware evolution curated for engineers and innovators.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-semibold text-sm transition shadow-lg shadow-cyan-500/20"
            >
              Read Latest Stories <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 font-semibold text-sm transition"
            >
              About Our Editorial
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/60 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>Real-Time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>Deep Technical Analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span>Global Tech Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span>Industry Insights</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Story */}
      {featuredPost && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-500 inline-block"></span> Featured Headline
            </h2>
          </div>
          <Link
            href={`/blog/${featuredPost.slug}`}
            className="group block relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 hover:border-cyan-500/50 transition duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs text-cyan-400 font-medium">
                  <span className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-800">{featuredPost.category}</span>
                  <span className="flex items-center gap-1 text-neutral-400"><Calendar className="h-3.5 w-3.5" /> {featuredPost.date}</span>
                  <span className="flex items-center gap-1 text-neutral-400"><Clock className="h-3.5 w-3.5" /> {featuredPost.readTime}</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                  {featuredPost.title}
                </h3>
                <p className="text-neutral-400 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="h-10 w-10 rounded-full border border-neutral-700 object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">{featuredPost.author.name}</p>
                    <p className="text-xs text-neutral-400">{featuredPost.author.role}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 h-64 sm:h-80 relative rounded-xl overflow-hidden">
                <img
                  src={featuredPost.coverImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Recent Posts Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest Tech Dispatches</h2>
            <p className="text-sm text-neutral-400 mt-1">Directly generated from curated keywords and industry trends</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
            View Archive <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden hover:border-neutral-700 hover:bg-neutral-900/80 transition"
            >
              <div className="h-48 relative overflow-hidden bg-neutral-950">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-neutral-950/80 text-cyan-400 backdrop-blur-md border border-neutral-800">
                  {post.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h3>
                <p className="text-neutral-400 text-xs line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-neutral-800/80 text-xs">
                  <span className="text-neutral-400 font-medium">{post.author.name}</span>
                  <span className="text-cyan-400 font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                    Read More <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
