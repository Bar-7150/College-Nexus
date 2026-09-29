"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import CommunityCard from "@/components/community/CommunityCard";
import CommunityRoomModal from "@/components/community/CommunityRoomModal";
import CreateCommunityModal from "@/components/community/CreateCommunityModal";
import RedUnderline from "@/components/RedUnderline";
import {
  INITIAL_COMMUNITIES,
  Community,
  CommunityPost,
} from "@/data/communityData";
import {
  Users,
  Search,
  Plus,
  Sparkles,
  ShieldCheck,
  Filter,
  CheckCircle,
  MessageSquare,
  Bookmark,
  TrendingUp,
  X,
  Layers,
  ArrowRight,
  Flame,
} from "lucide-react";

function CommunityPageContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialId = searchParams.get("id");

  // State
  const [communities, setCommunities] =
    useState<Community[]>(INITIAL_COMMUNITIES);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [filterJoinedOnly, setFilterJoinedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<"active" | "members" | "alpha">("active");

  // Modals
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(
    () => {
      if (initialId) {
        return (
          INITIAL_COMMUNITIES.find((c) => c.id === initialId) || null
        );
      }
      return null;
    }
  );
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle Join / Leave community
  const handleToggleJoin = (communityId: string) => {
    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          const willJoin = !c.isJoined;
          showToast(
            willJoin
              ? `You joined ${c.name}! Welcome to the guild. 🎉`
              : `You left ${c.name}.`
          );
          return {
            ...c,
            isJoined: willJoin,
            memberCount: willJoin ? c.memberCount + 1 : Math.max(1, c.memberCount - 1),
          };
        }
        return c;
      })
    );

    // Update active modal community if open
    setSelectedCommunity((prev) => {
      if (prev && prev.id === communityId) {
        const willJoin = !prev.isJoined;
        return {
          ...prev,
          isJoined: willJoin,
          memberCount: willJoin ? prev.memberCount + 1 : Math.max(1, prev.memberCount - 1),
        };
      }
      return prev;
    });
  };

  // Add post inside community
  const handleAddPost = (communityId: string, postData: Partial<CommunityPost>) => {
    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: "Arjun Sen",
      authorRoll: "22/CSE/042",
      authorAvatar: "AS",
      authorBadge: "Verified Student",
      timeAgo: "Just now",
      content: postData.content || "",
      tag: postData.tag || "General",
      channel: postData.channel || "#general-chat",
      likes: 1,
      userLiked: true,
      replies: [],
    };

    const updateList = (list: Community[]) =>
      list.map((c) => {
        if (c.id === communityId) {
          return {
            ...c,
            posts: [newPost, ...c.posts],
          };
        }
        return c;
      });

    setCommunities(updateList);
    setSelectedCommunity((prev) => {
      if (prev && prev.id === communityId) {
        return {
          ...prev,
          posts: [newPost, ...prev.posts],
        };
      }
      return prev;
    });

    showToast("Post shared to the community! 🚀");
  };

  // Like post
  const handleLikePost = (communityId: string, postId: string) => {
    const updatePosts = (posts: CommunityPost[]) =>
      posts.map((p) => {
        if (p.id === postId) {
          const willLike = !p.userLiked;
          return {
            ...p,
            userLiked: willLike,
            likes: willLike ? p.likes + 1 : Math.max(0, p.likes - 1),
          };
        }
        return p;
      });

    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          return {
            ...c,
            posts: updatePosts(c.posts),
          };
        }
        return c;
      })
    );

    setSelectedCommunity((prev) => {
      if (prev && prev.id === communityId) {
        return {
          ...prev,
          posts: updatePosts(prev.posts),
        };
      }
      return prev;
    });
  };

  // Add comment
  const handleAddComment = (
    communityId: string,
    postId: string,
    commentText: string
  ) => {
    const newComment = {
      id: `c-${Date.now()}`,
      authorName: "Arjun Sen",
      authorRoll: "22/CSE/042",
      authorAvatar: "AS",
      timeAgo: "Just now",
      content: commentText,
      likes: 0,
    };

    const updatePosts = (posts: CommunityPost[]) =>
      posts.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            replies: [...p.replies, newComment],
          };
        }
        return p;
      });

    setCommunities((prev) =>
      prev.map((c) => {
        if (c.id === communityId) {
          return {
            ...c,
            posts: updatePosts(c.posts),
          };
        }
        return c;
      })
    );

    setSelectedCommunity((prev) => {
      if (prev && prev.id === communityId) {
        return {
          ...prev,
          posts: updatePosts(prev.posts),
        };
      }
      return prev;
    });

    showToast("Reply posted! 💬");
  };

  // Handle creating new community
  const handleCreateCommunity = (data: Partial<Community>) => {
    const newComm: Community = {
      id: `comm-${Date.now()}`,
      name: data.name || "Untitled Community",
      shortName: data.shortName || "Community",
      tagline: data.tagline || "",
      description: data.description || "",
      category: data.category || "Tech",
      memberCount: 1,
      activeCount: 1,
      isVerified: false,
      isPrivate: data.isPrivate || false,
      isJoined: true,
      tags: data.tags || ["KGEC"],
      bannerGradient: data.bannerGradient || "from-slate-700 to-slate-900",
      themeColor: "red",
      emblem: data.emblem || "🚀",
      lead: data.lead || {
        name: "Arjun Sen",
        role: "Founder",
        roll: "22/CSE/042",
        avatar: "AS",
      },
      announcements: data.announcements || [],
      channels: data.channels || [
        { id: "general", name: "#general-chat", description: "General community chatter" },
      ],
      posts: data.posts || [],
      resources: data.resources || [],
      rules: data.rules || ["Be respectful to all members"],
    };

    setCommunities((prev) => [newComm, ...prev]);
    showToast(`Guild "${newComm.name}" established! You are the founder.`);
    setSelectedCommunity(newComm);
  };

  // Filter & Sort
  const filteredCommunities = useMemo(() => {
    return communities
      .filter((c) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = c.name.toLowerCase().includes(q);
          const matchTagline = c.tagline.toLowerCase().includes(q);
          const matchDesc = c.description.toLowerCase().includes(q);
          const matchTags = c.tags.some((t) => t.toLowerCase().includes(q));
          const matchCategory = c.category.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchDesc && !matchTags && !matchCategory) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== "All") {
          if (c.category !== selectedCategory) {
            return false;
          }
        }

        // Joined filter
        if (filterJoinedOnly && !c.isJoined) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "active") return b.activeCount - a.activeCount;
        if (sortBy === "members") return b.memberCount - a.memberCount;
        if (sortBy === "alpha") return a.name.localeCompare(b.name);
        return 0;
      });
  }, [communities, searchQuery, selectedCategory, filterJoinedOnly, sortBy]);

  // Specific 3 requested sample communities for spotlight
  const spotlightCommunities = useMemo(() => {
    const batch29 = communities.find((c) => c.id === "batch-2025-2029");
    const devComm = communities.find((c) => c.id === "dev-community");
    const kgecians = communities.find((c) => c.id === "kgecians");
    return [batch29, devComm, kgecians].filter(Boolean) as Community[];
  }, [communities]);

  const categories = [
    { id: "All", label: "All Hubs" },
    { id: "Batch", label: "Batch & Cohorts" },
    { id: "Tech", label: "Tech & Coding" },
    { id: "Campus", label: "Campus Lounge" },
    { id: "Clubs", label: "Clubs & Societies" },
  ];

  return (
    <main className="min-h-screen bg-[#fbf9f5] text-[#1a1a1a] selection:bg-[#b93a32] selection:text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Main Content Area */}
      <div className="pt-24 pb-20">
        
        {/* HERO BANNER SECTION */}
        <section className="relative overflow-hidden bg-slate-50 border-b border-slate-200/80 py-12 md:py-16">
          <div className="absolute inset-0 bg-tech-grid opacity-40 pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-semibold tracking-wide mb-4">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
                <span>KGEC COMMUNITAS // ZERO NOISE COLLEGIATE HUBS</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl font-heading font-bold tracking-tight text-slate-900 leading-[1.15] mb-4">
                Campus Communities & <br className="hidden sm:inline" />
                <span className="relative inline-block text-slate-900">
                  Cohort Guilds.
                  <RedUnderline className="absolute -bottom-1.5 sm:-bottom-2.5 left-0" />
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-2xl">
                Replace cluttered WhatsApp groups with dedicated, authenticated KGEC hubs.
                Access verified batch updates, open-source codebases, and all-campus culture with instant peer collaboration.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-5 bg-white border border-slate-200 rounded-2xl shadow-xs max-w-2xl">
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block leading-tight">
                    {communities.length}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Active Guilds
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-heading text-red-600 block leading-tight">
                    7,400+
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Enrolled KGECians
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-heading text-slate-900 block leading-tight">
                    100%
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Roll Verified
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-heading text-emerald-600 block leading-tight">
                    Zero
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                    Spam & Noise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIMARY SPOTLIGHT: THE 3 CORE COMMUNITIES (Batch 2025-2029, Dev Community, KGECians) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-red-50 text-red-600 rounded-lg">
                  <Flame className="w-4 h-4 fill-red-600 text-red-600" />
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 font-heading">
                    Featured Campus Guilds
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Highest engagement collegiate communities at KGEC
                  </p>
                </div>
              </div>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Propose Guild</span>
              </button>
            </div>

            {/* Spotlight Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {spotlightCommunities.map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => setSelectedCommunity(comm)}
                  className="group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-red-300 rounded-2xl p-4 transition-all duration-200 cursor-pointer shadow-2xs hover:shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
                        <span>{comm.emblem}</span>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-red-50 text-red-600 font-bold rounded">
                          {comm.category.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 mt-1 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          {comm.activeCount} online
                        </span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors font-heading flex items-center gap-1.5">
                      <span>{comm.name}</span>
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                      {comm.tagline}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 mt-3 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 text-[11px]">
                      <strong>{comm.memberCount}</strong> KGECians
                    </span>

                    <span className="text-red-600 font-semibold text-xs flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      <span>Enter Hub</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH, FILTER & COMMUNITY DIRECTORY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          
          {/* Controls Bar */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs space-y-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by community name, batch year, topic (e.g. '2025', 'Dev Community', 'Hostel', 'Open Source')..."
                  className="w-full pl-9 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-red-600 focus:bg-white text-slate-900"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Joined Only Filter */}
                <button
                  onClick={() => setFilterJoinedOnly(!filterJoinedOnly)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border ${
                    filterJoinedOnly
                      ? "bg-red-50 text-red-600 border-red-200"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>My Joined Hubs</span>
                </button>

                {/* Sort selector */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="active">Sort: Most Active</option>
                  <option value="members">Sort: Total Members</option>
                  <option value="alpha">Sort: Alphabetical</option>
                </select>

                {/* Propose Community CTA */}
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span className="hidden sm:inline">Propose Guild</span>
                  <span className="sm:hidden">Create</span>
                </button>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`py-1.5 px-3.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-2xs"
                        : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Result Count and Filters status */}
          <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-4 px-1">
            <span>
              Showing <strong>{filteredCommunities.length}</strong> of{" "}
              {communities.length} campus communities
            </span>
            {(searchQuery || selectedCategory !== "All" || filterJoinedOnly) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setFilterJoinedOnly(false);
                }}
                className="text-red-600 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Reset all filters</span>
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Communities Grid */}
          {filteredCommunities.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-8">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800 font-heading">
                No matching communities found
              </h3>
              <p className="text-xs text-slate-500 mt-1 mb-4 leading-relaxed">
                We couldn&apos;t find any guild matching &quot;{searchQuery}&quot;. You can propose
                and launch this community for your cohort!
              </p>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Launch &quot;{searchQuery || "New Community"}&quot;
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  onSelect={(c) => setSelectedCommunity(c)}
                  onToggleJoin={handleToggleJoin}
                />
              ))}
            </div>
          )}
        </section>

      </div>

      {/* Community Detail Room Modal */}
      {selectedCommunity && (
        <CommunityRoomModal
          community={selectedCommunity}
          onClose={() => setSelectedCommunity(null)}
          onToggleJoin={handleToggleJoin}
          onAddPost={handleAddPost}
          onLikePost={handleLikePost}
          onAddComment={handleAddComment}
        />
      )}

      {/* Create / Propose Community Modal */}
      <CreateCommunityModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateCommunity}
      />

      {/* Login / Roll Modal */}
      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 border border-slate-700 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer />
    </main>
  );
}

export default function CommunityPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-slate-500">
              Loading KGEC Communitas...
            </p>
          </div>
        </div>
      }
    >
      <CommunityPageContent />
    </Suspense>
  );
}
