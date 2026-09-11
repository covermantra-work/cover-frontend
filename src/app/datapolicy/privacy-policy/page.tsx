"use client";

import React from "react";
import { 
  FaUserShield, 
  FaCookieBite, 
  FaLock, 
  FaBalanceScale, 
  FaHeadset, 
  FaShieldVirus,
  FaFileAlt
} from "react-icons/fa";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FFF4E5] font-sans">
      {/* 🌑 Dark Header / Hero Section */}
      <section className="bg-[#08101E] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative 3D Elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF7819]/10 rounded-full blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-0" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF7819] text-[10px] font-black tracking-[0.2em] uppercase mb-8">
            <FaUserShield className="animate-pulse" /> Privacy Guard
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 italic uppercase">
            Data Privacy <span className="text-[#FF7819]">Policy</span>
          </h1>
          
          <div className="flex flex-col items-center space-y-2 mb-8">
            <p className="text-white/90 font-black text-lg tracking-tight">CoverMantra Services Private Limited</p>
            <div className="flex items-center gap-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <span>Effective: Sept 24, 2025</span>
              <span className="text-[#FF7819]">|</span>
              <span>Version: 1.0</span>
            </div>
          </div>

          <p className="text-gray-400 text-center text-sm md:text-lg max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Your privacy matters to us. This policy explains how we collect, use, and protect your information."
          </p>
        </div>
      </section>

      {/* 📄 Policy Content Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white p-8 md:p-16 transition-all duration-500">
          
          <div className="space-y-16">
            
            {/* 1. Overview */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm"><FaFileAlt /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">1. Overview & Applicability</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium pl-2 md:pl-16">
                Last updated: 24 Sept, 2025. This Privacy Policy (“Policy”) explains how CoverMantra, and its affiliates (“we,” “us,” or “our”) collect, use, store, and disclose personal information through our website and mobile application (collectively, the “Platform”). By accessing or using the Platform, you (“you,” your,” or “User”) consent to the practices described herein. If you do not agree, please do not use our services.
              </p>
            </div>

            {/* 2. Services & Data Use */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm"><FaLock /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">2. Services & Data Use</h2>
              </div>
              <div className="pl-2 md:pl-16 space-y-10">
                
                {/* Credit Reports */}
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#FF7819]/20 transition-colors">
                  <h4 className="text-[#FF7819] font-black uppercase text-xs tracking-widest mb-4">Credit Reports</h4>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li><strong className="text-[#08101E]">Data Collected:</strong> Name, contact details, PAN, gender, age, and DOB.</li>
                    <li><strong className="text-[#08101E]">Purpose:</strong> To provide insight into your financial profile.</li>
                    <li><strong className="text-[#08101E]">Sharing:</strong> Reports are NOT shared with third parties unless required by law.</li>
                  </ul>
                </div>

                {/* Loans */}
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:border-[#FF7819]/20 transition-colors">
                  <h4 className="text-[#FF7819] font-black uppercase text-xs tracking-widest mb-4">Loans & Credit Cards</h4>
                  <ul className="space-y-3 text-sm text-gray-700 font-medium">
                    <li><strong className="text-[#08101E]">What We Do:</strong> Connect you with RBI-registered NBFCs and banks.</li>
                    <li><strong className="text-[#08101E]">Information:</strong> KYC documents, income details, and banking info (with consent).</li>
                    <li><strong className="text-[#08101E]">Sharing:</strong> Shared strictly with lending partners to process your application.</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-3xl border border-dashed border-gray-200">
                    <h4 className="text-[#08101E] font-black uppercase text-[10px] tracking-widest mb-2">Marketing</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">Consent to receive communications via SMS, Email, WhatsApp. Opt-out available anytime.</p>
                  </div>
                  <div className="p-6 rounded-3xl border border-dashed border-gray-200">
                    <h4 className="text-[#08101E] font-black uppercase text-[10px] tracking-widest mb-2">Support</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">Recorded calls and info collected during support interactions to improve services.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Cookies */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm"><FaCookieBite /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">3. Cookies & Tracking</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium pl-2 md:pl-16">
                We use cookies and similar tools to identify users, improve your experience, and serve relevant ads. You may disable cookies via your browser settings, though this could affect functionality.
              </p>
            </div>

            {/* 4. Your Rights */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm"><FaBalanceScale /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">4. Your Rights</h2>
              </div>
              <ul className="list-disc pl-8 md:pl-20 text-gray-600 font-medium space-y-2">
                <li>You may refuse or withdraw consent, though features may become unavailable.</li>
                <li>Request correction, access, or deletion of your data (subject to legal retention).</li>
              </ul>
            </div>

            {/* 5 & 6 Short Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pl-2 md:pl-16">
               <div>
                  <h3 className="text-[#08101E] font-black text-sm uppercase mb-3">5. Storage & Security</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Stored securely in India using trusted cloud providers with strong safeguards.</p>
               </div>
               <div>
                  <h3 className="text-[#08101E] font-black text-sm uppercase mb-3">6. Confidentiality</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">Shared only with trusted third parties under strict confidentiality agreements.</p>
               </div>
            </div>

            {/* 7. Grievance Redressal */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm"><FaHeadset /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">7. Grievance Redressal</h2>
              </div>
              <div className="pl-2 md:pl-16">
                <div className="bg-[#08101E] p-8 md:p-12 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7819]/20 rounded-full -mr-10 -mt-10 blur-2xl" />
                   <p className="text-[#FF7819] font-black uppercase text-[10px] tracking-widest mb-6">Privacy Officer Details</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-bold text-sm">
                      <div className="space-y-2">
                        <p className="text-white/40">Grievance Officer</p>
                        <p className="text-lg">Nisha</p>
                        <p className="text-[#FF7819]">info@covermantra.in</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-white/40">Corporate Address</p>
                        <p className="text-xs leading-relaxed text-white/80"> First Floor Building No. 233, Thakar Basti, Bagichi Mohalla,Dharamshala Road,Fatehabad -125050</p>
                        <p className="text-[#FF7819] tracking-widest">PH: 9996327316</p>
                      </div>
                   </div>
                   <div className="mt-8 pt-6 border-t border-white/10 text-[10px] text-white/40 uppercase tracking-widest">
                     SLA Response Time: Within 48 Hours
                   </div>
                </div>
              </div>
            </div>

            {/* 8. Anti-Phishing */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl shadow-sm"><FaShieldVirus /></div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">8. Anti-Phishing Notice</h2>
              </div>
              <div className="pl-2 md:pl-16 p-6 rounded-3xl bg-red-50/50 border border-red-100">
                <p className="text-red-900/70 font-bold text-sm leading-relaxed">
                  We will <span className="text-red-600 underline">NEVER</span> ask for passwords, bank details, or OTPs via email or message. If you receive such a request, do not respond and report to us immediately.
                </p>
              </div>
            </div>

            {/* 9. Law */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm">⚖️</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">9. Governing Law</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium pl-2 md:pl-16">
                This Policy is governed by the laws of India. Any disputes shall be subject to jurisdiction in India.
              </p>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}