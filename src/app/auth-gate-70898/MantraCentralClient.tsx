"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Reorder, motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "@/lib/axios";
import BlogsManager from "./BlogsManager";
import { 
  Menu, 
  X, 
  Users, 
  Sliders, 
  UserX, 
  BookOpen,
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
  Sparkles,
  MessageSquare,
  PhoneCall,
  Zap,
  ShieldCheck,
  Activity
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

export default function MantraCentral() {
  const [activeTab, setActiveTab] = useState<"leads" | "lenders" | "deletions" | "blogs">("leads");
  
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

  // Operational Suite States (Privacy Mode, Live Auto-Sync, Security Audit)
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [accessLogs, setAccessLogs] = useState<Array<{ id: string; timestamp: string; device: string; status: string }>>([]);

  const maskPhone = (phone: string) => {
    if (!isPrivacyMode || !phone) return phone;
    const clean = phone.replace(/\D/g, "");
    if (clean.length < 5) return "******";
    return clean.slice(0, 5) + "*****";
  };

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
      const lastActive = sessionStorage.getItem("cm_last_active");
      if (lastActive && Date.now() - Number(lastActive) > 5 * 60 * 1000) {
        sessionStorage.removeItem("co_admin_secret");
        sessionStorage.removeItem("cm_last_active");
        setAdminSecret("");
        setIsAuthenticated(false);
      } else {
        setAdminSecret(cachedSecret);
        setIsAuthenticated(true);
        sessionStorage.setItem("cm_last_active", String(Date.now()));
      }
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

  const handleLock = (reason?: string | React.MouseEvent) => {
    sessionStorage.removeItem("co_admin_secret");
    sessionStorage.removeItem("cm_last_active");
    setAdminSecret("");
    setIsAuthenticated(false);
    if (typeof reason === "string" && reason.trim()) {
      toast.warning(reason);
    } else {
      toast.info("Mantra Central Locked.");
    }
  };

  // Inactivity / Idle Logout Timer (Strict 5 minutes of no user activity)
  useEffect(() => {
    if (!isAuthenticated) return;

    const INACTIVITY_LIMIT_MS = 5 * 60 * 1000; // 5 minutes

    let timeoutId: NodeJS.Timeout;

    const performLock = () => {
      handleLock("Mantra Central locked due to 5 minutes of inactivity.");
    };

    const resetTimer = () => {
      sessionStorage.setItem("cm_last_active", String(Date.now()));
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(performLock, INACTIVITY_LIMIT_MS);
    };

    const checkInactivity = () => {
      const stored = sessionStorage.getItem("cm_last_active");
      const lastActive = stored ? Number(stored) : Date.now();
      const elapsed = Date.now() - lastActive;

      if (elapsed >= INACTIVITY_LIMIT_MS) {
        performLock();
      } else {
        const remaining = INACTIVITY_LIMIT_MS - elapsed;
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(performLock, remaining);
      }
    };

    // Events to monitor user activity
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    // Throttling timer resets to avoid resetting too frequently on continuous mouse movements
    let lastReset = 0;
    const throttledReset = () => {
      const now = Date.now();
      if (now - lastReset > 1000) { // reset at most once per second
        lastReset = now;
        resetTimer();
      }
    };

    // Initialize timer immediately
    resetTimer();

    // Check immediately when tab becomes visible or gains focus (handles background tab throttling)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkInactivity();
      }
    };

    events.forEach((event) => {
      window.addEventListener(event, throttledReset, { passive: true });
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", checkInactivity);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, throttledReset);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("focus", checkInactivity);
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
        sessionStorage.setItem("cm_last_active", String(Date.now()));
        setIsAuthenticated(true);
        localStorage.removeItem("co_admin_failed_attempts");

        // Record Node Access Audit Log
        try {
          const logEntry = {
            id: Date.now().toString(),
            timestamp: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
            device: typeof window !== "undefined" && window.innerWidth < 768 ? "Mobile Terminal" : "Operations Workstation",
            status: "Authorized Session"
          };
          const existingLogs = JSON.parse(localStorage.getItem("cm_access_logs") || "[]");
          localStorage.setItem("cm_access_logs", JSON.stringify([logEntry, ...existingLogs].slice(0, 15)));
        } catch (e) {}

        toast.success("Mantra Central Unlocked!");
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

  const fetchLeads = async (showLoader = true) => {
    if (showLoader) setLoading(true);
    else setIsSyncing(true);
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
        // Detect new incoming leads during background sync
        if (!showLoader && leads.length > 0 && res.data.leads?.length > 0 && res.data.leads[0]._id !== leads[0]._id) {
          toast.success("✨ New incoming lead received in pipeline!");
        }
        setLeads(res.data.leads);
        setLeadsTotal(res.data.total);
        setLeadsPages(res.data.pages);
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        handleLock();
      } else if (showLoader) {
        toast.error("Failed to load leads list.");
      }
    } finally {
      if (showLoader) setLoading(false);
      else setIsSyncing(false);
    }
  };

  // Live Auto-Sync 30s Polling Stream
  useEffect(() => {
    if (!isAuthenticated || !isAutoSync || activeTab !== "leads") return;
    const interval = setInterval(() => {
      fetchLeads(false);
      fetchStats();
    }, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, isAutoSync, activeTab, leadsPage, leadsStatus, leadsLender, leadsStartDate, leadsEndDate]);

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
    const base = "px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider inline-flex items-center gap-1 ";
    switch (status) {
      case "approved":
      case "success":
        return base + "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]";
      case "rejected":
      case "failed":
        return base + "bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-[0_4px_12px_rgba(244,63,94,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]";
      case "disbursed":
        return base + "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]";
      case "applied":
      case "pending":
        return base + "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]";
      default:
        return base + "bg-gradient-to-r from-slate-600 to-slate-700 text-white shadow-sm";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF9] via-[#FFF6ED] to-[#FDF0E2] font-sans flex flex-col md:flex-row relative overflow-hidden z-0">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Pixar Studio Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-amber-300/20 via-[#FF7819]/15 to-transparent rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-400/10 via-indigo-300/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* -------------------------------------------------------------
          Responsive Sleek Mobile Header (Mantra Central)
         ------------------------------------------------------------- */}
      <div className="md:hidden w-full bg-[#08101E] text-white px-4 py-2.5 h-14 flex justify-between items-center shadow-md relative z-30 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative shrink-0">
            <img src="/image/logo.png" alt="CoverMantra Logo" className="w-8 h-8 object-contain" />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-[#08101E] animate-pulse"></span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-xs font-black tracking-wider uppercase text-white">MANTRA</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#FF7819] text-white font-black tracking-widest uppercase shadow-[0_2px_6px_rgba(255,120,25,0.4)]">
                CENTRAL
              </span>
            </div>
            <span className="text-[8px] font-bold text-white/40 tracking-widest uppercase mt-0.5">
              Operations Node
            </span>
          </div>
        </Link>
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPrivacyMode(!isPrivacyMode)}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                isPrivacyMode
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm"
                  : "bg-white/5 text-white/70 border-white/10 hover:text-white"
              }`}
              title="Toggle Discreet Masking Mode"
            >
              {isPrivacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="w-8 h-8 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg active:scale-95 transition-transform shadow-inner cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile Sidebar Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="md:hidden fixed top-14 left-0 w-full bg-[#08101E]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl z-20 flex flex-col p-5 gap-2.5"
          >
            <button
              onClick={() => { setActiveTab("leads"); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-left font-black text-sm flex items-center gap-3 transition-all ${
                activeTab === "leads" ? "bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white shadow-lg shadow-[#FF7819]/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <Users className="w-4 h-4" /> Leads Pipeline
            </button>
            <button
              onClick={() => { setActiveTab("lenders"); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-left font-black text-sm flex items-center gap-3 transition-all ${
                activeTab === "lenders" ? "bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white shadow-lg shadow-[#FF7819]/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <Sliders className="w-4 h-4" /> Routing Engine
            </button>
            <button
              onClick={() => { setActiveTab("deletions"); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-left font-black text-sm flex items-center gap-3 transition-all ${
                activeTab === "deletions" ? "bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white shadow-lg shadow-[#FF7819]/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <UserX className="w-4 h-4" /> Compliance & Purge
            </button>
            <button
              onClick={() => { setActiveTab("blogs"); setIsMobileMenuOpen(false); }}
              className={`px-4 py-3 rounded-xl text-left font-black text-sm flex items-center gap-3 transition-all ${
                activeTab === "blogs" ? "bg-gradient-to-r from-[#FF7819] to-[#E65C00] text-white shadow-lg shadow-[#FF7819]/30" : "text-gray-400 hover:text-white"
              }`}
            >
              <BookOpen className="w-4 h-4" /> Editorial & Blogs
            </button>
            <div className="border-t border-white/5 pt-3 flex justify-between items-center text-xs">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span> Central Node Active
              </span>
              <button onClick={() => { handleLock(); setIsMobileMenuOpen(false); }} className="text-rose-400 font-black hover:text-rose-300 transition-colors">
                LOCK CENTRAL
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
          Desktop Sidebar Panel (Mantra Central)
         ------------------------------------------------------------- */}
      <div 
        className={`hidden md:flex flex-col justify-between shrink-0 bg-[#08101E] text-white shadow-2xl border-r border-white/5 z-20 min-h-screen transition-all duration-300 relative ${
          isSidebarCollapsed ? "w-22" : "w-76"
        }`}
      >
        <div>
          {/* Brand Header */}
          <div className={`px-5 py-3.5 h-16 border-b border-white/5 flex items-center gap-3.5 relative ${isSidebarCollapsed ? "justify-center" : ""}`}>
            <Link href="/" className="shrink-0 relative group">
              <img src="/image/logo.png" alt="CoverMantra Logo" className="w-9 h-9 object-contain shrink-0 group-hover:scale-105 transition-transform" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#08101E] animate-pulse"></span>
            </Link>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-black tracking-tight text-base">MANTRA</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-[#FF7819] text-white font-black tracking-widest uppercase shadow-[0_2px_6px_rgba(255,120,25,0.4)]">
                    CENTRAL
                  </span>
                </div>
                <span className="text-white/40 font-bold tracking-[0.2em] text-[8px] uppercase mt-0.5">
                  Operations Node
                </span>
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
            <div className="p-3 space-y-1.5">
              <button
                onClick={() => setActiveTab("leads")}
                className={`w-full px-3.5 py-3 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3 transition-all ${
                  activeTab === "leads"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Leads Pipeline"
              >
                <Users className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Leads Pipeline</span>}
              </button>
              <button
                onClick={() => setActiveTab("lenders")}
                className={`w-full px-3.5 py-3 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3 transition-all ${
                  activeTab === "lenders"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Routing Engine"
              >
                <Sliders className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Routing Engine</span>}
              </button>
              <button
                onClick={() => setActiveTab("deletions")}
                className={`w-full px-3.5 py-3 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3 transition-all ${
                  activeTab === "deletions"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Compliance & Purge"
              >
                <UserX className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Compliance & Purge</span>}
              </button>
              <button
                onClick={() => setActiveTab("blogs")}
                className={`w-full px-3.5 py-3 rounded-xl font-black text-sm tracking-tight text-left flex items-center gap-3 transition-all ${
                  activeTab === "blogs"
                    ? "bg-[#FF7819] text-white shadow-lg shadow-[#FF7819]/20 scale-102"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                } ${isSidebarCollapsed ? "justify-center" : ""}`}
                title="Editorial & Blogs"
              >
                <BookOpen className="w-5 h-5 shrink-0" />
                {!isSidebarCollapsed && <span>Editorial & Blogs</span>}
              </button>
            </div>
          )}
        </div>

        {/* Lock Status Footer */}
        <div className="p-3.5 border-t border-white/5 bg-black/10">
          {isAuthenticated ? (
            <div className={`flex items-center justify-between ${isSidebarCollapsed ? "flex-col gap-2.5 justify-center" : ""}`}>
              {!isSidebarCollapsed && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span className="text-xs font-bold text-gray-400">Central Active</span>
                </div>
              )}
              <button
                onClick={() => handleLock()}
                className="text-[10px] uppercase font-black text-rose-400 hover:text-rose-300 hover:underline flex items-center gap-1.5"
                title="Lock Central"
              >
                <Lock className="w-3.5 h-3.5" />
                {!isSidebarCollapsed && <span>Lock Central</span>}
              </button>
            </div>
          ) : (
            <span className="text-xs font-bold text-gray-500 block text-center">Protected</span>
          )}
        </div>
      </div>

      {/* -------------------------------------------------------------
          Main Content Container
         ------------------------------------------------------------- */}
      <div className="flex-grow p-3 sm:p-5 md:p-8 pt-3 sm:pt-4 md:pt-6 pb-20 md:pb-10 relative overflow-y-auto max-h-screen">
        {!isAuthenticated ? (
          /* Pixar 3D Studio Lock Screen */
          <div className="min-h-[75vh] flex items-center justify-center relative py-2 md:py-4">
            {/* Soft Warm Studio Ambient Lighting */}
            <div className="absolute w-96 h-96 bg-gradient-to-tr from-amber-400/20 to-[#FF7819]/25 rounded-full blur-[120px] pointer-events-none -top-12 -left-12 animate-pulse" style={{ animationDuration: '5s' }} />
            <div className="absolute w-96 h-96 bg-gradient-to-bl from-blue-400/15 to-cyan-400/15 rounded-full blur-[120px] pointer-events-none -bottom-12 -right-12" />

            {/* Floating 3D Gold Coin 1 */}
            <motion.div
              animate={{ y: [0, -14, 0], rotate: [0, 8, -4, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="hidden lg:flex absolute top-12 left-16 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_30px_rgba(245,158,11,0.35)] items-center justify-center text-amber-950 font-black text-2xl border-2 border-white/60 select-none pointer-events-none z-10"
            >
              ₹
            </motion.div>

            {/* Floating 3D Gold Coin 2 */}
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [0, -6, 6, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              className="hidden lg:flex absolute bottom-16 right-20 w-14 h-14 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-200 p-1 shadow-[0_15px_30px_rgba(245,158,11,0.35)] items-center justify-center text-amber-950 font-black text-xl border-2 border-white/60 select-none pointer-events-none z-10"
            >
              ₹
            </motion.div>

            {/* Pixar Claymorphic Card */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              className="bg-gradient-to-b from-white via-[#FFFDFB] to-[#FFF7ED]/80 backdrop-blur-2xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_70px_-15px_rgba(255,120,25,0.22),0_15px_35px_rgba(0,0,0,0.06),inset_0_3px_6px_rgba(255,255,255,1)] max-w-md w-full border-4 border-white text-center relative z-20"
            >
              {/* Deep 3D Pixar Claymorphic Vault Shield */}
              <motion.div
                animate={{ y: [0, -8, 0], rotateZ: [0, 1.5, -1.5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-28 h-28 mx-auto mb-6 group cursor-pointer"
              >
                {/* Volumetric Studio Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#FF7819] via-amber-400 to-yellow-300 rounded-[2.5rem] rotate-6 opacity-40 blur-xl group-hover:opacity-75 transition-opacity"></div>
                {/* Physical 3D Extruded Clay Sphere/Vault */}
                <div className="relative w-28 h-28 rounded-[2.5rem] bg-gradient-to-b from-white via-[#FFF6EB] to-[#FED7AA] flex items-center justify-center border-4 border-white shadow-[0_20px_40px_rgba(255,120,25,0.25),inset_0_4px_8px_rgba(255,255,255,1),inset_0_-4px_8px_rgba(234,88,12,0.18)]">
                  <div className="w-15 h-15 rounded-2xl bg-gradient-to-tr from-[#FF7819] via-[#FF8A33] to-[#FFA756] flex items-center justify-center text-white shadow-[0_10px_20px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.7)] group-hover:scale-105 transition-transform">
                    <Lock className="w-8 h-8 drop-shadow-md" />
                  </div>
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white animate-pulse shadow-lg"></span>
              </motion.div>

              {/* Pillowy Badge */}
              <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FF7819]/15 to-amber-100/70 text-[#FF7819] text-[11px] font-black uppercase tracking-wider mb-3 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] border border-[#FF7819]/25">
                <Sparkles className="w-3.5 h-3.5 text-[#FF7819]" /> Mantra Central Vault
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[#08101E] tracking-tight mb-2">
                Authenticate Access
              </h2>
              <p className="text-gray-500 font-bold text-xs md:text-sm mb-7 leading-relaxed max-w-xs mx-auto">
                Provide Master Authorization Token to initialize central telemetry and pipeline streams.
              </p>
              
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="password"
                    disabled={lockoutTimeLeft !== null || isAuthenticating}
                    placeholder={lockoutTimeLeft !== null ? `Locked Out: Try in ${lockoutTimeLeft}s` : "Enter Master Access Token"}
                    value={adminSecret}
                    onChange={(e) => setAdminSecret(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                    className="w-full px-5 py-4.5 bg-slate-50/90 border-2 border-slate-200/80 focus:border-[#FF7819] focus:bg-white rounded-[1.8rem] outline-none font-bold text-center tracking-widest text-[#08101E] transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-[inset_0_2px_5px_rgba(0,0,0,0.05)] text-base"
                  />
                </div>

                {/* Tactile 3D Extruded Candy Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.96, y: 3 }}
                  disabled={lockoutTimeLeft !== null || isAuthenticating || !adminSecret.trim()}
                  onClick={handleUnlock}
                  className="w-full bg-gradient-to-r from-[#FF7819] via-[#FF8A33] to-[#E65C00] text-white py-4.5 rounded-[1.8rem] font-black shadow-[0_8px_0_#C2410C,0_18px_30px_rgba(234,88,12,0.4),inset_0_2px_4px_rgba(255,255,255,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wider active:shadow-[0_2px_0_#C2410C]"
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" /> INITIALIZING...
                    </>
                  ) : lockoutTimeLeft !== null ? (
                    <>
                      <Lock className="w-5 h-5" /> LOCKED OUT
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5" /> INITIALIZE CENTRAL NODE
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Authenticated Dashboard Area */
          <>
            {/* Breadcrumb Trail & Quick Security Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 md:mb-6">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
                <span className="flex items-center gap-1.5 text-[#08101E]">
                  <span className="w-2 h-2 rounded-full bg-[#FF7819] animate-pulse"></span>
                  Mantra Central
                </span>
                <span className="text-gray-300">/</span>
                <span className="text-[#FF7819] font-black">
                  {activeTab === "leads" && "Leads Pipeline"}
                  {activeTab === "lenders" && "Routing Engine"}
                  {activeTab === "deletions" && "Compliance & Purge"}
                  {activeTab === "blogs" && "Editorial & Blogs CMS"}
                </span>
              </div>

              {/* Quick Controls: Discreet Masking Mode & Security Audit */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPrivacyMode(!isPrivacyMode)}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
                    isPrivacyMode
                      ? "bg-amber-100 text-amber-900 border-amber-300 shadow-[0_2px_8px_rgba(245,158,11,0.25)]"
                      : "bg-white text-gray-600 hover:text-[#08101E] border-slate-200"
                  }`}
                  title="Toggle Screen Masking (Hide/Mask Customer Numbers)"
                >
                  {isPrivacyMode ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-gray-500" />}
                  <span>{isPrivacyMode ? "Privacy Mode (Masked)" : "Discreet Mode"}</span>
                </button>

                <button
                  onClick={() => {
                    const stored = JSON.parse(localStorage.getItem("cm_access_logs") || "[]");
                    setAccessLogs(stored);
                    setShowAuditModal(true);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-gray-600 hover:text-[#08101E] border border-slate-200 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  title="View Node Security Audit History"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="hidden sm:inline">Audit Logs</span>
                </button>
              </div>
            </div>

            {/* 3D Pixar Claymorphic Status Strip */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-white via-orange-50/40 to-white p-5 rounded-[2.5rem] border-3 border-white shadow-[0_15px_35px_rgba(255,120,25,0.06),inset_0_2px_4px_rgba(255,255,255,1)] mb-8 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-13 h-13 rounded-2xl overflow-hidden shadow-[0_8px_20px_rgba(255,120,25,0.2),inset_0_2px_4px_rgba(255,255,255,0.9)] border-2 border-white bg-white p-2.5 shrink-0 flex items-center justify-center">
                  <img src="/image/logo.png" alt="Mantra Central Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base md:text-lg font-black text-[#08101E]">
                      Mantra Central
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black tracking-wider uppercase flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Node Active
                    </span>
                  </div>
                  <p className="text-xs font-bold text-gray-500 mt-0.5">
                    Central operations console. All provider routing engines and data streams are synchronized.
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex items-center gap-2">
                <div className="px-3.5 py-1.5 rounded-xl bg-amber-100/70 text-amber-900 text-xs font-black flex items-center gap-1.5 shadow-sm border border-amber-200/50">
                  <span>🪙</span> Token Clearance: Master Level 5
                </div>
              </div>
            </motion.div>

            {/* Render Lead stats dashboard when activeTab is Leads (Pixar Claymorphic 3D Bento) */}
            {activeTab === "leads" && stats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Bento Card 1: Today's Intake */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group bg-gradient-to-b from-white via-white to-amber-50/30 p-5 rounded-[2.2rem] border-2 border-white shadow-[0_15px_30px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_rgba(255,120,25,0.12)] transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-13 h-13 bg-gradient-to-tr from-amber-400 to-[#FF7819] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-[0_8px_16px_rgba(255,120,25,0.35),inset_0_2px_3px_rgba(255,255,255,0.6)] group-hover:rotate-6 transition-transform">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider">Today's Intake</span>
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#08101E] leading-none mt-1">{stats.todayLeads}</h3>
                    </div>
                  </div>
                </motion.div>

                {/* Bento Card 2: Monthly Cycle */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group bg-gradient-to-b from-white via-white to-blue-50/30 p-5 rounded-[2.2rem] border-2 border-white shadow-[0_15px_30px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] transition-shadow relative overflow-hidden"
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-13 h-13 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-[0_8px_16px_rgba(59,130,246,0.35),inset_0_2px_3px_rgba(255,255,255,0.6)] group-hover:rotate-6 transition-transform">
                      <Layers className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Cycle Volume</span>
                      <h3 className="text-2xl md:text-3xl font-black text-[#08101E] leading-none mt-1">{stats.monthLeads}</h3>
                    </div>
                  </div>
                </motion.div>

                {/* Bento Card 3: Source Telemetry */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group bg-gradient-to-b from-white via-white to-slate-50/50 p-5 rounded-[2.2rem] border-2 border-white shadow-[0_15px_30px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] flex flex-col justify-between relative overflow-hidden"
                >
                  <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block mb-1">Ingestion Stream</span>
                  <div className="flex items-center justify-between font-bold text-sm">
                    <div className="flex items-center gap-1.5 text-blue-600">
                      <Smartphone className="w-4 h-4" /> App: <span className="font-black text-base">{stats.sources.app}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#FF7819]">
                      <Globe className="w-4 h-4" /> Web: <span className="font-black text-base">{stats.sources.web}</span>
                    </div>
                  </div>
                  {/* Visual ratio bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-2 overflow-hidden flex p-0.5 border border-slate-200/50 shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" 
                      style={{ width: `${(stats.sources.app + stats.sources.web) > 0 ? (stats.sources.app / (stats.sources.app + stats.sources.web)) * 100 : 50}%` }} 
                    />
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-[#FF7819] h-full rounded-full" 
                      style={{ width: `${(stats.sources.app + stats.sources.web) > 0 ? (stats.sources.web / (stats.sources.app + stats.sources.web)) * 100 : 50}%` }} 
                    />
                  </div>
                </motion.div>

                {/* Bento Card 4: Action Telemetry */}
                <motion.div 
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 350, damping: 20 }}
                  className="group bg-gradient-to-b from-white via-white to-emerald-50/30 p-5 rounded-[2.2rem] border-2 border-white shadow-[0_15px_30px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] transition-shadow flex items-center gap-4 relative overflow-hidden"
                >
                  <div className="w-13 h-13 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-[0_8px_16px_rgba(16,185,129,0.35),inset_0_2px_3px_rgba(255,255,255,0.6)] group-hover:rotate-6 transition-transform">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-black tracking-wider block">Follow-up Action</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100/80 text-emerald-800 font-black text-xs shadow-sm">
                        Done: {stats.followUp.done}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-rose-100/80 text-rose-800 font-black text-xs shadow-sm">
                        Pending: {stats.followUp.pending}
                      </span>
                    </div>
                  </div>
                </motion.div>
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
                    TAB 1: LEADS PIPELINE STREAM
                   ------------------------------------------------------------- */}
                {activeTab === "leads" && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF7819]/10 text-[#FF7819] text-[10px] font-black uppercase tracking-widest mb-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Pipeline Telemetry
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black text-[#08101E] tracking-tight">
                          Customer Leads Pipeline
                        </h2>
                        <p className="text-gray-500 font-bold text-xs md:text-sm mt-0.5">
                          Review real-time applications, bank response logs, and lead dispatches.
                        </p>
                      </div>

                      {/* AI Quick Filters */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider mr-1">
                          Quick:
                        </span>
                        <motion.button
                          whileHover={{ y: -2, scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => { setLeadsStatus("approved"); setLeadsPage(1); }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                            leadsStatus === "approved"
                              ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-[0_4px_12px_rgba(16,185,129,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]"
                              : "bg-white text-emerald-700 hover:bg-emerald-50/80 border-2 border-emerald-200/80 shadow-sm"
                          }`}
                        >
                          Approved
                        </motion.button>
                        <motion.button
                          whileHover={{ y: -2, scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => { setLeadsStatus("disbursed"); setLeadsPage(1); }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                            leadsStatus === "disbursed"
                              ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]"
                              : "bg-white text-blue-700 hover:bg-blue-50/80 border-2 border-blue-200/80 shadow-sm"
                          }`}
                        >
                          Disbursed
                        </motion.button>
                        <motion.button
                          whileHover={{ y: -2, scale: 1.04 }}
                          whileTap={{ scale: 0.95 }}
                          type="button"
                          onClick={() => { setLeadsStatus("applied"); setLeadsPage(1); }}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                            leadsStatus === "applied"
                              ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-[0_4px_12px_rgba(245,158,11,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.6)]"
                              : "bg-white text-amber-700 hover:bg-amber-50/80 border-2 border-amber-200/80 shadow-sm"
                          }`}
                        >
                          Applied
                        </motion.button>
                        {(leadsStatus !== "all" || leadsLender !== "all" || leadsSearch) && (
                          <motion.button
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            type="button"
                            onClick={() => {
                              setLeadsStatus("all");
                              setLeadsLender("all");
                              setLeadsSearch("");
                              setLeadsStartDate("");
                              setLeadsEndDate("");
                              setLeadsPage(1);
                            }}
                            className="px-3 py-1.5 rounded-full text-xs font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 shadow-inner cursor-pointer"
                          >
                            Reset
                          </motion.button>
                        )}

                        {/* Live Auto-Sync 30s Stream Button */}
                        <button
                          type="button"
                          onClick={() => setIsAutoSync(!isAutoSync)}
                          className={`px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 border transition-all cursor-pointer shadow-sm ${
                            isAutoSync
                              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                              : "bg-gray-100 text-gray-400 border-gray-200"
                          }`}
                          title="Toggle 30s Real-time background sync"
                        >
                          <span className={`w-2 h-2 rounded-full ${isAutoSync ? "bg-emerald-500 animate-ping" : "bg-gray-400"}`}></span>
                          <span>{isAutoSync ? "Live Stream (30s)" : "Stream Paused"}</span>
                          {isSyncing && <RefreshCw className="w-3 h-3 animate-spin text-emerald-600" />}
                        </button>
                      </div>
                    </div>

                    {/* Filters bar */}
                    <div className="bg-gradient-to-b from-white via-white to-slate-50/70 p-6 rounded-[2.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05),inset_0_2px_4px_rgba(255,255,255,1)] border-3 border-white flex flex-col lg:flex-row gap-4 items-center justify-between">
                      <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full lg:max-w-md">
                        <div className="relative flex-grow">
                          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search Name, Phone..."
                            value={leadsSearch}
                            onChange={(e) => setLeadsSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 bg-slate-50/80 border-2 border-slate-200/80 rounded-2xl focus:outline-none focus:border-[#FF7819] focus:bg-white font-bold text-sm text-[#08101E] shadow-[inset_0_2px_4px_rgba(0,0,0,0.04)] transition-all"
                          />
                        </div>
                        <button 
                          type="submit" 
                          className="bg-gradient-to-r from-[#08101E] to-[#1E293B] hover:from-[#FF7819] hover:to-[#E65C00] text-white px-6 rounded-2xl font-black shadow-[0_5px_0_#060B15,0_10px_18px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.3)] active:translate-y-1 active:shadow-[0_1px_0_#060B15] transition-all cursor-pointer text-xs uppercase tracking-wider"
                        >
                          SEARCH
                        </button>
                      </form>

                      <div className="flex flex-wrap gap-2.5 w-full lg:w-auto justify-end">
                        <div className="flex items-center gap-1.5 bg-slate-50/90 border-2 border-slate-200/80 rounded-2xl px-3.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
                          <span className="text-[10px] uppercase font-black text-gray-400">From:</span>
                          <input
                            type="date"
                            value={leadsStartDate}
                            onChange={(e) => { setLeadsStartDate(e.target.value); setLeadsPage(1); }}
                            className="bg-transparent font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center gap-1.5 bg-slate-50/90 border-2 border-slate-200/80 rounded-2xl px-3.5 py-1.5 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]">
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
                          className="px-4 py-3 bg-slate-50/90 border-2 border-slate-200/80 rounded-2xl font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
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
                          className="px-4 py-3 bg-slate-50/90 border-2 border-slate-200/80 rounded-2xl font-bold text-xs text-[#08101E] focus:outline-none cursor-pointer shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
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
                          className="bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-700 text-white px-5 py-3 rounded-2xl font-black flex items-center gap-2 shadow-[0_5px_0_#047857,0_12px_20px_rgba(16,185,129,0.35),inset_0_1.5px_2px_rgba(255,255,255,0.5)] active:translate-y-1 active:shadow-[0_1px_0_#047857] transition-all text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                    <div className="bg-white/95 backdrop-blur-2xl rounded-[2.8rem] border-4 border-white shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,1)] overflow-hidden">
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
                                    <div className="text-xs font-bold text-gray-500 font-mono tracking-wide mt-0.5">
                                      {maskPhone(lead.phone)}
                                    </div>
                                    {/* 1-Click WhatsApp & Call Direct Action */}
                                    <div className="flex items-center gap-1.5 mt-2">
                                      <a
                                        href={`https://wa.me/91${lead.phone.replace(/\D/g, "")}?text=${encodeURIComponent(
                                          `Namaste ${lead.name}, CoverMantra se aapki loan application ke regarding connect kar rahe hain. Kya aap abhi baat karne ke liye available hain?`
                                        )}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 text-[10px] font-black transition-all shadow-xs active:scale-95 cursor-pointer"
                                        title="1-Tap WhatsApp Chat"
                                      >
                                        <MessageSquare className="w-2.5 h-2.5" /> WhatsApp
                                      </a>
                                      <a
                                        href={`tel:+91${lead.phone.replace(/\D/g, "")}`}
                                        onClick={(e) => e.stopPropagation()}
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 text-[10px] font-black transition-all shadow-xs active:scale-95 cursor-pointer"
                                        title="Direct Phone Call"
                                      >
                                        <PhoneCall className="w-2.5 h-2.5" /> Call
                                      </a>
                                    </div>
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

                                  {/* Approval Velocity Telemetry Meter */}
                                  <div className="flex items-center gap-2 mt-2">
                                    <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden flex border border-slate-200/60 shadow-inner">
                                      <div 
                                        className="bg-gradient-to-r from-amber-400 to-[#FF7819] h-full rounded-full" 
                                        style={{ width: `${Math.min(95, Math.max(38, 82 - index * 8))}%` }} 
                                      />
                                    </div>
                                    <span className="text-[10px] font-black text-amber-700 flex items-center gap-0.5">
                                      <Zap className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> {Math.min(95, Math.max(38, 82 - index * 8))}% Velocity
                                    </span>
                                  </div>
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

                {/* -------------------------------------------------------------
                    TAB 4: EDITORIAL & BLOGS CMS
                   ------------------------------------------------------------- */}
                {activeTab === "blogs" && (
                  <BlogsManager adminSecret={adminSecret} />
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

      {/* Node Access Security Audit Modal */}
      {showAuditModal && (
        <div className="fixed inset-0 bg-[#08101E]/80 backdrop-blur-md flex items-center justify-center p-4 z-[200]">
          <div className="bg-white rounded-[2.5rem] w-full max-w-xl p-6 md:p-8 border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.3)] relative">
            <button
              onClick={() => setShowAuditModal(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-[#FF7819] hover:text-white transition-all font-black flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#08101E] tracking-tight">
                  Node Access Audit Logs
                </h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Recent Authorization Timestamps
                </span>
              </div>
            </div>

            <div className="mt-6 divide-y divide-gray-100 max-h-[50vh] overflow-y-auto pr-1">
              {accessLogs.length === 0 ? (
                <p className="text-center py-8 text-xs font-bold text-gray-400">No recent access sessions recorded.</p>
              ) : (
                accessLogs.map((log) => (
                  <div key={log.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-black text-[#08101E] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {log.status}
                      </div>
                      <div className="text-[11px] font-bold text-gray-400 mt-0.5">{log.device}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-black text-slate-700 font-mono">{log.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <button
                onClick={() => {
                  localStorage.removeItem("cm_access_logs");
                  setAccessLogs([]);
                  toast.info("Access logs cleared.");
                }}
                className="text-xs font-black text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear History
              </button>
              <button
                onClick={() => setShowAuditModal(false)}
                className="px-5 py-2.5 bg-[#08101E] text-white rounded-xl font-black text-xs hover:bg-[#FF7819] transition-colors cursor-pointer"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          Mobile Sticky Bottom Navigation Bar (Mantra Central)
         ------------------------------------------------------------- */}
      {isAuthenticated && (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#08101E]/95 backdrop-blur-xl border-t border-white/10 px-4 py-2.5 flex items-center justify-around z-40 shadow-2xl">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === "leads" ? "text-[#FF7819]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">Pipeline</span>
          </button>
          <button
            onClick={() => setActiveTab("lenders")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === "lenders" ? "text-[#FF7819]" : "text-gray-400 hover:text-white"
            }`}
          >
            <Sliders className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">Routing</span>
          </button>
          <button
            onClick={() => setActiveTab("deletions")}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              activeTab === "deletions" ? "text-[#FF7819]" : "text-gray-400 hover:text-white"
            }`}
          >
            <UserX className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">Compliance</span>
          </button>
          <button
            onClick={() => handleLock()}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl text-rose-400 hover:text-rose-300 transition-all cursor-pointer"
          >
            <Lock className="w-5 h-5" />
            <span className="text-[10px] font-black tracking-tight">Lock</span>
          </button>
        </div>
      )}
    </div>
  );
}
