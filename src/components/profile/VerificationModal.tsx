"use client";

import { useState } from "react";
import { CheckCircle2, GraduationCap, ShieldCheck, X } from "lucide-react";

import { useAuth } from "@/context/AuthContext";

interface VerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
}

export default function VerificationModal({ isOpen, onClose, onVerified }: VerificationModalProps) {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [college, setCollege] = useState("Kalyani Government Engineering College");
  const [department, setDepartment] = useState("CSE");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!fullName.trim() || !rollNumber.trim() || !college.trim()) return;
    setSubmitting(true);
    try {
      await fetch("/api/user/verify-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          fullName: fullName.trim(),
          rollNumber: rollNumber.trim(),
          college: college.trim(),
          department,
        }),
      });
    } catch (err) {
      console.error("Failed to submit verification request:", err);
    } finally {
      setSubmitting(false);
    }
    setSubmitted(true);
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[#c79e4d]/50 bg-[#0b1510] p-6 text-white shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]"><ShieldCheck className="h-4 w-4" /> Optional identity verification</div>
            <h2 className="font-serif text-2xl">Verify your campus profile</h2>
          </div>
          <button type="button" onClick={onClose} className="text-[#9bb2a0] hover:text-white"><X className="h-5 w-5" /></button>
        </div>
        {submitted ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-5 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-9 w-9 text-emerald-300" />
            <h3 className="font-serif text-xl">Verification submitted</h3>
            <p className="mt-2 text-sm text-[#a9c0ae]">Your details are queued for review. The Verified tag will appear after the campus check is complete.</p>
            <button type="button" onClick={onClose} className="mt-5 rounded-lg bg-[#c79e4d] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#08120c]">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <p className="text-xs leading-relaxed text-[#a9c0ae]">Verification is optional. Your profile remains usable without it, and your phone number is never displayed publicly.</p>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">Full name<input required value={fullName} onChange={(event) => setFullName(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" placeholder="As shown on your college record" /></label>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">Roll number<input required value={rollNumber} onChange={(event) => setRollNumber(event.target.value.toUpperCase())} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" placeholder="22/CSE/042" /></label>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">College<input required value={college} onChange={(event) => setCollege(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]" /></label>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">Department<select value={department} onChange={(event) => setDepartment(event.target.value)} className="mt-1.5 w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm normal-case tracking-normal text-white outline-none focus:border-[#deb86d]"><option>CSE</option><option>ECE</option><option>EE</option><option>ME</option><option>IT</option></select></label>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d]"><GraduationCap className="h-4 w-4" /> Submit for verification</button>
          </form>
        )}
      </div>
    </div>
  );
}