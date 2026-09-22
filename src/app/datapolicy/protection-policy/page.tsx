"use client";

import React from "react";
import { FaShieldAlt, FaDatabase, FaUserLock, FaFileContract, FaUserCheck, FaMicrochip } from "react-icons/fa";

const DataProtectionPolicy = () => {
  return (
    <main className="min-h-screen bg-[#FFF4E5] font-sans">
      {/* 🌑 Dark Header Section */}
      <section className="bg-[#08101E] pt-32 pb-24 px-6 md:px-12 relative overflow-hidden">
        {/* Decorative 3D Glows */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FF7819]/10 rounded-full blur-[120px] -z-0" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-0" />

        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#FF7819] text-[10px] font-black tracking-[0.2em] uppercase mb-8">
            <FaShieldAlt className="animate-pulse" /> Data Protection Protocol
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-6 italic uppercase">
            Data Protection <span className="text-[#FF7819]">Policy</span>
          </h1>
          
          <div className="flex flex-col items-center space-y-2 mb-8">
            <p className="text-white/90 font-black text-lg tracking-tight uppercase">CoverMantra Services Private Limited</p>
            <div className="flex items-center gap-4 text-gray-400 font-bold text-[10px] uppercase tracking-widest">
              <span>Effective: Sept 24, 2025</span>
              <span className="text-[#FF7819]">|</span>
              <span>Version: 1.0</span>
            </div>
          </div>

          <p className="text-gray-400 text-center text-sm md:text-lg max-w-3xl mx-auto font-medium leading-relaxed italic border-t border-white/10 pt-8">
            "We are committed to processing your personal and financial data securely and lawfully, 
            ensuring full compliance with regulatory guidelines."
          </p>
        </div>
      </section>

      {/* 📄 Policy Content Section */}
      <section className="py-16 px-4 sm:px-6 md:px-12 -mt-12 relative z-20">
        <div className="max-w-5xl mx-auto bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] border border-white p-8 md:p-16">
          
          <div className="space-y-16">
            
            {/* 1. Purpose */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">1</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Purpose</h2>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium pl-2 md:pl-16">
                The purpose of this Data Protection Policy is to ensure that personal,
                financial, and confidential data handled by CoverMantra Services Pvt.
                Ltd. (“Company”, “we”, “our”) is collected, processed, stored, and
                disposed of in a secure and lawful manner, in line with applicable
                laws, RBI/DCA guidelines, and industry best practices.
              </p>
            </div>

            {/* 2. Scope */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">2</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Scope</h2>
              </div>
              <div className="pl-2 md:pl-16 space-y-4">
                <p className="text-gray-600 font-bold uppercase text-[10px] tracking-widest">This policy applies to:</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {["All Employees & Partners", "Internal & Third-party Systems", "Electronic & Paper Records", "Internal Applications"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-sm font-bold text-gray-700 hover:border-[#FF7819]/20 transition-colors">
                      <FaFileContract className="text-[#FF7819] text-xs" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3. Data We Protect */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">3</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Data We Protect</h2>
              </div>
              <div className="pl-2 md:pl-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Personal Data", text: "Name, Address, DOB, Email", icon: <FaUserCheck /> },
                  { title: "Financial Data", text: "Aadhaar, PAN, Bank, Income", icon: <FaDatabase /> },
                  { title: "Transactions", text: "Loan Apps & Disbursals", icon: <FaShieldAlt /> },
                  { title: "Technical", text: "IP, Device IDs, System Logs", icon: <FaMicrochip /> }
                ].map((item, i) => (
                  <div key={i} className="p-5 border border-gray-100 rounded-3xl flex gap-4 items-center group-hover:shadow-sm transition-all">
                    <div className="text-[#FF7819] text-lg">{item.icon}</div>
                    <div>
                      <h4 className="text-[#08101E] font-black text-[10px] uppercase tracking-widest">{item.title}</h4>
                      <p className="text-gray-500 text-xs font-medium">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Principles */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">4</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Data Protection Principles</h2>
              </div>
              <div className="pl-2 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "Lawfulness & Transparency", "Purpose Limitation", "Data Minimization", 
                  "Accuracy & Correction", "Storage Limitation", "Confidentiality", "Accountability"
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <div className="w-2 h-2 rounded-full bg-[#FF7819]" />
                    <span className="text-gray-700 font-bold text-sm uppercase tracking-tight">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Security Measures */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">5</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Security Measures</h2>
              </div>
              <ul className="pl-2 md:pl-16 space-y-4">
                 {[
                   "Encryption at rest and in transit.",
                   "Multi-factor authentication (MFA).",
                   "System patching & vulnerability assessments.",
                   "Compliant cloud service providers.",
                   "Continuous monitoring & physical security."
                 ].map((measure, i) => (
                   <li key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 text-gray-700 font-medium text-sm">
                     <FaUserLock className="text-[#FF7819]" /> {measure}
                   </li>
                 ))}
              </ul>
            </div>

            {/* 6, 7 & 8 - Layout Grids */}
            <div className="pl-2 md:pl-16 grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="p-6 border-l-2 border-dashed border-[#FF7819]/30">
                  <h3 className="text-[#08101E] font-black text-xs uppercase mb-3 tracking-widest">6. Data Sharing</h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-medium">Shared only with authorized NBFCs, Banks, and bureaus with confidentiality agreements.</p>
               </div>
               <div className="p-6 border-l-2 border-dashed border-[#FF7819]/30">
                  <h3 className="text-[#08101E] font-black text-xs uppercase mb-3 tracking-widest">7. Data Retention</h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-medium">Retained as per legal needs. Secure deletion applied when data is no longer needed.</p>
               </div>
               <div className="p-6 border-l-2 border-dashed border-[#FF7819]/30">
                  <h3 className="text-[#08101E] font-black text-xs uppercase mb-3 tracking-widest">8. Employee Responsibility</h3>
                  <p className="text-gray-500 text-[11px] leading-relaxed font-medium">Mandatory reporting of incidents and lifelong confidentiality maintenance.</p>
               </div>
            </div>

            {/* 9. Customer Rights */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">9</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Customer Rights</h2>
              </div>
              <div className="pl-2 md:pl-16 grid grid-cols-1 sm:grid-cols-2 gap-3">
                 {["Access Info", "Request Correction", "Withdraw Consent", "Request Deletion"].map((right, i) => (
                   <div key={i} className="px-5 py-3 rounded-xl border border-gray-100 bg-white text-gray-700 font-black text-[10px] uppercase tracking-widest flex items-center gap-3">
                     <div className="w-1.5 h-1.5 bg-[#FF7819] rounded-full" /> {right}
                   </div>
                 ))}
              </div>
            </div>

            {/* 10 & 11 */}
            <div className="pl-2 md:pl-16 grid grid-cols-1 md:grid-cols-2 gap-12">
               <div>
                  <h3 className="text-[#08101E] font-black text-sm uppercase mb-3 tracking-tight">10. Breach Management</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">Any data breach will be investigated and addressed as per our protocol. Regulators will be notified promptly as required by applicable laws.</p>
               </div>
               <div>
                  <h3 className="text-[#08101E] font-black text-sm uppercase mb-3 tracking-tight">11. Review & Updates</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">This policy is reviewed annually or upon any major regulatory or technological shifts.</p>
               </div>
            </div>

            {/* 12. Contact */}
            <div className="relative group">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF4E5] text-[#FF7819] flex items-center justify-center text-xl shadow-sm italic font-black">12</div>
                <h2 className="text-2xl font-black text-[#08101E] uppercase tracking-tighter italic">Contact Us</h2>
              </div>
              <div className="pl-2 md:pl-16">
                <div className="bg-[#08101E] p-8 md:p-12 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7819]/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                   <p className="text-[#FF7819] font-black uppercase text-xs tracking-[0.2em] mb-4">Data Protection Officer (DPO)</p>
                   <div className="space-y-2 font-bold text-sm">
                      <p className="text-white/40">Company: <span className="text-white">CoverMantra Services Pvt. Ltd</span></p>
                      <p className="text-white/40">Email: <span className="text-[#FF7819]">info@covermantra.in</span></p>
                      <p className="text-white/40">Phone: <span className="text-white tracking-widest">8901229195</span></p>
                   </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
};

export default DataProtectionPolicy;