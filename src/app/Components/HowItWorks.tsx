"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { FileText, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import 'swiper/swiper.css';
import 'swiper/css/pagination';

const steps = [
  {
    step: "01",
    title: "Apply Online",
    desc: "Complete your quick eligibility profile in under 2 minutes. 100% paperless with zero physical document hassles.",
    icon: <Smartphone className="text-white w-9 h-9" />,
  },
  {
    step: "02",
    title: "Instant Verification",
    desc: "Our automated smart engine compares 15+ RBI-regulated lenders to unlock your best interest rates and approval terms.",
    icon: <Clock className="text-white w-9 h-9" />,
  },
  {
    step: "03",
    title: "Digital e-Sign",
    desc: "Select your preferred lender offer, verify Aadhaar OTP KYC, and complete seamless digital agreement signing in seconds.",
    icon: <CheckCircle2 className="text-white w-9 h-9" />,
  },
  {
    step: "04",
    title: "Direct Disbursal",
    desc: "Approved funds are transferred directly into your verified bank account with zero hidden processing charges.",
    icon: <FaMoneyBillWave className="text-white w-8 h-8" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#08101E] py-24 md:py-32 px-4 md:px-10 overflow-hidden border-t border-b border-white/10">
      {/* 🌟 3D Volumetric Studio Ambient Lights */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-[#FF7819]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] bg-gradient-to-bl from-blue-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center mb-16 md:mb-20 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-5 shadow-lg">
          <div className="w-2 h-2 bg-[#FF7819] rounded-full animate-ping" />
          <span className="uppercase tracking-widest text-[11px] font-black text-[#FF7819]">
            Transparent 4-Step Journey
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          How <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFB900] to-[#FF8A33]">CoverMantra</span> Works
        </h2>
        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed">
          From application to money in your bank — designed for lightning speed, bank-grade safety, and zero stress.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
            1280: { slidesPerView: 4, spaceBetween: 28 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white/20",
            bulletActiveClass: "!bg-[#FF7819] !w-7 !rounded-full transition-all duration-300",
          }}
          className="pb-16"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="group h-full bg-white/[0.04] backdrop-blur-2xl rounded-[3rem] p-8 sm:p-9 border-2 border-white/10 
                           hover:border-[#FF7819]/50 hover:bg-white/[0.07] hover:shadow-[0_25px_60px_rgba(234,88,12,0.25),inset_0_2px_4px_rgba(255,255,255,0.15)] 
                           hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* 3D Physical Step Number Pill */}
                <div className="absolute top-6 right-6 px-3.5 py-1.5 flex items-center justify-center 
                              bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white text-xs font-black rounded-xl shadow-[0_4px_10px_rgba(234,88,12,0.4),inset_0_1px_2px_rgba(255,255,255,0.6)] border border-white/30">
                  {step.step}
                </div>

                {/* 3D Embossed Icon Container */}
                <div className="w-20 h-20 mb-8 mt-2 flex items-center justify-center bg-gradient-to-tr from-[#FF7819] via-[#FF8A33] to-[#E65C00] 
                              rounded-[2rem] shadow-[0_12px_28px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.6)] border-2 border-white/40 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-slate-300 text-xs sm:text-[13.5px] leading-relaxed flex-grow font-medium">
                  {step.desc}
                </p>

                {/* Subtle Progress Connector */}
                <div className="w-full pt-6 mt-auto">
                  <div className="h-1 w-12 bg-gradient-to-r from-[#FF7819] to-transparent mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}