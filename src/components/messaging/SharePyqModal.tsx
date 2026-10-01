"use client";

import React, { useState } from "react";
import { FileText, X, Check, Search, Download, BookOpen } from "lucide-react";
import { MessageAttachment } from "@/data/messagingData";

interface SharePyqModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (attachment: MessageAttachment) => void;
}

export default function SharePyqModal({
  isOpen,
  onClose,
  onShare,
}: SharePyqModalProps) {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");

  if (!isOpen) return null;

  const pyqLibrary = [
    {
      id: "pyq-1",
      dept: "CSE",
      code: "CS501",
      title: "Operating Systems End-Sem 2024 PYQ + Solution Key",
      subtitle: "MAKAUT Standard Syllabus • Deadlock, Virtual Memory, CPU Scheduling",
      fileSize: "3.4 MB",
      badge: "VERIFIED 2024",
    },
    {
      id: "pyq-2",
      dept: "CSE",
      code: "CS602",
      title: "Computer Networks End-Sem Archives (2021-2024)",
      subtitle: "TCP/IP, Congestion Control, Subnetting & Routing Algorithms",
      fileSize: "5.8 MB",
      badge: "4-YEAR ARCHIVE",
    },
    {
      id: "pyq-3",
      dept: "ECE",
      code: "EC402",
      title: "Microprocessors & Microcontrollers Lab Manual & Solved Papers",
      subtitle: "8085/8086 Architecture, Assembly Subroutines & Interfacing",
      fileSize: "4.1 MB",
      badge: "LAB ACCREDITED",
    },
    {
      id: "pyq-4",
      dept: "EE",
      code: "EE503",
      title: "Power Systems-I Mid-Sem Question Bank with Derivations",
      subtitle: "Transmission line parameters, GMD, GMR, Ferranti effect",
      fileSize: "2.9 MB",
      badge: "FACULTY COMPILED",
    },
    {
      id: "pyq-5",
      dept: "IT",
      code: "IT504",
      title: "Database Management Systems Normalization & B+ Trees Summary",
      subtitle: "BCNF, 3NF decomposition, Query optimization & indexing notes",
      fileSize: "2.2 MB",
      badge: "HIGH RATED",
    },
    {
      id: "pyq-6",
      dept: "CSE",
      code: "SIH-25",
      title: "Smart India Hackathon '25 Presentation & Pitch Deck Template",
      subtitle: "Full slide deck, system architecture diagram & jury Q&A notes",
      fileSize: "8.6 MB",
      badge: "DEVCOM WINNER",
    },
  ];

  const filtered = pyqLibrary.filter((item) => {
    if (selectedDept !== "ALL" && item.dept !== selectedDept) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/30 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Share Campus Vault PYQ / Note
              </h3>
              <p className="text-xs text-[#a3b899]">
                Attach verified MAKAUT past papers directly into conversation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-white/[0.02] border-b border-white/10 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#deb86d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by subject code, topic or exam..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0b1510] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c79e4d]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {["ALL", "CSE", "ECE", "EE", "IT"].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === dept
                    ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-sm"
                    : "bg-white/[0.04] border border-white/10 text-[#d4e4da] hover:bg-white/[0.08]"
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* List of PYQs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onShare({
                  id: `att-${Date.now()}`,
                  type: "pyq",
                  title: `${item.code} - ${item.title}`,
                  subtitle: `${item.subtitle} • ${item.fileSize}`,
                  fileSize: item.fileSize,
                  actionText: "Download PDF",
                  badge: item.badge,
                });
                onClose();
              }}
              className="p-3 bg-white/[0.03] border border-white/10 hover:border-[#c79e4d]/50 hover:bg-white/[0.06] rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-mono font-bold text-[#deb86d]">
                      {item.code}
                    </span>
                    <span className="text-xs font-serif font-bold text-white group-hover:text-[#deb86d]">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-white/10 border border-white/15 text-[#d4e4da] rounded">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#a3b899] mt-0.5 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <button className="px-3 py-1 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-lg text-xs font-bold font-mono uppercase tracking-wider shrink-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                Send
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
