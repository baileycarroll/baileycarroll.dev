// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/app/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

const Card: React.FC<BaseProps> = ({ children, className, style }) => {
  return React.createElement(
    "div",
    {
      className: clsx(
        "bg-slate-950/40 backdrop-blur shadow-lg shadow-cyan-800 border-2 border-cyan-800 rounded-2xl p-5 ",
        className,
      ),
      style,
    },
    children,
  );
};

export default Card;
