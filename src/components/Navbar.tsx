"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  ShieldCheck,
  MessageSquare,
  Sparkles,
  BookOpen,
  Bell,
  ShoppingBag,
  Users,
} from "lucide-react";

interface NavbarProps {
  onOpenLoginModal?: () => void;
}

export default function Navbar({ onOpenLoginModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      name: "The Vault",
      href: "/#explorer",
      badge: "850+ PYQs",
      submenu: [
        { title: "Computer Science (CSE)", desc: "CS301 - CS802 Past Papers & Notes", code: "CSE" },
        { title: "Electronics & Comm (ECE)", desc: "Analog, VLSI, DSP Archives", code: "ECE" },
        { title: "Electrical Engineering (EE)", desc: "Machines, Power Systems, Signals", code: "EE" },
        { title: "Mechanical Engineering (ME)", desc: "Thermodynamics, Fluid, Drafters", code: "ME" },
        { title: "Information Tech (IT)", desc: "DBMS, Web Tech, Networks", code: "IT" },
      ],
    },
    {
      name: "The Board",
      href: "/#explorer",
      badge: "Circulars",
      submenu: [
        { title: "Official T&P Circulars", desc: "Campus recruitment & internship drives", icon: Bell },
        { title: "Lost & Found AI Handover", desc: "Private recovery with zero phone exposure", icon: ShieldCheck },
        { title: "Dean & Exam Memos", desc: "MAKAUT semester schedules & routines", icon: Sparkles },
      ],
    },
    {
      name: "Marketplace",
      href: "/#explorer",
      badge: "0% Fee",
      submenu: [
        { title: "Engineering Drafters & Tools", desc: "Mini-drafters, compasses, scales" },
        { title: "MAKAUT Academic Textbooks", desc: "Standard reference books by semester" },
        { title: "Lab Coats & Workshop Gear", desc: "Cotton aprons, safety goggles, meters" },
      ],
    },
    {
      name: "Guilds & Clubs",
      href: "/community",
      submenu: [
        { title: "Developers Community (DC KGEC)", desc: "Open Source, Hackathons & Nexus Guild", code: "TECH" },
        { title: "Robotics & Automation Society", desc: "IoT, Combat Robots, Drones & Hardware", code: "ROBO" },
        { title: "E-Cell & Innovation Hub", desc: "Startups, Case Studies & Ideation", code: "E-CELL" },
        { title: "KGEC Cultural Societies", desc: "Les Amateurs, Phoenix, IMPULSE fest", code: "CULTURE" },
      ],
    },
    {
      name: "Network",
      href: "/profile",
      submenu: [
        { title: "Student Network & Directory", desc: "Connect with classmates, batchmates & alumni", code: "NETWORK", url: "/profile?tab=network" },
        { title: "Direct Peer Messages", desc: "Encrypted campus chat with project squads", code: "CHAT", url: "/messages" },
        { title: "Placement & Internship Feed", desc: "Open-to-work candidate directory & target roles", code: "CAREERS", url: "/profile" },
      ],
    },
    {
      name: "FAQ",
      href: "/#faq",
    },
  ];

  return (
    <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50">
      {/* Floating Transparent Navbar with Rounded Edges */}
      <header className="bg-[#070e0a]/50 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)] transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with Crest */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#dfc285] via-[#c79e4d] to-[#9e7529] p-[1px] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-[#0b1510] rounded-full flex items-center justify-center">
                <span className="text-sm sm:text-base font-serif font-bold text-[#deb86d] tracking-tight">結</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-[#deb86d] font-semibold uppercase leading-none mb-1 font-mono">
                COLLEGIATE INTRANET
              </span>
              <span className="text-base sm:text-lg font-serif font-bold tracking-wide text-white leading-none flex items-center gap-2">
                COLLEGE NEXUS
                <span className="text-[9px] font-mono font-medium px-1.5 py-0.5 bg-[#14261c]/90 text-[#deb86d] rounded-full border border-[#284232] leading-none hidden sm:inline-block">
                  KGEC
                </span>
              </span>
            </div>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative py-2"
                onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={link.href}
                  className="text-xs font-medium tracking-wider text-[#d3e2d8] hover:text-[#deb86d] transition-colors flex items-center gap-1.5 uppercase whitespace-nowrap group"
                >
                  <span>{link.name}</span>
                  {link.submenu && (
                    <ChevronDown className="w-3.5 h-3.5 text-[#869f90] group-hover:text-[#deb86d] transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.submenu && activeDropdown === link.name && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-80 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-[#0c1813]/95 border border-[#1f372a] shadow-2xl rounded-2xl p-3 backdrop-blur-2xl">
                      <div className="text-[10px] font-bold tracking-wider text-[#c79e4d] uppercase mb-2 px-3 py-1.5 border-b border-[#182c21] flex items-center justify-between font-mono">
                        <span>{link.name.toUpperCase()} DIRECTORY</span>
                        {link.badge && (
                          <span className="text-[9px] px-1.5 py-0.5 bg-[#172a1f] text-[#deb86d] rounded border border-[#254231] font-normal">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <div className="space-y-1">
                        {link.submenu.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={"url" in sub ? (sub.url as string) : link.href}
                            className="p-2.5 hover:bg-[#13231a] rounded-xl transition-colors cursor-pointer group/item flex flex-col border border-transparent hover:border-[#1e382b]"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex items-center justify-between text-xs font-medium text-[#e4ede7] group-hover/item:text-[#deb86d]">
                              <span>{sub.title}</span>
                              {"code" in sub && (
                                <span className="text-[9px] px-1.5 py-0.5 bg-[#172b20] text-[#a4b8ab] font-mono rounded">
                                  {sub.code}
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-[#788e81] leading-snug mt-0.5">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Direct Messages Icon Button */}
            <Link
              href="/messages"
              className="relative p-2 text-[#d3e2d8] hover:text-[#deb86d] hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              title="Campus Messages (3 unread)"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c79e4d] ring-2 ring-[#0b1510]"></span>
            </Link>

            {/* Student Profile Pill */}
            <Link
              href="/profile"
              className="flex items-center gap-2 pl-1.5 pr-3 py-1 border border-white/15 hover:border-[#c79e4d]/50 bg-white/5 hover:bg-white/10 rounded-full text-xs font-medium text-[#e0ece4] transition-all cursor-pointer group"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#deb86d] to-[#9c752c] text-[#0b1510] font-bold text-[9px] flex items-center justify-center shrink-0">
                AS
              </div>
              <span className="text-xs group-hover:text-[#deb86d] transition-colors">Profile</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            </Link>

            {/* Luxury Gold Pill Button (Roll Auth) */}
            <button
              onClick={onOpenLoginModal}
              className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] text-xs font-bold tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#08120c]" />
              <span>Roll Auth</span>
            </button>
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenLoginModal}
              className="px-3 py-1.5 bg-[#c79e4d] text-[#08120c] text-[10px] font-bold uppercase rounded-full"
            >
              Auth
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-white hover:text-[#deb86d] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/15 px-2 py-4 space-y-3">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-white/10 pb-1.5">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-xs font-medium text-white hover:text-[#deb86d] py-1"
                  >
                    <span>{link.name}</span>
                    {link.badge && (
                      <span className="text-[9px] px-2 py-0.5 bg-[#172b20] text-[#deb86d] font-mono rounded-full border border-[#254231]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-[#deb86d] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 rounded-full border border-white/10"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#c79e4d]" />
                <span>Messages (3 New)</span>
              </Link>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLoginModal) onOpenLoginModal();
                }}
                className="w-full py-2.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] text-[#08120c] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-full shadow-md"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Authenticate Roll Number</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
