import Link from "next/link";

export const categories = [
  { name: "News", slug: "news", emoji: "🏛️" },
  { name: "Business", slug: "business", emoji: "💼" },
  { name: "Artificial Intelligence", slug: "artificial-intelligence", emoji: "🤖" },
  { name: "Software", slug: "software", emoji: "💻" },
  { name: "Hardware", slug: "hardware", emoji: "⚡" },
  { name: "Cybersecurity", slug: "cybersecurity", emoji: "🛡️" },
  { name: "Cloud", slug: "cloud", emoji: "☁️" },
  { name: "Games", slug: "games", emoji: "🎮" },
  { name: "Future Tech", slug: "future-tech", emoji: "🚀" },
];

export default function MainNavbar() {
  return (
    <nav className="sticky top-0 z-40 bg-[#070a12] border-b border-[#1f293d] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center overflow-x-auto scrollbar-none py-2 gap-1 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <li>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded hover:bg-[#c1121e] hover:text-white transition text-[#f1f5f9] inline-block font-bold"
            >
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="px-3.5 py-1.5 rounded hover:bg-[#c1121e] hover:text-white transition text-[#94a3b8] hover:text-white inline-block"
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded bg-[#1e293b] hover:bg-[#c1121e] text-[#f59e0b] hover:text-white transition inline-block font-bold ml-2"
            >
              All Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
