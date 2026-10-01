"use client";

import React, { useState } from "react";
import { JobStatusInfo } from "@/data/profileData";
import {
  Briefcase,
  X,
  Check,
  Plus,
  Trash2,
  MapPin,
  Calendar,
  Sparkles,
} from "lucide-react";

interface JobStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobStatus: JobStatusInfo;
  isSelf: boolean;
  onUpdateJobStatus?: (newStatus: JobStatusInfo) => void;
}

export default function JobStatusModal({
  isOpen,
  onClose,
  jobStatus,
  isSelf,
  onUpdateJobStatus,
}: JobStatusModalProps) {
  const [status, setStatus] = useState<JobStatusInfo["status"]>(jobStatus.status);
  const [isOpenToWork, setIsOpenToWork] = useState(jobStatus.isOpenToWork);
  const [targetRoles, setTargetRoles] = useState<string[]>(jobStatus.targetRoles);
  const [newRoleInput, setNewRoleInput] = useState("");
  const [preferredLocations, setPreferredLocations] = useState<string[]>(
    jobStatus.preferredLocations
  );
  const [newLocationInput, setNewLocationInput] = useState("");
  const [startDate, setStartDate] = useState(jobStatus.startDate);
  const [customNote, setCustomNote] = useState(jobStatus.customNote || "");

  if (!isOpen) return null;

  const handleAddRole = () => {
    if (newRoleInput.trim() && !targetRoles.includes(newRoleInput.trim())) {
      setTargetRoles([...targetRoles, newRoleInput.trim()]);
      setNewRoleInput("");
    }
  };

  const handleRemoveRole = (role: string) => {
    setTargetRoles(targetRoles.filter((r) => r !== role));
  };

  const handleAddLocation = () => {
    if (
      newLocationInput.trim() &&
      !preferredLocations.includes(newLocationInput.trim())
    ) {
      setPreferredLocations([...preferredLocations, newLocationInput.trim()]);
      setNewLocationInput("");
    }
  };

  const handleRemoveLocation = (loc: string) => {
    setPreferredLocations(preferredLocations.filter((l) => l !== loc));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateJobStatus) {
      onUpdateJobStatus({
        status,
        isOpenToWork,
        targetRoles,
        preferredLocations,
        jobTypes: ["Internship", "Full-time"],
        startDate,
        customNote,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] flex items-center justify-center font-bold border border-[#c79e4d]/30">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                {isSelf ? "Job & Internship Preferences" : "Candidate Career Details"}
              </h3>
              <p className="text-[11px] text-[#a3b899]">
                {isSelf
                  ? "Configure your career availability and target positions"
                  : "Student employment availability and preferred locations"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSelf ? (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Open to Work Toggle */}
              <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/30 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Show &quot;Open to Work&quot; Profile Frame
                    </h4>
                    <p className="text-[11px] text-[#a3b899] leading-snug">
                      Displays a green ring on your avatar and highlights you in the campus placement directory.
                    </p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={isOpenToWork}
                    onChange={(e) => setIsOpenToWork(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-white/20 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Status Radio / Select */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Current Placement & Job Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as JobStatusInfo["status"])
                  }
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none font-medium"
                >
                  <option value="Actively Looking" className="bg-[#0b1510]">Actively Looking (Ready for Interviews)</option>
                  <option value="Open to Offers" className="bg-[#0b1510]">Open to Offers (Casual browsing)</option>
                  <option value="Interning" className="bg-[#0b1510]">Currently Interning</option>
                  <option value="Placed" className="bg-[#0b1510]">Placed (Pre-Placement Offer / Final Year Offer)</option>
                  <option value="Researching" className="bg-[#0b1510]">Focused on Academic Research</option>
                </select>
              </div>

              {/* Target Roles */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Target Roles
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {targetRoles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2.5 py-1 bg-white/[0.05] border border-white/15 text-[#deb86d] rounded-lg flex items-center gap-1 font-mono"
                    >
                      <span>{role}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                        className="text-white/40 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add a target role (e.g. SDE Intern, Backend Engineer)"
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRole();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="p-2 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#08120c] rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preferred Locations */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Preferred Work Locations
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {preferredLocations.map((loc) => (
                    <span
                      key={loc}
                      className="text-xs px-2.5 py-1 bg-white/[0.05] border border-white/15 text-[#d4e4da] rounded-lg flex items-center gap-1 font-mono"
                    >
                      <MapPin className="w-3 h-3 text-[#deb86d]" />
                      <span>{loc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(loc)}
                        className="text-white/40 hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add location (e.g. Bengaluru, Kolkata, Remote)"
                    value={newLocationInput}
                    onChange={(e) => setNewLocationInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddLocation();
                      }
                    }}
                    className="flex-1 px-3 py-1.5 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="p-2 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#08120c] rounded-xl transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Earliest Available Start Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer 2026 / Immediate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1.5">
                  Pitch to Recruiters & Alum Referrers
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Briefly state your core technical strengths and availability..."
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none resize-none leading-relaxed"
                />
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
                  className="px-5 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-colors shadow-md cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* Peer View Mode */
            <div className="space-y-4">
              <div className="p-3 bg-white/[0.03] border border-white/10 rounded-xl space-y-1">
                <div className="text-xs font-bold text-[#deb86d] uppercase tracking-wider font-mono">
                  Candidate Status
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>{jobStatus.status}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-2">
                  Target Roles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobStatus.targetRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/[0.05] border border-white/15 text-[#deb86d] text-xs rounded-lg font-mono"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-2">
                  Preferred Locations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobStatus.preferredLocations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-white/[0.05] border border-white/15 text-[#d4e4da] text-xs rounded-lg font-mono flex items-center gap-1"
                    >
                      <MapPin className="w-3 h-3 text-[#deb86d]" />
                      <span>{loc}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10">
                  <div className="text-[#a3b899] font-mono text-[10px] uppercase">
                    Available Start Date
                  </div>
                  <div className="font-bold text-white mt-0.5 font-mono">
                    {jobStatus.startDate}
                  </div>
                </div>

                <div className="p-3 bg-white/[0.03] rounded-xl border border-white/10">
                  <div className="text-[#a3b899] font-mono text-[10px] uppercase">
                    Job Type
                  </div>
                  <div className="font-bold text-white mt-0.5 font-mono">
                    {jobStatus.jobTypes.join(", ")}
                  </div>
                </div>
              </div>

              {jobStatus.customNote && (
                <div className="p-3 bg-[#c79e4d]/10 border border-[#c79e4d]/30 rounded-xl text-xs text-[#deb86d] leading-relaxed">
                  <strong className="block font-semibold mb-0.5 font-mono uppercase text-[10px]">
                    Candidate Pitch / Note:
                  </strong>
                  {jobStatus.customNote}
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-semibold rounded-xl border border-white/15 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
