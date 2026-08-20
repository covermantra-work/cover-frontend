"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axios";
import { 
  Menu, 
  X, 
  Users, 
  Sliders, 
  UserX, 
  Lock, 
  Unlock, 
  ChevronLeft, 
  ChevronRight, 
  FileSpreadsheet,
  RefreshCw,
  Search,
  Globe,
  Smartphone,
  CheckCircle,
  Calendar,
  Layers,
  ArrowRight,
  Plus,
  Edit3,
  Trash2,
  ExternalLink,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  Sparkles
} from "lucide-react";

// -------------------------------------------------------------
// Interfaces
// -------------------------------------------------------------


interface Lender {
  _id: string;
  name: string;
  logo: string;
  age: number;
  minIncome: number;
  priority: number;
  UTM?: string;
  approval?: string;
  loanAmount?: string;
  interestRate?: string;
  processingFee?: string;
  support?: string;
  ratings?: number;
  features?: string[];
  pincodes?: string[];
  applyLink?: string;
  loanTypes?: string[];
  isActive?: boolean;
}

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
  followedUp: boolean;
  source?: "web" | "app";
  createdAt: string;
}

interface DeletionRequest {
  _id: string;
  phone: string;
  email?: string;
  message: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

interface Stats {
  totalLeads: number;
  todayLeads: number;
  monthLeads: number;
  sources: {
    web: number;
    app: number;
  };
  followUp: {
    done: number;
    pending: number;
  };
}

// -------------------------------------------------------------
// Main Component
// -------------------------------------------------------------

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<"leads" | "lenders" | "deletions">("leads");
  
  // Auth State
  const [adminSecret, setAdminSecret] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [lockoutTimeLeft, setLockoutTimeLeft] = useState<number | null>(null);

  // Responsive Sidebar States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lenders Module State
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [isSavingLenders, setIsSavingLenders] = useState(false);
  const [isLenderModalOpen, setIsLenderModalOpen] = useState(false);
  const [editingLender, setEditingLender] = useState<Lender | null>(null);
  const [isSubmittingLender, setIsSubmittingLender] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [lenderFormTab, setLenderFormTab] = useState<"general" | "terms" | "eligibility">("general");
  const [lenderFormData, setLenderFormData] = useState({
    name: "",
    logo: "",
    UTM: "",
    minIncome: 15000,
    age: 21,
    loanAmount: "Up to ₹5,00,000",
    interestRate: "Starting from 1.5% per month",
    processingFee: "Starting from 2%",
    ratings: 4.5,
    features: "Instant Approval, Paperless Process, Quick Disbursal",
    pincodes: "*",
    loanTypes: "instant, personal",
    isActive: true,
  });

  // Leads Module State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [leadsTotal, setLeadsTotal] = useState(0);
  const [leadsPage, setLeadsPage] = useState(1);
  const [leadsPages, setLeadsPages] = useState(1);
  const [leadsSearch, setLeadsSearch] = useState("");
  const [leadsStatus, setLeadsStatus] = useState("all");
  const [leadsLender, setLeadsLender] = useState("all");
  const [leadsStartDate, setLeadsStartDate] = useState("");
  const [leadsEndDate, setLeadsEndDate] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<any | null>(null);

  // Stats State
  const [stats, setStats] = useState<Stats | null>(null);

  // Deletions Module State
  const [deletions, setDeletions] = useState<DeletionRequest[]>([]);
  const [deletionsTotal, setDeletionsTotal] = useState(0);
  const [deletionsPage, setDeletionsPage] = useState(1);
  const [deletionsPages, setDeletionsPages] = useState(1);
  const [deletionsStatus, setDeletionsStatus] = useState("pending");

  const [loading, setLoading] = useState(false);

  // Check authentication on credentials update
  useEffect(() => {
    if (isAuthenticated && adminSecret) {
      syncDashboardData();
    }
  }, [activeTab, leadsPage, leadsStatus, leadsLender, leadsStartDate, leadsEndDate, deletionsPage, deletionsStatus, isAuthenticated, adminSecret]);

  // Load secret from sessionStorage if present
  useEffect(() => {
    const cachedSecret = sessionStorage.getItem("co_admin_secret");
    if (cachedSecret) {
      setAdminSecret(cachedSecret);
      setIsAuthenticated(true);
    }
  }, []);

  // Monitor Lockout Timer
  useEffect(() => {
    const checkLock = () => {
      const lockUntil = localStorage.getItem("co_admin_lock_until");
      if (lockUntil) {
        const remaining = Number(lockUntil) - Date.now();
        if (remaining > 0) {
          setLockoutTimeLeft(Math.ceil(remaining / 1000));
        } else {
          localStorage.removeItem("co_admin_lock_until");
          localStorage.removeItem("co_admin_failed_attempts");
          setLockoutTimeLeft(null);
        }
      }
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, []);

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

    // Events to monitor user activity
    const events = ["mousemove", "keydown", "click", "scroll"];

    // Throttling timer resets to avoid resetting too frequently on mouse movements
    let lastReset = 0;
    const throttledReset = () => {
      const now = Date.now();
      if (now - lastReset > 1000) { // reset at most once per second
        lastReset = now;
        resetTimer();
      }
    };

    // Initialize timer
    resetTimer();

    // Register event listeners
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

  const syncDashboardData = () => {
    if (activeTab === "leads") {
      fetchLeads();
      fetchStats();
    }
    if (activeTab === "lenders") fetchLenders();
    if (activeTab === "deletions") fetchDeletions();
  };

  // Save auth credentials with validation check
  const handleUnlock = async () => {
    if (!adminSecret.trim() || isAuthenticating) return;

    // Check Lockout state
    const lockUntil = localStorage.getItem("co_admin_lock_until");
    if (lockUntil) {
      const remaining = Number(lockUntil) - Date.now();
      if (remaining > 0) {
        toast.error(`Locked out! Please try again in ${Math.ceil(remaining / 60000)} minutes.`);
        return;
      } else {
        localStorage.removeItem("co_admin_lock_until");
        localStorage.removeItem("co_admin_failed_attempts");
        setLockoutTimeLeft(null);
      }
    }

    setIsAuthenticating(true);
    try {
      // Validate secret key with stats API request
      const res = await api.get("/api/auth-gate-70898/stats", {
        headers: { "x-admin-secret": adminSecret }
      });
      if (res.status === 200) {
        sessionStorage.setItem("co_admin_secret", adminSecret);
        setIsAuthenticated(true);
        localStorage.removeItem("co_admin_failed_attempts");
        toast.success("CRM Portal Unlocked!");
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        const attempts = Number(localStorage.getItem("co_admin_failed_attempts") || "0") + 1;
        localStorage.setItem("co_admin_failed_attempts", String(attempts));

        if (attempts >= 3) {
          const lockTime = Date.now() + 5 * 60 * 1000; // 5 mins lockout
          localStorage.setItem("co_admin_lock_until", String(lockTime));
          setLockoutTimeLeft(300);
          toast.error("❌ Wrong password entered 3 times! Lockout active for 5 minutes.");
        } else {
          toast.error(`❌ Incorrect Admin Secret! (${3 - attempts} attempts remaining)`);
        }
      } else {
        toast.error("Failed to connect to authentication server. Please check connection.");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLock = () => {
    sessionStorage.removeItem("co_admin_secret");
    setAdminSecret("");
    setIsAuthenticated(false);
    toast.info("CRM Portal Locked.");
  };

  // -------------------------------------------------------------
  // Data Fetching Logic
  // -------------------------------------------------------------

  const fetchLenders = async () => {
    setLoading(true);
    try {
      // First try to fetch all lenders (including inactive) using admin endpoint
      const res = await api.get("/api/lenders/admin/all", {
        headers: { "x-admin-secret": adminSecret }
      });
      if (res.data && Array.isArray(res.data)) {
        setLenders(res.data);
      }
    } catch (error) {
      try {
        const fallbackRes = await api.get("/api/lenders");
        if (fallbackRes.data && Array.isArray(fallbackRes.data)) {
          setLenders(fallbackRes.data);
        }
      } catch (e) {
        toast.error("Failed to fetch lenders list.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLenderOrder = async () => {
    setIsSavingLenders(true);
    try {
      const orderedIds = lenders.map((l) => l._id);
      await api.put(
        "/api/lenders/reorder",
        { orderedIds },
        { headers: { "x-admin-secret": adminSecret } }
      );
      toast.success("Lender priorities saved successfully!");
    } catch (error) {
      toast.error("Failed to save lender priorities. Invalid secret key.");
    } finally {
      setIsSavingLenders(false);
    }
  };

  const handleOpenAddLender = () => {
    setEditingLender(null);
    setLenderFormData({
      name: "",
      logo: "",
      UTM: "",
      minIncome: 15000,
      age: 21,
      loanAmount: "Up to ₹5,00,000",
      interestRate: "Starting from 1.5% per month",
      processingFee: "Starting from 2%",
      ratings: 4.5,
      features: "Instant Approval, Paperless Process, Quick Disbursal",
      pincodes: "*",
      loanTypes: "instant, personal",
      isActive: true,
    });
    setLenderFormTab("general");
    setIsLenderModalOpen(true);
  };

  const handleOpenEditLender = (lender: Lender) => {
    setEditingLender(lender);
    setLenderFormTab("general");
    setLenderFormData({
      name: lender.name || "",
      logo: lender.logo || "",
      UTM: lender.UTM || "",
      minIncome: lender.minIncome || 15000,
      age: lender.age || 21,
      loanAmount: lender.loanAmount || "Up to ₹5,00,000",
      interestRate: lender.interestRate || "Starting from 1.5% per month",
      processingFee: lender.processingFee || "Starting from 2%",
      ratings: lender.ratings || 4.5,
      features: Array.isArray(lender.features) ? lender.features.join(", ") : (lender.features || ""),
      pincodes: Array.isArray(lender.pincodes) ? lender.pincodes.join(", ") : (lender.pincodes || "*"),
      loanTypes: Array.isArray(lender.loanTypes) ? lender.loanTypes.join(", ") : (lender.loanTypes || "instant, personal"),
      isActive: lender.isActive !== false,
    });
    setIsLenderModalOpen(true);
  };

  const handleSubmitLenderForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lenderFormData.name.trim()) {
      toast.error("Please enter a lender name.");
      return;
    }
    setIsSubmittingLender(true);
    try {
      if (editingLender) {
        // Update existing lender
        await api.put(
          `/api/lenders/${editingLender._id}`,
          lenderFormData,
          { headers: { "x-admin-secret": adminSecret } }
        );
        toast.success(`Lender "${lenderFormData.name}" updated successfully!`);
      } else {
        // Add new lender
        await api.post(
          "/api/lenders",
          lenderFormData,
          { headers: { "x-admin-secret": adminSecret } }
        );
        toast.success(`Lender "${lenderFormData.name}" added successfully!`);
      }
      setIsLenderModalOpen(false);
      fetchLenders();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to save lender.");
    } finally {
      setIsSubmittingLender(false);
    }
  };

  const handleToggleLenderActive = async (lender: Lender) => {
    try {
      const nextStatus = lender.isActive === false ? true : false;
      await api.put(
        `/api/lenders/${lender._id}`,
        { isActive: nextStatus },
        { headers: { "x-admin-secret": adminSecret } }
      );
      setLenders(prev => prev.map(l => l._id === lender._id ? { ...l, isActive: nextStatus } : l));
      toast.success(`${lender.name} is now ${nextStatus ? "Active (Live)" : "Inactive (Hidden)"}`);
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  const handleDeleteLender = async (id: string) => {
    try {
      await api.delete(`/api/lenders/${id}`, {
        headers: { "x-admin-secret": adminSecret }
      });
      setLenders(prev => prev.filter(l => l._id !== id));
      setDeleteConfirmId(null);
      toast.success("Lender deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete lender.");
    }
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/auth-gate-70898/leads", {
        params: {
          page: leadsPage,
          limit: 10,
          search: leadsSearch,
          status: leadsStatus,
          lender: leadsLender,
          startDate: leadsStartDate,
          endDate: leadsEndDate,
        },
        headers: { "x-admin-secret": adminSecret }
      });
      if (res.data && res.data.success) {
        setLeads(res.data.leads);
        setLeadsTotal(res.data.total);
        setLeadsPages(res.data.pages);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        handleLock();
      } else {
        toast.error("Failed to load leads list.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await api.get("/api/auth-gate-70898/stats", {
        headers: { "x-admin-secret": adminSecret }
      });
      if (res.data && res.data.success) {
        setStats(res.data.stats);
      }
    } catch (error: any) {
      console.error("Failed to fetch dashboard stats:", error);
      if (error.response?.status === 403) {
        handleLock();
      }
    }
  };

  const handleFollowUpToggle = async (leadId: string, currentVal: boolean) => {
    try {
      const res = await api.put(
        `/api/auth-gate-70898/leads/${leadId}/followup`,
        { followedUp: !currentVal },
        { headers: { "x-admin-secret": adminSecret } }
      );
      if (res.data && res.data.success) {
        // Update local state
        setLeads(prevLeads =>
          prevLeads.map(lead => (lead._id === leadId ? { ...lead, followedUp: !currentVal } : lead))
        );
        fetchStats(); // update status counts
        toast.success(`Follow-up marked as ${!currentVal ? "Done" : "Pending"}`);
      }
    } catch (error) {
      toast.error("Failed to update follow-up status.");
    }
  };

  const fetchDeletions = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/auth-gate-70898/deletions", {
        params: {
          page: deletionsPage,
          limit: 10,
          status: deletionsStatus
        },
        headers: { "x-admin-secret": adminSecret }
      });
      if (res.data && res.data.success) {
        setDeletions(res.data.requests);
        setDeletionsTotal(res.data.total);
        setDeletionsPages(res.data.pages);
      }
    } catch (error) {
      toast.error("Failed to load account deletion requests.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletionAction = async (id: string, action: "approve" | "reject") => {
    const confirmation = window.confirm(`Are you sure you want to ${action} this deletion request?`);
    if (!confirmation) return;

    try {
      const res = await api.post(
        `/api/auth-gate-70898/deletions/${id}/action`,
        { action },
        { headers: { "x-admin-secret": adminSecret } }
      );
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        fetchDeletions();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to process request");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLeadsPage(1);
    fetchLeads();
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const res = await api.get("/api/auth-gate-70898/leads", {
        params: {
          limit: "all",
          search: leadsSearch,
          status: leadsStatus,
          lender: leadsLender,
          startDate: leadsStartDate,
          endDate: leadsEndDate,
        },
        headers: { "x-admin-secret": adminSecret }
      });

      if (!res.data || !res.data.success || !res.data.leads || res.data.leads.length === 0) {
        toast.info("No leads available to export in selected range/filters.");
        return;
      }

      const allLeads = res.data.leads;
      const headers = ["Name", "Phone", "Global Status", "Followed Up", "Applied Lenders", "Applied Date"];
      const rows = allLeads.map((lead: Lead) => [
        `"${lead.name}"`,
        `"${lead.phone}"`,
        `"${lead.loanStatus.toUpperCase()}"`,
        lead.followedUp ? '"YES"' : '"NO"',
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
      toast.success("CSV Export Completed!");
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
      case "success":
        return base + "bg-emerald-100 text-emerald-800 border border-emerald-300";
      case "rejected":
      case "failed":
        return base + "bg-rose-100 text-rose-800 border border-rose-300";
      case "disbursed":
        return base + "bg-blue-100 text-blue-800 border border-blue-300";
      case "applied":
      case "pending":
        return base + "bg-amber-100 text-amber-800 border border-amber-300";
      default:
        return base + "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E5] font-sans flex flex-col md:flex-row relative overflow-hidden z-0">
      <ToastContainer position="top-right" style={{ marginTop: "100px" }} />

      {/* Decorative Gradients */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF7819]/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* -------------------------------------------------------------
          Responsive Mobile Header (Hamburger Menu)
         ------------------------------------------------------------- */}
      <div className="md:hidden w-full bg-[#08101E] text-white p-4.5 flex justify-between items-center shadow-lg relative z-30">
        <Link href="/" className="flex items-center gap-3">
          <img src="/image/logo.png" alt="CoverMantra Logo" className="w-9 h-9 object-contain" />
          <h1 className="text-lg font-black tracking-tight uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
            CM ADMIN
          </h1>
        </Link>
        {isAuthenticated && (
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        )}
      </div>

      {/* Mobile Sidebar Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed top-18 left-0 w-full bg-[#08101E] border-b border-white/5 shadow-2xl z-20 flex flex-col p-6 gap-3"
          >
            <button
              onClick={() => { setActiveTab("leads"); setIsMobileMenuOpen(false); }}
              className={`px-5 py-4 rounded-xl text-left font-black text-sm flex items-center gap-3 ${
                activeTab === "leads" ? "bg-[#FF7819] text-white" : "text-gray-400"
              }`}
            >
              <Users className="w-5 h-5" /> Leads Database CRM
            </button>
            <button
              onClick={() => { setActiveTab("lenders"); setIsMobileMenuOpen(false); }}
              className={`px-5 py-4 rounded-xl text-left font-black text-sm flex items-center gap-3 ${
                activeTab === "lenders" ? "bg-[#FF7819] text-white" : "text-gray-400"
              }`}
            >
              <Sliders className="w-5 h-5" /> Lender Priorities
            </button>
            <button
              onClick={() => { setActiveTab("deletions"); setIsMobileMenuOpen(false); }}
              className={`px-5 py-4 rounded-xl text-left font-black text-sm flex items-center gap-3 ${
                activeTab === "deletions" ? "bg-[#FF7819] text-white" : "text-gray-400"
              }`}
            >
              <UserX className="w-5 h-5" /> Deletion Requests
            </button>
            <div className="border-t border-white/5 pt-4 flex justify-between items-center text-xs">
              <span className="text-green-500 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Portal Active
              </span>
              <button onClick={() => { handleLock(); setIsMobileMenuOpen(false); }} className="text-red-500 font-black">
                LOCK CRM
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          Desktop Sidebar Panel (Collapsible)
         ------------------------------------------------------------- */}
      <div 
        className={`hidden md:flex flex-col justify-between shrink-0 bg-[#08101E] text-white shadow-2xl border-r border-white/5 z-20 min-h-screen transition-all duration-300 relative ${
          isSidebarCollapsed ? "w-22" : "w-76"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className={`p-6 border-b border-white/5 flex items-center gap-3 relative ${isSidebarCollapsed ? "justify-center" : ""}`}>
            <Link href="/" className="shrink-0 flex items-center justify-center">
              <img src="/image/logo.png" alt="CoverMantra Logo" className="w-10 h-10 object-contain shrink-0 hover:scale-105 transition-transform" />
            </Link>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="text-[#FF7819] font-black tracking-[0.25em] text-[10px] uppercase">
                  CoverMantra
                </span>
                <h1 className="text-xl font-black italic tracking-tighter">
                  ADMIN PORTAL
                </h1>
              </div>
            )}
            
            {/* Collapse toggle button */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FF7819] text-white border border-[#08101E] flex items-center justify-center hover:scale-110 transition-transform shadow-md z-30"
            >
              {isSidebarCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Navigation Links */}
          {isAuthenticated && (
            <div className="p-4 space-y-2">
              <button
                onClick={() => setActiveTab("leads")}
                className={`w-full px-4 py-4 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3.5 transition-all ${
                  activeTab === "leads"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Leads Database CRM"
              >
                <Users className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Leads Database</span>}
              </button>
              <button
                onClick={() => setActiveTab("lenders")}
                className={`w-full px-4 py-4 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3.5 transition-all ${
                  activeTab === "lenders"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Lender Priorities"
              >
                <Sliders className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Lender priorities</span>}
              </button>
              <button
                onClick={() => setActiveTab("deletions")}
                className={`w-full px-4 py-4 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3.5 transition-all ${
                  activeTab === "deletions"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Deletion Requests"
              >
                <UserX className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Deletion Requests</span>}
              </button>
            </div>
          )}
        </div>

        {/* Lock Status Footer */}
        <div className="p-4 border-t border-white/5 bg-black/10">
          {isAuthenticated ? (
            <div className={`flex items-center justify-between ${isSidebarCollapsed ? "flex-col gap-3 justify-center" : ""}`}>
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
                  <span className="text-xs font-bold text-gray-400">Portal Active</span>
                </div>
              )}
              <button
                onClick={handleLock}
                className="text-[10px] uppercase font-black text-red-500 hover:text-red-400 hover:underline flex items-center gap-1.5"
                title="Lock CRM"
              >
                <Lock className="w-3.5 h-3.5" />
                {!isSidebarCollapsed && <span>Lock CRM</span>}
              </button>
            </div>
          ) : (
            <span className="text-xs font-bold text-gray-500 block text-center">Locked</span>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------
          Main Content Container
         ------------------------------------------------------------- */}
      <div className="flex-grow p-6 md:p-12 relative overflow-y-auto max-h-screen">
        {!isAuthenticated ? (
          /* Lock Screen Card */
          <div className="min-h-[75vh] flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-100 text-center"
            >
              <div className="w-20 h-20 bg-[#FFF4E5] text-[#FF7819] rounded-full flex items-center justify-center mx-auto mb-6 shadow-md border border-[#FF7819]/10">
                <Lock className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-black text-[#08101E] tracking-tight mb-2">Unlock CRM</h2>
              <p className="text-gray-500 font-bold text-sm mb-8">Enter the Admin Secret Key to access leads database and configuration settings.</p>
              
              <div className="space-y-4">
                <input
                  type="password"
                  disabled={lockoutTimeLeft !== null || isAuthenticating}
                  placeholder={lockoutTimeLeft !== null ? `Locked Out: Try in ${lockoutTimeLeft}s` : "Enter Secret Key"}
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                  className="w-full px-5 py-4.5 bg-gray-50 border-2 border-transparent focus:border-[#FF7819] focus:bg-white rounded-2xl outline-none font-bold text-center tracking-widest text-[#08101E] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <button
                  disabled={lockoutTimeLeft !== null || isAuthenticating || !adminSecret.trim()}
                  onClick={handleUnlock}
                  className="w-full bg-[#FF7819] text-white py-4.5 rounded-2xl font-black hover:bg-[#08101E] shadow-xl shadow-[#FF7819]/25 hover:shadow-none transition-all active:scale-98 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> VERIFYING...
                    </>
                  ) : lockoutTimeLeft !== null ? (
                    <>
                      <Lock className="w-5 h-5" /> LOCKED OUT
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5" /> UNLOCK DATABASE
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Authenticated Dashboard Dashboard Area */
          <>
            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8">
              <span>Admin</span>
              <span className="text-gray-300">/</span>
              <span className="text-[#FF7819]">
                {activeTab === "leads" && "Leads CRM"}
                {activeTab === "lenders" && "Lender Priorities"}
                {activeTab === "deletions" && "Deletion Requests"}
              </span>
            </div>

            {/* Render Lead stats dashboard when activeTab is Leads */}
            {activeTab === "leads" && stats && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Metric Card 1: Today's Leads */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4 hover:scale-102 transition-transform">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-[#FF7819] shrink-0 border border-amber-100">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Today's Leads</span>
                    <h3 className="text-2xl font-black text-[#08101E] leading-none mt-1">{stats.todayLeads}</h3>
                  </div>
                </div>

                {/* Metric Card 2: Monthly Leads */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4 hover:scale-102 transition-transform">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0 border border-blue-100">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">This Month</span>
                    <h3 className="text-2xl font-black text-[#08101E] leading-none mt-1">{stats.monthLeads}</h3>
                  </div>
                </div>

                {/* Metric Card 3: Source Breakdown */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md flex flex-col justify-center hover:scale-102 transition-transform">
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block mb-2">Sources (App vs Web)</span>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Smartphone className="w-4 h-4" /> App: <span className="font-black">{stats.sources.app}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#FF7819]">
                      <Globe className="w-4 h-4" /> Web: <span className="font-black">{stats.sources.web}</span>
                    </div>
                  </div>
                </div>

                {/* Metric Card 4: Follow-up Status */}
                <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-md flex items-center gap-4 hover:scale-102 transition-transform">
                  <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 border border-emerald-100">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Follow-up status</span>
                    <div className="text-xs font-bold text-gray-500 mt-1 leading-none">
                      Done: <span className="text-emerald-600 font-black text-sm">{stats.followUp.done}</span> | 
                      Pending: <span className="text-rose-500 font-black text-sm ml-1">{stats.followUp.pending}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* -------------------------------------------------------------
                    TAB 1: LEADS CRM DATABASE
                   ------------------------------------------------------------- */}
                {activeTab === "leads" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl font-black text-[#08101E] tracking-tight">Customer Leads CRM</h2>
                      <p className="text-gray-500 font-bold mt-1">Review active user applications and raw bank eligibility response logs.</p>
                    </div>

                    {/* Filters bar */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-md border border-gray-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
                      <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:max-w-md">
                        <div className="relative flex-grow">
                          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search Name, Phone..."
                            value={leadsSearch}
                            onChange={(e) => setLeadsSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-55 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FF7819] font-bold text-sm text-[#08101E]"
                          />
                        </div>
                        <button type="submit" className="bg-[#08101E] text-white px-6 rounded-xl font-black hover:bg-[#FF7819] transition-colors">
                          SEARCH
                        </button>
                      </form>

                      <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1">
                          <span className="text-[10px] uppercase font-black text-gray-400">From:</span>
                          <input
                            type="date"
                            value={leadsStartDate}
                            onChange={(e) => { setLeadsStartDate(e.target.value); setLeadsPage(1); }}
                            className="bg-transparent font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1">
                          <span className="text-[10px] uppercase font-black text-gray-400">To:</span>
                          <input
                            type="date"
                            value={leadsEndDate}
                            onChange={(e) => { setLeadsEndDate(e.target.value); setLeadsPage(1); }}
                            className="bg-transparent font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer"
                          />
                        </div>

                        <select
                          value={leadsStatus}
                          onChange={(e) => { setLeadsStatus(e.target.value); setLeadsPage(1); }}
                          className="px-4 py-3 bg-gray-55 border border-gray-200 rounded-xl font-bold text-sm text-[#08101E] focus:outline-none cursor-pointer"
                        >
                          <option value="all">All Statuses</option>
                          <option value="applied">Applied</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                          <option value="disbursed">Disbursed</option>
                        </select>

                        <select
                          value={leadsLender}
                          onChange={(e) => { setLeadsLender(e.target.value); setLeadsPage(1); }}
                          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-sm text-[#08101E] focus:outline-none cursor-pointer"
                        >
                          <option value="all">All Lenders</option>
                          <option value="zype">Zype</option>
                          <option value="moneyview">MoneyView</option>
                          <option value="vivifi">Vivifi</option>
                          <option value="fatakPay">FatakPay</option>
                          <option value="credify">Credify</option>
                        </select>

                        <button
                          onClick={handleExportCSV}
                          disabled={isExporting}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-xl font-black flex items-center gap-2 shadow-md transition-all active:scale-98 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isExporting ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" /> EXPORTING...
                            </>
                          ) : (
                            <>
                              <FileSpreadsheet className="w-4 h-4" /> EXPORT EXCEL
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Leads Data Table */}
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-xl overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-100 text-left">
                          <thead className="bg-gray-50 font-black text-[#08101E]/40 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                            <tr>
                              <th className="px-6 py-4">Lead Details</th>
                              <th className="px-6 py-4">Application Source</th>
                              <th className="px-6 py-4">Status</th>
                              <th className="px-6 py-4 text-center">Follow-up</th>
                              <th className="px-6 py-4">Lender Responses</th>
                              <th className="px-6 py-4">Created Date</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100 text-[#08101E]">
                            {loading ? (
                              <tr>
                                <td colSpan={6} className="text-center py-10 font-bold text-gray-400">Loading leads database...</td>
                              </tr>
                            ) : leads.length === 0 ? (
                              <tr>
                                <td colSpan={6} className="text-center py-10 font-bold text-gray-400">No matching leads found.</td>
                              </tr>
                            ) : (
                              leads.map((lead) => (
                                <tr key={lead._id} className="hover:bg-[#FFF4E5]/25 transition-colors">
                                  {/* Column 1: Details */}
                                  <td className="px-6 py-4">
                                    <div className="font-black text-base">{lead.name}</div>
                                    <div className="text-xs font-semibold text-gray-500">{lead.phone}</div>
                                  </td>
                                  {/* Column 3: Application Source */}
                                  <td className="px-6 py-4">
                                    <div className="text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                                      {lead.loanAmount ? (
                                        <span className="text-emerald-600 font-bold">Amt: ₹{lead.loanAmount.toLocaleString("en-IN")} |</span>
                                      ) : null}
                                      {lead.source === "app" ? (
                                        <span className="text-blue-600 flex items-center gap-0.5"><Smartphone className="w-3.5 h-3.5" /> Mobile App</span>
                                      ) : (
                                        <span className="text-[#FF7819] flex items-center gap-0.5"><Globe className="w-3.5 h-3.5" /> Website</span>
                                      )}
                                    </div>
                                  </td>
                                  {/* Column 4: Status badge */}
                                  <td className="px-6 py-4">
                                    <span className={getStatusBadge(lead.loanStatus)}>
                                      {lead.loanStatus}
                                    </span>
                                  </td>
                                  {/* Column 5: Follow-up Toggle Switch */}
                                  <td className="px-6 py-4 text-center">
                                    <label className="inline-flex items-center cursor-pointer select-none">
                                      <input
                                        type="checkbox"
                                        checked={lead.followedUp}
                                        onChange={() => handleFollowUpToggle(lead._id, lead.followedUp)}
                                        className="sr-only peer"
                                      />
                                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                      <span className="ml-2 text-xs font-black uppercase text-gray-400 peer-checked:text-emerald-700 w-10 text-left">
                                        {lead.followedUp ? "Done" : "Pend"}
                                      </span>
                                    </label>
                                  </td>
                                  {/* Column 6: Lender Responses */}
                                  <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1">
                                      {lead.lenderResponses.map((r, i) => (
                                        <button
                                          key={i}
                                          onClick={() => setSelectedResponse(r)}
                                          className="text-left text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1"
                                        >
                                          📄 {r.lenderName}
                                        </button>
                                      ))}
                                      {lead.lenderResponses.length === 0 && (
                                        <span className="text-xs font-bold text-gray-400 italic">None triggered</span>
                                      )}
                                    </div>
                                  </td>
                                  {/* Column 7: Created Date */}
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
                      {leadsPages > 1 && (
                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                          <div className="text-xs font-semibold text-gray-500">
                            Page <span className="font-bold">{leadsPage}</span> of <span className="font-bold">{leadsPages}</span> ({leadsTotal} leads)
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setLeadsPage(p => Math.max(1, p - 1))}
                              disabled={leadsPage === 1}
                              className="px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold bg-white text-[#08101E] hover:bg-gray-100 disabled:opacity-40 transition-colors"
                            >
                              PREVIOUS
                            </button>
                            <button
                              onClick={() => setLeadsPage(p => Math.min(leadsPages, p + 1))}
                              disabled={leadsPage === leadsPages}
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

                {/* -------------------------------------------------------------
                    TAB 2: LENDER PRIORITIES & DYNAMIC MANAGEMENT
                   ------------------------------------------------------------- */}
                {activeTab === "lenders" && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-3xl md:text-4xl font-black text-[#08101E] tracking-tight">Dynamic Lender Network</h2>
                          <span className="bg-[#FF7819]/10 text-[#FF7819] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            {lenders.length} Total
                          </span>
                        </div>
                        <p className="text-gray-500 font-bold mt-1 text-sm">
                          Add new lenders, update UTM links & logos, toggle live visibility, or drag to reorder priorities.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <button
                          onClick={handleOpenAddLender}
                          className="flex-1 md:flex-initial bg-gradient-to-r from-[#FF7819] to-[#E65C00] hover:scale-102 text-white px-6 py-3.5 rounded-2xl font-black transition-all shadow-lg active:scale-98 text-sm flex items-center justify-center gap-2"
                        >
                          <Plus className="w-5 h-5" /> ADD NEW LENDER
                        </button>
                        <button
                          onClick={handleSaveLenderOrder}
                          disabled={isSavingLenders || loading}
                          className="flex-1 md:flex-initial bg-[#08101E] hover:bg-[#FF7819] text-white px-6 py-3.5 rounded-2xl font-black transition-all shadow-md active:scale-98 text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          <RefreshCw className={`w-4 h-4 ${isSavingLenders ? "animate-spin" : ""}`} />
                          {isSavingLenders ? "Saving Order..." : "SAVE ORDER"}
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                      <div className="hidden lg:grid grid-cols-12 gap-4 px-8 py-5 border-b border-gray-100 bg-gray-50/80 font-black text-[#08101E]/40 uppercase tracking-[0.2em] text-[10px] md:text-xs">
                        <div className="col-span-1 text-center">Rank</div>
                        <div className="col-span-5">Lender & Campaign Link</div>
                        <div className="col-span-2 text-center">Eligibility</div>
                        <div className="col-span-2 text-center">Live Status</div>
                        <div className="col-span-2 text-center">Actions</div>
                      </div>

                      {loading && lenders.length === 0 ? (
                        <p className="text-center py-12 font-bold text-gray-400">Loading lenders configuration...</p>
                      ) : lenders.length === 0 ? (
                        <div className="text-center py-16 px-4">
                          <p className="text-gray-400 font-bold text-lg mb-4">No lenders currently configured.</p>
                          <button
                            onClick={handleOpenAddLender}
                            className="bg-[#FF7819] text-white px-6 py-3 rounded-xl font-black text-sm"
                          >
                            + Create First Lender
                          </button>
                        </div>
                      ) : (
                        <Reorder.Group axis="y" values={lenders} onReorder={setLenders} className="divide-y divide-gray-100 list-none p-0 m-0">
                          {lenders.map((lender, index) => (
                            <Reorder.Item 
                              key={lender._id} 
                              value={lender}
                              className="grid grid-cols-1 lg:grid-cols-12 gap-4 px-6 md:px-8 py-5 md:py-6 items-center bg-white hover:bg-[#FFF4E5]/30 cursor-grab active:cursor-grabbing transition-colors relative group"
                            >
                              {/* Rank */}
                              <div className="hidden lg:flex col-span-1 items-center justify-center font-black text-[#08101E]/20 text-xl group-hover:text-[#FF7819] transition-colors">
                                 #{index + 1}
                              </div>
                              
                              {/* Lender Info & Logo */}
                              <div className="col-span-1 lg:col-span-5 flex items-start sm:items-center gap-4">
                                <div className="lg:hidden font-black text-[#08101E]/30 text-lg w-7">
                                  #{index + 1}
                                </div>
                                <div className="w-14 h-14 flex-shrink-0 bg-[#FFF4E5] rounded-2xl flex items-center justify-center p-2.5 shadow-sm border border-[#FF7819]/10 overflow-hidden">
                                  {lender.logo ? (
                                    <img src={lender.logo} alt={lender.name} className="max-w-full max-h-full object-contain" />
                                  ) : (
                                    <span className="font-black text-[#FF7819] text-xs">NO LOGO</span>
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="font-black text-[#08101E] text-base md:text-lg tracking-tight truncate">{lender.name}</h3>
                                    {lender.loanAmount && (
                                      <span className="text-[10px] bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-md border border-blue-100">
                                        {lender.loanAmount}
                                      </span>
                                    )}
                                  </div>
                                  {lender.UTM ? (
                                    <a
                                      href={lender.UTM}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      onClick={(e) => e.stopPropagation()}
                                      className="text-xs text-[#FF7819] hover:underline flex items-center gap-1 font-semibold truncate mt-1 max-w-[280px]"
                                      title={lender.UTM}
                                    >
                                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                      <span className="truncate">{lender.UTM}</span>
                                    </a>
                                  ) : (
                                    <p className="text-[11px] text-gray-400 font-semibold italic mt-0.5">No UTM link assigned</p>
                                  )}
                                </div>
                              </div>

                              {/* Eligibility */}
                              <div className="col-span-1 lg:col-span-2 text-left lg:text-center text-xs">
                                <span className="lg:hidden text-gray-400 font-bold uppercase text-[10px] mr-2">Eligibility:</span>
                                <span className="font-black text-[#08101E]">₹{(lender.minIncome || 0).toLocaleString('en-IN')}+</span>
                                <span className="text-gray-400 font-semibold ml-1">/ Age {lender.age || 21}+</span>
                              </div>

                              {/* Live Status Toggle */}
                              <div className="col-span-1 lg:col-span-2 flex items-center lg:justify-center">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleToggleLenderActive(lender);
                                  }}
                                  className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all ${
                                    lender.isActive !== false
                                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                                      : "bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200"
                                  }`}
                                  title="Click to toggle active status"
                                >
                                  {lender.isActive !== false ? (
                                    <>
                                      <Eye className="w-3.5 h-3.5 text-emerald-600" /> ACTIVE (LIVE)
                                    </>
                                  ) : (
                                    <>
                                      <EyeOff className="w-3.5 h-3.5 text-gray-400" /> INACTIVE (HIDDEN)
                                    </>
                                  )}
                                </button>
                              </div>

                              {/* Actions */}
                              <div className="col-span-1 lg:col-span-2 flex items-center justify-end lg:justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditLender(lender);
                                  }}
                                  className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-[#FF7819] text-gray-600 hover:text-white rounded-xl transition-all"
                                  title="Edit Lender"
                                >
                                  <Edit3 className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDeleteConfirmId(lender._id);
                                  }}
                                  className="w-9 h-9 flex items-center justify-center bg-gray-100 hover:bg-rose-600 text-gray-600 hover:text-white rounded-xl transition-all"
                                  title="Delete Lender"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <div className="hidden lg:flex w-9 h-9 items-center justify-center text-gray-300 group-hover:text-[#FF7819] cursor-grab" title="Drag to reorder">
                                  <Sliders className="w-4 h-4" />
                                </div>
                              </div>
                            </Reorder.Item>
                          ))}
                        </Reorder.Group>
                      )}
                    </div>
                  </div>
                )}

                {/* -------------------------------------------------------------
                    TAB 3: ACCOUNT DELETION REQUESTS
                   ------------------------------------------------------------- */}
                {activeTab === "deletions" && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-4xl font-black text-[#08101E] tracking-tight">Account Deletions CRM</h2>
                      <p className="text-gray-500 font-bold mt-1">Manage user account wiping requests. Approving will delete the user profile from the database.</p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex gap-2 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm w-fit">
                      <button
                        onClick={() => { setDeletionsStatus("pending"); setDeletionsPage(1); }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                          deletionsStatus === "pending" ? "bg-red-500 text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        Pending
                      </button>
                      <button
                        onClick={() => { setDeletionsStatus("approved"); setDeletionsPage(1); }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                          deletionsStatus === "approved" ? "bg-emerald-600 text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        Approved
                      </button>
                      <button
                        onClick={() => { setDeletionsStatus("rejected"); setDeletionsPage(1); }}
                        className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                          deletionsStatus === "rejected" ? "bg-gray-600 text-white shadow-md" : "text-gray-400 hover:bg-gray-50"
                        }`}
                      >
                        Rejected
                      </button>
                    </div>

                    {/* Deletions Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {loading ? (
                        <p className="col-span-full text-center py-10 font-bold text-gray-400">Loading deletion requests...</p>
                      ) : deletions.length === 0 ? (
                        <div className="col-span-full bg-white p-12 rounded-[2.5rem] text-center border border-gray-100 shadow-sm">
                          <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                          <h4 className="font-black text-xl text-[#08101E]">All Caught Up</h4>
                          <p className="text-gray-400 font-bold text-sm mt-1">No {deletionsStatus} account deletion requests found.</p>
                        </div>
                      ) : (
                        deletions.map((req) => (
                          <div key={req._id} className="bg-white p-8 rounded-[2rem] shadow-md border border-gray-100 flex flex-col justify-between hover:scale-101 transition-all">
                            <div className="space-y-4">
                              <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <div>
                                  <h4 className="font-black text-lg text-[#08101E] tracking-tight">{req.phone}</h4>
                                </div>
                                <span className={getStatusBadge(req.status)}>{req.status}</span>
                              </div>
                              <div>
                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest block mb-1">Reason for request:</span>
                                <p className="text-sm font-bold text-gray-600 bg-gray-50/50 p-4 rounded-2xl border border-gray-100 leading-snug">{req.message}</p>
                              </div>
                            </div>

                            {req.status === "pending" && (
                              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-50">
                                <button
                                  onClick={() => handleDeletionAction(req._id, "approve")}
                                  className="flex-grow bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
                                >
                                  Approve Delete <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeletionAction(req._id, "reject")}
                                  className="px-6 py-3.5 border border-gray-200 text-gray-500 hover:bg-gray-50 rounded-xl font-black text-xs uppercase tracking-wider transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>

      {/* =============================================================
          MODAL: ADD / EDIT LENDER
         ============================================================= */}
      {isLenderModalOpen && (
        <div className="fixed inset-0 bg-[#08101E]/80 backdrop-blur-md flex items-center justify-center p-4 z-[200] overflow-y-auto">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl p-6 md:p-8 border border-white/20 shadow-2xl relative my-8">
            <button
              onClick={() => setIsLenderModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 text-gray-600 hover:bg-[#FF7819] hover:text-white transition-all font-black flex items-center justify-center"
            >
              ✕
            </button>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-5 h-5 text-[#FF7819]" />
              <h3 className="text-2xl font-black text-[#08101E] tracking-tight">
                {editingLender ? "Edit Lender Partner" : "Add New Lender Partner"}
              </h3>
            </div>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">
              {editingLender ? `Update details for ${editingLender.name}` : "Configure affiliate links, logo and eligibility criteria"}
            </p>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-100 mb-6 gap-2">
              <button
                type="button"
                onClick={() => setLenderFormTab("general")}
                className={`flex-1 pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
                  lenderFormTab === "general"
                    ? "border-[#FF7819] text-[#FF7819]"
                    : "border-transparent text-gray-400 hover:text-[#08101E]"
                }`}
              >
                <Globe className="w-4 h-4" />
                General Info
              </button>
              <button
                type="button"
                onClick={() => setLenderFormTab("terms")}
                className={`flex-1 pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
                  lenderFormTab === "terms"
                    ? "border-[#FF7819] text-[#FF7819]"
                    : "border-transparent text-gray-400 hover:text-[#08101E]"
                }`}
              >
                <Layers className="w-4 h-4" />
                Terms & Features
              </button>
              <button
                type="button"
                onClick={() => setLenderFormTab("eligibility")}
                className={`flex-1 pb-3 text-xs md:text-sm font-bold uppercase tracking-wider transition-all border-b-2 flex items-center justify-center gap-2 ${
                  lenderFormTab === "eligibility"
                    ? "border-[#FF7819] text-[#FF7819]"
                    : "border-transparent text-gray-400 hover:text-[#08101E]"
                }`}
              >
                <Sliders className="w-4 h-4" />
                Rules & Status
              </button>
            </div>

            <form onSubmit={handleSubmitLenderForm} className="space-y-5">
              
              {/* TAB 1: GENERAL INFO */}
              {lenderFormTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-gray-400" />
                        Lender Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. KreditBee"
                        value={lenderFormData.name}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        Direct UTM Link / Apply URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://partner.com/?utm_source=covermantra"
                        value={lenderFormData.UTM}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, UTM: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-gray-400" />
                      Logo Image URL
                    </label>
                    <div className="flex gap-4 items-start">
                      <input
                        type="url"
                        placeholder="https://example.com/logo.png"
                        value={lenderFormData.logo}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, logo: e.target.value })}
                        className="flex-1 px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                      <div className="w-16 h-16 rounded-2xl bg-[#FFF4E5] border border-[#FF7819]/20 p-2 flex items-center justify-center flex-shrink-0 shadow-inner">
                        {lenderFormData.logo ? (
                          <img src={lenderFormData.logo} alt="Preview" className="max-w-full max-h-full object-contain filter drop-shadow-sm" />
                        ) : (
                          <span className="text-[10px] text-gray-400 font-bold text-center">No Logo</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-gray-400" />
                      Loan Types / Categories (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. instant, personal, short_term"
                      value={lenderFormData.loanTypes}
                      onChange={(e) => setLenderFormData({ ...lenderFormData, loanTypes: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: TERMS & FEATURES */}
              {lenderFormTab === "terms" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Sliders className="w-3.5 h-3.5 text-gray-400" />
                        Max Loan Limit
                      </label>
                      <input
                        type="text"
                        placeholder="Up to ₹5,00,000"
                        value={lenderFormData.loanAmount}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, loanAmount: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gray-400" />
                        Rating (1-5)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        min="1"
                        max="5"
                        value={lenderFormData.ratings}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, ratings: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <FileSpreadsheet className="w-3.5 h-3.5 text-gray-400" />
                        Processing Fee
                      </label>
                      <input
                        type="text"
                        placeholder="Starting from 2%"
                        value={lenderFormData.processingFee}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, processingFee: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      Interest Rate Description
                    </label>
                    <input
                      type="text"
                      placeholder="Starting from 1.5% per month"
                      value={lenderFormData.interestRate}
                      onChange={(e) => setLenderFormData({ ...lenderFormData, interestRate: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Plus className="w-3.5 h-3.5 text-gray-400" />
                      Key Features (Comma separated list)
                    </label>
                    <input
                      type="text"
                      placeholder="Instant Approval, Paperless Process, Direct Bank Transfer"
                      value={lenderFormData.features}
                      onChange={(e) => setLenderFormData({ ...lenderFormData, features: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3: ELIGIBILITY & RULES */}
              {lenderFormTab === "eligibility" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        Min Monthly Income (₹)
                      </label>
                      <input
                        type="number"
                        value={lenderFormData.minIncome}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, minIncome: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        Min Age Required
                      </label>
                      <input
                        type="number"
                        value={lenderFormData.age}
                        onChange={(e) => setLenderFormData({ ...lenderFormData, age: Number(e.target.value) })}
                        className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black text-gray-500 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5 text-gray-400" />
                      Target Pincodes (* for All India)
                    </label>
                    <input
                      type="text"
                      placeholder="* or 110001, 400001, 500001"
                      value={lenderFormData.pincodes}
                      onChange={(e) => setLenderFormData({ ...lenderFormData, pincodes: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50/50 hover:bg-gray-50 border border-gray-200 focus:border-[#FF7819] rounded-xl font-bold text-sm text-[#08101E] focus:outline-none focus:ring-2 focus:ring-[#FF7819]/10 transition-all"
                    />
                  </div>

                  <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                    <div>
                      <span className="font-black text-sm text-[#08101E] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#FF7819]" />
                        Live Active Status
                      </span>
                      <span className="text-[10px] text-gray-400 font-semibold block mt-0.5">Toggle visibility on the main website portal</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLenderFormData({ ...lenderFormData, isActive: !lenderFormData.isActive })}
                      className="focus:outline-none transition-transform active:scale-95"
                    >
                      {lenderFormData.isActive ? (
                        <ToggleRight className="w-12 h-12 text-[#FF7819]" />
                      ) : (
                        <ToggleLeft className="w-12 h-12 text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
                <button
                  type="button"
                  onClick={() => setIsLenderModalOpen(false)}
                  className="px-5 py-3 border border-gray-200 text-gray-500 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                
                <div className="flex-1 flex gap-2 justify-end">
                  {lenderFormTab !== "general" && (
                    <button
                      type="button"
                      onClick={() => {
                        if (lenderFormTab === "terms") setLenderFormTab("general");
                        else if (lenderFormTab === "eligibility") setLenderFormTab("terms");
                      }}
                      className="px-5 py-3 border border-gray-200 text-gray-600 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  )}
                  
                  {lenderFormTab !== "eligibility" ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (lenderFormTab === "general") setLenderFormTab("terms");
                        else if (lenderFormTab === "terms") setLenderFormTab("eligibility");
                      }}
                      className="px-6 py-3 bg-[#08101E] text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-opacity-90 transition-all flex items-center gap-1"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmittingLender}
                      className="px-8 py-3 bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white rounded-xl font-black text-xs uppercase tracking-wider shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmittingLender ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Saving...
                        </>
                      ) : editingLender ? (
                        "Save Changes"
                      ) : (
                        "Add Partner"
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =============================================================
          MODAL: DELETE CONFIRMATION
         ============================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-[#08101E]/80 backdrop-blur-md flex items-center justify-center p-4 z-[210]">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-6 md:p-8 border border-white/20 shadow-2xl text-center">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-[#08101E] mb-2">Delete Lender Partner?</h3>
            <p className="text-gray-500 font-bold text-sm mb-6">
              Are you sure you want to delete this lender? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 px-4 py-3 border border-gray-200 text-gray-600 rounded-xl font-black text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDeleteLender(deleteConfirmId)}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-3 rounded-xl font-black text-sm shadow-md"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* JSON Payload Modal */}
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
