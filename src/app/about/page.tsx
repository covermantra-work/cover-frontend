import type { Metadata } from "next";
import AboutPage from "./about-client";

export const metadata: Metadata = {
  title: "About Us | CoverMantra - Empowering Financial Technology",
  description:
    "Learn about CoverMantra's mission to bridge the gap between technology and finance. We provide cutting-edge fintech solutions, loan aggregation, and transparent lender comparison.",
  keywords: [
    "About CoverMantra",
    "Fintech India",
    "Loan Aggregator Mission",
    "CoverMantra Story",
    "Mandeep Phulia",
    "CoverMantra Team",
  ],
  alternates: {
    canonical: "https://www.covermantra.com/about",
  },
};

export default function Page() {
  return <AboutPage />;
}
// --kk