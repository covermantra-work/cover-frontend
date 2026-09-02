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
      highlight: '⚡ Instant Paperless Disbursal',
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
    <section className="bg-slate-50/60 py-20 md:py-28 relative overflow-hidden">
      {/* 🌟 Volumetric Studio Ambient Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-amber-500/10 via-[#FF7819]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full mb-4 shadow-[0_2px_8px_rgba(0,0,0,0.06),inset_0_1px_2px_rgba(255,255,255,1)] border border-slate-200/80">
            <Sparkles size={14} className="text-[#FF7819] animate-pulse" />
            <span className="uppercase tracking-widest text-[11px] font-black text-[#FF7819]">
              Tailored Financial Suite
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#08101E] tracking-tight leading-tight">
            Smart Financial Products <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00]">
              Built for Speed & Trust
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#08101E]/60 max-w-2xl mx-auto font-semibold leading-relaxed">
            Compare rates, check eligibility in under 60 seconds, and receive digital credit directly with verified RBI-regulated partners.
          </p>
        </div>

        {/* Products Grid - Pixar Claymorphic 3D Wealth Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8">
          {products.map((product, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => router.push(product.link)}
              className="group relative bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 p-7 sm:p-8 rounded-[2.8rem] border-4 border-white shadow-[0_25px_60px_-15px_rgba(255,120,25,0.16),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Top Badge & Highlight */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${product.tagColor} shadow-xs`}>
                    {product.badge}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100/80 group-hover:bg-[#FF7819] flex items-center justify-center text-slate-400 group-hover:text-white transition-colors duration-300 shadow-inner">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>

                {/* 3D Embossed Icon Container */}
                <div className="mb-6">
                  <div className={`w-18 h-18 rounded-3xl bg-gradient-to-br ${product.gradient} text-white flex items-center justify-center shadow-[0_12px_24px_rgba(234,88,12,0.3),inset_0_2px_4px_rgba(255,255,255,0.6)] group-hover:scale-105 transition-transform duration-300 border-2 border-white/60`}>
                    {product.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-black text-[#08101E] mb-2 tracking-tight">
                  {product.title}
                </h3>

                {/* Micro-trust line */}
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF7819] mb-3">
                  <Zap size={13} className="shrink-0" />
                  <span>{product.highlight}</span>
                </div>

                {/* Description */}
                <p className="text-slate-600 font-semibold leading-relaxed text-xs sm:text-[13px] mb-6">
                  {product.description}
                </p>
              </div>

              {/* 3D Tactile Candy Action Button */}
              <div className="pt-2">
                <button 
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black text-xs uppercase tracking-wider shadow-[0_6px_0_#C2410C,0_12px_20px_rgba(234,88,12,0.35),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:brightness-105"
                >
                  <span>Explore Offers</span>
                  <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">→</span>
                </button>
              </div>
            </motion.div>
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