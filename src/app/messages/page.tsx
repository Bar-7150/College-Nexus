"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import ConversationList from "@/components/messaging/ConversationList";
import ChatWindow from "@/components/messaging/ChatWindow";
import PeerSidebar from "@/components/messaging/PeerSidebar";
import NewChatModal from "@/components/messaging/NewChatModal";
import CallModal from "@/components/messaging/CallModal";
import SharePyqModal from "@/components/messaging/SharePyqModal";
import ShareCodeModal from "@/components/messaging/ShareCodeModal";
import {
  INITIAL_CONVERSATIONS,
  Conversation,
  DirectMessage,
  MessageAttachment,
  PEER_SMART_RESPONSES,
} from "@/data/messagingData";
import { StudentProfile, INITIAL_PROFILES } from "@/data/profileData";
import { Check, ShieldCheck, Sparkles, MessageSquare } from "lucide-react";

function MessagesContent() {
  const searchParams = useSearchParams();
  const targetUserParam = searchParams.get("user");

  const [conversations, setConversations] = useState<Conversation[]>(
    INITIAL_CONVERSATIONS
  );
  const [activeConvId, setActiveConvId] = useState<string>("conv-priya-sharma");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mobile navigation state
  const [isMobileViewingChat, setIsMobileViewingChat] = useState(false);

  // Peer context drawer
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Modals
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [callModalOpen, setCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<"audio" | "video">("audio");
  const [sharePyqModalOpen, setSharePyqModalOpen] = useState(false);
  const [shareCodeModalOpen, setShareCodeModalOpen] = useState(false);

  // Typing simulation
  const [isTyping, setIsTyping] = useState(false);

  // Full Screen Mode state
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
      showToast("Entered Full Screen Mode • Press ESC to exit");
    } else {
      if (document.exitFullscreen && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
      showToast("Exited Full Screen Mode");
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // If URL parameter specifies a user (?user=sneha-chakraborty), switch or create conversation
  useEffect(() => {
    if (targetUserParam) {
      const existingConv = conversations.find(
        (c) => c.peerId === targetUserParam
      );
      if (existingConv) {
        setActiveConvId(existingConv.id);
        setIsMobileViewingChat(true);
      } else {
        const targetPeer = INITIAL_PROFILES.find((p) => p.id === targetUserParam);
        if (targetPeer) {
          const newConv: Conversation = {
            id: `conv-${targetPeer.id}`,
            peerId: targetPeer.id,
            peer: targetPeer,
            lastMessage: `Connected on Campus Subnet with ${targetPeer.name}`,
            lastMessageTime: "Just now",
            unreadCount: 0,
            isOnline: true,
            subnetLocation: `${targetPeer.department} Academic Block`,
            tags: ["classmates"],
            messages: [
              {
                id: `msg-init-${Date.now()}`,
                senderId: targetPeer.id,
                senderName: targetPeer.name,
                senderAvatar: targetPeer.avatarText,
                senderAvatarBg: targetPeer.avatarBg,
                text: `Hey Arjun! Glad to connect on the KGEC Student Network. How can I help you today?`,
                timestamp: "Just now",
                status: "read",
              },
            ],
          };
          setConversations((prev) => [newConv, ...prev]);
          setActiveConvId(newConv.id);
          setIsMobileViewingChat(true);
        }
      }
    }
  }, [targetUserParam]);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  // Select conversation
  const handleSelectConversation = (convId: string) => {
    setActiveConvId(convId);
    setIsMobileViewingChat(true);

    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Select peer from New Chat Modal
  const handleSelectNewPeer = (peer: StudentProfile) => {
    const existing = conversations.find((c) => c.peerId === peer.id);
    if (existing) {
      setActiveConvId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv-${peer.id}`,
        peerId: peer.id,
        peer,
        lastMessage: "Conversation initiated",
        lastMessageTime: "Just now",
        unreadCount: 0,
        isOnline: true,
        subnetLocation: `${peer.department} Department Wing`,
        tags: ["classmates"],
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: peer.id,
            senderName: peer.name,
            senderAvatar: peer.avatarText,
            senderAvatarBg: peer.avatarBg,
            text: `Hi Arjun! Thanks for starting this chat on the campus subnet.`,
            timestamp: "Just now",
            status: "read",
          },
        ],
      };
      setConversations((prev) => [newConv, ...prev]);
      setActiveConvId(newConv.id);
    }
    setIsMobileViewingChat(true);
  };

  // Send message handler
  const handleSendMessage = (text: string, attachments?: MessageAttachment[]) => {
    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: "arjun-sen",
      senderName: "Arjun Sen",
      senderAvatar: "AS",
      senderAvatarBg: "from-blue-600 to-indigo-700",
      text,
      timestamp: "Just now",
      status: "sent",
      attachments,
    };

    // Update conversation
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTime: "Just now",
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    // Trigger typing simulation and smart peer reply
    const currentConv = activeConversation;
    if (currentConv) {
      setTimeout(() => {
        setIsTyping(true);
      }, 700);

      setTimeout(() => {
        setIsTyping(false);

        const possibleReplies =
          PEER_SMART_RESPONSES[currentConv.peerId] || [
            `Thanks for the update, Arjun! Looking forward to testing this on the campus network.`,
            `Sounds great! Let's follow up during the DevCom workshop session.`,
            `Appreciate the note! Let's collaborate further on this.`,
          ];

        const randomReply =
          possibleReplies[Math.floor(Math.random() * possibleReplies.length)];

        const replyMsg: DirectMessage = {
          id: `reply-${Date.now()}`,
          senderId: currentConv.peerId,
          senderName: currentConv.isGroup
            ? "Priya Sharma"
            : currentConv.peer.name,
          senderAvatar: currentConv.isGroup
            ? "PS"
            : currentConv.peer.avatarText,
          senderAvatarBg: currentConv.isGroup
            ? "from-emerald-600 to-teal-700"
            : currentConv.peer.avatarBg,
          text: randomReply,
          timestamp: "Just now",
          status: "read",
        };

        setConversations((prev) =>
          prev.map((c) => {
            if (c.id === currentConv.id) {
              return {
                ...c,
                lastMessage: randomReply,
                lastMessageTime: "Just now",
                messages: [...c.messages, replyMsg],
              };
            }
            return c;
          })
        );
      }, 2000);
    }
  };

  // Add emoji reaction
  const handleReaction = (msgId: string, emoji: string) => {
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeConvId) return c;
        return {
          ...c,
          messages: c.messages.map((m) => {
            if (m.id !== msgId) return m;

            const existingReactions = m.reactions ? [...m.reactions] : [];
            const rIdx = existingReactions.findIndex((r) => r.emoji === emoji);

            if (rIdx >= 0) {
              if (existingReactions[rIdx].reactedByMe) {
                // Remove reaction
                existingReactions[rIdx].count -= 1;
                existingReactions[rIdx].reactedByMe = false;
                if (existingReactions[rIdx].count <= 0) {
                  existingReactions.splice(rIdx, 1);
                }
              } else {
                existingReactions[rIdx].count += 1;
                existingReactions[rIdx].reactedByMe = true;
              }
            } else {
              existingReactions.push({ emoji, count: 1, reactedByMe: true });
            }

            return { ...m, reactions: existingReactions };
          }),
        };
      })
    );
  };

  // Toggle Pin
  const handleTogglePin = () => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId ? { ...c, isPinned: !c.isPinned } : c
      )
    );
    showToast(
      activeConversation.isPinned
        ? "Conversation unpinned"
        : "Conversation pinned to top"
    );
  };

  // Download attachment
  const handleDownloadAttachment = (att: MessageAttachment) => {
    showToast(`Downloading "${att.title}" from Campus Vault...`);
  };

  // Start Call
  const handleStartCall = (type: "audio" | "video") => {
    setCallType(type);
    setCallModalOpen(true);
  };

  return (
    <AuthGuard
      resourceName="KGEC Encrypted Campus Messenger"
      resourceDescription="Direct peer conversations, project squad channels, voice/video calls, and Vault PYQ exchanges are strictly encrypted and restricted to authenticated KGEC students."
    >
      <main className="h-screen w-screen bg-[#070e0a] text-[#f5f9f6] flex flex-col relative selection:bg-[#c79e4d] selection:text-[#0b1510] overflow-hidden">
      {/* Fixed KGEC Historic Library Watercolor Background - Crisp, Vibrant & Luminous */}
      <div
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none"
      >
        <img
          src="/kgec-library.jpg"
          alt="KGEC Historic Academic Library Watercolor Artwork"
          className="w-full h-full object-cover object-[center_35%] scale-[1.01] filter brightness-95 contrast-[1.04]"
        />
        {/* Semi-transparent protective veil matching home page */}
        <div className="absolute inset-0 bg-[#070e0a]/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e0a]/75 via-transparent to-[#070e0a]/80" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,transparent_40%,rgba(7,14,10,0.55)_100%)]" />
      </div>

      {/* Ambient Lighting Glow Orb */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#c79e4d]/10 rounded-full blur-3xl pointer-events-none z-0"></div>

      {/* Navbar - hidden in full screen mode for maximum canvas view */}
      {!isFullscreen && (
        <div className="relative z-30">
          <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />
        </div>
      )}

      {/* Main Messaging Floating Glass Console - Shifted slightly upward with perfect clearance below navbar */}
      <div
        className={`flex-1 min-h-0 flex overflow-hidden relative z-10 transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 z-50 p-0 m-0 w-screen h-screen bg-[#070e0a]"
            : "pt-20 sm:pt-24 md:pt-[102px] pb-3 sm:pb-4 lg:pb-5 px-2 sm:px-4 lg:px-6 h-screen"
        }`}
      >
        <div
          className={`w-full h-full mx-auto backdrop-blur-xl bg-[#070e0a]/20 overflow-hidden flex flex-row relative transition-all duration-300 ${
            isFullscreen
              ? "max-w-none rounded-none border-0"
              : "max-w-[1700px] rounded-2xl sm:rounded-3xl border border-white/20 sm:border-[#c79e4d]/35 shadow-[0_16px_48px_0_rgba(0,0,0,0.45)]"
          }`}
        >
          {/* Top Gold Shimmer Highlight Line (when in windowed floating mode) */}
          {!isFullscreen && (
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent z-30 pointer-events-none"></div>
          )}

          {/* Left: Conversations Sidebar */}
          <div
            className={`${
              isMobileViewingChat ? "hidden md:flex" : "flex"
            } w-full md:w-auto h-full shrink-0`}
          >
            <ConversationList
              conversations={conversations}
              activeConvId={activeConvId}
              onSelectConversation={handleSelectConversation}
              onOpenNewChat={() => setNewChatModalOpen(true)}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              isFullscreen={isFullscreen}
              onToggleFullscreen={toggleFullscreen}
            />
          </div>

          {/* Center: Chat Window */}
          <div
            className={`${
              !isMobileViewingChat ? "hidden md:flex" : "flex"
            } flex-1 h-full min-w-0`}
          >
            {activeConversation ? (
              <ChatWindow
                conversation={activeConversation}
                onSendMessage={handleSendMessage}
                onBackMobile={() => setIsMobileViewingChat(false)}
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                onStartCall={handleStartCall}
                onOpenSharePyq={() => setSharePyqModalOpen(true)}
                onOpenShareCode={() => setShareCodeModalOpen(true)}
                onReaction={handleReaction}
                isTyping={isTyping}
                onDownloadAttachment={handleDownloadAttachment}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
              />
            ) : (
              <div className="flex-1 flex items-center justify-center p-6 text-center text-[#deb86d] font-mono text-xs">
                Select a conversation to start messaging
              </div>
            )}
          </div>

          {/* Right: Peer Info Drawer (Collapsible) */}
          {sidebarOpen && activeConversation && (
            <div className="hidden lg:flex h-full shrink-0">
              <PeerSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                conversation={activeConversation}
                onTogglePin={handleTogglePin}
                onOpenPyq={handleDownloadAttachment}
              />
            </div>
          )}
        </div>
      </div>

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#070e0a] text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c79e4d]/40 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-mono font-medium text-[#fcedca]">{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      <NewChatModal
        isOpen={newChatModalOpen}
        onClose={() => setNewChatModalOpen(false)}
        onSelectPeer={handleSelectNewPeer}
        currentUserId="arjun-sen"
      />

      <CallModal
        isOpen={callModalOpen}
        onClose={() => setCallModalOpen(false)}
        peer={activeConversation?.peer || INITIAL_PROFILES[1]}
        callType={callType}
      />

      <SharePyqModal
        isOpen={sharePyqModalOpen}
        onClose={() => setSharePyqModalOpen(false)}
        onShare={(att) =>
          handleSendMessage(`Shared a Campus Vault exam document: ${att.title}`, [
            att,
          ])
        }
      />

      <ShareCodeModal
        isOpen={shareCodeModalOpen}
        onClose={() => setShareCodeModalOpen(false)}
        onShare={(att) =>
          handleSendMessage(`Shared a code snippet: ${att.title}`, [att])
        }
      />

      <LoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </main>
  </AuthGuard>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060d08] flex items-center justify-center p-4">
          <div className="text-center space-y-3">
            <div className="w-9 h-9 rounded-full border-2 border-[#c79e4d] border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-[#deb86d] uppercase tracking-widest">
              Connecting to KGEC Campus Messenger...
            </p>
          </div>
        </div>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}
