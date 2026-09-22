"use client";

import dynamic from "next/dynamic";
import { Plane, HeartPulse, Wallet, ShieldCheck, Clock, CheckCircle, ArrowRight, Globe, Compass } from "lucide-react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import travel from "../../../animations/AeroplaneFlying.json";
import TravelCalculator from "../AllCalculators/TravelCalculator";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function TravelInsurancePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF7819] selection:text-white">
      
      {/* ✈️ HERO SECTION: CINEMATIC DARK MODE */}
      <section className="relative bg-[#08101E] text-white pt-32 pb-24 px-6 overflow-hidden rounded-b-[3rem] md:rounded-b-[5rem]">
        {/* Decorative Glows */}
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-[#FF7819]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center" data-aos="fade-down">
          <div className="mb-8 p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl transform hover:scale-105 transition-transform">
            <Player
              autoplay
              loop
              src={travel}
              style={{ height: "140px", width: "140px" }}
            />
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-[#FF7819]/10 border border-[#FF7819]/25 rounded-full backdrop-blur-md shadow-lg select-none animate-pulse">
            <span className="w-2 h-2 rounded-full bg-[#FF7819]" />
            <span className="text-[10px] font-black tracking-widest text-[#FF7819] uppercase">Product Launching Soon</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1.1] italic">
            Uncharted <span className="text-[#FF7819]">Safety</span> <br /> 
            For Global Citizens
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl font-medium">
            Elite protection for every mile of your journey. From lost passports to medical emergencies, we’ve got you covered globally.
          </p>
        </div>
      </section>

      {/* 🗺️ FEATURES */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
            Why <span className="text-[#FF7819]">Premium</span> Travel Cover?
          </h2>
          <div className="w-20 h-2 bg-[#FF7819] mx-auto rounded-full" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <HeartPulse />, text: "Emergency Medical Care", desc: "Best-in-class health support abroad.", aos: "fade-up" },
            { icon: <Wallet />, text: "Asset Protection", desc: "Coverage for baggage & vital docs.", aos: "fade-up" },
            { icon: <Plane />, text: "Logistical Shield", desc: "Flight delays & cancellation cover.", aos: "fade-up" },
            { icon: <ShieldCheck />, text: "Accident Indemnity", desc: "Highest tier personal accident cover.", aos: "fade-up" },
            { icon: <Globe />, text: "Borderless Support", desc: "Protection valid in 190+ countries.", aos: "fade-up" },
            { icon: <Clock />, text: "Priority Concierge", desc: "24/7 dedicated travel assistance.", aos: "fade-up" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:bg-[#08101E] transition-all duration-500"
              data-aos={item.aos}
              data-aos-delay={idx * 100}
            >
              <div className="w-16 h-16 bg-[#FFF4E5] rounded-2xl flex items-center justify-center text-[#FF7819] group-hover:bg-[#FF7819] group-hover:text-white transition-all duration-300 mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold group-hover:text-white mb-2">{item.text}</h3>
              <p className="text-gray-500 group-hover:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💎 PLANS */}
      <section className="py-24 px-6 bg-[#08101E] rounded-[3rem] md:rounded-[5rem] mx-4">
        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16">
          Elite <span className="text-[#FF7819]">Travel</span> Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { title: "Solo Voyager", desc: "Designed for independent explorers hitting domestic or foreign soils.", color: "border-blue-500/30" },
            { title: "Family Dynasty", desc: "One unified policy covering all family members with shared benefits.", color: "border-[#FF7819]/30" },
            { title: "Scholar Global", desc: "Tailored for students pursuing education in foreign universities.", color: "border-purple-500/30" },
            { title: "Corporate Elite", desc: "Fast-track claims and VIP support for business professionals.", color: "border-emerald-500/30" },
            { title: "Silver Voyager", desc: "Specialized medical attention and comfort for senior citizens.", color: "border-orange-500/30" },
            { title: "Custom Journey", desc: "Flexible protection built specifically for your unique itinerary.", color: "border-pink-500/30" },
          ].map((plan, idx) => (
            <div
              key={idx}
              className={`bg-white/5 backdrop-blur-md border ${plan.color} rounded-[2.5rem] p-8 hover:bg-white/10 transition-all flex flex-col justify-between group`}
              data-aos="zoom-in"
            >
              <div>
                <Compass className="text-[#FF7819] mb-6 w-10 h-10 group-hover:rotate-45 transition-transform duration-500" />
                <h3 className="text-2xl font-black text-white mb-4">{plan.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{plan.desc}</p>
              </div>
              <button className="w-full bg-white text-[#08101E] py-4 rounded-2xl font-black hover:bg-[#FF7819] hover:text-white transition-all flex items-center justify-center gap-2">
                Plan Details <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🧮 CALCULATOR */}
      <section className="py-24 px-4" data-aos="fade-up">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">Premium Estimator</h2>
            <p className="text-gray-500 font-medium">Calculate your protection costs online.</p>
          </div>
          <div className="bg-white rounded-[3rem] p-4 shadow-2xl border border-gray-100">
            <TravelCalculator />
          </div>
        </div>
      </section>

      {/* 📄 DOCS & BENEFITS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Documents */}
          <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-50" data-aos="fade-right">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <div className="p-3 bg-[#FFF4E5] rounded-2xl text-[#FF7819]"><ShieldCheck /></div>
              Onboarding Docs
            </h3>
            <ul className="grid gap-4">
              {[
                "Digital Passport Copy", "Verified Visa Records", "National ID (Aadhaar/PAN)", 
                "Trip Itinerary Details", "Existing Policy (Renewal)", "Recent Photographs"
              ].map((doc, i) => (
                <li key={i} className="flex items-center gap-4 font-bold text-[#08101E]/80 bg-gray-50 p-4 rounded-2xl">
                  <CheckCircle className="text-[#FF7819]" size={20} /> {doc}
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits */}
          <div className="bg-[#FF7819] rounded-[3rem] p-10 text-white shadow-2xl shadow-[#FF7819]/20" data-aos="fade-left">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-2xl text-white"><ArrowRight /></div>
              Core Benefits
            </h3>
            <ul className="grid gap-4">
              {[
                "Global Medical Sanctuary", "Trip Interruption Guard", "Baggage Recovery Suite", 
                "Accidental Disability Cover", "24x7 Global Concierge", "Full Digital Policy Issuance"
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-4 font-bold p-4 border border-white/20 rounded-2xl bg-white/5">
                  <CheckCircle className="text-white" size={20} /> {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 🏁 HOW TO GET COVERED */}
      <section className="py-24 px-6 bg-[#08101E]/5 text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-16" data-aos="fade-up">Getting <span className="text-[#FF7819]">Insured</span> Is Simple</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {["Pick Tier", "Log Itinerary", "Digital Pay", "Policy Active"].map((step, idx) => (
            <div key={idx} className="relative group" data-aos="zoom-in" data-aos-delay={idx * 150}>
              <div className="bg-white rounded-[2.5rem] p-10 h-full shadow-lg border border-gray-100 group-hover:bg-[#FF7819] transition-all duration-500">
                <span className="text-5xl font-black text-gray-100 group-hover:text-white/20 mb-6 block">0{idx + 1}</span>
                <p className="font-black text-[#08101E] group-hover:text-white uppercase tracking-widest text-xs">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-5xl mx-auto bg-[#08101E] rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,#FF7819_0%,transparent_70%)]" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter" data-aos="fade-up">
            The World Is <span className="text-[#FF7819]">Waiting.</span> <br /> Fly Worry-Free.
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto" data-aos="fade-up">
            Join 2 million+ travelers who explored the globe under our protection. 100% digital policy issuance in minutes.
          </p>
          <a
            href="/apply-insurance"
            className="inline-flex items-center gap-4 bg-[#FF7819] text-white px-12 py-5 rounded-full font-black text-xl hover:shadow-[0_20px_40px_rgba(255,120,25,0.4)] hover:scale-105 transition-all"
            data-aos="fade-up"
          >
            Get Protected Now <Plane size={24} />
          </a>
        </div>
      </section>
    </main>
  );
}
