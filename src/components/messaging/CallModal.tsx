"use client";

import React, { useState, useEffect } from "react";
import {
  PhoneOff,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  Volume2,
  ShieldCheck,
  Signal,
  Users,
} from "lucide-react";
import { StudentProfile } from "@/data/profileData";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  peer: StudentProfile;
  callType: "audio" | "video";
}

export default function CallModal({
  isOpen,
  onClose,
  peer,
  callType,
}: CallModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(callType === "audio");
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState<"connecting" | "connected">("connecting");

  useEffect(() => {
    if (!isOpen) {
      setCallDuration(0);
      setCallStatus("connecting");
      return;
    }

    const timer = setTimeout(() => {
      setCallStatus("connected");
    }, 1800);

    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#070e0a] border border-[#c79e4d]/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white animate-in zoom-in-95 duration-200">
        {/* Top Bar */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-[#deb86d]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>KGEC INTRANET PEER-TO-PEER ENCRYPTION</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#a3b899]">
            <Signal className="w-3.5 h-3.5 text-emerald-400" />
            <span>5G SUB-NET</span>
          </div>
        </div>

        {/* Video / Avatar Canvas */}
        <div className="relative h-72 sm:h-80 bg-gradient-to-b from-[#0b1510] via-[#070e0a] to-[#060d08] flex flex-col items-center justify-center p-6 text-center">
          {callStatus === "connecting" ? (
            <div className="space-y-4">
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-3xl flex items-center justify-center mx-auto shadow-2xl ring-4 ring-[#c79e4d]/40 animate-pulse`}
                >
                  {peer.avatarText}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-[#c79e4d]/50 animate-ping"></div>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-white">{peer.name}</h3>
                <p className="text-xs text-[#deb86d] font-mono animate-pulse">
                  Establishing Intranet Session via Campus Subnet...
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div
                className={`w-28 h-28 rounded-full bg-gradient-to-br ${peer.avatarBg} text-white font-bold text-4xl flex items-center justify-center mx-auto shadow-2xl ring-4 ring-[#c79e4d]/40`}
              >
                {peer.avatarText}
              </div>
              <div>
                <h3 className="text-xl font-serif font-bold tracking-tight text-white">{peer.name}</h3>
                <p className="text-xs text-[#a3b899] font-mono">
                  {peer.department} • {peer.rollNumber}
                </p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#0b1510] border border-[#c79e4d]/30 rounded-full text-xs font-mono text-[#deb86d]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>{formatDuration(callDuration)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Self PiP Overlay */}
          <div className="absolute bottom-4 right-4 w-28 h-20 bg-[#0b1510] border border-white/15 rounded-xl overflow-hidden shadow-lg flex flex-col items-center justify-center text-center p-1.5">
            <div className="w-7 h-7 rounded-full bg-[#c79e4d] text-[#08120c] font-bold text-[10px] flex items-center justify-center mb-1">
              AS
            </div>
            <span className="text-[10px] text-[#a3b899] font-mono">You (Arjun)</span>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="px-6 py-5 bg-[#0b1510] border-t border-white/10 flex items-center justify-center gap-4">
          {/* Mic */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3.5 rounded-full transition-all cursor-pointer ${
              isMuted
                ? "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
            }`}
            title={isMuted ? "Unmute Mic" : "Mute Mic"}
          >
            {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Video */}
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`p-3.5 rounded-full transition-all cursor-pointer ${
              isVideoOff
                ? "bg-rose-950/60 text-rose-300 border border-rose-500/40"
                : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
            }`}
            title={isVideoOff ? "Turn Video On" : "Turn Video Off"}
          >
            {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
          </button>

          {/* Screen Share */}
          <button
            className="p-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-full transition-all cursor-pointer hidden sm:block"
            title="Share Screen"
          >
            <Monitor className="w-5 h-5" />
          </button>

          {/* End Call */}
          <button
            onClick={onClose}
            className="p-3.5 bg-rose-700 hover:bg-rose-800 text-white rounded-full shadow-lg transition-transform hover:scale-105 cursor-pointer flex items-center justify-center"
            title="End Call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
