"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  Pin,
  CheckCheck,
  Check,
  Filter,
  Users,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Flame,
  Radio,
} from "lucide-react";
import { Conversation } from "@/data/messagingData";

interface ConversationListProps {
  conversations: Conversation[];
  activeConvId: string | null;
  onSelectConversation: (convId: string) => void;
  onOpenNewChat: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeFilter: string;
  setActiveFilter: (f: string) => void;
}

export default function ConversationList({
  conversations,
  activeConvId,
  onSelectConversation,
  onOpenNewChat,
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}: ConversationListProps) {
  const filterTabs = [
    { id: "all", label: "All Chats" },
    { id: "unread", label: "Unread" },
    { id: "pinned", label: "Pinned" },
    { id: "mentors", label: "Mentors" },
    { id: "hackathons", label: "Hackathons" },
    { id: "projects", label: "Projects" },
  ];

  const totalUnread = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  const filteredConversations = conversations.filter((c) => {
    // Tab filter
    if (activeFilter === "unread" && c.unreadCount === 0) return false;
    if (activeFilter === "pinned" && !c.isPinned) return false;
    if (activeFilter === "mentors" && !c.tags.includes("mentors")) return false;
    if (activeFilter === "hackathons" && !c.tags.includes("hackathons")) return false;
    if (activeFilter === "projects" && !c.tags.includes("projects")) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (c.isGroup ? c.groupName : c.peer.name)?.toLowerCase().includes(q);
      const matchLastMsg = c.lastMessage.toLowerCase().includes(q);
      const matchDept = c.peer.department?.toLowerCase().includes(q);
      const matchRoll = c.peer.rollNumber?.toLowerCase().includes(q);
      return matchName || matchLastMsg || matchDept || matchRoll;
    }
    return true;
  });

  return (
    <div className="w-full md:w-80 lg:w-96 border-r border-slate-200/90 bg-white flex flex-col h-full shrink-0">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold shadow-2xs">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-heading font-bold text-slate-900 leading-tight">
              Campus Messenger
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>KGEC Intranet Subnet</span>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenNewChat}
          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
          title="New Message"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-3 bg-slate-50/50 border-b border-slate-100">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search classmates, rolls, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/20"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-0.5 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                  isActive
                    ? "bg-slate-900 text-white shadow-2xs"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === "unread" && totalUnread > 0 && (
                  <span className="w-4 h-4 bg-red-600 text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    {totalUnread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">No chats found</p>
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
              {searchQuery
                ? `No conversation matches "${searchQuery}". Start a new chat!`
                : "No messages in this filter."}
            </p>
            <button
              onClick={onOpenNewChat}
              className="mt-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          filteredConversations.map((c) => {
            const isSelected = c.id === activeConvId;
            const peerName = c.isGroup ? c.groupName : c.peer.name;
            const avatarBg = c.isGroup ? "from-red-600 to-red-800" : c.peer.avatarBg;
            const avatarText = c.isGroup ? "結" : c.peer.avatarText;

            return (
              <div
                key={c.id}
                onClick={() => onSelectConversation(c.id)}
                className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 relative group ${
                  isSelected
                    ? "bg-red-50/70 border-l-4 border-l-red-600"
                    : "hover:bg-slate-50/80"
                }`}
              >
                {/* Avatar with Status */}
                <div className="relative shrink-0 mt-0.5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}
                  >
                    {avatarText}
                  </div>
                  {c.isOnline && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"
                      title="Active on campus subnet"
                    ></span>
                  )}
                  {c.isGroup && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 bg-slate-900 border border-white text-white rounded-full flex items-center justify-center text-[8px]"
                      title="Campus Group"
                    >
                      <Users className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span
                        className={`text-xs font-bold truncate ${
                          c.unreadCount > 0 ? "text-slate-950 font-extrabold" : "text-slate-800"
                        }`}
                      >
                        {peerName}
                      </span>
                      {!c.isGroup && (
                        <span className="text-[9px] font-mono px-1 py-0.2 bg-slate-100 text-slate-600 rounded shrink-0">
                          {c.peer.department}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0 font-mono">
                      {c.lastMessageTime}
                    </span>
                  </div>

                  {/* Subnet Tag */}
                  <div className="text-[10px] text-slate-400 truncate flex items-center gap-1 mb-1">
                    <Radio className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{c.subnetLocation}</span>
                  </div>

                  {/* Last Message Snippet */}
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-xs truncate ${
                        c.unreadCount > 0
                          ? "text-slate-900 font-semibold"
                          : "text-slate-500"
                      }`}
                    >
                      {c.lastMessage}
                    </p>

                    <div className="flex items-center gap-1 shrink-0">
                      {c.isPinned && (
                        <Pin className="w-3 h-3 text-red-500 fill-red-500 shrink-0" />
                      )}
                      {c.unreadCount > 0 && (
                        <span className="min-w-4.5 h-4.5 px-1 bg-red-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-2xs">
                          {c.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
