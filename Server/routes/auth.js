const express = require("express");
const router = express.Router();
const { isSupabaseConfigured, testSupabaseConnection } = require("../config/supabase");
const { requireAuth, optionalAuth } = require("../middleware/auth");

/**
 * @route   GET /api/auth/status
 * @desc    Get Supabase authentication service configuration status
 * @access  Public (Optionally includes user if Bearer token present)
 */
router.get("/status", optionalAuth, async (req, res) => {
  const supabaseStatus = await testSupabaseConnection();

  return res.status(200).json({
    success: true,
    service: "College Nexus Intranet Authentication",
    configured: isSupabaseConfigured(),
    connection: supabaseStatus,
    supported_methods: [
      {
        id: "google",
        name: "Google Institutional Workspace OAuth",
        status: isSupabaseConfigured() ? "active" : "demo_fallback",
      },
      {
        id: "github",
        name: "GitHub Developer OAuth",
        status: isSupabaseConfigured() ? "active" : "demo_fallback",
      },
      {
        id: "email",
        name: "Email + Roll Number Institutional Registration",
        status: isSupabaseConfigured() ? "active" : "demo_fallback",
      },
      {
        id: "magic_link",
        name: "Passwordless Magic Link OTP",
        status: isSupabaseConfigured() ? "active" : "demo_fallback",
      },
      {
        id: "roll_auth",
        name: "KGEC Institutional Roll Number Offline Verification",
        status: "active",
      },
    ],
    authenticated: Boolean(req.user),
    user: req.student || null,
  });
});

/**
 * @route   GET /api/auth/me
 * @desc    Get current authenticated student's profile from verified Supabase JWT
 * @access  Protected
 */
router.get("/me", requireAuth, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Institutional token verified successfully.",
    student: req.student,
    isDemoAuth: req.isDemoAuth,
  });
});

module.exports = router;
