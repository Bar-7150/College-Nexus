"use client";

import React from "react";
import { Users, GraduationCap, FileCheck, Banknote, Star } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    {
      star: "4.95 ★",
      value: "3,850+",
      label: "VERIFIED STUDENTS",
      subtext: "KGEC Institutional Roll Numbers",
      icon: Users,
    },
    {
      star: null,
      value: "14+",
      label: "ACADEMIC DEPARTMENTS",
      subtext: "CSE, ECE, EE, ME, IT & M.Tech",
      icon: GraduationCap,
    },
    {
      star: null,
      value: "12,500+",
      label: "ARCHIVED PYQS & NOTES",
      subtext: "Cryptographic SHA-256 Validated",
      icon: FileCheck,
    },
    {
      star: null,
      value: "₹2.4L+",
      label: "STUDENT SAVINGS",
      subtext: "0% Commission Equipment Exchange",
      icon: Banknote,
    },
  ];

  return (
    <section className="bg-white border-y border-[#e7e2d6] py-10 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#ece7dc]">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`flex flex-col justify-between py-3 ${
                    idx !== 0 ? "sm:pl-6 lg:pl-8" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#a68239] uppercase font-semibold">
                      CAMPUS METRIC 0{idx + 1}
                    </span>
                  <div className="w-8 h-8 rounded-full bg-[#fbf9f4] border border-[#e8e2d4] text-[#a68239] flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      {item.star && (
                      <span className="text-xs font-serif font-bold text-[#c79e4d] bg-[#fdf8ee] px-2 py-0.5 rounded border border-[#f0e3c5]">
                          {item.star}
                        </span>
                      )}
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-[#142018] tracking-tight">
                        {item.value}
                      </span>
                    </div>
                  <div className="text-[11px] font-bold tracking-wider text-[#26372c] uppercase mb-1 font-mono">
                      {item.label}
                    </div>
                  <p className="text-xs text-[#6e7d73] leading-relaxed">
                      {item.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
      </div>
    </section>
  );
}
