"use client";

import React, { useState } from "react";
import { SkillItem } from "@/data/profileData";
import {
  Code2,
  Plus,
  ThumbsUp,
  Check,
  X,
  Award,
  Sparkles,
} from "lucide-react";

interface SkillsSectionProps {
  skills: SkillItem[];
  isSelf: boolean;
  onEndorseSkill: (skillId: string) => void;
  onAddSkill: (skill: SkillItem) => void;
}

export default function SkillsSection({
  skills,
  isSelf,
  onEndorseSkill,
  onAddSkill,
}: SkillsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState<SkillItem["category"]>("Web & Cloud");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillName.trim()) return;

    onAddSkill({
      id: `skill-${Date.now()}`,
      name: skillName.trim(),
      category,
      endorsements: 1,
      hasEndorsed: false,
    });

    setSkillName("");
    setModalOpen(false);
  };

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden mb-6">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-slate-900">
              Skills & Peer Endorsements
            </h2>
            <p className="text-xs text-slate-500">
              Verified technical abilities endorsed by campus peers & mentors
            </p>
          </div>
        </div>

        {isSelf && (
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 text-slate-700" />
            <span className="hidden sm:inline">Add Skill</span>
          </button>
        )}
      </div>

      {/* Skills Grid */}
      <div className="p-5 sm:p-6 space-y-5">
        {categories.map((cat) => (
          <div key={cat} className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
              <span>{cat}</span>
              <div className="flex-1 h-[1px] bg-slate-100"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 bg-slate-50/70 border border-slate-200/80 rounded-xl flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {skill.name}
                      </h4>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <Award className="w-3 h-3 text-red-600" />
                        <span>
                          {skill.endorsements}{" "}
                          {skill.endorsements === 1 ? "endorsement" : "endorsements"}
                        </span>
                      </div>
                    </div>

                    {!isSelf && (
                      <button
                        onClick={() => onEndorseSkill(skill.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          skill.hasEndorsed
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-2xs"
                        }`}
                      >
                        {skill.hasEndorsed ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Endorsed</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5 text-slate-500" />
                            <span>+ Endorse</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Skill Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border border-slate-200 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
                Add Technical Skill
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
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Kubernetes, Verilog, FPGA"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as SkillItem["category"])
                  }
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-red-500"
                >
                  <option value="Web & Cloud">Web & Cloud</option>
                  <option value="Core Engineering">Core Engineering</option>
                  <option value="Languages & Tools">Languages & Tools</option>
                  <option value="AI & Systems">AI & Systems</option>
                  <option value="Hardware & Embedded">Hardware & Embedded</option>
                </select>
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
                  Add Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
