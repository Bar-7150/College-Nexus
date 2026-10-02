"use client";

import React, { useRef, useState } from "react";
import { StudentProfile, JobStatusInfo } from "@/data/profileData";
import {
  ShieldCheck,
  MapPin,
  Building2,
  Users,
  Briefcase,
  Edit3,
  Share2,
  Check,
  UserPlus,
  Clock,
  Sparkles,
  ChevronDown,
  ExternalLink,
  Send,
  MoreHorizontal,
  Bookmark,
  Award,
  BadgeCheck,
  Camera,
  Loader2,
} from "lucide-react";
import { uploadToCloudinary } from "@/lib/uploadService";

interface ProfileHeaderProps {
  profile: StudentProfile;
  isSelf: boolean;
  onConnectClick: (profile: StudentProfile) => void;
  onMessageClick: (profile: StudentProfile) => void;
  onEditProfileClick: () => void;
  onOpenJobPreferencesClick: () => void;
  onShareProfileClick: () => void;
  isInstitutionVerified?: boolean;
  onOpenVerificationClick?: () => void;
  onAvatarUpload?: (url: string) => void;
}

export default function ProfileHeader({
  profile,
  isSelf,
  onConnectClick,
  onMessageClick,
  onEditProfileClick,
  onOpenJobPreferencesClick,
  onShareProfileClick,
  isInstitutionVerified = false,
  onOpenVerificationClick,
  onAvatarUpload,
}: ProfileHeaderProps) {
  const [openToDropdownOpen, setOpenToDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onAvatarUpload) return;
    setIsUploadingAvatar(true);
    try {
      const res = await uploadToCloudinary(file, { folder: "college-nexus/profiles" });
      if (res.success && res.data?.secure_url) {
        onAvatarUpload(res.data.secure_url);
      }
    } catch (err) {
      console.error("Avatar upload failed:", err);
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  const getStatusBadge = (status: JobStatusInfo["status"]) => {
    switch (status) {
      case "Actively Looking":
        return {
          bg: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40",
          dot: "bg-emerald-400",
          text: "Actively Looking for Opportunities",
        };
      case "Open to Offers":
        return {
          bg: "bg-blue-950/80 text-blue-300 border-blue-500/40",
          dot: "bg-blue-400",
          text: "Open to Internships & Roles",
        };
      case "Placed":
        return {
          bg: "bg-purple-950/80 text-purple-300 border-purple-500/40",
          dot: "bg-purple-400",
          text: "Placed / Upcoming Engineer",
        };
      case "Interning":
        return {
          bg: "bg-amber-950/80 text-amber-300 border-amber-500/40",
          dot: "bg-amber-400",
          text: "Currently Interning",
        };
      default:
        return {
          bg: "bg-black/50 text-[#deb86d] border-white/20",
          dot: "bg-[#deb86d]",
          text: "Focused on Academics",
        };
    }
  };

  const statusBadge = getStatusBadge(profile.jobStatus.status);

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl mb-6 transition-all duration-300 text-white">
      {/* Top Gold Shimmer Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

      {/* Cover / Banner Image */}
      <div
        className={`h-48 sm:h-60 w-full bg-gradient-to-r ${profile.bannerGradient} relative bg-cover bg-center p-4 sm:p-5 flex items-start justify-between shadow-inner`}
        style={profile.bannerUrl ? { backgroundImage: `url(${profile.bannerUrl})` } : undefined}
      >
        <div className="absolute inset-0 bg-[#070e0a]/20 backdrop-blur-[1px] pointer-events-none"></div>

        {/* Campus Seal & Intranet Marker */}
        <div className="flex items-center gap-2 bg-[#070e0a]/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-[#deb86d] text-xs font-mono shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>KGEC INTRANET NODE #{profile.department}</span>
        </div>

        {/* Banner Edit (If Self) / Department Kanji */}
        <div className="flex items-center gap-2 relative z-10">
          <div className="w-8 h-8 rounded-lg bg-[#070e0a]/60 backdrop-blur-md border border-[#c79e4d]/40 text-[#deb86d] flex items-center justify-center font-bold text-sm shadow-md">
            {profile.department === "CSE" ? "計" : profile.department === "ECE" ? "電" : profile.department === "EE" ? "力" : profile.department === "ME" ? "機" : "通"}
          </div>
          {isSelf && (
            <button
              onClick={onEditProfileClick}
              className="p-2 bg-[#070e0a]/60 hover:bg-[#070e0a]/80 backdrop-blur-md text-white rounded-lg transition-colors text-xs flex items-center gap-1.5 border border-white/20 cursor-pointer shadow-md"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#deb86d]" />
              <span className="hidden sm:inline font-mono">Edit Banner</span>
            </button>
          )}
        </div>
      </div>

      {/* Profile Details Container */}
      <div className="px-5 sm:px-8 pb-6 pt-0 relative">
        {/* Avatar Section & Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 sm:-mt-20 mb-4 gap-4">
          {/* Avatar with Open to Work ring */}
          <div className="relative inline-block self-start">
            <div
              className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${profile.avatarBg} text-white font-bold text-3xl sm:text-4xl flex items-center justify-center shadow-2xl border-4 border-[#070e0a]/80 ring-2 ring-[#c79e4d]/70 relative z-10 select-none overflow-hidden`}
            >
              {profile.avatarUrl ? <img src={profile.avatarUrl} alt={`${profile.name} profile`} className="h-full w-full rounded-full object-cover" /> : profile.avatarText}

              {/* Online pulse dot */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-400 border-2 border-[#070e0a] rounded-full"></span>
            </div>

            {/* Direct Camera Button on Avatar for Student Photo Upload */}
            {isSelf && (
              <>
                <input
                  type="file"
                  ref={avatarInputRef}
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarFile}
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  disabled={isUploadingAvatar}
                  className="absolute bottom-1 right-1 z-20 p-2 rounded-full bg-[#070e0a] border-2 border-[#deb86d] text-[#deb86d] hover:bg-[#c79e4d] hover:text-[#08120c] transition-all shadow-xl cursor-pointer disabled:opacity-50"
                  title="Upload profile picture to Cloudinary"
                >
                  {isUploadingAvatar ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Camera className="w-3.5 h-3.5" />
                  )}
                </button>
              </>
            )}

            {/* Open to Work Frame Badge */}
            {profile.jobStatus.isOpenToWork && (
              <div
                onClick={onOpenJobPreferencesClick}
                className="absolute -bottom-2 -left-2 -right-2 z-20 bg-emerald-950/90 text-emerald-300 text-[10px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-full text-center shadow-md cursor-pointer border border-emerald-500/50 flex items-center justify-center gap-1 backdrop-blur-xs font-mono"
                title="Click to view Job / Internship preferences"
              >
                <Briefcase className="w-2.5 h-2.5 text-emerald-400" />
                <span>#OPEN_TO_WORK</span>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2 sm:pt-0">
            {isSelf ? (
              <>
                {/* "Open To" Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setOpenToDropdownOpen(!openToDropdownOpen)}
                    className="px-4 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold font-mono uppercase tracking-wider rounded-xl text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                  >
                    <span>Open To</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {openToDropdownOpen && (
                    <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-64 bg-[#070e0a]/95 backdrop-blur-2xl border border-white/20 sm:border-[#c79e4d]/40 shadow-2xl rounded-2xl p-2 z-50 animate-in fade-in">
                      <div
                        onClick={() => {
                          setOpenToDropdownOpen(false);
                          onOpenJobPreferencesClick();
                        }}
                        className="p-2.5 hover:bg-white/[0.06] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Finding a new job / internship</span>
                        </div>
                        <p className="text-[11px] text-[#8fa597] mt-0.5 font-light">
                          Show recruiters and peers you are open to work
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setOpenToDropdownOpen(false);
                          onEditProfileClick();
                        }}
                        className="p-2.5 hover:bg-white/[0.06] rounded-xl cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#deb86d]" />
                          <span>Mentoring or Project Collabs</span>
                        </div>
                        <p className="text-[11px] text-[#8fa597] mt-0.5 font-light">
                          Offer technical guidance to junior batches
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={onEditProfileClick}
                  className="px-4 py-2 border border-white/20 hover:border-[#c79e4d] bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#deb86d]" />
                  <span>Edit Profile</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={onShareProfileClick}
                  className="p-2 border border-white/20 hover:border-[#c79e4d] bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                  title="Share profile link"
                >
                  <Share2 className="w-4 h-4 text-[#deb86d]" />
                </button>
              </>
            ) : (
              <>
                {/* Connect / Pending / Connected Button */}
                {profile.connectionStatus === "connected" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-emerald-950/80 hover:bg-rose-950/80 text-emerald-300 hover:text-rose-300 border border-emerald-500/40 hover:border-rose-500/40 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Connected</span>
                  </button>
                ) : profile.connectionStatus === "pending" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-[#1b1509]/90 hover:bg-[#251e0c] text-amber-300 border border-amber-500/40 rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Pending</span>
                  </button>
                ) : profile.connectionStatus === "received" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold font-mono uppercase tracking-wider rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Accept Request</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold font-mono uppercase tracking-wider rounded-xl text-xs flex items-center gap-1.5 transition-colors shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                )}

                {/* Message Button */}
                <button
                  onClick={() => onMessageClick(profile)}
                  className="px-4 py-2 border border-white/20 hover:border-[#c79e4d] bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                >
                  <Send className="w-3.5 h-3.5 text-[#deb86d]" />
                  <span>Message</span>
                </button>

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className="p-2 border border-white/20 hover:border-[#c79e4d] bg-white/[0.08] hover:bg-white/[0.14] text-white rounded-xl transition-colors cursor-pointer backdrop-blur-md shadow-xs"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-[#070e0a]/95 backdrop-blur-2xl border border-white/20 sm:border-[#c79e4d]/40 shadow-2xl rounded-2xl p-1.5 z-50 animate-in fade-in">
                      <button
                        onClick={() => {
                          setMoreDropdownOpen(false);
                          onShareProfileClick();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#d4e4da] hover:bg-white/[0.06] rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#deb86d]" />
                        <span>Share Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setMoreDropdownOpen(false);
                          alert(`KGEC verified transcript for ${profile.name} (${profile.rollNumber}) downloaded.`);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-[#d4e4da] hover:bg-white/[0.06] rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-[#deb86d]" />
                        <span>Export Student PDF</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Student Identity & Headline */}
        <div className="space-y-2">
          {/* Name & Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              {profile.name}
            </h1>
            {profile.pronouns && (
              <span className="text-xs text-[#8fa597] font-mono">
                ({profile.pronouns})
              </span>
            )}
                {isInstitutionVerified ? (
                  <span className="flex items-center gap-1 rounded-full border border-emerald-400/40 bg-emerald-950/50 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-emerald-300">
                    <BadgeCheck className="h-3.5 w-3.5" /> Verified
                  </span>
                ) : isSelf && onOpenVerificationClick ? (
                  <button onClick={onOpenVerificationClick} className="rounded-full border border-[#c79e4d]/40 bg-[#070e0a]/70 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-[#deb86d] hover:bg-[#c79e4d]/15">
                    Verify profile
                  </button>
                ) : null}

            {/* Verified Student Seal */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 bg-[#070e0a]/70 text-[#deb86d] border border-[#c79e4d]/40 rounded-full text-[11px] font-mono font-medium shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Roll: {profile.rollNumber}</span>
            </div>

            {/* Department Tag */}
            <span className="text-[11px] px-2.5 py-0.5 bg-white/10 text-white rounded-full font-mono font-medium border border-white/10 shadow-xs">
              {profile.department} · {profile.batchYear}
            </span>
          </div>

          {/* Headline */}
          <p className="text-sm sm:text-base text-[#d4e4da] font-light leading-relaxed max-w-3xl">
            {profile.headline}
          </p>

          {/* Academic & Location Meta */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#8fa597] pt-1">
            <div className="flex items-center gap-1.5 font-medium text-[#cde0d4]">
              <Building2 className="w-3.5 h-3.5 text-[#deb86d]" />
              <span>Kalyani Government Engineering College (MAKAUT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#deb86d]" />
              <span>{profile.location}</span>
            </div>
            <button
              onClick={onShareProfileClick}
              className="text-[#deb86d] hover:text-white font-medium hover:underline cursor-pointer"
            >
              Contact info
            </button>
          </div>

          {/* Connections Stats & Mutual Connections */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#deb86d] font-semibold cursor-pointer hover:underline">
              <Users className="w-4 h-4 text-[#deb86d]" />
              <span>{profile.connectionCount} connections</span>
            </div>
            <span className="text-white/30">•</span>
            <span className="text-[#8fa597]">
              {profile.followerCount.toLocaleString()} followers
            </span>

            {profile.mutualConnections && profile.mutualConnections.length > 0 && (
              <div className="flex items-center gap-1.5 text-[#8fa597] ml-1">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {profile.mutualConnections.map((m, i) => (
                    <div
                      key={i}
                      className="inline-block h-5 w-5 rounded-full ring-2 ring-[#070e0a] bg-white/20 text-[9px] font-bold text-white flex items-center justify-center"
                    >
                      {m.avatar}
                    </div>
                  ))}
                </div>
                <span>
                  {profile.mutualConnections[0].name} and {profile.mutualConnections.length + 31} other mutual connections
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Job Status Banner / Open to Work Widget */}
        <div className="mt-5 p-4 sm:p-5 bg-white/[0.04] hover:bg-white/[0.06] backdrop-blur-xs border border-white/15 sm:border-[#c79e4d]/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-inner transition-colors">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#070e0a]/80 border border-[#c79e4d]/35 text-[#deb86d] shadow-sm">
              <Briefcase className="w-4 h-4 text-[#deb86d]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 font-mono ${statusBadge.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
                  <span>{statusBadge.text}</span>
                </span>
                <span className="text-xs text-[#8fa597] font-mono">
                  {profile.jobStatus.startDate}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-xs text-[#8fa597] font-mono">Target Roles:</span>
                {profile.jobStatus.targetRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 bg-white/10 border border-white/10 rounded text-white font-mono"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenJobPreferencesClick}
            className="text-xs font-mono uppercase tracking-wider font-semibold text-[#deb86d] hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#c79e4d] px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer shadow-xs"
          >
            {isSelf ? "Update Job Status" : "View Hiring Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
