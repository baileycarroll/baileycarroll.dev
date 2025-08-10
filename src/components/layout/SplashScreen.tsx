"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Heading from "@/components/typography/Headings";

const SplashScreen = ({
  setIsSplashComplete,
}: {
  setIsSplashComplete: (value: boolean) => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  useEffect(() => {
    // Ensure the splash screen only renders on the client
    setIsMounted(true);

    if (isMounted) {
      // Set a timeout to trigger the exit animation
      const exitTimer = setTimeout(() => {
        setShouldExit(true);
      }, 3000); // Start exit after 3 seconds

      // Set a timeout to complete the splash screen after exit animation
      const completeTimer = setTimeout(() => {
        setIsSplashComplete(true);
      }, 4000); // Complete after 4 seconds (1 second for exit animation)

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isMounted, setIsSplashComplete]);

  if (!isMounted) {
    return null; // Don't render the splash screen on the server
  }

  return (
    <AnimatePresence mode="wait">
      {!shouldExit && (
        <motion.div
          id="splash-screen"
          className="fixed inset-0 z-[9999] bg-leather-950/95 backdrop-blur-sm splash-screen flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Gaming-themed background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-leather-950 via-leather-900 to-leather-950">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)
                `,
              }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10"
          >
            {/* Gaming-themed logo */}
            <div className="w-32 h-32 bg-gradient-to-br from-septim-500 to-septim-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-septim-500/30 border-2 border-septim-400/30">
              <span className="text-4xl font-bold text-leather-950">RS</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="relative z-10 mt-6"
          >
            <Heading
              Level={1}
              className="brand splash-screen text-septim-400 text-center"
            >
              Bailey Rose Carroll
            </Heading>
            <p className="text-leather-300 text-center mt-2 text-lg">
              Developer • Adventurer • Creator
            </p>
          </motion.div>

          {/* Loading animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="relative z-10 mt-8"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-septim-400 rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-septim-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 bg-septim-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
