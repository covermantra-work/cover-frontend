"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axios";

interface LenderResponseItem {
  lenderName: string;
  apiResponse: any;
  createdDate: string;
}

interface Lead {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  pan?: string;
  income?: string;
  pincode: string;
  employment?: string;
  loanStatus: "applied" | "approved" | "rejected" | "disbursed" | "none";
  loanAmount?: number;
  lenderResponses: LenderResponseItem[];
  createdAt: string;
}

export default function AdminLeadsCRM() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);
  
  // Search & Filter State
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [lender, setLender] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  
  // Admin Authentication State (Matches Lender Dashboard)
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Selected lead response modal state
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);

  useEffect(() => {
    if (isAuthenticated && adminSecret) {
      fetchLeads();
    }
  }, [page, status, lender, startDate, endDate, isAuthenticated]);

  // Load secret from sessionStorage if present
  useEffect(() => {
    const cachedSecret = sessionStorage.getItem("co_admin_secret");
    if (cachedSecret) {
      setAdminSecret(cachedSecret);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLock = () => {
    sessionStorage.removeItem("co_admin_secret");
    setAdminSecret("");
    setIsAuthenticated(false);
    toast.info("CRM Portal Locked.");
  };

  // Inactivity / Idle Logout Timer (15 minutes)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: NodeJS.Timeout;

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLock();
        toast.warning("Logged out due to 15 minutes of inactivity.");
      }, 15 * 60 * 1000); // 15 minutes
    };

    const events = ["mousemove", "keydown", "click", "scroll"];

    let lastReset = 0;
    const throttledReset = () => {
      const now = Date.now();
      if (now - lastReset > 1000) {
        lastReset = now;
        resetTimer();
      }
    };

    resetTimer();

    events.forEach((event) => {
      window.addEventListener(event, throttledReset);
    });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, throttledReset);
      });
    };
  }, [isAuthenticated]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/auth-gate-70898/leads", {
        params: {
          page,
          limit: 10,
          search,
          status,
          lender,
          startDate,
          endDate,
        },
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      if (res.data && res.data.success) {
        setLeads(res.data.leads);
        setTotal(res.data.total);
        setPages(res.data.pages);
      }
    } catch (error: any) {
      console.error("Failed to fetch admin leads:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        toast.error("❌ Incorrect Admin Secret Key! Please check and try again.");
      } else {
        toast.error("⚠️ Failed to load leads database.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchLeads();
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const res = await api.get("/api/auth-gate-70898/leads", {
        params: {
          limit: "all",
          search,
          status,
          lender,
          startDate,
          endDate,
        },
        headers: {
          "x-admin-secret": adminSecret,
        },
      });

      if (!res.data || !res.data.success || !res.data.leads || res.data.leads.length === 0) {
        toast.info("No leads available to export in selected range/filters.");
        return;
      }

      const allLeads = res.data.leads;
      const headers = ["Name", "Phone", "Global Status", "Applied Lenders", "Applied Date"];
      
      const rows = allLeads.map((lead: Lead) => [
        `"${lead.name}"`,
        `"${lead.phone}"`,
        `"${lead.loanStatus.toUpperCase()}"`,
        `"${lead.lenderResponses.map(r => r.lenderName).join(", ")}"`,
        `"${new Date(lead.createdAt).toLocaleDateString('en-IN')}"`
      ]);

      const csvContent = "data:text/csv;charset=utf-8," 
        + [headers.join(","), ...rows.map((row: string[]) => row.join(","))].join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `CoverMantra_Leads_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("CSV Export Completed successfully!");
    } catch (err) {
      toast.error("Failed to export Excel file.");
    } finally {
      setIsExporting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ";
    switch (status) {
      case "approved":
        return base + "bg-emerald-100 text-emerald-800 border border-emerald-300";
      case "rejected":
        return base + "bg-rose-100 text-rose-800 border border-rose-300";
      case "disbursed":
        return base + "bg-blue-100 text-blue-800 border border-blue-300";
      case "applied":
        return base + "bg-amber-100 text-amber-800 border border-amber-300";
      default:
        return base + "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E5] pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden z-0">
      {/* Top Dark Half Split */}
      <div className="absolute top-0 left-0 w-full h-[65vh] md:h-[55vh] bg-[#08101E] rounded-b-[3rem] sm:rounded-b-[5rem] shadow-xl pointer-events-none -z-10" />

      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#FF7819]/20 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[20%] left-[-10%] w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

      <ToastContainer position="top-right" style={{ marginTop: "120px" }} />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-12 p-2 md:p-4 text-left">
          <div className="inline-block px-4 py-1.5 mb-6 border border-[#FF7819]/30 bg-[#FF7819]/10 rounded-full shadow-lg backdrop-blur-md">
            <span className="text-[#FF7819] font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Leads CRM Management
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 tracking-tighter drop-shadow-sm">
            Customer <span className="bg-gradient-to-r from-[#FF7819] to-yellow-400 bg-clip-text text-transparent">Leads</span>
          </h1>
          <p className="text-white/70 mb-8 font-medium text-sm md:text-lg max-w-2xl leading-relaxed">
            Monitor incoming consumer leads, check bank API validation eligibility logs, filter by status, and export list to CSV.
          </p>

          {/* Admin Authentication Box */}
          <div className="flex flex-col sm:flex-row gap-4 items-center bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-white/20 shadow-2xl max-w-3xl">
            <div className="relative w-full sm:w-auto flex-grow">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
              <input 
                type="password" 
                placeholder="Enter Admin Secret Key to Unlock CRM" 
                className="bg-black/20 w-full pl-12 pr-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#FF7819]/50 transition-all font-medium border border-white/10 focus:border-transparent"
                value={adminSecret}
                onChange={(e) => {
                  const val = e.target.value;
                  setAdminSecret(val);
                  if (val.trim()) {
                    sessionStorage.setItem("co_admin_secret", val.trim());
                    setIsAuthenticated(true);
                  } else {
                    sessionStorage.removeItem("co_admin_secret");
                    setIsAuthenticated(false);
                  }
                }}
              />
            </div>
            {isAuthenticated && (
              <button
                onClick={fetchLeads}
                disabled={loading}
                className="bg-gradient-to-r from-[#FF7819] to-[#E65C00] px-8 py-3.5 md:py-4 rounded-xl font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                {loading ? "Loading..." : "Sync Database"}
              </button>
            )}
          </div>
        </div>

        {isAuthenticated && (
          <div className="space-y-6">
            {/* Filters Section */}
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full md:max-w-md">
                <input
                  type="text"
                  placeholder="Search Name, Phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-55 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF7819] font-bold text-sm text-[#08101E]"
                />
                <button type="submit" className="bg-[#08101E] text-white px-5 rounded-xl font-black hover:bg-[#FF7819] transition-colors">
                  SEARCH
                </button>
              </form>

              <div className="flex flex-wrap gap-4 w-full md:w-auto justify-end">
                <div className="flex items-center gap-1.5 bg-gray-55 border border-gray-200 rounded-xl px-3 py-1">
                  <span className="text-[10px] uppercase font-black text-gray-400">From:</span>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                    className="bg-transparent font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer"
                  />
                </div>

                <div className="flex items-center gap-1.5 bg-gray-55 border border-gray-200 rounded-xl px-3 py-1">
                  <span className="text-[10px] uppercase font-black text-gray-400">To:</span>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                    className="bg-transparent font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={status}
                  onChange={(e) => { setStatus(e.target.value); setPage(1); }}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-[#08101E] focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="applied">Applied</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="disbursed">Disbursed</option>
                </select>

                {/* Lender Filter */}
                <select
                  value={lender}
                  onChange={(e) => { setLender(e.target.value); setPage(1); }}
                  className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-[#08101E] focus:outline-none"
                >
                  <option value="all">All Lenders</option>
                  <option value="zype">Zype</option>
                  <option value="moneyview">MoneyView</option>
                  <option value="vivifi">Vivifi</option>
                  <option value="fatakPay">FatakPay</option>
                  <option value="credify">Credify</option>
                </select>

                {/* Export CSV */}
                <button
                  onClick={handleExportCSV}
                  disabled={isExporting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-md hover:scale-102 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isExporting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17" /></svg>
                      EXPORTING...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                      EXPORT EXCEL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Leads Table Card */}
            <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-100 text-left">
                  <thead className="bg-gray-50 font-black text-[#08101E]/40 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                    <tr>
                      <th className="px-6 py-4">Lead Details</th>
                      <th className="px-6 py-4">Global Status</th>
                      <th className="px-6 py-4">Bank API Logs</th>
                      <th className="px-6 py-4">Applied Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-[#08101E]">
                    {loading ? (
                      <tr>
                        <td colSpan={4} className="text-center py-10 font-bold text-gray-500">Syncing database entries...</td>
                      </tr>
                    ) : leads.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-10 font-bold text-gray-500">No matching leads found.</td>
                      </tr>
                    ) : (
                      leads.map((lead) => (
                        <tr key={lead._id} className="hover:bg-[#FFF4E5]/20 transition-colors">
                          <td className="px-6 py-4">
                            <div className="font-black text-base">{lead.name}</div>
                            <div className="text-xs font-semibold text-gray-500">{lead.phone}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={getStatusBadge(lead.loanStatus)}>
                              {lead.loanStatus}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              {lead.lenderResponses.map((r, i) => (
                                <button
                                  key={i}
                                  onClick={() => setSelectedResponse(r)}
                                  className="text-left text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1.5"
                                >
                                  📄 {r.lenderName} Response
                                </button>
                              ))}
                              {lead.lenderResponses.length === 0 && (
                                <span className="text-xs font-bold text-gray-400 italic">No integrations triggered</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-xs font-bold text-gray-400">
                            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {pages > 1 && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div className="text-xs font-semibold text-gray-500">
                    Showing Page <span className="font-bold">{page}</span> of <span className="font-bold">{pages}</span> ({total} total leads)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-[#08101E] hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      PREVIOUS
                    </button>
                    <button
                      onClick={() => setPage(p => Math.min(pages, p + 1))}
                      disabled={page === pages}
                      className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-[#08101E] hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* API Response JSON Modal */}
      {selectedResponse && (
        <div className="fixed inset-0 bg-[#08101E]/80 backdrop-blur-md flex items-center justify-center p-4 z-[200]">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-8 border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setSelectedResponse(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-[#FF7819] hover:text-white transition-all font-black flex items-center justify-center"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-[#08101E] mb-1 uppercase tracking-tight">
              {selectedResponse.lenderName} Payload Log
            </h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
              Recorded on {selectedResponse.createdDate}
            </p>
            <div className="bg-gray-950 p-6 rounded-2xl overflow-y-auto max-h-[50vh] font-mono text-xs text-green-400 shadow-inner">
              <pre>{JSON.stringify(selectedResponse.apiResponse, null, 2)}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
