"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  signInWithGoogle,
  signInWithGithub,
  signInWithEmail,
  signUpWithEmail,
  signInWithMagicLink,
  signOut as supabaseSignOut,
  StudentSignUpMetadata,
} from "@/lib/supabase/auth";

export interface StudentProfileState {
  id: string;
  name: string;
  email?: string;
  rollNumber: string;
  department: string;
  batchYear: string;
  avatarText: string;
  avatarUrl?: string;
  provider: "google" | "github" | "email" | "roll-auth";
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: StudentProfileState | null;
  loading: boolean;
  isConfigured: boolean;
  loginWithGoogle: () => Promise<any>;
  loginWithGithub: () => Promise<any>;
  loginWithEmail: (email: string, pass: string) => Promise<any>;
  registerWithEmail: (email: string, pass: string, meta: StudentSignUpMetadata) => Promise<any>;
  loginWithMagicLink: (email: string) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<StudentProfileState | null>(null);
  const [loading, setLoading] = useState(true);

  const configured = useMemo(() => isSupabaseConfigured(), []);

  // Helper to extract student profile from Supabase user
  const extractProfile = (currentUser: User | null): StudentProfileState | null => {
    if (!currentUser) return null;

    const meta = currentUser.user_metadata || {};
    const name = meta.full_name || meta.name || currentUser.email?.split("@")[0] || "Student";
    const rollNumber = meta.roll_number || "22/CSE/042";
    const department = meta.department || "CSE";
    const batchYear = meta.batch_year || "2022-2026";
    const avatarUrl = meta.avatar_url || meta.picture || "";

    const initials = name
      .split(" ")
      .map((part: string) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

    const provider = (currentUser.app_metadata?.provider as any) || "email";

    return {
      id: currentUser.id,
      name,
      email: currentUser.email,
      rollNumber,
      department,
      batchYear,
      avatarText: initials || "ST",
      avatarUrl,
      provider,
    };
  };

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    const trackUserVisit = (userId?: string) => {
      if (typeof window === "undefined" || !userId) return;
      const sessionKey = `nexus_tracked_visit_${userId}`;
      if (sessionStorage.getItem(sessionKey)) return;
      sessionStorage.setItem(sessionKey, "true");
      fetch("/api/user/visit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }).catch(() => undefined);
    };

    // Check initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setProfile(extractProfile(currentSession?.user ?? null));
      if (currentSession?.user?.id) {
        trackUserVisit(currentSession.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setProfile(extractProfile(newSession?.user ?? null));
      if (newSession?.user?.id) {
        trackUserVisit(newSession.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [configured]);

  // Auth Actions
  const loginWithGoogleAction = async () => {
    return signInWithGoogle();
  };

  const loginWithGithubAction = async () => {
    return signInWithGithub();
  };

  const loginWithEmailAction = async (email: string, pass: string) => {
    const res = await signInWithEmail(email, pass);
    if (res.data?.user) {
      setUser(res.data.user);
      setProfile(extractProfile(res.data.user));
    }
    return res;
  };

  const registerWithEmailAction = async (
    email: string,
    pass: string,
    meta: StudentSignUpMetadata
  ) => {
    return signUpWithEmail(email, pass, meta);
  };

  const loginWithMagicLinkAction = async (email: string) => {
    return signInWithMagicLink(email);
  };

  const logoutAction = async () => {
    if (configured) {
      await supabaseSignOut();
    }
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isConfigured: configured,
        loginWithGoogle: loginWithGoogleAction,
        loginWithGithub: loginWithGithubAction,
        loginWithEmail: loginWithEmailAction,
        registerWithEmail: registerWithEmailAction,
        loginWithMagicLink: loginWithMagicLinkAction,
        logout: logoutAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
