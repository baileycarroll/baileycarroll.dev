// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

const Paragraph: React.FC<BaseProps> = ({ children, className, style }) => {
  return React.createElement(
    "p",
    {
      className: clsx(
        "text-base leading-relaxed tracking-normal",
        className
      ),
      style,
    },
    children
  );
};

export default Paragraph;
