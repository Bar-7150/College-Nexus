"use client";

import React, { useState } from "react";
import { EducationItem } from "@/data/profileData";
import {
  GraduationCap,
  Plus,
  Calendar,
  Award,
  BookOpen,
  X,
  Building,
} from "lucide-react";

interface EducationSectionProps {
  education: EducationItem[];
  isSelf: boolean;
  onAddEducation: (item: EducationItem) => void;
}

export default function EducationSection({
  education,
  isSelf,
  onAddEducation,
}: EducationSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [institution, setInstitution] = useState("Kalyani Government Engineering College (MAKAUT)");
  const [degree, setDegree] = useState("Bachelor of Technology - B.Tech");
  const [fieldOfStudy, setFieldOfStudy] = useState("Computer Science & Engineering");
  const [startDate, setStartDate] = useState("2022");
  const [endDate, setEndDate] = useState("2026");
  const [grade, setGrade] = useState("8.85 / 10.0 CGPA");
  const [activities, setActivities] = useState("Developers Community KGEC, CodeChef Campus Chapter");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!institution || !degree) return;

    onAddEducation({
      id: `edu-${Date.now()}`,
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      grade,
      activities,
      description,
      logoColor: "bg-emerald-950 text-[#deb86d] border border-[#c79e4d]/40",
    });

    setModalOpen(false);
  };

  return (
    <div className="bg-[#070e0a]/50 backdrop-blur-xl border border-white/15 sm:border-[#c79e4d]/30 rounded-2xl shadow-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] flex items-center justify-center font-bold border border-[#c79e4d]/30">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Education & Academic Credentials
            </h2>
            <p className="text-xs text-[#a3b899]">
              Institutional degrees, MAKAUT syllabus & collegiate societies
            </p>
          </div>
        </div>

        {isSelf && (
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#08120c] rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Education</span>
          </button>
        )}
      </div>

      {/* Education List */}
      <div className="p-5 sm:p-6 space-y-6">
        {education.map((item, idx) => (
          <div key={item.id} className="relative flex items-start gap-4">
            {/* Institution Badge Logo */}
            <div
              className={`w-12 h-12 rounded-xl ${
                item.logoColor || "bg-gradient-to-br from-emerald-950 to-[#070e0a] text-[#deb86d] border border-[#c79e4d]/40"
              } flex items-center justify-center font-serif font-bold text-base shadow-md shrink-0 select-none`}
            >
              結
            </div>

            {/* Content Details */}
            <div className="flex-1 space-y-1.5">
              <h3 className="text-base font-serif font-bold text-white leading-snug">
                {item.institution}
              </h3>

              <div className="text-xs font-semibold text-[#d4e4da]">
                {item.degree} — <span className="text-[#deb86d]">{item.fieldOfStudy}</span>
              </div>

              <div className="text-xs text-[#a3b899] flex items-center gap-1.5 flex-wrap">
                <span className="flex items-center gap-1 font-mono text-[11px]">
                  <Calendar className="w-3 h-3 text-[#deb86d]" />
                  <span>
                    {item.startDate} – {item.endDate}
                  </span>
                </span>
                {item.grade && (
                  <>
                    <span className="text-white/20">•</span>
                    <span className="font-semibold text-[#deb86d] bg-[#c79e4d]/15 px-2 py-0.5 rounded border border-[#c79e4d]/30 font-mono text-[11px]">
                      Grade: {item.grade}
                    </span>
                  </>
                )}
              </div>

              {item.activities && (
                <p className="text-xs text-[#d4e4da] pt-1">
                  <strong className="text-white font-semibold">Societies & Activities: </strong>
                  {item.activities}
                </p>
              )}

              {item.description && (
                <p className="text-xs text-[#a3b899] leading-relaxed pt-0.5">
                  {item.description}
                </p>
              )}
            </div>

            {/* Divider */}
            {idx < education.length - 1 && (
              <div className="absolute left-6 top-14 bottom-[-16px] w-[1px] bg-white/10 hidden sm:block"></div>
            )}
          </div>
        ))}
      </div>

      {/* Add Education Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Add Academic Degree / Education
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
                  School / College / University *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kalyani Government Engineering College"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bachelor of Technology - B.Tech"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Field of Study *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Computer Science and Engineering"
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    placeholder="2022"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    End Year
                  </label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                    Grade / CGPA
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 8.94 / 10.0"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Societies & Student Activities
                </label>
                <input
                  type="text"
                  placeholder="e.g. DevCom KGEC, CodeChef Chapter, Robotics Society"
                  value={activities}
                  onChange={(e) => setActivities(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Academic Focus & Coursework
                </label>
                <textarea
                  rows={2}
                  placeholder="Key subjects: OS, DBMS, Computer Networks, System Architecture..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none leading-relaxed resize-none"
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
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
