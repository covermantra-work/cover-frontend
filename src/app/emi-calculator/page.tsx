import type { Metadata } from "next";
import EmiCalculatorClient from "@/app/emi-calculator/emi-calculator-client";

export const metadata: Metadata = {
  title: "Smart Loan EMI Calculator - CoverMantra",
  description:
    "Calculate your monthly EMI, principal amount, and total interest online with CoverMantra's smart loan EMI calculator.",
  alternates: {
    canonical: "https://www.covermantra.com/emi-calculator",
  },
};

export default function Page() {
  return <EmiCalculatorClient />;
}
