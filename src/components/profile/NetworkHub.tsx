"use client";

import React, { useState } from "react";
import {
  StudentProfile,
  ConnectionRequestItem,
} from "@/data/profileData";
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  Check,
  X,
  Search,
  Filter,
  ShieldCheck,
  Briefcase,
  MapPin,
  Sparkles,
  MessageSquare,
} from "lucide-react";

interface NetworkHubProps {
  profiles: StudentProfile[];
  currentProfile: StudentProfile;
  receivedRequests: ConnectionRequestItem[];
  sentRequests: string[]; // profile IDs
  onAcceptRequest: (reqId: string, senderId: string) => void;
  onIgnoreRequest: (reqId: string) => void;
  onConnectClick: (profile: StudentProfile) => void;
  onSelectProfile: (profile: StudentProfile) => void;
  onMessageClick: (profile: StudentProfile) => void;
}

export default function NetworkHub({
  profiles,
  currentProfile,
  receivedRequests,
  sentRequests,
  onAcceptRequest,
  onIgnoreRequest,
  onConnectClick,
  onSelectProfile,
  onMessageClick,
}: NetworkHubProps) {
  const [activeTab, setActiveTab] = useState<"grow" | "invitations" | "connections">("grow");
  const [deptFilter, setDeptFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const departments = [
    { code: "ALL", label: "All Departments" },
    { code: "CSE", label: "Computer Science" },
    { code: "ECE", label: "Electronics (ECE)" },
    { code: "EE", label: "Electrical (EE)" },
    { code: "ME", label: "Mechanical (ME)" },
    { code: "IT", label: "Information Tech" },
  ];

  const filteredProfiles = profiles.filter((p) => {
    if (p.id === currentProfile.id) return false;
    if (deptFilter !== "ALL" && p.department !== deptFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchHeadline = p.headline.toLowerCase().includes(q);
      const matchRoll = p.rollNumber.toLowerCase().includes(q);
      const matchSkills = p.skills.some((s) => s.name.toLowerCase().includes(q));
      return matchName || matchHeadline || matchRoll || matchSkills;
    }
    return true;
  });

  return (
    <div className="bg-[#070e0a]/50 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 rounded-2xl shadow-xl overflow-hidden mb-6 text-white">
      {/* Network Header & Tabs */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 border border-[#c79e4d]/40 text-[#deb86d] flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              Campus Student Network
            </h2>
            <p className="text-xs text-[#8fa597] font-mono">
              Manage connections, explore batchmates, and discover research collaborators
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 bg-[#0b1510] border border-white/20 p-1 rounded-xl self-start md:self-auto text-xs font-mono uppercase tracking-wider">
          <button
            onClick={() => setActiveTab("grow")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
              activeTab === "grow"
                ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                : "text-[#dbe7df] hover:text-[#deb86d]"
            }`}
          >
            Discover ({profiles.length - 1})
          </button>
          <button
            onClick={() => setActiveTab("invitations")}
            className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "invitations"
                ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                : "text-[#dbe7df] hover:text-[#deb86d]"
            }`}
          >
            <span>Invitations</span>
            {receivedRequests.length > 0 && (
              <span className="w-4 h-4 bg-[#c79e4d] text-[#08120c] rounded-full text-[10px] flex items-center justify-center font-bold">
                {receivedRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Invitations Alert Banner (If pending) */}
      {receivedRequests.length > 0 && activeTab !== "invitations" && (
        <div className="px-6 py-3 bg-[#0e1a14] border-b border-[#c79e4d]/30 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-[#deb86d]">
            <UserPlus className="w-4 h-4 text-[#c79e4d]" />
            <span>
              You have <strong>{receivedRequests.length} pending connection invitation(s)</strong> waiting for your approval.
            </span>
          </div>
          <button
            onClick={() => setActiveTab("invitations")}
            className="text-xs font-mono uppercase tracking-wider font-bold text-[#deb86d] hover:underline cursor-pointer"
          >
            Review All
          </button>
        </div>
      )}

      {/* Tab: INVITATIONS */}
      {activeTab === "invitations" && (
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono">
              Pending Invitations ({receivedRequests.length})
            </h3>
            <span className="text-xs text-[#8fa597] font-mono">KGEC Intranet Queue</span>
          </div>

          {receivedRequests.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <UserCheck className="w-10 h-10 text-white/20 mx-auto" />
              <p className="text-sm font-serif font-bold text-white">No pending invitations</p>
              <p className="text-xs text-[#8fa597] font-light">
                You are all caught up! Explore classmates below to expand your collegiate circle.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {receivedRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-[#0b1510]/80 border border-white/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#c79e4d]/40 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${req.senderAvatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md border border-white/20`}
                    >
                      {req.senderAvatar}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-serif font-bold text-white hover:text-[#deb86d] cursor-pointer">
                          {req.senderName}
                        </h4>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-[#deb86d] rounded border border-white/10">
                          {req.senderRoll}
                        </span>
                        <span className="text-xs text-[#8fa597] font-mono">• {req.timestamp}</span>
                      </div>

                      <p className="text-xs text-[#d4e4da] leading-normal max-w-xl font-light">
                        {req.senderHeadline}
                      </p>

                      {req.note && (
                        <div className="mt-2 p-2.5 bg-[#070e0a] border border-[#c79e4d]/30 rounded-lg text-xs text-[#cde0d4] italic border-l-2 border-l-[#c79e4d]">
                          &quot;{req.note}&quot;
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onIgnoreRequest(req.id)}
                      className="px-3.5 py-1.5 border border-white/20 hover:bg-white/10 text-[#a4b8ab] hover:text-white rounded-lg text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Ignore
                    </button>
                    <button
                      onClick={() => onAcceptRequest(req.id, req.senderId)}
                      className="px-4 py-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-lg text-xs font-bold font-mono uppercase tracking-wider transition-colors shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Accept</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: GROW / DISCOVER STUDENTS */}
      {activeTab === "grow" && (
        <div className="p-5 sm:p-6 space-y-5">
          {/* Filter Bar & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Department Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {departments.map((dept) => (
                <button
                  key={dept.code}
                  onClick={() => setDeptFilter(dept.code)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                    deptFilter === dept.code
                      ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                      : "bg-[#0b1510] border border-white/20 text-[#dbe7df] hover:border-[#c79e4d]"
                  }`}
                >
                  {dept.code}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative sm:w-64">
              <Search className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, skills or roll..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-[#0b1510] border border-white/20 focus:border-[#c79e4d] rounded-lg focus:outline-none text-white placeholder-[#8fa597] font-mono"
              />
            </div>
          </div>

          {/* Student Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProfiles.map((p) => {
              const isPending =
                p.connectionStatus === "pending" || sentRequests.includes(p.id);
              const isConnected = p.connectionStatus === "connected";

              return (
                <div
                  key={p.id}
                  className="bg-[#0b1510]/80 border border-white/15 sm:border-[#c79e4d]/30 hover:border-[#c79e4d] rounded-2xl p-4 sm:p-5 shadow-md hover:shadow-2xl transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Top Row: Avatar & Status */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3">
                        <div
                          onClick={() => onSelectProfile(p)}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.avatarBg} text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-md border border-white/20 cursor-pointer group-hover:scale-105 transition-transform`}
                        >
                          {p.avatarText}
                        </div>

                        <div>
                          <div
                            onClick={() => onSelectProfile(p)}
                            className="text-sm font-serif font-bold text-white hover:text-[#deb86d] cursor-pointer flex items-center gap-1.5"
                          >
                            <span>{p.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-[#deb86d] rounded border border-white/10">
                              {p.rollNumber}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8fa597] font-mono">
                            {p.department} · {p.batchYear}
                          </div>
                        </div>
                      </div>

                      {p.jobStatus.isOpenToWork && (
                        <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-full text-[10px] font-mono font-semibold shrink-0">
                          Open to Work
                        </span>
                      )}
                    </div>

                    {/* Headline */}
                    <p className="text-xs text-[#d4e4da] line-clamp-2 leading-relaxed mb-3 font-light">
                      {p.headline}
                    </p>

                    {/* Target Roles or Top Skills */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.skills.slice(0, 3).map((skill) => (
                        <span
                          key={skill.id}
                          className="text-[10px] px-2 py-0.5 bg-white/10 border border-white/10 text-[#deb86d] rounded-md font-mono"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectProfile(p)}
                      className="text-xs font-mono uppercase tracking-wider text-[#a4b8ab] hover:text-[#deb86d] cursor-pointer"
                    >
                      View Profile
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onMessageClick(p)}
                        className="p-1.5 text-[#a4b8ab] hover:text-[#deb86d] hover:bg-white/10 rounded-lg transition-colors cursor-pointer border border-white/10"
                        title="Direct Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>

                      {isConnected ? (
                        <button
                          onClick={() => onConnectClick(p)}
                          className="px-3.5 py-1.5 bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Connected</span>
                        </button>
                      ) : isPending ? (
                        <button
                          onClick={() => onConnectClick(p)}
                          className="px-3.5 py-1.5 bg-[#1b1509] text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5 text-amber-400" />
                          <span>Pending</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onConnectClick(p)}
                          className="px-3.5 py-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-lg text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1 transition-colors shadow-md cursor-pointer"
                        >
                          <UserPlus className="w-3.5 h-3.5" />
                          <span>Connect</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
