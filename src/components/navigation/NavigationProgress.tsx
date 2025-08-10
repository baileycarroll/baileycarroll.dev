"use client";

import { cn } from "@/lib/utils";
import { JournalTab, getTotalCompletion } from "@/lib/navigation";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface NavigationProgressProps {
  tabs: JournalTab[];
  className?: string;
  showDetails?: boolean;
}

export function NavigationProgress({
  tabs,
  className,
  showDetails = false,
}: NavigationProgressProps) {
  const totalCompletion = getTotalCompletion();
  const completedTabs = tabs.filter(
    (tab) => tab.completionPercent === 100
  ).length;
  const totalTabs = tabs.length;

  return (
    <div className={cn("navigation-progress", className)}>
      <div className="progress-header flex items-center justify-between mb-2">
        <div className="progress-info flex items-center gap-2">
          <ElderScrollsIcon
            name="progress"
            className="w-4 h-4 text-nature-400"
            size={16}
          />
          <span className="progress-label text-sm font-medium text-leather-100">
            Journal Completion
          </span>
        </div>
        <span className="progress-percentage text-sm font-bold text-septim-400">
          {totalCompletion}%
        </span>
      </div>

      {/* Main progress bar */}
      <div className="progress-bar relative h-3 bg-leather-900/50 rounded-lg overflow-hidden border border-leather-700">
        <div
          className={cn(
            "progress-fill h-full transition-all duration-700 ease-out",
            "bg-gradient-to-r from-nature-400 via-nature-500 to-septim-400",
            "shadow-inner"
          )}
          style={{ width: `${totalCompletion}%` }}
          aria-label={`${totalCompletion}% of journal completed`}
        />

        {/* Progress glow effect */}
        <div
          className="progress-glow absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(90deg, 
              transparent 0%, 
              rgba(34, 197, 94, 0.3) ${totalCompletion}%, 
              transparent ${totalCompletion + 10}%
            )`,
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Detailed progress info */}
      {showDetails && (
        <div className="progress-details mt-3 text-xs text-leather-300">
          <div className="progress-stats flex justify-between">
            <span>
              Completed: {completedTabs}/{totalTabs} sections
            </span>
            <span>Remaining: {totalTabs - completedTabs} sections</span>
          </div>

          {/* Individual tab progress */}
          <div className="progress-tabs mt-2 space-y-1">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="progress-tab flex items-center justify-between"
              >
                <span className="progress-tab-name text-leather-200">
                  {tab.label}
                </span>
                <span
                  className={cn(
                    "progress-tab-percent",
                    tab.completionPercent === 100
                      ? "text-nature-400"
                      : "text-leather-400"
                  )}
                >
                  {tab.completionPercent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
