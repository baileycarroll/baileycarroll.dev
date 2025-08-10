"use client";

import { motion } from "framer-motion";
import { ElderScrollsIcon } from "@/components/icons/ElderScrollsIcon";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
  totalCount: number;
}

export function LoadMoreButton({
  onLoadMore,
  isLoading,
  hasMore,
  totalCount,
}: LoadMoreButtonProps) {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="text-leather-400 text-sm">
          All {totalCount} contracts loaded
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-6">
      <motion.button
        onClick={onLoadMore}
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors touch-manipulation",
          isLoading
            ? "bg-leather-700/50 border border-leather-600 text-leather-400 cursor-not-allowed"
            : "bg-septim-600/20 border border-septim-400/30 text-septim-400 hover:bg-septim-600/30 hover:border-septim-400/50"
        )}
      >
        {isLoading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <ElderScrollsIcon name="scrolls" className="w-4 h-4" />
            </motion.div>
            <span>Loading...</span>
          </>
        ) : (
          <>
            <ElderScrollsIcon name="contracts" className="w-4 h-4" />
            <span>Load More Contracts</span>
          </>
        )}
      </motion.button>
    </div>
  );
}

function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
