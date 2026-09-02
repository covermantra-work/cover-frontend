"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import DataSecurity from "../../animations/data.json";
import Rupee from "../../animations/Image.json";
import Loan from "../../animations/Loan.json";
import { ShieldCheck, Lock, CheckCircle2, ArrowRight } from "lucide-react";

const Cards = () => {
  return (
    <section className="bg-slate-50/70 py-24 px-4 sm:px-6 md:px-10 relative overflow-hidden">
      {/* 🌟 Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7819]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white rounded-full mb-4 border border-slate-200 shadow-xs">
            <ShieldCheck size={16} className="text-emerald-500" />
            <span className="uppercase tracking-widest text-[11px] font-black text-[#08101E]">
              Zero-Trust Architecture
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#08101E] tracking-tight leading-tight">
            Bank-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00]">Security & Privacy</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto font-semibold leading-relaxed">
            Your financial sovereignty and privacy are non-negotiable. Every bit of data is protected with 256-bit encryption.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-stretch">
          
          {/* Three 3D Security Cards - lg:col-span-8 */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Card 1 - Data Encryption */}
            <div className="group bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 rounded-[2.8rem] p-7 sm:p-8 border-4 border-white shadow-[0_20px_50px_-15px_rgba(255,120,25,0.12),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-24 h-24 mb-6 bg-gradient-to-br from-[#FF7819]/10 to-amber-500/5 rounded-3xl flex items-center justify-center border-2 border-white shadow-inner">
                <Lottie animationData={DataSecurity} className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-black text-[#08101E] mb-3">256-Bit SSL</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-xs sm:text-sm flex-grow">
                End-to-end cryptographic encryption protects your PAN, KYC documents, and bank details against unauthorized tampering.
              </p>
              <Link
                href="/DataEncryption"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black rounded-2xl shadow-[0_5px_0_#C2410C,0_10px_18px_rgba(234,88,12,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all w-full text-xs uppercase tracking-wider"
              >
                <span>Know More</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 2 - RBI Registered Banks */}
            <div className="group bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 rounded-[2.8rem] p-7 sm:p-8 border-4 border-white shadow-[0_20px_50px_-15px_rgba(255,120,25,0.12),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-24 h-24 mb-6 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 rounded-3xl flex items-center justify-center border-2 border-white shadow-inner">
                <Lottie animationData={Rupee} className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-black text-[#08101E] mb-3">RBI Regulated</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-xs sm:text-sm flex-grow">
                We partner strictly with Reserve Bank of India (RBI) registered NBFCs and scheduled commercial banks for transparent terms.
              </p>
              <Link
                href="/DataEncryption/rbi"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black rounded-2xl shadow-[0_5px_0_#C2410C,0_10px_18px_rgba(234,88,12,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all w-full text-xs uppercase tracking-wider"
              >
                <span>Know More</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 3 - User Trust */}
            <div className="group bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 rounded-[2.8rem] p-7 sm:p-8 border-4 border-white shadow-[0_20px_50px_-15px_rgba(255,120,25,0.12),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full">
              <div className="w-24 h-24 mb-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/5 rounded-3xl flex items-center justify-center border-2 border-white shadow-inner">
                <Lottie animationData={Loan} className="h-20 w-20" />
              </div>
              <h3 className="text-xl font-black text-[#08101E] mb-3">Zero Data Reselling</h3>
              <p className="text-slate-600 font-medium leading-relaxed text-xs sm:text-sm flex-grow">
                Your profile is never sold to spam callers or marketing aggregators. You maintain 100% control over your consent.
              </p>
              <Link
                href="/DataEncryption/user"
                className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black rounded-2xl shadow-[0_5px_0_#C2410C,0_10px_18px_rgba(234,88,12,0.3),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all w-full text-xs uppercase tracking-wider"
              >
                <span>Know More</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Side Content - 3D Obsidian Vault Card */}
          <div className="lg:col-span-4 bg-[#08101E] text-white rounded-[3rem] p-8 md:p-10 shadow-[0_30px_70px_rgba(0,0,0,0.35)] border border-white/10 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF7819]/15 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-[#FF7819] mb-6 shadow-md">
                <Lock size={22} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-black leading-tight mb-5 tracking-tight">
                Why Does FinTech Trust Matter?
              </h3>
              
              <div className="space-y-4 text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">
                <p>
                  Borrowing money online requires unwavering confidence. We act as an unbiased digital fiduciary bridging you with legitimate financial institutions.
                </p>
                <p>
                  Every lender connection on CoverMantra meets strict compliance standards: transparent APR disclosure, zero hidden fees, and certified data handling.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2.5 text-xs text-[#FF7819] font-black uppercase tracking-wider">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>256-Bit SSL • RBI Compliant • ISO Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;