import Link from "next/link";
import { categories } from "./MainNavbar";

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] border-t border-slate-800/80 text-sm text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md">
              TP
            </div>
            <div className="font-black text-xl text-white tracking-tight">
              TECH<span className="text-blue-400">PULSE</span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            TechPulse is an independent digital magazine delivering daily investigative reporting, architectural breakdowns, hardware analysis, and global technology insights.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="text-slate-300 hover:text-white hover:underline transition">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Company & Masthead
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/authors" className="text-slate-300 hover:text-white hover:underline transition">Our Authors & Masthead</Link></li>
            <li><Link href="/about" className="text-slate-300 hover:text-white hover:underline transition">About TechPulse</Link></li>
            <li><Link href="/contact" className="text-slate-300 hover:text-white hover:underline transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Legal & Privacy
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/privacy-policy" className="text-slate-300 hover:text-white hover:underline transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-slate-300 hover:text-white hover:underline transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 bg-[#070d1d]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} TechPulse Magazine. Published under independent digital editorial guidelines.</p>
        </div>
      </div>
    </footer>
  );
}
