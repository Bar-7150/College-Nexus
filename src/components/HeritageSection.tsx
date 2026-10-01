"use client";

import React from "react";
import { BookOpen, BellRing, ShieldCheck, ArrowRight, ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function HeritageSection() {
  const cards = [
    {
      module: "MODULE 01",
      title: "The Academic Vault",
      tag: "0 SOLVED PYQS",
      desc: "Taxonomy-driven digital archive. Direct navigation from Department (CSE, ECE, EE, ME, IT) down to Semester and Subject Code with SHA-256 duplicate guards.",
      icon: BookOpen,
      link: "#explorer",
    },
    {
      module: "MODULE 02",
      title: "The Notice Board",
      tag: "OFFICIAL CIRCULARS",
      desc: "Zero-noise broadcast stream for Training & Placement cell announcements, semester exam registration deadlines, and dean notices directly from administration.",
      icon: BellRing,
      link: "#explorer",
    },
    {
      module: "MODULE 03",
      title: "Lost & Found Handover",
      tag: "ZERO PHONE EXPOSURE",
      desc: "Private claim recovery flow. Finders list misplaced calculators and drafters with hidden proof prompts. Owners claim items without broadcasting their numbers.",
      icon: ShieldCheck,
      link: "#explorer",
    },
  ];

  return (
    <section
      id="heritage"
      className="py-14 sm:py-20 relative bg-transparent overflow-visible"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Section Header with Smooth Fade-in Animation */}
        <ScrollReveal delay={100} distance={24}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070e0a]/65 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
              <span>KALYANI GOVERNMENT ENGINEERING COLLEGE // ESTD 1995</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif text-white tracking-tight leading-tight drop-shadow-xl">
              Traditional Heritage, <br className="hidden sm:inline" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                Modern Artistry.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#e2ede5] mt-3 font-light leading-relaxed drop-shadow-md max-w-2xl mx-auto">
              West Bengal&apos;s premier autonomous engineering intranet. Preserving thirty years of collegiate legacy with verified academic taxonomies and zero-noise communications.
            </p>

            <div className="mt-5">
              <a
                href="#explorer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#070e0a]/60 hover:bg-[#c79e4d] text-[#deb86d] hover:text-[#08120c] border border-[#c79e4d]/50 hover:border-[#c79e4d] rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 backdrop-blur-md shadow-md"
              >
                <span>Explore Campus Archives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Feature Cards Grid: Positioned closely below the header with compact, balanced spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <ScrollReveal key={idx} delay={idx * 160 + 100} distance={32}>
                <div className="h-full bg-[#070e0a]/20 hover:bg-[#070e0a]/35 backdrop-blur-md border border-white/25 sm:border-[#c79e4d]/40 hover:border-[#c79e4d] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.35)] hover:shadow-2xl transition-all duration-300 group">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-bold drop-shadow-xs">
                        {card.module}
                      </span>
                      <span className="text-[9px] font-mono px-2.5 py-0.5 bg-black/35 text-[#deb86d] border border-white/20 rounded-full font-semibold backdrop-blur-xs">
                        {card.tag}
                      </span>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/25 text-[#deb86d] group-hover:scale-105 flex items-center justify-center mb-4 transition-transform shadow-xs backdrop-blur-xs">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white tracking-tight mb-2 group-hover:text-[#deb86d] transition-colors drop-shadow-md">
                      {card.title}
                    </h3>

                    <p className="text-xs text-[#dbe7df] leading-relaxed mb-6 font-normal drop-shadow-sm">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs font-semibold text-white group-hover:text-[#deb86d] transition-colors drop-shadow-xs">
                      Explore Directory
                    </span>
                    <a
                      href={card.link}
                      className="w-8 h-8 rounded-full bg-white/15 border border-white/30 group-hover:bg-[#c79e4d] group-hover:border-[#c79e4d] text-white group-hover:text-[#0b1510] flex items-center justify-center transition-all shadow-xs backdrop-blur-xs"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
