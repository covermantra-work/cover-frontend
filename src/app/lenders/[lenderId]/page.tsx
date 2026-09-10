import React from "react";
import LenderLandingClient from "./lender-landing-client";

// Hardcoded fallback configurations with rich marketing & SEO content
interface RepresentativeExample {
  loanAmount: string;
  tenure: string;
  interestRate: string;
  apr: string;
  processingFee: string;
  monthlyEmi: string;
  totalRepayment: string;
  totalCost: string;
}

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
  // Meta & RBI Policy Compliance Fields
  tenure?: string;
  minTenure?: string;
  maxTenure?: string;
  apr?: string;
  nbfcPartner?: string;
  representativeExample?: RepresentativeExample;
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
    tenure: "3 Months to 60 Months",
    minTenure: "91 Days (3 Months)",
    maxTenure: "60 Months",
    apr: "16% to 39% p.a.",
    nbfcPartner: "Whizdm Finance / DMI Finance (RBI-Registered NBFC Partners)",
    representativeExample: {
      loanAmount: "₹50,000",
      tenure: "12 Months",
      interestRate: "16% p.a.",
      apr: "18.5% p.a.",
      processingFee: "₹1,000 (2%) + ₹180 (GST) = ₹1,180",
      monthlyEmi: "₹4,537",
      totalRepayment: "₹54,444",
      totalCost: "₹5,624 (Interest: ₹4,444 + Processing Fee: ₹1,180)"
    },
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
    tenure: "3 Months to 12 Months",
    minTenure: "91 Days (3 Months)",
    maxTenure: "12 Months",
    apr: "18% to 36% p.a.",
    nbfcPartner: "RPN Fincap Private Limited (RBI-Registered NBFC)",
    representativeExample: {
      loanAmount: "₹20,000",
      tenure: "6 Months",
      interestRate: "18% p.a.",
      apr: "21% p.a.",
      processingFee: "₹500 (2.5%) + ₹90 (GST) = ₹590",
      monthlyEmi: "₹3,512",
      totalRepayment: "₹21,072",
      totalCost: "₹1,662"
    },
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
    tenure: "3 Months to 36 Months",
    minTenure: "91 Days (3 Months)",
    maxTenure: "36 Months",
    apr: "18% to 36% p.a.",
    nbfcPartner: "Vivifi India Finance Pvt Ltd (RBI-Registered NBFC)",
    representativeExample: {
      loanAmount: "₹30,000",
      tenure: "6 Months",
      interestRate: "18% p.a.",
      apr: "21.5% p.a.",
      processingFee: "₹600 (2%) + ₹108 (GST) = ₹708",
      monthlyEmi: "₹5,265",
      totalRepayment: "₹31,590",
      totalCost: "₹2,298"
    },
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
    interestRate: "Starting from 12% to 35.95% per annum",
    processingFee: "Starting from 2.5% of the approved loan amount",
    ratings: 4.0,
    tenure: "3 Months to 24 Months",
    minTenure: "91 Days (3 Months)",
    maxTenure: "24 Months",
    apr: "15% to 36% p.a.",
    nbfcPartner: "FDPL Finance Private Limited (RBI-Registered NBFC)",
    representativeExample: {
      loanAmount: "₹25,000",
      tenure: "6 Months",
      interestRate: "18% p.a.",
      apr: "21% p.a.",
      processingFee: "₹625 (2.5%) + ₹112 (GST) = ₹737",
      monthlyEmi: "₹4,387",
      totalRepayment: "₹26,322",
      totalCost: "₹2,059"
    },
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
    interestRate: "Starting from 0.2% - 0.3% per day (APR: 24% - 36% p.a.)",
    processingFee: "Approx. 4% - 6% + 18% GST (Deducted upfront at disbursement)",
    ratings: 4.3,
    tenure: "91 Days to 365 Days (3 to 12 Months)",
    minTenure: "91 Days (3 Months)",
    maxTenure: "365 Days (12 Months)",
    apr: "24% to 36% p.a.",
    nbfcPartner: "Datson Exports Ltd / CTPL (RBI-Registered NBFC Partner)",
    representativeExample: {
      loanAmount: "₹10,000",
      tenure: "3 Months (91 Days)",
      interestRate: "0.2% per day (Annualized APR: 24% p.a.)",
      apr: "24% to 36% p.a.",
      processingFee: "₹600 (6%) + ₹108 (18% GST) = ₹708 (Deducted at disbursement)",
      monthlyEmi: "₹3,467",
      totalRepayment: "₹10,400",
      totalCost: "₹1,108 (Interest: ₹400 + Processing Fee & GST: ₹708)"
    },
    features: [
      "Digital In-Principle Evaluation & Quick Disbursal",
      "Interest: Starting from 0.2% - 0.3% per day (APR: 24% - 36% p.a.)",
      "Zero Prepayment Penalty: Pay interest only for days utilized",
      "Processing fee deducted directly at bank disbursement",
      "Compliant Flexible Tenure: 91 Days to 365 Days (Manageable EMIs)",
      "Salaried Only (Income >= ₹20,000 | Min CIBIL: 680/720)"
    ],
    brandColor: "#d63031",
    description: "Credify (Creditt⁺) offers digital personal credit lines and loans from ₹8,000 to ₹35,000 in partnership with RBI-registered NBFCs. Benefit from flexible 91 to 365 days repayment tenure, daily rates starting at 0.2% - 0.3% per day (APR: 24% - 36%), no hidden charges, and zero prepayment penalties — pay interest only for the days you use the funds.",
    docsRequired: ["PAN Card", "Aadhaar Card (Mobile Linked for e-KYC)", "Netbanking Credentials / Salary Account Statement"],
    faqs: [
      {
        q: "What is the interest rate for Credify (Creditt⁺)?",
        a: "Interest rates start from 0.2% to 0.3% per day (equivalent to an Annual Percentage Rate of 24% to 36% per annum). The final rate is customized based on your credit score, net monthly salary, and risk assessment."
      },
      {
        q: "How and when is the processing fee charged?",
        a: "A nominal processing fee of 4% to 6% of the approved loan amount plus applicable 18% GST is deducted directly at the time of disbursement into your bank account. No upfront out-of-pocket payment is required."
      },
      {
        q: "Are there any prepayment charges if I close early?",
        a: "No, there are zero prepayment or foreclosure charges. You strictly pay interest only for the actual number of days you utilize the money. If you repay before tenure completion, your interest calculation stops on that exact day."
      },
      {
        q: "What is the repayment tenure for Credify?",
        a: "Credify offers flexible repayment tenures starting from a minimum of 91 days up to 365 days (3 to 12 months) with manageable monthly EMIs, fully compliant with RBI digital lending directives and advertising policies."
      },
      {
        q: "Which RBI-registered NBFC or Bank provides the loan?",
        a: "Loans are sanctioned and disbursed directly by RBI-registered NBFC partners (including Datson Exports Ltd / CTPL). CoverMantra operates strictly as a digital Lending Service Provider (LSP) and aggregator platform."
      },
      {
        q: "What are the eligibility and credit score requirements?",
        a: "Applicants must be salaried individuals aged 21+ with a minimum net monthly salary of ₹20,000. A minimum CIBIL score of 680 is required for salaries >= ₹30,000, and 720 for salaries between ₹20,000 and ₹30,000."
      }
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

  // Define JSON-LD FinancialProduct Schema with Meta & Google compliant financial fields
  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${lender.name} Personal Loan via CoverMantra`,
    "image": lender.logo,
    "description": lender.description,
    "provider": {
      "@type": "BankOrCreditUnion",
      "name": lender.nbfcPartner || lender.name
    },
    "feesAndCommissionsSpecification": `Processing Fee: ${lender.processingFee}`,
    "interestRate": lender.interestRate,
    "annualPercentageRate": lender.apr || "18% - 36%",
    "loanTerm": {
      "@type": "QuantitativeValue",
      "minValue": "91",
      "maxValue": "365",
      "unitCode": "DAY"
    }
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
