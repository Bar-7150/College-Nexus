"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-screen items-center justify-center bg-[#070e0a] px-4 text-white"><div className="w-full max-w-lg rounded-2xl border border-[#c79e4d]/35 bg-[#0b1710]/90 p-8 text-center shadow-2xl"><AlertTriangle className="mx-auto mb-4 h-10 w-10 text-[#deb86d]" /><div className="mb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#deb86d]">NEXUS SYSTEM NOTICE</div><h1 className="font-serif text-3xl">This page hit a rough patch.</h1><p className="mt-3 text-sm leading-relaxed text-[#a9c0ae]">The campus service could not complete that request. Your session and saved data remain protected.</p><div className="mt-7 flex flex-wrap justify-center gap-3"><button onClick={() => reset()} className="flex items-center gap-2 rounded-lg bg-[#c79e4d] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#08120c]"><RefreshCw className="h-4 w-4" /> Try again</button><Link href="/" className="flex items-center gap-2 rounded-lg border border-[#38513f] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#d4e4da]"><Home className="h-4 w-4" /> Campus home</Link></div></div></main>;
}