"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";
import GlobalModal from "./globalmodel";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { ChevronUp, Mail, MapPin, Building2, Send, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import SeoFooter from "./SeoFooter";
import { useModal } from "../context/modelcontext";
import toast, { Toaster } from "react-hot-toast";

function Footer() {
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const { openModal } = useModal();

  const handleProtectedNavigation = (path: string) => {
    const co_phone = Cookies.get("co_phone");
    const co_token = Cookies.get("co_token");

    if (co_phone && co_token) {
      router.push(path);
    } else {
      setLoginOpen(true);
    }
  };

  const handleOtpVerified = () => {
    setLoginOpen(false);
    openModal();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("Thank you! You have subscribed to CoverMantra updates.", {
      icon: "🎉",
      style: {
        borderRadius: "16px",
        background: "#08101E",
        color: "#fff",
        border: "1px solid rgba(255,105,11,0.2)",
      },
    });
    setEmail("");
  };

  return (
    <footer className="relative bg-[#050811] rounded-t-[2.5rem] sm:rounded-t-[3.5rem] text-white overflow-hidden border-t border-white/5">
      <Toaster position="top-right" />
      
      {/* 🔮 Modern Mesh Gradient Background and Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,14,26,1),rgba(4,6,12,1))]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-40"></div>
      
      {/* Glowing blurred background orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF690B]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Top glowing gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF690B] to-transparent shadow-[0_0_15px_rgba(255,105,11,0.5)] z-10"></div>

      <div className="relative z-10 max-w-7xl px-6 pt-12 pb-6 mx-auto lg:px-8">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/5">
          
          {/* Column 1: Brand Info */}
          <div className="flex flex-col items-start text-left">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 relative shrink-0 overflow-hidden rounded-xl bg-[#08101E] border border-white/10 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-300">
                <img 
                  src="/image/logo.png" 
                  alt="CoverMantra Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "w-full h-full bg-gradient-to-br from-[#FF690B] to-[#FF8C00] rounded-xl flex items-center justify-center text-[#08101E] font-black text-lg";
                      fallback.innerText = "C";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black leading-none tracking-tight">
                  <span className="text-white" style={{ WebkitTextStroke: "0.5px rgba(255,105,11,0.5)" }}>Cover</span>
                  <span className="text-[#FF690B]">Mantra</span>
                </span>
                <span className="text-[7px] tracking-[0.2em] uppercase font-bold text-white/40 mt-1">Smart Cover • Sure Trust</span>
              </div>
            </Link>

            <p className="mt-4 text-white/60 leading-relaxed text-xs max-w-xs">
              Tailored financial aggregator making loans and insurance simple, transparent, and completely digital.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 mt-5">
              {[
                { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
                { icon: FaInstagram, href: "https://www.instagram.com/cover_mantra_pvt_ltd", label: "Instagram" },
                { icon: FaLinkedinIn, href: "https://www.linkedin.com/company/covermantra/about", label: "LinkedIn" }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8.5 h-8.5 flex items-center justify-center bg-white/5 hover:bg-[#FF690B] text-white/70 hover:text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5 border border-white/5 hover:border-[#FF690B]/30 hover:shadow-[0_4px_12px_rgba(255,105,11,0.25)]"
                  aria-label={social.label}
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Company & Services */}
          <div className="flex flex-col items-start text-left">
            <p className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-[#FF690B] pl-2.5">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-xs text-white/60 text-left">
              <li><Link href="/about" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">Contact Us</Link></li>
              <li><Link href="/business-loans" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">Business Loans</Link></li>
              <li>
                <button
                  onClick={() => handleProtectedNavigation("/personal-loans")}
                  suppressHydrationWarning={true}
                  className="hover:text-[#FF690B] hover:translate-x-1 text-left inline-block transition-all duration-300 cursor-pointer"
                >
                  Personal Loans
                </button>
              </li>
              <li>
                <Link href="/insurance" className="hover:text-[#FF690B] hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-300">
                  <span>Insurance Policies</span>
                  <span className="text-[7px] font-bold px-1.5 py-0.2 bg-[#FF690B]/10 text-[#FF690B]/85 rounded border border-[#FF690B]/15 uppercase tracking-wide">Soon</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Legal */}
          <div className="flex flex-col items-start text-left">
            <p className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-[#FF690B] pl-2.5">
              Resources & Legal
            </p>
            <ul className="space-y-2.5 text-xs text-white/60 text-left">
              <li><Link href="/faq" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">FAQs & Help</Link></li>
              <li><Link href="/Blogs" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">Our Blogs</Link></li>
              <li><Link href="/datapolicy" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">Data Policy</Link></li>
              <li><Link href="/delete-account" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300 text-amber-500/80 hover:text-amber-500">Account Deletion</Link></li>
              <li><Link href="/LenderGrievances" className="hover:text-[#FF690B] hover:translate-x-1 inline-block transition-all duration-300">Lender Grievances</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Newsletter */}
          <div className="flex flex-col items-start text-left w-full">
            <p className="text-xs font-black uppercase tracking-wider text-white mb-4 border-l-2 border-[#FF690B] pl-2.5">
              Support & Updates
            </p>
            
            {/* Contact Email Link */}
            <div className="flex items-center gap-2 mb-4 text-xs text-white/70">
              <Mail className="w-4 h-4 text-[#FF690B] shrink-0" />
              <a href="mailto:info@covermantra.in" className="hover:text-[#FF690B] transition-colors break-all">info@covermantra.in</a>
            </div>

            <p className="text-white/60 text-xs mb-3 leading-relaxed">
              Subscribe for loan rates & insurance updates.
            </p>
            
            <form onSubmit={handleSubscribe} className="relative w-full max-w-xs">
              <input 
                type="email" 
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                suppressHydrationWarning={true}
                className="w-full pl-3.5 pr-10 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#FF690B] focus:outline-none text-white text-xs rounded-xl transition-all duration-300 placeholder:text-white/30"
                required
              />
              <button 
                type="submit"
                suppressHydrationWarning={true}
                className="absolute right-1 top-1 bottom-1 w-8.5 flex items-center justify-center bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white rounded-lg hover:shadow-[0_0_10px_rgba(255,105,11,0.3)] transition-all cursor-pointer animate-pulse"
                aria-label="Subscribe"
              >
                <Send size={12} />
              </button>
            </form>
          </div>

        </div>

        {/* SEO Footer Section (Accordions) */}
        <SeoFooter />

        {/* Bottom Panel */}
        <div className="pt-6 mt-6 border-t border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            
            {/* Registered Office */}
            <div className="flex gap-2 text-white/50 text-[10px] leading-relaxed max-w-md justify-start">
              <MapPin className="w-4 h-4 text-[#FF690B] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white/80 block uppercase tracking-wider mb-0.5 text-[9px]">Registered Office</span>
                First Floor Building No. 233, Thakar Basti, Bagichi Mohalla,Dharamshala Road,Fatehabad -125050
              </div>
            </div>

            {/* Copyright & CIN */}
            <div className="text-left lg:text-center text-[10px] text-white/40 space-y-0.5">
              <p>
                © {new Date().getFullYear()} CoverMantra Services Private Limited. 
                <span className="block sm:inline ml-0.5 text-white/30 italic">All Rights Reserved.</span>
              </p>
              <p className="tracking-widest uppercase text-[9px] text-white/30 flex items-center justify-start lg:justify-center gap-1">
                <Building2 size={10} className="text-[#FF690B]" />
                CIN: U46109DL2024PTC438732
              </p>
            </div>

            {/* Legal Pages & Back to top */}
            <div className="flex items-center justify-between lg:justify-end gap-4 text-xs w-full lg:w-auto">
              <div className="flex gap-3 text-white/50">
                <Link href="/privacy" className="hover:text-[#FF690B] transition-colors">Privacy</Link>
                <span className="text-white/10">|</span>
                <Link href="/terms" className="hover:text-[#FF690B] transition-colors">Terms</Link>
              </div>
              <button 
                onClick={scrollToTop}
                suppressHydrationWarning={true}
                className="flex items-center justify-center w-8 h-8 bg-white/5 hover:bg-[#FF690B]/20 text-[#FF690B] border border-white/10 hover:border-[#FF690B]/30 rounded-lg transition-all duration-300 hover:-translate-y-0.5 group cursor-pointer"
                aria-label="Scroll to top"
              >
                <ChevronUp className="w-4 h-4 group-hover:translate-y-[-1px] transition-transform" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* Modals */}
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOtpVerified={handleOtpVerified}
      />
      <GlobalModal />
    </footer>
  );
}

export default Footer;