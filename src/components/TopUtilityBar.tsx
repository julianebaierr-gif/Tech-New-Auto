import Link from "next/link";
import { ShieldCheck, Flame, Compass } from "lucide-react";

export default function TopUtilityBar() {
  return (
    <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Compass className="h-3.5 w-3.5 text-cyan-400" />
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          <span className="text-slate-600 hidden sm:inline">&bull;</span>
          <span className="hidden sm:inline-flex items-center gap-1 text-cyan-400 font-semibold">
            <Flame className="h-3.5 w-3.5 text-amber-400" /> Trending: Next-Gen Computing & Silicon Architecture
          </span>
        </div>
        <nav className="flex items-center gap-4 text-xs font-medium text-slate-300">
          <Link href="/about" className="hover:text-cyan-400 transition">About Journal</Link>
          <Link href="/about" className="hover:text-cyan-400 transition">Editorial Board</Link>
          <Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy</Link>
          <Link href="/contact" className="hover:text-cyan-400 transition">Submit Story</Link>
        </nav>
      </div>
    </div>
  );
}
