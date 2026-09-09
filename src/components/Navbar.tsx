import Link from "next/link";
import { Cpu, BookOpen, Info, Mail, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-white hover:text-cyan-400 transition-colors">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Cpu className="h-5 w-5" />
          </div>
          <span>Tech<span className="text-cyan-400">Pulse</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-300">
          <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
          <Link href="/blog" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <BookOpen className="h-4 w-4" /> Articles
          </Link>
          <Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Info className="h-4 w-4" /> About Us
          </Link>
          <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
            <Mail className="h-4 w-4" /> Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-cyan-400 transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-cyan-400 transition-colors">Terms</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/blog"
            className="text-xs font-semibold px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition shadow-md shadow-cyan-500/25 flex items-center gap-1.5"
          >
            <Sparkles className="h-3.5 w-3.5" /> Explore
          </Link>
        </div>
      </div>
    </header>
  );
}
