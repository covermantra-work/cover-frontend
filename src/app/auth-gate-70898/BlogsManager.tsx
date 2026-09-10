"use client";

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "@/lib/axios";
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  CheckCircle,
  Clock,
  Sparkles,
  Calendar,
  X,
  FileText,
  Tag,
  Check,
  ToggleLeft,
  ToggleRight,
  Layers,
  Image as ImageIcon
} from "lucide-react";

interface BlogSection {
  title: string;
  type?: "prose" | "quote" | "highlight" | "list";
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
  highlight?: string;
}

export interface AdminBlogPost {
  _id: string;
  id?: number;
  slug: string;
  legacyId?: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  coverImage: string;
  postedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  featured?: boolean;
  isActive: boolean;
  sections?: BlogSection[];
  keyTakeaways?: string[];
  createdAt?: string;
}

interface BlogsManagerProps {
  adminSecret: string;
}

const AUTHOR_OPTIONS = [
  { name: "CoverMantra Lending Desk", role: "Senior Loan Advisory & Research" },
  { name: "CoverMantra Insurance Advisory", role: "Protection & Risk Research Desk" },
  { name: "CoverMantra Wealth Desk", role: "Financial Planning & Advisory Desk" },
  { name: "CoverMantra Tech Desk", role: "Fintech & AI Research Desk" },
  { name: "CoverMantra Editorial", role: "Strategy & Insights Desk" },
  { name: "CoverMantra Wellness Desk", role: "Mindful Living & Behavioral Research" },
  { name: "CoverMantra Creative Desk", role: "Digital Strategy & Media" }
];

const CATEGORY_OPTIONS = [
  "Loans",
  "Insurance",
  "Finance",
  "Technology",
  "Growth",
  "Mindset",
  "Lifestyle"
];

export default function BlogsManager({ adminSecret }: BlogsManagerProps) {
  const [blogs, setBlogs] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingBlog, setEditingBlog] = useState<AdminBlogPost | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    subtitle: "",
    description: "",
    category: "Loans",
    coverImage: "",
    readTime: "5 min read",
    authorIndex: 0,
    tags: "",
    keyTakeaways: "",
    featured: false,
    isActive: true,
    section1Title: "Introduction & Key Concepts",
    section1Content: "",
    section2Title: "Important Guidelines",
    section2Content: ""
  });

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Helper to get reliable admin auth headers
  const getAuthHeaders = () => {
    const effectiveSecret =
      adminSecret ||
      (typeof window !== "undefined" ? sessionStorage.getItem("co_admin_secret") || "" : "");
    return effectiveSecret ? { "x-admin-secret": effectiveSecret } : {};
  };

  // Fetch blogs from API with multi-endpoint fallback
  const fetchBlogs = async () => {
    setLoading(true);
    const headers = getAuthHeaders();

    // 1. Primary: /api/blogs/admin/all
    try {
      const res = await api.get("/api/blogs/admin/all", { headers });
      if (res.data && res.data.blogs) {
        setBlogs(res.data.blogs);
        setLoading(false);
        return;
      } else if (Array.isArray(res.data)) {
        setBlogs(res.data);
        setLoading(false);
        return;
      }
    } catch (primaryErr: any) {
      console.warn("Primary /api/blogs/admin/all failed, trying auth-gate endpoint:", primaryErr);
    }

    // 2. Secondary: /api/auth-gate-70898/blogs/admin/all
    try {
      const res2 = await api.get("/api/auth-gate-70898/blogs/admin/all", { headers });
      if (res2.data && res2.data.blogs) {
        setBlogs(res2.data.blogs);
        setLoading(false);
        return;
      } else if (Array.isArray(res2.data)) {
        setBlogs(res2.data);
        setLoading(false);
        return;
      }
    } catch (secErr: any) {
      console.warn("Secondary admin blogs endpoint failed, trying public fallback:", secErr);
    }

    // 3. Fallback: Public active blogs /api/blogs
    try {
      const res3 = await api.get("/api/blogs");
      if (Array.isArray(res3.data)) {
        setBlogs(res3.data);
        setLoading(false);
        return;
      }
    } catch (fallbackErr) {
      console.error("Failed to load blogs from all endpoints:", fallbackErr);
      toast.error("Failed to load blogs from server. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [adminSecret]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

    setFormData((prev) => ({
      ...prev,
      title: val,
      // only update slug if user hasn't typed a custom slug or if editing new
      slug: !editingBlog ? generatedSlug : prev.slug
    }));
  };

  // Open Create Modal
  const openCreateModal = () => {
    setEditingBlog(null);
    setFormData({
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      category: "Loans",
      coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80",
      readTime: "5 min read",
      authorIndex: 0,
      tags: "Loans, Finance, CoverMantra",
      keyTakeaways: "Always compare interest rates before applying.\nCheck eligibility without affecting CIBIL score.",
      featured: false,
      isActive: true,
      section1Title: "Introduction & Key Insights",
      section1Content: "",
      section2Title: "Important Tips & Steps",
      section2Content: ""
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const openEditModal = (blog: AdminBlogPost) => {
    setEditingBlog(blog);
    const authorIdx = AUTHOR_OPTIONS.findIndex((a) => a.name === blog.author?.name);

    setFormData({
      title: blog.title || "",
      slug: blog.slug || "",
      subtitle: blog.subtitle || "",
      description: blog.description || "",
      category: blog.category || "Loans",
      coverImage: blog.coverImage || "",
      readTime: blog.readTime || "5 min read",
      authorIndex: authorIdx >= 0 ? authorIdx : 0,
      tags: Array.isArray(blog.tags) ? blog.tags.join(", ") : "",
      keyTakeaways: Array.isArray(blog.keyTakeaways) ? blog.keyTakeaways.join("\n") : "",
      featured: Boolean(blog.featured),
      isActive: blog.isActive !== false,
      section1Title: blog.sections?.[0]?.title || "Introduction",
      section1Content: blog.sections?.[0]?.paragraphs?.join("\n\n") || "",
      section2Title: blog.sections?.[1]?.title || "Details & Analysis",
      section2Content: blog.sections?.[1]?.paragraphs?.join("\n\n") || ""
    });
    setIsModalOpen(true);
  };

  // Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.warning("Title and Description are required!");
      return;
    }

    setIsSubmitting(true);

    const selectedAuthor = AUTHOR_OPTIONS[formData.authorIndex] || AUTHOR_OPTIONS[0];

    const payload = {
      title: formData.title.trim(),
      slug: formData.slug.trim(),
      subtitle: formData.subtitle.trim(),
      description: formData.description.trim(),
      category: formData.category,
      coverImage: formData.coverImage.trim(),
      readTime: formData.readTime.trim(),
      author: {
        name: selectedAuthor.name,
        role: selectedAuthor.role,
        avatar: "/image/logo.png"
      },
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      keyTakeaways: formData.keyTakeaways
        .split("\n")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.featured,
      isActive: formData.isActive,
      sections: [
        {
          title: formData.section1Title.trim() || "Overview",
          type: "prose",
          paragraphs: formData.section1Content
            ? formData.section1Content.split("\n\n").map((p) => p.trim()).filter(Boolean)
            : [formData.description.trim()]
        },
        ...(formData.section2Content
          ? [
              {
                title: formData.section2Title.trim() || "Details",
                type: "prose",
                paragraphs: formData.section2Content.split("\n\n").map((p) => p.trim()).filter(Boolean)
              }
            ]
          : [])
      ]
    };

    try {
      if (editingBlog) {
        // Update
        const res = await api.put(`/api/blogs/${editingBlog._id || editingBlog.slug}`, payload, {
          headers: getAuthHeaders()
        });
        toast.success(res.data?.message || "Blog updated successfully!");
      } else {
        // Create
        const res = await api.post("/api/blogs", payload, {
          headers: getAuthHeaders()
        });
        toast.success(res.data?.message || "Blog published successfully!");
      }

      setIsModalOpen(false);
      fetchBlogs();
    } catch (error: any) {
      console.error("Save blog error:", error);
      toast.error(error.response?.data?.message || "Failed to save blog.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Publish / Draft
  const handleToggleStatus = async (blog: AdminBlogPost) => {
    try {
      const res = await api.patch(
        `/api/blogs/${blog._id || blog.slug}/toggle`,
        {},
        { headers: getAuthHeaders() }
      );
      toast.info(res.data?.message || "Status updated.");
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to toggle status.");
    }
  };

  // Delete Blog
  const handleDelete = async (id: string) => {
    try {
      const res = await api.delete(`/api/blogs/${id}`, {
        headers: getAuthHeaders()
      });
      toast.success(res.data?.message || "Blog deleted successfully!");
      setDeleteConfirmId(null);
      fetchBlogs();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete blog.");
    }
  };

  // Filtered Blogs for Display
  const filteredBlogs = blogs.filter((b) => {
    const matchesCategory = categoryFilter === "all" || b.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && b.isActive !== false) ||
      (statusFilter === "draft" && b.isActive === false);

    const q = search.toLowerCase().trim();
    const matchesSearch =
      !q ||
      b.title.toLowerCase().includes(q) ||
      b.slug.toLowerCase().includes(q) ||
      b.description.toLowerCase().includes(q) ||
      (b.author?.name && b.author.name.toLowerCase().includes(q));

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const publishedCount = blogs.filter((b) => b.isActive !== false).length;
  const draftCount = blogs.filter((b) => b.isActive === false).length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#08101E] to-[#0E172A] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Articles</p>
            <h3 className="text-3xl font-black text-white mt-1">{blogs.length}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-[#FF690B]/10 border border-[#FF690B]/20 text-[#FF690B] flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#08101E] to-[#0E172A] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Published Live</p>
            <h3 className="text-3xl font-black text-white mt-1">{publishedCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-[#08101E] to-[#0E172A] border border-white/10 shadow-xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Drafts / Inactive</p>
            <h3 className="text-3xl font-black text-white mt-1">{draftCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 🛠️ CONTROLS & ADD BUTTON */}
      <div className="p-6 rounded-3xl bg-[#08101E]/90 border border-white/10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, slug, or desk..."
            className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-medium focus:outline-none focus:border-[#FF690B] transition-colors"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-300 focus:outline-none focus:border-[#FF690B] cursor-pointer"
          >
            <option value="all" className="bg-[#08101E]">All Categories</option>
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat} value={cat} className="bg-[#08101E]">{cat}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-xs font-bold text-gray-300 focus:outline-none focus:border-[#FF690B] cursor-pointer"
          >
            <option value="all" className="bg-[#08101E]">All Status</option>
            <option value="published" className="bg-[#08101E]">Published</option>
            <option value="draft" className="bg-[#08101E]">Drafts</option>
          </select>

          {/* "+ Add New Blog" Button */}
          <button
            onClick={openCreateModal}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_8px_20px_rgba(255,105,11,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Blog
          </button>
        </div>
      </div>

      {/* 📋 BLOGS LIST TABLE */}
      <div className="rounded-3xl bg-[#08101E] border border-white/10 shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h4 className="text-base font-black text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#FF690B]" />
            All Blogs ({filteredBlogs.length})
          </h4>
          <span className="text-xs text-gray-400">Stored in local data/blogs.json</span>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-10 h-10 border-4 border-[#FF690B]/20 border-t-[#FF690B] rounded-full animate-spin mx-auto mb-4" />
            Loading blogs...
          </div>
        ) : filteredBlogs.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider bg-white/[0.02]">
                  <th className="px-6 py-4">Article</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Author Desk</th>
                  <th className="px-6 py-4">Published Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredBlogs.map((b) => (
                  <tr key={b._id || b.slug} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Article Thumbnail + Title */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5 max-w-md">
                        <div className="w-14 h-12 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                          <img
                            src={b.coverImage}
                            alt={b.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as any).src =
                                "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=300&q=80";
                            }}
                          />
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="font-bold text-white line-clamp-1 text-sm hover:text-[#FF690B] transition-colors">
                            {b.title}
                          </p>
                          <p className="text-[11px] text-gray-400 font-mono truncate">
                            /Blogs/{b.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-white">
                        {b.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <p className="text-white font-medium">{b.author?.name || "CoverMantra Editorial"}</p>
                        <p className="text-[10px] text-gray-400">{b.author?.role}</p>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-gray-300 font-medium">
                      {b.postedDate}
                    </td>

                    {/* Status Toggle */}
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(b)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                          b.isActive !== false
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20"
                        }`}
                        title="Click to toggle status"
                      >
                        {b.isActive !== false ? <Check className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {b.isActive !== false ? "Live" : "Draft"}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Live View */}
                        <a
                          href={`/Blogs/${b.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors"
                          title="Preview in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>

                        {/* Edit */}
                        <button
                          onClick={() => openEditModal(b)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-[#FF690B]/20 text-gray-300 hover:text-[#FF690B] transition-colors cursor-pointer"
                          title="Edit Blog"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => setDeleteConfirmId(b._id || b.slug)}
                          className="p-2 rounded-xl bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Blog"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-20 text-center text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-40 text-[#FF690B]" />
            <p className="font-bold text-base text-white">No blogs found matching filters</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting search or add a new blog.</p>
          </div>
        )}
      </div>

      {/* 🗑️ DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#08101E] border border-red-500/30 rounded-3xl p-8 max-w-sm w-full text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold text-white">Delete This Blog?</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              This will remove the blog post from <code className="text-[#FF690B]">data/blogs.json</code>. This action cannot be undone.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-white/20 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📝 CREATE / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#08101E] border border-white/15 rounded-3xl p-6 sm:p-8 max-w-3xl w-full my-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF690B]/10 border border-[#FF690B]/30 text-[#FF690B] flex items-center justify-center">
                  {editingBlog ? <Edit3 className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">
                    {editingBlog ? "Edit Blog Post" : "Add New Blog to CoverMantra"}
                  </h3>
                  <p className="text-xs text-gray-400">Saves directly into data/blogs.json (Zero DB required)</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              
              {/* Title & Slug */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Blog Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. 5 Simple Steps to Improve Your CIBIL Score"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">URL Slug (Auto-generated)</label>
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 focus-within:border-[#FF690B]">
                    <span className="text-gray-500 mr-1 font-mono">/Blogs/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="cibil-score-improvement-guide"
                      className="w-full bg-transparent text-white font-mono outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Subtitle / Hook */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-bold">Subtitle / Hook</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. How high credit scores lower your monthly EMI and unlock instant pre-approvals"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                />
              </div>

              {/* Category, Read Time & Featured */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold focus:border-[#FF690B] focus:outline-none cursor-pointer"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#08101E]">{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Read Time</label>
                  <input
                    type="text"
                    value={formData.readTime}
                    onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Author Desk</label>
                  <select
                    value={formData.authorIndex}
                    onChange={(e) => setFormData({ ...formData, authorIndex: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-white font-bold focus:border-[#FF690B] focus:outline-none cursor-pointer"
                  >
                    {AUTHOR_OPTIONS.map((auth, idx) => (
                      <option key={idx} value={idx} className="bg-[#08101E]">{auth.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image URL with Preview */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-bold flex items-center justify-between">
                  <span>Cover Image URL *</span>
                  {formData.coverImage && (
                    <span className="text-[10px] text-emerald-400 font-bold">Image loaded</span>
                  )}
                </label>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-xs focus:border-[#FF690B] focus:outline-none"
                    required
                  />
                  {formData.coverImage && (
                    <div className="w-14 h-10 rounded-xl overflow-hidden bg-black/40 border border-white/20 shrink-0">
                      <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className="text-gray-300 font-bold">Short Description / Excerpt *</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary for blog card and Google search previews..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                  required
                />
              </div>

              {/* Article Content Section 1 */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FileText className="w-4 h-4 text-[#FF690B]" />
                  Section 1 Content
                </div>
                <input
                  type="text"
                  value={formData.section1Title}
                  onChange={(e) => setFormData({ ...formData, section1Title: e.target.value })}
                  placeholder="Section Heading..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:border-[#FF690B] focus:outline-none"
                />
                <textarea
                  rows={4}
                  value={formData.section1Content}
                  onChange={(e) => setFormData({ ...formData, section1Content: e.target.value })}
                  placeholder="Write section paragraphs here (press Enter twice for new paragraphs)..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                />
              </div>

              {/* Article Content Section 2 (Optional) */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-white font-bold">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Section 2 Content (Optional)
                </div>
                <input
                  type="text"
                  value={formData.section2Title}
                  onChange={(e) => setFormData({ ...formData, section2Title: e.target.value })}
                  placeholder="Section Heading..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-bold focus:border-[#FF690B] focus:outline-none"
                />
                <textarea
                  rows={4}
                  value={formData.section2Content}
                  onChange={(e) => setFormData({ ...formData, section2Content: e.target.value })}
                  placeholder="Write section paragraphs here..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                />
              </div>

              {/* Tags & Key Takeaways */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Loans, Interest, CIBIL, CoverMantra"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-gray-300 font-bold">Key Takeaways (One per line)</label>
                  <textarea
                    rows={2}
                    value={formData.keyTakeaways}
                    onChange={(e) => setFormData({ ...formData, keyTakeaways: e.target.value })}
                    placeholder="Point 1&#10;Point 2"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white font-medium focus:border-[#FF690B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Toggles: Featured & Live */}
              <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-white/10">
                <label className="flex items-center gap-2.5 text-white font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="w-4 h-4 accent-[#FF690B] rounded cursor-pointer"
                  />
                  <span>Mark as Featured Story</span>
                </label>

                <label className="flex items-center gap-2.5 text-white font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                  <span>Publish Immediately (Live)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-[#FF690B] to-[#FF8C00] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : editingBlog ? "Update Blog" : "Publish Blog"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
