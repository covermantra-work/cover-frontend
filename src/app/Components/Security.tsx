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
    <section className="bg-[#FAF8F5] py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 relative overflow-hidden">
      {/* 🌟 Background ambient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7819]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF690B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md mb-2 border border-[#FF7819]/30 shadow-2xs">
            <ShieldCheck size={12} className="text-[#FF7819]" />
            <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
              Regulatory & Data Compliance
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight leading-tight">
            Bank-Grade <span className="text-[#FF7819]">Security & Privacy</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            Your personal financial data is encrypted and safeguarded strictly according to RBI digital lending guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          
          {/* Three Institutional Security Cards - lg:col-span-8 */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Card 1 - Data Encryption */}
            <div className="bg-white rounded-xl p-5 border border-[#E5E2DA]/80 shadow-2xs hover:border-[#002140]/30 transition-all flex flex-col items-start text-left h-full">
              <div className="w-11 h-11 mb-3 bg-[#FFF3EB] border border-[#FF7819]/25 rounded-lg flex items-center justify-center shrink-0">
                <Lottie animationData={DataSecurity} className="h-7 w-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#002140] mb-1">256-Bit SSL Encryption</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 flex-grow font-normal">
                End-to-end cryptographic encryption protects your PAN, KYC documents, and bank details against unauthorized tampering.
              </p>
              <Link
                href="/DataEncryption"
                className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#002140] hover:bg-[#FF7819] text-white font-semibold rounded-lg w-full text-xs transition-colors"
              >
                <span>Learn Details</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Card 2 - RBI Registered Banks */}
            <div className="bg-white rounded-xl p-5 border border-[#E5E2DA]/80 shadow-2xs hover:border-[#002140]/30 transition-all flex flex-col items-start text-left h-full">
              <div className="w-11 h-11 mb-3 bg-[#FFF3EB] border border-[#FF7819]/25 rounded-lg flex items-center justify-center shrink-0">
                <Lottie animationData={Rupee} className="h-7 w-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#002140] mb-1">RBI Regulated NBFCs</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 flex-grow font-normal">
                We partner strictly with Reserve Bank of India (RBI) registered NBFCs and scheduled commercial banks for transparent terms.
              </p>
              <Link
                href="/DataEncryption/rbi"
                className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#002140] hover:bg-[#FF7819] text-white font-semibold rounded-lg w-full text-xs transition-colors"
              >
                <span>Lender Compliance</span>
                <ArrowRight size={12} />
              </Link>
            </div>

            {/* Card 3 - User Trust */}
            <div className="bg-white rounded-xl p-5 border border-[#E5E2DA]/80 shadow-2xs hover:border-[#002140]/30 transition-all flex flex-col items-start text-left h-full">
              <div className="w-11 h-11 mb-3 bg-[#FFF3EB] border border-[#FF7819]/25 rounded-lg flex items-center justify-center shrink-0">
                <Lottie animationData={Loan} className="h-7 w-7" />
              </div>
              <h3 className="text-base font-extrabold text-[#002140] mb-1">Zero Data Reselling</h3>
              <p className="text-slate-600 text-xs leading-relaxed mb-4 flex-grow font-normal">
                Your profile is never sold to spam callers or marketing aggregators. You maintain 100% control over your consent.
              </p>
              <Link
                href="/DataEncryption/user"
                className="mt-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#002140] hover:bg-[#FF7819] text-white font-semibold rounded-lg w-full text-xs transition-colors"
              >
                <span>Privacy Fiduciary</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Right Side Content - Deep Navy Institutional Compliance Card */}
          <div className="lg:col-span-4 bg-[#002140] text-white rounded-xl p-5 sm:p-6 shadow-sm border border-[#00172e] flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-[#FF7819] mb-3">
                <Lock size={16} />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold leading-snug mb-2.5 tracking-tight">
                Digital Lending Aggregator Compliance
              </h3>
              
              <div className="space-y-3 text-slate-300 text-xs leading-relaxed font-normal">
                <p>
                  CoverMantra operates in strict accordance with the Reserve Bank of India’s Digital Lending Guidelines, acting as an unbiased digital aggregator.
                </p>
                <p>
                  Every partner provides a statutory Key Fact Statement (KFS) detailing all-inclusive APR, fee breakdowns, and transparent repayment schedules.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 relative z-10">
              <div className="flex items-center gap-2 text-[11px] text-slate-200 font-semibold uppercase tracking-wider">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>256-Bit SSL • RBI NBFC Partners • ISO Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;