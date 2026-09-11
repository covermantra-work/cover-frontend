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
      <div className="min-h-screen bg-[#08101E] flex flex-col items-center justify-center font-sans">
        <div className="w-16 h-16 border-4 border-[#FF7819]/20 border-t-[#FF7819] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#FF7819] font-black tracking-widest uppercase text-sm animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-[#08101E] flex flex-col items-center justify-center font-sans text-center px-4">
        <h2 className="text-3xl font-black text-white mb-2">Profile Not Found</h2>
        <p className="text-gray-400 mb-8">We couldn't fetch your profile details. Please try logging in again.</p>
        <button 
          onClick={() => { 
            logout(); 
            localStorage.removeItem("userInfo");
            window.dispatchEvent(new Event("loginStatusChanged"));
            window.location.href = "/"; 
          }}
          className="px-8 py-4 bg-[#FF7819] text-white font-bold rounded-2xl hover:bg-[#e66a15] transition-all"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120 } }
  };

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
    <div className="min-h-screen bg-[#FFF4E5] font-sans pb-20 overflow-x-hidden">
      {/* Decorative Header */}
      <div className="h-80 bg-[#08101E] relative flex flex-col items-center pt-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-[#FF7819] rounded-full blur-[120px] opacity-20"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 w-24 h-24 bg-gradient-to-br from-[#FF7819] to-[#d65a0b] rounded-[2rem] shadow-[0_20px_40px_rgba(255,120,25,0.4)] flex items-center justify-center mb-4 border-2 border-white/20"
        >
          <User size={40} className="text-white" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-3xl md:text-4xl font-black text-white tracking-tight text-center"
        >
          Welcome, {userData.name?.split(" ")[0] || "User"}
        </motion.h1>

        {/* Close Button */}
        <button 
          onClick={() => router.push("/")}
          className="absolute top-8 right-8 z-[100] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all active:scale-90 border border-white/10 shadow-lg cursor-pointer"
        >
          <X size={24} />
        </button>

        <AnimatePresence>
          {successMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 z-50 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-green-500/50"
            >
              <CheckCircle size={20} /> {successMessage}
            </motion.div>
          )}
          {errorMessage && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-24 z-50 flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-red-600/50"
            >
              <X size={20} /> {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area */}
      <div className="relative z-20 flex justify-center px-4 -mt-16">
        <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6">
          
          {/* Left Column: Quick Info & Actions */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/3 flex flex-col gap-6"
          >
            <div className="bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(255,120,25,0.18),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] p-8 border-4 border-white">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Account Status</h3>
              
              <div className="flex items-center gap-4 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-200/80 mb-6 shadow-xs">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-sm font-black text-emerald-950">Verified Profile</p>
                  <p className="text-xs text-emerald-700 font-semibold">Phone & OTP Secured</p>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => router.push("/personal-loans")}
                  className="w-full py-4 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-[0_6px_0_#C2410C,0_15px_25px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] active:shadow-[0_1px_0_#C2410C] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Briefcase size={16} /> Apply for New Loan
                </button>
                {isEditing ? (
                  <div className="flex gap-2">
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 py-3.5 bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-[0_5px_0_#059669] active:shadow-[0_1px_0_#059669] active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSaving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <Save size={16} />} {isSaving ? "Saving..." : "Save"}
                    </button>
                    <button 
                      onClick={() => { setIsEditing(false); setEditData(userData); }}
                      className="flex-1 py-3.5 bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-slate-200 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <XCircle size={16} /> Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3.5 bg-white text-[#08101E] font-black text-xs uppercase tracking-wider rounded-2xl border-2 border-slate-200 shadow-sm hover:border-[#FF7819] hover:text-[#FF7819] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Edit size={16} /> Edit Profile
                  </button>
                )}
                <button 
                  onClick={() => { 
                    logout(); 
                    localStorage.removeItem("userInfo");
                    window.dispatchEvent(new Event("loginStatusChanged"));
                    window.location.href = "/"; 
                  }}
                  className="w-full py-3 bg-red-50 text-red-600 font-black text-xs uppercase tracking-wider rounded-2xl hover:bg-red-100 transition-all flex items-center justify-center gap-2 border border-red-200 cursor-pointer"
                >
                  <LogOut size={16} /> Logout Securely
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Info Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="md:w-2/3 bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 backdrop-blur-2xl rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(255,120,25,0.18),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] p-8 sm:p-10 border-4 border-white"
          >
            <h3 className="text-xs font-black text-[#FF7819] uppercase tracking-widest mb-8 border-b border-slate-100 pb-4">Personal Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField icon={<User />} label="Full Name" name="name" value={isEditing ? editData.name : userData.name} isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<Phone />} label="Phone Number" name="phone" value={`+91 ${userData.phone}`} isEditing={false} />
              <ProfileField icon={<Mail />} label="Email Address" name="email" value={isEditing ? editData.email : userData.email} isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<Calendar />} label="Date of Birth" name="dob" value={isEditing ? editData.dob : userData.dob} isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<User />} label="Gender" name="gender" options={["male", "female", "other"]} value={isEditing ? editData.gender : userData.gender} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<ShieldCheck />} label="PAN Card" name="pan" value={isEditing ? editData.pan : userData.pan} className="uppercase font-mono tracking-widest" isEditing={isEditing} onChange={handleEditChange} />
            </div>

            <h3 className="text-sm font-black text-[#FF7819] uppercase tracking-widest mt-12 mb-8 border-b border-gray-100 pb-4">Professional & Location</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileField icon={<Briefcase />} label="Employment Type" name="employment" options={["salaried", "self-employed"]} value={isEditing ? editData.employment : userData.employment} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<IndianRupee />} label="Monthly Income" name="income" type="number" value={isEditing ? editData.income : `₹ ${Number(userData.income).toLocaleString('en-IN')}`} isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<MapPin />} label="City" name="city" value={isEditing ? editData.city : userData.city} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<MapPin />} label="State" name="state" value={isEditing ? editData.state : userData.state} className="capitalize" isEditing={isEditing} onChange={handleEditChange} />
              <ProfileField icon={<MapPin />} label="Pincode" name="pincode" value={isEditing ? editData.pincode : userData.pincode} isEditing={isEditing} onChange={handleEditChange} />
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
}

// Helper component for uniform data display
function ProfileField({ icon, label, value, name, type = "text", options, isEditing, onChange, className = "" }: any) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }} className="flex items-start gap-4">
      <div className="mt-1 w-10 h-10 rounded-xl bg-[#FFF4E5] flex items-center justify-center text-[#FF7819] border border-[#FF7819]/20 shrink-0">
        {React.cloneElement(icon, { size: 18 })}
      </div>
      <div className="w-full">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
        {isEditing && name ? (
          options ? (
            <select name={name} value={value || ""} onChange={onChange} className={`w-full bg-[#FFF4E5] border border-[#FF7819]/30 rounded-lg px-3 py-2 text-sm font-bold text-[#08101E] outline-none focus:border-[#FF7819] ${className}`}>
              <option value="">Select</option>
              {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          ) : (
            <input type={type} name={name} value={value || ""} onChange={onChange} className={`w-full bg-[#FFF4E5] border border-[#FF7819]/30 rounded-lg px-3 py-2 text-sm font-bold text-[#08101E] outline-none focus:border-[#FF7819] ${className}`} />
          )
        ) : (
          <p className={`text-sm font-bold text-[#08101E] ${className}`}>{value || "Not Provided"}</p>
        )}
      </div>
    </motion.div>
  );
}
