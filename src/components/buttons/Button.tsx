// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/app/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";
// WorkSans Font
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({ subsets: ["latin"] });

const Button: React.FC<BaseProps> = ({ children, className, style }) => {
  return React.createElement(
    "button",
    {
      className: clsx(
        "bg-slate-800/50 backdrop-blur shadow-md shadow-cyan-800 border-2 border-cyan-800 rounded-full px-3 py-1 hover:shadow-lg hover:shadow-cyan-800 hover:-translate-y-1 " +
          workSans.className,
        className,
      ),
      style,
    },
    children,
  );
};

export default Button;
