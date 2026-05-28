// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

interface ButtonProps extends BaseProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  style, 
  variant = "default",
  size = "default"
}) => {
  const baseClasses =
    "inline-flex items-center justify-center border rounded-full transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-primary/35";
  
  const variantClasses = {
    default:
      "bg-primary/14 border-primary/24 text-white hover:bg-primary/18 hover:border-primary/34 hover:-translate-y-px shadow-[0_12px_30px_rgba(8,145,178,0.14)]",
    outline:
      "bg-transparent border-white/12 text-neutral-200 hover:border-primary/24 hover:bg-white/[0.03] hover:text-primary"
  };
  
  const sizeClasses = {
    default: "px-4 py-2.5 text-sm",
    sm: "px-3 py-1.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return React.createElement(
    "button",
    {
      className: clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      ),
      style,
    },
    children
  );
};

export default Button;
