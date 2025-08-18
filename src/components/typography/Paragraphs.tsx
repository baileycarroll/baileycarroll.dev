// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

interface ParagraphProps extends BaseProps {
  size?: "sm" | "base" | "lg";
  variant?: "default" | "muted";
}

const Paragraph: React.FC<ParagraphProps> = ({ 
  children, 
  className, 
  style,
  size = "base",
  variant = "default"
}) => {
  const sizeClasses = {
    sm: "text-sm leading-relaxed",
    base: "text-base leading-relaxed",
    lg: "text-lg leading-relaxed"
  };

  const variantClasses = {
    default: "text-neutral-200",
    muted: "text-neutral-400"
  };

  return React.createElement(
    "p",
    {
      className: clsx(
        sizeClasses[size],
        variantClasses[variant],
        "tracking-normal",
        className
      ),
      style,
    },
    children
  );
};

export default Paragraph;
