const { getSupabaseAdmin, isSupabaseConfigured } = require("../config/supabase");

/**
 * Extracts structured KGEC student identity from Supabase user metadata
 */
function extractStudentProfile(user) {
  if (!user) return null;
  const meta = user.user_metadata || {};
  return {
    id: user.id,
    email: user.email,
    name: meta.full_name || meta.name || user.email?.split("@")[0] || "Student",
    rollNumber: meta.roll_number || "22/CSE/042",
    department: meta.department || "CSE",
    batchYear: meta.batch_year || "2022-2026",
    avatarUrl: meta.avatar_url || meta.picture || null,
  };
}

/**
 * Middleware: Require a valid Supabase JWT Bearer token
 */
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      error: {
        code: "UNAUTHORIZED",
        message: "Institutional authentication token required. Provide 'Authorization: Bearer <token>'.",
        timestamp: new Date().toISOString(),
      },
    });
  }

  const token = authHeader.split(" ")[1];

  // If Supabase credentials are placeholder, support demo/offline testing
  if (!isSupabaseConfigured()) {
    req.user = {
      id: "demo-student-id",
      email: "student@kgec.edu.in",
      user_metadata: {
        full_name: "Arjun Sen",
        roll_number: "22/CSE/042",
        department: "CSE",
        batch_year: "2022-2026",
      },
    };
    req.student = extractStudentProfile(req.user);
    req.isDemoAuth = true;
    return next();
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        error: {
          code: "INVALID_TOKEN",
          message: error?.message || "Invalid or expired institutional authentication token.",
          timestamp: new Date().toISOString(),
        },
      });
    }

    req.user = user;
    req.student = extractStudentProfile(user);
    req.isDemoAuth = false;
    next();
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: {
        code: "AUTH_VERIFICATION_ERROR",
        message: `Failed to verify credentials: ${err.message}`,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

/**
 * Middleware: Optional authentication (attaches user if token present)
 */
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    req.user = null;
    req.student = null;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!isSupabaseConfigured()) {
    req.user = {
      id: "demo-student-id",
      email: "student@kgec.edu.in",
      user_metadata: {
        full_name: "Arjun Sen",
        roll_number: "22/CSE/042",
        department: "CSE",
      },
    };
    req.student = extractStudentProfile(req.user);
    req.isDemoAuth = true;
    return next();
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: { user } } = await supabase.auth.getUser(token);
    req.user = user || null;
    req.student = extractStudentProfile(user);
    req.isDemoAuth = false;
  } catch (err) {
    req.user = null;
    req.student = null;
  }

  next();
}

module.exports = {
  requireAuth,
  optionalAuth,
  extractStudentProfile,
};
