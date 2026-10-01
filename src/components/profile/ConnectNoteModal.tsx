"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/data/profileData";
import { UserPlus, X, Send } from "lucide-react";

interface ConnectNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: StudentProfile | null;
  onConfirmSend: (note?: string) => void;
}

export default function ConnectNoteModal({
  isOpen,
  onClose,
  targetProfile,
  onConfirmSend,
}: ConnectNoteModalProps) {
  const [note, setNote] = useState("");

  if (!isOpen || !targetProfile) return null;

  const maxChars = 300;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-[#deb86d]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Invitation to Connect
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-[#d4e4da] leading-relaxed">
            You can add a personalized note to introduce yourself and tell{" "}
            <strong className="text-white font-semibold">{targetProfile.name}</strong> why
            you would like to connect on College Nexus.
          </p>

          <div>
            <textarea
              rows={4}
              maxLength={maxChars}
              placeholder={`Hi ${targetProfile.name}, I noticed your achievements in ${targetProfile.department} and would love to connect to discuss project collaborations!`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none resize-none leading-relaxed"
            />
            <div className="text-[11px] text-right text-[#a3b899] mt-1 font-mono">
              {note.length}/{maxChars} characters
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-end gap-2.5">
            <button
              onClick={() => {
                onConfirmSend();
                onClose();
              }}
              className="px-4 py-2 border border-white/20 hover:bg-white/10 text-white/80 hover:text-white rounded-xl text-xs font-mono font-semibold transition-colors cursor-pointer"
            >
              Send without a note
            </button>
            <button
              onClick={() => {
                onConfirmSend(note.trim() || undefined);
                onClose();
              }}
              className="px-4 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-colors shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Invitation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
