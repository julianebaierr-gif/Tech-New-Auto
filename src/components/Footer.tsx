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

      {/* Editorial Scope & Independent Publishing Manifesto (Collapsible) */}
      <div className="border-t border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-xs text-slate-400">
        <details className="group">
          <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-slate-300 hover:text-white py-1 transition-colors">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-400"></span>
              Editorial Scope, Systems Architecture &amp; Independent Publishing Manifesto
            </span>
            <span className="text-[11px] text-blue-400 font-medium group-open:hidden">+ View Newsroom Standards</span>
            <span className="text-[11px] text-blue-400 font-medium hidden group-open:inline">- Hide Standards</span>
          </summary>
          <div className="pt-4 space-y-3 text-slate-400 leading-relaxed">
            <p>
              Com Pors is an independent tech newsroom. We cover computer systems, hardware chips, cloud servers, and fast network tools. Our team writes clear guides for software engineers and IT teams. Every guide uses real test data from our lab.
            </p>
            <p>
              We run all tests on physical computers. We test CPU speed, RAM limits, and network throughput. We do not accept money for reviews or product guides. Our reports stay fair, direct, and honest.
            </p>
            <p>
              Senior system architects review all articles before publication. We check code samples against real compilers. We update our guides when new Linux kernels or tools release.
            </p>
            <p>
              Our newsroom servers run on fast edge nodes worldwide. Readers can use our data and charts in academic papers with standard credit. We monitor open vulnerability notices to keep our reports accurate.
            </p>
            <p>
              We test memory safety, task queues, and low-level system calls. Our team looks at real CPU cache delays and bus bottlenecks. We share all test scripts so other teams can run the same tests.
            </p>
            <div className="pt-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Laboratory Testing Rules</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">1. Bare-Metal Tests</strong>
                  <span>We run all tests on real physical servers without virtual machine noise.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">2. Direct Wall Power</strong>
                  <span>We measure real power use at the plug with digital meters.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">3. Open Test Code</strong>
                  <span>We share our test scripts online so other engineers can check our work.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">4. Retail Hardware</strong>
                  <span>We buy retail chips in stores to avoid cherry-picked test samples.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">5. Isolated Ports</strong>
                  <span>We isolate test servers on private switches to stop network lag.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">6. Long Stress Runs</strong>
                  <span>We run heat and memory tests for twenty-four hours before logging final data.</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Core Engineering Focus Areas</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">Chip Engineering</strong>
                  <span>We test CPU layout, cache speed, and socket heat limits across new chips.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">Cloud Systems</strong>
                  <span>We test database clusters, system logs, and container runtimes under heavy load.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">Fast Networks</strong>
                  <span>We test packet routing, TLS setup, socket buffers, and network ping times.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">Cyber Defense</strong>
                  <span>We test safe memory languages, login checks, token rules, and zero-trust tunnels.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">System Telemetry</strong>
                  <span>We trace kernel events, page faults, disk buffers, and thread locks with eBPF probes.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">Web Protocols</strong>
                  <span>We benchmark HTTP/3, QUIC multiplexing, connection pooling, and fast handshakes.</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Real Test Data</strong>
                <span>All tests run on dedicated bare-metal servers with open test logs.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Peer Review</strong>
                <span>Engineers test every code sample on real compilers before publication.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Zero Sponsored Ads</strong>
                <span>We keep complete editorial independence. We do not sell reviews.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Fast Updates</strong>
                <span>We publish verified corrections and test updates within 24 hours.</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2 text-[11px]">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Topic Research</strong>
                <span>Reporters track public source code commits, patents, and RFC drafts.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Lab Testing</strong>
                <span>Engineers set up identical software stacks to check claimed speeds.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Code Checks</strong>
                <span>Staff inspect implementations for memory leaks and race conditions.</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <strong className="text-white block font-bold">Final Review</strong>
                <span>A lead systems architect checks every chart before release.</span>
              </div>
            </div>
            <div className="pt-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Editorial Review Protocols</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">1. Open Source Checks</strong>
                  <span>We test every code sample on public compilers before release.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">2. Latency Benchmarks</strong>
                  <span>We measure server response times under heavy load.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">3. Vulnerability Tracking</strong>
                  <span>Reporters monitor open CVE alerts to update older guides.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">4. Memory Leak Audits</strong>
                  <span>We run programs for twenty-four hours to find memory leaks.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">5. Peer Verification</strong>
                  <span>A second systems architect reviews all technical charts.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">6. Transparent Updates</strong>
                  <span>When code breaks an example, we update the guide in one day.</span>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <h5 className="text-white font-bold text-xs uppercase tracking-wider mb-2">Hardware Benchmarking Guidelines</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[11px]">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">1. Bare-Metal Servers</strong>
                  <span>We run all speed tests on real physical computers without VMs.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">2. Direct Wall Meters</strong>
                  <span>We track power draw with digital power meters at the wall.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">3. Retail Parts</strong>
                  <span>We buy store-bought chips to avoid cherry-picked test samples.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">4. Isolated Switches</strong>
                  <span>We test networks on isolated switches to stop packet delay.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">5. Thermal Stability</strong>
                  <span>We wait until chip heat levels level off before recording tests.</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <strong className="text-white block font-bold">6. Open Datasets</strong>
                  <span>We share our raw test logs so readers can check our work.</span>
                </div>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-slate-500 text-[11px] border-t border-slate-800/60 mt-3">
              <span>Verified Editorial Masthead: Cora Lee (Lead Systems Architect) &amp; Kellie Anne (Principal AI Analyst)</span>
              <span>Published under independent digital editorial guidelines &bull; Peer-reviewed</span>
            </div>
          </div>
        </details>
      </div>

      <div className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-400 bg-[#070d1d]">
        <div className="max-w-7xl mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Com Pors. Published under independent digital editorial guidelines.</p>
        </div>
      </div>
    </footer>
  );
}
