"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  FilePlus2,
  FileText,
  LockKeyhole,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Navbar from "@/components/Navbar";
import { MOCK_VAULT_ITEMS, VaultItem } from "@/data/mockData";

type ResourceKind = "SYLLABUS" | "NOTES" | "PYQ";
const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || "https://college-nexus-rjln.onrender.com";

const sectionConfig: Array<{ kind: ResourceKind; title: string; description: string }> = [
  { kind: "SYLLABUS", title: "Syllabus", description: "Official semester scope, units, outcomes, and recommended reading." },
  { kind: "NOTES", title: "Notes", description: "Student-contributed lecture notes and revision packs." },
  { kind: "PYQ", title: "PYQ & Solutions", description: "Previous-year question papers with solved answers and marking hints." },
];

export default function SubjectVaultPage({ code }: { code: string }) {
  const { profile, session } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();
  const [resources, setResources] = useState<VaultItem[]>(() =>
    MOCK_VAULT_ITEMS.filter((item) => item.subjectCode.toLowerCase() === code.toLowerCase())
  );
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadKind, setUploadKind] = useState<"Syllabus" | "Notes" | "PYQ">("Notes");
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFileName, setUploadFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [viewerResource, setViewerResource] = useState<VaultItem | null>(null);
  const [reportedIds, setReportedIds] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  const subject = resources[0] || MOCK_VAULT_ITEMS.find((item) => item.subjectCode.toLowerCase() === code.toLowerCase());
  const subjectCode = subject?.subjectCode || code.toUpperCase();
  const subjectName = subject?.subjectName || "Academic Subject";
  const department = subject?.department || "CSE";
  const semester = subject?.semester || 1;

  useEffect(() => {
    if (!profile) return;
    let active = true;
    fetch(`${API_BASE}/api/vault/resources?subject_code=${encodeURIComponent(subjectCode)}`, {
      headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : undefined,
    })
      .then((response) => response.json())
      .then((result) => {
        if (!active || !result.success) return;
        const savedResources: VaultItem[] = (result.data || []).map((row: any) => ({
          id: row.id,
          title: row.title,
          subjectCode: row.subject_code,
          subjectName: row.subject_name,
          department: row.department,
          semester: row.semester,
          type: row.resource_type === "PYQ" ? "PYQ" : row.resource_type === "SYLLABUS" ? "Syllabus" : "Notes",
          year: new Date(row.created_at).getFullYear().toString(),
          contributor: row.contributor_name,
          contributorRoll: row.contributor_roll,
          verified: row.is_cr_verified || row.status === "APPROVED",
          sha256: row.file_hash,
          downloads: 0,
          pages: 0,
          date: new Date(row.created_at).toLocaleDateString(),
          fileUrl: row.file_url,
          status: row.status,
        }));
        setResources(savedResources);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [profile, session?.access_token, subjectCode]);

  const groupedResources = useMemo(() => ({
    SYLLABUS: resources.filter((item) => item.type === "Syllabus"),
    NOTES: resources.filter((item) => item.type === "Notes"),
    PYQ: resources.filter((item) => item.type === "PYQ"),
  }), [resources]);

  const requireLogin = () => {
    if (!profile) {
      setLoginModalOpen(true);
      return false;
    }
    return true;
  };

  const addResource = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!requireLogin()) return;
    if (!uploadTitle.trim() || !selectedFile) {
      setToast("Add a title and choose a file first.");
      return;
    }
    if (!session?.access_token) {
      setToast("Session expired. Please log in again.");
      setLoginModalOpen(true);
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", uploadTitle.trim());
    formData.append("subject_code", subjectCode);
    formData.append("subject_name", subjectName);
    formData.append("department", department);
    formData.append("semester", String(semester));
    formData.append("resource_type", uploadKind.toUpperCase());

    try {
      const response = await fetch(`${API_BASE}/api/vault/resources`, {
        method: "POST",
        headers: { Authorization: `Bearer ${session.access_token}` },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result?.error?.message || "Vault upload failed.");
      }

      const saved = result.data;
      const nextResource: VaultItem = {
        id: saved.id,
        title: saved.title,
        subjectCode: saved.subject_code,
        subjectName: saved.subject_name,
        department: saved.department as VaultItem["department"],
        semester: saved.semester,
        type: saved.resource_type === "PYQ" ? "PYQ" : "Notes",
        year: new Date(saved.created_at || Date.now()).getFullYear().toString(),
        contributor: saved.contributor_name,
        contributorRoll: saved.contributor_roll,
        verified: saved.is_cr_verified,
        sha256: "stored-in-cloudinary",
        downloads: 0,
        pages: 0,
        date: "Just now",
      };
      setResources((current) => [nextResource, ...current]);
      setUploadTitle("");
      setUploadFileName("");
      setSelectedFile(null);
      setUploadOpen(false);
      setToast("Uploaded to Cloudinary and saved for admin review.");
    } catch (error: any) {
      setToast(error?.message || "Vault upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const deleteResource = async (resource: VaultItem) => {
    if (!profile || resource.contributorRoll !== profile.rollNumber) return;
    if (!session?.access_token) {
      setToast("Session expired. Please log in again.");
      setLoginModalOpen(true);
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/api/vault/resources/${resource.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result?.error?.message || "Delete failed.");
      }
      // Remove from local state only after server confirms deletion
      setResources((current) => current.filter((item) => item.id !== resource.id));
      setToast("Your upload was deleted from Vault and Cloudinary.");
    } catch (error: any) {
      setToast(error?.message || "Failed to delete resource.");
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#070e0a] text-[#f5f9f6] selection:bg-[#c79e4d] selection:text-[#0b1510]">
      <FixedCampusBackground />
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-12">
        <Link href="/vault" className="mb-7 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a4b8ab] hover:text-[#deb86d]"><ArrowLeft className="h-3.5 w-3.5" /> Academic Vault</Link>
        <section className="mb-10 border-b border-[#294231] pb-8">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]"><BookOpen className="h-4 w-4" /> {department} / SEMESTER {semester} / {subjectCode}</div>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h1 className="font-serif text-4xl text-white sm:text-6xl">{subjectName}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#b7cbbd]">A subject workspace for syllabus, revision notes, previous-year papers, and contributor-reviewed solutions.</p></div><div className="flex flex-wrap gap-2"><button onClick={() => { if (requireLogin()) { setUploadKind("Syllabus"); setUploadOpen(true); } }} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-[#c79e4d]/60 bg-[#070e0a]/60 px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#deb86d] hover:bg-[#c79e4d]/15"><FilePlus2 className="h-4 w-4" /> Add syllabus</button><button onClick={() => { if (requireLogin()) setUploadOpen(true); }} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#c79e4d] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d]"><FilePlus2 className="h-4 w-4" /> Add notes / PYQ</button></div></div>
        </section>

        <div className="space-y-8">
          {sectionConfig.map((section) => (
            <section key={section.kind} className="border-t border-[#294231] pt-5">
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="font-serif text-2xl text-white">{section.title}</h2><p className="mt-1 text-xs text-[#8fa597]">{section.description}</p></div><span className="text-[10px] font-mono uppercase tracking-widest text-[#deb86d]">{groupedResources[section.kind].length} resources</span></div>
              {section.kind === "SYLLABUS" && groupedResources.SYLLABUS.length === 0 ? <div className="rounded-xl border border-dashed border-[#38513f] p-6 text-sm text-[#9bb2a0]">The official syllabus will be added by a CR or administrator.</div> : <div className="grid gap-4 md:grid-cols-2">{groupedResources[section.kind].map((resource) => <ResourceRow key={resource.id} resource={resource} canDelete={Boolean(profile && profile.rollNumber === resource.contributorRoll)} reported={reportedIds.includes(resource.id)} onAccess={() => { if (requireLogin()) { if (resource.fileUrl) setViewerResource(resource); else setToast("This resource is waiting for its file URL."); } }} onReport={() => { if (requireLogin()) { setReportedIds((current) => [...current, resource.id]); setToast("Report sent to campus moderators."); } }} onDelete={() => deleteResource(resource)} />)}</div>}
            </section>
          ))}
        </div>
      </div>
      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      {viewerResource && <PdfViewer resource={viewerResource} onClose={() => setViewerResource(null)} />}

      {uploadOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"><form onSubmit={addResource} className="w-full max-w-md rounded-2xl border border-[#c79e4d]/50 bg-[#0b1510] p-6 text-white shadow-2xl"><div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-2xl">Add a resource</h2><button type="button" onClick={() => setUploadOpen(false)} disabled={uploading}><X className="h-5 w-5 text-[#a4b8ab]" /></button></div><div className="space-y-4"><div className="grid grid-cols-2 gap-2">{(["Notes", "PYQ"] as const).map((kind) => <button type="button" key={kind} onClick={() => setUploadKind(kind)} className={`rounded-lg border px-3 py-2 text-xs font-mono uppercase ${uploadKind === kind ? "border-[#c79e4d] bg-[#c79e4d] text-[#08120c]" : "border-[#38513f] text-[#a9c0ae]"}`}>{kind === "PYQ" ? "PYQ + solution" : kind}</button>)}</div><input value={uploadTitle} onChange={(event) => setUploadTitle(event.target.value)} placeholder="Resource title" className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm outline-none focus:border-[#deb86d]" /><label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-[#38513f] px-3 py-3 text-xs text-[#a9c0ae] hover:border-[#deb86d]"><Upload className="h-4 w-4 text-[#deb86d]" />{uploadFileName || "Choose PDF / DOCX / PPTX"}<input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(event) => { const file = event.target.files?.[0] || null; setSelectedFile(file); setUploadFileName(file?.name || ""); }} className="hidden" /></label><p className="text-[11px] leading-relaxed text-[#789080]">The file uploads to Cloudinary first, then its URL and metadata are saved in Supabase as pending review.</p><button disabled={uploading} className="w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] disabled:opacity-60">{uploading ? "Uploading..." : "Upload resource"}</button></div></form></div>}
      {toast && <button onClick={() => setToast(null)} className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#c79e4d]/50 bg-[#0b1510]/95 px-4 py-3 text-xs text-white shadow-xl">{toast}</button>}
    </main>
  );
}

function ResourceRow({ resource, canDelete, reported, onAccess, onReport, onDelete }: { resource: VaultItem; canDelete: boolean; reported: boolean; onAccess: () => void; onReport: () => void; onDelete: () => void }) {
  return <article className="rounded-xl border border-[#38513f] bg-[#0b1710]/80 p-4"><div className="flex items-start justify-between gap-3"><div><div className="mb-2 flex flex-wrap items-center gap-2"><span className="rounded border border-[#c79e4d]/40 bg-[#c79e4d]/10 px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-[#deb86d]">{resource.type} · {resource.year}</span>{resource.verified ? <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-300"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span> : <span className="text-[10px] font-mono text-amber-300">Pending review</span>}</div><h3 className="font-serif text-lg leading-tight text-white">{resource.title}</h3><p className="mt-2 text-xs text-[#9bb2a0]">Uploaded by {resource.contributor} · {resource.date}</p></div><FileText className="h-5 w-5 shrink-0 text-[#deb86d]" /></div><div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#294231] pt-3"><button onClick={onAccess} className="flex items-center gap-1.5 rounded-lg bg-[#c79e4d] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#08120c]"><LockKeyhole className="h-3.5 w-3.5" /> Read in viewer</button><button onClick={onReport} disabled={reported} className="flex items-center gap-1.5 rounded-lg border border-[#38513f] px-3 py-2 text-[11px] text-[#b7cbbd] disabled:opacity-50"><AlertTriangle className="h-3.5 w-3.5" /> {reported ? "Reported" : "Report wrong upload"}</button>{canDelete && <button onClick={onDelete} className="ml-auto flex items-center gap-1.5 rounded-lg border border-rose-500/40 px-3 py-2 text-[11px] text-rose-300"><Trash2 className="h-3.5 w-3.5" /> Delete my upload</button>}</div></article>;
}

function PdfViewer({ resource, onClose }: { resource: VaultItem; onClose: () => void }) {
  const [loading, setLoading] = useState(true);

  // Always use Google Docs Viewer — Cloudinary raw/upload triggers downloads in direct mode
  const rawPdfUrl = resource.fileUrl
    ? resource.fileUrl.replace("/image/upload/", "/raw/upload/")
    : "";
  const iframeSrc = `https://docs.google.com/viewer?url=${encodeURIComponent(rawPdfUrl)}&embedded=true`;

  useEffect(() => {
    const block = (event: MouseEvent) => event.preventDefault();
    const blockSave = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && ["s", "p", "u"].includes(event.key.toLowerCase())) event.preventDefault();
    };
    document.addEventListener("contextmenu", block);
    document.addEventListener("keydown", blockSave);
    return () => { document.removeEventListener("contextmenu", block); document.removeEventListener("keydown", blockSave); };
  }, []);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-[#070e0a]" onContextMenu={(e) => e.preventDefault()}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#294231] bg-[#0b1710] px-4 py-3 text-white">
        <div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#deb86d]">Protected campus reader</div>
          <h2 className="text-sm font-semibold">{resource.title}</h2>
          <p className="text-[10px] text-[#8fa597]">{resource.subjectCode} · {resource.type}</p>
        </div>
        <button onClick={onClose} className="rounded-lg border border-[#38513f] px-3 py-2 text-xs text-[#b7cbbd] hover:text-white">
          Close
        </button>
      </div>

      {/* Viewer */}
      <div className="relative flex-1 bg-[#1b1b1b] p-2">
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#8fa597]">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#c79e4d] border-t-transparent" />
            <span className="text-xs font-mono">Loading document…</span>
          </div>
        )}
        <iframe
          key={iframeSrc}
          title={resource.title}
          src={iframeSrc}
          className="h-full w-full border-0"
          onLoad={() => setLoading(false)}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </div>
  );
}