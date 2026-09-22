"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../context/modelcontext";
import Cookies from "js-cookie";
import Link from "next/link";
import { registerUser } from "../APIs/utils";
import { 
  X, ShieldCheck, MapPin, Briefcase, IndianRupee, User, 
  Mail, Phone, Calendar, Landmark, ArrowRight, ArrowLeft 
} from "lucide-react";

interface GlobalModalProps {
  onFormSubmit?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const GlobalModal: React.FC<GlobalModalProps> = ({ onFormSubmit }) => {
  const { isOpen, closeModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);

  const emptyForm = React.useMemo(() => ({
    name: "",
    phone: "",
    email: "",
    employeeType: "",
    pan: "",
    pincode: "",
    loanAmount: "",
    income: "",
    state: "",
    city: "",
    dob: "",
    gender: "",
    salaryMode: "",
    bankName: "",
    salarySlip: "",
    businessName: "",
    businessType: "",
    doesITR: "",
    doesGST: "",
  }), []);

  const [form, setForm] = useState(emptyForm);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1); // Reset to step 1 when modal opens
      setErrorMsg(""); // Clear error message
      const savedFormData = Cookies.get("loanFormData");
      const savedPhone = Cookies.get("co_phone");
      if (savedPhone && savedFormData) {
        const parsedData = JSON.parse(savedFormData);
        setForm(prev => ({ 
          ...emptyForm, 
          ...parsedData, 
          phone: savedPhone 
        }));
      } else {
        setForm(prev => ({ ...emptyForm, phone: savedPhone || "" }));
      }
    }
  }, [isOpen, emptyForm]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === "pan") {
      const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
      setForm(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    if (name === "pincode") {
      const cleaned = value.replace(/\D/g, "").slice(0, 6);
      setForm(prev => ({ ...prev, [name]: cleaned }));
      if (cleaned.length === 6) {
        try {
          const res = await fetch(`https://api.postalpincode.in/pincode/${cleaned}`);
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
      return;
    }

    if (name === "loanAmount" || name === "income") {
      const cleaned = value.replace(/\D/g, "");
      setForm(prev => ({ ...prev, [name]: cleaned }));
      return;
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent || isSubmitting) return;
    setErrorMsg("");
    setIsSubmitting(true);

    try {
      const payload: any = { 
        ...form, 
        pan: form.pan.toUpperCase(),
        employment: form.employeeType,
        city: form.city || "Unknown",
        state: form.state || "Unknown",
        consent: true,
        consentMessage: "I agree to the Terms & Conditions & Privacy Policy and to be contacted via Email, WhatsApp, SMS,RCS or Call regarding my dynamic loan application."
      };
      await registerUser(payload);
      Cookies.set("loanFormData", JSON.stringify(form), { expires: 7 });
      Cookies.set("loanFormSubmitted", "true", { expires: 7 });
      Cookies.set("isNewUserRegistration", "true", { expires: 1 });
      setIsSubmitting(false);
      onFormSubmit?.();
      closeModal();
      window.location.href = "/apply-success";
    } catch (err: any) {
      setIsSubmitting(false);
      const serverError = err.response?.data?.message || err.response?.data || "Failed to register. Please check your details.";
      setErrorMsg(serverError);
    }
  };

  if (!isOpen) return null;

  // Real-time format validators
  const isValidEmail = (emailStr: string) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailStr.trim());
  };

  const isValidPAN = (panStr: string) => {
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panStr.trim().toUpperCase());
  };

  // Step Validation Real-time Checkers
  const isStep1Valid = form.name.trim().length >= 2 && isValidEmail(form.email) && form.phone && form.gender && form.dob;
  const isStep2Valid = isValidPAN(form.pan) && form.pincode.length === 6 && form.city && form.state && Number(form.loanAmount) >= 10000 && Number(form.income) > 0;

  // Max date for DOB input (18 years ago)
  const getMaxDobDate = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split("T")[0];
  };

  // Dynamic validation helper error messages for UI feedback
  const nameError = form.name && form.name.trim().length < 2 ? "Name must be at least 2 characters long" : "";
  const emailError = form.email && !isValidEmail(form.email) ? "Invalid email format" : "";
  const panError = form.pan && !isValidPAN(form.pan) ? "PAN format must be ABCDE1234F" : "";
  const pincodeError = form.pincode && form.pincode.length < 6 ? "Pincode must be exactly 6 digits" : "";
  const loanAmountError = form.loanAmount && Number(form.loanAmount) < 10000 ? "Minimum loan amount is ₹10,000" : "";
  const incomeError = form.income && Number(form.income) < 5000 ? "Minimum monthly income is ₹5,000" : "";
  
  const isSalariedValid = form.employeeType === "salaried" ? (form.salaryMode && form.bankName) : true;
  const isSelfEmployedValid = form.employeeType === "self-employed" ? (form.businessName && form.businessType && form.doesITR && form.doesGST) : true;
  const isStep3Valid = form.employeeType && isSalariedValid && isSelfEmployedValid && consent;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Institutional Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeModal}
          className="fixed inset-0 bg-[#00172e]/65 backdrop-blur-md"
        />

        {/* Bank-Grade Modal Card */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-[#E5E2DA] overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-2.5rem)] z-10"
        >
          {/* Top Brand Accent Bar */}
          <div className="w-full h-1 bg-[#FF7819] shrink-0" />

          {/* Institutional Header */}
          <div className="bg-[#00172e] px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 border-b border-[#002140]">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="bg-[#FFF3EB] p-2 rounded-lg text-[#FF7819] border border-[#FF7819]/25 shadow-2xs shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div>
                <h3 className="text-white font-extrabold tracking-tight text-sm sm:text-base">
                  Pre-Approved Loan Application
                </h3>
                <p className="text-[#FF7819] text-[10px] font-bold uppercase tracking-wider">
                  RBI Regulated LSP • 256-Bit SSL Encrypted
                </p>
              </div>
            </div>
            <button 
              onClick={closeModal} 
              aria-label="Close modal"
              className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-300 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Procedural Step Progress Tracker */}
          <div className="bg-[#FAF8F5] px-4 sm:px-10 py-3 border-b border-[#E5E2DA] flex justify-between items-center relative select-none shrink-0">
            <div className="absolute left-8 right-8 sm:left-14 sm:right-14 top-1/2 h-[2px] bg-[#E5E2DA] -translate-y-1/2 z-0" />
            <div 
              className="absolute left-8 sm:left-14 top-1/2 h-[2px] bg-[#FF7819] -translate-y-1/2 z-0 transition-all duration-300"
              style={{ width: `${currentStep === 1 ? 0 : currentStep === 2 ? 50 : 100}%` }}
            />
            
            {[
              { step: 1, label: "Personal Details" },
              { step: 2, label: "Financial Profile" },
              { step: 3, label: "Underwriting Consent" }
            ].map((s) => (
              <div key={s.step} className="relative z-10 flex flex-col items-center">
                <div 
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-extrabold border transition-all duration-300 ${
                    currentStep >= s.step 
                      ? "bg-[#FF7819] border-[#FF7819] text-white shadow-2xs" 
                      : "bg-white border-[#E5E2DA] text-slate-400"
                  }`}
                >
                  {s.step}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider mt-1 hidden xs:block sm:block ${currentStep >= s.step ? "text-[#002140]" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Form Area with Scroll Support */}
          <div className="p-4 sm:p-6 md:p-7 overflow-y-auto custom-scrollbar flex-grow bg-white">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <AnimatePresence>
                {errorMsg && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, y: -6 }} 
                    animate={{ opacity: 1, height: "auto", y: 0 }} 
                    exit={{ opacity: 0, height: 0, y: -6 }}
                    className="bg-red-50 text-red-700 text-xs font-medium p-2.5 rounded-lg border border-red-200 flex items-center gap-2 shadow-2xs leading-relaxed"
                  >
                    <span className="shrink-0 text-sm">⚠️</span> 
                    <span className="flex-1">{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* STEP 1: PERSONAL PARAMETERS */}
              {currentStep === 1 && (
                <motion.div 
                  initial={{ opacity: 0, x: -8 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
                >
                  <InputField label="Full Legal Name" name="name" value={form.name} onChange={handleChange} icon={<User size={16}/>} placeholder="As per PAN card" error={nameError} />
                  <InputField label="Email Address" name="email" value={form.email} onChange={handleChange} icon={<Mail size={16}/>} type="email" placeholder="example@domain.com" error={emailError} />
                  <InputField label="Registered Mobile" name="phone" value={form.phone} onChange={handleChange} icon={<Phone size={16}/>} readOnly={true} />
                  
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">Gender *</label>
                    <div className="relative">
                      <select name="gender" value={form.gender} onChange={handleChange} className="select-style" required>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <InputField label="Date of Birth" name="dob" value={form.dob} onChange={handleChange} icon={<Calendar size={16}/>} type="date" max={getMaxDobDate()} />
                </motion.div>
              )}

              {/* STEP 2: FINANCIAL PARAMETERS */}
              {currentStep === 2 && (
                <motion.div 
                  initial={{ opacity: 0, x: 8 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4"
                >
                  <InputField label="PAN Card Number" name="pan" value={form.pan} onChange={handleChange} icon={<ShieldCheck size={16}/>} placeholder="ABCDE1234F" className="uppercase tracking-widest font-mono" maxLength={10} error={panError} />
                  <InputField label="Current Postal Pincode" name="pincode" value={form.pincode} onChange={handleChange} icon={<MapPin size={16}/>} placeholder="6-digit pincode" maxLength={6} error={pincodeError} />
                  <InputField label="City" name="city" value={form.city} onChange={handleChange} icon={<MapPin size={16}/>} placeholder="Auto-populated / Enter City" />
                  <InputField label="State" name="state" value={form.state} onChange={handleChange} icon={<MapPin size={16}/>} placeholder="Auto-populated / Enter State" />
                  <InputField label="Required Loan Amount" name="loanAmount" value={form.loanAmount} onChange={handleChange} icon={<IndianRupee size={16}/>} type="number" placeholder="Min ₹10,000" error={loanAmountError} />
                  <InputField label="Monthly Net Take-Home" name="income" value={form.income} onChange={handleChange} icon={<IndianRupee size={16}/>} type="number" placeholder="Verified Monthly Income" error={incomeError} />
                </motion.div>
              )}

              {/* STEP 3: EMPLOYMENT VERIFICATION & CONSENT */}
              {currentStep === 3 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.99 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-1 w-full">
                      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">Employment Type *</label>
                      <select name="employeeType" value={form.employeeType} onChange={handleChange} className="select-style" required>
                        <option value="">Select Employment Type</option>
                        <option value="salaried">Salaried Professional</option>
                        <option value="self-employed">Self-Employed / Business Owner</option>
                      </select>
                    </div>
                  </div>

                  {/* Salaried Sub-Form */}
                  {form.employeeType === "salaried" && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5E2DA]">
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">Primary Salary Bank *</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF7819] pointer-events-none"><Landmark size={16} /></span>
                          <select name="bankName" value={form.bankName} onChange={handleChange} className="select-style !bg-white pl-10" required>
                            <option value="">Select Salary Account Bank</option>
                            <option value="HDFC">HDFC Bank</option>
                            <option value="SBI">State Bank of India (SBI)</option>
                            <option value="ICICI">ICICI Bank</option>
                            <option value="AXIS">Axis Bank</option>
                            <option value="KOTAK">Kotak Mahindra Bank</option>
                            <option value="Other">Other Scheduled Bank</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">Salary Disbursal Mode *</label>
                        <select name="salaryMode" value={form.salaryMode} onChange={handleChange} className="select-style !bg-white" required>
                          <option value="">Select Disbursal Mode</option>
                          <option value="bank-transfer">Direct Bank Transfer (NEFT/RTGS)</option>
                          <option value="cash">Cheque / Cash</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Self-Employed Sub-Form */}
                  {form.employeeType === "self-employed" && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 bg-[#FAF8F5] rounded-xl border border-[#E5E2DA]">
                      <InputField label="Registered Business / Shop Name" name="businessName" value={form.businessName} onChange={handleChange} icon={<Briefcase size={16}/>} placeholder="Company / Enterprise Name" className="!bg-white" />
                      <InputField label="Nature of Business" name="businessType" value={form.businessType} onChange={handleChange} icon={<Briefcase size={16}/>} placeholder="Retail / Trading / Service" className="!bg-white" />
                      
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">ITR Filed in Last 2 Years? *</label>
                        <select name="doesITR" value={form.doesITR} onChange={handleChange} className="select-style !bg-white" required>
                          <option value="">Select ITR Status</option>
                          <option value="yes">Yes, Regularly Filed</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-1 w-full">
                        <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">Active GST Registration? *</label>
                        <select name="doesGST" value={form.doesGST} onChange={handleChange} className="select-style !bg-white" required>
                          <option value="">Select GST Status</option>
                          <option value="yes">Yes, Active GSTIN</option>
                          <option value="no">No</option>
                        </select>
                      </div>
                    </motion.div>
                  )}

                  {/* Statutory Consent Box (Exact note preserved) */}
                  <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5E2DA] flex items-start gap-2.5">
                    <input 
                      type="checkbox" 
                      id="global-modal-consent"
                      checked={consent} 
                      onChange={() => setConsent(!consent)} 
                      className="mt-0.5 w-4 h-4 accent-[#FF7819] cursor-pointer shrink-0" 
                    />
                    <label htmlFor="global-modal-consent" className="text-[10px] sm:text-[11px] text-slate-600 font-medium cursor-pointer leading-relaxed select-none">
                      I agree to the <Link href="/terms" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline font-bold">Terms & Conditions</Link> & <Link href="/privacy" target="_blank" onClick={(e) => e.stopPropagation()} className="text-[#FF7819] hover:underline font-bold">Privacy Policy</Link> and to be contacted via Email, WhatsApp, SMS,RCS or Call regarding my dynamic loan application.
                    </label>
                  </div>
                </motion.div>
              )}

              {/* Step Navigation Controls */}
              <div className="pt-3.5 border-t border-[#E5E2DA] flex items-center justify-between gap-3 shrink-0">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev - 1)}
                    className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 border border-[#E5E2DA] rounded-lg font-bold text-xs text-[#002140] bg-white hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                  >
                    <ArrowLeft size={14} /> Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="inline-flex items-center gap-1.5 px-6 sm:px-7 py-2.5 bg-[#FF7819] text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-2xs hover:bg-[#e66a15] disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                  >
                    Next Step <ArrowRight size={14} />
                  </button>
                ) : (
                  <motion.button
                    whileHover={isStep3Valid && !isSubmitting ? { scale: 1.01 } : {}}
                    whileTap={isStep3Valid && !isSubmitting ? { scale: 0.99 } : {}}
                    type="submit"
                    disabled={!isStep3Valid || isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 sm:px-9 py-2.5 bg-[#FF7819] text-white rounded-lg font-bold uppercase tracking-wider text-xs shadow-2xs hover:bg-[#e66a15] disabled:opacity-40 disabled:cursor-not-allowed transition-all min-w-[150px] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Submit Application"
                    )}
                  </motion.button>
                )}
              </div>

            </form>
          </div>
        </motion.div>
      </div>

      {/* Select Field & Scrollbar Styles */}
      <style jsx global>{`
        .select-style {
          width: 100%;
          padding: 0.625rem 0.875rem;
          background-color: #FAF8F5;
          border: 1px solid #E5E2DA;
          border-radius: 0.5rem;
          outline: none;
          font-weight: 600;
          font-size: 0.75rem;
          color: #002140;
          transition: all 0.2s;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23002140' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 0.875rem;
        }
        .select-style:focus {
          border-color: #FF7819;
          background-color: #ffffff;
          box-shadow: 0 0 0 2px rgba(255, 120, 25, 0.15);
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #FF7819; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
      `}</style>
    </AnimatePresence>
  );
};

// Reusable Sub-Component for Clean Input Fields
function InputField({ label, icon, error, className = "", ...props }: any) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-[10px] font-bold text-slate-600 uppercase tracking-wider ml-0.5">{label} *</label>
      <div className="relative w-full">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#FF7819] pointer-events-none">
          {icon}
        </span>
        <input
          {...props}
          className={`w-full bg-[#FAF8F5] border ${error ? 'border-red-400 focus:border-red-500' : 'border-[#E5E2DA] focus:border-[#FF7819]'} focus:bg-white focus:ring-2 focus:ring-[#FF7819]/15 rounded-lg pl-10 pr-3.5 py-2.5 text-[#002140] font-semibold text-xs outline-none transition-all shadow-2xs placeholder:text-slate-400 placeholder:font-normal ${className}`}
          required
        />
      </div>
      {error && <p className="text-red-500 text-[9px] font-bold tracking-wide mt-0.5 ml-0.5">{error}</p>}
    </div>
  );
}

export default GlobalModal;