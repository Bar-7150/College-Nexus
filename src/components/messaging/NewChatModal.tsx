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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-heading font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-red-600" />
              <span>Start New Campus Message</span>
            </h3>
            <p className="text-xs text-slate-500">
              Select any verified KGEC student, mentor, or batchmate
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-slate-50/50">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
              autoFocus
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {depts.map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDept(d)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedDept === d
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Student List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 divide-y divide-slate-100">
          {peers.length === 0 ? (
            <div className="text-center py-10 space-y-1">
              <p className="text-sm font-semibold text-slate-700">No students found</p>
              <p className="text-xs text-slate-400">
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
                className="pt-2 first:pt-0 flex items-center justify-between p-2.5 hover:bg-red-50/50 rounded-xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    {peer.avatarText}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                        {peer.name}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded">
                        {peer.department}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {peer.rollNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                      {peer.headline}
                    </p>
                  </div>
                </div>

                <button className="px-3 py-1 bg-red-600 text-white rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shadow-2xs">
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
