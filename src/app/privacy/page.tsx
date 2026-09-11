import type { Metadata } from "next";
import React from "react";
import { 
  FaShieldAlt, FaUserCheck, FaDatabase, FaBullhorn, 
  FaCookieBite, FaUserShield, FaLock, FaExclamationTriangle, FaGavel 
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Privacy Policy | CoverMantra",
  description:
    "Read CoverMantra's Privacy Policy to understand how we collect, use, and protect your personal information on our loan and insurance comparison platform.",
  keywords: ["Privacy Policy", "CoverMantra Privacy", "Data Protection Policy", "NBFC Lending Partners Privacy"],
  alternates: {
    canonical: "https://www.covermantra.com/privacy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "May 01, 2026";

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-20">
      
      {/* Header Section */}
      <div className="bg-[#08101E] text-white pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-4">
          Privacy <span className="text-[#FF7819]">Policy</span>
        </h1>
        <p className="text-gray-400 font-medium">Last Updated: {lastUpdated}</p>
        <div className="mt-6 max-w-2xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed">
          CoverMantra Services Private Limited is committed to protecting your personal information. 
          This policy explains how we handle your data on our platform.
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-12">
          
          {/* 1. Scope */}
          <section className="flex gap-5">
            <div className="text-[#FF7819] mt-1"><FaShieldAlt size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">1. Scope and Application</h2>
              <p className="text-gray-600 leading-relaxed">
                This policy applies to all users of the CoverMantra platform. We are a loan marketplace 
                connecting users with RBI-registered NBFCs and Banks. We do not provide loans directly.
              </p>
            </div>
          </section>

          {/* 2. Services & Data */}
          <section className="flex gap-5">
            <div className="text-blue-600 mt-1"><FaDatabase size={24} /></div>
            <div className="w-full">
              <h2 className="text-xl font-bold mb-4 uppercase tracking-tight">2. Services We Provide</h2>
              <div className="grid gap-4">
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-sm uppercase text-blue-700 mb-2">A. Credit Reports</h3>
                  <p className="text-sm text-gray-600">We collect Name, PAN, and DOB to fetch your credit report from bureaus. We do not share this report with third parties.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                  <h3 className="font-bold text-sm uppercase text-green-700 mb-2">B. Loans and Credit Cards</h3>
                  <p className="text-sm text-gray-600">KYC documents and salary details are shared with our Lending Partners only to process your applications.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Marketing */}
          <section className="flex gap-5">
            <div className="text-orange-500 mt-1"><FaBullhorn size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">3. Marketing Campaigns</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                By using our platform, you consent to be contacted via SMS, Email, WhatsApp, or Calls 
                regarding financial products and pre-approved offers from us and our partners.
              </p>
            </div>
          </section>

          {/* 4. Cookies */}
          <section className="flex gap-5">
            <div className="text-yellow-600 mt-1"><FaCookieBite size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">4. Cookies</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                We use cookies to identify users and enhance your experience. You can disable cookies in your browser settings.
              </p>
            </div>
          </section>

          {/* 5. Your Rights */}
          <section className="flex gap-5">
            <div className="text-purple-600 mt-1"><FaUserCheck size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">5. Your Rights</h2>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                <li>Right to withdraw consent at any time.</li>
                <li>Right to be forgotten (request data deletion).</li>
                <li>Right to rectify inaccurate personal data.</li>
              </ul>
            </div>
          </section>

          {/* 6. Data Security */}
          <section className="flex gap-5">
            <div className="text-teal-600 mt-1"><FaLock size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">6. Data Security</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                Your data is securely hosted on our isolated Virtual Private Server (VPS) infrastructure. We implement multi-layered security measures to ensure data privacy and protection.
              </p>
            </div>
          </section>

          {/* 7. Grievance Redressal */}
          <section className="bg-[#08101E] text-white p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight text-[#FF7819]">7. Grievance Redressal</h2>
            <div className="space-y-4 text-sm">
              <p><span className="text-gray-400 uppercase text-[10px] block">Officer Name</span> <strong>Nisha</strong></p>
              <p><span className="text-gray-400 uppercase text-[10px] block">Email</span> <strong>info@covermantra.in</strong></p>
              <p><span className="text-gray-400 uppercase text-[10px] block">Address</span> <span className="italic text-gray-300">First Floor Building No. 233, Thakar Basti, Bagichi Mohalla,Dharamshala Road,Fatehabad -125050</span></p>
            </div>
          </section>

          {/* 8. Phishing */}
          <section className="flex gap-5 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <div className="text-red-600 mt-1"><FaExclamationTriangle size={24} /></div>
            <div>
              <h2 className="text-lg font-bold text-red-800 uppercase tracking-tight mb-2">8. Phishing Protection</h2>
              <p className="text-red-700 text-sm font-medium">
                CoverMantra will never ask for your passwords, OTPs, or bank details via email. Stay alert!
              </p>
            </div>
          </section>

          {/* 9. Governing Law */}
          <section className="flex gap-5">
            <div className="text-slate-400 mt-1"><FaGavel size={24} /></div>
            <div>
              <h2 className="text-xl font-bold mb-3 uppercase tracking-tight">9. Legal and Governing Law</h2>
              <p className="text-gray-600 leading-relaxed text-sm">
                This policy is governed by Indian laws. Any disputes will be settled under the jurisdiction of the Delhi courts.
              </p>
            </div>
          </section>

        </div>

        {/* Footer info */}
        <div className="mt-10 text-center text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          © 2026 CoverMantra Services Private Limited • All Rights Reserved
        </div>
      </div>
    </main>
  );
}