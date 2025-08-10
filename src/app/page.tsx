import { CharacterSheet } from "@/components/character/CharacterSheet";
import {
  characterStats,
  skillTree,
  activeQuests,
  achievements,
} from "@/data/characterData";

export default function Home() {
  return (
    <div className="character-homepage min-h-screen bg-leather-950">
      {/* Character Sheet */}
      <CharacterSheet
        stats={characterStats}
        skills={skillTree}
        quests={activeQuests}
        achievements={achievements}
      />
    </div>
  );
}
