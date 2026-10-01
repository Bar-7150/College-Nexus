"use client";

import React from "react";
import { ArrowRight, BookOpen, Bell, ShoppingBag, Users, ChevronRight } from "lucide-react";

export default function SignaturePortals() {
  const portals = [
    {
      title: "Academic Vault",
      subtitle: "0 Solved Papers",
      desc: "MAKAUT past exams, lecture notes & syllabus modules.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=600&q=80",
      code: "VAULT",
      link: "#explorer",
    },
    {
      title: "The Notice Board",
      subtitle: "Zero-Noise Circulars",
      desc: "T&P cell alerts, exam regularization & routine updates.",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      code: "CIRCULARS",
      link: "#explorer",
    },
    {
      title: "Peer Marketplace",
      subtitle: "0% Transaction Fees",
      desc: "Exchange drafters, books, and lab coats at the canteen.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
      code: "COMMERCE",
      link: "#explorer",
    },
    {
      title: "Guilds & Clubs",
      subtitle: "12 Active Societies",
      desc: "Dev Community, Robotics, E-Cell & cultural fests.",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80",
      code: "COMMUNITY",
      link: "/community",
    },
  ];

  return (
    <section id="signature-portals" className="py-16 md:py-24 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Large Dark Rounded Card matching Reference Screenshot Section 4 */}
        <div className="bg-[#070e0a]/75 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-3xl p-8 sm:p-12 lg:p-14 text-[#f5f5f0] shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Heading and CTAs */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-5 h-[1.5px] bg-[#c79e4d]"></span>
                <span className="text-[10px] font-mono tracking-widest text-[#deb86d] uppercase">
                  CAMPUS SIGNATURES
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif text-[#f5f5f0] tracking-tight leading-tight mb-4">
                Signatures Crafted <br />
                <span className="italic font-light text-[#deb86d]">for the Curious.</span>
              </h2>

              <p className="text-sm text-[#9cb0a2] leading-relaxed mb-8 font-light">
                Four purpose-built pillars engineered to eliminate friction from student life at Kalyani Government Engineering College.
              </p>

              <div>
                <a
                  href="#explorer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] font-semibold text-xs tracking-wider uppercase rounded-full shadow-lg transition-all"
                >
                  <span>EXPLORE ALL PORTALS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right Column: 4 Sleek Vertical Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {portals.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4.5] sm:aspect-[3/5] bg-[#101e17] border border-[#1e382b] hover:border-[#c79e4d]/70 transition-all duration-300 flex flex-col justify-end p-5 shadow-md"
                >
                  {/* Background Image with Dark Vignette */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09130d] via-[#09130d]/70 to-transparent"></div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="text-[9px] font-mono font-semibold px-2 py-0.5 bg-[#0b1510]/80 text-[#deb86d] border border-[#233d2e] rounded-full backdrop-blur-xs">
                      {item.code}
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10">
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-[#deb86d] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <div className="text-[11px] text-[#deb86d] font-mono mt-0.5 mb-1.5">
                      {item.subtitle}
                    </div>
                    <p className="text-[11px] text-[#9db0a3] leading-snug line-clamp-2 font-light">
                      {item.desc}
                    </p>
                    <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[#deb86d] group-hover:translate-x-1 transition-transform">
                      <span>Enter Portal</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
