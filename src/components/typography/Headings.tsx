// React Imports
import React from "react";
// Import Base Properties
import BaseProps from "@/components/Base";
// Import CLSX for conditional classes
import clsx from "clsx";

interface HeadingProps extends BaseProps {
  Level: 1 | 2 | 3 | 4 | 5 | 6;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading: React.FC<HeadingProps> = ({
  Level,
  as,
  children,
  className,
  style,
}) => {
  const headingStyles = {
    1: "text-5xl sm:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-normal text-white",
    2: "text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-normal text-white",
    3: "text-3xl sm:text-4xl font-semibold leading-tight tracking-normal text-white",
    4: "text-2xl sm:text-3xl font-semibold leading-tight tracking-normal text-white",
    5: "text-xl sm:text-2xl font-medium leading-snug tracking-normal text-white",
    6: "text-lg sm:text-xl font-medium leading-snug tracking-normal text-white"
  };

  const Tag = (as || `h${Level}`) as keyof React.JSX.IntrinsicElements;

  return React.createElement(
    Tag,
    {
      className: clsx(
        headingStyles[Level],
        "scroll-mt-20", // For smooth scrolling to headings
        className
      ),
      style,
      id: typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : undefined,
    },
    children
  );
};

export default Heading;
