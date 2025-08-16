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
    1: "text-6xl font-bold leading-tight tracking-tight text-white",
    2: "text-5xl font-bold leading-tight tracking-tight text-white",
    3: "text-4xl font-semibold leading-tight tracking-normal text-white",
    4: "text-3xl font-semibold leading-tight tracking-normal text-white",
    5: "text-2xl font-medium leading-normal tracking-normal text-white",
    6: "text-xl font-medium leading-normal tracking-normal text-white"
  };

  const Tag = as || `h${Level}` as keyof JSX.IntrinsicElements;

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
