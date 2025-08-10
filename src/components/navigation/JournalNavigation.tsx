"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { journalTabs } from "@/lib/navigation";
import { JournalTabs } from "./JournalTabs";
import { soundManager } from "@/lib/soundEffects";
import { JournalTabAnimations } from "./JournalTabAnimations";

interface JournalNavigationProps {
  className?: string;
}

export function JournalNavigation({ className }: JournalNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isVisible, setIsVisible] = useState(false);

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

  // Show navigation after initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        "journal-navigation",
        theme === "dark"
          ? "journal-navigation-dark"
          : "journal-navigation-light",
        className
      )}
    >
      <JournalTabAnimations isVisible={isVisible}>
        <JournalTabs
          tabs={journalTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          className="w-full max-w-md"
        />
      </JournalTabAnimations>
    </div>
  );
}

// Mobile version with full-screen overlay
export function MobileJournalNavigation({ className }: JournalNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isOpen, setIsOpen] = useState(false);

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

      // Close mobile menu
      setIsOpen(false);

      // Navigate to the route
      router.push(tab.route);
    }
  };

  return (
    <div className={cn("mobile-journal-navigation", className)}>
      {/* Mobile trigger button */}
      <button
        onClick={() => {
          setIsOpen(true);
          soundManager.playSound("journal-open");
        }}
        className="mobile-journal-trigger flex items-center gap-2 px-4 py-2 rounded-full bg-leather-800/80 backdrop-blur border border-leather-600 text-leather-100 hover:bg-leather-700/80 transition-colors"
      >
        <span className="journal-icon text-lg">📖</span>
        <span className="journal-label text-sm font-medium">Journal</span>
      </button>

      {/* Full-screen overlay */}
      {isOpen && (
        <div className="mobile-journal-overlay fixed inset-0 z-[9999] bg-leather-950/95 backdrop-blur-sm">
          <div className="mobile-journal-content h-full flex flex-col p-6">
            {/* Header */}
            <div className="mobile-journal-header flex items-center justify-between mb-6">
              <h2 className="mobile-journal-title text-2xl font-bold text-leather-100">
                Your Journal
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="mobile-journal-close p-2 rounded-lg bg-leather-700 hover:bg-leather-600 transition-colors"
                aria-label="Close journal"
              >
                <span className="text-leather-100 text-lg">✕</span>
              </button>
            </div>

            {/* Progress */}
            <div className="mobile-journal-progress mb-6">
              <JournalTabs
                tabs={journalTabs}
                activeTab={activeTab}
                onTabChange={handleTabChange}
                showProgress={true}
              />
            </div>

            {/* Footer */}
            <div className="mobile-journal-footer mt-auto pt-6 border-t border-leather-600/50">
              <div className="flex items-center justify-between text-sm text-leather-400">
                <span>Your Adventure Awaits</span>
                <span>{journalTabs.length} Sections</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
