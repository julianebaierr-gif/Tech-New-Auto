import Link from "next/link";
import { getAuthors, getPostsByAuthor } from "@/lib/posts";
import { ArrowRight, BookOpen, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Editorial Authors and Contributors | TechPulse",
  description: "Meet the investigative journalists, systems architects, and research analysts authoring technical reports for TechPulse.",
};

export default function AuthorsIndexPage() {
  const authors = getAuthors();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
          Editorial Masthead
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Authors and Contributors
        </h1>
        <p className="max-w-2xl text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
          Our technical journalism is written by dedicated engineering practitioners and computing analysts with firsthand industry experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authors.map((author) => {
          const authorPosts = getPostsByAuthor(author.slug);
          return (
            <article
              key={author.slug}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="h-20 w-20 rounded-2xl object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition duration-300"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition">
                        <Link href={`/author/${author.slug}`}>{author.name}</Link>
                      </h2>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-blue-600 font-semibold mt-0.5">{author.role}</p>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <BookOpen className="h-3 w-3" /> {authorPosts.length} Published Articles
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {author.bio}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs mt-6">
                <span className="text-slate-500 font-medium">Contributing Tech Writer</span>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                >
                  View Author Profile &amp; Articles <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
