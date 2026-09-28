"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  FileCheck2,
  Lock,
  Search,
  CheckCircle2,
  Terminal,
  Sparkles,
  Users,
} from "lucide-react";
import RedUnderline from "./RedUnderline";
import RedStar from "./RedStar";

interface HeroProps {
  onOpenLoginModal?: () => void;
}

export default function Hero({ onOpenLoginModal }: HeroProps) {
  const [selectedPill, setSelectedPill] = useState<"CS501" | "EC302" | "EE601">("CS501");

  const sampleCardData = {
    CS501: {
      title: "Computer Networks CS501 — 2023 End-Sem Solved Solutions",
      dept: "CSE",
      sem: "Semester 5",
      code: "CS501",
      pages: "28 Pages PDF",
      sha256: "7f8a92e104bb8f92...",
      cr: "22/CSE/042 (CR Approved)",
      status: "100% Verified Solutions",
    },
    EC302: {
      title: "Analog Electronic Circuits — Comprehensive Master Guide",
      dept: "ECE",
      sem: "Semester 3",
      code: "EC302",
      pages: "64 Pages PDF",
      sha256: "3c1b489a6112d8a0...",
      cr: "23/ECE/018 (CR Approved)",
      status: "100% Verified Notes",
    },
    EE601: {
      title: "Electric Power Systems — Solved Numerical Bank & PYQs",
      dept: "EE",
      sem: "Semester 6",
      code: "EE601",
      pages: "36 Pages PDF",
      sha256: "99e410bc44a8fe21...",
      cr: "21/EE/029 (CR Approved)",
      status: "100% Verified Bank",
    },
  };

  const currentPreview = sampleCardData[selectedPill];

  return (
    <section id="home" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-200/80">
      {/* Modern Subtle Tech Dot Grid Background */}
      <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none z-0"></div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Pill Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-semibold tracking-wide w-max mb-6">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
              <span>COLLEGE NEXUS // KGEC INTRANET HUB</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold tracking-tight text-slate-900 leading-[1.12] mb-6">
              One Campus. <br />
              One Network. <br />
              <span className="relative inline-block text-slate-900">
                Zero Fragmentation.
                <RedUnderline className="absolute -bottom-1.5 sm:-bottom-2.5 left-0" />
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Engineering students lose precious study time and academic equipment across chaotic WhatsApp groups.{" "}
              <strong className="text-slate-900 font-semibold">College Nexus</strong> unifies the collegiate experience into an authenticated, roll-number-verified academic hub with cryptographic duplicate rejection and private lost-and-found recovery.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                href="/profile"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs tracking-wider uppercase rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
              >
                <Users className="w-4 h-4" />
                <span>STUDENT NETWORK & PROFILES</span>
              </Link>

              <a
                href="#vault"
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-200 shadow-2xs"
              >
                <span>EXPLORE VAULT</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#board"
                className="inline-flex items-center gap-2 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all duration-200"
              >
                <span>NOTICES</span>
              </a>

              <button
                onClick={onOpenLoginModal}
                className="px-3 py-3.5 text-xs text-slate-500 hover:text-red-600 font-semibold tracking-wider uppercase flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Roll Auth</span>
              </button>
            </div>

            {/* Micro Highlights */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase font-mono block">
                  Student Network
                </span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">
                  LinkedIn-Style Hub
                </span>
                <span className="text-[11px] text-slate-500">Peer connections &amp; jobs</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase font-mono block">
                  Campus Vault
                </span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">
                  Taxonomy Filtered
                </span>
                <span className="text-[11px] text-slate-500">CSE, ECE, EE, ME, IT</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase font-mono block">
                  The Board
                </span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">
                  Private Recovery
                </span>
                <span className="text-[11px] text-slate-500">Zero phone exposure</span>
              </div>
              <div>
                <span className="text-[11px] font-bold text-red-600 uppercase font-mono block">
                  Marketplace
                </span>
                <span className="text-xs font-semibold text-slate-900 block mt-0.5">
                  Peer Exchange
                </span>
                <span className="text-[11px] text-slate-500">0% transaction fees</span>
              </div>
            </div>
          </div>

          {/* Right Column: Screenshot-Inspired Clean Tech Cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Card 1: "Welcome back, KGECian" Card */}
            <div className="bg-white border border-[#e5e0d8] shadow-sm rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="font-mono text-[11px] font-semibold text-slate-700">KGEC INTRANET // SESSION 2024-25</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-red-50 text-[#b93a32] border border-red-200/80 rounded font-semibold">
                  ROLL VERIFIED
                </span>
              </div>

              {/* Welcome Title in Zilla Slab with Red Underline */}
              <div className="relative inline-block mb-3">
                <h3 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                  Welcome back, KGECian
                </h3>
                <RedUnderline className="absolute -bottom-1 left-0" />
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
                Here&apos;s your campus overview &amp; academic pulse.
              </p>

              {/* Student Network Teaser */}
              <Link
                href="/profile"
                className="p-3 bg-slate-50 border border-slate-200/90 rounded-xl flex items-center justify-between hover:bg-red-50/50 hover:border-red-200 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                    AS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 group-hover:text-red-600">
                      Arjun Sen (3rd Year CSE)
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>#Open_To_Work · 486 Connections</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-red-600 group-hover:translate-x-0.5 transition-transform">
                  View Profile &rarr;
                </span>
              </Link>
            </div>

            {/* Card 2: "✦ Academic Pulse" Card */}
            <div className="bg-white border border-[#e5e0d8] shadow-sm rounded-2xl p-6 sm:p-8 relative">
              {/* Card Title in Zilla Slab with Red Star */}
              <div className="flex items-center gap-2.5 mb-2">
                <RedStar className="w-5 h-5 text-[#b93a32]" />
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  Academic Pulse
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-5 leading-relaxed">
                Filter verified syllabus papers, lecture notes &amp; PYQs across departments.
              </p>

              {/* Subject Switcher & Filter */}
              <div className="space-y-4">
                {/* Search Simulator Input */}
                <div className="flex items-center justify-between p-2.5 bg-[#fbf9f5] border border-[#e5e0d8] rounded-xl text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Search className="w-3.5 h-3.5 text-[#b93a32]" />
                    <span className="text-slate-800">
                      filter --dept {currentPreview.dept} --sub {currentPreview.code}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold">10ms</span>
                </div>

                {/* Subject Switcher Buttons */}
                <div className="flex items-center gap-2">
                  {(["CS501", "EC302", "EE601"] as const).map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedPill(sub)}
                      className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                        selectedPill === sub
                          ? "bg-slate-900 border-slate-900 text-white font-bold shadow-xs"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                  <span className="text-[10px] text-slate-400 ml-auto">
                    Click to switch demo
                  </span>
                </div>

                {/* Preview Document Card */}
                <div className="border border-[#e5e0d8] bg-[#fbf9f5]/70 p-4 rounded-xl relative hover:border-[#b93a32]/50 transition-colors">
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#b93a32] text-white rounded">
                          {currentPreview.dept}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white text-slate-600 border border-slate-200 rounded">
                          {currentPreview.sem}
                        </span>
                      </div>
                      <h4 className="text-sm font-heading font-bold text-slate-900 leading-snug">
                        {currentPreview.title}
                      </h4>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded shrink-0">
                      CR VERIFIED
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-1.5 text-xs text-slate-600 font-mono">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-800 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#b93a32]" />
                        {currentPreview.cr}
                      </span>
                      <span className="text-slate-500">{currentPreview.pages}</span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] bg-white p-2 rounded-lg border border-[#e5e0d8]">
                      <span className="text-slate-500">SHA-256 HASH:</span>
                      <span className="text-slate-800 font-bold">{currentPreview.sha256}</span>
                    </div>
                  </div>
                </div>

                {/* Subnet Status Strip */}
                <div className="bg-[#fbf9f5] border border-[#e5e0d8] p-3 rounded-xl flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Subnet: KGEC-RESIDENTIAL-WIFI</span>
                  </div>
                  <span className="text-[#b93a32] font-bold">2,450 Verified Nodes</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
