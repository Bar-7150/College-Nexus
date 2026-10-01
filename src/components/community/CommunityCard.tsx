"use client";

import React from "react";
import { Community } from "@/data/communityData";
import {
  Users,
  CheckCircle,
  Shield,
  ArrowRight,
  Pin,
  Check,
  Plus,
} from "lucide-react";

interface CommunityCardProps {
  community: Community;
  onSelect: (community: Community) => void;
  onToggleJoin: (communityId: string) => void;
}

export default function CommunityCard({
  community,
  onSelect,
  onToggleJoin,
}: CommunityCardProps) {
  const latestAnnouncement = community.announcements[0];
  const postCount = community.posts.length;

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/15 hover:bg-[#070e0a]/25 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300">
      {/* Top Gold Shimmer Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

      {/* Ambient Radial Hover Glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#c79e4d]/20 transition-all duration-700"></div>

      {/* Decorative Monogram Watermark (Faint artistic depth) */}
      <div className="absolute -right-3 -bottom-4 text-7xl opacity-[0.06] pointer-events-none select-none font-bold group-hover:scale-110 group-hover:opacity-[0.12] transition-transform duration-700">
        {community.emblem}
      </div>

      <div className="relative z-10">
        {/* Top Badges Strip: Category, Verification & Live Pulse */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] font-mono tracking-wider text-[#deb86d] uppercase font-bold px-2.5 py-0.5 bg-black/25 backdrop-blur-xs rounded-full border border-white/20">
              {community.category}
            </span>
            {community.isVerified && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-950/40 text-emerald-300 text-[9px] font-mono font-semibold rounded-full border border-emerald-500/30 backdrop-blur-xs"
                title="Officially Recognized by KGEC Student Affairs"
              >
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>Official</span>
              </span>
            )}
            {community.isPrivate && (
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-950/40 text-amber-300 text-[9px] font-mono font-semibold rounded-full border border-amber-500/30 backdrop-blur-xs"
                title="Roll Number Verification Required"
              >
                <Shield className="w-3 h-3 text-amber-400" />
                <span>Roll Auth</span>
              </span>
            )}
          </div>

          {/* Live Radar Pulse Indicator */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#9cb0a2] bg-black/25 px-2.5 py-0.5 rounded-full border border-white/15 font-mono backdrop-blur-xs shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-white">{community.activeCount}</span>
            <span className="text-[#8fa597]">online</span>
          </div>
        </div>

        {/* Emblem & Title */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/25 text-[#deb86d] group-hover:scale-105 flex items-center justify-center text-2xl transition-transform shadow-xs backdrop-blur-xs shrink-0">
            <span>{community.emblem}</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              onClick={() => onSelect(community)}
              className="text-lg sm:text-xl font-serif font-bold text-white group-hover:text-[#deb86d] transition-colors cursor-pointer leading-snug drop-shadow-md line-clamp-2"
            >
              {community.name}
            </h3>
            <span className="text-[11px] font-mono text-[#deb86d] block truncate">
              {community.shortName} // KGEC
            </span>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-xs text-[#dbe7de] leading-relaxed mb-4 font-normal drop-shadow-xs line-clamp-2">
          {community.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {community.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 bg-white/5 text-[#deb86d] rounded border border-white/15"
            >
              #{tag}
            </span>
          ))}
          {community.tags.length > 3 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#8fa597]">
              +{community.tags.length - 3}
            </span>
          )}
        </div>

        {/* Institutional Notice Memo Snippet (if present) */}
        {latestAnnouncement && (
          <div className="p-3 rounded-xl bg-white/[0.04] border border-white/15 border-l-2 border-l-[#c79e4d] mb-4 text-xs backdrop-blur-xs">
            <div className="flex items-center justify-between text-[10px] font-bold text-[#deb86d] uppercase font-mono mb-1">
              <span className="flex items-center gap-1">
                <Pin className="w-3 h-3 text-[#c79e4d]" />
                <span>Notice Memo</span>
              </span>
              <span className="text-[#8fa597] font-normal">{latestAnnouncement.date}</span>
            </div>
            <p className="text-[#e2ede5] font-medium line-clamp-1 leading-snug">
              {latestAnnouncement.title}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Metrics & Actions */}
      <div className="pt-4 border-t border-white/15 mt-4 relative z-10">
        <div className="flex items-center justify-between text-xs text-[#9cb0a2] mb-3 font-mono">
          <span className="flex items-center gap-1.5 text-[11px]">
            <Users className="w-3.5 h-3.5 text-[#deb86d]" />
            <span><strong className="text-white font-medium">{community.memberCount}</strong> KGECians</span>
          </span>
          <span className="text-[11px] text-[#8fa597]">
            {postCount} discussions
          </span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onToggleJoin(community.id)}
            className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer font-mono uppercase tracking-wider backdrop-blur-xs ${
              community.isJoined
                ? "bg-emerald-950/40 hover:bg-rose-950/60 text-emerald-300 hover:text-rose-300 border border-emerald-500/40 hover:border-rose-500/40 group/btn"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/25"
            }`}
          >
            {community.isJoined ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400 group-hover/btn:hidden" />
                <span className="group-hover/btn:hidden">Joined</span>
                <span className="hidden group-hover/btn:inline">Leave</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Join</span>
              </>
            )}
          </button>

          <button
            onClick={() => onSelect(community)}
            className="py-2 px-3 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold rounded-xl text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
          >
            <span>Enter Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
