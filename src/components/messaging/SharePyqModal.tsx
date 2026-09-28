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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900">
                Share Campus Vault PYQ / Note
              </h3>
              <p className="text-xs text-slate-500">
                Attach verified MAKAUT past papers directly into conversation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="p-4 bg-slate-50/70 border-b border-slate-100 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by subject code, topic or exam..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {["ALL", "CSE", "ECE", "EE", "IT"].map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDept === dept
                    ? "bg-red-600 text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
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
              className="p-3 bg-white border border-slate-200 hover:border-red-300 hover:bg-red-50/40 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-100/70 text-red-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-slate-900 group-hover:text-red-700">
                      {item.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-800">
                      {item.title}
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                Send
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
