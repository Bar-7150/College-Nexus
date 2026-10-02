"use client";

import React, { useState } from "react";
import { X, ShoppingBag, Tag, IndianRupee, MapPin } from "lucide-react";
import { MarketplaceItem, saveMarketplace } from "@/lib/subjectStore";
import { useAuth } from "@/context/AuthContext";

interface MarketplaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded?: (item: MarketplaceItem) => void;
}

export default function MarketplaceModal({
  isOpen,
  onClose,
  onItemAdded,
}: MarketplaceModalProps) {
  const { profile } = useAuth();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<MarketplaceItem["category"]>("Tools");
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [condition, setCondition] = useState<MarketplaceItem["condition"]>("Like New");
  const [pickupLandmark, setPickupLandmark] = useState("Central Library Steps");
  const [sellerYear, setSellerYear] = useState("3rd Year");
  const [sellerDept, setSellerDept] = useState(profile?.department || "CSE");
  const [sellerMaskedId, setSellerMaskedId] = useState(profile ? `Roll ${profile.rollNumber}` : "Student #22");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !price) return;

    setIsSubmitting(true);
    const newItem: MarketplaceItem = {
      id: `m-${Date.now()}`,
      title: title.trim(),
      category,
      price: Math.max(0, parseInt(price, 10) || 0),
      originalPrice: Math.max(0, parseInt(originalPrice, 10) || parseInt(price, 10) || 0),
      condition,
      pickupLandmark: pickupLandmark.trim() || "Campus Canteen",
      sellerYear: sellerYear.trim() || "Student",
      sellerDept: sellerDept.trim() || "CSE",
      sellerMaskedId: sellerMaskedId.trim() || "Verified Student",
      dateListed: "Just now",
    };

    saveMarketplace(newItem);
    onItemAdded?.(newItem);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-[#c79e4d]/45 bg-[#0b1610] p-6 text-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#294231] mb-5">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#deb86d]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              0% FEE PEER MARKETPLACE
            </div>
            <h2 className="mt-1 font-serif text-2xl text-white">List Item for Sale</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[#9bb2a0] hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
              Item Title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Omega Engineering Mini-Drafter with Canvas Bag"
              className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MarketplaceItem["category"])}
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#deb86d]"
              >
                <option value="Tools">Tools &amp; Drafters</option>
                <option value="Books">Textbooks &amp; PYQs</option>
                <option value="Apparel">Lab Coats &amp; Gear</option>
                <option value="Electronics">Electronics &amp; Components</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as MarketplaceItem["condition"])}
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#deb86d]"
              >
                <option value="Like New">Like New (Mint)</option>
                <option value="Good">Good Condition</option>
                <option value="Fair">Fair / Usable</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Selling Price (₹)
              </label>
              <input
                required
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 250"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Original Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="e.g. 600"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>
          </div>

          {/* Pickup Landmark */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
              Pickup Landmark on Campus
            </label>
            <input
              required
              value={pickupLandmark}
              onChange={(e) => setPickupLandmark(e.target.value)}
              placeholder="e.g. Central Library Steps or Main Canteen Patio"
              className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
            />
          </div>

          {/* Seller Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Year
              </label>
              <input
                value={sellerYear}
                onChange={(e) => setSellerYear(e.target.value)}
                placeholder="e.g. 3rd Year"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Department
              </label>
              <select
                value={sellerDept}
                onChange={(e) => setSellerDept(e.target.value)}
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#deb86d]"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EE">EE</option>
                <option value="ME">ME</option>
                <option value="IT">IT</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Seller ID / Roll
              </label>
              <input
                value={sellerMaskedId}
                onChange={(e) => setSellerMaskedId(e.target.value)}
                placeholder="e.g. Roll 22/CSE/014"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-[#789080]">
            Direct peer-to-peer exchange on campus. No shipping fees or platform cuts.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Listing Item..." : "Publish Item to Campus Marketplace"}
          </button>
        </form>
      </div>
    </div>
  );
}
