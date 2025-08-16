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
    default: "bg-neutral-900/30 backdrop-blur-md border border-primary/20 p-6 shadow-lg shadow-primary/10",
    elevated: "bg-neutral-900/40 backdrop-blur-lg border border-primary/30 p-8 shadow-xl shadow-primary/20",
    subtle: "bg-neutral-900/20 backdrop-blur-sm border border-primary/10 p-6"
  };
  
  const interactiveClasses = interactive 
    ? "hover:bg-neutral-900/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/30 cursor-pointer transform hover:scale-[1.02]" 
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
