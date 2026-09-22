"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import LoginModal from "./LoginModal";
import GlobalModal from "./globalmodel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { ShieldCheck, CheckCircle2, Lock, Percent, Zap, Building2, ArrowRight } from "lucide-react";

export default function HeroSection() {
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const isUserAuthenticated = useAuthStore(
    (state) => state.isAuthenticated
  );
  const [loanAmount, setLoanAmount] = useState(200000);

  const calculateEmi = (p: number) => {
    const r = 0.105 / 12;
    const n = 36;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi).toLocaleString("en-IN");
  };

  useEffect(() => {
    setIsMounted(true);
    useAuthStore.getState().checkAuth();
  }, []);

  const handleApplyNow = () => {
    if (!isMounted) return;
    if (isUserAuthenticated) {
      router.push("/personal-loans");
    } else {
      setLoginOpen(true);
    }
  };

  const slides = [
    {
      src: "/image/herosec1.png",
      tagline: "Unsecured Personal Loans",
      headline: "Compare Pre-Approved <br /> <span class='text-[#FF7819]'>Personal Loan Offers</span>",
      description: "Compare pre-qualified rates from India's leading RBI-registered banks and NBFCs. Instant paperless eligibility check with zero impact on credit score."
    },
    {
      src: "/image/herosec2.png",
      tagline: "Quick Digital Verification",
      headline: "Paperless KYC, <br /> <span class='text-[#FF7819]'>Fast Disbursal</span>",
      description: "Complete your online application in minutes with transparent APR disclosures and direct bank account disbursal by regulated partners."
    },
    {
      src: "/image/herosec3.png",
      tagline: "Micro & Small Credit",
      headline: "Small Ticket Loans, <br /> <span class='text-[#FF7819]'>Flexible Repayment</span>",
      description: "Transparent short-term micro credit solutions tailored for urgent financial needs with clear interest schedules and zero hidden charges."
    },
  ];
  return (
    <section className="relative bg-[#FAF8F5] flex flex-col justify-start text-[#002140] overflow-hidden pt-20 sm:pt-24 md:pt-26 pb-4 sm:pb-6">
      
      {/* 🏛️ Subtle Institutional Ambient Lighting */}
      <div className="absolute w-[500px] h-[350px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none -top-12 left-1/2 -translate-x-1/2" />
      <div className="absolute w-[350px] h-[350px] bg-[#FF7819]/5 rounded-full blur-[120px] pointer-events-none -bottom-10 right-0" />

      {/* 🔱 Top Central Master Block */}
      <div className="w-full max-w-4xl mx-auto text-center px-4 z-20 flex flex-col items-center">
        
        {/* Satyam Shivam Sundaram Mantra Strip */}
        <div className="flex items-center justify-center gap-2 font-serif tracking-[0.25em] uppercase text-[10px] sm:text-[11px] font-bold select-none mb-2 text-slate-500">
          <span>सत्यम शिवम सुंदरम</span>
        </div>

        {/* 🎯 Bank-Grade CTA Action Button */}
        <div className="w-full flex justify-center items-center max-w-md">
          {isUserAuthenticated ? (
            <button
              onClick={() => router.push("/personal-loans")}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 bg-[#FF7819] hover:bg-[#E65C00] text-white font-bold rounded-lg text-xs sm:text-sm tracking-wide shadow-xs active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>EXPLORE LOAN OFFERS</span>
              <span className="text-xs">→</span>
            </button>
          ) : (
            <button
              onClick={handleApplyNow}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-2.5 bg-[#FF7819] hover:bg-[#E65C00] text-white font-bold rounded-lg text-xs sm:text-sm tracking-wide shadow-xs active:translate-y-0.5 transition-all cursor-pointer"
            >
              <span>CHECK LOAN ELIGIBILITY</span>
              <span className="text-xs">→</span>
            </button>
          )}
        </div>

        {/* 🏛️ Institutional Credibility Chip Strip (Govt / Bank Grade Trust) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-[11px] text-slate-600 font-medium">
          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-md border border-[#E5E2DA]/80 shadow-2xs">
            <ShieldCheck size={12} className="text-emerald-600 shrink-0" />
            <span>RBI Registered Partners</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-md border border-[#E5E2DA]/80 shadow-2xs">
            <CheckCircle2 size={12} className="text-[#FF7819] shrink-0" />
            <span>Zero Negative CIBIL Impact</span>
          </span>
          <span className="inline-flex items-center gap-1.5 bg-white px-2.5 py-0.5 rounded-md border border-[#E5E2DA]/80 shadow-2xs">
            <Lock size={12} className="text-slate-500 shrink-0" />
            <span>256-Bit SSL Encrypted</span>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4 : 4 : 4 BALANCED INSTITUTIONAL 3-COLUMN GRID */}
      {/* ========================================================================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 z-20 pb-4 mt-4 sm:mt-6">
        
        {/* ======================================================================= */}
        {/* COLUMN 1 (4 COLS): MAIN VALUE PROPOSITION & DYNAMIC HEADLINE */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 text-center lg:text-left flex flex-col items-center lg:items-start">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white rounded-md border border-[#E5E2DA]/80 mb-2 shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF7819]"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">
                  {slides[activeSlide].tagline}
                </span>
              </div>

              {/* Bank Heading */}
              <h1 
                className="text-2xl sm:text-3xl lg:text-[30px] font-extrabold leading-tight mb-2.5 tracking-tight text-[#002140]"
                dangerouslySetInnerHTML={{ __html: slides[activeSlide].headline }}
              />

              {/* Body text */}
              <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed font-normal">
                {slides[activeSlide].description}
              </p>

              {/* 3 Institutional Value Checkpoints */}
              <div className="space-y-1.5 pt-1 text-[11px] text-slate-700 font-medium text-left">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF7819] shrink-0" />
                  <span>100% Paperless e-KYC Verification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF7819] shrink-0" />
                  <span>Zero Pre-Payment & Hidden Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={13} className="text-[#FF7819] shrink-0" />
                  <span>Sanction via 15+ RBI Regulated NBFCs</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================================= */}
        {/* COLUMN 2 (4 COLS): CENTER HERO ILLUSTRATION */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 w-full flex items-center justify-center">
          <div className="relative h-52 sm:h-60 md:h-68 lg:h-72 w-full max-w-[280px] sm:max-w-[300px] flex items-center justify-center">
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              loop={true}
              onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
              className="h-full w-full"
            >
              {slides.map((slide, i) => (
                <SwiperSlide key={i} className="flex items-center justify-center">
                  <div className="relative w-full h-full p-2">
                    <Image
                      src={slide.src}
                      alt="CoverMantra Loan Service"
                      fill
                      priority={i === 0}
                      sizes="(max-width: 768px) 90vw, (max-width: 1200px) 35vw, 30vw"
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* COLUMN 3 (4 COLS): INTERACTIVE LIVE LOAN ESTIMATOR & RATE CARD */}
        {/* ======================================================================= */}
        <div className="lg:col-span-4 w-full flex justify-center lg:justify-end">
          <div className="w-full max-w-sm bg-white rounded-xl p-4 sm:p-5 border border-[#E5E2DA] shadow-xs space-y-3.5 text-left">
            
            {/* Header with Live Pulse */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-[#002140] block">Digital Loan Estimator</span>
                <span className="text-[10px] text-slate-500">Live Partner Rates</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Active
              </span>
            </div>

            {/* Interactive Amount Slider */}
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-slate-500 font-medium">Required Loan Amount</span>
                <span className="font-extrabold text-[#002140] text-sm font-mono">
                  ₹{loanAmount.toLocaleString("en-IN")}
                </span>
              </div>
              <input
                type="range"
                min="25000"
                max="1000000"
                step="25000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#FF7819]"
              />
              <div className="flex justify-between text-[9px] text-slate-400 mt-1 font-mono">
                <span>₹25,000</span>
                <span>₹5,00,000</span>
                <span>₹10,00,000</span>
              </div>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#FAF8F5] rounded-lg border border-[#E5E2DA]/60">
              <div>
                <div className="text-[10px] text-slate-500">Estimated EMI (36m)</div>
                <div className="text-xs sm:text-sm font-extrabold text-[#002140] font-mono">
                  ₹{calculateEmi(loanAmount)}<span className="text-[10px] font-normal text-slate-500">/mo</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500">Starting APR</div>
                <div className="text-xs sm:text-sm font-extrabold text-emerald-600 font-mono">
                  10.49%<span className="text-[10px] font-normal text-slate-500"> p.a.</span>
                </div>
              </div>
            </div>

            {/* Sanction TAT & Partners */}
            <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-[#FF7819]" />
                <span>10-Min Sanction</span>
              </span>
              <span className="flex items-center gap-1">
                <Building2 size={12} className="text-blue-600" />
                <span>15+ RBI Partners</span>
              </span>
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleApplyNow}
              className="w-full py-2.5 px-3 bg-[#FF7819] hover:bg-[#E65C00] text-white rounded-lg text-xs font-bold tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:translate-y-0.5"
            >
              <span>CHECK PRE-APPROVED OFFERS</span>
              <ArrowRight size={13} />
            </button>

            {/* Safety micro disclaimer */}
            <div className="text-center text-[10px] text-slate-500 flex items-center justify-center gap-1 pt-0.5">
              <Lock size={10} className="text-slate-400" />
              <span>Zero negative impact on CIBIL inquiry</span>
            </div>

          </div>
        </div>

      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <GlobalModal />
    </section>
  );
}