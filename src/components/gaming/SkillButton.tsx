import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skillButtonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-soul-gem-600 hover:bg-soul-gem-500 text-white shadow-lg shadow-soul-gem-600/25",
        secondary:
          "bg-soul-gem-950/50 hover:bg-soul-gem-800/50 text-soul-gem-100 border border-soul-gem-500/30",
        gold: "bg-septim-600 hover:bg-septim-500 text-white shadow-lg shadow-septim-600/25",
        danger:
          "bg-dragon-600 hover:bg-dragon-500 text-white shadow-lg shadow-dragon-600/25",
        success:
          "bg-nature-600 hover:bg-nature-500 text-white shadow-lg shadow-nature-600/25",
        frost:
          "bg-frost-600 hover:bg-frost-500 text-white shadow-lg shadow-frost-600/25",
        ghost:
          "hover:bg-soul-gem-500/10 text-soul-gem-300 hover:text-soul-gem-100",
      },
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-4 text-base",
        lg: "h-12 px-6 text-lg",
        xl: "h-14 px-8 text-xl",
      },
      glow: {
        true: "hover:shadow-2xl hover:-translate-y-0.5",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      glow: true,
    },
  }
);

interface SkillButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof skillButtonVariants> {
  children: React.ReactNode;
}

export function SkillButton({
  className,
  variant,
  size,
  glow,
  children,
  ...props
}: SkillButtonProps) {
  return (
    <button
      className={cn(skillButtonVariants({ variant, size, glow, className }))}
      {...props}
    >
      {children}
    </button>
  );
}
