"use client";

import React, { useState } from "react";
import { Search, X, MessageSquare, ShieldCheck, Check } from "lucide-react";
import { StudentProfile, INITIAL_PROFILES } from "@/data/profileData";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPeer: (peer: StudentProfile) => void;
  currentUserId: string;
}

export default function NewChatModal({
  isOpen,
  onClose,
  onSelectPeer,
  currentUserId,
}: NewChatModalProps) {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");

  if (!isOpen) return null;

  const depts = ["ALL", "CSE", "ECE", "EE", "IT", "ME"];

  const peers = INITIAL_PROFILES.filter((p) => {
    if (p.id === currentUserId) return false;
    if (selectedDept !== "ALL" && p.department !== selectedDept) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.rollNumber.toLowerCase().includes(q) ||
        p.headline.toLowerCase().includes(q) ||
        p.department.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
          <div>
            <h3 className="text-base font-serif font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#deb86d]" />
              <span>Start New Campus Message</span>
            </h3>
            <p className="text-xs text-[#a3b899]">
              Select any verified KGEC student, mentor, or batchmate
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-white/10 space-y-3 bg-white/[0.02]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#deb86d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#0b1510] border border-white/15 rounded-xl text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#c79e4d]"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDept === d
                    ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-sm"
                    : "bg-white/[0.04] border border-white/10 text-[#d4e4da] hover:bg-white/[0.08]"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1 divide-y divide-white/5">
          {peers.length === 0 ? (
            <div className="text-center py-10 space-y-1">
              <p className="text-sm font-semibold text-white">No students found</p>
              <p className="text-xs text-[#a3b899] font-mono">
                Try searching with a different department or keyword
              </p>
            </div>
          ) : (
            peers.map((peer) => (
              <div
                key={peer.id}
                onClick={() => {
                  onSelectPeer(peer);
                  onClose();
                }}
                className="pt-2 first:pt-0 flex items-center justify-between p-2.5 hover:bg-white/[0.04] rounded-xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/15 group-hover:scale-105 transition-transform`}
                  >
                    {peer.avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-[#deb86d] transition-colors">
                        {peer.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#c79e4d]/15 text-[#deb86d] rounded border border-[#c79e4d]/30">
                        {peer.department}
                      </span>
                      <span className="text-[10px] font-mono text-[#a3b899]">
                        {peer.rollNumber}
                      </span>
                    </div>
                    <p className="text-xs text-[#a3b899] line-clamp-1 mt-0.5">
                      {peer.headline}
                    </p>
                  </div>
                </div>

                <button className="px-3 py-1 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-lg text-xs font-bold font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-md">
                  <span>Chat</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
