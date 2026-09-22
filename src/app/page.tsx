import type { Metadata } from "next";
import Body from "./Components/Body";

export const metadata: Metadata = {
  title: "CoverMantra - Best Loan & Insurance Comparison Platform",
  description:
    "Compare and apply for the best personal loans, business loans, and insurance plans (health, life, car, and travel insurance policies) with CoverMantra. Get fast approval and paperless processing today!",
  alternates: {
    canonical: "https://www.covermantra.com",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "CoverMantra",
    "url": "https://www.covermantra.com",
    "logo": "https://www.covermantra.com/icon.png",
    "image": "https://www.covermantra.com/baseimage.png",
    "description": "Your trusted partner for loan aggregation, lender comparison, and insurance discovery. Find the best rates for personal loans, business loans, and insurance.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "First Floor Building No. 233, Thakar Basti, Bagichi Mohalla,Dharamshala road",
      "addressLocality": "Fatehabad",
      "addressRegion": "Haryana",
      "postalCode": "125050",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "telephone": "info@covermantra.in"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Body />
    </>
  );
}
