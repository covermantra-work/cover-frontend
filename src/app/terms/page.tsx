import type { Metadata } from "next";
import React from "react";
import { 
  FaGavel, FaInfoCircle, FaBalanceScale, FaCheckCircle, 
  FaUserCheck, FaFileContract, FaLock, FaShieldAlt, 
  FaGlobe, FaEye, FaTimesCircle, FaExclamationTriangle, 
  FaUserShield, FaHandshake, FaHeadset 
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Terms & Conditions | CoverMantra",
  description:
    "Read the terms and conditions for using CoverMantra's financial marketplace platform. Understand our role as a facilitator between users and lending/insurance partners.",
  keywords: ["Terms and Conditions", "CoverMantra Agreement", "User Agreement India", "NBFC Facilitator Terms"],
  alternates: {
    canonical: "https://www.covermantra.com/terms",
  },
};

export default function TermsPage() {
  const lastUpdated = "May 01, 2026";

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-20">
      
      {/* 🚀 Header Section */}
      <div className="bg-[#08101E] text-white pt-32 pb-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tight mb-4">
          Terms & <span className="text-[#FF7819]">Conditions</span>
        </h1>
        <p className="text-gray-400 font-medium italic">Official Agreement for CoverMantra Services Private Limited</p>
        <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-bold">Last Updated: {lastUpdated}</p>
      </div>

      {/* 📜 Full 16-Points Content Container */}
      <div className="max-w-4xl mx-auto px-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 space-y-12 border border-gray-100">
          
          {/* 1. Introduction */}
          <section className="flex gap-4">
            <div className="text-[#FF7819] shrink-0"><FaInfoCircle size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">1. Introduction</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                CoverMantra Services Private Limited is incorporated under Indian law (Registered Office: Fatehabad, Haryana). By using our Platform, you agree to these Terms & Conditions and our Privacy Policy.
              </p>
            </div>
          </section>

          {/* 2. General Information */}
          <section className="flex gap-4">
            <div className="text-blue-600 shrink-0"><FaBalanceScale size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">2. General Information</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                CoverMantra serves as a facilitator between users and financial partners (Banks/NBFCs). We do not provide financial services directly; final decisions are made by our partners.
              </p>
            </div>
          </section>

          {/* 3. Services Provided */}
          <section className="flex gap-4">
            <div className="text-green-600 shrink-0"><FaCheckCircle size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">3. Services Provided</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-gray-700">
                <li>• Connecting users with Lenders</li>
                <li>• Credit report access facilitation</li>
                <li>• SMS scraping for spend analysis</li>
                <li>• Social score calculation services</li>
              </ul>
            </div>
          </section>

          {/* 4. User Eligibility */}
          <section className="flex gap-4">
            <div className="text-purple-600 shrink-0"><FaUserCheck size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">4. User Eligibility</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                You must be at least 18 years old and legally capable of entering a contract in India to use the Platform.
              </p>
            </div>
          </section>

          {/* 5. Acceptance of Terms */}
          <section className="flex gap-4">
            <div className="text-yellow-600 shrink-0"><FaFileContract size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">5. Acceptance of Terms</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Accessing the Platform implies your agreement to these terms. CoverMantra reserves the right to modify these terms at any time.
              </p>
            </div>
          </section>

          {/* 6. User Accounts */}
          <section className="flex gap-4">
            <div className="text-orange-600 shrink-0"><FaLock size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">6. User Accounts</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Users must provide accurate information. You are responsible for maintaining the confidentiality of your account and password.
              </p>
            </div>
          </section>

          {/* 7. Privacy */}
          <section className="flex gap-4">
            <div className="text-teal-600 shrink-0"><FaShieldAlt size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">7. Privacy</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Your data is collected as per our Privacy Policy. By using our services, you agree to share data with our partners as required.
              </p>
            </div>
          </section>

          {/* 8. License to Use */}
          <section className="flex gap-4">
            <div className="text-pink-600 shrink-0"><FaGlobe size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">8. License to Use</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We grant a limited, non-transferable license for personal use. Unauthorized data mining or commercial use is prohibited.
              </p>
            </div>
          </section>

          {/* 9. Monitoring */}
          <section className="flex gap-4">
            <div className="text-indigo-600 shrink-0"><FaGlobe size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">9. Monitoring of Platform</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                CoverMantra reserves the right to monitor the platform and remove objectionable content to ensure compliance.
              </p>
            </div>
          </section>

          {/* 10. Service Suspension */}
          <section className="flex gap-4">
            <div className="text-gray-500 shrink-0"><FaTimesCircle size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">10. Service Suspension</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate services without notice if these terms are violated.
              </p>
            </div>
          </section>

          {/* 11. Limitation of Liability */}
          <section className="flex gap-4 p-6 bg-red-50 border border-red-100 rounded-2xl">
            <div className="text-red-600 shrink-0"><FaExclamationTriangle size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2 text-red-800">11. Limitation of Liability</h2>
              <p className="text-sm text-red-700 leading-relaxed">
                CoverMantra is not liable for indirect or incidental damages. We do not warrant the absolute accuracy of platform content.
              </p>
            </div>
          </section>

          {/* 12. Indemnity */}
          <section className="flex gap-4">
            <div className="text-cyan-600 shrink-0"><FaUserShield size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">12. Indemnity</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Users agree to indemnify CoverMantra against any claims arising out of your violation of these terms.
              </p>
            </div>
          </section>

          {/* 13. Advertisements */}
          <section className="flex gap-4">
            <div className="text-blue-400 shrink-0"><FaHandshake size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">13. Third-Party Links</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                The platform may contain third-party links. We are not responsible for the content or practices of external sites.
              </p>
            </div>
          </section>

          {/* 14. Acknowledgements */}
          <section className="flex gap-4">
            <div className="text-green-500 shrink-0"><FaCheckCircle size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">14. Acknowledgements</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                You acknowledge that CoverMantra is a facilitator and does not guarantee the quality or success of partner products.
              </p>
            </div>
          </section>

          {/* 15. Governing Law */}
          <section className="flex gap-4">
            <div className="text-slate-500 shrink-0"><FaGavel size={22} /></div>
            <div>
              <h2 className="text-lg font-black uppercase mb-2">15. Governing Law</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                These terms are governed by Indian law. Disputes are subject to the exclusive jurisdiction of the courts in **Delhi**.
              </p>
            </div>
          </section>

          {/* 16. Grievance Redressal */}
          <section className="bg-[#08101E] text-white p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10"><FaHeadset size={80} /></div>
            <h2 className="text-xl font-black uppercase italic mb-6 text-[#FF7819]">16. Grievance Redressal</h2>
            <div className="space-y-4 text-sm relative z-10">
              <p><span className="text-gray-400 block uppercase text-[10px] tracking-widest">Nodal Officer</span> <strong className="text-lg">Nisha</strong></p>
              <p><span className="text-gray-400 block uppercase text-[10px] tracking-widest">Email Support</span> <strong>info@covermantra.in</strong></p>
              <p><span className="text-gray-400 block uppercase text-[10px] tracking-widest">Address</span> <span className="italic text-gray-300">CoverMantra Services Pvt. Ltd,  First Floor Building No. 233, Thakar Basti, Bagichi Mohalla,Dharamshala Road,Fatehabad -125050</span></p>
            </div>
          </section>

        </div>

        {/* 🛡️ Footer Certification */}
        <div className="mt-12 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white border border-gray-200 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 shadow-sm">
             <FaShieldAlt className="text-blue-500" /> Legally Binding Agreement • CIN: U70200HR2025PTC129612
           </div>
           <p className="mt-4 text-[9px] font-bold text-gray-300 uppercase">© 2026 CoverMantra Services Private Limited. All Rights Reserved.</p>
        </div>
      </div>
    </main>
  );
}