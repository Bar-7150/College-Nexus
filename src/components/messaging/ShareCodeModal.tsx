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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-xl w-full overflow-hidden flex flex-col animate-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-heading font-bold text-slate-900">
                Share Code Snippet
              </h3>
              <p className="text-xs text-slate-500">
                Formatted code block with syntax preview and copy action
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Filename
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="e.g. server.ts, main.cpp"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-red-500"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++ (Arduino / STM32)</option>
                <option value="c">C / FreeRTOS</option>
                <option value="java">Java (Spring)</option>
                <option value="verilog">Verilog HDL</option>
                <option value="sql">PostgreSQL / SQL</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Code Content
            </label>
            <textarea
              rows={8}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Paste or write your code here..."
              className="w-full p-3 font-mono text-xs bg-slate-900 text-emerald-400 rounded-xl focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
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
