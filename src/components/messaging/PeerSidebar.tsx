"use client";

import React from "react";
import Link from "next/link";
import {
  X,
  ExternalLink,
  Briefcase,
  MapPin,
  FileText,
  Code2,
  BellOff,
  Star,
  ShieldCheck,
  Award,
  BookOpen,
  Users,
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
    <div className="w-80 lg:w-88 border-l border-slate-200/90 bg-white flex flex-col h-full shrink-0 overflow-y-auto z-20">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          {isGroup ? "Channel Info" : "Classmate Profile"}
        </h3>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5 space-y-6">
        {/* Peer Profile Card */}
        <div className="text-center space-y-3 pb-4 border-b border-slate-100">
          <div className="relative inline-block">
            <div
              className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${
                isGroup ? "from-red-600 to-red-800" : peer.avatarBg
              } text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-md ring-4 ring-slate-50`}
            >
              {isGroup ? "結" : peer.avatarText}
            </div>
            {conversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 flex items-center justify-center gap-1.5">
              <span>{isGroup ? groupName : peer.name}</span>
              {!isGroup && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-red-50 text-red-600 rounded border border-red-100">
                  {peer.department}
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              {peer.rollNumber}
            </p>
          </div>

          {/* Subnet Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-200/80 rounded-full text-[11px] text-slate-600 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="truncate max-w-[200px]">{conversation.subnetLocation}</span>
          </div>

          {/* Job Status Pill */}
          {!isGroup && peer.jobStatus && (
            <div className="pt-1">
              {peer.jobStatus.isOpenToWork ? (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-left space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                    <Briefcase className="w-3 h-3 text-emerald-600" />
                    <span>#OPEN_TO_WORK</span>
                  </div>
                  <p className="text-[10px] text-emerald-700 leading-tight">
                    {peer.jobStatus.targetRoles?.slice(0, 2).join(", ")}
                  </p>
                </div>
              ) : (
                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-xl text-left space-y-1">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-blue-800">
                    <Award className="w-3 h-3 text-blue-600" />
                    <span>{peer.jobStatus.status}: Microsoft SDE</span>
                  </div>
                  <p className="text-[10px] text-blue-700 leading-tight">
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
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>View Full Campus Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* Headline / About */}
        <div className="space-y-1.5">
          <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            Headline & Role
          </h5>
          <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
            {peer.headline}
          </p>
        </div>

        {/* Shared Files & PYQs */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
              Shared Media & PYQs ({allAttachments.length})
            </h5>
          </div>

          {allAttachments.length === 0 ? (
            <p className="text-xs text-slate-400 italic">
              No files or code snippets shared in this chat yet.
            </p>
          ) : (
            <div className="space-y-2">
              {allAttachments.map((att) => (
                <div
                  key={att.id}
                  onClick={() => onOpenPyq && onOpenPyq(att)}
                  className="p-2.5 bg-slate-50 hover:bg-red-50/50 border border-slate-200 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-2 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 shrink-0">
                      {att.type === "code" ? (
                        <Code2 className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <FileText className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate group-hover:text-red-700">
                        {att.title}
                      </p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {att.subtitle}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600 transition-colors shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Options */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <button
            onClick={onTogglePin}
            className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer"
          >
            <Pin
              className={`w-4 h-4 ${
                conversation.isPinned ? "text-red-600 fill-red-600" : "text-slate-400"
              }`}
            />
            <span>{conversation.isPinned ? "Unpin Conversation" : "Pin Conversation to Top"}</span>
          </button>

          <button className="w-full px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 transition-colors cursor-pointer">
            <BellOff className="w-4 h-4 text-slate-400" />
            <span>Mute Intranet Notifications</span>
          </button>
        </div>
      </div>
    </div>
  );
}
