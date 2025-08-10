"use client";

import { cn } from "@/lib/utils";
import { Quest } from "@/lib/character";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface QuestCardProps {
  quest: Quest;
  compact?: boolean;
  className?: string;
}

export function QuestCard({
  quest,
  compact = false,
  className,
}: QuestCardProps) {
  const difficultyColors = {
    Novice: "text-nature-400",
    Apprentice: "text-frost-400",
    Expert: "text-septim-400",
    Master: "text-dragon-400",
  };

  const statusColors = {
    active: "text-nature-400",
    completed: "text-septim-400",
    legendary: "text-dragon-400",
  };

  return (
    <div
      className={cn(
        "quest-card bg-leather-700 rounded-lg p-4 border border-leather-500",
        "hover:bg-leather-600 transition-colors cursor-pointer",
        className
      )}
    >
      {/* Quest Header */}
      <div className="quest-header flex items-start justify-between mb-3">
        <div className="quest-title">
          <h5 className="text-sm font-bold text-leather-100 mb-1">
            {quest.title}
          </h5>
          <div className="quest-meta flex items-center gap-3 text-xs">
            <span
              className={cn("difficulty", difficultyColors[quest.difficulty])}
            >
              {quest.difficulty}
            </span>
            <span className={cn("status", statusColors[quest.status])}>
              {quest.status}
            </span>
          </div>
        </div>

        {/* Quest Icon */}
        <div className="quest-icon">
          <ElderScrollsIcon
            name={quest.type === "main" ? "main-quest" : "side-quest"}
            className="w-6 h-6 text-septim-400"
          />
        </div>
      </div>

      {/* Quest Description */}
      {!compact && (
        <p className="quest-description text-xs text-leather-300 mb-3">
          {quest.description}
        </p>
      )}

      {/* Quest Progress */}
      <div className="quest-progress">
        <div className="progress-header flex items-center justify-between mb-2">
          <span className="progress-label text-xs text-leather-300">
            Progress
          </span>
          <span className="progress-value text-xs font-bold text-septim-400">
            {quest.progress}%
          </span>
        </div>

        <div className="progress-bar bg-leather-900/50 rounded-full h-2">
          <div
            className="progress-fill h-full rounded-full transition-all duration-500"
            style={{
              width: `${quest.progress}%`,
              background: `linear-gradient(90deg, var(--color-nature-400), var(--color-septim-400))`,
            }}
          />
        </div>
      </div>

      {/* Quest Rewards */}
      {!compact && quest.rewards.length > 0 && (
        <div className="quest-rewards mt-3">
          <span className="rewards-label text-xs text-leather-300 mb-1 block">
            Rewards:
          </span>
          <div className="rewards-list flex flex-wrap gap-1">
            {quest.rewards.map((reward) => (
              <span
                key={reward.id}
                className="reward-badge bg-septim-800 text-septim-200 px-2 py-1 rounded text-xs"
              >
                {reward.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tech Stack */}
      {!compact && quest.techStack.length > 0 && (
        <div className="quest-tech-stack mt-3">
          <span className="tech-stack-label text-xs text-leather-300 mb-1 block">
            Tech Stack:
          </span>
          <div className="tech-stack-list flex flex-wrap gap-1">
            {quest.techStack.map((tech) => (
              <span
                key={tech}
                className="tech-badge bg-leather-600 text-leather-200 px-2 py-1 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
