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
  const baseClasses = "rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50";
  
  const variantClasses = {
    default: "bg-card/20 border border-primary/30 p-6",
    elevated: "bg-card/30 border border-primary/40 p-6 shadow-lg shadow-primary/5",
    subtle: "bg-card/10 border border-primary/20 p-6"
  };
  
  const interactiveClasses = interactive 
    ? "hover:bg-card/30 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 cursor-pointer" 
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
