"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  CheckCircle, 
  Smartphone, 
  ShieldCheck, 
  Coins, 
  Zap, 
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Award
} from "lucide-react";

// Official Google Play Store Vector Icon
function GooglePlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.609 1.814L13.793 12 3.61 22.186A1.9 1.9 0 0 1 3 20.736V3.264c0-.57.23-1.08.609-1.45z" fill="#00C3FF"/>
      <path d="M17.18 8.613L13.793 12 3.61 1.814A1.89 1.89 0 0 1 4.55 1.43c.34 0 .66.12.91.32l11.72 6.863z" fill="#00E676"/>
      <path d="M17.18 15.387L5.46 22.25c-.25.2-.57.32-.91.32a1.89 1.89 0 0 1-.94-.384L13.793 12l3.387 3.387z" fill="#FF3A44"/>
      <path d="M21.54 11.12l-4.36-2.507L13.793 12l3.387 3.387 4.36-2.507c.88-.507.88-1.253 0-1.76z" fill="#FFC800"/>
    </svg>
  );
}

function ApplySuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [partnerName, setPartnerName] = useState<string>("Our Top Lending Partners");
  const [partnerUrl, setPartnerUrl] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check URL query parameters
    const paramPartner = searchParams.get("partner") || searchParams.get("lender");
    const paramUrl = searchParams.get("url") || searchParams.get("redirectUrl");

    // 2. Check localStorage fallbacks
    const localPartner = typeof window !== "undefined" ? localStorage.getItem("co_last_applied_partner") : null;
    const localUrl = typeof window !== "undefined" ? localStorage.getItem("co_last_partner_url") : null;

    let localLastApplied = null;
    try {
      const savedLenders = localStorage.getItem("co_applied_lenders");
      if (savedLenders) {
        const arr = JSON.parse(savedLenders);
        if (Array.isArray(arr) && arr.length > 0) {
          localLastApplied = arr[arr.length - 1];
        }
      }
    } catch (e) {}

    const resolvedPartner = paramPartner || localPartner || localLastApplied || "Our Verified Lending Partners";
    const resolvedUrl = paramUrl || localUrl || null;

    setPartnerName(resolvedPartner);
    setPartnerUrl(resolvedUrl);
  }, [searchParams]);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.covermantra.loan";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 120, 
        damping: 18 
      } 
    }
  };

  const benefits = [
    {
      icon: <Zap className="text-white w-6 h-6" />,
      title: "Instant Approval Match",
      desc: "Pre-qualified matches powered by instant digital underwriting."
    },
    {
      icon: <Smartphone className="text-white w-6 h-6" />,
      title: "Real-time Tracking",
      desc: "Live visibility on paperwork verification & approval milestones."
    },
    {
      icon: <Coins className="text-white w-6 h-6" />,
      title: "Direct Bank Disbursal",
      desc: "Fastest credit directly to your account post e-Mandate approval."
    },
    {
      icon: <ShieldCheck className="text-white w-6 h-6" />,
      title: "RBI Registered Partners",
      desc: "100% paperless & secure with 256-bit bank-grade encryption."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans flex flex-col justify-between overflow-x-hidden">
      
      {/* ========================================================================= */}
      {/* PART 1: HERO SECTION & DYNAMIC PARTNER OFFER BANNER */}
      {/* ========================================================================= */}
      <section className="relative w-full bg-[#08101E] pt-24 pb-20 px-4 text-center border-b border-[#FF7819]/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
        {/* Ambient Brand Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-[#FF7819] opacity-15 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="max-w-3xl mx-auto relative z-10 flex flex-col items-center"
        >
          {/* Animated Success Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center w-22 h-22 bg-gradient-to-br from-[#FF7819] via-[#FF8A33] to-[#e66a15] rounded-[2.5rem] shadow-[0_20px_45px_rgba(255,120,25,0.45)] text-white mb-6 border-4 border-white/20"
          >
            <CheckCircle className="w-12 h-12 stroke-[2.5]" />
          </motion.div>

          {/* Partner Status Pill */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF7819]" />
            <span>Eligibility Verified</span>
          </motion.div>

          {/* User Requested Hero Message */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Congratulations!
            </h1>
            
            <div className="p-6 md:p-8 bg-white/[0.04] backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
              <p className="text-white text-lg sm:text-xl md:text-2xl font-black leading-snug">
                You are eligible for offers from{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFB900] to-[#FF8A33] underline decoration-[#FF7819]/50 underline-offset-4">
                  {partnerName}
                </span>.
              </p>
              
              <p className="mt-3 text-xs sm:text-sm text-gray-300 font-medium leading-relaxed max-w-lg mx-auto">
                Download our App or click below to complete your application directly with the lender.
              </p>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={itemVariants} className="mt-8 w-full max-w-xl flex flex-col sm:flex-row items-center justify-center gap-3.5 px-4">
            {/* Action 1: Direct Lender Link */}
            {partnerUrl ? (
              <motion.a
                href={partnerUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white font-black px-6 py-4.5 rounded-2xl shadow-[0_10px_25px_rgba(255,120,25,0.35)] hover:shadow-[0_15px_35px_rgba(255,120,25,0.5)] transition-all text-xs sm:text-sm tracking-wide group uppercase"
              >
                <span>Complete with {partnerName.split(" ")[0]}</span>
                <ArrowUpRight className="w-4 h-4 text-white/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            ) : (
              <motion.button
                onClick={() => router.push("/personal-loans")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-1/2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white font-black px-6 py-4.5 rounded-2xl shadow-[0_10px_25px_rgba(255,120,25,0.35)] transition-all text-xs sm:text-sm tracking-wide uppercase"
              >
                <span>View Lender Offers</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            )}

            {/* Action 2: App Download CTA with Official Google Play Icon */}
            <motion.a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-1/2 inline-flex items-center justify-center gap-3 bg-white text-[#08101E] hover:bg-gray-100 font-extrabold px-6 py-4 rounded-2xl shadow-xl transition-all border border-white/20 text-xs sm:text-sm group cursor-pointer"
            >
              <GooglePlayIcon className="w-7 h-7 shrink-0 group-hover:scale-110 transition-transform drop-shadow-sm" />
              <div className="text-left leading-tight">
                <span className="text-[9px] uppercase font-bold tracking-wider text-gray-500 block leading-none mb-0.5">GET IT ON</span>
                <span className="font-black text-sm sm:text-base tracking-tight text-[#08101E]">Google Play</span>
              </div>
            </motion.a>
          </motion.div>

          {/* Tertiary Navigation Link */}
          <motion.div variants={itemVariants} className="mt-5">
            <button 
              type="button"
              onClick={() => router.push("/personal-loans")}
              className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black uppercase text-[#FF7819] tracking-widest hover:text-[#FFB900] transition-colors focus:outline-none cursor-pointer"
            >
              Explore Other Available Lenders <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ========================================================================= */}
      {/* PART 2: 3-STEP REAL-TIME UNDERWRITING PIPELINE */}
      {/* ========================================================================= */}
      <section className="max-w-4xl mx-auto w-full px-4 -mt-8 relative z-20">
        <div className="bg-white/95 backdrop-blur-xl p-6 sm:p-8 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-white">
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FF7819] block mb-1">
              Live Application Stream
            </span>
            <h3 className="text-lg sm:text-xl font-black text-[#08101E] tracking-tight">
              Next Steps for Instant Disbursal
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm">
                ✓
              </div>
              <div>
                <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wide">1. Pre-Approved</h4>
                <p className="text-[11px] text-emerald-800/80 font-semibold mt-0.5">Matched with {partnerName.split(" ")[0]}</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF7819] text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm animate-pulse">
                2
              </div>
              <div>
                <h4 className="text-xs font-black text-[#08101E] uppercase tracking-wide">2. Final KYC & e-Sign</h4>
                <p className="text-[11px] text-gray-600 font-semibold mt-0.5">Complete digitally via app or web</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50/80 border border-gray-200/60 rounded-2xl flex items-start gap-3 opacity-75">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center shrink-0 font-bold text-xs">
                3
              </div>
              <div>
                <h4 className="text-xs font-black text-gray-700 uppercase tracking-wide">3. Direct Credit</h4>
                <p className="text-[11px] text-gray-500 font-semibold mt-0.5">Disbursal straight to your bank</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PART 3: EXCLUSIVE MOBILE BENEFITS SECTION */}
      {/* ========================================================================= */}
      <section className="max-w-5xl mx-auto w-full flex-grow flex flex-col items-center justify-center px-4 py-12 sm:py-16 relative z-10">
        <div className="w-full text-center mb-8">
          <h3 className="text-xl sm:text-2xl font-black text-[#08101E] tracking-tight uppercase">
            Why Complete on CoverMantra
          </h3>
          <div className="w-12 h-1 bg-[#FF7819] mx-auto mt-2 rounded-full" />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          {benefits.map((b, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              key={i} 
              className="flex gap-4 p-5 bg-white border border-white hover:border-[#FF7819]/20 rounded-[2rem] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02)] group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF7819] to-[#e66a15] rounded-2xl flex items-center justify-center shadow-md shadow-[#FF7819]/10 shrink-0">
                {b.icon}
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-[#08101E] text-base leading-tight">
                  {b.title}
                </h4>
                <p className="text-xs text-gray-500 font-semibold leading-relaxed">
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Infrastructure Security Footer */}
      <div className="text-center text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-widest py-5 border-t border-gray-200/50 w-full px-4 bg-white/50 backdrop-blur-sm">
        © 2026 CoverMantra • Verified RBI Partner Network • Bank-Grade 256-Bit SSL Security
      </div>

    </div>
  );
}

export default function ApplySuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#08101E] flex flex-col items-center justify-center font-sans">
        <div className="w-12 h-12 border-4 border-[#FF7819]/20 border-t-[#FF7819] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#FF7819] text-xs font-black tracking-widest uppercase animate-pulse">
          Loading Offer Status...
        </p>
      </div>
    }>
      <ApplySuccessContent />
    </Suspense>
  );
}