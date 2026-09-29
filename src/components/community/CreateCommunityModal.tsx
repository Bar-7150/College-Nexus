"use client";

import React, { useState } from "react";
import { Community } from "@/data/communityData";
import { X, Plus, ShieldCheck, Sparkles, AlertCircle } from "lucide-react";

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newCommunity: Partial<Community>) => void;
}

export default function CreateCommunityModal({
  isOpen,
  onClose,
  onCreate,
}: CreateCommunityModalProps) {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Community["category"]>("Tech");
  const [tagsInput, setTagsInput] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [emblem, setEmblem] = useState("🚀");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !tagline.trim()) return;

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const bannerGradients = {
      Batch: "from-blue-600 via-indigo-600 to-violet-800",
      Tech: "from-red-600 via-rose-700 to-amber-700",
      Campus: "from-amber-600 via-orange-600 to-red-700",
      Clubs: "from-cyan-600 via-blue-700 to-slate-900",
      Department: "from-emerald-600 via-teal-700 to-cyan-800",
    };

    onCreate({
      name: name.trim(),
      shortName: name.trim().slice(0, 12),
      tagline: tagline.trim(),
      description:
        description.trim() ||
        `${name.trim()} is an authenticated student community at Kalyani Government Engineering College.`,
      category,
      tags: tags.length > 0 ? tags : ["KGEC", category],
      emblem,
      bannerGradient: bannerGradients[category] || "from-slate-700 to-slate-900",
      isPrivate,
      isVerified: false,
      isJoined: true,
      memberCount: 1,
      activeCount: 1,
      themeColor: "red",
      lead: {
        name: "Arjun Sen",
        role: "Founder / Lead",
        roll: "22/CSE/042",
        avatar: "AS",
      },
      announcements: [
        {
          id: `ann-${Date.now()}`,
          title: `Welcome to ${name.trim()}!`,
          content:
            "Community initialized on College Nexus Intranet. Invite batchmates and share your first academic resources!",
          date: "Just now",
          issuer: "Arjun Sen",
          issuerRole: "Founder",
          severity: "info",
        },
      ],
      channels: [
        { id: "general", name: "#general-chat", description: "General community chatter & discussions" },
        { id: "resources", name: "#resources", description: "Shared notes, slides & materials" },
      ],
      posts: [
        {
          id: `post-${Date.now()}`,
          authorName: "Arjun Sen",
          authorRoll: "22/CSE/042",
          authorAvatar: "AS",
          authorBadge: "Founder",
          timeAgo: "Just now",
          content: `Welcome to ${name.trim()}! Feel free to introduce yourself and start collaborating.`,
          channel: "#general-chat",
          likes: 1,
          userLiked: true,
          replies: [],
        },
      ],
      resources: [],
      rules: [
        "Be respectful to all KGEC batchmates and members.",
        "Keep discussions focused on community objectives.",
      ],
    });

    onClose();
  };

  const sampleEmblems = ["🚀", "⚡", "💻", "📚", "🤖", "🎓", "🏛️", "🎨", "⚽", "🔬"];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-lg rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
              COMMUNITY DIRECTORY PROPOSAL
            </span>
          </div>

          <h2 className="text-xl font-bold font-heading">
            Create or Propose a Campus Guild
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Establish a verified batch cohort, study circle, or student interest club on College Nexus.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Emblem selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Monogram / Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {sampleEmblems.map((emoji) => (
                <button
                  type="button"
                  key={emoji}
                  onClick={() => setEmblem(emoji)}
                  className={`w-9 h-9 rounded-xl border text-lg flex items-center justify-center transition-all cursor-pointer ${
                    emblem === emoji
                      ? "border-red-600 bg-red-50 ring-2 ring-red-600/20"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Community Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mech 2026 Core, AI Guild"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 bg-white"
              >
                <option value="Batch">Batch & Cohort</option>
                <option value="Tech">Tech & Engineering</option>
                <option value="Campus">Campus & General</option>
                <option value="Clubs">Clubs & Societies</option>
                <option value="Department">Department Specific</option>
              </select>
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Short Tagline *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="One line explaining what this community is for"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description & Purpose
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the activities, syllabus topics, or meetings held by this guild..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Python, Workshop, 3rd Sem, Gate"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          {/* Privacy & Auth */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-800 block">
                Roll Number Restricted
              </span>
              <span className="text-[11px] text-slate-500">
                Only verified KGEC students can view and join
              </span>
            </div>
            <input
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 text-red-600 rounded border-slate-300 focus:ring-red-500 cursor-pointer"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Launch Community</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
