"use client";

import React from "react";
import { MOCK_TIMELINE } from "@/data/mockData";
import { Clock, Sparkles, Swords, Scroll, Trophy } from "lucide-react";

export default function Timeline() {
  const weekIcons = [Sparkles, Swords, Scroll, Trophy];

  return (
    <section id="timeline" className="py-20 md:py-28 bg-white border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-red-600 uppercase mb-3">
              <span className="w-4 h-[2px] bg-red-600 rounded-full"></span>
              4-WEEK PROGRAM SCHEDULE
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Quest <span className="text-red-600">Timeline</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 uppercase rounded-full shadow-2xs">
            <Clock className="w-4 h-4 text-red-600" />
            <span>
              Event Cycle: <strong className="text-red-600 font-bold">Sep 01 – Sep 28</strong>
            </span>
          </div>
        </div>

        {/* 4 Week Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_TIMELINE.map((item, idx) => {
            const Icon = weekIcons[idx];
            return (
              <div
                key={item.week}
                className="group relative flex flex-col justify-between p-7 bg-slate-50/60 border border-slate-200 hover:border-slate-300 transition-all duration-200 rounded-xl shadow-2xs hover:shadow-xs"
              >
                {/* Top Icon & Date Badge */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-white border border-slate-200 group-hover:border-red-200 group-hover:text-red-600 text-slate-700 flex items-center justify-center transition-colors shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-wider px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-full uppercase">
                    {item.dates}
                  </span>
                </div>

                {/* Week Label & Focus */}
                <div className="mb-6">
                  <span className="text-xs font-bold tracking-wider text-slate-400 uppercase block mb-1">
                    {item.week}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-red-600 uppercase">
                    {item.focus}
                  </p>
                </div>

                {/* Task Checklist */}
                <ul className="space-y-2.5 pt-4 border-t border-slate-200/80">
                  {item.tasks.map((task, tIdx) => (
                    <li key={tIdx} className="flex items-center gap-2 text-xs text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0"></span>
                      <span className="font-medium">{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
