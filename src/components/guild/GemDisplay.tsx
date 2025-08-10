"use client";

import { cn } from "@/lib/utils";
import { getDifficultyRating } from "@/lib/guildContracts";

interface GemDisplayProps {
  difficulty: string;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
}

export function GemDisplay({
  difficulty,
  className,
  showLabel = true,
  size = "md",
}: GemDisplayProps) {
  const rating = getDifficultyRating(difficulty);

  if (!rating) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="w-4 h-4 bg-leather-600 rounded-full" />
        {showLabel && <span className="text-sm text-leather-400">Unknown</span>}
      </div>
    );
  }

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const gemStyles = {
    Amethyst:
      "bg-gradient-to-br from-purple-400 to-purple-600 shadow-purple-500/50",
    Sapphire: "bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/50",
    Ruby: "bg-gradient-to-br from-red-400 to-red-600 shadow-red-500/50",
    Diamond:
      "bg-gradient-to-br from-white via-gray-100 to-gray-200 shadow-white/50",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div
        className={cn(
          "gem rounded-full shadow-lg border border-white/20",
          sizeClasses[size],
          gemStyles[rating.gem],
          "animate-pulse"
        )}
        style={{
          background:
            rating.gem === "Diamond"
              ? "linear-gradient(135deg, #ffffff 0%, #f3f4f6 50%, #e5e7eb 100%)"
              : undefined,
        }}
      >
        {/* Gem facets for diamond */}
        {rating.gem === "Diamond" && (
          <div className="absolute inset-0 rounded-full opacity-30">
            <div className="w-full h-full bg-gradient-to-br from-transparent via-white/20 to-transparent" />
          </div>
        )}
      </div>

      {showLabel && (
        <span
          className={cn(
            "difficulty-text font-medium",
            size === "sm" ? "text-xs" : size === "lg" ? "text-base" : "text-sm",
            "text-leather-100"
          )}
        >
          {rating.level}
        </span>
      )}
    </div>
  );
}

// Tooltip component for difficulty details
interface DifficultyTooltipProps {
  difficulty: string;
  children: React.ReactNode;
}

export function DifficultyTooltip({
  difficulty,
  children,
}: DifficultyTooltipProps) {
  const rating = getDifficultyRating(difficulty);

  if (!rating) return <>{children}</>;

  return (
    <div className="group relative">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-leather-800 border border-leather-600 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-48">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <GemDisplay difficulty={difficulty} showLabel={false} size="sm" />
            <span className="font-semibold text-septim-400">
              {rating.level}
            </span>
          </div>
          <p className="text-leather-300 text-sm mb-2">{rating.description}</p>
          <div className="text-left">
            <p className="text-leather-400 text-xs font-medium mb-1">
              Requirements:
            </p>
            <ul className="text-leather-300 text-xs space-y-1">
              {rating.requirements.map((req, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-septim-400 rounded-full" />
                  {req}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-leather-800" />
      </div>
    </div>
  );
}
