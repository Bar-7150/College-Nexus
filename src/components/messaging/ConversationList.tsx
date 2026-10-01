"use client";

import React from "react";
import {
  Search,
  Plus,
  Pin,
  MessageSquare,
  Users,
  Radio,
  Maximize2,
  Minimize2,
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
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
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
  isFullscreen,
  onToggleFullscreen,
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
    <div className="w-full md:w-80 lg:w-96 border-r border-white/15 sm:border-[#c79e4d]/25 bg-[#070e0a]/20 sm:bg-[#070e0a]/25 backdrop-blur-xl flex flex-col h-full shrink-0 text-[#d4e4da]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/10 text-[#deb86d] border border-white/20 flex items-center justify-center font-bold shadow-xs backdrop-blur-xs">
            <MessageSquare className="w-4 h-4 text-[#deb86d]" />
          </div>
          <div>
            <h2 className="text-base font-serif font-bold text-white leading-tight">
              Campus Messenger
            </h2>
            <div className="flex items-center gap-1.5 text-[10px] text-[#deb86d] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>KGEC INTRANET SUBNET</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className={`p-2 rounded-xl border transition-all cursor-pointer shadow-xs ${
                isFullscreen
                  ? "bg-[#c79e4d] text-[#08120c] font-bold border-[#c79e4d]"
                  : "text-[#deb86d] bg-white/5 hover:bg-[#c79e4d]/20 border-white/15 hover:border-[#c79e4d]/40"
              }`}
              title={isFullscreen ? "Exit Fullscreen" : "Full Screen Mode"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-3.5 h-3.5" />
              ) : (
                <Maximize2 className="w-3.5 h-3.5" />
              )}
            </button>
          )}

          <button
            onClick={onOpenNewChat}
            className="px-3 py-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider shadow-md"
            title="New Message"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New</span>
          </button>
        </div>
      </div>

      {/* Search Input & Filter Pills */}
      <div className="p-3 bg-white/[0.02] border-b border-white/10 space-y-2.5">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search classmates, rolls, messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 bg-[#070e0a]/35 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/30 focus:border-[#c79e4d] rounded-xl text-xs text-white placeholder-[#8fa597] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 no-scrollbar">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 backdrop-blur-xs whitespace-nowrap ${
                  isActive
                    ? "bg-[#c79e4d] text-[#08120c] shadow-sm font-bold"
                    : "bg-[#070e0a]/35 border border-white/15 text-[#dbe7df] hover:border-[#c79e4d] hover:text-[#deb86d]"
                }`}
              >
                <span>{tab.label}</span>
                {tab.id === "unread" && totalUnread > 0 && (
                  <span className="w-4 h-4 bg-emerald-500 text-[#08120c] rounded-full text-[9px] flex items-center justify-center font-bold font-mono">
                    {totalUnread}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-16 px-4 space-y-2">
            <MessageSquare className="w-10 h-10 text-[#c79e4d]/40 mx-auto" />
            <p className="text-xs font-serif font-semibold text-white">No chats found</p>
            <p className="text-[11px] text-[#9cb0a2] max-w-xs mx-auto font-mono">
              {searchQuery
                ? `No conversation matches "${searchQuery}". Start a new chat!`
                : "No messages in this filter."}
            </p>
            <button
              onClick={onOpenNewChat}
              className="mt-2 px-3.5 py-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Start New Chat
            </button>
          </div>
        ) : (
          filteredConversations.map((c) => {
            const isSelected = c.id === activeConvId;
            const peerName = c.isGroup ? c.groupName : c.peer.name;
            const avatarBg = c.isGroup ? "from-[#deb86d] to-[#996515]" : c.peer.avatarBg;
            const avatarText = c.isGroup ? "結" : c.peer.avatarText;

            return (
              <div
                key={c.id}
                onClick={() => onSelectConversation(c.id)}
                className={`p-3.5 cursor-pointer transition-all flex items-start gap-3 relative group ${
                  isSelected
                    ? "bg-[#c79e4d]/15 border-l-4 border-l-[#c79e4d] backdrop-blur-xs text-white"
                    : "hover:bg-white/[0.05]"
                }`}
              >
                {/* Avatar with Status */}
                <div className="relative shrink-0 mt-0.5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md ring-1 ring-white/15 group-hover:scale-105 transition-transform`}
                  >
                    {avatarText}
                  </div>
                  {c.isOnline && (
                    <span
                      className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#070e0a] rounded-full"
                      title="Active on campus subnet"
                    ></span>
                  )}
                  {c.isGroup && (
                    <span
                      className="absolute -top-1 -right-1 w-4 h-4 bg-[#0b1510] border border-[#c79e4d]/60 text-[#deb86d] rounded-full flex items-center justify-center text-[8px]"
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
                          c.unreadCount > 0 ? "text-white font-extrabold" : "text-[#f5f9f6]"
                        }`}
                      >
                        {peerName}
                      </span>
                      {!c.isGroup && (
                        <span className="text-[9px] font-mono px-1.5 py-0.2 bg-black/25 text-[#deb86d] border border-white/20 rounded shrink-0">
                          {c.peer.department}
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-[#deb86d] shrink-0 font-mono">
                      {c.lastMessageTime}
                    </span>
                  </div>

                  {/* Subnet Tag */}
                  <div className="text-[10px] text-[#9cb0a2] truncate flex items-center gap-1 mb-1 font-mono">
                    <Radio className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="truncate">{c.subnetLocation}</span>
                  </div>

                  {/* Last Message Snippet */}
                  <div className="flex items-center justify-between gap-2">
                    <p
                      className={`text-xs truncate ${
                        c.unreadCount > 0
                          ? "text-white font-semibold"
                          : "text-[#d4e4da]/75"
                      }`}
                    >
                      {c.lastMessage}
                    </p>

                    <div className="flex items-center gap-1 shrink-0">
                      {c.isPinned && (
                        <Pin className="w-3 h-3 text-[#deb86d] fill-[#deb86d] shrink-0" />
                      )}
                      {c.unreadCount > 0 && (
                        <span className="min-w-4.5 h-4.5 px-1 bg-[#c79e4d] text-[#08120c] rounded-full text-[10px] font-bold flex items-center justify-center font-mono shadow-xs">
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
