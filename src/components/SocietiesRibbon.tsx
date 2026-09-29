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
    <section
      id="societies"
      className="py-10 bg-[#070e0a]/40 backdrop-blur-md border-y border-[#c79e4d]/25 overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center">
          <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase font-semibold mb-6">
            AFFILIATED KGEC GUILDS &amp; TECHNICAL SOCIETIES
          </span>

          <div className="w-full flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-80 hover:opacity-100 transition-all duration-300">
            {societies.map((soc, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center group cursor-pointer"
              >
                <span className="font-serif font-bold text-sm sm:text-base tracking-widest text-white/90 group-hover:text-[#deb86d] transition-colors drop-shadow-xs">
                  {soc.name}
                </span>
                <span className="text-[9px] font-mono text-[#a3b8ab] tracking-wider uppercase">
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
