import Link from "next/link";
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
