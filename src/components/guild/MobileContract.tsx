"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GuildContract } from "@/lib/guildContracts";
import { GemDisplay, DifficultyTooltip } from "./GemDisplay";
import { TechStackOrbsCompact } from "./TechStackOrbs";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";
import { ProjectShowcase } from "./ProjectShowcase";

interface MobileContractProps {
  contract: GuildContract;
  index: number;
}

export function MobileContract({ contract, index }: MobileContractProps) {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const isMaster = contract.difficulty === "Master";
  const isLegendary = contract.status === "Legendary";

  const cardVariation = isMaster
    ? "master"
    : isLegendary
    ? "legendary"
    : "standard";

  const cardClasses = {
    master: "bg-gradient-to-br from-leather-800/95 to-leather-700/95 shadow-lg",
    legendary:
      "bg-gradient-to-br from-leather-800/90 to-septim-900/90 border border-septim-400/50 shadow-md shadow-septim-500/20",
    standard: "bg-leather-800/80 border border-leather-600",
  };

  const handleCardTap = () => {
    setShowBottomSheet(true);
  };

  const handleCloseBottomSheet = () => {
    setShowBottomSheet(false);
  };

  return (
    <>
      {/* Mobile Contract Card */}
      <motion.div
        key={contract.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.1, // Reduced delay for better performance
          duration: 0.2, // Reduced duration
          ease: "easeOut",
        }}
        className={cn(
          "mobile-contract bg-leather-800/90 backdrop-blur rounded-xl border border-leather-600",
          "touch-manipulation cursor-pointer", // Touch optimization
          cardClasses[cardVariation]
        )}
        onClick={handleCardTap}
      >
        {/* Contract Header */}
        <div className="contract-header p-2 sm:p-3 md:p-4 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="contract-title text-lg font-bold text-leather-100 truncate">
              {contract.title}
            </h3>
            <p className="contract-client text-sm text-leather-400 mt-1 truncate">
              {contract.client}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <DifficultyTooltip difficulty={contract.difficulty}>
              <GemDisplay difficulty={contract.difficulty} size="sm" />
            </DifficultyTooltip>

            {/* Special Badge for Legendary */}
            {isLegendary && (
              <div className="px-2 py-1 rounded-full text-xs font-bold text-leather-950 shadow-md bg-septim-400">
                👑
              </div>
            )}
          </div>
        </div>

        {/* Contract Preview */}
        <div className="contract-preview px-2 sm:px-3 md:px-4 pb-4">
          <p className="contract-description text-leather-300 text-sm mb-2 sm:mb-3 line-clamp-2">
            {contract.description}
          </p>

          {/* Tech Stack Preview */}
          <div className="mb-2 sm:mb-3">
            <TechStackOrbsCompact
              skills={contract.requiredSkills}
              maxDisplay={3}
            />
          </div>

          {/* Contract Value Preview */}
          <div
            className={cn(
              "contract-value p-2 rounded text-xs",
              isLegendary
                ? "bg-septim-400/10 border border-septim-400/30"
                : "bg-leather-700/50"
            )}
          >
            <h4
              className={cn(
                "font-semibold mb-1",
                isLegendary ? "text-septim-400" : "text-septim-400"
              )}
            >
              Contract Value
            </h4>
            <p className="text-leather-300 line-clamp-2">
              {contract.contractValue}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Sheet */}
      <AnimatePresence>
        {showBottomSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={handleCloseBottomSheet}
            />

            {/* Bottom Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.3,
              }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-leather-900/95 backdrop-blur-xl border-t border-leather-600 rounded-t-2xl max-h-[85vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-12 h-1 bg-leather-600 rounded-full" />
              </div>

              {/* Content */}
              <div className="px-2 sm:px-3 md:px-4 pb-6 overflow-y-auto max-h-[calc(85vh-40px)]">
                {/* Mobile Full Contract Details */}
                <div className="space-y-4">
                  {/* Contract Header */}
                  <div className="border-b border-leather-600/50 pb-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-leather-100 mb-1">
                          {contract.title}
                        </h2>
                        <p className="text-leather-400 text-sm">
                          {contract.client}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <DifficultyTooltip difficulty={contract.difficulty}>
                          <GemDisplay
                            difficulty={contract.difficulty}
                            size="md"
                          />
                        </DifficultyTooltip>
                        {isLegendary && (
                          <div className="px-2 py-1 rounded-full text-xs font-bold text-leather-950 shadow-md bg-septim-400">
                            👑
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-sm font-medium",
                          contract.status === "Completed" &&
                            "bg-green-400/20 text-green-400",
                          contract.status === "Active" &&
                            "bg-blue-400/20 text-blue-400",
                          contract.status === "Legendary" &&
                            "bg-septim-400/20 text-septim-400"
                        )}
                      >
                        {contract.status}
                      </span>
                    </div>
                  </div>

                  {/* Full Description */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Description
                    </h3>
                    <p className="text-leather-300 text-sm leading-relaxed">
                      {contract.description}
                    </p>
                  </div>

                  {/* Tech Stack */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {contract.requiredSkills.map((skill) => (
                        <div
                          key={skill.name}
                          className="flex items-center gap-2 px-3 py-2 bg-leather-700/50 border border-leather-600 rounded-lg"
                          title={`${skill.name} (${skill.proficiency}%)`}
                        >
                          <div className="w-3 h-3 rounded-full bg-leather-400"></div>
                          <span className="text-leather-300 text-sm">
                            {skill.name}
                          </span>
                          <span className="text-leather-400 text-xs">
                            ({skill.proficiency}%)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contract Value */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Contract Value
                    </h3>
                    <div
                      className={cn(
                        "p-3 rounded-lg",
                        isLegendary
                          ? "bg-septim-400/10 border border-septim-400/30"
                          : "bg-leather-700/50 border border-leather-600"
                      )}
                    >
                      <p className="text-leather-300 text-sm">
                        {contract.contractValue}
                      </p>
                    </div>
                  </div>

                  {/* Business Impact */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Business Impact
                    </h3>
                    <p className="text-leather-300 text-sm leading-relaxed">
                      {contract.businessImpact}
                    </p>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Learning Outcomes
                    </h3>
                    <ul className="space-y-1">
                      {contract.learningOutcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-septim-400 mt-1">•</span>
                          <span className="text-leather-300 text-sm">
                            {outcome}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Rewards */}
                  <div>
                    <h3 className="text-leather-200 font-semibold mb-2">
                      Rewards
                    </h3>
                    <div className="space-y-2">
                      {contract.rewards.map((reward) => (
                        <div
                          key={reward.id}
                          className="flex items-center gap-3 p-3 bg-leather-700/30 border border-leather-600/50 rounded-lg"
                        >
                          <div className="w-8 h-8 rounded-full bg-septim-400/20 border border-septim-400/50 flex items-center justify-center">
                            <span className="text-septim-400 text-xs">🏆</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-leather-100 text-sm font-medium">
                              {reward.title}
                            </h4>
                            <p className="text-leather-400 text-xs">
                              {reward.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Links */}
                  <div className="border-t border-leather-600/50 pt-4">
                    <h3 className="text-leather-200 font-semibold mb-3">
                      Actions
                    </h3>
                    <div className="flex flex-col gap-2">
                      {contract.liveUrl && (
                        <Link
                          href={contract.liveUrl}
                          target="_blank"
                          className={cn(
                            "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            isLegendary
                              ? "bg-septim-600/30 border border-septim-400/50 text-septim-400 hover:bg-septim-600/50"
                              : isMaster
                              ? "bg-red-600/30 border border-red-400/50 text-red-400 hover:bg-red-600/50"
                              : "bg-septim-600/20 border border-septim-400/30 text-septim-400 hover:bg-septim-600/30"
                          )}
                        >
                          <ElderScrollsIcon name="play" className="w-4 h-4" />
                          Test the Creation (Live Demo)
                        </Link>
                      )}
                      {contract.githubUrl && (
                        <Link
                          href={contract.githubUrl}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-3 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-300 hover:border-leather-500 transition-colors text-sm font-medium"
                        >
                          <ElderScrollsIcon
                            name="git-icon"
                            className="w-4 h-4"
                          />
                          Source Scrolls (View Code)
                        </Link>
                      )}
                      {contract.caseStudyUrl && (
                        <Link
                          href={contract.caseStudyUrl}
                          target="_blank"
                          className="flex items-center gap-2 px-4 py-3 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-300 hover:border-leather-500 transition-colors text-sm font-medium"
                        >
                          <ElderScrollsIcon
                            name="scrolls"
                            className="w-4 h-4"
                          />
                          Guild Report (Case Study)
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
