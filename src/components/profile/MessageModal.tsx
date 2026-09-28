"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/data/profileData";
import {
  Send,
  X,
  Sparkles,
  ShieldCheck,
  CheckCheck,
} from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: StudentProfile | null;
  currentProfile: StudentProfile;
}

interface ChatMessage {
  id: string;
  sender: "me" | "them";
  text: string;
  time: string;
}

export default function MessageModal({
  isOpen,
  onClose,
  targetProfile,
  currentProfile,
}: MessageModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "them",
      text: "Hey! Thanks for stopping by my KGEC Intranet profile. How can I help you?",
      time: "10:24 AM",
    },
  ]);
  const [input, setInput] = useState("");

  if (!isOpen || !targetProfile) return null;

  const quickPrompts = [
    "Interested in teaming up for the next hackathon!",
    "Can you share tips for MAKAUT end-sem exams?",
    "Loved your recent post and project demo 🚀",
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "me",
      text: text.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    // Simulate smart auto-reply from classmate after 1 second
    setTimeout(() => {
      const replies = [
        `Thanks for reaching out, ${currentProfile.name}! Let's connect at the campus library or drop by the DevCom lab tomorrow.`,
        `That sounds awesome! I'm definitely interested. Let's sync up after 5th period.`,
        `Appreciate the note! Glad the materials helped out. Catch you on the subnet!`,
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: `reply-${Date.now()}`,
          sender: "them",
          text: randomReply,
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden flex flex-col h-[520px] animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-full bg-gradient-to-br ${targetProfile.avatarBg} text-white font-bold text-xs flex items-center justify-center`}
            >
              {targetProfile.avatarText}
            </div>
            <div>
              <div className="text-xs font-bold flex items-center gap-1.5">
                <span>{targetProfile.name}</span>
                <span className="text-[10px] font-mono px-1 py-0.2 bg-white/10 text-white/80 rounded">
                  {targetProfile.department}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Active on Campus Subnet</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-red-400 hover:text-red-600 rounded-full whitespace-nowrap text-slate-600 transition-colors shrink-0 shadow-2xs cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Chat History */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fbf9f5]">
          {messages.map((m) => {
            const isMe = m.sender === "me";
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? "bg-red-600 text-white rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                  <span>{m.time}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-red-500" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message ${targetProfile.name}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 focus:border-red-500 rounded-xl text-xs focus:outline-none"
          />
          <button
            onClick={() => handleSend()}
            className="p-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
