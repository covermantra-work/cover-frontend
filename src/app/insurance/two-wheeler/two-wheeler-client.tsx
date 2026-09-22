"use client";

import { ShieldCheck, Wrench, Clock, CheckCircle, Heart, FileCheck, Star, Zap, Navigation, Award, ArrowRight } from "lucide-react";
import bike from "../../../animations/Bike Riding.json";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TwoWheeler from "../AllCalculators/TwoWheeler";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function TwoWheelerInsurancePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] overflow-x-hidden font-sans">
      
      {/* 🏍️ HERO SECTION: NEON VELOCITY */}
      <section className="relative bg-[#08101E] pt-28 pb-20 md:pt-40 md:pb-32 px-6 rounded-b-[4rem] md:rounded-b-[8rem] shadow-2xl">
        {/* Animated Background Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF7819]/10 rounded-full blur-[120px] animate-pulse" />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="w-full md:w-1/2 text-center md:text-left" data-aos="fade-right">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-sm font-bold">
                <Zap size={16} fill="currentColor" /> Complete Protection for Every Rider
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FF7819]/10 border border-[#FF7819]/25 rounded-full backdrop-blur-md shadow-lg select-none animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#FF7819]" />
                <span className="text-[10px] font-black tracking-widest text-[#FF7819] uppercase">Product Launching Soon</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
              Ride Hard. <br />
              <span className="text-[#FF7819]">Stay Protected.</span>
            </h1>
            <p className="mt-6 text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
              Premium coverage for your bike or scooter. Fast claims, zero paperwork, and total peace of mind on every turn.
            </p>
            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-[#FF7819] text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-[0_10px_30px_rgba(255,120,25,0.4)] transition-all transform hover:-translate-y-1">
                Get Covered Now
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                Check Plans
              </button>
            </div>
          </div>

          <div className="w-full md:w-1/2 flex justify-center" data-aos="zoom-in">
            <div className="relative">
              {/* 3D Container for Animation */}
              <div className="bg-gradient-to-br from-white/10 to-transparent p-4 rounded-[3rem] backdrop-blur-xl border border-white/10 shadow-2xl">
                <Player autoplay loop src={bike} style={{ height: "300px", width: "300px" }} />
              </div>
              {/* Floating Stats */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden md:block animate-bounce-slow">
                <p className="text-[10px] uppercase tracking-tighter font-bold text-gray-400">Claims Settled</p>
                <p className="text-2xl font-black text-[#08101E]">15k+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ RIDERS GRID */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase">Why Riders <span className="text-[#FF7819]">Trust Us</span></h2>
            <p className="text-gray-500 font-medium mt-2">Designed by riders, for riders.</p>
          </div>
          <div className="hidden md:block h-px flex-1 bg-gray-200 mx-10 mb-4" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck className="w-8 h-8" />, text: "Third-Party Liability", desc: "Covers legal liabilities to others." },
            { icon: <Heart className="w-8 h-8" />, text: "Accident Protection", desc: "Safety net for you and your pillion." },
            { icon: <Wrench className="w-8 h-8" />, text: "Cashless Repairs", desc: "5000+ network garages across India." },
            { icon: <FileCheck className="w-8 h-8" />, text: "Digital Policy", desc: "Policy in your inbox in 2 minutes." },
            { icon: <Clock className="w-8 h-8" />, text: "Quick Settlement", desc: "Hassle-free, rapid claim processing." },
            { icon: <Star className="w-8 h-8" />, text: "No Claim Bonus", desc: "Save more for every claim-free year." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl hover:bg-[#08101E] transition-all duration-500"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-16 h-16 bg-[#FFF4E5] rounded-2xl flex items-center justify-center text-[#FF7819] group-hover:bg-[#FF7819] group-hover:text-white transition-all mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold group-hover:text-white mb-2">{item.text}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 📊 CALCULATOR */}
      <section className="py-20 px-6 bg-[#08101E] rounded-[3rem] md:rounded-[6rem] mx-4 overflow-hidden relative">
        <div className="absolute top-0 right-0 p-10 opacity-5 text-white">
          <Navigation size={300} />
        </div>
        <div className="max-w-4xl mx-auto relative z-10" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-10">
            Calculate Your <span className="text-[#FF7819]">Premium</span>
          </h2>
          <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl p-2 md:p-6">
            <TwoWheeler />
          </div>
        </div>
      </section>

      {/* 📑 PLANS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black text-center mb-16 tracking-tighter">SELECT YOUR <span className="text-[#FF7819]">COVERAGE</span></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: "Third-Party", desc: "Legal mandatory cover for damage to others.", accent: "blue" },
            { title: "Comprehensive", desc: "All-in-one protection for you and your bike.", accent: "saffron", popular: true },
            { title: "Own Damage", desc: "Specifically covers repair costs for your vehicle.", accent: "blue" },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`relative bg-white rounded-[3rem] p-10 border-2 transition-all ${plan.popular ? 'border-[#FF7819] scale-105 shadow-2xl z-10' : 'border-gray-50 hover:border-gray-200 shadow-xl'}`}
              data-aos="flip-left"
              data-aos-delay={idx * 100}
            >
              {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FF7819] text-white px-6 py-1 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</span>}
              <h3 className="text-2xl font-black mb-4 uppercase italic">{plan.title}</h3>
              <p className="text-gray-500 mb-8 font-medium">{plan.desc}</p>
              <button className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.popular ? 'bg-[#FF7819] text-white shadow-lg' : 'bg-[#08101E] text-white'}`}>
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 📜 DOCS & BENEFITS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Documents Card */}
          <div className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-2xl border border-gray-50" data-aos="fade-right">
            <div className="flex items-center gap-4 mb-8">
              <Award className="text-[#FF7819]" size={32} />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Essentials</h2>
            </div>
            <div className="space-y-4">
              {[
                "Driving License", "Vehicle RC", "Previous Policy", 
                "ID Proof (Aadhaar/PAN)", "Address Proof"
              ].map((doc, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-[#FFF4E5] p-4 rounded-2xl font-bold text-[#08101E]/80">
                  <ShieldCheck className="text-[#FF7819]" size={20} /> {doc}
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Card */}
          <div className="bg-[#FF7819] rounded-[3.5rem] p-10 md:p-14 text-white shadow-2xl shadow-[#FF7819]/20" data-aos="fade-left">
            <div className="flex items-center gap-4 mb-8">
              <Star size={32} />
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">Perks</h2>
            </div>
            <div className="space-y-4">
              {[
                "Theft & Accident Shield", "Network Garage Access", "Zero-Paperwork Claims",
                "Pillion Rider Cover", "No Claim Bonus Rewards"
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl font-bold border border-white/10 backdrop-blur-sm">
                  <CheckCircle size={20} /> {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ HOW IT WORKS */}
      <section className="py-24 px-6 text-center bg-[#08101E] rounded-t-[4rem] md:rounded-t-[8rem]">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-16 italic uppercase tracking-tighter">Fast <span className="text-[#FF7819]">Lane</span> Process</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {["Pick Plan", "Bike Stats", "Pay Fast", "Get Policy"].map((step, idx) => (
            <div key={idx} className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-md group hover:bg-[#FF7819] transition-all duration-500 cursor-default" data-aos="fade-up" data-aos-delay={idx * 100}>
              <span className="text-4xl font-black text-[#FF7819] group-hover:text-white transition-colors">0{idx + 1}</span>
              <p className="text-white font-bold mt-4 text-sm uppercase tracking-wider">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-24 px-6 text-center bg-[#08101E]">
        <div className="max-w-4xl mx-auto" data-aos="zoom-in">
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic">Secure Your <span className="text-[#FF7819]">Ride</span> Today</h2>
          <p className="text-gray-400 mb-12 text-lg">
            Don't wait for a breakdown. Join 2 million+ riders who stay worry-free with our trusted protection.
          </p>
          <a
            href="/apply-insurance"
            className="group inline-flex items-center gap-4 bg-[#FF7819] text-white px-12 py-5 rounded-full font-black text-xl shadow-[0_20px_50px_rgba(255,120,25,0.4)] transition-all transform hover:scale-105"
          >
            Apply In Seconds <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  );
}
