"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiLightningBolt, HiChartBar, HiClipboardCheck } from "react-icons/hi";
import { FaRocket, FaBuilding, FaCity, FaTools, FaFileInvoiceDollar, FaChartLine } from "react-icons/fa";
import { Sparkles, ArrowRight, ShieldCheck, BadgeCheck, Clock3, Lock, CheckCircle2 } from "lucide-react";

export default function BusinessLoansPage() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#002140] font-sans selection:bg-[#FF7819]/25 overflow-x-hidden">

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: 70% LIGHT BASE & MATCHING INSTITUTIONAL TYPOGRAPHY       */}
      {/* ========================================================================= */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5E2DA] overflow-hidden">
        {/* Subtle Ambient Studio Lighting */}
        <div className="absolute top-0 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#FF7819]/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-[#002140]/5 rounded-full blur-[90px] pointer-events-none -ml-20 -mb-20" />

        {/* Ambient Mantra Ribbon */}
        <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[#002140]/40 font-serif tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[11px] font-bold mb-3 sm:mb-4 select-none">
          <span className="h-px w-6 sm:w-14 bg-gradient-to-r from-transparent to-[#002140]/25" />
          <span>सत्यम शिवम सुंदरम</span>
          <span className="h-px w-6 sm:w-14 bg-gradient-to-l from-transparent to-[#002140]/25" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          
          {/* Top Status Badges (Coming Soon & Fast-Track) */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-3 sm:mb-3.5">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#FF7819]/10 border border-[#FF7819]/25 text-[#FF7819] text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs"
            >
              <Clock3 size={11} className="animate-spin" style={{ animationDuration: '6s' }} />
              <span>Coming Soon • Pre-Launch Pipeline</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider shadow-2xs"
            >
              <Sparkles size={11} className="text-[#FF7819]" />
              <span>Fast-Track Enterprise Capital</span>
            </motion.div>
          </div>

          {/* Main Hero Heading: Exactly matching about-client.tsx */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#002140] mb-2 sm:mb-3 leading-[1.2] tracking-tight max-w-3xl mx-auto"
          >
            Empower Your Business with <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
              Flexible Funding
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm md:text-[15px] text-[#002140]/75 leading-relaxed font-normal max-w-2xl mx-auto px-2 mb-8 sm:mb-10"
          >
            Tailored loan solutions for Startups, MSMEs, and Enterprises. Faster digital approvals. Competitive interest rates. Zero hassle.
          </motion.p>

          {/* Target Cards Row (Startups, SMEs, Enterprises) */}
          <div className="grid gap-3.5 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 text-left">
            {[
              {
                icon: <FaRocket />,
                title: "For Startups",
                desc: "Fast working capital and seed-stage funds to build, hire, and scale your product.",
                tag: "Seed to Series A",
              },
              {
                icon: <FaBuilding />,
                title: "For SMEs",
                desc: "Grow your business with inventory, machinery, marketing, and team expansion loans.",
                tag: "Working Capital",
              },
              {
                icon: <FaCity />,
                title: "For Enterprises",
                desc: "Large-scale credit lines with customized tenure, competitive APR, and dedicated support.",
                tag: "Bespoke Lines",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className="group bg-white rounded-xl sm:rounded-2xl border border-[#E5E2DA] p-5 sm:p-6 shadow-2xs hover:border-[#FF7819]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2.5 mb-3 border-b border-[#E5E2DA]/60">
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      <BadgeCheck size={11} /> {card.tag}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-bold uppercase">
                      Upcoming
                    </span>
                  </div>

                  <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E5E2DA]/60 flex items-center justify-center text-[#FF7819] text-lg mb-3.5 group-hover:bg-[#FF7819] group-hover:text-white transition-all duration-300 shadow-2xs">
                    {card.icon}
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-[#002140] mb-1.5 tracking-tight group-hover:text-[#FF7819] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#002140]/75 text-xs sm:text-[13px] leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EDUCATIONAL SECTION                                                    */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-3.5 sm:px-6 max-w-4xl mx-auto text-center" data-aos="fade-up">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
          <ShieldCheck size={12} className="text-[#FF7819]" />
          <span>Product Overview & Objectives</span>
        </div>

        <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-2 text-[#002140] tracking-tight">
          What is a <span className="text-[#FF7819]">Business Loan?</span>
        </h2>
        <div className="w-12 h-1 bg-[#FF7819] mx-auto rounded-full mb-3" />
        
        <p className="text-[#002140]/75 text-xs sm:text-sm md:text-[14px] leading-relaxed font-normal max-w-3xl mx-auto">
          A business loan provides financial support for growth, working capital, commercial expansion, equipment purchase, or other operational needs. Whether you're launching a venture or taking an established business to the next stage, our upcoming digital loan solutions fuel your vision with total transparency and zero hidden markups.
        </p>
      </section>

      {/* ========================================================================= */}
      {/* 3. TYPES OF BUSINESS LOANS (6 TILES GRID)                                 */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-3.5 sm:px-6 lg:px-8 border-y border-[#E5E2DA] bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#002140] tracking-tight mb-1.5">
              Types of <span className="text-[#FF7819]">Business Loans</span>
            </h2>
            <p className="text-slate-500 font-medium text-xs sm:text-[13px]">
              Tailored financial vehicles matched to your operational revenue cycles
            </p>
          </div>

          <div className="grid gap-3.5 sm:gap-4 md:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaTools />, title: "Working Capital Loans", desc: "Short-term funds to balance seasonal cash flows, vendor payments, and daily overheads." },
              { icon: <FaRocket />, title: "Startup Seed Loans", desc: "Collateral-free capital designed to help registered startups scale early traction." },
              { icon: <FaBuilding />, title: "Equipment Financing", desc: "Specialized asset-backed financing to purchase modern heavy machinery or technology." },
              { icon: <FaFileInvoiceDollar />, title: "Invoice Discounting", desc: "Unlock immediate liquidity by converting verified pending client invoices into cash." },
              { icon: <FaChartLine />, title: "Term Growth Loans", desc: "Long-term structured growth funding with predictable monthly repayment schedules." },
              { icon: <HiChartBar />, title: "Revolving Credit Line", desc: "Draw funds as you need them and pay interest strictly on the utilized amount." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 bg-[#FAF8F5] rounded-xl sm:rounded-2xl border border-[#E5E2DA] shadow-2xs hover:border-[#FF7819]/50 hover:bg-white transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#E5E2DA]/80 flex items-center justify-center text-[#FF7819] mb-3 group-hover:bg-[#FF7819] group-hover:text-white transition-all duration-300 shadow-2xs text-base">
                    {item.icon}
                  </div>
                  <h3 className="text-sm sm:text-[15px] font-black mb-1.5 text-[#002140] tracking-tight group-hover:text-[#FF7819] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[#002140]/75 text-xs sm:text-[13px] font-normal leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. WHY CHOOSE OUR BUSINESS LOANS? (3 PILLARS)                             */}
      {/* ========================================================================= */}
      <section className="py-12 sm:py-16 px-3.5 sm:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#002140] tracking-tight mb-1.5">
            Why Choose Our <span className="text-[#FF7819]">Business Loans?</span>
          </h2>
          <p className="text-slate-500 font-medium text-xs sm:text-[13px]">
            Institutional underwriting built on speed, compliance, and custom tenures
          </p>
        </div>

        <div className="grid gap-3.5 sm:gap-5 md:grid-cols-3">
          {[
            {
              icon: <HiLightningBolt />,
              title: "Fast Disbursal",
              desc: "Automated underwriting algorithms ensure rapid decisions and swift capital deployment directly into your account.",
            },
            {
              icon: <HiChartBar />,
              title: "Custom Loan Plans",
              desc: "Flexible tenure and structured repayment terms crafted to match your business seasonal cash flow patterns.",
            },
            {
              icon: <HiClipboardCheck />,
              title: "Minimal Documentation",
              desc: "Digitally upload bank statements and GST filings with zero physical branch visits or manual paperwork.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-5 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-[#E5E2DA] shadow-2xs hover:border-[#FF7819]/50 transition-all duration-300 text-left"
            >
              <div className="w-11 h-11 rounded-xl bg-[#FAF8F5] border border-[#E5E2DA] flex items-center justify-center text-xl text-[#FF7819] mb-3.5 shadow-2xs">
                {item.icon}
              </div>
              <h3 className="text-sm sm:text-base font-black mb-1.5 text-[#002140] tracking-tight">
                {item.title}
              </h3>
              <p className="text-[#002140]/75 text-xs sm:text-[13px] font-normal leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. EXECUTIVE STATUTORY UNDERWRITING DOCKET & CTA (30% DARK ANCHOR)        */}
      {/* ========================================================================= */}
      <section className="pb-14 sm:pb-20 px-3.5 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#002140] via-[#00172e] to-[#000f20] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white border border-[#00386b] shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7819]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Statutory Trust Badges */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#FF7819] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <Lock size={10} />
                <span>Statutory Enterprise Governance Standards</span>
              </div>

              <h2 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                Ready to Accelerate Your Business?
              </h2>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-3 sm:mb-4 max-w-2xl">
                Apply today and unlock smart capital designed to help your enterprise thrive. CoverMantra operates strictly under the Reserve Bank of India’s Digital Lending Framework. 100% digital, transparent, and direct from regulated partner balance sheets.
              </p>

              {/* Statutory Pillars */}
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300 mb-4 sm:mb-5">
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Direct Bank Disbursals
                </span>
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> 256-Bit SSL Encryption
                </span>
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Zero Upfront Cash
                </span>
              </div>

              {/* Direct CTA Button (No form) */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#FF7819] hover:bg-[#e0650d] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-[13px] uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Talk to a Loan Specialist</span>
                <ArrowRight size={14} />
              </motion.a>
            </div>

            {/* Right Column: Statutory Corporate Details */}
            <div className="lg:col-span-4 bg-white/[0.05] backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs space-y-2.5">
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Authorized Operating Entity</span>
                <span className="font-bold text-white text-xs">CoverMantra Services Private Limited</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Corporate Identity (CIN)</span>
                <span className="font-mono text-[#FF7819] font-bold text-xs">U46109DL2024PTC438732</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 uppercase font-bold block">Goods & Services Tax (GSTIN)</span>
                <span className="font-mono text-white font-bold text-xs">06AAMCC2334C1Z3</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                <span>Enterprise Desk</span>
                <span className="text-emerald-400 font-semibold">Active & Monitored</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
