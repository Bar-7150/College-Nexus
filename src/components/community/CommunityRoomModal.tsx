"use client";

import React, { useState } from "react";
import {
  Community,
  CommunityPost,
  CommunityResource,
  CommunityAnnouncement,
} from "@/data/communityData";
import {
  X,
  Users,
  CheckCircle,
  MessageSquare,
  FileText,
  Pin,
  Send,
  Heart,
  Share2,
  Download,
  ExternalLink,
  Shield,
  Calendar,
  Sparkles,
  Info,
  ChevronRight,
  Check,
  Plus,
  Lock,
  Tag,
} from "lucide-react";

interface CommunityRoomModalProps {
  community: Community;
  onClose: () => void;
  onToggleJoin: (communityId: string) => void;
  onAddPost: (communityId: string, post: Partial<CommunityPost>) => void;
  onLikePost: (communityId: string, postId: string) => void;
  onAddComment: (
    communityId: string,
    postId: string,
    commentText: string
  ) => void;
}

export default function CommunityRoomModal({
  community,
  onClose,
  onToggleJoin,
  onAddPost,
  onLikePost,
  onAddComment,
}: CommunityRoomModalProps) {
  const [activeTab, setActiveTab] = useState<
    "feed" | "announcements" | "resources" | "members" | "rules"
  >("feed");
  const [selectedChannel, setSelectedChannel] = useState<string>(
    community.channels[0]?.name || "#general-chat"
  );

  // New post input
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState("General Discussion");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  // Comments state per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmittingPost(true);
    onAddPost(community.id, {
      content: postContent.trim(),
      tag: postTag,
      channel: selectedChannel,
    });
    setPostContent("");
    setIsSubmittingPost(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    onAddComment(community.id, postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
    setExpandedComments((prev) => ({ ...prev, [postId]: true }));
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#050b08]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-[#0b1510] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-[#213b2c] sm:border-[#c79e4d]/35 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#f5f5f0]">
        
        {/* Modal Header Banner */}
        <div
          className={`relative bg-gradient-to-r ${community.bannerGradient} p-6 sm:p-8 text-white shrink-0`}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white/90 hover:text-white transition-colors cursor-pointer z-20 backdrop-blur-md border border-white/20"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Background Monogram */}
          <div className="absolute right-6 -bottom-6 text-9xl opacity-20 pointer-events-none select-none font-bold">
            {community.emblem}
          </div>

          <div className="relative z-10">
            {/* Top pill row */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-black/50 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border border-[#c79e4d]/35 text-[#deb86d]">
                {community.category} Hub
              </span>
              {community.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-semibold font-mono rounded-full border border-emerald-500/40">
                  <CheckCircle className="w-3 h-3 text-emerald-400" />
                  <span>KGEC Verified Guild</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-black/50 backdrop-blur-md text-white text-[10px] font-mono rounded-full border border-white/15">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{community.activeCount} online now</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span className="text-3xl sm:text-4xl">{community.emblem}</span>
                  <span>{community.name}</span>
                </h2>
                <p className="text-white/85 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed font-light">
                  {community.tagline}
                </p>
              </div>

              {/* Join / Leave Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onToggleJoin(community.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase font-mono tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                    community.isJoined
                      ? "bg-emerald-950/80 hover:bg-rose-950/80 text-emerald-300 hover:text-rose-300 border border-emerald-500/40 hover:border-rose-500/40"
                      : "bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c]"
                  }`}
                >
                  {community.isJoined ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Joined Member</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Join Community</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick stats strip */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-3 border-t border-white/15 text-xs text-[#deb86d] font-mono">
              <span className="flex items-center gap-1.5 text-white/90">
                <Users className="w-3.5 h-3.5 text-[#deb86d]" />
                <strong className="text-[#deb86d]">{community.memberCount}</strong> Members
              </span>
              <span className="flex items-center gap-1.5 text-white/90">
                <MessageSquare className="w-3.5 h-3.5 text-[#deb86d]" />
                <strong className="text-[#deb86d]">{community.posts.length}</strong> Discussions
              </span>
              <span className="flex items-center gap-1.5 text-white/90">
                <FileText className="w-3.5 h-3.5 text-[#deb86d]" />
                <strong className="text-[#deb86d]">{community.resources.length}</strong> Academic Resources
              </span>
              <span className="text-[#9cb0a2] text-[11px]">
                Lead: <strong className="text-white">{community.lead.name}</strong> ({community.lead.roll})
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#0e1a14] border-b border-[#1b3125] px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0 scrollbar-none">
          <div className="flex items-center gap-1 sm:gap-2">
            {[
              { id: "feed", label: "Discussions & Feed", icon: MessageSquare, count: community.posts.length },
              { id: "announcements", label: "Announcements", icon: Pin, count: community.announcements.length },
              { id: "resources", label: "Vault & Drives", icon: FileText, count: community.resources.length },
              { id: "members", label: "Active Members", icon: Users },
              { id: "rules", label: "Charter & Rules", icon: Shield },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-3 px-3 sm:px-4 text-xs font-mono font-semibold uppercase tracking-wider flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "border-[#c79e4d] text-[#deb86d] bg-[#16271e]/70"
                      : "border-transparent text-[#9cb0a2] hover:text-white hover:bg-[#16271e]/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-[#c79e4d] text-[#08120c] font-bold" : "bg-[#16271e] text-[#9cb0a2] border border-white/10"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* TAB 1: DISCUSSIONS & CHANNELS */}
          {activeTab === "feed" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Channel Filter Sidebar */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-[#0e1a14] p-3.5 rounded-2xl border border-[#1b3125]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#deb86d] block mb-2 px-1">
                    ROOM CHANNELS
                  </span>
                  <div className="space-y-1">
                    {community.channels.map((chan) => (
                      <button
                        key={chan.id}
                        onClick={() => setSelectedChannel(chan.name)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex flex-col transition-all cursor-pointer ${
                          selectedChannel === chan.name
                            ? "bg-[#16271e] text-[#deb86d] border border-[#c79e4d]/40"
                            : "text-[#9cb0a2] hover:bg-[#16271e]/60 hover:text-white border border-transparent"
                        }`}
                      >
                        <span className="font-mono">{chan.name}</span>
                        <span className="text-[11px] text-[#74897c] font-normal mt-0.5 line-clamp-1">
                          {chan.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* About Box */}
                <div className="bg-[#0e1a14] p-4 rounded-2xl border border-[#1b3125] text-xs space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-1.5 font-serif">
                    <Info className="w-3.5 h-3.5 text-[#deb86d]" />
                    <span>Guild Overview</span>
                  </h4>
                  <p className="text-[#9cb0a2] text-[11px] leading-relaxed font-light">
                    {community.description}
                  </p>
                  <div className="pt-2 border-t border-[#1b3125] flex flex-wrap gap-1">
                    {community.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-2 py-0.5 bg-[#112017] text-[#deb86d] rounded border border-[#213b2c]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Feed & Post Creator */}
              <div className="lg:col-span-8 space-y-4">
                {/* Create Post Box */}
                <div className="bg-[#0e1a14] p-4 rounded-2xl border border-[#1b3125]">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dfc285] via-[#c79e4d] to-[#9e7529] text-[#08120c] font-bold text-xs flex items-center justify-center font-mono">
                      AS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block leading-tight font-serif">
                        Arjun Sen (You)
                      </span>
                      <span className="text-[10px] font-mono text-[#9cb0a2]">
                        Roll: 22/CSE/042 • Posting to {selectedChannel}
                      </span>
                    </div>
                  </div>

                  <form onSubmit={handlePostSubmit} className="space-y-3">
                    <textarea
                      rows={3}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder={`Share an update, ask an academic question, or drop notes in ${community.name}...`}
                      className="w-full text-xs p-3 bg-[#112017] border border-[#213b2c] rounded-xl focus:outline-none focus:border-[#c79e4d] resize-none text-white placeholder-[#687f71] font-mono"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-[#9cb0a2]">Topic:</span>
                        <select
                          value={postTag}
                          onChange={(e) => setPostTag(e.target.value)}
                          className="text-xs bg-[#112017] border border-[#213b2c] rounded-lg px-2.5 py-1 text-[#deb86d] font-semibold font-mono focus:outline-none cursor-pointer"
                        >
                          <option value="General Discussion">General Discussion</option>
                          <option value="Academics & PYQs">Academics & PYQs</option>
                          <option value="Hostel & Transit">Hostel & Transit</option>
                          <option value="Events & Fests">Events & Fests</option>
                          <option value="Coding & Tech">Coding & Tech</option>
                        </select>
                      </div>

                      <button
                        type="submit"
                        disabled={!postContent.trim() || isSubmittingPost}
                        className="px-4 py-2 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 disabled:opacity-50 text-[#08120c] rounded-xl text-xs font-bold uppercase font-mono tracking-wider flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmittingPost ? "Publishing..." : "Post to Hub"}</span>
                      </button>
                    </div>
                  </form>
                </div>

                {/* Posts List */}
                <div className="space-y-3">
                  {community.posts.length === 0 ? (
                    <div className="bg-[#0e1a14] p-8 rounded-2xl border border-[#1b3125] text-center text-[#9cb0a2] text-xs font-mono">
                      No discussions in this channel yet. Be the first to start a conversation!
                    </div>
                  ) : (
                    community.posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-[#0e1a14] p-4 sm:p-5 rounded-2xl border border-[#1b3125] space-y-3"
                      >
                        {/* Post Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#112017] border border-[#213b2c] text-[#deb86d] font-bold text-xs flex items-center justify-center font-mono">
                              {post.authorAvatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-white font-serif">
                                  {post.authorName}
                                </span>
                                {post.authorBadge && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-[#16271e] text-[#deb86d] rounded font-semibold border border-[#c79e4d]/30">
                                    {post.authorBadge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-[#9cb0a2]">
                                {post.authorRoll} • {post.timeAgo}
                              </span>
                            </div>
                          </div>

                          {post.tag && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-[#16271e] text-[#deb86d] rounded-md border border-[#c79e4d]/30">
                              #{post.tag}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <p className="text-xs text-[#f5f9f6] leading-relaxed font-light whitespace-pre-line">
                          {post.content}
                        </p>

                        {/* Post Actions Strip */}
                        <div className="flex items-center justify-between pt-2 border-t border-[#1b3125] text-xs text-[#9cb0a2] font-mono">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onLikePost(community.id, post.id)}
                              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                                post.userLiked
                                  ? "text-rose-400 bg-rose-950/60 font-bold border border-rose-500/40"
                                  : "text-[#9cb0a2] hover:text-white hover:bg-[#16271e]"
                              }`}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  post.userLiked ? "fill-rose-400 text-rose-400" : ""
                                }`}
                              />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() => toggleComments(post.id)}
                              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-[#16271e] hover:text-white transition-colors cursor-pointer text-[#9cb0a2]"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-[#deb86d]" />
                              <span>{post.replies.length} replies</span>
                            </button>
                          </div>

                          <span className="text-[10px] text-[#74897c]">
                            {post.channel}
                          </span>
                        </div>

                        {/* Comment Section */}
                        {expandedComments[post.id] && (
                          <div className="pt-3 border-t border-[#1b3125] space-y-2.5 animate-in fade-in duration-100">
                            {/* Existing Comments */}
                            {post.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="bg-[#112017] p-2.5 rounded-xl border border-[#213b2c] flex items-start gap-2.5 text-xs"
                              >
                                <div className="w-6 h-6 rounded-full bg-[#16271e] text-[#deb86d] font-bold text-[10px] flex items-center justify-center shrink-0 border border-[#213b2c] font-mono">
                                  {reply.authorAvatar}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                                    <span className="font-semibold text-white">
                                      {reply.authorName} ({reply.authorRoll})
                                    </span>
                                    <span className="text-[10px] font-mono text-[#9cb0a2]">
                                      {reply.timeAgo}
                                    </span>
                                  </div>
                                  <p className="text-[#dbe7de] text-xs leading-snug font-light">
                                    {reply.content}
                                  </p>
                                </div>
                              </div>
                            ))}

                            {/* Add reply input */}
                            <div className="flex items-center gap-2 pt-1">
                              <input
                                type="text"
                                placeholder="Reply to this thread..."
                                value={commentInputs[post.id] || ""}
                                onChange={(e) =>
                                  setCommentInputs((prev) => ({
                                    ...prev,
                                    [post.id]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCommentSubmit(post.id);
                                  }
                                }}
                                className="flex-1 text-xs px-3 py-1.5 bg-[#112017] border border-[#213b2c] rounded-lg focus:outline-none focus:border-[#c79e4d] text-white placeholder-[#687f71] font-mono"
                              />
                              <button
                                onClick={() => handleCommentSubmit(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                                className="px-3 py-1.5 bg-[#c79e4d] hover:bg-[#b3853b] disabled:opacity-50 text-[#08120c] rounded-lg text-xs font-bold font-mono uppercase tracking-wider cursor-pointer"
                              >
                                Reply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ANNOUNCEMENTS */}
          {activeTab === "announcements" && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-3 bg-[#16271e] border border-[#c79e4d]/30 rounded-xl text-xs text-[#deb86d] flex items-center gap-2 font-mono">
                <Pin className="w-4 h-4 text-[#c79e4d] shrink-0" />
                <span>
                  Official announcements signed by authorized CRs, HODs, or Faculty Advisors are pinned below.
                </span>
              </div>

              {community.announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-[#0e1a14] p-5 rounded-2xl border border-[#1b3125] shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        ann.severity === "urgent"
                          ? "bg-rose-950/80 text-rose-300 border border-rose-500/40"
                          : ann.severity === "event"
                          ? "bg-purple-950/80 text-purple-300 border border-purple-500/40"
                          : "bg-blue-950/80 text-blue-300 border border-blue-500/40"
                      }`}
                    >
                      {ann.severity}
                    </span>
                    <span className="text-[11px] font-mono text-[#9cb0a2]">
                      {ann.date}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-white">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-[#dbe7de] leading-relaxed font-light">
                    {ann.content}
                  </p>

                  <div className="pt-2 border-t border-[#1b3125] flex items-center justify-between text-[11px] text-[#9cb0a2] font-mono">
                    <span>
                      Issued by: <strong className="text-white">{ann.issuer}</strong>
                    </span>
                    <span>{ann.issuerRole}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: RESOURCES & VAULT */}
          {activeTab === "resources" && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-serif font-bold text-white">
                    Study Vault &amp; Shared Resources
                  </h3>
                  <p className="text-xs text-[#9cb0a2]">
                    Syllabi, notes, workshop manuals, and source repositories for {community.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {community.resources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-[#0e1a14] p-4 rounded-2xl border border-[#1b3125] hover:border-[#c79e4d]/40 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#112017] text-[#deb86d] border border-[#213b2c] flex items-center justify-center shrink-0">
                        {res.type === "pdf" && <FileText className="w-5 h-5" />}
                        {res.type === "repo" && <ExternalLink className="w-5 h-5" />}
                        {res.type === "doc" && <FileText className="w-5 h-5" />}
                        {res.type === "link" && <ExternalLink className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-serif font-bold text-white leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-[11px] text-[#9cb0a2] mt-0.5 line-clamp-1 font-light">
                          {res.description}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-[#9cb0a2] mt-1">
                          <span className="text-[#deb86d]">{res.sizeOrDetails}</span>
                          <span>•</span>
                          <span>Added by: {res.addedBy}</span>
                          {res.downloads !== undefined && (
                            <>
                              <span>•</span>
                              <span>{res.downloads} downloads</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={res.url}
                      onClick={(e) => {
                        if (res.url === "#") {
                          e.preventDefault();
                          alert(`Initiating download for: ${res.title}`);
                        }
                      }}
                      className="px-3.5 py-1.5 bg-gradient-to-r from-[#dfc285] via-[#c79e4d] to-[#b3853b] hover:brightness-110 text-[#08120c] text-xs font-bold font-mono uppercase tracking-wider rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{res.type === "repo" ? "View Repo" : "Download"}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MEMBERS & CR DIRECTORY */}
          {activeTab === "members" && (
            <div className="space-y-4 max-w-3xl mx-auto">
              <div className="p-4 bg-[#0e1a14] rounded-2xl border border-[#1b3125] flex items-center justify-between shadow-xs">
                <div>
                  <h3 className="text-sm font-serif font-bold text-white">
                    Guild Leadership &amp; Members
                  </h3>
                  <p className="text-xs text-[#9cb0a2]">
                    {community.memberCount} verified KGEC engineering students
                  </p>
                </div>
              </div>

              {/* Lead Member Card */}
              <div className="bg-[#112017] p-4 rounded-2xl border border-[#c79e4d]/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfc285] via-[#c79e4d] to-[#9e7529] text-[#08120c] font-bold text-sm flex items-center justify-center shadow-xs font-mono">
                    {community.lead.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-serif font-bold text-white">
                        {community.lead.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-[#c79e4d] text-[#08120c] rounded font-bold uppercase">
                        LEAD / CR
                      </span>
                    </div>
                    <p className="text-xs text-[#deb86d] font-mono mt-0.5">
                      Roll: {community.lead.roll} • {community.lead.role}
                    </p>
                  </div>
                </div>

                <a
                  href="/messages"
                  className="px-3.5 py-1.5 bg-[#16271e] hover:bg-[#1f372a] text-[#deb86d] border border-[#c79e4d]/30 text-xs font-mono uppercase tracking-wider rounded-xl transition-colors"
                >
                  Direct Message
                </a>
              </div>

              {/* Sample Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Priya Sharma", roll: "23/IT/014", role: "Core Contributor", avatar: "PS" },
                  { name: "Arjun Sen", roll: "22/CSE/042", role: "Member / Dev", avatar: "AS" },
                  { name: "Sneha Roy", roll: "25/ECE/041", role: "Fresher Representative", avatar: "SR" },
                  { name: "Subhashis Roy", roll: "24/CSE/031", role: "Moderator", avatar: "SR" },
                  { name: "Tanmoy Pal", roll: "25/IT/019", role: "Member", avatar: "TP" },
                  { name: "Debjit Das", roll: "25/ME/028", role: "Hostel Representative", avatar: "DD" },
                ].map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#0e1a14] rounded-xl border border-[#1b3125] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#112017] text-[#deb86d] font-bold text-xs flex items-center justify-center border border-[#213b2c] font-mono">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">
                          {member.name}
                        </div>
                        <div className="text-[10px] font-mono text-[#9cb0a2]">
                          {member.roll} • {member.role}
                        </div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHARTER & RULES */}
          {activeTab === "rules" && (
            <div className="bg-[#0e1a14] p-6 rounded-2xl border border-[#1b3125] space-y-4 max-w-2xl mx-auto shadow-xs">
              <div className="flex items-center gap-2.5 text-white pb-2 border-b border-[#1b3125]">
                <Shield className="w-5 h-5 text-[#deb86d]" />
                <h3 className="text-base font-serif font-bold">
                  Community Charter &amp; Ground Rules
                </h3>
              </div>

              <div className="space-y-3">
                {community.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-[#dbe7de] font-light">
                    <span className="w-5 h-5 rounded-full bg-[#16271e] text-[#deb86d] font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5 border border-[#c79e4d]/30">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-[#112017] border border-[#1b3125] rounded-xl text-[11px] text-[#9cb0a2] font-mono">
                Violations are subject to disciplinary review under the KGEC Collegiate Intranet Guidelines.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
