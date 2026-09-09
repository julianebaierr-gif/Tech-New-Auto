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
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center overflow-x-auto scrollbar-none py-2.5 gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <li>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-md hover:bg-blue-600 hover:text-white transition text-slate-800 inline-block font-bold"
            >
              Home
            </Link>
          </li>
          {categories.map((cat) => (
            <li key={cat.slug}>
              <Link
                href={`/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-md hover:bg-blue-50 hover:text-blue-700 text-slate-600 transition inline-block font-medium"
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link
              href="/blog"
              className="px-3.5 py-1.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition inline-block font-bold shadow-xs"
            >
              All Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
