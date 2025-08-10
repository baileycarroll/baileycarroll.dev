"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";

// Detect device capability
function useDeviceCapability() {
  const [capability, setCapability] = useState<"high" | "medium" | "low">(
    "medium"
  );

  useEffect(() => {
    // Check for hardware acceleration and device performance
    const isHighEnd =
      window.navigator.hardwareConcurrency > 4 &&
      "ontouchstart" in window === false;
    const isLowEnd = window.navigator.hardwareConcurrency <= 2;

    setCapability(isHighEnd ? "high" : isLowEnd ? "low" : "medium");
  }, []);

  return capability;
}

// High-end animations (3D effects)
const highEndVariants = {
  initial: { rotateY: -90, opacity: 0, scale: 0.95 },
  animate: { rotateY: 0, opacity: 1, scale: 1 },
  exit: { rotateY: 90, opacity: 0, scale: 0.95 },
  transition: { duration: 0.6, ease: "easeInOut" },
};

// Medium-end animations (2D effects)
const mediumEndVariants = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
  transition: { duration: 0.4, ease: "easeOut" },
};

// Low-end animations (simple fade)
const lowEndVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2, ease: "easeInOut" },
};

interface JournalTabAnimationsProps {
  children: React.ReactNode;
  isVisible: boolean;
  className?: string;
}

export function JournalTabAnimations({
  children,
  isVisible,
  className,
}: JournalTabAnimationsProps) {
  const capability = useDeviceCapability();

  const variants =
    capability === "high"
      ? highEndVariants
      : capability === "medium"
      ? mediumEndVariants
      : lowEndVariants;

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`journal-tab-animation journal-tab-animation-${capability} ${
            className || ""
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Spring-based animations for interactive elements
export function useJournalSpring() {
  const [springs, api] = useSpring(() => ({
    from: { scale: 1, rotateZ: 0 },
  }));

  const handleHover = () => {
    api.start({
      scale: 1.05,
      rotateZ: 2,
      config: { tension: 300, friction: 10 },
    });
  };

  const handleLeave = () => {
    api.start({
      scale: 1,
      rotateZ: 0,
      config: { tension: 300, friction: 10 },
    });
  };

  return { springs, handleHover, handleLeave };
}

// Animated journal tab wrapper
export function AnimatedJournalTab({
  children,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick: () => void;
}) {
  const { springs, handleHover, handleLeave } = useJournalSpring();

  return (
    <animated.div
      style={springs}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={onClick}
      className="cursor-pointer"
    >
      {children}
    </animated.div>
  );
}
