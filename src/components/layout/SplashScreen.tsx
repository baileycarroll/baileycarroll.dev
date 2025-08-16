"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Heading from "@/components/typography/Headings";
import Image from "next/image";
import logo from "@/assets/rose_shield.svg";

const SplashScreen = ({
  setIsSplashComplete,
}: {
  setIsSplashComplete: (value: boolean) => void;
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onAnimationComplete={() => {
          setTimeout(() => setIsSplashComplete(true), 1000);
        }}
      >
        {/* Logo Animation */}
        <motion.div
          variants={logoVariants}
          className="mb-8"
        >
          <Image
            src={logo}
            alt="Bailey Carroll Logo"
            className="w-24 h-24"
          />
        </motion.div>

        {/* Name Animation */}
        <motion.div
          variants={itemVariants}
          className="mb-4"
        >
          <Heading Level={1} className="text-4xl font-bold text-primary">
            Bailey Carroll
          </Heading>
        </motion.div>

        {/* Tagline Animation */}
        <motion.p
          variants={itemVariants}
          className="text-xl text-neutral-300 mb-2"
        >
          Making My Mark
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-primary-light"
        >
          One Line of Code at a Time
        </motion.p>

        {/* Loading Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-8"
        >
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-primary rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
