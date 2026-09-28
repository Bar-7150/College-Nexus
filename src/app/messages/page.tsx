"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
    <div className="min-h-screen bg-[#fbf9f5] flex flex-col">
      {/* Navbar */}
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      {/* Main Messaging Layout */}
      <div className="flex-1 pt-[68px] flex overflow-hidden h-[calc(100vh)]">
        {/* Left: Conversations Sidebar */}
        <div
          className={`${
            isMobileViewingChat ? "hidden md:flex" : "flex"
          } w-full md:w-auto h-full`}
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
            />
          ) : (
            <div className="flex-1 flex items-center justify-center p-6 text-center text-slate-400">
              Select a conversation to start messaging
            </div>
          )}
        </div>

        {/* Right: Peer Info Drawer (Collapsible) */}
        {sidebarOpen && activeConversation && (
          <div className="hidden lg:flex h-full">
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

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-medium">{toastMessage}</span>
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
    </div>
  );
}

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#fbf9f5] flex items-center justify-center p-4">
          <div className="text-center space-y-2">
            <div className="w-8 h-8 rounded-full border-2 border-red-600 border-t-transparent animate-spin mx-auto"></div>
            <p className="text-xs font-mono text-slate-500">
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
