"use client";

import React, { useState } from "react";
import { X, ShieldCheck, CheckCircle, ArrowRight } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [rollInput, setRollInput] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  if (!isOpen) return null;

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollInput) return;
    setAuthenticated(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050b08]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0b1510] border border-[#213b2c] shadow-2xl rounded-2xl max-w-md w-full overflow-hidden relative text-[#f5f5f0]">
        
        {/* Header */}
        <div className="bg-[#0e1a14] px-6 py-4 border-b border-[#1b3125] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#c79e4d] animate-pulse"></span>
            <span className="text-xs font-bold tracking-wider text-[#deb86d] uppercase font-mono">
              KGEC INTRANET AUTHENTICATION GATE
            </span>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              onClose();
            }}
            className="text-[#7c9183] hover:text-white p-1 rounded-lg hover:bg-[#15271e] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!authenticated ? (
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#dfc285] to-[#9e7529] p-[1px] mx-auto mb-3 shadow-sm">
                  <div className="w-full h-full bg-[#0b1510] rounded-[11px] flex items-center justify-center text-[#deb86d] font-serif font-bold text-xl">
                    結
                  </div>
                </div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Verify Institutional Student Roll
                </h3>
                <p className="text-xs text-[#8fa295] mt-1 font-light">
                  Access restricted to verified students of Kalyani Government Engineering College.
                </p>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-[#deb86d] uppercase tracking-wider mb-1.5">
                  Institutional Roll Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22/CSE/042 or 23/ECE/018"
                  value={rollInput}
                  onChange={(e) => setRollInput(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-mono bg-[#112017] border border-[#213b2c] focus:border-[#c79e4d] focus:outline-none rounded-xl text-white uppercase tracking-wider placeholder-[#667a6d]"
                />
                <span className="text-[11px] text-[#718679] mt-1 block font-mono">
                  Accepted format: YY/DEPT/ROLL (e.g., 22/CSE/042)
                </span>
              </div>

              <div className="p-3.5 bg-[#101d16] border border-[#1d3527] rounded-xl text-xs text-[#9eb2a4] space-y-1 font-mono">
                <div className="flex items-center gap-2 text-[#deb86d] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#c79e4d]" />
                  <span>Subnet: KGEC Private Intranet</span>
                </div>
                <p className="text-[11px] text-[#74897c]">
                  No passwords required for discovery. In-app verification tokens are generated client-side.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] text-xs font-bold tracking-wider uppercase transition-colors rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>VERIFY &amp; ENTER INTRANET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-serif font-bold text-white">
                Student Roll Authenticated
              </h4>

              <div className="p-4 bg-[#112017] border border-[#1f372a] rounded-xl text-xs font-mono text-[#a4b8ab] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#718779]">Detected Roll:</span>
                  <strong className="text-[#deb86d]">{rollInput.toUpperCase()}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718779]">Department:</span>
                  <span className="text-white font-bold">KGEC Engineering</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#718779]">Intranet Privilege:</span>
                  <span className="text-emerald-400 font-bold">Level 2 (Kenshi)</span>
                </div>
              </div>

              <p className="text-xs text-[#9eb2a4] leading-relaxed font-light">
                Welcome to College Nexus! Your session is active with encrypted local tokens. You can browse all Vault archives, download verified papers, and file claims.
              </p>

              <button
                onClick={() => {
                  setAuthenticated(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#c79e4d] hover:bg-[#d9b870] text-[#08120c] text-xs font-bold tracking-wider uppercase rounded-xl shadow-md"
              >
                PROCEED TO PORTAL
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
