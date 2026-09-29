"use client";

import React, { useState } from "react";
import { BellRing, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

export default function AlertsBanner() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
  };

  return (
    <section id="alerts" className="py-12 md:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Dark Curved Container matching Reference Screenshot Newsletter Card */}
        <div className="bg-[#070e0a]/75 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-3xl p-8 sm:p-12 text-[#f5f5f0] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Circular Emblem + Headline */}
            <div className="lg:col-span-6 flex items-center gap-5">
              {/* Circular Gold Seal */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-[#c79e4d]/60 p-1 shrink-0 flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#122319] border border-[#274635] flex items-center justify-center text-[#deb86d] flex-col text-center">
                  <span className="text-xs sm:text-sm font-serif font-bold">KGEC</span>
                  <span className="text-[7px] font-mono uppercase text-[#8a9f91]">1995</span>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase block mb-1">
                  OFFICIAL PUSH BROADCASTS
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-white leading-tight">
                  Stay Synced with Campus Memos.
                </h3>
                <p className="text-xs text-[#9eb2a4] mt-1 font-light leading-relaxed">
                  Receive instant notifications for MAKAUT exam forms, T&P drives, and library hours.
                </p>
              </div>
            </div>

            {/* Right Column: Input & Gold Button */}
            <div className="lg:col-span-6">
              {!subscribed ? (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col sm:flex-row items-center gap-2.5 bg-[#101e16] p-2 rounded-2xl border border-[#1f372a]"
                >
                  <input
                    type="text"
                    required
                    placeholder="Enter roll number or institutional email..."
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full px-4 py-2.5 bg-transparent text-xs font-mono text-[#f5f5f0] focus:outline-none placeholder-[#6b8274]"
                  />
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] font-semibold text-xs uppercase tracking-wider rounded-xl transition-colors shrink-0 shadow-md flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="p-4 bg-[#12241b] border border-[#224430] rounded-2xl flex items-center gap-3 text-emerald-400 text-xs font-mono">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>Subscribed! Institutional circulars will be routed to {emailInput}.</span>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
