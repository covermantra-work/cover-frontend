"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import LoginModal from "./LoginModal";
import GlobalModal from "./globalmodel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

export default function HeroSection() {
  const router = useRouter();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
const isUserAuthenticated = useAuthStore(
  (state) => state.isAuthenticated
);

useEffect(() => {
  setIsMounted(true);
  useAuthStore.getState().checkAuth();
}, []);

  const handleApplyNow = () => {
    if (!isMounted) return;
    if (isUserAuthenticated) {
      router.push("/personal-loans");
    } else {
      setLoginOpen(true);
    }
  };

  const slides = [
    {
      src: "/image/herosec1.png",
      tagline: "Unsecured Personal Loans",
      headline: "Sapne Aapke, <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Smart Mantra</span>",
      description: "Compare and apply for unsecured personal loans up to ₹5,00,000 from India's top RBI-registered partners. 100% digital process."
    },
    {
      src: "/image/herosec2.png",
      tagline: "Instant Loan Approval",
      headline: "Turant Manzoori, <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Quick Process</span>",
      description: "Get instant loan approval with paperless online documentation and fast disbursal directly to your bank account."
    },
    {
      src: "/image/herosec3.png",
      tagline: "Small Amount Loans",
      headline: "Chota Loan, <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Badi Sahuliyat</span>",
      description: "Need quick cash for urgent requirements? Get instant small-ticket loans with minimal documents and flexible repayment."
    },
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#08101E]" />;

  return (
    <section className="relative bg-[#08101E] min-h-screen flex flex-col justify-start text-white overflow-hidden pt-4 sm:pt-6">
      
      {/* 🌟 Warm 3D Studio Ambient Lighting */}
      <div className="absolute w-[600px] h-[400px] bg-gradient-to-tr from-amber-500/20 via-[#FF7819]/25 to-transparent rounded-full blur-[140px] pointer-events-none -top-12 left-1/2 -translate-x-1/2" />
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-bl from-blue-500/15 to-cyan-500/10 rounded-full blur-[120px] pointer-events-none -bottom-10 right-0" />

      {/* 🪙 Floating 3D Gold Coin 1 (Left) */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [0, 8, -4, 0] }}
        transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
        className="hidden lg:flex absolute top-24 left-10 xl:left-20 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_35px_rgba(245,158,11,0.4)] items-center justify-center text-amber-950 font-black text-2xl border-2 border-white/70 select-none pointer-events-none z-30"
      >
        ₹
      </motion.div>

      {/* 🪙 Floating 3D Gold Coin 2 (Right) */}
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [0, -8, 6, 0] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.4 }}
        className="hidden lg:flex absolute bottom-24 right-8 xl:right-16 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_30px_rgba(245,158,11,0.35)] items-center justify-center text-amber-950 font-black text-xl border-2 border-white/70 select-none pointer-events-none z-30"
      >
        ₹
      </motion.div>

      {/* 🔱 Top Central Master Block */}
      <div className="w-full max-w-4xl mx-auto text-center px-4 pt-12 sm:pt-16 md:pt-20 z-50 flex flex-col items-center">
        
        {/* Satyam Shivam Sundaram Mantra Strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-white font-serif tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-xs font-bold select-none mb-4">
          <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent via-white/40 to-white" />
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] whitespace-nowrap">सत्यम शिवम सुंदरम</span>
          <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent via-white/40 to-white" />
        </div>

        {/* 🎯 Singular High-Converting 3D Tactile Action Button */}
        <div className="w-full flex justify-center items-center mb-2 max-w-md">
          {isUserAuthenticated ? (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={() => router.push("/personal-loans")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black rounded-2xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_8px_0_#C2410C,0_20px_35px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] active:shadow-[0_2px_0_#C2410C] transition-all cursor-pointer"
            >
              <span>EXPLORE LOAN OFFERS</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">→</span>
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97, y: 3 }}
              onClick={handleApplyNow}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 sm:px-12 py-4.5 bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white font-black rounded-2xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_8px_0_#C2410C,0_20px_35px_rgba(234,88,12,0.45),inset_0_2px_4px_rgba(255,255,255,0.6)] active:shadow-[0_2px_0_#C2410C] transition-all cursor-pointer"
            >
              <span>APPLY FOR INSTANT LOAN</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold">→</span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Dynamic Background Glow Layer */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-200 aspect-square rounded-full blur-[130px] opacity-15 -z-10 transition-colors duration-1000 ${
        activeSlide === 1 ? "bg-green-500" : "bg-[#FF7819]"
      }`} />

      {/* Content Layout Grid (Space strictly reduced by changing mt-8 to mt-2/mt-4) */}
      <div className="container mx-auto px-4 sm:px-8 lg:px-12 w-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-12 z-20 pb-12 md:pb-16 mt-2 sm:mt-4 md:mt-1">
        
        {/* LEFT MAIN TEXT BUNDLE */}
        <div className="order-2 md:order-1 text-center md:text-left flex flex-col items-center md:items-start pt-2 md:pt-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute h-full w-full rounded-full ${activeSlide === 1 ? "bg-green-500" : "bg-[#FF690B]"} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${activeSlide === 1 ? "bg-green-500" : "bg-[#FF690B]"}`}></span>
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70">
                  {slides[activeSlide].tagline}
                </span>
              </div>

              <h1 
                className="text-[28px] xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-4 tracking-tight"
                dangerouslySetInnerHTML={{ __html: slides[activeSlide].headline }}
              />

              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/60 max-w-lg mb-4 leading-relaxed">
                {slides[activeSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE COMPONENT */}
        <div className="order-1 md:order-2 w-full relative h-64 sm:h-80 md:h-96 lg:h-120 flex items-center justify-center mt-4 md:mt-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
            className="h-full w-full"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i} className="flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt="Hero Slide Image"
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Premium Wave Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full z-30 translate-y-0.5">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-12.5 sm:h-20 lg:h-30">
          <path d="M0,120 L1440,120 L1440,40 C1320,80 1200,0 1080,40 C960,80 840,0 720,40 C600,80 480,0 360,40 C240,80 120,0 0,40 Z" fill="white" />
        </svg>
      </div>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <GlobalModal />
    </section>
  );
}