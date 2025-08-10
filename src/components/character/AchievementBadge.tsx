"use client";

import { cn } from "@/lib/utils";
import { Achievement } from "@/lib/character";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface AchievementBadgeProps {
  achievement: Achievement;
  className?: string;
}

export function AchievementBadge({
  achievement,
  className,
}: AchievementBadgeProps) {
  const tierColors = {
    Bronze: "bg-amber-800 text-amber-200 border-amber-600",
    Silver: "bg-gray-700 text-gray-200 border-gray-500",
    Gold: "bg-septim-800 text-septim-200 border-septim-600",
    Platinum:
      "bg-gradient-to-r from-frost-400 to-soul-gem-400 text-white border-frost-500",
  };

  const rarityColors = {
    common: "opacity-100",
    rare: "opacity-90",
    epic: "opacity-80",
    legendary: "opacity-70",
  };

  return (
    <div
      className={cn(
        "achievement-badge flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-300",
        "hover:scale-105 hover:shadow-lg cursor-pointer",
        tierColors[achievement.tier],
        rarityColors[achievement.rarity],
        className
      )}
    >
      {/* Achievement Icon */}
      <div className="achievement-icon flex-shrink-0">
        <ElderScrollsIcon name={achievement.icon} className="w-6 h-6" />
      </div>

      {/* Achievement Info */}
      <div className="achievement-info flex-1 min-w-0">
        <h4 className="achievement-title text-sm font-bold truncate">
          {achievement.title}
        </h4>
        <p className="achievement-description text-xs opacity-80 truncate">
          {achievement.description}
        </p>
        {achievement.unlockedDate && (
          <p className="achievement-date text-xs opacity-60 mt-1">
            {new Date(achievement.unlockedDate).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Tier Badge */}
      <div className="tier-badge flex-shrink-0">
        <span className="tier-text text-xs font-bold px-2 py-1 rounded bg-black/20">
          {achievement.tier}
        </span>
      </div>
    </div>
  );
}
