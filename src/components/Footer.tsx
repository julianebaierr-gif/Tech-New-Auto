import Link from "next/link";
import { categories } from "./MainNavbar";

export default function Footer() {
  return (
    <footer className="bg-[#070a12] border-t border-[#1f293d] text-sm text-[#94a3b8] mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#c1121e] p-1 flex items-center justify-center text-white font-bold border border-[#f59e0b]">
              TP
            </div>
            <div className="font-black text-xl text-white">
              TECH<span className="text-[#ef233c]">PULSE</span>
            </div>
          </Link>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            TechPulse Magazine is an independent publication delivering comprehensive reporting on modern engineering, computing infrastructure, semiconductors, AI breakthroughs, and digital culture.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Categories
          </h4>
          <ul className="space-y-2 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`} className="hover:text-[#ef233c] transition">
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Editorial & Policy
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/about" className="hover:text-[#ef233c] transition">About Our Journal</Link></li>
            <li><Link href="/about" className="hover:text-[#ef233c] transition">Editorial Standards</Link></li>
            <li><Link href="/contact" className="hover:text-[#ef233c] transition">News Tips & Submissions</Link></li>
            <li><Link href="/contact" className="hover:text-[#ef233c] transition">Press Office</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-[#1f293d] pb-2">
            Legal & Compliance
          </h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-[#ef233c] transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-[#ef233c] transition">Terms & Conditions</Link></li>
            <li><span className="text-[#64748b]">DMCA Guidelines</span></li>
            <li><span className="text-[#64748b]">Code of Ethics</span></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#172033] py-6 text-center text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} TechPulse Magazine. All rights reserved. Operating under independent editorial governance.</p>
        </div>
      </div>
    </footer>
  );
}
