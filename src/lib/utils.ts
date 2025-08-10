import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Gaming-specific utilities
export function getRarityColor(rarity: string) {
  const rarityMap = {
    common: "nature",
    uncommon: "frost",
    rare: "soul-gem",
    epic: "dragon",
    legendary: "septim",
  };
  return rarityMap[rarity as keyof typeof rarityMap] || "soul-gem";
}

export function calculateLevel(experience: number) {
  return Math.floor(Math.sqrt(experience / 100)) + 1;
}

export function formatStatValue(
  value: number,
  type: "percentage" | "number" | "currency"
) {
  switch (type) {
    case "percentage":
      return `${value}%`;
    case "currency":
      return `${value.toLocaleString()} Septims`;
    default:
      return value.toLocaleString();
  }
}

// Gaming rarity types
export type GamingRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

// Gaming theme variants
export type GamingTheme = "soul-gem" | "septim" | "dragon" | "nature" | "frost";
