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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden relative">
        {/* Modal Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
            <span className="text-xs font-bold tracking-wider text-slate-900 uppercase font-mono">
              CONFIDENTIAL ITEM CLAIM WORKFLOW
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Item Overview Banner */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-red-600 uppercase block font-bold mb-1">
                    CLAIMING ITEM #{item.id}
                  </span>
                  <h4 className="text-base font-heading font-bold text-slate-900">
                    {item.itemName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Found at: <strong className="text-slate-700">{item.locationFound}</strong>
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 bg-red-50 text-red-700 border border-red-200 rounded">
                  ESCROW
                </span>
              </div>

              {/* Security Notice */}
              <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-900 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  <strong>Zero-Identifier Policy:</strong> Describe a unique concealed marking (e.g. scratches, internal sticker serial, custom engraving) that only the authentic owner would know.
                </p>
              </div>

              {/* Input: Roll Number */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Your Institutional Roll Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22/CSE/042"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-300 focus:border-red-500 focus:outline-none rounded-lg"
                />
              </div>

              {/* Input: Proof Description */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Confidential Verification Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Describe unique marks, stickers, battery brand, engravings..."
                  value={claimDescription}
                  onChange={(e) => setClaimDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 focus:border-red-500 focus:outline-none rounded-lg"
                ></textarea>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow-sm"
                >
                  TRANSMIT CLAIM
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Claim Transmitted Confidentially
              </h4>
              <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                Your verification prompt has been forwarded to the finder ({item.finderAlias}). Once they verify your unique description, an in-person handoff will be scheduled.
              </p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-xs text-slate-600">
                TICKET_ID: CLAIM-{item.id.toUpperCase()}-KGEC-2026
              </div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase rounded-lg"
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
