"use client";

import React, { useEffect, useState } from "react";
import { Users, GraduationCap, FileCheck, Banknote } from "lucide-react";

export default function StatsCounter() {
  const [visitCount, setVisitCount] = useState(0);
  const [dbStats, setDbStats] = useState({ userCount: 0, vaultCount: 0, departmentCount: 6 });

  useEffect(() => {
    const key = "nexus_visit_count";
    const nextCount = Number(window.localStorage.getItem(key) || "0") + 1;
    window.localStorage.setItem(key, String(nextCount));
    setVisitCount(nextCount);

    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDbStats({
            userCount: data.userCount ?? 0,
            vaultCount: data.vaultCount ?? 0,
            departmentCount: data.departmentCount ?? 6,
          });
        }
      })
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const stats = [
    {
      star: null,
      value: String(dbStats.userCount),
      label: "REGISTERED KGECIANS",
      subtext: "Roll Authenticated Profiles",
      icon: Users,
    },
    {
      star: null,
      value: String(dbStats.departmentCount),
      label: "ACADEMIC DEPARTMENTS",
      subtext: "CSE, ECE, EE, ME, IT & M.Tech",
      icon: GraduationCap,
    },
    {
      star: null,
      value: String(dbStats.vaultCount),
      label: "ARCHIVED PYQS & NOTES",
      subtext: "Cryptographic SHA-256 Validated",
      icon: FileCheck,
    },
    {
      star: null,
      value: String(visitCount),
      label: "CAMPUS VISITS",
      subtext: "Visits recorded on this browser",
      icon: Banknote,
    },
  ];

  return (
    <section
      id="stats"
      className="bg-[#070e0a]/40 backdrop-blur-md border-y border-[#c79e4d]/30 py-8 sm:py-10 relative overflow-hidden text-white"
    >
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex flex-col justify-between py-2 ${
                  idx !== 0 ? "sm:pl-6 lg:pl-8" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold">
                    CAMPUS METRIC 0{idx + 1}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 text-[#deb86d] flex items-center justify-center backdrop-blur-xs">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    {item.star && (
                      <span className="text-xs font-serif font-bold text-[#deb86d] bg-black/40 px-2 py-0.5 rounded border border-[#deb86d]/30 backdrop-blur-xs">
                        {item.star}
                      </span>
                    )}
                    <span className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-sm">
                      {item.value}
                    </span>
                  </div>
                  <div className="text-[11px] font-bold tracking-wider text-[#deb86d] uppercase mb-1 font-mono">
                    {item.label}
                  </div>
                  <p className="text-xs text-[#b8ccc0] leading-relaxed">
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
