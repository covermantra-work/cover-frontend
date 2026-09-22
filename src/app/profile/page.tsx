"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import { fetchUserData, updateUserProfile } from "../APIs/utils";
import Cookies from "js-cookie";
import { 
  User, 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Briefcase, 
  IndianRupee, 
  ShieldCheck, 
  LogOut,
  X,
  Edit,
  Save,
  XCircle,
  CheckCircle
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { isAuthenticated, phone, logout } = useAuthStore();
  
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // If not authenticated, check cookies before redirecting
    const hasLoginCookie = Cookies.get("co_login") === "true";
    const storedPhone = Cookies.get("co_phone");
    
    if ((!isAuthenticated && !hasLoginCookie) || (!phone && !storedPhone)) {
      router.push("/");
      return;
    }

    const currentPhone = phone || storedPhone;

    const loadProfile = async () => {
      try {
        const data = await fetchUserData(currentPhone!);
        if (data) {
          setUserData(data);
          setEditData(data);
        } else {
          // Fallback if user data fails to load
          setUserData(null);
          logout();
          localStorage.removeItem("userInfo");
          window.dispatchEvent(new Event("loginStatusChanged"));
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, phone, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-16 flex flex-col items-center justify-center font-sans p-4">
        <div className="w-11 h-11 border-3 border-[#FF7819]/25 border-t-[#FF7819] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#002140] font-extrabold tracking-wider uppercase text-xs">Accessing Borrower Account...</p>
        <span className="text-[10px] text-slate-400 mt-1">256-Bit Encrypted Data Session</span>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-16 flex flex-col items-center justify-center font-sans text-center px-4">
        <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mb-3.5 border border-red-200">
          <XCircle size={24} />
        </div>
        <h2 className="text-xl font-extrabold text-[#002140] mb-1.5">Profile Session Expired</h2>
        <p className="text-xs text-slate-600 mb-5 max-w-sm">We couldn't retrieve your profile records. Please log in again to continue.</p>
        <button 
          onClick={() => { 
            logout(); 
            localStorage.removeItem("userInfo");
            window.dispatchEvent(new Event("loginStatusChanged"));
            window.location.href = "/"; 
          }}
          className="px-6 py-2.5 bg-[#FF7819] hover:bg-[#e66a15] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all cursor-pointer"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");
    try {
      await updateUserProfile(editData);
      setUserData(editData);
      setIsEditing(false);
      setSuccessMessage("Profile saved successfully!");
      setTimeout(() => setSuccessMessage(""), 3500);
    } catch (err: any) {
      console.error("Failed to save profile", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to save profile. Please check all fields.";
      setErrorMessage(msg);
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] font-sans pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8 text-[#002140]">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ========================================================================= */}
        {/* TOP STATUS ALERTS */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xs"
            >
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </motion.div>
          )}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-800 px-4 py-2.5 rounded-xl text-xs font-bold shadow-2xs"
            >
              <X size={16} className="text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 1. INSTITUTIONAL ACCOUNT HEADER CARD */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E2DA] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5">
          {/* Identity & Status */}
          <div className="flex items-center gap-4">
            <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-xl bg-[#FFF3EB] border border-[#FF7819]/30 flex items-center justify-center text-[#FF7819] shadow-2xs shrink-0">
              <User size={28} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-lg sm:text-2xl font-extrabold text-[#002140] tracking-tight">
                  {userData.name || "Borrower"}
                </h1>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <ShieldCheck size={11} className="text-emerald-600" />
                  Verified Account
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                <span>Phone: <strong className="font-mono text-[#002140]">+91 {userData.phone}</strong></span>
                <span className="text-slate-300">•</span>
                <span className="text-[11px] text-slate-400">RBI Regulated Origination</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 border-[#E5E2DA]/60">
            <button 
              onClick={() => router.push("/personal-loans")}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#FF7819] hover:bg-[#e66a15] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-2xs transition-all cursor-pointer"
            >
              <Briefcase size={13} />
              <span>Apply for Loan</span>
            </button>

            {isEditing ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-2xs transition-all cursor-pointer disabled:opacity-60"
                >
                  {isSaving ? <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={13} />}
                  <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                </button>
                <button 
                  onClick={() => { setIsEditing(false); setEditData(userData); }}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#FAF8F5] hover:bg-slate-100 text-slate-600 font-bold text-xs uppercase tracking-wider rounded-lg border border-[#E5E2DA] transition-all cursor-pointer"
                >
                  <XCircle size={13} />
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#FAF8F5] text-[#002140] font-bold text-xs uppercase tracking-wider rounded-lg border border-[#E5E2DA] shadow-2xs transition-all cursor-pointer"
              >
                <Edit size={13} />
                <span>Edit Profile</span>
              </button>
            )}

            <button 
              onClick={() => { 
                logout(); 
                localStorage.removeItem("userInfo");
                window.dispatchEvent(new Event("loginStatusChanged"));
                window.location.href = "/"; 
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100/80 text-red-600 font-bold text-xs uppercase tracking-wider rounded-lg border border-red-200/80 transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN BALANCED PROFILE GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          
          {/* LEFT SECTION (lg:col-span-8): PROFILE DETAILS */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* CARD 1: PERSONAL IDENTITY & KYC */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E2DA] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA] mb-4">
                <div>
                  <h2 className="text-xs sm:text-sm font-extrabold text-[#002140] uppercase tracking-wider">
                    Personal Identity & KYC
                  </h2>
                  <p className="text-[11px] text-slate-500 font-normal">Legal identity details used for credit bureau underwriting</p>
                </div>
                <span className="text-[10px] font-bold text-[#FF7819] bg-[#FFF3EB] px-2.5 py-0.5 rounded border border-[#FF7819]/25">
                  KYC Records
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <ProfileField icon={<User />} label="Full Name (Legal)" name="name" value={isEditing ? editData.name : userData.name} isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<Phone />} label="Registered Mobile" name="phone" value={`+91 ${userData.phone}`} isEditing={false} />
                <ProfileField icon={<Mail />} label="Email Address" name="email" value={isEditing ? editData.email : userData.email} isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<Calendar />} label="Date of Birth" name="dob" type="date" value={isEditing ? editData.dob : userData.dob} isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<User />} label="Gender" name="gender" options={["male", "female", "other"]} value={isEditing ? editData.gender : userData.gender} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<ShieldCheck />} label="PAN Card Number" name="pan" value={isEditing ? editData.pan : userData.pan} className="uppercase font-mono tracking-widest" isEditing={isEditing} onChange={handleEditChange} />
              </div>
            </div>

            {/* CARD 2: EMPLOYMENT & RESIDENTIAL ASSESSMENT */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E5E2DA] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DA] mb-4">
                <div>
                  <h2 className="text-xs sm:text-sm font-extrabold text-[#002140] uppercase tracking-wider">
                    Employment & Residential Details
                  </h2>
                  <p className="text-[11px] text-slate-500 font-normal">Income assessment and geographic serviceable area</p>
                </div>
                <span className="text-[10px] font-bold text-slate-600 bg-[#FAF8F5] px-2.5 py-0.5 rounded border border-[#E5E2DA]">
                  Eligibility Parameters
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <ProfileField icon={<Briefcase />} label="Employment Type" name="employment" options={["salaried", "self-employed"]} value={isEditing ? editData.employment : userData.employment} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<IndianRupee />} label="Monthly Net Take-Home" name="income" type="number" value={isEditing ? editData.income : `₹ ${Number(userData.income || 0).toLocaleString('en-IN')}`} isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<MapPin />} label="City" name="city" value={isEditing ? editData.city : userData.city} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<MapPin />} label="State" name="state" value={isEditing ? editData.state : userData.state} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
                <ProfileField icon={<MapPin />} label="Postal Pincode" name="pincode" value={isEditing ? editData.pincode : userData.pincode} isEditing={isEditing} onChange={handleEditChange} />
              </div>
            </div>

          </div>

          {/* RIGHT SECTION (lg:col-span-4): STATUTORY & SECURITY DESK */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* TRUST & SECURITY PILLAR CARD */}
            <div className="bg-white rounded-2xl p-5 border border-[#E5E2DA] shadow-xs space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#E5E2DA]">
                <ShieldCheck size={16} className="text-[#FF7819]" />
                <h3 className="text-xs font-extrabold text-[#002140] uppercase tracking-wider">
                  Security & Compliance
                </h3>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    ✓
                  </div>
                  <div>
                    <strong className="block text-[#002140] font-bold text-[11px]">256-Bit SSL Cryptography</strong>
                    <span className="text-[10px] text-slate-500 leading-relaxed block">Data transmitted in sharded, encrypted vaults.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    ✓
                  </div>
                  <div>
                    <strong className="block text-[#002140] font-bold text-[11px]">Zero Data Reselling Policy</strong>
                    <span className="text-[10px] text-slate-500 leading-relaxed block">Your information is never sold to telemarketers.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-200">
                    ✓
                  </div>
                  <div>
                    <strong className="block text-[#002140] font-bold text-[11px]">RBI Digital Lending Mandate</strong>
                    <span className="text-[10px] text-slate-500 leading-relaxed block">Sanctions executed only by regulated NBFCs & Banks.</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-[#E5E2DA] text-[10px] text-slate-400 text-center">
                ISO 27001:2022 Certified Architecture
              </div>
            </div>

            {/* QUICK ACTIONS & SUPPORT */}
            <div className="bg-[#002140] text-white rounded-2xl p-5 shadow-xs border border-[#00172e] space-y-3">
              <span className="text-[10px] font-bold text-[#FF7819] uppercase tracking-wider block">
                Borrower Assistance Desk
              </span>
              <h4 className="text-sm font-extrabold text-white">
                Need Help with Your Loan Application?
              </h4>
              <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                Our support team is available to assist you with KYC verification, lender matchmaking, and application status.
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer text-center block"
              >
                Contact Nodal Support
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

// Reusable Sub-Component for Clean Uniform Display
function ProfileField({ icon, label, value, name, type = "text", options, isEditing, onChange, className = "" }: any) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FAF8F5] border border-[#E5E2DA]">
      <div className="mt-0.5 w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#FF7819] border border-[#E5E2DA] shrink-0 shadow-2xs">
        {React.cloneElement(icon, { size: 15 })}
      </div>
      <div className="w-full min-w-0">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">{label}</p>
        {isEditing && name ? (
          options ? (
            <select 
              name={name} 
              value={value || ""} 
              onChange={onChange} 
              className={`w-full bg-white border border-[#E5E2DA] focus:border-[#FF7819] focus:ring-2 focus:ring-[#FF7819]/15 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#002140] outline-none ${className}`}
            >
              <option value="">Select Option</option>
              {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input 
              type={type} 
              name={name} 
              value={value || ""} 
              onChange={onChange} 
              className={`w-full bg-white border border-[#E5E2DA] focus:border-[#FF7819] focus:ring-2 focus:ring-[#FF7819]/15 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#002140] outline-none ${className}`} 
            />
          )
        ) : (
          <p className={`text-xs font-bold text-[#002140] truncate ${className}`}>{value || "Not Provided"}</p>
        )}
      </div>
    </div>
  );
}
