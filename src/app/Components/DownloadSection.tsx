"use client";

import React, { useState } from "react";
import { FaBolt, FaShieldAlt, FaMobileAlt, FaCheckCircle } from "react-icons/fa";
import { Apple, Star, ArrowDownToLine, Sparkles } from "lucide-react";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function DownloadAppSection() {
  const [loginOpen, setLoginOpen] = useState(false);

  const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.covermantra.loan";

  const features = [
    { icon: <FaBolt className="text-white text-base" />, text: "Quick Loan Approvals" },
    { icon: <FaShieldAlt className="text-white text-base" />, text: "100% Bank Grade Security" },
    { icon: <FaMobileAlt className="text-white text-base" />, text: "Zero Paperwork Needed" },
    { icon: <FaCheckCircle className="text-white text-base" />, text: "Flexible Repayment EMIs" },
  ];

  const handleDownloadClick = () => {
    const co_phone = Cookies.get("co_phone");
    const co_token = Cookies.get("co_token");

    if (!co_phone || !co_token) {
      setLoginOpen(true);
    } else {
      window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
    }
  };

  const handleLoginSuccess = async () => {
    setLoginOpen(false);
    window.open(PLAY_STORE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="bg-gradient-to-b from-[#FFF4E5] to-[#FFEEDB] py-10 sm:py-12 md:py-14 px-4 md:px-10 overflow-hidden relative">
      {/* 🌟 Volumetric Studio Ambient Light */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-[#FF7819]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-7 space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md mb-2 border border-[#FF7819]/30 shadow-2xs">
                <Sparkles size={12} className="text-[#FF7819]" />
                <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
                  CoverMantra Official App
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight leading-tight">
                Track Applications & Check Offers <br className="hidden sm:block" />
                <span className="text-[#FF7819]">
                  Directly on Your Smartphone
                </span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-lg font-normal leading-relaxed">
                Download the official CoverMantra App for fast pre-approvals, real-time lender tracking, secure digital e-mandates, and verified credit lines.
              </p>
            </div>

            {/* Features Institutional Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-3 bg-white rounded-xl p-3 border border-[#E5E2DA] shadow-xs"
                >
                  <div className="w-8 h-8 bg-[#FFF3EB] border border-[#FF7819]/25 text-[#FF7819] rounded-lg flex items-center justify-center shrink-0">
                    {feature.icon}
                  </div>
                  <span className="font-semibold text-[#002140] text-xs">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Official Google Play Store & Apple App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Institutional Google Play Button */}
              <button
                onClick={handleDownloadClick}
                className="flex items-center justify-center gap-3 bg-[#002140] hover:bg-[#00172e] text-white px-5 py-2.5 rounded-lg font-semibold shadow-xs border border-[#00172e] transition-colors cursor-pointer"
              >
                {/* Official 4-Color Play Store SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186A1.9 1.9 0 0 1 3 20.736V3.264c0-.57.23-1.08.609-1.45z" fill="#00C3FF"/>
                  <path d="M17.18 8.613L13.793 12 3.61 1.814A1.89 1.89 0 0 1 4.55 1.43c.34 0 .66.12.91.32l11.72 6.863z" fill="#00E676"/>
                  <path d="M17.18 15.387L5.46 22.25c-.25.2-.57.32-.91.32a1.89 1.89 0 0 1-.94-.384L13.793 12l3.387 3.387z" fill="#FF3A44"/>
                  <path d="M21.54 11.12l-4.36-2.507L13.793 12l3.387 3.387 4.36-2.507c.88-.507.88-1.253 0-1.76z" fill="#FFC800"/>
                </svg>
                <div className="text-left">
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-300">GET IT ON</div>
                  <div className="text-xs font-bold leading-tight">Google Play Store</div>
                </div>
              </button>

              {/* iOS Coming Soon Capsule */}
              <div 
                className="flex items-center justify-center gap-3 bg-white border border-[#E5E2DA] text-slate-500 px-5 py-2.5 rounded-lg shadow-xs"
              >
                <Apple size={20} className="text-slate-700" />
                <div className="text-left">
                  <div className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">COMING SOON</div>
                  <div className="text-xs font-semibold text-slate-700">Apple App Store</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - 3D App Phone Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative max-w-72 sm:max-w-80">
              {/* Studio Glow Behind Phone */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#FF7819]/30 to-amber-400/20 rounded-[4rem] blur-3xl -z-10" />
              
              {/* 3D Claymorphic Phone Bezel Frame */}
              <div className="relative bg-[#08101E] p-4 rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] border-4 border-white">
                <div className="bg-black rounded-[2.6rem] overflow-hidden flex items-center justify-center max-w-[280px]">
                  <img
                    src="/image/App.jpeg"
                    alt="CoverMantra App Screenshot"
                    className="w-full h-auto object-cover rounded-3xl"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Levitating 3D Rating Badge */}
              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -top-5 -right-5 bg-gradient-to-b from-white to-[#FFFDFB] px-4 py-2.5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,1)] flex items-center gap-2.5 text-xs font-black text-[#08101E] border-2 border-white select-none"
              >
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                <span className="flex items-center gap-1 text-amber-500">
                  <Star size={13} fill="currentColor" /> 4.8
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-[11px] text-slate-600">50K+ Downloads</span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <LoginModal 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onSuccess={handleLoginSuccess}
        suppressGlobalModal={true}
      />
    </section>
  );
}