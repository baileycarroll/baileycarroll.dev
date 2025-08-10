"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { allGuildContracts } from "@/data/guildContractsData";
import {
  FilterState,
  filterContracts,
  getFilterStats,
} from "@/lib/filterLogic";
import { GemDisplay, DifficultyTooltip } from "@/components/guild/GemDisplay";
import { TechStackOrbsCompact } from "@/components/guild/TechStackOrbs";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";
import { ProjectShowcase } from "@/components/guild/ProjectShowcase";
import { MobileContract } from "@/components/guild/MobileContract";
import { MobileFilterBar } from "@/components/guild/MobileFilterBar";
import { LoadMoreButton } from "@/components/guild/LoadMoreButton";
import { useLazyLoading } from "@/lib/useLazyLoading";
import Link from "next/link";

export default function Projects() {
  const [filters, setFilters] = useState<FilterState>({
    technologies: [],
    difficulties: [],
    categories: [],
    status: [],
    search: "",
    sortBy: "date",
    sortOrder: "desc",
  });

  const [filteredContracts, setFilteredContracts] = useState(allGuildContracts);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedContracts, setExpandedContracts] = useState<Set<string>>(
    new Set()
  );
  const [isMobile, setIsMobile] = useState(false);

  // Lazy loading for mobile
  const {
    visibleContracts,
    isLoading,
    hasMore,
    loadMore,
    reset: resetLazyLoading,
    totalCount,
    loadedCount,
  } = useLazyLoading({
    contracts: filteredContracts,
    itemsPerPage: 4, // Smaller batches for mobile
    initialLoad: 3, // Start with 3 contracts
  });

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Reset lazy loading when filters change
  useEffect(() => {
    resetLazyLoading();
  }, [filteredContracts, resetLazyLoading]);

  // Apply filters whenever filters change
  useEffect(() => {
    const filtered = filterContracts(allGuildContracts, filters);
    setFilteredContracts(filtered);
  }, [filters]);

  const stats = getFilterStats(allGuildContracts, filteredContracts);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      technologies: [],
      difficulties: [],
      categories: [],
      status: [],
      search: "",
      sortBy: "date",
      sortOrder: "desc",
    });
  };

  const toggleContractExpansion = (contractId: string) => {
    setExpandedContracts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(contractId)) {
        newSet.delete(contractId);
      } else {
        newSet.add(contractId);
      }
      return newSet;
    });
  };

  return (
    <div className="guild-contracts-page min-h-screen bg-leather-950">
      {/* Header */}
      <div className="bg-leather-900/50 backdrop-blur-sm border-b border-leather-600/50 p-3">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-septim-400 text-center mb-2">
            🏛️ Guild Contracts
          </h1>
          <p className="text-leather-300 text-center">
            Epic quests and legendary projects from my development journey
          </p>
        </div>
      </div>

      <div className="container mx-auto px-1 sm:px-2 md:px-4 py-8">
        {/* Mobile Legend - Top */}
        <div className="mb-6 md:hidden">
          <div className="bg-leather-800/80 border border-leather-600 rounded-lg p-4 backdrop-blur">
            <h3 className="text-septim-400 font-semibold text-sm mb-3 flex items-center gap-2">
              <ElderScrollsIcon name="scrolls" className="w-4 h-4" />
              <span>Guild Contract Legend</span>
            </h3>

            <div className="flex flex-wrap gap-4 text-xs">
              {/* Difficulty Gems - Mobile */}
              <div className="flex items-center gap-2">
                <span className="text-leather-200 font-medium">
                  Difficulty:
                </span>
                <div className="flex gap-1">
                  <div
                    className="w-3 h-3 rounded-full bg-purple-400/20 border border-purple-400/50"
                    title="Novice"
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-blue-400/20 border border-blue-400/50"
                    title="Apprentice"
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"
                    title="Expert"
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400/50"
                    title="Master"
                  ></div>
                </div>
              </div>

              {/* Status - Mobile */}
              <div className="flex items-center gap-2">
                <span className="text-leather-200 font-medium">Status:</span>
                <div className="flex gap-1">
                  <div
                    className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"
                    title="Completed"
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-blue-400/20 border border-blue-400/50"
                    title="Active"
                  ></div>
                  <div
                    className="w-3 h-3 rounded-full bg-septim-400/20 border border-septim-400/50"
                    title="Legendary"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Bar */}
        {isMobile ? (
          <MobileFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={clearFilters}
            filteredCount={filteredContracts.length}
            totalCount={allGuildContracts.length}
          />
        ) : (
          /* Desktop Filter Bar */
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search contracts..."
                  value={filters.search}
                  onChange={(e) =>
                    handleFilterChange({ search: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100 placeholder-leather-400 focus:outline-none focus:border-septim-400"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100 hover:border-septim-400 transition-colors"
              >
                {showFilters ? "Hide" : "Show"} Filters
              </button>

              {/* Stats */}
              <div className="text-leather-300 text-sm">
                {stats.showing} contracts
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-leather-800/30 border border-leather-600/50 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Difficulty Filter */}
                  <div>
                    <label className="block text-leather-300 text-sm font-medium mb-2">
                      Difficulty
                    </label>
                    <select
                      value={filters.difficulties[0] || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          difficulties: e.target.value ? [e.target.value] : [],
                        })
                      }
                      className="w-full px-3 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100"
                    >
                      <option value="">All Difficulties</option>
                      <option value="Novice">Novice</option>
                      <option value="Apprentice">Apprentice</option>
                      <option value="Expert">Expert</option>
                      <option value="Master">Master</option>
                    </select>
                  </div>

                  {/* Category Filter */}
                  <div>
                    <label className="block text-leather-300 text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={filters.categories[0] || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          categories: e.target.value ? [e.target.value] : [],
                        })
                      }
                      className="w-full px-3 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100"
                    >
                      <option value="">All Categories</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile Development</option>
                      <option value="backend">Backend Development</option>
                      <option value="fullstack">Full Stack</option>
                      <option value="design">Design</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <div>
                    <label className="block text-leather-300 text-sm font-medium mb-2">
                      Status
                    </label>
                    <select
                      value={filters.status[0] || ""}
                      onChange={(e) =>
                        handleFilterChange({
                          status: e.target.value ? [e.target.value] : [],
                        })
                      }
                      className="w-full px-3 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100"
                    >
                      <option value="">All Status</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="Legendary">Legendary</option>
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-leather-300 text-sm font-medium mb-2">
                      Sort By
                    </label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) =>
                        handleFilterChange({
                          sortBy: e.target.value as
                            | "date"
                            | "difficulty"
                            | "name"
                            | "impact",
                        })
                      }
                      className="w-full px-3 py-2 bg-leather-800/50 border border-leather-600 rounded-lg text-leather-100"
                    >
                      <option value="date">Date</option>
                      <option value="difficulty">Difficulty</option>
                      <option value="name">Name</option>
                      <option value="impact">Impact</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-300 hover:border-septim-400 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
        {/* Contracts Grid - Mobile vs Desktop */}
        {isMobile ? (
          /* Mobile Layout - Vertical List */
          <div className="space-y-3 sm:space-y-4">
            {visibleContracts.map((contract, index) => (
              <MobileContract
                key={contract.id}
                contract={contract}
                index={index}
              />
            ))}

            {/* Load More Button for Mobile */}
            <LoadMoreButton
              onLoadMore={loadMore}
              isLoading={isLoading}
              hasMore={hasMore}
              totalCount={totalCount}
            />
          </div>
        ) : (
          /* Desktop Layout - Grid with Legend */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-min">
            {filteredContracts.map((contract, index) => {
              // Determine card variation based on contract properties
              const isMaster = contract.difficulty === "Master";
              const isLegendary = contract.status === "Legendary";

              // Simplified card variations - consistent styling
              const cardVariation = isMaster
                ? "master"
                : isLegendary
                ? "legendary"
                : "standard";

              const cardClasses = {
                master:
                  "bg-gradient-to-br from-leather-800/95 to-leather-700/95 shadow-lg",
                legendary:
                  "bg-gradient-to-br from-leather-800/90 to-septim-900/90 border border-septim-400/50 shadow-md shadow-septim-500/20",
                standard: "bg-leather-800/80 border border-leather-600",
              };

              // Clean, subtle effects
              const specialEffects = {
                master: "",
                legendary: "animate-pulse-slow",
                standard: "",
              };

              return (
                <motion.div
                  key={contract.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  className={cn(
                    "guild-contract backdrop-blur rounded-lg transition-all duration-300 relative flex flex-col",
                    "hover:border-septim-400/50 hover:shadow-lg hover:shadow-septim-500/20",
                    cardClasses[cardVariation],
                    specialEffects[cardVariation],
                    // Span multiple columns when expanded
                    expandedContracts.has(contract.id) &&
                      "md:col-span-2 lg:col-span-2 xl:col-span-2 lg:row-span-2"
                  )}
                >
                  {/* Special Badge for Legendary only */}
                  {isLegendary && (
                    <div className="absolute -top-1 -right-1 z-10">
                      <div className="px-2 py-1 rounded-full text-xs font-bold text-leather-950 shadow-md bg-septim-400">
                        👑
                      </div>
                    </div>
                  )}

                  {/* Contract Header */}
                  <div
                    className={cn(
                      "contract-header p-3 border-b",
                      "border-leather-600/50"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="contract-title text-sm font-bold text-leather-100 truncate">
                          {contract.title}
                        </h3>
                        <p className="contract-client text-xs text-leather-400 mt-1 truncate">
                          {contract.client}
                        </p>
                      </div>
                      <DifficultyTooltip difficulty={contract.difficulty}>
                        <GemDisplay
                          difficulty={contract.difficulty}
                          size="sm"
                        />
                      </DifficultyTooltip>
                    </div>
                  </div>

                  {/* Contract Body */}
                  <div className="contract-body p-3 flex flex-col min-h-0">
                    <p
                      className={cn(
                        "contract-description text-leather-300 text-xs mb-3 flex-shrink-0",
                        expandedContracts.has(contract.id) ? "" : "line-clamp-3"
                      )}
                    >
                      {contract.description}
                    </p>

                    {/* Tech Stack - Compact version */}
                    <div className="mb-3 flex-shrink-0">
                      <TechStackOrbsCompact
                        skills={contract.requiredSkills}
                        maxDisplay={expandedContracts.has(contract.id) ? 6 : 3}
                      />
                    </div>

                    {/* Contract Value - Compact */}
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
                          "font-semibold text-xs mb-1",
                          isLegendary ? "text-septim-400" : "text-septim-400"
                        )}
                      >
                        Value
                      </h4>
                      <p
                        className={cn(
                          "text-leather-200 text-xs",
                          expandedContracts.has(contract.id)
                            ? ""
                            : "line-clamp-1"
                        )}
                      >
                        {contract.contractValue}
                      </p>
                    </div>
                  </div>

                  {/* Expandable Showcase Section */}
                  <AnimatePresence>
                    {expandedContracts.has(contract.id) && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-leather-600/50"
                      >
                        <div className="p-3">
                          <ProjectShowcase
                            contract={contract}
                            isExpanded={true}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Contract Footer */}
                  <div
                    className={cn(
                      "contract-footer p-3 border-t",
                      "border-leather-600/50"
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      {/* Status */}
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-xs font-medium",
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

                      {/* Actions */}
                      <div className="flex gap-1">
                        {/* Expand/Collapse Button */}
                        <button
                          onClick={() => toggleContractExpansion(contract.id)}
                          className="px-2 py-1 rounded text-xs bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500 transition-colors"
                        >
                          <ElderScrollsIcon
                            name={
                              expandedContracts.has(contract.id)
                                ? "close"
                                : "scrolls"
                            }
                            className="w-3 h-3 inline mr-1"
                          />
                          {expandedContracts.has(contract.id)
                            ? "Hide"
                            : "Details"}
                        </button>

                        {contract.liveUrl && (
                          <Link
                            href={contract.liveUrl}
                            target="_blank"
                            className={cn(
                              "px-2 py-1 rounded text-xs transition-colors",
                              isLegendary
                                ? "bg-septim-600/30 border border-septim-400/50 text-septim-400 hover:bg-septim-600/50"
                                : isMaster
                                ? "bg-red-600/30 border border-red-400/50 text-red-400 hover:bg-red-600/50"
                                : "bg-septim-600/20 border border-septim-400/30 text-septim-400 hover:bg-septim-600/30"
                            )}
                          >
                            <ElderScrollsIcon
                              name="play"
                              className="w-3 h-3 inline mr-1"
                            />
                            Demo
                          </Link>
                        )}
                        {contract.githubUrl && (
                          <Link
                            href={contract.githubUrl}
                            target="_blank"
                            className="px-2 py-1 rounded text-xs bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500 transition-colors"
                          >
                            <ElderScrollsIcon
                              name="git-icon"
                              className="w-3 h-3 inline mr-1"
                            />
                            Code
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {/* Desktop Legend - Grid Item */}
            <div className="hidden md:block bg-leather-800/80 border border-leather-600 rounded-lg p-4 backdrop-blur md:col-start-2 md:row-start-1 md:row-span-2 lg:col-start-4 lg:row-start-1 lg:row-span-2 xl:col-start-4 xl:row-start-1 xl:row-span-2 h-fit">
              <h3 className="text-septim-400 font-semibold text-sm mb-3 flex items-center gap-2">
                <ElderScrollsIcon name="scrolls" className="w-4 h-4" />
                <span>Guild Contract Legend</span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Difficulty Gems */}
                <div>
                  <h4 className="text-leather-200 font-medium mb-2">
                    Difficulty Levels
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-purple-400/20 border border-purple-400/50"></div>
                      <span className="text-leather-300">Novice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-blue-400/20 border border-blue-400/50"></div>
                      <span className="text-leather-300">Apprentice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-green-400/20 border border-green-400/50"></div>
                      <span className="text-leather-300">Expert</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-red-400/20 border border-red-400/50"></div>
                      <span className="text-leather-300">Master</span>
                    </div>
                  </div>
                </div>

                {/* Status Indicators */}
                <div>
                  <h4 className="text-leather-200 font-medium mb-2">Status</h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400/50"></div>
                      <span className="text-leather-300">Completed</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-400/20 border border-blue-400/50"></div>
                      <span className="text-leather-300">Active</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-septim-400/20 border border-septim-400/50"></div>
                      <span className="text-leather-300">Legendary</span>
                    </div>
                  </div>
                </div>

                {/* Tech Stack Icons */}
                <div>
                  <h4 className="text-leather-200 font-medium mb-2">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    <div
                      className="w-6 h-6 rounded-full border border-leather-600 bg-leather-700/50 flex items-center justify-center"
                      title="Technology icon"
                    >
                      <div className="w-3 h-3 bg-leather-400 rounded-sm"></div>
                    </div>
                    <span className="text-leather-300 text-xs">
                      = Technology skill
                    </span>
                  </div>
                  <p className="text-leather-400 text-xs mt-1">
                    Hover for proficiency %
                  </p>
                </div>

                {/* Special Cards */}
                <div>
                  <h4 className="text-leather-200 font-medium mb-2">
                    Special Cards
                  </h4>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-septim-400/20 border border-septim-400/50"></div>
                      <span className="text-leather-300">👑 Legendary</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-leather-700/20 border border-leather-600/50"></div>
                      <span className="text-leather-300">💎 Master</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Results */}
        {filteredContracts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🗡️</div>
            <h3 className="text-xl font-bold text-leather-300 mb-2">
              No contracts found
            </h3>
            <p className="text-leather-400 mb-4">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-septim-600/20 border border-septim-400/30 rounded-lg text-septim-400 hover:bg-septim-600/30 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
