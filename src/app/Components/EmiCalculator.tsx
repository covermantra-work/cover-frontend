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
  Info
} from "lucide-react";

// Register necessary elements for the Doughnut chart
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

type LoanType = "home" | "personal" | "car" | "custom";

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
  tenureType: "months" | "years";
}

const loanTabs: Record<LoanType, TabConfig> = {
  home: {
    label: "Home Loan",
    defaultAmount: 3000000,
    minAmount: 100000,
    maxAmount: 10000000,
    stepAmount: 50000,
    defaultInterest: 8.5,
    minInterest: 5,
    maxInterest: 20,
    stepInterest: 0.1,
    defaultTenure: 240, // 20 years
    minTenure: 12,
    maxTenure: 360,
    stepTenure: 12,
    tenureType: "months",
  },
  personal: {
    label: "Personal Loan",
    defaultAmount: 500000,
    minAmount: 10000,
    maxAmount: 2500000,
    stepAmount: 5000,
    defaultInterest: 12.0,
    minInterest: 8.0,
    maxInterest: 36.0,
    stepInterest: 0.1,
    defaultTenure: 36, // 3 years
    minTenure: 3,
    maxTenure: 72,
    stepTenure: 3,
    tenureType: "months",
  },
  car: {
    label: "Car Loan",
    defaultAmount: 800000,
    minAmount: 50000,
    maxAmount: 5000000,
    stepAmount: 10000,
    defaultInterest: 9.5,
    minInterest: 6.0,
    maxInterest: 20.0,
    stepInterest: 0.1,
    defaultTenure: 60, // 5 years
    minTenure: 12,
    maxTenure: 84,
    stepTenure: 12,
    tenureType: "months",
  },
  custom: {
    label: "Custom",
    defaultAmount: 1500000,
    minAmount: 5000,
    maxAmount: 20000000,
    stepAmount: 5000,
    defaultInterest: 10.0,
    minInterest: 1.0,
    maxInterest: 50.0,
    stepInterest: 0.1,
    defaultTenure: 120, // 10 years
    minTenure: 3,
    maxTenure: 360,
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

export default function LoanCalculator() {
  const [activeTab, setActiveTab] = useState<LoanType>("home");
  
  // Primary inputs
  const [loanAmount, setLoanAmount] = useState<number>(3000000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(240); // always in months internally

  // Formatted string values for direct input boxes
  const [amountInput, setAmountInput] = useState<string>("30,00,000");
  const [interestInput, setInterestInput] = useState<string>("8.5");
  const [tenureInput, setTenureInput] = useState<string>("20"); // visual unit (years/months)

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
    
    if (config.tenureType === "months" && tab !== "personal" && tab !== "custom") {
      setTenureInput((config.defaultTenure / 12).toString());
    } else {
      setTenureInput(config.defaultTenure.toString());
    }
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
    if (loanTabs[activeTab].tenureType === "months" && activeTab !== "personal" && activeTab !== "custom") {
      setTenureInput((val / 12).toString());
    } else {
      setTenureInput(val.toString());
    }
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
      if (loanTabs[activeTab].tenureType === "months" && activeTab !== "personal" && activeTab !== "custom") {
        setTenure(rawVal * 12);
      } else {
        setTenure(rawVal);
      }
    }
  };

  const handleTenureInputBlur = () => {
    const config = loanTabs[activeTab];
    let visualVal = parseInt(tenureInput, 10) || 0;
    
    // min & max bounds check
    let minVisual = config.minTenure;
    let maxVisual = config.maxTenure;
    const isYearlyMode = config.tenureType === "months" && activeTab !== "personal" && activeTab !== "custom";
    
    if (isYearlyMode) {
      minVisual = Math.round(config.minTenure / 12);
      maxVisual = Math.round(config.maxTenure / 12);
    }

    if (visualVal < minVisual) visualVal = minVisual;
    if (visualVal > maxVisual) visualVal = maxVisual;

    setTenureInput(visualVal.toString());
    if (isYearlyMode) {
      setTenure(visualVal * 12);
    } else {
      setTenure(visualVal);
    }
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
              backgroundColor: ["#08101E", "#FF690B"],
              borderColor: "#ffffff",
              borderWidth: 5,
              hoverOffset: 10,
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
              backgroundColor: "#08101E",
              titleFont: { size: 14, family: "sans-serif", weight: "bold" },
              bodyFont: { size: 15, family: "sans-serif" },
              padding: 12,
              cornerRadius: 12,
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
    <section className="bg-gradient-to-b from-[#FFF4E5] via-white to-[#FFF4E5] py-12 px-4 sm:py-16 md:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Header Widget */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FF690B]/10 rounded-full border border-[#FF690B]/20 text-[#FF690B] text-xs font-black tracking-wider uppercase mb-3 shadow-[0_4px_12px_rgba(255,105,11,0.08)]">
            <Sparkles size={12} className="animate-spin-slow" /> Smart Calculator
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#08101E] tracking-tight leading-none">
            Precision <span className="text-[#FF690B]">EMI Calculator</span>
          </h1>
          <p className="mt-3 text-[#08101E]/60 text-sm sm:text-base max-w-lg mx-auto font-medium">
            Plan your mortgages and personal loans easily with interactive amortization tables and budget checks.
          </p>
        </div>

        {/* Loan Type Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/70 p-2 rounded-2xl border border-gray-100 max-w-xl mx-auto backdrop-blur-md shadow-sm">
          {(Object.keys(loanTabs) as LoanType[]).map((tab) => {
            const isSelected = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#08101E] text-white shadow-lg shadow-[#08101E]/20"
                    : "text-gray-500 hover:text-[#FF690B] hover:bg-orange-50/50"
                }`}
              >
                {loanTabs[tab].label}
              </button>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SLIDERS & INPUTS */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-500/5 space-y-6">
              <h2 className="text-lg font-black text-[#08101E] flex items-center gap-2 border-b border-gray-100 pb-4">
                <Calculator size={18} className="text-[#FF690B]" /> Configure Loan Details
              </h2>

              {/* LOAN AMOUNT */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-[#08101E]/80 flex items-center gap-1.5">
                    <Coins size={14} className="text-gray-400" /> Loan Amount
                  </label>
                  
                  {/* Dynamic formatted Input box */}
                  <div className="relative rounded-xl border border-gray-200 bg-gray-50 shadow-inner flex items-center px-3 max-w-[170px] focus-within:border-[#FF690B] transition-all">
                    <span className="text-xs font-bold text-gray-400 mr-1">₹</span>
                    <input
                      type="text"
                      value={amountInput}
                      onChange={(e) => handleAmountInputChange(e.target.value)}
                      onBlur={handleAmountInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#08101E] outline-none"
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
                  className="w-full accent-[#FF690B] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />
                
                <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                  <span>₹{toINRString(currentConfig.minAmount)}</span>
                  <span>₹{toINRString(currentConfig.maxAmount)}</span>
                </div>
              </div>

              {/* INTEREST RATE */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-[#08101E]/80 flex items-center gap-1.5">
                    <Percent size={14} className="text-gray-400" /> Interest Rate (p.a)
                  </label>

                  <div className="relative rounded-xl border border-gray-200 bg-gray-50 shadow-inner flex items-center px-3 max-w-[100px] focus-within:border-[#FF690B] transition-all">
                    <input
                      type="text"
                      value={interestInput}
                      onChange={(e) => handleInterestInputChange(e.target.value)}
                      onBlur={handleInterestInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#08101E] outline-none"
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
                  className="w-full accent-[#FF690B] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                  <span>{currentConfig.minInterest}%</span>
                  <span>{currentConfig.maxInterest}%</span>
                </div>
              </div>

              {/* TENURE */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-black text-[#08101E]/80 flex items-center gap-1.5">
                    <Calendar size={14} className="text-gray-400" /> Loan Tenure
                  </label>

                  <div className="relative rounded-xl border border-gray-200 bg-gray-50 shadow-inner flex items-center px-3 max-w-[120px] focus-within:border-[#FF690B] transition-all">
                    <input
                      type="text"
                      value={tenureInput}
                      onChange={(e) => handleTenureInputChange(e.target.value)}
                      onBlur={handleTenureInputBlur}
                      className="w-full bg-transparent text-right font-mono font-bold text-sm text-[#08101E] outline-none"
                    />
                    <span className="text-xs font-bold text-gray-400 ml-1">
                      {currentConfig.tenureType === "months" && activeTab !== "personal" && activeTab !== "custom"
                        ? "Yrs"
                        : "Mths"}
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
                  className="w-full accent-[#FF690B] h-1.5 bg-gray-100 rounded-lg cursor-pointer transition-all"
                />

                <div className="flex justify-between text-[11px] text-gray-400 font-bold">
                  <span>
                    {currentConfig.tenureType === "months" && activeTab !== "personal" && activeTab !== "custom"
                      ? `${currentConfig.minTenure / 12} Years`
                      : `${currentConfig.minTenure} Months`}
                  </span>
                  <span>
                    {currentConfig.tenureType === "months" && activeTab !== "personal" && activeTab !== "custom"
                      ? `${currentConfig.maxTenure / 12} Years (${currentConfig.maxTenure} mths)`
                      : `${currentConfig.maxTenure} Months`}
                  </span>
                </div>
              </div>

            </div>

            {/* BUDGET AFFORDABILITY SECTION */}
            <div className={`border rounded-3xl p-6 transition-all duration-500 bg-white/70 ${affordabilityBorder} shadow-lg shadow-gray-500/5`}>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <div>
                  <h3 className="text-base font-black text-[#08101E] flex items-center gap-1.5">
                    <Wallet size={16} className="text-[#FF690B]" /> Monthly Budget Check
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-semibold">
                    Ensure your Monthly EMI doesn't exceed 40-50% of your income.
                  </p>
                </div>

                {/* Badge indicator */}
                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase ${affordabilityColor}`}>
                  {affordabilityLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center mb-4">
                {/* Income text input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-gray-500">Your Net Monthly Income</label>
                  <div className="relative rounded-xl border border-gray-200 bg-white shadow-inner flex items-center px-3 focus-within:border-[#FF690B] transition-all">
                    <span className="text-xs font-bold text-gray-400 mr-1">₹</span>
                    <input
                      type="text"
                      value={incomeInput}
                      onChange={(e) => handleIncomeInputChange(e.target.value)}
                      onBlur={handleIncomeInputBlur}
                      className="w-full bg-transparent font-mono font-bold text-sm text-[#08101E] outline-none py-2"
                    />
                  </div>
                </div>

                {/* Visual Ratio breakdown */}
                <div className="space-y-1.5 sm:text-right">
                  <label className="text-xs font-black text-gray-500 block">EMI-to-Income Ratio</label>
                  <div className="font-mono text-lg font-black text-[#08101E] py-1.5">
                    {emiPercentage.toFixed(1)}% <span className="text-xs font-semibold text-gray-400">of income</span>
                  </div>
                </div>
              </div>

              {/* Progress visual bar */}
              <div className="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
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
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Doughnut with dynamic centers */}
            <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-gray-500/5 flex flex-col items-center">
              
              <div className="relative w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] flex items-center justify-center">
                <canvas ref={canvasRef} className="z-10" />
                
                {/* Visual Overlay inside Doughnut Hole */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-0 select-none">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly EMI</span>
                  <span className="text-2xl sm:text-3xl font-black text-[#08101E] mt-1 tracking-tighter">
                    {formatCurrency(emi)}
                  </span>
                </div>
              </div>

              {/* Visual Breakdown Indicators */}
              <div className="w-full grid grid-cols-2 gap-4 mt-6 border-t border-gray-100 pt-5">
                <div className="flex items-center gap-2 justify-center">
                  <span className="w-3.5 h-3.5 rounded bg-[#08101E] shadow-sm shrink-0" />
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Principal</p>
                    <p className="text-sm font-black text-[#08101E]">
                      {total > 0 ? ((loanAmount / total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-center border-l border-gray-100">
                  <span className="w-3.5 h-3.5 rounded bg-[#FF690B] shadow-sm shrink-0" />
                  <div className="text-center sm:text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase">Interest</p>
                    <p className="text-sm font-black text-[#FF690B]">
                      {total > 0 ? ((interest / total) * 100).toFixed(0) : 0}%
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Metrics Summary list */}
            <div className="bg-[#08101E] text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#08101E]/10 space-y-4">
              <h3 className="text-sm font-black tracking-widest text-[#FF690B] uppercase">
                Payment Summary
              </h3>

              <div className="space-y-3.5 divide-y divide-white/5">
                
                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-xs font-bold text-white/50">Principal Loan Amount</span>
                  <span className="text-base font-bold font-mono">{formatCurrency(loanAmount)}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-bold text-white/50">Total Interest Payable</span>
                  <span className="text-base font-bold font-mono text-[#FF690B]">{formatCurrency(interest)}</span>
                </div>

                <div className="flex justify-between items-center pt-3">
                  <span className="text-xs font-bold text-white/50">Total Payment (Amount + Interest)</span>
                  <span className="text-lg font-black font-mono text-white">{formatCurrency(total)}</span>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM: COLLAPSIBLE AMORTIZATION SCHEDULE */}
        <div className="mt-12">
          <div className="bg-white border border-gray-100 rounded-3xl shadow-xl shadow-gray-500/5 overflow-hidden">
            
            {/* Header Trigger */}
            <button
              onClick={() => setShowSchedule(!showSchedule)}
              className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-gray-50/50 transition-colors focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#FF690B] flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#08101E]">Amortization Schedule</h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-semibold">
                    Detailed breakdown of your principal and interest components over time.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs font-black uppercase text-gray-400 bg-gray-100/80 px-3 py-1.5 rounded-lg">
                  {showSchedule ? "Collapse" : "Expand"}
                </span>
                {showSchedule ? (
                  <ChevronUp size={20} className="text-gray-400" />
                ) : (
                  <ChevronDown size={20} className="text-gray-400" />
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
                  <div className="px-6 pb-8 border-t border-gray-100 pt-6">
                    
                    {/* View Controls (Yearly / Monthly toggle) */}
                    <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                      <div className="flex bg-gray-100 p-1 rounded-xl">
                        <button
                          onClick={() => setScheduleType("yearly")}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            scheduleType === "yearly"
                              ? "bg-white text-[#08101E] shadow-sm"
                              : "text-gray-500 hover:text-[#08101E]"
                          }`}
                        >
                          Yearly Breakdown
                        </button>
                        <button
                          onClick={() => setScheduleType("monthly")}
                          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            scheduleType === "monthly"
                              ? "bg-white text-[#08101E] shadow-sm"
                              : "text-gray-500 hover:text-[#08101E]"
                          }`}
                        >
                          Monthly Breakdown
                        </button>
                      </div>

                      <div className="text-xs text-gray-400 flex items-center gap-1.5 font-semibold">
                        <Info size={14} className="shrink-0 text-gray-300" /> Showing {scheduleType === "yearly" ? "annual" : "monthly"} projections
                      </div>
                    </div>

                    {/* Table Container */}
                    <div className="overflow-x-auto border border-gray-100 rounded-2xl">
                      <table className="w-full border-collapse text-left text-xs sm:text-sm text-gray-600">
                        <thead>
                          <tr className="bg-gray-50/80 border-b border-gray-100 font-black text-[#08101E] uppercase text-[10px] sm:text-xs tracking-wider">
                            <th className="p-4">{scheduleType === "yearly" ? "Year" : "Month"}</th>
                            <th className="p-4 text-right">Starting Balance</th>
                            <th className="p-4 text-right">Total Payment</th>
                            <th className="p-4 text-right">Principal Component</th>
                            <th className="p-4 text-right">Interest Component</th>
                            <th className="p-4 text-right">Ending Balance</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                          {getScheduleData().map((item) => (
                            <tr key={item.period} className="hover:bg-orange-50/20 transition-colors">
                              <td className="p-4 font-bold text-[#08101E]">
                                {scheduleType === "yearly" ? `Year ${item.period}` : `Month ${item.period}`}
                              </td>
                              <td className="p-4 text-right font-mono text-[#08101E]/80">
                                {formatCurrency(item.startingBalance)}
                              </td>
                              <td className="p-4 text-right font-mono text-[#08101E]">
                                {formatCurrency(item.emiPaid)}
                              </td>
                              <td className="p-4 text-right font-mono text-green-600">
                                {formatCurrency(item.principalPaid)}
                              </td>
                              <td className="p-4 text-right font-mono text-red-500">
                                {formatCurrency(item.interestPaid)}
                              </td>
                              <td className="p-4 text-right font-mono font-bold text-[#08101E]">
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
    </section>
  );
}