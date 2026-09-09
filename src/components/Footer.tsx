import Link from "next/link";
import { Cpu, GitBranch } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg text-white">
            <div className="h-7 w-7 rounded-md bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white">
              <Cpu className="h-4 w-4" />
            </div>
            <span>Tech<span className="text-cyan-400">Pulse</span></span>
          </div>
          <p className="text-xs text-neutral-400 leading-relaxed">
            Next-generation automated technology journal. Curated by Gemini AI, synced with live Google Sheets, and scheduled with GitHub Actions every 4 hours.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Explore</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/blog" className="hover:text-cyan-400 transition">All Articles</Link></li>
            <li><Link href="/about" className="hover:text-cyan-400 transition">About Our AI Pipeline</Link></li>
            <li><Link href="/contact" className="hover:text-cyan-400 transition">Editorial Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Legal & Compliance</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</Link></li>
            <li><Link href="/terms" className="hover:text-cyan-400 transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 text-xs uppercase tracking-wider">Autonomous Engine</h3>
          <p className="text-xs text-neutral-400 mb-3">
            Connected to Google Sheets, Unsplash API, Gemini AI, and deployed on Vercel.
          </p>
          <div className="flex items-center gap-3 text-neutral-400">
            <a href="https://github.com/julianebaierr-gif/Tech-New-Auto" target="_blank" rel="noreferrer" className="hover:text-cyan-400 p-2 bg-neutral-900 rounded-lg border border-neutral-800 transition">
              <GitBranch className="h-4 w-4" />
            </a>
            <div className="p-2 bg-neutral-900 rounded-lg border border-neutral-800 text-cyan-400 text-xs font-mono">
              4-Hour Sync
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-900 py-6 text-center text-xs text-neutral-500">
        <p>&copy; {new Date().getFullYear()} TechPulse Autonomous Media. All rights reserved.</p>
      </div>
    </footer>
  );
}
