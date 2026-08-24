import React from "react";
import LenderLandingClient from "./lender-landing-client";

// Hardcoded fallback configurations with rich marketing & SEO content
interface FallbackLender {
  id: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  pincodes: string[];
  UTM: string;
  applyLink: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  ratings: number;
  features: string[];
  brandColor: string;
  description: string;
  docsRequired: string[];
  faqs: Array<{ q: string; a: string }>;
}

const fallbackLenders: Record<string, FallbackLender> = {
  moneyview: {
    id: "m1",
    name: "MoneyView",
    logo: "https://moneyview.in/images/mv-green-logo-v3Compressed.svg",
    age: 20,
    minIncome: 20000,
    pincodes: ["125042", "125043", "125042", "125001"],
    UTM: "https://moneyview.in/personal-loan?utm_source=covermantra",
    applyLink: "/LenderAPI/moneyView",
    loanAmount: "Up to ₹5,00,000",
    interestRate: "Starting from 1.33% per month",
    processingFee: "Starting from 2% of the approved loan amount",
    ratings: 4.5,
    features: [
      "Direct bank transfer",
      "Paperless process",
      "Minimal documentation",
      "Flexible repayment tenures"
    ],
    brandColor: "#008248",
    description: "Get instant personal loans up to ₹5 Lakhs from MoneyView. Experience a completely digital, paperless process with minimal documentation, competitive interest rates, and flexible tenure options.",
    docsRequired: ["PAN Card", "Aadhaar Card (linked to Mobile)", "Salary Account Bank Statement (Last 3 Months)"],
    faqs: [
      { q: "What is the minimum monthly income required for MoneyView?", a: "The minimum monthly income required to qualify for a MoneyView personal loan is ₹20,000." },
      { q: "How long does it take for money to be disbursed?", a: "Once your application is approved and verified, the money is usually transferred directly to your bank account within a few hours." },
      { q: "Are there any prepayment charges?", a: "MoneyView has transparent rules regarding prepayments. You can check the detailed terms in the loan agreement during signing." }
    ]
  },
  zype: {
    id: "z1",
    name: "Zype",
    logo: "https://www.getzype.com/wp-content/uploads/2024/09/Zype_svg_black.svg",
    age: 20,
    minIncome: 18000,
    pincodes: ["125042", "123045", "100001", "125001"],
    UTM: "https://zype.onelink.me/vx8a?af_xp=custom&pid=CustomerSource&af_dp=com.zype.mobile%3A%2F%2F&deep_link_value=myZype&af_click_lookback=30d&c=Spiraea",
    applyLink: "/LenderAPI/zype",
    loanAmount: "Up to ₹3,00,000",
    interestRate: "Starting from 1.5% per month",
    processingFee: "Starting from 2% to 6% on every loan",
    ratings: 4.0,
    features: [
      "Quick disbursement",
      "Paperless process",
      "Low processing fee",
      "Instant approval",
      "No hidden charges",
      "24/7 customer support"
    ],
    brandColor: "#6c5ce7",
    description: "Access instant personal credit lines and loans up to ₹3 Lakhs from Zype. Make transfers or withdrawals instantly, enjoy an easy application process, and repay in simple monthly EMIs.",
    docsRequired: ["PAN Card", "Aadhaar Card", "Salary Account Statement (Last 3 Months)"],
    faqs: [
      { q: "What is the maximum loan limit in Zype?", a: "Zype offers instant credit lines and personal loans up to ₹3,00,000." },
      { q: "Can self-employed individuals apply?", a: "Currently, Zype prioritizes salaried individuals with a minimum income of ₹18,000." },
      { q: "Is the process 100% online?", a: "Yes, the Zype journey is 100% digital, requiring no physical documents." }
    ]
  },
  vivifi: {
    id: "v1",
    name: "FlexSalary (Vivifi)",
    logo: "https://www.vivifin.com/images/vivifi-logo.png",
    age: 21,
    minIncome: 15000,
    pincodes: ["*"],
    UTM: "https://online.flexsalary.com/CustomerLogin/Index?CampaignID=9192300#x",
    applyLink: "/LenderAPI/vivifi",
    loanAmount: "Up to ₹3,00,000",
    interestRate: "Starting from 1.5% per month",
    processingFee: "Starting from 2% of the approved loan amount",
    ratings: 4.2,
    features: [
      "Credit Line Facility",
      "Instant Disbursal",
      "Flexible Repayment",
      "No Fixed EMI",
      "Minimal Documentation",
      "24/7 support"
    ],
    brandColor: "#0984e3",
    description: "Get approved for a flexible credit line from FlexSalary (powered by Vivifi) up to ₹3 Lakhs. Access cash anytime, pay interest only on the amount you withdraw, and repay with highly flexible options.",
    docsRequired: ["Aadhaar Card", "PAN Card", "3 Months Bank Account Statement", "One Passport Photo / Selfie"],
    faqs: [
      { q: "What is a credit line?", a: "A credit line acts like an active credit reserve. You are approved for a limit (e.g., ₹2 Lakhs) and can withdraw any amount you need. You pay interest only on the utilized amount." },
      { q: "What is the minimum salary requirement for FlexSalary?", a: "FlexSalary requires a minimum monthly salary of ₹15,000." },
      { q: "Is there a pre-closure penalty?", a: "No, FlexSalary does not charge any pre-closure or prepayment penalties." }
    ]
  },
  fatakpay: {
    id: "f1",
    name: "FATAKPAY Loans",
    logo: "https://www.fdplfinance.com/assets/images/logo/FatakLoans.svg",
    age: 20,
    minIncome: 16000,
    pincodes: ["123042", "500001", "125042", "125001"],
    UTM: "https://web.fatakpay.com/authentication/login?utm_source=651_TT83W&utm_medium=covermantra",
    applyLink: "/LenderAPI/fatakPay",
    loanAmount: "Up to ₹2,00,000",
    interestRate: "Starting from 12% to 35.95% per month",
    processingFee: "Starting from 2.5% of the approved loan amount",
    ratings: 4.0,
    features: [
      "Quick disbursement",
      "Paperless process",
      "Low processing fee",
      "Instant approval",
      "No hidden charges",
      "24/7 customer support"
    ],
    brandColor: "#00b894",
    description: "FATAKPAY offers swift, hassle-free instant personal loans up to ₹2 Lakhs. Specially tailored for salaried employees, it features transparent rates, quick disbursal, and flexible tenure options.",
    docsRequired: ["PAN Card", "Aadhaar Card", "Salary Slip or Bank Statement showing salary credit"],
    faqs: [
      { q: "Who is eligible for FatakPay?", a: "Salaried individuals with a minimum age of 20 and monthly income starting from ₹16,000 are eligible." },
      { q: "Is a CIBIL score required for FatakPay?", a: "FatakPay looks at overall eligibility parameters, meaning even individuals with new or medium credit scores can get approved." }
    ]
  },
  credify: {
    id: "c1",
    name: "Credify",
    logo: "https://loan.credittnow.com/favicon.ico",
    age: 21,
    minIncome: 20000,
    pincodes: ["*", "!18", "!19", "!78", "!79"],
    UTM: "https://loan.credittnow.com/auth/login?utm_source=cover_mantra&utm_medium=website&utm_campaign=loan_campaign",
    applyLink: "/LenderAPI/credify",
    loanAmount: "₹8,000 to ₹35,000",
    interestRate: "Starting from 0.1% - 0.2% per day",
    processingFee: "Approximately 6% - 7% of the sanctioned loan amount",
    ratings: 4.3,
    features: [
      "Instant Approval & Disbursal within 15 min",
      "100% Digital Journey (Zero Paperwork)",
      "Min CIBIL: 680 (salary >= 30k) or 720 (salary 20k-30k)",
      "No Credit History / Prepayment Charges",
      "Salaried Only (Income >= 20k)",
      "Tenure: Up to 45 days (No EMI)"
    ],
    brandColor: "#d63031",
    description: "Credify offers instant short-term personal credit and micro-loans from ₹8,000 to ₹35,000. Enjoy immediate bank transfer, zero prepayment fees, and a transparent digital onboarding process.",
    docsRequired: ["PAN Card", "Aadhaar Card (Mobile Linked)", "Netbanking Credentials for Salary Verification"],
    faqs: [
      { q: "What is the repayment tenure for Credify?", a: "Credify offers short-term loans with a flexible tenure of up to 45 days (single payment, no EMIs)." },
      { q: "What are the credit score requirements?", a: "A minimum CIBIL score of 680 is required for salary >= ₹30,000, and 720 for salary between ₹20,000 and ₹30,000." }
    ]
  }
};

// Normalize key (e.g., moneyView/moneyView -> moneyview, fatakPay -> fatakpay)
function getLenderData(lenderId: string): FallbackLender | null {
  if (!lenderId) return null;
  const key = lenderId.toLowerCase();
  return fallbackLenders[key] || null;
}

// Generate dynamic metadata for Next.js App Router (supports both Next.js 13/14 and 15)
export async function generateMetadata({ params }: { params: any }) {
  const resolvedParams = await params;
  const lenderId = resolvedParams.lenderId;
  const lender = getLenderData(lenderId);

  if (!lender) {
    return {
      title: "Lender Services - CoverMantra",
      description: "Compare and apply for top instant personal loans and credit lines on CoverMantra."
    };
  }

  const title = lender.name === "FlexSalary (Vivifi)"
    ? "Apply for FlexSalary Vivifi Personal Credit Line - CoverMantra"
    : `Apply for ${lender.name} Personal Loan Online - CoverMantra`;

  return {
    title,
    description: lender.description,
    keywords: [
      `${lender.name} personal loan`,
      `${lender.name} apply online`,
      `${lender.name} interest rate`,
      `instant loan covermantra`,
      `${lender.name} eligibility`
    ],
    openGraph: {
      title,
      description: lender.description,
      images: [{ url: lender.logo }]
    }
  };
}

export default async function LenderPage({ params }: { params: any }) {
  const resolvedParams = await params;
  const lenderId = resolvedParams.lenderId;
  const lender = getLenderData(lenderId);

  if (!lender) {
    return (
      <div className="min-h-screen bg-[#FFF4E5] flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-3xl font-black text-[#08101E] mb-4">Lender Not Found</h1>
        <p className="text-gray-600 mb-6">The lender you are looking for is not configured in our system.</p>
        <a href="/" className="px-6 py-3 bg-[#FF7819] text-white font-bold rounded-xl shadow-md hover:bg-orange-600 transition-all">
          Go Back Home
        </a>
      </div>
    );
  }

  // Define JSON-LD FinancialProduct Schema
  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${lender.name} Personal Loan via CoverMantra`,
    "image": lender.logo,
    "description": lender.description,
    "provider": {
      "@type": "BankOrCreditUnion",
      "name": lender.name
    },
    "feesAndCommissionsSpecification": `Processing Fee: ${lender.processingFee}`,
    "interestRate": lender.interestRate
  };

  // Define JSON-LD FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": lender.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <>
      {/* Inject Structured Data (SEO JSON-LD Schemas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialProductSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Render Client-Side Component and pass dynamic configurations */}
      <LenderLandingClient lenderConfig={lender} />
    </>
  );
}
