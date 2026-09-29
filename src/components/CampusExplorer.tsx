"use client";

import React, { useState, useMemo } from "react";
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
  Eye,
  FileText,
  Star,
  X,
} from "lucide-react";

interface CampusExplorerProps {
  onOpenLoginModal?: () => void;
}

export default function CampusExplorer({ onOpenLoginModal }: CampusExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<
    "ALL" | "VAULT" | "NOTICES" | "LOSTFOUND" | "MARKETPLACE" | "CLUBS"
  >("ALL");
  const [deptFilter, setDeptFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedClaimItem, setSelectedClaimItem] = useState<LostFoundItem | null>(null);
  const [selectedNotice, setSelectedNotice] = useState<NoticeItem | null>(null);
  const [selectedVaultItem, setSelectedVaultItem] = useState<VaultItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  return (
    <section id="explorer" className="py-24 md:py-36 relative [clip-path:inset(0)] min-h-screen bg-[#070e0a]">
      {/* Full-Screen Edge-to-Edge Fixed Static Background: Historic Academic Library Watercolor Painting */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <img
          src="/kgec-library.jpg"
          alt="KGEC Academic Central Library Watercolor Artwork"
          className="w-full h-full object-cover object-[center_35%] scale-100 filter brightness-95 contrast-[1.03]"
        />

        {/* Ambient Translucent Vignette: Keeps watercolor library shelves, books & reading tables clearly visible */}
        <div className="absolute inset-0 bg-[#070e0a]/30"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e0a]/80 via-transparent to-[#070e0a]/85"></div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header Section positioned cleanly over the library background */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
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

        {/* Category Filter Pills (Horizontal Pill Bar with Frosted Glass) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: "ALL", label: "All Resources" },
              { id: "VAULT", label: "Academic Vault" },
              { id: "NOTICES", label: "Official Notices" },
              { id: "LOSTFOUND", label: "Lost & Found" },
              { id: "MARKETPLACE", label: "Marketplace" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider rounded-full transition-all shrink-0 cursor-pointer backdrop-blur-md ${
                  activeCategory === tab.id
                    ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-md"
                    : "bg-[#070e0a]/50 border border-white/20 sm:border-[#c79e4d]/30 text-[#dbe7df] hover:border-[#c79e4d] hover:bg-[#070e0a]/75"
                }`}
              >
                {tab.label}
              </button>
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
            Showing {aggregatedCards.length} verified listings
          </span>
        </div>

        {/* 3-Column Luxury Card Grid with 90% Transparent Ultra-Glass and Staggered Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aggregatedCards.map((card, idx) => (
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
                  <h3 className="text-lg font-serif font-bold text-white tracking-tight mb-2 leading-snug group-hover:text-[#deb86d] transition-colors drop-shadow-sm">
                    {card.title}
                  </h3>

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
                        setSelectedClaimItem(card.rawItem);
                      } else if (card.category === "NOTICES") {
                        setSelectedNotice(card.rawItem);
                      } else if (card.category === "VAULT") {
                        setSelectedVaultItem(card.rawItem);
                      } else if (card.category === "MARKETPLACE") {
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

        {aggregatedCards.length === 0 && (
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
