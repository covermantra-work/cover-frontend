"use client";

import React from "react";
import { BadgeCheck, FileText, ClipboardList, Users, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "24-Hour Express Disbursal",
    description:
      "Get funds transferred into your verified bank account swiftly after digital KYC verification.",
    icon: <BadgeCheck className="h-9 w-9 text-white" />,
  },
  {
    title: "100% Paperless Process",
    description:
      "Zero physical branches, zero printing. Apply from your smartphone anywhere, anytime in India.",
    icon: <FileText className="h-9 w-9 text-white" />,
  },
  {
    title: "Zero Hidden Charges",
    description:
      "Total APR transparency. No unexpected deduction charges, prepayment penalties, or surprise fees.",
    icon: <ClipboardList className="h-9 w-9 text-white" />,
  },
  {
    title: "Credit Score Reassurance",
    description:
      "Checking your eligibility on CoverMantra creates zero negative impact on your official CIBIL score.",
    icon: <ShieldCheck className="h-9 w-9 text-white" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#08101E] py-24 md:py-32 px-4 sm:px-6 md:px-10 overflow-hidden border-t border-b border-white/10">
      {/* 🌟 3D Studio Volumetric Lights */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/15 via-[#FF7819]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-5 shadow-lg">
            <Sparkles size={14} className="text-[#FF7819]" />
            <span className="uppercase tracking-widest text-[11px] font-black text-[#FF7819]">
              The CoverMantra Advantage
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFB900] to-[#FF8A33]">CoverMantra?</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
            Architected specifically for the modern Indian borrower — honest rates, zero friction, and bank-level privacy.
          </p>
        </div>

        {/* Features 3D Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group bg-white/[0.04] backdrop-blur-2xl rounded-[3rem] p-8 sm:p-10 border-2 border-white/10 
                         hover:border-[#FF7819]/50 hover:bg-white/[0.07] hover:shadow-[0_25px_60px_rgba(234,88,12,0.2),inset_0_2px_4px_rgba(255,255,255,0.15)] 
                         transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Embossed 3D Icon Container */}
              <div className="mb-6 w-20 h-20 bg-gradient-to-tr from-[#FF7819] via-[#FF8A33] to-[#E65C00] 
                            rounded-3xl flex items-center justify-center shadow-[0_12px_28px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] 
                            border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed text-xs sm:text-sm font-medium">
                {feature.description}
              </p>

              {/* Subtle Bottom Glow Accent */}
              <div className="mt-auto pt-6 w-12 h-1 bg-gradient-to-r from-[#FF7819] to-transparent mx-auto rounded-full group-hover:w-24 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}