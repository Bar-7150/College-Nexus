"use client";

import React from "react";
import {
  ArrowRight,
  Code2,
  ExternalLink,
  FolderGit2,
  Github,
  Globe,
  Linkedin,
  MapPin,
  Sparkles,
  Terminal,
} from "lucide-react";

export default function MindsSection() {
  const featuredProjects = [
    { name: "College-Nexus", tech: "Next.js / TS", tag: "Campus Intranet" },
    { name: "myDestination", tech: "MERN Stack", tag: "Stay Marketplace" },
    { name: "vertualMeetup", tech: "WebRTC / JS", tag: "Video Conferencing" },
    { name: "3D-page-flip", tech: "Three.js", tag: "Interactive 3D" },
  ];

  return (
    <section id="mentors" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Dark Luxury Container matching "The Hands Behind the Artistry" */}
        <div className="bg-[#070e0a]/85 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-3xl p-8 sm:p-12 lg:p-14 text-[#f5f5f0] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Glows */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold">
                  CREATOR &amp; LEAD ARCHITECT // 創始者
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#f5f5f0] tracking-tight leading-tight mb-4">
                The Mind Behind <br />
                <span className="italic font-light text-[#deb86d]">College Nexus.</span>
              </h2>

              <p className="text-sm text-[#9cb0a2] leading-relaxed mb-6 font-light">
                Conceived, designed, and engineered from the ground up by <strong className="text-white font-medium">Sunetra Bar</strong>. Full-Stack Developer &amp; AI/ML Enthusiast building scalable web applications with MERN &amp; Next.js, with a strong foundation in Java, low-latency architecture, and collegiate open-source software.
              </p>

              {/* Developer stats & attributes strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                <div className="p-3.5 bg-[#0b1710] border border-[#213c2c] rounded-xl flex flex-col hover:border-[#c79e4d]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#deb86d] uppercase">
                    <FolderGit2 className="w-3 h-3" />
                    <span>PUBLIC REPOS</span>
                  </div>
                  <strong className="text-base font-serif text-white mt-0.5">30+ Projects</strong>
                  <span className="text-[10px] text-[#718779]">Open-Source on GitHub</span>
                </div>

                <div className="p-3.5 bg-[#0b1710] border border-[#213c2c] rounded-xl flex flex-col hover:border-[#c79e4d]/40 transition-colors">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-300 uppercase">
                    <Code2 className="w-3 h-3" />
                    <span>CORE STACK</span>
                  </div>
                  <strong className="text-base font-serif text-white mt-0.5">Next.js &amp; MERN</strong>
                  <span className="text-[10px] text-[#718779]">TypeScript &amp; Java</span>
                </div>

                <div className="p-3.5 bg-[#0b1710] border border-[#213c2c] rounded-xl flex flex-col hover:border-[#c79e4d]/40 transition-colors col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase">
                    <MapPin className="w-3 h-3" />
                    <span>BASE</span>
                  </div>
                  <strong className="text-base font-serif text-white mt-0.5">Kalyani, WB</strong>
                  <span className="text-[10px] text-[#718779]">Engineering Scholar</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Visit LinkedIn Profile CTA */}
                <a
                  href="https://www.linkedin.com/in/sunetra-bar-862796368"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Visit Linkedin Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                {/* GitHub Profile CTA */}
                <a
                  href="https://github.com/Bar-7150"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#13241b] hover:bg-[#1a3327] border border-[#213c2c] text-[#deb86d] font-semibold text-xs tracking-wider uppercase rounded-full transition-colors hover:border-[#c79e4d]/50"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </a>

                {/* Portfolio Website CTA */}
                <a
                  href="https://netra-sand.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-[#a9c0ae] hover:text-white text-xs font-mono rounded-full transition-colors"
                  title="View Personal Portfolio"
                >
                  <Globe className="w-3.5 h-3.5 text-[#deb86d]" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>

            {/* Right Developer Spotlight Card Column */}
            <div className="lg:col-span-6 relative group">
              <div className="rounded-2xl border border-[#254231] bg-gradient-to-br from-[#0c1811] via-[#08130d] to-[#050b07] p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
                
                {/* Header: Developer Badge & Active Status */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-5 border-b border-[#213c2c]">
                  <div className="flex items-center gap-4">
                    {/* GitHub Avatar with glowing status ring */}
                    <div className="relative">
                      <img
                        src="https://avatars.githubusercontent.com/u/224198395?v=4"
                        alt="Sunetra Bar"
                        className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover border-2 border-[#deb86d] shadow-xl"
                      />
                      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#08130d]" title="Active Developer" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                          Sunetra Bar
                        </h3>
                        <span className="rounded bg-[#deb86d]/20 border border-[#deb86d]/40 px-2 py-0.5 text-[9px] font-mono font-bold text-[#deb86d]">
                          AUTHOR
                        </span>
                      </div>
                      <a
                        href="https://github.com/Bar-7150"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#8fa597] hover:text-[#deb86d] transition-colors flex items-center gap-1 mt-0.5"
                      >
                        <span>@Bar-7150</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                      <div className="text-[11px] text-[#b8ccc0] mt-1 flex items-center gap-1.5 font-light">
                        <MapPin className="w-3 h-3 text-[#deb86d]" />
                        <span>Kalyani, West Bengal</span>
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 bg-[#172e21] text-emerald-400 border border-[#2c523c] rounded-full shrink-0">
                    <Sparkles className="w-3 h-3" />
                    <span>BUILDING IN PUBLIC</span>
                  </span>
                </div>

                {/* Developer Terminal Box */}
                <div className="rounded-xl border border-[#22392b] bg-[#050b07] p-4 font-mono text-xs mb-5 space-y-2">
                  <div className="flex items-center gap-1.5 text-[#5e7767] border-b border-[#1b2f23] pb-2 text-[11px]">
                    <Terminal className="w-3.5 h-3.5 text-[#deb86d]" />
                    <span>developer@kgec-nexus:~# cat bio.txt</span>
                  </div>
                  <p className="text-[#cde0d4] text-[11px] leading-relaxed pt-1">
                    &quot;Full-Stack Developer &amp; AI/ML Enthusiast, Building scalable web apps with MERN &amp; Next.js and Strong foundation in Java &amp; Problem Solving.&quot;
                  </p>
                </div>

                {/* Featured Repositories Grid */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#deb86d] mb-2.5">
                    <span>Key Repositories &amp; Builds</span>
                    <a
                      href="https://github.com/Bar-7150?tab=repositories"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-1 text-[#8fa597]"
                    >
                      <span>View all 30 repos</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {featuredProjects.map((p, idx) => (
                      <a
                        key={idx}
                        href={`https://github.com/Bar-7150/${p.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-lg border border-[#22392b] bg-[#08150e] hover:border-[#c79e4d]/50 hover:bg-[#0c1f15] transition-all group/item block"
                      >
                        <div className="font-semibold text-xs text-white group-hover/item:text-[#deb86d] transition-colors truncate">
                          {p.name}
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-mono text-[#789080] mt-1">
                          <span>{p.tech}</span>
                          <span className="text-[#a5bcaa]">{p.tag}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
