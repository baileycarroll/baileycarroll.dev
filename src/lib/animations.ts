export const gameAnimations = {
  // Page transitions
  pageTransition: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Card hover effects
  cardHover: {
    whileHover: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 },
    },
    whileTap: { scale: 0.98 },
  },

  // Skill orb floating animation
  skillFloat: {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },

  // XP bar fill animation
  progressFill: {
    initial: { width: "0%" },
    animate: { width: "var(--progress-width)" },
    transition: { duration: 1, ease: "easeOut" },
  },

  // Achievement unlock
  achievement: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20,
    },
  },

  // Stagger children animations
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },

  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  },

  // Button press feedback
  buttonPress: {
    whileTap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  },

  // Glow pulse effect
  glowPulse: {
    animate: {
      boxShadow: [
        "0 0 20px rgba(99, 102, 241, 0.3)",
        "0 0 40px rgba(99, 102, 241, 0.6)",
        "0 0 20px rgba(99, 102, 241, 0.3)",
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
};
