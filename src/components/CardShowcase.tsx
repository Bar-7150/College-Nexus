"use client";

import React, { useState, useMemo } from "react";
import {
  MOCK_VAULT_ITEMS,
  MOCK_NOTICES,
  MOCK_LOST_FOUND,
  MOCK_MARKETPLACE,
  KGEC_DEPARTMENTS,
  VaultItem,
  LostFoundItem,
} from "@/data/mockData";
import ClaimModal from "./ClaimModal";
import {
  FileText,
  Download,
  CheckCircle2,
  Bell,
  Clock,
  MapPin,
  Tag,
  Shield,
  MessageSquare,
  Search,
  ExternalLink,
} from "lucide-react";

export default function CardShowcase() {
  const [activeTab, setActiveTab] = useState<"vault" | "notices" | "lostfound" | "marketplace">("vault");
  const [deptFilter, setDeptFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClaimItem, setSelectedClaimItem] = useState<LostFoundItem | null>(null);
  const [downloadSuccessMsg, setDownloadSuccessMsg] = useState<string | null>(null);

  // Vault Items Filter
  const filteredVault = useMemo(() => {
    return MOCK_VAULT_ITEMS.filter((item) => {
      const matchDept = deptFilter === "ALL" || item.department === deptFilter;
      const matchSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchDept && matchSearch;
    });
  }, [deptFilter, searchQuery]);

  const handleDownload = (item: VaultItem) => {
    setDownloadSuccessMsg(`Accessing verified PDF for ${item.subjectCode} (${item.title.slice(0, 30)}...)`);
    setTimeout(() => {
      setDownloadSuccessMsg(null);
    }, 3500);
  };

  return (
    <section id="vault" className="py-20 md:py-28 bg-slate-50 border-b border-slate-200/80 relative overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-2.5">
              <span className="w-6 h-[2px] bg-red-600 rounded-full"></span>
              <span className="text-[11px] font-bold tracking-[0.2em] text-red-600 uppercase font-mono">
                CAMPUS COMPONENT VAULT // 各種カード
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-slate-900 tracking-tight">
              Necessary <span className="text-[#b93a32]">Card Components</span>
            </h2>
          </div>

          <p className="text-sm text-slate-600 max-w-sm leading-relaxed">
            Engineered specifically for engineering campus workflows: academic taxonomy, verifiable circulars, private lost & found, and student equipment exchange.
          </p>
        </div>

        {/* Modern Tab Bar */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-200/70 rounded-xl mb-8 w-max max-w-full">
          {[
            { id: "vault", label: "ACADEMIC VAULT CARDS", count: "850+ PYQs" },
            { id: "notices", label: "THE BOARD NOTICES", count: "4 Circulars" },
            { id: "lostfound", label: "LOST & FOUND RECOVERY", count: "4 Active" },
            { id: "marketplace", label: "MARKETPLACE LISTINGS", count: "4 Items" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery("");
              }}
              className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all rounded-lg shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-sm font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? "bg-red-50 text-red-600 font-bold"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Download Success Toast */}
        {downloadSuccessMsg && (
          <div className="mb-6 p-4 bg-emerald-50 border-l-4 border-emerald-600 text-emerald-800 text-xs flex items-center justify-between rounded-lg shadow-xs animate-in slide-in-from-top duration-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{downloadSuccessMsg}</span>
            </div>
            <span className="font-mono text-[10px] uppercase font-bold text-emerald-700">
              SHA-256 VALIDATED
            </span>
          </div>
        )}

        {/* TAB 1: ACADEMIC VAULT CARDS */}
        {activeTab === "vault" && (
          <div className="space-y-6">
            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs">
              {/* Department Pills */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {KGEC_DEPARTMENTS.map((dept) => (
                  <button
                    key={dept.code}
                    onClick={() => setDeptFilter(dept.code)}
                    className={`px-3 py-1.5 text-xs font-mono tracking-wider transition-all cursor-pointer rounded-lg ${
                      deptFilter === dept.code
                        ? "bg-red-600 text-white font-bold shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                    }`}
                  >
                    {dept.code}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subject e.g. CS501, Analog..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white focus:outline-none rounded-lg font-mono"
                />
              </div>
            </div>

            {/* Grid of Vault Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVault.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Top Metadata Badges */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-50 text-[#b93a32] border border-red-200 rounded">
                          {item.department}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          Sem {item.semester}
                        </span>
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-900 text-white rounded">
                          {item.subjectCode}
                        </span>
                      </div>

                      {item.verified && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded shrink-0">
                          CR VERIFIED
                        </span>
                      )}
                    </div>

                    {/* Title in Zilla Slab */}
                    <h3 className="text-base font-heading font-bold text-slate-900 group-hover:text-[#b93a32] transition-colors leading-snug mb-3">
                      {item.title}
                    </h3>

                    {/* Metadata Box */}
                    <div className="text-xs text-slate-600 space-y-1 mb-4 font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Contributor:</span>
                        <span className="font-semibold text-slate-800">{item.contributor}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Roll Number:</span>
                        <span className="text-slate-700">{item.contributorRoll}</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] bg-slate-50 p-2 border border-slate-200/80 rounded mt-2">
                        <span className="text-slate-500">SHA-256 HASH:</span>
                        <span className="text-red-600 font-bold">{item.sha256}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono text-[11px]">
                      {item.pages} pgs · {item.downloads} downloads
                    </span>

                    <button
                      onClick={() => handleDownload(item)}
                      className="px-4 py-2 bg-slate-900 hover:bg-red-600 text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 rounded-lg cursor-pointer shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>ACCESS</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: THE BOARD NOTICES */}
        {activeTab === "notices" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="board">
            {MOCK_NOTICES.map((notice) => {
              const isUrgent = notice.category === "URGENT";
              const isPlacement = notice.category === "PLACEMENT";
              return (
                <div
                  key={notice.id}
                  className="bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    {/* Header Badges */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded uppercase ${
                            isUrgent
                              ? "bg-red-50 text-[#b93a32] border border-red-200"
                              : isPlacement
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {notice.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {notice.date}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-mono text-[#b93a32] font-semibold bg-red-50 px-2 py-0.5 rounded border border-red-100">
                        <Clock className="w-3 h-3" />
                        <span>{notice.expiresIn}</span>
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug mb-2">
                      {notice.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block">
                        {notice.issuer}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {notice.department}
                      </span>
                    </div>

                    <button
                      onClick={() => alert(`Verified notice #${notice.id} from institutional registrar.`)}
                      className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                    >
                      <span>DETAILS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: LOST & FOUND RECOVERY */}
        {activeTab === "lostfound" && (
          <div className="space-y-6">
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Shield className="w-4 h-4 text-red-600" />
                <span>
                  <strong>Anti-Theft Protocol:</strong> Specific concealed markings are held in escrow until claimant verifies exact marks.
                </span>
              </div>
              <span className="font-mono text-[10px] text-red-600 font-bold uppercase bg-red-50 px-2.5 py-1 rounded">
                ZERO PHONE NUMBER EXPOSURE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_LOST_FOUND.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {item.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          item.status === "Unclaimed"
                            ? "bg-red-50 text-[#b93a32] border border-red-200"
                            : item.status === "Pending Claim"
                            ? "bg-amber-50 text-amber-800 border border-amber-200"
                            : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-base font-heading font-bold text-slate-900 mb-2 leading-snug">
                      {item.itemName}
                    </h3>

                    <div className="space-y-1 text-xs text-slate-600 mb-4">
                      <div className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{item.locationFound}</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{item.dateTime}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-lg mb-4">
                      <span className="text-[10px] font-bold uppercase text-red-600 font-mono block mb-0.5">
                        Finder Escrow Alias:
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-900">
                        {item.finderAlias}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedClaimItem(item)}
                    disabled={item.status === "Recovered"}
                    className={`w-full py-2.5 text-xs font-bold tracking-wider uppercase transition-colors rounded-lg flex items-center justify-center gap-1.5 ${
                      item.status === "Recovered"
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-2xs"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{item.status === "Recovered" ? "RECOVERED" : "VERIFY & CLAIM"}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MARKETPLACE LISTINGS */}
        {activeTab === "marketplace" && (
          <div className="space-y-6" id="marketplace">
            <div className="p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
              <div className="flex items-center gap-2 text-slate-700">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>
                  <strong>KGEC Student Equipment Exchange:</strong> Buy or sell used drawing instruments, aprons, and textbooks. 0% platform fee.
                </span>
              </div>
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                IN-PERSON HANDOFF
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_MARKETPLACE.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#e5e0d8] hover:border-[#b93a32]/60 p-6 rounded-2xl transition-all duration-200 flex flex-col justify-between shadow-xs hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                        {item.condition}
                      </span>
                    </div>

                    <h3 className="text-base font-heading font-bold text-slate-900 mb-2 leading-snug group-hover:text-[#b93a32] transition-colors">
                      {item.title}
                    </h3>

                    {/* Price with savings */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-heading font-bold text-slate-900">
                        ₹{item.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        SAVE {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-3 border-t border-slate-100 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Seller:</span>
                        <strong className="text-slate-800 font-mono">{item.sellerMaskedId}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Cohort:</span>
                        <span>{item.sellerYear} ({item.sellerDept})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Pickup:</span>
                        <strong className="text-slate-800">{item.pickupLandmark}</strong>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      alert(`Initiated private in-app handshake request with ${item.sellerMaskedId} for "${item.title}". Check your message requests drawer.`);
                    }}
                    className="w-full py-2.5 bg-slate-100 hover:bg-red-600 hover:text-white text-slate-800 text-xs font-bold tracking-wider uppercase transition-colors rounded-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>CHAT WITH SELLER</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Claim Modal */}
      {selectedClaimItem && (
        <ClaimModal
          item={selectedClaimItem}
          onClose={() => setSelectedClaimItem(null)}
        />
      )}
    </section>
  );
}
