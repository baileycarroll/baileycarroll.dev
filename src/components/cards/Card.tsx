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
  const baseClasses = "rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50";
  
  const variantClasses = {
    default: "bg-neutral-900/60 backdrop-blur-2xl border border-primary/40 p-6 shadow-2xl shadow-primary/30",
    elevated: "bg-neutral-900/70 backdrop-blur-3xl border border-primary/50 p-8 shadow-2xl shadow-primary/40",
    subtle: "bg-neutral-900/40 backdrop-blur-xl border border-primary/30 p-6"
  };
  
  const interactiveClasses = interactive 
    ? "hover:bg-neutral-900/80 hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/50 cursor-pointer transform hover:scale-[1.02] hover:backdrop-blur-3xl transition-all duration-500" 
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
