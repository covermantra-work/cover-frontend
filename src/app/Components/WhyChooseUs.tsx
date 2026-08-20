"use client";

import React from "react";
import { BadgeCheck, FileText, ClipboardList, Users } from "lucide-react";

const features = [
  {
    title: "Quick Disbursal",
    description:
      "Get personal loans disbursed within 24 hours through our fast digital process.",
    icon: <BadgeCheck className="h-8 w-8 text-white" />,
  },
  {
    title: "100% Online Process",
    description:
      "No paperwork or branch visits—experience a completely online loan journey.",
    icon: <FileText className="h-8 w-8 text-white" />,
  },
  {
    title: "No Hidden Charges",
    description:
      "Full transparency in fees. Pay only what is shown, with no surprises.",
    icon: <ClipboardList className="h-8 w-8 text-white" />,
  },
  {
    title: "Credit Score Support",
    description:
      "Track and improve your credit score with our expert assistance.",
    icon: <Users className="h-8 w-8 text-white" />,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-[#050811] py-24 px-4 md:px-10 overflow-hidden border-t border-b border-white/5">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-[#FF690B]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 mb-4">
            <div className="w-2 h-2 bg-[#FF690B] rounded-full animate-ping" />
            <span className="uppercase tracking-widest text-xs font-semibold text-white/70">
              Why CoverMantra
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Why Choose CoverMantra?
          </h1>
          <p className="text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Fast, easy, and smart financial solutions tailored for you.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 
                         hover:border-[#FF690B]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(255,105,11,0.08)] 
                         hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#FF690B]/10 to-transparent 
                            rounded-full group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              {/* Icon Container - 3D Style */}
              <div className="mb-8 w-20 h-20 bg-gradient-to-br from-[#FF690B] to-[#FF8C00] 
                            rounded-2xl flex items-center justify-center shadow-[0_10px_25px_rgba(255,105,11,0.3)] 
                            group-hover:rotate-12 transition-transform duration-300 relative z-10">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 leading-relaxed text-[14.5px] sm:text-[15px] font-medium">
                {feature.description}
              </p>

              {/* Subtle Bottom Line */}
              <div className="mt-auto pt-8 w-12 h-0.5 bg-gradient-to-r from-[#FF690B] to-transparent mx-auto 
                            group-hover:w-20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}