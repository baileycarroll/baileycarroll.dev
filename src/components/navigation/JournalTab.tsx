"use client";

import { cn } from "@/lib/utils";
import { JournalTab as JournalTabType } from "@/lib/navigation";
import { getIconForTab } from "@/lib/icons";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface JournalTabProps {
  tab: JournalTabType;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export function JournalTab({
  tab,
  isActive,
  onClick,
  className,
}: JournalTabProps) {
  const iconName = getIconForTab(tab.id);

  return (
    <button
      onClick={onClick}
      className={cn(
        "journal-tab relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
        "bg-gradient-to-br from-leather-700 to-leather-600",
        "border border-leather-500 shadow-md",
        "hover:scale-105 hover:bg-gradient-to-br hover:from-leather-600 hover:to-leather-500",
        "hover:shadow-lg hover:shadow-leather-900/20",
        isActive && [
          "bg-gradient-to-br from-septim-600 to-septim-500",
          "border-septim-400 shadow-lg shadow-septim-500/30",
          "ring-2 ring-septim-400/20",
        ],
        tab.isLocked && [
          "opacity-50 cursor-not-allowed",
          "hover:scale-100 hover:shadow-md",
        ],
        className
      )}
      disabled={tab.isLocked}
      aria-label={`Navigate to ${tab.label} (${tab.completionPercent}% complete)`}
    >
      <div className="journal-tab-content flex items-center gap-3 w-full">
        <div className="journal-tab-icon flex-shrink-0">
          <ElderScrollsIcon
            name={iconName}
            className="w-6 h-6 text-leather-100"
            size={24}
          />
        </div>

        <div className="journal-tab-text flex-1 text-left">
          <span className="journal-tab-label block text-sm font-medium text-leather-100">
            {tab.label}
          </span>
          {tab.description && (
            <span className="journal-tab-description block text-xs text-leather-300 mt-1">
              {tab.description}
            </span>
          )}
        </div>

        {tab.isLocked && (
          <div className="journal-tab-lock flex-shrink-0">
            <ElderScrollsIcon
              name="lock"
              className="w-4 h-4 text-leather-400"
              size={16}
            />
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="journal-tab-progress absolute bottom-0 left-0 right-0 h-1 bg-leather-900/50 rounded-b-lg overflow-hidden">
        <div
          className={cn(
            "journal-tab-progress-bar h-full transition-all duration-500",
            "bg-gradient-to-r from-nature-400 to-nature-500",
            isActive && "from-septim-400 to-septim-500"
          )}
          style={{ width: `${tab.completionPercent}%` }}
          aria-label={`${tab.completionPercent}% complete`}
        />
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className="journal-tab-active-indicator absolute -top-1 -right-1 w-3 h-3 bg-septim-400 rounded-full shadow-lg shadow-septim-500/50" />
      )}
    </button>
  );
}
