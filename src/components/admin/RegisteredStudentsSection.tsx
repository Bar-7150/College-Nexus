"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowUpDown,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  GraduationCap,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from "lucide-react";

export interface StudentDocument {
  id: string;
  title: string;
  subject_code: string;
  subject_name: string;
  resource_type: string;
  file_url: string;
  status: string;
  created_at: string;
  file_size_bytes: number;
}

export interface RegisteredStudent {
  id: string;
  name: string;
  email: string;
  branch: string;
  rollNumber: string;
  batchYear: string;
  avatarUrl?: string;
  joiningDate: string;
  lastActive: string;
  visitCount: number;
  role: string;
  isVerified: boolean;
  verificationStatus?: string;
  source: string;
  uploadedDocsCount: number;
  uploadedDocuments: StudentDocument[];
}

export interface StudentStats {
  totalStudents: number;
  totalUploadedDocuments: number;
  totalVisits: number;
  activeBranchesCount: number;
  departments: Record<string, number>;
  totalApprovedDocs: number;
  totalPendingDocs: number;
  verifiedCount: number;
}

interface Props {
  students: RegisteredStudent[];
  stats: StudentStats | null;
  isLoading: boolean;
  onRefresh: () => void;
  onToast: (msg: string) => void;
}

export default function RegisteredStudentsSection({
  students,
  stats,
  isLoading,
  onRefresh,
  onToast,
}: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("ALL");
  const [docFilter, setDocFilter] = useState<"ALL" | "WITH_DOCS" | "NO_DOCS">("ALL");
  const [sortOption, setSortOption] = useState<
    "date_desc" | "date_asc" | "visits_desc" | "docs_desc" | "roll_asc" | "name_asc"
  >("date_desc");
  const [inspectStudent, setInspectStudent] = useState<RegisteredStudent | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Copy to clipboard helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    onToast(`Copied ${label}: ${text}`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Branch statistics
  const branchCounts = useMemo(() => {
    const counts: Record<string, number> = { CSE: 0, ECE: 0, EE: 0, ME: 0, IT: 0 };
    students.forEach((s) => {
      const b = (s.branch || "").toUpperCase();
      counts[b] = (counts[b] || 0) + 1;
    });
    return counts;
  }, [students]);

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        // Branch filter
        if (selectedBranch !== "ALL" && student.branch.toUpperCase() !== selectedBranch) {
          return false;
        }

        // Upload filter
        if (docFilter === "WITH_DOCS" && student.uploadedDocsCount === 0) {
          return false;
        }
        if (docFilter === "NO_DOCS" && student.uploadedDocsCount > 0) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = student.name.toLowerCase().includes(q);
          const matchRoll = student.rollNumber.toLowerCase().includes(q);
          const matchEmail = student.email.toLowerCase().includes(q);
          const matchBranch = student.branch.toLowerCase().includes(q);
          const matchDoc = student.uploadedDocuments.some((d) =>
            d.title.toLowerCase().includes(q) || d.subject_code.toLowerCase().includes(q)
          );
          if (!matchName && !matchRoll && !matchEmail && !matchBranch && !matchDoc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === "date_desc") {
          return new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime();
        }
        if (sortOption === "date_asc") {
          return new Date(a.joiningDate).getTime() - new Date(b.joiningDate).getTime();
        }
        if (sortOption === "visits_desc") {
          return b.visitCount - a.visitCount;
        }
        if (sortOption === "docs_desc") {
          return b.uploadedDocsCount - a.uploadedDocsCount;
        }
        if (sortOption === "roll_asc") {
          return a.rollNumber.localeCompare(b.rollNumber);
        }
        if (sortOption === "name_asc") {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [students, selectedBranch, docFilter, searchQuery, sortOption]);

  // CSV Export
  const handleExportCSV = () => {
    if (students.length === 0) {
      onToast("No students to export.");
      return;
    }

    const headers = [
      "Student Name",
      "Email Address",
      "Department / Branch",
      "Roll Number",
      "Batch Year",
      "Uploaded Documents Count",
      "Joining Date",
      "Website Visits",
      "Role",
      "Verification Status",
    ];

    const rows = filteredStudents.map((s) => [
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email}"`,
      `"${s.branch}"`,
      `"${s.rollNumber}"`,
      `"${s.batchYear}"`,
      s.uploadedDocsCount,
      `"${new Date(s.joiningDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}"`,
      s.visitCount,
      `"${s.role}"`,
      `"${s.isVerified ? "Verified" : "Pending"}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `nexus_registered_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onToast(`Exported ${filteredStudents.length} student records to CSV.`);
  };

  // Helper for human readable dates
  const formatJoinDate = (dateStr: string): { formatted: string; relative: string; full: string } => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return { formatted: dateStr, relative: "", full: dateStr };

      const now = new Date();
      const diffMs = now.getTime() - d.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      let relative = "";
      if (diffDays === 0) relative = "Today";
      else if (diffDays === 1) relative = "Yesterday";
      else if (diffDays < 30) relative = `${diffDays} days ago`;
      else if (diffDays < 365) relative = `${Math.floor(diffDays / 30)} mo ago`;
      else relative = `${Math.floor(diffDays / 365)} yr ago`;

      const formatted = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

      return { formatted, relative, full: d.toLocaleString() };
    } catch {
      return { formatted: dateStr, relative: "", full: dateStr };
    }
  };

  // Helper for formatting file size
  const formatSize = (bytes: number) => {
    if (!bytes || bytes === 0) return "0 KB";
    if (bytes >= 1048576) return `${(bytes / 1048576).toFixed(1)} MB`;
    return `${Math.round(bytes / 1024)} KB`;
  };

  // Branch badge styling
  const getBranchStyle = (branch: string) => {
    switch ((branch || "").toUpperCase()) {
      case "CSE":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
      case "ECE":
        return "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
      case "EE":
        return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      case "ME":
        return "bg-rose-500/15 text-rose-300 border-rose-500/30";
      case "IT":
        return "bg-purple-500/15 text-purple-300 border-purple-500/30";
      default:
        return "bg-[#c79e4d]/15 text-[#deb86d] border-[#c79e4d]/30";
    }
  };

  // Branch avatar gradient
  const getBranchAvatarGradient = (branch: string) => {
    switch ((branch || "").toUpperCase()) {
      case "CSE":
        return "from-emerald-600 to-teal-800";
      case "ECE":
        return "from-cyan-600 to-blue-800";
      case "EE":
        return "from-amber-600 to-yellow-800";
      case "ME":
        return "from-rose-600 to-red-800";
      case "IT":
        return "from-purple-600 to-indigo-800";
      default:
        return "from-[#c79e4d] to-[#8c6721]";
    }
  };

  const totalRegistered = stats?.totalStudents ?? students.length;
  const totalUploadedDocs = stats?.totalUploadedDocuments ?? 0;
  const totalWebsiteVisits = stats?.totalVisits ?? 0;
  const activeBranches = stats?.activeBranchesCount ?? Object.keys(branchCounts).filter((k) => branchCounts[k] > 0).length;

  return (
    <div className="space-y-6">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
            <Sparkles className="h-3 w-3" />
            <span>NEXUS CONTROL PLANE · USER DIRECTORY</span>
          </div>
          <h2 className="mt-1 font-serif text-3xl text-white">Registered Students Directory</h2>
          <p className="mt-1 text-xs text-[#9bb2a0] max-w-2xl">
            Live database of verified students, branch cohorts, submitted academic documents, joining timestamps, and website visitor telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl border border-[#38513f] bg-[#0b1710]/90 px-3.5 py-2 text-xs font-medium text-[#cde0d4] hover:border-[#deb86d] hover:text-white transition-all disabled:opacity-50 cursor-pointer shadow-sm"
            title="Refresh student records"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-[#deb86d]" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-[#c79e4d]/40 bg-[#c79e4d]/15 px-3.5 py-2 text-xs font-semibold text-[#deb86d] hover:bg-[#c79e4d]/25 hover:border-[#deb86d] transition-all cursor-pointer shadow-sm"
            title="Download CSV export"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* TOP SUMMARY STATS METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students Card */}
        <div className="rounded-2xl border border-[#c79e4d]/30 bg-gradient-to-br from-[#0c1a12]/90 via-[#07110b]/90 to-[#070e0a]/90 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-[#c79e4d]/60 transition-all">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-[#c79e4d]/10 blur-xl group-hover:bg-[#c79e4d]/15 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#deb86d]">
              Total Students
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#c79e4d]/20 border border-[#c79e4d]/30 text-[#deb86d]">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {isLoading && totalRegistered === 0 ? "..." : totalRegistered}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-[#9bb2a0]">
            <span>Enrolled scholars</span>
            <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-emerald-300 border border-emerald-500/30">
              100% Verified
            </span>
          </div>
        </div>

        {/* Uploaded Documents Card */}
        <div className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-[#081a13]/90 via-[#07110b]/90 to-[#070e0a]/90 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-500/60 transition-all">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-emerald-500/10 blur-xl group-hover:bg-emerald-500/15 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-300">
              Uploaded Documents
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300">
              <FileCheck2 className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {isLoading && totalUploadedDocs === 0 ? "..." : totalUploadedDocs}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-[#9bb2a0]">
            <span>Vault academic files</span>
            <span className="rounded-full bg-[#c79e4d]/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-[#deb86d] border border-[#c79e4d]/30">
              {stats?.totalApprovedDocs ?? totalUploadedDocs} Approved
            </span>
          </div>
        </div>

        {/* Website Visits Card */}
        <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#07181c]/90 via-[#07110b]/90 to-[#070e0a]/90 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-cyan-500/60 transition-all">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl group-hover:bg-cyan-500/15 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
              Website Visits
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300">
              <Eye className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {isLoading && totalWebsiteVisits === 0 ? "..." : totalWebsiteVisits}
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-[#9bb2a0]">
            <span>Recorded campus visits</span>
            <span className="rounded-full bg-cyan-500/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-cyan-300 border border-cyan-500/30">
              Live Activity
            </span>
          </div>
        </div>

        {/* Academic Branches Card */}
        <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-[#130d1d]/90 via-[#07110b]/90 to-[#070e0a]/90 p-5 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-purple-500/60 transition-all">
          <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-purple-500/10 blur-xl group-hover:bg-purple-500/15 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
              Academic Branches
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300">
              <GraduationCap className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="font-serif text-3xl font-bold text-white tracking-tight">
            {activeBranches} Departments
          </div>
          <div className="mt-1 flex items-center justify-between text-xs text-[#9bb2a0]">
            <span>CSE · ECE · EE · ME · IT</span>
            <span className="rounded-full bg-purple-500/15 px-2 py-0.5 text-[10px] font-mono font-semibold text-purple-300 border border-purple-500/30">
              Active Cohorts
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH TOOLBAR */}
      <div className="rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-4 sm:p-5 backdrop-blur-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#789080]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, roll number (e.g. 10200125073), email, or branch..."
              className="w-full rounded-xl border border-[#38513f] bg-[#07110b] pl-10 pr-10 py-2.5 text-xs text-white placeholder-[#687f71] outline-none focus:border-[#deb86d] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#789080] hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Document Filter & Sorting */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Document presence filter */}
            <div className="flex items-center rounded-xl border border-[#38513f] bg-[#07110b] p-1 text-xs">
              <button
                onClick={() => setDocFilter("ALL")}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  docFilter === "ALL"
                    ? "bg-[#c79e4d] text-[#08120c] font-bold"
                    : "text-[#9bb2a0] hover:text-white"
                }`}
              >
                All Docs
              </button>
              <button
                onClick={() => setDocFilter("WITH_DOCS")}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  docFilter === "WITH_DOCS"
                    ? "bg-emerald-500 text-[#08120c] font-bold"
                    : "text-[#9bb2a0] hover:text-white"
                }`}
              >
                Has Uploads
              </button>
              <button
                onClick={() => setDocFilter("NO_DOCS")}
                className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                  docFilter === "NO_DOCS"
                    ? "bg-slate-700 text-white font-bold"
                    : "text-[#9bb2a0] hover:text-white"
                }`}
              >
                0 Uploads
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 rounded-xl border border-[#38513f] bg-[#07110b] px-3 py-1.5 text-xs text-[#9bb2a0]">
              <ArrowUpDown className="h-3.5 w-3.5 text-[#deb86d]" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as any)}
                className="bg-transparent text-xs text-white outline-none cursor-pointer"
              >
                <option value="date_desc" className="bg-[#07110b] text-white">
                  Joining: Newest First
                </option>
                <option value="date_asc" className="bg-[#07110b] text-white">
                  Joining: Oldest First
                </option>
                <option value="visits_desc" className="bg-[#07110b] text-white">
                  Most Website Visits
                </option>
                <option value="docs_desc" className="bg-[#07110b] text-white">
                  Most Uploaded Documents
                </option>
                <option value="roll_asc" className="bg-[#07110b] text-white">
                  Roll Number (Ascending)
                </option>
                <option value="name_asc" className="bg-[#07110b] text-white">
                  Student Name (A-Z)
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#294231]/60">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#789080] mr-1 flex items-center gap-1">
            <Filter className="h-3 w-3" /> Branch:
          </span>

          <button
            onClick={() => setSelectedBranch("ALL")}
            className={`rounded-lg px-3 py-1 text-xs font-mono transition cursor-pointer ${
              selectedBranch === "ALL"
                ? "bg-[#c79e4d] text-[#08120c] font-bold shadow"
                : "border border-[#38513f] bg-[#07110b] text-[#9bb2a0] hover:border-[#deb86d] hover:text-white"
            }`}
          >
            ALL ({students.length})
          </button>

          {(["CSE", "ECE", "EE", "ME", "IT"] as const).map((branch) => {
            const count = branchCounts[branch] || 0;
            const isSelected = selectedBranch === branch;
            return (
              <button
                key={branch}
                onClick={() => setSelectedBranch(branch)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1 text-xs font-mono transition cursor-pointer ${
                  isSelected
                    ? "bg-[#c79e4d] text-[#08120c] font-bold shadow"
                    : "border border-[#38513f] bg-[#07110b] text-[#9bb2a0] hover:border-[#deb86d] hover:text-white"
                }`}
              >
                <span>{branch}</span>
                <span
                  className={`rounded px-1.5 py-0.2 text-[10px] ${
                    isSelected ? "bg-[#08120c] text-[#deb86d]" : "bg-white/10 text-[#cde0d4]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}

          <div className="ml-auto text-[11px] font-mono text-[#789080]">
            Showing <span className="text-white font-bold">{filteredStudents.length}</span> of {students.length} students
          </div>
        </div>
      </div>

      {/* ROW-WISE REGISTERED STUDENTS TABLE */}
      <div className="rounded-2xl border border-[#294231] bg-[#0b1710]/85 backdrop-blur-xl shadow-2xl overflow-hidden">
        {/* Table Header (Desktop) */}
        <div className="hidden lg:grid grid-cols-[2.2fr_1.1fr_1.2fr_1.8fr_1.3fr_1.2fr_auto] gap-4 px-6 py-3.5 border-b border-[#294231] bg-[#07110b]/70 text-[10px] font-mono uppercase tracking-wider text-[#deb86d]">
          <div>Student / Identity</div>
          <div>Branch</div>
          <div>Roll Number</div>
          <div>Uploaded Document</div>
          <div>Joining Date</div>
          <div>Website Visits</div>
          <div className="text-right">Actions</div>
        </div>

        {/* Content rows */}
        {isLoading && students.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <RefreshCw className="h-6 w-6 animate-spin text-[#deb86d] mx-auto" />
            <div className="font-serif text-lg text-white">Loading registered student records...</div>
            <p className="text-xs text-[#8fa597]">Querying Supabase Auth profiles & vault resources.</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="h-8 w-8 text-[#56705f] mx-auto" />
            <div className="font-serif text-lg text-white">No registered students found</div>
            <p className="text-xs text-[#8fa597] max-w-md mx-auto">
              No students match your current search filters ({searchQuery ? `"${searchQuery}"` : ""} branch: {selectedBranch}).
            </p>
            {(searchQuery || selectedBranch !== "ALL" || docFilter !== "ALL") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedBranch("ALL");
                  setDocFilter("ALL");
                }}
                className="mt-2 text-xs font-mono text-[#deb86d] hover:underline"
              >
                Reset all search filters
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-[#243a2b]/70">
            {filteredStudents.map((student) => {
              const { formatted: joinFormatted, relative: joinRelative, full: joinFull } = formatJoinDate(
                student.joiningDate
              );
              const initials = student.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              const branchStyle = getBranchStyle(student.branch);
              const avatarGrad = getBranchAvatarGradient(student.branch);

              return (
                <div
                  key={student.id}
                  className="grid grid-cols-1 lg:grid-cols-[2.2fr_1.1fr_1.2fr_1.8fr_1.3fr_1.2fr_auto] gap-4 items-center px-4 sm:px-6 py-4 transition-all hover:bg-white/[0.02]"
                >
                  {/* 1. Student Identity */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${avatarGrad} text-sm font-bold text-white shadow-md border border-white/20 overflow-hidden`}
                    >
                      {student.avatarUrl ? (
                        <img src={student.avatarUrl} alt={student.name} className="h-full w-full object-cover" />
                      ) : (
                        initials
                      )}
                      {student.isVerified && (
                        <span
                          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white shadow"
                          title="Verified student identity"
                        >
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-white truncate">{student.name}</span>
                        {student.role === "ADMIN" && (
                          <span className="rounded bg-[#c79e4d]/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-[#deb86d] border border-[#c79e4d]/40">
                            ADMIN
                          </span>
                        )}
                        {student.role === "CR" && (
                          <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] font-mono font-bold text-cyan-300 border border-cyan-500/40">
                            CR
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-[#8fa597] truncate">
                        <span className="truncate">{student.email}</span>
                        <button
                          onClick={() => handleCopy(student.email, "email")}
                          className="text-[#657d6e] hover:text-[#deb86d] shrink-0"
                          title="Copy email"
                        >
                          {copiedId === student.email ? (
                            <Check className="h-3 w-3 text-emerald-400" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2. Branch */}
                  <div className="flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[11px] font-mono text-[#789080]">Branch:</span>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-mono font-bold border ${branchStyle}`}
                      >
                        {student.branch}
                      </span>
                      <div className="text-[10px] font-mono text-[#789080] mt-0.5">
                        {student.batchYear || "2022-2026"}
                      </div>
                    </div>
                  </div>

                  {/* 3. Roll Number */}
                  <div className="flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[11px] font-mono text-[#789080]">Roll No:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-semibold text-[#deb86d] bg-[#deb86d]/10 px-2 py-0.5 rounded border border-[#deb86d]/20">
                        {student.rollNumber}
                      </span>
                      <button
                        onClick={() => handleCopy(student.rollNumber, "roll number")}
                        className="text-[#657d6e] hover:text-[#deb86d] shrink-0"
                        title="Copy roll number"
                      >
                        {copiedId === student.rollNumber ? (
                          <Check className="h-3 w-3 text-emerald-400" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* 4. Uploaded Document */}
                  <div className="flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[11px] font-mono text-[#789080]">Uploaded Docs:</span>
                    <div>
                      {student.uploadedDocsCount > 0 ? (
                        <button
                          onClick={() => setInspectStudent(student)}
                          className="group/doc text-left flex flex-col items-start cursor-pointer"
                        >
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-300 group-hover/doc:bg-emerald-500/20 group-hover/doc:border-emerald-500/60 transition-all shadow-sm">
                            <FileCheck2 className="h-3.5 w-3.5" />
                            <span>
                              {student.uploadedDocsCount} {student.uploadedDocsCount === 1 ? "Document" : "Documents"}
                            </span>
                            <ExternalLink className="h-3 w-3 opacity-60 group-hover/doc:opacity-100 group-hover/doc:translate-x-0.5 transition-all" />
                          </span>

                          {/* Quick preview of the most recent doc title */}
                          {student.uploadedDocuments[0] && (
                            <span className="mt-1 text-[11px] text-[#9bb2a0] truncate max-w-[200px] block group-hover/doc:text-white transition">
                              {student.uploadedDocuments[0].title}
                            </span>
                          )}
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-[11px] font-mono text-[#789080] border border-white/5">
                          <FileText className="h-3 w-3 opacity-50" />
                          <span>0 uploaded</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 5. Joining Date */}
                  <div className="flex lg:block items-center justify-between" title={joinFull}>
                    <span className="lg:hidden text-[11px] font-mono text-[#789080]">Joined:</span>
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-white font-medium">
                        <Calendar className="h-3 w-3 text-[#deb86d] opacity-80" />
                        <span>{joinFormatted}</span>
                      </div>
                      {joinRelative && (
                        <div className="text-[10px] font-mono text-[#789080] mt-0.5">
                          {joinRelative}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 6. No of Visits on Website */}
                  <div className="flex lg:block items-center justify-between">
                    <span className="lg:hidden text-[11px] font-mono text-[#789080]">Website Visits:</span>
                    <div>
                      <div className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-xs font-mono font-bold text-cyan-300">
                        <Eye className="h-3.5 w-3.5" />
                        <span>{student.visitCount} visits</span>
                      </div>

                      <div className="mt-0.5 text-[10px] font-mono">
                        {student.visitCount >= 20 ? (
                          <span className="text-amber-400">🔥 Highly Active</span>
                        ) : student.visitCount >= 10 ? (
                          <span className="text-emerald-400">⚡ Regular Visitor</span>
                        ) : (
                          <span className="text-[#8fa597]">🌱 New Member</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 7. Action Button */}
                  <div className="flex justify-end pt-2 lg:pt-0">
                    {student.uploadedDocsCount > 0 ? (
                      <button
                        onClick={() => setInspectStudent(student)}
                        className="flex items-center gap-1.5 rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-1.5 text-xs font-medium text-[#cde0d4] hover:border-[#deb86d] hover:text-[#deb86d] transition-all cursor-pointer shadow-sm"
                      >
                        <BookOpen className="h-3.5 w-3.5" />
                        <span>View Docs</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCopy(student.rollNumber, "roll")}
                        className="flex items-center gap-1.5 rounded-lg border border-[#38513f]/40 bg-[#07110b]/50 px-3 py-1.5 text-xs font-mono text-[#789080] hover:text-[#cde0d4] transition"
                        title="Copy student roll"
                      >
                        <Copy className="h-3 w-3" />
                        <span>Copy Roll</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: VIEW UPLOADED DOCUMENTS OF SELECTED STUDENT */}
      {inspectStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl rounded-2xl border border-[#c79e4d]/40 bg-[#09150f] p-6 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#294231] pb-4">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${getBranchAvatarGradient(
                    inspectStudent.branch
                  )} font-bold text-white shadow-md border border-white/20 overflow-hidden shrink-0`}
                >
                  {inspectStudent.avatarUrl ? (
                    <img src={inspectStudent.avatarUrl} alt={inspectStudent.name} className="h-full w-full object-cover" />
                  ) : (
                    inspectStudent.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-xl font-bold text-white">{inspectStudent.name}</h3>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getBranchStyle(
                        inspectStudent.branch
                      )}`}
                    >
                      {inspectStudent.branch}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-[#8fa597] mt-0.5">
                    Roll: <span className="text-[#deb86d]">{inspectStudent.rollNumber}</span> · {inspectStudent.email}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectStudent(null)}
                className="rounded-lg p-1.5 text-[#8fa597] hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#294231] bg-[#07110b] p-3 text-xs">
              <div className="text-[#9bb2a0]">
                Submitted Documents:{" "}
                <span className="font-bold text-white">{inspectStudent.uploadedDocuments.length}</span>
              </div>
              <div className="text-[#9bb2a0]">
                Website Visits:{" "}
                <span className="font-bold text-cyan-300">{inspectStudent.visitCount} sessions</span>
              </div>
              <div className="text-[#9bb2a0]">
                Joined:{" "}
                <span className="font-bold text-[#deb86d]">
                  {formatJoinDate(inspectStudent.joiningDate).formatted}
                </span>
              </div>
            </div>

            {/* Documents List */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Submitted Academic Files ({inspectStudent.uploadedDocuments.length})
              </h4>

              {inspectStudent.uploadedDocuments.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#38513f] p-8 text-center text-xs text-[#8fa597]">
                  No academic documents uploaded yet by this student.
                </div>
              ) : (
                inspectStudent.uploadedDocuments.map((doc, idx) => (
                  <div
                    key={doc.id || idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-[#38513f] bg-[#07110b]/80 p-4 hover:border-[#c79e4d]/40 transition-all"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                            doc.resource_type === "NOTES"
                              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              : doc.resource_type === "PYQ"
                              ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                              : "bg-cyan-500/20 text-cyan-300 border-cyan-500/30"
                          }`}
                        >
                          {doc.resource_type}
                        </span>

                        <span className="font-mono text-xs font-semibold text-[#deb86d]">
                          {doc.subject_code}
                        </span>

                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                            doc.status === "APPROVED"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : doc.status === "PENDING"
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </div>

                      <h5 className="font-semibold text-sm text-white leading-snug truncate">
                        {doc.title}
                      </h5>

                      <div className="text-[11px] font-mono text-[#789080] flex items-center gap-2">
                        <span>{formatSize(doc.file_size_bytes)}</span>
                        <span>·</span>
                        <span>{formatJoinDate(doc.created_at).formatted}</span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {doc.file_url ? (
                        <a
                          href={doc.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 rounded-lg bg-[#c79e4d] px-3.5 py-2 text-xs font-bold text-[#08120c] hover:bg-[#deb86d] transition-all shadow cursor-pointer"
                        >
                          <Download className="h-3.5 w-3.5" />
                          <span>Open File</span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono text-[#789080]">No URL</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end pt-2 border-t border-[#294231]">
              <button
                onClick={() => setInspectStudent(null)}
                className="rounded-lg border border-[#38513f] px-4 py-2 text-xs text-[#cde0d4] hover:bg-white/5 transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
