"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, Briefcase, User, Search, X, ArrowRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

type FAQItem = {
  q: string;
  a: string;
};

const faqs: { personal: FAQItem[]; business: FAQItem[] } = {
  personal: [
    { q: "What is a personal loan?", a: "A personal loan is an unsecured loan that can be used for various personal needs such as education, travel, or emergencies." },
    { q: "What are typical interest rates?", a: "Interest rates vary depending on credit score and bank policies, usually between 10% to 24% per annum." },
    { q: "How long can I repay?", a: "You can choose repayment tenures ranging from 12 to 60 months." },
    { q: "How much can I borrow?", a: "Loan amounts depend on income and credit profile, typically from ₹50,000 to ₹25 lakhs." },
    { q: "Are there any processing fees?", a: "Yes, processing fees may range between 1% to 3% of the loan amount." },
    { q: "Can I prepay my loan?", a: "Yes, most lenders allow prepayment after a certain period, sometimes with small charges." },
  ],
  business: [
    { q: "What is a business loan?", a: "A business loan is financial assistance to help businesses with expansion, equipment, or working capital." },
    { q: "What's the loan amount range?", a: "Business loans typically range from ₹1 lakh to ₹50 lakhs or more depending on the lender." },
    { q: "What interest rates apply?", a: "Rates vary, usually between 12% to 20% per annum depending on business stability." },
    { q: "What documents are needed?", a: "Documents usually include business proof, ITR, financial statements, and identity proof." },
    { q: "How do I apply?", a: "You can apply online through our website or visit the nearest branch." },
    { q: "Is collateral required?", a: "Many business loans are unsecured, but higher amounts may require collateral." },
  ],
};

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Filter Logic
  const filteredFaqs = (activeTab === "personal" ? faqs.personal : faqs.business).filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggle = (id: string) => {
    setOpen(open === id ? null : id);
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div className="min-h-screen bg-[#FFF4E5] font-sans selection:bg-[#FF7819] selection:text-white">
      
      {/* 🚀 HERO SECTION */}
      <section className="relative bg-[#08101E] pt-28 pb-40 md:pt-40 md:pb-52 px-6 rounded-b-[3rem] md:rounded-b-[6rem] shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF7819]/10 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF7819] text-sm font-bold mb-6 italic">
            <HelpCircle size={16} /> 24/7 Support Intelligence
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase italic">
            Got <span className="text-[#FF7819]">Questions?</span>
          </h1>

          {/* 🔍 SEARCH BOX */}
          <div className="mt-12 max-w-xl mx-auto relative group">
             <div className="absolute inset-0 bg-[#FF7819]/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
             <div className="relative flex items-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-4 shadow-inner">
                <Search className="text-[#FF7819] mr-3 cursor-pointer" size={24} onClick={focusSearch} />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for queries (e.g. interest, documents)..." 
                  className="bg-transparent border-none outline-none text-white w-full placeholder:text-gray-500 font-medium"
                />
                {searchQuery && (
                  <X 
                    className="text-gray-400 cursor-pointer hover:text-white transition" 
                    size={20} 
                    onClick={() => setSearchQuery("")} 
                  />
                )}
             </div>
          </div>
        </div>
      </section>

      {/* 📁 TABBED CONTENT SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 -mt-24 relative z-20 pb-24">
        
        {/* 3D Tab Switcher */}
        <div className="flex p-2 bg-gradient-to-b from-white to-[#FFFDFB] rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,1)] mb-12 border-4 border-white max-w-md mx-auto" data-aos="zoom-in">
          <button 
            onClick={() => { setActiveTab("personal"); setOpen(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'personal' 
              ? 'bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white shadow-[0_4px_0_#C2410C,0_10px_20px_rgba(234,88,12,0.35),inset_0_2px_4px_rgba(255,255,255,0.5)]' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <User size={16} /> Personal Loans
          </button>
          <button 
            onClick={() => { setActiveTab("business"); setOpen(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'business' 
              ? 'bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white shadow-[0_4px_0_#C2410C,0_10px_20px_rgba(234,88,12,0.35),inset_0_2px_4px_rgba(255,255,255,0.5)]' 
              : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Briefcase size={16} /> Business Loans
          </button>
        </div>

        {/* FAQ Accordion List - 3D Claymorphic Cards */}
        <div className="space-y-5">
          <div className="flex items-center justify-between mb-6 px-3">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF7819] to-[#E65C00] rounded-xl flex items-center justify-center text-white shadow-md">
                   {activeTab === 'personal' ? <User size={18} /> : <Briefcase size={18} />}
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-[#08101E]">
                  {activeTab === 'personal' ? 'Personal Loan' : 'Business Loan'} <span className="text-[#FF7819]">Knowledge</span>
                </h2>
             </div>
             {searchQuery && (
               <span className="text-xs font-black text-slate-500 bg-white px-3.5 py-1.5 rounded-full shadow-xs border border-slate-200">
                 Showing {filteredFaqs.length} results
               </span>
             )}
          </div>

          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((item, idx) => {
              const id = `${activeTab}-${idx}`;
              const isActive = open === id;
              return (
                <div
                  key={id}
                  className={`bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 rounded-[2.5rem] border-4 transition-all duration-300 overflow-hidden ${
                    isActive 
                    ? 'border-[#FF7819] shadow-[0_25px_60px_-10px_rgba(255,120,25,0.22),inset_0_3px_6px_rgba(255,255,255,1)]' 
                    : 'border-white shadow-[0_15px_35px_-10px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:border-slate-200'
                  }`}
                >
                  <div
                    className="flex justify-between items-center p-6 md:p-8 cursor-pointer select-none"
                    onClick={() => toggle(id)}
                  >
                    <h3 className={`text-base sm:text-lg md:text-xl font-black transition-colors ${isActive ? 'text-[#FF7819]' : 'text-[#08101E]'}`}>
                      {item.q}
                    </h3>
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all shrink-0 ml-4 ${
                      isActive 
                      ? 'bg-gradient-to-br from-[#FF7819] to-[#E65C00] text-white rotate-180 shadow-md' 
                      : 'bg-slate-100 text-slate-500'
                    }`}>
                      <ChevronDown size={18} />
                    </div>
                  </div>
                  
                  <div className={`transition-all duration-300 ease-in-out ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-6 md:p-8 pt-0 border-t border-slate-100">
                      <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-semibold">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-4 border-dashed border-slate-200" data-aos="zoom-in">
               <div className="text-slate-300 mb-4 flex justify-center"><Search size={48} /></div>
               <h3 className="text-xl font-black text-slate-600">No matching questions found.</h3>
               <p className="text-slate-400 mt-2 text-sm font-medium">Try different keywords or switch categories.</p>
               <button 
                 onClick={() => setSearchQuery("")}
                 className="mt-6 text-[#FF7819] font-black underline cursor-pointer"
               >
                 Clear Search
               </button>
            </div>
          )}
        </div>

        {/* 📞 3D OBSIDIAN VAULT CONTACT SECTION */}
        <div className="mt-20 bg-gradient-to-br from-[#08101E] via-[#0D1829] to-[#050811] rounded-[3.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.4)] border-2 border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF7819]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Still Have Unanswered <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] to-amber-400">Questions?</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-medium max-w-xl mx-auto mb-8">
              Our financial advisors are available 6 days a week to guide you through offers, interest comparisons, and eligibility.
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-wider shadow-[0_8px_0_#C2410C,0_18px_30px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_2px_0_#C2410C] active:translate-y-1.5 transition-all cursor-pointer"
            >
              <span>Talk to a Loan Specialist</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
