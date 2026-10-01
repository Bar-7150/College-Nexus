"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Briefcase,
  FileText,
  Code2,
  BellOff,
  Award,
  ChevronRight,
  Pin,
} from "lucide-react";
import { Conversation, MessageAttachment } from "@/data/messagingData";

interface PeerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
  onTogglePin?: () => void;
  onOpenPyq?: (attachment: MessageAttachment) => void;
}

export default function PeerSidebar({
  isOpen,
  onClose,
  conversation,
  onTogglePin,
  onOpenPyq,
}: PeerSidebarProps) {
  if (!isOpen) return null;

  const { peer, isGroup, groupName } = conversation;

  // Extract all attachments from this conversation's messages
  const allAttachments: MessageAttachment[] = conversation.messages.reduce(
    (acc, m) => (m.attachments ? [...acc, ...m.attachments] : acc),
    [] as MessageAttachment[]
  );

  return (
    <div className="w-80 lg:w-88 border-l border-white/15 sm:border-[#c79e4d]/25 bg-[#070e0a]/20 sm:bg-[#070e0a]/25 backdrop-blur-xl flex flex-col h-full shrink-0 overflow-y-auto z-20 text-[#d4e4da]">
      {/* Header */}
      <div className="p-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono">
          {isGroup ? "Channel Info" : "Classmate Profile"}
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-white/60 hover:text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Peer Profile Card */}
        <div className="text-center space-y-3 pb-4 border-b border-white/10">
          <div className="relative inline-block">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                isGroup ? "from-[#deb86d] to-[#996515]" : peer.avatarBg
              } text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-md ring-4 ring-[#c79e4d]/30`}
            >
              {isGroup ? "結" : peer.avatarText}
            </div>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-[#070e0a] rounded-full"></span>
            )}
          </div>

          <div>
            <h4 className="text-base font-serif font-bold text-white flex items-center justify-center gap-1.5">
              <span>{isGroup ? groupName : peer.name}</span>
              {!isGroup && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/30 text-[#deb86d] rounded border border-white/20">
                  {peer.department}
                </span>
              )}
            </h4>
            <p className="text-xs text-[#deb86d] font-mono mt-0.5">
              {peer.rollNumber}
            </p>
          </div>

          {/* Subnet Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#070e0a]/40 border border-white/15 rounded-full text-[11px] text-[#9cb0a2] font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="truncate max-w-[200px]">{conversation.subnetLocation}</span>
          </div>

          {/* Job Status Pill */}
          {!isGroup && peer.jobStatus && (
            <div className="pt-1">
              {peer.jobStatus.isOpenToWork ? (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl text-left space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-300 font-mono">
                    <Briefcase className="w-3 h-3 text-emerald-400" />
                    <span>#OPEN_TO_WORK</span>
                  </div>
                  <p className="text-[10px] text-[#a3b899] leading-tight">
                    {peer.jobStatus.targetRoles?.slice(0, 2).join(", ")}
                  </p>
                </div>
              ) : (
                <div className="p-2.5 bg-[#c79e4d]/15 border border-[#c79e4d]/30 rounded-xl text-left space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-[#deb86d] font-mono">
                    <Award className="w-3 h-3 text-[#deb86d]" />
                    <span>{peer.jobStatus.status}: Microsoft SDE</span>
                  </div>
                  <p className="text-[10px] text-[#a3b899] leading-tight font-mono">
                    Campus Placement Confirmed
                  </p>
                </div>
              )}
            </div>
          )}

          {/* View Profile Action Link */}
          {!isGroup && (
            <Link
              href={`/profile`}
              className="w-full py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md"
            >
              <span>View Full Campus Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Headline / About */}
        <div className="space-y-1.5">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#deb86d] font-mono">
            Headline &amp; Role
          </h5>
          <p className="text-xs text-[#dbe7de] leading-relaxed bg-[#070e0a]/30 p-3 rounded-xl border border-white/15">
            {peer.headline}
          </p>
        </div>

        {/* Shared Files & PYQs */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#deb86d] font-mono">
              Shared Media &amp; PYQs ({allAttachments.length})
            </h5>
          </div>

          {allAttachments.length === 0 ? (
            <p className="text-xs text-[#9cb0a2] italic font-mono">
              No files or code snippets shared in this chat yet.
            </p>
          ) : (
            <div className="space-y-2">
              {allAttachments.map((att) => (
                <div
                  key={att.id}
                  onClick={() => onOpenPyq && onOpenPyq(att)}
                  className="p-2.5 bg-[#070e0a]/30 hover:bg-white/[0.08] border border-white/15 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-2 group backdrop-blur-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/30 flex items-center justify-center shrink-0">
                      {att.type === "code" ? (
                        <Code2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <FileText className="w-4 h-4 text-[#deb86d]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-white truncate group-hover:text-[#deb86d]">
                        {att.title}
                      </p>
                      <p className="text-[10px] text-[#9cb0a2] truncate font-mono">
                        {att.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-white/40 group-hover:text-[#deb86d] transition-colors shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Options */}
        <div className="pt-2 border-t border-white/10 space-y-1.5">
          <button
            onClick={onTogglePin}
            className="w-full px-3 py-2 text-left text-xs font-mono font-semibold text-[#d4e4da] hover:bg-white/10 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Pin
              className={`w-4 h-4 ${
                conversation.isPinned ? "text-[#deb86d] fill-[#deb86d]" : "text-white/40"
              }`}
            />
            <span>{conversation.isPinned ? "Unpin Conversation" : "Pin Conversation to Top"}</span>
          </button>

          <button className="w-full px-3 py-2 text-left text-xs font-mono font-semibold text-[#d4e4da] hover:bg-white/10 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer">
            <BellOff className="w-4 h-4 text-white/40" />
            <span>Mute Intranet Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
}
