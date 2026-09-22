'use client';

import React from 'react';
import { 
  CreditCard, 
  Landmark, 
  User2, 
  Banknote,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoanProductsGrid() {
  const router = useRouter();

  const products = [
    {
      title: 'Personal Loan',
      badge: 'Up to ₹25 Lakhs',
      highlight: '⚡ Fast Paperless Disbursal*',
      icon: <User2 className="h-8 w-8" />,
      description: 'Collateral-free personal loans with quick digital verification and lowest EMIs for medical, travel, wedding or urgent needs.',
      link: '/personal-loans',
      gradient: 'from-[#FF7819] via-[#FF8A33] to-[#E65C00]',
      tagColor: 'bg-orange-100 text-[#C2410C] border-orange-200',
    },
    {
      title: 'Small Amount Loan',
      badge: '₹1,000 – ₹50,000',
      highlight: '🚀 100% Digital Micro-Credit',
      icon: <Banknote className="h-8 w-8" />,
      description: 'Urgent short-ticket cash disbursed directly into your bank account within 10 minutes with minimal basic KYC.',
      link: '/smallloans',
      gradient: 'from-emerald-500 via-teal-500 to-emerald-600',
      tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      title: 'Credit Card',
      badge: 'Lifetime Free',
      highlight: '🎁 Up to 5% Unlimited Cashback',
      icon: <CreditCard className="h-8 w-8" />,
      description: 'Compare curated premium credit cards with airport lounge access, fuel surcharge waivers, and zero annual fees.',
      link: '/personal-loans',
      gradient: 'from-violet-500 via-purple-500 to-indigo-600',
      tagColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      title: 'Business Loan',
      badge: 'Up to ₹50 Lakhs',
      highlight: '🏢 MSME & Startup Friendly',
      icon: <Landmark className="h-8 w-8" />,
      description: 'Fuel your enterprise growth, buy inventory, or expand operations with flexible working capital loans and tax benefits.',
      link: '/business-loans',
      gradient: 'from-blue-500 via-indigo-500 to-blue-600',
      tagColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
  ];

  return (
    <section className="bg-[#FAF8F5] py-10 sm:py-12 md:py-14 relative overflow-hidden">
      {/* 🌟 Volumetric Studio Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#FF7819]/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md mb-2 border border-[#FF7819]/30 shadow-2xs">
            <Sparkles size={12} className="text-[#FF7819]" />
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
              Institutional Lending Suite
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight leading-tight">
            Curated Financial Products <br className="hidden sm:block" />
            <span className="text-[#FF7819]">
              Verified for Transparency & Trust
            </span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Compare APRs, check eligibility with zero impact on credit scores, and access digital credit from regulated institutional lenders.
          </p>
        </div>

        {/* Products Grid - Institutional Bank Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {products.map((product, index) => (
            <div
              key={index}
              onClick={() => router.push(product.link)}
              className="group relative bg-white p-5 rounded-xl border border-[#E5E2DA]/80 shadow-2xs hover:border-[#002140]/30 hover:shadow-xs transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Direct Arrow */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide border ${product.tagColor} shadow-2xs`}>
                    {product.badge}
                  </span>
                  <div className="w-6.5 h-6.5 rounded-md bg-slate-100 group-hover:bg-[#002140] flex items-center justify-center text-slate-500 group-hover:text-white transition-colors duration-200">
                    <ArrowRight size={12} />
                  </div>
                </div>

                {/* Clean Geometric Icon Container */}
                <div className="mb-3">
                  <div className="w-11 h-11 rounded-lg bg-[#FFF3EB] border border-[#FF7819]/25 text-[#FF7819] flex items-center justify-center shadow-2xs">
                    {product.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-[17px] font-extrabold text-[#002140] mb-1 tracking-tight group-hover:text-[#FF7819] transition-colors">
                  {product.title}
                </h3>

                {/* Micro-trust line */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#FF7819] mb-2.5">
                  <Zap size={12} className="shrink-0" />
                  <span>{product.highlight}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 font-normal leading-relaxed text-xs mb-5">
                  {product.description}
                </p>
              </div>

              {/* Bank-Grade Action Button */}
              <div className="pt-2 border-t border-slate-100">
                <button 
                  className="w-full py-2.5 px-3 rounded-lg bg-[#002140] hover:bg-[#FF7819] text-white font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Offers</span>
                  <span className="text-xs font-bold">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Seal Strip */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-slate-500 text-xs font-bold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            <span>100% RBI Registered NBFC Partners</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[#FF7819]" />
            <span>Zero Paperwork & Doorstep Free</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap size={18} className="text-amber-500" />
            <span>Credit Score Impact Free Check</span>
          </div>
        </div>
      </div>
    </section>
  );
}