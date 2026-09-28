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
      name: "Vault",
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
      name: "Network",
      href: "/profile",
      submenu: [
        { title: "Student Profiles & Network", desc: "Connect with classmates, batchmates & alumni", code: "NETWORK", url: "/profile?tab=network" },
        { title: "Direct Messages & Chat", desc: "Chat with peers, mentors & project squads", code: "CHAT", url: "/messages" },
        { title: "Achievement Stream", desc: "Hackathon wins, job offers & research milestones", code: "FEED", url: "/profile" },
        { title: "Internship & Job Status", desc: "Open-to-work candidate directory & target roles", code: "CAREERS", url: "/profile" },
      ],
    },
    {
      name: "The Board",
      href: "/#board",
      submenu: [
        { title: "Official Circulars", desc: "T&P, Dean & Examination Notices", icon: Bell },
        { title: "Lost & Found Recovery", desc: "Private Claim Handover Flow", icon: ShieldCheck },
        { title: "CR Broadcast Stream", desc: "Batch & Class Announcements", icon: Sparkles },
      ],
    },
    {
      name: "Marketplace",
      href: "/#marketplace",
      submenu: [
        { title: "Lab Instruments & Drafters", desc: "Mini-drafters, Compasses, Tools" },
        { title: "Academic Textbooks", desc: "MAKAUT Syllabus Standard Editions" },
        { title: "Workshop & Lab Gear", desc: "Cotton Aprons, Multimeters, Boards" },
      ],
    },
    {
      name: "Roadmap",
      href: "/#levels",
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-red-700 transition-colors">
            <span>結</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] tracking-[0.2em] text-slate-400 font-bold uppercase leading-none mb-0.5">
              COLLEGE
            </span>
            <span className="text-lg font-heading font-bold tracking-tight text-slate-900 leading-none flex items-center gap-1.5">
              NEXUS
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 bg-red-50 text-red-600 rounded border border-red-200/80 font-sans leading-none">
                KGEC
              </span>
            </span>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative py-4"
              onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={link.href}
                className="text-xs font-semibold tracking-wide text-slate-700 hover:text-red-600 transition-colors flex items-center gap-1 whitespace-nowrap group"
              >
                <span>{link.name}</span>
                {link.submenu && (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-transform duration-200 group-hover:rotate-180" />
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.submenu && activeDropdown === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-slate-200/90 shadow-xl rounded-2xl p-2.5">
                    <div className="text-[10px] font-bold tracking-wider text-red-600 uppercase mb-1.5 px-2.5 py-1 border-b border-slate-100 flex items-center justify-between font-mono">
                      <span>{link.name.toUpperCase()} DIRECTORY</span>
                      {link.badge && (
                        <span className="text-[9px] px-1.5 py-0.5 bg-red-50 text-red-600 rounded font-normal">
                          {link.badge}
                        </span>
                      )}
                    </div>
                    <div className="space-y-0.5">
                      {link.submenu.map((sub, idx) => (
                        <Link
                          key={idx}
                          href={"url" in sub ? (sub.url as string) : link.href}
                          className="p-2 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer group/item flex flex-col"
                          onClick={() => setActiveDropdown(null)}
                        >
                          <div className="flex items-center justify-between text-xs font-semibold text-slate-800 group-hover/item:text-red-600">
                            <span>{sub.title}</span>
                            {"code" in sub && (
                              <span className="text-[9px] px-1.5 py-0.2 bg-slate-100 text-slate-600 font-mono rounded">
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
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-2.5 shrink-0">
          {/* Direct Messages Icon Button */}
          <Link
            href="/messages"
            className="relative p-2 text-slate-600 hover:text-red-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="Campus Direct Messages (3 unread)"
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-600 ring-2 ring-white"></span>
          </Link>

          {/* Student Profile Pill */}
          <Link
            href="/profile"
            className="flex items-center gap-2 pl-1.5 pr-3 py-1 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 rounded-full text-xs font-semibold text-slate-700 transition-all shadow-2xs cursor-pointer group"
          >
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-[9px] flex items-center justify-center shrink-0">
              AS
            </div>
            <span className="font-semibold text-slate-800 group-hover:text-red-600">Profile</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
          </Link>

          {/* Verify Roll CTA */}
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-full shadow-2xs transition-all tracking-wider uppercase cursor-pointer shrink-0"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Roll Verify</span>
          </button>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="flex lg:hidden items-center gap-1.5">
          <Link
            href="/messages"
            className="relative p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            title="Messages"
          >
            <MessageSquare className="w-4 h-4 text-red-600" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-600"></span>
          </Link>
          <Link
            href="/profile"
            className="px-2.5 py-1.5 bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200"
          >
            Profile
          </Link>
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
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-5 space-y-4 shadow-xl">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-100 pb-1.5">
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-red-600 py-1.5"
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
              className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl border border-red-200"
            >
              <MessageSquare className="w-4 h-4 text-red-600" />
              <span>Campus Messenger (3 New)</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenLoginModal) onOpenLoginModal();
              }}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate Roll Number</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
