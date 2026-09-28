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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Invitation to Connect
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            You can add a personalized note to introduce yourself and tell{" "}
            <strong className="text-slate-900">{targetProfile.name}</strong> why
            you would like to connect on College Nexus.
          </p>

          <div>
            <textarea
              rows={4}
              maxLength={maxChars}
              placeholder={`Hi ${targetProfile.name}, I noticed your achievements in ${targetProfile.department} and would love to connect to discuss project collaborations!`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-300 focus:border-red-500 rounded-xl focus:outline-none resize-none leading-relaxed"
            />
            <div className="text-[11px] text-right text-slate-400 mt-1 font-mono">
              {note.length}/{maxChars} characters
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              onClick={() => {
                onConfirmSend();
                onClose();
              }}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
            >
              Send without a note
            </button>
            <button
              onClick={() => {
                onConfirmSend(note.trim() || undefined);
                onClose();
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
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
