"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookPlus, X, PackagePlus, ShoppingBag, Bell } from "lucide-react";
import CampusExplorer from "@/components/CampusExplorer";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import Navbar from "@/components/Navbar";
import AuthGuard from "@/components/auth/AuthGuard";
import { useAuth } from "@/context/AuthContext";

import { getStoredSubjects, saveSubject, SubjectNode } from "@/lib/subjectStore";
import LostFoundModal from "@/components/LostFoundModal";
import MarketplaceModal from "@/components/MarketplaceModal";

type DirectoryKind = "vault" | "cse" | "ece" | "ee" | "me" | "it" | "marketplace" | "notice" | "lost";

export default function ResourceDirectory({ kind }: { kind: DirectoryKind }) {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [subjectModalOpen, setSubjectModalOpen] = useState(false);
  const [lostFoundModalOpen, setLostFoundModalOpen] = useState(false);
  const [marketplaceModalOpen, setMarketplaceModalOpen] = useState(false);
  
  const initialCategory = kind === "marketplace" ? "MARKETPLACE" : kind === "notice" ? "NOTICES" : kind === "lost" ? "LOSTFOUND" : "VAULT";
  const initialDeptFilter = 
    kind === "cse" ? "CSE" : 
    kind === "ece" ? "ECE" : 
    kind === "ee" ? "EE" : 
    kind === "me" ? "ME" : 
    kind === "it" ? "IT" : "ALL";
    
  const requiresLogin = false; // Accessible to all KGEC students
  const canAddSubject = kind === "vault" || kind === "cse" || kind === "ece" || kind === "ee" || kind === "me" || kind === "it";

  const [subjectForm, setSubjectForm] = useState({ 
    department: initialDeptFilter !== "ALL" ? initialDeptFilter : "CSE", 
    name: "", 
    code: "", 
    semester: "1", 
    description: "" 
  });
  
  const [createdSubjects, setCreatedSubjects] = useState<SubjectNode[]>(() => {
    return getStoredSubjects();
  });
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { profile, user } = useAuth();
  const isAdmin = user?.email?.toLowerCase() === (process.env.NEXT_PUBLIC_ADMIN_EMAIL || "sunetrabar@gmail.com").toLowerCase();

  useEffect(() => {
    setCreatedSubjects(getStoredSubjects());
    const syncSubjects = () => setCreatedSubjects(getStoredSubjects());
    window.addEventListener("nexus_storage_updated", syncSubjects);
    return () => window.removeEventListener("nexus_storage_updated", syncSubjects);
  }, []);

  const openSubjectForm = () => {
    if (!profile) {
      setLoginModalOpen(true);
      return;
    }
    setSubjectForm((prev) => ({
      ...prev,
      department: initialDeptFilter !== "ALL" ? initialDeptFilter : prev.department || "CSE",
    }));
    setSubjectModalOpen(true);
  };

  const addSubject = (event: React.FormEvent) => {
    event.preventDefault();
    if (!profile || !subjectForm.name.trim() || !subjectForm.code.trim()) return;
    const nextSubject: SubjectNode = {
      department: subjectForm.department.toUpperCase() as SubjectNode["department"],
      semester: Number(subjectForm.semester || 1),
      name: subjectForm.name.trim(),
      code: subjectForm.code.trim().toUpperCase(),
      description: subjectForm.description.trim(),
    };
    const updated = saveSubject(nextSubject);
    setCreatedSubjects(updated);
    setSubjectForm({ 
      department: initialDeptFilter !== "ALL" ? initialDeptFilter : "CSE", 
      name: "", 
      code: "", 
      semester: "1", 
      description: "" 
    });
    setSubjectModalOpen(false);
    setToastMessage(`${nextSubject.code} (${nextSubject.name}) added under ${nextSubject.department} Semester ${nextSubject.semester}.`);
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
          additionalSubjects={canAddSubject ? createdSubjects : []}
          beforeFilters={
            canAddSubject ? (
              <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-12">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#c79e4d]/30 bg-[#070e0a]/60 px-4 py-3 backdrop-blur-md">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">SUBJECT TAXONOMY</div>
                    <p className="mt-1 text-xs text-[#a9c0ae]">Can&apos;t find a subject? Add its department, code, semester, and syllabus scope.</p>
                  </div>
                  <button onClick={openSubjectForm} className="flex shrink-0 items-center gap-2 rounded-lg bg-[#c79e4d] px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] shadow-md transition-colors">
                    <BookPlus className="h-4 w-4" /> Add subject
                  </button>
                </div>
              </div>
            ) : kind === "lost" ? (
              <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#c79e4d]/35 bg-[#070e0a]/75 px-5 py-4 backdrop-blur-md shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
                      <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-pulse"></span>
                      CAMPUS LOST &amp; FOUND PROTOCOL
                    </div>
                    <p className="mt-1 text-xs text-[#dbe7df]">
                      Anyone can report personal belongings found on campus or register a lost item with private verification.
                    </p>
                  </div>
                  <button
                    onClick={() => setLostFoundModalOpen(true)}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#c79e4d] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] shadow-md transition-all cursor-pointer"
                  >
                    <PackagePlus className="h-4 w-4" /> Report Lost / Found Item
                  </button>
                </div>
              </div>
            ) : kind === "marketplace" ? (
              <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-emerald-500/35 bg-[#070e0a]/75 px-5 py-4 backdrop-blur-md shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      0% COMMISSION PEER MARKETPLACE
                    </div>
                    <p className="mt-1 text-xs text-[#dbe7df]">
                      Every student can sell engineering drafters, lab equipment, standard reference textbooks, and gear.
                    </p>
                  </div>
                  <button
                    onClick={() => setMarketplaceModalOpen(true)}
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#c79e4d] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="h-4 w-4" /> Sell an Item
                  </button>
                </div>
              </div>
            ) : kind === "notice" ? (
              <div className="mx-auto mb-8 flex max-w-7xl flex-col gap-4 px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-[#c79e4d]/30 bg-[#070e0a]/75 px-5 py-4 backdrop-blur-md shadow-xl">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
                      <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-pulse"></span>
                      OFFICIAL CAMPUS BULLETIN
                    </div>
                    <p className="mt-1 text-xs text-[#dbe7df]">
                      Official notices from T&amp;P cell, department heads, and examination committee.
                    </p>
                  </div>
                  <Link
                    href="/sunetra"
                    className="flex shrink-0 items-center gap-2 rounded-lg bg-[#c79e4d] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] shadow-md transition-all cursor-pointer"
                  >
                    <Bell className="h-4 w-4" /> Admin Notice Desk (/sunetra) →
                  </Link>
                </div>
              </div>
            ) : null
          }
        />
      </div>
      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      
      {/* Lost & Found Modal */}
      <LostFoundModal
        isOpen={lostFoundModalOpen}
        onClose={() => setLostFoundModalOpen(false)}
        onItemAdded={(item) => setToastMessage(`Reported ${item.itemName} (${item.category}) to campus registry.`)}
      />

      {/* Marketplace Modal */}
      <MarketplaceModal
        isOpen={marketplaceModalOpen}
        onClose={() => setMarketplaceModalOpen(false)}
        onItemAdded={(item) => setToastMessage(`Listed "${item.title}" for ₹${item.price} in campus marketplace.`)}
      />

      {subjectModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <form onSubmit={addSubject} className="w-full max-w-lg rounded-2xl border border-[#c79e4d]/50 bg-[#0b1510] p-6 text-white shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">NEW ACADEMIC NODE</div>
                <h2 className="mt-1 font-serif text-2xl">Add a subject</h2>
              </div>
              <button type="button" onClick={() => setSubjectModalOpen(false)} className="text-[#9bb2a0] hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Department
                <select 
                  value={subjectForm.department} 
                  onChange={(event) => setSubjectForm({ ...subjectForm, department: event.target.value })} 
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"
                >
                  <option value="CSE">CSE (Computer Science)</option>
                  <option value="ECE">ECE (Electronics & Comm)</option>
                  <option value="EE">EE (Electrical)</option>
                  <option value="ME">ME (Mechanical)</option>
                  <option value="IT">IT (Information Tech)</option>
                </select>
              </label>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Semester
                <select 
                  value={subjectForm.semester} 
                  onChange={(event) => setSubjectForm({ ...subjectForm, semester: event.target.value })} 
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                    <option key={semester} value={semester}>Semester {semester}</option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] sm:col-span-2">
                Subject name
                <input 
                  required 
                  value={subjectForm.name} 
                  onChange={(event) => setSubjectForm({ ...subjectForm, name: event.target.value })} 
                  placeholder="e.g. Operating Systems" 
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" 
                />
              </label>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Subject code
                <input 
                  required 
                  value={subjectForm.code} 
                  onChange={(event) => setSubjectForm({ ...subjectForm, code: event.target.value.toUpperCase() })} 
                  placeholder="e.g. CS601 or ESC 301" 
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" 
                />
              </label>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Syllabus / scope
                <input 
                  value={subjectForm.description} 
                  onChange={(event) => setSubjectForm({ ...subjectForm, description: event.target.value })} 
                  placeholder="Optional short description" 
                  className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" 
                />
              </label>
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-[#789080]">
              New subjects are saved under your selected department and semester. Notes and PYQs for this subject will be automatically categorized under this department and semester.
            </p>
            <button className="mt-5 w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d]">
              Create subject
            </button>
          </form>
        </div>
      )}
      {toastMessage && (
        <button
          onClick={() => setToastMessage(null)}
          className="fixed bottom-6 right-6 z-50 rounded-xl border border-[#c79e4d]/50 bg-[#0b1510]/95 px-5 py-3.5 text-xs text-white shadow-2xl flex items-center gap-3 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </button>
      )}
      </main>
    </AuthGuard>
  );
}