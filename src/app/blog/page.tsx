import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";

export const metadata = {
  title: {
    absolute: "All Articles & Research | Com Pors",
  },
  description: "Browse the complete archive of technical analyses, computing benchmarks, and engineering breakdowns published by Com Pors.",
  alternates: {
    canonical: "https://www.compors.com/blog/",
  },
  openGraph: {
    title: "All Articles & Research | Com Pors",
    description: "Browse the complete archive of technical analyses, computing benchmarks, and engineering breakdowns published by Com Pors.",
    url: "https://www.compors.com/blog/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "All Articles & Research | Com Pors",
      },
    ],
  },
};

export default function BlogListPage() {
  const posts = getAllPosts();
  const featuredPosts = posts.slice(0, 6);
  const archivePosts = posts.slice(6);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Magazine Editorial Masthead */}
      <div className="border-b border-slate-200 pb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
              Dispatch &bull; The Complete Archive
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Com Pors Newsroom &amp; Technical Archive
            </h1>
          </div>
          <p className="max-w-md text-sm text-slate-500 leading-relaxed">
            Investigative reports, system teardowns, and engineering perspectives across global computing.
          </p>
        </div>

        {/* Editorial Archive & Systems Engineering Index Guide (Collapsible) */}
        <div className="sr-only">
          <details className="group">
          <summary className="cursor-pointer list-none flex items-center justify-between font-bold text-slate-900 hover:text-blue-600 transition">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600"></span>
              Systems Engineering Index &amp; Research Repository
            </span>
            <span className="text-xs font-semibold text-blue-600 group-open:hidden">+ View Details</span>
            <span className="text-xs font-semibold text-slate-500 hidden group-open:inline">- Hide Details</span>
          </summary>
          <div className="pt-4 space-y-3 text-xs sm:text-sm text-slate-600">
            <p>
              Welcome to the Com Pors archive. Every report covers computer systems, chips, and fast networks. Our team writes clear guides based on real hardware tests.
            </p>
            <p>
              We re-test articles when new Linux tools come out. We keep open test logs so engineers can check our work on their own machines.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Systems &amp; Kernels</strong>
                <span>Memory allocators, task queues, and Linux kernel limits.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Hardware &amp; Chips</strong>
                <span>Silicon dies, memory bus width, and chip cache speed.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Network &amp; Security</strong>
                <span>TLS setups, secure tunnels, and fast packet routing tests.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Cloud &amp; Databases</strong>
                <span>Server clusters, data consensus, and distributed storage.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Tool Benchmarks</strong>
                <span>Real speed tests comparing compilers, engines, and runtimes.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="block text-slate-900 font-bold">Telemetry Probes</strong>
                <span>eBPF monitoring, memory leak checks, and thread lock detection.</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Topic Search</strong>
                <span>Use categories to find guides by engineering field.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Code Repos</strong>
                <span>Each guide links to code for open test runs.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Lab Badges</strong>
                <span>Look for lab marks on deep hardware tests.</span>
              </div>
              <div className="p-3 rounded-lg bg-white border border-slate-200">
                <strong className="text-slate-900 block font-bold mb-0.5">Fresh Posts</strong>
                <span>Articles are sorted from newest to oldest.</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Repository Topic Taxonomies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">1. Chips</strong>
                  <span>We test CPU dies, cache speed, and socket heat limits. Our reports show true chip speed.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">2. Kernels</strong>
                  <span>We trace Linux task queues, disk buffers, and thread speeds. We check memory safety under load.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">3. Cloud</strong>
                  <span>We test server clusters, data consensus, and network delay. We show how to stop server crashes.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">4. Networks</strong>
                  <span>We test HTTP/3 and QUIC over busy internet links. We measure round-trip ping times.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">5. Defense</strong>
                  <span>We test zero-trust tunnels, key rotation, and memory safety. We show how to stop security breaches.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">6. Model Speed</strong>
                  <span>We test token speed on server hardware. We track memory pressure under heavy load.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">7. Metrics</strong>
                  <span>We track latency spikes, page faults, and thread contention with eBPF probes.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">8. Edge Systems</strong>
                  <span>We test serverless workers, edge caches, and global request routing.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">9. Databases</strong>
                  <span>We test write buffers, database clusters, and quorum rules during network splits.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">10. Compilers</strong>
                  <span>We test compiler flags across LLVM, GCC, and Go. We measure real binary size savings.</span>
                </div>
              </div>
            </div>
          </div>
        </details>
        </div>
      </div>

      {/* Featured Technical Dispatches */}
      <section className="space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          Recent Technical Dispatches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredPosts.map((post) => (
            <article
              key={post.slug}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:border-blue-400 hover:shadow-xl transition duration-300"
            >
              <div className="h-52 relative overflow-hidden bg-slate-100">
                <img
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  width={600}
                  height={350}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 text-xs font-bold uppercase px-2.5 py-1 rounded bg-white/90 text-blue-700 backdrop-blur-md shadow-xs">
                  {post.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                  <span>{post.date}</span>
                  <span>&bull;</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-bold text-xl text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 mb-3">
                  <Link href={`/${post.slug}/`}>{post.title}</Link>
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-xs">
                  <span className="text-slate-700 font-semibold">{post.author.name}</span>
                  <Link
                    href={`/${post.slug}/`}
                    className="text-blue-600 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                  >
                    Full Story &rarr;
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Comprehensive Historical Engineering Archive Index */}
      {archivePosts.length > 0 && (
        <section className="border-t border-slate-200 pt-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Complete Historical Repository
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Architectural Reports &amp; Computing Case Studies
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              Showing all {posts.length} published technical dispatches
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivePosts.map((post) => (
              <article
                key={post.slug}
                className="p-5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold uppercase text-blue-600 text-[11px]">{post.category}</span>
                    <span>{post.date} &bull; {post.readTime}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition leading-snug mb-2">
                    <Link href={`/${post.slug}/`}>{post.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 font-medium">{post.author.name}</span>
                  <Link
                    href={`/${post.slug}/`}
                    className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform"
                  >
                    Read Analysis &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* Newsroom Archival Methodology & Research Framework (Collapsible) */}
      <section className="sr-only">
        <details className="group">
          <summary className="cursor-pointer list-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Newsroom Archive Standards &bull; Peer Review
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                Archival Standards &amp; Technical Research Tracks
              </h2>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg group-open:hidden self-start sm:self-auto">
              + View Standards &amp; Tracks
            </span>
            <span className="text-xs font-bold text-slate-600 bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg hidden group-open:inline self-start sm:self-auto">
              - Hide Standards
            </span>
          </summary>

          <div className="pt-8 space-y-6 border-t border-slate-200 mt-6 text-slate-600 text-xs sm:text-sm leading-relaxed">
            <p>
              Every article passes review before publication. Engineers test code samples against open web standards.
            </p>
            <p>
              We keep full independence. We do not take paid article spots or vendor money. Our tool tests and chip guides stay fair and honest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">Real Benchmarks</strong>
                <span>All speed and latency numbers are tested on physical hardware.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">Living Docs</strong>
                <span>Guides are updated with notes when software rules change.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">Zero Paid Reviews</strong>
                <span>We keep complete independence across all tool tests.</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                <strong className="text-slate-900 block font-bold">Peer Reviewed</strong>
                <span>Senior architects check every guide before publishing.</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Research Disciplines</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Kernel Tools</strong>
                  <span>We trace Linux task queues, disk buffers, and thread speeds.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Silicon Chips</strong>
                  <span>We check chip size, memory bus width, and hardware delay.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Distributed Data</strong>
                  <span>We test database clustering, backup rules, and server failover.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">System Defense</strong>
                  <span>We check secure web keys, login tokens, and memory safety.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Edge Systems</strong>
                  <span>We test serverless runtimes and fast delivery networks.</span>
                </div>
                <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Web Transport</strong>
                  <span>We benchmark QUIC handshakes, TLS resumption, and socket queues.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Archival Review Steps</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">1. Lab Tests</strong>
                  <span>Engineers test hardware on bare-metal test machines.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">2. Code Audit</strong>
                  <span>Staff review code samples for safety, thread leaks, and bugs.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">3. Editorial Check</strong>
                  <span>Senior editors review writing for clarity and simplicity.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">4. Fast Publish</strong>
                  <span>The finished report goes live on our global edge network.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">5. Re-Test</strong>
                  <span>We re-run benchmarks when major software versions release.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Archival Caching, Version Control &amp; Errata Policy</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">1. Version Tracking</strong>
                  <span>Every guide links to code revisions in our public repository.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">2. Fresh Tests</strong>
                  <span>We re-run benchmarks when major software versions release.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">3. Open Test Code</strong>
                  <span>We share test shell scripts for every hardware review.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">4. Fast Errata</strong>
                  <span>Readers report bugs, and we post fixes within 24 hours.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">5. Data Quotes</strong>
                  <span>Researchers can cite our benchmark data in their papers.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">6. Edge Delivery</strong>
                  <span>Our newsroom pages load fast on edge servers worldwide.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">7. Living Docs</strong>
                  <span>Guides get updates whenever software standards change.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">8. Zero Sponsored Ads</strong>
                  <span>We do not accept vendor money or paid review spots.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">9. Peer Review</strong>
                  <span>Senior system architects test all code before release.</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">10. Free Access</strong>
                  <span>All technical teardowns remain open without paywalls.</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 space-y-3 text-xs text-slate-600">
              <h3 className="text-sm font-bold text-slate-900">Repository Archival Policies &amp; Engineering Governance</h3>
              <p>
                The Com Pors technical repository preserves full version history for all published engineering blueprints, benchmark results, and system teardowns. We treat every technical article as an evolving document. When underlying software libraries, runtime dependencies, or hardware components receive updates, our editorial newsroom audits the original claims.
              </p>
              <p>
                Our laboratory benchmarks evaluate real performance metrics on dedicated bare-metal hardware. We capture raw CPU utilization, memory allocations, and network latency traces during stress testing. We never rely on synthetic vendor benchmarks or promotional presentations.
              </p>
              <p>
                All published code snippets undergo verification against current compiler versions and runtime environments. We check for memory safety vulnerabilities, race conditions, and unhandled exceptions. Each code listing includes comprehensive annotations explaining execution paths and boundary conditions.
              </p>
              <p>
                Our editorial newsroom adheres to strict conflict-of-interest policies. Contributing analysts do not maintain financial holdings or advisory contracts with companies evaluated in our research tracks. We purchase hardware equipment through standard retail channels to guarantee representative evaluation units.
              </p>
              <p>
                We provide public access to benchmark datasets and testing scripts through open code repositories. Practicing engineers can clone our testing harness to reproduce published findings in their own lab environments. We document exact configuration flags, kernel parameters, and hardware specifications.
              </p>
              <p>
                Technical dispatches undergo rigorous peer review prior to publication. Systems architects and domain specialists review technical accuracy, mathematical modeling, and experimental methodology. Our editorial team enforces clear sentence structures and high readability standards.
              </p>
              <p>
                We actively solicit feedback from the global computing community. Practicing engineers can submit technical corrections, performance optimizations, or alternative benchmark measurements through our editorial desk. Verified contributions receive formal attribution in updated article revisions.
              </p>
              <p>
                Our archival infrastructure retains historic benchmark telemetry across multiple hardware generations. This allows systems researchers to evaluate performance regressions and throughput trends across evolving kernel architectures. We maintain strict cryptographic checksums for all published data assets.
              </p>
              <p>
                Every engineering report is structured for maximum practical utility. We organize topics by hardware layer, protocol boundary, and software runtime. Readers can navigate directly to configuration manifests, benchmark comparative charts, or security boundary specifications.
              </p>
            </div>
          </div>
        </details>
      </section>
    </div>
  );
}
