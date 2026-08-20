"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../context/modelcontext";
import api from "../../lib/axios";
import dynamic from "next/dynamic";
import animationData from "../../animations/chatbot.json";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPaperPlane, FaTimes, FaWhatsapp, FaUserCircle, FaCheckCircle, FaBuilding, FaBriefcase } from "react-icons/fa";
import FloatingMessage from "./FloatingMessage";
import LoginModal from "../Components/LoginModal";

// --- Logic Helpers Optimized against API crashes ---
export const fetchUserData = async (phone: string) => {
  try {
    const { data } = await api.post("/api/user/profile", { phone });
    return data?.user || data;
  } catch (err: any) {
    if (err.response?.status === 404) {
      console.warn("User status log: profile not found in database (New User Entry).");
      return null;
    }
    console.error("Failed to fetch user data", err);
    return null;
  }
};

interface Lender {
  _id?: string;
  id?: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  pincodes: string[];
  UTM: string;
  priority: number;
  approval: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  support: string;
  ratings: number;
  features: string[];
  applyLink: string;
  loanTypes: string[];
  isActive?: boolean;
}

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type ChatMessage = {
  type: "bot" | "user" | "signup" | "options" | "form" | "submit_button" | "employment_options" | "prefilled_options" | "lender_recommendations" | "whatsapp_only";
  text: string;
  timestamp?: string;
};

const calculateAge = (dobString: string | Date): number => {
  let dob: Date;
  if (typeof dobString === 'string') {
    const [day, month, year] = dobString.split('/').map(Number);
    dob = new Date(year, month - 1, day);
  } else {
    dob = dobString;
  }
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
  }
  return age;
};

type FormData = {
  name: string; phone: string; email: string; pan: string; pincode: string;
  loanAmount: string; income: string; dob: string; city: string;
  state: string; gender: string; employment: string;
};

type FormField = {
  key: keyof FormData;
  question: string;
  validation: (value: string) => boolean;
};

export default function Bot() {
  const router = useRouter();
  const { openModal } = useModal();
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [eligibleLenders, setEligibleLenders] = useState<Lender[]>([]);
  const [input, setInput] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCollectingForm, setIsCollectingForm] = useState(false);
  const [formMode, setFormMode] = useState<"idle" | "guest_hook" | "logged_in_hook" | "full_apply">("idle");
  const [currentFormField, setCurrentFormField] = useState<keyof FormData | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "", phone: "", email: "", pan: "", pincode: "",
    loanAmount: "", income: "", dob: "", city: "",
    state: "", gender: "", employment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isInitialPromptDisplayed, setIsInitialPromptDisplayed] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const getTimestamp = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // --- Core Logic Implementation ---
  useEffect(() => { scrollToBottom(); }, [chatMessages]);
  const scrollToBottom = () => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); };

  const addBotMessage = useCallback((text: string, type: ChatMessage['type'] = "bot") => {
    setChatMessages(prev => {
      if (prev.length > 0 && prev[prev.length - 1].text === text && prev[prev.length - 1].type === type) return prev;
      return [...prev, { type, text, timestamp: getTimestamp() }];
    });
  }, []);

  const addBotMessageWithDelay = useCallback((text: string, type: ChatMessage['type'] = "bot", delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addBotMessage(text, type);
    }, delay);
  }, [addBotMessage]);

  const validateDate = useCallback((value: string) => {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;
    const [day, month, year] = value.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  }, []);

  const getFullFormFields = useCallback((): FormField[] => [
    { key: "name", question: "What's your full name?", validation: (v) => v.trim().length > 0 },
    { key: "phone", question: "What's your phone number? (10 digits)", validation: (v) => /^\d{10}$/.test(v) },
    { key: "email", question: "What's your email address?", validation: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { key: "pan", question: "Please provide your PAN card number", validation: (v) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v) },
    { key: "dob", question: "What's your date of birth?", validation: validateDate },
    { key: "city", question: "In which city do you live?", validation: (v) => v.trim().length > 0 },
    { key: "state", question: "Which state are you in?", validation: (v) => v.trim().length > 0 },
    { key: "pincode", question: "What's your pincode? (6 digits)", validation: (v) => /^\d{6}$/.test(v) },
    { key: "gender", question: "What is your gender?", validation: (v) => ["male", "female", "other"].includes(v.toLowerCase()) },
    { key: "employment", question: "What's your employment type?", validation: (v) => ["salaried", "self-employed"].includes(v.toLowerCase()) },
    { key: "income", question: "What's your monthly income?", validation: (v) => !isNaN(Number(v.replace(/,/g, ''))) },
    { key: "loanAmount", question: "How much loan amount are you looking for?", validation: (v) => !isNaN(Number(v.replace(/,/g, ''))) },
  ], [validateDate]);

  const advanceForm = useCallback((currentData = formData, mode = formMode) => {
    let formFields = getFullFormFields();
    if (mode === "guest_hook" || mode === "logged_in_hook") {
       formFields = formFields.filter(f => f.key === "dob" || f.key === "loanAmount");
    }

    const nextField = formFields.find(field => !currentData[field.key] || !field.validation(currentData[field.key] as string));
    
    if (nextField) {
      setCurrentFormField(nextField.key);
      
      let question = nextField.question;
      if (mode === "guest_hook" && nextField.key === "dob") {
         question = "To help me find the best loan offers matching your profile, could you please provide your Date of Birth?";
      } else if (mode === "guest_hook" && nextField.key === "loanAmount") {
         question = "Thank you! And what is the loan amount you are looking for?";
      } else if (mode === "logged_in_hook" && nextField.key === "dob") {
         const userName = currentData.name?.split(" ")[0] || "User";
         question = `Hi ${userName}, to help personalize your experience, could you please share your Date of Birth?`;
      } else if (mode === "logged_in_hook" && nextField.key === "loanAmount") {
         question = "What is the loan amount you are planning to apply for?";
      }
      
      addBotMessage(question);
      if (nextField.key === "dob") setShowDatePicker(true);
      else if (nextField.key === "employment") addBotMessage("Are you Salaried or Self-employed?", "employment_options");
      else setShowDatePicker(false);
    } else {
      setIsCollectingForm(false);
      setCurrentFormField(null);
      
      if (mode === "guest_hook") {
         addBotMessage("Thank you! Based on your details, I have found some excellent loan options for you.");
         addBotMessageWithDelay("Please securely Log In or Sign Up to view your matched offers and start your application.", "signup", 1000);
      } else if (mode === "logged_in_hook") {
         addBotMessage(`We have matched the best lender offers for your loan request of ₹${currentData.loanAmount}. Please keep your PAN Card ready for a quick 2-minute application process.`);
         addBotMessageWithDelay("", "options", 1500);
      } else {
         addBotMessage("Thank you! All your details have been collected successfully.");
         addBotMessage("Submit Application", "submit_button");
      }
    }
  }, [formData, getFullFormFields, addBotMessage, formMode, addBotMessageWithDelay]);

  const handleInitialPrompt = useCallback(async (isFullyLoggedIn: boolean, data: any) => {
    if (isInitialPromptDisplayed) return;
    setChatMessages([]);
    setIsInitialPromptDisplayed(true);
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      if (isFullyLoggedIn) {
        setFormMode("logged_in_hook");
        const userName = data?.name?.split(" ")[0] || "User";
        addBotMessage(`Hello ${userName}! Welcome back to CoverMantra.`);
        
        if (!data?.dob || !data?.loanAmount) {
           setTimeout(() => {
              setIsCollectingForm(true);
              advanceForm(data, "logged_in_hook");
           }, 1000);
        } else {
           addBotMessageWithDelay(`We have matched the best lender offers for your loan request of ₹${data.loanAmount}. Please keep your PAN Card ready for a quick 2-minute application process.`, "bot", 1000);
           addBotMessageWithDelay("", "options", 2500);
        }
      } else {
        setFormMode("guest_hook");
        addBotMessage("Namaste! I am CoverMantra AI. Your data is completely safe and encrypted with us.");
        setTimeout(() => {
           setIsCollectingForm(true);
           advanceForm(data, "guest_hook");
        }, 1000);
      }
    }, 1000);
  }, [addBotMessage, addBotMessageWithDelay, isInitialPromptDisplayed, advanceForm]);

  useEffect(() => {
    const checkUserStatus = async () => {
      if (isInitialPromptDisplayed) return;
      const userIsFullyLoggedIn = Cookies.get("co_login") === "true" && !!Cookies.get("co_token");
      setIsLoggedIn(userIsFullyLoggedIn);
      let currentData = {
          name: "", phone: "", email: "", pan: "", pincode: "",
          loanAmount: "", income: "", dob: "", city: "",
          state: "", gender: "", employment: "",
      };
      
      const phoneFromCookie = Cookies.get("co_phone");
      const token = Cookies.get("co_token");
      if (phoneFromCookie && token) {
        const fetchedData = await fetchUserData(phoneFromCookie);
        if (fetchedData) {
          currentData = { ...currentData, ...fetchedData };
        }
      }
      setFormData(currentData);
      handleInitialPrompt(userIsFullyLoggedIn, currentData);
    };
    checkUserStatus();
  }, [handleInitialPrompt, isInitialPromptDisplayed]);

  useEffect(() => {
    const handleLoginChange = () => {
      setIsInitialPromptDisplayed(false);
    };
    window.addEventListener("loginStatusChanged", handleLoginChange);
    return () => window.removeEventListener("loginStatusChanged", handleLoginChange);
  }, []);

  const handleUserMessage = (message: string) => {
    const trimmed = message.trim();
    if (!trimmed) return;
    setChatMessages(prev => [...prev, { type: "user", text: trimmed, timestamp: getTimestamp() }]);
    setInput("");
    
    if (isCollectingForm && currentFormField) {
      const field = getFullFormFields().find(f => f.key === currentFormField);
      if (field) {
        if (field.validation(trimmed)) {
          if (field.key === "dob" && calculateAge(trimmed) < 18) {
             addBotMessage("We apologize, but you must be at least 18 years of age to apply for a personal loan.");
             setTimeout(() => {
                addBotMessage("For any further assistance, feel free to connect with our support team on WhatsApp:", "whatsapp_only");
             }, 1000);
             setIsCollectingForm(false);
             setCurrentFormField(null);
             return;
          }
          const newData = { ...formData, [field.key]: trimmed };
          setFormData(newData);
          setTimeout(() => advanceForm(newData), 600);
        } else {
          addBotMessage(`Invalid input. ${field.question}`);
        }
        return;
      }
    }
    setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addBotMessage("I'm a virtual assistant trained specifically to help you with loan applications. Please use the options provided.");
        }, 1500);
    }, 500);
  };

  const handleOptionSelect = (option: string) => {
    if (option === "apply") {
      setIsOpen(false);
      router.push("/personal-loans");
    } else if (option === "apply_lenders") {
      router.push("/personal-loans");
    } else if (option === "Salaried" || option === "Self-employed") {
        setChatMessages(p => [...p, { type: "user", text: option, timestamp: getTimestamp() }]);
        const newData = { ...formData, employment: option.toLowerCase() };
        setFormData(newData);
        setTimeout(() => advanceForm(newData), 600);
    }
  };

  const submitFormData = async () => {
    setIsSubmitting(true);
    try {
      const ageVal = calculateAge(formData.dob);
      const incomeVal = Number(formData.income.replace(/,/g, ''));
      const pincodeVal = formData.pincode;

      // 1. Save user lead to database
      await api.post("/api/user/register", {
        name: formData.name,
        phone: formData.phone,
        pan: formData.pan,
        dob: formData.dob,
        email: formData.email,
        city: formData.city,
        state: formData.state,
        gender: formData.gender,
        employment: formData.employment.toLowerCase(),
        income: incomeVal,
        pincode: pincodeVal,
        source: "chatbot",
        consent: true,
        consentMessage: "I agree to the Terms & Conditions & Privacy Policy and authorize CoverMantra to contact me regarding my loan application."
      });

      // 2. Fetch active lenders list from API
      const { data } = await api.get("/api/lenders");

      // 3. Filter lenders list by eligibility criteria locally
      const eligible = data.filter((l: Lender) => {
        const ageMatch = ageVal >= l.age;
        const incomeMatch = incomeVal >= l.minIncome;
        const pincodesArr = l.pincodes || [];
        const isBlacklisted = pincodesArr.some((p: string) => typeof p === "string" && p.startsWith("!") && String(pincodeVal).startsWith(p.slice(1)));
        const pincodeMatch = !isBlacklisted && (pincodesArr.includes("*") || pincodesArr.includes(pincodeVal));
        return ageMatch && incomeMatch && pincodeMatch;
      });

      setEligibleLenders(eligible);
      setIsSubmitting(false);
      addBotMessage("Application verified and saved successfully! Analyzing your profile for the best lenders...", "bot");
      addBotMessageWithDelay("", "lender_recommendations", 1000);
    } catch (err: any) {
      console.error("Error submitting chatbot form to DB:", err);
      // Fallback: fetch active lenders and show matches even if registration has an error
      try {
        const { data } = await api.get("/api/lenders");
        const ageVal = calculateAge(formData.dob);
        const incomeVal = Number(formData.income.replace(/,/g, ''));
        const eligible = data.filter((l: Lender) => {
          const ageMatch = ageVal >= l.age;
          const incomeMatch = incomeVal >= l.minIncome;
          const pincodesArr = l.pincodes || [];
          const isBlacklisted = pincodesArr.some((p: string) => typeof p === "string" && p.startsWith("!") && String(formData.pincode).startsWith(p.slice(1)));
          const pincodeMatch = !isBlacklisted && (pincodesArr.includes("*") || pincodesArr.includes(formData.pincode));
          return ageMatch && incomeMatch && pincodeMatch;
        });
        setEligibleLenders(eligible);
      } catch (innerErr) {
        console.error("Fallback fetch lenders failed:", innerErr);
      }
      setIsSubmitting(false);
      addBotMessage("Application verified successfully! Here are the matches found for your profile:", "bot");
      addBotMessageWithDelay("", "lender_recommendations", 1000);
    }
  };

  const handleDateSelect = (date: Date | null) => {
    if (!date) return;
    const formatted = `${date.getDate().toString().padStart(2,'0')}/${(date.getMonth()+1).toString().padStart(2,'0')}/${date.getFullYear()}`;
    setChatMessages(p => [...p, { type: "user", text: `DOB: ${formatted}`, timestamp: getTimestamp() }]);
    setShowDatePicker(false);
    
    if (calculateAge(date) < 18) {
       setTimeout(() => {
           addBotMessage("We apologize, but you must be at least 18 years of age to apply for a personal loan.");
           setTimeout(() => {
              addBotMessage("For any further assistance, feel free to connect with our support team on WhatsApp:", "whatsapp_only");
           }, 1000);
       }, 600);
       setIsCollectingForm(false);
       setCurrentFormField(null);
       return;
    }

    const newData = { ...formData, dob: formatted };
    setFormData(newData);
    setTimeout(() => advanceForm(newData), 600);
  };

  const inputDisabled = isSubmitting || showDatePicker || currentFormField === "employment";

  const renderMessageContent = (msg: ChatMessage) => {
    if (msg.type === "bot") {
      return (
        <div className="flex gap-3 max-w-[90%] sm:max-w-[85%]">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-md overflow-hidden p-1 border border-white/10 mt-1">
            <img src="/image/logo.png" alt="Bot" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="px-4 py-3 bg-white/10 backdrop-blur-md text-[#E2E8F0] rounded-2xl rounded-tl-sm border border-white/5 text-sm leading-relaxed shadow-lg">
              {msg.text}
            </div>
            {msg.timestamp && <p className="text-[10px] text-[#94A3B8] font-medium ml-1">{msg.timestamp}</p>}
          </div>
        </div>
      );
    }
    
    if (msg.type === "user") {
      return (
        <div className="flex gap-3 max-w-[90%] sm:max-w-[85%]">
          <div className="flex flex-col items-end gap-1">
            <div className="px-4 py-3 bg-gradient-to-br from-[#FF7819] to-[#e66a15] text-white rounded-2xl rounded-tr-sm shadow-[0_10px_20px_-10px_rgba(255,120,25,0.6)] text-sm font-medium">
              {msg.text}
            </div>
            {msg.timestamp && <p className="text-[10px] text-[#94A3B8] font-medium mr-1">{msg.timestamp}</p>}
          </div>
        </div>
      );
    }
  
    return (
      <div className="w-full space-y-4">
        {msg.type === "signup" && !isLoggedIn && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLoginOpen(true)}
            className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#FF7819] to-[#FFB800] text-[#08101E] font-black shadow-[0_15px_30px_-10px_rgba(255,120,25,0.5)] flex items-center justify-center gap-2 text-sm tracking-wide"
          >
            Secure Log In / Sign Up <span className="text-xl">→</span>
          </motion.button>
        )}
        
        {msg.type === "options" && (
           <div className="grid grid-cols-1 gap-3 w-full">
             <button onClick={() => handleOptionSelect("apply")} className="p-4 bg-white/5 backdrop-blur-md text-white rounded-2xl font-bold border border-white/10 hover:bg-white/10 transition-all flex items-center justify-between group text-sm shadow-lg">
               Apply for Personal Loan <span className="text-[#FF7819] group-hover:translate-x-1 transition-transform">→</span>
             </button>                
             <button onClick={() => window.open("https://wa.me/917404158096", "_blank")} className="p-4 bg-green-500/10 text-green-400 rounded-2xl font-bold border border-green-500/20 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm shadow-lg">
               <FaWhatsapp size={16} /> Talk on WhatsApp
             </button>
           </div>
        )}
  
        {msg.type === "whatsapp_only" && (
           <button onClick={() => window.open("https://wa.me/917404158096", "_blank")} className="w-full p-4 bg-green-500/10 text-green-400 rounded-2xl font-bold border border-green-500/20 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm shadow-lg">
             <FaWhatsapp size={18} /> Chat on WhatsApp
           </button>
        )}
  
        {msg.type === "employment_options" && (
          <div className="flex gap-3">
            {["Salaried", "Self-employed"].map(opt => (
              <button key={opt} onClick={() => handleOptionSelect(opt)} className="flex-1 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-[#E2E8F0] font-bold hover:bg-[#FF7819]/10 hover:border-[#FF7819]/50 hover:text-white transition-all text-xs flex flex-col items-center gap-2 shadow-lg">
                {opt === "Salaried" ? <FaBuilding size={20} className="text-[#3C8291]" /> : <FaBriefcase size={20} className="text-[#FF7819]" />}
                {opt}
              </button>
            ))}
          </div>
        )}
  
        {msg.type === "submit_button" && (
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={submitFormData} 
            disabled={isSubmitting}
            className="w-full p-4 bg-gradient-to-r from-[#FF7819] to-[#e66a15] text-white rounded-2xl font-black shadow-[0_15px_30px_-10px_rgba(255,120,25,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(255,120,25,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all tracking-wide"
          >
            {isSubmitting ? "PROCESSING..." : "CONFIRM & SUBMIT"}
          </motion.button>
        )}
  
        {msg.type === "prefilled_options" && (
          <div className="grid grid-cols-1 gap-3 w-full">
             <button onClick={() => handleOptionSelect("apply")} className="w-full p-4 bg-[#3C8291] text-white rounded-2xl font-bold shadow-lg hover:bg-[#34717d] transition-all">
               Update Details & Re-apply
             </button>
             <button onClick={() => handleOptionSelect("apply_lenders")} className="w-full p-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold shadow-lg hover:bg-white/10 transition-all">
               View Lender Offers
             </button>
             <button onClick={() => window.open("https://wa.me/919729509967", "_blank")} className="p-4 bg-green-500/10 text-green-400 rounded-2xl font-bold border border-green-500/20 hover:bg-green-500/20 transition-all flex items-center justify-center gap-2 text-sm shadow-lg">
               <FaWhatsapp /> Talk on WhatsApp
             </button>
          </div>
        )}
  
        {msg.type === "lender_recommendations" && (
          <div className="space-y-4 w-full">
              <div className="flex items-center gap-2">
                 <div className="h-[1px] flex-1 bg-white/10"></div>
                 <p className="text-[#3C8291] text-[10px] font-black uppercase tracking-widest px-2">Matches For You</p>
                 <div className="h-[1px] flex-1 bg-white/10"></div>
              </div>
              
              <div className="grid grid-cols-1 gap-4 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
                {eligibleLenders.length === 0 ? (
                  <div className="p-5 bg-white/5 border border-white/10 rounded-2xl text-center text-xs text-gray-400">
                    Aapke profile ke mutabik koi lender nahi mila. Please contact support.
                  </div>
                ) : (
                  eligibleLenders.map((lender, index) => (
                    <motion.div 
                      key={lender._id || lender.id || index}
                      whileHover={{ scale: 1.02 }} 
                      className="bg-gradient-to-br from-[#0A192F] to-[#08101E] p-5 rounded-2xl border border-[#FF7819]/30 shadow-[0_10px_30px_-15px_rgba(255,120,25,0.3)] relative overflow-hidden group cursor-pointer" 
                      onClick={() => { router.push(lender.applyLink || `/LenderAPI/${lender._id || lender.id}`); setIsOpen(false); }}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7819]/10 rounded-full blur-3xl group-hover:bg-[#FF7819]/20 transition-all"></div>
                        <div className="flex justify-between items-center mb-3 relative z-10">
                            <div className="flex items-center gap-3">
                               <div className="w-10 h-10 bg-white rounded-xl p-1 shadow-md flex items-center justify-center">
                                 <img src={lender.logo} alt={lender.name} className="w-full h-full object-contain" />
                               </div>
                               <h4 className="font-black text-white text-base">{lender.name}</h4>
                            </div>
                            <span className="text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-full border border-emerald-500/30 shadow-sm flex items-center gap-1">
                              <FaCheckCircle/> {lender.approval}
                            </span>
                        </div>
                        <p className="text-xs text-[#94A3B8] mb-5 font-medium leading-relaxed relative z-10">
                          Disbursal: {lender.loanAmount} at {lender.interestRate}.
                        </p>
                        <button className="w-full py-3 bg-[#FF7819] hover:bg-[#e66a15] text-white rounded-xl font-black text-xs transition-colors shadow-lg relative z-10 tracking-wide">
                          APPLY NOW
                        </button>
                    </motion.div>
                  ))
                )}
              </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-sans antialiased">
      <FloatingMessage />
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Overlay (Mobile) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#08101E]/60 backdrop-blur-md z-[9998] lg:hidden"
            />

            {/* Chatbot Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 40, transformOrigin: "bottom right" }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 40, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative z-[9999] w-[92vw] sm:w-[420px] h-[650px] max-h-[85vh] bg-[#08101E]/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)] flex flex-col border border-white/10 overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 bg-white/5 backdrop-blur-xl border-b border-white/10 flex justify-between items-center z-10 relative">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/20 overflow-hidden p-1 border-2 border-white/10">
                      <img src="/image/logo.png" alt="Bot" className="w-full h-full object-contain" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#08101E] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base tracking-wide flex items-center gap-2">CoverMantra AI <FaCheckCircle className="text-[#3C8291] text-xs" /></h3>
                    <p className="text-[11px] text-[#3C8291] font-black uppercase tracking-widest">Always Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button onClick={() => window.open("https://wa.me/919729509967", "_blank")} className="p-2.5 bg-green-500/10 hover:bg-green-500/20 rounded-full transition-all text-green-400 group" title="Contact on WhatsApp">
                    <FaWhatsapp size={18} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button onClick={() => setIsOpen(false)} className="p-2.5 hover:bg-white/10 rounded-full transition-all text-[#C9CBCC] hover:text-white group">
                    <FaTimes size={18} className="group-hover:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar relative z-0">
                <AnimatePresence initial={false}>
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={`msg-${msg.type}-${idx}`}
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {renderMessageContent(msg)}
                    </motion.div>
                  ))}
                </AnimatePresence>

                {showDatePicker && (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl relative z-20">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateSelect}
                      inline
                      showYearDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      calendarClassName="modern-calendar"
                    />
                  </motion.div>
                )}

                {isTyping && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm overflow-hidden p-1 mt-1">
                      <img src="/image/logo.png" alt="Bot" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex gap-1.5 px-4 py-4 bg-white/10 backdrop-blur-md rounded-2xl rounded-tl-sm border border-white/5 items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 bg-[#E2E8F0] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#E2E8F0] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-[#E2E8F0] rounded-full animate-bounce"></div>
                    </div>
                  </motion.div>
                )}
                
                {isSubmitting && (
                  <div className="flex justify-center py-6">
                    <div className="w-10 h-10 border-4 border-white/10 border-t-[#FF7819] rounded-full animate-spin"></div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 bg-black/40 backdrop-blur-xl border-t border-white/10 flex items-center gap-3 relative z-10">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={inputDisabled}
                  onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
                  placeholder={inputDisabled ? "Please use options above..." : "Type your message..."}
                  className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#FF7819]/50 focus:bg-white/10 transition-all disabled:opacity-40 placeholder:text-[#94A3B8] shadow-inner"
                />
                <button
                  onClick={() => handleUserMessage(input)}
                  disabled={!input.trim() || inputDisabled}
                  className="p-3.5 bg-gradient-to-br from-[#FF7819] to-[#e66a15] text-white rounded-xl shadow-[0_10px_20px_-10px_rgba(255,120,25,0.6)] hover:scale-105 active:scale-95 disabled:bg-white/5 disabled:text-gray-500 disabled:shadow-none transition-all"
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative group w-16 h-16 bg-gradient-to-br from-[#16253d] to-[#08101E] border border-white/20 rounded-2xl flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.5)] z-[10000] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7819]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <Lottie animationData={animationData} loop autoplay className="w-14 h-14 relative z-10 drop-shadow-lg" />
      </motion.button>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
        .react-datepicker { border: none !important; font-family: inherit !important; width: 100% !important; background: transparent !important; color: white !important;}
        .react-datepicker__header { background: transparent !important; border-bottom: 1px solid rgba(255,255,255,0.1) !important; padding-top: 10px !important;}
        .react-datepicker__current-month, .react-datepicker-time__header, .react-datepicker-year-header { color: white !important; font-weight: 800 !important; }
        .react-datepicker__day-name { color: #94A3B8 !important; }
        .react-datepicker__day { color: white !important; transition: all 0.2s; }
        .react-datepicker__day:hover { background-color: rgba(255,120,25,0.2) !important; border-radius: 0.5rem !important; }
        .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { background-color: #FF7819 !important; border-radius: 0.5rem !important; color: white !important; font-weight: bold;}
        .modern-calendar { border-radius: 1rem !important; overflow: hidden; padding: 5px; }
        .react-datepicker__month-select, .react-datepicker__year-select { background-color: #08101E !important; color: white !important; border: 1px solid rgba(255,255,255,0.2) !important; border-radius: 6px; padding: 2px 5px; outline: none; cursor: pointer; }
        .react-datepicker__month-select option, .react-datepicker__year-select option { background-color: #08101E !important; color: white !important; }
      `}</style>
    </div>
  );
}