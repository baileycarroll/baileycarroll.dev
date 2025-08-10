"use client";

import { cn } from "@/lib/utils";
import { SkillNode as SkillNodeType } from "@/lib/character";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface SkillNodeProps {
  skill: SkillNodeType;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (skillId: string) => void;
  onHover: (skillId: string | null) => void;
}

export function SkillNode({
  skill,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: SkillNodeProps) {
  const progressPercentage = (skill.level / skill.maxLevel) * 100;

  return (
    <div
      className={cn(
        "skill-node relative p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer",
        "bg-gradient-to-br from-leather-700 to-leather-600",
        "hover:scale-105 hover:shadow-lg",
        isSelected && [
          "border-septim-400 bg-gradient-to-br from-septim-700 to-septim-600",
          "shadow-lg shadow-septim-500/30",
        ],
        isHovered && "border-nature-400"
      )}
      onClick={() => onSelect(skill.id)}
      onMouseEnter={() => onHover(skill.id)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Skill Icon */}
      <div className="skill-icon mb-3">
        <ElderScrollsIcon
          name={skill.icon}
          className="w-8 h-8 text-septim-400"
        />
      </div>

      {/* Skill Info */}
      <div className="skill-info">
        <h4 className="skill-name text-sm font-bold text-leather-100 mb-1">
          {skill.name}
        </h4>
        <p className="skill-level text-xs text-leather-300 mb-2">
          Level {skill.level}/{skill.maxLevel}
        </p>

        {/* Progress Bar */}
        <div className="skill-progress bg-leather-900/50 rounded-full h-2 mb-2">
          <div
            className="skill-progress-fill h-full rounded-full transition-all duration-500"
            style={{
              width: `${progressPercentage}%`,
              background: `linear-gradient(90deg, var(--color-nature-400), var(--color-septim-400))`,
            }}
          />
        </div>
      </div>

      {/* Level Badge */}
      <div className="skill-level-badge absolute -top-2 -right-2 bg-septim-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
        {skill.level}
      </div>

      {/* Dependencies Indicator */}
      {skill.dependencies.length > 0 && (
        <div className="dependencies-indicator absolute -top-1 -left-1 w-4 h-4 bg-leather-600 rounded-full flex items-center justify-center">
          <span className="text-xs text-leather-300">🔗</span>
        </div>
      )}
    </div>
  );
}
