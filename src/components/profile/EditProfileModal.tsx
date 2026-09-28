"use client";

import React, { useState } from "react";
import { StudentProfile } from "@/data/profileData";
import { Edit3, X, Save } from "lucide-react";

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
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-xl w-full overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-red-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Edit Intro & Campus Profile
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pronouns
              </label>
              <input
                type="text"
                placeholder="e.g. He/Him, She/Her, They/Them"
                value={pronouns}
                onChange={(e) => setPronouns(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Headline *
            </label>
            <textarea
              rows={2}
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 leading-relaxed resize-none"
            />
            <span className="text-[11px] text-slate-400">
              Summarize your technical roles, achievements, and current batch.
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Department
              </label>
              <select
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value as StudentProfile["department"])
                }
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
              >
                <option value="CSE">Computer Science & Engineering (CSE)</option>
                <option value="ECE">Electronics & Communication (ECE)</option>
                <option value="EE">Electrical Engineering (EE)</option>
                <option value="ME">Mechanical Engineering (ME)</option>
                <option value="IT">Information Technology (IT)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Batch Year
              </label>
              <input
                type="text"
                value={batchYear}
                onChange={(e) => setBatchYear(e.target.value)}
                placeholder="e.g. 2022 - 2026 (3rd Year)"
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              About / Bio Summary
            </label>
            <textarea
              rows={4}
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 leading-relaxed resize-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
