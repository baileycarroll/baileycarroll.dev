"use client";
import React from "react";
import { motion } from "framer-motion";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";

export default function Header() {
  return (
    <motion.header 
      className="pointer-events-none z-[var(--z-sticky)] flex flex-none flex-col sticky top-4 sm:top-6"
      role="banner"
      aria-label="Site header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative z-10 h-16 pt-4 sm:pt-6">
        <div className="w-full">
          <motion.div 
            className="relative flex items-center justify-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {/* Background container with glassmorphism effect */}
            <motion.div 
              className="absolute inset-0 bg-neutral-800/20 backdrop-blur-md rounded-2xl border border-primary/20 shadow-lg shadow-primary/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            
            {/* Navigation container */}
            <div className="relative flex items-center justify-center px-4 py-2">
              <MobileNavigation className="pointer-events-auto md:hidden" />
              <DesktopNavigation className="pointer-events-auto hidden md:block" />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}
