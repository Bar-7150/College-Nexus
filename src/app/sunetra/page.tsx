"use client";

import { FormEvent, ReactNode, useState } from "react";
import {
  BadgeCheck,
  CheckCircle2,
  FileCheck2,
  LayoutDashboard,
  LogOut,
  ShieldAlert,
  Users,
  XCircle,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import FixedCampusBackground from "@/components/FixedCampusBackground";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || "sunetrabar@gmail.com";
type AdminTab = "overview" | "vault" | "verification" | "users" | "moderation";

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

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    setSigningIn(true);
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

  const updateUpload = (id: string, status: PendingUpload["status"]) => {
    setUploads((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setToast(`Upload ${status.toLowerCase()}.`);
  };

  const updateVerification = (id: string, status: PendingVerification["status"]) => {
    setVerifications((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setToast(`Verification ${status.toLowerCase()}.`);
  };

  if (loading) return <div className="min-h-screen bg-[#070e0a] text-[#deb86d] flex items-center justify-center font-mono text-xs">Checking admin session...</div>;

  if (!isAdmin) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#070e0a] text-white">
        <FixedCampusBackground />
        <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
          <form onSubmit={handleLogin} className="w-full max-w-md rounded-2xl border border-[#c79e4d]/45 bg-[#09140e]/90 p-7 shadow-2xl backdrop-blur-2xl">
            <div className="mb-6 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#c79e4d] text-xl text-[#deb86d]">結</div><div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">Private control plane</div><h1 className="font-serif text-2xl">Sunetra Admin</h1></div></div>
            <p className="mb-6 text-sm leading-relaxed text-[#a9c0ae]">Only the authorized Supabase account can enter this portal. Admin credentials are never stored in the frontend.</p>
            {loginError && <div className="mb-4 rounded-lg border border-rose-500/40 bg-rose-950/50 p-3 text-xs text-rose-200">{loginError}</div>}
            <div className="space-y-4"><label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">Admin email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label><label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-3 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label><button disabled={signingIn} className="w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] disabled:opacity-60">{signingIn ? "Authenticating..." : "Enter admin dashboard"}</button></div>
          </form>
        </div>
      </main>
    );
  }

  const tabs: Array<{ id: AdminTab; label: string; icon: typeof LayoutDashboard }> = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "vault", label: "Vault approvals", icon: FileCheck2 },
    { id: "verification", label: "Student verification", icon: BadgeCheck },
    { id: "users", label: "Users", icon: Users },
    { id: "moderation", label: "Moderation", icon: ShieldAlert },
  ];

  return (
    <main className="min-h-screen bg-[#070e0a] text-[#e6f0e9]"><FixedCampusBackground /><div className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-10">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#294231] pb-5"><div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#c79e4d] text-[#deb86d]">結</div><div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">Sunetra / Admin</div><h1 className="font-serif text-2xl text-white">Nexus Control Plane</h1></div></div><button onClick={logout} className="flex items-center gap-2 rounded-lg border border-[#38513f] px-3 py-2 text-xs text-[#b7cbbd] hover:border-rose-400 hover:text-rose-300"><LogOut className="h-4 w-4" /> Sign out</button></header>
      <div className="grid gap-6 lg:grid-cols-[230px_1fr]"><nav className="h-fit rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-2 backdrop-blur-xl">{tabs.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => setActiveTab(id)} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-xs transition ${activeTab === id ? "bg-[#c79e4d] font-bold text-[#08120c]" : "text-[#a9c0ae] hover:bg-white/5 hover:text-white"}`}><Icon className="h-4 w-4" /> {label}</button>)}</nav>
        <section className="min-w-0">{activeTab === "overview" && <OverviewCard uploads={uploads} verifications={verifications} onOpen={setActiveTab} />}{activeTab === "vault" && <Queue title="Vault approval queue" empty="No uploads are waiting for review." icon={<FileCheck2 className="h-5 w-5" />}><div className="space-y-3">{uploads.map((upload) => <QueueRow key={upload.id} title={upload.title} meta={`${upload.subject} · ${upload.type} · ${upload.contributor}`} status={upload.status} onApprove={() => updateUpload(upload.id, "Approved")} onReject={() => updateUpload(upload.id, "Rejected")} />)}</div></Queue>}{activeTab === "verification" && <Queue title="Student verification queue" empty="No student verification requests are waiting." icon={<BadgeCheck className="h-5 w-5" />}><div className="space-y-3">{verifications.map((verification) => <QueueRow key={verification.id} title={verification.name} meta={`${verification.rollNumber} · ${verification.college} · ${verification.department}`} status={verification.status} onApprove={() => updateVerification(verification.id, "Approved")} onReject={() => updateVerification(verification.id, "Rejected")} />)}</div></Queue>}{activeTab === "users" && <Queue title="Registered users" empty="User records will appear here from Supabase profiles." icon={<Users className="h-5 w-5" />} />}{activeTab === "moderation" && <Queue title="Reports and moderation" empty="No reports are waiting for moderation." icon={<ShieldAlert className="h-5 w-5" />} />}</section>
      </div>
    </div>{toast && <button onClick={() => setToast(null)} className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#c79e4d]/50 bg-[#0b1510]/95 px-4 py-3 text-xs text-white shadow-xl">{toast}</button>}</main>
  );
}

function OverviewCard({ uploads, verifications, onOpen }: { uploads: PendingUpload[]; verifications: PendingVerification[]; onOpen: (tab: AdminTab) => void }) {
  const metrics = [{ label: "Registered users", value: "0", icon: Users }, { label: "Pending uploads", value: String(uploads.filter((item) => item.status === "Pending").length), icon: FileCheck2 }, { label: "Verification requests", value: String(verifications.filter((item) => item.status === "Pending").length), icon: BadgeCheck }, { label: "Open reports", value: "0", icon: ShieldAlert }];
  return <div className="space-y-6"><div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">ADMINISTRATIVE OVERVIEW</div><h2 className="mt-1 font-serif text-4xl text-white">Everything in one place.</h2><p className="mt-2 max-w-2xl text-sm text-[#9db2a4]">Approve academic resources, review student verification requests, and moderate campus activity.</p></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{metrics.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-xl border border-[#294231] bg-[#0b1710]/80 p-5"><Icon className="mb-5 h-5 w-5 text-[#deb86d]" /><div className="font-serif text-3xl text-white">{value}</div><div className="mt-1 text-xs text-[#9bb2a0]">{label}</div></div>)}</div><div className="grid gap-4 md:grid-cols-2"><button onClick={() => onOpen("vault")} className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d]"><FileCheck2 className="mb-3 h-5 w-5 text-[#deb86d]" /><h3 className="font-serif text-xl text-white">Review Vault uploads</h3><p className="mt-1 text-xs text-[#9bb2a0]">Approve notes, PYQs, syllabus files, or reject incorrect uploads.</p></button><button onClick={() => onOpen("verification")} className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-5 text-left hover:border-[#deb86d]"><BadgeCheck className="mb-3 h-5 w-5 text-[#deb86d]" /><h3 className="font-serif text-xl text-white">Review student identity</h3><p className="mt-1 text-xs text-[#9bb2a0]">Check roll, college, department, and name before awarding a Verified tag.</p></button></div></div>;
}

function Queue({ title, empty, icon, children }: { title: string; empty: string; icon: ReactNode; children?: ReactNode }) {
  return <div className="rounded-2xl border border-[#294231] bg-[#0b1710]/80 p-5 backdrop-blur-xl"><div className="mb-5 flex items-center gap-3 border-b border-[#294231] pb-4"><span className="text-[#deb86d]">{icon}</span><h2 className="font-serif text-2xl text-white">{title}</h2></div>{children || <div className="rounded-xl border border-dashed border-[#38513f] p-12 text-center text-sm text-[#8fa597]">{empty}</div>}</div>;
}

function QueueRow({ title, meta, status, onApprove, onReject }: { title: string; meta: string; status: string; onApprove: () => void; onReject: () => void }) {
  return <div className="flex flex-col gap-4 rounded-xl border border-[#38513f] p-4 sm:flex-row sm:items-center sm:justify-between"><div><h3 className="text-sm font-semibold text-white">{title}</h3><p className="mt-1 text-xs text-[#9bb2a0]">{meta}</p></div><div className="flex items-center gap-2"><span className="rounded-full border border-[#38513f] px-2 py-1 text-[10px] font-mono text-[#deb86d]">{status}</span>{status === "Pending" && <><button onClick={onApprove} className="rounded-lg bg-emerald-500/20 p-2 text-emerald-300 hover:bg-emerald-500/30" title="Approve"><CheckCircle2 className="h-4 w-4" /></button><button onClick={onReject} className="rounded-lg bg-rose-500/20 p-2 text-rose-300 hover:bg-rose-500/30" title="Reject"><XCircle className="h-4 w-4" /></button></>}</div></div>;
}