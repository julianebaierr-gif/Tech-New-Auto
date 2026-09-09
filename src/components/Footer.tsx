import Link from "next/link";
import { categories } from "./MainNavbar";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-sm text-slate-400 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-md">
              TP
            </div>
            <div className="font-black text-xl text-white">
              TECH<span className="text-blue-400">PULSE</span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            TechPulse is an independent digital magazine delivering daily investigative reporting, architectural breakdowns, hardware analysis, and global technology insights.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Editorial Channels
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="hover:text-blue-400 transition">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Editorial & Organization
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/authors" className="hover:text-blue-400 transition">Our Authors & Masthead</Link></li>
            <li><Link href="/about" className="hover:text-blue-400 transition">About Our Journal</Link></li>
            <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Newsroom</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Governance & Privacy
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-blue-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} TechPulse Magazine. Published under independent digital editorial guidelines.</p>
        </div>
      </div>
    </footer>
  );
}
