import Link from "next/link";
import { getAuthors, getPostsByAuthor } from "@/lib/posts";
import { ArrowRight, BookOpen, ShieldCheck, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Editorial Masthead & Authors | Com Pors", // 39 chars
  description: "Meet the verified system architects and artificial intelligence analysts authoring technical evaluations for Com Pors.", // 119 chars
  alternates: {
    canonical: "https://www.compors.com/authors/",
  },
};

export default function AuthorsIndexPage() {
  const authors = getAuthors();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          <ShieldCheck className="h-3.5 w-3.5" /> Editorial Transparency &amp; E-E-A-T
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Editorial Masthead &amp; Authors
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
          At Com Pors, every technical guide, software benchmark, and architectural review is authored by seasoned practitioners with demonstrable engineering and research experience.
        </p>
      </div>

      {/* Author Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authors.map((author) => {
          const authorPosts = getPostsByAuthor(author.slug);
          return (
            <article
              key={author.slug}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    width={96}
                    height={96}
                    className="h-20 w-20 sm:h-24 sm:w-24 min-w-[5rem] sm:min-w-[6rem] aspect-square rounded-2xl object-cover shrink-0 border-2 border-slate-100 group-hover:scale-105 transition duration-300 shadow-xs"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition">
                        <Link href={`/author/${author.slug}`}>{author.name}</Link>
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Editorial Staff
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-600">{author.role}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <BookOpen className="h-3.5 w-3.5 text-blue-600" /> {authorPosts.length} Articles
                      </span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                        Technical Editorial
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {author.bio}
                </p>

                {/* Expertise Badges */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Core Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {author.slug === "cora-lee" ? (
                      <>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Distributed Systems</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Linux Kernels</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Zero-Trust Cloud</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Frontier AI &amp; LLMs</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Neuromorphic Silicon</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Quantum Hardware</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs mt-6">
                <span className="text-slate-500 font-medium">Full Editorial Profile</span>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                >
                  Read Authored Guides <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
