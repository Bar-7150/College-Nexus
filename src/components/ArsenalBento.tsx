"use client";

import React from "react";
import {
  BookOpen,
  BellRing,
  ShoppingBag,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  Lock,
  ArrowRight,
  Database,
  FileCheck2,
} from "lucide-react";
import RedStar from "./RedStar";

export default function ArsenalBento() {
  return (
    <section id="arsenal" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col mb-14">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-6 h-[2px] bg-red-600 rounded-full"></span>
            <span className="text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase font-mono">
              CAMPUS ARSENAL // 学術基盤
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 tracking-tight leading-tight">
            Weapons of <span className="text-[#b93a32]">Collegiate Excellence</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mt-3 leading-relaxed">
            Eliminating digital chaos across Kalyani Government Engineering College with four unified, high-velocity campus utilities.
          </p>
        </div>

        {/* Bento Grid with Unified Clean Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          
          {/* Bento Card 1: Large Featured Card (Campus Vault) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-slate-200 hover:border-red-500/50 p-8 sm:p-10 rounded-xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md relative overflow-hidden">
            {/* Subtle Gradient Accent Overlay */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-amber-500"></div>

            {/* Top Row Badges */}
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200/80">
                  MODULE 01
                </span>
                <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 bg-red-600 text-white rounded-full shadow-2xs">
                  850+ VERIFIED
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div>
              <div className="text-[11px] font-bold tracking-wider text-[#b93a32] uppercase mb-1.5 font-mono">
                Taxonomy-Driven Academic Archive
              </div>
              <div className="flex items-center gap-2.5 mb-3">
                <RedStar className="w-5 h-5 text-[#b93a32]" />
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
                  The Campus Vault
                </h3>
              </div>
              <p className="text-sm text-slate-600 max-w-xl leading-relaxed mb-6">
                Replace ephemeral WhatsApp Google Drive links with a permanent, taxonomy-driven repository. Browse smoothly by Department (CSE, ECE, EE, ME, IT) → Semester → Subject Code → Verified PYQs & Notes.
              </p>

              {/* Feature Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#b93a32]"></span>
                  <span>SHA-256 Duplicate Check</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>CR Verification Seal</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 font-medium text-xs">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Instant 10ms Search</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: The Board (Official Notices & Recovery) */}
          <div className="bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md relative overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <BellRing className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200/80">
                DUAL STREAM
              </span>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-blue-600 uppercase mb-1.5 font-mono">
                Zero-Noise Broadcasts
              </div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <RedStar className="w-4 h-4 text-[#b93a32]" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                  The Board
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Critical Training & Placement notices, exam regularization deadlines, and a private lost equipment recovery feed with confidential proof claims.
              </p>

              {/* Micro Status Box */}
              <div className="p-3.5 bg-[#fbf9f5] border border-[#e5e0d8] rounded-xl text-xs font-mono">
                <div className="flex items-center justify-between text-slate-900 font-bold mb-1">
                  <span className="text-[#b93a32]">LOST ITEM CLAIM</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded font-semibold">ACTIVE</span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  Casio fx-991EX · Drawing Hall 2 · Zero Phone Exposure
                </p>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Campus Marketplace (Clean White with Red Accent) */}
          <div className="bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-8 rounded-2xl transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md relative overflow-hidden">
            <div className="flex items-start justify-between mb-8">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                0% COMMISSION
              </span>
            </div>

            <div>
              <div className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase mb-1.5 font-mono">
                Peer Equipment Reuse
              </div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <RedStar className="w-4 h-4 text-[#b93a32]" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                  Campus Marketplace
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                Senior-to-junior academic gear exchange. Pass on mini-drafters, workshop aprons, lab coats, and standard textbooks directly at the college canteen.
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                <span>In-Person Cash/UPI · No Platform Fees</span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Authenticated Roll Intranet */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-8 rounded-2xl transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs hover:shadow-md relative overflow-hidden group">
            <div className="max-w-md">
              <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center mb-5 shadow-2xs group-hover:scale-105 transition-transform">
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-[11px] font-bold tracking-wider text-purple-700 uppercase mb-1.5 font-mono">
                Student Security Architecture
              </div>
              <div className="flex items-center gap-2.5 mb-2">
                <RedStar className="w-4 h-4 text-[#b93a32]" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-900 tracking-tight">
                  Authenticated Roll Intranet
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Zero spam and zero public internet crawling. Access is restricted to authentic KGEC students with verified institutional roll format (e.g. 22/CSE/042).
              </p>
            </div>

            <div className="w-full sm:w-auto flex flex-col gap-2.5 font-mono text-xs text-slate-600 bg-slate-50 p-5 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                <span className="text-slate-900 font-semibold">Row-Level Security (RLS)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                <span>Anonymized Seller Aliases</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-600 rounded-full"></span>
                <span>CR Permission Broadcasting</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
