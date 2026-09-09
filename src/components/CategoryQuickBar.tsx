import Link from "next/link";
import { categories } from "./MainNavbar";

export default function CategoryQuickBar() {
  return (
    <div className="flex flex-wrap items-center gap-2 py-4 mb-8 border-b border-slate-200">
      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">Hot Channels:</span>
      {categories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/category/${cat.slug}`}
          className="text-xs px-3.5 py-1.5 rounded-full bg-white hover:bg-blue-600 hover:text-white text-slate-700 border border-slate-200 shadow-xs hover:shadow transition font-medium flex items-center gap-1.5"
        >
          <span>{cat.emoji}</span>
          <span>{cat.name}</span>
        </Link>
      ))}
      <Link
        href="/blog"
        className="text-xs px-3.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold transition flex items-center gap-1 shadow-xs"
      >
        ✨ All Stories
      </Link>
    </div>
  );
}
