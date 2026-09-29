"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CheckCircle } from "lucide-react";
import { LostFoundItem } from "@/data/mockData";

interface ClaimModalProps {
  item: LostFoundItem | null;
  onClose: () => void;
}

export default function ClaimModal({ item, onClose }: ClaimModalProps) {
  const [claimDescription, setClaimDescription] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimDescription || !rollNumber) return;
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b08]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1510] border border-[#213b2c] shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden relative text-[#f5f5f0]">
        
        {/* Modal Header */}
        <div className="bg-[#0e1a14] px-6 py-4 border-b border-[#1b3125] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-[#deb86d] uppercase font-mono">
              CONFIDENTIAL ITEM CLAIM WORKFLOW
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-[#7c9183] hover:text-white p-1 rounded-lg hover:bg-[#15271e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Overview Banner */}
              <div className="p-4 bg-[#112017] border border-[#1f372a] rounded-xl flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-[#deb86d] uppercase block font-bold mb-1">
                    CLAIMING ITEM #{item.id}
                  </span>
                  <h4 className="text-base font-serif font-bold text-white">
                    {item.itemName}
                  </h4>
                  <p className="text-xs text-[#8da194] mt-1">
                    Found at: <strong className="text-[#f5f5f0]">{item.locationFound}</strong>
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-[#172b20] text-[#deb86d] border border-[#284936] rounded">
                  ESCROW
                </span>
              </div>

              {/* Security Notice */}
              <div className="p-3.5 bg-[#122319] border border-[#1f3d2b] rounded-xl text-xs text-[#9eb2a4] flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#c79e4d] shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed font-light">
                  <strong className="text-[#deb86d] font-semibold">Zero-Identifier Policy:</strong> Describe a unique concealed marking (e.g. scratches, sticker serial, custom engraving) that only the authentic owner would know.
                </p>
              </div>

              {/* Input: Roll Number */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#deb86d] uppercase tracking-wider mb-1.5">
                  Your Institutional Roll Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22/CSE/042"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-mono bg-[#112017] border border-[#213b2c] focus:border-[#c79e4d] focus:outline-none rounded-xl text-white uppercase placeholder-[#667a6d]"
                />
              </div>

              {/* Input: Proof Description */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#deb86d] uppercase tracking-wider mb-1.5">
                  Confidential Verification Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe unique marks, stickers, battery brand, engravings..."
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-[#112017] border border-[#213b2c] focus:border-[#c79e4d] focus:outline-none rounded-xl text-white placeholder-[#667a6d]"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#8da194] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] text-xs font-bold tracking-wider uppercase rounded-xl shadow-md transition-colors"
                >
                  TRANSMIT CLAIM
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-serif font-bold text-white">
                Claim Transmitted Confidentially
              </h4>
              <p className="text-xs text-[#9eb2a4] max-w-sm mx-auto leading-relaxed font-light">
                Your verification prompt has been forwarded to the finder ({item.finderAlias}). Once they verify your unique description, an in-person campus handoff will be scheduled.
              </p>
              <div className="p-3 bg-[#112017] border border-[#1f372a] rounded-lg font-mono text-xs text-[#deb86d]">
                TICKET_ID: CLAIM-{item.id.toUpperCase()}-KGEC-2026
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] text-xs font-bold tracking-wider uppercase rounded-xl shadow-md"
              >
                CLOSE WINDOW
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
