// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

interface CardProps extends BaseProps {
  variant?: "default" | "elevated" | "subtle";
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  style, 
  variant = "default",
  interactive = false
}) => {
  const baseClasses =
    "rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40";
  
  const variantClasses = {
    default:
      "bg-neutral-950/34 backdrop-blur-md border border-white/8 p-6 shadow-[0_18px_54px_rgba(2,6,23,0.24)]",
    elevated:
      "bg-neutral-900/56 backdrop-blur-xl border border-primary/18 p-8 shadow-[0_30px_90px_rgba(2,6,23,0.42)]",
    subtle:
      "bg-white/[0.03] border border-white/6 p-6"
  };
  
  const interactiveClasses = interactive 
    ? "hover:-translate-y-1 hover:border-primary/24 hover:bg-neutral-900/52 hover:shadow-[0_26px_72px_rgba(2,6,23,0.38)] cursor-pointer transition-all duration-500" 
    : "";

  return React.createElement(
    "div",
    {
      className: clsx(
        baseClasses,
        variantClasses[variant],
        interactiveClasses,
        className
      ),
      style,
      tabIndex: interactive ? 0 : undefined,
      role: interactive ? "button" : undefined,
    },
    children
  );
};

export default Card;
