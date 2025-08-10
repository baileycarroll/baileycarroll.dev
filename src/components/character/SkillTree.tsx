"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SkillNode, groupSkillsByCategory } from "@/lib/character";
import { SkillCategory } from "./SkillCategory";
import { SkillDetailsPanel } from "./SkillDetailsPanel";

interface SkillTreeProps {
  skills: SkillNode[];
  className?: string;
}

export function SkillTree({ skills, className }: SkillTreeProps) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <div
      className={cn(
        "skill-tree bg-leather-800 rounded-xl p-6 border border-leather-600",
        className
      )}
    >
      <h3 className="skill-tree-title text-xl font-bold text-septim-400 mb-6">
        Skill Tree
      </h3>

      {/* Skill Categories */}
      <div className="skill-categories space-y-8">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <SkillCategory
            key={category}
            category={category as keyof typeof groupedSkills}
            skills={categorySkills}
            selectedSkill={selectedSkill}
            onSkillSelect={setSelectedSkill}
            onSkillHover={() => {}}
          />
        ))}
      </div>

      {/* Skill Details Panel */}
      {selectedSkill && (
        <SkillDetailsPanel
          skill={skills.find((s) => s.id === selectedSkill)!}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
}
