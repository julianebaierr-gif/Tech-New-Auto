import Link from "next/link";
import { getSearchIndex } from "@/lib/posts";
import SearchNewsBar from "./SearchNewsBar";

export default function MainHeader() {
  const searchIndex = getSearchIndex();

  return (
    <header className="bg-white border-b border-slate-200 py-4 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group text-center sm:text-left">
          {/* Custom Com Pors Official CP Logo Badge */}
          <div className="relative h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl overflow-hidden shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0 bg-[#060b18] border border-blue-500/30 flex items-center justify-center p-1 sm:p-1.5">
            <img
              src="/logo-icon.png"
              alt="Com Pors Official Logo"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
          
          <div>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                COM<span className="text-blue-600">PORS</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                TECH
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5 line-clamp-1 sm:line-clamp-none">
              Systems Architecture &bull; Artificial Intelligence &bull; Computing Frontiers
            </p>
          </div>
        </Link>

        {/* Right Action: Search News input */}
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end">
          <SearchNewsBar posts={searchIndex} />
        </div>
      </div>
    </header>
  );
}
