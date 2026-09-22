"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import { blogsData } from "../Blogs/data/blogsData";

export default function LatestBlogsSection() {
  // Grab top 3 featured / primary blogs
  const displayBlogs = blogsData.slice(0, 3);

  return (
    <section className="relative py-10 sm:py-12 md:py-14 bg-[#FAF8F5] overflow-hidden">
      {/* 🔮 3D Ambient Orbs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FF7819]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-md bg-[#FFF3EB] border border-[#FF7819]/30 text-[#FF7819] text-[10px] font-bold uppercase tracking-wider mb-2 shadow-2xs">
              <Sparkles className="w-3 h-3" />
              Financial Literacy & Regulatory Guides
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight leading-tight">
              Borrower Guides & <span className="text-[#FF7819]">Advisories</span>
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              Stay informed with expert insights on loan interest rates, CIBIL score growth, statutory KFS guidelines, and smart credit management.
            </p>
          </div>

          <Link
            href="/Blogs"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#002140] hover:bg-[#FF7819] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs shrink-0 self-start md:self-auto group cursor-pointer"
          >
            Explore All Guides
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Institutional Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayBlogs.map((blog, idx) => (
            <article
              key={blog.id}
              className="group relative flex flex-col h-full rounded-xl bg-white border border-[#E5E2DA] hover:border-[#002140]/40 transition-all shadow-xs overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-44 w-full overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002140]/80 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded bg-[#002140]/90 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider shadow-xs border border-white/20">
                    {blog.category}
                  </span>
                </div>

                {/* Read Time */}
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-white text-[10px] font-medium flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-[#FF7819]" />
                    {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 mb-2">
                  <Calendar className="w-3 h-3 text-[#FF7819]" />
                  {blog.postedDate}
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#002140] group-hover:text-[#FF7819] transition-colors leading-snug mb-2 line-clamp-2">
                  <Link href={`/Blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2 font-normal">
                  {blog.description}
                </p>

                {/* Card Footer */}
                <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg overflow-hidden bg-white shrink-0 border border-orange-200 p-0.5 shadow-xs flex items-center justify-center">
                      <img
                        src={blog.author.avatar || "/image/logo.png"}
                        alt={blog.author.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-xs text-gray-700 font-bold line-clamp-1">
                      {blog.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/Blogs/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF7819] group-hover:translate-x-1 transition-transform"
                  >
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
