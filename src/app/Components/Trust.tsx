'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const stats = [
  { label: 'Verified Borrowers', value: 25000, suffix: '+' },
  { label: 'Mobile App Installs', value: 50000, suffix: '+' },
  { label: 'Regulated Lenders', value: 15, suffix: ' NBFCs' },
  { label: 'Average User Rating', value: 4.8, isRating: true, suffix: ' ★' },
];

export default function TrustSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2200;
      const increment = end / (duration / 30);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = stat.isRating
            ? parseFloat(start.toFixed(1))
            : Math.floor(start);
          return updated;
        });
      }, 30);
    });
  }, []);

  return (
    <section className="bg-slate-50/70 pb-24 px-4 sm:px-6 md:px-10 font-sans antialiased relative">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* 🌟 3D Obsidian Vault Card */}
        <div className="bg-gradient-to-br from-[#08101E] via-[#0D1829] to-[#050811] text-white rounded-[3.5rem] shadow-[0_35px_80px_rgba(0,0,0,0.45)] p-8 sm:p-12 md:p-16 relative overflow-hidden border-2 border-white/10">
          
          {/* Volumetric Studio Glows */}
          <div className="absolute top-[-40%] left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-amber-500/20 via-[#FF7819]/20 to-transparent opacity-70 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-30%] right-[-10%] w-[400px] h-[400px] bg-blue-500/15 opacity-50 blur-[110px] rounded-full pointer-events-none" />

          {/* Floating 3D Gold Coin Badge */}
          <motion.div
            animate={{ y: [0, -10, 0], rotate: [0, 6, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="hidden sm:flex absolute top-8 right-10 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_10px_25px_rgba(245,158,11,0.4)] items-center justify-center text-amber-950 font-black text-xl border-2 border-white/70 select-none pointer-events-none"
          >
            ₹
          </motion.div>

          <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full border border-white/15 mb-4 shadow-sm">
              <Sparkles size={14} className="text-[#FF7819]" />
              <span className="uppercase tracking-widest text-[10px] font-black text-[#FF7819]">
                Live Ecosystem Milestones
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-3">
              Your Financial Security, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#FFB900] to-[#FF8A33]">
                Proven by Numbers
              </span>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[#FF7819] to-amber-400 mx-auto rounded-full mb-3 shadow-[0_0_10px_rgba(255,120,25,0.5)]" />
            <p className="text-slate-400 text-xs sm:text-sm font-semibold">
              Real-time underwriting data verified across all connected lending partner nodes.
            </p>
          </div>

          {/* 3D Tactile Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {stats.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/[0.04] backdrop-blur-xl rounded-[2.2rem] p-5 sm:p-7 border border-white/10 hover:border-[#FF7819]/40 hover:bg-white/[0.07] transition-all duration-300 flex flex-col items-center justify-center text-center group"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] to-[#FFB900] mb-2 tracking-tight group-hover:scale-105 transition-transform duration-300">
                  {item.isRating 
                    ? `${counts[idx].toFixed(1)}${item.suffix}` 
                    : `${counts[idx].toLocaleString("en-IN")}${item.suffix}`}
                </div>
                <p className="text-slate-300 font-bold text-xs sm:text-xs uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}