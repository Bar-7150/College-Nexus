"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface HeroProps {
  onOpenLoginModal?: () => void;
}

export default function Hero({ onOpenLoginModal }: HeroProps) {
  return (
    <section className="relative [clip-path:inset(0)] min-h-[96vh] flex items-center pt-32 sm:pt-40 md:pt-44 pb-20 md:pb-28 bg-[#070e0a]">
      {/* Fixed Static Background: MAKAUT Grand University Entrance Gate Stays Completely Fixed */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src="/makaut-gate.jpg"
          alt="Maulana Abul Kalam Azad University of Technology Grand Gate Artwork"
          className="w-full h-full object-cover object-[center_25%] scale-100"
        />

        {/* Artistic Directional Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e0a]/95 via-[#070e0a]/75 sm:via-[#070e0a]/50 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#070e0a]/70 via-[#070e0a]/25 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070e0a] via-[#070e0a]/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <ScrollReveal>
          {/* Left-Aligned Hero Content: Open view of the MAKAUT gate painting on the right */}
          <div className="max-w-3xl flex flex-col items-start">
            
            {/* Luxury Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0b1510]/80 border border-[#c79e4d]/40 text-[#deb86d] text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
              <span className="font-mono text-[11px]">KGEC AUTONOMOUS INTRANET HUB</span>
            </div>

            {/* Main Headline in Majestic Serif */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-md">
              Collegiate Excellence <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                That Inspires Futures.
              </span>
            </h1>

            {/* Editorial Subtext */}
            <p className="text-base sm:text-lg text-[#d0dfd6] leading-relaxed max-w-2xl mb-8 font-light drop-shadow-sm">
              Engineering students lose precious study time and academic equipment across fragmented WhatsApp chats.{" "}
              <strong className="text-white font-medium">College Nexus</strong> unifies the collegiate journey into an authenticated, roll-number-verified academic intranet with cryptographic duplicate rejection, private lost item recovery, and verified circulars.
            </p>

            {/* Luxury Dual Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a
                href="#explorer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] font-bold text-xs tracking-wider uppercase rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <span>EXPLORE ACADEMIC VAULT</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#portals"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#0b1510]/75 hover:bg-[#122319] border border-[#c79e4d]/35 hover:border-[#c79e4d]/70 text-[#f5f5f0] font-medium text-xs tracking-wider uppercase rounded-full transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#c79e4d]" />
                <span>CAMPUS PILLARS</span>
              </a>

              <button
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs text-[#deb86d] hover:text-white font-semibold tracking-wider uppercase transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-full border border-white/10 backdrop-blur-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ROLL VERIFY</span>
              </button>
            </div>

            {/* Quick Metrics Bar with Frosted Glass */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full bg-[#070e0a]/45 backdrop-blur-md p-5 rounded-2xl border border-white/10 shadow-lg">
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  NETWORK NODES
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  3,850+ KGECians
                </span>
                <span className="text-[11px] text-[#9db2a4]">Roll Authenticated</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  ACADEMIC VAULT
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  850+ Solved PYQs
                </span>
                <span className="text-[11px] text-[#9db2a4]">SHA-256 Validated</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  RECOVERY FEED
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  Zero Phone Exposure
                </span>
                <span className="text-[11px] text-[#9db2a4]">Private Claims</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  PEER COMMERCE
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  0% Commission
                </span>
                <span className="text-[11px] text-[#9db2a4]">Campus Canteen</span>
              </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
