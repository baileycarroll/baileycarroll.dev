"use client";

import { cn } from "@/lib/utils";
import { JournalTab as JournalTabType } from "@/lib/navigation";
import { JournalTab } from "./JournalTab";
import { NavigationProgress } from "./NavigationProgress";

interface JournalTabsProps {
  tabs: JournalTabType[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
  showProgress?: boolean;
}

export function JournalTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  showProgress = true,
}: JournalTabsProps) {
  return (
    <nav
      className={cn(
        "journal-tabs relative bg-leather-800 rounded-xl p-4 shadow-2xl",
        "border-2 border-leather-600",
        "bg-gradient-to-br from-leather-800 via-leather-700 to-leather-800",
        className
      )}
    >
      {/* Leather texture background */}
      <div
        className="absolute inset-0 rounded-xl opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 50%)
          `,
        }}
      />

      <div className="journal-tabs-container relative z-10">
        {/* Progress indicator */}
        {showProgress && (
          <div className="journal-progress mb-4">
            <NavigationProgress tabs={tabs} />
          </div>
        )}

        {/* Tabs grid */}
        <div className="journal-tabs-grid grid gap-3">
          {tabs.map((tab) => (
            <JournalTab
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => onTabChange(tab.id)}
            />
          ))}
        </div>

        {/* Journal footer */}
        <div className="journal-footer mt-4 pt-3 border-t border-leather-600/50">
          <div className="flex items-center justify-between text-xs text-leather-400">
            <span>Your Adventure Awaits</span>
            <span>{tabs.length} Sections</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
