import type { Metadata } from "next";
import PersonalLoansPage from "./personal-loans-client";

export const metadata: Metadata = {
  title: "Personal Loans - Quick Approval & Low Interest Rates | CoverMantra",
  description:
    "Compare and apply for personal loans online with CoverMantra. Get quick approvals, lowest interest rates, paperless documentation, and flexible repayment terms from top banks and NBFCs.",
  keywords: [
    "Personal Loan",
    "Quick Loan Approval",
    "Low Interest Loans",
    "Paperless Personal Loan",
    "FlexSalary Vivifi",
    "FatakPay Loan",
    "Zype Personal Loan",
  ],
  alternates: {
    canonical: "https://www.covermantra.com/personal-loans",
  },
};

export default function Page() {
  return <PersonalLoansPage />;
}