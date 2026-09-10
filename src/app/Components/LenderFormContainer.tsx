"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/axios";

interface FormField {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "number" | "date" | "select";
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  uppercase?: boolean;
  options?: Array<{ label: string; value: string }>;
}

interface FormConfig {
  title: string;
  logo: string;
  fields: FormField[];
  consentText: string;
  redirectUrlOnSuccess: string;
}

interface LenderFormContainerProps {
  lenderId: string;
}

export default function LenderFormContainer({ lenderId }: LenderFormContainerProps) {
  // Normalize lenderId to lowercase for API calls
  const normalizedLenderId = lenderId.toLowerCase();

  const [config, setConfig] = useState<FormConfig | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isLoadingConfig, setIsLoadingConfig] = useState(true);
  const [responseMessage, setResponseMessage] = useState<
    null | { type: "success" | "error" | "info"; message: string }
  >(null);

  const showModal = (message: string, type: "success" | "error" | "info" = "info") => {
    setResponseMessage({ type, message });
  };

  // Fetch form schema config
  useEffect(() => {
    if (!normalizedLenderId) return;

    const fetchConfigAndUser = async () => {
      setIsLoadingConfig(true);
      try {
        const { data: formConfig } = await api.get(`/api/partners/${normalizedLenderId}/form-config`);
        setConfig(formConfig);

        // Initialize empty fields to prevent controlled/uncontrolled React warnings
        const initialData: Record<string, any> = {};
        formConfig.fields.forEach((f: FormField) => {
          initialData[f.name] = "";
        });
        setFormData(initialData);

        // Fetch User profile to auto-fill fields if phone is available
        const storedPhone = Cookies.get("co_phone") || localStorage.getItem("co_phone");
        if (storedPhone) {
          try {
            const { data: userData } = await api.post("/api/user/profile", { phone: storedPhone });
            const user = userData.user;
            if (user) {
              const filledData = autoFillFields(formConfig.fields, user);
              setFormData((prev) => ({
                ...prev,
                ...filledData,
              }));
            }
          } catch (profileError) {
            console.error("Failed to pre-populate user profile:", profileError);
          }
        }
      } catch (error) {
        console.error("Failed to load lender form configuration:", error);
        showModal("Could not load form configuration. Please try again later.", "error");
      } finally {
        setIsLoadingConfig(false);
      }
    };

    fetchConfigAndUser();
  }, [normalizedLenderId]);

  // Dynamic Form Field Pre-fill Mapper
  const autoFillFields = (fields: FormField[], user: any) => {
    const data: Record<string, any> = {};
    const employmentMap: Record<string, string> = {
      Salaried: "Salaried",
      "Self-Employed": "Self-Employed",
      "Salaried Employee": "Salaried",
    };

    fields.forEach((field) => {
      const name = field.name;
      if (name === "phone" || name === "mobile") {
        data[name] = user.phone || "";
      } else if (name === "name") {
        data[name] = user.name || "";
      } else if (name === "first_name") {
        data[name] = user.name?.split(" ")[0] || "";
      } else if (name === "last_name") {
        data[name] = user.name?.split(" ").slice(1).join(" ") || "";
      } else if (name === "dob") {
        data[name] = user.dob || "";
      } else if (name === "email") {
        data[name] = user.email || "";
      } else if (name === "pan") {
        data[name] = user.pan || "";
      } else if (name === "pincode") {
        data[name] = user.pincode || "";
      } else if (name === "employmentType" || name === "employment_type_id") {
        data[name] = employmentMap[user.employment as string] || "";
      } else if (name === "salary" || name === "income") {
        data[name] = user.income || user.salary || "";
      } else if (name === "city") {
        data[name] = user.city || "";
      } else if (name === "address" || name === "addresss") {
        data[name] = user.address || user.addresss || "";
      } else {
        data[name] = "";
      }
    });
    return data;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      showModal("⚠️ Please provide consent before submitting.", "info");
      return;
    }
    setLoading(true);

    const partnerUrlMap: Record<string, string> = {
      fatakpay: "https://web.fatakpay.com/authentication/login?utm_source=651_TT83W&utm_medium=covermantra",
      vivifi: "https://online.flexsalary.com/CustomerLogin/Index?CampaignID=9192300#x",
      zype: "https://zype.onelink.me/vx8a?af_xp=custom&pid=CustomerSource&af_dp=com.zype.mobile%3A%2F%2F&deep_link_value=myZype&af_click_lookback=30d&c=Spiraea",
      moneyview: "https://moneyview.in/personal-loan?utm_source=covermantra",
      credify: "https://loan.credittnow.com/auth/login?utm_source=cover_mantra&utm_medium=website&utm_campaign=loan_campaign"
    };

    const targetFallbackUrl = partnerUrlMap[normalizedLenderId] || config?.redirectUrlOnSuccess || "/personal-loans";

    const decorateUrl = (baseUrl: string) => {
      const phone = formData.phone || formData.mobile || Cookies.get("co_phone") || "";
      const pincode = formData.pincode || "";
      const salary = formData.income || formData.salary || "";

      try {
        const [cleanBase, hashFragment] = baseUrl.split("#");
        const absoluteUrl = cleanBase.startsWith("/") 
          ? `${window.location.origin}${cleanBase}` 
          : (cleanBase.startsWith("http") ? cleanBase : `https://${cleanBase}`);

        const urlObj = new URL(absoluteUrl);
        if (phone) {
          urlObj.searchParams.set("phone", String(phone));
          urlObj.searchParams.set("mobile", String(phone));
        }
        if (pincode) urlObj.searchParams.set("pincode", String(pincode));
        if (salary) urlObj.searchParams.set("salary", String(salary));
        const withParams = urlObj.toString();
        return hashFragment ? `${withParams}#${hashFragment}` : withParams;
      } catch (e) {
        const [cleanBase, hashFragment] = baseUrl.split("#");
        const separator = cleanBase.includes("?") ? "&" : "?";
        let params = [];
        if (phone) {
          params.push(`phone=${phone}`);
          params.push(`mobile=${phone}`);
        }
        if (pincode) params.push(`pincode=${pincode}`);
        if (salary) params.push(`salary=${salary}`);
        const withParams = params.length > 0 ? `${cleanBase}${separator}${params.join("&")}` : cleanBase;
        return hashFragment ? `${withParams}#${hashFragment}` : withParams;
      }
    };

    // Open a blank tab synchronously in the user interaction thread to bypass popup blocker
    const newTab = typeof window !== "undefined" ? window.open("", "_blank") : null;
    if (newTab) {
      newTab.document.write("<p style='font-family:sans-serif; text-align:center; margin-top:20%; color:#08101E; font-weight:bold;'>Redirecting to partner website... Please wait.</p>");
    }

    try {
      const { data } = await api.post(`/api/partners/${normalizedLenderId}/register`, {
        ...formData,
        consent: true,
        consent_timestamp: new Date().toISOString(),
      });

      const rawRedirectUrl = data?.redirectUrl || targetFallbackUrl;
      const decoratedUrl = decorateUrl(rawRedirectUrl);

      showModal(
        `✅ Application Submitted Successfully!\nRedirecting to partner website...`,
        "success"
      );

      // Track applied state locally
      try {
        const saved = localStorage.getItem("co_applied_lenders") || "[]";
        const current = JSON.parse(saved);
        const mappedNames: Record<string, string> = {
          fatakpay: "FATAKPAY Loans",
          vivifi: "FlexSalary (Vivifi)",
          zype: "Zype",
          moneyview: "MoneyView",
          credify: "Credify"
        };
        const displayName = mappedNames[normalizedLenderId] || normalizedLenderId;
        const updated = [...new Set([...current, displayName])];
        localStorage.setItem("co_applied_lenders", JSON.stringify(updated));
        localStorage.setItem("co_last_applied_partner", displayName);
        localStorage.setItem("co_last_partner_url", decoratedUrl);
      } catch (err) {}

      setTimeout(() => {
        if (newTab) {
          newTab.location.href = decoratedUrl;
        } else {
          window.open(decoratedUrl, "_blank");
        }
        const mappedNames: Record<string, string> = {
          fatakpay: "FATAKPAY Loans",
          vivifi: "FlexSalary (Vivifi)",
          zype: "Zype",
          moneyview: "MoneyView",
          credify: "Credify"
        };
        const displayName = mappedNames[normalizedLenderId] || normalizedLenderId;
        window.location.href = `/apply-success?partner=${encodeURIComponent(displayName)}&url=${encodeURIComponent(decoratedUrl)}`;
      }, 2500);

    } catch (error: any) {
      console.error("Partner registration API error:", error);

      if (newTab && !newTab.closed) {
        newTab.close();
      }

      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Unable to process application with partner. Please try again.";

      showModal(`❌ Application Failed: ${errorMessage}`, "error");
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingConfig) {
    return (
      <div className="min-h-screen bg-[#FFF4E5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF7819]/20 border-t-[#FF7819] rounded-full animate-spin"></div>
          <p className="text-[#08101E] font-bold text-sm tracking-widest uppercase">Loading Application Form...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-[#FFF4E5] flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl text-center max-w-md w-full">
          <h2 className="text-2xl font-black text-red-600 mb-2">Error</h2>
          <p className="text-gray-500 font-bold mb-6">Could not load form configuration for this lender.</p>
          <a
            href="/personal-loans"
            className="inline-block bg-[#FF7819] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#08101E] transition-all"
          >
            Back to Lenders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF4E5] font-sans">
      {/* Dynamic Alert Popup */}
      <AnimatePresence>
        {responseMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-[#08101E]/70 backdrop-blur-md z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className={`flex flex-col items-center max-w-sm w-full p-8 rounded-[3rem] shadow-2xl bg-white border-b-[10px] ${
                responseMessage.type === "success" ? "border-green-500" : "border-red-600"
              }`}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                  responseMessage.type === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}
              >
                {responseMessage.type === "success" ? (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-2xl font-black text-[#08101E] tracking-tight">
                {responseMessage.type.toUpperCase()}
              </h3>
              <p className="text-center text-gray-500 font-bold mt-2 leading-tight">
                {responseMessage.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="min-h-[18rem] pt-20 md:pt-24 bg-[#08101E] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#FF7819] rounded-full blur-[120px] opacity-20"></div>

        {config.logo && (
          <div className="relative h-12 w-48 mb-3 flex items-center justify-center">
            <img src={config.logo} alt={config.title} className="max-h-full max-w-full object-contain brightness-0 invert" />
          </div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-3xl md:text-4xl font-black text-white italic tracking-tighter"
        >
          {config.title.toUpperCase()}
        </motion.h1>
        <p className="relative text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase mt-2 font-bold">
          Config-Driven Secure Application Flow
        </p>
      </div>

      {/* Dynamic Form Content */}
      <div className="relative z-10 flex justify-center px-4 -mt-20 pb-20">
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-2xl w-full bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_70px_-15px_rgba(255,120,25,0.22),0_15px_35px_rgba(0,0,0,0.06),inset_0_3px_6px_rgba(255,255,255,1)] border-4 border-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {config.fields.map((field) => {
              const val = formData[field.name] || "";

              if (field.type === "select") {
                return (
                  <div key={field.name} className="flex flex-col gap-2">
                    <label className="text-[11px] uppercase font-black text-[#FF7819] ml-4 tracking-widest">
                      {field.label}
                    </label>
                    <select
                      name={field.name}
                      value={val}
                      onChange={handleChange}
                      className="w-full p-4.5 bg-slate-50/90 border-2 border-slate-200/80 rounded-[1.6rem] focus:border-[#FF7819] focus:bg-white outline-none transition-all font-bold text-sm text-[#08101E] shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)]"
                      required={field.required}
                    >
                      <option value="">Select Option</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              return (
                <div key={field.name} className="flex flex-col gap-2">
                  <label className="text-[11px] uppercase font-black text-[#FF7819] ml-4 tracking-widest">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={val}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    pattern={field.pattern || undefined}
                    required={field.required}
                    maxLength={field.name === "pan" ? 10 : undefined}
                    className={`w-full p-4.5 bg-slate-50/90 border-2 border-slate-200/80 rounded-[1.6rem] focus:border-[#FF7819] focus:bg-white outline-none transition-all font-bold text-sm text-[#08101E] placeholder:text-gray-300 shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)] ${
                      field.uppercase ? "uppercase tracking-[0.2em] font-mono" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Consent Checkbox */}
          <motion.label
            whileTap={{ scale: 0.98 }}
            className="mt-8 flex items-center gap-4 p-5 bg-[#FF7819]/5 rounded-3xl border-2 border-[#FF7819]/20 hover:border-[#FF7819]/40 transition-all cursor-pointer shadow-[inset_0_1px_3px_rgba(255,255,255,0.8)]"
          >
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-5 h-5 accent-[#FF7819] shrink-0"
              required
            />
            <span className="text-[11px] md:text-xs text-gray-700 font-bold leading-snug">
              {config.consentText}
            </span>
          </motion.label>

          {/* 3D Tactile Extruded Candy Submit Button */}
          <motion.button
            whileHover={{ scale: 1.01, y: -2 }}
            whileTap={{ scale: 0.98, y: 3 }}
            type="submit"
            disabled={!consent || loading}
            className={`w-full mt-8 py-5 rounded-[2rem] font-black text-white text-base md:text-lg tracking-wider uppercase transition-all flex items-center justify-center gap-3 cursor-pointer ${
              !consent || loading
                ? "bg-gray-300 cursor-not-allowed shadow-none text-gray-500"
                : "bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] shadow-[0_8px_0_#C2410C,0_18px_30px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_2px_0_#C2410C]"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                SUBMITTING APPLICATION...
              </span>
            ) : (
              "SUBMIT APPLICATION FOR VERIFICATION →"
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
