"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  X,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Mail,
  Lock,
  User,
  GraduationCap,
  Sparkles,
  AlertCircle,
  LogOut,
  Send,
  Building,
} from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const {
    profile,
    isConfigured,
    loginWithGoogle,
    loginWithGithub,
    loginWithEmail,
    registerWithEmail,
    loginWithMagicLink,
    logout,
  } = useAuth();

  const [authTab, setAuthTab] = useState<"credentials" | "magic">("credentials");
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form Fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("CSE");

  // State
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isConfigured) {
        setErrorMsg("Supabase authentication is not configured. Add the Supabase environment variables to sign in.");
        setLoading(false);
        return;
      }
      const { error } = await loginWithGoogle();
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize Google Sign In.");
      setLoading(false);
    }
  };

  // Handle GitHub OAuth
  const handleGithubLogin = async () => {
    setErrorMsg(null);
    setLoading(true);
    try {
      if (!isConfigured) {
        setErrorMsg("Supabase authentication is not configured. Add the Supabase environment variables to sign in.");
        setLoading(false);
        return;
      }
      const { error } = await loginWithGithub();
      if (error) throw error;
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to initialize GitHub Sign In.");
      setLoading(false);
    }
  };

  // Handle Email + Password (Login or Register)
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!isConfigured) {
        setErrorMsg("Supabase authentication is not configured. Add the Supabase environment variables to sign in.");
        setLoading(false);
        return;
      }

      if (isRegisterMode) {
        if (!fullName || !rollNumber) {
          setErrorMsg("Please provide your full name and institutional roll number.");
          setLoading(false);
          return;
        }

        const { error, data } = await registerWithEmail(email, password, {
          fullName,
          rollNumber,
          department,
        });

        if (error) throw error;

        if (data.session) {
          setSuccessMsg("Account created and verified! Welcome to College Nexus.");
        } else {
          setSuccessMsg(
            "Registration submitted! Please check your email inbox to confirm your address."
          );
        }
      } else {
        const { error } = await loginWithEmail(email, password);
        if (error) throw error;
        setSuccessMsg("Signed in successfully!");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Passwordless Magic Link
  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setErrorMsg(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (!isConfigured) {
        setErrorMsg("Supabase authentication is not configured. Add the Supabase environment variables to sign in.");
        setLoading(false);
        return;
      }

      const { error } = await loginWithMagicLink(email);
      if (error) throw error;
      setSuccessMsg("Magic Link sent! Please check your email inbox to enter.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to send magic link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/95 backdrop-blur-2xl border border-white/20 sm:border-[#c79e4d]/40 shadow-2xl max-w-lg w-full max-h-[92vh] flex flex-col text-white animate-in zoom-in-95 duration-150">
        
        {/* Top Gold Shimmer Highlight Bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/50 to-transparent pointer-events-none"></div>

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#070e0a]/60 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dfc285] to-[#9e7529] p-[1px] shadow-sm">
              <div className="w-full h-full bg-[#0b1510] rounded-[7px] flex items-center justify-center text-[#deb86d] font-serif font-bold text-sm">
                結
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-bold tracking-wider text-[#deb86d] uppercase font-mono">
                  KGEC INTRANET AUTH GATEWAY
                </span>
              </div>
              <span className="text-[10px] text-[#8fa597] font-mono block">
                {isConfigured ? "Supabase Auth Engine Active" : "Supabase Configuration Required"}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setErrorMsg(null);
              setSuccessMsg(null);
              onClose();
            }}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="p-6 overflow-y-auto space-y-5 scrollbar-thin">
          {/* If Already Logged In */}
          {profile ? (
            <div className="text-center py-4 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#deb86d] to-[#9c752c] text-[#08120c] font-bold text-xl flex items-center justify-center mx-auto shadow-xl ring-4 ring-[#c79e4d]/30">
                {profile.avatarText}
              </div>

              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  {profile.name}
                </h3>
                <p className="text-xs text-[#a4b8ab] font-mono mt-0.5">
                  {profile.email || `${profile.rollNumber}@kgec.edu.in`}
                </p>
              </div>

              {/* Student Verified Credentials Card */}
              <div className="p-4 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-white/15 text-xs font-mono space-y-2.5 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[#8fa597]">Institutional Roll:</span>
                  <div className="flex items-center gap-1.5 text-[#deb86d] font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{profile.rollNumber}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8fa597]">Department:</span>
                  <span className="text-white font-medium">{profile.department}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8fa597]">Auth Provider:</span>
                  <span className="px-2 py-0.5 bg-[#c79e4d]/15 text-[#deb86d] rounded border border-[#c79e4d]/30 uppercase text-[10px]">
                    {profile.provider}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={async () => {
                    await logout();
                    setSuccessMsg(null);
                  }}
                  className="flex-1 py-2.5 px-4 border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                >
                  Enter Portal
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Top Banner Notice */}
              <div className="text-center">
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  Collegiate Student Access
                </h3>
                <p className="text-xs text-[#a4b8ab] mt-1 font-light">
                  Authenticate with your institutional account, Google, GitHub, or student roll number.
                </p>
              </div>

              {/* Status Alert Messages */}
              {errorMsg && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-start gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="font-mono text-[11px] leading-relaxed">{errorMsg}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 flex items-start gap-2 animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-mono text-[11px] leading-relaxed">{successMsg}</span>
                </div>
              )}

              {/* 1. SOCIAL OAUTH BUTTONS (Google & GitHub) */}
              <div className="space-y-2.5">
                {/* Google Sign In Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-white hover:bg-neutral-100 text-neutral-800 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer hover:shadow-md"
                >
                  {/* Official Google Colorful SVG */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="font-semibold tracking-wide">Continue with Google</span>
                </button>

                {/* GitHub Sign In Button */}
                <button
                  type="button"
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="w-full py-2.5 px-4 bg-[#161b22] hover:bg-[#21262d] text-white border border-white/20 text-xs font-medium rounded-xl transition-all shadow-sm flex items-center justify-center gap-3 cursor-pointer hover:border-[#c79e4d]/60"
                >
                  {/* Official GitHub SVG */}
                  <svg className="w-4 h-4 shrink-0 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  <span className="font-semibold tracking-wide">Continue with GitHub</span>
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 my-2 text-center">
                <div className="flex-1 h-[1px] bg-white/15"></div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-[#8fa597]">
                  Or Institutional Access
                </span>
                <div className="flex-1 h-[1px] bg-white/15"></div>
              </div>

              {/* Method Selector Tabs */}
              <div className="flex items-center p-1 bg-white/[0.04] border border-white/15 rounded-xl text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setAuthTab("credentials")}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    authTab === "credentials"
                      ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-sm"
                      : "text-[#dbe7df] hover:text-white"
                  }`}
                >
                  Email & Password
                </button>
                <button
                  type="button"
                  onClick={() => setAuthTab("magic")}
                  className={`flex-1 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    authTab === "magic"
                      ? "bg-[#c79e4d] text-[#08120c] font-bold shadow-sm"
                      : "text-[#dbe7df] hover:text-white"
                  }`}
                >
                  Magic Link
                </button>
              </div>

              {/* TAB 1: EMAIL & PASSWORD (SIGN IN / REGISTER) */}
              {authTab === "credentials" && (
                <form onSubmit={handleEmailAuth} className="space-y-3.5 pt-1">
                  {/* Register vs Sign in toggle pill */}
                  <div className="flex items-center justify-between text-xs pb-1">
                    <span className="text-[#a4b8ab] font-mono text-[11px]">
                      {isRegisterMode ? "Creating new verified account" : "Existing student sign in"}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsRegisterMode(!isRegisterMode);
                        setErrorMsg(null);
                        setSuccessMsg(null);
                      }}
                      className="text-[#deb86d] hover:underline font-mono text-[11px] font-bold cursor-pointer"
                    >
                      {isRegisterMode ? "Switch to Sign In" : "+ Register New Student"}
                    </button>
                  </div>

                  {/* If in Register Mode, ask for Name, Roll & Dept */}
                  {isRegisterMode && (
                    <div className="space-y-3 animate-in fade-in">
                      <div>
                        <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. Arjun Sen"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#070e0a]/60 border border-white/15 focus:border-[#c79e4d] rounded-xl text-white placeholder-white/40 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                            Roll Number *
                          </label>
                          <div className="relative">
                            <GraduationCap className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              required
                              placeholder="22/CSE/042"
                              value={rollNumber}
                              onChange={(e) => setRollNumber(e.target.value)}
                              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#070e0a]/60 border border-white/15 focus:border-[#c79e4d] rounded-xl text-white placeholder-white/40 uppercase font-mono focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                            Department *
                          </label>
                          <select
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-[#070e0a] border border-white/15 focus:border-[#c79e4d] rounded-xl text-white font-mono focus:outline-none cursor-pointer"
                          >
                            <option value="CSE">CSE (Computer Sci)</option>
                            <option value="ECE">ECE (Electronics)</option>
                            <option value="EE">EE (Electrical)</option>
                            <option value="ME">ME (Mechanical)</option>
                            <option value="IT">IT (Info Tech)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                      Campus / Personal Email *
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="student@kgec.edu.in or personal email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#070e0a]/60 border border-white/15 focus:border-[#c79e4d] rounded-xl text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#070e0a]/60 border border-white/15 focus:border-[#c79e4d] rounded-xl text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                  >
                    <span>{isRegisterMode ? "Create Verified Account" : "Sign In with Email"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* TAB 2: PASSWORDLESS MAGIC LINK */}
              {authTab === "magic" && (
                <form onSubmit={handleMagicLink} className="space-y-3.5 pt-1">
                  <p className="text-xs text-[#a4b8ab] font-light leading-relaxed">
                    Enter your email to receive an instant one-click login link. No passwords required.
                  </p>

                  <div>
                    <label className="block text-[11px] font-mono text-[#deb86d] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-[#deb86d] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        placeholder="name@kgec.edu.in"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#070e0a]/60 border border-white/15 focus:border-[#c79e4d] rounded-xl text-white placeholder-white/40 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] font-bold text-xs font-mono uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Magic Link to Inbox</span>
                  </button>
                </form>
              )}

            </>
          )}
        </div>

        {/* Modal Footer Security Note */}
        <div className="px-6 py-3 bg-[#070e0a]/60 border-t border-white/10 flex items-center justify-between text-[10px] text-[#8fa597] font-mono shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>256-Bit SSL Intranet Protected</span>
          </div>
          <span>KGEC Node // MAKAUT</span>
        </div>

      </div>
    </div>
  );
}
