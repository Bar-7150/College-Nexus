"use client";

import React from "react";
import { MOCK_MENTORS } from "@/data/mockData";
import { GithubIcon, LinkedinIcon } from "@/components/SocialIcons";

export default function Mentors() {
  return (
    <section id="mentors" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-red-600 uppercase mb-3">
            <span className="w-4 h-[2px] bg-red-600 rounded-full"></span>
            INDUSTRY ADVISORS
            <span className="w-4 h-[2px] bg-red-600 rounded-full"></span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Honored <span className="text-red-600">Mentors</span>
          </h2>

          <p className="text-sm text-slate-600 max-w-md mt-3 leading-relaxed">
            Software engineers and alumni from Developers Community KGEC conducting weekly milestone reviews and architecture evaluations.
          </p>
        </div>

        {/* Mentors Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {MOCK_MENTORS.map((mentor, idx) => (
            <div
              key={idx}
              className="group relative flex flex-col items-center justify-between p-6 bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 rounded-xl shadow-xs hover:shadow-md text-center"
            >
              {/* Avatar Circle */}
              <div className="w-16 h-16 my-2 rounded-full bg-slate-100 border border-slate-200 text-slate-800 group-hover:bg-red-50 group-hover:text-red-600 group-hover:border-red-200 flex items-center justify-center font-bold text-xl transition-colors shadow-2xs">
                {mentor.name[0]}
              </div>

              {/* Mentor Identity */}
              <div className="my-3">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                  {mentor.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mt-1">
                  {mentor.role}
                </span>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {mentor.bio}
                </p>
              </div>

              {/* Social Links */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={mentor.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
