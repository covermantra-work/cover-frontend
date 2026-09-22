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
    title: "Enter Basic Details",
    desc: "Share your mobile number and basic employment details. 100% paperless inquiry.",
    icon: <Smartphone className="text-[#FF7819] w-5 h-5" />,
  },
  {
    step: "02",
    title: "Compare Top Offers",
    desc: "Compare pre-qualified rates and loan terms from verified RBI-regulated banks & NBFCs.",
    icon: <Clock className="text-[#FF7819] w-5 h-5" />,
  },
  {
    step: "03",
    title: "Redirect to Partner",
    desc: "Complete digital KYC and verification on the designated institutional lender's portal.",
    icon: <CheckCircle2 className="text-[#FF7819] w-5 h-5" />,
  },
  {
    step: "04",
    title: "Direct Disbursal",
    desc: "Approved funds are transferred straight into your verified bank account without intermediary delays.",
    icon: <FaMoneyBillWave className="text-[#FF7819] w-5 h-5" />,
  },
];

export default function HowItWorks() {
  return (
    <section className="relative bg-[#FAF8F5] py-10 sm:py-12 md:py-14 px-4 sm:px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-8 sm:mb-10 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-[#FFF3EB] rounded-md border border-[#FF7819]/30 mb-2 shadow-2xs">
          <div className="w-1.5 h-1.5 bg-[#FF7819] rounded-full" />
          <span className="uppercase tracking-wider text-[10px] font-bold text-[#FF7819]">
            Transparent 4-Step Process
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-[32px] font-extrabold text-[#002140] tracking-tight leading-tight">
          How <span className="text-[#FF7819]">CoverMantra</span> Aggregator Works
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
          From basic eligibility check to direct bank disbursal — structured for complete transparency, speed, and regulatory compliance.
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet !bg-slate-300",
            bulletActiveClass: "!bg-[#FF7819] !w-6 !rounded-md transition-all duration-300",
          }}
          className="pb-12"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div
                className="group h-full bg-white rounded-xl p-6 border border-[#E5E2DA] shadow-xs 
                           hover:border-[#002140]/40 transition-all duration-200 flex flex-col items-start text-left relative overflow-hidden"
              >
                {/* Step Number Tag */}
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#FFF3EB] border border-[#FF7819]/25 text-[#FF7819] rounded-lg shadow-xs">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Step {step.step}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-base font-bold text-[#002140] mb-2 tracking-tight group-hover:text-[#FF7819] transition-colors">
                  {step.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed font-normal">
                  {step.desc}
                </p>

                {/* Subtle progress indicator */}
                <div className="w-full pt-4 mt-auto">
                  <div className="h-1 w-8 bg-[#E5E2DA] group-hover:bg-[#FF7819] rounded-full transition-colors" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}