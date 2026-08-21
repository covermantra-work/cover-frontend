"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Percent, ShieldCheck, Calculator, AlertTriangle } from "lucide-react";

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
    /*
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
    */
    {
      id: "calculators",
      title: "Tools & Calculators",
      icon: Calculator,
      links: [
        { name: "Smart EMI Calculator", href: "/emi-calculator", desc: "Calculate your monthly loan payments", comingSoon: false },
        { name: "Eligibility Checker", href: "/quick-links", desc: "Check maximum loan eligibility in seconds", comingSoon: false },
        { name: "Loan Comparison Tool", href: "/quick-links", desc: "Compare interest rates & processing fees", comingSoon: false },
      ],
    },
  ];

  const popularCities = [
    "Delhi NCR", "Mumbai", "Bengaluru", "Hyderabad", "Fatehabad", 
    "Pune", "Ahmedabad", "Jaipur", "Chandigarh", "Chennai"
  ];

  return (
    <div className="border-t border-white/10 pt-8 pb-4 w-full">
      {/* Sections Vertical Stack of Horizontal Rows */}
      <div className="flex flex-col gap-6">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <div 
              key={section.id} 
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 pb-6 border-b border-white/5 last:border-b-0"
            >
              {/* Header / Section Label */}
              <div className="flex items-center gap-2.5 shrink-0 sm:w-56 text-left">
                <div className="p-1.5 bg-[#FF690B]/10 rounded-xl text-[#FF690B] shrink-0">
                  <IconComponent size={16} />
                </div>
                <h4 className="text-xs font-black text-white tracking-wider uppercase">
                  {section.title}
                </h4>
              </div>

              {/* Links list - horizontal flex wrap */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs">
                {section.links.map((link, idx) => (
                  <React.Fragment key={idx}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 group/item focus:outline-none"
                    >
                      <span className="text-white/60 hover:text-[#FF690B] transition-colors font-semibold">
                        {link.name}
                      </span>
                      {link.comingSoon && (
                        <span className="text-[7px] font-bold px-1.5 py-0.2 bg-[#FF690B]/10 text-[#FF690B]/70 rounded-md border border-[#FF690B]/15 uppercase tracking-wide shrink-0 scale-90">
                          Soon
                        </span>
                      )}
                    </Link>
                    {idx < section.links.length - 1 && (
                      <span className="text-white/20 select-none font-light">•</span>
                    )}
                  </React.Fragment>
                ))}
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
