"use client";

import { cn } from "@/lib/utils";
import { Quest } from "@/lib/character";

interface QuestDetailsProps {
  quests: Quest[];
  className?: string;
}

export function QuestDetails({ quests, className }: QuestDetailsProps) {
  const activeQuests = quests.filter((q) => q.status === "active");
  const completedQuests = quests.filter((q) => q.status === "completed");

  return (
    <div
      className={cn(
        "quest-details bg-leather-800 rounded-xl p-6 border border-leather-600",
        className
      )}
    >
      <h3 className="quest-details-title text-xl font-bold text-septim-400 mb-6">
        Quest Summary
      </h3>

      {/* Quest Statistics */}
      <div className="quest-stats grid grid-cols-2 gap-4 mb-6">
        <div className="stat-item text-center">
          <div className="stat-value text-2xl font-bold text-nature-400">
            {activeQuests.length}
          </div>
          <div className="stat-label text-xs text-leather-400">Active</div>
        </div>
        <div className="stat-item text-center">
          <div className="stat-value text-2xl font-bold text-septim-400">
            {completedQuests.length}
          </div>
          <div className="stat-label text-xs text-leather-400">Completed</div>
        </div>
      </div>

      {/* Quest Progress Overview */}
      <div className="quest-progress-overview">
        <h4 className="text-sm font-semibold text-leather-200 mb-3">
          Progress Overview
        </h4>
        <div className="progress-bars space-y-3">
          {activeQuests.slice(0, 3).map((quest) => (
            <div key={quest.id} className="quest-progress-item">
              <div className="quest-progress-header flex items-center justify-between mb-1">
                <span className="quest-name text-xs text-leather-300 truncate">
                  {quest.title}
                </span>
                <span className="quest-percentage text-xs font-bold text-septim-400">
                  {quest.progress}%
                </span>
              </div>
              <div className="quest-progress-bar bg-leather-900/50 rounded-full h-1.5">
                <div
                  className="quest-progress-fill h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${quest.progress}%`,
                    background: `linear-gradient(90deg, var(--color-nature-400), var(--color-septim-400))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Completions */}
      {completedQuests.length > 0 && (
        <div className="recent-completions mt-6 pt-4 border-t border-leather-600/50">
          <h4 className="text-sm font-semibold text-leather-200 mb-3">
            Recent Completions
          </h4>
          <div className="completions-list space-y-2">
            {completedQuests.slice(0, 3).map((quest) => (
              <div
                key={quest.id}
                className="completion-item flex items-center gap-2 text-xs text-leather-300"
              >
                <span className="completion-icon">✅</span>
                <span className="completion-title truncate">{quest.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
