import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  variant?: "health" | "mana" | "experience" | "skill";
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  variant = "experience",
  showLabel = true,
  label,
  size = "md",
  animated = true,
  className,
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);

  const variants = {
    health: "bg-dragon-600",
    mana: "bg-soul-gem-600",
    experience: "bg-septim-600",
    skill: "bg-nature-600",
  };

  const sizes = {
    sm: "h-2",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between text-sm text-soul-gem-300 mb-1">
          <span className="font-medium">{label}</span>
          <span className="tabular-nums">
            {value}/{max}
          </span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-soul-gem-950/50 rounded-full border border-soul-gem-500/20 overflow-hidden",
          sizes[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 relative",
            variants[variant],
            animated && "animate-pulse"
          )}
          style={{ width: `${percentage}%` }}
        >
          {/* Inner glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}
