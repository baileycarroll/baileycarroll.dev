// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";
// Inter Font
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

interface HeadingProps extends BaseProps {
  Level: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading: React.FC<HeadingProps> = ({
  Level,
  children,
  className,
  style,
}) => {
  return React.createElement(
    `h${Level}`,
    {
      className: clsx(
        Level === 1
          ? "text-7xl font-bold"
          : Level === 2
          ? "text-6xl font-bold"
          : Level === 3
          ? "text-5xl font-semibold"
          : Level === 4
          ? "text-4xl font-semibold"
          : Level === 5
          ? "text-3xl font-semibold"
          : Level === 6
          ? "text-2xl font-semibold"
          : "",
        inter.className,
        className
      ),
      style,
    },
    children
  );
};

export default Heading;
