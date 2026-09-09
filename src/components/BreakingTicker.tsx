import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { Zap } from "lucide-react";

export default function BreakingTicker() {
  const posts = getAllPosts().slice(0, 10);

  return (
    <div className="bg-slate-100 border-b border-slate-200 py-2 px-4 sm:px-6 lg:px-8 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        <div className="flex items-center gap-1.5 bg-blue-600 text-white px-2.5 py-1 rounded font-extrabold text-[11px] tracking-wider whitespace-nowrap shadow-xs z-10 shrink-0">
          <Zap className="h-3 w-3 fill-current" />
          FLASH DISPATCH
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="animate-ticker flex items-center gap-8 text-slate-600">
            {[...posts, ...posts].map((post, idx) => (
              <Link
                key={`${post.slug}-${idx}`}
                href={`/${post.slug}`}
                className="hover:text-blue-600 transition inline-flex items-center gap-2 font-medium shrink-0"
              >
                <span className="text-blue-500 font-bold text-sm">&bull;</span>
                <span className="text-slate-800 hover:text-blue-600">{post.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
