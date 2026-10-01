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
      companyLogoBg: "bg-emerald-950 text-[#deb86d] border border-[#c79e4d]/40",
    });

    // Reset
    setTitle("");
    setCompany("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#070e0a]/20 hover:bg-[#070e0a]/25 backdrop-blur-xl border border-white/20 sm:border-[#c79e4d]/35 hover:border-[#c79e4d] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] hover:shadow-2xl mb-6 transition-all duration-300">
      {/* Top Gold Shimmer Highlight Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#deb86d]/40 to-transparent group-hover:via-[#deb86d] transition-all duration-500 z-20 pointer-events-none"></div>

      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] flex items-center justify-center font-bold border border-[#c79e4d]/30">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Experience & Internships
            </h2>
            <p className="text-xs text-[#a3b899]">
              Industry roles, research fellowships & campus leadership
            </p>
          </div>
        </div>

        {isSelf && (
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#08120c] rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15 hover:shadow-[0_0_15px_rgba(199,158,77,0.3)]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Experience</span>
          </button>
        )}
      </div>

      {/* Experience List */}
      <div className="p-5 sm:p-6 space-y-6">
        {experience.map((item, idx) => (
          <div key={item.id} className="relative flex items-start gap-4 p-3.5 rounded-2xl hover:bg-white/[0.03] transition-colors">
            {/* Logo Avatar */}
            <div
              className={`w-12 h-12 rounded-xl ${
                item.companyLogoBg || "bg-gradient-to-br from-emerald-950 to-[#070e0a] text-[#deb86d] border border-[#c79e4d]/40"
              } flex items-center justify-center font-serif font-bold text-base shadow-md shrink-0 select-none`}
            >
              {item.company.charAt(0)}
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-1.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h3 className="text-base font-serif font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <span className="text-[11px] px-2 py-0.5 bg-[#c79e4d]/15 text-[#deb86d] border border-[#c79e4d]/30 rounded-md font-mono self-start sm:self-auto">
                  {item.employmentType}
                </span>
              </div>

              <div className="text-xs font-medium text-[#d4e4da] flex items-center gap-1.5 flex-wrap">
                <span className="font-semibold text-[#deb86d]">{item.company}</span>
                <span className="text-white/20">•</span>
                <span className="text-[#a3b899] flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3 text-[#deb86d]" />
                  <span>
                    {item.startDate} – {item.endDate}
                  </span>
                </span>
                <span className="text-white/20">•</span>
                <span className="text-[#a3b899] flex items-center gap-1 font-mono text-[11px]">
                  <MapPin className="w-3 h-3 text-[#deb86d]" />
                  <span>
                    {item.location} ({item.locationType})
                  </span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#d4e4da] leading-relaxed pt-1 whitespace-pre-line">
                {item.description}
              </p>

              {/* Skills Tags */}
              {item.skills && item.skills.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-[11px] font-mono text-[#a3b899] mr-1">
                    Skills:
                  </span>
                  {item.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] px-2 py-0.5 bg-white/[0.04] border border-white/10 text-[#d4e4da] rounded-md font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Divider line between items */}
            {idx < experience.length - 1 && (
              <div className="absolute left-6 top-14 bottom-[-16px] w-[1px] bg-white/10 hidden sm:block"></div>
            )}
          </div>
        ))}
      </div>

      {/* Add Experience Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#070e0a]/95 backdrop-blur-2xl border border-[#c79e4d]/40 shadow-2xl rounded-2xl sm:rounded-3xl max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-white/10 bg-[#070e0a]/60 flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Add Work / Internship Experience
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Title / Role *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Intern"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Company / Org *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Google or DevCom KGEC"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Employment Type
                  </label>
                  <select
                    value={employmentType}
                    onChange={(e) =>
                      setEmploymentType(e.target.value as ExperienceItem["employmentType"])
                    }
                    className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none"
                  >
                    <option value="Internship" className="bg-[#0b1510]">Internship</option>
                    <option value="Full-time" className="bg-[#0b1510]">Full-time</option>
                    <option value="Part-time" className="bg-[#0b1510]">Part-time</option>
                    <option value="Campus Leadership" className="bg-[#0b1510]">Campus Leadership</option>
                    <option value="Freelance" className="bg-[#0b1510]">Freelance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Start Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jun 2025"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    End Date
                  </label>
                  <input
                    type="text"
                    disabled={isCurrent}
                    placeholder="e.g. Aug 2025"
                    value={isCurrent ? "Present" : endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="currentRole"
                  checked={isCurrent}
                  onChange={(e) => setIsCurrent(e.target.checked)}
                  className="rounded text-[#c79e4d] accent-[#c79e4d] focus:ring-[#c79e4d]"
                />
                <label htmlFor="currentRole" className="text-xs text-[#d4e4da] font-mono">
                  I currently work in this role
                </label>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Description of Key Deliverables
                </label>
                <textarea
                  rows={3}
                  placeholder="Architected REST APIs, tuned database queries, mentored 5 juniors..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Technologies / Skills Used (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Next.js, TypeScript, PostgreSQL, Docker"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-mono"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 border border-white/20 text-white/70 hover:text-white rounded-xl text-xs font-mono hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#c79e4d] hover:bg-[#deb86d] text-[#08120c] rounded-xl text-xs font-bold uppercase tracking-wider font-mono transition-colors shadow-md cursor-pointer"
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
