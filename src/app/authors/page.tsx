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

        {/* Detailed Review Methodology & Testing Standards (Collapsible) */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8">
          <details className="group">
            <summary className="cursor-pointer list-none flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                  Testing Rig Standards &bull; Peer Review
                </span>
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                  Lab Benchmarking &amp; Code Verification Standards
                </h3>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg group-open:hidden self-start sm:self-auto">
                + View Standards
              </span>
              <span className="text-xs font-bold text-slate-600 bg-slate-200 border border-slate-300 px-3 py-1.5 rounded-lg hidden group-open:inline self-start sm:self-auto">
                - Hide Standards
              </span>
            </summary>

            <div className="pt-6 space-y-6 border-t border-slate-200 mt-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Physical Test Servers</h4>
                  <p>
                    All tests run on dedicated physical computers. We do not use shared virtual machines for speed benchmarks. This stops noisy neighbor slowdowns and CPU throttling.
                  </p>
                  <p>
                    We track CPU clock speeds, room heat, and RAM timings. When we share compiler flags or kernel settings, we publish the full config for engineers to review.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Code Verification &amp; Testing</h4>
                  <p>
                    Every code snippet on Com Pors is tested against standard compiler tools. We verify syntax correctness and memory safety before publishing.
                  </p>
                  <p>
                    Our articles compare theory with real-world runtimes. If an algorithm causes CPU cache stalls, our authors explain why the hardware slowed down.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3">
                <h4 className="text-sm font-bold text-slate-900">Laboratory Verification Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">1. Clean Setup</strong>
                    <p className="text-slate-600">Fresh OS installs on dedicated server hardware.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">2. Digital Meters</strong>
                    <p className="text-slate-600">Real power use recorded with digital power meters.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">3. Open Test Code</strong>
                    <p className="text-slate-600">Benchmark test scripts shared in public code repos.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">4. Error Checks</strong>
                    <p className="text-slate-600">Memory tests run for 24 hours before logging data.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <strong className="text-slate-900 block font-bold">5. Peer Review</strong>
                    <p className="text-slate-600">Senior engineers check code samples before release.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">100% Original Tests</strong>
                  <p>We do not copy press releases or syndicate third-party summaries.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Transparent Errata</strong>
                  <p>We review error reports and publish fixes within 24 hours.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                  <strong className="text-slate-900 block font-bold">Open Review Feedback</strong>
                  <p>Engineers can inspect test scripts and share feedback.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Editorial Independence</h4>
                <p>
                  Com Pors keeps a strict firewall between editorial research and business sales. Our writers do not hold stocks or consulting roles with companies whose products they review. We run software tests using retail accounts or open-source releases with zero vendor review.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-3 text-xs">
                <h4 className="font-bold text-slate-900 text-sm">Empirical Lab Verification Workflow</h4>
                <p>
                  Our analysts test all code samples against multiple operating systems and compiler versions. When reviewing server hardware, we run memory stress tests for twenty-four hours to detect memory leaks and thermal throttling. We log raw test metrics in text format to ensure reproducible results.
                </p>
                <p>
                  Every technical dispatch undergoes a two-tier review process. First, a systems engineer verifies mathematical calculations, architectural diagrams, and network topology charts. Next, a senior editor checks linguistic clarity, readability scores, and factual consistency. This rigorous process prevents inaccurate technical claims.
                </p>
                <p>
                  We maintain full editorial independence across all technical reviews. Our newsroom never accepts free evaluation units with contractual review stipulations. If software documentation contains ambiguities, our team contacts upstream maintainers or examines open-source source code directly.
                </p>
                <p>
                  Readers can submit technical feedback or request clarifications on published benchmarks. Our team reviews all technical inquiries within one business day and issues transparent errata notes whenever corrections are required.
                </p>
              </div>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
