import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

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

      {/* 1. LATEST STORIES (Pattern A: Big Lead Feature + Side Stories) */}
      <section>
        <div className="section-line">
          <span className="section-tag-box">Latest Stories</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Big Lead Article */}
          {leadPost && (
            <article className="lg:col-span-7 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group">
              <div className="h-72 sm:h-96 relative overflow-hidden bg-slate-100">
                <img
                  src={leadPost.coverImage}
                  alt={leadPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
                  {leadPost.category} &bull; Editorial Lead Feature
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-blue-600 transition leading-snug mb-3">
                  <Link href={`/blog/${leadPost.slug}`}>{leadPost.title}</Link>
                </h2>
                {(() => {
                  const content = leadPost.content || "";
                  const pMatch = content.match(/<p>([\s\S]*?)<\/p>/);
                  const rawText = pMatch
                    ? pMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
                    : content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
                  const sentences = rawText.split(/\.\s+/);
                  let leadSnippet = "";
                  if (sentences.length >= 2) {
                    leadSnippet = `${sentences[0]}. ${sentences[1].replace(/\.+$/, "")}.`;
                  } else if (sentences.length === 1 && sentences[0]) {
                    leadSnippet = `${sentences[0].replace(/\.+$/, "")}.`;
                  } else {
                    leadSnippet = leadPost.excerpt;
                  }

                  return (
                    <div className="space-y-3 mb-6">
                      <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
                        {leadPost.excerpt}
                      </p>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-l-2 border-blue-500 pl-3">
                        {leadSnippet}
                      </p>
                    </div>
                  );
                })()}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 text-xs text-slate-500">
                  <span>By <strong className="text-slate-800">{leadPost.author.name}</strong></span>
                  <span>{leadPost.date}</span>
                </div>
              </div>
            </article>
          )}

          {/* Mini Side List */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {sideArticles.map((post) => (
              <article
                key={post.slug}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition flex items-center gap-4 group"
              >
                <div className="w-24 h-20 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-bold uppercase text-blue-600 block mb-1">
                    {post.category}
                  </span>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-1">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <span className="text-[11px] text-slate-400">{post.date}</span>
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
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-blue-600 mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{post.author.name}</span>
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
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-blue-600 mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{post.author.name}</span>
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
              className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-lg transition flex flex-col group"
            >
              <div className="h-48 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <span className="text-[11px] font-bold uppercase text-blue-600 mb-2">
                  {post.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition line-clamp-2 leading-snug mb-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4 flex-1">
                  {post.excerpt}
                </p>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">{post.author.name}</span>
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
