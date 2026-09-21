import Link from "next/link";
import { categories } from "@/lib/categories";

export default function Footer() {
  return (
    <footer className="bg-[#0b1329] border-t border-slate-800/80 text-sm text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl overflow-hidden bg-[#060b18] border border-blue-500/30 flex items-center justify-center p-1 shadow-md shadow-blue-500/20">
              <img
                src="/logo-icon.png"
                alt="Com Pors Official Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="font-black text-xl text-white tracking-tight">
              COM <span className="text-blue-400">PORS</span>
            </div>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed">
            Com Pors is an independent digital magazine delivering daily investigative reporting, architectural breakdowns, hardware analysis, and global technology insights.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Categories
          </h4>
          <ul className="space-y-2.5 text-xs">
            {categories.slice(0, 6).map((cat) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}/`} className="text-slate-300 hover:text-white hover:underline transition">
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
            <li><Link href="/authors/" className="text-slate-300 hover:text-white hover:underline transition">Our Authors & Masthead</Link></li>
            <li><Link href="/about/" className="text-slate-300 hover:text-white hover:underline transition">About Com Pors</Link></li>
            <li><Link href="/contact/" className="text-slate-300 hover:text-white hover:underline transition">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
            Legal & Privacy
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="/privacy-policy/" className="text-slate-300 hover:text-white hover:underline transition">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="text-slate-300 hover:text-white hover:underline transition">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Editorial Scope, Systems Architecture & Independent Publishing Manifesto */}
      <div className="border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-400 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
          <span className="font-bold uppercase tracking-wider text-slate-300">
            Editorial Scope, Systems Architecture &amp; Independent Publishing Manifesto
          </span>
          <span className="text-slate-500 font-mono text-[11px]">
            Com Pors Global Computing Newsroom &bull; Verified Research Standards
          </span>
        </div>
        <p className="leading-relaxed">
          Com Pors publishes daily investigative engineering intelligence, technical architecture breakdowns, and empirical computing benchmarks. Our editorial coverage examines microprocessors, silicon fabrication nodes, high-bandwidth interconnects, cloud-native distributed systems, Linux kernel scheduling internals, and cryptographic security protocols. We reject superficial promotional claims, sponsored advertorial placements, and unverified vendor summaries in favor of reproducible laboratory evaluations, open-source code analysis, and peer-reviewed technical publications.
        </p>
        <p className="leading-relaxed">
          All technical analyses and benchmarks adhere to strict investigative guidelines established by the Society of Professional Journalists and Association for Computing Machinery. Hardware teardowns measure sustained instruction throughput, thermal dissipation envelopes, and bus saturation using isolated bare-metal testbenches. Contributing authors maintain verifiable industrial engineering experience, disclose all potential conflicts of interest, and publish transparent corrections through our open errata registry within 24 business hours.
        </p>
        <p className="leading-relaxed">
          Our newsroom infrastructure operates across geographically distributed edge nodes, ensuring rapid access to our research repository worldwide. Technical diagrams, architectural benchmarks, and data schemas published by Com Pors may be referenced in academic computer science research, engineering dissertations, and technical training curricula with standard attribution. We continuously monitor open vulnerability disclosures (CVEs), IETF RFC standardizations, and upstream Linux kernel changes to keep our technical documentation accurate and evergreen.
        </p>
        <p className="leading-relaxed">
          Data integrity and reproducible methodology govern all published software benchmarks. Test rigs utilize automated telemetry collection, hardware performance counters, and kernel tracepoints to record memory bandwidth, cache misses, context switch frequencies, and network socket buffer exhaustion. Readers can inspect our methodology documentation to replicate findings on their own infrastructure, ensuring absolute parity between lab conditions and production environments.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
            <span>Verified Editorial Masthead: Cora Lee (Lead Systems Architect) &amp; Kellie Anne (Principal AI Analyst)</span>
          </div>
          <span>Published under independent digital editorial guidelines &bull; All technical content peer-reviewed</span>
        </div>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 bg-[#070d1d]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Com Pors. Published under independent digital editorial guidelines.</p>
        </div>
      </div>
    </footer>
  );
}
