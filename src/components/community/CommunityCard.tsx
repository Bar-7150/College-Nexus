"use client";

import React from "react";
import { Community } from "@/data/communityData";
import {
  Users,
  CheckCircle,
  Shield,
  ArrowRight,
  Sparkles,
  MessageSquare,
  FileText,
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
  const resourceCount = community.resources.length;

  return (
    <div className="group relative bg-white border border-slate-200/90 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
      {/* Top Banner Gradient */}
      <div
        className={`h-24 bg-gradient-to-r ${community.bannerGradient} relative p-3 flex items-start justify-between text-white overflow-hidden`}
      >
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]"></div>
        <div className="absolute -right-4 -bottom-6 text-7xl opacity-20 pointer-events-none select-none font-bold">
          {community.emblem}
        </div>

        {/* Category Badge */}
        <div className="relative z-10 flex items-center gap-1.5 px-2.5 py-1 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold text-white/95 border border-white/20">
          <span>{community.category}</span>
        </div>

        {/* Verification and Privacy Status */}
        <div className="relative z-10 flex items-center gap-1.5">
          {community.isVerified && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-semibold rounded-full border border-emerald-400/40"
              title="Officially Recognized by KGEC Student Affairs"
            >
              <CheckCircle className="w-3 h-3" />
              <span>Official</span>
            </span>
          )}
          {community.isPrivate && (
            <span
              className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500/80 backdrop-blur-md text-white text-[10px] font-semibold rounded-full border border-amber-400/40"
              title="Roll Number Verification Required"
            >
              <Shield className="w-3 h-3" />
              <span>Roll Auth</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Header Info with Emblem & Online Pulse */}
          <div className="flex items-start justify-between gap-3 -mt-9 mb-3 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-white shadow-md border-2 border-white flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shrink-0">
              <span>{community.emblem}</span>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-700">{community.activeCount}</span>
              <span className="text-slate-400">online</span>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="mb-2">
            <h3
              onClick={() => onSelect(community)}
              className="text-lg font-bold text-slate-900 font-heading hover:text-red-600 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>{community.name}</span>
            </h3>
            <p className="text-xs text-slate-600 font-medium line-clamp-2 mt-0.5 leading-relaxed">
              {community.tagline}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {community.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 hover:bg-slate-200/80 text-slate-600 rounded-md transition-colors"
              >
                #{tag}
              </span>
            ))}
            {community.tags.length > 3 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 text-slate-400">
                +{community.tags.length - 3}
              </span>
            )}
          </div>

          {/* Pinned announcement snippet if any */}
          {latestAnnouncement && (
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-4 text-xs">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-600 uppercase font-mono mb-1">
                <Pin className="w-3 h-3" />
                <span>Notice: {latestAnnouncement.date}</span>
              </div>
              <p className="text-slate-700 font-medium line-clamp-1 leading-snug">
                {latestAnnouncement.title}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Metrics & Actions */}
        <div className="pt-3 border-t border-slate-100 mt-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <strong className="text-slate-800">{community.memberCount}</strong> KGECians
            </span>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-slate-400" />
                <span>{postCount}</span>
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3 h-3 text-slate-400" />
                <span>{resourceCount}</span>
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onToggleJoin(community.id)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                community.isJoined
                  ? "bg-emerald-50 hover:bg-red-50 text-emerald-700 hover:text-red-700 border border-emerald-200 hover:border-red-200 group/btn"
                  : "bg-slate-900 hover:bg-black text-white shadow-2xs"
              }`}
            >
              {community.isJoined ? (
                <>
                  <Check className="w-3.5 h-3.5 group-hover/btn:hidden" />
                  <span className="group-hover/btn:hidden">Joined</span>
                  <span className="hidden group-hover/btn:inline">Leave</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Join Guild</span>
                </>
              )}
            </button>

            <button
              onClick={() => onSelect(community)}
              className="py-2 px-3 bg-red-50 hover:bg-red-600 text-red-600 hover:text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-red-200/80 hover:border-red-600"
            >
              <span>Enter Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
