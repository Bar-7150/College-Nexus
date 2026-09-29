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

  // New post draft
  const [postContent, setPostContent] = useState("");
  const [postTag, setPostTag] = useState("General Discussion");
  const [isSubmittingPost, setIsSubmittingPost] = useState(false);

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    setIsSubmittingPost(true);
    setTimeout(() => {
      onAddPost(community.id, {
        content: postContent.trim(),
        tag: postTag,
        channel: selectedChannel,
      });
      setPostContent("");
      setIsSubmittingPost(false);
    }, 200);
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-[#fbf9f5] w-full max-w-4xl rounded-2xl sm:rounded-3xl border border-slate-300 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header Banner */}
        <div
          className={`relative bg-gradient-to-r ${community.bannerGradient} p-6 sm:p-8 text-white shrink-0`}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white/90 hover:text-white transition-colors cursor-pointer z-20 backdrop-blur-md"
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
              <span className="px-2.5 py-0.5 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border border-white/20">
                {community.category} Hub
              </span>
              {community.isVerified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-semibold rounded-full border border-emerald-400/40">
                  <CheckCircle className="w-3 h-3" />
                  <span>KGEC Verified Guild</span>
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-mono rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{community.activeCount} online now</span>
              </span>
            </div>

            {/* Title & Tagline */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white tracking-tight flex items-center gap-2.5">
                  <span className="text-3xl sm:text-4xl">{community.emblem}</span>
                  <span>{community.name}</span>
                </h2>
                <p className="text-white/85 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed font-medium">
                  {community.tagline}
                </p>
              </div>

              {/* Join / Leave Button */}
              <div className="shrink-0 flex items-center gap-2">
                <button
                  onClick={() => onToggleJoin(community.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-md ${
                    community.isJoined
                      ? "bg-white text-slate-800 hover:bg-red-50 hover:text-red-700"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {community.isJoined ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
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
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-3 border-t border-white/20 text-xs text-white/90 font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-white/70" />
                <strong>{community.memberCount}</strong> Members
              </span>
              <span className="flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-white/70" />
                <strong>{community.posts.length}</strong> Discussions
              </span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-white/70" />
                <strong>{community.resources.length}</strong> Academic Resources
              </span>
              <span className="text-white/70 text-[11px]">
                Lead: <strong>{community.lead.name}</strong> ({community.lead.roll})
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between overflow-x-auto shrink-0 scrollbar-none">
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
                  className={`py-3.5 px-3 sm:px-4 text-xs font-semibold flex items-center gap-1.5 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? "border-red-600 text-red-600 bg-red-50/50"
                      : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-600"
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
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                    ROOM CHANNELS
                  </span>
                  <div className="space-y-1">
                    {community.channels.map((chan) => (
                      <button
                        key={chan.id}
                        onClick={() => setSelectedChannel(chan.name)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex flex-col transition-all cursor-pointer ${
                          selectedChannel === chan.name
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 border border-transparent"
                        }`}
                      >
                        <span className="font-mono">{chan.name}</span>
                        <span className="text-[11px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                          {chan.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* About Box */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5 font-heading">
                    <Info className="w-3.5 h-3.5 text-red-600" />
                    <span>Guild Overview</span>
                  </h4>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {community.description}
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1">
                    {community.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded"
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
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-600 to-rose-700 text-white font-bold text-xs flex items-center justify-center">
                      AS
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        Arjun Sen (You)
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
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
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white resize-none text-slate-800"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-500">Topic:</span>
                        <select
                          value={postTag}
                          onChange={(e) => setPostTag(e.target.value)}
                          className="text-xs bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 focus:outline-none cursor-pointer"
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
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
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
                    <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-xs">
                      No discussions in this channel yet. Be the first to start a conversation!
                    </div>
                  ) : (
                    community.posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3"
                      >
                        {/* Post Header */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center">
                              {post.authorAvatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-900">
                                  {post.authorName}
                                </span>
                                {post.authorBadge && (
                                  <span className="text-[9px] font-mono px-1.5 py-0.2 bg-red-50 text-red-600 rounded font-semibold border border-red-100">
                                    {post.authorBadge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] font-mono text-slate-400">
                                {post.authorRoll} • {post.timeAgo}
                              </span>
                            </div>
                          </div>

                          {post.tag && (
                            <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                              #{post.tag}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <p className="text-xs text-slate-800 leading-relaxed font-normal whitespace-pre-line">
                          {post.content}
                        </p>

                        {/* Post Actions Strip */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500 font-mono">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onLikePost(community.id, post.id)}
                              className={`flex items-center gap-1.5 py-1 px-2.5 rounded-lg transition-colors cursor-pointer ${
                                post.userLiked
                                  ? "text-red-600 bg-red-50 font-bold"
                                  : "text-slate-600 hover:text-red-600 hover:bg-slate-50"
                              }`}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 ${
                                  post.userLiked ? "fill-red-600 text-red-600" : ""
                                }`}
                              />
                              <span>{post.likes}</span>
                            </button>

                            <button
                              onClick={() => toggleComments(post.id)}
                              className="flex items-center gap-1.5 py-1 px-2.5 rounded-lg hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                              <span>{post.replies.length} replies</span>
                            </button>
                          </div>

                          <span className="text-[10px] text-slate-400">
                            {post.channel}
                          </span>
                        </div>

                        {/* Comment Section */}
                        {expandedComments[post.id] && (
                          <div className="pt-3 border-t border-slate-100 space-y-2.5 animate-in fade-in duration-100">
                            {/* Existing Comments */}
                            {post.replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 flex items-start gap-2.5 text-xs"
                              >
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                                  {reply.authorAvatar}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between text-[11px] mb-0.5">
                                    <span className="font-semibold text-slate-800">
                                      {reply.authorName} ({reply.authorRoll})
                                    </span>
                                    <span className="text-[10px] font-mono text-slate-400">
                                      {reply.timeAgo}
                                    </span>
                                  </div>
                                  <p className="text-slate-700 text-xs leading-snug">
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
                                className="flex-1 text-xs px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 focus:bg-white text-slate-800"
                              />
                              <button
                                onClick={() => handleCommentSubmit(post.id)}
                                disabled={!commentInputs[post.id]?.trim()}
                                className="px-3 py-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold cursor-pointer"
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
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-center gap-2">
                <Pin className="w-4 h-4 text-red-600 shrink-0" />
                <span>
                  Official announcements signed by authorized CRs, HODs, or Faculty Advisors are pinned below.
                </span>
              </div>

              {community.announcements.map((ann) => (
                <div
                  key={ann.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        ann.severity === "urgent"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : ann.severity === "event"
                          ? "bg-purple-100 text-purple-700 border border-purple-200"
                          : "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {ann.severity}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      {ann.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 font-heading">
                    {ann.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {ann.content}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>
                      Issued by: <strong>{ann.issuer}</strong>
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
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Study Vault & Shared Resources
                  </h3>
                  <p className="text-xs text-slate-500">
                    Syllabi, notes, workshop manuals, and source repositories for {community.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {community.resources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-100 flex items-center justify-center shrink-0">
                        {res.type === "pdf" && <FileText className="w-5 h-5" />}
                        {res.type === "repo" && <ExternalLink className="w-5 h-5" />}
                        {res.type === "doc" && <FileText className="w-5 h-5" />}
                        {res.type === "link" && <ExternalLink className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-1">
                          {res.description}
                        </p>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 mt-1">
                          <span>{res.sizeOrDetails}</span>
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
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
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
              <div className="p-4 bg-white rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 font-heading">
                    Guild Leadership & Members
                  </h3>
                  <p className="text-xs text-slate-500">
                    {community.memberCount} verified KGEC engineering students
                  </p>
                </div>
              </div>

              {/* Lead Member Card */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-2xl border border-red-200/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                    {community.lead.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        {community.lead.name}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-red-600 text-white rounded font-bold">
                        LEAD / CR
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-mono mt-0.5">
                      Roll: {community.lead.roll} • {community.lead.role}
                    </p>
                  </div>
                </div>

                <a
                  href="/messages"
                  className="px-3 py-1.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-xs font-semibold rounded-xl shadow-2xs transition-colors"
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
                    className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-900">
                          {member.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-400">
                          {member.roll} • {member.role}
                        </div>
                      </div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CHARTER & RULES */}
          {activeTab === "rules" && (
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4 max-w-2xl mx-auto">
              <div className="flex items-center gap-2.5 text-slate-900 pb-2 border-b border-slate-100">
                <Shield className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold font-heading">
                  Community Charter & Ground Rules
                </h3>
              </div>

              <div className="space-y-3">
                {community.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] text-slate-500 font-mono">
                Violations are subject to disciplinary review under the KGEC Collegiate Intranet Guidelines.
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
