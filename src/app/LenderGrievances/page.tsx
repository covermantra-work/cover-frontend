"use client";

import React from "react";
import Image from "next/image";
import { FaUser, FaEnvelope, FaPhoneAlt, FaClock, FaMapMarkerAlt, FaShieldAlt, FaExternalLinkAlt } from "react-icons/fa";

const lenders = [
  {
    name: "Money View",
    logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg",
    officer: "Rishov Bhattacharjee",
    address: `17/1, 1st and 2nd Floor, The Address Building, Outer Ring Road, Marathahalli, Kadubeesanahalli, Bangalore – 560103`,
    email: "grievance@moneyview.in",
    phone: "08069390476",
    timings: "9:00 AM - 6:00 PM (Mon - Fri, excluding public holidays)",
  },
  {
    name: "FDPL Finance Private Limited",
    logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
    officer: "Ms. Vaishnavi Batulkar",
    address: `Office Number 623, 6th floor, B-Wing, Chintamani Plaza, Andheri kurla road, Near to Western express metro, Mumbai - 400099`,
    email: "escalation@fdplfinance.com", 
    phone: "+91-9076058709 / 07969699880",
    timings: "9:00 AM - 6:00 PM (Mon - Fri, excluding public holidays)",
  },
  {
    name: "Vivifi India Finance Pvt Ltd",
    logo: "https://www.vivifin.com/images/vivifi-logo.png",
    officer: "Prakash Rajan",
    address: `Unit A, 9th Floor, MJR Magnifique, Survey No 75 & 76, Khajaguda X Roads, Raidurgam, Hyderabad – 500008`,
    email: "pno@vivifin.com",
    phone: "+91-91211-96333",
    timings: "10:00 AM - 7:00 PM (Mon - Sat, excluding public holidays)",
  },
  {
    name: "Zype",
    logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg",
    officer: "Mr. Jayanta Borah",
    address: `Zype, 5th Floor, Enzyme Anthurium, IBLUR Junction, Outer Ring Road, Bellandur, Bangalore - 560103`,
    email: "support@getzype.com",
    phone: "080-4718-5511",
    timings: "9:00 AM - 6:00 PM (Mon - Sat)",
  },
  {
    name: "Credify (Creditt+)",
    logo: "https://loan.credittnow.com/favicon.ico",
    officer: "Mr. Devansh Gala",
    address: `39, Iscon Greens Society, Near Lal Gebi Ashram, Bopal-Ghuma Road, Ghuma, Ahmedabad - 380058`,
    email: "grievance@creditt.in",
    phone: "80974 52970",
    timings: "10:00 AM – 7:00 PM (Mon – Sat, excluding public holidays)",
  },
];

export default function LenderGrievance() {
  return (
    <main className="min-h-screen bg-[#FFF4E5] font-sans selection:bg-[#FF7819]/20 text-[#08101E]">
      
      {/* 🚀 MODERN DARK TOP BAR */}
      {/* <header className="fixed top-0 left-0 w-full bg-[#08101E] z-[100] border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF7819] rounded-xl flex items-center justify-center text-white shadow-lg rotate-3">
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h2 className="text-white font-black text-xl tracking-tighter leading-none italic uppercase">
                COVER<span className="text-[#FF7819]">MANTRA</span>
              </h2>
              <p className="text-gray-500 text-[9px] uppercase font-bold tracking-[0.2em] mt-1">Grievance Portal</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            RBI Compliant System
          </div>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="pt-40 pb-16 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#FF7819]/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-[100px]" />
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-[#08101E] tracking-tighter uppercase italic leading-[0.9] mb-6">
          Lender <span className="text-[#FF7819] block md:inline">Grievance</span>
        </h1>
        <p className="max-w-2xl mx-auto text-gray-500 font-medium md:text-lg">
          Dedicated support channels for our financial partners. Access direct contact details for Nodal Officers and escalation desks.
        </p>
      </section>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lenders.map((lender, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(255,120,25,0.15)] hover:border-[#FF7819]/30 flex flex-col justify-between"
            >
              <div>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-center mb-10 relative group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={lender.logo}
                    alt={`${lender.name} Logo`}
                    width={180}
                    height={60}
                    className="object-contain"
                    style={{ height: "auto" }}
                    priority={index < 3}
                  />
                </div>

                <div className="space-y-6">
                  {/* Officer Info - Fixed Conflict Line 67 Logic */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#FFF4E5] flex items-center justify-center text-[#FF7819] flex-shrink-0">
                      <FaUser size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Nodal Officer</p>
                      <p className="text-base font-bold text-[#08101E] tracking-tight">{lender.officer}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0">
                      <FaMapMarkerAlt size={14} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Address</p>
                      <p className="text-[11px] font-medium text-gray-600 leading-relaxed italic">{lender.address}</p>
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    <a href={`mailto:${lender.email}`} className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100 transition-colors truncate">
                      <FaEnvelope /> {lender.email}
                    </a>
                    <a href={`tel:${lender.phone}`} className="flex items-center gap-3 p-3 rounded-xl bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition-colors">
                      <FaPhoneAlt /> {lender.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-10">
                <div className="flex items-start gap-3 mb-6 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                  <FaClock className="text-gray-400 mt-1 shrink-0" />
                  <p className="text-[10px] text-gray-500 font-medium leading-tight">
                    <span className="block font-black uppercase text-[#08101E] mb-1">Service Hours</span>
                    {lender.timings}
                  </p>
                </div>

                <a
                  href={`mailto:${lender.email}`}
                  className="flex items-center justify-center gap-2 w-full bg-[#08101E] text-white font-black uppercase tracking-tighter italic py-4 rounded-2xl shadow-lg hover:bg-[#FF7819] transition-all active:scale-95"
                >
                  Contact Now <FaExternalLinkAlt size={10} className="opacity-50" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer Decor */}
      <footer className="py-12 border-t border-gray-100 text-center">
         <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
           <FaShieldAlt className="text-green-500" /> Data Protection Verified by RBI Guidelines
         </div>
      </footer>

    </main>
  );
}