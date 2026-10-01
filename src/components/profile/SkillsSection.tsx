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
    <div className="bg-[#070e0a]/50 backdrop-blur-xl border border-white/15 sm:border-[#c79e4d]/30 rounded-2xl shadow-xl overflow-hidden mb-6">
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#c79e4d]/20 text-[#deb86d] flex items-center justify-center font-bold border border-[#c79e4d]/30">
            <Code2 className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">
              Skills & Peer Endorsements
            </h2>
            <p className="text-xs text-[#a3b899]">
              Verified technical abilities endorsed by campus peers & mentors
            </p>
          </div>
        </div>

        {isSelf && (
          <button
            onClick={() => setModalOpen(true)}
            className="p-1.5 sm:px-3 sm:py-1.5 bg-white/10 hover:bg-[#c79e4d] text-white hover:text-[#08120c] rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer border border-white/15"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Skill</span>
          </button>
        )}
      </div>

      {/* Skills Grid */}
      <div className="p-5 sm:p-6 space-y-5">
        {categories.map((cat) => (
          <div key={cat} className="space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-[#deb86d] font-mono flex items-center gap-2">
              <span>{cat}</span>
              <div className="flex-1 h-[1px] bg-white/10"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {skills
                .filter((s) => s.category === cat)
                .map((skill) => (
                  <div
                    key={skill.id}
                    className="p-3 bg-white/[0.03] border border-white/10 rounded-xl flex items-center justify-between gap-3 hover:bg-white/[0.06] transition-colors"
                  >
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-white font-mono">
                        {skill.name}
                      </h4>
                      <div className="text-[11px] text-[#a3b899] flex items-center gap-1.5 mt-0.5 font-mono">
                        <Award className="w-3 h-3 text-[#deb86d]" />
                        <span>
                          {skill.endorsements}{" "}
                          {skill.endorsements === 1 ? "endorsement" : "endorsements"}
                        </span>
                      </div>
                    </div>

                    {!isSelf && (
                      <button
                        onClick={() => onEndorseSkill(skill.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          skill.hasEndorsed
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-500/40"
                            : "bg-white/10 hover:bg-white/20 text-[#d4e4da] hover:text-white border border-white/15 shadow-sm"
                        }`}
                      >
                        {skill.hasEndorsed ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Endorsed</span>
                          </>
                        ) : (
                          <>
                            <ThumbsUp className="w-3.5 h-3.5 text-[#deb86d]" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#070e0a] border border-[#c79e4d]/40 shadow-2xl rounded-2xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 bg-[#0b1510] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Add Technical Skill
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
                  Skill Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js, Kubernetes, Verilog, FPGA"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white placeholder-white/40 rounded-xl focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#deb86d] mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(e.target.value as SkillItem["category"])
                  }
                  className="w-full px-3 py-2 text-xs bg-[#0b1510] border border-white/15 focus:border-[#c79e4d] text-white rounded-xl focus:outline-none"
                >
                  <option value="Web & Cloud" className="bg-[#0b1510]">Web & Cloud</option>
                  <option value="Core Engineering" className="bg-[#0b1510]">Core Engineering</option>
                  <option value="Languages & Tools" className="bg-[#0b1510]">Languages & Tools</option>
                  <option value="AI & Systems" className="bg-[#0b1510]">AI & Systems</option>
                  <option value="Hardware & Embedded" className="bg-[#0b1510]">Hardware & Embedded</option>
                </select>
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
