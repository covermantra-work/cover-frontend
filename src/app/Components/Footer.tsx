"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LoginModal from "./LoginModal";
import GlobalModal from "./globalmodel";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { 
  ChevronUp, 
  Mail, 
  MapPin, 
  Building2, 
  Send, 
  ShieldCheck, 
  Lock, 
  Scale, 
  Clock,
  ShieldAlert
} from "lucide-react";
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
        borderRadius: "12px",
        background: "#00172e",
        color: "#fff",
        border: "1px solid rgba(255,120,25,0.3)",
        fontSize: "12px",
      },
    });
    setEmail("");
  };

  return (
    <footer className="relative bg-[#00172e] text-white overflow-hidden border-t-2 border-[#FF7819]">
      <Toaster position="top-right" />
      
      {/* Deep Navy Institutional Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#002140,#001426)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none opacity-40"></div>
      
      {/* Subtle brand warm ambient glow */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#FF7819]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FF690B]/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-6 mx-auto">
        
        {/* ========================================================================= */}
        {/* 1. TOP STATUTORY TRUST & SECURITY PILLARS BAR */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-8 mb-8 border-b border-white/10">
          <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#FF7819]/15 border border-[#FF7819]/30 flex items-center justify-center text-[#FF7819] shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white tracking-wide">RBI Regulated</div>
              <div className="text-[10px] text-white/50">Partner Banks & NBFCs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white tracking-wide">256-Bit SSL Encrypted</div>
              <div className="text-[10px] text-white/50">Bank-Grade Data Security</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white tracking-wide">Zero Data Reselling</div>
              <div className="text-[10px] text-white/50">ISO 27001 Data Privacy</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-white/[0.03] border border-white/5 rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-[#FF7819]/15 border border-[#FF7819]/30 flex items-center justify-center text-[#FF7819] shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-white tracking-wide">Grievance Redressal</div>
              <div className="text-[10px] text-white/50">24-48h Escalation Support</div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. MAIN 4-COLUMN BANKING NAVIGATION GRID */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* Column 1: Corporate Identity & Registration (Col-span 4 on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 relative shrink-0 overflow-hidden rounded-xl bg-[#00172e] border border-white/10 flex items-center justify-center p-1.5 group-hover:border-[#FF7819]/50 transition-colors">
                <img 
                  src="/image/logo.png" 
                  alt="CoverMantra Logo" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = "w-full h-full bg-[#FF7819] rounded-lg flex items-center justify-center text-white font-black text-base";
                      fallback.innerText = "CM";
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold tracking-tight">
                  <span className="text-white">Cover</span>
                  <span className="text-[#FF7819]">Mantra</span>
                </div>
                <div className="text-[9px] text-[#FF7819] font-semibold uppercase tracking-wider">
                  Services Private Limited
                </div>
              </div>
            </Link>

            {/* Statutory CIN Identification */}
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-md text-[10px] text-white/80 font-mono">
              <Building2 size={11} className="text-[#FF7819]" />
              <span>CIN: U46109DL2024PTC438732</span>
            </div>

            <p className="mt-3 text-white/60 leading-relaxed text-[11px] max-w-sm">
              CoverMantra is an institutional digital lending aggregator (Lending Service Provider - LSP) facilitating verified loan solutions through partnering RBI-regulated Scheduled Banks and NBFCs across India.
            </p>

            {/* Social Connect Handles */}
            <div className="mt-4 pt-4 border-t border-white/5 w-full">
              <div className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-2">
                Official Channels
              </div>
              <div className="flex gap-2">
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
                    className="w-7.5 h-7.5 flex items-center justify-center bg-white/5 hover:bg-[#FF7819] text-white/70 hover:text-white rounded-md transition-all duration-200 border border-white/10 hover:border-[#FF7819]/50"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Lending Products (Col-span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left">
            <div className="flex items-center gap-1.5 mb-3.5 border-l-2 border-[#FF7819] pl-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Lending Products
              </h3>
            </div>
            <ul className="space-y-2 text-[11px] text-white/60">
              <li>
                <button
                  onClick={() => handleProtectedNavigation("/personal-loans")}
                  suppressHydrationWarning={true}
                  className="hover:text-[#FF7819] transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Personal Loans (Instant Disbursal)</span>
                </button>
              </li>
              <li>
                <Link href="/business-loans" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>MSME Business Loans</span>
                </Link>
              </li>
              <li>
                <Link href="/emi-calculator" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Smart EMI Calculator</span>
                </Link>
              </li>
              <li>
                <Link href="/quick-links" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Eligibility & Interest Rate Check</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>About CoverMantra Services</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Regulatory & Governance (Col-span 2) */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <div className="flex items-center gap-1.5 mb-3.5 border-l-2 border-[#FF7819] pl-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Compliance & Legal
              </h3>
            </div>
            <ul className="space-y-2 text-[11px] text-white/60">
              <li>
                <Link href="/LenderGrievances" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Lender Grievances</span>
                </Link>
              </li>
              <li>
                <Link href="/datapolicy" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Data Protection Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link href="/delete-account" className="hover:text-amber-400 transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-amber-400/60 group-hover:bg-amber-400"></span>
                  <span>Account Deletion</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#FF7819] transition-colors flex items-center gap-1.5 group">
                  <span className="w-1 h-1 rounded-full bg-[#FF7819]/60 group-hover:bg-[#FF7819]"></span>
                  <span>FAQs & Helpdesk</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Nodal Desk & Newsletter (Col-span 3) */}
          <div className="lg:col-span-3 flex flex-col items-start text-left w-full">
            <div className="flex items-center gap-1.5 mb-3.5 border-l-2 border-[#FF7819] pl-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Grievance & Support
              </h3>
            </div>
            
            {/* Direct Official Contact */}
            <div className="space-y-2 mb-4 text-[11px] text-white/70 w-full">
              <div className="flex items-center gap-2 p-2 bg-white/[0.03] border border-white/5 rounded-lg">
                <Mail className="w-3.5 h-3.5 text-[#FF7819] shrink-0" />
                <a href="mailto:info@covermantra.in" className="hover:text-[#FF7819] transition-colors font-medium break-all">
                  info@covermantra.in
                </a>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/[0.03] border border-white/5 rounded-lg text-white/50 text-[10px]">
                <Clock className="w-3.5 h-3.5 text-[#FF7819] shrink-0" />
                <span>Mon – Sat: 9:30 AM – 6:30 PM</span>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="w-full">
              <div className="text-[10px] text-white/50 mb-2">
                Subscribe for verified loan interest rates & updates:
              </div>
              <form onSubmit={handleSubscribe} className="relative w-full">
                <input 
                  type="email" 
                  placeholder="Enter email address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  suppressHydrationWarning={true}
                  className="w-full pl-3 pr-9 py-2 bg-white/[0.04] border border-white/15 focus:border-[#FF7819] focus:bg-white/[0.06] focus:outline-none text-white text-[11px] rounded-lg transition-colors placeholder:text-white/30"
                  required
                />
                <button 
                  type="submit"
                  suppressHydrationWarning={true}
                  className="absolute right-1 top-1 bottom-1 w-7 flex items-center justify-center bg-[#FF7819] hover:bg-[#E65C00] text-white rounded-md transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <Send size={11} />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. STATUTORY DIGITAL LENDING COMPLIANCE DISCLAIMER BOX */}
        {/* ========================================================================= */}
        <div className="my-6 p-4 sm:p-5 bg-white/[0.02] border border-[#FF7819]/20 rounded-xl relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-[#FF7819]/15 text-[#FF7819] rounded-md shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-1.5 text-left">
              <div className="text-[11px] font-bold text-white tracking-wide flex items-center gap-2">
                <span>Statutory Digital Lending Regulatory Disclosure</span>
                <span className="text-[9px] px-1.5 py-0.5 bg-[#FF7819]/20 text-[#FF7819] rounded font-mono font-normal">RBI/2022-23/111</span>
              </div>
              <p className="text-[10px] text-white/60 leading-relaxed">
                <strong>CoverMantra Services Private Limited</strong> (CIN: U46109DL2024PTC438732 | GSTIN: 06AAMCC2334C1Z3) is a digital loan aggregator and Lending Service Provider (LSP) operating in strict conformity with the Reserve Bank of India (RBI) Guidelines on Digital Lending dated September 02, 2022. CoverMantra is not a Bank or a Non-Banking Financial Company (NBFC) and does not directly grant loans, credit facilities, or collect upfront cash processing fees. All loan sanctions, interest rates, tenure, and disbursals are solely at the discretion of our partnering RBI-regulated Scheduled Commercial Banks and NBFCs, subject to statutory credit evaluation and applicant verification.
              </p>
            </div>
          </div>
        </div>

        {/* SEO Footer Accordions & Product Link Section */}
        <SeoFooter />

        {/* ========================================================================= */}
        {/* 4. BOTTOM LEGAL COPYRIGHT & REGISTERED OFFICE BAR */}
        {/* ========================================================================= */}
        <div className="pt-6 mt-6 border-t border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            
            {/* Registered Office */}
            <div className="flex items-start gap-2 text-white/50 text-[10px] leading-relaxed text-left">
              <MapPin className="w-3.5 h-3.5 text-[#FF7819] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white/70 block uppercase tracking-wider text-[9px]">Registered Office:</span>
                First Floor Building No. 233, Thakar Basti, Bagichi Mohalla, Dharamshala Road, Fatehabad, Haryana - 125050
              </div>
            </div>

            {/* Copyright & Entity */}
            <div className="text-left lg:text-center text-[10px] text-white/50 space-y-0.5">
              <p>
                © {new Date().getFullYear()} CoverMantra Services Private Limited. 
                <span className="text-white/40 ml-1">All Rights Reserved.</span>
              </p>
              <p className="text-[9px] text-white/40 font-mono">
                CIN: U46109DL2024PTC438732 | GSTIN: 06AAMCC2334C1Z3 | Digital Lending Partner (LSP)
              </p>
            </div>

            {/* Legal Links & Back to Top */}
            <div className="flex items-center justify-between lg:justify-end gap-4 text-[11px] w-full lg:w-auto">
              <div className="flex gap-2.5 text-white/50">
                <Link href="/privacy" className="hover:text-[#FF7819] transition-colors">Privacy</Link>
                <span className="text-white/20">|</span>
                <Link href="/terms" className="hover:text-[#FF7819] transition-colors">Terms</Link>
                <span className="text-white/20">|</span>
                <Link href="/datapolicy" className="hover:text-[#FF7819] transition-colors">Data Policy</Link>
              </div>
              <button 
                onClick={scrollToTop}
                suppressHydrationWarning={true}
                className="flex items-center justify-center w-7 h-7 bg-white/5 hover:bg-[#FF7819] text-white/70 hover:text-white border border-white/10 rounded-md transition-colors cursor-pointer"
                aria-label="Scroll to top"
                title="Scroll to top"
              >
                <ChevronUp className="w-3.5 h-3.5" />
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