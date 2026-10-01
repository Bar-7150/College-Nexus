"use client";

import React from "react";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import InstitutionMarks from "./InstitutionMarks";

interface HeroProps {
  onOpenLoginModal?: () => void;
}

export default function Hero({ onOpenLoginModal }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-16 bg-transparent overflow-visible"
    >
      <InstitutionMarks />
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Left-Aligned Hero Content: Floating seamlessly over the static MAKAUT Gate artwork */}
        <div className="max-w-3xl flex flex-col items-start">
          
          {/* 1. Luxury Eyebrow Pill */}
          <ScrollReveal delay={100} distance={20}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#070e0a]/80 border border-[#c79e4d]/40 text-[#deb86d] text-xs font-medium tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
              <span className="font-mono text-[11px]">KGEC AUTONOMOUS INTRANET HUB</span>
            </div>
          </ScrollReveal>

          {/* 2. Main Headline in Majestic Serif */}
          <ScrollReveal delay={250} distance={28}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-white tracking-tight leading-[1.08] mb-6 drop-shadow-lg">
              Collegiate Excellence <br />
              <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                That Inspires Futures.
              </span>
            </h1>
          </ScrollReveal>

          {/* 3. Editorial Subtext */}
          <ScrollReveal delay={400} distance={24}>
            <p className="text-base sm:text-lg text-[#d0dfd6] leading-relaxed max-w-2xl mb-8 font-light drop-shadow-md">
              Engineering students lose precious study time and academic equipment across fragmented WhatsApp chats.{" "}
              <strong className="text-white font-medium">College Nexus</strong> unifies the collegiate journey into an authenticated, roll-number-verified academic intranet with cryptographic duplicate rejection, private lost item recovery, and verified circulars.
            </p>
          </ScrollReveal>

          {/* 4. Luxury Action Buttons */}
          <ScrollReveal delay={550} distance={24}>
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
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#070e0a]/75 hover:bg-[#122319] border border-[#c79e4d]/40 hover:border-[#c79e4d]/80 text-[#f5f5f0] font-medium text-xs tracking-wider uppercase rounded-full transition-all duration-300 backdrop-blur-md shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-[#c79e4d]" />
                <span>CAMPUS PILLARS</span>
              </a>

              <button
                onClick={onOpenLoginModal}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs text-[#deb86d] hover:text-white font-semibold tracking-wider uppercase transition-colors cursor-pointer bg-white/5 hover:bg-white/10 rounded-full border border-white/15 backdrop-blur-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>ROLL VERIFY</span>
              </button>
            </div>
          </ScrollReveal>

          {/* 5. Quick Metrics Bar with Frosted Glass */}
          <ScrollReveal delay={700} distance={28} className="w-full">
            <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-6 w-full bg-[#070e0a]/45 backdrop-blur-md p-5 rounded-2xl border border-white/15 shadow-2xl">
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  NETWORK NODES
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  0 KGECians
                </span>
                <span className="text-[11px] text-[#9db2a4]">Roll Authenticated</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                  ACADEMIC VAULT
                </span>
                <span className="text-sm font-semibold text-white block mt-0.5">
                  0 Solved PYQs
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
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
