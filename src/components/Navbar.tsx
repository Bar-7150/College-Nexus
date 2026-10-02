"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
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
  LogOut,
  User as UserIcon,
  CheckCircle2,
  FolderUp,
  HelpCircle,
} from "lucide-react";

interface NavbarProps {
  onOpenLoginModal?: () => void;
}

export default function Navbar({ onOpenLoginModal }: NavbarProps) {
  const { profile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    {
      name: "The Vault",
      href: "/vault",
      badge: "PYQs & Notes",
      icon: BookOpen,
      submenu: [
        { title: "Computer Science (CSE)", desc: "CS301 - CS802 Past Papers & Notes", code: "CSE", url: "/vault/cse" },
        { title: "Electronics & Comm (ECE)", desc: "Analog, VLSI, DSP Archives", code: "ECE", url: "/vault/ece" },
        { title: "Electrical Engineering (EE)", desc: "Machines, Power Systems, Signals", code: "EE", url: "/vault/ee" },
        { title: "Mechanical Engineering (ME)", desc: "Thermodynamics, Fluid, Drafters", code: "ME", url: "/vault/me" },
        { title: "Information Tech (IT)", desc: "DBMS, Web Tech, Networks", code: "IT", url: "/vault/it" },
      ],
    },
    {
      name: "The Board",
      href: "/board/notic",
      badge: "Circulars",
      icon: Bell,
      submenu: [
        { title: "Official T&P Circulars", desc: "Campus recruitment & internship drives", icon: Bell, url: "/board/notic" },
        { title: "Lost & Found AI Handover", desc: "Private recovery with zero phone exposure", icon: ShieldCheck, url: "/board/lost" },
        { title: "Dean & Exam Memos", desc: "MAKAUT semester schedules & routines", icon: Sparkles, url: "/board/notic" },
      ],
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      badge: "0% Fee",
      icon: ShoppingBag,
      submenu: [
        { title: "Engineering Drafters & Tools", desc: "Mini-drafters, compasses, scales" },
        { title: "MAKAUT Academic Textbooks", desc: "Standard reference books by semester" },
        { title: "Lab Coats & Workshop Gear", desc: "Cotton aprons, safety goggles, meters" },
      ],
    },
    {
      name: "Guilds & Clubs",
      href: "/community",
      icon: Users,
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
      icon: Sparkles,
      submenu: [
        { title: "Student Network & Directory", desc: "Connect with classmates, batchmates & alumni", code: "NETWORK", url: "/profile?tab=network" },
        { title: "Direct Peer Messages", desc: "Encrypted campus chat with project squads", code: "CHAT", url: "/messages" },
        { title: "Placement & Internship Feed", desc: "Open-to-work candidate directory & target roles", code: "CAREERS", url: "/profile" },
      ],
    },
    {
      name: "FAQ",
      href: "/#faq",
      icon: HelpCircle,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay - Dims and blurs background when mobile menu is open */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/85 backdrop-blur-md z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 w-[94%] max-w-7xl z-50">
        {/* Floating Navbar - switches from sleek pill to luxury modal on mobile when open */}
        <header
          className={`transition-all duration-300 ${
            mobileMenuOpen
              ? "bg-[#070e0a]/98 backdrop-blur-2xl border border-[#c79e4d]/45 rounded-3xl p-4 sm:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[88vh] overflow-y-auto"
              : "bg-[#070e0a]/60 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-full px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 shadow-[0_8px_32px_0_rgba(0,0,0,0.45)]"
          }`}
        >
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
              title="Campus Messages"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#c79e4d] ring-2 ring-[#0b1510]"></span>
            </Link>

            {/* Authenticated Profile Pill or Sign In Trigger */}
            {profile ? (
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-1.5 pr-3 py-1 border border-white/20 hover:border-[#c79e4d]/70 bg-white/10 hover:bg-white/15 rounded-full text-xs font-medium text-[#e0ece4] transition-all cursor-pointer group shadow-sm"
                  aria-label="Student account menu"
                >
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-5 h-5 rounded-full object-cover shrink-0 ring-1 ring-[#deb86d]/50"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#deb86d] to-[#9c752c] text-[#0b1510] font-bold text-[9px] flex items-center justify-center shrink-0">
                      {profile.avatarText || "ST"}
                    </div>
                  )}
                  <span className="text-xs group-hover:text-[#deb86d] transition-colors max-w-[90px] truncate">
                    {profile.name.split(" ")[0]}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <ChevronDown className="w-3 h-3 text-[#a3b8ab] group-hover:text-[#deb86d] transition-transform duration-200" />
                </button>

                {/* Profile Floating Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full pt-2 w-72 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="bg-[#0b1611]/95 border border-[#233d2e] shadow-2xl rounded-2xl p-3.5 backdrop-blur-2xl text-[#d4e2d8]">
                      
                      {/* Identity Card Header */}
                      <div className="p-3 bg-[#13231a] rounded-xl border border-[#264232] mb-3">
                        <div className="flex items-center gap-3">
                          {profile.avatarUrl ? (
                            <img
                              src={profile.avatarUrl}
                              alt={profile.name}
                              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#deb86d]/50 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfc285] to-[#9c752c] text-[#08120c] font-bold text-sm flex items-center justify-center shrink-0">
                              {profile.avatarText}
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                              <span>{profile.name}</span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#deb86d] shrink-0" />
                            </div>
                            <div className="text-[10px] font-mono text-[#a4b8ab] truncate">
                              {profile.rollNumber}
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[9px] px-1.5 py-0.2 bg-[#1b3425] text-[#deb86d] rounded border border-[#284834] font-mono uppercase font-semibold">
                                {profile.department}
                              </span>
                              <span className="text-[9px] text-[#788e81] font-mono">
                                {profile.batchYear}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Navigation Actions */}
                      <div className="space-y-1 text-xs">
                        <Link
                          href="/profile"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#dbe5df] hover:text-[#deb86d] hover:bg-[#14261c] transition-colors"
                        >
                          <UserIcon className="w-4 h-4 text-[#deb86d]" />
                          <span>Intranet Student Profile</span>
                        </Link>

                        <Link
                          href="/messages"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-[#dbe5df] hover:text-[#deb86d] hover:bg-[#14261c] transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <MessageSquare className="w-4 h-4 text-[#869f90]" />
                            <span>Campus Peer Messages</span>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-[#deb86d]"></span>
                        </Link>

                        <Link
                          href="/upload-test"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[#dbe5df] hover:text-[#deb86d] hover:bg-[#14261c] transition-colors"
                        >
                          <FolderUp className="w-4 h-4 text-[#869f90]" />
                          <span>Intranet Asset Vault & Upload</span>
                        </Link>

                        <div className="border-t border-[#1b3224] my-1 pt-1"></div>

                        {/* Sign Out Button */}
                        <button
                          onClick={async () => {
                            setProfileDropdownOpen(false);
                            await logout();
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-300 hover:text-red-200 hover:bg-red-950/40 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4 text-red-400" />
                          <span className="font-medium">Sign Out from Session</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Luxury Gold Pill Button */
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] text-xs font-bold tracking-wider uppercase rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer shrink-0"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#08120c]" />
                <span>Sign In</span>
              </button>
            )}
          </div>

          {/* Mobile Hamburger & Quick Auth Controls */}
          <div className="flex lg:hidden items-center gap-2">
            {profile ? (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/15 rounded-full border border-white/20 text-[#deb86d] text-[11px] font-medium transition-colors"
              >
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-4 h-4 rounded-full object-cover ring-1 ring-[#deb86d]/50"
                  />
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[#deb86d] text-[#08120c] text-[8px] font-bold flex items-center justify-center">
                    {profile.avatarText}
                  </div>
                )}
                <span className="max-w-[70px] truncate">{profile.name.split(" ")[0]}</span>
              </button>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-3 py-1.5 bg-gradient-to-r from-[#dfc285] to-[#c79e4d] text-[#08120c] text-[10px] font-bold uppercase rounded-full shadow-sm"
              >
                Sign In
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-white hover:text-[#deb86d] bg-white/5 hover:bg-white/10 rounded-full border border-white/15 transition-all focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#deb86d]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pt-4 border-t border-[#c79e4d]/25 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Student Session Card in Mobile if Logged In */}
            {profile ? (
              <div className="p-3.5 bg-[#0a1811] border border-[#234230] rounded-2xl flex items-center justify-between shadow-lg">
                <div className="flex items-center gap-3">
                  {profile.avatarUrl ? (
                    <img
                      src={profile.avatarUrl}
                      alt={profile.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-[#deb86d]/60 shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#dfc285] to-[#c79e4d] text-[#08120c] font-bold text-sm flex items-center justify-center shrink-0 shadow-md">
                      {profile.avatarText}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{profile.name}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <div className="text-[11px] font-mono text-[#a4b8ab] mt-0.5">
                      {profile.rollNumber} • {profile.department}
                    </div>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="p-2 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="p-3.5 bg-[#0a1811] border border-[#c79e4d]/30 rounded-2xl flex items-center justify-between shadow-md">
                <div>
                  <div className="text-xs font-bold text-white uppercase tracking-wider">KGEC Intranet</div>
                  <div className="text-[11px] text-[#9db2a4] mt-0.5">Sign in to access verified collegiate services</div>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLoginModal) onOpenLoginModal();
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-[#dfc285] to-[#c79e4d] text-[#08120c] text-[11px] font-bold uppercase rounded-full shadow-md"
                >
                  Sign In
                </button>
              </div>
            )}

            {/* Navigation Links with Icons and Clean Touch Targets */}
            <div className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-[#e4ede7] hover:text-[#deb86d] hover:bg-white/5 active:bg-white/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#c79e4d]/40 flex items-center justify-center text-[#deb86d] shrink-0 transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium text-white group-hover:text-[#deb86d] transition-colors">
                        {link.name}
                      </span>
                    </div>
                    {link.badge && (
                      <span className="text-[10px] px-2 py-0.5 bg-[#172b20] text-[#deb86d] font-mono rounded-full border border-[#254231]">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2.5">
              <Link
                href="/messages"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 bg-white/5 hover:bg-white/10 active:bg-white/15 text-[#deb86d] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl border border-white/10 transition-colors shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#c79e4d]" />
                <span>Messages</span>
              </Link>

              {profile ? (
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 bg-white/10 hover:bg-white/15 active:bg-white/20 text-[#e0ece4] text-xs font-semibold tracking-wider uppercase flex items-center justify-center gap-2 rounded-xl border border-white/15 transition-colors shadow-sm"
                >
                  <UserIcon className="w-4 h-4 text-[#deb86d]" />
                  <span>Profile</span>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenLoginModal) onOpenLoginModal();
                  }}
                  className="py-2.5 px-3 bg-gradient-to-r from-[#dfc285] to-[#c79e4d] text-[#08120c] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 rounded-xl shadow-md"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Roll Verify</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  </>
);
}
