"use client";

import React, { useState } from "react";
import { Code2, X, Send } from "lucide-react";
import { MessageAttachment } from "@/data/messagingData";

interface ShareCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShare: (attachment: MessageAttachment) => void;
}

export default function ShareCodeModal({
  isOpen,
  onClose,
  onShare,
}: ShareCodeModalProps) {
  const [filename, setFilename] = useState("telemetryHandler.ts");
  const [language, setLanguage] = useState("typescript");
  const [code, setCode] = useState(`// KGEC Subnet Event Dispatcher
export async function broadcastCampusEvent(payload: CampusEvent) {
  const socket = new WebSocket("wss://nexus.kgec.ac.in/intranet/stream");
  socket.onopen = () => {
    socket.send(JSON.stringify({ ...payload, timestamp: Date.now() }));
  };
}`);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    onShare({
      id: `att-code-${Date.now()}`,
      type: "code",
      title: filename || "code_snippet.txt",
      subtitle: `${language.toUpperCase()} • ${code.split("\n").length} lines`,
      codeLang: language,
      codeSnippet: code,
      actionText: "Copy Snippet",
      badge: "CAMPUS CODE",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/30 flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">
                Share Code Snippet
              </h3>
              <p className="text-xs text-[#a3b899]">
                Formatted code block with syntax preview and copy action
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/60 hover:text-white rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                Filename
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g. server.ts, main.cpp"
                className="w-full px-3 py-2 bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl text-xs focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl text-xs focus:outline-none font-mono"
              >
                <option value="typescript" className="bg-[#0b1510]">TypeScript</option>
                <option value="javascript" className="bg-[#0b1510]">JavaScript</option>
                <option value="python" className="bg-[#0b1510]">Python</option>
                <option value="cpp" className="bg-[#0b1510]">C++ (Arduino / STM32)</option>
                <option value="c" className="bg-[#0b1510]">C / FreeRTOS</option>
                <option value="java" className="bg-[#0b1510]">Java (Spring)</option>
                <option value="verilog" className="bg-[#0b1510]">Verilog HDL</option>
                <option value="sql" className="bg-[#0b1510]">PostgreSQL / SQL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
              Code Content
            </label>
            <textarea
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste or write your code here..."
              className="w-full p-3 font-mono text-xs bg-[#060d08] text-emerald-300 border border-white/15 focus:border-[#c79e4d] rounded-xl focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono font-semibold text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-white/20 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share Code</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
