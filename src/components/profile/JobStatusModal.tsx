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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                {isSelf ? "Job & Internship Preferences" : "Candidate Career Details"}
              </h3>
              <p className="text-[11px] text-slate-500">
                {isSelf
                  ? "Configure your career availability and target positions"
                  : "Student employment availability and preferred locations"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSelf ? (
            <form onSubmit={handleSave} className="space-y-4">
              {/* Open to Work Toggle */}
              <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1"></div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      Show &quot;Open to Work&quot; Profile Frame
                    </h4>
                    <p className="text-[11px] text-emerald-800 leading-snug">
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
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>

              {/* Status Radio / Select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Placement & Job Status
                </label>
                <select
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as JobStatusInfo["status"])
                  }
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
                >
                  <option value="Actively Looking">Actively Looking (Ready for Interviews)</option>
                  <option value="Open to Offers">Open to Offers (Casual browsing)</option>
                  <option value="Interning">Currently Interning</option>
                  <option value="Placed">Placed (Pre-Placement Offer / Final Year Offer)</option>
                  <option value="Researching">Focused on Academic Research</option>
                </select>
              </div>

              {/* Target Roles */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Target Roles
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {targetRoles.map((role) => (
                    <span
                      key={role}
                      className="text-xs px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium"
                    >
                      <span>{role}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRole(role)}
                        className="text-slate-400 hover:text-red-600"
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
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preferred Locations */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Work Locations
                </label>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {preferredLocations.map((loc) => (
                    <span
                      key={loc}
                      className="text-xs px-2.5 py-1 bg-slate-100 text-slate-800 rounded-lg flex items-center gap-1 font-medium"
                    >
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{loc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(loc)}
                        className="text-slate-400 hover:text-red-600"
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
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Earliest Available Start Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. Summer 2026 / Immediate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Note */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Pitch to Recruiters & Alum Referrers
                </label>
                <textarea
                  rows={2}
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="Briefly state your core technical strengths and availability..."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 resize-none"
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
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            /* Peer View Mode */
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                  Candidate Status
                </div>
                <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span>{jobStatus.status}</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Target Roles
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobStatus.targetRoles.map((role, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs rounded-lg font-medium border border-slate-200"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Locations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {jobStatus.preferredLocations.map((loc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-800 text-xs rounded-lg font-medium flex items-center gap-1 border border-slate-200"
                    >
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{loc}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">
                    Available Start Date
                  </div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {jobStatus.startDate}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-mono text-[10px] uppercase">
                    Job Type
                  </div>
                  <div className="font-bold text-slate-800 mt-0.5">
                    {jobStatus.jobTypes.join(", ")}
                  </div>
                </div>
              </div>

              {jobStatus.customNote && (
                <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl text-xs text-blue-900 leading-relaxed">
                  <strong className="block font-semibold mb-0.5">
                    Candidate Pitch / Note:
                  </strong>
                  {jobStatus.customNote}
                </div>
              )}

              <div className="pt-2 text-right">
                <button
                  onClick={onClose}
                  className="px-5 py-2 bg-slate-900 hover:bg-black text-white text-xs font-semibold rounded-lg"
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
