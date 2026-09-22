"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import LoginModal from "./LoginModal";
import Cookies from "js-cookie";
import GlobalModal from "./globalmodel";
import Image from "next/image";
import { useAuthStore } from "../../store/useAuthStore";
import { FaGooglePlay } from "react-icons/fa";

export const triggerLoginStatusChange = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("loginStatusChanged"));
  }
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    setIsClient(true);
    const updateLoginStatus = () => {
      setIsLoggedIn(Cookies.get("co_login") === "true" || useAuthStore.getState().isAuthenticated);
    };
    updateLoginStatus();
    window.addEventListener("loginStatusChanged", updateLoginStatus);
    return () => window.removeEventListener("loginStatusChanged", updateLoginStatus);
  }, []);

  useEffect(() => {
    if (isClient) {
      setIsLoggedIn(isAuthenticated || Cookies.get("co_login") === "true");
    }
  }, [isAuthenticated, isClient]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logout();
    ["loanFormData", "loanFormSubmitted"].forEach(c => Cookies.remove(c));
    localStorage.removeItem("userInfo");
    setIsLoggedIn(false);
    triggerLoginStatusChange();
    router.push("/");
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Personal Loans", modal: true, path: "/personal-loans" },
    { name: "Blogs", path: "/Blogs" },
    { name: "Smart Access", modal: true, path: "/quick-links" },
    { name: "Contact", modal: true, path: "/contact" },
  ];

  const handleMenuClick = (item: any) => {
    const excludedModals = ["/quick-links", "/contact", "/Blogs"];
    if (!isLoggedIn && item.modal && !excludedModals.includes(item.path)) {
      setLoginOpen(true);
    } else {
      router.push(item.path);
    }
    setMobileMenuOpen(false);
  };

  const isDarkHeroPage = pathname === "/" || pathname === "/about";
  const isSolidNav = scrolled || !isDarkHeroPage;

  if (!isClient) return <div className="h-20 bg-[#FAF8F5]" />;

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100]">
      {/* 🏛️ Institutional Bank / Statutory Compliance Top Bar */}
      <div className="hidden md:block bg-[#002140] text-slate-200 text-[11px] font-medium select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Digital Lending Aggregator Platform
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Partnered with RBI-Regulated Banks & NBFCs</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300 font-mono">CIN: U46109DL2024PTC438732</span>
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1 text-slate-300">
              🔒 256-Bit SSL Secured
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-300">Zero CIBIL Impact Inquiry</span>
          </div>
        </div>
      </div>

      <nav
        className={`w-full transition-all duration-300 ${
          isSolidNav 
          ? "py-2 bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs" 
          : "py-2.5 bg-[#FAF8F5]/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2.5 group relative z-[110]">
            <div className="w-8 h-8 sm:w-9 sm:h-9 shrink-0">
               <img src="/image/logo.png" alt="CoverMantra Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl leading-none tracking-tight">
                <span className="text-[#002140]">Cover</span>
                <span className="text-[#FF7819]">Mantra</span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-500 mt-0.5">Fintech Aggregator</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1 bg-white/80 p-1 rounded-lg border border-[#E5E2DA]/60 shadow-2xs">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive 
                    ? "bg-[#002140] text-white shadow-xs" 
                    : "text-slate-700 hover:text-[#002140] hover:bg-slate-100/70"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Side: Login/Profile */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Play Store App Download with Official 4-Color Icon */}
            <a
              href="https://play.google.com/store/apps/details?id=com.covermantra.loan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold text-xs transition-all border border-[#E5E2DA] bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.609 1.814L13.793 12 3.61 22.186A1.9 1.9 0 0 1 3 20.736V3.264c0-.57.23-1.08.609-1.45z" fill="#00C3FF"/>
                <path d="M17.18 8.613L13.793 12 3.61 1.814A1.89 1.89 0 0 1 4.55 1.43c.34 0 .66.12.91.32l11.72 6.863z" fill="#00E676"/>
                <path d="M17.18 15.387L5.46 22.25c-.25.2-.57.32-.91.32a1.89 1.89 0 0 1-.94-.384L13.793 12l3.387 3.387z" fill="#FF3A44"/>
                <path d="M21.54 11.12l-4.36-2.507L13.793 12l3.387 3.387 4.36-2.507c.88-.507.88-1.253 0-1.76z" fill="#FFC800"/>
              </svg>
              <span>Download App</span>
            </a>

            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => router.push("/profile")}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-md font-semibold text-xs transition-all border border-[#E5E2DA] bg-white hover:bg-slate-50 shadow-xs text-[#002140] cursor-pointer"
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-slate-300 shrink-0">
                    <Image src="/image/user.png" alt="User" width={16} height={16} className="object-cover" />
                  </div>
                  <span>Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center p-1.5 rounded-md text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className="flex items-center gap-2 px-5 py-2 rounded-md font-semibold text-xs transition-all bg-[#FF7819] hover:bg-[#E65C00] text-white shadow-xs cursor-pointer tracking-wide"
              >
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Play Store & Hamburger Container */}
          <div className="flex items-center gap-2 lg:hidden relative z-[110]">
            <a
              href="https://play.google.com/store/apps/details?id=com.covermantra.loan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-white hover:bg-slate-50 text-slate-700 border border-[#E5E2DA] rounded-lg shadow-2xs active:scale-95 transition-all flex items-center justify-center"
              title="Download App Now"
            >
              <FaGooglePlay size={15} className="text-[#FF7819]" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white text-[#002140] border border-[#E5E2DA] rounded-lg shadow-2xs active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>
    </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#00172e] z-[100] transition-all duration-300 ease-in-out lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-24 pb-8 px-6 gap-2.5 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
            Navigation Menu
          </div>
          {navItems.map((item, i) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer ${
                pathname === item.path 
                ? "bg-[#FF7819] text-white border-transparent shadow-xs" 
                : "bg-white/[0.04] text-white/80 hover:text-white hover:bg-white/[0.08] border-white/10"
              }`}
            >
              {item.name}
            </button>
          ))}

          {/* Mobile App Download Button in Overlay */}
          <a
            href="https://play.google.com/store/apps/details?id=com.covermantra.loan"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-3 px-4 rounded-xl text-xs font-bold border bg-[#FF7819]/15 border-[#FF7819]/30 text-[#FF7819] flex items-center justify-center gap-2 hover:bg-[#FF7819] hover:text-white transition-all mt-2"
          >
            <FaGooglePlay size={16} />
            <span>DOWNLOAD APP ON PLAY STORE</span>
          </a>

          {isLoggedIn ? (
            <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
               <button onClick={() => router.push("/profile")} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white flex flex-col items-center gap-1.5 cursor-pointer">
                  <LayoutDashboard size={18} />
                  <span className="text-[10px] font-bold uppercase">Profile</span>
               </button>
               <button onClick={handleLogout} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 text-red-400 flex flex-col items-center gap-1.5 cursor-pointer">
                  <LogOut size={18} />
                  <span className="text-[10px] font-bold uppercase">Logout</span>
               </button>
            </div>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }}
              className="mt-auto pt-4 w-full bg-[#FF7819] hover:bg-[#E65C00] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-md active:scale-95 transition-all cursor-pointer"
            >
              LOGIN TO YOUR ACCOUNT
            </button>
          )}
        </div>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <GlobalModal />
    </>
  );
}