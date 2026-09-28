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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-600"></div>
            <span className="text-xs font-bold tracking-wider text-slate-900 uppercase font-mono">
              KGEC INTRANET AUTHENTICATION GATE
            </span>
          </div>
          <button
            onClick={() => {
              setAuthenticated(false);
              onClose();
            }}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!authenticated ? (
            <form onSubmit={handleAuthenticate} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex items-center justify-center mx-auto mb-3 font-bold text-xl shadow-sm">
                  結
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900">
                  Verify Institutional Student Roll
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Access restricted to verified students of Kalyani Government Engineering College.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                  Institutional Roll Number
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 22/CSE/042 or 23/ECE/018"
                  value={rollInput}
                  onChange={(e) => setRollInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-white border border-slate-300 focus:border-red-500 focus:outline-none rounded-lg uppercase tracking-wider"
                />
                <span className="text-[11px] text-slate-400 mt-1 block font-mono">
                  Accepted format: YY/DEPT/ROLL (e.g., 22/CSE/042)
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1 font-mono">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-red-600" />
                  <span>Subnet: KGEC Private Intranet</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  No passwords required for discovery. In-app verification tokens are generated client-side.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase transition-colors rounded-lg shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span>VERIFY & ENTER INTRANET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>

              <h4 className="text-lg font-bold text-slate-900">
                Student Roll Authenticated
              </h4>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-2 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Detected Roll:</span>
                  <strong className="text-slate-900">{rollInput.toUpperCase()}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="text-red-600 font-bold">KGEC Engineering</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Intranet Privilege:</span>
                  <span className="text-emerald-700 font-bold">Level 2 (Kenshi)</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Welcome to College Nexus! Your session is active with encrypted local tokens. You can browse all Vault archives, publish items, and file claims.
              </p>

              <button
                onClick={() => {
                  setAuthenticated(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wider uppercase rounded-lg shadow-sm"
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
