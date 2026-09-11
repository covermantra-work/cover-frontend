"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../lib/axios";
import { trackMetaLead } from "../../lib/metaPixel";

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

      // Track Meta Pixel Lead Conversion
      trackMetaLead({
        content_name: normalizedLenderId,
        content_category: "Lender Application",
        value: Number(formData.income || formData.salary || formData.loanAmount) || undefined,
      });

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
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 border-3 border-orange-500/20 border-t-[#FF690B] rounded-full animate-spin"></div>
          <p className="text-[#08101E] font-bold text-xs tracking-widest uppercase">Loading Application Form...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200/80 text-center max-w-md w-full">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4 text-xl font-black">
            ✕
          </div>
          <h2 className="text-xl font-black text-[#08101E] mb-2">Form Not Available</h2>
          <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">Could not load form configuration for this lender right now.</p>
          <a
            href="/personal-loans"
            className="inline-block bg-gradient-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] px-6 py-3 rounded-xl font-black text-sm hover:opacity-95 transition-all shadow-md shadow-orange-500/20"
          >
            Back to All Lenders
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20 selection:bg-[#FF690B] selection:text-white">
      {/* Dynamic Alert Popup */}
      <AnimatePresence>
        {responseMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-[#08101E]/60 backdrop-blur-md z-[100] p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="flex flex-col items-center max-w-sm w-full p-6 sm:p-8 rounded-3xl shadow-2xl bg-white border border-slate-100"
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                  responseMessage.type === "success" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                }`}
              >
                {responseMessage.type === "success" ? (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-black text-[#08101E] tracking-tight">
                {responseMessage.type === "success" ? "Application Submitted" : "Submission Failed"}
              </h3>
              <p className="text-center text-slate-500 font-medium text-xs sm:text-sm mt-2 leading-relaxed">
                {responseMessage.message}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner */}
      <div className="min-h-[17rem] pt-16 md:pt-20 bg-[#08101E] relative flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-full bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,105,11,0.2),rgba(255,255,255,0))] pointer-events-none" />

        {config.logo && (
          <div className="relative h-10 w-40 mb-3 flex items-center justify-center bg-white/10 px-4 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <img src={config.logo} alt={config.title} className="max-h-full max-w-full object-contain" />
          </div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight"
        >
          {config.title}
        </motion.h1>
        <p className="relative text-slate-400 text-[11px] md:text-xs tracking-wider uppercase mt-2 font-bold">
          Config-Driven Secure Application Flow
        </p>
      </div>

      {/* Dynamic Form Content Card */}
      <div className="relative z-10 flex justify-center px-4 -mt-14 sm:-mt-16">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-900/5 border border-slate-200/80 relative overflow-hidden"
        >
          {/* Top Brand Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FF690B] via-[#FFB900] to-[#FF690B]" />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
            {config.fields.map((field) => {
              const val = formData[field.name] || "";

              if (field.type === "select") {
                return (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                      <span>{field.label}</span>
                      {field.required && <span className="text-[#FF690B] text-xs">*</span>}
                    </label>
                    <select
                      name={field.name}
                      value={val}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:border-[#FF690B] focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium text-sm text-[#08101E]"
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
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
                <div key={field.name} className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>{field.label}</span>
                    {field.required && <span className="text-[#FF690B] text-xs">*</span>}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={val}
                    onChange={handleChange}
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                    pattern={field.pattern || undefined}
                    required={field.required}
                    maxLength={field.name === "pan" ? 10 : undefined}
                    className={`w-full px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-xl focus:border-[#FF690B] focus:bg-white focus:ring-2 focus:ring-orange-500/20 outline-none transition-all font-medium text-sm text-[#08101E] placeholder:text-slate-400 ${
                      field.uppercase ? "uppercase tracking-wider font-mono" : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>

          {/* Consent Checkbox */}
          <motion.label
            whileTap={{ scale: 0.99 }}
            className="mt-6 flex items-start gap-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-200/80 hover:border-orange-300 transition-all cursor-pointer shadow-xs"
          >
            <input
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="w-4 h-4 mt-0.5 accent-[#FF690B] rounded shrink-0 cursor-pointer"
              required
            />
            <span className="text-[11px] sm:text-xs text-slate-600 font-medium leading-relaxed">
              {config.consentText}
            </span>
          </motion.label>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.005 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!consent || loading}
            className={`w-full mt-6 py-4 rounded-xl font-black text-sm sm:text-base tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
              !consent || loading
                ? "bg-slate-200 cursor-not-allowed text-slate-400"
                : "bg-gradient-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] shadow-lg shadow-orange-500/20 hover:opacity-95 active:scale-95"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2.5">
                <div className="w-5 h-5 border-2 border-[#08101E]/20 border-t-[#08101E] rounded-full animate-spin"></div>
                SUBMITTING APPLICATION...
              </span>
            ) : (
              <span>SUBMIT APPLICATION FOR VERIFICATION →</span>
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}

