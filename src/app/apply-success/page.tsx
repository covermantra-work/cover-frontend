"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import {
  CheckCircle2,
  Smartphone,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Copy,
  Check,
  Camera,
  BellRing,
  Star,
  Lock
} from "lucide-react";

// Official Google Play Store Vector Icon
function GooglePlayIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.609 1.814L13.793 12 3.61 22.186A1.9 1.9 0 0 1 3 20.736V3.264c0-.57.23-1.08.609-1.45z" fill="#00C3FF" />
      <path d="M17.18 8.613L13.793 12 3.61 1.814A1.89 1.89 0 0 1 4.55 1.43c.34 0 .66.12.91.32l11.72 6.863z" fill="#00E676" />
      <path d="M17.18 15.387L5.46 22.25c-.25.2-.57.32-.91.32a1.89 1.89 0 0 1-.94-.384L13.793 12l3.387 3.387z" fill="#FF3A44" />
      <path d="M21.54 11.12l-4.36-2.507L13.793 12l3.387 3.387 4.36-2.507c.88-.507.88-1.253 0-1.76z" fill="#FFC800" />
    </svg>
  );
}

function ApplySuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [partnerName, setPartnerName] = useState<string>("Our Top Lending Partners");
  const [partnerUrl, setPartnerUrl] = useState<string | null>(null);
  const [applicationId, setApplicationId] = useState<string>("CM-2026-89421");
  const [copied, setCopied] = useState<boolean>(false);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.covermantra.loan";

  useEffect(() => {
    // 1. Resolve partner name and redirect URL
    const paramPartner = searchParams.get("partner") || searchParams.get("lender");
    const paramUrl = searchParams.get("url") || searchParams.get("redirectUrl");

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

    // Dynamic application ref id
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    setApplicationId(`CM-2026-${randomNum}`);
  }, [searchParams]);

  const handleCopyId = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(applicationId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const appPerks = [
    {
      icon: <Camera className="w-4 h-4 text-[#FF7819]" />,
      title: "1-Click Camera e-KYC",
      desc: "Instant live face-match & DigiLocker Aadhaar verification (no mobile browser permission issues)."
    },
    {
      icon: <Zap className="w-4 h-4 text-[#FF7819]" />,
      title: "3x Faster Sanction Letter",
      desc: "Native app processing prioritizes underwriting queues for quicker approval turnaround."
    },
    {
      icon: <BellRing className="w-4 h-4 text-[#FF7819]" />,
      title: "Real-Time Disbursal Tracker",
      desc: "Live push updates as soon as funds are credited directly to your bank account."
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-[#FF7819]" />,
      title: "Direct e-Mandate Integration",
      desc: "Seamless UPI & Net Banking auto-pay setup without redirection timeouts."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#002140] font-sans flex flex-col justify-between overflow-x-hidden selection:bg-[#FF7819]/25">

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR CLEARANCE & STATUTORY REF BAR                              */}
      {/* ========================================================================= */}
      <div className="pt-24 sm:pt-28 md:pt-32 pb-3 px-3.5 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-[#002140]/60 border-b border-[#E5E2DA] pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-[#002140] uppercase tracking-wider text-[10px] sm:text-xs">
              Application Pre-Approved
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="hidden sm:inline font-mono text-[11px] text-slate-500">Application ID:</span>
            <button
              onClick={handleCopyId}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E5E2DA] rounded-lg font-mono text-[11px] font-bold text-[#002140] hover:border-[#FF7819] transition-all cursor-pointer shadow-2xs"
              title="Click to copy Application ID"
            >
              <span>{applicationId}</span>
              {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} className="text-slate-400" />}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN APP-INSTALL CONVERSION ENGINE (30% DARK STRATEGIC ANCHOR)         */}
      {/* ========================================================================= */}
      <main className="max-w-4xl mx-auto w-full px-3.5 sm:px-6 flex-grow py-3 sm:py-5">
        
        {/* HERO APP GATEWAY CARD */}
        <div className="bg-gradient-to-br from-[#002140] via-[#00172e] to-[#000f20] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white border border-[#00386b] shadow-xl relative overflow-hidden mb-6">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF7819]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            {/* Success Pill & Status */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 border-b border-white/10 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                <BadgeCheck size={13} className="text-emerald-400" />
                <span>Pre-Approval Verified With {partnerName.split(" ")[0]}</span>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                <Star size={12} className="fill-amber-300 text-amber-300" />
                <span>4.8 Rating • 100K+ Active Borrowers</span>
              </div>
            </div>

            {/* Core Message & App Push Header */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-center mb-6">
              <div className="md:col-span-8">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-2">
                  Complete Your Disbursal on the{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFA34D] to-[#FFC480]">
                    CoverMantra App
                  </span>
                </h1>

                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-3 max-w-xl">
                  Lenders require camera biometric e-KYC and digital mandate verification which frequently fail on mobile browsers. Download the official CoverMantra App to finish in under 2 minutes and fast-track bank credit.
                </p>

                {/* Instant Verification Indicators */}
                <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-slate-300">
                  <span className="px-2.5 py-1 bg-white/[0.08] rounded-md border border-white/10 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-emerald-400" /> Camera e-KYC Ready
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.08] rounded-md border border-white/10 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-emerald-400" /> Direct Bank Transfer
                  </span>
                  <span className="px-2.5 py-1 bg-white/[0.08] rounded-md border border-white/10 flex items-center gap-1">
                    <CheckCircle2 size={11} className="text-emerald-400" /> 100% Free Service
                  </span>
                </div>
              </div>

              {/* Right Side: QR Code Scanner for Desktop or Live Pill */}
              <div className="md:col-span-4 bg-white/[0.05] backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center flex flex-col items-center justify-center">
                <div className="hidden md:flex flex-col items-center">
                  <div className="bg-white p-2.5 rounded-xl shadow-md border border-white mb-2">
                    <QRCodeSVG
                      value={PLAY_STORE_URL}
                      size={108}
                      bgColor="#ffffff"
                      fgColor="#00172e"
                      level="Q"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">
                    Scan with Phone to Install
                  </span>
                </div>

                <div className="md:hidden flex items-center gap-3 w-full">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#FF7819] shrink-0 border border-white/15">
                    <Smartphone size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white">Direct App Install</div>
                    <div className="text-[10px] text-slate-300">Instant Aadhaar OTP & Face Scan</div>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Impact Primary App Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-between">
              
              {/* PRIMARY CTA: Google Play Store Button */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 max-w-md py-3.5 px-6 bg-gradient-to-r from-[#FF7819] via-[#ff852e] to-[#e66a15] hover:from-[#e0650d] hover:to-[#FF7819] text-white font-extrabold rounded-xl shadow-lg shadow-[#FF7819]/30 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 cursor-pointer group"
              >
                <GooglePlayIcon className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
                <div className="text-left leading-tight">
                  <span className="text-[9px] uppercase tracking-wider text-white/90 font-bold block">
                    Fast-Track Your Disbursal
                  </span>
                  <span className="text-sm sm:text-base font-black tracking-tight text-white block">
                    Install & Finish on Google Play
                  </span>
                </div>
                <ArrowRight size={18} className="ml-auto group-hover:translate-x-1 transition-transform" />
              </a>

              {/* SECONDARY ACTION: Lender Portal Web Fallback */}
              <div className="text-center sm:text-right">
                <span className="text-[11px] text-slate-400 block mb-1">
                  Cannot install app right now?
                </span>
                {partnerUrl ? (
                  <a
                    href={partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white underline decoration-slate-500 underline-offset-4 transition-colors"
                  >
                    <span>Continue on {partnerName.split(" ")[0]} Web Portal</span>
                    <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <button
                    onClick={() => router.push("/personal-loans")}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white underline decoration-slate-500 underline-offset-4 transition-colors cursor-pointer"
                  >
                    <span>View Web Lending Options</span>
                    <ArrowRight size={12} />
                  </button>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ===================================================================== */}
        {/* 3. 3-STEP PIPELINE: EMPHASIZING APP AS THE ACTIVE NEXT STEP           */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-4 sm:p-5 shadow-sm mb-6">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E2DA]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7819] block">
                Disbursal Execution Pipeline
              </span>
              <h2 className="text-sm sm:text-base font-black text-[#002140]">
                Your Current Application Status
              </h2>
            </div>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              Pre-Approval Cleared
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Step 1: Web Pre-Approval (Done) */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-2xs">
                ✓
              </div>
              <div>
                <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wide">
                  1. Pre-Approval
                </h3>
                <p className="text-[11px] text-emerald-800/90 font-medium mt-0.5">
                  Pre-qualified offer matched with {partnerName.split(" ")[0]}
                </p>
                <span className="inline-block mt-1 text-[9px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded">
                  Completed on Web
                </span>
              </div>
            </div>

            {/* Step 2: App Verification (ACTIVE - PROMINENT) */}
            <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl flex items-start gap-2.5 shadow-2xs ring-2 ring-[#FF7819]/40 relative overflow-hidden">
              <div className="w-6 h-6 rounded-full bg-[#FF7819] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 animate-pulse shadow-2xs">
                2
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#002140] uppercase tracking-wide flex items-center gap-1.5">
                  <span>2. Install App & e-Sign</span>
                  <span className="text-[9px] bg-[#FF7819] text-white px-1.5 py-0.5 rounded font-bold">
                    Action Required
                  </span>
                </h3>
                <p className="text-[11px] text-[#002140]/80 font-medium mt-0.5">
                  Complete Aadhaar OTP verification & online e-Mandate in app.
                </p>
                <span className="inline-block mt-1 text-[9px] font-bold text-[#FF7819]">
                  Takes under 90 seconds
                </span>
              </div>
            </div>

            {/* Step 3: Account Credit (Upcoming) */}
            <div className="p-3 bg-[#FAF8F5] border border-[#E5E2DA] rounded-xl flex items-start gap-2.5 opacity-80">
              <div className="w-6 h-6 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  3. Direct Credit
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Disbursal transferred straight to your bank account.
                </p>
                <span className="inline-block mt-1 text-[9px] text-slate-400 font-medium">
                  Est. 2 - 12 Hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 4. WHY COMPLETE ON APP (REDUCING IN-BROWSER DROP-OFFS)                 */}
        {/* ===================================================================== */}
        <div className="bg-white rounded-2xl border border-[#E5E2DA] p-4 sm:p-6 shadow-sm mb-6">
          <div className="text-center mb-4 sm:mb-5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF7819] block">
              Frictionless Processing
            </span>
            <h2 className="text-base sm:text-lg font-black text-[#002140] tracking-tight">
              Why Lenders Recommend Completing on the App
            </h2>
            <p className="text-xs text-[#002140]/65 mt-0.5 font-medium">
              Eliminate browser security permission errors and get instant automated approval.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {appPerks.map((perk, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-[#E5E2DA] bg-[#FAF8F5] flex items-start gap-3 transition-colors hover:border-[#FF7819]/40"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E5E2DA] flex items-center justify-center shrink-0 shadow-2xs">
                  {perk.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-[#002140] mb-0.5">
                    {perk.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-normal">
                    {perk.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* 5. STATUTORY TRANSPARENCY & HELPDESK                                 */}
        {/* ========================================================================= */}
        <div className="p-3.5 bg-white rounded-xl border border-[#E5E2DA] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs">
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-emerald-600 shrink-0" />
            <span className="text-slate-600 font-medium text-[11px]">
              CoverMantra is an authorized LSP registered with MCA (CIN: U46109DL2024PTC438732). Zero fee guarantee.
            </span>
          </div>

          <button
            onClick={() => router.push("/contact")}
            className="text-[11px] font-bold text-[#002140] hover:text-[#FF7819] transition-colors underline shrink-0 cursor-pointer"
          >
            Need help? Contact Grievance Desk
          </button>
        </div>

      </main>

      {/* ========================================================================= */}
      {/* 6. STATUTORY IDENTITY FOOTER                                              */}
      {/* ========================================================================= */}
      <footer className="w-full bg-white border-t border-[#E5E2DA] py-3 px-4 text-center text-[10px] text-slate-500">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <span className="font-bold text-[#002140]">CoverMantra Fintech Private Limited</span>
          <span className="text-slate-300">•</span>
          <span>CIN: U46109DL2024PTC438732</span>
          <span className="text-slate-300">•</span>
          <span>GSTIN: 06AAMCC2334C1Z3</span>
          <span className="text-slate-300">•</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck size={10} /> Bank-Grade 256-Bit SSL
          </span>
          <span className="text-slate-300">•</span>
          <span>Official Google Play Certified LSP</span>
        </div>
      </footer>

    </div>
  );
}

export default function ApplySuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center font-sans">
        <div className="w-9 h-9 border-3 border-[#FF7819]/20 border-t-[#FF7819] rounded-full animate-spin"></div>
        <p className="mt-3 text-[#002140] text-xs font-bold tracking-widest uppercase">
          Loading Pre-Approved Status...
        </p>
      </div>
    }>
      <ApplySuccessContent />
    </Suspense>
  );
}