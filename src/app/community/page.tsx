"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FixedCampusBackground from "@/components/FixedCampusBackground";
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
    <main className="min-h-screen bg-[#070e0a] text-[#f5f9f6] relative selection:bg-[#c79e4d] selection:text-[#0b1510] flex flex-col justify-between overflow-x-hidden">
      {/* Global Fixed Campus Background with cross-fades matching home page */}
      <FixedCampusBackground />

      {/* Navigation Header */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Main Content Area */}
      <div className="pt-28 pb-20 relative z-10">
        
        {/* HERO BANNER SECTION */}
        <section id="hero" className="relative py-10 md:py-16">
          {/* Ambient Lighting Glow */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070e0a]/70 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
                <span>KGEC COMMUNITAS // ZERO NOISE COLLEGIATE HUBS</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.12] mb-4 drop-shadow-xl">
                Campus Communities &amp; <br className="hidden sm:inline" />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d]">
                  Cohort Guilds.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#9cb0a2] leading-relaxed mb-6 max-w-2xl font-light drop-shadow-xs">
                Replace cluttered WhatsApp groups with dedicated, authenticated KGEC hubs.
                Access verified batch updates, open-source codebases, and all-campus culture with instant peer collaboration.
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 px-6 bg-[#070e0a]/15 backdrop-blur-md border border-white/25 sm:border-[#c79e4d]/35 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] max-w-2xl divide-y sm:divide-y-0 sm:divide-x divide-white/10">
                <div>
                  <span className="text-xl sm:text-2xl font-bold font-serif text-white block leading-tight">
                    {communities.length}
                  </span>
                  <span className="text-[10px] font-mono text-[#deb86d] uppercase tracking-wider">
                    Active Guilds
                  </span>
                </div>
                <div className="sm:pl-4">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-[#deb86d] block leading-tight">
                    7,400+
                  </span>
                  <span className="text-[10px] font-mono text-[#9cb0a2] uppercase tracking-wider">
                    Enrolled KGECians
                  </span>
                </div>
                <div className="sm:pl-4 pt-2 sm:pt-0">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-white block leading-tight">
                    100%
                  </span>
                  <span className="text-[10px] font-mono text-[#9cb0a2] uppercase tracking-wider">
                    Roll Verified
                  </span>
                </div>
                <div className="sm:pl-4 pt-2 sm:pt-0">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-emerald-400 block leading-tight">
                    Zero
                  </span>
                  <span className="text-[10px] font-mono text-[#9cb0a2] uppercase tracking-wider">
                    Spam &amp; Noise
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PRIMARY SPOTLIGHT: THE 3 CORE COMMUNITIES */}
        <section id="portals" className="py-12 sm:py-16 relative bg-transparent overflow-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#070e0a]/65 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-2 backdrop-blur-md shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-[#c79e4d]" />
                  <span>CAMPUS SPOTLIGHT // HIGHEST ENGAGEMENT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight drop-shadow-xl">
                  Featured Campus Guilds
                </h2>
                <p className="text-xs sm:text-sm text-[#dbe7df] font-light mt-1 drop-shadow-sm">
                  The most active collegiate communities at KGEC
                </p>
              </div>

              <button
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] text-xs font-bold font-mono uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Propose Guild</span>
              </button>
            </div>

            {/* Spotlight Cards Grid (Ultra-Transparent Glass matching HeritageSection and CampusExplorer) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightCommunities.map((comm) => (
                <div
                  key={comm.id}
                  onClick={() => setSelectedCommunity(comm)}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/15 hover:bg-[#070e0a]/25 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] p-6 sm:p-7 transition-all duration-300 cursor-pointer shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl flex flex-col justify-between"
                >
                  {/* Top Gold Shimmer Highlight Bar */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

                  {/* Ambient Hover Glow Orb */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#c79e4d]/10 rounded-full blur-2xl pointer-events-none group-hover:bg-[#c79e4d]/20 transition-all duration-700"></div>

                  {/* Decorative Background Watermark */}
                  <div className="absolute -right-2 -bottom-2 text-7xl opacity-[0.06] pointer-events-none select-none font-bold group-hover:scale-110 group-hover:opacity-[0.14] transition-transform duration-700">
                    {comm.emblem}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      {/* Monogram Box with Translucent Glass */}
                      <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/25 flex items-center justify-center text-2xl group-hover:scale-105 group-hover:border-[#deb86d] transition-all duration-300 backdrop-blur-xs shadow-xs shrink-0">
                        <span>{comm.emblem}</span>
                      </div>

                      <div className="flex flex-col items-end gap-1.5">
                        <span className="text-[9px] font-mono px-2.5 py-0.5 bg-black/25 backdrop-blur-xs text-[#deb86d] font-bold rounded-full border border-white/20 uppercase tracking-wider">
                          {comm.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#9cb0a2] flex items-center gap-1.5 bg-black/25 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/15">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span>{comm.activeCount} online</span>
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#deb86d] transition-colors flex items-center gap-2 leading-snug drop-shadow-md">
                      <span>{comm.name}</span>
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    </h3>

                    <p className="text-xs text-[#dbe7de] font-normal mt-2 line-clamp-2 leading-relaxed drop-shadow-xs">
                      {comm.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/15 mt-6 flex items-center justify-between text-xs relative z-10">
                    <span className="font-mono text-[#deb86d] text-[11px] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#deb86d]" />
                      <span><strong className="text-white font-medium">{comm.memberCount}</strong> KGECians</span>
                    </span>

                    <span className="px-3.5 py-1.5 rounded-lg bg-white/10 group-hover:bg-[#c79e4d] text-white group-hover:text-[#08120c] border border-white/25 group-hover:border-[#c79e4d] font-semibold text-xs flex items-center gap-1.5 transition-all duration-300 font-mono uppercase tracking-wider shadow-xs backdrop-blur-xs">
                      <span>Enter Hub</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEARCH, FILTER & COMMUNITY DIRECTORY */}
        <section id="explorer" className="py-12 sm:py-16 relative bg-transparent overflow-visible">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Directory Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070e0a]/65 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-3 backdrop-blur-md shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
                <span>CAMPUS COMMUNITY DIRECTORY // 全方位検索</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight mb-3 drop-shadow-xl">
                Explore All Guilds
              </h2>
              <p className="text-xs sm:text-sm text-[#d4e4da] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
                Browse verified engineering departments, student cohorts, clubs, and interest hubs across KGEC.
              </p>
            </div>

            {/* Controls Bar (Ultra-Transparent Glass matching CampusExplorer) */}
            <div className="bg-[#070e0a]/15 hover:bg-[#070e0a]/25 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/30 rounded-2xl p-4 sm:p-5 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] space-y-4 mb-8 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#deb86d] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by community name, batch year, topic (e.g. '2025', 'Dev Community', 'Hostel', 'Open Source')..."
                    className="w-full pl-9 pr-9 py-2.5 bg-[#070e0a]/30 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 focus:border-[#c79e4d] rounded-xl text-xs font-mono text-white placeholder-[#8fa597] focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9cb0a2] hover:text-white"
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
                    className={`px-3 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer border backdrop-blur-md ${
                      filterJoinedOnly
                        ? "bg-[#c79e4d] text-[#08120c] font-bold border-[#c79e4d]"
                        : "bg-[#070e0a]/30 text-[#dbe7df] border-white/20 hover:border-[#c79e4d] hover:text-[#deb86d]"
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5 inline mr-1" />
                    <span>My Joined Hubs</span>
                  </button>

                  {/* Sort selector */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 bg-[#070e0a]/40 backdrop-blur-md border border-white/20 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#c79e4d] cursor-pointer"
                  >
                    <option value="active">Sort: Most Active</option>
                    <option value="members">Sort: Total Members</option>
                    <option value="alpha">Sort: Alphabetical</option>
                  </select>

                  {/* Propose Community CTA */}
                  <button
                    onClick={() => setCreateModalOpen(true)}
                    className="px-3.5 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] text-xs font-bold font-mono uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Propose Guild</span>
                    <span className="sm:hidden">Create</span>
                  </button>
                </div>
              </div>

              {/* Category Filter Chips */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-0.5 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer backdrop-blur-md ${
                        isSelected
                          ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                          : "bg-[#070e0a]/30 border border-white/20 text-[#dbe7df] hover:border-[#c79e4d] hover:text-[#deb86d]"
                      }`}
                    >
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Result Count and Filters status */}
            <div className="flex items-center justify-between text-xs text-[#9cb0a2] font-mono mb-6 px-1">
              <span>
                Showing <strong className="text-white font-semibold">{filteredCommunities.length}</strong> of{" "}
                <strong className="text-[#deb86d] font-semibold">{communities.length}</strong> campus communities
              </span>
              {(searchQuery || selectedCategory !== "All" || filterJoinedOnly) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setFilterJoinedOnly(false);
                  }}
                  className="text-[#deb86d] hover:text-[#fcedca] hover:underline cursor-pointer flex items-center gap-1"
                >
                  <span>Reset all filters</span>
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Communities Grid - Ultra Transparent Glass Floating on Campus Artwork */}
            {filteredCommunities.length === 0 ? (
              <div className="bg-[#070e0a]/15 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/30 rounded-3xl p-12 text-center max-w-md mx-auto my-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#deb86d] flex items-center justify-center mx-auto mb-3 border border-white/20 backdrop-blur-xs">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-base font-serif font-bold text-white">
                  No matching communities found
                </h3>
                <p className="text-xs text-[#9cb0a2] mt-1 mb-4 leading-relaxed font-light">
                  We couldn&apos;t find any guild matching &quot;{searchQuery}&quot;. You can propose
                  and launch this community for your cohort!
                </p>
                <button
                  onClick={() => setCreateModalOpen(true)}
                  className="px-4 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] text-xs font-bold font-mono uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
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
          </div>
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
          <div className="bg-[#0b1510]/95 backdrop-blur-xl border border-[#c79e4d]/50 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
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
        <div className="min-h-screen bg-[#070e0a] flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-[#deb86d] uppercase tracking-widest">
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
