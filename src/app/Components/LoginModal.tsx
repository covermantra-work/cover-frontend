"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "../../store/useAuthStore";
import { sendOtp, verifyOtp, getUser } from "../APIs/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useModal } from "../context/modelcontext";
import { triggerLoginStatusChange } from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhoneAlt, FaLock, FaCheckCircle, FaShieldAlt, FaTimes } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => Promise<void>;
  suppressGlobalModal?: boolean;
  onOtpVerified?: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess, suppressGlobalModal, onOtpVerified }: Props) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [consent, setConsent] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { openModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setErrorMsg("");
      setConsent(false);
    }
  }, [isOpen]);

  const login = ({ phone, token }: { phone: string; token: string }) => {
    setAuth(phone, token);
  };

  const handleSendOtp = async () => {
    setErrorMsg("");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErrorMsg("Invalid 10-digit number");
      return;
    }
    if (!consent) {
      setErrorMsg("Agreement required to proceed");
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendOtp(phone);
      if (res?.success || res?.status === "success" || res?.message?.toLowerCase().includes("otp sent")) {
        setStep("otp");
      } else {
        setErrorMsg(res?.message || "Failed to send OTP!");
      }
    } catch (err: any) {
      const responseData = err?.response?.data;
      let message =
        responseData?.message ||
        (typeof responseData === "string" ? responseData : null) ||
        err?.message ||
        "Failed to send OTP!";

      if (responseData?.details && !message.includes(responseData.details)) {
        message += ` (${JSON.stringify(responseData.details)})`;
      }

      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrorMsg("");
    if (otp.length !== 6) {
      setErrorMsg("Enter 6-digit OTP");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtp(phone, otp);
      const token = response?.token;

      if (response?.success || response?.status || response?.message?.toLowerCase().includes("otp verified")) {
        if (token) setAuth(phone, token);
        Cookies.set("showRegistrationModal", "true", { expires: 1 });

        triggerLoginStatusChange();

        if (onOtpVerified) {
          onOtpVerified();
          return;
        }

        try {
          const userData = await getUser(phone);
          if (userData?.user) {
            login({ phone, token });
            if (suppressGlobalModal) {
              if (onSuccess) await onSuccess();
              onClose();
            } else {
              onClose();
              Cookies.set("isNewUserRegistration", "false", { expires: 1 });
              window.location.href = "/apply-success";
            }
          } else {
            if (suppressGlobalModal) {
              if (onSuccess) await onSuccess();
              onClose();
            } else {
              openModal();
              setTimeout(() => onClose(), 50);
            }
          }
        } catch (userErr) {
          if (suppressGlobalModal) {
            if (onSuccess) await onSuccess();
            onClose();
          } else {
            openModal();
            setTimeout(() => onClose(), 50);
          }
        }
      } else {
        setErrorMsg(response?.message || "OTP verification failed!");
      }
    } catch (err: any) {
      setErrorMsg(err?.response?.data?.message || "Failed to verify OTP!");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  const isPhoneValid = /^[6-9]\d{9}$/.test(phone);
  const isOtpValid = otp.length === 6;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Institutional Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#00172e]/65 backdrop-blur-md"
        />

        {/* Bank-Grade Modal Card */}
        <motion.div 
          initial={{ scale: 0.96, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 12 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-[390px] my-auto bg-white rounded-2xl shadow-2xl border border-[#E5E2DA] max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2rem)] overflow-y-auto"
        >
          {/* Institutional Top Orange Brand Accent */}
          <div className="sticky top-0 left-0 w-full h-1 bg-[#FF7819] z-20" />

          <div className="p-5 sm:p-6 relative">
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 flex items-center justify-center bg-[#FAF8F5] hover:bg-[#E5E2DA] text-[#002140] hover:text-[#FF7819] rounded-full transition-colors border border-[#E5E2DA]/60 z-10"
            >
              <FaTimes size={11} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center mb-5 mt-1 text-center">
              <motion.div 
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="w-11 h-11 bg-[#FFF3EB] border border-[#FF7819]/25 rounded-xl flex items-center justify-center text-[#FF7819] mb-2.5 shadow-2xs"
              >
                {step === "phone" ? <FaPhoneAlt size={16} /> : <FaLock size={16} />}
              </motion.div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#002140] tracking-tight">
                {step === "phone" ? "Secure Account Login" : "Verify One-Time Password"}
              </h2>
              <p className="text-[11px] font-medium text-slate-500 mt-1">
                {step === "phone" ? "Enter your mobile number to access verified loan offers" : `Enter the 6-digit OTP sent to +91 ${phone}`}
              </p>
            </div>

            {/* Form Area */}
            <div className="space-y-4">
              <AnimatePresence>
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -6 }} 
                    animate={{ opacity: 1, height: "auto", y: 0 }} 
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    className={`text-[11px] font-medium p-2.5 rounded-lg border flex items-start gap-2 shadow-2xs leading-relaxed ${
                      errorMsg.toLowerCase().includes("15 minutes") || errorMsg.toLowerCase().includes("too many requests")
                        ? "bg-amber-50 text-amber-900 border-amber-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }`}
                  >
                    <span className="text-xs shrink-0 mt-0.5">⚠️</span>
                    <span className="flex-1">{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {step === "phone" ? (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-3.5"
                >
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs select-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile number"
                      maxLength={10}
                      autoFocus
                      className="w-full bg-[#FAF8F5] border border-[#E5E2DA] focus:border-[#FF7819] focus:bg-white focus:ring-2 focus:ring-[#FF7819]/15 rounded-lg py-2.5 pl-12 pr-4 text-[#002140] font-semibold text-xs outline-none transition-all placeholder:text-slate-400 placeholder:font-normal"
                    />
                  </div>

                  {/* Statutory Consent Box (Exact text preserved) */}
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E2DA] flex items-start gap-2.5">
                    <div className="relative flex items-center mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={() => setConsent(!consent)}
                        className="peer w-4 h-4 cursor-pointer opacity-0 absolute z-10"
                        id="consent-check"
                      />
                      <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${consent ? 'bg-[#FF7819] border-[#FF7819]' : 'bg-white border-slate-300'}`}>
                         {consent && <FaCheckCircle className="text-white w-2.5 h-2.5" />}
                      </div>
                    </div>
                    <label htmlFor="consent-check" className="text-[10px] font-semibold text-gray-500 leading-relaxed cursor-pointer select-none">
                      I agree to the <Link href="/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline">Terms & Conditions</Link> & <Link href="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline">Privacy Policy</Link> and allow contact via Email, WhatsApp, SMS,RCS or Call.
                    </label>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.99 }}
                    onClick={handleSendOtp}
                    disabled={isLoading || !isPhoneValid || !consent}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex justify-center items-center gap-2 shadow-2xs ${
                      isPhoneValid && consent && !isLoading
                        ? "bg-[#FF7819] hover:bg-[#e66a15] text-white cursor-pointer"
                        : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Send Verification OTP"
                    )}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-3.5"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      placeholder="••••••"
                      maxLength={6}
                      autoFocus
                      className="w-full bg-[#FAF8F5] border border-[#E5E2DA] focus:border-[#002140] focus:bg-white focus:ring-2 focus:ring-[#002140]/15 rounded-lg py-3 text-center text-2xl font-bold tracking-[0.5rem] text-[#002140] outline-none transition-all placeholder:text-slate-300"
                    />
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.99 }}
                    onClick={handleVerifyOtp}
                    disabled={isLoading || !isOtpValid}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex justify-center items-center gap-2 shadow-2xs ${
                      isOtpValid && !isLoading
                        ? "bg-[#002140] hover:bg-[#0A2E5C] text-white cursor-pointer"
                        : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"
                    }`}
                  >
                    {isLoading ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Verify OTP & Continue"
                    )}
                  </motion.button>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setStep("phone")}
                      className="text-[11px] font-bold text-[#FF7819] hover:underline"
                    >
                      ← Change Mobile Number
                    </button>
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isLoading}
                      className="text-[11px] font-semibold text-slate-500 hover:text-[#002140] hover:underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Statutory Trust Bar */}
            <div className="mt-5 pt-3.5 border-t border-[#E5E2DA] flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[10px] text-slate-500 font-semibold">
              <span className="inline-flex items-center gap-1">
                <FaShieldAlt className="text-emerald-600" size={11} />
                256-Bit SSL
              </span>
              <span className="text-slate-300">•</span>
              <span>RBI Regulated Standards</span>
              <span className="text-slate-300">•</span>
              <span>Zero Spam</span>
            </div>
          </div>
        </motion.div> 
      </div>
    </AnimatePresence>
  );
}