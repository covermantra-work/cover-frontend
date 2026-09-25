"use client";

import { useEffect, useState, useRef } from "react";
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  ChartConfiguration,
} from "chart.js";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useAuthStore";
import LoginModal from "./LoginModal";
import { 
  Calculator, 
  Calendar, 
  Percent, 
  Coins, 
  Wallet, 
  ChevronDown, 
  ChevronUp, 
  FileText,
  Sparkles,
  Info,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

// Register necessary elements for the Doughnut chart
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type LoanType = "personal" | "business" | "custom";

interface TabConfig {
  label: string;
  defaultAmount: number;
  minAmount: number;
  maxAmount: number;
  stepAmount: number;
  defaultInterest: number;
  minInterest: number;
  maxInterest: number;
  stepInterest: number;
  defaultTenure: number;
  minTenure: number;
  maxTenure: number;
  stepTenure: number;
  tenureType: "months";
}

const loanTabs: Record<LoanType, TabConfig> = {
  personal: {
    label: "Personal Loan",
    defaultAmount: 300000,
    minAmount: 10000,
    maxAmount: 2500000,
    stepAmount: 5000,
    defaultInterest: 11.5,
    minInterest: 8.0,
    maxInterest: 36.0,
    stepInterest: 0.1,
    defaultTenure: 36, // 3 years
    minTenure: 3,
    maxTenure: 60,
    stepTenure: 3,
    tenureType: "months",
  },
  business: {
    label: "Business Loan",
    defaultAmount: 500000,
    minAmount: 50000,
    maxAmount: 5000000,
    stepAmount: 10000,
    defaultInterest: 12.5,
    minInterest: 9.5,
    maxInterest: 30.0,
    stepInterest: 0.1,
    defaultTenure: 36, // 3 years
    minTenure: 6,
    maxTenure: 84,
    stepTenure: 6,
    tenureType: "months",
  },
  custom: {
    label: "Custom Calculator",
    defaultAmount: 200000,
    minAmount: 5000,
    maxAmount: 10000000,
    stepAmount: 5000,
    defaultInterest: 12.0,
    minInterest: 1.0,
    maxInterest: 48.0,
    stepInterest: 0.1,
    defaultTenure: 24, // 2 years
    minTenure: 1,
    maxTenure: 120,
    stepTenure: 1,
    tenureType: "months",
  },
};

interface ScheduleItem {
  period: number;
  startingBalance: number;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

interface LoanCalculatorProps {
  hideHeader?: boolean;
}

export default function LoanCalculator({ hideHeader = false }: LoanCalculatorProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<LoanType>("personal");
  const [loginOpen, setLoginOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isUserAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    setIsMounted(true);
    useAuthStore.getState().checkAuth();
  }, []);

  const handleApplyNow = () => {
    if (!isMounted) return;
    if (isUserAuthenticated) {
      router.push(activeTab === "business" ? "/business-loans" : "/personal-loans");
    } else {
      setLoginOpen(true);
    }
  };
  
  // Primary inputs (Personal Loan default)
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [interestRate, setInterestRate] = useState<number>(11.5);
  const [tenure, setTenure] = useState<number>(36); // in months

  // Formatted string values for direct input boxes
  const [amountInput, setAmountInput] = useState<string>("3,00,000");
  const [interestInput, setInterestInput] = useState<string>("11.5");
  const [tenureInput, setTenureInput] = useState<string>("36"); // visual unit (years/months)

  // Secondary/Affordability inputs
  const [monthlyIncome, setMonthlyIncome] = useState<number>(100000);
  const [incomeInput, setIncomeInput] = useState<string>("1,00,000");

  // Output states
  const [emi, setEmi] = useState<number>(0);
  const [interest, setInterest] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  // Amortization table states
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [scheduleType, setScheduleType] = useState<"yearly" | "monthly">("yearly");

  const chartRef = useRef<Chart | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Format Helper for Indian Rupees
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Convert pure number to locale string format without currency symbol
  const toINRString = (val: number) => {
    return val.toLocaleString("en-IN");
  };

  // Parse formatting back to regular float/integer
  const parseFormattedNumber = (valStr: string): number => {
    return Number(valStr.replace(/[^0-9.]/g, "")) || 0;
  };

  // Switch Tabs configuration
  const handleTabChange = (tab: LoanType) => {
    setActiveTab(tab);
    const config = loanTabs[tab];
    setLoanAmount(config.defaultAmount);
    setInterestRate(config.defaultInterest);
    setTenure(config.defaultTenure);

    setAmountInput(toINRString(config.defaultAmount));
    setInterestInput(config.defaultInterest.toString());
    setTenureInput(config.defaultTenure.toString());
  };

  // Sync Slider values to Text Inputs
  const handleAmountSliderChange = (val: number) => {
    setLoanAmount(val);
    setAmountInput(toINRString(val));
  };

  const handleInterestSliderChange = (val: number) => {
    setInterestRate(val);
    setInterestInput(val.toString());
  };

  const handleTenureSliderChange = (val: number) => {
    setTenure(val);
    setTenureInput(val.toString());
  };

  // Handle typed value changes
  const handleAmountInputChange = (valStr: string) => {
    const rawVal = parseFormattedNumber(valStr);
    setAmountInput(valStr.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // basic dynamic commas
    if (rawVal >= 0) {
      setLoanAmount(rawVal);
    }
  };

  const handleAmountInputBlur = () => {
    const config = loanTabs[activeTab];
    let finalVal = loanAmount;
    if (loanAmount < config.minAmount) finalVal = config.minAmount;
    if (loanAmount > config.maxAmount) finalVal = config.maxAmount;
    
    setLoanAmount(finalVal);
    setAmountInput(toINRString(finalVal));
  };

  const handleInterestInputChange = (valStr: string) => {
    setInterestInput(valStr);
    const rawVal = parseFloat(valStr);
    if (!isNaN(rawVal) && rawVal >= 0) {
      setInterestRate(rawVal);
    }
  };

  const handleInterestInputBlur = () => {
    const config = loanTabs[activeTab];
    let finalVal = interestRate;
    if (interestRate < config.minInterest) finalVal = config.minInterest;
    if (interestRate > config.maxInterest) finalVal = config.maxInterest;

    setInterestRate(finalVal);
    setInterestInput(finalVal.toFixed(1));
  };

  const handleTenureInputChange = (valStr: string) => {
    setTenureInput(valStr);
    const rawVal = parseInt(valStr, 10);
    if (!isNaN(rawVal) && rawVal > 0) {
      setTenure(rawVal);
    }
  };

  const handleTenureInputBlur = () => {
    const config = loanTabs[activeTab];
    let visualVal = parseInt(tenureInput, 10) || 0;
    
    if (visualVal < config.minTenure) visualVal = config.minTenure;
    if (visualVal > config.maxTenure) visualVal = config.maxTenure;

    setTenureInput(visualVal.toString());
    setTenure(visualVal);
  };

  const handleIncomeInputChange = (valStr: string) => {
    const rawVal = parseFormattedNumber(valStr);
    setIncomeInput(valStr.replace(/[^0-9]/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    if (rawVal >= 0) {
      setMonthlyIncome(rawVal);
    }
  };

  const handleIncomeInputBlur = () => {
    let finalVal = monthlyIncome;
    if (monthlyIncome < 5000) finalVal = 5000;
    if (monthlyIncome > 10000000) finalVal = 10000000;

    setMonthlyIncome(finalVal);
    setIncomeInput(toINRString(finalVal));
  };

  // Perform Calculations & Chart Generation
  useEffect(() => {
    const config = loanTabs[activeTab];
    // Ensure inputs are within bounds to avoid division by zero or negative rates
    const safeAmount = Math.max(1, loanAmount);
    const safeRate = Math.max(0.01, interestRate);
    const safeTenure = Math.max(1, tenure);

    const r = safeRate / (12 * 100); // monthly interest rate
    
    // Math: E = P * r * (1+r)^N / ((1+r)^N - 1)
    const emiCalc =
      (safeAmount * r * Math.pow(1 + r, safeTenure)) /
      (Math.pow(1 + r, safeTenure) - 1);

    const totalPayable = emiCalc * safeTenure;
    const totalInterest = totalPayable - safeAmount;

    setEmi(isNaN(emiCalc) ? 0 : emiCalc);
    setInterest(isNaN(totalInterest) || totalInterest < 0 ? 0 : totalInterest);
    setTotal(isNaN(totalPayable) ? 0 : totalPayable);

    // Destroy previous chart instance before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (canvasRef.current) {
      const chartConfig: ChartConfiguration<"doughnut", number[], string> = {
        type: "doughnut",
        data: {
          labels: ["Principal Amount", "Total Interest"],
          datasets: [
            {
              data: [safeAmount, Math.max(0, totalInterest)],
              backgroundColor: ["#002140", "#FF7819"],
              borderColor: "#ffffff",
              borderWidth: 4,
              hoverOffset: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: "75%",
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: "#002140",
              titleFont: { size: 13, family: "sans-serif", weight: "bold" },
              bodyFont: { size: 14, family: "sans-serif" },
              padding: 10,
              cornerRadius: 10,
              callbacks: {
                label: function (context) {
                  return ` ${context.label}: ${formatCurrency(context.raw as number)}`;
                }
              }
            },
          },
        },
      };

      chartRef.current = new Chart(canvasRef.current, chartConfig);
    }

    // Clean-up function to destroy chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [loanAmount, interestRate, tenure, activeTab]);

  // Generate Amortization Schedule Data
  const getScheduleData = (): ScheduleItem[] => {
    const data: ScheduleItem[] = [];
    let balance = loanAmount;
    const r = interestRate / (12 * 100);

    for (let m = 1; m <= tenure; m++) {
      const interestPaid = balance * r;
      let principalPaid = emi - interestPaid;

      if (balance < principalPaid || m === tenure) {
        principalPaid = balance;
      }

      const startingBalance = balance;
      const endingBalance = Math.max(0, balance - principalPaid);
      balance = endingBalance;

      data.push({
        period: m,
        startingBalance,
        emiPaid: emi,
        principalPaid,
        interestPaid,
        endingBalance,
      });

      if (endingBalance <= 0) break;
    }

    if (scheduleType === "monthly") {
      return data;
    }

    // Aggregate into Yearly intervals
    const yearlyData: ScheduleItem[] = [];
    let year = 1;
    let tempEmi = 0;
    let tempPrincipal = 0;
    let tempInterest = 0;
    let startBal = loanAmount;

    data.forEach((item, index) => {
      tempEmi += item.emiPaid;
      tempPrincipal += item.principalPaid;
      tempInterest += item.interestPaid;

      // Group every 12 months or at the end of schedule
      if ((index + 1) % 12 === 0 || index === data.length - 1) {
        yearlyData.push({
          period: year,
          startingBalance: startBal,
          emiPaid: tempEmi,
          principalPaid: tempPrincipal,
          interestPaid: tempInterest,
          endingBalance: item.endingBalance,
        });

        year++;
        startBal = item.endingBalance;
        tempEmi = 0;
        tempPrincipal = 0;
        tempInterest = 0;
      }
    });

    return yearlyData;
  };

  // Affordability metrics logic
  const emiPercentage = monthlyIncome > 0 ? (emi / monthlyIncome) * 100 : 0;
  let affordabilityLabel = "Highly Affordable";
  let affordabilityColor = "bg-green-500 text-white";
  let affordabilityBorder = "border-green-200 bg-green-50/50";
  let progressColor = "bg-green-500";

  if (emiPercentage > 50) {
    affordabilityLabel = "High Debt Load (Risky)";
    affordabilityColor = "bg-red-500 text-white";
    affordabilityBorder = "border-red-200 bg-red-50/50";
    progressColor = "bg-red-500";
  } else if (emiPercentage > 35) {
    affordabilityLabel = "Moderate (Stretch Budget)";
    affordabilityColor = "bg-amber-500 text-white";
    affordabilityBorder = "border-amber-200 bg-amber-50/50";
    progressColor = "bg-amber-500";
  }

  const currentConfig = loanTabs[activeTab];

  return (
    <section className="bg-transparent py-2 sm:py-4 font-sans antialiased">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Widget */}
        {!hideHeader && (
          <div className="text-center mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[#002140]/5 border border-[#002140]/10 text-[#002140] text-[9px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3 shadow-2xs">
              <Sparkles size={11} className="text-[#FF7819]" /> Smart Calculator
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[38px] font-black text-[#002140] mb-2 sm:mb-3 leading-[1.2] tracking-tight">
              Precision{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7819] via-[#e5670d] to-[#002140]">
                EMI Calculator
              </span>
            </h1>
            <p className="text-xs sm:text-sm md:text-[15px] text-[#002140]/75 leading-relaxed font-normal max-w-2xl mx-auto px-2">
              Plan your personal and business loans easily with interactive amortization tables, interest breakdowns, and budget checks.
            </p>
          </div>
        )}

        {/* Loan Type Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-[#E5E2DA] max-w-xl mx-auto shadow-2xs">
          {(Object.keys(loanTabs) as LoanType[]).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#002140] text-white shadow-sm"
                    : "text-[#002140]/70 hover:text-[#FF7819] hover:bg-[#FAF8F5]"
                }`}
              >
                {loanTabs[tab].label}
              </button>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* LEFT: SLIDERS & INPUTS */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            
            <div className="bg-white border border-[#E5E2DA] rounded-xl sm:rounded-2xl p-5 sm:p-7 shadow-2xs space-y-6">
              <h2 className="text-base sm:text-lg font-black text-[#002140] flex items-center gap-2 border-b border-[#E5E2DA] pb-3.5">
                <Calculator size={18} className="text-[#FF7819]" /> Configure Loan Details
              </h2>

              {/* LOAN AMOUNT */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-[#002140]/80 flex items-center gap-1.5">
                    <Coins size={14} className="text-[#FF7819]" /> Loan Amount
                  </label>
                  
                  {/* Dynamic formatted Input box */}
                  <div className="relative rounded-xl border border-[#E5E2DA] bg-[#FAF8F5] flex items-center px-3 max-w-[170px] focus-within:border-[#FF7819] transition-all">
                    <span className="text-xs font-bold text-gray-400 mr-1">₹</span>
                    <input
                      type="text"
                      value={amountInput}
                      onChange={(e) => handleAmountInputChange(e.target.value)}
                      onBlur={handleAmountInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#002140] outline-none py-1.5"
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min={currentConfig.minAmount}
                  max={currentConfig.maxAmount}
                  step={currentConfig.stepAmount}
                  value={loanAmount}
                  onChange={(e) => handleAmountSliderChange(Number(e.target.value))}
                  className="w-full accent-[#FF7819] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />
                
                <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-400 font-bold">
                  <span>₹{toINRString(currentConfig.minAmount)}</span>
                  <span>₹{toINRString(currentConfig.maxAmount)}</span>
                </div>
              </div>

              {/* INTEREST RATE */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-[#002140]/80 flex items-center gap-1.5">
                    <Percent size={14} className="text-[#FF7819]" /> Interest Rate (p.a)
                  </label>

                  <div className="relative rounded-xl border border-[#E5E2DA] bg-[#FAF8F5] flex items-center px-3 max-w-[100px] focus-within:border-[#FF7819] transition-all">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => handleInterestInputChange(e.target.value)}
                      onBlur={handleInterestInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#002140] outline-none py-1.5"
                    />
                    <span className="text-xs font-bold text-gray-400 ml-1">%</span>
                  </div>
                </div>

                <input
                  type="range"
                  min={currentConfig.minInterest}
                  max={currentConfig.maxInterest}
                  step={currentConfig.stepInterest}
                  value={interestRate}
                  onChange={(e) => handleInterestSliderChange(Number(e.target.value))}
                  className="w-full accent-[#FF7819] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-400 font-bold">
                  <span>{currentConfig.minInterest}%</span>
                  <span>{currentConfig.maxInterest}%</span>
                </div>
              </div>

              {/* TENURE */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-bold text-[#002140]/80 flex items-center gap-1.5">
                    <Calendar size={14} className="text-[#FF7819]" /> Loan Tenure
                  </label>

                  <div className="relative rounded-xl border border-[#E5E2DA] bg-[#FAF8F5] flex items-center px-3 max-w-[120px] focus-within:border-[#FF7819] transition-all">
                    <input
                      type="text"
                      value={tenureInput}
                      onChange={(e) => handleTenureInputChange(e.target.value)}
                      onBlur={handleTenureInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#002140] outline-none py-1.5"
                    />
                    <span className="text-xs font-bold text-gray-400 ml-1">
                      Mths
                    </span>
                  </div>
                </div>

                <input
                  type="range"
                  min={currentConfig.minTenure}
                  max={currentConfig.maxTenure}
                  step={currentConfig.stepTenure}
                  value={tenure}
                  onChange={(e) => handleTenureSliderChange(Number(e.target.value))}
                  className="w-full accent-[#FF7819] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />

                <div className="flex justify-between text-[10px] sm:text-[11px] text-gray-400 font-bold">
                  <span>{currentConfig.minTenure} Months</span>
                  <span>{currentConfig.maxTenure} Months ({Math.round(currentConfig.maxTenure / 12)} Yrs)</span>
                </div>

                {/* Mobile-Friendly Quick Tenure Preset Chips */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#002140]/50">
                      Quick Tenure Presets
                    </span>
                    <span className="text-[10px] font-semibold text-[#FF7819]">
                      Tap to select
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {[6, 12, 24, 36, 48, 60, 84].filter(m => m >= currentConfig.minTenure && m <= currentConfig.maxTenure).map((presetMonths) => {
                      const isSelected = tenure === presetMonths;
                      return (
                        <button
                          key={presetMonths}
                          type="button"
                          onClick={() => {
                            setTenure(presetMonths);
                            setTenureInput(presetMonths.toString());
                          }}
                          className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#002140] text-white shadow-2xs border border-[#002140]"
                              : "bg-[#FAF8F5] text-[#002140]/80 border border-[#E5E2DA] hover:border-[#FF7819] hover:text-[#FF7819]"
                          }`}
                        >
                          {presetMonths < 12 ? `${presetMonths} Mths` : `${presetMonths / 12} ${presetMonths === 12 ? 'Yr' : 'Yrs'}`}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

            </div>

            {/* BUDGET AFFORDABILITY SECTION */}
            <div className={`border rounded-xl sm:rounded-2xl p-5 sm:p-6 transition-all duration-300 bg-white ${affordabilityBorder} shadow-2xs`}>
              <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                <div>
                  <h3 className="text-sm sm:text-base font-black text-[#002140] flex items-center gap-1.5">
                    <Wallet size={16} className="text-[#FF7819]" /> Monthly Budget Check
                  </h3>
                  <p className="text-xs text-[#002140]/65 mt-0.5 leading-relaxed font-medium">
                    Ensure your Monthly EMI doesn&apos;t exceed 40-50% of your net monthly income.
                  </p>
                </div>

                {/* Badge indicator */}
                <span className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${affordabilityColor}`}>
                  {affordabilityLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                {/* Income text input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#002140]/75">Your Net Monthly Income</label>
                  <div className="relative rounded-xl border border-[#E5E2DA] bg-[#FAF8F5] flex items-center px-3 focus-within:border-[#FF7819] transition-all">
                    <span className="text-xs font-bold text-gray-400 mr-1">₹</span>
                    <input
                      type="text"
                      value={incomeInput}
                      onChange={(e) => handleIncomeInputChange(e.target.value)}
                      onBlur={handleIncomeInputBlur}
                      className="w-full bg-transparent font-mono font-bold text-sm text-[#002140] outline-none py-2"
                    />
                  </div>
                </div>

                {/* Visual Ratio breakdown */}
                <div className="space-y-1.5 sm:text-right">
                  <label className="text-xs font-bold text-[#002140]/75 block">EMI-to-Income Ratio</label>
                  <div className="font-mono text-base sm:text-lg font-black text-[#002140] py-1.5">
                    {emiPercentage.toFixed(1)}% <span className="text-xs font-medium text-[#002140]/50">of income</span>
                  </div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-[#E5E2DA]/60 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-full ${progressColor}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, emiPercentage)}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>

            </div>

          </div>

          {/* RIGHT: CHART & SUMMARY CARDS */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            
            {/* Visual Doughnut with dynamic centers */}
            <div className="bg-white border border-[#E5E2DA] rounded-xl sm:rounded-2xl p-6 sm:p-7 shadow-2xs flex flex-col items-center">
              
              <div className="relative w-[210px] h-[210px] sm:w-[230px] sm:h-[230px] flex items-center justify-center">
                <canvas ref={canvasRef} className="z-10" />
                
                {/* Visual Overlay inside Doughnut Hole */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none">
                  <span className="text-[10px] font-bold text-[#002140]/50 uppercase tracking-widest">Monthly EMI</span>
                  <span className="text-xl sm:text-2xl font-black text-[#002140] mt-1 tracking-tight">
                    {formatCurrency(emi)}
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Indicators */}
              <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 mt-6 border-t border-[#E5E2DA] pt-4 sm:pt-5">
                <div className="flex items-center gap-2 justify-center">
                  <span className="w-3 h-3 rounded bg-[#002140] shadow-2xs shrink-0" />
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold text-[#002140]/50 uppercase">Principal</p>
                    <p className="text-xs sm:text-sm font-black text-[#002140]">
                      {total > 0 ? ((loanAmount / total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center border-l border-[#E5E2DA]">
                  <span className="w-3 h-3 rounded bg-[#FF7819] shadow-2xs shrink-0" />
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-bold text-[#002140]/50 uppercase">Interest</p>
                    <p className="text-xs sm:text-sm font-black text-[#FF7819]">
                      {total > 0 ? ((interest / total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Metrics Payment Summary Docket - 30% Dark Anchor */}
            <div className="bg-gradient-to-br from-[#002140] via-[#00172e] to-[#000f20] border border-[#00386b] text-white rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-xl shadow-[#002140]/15 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xs sm:text-sm font-black tracking-wider text-[#FF7819] uppercase">
                  Payment Summary
                </h3>
                <span className="text-[10px] font-semibold text-white/50 uppercase tracking-widest">
                  Total Breakdown
                </span>
              </div>

              <div className="space-y-3 divide-y divide-white/10">
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-xs font-medium text-white/70">Principal Loan Amount</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-white">{formatCurrency(loanAmount)}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-medium text-white/70">Total Interest Payable</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[#FF7819]">{formatCurrency(interest)}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-bold text-white/90">Total Repayment Amount</span>
                  <span className="text-base sm:text-lg font-black font-mono text-white">{formatCurrency(total)}</span>
                </div>
              </div>

              {/* Bank-Grade Action Button to Apply with Login Modal */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleApplyNow}
                  className="w-full py-3 px-4 bg-[#FF7819] hover:bg-[#E65C00] text-white font-bold rounded-xl text-xs sm:text-sm tracking-wide shadow-md active:translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>{isMounted && isUserAuthenticated ? "APPLY FOR THIS LOAN" : "CHECK ELIGIBILITY & APPLY"}</span>
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[10px] text-white/60 text-center mt-2.5 font-medium">
                  <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                  <span>Instant Paperless Verification • Zero Hidden Fees</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM: COLLAPSIBLE AMORTIZATION SCHEDULE */}
        <div className="mt-8 sm:mt-10">
          <div className="bg-white border border-[#E5E2DA] rounded-xl sm:rounded-2xl shadow-2xs overflow-hidden">
            
            {/* Header Trigger */}
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#FAF8F5]/80 transition-colors focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#FF7819]/10 text-[#FF7819] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002140]">Amortization Schedule</h3>
                  <p className="text-xs text-[#002140]/65 mt-0.5 font-medium">
                    Detailed breakdown of your principal and interest components over time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-bold uppercase text-[#002140]/70 bg-[#FAF8F5] border border-[#E5E2DA] px-3 py-1 rounded-lg">
                  {showSchedule ? "Collapse" : "Expand"}
                </span>
                {showSchedule ? (
                  <ChevronUp size={20} className="text-[#002140]/60" />
                ) : (
                  <ChevronDown size={20} className="text-[#002140]/60" />
                )}
              </div>
            </button>

            {/* Interactive collapsible container */}
            <AnimatePresence>
              {showSchedule && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-4 sm:px-6 pb-6 sm:pb-8 border-t border-[#E5E2DA] pt-5 sm:pt-6">
                    
                    {/* View Controls (Yearly / Monthly toggle) */}
                    <div className="flex justify-between items-center mb-5 sm:mb-6 flex-wrap gap-3">
                      <div className="flex bg-[#FAF8F5] p-1 rounded-xl border border-[#E5E2DA]">
                        <button
                          onClick={() => setScheduleType("yearly")}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            scheduleType === "yearly"
                              ? "bg-[#002140] text-white shadow-2xs"
                              : "text-[#002140]/70 hover:text-[#FF7819]"
                          }`}
                        >
                          Yearly Breakdown
                        </button>
                        <button
                          onClick={() => setScheduleType("monthly")}
                          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            scheduleType === "monthly"
                              ? "bg-[#002140] text-white shadow-2xs"
                              : "text-[#002140]/70 hover:text-[#FF7819]"
                          }`}
                        >
                          Monthly Breakdown
                        </button>
                      </div>

                      <div className="text-xs text-[#002140]/60 flex items-center gap-1.5 font-medium">
                        <Info size={14} className="shrink-0 text-[#FF7819]" /> Showing {scheduleType === "yearly" ? "annual" : "monthly"} projections
                      </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto border border-[#E5E2DA] rounded-xl sm:rounded-2xl">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm text-[#002140]/80 min-w-[600px]">
                        <thead>
                          <tr className="bg-[#FAF8F5] border-b border-[#E5E2DA] font-bold text-[#002140] uppercase text-[10px] sm:text-xs tracking-wider">
                            <th className="p-3 sm:p-4">{scheduleType === "yearly" ? "Year" : "Month"}</th>
                            <th className="p-3 sm:p-4 text-right">Starting Balance</th>
                            <th className="p-3 sm:p-4 text-right">Total Payment</th>
                            <th className="p-3 sm:p-4 text-right">Principal</th>
                            <th className="p-3 sm:p-4 text-right">Interest</th>
                            <th className="p-3 sm:p-4 text-right">Ending Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E2DA] font-medium">
                          {getScheduleData().map((item) => (
                            <tr key={item.period} className="hover:bg-[#FAF8F5]/80 transition-colors">
                              <td className="p-3 sm:p-4 font-bold text-[#002140]">
                                {scheduleType === "yearly" ? `Year ${item.period}` : `Month ${item.period}`}
                              </td>
                              <td className="p-3 sm:p-4 text-right font-mono text-[#002140]/70">
                                {formatCurrency(item.startingBalance)}
                              </td>
                              <td className="p-3 sm:p-4 text-right font-mono text-[#002140]">
                                {formatCurrency(item.emiPaid)}
                              </td>
                              <td className="p-3 sm:p-4 text-right font-mono font-semibold text-[#002140]">
                                {formatCurrency(item.principalPaid)}
                              </td>
                              <td className="p-3 sm:p-4 text-right font-mono font-semibold text-[#FF7819]">
                                {formatCurrency(item.interestPaid)}
                              </td>
                              <td className="p-3 sm:p-4 text-right font-mono font-bold text-[#002140]">
                                {formatCurrency(item.endingBalance)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>

      </div>

      {/* Auth Login Modal */}
      <LoginModal 
        isOpen={loginOpen} 
        onClose={() => setLoginOpen(false)} 
        onSuccess={async () => {
          setLoginOpen(false);
          router.push(activeTab === "business" ? "/business-loans" : "/personal-loans");
        }}
      />
    </section>
  );
}