"use client";

import React from "react";
import { BadgeCheck, FileText, ClipboardList, Users, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Express Disbursal",
    description:
      "Direct fund transfer to your verified bank account promptly following online verification by regulated lenders.",
    icon: <BadgeCheck className="h-5 w-5 text-[#FF7819]" />,
  },
  {
    title: "100% Paperless Process",
    description:
      "Zero physical documentation or branch visits required. Complete entire eligibility from anywhere in India.",
    icon: <FileText className="h-5 w-5 text-[#FF7819]" />,
  },
  {
    title: "Zero Hidden Charges",
    description:
      "Clear APR disclosures, upfront processing fees, and transparent repayment schedules with zero surprise deductions.",
    icon: <ClipboardList className="h-5 w-5 text-[#FF7819]" />,
  },
  {
    title: "Credit Score Protection",
    description:
      "Checking your pre-qualified rates creates zero negative hard inquiries on your official CIBIL / Experian score.",
    icon: <ShieldCheck className="h-5 w-5 text-[#FF7819]" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#FAF8F5] py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md border border-[#FF7819]/30 mb-2 shadow-2xs">
            <Sparkles size={12} className="text-[#FF7819]" />
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
              Institutional Advantages
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight mb-2 leading-tight">
            Why Borrowers Trust <span className="text-[#FF7819]">CoverMantra</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Engineered for institutional credibility — verified lender rates, strict data security, and zero hidden costs.
          </p>
        </div>

        {/* Features Bank Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 border border-[#E5E2DA]/80 shadow-2xs 
                         hover:border-[#002140]/30 transition-all duration-200 flex flex-col items-start text-left relative overflow-hidden"
            >
              {/* Clean Geometric Icon Container */}
              <div className="mb-3 w-10 h-10 bg-[#FFF3EB] border border-[#FF7819]/25 
                            rounded-lg flex items-center justify-center shadow-2xs">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-base font-extrabold text-[#002140] mb-1.5 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed text-xs font-normal">
                {feature.description}
              </p>

              {/* Subtle indicator */}
              <div className="mt-4 pt-3 border-t border-slate-100 w-full">
                <span className="text-[11px] font-semibold text-[#002140] flex items-center gap-1">
                  Institutional Standard <span className="text-[#FF7819]">✓</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}