"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/axios";
import {
  ShieldCheck,
  BadgeCheck,
  ArrowUpRight,
  Lock,
  CheckCircle2
} from "lucide-react";

interface Partner {
  _id?: string;
  name: string;
  logo: string;
  link?: string;
  UTM?: string;
  priority?: number;
}

export default function OurPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Strict original fallback partners array (exact original names and links preserved)
  const fallbackPartners: Partner[] = [
    {
      name: "Vivifi",
      logo: "https://www.vivifin.com/images/vivifi-logo.png",
      link: "https://www.vivifin.com/"
    },
    {
      name: "MoneyView",
      logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg",
      link: "https://moneyview.in/"
    },
    {
      name: "Zype",
      logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg",
      link: "https://zype.onelink.me/vx8a?af_xp=custom&pid=CustomerSource&af_dp=com.zype.mobile%3A%2F%2F&deep_link_value=myZype&af_click_lookback=30d&c=Spiraea"
    },
    {
      name: "FDPL Finance",
      logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
      link: "https://www.fdplfinance.com/"
    },
    {
      name: "Credify",
      logo: "https://loan.credittnow.com/favicon.ico",
      link: "https://loan.credittnow.com/"
    }
  ];

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await api.get("/api/lenders");
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const sorted = [...res.data].sort(
            (a: Partner, b: Partner) => (a.priority || 0) - (b.priority || 0)
          );
          setPartners(sorted);
        } else {
          setPartners(fallbackPartners);
        }
      } catch (error) {
        console.error("Failed to fetch lenders from API, using fallback list:", error);
        setPartners(fallbackPartners);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="relative bg-[#FAF8F5] text-[#002140] font-sans pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-3.5 sm:px-6 lg:px-8 border-b border-[#E5E2DA] overflow-hidden selection:bg-[#FF7819]/25">
      {/* Subtle Ambient Studio Lighting */}
      <div className="absolute top-0 right-0 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-[#FF7819]/5 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-72 sm:w-[450px] h-72 sm:h-[450px] bg-[#002140]/5 rounded-full blur-[90px] pointer-events-none -ml-20 -mb-20" />

      {/* Ambient Mantra Ribbon */}
      <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3 text-[#002140]/40 font-serif tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[9px] sm:text-[11px] font-bold mb-3 sm:mb-4 select-none">
        <span className="h-px w-6 sm:w-14 bg-gradient-to-r from-transparent to-[#002140]/25" />
        <span>सत्यम शिवम सुंदरम</span>
        <span className="h-px w-6 sm:w-14 bg-gradient-to-l from-transparent to-[#002140]/25" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ========================================================================= */}
        {/* 1. HEADER: MATCHING INSTITUTIONAL TYPOGRAPHY & RATIO                      */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs"
          >
            <ShieldCheck size={12} className="text-[#FF7819]" />
            <span>Direct Lending Service Provider (LSP) Gateway</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#002140] mb-2 sm:mb-3 leading-[1.2] tracking-tight"
          >
            Institutional{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
              Lending Alliances
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-xs sm:text-sm md:text-[15px] text-[#002140]/75 leading-relaxed font-normal max-w-2xl mx-auto px-2"
          >
            Direct API integration with India’s leading RBI-registered NBFCs and Banks. Enjoy instant in-principle sanction, zero hidden brokerages, and secure direct-to-account disbursement.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* 2. PARTNERS LOGO MARQUEE: SEAMLESS AUTO-SCROLL WITH PAUSE-ON-HOVER        */}
        {/* ========================================================================= */}
        <div className="relative w-full mb-10 sm:mb-14 overflow-hidden py-3">
          {/* Edge Fade Gradients for smooth fade in/out */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-r from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 md:w-32 bg-gradient-to-l from-[#FAF8F5] via-[#FAF8F5]/80 to-transparent z-10" />

          {/* Seamless Infinite Marquee Track */}
          <div className="animate-partners-marquee flex items-center gap-4 sm:gap-6 w-max">
            {([...(partners.length > 0 ? partners : fallbackPartners), ...(partners.length > 0 ? partners : fallbackPartners), ...(partners.length > 0 ? partners : fallbackPartners), ...(partners.length > 0 ? partners : fallbackPartners)]).map((partner, index) => {
              const partnerUrl = partner.UTM || partner.link || "#";

              return (
                <a
                  key={index}
                  href={partnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group shrink-0 w-[190px] sm:w-[220px] md:w-[240px] bg-white rounded-xl sm:rounded-2xl border border-[#E5E2DA] p-4 sm:p-5 flex flex-col items-center justify-center text-center shadow-2xs hover:shadow-md hover:border-[#FF7819]/50 hover:-translate-y-1 transition-all duration-300 min-h-[140px] sm:min-h-[155px] cursor-pointer relative"
                >
                  {/* External link cue */}
                  <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#FF7819]">
                    <ArrowUpRight size={13} />
                  </div>

                  {/* Partner Logo */}
                  <div className="h-12 sm:h-14 w-full flex items-center justify-center p-1 mb-2.5">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-full max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 ease-out"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>

                  {/* Partner Name */}
                  <span className="text-xs sm:text-[13px] font-bold text-[#002140] group-hover:text-[#FF7819] transition-colors tracking-tight line-clamp-1">
                    {partner.name}
                  </span>

                  {/* Direct Partner Micro Badge */}
                  <span className="text-[9px] sm:text-[10px] text-slate-500 font-medium mt-0.5 group-hover:text-emerald-700 transition-colors flex items-center justify-center gap-1">
                    <BadgeCheck size={11} className="text-emerald-600 inline" /> Direct Disbursal
                  </span>
                </a>
              );
            })}
          </div>

          {/* User Interaction Guide */}
          <div className="flex items-center justify-center gap-1.5 mt-4 text-[11px] sm:text-xs text-slate-500 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Hover or tap any partner card to pause & explore direct sanction link</span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. EXECUTIVE STATUTORY UNDERWRITING DOCKET (30% DARK ANCHOR COMPONENT)     */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-[#002140] via-[#00172e] to-[#000f20] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white border border-[#00386b] shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7819]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[#FF7819] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-2.5">
                <Lock size={10} />
                <span>RBI Fair Practices & Underwriting Code</span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white tracking-tight mb-2">
                Zero Intermediary Capital Flow Guarantee
              </h3>

              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-3 max-w-2xl">
                CoverMantra strictly operates under the Reserve Bank of India’s Digital Lending Directives. Loan contracts, credit evaluations, and fund transfers are executed exclusively between the regulated lending institution and the borrower. No upfront fees, no escrow holding, and no hidden markups.
              </p>

              {/* Statutory Pillars */}
              <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300">
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Direct NBFC Disbursals
                </span>
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> End-to-End 256-Bit TLS
                </span>
                <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10 flex items-center gap-1">
                  <CheckCircle2 size={11} className="text-emerald-400" /> Zero Upfront Commission
                </span>
              </div>
            </div>

            {/* Right Statutory Identifiers Box */}
            <div className="lg:col-span-4 bg-white/[0.05] backdrop-blur-md rounded-xl p-4 border border-white/10 text-xs space-y-2">
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
                <span>Statutory Grievance Redressal</span>
                <span className="text-emerald-400 font-semibold">Active & Monitored</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Marquee Animation Styles */}
      <style jsx>{`
        @keyframes partnersMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-partners-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: partnersMarquee 30s linear infinite;
        }
        .animate-partners-marquee:hover,
        .animate-partners-marquee:active {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}