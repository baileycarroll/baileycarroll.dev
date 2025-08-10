"use client";

import { cn } from "@/lib/utils";
import { SkillNode } from "@/lib/character";
import { SkillNode as SkillNodeComponent } from "./SkillNode";

interface SkillCategoryProps {
  category: string;
  skills: SkillNode[];
  selectedSkill: string | null;
  onSkillSelect: (skillId: string) => void;
  onSkillHover: (skillId: string | null) => void;
}

export function SkillCategory({
  category,
  skills,
  selectedSkill,
  onSkillSelect,
  onSkillHover,
}: SkillCategoryProps) {
  if (skills.length === 0) return null;

  const categoryColors = {
    frontend: "text-nature-400",
    backend: "text-frost-400",
    devops: "text-dragon-400",
    mobile: "text-septim-400",
    database: "text-soul-gem-400",
    design: "text-amber-400",
    "soft-skills": "text-purple-400",
  };

  const categoryIcons = {
    frontend: "🎨",
    backend: "⚙️",
    devops: "🐳",
    mobile: "📱",
    database: "🗄️",
    design: "🎯",
    "soft-skills": "🤝",
  };

  return (
    <div className="skill-category">
      <div className="category-header flex items-center gap-2 mb-4">
        <span className="category-icon text-lg">
          {categoryIcons[category as keyof typeof categoryIcons] || "📚"}
        </span>
        <h4
          className={cn(
            "category-title text-lg font-semibold capitalize",
            categoryColors[category as keyof typeof categoryColors] ||
              "text-leather-200"
          )}
        >
          {category.replace("-", " ")}
        </h4>
        <span className="category-count text-sm text-leather-400">
          ({skills.length})
        </span>
      </div>

      <div className="skills-grid grid grid-cols-1 md:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <SkillNodeComponent
            key={skill.id}
            skill={skill}
            isSelected={selectedSkill === skill.id}
            isHovered={false}
            onSelect={onSkillSelect}
            onHover={onSkillHover}
          />
        ))}
      </div>
    </div>
  );
}
