"use client";

import { SkillNode } from "@/lib/character";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface SkillDetailsPanelProps {
  skill: SkillNode;
  onClose: () => void;
}

export function SkillDetailsPanel({ skill, onClose }: SkillDetailsPanelProps) {
  const progressPercentage = (skill.level / skill.maxLevel) * 100;

  return (
    <div className="skill-details-panel fixed inset-0 bg-leather-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="skill-details-content bg-leather-800 rounded-xl p-6 border border-leather-600 max-w-md w-full max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="skill-details-header flex items-center justify-between mb-4">
          <div className="skill-details-title flex items-center gap-3">
            <ElderScrollsIcon
              name={skill.icon}
              className="w-8 h-8 text-septim-400"
            />
            <h3 className="text-xl font-bold text-septim-400">{skill.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="close-button p-2 rounded-lg bg-leather-700 hover:bg-leather-600 transition-colors"
            aria-label="Close skill details"
          >
            <span className="text-leather-100 text-lg">✕</span>
          </button>
        </div>

        {/* Skill Level */}
        <div className="skill-level-section mb-4">
          <div className="skill-level-header flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-leather-200">Level</span>
            <span className="text-sm font-bold text-septim-400">
              {skill.level}/{skill.maxLevel}
            </span>
          </div>
          <div className="skill-level-progress bg-leather-900/50 rounded-full h-3 border border-leather-600">
            <div
              className="skill-level-progress-fill h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercentage}%`,
                background: `linear-gradient(90deg, var(--color-nature-400), var(--color-septim-400))`,
              }}
            />
          </div>
        </div>

        {/* Skill Description */}
        <div className="skill-description mb-4">
          <h4 className="text-sm font-semibold text-leather-200 mb-2">
            Description
          </h4>
          <p className="text-sm text-leather-300 leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Dependencies */}
        {skill.dependencies.length > 0 && (
          <div className="skill-dependencies mb-4">
            <h4 className="text-sm font-semibold text-leather-200 mb-2">
              Prerequisites
            </h4>
            <div className="dependencies-list flex flex-wrap gap-2">
              {skill.dependencies.map((depId) => (
                <span
                  key={depId}
                  className="dependency-badge bg-leather-700 text-leather-200 px-2 py-1 rounded text-xs border border-leather-600"
                >
                  {depId}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Rewards */}
        {skill.rewards.length > 0 && (
          <div className="skill-rewards">
            <h4 className="text-sm font-semibold text-leather-200 mb-2">
              Rewards
            </h4>
            <div className="rewards-list space-y-1">
              {skill.rewards.map((reward, index) => (
                <div
                  key={index}
                  className="reward-item flex items-center gap-2 text-sm text-nature-300"
                >
                  <span className="reward-icon">🏆</span>
                  <span>{reward}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category */}
        <div className="skill-category-info mt-4 pt-4 border-t border-leather-600/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-leather-400">Category</span>
            <span className="text-xs font-medium text-leather-200 capitalize">
              {skill.category.replace("-", " ")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
