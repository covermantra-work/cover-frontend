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
    { name: "Smart Access", modal: true, path: "/quick-links" },
    { name: "Contact", modal: true, path: "/contact" },
  ];

  const handleMenuClick = (item: any) => {
    const excludedModals = ["/quick-links", "/contact"];
    if (!isLoggedIn && item.modal && !excludedModals.includes(item.path)) {
      setLoginOpen(true);
    } else {
      router.push(item.path);
    }
    setMobileMenuOpen(false);
  };

  if (!isClient) return <div className="h-20 bg-[#08101E]" />;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled 
          ? "py-3 bg-[#08101E]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl" 
          : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group relative z-[110]">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 shrink-0 group-hover:scale-105 transition-transform duration-300">
               <img src="/image/logo.png" alt="CoverMantra Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg sm:text-xl lg:text-2xl leading-none tracking-tight">
                <span className="text-white" style={{ WebkitTextStroke: "1px #FF690B", }}>Cover</span>
                <span className="text-[#FF690B]">Mantra</span>
              </span>
              <span className="flex items-center gap-1.5 text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.2em] uppercase font-black mt-1">
                <span className="text-[#FF690B]">Smart Cover</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <span className="text-slate-300">Sure Trust</span>
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className={`hidden lg:flex items-center p-1 rounded-2xl transition-all duration-300 ${scrolled ? 'bg-white/5 border border-white/10' : 'bg-transparent'}`}>
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <button
                  key={item.name}
                  onClick={() => handleMenuClick(item)}
                  className={`px-4 lg:px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isActive 
                    ? "bg-linear-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] shadow-lg shadow-orange-600/20" 
                    : scrolled 
                      ? "text-white/70 hover:text-white hover:bg-white/10" // Color when navbar is dark
                      : "text-white/90 hover:text-[#FF690B]" // Color when navbar is transparent
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Right Side: Login/Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Play Store App Download */}
            <a
              href="https://play.google.com/store/apps/details?id=com.covermantra.loan"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs transition-all border ${
                scrolled 
                ? "bg-[#1A2332]/50 border-white/10 text-white hover:bg-[#FF690B] hover:text-white hover:border-[#FF690B]" 
                : "bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-[#FF690B] hover:text-white hover:border-[#FF690B]"
              }`}
            >
              <FaGooglePlay className="text-[#FF690B] group-hover:text-white transition-colors" />
              <span>Download App</span>
            </a>

            {isLoggedIn ? (
              <>
                <button 
                  onClick={() => router.push("/profile")}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 border ${
                    scrolled 
                    ? "bg-[#1A2332] border-white/10 text-white hover:bg-[#FF690B] hover:text-white hover:border-[#FF690B]" 
                    : "bg-white/10 border-white/20 backdrop-blur-sm text-white hover:bg-[#FF690B] hover:text-white hover:border-[#FF690B]"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-white/40 shrink-0">
                    <Image src="/image/user.png" alt="User" width={24} height={24} className="object-cover" />
                  </div>
                  <span>Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 border ${
                    scrolled 
                    ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500" 
                    : "bg-red-500/10 border-red-500/20 backdrop-blur-sm text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500"
                  }`}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setLoginOpen(true)}
                className={`px-6 py-2.5 rounded-xl font-black text-sm transition-all shadow-xl active:scale-95 ${
                  scrolled 
                  ? "bg-[#FF690B] text-white hover:bg-white hover:text-[#08101E]" 
                  : "bg-white text-[#08101E] hover:bg-[#FF690B] hover:text-white"
                }`}
              >
                LOGIN
              </button>
            )}
          </div>

          {/* Mobile Play Store & Hamburger Container */}
          <div className="flex items-center gap-2 lg:hidden relative z-[110]">
            <a
              href="https://play.google.com/store/apps/details?id=com.covermantra.loan"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 bg-white/5 hover:bg-[#FF690B] text-white/80 hover:text-white border border-white/10 hover:border-[#FF690B]/30 rounded-xl transition-all active:scale-90 flex items-center justify-center"
              title="Download App Now"
            >
              <FaGooglePlay size={16} className="text-[#FF690B] group-hover:text-white" />
            </a>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 bg-white/5 rounded-xl border border-white/10 text-white active:scale-90 transition-transform"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-[#08101E] z-[100] transition-all duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-6 gap-3">
          {navItems.map((item, i) => (
            <button
              key={item.name}
              onClick={() => handleMenuClick(item)}
              className={`w-full text-left p-4 rounded-2xl text-xl font-black border transition-all duration-300 ${
                pathname === item.path 
                ? "bg-linear-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] border-transparent" 
                : "bg-white/5 text-white border-white/10"
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
            className="w-full text-center p-4 rounded-2xl text-lg font-black border bg-[#FF690B]/10 border-[#FF690B]/25 text-[#FF690B] flex items-center justify-center gap-2.5 hover:bg-[#FF690B] hover:text-white hover:border-transparent transition-all duration-300"
          >
            <FaGooglePlay size={20} />
            <span>DOWNLOAD APP NOW</span>
          </a>

          {isLoggedIn ? (
            <div className="mt-auto mb-8 grid grid-cols-2 gap-3">
               <button onClick={() => router.push("/profile")} className="p-4 bg-white/5 rounded-2xl border border-white/10 text-white flex flex-col items-center gap-2">
                  <LayoutDashboard size={20} />
                  <span className="text-[10px] font-bold uppercase">Profile</span>
               </button>
               <button onClick={handleLogout} className="p-4 bg-red-500/10 rounded-2xl border border-red-500/20 text-red-500 flex flex-col items-center gap-2">
                  <LogOut size={20} />
                  <span className="text-[10px] font-bold uppercase">Logout</span>
               </button>
            </div>
          ) : (
            <button
              onClick={() => { setMobileMenuOpen(false); setLoginOpen(true); }}
              className="mt-auto mb-8 w-full bg-linear-to-r from-[#FF690B] to-[#FFB900] text-[#08101E] p-5 rounded-2xl font-black text-lg shadow-2xl active:scale-95 transition-transform"
            >
              LOGIN TO ACCOUNT
            </button>
          )}
        </div>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <GlobalModal />
    </>
  );
}