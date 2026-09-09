"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, Sparkles, BookOpen, ShieldCheck } from "lucide-react";
import { blogsData } from "../Blogs/data/blogsData";

export default function LatestBlogsSection() {
  // Grab top 3 featured / primary blogs
  const displayBlogs = blogsData.slice(0, 3);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FFF4E5] overflow-hidden border-t border-orange-100">
      {/* 🔮 3D Ambient Orbs */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-[#FF690B]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-orange-300/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-orange-200 text-[#FF690B] text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              CoverMantra Knowledge Hub
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#08101E] tracking-tight leading-tight">
              Smart Financial <span className="text-[#FF690B]">Insights</span> & Guides
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600 font-medium leading-relaxed">
              Stay informed with expert advice on loan interest rates, CIBIL score growth, insurance shields, and modern wealth habits.
            </p>
          </div>

          <Link
            href="/Blogs"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#08101E] hover:bg-[#FF690B] text-white text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-[0_10px_25px_rgba(255,105,11,0.3)] shrink-0 self-start md:self-auto group cursor-pointer"
          >
            Explore All 10 Blogs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 3D Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayBlogs.map((blog, idx) => (
            <article
              key={blog.id}
              className="group relative flex flex-col h-full rounded-3xl bg-white border border-orange-100 hover:border-[#FF690B]/60 transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(8,16,30,0.12)] shadow-md overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden">
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08101E]/70 via-transparent to-transparent pointer-events-none" />

                {/* Category Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="px-3 py-1 rounded-full bg-[#08101E]/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-md">
                    {blog.category}
                  </span>
                </div>

                {/* Read Time */}
                <div className="absolute top-3.5 right-3.5">
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/10">
                    <Clock className="w-3 h-3 text-[#FF690B]" />
                    {blog.readTime}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-7 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3">
                  <Calendar className="w-3.5 h-3.5 text-[#FF690B]" />
                  {blog.postedDate}
                </div>

                <h3 className="text-lg sm:text-xl font-black text-[#08101E] group-hover:text-[#FF690B] transition-colors leading-tight mb-3 line-clamp-2">
                  <Link href={`/Blogs/${blog.slug}`}>
                    {blog.title}
                  </Link>
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
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
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF690B] group-hover:translate-x-1 transition-transform"
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
