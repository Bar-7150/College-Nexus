const express = require("express");
const router = express.Router();
const { testCloudinaryConnection } = require("../config/cloudinary");
const { testSupabaseConnection } = require("../config/supabase");

/**
 * @route   GET /api/health
 * @desc    Check server health, Cloudinary connection, and Supabase auth status
 * @access  Public
 */
router.get("/", async (req, res) => {
  const [cloudinaryStatus, supabaseStatus] = await Promise.all([
    testCloudinaryConnection(),
    testSupabaseConnection(),
  ]);

  return res.status(200).json({
    success: true,
    server: {
      status: "online",
      name: "College Nexus Backend API",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      node_version: process.version,
      environment: process.env.NODE_ENV || "development",
    },
    storage: {
      provider: "Cloudinary",
      connected: cloudinaryStatus.ok,
      cloud_name: cloudinaryStatus.cloudName,
      message: cloudinaryStatus.message,
    },
    auth: {
      provider: "Supabase",
      connected: supabaseStatus.ok,
      configured: supabaseStatus.configured,
      message: supabaseStatus.message,
    },
    endpoints: {
      upload_single: "POST /api/upload",
      upload_multiple: "POST /api/upload/multiple",
      upload_document: "POST /api/upload/document",
      delete_asset: "DELETE /api/upload/:public_id",
      direct_signature: "GET /api/upload/signature",
      auth_status: "GET /api/auth/status",
      auth_me: "GET /api/auth/me",
      health_check: "GET /api/health",
    },
  });
});

module.exports = router;
