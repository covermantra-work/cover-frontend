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
    <section className="bg-[#FAF8F5] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-10 font-sans antialiased relative">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* 🏛️ Institutional Bank / Statutory Milestone Board */}
        <div className="bg-[#002140] text-white rounded-xl shadow-sm p-5 sm:p-8 relative overflow-hidden border border-[#00172e]">
          
          <div className="text-center mb-6 sm:mb-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-white/10 rounded-md border border-white/15 mb-2">
              <Sparkles size={12} className="text-[#FF7819]" />
              <span className="uppercase tracking-wider text-[10px] font-bold text-slate-200">
                Verified Platform Metrics
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-[28px] font-extrabold tracking-tight mb-1.5 text-white">
              Underwriting Volume & <span className="text-[#FF7819]">Borrower Trust</span>
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm font-normal max-w-xl mx-auto">
              Real-time platform metrics aggregated across our network of licensed NBFC & banking partners.
            </p>
          </div>

          {/* Institutional Metric Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 relative z-10">
            {stats.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white/5 rounded-xl p-4 sm:p-5 border border-white/10 hover:border-[#FF7819]/50 transition-colors flex flex-col items-center justify-center text-center"
              >
                <div className="text-2xl sm:text-3xl font-bold text-[#FF7819] mb-1 font-mono tracking-tight">
                  {item.isRating 
                    ? `${counts[idx].toFixed(1)}${item.suffix}` 
                    : `${counts[idx].toLocaleString("en-IN")}${item.suffix}`}
                </div>
                <p className="text-slate-300 text-xs font-medium">
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