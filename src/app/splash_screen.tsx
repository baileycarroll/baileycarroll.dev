"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SplashScreen from "@/components/layout/SplashScreen";
import Header from "@/components/layout/header";

export default function Splash({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSplashComplete, setSplashComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isSplashComplete) {
      // Small delay to ensure smooth transition
      setTimeout(() => setShowContent(true), 300);
    }
  }, [isSplashComplete]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!isSplashComplete && (
          <SplashScreen setIsSplashComplete={setSplashComplete} />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Header />
            <main className="overflow-y-scroll">
              {children}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
