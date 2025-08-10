"use client";

import { cn } from "@/lib/utils";
import { Achievement, getRecentAchievements } from "@/lib/character";
import { AchievementBadge } from "./AchievementBadge";

interface RecentAchievementsProps {
  achievements: Achievement[];
  className?: string;
}

export function RecentAchievements({
  achievements,
  className,
}: RecentAchievementsProps) {
  const recentAchievements = getRecentAchievements(achievements, 5);

  return (
    <div
      className={cn(
        "recent-achievements bg-leather-800 rounded-xl p-6 border border-leather-600",
        className
      )}
    >
      <h3 className="achievements-title text-xl font-bold text-septim-400 mb-6">
        Recent Achievements
      </h3>

      <div className="achievements-list space-y-3">
        {recentAchievements.map((achievement) => (
          <AchievementBadge key={achievement.id} achievement={achievement} />
        ))}
      </div>

      {/* View All Button */}
      <button className="view-all-btn w-full mt-4 py-2 bg-leather-700 hover:bg-leather-600 rounded-lg text-sm text-leather-200 transition-colors">
        View All Achievements
      </button>
    </div>
  );
}
