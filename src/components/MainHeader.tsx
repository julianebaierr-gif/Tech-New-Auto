import Link from "next/link";
import { getSearchIndex } from "@/lib/posts";
import SearchNewsBar from "./SearchNewsBar";

export default function MainHeader() {
  const searchIndex = getSearchIndex();

  return (
    <header className="bg-white border-b border-slate-200 py-4 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group text-center sm:text-left">
          {/* Custom Com Pors Modern Tech Hex/C-P Geometric Logo Badge */}
          <div className="relative h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-400 p-[2px] shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center p-2 sm:p-2.5">
              <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                {/* Modern stylized C and P interlocking tech architecture mark */}
                <path d="M22 6L36 14V30L22 38L8 30V14L22 6Z" stroke="url(#comporsGrad)" strokeWidth="2.5" strokeLinejoin="round" />
                <path d="M15 16C15 16 23 13 27 17C31 21 27 26 21 26H15V32" stroke="#38bdf8" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="22" cy="21" r="2.5" fill="#60a5fa" />
                <defs>
                  <linearGradient id="comporsGrad" x1="8" y1="6" x2="36" y2="38" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="0.5" stopColor="#6366f1" />
                    <stop offset="1" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
