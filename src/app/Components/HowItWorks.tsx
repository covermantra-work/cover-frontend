"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import 'swiper/swiper.css';
import 'swiper/css/pagination';

const steps = [
  {
    title: "Apply Online",
    desc: "Easily fill out your business loan application with a few simple steps online. No paperwork required.",
    image: "https://cdn-icons-png.flaticon.com/512/4359/4359754.png",
  },
  {
    title: "Quick Verification",
    desc: "We verify your details quickly through secure digital channels to ensure speedy approval.",
    image: "https://cdn-icons-png.flaticon.com/512/2329/2329073.png",
  },
  {
    title: "Get Approval",
    desc: "Our team evaluates your application and approves loans within hours for eligible businesses.",
    image: <FaCheckCircle className="text-white w-14 h-14" />,
  },
  {
    title: "Receive Funds",
    desc: "Funds are transferred directly to your business account so you can start using them right away.",
    image: <FaMoneyBillWave className="text-white w-14 h-14" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#050811] py-24 px-4 md:px-10 overflow-hidden border-t border-b border-white/5">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-[-10%] w-96 h-96 bg-[#FF690B]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10 mb-4">
          <div className="w-2 h-2 bg-[#FF690B] rounded-full animate-ping" />
          <span className="uppercase tracking-widest text-xs font-semibold text-white/70">
            Simple Process
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
          How It Works
        </h2>
        <p className="mt-4 text-base sm:text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
          Get your business loan approved in just 4 simple steps — fast, secure, and paperless.
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
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-white/20",
            bulletActiveClass: "!bg-[#FF690B] !w-6 !rounded-full transition-all duration-300",
          }}
          className="pb-16"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="group h-full bg-white/[0.03] backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 border border-white/10 
                           hover:border-[#FF690B]/30 hover:bg-white/[0.05] hover:shadow-[0_20px_50px_rgba(255,105,11,0.08)] 
                           hover:-translate-y-3 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Accent Corner Glow */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-[#FF690B]/10 to-transparent rounded-full group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                {/* Icon Container - Sleek Modern style */}
                <div className="w-24 h-24 mb-8 flex items-center justify-center bg-gradient-to-br from-[#FF690B] to-[#FF8C00] 
                              rounded-[2rem] shadow-[0_10px_25px_rgba(255,105,11,0.3)] relative z-10 transition-transform group-hover:scale-105 duration-300">
                  {typeof step.image === "string" ? (
                    <img 
                      src={step.image} 
                      alt={step.title} 
                      className="w-14 h-14 object-contain filter invert-0 drop-shadow-lg" 
                    />
                  ) : (
                    step.image
                  )}
                </div>

                {/* Step Number Badge */}
                <div className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center 
                              bg-[#FF690B] text-white text-sm font-black rounded-xl shadow-lg border border-white/20">
                  {`0${index + 1}`}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                  {step.title}
                </h3>

                <p className="text-white/60 text-[14.5px] sm:text-[15px] leading-relaxed flex-grow font-medium">
                  {step.desc}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}