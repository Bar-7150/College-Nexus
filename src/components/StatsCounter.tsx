"use client";

import React from "react";
import { Users, GraduationCap, FileCheck, Banknote } from "lucide-react";

export default function StatsCounter() {
  const stats = [
    {
      value: "2,450+",
      label: "VERIFIED STUDENTS",
      subtext: "KGEC Institutional Roll Numbers",
      icon: Users,
    },
    {
      value: "5",
      label: "ENGINEERING DEPTS",
      subtext: "CSE, ECE, EE, ME & IT",
      icon: GraduationCap,
    },
    {
      value: "850+",
      label: "ARCHIVED PYQS & NOTES",
      subtext: "Cryptographic SHA-256 Validated",
      icon: FileCheck,
    },
    {
      value: "₹1.8L+",
      label: "STUDENT SAVINGS",
      subtext: "0% Fee Peer Equipment Exchange",
      icon: Banknote,
    },
  ];

  return (
    <section className="bg-white border-b border-slate-200/80 py-10 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 transition-all duration-200 rounded-2xl flex flex-col justify-between shadow-xs hover:shadow-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-[#b93a32] uppercase">
                    METRIC 0{idx + 1}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-[#fbf9f5] border border-[#e5e0d8] text-slate-600 group-hover:text-[#b93a32] group-hover:border-red-200 flex items-center justify-center transition-colors shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-heading font-bold text-slate-900 tracking-tight mb-1">
                    {item.value}
                  </div>
                  <div className="text-xs font-bold tracking-wider text-slate-800 uppercase mb-1">
                    {item.label}
                  </div>
                  <p className="text-xs text-slate-500 leading-normal">
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
