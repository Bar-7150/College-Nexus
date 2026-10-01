"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AuthGuard from "@/components/auth/AuthGuard";
import FixedCampusBackground from "@/components/FixedCampusBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import { uploadToCloudinary, deleteFromCloudinary, UploadResult } from "@/lib/uploadService";
import {
  Cloud,
  Upload,
  CheckCircle,
  AlertCircle,
  Copy,
  Trash2,
  FileText,
  Server,
  Sparkles,
  ExternalLink,
  ArrowLeft,
  RefreshCw,
  ShieldAlert,
} from "lucide-react";

export default function UploadTestPage() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [folder, setFolder] = useState<string>("college-nexus/test");
  const [targetServer, setTargetServer] = useState<"express" | "nextjs">("express");

  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<UploadResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [instructionMessage, setInstructionMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Server health state
  const [expressHealth, setExpressHealth] = useState<any>(null);
  const [nextHealth, setNextHealth] = useState<any>(null);
  const [isCheckingHealth, setIsCheckingHealth] = useState(false);

  const checkHealth = async () => {
    setIsCheckingHealth(true);
    // Check Express
    try {
      const res = await fetch("http://localhost:5000/api/health");
      const data = await res.json();
      setExpressHealth(data);
    } catch (err: any) {
      setExpressHealth({ success: false, error: err.message });
    }

    // Check Next.js
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      setNextHealth(data);
    } catch (err: any) {
      setNextHealth({ success: false, error: err.message });
    }
    setIsCheckingHealth(false);
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage(null);
      setInstructionMessage(null);
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => setFilePreview(reader.result as string);
        reader.readAsDataURL(file);
      } else {
        setFilePreview(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setErrorMessage(null);
    setInstructionMessage(null);

    const res = await uploadToCloudinary(selectedFile, {
      folder,
      serverType: targetServer,
    });

    setIsUploading(false);

    if (res.success && res.data) {
      setUploadResult(res.data);
    } else {
      setErrorMessage(res.error || "Upload failed.");
      setInstructionMessage(res.instruction || null);
    }
  };

  const handleCopy = (text: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDelete = async (publicId: string) => {
    if (!confirm(`Are you sure you want to remove ${publicId} from Cloudinary?`)) return;
    const res = await deleteFromCloudinary(publicId);
    if (res.success) {
      setUploadResult(null);
      setSelectedFile(null);
      setFilePreview(null);
      alert("Asset removed from Cloudinary.");
    } else {
      alert("Failed to delete asset: " + res.message);
    }
  };

  return (
    <AuthGuard
      resourceName="KGEC Intranet Asset Vault & Cloud Storage"
      resourceDescription="Access to the campus document repository, Cloudinary object storage, and academic vault asset pipelines requires authenticated KGEC institutional credentials."
    >
      <main className="min-h-screen bg-[#070e0a] text-[#f5f9f6] relative selection:bg-[#c79e4d] selection:text-[#0b1510] flex flex-col justify-between overflow-x-hidden">
      <FixedCampusBackground />
      <Navbar onOpenLoginModal={() => setLoginModalOpen(true)} />

      <div className="pt-24 sm:pt-28 md:pt-[102px] pb-16 relative z-10 max-w-5xl mx-auto px-4 sm:px-6 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs font-mono uppercase tracking-wider text-[#a4b8ab] hover:text-[#deb86d] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Campus Intranet</span>
          </Link>

          <span className="text-xs font-mono text-[#deb86d] bg-[#c79e4d]/15 px-3 py-1 rounded-full border border-[#c79e4d]/30 flex items-center gap-1.5">
            <Cloud className="w-3.5 h-3.5" />
            <span>Cloudinary Media Setup</span>
          </span>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight flex items-center gap-3">
            <span>Backend Server & Cloudinary Control</span>
            <Sparkles className="w-6 h-6 text-[#deb86d]" />
          </h1>
          <p className="text-xs sm:text-sm text-[#a4b8ab] mt-1.5 font-light max-w-2xl leading-relaxed">
            Manage media uploads, verify Cloudinary object storage credentials, and test file
            streaming via either the standalone Node.js Express server or Next.js App Router API.
          </p>
        </div>

        {/* Server & Cloudinary Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Express Backend Card */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#070e0a]/20 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 p-5 shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-[#deb86d]" />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                  Express Server (:5000)
                </h3>
              </div>
              <button
                onClick={checkHealth}
                disabled={isCheckingHealth}
                className="text-[11px] text-[#deb86d] hover:text-white flex items-center gap-1 font-mono cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isCheckingHealth ? "animate-spin" : ""}`} />
                <span>Check</span>
              </button>
            </div>

            {expressHealth?.success ? (
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-bold">STATUS: ONLINE</span>
                </div>
                <div className="text-[#a4b8ab] text-[11px]">
                  Cloudinary: <strong className="text-white">{expressHealth.storage?.cloud_name}</strong>
                  {expressHealth.storage?.connected && " (Verified ✓)"}
                </div>
                <div className="text-[10px] text-[#8fa597]">
                  Uptime: {Math.round(expressHealth.server?.uptime || 0)}s · Node {expressHealth.server?.node_version}
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Run &apos;npm run dev&apos; in /Server to launch Express</span>
              </div>
            )}
          </div>

          {/* Next.js Native API Card */}
          <div className="group relative rounded-2xl overflow-hidden bg-[#070e0a]/20 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 p-5 shadow-lg">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent pointer-events-none"></div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-[#deb86d]" />
                <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-white">
                  Next.js API (/api/upload)
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                Native App Router
              </span>
            </div>

            {nextHealth?.success ? (
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="font-bold">READY FOR UPLOADS</span>
                </div>
                <div className="text-[#a4b8ab] text-[11px]">
                  Cloud Name: <strong className="text-white">{nextHealth.storage?.cloud_name || "daybrhbsc"}</strong>
                </div>
                <div className="text-[10px] text-[#8fa597]">
                  {nextHealth.storage?.message}
                </div>
              </div>
            ) : (
              <div className="text-xs font-mono text-amber-300">Checking Next.js API...</div>
            )}
          </div>
        </div>

        {/* Upload Test Container Card */}
        <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 p-6 sm:p-8 shadow-2xl transition-all">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 pointer-events-none"></div>

          <h2 className="text-lg font-serif font-bold text-white mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-[#deb86d]" />
            <span>Interactive File Upload Tester</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Form & File Input */}
            <div className="space-y-4">
              {/* Target Server Switcher */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Route Through:
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetServer("express")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                      targetServer === "express"
                        ? "bg-[#c79e4d] text-[#08120c] border-[#c79e4d] shadow-md font-bold"
                        : "bg-white/[0.04] text-white border-white/15 hover:bg-white/[0.08]"
                    }`}
                  >
                    Express Server (:5000)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetServer("nextjs")}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer border ${
                      targetServer === "nextjs"
                        ? "bg-[#c79e4d] text-[#08120c] border-[#c79e4d] shadow-md font-bold"
                        : "bg-white/[0.04] text-white border-white/15 hover:bg-white/[0.08]"
                    }`}
                  >
                    Next.js API Route
                  </button>
                </div>
              </div>

              {/* Target Folder */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Cloudinary Folder Path:
                </label>
                <input
                  type="text"
                  value={folder}
                  onChange={(e) => setFolder(e.target.value)}
                  placeholder="e.g. college-nexus/profiles, college-nexus/vault"
                  className="w-full px-3.5 py-2 text-xs bg-[#070e0a]/60 backdrop-blur-md border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-mono"
                />
              </div>

              {/* File Input Box */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Select Media / Document:
                </label>
                <label className="border-2 border-dashed border-white/20 hover:border-[#c79e4d]/70 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-white/[0.02] hover:bg-white/[0.05] transition-all">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.pptx,.zip"
                  />
                  <Upload className="w-8 h-8 text-[#deb86d] mb-2" />
                  <span className="text-xs font-mono text-white font-semibold">
                    {selectedFile ? selectedFile.name : "Click to choose a file"}
                  </span>
                  <span className="text-[10px] text-[#8fa597] font-mono mt-1">
                    Images (JPG, PNG, WEBP) or Documents (PDF, DOCX) up to 25MB
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleUpload}
                disabled={!selectedFile || isUploading}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-mono uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  !selectedFile || isUploading
                    ? "bg-white/10 text-white/40 cursor-not-allowed border border-white/10"
                    : "bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] hover:shadow-[0_0_20px_rgba(199,158,77,0.35)]"
                }`}
              >
                {isUploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Streaming to Cloudinary...</span>
                  </>
                ) : (
                  <>
                    <Cloud className="w-4 h-4" />
                    <span>Upload to Cloudinary</span>
                  </>
                )}
              </button>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 bg-rose-950/80 border border-rose-500/40 rounded-xl text-xs text-rose-200 space-y-1.5 animate-in fade-in">
                  <div className="flex items-center gap-2 font-bold text-rose-300">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Upload Error</span>
                  </div>
                  <p className="font-mono text-[11px]">{errorMessage}</p>

                  {instructionMessage && (
                    <div className="mt-2 pt-2 border-t border-rose-500/30 text-[11px] text-amber-200 flex items-start gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
                      <span>{instructionMessage}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Right Column: Preview & Cloudinary Result */}
            <div className="space-y-4">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Upload Preview & Metadata:
              </label>

              {uploadResult ? (
                <div className="p-5 bg-white/[0.04] backdrop-blur-md rounded-2xl border border-[#c79e4d]/40 space-y-4 animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 font-mono">
                      <CheckCircle className="w-4 h-4" />
                      <span>Uploaded Successfully</span>
                    </span>
                    <button
                      onClick={() => handleDelete(uploadResult.public_id)}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 font-mono cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  {uploadResult.format && ["jpg", "jpeg", "png", "webp", "gif"].includes(uploadResult.format.toLowerCase()) ? (
                    <div className="relative rounded-xl overflow-hidden max-h-48 border border-white/15 bg-black/40 flex items-center justify-center">
                      <img
                        src={uploadResult.secure_url}
                        alt="Uploaded preview"
                        className="max-h-48 object-contain"
                      />
                    </div>
                  ) : (
                    <div className="p-6 rounded-xl border border-white/15 bg-white/[0.02] flex items-center justify-center gap-2 text-xs font-mono text-[#deb86d]">
                      <FileText className="w-6 h-6" />
                      <span>{uploadResult.original_filename} ({uploadResult.format?.toUpperCase()})</span>
                    </div>
                  )}

                  {/* URL Row */}
                  <div>
                    <label className="block text-[10px] font-mono text-[#8fa597] mb-1">
                      CLOUDINARY SECURE URL
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        readOnly
                        value={uploadResult.secure_url}
                        className="w-full px-3 py-1.5 text-xs bg-black/50 border border-white/15 rounded-lg text-white font-mono truncate focus:outline-none"
                      />
                      <button
                        onClick={() => handleCopy(uploadResult.secure_url)}
                        className="p-1.5 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-lg transition-colors cursor-pointer shrink-0"
                        title="Copy URL"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <a
                        href={uploadResult.secure_url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 border border-white/20 hover:border-[#c79e4d] bg-white/10 text-white rounded-lg transition-colors shrink-0"
                        title="Open in new tab"
                      >
                        <ExternalLink className="w-4 h-4 text-[#deb86d]" />
                      </a>
                    </div>
                    {copied && (
                      <span className="text-[10px] text-emerald-400 font-mono mt-1 block">
                        ✓ Copied to clipboard!
                      </span>
                    )}
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 rounded-lg bg-black/30 border border-white/10">
                      <span className="text-[#8fa597] block text-[10px]">PUBLIC ID</span>
                      <span className="text-white truncate block">{uploadResult.public_id}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-black/30 border border-white/10">
                      <span className="text-[#8fa597] block text-[10px]">SIZE</span>
                      <span className="text-white">
                        {Math.round(uploadResult.bytes / 1024)} KB ({uploadResult.format?.toUpperCase()})
                      </span>
                    </div>
                  </div>
                </div>
              ) : filePreview ? (
                <div className="rounded-2xl border border-white/15 overflow-hidden max-h-56 bg-black/40 flex items-center justify-center p-2">
                  <img
                    src={filePreview}
                    alt="Local preview"
                    className="max-h-52 object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="border border-white/10 rounded-2xl p-10 text-center text-xs font-mono text-[#8fa597] bg-white/[0.01]">
                  Choose a file on the left and click &quot;Upload to Cloudinary&quot; to test your configuration.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
    </main>
    </AuthGuard>
  );
}
