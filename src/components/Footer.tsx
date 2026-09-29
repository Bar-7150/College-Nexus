"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowUpRight, Heart, Globe } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#070e0a]/95 backdrop-blur-xl text-[#93a69a] pt-20 pb-12 border-t border-[#c79e4d]/30 relative z-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#16271e]">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#dfc285] to-[#9e7529] p-[1px] shadow-sm">
                <div className="w-full h-full bg-[#0b1510] rounded-[11px] flex items-center justify-center">
                  <span className="text-base font-serif font-bold text-[#deb86d]">結</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] tracking-[0.25em] text-[#c79e4d] font-semibold uppercase leading-tight font-mono">
                  COLLEGIATE INTRANET
                </span>
                <span className="text-xl font-serif font-bold tracking-wide text-white leading-tight">
                  COLLEGE NEXUS
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#8a9f92] leading-relaxed max-w-sm mb-6 font-light">
              One Campus. One Network. Zero Fragmentation. Unifying the engineering collegiate experience into a single high-velocity, roll-verified digital sanctuary for Kalyani Government Engineering College.
            </p>

            <div className="p-3 bg-[#0d1a13] border border-[#1b3425] rounded-xl text-xs font-mono text-[#a4b8ab] space-y-1 mb-6">
              <div className="flex items-center gap-2 text-[#deb86d] font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>KGEC AUTONOMOUS CAMPUS</span>
              </div>
              <p className="text-[11px] text-[#71887a]">
                Kalyani, Nadia, West Bengal 741235 · PIN 741235
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#102017] border border-[#1e3b2b] rounded-full text-[11px] font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>All Campus Systems Operational · 99.98% Uptime</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Core Modules */}
            <div>
              <h4 className="text-xs text-[#deb86d] font-mono font-bold tracking-widest uppercase mb-4">
                CAMPUS MODULES
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a2]">
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    The Academic Vault (PYQs)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    The Board (Official Notices)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Lost &amp; Found Private Recovery
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    0% Commission Peer Market
                  </a>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Campus Guilds &amp; Cohorts
                  </Link>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Student FAQ &amp; Privacy
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Department Taxonomy */}
            <div>
              <h4 className="text-xs text-[#deb86d] font-mono font-bold tracking-widest uppercase mb-4">
                DEPARTMENTS
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a2]">
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Computer Science (CSE)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Electronics &amp; Comm (ECE)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Electrical Engineering (EE)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Mechanical Engineering (ME)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    Information Technology (IT)
                  </a>
                </li>
                <li>
                  <a href="#explorer" className="hover:text-white transition-colors">
                    MCA &amp; M.Tech Postgrad
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Helplines & Community */}
            <div>
              <h4 className="text-xs text-[#deb86d] font-mono font-bold tracking-widest uppercase mb-4">
                CAMPUS GUILDS
              </h4>
              <ul className="space-y-2.5 text-xs text-[#9bb0a2]">
                <li>
                  <a
                    href="https://dc.kgec.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group text-[#f5f5f0]"
                  >
                    <span>Developers Community (DC)</span>
                    <ArrowUpRight className="w-3 h-3 text-[#c79e4d] group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    Robotics &amp; Automation
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-white transition-colors">
                    E-Cell &amp; Innovation
                  </Link>
                </li>
                <li>
                  <a href="#mentors" className="hover:text-white transition-colors">
                    Honored Industry Mentors
                  </a>
                </li>
                <li>
                  <span className="text-[#64796c] block mt-4 text-[10px] font-mono uppercase">
                    CAMPUS HELPLINES:
                  </span>
                  <span className="text-[11px] text-[#8a9f92] block mt-0.5">
                    Central Library: lib@kgec.edu.in
                  </span>
                  <span className="text-[11px] text-[#8a9f92] block">
                    T&amp;P Cell: tpo@kgec.edu.in
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7d9385]">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© 2026 College Nexus. Engineered with</span>
            <Heart className="w-3.5 h-3.5 text-[#deb86d] fill-[#deb86d]" />
            <span>by Developers Community KGEC.</span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#0e1a14] hover:bg-[#15271e] border border-[#1b3225] text-[#9db0a3] hover:text-[#deb86d] flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#0e1a14] hover:bg-[#15271e] border border-[#1b3225] text-[#9db0a3] hover:text-[#deb86d] flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/Bar-7150/College-Nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#0e1a14] hover:bg-[#15271e] border border-[#1b3225] text-[#9db0a3] hover:text-[#deb86d] flex items-center justify-center transition-colors"
              aria-label="GitHub Repository"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href="https://dc.kgec.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-[#0e1a14] hover:bg-[#15271e] border border-[#1b3225] text-[#9db0a3] hover:text-[#deb86d] flex items-center justify-center transition-colors"
              aria-label="KGEC Dev Community Website"
            >
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
