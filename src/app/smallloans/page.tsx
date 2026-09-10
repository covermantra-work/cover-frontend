"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Banknote, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  FileCheck 
} from "lucide-react";
import { motion } from "framer-motion";

const microLenders = [
  {
    id: "f1",
    name: "FatakPay Micro Loans",
    logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
    ticket: "₹1,000 – ₹50,000",
    disbursal: "Instant (5 Mins)",
    interest: "12% - 35.95% p.a (APR)",
    approval: "94%",
    features: ["Zero Salary Slip Required", "UPI Direct Transfer", "100% Digital KYC"],
    url: "https://web.fatakpay.com/authentication/login?utm_source=651_TT83W&utm_medium=covermantra"
  },
  {
    id: "v1",
    name: "FlexSalary Credit Line",
    logo: "https://www.vivifin.com/images/vivifi-logo.png",
    ticket: "₹5,000 – ₹3,00,000",
    disbursal: "Same Day (1-2 Hours)",
    interest: "18% - 36% p.a",
    approval: "92%",
    features: ["Reusable Credit Line", "Pay Interest Only on Used Amount", "Flexible Repayment"],
    url: "https://online.flexsalary.com/CustomerLogin/Index?CampaignID=9192300#x"
  },
  {
    id: "c1",
    name: "Credify (Creditt⁺) Loans",
    logo: "https://loan.credittnow.com/favicon.ico",
    ticket: "₹8,000 – ₹35,000",
    disbursal: "Instant (Digital KYC)",
    interest: "0.2% - 0.3% / day (APR 24%-36%)",
    approval: "93%",
    features: ["Zero Prepayment Penalty", "Direct Bank Disbursal", "91 - 365 Days Tenure"],
    url: "https://loan.credittnow.com/auth/login?utm_source=cover_mantra&utm_medium=website&utm_campaign=loan_campaign"
  }
];

export default function SmallLoansPage() {
  const router = useRouter();
  const [appliedLenders, setAppliedLenders] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("co_applied_lenders");
    if (saved) {
      try {
        setAppliedLenders(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleApply = (id: string, name: string, url: string) => {
    const now = Date.now();
    const saved = localStorage.getItem("co_applied_lenders_timestamp") || "{}";
    let timestampsObj: Record<string, number> = {};
    try {
      timestampsObj = JSON.parse(saved);
    } catch (e) {}
    timestampsObj[name] = now;
    localStorage.setItem("co_applied_lenders_timestamp", JSON.stringify(timestampsObj));

    const updated = [...new Set([...appliedLenders, name])];
    setAppliedLenders(updated);
    localStorage.setItem("co_applied_lenders", JSON.stringify(updated));

    if (name) localStorage.setItem("co_last_applied_partner", name);
    if (url) localStorage.setItem("co_last_partner_url", url);

    const phone = Cookies.get("co_phone") || localStorage.getItem("co_phone") || "";
    let targetUrl = url;
    if (id && url.startsWith("http") && !url.includes("click-redirect")) {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://www.covermantra.com' : 'http://localhost:5001');
      let redirectParams = `lenderId=${id}&phone=${phone}`;
      if (typeof window !== "undefined") {
        const currentParams = new URLSearchParams(window.location.search);
        currentParams.forEach((val, k) => {
          if (k.startsWith("utm_")) {
            redirectParams += `&${k}=${encodeURIComponent(val)}`;
          }
        });
      }
      targetUrl = `${apiBaseUrl}/api/partners/click-redirect?${redirectParams}`;
    }

    window.open(targetUrl, "_blank", "noopener,noreferrer");
    router.push(`/apply-success?partner=${encodeURIComponent(name)}&url=${encodeURIComponent(targetUrl)}`);
  };

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF7819]/30 overflow-x-hidden pt-28 pb-24">
      
      {/* 🔱 Satyam Shivam Sundaram Top Mantra Strip */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-8">
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-[#08101E]/60 font-serif tracking-[0.3em] uppercase text-xs font-bold select-none">
          <span className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#08101E]/30 to-[#08101E]/70" />
          <span>सत्यम शिवम सुंदरम</span>
          <span className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#08101E]/30 to-[#08101E]/70" />
        </div>
      </div>

      {/* 🚀 HERO SECTION WITH 3D AMBIENT GLOW & FLOATING GOLD COINS */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 mb-16 text-center">
        {/* Warm Studio Ambient Spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-[#FF7819]/20 via-amber-400/15 to-transparent rounded-full blur-[130px] pointer-events-none -z-10" />

        {/* 🪙 Floating 3D Gold Coin 1 (Left) */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 8, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-10 left-4 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_35px_rgba(245,158,11,0.4)] items-center justify-center text-amber-950 font-black text-2xl border-2 border-white/70 select-none pointer-events-none"
        >
          ₹
        </motion.div>

        {/* 🪙 Floating 3D Gold Coin 2 (Right) */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -8, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.4 }}
          className="hidden lg:flex absolute top-14 right-4 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_30px_rgba(245,158,11,0.35)] items-center justify-center text-amber-950 font-black text-xl border-2 border-white/70 select-none pointer-events-none"
        >
          ₹
        </motion.div>

        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.05),inset_0_1px_2px_rgba(255,255,255,1)] border border-slate-200/80">
          <Zap size={14} className="text-[#FF7819]" />
          <span className="uppercase tracking-widest text-[11px] font-black text-[#FF7819]">
            Urgent Cash in 10 Minutes
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#08101E] tracking-tight leading-tight mb-6">
          Instant <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00]">Small Amount Loans</span>
        </h1>

        <p className="text-base sm:text-xl text-[#08101E]/70 max-w-2xl mx-auto font-semibold leading-relaxed mb-10">
          Need quick cash from ₹1,000 to ₹50,000 for medical bills, rent, or month-end expenses? Get digital verification and direct UPI/bank transfer instantly.
        </p>

        {/* Quick Highlights Pill Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-black uppercase tracking-wider text-slate-700">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-xs border border-slate-200/60">
            <Clock size={16} className="text-[#FF7819]" />
            <span>10-Minute Disbursal</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-xs border border-slate-200/60">
            <FileCheck size={16} className="text-emerald-600" />
            <span>Aadhaar OTP Paperless</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-xs border border-slate-200/60">
            <ShieldCheck size={16} className="text-blue-600" />
            <span>100% RBI Regulated Partners</span>
          </div>
        </div>
      </section>

      {/* 💳 3D CLAYMORPHIC LENDER CARDS DECK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[#08101E] tracking-tight">
            Verified Micro-Lending Partners
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm font-semibold mt-1">
            Choose a partner below to start your express application.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {microLenders.map((lender) => {
            const isApplied = appliedLenders.includes(lender.name);
            return (
              <motion.div
                key={lender.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 p-8 sm:p-9 rounded-[3.2rem] border-4 border-white shadow-[0_25px_60px_-15px_rgba(255,120,25,0.18),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Header with Logo & Success Rate */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center h-16 w-36">
                      <img src={lender.logo} alt={lender.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div className="px-3.5 py-1.5 rounded-full bg-emerald-500 text-white font-black text-[10px] tracking-tight shadow-md">
                      {lender.approval} APPROVAL
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-black text-[#08101E] mb-5 tracking-tight">
                    {lender.name}
                  </h3>

                  {/* Amount & Speed Info Badges */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/80 p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Ticket Size</p>
                      <p className="text-sm font-black text-[#FF7819]">{lender.ticket}</p>
                    </div>
                    <div className="bg-white/80 p-3.5 rounded-2xl border border-slate-100 shadow-xs">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Speed</p>
                      <p className="text-xs font-black text-[#08101E]">{lender.disbursal}</p>
                    </div>
                  </div>

                  {/* Feature Bullets */}
                  <div className="space-y-2 mb-8">
                    {lender.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                        <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3D Tactile Apply Button */}
                <div>
                  {isApplied && (
                    <div className="text-[10px] font-black text-emerald-800 bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200 uppercase tracking-wider text-center w-fit mx-auto mb-3 shadow-xs">
                      ✓ Application In Progress
                    </div>
                  )}
                  <button
                    onClick={() => handleApply(lender.id, lender.name, lender.url)}
                    className="w-full py-4.5 rounded-[2rem] bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black text-xs uppercase tracking-wider shadow-[0_6px_0_#C2410C,0_15px_25px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:brightness-105"
                  >
                    <span>APPLY NOW FOR FAST DISBURSAL</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Bottom Back Link */}
      <div className="text-center">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-xs font-black text-[#08101E]/60 hover:text-[#FF7819] transition-colors uppercase tracking-widest"
        >
          ← Back to Homepage
        </Link>
      </div>

    </main>
  );
}
