"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FilterState } from "@/lib/filterLogic";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface MobileFilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onClearFilters: () => void;
  filteredCount: number;
  totalCount: number;
}

export function MobileFilterBar({
  filters,
  onFilterChange,
  onClearFilters,
  filteredCount,
  totalCount,
}: MobileFilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mobile-filter-bar bg-leather-800/80 backdrop-blur-sm border-leather-600/50 sticky top-0 z-30 rounded-lg border mb-2 md:mb-0">
      {/* Filter Header */}
      <div className="px-1 sm:px-2 md:px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-between gap-2 px-3 py-2 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-100 hover:border-septim-400 transition-colors touch-manipulation"
          >
            <ElderScrollsIcon name="tomes" className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          <div className="lg:block hidden text-sm text-leather-300">
            {filteredCount} of {totalCount} contracts
          </div>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-xs ml-4">
          <input
            type="text"
            placeholder="Search contracts..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full px-3 py-2 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-100 placeholder-leather-400 text-sm focus:border-septim-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Expandable Filter Options */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-1 sm:px-2 md:px-4 pb-4 space-y-3">
              {/* Technology Filter */}
              <div>
                <label className="block text-leather-300 text-sm font-medium mb-2">
                  Technologies
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Next.js",
                    "Laravel",
                    "Flutter",
                    "Node.js",
                  ].map((tech) => (
                    <button
                      key={tech}
                      onClick={() => {
                        const isSelected = filters.technologies.includes(tech);
                        onFilterChange({
                          technologies: isSelected
                            ? filters.technologies.filter((t) => t !== tech)
                            : [...filters.technologies, tech],
                        });
                      }}
                      className={cn(
                        "px-3 py-2 rounded-lg text-xs font-medium transition-colors touch-manipulation",
                        filters.technologies.includes(tech)
                          ? "bg-septim-600/30 border border-septim-400/50 text-septim-400"
                          : "bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500"
                      )}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Filter */}
              <div>
                <label className="block text-leather-300 text-sm font-medium mb-2">
                  Difficulty
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Novice", "Apprentice", "Expert", "Master"].map(
                    (difficulty) => (
                      <button
                        key={difficulty}
                        onClick={() => {
                          const isSelected =
                            filters.difficulties.includes(difficulty);
                          onFilterChange({
                            difficulties: isSelected
                              ? filters.difficulties.filter(
                                  (d) => d !== difficulty
                                )
                              : [...filters.difficulties, difficulty],
                          });
                        }}
                        className={cn(
                          "px-3 py-2 rounded-lg text-xs font-medium transition-colors touch-manipulation",
                          filters.difficulties.includes(difficulty)
                            ? "bg-septim-600/30 border border-septim-400/50 text-septim-400"
                            : "bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500"
                        )}
                      >
                        {difficulty}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-leather-300 text-sm font-medium mb-2">
                  Status
                </label>
                <div className="flex gap-2">
                  {["Active", "Completed", "Legendary"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        const isSelected = filters.status.includes(status);
                        onFilterChange({
                          status: isSelected
                            ? filters.status.filter((s) => s !== status)
                            : [...filters.status, status],
                        });
                      }}
                      className={cn(
                        "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors touch-manipulation",
                        filters.status.includes(status)
                          ? "bg-septim-600/30 border border-septim-400/50 text-septim-400"
                          : "bg-leather-700/50 border border-leather-600 text-leather-300 hover:border-leather-500"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <div className="pt-2">
                <button
                  onClick={onClearFilters}
                  className="w-full px-4 py-2 bg-leather-700/50 border border-leather-600 rounded-lg text-leather-300 hover:border-septim-400 transition-colors touch-manipulation text-sm"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
