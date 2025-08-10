import { useState, useEffect, useCallback } from "react";
import { GuildContract } from "./guildContracts";

interface UseLazyLoadingProps {
  contracts: GuildContract[];
  itemsPerPage?: number;
  initialLoad?: number;
}

export function useLazyLoading({
  contracts,
  itemsPerPage = 6,
  initialLoad = 3,
}: UseLazyLoadingProps) {
  const [visibleContracts, setVisibleContracts] = useState<GuildContract[]>([]);
  const [currentIndex, setCurrentIndex] = useState(initialLoad);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Initialize with first batch
  useEffect(() => {
    setVisibleContracts(contracts.slice(0, initialLoad));
    setCurrentIndex(initialLoad);
    setHasMore(initialLoad < contracts.length);
  }, [contracts, initialLoad]);

  // Load more contracts
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate loading delay for better UX
    setTimeout(() => {
      const nextBatch = contracts.slice(
        currentIndex,
        currentIndex + itemsPerPage
      );
      setVisibleContracts((prev) => [...prev, ...nextBatch]);
      setCurrentIndex((prev) => prev + itemsPerPage);
      setHasMore(currentIndex + itemsPerPage < contracts.length);
      setIsLoading(false);
    }, 300);
  }, [contracts, currentIndex, itemsPerPage, isLoading, hasMore]);

  // Reset when contracts change
  const reset = useCallback(() => {
    setVisibleContracts(contracts.slice(0, initialLoad));
    setCurrentIndex(initialLoad);
    setHasMore(initialLoad < contracts.length);
    setIsLoading(false);
  }, [contracts, initialLoad]);

  return {
    visibleContracts,
    isLoading,
    hasMore,
    loadMore,
    reset,
    totalCount: contracts.length,
    loadedCount: visibleContracts.length,
  };
}
