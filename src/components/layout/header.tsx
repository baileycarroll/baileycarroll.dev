"use client";
import React from "react";
import { motion } from "framer-motion";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";

export default function Header() {
  return (
    <motion.header 
      className="w-full bg-neutral-800/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50"
      role="banner"
      aria-label="Site header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="h-16 flex items-center justify-center">
          <MobileNavigation className="pointer-events-auto md:hidden" />
          <DesktopNavigation className="pointer-events-auto hidden md:block" />
        </div>
      </div>
    </motion.header>
  );
}
