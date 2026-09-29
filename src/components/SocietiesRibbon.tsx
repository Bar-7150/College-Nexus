"use client";

import React from "react";

export default function SocietiesRibbon() {
  const societies = [
    { name: "DEVELOPERS COMMUNITY", sub: "DC KGEC" },
    { name: "ROBOTICS SOCIETY", sub: "AUTONOMOUS & IOT" },
    { name: "E-CELL KGEC", sub: "ENTREPRENEURSHIP" },
    { name: "CODECLUB", sub: "COMPETITIVE PROGRAMMING" },
    { name: "IMPULSE FEST", sub: "ANNUAL TECH SYMPOSIUM" },
    { name: "LES AMATEURS", sub: "THEATRICAL SOCIETY" },
    { name: "PHOENIX", sub: "CULTURAL GUILD" },
  ];

  return (
    <section className="py-10 bg-[#f7f5ef] border-b border-[#e7e2d6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest text-[#a68239] uppercase font-semibold mb-6">
              AFFILIATED KGEC GUILDS &amp; TECHNICAL SOCIETIES
            </span>

          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              {societies.map((soc, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center group cursor-pointer"
                >
                <span className="font-serif font-bold text-sm sm:text-base tracking-widest text-[#1e2f24] group-hover:text-[#a68239] transition-colors">
                    {soc.name}
                  </span>
                <span className="text-[9px] font-mono text-[#788a7e] tracking-wider uppercase">
                    {soc.sub}
                  </span>
                </div>
              ))}
            </div>
          </div>
      </div>
    </section>
  );
}
