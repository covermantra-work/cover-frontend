"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../../lib/axios";
import Cookies from "js-cookie";
import { 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaStar, 
  FaFileAlt, 
  FaShieldAlt, 
  FaInfoCircle, 
  FaPhone, 
  FaLock, 
  FaArrowRight, 
  FaRegPaperPlane 
} from "react-icons/fa";

interface FallbackLender {
  id: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  pincodes: string[];
  UTM: string;
  applyLink: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  ratings: number;
  features: string[];
  brandColor: string;
  description: string;
  docsRequired: string[];
  faqs: Array<{ q: string; a: string }>;
}

interface LenderLandingClientProps {
  lenderConfig: FallbackLender;
}

export default function LenderLandingClient({ lenderConfig }: LenderLandingClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State definitions
  const [step, setStep] = useState<"otp" | "form" | "fallback" | "success">("otp");
  
  // Form fields state
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    pan: "",
    dob: "",
    email: "",
    city: "",
    state: "",
    gender: "Male",
    employment: "Salaried",
    income: "",
    pincode: "",
    consent: true,
  });

  // Flow states
  const [allLenders, setAllLenders] = useState<any[]>([]);
  const [serviceableAlternatives, setServiceableAlternatives] = useState<any[]>([]);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [otpError, setOtpError] = useState("");
  const [formError, setFormError] = useState("");
  const [prefilled, setPrefilled] = useState(false);

  // Capture URL parameters for UTM tracking
  const [utmParams, setUtmParams] = useState<Record<string, string>>({});

  useEffect(() => {
    // Capture tracking params
    const params: Record<string, string> = {};
    const trackingKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_id", "utm_term", "utm_ref", "click_id"];
    
    trackingKeys.forEach(key => {
      const val = searchParams.get(key);
      if (val) params[key] = val;
    });

    // Provide sensible defaults for landing page attribution
    if (!params.utm_source) params.utm_source = "cover_mantra";
    if (!params.utm_medium) params.utm_medium = "lender_landing_page";
    if (!params.utm_campaign) params.utm_campaign = lenderConfig.id;

    setUtmParams(params);

    // Read stored phone if user is already logged in
    const storedPhone = Cookies.get("co_phone") || localStorage.getItem("co_phone");
    if (storedPhone && storedPhone.length === 10) {
      setPhone(storedPhone);
      // Auto prefill profile
      fetchUserProfile(storedPhone);
      setStep("form");
    }

    // Fetch all active lenders from backend for pincode fallback calculations
    const fetchLenders = async () => {
      try {
        const { data } = await api.get("/api/lenders");
        setAllLenders(data || []);
      } catch (err) {
        console.error("Failed to load alternative lenders dynamic list:", err);
      }
    };
    fetchLenders();
  }, []);

  // Handle OTP resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Fetch user profile based on phone
  const fetchUserProfile = async (mobileNum: string) => {
    try {
      const { data } = await api.post("/api/user/profile", { phone: mobileNum });
      const user = data.user;
      if (user) {
        setFormData({
          name: user.name || "",
          pan: user.pan || "",
          dob: user.dob || "",
          email: user.email || "",
          city: user.city || "",
          state: user.state || "",
          gender: user.gender || "Male",
          employment: user.employment || "Salaried",
          income: user.income || user.salary || "",
          pincode: user.pincode || "",
          consent: true,
        });
        setPrefilled(true);
      }
    } catch (err) {
      console.log("No profile found for phone, user will fill manually.");
    }
  };

  // Trigger Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length !== 10 || !/^[6-9]\d{9}$/.test(phone)) {
      setOtpError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsSendingOtp(true);
    setOtpError("");

    try {
      await api.post("/api/user/send-otp", { phone });
      setOtpSent(true);
      setResendTimer(60);
    } catch (err: any) {
      setOtpError(err.response?.data?.message || "Failed to send OTP. Please try again.");
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Trigger Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      setOtpError("Please enter the verification code sent.");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    try {
      const { data } = await api.post("/api/user/verify-otp", { phone, otp });
      
      // Save details to Session/Cookies
      if (data.token) {
        Cookies.set("co_token", data.token, { expires: 1 });
        Cookies.set("co_login", "true", { expires: 1 });
        Cookies.set("co_phone", phone, { expires: 1 });
        localStorage.setItem("co_phone", phone);
      }

      // Fetch existing profile if available
      await fetchUserProfile(phone);
      
      setStep("form");
    } catch (err: any) {
      setOtpError(err.response?.data?.message || "Invalid OTP code. Please check and try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Custom function to evaluate pincode serviceable match
  const checkServiceability = (pincodeStr: string, activePincodes: string[]) => {
    const code = String(pincodeStr).trim();
    if (!code || !activePincodes || activePincodes.length === 0) return false;

    // Check blocked prefixes (e.g. starting with '!')
    const isBlocked = activePincodes.some(p => 
      typeof p === "string" && p.startsWith("!") && code.startsWith(p.slice(1))
    );
    if (isBlocked) return false;

    // Check global match or explicit match
    return activePincodes.includes("*") || activePincodes.includes(code);
  };

  // Handle Dynamic Registration Form Submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.name || !formData.pan || !formData.dob || !formData.email || !formData.income || !formData.pincode) {
      setFormError("All fields are required to verify your loan offer.");
      return;
    }

    setFormError("");

    // Check pincode eligibility for current lender
    const isServiceable = checkServiceability(formData.pincode, lenderConfig.pincodes);

    if (!isServiceable) {
      // Pincode is not serviceable! Suggest serviceable alternatives dynamically.
      const alternatives = allLenders.filter(l => {
        // Exclude current lender
        if (l.name.toLowerCase().includes(lenderConfig.name.toLowerCase()) || l._id === lenderConfig.id) {
          return false;
        }
        // Match active status and pincode eligibility
        const active = l.isActive !== false;
        const serviceable = checkServiceability(formData.pincode, l.pincodes || []);
        return active && serviceable;
      });

      setServiceableAlternatives(alternatives);
      setStep("fallback");
      return;
    }

    setIsSubmittingForm(true);

    // Decorate final landing URL with UTM and user info query parameters
    const decorateTargetUrl = (baseUrl: string) => {
      try {
        const urlObj = new URL(baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`);
        urlObj.searchParams.set("phone", String(phone));
        urlObj.searchParams.set("mobile", String(phone));
        urlObj.searchParams.set("pincode", String(formData.pincode));
        urlObj.searchParams.set("salary", String(formData.income));
        
        // Append captured UTMs
        Object.keys(utmParams).forEach(k => {
          urlObj.searchParams.set(k, utmParams[k]);
        });

        return urlObj.toString();
      } catch (err) {
        const separator = baseUrl.includes("?") ? "&" : "?";
        const params = [`phone=${phone}`, `mobile=${phone}`, `pincode=${formData.pincode}`];
        Object.keys(utmParams).forEach(k => {
          params.push(`${k}=${utmParams[k]}`);
        });
        return `${baseUrl}${separator}${params.join("&")}`;
      }
    };

    // Open a blank tab synchronously to prevent popup blocker blocking the partner redirects
    const newTab = typeof window !== "undefined" ? window.open("", "_blank") : null;
    if (newTab) {
      newTab.document.write("<p style='font-family:sans-serif; text-align:center; margin-top:20%; color:#08101E; font-weight:bold;'>Redirecting to partner website... Please wait.</p>");
    }

    try {
      // 1. Submit lead details to backend
      const normalizedId = lenderConfig.name.toLowerCase().includes("vivifi") ? "vivifi" : lenderConfig.name.toLowerCase().includes("fatakpay") ? "fatakpay" : lenderConfig.id;
      
      const payload = {
        ...formData,
        phone,
        consent: true,
        consent_timestamp: new Date().toISOString()
      };

      const { data } = await api.post(`/api/partners/${normalizedId}/register`, payload);
      
      const redirectUrl = data.redirectUrl || lenderConfig.UTM || lenderConfig.applyLink;
      const finalUrl = decorateTargetUrl(redirectUrl);

      // Track applied state locally
      const saved = localStorage.getItem("co_applied_lenders") || "[]";
      const current = JSON.parse(saved);
      const updated = [...new Set([...current, lenderConfig.name])];
      localStorage.setItem("co_applied_lenders", JSON.stringify(updated));

      setStep("success");

      setTimeout(() => {
        if (newTab) {
          newTab.location.href = finalUrl;
        } else {
          window.open(finalUrl, "_blank");
        }
        router.push("/apply-success");
      }, 2000);

    } catch (err: any) {
      console.error("Lead submission error:", err);
      // Even if API registration fails, fallback redirect to target UTM so user is not blocked
      const fallbackUrl = decorateTargetUrl(lenderConfig.UTM || lenderConfig.applyLink);
      
      setStep("success");
      setTimeout(() => {
        if (newTab) {
          newTab.location.href = fallbackUrl;
        } else {
          window.open(fallbackUrl, "_blank");
        }
        router.push("/apply-success");
      }, 2000);
    } finally {
      setIsSubmittingForm(false);
    }
  };

  // Submit fallback alt lenders directly to increase conversion
  const handleAlternativeApply = async (altLender: any) => {
    const targetUrl = altLender.UTM || altLender.applyLink;
    const finalUrl = (() => {
      try {
        const urlObj = new URL(targetUrl.startsWith("http") ? targetUrl : `https://${targetUrl}`);
        urlObj.searchParams.set("phone", String(phone));
        urlObj.searchParams.set("mobile", String(phone));
        urlObj.searchParams.set("pincode", String(formData.pincode));
        urlObj.searchParams.set("salary", String(formData.income));
        
        Object.keys(utmParams).forEach(k => {
          urlObj.searchParams.set(k, utmParams[k]);
        });
        return urlObj.toString();
      } catch (e) {
        return targetUrl;
      }
    })();

    // Save logs to backend via altLender registration endpoint
    try {
      const normalizedId = altLender.name.toLowerCase().includes("vivifi") ? "vivifi" : altLender.name.toLowerCase().includes("fatakpay") ? "fatakpay" : altLender._id;
      
      await api.post(`/api/partners/${normalizedId}/register`, {
        ...formData,
        phone,
        consent: true
      });
    } catch (err) {
      console.log("Alt lender register logging failed, continuing redirect...");
    }

    // Direct redirection
    window.location.href = finalUrl;
  };

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-gray-800 font-sans pb-16">
      
      {/* CO-BRANDING HEADER */}
      <header className="sticky top-0 z-50 w-full bg-[#08101E]/95 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* CoverMantra Brand */}
            <div className="flex items-center gap-2">
              <img src="/image/logo.png" alt="CoverMantra Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
              <span className="font-black text-lg md:text-xl leading-none tracking-tight hidden sm:inline">
                <span className="text-white" style={{ WebkitTextStroke: "0.5px #FF690B" }}>Cover</span>
                <span className="text-[#FF690B]">Mantra</span>
              </span>
            </div>
            
            {/* Dynamic Arrow/Divider */}
            <span className="text-white/30 text-lg px-1">×</span>
            
            {/* Dynamic Lender Logo */}
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              <img 
                src={lenderConfig.logo} 
                alt={`${lenderConfig.name} Logo`} 
                className="h-6 md:h-7 object-contain bg-white rounded p-0.5" 
              />
              <span className="text-white text-xs md:text-sm font-black tracking-tight">
                {lenderConfig.name}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden md:inline text-xs text-white/60 font-medium">Secured Lead Verification</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
              <FaShieldAlt className="text-emerald-400" />
              <span>100% Secure</span>
            </div>
          </div>
        </div>
      </header>

      {/* HERO & SPLIT WORKSPACE */}
      <div className="max-w-7xl mx-auto px-6 mt-10 md:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        
        {/* LEFT COLUMN: MARKETING & DETAILS */}
        <section className="lg:col-span-7 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#FF7819]/10 border border-[#FF7819]/20 text-[#FF7819] px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase mb-6 w-fit"
          >
            <FaStar className="text-xs" />
            <span>Special Loan Offer Partner</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[#08101E] tracking-tight leading-[1.1] mb-6"
          >
            Apply for <span style={{ color: lenderConfig.brandColor }}>{lenderConfig.name}</span> Personal Loan
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl"
          >
            {lenderConfig.description}
          </motion.p>

          {/* Core Lender Stats Cards */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white border border-orange-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs text-gray-400 font-bold block mb-1">Max Loan Amount</span>
              <span className="text-xl md:text-2xl font-black text-[#08101E]">{lenderConfig.loanAmount}</span>
            </div>
            <div className="bg-white border border-orange-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs text-gray-400 font-bold block mb-1">Interest Rate</span>
              <span className="text-xl md:text-2xl font-black text-[#08101E]">{lenderConfig.interestRate.split(" ")[0]} <span className="text-xs font-normal text-gray-500">starts</span></span>
            </div>
            <div className="col-span-2 md:col-span-1 bg-white border border-orange-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <span className="text-xs text-gray-400 font-bold block mb-1">Approval Speed</span>
              <span className="text-xl md:text-2xl font-black text-emerald-600">Instant Digital</span>
            </div>
          </motion.div>

          {/* Documents Required Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-white border border-orange-100 p-6 rounded-3xl shadow-sm mb-8"
          >
            <h3 className="text-lg font-extrabold text-[#08101E] mb-4 flex items-center gap-2">
              <FaFileAlt className="text-orange-500" />
              <span>Documents Needed for Instant Approval</span>
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {lenderConfig.docsRequired.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#FF7819] mt-0.5 shrink-0" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* RIGHT COLUMN: MULTI-STEP INTEGRATION CARD */}
        <section className="lg:col-span-5 flex flex-col justify-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#08101E] text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-white/5 relative overflow-hidden"
          >
            {/* Header Glowing Accent */}
            <div className="absolute top-0 left-0 w-full h-[3px]" style={{ backgroundColor: lenderConfig.brandColor }} />
            
            <AnimatePresence mode="wait">
              {/* STEP 1: OTP GENERATION FLOW */}
              {step === "otp" && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-black text-white mb-2">Check Loan Pre-Approval</h2>
                    <p className="text-gray-400 text-xs md:text-sm">Verify your mobile number to check custom credit line limits and pre-approved offers.</p>
                  </div>

                  {otpError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2 mb-5">
                      <FaExclamationTriangle className="shrink-0" />
                      <span>{otpError}</span>
                    </div>
                  )}

                  {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-gray-300 block mb-2">Mobile Number</label>
                        <div className="relative">
                          <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                          <input 
                            type="tel" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                            placeholder="Enter 10-digit mobile number" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono tracking-wider transition-colors text-sm"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSendingOtp}
                        className="w-full bg-[#FF7819] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 shadow-lg shadow-orange-600/20 transition-all text-sm"
                      >
                        {isSendingOtp ? "Generating OTP..." : "Get OTP"}
                        <FaRegPaperPlane className="text-xs" />
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleVerifyOtp} className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs font-bold text-gray-300">Enter verification code sent to {phone}</label>
                          <button 
                            type="button" 
                            onClick={() => { setOtpSent(false); setOtp(""); }} 
                            className="text-xs text-orange-400 font-bold hover:underline"
                          >
                            Change Number
                          </button>
                        </div>
                        <div className="relative">
                          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm" />
                          <input 
                            type="text" 
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                            placeholder="Enter 6-digit OTP code" 
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 font-mono tracking-[0.3em] font-bold text-center transition-colors text-sm"
                            required
                          />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isVerifyingOtp}
                        className="w-full bg-linear-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] font-extrabold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all text-sm"
                      >
                        {isVerifyingOtp ? "Verifying..." : "Verify & Continue"}
                        <FaArrowRight className="text-xs" />
                      </button>

                      <div className="text-center pt-2">
                        {resendTimer > 0 ? (
                          <span className="text-xs text-gray-500">Resend code in {resendTimer}s</span>
                        ) : (
                          <button 
                            type="button" 
                            onClick={handleSendOtp} 
                            className="text-xs text-orange-400 font-bold hover:underline"
                          >
                            Resend Verification Code
                          </button>
                        )}
                      </div>
                    </form>
                  )}
                 </motion.div>
              )}

              {/* STEP 2: PROFILE QUALIFICATION FORM */}
              {step === "form" && (
                <motion.div
                  key="form-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-xl md:text-2xl font-black text-white mb-1">Verify Qualification</h2>
                      <p className="text-gray-400 text-xs">Verify key fields for {lenderConfig.name} criteria matches.</p>
                    </div>
                    {prefilled && (
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold shrink-0">
                        Auto Filled
                      </span>
                    )}
                  </div>

                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3.5 rounded-xl text-xs flex items-center gap-2 mb-5">
                      <FaExclamationTriangle className="shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Full Name</label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="As on PAN" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">PAN Card</label>
                        <input 
                          type="text" 
                          value={formData.pan}
                          onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase().slice(0, 10) })}
                          placeholder="ABCDE1234F" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs font-mono transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">DOB</label>
                        <input 
                          type="date" 
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Email</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@email.com" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Gender</label>
                        <select
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 text-xs transition-colors"
                        >
                          <option value="Male" className="bg-[#08101E]">Male</option>
                          <option value="Female" className="bg-[#08101E]">Female</option>
                          <option value="Other" className="bg-[#08101E]">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Employment</label>
                        <select
                          value={formData.employment}
                          onChange={(e) => setFormData({ ...formData, employment: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-orange-500 text-xs transition-colors"
                        >
                          <option value="Salaried" className="bg-[#08101E]">Salaried</option>
                          <option value="Self-Employed" className="bg-[#08101E]">Self-Employed</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Monthly Income (₹)</label>
                        <input 
                          type="number" 
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                          placeholder="e.g. 25000" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Pincode</label>
                        <input 
                          type="text" 
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
                          placeholder="110001" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs font-mono transition-colors"
                          required
                        />
                      </div>
                    </div>

                    {/* Hidden fields / prefilled attributes */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">City</label>
                        <input 
                          type="text" 
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          placeholder="City" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">State</label>
                        <input 
                          type="text" 
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          placeholder="State" 
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-xs transition-colors"
                          required
                        />
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmittingForm}
                      className="w-full bg-[#FF7819] hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 transition-all text-sm mt-3"
                    >
                      {isSubmittingForm ? "Submitting Application..." : "Check Loan Eligibility"}
                      <FaArrowRight className="text-xs" />
                    </button>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: DYNAMIC PINCODE FALLBACK BLOCK */}
              {step === "fallback" && (
                <motion.div
                  key="fallback-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center rounded-full mx-auto mb-3 text-lg">
                      <FaExclamationTriangle />
                    </div>
                    <h2 className="text-lg md:text-xl font-black text-white mb-2">Location Not Serviceable</h2>
                    <p className="text-xs text-gray-400 px-4">
                      We apologize, but <span className="font-extrabold text-white">{lenderConfig.name}</span> does not service pincode <span className="font-mono text-[#FF7819] font-bold">{formData.pincode}</span> yet.
                    </p>
                  </div>

                  <div className="border-t border-white/10 pt-4 mb-4">
                    <p className="text-xs font-bold text-gray-300 mb-3">However, you are pre-approved for these active alternatives:</p>
                    
                    <div className="space-y-3 max-h-[220px] overflow-y-auto scrollbar-thin pr-1">
                      {serviceableAlternatives.length > 0 ? (
                        serviceableAlternatives.map((altLender, idx) => (
                          <div 
                            key={idx}
                            className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center justify-between hover:bg-white/10 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <img 
                                src={altLender.logo} 
                                alt={altLender.name} 
                                className="w-10 h-10 object-contain bg-white rounded p-0.5" 
                              />
                              <div>
                                <h4 className="text-xs font-extrabold text-white">{altLender.name}</h4>
                                <span className="text-[10px] text-emerald-400 font-bold block">{altLender.loanAmount}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => handleAlternativeApply(altLender)}
                              className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-[10px] px-3.5 py-2 rounded-xl transition-all"
                            >
                              Apply Now
                            </button>
                          </div>
                        ))
                      ) : (
                        <div className="bg-white/5 border border-white/5 p-4 text-center text-xs text-gray-500 rounded-2xl">
                          No alternative lenders found servicing this specific pincode.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-3 pt-3">
                    <button 
                      onClick={() => setStep("form")}
                      className="text-xs text-gray-400 font-bold hover:text-white transition-colors"
                    >
                      Edit Pincode
                    </button>
                    <span className="text-white/20">|</span>
                    <button 
                      onClick={() => router.push("/personal-loans")}
                      className="text-xs text-orange-400 font-bold hover:underline"
                    >
                      Compare All Lenders
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SUCCESS LOADING STATE */}
              {step === "success" && (
                <motion.div
                  key="success-step"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center rounded-full mx-auto mb-4 text-2xl">
                    <FaCheckCircle />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white mb-2">Offer Pre-Approved!</h2>
                  <p className="text-xs text-gray-400 px-6">
                    Application successfully registered. Redirecting you to partner gateway to complete bank verification...
                  </p>
                  
                  {/* Small Spinner */}
                  <div className="mt-8 flex justify-center">
                    <div className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>

      {/* ACCORDION FAQ SECTION */}
      <section className="max-w-7xl mx-auto px-6 mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-black text-[#08101E] mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-4xl">
          {lenderConfig.faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-orange-100 rounded-2xl p-5 shadow-xs">
              <h4 className="font-extrabold text-sm md:text-base text-[#08101E] mb-2">{faq.q}</h4>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}
