"use client";

import React from "react";
import {
  BookOpen,
  BellRing,
  ShoppingBag,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Star,
  Award,
} from "lucide-react";

export default function ArsenalBento() {
  return (
    <section id="portals" className="py-16 md:py-24 bg-[#f7f5ef] relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Large Rounded Dark Luxury Container matching Reference Screenshot Section 2 */}
        <div className="bg-[#0b1510] border border-[#1a2f23] rounded-3xl p-8 sm:p-12 lg:p-14 text-[#f5f5f0] shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Campus Tech Lab / Engineering Photo with Rounded Badge */}
            <div className="lg:col-span-4 relative group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl border border-[#213a2c]">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
                  alt="KGEC Students in Collaborative Innovation Lab"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1510] via-transparent to-transparent opacity-80"></div>
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-[#0b1510]/80 text-[#deb86d] border border-[#294635] rounded backdrop-blur-xs">
                    KGEC INNOVATION LAB // ESTD 1995
                  </span>
                  <div className="text-sm font-serif text-white mt-1">
                    Student Developers &amp; Mentors
                  </div>
                </div>
              </div>

              {/* Gold Play/Seal Circular Badge */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-[#dfc285] to-[#9e7529] p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-[#0b1510] flex items-center justify-center text-[#deb86d]">
                  <Sparkles className="w-5 h-5 text-[#deb86d]" />
                </div>
              </div>
            </div>

            {/* Center: Narrative & Core Pillars */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase">
                  THE SOUL OF THE CAMPUS NETWORK
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#f5f5f0] tracking-tight leading-tight mb-4">
                Where Engineering Rigor <br />
                <span className="italic font-light text-[#deb86d]">Meets Digital Artistry.</span>
              </h2>

              <p className="text-sm text-[#9cb0a2] leading-relaxed mb-6 font-light">
                Built to eliminate the chaos of fleeting WhatsApp links and unverified drives. College Nexus provides an authenticated digital sanctuary designed for Kalyani Government Engineering College.
              </p>

              {/* Gold Checkmarked Highlights */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#162a1f] border border-[#264634] text-[#deb86d] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#f5f5f0] font-medium block">
                      Cryptographic SHA-256 Duplicate Rejection
                    </strong>
                    <span className="text-[11px] text-[#799082]">
                      Client-side byte validation prevents duplicate uploads in the Academic Vault.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#162a1f] border border-[#264634] text-[#deb86d] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#f5f5f0] font-medium block">
                      Zero-Phone-Exposure Private Claim Protocol
                    </strong>
                    <span className="text-[11px] text-[#799082]">
                      Lost calculators and drafters are claimed via confidential proof prompts.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#162a1f] border border-[#264634] text-[#deb86d] flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <strong className="text-xs text-[#f5f5f0] font-medium block">
                      Class Representative (CR) Verification Seal
                    </strong>
                    <span className="text-[11px] text-[#799082]">
                      Guaranteed authentic exam notes, solutions, and official circular broadcasts.
                    </span>
                  </div>
                </div>
              </div>

              <a
                href="#heritage"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#deb86d] hover:text-white uppercase transition-colors"
              >
                <span>Read Institutional Architecture Spec</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Right: Floating Recognition / Endorsement Card */}
            <div className="lg:col-span-3 flex flex-col justify-center">
              <div className="bg-[#101e17] border border-[#1f382a] rounded-2xl p-6 relative shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-[#172c20] border border-[#284836] text-[#deb86d] flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#c79e4d] text-[#c79e4d]" />
                  ))}
                </div>

                <h4 className="text-sm font-serif font-bold text-[#f5f5f0] mb-2">
                  KGEC Student Council Endorsed
                </h4>

                <p className="text-xs text-[#9bb0a2] leading-relaxed mb-4 font-light italic">
                  &ldquo;The definitive benchmark for campus software infrastructure. College Nexus restores sanity to student communications.&rdquo;
                </p>

                <div className="pt-3 border-t border-[#182f22] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6d8475]">PROTOCOL:</span>
                  <span className="text-[#deb86d] font-semibold">100% ROLL-VERIFIED</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
