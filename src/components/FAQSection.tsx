"use client";

import React, { useState } from "react";
import { FAQS } from "@/data/mockData";
import { ChevronDown, HelpCircle, MessageSquare, Mail, ArrowRight } from "lucide-react";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string>("faq-1");

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-red-600 uppercase mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
              Everything You <br />
              <span className="text-red-600">Need to Know</span>
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-md">
              Have questions about institutional roll verification, SHA-256 duplicate checking, confidential lost & found claims, or peer equipment handovers?
            </p>

            {/* Support Callout Box */}
            <div className="w-full p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-xs">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-100 text-red-600 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Still have questions?
                  </h4>
                  <p className="text-xs text-slate-500">
                    The KGEC senseis are here to assist.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-200">
                <a
                  href="https://dc.kgec.tech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wider uppercase transition-colors rounded-lg shadow-xs"
                >
                  <span>Join Discord</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="mailto:contact@dc.kgec.tech"
                  className="inline-flex items-center justify-center p-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-red-600 transition-colors rounded-lg"
                  aria-label="Email Helpdesk"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-3.5">
            {FAQS.map((faq, idx) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`bg-white border rounded-xl transition-all duration-200 overflow-hidden shadow-xs ${
                    isOpen ? "border-red-500 ring-1 ring-red-500/10" : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isOpen ? "text-red-600" : "text-slate-400"
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "rotate-180 bg-red-50 text-red-600"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed animate-in fade-in duration-150">
                      <p className="mt-2 text-slate-600">{faq.answer}</p>
                      <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-red-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span>
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
    </section>
  );
}
