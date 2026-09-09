import Link from "next/link";
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
