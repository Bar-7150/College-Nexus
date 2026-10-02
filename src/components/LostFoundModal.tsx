"use client";

import React, { useState } from "react";
import { X, ShieldAlert, Sparkles, MapPin, Tag, Clock } from "lucide-react";
import { LostFoundItem, saveLostFound } from "@/lib/subjectStore";
import { useAuth } from "@/context/AuthContext";

interface LostFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
  onItemAdded?: (item: LostFoundItem) => void;
}

export default function LostFoundModal({
  isOpen,
  onClose,
  onItemAdded,
}: LostFoundModalProps) {
  const { profile } = useAuth();
  const [reportType, setReportType] = useState<"FOUND" | "LOST">("FOUND");
  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState<LostFoundItem["category"]>("Calculators");
  const [locationFound, setLocationFound] = useState("");
  const [dateTime, setDateTime] = useState("Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [finderAlias, setFinderAlias] = useState(profile ? `${profile.name} (${profile.department})` : "");
  const [hiddenClue, setHiddenClue] = useState("");
  const [imageType, setImageType] = useState<LostFoundItem["imageType"]>("calculator");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim() || !locationFound.trim()) return;

    setIsSubmitting(true);
    const newItem: LostFoundItem = {
      id: `lf-${Date.now()}`,
      itemName: itemName.trim(),
      category,
      locationFound: locationFound.trim(),
      dateTime: dateTime.trim() || "Just now",
      finderAlias: finderAlias.trim() || (reportType === "FOUND" ? "Campus Finder" : "Owner"),
      status: "Unclaimed",
      imageType,
      hiddenClue: hiddenClue.trim() || "No hidden clue specified.",
      reportType,
    };

    saveLostFound(newItem);
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
              <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-pulse"></span>
              CAMPUS RECOVERY PROTOCOL
            </div>
            <h2 className="mt-1 font-serif text-2xl text-white">
              {reportType === "FOUND" ? "Report Found Item" : "Report Lost Item"}
            </h2>
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
          {/* Report Type Toggle */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
              Protocol Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setReportType("FOUND");
                  setImageType("calculator");
                }}
                className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase font-semibold transition-all ${
                  reportType === "FOUND"
                    ? "bg-[#c79e4d] border-[#c79e4d] text-[#08120c] shadow-md"
                    : "bg-[#07110b] border-[#38513f] text-[#a9c0ae] hover:border-[#deb86d]"
                }`}
              >
                I Found an Item
              </button>
              <button
                type="button"
                onClick={() => setReportType("LOST")}
                className={`py-2 px-3 rounded-lg border text-xs font-mono uppercase font-semibold transition-all ${
                  reportType === "LOST"
                    ? "bg-amber-500 border-amber-500 text-[#08120c] font-bold shadow-md"
                    : "bg-[#07110b] border-[#38513f] text-[#a9c0ae] hover:border-amber-400"
                }`}
              >
                I Lost an Item
              </button>
            </div>
          </div>

          {/* Item Name */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
              Item Name &amp; Model
            </label>
            <input
              required
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="e.g. Casio fx-991EX ClassWiz Calculator"
              className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
            />
          </div>

          {/* Category & Icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as LostFoundItem["category"];
                  setCategory(val);
                  if (val === "Calculators") setImageType("calculator");
                  else if (val === "Drafters") setImageType("drafter");
                  else if (val === "Instruments") setImageType("multimeter");
                  else if (val === "Keys") setImageType("keys");
                  else setImageType("idcard");
                }}
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white outline-none focus:border-[#deb86d]"
              >
                <option value="Calculators">Calculators</option>
                <option value="Drafters">Drafters</option>
                <option value="Instruments">Lab Instruments / Multimeters</option>
                <option value="Keys">Keys / Keychains</option>
                <option value="Electronics">Electronics &amp; Gadgets</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Location ({reportType === "FOUND" ? "Found" : "Lost"})
              </label>
              <input
                required
                value={locationFound}
                onChange={(e) => setLocationFound(e.target.value)}
                placeholder="e.g. Drawing Hall 2, Desk #44"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>
          </div>

          {/* Date/Time & Reporter Alias */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                Date &amp; Time
              </label>
              <input
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
                placeholder="e.g. Today, 15:30 IST"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
                {reportType === "FOUND" ? "Finder Alias / Contact" : "Owner Name / Roll"}
              </label>
              <input
                value={finderAlias}
                onChange={(e) => setFinderAlias(e.target.value)}
                placeholder="e.g. Rahul S. (3rd Year CSE)"
                className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3 py-2.5 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
              />
            </div>
          </div>

          {/* Hidden Distinguishing Clue */}
          <div>
            <label className="text-xs font-mono uppercase tracking-wider text-[#deb86d] block mb-1.5">
              Secret Distinguishing Clue / Mark
            </label>
            <textarea
              rows={2}
              value={hiddenClue}
              onChange={(e) => setHiddenClue(e.target.value)}
              placeholder="e.g. Has a small anime sticker on back, or initials engraved on the case."
              className="w-full rounded-lg border border-[#38513f] bg-[#07110b] px-3.5 py-2 text-sm text-white placeholder-[#789080] outline-none focus:border-[#deb86d]"
            />
            <p className="mt-1 text-[11px] text-[#789080]">
              Kept confidential for anti-fraud verification. The claimant must describe this clue to recover the item.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-lg bg-[#c79e4d] py-3 text-xs font-bold uppercase tracking-wider text-[#08120c] hover:bg-[#deb86d] transition-colors disabled:opacity-60"
          >
            {isSubmitting
              ? "Submitting..."
              : reportType === "FOUND"
              ? "Publish Found Item to Registry"
              : "Publish Lost Item Alert"}
          </button>
        </form>
      </div>
    </div>
  );
}
