"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import LoginModal from "@/components/LoginModal";
import {
  ShieldCheck,
  Lock,
  ArrowRight,
  Sparkles,
  Users,
  MessageSquare,
  FileText,
  KeyRound,
  GraduationCap,
} from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
  resourceName?: string;
  resourceDescription?: string;
  accessMode?: "clearance" | "login" | "public";
}

export default function AuthGuard({
  children,
  resourceName = "Student Intranet Resource",
  resourceDescription = "Access to verified student profiles, institutional directories, and encrypted peer messaging is strictly restricted to authenticated students and faculty of Kalyani Government Engineering College.",
  accessMode = "clearance",
}: AuthGuardProps) {
  const { profile, loading } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  if (accessMode === "public") {
    return <>{children}</>;
  }

  // 1. Initial Authentication Check State
  if (loading) {
    return (
      <div className="relative min-h-screen flex items-center justify-center bg-[#070e0a] text-[#e0ece4]">
        <FixedCampusBackground />
        <div className="relative z-10 flex flex-col items-center p-8 bg-[#0c1813]/80 backdrop-blur-2xl border border-[#233d2e] rounded-3xl shadow-2xl max-w-sm text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#dfc285] to-[#9c752c] p-[2px] mb-4 animate-pulse">
            <div className="w-full h-full bg-[#0b1510] rounded-full flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-[#deb86d]" />
            </div>
          </div>
          <div className="text-[10px] font-mono tracking-[0.25em] text-[#deb86d] uppercase mb-1 font-semibold">
            SECURITY GATEWAY
          </div>
          <h2 className="text-base font-serif font-bold text-white mb-2">
            Verifying Institutional Credentials
          </h2>
          <p className="text-xs text-[#8da396] font-mono">
            College Nexus Intranet • KGEC Campus Network
          </p>
          <div className="w-24 h-1 bg-[#182c21] rounded-full mt-4 overflow-hidden">
            <div className="w-full h-full bg-[#deb86d] animate-[loading_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated State — Luxury Collegiate Auth Gate
  if (!profile) {
    if (accessMode === "login") {
      return (
        <div className="relative min-h-screen bg-[#070e0a] text-[#e0ece4]">
          <FixedCampusBackground />
          <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />
          <div className="relative z-10 flex min-h-screen items-center justify-center px-4 pt-20 pb-16">
            <div className="w-full max-w-md rounded-2xl border border-[#294735] bg-[#09140e]/90 p-8 text-center shadow-2xl backdrop-blur-2xl">
              <ShieldCheck className="mx-auto mb-4 h-10 w-10 text-[#deb86d]" />
              <div className="mb-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#deb86d]">KGEC MEMBER ACCESS</div>
              <h1 className="mb-3 font-serif text-3xl text-white">Sign in to continue</h1>
              <p className="mb-7 text-sm leading-relaxed text-[#a9bcae]">{resourceName} is available to authenticated campus members.</p>
              <button
                onClick={() => setLoginModalOpen(true)}
                className="w-full rounded-xl bg-[#c79e4d] px-5 py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] transition hover:bg-[#deb86d]"
              >
                Sign in or create account
              </button>
              <Link href="/" className="mt-4 inline-block text-xs text-[#9ab3a3] transition hover:text-[#deb86d]">Return to campus home</Link>
            </div>
          </div>
          <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </div>
      );
    }
    return (
      <div className="relative min-h-screen text-[#16211a] selection:bg-[#c79e4d] selection:text-[#0b1510] pb-16">
        <FixedCampusBackground />
        <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

        <div className="relative z-10 pt-28 sm:pt-36 px-4 max-w-4xl mx-auto">
          {/* Main Card */}
          <div className="bg-[#09140e]/85 backdrop-blur-2xl border border-[#274635] shadow-[0_20px_60px_rgba(0,0,0,0.6)] rounded-3xl p-6 sm:p-10 text-center text-[#dce7e1] relative overflow-hidden">
            
            {/* Ambient Gold Glow Corner */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1b3a2a]/40 rounded-full blur-3xl pointer-events-none"></div>

            {/* Crest / Shield Icon */}
            <div className="relative mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#dfc285] via-[#c79e4d] to-[#9c752c] p-[2px] shadow-2xl mb-6 group">
              <div className="w-full h-full bg-[#0b1610] rounded-full flex items-center justify-center">
                <Lock className="w-7 h-7 sm:w-9 sm:h-9 text-[#deb86d] group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Security Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#14261c] border border-[#2a4d38] rounded-full text-[10px] sm:text-xs font-mono font-semibold text-[#deb86d] uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#deb86d]" />
              <span>Restricted Zone • Authentication Required</span>
            </div>

            {/* Heading & Subhead */}
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight mb-3">
              Institutional Clearance Required
            </h1>
            <p className="text-xs sm:text-sm text-[#9ab3a3] max-w-xl mx-auto leading-relaxed mb-8">
              {resourceDescription}
            </p>

            {/* Target Resource Tag */}
            <div className="inline-block px-3.5 py-1.5 bg-[#122319]/90 border border-[#203a2a] rounded-xl text-xs font-mono text-[#c79e4d] mb-8">
              Locked Directory: <span className="text-white font-semibold">{resourceName}</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto mb-10">
              <button
                onClick={() => setLoginModalOpen(true)}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] font-bold text-xs uppercase tracking-wider rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                <KeyRound className="w-4 h-4 text-[#08120c]" />
                <span>Authenticate Session</span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25 text-[#e0ece4] text-xs font-medium tracking-wide rounded-full transition-all"
              >
                <span>Campus Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#deb86d]" />
              </Link>
            </div>

            {/* Four Intranet Pillars Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-8 border-t border-[#1b3425] text-left">
              <div className="p-3.5 bg-[#0f2016]/60 rounded-2xl border border-[#1e382b]">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#deb86d]" />
                  <span>Verified Roll Registry</span>
                </div>
                <p className="text-[11px] text-[#7d9687] leading-relaxed">
                  Every account is linked to an authentic KGEC student roll number and Makaut registry.
                </p>
              </div>

              <div className="p-3.5 bg-[#0f2016]/60 rounded-2xl border border-[#1e382b]">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <MessageSquare className="w-4 h-4 text-[#deb86d]" />
                  <span>Encrypted Peer Chat</span>
                </div>
                <p className="text-[11px] text-[#7d9687] leading-relaxed">
                  Project squads, society discussions, and private campus communications.
                </p>
              </div>

              <div className="p-3.5 bg-[#0f2016]/60 rounded-2xl border border-[#1e382b]">
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-1">
                  <GraduationCap className="w-4 h-4 text-[#deb86d]" />
                  <span>Career & Placement Feed</span>
                </div>
                <p className="text-[11px] text-[#7d9687] leading-relaxed">
                  Access official campus recruitment notices, internship boards, and peer endorsements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Login Modal */}
        <LoginModal
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
        />
      </div>
    );
  }

  // 3. Authenticated State — Render Protected Content
  return <>{children}</>;
}
