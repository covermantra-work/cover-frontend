"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

// Update base URL if needed based on your environment
// const API_BASE_URL = "http://localhost:5001/api";

interface Partner {
  _id?: string;
  name: string;
  logo: string;
  link?: string;
  UTM?: string;
  priority?: number;
}

export default function OurPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  // Static fallback array to ensure page NEVER breaks
  const fallbackPartners: Partner[] = [
    {
      name: "Vivifi",
      logo: "https://www.vivifin.com/images/vivifi-logo.png",
      link: "https://www.vivifin.com/"
    },
    {
      name: "MoneyView",
      logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg",
      link: "https://moneyview.in/"
    },
    {
      name: "Zype",
      logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg",
      link: "https://zype.onelink.me/vx8a?af_xp=custom&pid=CustomerSource&af_dp=com.zype.mobile%3A%2F%2F&deep_link_value=myZype&af_click_lookback=30d&c=Spiraea"
    },
    {
      name: "FDPL Finance",
      logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
      link: "https://www.fdplfinance.com/"
    },
    {
      name: "Credify",
      logo: "https://loan.credittnow.com/favicon.ico",
      link: "https://loan.credittnow.com/"
    },
  ];

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        // const res = await axios.get(`${API_BASE_URL}/lenders`);
        const res = await api.get("/api/lenders");
        if (res.data && res.data.length > 0) {
          // Sort explicitly just in case
          const sorted = res.data.sort((a: Partner, b: Partner) => (a.priority || 0) - (b.priority || 0));
          setPartners(sorted);
        } else {
          setPartners(fallbackPartners);
        }
      } catch (error) {
        console.error("Failed to fetch lenders, falling back to static list", error);
        setPartners(fallbackPartners);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return (
    <section className="relative bg-[#FFF4E5] py-20 md:py-28 overflow-hidden">
      {/* Premium Decorative Accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF7819]/5 rounded-full blur-[100px] -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#08101E]/5 rounded-full blur-[120px] -ml-40 -mb-40" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 border border-[#FF7819]/20 bg-[#FF7819]/10 rounded-full"
          >
            <span className="text-[#FF7819] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Strategic Alliances
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-[#08101E] mb-6 tracking-tight"
          >
            Our Trusted <span className="text-[#FF7819]">Lending Partners</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#08101E]/60 text-base md:text-lg leading-relaxed font-medium"
          >
            Empowering your financial journey through our network of India's most 
            reliable and RBI-regulated financial institutions.
          </motion.p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {partners.map((partner, index) => (
            <motion.a
              key={index}
              href={partner.UTM || partner.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -12 }}
              className="group relative bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(8,16,30,0.04)] border border-white hover:border-[#FF7819]/30 transition-all duration-500 flex flex-col items-center justify-center overflow-hidden"
            >
              {/* Hover Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-[#FFF4E5] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Logo Container */}
              <div className="relative h-20 w-full flex items-center justify-center mb-8">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-full max-w-[85%] object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                />
              </div>

              {/* Partner Name & UI Decoration */}
              <div className="relative flex flex-col items-center">
                <span className="text-[#08101E] font-bold text-sm tracking-widest uppercase transition-colors duration-300">
                  {partner.name}
                </span>
                <div className="w-8 h-1 bg-[#FF7819] mt-3 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
              </div>

              {/* Decorative Corner Icon */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF7819" strokeWidth="3">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Bottom Verification Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3 px-6 py-3 bg-[#08101E] rounded-full shadow-xl">
            <div className="w-2 h-2 bg-[#FF7819] rounded-full animate-pulse" />
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              100% Secure & Regulated Entities
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}