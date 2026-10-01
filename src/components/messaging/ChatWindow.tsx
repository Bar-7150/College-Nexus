"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  Phone,
  Video,
  Info,
  CheckCheck,
  Check,
  FileText,
  Code2,
  Copy,
  Download,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Play,
  Pause,
  Maximize2,
  Minimize2,
} from "lucide-react";
import {
  Conversation,
  MessageAttachment,
} from "@/data/messagingData";

interface ChatWindowProps {
  conversation: Conversation;
  onSendMessage: (text: string, attachments?: MessageAttachment[]) => void;
  onBackMobile: () => void;
  onToggleSidebar: () => void;
  onStartCall: (callType: "audio" | "video") => void;
  onOpenSharePyq: () => void;
  onOpenShareCode: () => void;
  onReaction: (msgId: string, emoji: string) => void;
  isTyping: boolean;
  onDownloadAttachment: (attachment: MessageAttachment) => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export default function ChatWindow({
  conversation,
  onSendMessage,
  onBackMobile,
  onToggleSidebar,
  onStartCall,
  onOpenSharePyq,
  onOpenShareCode,
  onReaction,
  isTyping,
  onDownloadAttachment,
  isFullscreen,
  onToggleFullscreen,
}: ChatWindowProps) {
  const [inputText, setInputText] = useState("");
  const [attachMenuOpen, setAttachMenuOpen] = useState(false);
  const [emojiMenuOpen, setEmojiMenuOpen] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    "Could you share the MAKAUT semester PYQ notes? 📚",
    "Are you free for a 15-min mock system design review? 💡",
    "Let's sync up at the DevCom lab after 5th period 📍",
    "Pushed the updated telemetry gateway repo to GitHub 🚀",
  ];

  const quickEmojis = ["👍", "🚀", "❤️", "🔥", "💡", "🙌", "👏", "🎉"];

  // Auto-scroll to bottom on messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation.messages, isTyping]);

  // Voice recording simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecordingVoice) {
      timer = setInterval(() => {
        setVoiceSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setVoiceSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecordingVoice]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend !== undefined ? textToSend : inputText;
    if (!text.trim()) return;

    onSendMessage(text.trim());
    setInputText("");
    setAttachMenuOpen(false);
    setEmojiMenuOpen(false);
  };

  const handleFinishVoiceRecord = () => {
    setIsRecordingVoice(false);
    const durationStr = `0:${voiceSeconds.toString().padStart(2, "0")}`;
    const voiceAttachment: MessageAttachment = {
      id: `voice-${Date.now()}`,
      type: "voice",
      title: `Campus Voice Note (${durationStr})`,
      subtitle: `Recorded on KGEC Subnet • ${durationStr}`,
      fileSize: "512 KB",
      actionText: "Play Voice Note",
      badge: "VOICE NOTE",
    };
    onSendMessage("Sent a campus voice note 🎙️", [voiceAttachment]);
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleToggleVoicePlay = (id: string) => {
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
    } else {
      setPlayingVoiceId(id);
      setTimeout(() => setPlayingVoiceId(null), 4000); // Simulate audio playing
    }
  };

  const { peer, isGroup, groupName } = conversation;
  const peerName = isGroup ? groupName : peer.name;
  const avatarBg = isGroup ? "from-[#deb86d] to-[#996515]" : peer.avatarBg;
  const avatarText = isGroup ? "結" : peer.avatarText;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#070e0a]/10 backdrop-blur-md min-w-0 relative text-[#d4e4da]">
      {/* Top Header */}
      <div className="px-4 sm:px-6 py-3.5 bg-[#070e0a]/30 backdrop-blur-md border-b border-white/15 sm:border-[#c79e4d]/25 flex items-center justify-between gap-3 shadow-xs z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <button
            onClick={onBackMobile}
            className="md:hidden p-1.5 text-white/60 hover:text-white rounded-lg cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Peer Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md ring-1 ring-white/15`}
            >
              {avatarText}
            </div>
            {conversation.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#070e0a] rounded-full"></span>
            )}
          </div>

          {/* Peer Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-serif font-bold text-white truncate">
                {peerName}
              </h3>
              {!isGroup && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-black/30 text-[#deb86d] rounded border border-white/20 shrink-0">
                  {peer.department}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-[#9cb0a2] font-mono">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{conversation.isOnline ? "Active" : "Subnet Idle"}</span>
              </span>
              <span className="text-white/20">•</span>
              <span className="truncate max-w-[220px]">
                {conversation.subnetLocation}
              </span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Audio Call */}
          <button
            onClick={() => onStartCall("audio")}
            className="p-2 sm:p-2.5 text-[#deb86d] bg-white/5 hover:bg-[#c79e4d]/20 border border-white/15 hover:border-[#c79e4d]/40 rounded-xl transition-all cursor-pointer shadow-xs"
            title="Campus Voice Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Video / Screen Share Call */}
          <button
            onClick={() => onStartCall("video")}
            className="p-2 sm:p-2.5 text-[#deb86d] bg-white/5 hover:bg-[#c79e4d]/20 border border-white/15 hover:border-[#c79e4d]/40 rounded-xl transition-all cursor-pointer shadow-xs"
            title="Lab Video & Screen Share"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Toggle Right Sidebar */}
          <button
            onClick={onToggleSidebar}
            className="p-2 sm:p-2.5 text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-all cursor-pointer shadow-xs"
            title="View Peer Info & Files"
          >
            <Info className="w-4 h-4" />
          </button>

          {/* Full Screen Mode Toggle */}
          {onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                isFullscreen
                  ? "bg-[#c79e4d] text-[#08120c] font-bold border-[#c79e4d] hover:bg-[#deb86d]"
                  : "text-[#deb86d] bg-white/5 hover:bg-[#c79e4d]/20 border-white/15 hover:border-[#c79e4d]/40"
              }`}
              title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand to Full Screen Mode"}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Quick Prompts Banner */}
      <div className="px-4 py-2 bg-white/[0.02] border-b border-white/10 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar backdrop-blur-xs">
        <Sparkles className="w-3.5 h-3.5 text-[#deb86d] shrink-0" />
        <span className="text-[#deb86d] font-mono text-[10px] shrink-0 uppercase tracking-wider font-semibold">
          Suggested:
        </span>
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => handleSend(prompt)}
            className="px-3 py-1 bg-[#070e0a]/30 border border-white/15 hover:border-[#c79e4d] hover:text-[#deb86d] rounded-full whitespace-nowrap text-[#d4e4da] transition-colors shrink-0 font-mono text-[10px] cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center justify-center my-2">
          <span className="px-3.5 py-1 bg-black/30 backdrop-blur-xs text-[#deb86d] text-[10px] font-mono font-semibold rounded-full border border-white/20 shadow-xs">
            SECURE CAMPUS SUBNET • INTRANET SESSION
          </span>
        </div>

        {conversation.messages.map((m) => {
          const isMe = m.senderId === "arjun-sen";

          return (
            <div
              key={m.id}
              className={`flex flex-col group ${isMe ? "items-end" : "items-start"}`}
            >
              {/* Sender Name in Group Chat */}
              {isGroup && !isMe && (
                <span className="text-[10px] font-mono text-[#deb86d] font-semibold mb-1 ml-1 flex items-center gap-1">
                  <span>{m.senderName}</span>
                </span>
              )}

              {/* Message Bubble + Reaction trigger */}
              <div className="relative max-w-[85%] sm:max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-md ${
                    isMe
                      ? "bg-gradient-to-r from-[#dfc285] via-[#deb86d] to-[#c79e4d] text-[#08120c] font-medium rounded-tr-xs"
                      : "bg-[#070e0a]/40 backdrop-blur-md text-[#f5f9f6] border border-white/20 rounded-tl-xs"
                  }`}
                >
                  {/* Text Content */}
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Attachments rendering */}
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {m.attachments.map((att) => {
                        if (att.type === "pyq") {
                          return (
                            <div
                              key={att.id}
                              className={`p-3 rounded-xl flex items-center justify-between gap-3 border ${
                                isMe
                                  ? "bg-black/20 border-black/20 text-[#08120c]"
                                  : "bg-[#070e0a]/60 backdrop-blur-md border border-[#c79e4d]/40 text-[#f5f9f6]"
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    isMe
                                      ? "bg-black/20 text-[#08120c]"
                                      : "bg-[#c79e4d]/20 text-[#deb86d]"
                                  }`}
                                >
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold truncate text-xs">
                                      {att.title}
                                    </span>
                                    {att.badge && (
                                      <span
                                        className={`text-[9px] font-mono px-1.5 py-0.2 rounded shrink-0 ${
                                          isMe
                                            ? "bg-black/25 text-[#08120c]"
                                            : "bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/40"
                                        }`}
                                      >
                                        {att.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className={`text-[10px] mt-0.5 truncate ${
                                      isMe ? "text-[#08120c]/80" : "text-[#9cb0a2]"
                                    }`}
                                  >
                                    {att.subtitle}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => onDownloadAttachment(att)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer ${
                                  isMe
                                    ? "bg-[#08120c] text-white hover:bg-black"
                                    : "bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold"
                                }`}
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Get PDF</span>
                              </button>
                            </div>
                          );
                        }

                        if (att.type === "code") {
                          return (
                            <div
                              key={att.id}
                              className="rounded-xl overflow-hidden border border-[#c79e4d]/35 bg-[#070e0a]/80 backdrop-blur-md text-[#d4e4da] text-[11px] font-mono"
                            >
                              <div className="px-3 py-1.5 bg-black/40 border-b border-white/10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Code2 className="w-3.5 h-3.5 text-[#deb86d]" />
                                  <span className="text-white font-bold">
                                    {att.title}
                                  </span>
                                  <span className="text-[9px] text-[#9cb0a2]">
                                    {att.codeLang?.toUpperCase()}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    handleCopyCode(att.id, att.codeSnippet || "")
                                  }
                                  className="px-2 py-0.5 rounded text-[10px] text-[#deb86d] hover:text-white hover:bg-white/10 flex items-center gap-1 cursor-pointer transition-colors"
                                >
                                  {copiedCodeId === att.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>Copy</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="p-3 overflow-x-auto text-emerald-300 text-xs font-mono">
                                <code>{att.codeSnippet}</code>
                              </pre>
                            </div>
                          );
                        }

                        if (att.type === "voice") {
                          const isPlaying = playingVoiceId === att.id;
                          return (
                            <div
                              key={att.id}
                              className={`p-3 rounded-xl flex items-center justify-between gap-3 border ${
                                isMe
                                  ? "bg-black/20 border-black/20 text-[#08120c]"
                                  : "bg-[#070e0a]/60 backdrop-blur-md border border-[#c79e4d]/40 text-[#f5f9f6]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleToggleVoicePlay(att.id)}
                                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                                    isMe
                                      ? "bg-[#08120c] text-[#deb86d]"
                                      : "bg-[#c79e4d] text-[#08120c]"
                                  }`}
                                >
                                  {isPlaying ? (
                                    <Pause className="w-4 h-4" />
                                  ) : (
                                    <Play className="w-4 h-4 ml-0.5" />
                                  )}
                                </button>
                                <div>
                                  <span className="font-bold text-xs">
                                    {att.title}
                                  </span>
                                  <div className="flex items-center gap-1.5 mt-0.5">
                                    {/* Waveform graphic */}
                                    <div className="flex items-center gap-0.5 h-3">
                                      {[40, 70, 30, 90, 60, 80, 50, 95, 45, 65, 85, 30].map(
                                        (height, idx) => (
                                          <div
                                            key={idx}
                                            style={{ height: `${height}%` }}
                                            className={`w-1 rounded-full transition-all ${
                                              isPlaying
                                                ? "bg-[#deb86d] animate-pulse"
                                                : isMe
                                                ? "bg-black/40"
                                                : "bg-white/40"
                                            }`}
                                          ></div>
                                        )
                                      )}
                                    </div>
                                    <span
                                      className={`text-[10px] font-mono ${
                                        isMe ? "text-[#08120c]/80" : "text-[#9cb0a2]"
                                      }`}
                                    >
                                      {isPlaying ? "Playing..." : att.subtitle}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        }

                        if (att.type === "collab") {
                          return (
                            <div
                              key={att.id}
                              className="p-3 bg-[#070e0a]/70 backdrop-blur-md text-white rounded-xl border border-[#c79e4d]/40 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[#deb86d] text-xs font-bold font-mono">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{att.badge}</span>
                                </div>
                                <span className="text-[10px] font-mono text-[#9cb0a2]">
                                  KGEC Research Wing
                                </span>
                              </div>
                              <h5 className="font-serif font-bold text-xs">{att.title}</h5>
                              <p className="text-[11px] text-[#d4e4da]">
                                {att.subtitle}
                              </p>
                              <button
                                onClick={() =>
                                  alert(
                                    "Collaboration invite accepted! Project workspace added to your profile."
                                  )
                                }
                                className="w-full py-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                              >
                                {att.actionText || "Join Collaboration"}
                              </button>
                            </div>
                          );
                        }

                        return null;
                      })}
                    </div>
                  )}
                </div>

                {/* Reaction Floating Bar on Hover */}
                <div
                  className={`absolute -top-3.5 ${
                    isMe ? "right-2" : "left-2"
                  } hidden group-hover:flex items-center gap-0.5 bg-black/70 backdrop-blur-md border border-[#c79e4d]/40 shadow-xl rounded-full px-2 py-0.5 text-xs z-10 animate-in fade-in zoom-in-95 duration-100`}
                >
                  {["👍", "🚀", "❤️", "🔥", "💡"].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => onReaction(m.id, emoji)}
                      className="p-1 hover:scale-125 transition-transform cursor-pointer"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timestamp & Status & Reactions */}
              <div className="flex items-center gap-2 text-[10px] text-[#deb86d]/80 font-mono mt-1 px-1">
                {/* Active emoji reactions */}
                {m.reactions && m.reactions.length > 0 && (
                  <div className="flex items-center gap-1 mr-1">
                    {m.reactions.map((r, idx) => (
                      <button
                        key={idx}
                        onClick={() => onReaction(m.id, r.emoji)}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] font-mono cursor-pointer transition-all ${
                          r.reactedByMe
                            ? "bg-[#c79e4d]/20 border-[#c79e4d]/50 text-[#deb86d] font-bold"
                            : "bg-white/10 border-white/15 text-[#d4e4da]"
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span>{r.count}</span>
                      </button>
                    ))}
                  </div>
                )}

                <span>{m.timestamp}</span>
                {isMe && (
                  <CheckCheck className="w-3.5 h-3.5 text-[#deb86d] shrink-0" />
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-[#9cb0a2] bg-[#070e0a]/60 backdrop-blur-md border border-white/20 rounded-2xl rounded-tl-xs px-3.5 py-2 w-fit shadow-md font-mono animate-in fade-in duration-150">
            <span className="font-semibold text-white">
              {conversation.isGroup ? "DevCom Member" : peer.name}
            </span>
            <span>is typing</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-[#deb86d] rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-[#deb86d] rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-[#deb86d] rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 sm:p-4 bg-[#070e0a]/30 backdrop-blur-xl border-t border-white/15 sm:border-[#c79e4d]/25 relative">
        {/* Attachment Options Menu */}
        {attachMenuOpen && (
          <div className="absolute bottom-full left-4 mb-2 bg-[#070e0a]/90 backdrop-blur-xl border border-[#c79e4d]/40 shadow-2xl rounded-2xl p-2 w-64 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-[10px] font-bold text-[#deb86d] uppercase font-mono px-3 py-1">
              Share Campus Material
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setAttachMenuOpen(false);
                  onOpenSharePyq();
                }}
                className="w-full px-3 py-2 text-left hover:bg-white/[0.06] rounded-xl text-xs font-semibold text-white hover:text-[#deb86d] flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] flex items-center justify-center border border-[#c79e4d]/30">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Campus Vault PYQ / Note</p>
                  <p className="text-[10px] text-[#9cb0a2] font-mono">
                    MAKAUT Exam Archives
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setAttachMenuOpen(false);
                  onOpenShareCode();
                }}
                className="w-full px-3 py-2 text-left hover:bg-white/[0.06] rounded-xl text-xs font-semibold text-white hover:text-[#deb86d] flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Code Snippet</p>
                  <p className="text-[10px] text-[#9cb0a2] font-mono">
                    With syntax formatting
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Emoji Quick Picker */}
        {emojiMenuOpen && (
          <div className="absolute bottom-full left-12 mb-2 bg-[#070e0a]/90 backdrop-blur-xl border border-[#c79e4d]/40 shadow-2xl rounded-2xl p-3 z-30 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
            {quickEmojis.map((e) => (
              <button
                key={e}
                onClick={() => {
                  setInputText((prev) => prev + e);
                  setEmojiMenuOpen(false);
                }}
                className="p-1.5 hover:scale-125 transition-transform text-base cursor-pointer"
              >
                {e}
              </button>
            ))}
          </div>
        )}

        {/* Voice Note Recording HUD */}
        {isRecordingVoice ? (
          <div className="flex items-center justify-between bg-[#c79e4d]/15 border border-[#c79e4d]/40 px-4 py-2.5 rounded-2xl text-xs animate-pulse">
            <div className="flex items-center gap-2 text-[#deb86d] font-semibold font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Recording Voice Note... 0:{voiceSeconds.toString().padStart(2, "0")}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecordingVoice(false)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-mono cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFinishVoiceRecord}
                className="px-3.5 py-1 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold font-mono uppercase tracking-wider cursor-pointer shadow-md"
              >
                Send Voice Note
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {/* Attachment Button */}
            <button
              onClick={() => {
                setAttachMenuOpen(!attachMenuOpen);
                setEmojiMenuOpen(false);
              }}
              className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                attachMenuOpen
                  ? "bg-[#c79e4d]/20 text-[#deb86d] border border-[#c79e4d]/40"
                  : "text-[#deb86d] hover:text-white bg-white/5 hover:bg-white/10 border border-white/15"
              }`}
              title="Attach Material"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Emoji Button */}
            <button
              onClick={() => {
                setEmojiMenuOpen(!emojiMenuOpen);
                setAttachMenuOpen(false);
              }}
              className="p-2.5 text-[#deb86d] hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-colors cursor-pointer hidden sm:block"
              title="Add Emoji"
            >
              <Smile className="w-4 h-4" />
            </button>

            {/* Text Input */}
            <input
              ref={inputRef}
              type="text"
              placeholder={`Message ${peerName} on KGEC Subnet...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="flex-1 px-4 py-2.5 bg-[#070e0a]/35 backdrop-blur-md border border-white/20 sm:border-[#c79e4d]/35 focus:border-[#c79e4d] rounded-xl text-xs sm:text-sm text-white placeholder-[#8fa597] focus:outline-none transition-colors"
            />

            {/* Voice Record Button */}
            <button
              onClick={() => setIsRecordingVoice(true)}
              className="p-2.5 text-[#deb86d] hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl transition-colors cursor-pointer hidden sm:block"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className={`px-4 py-2.5 rounded-xl font-bold font-mono uppercase tracking-wider text-xs transition-all shadow-md cursor-pointer flex items-center justify-center gap-1.5 ${
                inputText.trim()
                  ? "bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] hover:scale-105"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              }`}
              title="Send Message"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
