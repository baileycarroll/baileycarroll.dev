"use client";

import { GuildCard, SkillButton, ProgressBar } from "./index";

export function GamingShowcase() {
  return (
    <div className="p-8 space-y-8">
      {/* Typography Test */}
      <section className="space-y-4">
        <h1 className="text-legendary font-cinzel text-septim-400">
          Legendary Title
        </h1>
        <h2 className="text-epic font-cinzel text-soul-gem-400">
          Epic Subtitle
        </h2>
        <h3 className="text-rare font-inter text-frost-300">Rare Section</h3>
        <p className="text-basic font-inter text-soul-gem-200">
          This is body text using Inter font family with gaming colors.
        </p>
        <code className="text-small font-jetbrains text-nature-400">
          console.log(&quot;Gaming code style&quot;)
        </code>
      </section>

      {/* GuildCard Variants */}
      <section className="space-y-4">
        <h3 className="text-rare font-cinzel text-soul-gem-300">Guild Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <GuildCard variant="legendary" glow interactive>
            <h4 className="text-common font-cinzel text-septim-300 mb-2">
              Legendary Quest
            </h4>
            <p className="text-basic text-septim-100">
              The most prestigious contracts
            </p>
          </GuildCard>

          <GuildCard variant="epic" interactive>
            <h4 className="text-common font-cinzel text-dragon-300 mb-2">
              Epic Challenge
            </h4>
            <p className="text-basic text-dragon-100">
              Dangerous but rewarding
            </p>
          </GuildCard>

          <GuildCard variant="rare">
            <h4 className="text-common font-cinzel text-frost-300 mb-2">
              Rare Opportunity
            </h4>
            <p className="text-basic text-frost-100">Uncommon but valuable</p>
          </GuildCard>
        </div>
      </section>

      {/* SkillButton Variants */}
      <section className="space-y-4">
        <h3 className="text-rare font-cinzel text-soul-gem-300">
          Skill Buttons
        </h3>
        <div className="flex flex-wrap gap-4">
          <SkillButton variant="primary">Soul Magic</SkillButton>
          <SkillButton variant="gold">Septim Trade</SkillButton>
          <SkillButton variant="danger">Dragon Fire</SkillButton>
          <SkillButton variant="success">Nature Healing</SkillButton>
          <SkillButton variant="frost">Ice Spell</SkillButton>
          <SkillButton variant="ghost">Stealth</SkillButton>
        </div>
      </section>

      {/* Progress Bars */}
      <section className="space-y-4">
        <h3 className="text-rare font-cinzel text-soul-gem-300">
          Character Stats
        </h3>
        <div className="space-y-4 max-w-md">
          <ProgressBar value={85} variant="health" label="Health" animated />
          <ProgressBar value={60} variant="mana" label="Magicka" animated />
          <ProgressBar
            value={75}
            variant="experience"
            label="Experience"
            animated
          />
          <ProgressBar
            value={40}
            variant="skill"
            label="One-Handed"
            size="lg"
          />
        </div>
      </section>
    </div>
  );
}
