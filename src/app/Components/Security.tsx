"use client";

import React from "react";
import Link from "next/link";
import Lottie from "lottie-react";
import DataSecurity from "../../animations/data.json";
import Rupee from "../../animations/Image.json";
import Loan from "../../animations/Loan.json";

const Cards = () => {
  return (
    <section className="bg-slate-50 py-24 px-6 md:px-10 relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF690B]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFF4E5] rounded-full mb-4 border border-[#FF690B]/10">
            <div className="w-2 h-2 bg-[#FF690B] rounded-full animate-pulse" />
            <span className="uppercase tracking-widest text-xs font-bold text-[#FF690B]">
              Data Protection
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[#08101E] tracking-tight">
            Security & Privacy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Your trust is our top priority. We protect your data with military-grade security.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Three Security Cards - lg:col-span-8 */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Card 1 - Data Encryption */}
            <div className="group bg-white rounded-[2.5rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-[#FF690B]/20 hover:shadow-[0_20px_50px_rgba(255,105,11,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
              <div className="w-28 h-28 mb-6 bg-gradient-to-br from-[#FF690B]/5 to-transparent rounded-[1.8rem] flex items-center justify-center border border-[#FF690B]/10">
                <Lottie animationData={DataSecurity} className="h-24 w-24" />
              </div>
              <h6 className="text-2xl font-black text-[#08101E] mb-4">Data Encryption</h6>
              <p className="text-slate-500 leading-relaxed text-[14.5px] sm:text-[15px] flex-grow">
                Secures sensitive information like credit scores, bank details, and IDs from cyber threats with strong encryption methods.
              </p>
              <Link
                href="/DataEncryption"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-bold rounded-2xl hover:shadow-[0_10px_20px_rgba(255,105,11,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-full justify-center text-sm"
              >
                Know More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 14 10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>

            {/* Card 2 - RBI Registered Banks */}
            <div className="group bg-white rounded-[2.5rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-[#FF690B]/20 hover:shadow-[0_20px_50px_rgba(255,105,11,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
              <div className="w-28 h-28 mb-6 bg-gradient-to-br from-[#FF690B]/5 to-transparent rounded-[1.8rem] flex items-center justify-center border border-[#FF690B]/10">
                <Lottie animationData={Rupee} className="h-24 w-24" />
              </div>
              <h6 className="text-2xl font-black text-[#08101E] mb-4">RBI Registered Banks</h6>
              <p className="text-slate-500 leading-relaxed text-[14.5px] sm:text-[15px] flex-grow">
                Partner banks comply with RBI regulations ensuring transparency, consumer protection, and secure loan services.
              </p>
              <Link
                href="/DataEncryption/rbi"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-bold rounded-2xl hover:shadow-[0_10px_20px_rgba(255,105,11,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-full justify-center text-sm"
              >
                Know More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 14 10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>

            {/* Card 3 - User Trust */}
            <div className="group bg-white rounded-[2.5rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-[#FF690B]/20 hover:shadow-[0_20px_50px_rgba(255,105,11,0.06)] hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center h-full">
              <div className="w-28 h-28 mb-6 bg-gradient-to-br from-[#FF690B]/5 to-transparent rounded-[1.8rem] flex items-center justify-center border border-[#FF690B]/10">
                <Lottie animationData={Loan} className="h-24 w-24" />
              </div>
              <h6 className="text-2xl font-black text-[#08101E] mb-4">User Trust</h6>
              <p className="text-slate-500 leading-relaxed text-[14.5px] sm:text-[15px] flex-grow">
                Your personal data remains encrypted & never shared without consent, ensuring trust and privacy protection.
              </p>
              <Link
                href="/DataEncryption/user"
                className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-bold rounded-2xl hover:shadow-[0_10px_20px_rgba(255,105,11,0.3)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 w-full justify-center text-sm"
              >
                Know More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 14 10">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M1 5h12m0 0L9 1m4 4L9 9" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right Side Content - Why Security Matters */}
          <div className="lg:col-span-4 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-slate-100 hover:border-[#FF690B]/20 hover:shadow-[0_20px_50px_rgba(255,105,11,0.06)] transition-all duration-500 h-full flex flex-col">
            <h2 className="text-3xl font-black text-[#08101E] leading-tight mb-8">
              Why Security & Privacy Matters?
            </h2>
            
            <div className="space-y-6 text-slate-500 text-[14.5px] sm:text-[15px] leading-relaxed flex-grow">
              <p>
                In today’s digital-first world, financial data is one of the most valuable assets. 
                Protecting it not only prevents fraud but also builds long-term trust with customers.
              </p>
              <p>
                By using <span className="font-bold text-[#FF690B]">industry-standard encryption</span> 
                and collaborating with <span className="font-bold text-[#FF690B]">RBI registered banks</span>, 
                we ensure your sensitive data stays safe while offering you a smooth and transparent loan experience.
              </p>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-100">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#FF690B] font-bold">
                <div className="w-2 h-2 bg-[#FF690B] rounded-full animate-pulse" />
                256-Bit SSL • RBI Compliant • Safe & Secure
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;