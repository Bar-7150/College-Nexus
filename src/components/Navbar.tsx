"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Search,
  Users,
  Briefcase,
  MessageSquare,
} from "lucide-react";

interface NavbarProps {
  onOpenLoginModal?: () => void;
}

export default function Navbar({ onOpenLoginModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navLinks = [
    {
      name: "CAMPUS VAULT",
      href: "/#vault",
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
      name: "STUDENT NETWORK",
      href: "/profile",
      badge: "Connect & Jobs",
      submenu: [
        { title: "Student Profiles & Network", desc: "Connect with classmates, batchmates & alumni", code: "NETWORK", url: "/profile?tab=network" },
        { title: "Achievement Stream", desc: "Hackathon wins, job offers & research milestones", code: "FEED", url: "/profile" },
        { title: "Internship & Job Status", desc: "Open-to-work candidate directory & target roles", code: "CAREERS", url: "/profile" },
      ],
    },
    {
      name: "MESSAGES",
      href: "/messages",
      badge: "3 New",
      submenu: [
        { title: "Campus Direct Messages", desc: "Chat with batchmates, mentors & project squads", code: "CHAT", url: "/messages" },
        { title: "DevCom Core Channel", desc: "Developers Community KGEC engineering stream", code: "DEVCOM", url: "/messages?user=group-devcom" },
        { title: "SIH & Hackathon Collabs", desc: "Team chat & proposal discussions", code: "HACKS", url: "/messages?user=priya-sharma" },
      ],
    },
    {
      name: "THE BOARD",
      href: "/#board",
      badge: "Live Notices",
      submenu: [
        { title: "Official Circulars", desc: "T&P, Dean & Examination Notices", icon: Bell },
        { title: "Lost & Found Recovery", desc: "Private Claim Handover Flow", icon: ShieldCheck },
        { title: "CR Broadcast Stream", desc: "Batch & Class Announcements", icon: Sparkles },
      ],
    },
    {
      name: "MARKETPLACE",
      href: "/#marketplace",
      badge: "0% Fee",
      submenu: [
        { title: "Lab Instruments & Drafters", desc: "Mini-drafters, Compasses, Tools" },
        { title: "Academic Textbooks", desc: "MAKAUT Syllabus Standard Editions" },
        { title: "Workshop & Lab Gear", desc: "Cotton Aprons, Multimeters, Boards" },
      ],
    },
    {
      name: "ROADMAP",
      href: "/#levels",
      badge: "4 Levels",
      submenu: [
        { title: "Level I: Ronin", desc: "System Design & Architecture Spec" },
        { title: "Level II: Kenshi", desc: "Current: High-Fidelity Next.js UI" },
        { title: "Level III: Samurai", desc: "PostgreSQL, Supabase & WebSockets" },
        { title: "Level IV: Shogun", desc: "Live Campus Intranet Deployment" },
      ],
    },
    {
      name: "FAQ",
      href: "/#faq",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:bg-red-700 transition-colors">
            <span>結</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] tracking-[0.2em] text-slate-500 font-bold uppercase leading-tight">
              COLLEGE
            </span>
            <span className="text-xl font-heading font-bold tracking-tight text-slate-900 leading-tight flex items-center gap-1.5">
              NEXUS
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-200 font-sans">
                KGEC
              </span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Menus */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="text-xs tracking-wider font-semibold transition-colors hover:text-red-600 text-slate-700 py-2 flex items-center gap-1 relative"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      link.name === "STUDENT NETWORK"
                        ? "bg-red-100 text-red-700 font-bold"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {link.submenu && (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-transform duration-200 group-hover:rotate-180" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-200 group-hover:w-full rounded-full"></span>
              </Link>

              {/* Dropdown Menus */}
              {link.submenu && activeDropdown === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-3">
                    <div className="text-[10px] font-bold tracking-wider text-red-600 uppercase mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between font-mono">
                      <span>{link.name} DIRECTORY</span>
                      <span className="text-slate-400 font-normal">{link.badge}</span>
                    </div>
                    <div className="space-y-1">
                      {link.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={"url" in sub ? (sub.url as string) : link.href}
                          className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group/item flex flex-col"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 group-hover/item:text-red-600">
                            <span>{sub.title}</span>
                            {"code" in sub && (
                              <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 font-mono rounded">
                                {sub.code}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500 leading-snug mt-0.5">
                            {sub.desc}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-center text-slate-400 font-mono">
                      KGEC Intranet Node
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <Link
            href="/messages"
            className="relative p-2.5 border border-slate-300 hover:border-red-600 bg-white hover:bg-slate-50 text-slate-700 hover:text-red-600 rounded-xl transition-all shadow-2xs cursor-pointer group"
            title="Campus Direct Messages (3 unread)"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center shadow-xs">
              3
            </span>
          </Link>

          <Link
            href="/profile"
            className="flex items-center gap-2 px-3.5 py-2 border border-slate-300 hover:border-red-600 bg-white hover:bg-slate-50 text-slate-800 hover:text-red-600 text-xs font-semibold tracking-wide rounded-xl transition-all shadow-2xs cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-[10px] flex items-center justify-center">
              AS
            </div>
            <span>STUDENT PROFILE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </Link>

          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-xl shadow-xs hover:shadow cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ROLL VERIFY</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            href="/messages"
            className="relative p-2 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-200"
            title="Messages"
          >
            <MessageSquare className="w-3.5 h-3.5 text-red-600" />
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
          </Link>
          <Link
            href="/profile"
            className="px-2.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg flex items-center gap-1 border border-slate-200"
          >
            <Users className="w-3.5 h-3.5 text-red-600" />
            <span>PROFILE</span>
          </Link>
          <button
            onClick={onOpenLoginModal}
            className="px-2.5 py-1.5 bg-red-600 text-white text-xs tracking-wider font-semibold rounded-lg"
          >
            VERIFY
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-red-600 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="text-xs font-bold text-red-600 uppercase font-mono tracking-wider">
              CAMPUS INTRANET DIRECTORY
            </div>
            <span className="text-[10px] font-mono text-slate-400">PORTAL V2.0</span>
          </div>

          <div className="space-y-2">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col border-b border-slate-100 pb-2">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-red-600 py-1"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-red-50 text-red-600 font-semibold rounded-full border border-red-100">
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
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-lg border border-red-200"
            >
              <MessageSquare className="w-4 h-4 text-red-600" />
              <span>CAMPUS MESSENGER & CHAT (3 NEW)</span>
            </Link>

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-lg border border-slate-200"
            >
              <Users className="w-4 h-4 text-red-600" />
              <span>OPEN STUDENT NETWORK & PROFILE</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-lg shadow-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>AUTHENTICATE ROLL NUMBER</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
