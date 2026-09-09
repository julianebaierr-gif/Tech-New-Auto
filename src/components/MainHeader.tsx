import Link from "next/link";
import { Send, Search } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="bg-white border-b border-slate-200 py-6 px-4 sm:px-6 lg:px-8 shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3.5 group">
          {/* Unique Futuristic Tech Geometric Logo Badge */}
          <div className="relative h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 p-[2px] shadow-md shadow-blue-500/15 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center p-2.5">
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
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                TECH<span className="text-blue-600">PULSE</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                MAGAZINE
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium tracking-wide mt-0.5">
              Autonomous Tech Dispatch &bull; Emerging AI &bull; Cloud & Silicon Engineering
            </p>
          </div>
        </Link>

        {/* Right Action Callouts */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-bold transition shadow-xs"
          >
            <Send className="h-3.5 w-3.5" /> Submit Story / News Tip
          </Link>
          <Link
            href="/blog"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold transition shadow-xs"
          >
            Explore All
          </Link>
        </div>
      </div>
    </header>
  );
}
