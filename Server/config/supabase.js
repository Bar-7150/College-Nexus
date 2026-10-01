const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "";

/**
 * Checks whether valid, non-placeholder Supabase credentials are configured
 */
function isSupabaseConfigured() {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_SERVICE_ROLE_KEY) &&
    !SUPABASE_URL.includes("your-project-id") &&
    !SUPABASE_SERVICE_ROLE_KEY.includes("your-")
  );
}

let supabaseClient = null;

/**
 * Returns an initialized Supabase admin client with service_role privilege
 */
function getSupabaseAdmin() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  return supabaseClient;
}

/**
 * Health check helper to verify Supabase connectivity
 */
async function testSupabaseConnection() {
  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      configured: false,
      message:
        "Supabase credentials in Server/.env are placeholder. Insert live SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to connect.",
    };
  }

  try {
    const client = getSupabaseAdmin();
    // Test auth service responsiveness
    const { data, error } = await client.auth.admin.listUsers({ page: 1, perPage: 1 });
    if (error) {
      return {
        ok: false,
        configured: true,
        message: `Supabase auth ping returned error: ${error.message}`,
      };
    }
    return {
      ok: true,
      configured: true,
      message: "Supabase authentication & database connected successfully.",
    };
  } catch (err) {
    return {
      ok: false,
      configured: true,
      message: `Failed to connect to Supabase: ${err.message}`,
    };
  }
}

module.exports = {
  isSupabaseConfigured,
  getSupabaseAdmin,
  testSupabaseConnection,
};
