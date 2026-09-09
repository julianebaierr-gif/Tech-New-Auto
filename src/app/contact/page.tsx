import { Mail, MessageSquare, MapPin, Send, Globe } from "lucide-react";

export const metadata = {
  title: "Contact Newsroom | TechPulse",
  description: "Get in touch with the TechPulse editorial desk for news tips, technical corrections, press submissions, and media inquiries.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-cyan-800">
          <Mail className="h-3.5 w-3.5" /> Get in Touch
        </div>
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Contact Editorial & Tips</h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Have an editorial tip, software release to announce, or question? Send our editors a message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-4 lg:col-span-1">
          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
            <div className="flex items-center gap-3 text-blue-600">
              <Mail className="h-5 w-5" />
              <span className="font-bold text-slate-900 text-sm">Email Inquiries</span>
            </div>
            <p className="text-xs text-slate-500 font-mono">editor@techpulse-auto.com</p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-xs">
            <div className="flex items-center gap-3 text-indigo-600">
              <MessageSquare className="h-5 w-5" />
              <span className="font-bold text-slate-900 text-sm">Response Time</span>
            </div>
            <p className="text-xs text-slate-500">Editorial tickets are typically reviewed within 24 business hours.</p>
          </div>
        </div>

        <div className="p-8 rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <form className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="alex@company.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition">
                <option>News Tip / Press Release</option>
                <option>Editorial Correction</option>
                <option>Advertising / Sponsorship</option>
                <option>General Feedback</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Message</label>
              <textarea
                rows={5}
                placeholder="Write your query or feedback in detail..."
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:border-blue-500 focus:bg-white transition"
                required
              />
            </div>

            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition shadow-sm"
            >
              <Send className="h-4 w-4" /> Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
