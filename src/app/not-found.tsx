import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return <main className="flex min-h-screen items-center justify-center bg-[#070e0a] px-4 text-white"><div className="w-full max-w-lg text-center"><Compass className="mx-auto mb-5 h-12 w-12 text-[#deb86d]" /><div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#deb86d]">404 / ARCHIVE COORDINATES UNKNOWN</div><h1 className="mt-3 font-serif text-5xl">Page not found.</h1><p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#a9c0ae]">That campus route does not exist or has moved to another archive.</p><Link href="/" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#c79e4d] px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#08120c]"><ArrowLeft className="h-4 w-4" /> Return to campus</Link></div></main>;
}