"use client";

import React from "react";
import { Heart, Globe, ShieldCheck, ArrowUpRight } from "lucide-react";
import { InstagramIcon, LinkedinIcon, GithubIcon } from "@/components/SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-12 border-t border-slate-800 relative z-20">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <a href="#home" className="flex items-center gap-3 mb-4 group">
              <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-red-700 transition-colors">
                <span>結</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.2em] text-slate-400 font-bold uppercase leading-tight">
                  COLLEGE
                </span>
                <span className="text-xl font-heading font-bold tracking-tight text-white leading-tight">
                  NEXUS
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm mb-6">
              One Campus. One Network. Zero Fragmentation. Unifying the engineering collegiate experience into a single high-speed intranet hub tailored for Kalyani Government Engineering College.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-800/80 border border-slate-700 text-xs font-mono text-slate-300 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>KGEC INTRANET AUTHENTICATED</span>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Column 1: Ecosystem Modules */}
            <div>
              <h4 className="text-xs text-white font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
                <span>Modules</span>
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Campus Vault (PYQs & Notes)
                  </a>
                </li>
                <li>
                  <a href="#board" className="hover:text-white transition-colors">
                    The Board (Official Notices)
                  </a>
                </li>
                <li>
                  <a href="#board" className="hover:text-white transition-colors">
                    Lost & Found Recovery Wall
                  </a>
                </li>
                <li>
                  <a href="#marketplace" className="hover:text-white transition-colors">
                    0% Fee Peer Marketplace
                  </a>
                </li>
                <li>
                  <a href="#levels" className="hover:text-white transition-colors">
                    4 Levels of Mastery Quest
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    Student FAQ & Security
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2: Department Taxonomy */}
            <div>
              <h4 className="text-xs text-white font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
                <span>Departments</span>
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Computer Science (CSE)
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Electronics & Comm. (ECE)
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Electrical Engineering (EE)
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Mechanical Engineering (ME)
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    Information Technology (IT)
                  </a>
                </li>
                <li>
                  <a href="#vault" className="hover:text-white transition-colors">
                    MCA & M.Tech Cohorts
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Community */}
            <div>
              <h4 className="text-xs text-white font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
                <span>Community</span>
                <span className="w-1 h-1 rounded-full bg-red-500"></span>
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-400">
                <li>
                  <a
                    href="https://journey-2-mastery.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Journey to Mastery</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://dc.kgec.tech/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>Developers Community KGEC</span>
                    <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a href="#mentors" className="hover:text-white transition-colors">
                    Honored Industry Mentors
                  </a>
                </li>
                <li>
                  <a href="#timeline" className="hover:text-white transition-colors">
                    28-Day Milestone Schedule
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1 text-center sm:text-left">
            <span>© 2026 College Nexus. Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Journey to Mastery by Dev Community KGEC.</span>
          </p>

          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href="https://dc.kgec.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
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
