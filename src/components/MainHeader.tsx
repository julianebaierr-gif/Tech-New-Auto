import Link from "next/link";
import { Send, Search } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="bg-white border-b border-slate-200 py-4 sm:py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 sm:gap-6">
        <Link href="/" className="flex items-center gap-3 sm:gap-3.5 group text-center sm:text-left">
          {/* Futuristic Tech Geometric Logo Badge */}
          <div className="relative h-11 w-11 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 p-[2px] shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform duration-300 shrink-0">
            <div className="w-full h-full bg-slate-900 rounded-[10px] sm:rounded-[14px] flex items-center justify-center p-2 sm:p-2.5">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <path d="M8 20L15 12H28L22 20L28 28H15L8 20Z" fill="url(#grad1)" />
                <circle cx="28" cy="20" r="4" fill="#38bdf8" />
                <defs>
                  <linearGradient id="grad1" x1="8" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#6366f1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          
          <div>
            <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900">
                TECH<span className="text-blue-600">PULSE</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                MAGAZINE
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-medium tracking-wide mt-0.5 line-clamp-1 sm:line-clamp-none">
              Independent Tech Journalism &bull; Computing Frontiers &bull; Deep Engineering Insights
            </p>
          </div>
        </Link>

        {/* Right Action Callouts */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/contact"
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-[11px] sm:text-xs font-bold transition shadow-xs active:scale-95"
          >
            <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" /> Submit Story / News Tip
          </Link>
        </div>
      </div>
    </header>
  );
}
