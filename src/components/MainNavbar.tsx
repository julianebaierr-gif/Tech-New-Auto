"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";

export { categories };

export default function MainNavbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="flex items-center overflow-x-auto scrollbar-none py-2.5 gap-1.5 text-xs sm:text-sm font-semibold whitespace-nowrap">
          <li>
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-md transition inline-block font-semibold ${
                pathname === "/"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              Home
            </Link>
          </li>
          {categories.map((cat) => {
            const isActive = pathname === `/category/${cat.slug}`;
            return (
              <li key={cat.slug}>
                <Link
                  href={`/category/${cat.slug}`}
                  className={`px-3 py-1.5 rounded-md transition inline-block font-semibold ${
                    isActive
                      ? "bg-blue-50 text-blue-700"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
          <li className="ml-auto">
            <Link
              href="/blog"
              className={`px-3 py-1.5 rounded-md transition inline-block font-semibold ${
                pathname === "/blog"
                  ? "bg-blue-50 text-blue-700"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              All Topics
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
