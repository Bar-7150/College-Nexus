"use client";

import React from "react";
import { Star, ShieldCheck, Quote } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  const reviews = [
    {
      name: "Debanjan Das",
      role: "3rd Year ECE · Roll 22/ECE/029",
      quote:
        "The cryptographic duplicate rejection in the Vault saved our batch from having 20 duplicate copies of the same Analog Electronics viva PDF. You find the exact paper you need in 5 seconds.",
      rating: 5,
      date: "Sep 2026",
    },
    {
      name: "Poulomi Chatterjee",
      role: "2nd Year CSE · Roll 23/CSE/014",
      quote:
        "I lost my Casio ClassWiz in Drawing Hall 2 right before mid-sems. Through the confidential claim prompt, the finder verified my custom sticker description without ever having to post my phone number on WhatsApp.",
      rating: 5,
      date: "Aug 2026",
    },
    {
      name: "Rohit Ghosh",
      role: "4th Year ME · Roll 21/ME/048",
      quote:
        "Sold my mini-drafter and workshop apron to a fresher directly at the campus canteen. Zero commission, immediate UPI handoff, and zero spam from random strangers outside college.",
      rating: 5,
      date: "Aug 2026",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-14 sm:py-20 relative bg-transparent overflow-visible"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <ScrollReveal delay={100} distance={24}>
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070e0a]/70 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
              <span>VOICES OF THE INTRANET // KGEC HALL OF TESTIMONIALS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight drop-shadow-xl">
              Kind Words from <br className="hidden sm:inline" />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                KGEC Students &amp; Alumni.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#d8e8dd] mt-3 font-light leading-relaxed drop-shadow-md">
              Echoes of success, recovered belongings, and seamless exam preparation across engineering departments.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Featured Spotlight Card with Ultra-Glass floating over static lecture hall artwork */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={200} distance={30} className="h-full">
              <div className="h-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/25 sm:border-[#c79e4d]/40 bg-[#070e0a]/20 hover:bg-[#070e0a]/35 backdrop-blur-md p-8 flex flex-col justify-between group transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-mono text-[#deb86d] tracking-widest uppercase font-bold px-2.5 py-1 bg-black/35 rounded-full border border-white/20">
                      STUDENT SPOTLIGHT
                    </span>
                    <Quote className="w-6 h-6 text-[#c79e4d]/80" />
                  </div>

                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#deb86d] text-[#deb86d]" />
                    ))}
                  </div>

                  <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed mb-6 drop-shadow-md">
                    &ldquo;College Nexus is what universities should build. A single, authenticated portal where campus circulars are official, lost tools find their owners, and exam preparation is completely organized.&rdquo;
                  </blockquote>
                </div>

                <div className="pt-5 border-t border-white/20 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white drop-shadow-xs">
                      Sneha Mukherjee
                    </h4>
                    <p className="text-xs text-[#deb86d] font-mono">
                      CSE 2026 Cohort · Placed at SDE
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-black/40 rounded-full backdrop-blur-xs text-[10px] font-mono text-emerald-400 border border-emerald-500/40">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED ROLL</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: 3 Stacked Ultra-Glass Review Cards with Staggered Scroll Reveal */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-5">
            {reviews.map((rev, idx) => (
              <ScrollReveal key={idx} delay={250 + idx * 140} distance={28}>
                <div
                  className="bg-[#070e0a]/20 hover:bg-[#070e0a]/35 backdrop-blur-md border border-white/25 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-[#c79e4d] text-[#c79e4d]" />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-[#b3c7ba] tracking-wider uppercase drop-shadow-xs">
                        {rev.date}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#e0ece4] leading-relaxed mb-4 font-normal drop-shadow-sm">
                      &ldquo;{rev.quote}&rdquo;
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                    <div>
                      <h5 className="text-xs font-bold text-white group-hover:text-[#deb86d] transition-colors drop-shadow-xs">
                        {rev.name}
                      </h5>
                      <p className="text-[11px] text-[#a4b8ab] font-mono">
                        {rev.role}
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-emerald-400 bg-black/40 border border-emerald-500/40 px-2.5 py-0.5 rounded-full font-medium flex items-center gap-1 backdrop-blur-xs">
                      <ShieldCheck className="w-3 h-3" />
                      <span>VERIFIED</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
