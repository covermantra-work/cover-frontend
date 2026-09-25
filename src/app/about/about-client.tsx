"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import Partners from "../our_partners/page";
import {
  ShieldCheck,
  Zap,
  Target,
  ArrowRight,
  Lock,
  Building2,
  Maximize2,
  CheckCircle2,
  Cpu,
  BadgeCheck,
  ChevronRight,
  Scale,
  Sparkles,
  FileCheck2,
  Clock3,
  PhoneCall,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AboutPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"vision" | "tech" | "compliance">("vision");
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(760);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const stats = [
    { value: "₹1,200Cr+", label: "Credit Facilitated", sub: "Across 28+ States" },
    { value: "24+", label: "Regulated NBFCs", sub: "RBI Authorized Lenders" },
    { value: "100%", label: "Paperless Flow", sub: "Instant e-KYC Verification" },
    { value: "4.8 / 5", label: "Borrower Satisfaction", sub: "85,000+ Reviews" },
  ];

  const pillars = [
    {
      icon: <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7819]" />,
      title: "Real-Time Multi-Lender Match",
      desc: "Our automated recommendation engine scans multiple NBFC portfolios simultaneously to find the lowest APR matching your credit profile.",
      badge: "Instant Match"
    },
    {
      icon: <Clock3 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7819]" />,
      title: "Rapid Direct-to-Bank Disbursal",
      desc: "Funds are credited directly to your bank account without intermediaries, delays, or physical branch visits.",
      badge: "Fast Settlement"
    },
    {
      icon: <FileCheck2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7819]" />,
      title: "Zero Physical Documentation",
      desc: "Say goodbye to paperwork. Complete digital Aadhaar & PAN verification in under 90 seconds from your phone.",
      badge: "Digital e-KYC"
    },
    {
      icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7819]" />,
      title: "Zero Hidden Markups",
      desc: "No platform discovery fees, no broker cuts, and no hidden surprises. The comparison grid displays exact lender rates.",
      badge: "100% Free"
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF7819]" />,
      title: "Statutory & Privacy Shield",
      desc: "Bank-grade 256-bit encryption. We operate strictly under RBI digital lending directives and never sell contact data.",
      badge: "Bank-Grade SSL"
    }
  ];

  const milestones = [
    {
      year: "2024",
      tag: "Inception & MCA",
      title: "Corporate Incorporation",
      desc: "CoverMantra was incorporated (CIN: U46109DL2024PTC438732) to bring transparent, fair credit discovery to underserved borrowers across India."
    },
    {
      year: "2025",
      tag: "Strategic Expansion",
      title: "NBFC API Integrations",
      desc: "Integrated direct digital lending APIs with premier institutions including Vivifi, MoneyView, Zype, and FDPL Finance."
    },
    {
      year: "2026",
      tag: "AI Architecture",
      title: "Intelligent Routing Platform",
      desc: "Launched algorithmic eligibility matching, real-time rate comparison, and frictionless disbursal workflows."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#002140] font-sans selection:bg-[#FF7819]/25 overflow-x-hidden">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: 70% LIGHT THEME & 100% ALL-DEVICE RESPONSIVE             */}
      {/* ========================================================================= */}
      <section className="relative pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-10 sm:pb-14 md:pb-16 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5E2DA] overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#FAF8F5]">
        {/* Subtle Brand Ambient Lighting */}
        <div className="absolute w-72 sm:w-[400px] h-72 sm:h-[400px] bg-[#FF7819]/5 rounded-full blur-[80px] pointer-events-none -top-10 right-1/4" />
        <div className="absolute w-64 sm:w-[350px] h-64 sm:h-[350px] bg-[#002140]/5 rounded-full blur-[70px] pointer-events-none -bottom-10 left-6" />

        {/* Ambient Mantra Ribbon */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[#002140]/40 font-serif tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[11px] font-bold mb-3 sm:mb-4 select-none">
          <span className="h-px w-6 sm:w-14 bg-gradient-to-r from-transparent to-[#002140]/25" />
          <span>सत्यम शिवम सुंदरम</span>
          <span className="h-px w-6 sm:w-14 bg-gradient-to-l from-transparent to-[#002140]/25" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold tracking-wider uppercase mb-3 sm:mb-4 shadow-2xs"
              >
                <Sparkles size={11} className="text-[#FF7819]" />
                <span>India’s Authorized Loan Aggregator</span>
              </motion.div>

              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#002140] mb-2.5 sm:mb-3.5 leading-[1.2] tracking-tight">
                Empowering India Through <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
                  Intelligent & Transparent Lending
                </span>
              </h1>

              <p className="text-[11px] sm:text-xs md:text-sm text-[#002140]/75 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal mb-5 sm:mb-6">
                CoverMantra connects aspirational borrowers directly with India's most reputable RBI-regulated NBFCs. We eliminate physical paperwork, prevent blind credit inquiries, and deliver transparent rate discovery with zero hidden markups.
              </p>

              {/* Action Buttons: 100% Responsive on Mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                <button
                  onClick={() => router.push("/personal-loans")}
                  className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FF7819] hover:bg-[#e0650d] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <span>Explore Loan Products</span>
                  <ArrowRight size={14} />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById("the-story");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 bg-white hover:bg-[#FAF8F5] text-[#002140] text-xs sm:text-sm font-semibold rounded-xl border border-[#E5E2DA] transition-all cursor-pointer shadow-2xs"
                >
                  <span>Our Journey Roadmap</span>
                </button>
              </div>

              {/* Statutory Identity Capsule */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-[9px] sm:text-[11px] text-[#002140]/70 bg-white px-3 py-1.5 rounded-lg border border-[#E5E2DA] shadow-2xs">
                <span className="font-bold text-[#002140]">CIN: U46109DL2024PTC438732</span>
                <span className="text-slate-300">•</span>
                <span>MCA Registered</span>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <BadgeCheck size={11} /> 100% RBI Regulated Partners
                </span>
              </div>
            </div>

            {/* Right: Institutional Simulator Card (100% Responsive, no squishing on 320px) */}
            <div className="lg:col-span-5" data-aos="zoom-in">
              <div className="bg-white rounded-2xl border border-[#E5E2DA] p-4 sm:p-5 shadow-sm text-[#002140] relative">
                {/* Header */}
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E2DA]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#002140] flex items-center justify-center font-black text-white text-[11px] sm:text-xs shadow-2xs">
                      CM
                    </div>
                    <div>
                      <div className="text-[11px] sm:text-xs font-bold text-[#002140] tracking-wide">Match Engine</div>
                      <div className="text-[9px] sm:text-[10px] text-slate-500">Live Simulator</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider border border-emerald-200">
                    Live Status
                  </span>
                </div>

                {/* Simulated CIBIL Score Slider */}
                <div className="bg-[#FAF8F5] rounded-xl p-3 border border-[#E5E2DA] mb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-[#002140]/70 font-semibold text-[10px] sm:text-[11px]">Simulated CIBIL Score</span>
                    <span className="text-[11px] sm:text-xs font-black text-[#FF7819]">{simulatedScore} CIBIL</span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="850"
                    step="10"
                    value={simulatedScore}
                    onChange={(e) => setSimulatedScore(Number(e.target.value))}
                    className="w-full h-1.5 bg-[#E5E2DA] rounded-lg appearance-none cursor-pointer accent-[#FF7819]"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-medium">
                    <span>Fair (600)</span>
                    <span>Good (720)</span>
                    <span>Excellent (850)</span>
                  </div>
                </div>

                {/* Matching Result Box */}
                <div className="space-y-2 mb-3.5">
                  <div className="bg-[#002140] text-white rounded-xl p-3 flex flex-col xs:flex-row xs:items-center justify-between gap-1 shadow-2xs">
                    <div>
                      <div className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider font-semibold">Matched Lenders</div>
                      <div className="text-xs sm:text-sm font-bold text-white mt-0.5">
                        {simulatedScore >= 750 ? "14 NBFCs Competing" : simulatedScore >= 680 ? "8 NBFCs Competing" : "4 Specialized NBFCs"}
                      </div>
                    </div>
                    <div className="xs:text-right">
                      <div className="text-[8px] sm:text-[9px] text-slate-300 uppercase tracking-wider font-semibold">Indicative APR</div>
                      <div className="text-xs sm:text-sm font-bold text-emerald-400 mt-0.5">
                        {simulatedScore >= 750 ? "From 8.99% p.a." : simulatedScore >= 680 ? "From 11.49% p.a." : "From 14.99% p.a."}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#E5E2DA]">
                      <div className="text-[9px] text-slate-500 font-medium">Approval Velocity</div>
                      <div className="text-[11px] sm:text-xs font-bold text-[#002140] mt-0.5">Under 12 Mins</div>
                    </div>
                    <div className="bg-[#FAF8F5] p-2 rounded-lg border border-[#E5E2DA]">
                      <div className="text-[9px] text-slate-500 font-medium">Documentation</div>
                      <div className="text-[11px] sm:text-xs font-bold text-emerald-700 mt-0.5">100% Digital</div>
                    </div>
                  </div>
                </div>

                {/* Instant CTA inside card */}
                <button
                  onClick={() => router.push("/personal-loans")}
                  className="w-full py-2.5 bg-[#FF7819] hover:bg-[#e0650d] text-white text-xs font-bold rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Check Personalized Rates</span>
                  <ChevronRight size={13} />
                </button>

                <div className="mt-2 text-center text-[9px] text-slate-500 flex items-center justify-center gap-1">
                  <Lock size={9} className="text-[#FF7819]" />
                  <span>Checking does not affect your official credit score</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. STATS RIBBON: RESPONSIVE 2-COL (MOBILE) / 4-COL (DESKTOP)             */}
      {/* ========================================================================= */}
      <section className="relative -mt-4 sm:-mt-6 z-20 max-w-6xl mx-auto px-3.5 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#E5E2DA] shadow-xs p-3 sm:p-4 text-center flex flex-col justify-center"
            >
              <div className="text-lg sm:text-xl md:text-2xl font-black text-[#002140] tracking-tight">
                {item.value}
              </div>
              <div className="text-[10px] sm:text-xs font-bold text-[#FF7819] mt-0.5">
                {item.label}
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 mt-0.5 line-clamp-1">
                {item.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. KNOWLEDGE HUB: ALL-DEVICE RESPONSIVE TABS & PANELS                     */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            The CoverMantra Advantage
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#002140] tracking-tight">
            How We Are Transforming <span className="text-[#FF7819]">Credit Access</span>
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#002140]/70 mt-1 font-medium px-2">
            Explore our core pillars across mission vision, algorithmic routing, and statutory safeguards.
          </p>

          {/* Interactive Responsive Tab Switcher */}
          <div className="mt-5 w-full flex justify-center">
            <div className="inline-flex max-w-full p-1 bg-white border border-[#E5E2DA] rounded-xl shadow-2xs overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setActiveTab("vision")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "vision"
                    ? "bg-[#002140] text-white shadow-2xs"
                    : "text-[#002140]/70 hover:text-[#002140]"
                }`}
              >
                1. Mission & Vision
              </button>
              <button
                onClick={() => setActiveTab("tech")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "tech"
                    ? "bg-[#002140] text-white shadow-2xs"
                    : "text-[#002140]/70 hover:text-[#002140]"
                }`}
              >
                2. Technology & Routing
              </button>
              <button
                onClick={() => setActiveTab("compliance")}
                className={`px-3 sm:px-4 py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === "compliance"
                    ? "bg-[#002140] text-white shadow-2xs"
                    : "text-[#002140]/70 hover:text-[#002140]"
                }`}
              >
                3. Compliance & Governance
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-4 sm:p-6 md:p-8 shadow-sm min-h-[280px] flex items-center">
          <AnimatePresence mode="wait">
            {activeTab === "vision" && (
              <motion.div
                key="vision"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full"
              >
                <div className="lg:col-span-7">
                  <div className="w-8 h-8 rounded-lg bg-[#FF7819]/10 text-[#FF7819] flex items-center justify-center mb-2.5">
                    <Target size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#002140] mb-2">
                    Eliminating Friction & Opaque Banking Barriers
                  </h3>
                  <p className="text-xs sm:text-sm text-[#002140]/75 leading-relaxed mb-2.5">
                    Traditional borrowing in India has long been burdened by aggressive sales agents, non-transparent processing deductions, and tedious physical branch visits. CoverMantra was conceived to restore complete sovereignty back to the borrower.
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#002140]/70 leading-relaxed mb-3.5">
                    We aggregate the widest spectrum of institutional credit—from micro-personal lines to high-ticket business financing—enabling honest apples-to-apples comparison in seconds.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-[#002140]">
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Equal Credit Opportunity</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">No Discriminatory Pricing</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">100% Free for Users</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#FAF8F5] rounded-xl p-3.5 sm:p-4 border border-[#E5E2DA]">
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FF7819] mb-2">
                    Our Operational Promise
                  </h4>
                  <ul className="space-y-2 text-xs text-[#002140]/80">
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zero Platform Surcharges:</strong> We never charge borrowers a convenience fee.</span>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Objective Sorting:</strong> Lenders are ranked strictly by best rate and eligibility fit.</span>
                    </li>
                    <li className="flex items-start gap-1.5 sm:gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>No Unsolicited Spam:</strong> Your contact data is strictly shielded from third-party calls.</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === "tech" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full"
              >
                <div className="lg:col-span-7">
                  <div className="w-8 h-8 rounded-lg bg-[#002140] text-[#FF7819] flex items-center justify-center mb-2.5">
                    <Cpu size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#002140] mb-2">
                    Algorithmic Matching & Direct Open-Banking APIs
                  </h3>
                  <p className="text-xs sm:text-sm text-[#002140]/75 leading-relaxed mb-2.5">
                    CoverMantra's recommendation engine evaluates credit parameters, employment stability, debt-to-income ratios, and NBFC risk policies simultaneously.
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#002140]/70 leading-relaxed mb-3.5">
                    Instead of firing blind applications that damage your CIBIL score, our soft-pull technology routes your request exclusively to lenders whose risk criteria match your profile with 90%+ confidence.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-[#002140]">
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Direct NBFC Webhooks</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Automated e-Mandate</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Instant Aadhaar e-KYC</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#002140] rounded-xl p-3.5 sm:p-4 text-white border border-[#00386b]">
                  <div className="flex items-center justify-between mb-2.5 border-b border-white/10 pb-1.5">
                    <span className="text-[11px] sm:text-xs font-bold text-white">Pipeline Execution Speed</span>
                    <span className="text-[9px] text-emerald-400 font-bold uppercase">Sub-Second APIs</span>
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-300">Identity Verification</span>
                      <span className="font-semibold text-white">3.2 Seconds</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-300">Multi-NBFC Eligibility Match</span>
                      <span className="font-semibold text-white">4.8 Seconds</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-slate-300">Sanction Letter Issuance</span>
                      <span className="font-semibold text-white">Instant / In-Session</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-300">Direct Disbursal Velocity</span>
                      <span className="font-semibold text-emerald-400">Under 24 Hours</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "compliance" && (
              <motion.div
                key="compliance"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8 items-center w-full"
              >
                <div className="lg:col-span-7">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                    <ShieldCheck size={16} />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-[#002140] mb-2">
                    Strict Regulatory & Digital Lending Governance
                  </h3>
                  <p className="text-xs sm:text-sm text-[#002140]/75 leading-relaxed mb-2.5">
                    CoverMantra strictly adheres to the Reserve Bank of India’s (RBI) Digital Lending Guidelines. We act solely as a technology facilitator and loan aggregator, partnering exclusively with verified, licensed Non-Banking Financial Companies (NBFCs).
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#002140]/70 leading-relaxed mb-3.5">
                    All loan disbursals and repayments occur directly between the borrower's bank account and the regulated entity, eliminating any custodial risks.
                  </p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-[11px] font-semibold text-[#002140]">
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">RBI DL Compliance</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Grievance Desk</span>
                    <span className="px-2.5 py-1 bg-[#FAF8F5] border border-[#E5E2DA] rounded-md">Data Privacy Protocol</span>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#FAF8F5] rounded-xl p-3.5 sm:p-4 border border-[#E5E2DA]">
                  <h4 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#002140] mb-2">
                    Corporate & Statutory Overview
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase">Entity Name</div>
                      <div className="font-bold text-[#002140]">CoverMantra Fintech Private Limited</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase">Corporate Identity Number</div>
                      <div className="font-bold text-[#002140] font-mono break-all">U46109DL2024PTC438732</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase">Goods & Services Tax (GSTIN)</div>
                      <div className="font-bold text-[#002140] font-mono break-all">06AAMCC2334C1Z3</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase">Registered Jurisdiction</div>
                      <div className="font-semibold text-[#002140]">Registrar of Companies, Delhi / Haryana, India</div>
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-semibold uppercase">Grievance Redressal</div>
                      <div className="font-semibold text-emerald-700">support@covermantra.com</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE STORY & MILESTONES (100% RESPONSIVE)                               */}
      {/* ========================================================================= */}
      <section id="the-story" className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-8 sm:py-12" data-aos="fade-up">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FF7819]/10 border border-[#FF7819]/20 text-[#FF7819] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2">
            Milestones & Trajectory
          </div>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-[#002140] tracking-tight">
            The <span className="text-[#FF7819]">CoverMantra</span> Journey
          </h2>
          <p className="text-[11px] sm:text-xs md:text-sm text-[#002140]/65 max-w-lg mx-auto mt-1 font-medium px-2">
            From humble beginnings to an authoritative financial technology gateway.
          </p>
          <div className="w-10 sm:w-12 h-1 bg-[#FF7819] mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 3 Milestone Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-[#E5E2DA] p-4 sm:p-5 shadow-2xs hover:border-[#FF7819]/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-lg sm:text-xl font-black text-[#002140] tracking-tight">
                    {m.year}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#FF7819]/10 text-[#FF7819] text-[9px] font-bold uppercase tracking-wider">
                    {m.tag}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#002140] mb-1">
                  {m.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#002140]/70 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>

              <div className="mt-3.5 pt-2 border-t border-[#E5E2DA]/60 flex items-center gap-1 text-[10px] font-semibold text-[#002140]/60">
                <CheckCircle2 size={11} className="text-[#FF7819]" />
                <span>Verified Milestone</span>
              </div>
            </div>
          ))}
        </div>

        {/* Roadmap Poster Interactive Viewer */}
        <div className="bg-white p-3 sm:p-4 rounded-xl border border-[#E5E2DA] shadow-2xs">
          <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[#E5E2DA]">
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-[#002140] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF7819]" />
                Official Journey & Vision Roadmap
              </h3>
              <p className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5">
                Detailed timeline: Shuruaat se Bharosa tak
              </p>
            </div>

            <button
              onClick={() => setIsPosterModalOpen(true)}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#002140] hover:bg-[#002f5c] text-white text-[11px] sm:text-xs font-bold transition-all cursor-pointer shadow-2xs w-fit"
            >
              <Maximize2 size={12} />
              <span>Open High-Res Viewer</span>
            </button>
          </div>

          {/* Horizontally scrollable container with smooth mobile scroll */}
          <div className="overflow-x-auto custom-scrollbar rounded-lg border border-slate-100 bg-slate-50">
            <img
              src="/image/CM-Poster.jpeg"
              alt="CoverMantra Journey: Shuruaat se Bharosa tak"
              className="w-full h-auto min-w-[650px] md:min-w-full cursor-zoom-in block"
              onClick={() => setIsPosterModalOpen(true)}
            />
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[#002140]/50 font-bold text-[9px] uppercase tracking-wider mt-2 md:hidden">
            <span>← Swipe horizontally to inspect roadmap →</span>
          </div>
        </div>
      </section>

      {/* FULL SCREEN POSTER MODAL (ALL-DEVICE SAFE DIALOG) */}
      {isPosterModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[88vh] overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-3 border-b border-[#E5E2DA]">
              <h3 className="text-xs sm:text-sm font-bold text-[#002140]">CoverMantra Journey Roadmap</h3>
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center font-bold text-xs transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={14} />
              </button>
            </div>
            <div className="overflow-auto p-2 flex items-center justify-center bg-slate-900/10">
              <img
                src="/image/CM-Poster.jpeg"
                alt="CoverMantra Full Journey"
                className="max-w-full h-auto rounded-lg shadow-2xs"
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. 30% DARK THEME: WHY CHOOSE US (RESPONSIVE GRID)                        */}
      {/* ========================================================================= */}
      <section className="bg-[#001d38] py-10 sm:py-14 px-3.5 sm:px-6 relative border-y border-[#002b54]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#FF7819] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2">
              The CoverMantra Advantage
            </div>
            <h2 data-aos="fade-up" className="text-lg sm:text-2xl md:text-3xl font-black text-white tracking-tight">
              Why Borrowers & Businesses <span className="text-[#FF7819]">Choose Us</span>
            </h2>
            <p className="text-[11px] sm:text-xs md:text-sm text-slate-300 max-w-md mx-auto mt-1 font-medium px-2">
              We redesigned the borrowing lifecycle from the user's perspective.
            </p>
            <div className="w-10 sm:w-12 h-1 bg-[#FF7819] mx-auto mt-2.5 rounded-full" />
          </div>

          {/* 1 col on mobile, 2 col on tablet, 5 col on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-3.5">
            {pillars.map((item, i) => (
              <motion.div
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 50}
                className="p-3.5 sm:p-4 bg-[#00284d] rounded-xl border border-[#00386b] hover:border-[#FF7819] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#FF7819]/15 flex items-center justify-center group-hover:bg-[#FF7819] group-hover:text-white transition-colors duration-300">
                      {item.icon}
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-white mb-1 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-[10px] sm:text-[11px] leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1 text-[9px] sm:text-[10px] font-bold text-[#FF7819] opacity-80 group-hover:opacity-100">
                  <span>Learn more</span>
                  <ChevronRight size={10} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. PARTNERS SECTION                                                       */}
      {/* ========================================================================= */}
      <div className="py-2 sm:py-4">
        <Partners />
      </div>

      {/* ========================================================================= */}
      {/* 7. FINAL CALL TO ACTION: COMPACT & 100% RESPONSIVE                        */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto mb-10 sm:mb-16 px-3.5 sm:px-6">
        <div className="relative bg-gradient-to-br from-[#002140] via-[#00172e] to-[#001020] rounded-2xl p-5 sm:p-8 md:p-10 text-white text-center overflow-hidden shadow-md border border-[#00386b]">
          {/* Subtle Ambient Glows */}
          <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#FF7819]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#FF7819] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2.5">
              <Sparkles size={10} className="text-[#FF7819]" />
              <span>Instant Digital Eligibility Discovery</span>
            </div>

            <h2 data-aos="fade-up" className="text-lg sm:text-2xl md:text-3xl font-black mb-2 leading-tight tracking-tight">
              Ready to Discover Your <br className="hidden sm:inline" /> Best Loan Offers?
            </h2>

            <p data-aos="fade-up" data-aos-delay="60" className="text-[11px] sm:text-xs md:text-sm text-slate-300 font-normal leading-relaxed mb-4 sm:mb-5">
              Compare 24+ RBI-regulated NBFCs, check your verified rate options without hurting your credit score, and enjoy prompt direct bank transfers.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-2.5">
              <button
                className="w-full sm:w-auto px-5 py-2.5 bg-[#FF7819] hover:bg-[#e0650d] text-white text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                onClick={() => router.push("/personal-loans")}
              >
                <span>Check Eligibility in 2 Mins</span>
                <ArrowRight size={14} />
              </button>

              <button
                className="w-full sm:w-auto px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                onClick={() => router.push("/contact")}
              >
                <PhoneCall size={12} className="text-[#FF7819]" />
                <span>Speak to Support Desk</span>
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1 text-[9px] sm:text-[10px] text-slate-300">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-400" /> Zero Impact on CIBIL
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-400" /> 100% Free Comparison
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-emerald-400" /> Bank-Grade 256-Bit SSL
              </span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
