"use client";

import React from "react";
import { QUEST_LEVELS } from "@/data/mockData";
import { ArrowRight, Swords, Shield, Award, Crown } from "lucide-react";

export default function QuestLevels() {
  const levelIcons = [Swords, Shield, Award, Crown];

  return (
    <section id="levels" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-red-600"></span>
            <span>DEVELOPMENT ROADMAP</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            The 4 Levels of <span className="text-red-600">College Nexus</span>
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mt-3 leading-relaxed">
            The progression milestones for College Nexus — climbing from the problem blueprint to a live production intranet at Kalyani Government Engineering College.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {QUEST_LEVELS.map((quest, idx) => {
            const Icon = levelIcons[idx];
            const isCurrent = quest.status === "Current Quest";
            const isCompleted = quest.status === "Completed";

            return (
              <div
                key={quest.level}
                className={`group relative flex flex-col justify-between p-8 bg-white border rounded-xl transition-all duration-300 shadow-xs hover:shadow-md ${
                  isCurrent
                    ? "border-red-500 ring-2 ring-red-500/10"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                    {quest.level}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isCurrent
                        ? "bg-red-600 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {quest.status}
                  </span>
                </div>

                {/* Avatar Icon */}
                <div className="flex flex-col items-center text-center my-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 group-hover:text-red-600 group-hover:bg-red-50 group-hover:border-red-200 flex items-center justify-center transition-all duration-200 shadow-2xs mb-4">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight group-hover:text-red-600 transition-colors">
                    {quest.title}
                  </h3>

                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">
                    {quest.subTitle}
                  </span>
                </div>

                {/* Description & Milestones */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {quest.description}
                  </p>

                  <ul className="space-y-2">
                    {quest.milestones.map((milestone, mIdx) => (
                      <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0 mt-1.5"></span>
                        <span className="leading-snug">{milestone}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* 28-Day Strip */}
        <div className="mt-12 p-6 bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-2xs">
              4W
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                28 Days of Focused Mastery (DC KGEC)
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Every Sunday is the milestone submission deadline before unlocking the next level.
              </p>
            </div>
          </div>

          <a
            href="#timeline"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-red-600 hover:text-red-700"
          >
            <span>View Timeline</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
