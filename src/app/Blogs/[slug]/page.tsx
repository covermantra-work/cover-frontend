"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  Share2,
  CheckCircle2,
  Bookmark,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Copy,
  Check,
  BookOpen,
  TrendingUp,
  Tag
} from "lucide-react";
import { FaWhatsapp, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
import { getBlogBySlug, blogsData, BlogPost } from "../data/blogsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function DynamicBlogPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const slug = resolvedParams.slug;
  const initialBlog = getBlogBySlug(slug);

  const [blog, setBlog] = useState<BlogPost | undefined>(initialBlog);
  const [loading, setLoading] = useState(!initialBlog);
  const [copied, setCopied] = useState(false);

  // Reading Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  // Fetch dynamic blog from API (handles newly created blogs from Admin panel)
  useEffect(() => {
    let isMounted = true;
    const fetchLiveBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data && data.title) {
            setBlog(data);
          }
        }
      } catch (err) {
        console.warn("Could not fetch live blog:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchLiveBlog();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success("Article link copied to clipboard!", {
        style: {
          borderRadius: "16px",
          background: "#08101E",
          color: "#fff",
          border: "1px solid rgba(255,105,11,0.2)",
        },
      });
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== "undefined" && blog) {
      const text = encodeURIComponent(`Read this article on CoverMantra: ${blog.title}\n${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    }
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank");
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== "undefined" && blog) {
      const text = encodeURIComponent(`"${blog.title}" via @CoverMantra\n${window.location.href}`);
      window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF4E5] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-3xl bg-[#08101E] border-2 border-[#FF690B] flex items-center justify-center mb-4 text-[#FF690B] shadow-2xl animate-spin">
          <BookOpen className="w-8 h-8" />
        </div>
        <p className="text-xs font-black text-[#08101E] uppercase tracking-widest animate-pulse">
          Loading Story...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FFF4E5] text-[#08101E] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-white border border-orange-200 flex items-center justify-center mb-6 text-[#FF690B] shadow-xl animate-pulse">
          <BookOpen className="w-10 h-10" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black mb-4 tracking-tight text-[#08101E]">
          Article Not Found
        </h1>
        <p className="text-gray-600 max-w-md mb-8 text-base">
          The blog article you are searching for might have been moved or updated.
        </p>
        <Link
          href="/Blogs"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-bold text-sm shadow-[0_10px_30px_rgba(255,105,11,0.4)] hover:scale-105 transition-transform"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Blogs
        </Link>
      </div>
    );
  }

  // Related Blogs (next 3)
  const relatedBlogs = blogsData
    .filter((b) => b.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF690B] selection:text-white overflow-x-hidden">
      <Toaster position="top-right" />

      {/* 🚀 3D GRADIENT READING PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF690B] via-[#FF8C00] to-amber-400 z-[110] origin-left shadow-[0_0_12px_rgba(255,105,11,0.8)]"
        style={{ scaleX }}
      />

      {/* 🏔️ 3D DARK HERO HEADER (CoverMantra Signature) */}
      <header className="relative bg-[#08101E] pt-28 sm:pt-36 pb-36 sm:pb-44 px-4 sm:px-6 lg:px-8 rounded-b-[3rem] md:rounded-b-[5rem] overflow-hidden shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF690B]/15 rounded-full blur-[140px] animate-pulse pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-gray-400 mb-6">
            <Link href="/" className="hover:text-[#FF690B] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <Link href="/Blogs" className="hover:text-[#FF690B] transition-colors">
              Blogs
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
            <span className="text-[#FF690B] px-2.5 py-0.5 rounded-full bg-[#FF690B]/15 border border-[#FF690B]/30">
              {blog.category}
            </span>
          </nav>

          <div data-aos="fade-up">
            {/* Meta badges */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 text-xs text-gray-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#FF690B]" />
                {blog.postedDate}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white font-medium">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {blog.readTime}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Verified Editorial
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-6">
              {blog.title}
            </h1>

            {/* Subtitle */}
            {blog.subtitle && (
              <p className="text-lg sm:text-2xl font-medium text-gray-300 leading-relaxed max-w-4xl mb-8 opacity-90">
                {blog.subtitle}
              </p>
            )}

            {/* Author + Share Bar Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/20 bg-white p-1.5 shrink-0 shadow-lg flex items-center justify-center">
                  <img
                    src={blog.author.avatar || "/image/logo.png"}
                    alt={blog.author.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white tracking-tight">
                    {blog.author.name}
                  </h2>
                  <p className="text-xs text-gray-400">{blog.author.role}</p>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-[#FF690B]" /> Share:
                </span>
                <button
                  onClick={shareOnWhatsApp}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-emerald-600 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title="Share on WhatsApp"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnLinkedIn}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-blue-600 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title="Share on LinkedIn"
                  aria-label="Share on LinkedIn"
                >
                  <FaLinkedinIn className="w-4 h-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-sky-500 text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer"
                  title="Share on Twitter"
                  aria-label="Share on Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF690B] text-white border border-white/15 flex items-center justify-center transition-all hover:scale-110 shadow-lg cursor-pointer relative"
                  title="Copy Link"
                  aria-label="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 🖼️ 3D COVER IMAGE SHOWCASE (Overlapping Hero into #FFF4E5) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-24 sm:-mt-28 relative z-20 mb-16" data-aos="zoom-in">
        <div className="relative group rounded-3xl sm:rounded-[2.5rem] overflow-hidden p-1.5 sm:p-2 bg-white border border-orange-200/80 shadow-[0_25px_60px_-15px_rgba(8,16,30,0.18)]">
          <div className="relative h-64 sm:h-96 md:h-[480px] w-full rounded-2xl sm:rounded-[2.2rem] overflow-hidden">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08101E]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-[#08101E]/90 backdrop-blur-md border border-white/15 text-white text-xs font-black uppercase tracking-wider shadow-lg">
                {blog.category}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 📖 ARTICLE CONTENT + SIDEBAR GRID */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MAIN ARTICLE BODY (8 Columns) */}
          <main className="lg:col-span-8 space-y-12">
            
            {/* Lead Excerpt Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-orange-200/80 shadow-lg">
              <p className="text-lg sm:text-xl font-bold text-[#08101E] leading-relaxed italic border-l-4 border-[#FF690B] pl-4 sm:pl-6">
                {blog.description}
              </p>
            </div>

            {/* SECTIONS RENDERER */}
            {blog.sections.map((sec, idx) => (
              <section
                key={idx}
                id={`sec-${idx}`}
                className="space-y-6"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <h2 className="text-2xl sm:text-3xl font-black text-[#08101E] tracking-tight flex items-center gap-3">
                  <span className="w-2.5 h-7 rounded-full bg-gradient-to-b from-[#FF690B] to-[#FF8C00] shrink-0" />
                  {sec.title}
                </h2>

                {/* 3D Quote Style */}
                {sec.quote && (
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-white border-l-8 border-[#FF690B] shadow-xl overflow-hidden group">
                    <p className="text-xl sm:text-2xl font-black text-[#08101E] italic tracking-tight leading-snug">
                      "{sec.quote}"
                    </p>
                  </div>
                )}

                {/* Highlight Callout Box */}
                {sec.highlight && (
                  <div className="p-6 sm:p-7 rounded-3xl bg-orange-50/90 border border-orange-200/90 flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-[#08101E] text-[#FF690B] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#08101E] leading-relaxed">
                      {sec.highlight}
                    </p>
                  </div>
                )}

                {/* Paragraphs */}
                {sec.paragraphs && sec.paragraphs.length > 0 && (
                  <div className="space-y-4">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className={`text-gray-700 text-base sm:text-lg leading-relaxed font-medium ${
                          idx === 0 && pIdx === 0
                            ? "first-letter:text-5xl sm:first-letter:text-6xl first-letter:font-black first-letter:text-[#FF690B] first-letter:float-left first-letter:mr-3 first-letter:leading-none"
                            : ""
                        }`}
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                )}

                {/* Bullets List */}
                {sec.bullets && sec.bullets.length > 0 && (
                  <div className="grid grid-cols-1 gap-3.5 pt-2">
                    {sec.bullets.map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-orange-100 hover:border-[#FF690B]/60 shadow-sm transition-all duration-300"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#FF690B] shrink-0 mt-0.5" />
                        <span className="text-sm sm:text-base text-gray-800 leading-relaxed font-semibold">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparison Table */}
                {sec.table && (
                  <div className="overflow-x-auto rounded-2xl border border-orange-200 bg-white shadow-lg my-6">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-orange-100 bg-[#08101E] text-white">
                          {sec.table.headers.map((h, hIdx) => (
                            <th
                              key={hIdx}
                              className="px-5 py-4 font-black uppercase tracking-wider text-xs"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-orange-50">
                        {sec.table.rows.map((r, rIdx) => (
                          <tr key={rIdx} className="hover:bg-orange-50/40 transition-colors">
                            {r.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-5 py-3.5 text-gray-800 ${cIdx === 0 ? "font-black text-[#08101E]" : "font-medium"}`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {/* 🎯 KEY TAKEAWAYS 3D CARD */}
            {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
              <div
                className="p-8 sm:p-10 rounded-[2.5rem] bg-[#08101E] text-white border border-white/10 shadow-2xl relative overflow-hidden"
                data-aos="zoom-in"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF690B]/15 rounded-full blur-[90px] pointer-events-none" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF690B]/20 border border-[#FF690B]/30 text-[#FF690B] text-xs font-black uppercase tracking-wider mb-5">
                    <Sparkles className="w-3.5 h-3.5" /> Key Takeaways
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-6">
                    What You Should Remember
                  </h3>
                  <div className="space-y-4">
                    {blog.keyTakeaways.map((point, kIdx) => (
                      <div key={kIdx} className="flex items-start gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-[#FF690B] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                          {kIdx + 1}
                        </div>
                        <p className="text-sm sm:text-base text-gray-200 font-medium leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 🏷️ TAGS CLOUD */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="pt-6 border-t border-orange-200/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-600 mr-2 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#FF690B]" /> Tags:
                </span>
                {blog.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-full bg-white border border-orange-200 text-xs font-bold text-gray-700 hover:text-[#FF690B] hover:border-[#FF690B] transition-colors cursor-pointer shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 🚀 COVERMANTRA CALL-TO-ACTION BANNER */}
            <div
              className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#FF690B] via-[#FF7819] to-[#E05300] text-white shadow-2xl relative overflow-hidden text-center sm:text-left"
              data-aos="fade-up"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-lg">
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-black uppercase tracking-wider">
                    Instant Comparison
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
                    Looking for the Best Loan or Insurance Rates?
                  </h4>
                  <p className="text-white/95 text-sm leading-relaxed font-medium">
                    Compare 30+ RBI-registered banks and top insurers on CoverMantra with instant paperless approvals.
                  </p>
                </div>
                <Link
                  href="/personal-loans"
                  className="shrink-0 px-8 py-4 rounded-2xl bg-[#08101E] text-white font-black text-sm uppercase tracking-wider shadow-2xl hover:bg-[#050811] hover:scale-105 transition-all flex items-center gap-2 group"
                >
                  Check Offers
                  <ArrowRight className="w-4 h-4 text-[#FF690B] group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </main>

          {/* STICKY SIDEBAR (4 Columns) */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* TABLE OF CONTENTS */}
            <div className="sticky top-28 p-6 sm:p-7 rounded-3xl bg-white border border-orange-100 shadow-xl space-y-6">
              <div className="flex items-center gap-2 text-[#08101E] font-black text-sm uppercase tracking-wider border-b border-gray-100 pb-4">
                <BookOpen className="w-4 h-4 text-[#FF690B]" />
                Article Sections
              </div>
              <nav className="space-y-2">
                {blog.sections.map((sec, sIdx) => (
                  <a
                    key={sIdx}
                    href={`#sec-${sIdx}`}
                    className="block text-xs sm:text-sm text-gray-600 hover:text-[#FF690B] hover:translate-x-1 transition-all py-1 font-bold border-l-2 border-transparent hover:border-[#FF690B] pl-3"
                  >
                    {sIdx + 1}. {sec.title}
                  </a>
                ))}
              </nav>

              {/* Fast Loan Check Mini-Widget */}
              <div className="p-5 rounded-2xl bg-[#08101E] text-white space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FF690B] uppercase">
                  <TrendingUp className="w-4 h-4" /> Smart Calculator
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  Calculate your exact EMI and find the lowest interest lender in seconds.
                </p>
                <Link
                  href="/emi-calculator"
                  className="block text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-black text-xs shadow-lg hover:scale-105 transition-all cursor-pointer"
                >
                  Open EMI Calculator
                </Link>
              </div>

              {/* Back Link */}
              <div className="pt-2">
                <Link
                  href="/Blogs"
                  className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-[#FF690B] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#FF690B]" />
                  Back to all articles
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 📚 RELATED ARTICLES 3D CAROUSEL / GRID */}
      {relatedBlogs.length > 0 && (
        <section className="border-t border-orange-200/70 bg-[#FFF4E5] py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF690B] mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> Continue Reading
                </div>
                <h3 className="text-3xl sm:text-4xl font-black text-[#08101E] tracking-tight">
                  Related Financial Insights
                </h3>
              </div>
              <Link
                href="/Blogs"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FF690B] hover:text-[#08101E] transition-colors group"
              >
                Explore All Blogs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  href={`/Blogs/${item.slug}`}
                  className="group flex flex-col h-full rounded-3xl overflow-hidden bg-white border border-orange-100 hover:border-[#FF690B]/60 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(8,16,30,0.12)] shadow-md"
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={item.coverImage}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#08101E]/80 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-bold mb-3">
                      <Calendar className="w-3 h-3 text-[#FF690B]" />
                      {item.postedDate}
                    </div>
                    <h4 className="text-base font-black text-[#08101E] group-hover:text-[#FF690B] transition-colors line-clamp-2 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed mb-4 font-medium">
                      {item.description}
                    </p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-[#FF690B] group-hover:translate-x-1 transition-transform">
                      Read Story <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
