"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { HiLightningBolt, HiChartBar, HiClipboardCheck } from "react-icons/hi";
import { FaRocket, FaBuilding, FaCity, FaTools, FaFileInvoiceDollar, FaChartLine } from "react-icons/fa";
import { Sparkles, ArrowRight } from "lucide-react";

export default function BusinessLoansPage() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <main className="min-h-screen bg-[#FFF4E5] text-[#08101E] font-sans selection:bg-[#FF7819]/30 overflow-x-hidden">

      {/* 🚀 HERO SECTION WITH 3D VOLUMETRIC STUDIO LIGHTING & FLOATING COINS */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#08101E] text-white py-24 px-4 pt-32">
        {/* 3D Volumetric Studio Lights */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-500/20 via-[#FF7819]/25 to-transparent rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-10 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

        {/* 🪙 Floating 3D Gold Coin 1 */}
        <motion.div
          animate={{ y: [0, -14, 0], rotate: [0, 8, -4, 0] }}
          transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
          className="hidden lg:flex absolute top-32 left-12 xl:left-24 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_35px_rgba(245,158,11,0.4)] items-center justify-center text-amber-950 font-black text-2xl border-2 border-white/70 select-none pointer-events-none z-20"
        >
          ₹
        </motion.div>

        {/* 🪙 Floating 3D Gold Coin 2 */}
        <motion.div
          animate={{ y: [0, 14, 0], rotate: [0, -8, 6, 0] }}
          transition={{ repeat: Infinity, duration: 4.8, ease: "easeInOut", delay: 0.4 }}
          className="hidden lg:flex absolute bottom-20 right-10 xl:right-24 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_30px_rgba(245,158,11,0.35)] items-center justify-center text-amber-950 font-black text-xl border-2 border-white/70 select-none pointer-events-none z-20"
        >
          ₹
        </motion.div>

        <div className="relative max-w-6xl mx-auto text-center z-10">
          {/* COMING SOON Badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 px-5 py-2 mb-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_0_25px_rgba(255,120,25,0.3)]"
          >
            <Sparkles size={14} className="text-[#FF7819]" />
            <span className="text-xs font-black tracking-[0.2em] text-[#FF7819] uppercase">
              Fast-Track Enterprise Capital
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.1] tracking-tighter">
            Empower Your Business with <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFB900] to-[#FF8A33]">
              Flexible Funding
            </span>
          </h1>

          <p className="text-base md:text-xl mb-16 text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
            Tailored loan solutions for Startups, MSMEs, and Enterprises. <br className="hidden md:block"/>
            Faster digital approvals. Competitive interest rates. Zero hassle.
          </p>

          {/* Target Cards 3D Row */}
          <div className="grid gap-6 md:grid-cols-3 text-left">
            {[
              { icon: <FaRocket />, title: "For Startups", desc: "Instant working capital and seed-stage funds to build, hire, and scale your product." },
              { icon: <FaBuilding />, title: "For SMEs", desc: "Grow your business with inventory, machinery, marketing, and team expansion loans." },
              { icon: <FaCity />, title: "For Enterprises", desc: "Large-scale credit lines with customized tenure, competitive APR, and dedicated support." },
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white/[0.04] backdrop-blur-2xl p-8 rounded-[2.8rem] border-2 border-white/10 hover:border-[#FF7819]/50 hover:bg-white/[0.07] transition-all duration-300 shadow-2xl group"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF7819] to-[#E65C00] flex items-center justify-center text-white text-2xl mb-6 shadow-[0_8px_20px_rgba(234,88,12,0.4)] group-hover:scale-110 transition-transform">
                  {card.icon}
                </div>
                <h3 className="text-xl font-black text-white mb-3 tracking-tight">{card.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-medium">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📖 EDUCATIONAL SECTION */}
      <section className="py-24 px-4 max-w-4xl mx-auto text-center" data-aos="fade-up">
        <h2 className="text-3xl md:text-5xl font-black mb-6 text-[#08101E] tracking-tight">
          What is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] to-[#E65C00]">Business Loan?</span>
        </h2>
        <div className="w-20 h-1.5 bg-[#FF7819] mx-auto rounded-full mb-8 shadow-sm" />
        <p className="text-[#08101E]/70 text-base md:text-lg leading-relaxed font-semibold">
          A business loan provides financial support for growth, working capital, commercial expansion,
          equipment purchase, or other operational needs. Whether you're launching a venture or taking an established
          business to the next stage, our digital loan solutions fuel your vision with total transparency.
        </p>
      </section>

      {/* 💎 TYPES SECTION - 3D CLAYMORPHIC CARDS */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#08101E] tracking-tight">
              Types of <span className="text-[#FF7819]">Business Loans</span>
            </h2>
            <p className="text-slate-500 font-semibold text-sm mt-3">Tailored financial vehicles matched to your operational needs</p>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <FaTools />, title: "Working Capital Loans", desc: "Short-term funds to balance seasonal cash flows, vendor payments, and daily overheads." },
              { icon: <FaRocket />, title: "Startup Seed Loans", desc: "Collateral-free capital designed to help registered startups scale early traction." },
              { icon: <FaBuilding />, title: "Equipment Financing", desc: "Specialized asset-backed financing to purchase modern heavy machinery or technology." },
              { icon: <FaFileInvoiceDollar />, title: "Invoice Discounting", desc: "Unlock immediate liquidity by converting verified pending client invoices into cash." },
              { icon: <FaChartLine />, title: "Term Growth Loans", desc: "Long-term structured growth funding with predictable monthly repayment schedules." },
              { icon: <HiChartBar />, title: "Revolving Credit Line", desc: "Draw funds as you need them and pay interest strictly on the utilized amount." },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.02 }}
                className="p-8 bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/90 rounded-[2.8rem] border-4 border-white shadow-[0_20px_50px_-15px_rgba(255,120,25,0.12),0_10px_25px_rgba(0,0,0,0.04),inset_0_3px_6px_rgba(255,255,255,1)] hover:border-[#FF7819]/40 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#FF7819]/10 flex items-center justify-center text-[#FF7819] mb-6 group-hover:bg-[#FF7819] group-hover:text-white transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-3 text-[#08101E] tracking-tight">{item.title}</h3>
                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🏆 WHY CHOOSE US */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center text-[#08101E] tracking-tight">
          Why Choose Our <span className="text-[#FF7819]">Business Loans?</span>
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              icon: <HiLightningBolt />,
              title: "Fast Disbursal",
              desc: "Automated underwriting algorithms ensure rapid decisions and swift capital deployment.",
            },
            {
              icon: <HiChartBar />,
              title: "Custom Loan Plans",
              desc: "Flexible tenure and repayment terms crafted to match your business revenue cycles.",
            },
            {
              icon: <HiClipboardCheck />,
              title: "Minimal Documentation",
              desc: "Digitally upload bank statements and GST filings with zero physical branch visits.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="relative p-10 bg-[#08101E] rounded-[3rem] text-center group overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#FF7819]/15 rounded-full blur-3xl group-hover:bg-[#FF7819]/25 transition-all" />
              <div className="relative z-10">
                <div className="text-5xl text-[#FF7819] flex justify-center mb-6">{item.icon}</div>
                <h3 className="text-2xl font-black mb-4 text-white tracking-tight">{item.title}</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 📣 3D CANDY CTA SECTION */}
      <section className="py-20 px-4 sm:px-6">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="max-w-6xl mx-auto rounded-[3.5rem] md:rounded-[4.5rem] p-10 md:p-20 bg-gradient-to-br from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-center text-white shadow-[0_30px_70px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.4)] border-4 border-white/20 relative overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-48 md:w-80 h-48 md:h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-6 relative z-10 tracking-tight">
            Ready to Accelerate Your Business?
          </h2>
          <p className="mb-10 text-base md:text-lg text-white font-semibold max-w-2xl mx-auto relative z-10 leading-relaxed">
            Apply today and unlock smart capital designed to help your enterprise thrive. 100% digital and transparent.
          </p>

          <motion.a
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 3 }}
            href="/contact"
            className="inline-flex items-center gap-3 bg-[#08101E] text-white px-10 py-4.5 rounded-2xl font-black text-sm uppercase tracking-wider shadow-[0_8px_0_#040810,0_20px_35px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.2)] active:shadow-[0_2px_0_#040810] transition-all relative z-10 cursor-pointer"
          >
            <span>Talk to a Loan Specialist</span>
            <ArrowRight size={18} className="text-[#FF7819]" />
          </motion.a>
        </motion.div>
      </section>

    </main>
  );
}
