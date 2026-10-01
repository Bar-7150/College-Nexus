import { createClient, isSupabaseConfigured } from "./client";

export interface StudentSignUpMetadata {
  fullName: string;
  rollNumber: string;
  department: string;
  batchYear?: string;
}

/**
 * Sign in using Google OAuth
 */
export async function signInWithGoogle() {
  const supabase = createClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
}

/**
 * Sign in using GitHub OAuth
 */
export async function signInWithGithub() {
  const supabase = createClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email: string, password: string) {
  const supabase = createClient();
  return supabase.auth.signInWithPassword({
    email,
    password,
  });
}

/**
 * Sign up with Email, Password, and institutional student metadata (Roll, Department, Name)
 */
export async function signUpWithEmail(
  email: string,
  password: string,
  metadata: StudentSignUpMetadata
) {
  const supabase = createClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name: metadata.fullName,
        roll_number: metadata.rollNumber,
        department: metadata.department,
        batch_year: metadata.batchYear || "2022-2026",
        role: "STUDENT",
      },
    },
  });
}

/**
 * Passwordless Magic Link / OTP Authentication
 */
export async function signInWithMagicLink(email: string) {
  const supabase = createClient();
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });
}

/**
 * Sign out
 */
export async function signOut() {
  const supabase = createClient();
  return supabase.auth.signOut();
}

/**
 * Get current session
 */
export async function getSession() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/**
 * Get current user
 */
export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
}

export { isSupabaseConfigured };
