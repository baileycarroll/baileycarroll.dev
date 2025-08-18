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
  const baseClasses = "border rounded-full transition-colors font-medium";
  
  const variantClasses = {
    default: "bg-neutral-800/30 border-primary/40 hover:bg-neutral-800/50 text-white",
    outline: "bg-transparent border-primary/40 hover:bg-primary/10 text-primary hover:text-primary-light"
  };
  
  const sizeClasses = {
    default: "px-4 py-2",
    sm: "px-3 py-1 text-sm",
    lg: "px-6 py-3 text-lg"
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
