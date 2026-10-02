"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Pin,
  PlusCircle,
  ShieldAlert,
  Sparkles,
  Trash2,
  Users,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import {
  NoticeItem,
  getStoredNotices,
  saveNotice,
  deleteNotice,
} from "@/lib/subjectStore";
import RegisteredStudentsSection, {
  RegisteredStudent,
  StudentStats,
} from "@/components/admin/RegisteredStudentsSection";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "sunetrabar@gmail.com";
type AdminTab = "overview" | "notices" | "vault" | "verification" | "users" | "moderation";

interface PendingVerification {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  college: string;
  department: string;
  status: "Pending" | "Approved" | "Rejected";
}

interface PendingUpload {
  id: string;
  title: string;
  subject: string;
  contributor: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
}

export default function SunetraAdminPage() {
  const { user, loading, loginWithEmail, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signingIn, setSigningIn] = useState(false);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [toast, setToast] = useState<string | null>(null);
  const [uploads, setUploads] = useState<PendingUpload[]>([]);
  const [verifications, setVerifications] = useState<PendingVerification[]>([]);

  // Registered students state
  const [students, setStudents] = useState<RegisteredStudent[]>([]);
  const [studentStats, setStudentStats] = useState<StudentStats | null>(null);
  const [isLoadingStudents, setIsLoadingStudents] = useState<boolean>(false);

  // Session state for dev or master admin access
  const [devAdminSession, setDevAdminSession] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("nexus_sunetra_session") === "true";
    }
    return false;
  });

  // Stored notices
  const [notices, setNotices] = useState<NoticeItem[]>(() => getStoredNotices());
  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeCategory, setNoticeCategory] = useState<NoticeItem["category"]>("ACADEMIC");
  const [noticeDept, setNoticeDept] = useState("All Engineering Branches");
  const [noticeIssuer, setNoticeIssuer] = useState("Office of the Dean & Academic Affairs");
  const [noticeExpiresIn, setNoticeExpiresIn] = useState("Valid through this semester");
  const [noticeSummary, setNoticeSummary] = useState("");
  const [noticePinned, setNoticePinned] = useState(false);
  const [isPublishingNotice, setIsPublishingNotice] = useState(false);

  const isAdmin = devAdminSession || user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const fetchStudents = async () => {
    setIsLoadingStudents(true);
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          "x-admin-key": "sunetra2026",
          Authorization: "Bearer sunetra2026",
        },
      });
      const result = await response.json();
      if (result.success && result.data) {
        setStudents(result.data.users || []);
        setStudentStats(result.data.stats || null);
      }
    } catch (err) {
      console.error("Failed to load registered students:", err);
    } finally {
      setIsLoadingStudents(false);
    }
  };

  const fetchVerifications = async () => {
    try {
      const response = await fetch("/api/admin/verifications", {
        headers: {
          "x-admin-key": "sunetra2026",
          Authorization: "Bearer sunetra2026",
        },
      });
      const result = await response.json();
      if (result.success && result.data) {
        setVerifications(result.data);
      }
    } catch (err) {
      console.error("Failed to load verifications:", err);
    }
  };

  useEffect(() => {
    const syncNotices = () => setNotices(getStoredNotices());
    window.addEventListener("nexus_storage_updated", syncNotices);
    return () => window.removeEventListener("nexus_storage_updated", syncNotices);
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    fetch("/api/admin/vault/resources", {
      headers: {
        "x-admin-key": "sunetra2026",
        Authorization: "Bearer sunetra2026",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        if (!result.success) return;
        setUploads((result.data || []).map((row: any) => ({
          id: row.id,
          title: row.title,
          subject: row.subject_code,
          contributor: row.contributor_name,
          type: row.resource_type,
          status: row.status === "PENDING" ? "Pending" : row.status === "APPROVED" ? "Approved" : "Rejected",
        })));
      })
      .catch(() => undefined);

    fetchStudents();
    fetchVerifications();
  }, [isAdmin]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    setSigningIn(true);

    // Direct admin override or local admin bypass
    if (
      email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() ||
      email.trim().toLowerCase() === "admin@kgec.edu.in" ||
      password === "sunetra2026" ||
      password === "admin"
    ) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("nexus_sunetra_session", "true");
      }
      setDevAdminSession(true);
      setSigningIn(false);
      return;
    }

    const result = await loginWithEmail(email, password);
    setSigningIn(false);

    if (result.error) {
      setLoginError(result.error.message || "Unable to sign in.");
      return;
    }

    if (result.data?.user?.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
      await logout();
      setLoginError("This account is not authorized for the Sunetra admin portal.");
    }
  };

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("nexus_sunetra_session");
    }
    setDevAdminSession(false);
    await logout();
  };

  const handleCreateNotice = (event: FormEvent) => {
    event.preventDefault();
    if (!noticeTitle.trim() || !noticeSummary.trim()) {
      setToast("Notice title and directive details are required.");
      return;
    }

    setIsPublishingNotice(true);
    const now = new Date();
    const dateStr = `Today, ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;

    const newNotice: NoticeItem = {
      id: `notice-${Date.now()}`,
      title: noticeTitle.trim(),
      category: noticeCategory,
      issuer: noticeIssuer.trim() || "Office of Academic Affairs",
      date: dateStr,
      expiresIn: noticeExpiresIn.trim() || "Valid for 30 days",
      department: noticeDept.trim() || "All Departments",
      summary: noticeSummary.trim(),
      pinned: noticePinned,
    };

    const updated = saveNotice(newNotice);
    setNotices(updated);
    setToast("Official campus notice published successfully.");
    setNoticeTitle("");
    setNoticeSummary("");
    setNoticePinned(false);
    setIsPublishingNotice(false);
  };

  const handleDeleteNotice = (id: string) => {
    const updated = deleteNotice(id);
    setNotices(updated);
    setToast("Notice deleted from campus board.");
  };

  const updateUpload = async (id: string, status: PendingUpload["status"]) => {
    const response = await fetch("/api/admin/vault/resources", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: status.toUpperCase() }),
    });
    if (!response.ok) {
      setToast("Unable to update this upload.");
      return;
    }
    setUploads((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
    setToast(`Upload ${status.toLowerCase()}.`);
  };

  const updateVerification = async (id: string, status: PendingVerification["status"]) => {
    try {
      const response = await fetch("/api/admin/verifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": "sunetra2026",
          Authorization: "Bearer sunetra2026",
        },
        body: JSON.stringify({ id, status }),
      });
      const result = await response.json();
      if (result.success) {
        setVerifications((current) => current.map((item) => (item.id === id ? { ...item, status } : item)));
        setToast(`Student verification ${status.toLowerCase()} and saved to database.`);
        fetchStudents();
      } else {
        setToast(`Failed to update verification: ${result.error}`);
      }
    } catch (err: any) {
      setToast(`Error: ${err.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070e0a] text-[#deb86d] flex items-center justify-center font-mono text-xs">
        Checking admin session...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070e0a] text-white">
        <FixedCampusBackground />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
          <form
            onSubmit={handleLogin}
            className="w-full max-w-md rounded-2xl border border-[#c79e4d]/45 bg-[#09140e]/90 p-7 shadow-2xl backdrop-blur-2xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c79e4d] text-xl text-[#deb86d]">
                結
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
                  Private control plane
                </div>
                <h1 className="font-serif text-2xl">Sunetra Admin</h1>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-[#a9c0ae]">
              Only the authorized campus administrative account can enter this portal to issue notices and moderate content.
            </p>

            {loginError && (
              <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-950/50 p-3 text-xs text-rose-200">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Admin email
                <input
                  required
                  type="email"
                  value={email}
                  placeholder="sunetrabar@gmail.com"
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"
                />
              </label>

              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Password / Master Key
                <input
                  required
                  type="password"
                  value={password}
                  placeholder="••••••••"
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"
                />
              </label>

              <button
                disabled={signingIn}
                className="w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] transition-colors disabled:opacity-60 cursor-pointer shadow-lg"
              >
                {signingIn ? "Authenticating..." : "Enter admin dashboard"}
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      sessionStorage.setItem("nexus_sunetra_session", "true");
                    }
                    setDevAdminSession(true);
                  }}
                  className="text-[11px] font-mono text-[#deb86d] hover:underline"
                >
                  ⚡ One-Click Administrative Bypass (Sunetra Access)
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }

  const tabs: Array<{ id: AdminTab; label: string; icon: typeof LayoutDashboard; badge?: number }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "notices", label: "Campus Notices", icon: Bell, badge: notices.length },
    { id: "vault", label: "Vault Approvals", icon: FileCheck2, badge: uploads.filter((u) => u.status === "Pending").length },
    { id: "verification", label: "Student Verification", icon: BadgeCheck, badge: verifications.filter((v) => v.status === "Pending").length },
    { id: "users", label: "Users", icon: Users, badge: students.length },
    { id: "moderation", label: "Moderation", icon: ShieldAlert },
  ];

  return (
    <main className="min-h-screen bg-[#070e0a] text-[#e6f0e9]">
      <FixedCampusBackground />
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-10">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#294231] pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c79e4d] text-[#deb86d]">
              結
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
                Sunetra / Administration Portal
              </div>
              <h1 className="font-serif text-2xl text-white">Nexus Control Plane</h1>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg border border-[#38513f] px-3 py-2 text-xs text-[#b7cbbd] hover:border-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </header>

        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <nav className="h-fit rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-2 backdrop-blur-xl space-y-1">
            {tabs.map(({ id, label, icon: Icon, badge }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-xs transition ${
                  activeTab === id
                    ? "bg-[#c79e4d] font-bold text-[#08120c] shadow-md"
                    : "text-[#a9c0ae] hover:bg-white/5 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                {badge !== undefined && badge > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                      activeTab === id ? "bg-[#08120c] text-[#deb86d]" : "bg-[#c79e4d]/20 text-[#deb86d]"
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <section className="min-w-0">
            {activeTab === "overview" && (
              <OverviewCard
                uploads={uploads}
                verifications={verifications}
                noticesCount={notices.length}
                onOpen={setActiveTab}
                totalStudents={students.length}
              />
            )}

            {/* NOTICES MANAGEMENT TAB */}
            {activeTab === "notices" && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-[#c79e4d]/40 bg-[#0b1710]/85 p-6 backdrop-blur-xl shadow-2xl">
                  <div className="mb-6 flex items-center justify-between border-b border-[#294231] pb-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#c79e4d]/20 border border-[#c79e4d] text-[#deb86d]">
                        <Megaphone className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
                          OFFICIAL DIRECTIVE BROADCAST
                        </div>
                        <h2 className="font-serif text-2xl text-white">Publish Campus Notice</h2>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleCreateNotice} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Notice Title */}
                      <div className="md:col-span-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Notice Headline / Circular Title *
                        </label>
                        <input
                          required
                          value={noticeTitle}
                          onChange={(e) => setNoticeTitle(e.target.value)}
                          placeholder="e.g. MAKAUT Odd-Semester Examination Form Verification & Late Fine Deadline"
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#687f71] outline-none focus:border-[#deb86d]"
                        />
                      </div>

                      {/* Category */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Category
                        </label>
                        <select
                          value={noticeCategory}
                          onChange={(e) => setNoticeCategory(e.target.value as NoticeItem["category"])}
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#deb86d]"
                        >
                          <option value="ACADEMIC">ACADEMIC (Syllabus, Classes, Library)</option>
                          <option value="URGENT">URGENT (Examination, Fees, Penalties)</option>
                          <option value="PLACEMENT">PLACEMENT (Drives, Internships, T&amp;P)</option>
                          <option value="EVENT">EVENT (Tech Fest, Cultural, Workshops)</option>
                        </select>
                      </div>

                      {/* Target Department / Scope */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Target Department / Scope
                        </label>
                        <input
                          value={noticeDept}
                          onChange={(e) => setNoticeDept(e.target.value)}
                          placeholder="e.g. All Engineering Branches (2026 Batch) or CSE"
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#687f71] outline-none focus:border-[#deb86d]"
                        />
                      </div>

                      {/* Issuing Authority */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Issuing Authority / Cell
                        </label>
                        <input
                          value={noticeIssuer}
                          onChange={(e) => setNoticeIssuer(e.target.value)}
                          placeholder="e.g. Office of the Controller of Examinations"
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#687f71] outline-none focus:border-[#deb86d]"
                        />
                      </div>

                      {/* Expiration / Urgency */}
                      <div>
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Validity / Deadline Tag
                        </label>
                        <input
                          value={noticeExpiresIn}
                          onChange={(e) => setNoticeExpiresIn(e.target.value)}
                          placeholder="e.g. Expires in 48 hours or Valid through Oct 2026"
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#687f71] outline-none focus:border-[#deb86d]"
                        />
                      </div>

                      {/* Notice Directive Summary */}
                      <div className="md:col-span-2">
                        <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                          Official Directive Summary / Circular Body *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={noticeSummary}
                          onChange={(e) => setNoticeSummary(e.target.value)}
                          placeholder="Describe the full directive, mandatory actions, room locations, or official links for students..."
                          className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#687f71] outline-none focus:border-[#deb86d]"
                        />
                      </div>

                      {/* Pinned to top checkbox */}
                      <div className="md:col-span-2 flex items-center gap-3">
                        <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-[#dbe7df]">
                          <input
                            type="checkbox"
                            checked={noticePinned}
                            onChange={(e) => setNoticePinned(e.target.checked)}
                            className="h-4 w-4 rounded border-[#38513f] bg-[#07110b] text-[#c79e4d] focus:ring-0"
                          />
                          <span>Pin to top of campus notice board with gold priority badge</span>
                        </label>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isPublishingNotice}
                        className="flex items-center gap-2 rounded-lg bg-[#c79e4d] px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] transition-all disabled:opacity-60 cursor-pointer shadow-lg"
                      >
                        <PlusCircle className="h-4 w-4" />
                        {isPublishingNotice ? "Broadcasting..." : "Broadcast Notice to Live Board"}
                      </button>
                    </div>
                  </form>
                </div>

                {/* ACTIVE NOTICES LIST */}
                <div className="rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-6 backdrop-blur-xl">
                  <div className="mb-4 flex items-center justify-between border-b border-[#294231] pb-3">
                    <h3 className="font-serif text-xl text-white">Active Campus Notices ({notices.length})</h3>
                    <span className="text-xs font-mono text-[#9bb2a0]">Live on /board/notic &amp; Campus Explorer</span>
                  </div>

                  {notices.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-[#38513f] p-8 text-center text-sm text-[#8fa597]">
                      No active notices currently published. Fill the form above to broadcast one.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {notices.map((n) => (
                        <div
                          key={n.id}
                          className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 rounded-xl border border-[#38513f] bg-[#07110b]/70 p-4 transition-all hover:border-[#c79e4d]/40"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${
                                  n.category === "URGENT"
                                    ? "bg-rose-500/20 text-rose-300 border-rose-500/40"
                                    : n.category === "PLACEMENT"
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                                    : n.category === "EVENT"
                                    ? "bg-purple-500/20 text-purple-300 border-purple-500/40"
                                    : "bg-[#c79e4d]/20 text-[#deb86d] border-[#c79e4d]/40"
                                }`}
                              >
                                {n.category}
                              </span>

                              {n.pinned && (
                                <span className="flex items-center gap-1 rounded bg-[#c79e4d]/20 px-2 py-0.5 text-[10px] font-mono text-[#deb86d] border border-[#c79e4d]/30">
                                  <Pin className="h-3 w-3" /> Pinned
                                </span>
                              )}

                              <span className="text-[11px] font-mono text-[#8fa597]">{n.department}</span>
                              <span className="text-[11px] font-mono text-[#c79e4d]">· {n.expiresIn}</span>
                            </div>

                            <h4 className="text-base font-serif font-bold text-white leading-snug">{n.title}</h4>
                            <p className="text-xs text-[#a9c0ae] leading-relaxed">{n.summary}</p>
                            <div className="text-[10px] font-mono text-[#789080]">
                              Issued by <span className="text-[#deb86d]">{n.issuer}</span> · {n.date}
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0">
                            <button
                              onClick={() => handleDeleteNotice(n.id)}
                              className="flex items-center gap-1.5 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-1.5 text-xs text-rose-300 hover:bg-rose-500/20 hover:border-rose-500/50 transition-colors"
                              title="Delete notice"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "vault" && (
              <Queue title="Vault approval queue" empty="No uploads are waiting for review." icon={<FileCheck2 className="h-5 w-5" />}>
                <div className="space-y-3">
                  {uploads.map((upload) => (
                    <QueueRow
                      key={upload.id}
                      title={upload.title}
                      meta={`${upload.subject} · ${upload.type} · ${upload.contributor}`}
                      status={upload.status}
                      onApprove={() => updateUpload(upload.id, "Approved")}
                      onReject={() => updateUpload(upload.id, "Rejected")}
                    />
                  ))}
                </div>
              </Queue>
            )}

            {activeTab === "verification" && (
              <Queue title="Student verification queue" empty="No student verification requests are waiting." icon={<BadgeCheck className="h-5 w-5" />}>
                <div className="space-y-3">
                  {verifications.map((verification) => (
                    <QueueRow
                      key={verification.id}
                      title={verification.name}
                      meta={`${verification.rollNumber} · ${verification.college} · ${verification.department}`}
                      status={verification.status}
                      onApprove={() => updateVerification(verification.id, "Approved")}
                      onReject={() => updateVerification(verification.id, "Rejected")}
                    />
                  ))}
                </div>
              </Queue>
            )}

            {activeTab === "users" && (
              <RegisteredStudentsSection
                students={students}
                stats={studentStats}
                isLoading={isLoadingStudents}
                onRefresh={fetchStudents}
                onToast={setToast}
              />
            )}

            {activeTab === "moderation" && (
              <Queue title="Reports and moderation" empty="No reports are waiting for moderation." icon={<ShieldAlert className="h-5 w-5" />} />
            )}
          </section>
        </div>
      </div>

      {toast && (
        <button
          onClick={() => setToast(null)}
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#c79e4d]/50 bg-[#0b1510]/95 px-4 py-3 text-xs text-white shadow-xl backdrop-blur-md"
        >
          {toast}
        </button>
      )}
    </main>
  );
}

function OverviewCard({
  uploads,
  verifications,
  noticesCount,
  onOpen,
  totalStudents,
}: {
  uploads: PendingUpload[];
  verifications: PendingVerification[];
  noticesCount: number;
  onOpen: (tab: AdminTab) => void;
  totalStudents: number;
}) {
  const metrics = [
    { label: "Active campus notices", value: String(noticesCount), icon: Bell },
    { label: "Pending uploads", value: String(uploads.filter((item) => item.status === "Pending").length), icon: FileCheck2 },
    { label: "Verification requests", value: String(verifications.filter((item) => item.status === "Pending").length), icon: BadgeCheck },
    { label: "Registered students", value: String(totalStudents), icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">ADMINISTRATIVE OVERVIEW</div>
        <h2 className="mt-1 font-serif text-4xl text-white">Everything in one place.</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#9db2a4]">
          Publish campus circulars, approve academic resources, review student verification requests, and monitor registered student cohorts.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-xl border border-[#294231] bg-[#0b1710]/80 p-5">
            <Icon className="mb-5 h-5 w-5 text-[#deb86d]" />
            <div className="font-serif text-3xl text-white">{value}</div>
            <div className="mt-1 text-xs text-[#9bb2a0]">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={() => onOpen("notices")}
          className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d] transition-all cursor-pointer group"
        >
          <Bell className="mb-3 h-5 w-5 text-[#deb86d] group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-xl text-white">Publish Notice</h3>
          <p className="mt-1 text-xs text-[#9bb2a0]">
            Broadcast official circulars, exam dates, T&amp;P drives, and emergency notices to all students.
          </p>
        </button>

        <button
          onClick={() => onOpen("vault")}
          className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d] transition-all cursor-pointer group"
        >
          <FileCheck2 className="mb-3 h-5 w-5 text-[#deb86d] group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-xl text-white">Review Vault uploads</h3>
          <p className="mt-1 text-xs text-[#9bb2a0]">Approve notes, PYQs, syllabus files, or reject incorrect uploads.</p>
        </button>

        <button
          onClick={() => onOpen("verification")}
          className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d] transition-all cursor-pointer group"
        >
          <BadgeCheck className="mb-3 h-5 w-5 text-[#deb86d] group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-xl text-white">Student identity</h3>
          <p className="mt-1 text-xs text-[#9bb2a0]">Check roll, college, department, and name before awarding a Verified tag.</p>
        </button>

        <button
          onClick={() => onOpen("users")}
          className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d] transition-all cursor-pointer group"
        >
          <Users className="mb-3 h-5 w-5 text-[#deb86d] group-hover:scale-110 transition-transform" />
          <h3 className="font-serif text-xl text-white">Registered Students</h3>
          <p className="mt-1 text-xs text-[#9bb2a0]">Inspect student branches, roll numbers, uploaded documents, and visit metrics.</p>
        </button>
      </div>
    </div>
  );
}

function Queue({ title, empty, icon, children }: { title: string; empty: string; icon: ReactNode; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-5 backdrop-blur-xl">
      <div className="mb-5 flex items-center gap-3 border-b border-[#294231] pb-4">
        <span className="text-[#deb86d]">{icon}</span>
        <h2 className="font-serif text-2xl text-white">{title}</h2>
      </div>
      {children || <div className="rounded-xl border border-dashed border-[#38513f] p-12 text-center text-sm text-[#8fa597]">{empty}</div>}
    </div>
  );
}

function QueueRow({
  title,
  meta,
  status,
  onApprove,
  onReject,
}: {
  title: string;
  meta: string;
  status: string;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#38513f] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <p className="mt-1 text-xs text-[#9bb2a0]">{meta}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full border border-[#38513f] px-2 py-1 text-[10px] font-mono text-[#deb86d]">
          {status}
        </span>
        {status === "Pending" && (
          <>
            <button
              onClick={onApprove}
              className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300 hover:bg-emerald-500/30"
              title="Approve"
            >
              <CheckCircle2 className="h-4 w-4" />
            </button>
            <button
              onClick={onReject}
              className="rounded-lg bg-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/30"
              title="Reject"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}