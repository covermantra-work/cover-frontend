"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, Sparkles, Percent, ShieldCheck, Calculator, AlertTriangle } from "lucide-react";

interface SeoLink {
  name: string;
  href: string;
  desc?: string;
  comingSoon?: boolean;
}

interface SeoSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  links: SeoLink[];
}

export default function SeoFooter() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const sections: SeoSection[] = [
    {
      id: "loans",
      title: "Popular Loan Services",
      icon: Percent,
      links: [
        { name: "Apply for Personal Loan", href: "/personal-loans", desc: "Unsecured instant personal loans", comingSoon: false },
        { name: "Business Growth Loan", href: "/business-loans", desc: "Collateral-free business finance", comingSoon: false },
        { name: "Home Loan Solutions", href: "/home-loans", desc: "Affordable home financing", comingSoon: true },
        { name: "Education & Career Loan", href: "/education-loans", desc: "Finance your higher education", comingSoon: true },
        { name: "Gold Loan Schemes", href: "/gold-loans", desc: "Quick loan against gold ornaments", comingSoon: true },
        { name: "Loan Against Property", href: "/loans-against-property", desc: "Unlock value from your property", comingSoon: true },
      ],
    },
    {
      id: "insurance",
      title: "Insurance Policies",
      icon: ShieldCheck,
      links: [
        { name: "Family Health Insurance", href: "/insurance/health", desc: "Cashless hospitalization & coverage", comingSoon: true },
        { name: "Term Life Insurance", href: "/insurance/life", desc: "Secure your family's future", comingSoon: true },
        { name: "Car Insurance Plans", href: "/insurance/car", desc: "Comprehensive & third-party damage", comingSoon: true },
        { name: "Two Wheeler Insurance", href: "/insurance/two-wheeler", desc: "Super-fast bike insurance quotes", comingSoon: true },
        { name: "International Travel Cover", href: "/insurance/travel", desc: "Hassle-free global trip protection", comingSoon: true },
        { name: "Home Protection Insurance", href: "/insurance/home", desc: "Safeguard property from natural disasters", comingSoon: true },
      ],
    },
    {
      id: "calculators",
      title: "Tools & Calculators",
      icon: Calculator,
      links: [
        { name: "Smart EMI Calculator", href: "/emi-calculator", desc: "Calculate your monthly loan payments", comingSoon: false },
        { name: "Eligibility Checker", href: "/quick-links", desc: "Check maximum loan eligibility in seconds", comingSoon: false },
        { name: "Loan Comparison Tool", href: "/quick-links", desc: "Compare interest rates & processing fees", comingSoon: false },
        { name: "Insurance Premium Estimator", href: "/insurance", desc: "Compare premium quotes online", comingSoon: true },
      ],
    },
  ];

  const popularCities = [
    "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Fatehabad", 
    "Pune", "Ahmedabad", "Jaipur", "Chandigarh", "Chennai"
  ];

  return (
    <div className="border-t border-white/10 pt-12 pb-8 w-full">
      {/* Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {sections.map((section) => {
          const isOpen = openSection === section.id;
          const IconComponent = section.icon;
          return (
            <div 
              key={section.id} 
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-[#FF690B]/5 group"
            >
              {/* Header */}
              <button
                onClick={() => toggle(section.id)}
                suppressHydrationWarning={true}
                className="w-full flex justify-between items-center text-left lg:pointer-events-none lg:cursor-default focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#FF690B]/10 rounded-xl text-[#FF690B] group-hover:scale-110 transition-transform duration-300">
                    <IconComponent size={20} />
                  </div>
                  <h4 className="text-base font-bold text-white tracking-wide">
                    {section.title}
                  </h4>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-[#FF690B] transition-transform duration-300 lg:hidden ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Links list */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden lg:block ${
                  isOpen 
                    ? "max-h-[500px] opacity-100 mt-5" 
                    : "max-h-0 opacity-0 lg:max-h-[500px] lg:opacity-100 lg:mt-5"
                }`}
              >
                <ul className="space-y-4 border-t border-white/5 pt-4">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="group/item">
                      <Link
                        href={link.href}
                        className="block focus:outline-none"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-white/80 group-hover/item:text-[#FF690B] transition-colors">
                            {link.name}
                          </span>
                          {link.comingSoon && (
                            <span className="text-[8px] font-bold px-1.5 py-0.5 bg-[#FF690B]/10 text-[#FF690B]/70 rounded-md border border-[#FF690B]/15 uppercase tracking-wide shrink-0">
                              Soon
                            </span>
                          )}
                        </div>
                        {link.desc && (
                          <span className="text-xs text-white/40 block mt-0.5 group-hover/item:text-white/60 transition-colors">
                            {link.desc}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info / Disclaimer Box */}
      <div className="mt-8 bg-amber-500/[0.02] border border-amber-500/10 rounded-2xl p-5 relative overflow-hidden">
        <div className="flex gap-3">
          <div className="p-2 bg-amber-500/10 rounded-xl text-amber-500 shrink-0 h-fit">
            <AlertTriangle size={18} />
          </div>
          <div>
            <h5 className="text-xs font-extrabold text-amber-500 tracking-wider uppercase">Important Information Note</h5>
            <p className="text-[11px] text-white/50 leading-relaxed mt-1.5">
              <strong>NOTE:</strong> All loan segments (except Personal Loans & Business Loans) and insurance policies listed on this page are for informational purposes only. CoverMantra does not currently facilitate, pursue, or provide any of these loan segments or insurance policies from any type of banks or lenders. These services are coming soon in the near future.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Cities / Presence Section */}
      <div className="mt-8 bg-white/[0.01] border border-white/5 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex items-center gap-2 text-white shrink-0">
            <Sparkles size={16} className="text-[#FF690B] animate-pulse" />
            <span className="text-sm font-bold uppercase tracking-wider text-white/90">Our Presence:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {popularCities.map((city, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-white/5 hover:bg-[#FF690B]/10 hover:text-[#FF690B] text-white/60 text-xs rounded-full border border-white/5 transition-all duration-300 cursor-default"
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
