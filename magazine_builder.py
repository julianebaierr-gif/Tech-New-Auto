import os

files = {}

# 1. Globals CSS
files["src/app/globals.css"] = """@import "tailwindcss";

:root {
  --primary-red: #c1121e;
  --dark-red: #780000;
  --accent-gold: #f59e0b;
  --bg-dark: #0b0f19;
  --card-dark: #111827;
  --card-border: #1f293d;
}

body {
  background-color: var(--bg-dark);
  color: #f1f5f9;
  font-family: Arial, Helvetica, sans-serif;
}

/* Red section headers matching GenAlphaMagazines */
.section-tag-box {
  background: linear-gradient(135deg, #ef233c 0%, #c1121e 60%, #780000 100%);
  color: #ffffff;
  padding: 0.35rem 1rem;
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  border-radius: 4px 4px 0 0;
}

.section-line {
  border-bottom: 2px solid #c1121e;
  margin-bottom: 1.5rem;
}
"""

# 2. Top Utility Bar
files["src/components/TopUtilityBar.tsx"] = """import Link from "next/link";

export default function TopUtilityBar() {
  return (
    <div className="bg-[#070a12] border-b border-[#172033] text-xs text-[#94a3b8] py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>📅 Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>&bull;</span>
          <span className="text-[#38bdf8] font-medium">Independent Technology Journalism & Future Trends</span>
        </div>
        <nav className="flex items-center gap-4 text-xs font-medium">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/about" className="hover:text-white transition">Editorial Standards</Link>
          <Link href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
"""

# 3. Main Header (Logo, Tagline, Action Button)
files["src/components/MainHeader.tsx"] = """import Link from "next/link";
import { Mail } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="bg-[#0b0f19] border-b border-[#1f293d] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4 group">
          {/* Creative Logo Badge matching GenAlpha style */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#780000] via-[#c1121e] to-[#ef233c] p-1 shadow-lg shadow-red-900/30 flex items-center justify-center text-white border-2 border-[#f59e0b]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-12 h-12">
              <circle cx="50" cy="50" r="45" fill="#111827" />
              <polygon points="50,20 80,45 68,80 32,80 20,45" fill="#c1121e" stroke="#f59e0b" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="24" fontFamily="Arial">TP</text>
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
              <span>TECH</span>
              <span className="text-[#ef233c]">PULSE</span>
              <span className="text-[#f59e0b] ml-1">MAGAZINE</span>
            </div>
            <p className="text-xs sm:text-sm text-[#94a3b8] font-medium tracking-wide mt-1">
              Global Technology &bull; Artificial Intelligence &bull; Computing Frontiers
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#161f30] hover:bg-[#1f2b42] border border-[#2b3a55] text-white text-xs font-semibold transition"
          >
            <Mail className="h-3.5 w-3.5 text-[#ef233c]" /> News Tip / Press Release
          </Link>
        </div>
      </div>
    </header>
  );
}
"""

# 4. Sticky Main Navigation Bar with Departments
files["src/components/MainNavbar.tsx"] = """import Link from "next/link";

export const categories = [
  { name: "News", slug: "news", emoji: "🏛️" },
  { name: "Business", slug: "business", emoji: "💼" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", emoji: "🤖" },
  { name: "Software", slug: "software", emoji: "💻" },
  { name: "Hardware", slug: "hardware", emoji: "⚡" },
  { name: "Cybersecurity", slug: "cybersecurity", emoji: "🛡️" },
  { name: "Cloud", slug: "cloud", emoji: "☁️" },
  { name: "Games", slug: "games", emoji: "🎮" },
  { name: "Future Tech", slug: "future-tech", emoji: "🚀" },
];

export default function MainNavbar() {
  return (
    <nav className="sticky top-0 z-40 bg-[#070a12] border-b border-[#1f293d] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center overflow-x-auto scrollbar-none py-2 gap-1 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <li>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded hover:bg-[#c1121e] hover:text-white transition text-[#f1f5f9] inline-block font-bold"
            >
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="px-3.5 py-1.5 rounded hover:bg-[#c1121e] hover:text-white transition text-[#94a3b8] hover:text-white inline-block"
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded bg-[#1e293b] hover:bg-[#c1121e] text-[#f59e0b] hover:text-white transition inline-block font-bold ml-2"
            >
              All Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
"""

# 5. Breaking News Ticker
files["src/components/BreakingTicker.tsx"] = """import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BreakingTicker() {
  const posts = getAllPosts().slice(0, 8);

  return (
    <div className="bg-[#111827] border-b border-[#1f293d] py-2 px-4 sm:px-6 lg:px-8 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-2 bg-[#c1121e] text-white px-2.5 py-1 rounded font-bold text-[11px] tracking-wider whitespace-nowrap">
          <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
          BREAKING NEWS
        </div>
        <div className="flex-1 overflow-x-auto scrollbar-none whitespace-nowrap">
          <div className="inline-flex items-center gap-6 text-[#94a3b8]">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="hover:text-[#f59e0b] transition inline-flex items-center gap-2"
              >
                <span className="text-[#c1121e] font-bold">&bull;</span>
                <span className="text-[#e2e8f0] hover:text-white">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
"""

# 6. Category Quick Explorer Pills Bar
files["src/components/CategoryQuickBar.tsx"] = """import Link from "next/link";
import { categories } from "./MainNavbar";

export default function CategoryQuickBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4 mb-8 border-b border-[#1f293d]">
      <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-wider mr-2">Explore:</span>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="text-xs px-3 py-1.5 rounded-full bg-[#111827] hover:bg-[#c1121e] hover:text-white text-[#cbd5e1] border border-[#1f293d] transition font-medium flex items-center gap-1.5"
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </Link>
      ))}
      <Link
        href="/blog"
        className="text-xs px-3.5 py-1.5 rounded-full bg-[#c1121e] hover:bg-[#ef233c] text-white font-bold transition flex items-center gap-1"
      >
        ✨ All Topics
      </Link>
    </div>
  );
}
"""

# 7. Magazine Style Footer
files["src/components/Footer.tsx"] = """import Link from "next/link";
import { categories } from "./MainNavbar";

export default function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-[#1f293d] text-sm text-[#94a3b8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#c1121e] p-1 flex items-center justify-center text-white font-bold border border-[#f59e0b]">
              TP
            </div>
            <div className="font-black text-xl text-white">
              TECH<span className="text-[#ef233c]">PULSE</span>
            </div>
          </Link>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            TechPulse Magazine is an independent publication delivering comprehensive reporting on modern engineering, computing infrastructure, semiconductors, AI breakthroughs, and digital culture.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="hover:text-[#ef233c] transition">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Editorial & Policy
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-[#ef233c] transition">About Our Journal</Link></li>
            <li><Link href="/about" className="hover:text-[#ef233c] transition">Editorial Standards</Link></li>
            <li><Link href="/contact" className="hover:text-[#ef233c] transition">News Tips & Submissions</Link></li>
            <li><Link href="/contact" className="hover:text-[#ef233c] transition">Press Office</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Legal & Compliance
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-[#ef233c] transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#ef233c] transition">Terms & Conditions</Link></li>
            <li><span className="text-[#64748b]">DMCA Guidelines</span></li>
            <li><span className="text-[#64748b]">Code of Ethics</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#172033] py-6 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} TechPulse Magazine. All rights reserved. Operating under independent editorial governance.</p>
        </div>
      </div>
    </footer>
  );
}
"""

# 8. Magazine Multi-Section Home Page
files["src/app/page.tsx"] = """import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import CategoryQuickBar from "@/components/CategoryQuickBar";

export default function HomePage() {
  const posts = getAllPosts();
  const leadPost = posts[0];
  const sideArticles = posts.slice(1, 7);

  // Group by category for magazine sections
  const aiPosts = posts.filter(p => p.category.toLowerCase().includes("ai") || p.category.toLowerCase().includes("artificial") || p.category.toLowerCase().includes("agent")).slice(0, 3);
  const webPosts = posts.filter(p => p.category.toLowerCase().includes("web") || p.category.toLowerCase().includes("software")).slice(0, 3);
  const hardwarePosts = posts.filter(p => p.category.toLowerCase().includes("hardware") || p.category.toLowerCase().includes("quantum") || p.category.toLowerCase().includes("semiconductor")).slice(0, 3);
  const generalPosts = posts.slice(4, 10);

  return (
    <div className="space-y-12">
      <CategoryQuickBar />

      {/* 1. LATEST STORIES (Pattern A: Big Lead Feature + Side Stories) */}
      <section>
        <div className="section-line">
          <span className="section-tag-box">Latest Stories</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Big Lead Article */}
          {leadPost && (
            <article className="lg:col-span-7 bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition duration-200 flex flex-col">
              <div className="h-72 sm:h-96 relative overflow-hidden bg-black">
                <img
                  src={leadPost.coverImage}
                  alt={leadPost.title}
                  className="w-full h-full object-cover hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ef233c] mb-2">
                  {leadPost.category} &bull; Editorial Lead Feature
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white hover:text-[#ef233c] transition leading-snug mb-3">
                  <Link href={`/blog/${leadPost.slug}`}>{leadPost.title}</Link>
                </h2>
                <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed mb-6 line-clamp-3">
                  {leadPost.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#1f293d] text-xs text-[#64748b]">
                  <span>By <strong className="text-[#cbd5e1]">{leadPost.author.name}</strong></span>
                  <span>{leadPost.date}</span>
                </div>
              </div>
            </article>
          )}

          {/* Mini Side List */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {sideArticles.map((post) => (
              <article
                key={post.slug}
                className="bg-[#111827] p-3.5 rounded-lg border border-[#1f293d] hover:border-[#c1121e] transition flex items-center gap-4 group"
              >
                <div className="w-24 h-20 shrink-0 rounded overflow-hidden bg-black">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase text-[#ef233c] block mb-1">
                    {post.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-1">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <span className="text-[11px] text-[#64748b]">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 2. ARTIFICIAL INTELLIGENCE & AGENTS */}
      <section>
        <div className="section-line">
          <span className="section-tag-box">Artificial Intelligence & Computing</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(aiPosts.length > 0 ? aiPosts : generalPosts.slice(0, 3)).map((post) => (
            <article
              key={post.slug}
              className="bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-[#ef233c] mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{post.author.name}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. SOFTWARE ARCHITECTURE & CLOUD */}
      <section>
        <div className="section-line">
          <span className="section-tag-box">Software Engineering & Web</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(webPosts.length > 0 ? webPosts : generalPosts.slice(3, 6)).map((post) => (
            <article
              key={post.slug}
              className="bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-[#ef233c] mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{post.author.name}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. HARDWARE, CHIPS & QUANTUM */}
      <section>
        <div className="section-line">
          <span className="section-tag-box">Hardware, Semiconductors & Quantum</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(hardwarePosts.length > 0 ? hardwarePosts : generalPosts.slice(0, 3)).map((post) => (
            <article
              key={post.slug}
              className="bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-[#ef233c] mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{post.author.name}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
"""

# 9. Dynamic Category Archive Page: src/app/category/[slug]/page.tsx
files["src/app/category/[slug]/page.tsx"] = """import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPostsByCategory } from "@/lib/posts";
import CategoryQuickBar from "@/components/CategoryQuickBar";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const formatted = slug.replace(/-/g, " ").toUpperCase();
  return {
    title: `${formatted} Articles | TechPulse Magazine`,
    description: `Latest news, analysis, and engineering reports on ${formatted}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const allPosts = getAllPosts();
  
  // Find matching posts
  const posts = allPosts.filter(p => {
    const pSlug = p.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return pSlug === slug || p.category.toLowerCase().includes(slug.replace(/-/g, " "));
  });

  const categoryTitle = slug.replace(/-/g, " ").replace(/\\b\\w/g, l => l.toUpperCase());

  return (
    <div className="space-y-8">
      <CategoryQuickBar />

      <div className="section-line">
        <span className="section-tag-box">{categoryTitle}</span>
      </div>

      {posts.length === 0 ? (
        <div className="p-12 text-center bg-[#111827] rounded-lg border border-[#1f293d]">
          <h2 className="text-xl font-bold text-white mb-2">No articles found in this department yet.</h2>
          <p className="text-sm text-[#94a3b8] mb-6">Our automated pipeline will publish articles for this category soon.</p>
          <Link href="/blog" className="px-5 py-2.5 rounded bg-[#c1121e] text-white font-bold text-xs">
            Browse All Articles
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="bg-[#111827] rounded-lg overflow-hidden border border-[#1f293d] hover:border-[#c1121e] transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-black">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-[#ef233c] mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-[#ef233c] transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#94a3b8] line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-[#1f293d] flex items-center justify-between text-[11px] text-[#64748b]">
                  <span>{post.author.name}</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
"""

for path, code in files.items():
    dirname = os.path.dirname(path)
    if dirname:
        os.makedirs(dirname, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(code)
    print(f"Generated: {path}")

print("Magazine components generated successfully!")
