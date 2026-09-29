"use client";

import React, { useEffect, useState } from "react";

export type CampusSectionKey = "hero" | "heritage" | "testimonials" | "explorer";

export default function FixedCampusBackground() {
  const [activeSection, setActiveSection] = useState<CampusSectionKey>("hero");

  useEffect(() => {
    const sectionMapping: Array<{ id: string; key: CampusSectionKey }> = [
      { id: "hero", key: "hero" },
      { id: "stats", key: "hero" },
      { id: "portals", key: "heritage" },
      { id: "heritage", key: "heritage" },
      { id: "signature-portals", key: "heritage" },
      { id: "societies", key: "testimonials" },
      { id: "testimonials", key: "testimonials" },
      { id: "voices", key: "testimonials" },
      { id: "faq", key: "explorer" },
      { id: "explorer", key: "explorer" },
      { id: "mentors", key: "explorer" },
      { id: "alerts", key: "explorer" },
    ];

    // Center-distance scroll spy to guarantee seamless transitions even during fast scrolls
    const updateActiveSectionOnScroll = () => {
      const windowHeight = window.innerHeight;
      const screenCenter = windowHeight * 0.45; // slightly above vertical center for natural human eye line

      let closestKey: CampusSectionKey = "hero";
      let minDistance = Infinity;

      const keyAnchorIds: Array<{ key: CampusSectionKey; id: string }> = [
        { key: "hero", id: "hero" },
        { key: "heritage", id: "heritage" },
        { key: "testimonials", id: "testimonials" },
        { key: "explorer", id: "explorer" },
      ];

      for (const anchor of keyAnchorIds) {
        const el = document.getElementById(anchor.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance between section vertical center and screen center
          const sectionCenter = rect.top + rect.height * 0.35;
          const dist = Math.abs(sectionCenter - screenCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestKey = anchor.key;
          }
        }
      }

      setActiveSection(closestKey);
    };

    // IntersectionObserver for passive efficiency
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          const topMatch = sectionMapping.find(
            (m) => m.id === visibleEntries[0].target.id
          );
          if (topMatch) {
            setActiveSection(topMatch.key);
          }
        }
      },
      {
        rootMargin: "-15% 0px -25% 0px",
        threshold: [0.15, 0.4, 0.7],
      }
    );

    sectionMapping.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    window.addEventListener("scroll", updateActiveSectionOnScroll, { passive: true });
    // Run once on initial mount
    updateActiveSectionOnScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSectionOnScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. HERO BACKGROUND: Maulana Abul Kalam Azad University of Technology Grand Gate */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
          activeSection === "hero" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <img
          src="/makaut-gate.jpg"
          alt="MAKAUT University Grand Entrance Gate Artwork"
          className="w-full h-full object-cover object-[center_25%] scale-[1.01] filter brightness-95 contrast-[1.04]"
        />
        {/* Artistic Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e0a]/95 via-[#070e0a]/75 sm:via-[#070e0a]/45 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-[#070e0a]/80 via-[#070e0a]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#070e0a] via-[#070e0a]/70 to-transparent" />
      </div>

      {/* 2. TRADITIONAL HERITAGE, MODERN ARTISTRY: KGEC Campus Architecture Painting */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
          activeSection === "heritage" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <img
          src="/kgec-hero.jpg"
          alt="Kalyani Government Engineering College Campus Architecture Artwork"
          className="w-full h-full object-cover object-[center_35%] scale-[1.01] filter brightness-95 contrast-[1.04]"
        />
        {/* Semi-transparent protective veil to guarantee text legibility while keeping artwork vibrant */}
        <div className="absolute inset-0 bg-[#070e0a]/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e0a]/75 via-transparent to-[#070e0a]/80" />
      </div>

      {/* 3. KIND WORDS FROM KGEC STUDENTS & ALUMNI: Students Lecture Hall Watercolor */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
          activeSection === "testimonials" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <img
          src="/kgec-students-hall.jpg"
          alt="KGEC Students in Lecture Hall Artwork"
          className="w-full h-full object-cover object-[center_35%] scale-[1.01] filter brightness-95 contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-[#070e0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e0a]/80 via-transparent to-[#070e0a]/85" />
      </div>

      {/* 4. INTERACTIVE CAMPUS EXPLORER: Historic Academic Library Watercolor */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
          activeSection === "explorer" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
        }`}
      >
        <img
          src="/kgec-library.jpg"
          alt="KGEC Academic Central Library Artwork"
          className="w-full h-full object-cover object-[center_35%] scale-[1.01] filter brightness-95 contrast-[1.04]"
        />
        <div className="absolute inset-0 bg-[#070e0a]/35" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e0a]/80 via-transparent to-[#070e0a]/85" />
      </div>

      {/* Global Subtle Luxury Vignette: Soft ambient framing that never moves */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,transparent_40%,rgba(7,14,10,0.55)_100%)]" />
    </div>
  );
}
