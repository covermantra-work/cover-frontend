"use client";

import React, { useState } from "react";
import LoanCalculator from "@/app/Components/EmiCalculator";
import { Sparkles, ShieldCheck, Lock, Award, FileText, HelpCircle, ChevronDown } from "lucide-react";

export default function EmiCalculatorClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How is Personal & Business Loan EMI calculated mathematically?",
      a: "Loan EMI is computed using the standard reducing balance mathematical formula: E = P × r × (1 + r)^n / ((1 + r)^n - 1), where 'P' is the Principal Loan Amount, 'r' is the monthly interest rate (Annual Interest ÷ 12 ÷ 100), and 'n' is the tenure in total months. CoverMantra executes this simulation dynamically with exact monthly principal and interest amortizations.",
    },
    {
      q: "What is an ideal Debt-to-Income (EMI-to-Income) ratio in India?",
      a: "Under RBI underwriting best practices, your aggregate monthly EMI obligations across all active loans should not exceed 40% to 50% of your net monthly income. Staying below this threshold ensures sufficient financial liquidity, cushions against emergencies, and significantly maximizes loan approval rates from premier NBFCs.",
    },
    {
      q: "Does calculating my loan EMI affect my CIBIL credit score?",
      a: "No, absolutely not. Using CoverMantra's EMI Calculator is 100% free and client-side simulated. It performs zero bureau inquiries and has 0% impact on your CIBIL or credit score.",
    },
    {
      q: "How does loan part-payment or prepayment help reduce interest?",
      a: "Any part-prepayment directly reduces the outstanding principal balance. Because interest is charged only on the remaining balance, prepaying allows you to either shorten your loan tenure (saving massive interest over time) or reduce your monthly EMI burden.",
    },
    {
      q: "How can I apply for a loan after calculating my EMI on CoverMantra?",
      a: "Once you have selected your desired loan amount and tenure, simply tap the 'Check Eligibility & Apply' button in the Payment Summary box. Complete a fast, 100% paperless mobile verification to view real-time customized loan offers from our 15+ RBI-regulated bank and NBFC partners.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#002140] font-sans antialiased selection:bg-[#FF7819]/20 selection:text-[#FF7819] pt-16 sm:pt-20 md:pt-24 pb-12 sm:pb-16 overflow-x-hidden">
      
      {/* Main Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
          <Sparkles size={11} className="text-[#FF7819]" />
          <span>Financial Intelligence Engine</span>
        </div>

        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#002140] mb-2 sm:mb-3 leading-[1.2] tracking-tight">
          Precision{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
            EMI Calculator
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-[15px] text-[#002140]/75 leading-relaxed font-normal max-w-2xl mx-auto">
          Calculate your monthly outflow with dynamic repayment amortizations, debt-to-income budget health metrics, and institutional interest rates across personal and business loans.
        </p>
      </div>

      {/* Interactive EMI Engine Component */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <LoanCalculator hideHeader={true} />
      </div>

      {/* EMI Calculator FAQ Section (SEO Booster) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2 shadow-2xs">
            <HelpCircle size={11} className="text-[#FF7819]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-lg sm:text-xl md:text-2xl font-black text-[#002140] tracking-tight">
            Everything You Need to Know About{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
              Loan EMIs
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#002140]/65 mt-1 max-w-xl mx-auto">
            Clear, transparent answers on interest calculations, credit health, and repayment strategies.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#E5E2DA] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm md:text-[15px] font-bold text-[#002140] hover:text-[#FF7819] transition-colors cursor-pointer gap-3"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-[#FF7819] font-mono text-xs sm:text-sm">0{index + 1}.</span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#002140]/50 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#FF7819]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-[#E5E2DA]/60 mt-1">
                    <p className="text-xs sm:text-[13px] text-[#002140]/75 leading-relaxed pt-3 font-normal">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Institutional Statutory Underwriting Docket (30% Dark Anchor) */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="bg-gradient-to-br from-[#002140] via-[#00172e] to-[#000f20] border border-[#00386b] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 text-white shadow-xl shadow-[#002140]/15">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-2.5">
              <div className="flex items-center gap-2 text-[#FF7819] text-[10px] sm:text-xs font-black uppercase tracking-widest">
                <ShieldCheck size={16} />
                <span>Statutory Underwriting & Corporate Disclosure</span>
              </div>
              
              <h2 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-white">
                CoverMantra Services Private Limited
              </h2>
              
              <p className="text-xs sm:text-[13px] text-white/70 leading-relaxed max-w-2xl font-light">
                EMI figures rendered are algorithmic simulations based on user input parameters and indicative interest brackets from RBI-regulated commercial banks and NBFC partners. Actual underwriting sanctions, interest compounding, and processing charges remain subject to individual lender verification.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] sm:text-xs text-white/60 font-mono">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  CIN: U46109DL2024PTC438732
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
                  GSTIN: 06AAMCC2334C1Z3
                </span>
              </div>
            </div>

            <div className="md:col-span-4 grid grid-cols-2 gap-3 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-[#FF7819] shrink-0">
                  <Lock size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">256-Bit SSL</h3>
                  <p className="text-[10px] text-white/50">Bank-grade security</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-[#FF7819] shrink-0">
                  <Award size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Zero Fees</h3>
                  <p className="text-[10px] text-white/50">Free calculator</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-[#FF7819] shrink-0">
                  <FileText size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">Transparent</h3>
                  <p className="text-[10px] text-white/50">Clear breakdown</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-2 rounded-lg bg-white/5 text-[#FF7819] shrink-0">
                  <ShieldCheck size={14} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-white">RBI Partners</h3>
                  <p className="text-[10px] text-white/50">Regulated lenders</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
