"use client";

import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import api from "@/lib/axios";
// Update base URL if needed based on your environment
// const API_BASE_URL = "http://localhost:5001/api";

interface Lender {
  _id: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  priority: number;
}

export default function AdminLenderManagement() {
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define static fallback in case DB is entirely unavailable for fetch
  const fallbackLenders = [
    { _id: "v1", name: "VIVIFI", logo: "https://www.vivifin.com/images/vivifi-logo.png", age: 21, minIncome: 15000, priority: 1 },
    { _id: "m1", name: "MoneyView", logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg", age: 20, minIncome: 20000, priority: 2 },
    { _id: "z1", name: "Zype", logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg", age: 20, minIncome: 18000, priority: 3 },
    { _id: "f1", name: "FATAKPAY Loans", logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg", age: 20, minIncome: 16000, priority: 4 },
    { _id: "c1", name: "Credify", logo: "https://loan.credittnow.com/favicon.ico", age: 21, minIncome: 15000, priority: 5 }
  ];

  useEffect(() => {
    fetchLenders();
  }, []);

  const fetchLenders = async () => {
    try {
      // const res = await axios.get(`${API_BASE_URL}/lenders`);
      const res = await api.get("/api/lenders");
      if (res.data && res.data.length > 0) {
        setLenders(res.data);
      } else {
        // Use fallback if DB is empty or permissions restricted
        setLenders(fallbackLenders);
      }
    } catch (error) {
      console.error("Failed to fetch lenders, using fallback:", error);
      setLenders(fallbackLenders);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOrder = async () => {
    if (!isAuthenticated) {
      toast.error("Please enter the Admin Secret Key below first.");
      return;
    }
    
    setIsSaving(true);
    try {
      const orderedIds = lenders.map((l) => l._id);
      
      // await axios.put(
      //   `${API_BASE_URL}/lenders/reorder`,
      //   { orderedIds },
      //   { 
      //     headers: { 
      //       "x-admin-secret": adminSecret,
      //       "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
      //     } 
      //   }
      // );
      await api.put(
  "/api/lenders/reorder",
  { orderedIds },
  { 
    headers: { 
      "x-admin-secret": adminSecret,
      "Authorization": `Bearer ${localStorage.getItem("token") || ""}`
    } 
  }
);
      toast.success("Priority saved successfully!");
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        toast.error("❌ Incorrect Admin Secret Key! Please check and try again.");
      } else {
        const msg = error.response?.data?.message || "Failed to save order. Please try again later.";
        toast.error(`⚠️ ${msg}`);
      }
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-[#FFF4E5] flex items-center justify-center text-[#08101E] font-bold">Loading Admin Panel...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFF4E5] pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-0">
      {/* Top Dark Half Split */}
      <div className="absolute top-0 left-0 w-full h-[65vh] md:h-[55vh] bg-[#08101E] rounded-b-[3rem] sm:rounded-b-[5rem] shadow-xl pointer-events-none -z-10" />
      
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF7819]/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[20%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

      {/* Moved Toaster further down from header */}
      <ToastContainer position="top-right" style={{ marginTop: "120px" }} />
      <div className="max-w-3xl mx-auto relative z-10">
        {/* Top Header Card (Sits on Dark Bg) */}
        <div className="mb-12 p-2 md:p-4">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#FF7819]/30 bg-[#FF7819]/10 rounded-full shadow-lg backdrop-blur-md">
            <span className="text-[#FF7819] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Admin Dashboard
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 tracking-tighter drop-shadow-sm">
            Lender <span className="bg-gradient-to-r from-[#FF7819] to-yellow-400 bg-clip-text text-transparent">Priority</span>
          </h1>
          <p className="text-white/70 mb-8 font-medium text-sm md:text-lg max-w-2xl leading-relaxed">
            Drag and drop the lenders below to change their display order dynamically. The top lender will be shown first to the users.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/20 shadow-2xl">
            <div className="relative w-full sm:w-auto flex-grow">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              <input 
                type="password" 
                placeholder="Enter Admin Secret Key" 
                className="bg-black/20 w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF7819]/50 transition-all font-medium border border-white/10 focus:border-transparent"
                value={adminSecret}
                onChange={(e) => {
                  setAdminSecret(e.target.value);
                  if (e.target.value.length > 0) setIsAuthenticated(true);
                  else setIsAuthenticated(false);
                }}
              />
            </div>
            <button
              onClick={handleSaveOrder}
              disabled={isSaving}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-white shadow-xl transition-all ${
                isSaving ? "bg-white/20 cursor-not-allowed" : "bg-gradient-to-r from-[#FF7819] to-[#E65C00] hover:scale-105"
              }`}
            >
              {isSaving ? "Saving..." : "Save Priority"}
            </button>
          </div>
        </div>

        {/* White List Container (Overlaps the boundary) */}
        <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_-20px_rgba(8,16,30,0.15)] overflow-hidden relative z-20">
          {/* Header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-6 md:px-8 py-5 border-b border-gray-100 bg-gray-50/80 font-black text-[#08101E]/40 uppercase tracking-[0.2em] text-[10px] md:text-xs">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-6">Lender Details</div>
            <div className="col-span-3 text-center">Min Income</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          {/* Draggable List */}
          <Reorder.Group axis="y" values={lenders} onReorder={setLenders} className="divide-y divide-gray-100 list-none p-0 m-0">
            {lenders.map((lender, index) => (
              <Reorder.Item 
                key={lender._id} 
                value={lender}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 px-6 md:px-8 py-5 md:py-6 items-center bg-white hover:bg-[#FFF4E5]/50 cursor-grab active:cursor-grabbing transition-colors relative group"
              >
                <div className="hidden sm:block col-span-1 text-center font-black text-[#08101E]/20 text-xl group-hover:text-[#FF7819]/40 transition-colors">
                   #{index + 1}
                </div>
                
                <div className="col-span-1 sm:col-span-6 flex items-center gap-5">
                  <div className="sm:hidden font-black text-[#08101E]/20 text-xl w-8">
                    #{index + 1}
                  </div>
                  {lender.logo && (
                    <div className="w-14 h-14 md:w-16 md:h-16 flex-shrink-0 bg-[#FFF4E5] rounded-2xl flex items-center justify-center p-2.5 shadow-sm border border-[#FF7819]/10">
                      <img src={lender.logo} alt={lender.name} className="max-w-full max-h-full object-contain filter drop-shadow-sm" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-black text-[#08101E] text-lg md:text-xl tracking-tight">{lender.name}</h3>
                    <p className="text-xs text-[#08101E]/50 font-semibold uppercase tracking-wider mt-1">Min Age: {lender.age}</p>
                  </div>
                </div>

                <div className="hidden sm:block col-span-3 text-center text-[#08101E]/80 font-bold text-lg">
                  ₹{lender.minIncome.toLocaleString('en-IN')}
                </div>

                <div className="hidden sm:block col-span-2 text-center text-[#08101E]/20 hover:text-[#FF7819] transition-colors">
                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      </div>
    </div>
  );
}
