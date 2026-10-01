"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import AuthGuard from "@/components/auth/AuthGuard";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/context/AuthContext";

const API_BASE = process.env.NEXT_PUBLIC_SERVER_URL || "https://college-nexus-rjln.onrender.com";

export default function VaultReadPage({ params }: { params: { id: string } }) {
  const { session } = useAuth();
  const [resource, setResource] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.access_token) return;
    fetch(`${API_BASE}/api/vault/resources?id=${encodeURIComponent(params.id)}`, {
      headers: { Authorization: `Bearer ${session.access_token}` },
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success || !result.data?.[0]) throw new Error(result?.error?.message || "Resource not found.");
        setResource(result.data[0]);
      })
      .catch((requestError) => setError(requestError.message));
  }, [params.id, session?.access_token]);

  return (
    <AuthGuard resourceName="Protected Vault Reader" resourceDescription="Sign in to read this academic resource inside the College Nexus viewer.">
      <main className="min-h-screen bg-[#070e0a] text-white">
        <FixedCampusBackground />
        <Navbar />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-4 pb-8 pt-28 sm:px-6 lg:px-10">
          <div className="mb-4 flex items-center justify-between gap-4"><Link href="/vault" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#a9c0ae] hover:text-[#deb86d]"><ArrowLeft className="h-4 w-4" /> Vault</Link><div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-emerald-300"><ShieldCheck className="h-4 w-4" /> Protected reader</div></div>
          {error ? <div className="flex flex-1 items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-950/30 p-8 text-sm text-rose-200">{error}</div> : resource ? <div className="flex min-h-[75vh] flex-1 flex-col overflow-hidden rounded-2xl border border-[#38513f] bg-[#1b1b1b] shadow-2xl"><div className="border-b border-[#38513f] bg-[#0b1710] px-4 py-3"><h1 className="text-sm font-semibold text-white">{resource.title}</h1><p className="mt-1 text-[11px] text-[#9bb2a0]">{resource.subject_code} · {resource.resource_type} · {resource.contributor_name}</p></div><iframe title={resource.title} src={`${resource.file_url}#toolbar=0&navpanes=0&scrollbar=1`} className="min-h-[70vh] flex-1 border-0" onContextMenu={(event) => event.preventDefault()} /></div> : <div className="flex flex-1 items-center justify-center text-xs font-mono text-[#deb86d]">Loading protected resource...</div>}
        </div>
        <Footer />
      </main>
    </AuthGuard>
  );
}