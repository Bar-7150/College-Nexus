"use client";

import React, { useState } from "react";
import {
  AchievementPost,
  CommentItem,
  StudentProfile,
} from "@/data/profileData";
import {
  Award,
  Trophy,
  Briefcase,
  BookOpen,
  CheckCircle2,
  Rocket,
  ThumbsUp,
  MessageSquare,
  Share2,
  Send,
  PlusCircle,
  Sparkles,
  Tag,
  Clock,
  Heart,
  Lightbulb,
  Smile,
  X,
  ShieldCheck,
} from "lucide-react";

interface AchievementsFeedProps {
  posts: AchievementPost[];
  currentProfile: StudentProfile;
  isSelf: boolean;
  onAddPost: (newPost: Omit<AchievementPost, "id" | "reactions" | "comments" | "shares">) => void;
  onReaction: (postId: string, reactionType: "like" | "celebrate" | "insightful") => void;
  onAddComment: (postId: string, commentText: string) => void;
  onSharePost: (postId: string) => void;
}

export default function AchievementsFeed({
  posts,
  currentProfile,
  isSelf,
  onAddPost,
  onReaction,
  onAddComment,
  onSharePost,
}: AchievementsFeedProps) {
  const [composerOpen, setComposerOpen] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [reactionMenuPostId, setReactionMenuPostId] = useState<string | null>(null);

  // New Post Form State
  const [postCategory, setPostCategory] = useState<AchievementPost["category"]>("Hackathon");
  const [postTitle, setPostTitle] = useState("");
  const [postBadge, setPostBadge] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postTags, setPostTags] = useState("#Hackathon, #KGEC, #Innovation");

  const getCategoryIcon = (category: AchievementPost["category"]) => {
    switch (category) {
      case "Hackathon":
        return <Trophy className="w-4 h-4 text-amber-500" />;
      case "Internship":
        return <Briefcase className="w-4 h-4 text-blue-500" />;
      case "Research":
        return <BookOpen className="w-4 h-4 text-purple-500" />;
      case "Certification":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case "Project":
        return <Rocket className="w-4 h-4 text-rose-500" />;
      default:
        return <Award className="w-4 h-4 text-red-500" />;
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const parsedTags = postTags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
      .map((t) => (t.startsWith("#") ? t : `#${t}`));

    onAddPost({
      authorId: currentProfile.id,
      authorName: currentProfile.name,
      authorHeadline: currentProfile.headline,
      authorAvatar: currentProfile.avatarText,
      authorDept: currentProfile.department,
      authorRoll: currentProfile.rollNumber,
      timestamp: "Just now",
      category: postCategory,
      badgeText: postBadge.trim() || `${postCategory} Achievement`,
      title: postTitle,
      content: postContent,
      tags: parsedTags.length > 0 ? parsedTags : ["#KGEC", "#Achievement"],
    });

    // Reset form
    setPostTitle("");
    setPostBadge("");
    setPostContent("");
    setComposerOpen(false);
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden mb-6">
      {/* Section Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-heading font-bold text-slate-900">
              Activity & Achievements
            </h2>
            <span className="text-xs px-2 py-0.5 bg-red-50 text-red-700 font-semibold rounded-full border border-red-100 font-mono">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Hackathon wins, job offers, research papers & project launches
          </p>
        </div>

        <button
          onClick={() => setComposerOpen(true)}
          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post Achievement</span>
        </button>
      </div>

      {/* Quick Composer Trigger Bar */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${currentProfile.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs`}
        >
          {currentProfile.avatarText}
        </div>
        <button
          onClick={() => setComposerOpen(true)}
          className="w-full text-left px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-700 rounded-full text-xs font-medium transition-colors shadow-2xs flex items-center justify-between cursor-pointer"
        >
          <span>Share a new achievement, hackathon win, or internship offer...</span>
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </button>
      </div>

      {/* Post Creator Modal */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                  Celebrate an Achievement
                </h3>
              </div>
              <button
                onClick={() => setComposerOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handlePostSubmit} className="p-6 space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Achievement Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(
                    [
                      "Hackathon",
                      "Internship",
                      "Research",
                      "Certification",
                      "Project",
                      "Academic",
                    ] as AchievementPost["category"][]
                  ).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setPostCategory(cat)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                        postCategory === cat
                          ? "bg-red-50 text-red-700 border-red-300 ring-1 ring-red-300"
                          : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {getCategoryIcon(cat)}
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Highlight Badge Text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Honor / Badge Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 🏆 1st Runner Up — Smart India Hackathon 2025"
                  value={postBadge}
                  onChange={(e) => setPostBadge(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              {/* Post Title */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Post Headline *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Excited to announce our team's national victory at SIH!"
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              {/* Post Story / Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Story & Details *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share the journey, the technology used, mentors who helped, and what you learned..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 leading-relaxed resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>Hashtags (Comma separated)</span>
                  <span className="text-[10px] text-slate-400 font-normal">e.g. #SIH, #KGEC, #WebDev</span>
                </label>
                <div className="flex items-center gap-2">
                  <Tag className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="#SmartIndiaHackathon, #KGEC, #FullStack"
                    value={postTags}
                    onChange={(e) => setPostTags(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setComposerOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs font-medium hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold tracking-wider uppercase transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish to Network</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed List */}
      <div className="divide-y divide-slate-100">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No achievements published yet. Click &quot;Post Achievement&quot; above to celebrate your first win!
          </div>
        ) : (
          posts.map((post) => {
            const totalReactions =
              post.reactions.like + post.reactions.celebrate + post.reactions.insightful;
            const isCommentsOpen = activeCommentPostId === post.id;

            return (
              <article key={post.id} className="p-5 sm:p-6 transition-colors hover:bg-slate-50/40">
                {/* Author Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs ring-2 ring-slate-100`}
                    >
                      {post.authorAvatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 hover:text-red-600 cursor-pointer">
                          {post.authorName}
                        </h4>
                        <span className="text-[11px] px-1.5 py-0.5 bg-red-50 text-red-600 font-mono rounded border border-red-100">
                          {post.authorRoll}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{post.timestamp}</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 leading-normal">
                        {post.authorHeadline}
                      </p>
                    </div>
                  </div>

                  <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-[11px] font-semibold flex items-center gap-1 shrink-0">
                    {getCategoryIcon(post.category)}
                    <span>{post.category}</span>
                  </span>
                </div>

                {/* Highlight Badge Ribbon */}
                {post.badgeText && (
                  <div className="mb-3 p-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-xl flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span className="text-xs font-bold text-amber-900 tracking-tight">
                      {post.badgeText}
                    </span>
                  </div>
                )}

                {/* Title & Content */}
                <div className="space-y-2 mb-4">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Reactions & Comments Metric Row */}
                <div className="flex items-center justify-between text-xs text-slate-500 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <div className="flex -space-x-1">
                      <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] ring-1 ring-white">
                        👍
                      </span>
                      <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] ring-1 ring-white">
                        👏
                      </span>
                      <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] ring-1 ring-white">
                        💡
                      </span>
                    </div>
                    <span className="font-medium text-slate-700 ml-1">
                      {totalReactions} reactions
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        setActiveCommentPostId(isCommentsOpen ? null : post.id)
                      }
                      className="hover:underline cursor-pointer"
                    >
                      {post.comments.length} comments
                    </button>
                    <span>•</span>
                    <button
                      onClick={() => onSharePost(post.id)}
                      className="hover:underline cursor-pointer"
                    >
                      {post.shares} shares
                    </button>
                  </div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between pt-1 relative">
                  {/* Reaction Button with Popover */}
                  <div
                    className="relative"
                    onMouseEnter={() => setReactionMenuPostId(post.id)}
                    onMouseLeave={() => setReactionMenuPostId(null)}
                  >
                    <button
                      onClick={() =>
                        onReaction(
                          post.id,
                          post.userReaction === "like" ? "like" : "like"
                        )
                      }
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        post.userReaction
                          ? "text-red-600 bg-red-50"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>
                        {post.userReaction === "celebrate"
                          ? "Celebrated"
                          : post.userReaction === "insightful"
                          ? "Insightful"
                          : "Like"}
                      </span>
                    </button>

                    {/* Hover Reaction Picker */}
                    {reactionMenuPostId === post.id && (
                      <div className="absolute bottom-full left-0 mb-1 bg-white border border-slate-200 shadow-xl rounded-full px-3 py-1.5 flex items-center gap-2 z-30 animate-in fade-in slide-in-from-bottom-2">
                        <button
                          onClick={() => {
                            onReaction(post.id, "like");
                            setReactionMenuPostId(null);
                          }}
                          className="hover:scale-130 transition-transform text-lg"
                          title="Like"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => {
                            onReaction(post.id, "celebrate");
                            setReactionMenuPostId(null);
                          }}
                          className="hover:scale-130 transition-transform text-lg"
                          title="Celebrate"
                        >
                          👏
                        </button>
                        <button
                          onClick={() => {
                            onReaction(post.id, "insightful");
                            setReactionMenuPostId(null);
                          }}
                          className="hover:scale-130 transition-transform text-lg"
                          title="Insightful"
                        >
                          💡
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Comment Button */}
                  <button
                    onClick={() =>
                      setActiveCommentPostId(isCommentsOpen ? null : post.id)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Comment</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => onSharePost(post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Repost / Share</span>
                  </button>
                </div>

                {/* Comments Section Drawer */}
                {isCommentsOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 animate-in fade-in duration-150">
                    {/* Input to write new comment */}
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-full bg-gradient-to-br ${currentProfile.avatarBg} text-white font-bold text-[10px] flex items-center justify-center shrink-0`}
                      >
                        {currentProfile.avatarText}
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Add a congratulatory comment or question..."
                          value={commentInputs[post.id] || ""}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [post.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleCommentSubmit(post.id);
                          }}
                          className="w-full px-3.5 py-1.5 bg-slate-50 border border-slate-200 focus:border-red-500 rounded-full text-xs focus:outline-none"
                        />
                        <button
                          onClick={() => handleCommentSubmit(post.id)}
                          className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors cursor-pointer shrink-0 shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Comments List */}
                    <div className="space-y-2.5 pt-2">
                      {post.comments.length === 0 ? (
                        <p className="text-[11px] text-slate-400 italic text-center py-1">
                          Be the first KGEC student to comment on this achievement!
                        </p>
                      ) : (
                        post.comments.map((comment) => (
                          <div
                            key={comment.id}
                            className="flex items-start gap-2.5 bg-slate-50/80 p-3 rounded-xl border border-slate-100"
                          >
                            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0">
                              {comment.authorAvatar}
                            </div>
                            <div className="flex-1 text-xs">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-900">
                                    {comment.authorName}
                                  </span>
                                  <span className="text-[10px] text-red-600 font-mono">
                                    {comment.authorRoll}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400">
                                  {comment.timestamp}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-500 line-clamp-1">
                                {comment.authorHeadline}
                              </p>
                              <p className="text-xs text-slate-800 mt-1 leading-normal">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
