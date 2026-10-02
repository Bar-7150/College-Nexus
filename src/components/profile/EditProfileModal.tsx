"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/data/profileData";
import { Edit3, X, Save, UploadCloud, Loader2, CheckCircle2 } from "lucide-react";
import { uploadToCloudinary } from "@/lib/uploadService";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onSaveProfile: (updated: Partial<StudentProfile>) => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
}: EditProfileModalProps) {
  const [name, setName] = useState(profile.name);
  const [pronouns, setPronouns] = useState(profile.pronouns);
  const [headline, setHeadline] = useState(profile.headline);
  const [location, setLocation] = useState(profile.location);
  const [about, setAbout] = useState(profile.about);
  const [department, setDepartment] = useState(profile.department);
  const [batchYear, setBatchYear] = useState(profile.batchYear);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || "");
  const [bannerUrl, setBannerUrl] = useState(profile.bannerUrl || "");

  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleUploadImage = async (
    file: File | undefined,
    folder: string,
    setLoadingState: (loading: boolean) => void,
    setUrl: (url: string) => void
  ) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUploadError(null);
    setLoadingState(true);

    try {
      const res = await uploadToCloudinary(file, { folder });
      if (res.success && res.data?.secure_url) {
        setUrl(res.data.secure_url);
      } else {
        setUploadError(res.error || "Failed to upload to Cloudinary.");
      }
    } catch (err: any) {
      setUploadError(err.message || "Failed to stream image to Cloudinary.");
    } finally {
      setLoadingState(false);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name,
      pronouns,
      headline,
      location,
      about,
      department,
      batchYear,
      avatarUrl,
      bannerUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-[#deb86d]" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Edit Intro & Campus Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {uploadError && (
          <div className="mx-6 mt-4 p-3 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-200 text-xs font-mono">
            {uploadError}
          </div>
        )}

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Full Name & Pronouns */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                Full Name *
              </label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                Pronouns
              </label>
              <input
                type="text"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                placeholder="e.g. He/Him"
                className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Department & Batch Year */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                Department / Branch *
              </label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none font-medium"
              >
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EE">Electrical Engineering (EE)</option>
                <option value="ME">Mechanical Engineering (ME)</option>
                <option value="IT">Information Technology (IT)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                Batch Year *
              </label>
              <input
                type="text"
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                placeholder="2022-2026"
                className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none font-medium"
              />
            </div>
          </div>

          {/* Headline */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
              Headline / Student Bio *
            </label>
            <textarea
              required
              rows={2}
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none leading-relaxed resize-none font-medium"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Kalyani, West Bengal, India"
              className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none font-medium"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
              About Summary
            </label>
            <textarea
              rows={3}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none leading-relaxed resize-none font-medium"
            />
          </div>

          {/* Cloudinary Image Upload Section */}
          <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-2">
            {/* Profile Avatar Upload */}
            <div className="rounded-xl border border-white/10 bg-[#0b1510] p-3 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Profile Picture (Cloudinary)
              </label>

              {avatarUrl && (
                <div className="flex items-center gap-3">
                  <img
                    src={avatarUrl}
                    alt="Avatar preview"
                    className="h-12 w-12 rounded-full object-cover border-2 border-[#deb86d]"
                  />
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Cloudinary Asset Ready
                  </span>
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={isUploadingAvatar}
                onChange={(event) =>
                  handleUploadImage(
                    event.target.files?.[0],
                    "college-nexus/profiles",
                    setIsUploadingAvatar,
                    setAvatarUrl
                  )
                }
                className="block w-full text-[11px] text-[#a9c0ae] file:mr-2 file:rounded-lg file:border-0 file:bg-[#c79e4d] file:px-2.5 file:py-1.5 file:text-xs file:font-bold file:text-[#08120c] file:cursor-pointer"
              />

              {isUploadingAvatar && (
                <div className="flex items-center gap-1.5 text-xs text-[#deb86d]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Uploading to Cloudinary...</span>
                </div>
              )}
            </div>

            {/* Profile Banner Upload */}
            <div className="rounded-xl border border-white/10 bg-[#0b1510] p-3 space-y-2">
              <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d]">
                Profile Banner (Cloudinary)
              </label>

              {bannerUrl && (
                <div className="flex items-center gap-3">
                  <img
                    src={bannerUrl}
                    alt="Banner preview"
                    className="h-10 w-24 rounded object-cover border border-[#deb86d]/50"
                  />
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Ready
                  </span>
                </div>
              )}

              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                disabled={isUploadingBanner}
                onChange={(event) =>
                  handleUploadImage(
                    event.target.files?.[0],
                    "college-nexus/banners",
                    setIsUploadingBanner,
                    setBannerUrl
                  )
                }
                className="block w-full text-[11px] text-[#a9c0ae] file:mr-2 file:rounded-lg file:border-0 file:bg-[#c79e4d] file:px-2.5 file:py-1.5 file:text-xs file:font-bold file:text-[#08120c] file:cursor-pointer"
              />

              {isUploadingBanner && (
                <div className="flex items-center gap-1.5 text-xs text-[#deb86d]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Uploading to Cloudinary...</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-white/20 text-white/70 hover:text-white rounded-xl text-xs font-mono hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploadingAvatar || isUploadingBanner}
              className="px-5 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-colors shadow-md flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save &amp; Sync Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
