// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

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
          ? "text-6xl font-bold leading-tight tracking-tight"
          : Level === 2
          ? "text-5xl font-bold leading-tight tracking-tight"
          : Level === 3
          ? "text-4xl font-semibold leading-tight tracking-normal"
          : Level === 4
          ? "text-3xl font-semibold leading-tight tracking-normal"
          : Level === 5
          ? "text-2xl font-medium leading-normal tracking-normal"
          : Level === 6
          ? "text-xl font-medium leading-normal tracking-normal"
          : "",
        className
      ),
      style,
    },
    children
  );
};

export default Heading;
