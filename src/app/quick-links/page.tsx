"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginModal from "../Components/LoginModal";
import { registerUser } from "../APIs/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShieldAlt, 
  FaBolt, 
  FaHandHoldingUsd, 
  FaChartLine, 
  FaCheckCircle 
} from "react-icons/fa";
import api from "@/lib/axios";

const fallbackLenders = [
  {
    id: "v1",
    name: "FlexSalary (Vivifi)",
    logo: "https://www.vivifin.com/images/vivifi-logo.png",
    approval: "92%",
    amount: "Upto 3L",
    rate: "1.5% / mo",
    tenure: "Flexible",
    features: ["Credit Line", "Instant Transfer", "No Fixed EMI"],
    url: "https://online.flexsalary.com/CustomerLogin/Index?CampaignID=9192300#x",
    minIncome: 15000,
    age: 21
  },
  {
    id: "f1",
    name: "FATAKPAY Loans",
    logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
    approval: "90%",
    amount: "Upto 5L",
    rate: "12% - 35.95% p.a",
    tenure: "3-24 months",
    features: ["Instant Cash", "Digital KYC", "Flexible EMI"],
    url: "https://web.fatakpay.com/authentication/login?utm_source=651_TT83W&utm_medium=covermantra",
    minIncome: 16000,
    age: 20
  }
];

const emptyForm = {
  name: "", phone: "", email: "", employeeType: "", pan: "",
  pincode: "", loanAmount: "", income: "", dob: "", city: "", state: "", gender: ""
};

export default function Page() {
  const [form, setForm] = useState({ ...emptyForm });
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [dynamicLenders, setDynamicLenders] = useState<any[]>([]);
  const [loadingLenders, setLoadingLenders] = useState(true);
  const [appliedLenders, setAppliedLenders] = useState<string[]>([]);
  const router = useRouter();

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
            id: l._id,
            name: l.name,
            logo: l.logo,
            approval: l.approval || "95%",
            amount: l.loanAmount || "Up to ₹2,00,000",
            rate: l.interestRate || "Starting from 1.5% per month",
            tenure: l.support || "24/7 support",
            features: l.features || ["Quick Approval", "Low Interest", "No Hidden Fees"],
            url: l.applyLink || l.UTM || `/LenderAPI/${l._id}`,
            minIncome: l.minIncome || 15000,
            age: l.age || 21
          }));
          setDynamicLenders(mapped);
        } else {
          setDynamicLenders(fallbackLenders);
        }
      } catch (err) {
        console.error("Failed to load lenders in quick-links:", err);
        setDynamicLenders(fallbackLenders);
      } finally {
        setLoadingLenders(false);
      }
    };
    fetchLenders();
  }, []);

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

  const handleApply = (lenderId: string, providerName: string, applyLink: string) => {
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

    let targetUrl = applyLink;
    if (lenderId && applyLink.startsWith("http") && !applyLink.includes("click-redirect")) {
      const phone = Cookies.get("co_phone") || localStorage.getItem("co_phone") || "";
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV === 'production' ? 'https://www.covermantra.com' : 'http://localhost:5001');
      targetUrl = `${apiBaseUrl}/api/partners/click-redirect?lenderId=${lenderId}&phone=${phone}`;
    }

    const decoratedUrl = decorateUrl(targetUrl);
    window.location.href = decoratedUrl;
  };

  const filteredLenders = React.useMemo(() => {
    const currentList = dynamicLenders.length > 0 ? dynamicLenders : fallbackLenders;
    if (!form.income || isNaN(Number(form.income))) return currentList;
    const income = Number(form.income);
    return currentList.filter(l => {
       return income >= (l.minIncome || 12000);
    });
  }, [dynamicLenders, form.income]);

  useEffect(() => {
    const savedPhone = Cookies.get("co_phone");
    if (savedPhone) setForm(prev => ({ ...prev, phone: savedPhone }));
  }, []);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === "pincode" && value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        if (data?.[0]?.Status === "Success" && data?.[0]?.PostOffice?.length > 0) {
          const postOffice = data[0].PostOffice[0];
          setForm(prev => ({
            ...prev,
            city: postOffice.District || "",
            state: postOffice.State || "",
          }));
        }
      } catch (err) {
        console.error("Postal lookup failed:", err);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || isSubmitting) return;
    const isLoggedIn = !!Cookies.get("co_token");
    isLoggedIn ? await handleRegisterUser() : setLoginModalOpen(true);
  };

  const handleRegisterUser = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const savedPhone = Cookies.get("co_phone") || form.phone;
      const payload = {
        ...form,
        phone: savedPhone,
        pan: form.pan.toUpperCase(),
        employment: form.employeeType,
        city: form.city || "Unknown",
        state: form.state || "Unknown",
        consent: true,
        consentMessage: "I agree to the Terms & Conditions & Privacy Policy and authorize CoverMantra to share my details with lenders and contact me for application updates."
      };
      await registerUser(payload);
      
      // Save details to localStorage for URL auto-fill
      localStorage.setItem("co_phone", savedPhone);
      localStorage.setItem("co_pincode", form.pincode);
      localStorage.setItem("co_income", form.income);

      setIsSubmitting(false);
      router.push("/personal-loans");
    } catch (err) {
      console.error("Failed to register user from eligibility check:", err);
      // Fallback save even on registration API failure
      localStorage.setItem("co_phone", form.phone);
      localStorage.setItem("co_pincode", form.pincode);
      localStorage.setItem("co_income", form.income);
      setIsSubmitting(false);
      router.push("/personal-loans");
    }
  };

 return (
    <main className="min-h-screen bg-[#FFF4E5] pt-28 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#FF7819] selection:text-white relative overflow-hidden">
      
      {/* 🔱 Mantra Strip - Fixed Position to avoid overlap */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 opacity-100 hidden lg:block pointer-events-none">
        <div className="flex items-center gap-4 text-[#08101E]/80 font-serif tracking-[0.4em] uppercase text-xs font-bold">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-[#08101E]/40 to-[#08101E]/80" />
          <span className="drop-shadow-[0_0_8px_rgba(8,16,30,0.1)]">सत्यम शिवम सुंदरम</span>
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent via-[#08101E]/40 to-[#08101E]/80" />
        </div>
      </div>
      
      {/* 🔮 Background 3D Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7819]/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[150px] -z-10"></div>

      <div className="max-w-7xl mx-auto relative z-10 mt-10 md:mt-16">
        
        {/* ✨ Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#08101E] text-[#FF7819] text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 shadow-2xl">
            <FaShieldAlt className="animate-pulse" /> Verified RBI Lenders
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-[#08101E] tracking-tighter mb-6 leading-tight uppercase italic">
            Compare & Get <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] to-[#FF690B]">Instant Loans</span> 💰
          </h2>
          <p className="text-[#08101E]/60 text-sm md:text-xl font-bold max-w-2xl mx-auto italic">
            Get instant access to verified lenders and apply online in minutes. No hidden charges, just pure transparency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* 🚀 LENDERS LIST SECTION */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-white backdrop-blur-sm mb-4 shadow-sm">
               <h3 className="text-sm font-black text-[#08101E] uppercase tracking-widest">
                 {form.income && !isNaN(Number(form.income)) ? `Eligible Lenders (${filteredLenders.length})` : "All Top Lenders"}
               </h3>
               {form.income && !isNaN(Number(form.income)) && (
                 <span className="text-[10px] font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full uppercase tracking-wider">
                   Based on ₹{form.income}/mo
                 </span>
               )}
            </div>

            {filteredLenders.length === 0 ? (
               <div className="bg-white p-10 rounded-[3rem] text-center border border-white shadow-sm">
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">No lenders match your current profile.</p>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <AnimatePresence>
                 {filteredLenders.map((lender: any, index: number) => (
                   <motion.div 
                     key={lender.id}
                     layout
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.8 }}
                     transition={{ duration: 0.3, delay: index * 0.05 }}
                     whileHover={{ rotateY: -3, rotateX: 3, scale: 1.02 }}
                     style={{ transformStyle: "preserve-3d" }}
                     className="group bg-white p-8 rounded-[3rem] border border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(255,120,25,0.15)] transition-all duration-500 relative overflow-hidden"
                   >
                     <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7819]/5 rounded-full -mr-16 -mt-16 group-hover:bg-[#FF7819]/10 transition-colors"></div>

                     <div className="flex justify-between items-start mb-8">
                       <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center h-16 w-32 group-hover:scale-105 transition-transform">
                         <img src={lender.logo} alt={lender.name} className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all" />
                       </div>
                       <div className="flex items-center gap-1.5 bg-green-500 text-white px-4 py-1.5 rounded-full font-black shadow-lg shadow-green-500/20 text-[10px] tracking-tighter">
                         {lender.approval} SUCCESS
                       </div>
                     </div>

                     <h3 className="text-xl font-black text-[#08101E] mb-6 tracking-tight uppercase italic">{lender.name}</h3>

                     <div className="grid grid-cols-2 gap-4 mb-8">
                       <div className="bg-[#FFF4E5]/50 p-4 rounded-2xl border border-[#FF7819]/5">
                         <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Max Amount</p>
                         <p className="text-sm font-black text-[#FF7819] flex items-center gap-1"><FaHandHoldingUsd /> {lender.amount}</p>
                       </div>
                       <div className="bg-[#FFF4E5]/50 p-4 rounded-2xl border border-[#FF7819]/5">
                         <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Interest</p>
                         <p className="text-[11px] font-black text-[#08101E] flex items-center gap-1"><FaChartLine /> {lender.rate}</p>
                       </div>
                     </div>

                     <div className="mb-10">
                       <div className="flex flex-wrap gap-2">
                         {lender.features.map((feature: string, i: number) => (
                           <span key={i} className="flex items-center gap-1.5 text-[9px] font-black bg-gray-50 text-gray-500 px-3 py-2 rounded-xl border border-gray-100 uppercase tracking-wider group-hover:bg-green-50 group-hover:text-green-600 transition-all">
                             <FaCheckCircle className="text-[10px]" /> {feature}
                           </span>
                         ))}
                       </div>
                     </div>

                      {appliedLenders.includes(lender.name) && (
                        <div className="text-[10px] font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 uppercase tracking-wider text-center w-fit mx-auto mb-2">
                          ✓ Applied (In-Progress)
                        </div>
                      )}
                      <motion.button 
                        onClick={() => handleApply(lender.id || "", lender.name, lender.url)}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-[#08101E] hover:bg-[#FF7819] text-white font-black py-5 rounded-[1.8rem] shadow-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]"
                      >
                        Apply Instantly <FaBolt className="text-[#FF7819] group-hover:text-white" />
                      </motion.button>

                      {appliedLenders.length > 0 && !appliedLenders.includes(lender.name) && (
                        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[10px] text-amber-800 font-bold text-center">
                          💡 Tip: Apply to {lender.name} too to increase your approval chances by 80%!
                        </div>
                      )}
                    </motion.div>
                 ))}
                 </AnimatePresence>
               </div>
            )}
          </div>

          {/* 📝 ELIGIBILITY FORM SECTION */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 h-fit">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/80 backdrop-blur-xl p-8 sm:p-12 rounded-[4rem] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.15)] border border-white"
            >
              <h2 className="text-3xl font-black text-[#08101E] mb-2 uppercase tracking-tighter italic text-center">Eligibility Check</h2>
              <p className="text-[11px] text-gray-400 text-center font-bold uppercase tracking-[0.2em] mb-10">Takes less than 60 seconds</p>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Full Name (PAN)</label>
                  <input name="name" placeholder="Ex: John Doe" value={form.name} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#FF7819] outline-none transition-all font-bold shadow-inner" required />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Email Address</label>
                  <input name="email" type="email" placeholder="example@domain.com" value={form.email} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-[#FF7819] outline-none transition-all font-bold shadow-inner" required />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Phone</label>
                    <input name="phone" placeholder="+91" value={form.phone} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">PAN Card</label>
                    <input name="pan" placeholder="ABCDE1234F" value={form.pan} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner uppercase" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Date of Birth</label>
                    <input name="dob" type="date" value={form.dob} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner text-[#08101E]" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner text-[#08101E] appearance-none focus:border-[#FF7819] focus:bg-white" required>
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Employment Type</label>
                    <select name="employeeType" value={form.employeeType} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner text-[#08101E] appearance-none focus:border-[#FF7819] focus:bg-white" required>
                      <option value="" disabled>Select Type</option>
                      <option value="Salaried">Salaried</option>
                      <option value="Self-Employed">Self-Employed</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Monthly Income</label>
                    <input name="income" type="number" placeholder="₹" value={form.income} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner" required />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {['City', 'State', 'Pincode'].map(item => {
                    const name = item.toLowerCase() as "city" | "state" | "pincode";
                    return (
                      <div key={item} className="space-y-1">
                        <label className="text-[8px] font-black text-[#08101E] uppercase tracking-widest ml-1">{item}</label>
                        <input name={name} value={form[name] || ""} placeholder={item} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-xl py-4 text-center outline-none font-black shadow-inner text-[10px] uppercase focus:border-[#FF7819] focus:bg-white" required />
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-[#08101E] uppercase tracking-widest ml-3">Loan Amount Required</label>
                  <input name="loanAmount" type="number" placeholder="₹" value={form.loanAmount} onChange={handleChange} className="w-full bg-[#FFF4E5] border-2 border-transparent rounded-2xl px-6 py-4 outline-none font-bold shadow-inner" required />
                </div>

                <div className="flex items-start gap-4 py-6 mt-6 border-t border-[#08101E]/5">
                  <input type="checkbox" id="consent" checked={consent} onChange={() => setConsent(!consent)} className="mt-1 w-5 h-5 accent-[#FF7819] cursor-pointer" required />
                  <label htmlFor="consent" className="text-[10px] text-[#08101E]/50 font-black uppercase tracking-tight leading-relaxed italic cursor-pointer">
                    I agree to the <Link href="/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline">Terms & Conditions</Link> & <Link href="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline">Privacy Policy</Link> and authorize CoverMantra to share my details with lenders and contact me for application updates.
                  </label>
                </div>

                <motion.button 
                  whileHover={consent && !isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={consent && !isSubmitting ? { scale: 0.98 } : {}}
                  type="submit" 
                  disabled={!consent || isSubmitting}
                  className={`w-full py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all flex items-center justify-center gap-2 ${
                    consent && !isSubmitting ? 'bg-[#FF7819] text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit Request 🏁"
                  )}
                </motion.button>
              </form>

              <div className="mt-8 flex items-center justify-center gap-2 text-[#08101E]/30 font-black text-[9px] uppercase tracking-[0.2em]">
                <FaShieldAlt /> 256-Bit Encrypted & Safe
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} onSuccess={handleRegisterUser} suppressGlobalModal={true} />
    </main>
  );
}