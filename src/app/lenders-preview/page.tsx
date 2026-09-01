"use client";

import React, { useState, useEffect } from "react";
import api from "../../lib/axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaCode, 
  FaCopy, 
  FaCheck, 
  FaServer, 
  FaMobileAlt, 
  FaDatabase, 
  FaArrowRight, 
  FaStar,
  FaFileCode
} from "react-icons/fa";

interface Lender {
  _id: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  pincodes: string[];
  UTM: string;
  priority: number;
  approval: string;
  loanAmount: string;
  interestRate: string;
  processingFee: string;
  support: string;
  ratings: number;
  features: string[];
  applyLink: string;
  loanTypes: string[];
  isActive?: boolean;
}

export default function LendersPreviewPage() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"json" | "flutter">("json");

  // Determine query parameters based on tab
  const getQueryUrl = () => {
    if (activeTab === "all") return "/api/lenders";
    return `/api/lenders?loanType=${activeTab}`;
  };

  const getFullApiUrl = () => {
    const base = "http://localhost:5001";
    return `${base}${getQueryUrl()}`;
  };

  const getCurlCommand = () => {
    return `curl -s "${getFullApiUrl()}"`;
  };

  useEffect(() => {
    const fetchLenders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await api.get(getQueryUrl());
        setLenders(data);
      } catch (err: any) {
        console.error("Error fetching preview lenders:", err);
        setError("Failed to fetch lenders. Make sure the backend server is running on port 5001.");
      } finally {
        setLoading(false);
      }
    };

    fetchLenders();
  }, [activeTab]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Generate copyable Dart code for the Flutter developer
  const getFlutterCode = () => {
    return `import 'dart:convert';
import 'package:http/http.dart' as http;

// 1. Lender Model Class
class Lender {
  final String id;
  final String name;
  final String logo;
  final int age;
  final int minIncome;
  final List<String> pincodes;
  final String utm;
  final String approval;
  final String loanAmount;
  final String interestRate;
  final String processingFee;
  final String support;
  final double ratings;
  final List<String> features;
  final String applyLink;
  final List<String> loanTypes;

  Lender({
    required this.id,
    required this.name,
    required this.logo,
    required this.age,
    required this.minIncome,
    required this.pincodes,
    required this.utm,
    required this.approval,
    required this.loanAmount,
    required this.interestRate,
    required this.processingFee,
    required this.support,
    required this.ratings,
    required this.features,
    required this.applyLink,
    required this.loanTypes,
  });

  factory Lender.fromJson(Map<String, dynamic> json) {
    return Lender(
      id: json['_id'] ?? '',
      name: json['name'] ?? '',
      logo: json['logo'] ?? '',
      age: json['age'] ?? 0,
      minIncome: json['minIncome'] ?? 0,
      pincodes: List<String>.from(json['pincodes'] ?? []),
      utm: json['UTM'] ?? '',
      approval: json['approval'] ?? '',
      loanAmount: json['loanAmount'] ?? '',
      interestRate: json['interestRate'] ?? '',
      processingFee: json['processingFee'] ?? '',
      support: json['support'] ?? '',
      ratings: (json['ratings'] as num?)?.toDouble() ?? 4.0,
      features: List<String>.from(json['features'] ?? []),
      applyLink: json['applyLink'] ?? '',
      loanTypes: List<String>.from(json['loanTypes'] ?? []),
    );
  }
}

// 2. Lender Service Class to Fetch Data
class LenderService {
  // Replace with covermantra production API base URL
  static const String baseUrl = 'http://localhost:5001'; 

  static Future<List<Lender>> fetchLenders({String? loanType}) async {
    final String path = loanType != null 
        ? '/api/lenders?loanType=$loanType' 
        : '/api/lenders';
        
    final response = await http.get(Uri.parse('$baseUrl$path'));

    if (response.statusCode == 200) {
      final List<dynamic> data = json.decode(response.body);
      return data.map((json) => Lender.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load lenders');
    }
  }
}`;
  };

  return (
    <div className="min-h-screen bg-[#070c15] text-gray-100 font-sans pt-24 pb-16">
      
      {/* Dynamic Saffron Neon Glows */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#FF7819] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-[#00f2fe] opacity-5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* HEADER SECTION */}
      <header className="border-b border-gray-800 bg-[#0d1527]/50 backdrop-blur-md relative z-40 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FF7819] flex items-center justify-center shadow-lg shadow-[#FF7819]/25 text-white">
              <FaCode className="text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white flex items-center gap-2">
                Developer API Playground
              </h1>
              <p className="text-xs text-gray-400">Lenders API Test Suite & Integration Code Generator</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-xs bg-gray-900 border border-gray-800 rounded-lg p-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-gray-300">Live Endpoint:</span>
            <span className="font-mono text-amber-400">/api/lenders</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-8">
        
        {/* API CONTROLS & FILTERING TABS */}
        <section className="bg-[#0e1626] border border-gray-800 rounded-3xl p-6 md:p-8 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-2">Select Loan Category Filter</h2>
              <p className="text-sm text-gray-400">Test how the API responds when filtering by specific loan categories.</p>
            </div>
            
            <div className="flex flex-wrap gap-2 bg-gray-950 border border-gray-800 p-1.5 rounded-2xl">
              {[
                { id: "all", label: "All Lenders" },
                { id: "instant", label: "Instant Loan" },
                { id: "personal", label: "Personal Loan" },
                { id: "short_term", label: "Short Term" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "bg-[#FF7819] text-white shadow-md shadow-[#FF7819]/20"
                      : "text-gray-400 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-gray-800 pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-2">Endpoint URL</span>
                <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-nowrap scrollbar-thin">
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">GET</span>
                  <span>{getFullApiUrl()}</span>
                </div>
              </div>
              <div className="md:mt-6">
                <button
                  onClick={() => copyToClipboard(getFullApiUrl(), "endpoint")}
                  className="w-full md:w-auto h-11 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {copiedText === "endpoint" ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  {copiedText === "endpoint" ? "Copied!" : "Copy URL"}
                </button>
              </div>
            </div>

            <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <span className="text-xs uppercase font-extrabold tracking-wider text-gray-400 block mb-2">cURL Command</span>
                <div className="flex items-center gap-3 bg-gray-950 border border-gray-800 rounded-xl p-3 font-mono text-xs text-gray-300 overflow-x-auto whitespace-nowrap scrollbar-thin">
                  <span>{getCurlCommand()}</span>
                </div>
              </div>
              <div className="md:mt-6">
                <button
                  onClick={() => copyToClipboard(getCurlCommand(), "curl")}
                  className="w-full md:w-auto h-11 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs px-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                >
                  {copiedText === "curl" ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                  {copiedText === "curl" ? "Copied!" : "Copy cURL"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: ACTIVE LENDER PREVIEWS */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF7819]"></span>
                Lenders List Preview ({lenders.length})
              </h2>
              <span className="text-xs text-gray-400 bg-gray-900 border border-gray-800 px-2.5 py-1 rounded-full">
                Active Only
              </span>
            </div>

            {loading ? (
              <div className="bg-[#0e1626] border border-gray-800 rounded-3xl p-12 text-center">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-[#FF7819] border-t-transparent rounded-full mb-4"></div>
                <p className="text-sm text-gray-400">Fetching live lenders payload...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/25 text-red-200 rounded-3xl p-6 text-center">
                <p className="text-sm font-semibold">{error}</p>
              </div>
            ) : lenders.length === 0 ? (
              <div className="bg-[#0e1626] border border-gray-800 rounded-3xl p-12 text-center">
                <p className="text-sm text-gray-400">No active lenders match this category.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {lenders.map((lender) => (
                  <motion.div
                    key={lender._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#0e1626] border border-gray-800 hover:border-[#FF7819]/40 rounded-3xl p-5 md:p-6 transition-all duration-200 shadow-md group"
                  >
                    <div className="flex items-center gap-4 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center flex-shrink-0">
                          <img
                            src={lender.logo}
                            alt={lender.name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <div>
                          <h3 className="font-extrabold text-white text-base group-hover:text-[#FF7819] transition-colors">
                            {lender.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[9px] font-bold uppercase bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded">
                              {lender.approval} approval
                            </span>
                            <span className="flex items-center gap-0.5 text-xs text-amber-400">
                              <FaStar className="text-[10px]" />
                              {lender.ratings}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <span className="text-[10px] uppercase font-extrabold tracking-wider bg-gray-900 border border-gray-800 text-gray-400 px-2 py-1 rounded-md">
                        Priority {lender.priority}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-5 border-t border-gray-800/60 pt-4 text-xs">
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Loan Amount</span>
                        <span className="text-white font-bold">{lender.loanAmount}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 block text-[10px] uppercase">Interest Rate</span>
                        <span className="text-white font-bold">{lender.interestRate}</span>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-gray-800/60 pt-4">
                      <span className="text-[10px] uppercase text-gray-400 block mb-2">Loan Categories Mapped</span>
                      <div className="flex flex-wrap gap-1.5">
                        {lender.loanTypes.map((type) => (
                          <span
                            key={type}
                            className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                              type === activeTab 
                                ? "bg-[#FF7819]/25 text-[#FF7819] border border-[#FF7819]/35" 
                                : "bg-gray-900 text-gray-400 border border-gray-800"
                            }`}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: DEVELOPER CONSOLE / CODE GENERATOR */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveView("json")}
                  className={`h-9 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeView === "json"
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaDatabase /> JSON Payload
                </button>
                <button
                  onClick={() => setActiveView("flutter")}
                  className={`h-9 px-4 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                    activeView === "flutter"
                      ? "bg-gray-800 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <FaMobileAlt /> Flutter Integration
                </button>
              </div>

              <button
                onClick={() => {
                  const copyVal = activeView === "json" 
                    ? JSON.stringify(lenders, null, 2) 
                    : getFlutterCode();
                  copyToClipboard(copyVal, activeView);
                }}
                className="h-9 px-4 bg-gray-950 border border-gray-800 hover:border-[#FF7819]/40 hover:bg-gray-900 rounded-xl text-xs font-bold flex items-center gap-2 text-[#FF7819] transition-all"
              >
                {copiedText === activeView ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                {copiedText === activeView ? "Copied!" : `Copy ${activeView.toUpperCase()}`}
              </button>
            </div>

            <div className="flex-1 bg-gray-950 border border-gray-800 rounded-3xl p-5 md:p-6 font-mono text-xs relative overflow-hidden shadow-inner max-h-[600px] overflow-y-auto scrollbar-thin">
              <AnimatePresence mode="wait">
                {activeView === "json" ? (
                  <motion.pre
                    key="json-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-emerald-400 whitespace-pre-wrap leading-relaxed"
                  >
                    {loading ? "// Loading dynamic data..." : JSON.stringify(lenders, null, 2)}
                  </motion.pre>
                ) : (
                  <motion.pre
                    key="flutter-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-cyan-400 whitespace-pre leading-relaxed"
                  >
                    {getFlutterCode()}
                  </motion.pre>
                )}
              </AnimatePresence>
            </div>
            
            <div className="mt-4 bg-[#0e1626] border border-gray-800 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#FF7819]/10 flex items-center justify-center text-[#FF7819] flex-shrink-0">
                <FaFileCode />
              </div>
              <p className="text-xs text-gray-400">
                <strong className="text-white">Note to Flutter Developer:</strong> Provide this integration file to your mobile team. It contains the required models and HTTP calls to map responses from the `/api/lenders` routes automatically.
              </p>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
