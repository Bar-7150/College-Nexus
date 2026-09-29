"use client";

import React, { useState } from "react";
import { Plus, Minus, ChevronDown, ShieldCheck, CheckCircle2 } from "lucide-react";
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
    <section id="faq" className="py-20 md:py-28 bg-[#f7f5ef] border-b border-[#e7e2d6] relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Left Column: 4-Step Flow */}
          <div className="lg:col-span-5 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#a68239] uppercase font-semibold">
                  CAMPUS ONBOARDING
                </span>
              </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-[#142018] tracking-tight leading-tight mb-4">
                A Seamless <br />
              <span className="italic font-normal text-[#a68239]">Campus Flow.</span>
              </h2>

            <p className="text-sm text-[#5e7063] leading-relaxed mb-8 font-light">
                From your first day as an engineering fresher to your final campus placement, College Nexus orchestrates every academic need into a single high-velocity flow.
              </p>

              {/* 4 Steps List */}
              <div className="space-y-6">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex items-start gap-4 group">
                  <div className="w-9 h-9 rounded-full bg-white border border-[#ded7c7] text-[#a68239] group-hover:bg-[#c79e4d] group-hover:text-[#0b1510] group-hover:border-[#c79e4d] font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors shadow-2xs">
                      {st.num}
                    </div>
                    <div>
                    <h3 className="text-sm font-serif font-bold text-[#142018] group-hover:text-[#a68239] transition-colors mb-1">
                        {st.title}
                      </h3>
                    <p className="text-xs text-[#637569] leading-relaxed font-light">
                        {st.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Right Column: Accordion FAQs */}
          <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
              <span className="text-[10px] font-mono tracking-widest text-[#a68239] uppercase font-semibold">
                  FREQUENTLY ASKED QUESTIONS
                </span>
              </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#142018] tracking-tight mb-6">
                Answers for Curious KGECians
              </h3>

              <div className="space-y-3.5">
                {FAQS.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                    className="bg-white border border-[#e4ded0] hover:border-[#c79e4d]/60 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                        className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer"
                      >
                      <span className="font-serif font-semibold text-sm sm:text-base text-[#142018] leading-snug">
                          {faq.question}
                        </span>
                      <div className="w-7 h-7 rounded-full bg-[#fbf9f4] border border-[#ded8c9] text-[#a68239] flex items-center justify-center shrink-0">
                          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </div>
                      </button>

                      {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-[#5e7063] leading-relaxed font-light border-t border-[#f4f0e5]">
                          <p>{faq.answer}</p>
                        <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono text-[#a68239]">
                          <ShieldCheck className="w-3.5 h-3.5" />
                            <span>Category: {faq.category}</span>
                          </div>
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
