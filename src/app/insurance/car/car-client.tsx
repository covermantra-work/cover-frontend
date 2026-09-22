"use client";

import dynamic from "next/dynamic";
import { CheckCircle, ShieldCheck, Zap, FileText, ArrowRight } from "lucide-react";
import car from "../../../animations/Car1.json";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import CarCalculator from "../AllCalculators/carcalculator";
import "aos/dist/aos.css";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function CarInsurancePage() {
  useEffect(() => {
    AOS.init({ disable: 'phone', duration: 1000, once: true });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] overflow-x-hidden">
      
      {/* 🏎️ HIGH-SPEED HERO SECTION */}
      <section className="relative bg-[#08101E] text-white pt-24 pb-20 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#FF7819]/10 rounded-full blur-[100px] -ml-24 -mb-24" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-10" data-aos="fade-down">
          <div className="w-48 h-48 bg-white/5 backdrop-blur-2xl rounded-[2.5rem] flex items-center justify-center border border-white/10 mb-8 rotate-3 shadow-2xl">
            <Player
              autoplay
              loop
              src={car}
              style={{ height: "160px", width: "160px" }}
            />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-[#FF7819]/10 border border-[#FF7819]/25 rounded-full backdrop-blur-md shadow-lg select-none animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#FF7819]" />
            <span className="text-[10px] font-black tracking-widest text-[#FF7819] uppercase">Product Launching Soon</span>
          </div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black mb-6 tracking-tighter leading-tight"
          >
            Elite <span className="text-[#FF7819]">Car Insurance</span> <br />
            Plans For You
          </motion.h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
            Protect your vehicle and yourself from financial losses with our 
            next-generation trusted car insurance policies.
          </p>
        </div>
      </section>

      {/* 🛡️ WHY CAR INSURANCE */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4" data-aos="fade-right">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#08101E]">
              Why Do You <span className="text-[#FF7819]">Need It?</span>
            </h2>
            <div className="w-20 h-1.5 bg-[#FF7819] mt-4 rounded-full" />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            "Mandatory by law (Third-Party)",
            "Covers damages to your car",
            "Protection against theft",
            "Covers natural disasters",
            "Cashless repair at partner garages",
            "Personal accident cover",
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="bg-white border border-gray-100 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.02)] p-8 flex gap-4 items-center group transition-all"
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="p-4 bg-[#FFF4E5] rounded-2xl text-[#FF7819] group-hover:bg-[#FF7819] group-hover:text-white transition-all">
                <ShieldCheck size={28} />
              </div>
              <p className="text-lg font-bold text-[#08101E]">{item}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📦 TYPES OF PLANS */}
      <section className="py-24 px-6 bg-[#08101E]/5 rounded-[4rem] mx-4" data-aos="fade-left">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16">
          Choose Your <span className="text-[#FF7819]">Tier</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { title: "Third-Party Liability", desc: "Mandatory by law; covers damages to others." },
            { title: "Comprehensive Plan", desc: "Full protection for your car & third-party." },
            { title: "Zero Depreciation Plan", desc: "Get full claim without depreciation cuts." },
          ].map((plan, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 p-10 text-center relative overflow-hidden group"
              data-aos="flip-up"
            >
              <Zap className="w-12 h-12 text-[#FF7819] mx-auto mb-6 group-hover:scale-125 transition-transform" />
              <h3 className="text-2xl font-black mb-4 text-[#08101E]">{plan.title}</h3>
              <p className="text-gray-500 font-medium mb-8">{plan.desc}</p>
              <button className="w-full bg-[#08101E] text-white py-4 rounded-2xl font-bold hover:bg-[#FF7819] transition-all flex items-center justify-center gap-2 group">
                View Details <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🧮 CALCULATOR */}
      <section className="py-20 px-6 max-w-5xl mx-auto" data-aos="fade-right">
        <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 p-6 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black text-center mb-10 text-[#08101E]">
            Premium <span className="text-[#FF7819]">Estimator</span>
          </h2>
          <CarCalculator />
        </div>
      </section>

      {/* 📑 DOCUMENTS & BENEFITS */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">
          {/* Documents */}
          <div className="bg-[#FFF4E5] rounded-[3rem] p-10 border border-orange-100 shadow-sm" data-aos="fade-right">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-orange-100 rounded-2xl text-[#FF7819]">
                <FileText size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black">Docs Required</h3>
            </div>
            <ul className="space-y-4">
              {[
                "RC (Registration Certificate)",
                "Identity Proof (Aadhar, PAN)",
                "Address Proof (License, Bills)",
                "Valid Driving License",
                "Previous Policy Copy",
                "Passport Photographs",
              ].map((doc, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-700">
                  <CheckCircle className="text-[#FF7819]" size={20} /> {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-[#08101E] rounded-[3rem] p-10 text-white shadow-2xl" data-aos="fade-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-white/10 rounded-2xl text-[#FF7819]">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[#FF7819]">Core Benefits</h3>
            </div>
            <ul className="space-y-4">
              {[
                "Financial coverage for repairs",
                "Cashless network globally",
                "Theft & fire protection",
                "Personal accident cover",
                "Third-party liability cover",
                "Peace of mind driving",
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-lg font-medium text-gray-300">
                  <CheckCircle size={20} className="text-[#FF7819]" /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 🛤️ HOW TO GET INSURED */}
      <section className="py-24 px-6 bg-[#FFF4E5]/50 text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-black mb-16">
          Get Insured In <span className="text-[#FF7819]">Minutes</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {["Choose Plan", "Enter Vehicle Details", "Pay Premium", "Download Policy"].map((step, idx) => (
            <div key={idx} className="relative group" data-aos="zoom-in">
              <div className="bg-white rounded-[2rem] p-8 h-full border border-gray-100 shadow-xl hover:bg-[#08101E] hover:text-white transition-all duration-500">
                <div className="text-4xl font-black text-[#FF7819]/20 mb-4 group-hover:text-[#FF7819]">0{idx + 1}</div>
                <p className="font-black text-lg leading-tight">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 COMPARISON SECTION (Coming Soon / Onboarding) */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden" data-aos="fade-up">
        {/* Glowing Background Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF7819]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-[#FF7819]/10 border border-[#FF7819]/25 rounded-full backdrop-blur-md shadow-lg select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF7819] animate-ping" />
            <span className="text-xs font-black tracking-widest text-[#FF7819] uppercase">Feature Under Development</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            Compare & Choose the <span className="text-[#FF7819]">Best Plans</span>
          </h2>
          <p className="text-gray-500 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
            We are building a robust integration network to let you seamlessly compare policy benefits, pricing, and claims networks side-by-side.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative z-10">
          {[
            {
              title: "Comprehensive Coverage",
              desc: "Compare plan features including own damage, personal accident, and third-party liabilities side-by-side.",
              icon: <ShieldCheck className="text-[#FF7819]" size={36} />,
              tag: "Coming Soon"
            },
            {
              title: "Smart Premium Engine",
              desc: "Get automated premium quotes customized for your vehicle's age, make, model, and history.",
              icon: <Zap className="text-[#FF7819]" size={36} />,
              tag: "Under Development"
            },
            {
              title: "Cashless Network Mapper",
              desc: "Quickly check which policies support cashless repairs at garages near your location.",
              icon: <FileText className="text-[#FF7819]" size={36} />,
              tag: "Coming Soon"
            }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100/80 p-8 md:p-10 text-center flex flex-col justify-between group transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative side color stripe */}
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-[#FF7819]/45 to-transparent" />
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-[#FFF4E5] rounded-[1.5rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>

                <span className="inline-flex items-center gap-1.5 text-[10px] font-black text-[#FF7819] bg-[#FF7819]/10 px-3 py-1 rounded-full border border-[#FF7819]/15 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF7819] animate-pulse" />
                  {feature.tag}
                </span>

                <h3 className="text-xl font-black mb-4 group-hover:text-[#FF7819] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                  {feature.desc}
                </p>
              </div>

              <div>
                <button className="w-full bg-[#08101E] text-white hover:bg-[#FF7819] px-6 py-3.5 rounded-2xl font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_10px_20px_rgba(8,16,30,0.15)] hover:shadow-[0_10px_25px_rgba(255,120,25,0.3)]">
                  Get Notified
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic bottom banner */}
        <div className="mt-16 text-center z-10 relative">
          <div className="inline-block bg-white/60 backdrop-blur-md rounded-[2rem] border border-gray-100 px-8 py-5 shadow-xl max-w-2xl mx-auto">
            <p className="text-sm font-bold text-gray-500">
              ⚡ Stay tuned! Our smart quote matching engine goes live soon.
            </p>
          </div>
        </div>
      </section>

      {/* 📣 FINAL CTA */}
      <section className="py-28 px-6 text-center bg-[#08101E] relative overflow-hidden m-4 rounded-[4rem]">
        <div className="absolute inset-0 bg-[#FF7819] opacity-5 pointer-events-none" />
        <div className="relative z-10" data-aos="fade-up">
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
            Secure Your Car Today
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Get peace of mind while driving. Choose a plan that fits your needs 
            and protect your vehicle with our elite coverage.
          </p>
          <a
            href="/apply-insurance"
            className="inline-flex items-center gap-4 bg-[#FF7819] text-white px-12 py-5 rounded-[2rem] font-black text-xl shadow-[0_20px_40px_rgba(255,120,25,0.3)] transition-all"
          >
            Start Protection Now <ArrowRight />
          </a>
        </div>
      </section>
    </main>
  );
}
