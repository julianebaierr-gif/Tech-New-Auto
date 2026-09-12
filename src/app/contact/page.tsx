import { Mail, MessageSquare, MapPin, Send, Globe, ShieldAlert, Newspaper, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Newsroom & Editorial Desk | Com Pors",
  description: "Get in touch with the Com Pors editorial desk, submit press announcements, send technical corrections, or connect with our investigative tech journalists.",
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
    </div>
  );
}
