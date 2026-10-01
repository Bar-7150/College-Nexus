"use client";

import { useState } from "react";
import Link from "next/link";
import { BookPlus, X } from "lucide-react";
import CampusExplorer from "@/components/CampusExplorer";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";

type DirectoryKind = "vault" | "cse" | "marketplace" | "notice" | "lost";

export default function ResourceDirectory({ kind }: { kind: DirectoryKind }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({ department: "CSE", name: "", code: "", semester: "1", description: "" });
  const [createdSubjects, setCreatedSubjects] = useState<Array<typeof subjectForm>>([]);
  const [subjectToast, setSubjectToast] = useState<string | null>(null);
  const { profile } = useAuth();
  const initialCategory = kind === "marketplace" ? "MARKETPLACE" : kind === "notice" ? "NOTICES" : kind === "lost" ? "LOSTFOUND" : "VAULT";
  const initialDeptFilter = kind === "cse" ? "CSE" : "ALL";
  const requiresLogin = kind === "marketplace";
  const canAddSubject = kind === "vault" || kind === "cse";

  const openSubjectForm = () => {
    if (!profile) {
      setLoginModalOpen(true);
      return;
    }
    setSubjectModalOpen(true);
  };

  const addSubject = (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile || !subjectForm.name.trim() || !subjectForm.code.trim()) return;
    const nextSubject = {
      ...subjectForm,
      name: subjectForm.name.trim(),
      code: subjectForm.code.trim().toUpperCase(),
    };
    setCreatedSubjects((current) => [nextSubject, ...current]);
    setSubjectForm({ department: "CSE", name: "", code: "", semester: "1", description: "" });
    setSubjectModalOpen(false);
    setSubjectToast(`${nextSubject.code} added to the subject index.`);
  };

  return (
    <AuthGuard
      resourceName="KGEC Campus Resource Directory"
      accessMode={requiresLogin ? "login" : "public"}
    >
      <main className="min-h-screen overflow-x-hidden bg-[#070e0a] text-[#f5f9f6] selection:bg-[#c79e4d] selection:text-[#0b1510]">
      <FixedCampusBackground />
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />
      <div className="relative z-10 pt-20">
        <CampusExplorer
          initialCategory={initialCategory}
          initialDeptFilter={initialDeptFilter}
          onOpenLoginModal={() => setLoginModalOpen(true)}
          beforeFilters={canAddSubject ? (
          <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-12">
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#c79e4d]/30 bg-[#070e0a]/60 px-4 py-3 backdrop-blur-md">
              <div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">SUBJECT TAXONOMY</div><p className="mt-1 text-xs text-[#a9c0ae]">Can&apos;t find a subject? Add its department, code, semester, and syllabus scope.</p></div>
              <button onClick={openSubjectForm} className="flex shrink-0 items-center gap-2 rounded-lg bg-[#c79e4d] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d]"><BookPlus className="h-4 w-4" /> Add subject</button>
            </div>
            {createdSubjects.length > 0 && <div className="flex flex-wrap gap-2">{createdSubjects.map((subject) => <Link key={subject.code} href={`/vault/subject/${subject.code.toLowerCase()}`} className="rounded-lg border border-[#38513f] bg-[#0b1710]/80 px-3 py-2 text-xs text-[#d4e4da] hover:border-[#deb86d] hover:text-[#deb86d]"><span className="font-mono text-[#deb86d]">{subject.code}</span> · {subject.name} <span className="text-[#789080]">· {subject.department}</span></Link>)}</div>}
          </div>
          ) : null}
        />
      </div>
      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      {subjectModalOpen && <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"><form onSubmit={addSubject} className="w-full max-w-lg rounded-2xl border border-[#c79e4d]/50 bg-[#0b1510] p-6 text-white shadow-2xl"><div className="mb-5 flex items-center justify-between"><div><div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">NEW ACADEMIC NODE</div><h2 className="mt-1 font-serif text-2xl">Add a subject</h2></div><button type="button" onClick={() => setSubjectModalOpen(false)} className="text-[#9bb2a0] hover:text-white"><X className="h-5 w-5" /></button></div><div className="grid gap-4 sm:grid-cols-2"><label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">Department<select value={subjectForm.department} onChange={(event) => setSubjectForm({ ...subjectForm, department: event.target.value })} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"><option>CSE</option><option>ECE</option><option>EE</option><option>ME</option><option>IT</option></select></label><label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">Semester<select value={subjectForm.semester} onChange={(event) => setSubjectForm({ ...subjectForm, semester: event.target.value })} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]">{[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => <option key={semester}>{semester}</option>)}</select></label><label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] sm:col-span-2">Subject name<input required value={subjectForm.name} onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} placeholder="e.g. Operating Systems" className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label><label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">Subject code<input required value={subjectForm.code} onChange={(event) => setSubjectForm({ ...subjectForm, code: event.target.value.toUpperCase() })} placeholder="CS601" className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label><label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">Syllabus / scope<input value={subjectForm.description} onChange={(event) => setSubjectForm({ ...subjectForm, description: event.target.value })} placeholder="Optional short description" className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label></div><p className="mt-4 text-[11px] leading-relaxed text-[#789080]">New subjects are added to your current subject index. A CR or administrator can review the taxonomy entry before it becomes official.</p><button className="mt-5 w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d]">Create subject</button></form></div>}
      {subjectToast && <button onClick={() => setSubjectToast(null)} className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#c79e4d]/50 bg-[#0b1510]/95 px-4 py-3 text-xs text-white shadow-xl">{subjectToast}</button>}
      </main>
    </AuthGuard>
  );
}