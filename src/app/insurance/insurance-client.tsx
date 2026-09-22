"use client";

import { motion } from "framer-motion";
import { Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import health from "../../animations/health.json";
import car from "../../animations/Car1.json";
import home from "../../animations/Home1.json";
import aeroplane from "../../animations/AeroplaneFlying.json";
import bike from "../../animations/Bike Riding.json";
import family from "../../animations/family.json";
import Link from "next/link";
import { useState } from "react";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

const insuranceCards = [
  {
    title: "Health Insurance",
    badge: "FREE Home Visit",
    badgeColor: "bg-orange-100 text-orange-600",
    lottie: health,
    link: "/insurance/health",
  },
  {
    title: "Car Insurance",
    badge: "Upto 25% Discount",
    badgeColor: "bg-blue-100 text-blue-600",
    lottie: car,
    link: "/insurance/car",
  },
  {
    title: "Home Insurance",
    badge: "Maximum Security",
    badgeColor: "bg-purple-100 text-purple-600",
    lottie: home,
    link: "/insurance/home",
  },
  {
    title: "Travel Insurance",
    badge: "Global Cover",
    badgeColor: "bg-sky-100 text-sky-600",
    lottie: aeroplane,
    link: "/insurance/travel",
  },
  {
    title: "Life Insurance",
    badge: "Secure Family",
    badgeColor: "bg-red-100 text-red-600",
    lottie: family,
    link: "/insurance/life",
  },
  {
    title: "Two Wheeler Insurance",
    badge: "Digital Policy",
    badgeColor: "bg-emerald-100 text-emerald-600",
    lottie: bike,
    link: "/insurance/two-wheeler",
  },
];

export default function InsurancePage() {
  const [activeTab, setActiveTab] = useState("Health Insurance");

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] overflow-x-hidden font-sans">
      
      {/* 🚀 Premium Hero Section */}
      <section className="relative bg-[#08101E] text-white pt-32 pb-20 px-6 overflow-hidden">
        {/* Animated Background Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF7819]/10 rounded-full blur-[120px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -ml-24 -mb-24" />

        <div className="relative max-w-7xl mx-auto flex flex-col items-center text-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-6 py-2 mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl"
          >
            <Clock className="w-5 h-5 text-[#FF7819] animate-pulse" />
            <span className="text-sm font-black tracking-widest text-[#FF7819] uppercase">
              Product Launching Soon
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter">
            Secure Your Future <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] to-[#FFB076]">
              Without Compromise
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10 font-medium px-4">
            Protect yourself and your loved ones with flexible, reliable, and
            comprehensive insurance solutions designed for the modern era.
          </p>
        </div>
      </section>

      {/* 💎 3D Bento Grid Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto -mt-16 relative z-20">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="text-left">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#08101E]">
              Insurance <span className="text-[#FF7819]">Portfolio</span>
            </h2>
            <p className="text-gray-500 mt-2 font-medium">Choose from our top-tier protection plans.</p>
          </div>
        </div>

        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceCards.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              <Link href={item.link}>
                <div className="h-full bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(255,120,25,0.1)] group-hover:border-[#FF7819]/20 flex flex-col items-center">
                  
                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                     <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* 3D Lottie Player Wrapper */}
                  <div className="w-40 h-40 flex items-center justify-center bg-[#FFF4E5] rounded-full mb-6 group-hover:scale-110 transition-transform duration-500 overflow-hidden">
                    <Player
                      autoplay
                      loop
                      src={item.lottie}
                      style={{ height: "120px", width: "120px" }}
                    />
                  </div>

                  <div className="text-center w-full">
                    <h3 className="text-2xl font-black text-[#08101E] mb-2 group-hover:text-[#FF7819] transition-colors">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-gray-400 font-bold text-sm">
                      Learn More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📣 Modern Call to Action */}
      <section className="py-24 px-6 relative">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[3.5rem] p-10 md:p-20 bg-[#08101E] text-center text-white relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

          <div className="relative z-10">
            <ShieldCheck className="w-16 h-16 text-[#FF7819] mx-auto mb-8" />
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">
              Get Insured Today
            </h2>
            <p className="mb-12 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-medium">
              Start your journey to a safer tomorrow. Choose the right plan for
              your needs and secure peace of mind for your family.
            </p>
            
            <Link
              href="/insurance"
              className="inline-flex items-center gap-4 bg-[#FF7819] text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#E65C00] transition-all shadow-[0_20px_40px_rgba(255,120,25,0.3)]"
            >
              Apply for Insurance Portfolio
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
