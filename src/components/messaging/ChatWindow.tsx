"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Mic,
  MicOff,
  Phone,
  Video,
  Info,
  MoreVertical,
  CheckCheck,
  Check,
  FileText,
  Code2,
  Copy,
  Download,
  Sparkles,
  ArrowLeft,
  BookOpen,
  Users,
  Play,
  Pause,
  Radio,
  Share2,
} from "lucide-react";
import {
  Conversation,
  DirectMessage,
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

  const handleCopyCode = (id: string, code?: string) => {
    if (!code) return;
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
  const avatarBg = isGroup ? "from-red-600 to-red-800" : peer.avatarBg;
  const avatarText = isGroup ? "結" : peer.avatarText;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fcfbfa] min-w-0 relative">
      {/* Top Header */}
      <div className="px-4 py-3 bg-white border-b border-slate-200/90 flex items-center justify-between gap-3 shadow-2xs z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          <button
            onClick={onBackMobile}
            className="md:hidden p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Peer Avatar */}
          <div className="relative shrink-0">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-2xs`}
            >
              {avatarText}
            </div>
            {conversation.isOnline && (
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* Peer Details */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-slate-900 truncate">
                {peerName}
              </h3>
              {!isGroup && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-red-50 text-red-600 rounded border border-red-100 shrink-0">
                  {peer.department}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1 font-mono text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{conversation.isOnline ? "Active" : "Subnet Idle"}</span>
              </span>
              <span>•</span>
              <span className="truncate max-w-[220px] font-mono">
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
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Campus Voice Call"
          >
            <Phone className="w-4 h-4" />
          </button>

          {/* Video / Screen Share Call */}
          <button
            onClick={() => onStartCall("video")}
            className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
            title="Lab Video & Screen Share"
          >
            <Video className="w-4 h-4" />
          </button>

          {/* Toggle Right Sidebar */}
          <button
            onClick={onToggleSidebar}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            title="View Peer Info & Files"
          >
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Prompts Banner */}
      <div className="px-4 py-2 bg-white/70 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
        <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
        <span className="text-slate-400 font-mono text-[10px] shrink-0 uppercase tracking-wider">
          Suggested:
        </span>
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

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Date Divider */}
        <div className="flex items-center justify-center my-2">
          <span className="px-3 py-1 bg-slate-100/90 text-slate-500 text-[10px] font-mono font-semibold rounded-full border border-slate-200/60 shadow-2xs">
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
                <span className="text-[10px] font-mono text-slate-500 font-semibold mb-1 ml-1 flex items-center gap-1">
                  <span>{m.senderName}</span>
                </span>
              )}

              {/* Message Bubble + Reaction trigger */}
              <div className="relative max-w-[85%] sm:max-w-[70%]">
                <div
                  className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    isMe
                      ? "bg-red-600 text-white rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs"
                  }`}
                >
                  {/* Text Content */}
                  <p className="whitespace-pre-wrap">{m.text}</p>

                  {/* Attachments rendering */}
                  {m.attachments && m.attachments.length > 0 && (
                    <div className="mt-2.5 space-y-2">
                      {m.attachments.map((att) => {
                        if (att.type === "pyq") {
                          return (
                            <div
                              key={att.id}
                              className={`p-3 rounded-xl flex items-center justify-between gap-3 border ${
                                isMe
                                  ? "bg-red-700/80 border-red-500/50 text-white"
                                  : "bg-red-50/70 border-red-200 text-slate-800"
                              }`}
                            >
                              <div className="flex items-start gap-2.5 min-w-0">
                                <div
                                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                                    isMe
                                      ? "bg-white/20 text-white"
                                      : "bg-red-100 text-red-600"
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
                                        className={`text-[9px] font-mono px-1 py-0.2 rounded shrink-0 ${
                                          isMe
                                            ? "bg-white/20 text-white"
                                            : "bg-red-100 text-red-700"
                                        }`}
                                      >
                                        {att.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p
                                    className={`text-[10px] mt-0.5 truncate ${
                                      isMe ? "text-red-100" : "text-slate-500"
                                    }`}
                                  >
                                    {att.subtitle}
                                  </p>
                                </div>
                              </div>

                              <button
                                onClick={() => onDownloadAttachment(att)}
                                className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0 transition-colors cursor-pointer ${
                                  isMe
                                    ? "bg-white text-red-700 hover:bg-red-50"
                                    : "bg-red-600 text-white hover:bg-red-700"
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
                              className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 text-[11px] font-mono"
                            >
                              <div className="px-3 py-1.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-slate-300 font-bold">
                                    {att.title}
                                  </span>
                                  <span className="text-[9px] text-slate-500">
                                    {att.codeLang?.toUpperCase()}
                                  </span>
                                </div>
                                <button
                                  onClick={() =>
                                    handleCopyCode(att.id, att.codeSnippet)
                                  }
                                  className="px-2 py-0.5 rounded text-[10px] text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
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
                              <pre className="p-3 overflow-x-auto text-emerald-400 text-xs">
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
                                  ? "bg-red-700/80 border-red-500/50 text-white"
                                  : "bg-slate-100 border-slate-200 text-slate-800"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleToggleVoicePlay(att.id)}
                                  className={`w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-105 ${
                                    isMe
                                      ? "bg-white text-red-600"
                                      : "bg-red-600 text-white"
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
                                                ? "bg-amber-400 animate-pulse"
                                                : isMe
                                                ? "bg-red-200"
                                                : "bg-slate-400"
                                            }`}
                                          ></div>
                                        )
                                      )}
                                    </div>
                                    <span
                                      className={`text-[10px] font-mono ${
                                        isMe ? "text-red-100" : "text-slate-500"
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
                              className="p-3 bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-xl border border-indigo-700/50 space-y-2"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                                  <Sparkles className="w-3.5 h-3.5" />
                                  <span>{att.badge}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-400">
                                  KGEC Research Wing
                                </span>
                              </div>
                              <h5 className="font-bold text-xs">{att.title}</h5>
                              <p className="text-[11px] text-slate-300">
                                {att.subtitle}
                              </p>
                              <button
                                onClick={() =>
                                  alert(
                                    "Collaboration invite accepted! Project workspace added to your profile."
                                  )
                                }
                                className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
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
                  } hidden group-hover:flex items-center gap-0.5 bg-white border border-slate-200 shadow-md rounded-full px-2 py-0.5 text-xs z-10 animate-in fade-in zoom-in-95 duration-100`}
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
              <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 px-1">
                {/* Active emoji reactions */}
                {m.reactions && m.reactions.length > 0 && (
                  <div className="flex items-center gap-1 mr-1">
                    {m.reactions.map((r, idx) => (
                      <button
                        key={idx}
                        onClick={() => onReaction(m.id, r.emoji)}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full border text-[10px] cursor-pointer ${
                          r.reactedByMe
                            ? "bg-red-50 border-red-300 text-red-600 font-bold"
                            : "bg-slate-100 border-slate-200 text-slate-600"
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
                  <CheckCheck className="w-3.5 h-3.5 text-red-500 shrink-0" />
                )}
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-500 bg-white border border-slate-200/90 rounded-2xl rounded-bl-xs px-3.5 py-2 w-fit shadow-2xs animate-in fade-in duration-150">
            <span className="font-semibold text-slate-700">
              {conversation.isGroup ? "DevCom Member" : peer.name}
            </span>
            <span>is typing</span>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Composer */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200/90 relative">
        {/* Attachment Options Menu */}
        {attachMenuOpen && (
          <div className="absolute bottom-full left-4 mb-2 bg-white border border-slate-200 shadow-xl rounded-2xl p-2 w-64 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <div className="text-[10px] font-bold text-slate-400 uppercase font-mono px-3 py-1">
              Share Campus Material
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setAttachMenuOpen(false);
                  onOpenSharePyq();
                }}
                className="w-full px-3 py-2 text-left hover:bg-red-50 rounded-xl text-xs font-semibold text-slate-800 hover:text-red-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Campus Vault PYQ / Note</p>
                  <p className="text-[10px] text-slate-400">
                    MAKAUT Exam Archives
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setAttachMenuOpen(false);
                  onOpenShareCode();
                }}
                className="w-full px-3 py-2 text-left hover:bg-indigo-50 rounded-xl text-xs font-semibold text-slate-800 hover:text-indigo-700 flex items-center gap-2.5 transition-colors cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold">Code Snippet</p>
                  <p className="text-[10px] text-slate-400">
                    With syntax formatting
                  </p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Emoji Quick Picker */}
        {emojiMenuOpen && (
          <div className="absolute bottom-full left-12 mb-2 bg-white border border-slate-200 shadow-xl rounded-2xl p-3 z-30 flex items-center gap-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
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
          <div className="flex items-center justify-between bg-red-50 border border-red-200 px-4 py-2.5 rounded-2xl text-xs animate-pulse">
            <div className="flex items-center gap-2 text-red-700 font-semibold font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span>Recording Voice Note... 0:{voiceSeconds.toString().padStart(2, "0")}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsRecordingVoice(false)}
                className="px-3 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFinishVoiceRecord}
                className="px-3.5 py-1 bg-red-600 text-white rounded-lg text-xs font-bold cursor-pointer"
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
                  ? "bg-red-50 text-red-600"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
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
              className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer hidden sm:block"
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
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-red-500 focus:bg-white rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-red-500/20"
            />

            {/* Voice Record Button */}
            <button
              onClick={() => setIsRecordingVoice(true)}
              className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer hidden sm:block"
              title="Record Voice Note"
            >
              <Mic className="w-4 h-4" />
            </button>

            {/* Send Button */}
            <button
              onClick={() => handleSend()}
              disabled={!inputText.trim()}
              className={`p-2.5 rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center ${
                inputText.trim()
                  ? "bg-red-600 hover:bg-red-700 text-white hover:scale-105"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
