"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { SearchItem } from "@/lib/posts";

interface Props {
  posts: SearchItem[];
}

export default function SearchNewsBar({ posts }: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim()
    ? posts
        .filter((p) => {
          const q = query.toLowerCase().trim();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSlug = p.slug.toLowerCase().includes(q);
          const matchCategory = p.category.toLowerCase().includes(q);
          const matchTag = p.tags && p.tags.some((t) => t.toLowerCase().includes(q));
          return matchTitle || matchSlug || matchCategory || matchTag;
        })
        .slice(0, 7)
    : [];

  const handleSelect = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative w-full sm:w-72 lg:w-80">
      {/* Search Bar Input matching user's reference design */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 pointer-events-none text-red-500">
          <Search className="w-4 h-4 stroke-[2.5]" />
        </div>
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="SEARCH NEWS..."
          className="w-full pl-10 pr-9 py-2 rounded-lg bg-[#070d1d] hover:bg-[#0b1426] focus:bg-[#0b1426] border border-slate-700/80 focus:border-blue-500 text-slate-100 placeholder:text-slate-400 placeholder:font-black placeholder:tracking-wider placeholder:text-xs text-xs font-semibold tracking-wide transition-all shadow-inner outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-3 text-slate-400 hover:text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Live Search Results Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0b1329] border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-400">
            <span>Articles matching "{query}"</span>
            <span className="text-blue-400">{results.length} found</span>
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 no-scrollbar">
            {results.length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs">
                <BookOpen className="w-6 h-6 mx-auto mb-2 text-slate-500 opacity-60" />
                No news articles found for "<span className="text-slate-200">{query}</span>"
              </div>
            ) : (
              results.map((post) => (
                <Link
                  key={post.slug}
                  href={`/${post.slug}`}
                  onClick={handleSelect}
                  className="p-3.5 block hover:bg-blue-600/10 transition group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {post.category}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Calendar className="w-2.5 h-2.5" /> {post.date}
                    </span>
                  </div>
                  <h4 className="text-xs font-semibold text-slate-100 group-hover:text-blue-400 transition line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                </Link>
              ))
            )}
          </div>

          {results.length > 0 && (
            <Link
              href="/blog"
              onClick={handleSelect}
              className="p-2.5 text-center block bg-[#070d1d] hover:bg-slate-900 text-blue-400 hover:text-blue-300 font-bold text-[11px] tracking-wide border-t border-slate-800 transition"
            >
              Browse All News &rarr;
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
