"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import ArsenalBento from "@/components/ArsenalBento";
import HeritageSection from "@/components/HeritageSection";
import SignaturePortals from "@/components/SignaturePortals";
import SocietiesRibbon from "@/components/SocietiesRibbon";
import TestimonialsSection from "@/components/TestimonialsSection";
import CampusFlowFAQ from "@/components/CampusFlowFAQ";
import CampusExplorer from "@/components/CampusExplorer";
import MindsSection from "@/components/MindsSection";
import AlertsBanner from "@/components/AlertsBanner";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-[#142018] relative selection:bg-[#c79e4d] selection:text-[#0b1510]">
      {/* 1. Navigation Header */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* 2. Hero Section with Atmospheric College Background & Live Pulse Preview Card */}
      <Hero onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* 3. Live Campus Pulse Statistics Bar (Ivory Ribbon with Gold Accents) */}
      <StatsCounter />

      {/* 4. The Soul of the Intranet (Dark Luxury Container Card with Engineering Lab & Highlights) */}
      <ArsenalBento />

      {/* 5. Traditional Heritage, Modern Artistry (Panoramic Campus Card + 3 Ivory Feature Cards) */}
      <HeritageSection />

      {/* 6. Signatures Crafted for the Curious (Dark Card + 4 Vertical Portals) */}
      <SignaturePortals />

      {/* 7. Affiliated KGEC Guilds & Technical Societies Strip */}
      <SocietiesRibbon />

      {/* 8. Kind Words from Amazing Students & Alumni (Spotlight Photo + 3 Stacked Reviews) */}
      <TestimonialsSection />

      {/* 9. A Seamless Campus Flow (4 Steps) + Interactive Accordion FAQ */}
      <CampusFlowFAQ />

      {/* 10. Interactive Campus Explorer (Matching "Interactive Menu Explorer" in Reference Screenshot) */}
      <CampusExplorer onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* 11. The Minds Behind the Intranet (Dev Community KGEC Student Leads & Mentors) */}
      <MindsSection />

      {/* 12. Official Push Broadcasts / Circular Alerts Subscription Banner */}
      <AlertsBanner />

      {/* 13. Dedicated Luxury Multi-Column Footer with Helplines & Status */}
      <Footer />

      {/* 14. Interactive Roll Verification / Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </main>
  );
}
