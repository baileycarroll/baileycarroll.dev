"use client";

import { cn } from "@/lib/utils";
import { CharacterStats } from "@/lib/character";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface StatsDisplayProps {
  stats: CharacterStats;
  className?: string;
}

export function StatsDisplay({ stats, className }: StatsDisplayProps) {
  return (
    <div
      className={cn(
        "stats-display bg-leather-800 rounded-xl p-6 border border-leather-600",
        className
      )}
    >
      <h3 className="stats-title text-xl font-bold text-septim-400 mb-6">
        Character Stats
      </h3>

      <div className="stats-grid space-y-4">
        <StatBar
          label="Years Experience"
          value={stats.yearsExperience}
          maxValue={20}
          icon="experience-icon"
          color="septim"
        />
        <StatBar
          label="Projects Completed"
          value={stats.projectsCompleted}
          maxValue={50}
          icon="projects-icon"
          color="nature"
        />
        <StatBar
          label="Technologies Mastered"
          value={stats.technologiesMastered}
          maxValue={25}
          icon="tech-icon"
          color="frost"
        />
        <StatBar
          label="Lines of Code"
          value={stats.linesOfCode}
          maxValue={1000000}
          icon="code-icon"
          color="dragon"
          format="number"
        />
        <StatBar
          label="Bugs Fixed"
          value={stats.bugsFixed}
          maxValue={2000}
          icon="bug-icon"
          color="soul-gem"
        />
        <StatBar
          label="Deployments"
          value={stats.deployments}
          maxValue={300}
          icon="deploy-icon"
          color="nature"
        />
      </div>
    </div>
  );
}

interface StatBarProps {
  label: string;
  value: number;
  maxValue: number;
  icon: string;
  color: "septim" | "nature" | "frost" | "dragon" | "soul-gem";
  format?: "number" | "percentage";
}

function StatBar({
  label,
  value,
  maxValue,
  icon,
  color,
  format = "percentage",
}: StatBarProps) {
  const percentage = (value / maxValue) * 100;
  const colorClasses = {
    septim: "from-septim-400 to-septim-500",
    nature: "from-nature-400 to-nature-500",
    frost: "from-frost-400 to-frost-500",
    dragon: "from-dragon-400 to-dragon-500",
    "soul-gem": "from-soul-gem-400 to-soul-gem-500",
  };

  const formatValue = (val: number) => {
    if (format === "number") {
      return val.toLocaleString();
    }
    return `${val}`;
  };

  return (
    <div className="stat-bar">
      <div className="stat-header flex items-center justify-between mb-2">
        <div className="stat-label flex items-center gap-2">
          <ElderScrollsIcon name={icon} className="w-4 h-4 text-leather-300" />
          <span className="text-sm font-medium text-leather-200">{label}</span>
        </div>
        <span className="stat-value text-sm font-bold text-septim-400">
          {formatValue(value)}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="stat-progress bg-leather-900/50 rounded-full h-3 border border-leather-600 overflow-hidden relative">
        <div
          className={cn(
            "stat-progress-fill h-full rounded-full transition-all duration-700 ease-out",
            "bg-gradient-to-r",
            colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />

        {/* Shimmer Effect */}
        <div
          className="stat-shimmer absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(255,255,255,0.3) ${percentage}%, 
              transparent ${percentage + 10}%
            )`,
            filter: "blur(1px)",
          }}
        />
      </div>
    </div>
  );
}
