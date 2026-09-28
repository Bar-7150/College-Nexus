"use client";

import React, { useState } from "react";
import {
  StudentProfile,
  JobStatusInfo,
} from "@/data/profileData";
import {
  ShieldCheck,
  MapPin,
  Building2,
  Users,
  UserPlus,
  Clock,
  Check,
  Send,
  MoreHorizontal,
  Edit3,
  Share2,
  Sparkles,
  Briefcase,
  ChevronDown,
  ExternalLink,
  GraduationCap,
  Award,
  Flame,
} from "lucide-react";

interface ProfileHeaderProps {
  profile: StudentProfile;
  isSelf: boolean;
  onConnectClick: (profile: StudentProfile) => void;
  onMessageClick: (profile: StudentProfile) => void;
  onEditProfileClick: () => void;
  onOpenJobPreferencesClick: () => void;
  onShareProfileClick: () => void;
}

export default function ProfileHeader({
  profile,
  isSelf,
  onConnectClick,
  onMessageClick,
  onEditProfileClick,
  onOpenJobPreferencesClick,
  onShareProfileClick,
}: ProfileHeaderProps) {
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [openToDropdownOpen, setOpenToDropdownOpen] = useState(false);

  const getStatusBadge = (status: JobStatusInfo["status"]) => {
    switch (status) {
      case "Actively Looking":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
          dot: "bg-emerald-500",
          text: "Actively Looking for Opportunities",
        };
      case "Open to Offers":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200",
          dot: "bg-blue-500",
          text: "Open to Internships & Roles",
        };
      case "Placed":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
          text: "Placed / Upcoming Engineer",
        };
      case "Interning":
        return {
          bg: "bg-amber-50 text-amber-700 border-amber-200",
          dot: "bg-amber-500",
          text: "Currently Interning",
        };
      default:
        return {
          bg: "bg-slate-50 text-slate-700 border-slate-200",
          dot: "bg-slate-400",
          text: "Focused on Academics",
        };
    }
  };

  const statusBadge = getStatusBadge(profile.jobStatus.status);

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden relative mb-6">
      {/* Cover / Banner Image */}
      <div
        className={`h-48 sm:h-60 w-full bg-gradient-to-r ${profile.bannerGradient} relative p-4 sm:p-5 flex items-start justify-between shadow-inner`}
      >
        <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none"></div>

        {/* Campus Seal & Intranet Marker */}
        <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-white text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>KGEC INTRANET NODE #{profile.department}</span>
        </div>

        {/* Banner Edit (If Self) / Department Kanji */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center font-bold text-sm">
            {profile.department === "CSE" ? "計" : profile.department === "ECE" ? "電" : profile.department === "EE" ? "力" : profile.department === "ME" ? "機" : "通"}
          </div>
          {isSelf && (
            <button
              onClick={onEditProfileClick}
              className="p-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white rounded-lg transition-colors text-xs flex items-center gap-1.5 border border-white/20"
              title="Edit Profile"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Banner</span>
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
              className={`w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br ${profile.avatarBg} text-white font-bold text-3xl sm:text-4xl flex items-center justify-center shadow-lg border-4 border-white relative z-10 transition-transform hover:scale-105 select-none`}
            >
              {profile.avatarText}

              {/* Online pulse dot */}
              <span className="absolute bottom-2 right-2 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>

            {/* Open to Work Frame Badge */}
            {profile.jobStatus.isOpenToWork && (
              <div
                onClick={onOpenJobPreferencesClick}
                className="absolute -bottom-2 -left-2 -right-2 z-20 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold tracking-wider uppercase py-0.5 px-2 rounded-full text-center shadow-sm cursor-pointer border border-white flex items-center justify-center gap-1"
                title="Click to view Job / Internship preferences"
              >
                <Briefcase className="w-2.5 h-2.5" />
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
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <span>Open To</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {openToDropdownOpen && (
                    <div className="absolute right-0 sm:left-0 top-full mt-1.5 w-64 bg-white border border-slate-200 shadow-xl rounded-xl p-2 z-50 animate-in fade-in">
                      <div
                        onClick={() => {
                          setOpenToDropdownOpen(false);
                          onOpenJobPreferencesClick();
                        }}
                        className="p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Finding a new job / internship</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Show recruiters and peers you are open to work
                        </p>
                      </div>
                      <div
                        onClick={() => {
                          setOpenToDropdownOpen(false);
                          onEditProfileClick();
                        }}
                        className="p-2.5 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Mentoring or Project Collabs</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Offer technical guidance to junior batches
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={onEditProfileClick}
                  className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-slate-600" />
                  <span>Edit Profile</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={onShareProfileClick}
                  className="p-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  title="Share profile link"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                {/* Connect / Pending / Connected Button */}
                {profile.connectionStatus === "connected" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Connected</span>
                  </button>
                ) : profile.connectionStatus === "pending" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Pending (Withdraw)</span>
                  </button>
                ) : profile.connectionStatus === "received" ? (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Accept Request</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onConnectClick(profile)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Connect</span>
                  </button>
                )}

                {/* Message Button */}
                <button
                  onClick={() => onMessageClick(profile)}
                  className="px-4 py-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-slate-600" />
                  <span>Message</span>
                </button>

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                    className="p-2 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 rounded-xl transition-colors cursor-pointer"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {moreDropdownOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-48 bg-white border border-slate-200 shadow-xl rounded-xl p-1.5 z-50 animate-in fade-in">
                      <button
                        onClick={() => {
                          setMoreDropdownOpen(false);
                          onShareProfileClick();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                      >
                        <Share2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>Share Profile</span>
                      </button>
                      <button
                        onClick={() => {
                          setMoreDropdownOpen(false);
                          alert(`KGEC verified transcript for ${profile.name} (${profile.rollNumber}) downloaded.`);
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
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
            <h1 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 tracking-tight">
              {profile.name}
            </h1>
            {profile.pronouns && (
              <span className="text-xs text-slate-500 font-sans">
                ({profile.pronouns})
              </span>
            )}

            {/* Verified Student Seal */}
            <div className="flex items-center gap-1 px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded-full text-[11px] font-mono font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Roll: {profile.rollNumber}</span>
            </div>

            {/* Department Tag */}
            <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-full font-medium">
              {profile.department} · {profile.batchYear}
            </span>
          </div>

          {/* Headline */}
          <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed max-w-3xl">
            {profile.headline}
          </p>

          {/* Academic & Location Meta */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-slate-400" />
              <span>Kalyani Government Engineering College (MAKAUT)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{profile.location}</span>
            </div>
            <button
              onClick={onShareProfileClick}
              className="text-red-600 hover:text-red-700 font-medium hover:underline"
            >
              Contact info
            </button>
          </div>

          {/* Connections Stats & Mutual Connections */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-red-600 font-semibold cursor-pointer hover:underline">
              <Users className="w-4 h-4" />
              <span>{profile.connectionCount} connections</span>
            </div>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600">
              {profile.followerCount.toLocaleString()} followers
            </span>

            {profile.mutualConnections && profile.mutualConnections.length > 0 && (
              <div className="flex items-center gap-1.5 text-slate-500 ml-1">
                <div className="flex -space-x-1.5 overflow-hidden">
                  {profile.mutualConnections.map((m, i) => (
                    <div
                      key={i}
                      className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-slate-200 text-[9px] font-bold text-slate-700 flex items-center justify-center"
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
        <div className="mt-5 p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 shadow-xs">
              <Briefcase className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1.5 ${statusBadge.bg}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${statusBadge.dot}`}></span>
                  <span>{statusBadge.text}</span>
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {profile.jobStatus.startDate}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                <span className="text-xs text-slate-600 font-medium">Target Roles:</span>
                {profile.jobStatus.targetRoles.map((role, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-medium"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={onOpenJobPreferencesClick}
            className="text-xs font-semibold text-red-600 hover:text-red-700 bg-white hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
          >
            {isSelf ? "Update Job Status" : "View Hiring Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
