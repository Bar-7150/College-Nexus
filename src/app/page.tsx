"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCounter from "@/components/StatsCounter";
import ArsenalBento from "@/components/ArsenalBento";
import CardShowcase from "@/components/CardShowcase";
// import QuestLevels from "@/components/QuestLevels";
// import Timeline from "@/components/Timeline";
// import Mentors from "@/components/Mentors";
// import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";

export default function Home() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#1a1a1a] relative selection:bg-[#b93a32] selection:text-white">
      {/* Navigation Header */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Hero Section with Live Terminal Card */}
      <Hero onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Live Campus Pulse Statistics Bar */}
      <StatsCounter />

      {/* Core Arsenal Bento Grid (4 Core Campus Pillars) */}
      <ArsenalBento />

      {/* All Necessary Card Components Showcase (Vault, Notices, Lost & Found, Marketplace) */}
      <CardShowcase />

      {/* The 4 Levels of Mastery (Ronin -> Kenshi -> Samurai -> Shogun) */}
      {/* <QuestLevels /> */}

      {/* 4-Week Schedule Timeline */}
      {/* <Timeline /> */}

      {/* Honored Mentors & Senseis from DC KGEC */}
      {/* <Mentors /> */}

      {/* Interactive FAQ Section */}
      {/* <FAQSection /> */}

      {/* Dedicated Multi-Column Footer */}
      <Footer />

      {/* Interactive Roll Verification / Login Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </main>
  );
}
