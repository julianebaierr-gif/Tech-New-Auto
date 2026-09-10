import Link from "next/link";
import { Flame, Compass } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export default function TopUtilityBar() {
  const posts = getAllPosts();
  const trendingPost = posts.length > 0 ? posts[0] : null;

  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex items-center gap-1.5 font-medium text-slate-300 shrink-0">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {trendingPost && (
            <>
              <span className="text-slate-600 hidden sm:inline shrink-0">&bull;</span>
              <div className="hidden sm:inline-flex items-center gap-1.5 text-slate-300 overflow-hidden text-ellipsis whitespace-nowrap">
                <span className="inline-flex items-center gap-1 text-amber-400 font-bold uppercase text-[10px] tracking-wider shrink-0">
                  <Flame className="h-3.5 w-3.5 fill-current" /> Trending:
                </span>
                <Link
                  href={`/${trendingPost.slug}`}
                  className="text-cyan-400 hover:text-cyan-300 font-medium hover:underline transition truncate max-w-[400px] inline-block"
                  title={trendingPost.title}
                >
                  {trendingPost.title}
                </Link>
              </div>
            </>
          )}
        </div>
        <nav className="flex items-center gap-4 text-xs font-medium text-slate-300 shrink-0">
          <Link href="/about" className="hover:text-cyan-400 transition">About</Link>
          <Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
