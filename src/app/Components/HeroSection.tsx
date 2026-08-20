"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import LoginModal from "./LoginModal";
import GlobalModal from "./globalmodel";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

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
      src: "/image/himg.png",
      tagline: "India's Trusted Applicant-Lender Connector",
      headline: "Finance ka <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Smart Mantra</span>",
      description: "Seamlessly connecting you to RBI-Registered Lenders for instant loan approvals."
    },
    {
      src: "/image/himg2.png",
      tagline: "Naye India ka Digital Mantra",
      headline: "Turant Manzoori <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Quick Approval</span>",
      description: "Empowering agricultural growth with easy digital applications."
    },
    {
      src: "/image/himg3.png",
      tagline: "Full-Range Fintech Mantra",
      headline: "Loans. Insurance. <br /> <span class='text-transparent bg-clip-text bg-linear-to-r from-[#FF690B] to-[#FFD700]'>Growth.</span>",
      description: "Home, Business, Car Loans, and Instant Insurance Covers."
    },
  ];

  if (!isMounted) return <div className="min-h-screen bg-[#08101E]" />;

  return (
    <section className="relative bg-[#08101E] min-h-screen flex flex-col justify-start text-white overflow-hidden pt-4 sm:pt-6">
      
      {/* 🔱 Top Central Master Block (Gaps and margins strictly reduced here) */}
      <div className="w-full max-w-4xl mx-auto text-center px-4 pt-12 sm:pt-16 md:pt-20 z-50 flex flex-col items-center">
        
        {/* Satyam Shivam Sundaram Mantra Strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 text-white font-serif tracking-[0.3em] sm:tracking-[0.4em] uppercase text-[11px] sm:text-xs font-bold select-none mb-3 sm:mb-4">
          <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent via-white/40 to-white" />
          <span className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] whitespace-nowrap">सत्यम शिवम सुंदरम</span>
          <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent via-white/40 to-white" />
        </div>

        {/* 🎯 Apply Now & Download App Buttons - Flex layout side by side */}
        <div className="w-full flex flex-col sm:flex-row justify-center items-center gap-4 mb-2 max-w-lg">
          {isUserAuthenticated ? (
            <button
              disabled={true}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-10 py-3.5 sm:py-4 bg-white/10 text-white/40 font-black rounded-2xl border border-white/10 text-xs sm:text-sm tracking-wide cursor-not-allowed select-none"
            >
              ALREADY LOGGED IN ✨
            </button>
          ) : (
            <button
              onClick={handleApplyNow}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 sm:gap-5 px-8 sm:px-10 py-3.5 sm:py-4 bg-white text-[#08101E] font-black rounded-2xl text-xs sm:text-sm tracking-wider shadow-[0_0_35px_rgba(255,255,255,0.3)] hover:bg-[#FF690B] hover:text-white transition-all duration-300 animate-pulse cursor-pointer"
            >
              APPLY NOW
              <div className={`w-5 h-5 sm:w-6 sm:h-6 ${activeSlide === 1 ? 'bg-green-600' : 'bg-[#FF690B]'} rounded-full flex items-center justify-center group-hover:bg-white transition-colors`}>
                <span className="text-white group-hover:text-[#08101E] text-xs sm:text-sm">→</span>
              </div>
            </button>
          )}

        </div>
      </div>

      {/* Dynamic Background Glow Layer */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-200 aspect-square rounded-full blur-[130px] opacity-15 -z-10 transition-colors duration-1000 ${
        activeSlide === 1 ? "bg-green-500" : "bg-[#FF690B]"
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
                className="text-3xl sm:text-5xl lg:text-7xl font-black leading-[1.1] mb-4"
                dangerouslySetInnerHTML={{ __html: slides[activeSlide].headline }}
              />

              <p className="text-sm sm:text-base lg:text-lg text-white/60 max-w-lg mb-2 leading-relaxed">
                {slides[activeSlide].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE COMPONENT */}
        <div className="order-1 md:order-2 w-full relative h-64 sm:h-80 md:h-96 lg:h-120 flex items-center justify-center mt-4 md:mt-0">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
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