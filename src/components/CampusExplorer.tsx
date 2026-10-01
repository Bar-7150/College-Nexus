"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import {
  MOCK_VAULT_ITEMS,
  MOCK_NOTICES,
  MOCK_LOST_FOUND,
  MOCK_MARKETPLACE,
  VaultItem,
  LostFoundItem,
  NoticeItem,
  MarketplaceItem,
} from "@/data/mockData";
import ClaimModal from "./ClaimModal";
import ScrollReveal from "./ScrollReveal";
import {
  Search,
  Download,
  CheckCircle2,
  Bell,
  Clock,
  MapPin,
  Tag,
  Shield,
  MessageSquare,
  ExternalLink,
  BookOpen,
  ShoppingBag,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  FileText,
  Star,
  X,
} from "lucide-react";

interface CampusExplorerProps {
  onOpenLoginModal?: () => void;
  initialCategory?: "ALL" | "VAULT" | "NOTICES" | "LOSTFOUND" | "MARKETPLACE" | "CLUBS";
  initialDeptFilter?: string;
  beforeFilters?: React.ReactNode;
  additionalSubjects?: Array<{
    department: string;
    name: string;
    code: string;
    semester: string;
    description: string;
  }>;
}

export default function CampusExplorer({
  onOpenLoginModal,
  initialCategory = "ALL",
  initialDeptFilter = "ALL",
  beforeFilters,
  additionalSubjects = [],
}: CampusExplorerProps) {
    const { profile } = useAuth();
  const [activeCategory, setActiveCategory] = useState<
    "ALL" | "VAULT" | "NOTICES" | "LOSTFOUND" | "MARKETPLACE" | "CLUBS"
  >(initialCategory);
  const [deptFilter, setDeptFilter] = useState<string>(initialDeptFilter);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedClaimItem, setSelectedClaimItem] = useState<LostFoundItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const ITEMS_PER_PAGE = 6; // Maximum 2 rows (3 columns x 2 rows)

  // Reset page when category, branch, or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, deptFilter, searchQuery]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Aggregated Explorer items
  const aggregatedCards = useMemo(() => {
    let list: Array<{
      id: string;
      category: "VAULT" | "NOTICES" | "LOSTFOUND" | "MARKETPLACE" | "CLUBS";
      categoryLabel: string;
      title: string;
      deptOrMeta: string;
      metaDetail: string;
      ratingOrStatus: string;
      desc: string;
      actionText: string;
      rawItem?: any;
    }> = [];

    // Vault Items
    MOCK_VAULT_ITEMS.forEach((v) => {
      list.push({
        id: v.id,
        category: "VAULT",
        categoryLabel: `${v.type} · ${v.year}`,
        title: v.title,
        deptOrMeta: `${v.department} · Sem ${v.semester}`,
        metaDetail: `${v.pages} Pages PDF · ${v.downloads} Downloads`,
        ratingOrStatus: "5.0 ★ CR-Verified",
        desc: `Verified academic notes for ${v.subjectName} (${v.subjectCode}) contributed by ${v.contributor}. Cryptographically verified.`,
        actionText: "Download Paper",
        rawItem: v,
      });
    });

    // Notices
    MOCK_NOTICES.forEach((n) => {
      list.push({
        id: n.id,
        category: "NOTICES",
        categoryLabel: `${n.category} CIRCULAR`,
        title: n.title,
        deptOrMeta: n.department,
        metaDetail: `${n.issuer} · ${n.expiresIn}`,
        ratingOrStatus: n.pinned ? "Pinned Notice" : "Official Memo",
        desc: n.summary,
        actionText: "Read Memo",
        rawItem: n,
      });
    });

    // Lost & Found
    MOCK_LOST_FOUND.forEach((lf) => {
      list.push({
        id: lf.id,
        category: "LOSTFOUND",
        categoryLabel: `LOST & FOUND · ${lf.category.toUpperCase()}`,
        title: lf.itemName,
        deptOrMeta: lf.locationFound,
        metaDetail: `Found: ${lf.dateTime} · ${lf.finderAlias}`,
        ratingOrStatus: lf.status,
        desc: `Safely held in custody. Owner must verify confidential distinguishing marks without public phone exposure.`,
        actionText: "Claim Item",
        rawItem: lf,
      });
    });

    // Marketplace
    MOCK_MARKETPLACE.forEach((m) => {
      list.push({
        id: m.id,
        category: "MARKETPLACE",
        categoryLabel: `MARKETPLACE · ${m.category.toUpperCase()}`,
        title: m.title,
        deptOrMeta: `₹${m.price} (Orig ₹${m.originalPrice})`,
        metaDetail: `${m.sellerYear} (${m.sellerDept}) · ${m.pickupLandmark}`,
        ratingOrStatus: `${m.condition} Condition`,
        desc: `Available for direct student-to-student handover at campus canteen or library steps. 0% platform commissions.`,
        actionText: "Contact Seller",
        rawItem: m,
      });
    });

    // Filter by Category
    if (activeCategory !== "ALL") {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by Department
    if (deptFilter !== "ALL") {
      list = list.filter(
        (item) =>
          item.deptOrMeta.includes(deptFilter) ||
          item.title.toLowerCase().includes(deptFilter.toLowerCase())
      );
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q) ||
          item.deptOrMeta.toLowerCase().includes(q)
      );
    }

    return list;
  }, [activeCategory, deptFilter, searchQuery]);

  const totalPages = Math.ceil(aggregatedCards.length / ITEMS_PER_PAGE);

  // Strictly maximum 2 rows (6 cards on desktop: 3 cols x 2 rows)
  const displayedCards = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return aggregatedCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [aggregatedCards, currentPage, ITEMS_PER_PAGE]);

  const visibleAdditionalSubjects = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return additionalSubjects.filter((subject) => {
      const matchesDepartment = deptFilter === "ALL" || subject.department === deptFilter;
      const matchesSearch = !query || `${subject.name} ${subject.code} ${subject.description}`.toLowerCase().includes(query);
      return matchesDepartment && matchesSearch;
    });
  }, [additionalSubjects, deptFilter, searchQuery]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const explorerElem = document.getElementById("explorer");
    if (explorerElem) {
      const rect = explorerElem.getBoundingClientRect();
      if (rect.top < -50) {
        explorerElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="explorer" className="relative overflow-visible border-y border-[#c79e4d]/25 bg-[#08130d]/65 py-14 sm:py-20 bg-campus-grid">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section positioned cleanly over the library background */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#070e0a]/70 border border-[#c79e4d]/40 text-[#deb86d] text-[10px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c79e4d] animate-pulse"></span>
              <span>CAMPUS INTEL ARCHIVE // 全方位検索</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight mb-3 drop-shadow-lg">
              Interactive Campus Explorer
            </h2>

            <p className="text-xs sm:text-sm text-[#d4e4da] max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Explore verified study papers, active examination circulars, confidential lost &amp; found items, and peer equipment listings.
            </p>
          </div>
        </ScrollReveal>

        {beforeFilters}

        {/* Category Filter Pills (Horizontal Pill Bar with Frosted Glass) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "ALL", label: "All Resources", href: "/vault" },
              { id: "VAULT", label: "Academic Vault", href: "/vault" },
              { id: "NOTICES", label: "Official Notices", href: "/board/notic" },
              { id: "LOSTFOUND", label: "Lost & Found", href: "/board/lost" },
              { id: "MARKETPLACE", label: "Marketplace", href: "/marketplace" },
            ].map((tab) => (
              <Link
                key={tab.id}
                href={tab.href}
                className={`px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer backdrop-blur-md ${
                  activeCategory === tab.id
                    ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                    : "bg-[#070e0a]/50 border border-white/20 sm:border-[#c79e4d]/30 text-[#dbe7df] hover:border-[#c79e4d] hover:bg-[#070e0a]/75"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Search Simulator Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-[#deb86d] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PYQs, codes, notices..."
              className="w-full pl-9 pr-4 py-2 bg-[#070e0a]/50 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 focus:border-[#c79e4d] focus:outline-none rounded-full text-xs font-mono text-white placeholder-[#8fa597]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Department Quick Filter Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 text-xs font-mono">
          <span className="text-[#deb86d] text-[11px] uppercase mr-1">BRANCH:</span>
          {["ALL", "CSE", "ECE", "EE", "ME", "IT"].map((dept) => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1 rounded-lg border transition-colors cursor-pointer backdrop-blur-xs ${
                deptFilter === dept
                  ? "bg-[#c79e4d] border-[#c79e4d] text-[#08120c] font-bold"
                  : "bg-[#070e0a]/50 border-white/20 text-[#cde0d4] hover:border-[#c79e4d]"
              }`}
            >
              {dept}
            </button>
          ))}
          <span className="text-[11px] text-[#b4c8bb] ml-auto hidden sm:inline">
            {aggregatedCards.length > ITEMS_PER_PAGE ? (
              <>
                Showing <span className="text-white font-semibold">{(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, aggregatedCards.length)}</span> of <span className="text-[#deb86d] font-semibold">{aggregatedCards.length}</span> verified listings
              </>
            ) : (
              <>
                Showing <span className="text-white font-semibold">{aggregatedCards.length}</span> verified listings
              </>
            )}
          </span>
        </div>

        {/* 3-Column Luxury Card Grid (Maximum 2 rows = 6 items) with 90% Transparent Ultra-Glass and Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleAdditionalSubjects.map((subject) => (
            <ScrollReveal key={`subject-${subject.code}`} className="h-full">
              <Link
                href={`/vault/subject/${subject.code.toLowerCase()}`}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#c79e4d]/45 bg-[#070e0a]/20 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#deb86d] hover:bg-[#070e0a]/35"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between gap-2"><span className="rounded-full border border-[#c79e4d]/40 bg-[#c79e4d]/10 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider text-[#deb86d]">NEW SUBJECT</span><span className="text-[10px] font-mono text-[#cbe0d3]">{subject.department} · Sem {subject.semester}</span></div>
                  <h3 className="font-serif text-xl font-bold leading-snug text-white transition-colors group-hover:text-[#deb86d]">{subject.name}</h3>
                  <p className="mt-2 text-xs font-mono text-[#deb86d]">{subject.code}</p>
                  <p className="mt-4 text-xs leading-relaxed text-[#dbe7de]">{subject.description || "Student-created subject workspace ready for notes, PYQs, and syllabus resources."}</p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-[11px] font-mono text-[#9bb0a2]"><span>KGEC TAXONOMY</span><span className="text-[#deb86d]">OPEN SUBJECT →</span></div>
              </Link>
            </ScrollReveal>
          ))}
          {displayedCards.map((card, idx) => (
            <ScrollReveal key={card.id} delay={(idx % 3) * 120} className="h-full">
              <div
                className="h-full bg-[#070e0a]/10 hover:bg-[#070e0a]/20 backdrop-blur-md border border-white/25 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl transition-all duration-300 group"
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[9px] font-mono tracking-wider text-[#deb86d] uppercase font-bold px-2.5 py-0.5 bg-black/35 rounded-full border border-white/20">
                      {card.categoryLabel}
                    </span>
                    <span className="text-[10px] font-mono font-medium text-[#cbe0d3] bg-white/10 px-2 py-0.5 rounded">
                      {card.deptOrMeta}
                    </span>
                  </div>

                  {/* Card Title */}
                  {card.category === "VAULT" ? (
                    <Link
                      href={`/vault/subject/${card.rawItem.subjectCode.toLowerCase()}`}
                      className="block text-lg font-serif font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-[#deb86d] transition-colors drop-shadow-sm"
                    >
                      {card.title}
                    </Link>
                  ) : (
                    <h3 className="text-lg font-serif font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-[#deb86d] transition-colors drop-shadow-sm">
                      {card.title}
                    </h3>
                  )}

                  {/* Rating or Status Tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[11px] font-mono text-[#deb86d] font-semibold drop-shadow-xs">
                      {card.ratingOrStatus}
                    </span>
                    <span className="text-white/30">·</span>
                    <span className="text-[11px] text-[#a4b8ab] font-mono truncate">
                      {card.metaDetail}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#dbe7de] leading-relaxed mb-6 font-light drop-shadow-xs">
                    {card.desc}
                  </p>
                </div>

                {/* Action Button Strip */}
                <div className="pt-4 border-t border-white/15 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#9bb0a2]">
                    KGEC INTEL
                  </span>

                  <button
                    onClick={() => {
                      if (card.category === "LOSTFOUND") {
                        if (!profile) {
                          onOpenLoginModal?.();
                          return;
                        }
                        setSelectedClaimItem(card.rawItem);
                      } else if (card.category === "NOTICES") {
                        if (!profile) {
                          onOpenLoginModal?.();
                          return;
                        }
                        setSelectedNotice(card.rawItem);
                      } else if (card.category === "VAULT") {
                        if (!profile) {
                          onOpenLoginModal?.();
                          return;
                        }
                        setSelectedVaultItem(card.rawItem);
                      } else if (card.category === "MARKETPLACE") {
                        if (!profile) {
                          onOpenLoginModal?.();
                          return;
                        }
                        showToast(`Contacting seller (${card.rawItem.sellerMaskedId}) for in-person campus canteen exchange.`);
                      }
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#0b1510] border border-white/25 hover:border-[#c79e4d] rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs flex items-center gap-1.5 backdrop-blur-xs"
                  >
                    <span>{card.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pagination Controls - Keeping maximum 2 rows visible at all times */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 pt-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
                currentPage === 1
                  ? "border-white/10 text-white/25 cursor-not-allowed bg-transparent"
                  : "border-white/20 bg-[#070e0a]/60 text-[#dbe7df] hover:border-[#c79e4d] hover:text-[#deb86d] hover:bg-[#070e0a]/80"
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-8 h-8 rounded-lg border text-xs font-mono font-medium transition-all backdrop-blur-md cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-[#c79e4d] border-[#c79e4d] text-[#08120c] font-bold shadow-md"
                      : "bg-[#070e0a]/60 border-white/20 text-[#dbe7df] hover:border-[#c79e4d] hover:text-[#deb86d] hover:bg-[#070e0a]/80"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3.5 py-1.5 rounded-lg border text-xs font-mono transition-all flex items-center gap-1.5 backdrop-blur-md cursor-pointer ${
                currentPage === totalPages
                  ? "border-white/10 text-white/25 cursor-not-allowed bg-transparent"
                  : "border-white/20 bg-[#070e0a]/60 text-[#dbe7df] hover:border-[#c79e4d] hover:text-[#deb86d] hover:bg-[#070e0a]/80"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {displayedCards.length === 0 && (
          <div className="text-center py-16 bg-[#070e0a]/40 backdrop-blur-md rounded-2xl border border-white/20">
            <p className="text-sm font-serif text-white">
              No listings found matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setActiveCategory("ALL");
                setDeptFilter("ALL");
                setSearchQuery("");
              }}
              className="mt-3 text-xs font-mono text-[#deb86d] underline"
            >
              Reset all filters
            </button>
          </div>
        )}

      </div>

      {/* Interactive Claim Modal */}
      {selectedClaimItem && (
        <ClaimModal
          item={selectedClaimItem}
          onClose={() => setSelectedClaimItem(null)}
        />
      )}

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#0b1510] border border-[#213b2c] shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden text-white">
            <div className="bg-[#0e1a14] px-6 py-4 border-b border-[#1b3125] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c79e4d]"></span>
                <span className="text-xs font-mono tracking-wider text-[#deb86d] uppercase">
                  OFFICIAL CAMPUS CIRCULAR
                </span>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-[10px] font-mono text-[#deb86d] uppercase font-bold block mb-1">
                {selectedNotice.category} NOTICE · {selectedNotice.issuer}
              </span>
              <h3 className="text-xl font-serif font-bold text-white mb-3">
                {selectedNotice.title}
              </h3>
              <p className="text-xs text-[#9eb2a4] leading-relaxed mb-4">
                {selectedNotice.summary}
              </p>
              <div className="p-3.5 bg-[#122319] border border-[#1f3d2b] rounded-xl text-xs font-mono text-[#a4b8ab] mb-5 space-y-1">
                <div>Issued: {selectedNotice.date}</div>
                <div>Applies to: {selectedNotice.department}</div>
                <div className="text-[#deb86d] font-bold">{selectedNotice.expiresIn}</div>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="w-full py-2.5 bg-[#c79e4d] text-[#08120c] text-xs font-bold uppercase rounded-lg"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vault Detail Modal */}
      {selectedVaultItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#0b1510] border border-[#213b2c] shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden text-white">
            <div className="bg-[#0e1a14] px-6 py-4 border-b border-[#1b3125] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="text-xs font-mono tracking-wider text-[#deb86d] uppercase">
                  CRYPTOGRAPHIC VAULT DOCUMENT
                </span>
              </div>
              <button
                onClick={() => setSelectedVaultItem(null)}
                className="text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#172b20] text-[#deb86d] border border-[#2b4c37] rounded">
                  {selectedVaultItem.subjectCode}
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80 font-semibold">
                  CR VERIFIED
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2 leading-snug">
                {selectedVaultItem.title}
              </h3>
              <p className="text-xs text-[#9eb2a4] leading-relaxed mb-4">
                Archived paper for {selectedVaultItem.subjectName}. Contributed by {selectedVaultItem.contributor} ({selectedVaultItem.contributorRoll}) with verified faculty exam solutions.
              </p>
              <div className="p-3.5 bg-[#122319] border border-[#1f3d2b] rounded-xl text-xs font-mono text-[#a4b8ab] mb-5 space-y-1.5">
                <div className="flex justify-between">
                  <span>SHA-256 Hash:</span>
                  <span className="text-white font-bold">{selectedVaultItem.sha256}</span>
                </div>
                <div className="flex justify-between">
                  <span>File Volume:</span>
                  <span>{selectedVaultItem.pages} Pages PDF</span>
                </div>
                <div className="flex justify-between">
                  <span>Verified Downloads:</span>
                  <span className="text-emerald-400 font-bold">{selectedVaultItem.downloads} Students</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedVaultItem(null);
                  showToast(`Downloading verified PDF for ${selectedVaultItem.subjectCode}...`);
                }}
                className="w-full py-2.5 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] text-xs font-bold uppercase rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Verified PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0b1510] border border-[#c79e4d]/50 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs animate-in slide-in-from-bottom-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{toastMessage}</span>
        </div>
      )}

    </section>
  );
}
