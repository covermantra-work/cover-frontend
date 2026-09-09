"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  Filter,
  Users,
  Compass,
  CheckCircle2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
import { blogsData, getAllCategories, BlogPost } from "./data/blogsData";

export default function BlogsHub() {
  const router = useRouter();

  const [allBlogs, setAllBlogs] = useState<BlogPost[]>(blogsData);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // Fetch live dynamic blogs from backend API
  useEffect(() => {
    const fetchLiveBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setAllBlogs(data);
          }
        }
      } catch (err) {
        // Silently fallback to static blogsData
        console.warn("Using offline blogs data:", err);
      }
    };
    fetchLiveBlogs();
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allBlogs.map((b) => b.category)));
    return ["All", ...cats];
  }, [allBlogs]);

  // Filter blogs based on search query and selected category
  const filteredBlogs = useMemo(() => {
    return allBlogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.description.toLowerCase().includes(q) ||
        (blog.tags && blog.tags.some((t) => t.toLowerCase().includes(q))) ||
        (blog.author?.name && blog.author.name.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [allBlogs, searchQuery, selectedCategory]);

  // Featured Blog (Top featured or first one)
  const featuredBlog = useMemo(() => {
    return allBlogs.find((b) => b.featured) || allBlogs[0];
  }, [allBlogs]);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      toast.error("Please enter a valid email address.", {
        style: {
          borderRadius: "16px",
          background: "#08101E",
          color: "#fff",
          border: "1px solid rgba(255,105,11,0.2)",
        },
      });
      return;
    }

    toast.success("Subscribed successfully! Weekly financial insights on your way.", {
      icon: "🎉",
      style: {
        borderRadius: "16px",
        background: "#08101E",
        color: "#fff",
        border: "1px solid rgba(255,105,11,0.2)",
      },
    });
    setNewsletterEmail("");
  };

  return (
    <div className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF690B] selection:text-white overflow-x-hidden pb-24">
      <Toaster position="top-right" />

      {/* 🎭 3D DARK HERO HEADER (CoverMantra Signature) */}
      <header className="relative bg-[#08101E] pt-32 sm:pt-40 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden shadow-2xl">
        {/* Saffron & Indigo Glowing Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#FF690B]/20 rounded-full blur-[130px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 pointer-events-none" />

        <div data-aos="fade-down" className="max-w-4xl mx-auto text-center relative z-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF690B] text-xs font-black uppercase tracking-widest mb-6 shadow-xl backdrop-blur-md">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            CoverMantra Financial Insights & Knowledge Hub
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] mb-6">
            Smart Knowledge. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF690B] via-[#FF8C00] to-amber-300">
              Confident Decisions.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-300 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 opacity-90">
            Expertly curated guides on personal loans, insurance security, CIBIL optimization, and smart wealth strategies.
          </p>

          {/* 🔍 3D SEARCH BAR */}
          <div className="max-w-2xl mx-auto relative group" data-aos="fade-up" data-aos-delay="100">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FF690B]/40 to-blue-600/30 rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
            <div className="relative flex items-center bg-[#050811]/95 backdrop-blur-xl border border-white/15 rounded-2xl sm:rounded-3xl p-2 shadow-2xl">
              <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by topic, keyword (e.g. loans, insurance, CIBIL)..."
                className="w-full bg-transparent px-4 py-3 text-sm sm:text-base text-white placeholder:text-gray-500 focus:outline-none font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-2 text-gray-400 hover:text-white transition-colors mr-2 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 📊 3D QUICK STATS BAR (Overlapping Hero onto #FFF4E5) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20" data-aos="fade-up">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-3xl bg-white shadow-[0_20px_50px_rgba(8,16,30,0.1)] border border-orange-100">
          {[
            { label: "Expert Guides", val: "10+ Articles", icon: BookOpen },
            { label: "Lending Partners", val: "30+ Banks", icon: TrendingUp },
            { label: "Active Readers", val: "50,000+", icon: Users },
            { label: "Verified Data", val: "100% Free", icon: ShieldCheck }
          ].map((stat, i) => (
            <div
              key={i}
              className="p-3.5 rounded-2xl bg-[#FFF4E5]/50 flex items-center gap-3.5 hover:bg-[#FFF4E5] transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-[#08101E] text-[#FF690B] flex items-center justify-center shrink-0 shadow-md">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                <p className="text-sm sm:text-base font-black text-[#08101E]">{stat.val}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🧭 MAIN CONTENT SECTION IN #FFF4E5 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        
        {/* 🌟 3D FEATURED STORY CARD */}
        {!searchQuery && selectedCategory === "All" && featuredBlog && (
          <section className="mb-20" data-aos="zoom-in">
            <div className="relative group rounded-3xl sm:rounded-[3rem] overflow-hidden p-1 sm:p-2 bg-white border border-orange-200/70 shadow-[0_25px_60px_-15px_rgba(8,16,30,0.12)]">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-[2.2rem] overflow-hidden p-6 sm:p-10">
                
                {/* Featured Image (7 cols) */}
                <div className="lg:col-span-7 relative h-72 sm:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-700 shadow-xl">
                  <img
                    src={featuredBlog.coverImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08101E]/90 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white text-[11px] font-black uppercase tracking-wider shadow-lg">
                      ⭐ Featured Story
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#08101E]/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      {featuredBlog.category}
                    </span>
                  </div>
                </div>

                {/* Featured Content (5 cols) */}
                <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#FF690B]" />
                        {featuredBlog.postedDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-blue-600" />
                        {featuredBlog.readTime}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-4xl font-black text-[#08101E] leading-tight hover:text-[#FF690B] transition-colors">
                      <Link href={`/Blogs/${featuredBlog.slug}`}>
                        {featuredBlog.title}
                      </Link>
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed line-clamp-3 font-medium">
                      {featuredBlog.description}
                    </p>
                  </div>

                  {/* Author & Button */}
                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-orange-200 bg-white p-1 shrink-0 shadow-sm flex items-center justify-center">
                        <img
                          src={featuredBlog.author.avatar || "/image/logo.png"}
                          alt={featuredBlog.author.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#08101E]">{featuredBlog.author.name}</p>
                        <p className="text-[11px] text-gray-500 font-medium">{featuredBlog.author.role}</p>
                      </div>
                    </div>

                    <Link
                      href={`/Blogs/${featuredBlog.slug}`}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-[0_8px_20px_rgba(255,105,11,0.35)] hover:scale-105 transition-all group/btn cursor-pointer"
                    >
                      Read Now
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 🏷️ 3D CATEGORY PILLS BAR */}
        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl sm:text-2xl font-black text-[#08101E] flex items-center gap-2.5">
              <span className="w-2.5 h-6 rounded-full bg-[#FF690B]" />
              {searchQuery ? `Search Results (${filteredBlogs.length})` : "Browse by Category"}
            </h3>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs text-[#FF690B] font-bold hover:underline cursor-pointer"
              >
                Clear Search
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none">
            {categories.map((cat) => {
              const count =
                cat === "All"
                  ? blogsData.length
                  : blogsData.filter((b) => b.category === cat).length;
              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 px-4.5 py-2.5 rounded-2xl text-xs font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-sm ${
                    isActive
                      ? "bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white shadow-[0_4px_16px_rgba(255,105,11,0.35)] scale-105"
                      : "bg-white text-gray-700 hover:text-[#08101E] hover:bg-white/90 border border-orange-100"
                  }`}
                >
                  {cat}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                      isActive ? "bg-black/20 text-white" : "bg-[#FFF4E5] text-gray-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* 📚 3D BLOG CARDS GRID */}
        {filteredBlogs.length > 0 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, idx) => (
              <article
                key={blog.id}
                className="group relative flex flex-col h-full rounded-3xl sm:rounded-[2.5rem] bg-white border border-orange-100/80 hover:border-[#FF690B]/60 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_-10px_rgba(8,16,30,0.15)] overflow-hidden shadow-md"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                {/* 3D Top Cover Image */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08101E]/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-[#08101E]/85 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                      {blog.category}
                    </span>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold flex items-center gap-1 border border-white/10">
                      <Clock className="w-3 h-3 text-[#FF690B]" />
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  
                  {/* Date & Meta */}
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-[#FF690B]" />
                    {blog.postedDate}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-[#08101E] group-hover:text-[#FF690B] transition-colors leading-tight mb-4 line-clamp-2">
                    <Link href={`/Blogs/${blog.slug}`}>
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3 font-medium">
                    {blog.description}
                  </p>

                  {/* Footer with Author and CTA */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl overflow-hidden bg-white shrink-0 border border-orange-200 p-0.5 shadow-sm flex items-center justify-center">
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
                      Read Article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        ) : (
          /* Empty Search State */
          <div className="py-24 text-center max-w-md mx-auto" data-aos="fade-up">
            <div className="w-16 h-16 rounded-3xl bg-white border border-orange-200 flex items-center justify-center mx-auto mb-6 text-gray-400 shadow-md">
              <Search className="w-8 h-8 text-[#FF690B]" />
            </div>
            <h3 className="text-2xl font-bold text-[#08101E] mb-2">No Articles Found</h3>
            <p className="text-gray-600 text-sm mb-6 font-medium">
              We couldn't find any articles matching "{searchQuery}". Try searching with different keywords or reset filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* 📬 3D NEWSLETTER SECTION */}
        <section className="mt-28" data-aos="fade-up">
          <div className="relative rounded-3xl sm:rounded-[3rem] bg-[#08101E] text-white p-8 sm:p-16 text-center overflow-hidden shadow-2xl border border-white/10">
            {/* Glowing Orbs */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF690B]/15 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FF690B]/15 border border-[#FF690B]/30 text-[#FF690B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Zero Spam • Weekly Curation
              </div>

              <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
                Stay Ahead in <span className="text-[#FF690B]">Loans & Finance</span>
              </h3>

              <p className="text-gray-400 text-sm sm:text-base leading-relaxed font-medium">
                Join 50,000+ smart borrowers and investors who receive our curated interest rate updates, insurance comparisons, and financial hacks.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 pt-4">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 bg-white/[0.08] border border-white/15 rounded-2xl px-5 py-3.5 text-white placeholder:text-gray-500 text-sm focus:outline-none focus:border-[#FF690B] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_10px_25px_rgba(255,105,11,0.4)] hover:scale-105 transition-all cursor-pointer"
                >
                  Subscribe Free
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}