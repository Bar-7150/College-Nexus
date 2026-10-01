const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadRoutes = require("./routes/upload");
const healthRoutes = require("./routes/health");
const authRoutes = require("./routes/auth");
const vaultRoutes = require("./routes/vault");
const { testCloudinaryConnection } = require("./config/cloudinary");
const { testSupabaseConnection } = require("./config/supabase");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:3000";

// Middleware: CORS for frontend intranet access
app.use(
  cors({
    origin: [CLIENT_URL, "http://localhost:3000", "http://127.0.0.1:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsers
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Request Logger (Development)
app.use((req, res, next) => {
  const timestamp = new Date().toISOString().split("T")[1].replace("Z", "");
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// Root Welcome Route
app.get("/", (req, res) => {
  res.status(200).json({
    name: "College Nexus — Collegiate Intranet & Academic API Server",
    campus: "Kalyani Government Engineering College (KGEC)",
    status: "online",
    version: "1.0.0",
    docs: {
      health: "/api/health",
      auth_status: "/api/auth/status",
      auth_me: "/api/auth/me",
      upload: "/api/upload",
      upload_document: "/api/upload/document",
    },
    message: "Backend server is running smoothly with Cloudinary object storage & Supabase auth.",
  });
});

// Mount Routes
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/vault", vaultRoutes);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: "RESOURCE_NOT_FOUND",
      message: `The endpoint ${req.method} ${req.originalUrl} does not exist.`,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
});

// Centralized Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message || err);

  // Multer File Size Error
  if (err.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({
      success: false,
      error: {
        code: "FILE_TOO_LARGE",
        message: "Uploaded file exceeds the maximum allowed limit of 25MB.",
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  // Multer Unexpected Field
  if (err.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      success: false,
      error: {
        code: "UNEXPECTED_FILE_FIELD",
        message: `Unexpected file field received (${err.field}). Use 'file' or 'files'.`,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  // Generic Error Handler (conforms to docs/API_SPEC.md)
  const statusCode = err.status || err.statusCode || (err.http_code ? err.http_code : 500);
  return res.status(statusCode).json({
    success: false,
    error: {
      code: err.code || "INTERNAL_SERVER_ERROR",
      message: err.message || "An unexpected error occurred on the server.",
      instruction: err.userGuide || undefined,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
});

// Start Server & Test Cloudinary
app.listen(PORT, async () => {
  console.log("==================================================");
  console.log(`🚀 College Nexus Server running on http://localhost:${PORT}`);
  console.log(`🌐 Allowed Client URL: ${CLIENT_URL}`);
  console.log(`📁 Upload Route: http://localhost:${PORT}/api/upload`);
  console.log(`🩺 Health Route: http://localhost:${PORT}/api/health`);
  console.log("==================================================");

  // Verify Cloudinary credentials on startup
  const cloudStatus = await testCloudinaryConnection();
  if (cloudStatus.ok) {
    console.log(`☁️  Cloudinary Connected! [Cloud Name: ${cloudStatus.cloudName}]`);
  } else {
    console.warn(`⚠️ Cloudinary Connection Issue: ${cloudStatus.message}`);
  }
  console.log("==================================================");
});

module.exports = app;
