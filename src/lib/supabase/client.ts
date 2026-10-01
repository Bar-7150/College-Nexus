import { createBrowserClient } from "@supabase/ssr";

/**
 * Checks whether Supabase environment variables are properly set and not default placeholders.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) return false;
  if (
    url.includes("your-project-id") ||
    url.includes("placeholder") ||
    key.includes("your-anon-key-placeholder") ||
    key.includes("placeholder")
  ) {
    return false;
  }
  return true;
}

/**
 * Creates and returns the Supabase browser client for client components.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

  return createBrowserClient(url, anonKey);
}

export default createClient;
