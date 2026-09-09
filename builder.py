import os

files = {}

files["src/components/Navbar.tsx"] = """import Link from "next/link";
import { Cpu, BookOpen, Info, Mail, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-cyan-400 transition-colors">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Cpu className="h-5 w-5" />
          </div>
          <span>Tech<span className="text-cyan-400">Pulse</span></span>
          <span className="text-xs uppercase px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">AI Auto</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Articles
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Info className="h-4 w-4" /> About Us
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Mail className="h-4 w-4" /> Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms</Link>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-3 py-1.5 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Auto Bot Active (4h)</span>
          </div>
          <Link
            href="/blog"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition shadow-md shadow-cyan-500/25 flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" /> Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
"""

files["src/components/Footer.tsx"] = """import Link from "next/link";
import { Cpu, GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="h-7 w-7 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white">
              <Cpu className="h-4 w-4" />
            </div>
            <span>Tech<span className="text-cyan-400">Pulse</span></span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Next-generation automated technology journal. Curated by Gemini AI, synced with live Google Sheets, and scheduled with GitHub Actions every 4 hours.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Explore</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/blog" className="hover:text-cyan-400 transition">All Articles</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400 transition">About Our AI Pipeline</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition">Editorial Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Legal & Compliance</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Autonomous Engine</h3>
          <p className="text-xs text-neutral-400 mb-3">
            Connected to Google Sheets, Unsplash API, Gemini AI, and deployed on Vercel.
          </p>
          <div className="flex items-center gap-3 text-neutral-400">
            <a href="https://github.com/julianebaierr-gif/Tech-New-Auto" target="_blank" rel="noreferrer" className="hover:text-cyan-400 p-2 bg-neutral-900 rounded-lg border border-neutral-800 transition">
              <GitBranch className="h-4 w-4" />
            </a>
            <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800 text-cyan-400 text-xs font-mono">
              4-Hour Sync
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} TechPulse Autonomous Media. All rights reserved.</p>
      </div>
    </footer>
  );
}
"""

files["src/app/layout.tsx"] = """import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TechPulse | Autonomous AI & Tech Journal",
  description: "Next-gen tech publications automatically curated with Gemini AI, Google Sheets, and scheduled automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 antialiased selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
"""

files["src/app/page.tsx"] = """import Link from "next/link";
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
            <Sparkles className="h-3.5 w-3.5" /> Autonomous Tech Publication
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-tight sm:leading-none">
            Exploring the Frontier of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">Artificial Intelligence</span> & Future Tech
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl leading-relaxed">
            Real-time tech insights, artificial intelligence breakthroughs, cloud innovations, and hardware evolution updated dynamically via autonomous pipelines.
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
              How Our AI Pipeline Works
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-neutral-800/60 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-400" />
              <span>4-Hour Automated Cadence</span>
            </div>
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-indigo-400" />
              <span>Gemini 2.5 Flash Engine</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              <span>Live Google Sheet Curation</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-400" />
              <span>100% SEO Optimized</span>
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
"""

files["src/app/blog/page.tsx"] = """import Link from "next/link";
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
"""

files["src/app/blog/[slug]/page.tsx"] = """import { notFound } from "next/navigation";
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
        className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-cyan-400 transition mb-8"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Articles
      </Link>

      <header className="space-y-6 mb-10">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-semibold uppercase">
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-neutral-400"><Calendar className="h-3.5 w-3.5" /> {post.date}</span>
          <span className="flex items-center gap-1 text-neutral-400"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
          <span className="flex items-center gap-1 text-emerald-400"><CheckCircle2 className="h-3.5 w-3.5" /> AI Verified</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {post.title}
        </h1>

        <p className="text-lg text-neutral-300 leading-relaxed font-normal">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between border-y border-neutral-800 py-4">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-11 w-11 rounded-full border border-neutral-700 object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-white">{post.author.name}</p>
              <p className="text-xs text-neutral-400">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-400 hidden sm:inline">Autonomous Pipeline</span>
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
"""

files["src/app/about/page.tsx"] = """import { Cpu, Zap, Database, RefreshCw, Shield, Layers } from "lucide-react";

export const metadata = {
  title: "About Us & Automation Architecture | TechPulse",
  description: "Learn how TechPulse operates completely autonomously using Google Sheets, Gemini AI, Unsplash, and GitHub Actions.",
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-14">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider border border-cyan-800">
          Autonomous Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          About TechPulse Editorial
        </h1>
        <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
          TechPulse is a fully automated technology intelligence blog engineered to transform live spreadsheet keyword curation into deep, professional, and SEO-optimized technical articles.
        </p>
      </div>

      {/* Pipeline Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-900/60">
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Database className="h-6 w-6 text-emerald-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">1. Google Sheets</h2>
          <p className="text-xs text-neutral-400">Pulls target keywords, categories, and publication queues.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Cpu className="h-6 w-6 text-cyan-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">2. Gemini AI</h2>
          <p className="text-xs text-neutral-400">Deep technical research, structured analysis, and SEO generation.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <Layers className="h-6 w-6 text-purple-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">3. Unsplash API</h2>
          <p className="text-xs text-neutral-400">High-resolution, license-cleared tech photography.</p>
        </div>
        <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-2 text-center">
          <RefreshCw className="h-6 w-6 text-indigo-400 mx-auto" />
          <h2 className="text-sm font-bold text-white">4. 4-Hour Cron</h2>
          <p className="text-xs text-neutral-400">GitHub Actions commits and Vercel automatically deploys.</p>
        </div>
      </div>

      {/* Detailed Mission */}
      <div className="space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed border-t border-neutral-800 pt-10">
        <h2 className="text-2xl font-bold text-white">Our Mission</h2>
        <p>
          In a rapidly evolving digital era where artificial intelligence, quantum computing, cybersecurity, and cloud architectures advance by the hour, conventional journalism struggles to keep pace. TechPulse was engineered to bridge that latency.
        </p>
        <p>
          By pairing deterministic spreadsheet queues with state-of-the-art Large Language Models (Google Gemini), we deliver accurate, insightful, and accessible tech briefings around the clock without manual intervention.
        </p>

        <h2 className="text-2xl font-bold text-white pt-6">Quality Control & Verification</h2>
        <p>
          Every article generated through our automated pipeline complies with strict editorial guardrails:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Factual consistency and technical precision in AI & software development topics.</li>
          <li>Proper attribution and open-license image sourcing through official APIs.</li>
          <li>Continuous schema validation to prevent malformed metadata or broken links.</li>
          <li>Strict adherence to international data privacy and terms of use.</li>
        </ul>
      </div>
    </div>
  );
}
"""

files["src/app/contact/page.tsx"] = """import { Mail, MessageSquare, MapPin, Send, Globe } from "lucide-react";

export const metadata = {
  title: "Contact Us | TechPulse",
  description: "Get in touch with the TechPulse team for editorial inquiries, technical partnerships, or API integrations.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-800">
          <Mail className="h-3.5 w-3.5" /> Get in Touch
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Contact Editorial & Support</h1>
        <p className="mt-3 text-neutral-400 text-sm sm:text-base">
          Have questions regarding our automated content pipelines, sponsored coverage, or API integrations? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-1">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Mail className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">Email Inquiries</span>
            </div>
            <p className="text-xs text-neutral-400">editor@techpulse-auto.com</p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-purple-400">
              <Globe className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">GitHub Repository</span>
            </div>
            <p className="text-xs text-neutral-400">julianebaierr-gif/Tech-New-Auto</p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">Response Time</span>
            </div>
            <p className="text-xs text-neutral-400">Editorial tickets are typically reviewed within 24 business hours.</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 lg:col-span-2">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Subject / Inquiry Type</label>
              <select className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition">
                <option>General Editorial Feedback</option>
                <option>API & Keyword Automation Request</option>
                <option>Content Correction / DMCA Notice</option>
                <option>Partnership & Advertising</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your query or feedback in detail..."
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
"""

files["src/app/privacy-policy/page.tsx"] = """export const metadata = {
  title: "Privacy Policy | TechPulse",
  description: "Comprehensive privacy statement regarding user data, cookies, analytics, and autonomous automation.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-neutral-300 leading-relaxed text-sm sm:text-base">
      <header className="border-b border-neutral-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-xs text-neutral-400">Effective Date: September 2026 | Last Updated: Autonomous Engine Release</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Overview</h2>
        <p>
          At <strong>TechPulse</strong> (accessible via our Vercel-hosted deployment), safeguarding your privacy is of paramount importance. This Privacy Policy details the types of information we collect, how it is processed, and your rights in accordance with worldwide data protection standards (including GDPR and CCPA guidelines).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. Autonomous Content Generation & Information Sourced</h2>
        <p>
          Our platform operates an autonomous content pipeline integrating Google Sheets, Gemini AI models, and Unsplash public APIs. We do NOT harvest or collect sensitive personal identifiable information (PII) from our readers during standard browsing sessions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Log Files & Performance Analytics</h2>
        <p>
          Like modern web services hosted on serverless infrastructure (Vercel), standard access log information is captured automatically:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Internet Protocol (IP) address</li>
          <li>Browser type and device profile</li>
          <li>Referring/exit pages and timestamp metrics</li>
          <li>Core Web Vitals performance benchmarks</li>
        </ul>
        <p>This technical telemetry is utilized exclusively for uptime maintenance, abuse prevention, and page delivery acceleration.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Cookies and Web Storage</h2>
        <p>
          We employ minimal, privacy-centric cookies strictly for maintaining user theme preferences (e.g., dark mode settings) and optimizing serverless edge caching. We do not engage in third-party cross-site behavioral tracking or sell user browsing records.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">5. Third-Party Integrations & APIs</h2>
        <p>
          Our platform integrates with trusted cloud providers:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li><strong>Vercel</strong>: Cloud deployment and Edge network delivery.</li>
          <li><strong>GitHub Actions</strong>: CI/CD automation and cron trigger execution.</li>
          <li><strong>Unsplash</strong>: High-resolution media asset resolution.</li>
          <li><strong>Google APIs</strong>: Structured spreadsheet synchronization and Gemini model inferences.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">6. Contact Our Data Officer</h2>
        <p>
          If you have questions or inquiries regarding this Privacy Policy, you may contact our legal operations team at <code className="text-cyan-400 font-mono">privacy@techpulse-auto.com</code>.
        </p>
      </section>
    </div>
  );
}
"""

files["src/app/terms/page.tsx"] = """export const metadata = {
  title: "Terms & Conditions | TechPulse",
  description: "Terms and conditions governing access and usage of the TechPulse website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10 text-neutral-300 leading-relaxed text-sm sm:text-base">
      <header className="border-b border-neutral-800 pb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Terms & Conditions</h1>
        <p className="mt-2 text-xs text-neutral-400">Last Revised: September 2026</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using <strong>TechPulse</strong>, you acknowledge and agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must refrain from utilizing this platform.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. AI-Generated Editorial Notice</h2>
        <p>
          Articles and commentary on TechPulse are generated through an automated intelligence workflow combining LLMs (Gemini API) and curation rules. While our models are instructed to produce strictly factual, researched content:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-neutral-400">
          <li>Information is provided for educational and informational purposes only.</li>
          <li>We do not offer certified financial, legal, or enterprise security advisory.</li>
          <li>Users must verify critical architecture or software decisions independently.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Intellectual Property Rights</h2>
        <p>
          The layout, code architecture, styling, and branding of TechPulse are protected under international copyright and open-source licensing standards. Blog content, code snippets, and summaries may be quoted with standard canonical attribution.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Acceptable Use Policy</h2>
        <p>
          You agree not to attempt denial-of-service disruptions, scrape the website with aggressive request rates exceeding standard robots.txt policies, or exploit any automated endpoint.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">5. Limitation of Liability</h2>
        <p>
          In no event shall TechPulse or its contributors be held liable for any damages arising out of the use or inability to use the materials on this website.
        </p>
      </section>
    </div>
  );
}
"""

# Demo seed posts
files["content/posts/revolution-of-autonomous-ai-agents.json"] = """{
  "title": "The Revolution of Autonomous AI Agents in 2026: Beyond Chatbots",
  "excerpt": "How multi-agent architectures, self-correcting tool calls, and background automation loops are replacing traditional software development pipelines.",
  "coverImage": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  "date": "2026-09-09",
  "category": "Artificial Intelligence",
  "author": {
    "name": "TechPulse AI Core",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "role": "Lead Automation Analyst"
  },
  "readTime": "5 min read",
  "tags": ["AI", "Autonomous Agents", "LLM", "Future Tech"],
  "content": "<p>The era of static, prompt-and-response chatbots has decisively passed. In 2026, the forefront of computer science belongs to <strong>Autonomous AI Agents</strong>—systems endowed with persistent memory, native tool access, and the capability to decompose ambiguous objectives into executable milestones.</p><h2>From Passive Completion to Active Orchestration</h2><p>Traditional language models excelled at producing text when prompted. However, modern autonomous agents operate in persistent feedback loops: planning, executing terminal operations, inspecting feedback, correcting runtime exceptions, and verifying results.</p><h3>Key Architectural Innovations</h3><ul><li><strong>Function Calling & MCP (Model Context Protocol):</strong> Enabling models to query local databases, invoke cloud APIs, and inspect filesystem state dynamically.</li><li><strong>Multi-Agent Consensus:</strong> Dividing responsibilities among dedicated researcher, planner, and executor agents to minimize hallucination.</li><li><strong>Self-Healing Pipelines:</strong> Detecting compilation or lint errors and patching source code in-place without human intervention.</li></ul><blockquote>'The true milestone of modern computing is not whether a model can write code, but whether it can debug, test, and deploy software autonomously.'</blockquote><h2>The Impact on Enterprise Software</h2><p>Engineering teams are shifting from manual boilerplate coding to guiding autonomous agents. As these models gain deeper reasoning and tighter integration with platforms like GitHub and cloud infrastructure, software deployment velocity is accelerating exponentially.</p>"
}"""

files["content/posts/nextjs-serverless-architecture.json"] = """{
  "title": "Next.js & Serverless Edge: Building High-Speed Global Web Apps",
  "excerpt": "A deep dive into Edge caching, incremental static regeneration, and server components for lightning-fast modern web applications.",
  "coverImage": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  "date": "2026-09-08",
  "category": "Web Development",
  "author": {
    "name": "Elena Rostova",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    "role": "Cloud Architect"
  },
  "readTime": "4 min read",
  "tags": ["Next.js", "Serverless", "React", "Cloud"],
  "content": "<p>Building globally scalable web applications once required complex multi-region cluster management. Today, the convergence of <strong>Next.js App Router</strong> and <strong>Vercel Edge Network</strong> has fundamentally redefined performance standards.</p><h2>Zero-Latency Edge Delivery</h2><p>By shifting computational execution to nodes located nearest to the end user, round-trip latency drops to sub-50 milliseconds worldwide. Dynamic content is rendered instantaneously while static assets remain permanently cached across distributed CDNs.</p><h3>Why Server Components Change Everything</h3><ul><li><strong>Zero Client Bundle Overhead:</strong> Heavy markdown parsers and database drivers execute entirely on the server.</li><li><strong>Instant Streaming:</strong> Critical layout scaffolding loads immediately while slow asynchronous blocks stream in concurrently.</li><li><strong>Enhanced Security:</strong> Sensitive credentials and API tokens never leak into client browser bundles.</li></ul>"
}"""

files["content/posts/quantum-computing-breakthroughs.json"] = """{
  "title": "Quantum Supremacy & Error Correction: What Engineers Need to Know",
  "excerpt": "Exploring recent physical qubit advancements and logical fault-tolerant architectures reshaping cryptography and materials science.",
  "coverImage": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
  "date": "2026-09-07",
  "category": "Hardware & Quantum",
  "author": {
    "name": "Dr. Marcus Vance",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "role": "Quantum Research Fellow"
  },
  "readTime": "6 min read",
  "tags": ["Quantum", "Physics", "Cryptography", "Deep Tech"],
  "content": "<p>Quantum computing is exiting the purely theoretical phase and transitioning into physical fault tolerance. With recent breakthroughs in surface code error correction and neutral-atom hardware, the horizon for practical quantum advantage has moved dramatically closer.</p><h2>The Critical Role of Logical Qubits</h2><p>Physical qubits are inherently sensitive to environmental decoherence. The ultimate breakthrough lies in binding hundreds of noisy physical qubits into a single, fault-tolerant logical qubit capable of running complex quantum simulations without decay.</p>"
}"""

for path, content in files.items():
    dirname = os.path.dirname(path)
    if dirname:
        os.makedirs(dirname, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Generated: {path}")

# Scripts & Workflows
os.makedirs("scripts", exist_ok=True)
os.makedirs(".github/workflows", exist_ok=True)

workflow_content = """name: Auto Publish Tech Article (4-Hour Sync)

on:
  schedule:
    # Runs every 4 hours automatically
    - cron: '0 */4 * * *'
  workflow_dispatch: # Allows manual run anytime from GitHub Actions tab

permissions:
  contents: write

jobs:
  auto-publish:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install Python Packages
        run: |
          pip install --upgrade pip
          pip install google-genai requests gspread oauth2client

      - name: Run Automation Engine
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          UNSPLASH_ACCESS_KEY: ${{ secrets.UNSPLASH_ACCESS_KEY }}
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
          GOOGLE_SHEET_CSV_URL: ${{ secrets.GOOGLE_SHEET_CSV_URL }}
          GOOGLE_SERVICE_ACCOUNT_JSON: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_JSON }}
        run: |
          python scripts/auto_publisher.py

      - name: Commit and Push New Article
        run: |
          git config --global user.name "TechPulse Bot"
          git config --global user.email "bot@techpulse-auto.com"
          git add content/posts/
          if git diff --staged --quiet; then
            echo "No new post created in this run."
          else
            git commit -m "Auto Post: New Tech Article $(date +'%Y-%m-%d %H:%M') [skip ci]"
            git push origin main
          fi
"""

with open(".github/workflows/auto-publish.yml", "w", encoding="utf-8") as f:
    f.write(workflow_content)
print("Created: .github/workflows/auto-publish.yml")

publisher_script = '''import os
import re
import csv
import json
import time
import requests
from datetime import datetime

# 1. Configuration & Secrets
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
UNSPLASH_ACCESS_KEY = os.environ.get("UNSPLASH_ACCESS_KEY")
GOOGLE_SHEET_CSV_URL = os.environ.get("GOOGLE_SHEET_CSV_URL")
GOOGLE_SHEET_ID = os.environ.get("GOOGLE_SHEET_ID")
POSTS_DIR = os.path.join(os.getcwd(), "content", "posts")

os.makedirs(POSTS_DIR, exist_ok=True)

def fetch_keyword_from_sheet():
    """
    Fetches target keyword and topic from Google Sheet.
    Supports both public published CSV URL or gspread with service account.
    """
    keyword_data = None

    # Method A: Google Sheet CSV link
    if GOOGLE_SHEET_CSV_URL:
        try:
            print("[INFO] Fetching keyword queue from GOOGLE_SHEET_CSV_URL...")
            res = requests.get(GOOGLE_SHEET_CSV_URL, timeout=15)
            if res.status_code == 200:
                reader = csv.DictReader(res.text.splitlines())
                for row in reader:
                    status = row.get("Status", "").strip().lower()
                    if status in ["pending", "new", "queued", ""]:
                        keyword_data = {
                            "keyword": row.get("Keyword", "").strip(),
                            "category": row.get("Category", "Tech & AI").strip() or "Tech & AI",
                            "tags": [t.strip() for t in row.get("Tags", "").split(",") if t.strip()]
                        }
                        if keyword_data["keyword"]:
                            print(f"[FOUND] Found pending keyword: {keyword_data['keyword']}")
                            return keyword_data
        except Exception as e:
            print(f"[WARN] Error fetching from GOOGLE_SHEET_CSV_URL: {e}")

    # Method B: Service Account via gspread if available
    service_acc_json = os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON")
    if service_acc_json and GOOGLE_SHEET_ID:
        try:
            import gspread
            from oauth2client.service_account import ServiceAccountCredentials

            print("[INFO] Fetching keyword from Google Sheet via Service Account...")
            creds_dict = json.loads(service_acc_json)
            scope = ["https://spreadsheets.google.com/feeds", "https://www.googleapis.com/auth/drive"]
            creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
            client = gspread.authorize(creds)
            sheet = client.open_by_key(GOOGLE_SHEET_ID).sheet1
            records = sheet.get_all_records()
            for idx, row in enumerate(records, start=2):
                status = str(row.get("Status", "")).strip().lower()
                if status in ["pending", "new", "queued", ""]:
                    kw = str(row.get("Keyword", "")).strip()
                    if kw:
                        # Mark as Published in sheet
                        try:
                            # Update Status column (assuming col 3 or named Status)
                            headers = sheet.row_values(1)
                            if "Status" in headers:
                                col_idx = headers.index("Status") + 1
                                sheet.update_cell(idx, col_idx, "Published")
                        except Exception as update_err:
                            print(f"[WARN] Could not update cell in Google Sheet: {update_err}")

                        return {
                            "keyword": kw,
                            "category": str(row.get("Category", "Technology")).strip() or "Technology",
                            "tags": [t.strip() for t in str(row.get("Tags", "")).split(",") if t.strip()]
                        }
        except Exception as e:
            print(f"[WARN] Error with gspread: {e}")

    # Fallback default trending tech topics pool if sheet is empty or unconfigured
    fallback_pool = [
        {"keyword": "Agentic AI Workflows and Tool Use in 2026", "category": "Artificial Intelligence", "tags": ["AI", "Agents", "Automation"]},
        {"keyword": "Neuromorphic Computing and Energy-Efficient Chips", "category": "Hardware & Semiconductors", "tags": ["Hardware", "Chips", "Computing"]},
        {"keyword": "Zero Trust Cloud Security for Modern Distributed Systems", "category": "Cybersecurity", "tags": ["Security", "Cloud", "DevOps"]},
        {"keyword": "WebAssembly in Serverless Architectures", "category": "Software Engineering", "tags": ["WebAssembly", "Serverless", "Wasm"]},
        {"keyword": "Post-Quantum Cryptography Migration Roadmaps", "category": "Cybersecurity", "tags": ["Cryptography", "Quantum", "Security"]}
    ]
    import random
    selected = random.choice(fallback_pool)
    print(f"[FALLBACK] Using keyword from trending pool: {selected['keyword']}")
    return selected

def fetch_unsplash_image(query):
    """
    Fetches high quality tech photo from Unsplash.
    """
    default_img = "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    if not UNSPLASH_ACCESS_KEY:
        print("[INFO] No UNSPLASH_ACCESS_KEY provided, using curated tech cover.")
        return default_img

    try:
        url = f"https://api.unsplash.com/search/photos?page=1&per_page=1&query={query}&client_id={UNSPLASH_ACCESS_KEY}&orientation=landscape"
        res = requests.get(url, timeout=10)
        if res.status_code == 200:
            data = res.json()
            if data.get("results"):
                return data["results"][0]["urls"]["regular"]
    except Exception as e:
        print(f"[WARN] Unsplash API error: {e}")

    return default_img

def generate_article_with_gemini(keyword_info):
    """
    Generates a full SEO-rich tech article using Gemini API.
    """
    kw = keyword_info["keyword"]
    category = keyword_info.get("category", "Technology")

    if not GEMINI_API_KEY:
        print("[WARN] GEMINI_API_KEY not configured. Generating high-quality deterministic article.")
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', kw.lower()).strip('-')
        return {
            "title": f"The Evolution of {kw}: Strategic Insights for Modern Engineering",
            "slug": slug,
            "excerpt": f"An in-depth technical analysis of {kw}, examining architectural trade-offs, industry adoption benchmarks, and future engineering trends.",
            "category": category,
            "readTime": "5 min read",
            "tags": keyword_info.get("tags") or ["Tech", "Engineering", "Innovation"],
            "content": f"<p>As technology infrastructures become increasingly sophisticated, <strong>{kw}</strong> has emerged as a cornerstone for forward-thinking engineering organizations.</p><h2>Architectural Foundations and Market Context</h2><p>Addressing the demands of modern computing requires balancing scalability, maintainability, and latency. In the context of {kw}, systems must be designed to adapt dynamically to evolving traffic patterns and workload complexities.</p><h2>Key Implementation Considerations</h2><ul><li><strong>Performance Optimization:</strong> Ensuring computational workloads minimize redundant overhead.</li><li><strong>Resilience & Fault Tolerance:</strong> Designing decoupled components that isolate failure domains.</li><li><strong>Ecosystem Integration:</strong> Leveraging standardized APIs and protocols.</li></ul><blockquote>'Modern engineering is about reducing cycle time while maximizing system reliability and continuous observability.'</blockquote><h2>Future Outlook</h2><p>Looking ahead, organizations that integrate {kw} effectively will maintain an agility advantage over competitors tied to legacy monoliths.</p>"
        }

    try:
        from google import genai
        client = genai.Client(api_key=GEMINI_API_KEY)

        prompt = f"""
You are an elite technical author and software architect writing for TechPulse, a premier technology journal.
Write a comprehensive, professional, and SEO-optimized tech article based on this keyword/topic: "{kw}".

Respond ONLY with valid JSON in this exact structure:
{{
  "title": "Engaging, authoritative title",
  "slug": "url-friendly-lowercase-slug-without-special-characters",
  "excerpt": "Compelling 2-sentence summary of the article for social sharing and search meta",
  "category": "{category}",
  "readTime": "5 min read",
  "tags": ["Tag1", "Tag2", "Tag3"],
  "content": "Rich HTML content using <h2>, <h3>, <p>, <ul>, <li>, <blockquote>, <strong> tags. Minimum 450 words of deep technical insights."
}}
"""
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
        )

        raw_text = response.text.strip()
        # Clean potential markdown fences ```json ... ```
        raw_text = re.sub(r'^```json\s*', '', raw_text)
        raw_text = re.sub(r'\s*```$', '', raw_text)

        article = json.loads(raw_text)
        return article
    except Exception as e:
        print(f"[ERROR] Gemini generation failed: {e}")
        slug = re.sub(r'[^a-zA-Z0-9]+', '-', kw.lower()).strip('-')
        return {
            "title": f"Advancements in {kw}: Technical Deep Dive",
            "slug": slug,
            "excerpt": f"Comprehensive overview and practical implementation insights regarding {kw}.",
            "category": category,
            "readTime": "4 min read",
            "tags": ["Technology", "Software", "AI"],
            "content": f"<p>Deep dive into {kw} and how modern engineering workflows are being transformed by high-speed automation and intelligent toolchains.</p>"
        }

def main():
    print("[START] TechPulse Autonomous Publisher running...")
    keyword_data = fetch_keyword_from_sheet()
    print(f"[PROCESS] Processing keyword: {keyword_data['keyword']}")

    article_data = generate_article_with_gemini(keyword_data)

    cover_image = fetch_unsplash_image(keyword_data["keyword"])

    slug = article_data.get("slug") or re.sub(r'[^a-zA-Z0-9]+', '-', article_data["title"].lower()).strip('-')
    target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    # Prevent overwriting if already exists
    if os.path.exists(target_file):
        slug = f"{slug}-{int(time.time())}"
        target_file = os.path.join(POSTS_DIR, f"{slug}.json")

    post_record = {
        "title": article_data["title"],
        "excerpt": article_data["excerpt"],
        "coverImage": cover_image,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "category": article_data.get("category", "Technology"),
        "author": {
            "name": "TechPulse Autonomous Bot",
            "avatar": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80",
            "role": "AI Research & Publishing Engine"
        },
        "readTime": article_data.get("readTime", "5 min read"),
        "tags": article_data.get("tags", ["Tech", "AI", "Automation"]),
        "content": article_data["content"]
    }

    with open(target_file, "w", encoding="utf-8") as f:
        json.dump(post_record, f, indent=2)

    print(f"[SUCCESS] Successfully published: {target_file}")

if __name__ == "__main__":
    main()
'''

with open("scripts/auto_publisher.py", "w", encoding="utf-8") as f:
    f.write(publisher_script)
print("Created: scripts/auto_publisher.py")
