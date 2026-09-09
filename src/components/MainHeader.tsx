import Link from "next/link";
import { Mail } from "lucide-react";

export default function MainHeader() {
  return (
    <header className="bg-[#0b0f19] border-b border-[#1f293d] py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-4 group">
          {/* Creative Logo Badge matching GenAlpha style */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-[#780000] via-[#c1121e] to-[#ef233c] p-1 shadow-lg shadow-red-900/30 flex items-center justify-center text-white border-2 border-[#f59e0b]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-12 h-12">
              <circle cx="50" cy="50" r="45" fill="#111827" />
              <polygon points="50,20 80,45 68,80 32,80 20,45" fill="#c1121e" stroke="#f59e0b" strokeWidth="2" />
              <text x="50" y="58" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="24" fontFamily="Arial">TP</text>
            </svg>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-none">
              <span>TECH</span>
              <span className="text-[#ef233c]">PULSE</span>
              <span className="text-[#f59e0b] ml-1">MAGAZINE</span>
            </div>
            <p className="text-xs sm:text-sm text-[#94a3b8] font-medium tracking-wide mt-1">
              Global Technology &bull; Artificial Intelligence &bull; Computing Frontiers
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="flex items-center gap-2 px-4 py-2 rounded bg-[#161f30] hover:bg-[#1f2b42] border border-[#2b3a55] text-white text-xs font-semibold transition"
          >
            <Mail className="h-3.5 w-3.5 text-[#ef233c]" /> News Tip / Press Release
          </Link>
        </div>
      </div>
    </header>
  );
}
