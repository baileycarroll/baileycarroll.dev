"use client";

import { cn } from "@/lib/utils";
import { Quest } from "@/lib/character";
import { QuestCard } from "./QuestCard";

interface ActiveQuestsProps {
  quests: Quest[];
  className?: string;
}

export function ActiveQuests({ quests, className }: ActiveQuestsProps) {
  const mainQuests = quests.filter((q) => q.type === "main");
  const sideQuests = quests.filter((q) => q.type === "side");

  return (
    <div
      className={cn(
        "active-quests bg-leather-800 rounded-xl p-6 border border-leather-600",
        className
      )}
    >
      <h3 className="quests-title text-xl font-bold text-septim-400 mb-6">
        Active Quests
      </h3>

      {/* Main Quests */}
      <div className="main-quests mb-6">
        <h4 className="quest-category text-sm font-semibold text-nature-400 mb-3">
          Main Quests ({mainQuests.length})
        </h4>
        <div className="quest-list space-y-3">
          {mainQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} />
          ))}
        </div>
      </div>

      {/* Side Quests */}
      <div className="side-quests">
        <h4 className="quest-category text-sm font-semibold text-frost-400 mb-3">
          Side Quests ({sideQuests.length})
        </h4>
        <div className="quest-list space-y-3">
          {sideQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
