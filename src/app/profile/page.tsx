"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import ProfileHeader from "@/components/profile/ProfileHeader";
import AchievementsFeed from "@/components/profile/AchievementsFeed";
import ExperienceSection from "@/components/profile/ExperienceSection";
import EducationSection from "@/components/profile/EducationSection";
import SkillsSection from "@/components/profile/SkillsSection";
import NetworkHub from "@/components/profile/NetworkHub";
import JobStatusModal from "@/components/profile/JobStatusModal";
import MessageModal from "@/components/profile/MessageModal";
import ConnectNoteModal from "@/components/profile/ConnectNoteModal";
import EditProfileModal from "@/components/profile/EditProfileModal";
import VerificationModal from "@/components/profile/VerificationModal";
import {
  INITIAL_PROFILES,
  INITIAL_CONNECTION_REQUESTS,
  StudentProfile,
  AchievementPost,
  JobStatusInfo,
  ExperienceItem,
  EducationItem,
  SkillItem,
  ConnectionRequestItem,
} from "@/data/profileData";
import {
  Users,
  UserCheck,
  TrendingUp,
  Eye,
  Award,
  Sparkles,
  ShieldCheck,
  Briefcase,
  ArrowLeft,
  ChevronRight,
  Bookmark,
  Share2,
  ExternalLink,
  Flame,
  CheckCircle,
  Bell,
  Search,
} from "lucide-react";

function createEmptyProfile(): StudentProfile {
  return {
    id: "current-user",
    name: "Student",
    rollNumber: "",
    department: "CSE",
    batchYear: "",
    semester: 0,
    headline: "Add a headline to introduce yourself.",
    pronouns: "",
    location: "",
    avatarText: "ST",
    avatarBg: "from-[#38513f] to-[#172b20]",
    bannerGradient: "from-[#0b1510] via-[#183323] to-[#3b2d12]",
    jobStatus: { status: "Researching", targetRoles: [], preferredLocations: [], jobTypes: [], startDate: "", isOpenToWork: false },
    about: "",
    connectionCount: 0,
    followerCount: 0,
    mutualConnections: [],
    connectionStatus: "self",
    education: [],
    experience: [],
    achievements: [],
    skills: [],
    certifications: [],
    stats: { profileViews: 0, postImpressions: 0, searchAppearances: 0 },
  };
}

export default function ProfilePage() {
  const [profiles, setProfiles] = useState<StudentProfile[]>(() => INITIAL_PROFILES.length ? INITIAL_PROFILES : [createEmptyProfile()]);
  const [currentUserId, setCurrentUserId] = useState<string>("arjun-sen");
  const [viewedProfileId, setViewedProfileId] = useState<string>("arjun-sen");
  const [activeTab, setActiveTab] = useState<"profile" | "network">("profile");

  // Connection Requests
  const [receivedRequests, setReceivedRequests] = useState<ConnectionRequestItem[]>(
    INITIAL_CONNECTION_REQUESTS
  );
  const [sentRequests, setSentRequests] = useState<string[]>([]);

  // Modals state
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [connectNoteModalOpen, setConnectNoteModalOpen] = useState(false);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [verificationModalOpen, setVerificationModalOpen] = useState(false);
  const [verifiedProfileIds, setVerifiedProfileIds] = useState<string[]>([]);
  const [targetPeer, setTargetPeer] = useState<StudentProfile | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const { profile: authUser } = useAuth();

  const rawCurrentUser =
    profiles.find((p) => p.id === currentUserId) || profiles[0] || createEmptyProfile();
  const currentLoggedInUser: StudentProfile = authUser
    ? {
        ...rawCurrentUser,
        name: authUser.name,
        rollNumber: authUser.rollNumber,
        department: (["CSE", "ECE", "EE", "ME", "IT"].includes(authUser.department)
          ? authUser.department
          : rawCurrentUser.department) as any,
        batchYear: authUser.batchYear || rawCurrentUser.batchYear,
        avatarText: authUser.avatarText || rawCurrentUser.avatarText,
      }
    : rawCurrentUser;

  const rawActiveProfile =
    profiles.find((p) => p.id === viewedProfileId) || rawCurrentUser;
  const activeProfile: StudentProfile =
    viewedProfileId === currentUserId ? currentLoggedInUser : rawActiveProfile;
  const isViewingSelf = viewedProfileId === currentUserId;

  // Handle Connect Button Click
  const handleConnectClick = (profile: StudentProfile) => {
    if (profile.id === currentUserId) return;

    if (profile.connectionStatus === "connected") {
      // Disconnect
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profile.id
            ? { ...p, connectionStatus: "none", connectionCount: Math.max(0, p.connectionCount - 1) }
            : p
        )
      );
      showToast(`Disconnected from ${profile.name}`);
    } else if (profile.connectionStatus === "pending") {
      // Withdraw
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profile.id ? { ...p, connectionStatus: "none" } : p
        )
      );
      setSentRequests((prev) => prev.filter((id) => id !== profile.id));
      showToast(`Connection invitation to ${profile.name} withdrawn.`);
    } else if (profile.connectionStatus === "received") {
      // Accept
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profile.id
            ? { ...p, connectionStatus: "connected", connectionCount: p.connectionCount + 1 }
            : p
        )
      );
      setReceivedRequests((prev) => prev.filter((r) => r.senderId !== profile.id));
      showToast(`You and ${profile.name} are now connected! 🎉`);
    } else {
      // Open Personalized Note Modal
      setTargetPeer(profile);
      setConnectNoteModalOpen(true);
    }
  };

  // Confirm sending connection invitation
  const handleConfirmSendInvitation = (note?: string) => {
    if (!targetPeer) return;
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === targetPeer.id ? { ...p, connectionStatus: "pending" } : p
      )
    );
    setSentRequests((prev) => [...prev, targetPeer.id]);
    showToast(
      note
        ? `Personalized invitation sent to ${targetPeer.name} with your note!`
        : `Connection invitation sent to ${targetPeer.name}!`
    );
  };

  // Accept request from Network tab
  const handleAcceptRequest = (reqId: string, senderId: string) => {
    const sender = profiles.find((p) => p.id === senderId);
    setReceivedRequests((prev) => prev.filter((r) => r.id !== reqId));
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === senderId
          ? { ...p, connectionStatus: "connected", connectionCount: p.connectionCount + 1 }
          : p
      )
    );
    showToast(`Connected with ${sender?.name || "classmate"}!`);
  };

  // Ignore request
  const handleIgnoreRequest = (reqId: string) => {
    setReceivedRequests((prev) => prev.filter((r) => r.id !== reqId));
    showToast("Connection request dismissed.");
  };

  // Add new achievement post
  const handleAddPost = (
    newPost: Omit<AchievementPost, "id" | "reactions" | "comments" | "shares">
  ) => {
    const post: AchievementPost = {
      ...newPost,
      id: `post-${Date.now()}`,
      reactions: { like: 0, celebrate: 0, insightful: 0 },
      userReaction: null,
      comments: [],
      shares: 0,
    };

    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id
          ? {
              ...p,
              achievements: [post, ...p.achievements],
            }
          : p
      )
    );

    showToast("Your achievement post has been published to the campus feed! 🚀");
  };

  // Reaction on post
  const handleReaction = (
    postId: string,
    reactionType: "like" | "celebrate" | "insightful"
  ) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        achievements: p.achievements.map((post) => {
          if (post.id !== postId) return post;

          const currentReaction = post.userReaction;
          const reactions = { ...post.reactions };

          if (currentReaction === reactionType) {
            // Un-react
            reactions[reactionType] = Math.max(0, reactions[reactionType] - 1);
            return { ...post, userReaction: null, reactions };
          } else {
            // New reaction or switch
            if (currentReaction) {
              reactions[currentReaction] = Math.max(0, reactions[currentReaction] - 1);
            }
            reactions[reactionType] = (reactions[reactionType] || 0) + 1;
            return { ...post, userReaction: reactionType, reactions };
          }
        }),
      }))
    );
  };

  // Add Comment on post
  const handleAddComment = (postId: string, commentText: string) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: currentLoggedInUser.name,
      authorRoll: currentLoggedInUser.rollNumber,
      authorAvatar: currentLoggedInUser.avatarText,
      authorHeadline: currentLoggedInUser.headline,
      content: commentText,
      timestamp: "Just now",
      likes: 0,
    };

    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        achievements: p.achievements.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        ),
      }))
    );

    showToast("Comment added to achievement!");
  };

  // Share post
  const handleSharePost = (postId: string) => {
    setProfiles((prev) =>
      prev.map((p) => ({
        ...p,
        achievements: p.achievements.map((post) =>
          post.id === postId ? { ...post, shares: post.shares + 1 } : post
        ),
      }))
    );
    showToast("Post link copied to clipboard & shared to campus stream!");
  };

  // Endorse Skill
  const handleEndorseSkill = (skillId: string) => {
    setProfiles((prev) =>
      prev.map((p) => {
        if (p.id !== viewedProfileId) return p;
        return {
          ...p,
          skills: p.skills.map((s) => {
            if (s.id !== skillId) return s;
            const hasEndorsed = !s.hasEndorsed;
            const endorsements = hasEndorsed
              ? s.endorsements + 1
              : Math.max(0, s.endorsements - 1);
            return { ...s, endorsements, hasEndorsed };
          }),
        };
      })
    );
    showToast(`You updated skill endorsement for ${activeProfile.name}!`);
  };

  // Add Skill
  const handleAddSkill = (skill: SkillItem) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id
          ? { ...p, skills: [...p.skills, skill] }
          : p
      )
    );
    showToast(`Skill "${skill.name}" added to profile.`);
  };

  // Add Experience
  const handleAddExperience = (item: ExperienceItem) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id
          ? { ...p, experience: [item, ...p.experience] }
          : p
      )
    );
    showToast("Experience item added to profile.");
  };

  // Add Education
  const handleAddEducation = (item: EducationItem) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id
          ? { ...p, education: [item, ...p.education] }
          : p
      )
    );
    showToast("Academic credentials updated.");
  };

  // Update Job Status
  const handleUpdateJobStatus = (newJobStatus: JobStatusInfo) => {
    setProfiles((prev) =>
      prev.map((p) =>
        p.id === activeProfile.id ? { ...p, jobStatus: newJobStatus } : p
      )
    );
    showToast("Career & Job Status preferences saved!");
  };

  // Update Profile details
  const handleSaveProfile = (updated: Partial<StudentProfile>) => {
    setProfiles((prev) =>
      prev.some((p) => p.id === activeProfile.id)
        ? prev.map((p) => p.id === activeProfile.id ? { ...p, ...updated } : p)
        : [...prev, { ...activeProfile, ...updated }]
    );
    showToast("Profile details updated successfully!");
  };

  return (
    <AuthGuard
      resourceName="KGEC Student Profiles & Network Hub"
      resourceDescription="Access to student intranet dossiers, Makaut verified roll credentials, peer endorsements, and recruitment feeds requires an authenticated KGEC student account."
    >
      <main className="min-h-screen bg-[#070e0a] text-[#f5f9f6] relative selection:bg-[#c79e4d] selection:text-[#0b1510] flex flex-col justify-between overflow-x-hidden">
      {/* Global Fixed Campus Background with cross-fades matching home page */}
      <FixedCampusBackground />

      {/* Primary Site Floating Navbar */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Profile Switcher & Secondary Sub-Nav Bar (Clean clearance below floating navbar) */}
      <div className="pt-24 sm:pt-28 md:pt-[102px] relative z-20">
        <div className="py-3.5 bg-[#070e0a]/25 backdrop-blur-xl border-b border-white/20 sm:border-[#c79e4d]/35 relative">
          {/* Top Gold Shimmer Highlight Bar */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#deb86d]/30 to-transparent pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Breadcrumb / Section Label */}
            <div className="flex items-center gap-2 text-xs">
              <Link
                href="/"
                className="text-[#a4b8ab] hover:text-[#deb86d] transition-colors flex items-center gap-1 font-mono uppercase tracking-wider text-[11px]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Campus Intranet</span>
              </Link>
              <span className="text-white/20">/</span>
              <span className="font-bold text-[#deb86d] uppercase tracking-wider font-mono text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#deb86d]" />
                <span>Student Network & Profiles</span>
              </span>
            </div>

            {/* Top Controls: Profile Switcher & Tabs */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Tab Toggle: Profile View vs Network Directory */}
              <div className="flex items-center bg-[#070e0a]/40 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 p-1 rounded-xl text-xs font-mono uppercase tracking-wider shadow-inner">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "profile"
                      ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                      : "text-[#dbe7df] hover:text-[#deb86d]"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Profile View</span>
                </button>

                <button
                  onClick={() => setActiveTab("network")}
                  className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "network"
                      ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                      : "text-[#dbe7df] hover:text-[#deb86d]"
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Campus Network ({profiles.length})</span>
                  {receivedRequests.length > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-ping"></span>
                  )}
                </button>
              </div>

              {/* Profile Switcher Dropdown (To test viewing different students) */}
              <div className="flex items-center gap-2 bg-[#070e0a]/40 backdrop-blur-md border border-white/20 hover:border-[#c79e4d]/40 px-3 py-1.5 rounded-xl text-xs font-mono shadow-inner transition-colors">
                <span className="text-[#8fa597] hidden sm:inline">
                  Viewing:
                </span>
                <select
                  value={viewedProfileId}
                  onChange={(e) => {
                    setViewedProfileId(e.target.value);
                    setActiveTab("profile");
                  }}
                  className="bg-transparent text-[#deb86d] font-bold focus:outline-none cursor-pointer"
                >
                  {profiles.map((p) => (
                    <option key={p.id} value={p.id} className="bg-[#070e0a] text-white">
                      {p.name} {p.id === currentUserId ? "(You - CSE)" : `(${p.department})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div id="heritage" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 w-full">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-[#070e0a]/95 backdrop-blur-xl text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-[#c79e4d]/50 flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Tab 1: CAMPUS NETWORK & INVITATIONS */}
        {activeTab === "network" ? (
          <div id="explorer">
            <NetworkHub
              profiles={profiles}
              currentProfile={currentLoggedInUser}
              receivedRequests={receivedRequests}
              sentRequests={sentRequests}
              onAcceptRequest={handleAcceptRequest}
              onIgnoreRequest={handleIgnoreRequest}
              onConnectClick={handleConnectClick}
              onSelectProfile={(p) => {
                setViewedProfileId(p.id);
                setActiveTab("profile");
              }}
              onMessageClick={(p) => {
                setTargetPeer(p);
                setMessageModalOpen(true);
              }}
            />
          </div>
        ) : (
          /* Tab 2: STUDENT PROFILE VIEW (LinkedIn Style) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left / Center Main Column (8 cols on large screens) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Profile Header (Avatar, Banner, Connections, Action Buttons, Open to Work) */}
              <ProfileHeader
                profile={activeProfile}
                isSelf={isViewingSelf}
                onConnectClick={handleConnectClick}
                onMessageClick={(p) => {
                  setTargetPeer(p);
                  setMessageModalOpen(true);
                }}
                onEditProfileClick={() => setEditProfileModalOpen(true)}
                onOpenJobPreferencesClick={() => setJobModalOpen(true)}
                onShareProfileClick={() => {
                  if (typeof navigator !== "undefined" && navigator.clipboard) {
                    navigator.clipboard.writeText(window.location.href);
                  }
                  showToast(`Profile link for ${activeProfile.name} copied to clipboard!`);
                }}
                isInstitutionVerified={verifiedProfileIds.includes(activeProfile.id)}
                onOpenVerificationClick={() => setVerificationModalOpen(true)}
              />

              {/* About Section */}
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-5 sm:p-7 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 text-white">
                {/* Top Gold Shimmer Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

                <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
                  <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                    About {activeProfile.name}
                  </h2>
                  {isViewingSelf && (
                    <button
                      onClick={() => setEditProfileModalOpen(true)}
                      className="text-xs font-mono uppercase tracking-wider font-semibold text-[#deb86d] hover:underline cursor-pointer"
                    >
                      Edit Bio
                    </button>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-[#d4e4da] leading-relaxed whitespace-pre-line font-light">
                  {activeProfile.about}
                </p>
              </div>

              {/* Activity & Achievements Feed */}
              <div id="testimonials">
                <AchievementsFeed
                  posts={activeProfile.achievements}
                  currentProfile={currentLoggedInUser}
                  isSelf={isViewingSelf}
                  onAddPost={handleAddPost}
                  onReaction={handleReaction}
                  onAddComment={handleAddComment}
                  onSharePost={handleSharePost}
                />
              </div>

              {/* Experience Section */}
              <div id="explorer">
                <ExperienceSection
                  experience={activeProfile.experience}
                  isSelf={isViewingSelf}
                  onAddExperience={handleAddExperience}
                />
              </div>

              {/* Education Section */}
              <EducationSection
                education={activeProfile.education}
                isSelf={isViewingSelf}
                onAddEducation={handleAddEducation}
              />

              {/* Skills & Endorsements */}
              <SkillsSection
                skills={activeProfile.skills}
                isSelf={isViewingSelf}
                onEndorseSkill={handleEndorseSkill}
                onAddSkill={handleAddSkill}
              />
            </div>

            {/* Right Column / Sidebar Widgets (4 cols on large screens) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Analytics Card (Private to user or shown on self) */}
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 text-white">
                {/* Top Gold Shimmer Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#deb86d]" />
                    <span>Campus Analytics</span>
                  </h3>
                  <span className="text-[10px] text-[#8fa597] font-mono">
                    {isViewingSelf ? "Private to you" : "Public signals"}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xs rounded-xl border border-white/10 hover:border-[#c79e4d]/30 transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-base font-serif font-bold text-white">
                        {activeProfile.stats.profileViews}
                      </div>
                      <div className="text-[11px] text-[#8fa597]">
                        Profile views past 7 days
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-[#deb86d]" />
                  </div>

                  <div className="p-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xs rounded-xl border border-white/10 hover:border-[#c79e4d]/30 transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-base font-serif font-bold text-white">
                        {activeProfile.stats.postImpressions.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#8fa597]">
                        Achievement post impressions
                      </div>
                    </div>
                    <Flame className="w-4 h-4 text-[#deb86d]" />
                  </div>

                  <div className="p-3.5 bg-white/[0.04] hover:bg-white/[0.08] backdrop-blur-xs rounded-xl border border-white/10 hover:border-[#c79e4d]/30 transition-colors flex items-center justify-between">
                    <div>
                      <div className="text-base font-serif font-bold text-white">
                        {activeProfile.stats.searchAppearances}
                      </div>
                      <div className="text-[11px] text-[#8fa597]">
                        Vault & placement search appearances
                      </div>
                    </div>
                    <Search className="w-4 h-4 text-[#deb86d]" />
                  </div>
                </div>
              </div>

              {/* People You May Know / Suggested Peers */}
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 text-white">
                {/* Top Gold Shimmer Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#deb86d]" />
                    <span>KGEC Batchmates</span>
                  </h3>
                  <button
                    onClick={() => setActiveTab("network")}
                    className="text-xs font-mono uppercase tracking-wider text-[#deb86d] hover:underline cursor-pointer"
                  >
                    See all
                  </button>
                </div>

                <div className="space-y-3.5">
                  {profiles
                    .filter((p) => p.id !== activeProfile.id)
                    .slice(0, 3)
                    .map((peer) => (
                      <div
                        key={peer.id}
                        className="flex items-start justify-between gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors"
                      >
                        <div className="flex items-start gap-2.5">
                          <div
                            onClick={() => setViewedProfileId(peer.id)}
                            className={`w-9 h-9 rounded-full bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 cursor-pointer shadow-sm border border-white/20`}
                          >
                            {peer.avatarText}
                          </div>

                          <div>
                            <h4
                              onClick={() => setViewedProfileId(peer.id)}
                              className="text-xs font-serif font-bold text-white hover:text-[#deb86d] cursor-pointer"
                            >
                              {peer.name}
                            </h4>
                            <p className="text-[11px] text-[#8fa597] font-mono line-clamp-1">
                              {peer.department} · {peer.batchYear}
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleConnectClick(peer)}
                          className={`text-xs px-2.5 py-1 rounded-lg font-mono uppercase tracking-wider font-semibold transition-colors cursor-pointer shrink-0 ${
                            peer.connectionStatus === "connected"
                              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                              : peer.connectionStatus === "pending"
                              ? "bg-amber-950/80 text-amber-300 border border-amber-500/40"
                              : "border border-[#c79e4d] text-[#deb86d] hover:bg-[#c79e4d] hover:text-[#08120c]"
                          }`}
                        >
                          {peer.connectionStatus === "connected"
                            ? "Connected"
                            : peer.connectionStatus === "pending"
                            ? "Pending"
                            : "+ Connect"}
                        </button>
                      </div>
                    ))}
                </div>
              </div>

              {/* Trending Campus Topics */}
              <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-5 sm:p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 text-white">
                {/* Top Gold Shimmer Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

                <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-white/10">
                  <Sparkles className="w-3.5 h-3.5 text-[#deb86d]" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono">
                    Campus Discussion Trends
                  </h3>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <span className="font-bold text-white hover:text-[#deb86d] cursor-pointer font-serif">
                      #SmartIndiaHackathon2025
                    </span>
                    <p className="text-[11px] text-[#8fa597] font-mono mt-0.5">14 teams qualified from KGEC</p>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <span className="font-bold text-white hover:text-[#deb86d] cursor-pointer font-serif">
                      #MicrosoftPlacementDrives
                    </span>
                    <p className="text-[11px] text-[#8fa597] font-mono mt-0.5">On-campus shortlist declared</p>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <span className="font-bold text-white hover:text-[#deb86d] cursor-pointer font-serif">
                      #MAKAUTEndSemSchedule
                    </span>
                    <p className="text-[11px] text-[#8fa597] font-mono mt-0.5">Routine released for 6th & 8th Sem</p>
                  </div>
                  <div className="p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors">
                    <span className="font-bold text-white hover:text-[#deb86d] cursor-pointer font-serif">
                      #Espektro2026
                    </span>
                    <p className="text-[11px] text-[#8fa597] font-mono mt-0.5">Annual Technical Fest announced</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <JobStatusModal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        jobStatus={activeProfile.jobStatus}
        isSelf={isViewingSelf}
        onUpdateJobStatus={handleUpdateJobStatus}
      />

      <MessageModal
        isOpen={messageModalOpen}
        onClose={() => setMessageModalOpen(false)}
        targetProfile={targetPeer}
        currentProfile={currentLoggedInUser}
      />

      <ConnectNoteModal
        isOpen={connectNoteModalOpen}
        onClose={() => setConnectNoteModalOpen(false)}
        targetProfile={targetPeer}
        onConfirmSend={handleConfirmSendInvitation}
      />

      <EditProfileModal
        isOpen={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
        profile={activeProfile}
        onSaveProfile={handleSaveProfile}
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <VerificationModal
        isOpen={verificationModalOpen}
        onClose={() => setVerificationModalOpen(false)}
        onVerified={() => {
          setVerifiedProfileIds((current) =>
            current.includes(currentUserId) ? current : [...current, currentUserId]
          );
          showToast("Verification submitted for campus review.");
        }}
      />
    </main>
  </AuthGuard>
  );
}
