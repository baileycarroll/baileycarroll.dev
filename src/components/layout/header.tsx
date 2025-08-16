"use client";
import React from "react";
import DesktopNavigation from "@/components/navigation/DesktopNavigation";
import MobileNavigation from "@/components/navigation/MobileNavigation";

export default function Header() {
  return (
    <header 
      className="pointer-events-none z-50 flex flex-none flex-col bg-transparent sticky top-6"
      role="banner"
      aria-label="Site header"
    >
      <div className="top-0 z-10 h-16 pt-6">
        <div className="top-6 w-full">
          <div className="relative flex gap-4">
            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation className="pointer-events-auto md:hidden mr-4" />
              <DesktopNavigation className="pointer-events-auto hidden md:block" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
