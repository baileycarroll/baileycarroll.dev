// Filter Logic for Guild Contracts - Phase 2.3

import { GuildContract } from "./guildContracts";

export interface FilterState {
  technologies: string[];
  difficulties: string[];
  categories: string[];
  status: string[];
  search: string;
  sortBy: "date" | "difficulty" | "name" | "impact";
  sortOrder: "asc" | "desc";
}

// Difficulty order for sorting
const difficultyOrder = ["Novice", "Apprentice", "Expert", "Master"];

export function filterContracts(
  contracts: GuildContract[],
  filters: FilterState
): GuildContract[] {
  return contracts
    .filter((contract) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          contract.title.toLowerCase().includes(searchLower) ||
          contract.description.toLowerCase().includes(searchLower) ||
          contract.techStack.some((tech) =>
            tech.toLowerCase().includes(searchLower)
          ) ||
          contract.client.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    .filter((contract) => {
      // Technology filter
      if (filters.technologies.length > 0) {
        return filters.technologies.some((tech) =>
          contract.techStack.includes(tech)
        );
      }
      return true;
    })
    .filter((contract) => {
      // Difficulty filter
      if (filters.difficulties.length > 0) {
        return filters.difficulties.includes(contract.difficulty);
      }
      return true;
    })
    .filter((contract) => {
      // Category filter
      if (filters.categories.length > 0) {
        return filters.categories.includes(contract.category);
      }
      return true;
    })
    .filter((contract) => {
      // Status filter
      if (filters.status.length > 0) {
        return filters.status.includes(contract.status);
      }
      return true;
    })
    .sort((a, b) => {
      // Primary sort: Active projects first
      const aIsActive = a.status === "Active";
      const bIsActive = b.status === "Active";

      if (aIsActive && !bIsActive) return -1;
      if (!aIsActive && bIsActive) return 1;

      // Secondary sort: User's chosen sort criteria
      switch (filters.sortBy) {
        case "date":
          return filters.sortOrder === "asc"
            ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
            : new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        case "difficulty":
          return filters.sortOrder === "asc"
            ? difficultyOrder.indexOf(a.difficulty) -
                difficultyOrder.indexOf(b.difficulty)
            : difficultyOrder.indexOf(b.difficulty) -
                difficultyOrder.indexOf(a.difficulty);
        case "name":
          return filters.sortOrder === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case "impact":
          return filters.sortOrder === "asc"
            ? a.complexity - b.complexity
            : b.complexity - a.complexity;
        default:
          return 0;
      }
    });
}

// Get unique values for filter options
export function getUniqueTechnologies(contracts: GuildContract[]): string[] {
  const technologies = new Set<string>();
  contracts.forEach((contract) => {
    contract.techStack.forEach((tech) => technologies.add(tech));
  });
  return Array.from(technologies).sort();
}

export function getUniqueCategories(contracts: GuildContract[]): string[] {
  const categories = new Set<string>();
  contracts.forEach((contract) => categories.add(contract.category));
  return Array.from(categories).sort();
}

export function getUniqueDifficulties(contracts: GuildContract[]): string[] {
  const difficulties = new Set<string>();
  contracts.forEach((contract) => difficulties.add(contract.difficulty));
  return Array.from(difficulties).sort(
    (a, b) => difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b)
  );
}

export function getUniqueStatuses(contracts: GuildContract[]): string[] {
  const statuses = new Set<string>();
  contracts.forEach((contract) => statuses.add(contract.status));
  return Array.from(statuses).sort();
}

// Saved filters functionality
export interface SavedFilter {
  id: string;
  name: string;
  filters: FilterState;
  createdAt: string;
}

export function saveFilter(name: string, filters: FilterState): SavedFilter {
  const savedFilter: SavedFilter = {
    id: `filter-${Date.now()}`,
    name,
    filters,
    createdAt: new Date().toISOString(),
  };

  // Get existing saved filters
  const existingFilters = getSavedFilters();
  existingFilters.push(savedFilter);

  // Save to localStorage
  localStorage.setItem(
    "guild-contract-filters",
    JSON.stringify(existingFilters)
  );

  return savedFilter;
}

export function getSavedFilters(): SavedFilter[] {
  if (typeof window === "undefined") return [];

  try {
    const saved = localStorage.getItem("guild-contract-filters");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading saved filters:", error);
    return [];
  }
}

export function deleteSavedFilter(filterId: string): void {
  const existingFilters = getSavedFilters();
  const updatedFilters = existingFilters.filter(
    (filter) => filter.id !== filterId
  );
  localStorage.setItem(
    "guild-contract-filters",
    JSON.stringify(updatedFilters)
  );
}

// Filter statistics
export function getFilterStats(
  contracts: GuildContract[],
  filteredContracts: GuildContract[]
) {
  return {
    total: contracts.length,
    filtered: filteredContracts.length,
    showing: `${filteredContracts.length} of ${contracts.length} contracts`,
    percentage: Math.round((filteredContracts.length / contracts.length) * 100),
  };
}

// Quick filter presets
export const filterPresets = {
  all: {
    name: "All Contracts",
    filters: {
      technologies: [],
      difficulties: [],
      categories: [],
      status: [],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  featured: {
    name: "Featured Contracts",
    filters: {
      technologies: [],
      difficulties: [],
      categories: [],
      status: [],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  completed: {
    name: "Completed Contracts",
    filters: {
      technologies: [],
      difficulties: [],
      categories: [],
      status: ["Completed"],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  active: {
    name: "Active Contracts",
    filters: {
      technologies: [],
      difficulties: [],
      categories: [],
      status: ["Active"],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  master: {
    name: "Master Level",
    filters: {
      technologies: [],
      difficulties: ["Master"],
      categories: [],
      status: [],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  web: {
    name: "Web Development",
    filters: {
      technologies: [],
      difficulties: [],
      categories: ["web"],
      status: [],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
  mobile: {
    name: "Mobile Development",
    filters: {
      technologies: [],
      difficulties: [],
      categories: ["mobile"],
      status: [],
      search: "",
      sortBy: "date" as const,
      sortOrder: "desc" as const,
    },
  },
};
