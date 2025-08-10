"use client";

import { cn } from "@/lib/utils";
import { TechStack } from "@/lib/guildContracts";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface TechStackOrbsProps {
  skills: TechStack[];
  className?: string;
  maxDisplay?: number;
  showProficiency?: boolean;
}

export function TechStackOrbs({
  skills,
  className,
  maxDisplay = 5,
  showProficiency = false,
}: TechStackOrbsProps) {
  const displayedSkills = skills.slice(0, maxDisplay);
  const remainingCount = skills.length - maxDisplay;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "border-blue-400 bg-blue-400/10";
      case "backend":
        return "border-green-400 bg-green-400/10";
      case "database":
        return "border-purple-400 bg-purple-400/10";
      case "devops":
        return "border-orange-400 bg-orange-400/10";
      case "design":
        return "border-pink-400 bg-pink-400/10";
      default:
        return "border-leather-400 bg-leather-400/10";
    }
  };

  const getProficiencyColor = (proficiency: number) => {
    if (proficiency >= 90) return "text-septim-400";
    if (proficiency >= 75) return "text-green-400";
    if (proficiency >= 60) return "text-yellow-400";
    return "text-leather-400";
  };

  return (
    <div className={cn("tech-stack-orbs", className)}>
      <div className="flex flex-wrap gap-2">
        {displayedSkills.map((skill) => (
          <div
            key={skill.name}
            className={cn(
              "tech-orb flex items-center gap-2 px-3 py-1 rounded-full border",
              "hover:scale-105 transition-transform duration-200",
              "cursor-pointer group",
              getCategoryColor(skill.category)
            )}
          >
            <ElderScrollsIcon name={skill.icon} className="w-4 h-4" size={16} />
            <span className="text-sm font-medium text-leather-100">
              {skill.name}
            </span>

            {showProficiency && (
              <div className="flex items-center gap-1">
                <div className="w-8 h-1 bg-leather-700 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-300",
                      getProficiencyColor(skill.proficiency)
                    )}
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-medium",
                    getProficiencyColor(skill.proficiency)
                  )}
                >
                  {skill.proficiency}%
                </span>
              </div>
            )}

            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-leather-800 border border-leather-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-32">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <ElderScrollsIcon
                    name={skill.icon}
                    className="w-4 h-4"
                    size={16}
                  />
                  <span className="font-semibold text-septim-400">
                    {skill.name}
                  </span>
                </div>
                <p className="text-leather-300 text-xs capitalize">
                  {skill.category}
                </p>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-leather-400">Proficiency:</span>
                    <span className={getProficiencyColor(skill.proficiency)}>
                      {skill.proficiency}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-leather-700 rounded-full mt-1 overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        getProficiencyColor(skill.proficiency)
                      )}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-leather-800" />
            </div>
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="tech-orb-more flex items-center gap-2 px-3 py-1 rounded-full border border-leather-600 bg-leather-700/50">
            <span className="text-sm font-medium text-leather-300">
              +{remainingCount} more
            </span>
          </div>
        )}
      </div>

      {remainingCount > 0 && (
        <div className="mt-2">
          <details className="group">
            <summary className="cursor-pointer text-sm text-leather-400 hover:text-leather-300 transition-colors">
              Show all {skills.length} skills
            </summary>
            <div className="mt-2 flex flex-wrap gap-2">
              {skills.slice(maxDisplay).map((skill) => (
                <div
                  key={skill.name}
                  className={cn(
                    "tech-orb flex items-center gap-2 px-2 py-1 rounded-full border text-xs",
                    getCategoryColor(skill.category)
                  )}
                >
                  <ElderScrollsIcon
                    name={skill.icon}
                    className="w-3 h-3"
                    size={12}
                  />
                  <span className="text-leather-100">{skill.name}</span>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

// Compact version for smaller spaces
export function TechStackOrbsCompact({
  skills,
  className,
  maxDisplay = 3,
}: TechStackOrbsProps) {
  const displayedSkills = skills.slice(0, maxDisplay);
  const remainingCount = skills.length - maxDisplay;

  return (
    <div
      className={cn("tech-stack-orbs-compact flex flex-wrap gap-1", className)}
    >
      {displayedSkills.map((skill) => (
        <div
          key={skill.name}
          className="tech-orb-compact w-6 h-6 rounded-full border border-leather-600 bg-leather-700/50 flex items-center justify-center hover:scale-110 transition-transform duration-200 cursor-pointer group"
          title={`${skill.name} (${skill.proficiency}%)`}
        >
          <ElderScrollsIcon name={skill.icon} className="w-3 h-3" size={12} />
        </div>
      ))}

      {remainingCount > 0 && (
        <div className="tech-orb-more w-6 h-6 rounded-full border border-leather-600 bg-leather-700/50 flex items-center justify-center text-xs text-leather-400">
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
