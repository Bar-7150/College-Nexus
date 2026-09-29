"use client";

import React from "react";
import { ArrowRight, Github, Linkedin, Sparkles, Terminal } from "lucide-react";
import { MOCK_MENTORS } from "@/data/mockData";

export default function MindsSection() {
  return (
    <section id="mentors" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Dark Luxury Container matching "The Hands Behind the Artistry" */}
        <div className="bg-[#070e0a]/75 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-3xl p-8 sm:p-12 lg:p-14 text-[#f5f5f0] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold">
                  DEVELOPERS COMMUNITY KGEC // 匠の技
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#f5f5f0] tracking-tight leading-tight mb-4">
                The Minds Behind <br />
                <span className="italic font-light text-[#deb86d]">the Intranet.</span>
              </h2>

              <p className="text-sm text-[#9cb0a2] leading-relaxed mb-6 font-light">
                Conceived, designed, and deployed by the student engineering leads and mentors at Developers Community KGEC (DC KGEC). Engineered to elevate the standard of collegiate open-source software.
              </p>

              {/* Mentor badges strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {MOCK_MENTORS.slice(0, 3).map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#112118] border border-[#1e382a] rounded-xl flex flex-col"
                  >
                    <span className="text-[10px] font-mono text-[#deb86d] uppercase">
                      {m.kanji} · SENSEI
                    </span>
                    <strong className="text-xs text-[#f5f5f0] mt-0.5 truncate">
                      {m.name}
                    </strong>
                    <span className="text-[10px] text-[#718779] truncate">
                      {m.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://dc.kgec.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] font-semibold text-xs tracking-wider uppercase rounded-full shadow-md transition-colors"
                >
                  <span>VISIT DC KGEC</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://github.com/Bar-7150/College-Nexus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#13241b] hover:bg-[#1a3327] border border-[#213c2c] text-[#deb86d] font-semibold text-xs tracking-wider uppercase rounded-full transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GITHUB REPO</span>
                </a>
              </div>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-xl border border-[#213a2c]">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80"
                  alt="KGEC Student Engineering Guild & Mentors"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1510] via-transparent to-transparent opacity-85"></div>

                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#deb86d] uppercase block">
                      CAMPUS HACKATHONS &amp; OPEN SOURCE
                    </span>
                    <span className="text-sm font-serif font-bold text-white">
                      Developers Community KGEC
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#172e21] text-emerald-400 border border-[#2c523c] rounded-full">
                    ACTIVE SQUAD
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
