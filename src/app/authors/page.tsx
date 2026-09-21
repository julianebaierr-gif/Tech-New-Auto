import Link from "next/link";
import { getAuthors, getPostsByAuthor } from "@/lib/posts";
import { ArrowRight, BookOpen, ShieldCheck, Award, GraduationCap, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Editorial Masthead & Authors | Com Pors",
  },
  description: "Meet the verified system architects and artificial intelligence analysts authoring technical evaluations for Com Pors.",
  alternates: {
    canonical: "https://www.compors.com/authors/",
  },
  openGraph: {
    title: "Editorial Masthead & Authors | Com Pors",
    description: "Meet the verified system architects and artificial intelligence analysts authoring technical evaluations for Com Pors.",
    url: "https://www.compors.com/authors/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Editorial Masthead & Authors | Com Pors",
      },
    ],
  },
};

export default function AuthorsIndexPage() {
  const authors = getAuthors();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Header */}
      <div className="border-b border-slate-200 pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          <ShieldCheck className="h-3.5 w-3.5" /> Editorial Transparency &amp; E-E-A-T
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Editorial Masthead &amp; Authors
        </h1>
        <p className="max-w-3xl text-sm sm:text-base text-slate-600 leading-relaxed">
          At Com Pors, every technical guide, software benchmark, and architectural review is authored by seasoned practitioners with demonstrable engineering and research experience.
        </p>
      </div>

      {/* Author Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {authors.map((author) => {
          const authorPosts = getPostsByAuthor(author.slug);
          return (
            <article
              key={author.slug}
              className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-5">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    width={96}
                    height={96}
                    className="h-20 w-20 sm:h-24 sm:w-24 min-w-[5rem] sm:min-w-[6rem] aspect-square rounded-2xl object-cover shrink-0 border-2 border-slate-100 group-hover:scale-105 transition duration-300 shadow-xs"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition">
                        <Link href={`/author/${author.slug}`}>{author.name}</Link>
                      </h2>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                        Editorial Staff
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-blue-600">{author.role}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <BookOpen className="h-3.5 w-3.5 text-blue-600" /> {authorPosts.length} Articles
                      </span>
                      <span>&bull;</span>
                      <span className="inline-flex items-center gap-1 font-medium text-slate-600">
                        Technical Editorial
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {author.bio}
                </p>

                {/* Expertise Badges */}
                <div className="pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Core Competencies:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {author.slug === "cora-lee" ? (
                      <>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Distributed Systems</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Linux Kernels</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Zero-Trust Cloud</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Frontier AI &amp; LLMs</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Neuromorphic Silicon</span>
                        <span className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">Quantum Hardware</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs mt-6">
                <span className="text-slate-500 font-medium">Full Editorial Profile</span>
                <Link
                  href={`/author/${author.slug}`}
                  className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform"
                >
                  Read Authored Guides <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Editorial Standards, Authorship Verification & Peer Review Criteria */}
      <div className="border-t border-slate-200 pt-10 space-y-10 text-slate-700 text-sm leading-relaxed">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
            Author Qualifications &amp; Review Criteria
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Independent Authorship &amp; Engineering Peer-Review
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Com Pors enforces rigorous qualification standards for all contributing authors, technical editors, and investigative journalists. We ensure every article reflects real-world engineering proficiency rather than theoretical conjecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Verified Technical Background</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Contributing analysts must demonstrate hands-on experience in software engineering, kernel development, cloud infrastructure design, or semiconductor research. We verify GitHub contributions, published research papers, and industrial credentials before granting bylines.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Two-Stage Editorial Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every submission passes through technical fact-checking to confirm mathematical correctness, benchmark reproducibility, and code sample execution before undergoing final linguistic and clarity review by senior newsroom staff.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Conflict of Interest Disclosure</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authors must disclose any personal investments, prior employer consulting contracts, or commercial advisory roles relevant to technologies covered. We prohibit authors from covering companies in which they hold active equity or commercial stakes.
            </p>
          </div>
        </div>

        {/* Detailed Review Methodology & Testing Standards */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Laboratory Benchmarking &amp; Empirical Reproducibility Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              How Com Pors analysts design, verify, and document technical benchmarks before publication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Physical Testbeds &amp; Isolation</h4>
              <p>
                All computational benchmarks are conducted on dedicated bare-metal test nodes rather than shared virtualized cloud instances. This eliminates noisy-neighbor CPU throttling, variable hypervisor scheduling latency, and inconsistent network jitter from benchmark results.
              </p>
              <p>
                Our test configurations record ambient temperatures, power draw metrics, CPU clock frequencies, and memory sub-timings. When publishing hardware teardowns or compiler optimization passes, test environment variables and kernel compilation flags are published alongside the results.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Code Verification &amp; Synthetic Stress Testing</h4>
              <p>
                Every code snippet published on Com Pors is tested against standard compiler toolchains and runtime engines. We verify syntax correctness, dependency compatibility, and memory leak absence under sustained load using memory sanitizers and stress-testing suites.
              </p>
              <p>
                Articles detailing algorithmic complexity compare theoretical Big-O curves with real-world execution profiles. If an algorithm encounters CPU cache miss bottlenecks or branch misprediction stalls, our authors document the physical hardware factors impacting runtime performance.
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">100% Original Reporting</strong>
              <p>No syndicated fluff, PR re-writes, or automated regurgitation of third-party press releases.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">Transparent Corrections</strong>
              <p>Noticed an inaccuracy? Our newsroom investigates and issues public corrections within 24 hours.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1">
              <strong className="text-slate-900 block font-bold">Open Review Feedback</strong>
              <p>Readers and researchers can inspect our testing scripts and submit reproducibility feedback.</p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm">Editorial Independence &amp; Anti-Bias Commitments</h4>
            <p>
              To safeguard the objectivity of our analyses, Com Pors maintains an absolute firewall between editorial research and commercial operations. Our authors do not hold equity, advisory positions, or consulting agreements with companies whose hardware or software products they review. We do not participate in paid speaking bureaus, vendor-sponsored junkets, or reciprocal backlink rings.
            </p>
            <p>
              All software evaluations are conducted using retail accounts or open-source software distributions. When hardware manufacturers provide review hardware samples, units are accepted exclusively under unconditional editorial autonomy with zero pre-publication review rights.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <h4 className="font-bold text-slate-900 text-sm">Technical Review Board &amp; Codebase Integrity Verification</h4>
            <p>
              In addition to individual author research, Com Pors maintains a technical review protocol for software architectural patterns. Before code samples are published in our technical guides, snippets undergo automated static analysis to identify memory safety hazards, unhandled error conditions, and algorithmic edge cases.
            </p>
            <p>
              We prioritize code clarity, idiomatic syntax, and standard library primitives over obscure language hacks. Each code example includes explicit compilation commands, language runtime versions, and dependency manifests, ensuring developers can reproduce our architectural blueprints in local testing environments without unexpected failures.
            </p>
            <p>
              Our authors continuously track updates to open RFC specifications, cryptographic deprecation notices from NIST, and Linux kernel stable releases. When upstream APIs evolve, existing guides are re-evaluated and revised with explicit changelogs to preserve their value as dependable engineering references.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
