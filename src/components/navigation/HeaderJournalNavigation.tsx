"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { journalTabs } from "@/lib/navigation";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";
import { soundManager } from "@/lib/soundEffects";

interface HeaderJournalNavigationProps {
  className?: string;
}

export function HeaderJournalNavigation({
  className,
}: HeaderJournalNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("home");

  // Determine active tab based on current pathname
  useEffect(() => {
    const currentTab = journalTabs.find((tab) => tab.route === pathname);
    if (currentTab) {
      setActiveTab(currentTab.id);
    }
  }, [pathname]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    const tab = journalTabs.find((t) => t.id === tabId);
    if (tab && !tab.isLocked) {
      setActiveTab(tabId);

      // Play sound effect
      soundManager.playSound("tab-click");

      // Navigate to the route
      router.push(tab.route);
    }
  };

  return (
    <nav
      className={cn("header-journal-nav flex items-center gap-1", className)}
    >
      {journalTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={cn(
            "header-tab flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
            "hover:bg-leather-800/50 hover:text-leather-100",
            activeTab === tab.id && [
              "bg-septim-600/20 text-septim-400",
              "border border-septim-400/30",
              "shadow-sm shadow-septim-500/20",
            ],
            activeTab !== tab.id && "text-leather-300"
          )}
          disabled={tab.isLocked}
          aria-label={`Navigate to ${tab.label}`}
        >
          <ElderScrollsIcon name={tab.icon} className="w-4 h-4" size={16} />
          <span className="tab-label text-sm font-medium">{tab.label}</span>

          {/* Progress indicator */}
          <div className="tab-progress w-6 h-1 bg-leather-900/50 rounded-full overflow-hidden ml-2">
            <div
              className="tab-progress-fill h-full rounded-full transition-all duration-500"
              style={{
                width: `${tab.completionPercent}%`,
                background: `linear-gradient(90deg, var(--color-nature-400), var(--color-septim-400))`,
              }}
            />
          </div>
        </button>
      ))}
    </nav>
  );
}
