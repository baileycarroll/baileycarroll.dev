// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

const Card: React.FC<BaseProps> = ({ children, className, style }) => {
  return React.createElement(
    "div",
    {
      className: clsx(
        "bg-card/20 border border-primary/30 rounded-lg p-6",
        className
      ),
      style,
    },
    children
  );
};

export default Card;
