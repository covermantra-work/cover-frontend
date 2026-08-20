'use client';

import React, { useEffect, useState } from 'react';

// Genuine and Realistic FinTech Market Statistics
const stats = [
  { label: 'Verified Users', value: 25000 },
  { label: 'App Downloads', value: 1000},
  { label: 'Financial Partners', value: 15 },
  { label: 'Customer Rating', value: 4.3, isRating: true },
];

export default function TrustSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    stats.forEach((stat, index) => {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
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
    <section className="bg-slate-50 pb-24 px-4 sm:px-8 md:px-10 font-sans antialiased">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Achievements Live Counter Box */}
        <div className="bg-gradient-to-br from-[#08101E] to-[#050811] text-white rounded-[3.5rem] shadow-2xl p-8 sm:p-12 md:p-16 relative overflow-hidden border border-white/5">
          {/* Glowing blobs inside container */}
          <div className="absolute top-[-50%] left-[-20%] w-[350px] h-[350px] bg-[#FF690B]/10 opacity-60 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[-50%] right-[-20%] w-[350px] h-[350px] bg-blue-500/10 opacity-40 blur-[100px] rounded-full pointer-events-none" />

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4">
              Your Trust, Our Achievements
            </h2>
            <div className="w-16 h-1 bg-[#FF690B] mx-auto rounded-full mb-4" />
            <p className="text-white/60 text-xs sm:text-sm font-bold uppercase tracking-widest">
              Real-time metrics backing our digital integrity
            </p>
          </div>

          {/* Core Numbers - Smart Mobile Wrapping Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {stats.map((item, idx) => (
              <div 
                key={idx} 
                className="text-center group flex flex-col justify-center"
              >
                <div className="text-3xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF690B] to-[#FFB900] mb-2 sm:mb-3 transition-all group-hover:scale-105 duration-300 tracking-tight">
                  {item.isRating 
                    ? `${counts[idx].toFixed(1)} ★` 
                    : counts[idx].toLocaleString("en-IN") + '+'}
                </div>
                <p className="text-white/60 font-bold text-xs sm:text-sm uppercase tracking-wider">
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