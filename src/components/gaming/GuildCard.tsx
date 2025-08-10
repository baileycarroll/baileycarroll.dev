import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const guildCardVariants = cva(
  // Base styles - glassmorphism with gaming aesthetics
  "relative overflow-hidden rounded-xl backdrop-blur-md border transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "bg-soul-gem-950/20 border-soul-gem-500/20 shadow-lg shadow-soul-gem-500/10",
        legendary:
          "bg-septim-950/20 border-septim-400/30 shadow-xl shadow-septim-400/20",
        epic: "bg-dragon-950/20 border-dragon-500/25 shadow-lg shadow-dragon-500/15",
        rare: "bg-frost-950/20 border-frost-400/25 shadow-lg shadow-frost-400/15",
        common:
          "bg-nature-950/20 border-nature-500/20 shadow-md shadow-nature-500/10",
      },
      size: {
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      interactive: {
        true: "hover:scale-[1.02] hover:shadow-2xl cursor-pointer",
        false: "",
      },
      glow: {
        true: "before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-r before:from-soul-gem-500/5 before:to-septim-400/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false,
      glow: false,
    },
  }
);

interface GuildCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof guildCardVariants> {
  children: React.ReactNode;
}

export function GuildCard({
  className,
  variant,
  size,
  interactive,
  glow,
  children,
  ...props
}: GuildCardProps) {
  return (
    <div
      className={cn(
        guildCardVariants({ variant, size, interactive, glow, className })
      )}
      {...props}
    >
      {children}
    </div>
  );
}
