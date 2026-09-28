"use client";

import React, { useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Bell,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Search,
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
      href: "#vault",
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
      name: "THE BOARD",
      href: "#board",
      badge: "Live Notices",
      submenu: [
        { title: "Official Circulars", desc: "T&P, Dean & Examination Notices", icon: Bell },
        { title: "Lost & Found Recovery", desc: "Private Claim Handover Flow", icon: ShieldCheck },
        { title: "CR Broadcast Stream", desc: "Batch & Class Announcements", icon: Sparkles },
      ],
    },
    {
      name: "MARKETPLACE",
      href: "#marketplace",
      badge: "0% Fee",
      submenu: [
        { title: "Lab Instruments & Drafters", desc: "Mini-drafters, Compasses, Tools" },
        { title: "Academic Textbooks", desc: "MAKAUT Syllabus Standard Editions" },
        { title: "Workshop & Lab Gear", desc: "Cotton Aprons, Multimeters, Boards" },
      ],
    },
    {
      name: "ROADMAP",
      href: "#levels",
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
      href: "#faq",
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="flex items-center gap-3 group">
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
        </a>

        {/* Desktop Nav Menus (Unworking / Dummy Links with Hover Rich Previews) */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => link.submenu && setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="text-xs tracking-wider font-semibold transition-colors hover:text-red-600 text-slate-700 py-2 flex items-center gap-1 relative"
              >
                <span>{link.name}</span>
                {link.submenu && (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-transform duration-200 group-hover:rotate-180" />
                )}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-200 group-hover:w-full rounded-full"></span>
              </a>

              {/* Unworking Dropdown Menus */}
              {link.submenu && activeDropdown === link.name && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="bg-white border border-slate-200 shadow-xl rounded-xl p-3">
                    <div className="text-[10px] font-bold tracking-wider text-red-600 uppercase mb-2 pb-1.5 border-b border-slate-100 flex items-center justify-between font-mono">
                      <span>{link.name} CATALOG</span>
                      <span className="text-slate-400 font-normal">{link.badge}</span>
                    </div>
                    <div className="space-y-1">
                      {link.submenu.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group/item flex flex-col"
                          onClick={(e) => {
                            e.preventDefault();
                            const target = document.querySelector(link.href);
                            if (target) target.scrollIntoView({ behavior: "smooth" });
                            setActiveDropdown(null);
                          }}
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
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-center text-slate-400">
                      KGEC Intranet Portal
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <button
            onClick={onOpenLoginModal}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-lg shadow-sm hover:shadow cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>ROLL VERIFY</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            onClick={onOpenLoginModal}
            className="px-3 py-1.5 bg-red-600 text-white text-xs tracking-wider font-semibold rounded-lg"
          >
            VERIFY
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-red-600 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-semibold text-slate-800 hover:text-red-600 py-1"
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 font-medium rounded-full">
                      {link.badge}
                    </span>
                  )}
                </a>
              </div>
            ))}
          </div>

          <div className="pt-2">
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
