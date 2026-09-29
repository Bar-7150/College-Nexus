"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/mockData";

export default function CampusFlowFAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");

  const steps = [
    {
      num: "01",
      title: "Institutional Roll Verification",
      desc: "Authenticate using your official KGEC student roll number format (e.g. 22/CSE/042). No passwords required for discovery.",
    },
    {
      num: "02",
      title: "Explore Taxonomies & Vault",
      desc: "Filter department archives (CSE, ECE, EE, ME, IT) and download verified papers with cryptographic duplicate guards.",
    },
    {
      num: "03",
      title: "Safe Peer Exchanges",
      desc: "Pass on mini-drafters, workshop aprons, and reference books at the campus canteen with 0% platform commissions.",
    },
    {
      num: "04",
      title: "Realtime Circular Alerts",
      desc: "Stay synced with Training & Placement drives, examination regularization schedules, and dean circulars without WhatsApp noise.",
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 bg-transparent relative overflow-hidden text-white">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: 4-Step Flow */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold">
                CAMPUS ONBOARDING
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight leading-tight mb-4 drop-shadow-md">
              A Seamless <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                Campus Flow.
              </span>
            </h2>

            <p className="text-sm text-[#d0dfd5] leading-relaxed mb-8 font-light drop-shadow-xs">
              From your first day as an engineering fresher to your final campus placement, College Nexus orchestrates every academic need into a single high-velocity flow.
            </p>

            {/* 4 Steps List */}
            <div className="space-y-6">
              {steps.map((st, idx) => (
                <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-full bg-[#070e0a]/60 border border-[#deb86d]/40 text-[#deb86d] group-hover:bg-[#c79e4d] group-hover:text-[#0b1510] group-hover:border-[#c79e4d] font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors shadow-md backdrop-blur-xs">
                    {st.num}
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-bold text-white group-hover:text-[#deb86d] transition-colors mb-1 drop-shadow-xs">
                      {st.title}
                    </h3>
                    <p className="text-xs text-[#a9bcae] leading-relaxed font-light">
                      {st.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Accordion FAQs with Frosted Glass */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight mb-6 drop-shadow-md">
              Answers for Curious KGECians
            </h3>

            <div className="space-y-3.5">
              {FAQS.map((faq) => {
                const isOpen = openFaq === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="bg-[#070e0a]/35 hover:bg-[#070e0a]/50 border border-white/20 sm:border-[#c79e4d]/30 hover:border-[#c79e4d] rounded-2xl overflow-hidden transition-all duration-300 shadow-xl backdrop-blur-md"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-serif font-semibold text-white tracking-tight">
                        {faq.question}
                      </span>
                      <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[#deb86d] shrink-0 border border-white/20">
                        {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-white/10">
                        <p className="text-xs sm:text-sm text-[#c8dacf] leading-relaxed font-light">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
