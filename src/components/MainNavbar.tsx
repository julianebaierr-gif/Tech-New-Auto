"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories } from "@/lib/categories";
import { Menu, X, ChevronRight, Layers, Home, Newspaper } from "lucide-react";

export { categories };

export default function MainNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop & Tablet Categories Horizontal Bar */}
          <ul className="hidden md:flex items-center overflow-x-auto no-scrollbar gap-1 text-xs lg:text-sm font-semibold whitespace-nowrap flex-1">
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

          {/* Mobile Categories Quick Scroll Strip + Hamburger Button */}
          <div className="flex md:hidden items-center justify-between w-full gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-1 text-slate-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg shrink-0 flex items-center gap-1 text-xs font-bold"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-red-600" /> : <Menu className="h-5 w-5 text-blue-600" />}
              <span className="text-[11px] uppercase tracking-wider">{mobileMenuOpen ? "Close" : "Menu"}</span>
            </button>

            {/* Horizontal quick pills for mobile */}
            <div className="flex items-center overflow-x-auto no-scrollbar gap-1.5 py-1 text-xs font-medium whitespace-nowrap flex-1 pl-1">
              <Link
                href="/"
                className={`px-2.5 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                  pathname === "/" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                Home
              </Link>
              {categories.slice(0, 4).map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition shrink-0 ${
                    pathname === `/category/${c.slug}` ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block px-2 mb-2">
                Departments &amp; Categories
              </span>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/"
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                      pathname === "/" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Home className="h-4 w-4 text-blue-600" /> Home Frontpage
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </li>
                {categories.map((cat) => {
                  const isActive = pathname === `/category/${cat.slug}`;
                  return (
                    <li key={cat.slug}>
                      <Link
                        href={`/category/${cat.slug}`}
                        onClick={closeMenu}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                          isActive ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-slate-400" /> {cat.name}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href="/blog"
                    onClick={closeMenu}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-sm ${
                      pathname === "/blog" ? "bg-blue-50 text-blue-600" : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Newspaper className="h-4 w-4 text-blue-600" /> Complete Newsroom Archive
                    </span>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-100">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block px-2 mb-2">
                TechPulse Magazine
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  About Us
                </Link>
                <Link
                  href="/authors"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Our Authors
                </Link>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Contact Desk
                </Link>
                <Link
                  href="/privacy-policy"
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
