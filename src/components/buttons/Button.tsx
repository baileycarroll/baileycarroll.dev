// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

const Button: React.FC<BaseProps> = ({ children, className, style }) => {
  return React.createElement(
    "button",
    {
      className: clsx(
        "bg-neutral-800/30 border border-primary/40 rounded-full px-3 py-1 hover:bg-neutral-800/50",
        className
      ),
      style,
    },
    children
  );
};

export default Button;
