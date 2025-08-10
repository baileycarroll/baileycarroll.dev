"use client";

import { cn } from "@/lib/utils";
import { CharacterStats, SkillNode, Quest, Achievement } from "@/lib/character";
import { ProfileSection } from "./ProfileSection";
import { StatsDisplay } from "./StatsDisplay";
import { RecentAchievements } from "./RecentAchievements";
import { SkillTree } from "./SkillTree";
import { ActiveQuests } from "./ActiveQuests";
import { QuestDetails } from "./QuestDetails";

interface CharacterSheetProps {
  stats: CharacterStats;
  skills: SkillNode[];
  quests: Quest[];
  achievements: Achievement[];
  className?: string;
}

export function CharacterSheet({
  stats,
  skills,
  quests,
  achievements,
  className,
}: CharacterSheetProps) {
  return (
    <div
      className={cn("character-sheet min-h-screen bg-leather-950", className)}
    >
      {/* Main Content Grid */}
      <div className="character-content container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
          {/* Left Column - Profile & Stats */}
          <div className="lg:col-span-4 space-y-4 md:space-y-6">
            <ProfileSection />
            <StatsDisplay stats={stats} />
            <RecentAchievements achievements={achievements} />
          </div>

          {/* Center Column - Skill Tree */}
          <div className="lg:col-span-5">
            <SkillTree skills={skills} />
          </div>

          {/* Right Column - Quests & Details */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6">
            <ActiveQuests quests={quests} />
            <QuestDetails quests={quests} />
          </div>
        </div>
      </div>
    </div>
  );
}
