"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/axios";

interface LenderCard {
  provider: string;
  approval: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  support: string;
  ratings: number;
  logo: string;
  applyLink: string;
  features: string[];
}

const fallbackCards: LenderCard[] = [
  {
    provider: "FlexSalary (Vivifi)",
    approval: "Good",
    loanAmount: "Up to ₹3,00,000",
    interestRate: "Starting from 1.5% per month",
    processingFee: "Starting from 2% of the approved loan amount",
    support: "24/7 customer support",
    ratings: 4.2,
    logo: "https://www.vivifin.com/images/vivifi-logo.png",
    applyLink: "/LenderAPI/vivifi",
    features: [
      "Credit Line Facility", "Instant Disbursal", "Flexible Repayment", "No Fixed EMI", "Minimal Documentation", "24/7 support"
    ]
  },
  {
    provider: "FATAKPAY Loans",
    approval: "Good",
    loanAmount: "Up to ₹2,00,000",
    interestRate: "Starting from 12% to 35.95% per month",
    processingFee: "Starting from 2.5% of the approved loan amount",
    support: "24/7 customer support",
    ratings: 4.0,
    logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
    applyLink: "/LenderAPI/fatakPay",
    features: [
      "Quick disbursement", "Paperless process", "Low processing fee", "Instant approval", "No hidden charges", "24/7 customer support"
    ]
  },
  {
    provider: "Zype",
    approval: "Good",
    loanAmount: "Up to ₹3,00,000",
    interestRate: "Starting from 1.5% per month",
    processingFee: "Starting from 2% to 6% on every loan",
    support: "24/7 customer support",
    ratings: 4.0,
    logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg",
    applyLink: "/LenderAPI/zype",
    features: [
      "Quick disbursement", "Paperless process", "Low processing fee", "Instant approval", "No hidden charges", "24/7 customer support"
    ]
  },
  {
    provider: "MoneyView",
    approval: "Good",
    loanAmount: "Up to ₹5,00,000",
    interestRate: "Starting from 1.33% per month",
    processingFee: "Starting from 2% of the approved loan amount",
    support: "24/7 customer support",
    ratings: 4.5,
    logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg",
    applyLink: "/LenderAPI/moneyView",
    features: [
      "Direct bank transfer", "Paperless process", "Minimal documentation", "Flexible repayment tenures"
    ]
  },
  {
    provider: "Credify",
    approval: "Good",
    loanAmount: "₹8,000 to ₹35,000",
    interestRate: "Starting from 0.1% - 0.2% per day",
    processingFee: "Approximately 6% - 7% of the sanctioned loan amount",
    support: "24/7 customer support",
    ratings: 4.3,
    logo: "https://loan.credittnow.com/favicon.ico",
    applyLink: "/LenderAPI/credify",
    features: [
      "Instant Approval & Disbursal within 15 min",
      "100% Digital Journey (Zero Paperwork)",
      "Min CIBIL: 680 (salary >= 30k) or 720 (salary 20k-30k)",
      "No Credit History / Prepayment Charges",
      "Salaried Only (Income >= 20k)",
      "Tenure: Up to 45 days (No EMI)"
    ]
  }
];

import Cookies from "js-cookie";

function StarRating({ value }: { value: number }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= Math.round(value) ? "text-[#FF7819]" : "text-gray-300"}>
        ★
      </span>
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function PersonalLoansPage() {
  const [lenders, setLenders] = useState<LenderCard[]>(fallbackCards);
  const [openFeatures, setOpenFeatures] = useState<number | null>(null);
  const [appliedLenders, setAppliedLenders] = useState<string[]>([]);

  useEffect(() => {
    const savedLenders = localStorage.getItem("co_applied_lenders");
    const savedTimestamps = localStorage.getItem("co_applied_lenders_timestamp");
    if (savedLenders && savedTimestamps) {
      try {
        const lendersList = JSON.parse(savedLenders);
        const timestampsObj = JSON.parse(savedTimestamps);
        const now = Date.now();
        const expiryTime = 24 * 60 * 60 * 1000; // 24 Hours in milliseconds

        const validLenders = lendersList.filter((lender: string) => {
          const timestamp = timestampsObj[lender];
          return timestamp && now - timestamp < expiryTime;
        });

        if (validLenders.length !== lendersList.length) {
          localStorage.setItem("co_applied_lenders", JSON.stringify(validLenders));
          const newTimestamps: Record<string, number> = {};
          validLenders.forEach((lender: string) => {
            newTimestamps[lender] = timestampsObj[lender];
          });
          localStorage.setItem("co_applied_lenders_timestamp", JSON.stringify(newTimestamps));
        }
        setAppliedLenders(validLenders);
      } catch (e) {}
    } else if (savedLenders) {
      try {
        setAppliedLenders(JSON.parse(savedLenders));
      } catch (e) {}
    }

    const fetchLenders = async () => {
      try {
        const { data } = await api.get("/api/lenders");
        if (data && data.length > 0) {
          const mapped = data.map((l: any) => ({
            provider: l.name,
            logo: l.logo,
            applyLink: l.applyLink || l.UTM || `/LenderAPI/${l._id}`,
            features: l.features || [],
            ratings: l.ratings || 4.0,
            support: l.support || "24/7 customer support",
            processingFee: l.processingFee || "Starting from 2%",
            interestRate: l.interestRate || "Starting from 1.5% per month",
            loanAmount: l.loanAmount || "Up to ₹2,00,000",
            approval: l.approval || "Good"
          }));
          setLenders(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch dynamic lenders, falling back to local metadata:", error);
      }
    };

    fetchLenders();
  }, []);

  const toggleFeatures = (idx: number) => {
    setOpenFeatures(openFeatures === idx ? null : idx);
  };

  const decorateUrl = (baseUrl: string) => {
    if (!baseUrl) return "#";
    const phone = Cookies.get("co_phone") || localStorage.getItem("co_phone") || "";
    const pincode = localStorage.getItem("co_pincode") || "";
    const salary = localStorage.getItem("co_income") || "";

    try {
      const absoluteUrl = baseUrl.startsWith("/") 
        ? `${window.location.origin}${baseUrl}` 
        : (baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);

      const urlObj = new URL(absoluteUrl);
      if (phone) {
        urlObj.searchParams.set("phone", String(phone));
        urlObj.searchParams.set("mobile", String(phone));
      }
      if (pincode) urlObj.searchParams.set("pincode", String(pincode));
      if (salary) urlObj.searchParams.set("salary", String(salary));
      return urlObj.toString();
    } catch (e) {
      const separator = baseUrl.includes("?") ? "&" : "?";
      let params = [];
      if (phone) {
        params.push(`phone=${phone}`);
        params.push(`mobile=${phone}`);
      }
      if (pincode) params.push(`pincode=${pincode}`);
      if (salary) params.push(`salary=${salary}`);
      return params.length > 0 ? `${baseUrl}${separator}${params.join("&")}` : baseUrl;
    }
  };

  const handleApply = (providerName: string, applyLink: string) => {
    const now = Date.now();
    const saved = localStorage.getItem("co_applied_lenders_timestamp") || "{}";
    let timestampsObj: Record<string, number> = {};
    try {
      timestampsObj = JSON.parse(saved);
    } catch (e) {}
    timestampsObj[providerName] = now;
    localStorage.setItem("co_applied_lenders_timestamp", JSON.stringify(timestampsObj));

    const updated = [...new Set([...appliedLenders, providerName])];
    setAppliedLenders(updated);
    localStorage.setItem("co_applied_lenders", JSON.stringify(updated));

    const decoratedUrl = decorateUrl(applyLink);
    window.location.href = decoratedUrl;
  };

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-gray-800 font-sans">
      
      {/* DARK HERO SECTION */}
      <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-4 bg-[#08101E] overflow-hidden">
        {/* 🔱 Mantra Strip */}
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-20 opacity-100 hidden lg:block pointer-events-none">
          <div className="flex items-center gap-4 text-white font-serif tracking-[0.4em] uppercase text-xs font-bold">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/50 to-white" />
            <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">सत्यम शिवम सुंदरम</span>
            <span className="h-[1px] w-16 bg-gradient-to-l from-transparent via-white/50 to-white" />
          </div>
        </div>
        {/* Saffron Glow Effect */}
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#FF7819] opacity-20 blur-[150px] rounded-full"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white"
          >
            Smart Loans. <span className="text-[#FF7819]">Faster Approval.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Find the best personal loan offers with low interest rates and flexible terms tailored for you.
          </motion.p>
        </div>
      </section>
 
      {/* LIGHT BODY SECTION */}
      <section className="py-16 px-4 w-full max-w-5xl mx-auto">
        <div className="space-y-8 mt-[-80px] relative z-20">
          {lenders.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-white hover:border-[#FF7819]/30 transition-all hover:shadow-[0_20px_50px_rgba(255,120,25,0.1)] group"
            >
              {/* Provider Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#FFF4E5] p-2 flex-shrink-0 shadow-inner flex items-center justify-center">
                    <img
                      src={card.logo}
                      alt={card.provider}
                      style={{ maxWidth: "80px", maxHeight: "80px", width: "100%", height: "auto", objectFit: "contain" }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#08101E]">{card.provider}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold uppercase bg-green-100 text-green-700 px-2 py-0.5 rounded">
                        {card.approval} Approval
                      </span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-gray-600">{card.ratings}</span>
                        <StarRating value={card.ratings} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                  {appliedLenders.includes(card.provider) && (
                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 uppercase tracking-wider">
                      ✓ Applied (In-Progress)
                    </span>
                  )}
                  <button 
                    onClick={() => handleApply(card.provider, card.applyLink)}
                    className="w-full md:w-auto bg-[#FF7819] hover:bg-[#e66a15] text-white font-bold py-3 px-10 rounded-2xl shadow-lg shadow-[#FF7819]/30 transition-all active:scale-95 flex items-center justify-center animate-pulse"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

              {/* Highlight prompt for remaining lenders */}
              {appliedLenders.length > 0 && !appliedLenders.includes(card.provider) && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-bold flex items-center gap-2">
                  💡 Tip: Apply to {card.provider} too to increase your approval chances by 80%!
                </div>
              )}

              {/* Details Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 p-5 bg-[#F9FAFB] rounded-2xl border border-gray-100">
                <DetailBox label="Loan Amount" value={card.loanAmount} />
                <DetailBox label="Interest Rate" value={card.interestRate} />
                <DetailBox label="Processing Fee" value={card.processingFee} />
                <DetailBox label="Support" value={card.support} />
              </div>

              {/* Collapsible Features */}
              <div className="mt-6">
                <button 
                  onClick={() => toggleFeatures(idx)}
                  className="text-sm font-bold text-[#3C8291] hover:text-[#FF7819] transition-colors flex items-center gap-2"
                >
                  {openFeatures === idx ? "Hide Details ↑" : "Key Features ↓"}
                </button>

                <AnimatePresence>
                  {openFeatures === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-gray-100">
                        {card.features.map((f, i) => (
                          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="text-[#FF7819] text-lg leading-none">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

function DetailBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider">{label}</p>
      <p className="text-sm font-bold text-[#08101E]">{value}</p>
    </div>
  );
}
