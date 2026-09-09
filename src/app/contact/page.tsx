import { Mail, MessageSquare, MapPin, Send, Globe } from "lucide-react";

export const metadata = {
  title: "Contact Us | TechPulse",
  description: "Get in touch with the TechPulse team for editorial inquiries, technical partnerships, or API integrations.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-800">
          <Mail className="h-3.5 w-3.5" /> Get in Touch
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-tight">Contact Editorial & Support</h1>
        <p className="mt-3 text-neutral-400 text-sm sm:text-base">
          Have questions regarding our automated content pipelines, sponsored coverage, or API integrations? Send us a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-1">
          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-cyan-400">
              <Mail className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">Email Inquiries</span>
            </div>
            <p className="text-xs text-neutral-400">editor@techpulse-auto.com</p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-purple-400">
              <Globe className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">GitHub Repository</span>
            </div>
            <p className="text-xs text-neutral-400">julianebaierr-gif/Tech-New-Auto</p>
          </div>

          <div className="p-6 rounded-xl border border-neutral-800 bg-neutral-900/50 space-y-4">
            <div className="flex items-center gap-3 text-emerald-400">
              <MessageSquare className="h-5 w-5" />
              <span className="font-semibold text-white text-sm">Response Time</span>
            </div>
            <p className="text-xs text-neutral-400">Editorial tickets are typically reviewed within 24 business hours.</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-neutral-800 bg-neutral-900/40 lg:col-span-2">
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Subject / Inquiry Type</label>
              <select className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition">
                <option>General Editorial Feedback</option>
                <option>API & Keyword Automation Request</option>
                <option>Content Correction / DMCA Notice</option>
                <option>Partnership & Advertising</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 uppercase mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your query or feedback in detail..."
                className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-neutral-800 text-white text-sm focus:outline-none focus:border-cyan-500 transition"
                required
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-sm transition shadow-lg shadow-cyan-500/20"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
