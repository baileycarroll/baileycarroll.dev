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
        "bg-card/40 backdrop-blur shadow-lg shadow-primary border-2 border-primary rounded-2xl p-5 ",
        className
      ),
      style,
    },
    children
  );
};

export default Card;
