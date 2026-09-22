"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { ShieldCheck, Users, HeartPulse, CheckCircle, ArrowRight, Star, Fingerprint, Umbrella } from "lucide-react";
import life from "../../../animations/family.json";
import AOS from "aos";
import "aos/dist/aos.css";
import LifeCalculator from "../AllCalculators/LifeCalculator";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function LifeInsurancePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF7819] selection:text-white">
      
      {/* 🏰 HERO SECTION: THE GUARDIAN DESIGN */}
      <section className="relative bg-[#08101E] text-white pt-24 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden rounded-b-[3rem] md:rounded-b-[6rem] shadow-2xl">
        {/* Abstract 3D Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#FF7819]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-blue-600/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-3/5 text-center md:text-left" data-aos="fade-right">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF7819] text-sm font-bold">
                <Star size={16} fill="#FF7819" /> Rated #1 for Family Protection
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF7819]/10 border border-[#FF7819]/25 rounded-full backdrop-blur-md shadow-lg select-none animate-pulse">
                <span className="w-2 h-2 rounded-full bg-[#FF7819]" />
                <span className="text-[10px] font-black tracking-widest text-[#FF7819] uppercase">Product Launching Soon</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1]">
              Your Legacy Is <br />
              <span className="text-[#FF7819]">Our Priority.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-xl font-medium leading-relaxed">
              Life is unpredictable. Ensure your family’s standard of living stays the same, 
              no matter what the future holds.
            </p>
            <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="bg-[#FF7819] hover:bg-[#e66a12] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:shadow-[0_15px_30px_rgba(255,120,25,0.3)]">
                Explore Plans
              </button>
              <button className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all backdrop-blur-md">
                Contact Expert
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/5 flex justify-center relative" data-aos="zoom-in" data-aos-delay="200">
            <div className="relative z-10 bg-white/5 backdrop-blur-2xl p-6 rounded-[3rem] border border-white/10 shadow-2xl">
              <Player autoplay loop src={life} style={{ height: "320px", width: "320px" }} />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 hidden md:block animate-bounce-slow">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Payout Ratio</p>
              <p className="text-3xl font-black text-[#08101E]">99.8%</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🛡️ WHY CHOOSE US */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">
            Built To <span className="text-[#FF7819]">Protect</span>
          </h2>
          <p className="text-gray-500 font-medium">Industry-leading features for your peace of mind.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-10 h-10" />, text: "Family Financial Shield", desc: "Complete replacement of income for your loved ones." },
            { icon: <Users className="w-10 h-10" />, text: "Milestone Security", desc: "Fund your children's higher education & marriage plans." },
            { icon: <HeartPulse className="w-10 h-10" />, text: "Critical Wellness", desc: "Lump-sum payouts for serious medical conditions." },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:bg-[#08101E] transition-all duration-500 transform hover:-translate-y-2"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="w-20 h-20 bg-[#FFF4E5] rounded-3xl flex items-center justify-center text-[#FF7819] group-hover:bg-[#FF7819] group-hover:text-white transition-all duration-300 mb-8">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold group-hover:text-white mb-4 transition-colors">{item.text}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 leading-relaxed transition-colors">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🧮 CALCULATOR */}
      <section className="py-20 px-4 bg-[#08101E] rounded-[3rem] md:rounded-[5rem] mx-4 overflow-hidden relative" data-aos="fade-up">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7819]/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-12">
            Premium <span className="text-[#FF7819]">Estimator</span>
          </h2>
          <div className="bg-white rounded-[3rem] p-4 md:p-8 shadow-2xl">
            <LifeCalculator />
          </div>
        </div>
      </section>

      {/* 📄 DOCS & BENEFITS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Documents */}
          <div className="relative bg-white border border-gray-100 rounded-[3rem] p-8 md:p-12 shadow-xl overflow-hidden" data-aos="fade-right">
            <div className="absolute top-0 right-0 p-8 text-gray-50"><Fingerprint size={120} /></div>
            <h3 className="text-3xl font-black mb-8 text-[#08101E] relative z-10">Verification Kit</h3>
            <ul className="space-y-4 relative z-10">
              {[
                "Government ID (Aadhaar/PAN)", "Proof of Residence", "Income Statements", 
                "Medical Disclosure Reports", "Passport Credentials"
              ].map((doc, idx) => (
                <li key={idx} className="flex items-center gap-4 bg-gray-50 p-4 rounded-2xl font-bold text-gray-700">
                  <ShieldCheck className="text-[#FF7819]" size={22} /> {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-[#FF7819] rounded-[3rem] p-8 md:p-12 text-white shadow-2xl shadow-[#FF7819]/20 flex flex-col justify-between" data-aos="fade-left">
            <div>
              <Umbrella size={48} className="mb-6 opacity-80" />
              <h3 className="text-3xl font-black mb-8 italic">Policy Privileges</h3>
              <ul className="space-y-4">
                {[
                  "Immediate Family Security", "Tax Exemptions (80C)", "Critical Illness Shield", 
                  "Maturity Lump-sum Rewards", "Inflation-adjusted Payouts"
                ].map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl font-bold backdrop-blur-sm border border-white/10">
                    <CheckCircle className="text-white" size={22} /> {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ⚡ STEPS */}
      <section className="py-24 px-6 bg-[#08101E]/5 rounded-[3rem] md:rounded-[5rem] mx-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-16" data-aos="fade-up">3-Minute <span className="text-[#FF7819]">Process</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {["Select Plan", "Enter Info", "E-Payment", "Digital Policy"].map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-gray-100 flex flex-col items-center group hover:bg-[#08101E] transition-all duration-500" data-aos="zoom-in" data-aos-delay={idx * 150}>
              <div className="text-[#FF7819] text-5xl font-black mb-4 opacity-20 group-hover:opacity-100 transition-opacity italic">0{idx + 1}</div>
              <p className="font-black text-[#08101E] group-hover:text-white text-sm uppercase tracking-widest">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 FINAL CALL TO ACTION */}
      <section className="py-24 px-6 text-center" data-aos="fade-up">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#08101E] to-[#12203a] rounded-[4rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
          <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
            Don't Leave It To <span className="text-[#FF7819]">Chance.</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">
            Join over 5 million families who trust us with their future.
          </p>
          <a
            href="/apply-insurance"
            className="group inline-flex items-center gap-4 bg-[#FF7819] text-white px-10 py-5 rounded-3xl font-black text-xl hover:shadow-[0_20px_40px_rgba(255,120,25,0.4)] transition-all transform hover:scale-105"
          >
            Start Protection Today <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </a>
        </div>
      </section>
    </main>
  );
}
