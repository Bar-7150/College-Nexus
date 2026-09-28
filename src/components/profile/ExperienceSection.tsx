"use client";

import React, { useState } from "react";
import { ExperienceItem } from "@/data/profileData";
import {
  Briefcase,
  Plus,
  MapPin,
  Calendar,
  Building,
  CheckCircle,
  X,
  Sparkles,
} from "lucide-react";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
  isSelf: boolean;
  onAddExperience: (item: ExperienceItem) => void;
}

export default function ExperienceSection({
  experience,
  isSelf,
  onAddExperience,
}: ExperienceSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [employmentType, setEmploymentType] = useState<ExperienceItem["employmentType"]>("Internship");
  const [location, setLocation] = useState("Kalyani, WB");
  const [locationType, setLocationType] = useState<ExperienceItem["locationType"]>("Remote");
  const [startDate, setStartDate] = useState("Jan 2025");
  const [endDate, setEndDate] = useState("Present");
  const [isCurrent, setIsCurrent] = useState(true);
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("React, Next.js, Node.js");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company) return;

    const parsedSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    onAddExperience({
      id: `exp-${Date.now()}`,
      title,
      company,
      employmentType,
      location,
      locationType,
      startDate,
      endDate: isCurrent ? "Present" : endDate,
      isCurrent,
      description,
      skills: parsedSkills,
      companyLogoBg: "bg-red-600 text-white",
    });

    // Reset
    setTitle("");
    setCompany("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden mb-6">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900">
              Experience & Internships
            </h2>
            <p className="text-xs text-slate-500">
              Industry roles, research fellowships & campus leadership
            </p>
          </div>
        </div>

        {isSelf && (
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">Add Experience</span>
          </button>
        )}
      </div>

      {/* Experience List */}
      <div className="p-5 sm:p-6 space-y-6">
        {experience.map((item, idx) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Logo Avatar */}
            <div
              className={`w-12 h-12 rounded-xl ${
                item.companyLogoBg || "bg-slate-800 text-white"
              } flex items-center justify-center font-bold text-sm shadow-2xs shrink-0 select-none`}
            >
              {item.company.charAt(0)}
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md font-mono self-start sm:self-auto">
                  {item.employmentType}
                </span>
              </div>

              <div className="text-xs font-medium text-slate-700 flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-red-600">{item.company}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  <span>
                    {item.startDate} – {item.endDate}
                  </span>
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>
                    {item.location} ({item.locationType})
                  </span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1 whitespace-pre-line">
                {item.description}
              </p>

              {/* Skills Tags */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 mr-1">
                    Skills:
                  </span>
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-700 rounded-md font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider line between items */}
            {idx < experience.length - 1 && (
              <div className="absolute left-6 top-14 bottom-[-16px] w-[1px] bg-slate-200 hidden sm:block"></div>
            )}
          </div>
        ))}
      </div>

      {/* Add Experience Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Add Work / Internship Experience
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Title / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Intern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Company / Org *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google or DevCom KGEC"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) =>
                      setEmploymentType(e.target.value as ExperienceItem["employmentType"])
                    }
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                  >
                    <option value="Internship">Internship</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Campus Leadership">Campus Leadership</option>
                    <option value="Freelance">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jun 2025"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    disabled={isCurrent}
                    placeholder="e.g. Aug 2025"
                    value={isCurrent ? "Present" : endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 disabled:bg-slate-100"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentRole"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="rounded text-red-600 focus:ring-red-500"
                />
                <label htmlFor="currentRole" className="text-xs text-slate-700 font-medium">
                  I currently work in this role
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description of Key Deliverables
                </label>
                <textarea
                  rows={3}
                  placeholder="Architected REST APIs, tuned database queries, mentored 5 juniors..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Technologies / Skills Used (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, Docker"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
                >
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
