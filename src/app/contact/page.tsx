import { Mail, MessageSquare, MapPin, Send, Globe, ShieldAlert, Newspaper, Clock } from "lucide-react";

export const metadata = {
  title: {
    absolute: "Contact Editorial Desk | Com Pors",
  },
  description: "Get in touch with the Com Pors newsroom, submit press announcements, send technical corrections, or connect with our investigative tech journalists.",
  alternates: {
    canonical: "https://www.compors.com/contact/",
  },
  openGraph: {
    title: "Contact Editorial Desk | Com Pors",
    description: "Get in touch with the Com Pors newsroom, submit press announcements, send technical corrections, or connect with our investigative tech journalists.",
    url: "https://www.compors.com/contact/",
    type: "website",
    images: [
      {
        url: "https://www.compors.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Editorial Desk | Com Pors",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider border border-blue-200">
          <Mail className="h-3.5 w-3.5" /> Newsroom Communications
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Contact Editorial &amp; News Desk
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Have an investigative lead, software release announcement, technical correction, or partnership inquiry? Our editorial team reviews every message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Editorial Desks */}
        <div className="space-y-4 lg:col-span-1">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5 text-blue-600">
              <Mail className="h-5 w-5" />
              <span className="font-bold text-slate-900 text-sm">Editorial Desk</span>
            </div>
            <p className="text-xs text-slate-500">For news scoops, product reviews &amp; press releases:</p>
            <p className="text-xs text-blue-600 font-mono font-medium">williamcheeke4@gmail.com</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5 text-amber-600">
              <ShieldAlert className="h-5 w-5" />
              <span className="font-bold text-slate-900 text-sm">Corrections Desk</span>
            </div>
            <p className="text-xs text-slate-500">Notice a technical inaccuracy or outdated code block?</p>
            <p className="text-xs text-amber-600 font-mono font-medium">williamcheeke4@gmail.com</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-2 shadow-xs">
            <div className="flex items-center gap-2.5 text-emerald-600">
              <Clock className="h-5 w-5" />
              <span className="font-bold text-slate-900 text-sm">Review SLA</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Editorial tips and corrections are acknowledged and reviewed by our lead editor within 24 business hours.
            </p>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-xs lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Send Direct Editorial Message</h2>
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Alex Vance"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Business Email</label>
                <input
                  type="email"
                  placeholder="alex@organization.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Inquiry Category</label>
              <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition">
                <option>News Tip / Whitepaper Submission</option>
                <option>Technical Inaccuracy / Fact Correction</option>
                <option>Press Release &amp; Benchmark Findings</option>
                <option>Media Syndication &amp; Licensing</option>
                <option>General Newsroom Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Detailed Message</label>
              <textarea
                rows={6}
                placeholder="Provide details, whitepaper links, reproduction steps, or press materials..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                required
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-xs"
            >
              <Send className="h-4 w-4" /> Submit Editorial Inquiry
            </button>
          </form>
        </div>
      </div>

      {/* Newsroom Submission Guidelines & Embargo Policy */}
      <div className="border-t border-slate-200 pt-10 space-y-8 text-slate-700 text-sm leading-relaxed">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
            Editorial Protocol
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Newsroom Submission Guidelines &amp; Corrections Workflow
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
            Com Pors maintains high journalistic standards for technical coverage, investigative teardowns, and peer review. Before submitting materials, please review our newsroom criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Press Releases &amp; Research Embargos</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We respect scheduled disclosure embargos when communicated in writing at least 48 hours prior to public announcement. Our technical editors conduct independent verification, reproduce benchmark claims, and inspect documentation before agreeing to embargo terms.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Technical Corrections Policy</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When readers or engineering practitioners identify factual inaccuracies, code syntax errors, or outdated API references in our articles, our editorial staff evaluates the submission against verified documentation. Corrections are published transparently with timestamped editorial notes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
            <h3 className="font-bold text-slate-900 text-base">Investigative Leads &amp; Source Security</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We protect confidential sources who share insights regarding vulnerability disclosures, security flaws, or enterprise IT governance failures. Please indicate in your initial outreach if sensitive communication protocols or cryptographic signing are requested.
            </p>
          </div>
        </div>

        {/* Coordinated Disclosure Matrix & Newsroom FAQ */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              Coordinated Vulnerability Disclosure &amp; Security Protocols
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Protocols for submitting software vulnerability reports, zero-day research, and security audits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Vulnerability Verification Requirements</h4>
              <p>
                When submitting reports regarding zero-day exploits, CVE discoveries, or cloud authentication bypasses, submitters must provide verifiable reproduction scripts or packet capture data. Our newsroom works directly with affected vendors to facilitate coordinated patch releases before publishing technical breakdowns.
              </p>
              <p>
                We do not publish weaponized exploit code or proof-of-concept payloads that enable unauthenticated remote code execution against unpatched production systems. Our coverage focuses strictly on the architectural root causes, memory safety failures, and cryptographic flaws enabling the vulnerability.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Response Timeframes &amp; Editorial Review SLA</h4>
              <p>
                All communications sent to our editorial desk receive an automated acknowledgment followed by human review within 24 business hours. Technical corrections that affect factual assertions, benchmark numbers, or code correctness are prioritized and typically addressed within one business day.
              </p>
              <p>
                If an investigation warrants a formal retraction or major structural revision, an editor's note is appended to the top of the article detailing the date, the nature of the correction, and the verified empirical evidence supporting the change.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Editorial Desk Frequently Asked Questions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600">
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Do you accept paid guest articles?</strong>
                <p>No. Com Pors does not accept sponsored guest posts, paid text links, or third-party marketing placements. All articles are produced by our verified editorial staff.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">How can I submit hardware for laboratory benchmarking?</strong>
                <p>Hardware vendors may submit evaluation units to our lab. However, we accept review hardware only under unconditional editorial freedom with zero pre-publication review rights.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Can academic researchers republish your diagrams?</strong>
                <p>Yes. Non-commercial academic research papers and university coursework may cite our architectural diagrams with standard bibliographic attribution to Com Pors.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">Where are your editorial offices located?</strong>
                <p>Com Pors operates as a distributed digital newsroom with contributing analysts, laboratory testbeds, and editors across North America and Europe.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">What is your embargo verification timeline?</strong>
                <p>We require at least 48 hours to evaluate technical documentation, reproduce benchmark figures, and formulate independent editorial questions before agreeing to embargo terms.</p>
              </div>
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 block font-bold">How do you protect confidential whistleblowers?</strong>
                <p>Our newsroom provides end-to-end PGP encrypted communication channels. We never disclose source identities, IP logs, or communication metadata under any circumstances.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
