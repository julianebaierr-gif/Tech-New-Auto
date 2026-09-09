import Link from "next/link";

export default function TopUtilityBar() {
  return (
    <div className="bg-[#070a12] border-b border-[#172033] text-xs text-[#94a3b8] py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>📅 Today, {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>&bull;</span>
          <span className="text-[#38bdf8] font-medium">Independent Technology Journalism & Future Trends</span>
        </div>
        <nav className="flex items-center gap-4 text-xs font-medium">
          <Link href="/about" className="hover:text-white transition">About</Link>
          <Link href="/about" className="hover:text-white transition">Editorial Standards</Link>
          <Link href="/privacy-policy" className="hover:text-white transition">Privacy</Link>
          <Link href="/contact" className="hover:text-white transition">Contact</Link>
        </nav>
      </div>
    </div>
  );
}
